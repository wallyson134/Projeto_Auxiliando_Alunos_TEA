// PictureCommunication.jsx — Página "Fala com Figuras"
// Comunicação aumentativa e alternativa (CAA) com síntese de voz
//
// Princípios de IHC para crianças com TEA:
//  1. Comunicação sem texto    — figuras grandes + label de apoio, voz sintetizada
//  2. Categorias claras        — abas coloridas por tema para reduzir busca cognitiva
//  3. Reversibilidade          — chip da frase pode ser removido com um toque
//  4. Feedback de ação         — animação pop ao adicionar figura, chip aparece na frase
//  5. Voz natural              — Web Speech API em pt-BR, velocidade reduzida (0.85)
//  6. Previsibilidade          — layout fixo: frase no topo, categorias, grade embaixo
//  7. Acessibilidade           — aria-live na frase, aria-label em cada figura e ação

import { useNavigate } from "react-router-dom";
import { usePictureCommunication } from "../hooks/usePictureCommunication";
import SentenceBar from "../components/SentenceBar";
import PictureCard from "../components/PictureCard";

export default function PictureCommunication() {
  const navigate = useNavigate();

  const {
    categories,
    activeCategory,
    setActiveCategoryId,
    sentence,
    addCard,
    removeCard,
    clearSentence,
    speakSentence,
    isSpeaking,
  } = usePictureCommunication();

  return (
    <div style={{
      fontFamily: "'Nunito', sans-serif",
      background: "#FFF9F0",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      color: "#1F2937",
    }}>

      {/* ── Cabeçalho ──────────────────────────────────────────────────── */}
      <header role="banner" style={{
        background: "#FFFDF8",
        borderBottom: "3px solid #FAC775",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        gap: 10,
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
          🖼️ Fala com Figuras
        </h1>
      </header>

      {/* ── Frase montada ──────────────────────────────────────────────── */}
      <SentenceBar
        sentence={sentence}
        isSpeaking={isSpeaking}
        onRemove={removeCard}
        onSpeak={speakSentence}
        onClear={clearSentence}
      />

      {/* ── Corpo: abas de categorias + grade de figuras ────────────────── */}
      <main role="main" style={{ flex: 1, padding: "14px 20px", display: "flex", flexDirection: "column", gap: 12 }}>

        {/* Abas de categorias — navegação por tema (IHC: reduz busca) */}
        <div
          role="tablist"
          aria-label="Categorias de figuras"
          style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
        >
          {categories.map((cat) => {
            const isActive = cat.id === activeCategory.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategoryId(cat.id)}
                style={{
                  background: isActive ? cat.color : "white",
                  border: `2px solid ${isActive ? cat.color : "#E5E7EB"}`,
                  borderRadius: 20,
                  padding: "6px 14px",
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: 13,
                  fontWeight: 800,
                  color: isActive ? "white" : "#4B5563",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.borderColor = cat.color; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.borderColor = "#E5E7EB"; }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Grade de figuras — 4 colunas, ícones grandes (IHC: linguagem visual) */}
        <div
          role="list"
          aria-label={`Figuras da categoria ${activeCategory.label}`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 10,
          }}
        >
          {activeCategory.cards.map((card) => (
            <PictureCard
              key={card.label}
              card={card}
              color={activeCategory.color}
              onClick={() => addCard(card, activeCategory.color)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
