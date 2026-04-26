// Home.jsx — Tela inicial refatorada com melhorias de IHC/UX:
//  1. Header compacto — não empurra conteúdo útil para baixo
//  2. Contraste elevado — texto #1F2937, bordas #E5E7EB visíveis
//  3. Cards claramente clicáveis — hover forte, sombra, press feedback
//  4. Foco visual principal — primeiro card destacado com badge
//  5. Navegação com item ativo de alto contraste
//  6. Modo baixo estímulo — diferencial para TEA
//  7. Avatar e nome mais integrados no header

import { useState, useEffect } from "react";
import { useNavigate }   from "react-router-dom";
import ActivityCard      from "./ActivityCard";
import NavBar            from "./NavBar";
import SensoryToggle     from "./SensoryToggle";
import { ACTIVITIES }    from "../data/activities";

export default function Home() {
  const navigate  = useNavigate();
  const [activeNav, setActiveNav]     = useState("home");
  const [lowStimulus, setLowStimulus] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("low-stimulus", lowStimulus);
    return () => document.body.classList.remove("low-stimulus");
  }, [lowStimulus]);

  const user = {
    name: "Ana", avatar: "👧",
    activitiesDone: 3, activitiesTotal: 5,
  };
  const progressPercent = Math.round((user.activitiesDone / user.activitiesTotal) * 100);

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#FFF9F0", minHeight: "100vh", display: "flex", flexDirection: "column", color: "#1F2937" }}>

      {/* ── Header compacto ── */}
      <header role="banner" style={{ background: "#FFFDF8", borderBottom: "2px solid #E5E7EB", padding: "10px 20px", display: "flex", alignItems: "center", gap: 10 }}>
        <div aria-hidden="true" style={{ width: 40, height: 40, background: "#FFD166", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🌟</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: "#1F2937", lineHeight: 1.1 }}>MundoLúdico</div>
          <div style={{ fontSize: 11, color: "#6B7280" }}>Aprender brincando</div>
        </div>
        <SensoryToggle active={lowStimulus} onToggle={() => setLowStimulus(v => !v)} />
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#F3F4F6", border: "2px solid #E5E7EB", borderRadius: 40, padding: "5px 12px 5px 6px", cursor: "pointer" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#FFF0C2", border: "2px solid #FFD166", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{user.avatar}</div>
          <span style={{ fontSize: 13, fontWeight: 800, color: "#1F2937" }}>{user.name}</span>
        </div>
      </header>

      {/* ── Boas-vindas compactas + progresso ── */}
      <section role="region" aria-label="Boas-vindas e progresso" style={{ background: "linear-gradient(135deg, #FFF0C2 0%, #FFE4B8 100%)", padding: "16px 20px", borderBottom: "2px solid #E5E7EB" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#1F2937", margin: 0 }}>
              Olá, <span style={{ color: "#E07B39" }}>{user.name}!</span> 👋
            </h1>
            <p style={{ fontSize: 13, color: "#4B5563", margin: 0 }}>O que vamos aprender hoje?</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#E07B39" }}>{user.activitiesDone}</div>
            <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 700 }}>de {user.activitiesTotal} hoje</div>
          </div>
        </div>
        <div
          role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}
          aria-label={`${user.activitiesDone} de ${user.activitiesTotal} atividades concluídas`}
          style={{ background: "#F5D97A", borderRadius: 30, height: 16, border: "1.5px solid #E6A800", overflow: "hidden" }}
        >
          <div style={{ background: "#E07B39", height: "100%", borderRadius: 30, width: `${progressPercent}%`, transition: "width 0.6s ease", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: "white" }}>{progressPercent}%</span>
          </div>
        </div>
      </section>

      {/* ── Grade de atividades ── */}
      <main role="main" style={{ flex: 1, padding: "16px 20px" }}>
        <h2 id="atividades-titulo" style={{ fontSize: 13, fontWeight: 800, color: "#6B7280", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.5px" }}>
          Escolha uma atividade
        </h2>
        <div role="list" aria-labelledby="atividades-titulo" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14 }}>
          {ACTIVITIES.map((act, i) => (
            <ActivityCard key={act.id} activity={act} onClick={(a) => navigate(`/${a.id}`)} isFirst={i === 0} />
          ))}
        </div>
      </main>

      <NavBar activeId={activeNav} onChange={setActiveNav} />
    </div>
  );
}
