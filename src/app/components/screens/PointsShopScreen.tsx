import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ChevronLeft, CreditCard } from "lucide-react";

const POINT_PACKAGES = [
  { id: "pack-1", points: 200, price: "$1.99", bonus: "+20 bonus" },
  { id: "pack-2", points: 500, price: "$3.99", bonus: "+80 bonus" },
  { id: "pack-3", points: 1200, price: "$7.99", bonus: "+250 bonus" },
  { id: "pack-4", points: 2500, price: "$14.99", bonus: "+700 bonus" },
];

export function PointsShopScreen() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-full" style={{ background: "linear-gradient(180deg, #F6F0E8 0%, #EEF4FB 60%, #FFFFFF 100%)" }}>
      <div className="px-5 pt-4 pb-5">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2" style={{ background: "transparent", border: "none", cursor: "pointer" }}>
          <ChevronLeft size={18} color="#1E3A5F" />
          <span style={{ fontFamily: "var(--game-font-sans)", fontWeight: 700, fontSize: "14px", color: "#1E3A5F" }}>Volver</span>
        </button>
        <h1 style={{ fontFamily: "var(--game-font-serif)", fontWeight: 800, fontSize: "26px", color: "#1E3A5F", marginTop: "10px" }}>Compra de Puntos</h1>
        <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "13px", color: "#6B7E95" }}>Elige un paquete para continuar al pago seguro.</p>
      </div>

      <div className="flex-1 px-5 pb-6 grid grid-cols-1 gap-4">
        {POINT_PACKAGES.map((pack, i) => (
          <motion.div
            key={pack.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.06 }}
            className="p-4 flex items-center justify-between"
            style={{ background: "#FFFFFF", borderRadius: "18px", border: "1px solid rgba(30,58,95,0.08)", boxShadow: "0 8px 20px rgba(30,58,95,0.08)" }}
          >
            <div>
              <p style={{ fontFamily: "var(--game-font-sans)", fontWeight: 800, fontSize: "18px", color: "#1E3A5F" }}>{pack.points} puntos</p>
              <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "12px", color: "#9AA9BD" }}>{pack.bonus}</p>
            </div>
            <div className="flex items-center gap-3">
              <span style={{ fontFamily: "var(--game-font-sans)", fontWeight: 800, fontSize: "16px", color: "#4A7FD4" }}>{pack.price}</span>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/payments", { state: { points: pack.points, price: pack.price } })}
                className="px-4 py-2 flex items-center gap-2"
                style={{ background: "linear-gradient(135deg, #4A7FD4, #3A6FBF)", borderRadius: "12px", border: "none", cursor: "pointer" }}
              >
                <CreditCard size={14} color="#FFFFFF" />
                <span style={{ fontFamily: "var(--game-font-sans)", fontWeight: 700, fontSize: "12px", color: "#FFFFFF" }}>Comprar</span>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
