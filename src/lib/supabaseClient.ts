import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

function isValidSupabaseUrl(url?: string) {
  if (!url) return false;

  try {
    const parsedUrl = new URL(url);
    return /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(parsedUrl.origin);
  } catch {
    return false;
  }
}

export const hasSupabaseEnv = Boolean(
  isValidSupabaseUrl(supabaseUrl) && supabaseAnonKey,
);

export const supabase = hasSupabaseEnv
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
