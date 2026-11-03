"use client";

/**
 * Horizontal rail scrubbed by vertical scroll (design preview, 2026-11).
 *
 * Idea from GetLayers "Dantora" ("a rail of services that scrubs sideways
 * under your scroll"); implementation is our own. Used for the pipeline so
 * the motion carries the one thing a BD reader came for: each asset's stage.
 *
 * Desktop with motion allowed: the section becomes tall, the frame pins, and
 * scroll progress moves the track. Otherwise the track is a plain
 * horizontally scrollable, snap-aligned row, so nothing is hidden.
 * RTL locales scrub in the opposite direction.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";

export function ScrubRail({
  head,
  children,
  count,
}: {
  head: ReactNode;
  children: ReactNode;
  count: number;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 900px)");
    const decide = () => setPinned(wide.matches && !reduce.matches);
    decide();
    reduce.addEventListener("change", decide);
    wide.addEventListener("change", decide);
    return () => {
      reduce.removeEventListener("change", decide);
      wide.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;
    if (!pinned) {
      track.style.transform = "";
      outer.style.height = "";
      return;
    }

    const rtl = document.documentElement.dir === "rtl";
    let distance = 0;
    const measure = () => {
      const frame = track.parentElement as HTMLElement;
      distance = Math.max(0, track.scrollWidth - frame.clientWidth);
      // One viewport of scroll for the head, then the travel itself.
      outer.style.height = `${window.innerHeight + distance}px`;
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = outer.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      const x = p * distance * (rtl ? 1 : -1);
      track.style.transform = `translate3d(${x}px, 0, 0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    measure();
    update();
    const ro = new ResizeObserver(() => {
      measure();
      update();
    });
    ro.observe(track);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pinned]);

  return (
    <div ref={outerRef} className={`scrub-rail ${pinned ? "is-pinned" : ""}`}>
      <div className="scrub-rail-frame">
        <div className="lab-container">{head}</div>
        <div className="scrub-rail-viewport">
          <div
            ref={trackRef}
            className="scrub-rail-track"
            style={{ ["--rail-count" as string]: count }}
          >
            {children}
          </div>
        </div>
        <div className="lab-container">
          <div className="scrub-rail-progress" aria-hidden="true">
            <span ref={barRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
