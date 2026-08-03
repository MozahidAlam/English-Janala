"use client";

import { useCallback, useEffect, useState } from "react";
import { BUILDER_SENTENCES } from "@/lib/content/games";
import { shuffle } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  GameHud,
  GameIntro,
  GameOver,
  type GamePhase,
} from "@/components/games/GameShell";
import { cn, toBn } from "@/lib/utils";

const ROUNDS = 8;

interface Token {
  readonly id: number;
  readonly word: string;
}

function tokenize(sentence: string): Token[] {
  return sentence.split(" ").map((word, id) => ({ id, word }));
}

/** Shuffle until the order actually differs, so a round is never pre-solved. */
function scramble(tokens: readonly Token[]): Token[] {
  if (tokens.length < 2) return [...tokens];
  for (let attempt = 0; attempt < 8; attempt++) {
    const shuffled = shuffle(tokens);
    if (shuffled.some((t, i) => t.id !== tokens[i]!.id)) return shuffled;
  }
  return [...tokens].reverse();
}

export function SentenceBuilder() {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [queue, setQueue] = useState<typeof BUILDER_SENTENCES>([]);
  const [index, setIndex] = useState(0);
  const [pool, setPool] = useState<Token[]>([]);
  const [built, setBuilt] = useState<Token[]>([]);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<"none" | "right" | "wrong">("none");

  const current = queue[index];

  const loadRound = useCallback((sentence: string) => {
    const tokens = tokenize(sentence);
    setPool(scramble(tokens));
    setBuilt([]);
    setResult("none");
  }, []);

  const start = () => {
    const picked = shuffle(BUILDER_SENTENCES).slice(0, ROUNDS);
    setQueue(picked);
    setIndex(0);
    setScore(0);
    loadRound(picked[0]!.sentence);
    setPhase("playing");
  };


  const pick = (token: Token) => {
    if (result !== "none") return;
    setPool((p) => p.filter((t) => t.id !== token.id));
    setBuilt((b) => [...b, token]);
  };

  const unpick = (token: Token) => {
    if (result !== "none") return;
    setBuilt((b) => b.filter((t) => t.id !== token.id));
    setPool((p) => [...p, token]);
  };

  const check = () => {
    if (!current || result !== "none") return;
    const answer = built.map((t) => t.word).join(" ");
    const correct = answer === current.sentence;
    setResult(correct ? "right" : "wrong");
    if (correct) setScore((s) => s + 25);

    setTimeout(
      () => {
        if (index + 1 >= queue.length) {
          setPhase("over");
          return;
        }
        setIndex((i) => i + 1);
        loadRound(queue[index + 1]!.sentence);
      },
      correct ? 900 : 2400,
    );
  };

  if (phase === "intro") {
    return (
      <GameIntro
        emoji="🧩"
        title="বাক্য সাজান"
        rules={[
          "এলোমেলো শব্দগুলোতে ক্লিক করে সঠিক ক্রমে সাজান।",
          "ভুল বসালে আবার ক্লিক করে ফিরিয়ে নিতে পারবেন।",
          `${toBn(ROUNDS)}টি বাক্য। প্রতিটি সঠিক বাক্যে ২৫ পয়েন্ট।`,
        ]}
        onStart={start}
        color="#1a91ff"
      />
    );
  }

  if (phase === "over") {
    return <GameOver score={score} onRestart={start} />;
  }

  if (!current) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <GameHud score={score} />

      <p className="font-bangla mb-1 text-center text-sm text-muted">
        বাক্য {toBn(index + 1)} / {toBn(queue.length)} · 💡 {current.hint}
      </p>

      {/* ------------------------------------------------ answer tray */}
      <div
        className={cn(
          "brut-lg mt-4 flex min-h-28 flex-wrap content-start items-start gap-2 p-4",
          result === "right" && "bg-mint",
          result === "wrong" && "anim-shake bg-coral",
        )}
      >
        {built.length === 0 ? (
          <span className="font-bangla self-center text-muted">
            নিচের শব্দগুলোতে ক্লিক করে বাক্য বানান…
          </span>
        ) : (
          built.map((t) => (
            <button
              key={t.id}
              onClick={() => unpick(t)}
              className="brut-sm brut-press px-3 py-2 font-bold"
            >
              {t.word}
            </button>
          ))
        )}
      </div>

      {result === "wrong" ? (
        <p className="anim-pop mt-3 text-center font-bold">
          সঠিক বাক্য: <span className="marker">{current.sentence}</span>
        </p>
      ) : null}

      {/* ------------------------------------------------------ word pool */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {pool.map((t) => (
          <button
            key={t.id}
            onClick={() => pick(t)}
            className="brut-sm brut-press tint-sky px-3.5 py-2.5 font-bold"
          >
            {t.word}
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <Button
          variant="outline"
          onClick={() => loadRound(current.sentence)}
          disabled={result !== "none"}
        >
          ↺ রিসেট
        </Button>
        <Button
          onClick={check}
          disabled={pool.length > 0 || result !== "none"}
          tone="mint"
        >
          ✓ চেক করুন
        </Button>
      </div>
    </div>
  );
}
