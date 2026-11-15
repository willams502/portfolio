import { useEffect, useRef, useState } from 'react';

/**
 * Mascote Texugo do Mel (Eat. Code. Hunt. Repeat.) em /public/honey-badger/avatar.jpg.
 * variant: 'avatar' (com moldura gamer/bonfire) | 'watermark' (fundo sutil)
 * mood: 'idle' | 'laugh' | 'angry'
 * mega: modo Fúria / Bonfire Overdrive
 * track: inclina levemente na direção do cursor
 */
export default function HoneyBadger({
  className = '',
  mood = 'idle',
  track = true,
  variant = 'avatar',
  mega = false,
}) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState(0);

  useEffect(() => {
    if (!track) return;
    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      setTilt(Math.max(-10, Math.min(10, dx / 45)));
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [track]);

  const base = import.meta.env.BASE_URL || './';
  const src = `${base}honey-badger/avatar.jpg`;

  const moodClass = mood === 'laugh' ? 'anim-shake scale-110' : '';
  const glow =
    mood === 'angry' || mega
      ? 'drop-shadow(0 0 16px rgba(239,68,68,0.95))'
      : 'drop-shadow(0 0 14px rgba(249,115,22,0.75))';

  const isWatermark = variant === 'watermark';

  return (
    <div ref={ref} className={`grid place-items-center ${className}`}>
      <img
        src={src}
        alt={mega ? 'Texugo do Mel em Fúria' : 'Texugo do Mel'}
        draggable={false}
        className={`w-full h-full object-cover select-none transition-transform duration-300 ${moodClass} ${
          isWatermark
            ? 'rounded-2xl'
            : `rounded-full border-2 ${
                mood === 'angry' || mega
                  ? 'border-red-500'
                  : 'border-orange-400/90 ring-2 ring-purple-500/40'
              }`
        }`}
        style={{
          transform: `rotate(${tilt}deg)`,
          filter: glow,
        }}
      />
    </div>
  );
}
