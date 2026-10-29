import React, { useEffect, useRef } from 'react';

export default function GengarShadowBackground() {
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

    // Particle class for floating shadow orbs & purple mist
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 4 + 1.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.6 - 0.2, // float upwards like shadow mist
      opacity: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.3 ? '#9333ea' : '#c084fc',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint gradient radial spotlights
      const grad1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 10, width * 0.2, height * 0.3, 400);
      grad1.addColorStop(0, 'rgba(88, 28, 135, 0.15)');
      grad1.addColorStop(1, 'rgba(6, 2, 12, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 10, width * 0.8, height * 0.7, 450);
      grad2.addColorStop(0, 'rgba(126, 34, 206, 0.12)');
      grad2.addColorStop(1, 'rgba(6, 2, 12, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Draw floating particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#a855f7';
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
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#06020c]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Scanline CRT overlay */}
      <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />
      {/* Dark vignette */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_0%,rgba(4,1,8,0.85)_100%]" />
    </div>
  );
}

