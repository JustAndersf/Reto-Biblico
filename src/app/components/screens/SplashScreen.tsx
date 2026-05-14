import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useAuth } from "../../hooks/useAuth";

export function SplashScreen() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  const targetRoute = isAuthenticated ? "/home" : "/login";
  const handleStart = () => navigate(targetRoute);

  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => navigate(targetRoute), 4000);
    return () => clearTimeout(timer);
  }, [loading, navigate, targetRoute]);

  return (
    <div
      className="flex flex-col items-center justify-between min-h-full px-8 py-10"
      style={{
        background: "linear-gradient(175deg, #3A6FBF 0%, #4A7FD4 30%, #5B9FE8 65%, #7BB8F0 100%)",
      }}
    >
      {/* Top decorative circles */}
      <div className="w-full flex justify-between pt-2">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.4)",
            position: "absolute",
            top: "30px",
            left: "-20px",
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.4 }}
          style={{
            width: "130px",
            height: "130px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.3)",
            position: "absolute",
            top: "-30px",
            right: "-30px",
          }}
        />
      </div>

      {/* Center: Logo + Title */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4 sm:gap-6 mt-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Logo Circle */}
          <div
            className="flex items-center justify-center mb-3 sm:mb-4"
            style={{
              width: "clamp(80px, 15vw, 140px)",
              height: "clamp(80px, 15vw, 140px)",
              borderRadius: "clamp(24px, 4vw, 36px)",
              background: "rgba(255,255,255,0.95)",
              boxShadow: "0 12px 40px rgba(74,127,212,0.4), 0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <span style={{ fontSize: "clamp(40px, 10vw, 64px)" }}>📖</span>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              fontFamily: "Lora, serif",
              fontWeight: 700,
              fontSize: "clamp(24px, 6vw, 40px)",
              color: "#FFFFFF",
              textAlign: "center",
              letterSpacing: "-0.5px",
              lineHeight: 1.2,
            }}
          >
            Reto Bíblico
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              fontFamily: "Nunito, sans-serif",
              fontSize: "clamp(12px, 3vw, 18px)",
              color: "rgba(255,255,255,0.85)",
              textAlign: "center",
              marginTop: "clamp(4px, 1vw, 8px)",
              letterSpacing: "1.5px",
            }}
          >
            DESCUBRE LA PALABRA
          </motion.p>
        </motion.div>

        {/* Verse */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="px-4 sm:px-6 py-4 mx-4 sm:mx-6 text-center max-w-lg"
          style={{
            background: "rgba(255,255,255,0.15)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          <p
            style={{
              fontFamily: "Lora, serif",
              fontStyle: "italic",
              fontSize: "clamp(12px, 2.5vw, 16px)",
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.6,
            }}
          >
            "Lámpara es a mis pies tu palabra, y lumbrera a mi camino."
          </p>
          <p
            style={{
              fontFamily: "Nunito, sans-serif",
              fontSize: "clamp(11px, 2vw, 13px)",
              color: "rgba(255,255,255,0.7)",
              marginTop: "6px",
            }}
          >
            — Salmos 119:105
          </p>
        </motion.div>

        {/* Floating dots decoration */}
        <div className="flex gap-3 mt-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, delay: i * 0.3 }}
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.6)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom: Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.0 }}
        className="w-full pb-4 px-2"
      >
        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleStart}
          className="w-full py-4 sm:py-5 flex items-center justify-center gap-2 sm:gap-3"
          style={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: "clamp(16px, 3vw, 24px)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontFamily: "Nunito, sans-serif",
              fontWeight: 800,
              fontSize: "clamp(14px, 4vw, 20px)",
              color: "#3A6FBF",
              letterSpacing: "0.5px",
            }}
          >
            Comenzar
          </span>
          <span style={{ fontSize: "clamp(16px, 4vw, 24px)" }}>✨</span>
        </motion.button>

        <p
          className="text-center mt-3 sm:mt-4"
          style={{
            fontFamily: "Nunito, sans-serif",
            fontSize: "clamp(10px, 2vw, 13px)",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          Disponible para Android e iOS
        </p>
      </motion.div>
    </div>
  );
}
