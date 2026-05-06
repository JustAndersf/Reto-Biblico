import { useNavigate, useLocation } from "react-router";
import { motion } from "motion/react";
import { Home, RotateCcw, Clock } from "lucide-react";
import { useGame } from "../../context/GameContext";
import { MAX_LIVES } from "../../data/gameData";

interface GameOverState {
  categoryId: string;
  levelId: number;
  score: number;
  categoryColor: string;
  categoryName: string;
}

export function GameOverScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, startGame, nextRegenSeconds } = useGame();

  const data = location.state as GameOverState;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const canPlay = state.globalLives > 0;

  const handleRetry = () => {
    if (!canPlay) return;
    startGame(data.categoryId, data.levelId);
    navigate(`/game/${data.categoryId}/${data.levelId}`);
  };

  const handleHome = () => navigate("/home");

  return (
    <div
      className="flex flex-col items-center justify-between min-h-full px-6 py-10"
      style={{ background: "#EEF4FB" }}
    >
      {/* Top decoration */}
      <div className="w-full flex justify-center">
        <div
          style={{
            width: "50px",
            height: "5px",
            background: "#CBD5E0",
            borderRadius: "3px",
          }}
        />
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center gap-6 flex-1 justify-center">
        {/* Main icon */}
        <motion.div
          initial={{ scale: 0, y: -30 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 10, stiffness: 160 }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "36px",
              background: "linear-gradient(135deg, #E89060, #D05030)",
              boxShadow: "0 14px 40px rgba(208,80,48,0.35)",
            }}
          >
            <span style={{ fontSize: "58px" }}>💔</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-col items-center gap-2"
        >
          <h1
            style={{
              fontFamily: "Lora, serif",
              fontWeight: 700,
              fontSize: "30px",
              color: "#C04030",
              textAlign: "center",
            }}
          >
            ¡Sin Vidas!
          </h1>
          <p
            style={{
              fontFamily: "Nunito, sans-serif",
              fontSize: "16px",
              color: "#7A5040",
              textAlign: "center",
              lineHeight: 1.55,
            }}
          >
            No te desanimes. Cada intento
          </p>
          <p
            style={{
              fontFamily: "Nunito, sans-serif",
              fontSize: "16px",
              color: "#7A5040",
              textAlign: "center",
              lineHeight: 1.55,
            }}
          >
            te hace más sabio.
          </p>
        </motion.div>

        {/* Score card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col items-center gap-2 py-5 px-10"
          style={{
            background: "#FFFFFF",
            borderRadius: "22px",
            boxShadow: "0 4px 20px rgba(74,127,212,0.12)",
            border: "1.5px solid #E2EAF4",
          }}
        >
          <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", color: "#8EABC9" }}>
            Puntos conseguidos
          </p>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: "28px" }}>⭐</span>
            <span
              style={{
                fontFamily: "Nunito, sans-serif",
                fontWeight: 800,
                fontSize: "38px",
                color: "#F0B429",
              }}
            >
              {data?.score ?? 0}
            </span>
          </div>
          <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", color: "#8EABC9" }}>
            {data?.categoryName ?? "—"}
          </p>
        </motion.div>

        {/* Encouragement verse */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="px-5 py-4 w-full"
          style={{
            background: "#F5EFE6",
            borderRadius: "18px",
            border: "1px solid rgba(212,146,91,0.2)",
          }}
        >
          <p
            style={{
              fontFamily: "Lora, serif",
              fontStyle: "italic",
              fontSize: "14px",
              color: "#7A5030",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            "Los justos caerán siete veces, y volverán a levantarse."
          </p>
          <p
            style={{
              fontFamily: "Nunito, sans-serif",
              fontSize: "12px",
              color: "#A07850",
              textAlign: "center",
              marginTop: "6px",
            }}
          >
            — Proverbios 24:16
          </p>
        </motion.div>

        {/* Global lives + regen info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="px-4 py-3 w-full flex flex-col items-center gap-2"
          style={{
            background: "#FEF3F5",
            borderRadius: "14px",
            border: "1px solid rgba(232,84,116,0.2)",
          }}
        >
          <div className="flex items-center gap-2">
            <span style={{ fontSize: "16px" }}>❤️</span>
            <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", color: "#C43050", fontWeight: 700 }}>
              Vidas globales: {state.globalLives} / {MAX_LIVES}
            </p>
          </div>
          {nextRegenSeconds !== null && (
            <div className="flex items-center gap-1.5">
              <Clock size={13} color="#C43050" />
              <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", color: "#C43050" }}>
                Próxima vida en {formatTime(nextRegenSeconds)}
              </p>
            </div>
          )}
          {state.globalLives === 0 && (
            <p style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", color: "#C43050", fontWeight: 600, textAlign: "center" }}>
              Sin vidas globales — espera a que se regenere una para jugar
            </p>
          )}
        </motion.div>
      </div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="w-full flex flex-col gap-3"
      >
        <motion.button
          whileTap={canPlay ? { scale: 0.97 } : {}}
          onClick={handleRetry}
          className="w-full py-5 flex items-center justify-center gap-3"
          style={{
            background: canPlay
              ? "linear-gradient(135deg, #4A7FD4, #3A6FBF)"
              : "#CBD5E0",
            borderRadius: "22px",
            border: "none",
            cursor: canPlay ? "pointer" : "not-allowed",
            boxShadow: canPlay ? "0 8px 24px rgba(74,127,212,0.4)" : "none",
            opacity: canPlay ? 1 : 0.6,
          }}
        >
          <RotateCcw size={18} color="white" strokeWidth={2.5} />
          <span style={{ fontFamily: "Nunito, sans-serif", fontWeight: 800, fontSize: "18px", color: "#FFFFFF" }}>
            {canPlay ? "Reintentar" : "Sin vidas globales"}
          </span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleHome}
          className="w-full py-4 flex items-center justify-center gap-2"
          style={{
            background: "#FFFFFF",
            borderRadius: "18px",
            border: "2px solid #E2EAF4",
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(74,127,212,0.1)",
          }}
        >
          <Home size={17} color="#4A7FD4" strokeWidth={2.5} />
          <span
            style={{
              fontFamily: "Nunito, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              color: "#4A7FD4",
            }}
          >
            Volver al Inicio
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
