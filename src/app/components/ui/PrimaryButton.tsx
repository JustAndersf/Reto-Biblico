import { motion } from "motion/react";
import type { ReactNode } from "react";

interface PrimaryButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  colorFrom?: string;
  colorTo?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
  size?: "md" | "lg";
  id?: string;
}

/**
 * PrimaryButton — botón grande con gradiente, sombra y animaciones tap/hover.
 * Color por defecto: azul del juego.
 */
export function PrimaryButton({
  label,
  onClick,
  disabled = false,
  colorFrom = "var(--game-blue)",
  colorTo = "var(--game-blue-dark)",
  icon,
  fullWidth = true,
  size = "lg",
  id,
}: PrimaryButtonProps) {
  const py = size === "lg" ? "20px" : "14px";
  const fs = size === "lg" ? "18px" : "15px";

  return (
    <motion.button
      id={id}
      whileTap={disabled ? {} : { scale: 0.97 }}
      whileHover={disabled ? {} : { scale: 1.01 }}
      onClick={disabled ? undefined : onClick}
      className={`flex items-center justify-center gap-3 ${fullWidth ? "w-full" : ""}`}
      style={{
        background: disabled
          ? "#CBD5E0"
          : `linear-gradient(135deg, ${colorFrom}, ${colorTo})`,
        borderRadius: "var(--game-radius-xl)",
        boxShadow: disabled ? "none" : `0 8px 24px ${colorFrom}55`,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.65 : 1,
        paddingTop: py,
        paddingBottom: py,
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      {icon && <span style={{ fontSize: "20px", display: "flex" }}>{icon}</span>}
      <span
        style={{
          fontFamily: "var(--game-font-sans)",
          fontWeight: 800,
          fontSize: fs,
          color: "#FFFFFF",
          letterSpacing: "0.3px",
        }}
      >
        {label}
      </span>
    </motion.button>
  );
}
