import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { sfx } from '../utils/audio';

export const ACHIEVEMENTS = {
  awakened: { icon: '⚡', title: 'O Despertar', desc: 'Aceitou se tornar um Jogador.', xp: 50 },
  rebel: { icon: '☠️', title: 'Zona de Penalidade', desc: 'Tentou recusar o Sistema. Ousado.', xp: 30 },
  explorer: { icon: '🗺️', title: 'Cartógrafo', desc: 'Visitou todas as áreas do Sistema.', xp: 100 },
  firstGate: { icon: '🌀', title: 'Primeiro Gate', desc: 'Entrou na sua primeira dungeon.', xp: 40 },
  allGates: { icon: '🏆', title: 'Limpador de Gates', desc: 'Explorou todas as dungeons.', xp: 150 },
  arise: { icon: '👤', title: 'ERGA-SE!', desc: 'Extraiu o Exército de Sombras.', xp: 80 },
  daily: { icon: '📜', title: 'Missão Diária', desc: 'Completou o treino diário sem penalidade.', xp: 80 },
  gengar: { icon: '👻', title: 'Melhor Amigo Fantasma', desc: 'Cutucou o Gengar 5 vezes.', xp: 40 },
  recruiter: { icon: '🤝', title: 'Recrutador de Guilda', desc: 'Abriu um canal de contato.', xp: 120 },
  konami: { icon: '🔴', title: 'Gigantamax', desc: '↑↑↓↓←→←→BA. Um verdadeiro gamer.', xp: 200 },
};

const RANKS = ['E', 'D', 'C', 'B', 'A', 'S'];
const STORAGE = 'shadow-system-v1';

const GameCtx = createContext(null);

export function GameProvider({ children }) {
  const saved = useMemo(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE)) || {}; } catch { return {}; }
  }, []);

  const [unlocked, setUnlocked] = useState(saved.unlocked || []);
  const [toasts, setToasts] = useState([]);
  const [speech, setSpeech] = useState(null);
  const [gigantamax, setGigantamax] = useState(false);
  const speechTimer = useRef();

  const xp = unlocked.reduce((sum, id) => sum + (ACHIEVEMENTS[id]?.xp || 0), 0);
  const level = Math.floor(xp / 100) + 1;
  const rank = RANKS[Math.min(RANKS.length - 1, Math.floor((level - 1) / 2))];
  const xpInLevel = xp % 100;

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify({ unlocked }));
  }, [unlocked]);

  const say = useCallback((text, ms = 4500) => {
    clearTimeout(speechTimer.current);
    setSpeech(text);
    speechTimer.current = setTimeout(() => setSpeech(null), ms);
  }, []);

  const unlockedRef = useRef(unlocked);
  const unlock = useCallback((id) => {
    if (unlockedRef.current.includes(id) || !ACHIEVEMENTS[id]) return;
    unlockedRef.current = [...unlockedRef.current, id];
    setUnlocked(unlockedRef.current);
    const toastId = `${id}-${Date.now()}`;
    setToasts((t) => [...t, { toastId, id }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.toastId !== toastId)), 4200);
    sfx.playSystemAlert();
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE);
    window.location.reload();
  }, []);

  const value = {
    unlocked, unlock, xp, level, rank, xpInLevel,
    toasts, speech, say, gigantamax, setGigantamax, reset,
  };

  return <GameCtx.Provider value={value}>{children}</GameCtx.Provider>;
}

export const useGame = () => useContext(GameCtx);
