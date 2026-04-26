// SensoryToggle.jsx — Botão de modo baixo estímulo (diferencial para TEA)
// Quando ativo: remove animações, reduz saturação de cores, simplifica o visual
// Props:
//   active   {boolean}  — estado atual do modo
//   onToggle {function} — callback ao alternar

export default function SensoryToggle({ active, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={active}
      aria-label={active ? "Desativar modo baixo estímulo" : "Ativar modo baixo estímulo"}
      title={active ? "Modo calmo ativo" : "Ativar modo calmo"}
      style={{
        background: active ? "#F3F4F6" : "#FFF0C2",
        border: `2px solid ${active ? "#D1D5DB" : "#FFD166"}`,
        borderRadius: 12,
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: 18,
        transition: "background 0.2s, border-color 0.2s",
        flexShrink: 0,
      }}
    >
      {active ? "🔇" : "✨"}
    </button>
  );
}
