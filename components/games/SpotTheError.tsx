"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { allWrongRight } from "@/lib/content/grammar";
import { shuffle } from "@/lib/utils";
import {
  GameHud,
  GameIntro,
  GameOver,
  useCountdown,
  useGameScore,
  type GamePhase,
} from "@/components/games/GameShell";
import { cn } from "@/lib/utils";

const SLUG = "spot-the-error";
const DURATION = 60;

interface Round {
  readonly options: readonly string[];
  readonly correctIndex: number;
  readonly why: string;
  readonly lessonSlug: string;
}

function buildRounds(): Round[] {
  return shuffle(allWrongRight()).map((wr) => {
    const rightFirst = Math.random() > 0.5;
    return {
      options: rightFirst ? [wr.right, wr.wrong] : [wr.wrong, wr.right],
      correctIndex: rightFirst ? 0 : 1,
      why: wr.why,
      lessonSlug: wr.lessonSlug,
    };
  });
}

export function SpotTheError() {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [rounds, setRounds] = useState<Round[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const { best, save } = useGameScore(SLUG);

  const end = useCallback(() => setPhase("over"), []);
  const timeLeft = useCountdown(DURATION, phase === "playing", end);

  useEffect(() => {
    if (phase === "over" && score > 0) save(score);
    // save is stable per render of the provider; run once when the game ends.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const start = () => {
    setRounds(buildRounds());
    setIndex(0);
    setScore(0);
    setStreak(0);
    setPicked(null);
    setPhase("playing");
  };

  const round = rounds[index];

  const choose = (i: number) => {
    if (picked !== null || !round) return;
    setPicked(i);
    const correct = i === round.correctIndex;
    if (correct) {
      setScore((s) => s + 10 + Math.min(20, streak * 2));
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
    setTimeout(
      () => {
        setPicked(null);
        setIndex((v) => (v + 1) % Math.max(1, rounds.length));
      },
      correct ? 550 : 2200,
    );
  };

  const rules = useMemo(
    () => [
      "দুটি বাক্য দেখানো হবে — একটি সঠিক, একটি ভুল।",
      "সঠিক বাক্যটিতে ক্লিক করুন।",
      `সময় ${DURATION} সেকেন্ড। টানা সঠিক উত্তরে কম্বো বোনাস!`,
    ],
    [],
  );

  if (phase === "intro") {
    return (
      <GameIntro
        emoji="🔍"
        title="ভুল ধরুন"
        rules={rules}
        best={best}
        onStart={start}
        color="#ff5d5d"
      />
    );
  }

  if (phase === "over") {
    return <GameOver score={score} best={best} onRestart={start} />;
  }

  if (!round) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <GameHud score={score} timeLeft={timeLeft} streak={streak} />

      <p className="font-bangla mb-5 text-center text-lg font-bold">
        কোন বাক্যটি সঠিক? 🤔
      </p>

      <div className="space-y-3">
        {round.options.map((opt, i) => {
          const reveal = picked !== null;
          const isCorrect = i === round.correctIndex;
          return (
            <button
              key={`${index}-${i}`}
              onClick={() => choose(i)}
              disabled={reveal}
              className={cn(
                "brut brut-press w-full px-5 py-5 text-left text-lg font-semibold",
                reveal && isCorrect && "bg-mint text-ink",
                reveal && !isCorrect && picked === i && "anim-shake bg-coral text-white",
                reveal && !isCorrect && picked !== i && "opacity-50",
              )}
            >
              {opt}
              {reveal ? (
                <span className="ml-2">{isCorrect ? "✅" : "❌"}</span>
              ) : null}
            </button>
          );
        })}
      </div>

      {picked !== null ? (
        <div
          className="brut anim-pop mt-4 p-4"
          style={{ backgroundColor: "#fff0c2" }}
        >
          <p className="font-bangla text-sm text-ink">
            <strong>কেন:</strong> {round.why}
          </p>
          <Link
            href={`/grammar/${round.lessonSlug}`}
            className="font-bangla mt-1 inline-block text-xs font-bold text-ink underline"
          >
            📖 সম্পূর্ণ লেসনটি পড়ুন →
          </Link>
        </div>
      ) : null}
    </div>
  );
}
