// activities.js — Dados estáticos das atividades lúdicas
// Mova para um contexto/API quando o app crescer

export const ACTIVITIES = [
  {
    id: "memory",
    icon: "🃏",
    label: "Jogo da Memória",
    desc: "Encontre os pares iguais",
    stars: 2,
    color: { bg: "#E8F4FD", border: "#A8D5F5", borderHover: "#378ADD" },
  },
  {
    id: "sequence",
    icon: "📅",
    label: "Minha Rotina",
    desc: "Monte a sequência do dia",
    stars: 1,
    color: { bg: "#EAF3DE", border: "#C0DD97", borderHover: "#639922" },
  },
  {
    id: "comm",
    icon: "🖼️",
    label: "Fala com Figuras",
    desc: "Comunique com imagens",
    stars: 0,
    isNew: true,
    color: { bg: "#FAEEDA", border: "#FAC775", borderHover: "#BA7517" },
  },
  {
    id: "social",
    icon: "😊",
    label: "Como me Sinto",
    desc: "Reconheça as emoções",
    stars: 0,
    color: { bg: "#FBEAF0", border: "#F4C0D1", borderHover: "#D4537E" },
  },
  {
  id: "sounds",
  icon: "🔊",
  label: "Sons dos Animais",
  desc: "Ouça e descubra o animal",
  stars: 0,
  isNew: true,
  color: { bg: "#E6F1FB", border: "#B5D4F4", borderHover: "#185FA5" },
  },
  {
  id: "shapes",
  icon: "🔷",
  label: "Encaixe as Formas",
  desc: "Encaixe cada forma no lugar certo",
  stars: 0,
  isNew: true,
  color: { bg: "#EEEDFE", border: "#AFA9EC", borderHover: "#534AB7" },
},
];
