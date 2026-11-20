// Settings.jsx — Tela "Config."
// Nome e avatar da criança. Salva na hora (localStorage via ProgressContext).

import { useState } from "react";
import PageShell from "../components/PageShell";
import { useProgress } from "../context/ProgressContext";

const AVATARS = ["👧", "👦", "🧒", "👶", "🐶", "🐱", "🦊", "🐻", "🦁", "🐼", "🐸", "🦄"];
const DEFAULT_NAME = "Amigo";

export default function Settings() {
  const { profile, setProfile } = useProgress();
  const [name, setName] = useState(profile.name);

  function handleChange(e) {
    const value = e.target.value;
    setName(value);
    if (value.trim()) setProfile({ name: value.trim() });
  }

  // Nome vazio nunca fica salvo: volta ao nome atual (ou padrão)
  function handleBlur() {
    if (!name.trim()) {
      setProfile({ name: DEFAULT_NAME });
      setName(DEFAULT_NAME);
    }
  }

  return (
    <PageShell icon="⚙️" title="Configurações" subtitle="Deixe o app com a sua cara!" accent="#C4B5FD">

      {/* Prévia */}
      <div aria-live="polite" style={{ display: "flex", alignItems: "center", gap: 14, background: "linear-gradient(135deg, #FFF0C2, #FFE4B8)", border: "2px solid #FFD166", borderRadius: 18, padding: 16 }}>
        <div aria-hidden="true" style={{ width: 64, height: 64, borderRadius: "50%", background: "white", border: "3px solid #FFD166", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, flexShrink: 0 }}>
          {profile.avatar}
        </div>
        <div>
          <div style={{ fontSize: 13, color: "#4B5563", fontWeight: 700 }}>Olá,</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{profile.name}! 👋</div>
        </div>
      </div>

      {/* Nome */}
      <section>
        <label htmlFor="nome" style={{ display: "block", fontSize: 14, fontWeight: 800, marginBottom: 6 }}>
          Qual é o seu nome?
        </label>
        <input
          id="nome" type="text" value={name} maxLength={14}
          onChange={handleChange} onBlur={handleBlur}
          autoComplete="off"
          style={{ width: "100%", fontFamily: "'Nunito', sans-serif", fontSize: 18, fontWeight: 700, color: "#1F2937", background: "white", border: "3px solid #E5E7EB", borderRadius: 14, padding: "12px 14px", outline: "none" }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#FFD166")}
          onBlurCapture={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}
        />
      </section>

      {/* Avatar */}
      <section aria-labelledby="avatar-titulo">
        <h2 id="avatar-titulo" style={{ fontSize: 14, fontWeight: 800, margin: "0 0 8px" }}>Escolha seu avatar</h2>
        <div role="radiogroup" aria-labelledby="avatar-titulo" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {AVATARS.map((emoji) => {
            const selected = profile.avatar === emoji;
            return (
              <button key={emoji} role="radio" aria-checked={selected} aria-label={`Avatar ${emoji}`}
                onClick={() => setProfile({ avatar: emoji })}
                style={{
                  aspectRatio: "1", fontSize: 32, cursor: "pointer", borderRadius: 18,
                  background: selected ? "#FFF9E6" : "white",
                  border: `3px solid ${selected ? "#E6A800" : "#E5E7EB"}`,
                  boxShadow: selected ? "0 4px 0 #B45309" : "0 3px 0 #D1D5DB",
                  transform: selected ? "translateY(-2px) scale(1.05)" : "none",
                  transition: "transform 0.15s, box-shadow 0.15s, border-color 0.15s",
                }}
                onFocus={(e) => (e.currentTarget.style.outline = "3px solid #FFD166")}
                onBlur={(e)  => (e.currentTarget.style.outline = "none")}
              >
                <span aria-hidden="true">{emoji}</span>
              </button>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
