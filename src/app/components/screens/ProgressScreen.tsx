import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Star, Trophy, Target, Zap } from "lucide-react";
import { useGame } from "../../context/GameContext";
import { CATEGORIES } from "../../data/gameData";

export function ProgressScreen() {
  const navigate = useNavigate();
  const { state } = useGame();

  const totalLevels = CATEGORIES.reduce((acc, c) => acc + c.levels.length, 0);
  const completedLevels = Object.values(state.levelProgress).reduce((acc, cat) => {
    return acc + Object.values(cat).filter((l) => l.completed).length;
  }, 0);
  const overallProgress = Math.round((completedLevels / totalLevels) * 100);

  return (
    <div className="flex flex-col min-h-full" style={{ background: "#EEF4FB" }}>
      {/* Header */}
      <div
        className="px-5 pt-4 pb-7"
        style={{
          background: "linear-gradient(165deg, #3A6FBF 0%, #4A7FD4 60%, #5B9FE8 100%)",
          borderBottomLeftRadius: "28px",
          borderBottomRightRadius: "28px",
        }}
      >
        <div className="flex items-center gap-3 mb-5">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/home")}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "13px",
              background: "rgba(255,255,255,0.22)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowLeft size={18} color="white" strokeWidth={2.5} />
          </motion.button>
          <div>
            <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.75)" }}>
              Historial de juego
            </p>
            <h1 style={{ fontFamily: "Lora, serif", fontWeight: 700, fontSize: "22px", color: "#FFFFFF" }}>
              Mi Progreso
            </h1>
          </div>
        </div>

        {/* Overall stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Star, label: "Puntos Totales", value: state.totalPoints, color: "#FFD700", fill: "#FFD700" },
            { icon: Trophy, label: "Niveles Completados", value: completedLevels, color: "white", fill: "white" },
            { icon: Target, label: "Progreso General", value: `${overallProgress}%`, color: "#A8E8D8", fill: "#A8E8D8" },
            { icon: Zap, label: "Vidas Restantes", value: `${state.globalLives}/3`, color: "#FFA8B4", fill: "#FFA8B4" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 p-3"
              style={{
                background: "rgba(255,255,255,0.18)",
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.25)",
              }}
            >
              <item.icon size={18} color={item.color} fill={item.fill} strokeWidth={1.5} />
              <div>
                <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "16px", color: "#FFFFFF" }}>
                  {item.value}
                </p>
                <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.7)" }}>
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Overall progress bar */}
        <div className="mt-4">
          <div className="flex justify-between mb-1.5">
            <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>
              Progreso total del juego
            </p>
            <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "12px", color: "#FFFFFF" }}>
              {completedLevels}/{totalLevels} niveles
            </p>
          </div>
          <div style={{ height: "8px", background: "rgba(255,255,255,0.25)", borderRadius: "4px", overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ height: "100%", background: "#FFFFFF", borderRadius: "4px" }}
            />
          </div>
        </div>
      </div>

      {/* Categories Progress */}
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
          POR CATEGORÍA
        </p>

        <div className="flex flex-col gap-4">
          {CATEGORIES.map((category, catI) => {
            const catProgress = state.levelProgress[category.id] || {};
            const completedCat = Object.values(catProgress).filter((l) => l.completed).length;
            const totalCat = category.levels.length;
            const catPct = Math.round((completedCat / totalCat) * 100);
            const totalPts = Object.values(catProgress).reduce((acc, l) => acc + (l.completed ? l.points : 0), 0);

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: catI * 0.07 }}
                className="p-4"
                style={{
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  boxShadow: "0 2px 12px rgba(74,127,212,0.08)",
                  border: "1px solid rgba(74,127,212,0.07)",
                }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "14px",
                      background: `linear-gradient(135deg, ${category.colorFrom}, ${category.colorTo})`,
                    }}
                  >
                    <span style={{ fontSize: "20px" }}>{category.emoji}</span>
                  </div>
                  <div className="flex-1">
                    <p style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "15px", color: "#1E3A5F" }}>
                      {category.name}
                    </p>
                    <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", color: "#8EABC9" }}>
                      {completedCat}/{totalCat} niveles · {totalPts} pts
                    </p>
                  </div>
                  <div
                    className="px-2.5 py-1"
                    style={{
                      background: catPct === 100 ? `${category.colorFrom}20` : "#F0F4FA",
                      borderRadius: "8px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Nunito, sans-serif",
                        fontWeight: 700,
                        fontSize: "12px",
                        color: catPct === 100 ? category.colorFrom : "#8EABC9",
                      }}
                    >
                      {catPct}%
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{ height: "6px", background: "#EEF4FB", borderRadius: "3px", overflow: "hidden", marginBottom: "10px" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${catPct}%` }}
                    transition={{ duration: 0.7, delay: catI * 0.1 }}
                    style={{
                      height: "100%",
                      background: `linear-gradient(90deg, ${category.colorFrom}, ${category.colorTo})`,
                      borderRadius: "3px",
                    }}
                  />
                </div>

                {/* Level mini-cards */}
                <div className="grid grid-cols-5 gap-2">
                  {category.levels.map((level) => {
                    const res = catProgress[level.id];
                    const done = res?.completed;
                    const stars = res?.stars ?? 0;

                    return (
                      <div
                        key={level.id}
                        className="flex flex-col items-center py-2"
                        style={{
                          background: done ? `${category.colorFrom}18` : "#F5F7FA",
                          borderRadius: "10px",
                          border: done ? `1px solid ${category.colorFrom}30` : "1px solid #E2EAF4",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "Nunito, sans-serif",
                            fontWeight: 800,
                            fontSize: "13px",
                            color: done ? category.colorFrom : "#A0B5CC",
                          }}
                        >
                          {level.id}
                        </p>
                        <div className="flex gap-0.5">
                          {[1, 2, 3].map((s) => (
                            <Star
                              key={s}
                              size={7}
                              color={s <= stars ? "#F0B429" : "#CBD5E0"}
                              fill={s <= stars ? "#F0B429" : "transparent"}
                              strokeWidth={2}
                            />
                          ))}
                        </div>
                        {done && res && (
                          <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "9px", color: "#8EABC9", marginTop: "1px" }}>
                            {res.points}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state */}
        {completedLevels === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-3 py-8"
          >
            <span style={{ fontSize: "40px" }}>🌱</span>
            <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "15px", color: "#8EABC9", textAlign: "center" }}>
              ¡Aún no has completado ningún nivel!{"\n"}¡Comienza tu aventura bíblica!
            </p>
          </motion.div>
        )}

        <div className="h-4" />
      </div>
    </div>
  );
}
