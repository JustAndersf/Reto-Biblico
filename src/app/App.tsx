import { RouterProvider } from "react-router";
import { router } from "./routes";
import { GameProvider } from "./context/GameContext";
import { Toaster } from "sonner";
import "../styles/fonts.css";
import "../styles/animations.css";

export default function App() {
  const loadingFallback = (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "var(--game-bg)" }}
    >
      <div
        className="w-full max-w-sm p-6 text-center"
        style={{
          background: "var(--game-card)",
          borderRadius: "var(--game-radius-xl)",
          boxShadow: "0 12px 32px rgba(30,58,95,0.12)",
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
          Cargando pantalla...
        </p>
      </div>
    </div>
  );

  return (
    <GameProvider>
      <RouterProvider router={router} fallbackElement={loadingFallback} />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            fontFamily: "var(--game-font-sans)",
            borderRadius: "var(--game-radius-lg)",
            background: "#FFFFFF",
            color: "var(--game-text-dark)",
            boxShadow: "0 8px 24px rgba(74,127,212,0.18)",
            border: "1px solid rgba(74,127,212,0.1)",
          },
        }}
      />
    </GameProvider>
  );
}
