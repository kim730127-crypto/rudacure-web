"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  radius: number;
  rgb: string;
  speed: number;
}

const COLORS = [
  "13, 148, 136",
  "13, 148, 136",
  "6, 182, 212",
  "59, 130, 246",
  "99, 102, 241",
  "168, 85, 247",
  "236, 72, 153",
  "220, 60, 60",
  "245, 158, 11",
  "16, 185, 129",
  "255, 255, 255",
  "255, 255, 255",
  "200, 220, 255",
];

export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let stars: Star[] = [];
    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let warpSpeed = 3;
    let targetSpeed = 0.3;

    const STAR_COUNT = 250;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      cx = w * 0.5;
      cy = h * 0.5;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    const spawnStar = (initialZ?: number): Star => {
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * Math.max(w, h) * 0.8;
      const z = initialZ ?? Math.random();

      return {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        z,
        radius: 0.5 + Math.random() * 1.5,
        rgb: COLORS[Math.floor(Math.random() * COLORS.length)],
        speed: 0.002 + Math.random() * 0.004,
      };
    };

    const init = () => {
      stars = Array.from({ length: STAR_COUNT }, () => spawnStar());
      warpSpeed = 3;
    };

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      frame++;

      if (warpSpeed > targetSpeed) {
        warpSpeed *= 0.988;
        if (warpSpeed < targetSpeed) warpSpeed = targetSpeed;
      }

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const prevZ = s.z;

        s.z -= s.speed * warpSpeed;

        if (s.z <= 0.001) {
          stars[i] = spawnStar(0.9 + Math.random() * 0.1);
          continue;
        }

        const scale = 1 / s.z;
        const sx = cx + s.x * scale;
        const sy = cy + s.y * scale;

        if (sx < -50 || sx > w + 50 || sy < -50 || sy > h + 50) {
          stars[i] = spawnStar(0.8 + Math.random() * 0.2);
          continue;
        }

        const prevScale = 1 / prevZ;
        const psx = cx + s.x * prevScale;
        const psy = cy + s.y * prevScale;

        const r = s.radius * Math.min(scale * 0.15, 4);
        const alpha = Math.min((1 - s.z) * 1.2, 0.9);

        if (alpha <= 0.02) continue;

        // Warp trail
        if (warpSpeed > 0.5) {
          const trailAlpha = alpha * Math.min((warpSpeed - 0.5) / 2.5, 1) * 0.4;
          if (trailAlpha > 0.01) {
            ctx.beginPath();
            ctx.moveTo(psx, psy);
            ctx.lineTo(sx, sy);
            ctx.strokeStyle = `rgba(${s.rgb}, ${trailAlpha})`;
            ctx.lineWidth = r * 0.8;
            ctx.stroke();
          }
        }

        // Star body
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.rgb}, ${alpha})`;
        ctx.fill();

        // Glow
        if (r > 1.5) {
          ctx.beginPath();
          ctx.arc(sx, sy, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${s.rgb}, ${alpha * 0.08})`;
          ctx.fill();
        }
      }

      // Connection lines after settled
      if (warpSpeed < 0.8) {
        const connAlpha = Math.min((0.8 - warpSpeed) / 0.5, 1);
        for (let i = 0; i < stars.length; i++) {
          const a = stars[i];
          if (a.z > 0.6) continue;
          const aScale = 1 / a.z;
          const ax = cx + a.x * aScale;
          const ay = cy + a.y * aScale;

          for (let j = i + 1; j < stars.length; j++) {
            const b = stars[j];
            if (b.z > 0.6) continue;
            const bScale = 1 / b.z;
            const bx = cx + b.x * bScale;
            const by = cy + b.y * bScale;

            const dx = ax - bx;
            const dy = ay - by;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              const strength = (1 - dist / 120) * 0.15 * connAlpha;
              const grad = ctx.createLinearGradient(ax, ay, bx, by);
              grad.addColorStop(0, `rgba(${a.rgb}, ${strength})`);
              grad.addColorStop(1, `rgba(${b.rgb}, ${strength})`);

              ctx.beginPath();
              ctx.moveTo(ax, ay);
              ctx.lineTo(bx, by);
              ctx.strokeStyle = grad;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    const onResize = () => { resize(); init(); };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
