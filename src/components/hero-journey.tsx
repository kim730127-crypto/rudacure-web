"use client";

import { useEffect, useRef, type ReactNode } from "react";

/* Scroll journey for the homepage hero (ref. MotionSites "Particle Self" /
   "Freight Scroll Hero": one sticky viewport, scroll drives the scene).

   At scroll 0 the hero is exactly the static hero: headline, stage stats and
   CTAs. Scrolling then fades the copy, and Trpv1Hero (which reads --jp from
   the nearest [data-journey="on"]) moves the TRPV1 structure to centre and
   flies the camera to one bound ligand. Three captions explain what is on
   screen; they describe the public structure only (PDB 8GFA), not any
   RudaCure compound.

   The journey only switches on for wide, tall-enough screens without
   reduced motion. Everywhere else, and before hydration, the section keeps
   its normal height, so nothing is clipped or hidden without JavaScript. */

export type JourneyCard = { title: string; body: string };

const MQ = "(min-width: 900px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";

export function HeroJourney({
  children,
  cards,
  source,
  hint,
}: {
  children: ReactNode;
  cards: JourneyCard[];
  source: string;
  hint: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia(MQ);
    let raf = 0;
    let on = false;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      el.style.setProperty("--jp", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const apply = () => {
      if (mq.matches && !on) {
        on = true;
        el.dataset.journey = "on";
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        update();
      } else if (!mq.matches && on) {
        on = false;
        delete el.dataset.journey;
        el.style.removeProperty("--jp");
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="rc-journey relative bg-[#080c11] text-white">
      <div className="rc-journey-stage relative flex min-h-[92vh] items-end overflow-hidden">
        {children}

        <div className="rc-journey-cards pointer-events-none absolute inset-0 z-20" aria-hidden="true">
          <div className="lab-container relative h-full">
            {cards.map((c, i) => (
              <div
                key={c.title}
                className="rc-journey-card absolute top-1/2 w-[min(25rem,36vw)]"
                style={{ ["--a" as string]: [0.2, 0.5, 0.8][i], ["--b" as string]: [0.46, 0.76, 1.2][i] }}
              >
                <span className="lab-label text-teal-300" dir="ltr">
                  {String(i + 1).padStart(2, "0")} / {String(cards.length).padStart(2, "0")}
                </span>
                <div className="mt-4 border-t border-teal-300/60 pt-5">
                  <p className="text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.02em] text-white">
                    {c.title}
                  </p>
                  <p className="mt-4 text-[1rem] leading-[1.7] text-slate-300/90">{c.body}</p>
                </div>
              </div>
            ))}
            <p className="rc-journey-source lab-label lab-label-i18n absolute bottom-8 normal-case tracking-[0.02em] text-white/45">
              {source}
            </p>
          </div>
          <div className="rc-journey-rail absolute top-1/2 end-8 h-40 w-px -translate-y-1/2 bg-white/15">
            <div className="rc-journey-rail-fill absolute inset-x-0 top-0 bg-teal-300" />
          </div>
        </div>

        <div className="rc-journey-hint pointer-events-none absolute inset-x-0 bottom-6 z-20 hidden justify-center" aria-hidden="true">
          <span className="lab-label lab-label-i18n flex items-center gap-2 normal-case tracking-[0.04em] text-white/60">
            {hint}
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.4}>
              <path d="M6 2v8M2.5 6.5 6 10l3.5-3.5" />
            </svg>
          </span>
        </div>
      </div>

      {/* Caption text for assistive tech and no-JS readers: the journey's
          meaning is not carried by motion alone. */}
      <div className="sr-only">
        {cards.map((c) => (
          <p key={c.title}>
            {c.title}. {c.body}
          </p>
        ))}
        <p>{source}</p>
      </div>
    </section>
  );
}
