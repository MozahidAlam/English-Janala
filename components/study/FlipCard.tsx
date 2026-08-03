"use client";

import { useEffect, useState } from "react";
import type { WordDetail } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function FlipCard({
  word,
  onAnswer,
  onSpeak,
}: {
  word: WordDetail;
  onAnswer: (knewIt: boolean) => void;
  onSpeak: (text: string) => void;
}) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => setFlipped(false), [word.id]);

  return (
    <div className="space-y-5">
      <div className="flip-scene mx-auto h-72 w-full max-w-lg">
        <button
          type="button"
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? "কার্ড উল্টে সামনে দেখুন" : "কার্ড উল্টে অর্থ দেখুন"}
          className={cn("flip-card h-full w-full text-left", flipped && "is-flipped")}
        >
          <div className="brut-lg flip-face flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
            <span className="font-bangla text-xs font-bold tracking-widest text-muted uppercase">
              এই শব্দের অর্থ কী?
            </span>
            <span className="text-4xl font-extrabold break-words sm:text-5xl">
              {word.word}
            </span>
            {word.partsOfSpeech ? (
              <span className="text-sm text-muted italic">{word.partsOfSpeech}</span>
            ) : null}
            <span className="font-bangla mt-2 text-sm text-muted">
              👆 কার্ডে ট্যাপ করে উল্টান
            </span>
          </div>

          <div
            className="brut-lg flip-face flip-face-back tint-mint flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center"
          >
            <span className="font-bangla text-3xl font-extrabold break-words text-ink">
              {word.meaning}
            </span>
            {word.pronunciation ? (
              <span className="font-bangla text-base text-ink/70">
                /{word.pronunciation}/
              </span>
            ) : null}
            {word.sentence ? (
              <span className="mt-2 max-w-sm text-sm text-ink/80 italic">
                “{word.sentence}”
              </span>
            ) : null}
          </div>
        </button>
      </div>

      <div className="flex justify-center">
        <Button size="sm" variant="ghost" onClick={() => onSpeak(word.word)}>
          🔊 উচ্চারণ শুনুন
        </Button>
      </div>

      {flipped ? (
        <div className="anim-pop mx-auto flex max-w-lg gap-3">
          <Button
            tone="coral"
            className="flex-1"
            onClick={() => onAnswer(false)}
            size="lg"
          >
            😕 জানতাম না
          </Button>
          <Button tone="mint" className="flex-1" onClick={() => onAnswer(true)} size="lg">
            😎 জানতাম
          </Button>
        </div>
      ) : (
        <p className="font-bangla text-center text-sm text-muted">
          মনে মনে উত্তর ভাবুন, তারপর কার্ড উল্টান।
        </p>
      )}
    </div>
  );
}
