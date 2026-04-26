// Routine.jsx — Página "Minha Rotina"
// A criança arrasta atividades do banco para montar a sequência correta do dia
//
// Princípios de IHC para crianças com TEA:
//  1. Previsibilidade    — sequência fixa e conhecida (rotina real do dia)
//  2. Feedback imediato  — verde = acerto, vermelho + volta = erro (sem punição severa)
//  3. Linguagem visual   — ícones grandes, setas indicando direção da sequência
//  4. Sem sobrecarga     — apenas 6 itens, sempre visíveis
//  5. Progresso visível  — barra e contador de acertos em tempo real
//  6. Acessibilidade     — drag & drop com aria-label em cada estado

import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRoutine, ROUTINE_ITEMS } from "../hooks/useRoutine";
import RoutineCard from "../components/RoutineCard";
import RoutineSlot from "../components/RoutineSlot";
import WinScreen  from "../components/WinScreen";

export default function Routine() {
  const navigate = useNavigate();
  const {
    slots,
    bank,
    correctCount,
    totalSlots,
    progressPercent,
    gameOver,
    placeItem,
    removeFromSlot,
    restart,
  } = useRoutine();

  // ID do item sendo arrastado no momento
  const [draggingId, setDraggingId] = useState(null);

  // Tempo de jogo (para WinScreen — inicia ao montar)
  const [seconds] = useState(0);

  // ── Soltar no slot ────────────────────────────────────────────────────────
  const handleDrop = useCallback(
    (slotIndex) => {
      if (!draggingId) return;
      const result = placeItem(draggingId, slotIndex);

      if (!result.blocked && !result.correct) {
        // Erro: devolve ao banco após 800ms (feedback não punitivo)
        // O hook não altera o estado — o item nunca chega ao slot permanentemente
        // Apenas mostramos feedback visual temporário via estado local
        setWrongSlot(slotIndex);
        setWrongItem(draggingId);
        setTimeout(() => {
          setWrongSlot(null);
          setWrongItem(null);
        }, 800);
      }
      setDraggingId(null);
    },
    [draggingId, placeItem]
  );

  // Estado de feedback de erro temporário
  const [wrongSlot, setWrongSlot]   = useState(null);
  const [wrongItem, setWrongItem]   = useState(null);

  // ── Helpers de UI ─────────────────────────────────────────────────────────
  function getSlotItem(slotIndex) {
    const id = slots[slotIndex];
    if (!id) return null;
    return ROUTINE_ITEMS.find((r) => r.id === id) || null;
  }

  function getBankItems() {
    // bank + wrongItem temporariamente visível no banco
    const ids = wrongItem && !bank.includes(wrongItem)
      ? [...bank, wrongItem]
      : bank;
    return ids.map((id) => ROUTINE_ITEMS.find((r) => r.id === id)).filter(Boolean);
  }

  // ── Soltar de volta no banco ──────────────────────────────────────────────
  const handleDropOnBank = useCallback(
    (e) => {
      e.preventDefault();
      if (!draggingId) return;
      const fromSlot = slots.findIndex((s) => s === draggingId);
      if (fromSlot >= 0) removeFromSlot(fromSlot);
      setDraggingId(null);
    },
    [draggingId, slots, removeFromSlot]
  );

  return (
    <div
      style={{
        fontFamily: "'Nunito', sans-serif",
        background: "#FFF9F0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* ── Cabeçalho ──────────────────────────────────────────────────── */}
      <header
        role="banner"
        style={{
          background: "#FFFDF8",
          borderBottom: "3px solid #C0DD97",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <button
          onClick={() => navigate("/")}
          aria-label="Voltar para o início"
          style={{
            background: "#F0E8DC",
            border: "none",
            borderRadius: 12,
            width: 40,
            height: 40,
            fontSize: 18,
            cursor: "pointer",
            fontFamily: "'Nunito', sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ←
        </button>

        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#3A3230", flex: 1, margin: 0 }}>
          📅 Minha Rotina
        </h1>

        {/* Contador de acertos — visibilidade do estado (IHC) */}
        <div
          style={{
            background: "#EAF3DE",
            border: "2px solid #C0DD97",
            borderRadius: 12,
            padding: "6px 14px",
            fontSize: 14,
            fontWeight: 800,
            color: "#3B6D11",
          }}
          aria-live="polite"
          aria-label={`${correctCount} de ${totalSlots} acertos`}
        >
          {correctCount} / {totalSlots} acertos
        </div>
      </header>

      {/* ── Corpo ──────────────────────────────────────────────────────── */}
      <main role="main" style={{ padding: "16px 20px", flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Instrução simples e persistente (IHC: linguagem direta) */}
        <div
          role="note"
          style={{
            background: "#EAF3DE",
            border: "2px solid #C0DD97",
            borderRadius: 16,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span aria-hidden="true" style={{ fontSize: 22, flexShrink: 0 }}>👆</span>
          <span style={{ fontSize: 14, color: "#3B6D11", fontWeight: 700, lineHeight: 1.4 }}>
            Arraste cada atividade para o lugar certo na rotina do dia!
          </span>
        </div>

        {/* Banco de atividades — zona de soltar para devolver */}
        <div>
          <p style={{ fontSize: 13, fontWeight: 800, color: "#8A7F78", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>
            Atividades para organizar
          </p>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDropOnBank}
            aria-label="Banco de atividades"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              background: "#F5EFE6",
              borderRadius: 16,
              padding: 14,
              minHeight: 80,
              border: "2px dashed #D4C4B0",
            }}
          >
            {getBankItems().map((item) => (
              <RoutineCard
                key={item.id}
                item={item}
                onDragStart={setDraggingId}
              />
            ))}
          </div>
        </div>

        {/* Sequência de slots — rolagem horizontal se necessário */}
        <div>
          <p style={{ fontSize: 13, fontWeight: 800, color: "#8A7F78", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 6 }}>
            Minha rotina do dia
          </p>
          <div
            role="list"
            aria-label="Sequência da rotina"
            style={{
              display: "flex",
              gap: 10,
              alignItems: "center",
              overflowX: "auto",
              paddingBottom: 4,
            }}
          >
            {ROUTINE_ITEMS.map((item, i) => (
              <>
                {i > 0 && (
                  <span
                    key={`arrow-${i}`}
                    aria-hidden="true"
                    style={{ fontSize: 20, color: "#C0DD97", flexShrink: 0 }}
                  >
                    →
                  </span>
                )}
                <RoutineSlot
                  key={item.id}
                  index={i}
                  placedItem={getSlotItem(i)}
                  isCorrect={slots[i] === item.id}
                  onDrop={handleDrop}
                  isWrong={wrongSlot === i}
                />
              </>
            ))}
          </div>
        </div>
      </main>

      {/* ── Rodapé com barra de progresso ──────────────────────────────── */}
      <footer
        style={{
          background: "white",
          borderTop: "2px solid #F0E8DC",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progresso: ${correctCount} de ${totalSlots} atividades corretas`}
          style={{
            background: "#EAF3DE",
            borderRadius: 30,
            height: 14,
            flex: 1,
            overflow: "hidden",
            border: "1px solid #C0DD97",
          }}
        >
          <div
            style={{
              background: "#639922",
              height: "100%",
              borderRadius: 30,
              width: `${progressPercent}%`,
              transition: "width 0.4s ease",
            }}
          />
        </div>

        <button
          onClick={restart}
          aria-label="Recomeçar a atividade"
          style={{
            background: "#EAF3DE",
            border: "2px solid #C0DD97",
            borderRadius: 14,
            padding: "9px 18px",
            fontFamily: "'Nunito', sans-serif",
            fontSize: 14,
            fontWeight: 800,
            color: "#3B6D11",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#C0DD97")}
          onMouseLeave={(e) => (e.target.style.background = "#EAF3DE")}
        >
          ↺ Recomeçar
        </button>
      </footer>

      {/* ── Tela de vitória ────────────────────────────────────────────── */}
      {gameOver && (
        <WinScreen
          moves={correctCount}
          seconds={seconds}
          stars={3}
          onReplay={restart}
        />
      )}
    </div>
  );
}
