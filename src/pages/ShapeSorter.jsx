// ShapeSorter.jsx — Página "Encaixe as Formas"
// Criança arrasta (desktop) ou toca em 2 passos (mobile) para encaixar
// cada forma no buraco correto do tabuleiro circular
//
// Princípios de IHC para crianças com TEA:
//  1. Correspondência visual direta — cor + forma são pistas simultâneas
//  2. Feedback imediato — acerto: pop verde + som; erro: shake + som grave
//  3. Modo touch — clique na forma → clique no slot (sem arrastar obrigatório)
//  4. Previsibilidade — tabuleiro fixo, silhuetas sempre visíveis como guia
//  5. Progresso visível — barra + contador em tempo real
//  6. Reforço positivo — badge ✓ permanece no slot após encaixar

import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useShapeSorter, SHAPES, SLOT_POSITIONS } from "../hooks/useShapeSorter";
import DraggableShape from "../components/DraggableShape";
import ShapeSlot      from "../components/ShapeSlot";
import WinScreen      from "../components/WinScreen";

// Som via Web Audio — sem arquivo externo
function playTone(freq, dur, type = "sine") {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    o.start(); o.stop(ctx.currentTime + dur);
  } catch (_) {}
}

// Embaralha a ordem das formas na bandeja a cada novo jogo
function shuffleShapes() {
  return [...SHAPES].sort(() => Math.random() - 0.5);
}

export default function ShapeSorter() {
  const navigate = useNavigate();
  const [trayShapes] = useState(shuffleShapes);
  const draggingIdRef = useRef(null); // ref para passar entre drag events

  const {
    matched, selectedId, wrongSlotId,
    matchedCount, totalShapes, progressPercent,
    errors, gameOver, stars, feedback,
    tryPlace, selectShape, restart,
  } = useShapeSorter();

  // ── Drag handlers ────────────────────────────────────────────────────────
  const handleDragStart = useCallback((id) => {
    draggingIdRef.current = id;
    window.__draggingId = id; // fallback para ShapeSlot acessar
  }, []);

  const handleDragEnd = useCallback(() => {
    draggingIdRef.current = null;
    window.__draggingId = null;
  }, []);

  // ── Drop num slot ────────────────────────────────────────────────────────
  const handleSlotDrop = useCallback((draggingId, slotId) => {
    const id = draggingId || draggingIdRef.current;
    if (!id) return;
    const isCorrect = id === slotId;
    if (isCorrect) {
      playTone(880, 0.12); setTimeout(() => playTone(1100, 0.15), 150);
    } else {
      playTone(200, 0.25, "sawtooth");
    }
    tryPlace(id, slotId);
  }, [tryPlace]);

  // ── Click no slot (modo touch) ───────────────────────────────────────────
  const handleSlotClick = useCallback((slotId) => {
    if (!selectedId) return;
    const isCorrect = selectedId === slotId;
    if (isCorrect) {
      playTone(880, 0.12); setTimeout(() => playTone(1100, 0.15), 150);
    } else {
      playTone(200, 0.25, "sawtooth");
    }
    tryPlace(selectedId, slotId);
  }, [selectedId, tryPlace]);

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
          <button
            onClick={() => navigate("/")}
            aria-label="Voltar para o início"
            style={{ background: "#F0E8DC", border: "none", borderRadius: 12, width: 38, height: 38, fontSize: 16, cursor: "pointer", fontFamily: "'Nunito', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          >←</button>

          <h1 style={{ fontSize: 18, fontWeight: 800, color: "#1F2937", flex: 1, margin: 0 }}>
            🔷 Encaixe as Formas
          </h1>

          <div style={{ background: "#FFF0C2", border: "2px solid #FFD166", borderRadius: 12, padding: "4px 10px", textAlign: "center", minWidth: 52 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#1F2937" }}>{matchedCount}</div>
            <div style={{ fontSize: 9, color: "#6B7280", fontWeight: 700 }}>acertos</div>
          </div>
        </header>

        {/* ── Corpo ── */}
        <main role="main" style={{ padding: "12px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>

          {/* Instrução */}
          <div role="note" style={{ background: "#E6F1FB", border: "2px solid #B5D4F4", borderRadius: 14, padding: "9px 12px", display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#0C447C", fontWeight: 700 }}>
            <span aria-hidden="true" style={{ fontSize: 18, flexShrink: 0 }}>👆</span>
            Arraste ou toque em uma forma e depois no buraco certo!
          </div>

          {/* Progresso */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0} aria-valuemax={100}
              aria-label={`${matchedCount} de ${totalShapes} formas encaixadas`}
              style={{ flex: 1, background: "#F5D97A", borderRadius: 30, height: 12, border: "1.5px solid #E6A800", overflow: "hidden" }}
            >
              <div style={{ background: "#E07B39", height: "100%", borderRadius: 30, width: `${progressPercent}%`, transition: "width 0.5s ease" }} />
            </div>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#6B7280", whiteSpace: "nowrap" }}>
              {matchedCount} / {totalShapes}
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

          {/* Bandeja de formas */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 800, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 }}>
              Formas para encaixar
            </p>
            <div
              aria-label="Bandeja de formas"
              style={{ background: "#F5EFE6", border: "2px dashed #D4C4B0", borderRadius: 16, padding: "14px 10px", display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", minHeight: 88 }}
            >
              {trayShapes.map((shape) => (
                <DraggableShape
                  key={shape.id}
                  shape={shape}
                  isUsed={matched.has(shape.id)}
                  isSelected={selectedId === shape.id}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onSelect={selectShape}
                />
              ))}
            </div>
          </div>

          {/* Tabuleiro circular */}
          <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
            <div
              aria-label="Tabuleiro circular"
              style={{
                position: "relative",
                width: 280, height: 280,
                borderRadius: "50%",
                background: "#E8C86A",
                border: "6px solid #C9A238",
              }}
            >
              {SHAPES.map((shape, i) => (
                <ShapeSlot
                  key={shape.id}
                  shape={shape}
                  position={SLOT_POSITIONS[i]}
                  isFilled={matched.has(shape.id)}
                  isWrong={wrongSlotId === shape.id}
                  onDrop={handleSlotDrop}
                  onClick={handleSlotClick}
                />
              ))}
            </div>
          </div>
        </main>

        {/* ── Rodapé ── */}
        <footer style={{ background: "white", borderTop: "2px solid #E5E7EB", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ fontSize: 14, color: "#4B5563", fontWeight: 700, margin: 0 }}>
            Encaixados: <strong style={{ color: "#E07B39", fontSize: 17 }}>{matchedCount}</strong> / {totalShapes}
          </p>
          <button
            onClick={restart}
            aria-label="Recomeçar"
            style={{ background: "#FFD166", border: "none", borderRadius: 14, padding: "9px 20px", fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 800, color: "#1F2937", cursor: "pointer", boxShadow: "0 3px 0 #B45309", transition: "background 0.12s, transform 0.1s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#FFC233"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#FFD166"; e.currentTarget.style.transform = "none"; }}
          >
            ↺ Recomeçar
          </button>
        </footer>

        {gameOver && (
          <WinScreen moves={matchedCount} seconds={0} stars={stars} onReplay={restart} />
        )}
      </div>
    </div>
  );
}
