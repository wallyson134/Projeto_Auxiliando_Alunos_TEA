// Memory.jsx — Página do Jogo da Memória
// Orquestra: useMemoryGame + MemoryCard + WinScreen
//
// Princípios de IHC para crianças com TEA:
//  1. Instrução visível e persistente  — frase de instrução sempre no topo
//  2. Feedback imediato                — animação de flip ao clicar, verde ao acertar
//  3. Feedback de erro não punitivo    — carta volta tranquilamente sem sons agressivos
//  4. Progresso visível                — contador de pares e tempo sempre visíveis
//  5. Reforço positivo                 — tela de vitória com estrelas e elogio
//  6. Acessibilidade completa          — aria-label em cada estado de carta
//  7. Reinício fácil                   — botão "Recomeçar" sempre acessível

import { useMemoryGame } from "../hooks/useMemoryGame";
import MemoryCard from "../components/MemoryCard";
import WinScreen from "../components/WinScreen";

function formatTime(s) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export default function Memory({ onBack }) {
  const {
    deck,
    moves,
    matchedCount,
    totalPairs,
    seconds,
    gameOver,
    stars,
    flipCard,
    restart,
  } = useMemoryGame();

  return (
    <div
      style={{
        fontFamily: "'Nunito', sans-serif",
        background: "#FFF9F0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",       // necessário para o WinScreen sobrepor
      }}
    >
      {/* ── Cabeçalho ──────────────────────────────────────────────────── */}
      <header
        role="banner"
        style={{
          background: "#FFFDF8",
          borderBottom: "3px solid #FFD166",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* Botão voltar — área de toque grande (IHC: alvos adequados) */}
        <button
          onClick={onBack}
          aria-label="Voltar para o início"
          style={{
            background: "#F0E8DC",
            border: "none",
            borderRadius: 12,
            width: 40,
            height: 40,
            fontSize: 18,
            cursor: "pointer",
            fontFamily: "'Nunito', sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ←
        </button>

        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#3A3230", flex: 1, margin: 0 }}>
          🃏 Jogo da Memória
        </h1>

        {/* Estatísticas sempre visíveis (IHC: visibilidade do estado do sistema) */}
        <div style={{ display: "flex", gap: 10 }}>
          {[
            { value: moves, label: "jogadas" },
            { value: formatTime(seconds), label: "tempo" },
          ].map(({ value, label }) => (
            <div
              key={label}
              style={{
                background: "#FFF0C2",
                border: "2px solid #FFD166",
                borderRadius: 12,
                padding: "6px 12px",
                textAlign: "center",
                minWidth: 56,
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 800, color: "#3A3230" }}>
                {value}
              </div>
              <div style={{ fontSize: 10, color: "#8A7F78", fontWeight: 700 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* ── Corpo principal ─────────────────────────────────────────────── */}
      <main role="main" style={{ padding: "16px 20px", flex: 1 }}>

        {/* Instrução clara e simples (IHC: linguagem direta para crianças) */}
        <div
          role="note"
          style={{
            background: "#E8F4FD",
            border: "2px solid #A8D5F5",
            borderRadius: 16,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
          }}
        >
          <span aria-hidden="true" style={{ fontSize: 22, flexShrink: 0 }}>👆</span>
          <span style={{ fontSize: 14, color: "#1A5F8A", fontWeight: 700, lineHeight: 1.4 }}>
            Vire duas cartas e encontre os pares iguais!
          </span>
        </div>

        {/* Tabuleiro 4×4 (IHC: grade regular = previsibilidade espacial) */}
        <div
          role="list"
          aria-label="Tabuleiro do jogo da memória"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
            maxWidth: 420,
            margin: "0 auto",
          }}
        >
          {deck.map((card, index) => (
            <MemoryCard
              key={card.id}
              card={card}
              onClick={() => flipCard(index)}
            />
          ))}
        </div>
      </main>

      {/* ── Rodapé ──────────────────────────────────────────────────────── */}
      <footer
        style={{
          background: "white",
          borderTop: "2px solid #F0E8DC",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          aria-live="polite"       // anuncia mudanças para leitores de tela
          style={{ fontSize: 14, color: "#6B5E54", fontWeight: 700, margin: 0 }}
        >
          Pares encontrados:{" "}
          <span style={{ color: "#E07B39", fontSize: 18, fontWeight: 800 }}>
            {matchedCount}
          </span>
          /{totalPairs}
        </p>

        <button
          onClick={restart}
          aria-label="Recomeçar o jogo"
          style={{
            background: "#FFD166",
            border: "none",
            borderRadius: 16,
            padding: "10px 20px",
            fontFamily: "'Nunito', sans-serif",
            fontSize: 14,
            fontWeight: 800,
            color: "#3A3230",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#FFC233")}
          onMouseLeave={(e) => (e.target.style.background = "#FFD166")}
        >
          ↺ Recomeçar
        </button>
      </footer>

      {/* ── Tela de vitória (sobrepõe tudo ao completar) ────────────────── */}
      {gameOver && (
        <WinScreen
          moves={moves}
          seconds={seconds}
          stars={stars}
          onReplay={restart}
        />
      )}
    </div>
  );
}
