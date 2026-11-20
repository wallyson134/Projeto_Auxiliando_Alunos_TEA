// ProgressContext.jsx — Estado global salvo no localStorage
// Guarda: perfil (nome/avatar), melhor resultado por atividade, histórico recente
// e quais conquistas a criança já viu.
//
// Uso nas telas de jogo:
//   const { recordResult } = useProgress();
//   useEffect(() => { if (gameOver) recordResult("memory", stars); }, [gameOver]);

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ACTIVITIES }   from "../data/activities";
import { ACHIEVEMENTS } from "../data/achievements";

const STORAGE_KEY = "mundoludico:v1";

const DEFAULT_STATE = {
  profile: { name: "Ana", avatar: "👧" },
  results: {},   // { [activityId]: { bestStars, plays, last } }
  history: [],   // [{ activityId, stars, day, at }] — mais recente primeiro (máx. 50)
  seen: [],      // ids de conquistas já vistas
};

// Data local no formato YYYY-MM-DD
export const dayKey = (date = new Date()) => date.toLocaleDateString("sv-SE");

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const saved = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...saved, profile: { ...DEFAULT_STATE.profile, ...saved.profile } };
  } catch {
    return DEFAULT_STATE; // storage bloqueado ou JSON corrompido
  }
}

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [state, setState] = useState(loadState);

  // Persiste a cada mudança
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* ignora */ }
  }, [state]);

  const recordResult = useCallback((activityId, stars) => {
    setState((prev) => {
      const old = prev.results[activityId] || { bestStars: 0, plays: 0 };
      return {
        ...prev,
        results: {
          ...prev.results,
          [activityId]: { bestStars: Math.max(old.bestStars, stars), plays: old.plays + 1, last: Date.now() },
        },
        history: [{ activityId, stars, day: dayKey(), at: Date.now() }, ...prev.history].slice(0, 50),
      };
    });
  }, []);

  const setProfile = useCallback((patch) => {
    setState((prev) => ({ ...prev, profile: { ...prev.profile, ...patch } }));
  }, []);

  const markSeen = useCallback((ids) => {
    setState((prev) => {
      const merged = Array.from(new Set([...prev.seen, ...ids]));
      return merged.length === prev.seen.length ? prev : { ...prev, seen: merged };
    });
  }, []);

  // ── Estatísticas derivadas ────────────────────────────────────────────────
  const stats = useMemo(() => {
    const ids      = ACTIVITIES.map((a) => a.id);
    const results  = Object.values(state.results);
    const today    = dayKey();
    const todayIds = new Set(state.history.filter((h) => h.day === today).map((h) => h.activityId));
    return {
      totalActivities: ids.length,
      playedCount:     ids.filter((id) => state.results[id]?.plays > 0).length,
      totalPlays:      results.reduce((s, r) => s + r.plays, 0),
      totalStars:      results.reduce((s, r) => s + r.bestStars, 0),
      perfectCount:    results.filter((r) => r.bestStars === 3).length,
      doneToday:       ids.filter((id) => todayIds.has(id)).length,
    };
  }, [state]);

  const achievements = useMemo(
    () => ACHIEVEMENTS.map((a) => ({ ...a, unlocked: a.check(stats), seen: state.seen.includes(a.id) })),
    [stats, state.seen]
  );
  const unseenCount = achievements.filter((a) => a.unlocked && !a.seen).length;

  const value = {
    profile: state.profile, results: state.results, history: state.history,
    stats, achievements, unseenCount,
    recordResult, setProfile, markSeen,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress deve ser usado dentro de <ProgressProvider>");
  return ctx;
}
