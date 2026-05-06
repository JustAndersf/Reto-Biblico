import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * PageContainer — wrapper estándar de pantalla con el background
 * y estructura flex-col del juego. Evita duplicar estilos base.
 */
export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div
      className={`flex flex-col min-h-full ${className}`}
      style={{ background: "var(--game-bg)" }}
    >
      {children}
    </div>
  );
}
