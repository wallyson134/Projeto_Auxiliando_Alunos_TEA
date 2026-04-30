// useShapeSorter.js — Hook com lógica do jogo Encaixe as Formas
// Suporta drag & drop (desktop) e clique em dois passos (touch/mobile)

import { useState, useCallback } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// 👇 ONDE ADICIONAR OU EDITAR FORMAS
// Cada forma precisa de:
//   id      — identificador único
//   label   — nome em português
//   color   — cor principal (hex)
//   dark    — cor escura para sombra/contraste
//   path    — função que retorna o SVG interno da forma colorida
//             recebe (color) e deve caber em viewBox "0 0 54 54"
//   hole    — função que retorna o SVG interno da silhueta no tabuleiro
//             recebe (holeColor) — use rgba(255,255,255,0.6) para silhueta
// ─────────────────────────────────────────────────────────────────────────────
export const SHAPES = [
  {
    id: "square",
    label: "Quadrado",
    color: "#4CAF50",
    dark: "#2E7D32",
    path: (c) => `<rect x="8" y="8" width="38" height="38" rx="4" fill="${c}"/>`,
    hole: (c) => `<rect x="8" y="8" width="38" height="38" rx="4" fill="${c}"/>`,
  },
  {
    id: "triangle",
    label: "Triângulo",
    color: "#FF7043",
    dark: "#BF360C",
    path: (c) => `<polygon points="27,6 52,50 2,50" fill="${c}"/>`,
    hole: (c) => `<polygon points="27,6 52,50 2,50" fill="${c}"/>`,
  },
  {
    id: "circle",
    label: "Círculo",
    color: "#2196F3",
    dark: "#0D47A1",
    path: (c) => `<circle cx="27" cy="27" r="19" fill="${c}"/>`,
    hole: (c) => `<circle cx="27" cy="27" r="19" fill="${c}"/>`,
  },
  {
    id: "heart",
    label: "Coração",
    color: "#E53935",
    dark: "#B71C1C",
    path: (c) => `<path d="M27 46 C27 46 6 32 6 18 C6 10 13 6 20 10 C23 12 27 16 27 16 C27 16 31 12 34 10 C41 6 48 10 48 18 C48 32 27 46 27 46Z" fill="${c}"/>`,
    hole: (c) => `<path d="M27 46 C27 46 6 32 6 18 C6 10 13 6 20 10 C23 12 27 16 27 16 C27 16 31 12 34 10 C41 6 48 10 48 18 C48 32 27 46 27 46Z" fill="${c}"/>`,
  },
  {
    id: "ring",
    label: "Anel",
    color: "#FDD835",
    dark: "#F57F17",
    path: (c) => `<circle cx="27" cy="27" r="20" fill="${c}"/><circle cx="27" cy="27" r="11" fill="white"/>`,
    hole: (c) => `<circle cx="27" cy="27" r="20" fill="${c}"/><circle cx="27" cy="27" r="11" fill="#E8C86A"/>`,
  },
  {
    id: "star",
    label: "Estrela",
    color: "#9C27B0",
    dark: "#4A148C",
    path: (c) => `<polygon points="27,4 32,20 49,20 36,30 41,47 27,37 13,47 18,30 5,20 22,20" fill="${c}"/>`,
    hole: (c) => `<polygon points="27,4 32,20 49,20 36,30 41,47 27,37 13,47 18,30 5,20 22,20" fill="${c}"/>`,
  },
];
// ─────────────────────────────────────────────────────────────────────────────

// Posições fixas dos slots no tabuleiro circular (tabuleiro 280×280px)
export const SLOT_POSITIONS = [
  { top: 20,  left: 105 },
  { top: 20,  left: 165 },
  { top: 80,  left: 35  },
  { top: 80,  left: 225 },
  { top: 155, left: 55  },
  { top: 155, left: 200 },
];

export function useShapeSorter() {
  // matched: Set de ids já encaixados
  const [matched, setMatched]           = useState(new Set());
  // selectedId: forma clicada aguardando slot (modo touch)
  const [selectedId, setSelectedId]     = useState(null);
  // wrongSlotId: slot que errou (para animação)
  const [wrongSlotId, setWrongSlotId]   = useState(null);
  const [errors, setErrors]             = useState(0);
  const [gameOver, setGameOver]         = useState(false);
  const [feedback, setFeedback]         = useState({ msg: "", type: "" });

  const totalShapes   = SHAPES.length;
  const matchedCount  = matched.size;
  const progressPercent = Math.round((matchedCount / totalShapes) * 100);
  const stars = errors <= 2 ? 3 : errors <= 5 ? 2 : 1;

  const showFeedback = useCallback((msg, type) => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback({ msg: "", type: "" }), 1400);
  }, []);

  // ── Tentar encaixar draggingId no slotId ─────────────────────────────────
  const tryPlace = useCallback((draggingId, slotId) => {
    if (!draggingId || matched.has(slotId)) return;

    if (draggingId === slotId) {
      // ✅ Acerto
      setMatched((prev) => {
        const next = new Set(prev);
        next.add(slotId);
        if (next.size === SHAPES.length) setTimeout(() => setGameOver(true), 500);
        return next;
      });
      const shape = SHAPES.find((s) => s.id === slotId);
      showFeedback(`✓ ${shape.label} encaixado! 🎉`, "ok");
      setSelectedId(null);
    } else {
      // ❌ Erro
      setErrors((e) => e + 1);
      setWrongSlotId(slotId);
      setTimeout(() => setWrongSlotId(null), 400);
      const correct = SHAPES.find((s) => s.id === slotId);
      showFeedback(`Ops! Esse buraco é da ${correct.label}! Tente de novo 😊`, "err");
      setSelectedId(null);
    }
  }, [matched, showFeedback]);

  // ── Selecionar forma (modo toque — clique em 2 passos) ───────────────────
  const selectShape = useCallback((id) => {
    setSelectedId((prev) => prev === id ? null : id);
  }, []);

  // ── Reiniciar ─────────────────────────────────────────────────────────────
  const restart = useCallback(() => {
    setMatched(new Set());
    setSelectedId(null);
    setWrongSlotId(null);
    setErrors(0);
    setGameOver(false);
    setFeedback({ msg: "", type: "" });
  }, []);

  return {
    matched,
    selectedId,
    wrongSlotId,
    matchedCount,
    totalShapes,
    progressPercent,
    errors,
    gameOver,
    stars,
    feedback,
    tryPlace,
    selectShape,
    restart,
  };
}
