import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  BarChart2,
  ChevronRight,
  Clock,
  CreditCard,
  Crown,
  Grid3x3,
  Heart,
  HelpCircle,
  Play,
  Settings,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useGame } from "../../context/GameContext";
import { MAX_LIVES } from "../../data/gameData";

const INSPIRATIONAL_PHRASES = [
  "Todo lo puedo en Cristo que me fortalece. - Fil. 4:13",
  "El Señor es mi pastor, nada me faltará. - Sal. 23:1",
  "Porque yo sé los planes que tengo para ustedes. - Jer. 29:11",
  "Los que esperan en el Señor renovarán sus fuerzas. - Is. 40:31",
];

const LIVES_COST_IN_COINS = 50;

export function HomeScreen() {
  const navigate = useNavigate();
  const { state, buyCoinsWithPoints, buyLivesWithCoins, nextRegenSeconds } = useGame();
  const [showLivesModal, setShowLivesModal] = useState(false);
  const [showCoinsModal, setShowCoinsModal] = useState(false);
  const [showPointsModal, setShowPointsModal] = useState(false);
  const [displaySeconds, setDisplaySeconds] = useState<number | null>(null);

  useEffect(() => {
    setDisplaySeconds(nextRegenSeconds);
    const id = setInterval(() => setDisplaySeconds(nextRegenSeconds), 1000);
    return () => clearInterval(id);
  }, [nextRegenSeconds]);

  const today = new Date();
  const phrase = INSPIRATIONAL_PHRASES[today.getDate() % INSPIRATIONAL_PHRASES.length];

  const navCards = [
    { label: "Categorías", icon: Grid3x3, color: "#4A7FD4", bg: "#EBF3FD", path: "/categories" },
    { label: "Progreso", icon: BarChart2, color: "#D4925B", bg: "#FDF0E6", path: "/progress" },
    { label: "Ajustes", icon: Settings, color: "#9B7FBB", bg: "#F0EBF9", path: "/settings" },
    { label: "¿Cómo jugar?", icon: HelpCircle, color: "#5BB89A", bg: "#E8F7F0", path: "/how-to-play" },
  ];

  const canPlay = state.globalLives > 0;
  const canBuyLifeWithCoins = state.coins >= LIVES_COST_IN_COINS && state.globalLives < MAX_LIVES;
  const canWatchAd = state.globalLives < MAX_LIVES;

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  };

  const handleWatchAd = () => {
    buyLivesWithCoins(1, 0);
    setShowLivesModal(false);
    toast.success("¡+1 vida recuperada!", {
      description: "Gracias por ver el anuncio.",
      duration: 3000,
    });
  };

  const handleBuyWithCoins = () => {
    buyLivesWithCoins(1, LIVES_COST_IN_COINS);
    setShowLivesModal(false);
    toast.success("¡Vida comprada!", {
      description: `Gastaste ${LIVES_COST_IN_COINS} monedas.`,
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col min-h-full" style={{ background: "var(--game-bg)" }}>
      <AnimatePresence>
        {showLivesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ background: "var(--game-overlay)" }}
            onClick={() => setShowLivesModal(false)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              transition={{ type: "spring", damping: 18, stiffness: 260 }}
              className="flex w-full max-w-sm flex-col gap-4 p-6"
              style={{
                background: "var(--game-card)",
                borderRadius: "var(--game-radius-2xl)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--game-font-serif)",
                      fontWeight: 700,
                      fontSize: "20px",
                      color: "var(--game-text-dark)",
                    }}
                  >
                    ❤️ Conseguir Vidas
                  </h2>
                  <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "13px", color: "var(--game-text-soft)" }}>
                    Tienes {state.globalLives} de {MAX_LIVES} vidas
                  </p>
                </div>
                <button
                  onClick={() => setShowLivesModal(false)}
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

              <div className="flex justify-center gap-3">
                {Array.from({ length: MAX_LIVES }).map((_, index) => (
                  <motion.div
                    key={index}
                    animate={index < state.globalLives ? { scale: [1, 1.12, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 1.8, delay: index * 0.3 }}
                    style={{ fontSize: "32px", opacity: index < state.globalLives ? 1 : 0.25 }}
                  >
                    ❤️
                  </motion.div>
                ))}
              </div>

              {displaySeconds !== null && (
                <div
                  className="flex items-center justify-center gap-2 px-3 py-2"
                  style={{ background: "#FEF3F5", borderRadius: "var(--game-radius-md)" }}
                >
                  <Clock size={14} color="var(--game-red-dark)" />
                  <p
                    style={{
                      fontFamily: "var(--game-font-sans)",
                      fontSize: "13px",
                      color: "var(--game-red-dark)",
                      fontWeight: 600,
                    }}
                  >
                    Próxima vida en {formatTime(displaySeconds)}
                  </p>
                </div>
              )}

              <motion.button
                whileTap={{ scale: 0.97 }}
                disabled={!canBuyLifeWithCoins}
                onClick={handleBuyWithCoins}
                id="btn-buy-life-coins"
                className="flex w-full items-center justify-center gap-3 py-4"
                style={{
                  background: canBuyLifeWithCoins ? "linear-gradient(135deg, #FFD700, #F0A800)" : "#E2EAF4",
                  borderRadius: "var(--game-radius-lg)",
                  border: "none",
                  cursor: canBuyLifeWithCoins ? "pointer" : "not-allowed",
                  opacity: canBuyLifeWithCoins ? 1 : 0.6,
                }}
              >
                <span style={{ fontSize: "20px" }}>🪙</span>
                <div className="flex flex-col items-start">
                  <span
                    style={{
                      fontFamily: "var(--game-font-sans)",
                      fontWeight: 800,
                      fontSize: "15px",
                      color: "var(--game-text-dark)",
                    }}
                  >
                    Usar {LIVES_COST_IN_COINS} monedas
                  </span>
                  <span style={{ fontFamily: "var(--game-font-sans)", fontSize: "12px", color: "var(--game-text-mid)" }}>
                    Tienes: {state.coins} 🪙
                  </span>
                </div>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                disabled={!canWatchAd}
                onClick={handleWatchAd}
                id="btn-watch-ad"
                className="flex w-full items-center justify-center gap-3 py-4"
                style={{
                  background: canWatchAd ? "linear-gradient(135deg, #4A7FD4, #3A6FBF)" : "#E2EAF4",
                  borderRadius: "var(--game-radius-lg)",
                  border: "none",
                  cursor: canWatchAd ? "pointer" : "not-allowed",
                  opacity: canWatchAd ? 1 : 0.6,
                }}
              >
                <span style={{ fontSize: "20px" }}>📺</span>
                <span
                  style={{
                    fontFamily: "var(--game-font-sans)",
                    fontWeight: 800,
                    fontSize: "15px",
                    color: "#FFFFFF",
                  }}
                >
                  Ver anuncio - Gratis
                </span>
              </motion.button>

              {state.globalLives >= MAX_LIVES && (
                <p
                  style={{
                    fontFamily: "var(--game-font-sans)",
                    fontSize: "13px",
                    color: "var(--game-green)",
                    textAlign: "center",
                    fontWeight: 700,
                  }}
                >
                  ✓ ¡Tienes todas tus vidas!
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="px-5 pt-5 pb-6"
        style={{
          background:
            "radial-gradient(120% 80% at 0% 0%, #FFE6C7 0%, rgba(255,230,199,0.0) 40%), radial-gradient(100% 80% at 90% 0%, #D7ECFF 0%, rgba(215,236,255,0) 45%), linear-gradient(165deg, #1F3B64 0%, #2F5BA0 55%, #3C7AD9 100%)",
          borderBottomLeftRadius: "var(--game-radius-2xl)",
          borderBottomRightRadius: "var(--game-radius-2xl)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.7)", letterSpacing: "0.4px" }}>
              Reto Bíblico
            </p>
            <h1 style={{ fontFamily: "var(--game-font-serif)", fontWeight: 800, fontSize: "26px", color: "#FFFFFF" }}>
              Explora, juega y gana
            </h1>
          </div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => navigate("/settings")}
            id="btn-settings"
            className="flex items-center justify-center"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.16)",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <Settings size={19} color="white" />
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-5 flex items-center justify-between p-4"
          style={{ background: "rgba(255,255,255,0.16)", borderRadius: "18px", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center"
              style={{ width: "42px", height: "42px", borderRadius: "14px", background: "rgba(255,255,255,0.2)" }}
            >
              <Sparkles size={18} color="#FFFFFF" />
            </div>
            <div>
              <p style={{ fontFamily: "var(--game-font-sans)", fontWeight: 800, fontSize: "14px", color: "#FFFFFF" }}>Racha del día</p>
              <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                Completa 1 nivel para bonus
              </p>
            </div>
          </div>
          <div style={{ fontFamily: "var(--game-font-sans)", fontWeight: 800, fontSize: "18px", color: "#FFD700" }}>+25</div>
        </motion.div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLivesModal(true)}
            id="btn-lives-modal"
            className="flex flex-col items-center gap-2 p-3"
            style={{ background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "16px", cursor: "pointer" }}
          >
            <Heart size={20} color="#FF4D6D" fill="#FF4D6D" />
            <p style={{ fontFamily: "var(--game-font-sans)", fontWeight: 800, fontSize: "14px", color: "#FFFFFF" }}>{state.globalLives}</p>
            <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.7)" }}>Vidas</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCoinsModal(true)}
            className="flex flex-col items-center gap-2 p-3"
            style={{ background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "16px", cursor: "pointer" }}
          >
            <span style={{ fontSize: "18px" }}>🪙</span>
            <p style={{ fontFamily: "var(--game-font-sans)", fontWeight: 800, fontSize: "14px", color: "#FFD700" }}>{state.coins}</p>
            <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.7)" }}>Monedas</p>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPointsModal(true)}
            className="flex flex-col items-center gap-2 p-3"
            style={{ background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "16px", cursor: "pointer" }}
          >
            <Star size={18} color="#FFD700" fill="#FFD700" />
            <p style={{ fontFamily: "var(--game-font-sans)", fontWeight: 800, fontSize: "14px", color: "#FFFFFF" }}>{state.totalPoints}</p>
            <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "10px", color: "rgba(255,255,255,0.7)" }}>Puntos</p>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {showCoinsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ background: "var(--game-overlay)" }}
            onClick={() => setShowCoinsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              transition={{ type: "spring", damping: 18, stiffness: 260 }}
              className="flex w-full max-w-sm flex-col gap-4 p-6"
              style={{
                background: "var(--game-card)",
                borderRadius: "var(--game-radius-2xl)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 style={{ fontFamily: "var(--game-font-serif)", fontWeight: 700, fontSize: "20px", color: "var(--game-text-dark)" }}>
                    🪙 Conseguir Monedas
                  </h2>
                  <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "13px", color: "var(--game-text-soft)" }}>
                    Tienes: {state.coins} monedas
                  </p>
                </div>
                <button
                  onClick={() => setShowCoinsModal(false)}
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

              <motion.button
                whileTap={{ scale: 0.97 }}
                disabled={state.totalPoints < 200}
                onClick={() => {
                  buyCoinsWithPoints(50, 200);
                  setShowCoinsModal(false);
                  toast.success("Compraste 50 monedas usando 200 puntos");
                }}
                className="flex w-full items-center justify-center gap-3 py-4"
                style={{
                  background: state.totalPoints >= 200 ? "linear-gradient(135deg, #FFD700, #F0A800)" : "#E2EAF4",
                  borderRadius: "var(--game-radius-lg)",
                  border: "none",
                  cursor: state.totalPoints >= 200 ? "pointer" : "not-allowed",
                  opacity: state.totalPoints >= 200 ? 1 : 0.6,
                }}
              >
                <span style={{ fontSize: "20px" }}>⭐</span>
                <div className="flex flex-col items-start">
                  <span style={{ fontFamily: "var(--game-font-sans)", fontWeight: 800, fontSize: "15px", color: "var(--game-text-dark)" }}>
                    50 monedas - 200 puntos
                  </span>
                  <span style={{ fontFamily: "var(--game-font-sans)", fontSize: "12px", color: "var(--game-text-mid)" }}>
                    Tienes: {state.totalPoints} puntos
                  </span>
                </div>
              </motion.button>

              <motion.button
                disabled
                className="flex w-full items-center justify-center gap-3 py-4"
                style={{
                  background: "#F8FAFC",
                  borderRadius: "var(--game-radius-lg)",
                  border: "2px solid #E2EAF4",
                  cursor: "not-allowed",
                  opacity: 0.65,
                }}
              >
                <CreditCard size={16} color="#7A8EA6" />
                <div className="flex flex-col items-start">
                  <span style={{ fontFamily: "var(--game-font-sans)", fontWeight: 800, fontSize: "15px", color: "#7A8EA6" }}>
                    Comprar puntos con dinero
                  </span>
                  <span style={{ fontFamily: "var(--game-font-sans)", fontSize: "12px", color: "#9AA9BD" }}>Próximamente</span>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPointsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ background: "var(--game-overlay)" }}
            onClick={() => setShowPointsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 30 }}
              transition={{ type: "spring", damping: 18, stiffness: 260 }}
              className="flex w-full max-w-sm flex-col gap-4 p-6"
              style={{
                background: "var(--game-card)",
                borderRadius: "var(--game-radius-2xl)",
                boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 style={{ fontFamily: "var(--game-font-serif)", fontWeight: 700, fontSize: "20px", color: "var(--game-text-dark)" }}>
                    🎯 Puntos
                  </h2>
                  <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "13px", color: "var(--game-text-soft)" }}>
                    Gana puntos completando niveles con éxito.
                  </p>
                </div>
                <button
                  onClick={() => setShowPointsModal(false)}
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

              <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "13px", color: "var(--game-text-mid)" }}>
                Solo obtendrás los puntos cuando completes el nivel. Si respondes algunas preguntas correctamente pero pierdes el nivel, esos puntos no se suman.
              </p>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setShowPointsModal(false);
                  navigate("/categories");
                }}
                className="flex w-full items-center justify-center gap-3 py-4"
                style={{
                  background: "linear-gradient(135deg, #4A7FD4, #3A6FBF)",
                  borderRadius: "var(--game-radius-lg)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontFamily: "var(--game-font-sans)", fontWeight: 800, fontSize: "15px", color: "#FFFFFF" }}>
                  Ganar puntos jugando
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 px-5 py-5 flex flex-col gap-5">
        {!canPlay && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-2 p-4"
            style={{ background: "#FEF3F5", borderRadius: "var(--game-radius-lg)", border: "1.5px solid rgba(232,77,109,0.3)" }}
          >
            <p style={{ fontFamily: "var(--game-font-sans)", fontWeight: 800, fontSize: "15px", color: "var(--game-red-dark)" }}>
              😔 Sin vidas globales
            </p>
            {displaySeconds !== null && (
              <div className="flex items-center gap-2">
                <Clock size={14} color="var(--game-red-dark)" />
                <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "13px", color: "var(--game-red-dark)" }}>
                  Próxima vida en {formatTime(displaySeconds)}
                </p>
              </div>
            )}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowLivesModal(true)}
              className="mt-1 px-5 py-2"
              style={{ background: "#FF4D6D", borderRadius: "var(--game-radius-md)", border: "none", cursor: "pointer" }}
            >
              <span style={{ fontFamily: "var(--game-font-sans)", fontWeight: 800, fontSize: "13px", color: "#FFF" }}>
                Conseguir vidas
              </span>
            </motion.button>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4"
          style={{ background: "var(--game-beige)", borderRadius: "18px", border: "1px solid var(--game-beige-border)" }}
        >
          <p style={{ fontFamily: "var(--game-font-serif)", fontStyle: "italic", fontSize: "13px", color: "#7A5030", lineHeight: 1.6 }}>
            "{phrase}"
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4">
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            whileTap={canPlay ? { scale: 0.97 } : {}}
            whileHover={canPlay ? { scale: 1.01 } : {}}
            onClick={() => canPlay && navigate("/categories")}
            id="btn-jugar"
            className="flex w-full items-center justify-center gap-3 py-5"
            style={{
              background: canPlay ? "linear-gradient(135deg, #4A7FD4 0%, #3A6FBF 100%)" : "#CBD5E0",
              borderRadius: "18px",
              boxShadow: canPlay ? "0 8px 24px rgba(74, 127, 212, 0.4)" : "none",
              border: "none",
              cursor: canPlay ? "pointer" : "not-allowed",
              opacity: canPlay ? 1 : 0.65,
            }}
          >
            <div className="flex items-center justify-center" style={{ width: "38px", height: "38px", borderRadius: "50%", background: "rgba(255,255,255,0.25)" }}>
              <Play size={18} color="white" fill="white" />
            </div>
            <span style={{ fontFamily: "var(--game-font-sans)", fontWeight: 800, fontSize: "20px", color: "#FFFFFF", letterSpacing: "0.5px" }}>
              {canPlay ? "¡Jugar Ahora!" : "Sin vidas disponibles"}
            </span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between p-4"
            style={{ background: "#FFFFFF", borderRadius: "18px", border: "1px solid #E2EAF4", boxShadow: "0 10px 24px rgba(30,58,95,0.08)" }}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center" style={{ width: "44px", height: "44px", borderRadius: "14px", background: "#FDF0E6" }}>
                <Crown size={18} color="#D4925B" />
              </div>
              <div>
                <p style={{ fontFamily: "var(--game-font-sans)", fontWeight: 800, fontSize: "14px", color: "#1E3A5F" }}>Desafío diario</p>
                <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "12px", color: "#7A8EA6" }}>Gana 50 puntos completando 2 niveles</p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/categories")}
              className="px-4 py-2"
              style={{ background: "#1E3A5F", borderRadius: "12px", border: "none", cursor: "pointer" }}
            >
              <span style={{ fontFamily: "var(--game-font-sans)", fontWeight: 700, fontSize: "12px", color: "#FFFFFF" }}>Participar</span>
            </motion.button>
          </motion.div>
        </div>

        <div>
          <p
            style={{
              fontFamily: "var(--game-font-sans)",
              fontWeight: 700,
              fontSize: "14px",
              color: "var(--game-text-soft)",
              marginBottom: "12px",
              letterSpacing: "0.5px",
            }}
          >
            EXPLORAR
          </p>
          <div className="grid grid-cols-2 gap-3">
            {navCards.map((card, index) => (
              <motion.button
                key={card.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.07 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => navigate(card.path)}
                id={`btn-nav-${index}`}
                className="flex items-center gap-3 p-4"
                style={{
                  background: "var(--game-card)",
                  borderRadius: "var(--game-radius-lg)",
                  boxShadow: "0 2px 12px var(--game-card-shadow)",
                  border: "1px solid var(--game-card-border)",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div className="flex flex-shrink-0 items-center justify-center" style={{ width: "40px", height: "40px", borderRadius: "12px", background: card.bg }}>
                  <card.icon size={19} color={card.color} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p style={{ fontFamily: "var(--game-font-sans)", fontWeight: 700, fontSize: "14px", color: "var(--game-text-dark)" }}>{card.label}</p>
                </div>
                <ChevronRight size={14} color="var(--game-text-soft)" />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="h-2" />
      </div>
    </div>
  );
}
