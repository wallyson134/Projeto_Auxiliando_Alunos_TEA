// Emotions.jsx — v2 responsivo com maxWidth 480px

import { useNavigate } from "react-router-dom";
import { useEmotions, EMOTION_ICONS } from "../hooks/useEmotions";
import EmotionFace   from "../components/EmotionFace";
import EmotionOption from "../components/EmotionOption";
import WinScreen     from "../components/WinScreen";

export default function Emotions() {
  const navigate = useNavigate();
  const { currentIndex, currentQuestion, shuffledOptions, score, totalQuestions, progressPercent, answered, lastResult, selectedOption, gameOver, stars, answer, restart } = useEmotions();

  function getOptionStatus(option) {
    if (!answered) return "idle";
    if (option === currentQuestion.correct) return "correct";
    if (option === selectedOption) return "wrong";
    return "idle";
  }

  function getFeedbackText() {
    if (!answered) return "";
    if (lastResult === "correct") return `✓ Isso mesmo! ${currentQuestion.correct.charAt(0).toUpperCase() + currentQuestion.correct.slice(1)}! 🎉`;
    return `Quase! A resposta era: ${currentQuestion.correct} ${EMOTION_ICONS[currentQuestion.correct]}`;
  }

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#E8E0D4", minHeight: "100vh", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
      <div style={{ background: "#FFF9F0", width: "100%", maxWidth: 480, minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", color: "#1F2937" }}>

        <header role="banner" style={{ background: "#FFFDF8", borderBottom: "3px solid #F4C0D1", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={() => navigate("/")} aria-label="Voltar" style={{ background: "#F0E8DC", border: "none", borderRadius: 12, width: 38, height: 38, fontSize: 16, cursor: "pointer", fontFamily: "'Nunito', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>←</button>
          <h1 style={{ fontSize: 18, fontWeight: 800, color: "#1F2937", flex: 1, margin: 0 }}>😊 Como me Sinto</h1>
          <div style={{ background: "#FBEAF0", border: "2px solid #F4C0D1", borderRadius: 12, padding: "4px 12px", fontSize: 13, fontWeight: 800, color: "#72243E" }}>
            {currentIndex + 1} / {totalQuestions}
          </div>
        </header>

        <main role="main" style={{ padding: "12px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
          <div role="note" style={{ background: "#FBEAF0", border: "2px solid #F4C0D1", borderRadius: 14, padding: "9px 12px", display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#72243E", fontWeight: 700 }}>
            <span aria-hidden="true" style={{ fontSize: 18, flexShrink: 0 }}>👀</span>
            Olhe a situação e escolha como a criança está se sentindo!
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <EmotionFace face={currentQuestion.face} status={lastResult || "idle"} />
            <div aria-live="polite" style={{ fontSize: 13, color: "#4B5563", fontWeight: 700, textAlign: "center", maxWidth: 280, lineHeight: 1.5, background: "#FFF0C2", border: "2px solid #FFD166", borderRadius: 12, padding: "9px 14px" }}>
              {currentQuestion.scene}
            </div>
          </div>

          <p aria-live="polite" style={{ fontSize: 14, fontWeight: 800, textAlign: "center", minHeight: 20, margin: 0, color: lastResult === "correct" ? "#3B6D11" : lastResult === "wrong" ? "#A32D2D" : "transparent" }}>
            {getFeedbackText()}
          </p>

          <div role="list" aria-label="Opções de emoção" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
            {shuffledOptions.map((option) => (
              <EmotionOption key={option} emotion={option} icon={EMOTION_ICONS[option] || "😶"} status={getOptionStatus(option)} disabled={answered} onClick={() => answer(option)} />
            ))}
          </div>
        </main>

        <footer style={{ background: "white", borderTop: "2px solid #E5E7EB", padding: "10px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <div role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100}
            style={{ background: "#FBEAF0", borderRadius: 30, height: 11, flex: 1, overflow: "hidden", border: "1.5px solid #F4C0D1" }}>
            <div style={{ background: "#D4537E", height: "100%", borderRadius: 30, width: `${progressPercent}%`, transition: "width 0.4s ease" }} />
          </div>
          <button onClick={restart} aria-label="Recomeçar"
            style={{ background: "#FBEAF0", border: "2px solid #F4C0D1", borderRadius: 12, padding: "8px 16px", fontFamily: "'Nunito', sans-serif", fontSize: 13, fontWeight: 800, color: "#72243E", cursor: "pointer" }}
            onMouseEnter={(e) => (e.target.style.background = "#F4C0D1")}
            onMouseLeave={(e) => (e.target.style.background = "#FBEAF0")}>
            ↺ Recomeçar
          </button>
        </footer>

        {gameOver && <WinScreen moves={score} seconds={0} stars={stars} onReplay={restart} />}
      </div>
    </div>
  );
}
