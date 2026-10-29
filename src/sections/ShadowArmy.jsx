import { useState } from 'react';
import { SHADOWS } from '../data/portfolioData';
import { useGame } from '../game/GameContext';
import { sfx } from '../utils/audio';

const GRADE_STYLE = {
  MARECHAL: 'text-red-300 border-red-500/60',
  ELITE: 'text-amber-300 border-amber-500/50',
  CAVALEIRO: 'text-purple-200 border-purple-400/50',
  SOLDADO: 'text-slate-300 border-slate-500/50',
};

function Silhouette({ color, risen }) {
  // soldado sombrio estilizado
  return (
    <svg viewBox="0 0 60 80" className="w-16 h-20 mx-auto">
      <g fill={risen ? '#0b0414' : '#120a1d'} stroke={risen ? color : '#2a1a3d'} strokeWidth="1.5">
        <path d="M30 6 C38 6 42 13 41 20 C40 26 36 29 30 29 C24 29 20 26 19 20 C18 13 22 6 30 6 Z" />
        <path d="M14 76 L17 42 C18 34 23 31 30 31 C37 31 42 34 43 42 L46 76 Z" />
        <path d="M17 42 L8 60 L12 62 L20 48 Z" />
        <path d="M43 42 L52 60 L48 62 L40 48 Z" />
      </g>
      {risen && (
        <>
          <path d="M24 18 L28 19" stroke={color} strokeWidth="2.5" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 3px ${color})` }} />
          <path d="M36 18 L32 19" stroke={color} strokeWidth="2.5" strokeLinecap="round" style={{ filter: `drop-shadow(0 0 3px ${color})` }} />
        </>
      )}
    </svg>
  );
}

export default function ShadowArmy() {
  const { unlock, say } = useGame();
  const [risen, setRisen] = useState(0);
  const [casting, setCasting] = useState(false);

  const arise = () => {
    if (casting || risen === SHADOWS.length) return;
    setCasting(true);
    sfx.playSystemAlert();
    say('ERGA-SE! 💜', 3000);
    SHADOWS.forEach((_, i) => {
      setTimeout(() => {
        sfx.playClick();
        setRisen(i + 1);
        if (i === SHADOWS.length - 1) {
          setCasting(false);
          sfx.playLevelUp();
          unlock('arise');
        }
      }, 400 + i * 260);
    });
  };

  const done = risen === SHADOWS.length;

  return (
    <section>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <div className="sys-title text-xs text-purple-300">[ EXÉRCITO DE SOMBRAS ]</div>
          <h2 className="font-system font-extrabold text-3xl text-white mt-1">Minha stack, invocada</h2>
          <p className="text-purple-300/80 font-code text-xs mt-1">
            {done ? `${SHADOWS.length} sombras sob seu comando.` : 'Os corpos dos inimigos derrotados aguardam. Use a habilidade.'}
          </p>
        </div>

        <button
          onClick={arise}
          disabled={casting || done}
          className={`relative px-8 py-4 font-system font-extrabold text-xl tracking-[0.3em] border-2 transition cursor-pointer disabled:cursor-default
            ${done ? 'border-purple-800 text-purple-500' : 'border-purple-300 text-white bg-purple-700/40 hover:bg-purple-600/60 shadow-[0_0_35px_rgba(168,85,247,0.8)]'}`}
          style={{ textShadow: done ? 'none' : '0 0 14px #c084fc' }}
        >
          {done ? 'INVOCADOS' : casting ? 'INVOCANDO...' : 'ERGA-SE!'}
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {SHADOWS.map((s, i) => {
          const up = i < risen;
          return (
            <div
              key={s.name}
              className={`sys-window p-5 transition-all duration-500 ${up ? '' : 'grayscale opacity-50'}`}
              style={up ? { boxShadow: `0 0 28px ${s.color}55` } : undefined}
            >
              {up && <div className="absolute left-1/2 top-12 -translate-x-1/2 w-20 h-20 rounded-full anim-smoke pointer-events-none" style={{ background: `radial-gradient(${s.color}aa, transparent 70%)` }} />}
              <div className={up ? 'anim-arise' : ''}>
                <Silhouette color={s.color} risen={up} />
              </div>
              {up ? (
                <div className="text-center mt-3 anim-pop">
                  <div className={`inline-block font-code text-[9px] tracking-widest px-1.5 border ${GRADE_STYLE[s.grade]}`}>{s.grade}</div>
                  <div className="font-system font-extrabold text-xl text-white mt-1.5" style={{ textShadow: `0 0 12px ${s.color}` }}>{s.tech}</div>
                  <div className="font-code text-[11px] text-purple-400">sombra “{s.name}”</div>
                  <p className="text-sm text-purple-100/80 mt-2 leading-snug">{s.desc}</p>
                </div>
              ) : (
                <div className="text-center mt-3 font-code text-purple-700 text-sm">???</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

