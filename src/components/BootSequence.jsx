import { useEffect, useState } from 'react';
import HoneyBadger from './HoneyBadger';
import { sfx } from '../utils/audio';
import { useGame } from '../game/GameContext';

const LINES = [
  '> Inicializando Sistema [EAT. CODE. HUNT. REPEAT.]...',
  '> Acendendo a Fogueira (Bonfire)... [OK]',
  '> Escaneando nível de cafeína e teimosia...',
  '> Afinidade detectada: TEXUGO DO MEL (DESTEMIDO)',
  '> Conectando ao Dev Berserker...',
];

const PENALTY_LINES = [
  'Recusar não é uma opção.',
  'YOU DIED... quer dizer, tenta de novo.',
  'O Texugo do Mel não liga pra sua recusa.',
];

export default function BootSequence({ onDone }) {
  const { unlock } = useGame();
  const [shown, setShown] = useState(0);
  const [phase, setPhase] = useState('typing'); // typing | prompt | penalty | entering
  const [refusals, setRefusals] = useState(0);
  const [dodge, setDodge] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (phase !== 'typing') return;
    if (shown >= LINES.length) {
      const t = setTimeout(() => setPhase('prompt'), 450);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((s) => s + 1), 420);
    return () => clearTimeout(t);
  }, [shown, phase]);

  const accept = () => {
    sfx.playLevelUp();
    unlock('awakened');
    setPhase('entering');
    setTimeout(onDone, 1100);
  };

  const refuse = () => {
    sfx.playGengarLaugh();
    unlock('rebel');
    setRefusals((r) => r + 1);
    setPhase('penalty');
    setTimeout(() => setPhase('prompt'), 1600);
  };

  // depois da 1ª recusa, o botão foge do mouse
  const flee = () => {
    if (refusals < 1) return;
    setDodge({ x: (Math.random() - 0.5) * 260, y: (Math.random() - 0.5) * 120 });
  };

  return (
    <div className={`fixed inset-0 z-[100] bg-[#060308] flex items-center justify-center p-4 overflow-hidden ${phase === 'penalty' ? 'anim-shake' : ''}`}>
      {/* vinheta vermelha da penalidade */}
      {phase === 'penalty' && <div className="absolute inset-0 bg-red-900/40 anim-flash pointer-events-none" />}
      {phase === 'entering' && <div className="absolute inset-0 bg-orange-400 anim-flash pointer-events-none z-10" />}

      <button
        onClick={() => { sfx.playClick(); accept(); }}
        className="absolute top-4 right-4 text-xs font-code text-orange-400/70 hover:text-orange-200 cursor-pointer"
      >
        pular intro ›
      </button>

      <div className="w-full max-w-xl">
        {/* terminal */}
        <div className="font-code text-sm text-orange-300/90 space-y-1 mb-8 min-h-[140px]">
          {LINES.slice(0, shown).map((l, i) => (
            <div key={i} className={i === LINES.length - 2 ? 'text-amber-400 font-bold' : ''}>{l}</div>
          ))}
          {phase === 'typing' && <span className="anim-blink">█</span>}
        </div>

        {(phase === 'prompt' || phase === 'penalty') && (
          <div className="sys-window p-6 sm:p-8 anim-pop">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className={`w-7 h-7 grid place-items-center border-2 font-bold font-system ${phase === 'penalty' ? 'border-red-500 text-red-400' : 'border-orange-300 text-orange-200'}`}>!</span>
              <span className={`sys-title text-lg ${phase === 'penalty' ? 'text-red-400' : 'text-orange-100'}`}>
                {phase === 'penalty' ? 'YOU DIED' : 'BONFIRE LIT'}
              </span>
            </div>

            {phase === 'penalty' ? (
              <div className="text-center space-y-3">
                <HoneyBadger mood="angry" className="w-28 h-28 mx-auto" track={false} />
                <p className="text-red-300 font-system text-lg">
                  {PENALTY_LINES[(refusals - 1) % PENALTY_LINES.length]}
                </p>
              </div>
            ) : (
              <>
                <p className="text-center text-lg leading-relaxed text-orange-50">
                  Você encontrou a fogueira do <span className="text-orange-400 font-bold">Texugo do Mel</span>.
                  <br />Pronto para caçar bugs e projetos?
                </p>
                <p className="text-center text-xs text-orange-300/70 font-code mt-2">
                  (EAT • CODE • HUNT • REPEAT — explorar rende XP e conquistas)
                </p>
                <div className="relative flex justify-center gap-4 mt-7 h-12">
                  <button
                    onClick={accept}
                    className="px-8 py-2.5 font-system font-bold tracking-widest bg-orange-600 hover:bg-orange-500 text-white border border-orange-300 shadow-[0_0_20px_rgba(249,115,22,0.7)] cursor-pointer transition"
                  >
                    ACEITAR
                  </button>
                  <button
                    onMouseEnter={flee}
                    onClick={refuse}
                    style={{ transform: `translate(${dodge.x}px, ${dodge.y}px)` }}
                    className="px-8 py-2.5 font-system font-bold tracking-widest text-orange-300 border border-orange-800 hover:border-red-500 hover:text-red-400 cursor-pointer transition-all duration-200"
                  >
                    RECUSAR
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

