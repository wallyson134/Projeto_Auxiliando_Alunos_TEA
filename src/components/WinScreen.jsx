// WinScreen.jsx — Tela de vitória com estrelas, elogio graduado e botão destacado
// Props:
//   moves    {number}   — total de jogadas
//   seconds  {number}   — tempo em segundos
//   stars    {number}   — 1 | 2 | 3
//   onReplay {function} — jogar de novo

function formatTime(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

const MESSAGES = {
  3: "Incrível! Pouquíssimas jogadas! 🌟",
  2: "Muito bem! Continue assim! 😊",
  1: "Você conseguiu! Tente superar! 💪",
};

export default function WinScreen({ moves, seconds, stars, onReplay }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Parabéns, você venceu!"
      style={{
        position: "absolute",
        top: 0, left: 0, width: "100%", height: "100%",
        background: "rgba(255,249,240,0.97)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        zIndex: 10,
      }}
    >
      {/* Ícone animado */}
      <div aria-hidden="true" style={{ fontSize: 72, animation: "bounce 0.6s ease" }}>
        🎉
      </div>

      <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1F2937", margin: 0 }}>
        Muito bem!
      </h2>

      {/* Estrelas — cada uma aparece com delay crescente */}
      <div
        role="img"
        aria-label={`${stars} estrelas de 3`}
        style={{ display: "flex", gap: 10 }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: 36,
              height: 36,
              background: i <= stars ? "#FFD166" : "#E5E7EB",
              clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
              animation: i <= stars ? `pop-correct 0.4s ease ${i * 0.12}s both` : "none",
            }}
          />
        ))}
      </div>

      {/* Mensagem graduada por desempenho */}
      <p style={{ fontSize: 15, color: "#4B5563", textAlign: "center", maxWidth: 260, lineHeight: 1.6, margin: 0 }}>
        {MESSAGES[stars]}
      </p>

      <p style={{ fontSize: 13, color: "#6B7280", margin: 0, fontWeight: 700 }}>
        {moves} jogadas · {formatTime(seconds)}
      </p>

      {/* Botão de destaque com sombra — não se perde na tela */}
      <button
        onClick={onReplay}
        autoFocus
        style={{
          marginTop: 4,
          background: "#FFD166",
          border: "none",
          borderRadius: 16,
          padding: "14px 36px",
          fontFamily: "'Nunito', sans-serif",
          fontSize: 17,
          fontWeight: 800,
          color: "#1F2937",
          cursor: "pointer",
          transition: "background 0.15s, transform 0.12s",
          boxShadow: "0 4px 0 #B45309",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "#FFC233"; e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "#FFD166"; e.currentTarget.style.transform = "translateY(0)"; }}
        onMouseDown={(e)  => { e.currentTarget.style.transform = "translateY(1px)"; e.currentTarget.style.boxShadow = "0 2px 0 #B45309"; }}
        onMouseUp={(e)    => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 0 #B45309"; }}
      >
        Jogar de novo! 🎮
      </button>
    </div>
  );
}
