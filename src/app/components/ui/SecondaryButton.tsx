import { motion } from "motion/react";
import type { ReactNode } from "react";

interface SecondaryButtonProps {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
  fullWidth?: boolean;
  size?: "md" | "lg";
  id?: string;
  color?: string;
}

/**
 * SecondaryButton — botón blanco con borde sutil. Usado para acciones secundarias.
 */
export function SecondaryButton({
  label,
  onClick,
  icon,
  fullWidth = true,
  size = "md",
  id,
  color = "var(--game-blue)",
}: SecondaryButtonProps) {
  const py = size === "lg" ? "18px" : "14px";
  const fs = size === "lg" ? "16px" : "14px";

  return (
    <motion.button
      id={id}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 ${fullWidth ? "w-full" : ""}`}
      style={{
        background: "var(--game-card)",
        borderRadius: "var(--game-radius-lg)",
        border: "2px solid #E2EAF4",
        cursor: "pointer",
        boxShadow: "0 2px 10px var(--game-card-shadow)",
        paddingTop: py,
        paddingBottom: py,
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      {icon && <span style={{ color, display: "flex" }}>{icon}</span>}
      <span
        style={{
          fontFamily: "var(--game-font-sans)",
          fontWeight: 700,
          fontSize: fs,
          color,
        }}
      >
        {label}
      </span>
    </motion.button>
  );
}
