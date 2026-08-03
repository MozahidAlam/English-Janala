"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Lesson, Word } from "@/lib/types";
import {
  getAllWords,
  getLessons,
  getWordsByLevel,
  snapshotLevel,
} from "@/lib/api/vocabulary";
import { cachedEnrichment, enrichWord } from "@/lib/api/dictionary";
import { useSpeech } from "@/lib/hooks/useSpeech";
import { useProgress } from "@/lib/hooks/useProgress";
import { WordCard } from "@/components/vocab/WordCard";
import { WordDetail } from "@/components/vocab/WordDetail";
import { Modal } from "@/components/ui/Modal";
import { EmptyState, WordCardSkeleton } from "@/components/ui/Skeleton";
import { Button, ButtonLink } from "@/components/ui/Button";
import { cn, toBn } from "@/lib/utils";

type View =
  | { kind: "empty" }
  | { kind: "level"; level: number }
  | { kind: "search"; query: string }
  | { kind: "bookmarks" };

export function VocabularyExplorer({
  initialLessons,
  initialWords,
}: {
  initialLessons: readonly Lesson[];
  /** Snapshot words for the first lesson, so the grid is never empty on arrival. */
  initialWords: readonly Word[];
}) {
  const firstLevel = initialLessons[0]?.levelNo ?? 1;
  const [lessons, setLessons] = useState<readonly Lesson[]>(initialLessons);
  const [words, setWords] = useState<readonly Word[]>(() =>
    initialWords.filter((w) => w.level === firstLevel),
  );
  const [view, setView] = useState<View>({ kind: "level", level: firstLevel });
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Word | null>(null);

  const { speak, speaking } = useSpeech();
  const { state, toggleBookmark } = useProgress();

  // Tracks the view the user is actually looking at, so a late-arriving fetch
  // never overwrites a grid they have already navigated away from.
  const viewRef = useRef(view);
  viewRef.current = view;

  // Refresh the lesson list and the opening word grid from the live API; the
  // server-rendered snapshot already gave us something usable, so a failure
  // here is silent by design.
  useEffect(() => {
    void getLessons().then(setLessons);
    void getWordsByLevel(firstLevel).then((list) => {
      const v = viewRef.current;
      if (v.kind === "level" && v.level === firstLevel) setWords(list);
    });
  }, [firstLevel]);

  const showLevel = useCallback(async (level: number) => {
    // Paint the bundled snapshot immediately — switching lessons should feel
    // instant, with the live list quietly replacing it a moment later.
    const snapshot = snapshotLevel(level);
    setView({ kind: "level", level });
    setWords(snapshot);
    setLoading(snapshot.length === 0);

    const list = await getWordsByLevel(level);
    const v = viewRef.current;
    if (v.kind === "level" && v.level === level) setWords(list);
    setLoading(false);
  }, []);

  const runSearch = useCallback(async () => {
    const q = query.trim().toLowerCase();
    if (!q) return;
    setLoading(true);
    setView({ kind: "search", query: q });
    const all = await getAllWords();
    setWords(
      all.filter(
        (w) =>
          w.word.toLowerCase().includes(q) ||
          (w.meaning ?? "").toLowerCase().includes(q),
      ),
    );
    setLoading(false);
  }, [query]);

  const showBookmarks = useCallback(async () => {
    setLoading(true);
    setView({ kind: "bookmarks" });
    const all = await getAllWords();
    setWords(all.filter((w) => state.bookmarks.includes(w.id)));
    setLoading(false);
  }, [state.bookmarks]);

  const openWord = useCallback(
    (word: Word) => {
      setActive(word);
      // Warm the dictionary cache so the panel usually renders instantly.
      void enrichWord(word.word);
    },
    [],
  );

  /**
   * Play immediately. If the recording is already cached use it; otherwise fall
   * back to the synthesiser now rather than making the user wait on a fetch.
   */
  const handleSpeak = useCallback(
    (word: Word) => {
      const rich = cachedEnrichment(word.word);
      speak(word.word, rich?.audioUrl ?? null, {
        // On phones the synthesiser is sometimes silent; fall back to the
        // recorded pronunciation instead of leaving the tap with no sound.
        getAudioUrl: () => enrichWord(word.word).then((r) => r.audioUrl),
      });
    },
    [speak],
  );

  const heading = useMemo(() => {
    switch (view.kind) {
      case "level":
        return `Lesson ${toBn(view.level)} — ${toBn(words.length)}টি শব্দ`;
      case "search":
        return `“${view.query}” — ${toBn(words.length)}টি ফলাফল`;
      case "bookmarks":
        return `সেভ করা শব্দ — ${toBn(words.length)}টি`;
      default:
        return "";
    }
  }, [view, words.length]);

  return (
    <>
      {/* ---------------------------------------------- Lesson picker */}
      <section aria-label="লেসন নির্বাচন" className="mb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {lessons.map((lesson) => {
            const isActive = view.kind === "level" && view.level === lesson.levelNo;
            return (
              <button
                key={lesson.id}
                onClick={() => void showLevel(lesson.levelNo)}
                aria-pressed={isActive}
                title={lesson.lessonName}
                className={cn(
                  "brut-sm brut-press px-4 py-2.5 text-sm font-bold",
                  isActive && "bg-violet text-white",
                )}
              >
                📖 Lesson {toBn(lesson.levelNo)}
              </button>
            );
          })}
        </div>
        {view.kind === "level" ? (
          <p className="font-bangla mt-3 text-center text-sm text-muted">
            {lessons.find((l) => l.levelNo === view.level)?.lessonName}
          </p>
        ) : null}
      </section>

      {/* ---------------------------------------------- Search */}
      <section aria-label="শব্দ খুঁজুন" className="mb-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void runSearch();
          }}
          className="mx-auto flex max-w-xl gap-2"
        >
          <label htmlFor="vocab-search" className="sr-only">
            শব্দ খুঁজুন
          </label>
          <input
            id="vocab-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ইংরেজি বা বাংলা লিখে খুঁজুন…"
            className="font-bangla brut-sm min-w-0 flex-1 px-4 py-2.5 outline-none"
          />
          <Button type="submit" disabled={!query.trim()}>
            🔍 খুঁজুন
          </Button>
        </form>
        <div className="mt-3 flex justify-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => void showBookmarks()}>
            🔖 সেভ করা ({toBn(state.bookmarks.length)})
          </Button>
          {view.kind !== "empty" ? (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setView({ kind: "empty" });
                setWords([]);
                setQuery("");
              }}
            >
              ✕ পরিষ্কার করুন
            </Button>
          ) : null}
        </div>
      </section>

      {/* ---------------------------------------------- Results */}
      {heading ? (
        <h2 className="font-bangla mb-4 text-center text-lg font-bold">{heading}</h2>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 6 }, (_, i) => <WordCardSkeleton key={i} />)
        ) : view.kind === "empty" ? (
          <EmptyState
            emoji="👆"
            title="একটি Lesson বেছে নিন"
            body="উপরের যেকোনো Lesson বাটনে ক্লিক করুন, অথবা সার্চ বক্সে শব্দ লিখে খুঁজুন।"
          />
        ) : words.length === 0 ? (
          <EmptyState
            emoji={view.kind === "bookmarks" ? "🔖" : "🙈"}
            title={
              view.kind === "bookmarks"
                ? "এখনো কিছু সেভ করেননি"
                : "কোনো শব্দ পাওয়া যায়নি"
            }
            body={
              view.kind === "bookmarks"
                ? "যেকোনো শব্দের কার্ডে 🏷️ চিহ্নে ক্লিক করে সেভ করে রাখুন।"
                : "অন্য বানানে চেষ্টা করুন, অথবা অন্য একটি Lesson দেখুন।"
            }
            action={
              <ButtonLink href="/flashcards" size="sm" variant="outline">
                🧠 ফ্ল্যাশকার্ডে যান
              </ButtonLink>
            }
          />
        ) : (
          words.map((w) => (
            <WordCard
              key={w.id}
              word={w}
              onOpen={openWord}
              onSpeak={handleSpeak}
              bookmarked={state.bookmarks.includes(w.id)}
              onBookmark={toggleBookmark}
              speaking={speaking}
            />
          ))
        )}
      </div>

      <Modal open={active !== null} onClose={() => setActive(null)} wide title="শব্দের বিস্তারিত">
        {active ? <WordDetail word={active} /> : null}
        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={() => setActive(null)}>
            বন্ধ করুন
          </Button>
        </div>
      </Modal>
    </>
  );
}
