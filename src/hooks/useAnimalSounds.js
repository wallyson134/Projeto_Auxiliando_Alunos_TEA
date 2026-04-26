// useAnimalSounds.js — Hook com lógica do jogo Sons dos Animais
// Usa Web Audio API para gerar sons sem precisar de arquivos externos

import { useState, useCallback, useRef } from "react";

// Banco de animais — cada um tem frequência e padrão de notas para o som
export const ANIMALS = [
  { id: "dog",   icon: "🐶", label: "Cachorro", sound: "Au au!",     freq: 880,  wave: "triangle", pattern: [0.15, 0.1, 0.15, 0.1] },
  { id: "cat",   icon: "🐱", label: "Gato",     sound: "Miau!",      freq: 660,  wave: "triangle", pattern: [0.4] },
  { id: "cow",   icon: "🐮", label: "Vaca",     sound: "Muuu!",      freq: 220,  wave: "sawtooth", pattern: [0.8] },
  { id: "frog",  icon: "🐸", label: "Sapo",     sound: "Croac!",     freq: 440,  wave: "triangle", pattern: [0.15, 0.15, 0.15] },
  { id: "duck",  icon: "🦆", label: "Pato",     sound: "Quac quac!", freq: 550,  wave: "triangle", pattern: [0.2, 0.2] },
  { id: "lion",  icon: "🦁", label: "Leão",     sound: "Roaaar!",    freq: 130,  wave: "sawtooth", pattern: [1.0] },
  { id: "bird",  icon: "🐦", label: "Pássaro",  sound: "Piu piu!",   freq: 1100, wave: "sine",     pattern: [0.1, 0.1, 0.1, 0.1] },
  { id: "horse", icon: "🐴", label: "Cavalo",   sound: "Hiiiim!",    freq: 370,  wave: "triangle", pattern: [0.6] },
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Gera 6 perguntas aleatórias com 3 opções cada
function buildQuestions() {
  return shuffle(ANIMALS)
    .slice(0, 6)
    .map((correct) => {
      const others = shuffle(ANIMALS.filter((a) => a.id !== correct.id)).slice(0, 2);
      return { correct, options: shuffle([correct, ...others]) };
    });
}

export function useAnimalSounds() {
  const [questions]   = useState(buildQuestions);
  const [current, setCurrent]       = useState(0);
  const [score, setScore]           = useState(0);
  const [answered, setAnswered]     = useState(false);
  const [lastResult, setLastResult] = useState(null);   // 'correct' | 'wrong' | null
  const [selectedId, setSelectedId] = useState(null);
  const [isPlaying, setIsPlaying]   = useState(false);
  const [gameOver, setGameOver]     = useState(false);

  const audioCtxRef = useRef(null);

  const totalQuestions  = questions.length;
  const progressPercent = Math.round((current / totalQuestions) * 100);
  const currentQuestion = questions[current];

  // ── Tocar som do animal via Web Audio API ────────────────────────────────
  const playSound = useCallback((animal) => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    setIsPlaying(true);

    let time = ctx.currentTime + 0.05;
    const totalDur = animal.pattern.reduce((acc, d) => acc + d + 0.08, 0);

    animal.pattern.forEach((dur) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = animal.wave;
      osc.frequency.setValueAtTime(animal.freq, time);

      // Vibrato leve — torna o som mais expressivo e reconhecível
      const lfo     = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 5;
      lfoGain.gain.value  = animal.freq * 0.03;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start(time);
      lfo.stop(time + dur);

      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.3, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

      osc.start(time);
      osc.stop(time + dur);
      time += dur + 0.08;
    });

    setTimeout(() => setIsPlaying(false), totalDur * 1000 + 200);
  }, []);

  // ── Responder ─────────────────────────────────────────────────────────────
  const answer = useCallback(
    (animalId) => {
      if (answered) return;
      setAnswered(true);
      setSelectedId(animalId);

      const isCorrect = animalId === currentQuestion.correct.id;
      setLastResult(isCorrect ? "correct" : "wrong");
      if (isCorrect) setScore((s) => s + 1);

      setTimeout(() => {
        const next = current + 1;
        if (next >= totalQuestions) {
          setGameOver(true);
        } else {
          setCurrent(next);
          setAnswered(false);
          setLastResult(null);
          setSelectedId(null);
        }
      }, 1600);
    },
    [answered, current, currentQuestion, totalQuestions]
  );

  // ── Reiniciar ─────────────────────────────────────────────────────────────
  // Nota: questions é gerado na inicialização — para embaralhar de novo
  // use navigate('/sounds') ou window.location.reload() no componente pai
  const restart = useCallback(() => {
    window.location.reload();
  }, []);

  const stars = score >= 5 ? 3 : score >= 3 ? 2 : 1;

  return {
    currentQuestion,
    current,
    totalQuestions,
    progressPercent,
    score,
    answered,
    lastResult,
    selectedId,
    isPlaying,
    gameOver,
    stars,
    playSound,
    answer,
    restart,
  };
}
