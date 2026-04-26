// SentenceBar.jsx — Área de exibição da frase montada com chips clicáveis
// Props:
//   sentence      {array}    — chips da frase [{ icon, label, color, key }]
//   isSpeaking    {boolean}  — se a voz está falando agora
//   onRemove      {function} — remove chip pelo índice
//   onSpeak       {function} — fala a frase
//   onClear       {function} — limpa tudo

export default function SentenceBar({ sentence, isSpeaking, onRemove, onSpeak, onClear }) {
  return (
    <div style={{
      background: "#FFFDF8",
      borderBottom: "3px solid #E5E7EB",
      padding: "14px 20px",
      minHeight: 100,
      display: "flex",
      flexDirection: "column",
      gap: 8,
    }}>
      {/* Rótulo */}
      <div style={{ fontSize: 11, fontWeight: 800, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.5px" }}>
        Minha frase
      </div>

      {/* Chips da frase — clique remove o item (IHC: reversibilidade) */}
      <div
        aria-live="polite"
        aria-label={sentence.length ? `Frase: ${sentence.map(s => s.label).join(" ")}` : "Frase vazia"}
        style={{ display: "flex", flexWrap: "wrap", gap: 8, minHeight: 44, alignItems: "center" }}
      >
        {sentence.length === 0 ? (
          <span style={{ fontSize: 14, color: "#9CA3AF", fontStyle: "italic" }}>
            Toque nas figuras para montar sua frase...
          </span>
        ) : (
          sentence.map((item, i) => (
            <button
              key={item.key}
              onClick={() => onRemove(i)}
              aria-label={`Remover ${item.label} da frase`}
              title="Toque para remover"
              style={{
                background: "white",
                border: `2.5px solid ${item.color}`,
                borderRadius: 14,
                padding: "7px 14px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 15,
                fontWeight: 800,
                color: "#1F2937",
                cursor: "pointer",
                fontFamily: "'Nunito', sans-serif",
                animation: "pop-in 0.2s ease",
                transition: "transform 0.12s, background 0.12s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#FFF0C2"; e.currentTarget.style.transform = "scale(0.95)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              <span aria-hidden="true" style={{ fontSize: 20 }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))
        )}
      </div>

      {/* Ações da frase */}
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <button
          onClick={onClear}
          disabled={sentence.length === 0}
          aria-label="Limpar frase"
          style={{
            background: "#F3F4F6",
            border: "2px solid #E5E7EB",
            borderRadius: 12,
            padding: "7px 14px",
            fontFamily: "'Nunito', sans-serif",
            fontSize: 13,
            fontWeight: 800,
            color: "#4B5563",
            cursor: sentence.length === 0 ? "default" : "pointer",
            opacity: sentence.length === 0 ? 0.5 : 1,
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => { if (sentence.length) e.currentTarget.style.background = "#E5E7EB"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#F3F4F6"; }}
        >
          🗑️ Limpar
        </button>

        {/* Botão de fala — principal CTA, destaque visual (IHC: hierarquia) */}
        <button
          onClick={onSpeak}
          disabled={sentence.length === 0 || isSpeaking}
          aria-label={isSpeaking ? "Falando..." : "Falar a frase em voz alta"}
          style={{
            background: isSpeaking ? "#639922" : "#BA7517",
            border: "none",
            borderRadius: 12,
            padding: "7px 18px",
            fontFamily: "'Nunito', sans-serif",
            fontSize: 14,
            fontWeight: 800,
            color: "white",
            cursor: sentence.length === 0 ? "default" : "pointer",
            opacity: sentence.length === 0 ? 0.5 : 1,
            transition: "background 0.2s",
            animation: isSpeaking ? "pulse 0.6s infinite alternate" : "none",
          }}
        >
          {isSpeaking ? "🔊 Falando..." : "🔊 Falar a frase"}
        </button>
      </div>
    </div>
  );
}
