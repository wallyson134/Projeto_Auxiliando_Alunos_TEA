// ActivityCard.jsx — Card com hierarquia visual e interatividade fortes
// Melhorias: contraste elevado, hover sobe 5px + sombra forte, press feedback,
// primeiro card destacado, ícone maior, texto #1F2937

import { useState } from "react";
import StarRating from "./StarRating";

export default function ActivityCard({ activity, onClick, isFirst }) {
  const [hovered, setHovered]   = useState(false);
  const [pressing, setPressing] = useState(false);
  const { icon, label, desc, stars, isNew, color } = activity;

  return (
    <div
      role="button" tabIndex={0}
      onClick={() => onClick(activity)}
      onKeyDown={(e) => e.key === "Enter" && onClick(activity)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressing(false); }}
      onMouseDown={() => setPressing(true)}
      onMouseUp={() => setPressing(false)}
      aria-label={`${label}. ${desc}. ${isNew ? "Novo! " : ""}${stars} estrela${stars !== 1 ? "s" : ""} de 3.`}
      onFocus={(e) => (e.currentTarget.style.outline = "3px solid #FFD166")}
      onBlur={(e)  => (e.currentTarget.style.outline = "none")}
      style={{
        borderRadius: 20,
        padding: "22px 14px 18px",
        textAlign: "center",
        cursor: "pointer",
        outline: "none",
        background: isFirst ? color.bg : "white",
        border: isFirst
          ? `3px solid ${color.borderHover}`
          : `2px solid ${hovered ? color.borderHover : "#E5E7EB"}`,
        transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
        transform: pressing ? "scale(0.97)" : hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 25px rgba(0,0,0,0.12)" : "0 2px 4px rgba(0,0,0,0.06)",
        animation: "fade-up 0.3s ease both",
      }}
    >
      {/* Badge destaque no primeiro card */}
      {isFirst && (
        <div aria-hidden="true" style={{ background: color.borderHover, color: "white", fontSize: 10, fontWeight: 800, padding: "2px 10px", borderRadius: 20, display: "inline-block", marginBottom: 8 }}>
          ⭐ Começar aqui
        </div>
      )}

      {/* Ícone maior */}
      <div aria-hidden="true" style={{
        width: 76, height: 76, borderRadius: "50%",
        background: color.bg, margin: "0 auto 14px",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 36, border: `2px solid ${color.border}`,
        transition: "transform 0.2s",
        transform: hovered ? "scale(1.08)" : "scale(1)",
      }}>
        {icon}
      </div>

      <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 800, color: "#1F2937" }}>{label}</p>
      <p style={{ margin: 0, fontSize: 12, color: "#4B5563", lineHeight: 1.4 }}>{desc}</p>

      {isNew ? (
        <span style={{ display: "inline-block", marginTop: 8, background: "#E07B39", color: "white", borderRadius: 20, fontSize: 10, fontWeight: 800, padding: "2px 8px" }}>Novo!</span>
      ) : (
        <StarRating count={stars} />
      )}
    </div>
  );
}
