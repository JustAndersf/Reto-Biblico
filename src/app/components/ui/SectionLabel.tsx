interface SectionLabelProps {
  text: string;
  className?: string;
}

/**
 * SectionLabel — etiqueta de sección estilo "EXPLORAR", "POR CATEGORÍA".
 * Tipografía Nunito en mayúsculas, color gris suave, espaciado de letras.
 */
export function SectionLabel({ text, className = "" }: SectionLabelProps) {
  return (
    <p
      className={className}
      style={{
        fontFamily: "var(--game-font-sans)",
        fontWeight: 700,
        fontSize: "12px",
        color: "var(--game-text-soft)",
        letterSpacing: "0.8px",
        textTransform: "uppercase",
        marginBottom: "12px",
      }}
    >
      {text}
    </p>
  );
}
