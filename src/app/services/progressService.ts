import type { User } from "@supabase/supabase-js";
import type { LevelProgress, LevelResult, GameState } from "../types/game";
import { supabase } from "../../lib/supabaseClient";

export interface SaveLevelProgressInput extends LevelResult {
  categoryId: string;
  levelId: number;
}

export interface DailyChallenges {
  levelsCompletedToday: number;
  rachaBonusClaimed: boolean;
  desafioBonusClaimed: boolean;
  lastActivityDate: string | null;
}

export interface PlayerState {
  globalLives: number;
  coins: number;
  totalPoints: number;
  regenTimestamps: number[];
  settings: {
    music: boolean;
    sound: boolean;
  };
  dailyChallenges?: DailyChallenges;
}

export interface DailyChallengeReward {
  type: 'racha' | 'desafio' | 'none';
  points: number;
  message: string;
}

async function ensureProfile(user: User) {
  if (!supabase) return;

  const metadata = user.user_metadata ?? {};

  try {
    await supabase.from("profiles").upsert(
      {
        id: user.id,
        email: user.email ?? null,
        full_name:
          (typeof metadata.full_name === "string" && metadata.full_name) ||
          (typeof metadata.name === "string" && metadata.name) ||
          null,
        avatar_url:
          (typeof metadata.avatar_url === "string" && metadata.avatar_url) ||
          (typeof metadata.picture === "string" && metadata.picture) ||
          null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );
  } catch {
    // Profiles are optional for the current rollout.
  }
}

export async function saveLevelProgress(
  userId: string,
  input: SaveLevelProgressInput,
): Promise<boolean> {
  if (!supabase) {
    return false;
  }

  const payload = {
    user_id: userId,
    category_id: input.categoryId,
    level_id: input.levelId,
    points: input.points,
    stars: input.stars,
    correct_answers: input.correctAnswers,
    total_questions: input.totalQuestions,
    completed: input.completed,
    updated_at: new Date().toISOString(),
    completed_at: input.completed ? new Date().toISOString() : null,
  };

  const { error } = await supabase
    .from("user_level_progress")
    .upsert(payload, { onConflict: "user_id,category_id,level_id" });

  return !error;
}

export async function saveCurrentUserLevelProgress(input: SaveLevelProgressInput): Promise<boolean> {
  if (!supabase) {
    return false;
  }

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return false;
  }

  await ensureProfile(data.user);

  return saveLevelProgress(data.user.id, input);
}

export async function getUserLevelProgress(userId: string): Promise<LevelProgress> {
  if (!supabase) {
    return {};
  }

  const { data, error } = await supabase
    .from("user_level_progress")
    .select("*")
    .eq("user_id", userId);

  if (error || !data || data.length === 0) {
    return {};
  }

  return data.reduce<LevelProgress>((acc, row) => {
    const categoryId = typeof row.category_id === "string" ? row.category_id : null;
    const levelId = Number(row.level_id);

    if (!categoryId || !Number.isFinite(levelId)) {
      return acc;
    }

    return {
      ...acc,
      [categoryId]: {
        ...(acc[categoryId] ?? {}),
        [levelId]: {
          completed: Boolean(row.completed),
          stars: Number(row.stars ?? 0),
          points: Number(row.points ?? 0),
          correctAnswers: Number(row.correct_answers ?? 0),
          totalQuestions: Number(row.total_questions ?? 0),
        },
      },
    };
  }, {});
}

export async function ensureCurrentUserProfile(): Promise<void> {
  if (!supabase) return;

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return;
  }

  await ensureProfile(data.user);
}

export async function savePlayerState(userId: string, state: PlayerState): Promise<boolean> {
  if (!supabase) {
    return false;
  }

  try {
    const { error } = await supabase.from("player_state").upsert(
      {
        user_id: userId,
        global_lives: state.globalLives,
        coins: state.coins,
        total_points: state.totalPoints,
        regen_timestamps: state.regenTimestamps,
        settings: state.settings,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );

    return !error;
  } catch {
    return false;
  }
}

export async function saveCurrentPlayerState(state: PlayerState): Promise<boolean> {
  if (!supabase) {
    return false;
  }

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return false;
  }

  return savePlayerState(data.user.id, state);
}

export async function getPlayerState(userId: string): Promise<PlayerState | null> {
  if (!supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("player_state")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      return null;
    }

    const dailyChallenges = data.daily_challenges || {
      levels_completed_today: 0,
      racha_bonus_claimed: false,
      desafio_bonus_claimed: false,
      last_activity_date: null,
    };

    return {
      globalLives: Number(data.global_lives ?? 3),
      coins: Number(data.coins ?? 0),
      totalPoints: Number(data.total_points ?? 0),
      regenTimestamps: Array.isArray(data.regen_timestamps) ? data.regen_timestamps : [],
      settings: data.settings ?? { music: true, sound: true },
      dailyChallenges: {
        levelsCompletedToday: Number(dailyChallenges.levels_completed_today ?? 0),
        rachaBonusClaimed: Boolean(dailyChallenges.racha_bonus_claimed ?? false),
        desafioBonusClaimed: Boolean(dailyChallenges.desafio_bonus_claimed ?? false),
        lastActivityDate: dailyChallenges.last_activity_date ?? null,
      },
    };
  } catch {
    return null;
  }
}

export async function completeDailyLevel(userId: string): Promise<DailyChallengeReward> {
  if (!supabase) {
    return { type: 'none', points: 0, message: '' };
  }

  try {
    const today = new Date().toISOString().split('T')[0];

    // Obtener estado actual
    const { data, error } = await supabase
      .from("player_state")
      .select("daily_challenges")
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      return { type: 'none', points: 0, message: '' };
    }

    const challenges = data.daily_challenges || {
      levels_completed_today: 0,
      racha_bonus_claimed: false,
      desafio_bonus_claimed: false,
      last_activity_date: null,
    };

    // Resetear contadores si es un día nuevo
    let levelsCompleted = challenges.levels_completed_today;
    let rachaBonus = challenges.racha_bonus_claimed;
    let desafioBonus = challenges.desafio_bonus_claimed;

    if (challenges.last_activity_date !== today) {
      levelsCompleted = 0;
      rachaBonus = false;
      desafioBonus = false;
    }

    // Incrementar niveles completados
    levelsCompleted += 1;

    // Determinar bonos a otorgar
    let reward: DailyChallengeReward = { type: 'none', points: 0, message: '' };

    if (levelsCompleted === 1 && !rachaBonus) {
      reward = {
        type: 'racha',
        points: 25,
        message: '¡Racha del día completada! +25 puntos',
      };
      rachaBonus = true;
    } else if (levelsCompleted === 2 && !desafioBonus) {
      reward = {
        type: 'desafio',
        points: 50,
        message: '¡Desafío diario completado! +50 puntos',
      };
      desafioBonus = true;
    }

    // Guardar cambios
    await supabase.from("player_state").update({
      daily_challenges: {
        levels_completed_today: levelsCompleted,
        racha_bonus_claimed: rachaBonus,
        desafio_bonus_claimed: desafioBonus,
        last_activity_date: today,
      },
      updated_at: new Date().toISOString(),
    }).eq("user_id", userId);

    return reward;
  } catch {
    return { type: 'none', points: 0, message: '' };
  }
}
