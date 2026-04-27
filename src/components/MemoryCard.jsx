// MemoryCard.jsx — v4
// O que mudou vs v3:
//  - Carta fechada: fundo amarelo FORTE + borda grossa escura + sombra física
//    que simula um botão real ("TOQUE") → grita CLIQUE EM MIM
//  - Hover: sobe 4px + brilha + box-shadow aumenta → feedback imediato
//  - Press: afunda 2px + sombra diminui → sensação tátil real
//  - Acerto: fundo verde FORTE (#DCFCE7) + borda verde + sombra verde
//    + badge ✓ animado no canto (badge-pop)
//  - Erro: fundo vermelho FORTE (#FEE2E2) + borda vermelha + shake
//  - Animação de entrada: card-enter com rotate leve — parece "cair no lugar"
//  - Label "TOQUE" embaixo da estrela — instrução direta para TEA

export default function MemoryCard({ card, isWrong, onClick, enterDelay = 0 }) {
  const { emoji, label, flipped, matched } = card;

  return (
    <div
      role="listitem"
      tabIndex={matched ? -1 : 0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick()}
      aria-label={
        matched ? `${label}, par encontrado!` :
        flipped  ? `${label}, virada`          :
                   "Carta fechada, clique para revelar"
      }
      onFocus={(e) => { if (!matched) e.currentTarget.style.outline = "3px solid #FFD166"; }}
      onBlur={(e)  => (e.currentTarget.style.outline = "none")}
      style={{
        aspectRatio: "1",
        cursor: matched ? "default" : "pointer",
        perspective: 700,
        outline: "none",
        position: "relative",
        // Entrada animada: cada carta cai com leve rotação (TEA gosta de movimento suave)
        animation: `card-enter 0.3s ease ${enterDelay}s both`,
      }}
    >
      {/* Container 3D */}
      <div style={{
        width: "100%", height: "100%",
        transformStyle: "preserve-3d",
        transition: "transform 0.42s cubic-bezier(.4,0,.2,1)",
        transform: (flipped || matched) ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>

        {/* ── FRENTE: carta fechada — peso visual FORTE ── */}
        <div
          aria-hidden="true"
          className="card-front-face"
          style={{
            position: "absolute", width: "100%", height: "100%",
            borderRadius: "18px",
            backfaceVisibility: "hidden",
            background: "#FFD166",
            // Borda escura grossa — delimita bem o objeto
            border: "3px solid #B45309",
            // Sombra física — parece um botão real para pressionar
            boxShadow: "0 5px 0 #8B3A00",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 4,
          }}
        >
          {/* Estrela grande — símbolo de mistério atraente */}
          <span aria-hidden="true" style={{
            fontSize: "clamp(22px, 5vw, 32px)",
            opacity: 0.65,
            color: "#7C4A00",
          }}>★</span>
          {/* Label de instrução — clareza máxima para TEA */}
          <span style={{
            fontSize: 10,
            fontWeight: 800,
            color: "#7C4A00",
            opacity: 0.8,
            letterSpacing: "0.5px",
          }}>TOQUE</span>
        </div>

        {/* ── VERSO: carta aberta ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute", width: "100%", height: "100%",
            borderRadius: "18px",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "clamp(26px, 6vw, 42px)",
            // Estado visual muda imediatamente ao acertar/errar
            background: matched ? "#DCFCE7" : isWrong ? "#FEE2E2" : "white",
            border: `3px solid ${matched ? "#16A34A" : isWrong ? "#DC2626" : "#D1D5DB"}`,
            boxShadow: matched
              ? "0 3px 0 #15803D"
              : isWrong
              ? "0 3px 0 #B91C1C"
              : "0 3px 0 #9CA3AF",
            transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
            animation: matched
              ? "pop-correct 0.35s ease"
              : isWrong
              ? "shake 0.38s ease"
              : "none",
          }}
        >
          {emoji}
        </div>
      </div>

      {/* Badge ✓ no canto — confirmação visual imediata de acerto */}
      {matched && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -8, right: -8,
            width: 24, height: 24,
            background: "#16A34A",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, color: "white", fontWeight: 800,
            border: "2px solid white",
            animation: "badge-pop 0.3s ease",
            zIndex: 2,
          }}
        >✓</div>
      )}
    </div>
  );
}
