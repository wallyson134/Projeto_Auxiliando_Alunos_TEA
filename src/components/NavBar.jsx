// NavBar.jsx — Navegação inferior FUNCIONAL (React Router)
// O item ativo vem da URL atual; o badge de Conquistas mostra as ainda não vistas.

import { useLocation, useNavigate } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";

const NAV_ITEMS = [
  { id: "home",     path: "/",           icon: "🏠", label: "Início" },
  { id: "progress", path: "/progresso",  icon: "⭐", label: "Progresso" },
  { id: "trophy",   path: "/conquistas", icon: "🏆", label: "Conquistas" },
  { id: "settings", path: "/config",     icon: "⚙️", label: "Config." },
];

export default function NavBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { unseenCount } = useProgress();

  return (
    <nav role="navigation" aria-label="Navegação principal" style={{
      background: "white", borderTop: "2px solid #E5E7EB",
      display: "flex", justifyContent: "space-around", padding: "8px 0 10px",
    }}>
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.path;
        const badge = item.id === "trophy" && unseenCount > 0 ? unseenCount : 0;
        return (
          <button
            key={item.id}
            onClick={() => !isActive && navigate(item.path)}
            aria-label={badge ? `${item.label}, ${badge} nova${badge > 1 ? "s" : ""}` : item.label}
            aria-current={isActive ? "page" : undefined}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              cursor: isActive ? "default" : "pointer",
              background: isActive ? "#FFF0C2" : "transparent",
              border: "none",
              borderTop: `3px solid ${isActive ? "#E07B39" : "transparent"}`,
              fontFamily: "'Nunito', sans-serif",
              padding: "8px 18px 4px", borderRadius: "0 0 12px 12px",
              transition: "background 0.15s", minWidth: 60,
            }}
            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "#FFF9E6"; }}
            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            onFocus={(e) => (e.currentTarget.style.outline = "3px solid #FFD166")}
            onBlur={(e)  => (e.currentTarget.style.outline = "none")}
          >
            <span aria-hidden="true" style={{ fontSize: 24 }}>{item.icon}</span>
            <span style={{ fontSize: 12, fontWeight: isActive ? 800 : 700, color: isActive ? "#1F2937" : "#4B5563" }}>
              {item.label}
              {badge > 0 && (
                <span style={{ background: "#E07B39", color: "white", borderRadius: 20, fontSize: 10, fontWeight: 800, padding: "1px 6px", marginLeft: 4 }}>
                  {badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
