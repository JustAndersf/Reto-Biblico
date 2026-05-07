import type { Category } from "../types/game";
import { CATEGORIES, getCategoryById as getLocalCategoryById } from "../data/gameData";
import { supabase } from "../../lib/supabaseClient";
import { getLevelsByCategory } from "./levelsService";

type CategoryRow = Record<string, unknown>;

function sortRows<T extends Record<string, unknown>>(rows: T[]): T[] {
  return [...rows].sort((left, right) => {
    const leftOrder = Number(left.sort_order ?? left.position ?? left.order ?? 0);
    const rightOrder = Number(right.sort_order ?? right.position ?? right.order ?? 0);

    if (leftOrder !== rightOrder) return leftOrder - rightOrder;

    return String(left.id ?? "").localeCompare(String(right.id ?? ""));
  });
}

function mapCategoryRow(row: CategoryRow, levels: Category["levels"]): Category | null {
  const id = typeof row.id === "string" ? row.id : null;
  const name =
    typeof row.name === "string"
      ? row.name
      : typeof row.title === "string"
        ? row.title
        : null;

  if (!id || !name) {
    return null;
  }

  return {
    id,
    name,
    emoji: typeof row.emoji === "string" ? row.emoji : "📖",
    colorFrom: typeof row.color_from === "string" ? row.color_from : "#4A7FD4",
    colorTo: typeof row.color_to === "string" ? row.color_to : "#3A6FBF",
    textColor: typeof row.text_color === "string" ? row.text_color : "#FFFFFF",
    description: typeof row.description === "string" ? row.description : "Explora la Palabra",
    levels,
  };
}

export async function getCategories(): Promise<Category[]> {
  if (!supabase) {
    return CATEGORIES;
  }

  const { data, error } = await supabase.from("categories").select("*");

  if (error || !data || data.length === 0) {
    return CATEGORIES;
  }

  const remoteCategories = await Promise.all(
    sortRows(data).map(async (row) => {
      const categoryId = typeof row.id === "string" ? row.id : "";
      const levels = categoryId ? await getLevelsByCategory(categoryId) : [];
      return mapCategoryRow(row, levels);
    }),
  );

  const validCategories = remoteCategories.filter((row): row is Category => row !== null);

  return validCategories.length > 0 ? validCategories : CATEGORIES;
}

export async function getCategoryById(categoryId: string): Promise<Category | undefined> {
  const fallbackCategory = getLocalCategoryById(categoryId);

  if (!supabase) {
    return fallbackCategory;
  }

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", categoryId)
    .maybeSingle();

  if (error || !data) {
    return fallbackCategory;
  }

  const levels = await getLevelsByCategory(categoryId);
  return mapCategoryRow(data, levels) ?? fallbackCategory;
}
