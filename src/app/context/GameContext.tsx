import React, { createContext, useContext, useReducer, useEffect, useRef } from "react";
import { GameState, CurrentGame, GameSettings, LevelResult } from "../types/game";
import { MAX_LIVES } from "../data/gameData";
import { getUserLevelProgress } from "../services/progressService";
import { supabase } from "../../lib/supabaseClient";

const STORAGE_KEY = "reto_biblico_state";

// Tiempos de regeneración en ms según cuántas vidas falten para llegar al máximo
// 1ra vida perdida → recupera en 1 min; 2da → 3 min; 3ra → 5 min
const REGEN_TIMES_MS = [1 * 60 * 1000, 3 * 60 * 1000, 5 * 60 * 1000];

const LOCAL_LIVES = 3;

const initialState: GameState = {
  globalLives: MAX_LIVES,
  coins: 0,
  regenTimestamps: [],
  totalPoints: 0,
  levelProgress: {},
  settings: { music: true, sound: true },
  currentGame: null,
};

type Action =
  | { type: "START_GAME"; payload: { categoryId: string; levelId: number } }
  | { type: "ANSWER_CORRECT"; payload: { points: number } }
  | { type: "ANSWER_WRONG" }
  | { type: "NEXT_QUESTION" }
  | { type: "COMPLETE_LEVEL"; payload: LevelResult & { categoryId: string; levelId: number } }
  | { type: "LEVEL_FAILED" } // pierde las 3 vidas locales → resta 1 vida global
  | { type: "REGEN_LIFE" }   // recupera 1 vida global por el temporizador
  | { type: "BUY_LIVES_WITH_COINS"; payload: { amount: number; cost: number } }
  | { type: "ADD_COINS"; payload: number }
  | { type: "ADD_POINTS"; payload: number }
  | { type: "SPEND_POINTS"; payload: number }
  | { type: "UPDATE_SETTINGS"; payload: Partial<GameSettings> }
  | { type: "LOAD_STATE"; payload: GameState };

function addRegenTimestamp(state: GameState): number[] {
  // Calcula cuántas vidas faltan y el índice de la que se está perdiendo
  const lostIndex = MAX_LIVES - state.globalLives; // 0 = primera pérdida (tardará REGEN_TIMES_MS[0])
  const delayMs = REGEN_TIMES_MS[lostIndex] ?? REGEN_TIMES_MS[REGEN_TIMES_MS.length - 1];
  const now = Date.now();
  // El nuevo timestamp se agenda después del último ya programado, o desde ahora
  const lastTs = state.regenTimestamps.length > 0
    ? Math.max(...state.regenTimestamps)
    : now;
  return [...state.regenTimestamps, lastTs + delayMs];
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "LOAD_STATE":
      return { ...initialState, ...action.payload };

    case "START_GAME":
      return {
        ...state,
        currentGame: {
          categoryId: action.payload.categoryId,
          levelId: action.payload.levelId,
          questionIndex: 0,
          score: 0,
          correctAnswers: 0,
          wrongAnswers: 0,
          localLives: LOCAL_LIVES,
        },
      };

    case "ANSWER_CORRECT": {
      if (!state.currentGame) return state;
      return {
        ...state,
        // totalPoints are no longer awarded per question — awarded on level completion
        currentGame: {
          ...state.currentGame,
          score: state.currentGame.score + action.payload.points,
          correctAnswers: state.currentGame.correctAnswers + 1,
        },
      };
    }

    case "ANSWER_WRONG": {
      if (!state.currentGame) return state;
      const newLocalLives = Math.max(0, state.currentGame.localLives - 1);
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          localLives: newLocalLives,
          wrongAnswers: state.currentGame.wrongAnswers + 1,
        },
      };
    }

    case "NEXT_QUESTION": {
      if (!state.currentGame) return state;
      return {
        ...state,
        currentGame: {
          ...state.currentGame,
          questionIndex: state.currentGame.questionIndex + 1,
        },
      };
    }

    case "COMPLETE_LEVEL": {
      const { categoryId, levelId, ...result } = action.payload;
      const existingResult = state.levelProgress[categoryId]?.[levelId];
      const shouldUpdate =
        !existingResult ||
        result.points > existingResult.points ||
        result.stars > existingResult.stars;

      // Only add points to the global total when the level was completed
      // and only for the improvement over previous best for that level.
      let pointsToAdd = 0;
      if (result.completed) {
        const prev = existingResult?.points ?? 0;
        if (result.points > prev) pointsToAdd = result.points - prev;
      }

      return {
        ...state,
        totalPoints: state.totalPoints + pointsToAdd,
        currentGame: null,
        levelProgress: {
          ...state.levelProgress,
          [categoryId]: {
            ...(state.levelProgress[categoryId] || {}),
            [levelId]: shouldUpdate ? result : existingResult!,
          },
        },
      };
    }

    case "LEVEL_FAILED": {
      // Pierde 1 vida global y programa la regeneración
      const newGlobal = Math.max(0, state.globalLives - 1);
      const newTimestamps = newGlobal < MAX_LIVES ? addRegenTimestamp(state) : state.regenTimestamps;
      return {
        ...state,
        globalLives: newGlobal,
        regenTimestamps: newTimestamps,
        currentGame: null,
      };
    }

    case "REGEN_LIFE": {
      if (state.globalLives >= MAX_LIVES) return state;
      // Quita el timestamp más antiguo y suma 1 vida global
      const sorted = [...state.regenTimestamps].sort((a, b) => a - b);
      sorted.shift();
      return {
        ...state,
        globalLives: Math.min(MAX_LIVES, state.globalLives + 1),
        regenTimestamps: sorted,
      };
    }

    case "BUY_LIVES_WITH_COINS": {
      const { amount, cost } = action.payload;
      if (state.coins < cost) return state;
      return {
        ...state,
        globalLives: Math.min(MAX_LIVES, state.globalLives + amount),
        coins: state.coins - cost,
        regenTimestamps: [], // Al comprar vidas se resetea el temporizador pendiente
      };
    }

    case "ADD_COINS":
      return { ...state, coins: state.coins + action.payload };

    case "ADD_POINTS":
      return { ...state, totalPoints: state.totalPoints + action.payload };

    case "SPEND_POINTS": {
      const cost = action.payload;
      if (state.totalPoints < cost) return state;
      return { ...state, totalPoints: state.totalPoints - cost };
    }

    case "UPDATE_SETTINGS":
      return { ...state, settings: { ...state.settings, ...action.payload } };

    default:
      return state;
  }
}

interface GameContextValue {
  state: GameState;
  startGame: (categoryId: string, levelId: number) => void;
  answerCorrect: (points: number) => void;
  answerWrong: () => void;
  nextQuestion: () => void;
  completeLevel: (result: LevelResult & { categoryId: string; levelId: number }) => void;
  levelFailed: () => void;
  addCoins: (amount: number) => void;
  addPoints: (amount: number) => void;
  buyLivesWithCoins: (amount: number, cost: number) => void;
  buyCoinsWithPoints: (amount: number, costPoints: number) => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
  isLevelUnlocked: (categoryId: string, levelId: number) => boolean;
  isLevelCompleted: (categoryId: string, levelId: number) => boolean;
  getLevelResult: (categoryId: string, levelId: number) => LevelResult | undefined;
  nextRegenSeconds: number | null; // segundos que quedan para la próxima vida
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cargar estado persistido desde localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as GameState;
        dispatch({ type: "LOAD_STATE", payload: { ...initialState, ...parsed } });
      }
    } catch {
      // ignore
    }
  }, []);

  // Sincronizar progreso desde Supabase cuando el usuario está autenticado
  useEffect(() => {
    if (!supabase) return;

    let isMounted = true;

    const syncProgressFromSupabase = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user || !isMounted) {
        return;
      }

      try {
        const remoteProgress = await getUserLevelProgress(data.user.id);
        if (!isMounted) return;

        // Solo cargar el progreso si hay datos remotos
        if (Object.keys(remoteProgress).length > 0) {
          dispatch({ type: "LOAD_STATE", payload: { ...initialState, levelProgress: remoteProgress } });
        }
      } catch {
        // Silently fail - keep using local progress
      }
    };

    // Sincronizar al montar
    syncProgressFromSupabase();

    // Escuchar cambios de autenticación para re-sincronizar
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, _session) => {
      if (isMounted) {
        await syncProgressFromSupabase();
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Guardar estado en localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  // Temporizador de regeneración de vidas globales
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (state.regenTimestamps.length === 0 || state.globalLives >= MAX_LIVES) return;

    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const sorted = [...state.regenTimestamps].sort((a, b) => a - b);
      if (sorted.length > 0 && now >= sorted[0]) {
        dispatch({ type: "REGEN_LIFE" });
      }
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.regenTimestamps, state.globalLives]);

  // Calcular segundos restantes para la próxima vida
  const nextRegenSeconds: number | null = (() => {
    if (state.regenTimestamps.length === 0 || state.globalLives >= MAX_LIVES) return null;
    const sorted = [...state.regenTimestamps].sort((a, b) => a - b);
    const remaining = Math.ceil((sorted[0] - Date.now()) / 1000);
    return Math.max(0, remaining);
  })();

  const startGame = (categoryId: string, levelId: number) =>
    dispatch({ type: "START_GAME", payload: { categoryId, levelId } });

  const answerCorrect = (points: number) =>
    dispatch({ type: "ANSWER_CORRECT", payload: { points } });

  const answerWrong = () => dispatch({ type: "ANSWER_WRONG" });

  const nextQuestion = () => dispatch({ type: "NEXT_QUESTION" });

  const completeLevel = (result: LevelResult & { categoryId: string; levelId: number }) =>
    dispatch({ type: "COMPLETE_LEVEL", payload: result });

  const levelFailed = () => dispatch({ type: "LEVEL_FAILED" });

  const addCoins = (amount: number) => dispatch({ type: "ADD_COINS", payload: amount });
  const addPoints = (amount: number) => dispatch({ type: "ADD_POINTS", payload: amount });

  const buyLivesWithCoins = (amount: number, cost: number) =>
    dispatch({ type: "BUY_LIVES_WITH_COINS", payload: { amount, cost } });

  const buyCoinsWithPoints = (amount: number, costPoints: number) => {
    if (costPoints > state.totalPoints) return;
    // subtract points and add coins
    dispatch({ type: "SPEND_POINTS", payload: costPoints });
    dispatch({ type: "ADD_COINS", payload: amount });
  };

  const updateSettings = (settings: Partial<GameSettings>) =>
    dispatch({ type: "UPDATE_SETTINGS", payload: settings });

  const isLevelUnlocked = (categoryId: string, levelId: number): boolean => {
    if (levelId === 1) return true;
    return !!state.levelProgress[categoryId]?.[levelId - 1]?.completed;
  };

  const isLevelCompleted = (categoryId: string, levelId: number): boolean =>
    !!state.levelProgress[categoryId]?.[levelId]?.completed;

  const getLevelResult = (categoryId: string, levelId: number): LevelResult | undefined =>
    state.levelProgress[categoryId]?.[levelId];

  return (
    <GameContext.Provider
      value={{
        state,
        startGame,
        answerCorrect,
        answerWrong,
        nextQuestion,
        completeLevel,
        levelFailed,
        addCoins,
        addPoints,
        buyLivesWithCoins,
        buyCoinsWithPoints,
        updateSettings,
        isLevelUnlocked,
        isLevelCompleted,
        getLevelResult,
        nextRegenSeconds,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
