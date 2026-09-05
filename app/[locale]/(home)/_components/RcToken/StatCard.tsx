"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  label: string;
  value: number;
  unit?: string;
  decimals?: number;
  hint?: string;
}

export function StatCard({ label, value, unit, decimals = 0, hint }: Props) {
  const [displayValue, setDisplayValue] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (value === 0) {
          setDisplayValue(0);
          return;
        }

        const duration = 1400;
        const start = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(value * eased);
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  const formatted = Intl.NumberFormat("en-US", {
    maximumFractionDigits: decimals,
  }).format(displayValue);

  return (
    <div
      ref={cardRef}
      className="rounded-2xl border border-line bg-surface p-5 flex flex-col gap-1"
    >
      <span className="font-anta text-2xl md:text-[1.75rem] text-brand-deep tabular-nums">
        {formatted}
        {unit && <span className="text-base text-ink-soft"> {unit}</span>}
      </span>
      <span className="text-sm font-medium text-ink">{label}</span>
      {hint && <span className="text-xs text-ink-soft">{hint}</span>}
    </div>
  );
}
