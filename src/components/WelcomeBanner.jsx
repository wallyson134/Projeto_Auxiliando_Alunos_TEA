// WelcomeBanner.jsx — Saudação + barra de progresso diário
// Props:
//   userName        {string} — nome do usuário
//   activitiesDone  {number} — atividades concluídas hoje
//   activitiesTotal {number} — total de atividades do dia

export default function WelcomeBanner({ userName, activitiesDone, activitiesTotal }) {
  const progressPercent = Math.round((activitiesDone / activitiesTotal) * 100);

  return (
    <section
      role="region"
      aria-label="Boas-vindas e progresso do dia"
      style={{
        background: "linear-gradient(135deg, #FFF0C2 0%, #FFE4B8 100%)",
        padding: "36px 24px 28px",
        textAlign: "center",
      }}
    >
      {/* Saudação clara e personalizada (IHC: feedback e contexto) */}
      <h1 style={{ fontSize: 28, fontWeight: 800, color: "#3A3230", margin: "0 0 8px" }}>
        Olá, <span style={{ color: "#E07B39" }}>{userName}!</span> 👋
      </h1>
      <p style={{ fontSize: 16, color: "#6B5E54", margin: "0 0 20px" }}>
        O que vamos aprender hoje?
      </p>

      {/* Barra de progresso acessível (IHC: visibilidade do status do sistema) */}
      <div
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progresso de hoje: ${activitiesDone} de ${activitiesTotal} atividades concluídas`}
        style={{
          background: "#FDECC8",
          borderRadius: 30,
          height: 20,
          maxWidth: 340,
          margin: "0 auto",
          border: "2px solid #F5C66B",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "linear-gradient(90deg, #F5A623, #E07B39)",
            height: "100%",
            borderRadius: 30,
            width: `${progressPercent}%`,
            transition: "width 0.6s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingRight: 8,
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 800, color: "white" }}>
            {activitiesDone}/{activitiesTotal}
          </span>
        </div>
      </div>

      <p style={{ fontSize: 13, color: "#7A6254", marginTop: 6 }}>
        Você já fez {activitiesDone} atividades hoje! 🎉
      </p>
    </section>
  );
}
