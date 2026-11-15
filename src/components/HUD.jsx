import { useEffect, useRef, useState } from 'react';
import { Trophy, Volume2, VolumeX, Lock } from 'lucide-react';
import { ACHIEVEMENTS, useGame } from '../game/GameContext';
import { sfx } from '../utils/audio';

export const TABS = [
  { id: 'status', label: 'STATUS', key: '1' },
  { id: 'gates', label: 'DUNGEONS', key: '2' },
  { id: 'army', label: 'FOGUEIRA', key: '3' },
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
    <header className="sticky top-0 z-40 border-b border-orange-500/30 bg-[#08050a]/88 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-4">
        {/* logo */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-8 h-8 grid place-items-center border border-orange-400 text-orange-200 font-system font-extrabold rotate-45 shadow-[0_0_10px_rgba(249,115,22,0.4)]">
            <span className="-rotate-45 text-xs">MW</span>
          </span>
          <span className="hidden md:block sys-title text-xs text-orange-200">TEXUGO.OS</span>
        </div>

        {/* XP do visitante */}
        <div className="flex-1 min-w-0 max-w-sm">
          <div className="flex items-baseline justify-between font-code text-[11px]">
            <span className="text-orange-200/90 truncate">
              CAÇADOR • <b className="text-white">Nv.{level}</b> • Rank <b className="text-amber-400">{rank}</b>
            </span>
            <span className="text-orange-300/70 shrink-0">{xp} XP</span>
          </div>
          <div className="h-1.5 mt-1 bg-orange-950/60 border border-orange-800/60 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 transition-all duration-700 shadow-[0_0_10px_#f97316]"
              style={{ width: `${xpInLevel}%` }}
            />
          </div>
        </div>

        {/* conquistas */}
        <div className="relative" ref={achRef}>
          <button
            onClick={() => { sfx.playClick(); setOpenAch((o) => !o); }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-orange-500/40 hover:border-orange-300 text-orange-100 font-code text-xs cursor-pointer"
            title="Conquistas"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            {unlocked.length}/{total}
          </button>
          {openAch && (
            <div className="absolute right-0 mt-2 w-80 sys-window p-4 anim-pop max-h-[70vh] overflow-y-auto">
              <div className="sys-title text-xs text-orange-200 mb-3">CONQUISTAS</div>
              <ul className="space-y-2">
                {Object.entries(ACHIEVEMENTS).map(([id, a]) => {
                  const got = unlocked.includes(id);
                  return (
                    <li key={id} className={`flex gap-3 items-start p-2 border ${got ? 'border-orange-500/50 bg-orange-950/30' : 'border-orange-950/60 opacity-50'}`}>
                      <span className="text-xl w-7 text-center">{got ? a.icon : <Lock className="w-4 h-4 inline text-orange-500/70" />}</span>
                      <div className="min-w-0">
                        <div className="font-system text-sm text-white">{got ? a.title : '???'}</div>
                        <div className="text-xs text-orange-200/75">{got ? a.desc : 'Continue explorando...'}</div>
                      </div>
                      <span className="ml-auto font-code text-[10px] text-amber-400">+{a.xp}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <button onClick={toggleMute} className="p-1.5 border border-orange-500/40 hover:border-orange-300 text-orange-100 cursor-pointer" title="Som">
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
              className={`group relative px-4 py-2 font-system text-xs tracking-[0.2em] whitespace-nowrap cursor-pointer transition ${active ? 'text-white' : 'text-orange-300/65 hover:text-orange-100'}`}
            >
              <span className={`hidden sm:inline mr-2 px-1 border text-[10px] font-code ${active ? 'border-orange-300 text-orange-200' : 'border-orange-900 text-orange-500/70'}`}>{t.key}</span>
              {active && <span className="text-orange-400 mr-1">▸</span>}
              {t.label}
              <span className={`absolute left-0 right-0 bottom-0 h-0.5 transition ${active ? 'bg-orange-400 shadow-[0_0_10px_#fb923c]' : 'bg-transparent group-hover:bg-orange-800/70'}`} />
            </button>
          );
        })}
      </nav>
    </header>
  );
}

