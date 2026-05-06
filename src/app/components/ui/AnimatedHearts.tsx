import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MAX_LIVES } from "../../data/gameData";

interface AnimatedHeartsProps {
  lives: number;
  size?: number;
  prevLives?: number; // para animar la pérdida
}

/**
 * AnimatedHearts — versión mejorada de LifeHearts con animación de latido
 * y efecto de "rotura" al perder una vida.
 */
export function AnimatedHearts({ lives, size = 22, prevLives }: AnimatedHeartsProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: MAX_LIVES }).map((_, i) => {
        const isActive = i < lives;
        const justLost = prevLives !== undefined && i >= lives && i < prevLives;

        return (
          <AnimatePresence key={i} mode="wait">
            <motion.div
              key={`heart-${i}-${isActive}`}
              animate={
                isActive
                  ? { scale: [1, 1.15, 1], transition: { duration: 0.4 } }
                  : justLost
                  ? { scale: [1.2, 0.8, 1], rotate: [0, -15, 10, 0], transition: { duration: 0.5 } }
                  : { scale: 1 }
              }
            >
              <Heart
                size={size}
                style={{
                  color: isActive ? "#E85474" : "#CBD5E0",
                  fill: isActive ? "#E85474" : "transparent",
                  transition: "color 0.3s ease, fill 0.3s ease",
                }}
                strokeWidth={2}
              />
            </motion.div>
          </AnimatePresence>
        );
      })}
    </div>
  );
}
