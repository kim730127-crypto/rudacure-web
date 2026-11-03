"use client";

/**
 * Sections that ride up over the one before (design preview, 2026-11).
 *
 * Idea from GetLayers "Dantora" ("every block riding up over the one before
 * it"); implementation is our own. Each direct child section is made sticky
 * with a negative top equal to (viewport - its height), so it pins once its
 * bottom edge reaches the bottom of the screen. The next section, which sits
 * higher in the stack, then slides over it. While it is being covered the
 * pinned section recedes slightly (--cover drives scale and a veil in CSS).
 *
 * Off under prefers-reduced-motion and on short viewports, where pinning
 * would hide content.
 */

import { useEffect, useRef, type ReactNode } from "react";

export function StackSections({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let sections: HTMLElement[] = [];
    let raf = 0;

    const layout = () => {
      sections = Array.from(root.children) as HTMLElement[];
      const on = !reduce.matches && window.innerHeight >= 600;
      root.classList.toggle("is-stacking", on);
      sections.forEach((s, i) => {
        s.style.zIndex = String(i + 1);
        s.style.top = on ? `${Math.min(0, window.innerHeight - s.offsetHeight)}px` : "";
        if (!on) s.style.removeProperty("--cover");
      });
    };

    const update = () => {
      raf = 0;
      if (!root.classList.contains("is-stacking")) return;
      const vh = window.innerHeight;
      for (let i = 0; i < sections.length - 1; i += 1) {
        const nextTop = sections[i + 1].getBoundingClientRect().top;
        const cover = Math.min(1, Math.max(0, (vh - nextTop) / vh));
        sections[i].style.setProperty("--cover", cover.toFixed(3));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    layout();
    update();
    const ro = new ResizeObserver(() => {
      layout();
      update();
    });
    Array.from(root.children).forEach((c) => ro.observe(c));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduce.addEventListener("change", layout);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduce.removeEventListener("change", layout);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="ink-stack">
      {children}
    </div>
  );
}
