import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useGame } from "../../context/GameContext";
import { CATEGORIES } from "../../data/gameData";
import type { Category } from "../../types/game";
import { getCategories } from "../../services/categoriesService";
import { hasSupabaseEnv } from "../../../lib/supabaseClient";

export function CategoryScreen() {
  const navigate = useNavigate();
  const { state, isLevelUnlocked } = useGame();
  const [categories, setCategories] = useState<Category[]>(hasSupabaseEnv ? [] : CATEGORIES);
  const [isLoading, setIsLoading] = useState(hasSupabaseEnv);

  useEffect(() => {
    let isMounted = true;

    getCategories()
      .then((remoteCategories) => {
        if (!isMounted) return;
        setCategories(remoteCategories);
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const getCategoryProgress = (categoryId: string) => {
    const progress = state.levelProgress[categoryId] || {};
    const completed = Object.values(progress).filter((l) => l.completed).length;
    return completed;
  };

  return (
    <div className="flex flex-col min-h-full" style={{ background: "#EEF4FB" }}>
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 pt-4 pb-5">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/home")}
          className="flex items-center justify-center flex-shrink-0"
          style={{
            width: "clamp(36px, 8vw, 44px)",
            height: "clamp(36px, 8vw, 44px)",
            borderRadius: "clamp(10px, 2vw, 16px)",
            background: "#FFFFFF",
            boxShadow: "0 2px 8px rgba(74,127,212,0.12)",
            border: "none",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={18} color="#4A7FD4" strokeWidth={2.5} />
        </motion.button>
        <div className="flex-1 min-w-0">
          <h1
            style={{
              fontFamily: "Lora, serif",
              fontWeight: 700,
              fontSize: "clamp(18px, 5vw, 28px)",
              color: "#1E3A5F",
              lineHeight: 1.1,
            }}
          >
            Categorías
          </h1>
          <p
            style={{
              fontFamily: "Nunito, sans-serif",
              fontSize: "clamp(11px, 2.5vw, 14px)",
              color: "#8EABC9",
            }}
          >
            Elige un tema para explorar
          </p>
        </div>
      </div>

      {/* Category List */}
      <div className="flex-1 px-4 sm:px-6 pb-6 flex flex-col gap-3 sm:gap-4">
        {isLoading && (
          <div className="flex flex-1 items-center justify-center px-4">
            <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "14px", color: "#8EABC9" }}>
              Cargando categorias...
            </p>
          </div>
        )}

        {!isLoading &&
          categories.map((category, i) => {
          const completed = getCategoryProgress(category.id);
          const totalLevels = category.levels.length;
          const firstUnlocked = isLevelUnlocked(category.id, 1);

          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/levels/${category.id}`)}
              className="w-full flex items-center gap-4 p-4"
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                boxShadow: "0 3px 14px rgba(74,127,212,0.09)",
                border: "1px solid rgba(74,127,212,0.07)",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {/* Emoji Badge */}
              <div
                className="flex items-center justify-center flex-shrink-0"
                style={{
                  width: "58px",
                  height: "58px",
                  borderRadius: "18px",
                  background: `linear-gradient(135deg, ${category.colorFrom}, ${category.colorTo})`,
                  boxShadow: `0 4px 14px ${category.colorFrom}55`,
                }}
              >
                <span style={{ fontSize: "26px" }}>{category.emoji}</span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontWeight: 800,
                    fontSize: "16px",
                    color: "#1E3A5F",
                  }}
                >
                  {category.name}
                </p>
                <p
                  style={{
                    fontFamily: "Nunito, sans-serif",
                    fontSize: "12px",
                    color: "#8EABC9",
                    marginTop: "2px",
                  }}
                >
                  {category.description}
                </p>

                {/* Progress bar */}
                <div className="mt-2.5 flex items-center gap-2">
                  <div
                    style={{
                      flex: 1,
                      height: "6px",
                      background: "#EEF4FB",
                      borderRadius: "3px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${(completed / totalLevels) * 100}%`,
                        background: `linear-gradient(90deg, ${category.colorFrom}, ${category.colorTo})`,
                        borderRadius: "3px",
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "Nunito, sans-serif",
                      fontWeight: 700,
                      fontSize: "11px",
                      color: "#8EABC9",
                    }}
                  >
                    {completed}/{totalLevels}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <ChevronRight size={18} color="#8EABC9" />
            </motion.button>
          );
          })}

        <div className="h-2" />
      </div>
    </div>
  );
}
