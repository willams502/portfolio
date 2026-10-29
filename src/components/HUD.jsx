import { useEffect, useRef, useState } from 'react';
import { Trophy, Volume2, VolumeX, Lock } from 'lucide-react';
import { ACHIEVEMENTS, useGame } from '../game/GameContext';
import { sfx } from '../utils/audio';

export const TABS = [
  { id: 'status', label: 'STATUS', key: '1' },
  { id: 'gates', label: 'GATES', key: '2' },
  { id: 'army', label: 'EXÉRCITO', key: '3' },
  { id: 'quest', label: 'MISSÃO', key: '4' },
  { id: 'guild', label: 'GUILDA', key: '5' },
];

export default function HUD({ tab, setTab }) {
  const { level, rank, xp, xpInLevel, unlocked } = useGame();
  const [muted, setMuted] = useState(false);
  const [openAch, setOpenAch] = useState(false);
  const achRef = useRef(null);

  useEffect(() => {
    const close = (e) => { if (achRef.current && !achRef.current.contains(e.target)) setOpenAch(false); };
    window.addEventListener('mousedown', close);
    return () => window.removeEventListener('mousedown', close);
  }, []);

  const toggleMute = () => {
    sfx.muted = !muted;
    setMuted(!muted);
    if (muted) sfx.playClick();
  };

  const total = Object.keys(ACHIEVEMENTS).length;

  return (
    <header className="sticky top-0 z-40 border-b border-purple-500/30 bg-[#07020f]/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-4">
        {/* logo */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-8 h-8 grid place-items-center border border-purple-400 text-purple-200 font-system font-extrabold rotate-45">
            <span className="-rotate-45 text-xs">MW</span>
          </span>
          <span className="hidden md:block sys-title text-xs text-purple-200">SISTEMA</span>
        </div>

        {/* XP do visitante */}
        <div className="flex-1 min-w-0 max-w-sm">
          <div className="flex items-baseline justify-between font-code text-[11px]">
            <span className="text-purple-300 truncate">
              VOCÊ • <b className="text-white">Nv.{level}</b> • Rank <b className="text-red-400">{rank}</b>
            </span>
            <span className="text-purple-400/70 shrink-0">{xp} XP</span>
          </div>
          <div className="h-1.5 mt-1 bg-purple-950 border border-purple-800/60 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-red-500 transition-all duration-700 shadow-[0_0_10px_#a855f7]"
              style={{ width: `${xpInLevel}%` }}
            />
          </div>
        </div>

        {/* conquistas */}
        <div className="relative" ref={achRef}>
          <button
            onClick={() => { sfx.playClick(); setOpenAch((o) => !o); }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-purple-500/40 hover:border-purple-300 text-purple-200 font-code text-xs cursor-pointer"
            title="Conquistas"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            {unlocked.length}/{total}
          </button>
          {openAch && (
            <div className="absolute right-0 mt-2 w-80 sys-window p-4 anim-pop max-h-[70vh] overflow-y-auto">
              <div className="sys-title text-xs text-purple-200 mb-3">CONQUISTAS</div>
              <ul className="space-y-2">
                {Object.entries(ACHIEVEMENTS).map(([id, a]) => {
                  const got = unlocked.includes(id);
                  return (
                    <li key={id} className={`flex gap-3 items-start p-2 border ${got ? 'border-purple-500/50 bg-purple-900/30' : 'border-purple-900/40 opacity-50'}`}>
                      <span className="text-xl w-7 text-center">{got ? a.icon : <Lock className="w-4 h-4 inline text-purple-500" />}</span>
                      <div className="min-w-0">
                        <div className="font-system text-sm text-white">{got ? a.title : '???'}</div>
                        <div className="text-xs text-purple-300/80">{got ? a.desc : 'Continue explorando...'}</div>
                      </div>
                      <span className="ml-auto font-code text-[10px] text-amber-400">+{a.xp}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <button onClick={toggleMute} className="p-1.5 border border-purple-500/40 hover:border-purple-300 text-purple-200 cursor-pointer" title="Som">
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* menu estilo jogo */}
      <nav className="max-w-6xl mx-auto px-4 flex gap-1 overflow-x-auto no-scrollbar">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => { sfx.playClick(); setTab(t.id); }}
              className={`group relative px-4 py-2 font-system text-xs tracking-[0.2em] whitespace-nowrap cursor-pointer transition ${active ? 'text-white' : 'text-purple-400/70 hover:text-purple-200'}`}
            >
              <span className={`hidden sm:inline mr-2 px-1 border text-[10px] font-code ${active ? 'border-purple-300 text-purple-200' : 'border-purple-800 text-purple-600'}`}>{t.key}</span>
              {active && <span className="text-red-400 mr-1">▸</span>}
              {t.label}
              <span className={`absolute left-0 right-0 bottom-0 h-0.5 transition ${active ? 'bg-purple-400 shadow-[0_0_10px_#c084fc]' : 'bg-transparent group-hover:bg-purple-800'}`} />
            </button>
          );
        })}
      </nav>
    </header>
  );
}

