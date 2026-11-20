// Home.jsx — Tela inicial ligada ao progresso real
// Nome/avatar vêm do perfil; estrelas e meta do dia vêm do ProgressContext.

import { useEffect, useState } from "react";
import { useNavigate }  from "react-router-dom";
import ActivityCard     from "./ActivityCard";
import NavBar           from "./NavBar";
import SensoryToggle    from "./SensoryToggle";
import { ACTIVITIES }   from "../data/activities";
import { useProgress }  from "../context/ProgressContext";

export default function Home() {
  const navigate = useNavigate();
  const { profile, results, stats } = useProgress();
  const [lowStimulus, setLowStimulus] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("low-stimulus", lowStimulus);
    return () => document.body.classList.remove("low-stimulus");
  }, [lowStimulus]);

  const { doneToday, totalActivities } = stats;
  const progressPercent = Math.round((doneToday / totalActivities) * 100);
  const todayText =
    doneToday === 0 ? "Vamos começar? 🎈" :
    doneToday === 1 ? "Você já fez 1 atividade hoje! 🎉" :
                      `Você já fez ${doneToday} atividades hoje! 🎉`;

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#E8E0D4", minHeight: "100vh", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
      <div style={{ background: "#FFF9F0", width: "100%", maxWidth: 480, minHeight: "100vh", display: "flex", flexDirection: "column", color: "#1F2937" }}>

        <header role="banner" style={{ background: "#FFFDF8", borderBottom: "2px solid #E5E7EB", padding: "10px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <div aria-hidden="true" style={{ width: 38, height: 38, background: "#FFD166", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🌟</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.1 }}>MundoLúdico</div>
            <div style={{ fontSize: 11, color: "#4B5563" }}>Aprender brincando</div>
          </div>
          <SensoryToggle active={lowStimulus} onToggle={() => setLowStimulus((v) => !v)} />
          {/* Perfil leva para as configurações */}
          <button onClick={() => navigate("/config")} aria-label={`Perfil de ${profile.name}. Abrir configurações`}
            style={{ display: "flex", alignItems: "center", gap: 6, background: "#F3F4F6", border: "2px solid #E5E7EB", borderRadius: 40, padding: "4px 10px 4px 5px", cursor: "pointer", fontFamily: "'Nunito', sans-serif" }}>
            <span aria-hidden="true" style={{ width: 26, height: 26, borderRadius: "50%", background: "#FFF0C2", border: "2px solid #FFD166", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{profile.avatar}</span>
            <span style={{ fontSize: 13, fontWeight: 800, color: "#1F2937" }}>{profile.name}</span>
          </button>
        </header>

        <section role="region" aria-label="Boas-vindas" style={{ background: "linear-gradient(135deg, #FFF0C2 0%, #FFE4B8 100%)", padding: "14px 16px", borderBottom: "2px solid #E5E7EB" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>
                Olá, <span style={{ color: "#E07B39" }}>{profile.name}!</span> 👋
              </h1>
              <p style={{ fontSize: 13, color: "#4B5563", margin: 0 }}>{todayText}</p>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#E07B39" }}>{doneToday}</div>
              <div style={{ fontSize: 11, color: "#4B5563", fontWeight: 700 }}>de {totalActivities} hoje</div>
            </div>
          </div>
          <div role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}
            aria-label={`${doneToday} de ${totalActivities} atividades hoje`}
            style={{ background: "#F5D97A", borderRadius: 30, height: 14, border: "1.5px solid #E6A800", overflow: "hidden" }}>
            <div style={{ background: "#E07B39", height: "100%", borderRadius: 30, width: `${progressPercent}%`, transition: "width 0.6s ease", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 5 }}>
              {progressPercent >= 15 && <span style={{ fontSize: 10, fontWeight: 800, color: "white" }}>{progressPercent}%</span>}
            </div>
          </div>
        </section>

        <main role="main" style={{ flex: 1, padding: "14px 16px" }}>
          <h2 id="atividades-titulo" style={{ fontSize: 12, fontWeight: 800, color: "#4B5563", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Escolha uma atividade
          </h2>
          <div role="list" aria-labelledby="atividades-titulo" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
            {ACTIVITIES.map((act, i) => {
              const r = results[act.id];
              return (
                <ActivityCard
                  key={act.id}
                  activity={{ ...act, stars: r?.bestStars ?? 0, isNew: act.isNew && !r?.plays }}
                  onClick={(a) => navigate(`/${a.id}`)}
                  isFirst={i === 0}
                />
              );
            })}
          </div>
        </main>

        <NavBar />
      </div>
    </div>
  );
}
