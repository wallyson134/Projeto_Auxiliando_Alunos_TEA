// WinScreen.jsx — Tela de vitória exibida ao completar o jogo
// Props:
//   moves   {number}   — total de jogadas
//   seconds {number}   — tempo total em segundos
//   stars   {number}   — estrelas conquistadas (1–3)
//   onReplay {function} — callback para jogar de novo

function formatTime(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

const STAR_MESSAGES = {
  3: "Incrível! Você usou pouquíssimas jogadas! 🌟",
  2: "Muito bem! Continue praticando! 😊",
  1: "Você conseguiu! Tente superar seu recorde! 💪",
};

export default function WinScreen({ moves, seconds, stars, onReplay }) {
  return (
    // Overlay de vitória — cobre o tabuleiro (IHC: feedback claro de conclusão)
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Parabéns, você venceu!"
      style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%", height: "100%",
        background: "rgba(255,249,240,0.96)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        zIndex: 10,
        borderRadius: 0,
      }}
    >
      <div aria-hidden="true" style={{ fontSize: 64 }}>🎉</div>

      <h2 style={{ fontSize: 26, fontWeight: 800, color: "#3A3230", margin: 0 }}>
        Muito bem!
      </h2>

      {/* Estrelas de desempenho (IHC: reforço positivo visual e graduado) */}
      <div
        role="img"
        aria-label={`${stars} estrelas de 3`}
        style={{ display: "flex", gap: 8 }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              width: 32,
              height: 32,
              background: i <= stars ? "#FFD166" : "#E8E0D4",
              clipPath:
                "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>

      <p style={{ fontSize: 15, color: "#6B5E54", textAlign: "center", lineHeight: 1.5, maxWidth: 260 }}>
        {STAR_MESSAGES[stars]}
      </p>

      <p style={{ fontSize: 13, color: "#8A7F78", fontWeight: 700 }}>
        {moves} jogadas · {formatTime(seconds)}
      </p>

      <button
        onClick={onReplay}
        autoFocus       // foco automático para acessibilidade com teclado
        style={{
          marginTop: 8,
          background: "#FFD166",
          border: "none",
          borderRadius: 16,
          padding: "14px 32px",
          fontFamily: "'Nunito', sans-serif",
          fontSize: 16,
          fontWeight: 800,
          color: "#3A3230",
          cursor: "pointer",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#FFC233")}
        onMouseLeave={(e) => (e.target.style.background = "#FFD166")}
      >
        Jogar de novo! 🎮
      </button>
    </div>
  );
}
