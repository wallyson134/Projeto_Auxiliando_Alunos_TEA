// StarRating.jsx — Exibe estrelas de progresso de uma atividade
// Props:
//   count {number} — estrelas conquistadas
//   max   {number} — total de estrelas (padrão: 3)

export default function StarRating({ count, max = 3 }) {
  return (
    <div
      style={{ display: "flex", gap: 5, justifyContent: "center", marginTop: 8 }}
      role="img"
      aria-label={`${count} de ${max} estrelas`}
    >
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 18,
            height: 18,
            background: i < count ? "#FFD166" : "#E8E0D4",
            clipPath:
              "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
          }}
        />
      ))}
    </div>
  );
}
