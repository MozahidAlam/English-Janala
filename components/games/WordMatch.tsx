"use client";

import { useCallback, useEffect, useState } from "react";
import type { WordDetail } from "@/lib/types";
import { sample, shuffle, toBn } from "@/lib/utils";
import {
  GameHud,
  GameIntro,
  GameOver,
  useCountdown,
  type GamePhase,
} from "@/components/games/GameShell";
import { cn } from "@/lib/utils";

const PAIRS = 6;
const DURATION = 90;

interface Tile {
  readonly key: string;
  readonly pairId: number;
  readonly text: string;
  readonly isBangla: boolean;
}

function buildBoard(pool: readonly WordDetail[]): Tile[] {
  const picked = sample(pool.filter((w) => w.meaning), PAIRS);
  const tiles = picked.flatMap<Tile>((w) => [
    { key: `en-${w.id}`, pairId: w.id, text: w.word, isBangla: false },
    { key: `bn-${w.id}`, pairId: w.id, text: w.meaning!, isBangla: true },
  ]);
  return shuffle(tiles);
}

export function WordMatch({ pool }: { pool: readonly WordDetail[] }) {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);

  const end = useCallback(() => setPhase("over"), []);
  const timeLeft = useCountdown(DURATION, phase === "playing", end);


  // Board cleared before the timer ran out.
  useEffect(() => {
    if (phase !== "playing" || tiles.length === 0) return;
    if (matched.size === PAIRS) {
      setScore((s) => s + timeLeft * 2);
      const t = setTimeout(() => setPhase("over"), 800);
      return () => clearTimeout(t);
    }
  }, [matched, phase, tiles.length, timeLeft]);

  const start = () => {
    setTiles(buildBoard(pool));
    setFlipped([]);
    setMatched(new Set());
    setScore(0);
    setMoves(0);
    setPhase("playing");
  };

  const flip = (tile: Tile) => {
    if (
      flipped.length >= 2 ||
      flipped.includes(tile.key) ||
      matched.has(tile.pairId)
    ) {
      return;
    }

    const next = [...flipped, tile.key];
    setFlipped(next);
    if (next.length < 2) return;

    setMoves((m) => m + 1);
    const [aKey, bKey] = next;
    const a = tiles.find((t) => t.key === aKey);
    const b = tiles.find((t) => t.key === bKey);

    if (a && b && a.pairId === b.pairId) {
      setScore((s) => s + 20);
      setMatched((prev) => new Set(prev).add(a.pairId));
      setFlipped([]);
    } else {
      setScore((s) => Math.max(0, s - 2));
      setTimeout(() => setFlipped([]), 850);
    }
  };

  if (phase === "intro") {
    return (
      <GameIntro
        emoji="🃏"
        title="শব্দ মেলান"
        rules={[
          `${toBn(PAIRS)}টি ইংরেজি শব্দ আর তাদের বাংলা অর্থ লুকানো আছে।`,
          "দুটি কার্ড উল্টে জোড়া মেলান। মিললে থেকে যাবে।",
          `সময় ${toBn(DURATION)} সেকেন্ড। আগে শেষ করলে বাকি সময়ের বোনাস!`,
        ]}
        onStart={start}
        color="#14c39a"
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
            {toBn(matched.size)}/{toBn(PAIRS)} জোড়া · {toBn(moves)} চাল
          </p>
        }
      />
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <GameHud score={score} timeLeft={timeLeft} />
      <p className="font-bangla mb-4 text-center text-sm text-muted">
        {toBn(matched.size)} / {toBn(PAIRS)} জোড়া মিলেছে
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {tiles.map((tile) => {
          const isMatched = matched.has(tile.pairId);
          const isOpen = isMatched || flipped.includes(tile.key);
          return (
            <button
              key={tile.key}
              onClick={() => flip(tile)}
              disabled={isMatched}
              aria-label={isOpen ? tile.text : "লুকানো কার্ড"}
              className={cn(
                "brut brut-press flex min-h-24 items-center justify-center p-3 text-center text-base font-bold break-words transition-colors",
                tile.isBangla && "font-bangla",
                isMatched && "bg-mint text-ink opacity-70",
                !isOpen && "text-transparent",
              )}
              style={
                !isOpen
                  ? { backgroundColor: tile.isBangla ? "#ffe6b0" : "#cfe9ff" }
                  : undefined
              }
            >
              {isOpen ? tile.text : "?"}
            </button>
          );
        })}
      </div>
    </div>
  );
}
