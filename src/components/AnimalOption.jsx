// AnimalOption.jsx — Botão de opção de animal com ícone grande
// Props:
//   animal     {object}  — { id, icon, label }
//   status     {string}  — 'idle' | 'correct' | 'wrong'
//   disabled   {boolean} — bloqueia após resposta
//   onClick    {function}

export default function AnimalOption({ animal, status, disabled, onClick }) {
  const styles = {
    idle:    { bg: "white",    border: "#E5E7EB" },
    correct: { bg: "#EAF3DE", border: "#16A34A" },
    wrong:   { bg: "#FCEBEB", border: "#DC2626" },
  };

  const s = styles[status] || styles.idle;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={`${animal.label}${status === "correct" ? ", correto!" : status === "wrong" ? ", incorreto" : ""}`}
      style={{
        background: s.bg,
        border: `2.5px solid ${s.border}`,
        borderRadius: 18,
        padding: "16px 8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        cursor: disabled ? "default" : "pointer",
        fontFamily: "'Nunito', sans-serif",
        transition: "transform 0.15s, box-shadow 0.15s, border-color 0.15s",
        animation:
          status === "correct" ? "pop 0.3s ease" :
          status === "wrong"   ? "shake 0.35s"   : "none",
        opacity: disabled && status === "idle" ? 0.4 : 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.10)";
          e.currentTarget.style.borderColor = "#378ADD";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.borderColor = s.border;
        }
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.96)"; }}
      onMouseUp={(e)   => { if (!disabled) e.currentTarget.style.transform = "translateY(-4px)"; }}
      onFocus={(e) => (e.currentTarget.style.outline = "3px solid #FFD166")}
      onBlur={(e)  => (e.currentTarget.style.outline = "none")}
    >
      {/* Ícone grande — reconhecimento visual imediato para TEA */}
      <span aria-hidden="true" style={{ fontSize: 44 }}>{animal.icon}</span>
      <span style={{ fontSize: 13, fontWeight: 800, color: "#1F2937" }}>
        {animal.label}
      </span>
    </button>
  );
}
