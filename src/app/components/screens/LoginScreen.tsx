import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ShieldCheck, Sparkles } from "lucide-react";
import { GoogleLoginButton } from "../auth/GoogleLoginButton";
import { hasSupabaseEnv } from "../../../lib/supabaseClient";
import { useAuth } from "../../hooks/useAuth";

export function LoginScreen() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <div
      className="flex min-h-full flex-col justify-between px-6 py-8"
      style={{
        background:
          "radial-gradient(120% 100% at 0% 0%, #FCE8C8 0%, rgba(252,232,200,0) 40%), radial-gradient(120% 100% at 100% 0%, #DDEBFF 0%, rgba(221,235,255,0) 45%), linear-gradient(180deg, #EEF4FB 0%, #FFFFFF 100%)",
      }}
    >
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 flex items-center gap-2 rounded-full px-4 py-2"
          style={{
            background: "rgba(255,255,255,0.7)",
            border: "1px solid rgba(74,127,212,0.12)",
          }}
        >
          <Sparkles size={16} color="#4A7FD4" />
          <span
            style={{
              fontFamily: "var(--game-font-sans)",
              fontSize: "12px",
              fontWeight: 700,
              color: "#4A7FD4",
            }}
          >
            Reto Bíblico conectado
          </span>
        </motion.div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-md p-6 sm:p-8"
          style={{
            background: "rgba(255,255,255,0.92)",
            borderRadius: "clamp(20px, 4vw, 32px)",
            boxShadow: "0 22px 60px rgba(30,58,95,0.14)",
            border: "1px solid rgba(74,127,212,0.1)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            className="mb-4 sm:mb-5 flex items-center justify-center flex-shrink-0"
            style={{
              width: "clamp(60px, 12vw, 80px)",
              height: "clamp(60px, 12vw, 80px)",
              borderRadius: "clamp(16px, 3vw, 28px)",
              background: "linear-gradient(135deg, #4A7FD4, #3A6FBF)",
              boxShadow: "0 12px 30px rgba(74,127,212,0.25)",
            }}
          >
            <span style={{ fontSize: "clamp(28px, 6vw, 48px)" }}>📖</span>
          </div>

          <h1
            style={{
              fontFamily: "var(--game-font-serif)",
              fontWeight: 800,
              fontSize: "clamp(22px, 5vw, 36px)",
              lineHeight: 1.1,
              color: "#1E3A5F",
            }}
          >
            Continúa tu aventura bíblica
          </h1>
          <p
            className="mt-3"
            style={{
              fontFamily: "var(--game-font-sans)",
              fontSize: "clamp(13px, 3vw, 16px)",
              lineHeight: 1.65,
              color: "#6B7E95",
            }}
          >
            Inicia sesión con Google para guardar tu progreso, proteger tus partidas
            y sincronizar niveles completados en todos tus dispositivos.
          </p>

          <div
            className="mt-5 sm:mt-6 flex items-start gap-3 rounded-xl sm:rounded-2xl p-3 sm:p-4"
            style={{
              background: "#F7FAFE",
              border: "1px solid rgba(74,127,212,0.08)",
            }}
          >
            <ShieldCheck size={18} color="#5BB89A" className="mt-0.5 shrink-0" />
            <p
              style={{
                fontFamily: "var(--game-font-sans)",
                fontSize: "clamp(12px, 2.5vw, 14px)",
                lineHeight: 1.6,
                color: "#4F647C",
              }}
            >
              Tu información está protegida. Tu progreso se guarda de forma segura en tu dispositivo y se sincroniza con nuestros servidores.
            </p>
          </div>

          <GoogleLoginButton className="mt-5 sm:mt-6 w-full rounded-xl sm:rounded-2xl px-6 py-3 sm:py-4" />

          {!hasSupabaseEnv && (
            <p
              className="mt-4 text-center"
              style={{
                fontFamily: "var(--game-font-sans)",
                fontSize: "clamp(10px, 2vw, 13px)",
                color: "#C45030",
                lineHeight: 1.6,
              }}
            >
              Configura `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` para habilitar el inicio de sesión.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
