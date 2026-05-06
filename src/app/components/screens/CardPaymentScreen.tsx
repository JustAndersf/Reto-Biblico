import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ChevronLeft, Lock } from "lucide-react";
import { toast } from "sonner";
import { useGame } from "../../context/GameContext";

interface PaymentState {
  points?: number;
  price?: string;
}

export function CardPaymentScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addPoints } = useGame();
  const payment = (location.state || {}) as PaymentState;

  const packageInfo = useMemo(() => {
    return {
      points: payment.points ?? 500,
      price: payment.price ?? "$3.99",
    };
  }, [payment.points, payment.price]);

  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [email, setEmail] = useState("");

  const canSubmit = fullName && cardNumber && expiry && cvv && email;

  const handleSubmit = () => {
    if (!canSubmit) {
      toast.error("Completa todos los campos.");
      return;
    }
    addPoints(packageInfo.points);
    toast.success("Pago simulado", { description: `Sumaste ${packageInfo.points} puntos.` });
    navigate("/home");
  };

  return (
    <div className="flex flex-col min-h-full" style={{ background: "linear-gradient(180deg, #F0F5FF 0%, #FFFFFF 100%)" }}>
      <div className="px-5 pt-4 pb-5">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2" style={{ background: "transparent", border: "none", cursor: "pointer" }}>
          <ChevronLeft size={18} color="#1E3A5F" />
          <span style={{ fontFamily: "var(--game-font-sans)", fontWeight: 700, fontSize: "14px", color: "#1E3A5F" }}>Volver</span>
        </button>
        <h1 style={{ fontFamily: "var(--game-font-serif)", fontWeight: 800, fontSize: "24px", color: "#1E3A5F", marginTop: "10px" }}>Pago con tarjeta</h1>
        <p style={{ fontFamily: "var(--game-font-sans)", fontSize: "13px", color: "#6B7E95" }}>Paquete: {packageInfo.points} puntos — {packageInfo.price}</p>
      </div>

      <div className="px-5 pb-6 flex-1">
        <div className="p-5 flex flex-col gap-4" style={{ background: "#FFFFFF", borderRadius: "18px", border: "1px solid rgba(30,58,95,0.08)", boxShadow: "0 10px 24px rgba(30,58,95,0.08)" }}>
          <div>
            <label style={{ fontFamily: "var(--game-font-sans)", fontSize: "12px", color: "#7A8EA6" }}>Nombre completo</label>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Juan Perez" className="w-full mt-2 px-4 py-3" style={{ borderRadius: "12px", border: "1px solid #E2EAF4", fontFamily: "var(--game-font-sans)" }} />
          </div>
          <div>
            <label style={{ fontFamily: "var(--game-font-sans)", fontSize: "12px", color: "#7A8EA6" }}>Correo</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo@ejemplo.com" className="w-full mt-2 px-4 py-3" style={{ borderRadius: "12px", border: "1px solid #E2EAF4", fontFamily: "var(--game-font-sans)" }} />
          </div>
          <div>
            <label style={{ fontFamily: "var(--game-font-sans)", fontSize: "12px", color: "#7A8EA6" }}>Numero de tarjeta</label>
            <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="0000 0000 0000 0000" className="w-full mt-2 px-4 py-3" style={{ borderRadius: "12px", border: "1px solid #E2EAF4", fontFamily: "var(--game-font-sans)" }} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label style={{ fontFamily: "var(--game-font-sans)", fontSize: "12px", color: "#7A8EA6" }}>Expiracion</label>
              <input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/AA" className="w-full mt-2 px-4 py-3" style={{ borderRadius: "12px", border: "1px solid #E2EAF4", fontFamily: "var(--game-font-sans)" }} />
            </div>
            <div>
              <label style={{ fontFamily: "var(--game-font-sans)", fontSize: "12px", color: "#7A8EA6" }}>CVV</label>
              <input value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="123" className="w-full mt-2 px-4 py-3" style={{ borderRadius: "12px", border: "1px solid #E2EAF4", fontFamily: "var(--game-font-sans)" }} />
            </div>
          </div>

          <motion.button whileTap={{ scale: 0.97 }} onClick={handleSubmit} className="w-full py-4 flex items-center justify-center gap-2" style={{ background: canSubmit ? "linear-gradient(135deg, #4A7FD4, #3A6FBF)" : "#E2EAF4", borderRadius: "14px", border: "none", cursor: canSubmit ? "pointer" : "not-allowed" }}>
            <Lock size={16} color={canSubmit ? "#FFFFFF" : "#9AA9BD"} />
            <span style={{ fontFamily: "var(--game-font-sans)", fontWeight: 800, fontSize: "14px", color: canSubmit ? "#FFFFFF" : "#9AA9BD" }}>Pagar y recibir puntos</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
