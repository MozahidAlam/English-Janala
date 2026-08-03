"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CATEGORIES, GRAMMAR_LESSONS, TOTAL_LESSONS, TOTAL_MINUTES } from "@/lib/content/grammar";
import { useProgress } from "@/lib/hooks/useProgress";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Button } from "@/components/ui/Button";
import { accentColor, cn, toBn } from "@/lib/utils";

export function GrammarIndex() {
  const { state, hydrated } = useProgress();
  const [query, setQuery] = useState("");

  const read = useMemo(() => new Set(state.readLessons), [state.readLessons]);
  const done = hydrated ? read.size : 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return GRAMMAR_LESSONS.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.titleBn.includes(query.trim()) ||
        l.rule.includes(query.trim()) ||
        l.hook.includes(query.trim()),
    );
  }, [query]);

  const nextLesson =
    GRAMMAR_LESSONS.find((l) => !read.has(l.slug)) ?? GRAMMAR_LESSONS[0]!;

  return (
    <div className="space-y-10">
      {/* ------------------------------------------------ progress banner */}
      <Card className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center">
        <div className="flex-1">
          <div className="font-bangla mb-2 flex items-baseline justify-between gap-3">
            <h2 className="text-lg font-bold">আপনার গ্রামার যাত্রা</h2>
            <span className="text-sm font-extrabold">
              {toBn(done)} / {toBn(TOTAL_LESSONS)} লেসন
            </span>
          </div>
          <ProgressBar value={done} max={TOTAL_LESSONS} color="#7c5cff" />
          <p className="font-bangla mt-2 text-sm text-muted">
            মোট প্রায় {toBn(TOTAL_MINUTES)} মিনিটের পড়া। দিনে একটা করে করলে দেড় মাসেই শেষ।
          </p>
        </div>
        <Link href={`/grammar/${nextLesson.slug}`} className="shrink-0">
          <Button tone="ink" size="lg">
            {done === 0 ? "🚀 শুরু করুন" : "▶️ পরেরটা পড়ুন"}
          </Button>
        </Link>
      </Card>

      {/* ------------------------------------------------ search */}
      <div>
        <label htmlFor="grammar-search" className="sr-only">
          গ্রামার টপিক খুঁজুন
        </label>
        <input
          id="grammar-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="টপিক খুঁজুন — যেমন: Tense, Article, Voice…"
          className="font-bangla brut-sm w-full px-4 py-3 outline-none"
        />
      </div>

      {/* ------------------------------------------------ results / categories */}
      {filtered ? (
        <section>
          <h2 className="font-bangla mb-4 text-lg font-bold">
            {toBn(filtered.length)}টি ফলাফল
          </h2>
          {filtered.length === 0 ? (
            <p className="font-bangla text-muted">
              কিছু পাওয়া যায়নি। অন্য শব্দ দিয়ে চেষ্টা করুন।
            </p>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {filtered.map((l) => (
                <LessonRow key={l.slug} lesson={l} isRead={read.has(l.slug)} />
              ))}
            </ul>
          )}
        </section>
      ) : (
        CATEGORIES.map((cat) => {
          const lessons = GRAMMAR_LESSONS.filter((l) => l.category === cat.id);
          const catDone = lessons.filter((l) => read.has(l.slug)).length;
          return (
            <section key={cat.id} id={cat.id} className="scroll-mt-24">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-line text-2xl shadow-(--shadow-hard-sm)"
                  style={{ backgroundColor: accentColor(cat.accent) }}
                  aria-hidden
                >
                  {cat.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-bangla text-2xl">{cat.titleBn}</h2>
                  <p className="font-bangla text-sm text-muted">{cat.blurb}</p>
                </div>
                <span className="brut-sm px-3 py-1 text-sm font-extrabold whitespace-nowrap">
                  {toBn(catDone)}/{toBn(lessons.length)}
                </span>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2">
                {lessons.map((l) => (
                  <LessonRow
                    key={l.slug}
                    lesson={l}
                    isRead={read.has(l.slug)}
                  />
                ))}
              </ul>
            </section>
          );
        })
      )}
    </div>
  );
}

function LessonRow({
  lesson,
  isRead,
}: {
  lesson: (typeof GRAMMAR_LESSONS)[number];
  isRead: boolean;
}) {
  return (
    <li>
      <Link href={`/grammar/${lesson.slug}`}>
        <Card interactive className={cn("h-full p-4", isRead && "surface-alt")}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-bangla text-lg leading-snug">{lesson.titleBn}</h3>
              <p className="truncate text-xs font-bold tracking-wide text-muted uppercase">
                {lesson.title}
              </p>
            </div>
            <span className="shrink-0 text-xl" aria-hidden>
              {isRead ? "✅" : "○"}
            </span>
          </div>
          <p className="font-bangla mt-2 line-clamp-2 text-sm text-muted">{lesson.hook}</p>
          <div className="mt-3 flex items-center gap-3 text-xs font-bold text-muted">
            <span>⏱ {toBn(lesson.minutes)} মিনিট</span>
            <span>❓ {toBn(lesson.quiz.length)} প্রশ্ন</span>
          </div>
        </Card>
      </Link>
    </li>
  );
}
