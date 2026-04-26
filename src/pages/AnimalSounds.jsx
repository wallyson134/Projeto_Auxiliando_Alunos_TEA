// AnimalSounds.jsx — Página "Sons dos Animais"
// A criança ouve um som gerado por Web Audio API e toca no animal correto
//
// Princípios de IHC para crianças com TEA:
//  1. Estímulo auditivo + visual    — som + escrita do som + ícone grande
//  2. Reprodução automática         — som toca ao carregar cada pergunta
//  3. Replay fácil                  — botão grande e central para repetir
//  4. Feedback multimodal           — cor + texto + animação no acerto/erro
//  5. Sem punição severa            — erro mostra resposta correta suavemente
//  6. Progresso visível             — barra e contador sempre visíveis
//  7. Acessibilidade                — aria-live, aria-label dinâmico

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimalSounds } from "../hooks/useAnimalSounds";
import PlaySoundButton from "../components/PlaySoundButton";
import AnimalOption    from "../components/AnimalOption";
import WinScreen       from "../components/WinScreen";

export default function AnimalSounds() {
  const navigate = useNavigate();

  const {
    currentQuestion,
    current,
    totalQuestions,
    progressPercent,
    score,
    answered,
    lastResult,
    selectedId,
    isPlaying,
    gameOver,
    stars,
    playSound,
    answer,
    restart,
  } = useAnimalSounds();

  // Toca o som automaticamente ao carregar cada pergunta (IHC: feedback proativo)
  useEffect(() => {
    if (currentQuestion && !gameOver) {
      const t = setTimeout(() => playSound(currentQuestion.correct), 500);
      return () => clearTimeout(t);
    }
  }, [current, gameOver]);  // eslint-disable-line react-hooks/exhaustive-deps

  // Status visual de cada opção
  function getStatus(animalId) {
    if (!answered) return "idle";
    if (animalId === currentQuestion.correct.id) return "correct";
    if (animalId === selectedId) return "wrong";
    return "idle";
  }

  // Texto de feedback inline
  function getFeedback() {
    if (!answered || !lastResult) return "";
    const { correct } = currentQuestion;
    if (lastResult === "correct")
      return `✓ Isso mesmo! O ${correct.label} faz ${correct.sound} 🎉`;
    return `Era o ${correct.label}! ${correct.icon} ${correct.sound}`;
  }

  return (
    <div style={{
      fontFamily: "'Nunito', sans-serif",
      background: "#FFF9F0",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      position: "relative",
    }}>

      {/* ── Cabeçalho ──────────────────────────────────────────────────── */}
      <header role="banner" style={{
        background: "#FFFDF8",
        borderBottom: "3px solid #B5D4F4",
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}>
        <button
          onClick={() => navigate("/")}
          aria-label="Voltar para o início"
          style={{
            background: "#F0E8DC", border: "none", borderRadius: 12,
            width: 40, height: 40, fontSize: 18, cursor: "pointer",
            fontFamily: "'Nunito', sans-serif",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >←</button>

        <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1F2937", flex: 1, margin: 0 }}>
          🔊 Sons dos Animais
        </h1>

        <div style={{
          background: "#E6F1FB", border: "2px solid #B5D4F4",
          borderRadius: 12, padding: "6px 14px",
          fontSize: 14, fontWeight: 800, color: "#0C447C",
        }}>
          Pergunta {current + 1} / {totalQuestions}
        </div>
      </header>

      {/* ── Corpo ──────────────────────────────────────────────────────── */}
      <main role="main" style={{
        padding: "16px 20px", flex: 1,
        display: "flex", flexDirection: "column", gap: 16,
      }}>

        {/* Instrução */}
        <div role="note" style={{
          background: "#E6F1FB", border: "2px solid #B5D4F4",
          borderRadius: 16, padding: "12px 16px",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span aria-hidden="true" style={{ fontSize: 22, flexShrink: 0 }}>👂</span>
          <span style={{ fontSize: 14, color: "#0C447C", fontWeight: 700, lineHeight: 1.4 }}>
            Ouça o som e toque no animal que faz esse barulho!
          </span>
        </div>

        {/* Botão de som + palavra escrita */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PlaySoundButton
            isPlaying={isPlaying}
            soundWord={currentQuestion?.correct.sound || ""}
            onClick={() => currentQuestion && playSound(currentQuestion.correct)}
          />
        </div>

        {/* Feedback de acerto/erro */}
        <p
          aria-live="polite"
          style={{
            fontSize: 15, fontWeight: 800, textAlign: "center",
            minHeight: 22, margin: 0,
            color: lastResult === "correct" ? "#16A34A" :
                   lastResult === "wrong"   ? "#DC2626" : "transparent",
          }}
        >
          {getFeedback()}
        </p>

        {/* Grade de opções — 3 animais */}
        <div
          role="list"
          aria-label="Opções de animais"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
          }}
        >
          {currentQuestion?.options.map((animal) => (
            <AnimalOption
              key={animal.id}
              animal={animal}
              status={getStatus(animal.id)}
              disabled={answered}
              onClick={() => answer(animal.id)}
            />
          ))}
        </div>
      </main>

      {/* ── Rodapé ─────────────────────────────────────────────────────── */}
      <footer style={{
        background: "white", borderTop: "2px solid #E5E7EB",
        padding: "14px 20px", display: "flex", alignItems: "center", gap: 16,
      }}>
        <div
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0} aria-valuemax={100}
          aria-label={`Pergunta ${current + 1} de ${totalQuestions}`}
          style={{
            background: "#E6F1FB", borderRadius: 30, height: 14,
            flex: 1, overflow: "hidden", border: "1.5px solid #B5D4F4",
          }}
        >
          <div style={{
            background: "#378ADD", height: "100%", borderRadius: 30,
            width: `${progressPercent}%`, transition: "width 0.4s ease",
          }} />
        </div>

        <button
          onClick={restart}
          aria-label="Recomeçar a atividade"
          style={{
            background: "#E6F1FB", border: "2px solid #B5D4F4",
            borderRadius: 14, padding: "9px 18px",
            fontFamily: "'Nunito', sans-serif", fontSize: 14,
            fontWeight: 800, color: "#0C447C", cursor: "pointer",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#B5D4F4")}
          onMouseLeave={(e) => (e.target.style.background = "#E6F1FB")}
        >
          ↺ Recomeçar
        </button>
      </footer>

      {/* ── Tela de vitória ─────────────────────────────────────────────── */}
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
