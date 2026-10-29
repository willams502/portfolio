import { useEffect, useState } from 'react';
import { ExternalLink, Copy, Check, Lock, X } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { GATES } from '../data/portfolioData';
import { useGame } from '../game/GameContext';
import { sfx } from '../utils/audio';

const RANK = {
  S: { color: '#ef4444', label: 'text-red-400', glow: 'rgba(239,68,68,0.55)' },
  A: { color: '#a855f7', label: 'text-purple-300', glow: 'rgba(168,85,247,0.55)' },
  B: { color: '#3b82f6', label: 'text-sky-300', glow: 'rgba(59,130,246,0.5)' },
  C: { color: '#10b981', label: 'text-emerald-300', glow: 'rgba(16,185,129,0.45)' },
};

function Portal({ rank }) {
  const r = RANK[rank];
  return (
    <div className="relative w-32 h-32 mx-auto">
      <div
        className="absolute inset-0 rounded-full anim-spin-slow"
        style={{ background: `conic-gradient(from 0deg, transparent, ${r.color}, transparent 40%, ${r.color}aa, transparent 75%)`, filter: 'blur(6px)' }}
      />
      <div
        className="absolute inset-3 rounded-full anim-spin-rev"
        style={{ background: `conic-gradient(from 90deg, #000, ${r.color}88, #000, ${r.color}55, #000)` }}
      />
      <div
        className="absolute inset-6 rounded-full bg-black"
        style={{ '--gate': r.glow, animation: 'gate-pulse 2.4s ease-in-out infinite' }}
      />
      <span className={`absolute inset-0 grid place-items-center font-system font-extrabold text-3xl ${r.label}`} style={{ textShadow: `0 0 18px ${r.color}` }}>
        {rank}
      </span>
    </div>
  );
}

function CopyField({ label, value }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(value); sfx.playClick(); setOk(true); setTimeout(() => setOk(false), 1500); }}
      className="flex-1 flex items-center justify-between gap-2 px-3 py-2 bg-black/50 border border-purple-800 hover:border-purple-400 font-code text-xs cursor-pointer"
    >
      <span className="text-purple-400">{label}: <b className="text-white">{value}</b></span>
      {ok ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-purple-400" />}
    </button>
  );
}

function Dungeon({ gate, onClose }) {
  const r = RANK[gate.rank];
  const [entering, setEntering] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setEntering(false), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      {entering ? (
        <div className="text-center anim-pop">
          <div className="w-40 h-40 mx-auto rounded-full anim-spin-slow" style={{ background: `conic-gradient(${r.color}, #000, ${r.color}, #000)`, filter: 'blur(4px)' }} />
          <div className="sys-title text-purple-100 mt-6">ENTRANDO NO GATE...</div>
        </div>
      ) : (
        <div className="sys-window w-full max-w-2xl max-h-[88vh] overflow-y-auto p-6 sm:p-8 anim-pop" onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="absolute top-4 right-4 text-purple-400 hover:text-white cursor-pointer" aria-label="Fechar">
            <X className="w-5 h-5" />
          </button>

          <div className="font-code text-xs text-purple-400">VOCÊ ENTROU EM UMA DUNGEON • {gate.type.toUpperCase()}</div>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <h3 className="font-system font-extrabold text-3xl text-white">{gate.name}</h3>
            <span className={`font-code text-xs px-2 py-0.5 border ${r.label}`} style={{ borderColor: r.color }}>RANK {gate.rank}</span>
            <span className="font-code text-[10px] px-2 py-0.5 bg-emerald-900/50 text-emerald-300 border border-emerald-600/50">{gate.status}</span>
          </div>
          <div className="text-purple-300/80 font-code text-xs mt-1">{gate.subtitle}</div>

          <div className="mt-6 space-y-5">
            <div>
              <div className="sys-title text-[10px] text-purple-400 mb-1">📜 BRIEFING</div>
              <p className="text-purple-50 leading-relaxed">{gate.briefing}</p>
            </div>
            <div className="border-l-2 border-red-500 pl-4 bg-red-950/20 py-2">
              <div className="sys-title text-[10px] text-red-400 mb-1">👹 CHEFE DA DUNGEON</div>
              <p className="text-red-100/90">{gate.boss}</p>
              <div className="font-code text-[11px] text-emerald-400 mt-1">✔ DERROTADO</div>
            </div>
            <div>
              <div className="sys-title text-[10px] text-purple-400 mb-2">💎 LOOT OBTIDO</div>
              <div className="flex flex-wrap gap-2">
                {gate.loot.map((l, i) => (
                  <span key={l} className="anim-pop font-code text-xs px-2.5 py-1 border border-purple-500/60 bg-purple-950/60 text-purple-100" style={{ animationDelay: `${i * 0.06}s` }}>
                    {l}
                  </span>
                ))}
              </div>
            </div>

            {gate.creds && (
              <div>
                <div className="sys-title text-[10px] text-purple-400 mb-2">🔑 CHAVE DE ACESSO (DEMO)</div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <CopyField label="Email" value={gate.creds.email} />
                  <CopyField label="Senha" value={gate.creds.pass} />
                </div>
              </div>
            )}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {gate.demo && (
              <a href={gate.demo} target="_blank" rel="noopener noreferrer" onClick={() => sfx.playClick()}
                className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 border border-purple-300 text-white font-system tracking-widest text-sm shadow-[0_0_18px_rgba(168,85,247,0.6)]">
                <ExternalLink className="w-4 h-4" /> JOGAR DEMO
              </a>
            )}
            {gate.github && (
              <a href={gate.github} target="_blank" rel="noopener noreferrer" onClick={() => sfx.playClick()}
                className="flex items-center gap-2 px-5 py-2.5 border border-purple-500/60 hover:border-purple-300 text-purple-100 font-system tracking-widest text-sm">
                <GithubIcon className="w-4 h-4" /> CÓDIGO
              </a>
            )}
            {gate.proprietary && (
              <span className="flex items-center gap-2 px-4 py-2.5 border border-purple-900 text-purple-400 font-code text-xs">
                <Lock className="w-3.5 h-3.5" /> Código proprietário da empresa — demo sob pedido
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Gates() {
  const { unlock, say } = useGame();
  const [open, setOpen] = useState(null);
  const [visited, setVisited] = useState(() => new Set());

  const enter = (g) => {
    sfx.playSystemAlert();
    setOpen(g);
    unlock('firstGate');
    const next = new Set(visited).add(g.id);
    setVisited(next);
    if (next.size === GATES.length) unlock('allGates');
    if (g.rank === 'S') say('Rank S?! Esse aqui deu trabalho, hein... 😈');
  };

  return (
    <section>
      <div className="mb-6">
        <div className="sys-title text-xs text-purple-300">[ GATES ABERTOS ]</div>
        <h2 className="font-system font-extrabold text-3xl text-white mt-1">Escolha uma dungeon</h2>
        <p className="text-purple-300/80 font-code text-xs mt-1">
          {visited.size}/{GATES.length} explorados • clique em um portal para entrar
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {GATES.map((g, i) => (
          <button
            key={g.id}
            onClick={() => enter(g)}
            className="group sys-window p-6 text-left cursor-pointer hover:-translate-y-1 transition-transform anim-pop"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            {visited.has(g.id) && (
              <span className="absolute top-3 right-4 font-code text-[10px] text-emerald-400">✔ EXPLORADO</span>
            )}
            <div className="group-hover:scale-110 transition-transform duration-500">
              <Portal rank={g.rank} />
            </div>
            <div className="mt-5 text-center">
              <div className="font-system font-bold text-xl text-white group-hover:text-purple-200">{g.name}</div>
              <div className="font-code text-[11px] text-purple-400 mt-0.5">{g.subtitle}</div>
              <div className="mt-3 inline-block font-code text-[10px] tracking-widest px-3 py-1 border border-purple-700 text-purple-300 group-hover:border-purple-300 group-hover:text-white">
                ENTRAR ▸
              </div>
            </div>
          </button>
        ))}
      </div>

      <a
        href="https://github.com/willams502?tab=repositories"
        target="_blank" rel="noopener noreferrer"
        className="mt-6 sys-window p-5 flex flex-wrap items-center justify-between gap-3 hover:brightness-125 transition"
      >
        <div>
          <div className="font-system text-white text-lg">+40 gates menores no GitHub</div>
          <div className="font-code text-xs text-purple-300/80">Estudos, desafios técnicos e experimentos — @willams502</div>
        </div>
        <span className="flex items-center gap-2 font-system tracking-widest text-sm text-purple-200">
          <GithubIcon className="w-5 h-5" /> EXPLORAR ▸
        </span>
      </a>

      {open && <Dungeon gate={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
