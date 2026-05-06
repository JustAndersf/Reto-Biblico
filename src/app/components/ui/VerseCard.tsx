interface VerseCardProps {
  verse: string;
  reference?: string;
  className?: string;
}

/**
 * VerseCard — tarjeta beige reutilizable para mostrar versículos bíblicos.
 * Usa tipografía Lora en cursiva, coherente con el estilo del juego.
 */
export function VerseCard({ verse, reference, className = "" }: VerseCardProps) {
  return (
    <div
      className={`px-5 py-4 ${className}`}
      style={{
        background: "var(--game-beige)",
        borderRadius: "var(--game-radius-lg)",
        border: "1px solid var(--game-beige-border)",
      }}
    >
      <p
        style={{
          fontFamily: "var(--game-font-serif)",
          fontStyle: "italic",
          fontSize: "13px",
          color: "#7A5030",
          lineHeight: 1.65,
          textAlign: "center",
        }}
      >
        "{verse}"
      </p>
      {reference && (
        <p
          style={{
            fontFamily: "var(--game-font-sans)",
            fontSize: "12px",
            color: "#A07850",
            textAlign: "center",
            marginTop: "6px",
          }}
        >
          — {reference}
        </p>
      )}
    </div>
  );
}
