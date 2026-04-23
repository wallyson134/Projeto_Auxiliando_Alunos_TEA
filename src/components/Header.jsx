// Header.jsx — Cabeçalho fixo com logo e botão de perfil
// Props:
//   userName   {string} — nome do usuário
//   userAvatar {string} — emoji do avatar
//   onProfile  {function} — callback ao clicar no perfil

export default function Header({ userName, userAvatar, onProfile }) {
  return (
    <header
      role="banner"
      style={{
        background: "#FFFDF8",
        borderBottom: "3px solid #FFD166",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo — sempre visível, reforça identidade do app (IHC: previsibilidade) */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          aria-hidden="true"
          style={{
            width: 52,
            height: 52,
            background: "#FFD166",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
          }}
        >
          🌟
        </div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#3A3230" }}>
            MundoLúdico
          </div>
          <div style={{ fontSize: 13, color: "#8A7F78" }}>Aprender brincando</div>
        </div>
      </div>

      {/* Botão de perfil — área de toque ampla, label descritivo (IHC: acessibilidade) */}
      <button
        aria-label={`Perfil de ${userName}`}
        onClick={onProfile}
        style={{
          background: "#E8F4FD",
          border: "2px solid #A8D5F5",
          borderRadius: 40,
          padding: "8px 18px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          cursor: "pointer",
          fontFamily: "'Nunito', sans-serif",
          fontSize: 14,
          fontWeight: 700,
          color: "#1A5F8A",
        }}
      >
        <span style={{ fontSize: 18 }}>{userAvatar}</span>
        {userName}
      </button>
    </header>
  );
}
