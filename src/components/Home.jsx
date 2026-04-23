// Home.jsx — Tela inicial (orquestrador)
// Compõe: Header + WelcomeBanner + ActivityCard + NavBar
//
// Princípios de IHC para crianças com TEA:
//  1. Previsibilidade  — layout fixo: cabeçalho → hero → cards → nav
//  2. Feedback         — hover, foco e estados visuais claros em cada componente
//  3. Linguagem visual — ícones grandes, texto simples, cores consistentes
//  4. Carga cognitiva  — máximo 4 atividades visíveis, sem menus ocultos
//  5. Acessibilidade   — WAI-ARIA completo em todos os componentes filhos

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header        from "./Header";
import WelcomeBanner from "./WelcomeBanner";
import ActivityCard  from "./ActivityCard";
import NavBar        from "./NavBar";
import { ACTIVITIES } from "../data/activities";

export default function Home() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState("home");

  // ── Dados do usuário — substitua por contexto/autenticação real ──
  const user = {
    name:           "Ana",
    avatar:         "👧",
    activitiesDone:  3,
    activitiesTotal: 5,
  };

  
  function handleProfileClick() {
    console.log("Abrir perfil");
  }
  
  function handleActivityClick(activity) {
    navigate(`/${activity.id}`)
  }

  return (
    <div
      style={{
        fontFamily: "'Nunito', sans-serif",
        background: "#FFF9F0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header
        userName={user.name}
        userAvatar={user.avatar}
        onProfile={handleProfileClick}
      />

      <WelcomeBanner
        userName={user.name}
        activitiesDone={user.activitiesDone}
        activitiesTotal={user.activitiesTotal}
      />

      <main role="main" style={{ flex: 1 }}>
        <h2
          id="atividades-titulo"
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#3A3230",
            padding: "20px 24px 10px",
            margin: 0,
          }}
        >
          Escolha uma atividade
        </h2>

        {/* Máximo 4 itens — reduz sobrecarga cognitiva (IHC) */}
        <div
          role="list"
          aria-labelledby="atividades-titulo"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 14,
            padding: "0 24px 24px",
          }}
        >
          {ACTIVITIES.map((act) => (
            <ActivityCard key={act.id} activity={act} onClick={handleActivityClick} />
          ))}
        </div>
      </main>

      <NavBar activeId={activeNav} onChange={setActiveNav} />
    </div>
  );
}
