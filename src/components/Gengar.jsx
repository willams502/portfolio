import { useEffect, useRef, useState } from 'react';

/**
 * Gengar oficial (sprites do PokeAPI em /public/gengar).
 * variant: 'sprite' (animado, pixel art) | 'art' (artwork oficial)
 * mood: 'idle' | 'laugh' | 'angry'
 * mega: usa a forma Mega Gengar
 * track: inclina levemente na direção do cursor
 */
export default function Gengar({ className = '', mood = 'idle', track = true, variant = 'sprite', mega = false }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState(0);

  useEffect(() => {
    if (!track) return;
    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      setTilt(Math.max(-12, Math.min(12, dx / 40)));
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [track]);

  const base = import.meta.env.BASE_URL || './';
  const src = variant === 'art'
    ? `${base}gengar/${mega ? 'mega-art' : 'art'}.png`
    : `${base}gengar/${mega ? 'mega' : 'idle'}.gif`;

  const moodClass = mood === 'laugh' ? 'anim-shake scale-110' : '';
  const glow = mood === 'angry'
    ? 'drop-shadow(0 0 14px rgba(239,68,68,0.9))'
    : 'drop-shadow(0 0 12px rgba(168,85,247,0.7))';

  return (
    <div ref={ref} className={`grid place-items-center ${className}`}>
      <img
        src={src}
        alt={mega ? 'Mega Gengar' : 'Gengar'}
        draggable={false}
        className={`max-w-full max-h-full object-contain select-none transition-transform duration-300 ${moodClass}`}
        style={{
          transform: `rotate(${tilt}deg)`,
          filter: glow,
          imageRendering: variant === 'sprite' ? 'pixelated' : 'auto',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
