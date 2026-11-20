// Progress.jsx — Tela "Progresso"
// Resumo geral, meta do dia, melhor resultado por atividade e últimas partidas.

import PageShell    from "../components/PageShell";
import StarRating   from "../components/StarRating";
import { useProgress, dayKey } from "../context/ProgressContext";
import { ACTIVITIES } from "../data/activities";

function relativeDay(day) {
  const today = dayKey();
  const yesterday = dayKey(new Date(Date.now() - 86400000));
  if (day === today) return "hoje";
  if (day === yesterday) return "ontem";
  const [, m, d] = day.split("-");
  return `${d}/${m}`;
}

function StatCard({ icon, value, label }) {
  return (
    <div style={{ flex: 1, background: "white", border: "2px solid #E5E7EB", borderRadius: 16, padding: "12px 6px", textAlign: "center" }}>
      <div aria-hidden="true" style={{ fontSize: 22 }}>{icon}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: "#1F2937", lineHeight: 1.2 }}>{value}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#4B5563" }}>{label}</div>
    </div>
  );
}

export default function Progress() {
  const { stats, results, history } = useProgress();
  const dailyPercent = Math.round((stats.doneToday / stats.totalActivities) * 100);
  const recent = history.slice(0, 5);

  return (
    <PageShell icon="⭐" title="Meu Progresso" subtitle="Veja o quanto você já aprendeu!" accent="#FFD166">

      {/* Resumo geral */}
      <div style={{ display: "flex", gap: 10 }}>
        <StatCard icon="⭐" value={stats.totalStars} label="estrelas" />
        <StatCard icon="🎮" value={stats.totalPlays} label="partidas" />
        <StatCard icon="✅" value={`${stats.playedCount}/${stats.totalActivities}`} label="atividades" />
      </div>

      {/* Meta de hoje */}
      <section aria-label="Meta de hoje" style={{ background: "linear-gradient(135deg, #FFF0C2, #FFE4B8)", border: "2px solid #FFD166", borderRadius: 16, padding: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 800, marginBottom: 8 }}>
          <span>Hoje</span>
          <span style={{ color: "#B45309" }}>{stats.doneToday} de {stats.totalActivities} atividades</span>
        </div>
        <div role="progressbar" aria-valuenow={dailyPercent} aria-valuemin={0} aria-valuemax={100}
          aria-label={`${stats.doneToday} de ${stats.totalActivities} atividades hoje`}
          style={{ background: "#F5D97A", borderRadius: 30, height: 14, border: "1.5px solid #E6A800", overflow: "hidden" }}>
          <div style={{ background: "#E07B39", height: "100%", width: `${dailyPercent}%`, borderRadius: 30, transition: "width 0.5s ease" }} />
        </div>
      </section>

      {/* Por atividade */}
      <section aria-labelledby="por-atividade">
        <h2 id="por-atividade" style={{ fontSize: 13, fontWeight: 800, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 8px" }}>
          Minhas atividades
        </h2>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {ACTIVITIES.map((act) => {
            const r = results[act.id];
            return (
              <li key={act.id} style={{ background: "white", border: "2px solid #E5E7EB", borderRadius: 14, padding: "10px 12px", display: "flex", alignItems: "center", gap: 12 }}>
                <div aria-hidden="true" style={{ width: 44, height: 44, borderRadius: "50%", background: act.color.bg, border: `2px solid ${act.color.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                  {act.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 800 }}>{act.label}</div>
                  <div style={{ fontSize: 13, color: "#4B5563" }}>
                    {r?.plays ? `${r.plays} ${r.plays === 1 ? "partida" : "partidas"}` : "Ainda não jogou"}
                  </div>
                </div>
                <div style={{ marginTop: -8 }}><StarRating count={r?.bestStars ?? 0} /></div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Últimas partidas */}
      <section aria-labelledby="ultimas">
        <h2 id="ultimas" style={{ fontSize: 13, fontWeight: 800, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.5px", margin: "0 0 8px" }}>
          Últimas partidas
        </h2>
        {recent.length === 0 ? (
          <p style={{ background: "#F3F4F6", borderRadius: 14, padding: 14, fontSize: 14, color: "#4B5563", margin: 0, textAlign: "center" }}>
            Nenhuma partida ainda. Que tal começar agora? 🎈
          </p>
        ) : (
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 6 }}>
            {recent.map((h) => {
              const act = ACTIVITIES.find((a) => a.id === h.activityId);
              if (!act) return null;
              return (
                <li key={h.at} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, padding: "8px 12px", background: "white", border: "1.5px solid #E5E7EB", borderRadius: 12 }}>
                  <span aria-hidden="true" style={{ fontSize: 20 }}>{act.icon}</span>
                  <span style={{ flex: 1, fontWeight: 700 }}>{act.label}</span>
                  <span role="img" aria-label={`${h.stars} estrelas`} style={{ color: "#E6A800", letterSpacing: 1 }}>
                    {"★".repeat(h.stars)}<span style={{ color: "#D1D5DB" }}>{"★".repeat(3 - h.stars)}</span>
                  </span>
                  <span style={{ color: "#4B5563", fontSize: 13, minWidth: 40, textAlign: "right" }}>{relativeDay(h.day)}</span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </PageShell>
  );
}
