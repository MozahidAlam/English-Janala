"use client";

import { useProgress } from "@/lib/hooks/useProgress";
import { toBn } from "@/lib/utils";

/** Shows the learner's best score for a game, once progress has hydrated. */
export function GameScoreBadge({ slug }: { slug: string }) {
  const { state, hydrated } = useProgress();
  const best = state.gameScores[slug];

  if (!hydrated || !best) return null;

  return (
    <span className="brut-sm px-2.5 py-1 text-xs font-extrabold whitespace-nowrap">
      🏆 {toBn(best)}
    </span>
  );
}
