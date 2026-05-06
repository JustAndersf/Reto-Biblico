import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

interface GradientHeaderProps {
  colorFrom: string;
  colorTo: string;
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightSlot?: ReactNode;
  bottomSlot?: ReactNode;
  children?: ReactNode;
}

/**
 * GradientHeader — header con fondo degradado, borde inferior redondeado.
 * Incluye botón de retroceso opcional y slot derecho/inferior personalizable.
 */
export function GradientHeader({
  colorFrom,
  colorTo,
  title,
  subtitle,
  onBack,
  rightSlot,
  bottomSlot,
  children,
}: GradientHeaderProps) {
  return (
    <div
      className="px-5 pt-4 pb-6"
      style={{
        background: `linear-gradient(165deg, ${colorFrom}, ${colorTo})`,
        borderBottomLeftRadius: "var(--game-radius-2xl)",
        borderBottomRightRadius: "var(--game-radius-2xl)",
      }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="flex items-center justify-center flex-shrink-0"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "var(--game-radius-md)",
                background: "rgba(255,255,255,0.25)",
                border: "none",
                cursor: "pointer",
              }}
            >
              <ArrowLeft size={18} color="white" strokeWidth={2.5} />
            </motion.button>
          )}
          <div>
            {subtitle && (
              <p
                style={{
                  fontFamily: "var(--game-font-sans)",
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.75)",
                }}
              >
                {subtitle}
              </p>
            )}
            <h1
              style={{
                fontFamily: "var(--game-font-serif)",
                fontWeight: 700,
                fontSize: "22px",
                color: "#FFFFFF",
              }}
            >
              {title}
            </h1>
          </div>
        </div>
        {rightSlot && <div>{rightSlot}</div>}
      </div>

      {/* Custom content below title */}
      {bottomSlot}
      {children}
    </div>
  );
}
