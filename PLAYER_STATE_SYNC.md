# Player State Synchronization - Implementation Guide

## 📋 Cambios Realizados

### Problema Identificado
El sistema **NO estaba guardando** vidas globales, monedas, timestamps de regeneración y puntos en Supabase. Esto causaba:
- ❌ Usuario pierde 3 vidas, cierra sesión → Al volver, tiene 3 vidas de nuevo
- ❌ Usuario gasta monedas, cierra sesión → Al volver, monedas se restauran
- ❌ Contador de regeneración se pierde al recargar

### Solución Implementada

#### 1. **progressService.ts** - Nuevas funciones
```typescript
// Guardar estado del jugador en Supabase
savePlayerState(userId, state)
saveCurrentPlayerState(state)

// Cargar estado del jugador desde Supabase
getPlayerState(userId)
```

#### 2. **GameContext.tsx** - Sincronización mejorada
- ✅ Carga vidas, monedas, puntos, timestamps al autenticarse
- ✅ Guarda estos valores en Supabase cada vez que cambian (con 1s delay para optimizar)
- ✅ Sincroniza automáticamente al cambiar estado de autenticación

---

## 🔧 Instalación - PASOS REQUERIDOS

### Paso 1: Crear tabla en Supabase

1. Abre tu proyecto en Supabase: https://app.supabase.com
2. Ve a **SQL Editor** → **New Query**
3. Copia el contenido de `supabase-migrations.sql`
4. Ejecuta la query

O ejecuta directamente con curl:
```bash
psql "postgresql://postgres:PASSWORD@db.supabase.co:5432/postgres" < supabase-migrations.sql
```

### Paso 2: Verificar tabla creada
En Supabase, ve a **Table Editor** y confirma que existe `player_state` con estos campos:
- `id` (UUID)
- `user_id` (UUID) - FK a auth.users
- `global_lives` (integer) - default 3
- `coins` (integer) - default 0
- `total_points` (integer) - default 0
- `regen_timestamps` (bigint[]) - array
- `settings` (jsonb) - objeto
- `created_at`, `updated_at` (timestamp)

### Paso 3: Desplegar código
El código ya está en el repositorio. Solo necesitas:
```bash
npm run build
# Deployar normalmente
```

---

## 📊 Cómo Funciona Ahora

### Flujo de Sincronización

```
Usuario abre app
    ↓
GameContext monta
    ↓
1️⃣ Carga desde localStorage (inmediato)
    ↓
2️⃣ Verifica autenticación
    ↓
3️⃣ Si autenticado:
    - Carga levelProgress desde Supabase
    - Carga player_state desde Supabase
    - Combina con estado local
    ↓
4️⃣ Usuario juega
    ↓
5️⃣ Cada cambio en vidas/monedas/puntos:
    - Se guarda en localStorage (inmediato)
    - Se guarda en Supabase (después de 1s)
    ↓
6️⃣ Usuario cierra sesión
    ↓
7️⃣ Usuario reabre app
    ↓
... Repite desde paso 1, pero carga datos de Supabase ✅
```

---

## ✅ Lo Que Ahora Se Persiste

| Dato | Antes | Después |
|------|-------|---------|
| Progreso de niveles | ✅ Supabase | ✅ Supabase |
| Vidas globales | ❌ Solo localStorage | ✅ Supabase |
| Monedas | ❌ Solo localStorage | ✅ Supabase |
| Puntos totales | ❌ Solo localStorage | ✅ Supabase |
| Timestamps regeneración | ❌ Solo localStorage | ✅ Supabase |
| Configuración audio | ❌ Solo localStorage | ✅ Supabase |

---

## 🎯 Próximos Pasos (Recomendado)

1. **Agregar monedas al completar niveles**
   - 1⭐ = 1 moneda
   - 2⭐ = 2 monedas
   - 3⭐ = 3 monedas

2. **Implementar desafío diario real**
   - Rastree si completó 2 niveles hoy
   - Otorgue 50 puntos automáticamente
   - Reinicie cada día

3. **Tabla de clasificación**
   - Usar `total_points` para ranking

---

## ⚠️ Notas Importantes

- El delay de 1s al guardar es para optimizar (evitar escribir a cada cambio)
- Si hay errores al guardar en Supabase, el app sigue funcionando con localStorage
- Los RLS policies aseguran que cada usuario solo acceda a su propio estado
- El código es backwards-compatible: si `player_state` no existe, funciona solo con localStorage

---

## 🧪 Pruebas Recomendadas

1. **Perder vidas y recargar**
   - Completa un nivel para que falles y pierdes 1 vida
   - Cierra el navegador
   - Reabre → Debería tener menos vidas

2. **Gastar monedas y recargar**
   - Canjea puntos por monedas
   - Cierra el navegador
   - Reabre → Monedas deben persistir

3. **Verificar sincronización en tiempo real**
   - Abre 2 pestañas simultáneamente
   - Gasta monedas en pestaña 1
   - Recarga pestaña 2 → Debería ver monedas reducidas

---

## 📞 Soporte

Si tienes problemas:
1. Verifica que la tabla `player_state` existe en Supabase
2. Revisa que los RLS policies estén creadas correctamente
3. Revisa la consola del navegador para errores de Supabase
4. Revisa que `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` están configuradas
