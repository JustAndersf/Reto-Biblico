import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { toast } from "sonner";
import { supabase } from "../../../lib/supabaseClient";
import { ensureCurrentUserProfile } from "../../services/progressService";

export function AuthCallbackScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      if (!supabase) {
        toast.error("No se pudo conectar con el servidor.");
        navigate("/login", { replace: true });
        return;
      }

      const url = new URL(window.location.href);
      const authCode = url.searchParams.get("code");

      if (authCode) {
        const { error } = await supabase.auth.exchangeCodeForSession(authCode);

        if (error) {
          toast.error("No fue posible validar la sesión", {
            description: error.message,
          });
          navigate("/login", { replace: true });
          return;
        }
      }

      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        toast.error("La sesión no pudo restaurarse.");
        navigate("/login", { replace: true });
        return;
      }

      await ensureCurrentUserProfile();
      navigate("/home", { replace: true });
    };

    void handleCallback();
  }, [navigate]);

  return (
    <main
      className="flex min-h-screen items-center justify-center px-6"
      style={{ background: "var(--game-bg)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm p-6 text-center"
        style={{
          background: "var(--game-card)",
          borderRadius: "var(--game-radius-xl)",
          boxShadow: "0 14px 40px rgba(30,58,95,0.12)",
          border: "1px solid var(--game-card-border)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--game-font-sans)",
            fontWeight: 700,
            fontSize: "15px",
            color: "var(--game-text-dark)",
          }}
        >
          Validando sesión...
        </p>
      </motion.div>
    </main>
  );
}
