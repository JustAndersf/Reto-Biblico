import type { Level } from "../types/game";
import { getCategoryById as getLocalCategoryById, getLevelById as getLocalLevelById } from "../data/gameData";
import { supabase } from "../../lib/supabaseClient";
import { getQuestionsByLevel } from "./questionsService";

type LevelRow = Record<string, unknown>;

function getFallbackLevels(categoryId: string): Level[] {
  return getLocalCategoryById(categoryId)?.levels ?? [];
}

function sortRows<T extends Record<string, unknown>>(rows: T[]): T[] {
  return [...rows].sort((left, right) => {
    const leftOrder = Number(left.sort_order ?? left.number ?? left.position ?? 0);
    const rightOrder = Number(right.sort_order ?? right.number ?? right.position ?? 0);

    if (leftOrder !== rightOrder) return leftOrder - rightOrder;

    return String(left.id ?? "").localeCompare(String(right.id ?? ""));
  });
}

function mapLevelRow(row: LevelRow, questions: Level["questions"] = []): Level | null {
  const id = Number(row.number ?? row.level_number ?? row.id);
  const title =
    typeof row.title === "string"
      ? row.title
      : typeof row.name === "string"
        ? row.name
        : null;
  const pointsPerQuestion = Number(row.points_per_question ?? row.pointsPerQuestion ?? 10);

  if (!Number.isFinite(id) || !title) {
    return null;
  }

  return {
    id,
    title,
    questions,
    pointsPerQuestion: Number.isFinite(pointsPerQuestion) ? pointsPerQuestion : 10,
  };
}

export async function getLevelsByCategory(categoryId: string): Promise<Level[]> {
  const fallbackLevels = getFallbackLevels(categoryId);

  if (!supabase) {
    return fallbackLevels;
  }

  const { data, error } = await supabase.from("levels").select("*").eq("category_id", categoryId);

  if (error || !data || data.length === 0) {
    return fallbackLevels;
  }

  const remoteLevels = sortRows(data)
    .map((row) => mapLevelRow(row))
    .filter((row): row is Level => row !== null);

  return remoteLevels.length > 0 ? remoteLevels : fallbackLevels;
}

export async function getLevelById(categoryId: string, levelId: number): Promise<Level | undefined> {
  const fallbackLevel = getLocalLevelById(categoryId, levelId);

  if (!supabase) {
    return fallbackLevel;
  }

  const { data, error } = await supabase
    .from("levels")
    .select("*")
    .eq("category_id", categoryId)
    .eq("number", levelId)
    .maybeSingle();

  if (error || !data) {
    return fallbackLevel;
  }

  const questions = await getQuestionsByLevel(categoryId, levelId, data.id as string | number);
  const remoteLevel = mapLevelRow(data, questions);

  return remoteLevel ?? fallbackLevel;
}
