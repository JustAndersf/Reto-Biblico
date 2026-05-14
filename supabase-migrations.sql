-- Tabla para almacenar el estado del jugador (vidas, monedas, puntos, etc)
CREATE TABLE IF NOT EXISTS public.player_state (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  global_lives integer NOT NULL DEFAULT 3,
  coins integer NOT NULL DEFAULT 0,
  total_points integer NOT NULL DEFAULT 0,
  regen_timestamps bigint[] NOT NULL DEFAULT '{}',
  settings jsonb NOT NULL DEFAULT '{"music": true, "sound": true}',
  daily_challenges jsonb NOT NULL DEFAULT '{"levels_completed_today": 0, "racha_bonus_claimed": false, "desafio_bonus_claimed": false, "last_activity_date": null}',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT player_state_pkey PRIMARY KEY (id),
  CONSTRAINT player_state_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Crear índice para búsquedas rápidas por user_id
CREATE INDEX IF NOT EXISTS idx_player_state_user_id ON public.player_state(user_id);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.player_state ENABLE ROW LEVEL SECURITY;

-- Política: los usuarios solo pueden ver/editar su propio estado
CREATE POLICY "Users can view their own player state"
  ON public.player_state
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own player state"
  ON public.player_state
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own player state"
  ON public.player_state
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
