"use client";

import { useCallback, useEffect, useState } from "react";
import type { WordDetail } from "@/lib/types";
import { sample, toBn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  GameHud,
  GameIntro,
  GameOver,
  type GamePhase,
} from "@/components/games/GameShell";
import { cn } from "@/lib/utils";

const MAX_LIVES = 6;
const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
const STAGES = ["😀", "🙂", "😐", "😟", "😨", "😰", "💀"];

function playable(pool: readonly WordDetail[]): WordDetail[] {
  return pool.filter((w) => w.meaning && /^[a-zA-Z]{3,12}$/.test(w.word));
}

export function Hangman({ pool }: { pool: readonly WordDetail[] }) {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [word, setWord] = useState<WordDetail | null>(null);
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [lives, setLives] = useState(MAX_LIVES);
  const [score, setScore] = useState(0);
  const [solved, setSolved] = useState(0);
  const [roundState, setRoundState] = useState<"playing" | "won" | "lost">("playing");

  const nextWord = useCallback(() => {
    const candidates = playable(pool);
    const picked = sample(candidates, 1)[0] ?? null;
    setWord(picked);
    setGuessed(new Set());
    setRoundState("playing");
  }, [pool]);

  const start = () => {
    setLives(MAX_LIVES);
    setScore(0);
    setSolved(0);
    nextWord();
    setPhase("playing");
  };


  const letters = word ? word.word.toLowerCase().split("") : [];
  const revealed = letters.every((ch) => guessed.has(ch));

  useEffect(() => {
    if (!word || roundState !== "playing" || letters.length === 0) return;
    if (revealed) {
      setRoundState("won");
      setScore((s) => s + 30 + lives * 5);
      setSolved((n) => n + 1);
      const t = setTimeout(nextWord, 1800);
      return () => clearTimeout(t);
    }
  }, [revealed, roundState, word, letters.length, lives, nextWord]);

  const guess = (letter: string) => {
    if (!word || roundState !== "playing" || guessed.has(letter)) return;
    setGuessed((prev) => new Set(prev).add(letter));

    if (!letters.includes(letter)) {
      const remaining = lives - 1;
      setLives(remaining);
      if (remaining <= 0) {
        setRoundState("lost");
        setTimeout(() => setPhase("over"), 2200);
      }
    }
  };

  if (phase === "intro") {
    return (
      <GameIntro
        emoji="🎪"
        title="অক্ষর খেলা"
        rules={[
          "বাংলা অর্থ দেখে ইংরেজি শব্দের অক্ষর অনুমান করুন।",
          `ভুল অনুমানে একটি লাইফ যাবে — মোট ${toBn(MAX_LIVES)}টি লাইফ।`,
          "যত কম ভুলে শব্দ ধরবেন, তত বেশি পয়েন্ট।",
        ]}
        onStart={start}
        color="#ffb020"
      />
    );
  }

  if (phase === "over") {
    return (
      <GameOver
        score={score}
        onRestart={start}
        detail={
          <p className="font-bangla text-sm text-muted">
            {toBn(solved)}টি শব্দ সমাধান করেছেন
            {word ? ` · শেষ শব্দটি ছিল: ${word.word}` : ""}
          </p>
        }
      />
    );
  }

  if (!word) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <GameHud score={score} lives={lives} />

      <div className="brut-lg mb-6 space-y-4 p-6 text-center">
        <span className="text-6xl" aria-hidden>
          {STAGES[MAX_LIVES - lives] ?? "💀"}
        </span>
        <div>
          <p className="font-bangla text-xs font-bold tracking-widest text-muted uppercase">
            বাংলা অর্থ
          </p>
          <p className="font-bangla text-2xl font-extrabold">{word.meaning}</p>
          {word.partsOfSpeech ? (
            <p className="mt-1 text-sm text-muted italic">{word.partsOfSpeech}</p>
          ) : null}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {letters.map((ch, i) => (
            <span
              key={i}
              className={cn(
                "flex h-12 w-9 items-center justify-center rounded-lg border-b-4 border-line text-2xl font-extrabold uppercase",
                roundState === "lost" && !guessed.has(ch) && "text-coral",
              )}
            >
              {guessed.has(ch) || roundState === "lost" ? ch : ""}
            </span>
          ))}
        </div>

        {roundState === "won" ? (
          <p className="anim-pop font-bangla text-xl font-extrabold text-mint">
            🎉 পেরেছেন! পরের শব্দ আসছে…
          </p>
        ) : null}
        {roundState === "lost" ? (
          <p className="anim-pop font-bangla text-xl font-extrabold text-coral">
            💀 শব্দটি ছিল “{word.word}”
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap justify-center gap-1.5">
        {ALPHABET.map((letter) => {
          const used = guessed.has(letter);
          const hit = used && letters.includes(letter);
          return (
            <button
              key={letter}
              onClick={() => guess(letter)}
              disabled={used || roundState !== "playing"}
              className={cn(
                "brut-sm brut-press h-11 w-10 text-lg font-extrabold uppercase",
                hit && "bg-mint text-ink",
                used && !hit && "bg-coral text-white",
              )}
            >
              {letter}
            </button>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <Button variant="ghost" size="sm" onClick={() => setPhase("over")}>
          খেলা শেষ করুন
        </Button>
      </div>
    </div>
  );
}
