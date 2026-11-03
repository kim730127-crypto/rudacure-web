"use client";

/**
 * Photographs that trail off the pointer (design preview, 2026-11).
 *
 * Idea from GetLayers "Dantora"; implementation is our own. Every frame is
 * RudaCure photography already published on this site (see
 * public/images/IMAGE-CREDITS.md). Images are requested through the Next
 * image optimiser at thumbnail width, so no new binaries are added.
 *
 * Mouse only, wide screens only, off under prefers-reduced-motion. The layer
 * sits under the hero copy and never takes pointer events.
 */

import { useEffect, useRef } from "react";

const PHOTOS = [
  "/images/science/scientist.jpg",
  "/images/science/assay-bench.jpg",
  "/images/news/biojapan-2026-meeting.jpg",
  "/images/science/lab-bench.jpg",
  "/images/news/bio-2026-booth.jpg",
  "/images/ir-capital-markets.jpg",
  "/images/news/interbiz-2026-meeting-1.jpg",
];

const thumb = (src: string) =>
  `/_next/image?url=${encodeURIComponent(src)}&w=384&q=75`;

const STEP = 110; // px of pointer travel between frames
const LIFE = 1100; // ms a frame stays on screen
const MAX_ALIVE = 6;

export function PhotoTrail() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const host = layer?.parentElement;
    if (!layer || !host) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 900px)");

    // Warm the cache so the first frames do not pop in late.
    const warm = PHOTOS.map((src) => {
      const img = new Image();
      img.decoding = "async";
      img.src = thumb(src);
      return img;
    });

    let lastX = 0;
    let lastY = 0;
    let travelled = 0;
    let next = 0;
    let primed = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || reduce.matches || !wide.matches) return;
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (!primed) {
        lastX = x;
        lastY = y;
        primed = true;
        return;
      }
      travelled += Math.hypot(x - lastX, y - lastY);
      lastX = x;
      lastY = y;
      if (travelled < STEP) return;
      travelled = 0;

      while (layer.childElementCount >= MAX_ALIVE) layer.firstElementChild?.remove();

      const img = document.createElement("img");
      img.src = thumb(PHOTOS[next % PHOTOS.length]);
      img.alt = "";
      img.decoding = "async";
      img.className = "photo-trail-frame";
      const tilt = (Math.random() - 0.5) * 10;
      img.style.left = `${x}px`;
      img.style.top = `${y}px`;
      img.style.setProperty("--tilt", `${tilt}deg`);
      layer.appendChild(img);
      next += 1;
      window.setTimeout(() => img.remove(), LIFE);
    };
    const onLeave = () => {
      primed = false;
    };

    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      warm.length = 0;
    };
  }, []);

  return <div ref={layerRef} className="photo-trail" aria-hidden="true" />;
}
