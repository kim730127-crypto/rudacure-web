"use client";

import { useEffect, useRef, useState } from "react";

interface ProgressBarProps {
  progress: number;
  className?: string;
  children?: React.ReactNode;
  delay?: number;
}

export function ProgressBar({ progress, className = "", children, delay = 0 }: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(progress), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [progress, delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        width: `${width}%`,
        transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}
