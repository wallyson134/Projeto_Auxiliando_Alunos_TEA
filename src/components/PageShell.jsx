// PageShell.jsx — Moldura das telas de navegação (Progresso, Conquistas, Config.)
// Mesmo painel de 480px das outras telas + cabeçalho + NavBar fixa embaixo.

import NavBar from "./NavBar";

export default function PageShell({ icon, title, subtitle, accent = "#FFD166", children }) {
  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#E8E0D4", minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <div style={{ background: "#FFF9F0", width: "100%", maxWidth: 480, minHeight: "100vh", display: "flex", flexDirection: "column", color: "#1F2937" }}>
        <header role="banner" style={{ background: "#FFFDF8", borderBottom: `3px solid ${accent}`, padding: "14px 16px" }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>
            <span aria-hidden="true">{icon} </span>{title}
          </h1>
          {subtitle && <p style={{ fontSize: 14, color: "#4B5563", margin: "2px 0 0" }}>{subtitle}</p>}
        </header>
        <main role="main" style={{ flex: 1, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
          {children}
        </main>
        <NavBar />
      </div>
    </div>
  );
}
