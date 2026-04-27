// useMemoryGame.js — v2 com feedback de acerto/erro e som via Web Audio API

import { useState, useEffect, useCallback, useRef } from "react";

export const CARD_PAIRS = [
  { emoji: "🐶", label: "cachorro" },
  { emoji: "🐱", label: "gato"     },
  { emoji: "🐸", label: "sapo"     },
  { emoji: "🦁", label: "leão"     },
  { emoji: "🐧", label: "pinguim"  },
  { emoji: "🦊", label: "raposa"   },
  { emoji: "🐻", label: "urso"     },
  { emoji: "🐮", label: "vaca"     },
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildDeck() {
  return shuffle(
    CARD_PAIRS.flatMap((card, i) => [
      { id: `${i}-a`, ...card, flipped: false, matched: false },
      { id: `${i}-b`, ...card, flipped: false, matched: false },
    ])
  );
}

// Som leve via Web Audio — sem arquivo externo
function playTone(freq, dur, type = "sine") {
  try {
    const ctx  = new (window.AudioContext || window.webkitAudioContext)();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
    osc.start();
    osc.stop(ctx.currentTime + dur);
  } catch (_) {}
}

export function useMemoryGame() {
  const [deck, setDeck]             = useState(buildDeck);
  const [flipped, setFlipped]       = useState([]);       // índices virados
  const [wrongIndexes, setWrong]    = useState([]);       // índices com erro temporário
  const [moves, setMoves]           = useState(0);
  const [matchedCount, setMatched]  = useState(0);
  const [seconds, setSeconds]       = useState(0);
  const [gameOver, setGameOver]     = useState(false);
  const [locked, setLocked]         = useState(false);
  const [feedback, setFeedback]     = useState({ msg: "", type: "" });

  const timerRef = useRef(null);

  useEffect(() => {
    if (gameOver) { clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [gameOver]);

  const showFeedback = useCallback((msg, type) => {
    setFeedback({ msg, type });
    setTimeout(() => setFeedback({ msg: "", type: "" }), 1200);
  }, []);

  const flipCard = useCallback((index) => {
    if (locked || deck[index].flipped || deck[index].matched) return;

    const newFlipped = [...flipped, index];
    setDeck((prev) => prev.map((c, i) => i === index ? { ...c, flipped: true } : c));
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setLocked(true);
      const [a, b] = newFlipped;

      if (deck[a].emoji === deck[b].emoji) {
        // ✅ Acerto
        setTimeout(() => {
          setDeck((prev) => prev.map((c, i) =>
            i === a || i === b ? { ...c, matched: true, flipped: true } : c
          ));
          const next = matchedCount + 1;
          setMatched(next);
          setFlipped([]);
          setLocked(false);
          showFeedback("✓ Par encontrado! 🎉", "ok");
          playTone(880, 0.15);
          setTimeout(() => playTone(1100, 0.15), 160);
          if (next === CARD_PAIRS.length) setGameOver(true);
        }, 200);
      } else {
        // ❌ Erro — feedback visual + sonoro + volta carta após 900ms
        setWrong([a, b]);
        showFeedback("Ops! Tente de novo 😊", "err");
        playTone(220, 0.3, "sawtooth");
        setTimeout(() => {
          setDeck((prev) => prev.map((c, i) =>
            i === a || i === b ? { ...c, flipped: false } : c
          ));
          setWrong([]);
          setFlipped([]);
          setLocked(false);
        }, 900);
      }
    }
  }, [deck, flipped, locked, matchedCount, showFeedback]);

  const restart = useCallback(() => {
    clearInterval(timerRef.current);
    setDeck(buildDeck());
    setFlipped([]);
    setWrong([]);
    setMoves(0);
    setMatched(0);
    setSeconds(0);
    setGameOver(false);
    setLocked(false);
    setFeedback({ msg: "", type: "" });
  }, []);

  const stars         = moves <= 12 ? 3 : moves <= 18 ? 2 : 1;
  const progressPercent = Math.round((matchedCount / CARD_PAIRS.length) * 100);

  return {
    deck, moves, matchedCount,
    totalPairs: CARD_PAIRS.length,
    seconds, gameOver, stars,
    progressPercent, wrongIndexes,
    feedback, flipCard, restart,
  };
}
