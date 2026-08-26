"use client";

import { useEffect, useRef } from "react";

/**
 * MembraneHero
 * ---------------------------------------------------------------------------
 * The company's identity is membrane-protein (ion channel / GPCR) targeted
 * drug discovery — not any single indication. This replaces the dry-eye
 * close-up photograph, which described RCI001 only.
 *
 * What is drawn, and why it is scientifically legible rather than decorative:
 *   · a phospholipid bilayer  — head groups + acyl tails, gently undulating
 *   · three transmembrane channels — one conducting, one ligand-blocked
 *   · Ca2+ ions               — permeating the open pore, deflected at the
 *                               blocked pore, which is literally RudaCure's
 *                               mechanism (selective TRPV1 modulation)
 *
 * Restraint rules it follows: one accent hue, no rainbow particles, no warp
 * streaks, opacity capped well below full, motion slow enough to read as
 * ambient rather than animated.
 */

type Ion = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  /** Index of the channel this ion is committed to, or -1 while drifting. */
  target: number;
  /** 0 = above membrane, 1 = permeating, 2 = below membrane, 3 = deflected */
  phase: number;
  seed: number;
};

/** x-position as a fraction of width, and whether the pore conducts. */
const CHANNELS: { at: number; open: boolean }[] = [
  { at: 0.3, open: true },
  { at: 0.62, open: false },
  { at: 0.87, open: true },
];

const ACCENT = "20, 184, 166";
const ACCENT_DEEP = "13, 148, 136";
const LIPID = "148, 176, 184";

export function MembraneHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;
    let ions: Ion[] = [];
    let running = true;

    /* ── Geometry ─────────────────────────────────────────────────────────
       The bilayer sits in the bottom quarter so it never competes with the
       headline block, which occupies the optical centre-left. `membraneY` is
       the mid-plane; heads sit ±halfThickness. */
    const membraneY = () => h * 0.84;
    const halfThickness = () => Math.min(30, Math.max(19, h * 0.032));

    /* Ions only exist in the band around the membrane. Scattering them over
       the full frame produced a starfield behind the headline — decorative
       noise, and the exact texture the redesign is removing. */
    const ionCeiling = () => membraneY() - h * 0.3;

    /** Sinusoidal undulation of the mid-plane at a given x. */
    const wave = (x: number) =>
      Math.sin(x * 0.0042 + t * 0.00035) * 9 +
      Math.sin(x * 0.0016 - t * 0.00022) * 5;

    const channelX = (i: number) => CHANNELS[i].at * w;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnIon = (fromTop = true): Ion => {
      const top = ionCeiling();
      return {
        x: Math.random() * w,
        y: fromTop
          ? top + Math.random() * (membraneY() - top) * 0.9
          : membraneY() + 30 + Math.random() * Math.max(20, h - membraneY() - 30),
        vx: (Math.random() - 0.5) * 0.16,
        vy: fromTop ? 0.14 + Math.random() * 0.24 : 0.04 + Math.random() * 0.08,
        r: 1.2 + Math.random() * 1.4,
        target: -1,
        phase: fromTop ? 0 : 2,
        seed: Math.random() * 1000,
      };
    };

    const init = () => {
      const count = Math.round(Math.min(46, Math.max(20, w / 34)));
      ions = Array.from({ length: count }, (_, i) => spawnIon(i % 5 !== 0));
    };

    /* ── Bilayer ──────────────────────────────────────────────────────────
       Two leaflets of head groups over a soft hydrophobic core. Head groups
       only, no explicit acyl tails: a row of short vertical strokes reads as
       ruler ticks, not as lipid. */
    const drawBilayer = () => {
      const my = membraneY();
      const ht = halfThickness();
      const spacing = 15;
      const headR = 2.4;

      // Hydrophobic core: a soft band, brightest at the mid-plane.
      const core = ctx.createLinearGradient(0, my - ht, 0, my + ht);
      core.addColorStop(0, `rgba(${LIPID}, 0)`);
      core.addColorStop(0.5, `rgba(${LIPID}, 0.05)`);
      core.addColorStop(1, `rgba(${LIPID}, 0)`);
      ctx.fillStyle = core;
      ctx.fillRect(0, my - ht - 14, w, ht * 2 + 28);

      for (let x = -spacing; x < w + spacing; x += spacing) {
        const yMid = my + wave(x);

        // Fade the leaflet toward the frame edges so it never hard-stops.
        const edge = Math.min(1, Math.min(x, w - x) / (w * 0.18));
        if (edge <= 0) continue;

        // Skip head groups where a channel protein occupies the leaflet.
        let occluded = false;
        for (let c = 0; c < CHANNELS.length; c++) {
          if (Math.abs(x - channelX(c)) < 40) occluded = true;
        }
        if (occluded) continue;

        for (const side of [-1, 1] as const) {
          const yHead = yMid + side * ht;
          const breathe = 1 + Math.sin(x * 0.03 + t * 0.0012) * 0.12;

          ctx.beginPath();
          ctx.arc(x, yHead, headR * breathe, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${LIPID}, ${0.22 * edge})`;
          ctx.fill();
        }
      }
    };

    /* ── Transmembrane channels ──────────────────────────────────────────── */
    const drawChannel = (i: number) => {
      const { open } = CHANNELS[i];
      const x = channelX(i);
      const my = membraneY() + wave(x);
      const ht = halfThickness();
      const bodyH = ht * 2.7;
      const bodyW = 52;
      const poreW = open ? 13 : 6;

      const halfW = bodyW / 2;
      const halfH = bodyH / 2;
      const cap = 9; // corner radius on the extracellular/cytosolic faces
      const throat = poreW * 0.42;

      ctx.save();
      ctx.translate(x, my);

      /* The protein is drawn as one continuous rounded body, then the pore is
         subtracted from it. Building it from two mirrored bezier "walls"
         instead produced flat-topped hourglass silhouettes that read as an
         icon; a single rounded body with a carved lumen reads as a structure. */
      const alpha = open ? 0.58 : 0.5;

      ctx.beginPath();
      ctx.moveTo(-halfW + cap, -halfH);
      ctx.lineTo(halfW - cap, -halfH);
      ctx.quadraticCurveTo(halfW, -halfH, halfW, -halfH + cap);
      // Slight waist on the outer wall, where the bilayer grips the protein.
      ctx.bezierCurveTo(halfW - 5, -halfH * 0.2, halfW - 5, halfH * 0.2, halfW, halfH - cap);
      ctx.quadraticCurveTo(halfW, halfH, halfW - cap, halfH);
      ctx.lineTo(-halfW + cap, halfH);
      ctx.quadraticCurveTo(-halfW, halfH, -halfW, halfH - cap);
      ctx.bezierCurveTo(-halfW + 5, halfH * 0.2, -halfW + 5, -halfH * 0.2, -halfW, -halfH + cap);
      ctx.quadraticCurveTo(-halfW, -halfH, -halfW + cap, -halfH);
      ctx.closePath();

      const body = ctx.createLinearGradient(-halfW, -halfH, halfW, halfH);
      body.addColorStop(0, `rgba(${ACCENT}, ${alpha * 0.85})`);
      body.addColorStop(0.45, `rgba(${ACCENT_DEEP}, ${alpha})`);
      body.addColorStop(1, `rgba(${ACCENT_DEEP}, ${alpha * 0.6})`);
      ctx.fillStyle = body;
      ctx.fill();

      // Rim light along the top face only — a single light source.
      ctx.strokeStyle = `rgba(${ACCENT}, ${alpha * 0.55})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Carve the lumen. `destination-out` leaves the dark page showing
      // through, which gives the pore real depth without painting a fake
      // background colour into it.
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.moveTo(-poreW / 2, -halfH - 2);
      ctx.bezierCurveTo(-poreW / 2, -halfH * 0.3, -throat, -halfH * 0.2, -throat, 0);
      ctx.bezierCurveTo(-throat, halfH * 0.2, -poreW / 2, halfH * 0.3, -poreW / 2, halfH + 2);
      ctx.lineTo(poreW / 2, halfH + 2);
      ctx.bezierCurveTo(poreW / 2, halfH * 0.3, throat, halfH * 0.2, throat, 0);
      ctx.bezierCurveTo(throat, -halfH * 0.2, poreW / 2, -halfH * 0.3, poreW / 2, -halfH - 2);
      ctx.closePath();
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";

      if (open) {
        // Conducting pore: a soft axial glow, breathing slowly.
        const pulse = 0.26 + Math.sin(t * 0.0022 + i) * 0.1;
        const g = ctx.createLinearGradient(0, -halfH, 0, halfH);
        g.addColorStop(0, `rgba(${ACCENT}, 0)`);
        g.addColorStop(0.5, `rgba(${ACCENT}, ${pulse})`);
        g.addColorStop(1, `rgba(${ACCENT}, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(-poreW / 2, -halfH, poreW, bodyH);
      } else {
        // Ligand occupying the vanilloid pocket — the blocked state, and the
        // single most important thing in the image.
        const bob = Math.sin(t * 0.0018) * 1.1;
        ctx.beginPath();
        ctx.arc(0, bob, 13, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, bob, 5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.fill();
      }

      ctx.restore();
    };

    /* ── Ions ─────────────────────────────────────────────────────────────
       Above the membrane they drift down. Near a pore they commit: through
       an open channel they permeate; at the blocked channel they are turned
       away. That asymmetry is the whole story of the molecule. */
    const stepIon = (ion: Ion) => {
      const my = membraneY() + wave(ion.x);
      const ht = halfThickness();

      if (ion.phase === 0) {
        // Drift, with a slow lateral wander.
        ion.vx += Math.sin(t * 0.001 + ion.seed) * 0.004;
        ion.vx *= 0.98;
        ion.x += ion.vx;
        ion.y += ion.vy;

        if (ion.y > my - ht * 3.2) {
          // Commit to the nearest pore within reach.
          let best = -1;
          let bestD = 90;
          for (let c = 0; c < CHANNELS.length; c++) {
            const d = Math.abs(ion.x - channelX(c));
            if (d < bestD) {
              bestD = d;
              best = c;
            }
          }
          if (best >= 0) {
            ion.target = best;
            ion.phase = CHANNELS[best].open ? 1 : 3;
          } else if (ion.y > my - ht * 1.15) {
            // No pore in reach: the bilayer itself is impermeable.
            ion.vy = -Math.abs(ion.vy) * 0.55;
            ion.vx += (Math.random() - 0.5) * 0.3;
          }
        }
      } else if (ion.phase === 1) {
        // Permeating: funnel onto the pore axis, then accelerate through.
        const cx = channelX(ion.target);
        ion.x += (cx - ion.x) * 0.14;
        ion.vy = Math.min(ion.vy + 0.035, 1.5);
        ion.y += ion.vy;
        if (ion.y > my + ht * 2.2) ion.phase = 2;
      } else if (ion.phase === 3) {
        // Deflected: pushed laterally away from the blocked pore, then up.
        const cx = channelX(ion.target);
        const dir = ion.x >= cx ? 1 : -1;
        ion.vx += dir * 0.05;
        ion.vy -= 0.028;
        ion.x += ion.vx;
        ion.y += ion.vy;
        if (ion.y < my - ht * 4.5) {
          ion.phase = 0;
          ion.target = -1;
          ion.vy = 0.12;
        }
      } else {
        ion.y += ion.vy;
        ion.x += ion.vx * 0.4;
        ion.vy = Math.min(ion.vy + 0.006, 0.55);
      }

      // Recycle back into the band above the membrane, never to the top of
      // the frame (which is where the headline lives).
      if (ion.y > h + 20 || ion.x < -30 || ion.x > w + 30) {
        Object.assign(ion, spawnIon(true));
        ion.y = ionCeiling() + Math.random() * 24;
      }
    };

    const drawIon = (ion: Ion) => {
      const permeating = ion.phase === 1;
      const a = permeating ? 0.85 : 0.5;

      if (permeating) {
        ctx.beginPath();
        ctx.arc(ion.x, ion.y, ion.r * 4.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT}, 0.09)`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(ion.x, ion.y, ion.r, 0, Math.PI * 2);
      ctx.fillStyle = permeating
        ? `rgba(${ACCENT}, ${a})`
        : `rgba(210, 232, 236, ${a})`;
      ctx.fill();
    };

    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      t += 16;

      drawBilayer();
      for (let i = 0; i < CHANNELS.length; i++) drawChannel(i);
      for (const ion of ions) {
        stepIon(ion);
        drawIon(ion);
      }

      raf = requestAnimationFrame(draw);
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      drawBilayer();
      for (let i = 0; i < CHANNELS.length; i++) drawChannel(i);
      for (const ion of ions) drawIon(ion);
    };

    resize();
    init();
    if (reduced) drawStatic();
    else draw();

    // Pause off-screen / on hidden tabs so the hero costs nothing while the
    // visitor is reading the pipeline further down the page.
    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        draw();
      }
    };

    const onResize = () => {
      resize();
      init();
      if (reduced) drawStatic();
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
