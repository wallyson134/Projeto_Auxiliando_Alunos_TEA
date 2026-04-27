// PictureCommunication.jsx — v2 responsivo com maxWidth 480px

import { useNavigate } from "react-router-dom";
import { usePictureCommunication } from "../hooks/usePictureCommunication";
import SentenceBar from "../components/SentenceBar";
import PictureCard from "../components/PictureCard";

export default function PictureCommunication() {
  const navigate = useNavigate();
  const { categories, activeCategory, setActiveCategoryId, sentence, addCard, removeCard, clearSentence, speakSentence, isSpeaking } = usePictureCommunication();

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#E8E0D4", minHeight: "100vh", display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
      <div style={{ background: "#FFF9F0", width: "100%", maxWidth: 480, minHeight: "100vh", display: "flex", flexDirection: "column", color: "#1F2937" }}>

        <header role="banner" style={{ background: "#FFFDF8", borderBottom: "3px solid #FAC775", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={() => navigate("/")} aria-label="Voltar" style={{ background: "#F0E8DC", border: "none", borderRadius: 12, width: 38, height: 38, fontSize: 16, cursor: "pointer", fontFamily: "'Nunito', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>←</button>
          <h1 style={{ fontSize: 18, fontWeight: 800, color: "#1F2937", flex: 1, margin: 0 }}>🖼️ Fala com Figuras</h1>
        </header>

        <SentenceBar sentence={sentence} isSpeaking={isSpeaking} onRemove={removeCard} onSpeak={speakSentence} onClear={clearSentence} />

        <main role="main" style={{ flex: 1, padding: "12px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div role="tablist" aria-label="Categorias" style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {categories.map((cat) => {
              const isActive = cat.id === activeCategory.id;
              return (
                <button key={cat.id} role="tab" aria-selected={isActive} onClick={() => setActiveCategoryId(cat.id)}
                  style={{ background: isActive ? cat.color : "white", border: `2px solid ${isActive ? cat.color : "#E5E7EB"}`, borderRadius: 20, padding: "5px 12px", fontFamily: "'Nunito', sans-serif", fontSize: 12, fontWeight: 800, color: isActive ? "white" : "#4B5563", cursor: "pointer", transition: "all 0.15s" }}>
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div role="list" aria-label={`Figuras: ${activeCategory.label}`}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {activeCategory.cards.map((card) => (
              <PictureCard key={card.label} card={card} color={activeCategory.color} onClick={() => addCard(card, activeCategory.color)} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
