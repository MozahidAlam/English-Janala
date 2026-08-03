"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { WordDetail } from "@/lib/types";
import { useProgress } from "@/lib/hooks/useProgress";
import { useSpeech } from "@/lib/hooks/useSpeech";
import { cachedEnrichment, enrichWord } from "@/lib/api/dictionary";
import { boxCounts, dueCards } from "@/lib/storage/srs";
import {
  buildChoices,
  feedbackLine,
  MODES,
  pickSessionWords,
  pickWeakWords,
  SESSION_SIZE,
  scoreVerdict,
  type StudyMode,
} from "@/lib/study/session";
import { FlipCard } from "@/components/study/FlipCard";
import { ChoiceQuestion } from "@/components/study/ChoiceQuestion";
import { SpellingQuestion } from "@/components/study/SpellingQuestion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Confetti } from "@/components/ui/Confetti";
import { cn, toBn } from "@/lib/utils";

type Phase = "picking" | "running" | "done";

export function StudySession({ pool }: { pool: readonly WordDetail[] }) {
  const { state, hydrated, reviewWord } = useProgress();
  const { speak } = useSpeech();

  const [phase, setPhase] = useState<Phase>("picking");
  const [mode, setMode] = useState<StudyMode>("flip");
  const [queue, setQueue] = useState<WordDetail[]>([]);
  const [index, setIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [flash, setFlash] = useState<string | null>(null);

  const due = hydrated ? dueCards(state).length : 0;
  const boxes = hydrated ? boxCounts(state) : { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const current = queue[index];

  const start = useCallback(
    (nextMode: StudyMode, weakOnly = false) => {
      const words = weakOnly
        ? pickWeakWords(pool, state, SESSION_SIZE)
        : pickSessionWords(pool, state, SESSION_SIZE);
      if (words.length === 0) return;
      setMode(nextMode);
      setQueue(words);
      setIndex(0);
      setCorrectCount(0);
      setFlash(null);
      setPhase("running");
    },
    [pool, state],
  );

  /**
   * Play a word without waiting on the network: use the cached recording when
   * we already have it, otherwise speak via the synthesiser immediately and
   * warm the cache for next time.
   */
  const handleSpeak = useCallback(
    (text: string) => {
      const rich = cachedEnrichment(text);
      speak(text, rich?.audioUrl ?? null);
      if (!rich) void enrichWord(text);
    },
    [speak],
  );

  // Listening mode plays the prompt as soon as the question appears.
  useEffect(() => {
    if (phase === "running" && mode === "listening" && current) {
      handleSpeak(current.word);
    }
  }, [phase, mode, current, handleSpeak]);

  const handleAnswer = useCallback(
    (correct: boolean) => {
      if (!current) return;
      reviewWord(current.id, correct);
      if (correct) setCorrectCount((c) => c + 1);
      setFlash(feedbackLine(correct, index));

      setTimeout(() => {
        setFlash(null);
        if (index + 1 >= queue.length) setPhase("done");
        else setIndex((i) => i + 1);
      }, 500);
    },
    [current, index, queue.length, reviewWord],
  );

  const choices = useMemo(() => {
    if (!current) return [];
    if (mode === "meaning") return buildChoices(current, pool, "meaning");
    if (mode === "reverse" || mode === "listening")
      return buildChoices(current, pool, "word");
    return [];
  }, [current, mode, pool]);

  /* ------------------------------------------------------------ picking */
  if (phase === "picking") {
    return (
      <div className="space-y-8">
        <Card className="p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-bangla text-xl">আজকের পড়া</h2>
              <p className="font-bangla text-sm text-muted">
                {hydrated && due > 0
                  ? `${toBn(due)}টি শব্দ রিভিশনের জন্য প্রস্তুত।`
                  : "নতুন শব্দ দিয়ে শুরু করুন — রিভিশন নিজে থেকেই আসবে।"}
              </p>
            </div>
            <span className="brut-sm px-3 py-1.5 text-sm font-extrabold">
              🗂️ {toBn(Object.keys(state.srs).length)} / {toBn(pool.length)} শব্দ
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {([1, 2, 3, 4, 5] as const).map((box) => (
              <div key={box} className="surface-alt rounded-xl border-2 border-line-soft p-2 text-center">
                <p className="text-lg font-extrabold">{toBn(boxes[box])}</p>
                <p className="font-bangla text-[10px] text-muted">Box {toBn(box)}</p>
              </div>
            ))}
          </div>
        </Card>

        <div>
          <h2 className="font-bangla mb-4 text-lg font-bold">মোড বেছে নিন</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODES.map((m) => (
              <button key={m.id} onClick={() => start(m.id)} className="text-left">
                <Card interactive className="h-full p-5">
                  <span
                    className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-line text-2xl"
                    style={{ backgroundColor: m.color }}
                    aria-hidden
                  >
                    {m.emoji}
                  </span>
                  <h3 className="font-bangla text-lg">{m.title}</h3>
                  <p className="font-bangla mt-1 text-sm text-muted">{m.desc}</p>
                </Card>
              </button>
            ))}
          </div>
        </div>

        {hydrated && pickWeakWords(pool, state, SESSION_SIZE).length > 0 ? (
          <Card className="flex flex-wrap items-center justify-between gap-4 p-5">
            <div>
              <h3 className="font-bangla text-lg">😰 দুর্বল শব্দ</h3>
              <p className="font-bangla text-sm text-muted">
                যেগুলোতে বারবার ভুল করছেন, শুধু সেগুলো নিয়ে একটা রাউন্ড।
              </p>
            </div>
            <Button tone="coral" onClick={() => start("meaning", true)}>
              🎯 দুর্বলগুলো চর্চা করুন
            </Button>
          </Card>
        ) : null}
      </div>
    );
  }

  /* --------------------------------------------------------------- done */
  if (phase === "done") {
    const percent = queue.length ? Math.round((correctCount / queue.length) * 100) : 0;
    const verdict = scoreVerdict(percent);
    return (
      <>
        <Confetti fire={percent >= 80} />
        <Card size="lg" className="mx-auto max-w-lg space-y-5 p-8 text-center">
          <span className="text-6xl" aria-hidden>
            {verdict.emoji}
          </span>
          <h2 className="font-bangla text-3xl">{verdict.title}</h2>
          <p className="font-bangla text-muted">{verdict.line}</p>

          <div className="grid grid-cols-3 gap-3">
            {[
              { l: "সঠিক", v: toBn(correctCount), c: "#14c39a" },
              { l: "মোট", v: toBn(queue.length), c: "#1a91ff" },
              { l: "স্কোর", v: `${toBn(percent)}%`, c: "#ffb020" },
            ].map((s) => (
              <div key={s.l} className="brut-sm p-3">
                <p className="text-2xl font-extrabold" style={{ color: s.c }}>
                  {s.v}
                </p>
                <p className="font-bangla text-xs text-muted">{s.l}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="flex-1" onClick={() => start(mode)}>
              🔄 আরেক রাউন্ড
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => setPhase("picking")}
            >
              🎛️ মোড বদলান
            </Button>
          </div>
        </Card>
      </>
    );
  }

  /* ------------------------------------------------------------ running */
  if (!current) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Button size="sm" variant="ghost" onClick={() => setPhase("picking")}>
          ← থামুন
        </Button>
        <div className="flex-1">
          <ProgressBar value={index} max={queue.length} color="#7c5cff" height={12} />
        </div>
        <span className="text-sm font-extrabold whitespace-nowrap">
          {toBn(index + 1)}/{toBn(queue.length)}
        </span>
      </div>

      <div className={cn("transition-opacity", flash && "opacity-60")}>
        {mode === "flip" ? (
          <FlipCard word={current} onAnswer={handleAnswer} onSpeak={handleSpeak} />
        ) : null}

        {mode === "meaning" ? (
          <ChoiceQuestion
            questionKey={current.id}
            subPrompt="এই শব্দের বাংলা অর্থ কোনটি?"
            prompt={current.word}
            choices={choices}
            bnChoices
            onAnswer={handleAnswer}
          />
        ) : null}

        {mode === "reverse" ? (
          <ChoiceQuestion
            questionKey={current.id}
            subPrompt="এই অর্থের ইংরেজি শব্দ কোনটি?"
            prompt={<span className="font-bangla">{current.meaning}</span>}
            choices={choices}
            onAnswer={handleAnswer}
          />
        ) : null}

        {mode === "listening" ? (
          <ChoiceQuestion
            questionKey={current.id}
            subPrompt="শুনে বলুন — কোন শব্দটি বলা হলো?"
            prompt={
              <button
                type="button"
                onClick={() => handleSpeak(current.word)}
                className="brut-sm brut-press px-6 py-4 text-2xl"
              >
                🔊 আবার শুনুন
              </button>
            }
            choices={choices}
            onAnswer={handleAnswer}
          />
        ) : null}

        {mode === "spelling" ? (
          <SpellingQuestion word={current} onAnswer={handleAnswer} onSpeak={handleSpeak} />
        ) : null}
      </div>

      {flash ? (
        <p
          className="font-bangla anim-pop text-center text-xl font-extrabold"
          role="status"
          aria-live="polite"
        >
          {flash}
        </p>
      ) : null}
    </div>
  );
}
