"use client";

import { useEffect, useRef, useState } from "react";
import type { WordDetail } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { isSpellingCorrect } from "@/lib/study/session";
import { cn } from "@/lib/utils";

export function SpellingQuestion({
  word,
  onAnswer,
  onSpeak,
}: {
  word: WordDetail;
  onAnswer: (correct: boolean) => void;
  onSpeak: (text: string) => void;
}) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<"none" | "right" | "wrong">("none");
  const [hintShown, setHintShown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue("");
    setResult("none");
    setHintShown(false);
    inputRef.current?.focus();
  }, [word.id]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (result !== "none" || !value.trim()) return;
    const correct = isSpellingCorrect(value, word.word);
    setResult(correct ? "right" : "wrong");
    setTimeout(() => onAnswer(correct), correct ? 800 : 1800);
  };

  const hint = `${word.word.slice(0, Math.max(1, Math.ceil(word.word.length / 3)))}${"_".repeat(
    word.word.length - Math.max(1, Math.ceil(word.word.length / 3)),
  )}`;

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="brut-lg px-6 py-10 text-center">
        <p className="font-bangla mb-3 text-xs font-bold tracking-widest text-muted uppercase">
          এই অর্থের ইংরেজি শব্দটির বানান লিখুন
        </p>
        <p className="font-bangla text-3xl font-extrabold break-words sm:text-4xl">
          {word.meaning}
        </p>
        <p className="mt-2 text-sm text-muted">
          {word.word.length} অক্ষর
          {word.partsOfSpeech ? ` · ${word.partsOfSpeech}` : ""}
        </p>
        {hintShown ? (
          <p className="mt-3 font-mono text-2xl tracking-[0.3em]">{hint}</p>
        ) : null}
      </div>

      <div className="mx-auto flex max-w-lg flex-col gap-3">
        <label htmlFor="spelling-input" className="sr-only">
          ইংরেজি বানান লিখুন
        </label>
        <input
          id="spelling-input"
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={result !== "none"}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="এখানে টাইপ করুন…"
          className={cn(
            "brut-sm w-full px-4 py-3 text-center text-2xl font-bold outline-none",
            result === "right" && "bg-mint text-ink",
            result === "wrong" && "anim-shake bg-coral text-white",
          )}
        />

        {result === "wrong" ? (
          <p className="anim-pop text-center text-lg font-extrabold">
            সঠিক বানান: <span className="marker">{word.word}</span>
          </p>
        ) : null}

        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={() => onSpeak(word.word)}
          >
            🔊 শুনুন
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={() => setHintShown(true)}
            disabled={hintShown || result !== "none"}
          >
            💡 হিন্ট
          </Button>
          <Button type="submit" className="flex-1" disabled={!value.trim() || result !== "none"}>
            ✓ জমা দিন
          </Button>
        </div>
      </div>
    </form>
  );
}
