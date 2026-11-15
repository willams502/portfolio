import { useRef, useState } from 'react';
import HoneyBadger from './HoneyBadger';
import { ACHIEVEMENTS, useGame } from '../game/GameContext';
import { sfx } from '../utils/audio';

const POKE_LINES = [
  'EAT. CODE. HUNT. REPEAT. ☕',
  'Texugo do Mel não tem medo de deploy na sexta!',
  'Dark Souls? Fácil. Difícil é legado sem docs.',
  'Já tentou o código Konami? ↑↑↓↓←→←→BA',
  'Clica de novo. Eu não tenho medo de nada.',
  'Contrata o Matheus logo, meu café tá acabando.',
  'Eu como bug no café da manhã. Literalmente.',
];

export function BadgerCompanion() {
  const { speech, say, unlock, gigantamax } = useGame();
  const [mood, setMood] = useState('idle');
  const pokes = useRef(0);

  const poke = () => {
    pokes.current += 1;
    sfx.playGengarLaugh();
    setMood('laugh');
    setTimeout(() => setMood('idle'), 900);
    say(POKE_LINES[(pokes.current - 1) % POKE_LINES.length]);
    if (pokes.current >= 5) unlock('gengar');
  };

  return (
    <div className={`fixed z-30 bottom-3 right-3 flex flex-col items-end pointer-events-none transition-all duration-700 ${gigantamax ? 'scale-[1.6] origin-bottom-right' : ''}`}>
      {speech && (
        <div key={speech} className="pointer-events-auto mb-2 mr-4 max-w-[230px] sys-window px-3 py-2 text-sm text-orange-50 anim-pop">
          {speech}
        </div>
      )}
      <button
        onClick={poke}
        title="Cutucar o Texugo do Mel"
        className="pointer-events-auto cursor-pointer anim-float drop-shadow-[0_0_18px_rgba(249,115,22,0.75)]"
      >
        <HoneyBadger mood={mood} mega={gigantamax} className="w-20 h-20 sm:w-24 sm:h-24" />
      </button>
    </div>
  );
}

export function AchievementToasts() {
  const { toasts } = useGame();
  return (
    <div className="fixed z-50 top-28 right-3 space-y-2 pointer-events-none">
      {toasts.map(({ toastId, id }) => {
        const a = ACHIEVEMENTS[id];
        return (
          <div key={toastId} className="sys-window anim-toast px-4 py-3 w-72 flex items-center gap-3">
            <span className="text-2xl">{a.icon}</span>
            <div className="min-w-0">
              <div className="font-code text-[10px] text-amber-400 tracking-widest">CONQUISTA DESBLOQUEADA</div>
              <div className="font-system text-white">{a.title}</div>
              <div className="text-xs text-orange-200/80">{a.desc}</div>
            </div>
            <span className="ml-auto font-code text-sm text-amber-300">+{a.xp}</span>
          </div>
        );
      })}
    </div>
  );
}

