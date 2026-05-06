interface StatCardProps {
  icon: string;      // emoji
  value: string | number;
  label: string;
  color: string;     // color del valor
  bg: string;        // color de fondo
  borderColor?: string;
}

/**
 * StatCard — mini-tarjeta de estadística (ícono emoji + valor + label).
 * Usada en LevelCompleteScreen, ProgressScreen, etc.
 */
export function StatCard({ icon, value, label, color, bg, borderColor }: StatCardProps) {
  return (
    <div
      className="flex flex-col items-center py-4 px-3"
      style={{
        background: bg,
        borderRadius: "var(--game-radius-lg)",
        border: `1px solid ${borderColor ?? `${color}30`}`,
      }}
    >
      <span style={{ fontSize: "22px" }}>{icon}</span>
      <p
        style={{
          fontFamily: "var(--game-font-sans)",
          fontWeight: 800,
          fontSize: "18px",
          color,
          marginTop: "4px",
        }}
      >
        {value}
      </p>
      <p
        style={{
          fontFamily: "var(--game-font-sans)",
          fontSize: "11px",
          color: "var(--game-text-soft)",
          textAlign: "center",
          marginTop: "2px",
        }}
      >
        {label}
      </p>
    </div>
  );
}
