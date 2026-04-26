// PlaySoundButton.jsx — Botão grande de reprodução do som do animal
// Props:
//   isPlaying {boolean}  — se o som está tocando agora
//   soundWord {string}   — representação escrita do som (ex: "Au au!")
//   onClick   {function} — tocar o som

export default function PlaySoundButton({ isPlaying, soundWord, onClick }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      {/* Botão grande e redondo — área de toque clara (IHC: alvos generosos) */}
      <button
        onClick={onClick}
        aria-label={isPlaying ? "Tocando o som..." : "Toque para ouvir o som do animal"}
        style={{
          width: 110,
          height: 110,
          borderRadius: "50%",
          background: isPlaying ? "#16A34A" : "#378ADD",
          border: `4px solid ${isPlaying ? "#14532D" : "#185FA5"}`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          cursor: "pointer",
          transition: "background 0.2s, transform 0.15s",
          transform: isPlaying ? "scale(1.06)" : "scale(1)",
          animation: isPlaying ? "pulse 0.6s infinite alternate" : "none",
          fontFamily: "'Nunito', sans-serif",
        }}
        onMouseEnter={(e) => { if (!isPlaying) e.currentTarget.style.background = "#185FA5"; }}
        onMouseLeave={(e) => { if (!isPlaying) e.currentTarget.style.background = "#378ADD"; }}
      >
        <span aria-hidden="true" style={{ fontSize: 36, color: "white" }}>
          {isPlaying ? "🔊" : "▶"}
        </span>
        <span style={{ fontSize: 12, fontWeight: 800, color: "white" }}>
          {isPlaying ? "Tocando..." : "Ouvir som"}
        </span>
      </button>

      {/* Representação escrita do som — reforço textual (IHC: multimodalidade) */}
      <div
        aria-live="polite"
        style={{
          fontSize: 22,
          fontWeight: 800,
          color: "#1F2937",
          letterSpacing: 1,
          background: "#E6F1FB",
          border: "2px solid #B5D4F4",
          borderRadius: 14,
          padding: "10px 24px",
        }}
      >
        {soundWord}
      </div>
    </div>
  );
}
