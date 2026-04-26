// PictureCard.jsx — Card de figura para comunicação aumentativa
// Props:
//   card     {object}   — { icon, label }
//   color    {string}   — cor de destaque da categoria ativa
//   onClick  {function} — adiciona à frase

export default function PictureCard({ card, color, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={`Adicionar ${card.label} à frase`}
      role="listitem"
      style={{
        background: "white",
        border: `2.5px solid ${color}33`,   // borda levemente colorida da categoria
        borderRadius: 16,
        padding: "12px 8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        cursor: "pointer",
        fontFamily: "'Nunito', sans-serif",
        transition: "transform 0.15s, box-shadow 0.15s, border-color 0.15s, background 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 8px 18px rgba(0,0,0,0.10)";
        e.currentTarget.style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = `${color}33`;
      }}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.94)")}
      onMouseUp={(e)   => (e.currentTarget.style.transform = "translateY(-3px)")}
      onFocus={(e) => (e.currentTarget.style.outline = "3px solid #FFD166")}
      onBlur={(e)  => (e.currentTarget.style.outline = "none")}
    >
      {/* Ícone grande — reconhecimento imediato sem depender de leitura */}
      <span aria-hidden="true" style={{ fontSize: 40 }}>{card.icon}</span>
      <span style={{ fontSize: 12, fontWeight: 800, color: "#1F2937", textAlign: "center", lineHeight: 1.2 }}>
        {card.label}
      </span>
    </button>
  );
}
