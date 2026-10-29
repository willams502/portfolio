import { useRef, useState } from 'react';
import Gengar from './Gengar';
import { ACHIEVEMENTS, useGame } from '../game/GameContext';
import { sfx } from '../utils/audio';

const POKE_LINES = [
  'Gen-gaaar! 👻',
  'Hehehe... cuidado com a sua sombra.',
  'O Matheus me deixou aqui de guarda.',
  'Já tentou o código Konami? ↑↑↓↓←→←→BA',
  'Clica de novo. Eu duvido.',
  'Contrata ele logo, eu tô com fome.',
  'Eu vivo nos logs de erro. Ele me encontra sempre.',
];

export function GengarCompanion() {
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
    <div className={`fixed z-30 bottom-3 right-3 flex flex-col items-end pointer-events-none transition-all duration-700 ${gigantamax ? 'scale-[1.8] origin-bottom-right' : ''}`}>
      {speech && (
        <div key={speech} className="pointer-events-auto mb-1 mr-6 max-w-[220px] sys-window px-3 py-2 text-sm text-purple-50 anim-pop">
          {speech}
        </div>
      )}
      <button
        onClick={poke}
        title="Cutucar o Gengar"
        className="pointer-events-auto cursor-pointer anim-float drop-shadow-[0_0_18px_rgba(168,85,247,0.8)]"
      >
        <Gengar mood={mood} mega={gigantamax} className="w-20 h-20 sm:w-28 sm:h-28" />
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
              <div className="text-xs text-purple-300">{a.desc}</div>
            </div>
            <span className="ml-auto font-code text-sm text-amber-300">+{a.xp}</span>
          </div>
        );
      })}
    </div>
  );
}

