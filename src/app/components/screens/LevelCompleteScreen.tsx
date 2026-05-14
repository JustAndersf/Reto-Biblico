import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Star, Trophy, CheckCircle2, Home, RotateCcw, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useGame } from "../../context/GameContext";
import { getCategoryById } from "../../data/gameData";
import { completeDailyLevel } from "../../services/progressService";
import { supabase } from "../../../lib/supabaseClient";
import confetti from "canvas-confetti";

interface LevelCompleteState {
  categoryId: string;
  levelId: number;
  points: number;
  correctAnswers: number;
  totalQuestions: number;
  stars: number;
  categoryColor: string;
  categoryEmoji: string;
  categoryName: string;
}

export function LevelCompleteScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, startGame, addPoints, updateDailyChallenges } = useGame();
  const [dailyRewardProcessed, setDailyRewardProcessed] = useState(false);

  const data = location.state as LevelCompleteState;
  const category = data?.categoryId ? getCategoryById(data.categoryId) : null;
  const totalLevelsInCategory = category?.levels.length ?? 5;

  useEffect(() => {
    const processDailyChallenge = async () => {
      if (dailyRewardProcessed || !supabase) return;

      try {
        const { data } = await supabase.auth.getUser();
        if (!data.user) return;

        const reward = await completeDailyLevel(data.user.id);
        if (reward.points > 0) {
          addPoints(reward.points);
          toast.success(reward.message, {
            duration: 4000,
          });

          if (reward.type === 'racha') {
            updateDailyChallenges({ rachaBonusClaimed: true });
          } else if (reward.type === 'desafio') {
            updateDailyChallenges({ desafioBonusClaimed: true });
          }
        }
        setDailyRewardProcessed(true);
      } catch {
        // Silently fail if daily challenge processing fails
      }
    };

    processDailyChallenge();
  }, [dailyRewardProcessed, addPoints, updateDailyChallenges]);

  useEffect(() => {
    const t1 = setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.5 },
        colors: ["#4A7FD4", "#5BB89A", "#F0B429", "#C4607A", "#7B5FBB"],
      });
    }, 300);

    const t2 = setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
      });
    }, 600);

    const t3 = setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
      });
    }, 900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleNextLevel = () => {
    const nextLevelId = (data?.levelId ?? 1) + 1;
    startGame(data.categoryId, nextLevelId);
    navigate(`/game/${data.categoryId}/${nextLevelId}`);
  };

  const handleRetry = () => {
    startGame(data.categoryId, data.levelId);
    navigate(`/game/${data.categoryId}/${data.levelId}`);
  };

  const correctAnswers = data?.correctAnswers ?? 0;
  const totalQuestions = data?.totalQuestions ?? 5;
  const stars = data?.stars ?? 1;
  const points = data?.points ?? 0;
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

  const getStarMessage = () => {
    if (stars === 3) return "¡Perfección total! ¡Eres un experto bíblico!";
    if (stars === 2) return "¡Muy bien! Sigues creciendo en sabiduría.";
    return "¡Lo lograste! La práctica te lleva a la excelencia.";
  };

  return (
    <div
      className="flex flex-col min-h-full"
      style={{ background: "#EEF4FB" }}
    >
      <div
        className="px-5 pt-4 pb-8 flex flex-col items-center"
        style={{
          background: `linear-gradient(165deg, ${data?.categoryColor ?? "#4A7FD4"}, ${data?.categoryColor ?? "#3A6FBF"}BB)`,
          borderBottomLeftRadius: "30px",
          borderBottomRightRadius: "30px",
        }}
      >
        <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.8)", marginBottom: "4px" }}>
          {data?.categoryEmoji} {data?.categoryName}
        </p>

        <motion.div
          initial={{ scale: 0, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 10, stiffness: 180, delay: 0.1 }}
          className="flex items-center justify-center mb-4"
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "28px",
            background: "rgba(255,255,255,0.25)",
            border: "2px solid rgba(255,255,255,0.4)",
          }}
        >
          <Trophy size={44} color="#FFD700" fill="#FFD700" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: "Lora, serif",
            fontWeight: 700,
            fontSize: "26px",
            color: "#FFFFFF",
            textAlign: "center",
          }}
        >
          ¡Nivel {data?.levelId} Completado!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontFamily: "Nunito, sans-serif",
            fontSize: "14px",
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            marginTop: "6px",
          }}
        >
          {getStarMessage()}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="flex items-center gap-3 mt-4"
        >
          {[1, 2, 3].map((s) => (
            <motion.div
              key={s}
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: s <= stars ? 1 : 0.75, rotate: 0 }}
              transition={{ delay: 0.4 + s * 0.12, type: "spring", damping: 10 }}
            >
              <Star
                size={s === 2 ? 46 : 36}
                color={s <= stars ? "#FFD700" : "rgba(255,255,255,0.3)"}
                fill={s <= stars ? "#FFD700" : "transparent"}
                strokeWidth={2}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="px-5 py-5 flex flex-col gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-2 gap-3"
        >
          {[
            { label: "Puntos obtenidos", value: `${points} pts`, icon: "⭐", color: "#F0B429", bg: "#FFF9EC" },
            { label: "Total acumulado", value: `${state.totalPoints} pts`, icon: "🏆", color: "#4A7FD4", bg: "#EBF3FD" },
            { label: "Respuestas correctas", value: `${correctAnswers}/${totalQuestions}`, icon: "✅", color: "#5BB89A", bg: "#E8F7F0" },
            { label: "Precisión", value: `${accuracy}%`, icon: "🎯", color: "#C4607A", bg: "#FDEEF3" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center py-4 px-3"
              style={{
                background: stat.bg,
                borderRadius: "18px",
                border: `1px solid ${stat.color}30`,
              }}
            >
              <span style={{ fontSize: "22px" }}>{stat.icon}</span>
              <p
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontWeight: 800,
                  fontSize: "18px",
                  color: stat.color,
                  marginTop: "4px",
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontFamily: "Nunito, sans-serif",
                  fontSize: "11px",
                  color: "#8EABC9",
                  textAlign: "center",
                  marginTop: "2px",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2 px-4 py-3"
          style={{
            background: "#E8F7F0",
            borderRadius: "14px",
            border: "1px solid rgba(91,184,154,0.3)",
          }}
        >
          <CheckCircle2 size={16} color="#5BB89A" />
          <p
            style={{
              fontFamily: "Nunito, sans-serif",
              fontSize: "13px",
              color: "#2A7A5A",
              fontWeight: 600,
            }}
          >
            ¡Progreso guardado automáticamente! 💾
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-col gap-3"
        >
          {data?.levelId < totalLevelsInCategory && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleNextLevel}
              className="w-full py-4 flex items-center justify-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${data?.categoryColor ?? "#4A7FD4"}, ${data?.categoryColor ?? "#3A6FBF"}BB)`,
                borderRadius: "18px",
                border: "none",
                cursor: "pointer",
                boxShadow: `0 6px 20px ${data?.categoryColor ?? "#4A7FD4"}50`,
              }}
            >
              <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "16px", color: "#FFFFFF" }}>
                Siguiente Nivel
              </span>
              <ChevronRight size={18} color="white" strokeWidth={2.5} />
            </motion.button>
          )}

          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleRetry}
              className="py-4 flex items-center justify-center gap-2"
              style={{
                background: "#FFFFFF",
                borderRadius: "18px",
                border: "2px solid #E2EAF4",
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(74,127,212,0.1)",
              }}
            >
              <RotateCcw size={15} color="#4A7FD4" strokeWidth={2.5} />
              <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "14px", color: "#4A7FD4" }}>
                Repetir
              </span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/home")}
              className="py-4 flex items-center justify-center gap-2"
              style={{
                background: "#FFFFFF",
                borderRadius: "18px",
                border: "2px solid #E2EAF4",
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(74,127,212,0.1)",
              }}
            >
              <Home size={15} color="#4A7FD4" strokeWidth={2.5} />
              <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 700, fontSize: "14px", color: "#4A7FD4" }}>
                Inicio
              </span>
            </motion.button>
          </div>
        </motion.div>

        <div className="h-2" />
      </div>
    </div>
  );
}
