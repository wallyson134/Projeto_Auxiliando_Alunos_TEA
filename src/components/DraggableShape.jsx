// DraggableShape.jsx — Forma arrastável na bandeja
// Suporta drag (desktop) e clique para selecionar (touch/mobile)
// Props:
//   shape      {object}  — { id, label, color, path }
//   isUsed     {boolean} — já foi encaixada
//   isSelected {boolean} — selecionada aguardando slot
//   onDragStart {function(id)}
//   onDragEnd   {function}
//   onSelect    {function(id)}

export default function DraggableShape({
  shape, isUsed, isSelected, onDragStart, onDragEnd, onSelect,
}) {
  const { id, label, color, path } = shape;

  return (
    <div
      draggable={!isUsed}
      onClick={() => !isUsed && onSelect(id)}
      onDragStart={(e) => {
        e.dataTransfer.effectAllowed = "move";
        onDragStart(id);
        // Adia opacidade para o ghost do drag aparecer antes
        setTimeout(() => {
          const el = document.getElementById(`shape-${id}`);
          if (el) el.style.opacity = "0.4";
        }, 0);
      }}
      onDragEnd={() => {
        const el = document.getElementById(`shape-${id}`);
        if (el) el.style.opacity = "";
        onDragEnd();
      }}
      id={`shape-${id}`}
      tabIndex={isUsed ? -1 : 0}
      onKeyDown={(e) => e.key === "Enter" && !isUsed && onSelect(id)}
      aria-label={`${label}${isSelected ? ", selecionada" : ""}`}
      aria-disabled={isUsed}
      onFocus={(e) => { if (!isUsed) e.currentTarget.style.outline = "3px solid #FFD166"; }}
      onBlur={(e)  => (e.currentTarget.style.outline = "none")}
      style={{
        width: 62,
        height: 62,
        cursor: isUsed ? "default" : "grab",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: isUsed ? 0.22 : 1,
        pointerEvents: isUsed ? "none" : "auto",
        // Destaque ao selecionar — borda pulsante amarela
        outline: isSelected ? "3px solid #FFD166" : "none",
        outlineOffset: isSelected ? "3px" : "0",
        borderRadius: 8,
        transition: "transform 0.15s, opacity 0.2s",
        // Sombra física — parece clicável
        filter: isUsed ? "none" : "drop-shadow(0 4px 0 rgba(0,0,0,0.18))",
        transform: isSelected ? "translateY(-4px) scale(1.1)" : "none",
      }}
      onMouseEnter={(e) => {
        if (!isUsed && !isSelected) e.currentTarget.style.transform = "translateY(-4px) scale(1.08)";
      }}
      onMouseLeave={(e) => {
        if (!isSelected) e.currentTarget.style.transform = "none";
      }}
    >
      <svg viewBox="0 0 54 54" width="54" height="54" aria-hidden="true">
        <g dangerouslySetInnerHTML={{ __html: path(color) }} />
      </svg>
    </div>
  );
}
