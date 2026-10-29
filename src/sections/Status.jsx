import Gengar from '../components/Gengar';
import { HUNTER } from '../data/portfolioData';

const RARITY = {
  rare: 'text-sky-300 border-sky-500/50',
  epic: 'text-purple-300 border-purple-400/60',
  legendary: 'text-amber-300 border-amber-400/60',
  mythic: 'text-red-300 border-red-500/60',
};

function Radar({ stats }) {
  const size = 240, c = size / 2, R = 88;
  const pt = (i, v) => {
    const a = (Math.PI * 2 * i) / stats.length - Math.PI / 2;
    return [c + Math.cos(a) * R * v, c + Math.sin(a) * R * v];
  };
  const poly = (v) => stats.map((_, i) => pt(i, v).join(',')).join(' ');
  const shape = stats.map((s, i) => pt(i, s.value / 100).join(',')).join(' ');

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[280px] mx-auto">
      {[0.25, 0.5, 0.75, 1].map((v) => (
        <polygon key={v} points={poly(v)} fill="none" stroke="#4c1d95" strokeWidth="1" />
      ))}
      {stats.map((_, i) => {
        const [x, y] = pt(i, 1);
        return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="#3b0764" />;
      })}
      <polygon points={shape} fill="rgba(168,85,247,0.35)" stroke="#c084fc" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 8px #a855f7)' }} />
      {stats.map((s, i) => {
        const [x, y] = pt(i, s.value / 100);
        const [lx, ly] = pt(i, 1.22);
        return (
          <g key={s.key}>
            <circle cx={x} cy={y} r="3.5" fill="#ef4444" />
            <text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" className="fill-purple-200 font-code" fontSize="10">
              {s.key}
            </text>
            <text x={lx} y={ly + 12} textAnchor="middle" dominantBaseline="middle" className="fill-white font-code" fontSize="10" fontWeight="bold">
              {s.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function Bar({ label, value, max, from, to, text }) {
  return (
    <div>
      <div className="flex justify-between font-code text-xs mb-1">
        <span className={text}>{label}</span>
        <span className="text-white">{value}/{max}</span>
      </div>
      <div className="h-3 bg-black/60 border border-purple-900 p-[2px]">
        <div className={`h-full bg-gradient-to-r ${from} ${to}`} style={{ width: `${(value / max) * 100}%` }} />
      </div>
    </div>
  );
}

export default function Status({ goTo }) {
  return (
    <section className="grid lg:grid-cols-5 gap-6">
      {/* Ficha do personagem */}
      <div className="lg:col-span-3 sys-window p-6 sm:p-8 overflow-hidden anim-pop">
        {/* Gengar gigante como sombra do jogador */}
        <div className="absolute -right-8 -bottom-8 w-72 h-72 opacity-20 pointer-events-none">
          <Gengar variant="art" track={false} className="w-full h-full" />
        </div>

        <div className="relative">
          <div className="sys-title text-xs text-purple-300 mb-4">[ STATUS ]</div>

          <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
            <h1 className="font-system font-extrabold text-4xl sm:text-5xl text-white glitch" data-text={HUNTER.name}>
              {HUNTER.name}
            </h1>
            <span className="font-code text-sm px-2 py-0.5 bg-red-600/80 text-white shadow-[0_0_12px_#ef4444]">RANK S</span>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 font-code text-xs">
            {[
              ['NÍVEL', HUNTER.level],
              ['CLASSE', HUNTER.class],
              ['TÍTULO', HUNTER.title],
              ['AFINIDADE', 'Fantasma 👻'],
            ].map(([k, v]) => (
              <div key={k} className="border border-purple-800/60 bg-black/30 p-2">
                <div className="text-purple-500 text-[10px]">{k}</div>
                <div className="text-purple-50 font-bold truncate">{v}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <Bar label="HP • Resiliência em produção" value={100} max={100} from="from-red-700" to="to-red-400" text="text-red-400" />
            <Bar label="MP • Café no sangue" value={94} max={100} from="from-purple-700" to="to-fuchsia-400" text="text-purple-300" />
            <div className="flex justify-between font-code text-xs pt-1">
              <span className="text-purple-400">FADIGA</span>
              <span className="text-emerald-400">0 • pronto para novas raids</span>
            </div>
          </div>

          <div className="mt-6 border-t border-purple-800/50 pt-4 space-y-2">
            <div className="sys-title text-[10px] text-purple-400">LORE DO PERSONAGEM</div>
            {HUNTER.lore.map((l, i) => (
              <p key={i} className="text-purple-100/90 leading-relaxed">{l}</p>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={() => goTo('gates')} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 border border-purple-300 text-white font-system tracking-widest text-sm shadow-[0_0_18px_rgba(168,85,247,0.6)] cursor-pointer">
              ENTRAR NOS GATES ▸
            </button>
            <button onClick={() => goTo('guild')} className="px-5 py-2.5 border border-red-500/60 hover:bg-red-950/50 text-red-300 font-system tracking-widest text-sm cursor-pointer">
              RECRUTAR
            </button>
          </div>
        </div>
      </div>

      {/* Coluna direita */}
      <div className="lg:col-span-2 space-y-6">
        <div className="sys-window p-6 anim-pop" style={{ animationDelay: '0.1s' }}>
          <div className="sys-title text-xs text-purple-300 mb-2">[ ATRIBUTOS ]</div>
          <Radar stats={HUNTER.stats} />
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-code text-[11px] mt-2">
            {HUNTER.stats.map((s) => (
              <div key={s.key} className="flex justify-between text-purple-300">
                <span>{s.key}</span><span className="text-purple-100">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sys-window p-6 anim-pop" style={{ animationDelay: '0.2s' }}>
          <div className="sys-title text-xs text-purple-300 mb-3">[ EQUIPAMENTO ]</div>
          <div className="space-y-2">
            {HUNTER.equipment.map((e) => (
              <div key={e.name} className={`border bg-black/30 px-3 py-2 ${RARITY[e.rarity]}`}>
                <div className="flex justify-between items-baseline">
                  <span className="font-system font-bold">{e.name}</span>
                  <span className="font-code text-[10px] opacity-70">{e.slot}</span>
                </div>
                <div className="font-code text-[11px] text-purple-200/70">{e.bonus}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

