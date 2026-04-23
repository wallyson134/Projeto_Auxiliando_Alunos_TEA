// useMemoryGame.js — Hook com toda a lógica do Jogo da Memória
// Separar lógica da UI é uma boa prática: facilita testes e reutilização

import { useState, useEffect, useCallback, useRef } from "react";

// Conjunto de cartas — emoji + label de acessibilidade (aria-label)
export const CARD_PAIRS = [
  { emoji: "🐶", label: "cachorro" },
  { emoji: "🐱", label: "gato" },
  { emoji: "🐸", label: "sapo" },
  { emoji: "🦁", label: "leão" },
  { emoji: "🐧", label: "pinguim" },
  { emoji: "🦊", label: "raposa" },
  { emoji: "🐻", label: "urso" },
  { emoji: "🐮", label: "vaca" },
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildDeck() {
  const pairs = CARD_PAIRS.flatMap((card, i) => [
    { id: `${i}-a`, emoji: card.emoji, label: card.label },
    { id: `${i}-b`, emoji: card.emoji, label: card.label },
  ]);
  return shuffle(pairs).map((card, index) => ({
    ...card,
    index,
    flipped: false,
    matched: false,
  }));
}

export function useMemoryGame() {
  const [deck, setDeck] = useState(buildDeck);
  const [flipped, setFlipped] = useState([]);   // índices das cartas viradas
  const [moves, setMoves] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [locked, setLocked] = useState(false);   // bloqueia cliques durante animação

  const timerRef = useRef(null);

  // ── Timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (gameOver) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [gameOver]);

  // ── Lógica de virar carta ──────────────────────────────────────────────────
  const flipCard = useCallback(
    (index) => {
      if (locked || deck[index].flipped || deck[index].matched) return;

      const newFlipped = [...flipped, index];

      setDeck((prev) =>
        prev.map((c, i) => (i === index ? { ...c, flipped: true } : c))
      );
      setFlipped(newFlipped);

      if (newFlipped.length === 2) {
        setMoves((m) => m + 1);
        setLocked(true);

        const [a, b] = newFlipped;
        const cardA = deck[a];
        const cardB = deck[b];

        if (cardA.emoji === cardB.emoji) {
          // Par encontrado
          setDeck((prev) =>
            prev.map((c, i) =>
              i === a || i === b ? { ...c, matched: true, flipped: true } : c
            )
          );
          const newMatchedCount = matchedCount + 1;
          setMatchedCount(newMatchedCount);
          setFlipped([]);
          setLocked(false);

          if (newMatchedCount === CARD_PAIRS.length) {
            setGameOver(true);
          }
        } else {
          // Não é par — vira de volta após 900ms (IHC: feedback temporal previsível)
          setTimeout(() => {
            setDeck((prev) =>
              prev.map((c, i) =>
                i === a || i === b ? { ...c, flipped: false } : c
              )
            );
            setFlipped([]);
            setLocked(false);
          }, 900);
        }
      }
    },
    [deck, flipped, locked, matchedCount]
  );

  // ── Reiniciar jogo ─────────────────────────────────────────────────────────
  const restart = useCallback(() => {
    clearInterval(timerRef.current);
    setDeck(buildDeck());
    setFlipped([]);
    setMoves(0);
    setMatchedCount(0);
    setSeconds(0);
    setGameOver(false);
    setLocked(false);
  }, []);

  // ── Calcular estrelas (IHC: reforço positivo graduado) ────────────────────
  const stars = moves <= 12 ? 3 : moves <= 18 ? 2 : 1;

  return {
    deck,
    moves,
    matchedCount,
    totalPairs: CARD_PAIRS.length,
    seconds,
    gameOver,
    stars,
    flipCard,
    restart,
  };
}
