import { toast } from "sonner";
import { supabase, hasSupabaseEnv } from "../../../lib/supabaseClient";

interface GoogleLoginButtonProps {
  redirectTo?: string;
  className?: string;
}

export function GoogleLoginButton({
  redirectTo = `${window.location.origin}/auth/callback`,
  className,
}: GoogleLoginButtonProps) {
  const handleLogin = async () => {
    if (!supabase || !hasSupabaseEnv) {
      toast.error("Falta configurar Supabase", {
        description: "Agrega VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu entorno.",
      });
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });

    if (error) {
      toast.error("No fue posible iniciar sesión", {
        description: error.message,
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogin}
      className={className}
      style={{
        background: "linear-gradient(135deg, #4A7FD4, #3A6FBF)",
        color: "#FFFFFF",
        fontFamily: "var(--game-font-sans)",
        fontWeight: 800,
        fontSize: "15px",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 12px 28px rgba(74,127,212,0.28)",
      }}
    >
      Continuar con Google
    </button>
  );
}
