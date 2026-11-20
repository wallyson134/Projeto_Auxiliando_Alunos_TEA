// Achievements.jsx — Tela "Conquistas"
// Mostra desbloqueadas e bloqueadas. Ao abrir, marca as novas como vistas
// (o badge da NavBar some), mas mantém o selo "Novo!" nesta visita.

import { useEffect, useRef } from "react";
import PageShell from "../components/PageShell";
import { useProgress } from "../context/ProgressContext";

export default function Achievements() {
  const { achievements, markSeen } = useProgress();

  // Guarda quais eram novas ao entrar, para exibir o selo "Novo!"
  const newOnEntry = useRef(new Set(achievements.filter((a) => a.unlocked && !a.seen).map((a) => a.id)));

  useEffect(() => {
    markSeen(achievements.filter((a) => a.unlocked).map((a) => a.id));
  }, [achievements, markSeen]);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <PageShell icon="🏆" title="Minhas Conquistas" subtitle={`${unlockedCount} de ${achievements.length} desbloqueadas`} accent="#FAC775">
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {achievements.map((a, i) => (
          <li key={a.id}
            aria-label={`${a.title}. ${a.desc}. ${a.unlocked ? "Desbloqueada" : "Bloqueada"}`}
            style={{
              position: "relative", textAlign: "center", padding: "18px 10px 14px", borderRadius: 18,
              background: a.unlocked ? "#FFF9E6" : "#F3F4F6",
              border: `3px solid ${a.unlocked ? "#E6A800" : "#E5E7EB"}`,
              boxShadow: a.unlocked ? "0 4px 0 #B45309" : "none",
              animation: `fade-up 0.3s ease ${i * 0.05}s both`,
            }}>
            {a.unlocked && newOnEntry.current.has(a.id) && (
              <span style={{ position: "absolute", top: -10, right: -6, background: "#E07B39", color: "white", fontSize: 11, fontWeight: 800, padding: "2px 8px", borderRadius: 20, border: "2px solid white" }}>
                Novo!
              </span>
            )}
            <div aria-hidden="true" style={{ fontSize: 40, filter: a.unlocked ? "none" : "grayscale(1)", opacity: a.unlocked ? 1 : 0.4 }}>
              {a.unlocked ? a.icon : "🔒"}
            </div>
            <div style={{ fontSize: 15, fontWeight: 800, marginTop: 6, color: a.unlocked ? "#1F2937" : "#4B5563" }}>{a.title}</div>
            <div style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.4, marginTop: 2 }}>{a.desc}</div>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
