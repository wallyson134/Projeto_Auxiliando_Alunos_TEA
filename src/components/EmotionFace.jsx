// EmotionFace.jsx — Rosto com emoção exibido na pergunta
// Aparece com 600ms de delay para dar tempo da criança ler a situação primeiro
// Props:
//   face      {string} — emoji do rosto
//   status    {string} — 'idle' | 'correct' | 'wrong'

import { useState, useEffect } from "react";

export default function EmotionFace({ face, status }) {
  // Delay de reveal — criança lê a situação antes de ver o rosto (IHC: carga cognitiva)
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, [face]);

  const borderColor =
    status === "correct" ? "#639922" :
    status === "wrong"   ? "#E24B4A" :
    "#F4C0D1";

  const bgColor =
    status === "correct" ? "#EAF3DE" :
    status === "wrong"   ? "#FCEBEB" :
    "white";

  return (
    <div
      aria-label={visible ? `Rosto: ${face}` : "Rosto sendo revelado"}
      aria-live="polite"
      style={{
        width: 140,
        height: 140,
        borderRadius: 24,
        background: bgColor,
        border: `3px solid ${borderColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 88,
        transition: "background 0.3s, border-color 0.3s",
        animation: status === "wrong" ? "shake 0.35s" : "none",
      }}
    >
      {visible ? face : "😶"}
    </div>
  );
}
