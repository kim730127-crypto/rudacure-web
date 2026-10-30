"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* Platform-to-asset diagram for the homepage technology section.
   Reference: MotionSites "Radial Diagram" (spoke highlight on hover, staggered
   entrance), rebuilt with CSS and the --rc tokens instead of framer-motion.

   Every spoke is an asset that already appears in the pipeline table on the
   same page; the diagram adds no new claim. The stage line under each asset
   is the same `status` string the pipeline index prints.

   Layout: md and up draws the circle and spokes, with the labels placed
   around it. Below md the SVG is hidden and the same list reads as a plain
   vertical index, so the content exists once in the DOM. Nothing is hidden
   until the client arms the entrance, so the section stays readable without
   JavaScript. */

export type RadialItem = {
  id: string;
  indication: string;
  status: string;
  href: string;
};

const W = 280;
const H = 100;
const CX = W / 2;
const CY = H / 2;
const R = 20;
const LEFT_X = 66;
const RIGHT_X = W - LEFT_X;

function sideY(k: number, count: number) {
  if (count === 1) return CY;
  const top = 24;
  const bottom = 76;
  return top + ((bottom - top) * k) / (count - 1);
}

export function PlatformRadial({
  items,
  centerTitle,
  centerCaption,
  label,
}: {
  items: RadialItem[];
  centerTitle: string;
  centerCaption: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  /* The entrance state lives on the element's dataset, not in React state:
     it is a one-way DOM effect and must not re-render the list. Reduced
     motion leaves the attribute unset, which is the static final layout. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
      el.dataset.phase = "in";
      return;
    }
    el.dataset.phase = "armed";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.phase = "in";
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const leftCount = Math.ceil(items.length / 2);
  const placed = items.map((item, i) => {
    const left = i < leftCount;
    const k = left ? i : i - leftCount;
    const n = left ? leftCount : items.length - leftCount;
    const x = left ? LEFT_X : RIGHT_X;
    const y = sideY(k, n);
    const dx = x - CX;
    const dy = y - CY;
    const len = Math.hypot(dx, dy);
    const sx = CX + (dx / len) * R;
    const sy = CY + (dy / len) * R;
    return { item, i, left, x, y, sx, sy };
  });

  return (
    <div
      ref={ref}
      className="rc-radial"
      role="group"
      aria-label={label}
    >
      <div className="relative md:aspect-[14/5]">
        <svg
          className="absolute inset-0 hidden h-full w-full md:block"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <circle
            className="rc-radial-ring"
            cx={CX}
            cy={CY}
            r={R}
            pathLength={1}
          />
          {placed.map((p) => (
            <g
              key={p.item.id}
              className="rc-radial-spoke"
              data-active={active === p.i ? "" : undefined}
              style={{ ["--i" as string]: p.i }}
            >
              <line
                x1={p.sx}
                y1={p.sy}
                x2={p.x}
                y2={p.y}
                pathLength={1}
                  />
              <circle className="rc-radial-dot" cx={p.x} cy={p.y} r={0.9} />
            </g>
          ))}
        </svg>

        <div className="rc-radial-center mb-6 flex items-baseline gap-3 border-b border-[var(--lab-line)] pb-4 md:absolute md:top-1/2 md:left-1/2 md:mb-0 md:block md:w-[12.5%] md:-translate-x-1/2 md:-translate-y-1/2 md:border-0 md:pb-0 md:text-center">
          <span className="num block text-[1.375rem] font-semibold tracking-[-0.02em] text-[var(--lab-ink)] md:text-[1.75rem]">
            {centerTitle}
          </span>
          <span className="type-caption block leading-snug md:mt-1">
            {centerCaption}
          </span>
        </div>

        <ul className="grid gap-px md:contents">
          {placed.map((p) => {
            const pct = (p.left ? (W - p.x + 4) : p.x + 4) / W * 100;
            const top = (p.y / H) * 100;
            return (
              <li
                key={p.item.id}
                className={`rc-radial-label md:absolute md:w-[19%] md:-translate-y-1/2 ${
                  p.left ? "md:text-right" : "md:text-left"
                }`}
                data-active={active === p.i ? "" : undefined}
                style={{
                  ["--i" as string]: p.i,
                  ...(p.left
                    ? { ["--rc-r" as string]: `${pct}%` }
                    : { ["--rc-l" as string]: `${pct}%` }),
                  ["--rc-t" as string]: `${top}%`,
                }}
              >
                <Link
                  href={p.item.href}
                  className="group block border-s-2 border-[var(--lab-line)] py-3 ps-4 transition-colors duration-200 hover:border-[var(--rc-accent)] focus-visible:border-[var(--rc-accent)] md:border-0 md:p-0"
                  onMouseEnter={() => setActive(p.i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(p.i)}
                  onBlur={() => setActive(null)}
                >
                  <span className="rc-radial-id num block text-[1.125rem] font-semibold leading-none tracking-[-0.02em] text-[var(--lab-ink)] transition-colors duration-200 md:text-[1.25rem]">
                    {p.item.id}
                  </span>
                  <span className="mt-2 block text-[0.9375rem] font-semibold leading-snug text-[var(--lab-ink)]">
                    {p.item.indication}
                  </span>
                  <span className="type-caption mt-1 block">{p.item.status}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
