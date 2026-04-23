// ActivityCard.jsx — Card clicável de uma atividade lúdica
// Props:
//   activity {object} — dados da atividade (id, icon, label, desc, stars, isNew, color)
//   onClick  {function} — callback ao selecionar a atividade

import { useState } from "react";
import StarRating from "./StarRating";

export default function ActivityCard({ activity, onClick }) {
  const [hovered, setHovered] = useState(false);
  const { icon, label, desc, stars, isNew, color } = activity;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(activity)}
      onKeyDown={(e) => e.key === "Enter" && onClick(activity)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${label}. ${desc}. ${isNew ? "Novo! " : ""}${stars} estrela${stars !== 1 ? "s" : ""} de 3.`}
      style={{
        background: "white",
        borderRadius: 20,
        padding: "20px 14px",
        textAlign: "center",
        border: `3px solid ${hovered ? color.borderHover : color.border}`,
        cursor: "pointer",
        transition: "transform 0.15s, border-color 0.15s, box-shadow 0.15s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 8px 16px rgba(0,0,0,0.10)"
          : "0 2px 0px rgba(0,0,0,0.08)",
        outline: "none",
      }}
      onFocus={(e) => (e.currentTarget.style.outline = "4px solid #FFD166")}
      onBlur={(e) => (e.currentTarget.style.outline = "none")}
    >
      {/* Ícone grande — reconhecimento visual imediato (IHC: linguagem visual) */}
      <div
        aria-hidden="true"
        style={{
          width: 68,
          height: 68,
          borderRadius: "50%",
          background: color.bg,
          margin: "0 auto 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
        }}
      >
        {icon}
      </div>

      <p style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 800, color: "#3A3230" }}>
        {label}
      </p>
      <p style={{ margin: 0, fontSize: 12, color: "#8A7F78", lineHeight: 1.4 }}>
        {desc}
      </p>

      {isNew ? (
        <span
          style={{
            display: "inline-block",
            marginTop: 8,
            background: "#E07B39",
            color: "white",
            borderRadius: 20,
            fontSize: 10,
            fontWeight: 800,
            padding: "2px 7px",
          }}
        >
          Novo!
        </span>
      ) : (
        <StarRating count={stars} />
      )}
    </div>
  );
}
