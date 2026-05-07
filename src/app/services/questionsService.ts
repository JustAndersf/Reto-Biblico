import type { Question } from "../types/game";
import { getLevelById as getLocalLevelById } from "../data/gameData";
import { supabase } from "../../lib/supabaseClient";

type QuestionRow = Record<string, unknown>;

function getFallbackQuestions(categoryId: string, levelId: number): Question[] {
  return getLocalLevelById(categoryId, levelId)?.questions ?? [];
}

function sortRows<T extends Record<string, unknown>>(rows: T[]): T[] {
  return [...rows].sort((left, right) => {
    const leftOrder = Number(left.sort_order ?? left.position ?? left.order ?? 0);
    const rightOrder = Number(right.sort_order ?? right.position ?? right.order ?? 0);

    if (leftOrder !== rightOrder) return leftOrder - rightOrder;

    return String(left.id ?? "").localeCompare(String(right.id ?? ""));
  });
}

function mapQuestionRow(row: QuestionRow, fallbackIndex = 0): Question | null {
  const optionFields = [row.option_a, row.option_b, row.option_c, row.option_d].filter(
    (option): option is string => typeof option === "string" && option.length > 0,
  );

  const options = Array.isArray(row.options)
    ? row.options.filter((option): option is string => typeof option === "string")
    : optionFields;

  const text = typeof row.text === "string" ? row.text : null;
  const correctIndex = Number(row.correct_index ?? 0);

  if (!text || options.length === 0) {
    return null;
  }

  return {
    id: typeof row.id === "string" ? row.id : `remote-question-${fallbackIndex}`,
    text,
    options,
    correctIndex: Number.isFinite(correctIndex) ? correctIndex : 0,
  };
}

async function resolveRemoteLevelId(categoryId: string, levelId: number) {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("levels")
    .select("*")
    .eq("category_id", categoryId)
    .eq("number", levelId)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data.id;
}

export async function getQuestionsByLevel(
  categoryId: string,
  levelId: number,
  remoteLevelId?: string | number,
): Promise<Question[]> {
  const fallbackQuestions = getFallbackQuestions(categoryId, levelId);

  if (!supabase) {
    return fallbackQuestions;
  }

  const resolvedRemoteLevelId = remoteLevelId ?? (await resolveRemoteLevelId(categoryId, levelId));

  if (!resolvedRemoteLevelId) {
    return fallbackQuestions;
  }

  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("level_id", resolvedRemoteLevelId);

  if (error || !data || data.length === 0) {
    return fallbackQuestions;
  }

  const remoteQuestions = sortRows(data)
    .map((row, index) => mapQuestionRow(row, index))
    .filter((row): row is Question => row !== null);

  return remoteQuestions.length > 0 ? remoteQuestions : fallbackQuestions;
}
