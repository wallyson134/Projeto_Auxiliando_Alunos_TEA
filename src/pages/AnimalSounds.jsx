// AnimalSounds.jsx — v2 responsivo com maxWidth 480px

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimalSounds } from "../hooks/useAnimalSounds";
import PlaySoundButton from "../components/PlaySoundButton";
import AnimalOption    from "../components/AnimalOption";
import WinScreen       from "../components/WinScreen";

export default function AnimalSounds() {
  const navigate = useNavigate();
  const { currentQuestion, current, totalQuestions, progressPercent, score, answered, lastResult, selectedId, isPlaying, gameOver, stars, playSound, answer, restart } = useAnimalSounds();

  useEffect(() => {
    if (currentQuestion && !gameOver) {
      const t = setTimeout(() => playSound(currentQuestion.correct), 500);
      return () => clearTimeout(t);
    }
  }, [current, gameOver]); // eslint-disable-line

  function getStatus(animalId) {
    if (!answered) return "idle";
    if (animalId === currentQuestion.correct.id) return "correct";
    if (animalId === selectedId) return "wrong";
    return "idle";
  }

  function getFeedback() {
    if (!answered || !lastResult) return "";
    const { correct } = currentQuestion;
    if (lastResult === "correct") return `✓ Isso mesmo! O ${correct.label} faz ${correct.sound} 🎉`;
    return `Era o ${correct.label}! ${correct.icon} ${correct.sound}`;
  }

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#E8E0D4", minHeight: "100vh", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
      <div style={{ background: "#FFF9F0", width: "100%", maxWidth: 480, minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", color: "#1F2937" }}>

        <header role="banner" style={{ background: "#FFFDF8", borderBottom: "3px solid #B5D4F4", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={() => navigate("/")} aria-label="Voltar" style={{ background: "#F0E8DC", border: "none", borderRadius: 12, width: 38, height: 38, fontSize: 16, cursor: "pointer", fontFamily: "'Nunito', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>←</button>
          <h1 style={{ fontSize: 18, fontWeight: 800, color: "#1F2937", flex: 1, margin: 0 }}>🔊 Sons dos Animais</h1>
          <div style={{ background: "#E6F1FB", border: "2px solid #B5D4F4", borderRadius: 12, padding: "4px 12px", fontSize: 13, fontWeight: 800, color: "#0C447C" }}>
            {current + 1} / {totalQuestions}
          </div>
        </header>

        <main role="main" style={{ padding: "12px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
          <div role="note" style={{ background: "#E6F1FB", border: "2px solid #B5D4F4", borderRadius: 14, padding: "9px 12px", display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#0C447C", fontWeight: 700 }}>
            <span aria-hidden="true" style={{ fontSize: 18, flexShrink: 0 }}>👂</span>
            Ouça o som e toque no animal que faz esse barulho!
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <PlaySoundButton isPlaying={isPlaying} soundWord={currentQuestion?.correct.sound || ""} onClick={() => currentQuestion && playSound(currentQuestion.correct)} />
          </div>

          <p aria-live="polite" style={{ fontSize: 14, fontWeight: 800, textAlign: "center", minHeight: 20, margin: 0, color: lastResult === "correct" ? "#16A34A" : lastResult === "wrong" ? "#DC2626" : "transparent" }}>
            {getFeedback()}
          </p>

          <div role="list" aria-label="Opções de animais" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {currentQuestion?.options.map((animal) => (
              <AnimalOption key={animal.id} animal={animal} status={getStatus(animal.id)} disabled={answered} onClick={() => answer(animal.id)} />
            ))}
          </div>
        </main>

        <footer style={{ background: "white", borderTop: "2px solid #E5E7EB", padding: "10px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <div role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}
            style={{ background: "#E6F1FB", borderRadius: 30, height: 11, flex: 1, overflow: "hidden", border: "1.5px solid #B5D4F4" }}>
            <div style={{ background: "#378ADD", height: "100%", borderRadius: 30, width: `${progressPercent}%`, transition: "width 0.4s ease" }} />
          </div>
          <button onClick={restart} aria-label="Recomeçar"
            style={{ background: "#E6F1FB", border: "2px solid #B5D4F4", borderRadius: 12, padding: "8px 16px", fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 800, color: "#0C447C", cursor: "pointer" }}
            onMouseEnter={(e) => (e.target.style.background = "#B5D4F4")}
            onMouseLeave={(e) => (e.target.style.background = "#E6F1FB")}>
            ↺ Recomeçar
          </button>
        </footer>

        {gameOver && <WinScreen moves={score} seconds={0} stars={stars} onReplay={restart} />}
      </div>
    </div>
  );
}
