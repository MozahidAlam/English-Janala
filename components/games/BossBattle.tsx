"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { allQuestions } from "@/lib/content/grammar";
import { shuffle, toBn } from "@/lib/utils";
import {
  GameHud,
  GameIntro,
  GameOver,
  useCountdown,
  useGameScore,
  type GamePhase,
} from "@/components/games/GameShell";
import { cn } from "@/lib/utils";

const SLUG = "boss-battle";
const LIVES = 3;
const PER_QUESTION = 20;

type Question = ReturnType<typeof allQuestions>[number];

export function BossBattle() {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [queue, setQueue] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [lives, setLives] = useState(LIVES);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const { best, save } = useGameScore(SLUG);

  const question = queue[index];

  const loseLife = useCallback(() => {
    setPicked(-1); // timeout counts as a wrong answer
    setStreak(0);
    setLives((l) => {
      const next = l - 1;
      if (next <= 0) setTimeout(() => setPhase("over"), 1600);
      return next;
    });
    setTimeout(() => {
      setPicked(null);
      setIndex((i) => i + 1);
    }, 2200);
  }, []);

  const timeLeft = useCountdown(
    PER_QUESTION,
    phase === "playing" && picked === null,
    loseLife,
  );

  useEffect(() => {
    if (phase === "over" && score > 0) save(score);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Ran out of questions — that counts as clearing the boss.
  useEffect(() => {
    if (phase === "playing" && queue.length > 0 && index >= queue.length) {
      setPhase("over");
    }
  }, [index, phase, queue.length]);

  const start = () => {
    setQueue(shuffle(allQuestions()));
    setIndex(0);
    setLives(LIVES);
    setScore(0);
    setStreak(0);
    setPicked(null);
    setPhase("playing");
  };

  const choose = (i: number) => {
    if (picked !== null || !question) return;
    setPicked(i);
    const correct = i === question.answer;

    if (correct) {
      setScore((s) => s + 15 + Math.min(30, streak * 3) + timeLeft);
      setStreak((s) => s + 1);
      setTimeout(() => {
        setPicked(null);
        setIndex((v) => v + 1);
      }, 900);
      return;
    }

    setStreak(0);
    setLives((l) => {
      const next = l - 1;
      if (next <= 0) setTimeout(() => setPhase("over"), 1800);
      return next;
    });
    setTimeout(() => {
      setPicked(null);
      setIndex((v) => v + 1);
    }, 2600);
  };

  if (phase === "intro") {
    return (
      <GameIntro
        emoji="👹"
        title="বস ব্যাটল"
        rules={[
          "সব গ্রামার টপিক থেকে র‍্যান্ডম প্রশ্ন আসবে।",
          `প্রতিটি প্রশ্নের জন্য ${toBn(PER_QUESTION)} সেকেন্ড।`,
          `${toBn(LIVES)}টি লাইফ — ভুল বা সময় শেষ হলে একটি করে যাবে।`,
          "টানা সঠিক উত্তরে কম্বো বোনাস, দ্রুত উত্তরে সময় বোনাস।",
        ]}
        best={best}
        onStart={start}
        color="#7c5cff"
      />
    );
  }

  if (phase === "over") {
    return (
      <GameOver
        score={score}
        best={best}
        onRestart={start}
        detail={
          <p className="font-bangla text-sm text-muted">
            {toBn(index)}টি প্রশ্নের মুখোমুখি হয়েছেন
          </p>
        }
      />
    );
  }

  if (!question) return null;

  const answered = picked !== null;

  return (
    <div className="mx-auto max-w-2xl">
      <GameHud score={score} timeLeft={timeLeft} lives={lives} streak={streak} />

      <div className="brut-lg mb-5 p-6">
        <p className="mb-2 text-xs font-extrabold tracking-widest text-muted uppercase">
          প্রশ্ন {toBn(index + 1)} · {question.lessonTitle}
        </p>
        <h2 className="font-bangla text-xl leading-relaxed">{question.q}</h2>
      </div>

      <div className="grid gap-2.5">
        {question.options.map((opt, i) => {
          const isAnswer = i === question.answer;
          return (
            <button
              key={`${index}-${i}`}
              onClick={() => choose(i)}
              disabled={answered}
              className={cn(
                "brut-sm brut-press px-4 py-3.5 text-left font-bold",
                answered && isAnswer && "bg-mint text-ink",
                answered && !isAnswer && picked === i && "anim-shake bg-coral text-white",
                answered && !isAnswer && picked !== i && "opacity-50",
              )}
            >
              <span className="mr-2 opacity-60">{["ক", "খ", "গ", "ঘ"][i]}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {answered ? (
        <div
          className="brut anim-pop mt-4 p-4"
          style={{ backgroundColor: picked === question.answer ? "#d7f7ec" : "#ffe0e0" }}
        >
          <p className="font-bangla text-sm text-ink">{question.explain}</p>
          <Link
            href={`/grammar/${question.lessonSlug}`}
            className="font-bangla mt-1 inline-block text-xs font-bold text-ink underline"
          >
            📖 এই টপিকের লেসন পড়ুন →
          </Link>
        </div>
      ) : null}
    </div>
  );
}
