"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Confetti } from "@/components/ui/Confetti";
import { toBn } from "@/lib/utils";

export type GamePhase = "intro" | "playing" | "over";

/** Countdown timer. Returns null when the game is not running. */
export function useCountdown(seconds: number, running: boolean, onEnd: () => void) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    if (!running) {
      setLeft(seconds);
      return;
    }
    const id = setInterval(() => {
      setLeft((v) => {
        if (v <= 1) {
          clearInterval(id);
          onEnd();
          return 0;
        }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, seconds, onEnd]);

  return left;
}

export function GameIntro({
  emoji,
  title,
  rules,
  onStart,
  color,
}: {
  emoji: string;
  title: string;
  rules: readonly string[];
  onStart: () => void;
  color: string;
}) {
  return (
    <Card size="lg" className="mx-auto max-w-lg space-y-5 p-8 text-center">
      <span
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-line text-5xl"
        style={{ backgroundColor: color }}
        aria-hidden
      >
        {emoji}
      </span>
      <h1 className="font-bangla text-3xl">{title}</h1>
      <ul className="font-bangla space-y-1.5 text-left text-sm text-muted">
        {rules.map((r, i) => (
          <li key={i} className="flex gap-2">
            <span aria-hidden>•</span>
            <span>{r}</span>
          </li>
        ))}
      </ul>
      <Button size="lg" onClick={onStart} tone="ink" className="w-full">
        ▶️ খেলা শুরু
      </Button>
    </Card>
  );
}

export function GameOver({
  score,
  detail,
  onRestart,
}: {
  score: number;
  detail?: ReactNode;
  onRestart: () => void;
}) {
  return (
    <>
      <Confetti fire={score > 0} />
      <Card size="lg" className="mx-auto max-w-lg space-y-5 p-8 text-center">
        <span className="text-6xl" aria-hidden>
          {score > 0 ? "🎉" : "😅"}
        </span>
        <h2 className="font-bangla text-3xl">খেলা শেষ</h2>
        <p className="text-5xl font-extrabold">{toBn(score)}</p>
        {detail}
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button className="flex-1" onClick={onRestart}>
            🔄 আবার খেলুন
          </Button>
          <ButtonLink href="/games" variant="outline" className="flex-1">
            🎮 অন্য গেম
          </ButtonLink>
        </div>
      </Card>
    </>
  );
}

export function GameHud({
  score,
  timeLeft,
  lives,
  streak,
}: {
  score: number;
  timeLeft?: number;
  lives?: number;
  streak?: number;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
      <Stat label="স্কোর" value={toBn(score)} />
      {typeof timeLeft === "number" ? (
        <Stat
          label="সময়"
          value={toBn(timeLeft)}
          danger={timeLeft <= 10}
        />
      ) : null}
      {typeof lives === "number" ? (
        <Stat label="লাইফ" value={"❤️".repeat(Math.max(0, lives)) || "💀"} />
      ) : null}
      {typeof streak === "number" && streak > 1 ? (
        <Stat label="কম্বো" value={`🔥 ${toBn(streak)}`} />
      ) : null}
    </div>
  );
}

function Stat({
  label,
  value,
  danger,
}: {
  label: string;
  value: string;
  danger?: boolean;
}) {
  return (
    <div
      className="brut-sm px-4 py-2 text-center"
      style={danger ? { backgroundColor: "#ff5d5d", color: "#fff" } : undefined}
    >
      <p className="text-xl font-extrabold">{value}</p>
      <p className="font-bangla text-[10px] font-bold tracking-wider uppercase opacity-70">
        {label}
      </p>
    </div>
  );
}
