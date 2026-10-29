import { useEffect, useRef, useState } from 'react';
import { GameProvider, useGame } from './game/GameContext';
import GengarShadowBackground from './components/GengarShadowBackground';
import BootSequence from './components/BootSequence';
import HUD, { TABS } from './components/HUD';
import { GengarCompanion, AchievementToasts } from './components/Overlays';
import Status from './sections/Status';
import Gates from './sections/Gates';
import ShadowArmy from './sections/ShadowArmy';
import DailyQuest from './sections/DailyQuest';
import Guild from './sections/Guild';
import { sfx } from './utils/audio';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const TAB_LINES = {
  status: 'Essa é a ficha dele. Impressionante, né? 😈',
  gates: 'Cada portal é um projeto. Entra, se tiver coragem!',
  army: 'Aperta o botão. Você sabe qual. ERGA-SE!',
  quest: 'Missão diária... ou penalidade. Escolha.',
  guild: 'Vai recrutar? Já tava na hora! 🤝',
};

const SECTIONS = { status: Status, gates: Gates, army: ShadowArmy, quest: DailyQuest, guild: Guild };

function Game() {
  const { unlocked, unlock, say, gigantamax, setGigantamax, reset } = useGame();
  const [booted, setBooted] = useState(false);
  const [tab, setTab] = useState('status');
  const visited = useRef(new Set(['status']));
  const konami = useRef([]);

  const goTo = (id) => {
    setTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // conquistas e falas por aba
  useEffect(() => {
    if (!booted) return;
    visited.current.add(tab);
    if (visited.current.size === TABS.length) unlock('explorer');
    say(TAB_LINES[tab]);
  }, [tab, booted, unlock, say]);

  // atalhos de teclado + konami
  useEffect(() => {
    if (!booted) return;
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const t = TABS.find((x) => x.key === e.key);
      if (t) { sfx.playClick(); goTo(t.id); }

      konami.current = [...konami.current, e.key.length === 1 ? e.key.toLowerCase() : e.key].slice(-KONAMI.length);
      if (konami.current.join() === KONAMI.join()) {
        konami.current = [];
        setGigantamax((g) => !g);
        sfx.playGengarLaugh();
        setTimeout(() => sfx.playLevelUp(), 500);
        unlock('konami');
        say('G I G A N T A M A X ! ! ! 🔴');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [booted, unlock, say, setGigantamax]);

  if (!booted) return (
    <>
      <GengarShadowBackground />
      <BootSequence onDone={() => setBooted(true)} />
      <AchievementToasts />
    </>
  );

  const Section = SECTIONS[tab];

  return (
    <div className={`min-h-screen relative ${gigantamax ? 'gmax' : ''}`}>
      <GengarShadowBackground />
      {gigantamax && <div className="fixed inset-0 -z-[5] pointer-events-none bg-[radial-gradient(circle_at_50%_120%,rgba(239,68,68,0.35),transparent_60%)]" />}

      <HUD tab={tab} setTab={goTo} />

      <main key={tab} className="max-w-6xl mx-auto px-4 py-8 pb-40">
        <Section goTo={goTo} />
      </main>

      <footer className="border-t border-purple-900/50 py-5 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 font-code text-[11px] text-purple-500">
          <span>© {new Date().getFullYear()} Matheus Willams • Sistema das Sombras</span>
          <span className="hidden md:inline">teclas [1-5] navegam • ↑↑↓↓←→←→BA ...</span>
          <button onClick={reset} className="hover:text-red-400 cursor-pointer">[ reiniciar sistema ]</button>
        </div>
      </footer>

      <GengarCompanion />
      <AchievementToasts />
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}
