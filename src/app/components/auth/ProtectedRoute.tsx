import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <main
        className="flex min-h-screen items-center justify-center px-6"
        style={{ background: "var(--game-bg)" }}
      >
        <div
          className="w-full max-w-sm p-6 text-center"
          style={{
            background: "var(--game-card)",
            borderRadius: "var(--game-radius-xl)",
            boxShadow: "0 10px 30px rgba(30,58,95,0.12)",
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
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
