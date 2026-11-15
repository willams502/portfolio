import { useEffect, useRef } from 'react';

export default function BonfireBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Brasas da fogueira (Dark Souls Bonfire) + partículas RGB do setup gamer
    const emberColors = ['#f97316', '#fb923c', '#ef4444', '#fbbf24', '#a855f7', '#38bdf8'];
    const particles = Array.from({ length: 52 }, () => {
      const color = emberColors[Math.floor(Math.random() * emberColors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3.2 + 1.2,
        speedX: (Math.random() - 0.5) * 0.55,
        speedY: -Math.random() * 0.85 - 0.25,
        opacity: Math.random() * 0.65 + 0.2,
        color,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Luz quente da fogueira (esquerda/inferior)
      const bonfireGlow = ctx.createRadialGradient(width * 0.16, height * 0.72, 10, width * 0.16, height * 0.72, 460);
      bonfireGlow.addColorStop(0, 'rgba(234, 88, 12, 0.18)');
      bonfireGlow.addColorStop(0.5, 'rgba(220, 38, 38, 0.08)');
      bonfireGlow.addColorStop(1, 'rgba(8, 5, 10, 0)');
      ctx.fillStyle = bonfireGlow;
      ctx.fillRect(0, 0, width, height);

      // Luz neon do setup gamer (direita/superior)
      const rgbGlow = ctx.createRadialGradient(width * 0.84, height * 0.26, 10, width * 0.84, height * 0.26, 460);
      rgbGlow.addColorStop(0, 'rgba(147, 51, 234, 0.16)');
      rgbGlow.addColorStop(0.5, 'rgba(37, 99, 235, 0.08)');
      rgbGlow.addColorStop(1, 'rgba(8, 5, 10, 0)');
      ctx.fillStyle = rgbGlow;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX + Math.sin(p.y * 0.02) * 0.15;
        p.y += p.speedY;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#08050a]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_0%,rgba(6,3,9,0.86)_100%]" />
    </div>
  );
}
