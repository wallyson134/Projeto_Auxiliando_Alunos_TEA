// NavBar.jsx — Barra de navegação principal (base da tela)
// Props:
//   activeId  {string}   — id do item ativo
//   onChange  {function} — callback ao trocar de aba

const NAV_ITEMS = [
  { id: "home",     icon: "🏠", label: "Início" },
  { id: "progress", icon: "⭐", label: "Progresso" },
  { id: "trophy",   icon: "🏆", label: "Conquistas", badge: 2 },
  { id: "settings", icon: "⚙️", label: "Config." },
];

export default function NavBar({ activeId, onChange }) {
  return (
    <nav
      role="navigation"
      aria-label="Navegação principal"
      style={{
        background: "white",
        borderTop: "2px solid #F0E8DC",
        display: "flex",
        justifyContent: "space-around",
        padding: "12px 0 8px",
      }}
    >
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          aria-label={item.badge ? `${item.label}, ${item.badge} novas` : item.label}
          aria-current={activeId === item.id ? "page" : undefined}
          onClick={() => onChange(item.id)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            cursor: "pointer",
            background: activeId === item.id ? "#FFD166" : "none",
            border: "none",
            fontFamily: "'Nunito', sans-serif",
            padding: "8px 16px",
            borderRadius: 16,
            transition: "background 0.15s",
            minWidth: 52, // área de toque mínima (IHC: alvos de toque adequados)
          }}
        >
          <span aria-hidden="true" style={{ fontSize: 22 }}>
            {item.icon}
          </span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#6B5E54" }}>
            {item.label}
            {item.badge && (
              <span
                style={{
                  background: "#E07B39",
                  color: "white",
                  borderRadius: 20,
                  fontSize: 10,
                  fontWeight: 800,
                  padding: "2px 6px",
                  marginLeft: 4,
                }}
              >
                {item.badge}
              </span>
            )}
          </span>
        </button>
      ))}
    </nav>
  );
}
