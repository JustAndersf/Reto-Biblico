import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { useGame } from "../../context/GameContext";
import { AnimatedHearts } from "../ui/AnimatedHearts";
import { VerseCard } from "../ui/VerseCard";
import confetti from "canvas-confetti";

interface CorrectState {
  points: number;
  totalScore: number;
  lives: number;
  categoryId: string;
  levelId: number;
  categoryColor: string;
}

const ENCOURAGEMENT_MESSAGES = [
  "¡Eso es! ¡La gloria de Dios brilla!",
  "¡Excelente! Sigues creciendo en fe.",
  "¡Perfecto! La Palabra vive en ti.",
  "¡Maravilloso! Dios sonríe contigo.",
  "¡Increíble! El conocimiento es poder.",
];

const ENCOURAGEMENT_VERSES = [
  { verse: "El que ama la instrucción, ama el conocimiento.", reference: "Proverbios 12:1" },
  { verse: "La sabiduría es lo principal; adquiere sabiduría.", reference: "Proverbios 4:7" },
  { verse: "Bienaventurado el hombre que halla la sabiduría.", reference: "Proverbios 3:13" },
  { verse: "Tu palabra es una lámpara a mis pies y una lumbrera a mi camino.", reference: "Salmos 119:105" },
  { verse: "El temor de Jehová es el principio de la sabiduría.", reference: "Proverbios 9:10" },
  { verse: "Dichoso el que halla sabiduría, el que adquiere inteligencia.", reference: "Proverbios 3:13" },
];

export function CorrectScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { nextQuestion } = useGame();

  const data = location.state as CorrectState;

  // Versículo rotatorio basado en el total de puntos para variar entre sesiones
  const verseIndex = Math.floor(Date.now() / 1000) % ENCOURAGEMENT_VERSES.length;
  const currentVerse = ENCOURAGEMENT_VERSES[verseIndex];
  const message = ENCOURAGEMENT_MESSAGES[Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)];

  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.55 },
      colors: ["#4A7FD4", "#5BB89A", "#F0B429", "#C4607A", "#7B5FBB"],
      ticks: 150,
    });
  }, []);

  const handleNext = () => {
    nextQuestion();
    navigate(`/game/${data.categoryId}/${data.levelId}`);
  };

  return (
    <div
      className="flex flex-col items-center justify-between min-h-full px-4 sm:px-6 py-6 sm:py-8"
      style={{ background: "var(--game-bg)" }}
    >
      {/* Top — vidas */}
      <div className="w-full flex justify-end">
        <AnimatedHearts lives={data?.lives ?? 3} size={22} />
      </div>

      {/* Centro */}
      <div className="flex flex-col items-center gap-4 sm:gap-6 flex-1 justify-center w-full">
        {/* Icono de éxito con animación spring */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 10, stiffness: 200 }}
          className="flex items-center justify-center"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "36px",
            background: "linear-gradient(135deg, #5BB89A, #3A9878)",
            boxShadow: "0 12px 40px rgba(91, 184, 154, 0.45)",
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: 2, duration: 0.5, delay: 0.3 }}
            style={{ fontSize: "54px" }}
          >
            ✅
          </motion.span>
        </motion.div>

        {/* Texto de correcto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-2"
        >
          <h1
            style={{
              fontFamily: "var(--game-font-serif)",
              fontWeight: 700,
              fontSize: "34px",
              color: "#2A7A5A",
              textAlign: "center",
            }}
          >
            ¡Correcto!
          </h1>
          <p
            style={{
              fontFamily: "var(--game-font-sans)",
              fontSize: "16px",
              color: "#5A7A6A",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            {message}
          </p>
        </motion.div>

        {/* Badge de puntos */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, type: "spring" }}
          className="flex flex-col items-center gap-1 py-5 px-10"
          style={{
            background: "var(--game-card)",
            borderRadius: "var(--game-radius-xl)",
            boxShadow: "0 4px 20px rgba(91,184,154,0.2)",
            border: "2px solid rgba(91,184,154,0.3)",
          }}
        >
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ rotate: [0, 20, -10, 0], scale: [1, 1.3, 1] }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{ fontSize: "24px" }}
            >
              ⭐
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", damping: 8 }}
              style={{
                fontFamily: "var(--game-font-sans)",
                fontWeight: 800,
                fontSize: "36px",
                color: "var(--game-gold)",
              }}
            >
              +{data?.points ?? 0}
            </motion.span>
          </div>
          <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "13px", color: "var(--game-text-soft)" }}>
            puntos ganados
          </p>
          <div
            className="mt-2 px-4 py-2"
            style={{ background: "var(--game-bg)", borderRadius: "var(--game-radius-md)" }}
          >
            <p style={{ fontFamily: "var(--game-font-sans)", fontWeight: 700, fontSize: "14px", color: "var(--game-blue)" }}>
              Total: {data?.totalScore ?? 0} pts ✨
            </p>
          </div>
        </motion.div>

        {/* Versículo rotatorio */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full"
        >
          <VerseCard verse={currentVerse.verse} reference={currentVerse.reference} />
        </motion.div>
      </div>

      {/* Botón siguiente */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleNext}
        id="btn-siguiente-pregunta"
        className="w-full py-5 flex items-center justify-center gap-2"
        style={{
          background: "linear-gradient(135deg, #5BB89A, #3A9878)",
          borderRadius: "var(--game-radius-xl)",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 8px 24px rgba(91,184,154,0.4)",
        }}
      >
        <span style={{ fontFamily: "var(--game-font-sans)", fontWeight: 800, fontSize: "18px", color: "#FFFFFF" }}>
          Siguiente Pregunta
        </span>
        <span style={{ fontSize: "18px" }}>→</span>
      </motion.button>
    </div>
  );
}
