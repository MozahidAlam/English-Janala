"use client";

import { useEffect, useState } from "react";
import type { Choice } from "@/lib/study/session";
import { cn } from "@/lib/utils";

/**
 * Four-option question used by the meaning / reverse / listening modes.
 * Locks after the first click and reveals the correct option.
 */
export function ChoiceQuestion({
  prompt,
  subPrompt,
  choices,
  bnChoices,
  onAnswer,
  questionKey,
}: {
  prompt: React.ReactNode;
  subPrompt?: string;
  choices: readonly Choice[];
  /** Render options in the Bangla font. */
  bnChoices?: boolean;
  onAnswer: (correct: boolean) => void;
  /** Changes whenever a new question starts, so local state resets. */
  questionKey: string | number;
}) {
  const [picked, setPicked] = useState<number | null>(null);

  useEffect(() => setPicked(null), [questionKey]);

  const choose = (index: number) => {
    if (picked !== null) return;
    setPicked(index);
    const correct = choices[index]?.correct ?? false;
    // Brief pause so the learner sees which option was right.
    setTimeout(() => onAnswer(correct), correct ? 700 : 1500);
  };

  return (
    <div className="space-y-6">
      <div className="brut-lg px-6 py-10 text-center">
        {subPrompt ? (
          <p className="font-bangla mb-3 text-xs font-bold tracking-widest text-muted uppercase">
            {subPrompt}
          </p>
        ) : null}
        <div className="text-3xl font-extrabold break-words sm:text-4xl">{prompt}</div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="উত্তর বাছুন">
        {choices.map((choice, i) => {
          const isPicked = picked === i;
          const reveal = picked !== null;
          const state = reveal
            ? choice.correct
              ? "correct"
              : isPicked
                ? "wrong"
                : "idle"
            : "idle";

          return (
            <button
              key={`${questionKey}-${i}`}
              onClick={() => choose(i)}
              disabled={reveal}
              className={cn(
                "brut-sm brut-press px-4 py-4 text-left text-lg font-bold",
                bnChoices && "font-bangla",
                state === "correct" && "bg-mint text-ink",
                state === "wrong" && "anim-shake bg-coral text-white",
                reveal && state === "idle" && "opacity-50",
              )}
            >
              <span className="mr-2 opacity-60">{["ক", "খ", "গ", "ঘ"][i]}.</span>
              {choice.text}
              {state === "correct" ? <span className="ml-2">✅</span> : null}
              {state === "wrong" ? <span className="ml-2">❌</span> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
