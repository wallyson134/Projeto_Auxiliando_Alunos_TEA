// NavBar.jsx — Navegação com item ativo de alto contraste
// Melhorias: ativo tem borda superior laranja + fundo + texto escuro

const NAV_ITEMS = [
  { id: "home",     icon: "🏠", label: "Início" },
  { id: "progress", icon: "⭐", label: "Progresso" },
  { id: "trophy",   icon: "🏆", label: "Conquistas", badge: 2 },
  { id: "settings", icon: "⚙️", label: "Config." },
];

export default function NavBar({ activeId, onChange }) {
  return (
    <nav role="navigation" aria-label="Navegação principal" style={{
      background: "white",
      borderTop: "2px solid #E5E7EB",
      display: "flex",
      justifyContent: "space-around",
      padding: "8px 0 10px",
    }}>
      {NAV_ITEMS.map((item) => {
        const isActive = activeId === item.id;
        return (
          <button
            key={item.id}
            aria-label={item.badge ? `${item.label}, ${item.badge} novas` : item.label}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onChange(item.id)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              cursor: "pointer",
              background: isActive ? "#FFF0C2" : "transparent",
              border: "none",
              borderTop: `3px solid ${isActive ? "#E07B39" : "transparent"}`,
              fontFamily: "'Nunito', sans-serif",
              padding: "8px 18px 4px",
              borderRadius: "0 0 12px 12px",
              transition: "background 0.15s",
              minWidth: 60,
            }}
          >
            <span aria-hidden="true" style={{ fontSize: 24 }}>{item.icon}</span>
            <span style={{ fontSize: 11, fontWeight: isActive ? 800 : 700, color: isActive ? "#1F2937" : "#6B7280" }}>
              {item.label}
              {item.badge && (
                <span style={{ background: "#E07B39", color: "white", borderRadius: 20, fontSize: 10, fontWeight: 800, padding: "1px 5px", marginLeft: 3 }}>
                  {item.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
