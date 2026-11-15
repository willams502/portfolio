import { useState } from 'react';
import { CHRONICLES } from '../data/portfolioData';
import { useGame } from '../game/GameContext';
import { sfx } from '../utils/audio';

const TASKS = [
  { id: 'commits', label: 'Commits', goal: 10, step: 1 },
  { id: 'bugs', label: 'Bugs esmagados', goal: 100, step: 25 },
  { id: 'coffee', label: 'Cafés', goal: 4, step: 1 },
  { id: 'deploy', label: 'Deploy sem quebrar produção', goal: 1, step: 1 },
];

export default function DailyQuest() {
  const { unlock, say } = useGame();
  const [prog, setProg] = useState({ commits: 7, bugs: 50, coffee: 3, deploy: 0 });
  const [claimed, setClaimed] = useState(false);

  const allDone = TASKS.every((t) => prog[t.id] >= t.goal);

  const train = (t) => {
    if (prog[t.id] >= t.goal) return;
    sfx.playClick();
    setProg((p) => ({ ...p, [t.id]: Math.min(t.goal, p[t.id] + t.step) }));
    if (t.id === 'coffee') say('☕ +25 ESTUS (Eat. Code. Hunt. Repeat.)');
  };

  const claim = () => {
    setClaimed(true);
    sfx.playLevelUp();
    unlock('daily');
    say('Sem YOU DIED hoje. O Texugo tá imparável! 🔥');
  };

  return (
    <section className="grid lg:grid-cols-2 gap-6">
      {/* janela da missão diária */}
      <div className="sys-window p-6 sm:p-8 anim-pop">
        <div className="flex items-center justify-center gap-3">
          <span className="w-6 h-6 grid place-items-center border-2 border-orange-200 text-orange-100 font-bold text-sm">!</span>
          <span className="sys-title text-orange-100">MISSÃO DIÁRIA</span>
        </div>
        <p className="text-center text-orange-200 mt-2 font-system">Eat. Code. Hunt. Repeat. — treino sem piedade</p>

        <div className="mt-6 space-y-3">
          {TASKS.map((t) => {
            const done = prog[t.id] >= t.goal;
            return (
              <button
                key={t.id}
                onClick={() => train(t)}
                className={`w-full flex items-center justify-between gap-4 px-4 py-3 border font-code text-sm transition cursor-pointer
                  ${done ? 'border-emerald-600/50 bg-emerald-950/20' : 'border-orange-900/80 hover:border-orange-400 bg-black/30'}`}
              >
                <span className={done ? 'text-emerald-300' : 'text-orange-100'}>{t.label}</span>
                <span className="flex items-center gap-3">
                  <span className={done ? 'text-emerald-400' : 'text-white'}>[{prog[t.id]}/{t.goal}]</span>
                  <span className={`w-5 h-5 grid place-items-center border ${done ? 'border-emerald-400 text-emerald-400' : 'border-orange-600 text-orange-500'}`}>
                    {done ? '✔' : '+'}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-center text-xs text-orange-300/70 font-code mt-4">clique nas tarefas para treinar</p>

        {allDone && !claimed && (
          <button onClick={claim} className="mt-5 w-full py-3 bg-orange-600 hover:bg-orange-500 border border-orange-200 text-white font-system tracking-widest shadow-[0_0_20px_rgba(249,115,22,0.7)] anim-pop cursor-pointer">
            RESGATAR RECOMPENSA
          </button>
        )}
        {claimed && (
          <div className="mt-5 p-3 border border-emerald-500/50 bg-emerald-950/30 text-center anim-pop">
            <div className="sys-title text-xs text-emerald-300">MISSÃO CONCLUÍDA</div>
            <div className="font-code text-xs text-emerald-200/90 mt-1">Recompensa: Estus cheio • +3 pontos de atributo • 1 Pokéball Misteriosa</div>
          </div>
        )}

        <div className="mt-6 border-t border-red-900/60 pt-4 text-center">
          <span className="font-code text-xs text-red-400">⚠ AVISO: </span>
          <span className="font-code text-xs text-red-300/90">pular o café resulta em perda imediata de sanidade em produção.</span>
        </div>
      </div>

      {/* crônicas */}
      <div className="sys-window p-6 sm:p-8 anim-pop" style={{ animationDelay: '0.1s' }}>
        <div className="sys-title text-xs text-orange-300 mb-5">[ CRÔNICAS DO TEXUGO ]</div>
        <ol className="relative border-l border-orange-700/60 ml-3 space-y-6">
          {CHRONICLES.map((c) => (
            <li key={c.ch} className="pl-6 relative">
              <span className={`absolute -left-[13px] top-0 w-6 h-6 grid place-items-center text-[10px] font-code border rotate-45 ${c.locked ? 'bg-black border-red-500 text-red-400' : 'bg-orange-950 border-orange-400 text-orange-100'}`}>
                <span className="-rotate-45">{c.ch}</span>
              </span>
              <div className={`font-system font-bold ${c.locked ? 'text-red-400' : 'text-white'}`}>{c.title}</div>
              <p className={`text-sm ${c.locked ? 'text-red-300/70 italic' : 'text-orange-100/80'}`}>{c.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

