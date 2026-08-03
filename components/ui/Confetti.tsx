"use client";

import { useEffect, useMemo, useState } from "react";

const COLORS = ["#1a91ff", "#ffb020", "#ff5d5d", "#14c39a", "#7c5cff", "#e94ea8"];

/** Lightweight CSS confetti burst. No library, no canvas. */
export function Confetti({ fire, pieces = 40 }: { fire: boolean; pieces?: number }) {
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!fire) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(t);
  }, [fire]);

  const bits = useMemo(
    () =>
      Array.from({ length: pieces }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 1.6 + Math.random() * 1.1,
        color: COLORS[i % COLORS.length]!,
        size: 7 + Math.random() * 9,
        round: Math.random() > 0.6,
      })),
    [pieces],
  );

  if (!visible || reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
      {bits.map((b, i) => (
        <span
          key={i}
          className="absolute top-0 border border-ink/20"
          style={{
            left: `${b.left}%`,
            width: b.size,
            height: b.size * (b.round ? 1 : 0.5),
            backgroundColor: b.color,
            borderRadius: b.round ? "50%" : 2,
            animation: `confetti-fall ${b.duration}s ${b.delay}s cubic-bezier(0.3,0.7,0.4,1) forwards`,
          }}
        />
      ))}
    </div>
  );
}
