import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { useGame } from "../../context/GameContext";
import { LifeHearts } from "../LifeHearts";
import { saveCurrentUserLevelProgress } from "../../services/progressService";

interface IncorrectState {
  correctIndex: number;
  correctAnswer: string;
  lives: number;
  categoryId: string;
  levelId: number;
  categoryColor: string;
  isLast?: boolean;
  currentScore?: number;
  correctAnswers?: number;
  totalQ?: number;
  categoryEmoji?: string;
  categoryName?: string;
}

export function IncorrectScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { nextQuestion, state, completeLevel } = useGame();

  const data = location.state as IncorrectState;

  const handleContinue = () => {
    if (data.isLast && data.currentScore !== undefined && data.correctAnswers !== undefined && data.totalQ !== undefined) {
      const stars =
        data.correctAnswers === data.totalQ
          ? 3
          : data.correctAnswers >= Math.ceil(data.totalQ * 0.7)
          ? 2
          : 1;

      completeLevel({
        categoryId: data.categoryId,
        levelId: data.levelId,
        completed: true,
        stars,
        points: data.currentScore,
        correctAnswers: data.correctAnswers,
        totalQuestions: data.totalQ,
      });

      void saveCurrentUserLevelProgress({
        categoryId: data.categoryId,
        levelId: data.levelId,
        completed: true,
        stars,
        points: data.currentScore,
        correctAnswers: data.correctAnswers,
        totalQuestions: data.totalQ,
      });

      navigate("/level-complete", {
        state: {
          categoryId: data.categoryId,
          levelId: data.levelId,
          points: data.currentScore,
          correctAnswers: data.correctAnswers,
          totalQuestions: data.totalQ,
          stars,
          categoryColor: data.categoryColor,
          categoryEmoji: data.categoryEmoji,
          categoryName: data.categoryName,
        },
      });
    } else {
      nextQuestion();
      navigate(`/game/${data.categoryId}/${data.levelId}`);
    }
  };

  const MESSAGES = [
    "¡No te rindas! Cada error es una lección.",
    "¡Ánimo! La perseverancia trae victoria.",
    "¡Casi! Sigue adelante con fe y valor.",
    "¡Continúa! Dios fortalece a los que perseveran.",
    "¡Sigue intentando! El camino vale la pena.",
  ];
  const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

  const livesRemaining = data?.lives ?? 2;

  return (
    <div
      className="flex flex-col items-center justify-between min-h-full px-4 sm:px-6 py-6 sm:py-8"
      style={{ background: "#EEF4FB" }}
    >
      {/* Top: Lives */}
      <div className="w-full flex items-center justify-between">
        <p
          style={{
            fontFamily: "Nunito, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(12px, 2.5vw, 15px)",
            color: "#E85474",
          }}
        >
          Vidas restantes
        </p>
        <LifeHearts lives={livesRemaining} size={22} />
      </div>

      {/* Center Content */}
      <div className="flex flex-col items-center gap-4 sm:gap-6 flex-1 justify-center">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: 10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 12, stiffness: 180 }}
          className="flex items-center justify-center"
          style={{
            width: "110px",
            height: "110px",
            borderRadius: "34px",
            background: "linear-gradient(135deg, #F09060, #E87040)",
            boxShadow: "0 10px 35px rgba(232,112,64,0.4)",
          }}
        >
          <span style={{ fontSize: "50px" }}>😔</span>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-2"
        >
          <h1
            style={{
              fontFamily: "Lora, serif",
              fontWeight: 700,
              fontSize: "30px",
              color: "#C45030",
              textAlign: "center",
            }}
          >
            ¡Casi lo logras!
          </h1>
          <p
            style={{
              fontFamily: "Nunito, sans-serif",
              fontSize: "15px",
              color: "#7A5040",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            {message}
          </p>
        </motion.div>

        {/* Correct Answer Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full p-5"
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            boxShadow: "0 4px 18px rgba(91,184,154,0.15)",
            border: "2px solid rgba(91,184,154,0.4)",
          }}
        >
          <p
            style={{
              fontFamily: "Nunito, sans-serif",
              fontSize: "12px",
              color: "#8EABC9",
              marginBottom: "8px",
              letterSpacing: "0.5px",
            }}
          >
            LA RESPUESTA CORRECTA ERA:
          </p>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "12px",
                background: "#E8F7F0",
              }}
            >
              <span style={{ fontSize: "18px" }}>✅</span>
            </div>
            <p
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                color: "#2A7A5A",
                flex: 1,
                lineHeight: 1.4,
              }}
            >
              {data?.correctAnswer ?? "—"}
            </p>
          </div>
        </motion.div>

        {/* Life lost indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-2 px-4 py-3"
          style={{
            background: "#FEF0EE",
            borderRadius: "14px",
            border: "1px solid rgba(232,84,116,0.2)",
          }}
        >
          <span style={{ fontSize: "16px" }}>💔</span>
          <p
            style={{
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              fontSize: "13px",
              color: "#C43050",
            }}
          >
            Perdiste 1 vida — Te quedan {livesRemaining}
          </p>
        </motion.div>

        {/* Motivational verse */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="px-5 py-3 w-full"
          style={{
            background: "#F5EFE6",
            borderRadius: "16px",
            border: "1px solid rgba(212,146,91,0.2)",
          }}
        >
          <p
            style={{
              fontFamily: "Lora, serif",
              fontStyle: "italic",
              fontSize: "13px",
              color: "#7A5030",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            "Todo lo puedo en Cristo que me fortalece." — Fil. 4:13
          </p>
        </motion.div>
      </div>

      {/* Continue button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleContinue}
        className="w-full py-5 flex items-center justify-center gap-2"
        style={{
          background: "linear-gradient(135deg, #4A7FD4, #3A6FBF)",
          borderRadius: "22px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(74,127,212,0.4)",
        }}
      >
        <span
          style={{
            fontFamily: "Nunito, sans-serif",
            fontWeight: 800,
            fontSize: "18px",
            color: "#FFFFFF",
          }}
        >
          Continuar →
        </span>
      </motion.button>
    </div>
  );
}
