// useEmotions.js — Hook com toda a lógica do jogo Como me Sinto
// A criança lê uma situação, vê um rosto e escolhe a emoção correta

import { useState, useCallback } from "react";

export const EMOTION_ICONS = {
  feliz:         "😄",
  triste:        "😢",
  "com raiva":   "😠",
  "com medo":    "😨",
  surpreso:      "😲",
  envergonhado:  "😔",
};

// Banco de perguntas — situações do cotidiano da criança
export const QUESTIONS = [
  {
    face:    "😄",
    correct: "feliz",
    scene:   "A Ana ganhou um presente de aniversário!",
    options: ["feliz", "triste", "com medo"],
  },
  {
    face:    "😢",
    correct: "triste",
    scene:   "O bichinho de estimação do João fugiu.",
    options: ["surpreso", "triste", "feliz"],
  },
  {
    face:    "😠",
    correct: "com raiva",
    scene:   "A Maria não conseguiu brincar porque estava de castigo.",
    options: ["com raiva", "feliz", "envergonhado"],
  },
  {
    face:    "😨",
    correct: "com medo",
    scene:   "O Pedro ouviu um barulho muito alto à noite.",
    options: ["com medo", "feliz", "com raiva"],
  },
  {
    face:    "😲",
    correct: "surpreso",
    scene:   "A turma preparou uma festa surpresa para a Luísa!",
    options: ["triste", "surpreso", "com medo"],
  },
  {
    face:    "😔",
    correct: "envergonhado",
    scene:   "O Tiago caiu na frente de todo mundo na escola.",
    options: ["feliz", "com raiva", "envergonhado"],
  },
];

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function useEmotions() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore]               = useState(0);
  const [answered, setAnswered]         = useState(false);    // bloqueia duplo clique
  const [lastResult, setLastResult]     = useState(null);     // 'correct' | 'wrong' | null
  const [selectedOption, setSelectedOption] = useState(null); // opção clicada
  const [gameOver, setGameOver]         = useState(false);

  const totalQuestions = QUESTIONS.length;
  const progressPercent = Math.round((currentIndex / totalQuestions) * 100);

  // Opções da pergunta atual — embaralhadas
  const currentQuestion = QUESTIONS[currentIndex];
  const [shuffledOptions] = useState(() =>
    QUESTIONS.map((q) => shuffle(q.options))
  );

  // ── Responder ─────────────────────────────────────────────────────────────
  const answer = useCallback(
    (option) => {
      if (answered) return;
      setAnswered(true);
      setSelectedOption(option);

      const isCorrect = option === currentQuestion.correct;
      setLastResult(isCorrect ? "correct" : "wrong");
      if (isCorrect) setScore((s) => s + 1);

      // Avança para a próxima pergunta após 1400ms (feedback visual)
      setTimeout(() => {
        const next = currentIndex + 1;
        if (next >= totalQuestions) {
          setGameOver(true);
        } else {
          setCurrentIndex(next);
          setAnswered(false);
          setLastResult(null);
          setSelectedOption(null);
        }
      }, 1400);
    },
    [answered, currentIndex, currentQuestion, totalQuestions]
  );

  // ── Reiniciar ─────────────────────────────────────────────────────────────
  const restart = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setAnswered(false);
    setLastResult(null);
    setSelectedOption(null);
    setGameOver(false);
  }, []);

  // Estrelas baseadas no desempenho
  const stars = score >= 5 ? 3 : score >= 3 ? 2 : 1;

  return {
    currentIndex,
    currentQuestion,
    shuffledOptions: shuffledOptions[currentIndex],
    score,
    totalQuestions,
    progressPercent,
    answered,
    lastResult,
    selectedOption,
    gameOver,
    stars,
    answer,
    restart,
  };
}
