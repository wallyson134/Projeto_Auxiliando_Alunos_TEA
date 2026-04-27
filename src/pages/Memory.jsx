// Memory.jsx — v4
// Passa enterDelay para cada carta (animação escalonada na entrada)
// Aplica estilos de hover/press via index.css (classe card-front-face)

import { useNavigate }   from "react-router-dom";
import { useMemoryGame } from "../hooks/useMemoryGame";
import MemoryCard        from "../components/MemoryCard";
import WinScreen         from "../components/WinScreen";

function formatTime(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export default function Memory() {
  const navigate = useNavigate();
  const {
    deck, moves, matchedCount, totalPairs,
    seconds, gameOver, stars,
    progressPercent, wrongIndexes,
    feedback, flipCard, restart,
  } = useMemoryGame();

  return (
    <div style={{
      fontFamily: "'Nunito', sans-serif",
      background: "#E8E0D4",
      minHeight: "100vh",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
    }}>
      <div style={{
        background: "#FFF9F0",
        width: "100%",
        maxWidth: 480,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        color: "#1F2937",
      }}>

        {/* ── Cabeçalho ── */}
        <header role="banner" style={{
          background: "#FFFDF8",
          borderBottom: "3px solid #FFD166",
          padding: "12px 16px",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <button onClick={() => navigate("/")} aria-label="Voltar"
            style={{ background: "#F0E8DC", border: "none", borderRadius: 12, width: 38, height: 38, fontSize: 16, cursor: "pointer", fontFamily: "'Nunito', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>←</button>

          <h1 style={{ fontSize: 18, fontWeight: 800, color: "#1F2937", flex: 1, margin: 0 }}>
            🃏 Jogo da Memória
          </h1>

          <div style={{ display: "flex", gap: 6 }}>
            {[{ val: moves, lbl: "jogadas" }, { val: formatTime(seconds), lbl: "tempo" }].map(({ val, lbl }) => (
              <div key={lbl} style={{ background: "#FFF0C2", border: "2px solid #FFD166", borderRadius: 12, padding: "4px 10px", textAlign: "center", minWidth: 52 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#1F2937" }}>{val}</div>
                <div style={{ fontSize: 9, color: "#6B7280", fontWeight: 700 }}>{lbl}</div>
              </div>
            ))}
          </div>
        </header>

        {/* ── Corpo ── */}
        <main role="main" style={{ padding: "12px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>

          <div role="note" style={{ background: "#E6F1FB", border: "2px solid #B5D4F4", borderRadius: 14, padding: "9px 12px", display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#0C447C", fontWeight: 700 }}>
            <span aria-hidden="true" style={{ fontSize: 18, flexShrink: 0 }}>👆</span>
            Vire duas cartas e encontre os pares iguais!
          </div>

          {/* Barra de progresso */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}
              aria-label={`${matchedCount} de ${totalPairs} pares`}
              style={{ flex: 1, background: "#F5D97A", borderRadius: 30, height: 12, border: "1.5px solid #E6A800", overflow: "hidden" }}>
              <div style={{ background: "#E07B39", height: "100%", borderRadius: 30, width: `${progressPercent}%`, transition: "width 0.5s ease" }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#6B7280", whiteSpace: "nowrap" }}>
              {matchedCount} / {totalPairs} pares
            </span>
          </div>

          {/* Feedback inline */}
          <p aria-live="polite" style={{
            fontSize: 14, fontWeight: 800, textAlign: "center",
            minHeight: 20, margin: 0,
            color: feedback.type === "ok" ? "#16A34A" :
                   feedback.type === "err" ? "#DC2626" : "transparent",
          }}>
            {feedback.msg || " "}
          </p>

          {/* Tabuleiro */}
          <div role="list" aria-label="Tabuleiro do jogo da memória"
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, flex: 1 }}>
            {deck.map((card, index) => (
              <MemoryCard
                key={card.id}
                card={card}
                isWrong={wrongIndexes.includes(index)}
                onClick={() => flipCard(index)}
                enterDelay={index * 0.035}   // entrada escalonada por carta
              />
            ))}
          </div>
        </main>

        {/* ── Rodapé ── */}
        <footer style={{ background: "white", borderTop: "2px solid #E5E7EB", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: 14, color: "#4B5563", fontWeight: 700, margin: 0 }}>
            Pares: <strong style={{ color: "#E07B39", fontSize: 17 }}>{matchedCount}</strong> / {totalPairs}
          </p>
          <button onClick={restart} aria-label="Recomeçar"
            style={{ background: "#FFD166", border: "none", borderRadius: 14, padding: "9px 20px", fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 800, color: "#1F2937", cursor: "pointer", boxShadow: "0 3px 0 #B45309", transition: "background 0.12s, transform 0.1s, box-shadow 0.1s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#FFC233"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 5px 0 #B45309"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#FFD166"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 3px 0 #B45309"; }}
            onMouseDown={(e)  => { e.currentTarget.style.transform = "translateY(1px)"; e.currentTarget.style.boxShadow = "0 1px 0 #B45309"; }}
            onMouseUp={(e)    => { e.currentTarget.style.boxShadow = "0 3px 0 #B45309"; }}>
            ↺ Recomeçar
          </button>
        </footer>

        {gameOver && <WinScreen moves={moves} seconds={seconds} stars={stars} onReplay={restart} />}
      </div>
    </div>
  );
}
