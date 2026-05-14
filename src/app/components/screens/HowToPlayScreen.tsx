import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Star, Heart, Target, Award, Coins, Globe } from "lucide-react";

const rules = [
  {
    icon: Target,
    title: "Objetivo del juego",
    desc: "Responde correctamente las preguntas bíblicas para avanzar de nivel. Cada categoría tiene múltiples niveles de dificultad creciente. ¡Intenta completarlos todos con 3 estrellas!",
    color: "var(--game-blue)",
    bg: "#EBF3FD",
  },
  {
    icon: Heart,
    title: "Vidas por nivel (locales)",
    desc: "Dentro de cada nivel comienzas con 3 vidas. Cada respuesta incorrecta te resta 1 vida local. Si las pierdes todas, el nivel falla y pierdes 1 vida global.",
    color: "#D45B5B",
    bg: "#FDEBEB",
  },
  {
    icon: Globe,
    title: "Vidas globales",
    desc: "Tienes hasta 3 vidas globales. Se pierden al fallar un nivel completo. Se recuperan automáticamente con el tiempo (1–5 min según cuántas hayas perdido). También puedes conseguirlas con monedas o viendo un anuncio.",
    color: "#C43050",
    bg: "#FEF0F3",
  },
  {
    icon: Star,
    title: "Puntuación y estrellas",
    desc: "Ganas puntos por cada respuesta correcta. Al finalizar un nivel recibes 1–3 estrellas según tu precisión: 100% → 3⭐, 70%+ → 2⭐, cualquier otro → 1⭐. Acumula puntos totales para subir en el ranking.",
    color: "#F0B429",
    bg: "#FFF9E5",
  },
  {
    icon: Coins,
    title: "Monedas",
    desc: "Las monedas son la moneda del juego. Puedes ganarlas completando niveles con buena puntuación y usarlas para recuperar vidas globales (50 monedas = 1 vida).",
    color: "#D4925B",
    bg: "#FDF0E6",
  },
  {
    icon: Award,
    title: "Niveles completados",
    desc: "Al superar un nivel, se desbloquea el siguiente. El progreso se guarda automáticamente. Puedes repetir niveles para mejorar tu puntuación o conseguir más estrellas.",
    color: "var(--game-green)",
    bg: "#E8F7F0",
  },
];

export function HowToPlayScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full" style={{ background: "var(--game-bg)" }}>
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 pt-4 pb-5">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate(-1)}
          id="btn-back"
          className="flex items-center justify-center flex-shrink-0"
          style={{ width: "clamp(36px, 8vw, 44px)", height: "clamp(36px, 8vw, 44px)", borderRadius: "var(--game-radius-md)", background: "var(--game-card)", boxShadow: "0 2px 8px var(--game-card-shadow)", border: "none", cursor: "pointer" }}
        >
          <ArrowLeft size={18} color="var(--game-blue)" strokeWidth={2.5} />
        </motion.button>
        <div className="flex-1 min-w-0">
          <h1 style={{ fontFamily: "var(--game-font-serif)", fontWeight: 700, fontSize: "clamp(18px, 5vw, 28px)", color: "var(--game-text-dark)", lineHeight: 1.1 }}>¿Cómo se juega?</h1>
          <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "clamp(11px, 2.5vw, 14px)", color: "var(--game-text-soft)" }}>Reglas y mecánica del juego</p>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 px-4 sm:px-6 flex flex-col gap-3 sm:gap-4 pb-8">
        {rules.map((rule, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-4"
            style={{ background: "var(--game-card)", borderRadius: "var(--game-radius-xl)", boxShadow: "0 2px 12px var(--game-card-shadow)", border: "1px solid var(--game-card-border)" }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center justify-center" style={{ width: "42px", height: "42px", borderRadius: "var(--game-radius-md)", background: rule.bg, flexShrink: 0 }}>
                <rule.icon size={20} color={rule.color} strokeWidth={2} />
              </div>
              <h2 style={{ fontFamily: "var(--game-font-sans)", fontWeight: 800, fontSize: "15px", color: "var(--game-text-dark)" }}>{rule.title}</h2>
            </div>
            <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "13px", color: "var(--game-text-mid)", lineHeight: 1.6, paddingLeft: "54px" }}>
              {rule.desc}
            </p>
          </motion.div>
        ))}

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-2 p-5 text-center"
          style={{ background: "linear-gradient(135deg, #4A7FD4 0%, #3A6FBF 100%)", borderRadius: "var(--game-radius-xl)", boxShadow: "0 8px 24px rgba(74, 127, 212, 0.4)" }}
        >
          <p style={{ fontFamily: "var(--game-font-sans)", fontWeight: 800, fontSize: "16px", color: "#FFFFFF", marginBottom: "4px" }}>
            ¡Estás listo para jugar! 🎉
          </p>
          <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "13px", color: "rgba(255,255,255,0.85)" }}>
            Demuestra tus conocimientos bíblicos y crece en fe.
          </p>
        </motion.div>

        <div className="h-2" />
      </div>
    </div>
  );
}
