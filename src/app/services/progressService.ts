import type { User } from "@supabase/supabase-js";
import type { LevelProgress, LevelResult } from "../types/game";
import { supabase } from "../../lib/supabaseClient";

export interface SaveLevelProgressInput extends LevelResult {
  categoryId: string;
  levelId: number;
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
