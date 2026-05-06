import { RouterProvider } from "react-router";
import { router } from "./routes";
import { GameProvider } from "./context/GameContext";
import { Toaster } from "sonner";
import "../styles/fonts.css";
import "../styles/animations.css";

export default function App() {
  return (
    <GameProvider>
      <RouterProvider router={router} />
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
