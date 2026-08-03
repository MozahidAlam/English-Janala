"use client";

import { useEffect } from "react";
import { useProgress } from "@/lib/hooks/useProgress";
import { Confetti } from "@/components/ui/Confetti";

/** Slides in when a new achievement unlocks. Mounted once in the root layout. */
export function BadgeToast() {
  const { earnedToast, dismissToast } = useProgress();

  useEffect(() => {
    if (!earnedToast) return;
    const t = setTimeout(dismissToast, 5200);
    return () => clearTimeout(t);
  }, [earnedToast, dismissToast]);

  if (!earnedToast) return null;

  return (
    <>
      <Confetti fire pieces={34} />
      <div
        role="status"
        aria-live="polite"
        className="anim-pop fixed bottom-5 left-1/2 z-[70] w-[min(24rem,92vw)] -translate-x-1/2"
      >
        <div className="brut-lg flex items-center gap-4 p-4" style={{ backgroundColor: "#ffb020" }}>
          <span className="text-4xl" aria-hidden>
            {earnedToast.emoji}
          </span>
          <div className="min-w-0 flex-1 text-ink">
            <p className="text-[11px] font-extrabold tracking-widest uppercase opacity-70">
              নতুন অর্জন!
            </p>
            <p className="font-bangla truncate text-lg font-extrabold">
              {earnedToast.title}
            </p>
            <p className="font-bangla truncate text-sm opacity-80">
              {earnedToast.desc}
            </p>
          </div>
          <button
            onClick={dismissToast}
            aria-label="বন্ধ করুন"
            className="shrink-0 rounded-lg border-2 border-ink px-2 py-0.5 text-ink"
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
}
