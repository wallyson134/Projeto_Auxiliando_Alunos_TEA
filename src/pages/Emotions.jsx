// Emotions.jsx — Página "Como me Sinto"
// A criança lê uma situação, vê o rosto e escolhe qual emoção está sendo sentida
//
// Princípios de IHC para crianças com TEA:
//  1. Contexto situacional    — cada pergunta tem uma cena do cotidiano
//  2. Reveal progressivo      — rosto aparece após 600ms (criança lê a situação primeiro)
//  3. Feedback imediato       — verde = acerto, vermelho + resposta correta mostrada
//  4. Sem penalidade severa   — erro mostra a resposta certa, sem punição
//  5. Reforço positivo        — mensagem de elogio e estrelas ao final
//  6. Acessibilidade          — aria-live nos elementos que mudam, labels descritivos

import { useNavigate } from "react-router-dom";
import { useEmotions, EMOTION_ICONS } from "../hooks/useEmotions";
import EmotionFace   from "../components/EmotionFace";
import EmotionOption from "../components/EmotionOption";
import WinScreen     from "../components/WinScreen";

export default function Emotions() {
  const navigate = useNavigate();
  const {
    currentIndex,
    currentQuestion,
    shuffledOptions,
    score,
    totalQuestions,
    progressPercent,
    answered,
    lastResult,
    selectedOption,
    gameOver,
    stars,
    answer,
    restart,
  } = useEmotions();

  // Status de cada opção: 'correct' | 'wrong' | 'idle'
  function getOptionStatus(option) {
    if (!answered) return "idle";
    if (option === currentQuestion.correct) return "correct";
    if (option === selectedOption) return "wrong";
    return "idle";
  }

  // Mensagem de feedback inline (IHC: resposta imediata ao erro/acerto)
  function getFeedbackText() {
    if (!answered) return "";
    if (lastResult === "correct")
      return `✓ Isso mesmo! ${currentQuestion.correct.charAt(0).toUpperCase() + currentQuestion.correct.slice(1)}! 🎉`;
    return `Quase! A resposta era: ${currentQuestion.correct} ${EMOTION_ICONS[currentQuestion.correct]}`;
  }

  return (
    <div
      style={{
        fontFamily: "'Nunito', sans-serif",
        background: "#FFF9F0",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* ── Cabeçalho ──────────────────────────────────────────────────── */}
      <header
        role="banner"
        style={{
          background: "#FFFDF8",
          borderBottom: "3px solid #F4C0D1",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <button
          onClick={() => navigate("/")}
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
          😊 Como me Sinto
        </h1>

        {/* Contador de pergunta atual */}
        <div
          style={{
            background: "#FBEAF0",
            border: "2px solid #F4C0D1",
            borderRadius: 12,
            padding: "6px 14px",
            fontSize: 14,
            fontWeight: 800,
            color: "#72243E",
          }}
        >
          Pergunta {currentIndex + 1} / {totalQuestions}
        </div>
      </header>

      {/* ── Corpo ──────────────────────────────────────────────────────── */}
      <main
        role="main"
        style={{ padding: "16px 20px", flex: 1, display: "flex", flexDirection: "column", gap: 18 }}
      >
        {/* Instrução simples e persistente */}
        <div
          role="note"
          style={{
            background: "#FBEAF0",
            border: "2px solid #F4C0D1",
            borderRadius: 16,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span aria-hidden="true" style={{ fontSize: 22, flexShrink: 0 }}>👀</span>
          <span style={{ fontSize: 14, color: "#72243E", fontWeight: 700, lineHeight: 1.4 }}>
            Olhe a situação e escolha como a criança está se sentindo!
          </span>
        </div>

        {/* Rosto + situação — centralizados e destacados */}
        <div
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}
        >
          <EmotionFace
            face={currentQuestion.face}
            status={lastResult || "idle"}
          />

          {/* Cena contextual — caixa amarela chamativa (IHC: contexto para compreensão) */}
          <div
            aria-live="polite"
            style={{
              fontSize: 14,
              color: "#6B5E54",
              fontWeight: 700,
              textAlign: "center",
              maxWidth: 300,
              lineHeight: 1.5,
              background: "#FFF0C2",
              border: "2px solid #FFD166",
              borderRadius: 14,
              padding: "10px 16px",
            }}
          >
            {currentQuestion.scene}
          </div>
        </div>

        {/* Feedback de acerto/erro — sempre visível após resposta */}
        <p
          aria-live="polite"
          style={{
            fontSize: 15,
            fontWeight: 800,
            textAlign: "center",
            minHeight: 24,
            margin: 0,
            color: lastResult === "correct" ? "#3B6D11" :
                   lastResult === "wrong"   ? "#A32D2D" : "transparent",
          }}
        >
          {getFeedbackText()}
        </p>

        {/* Grade de opções — 3 botões grandes e claros */}
        <div
          role="list"
          aria-label="Opções de emoção"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
          }}
        >
          {shuffledOptions.map((option) => (
            <EmotionOption
              key={option}
              emotion={option}
              icon={EMOTION_ICONS[option] || "😶"}
              status={getOptionStatus(option)}
              disabled={answered}
              onClick={() => answer(option)}
            />
          ))}
        </div>
      </main>

      {/* ── Rodapé com barra de progresso ──────────────────────────────── */}
      <footer
        style={{
          background: "white",
          borderTop: "2px solid #F0E8DC",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progresso: pergunta ${currentIndex + 1} de ${totalQuestions}`}
          style={{
            background: "#FBEAF0",
            borderRadius: 30,
            height: 14,
            flex: 1,
            overflow: "hidden",
            border: "1px solid #F4C0D1",
          }}
        >
          <div
            style={{
              background: "#D4537E",
              height: "100%",
              borderRadius: 30,
              width: `${progressPercent}%`,
              transition: "width 0.4s ease",
            }}
          />
        </div>

        <button
          onClick={restart}
          aria-label="Recomeçar a atividade"
          style={{
            background: "#FBEAF0",
            border: "2px solid #F4C0D1",
            borderRadius: 14,
            padding: "9px 18px",
            fontFamily: "'Nunito', sans-serif",
            fontSize: 14,
            fontWeight: 800,
            color: "#72243E",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#F4C0D1")}
          onMouseLeave={(e) => (e.target.style.background = "#FBEAF0")}
        >
          ↺ Recomeçar
        </button>
      </footer>

      {/* ── Tela de vitória ────────────────────────────────────────────── */}
      {gameOver && (
        <WinScreen
          moves={score}
          seconds={0}
          stars={stars}
          onReplay={restart}
        />
      )}
    </div>
  );
}
