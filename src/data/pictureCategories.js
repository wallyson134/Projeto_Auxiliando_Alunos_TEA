// pictureCategories.js — Categorias e figuras do Fala com Figuras
// ─────────────────────────────────────────────────────────────────────────────
// 👇 ONDE ADICIONAR, EDITAR OU REMOVER CATEGORIAS E FIGURAS
//
// Para ADICIONAR uma categoria:
//   Copie um objeto do array e preencha:
//     id     — identificador único (string)
//     label  — nome exibido no botão de aba (com emoji na frente)
//     color  — cor principal (hex) usada na borda dos cards e chip ativo
//     bg     — cor de fundo suave para a aba ativa
//     cards  — array de { icon, label }
//
// Para ADICIONAR uma figura a uma categoria:
//   Adicione { icon: "🎯", label: "Nome" } no array cards da categoria desejada
//
// Para REMOVER: apague o objeto da categoria ou da lista de cards
// ─────────────────────────────────────────────────────────────────────────────

export const CATEGORIES = [
  {
    id: "needs",
    label: "🙋 Preciso",
    color: "#378ADD",
    bg: "#E6F1FB",
    cards: [
      { icon: "🚽", label: "Banheiro" },
      { icon: "💧", label: "Água"     },
      { icon: "🍎", label: "Comida"   },
      { icon: "😴", label: "Dormir"   },
      { icon: "🤒", label: "Remédio"  },
      { icon: "🤗", label: "Abraço"   },
      { icon: "🎮", label: "Brincar"  },
      { icon: "🏠", label: "Casa"     },
    ],
  },
  {
    id: "feel",
    label: "💛 Sinto",
    color: "#D4537E",
    bg: "#FBEAF0",
    cards: [
      { icon: "😄", label: "Feliz"      },
      { icon: "😢", label: "Triste"     },
      { icon: "😠", label: "Com raiva"  },
      { icon: "😨", label: "Com medo"   },
      { icon: "😴", label: "Cansado"    },
      { icon: "🤢", label: "Enjoado"    },
      { icon: "😊", label: "Bem"        },
      { icon: "🤩", label: "Animado"    },
    ],
  },
  {
    id: "places",
    label: "📍 Lugares",
    color: "#639922",
    bg: "#EAF3DE",
    cards: [
      { icon: "🏫", label: "Escola"      },
      { icon: "🏠", label: "Casa"        },
      { icon: "🏥", label: "Médico"      },
      { icon: "🛒", label: "Mercado"     },
      { icon: "🌳", label: "Parque"      },
      { icon: "🍽️", label: "Restaurante" },
      { icon: "🚗", label: "Carro"       },
      { icon: "🛁", label: "Banheiro"    },
    ],
  },
  {
    id: "people",
    label: "👥 Pessoas",
    color: "#BA7517",
    bg: "#FAEEDA",
    cards: [
      { icon: "👧",   label: "Eu"         },
      { icon: "👩",   label: "Mamãe"      },
      { icon: "👨",   label: "Papai"      },
      { icon: "👴",   label: "Vovô"       },
      { icon: "👵",   label: "Vovó"       },
      { icon: "👦",   label: "Amigo"      },
      { icon: "👩‍🏫", label: "Professora" },
      { icon: "🐕",   label: "Pet"        },
    ],
  },
  {
    id: "actions",
    label: "⚡ Ações",
    color: "#534AB7",
    bg: "#EEEDFE",
    cards: [
      { icon: "🍽️", label: "Comer"    },
      { icon: "💧", label: "Beber"    },
      { icon: "🎨", label: "Desenhar" },
      { icon: "📚", label: "Ler"      },
      { icon: "🎵", label: "Música"   },
      { icon: "🚶", label: "Ir"       },
      { icon: "✋", label: "Parar"    },
      { icon: "👍", label: "Sim"      },
    ],
  },
];
