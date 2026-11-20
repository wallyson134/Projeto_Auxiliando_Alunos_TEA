// achievements.js — Definição das conquistas
// ─────────────────────────────────────────────────────────────────────────────
// 👇 PARA ADICIONAR UMA CONQUISTA, copie um objeto e ajuste:
//   id     — identificador único
//   icon   — emoji
//   title  — nome curto
//   desc   — o que a criança precisa fazer (linguagem simples)
//   check  — função que recebe `stats` e retorna true quando desbloqueada
//
// `stats` (calculado em ProgressContext) contém:
//   totalPlays, totalStars, perfectCount, playedCount,
//   totalActivities, doneToday
// ─────────────────────────────────────────────────────────────────────────────
export const ACHIEVEMENTS = [
  { id: "first",     icon: "🌱", title: "Primeiro passo",   desc: "Termine sua primeira atividade",        check: (s) => s.totalPlays >= 1 },
  { id: "perfect",   icon: "🌟", title: "Estrela perfeita", desc: "Ganhe 3 estrelas em uma atividade",     check: (s) => s.perfectCount >= 1 },
  { id: "explorer",  icon: "🧭", title: "Explorador",       desc: "Jogue todas as atividades",             check: (s) => s.playedCount >= s.totalActivities },
  { id: "daily",     icon: "☀️", title: "Dia completo",     desc: "Jogue todas as atividades no mesmo dia", check: (s) => s.doneToday >= s.totalActivities },
  { id: "persist",   icon: "💪", title: "Persistente",      desc: "Termine 10 partidas",                   check: (s) => s.totalPlays >= 10 },
  { id: "collector", icon: "🏆", title: "Colecionador",     desc: "Junte 10 estrelas",                     check: (s) => s.totalStars >= 10 },
];