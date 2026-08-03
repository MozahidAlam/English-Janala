"use client";

import { useEffect, useState } from "react";
import type { GrammarQuestion } from "@/lib/types";
import { useProgress } from "@/lib/hooks/useProgress";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Confetti } from "@/components/ui/Confetti";
import { scoreVerdict } from "@/lib/study/session";
import { cn, toBn } from "@/lib/utils";

export function LessonQuiz({
  slug,
  questions,
}: {
  slug: string;
  questions: readonly GrammarQuestion[];
}) {
  const { state, saveLessonScore } = useProgress();
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  const best = state.lessonScores[slug];
  const question = questions[index];

  useEffect(() => {
    if (!done) return;
    const percent = Math.round((correct / questions.length) * 100);
    saveLessonScore(slug, percent);
    // saveLessonScore is stable; this runs once per completed attempt.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  if (!started) {
    return (
      <Card className="flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="font-bangla text-2xl">📝 বুঝেছেন কিনা দেখি?</h2>
          <p className="font-bangla mt-1 text-sm text-muted">
            {toBn(questions.length)}টি প্রশ্ন। প্রতিটির উত্তরের ব্যাখ্যাও পাবেন।
            {typeof best === "number" ? ` আপনার সেরা স্কোর: ${toBn(best)}%।` : ""}
          </p>
        </div>
        <Button size="lg" tone="violet" onClick={() => setStarted(true)}>
          কুইজ শুরু করুন →
        </Button>
      </Card>
    );
  }

  if (done) {
    const percent = Math.round((correct / questions.length) * 100);
    const verdict = scoreVerdict(percent);
    return (
      <>
        <Confetti fire={percent >= 80} />
        <Card size="lg" className="space-y-4 p-8 text-center">
          <span className="text-6xl" aria-hidden>
            {verdict.emoji}
          </span>
          <h2 className="font-bangla text-3xl">{verdict.title}</h2>
          <p className="font-bangla text-muted">{verdict.line}</p>
          <p className="text-4xl font-extrabold">
            {toBn(correct)} / {toBn(questions.length)}{" "}
            <span className="text-xl text-muted">({toBn(percent)}%)</span>
          </p>
          <Button
            onClick={() => {
              setIndex(0);
              setPicked(null);
              setCorrect(0);
              setDone(false);
            }}
          >
            🔄 আবার চেষ্টা করুন
          </Button>
        </Card>
      </>
    );
  }

  if (!question) return null;

  const answered = picked !== null;

  const next = () => {
    if (index + 1 >= questions.length) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  };

  return (
    <Card size="lg" className="space-y-5 p-6">
      <div className="flex items-center gap-3">
        <ProgressBar value={index} max={questions.length} color="#7c5cff" height={12} />
        <span className="text-sm font-extrabold whitespace-nowrap">
          {toBn(index + 1)}/{toBn(questions.length)}
        </span>
      </div>

      <h2 className="font-bangla text-xl leading-relaxed">{question.q}</h2>

      <div className="grid gap-2.5" role="group" aria-label="উত্তর বাছুন">
        {question.options.map((opt, i) => {
          const isAnswer = i === question.answer;
          const isPicked = picked === i;
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => {
                setPicked(i);
                if (i === question.answer) setCorrect((c) => c + 1);
              }}
              className={cn(
                "brut-sm brut-press px-4 py-3 text-left font-bold",
                answered && isAnswer && "bg-mint text-ink",
                answered && isPicked && !isAnswer && "anim-shake bg-coral text-white",
                answered && !isAnswer && !isPicked && "opacity-50",
              )}
            >
              <span className="mr-2 opacity-60">{["ক", "খ", "গ", "ঘ"][i]}.</span>
              {opt}
              {answered && isAnswer ? <span className="ml-2">✅</span> : null}
              {answered && isPicked && !isAnswer ? <span className="ml-2">❌</span> : null}
            </button>
          );
        })}
      </div>

      {answered ? (
        <div className="anim-pop space-y-3">
          <div
            className="rounded-2xl border-2 border-line p-4"
            style={{ backgroundColor: picked === question.answer ? "#d7f7ec" : "#ffe6e6" }}
          >
            <p className="font-bangla text-sm font-bold text-ink">
              {picked === question.answer ? "✅ ঠিক আছে!" : "❌ ঠিক হয়নি"}
            </p>
            <p className="font-bangla mt-1 text-sm text-ink/80">{question.explain}</p>
          </div>
          <Button className="w-full" onClick={next}>
            {index + 1 >= questions.length ? "ফলাফল দেখুন →" : "পরের প্রশ্ন →"}
          </Button>
        </div>
      ) : null}
    </Card>
  );
}
