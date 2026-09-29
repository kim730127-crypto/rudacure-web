"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { PIPELINE_STAGES, STAGE_BY_ASSET } from "@/lib/pipeline-stage";

/* Six-segment development-stage rail. Styles live in globals.css (.stage-*).
   The root gets .in-view when it scrolls into view, which starts the fill. */
export function StageRail({
  asset,
  className = "",
  showLabels = true,
}: {
  asset: string;
  className?: string;
  showLabels?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const stage = STAGE_BY_ASSET[asset];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in-view");
          observer.unobserve(el);
        }
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (stage === undefined) return null;

  return (
    <div ref={ref} className={`w-full max-w-[15rem] ${className}`} aria-hidden="true">
      <div className="stage-track">
        {PIPELINE_STAGES.map((label, i) => (
          <span
            key={label}
            className="stage-seg"
            data-on={i <= stage ? "" : undefined}
            data-now={i === stage ? "" : undefined}
            style={{ "--i": i } as CSSProperties}
          />
        ))}
      </div>
      {showLabels && (
        <div className="stage-labels hidden sm:flex">
          {PIPELINE_STAGES.map((label, i) => (
            <span key={label} data-now={i === stage ? "" : undefined}>
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
