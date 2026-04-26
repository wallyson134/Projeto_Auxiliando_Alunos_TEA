// useRoutine.js — Hook com toda a lógica do jogo Minha Rotina
// A criança deve arrastar as atividades para a sequência correta do dia

import { useState, useCallback } from "react";

// Sequência correta da rotina — ordem é a resposta certa
export const ROUTINE_ITEMS = [
  { id: "wake",   icon: "🌅", label: "Acordar" },
  { id: "brush",  icon: "🪥", label: "Escovar dentes" },
  { id: "bath",   icon: "🚿", label: "Tomar banho" },
  { id: "eat",    icon: "🍳", label: "Café da manhã" },
  { id: "school", icon: "🎒", label: "Ir para escola" },
  { id: "sleep",  icon: "🌙", label: "Dormir" },
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function useRoutine() {
  // slots[i] = id da atividade colocada na posição i, ou null
  const [slots, setSlots] = useState(() => new Array(ROUTINE_ITEMS.length).fill(null));
  // bank = atividades ainda não posicionadas (embaralhadas)
  const [bank, setBank] = useState(() => shuffle(ROUTINE_ITEMS).map((item) => item.id));
  const [gameOver, setGameOver] = useState(false);

  // Quantos slots estão corretos
  const correctCount = slots.filter((s, i) => s === ROUTINE_ITEMS[i].id).length;
  const totalSlots = ROUTINE_ITEMS.length;
  const progressPercent = Math.round((correctCount / totalSlots) * 100);

  // ── Colocar item do banco em um slot ──────────────────────────────────────
  const placeItem = useCallback(
    (itemId, slotIndex) => {
      // Slot já ocupado — não permite
      if (slots[slotIndex] !== null) return { correct: false, blocked: true };

      const isCorrect = ROUTINE_ITEMS[slotIndex].id === itemId;

      if (isCorrect) {
        // Acertou: remove do banco, coloca no slot permanentemente
        setBank((prev) => prev.filter((id) => id !== itemId));
        setSlots((prev) => {
          const next = [...prev];
          next[slotIndex] = itemId;
          // Verifica vitória após atualizar
          if (next.every((s, i) => s === ROUTINE_ITEMS[i].id)) {
            setTimeout(() => setGameOver(true), 400);
          }
          return next;
        });
      }
      // Se errou: o componente mostra feedback visual e devolve ao banco automaticamente

      return { correct: isCorrect, blocked: false };
    },
    [slots]
  );

  // ── Remover item do slot de volta para o banco ────────────────────────────
  const removeFromSlot = useCallback((slotIndex) => {
    setSlots((prev) => {
      const next = [...prev];
      const itemId = next[slotIndex];
      if (!itemId) return prev;
      next[slotIndex] = null;
      setBank((b) => [...b, itemId]);
      return next;
    });
  }, []);

  // ── Reiniciar ─────────────────────────────────────────────────────────────
  const restart = useCallback(() => {
    setSlots(new Array(ROUTINE_ITEMS.length).fill(null));
    setBank(shuffle(ROUTINE_ITEMS).map((item) => item.id));
    setGameOver(false);
  }, []);

  return {
    slots,
    bank,
    correctCount,
    totalSlots,
    progressPercent,
    gameOver,
    placeItem,
    removeFromSlot,
    restart,
  };
}
