# Reto Bíblico

SPA responsive construida con `Vite + React` para jugar trivias bíblicas por categorías, niveles y preguntas.  
La app mantiene el estado temporal de la partida en `localStorage`, protege la navegación con Google Auth vía Supabase y puede leer contenido desde Supabase con fallback a los datos locales actuales.

## Stack

- Vite + React
- TypeScript
- React Router
- Supabase JS
- Motion
- Estilos actuales del proyecto
- Vercel

## Variables de entorno

Crea un archivo `.env` a partir de `.env.example`:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Ejecutar localmente

```bash
npm install
npm run dev
```

La app usa la ruta `/auth/callback` para terminar el login con Google.

## Configuración mínima de Supabase

1. Crea un proyecto en Supabase.
2. Habilita Google en `Authentication > Providers`.
3. Agrega estas URLs a los redirect URLs permitidos en Supabase Auth:
   - `http://localhost:3000/auth/callback`
   - `https://tu-dominio.vercel.app/auth/callback`
4. Usa únicamente la `anon key` en el frontend.

## Tablas esperadas

- `profiles`
- `categories`
- `levels`
- `questions`
- `user_level_progress`
- `game_sessions`

## Esquema funcional esperado

- `categories` alimenta la lista de categorías.
- `levels` alimenta los niveles por categoría.
- `questions` alimenta las preguntas por nivel.
- `user_level_progress` guarda el progreso final de cada nivel por usuario.

Si Supabase no devuelve datos para categorías, niveles o preguntas, la app sigue funcionando con el contenido local de `src/app/data/gameData.ts`.

## Despliegue en Vercel

La app incluye `vercel.json` para que React Router funcione como SPA en recargas directas de rutas privadas.

Build de producción:

```bash
npm run build
```

## Notas

- `GameContext` sigue siendo la fuente principal del estado de la partida.
- El guardado remoto de progreso se hace al completar el nivel.
- No se usa `service_role` en el frontend.
