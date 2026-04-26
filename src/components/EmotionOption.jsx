// EmotionOption.jsx — Botão de opção de emoção
// Props:
//   emotion    {string}  — nome da emoção (ex: "feliz")
//   icon       {string}  — emoji da emoção
//   status     {string}  — 'idle' | 'correct' | 'wrong'
//   disabled   {boolean} — bloqueia após resposta
//   onClick    {function}

export default function EmotionOption({ emotion, icon, status, disabled, onClick }) {
  const styles = {
    idle:    { bg: "white",    border: "#E8D8CC", color: "#3A3230" },
    correct: { bg: "#EAF3DE", border: "#639922", color: "#27500A" },
    wrong:   { bg: "#FCEBEB", border: "#E24B4A", color: "#791F1F" },
  };

  const s = styles[status] || styles.idle;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={`Opção: ${emotion}`}
      aria-pressed={status !== "idle"}
      style={{
        background: s.bg,
        border: `2.5px solid ${s.border}`,
        borderRadius: 18,
        padding: "14px 8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        cursor: disabled ? "default" : "pointer",
        fontFamily: "'Nunito', sans-serif",
        transition: "transform 0.12s, border-color 0.12s, background 0.12s",
        // Animação shake via CSS no index.css quando status='wrong'
        animation: status === "wrong" ? "shake 0.35s" : "none",
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.borderColor = "#D4537E";
          e.currentTarget.style.background = "#FBEAF0";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = s.border;
          e.currentTarget.style.background = s.bg;
        }
      }}
      onFocus={(e) => (e.currentTarget.style.outline = "4px solid #FFD166")}
      onBlur={(e)  => (e.currentTarget.style.outline = "none")}
    >
      <span aria-hidden="true" style={{ fontSize: 36 }}>{icon}</span>
      <span style={{ fontSize: 13, fontWeight: 800, color: s.color }}>
        {emotion}
      </span>
    </button>
  );
}
