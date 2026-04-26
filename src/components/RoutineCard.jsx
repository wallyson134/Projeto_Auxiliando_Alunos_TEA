// RoutineCard.jsx — Card arrastável de uma atividade da rotina
// Props:
//   item      {object}   — { id, icon, label }
//   onDragStart {function} — callback ao iniciar arrasto

export default function RoutineCard({ item, onDragStart }) {
  const { icon, label } = item;

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        onDragStart(item.id);
      }}
      aria-label={`${label}, arraste para a posição correta`}
      role="button"
      tabIndex={0}
      style={{
        width: 86,
        height: 86,
        borderRadius: 14,
        background: "white",
        border: "2px solid #E8D8CC",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        cursor: "grab",
        flexShrink: 0,
        transition: "transform 0.15s, box-shadow 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
      onFocus={(e) => (e.currentTarget.style.outline = "4px solid #FFD166")}
      onBlur={(e) => (e.currentTarget.style.outline = "none")}
    >
      <span aria-hidden="true" style={{ fontSize: 34 }}>{icon}</span>
      <span style={{ fontSize: 11, fontWeight: 800, color: "#3A3230", textAlign: "center", lineHeight: 1.2 }}>
        {label}
      </span>
    </div>
  );
}
