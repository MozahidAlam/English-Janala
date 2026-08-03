"use client";

import { useEffect } from "react";
import type { GrammarLesson } from "@/lib/types";
import { useProgress } from "@/lib/hooks/useProgress";
import { Button } from "@/components/ui/Button";

/**
 * Marks a lesson as read once it has actually been on screen for a while, so
 * a stray click doesn't award XP. Also renders the manual "done" button.
 */
export function LessonReader({ lesson }: { lesson: GrammarLesson }) {
  const { state, hydrated, finishLesson } = useProgress();
  const isRead = state.readLessons.includes(lesson.slug);

  useEffect(() => {
    if (!hydrated || isRead) return;
    const t = setTimeout(() => finishLesson(lesson.slug), 25_000);
    return () => clearTimeout(t);
  }, [hydrated, isRead, lesson.slug, finishLesson]);

  return (
    <div className="brut flex flex-wrap items-center justify-between gap-4 p-5">
      <div>
        <p className="font-bangla text-lg font-bold">
          {isRead ? "✅ এই লেসনটি শেষ করেছেন" : "পড়া শেষ হলে চিহ্নিত করুন"}
        </p>
        <p className="font-bangla text-sm text-muted">
          {isRead
            ? "চাইলে আবার পড়তে পারেন — নিচের কুইজটাও আবার দিতে পারেন।"
            : "প্রতিটি লেসন শেষ করলে ২০ XP পাবেন।"}
        </p>
      </div>
      <Button
        tone={isRead ? "mint" : "sky"}
        onClick={() => finishLesson(lesson.slug)}
        disabled={isRead}
      >
        {isRead ? "✅ শেষ" : "✓ পড়া শেষ (+২০ XP)"}
      </Button>
    </div>
  );
}
