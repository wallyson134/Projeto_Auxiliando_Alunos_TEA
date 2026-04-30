// ShapeSlot.jsx — Slot no tabuleiro onde a forma deve ser encaixada
// Props:
//   shape      {object}  — { id, label, color, path, hole }
//   position   {object}  — { top, left } posição no tabuleiro
//   isFilled   {boolean} — já está encaixado
//   isWrong    {boolean} — animação de erro
//   onDrop     {function(shapeId, slotId)}
//   onClick    {function(slotId)} — para modo toque

export default function ShapeSlot({
  shape, position, isFilled, isWrong, onDrop, onClick,
}) {
  const { id, label, color, path, hole } = shape;

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); }}
      onDrop={(e) => {
        e.preventDefault();
        const draggingId = e.dataTransfer.getData("shapeId") || window.__draggingId;
        onDrop(draggingId, id);
      }}
      onClick={() => onClick(id)}
      aria-label={isFilled ? `${label}, encaixado!` : `Buraco do ${label}`}
      tabIndex={isFilled ? -1 : 0}
      onKeyDown={(e) => e.key === "Enter" && onClick(id)}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        width: 54,
        height: 54,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: isFilled ? "default" : "pointer",
        // Animação de shake no erro
        animation: isWrong ? "shake 0.35s ease" : "none",
      }}
    >
      {/* Silhueta branca — sempre visível como guia */}
      <svg
        viewBox="0 0 54 54"
        width="54"
        height="54"
        aria-hidden="true"
        style={{
          opacity: isFilled ? 0 : 0.55,
          transition: "opacity 0.2s",
        }}
      >
        <g dangerouslySetInnerHTML={{ __html: hole("rgba(255,255,255,0.7)") }} />
      </svg>

      {/* Forma colorida após encaixar — animação de queda */}
      {isFilled && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "drop-in 0.3s cubic-bezier(.4,0,0,1.4)",
          }}
        >
          <svg viewBox="0 0 54 54" width="54" height="54" aria-hidden="true">
            <g dangerouslySetInnerHTML={{ __html: path(color) }} />
          </svg>
          {/* Badge ✓ de confirmação */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: -8, right: -8,
              width: 20, height: 20,
              background: "#16A34A",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              color: "white",
              fontWeight: 800,
              border: "2px solid white",
              animation: "badge-pop 0.3s ease",
            }}
          >✓</div>
        </div>
      )}
    </div>
  );
}
