// Routine.jsx — v2 responsivo com maxWidth 480px

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRoutine, ROUTINE_ITEMS } from "../hooks/useRoutine";
import RoutineCard from "../components/RoutineCard";
import RoutineSlot from "../components/RoutineSlot";
import WinScreen  from "../components/WinScreen";

export default function Routine() {
  const navigate = useNavigate();
  const { slots, bank, correctCount, totalSlots, progressPercent, gameOver, placeItem, removeFromSlot, restart } = useRoutine();
  const [draggingId, setDraggingId] = useState(null);
  const [wrongSlot, setWrongSlot]   = useState(null);
  const [wrongItem, setWrongItem]   = useState(null);
  const [seconds]                   = useState(0);

  const handleDrop = useCallback((slotIndex) => {
    if (!draggingId) return;
    const result = placeItem(draggingId, slotIndex);
    if (!result.blocked && !result.correct) {
      setWrongSlot(slotIndex); setWrongItem(draggingId);
      setTimeout(() => { setWrongSlot(null); setWrongItem(null); }, 800);
    }
    setDraggingId(null);
  }, [draggingId, placeItem]);

  const handleDropOnBank = useCallback((e) => {
    e.preventDefault();
    if (!draggingId) return;
    const fromSlot = slots.findIndex((s) => s === draggingId);
    if (fromSlot >= 0) removeFromSlot(fromSlot);
    setDraggingId(null);
  }, [draggingId, slots, removeFromSlot]);

  function getSlotItem(i) {
    const id = slots[i]; if (!id) return null;
    return ROUTINE_ITEMS.find((r) => r.id === id) || null;
  }
  function getBankItems() {
    const ids = wrongItem && !bank.includes(wrongItem) ? [...bank, wrongItem] : bank;
    return ids.map((id) => ROUTINE_ITEMS.find((r) => r.id === id)).filter(Boolean);
  }

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#E8E0D4", minHeight: "100vh", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
      <div style={{ background: "#FFF9F0", width: "100%", maxWidth: 480, minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", color: "#1F2937", userSelect: "none" }}>

        <header role="banner" style={{ background: "#FFFDF8", borderBottom: "3px solid #C0DD97", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={() => navigate("/")} aria-label="Voltar" style={{ background: "#F0E8DC", border: "none", borderRadius: 12, width: 38, height: 38, fontSize: 16, cursor: "pointer", fontFamily: "'Nunito', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>←</button>
          <h1 style={{ fontSize: 18, fontWeight: 800, color: "#1F2937", flex: 1, margin: 0 }}>📅 Minha Rotina</h1>
          <div aria-live="polite" style={{ background: "#EAF3DE", border: "2px solid #C0DD97", borderRadius: 12, padding: "4px 12px", fontSize: 13, fontWeight: 800, color: "#3B6D11" }}>
            {correctCount} / {totalSlots} acertos
          </div>
        </header>

        <main role="main" style={{ padding: "12px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
          <div role="note" style={{ background: "#EAF3DE", border: "2px solid #C0DD97", borderRadius: 14, padding: "9px 12px", display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#3B6D11", fontWeight: 700 }}>
            <span aria-hidden="true" style={{ fontSize: 18, flexShrink: 0 }}>👆</span>
            Arraste cada atividade para o lugar certo na rotina do dia!
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 800, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>Atividades para organizar</p>
            <div onDragOver={(e) => e.preventDefault()} onDrop={handleDropOnBank} aria-label="Banco de atividades"
              style={{ display: "flex", flexWrap: "wrap", gap: 8, background: "#F5EFE6", borderRadius: 14, padding: 12, minHeight: 72, border: "2px dashed #D4C4B0" }}>
              {getBankItems().map((item) => (
                <RoutineCard key={item.id} item={item} onDragStart={setDraggingId} />
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 800, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>Minha rotina do dia</p>
            <div role="list" aria-label="Sequência da rotina" style={{ display: "flex", gap: 6, alignItems: "center", overflowX: "auto", paddingBottom: 4 }}>
              {ROUTINE_ITEMS.map((item, i) => (
                <>
                  {i > 0 && <span key={`a${i}`} aria-hidden="true" style={{ fontSize: 16, color: "#C0DD97", flexShrink: 0 }}>→</span>}
                  <RoutineSlot key={item.id} index={i} placedItem={getSlotItem(i)} isCorrect={slots[i] === item.id} onDrop={handleDrop} isWrong={wrongSlot === i} />
                </>
              ))}
            </div>
          </div>
        </main>

        <footer style={{ background: "white", borderTop: "2px solid #E5E7EB", padding: "10px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <div role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}
            style={{ background: "#EAF3DE", borderRadius: 30, height: 11, flex: 1, overflow: "hidden", border: "1.5px solid #C0DD97" }}>
            <div style={{ background: "#639922", height: "100%", borderRadius: 30, width: `${progressPercent}%`, transition: "width 0.4s ease" }} />
          </div>
          <button onClick={restart} aria-label="Recomeçar"
            style={{ background: "#EAF3DE", border: "2px solid #C0DD97", borderRadius: 12, padding: "8px 16px", fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 800, color: "#3B6D11", cursor: "pointer" }}
            onMouseEnter={(e) => (e.target.style.background = "#C0DD97")}
            onMouseLeave={(e) => (e.target.style.background = "#EAF3DE")}>
            ↺ Recomeçar
          </button>
        </footer>

        {gameOver && <WinScreen moves={correctCount} seconds={seconds} stars={3} onReplay={restart} />}
      </div>
    </div>
  );
}
