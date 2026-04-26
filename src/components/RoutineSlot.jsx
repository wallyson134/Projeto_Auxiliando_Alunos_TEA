// RoutineSlot.jsx — Slot de destino onde a criança solta a atividade
// Props:
//   index       {number}          — posição na sequência (0-based)
//   placedItem  {object|null}     — item já colocado { id, icon, label } ou null
//   isCorrect   {boolean}         — se o item colocado está correto
//   onDrop      {function}        — callback(slotIndex) ao soltar
//   onDragOver  {function}        — callback para aceitar o arrasto

import { useState } from "react";

export default function RoutineSlot({ index, placedItem, isCorrect, onDrop, onDragOver }) {
  const [hovering, setHovering] = useState(false);

  // Cores do slot conforme estado
  let borderColor = "#C0DD97";
  let bgColor = "#F8FFF3";
  if (placedItem) {
    borderColor = isCorrect ? "#639922" : "#E24B4A";
    bgColor     = isCorrect ? "#EAF3DE" : "#FCEBEB";
  } else if (hovering) {
    borderColor = "#FFD166";
    bgColor = "#FFF0C2";
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (!placedItem) setHovering(true);
        onDragOver?.();
      }}
      onDragLeave={() => setHovering(false)}
      onDrop={(e) => {
        e.preventDefault();
        setHovering(false);
        onDrop(index);
      }}
      aria-label={
        placedItem
          ? `Posição ${index + 1}: ${placedItem.label}, ${isCorrect ? "correto" : "incorreto"}`
          : `Posição ${index + 1}, vazia`
      }
      style={{
        width: 90,
        height: 90,
        borderRadius: 16,
        border: `2px ${placedItem ? "solid" : hovering ? "solid" : "dashed"} ${borderColor}`,
        background: bgColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        flexShrink: 0,
        transition: "background 0.15s, border-color 0.15s",
        // Animação de shake quando errado — feita via CSS keyframes no index.css
        animation: placedItem && !isCorrect ? "shake 0.3s" : "none",
      }}
    >
      {placedItem ? (
        <>
          <span aria-hidden="true" style={{ fontSize: 30 }}>{placedItem.icon}</span>
          <span style={{ fontSize: 10, fontWeight: 800, color: "#3A3230", textAlign: "center", lineHeight: 1.2 }}>
            {placedItem.label}
          </span>
        </>
      ) : (
        <span style={{ fontSize: 11, fontWeight: 800, color: "#8A7F78" }}>
          {index + 1}
        </span>
      )}
    </div>
  );
}
