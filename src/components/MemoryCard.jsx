// MemoryCard.jsx — Carta individual com animação de virar (flip 3D)
// Props:
//   card    {object}   — { emoji, label, flipped, matched }
//   onClick {function} — callback ao clicar na carta

export default function MemoryCard({ card, onClick }) {
  const { emoji, label, flipped, matched } = card;

  // Estado visual: normal → virada → par encontrado
  const borderColor = matched ? "#639922" : "#E8D8CC";
  const backBg      = matched ? "#EAF3DE" : "white";

  return (
    <button
      onClick={onClick}
      disabled={matched}                 // par encontrado: desabilita interação
      aria-label={
        matched
          ? `${label}, par encontrado`
          : flipped
          ? `${label}, virada`
          : "Carta virada para baixo, clique para revelar"
      }
      style={{
        aspectRatio: "1",
        background: "none",
        border: "none",
        padding: 0,
        cursor: matched ? "default" : "pointer",
        perspective: 600,               // necessário para o efeito 3D
      }}
    >
      {/* Container com transformação 3D */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.4s ease",
          transform: flipped || matched ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── Frente: carta fechada (IHC: padrão visual consistente) ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: 16,
            backfaceVisibility: "hidden",
            background: "#FFD166",
            border: "3px solid #F5A623",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            color: "#F5A623",
            opacity: 0.5,
          }}
        >
          ★
        </div>

        {/* ── Verso: carta aberta com emoji ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: 16,
            backfaceVisibility: "hidden",
            background: backBg,
            border: `3px solid ${borderColor}`,
            transform: "rotateY(180deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            transition: "background 0.3s, border-color 0.3s",
          }}
        >
          {emoji}
        </div>
      </div>
    </button>
  );
}
