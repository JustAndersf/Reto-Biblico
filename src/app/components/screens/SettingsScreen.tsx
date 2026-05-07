import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Music,
  Volume2,
  HelpCircle,
  Info,
  ChevronRight,
  Book,
  Star,
  Shield,
  X,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";
import { useGame } from "../../context/GameContext";
import { useAuth } from "../../hooks/useAuth";

interface ModalInfo {
  title: string;
  emoji: string;
  content: React.ReactNode;
}

export function SettingsScreen() {
  const navigate = useNavigate();
  const { state, updateSettings } = useGame();
  const { user, signOut } = useAuth();
  const [activeModal, setActiveModal] = useState<ModalInfo | null>(null);

  const playerName =
    (typeof user?.user_metadata?.full_name === "string" && user.user_metadata.full_name) ||
    (typeof user?.user_metadata?.name === "string" && user.user_metadata.name) ||
    user?.email ||
    "Jugador";

  const ToggleSwitch = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      style={{
        width: "50px",
        height: "28px",
        borderRadius: "14px",
        background: value ? "var(--game-blue)" : "#CBD5E0",
        border: "none",
        cursor: "pointer",
        transition: "background 0.25s ease",
        position: "relative",
      }}
    >
      <motion.div
        animate={{ x: value ? 22 : 2 }}
        transition={{ type: "spring", damping: 16, stiffness: 300 }}
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "12px",
          background: "#FFFFFF",
          position: "absolute",
          top: "2px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        }}
      />
    </button>
  );

  const handleSignOut = async () => {
    await signOut();
    toast.success("Sesión cerrada");
    navigate("/login", { replace: true });
  };

  const bibliaModal: ModalInfo = {
    title: "Acerca de la Biblia",
    emoji: "📖",
    content: (
      <div className="flex flex-col gap-3">
        <p
          style={{
            fontFamily: "var(--game-font-sans)",
            fontSize: "14px",
            color: "var(--game-text-mid)",
            lineHeight: 1.65,
          }}
        >
          Las preguntas de <strong>Reto Bíblico</strong> están basadas en la <strong>Santa Biblia</strong>,
          incluyendo pasajes del Antiguo y Nuevo Testamento.
        </p>
        <p
          style={{
            fontFamily: "var(--game-font-sans)",
            fontSize: "14px",
            color: "var(--game-text-mid)",
            lineHeight: 1.65,
          }}
        >
          Las referencias bíblicas utilizadas provienen de versiones populares como la <strong>Reina-Valera 1960</strong> y la{" "}
          <strong>Nueva Versión Internacional (NVI)</strong>.
        </p>
        <div
          className="p-3 mt-1"
          style={{
            background: "var(--game-beige)",
            borderRadius: "var(--game-radius-md)",
            border: "1px solid var(--game-beige-border)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--game-font-serif)",
              fontStyle: "italic",
              fontSize: "13px",
              color: "#7A5030",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            "Toda la Escritura es inspirada por Dios." - 2 Tim. 3:16
          </p>
        </div>
      </div>
    ),
  };

  const sobreModal: ModalInfo = {
    title: "Sobre el juego",
    emoji: "🎮",
    content: (
      <div className="flex flex-col gap-3">
        <div
          className="flex items-center gap-3 p-3"
          style={{ background: "var(--game-bg)", borderRadius: "var(--game-radius-md)" }}
        >
          <span style={{ fontSize: "32px" }}>📖</span>
          <div>
            <p
              style={{
                fontFamily: "var(--game-font-serif)",
                fontWeight: 700,
                fontSize: "18px",
                color: "var(--game-text-dark)",
              }}
            >
              Reto Bíblico
            </p>
            <p
              style={{
                fontFamily: "var(--game-font-sans)",
                fontSize: "12px",
                color: "var(--game-text-soft)",
              }}
            >
              Versión 1.0.0
            </p>
          </div>
        </div>
        {[
          { label: "Pantallas", value: "14+" },
          { label: "Categorías", value: "6+" },
          { label: "Preguntas", value: "150+" },
          { label: "Plataforma", value: "Web responsive" },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between py-2"
            style={{ borderBottom: "1px solid var(--game-bg)" }}
          >
            <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "14px", color: "var(--game-text-mid)" }}>{label}</p>
            <p
              style={{
                fontFamily: "var(--game-font-sans)",
                fontWeight: 700,
                fontSize: "14px",
                color: "var(--game-text-dark)",
              }}
            >
              {value}
            </p>
          </div>
        ))}
        <p
          style={{
            fontFamily: "var(--game-font-sans)",
            fontSize: "12px",
            color: "var(--game-text-muted)",
            textAlign: "center",
            marginTop: "4px",
          }}
        >
          Hecho con amor para la comunidad cristiana
        </p>
      </div>
    ),
  };

  const settingsList = [
    {
      section: "AUDIO",
      items: [
        {
          icon: Music,
          label: "Música de fondo",
          desc: "Melodías espirituales suaves",
          iconColor: "var(--game-purple)",
          iconBg: "#F0EBF9",
          toggle: { value: state.settings.music, onChange: (v: boolean) => updateSettings({ music: v }) },
        },
        {
          icon: Volume2,
          label: "Efectos de sonido",
          desc: "Sonidos de respuesta y acierto",
          iconColor: "var(--game-green)",
          iconBg: "#E8F7F0",
          toggle: { value: state.settings.sound, onChange: (v: boolean) => updateSettings({ sound: v }) },
        },
      ],
    },
    {
      section: "INFORMACIÓN",
      items: [
        {
          icon: HelpCircle,
          label: "¿Cómo se juega?",
          desc: "Reglas y sistema de puntos",
          iconColor: "var(--game-blue)",
          iconBg: "#EBF3FD",
          action: () => navigate("/how-to-play"),
        },
        {
          icon: Book,
          label: "Acerca de la Biblia",
          desc: "Sobre las fuentes bíblicas",
          iconColor: "#D4925B",
          iconBg: "#FDF0E6",
          action: () => setActiveModal(bibliaModal),
        },
        {
          icon: Info,
          label: "Sobre el juego",
          desc: "Versión 1.0 · Reto Bíblico",
          iconColor: "var(--game-text-soft)",
          iconBg: "var(--game-bg)",
          action: () => setActiveModal(sobreModal),
        },
      ],
    },
    {
      section: "CUENTA",
      items: [
        {
          icon: LogOut,
          label: "Cerrar sesión",
          desc: user?.email ?? "Salir de tu sesión actual",
          iconColor: "#C45030",
          iconBg: "#FEF0EE",
          action: handleSignOut,
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-full" style={{ background: "var(--game-bg)" }}>
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-end justify-center z-50 px-4 pb-6"
            style={{ background: "var(--game-overlay)" }}
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 280 }}
              className="w-full max-w-sm p-6 flex flex-col gap-4"
              style={{
                background: "var(--game-card)",
                borderRadius: "var(--game-radius-2xl)",
                boxShadow: "0 -8px 40px rgba(0,0,0,0.2)",
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: "28px" }}>{activeModal.emoji}</span>
                  <h2
                    style={{
                      fontFamily: "var(--game-font-serif)",
                      fontWeight: 700,
                      fontSize: "20px",
                      color: "var(--game-text-dark)",
                    }}
                  >
                    {activeModal.title}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  style={{
                    background: "var(--game-bg)",
                    border: "none",
                    borderRadius: "var(--game-radius-sm)",
                    padding: "6px",
                    cursor: "pointer",
                  }}
                >
                  <X size={18} color="var(--game-text-soft)" />
                </button>
              </div>
              {activeModal.content}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4 px-5 pt-4 pb-5">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/home")}
          id="btn-back"
          className="flex items-center justify-center"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "var(--game-radius-md)",
            background: "var(--game-card)",
            boxShadow: "0 2px 8px var(--game-card-shadow)",
            border: "none",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={18} color="var(--game-blue)" strokeWidth={2.5} />
        </motion.button>
        <div>
          <h1
            style={{
              fontFamily: "var(--game-font-serif)",
              fontWeight: 700,
              fontSize: "22px",
              color: "var(--game-text-dark)",
            }}
          >
            Configuración
          </h1>
          <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "13px", color: "var(--game-text-soft)" }}>
            Personaliza tu experiencia
          </p>
        </div>
      </div>

      <div className="px-5 mb-5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 p-4"
          style={{
            background: "linear-gradient(135deg, #4A7FD4, #3A6FBF)",
            borderRadius: "var(--game-radius-xl)",
            boxShadow: "0 6px 20px rgba(74,127,212,0.3)",
          }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              width: "54px",
              height: "54px",
              borderRadius: "18px",
              background: "rgba(255,255,255,0.25)",
            }}
          >
            <span style={{ fontSize: "26px" }}>📖</span>
          </div>
          <div className="flex-1">
            <p style={{ fontFamily: "var(--game-font-sans)", fontWeight: 800, fontSize: "16px", color: "#FFFFFF" }}>
              {playerName}
            </p>
            <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>
              {state.totalPoints} puntos acumulados{user?.email ? ` · ${user.email}` : ""}
            </p>
          </div>
          <div className="flex items-center gap-0.5">
            {[...Array(3)].map((_, index) => (
              <Star
                key={index}
                size={14}
                color="#FFD700"
                fill={index < Math.min(3, Math.floor(state.totalPoints / 100)) ? "#FFD700" : "transparent"}
                strokeWidth={2}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex-1 px-5 flex flex-col gap-5">
        {settingsList.map((section, sectionIndex) => (
          <motion.div
            key={section.section}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
          >
            <p
              style={{
                fontFamily: "var(--game-font-sans)",
                fontWeight: 700,
                fontSize: "12px",
                color: "var(--game-text-soft)",
                letterSpacing: "0.8px",
                marginBottom: "10px",
              }}
            >
              {section.section}
            </p>
            <div
              style={{
                background: "var(--game-card)",
                borderRadius: "var(--game-radius-xl)",
                boxShadow: "0 2px 12px var(--game-card-shadow)",
                border: "1px solid var(--game-card-border)",
                overflow: "hidden",
              }}
            >
              {section.items.map((item, itemIndex) => (
                <div key={item.label}>
                  <div
                    className={`flex items-center gap-3 p-4 ${"action" in item ? "cursor-pointer" : ""}`}
                    onClick={"action" in item ? item.action : undefined}
                  >
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "var(--game-radius-md)",
                        background: item.iconBg,
                      }}
                    >
                      <item.icon size={19} color={item.iconColor} strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <p
                        style={{
                          fontFamily: "var(--game-font-sans)",
                          fontWeight: 700,
                          fontSize: "14px",
                          color: "var(--game-text-dark)",
                        }}
                      >
                        {item.label}
                      </p>
                      <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "12px", color: "var(--game-text-soft)" }}>
                        {item.desc}
                      </p>
                    </div>
                    {"toggle" in item && item.toggle ? (
                      <ToggleSwitch value={item.toggle.value} onChange={item.toggle.onChange} />
                    ) : (
                      <ChevronRight size={16} color="var(--game-text-soft)" />
                    )}
                  </div>
                  {itemIndex < section.items.length - 1 && (
                    <div style={{ height: "1px", background: "var(--game-bg)", marginLeft: "68px" }} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-col items-center gap-2 py-5">
          <div className="flex items-center gap-2">
            <Shield size={14} color="var(--game-text-muted)" />
            <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "12px", color: "var(--game-text-muted)" }}>
              Reto Bíblico - Versión 1.0.0
            </p>
          </div>
          <p
            style={{
              fontFamily: "var(--game-font-serif)",
              fontStyle: "italic",
              fontSize: "12px",
              color: "var(--game-text-muted)",
              textAlign: "center",
            }}
          >
            "La Palabra de Dios es viva y eficaz." - Heb. 4:12
          </p>
        </motion.div>

        <div className="h-2" />
      </div>
    </div>
  );
}
