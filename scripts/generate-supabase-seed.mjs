import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const gameDataPath = path.join(projectRoot, "src", "app", "data", "gameData.ts");
const outputDir = path.join(projectRoot, "supabase");
const outputPath = path.join(outputDir, "reseed_content.sql");

function readCategories() {
  const source = fs.readFileSync(gameDataPath, "utf8");
  const match = source.match(
    /export const CATEGORIES:\s*Category\[\]\s*=\s*(\[[\s\S]*?\]);\s*export function getCategoryById/s,
  );

  if (!match) {
    throw new Error("No se pudo extraer CATEGORIES desde gameData.ts");
  }

  return Function(`"use strict"; return (${match[1]});`)();
}

function repairText(value) {
  if (typeof value !== "string") return value;

  try {
    const repaired = Buffer.from(value, "latin1").toString("utf8");
    return repaired.includes("\uFFFD") ? value : repaired;
  } catch {
    return value;
  }
}

function sqlString(value) {
  if (value === null || value === undefined) return "null";
  return `'${String(value).replace(/'/g, "''")}'`;
}

function sqlBoolean(value) {
  return value ? "true" : "false";
}

function categoryColorName(categoryId) {
  const colorMap = {
    "antiguo-testamento": "blue",
    "nuevo-testamento": "purple",
    personajes: "amber",
    milagros: "sky",
    versiculos: "gold",
  };

  return colorMap[categoryId] ?? "blue";
}

function categoryIconName(categoryId) {
  const iconMap = {
    "antiguo-testamento": "scroll",
    "nuevo-testamento": "book-open",
    personajes: "users",
    milagros: "sparkles",
    versiculos: "quote",
  };

  return iconMap[categoryId] ?? "book-open";
}

function categoryEmojiSql(categoryId, fallbackEmoji) {
  const emojiMap = {
    "antiguo-testamento": "chr(128220)",
    "nuevo-testamento": "chr(10013) || chr(65039)",
    personajes: "chr(128100)",
    milagros: "chr(10024)",
    profetas: "chr(128302)",
    versiculos: "chr(128214)",
  };

  return emojiMap[categoryId] ?? sqlString(fallbackEmoji);
}

function buildSql(categories) {
  const categoryRows = [];
  const levelRows = [];
  const questionRows = [];

  categories.forEach((category, categoryIndex) => {
    categoryRows.push(
      `  (${[
        sqlString(category.id),
        sqlString(repairText(category.name)),
        categoryEmojiSql(category.id, category.emoji),
        sqlString(repairText(category.description)),
        sqlString(repairText(category.colorFrom)),
        sqlString(repairText(category.colorTo)),
        sqlString(repairText(category.textColor)),
        sqlString(categoryIconName(category.id)),
        sqlString(categoryColorName(category.id)),
        sqlBoolean(true),
        String(categoryIndex + 1),
      ].join(", ")})`,
    );

    category.levels.forEach((level, levelIndex) => {
      const levelRecordId = `${category.id}-${level.id}`;
      levelRows.push(
        `  (${[
          sqlString(levelRecordId),
          sqlString(category.id),
          String(level.id),
          sqlString(repairText(level.title)),
          String(level.pointsPerQuestion),
          String(Math.max(0, (level.id - 1) * 50)),
          sqlBoolean(true),
          String(levelIndex + 1),
        ].join(", ")})`,
      );

      level.questions.forEach((question, questionIndex) => {
        const options = question.options.map((option) => repairText(option));

        questionRows.push(
          `  (${[
            sqlString(question.id),
            sqlString(levelRecordId),
            sqlString(repairText(question.text)),
            sqlString(options[0] ?? ""),
            sqlString(options[1] ?? ""),
            sqlString(options[2] ?? ""),
            sqlString(options[3] ?? ""),
            sqlString(JSON.stringify(options)),
            String(question.correctIndex),
            sqlBoolean(true),
            String(questionIndex + 1),
          ].join(", ")})`,
        );
      });
    });
  });

  return `-- Reto Biblico: reset parcial y seed de contenido
-- Generado automaticamente desde src/app/data/gameData.ts
-- Este script reinicia solo tablas de contenido y tablas auxiliares del juego.
-- No elimina auth.users ni configuraciones del proyecto.

begin;

create extension if not exists pgcrypto;

drop table if exists public.questions cascade;
drop table if exists public.levels cascade;
drop table if exists public.categories cascade;
drop table if exists public.user_level_progress cascade;
drop table if exists public.game_sessions cascade;

create table public.categories (
  id text primary key,
  name text not null,
  emoji text not null,
  description text,
  color_from text not null,
  color_to text not null,
  text_color text not null default '#FFFFFF',
  icon text,
  color text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.levels (
  id text primary key,
  category_id text not null references public.categories(id) on delete cascade,
  number integer not null,
  title text not null,
  points_per_question integer not null default 10,
  required_points integer not null default 0,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (category_id, number)
);

create table public.questions (
  id text primary key,
  level_id text not null references public.levels(id) on delete cascade,
  text text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  options jsonb not null default '[]'::jsonb,
  correct_index integer not null default 0,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_level_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category_id text not null,
  level_id integer not null,
  points integer not null default 0,
  stars integer not null default 0,
  correct_answers integer not null default 0,
  total_questions integer not null default 0,
  completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, category_id, level_id)
);

create table public.game_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category_id text not null,
  level_id integer not null,
  score integer not null default 0,
  correct_answers integer not null default 0,
  wrong_answers integer not null default 0,
  local_lives integer not null default 3,
  completed boolean not null default false,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_levels_category_id on public.levels(category_id);
create index idx_questions_level_id on public.questions(level_id);
create index idx_user_level_progress_user_id on public.user_level_progress(user_id);
create index idx_game_sessions_user_id on public.game_sessions(user_id);

insert into public.categories (
  id,
  name,
  emoji,
  description,
  color_from,
  color_to,
  text_color,
  icon,
  color,
  is_active,
  sort_order
)
values
${categoryRows.join(",\n")}
;

insert into public.levels (
  id,
  category_id,
  number,
  title,
  points_per_question,
  required_points,
  is_active,
  sort_order
)
values
${levelRows.join(",\n")}
;

insert into public.questions (
  id,
  level_id,
  text,
  option_a,
  option_b,
  option_c,
  option_d,
  options,
  correct_index,
  is_active,
  sort_order
)
values
${questionRows.join(",\n")}
;

alter table public.categories enable row level security;
alter table public.levels enable row level security;
alter table public.questions enable row level security;
alter table public.profiles enable row level security;
alter table public.user_level_progress enable row level security;
alter table public.game_sessions enable row level security;

drop policy if exists "Public categories are readable" on public.categories;
create policy "Public categories are readable"
on public.categories
for select
using (is_active = true);

drop policy if exists "Public levels are readable" on public.levels;
create policy "Public levels are readable"
on public.levels
for select
using (is_active = true);

drop policy if exists "Public questions are readable" on public.questions;
create policy "Public questions are readable"
on public.questions
for select
using (is_active = true);

drop policy if exists "Profiles are readable by owner" on public.profiles;
create policy "Profiles are readable by owner"
on public.profiles
for select
using (auth.uid() = id);

drop policy if exists "Profiles are insertable by owner" on public.profiles;
create policy "Profiles are insertable by owner"
on public.profiles
for insert
with check (auth.uid() = id);

drop policy if exists "Profiles are updatable by owner" on public.profiles;
create policy "Profiles are updatable by owner"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Progress is readable by owner" on public.user_level_progress;
create policy "Progress is readable by owner"
on public.user_level_progress
for select
using (auth.uid() = user_id);

drop policy if exists "Progress is insertable by owner" on public.user_level_progress;
create policy "Progress is insertable by owner"
on public.user_level_progress
for insert
with check (auth.uid() = user_id);

drop policy if exists "Progress is updatable by owner" on public.user_level_progress;
create policy "Progress is updatable by owner"
on public.user_level_progress
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Sessions are readable by owner" on public.game_sessions;
create policy "Sessions are readable by owner"
on public.game_sessions
for select
using (auth.uid() = user_id);

drop policy if exists "Sessions are insertable by owner" on public.game_sessions;
create policy "Sessions are insertable by owner"
on public.game_sessions
for insert
with check (auth.uid() = user_id);

drop policy if exists "Sessions are updatable by owner" on public.game_sessions;
create policy "Sessions are updatable by owner"
on public.game_sessions
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

commit;
`;
}

const categories = readCategories();
const sql = buildSql(categories);

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, sql, "utf8");

console.log(`Archivo generado: ${path.relative(projectRoot, outputPath)}`);
