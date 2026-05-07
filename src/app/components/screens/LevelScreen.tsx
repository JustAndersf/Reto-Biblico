import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Lock, Star, CheckCircle2, Play } from "lucide-react";
import { useGame } from "../../context/GameContext";
import { getCategoryById as getLocalCategoryById } from "../../data/gameData";
import type { Category } from "../../types/game";
import { getCategoryById } from "../../services/categoriesService";
import { hasSupabaseEnv } from "../../../lib/supabaseClient";

export function LevelScreen() {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const { isLevelUnlocked, isLevelCompleted, getLevelResult, startGame } = useGame();
  const [category, setCategory] = useState<Category | null>(
    hasSupabaseEnv ? null : categoryId ? getLocalCategoryById(categoryId) ?? null : null,
  );
  const [isLoading, setIsLoading] = useState(hasSupabaseEnv);

  useEffect(() => {
    if (!categoryId) return;

    let isMounted = true;

    getCategoryById(categoryId)
      .then((remoteCategory) => {
        if (!isMounted) return;
        setCategory(remoteCategory ?? null);
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p style={{ fontFamily: "Nunito, sans-serif", color: "#8EABC9" }}>Cargando niveles...</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex items-center justify-center h-full">
        <p style={{ fontFamily: "Nunito, sans-serif", color: "#8EABC9" }}>Categoría no encontrada</p>
      </div>
    );
  }

  const handleLevelPress = (levelId: number) => {
    if (!isLevelUnlocked(category.id, levelId)) return;
    startGame(category.id, levelId);
    navigate(`/game/${category.id}/${levelId}`);
  };

  return (
    <div className="flex flex-col min-h-full" style={{ background: "#EEF4FB" }}>
      {/* Header */}
      <div
        className="px-5 pt-4 pb-8"
        style={{
          background: `linear-gradient(165deg, ${category.colorFrom}, ${category.colorTo})`,
          borderBottomLeftRadius: "28px",
          borderBottomRightRadius: "28px",
        }}
      >
        <div className="flex items-center gap-3 mb-5">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/categories")}
            className="flex items-center justify-center"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "13px",
              background: "rgba(255,255,255,0.25)",
              border: "none",
              cursor: "pointer",
            }}
          >
            <ArrowLeft size={18} color="white" strokeWidth={2.5} />
          </motion.button>
          <div>
            <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>
              Categoría
            </p>
            <h1 style={{ fontFamily: "Lora, serif", fontWeight: 700, fontSize: "20px", color: "#FFFFFF" }}>
              {category.emoji} {category.name}
            </h1>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-3">
          {[
            {
              label: "Niveles",
              value: category.levels.length,
            },
            {
              label: "Completados",
              value: category.levels.filter((l) => isLevelCompleted(category.id, l.id)).length,
            },
            {
              label: "Puntos",
              value: Object.values(
                Object.fromEntries(
                  category.levels
                    .filter((l) => isLevelCompleted(category.id, l.id))
                    .map((l) => [l.id, getLevelResult(category.id, l.id)?.points || 0])
                )
              ).reduce((a: number, b) => a + (b as number), 0),
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex-1 flex flex-col items-center py-3"
              style={{
                background: "rgba(255,255,255,0.18)",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "18px", color: "#FFFFFF" }}>
                {stat.value}
              </p>
              <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.75)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Levels Grid */}
      <div className="flex-1 px-5 py-5">
        <p
          style={{
            fontFamily: "Nunito, sans-serif",
            fontWeight: 700,
            fontSize: "14px",
            color: "#8EABC9",
            marginBottom: "14px",
            letterSpacing: "0.5px",
          }}
        >
          SELECCIONA UN NIVEL
        </p>

        <div className="flex flex-col gap-3">
          {category.levels.map((level, i) => {
            const unlocked = isLevelUnlocked(category.id, level.id);
            const completed = isLevelCompleted(category.id, level.id);
            const result = getLevelResult(category.id, level.id);
            const stars = result?.stars || 0;

            return (
              <motion.button
                key={level.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileTap={unlocked ? { scale: 0.97 } : {}}
                onClick={() => handleLevelPress(level.id)}
                className="flex items-center gap-4 p-4"
                style={{
                  background: completed
                    ? `linear-gradient(135deg, ${category.colorFrom}18, ${category.colorFrom}08)`
                    : "#FFFFFF",
                  borderRadius: "18px",
                  border: completed
                    ? `1.5px solid ${category.colorFrom}40`
                    : unlocked
                    ? "1.5px solid rgba(74,127,212,0.12)"
                    : "1.5px solid #E2EAF4",
                  cursor: unlocked ? "pointer" : "default",
                  opacity: unlocked ? 1 : 0.55,
                  textAlign: "left",
                  boxShadow: completed
                    ? `0 3px 16px ${category.colorFrom}20`
                    : "0 2px 10px rgba(74,127,212,0.07)",
                }}
              >
                {/* Level Badge */}
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "16px",
                    background: completed
                      ? `linear-gradient(135deg, ${category.colorFrom}, ${category.colorTo})`
                      : unlocked
                      ? "#EBF3FD"
                      : "#F0F4FA",
                  }}
                >
                  {completed ? (
                    <CheckCircle2 size={22} color="white" fill="white" strokeWidth={2} />
                  ) : unlocked ? (
                    <Play size={20} color={category.colorFrom} fill={category.colorFrom} />
                  ) : (
                    <Lock size={18} color="#A0B5CC" strokeWidth={2} />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 800,
                        fontSize: "15px",
                        color: unlocked ? "#1E3A5F" : "#8EABC9",
                      }}
                    >
                      Nivel {level.id} — {level.title}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 mt-1">
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map((s) => (
                        <Star
                          key={s}
                          size={12}
                          color={s <= stars ? "#F0B429" : "#CBD5E0"}
                          fill={s <= stars ? "#F0B429" : "transparent"}
                          strokeWidth={2}
                        />
                      ))}
                    </div>

                    {/* Points */}
                    {completed && result && (
                      <p
                        style={{
                          fontFamily: "Nunito, sans-serif",
                          fontWeight: 700,
                          fontSize: "12px",
                          color: category.colorFrom,
                        }}
                      >
                        {result.points} pts
                      </p>
                    )}

                    {!completed && unlocked && (
                      <p
                        style={{
                          fontFamily: "Nunito, sans-serif",
                          fontSize: "12px",
                          color: "#8EABC9",
                        }}
                      >
                        +{level.pointsPerQuestion * 5} pts máx
                      </p>
                    )}

                    {!unlocked && (
                      <p
                        style={{
                          fontFamily: "Nunito, sans-serif",
                          fontSize: "12px",
                          color: "#A0B5CC",
                        }}
                      >
                        Completa el nivel anterior
                      </p>
                    )}
                  </div>
                </div>

                {/* Status tag */}
                {completed && (
                  <div
                    className="px-2.5 py-1 flex-shrink-0"
                    style={{
                      background: `${category.colorFrom}20`,
                      borderRadius: "8px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 700,
                        fontSize: "11px",
                        color: category.colorFrom,
                      }}
                    >
                      ✓ Listo
                    </p>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}
