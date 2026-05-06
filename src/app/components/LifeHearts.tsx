import { Heart } from "lucide-react";
import { MAX_LIVES } from "../data/gameData";

interface LifeHeartsProps {
  lives: number;
  size?: number;
}

export function LifeHearts({ lives, size = 22 }: LifeHeartsProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: MAX_LIVES }).map((_, i) => (
        <Heart
          key={i}
          size={size}
          style={{
            color: i < lives ? "#E85474" : "#CBD5E0",
            fill: i < lives ? "#E85474" : "transparent",
            transition: "all 0.3s ease",
          }}
          strokeWidth={2}
        />
      ))}
    </div>
  );
}
