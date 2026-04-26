// usePictureCommunication.js — Hook com lógica do Fala com Figuras
// Gerencia: categoria ativa, frase montada e síntese de voz (Web Speech API)

import { useState, useCallback } from "react";
import { CATEGORIES } from "../data/pictureCategories";

export function usePictureCommunication() {
  const [activeCategoryId, setActiveCategoryId] = useState(CATEGORIES[0].id);
  // sentence = array de { icon, label, color, key } — key para React key prop
  const [sentence, setSentence] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const activeCategory = CATEGORIES.find((c) => c.id === activeCategoryId);

  // ── Adicionar figura à frase ──────────────────────────────────────────────
  const addCard = useCallback((card, categoryColor) => {
    setSentence((prev) => [
      ...prev,
      { ...card, color: categoryColor, key: `${card.label}-${Date.now()}` },
    ]);
  }, []);

  // ── Remover figura da frase pelo índice ───────────────────────────────────
  const removeCard = useCallback((index) => {
    setSentence((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // ── Limpar frase ──────────────────────────────────────────────────────────
  const clearSentence = useCallback(() => {
    window.speechSynthesis?.cancel();
    setSentence([]);
    setIsSpeaking(false);
  }, []);

  // ── Falar a frase com Web Speech API ─────────────────────────────────────
  // Sem dependência de API externa — funciona offline após carregamento
  const speakSentence = useCallback(() => {
    if (!sentence.length || !window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // Cancela fala anterior se houver

    const text = sentence.map((s) => s.label).join(" ");
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang  = "pt-BR";
    utterance.rate  = 0.85;   // mais lento — melhor para crianças com TEA
    utterance.pitch = 1.1;    // voz levemente mais aguda (mais amigável)

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend   = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [sentence]);

  return {
    categories: CATEGORIES,
    activeCategory,
    setActiveCategoryId,
    sentence,
    addCard,
    removeCard,
    clearSentence,
    speakSentence,
    isSpeaking,
  };
}
