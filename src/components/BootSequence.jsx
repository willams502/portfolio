import { useEffect, useState } from 'react';
import Gengar from './Gengar';
import { sfx } from '../utils/audio';
import { useGame } from '../game/GameContext';

const LINES = [
  '> Inicializando Sistema...',
  '> Detectando presença no portal... [OK]',
  '> Escaneando aura do visitante...',
  '> Afinidade detectada: TIPO FANTASMA',
  '> Conectando ao Monarca das Sombras...',
];

const PENALTY_LINES = [
  'Recusar não é uma opção.',
  'O Sistema não aceita "não".',
  'O Gengar está rindo de você.',
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
    <div className={`fixed inset-0 z-[100] bg-[#030007] flex items-center justify-center p-4 overflow-hidden ${phase === 'penalty' ? 'anim-shake' : ''}`}>
      {/* vinheta vermelha da penalidade */}
      {phase === 'penalty' && <div className="absolute inset-0 bg-red-900/40 anim-flash pointer-events-none" />}
      {phase === 'entering' && <div className="absolute inset-0 bg-purple-300 anim-flash pointer-events-none z-10" />}

      <button
        onClick={() => { sfx.playClick(); accept(); }}
        className="absolute top-4 right-4 text-xs font-code text-purple-400/60 hover:text-purple-200 cursor-pointer"
      >
        pular intro ›
      </button>

      <div className="w-full max-w-xl">
        {/* terminal */}
        <div className="font-code text-sm text-purple-300/90 space-y-1 mb-8 min-h-[140px]">
          {LINES.slice(0, shown).map((l, i) => (
            <div key={i} className={i === LINES.length - 2 ? 'text-red-400' : ''}>{l}</div>
          ))}
          {phase === 'typing' && <span className="anim-blink">█</span>}
        </div>

        {(phase === 'prompt' || phase === 'penalty') && (
          <div className="sys-window p-6 sm:p-8 anim-pop">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className={`w-7 h-7 grid place-items-center border-2 font-bold font-system ${phase === 'penalty' ? 'border-red-500 text-red-400' : 'border-purple-300 text-purple-200'}`}>!</span>
              <span className={`sys-title text-lg ${phase === 'penalty' ? 'text-red-400' : 'text-purple-100'}`}>
                {phase === 'penalty' ? 'PENALIDADE' : 'NOTIFICAÇÃO'}
              </span>
            </div>

            {phase === 'penalty' ? (
              <div className="text-center space-y-3">
                <Gengar variant="art" mood="angry" className="w-28 h-28 mx-auto" track={false} />
                <p className="text-red-300 font-system text-lg">
                  {PENALTY_LINES[(refusals - 1) % PENALTY_LINES.length]}
                </p>
              </div>
            ) : (
              <>
                <p className="text-center text-lg leading-relaxed text-purple-50">
                  Você adquiriu as qualificações para se tornar um <span className="text-purple-300 font-bold">Jogador</span>.
                  <br />Deseja aceitar?
                </p>
                <p className="text-center text-xs text-purple-400/70 font-code mt-2">
                  (explorar o portfólio rende XP e conquistas)
                </p>
                <div className="relative flex justify-center gap-4 mt-7 h-12">
                  <button
                    onClick={accept}
                    className="px-8 py-2.5 font-system font-bold tracking-widest bg-purple-600 hover:bg-purple-500 text-white border border-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.7)] cursor-pointer transition"
                  >
                    ACEITAR
                  </button>
                  <button
                    onMouseEnter={flee}
                    onClick={refuse}
                    style={{ transform: `translate(${dodge.x}px, ${dodge.y}px)` }}
                    className="px-8 py-2.5 font-system font-bold tracking-widest text-purple-300 border border-purple-700 hover:border-red-500 hover:text-red-400 cursor-pointer transition-all duration-200"
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

