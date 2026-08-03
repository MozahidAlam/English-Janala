"use client";

import type { Word } from "@/lib/types";
import { cn } from "@/lib/utils";

export function WordCard({
  word,
  onOpen,
  onSpeak,
  bookmarked,
  onBookmark,
  speaking,
}: {
  word: Word;
  onOpen: (word: Word) => void;
  onSpeak: (word: Word) => void;
  bookmarked: boolean;
  onBookmark: (id: number) => void;
  speaking: boolean;
}) {
  return (
    <article className="brut brut-press flex h-full flex-col gap-3 p-5 text-center">
      <div className="flex items-start justify-between gap-2">
        <span className="surface-alt rounded-full border-2 border-line-soft px-2 py-0.5 text-[11px] font-bold text-muted">
          Lesson {word.level}
        </span>
        <button
          onClick={() => onBookmark(word.id)}
          aria-label={bookmarked ? "বুকমার্ক সরান" : "বুকমার্ক করুন"}
          aria-pressed={bookmarked}
          title={bookmarked ? "বুকমার্ক সরান" : "বুকমার্ক করুন"}
          className="-m-2 flex h-11 w-11 items-center justify-center rounded-lg text-xl leading-none transition-transform hover:scale-125"
        >
          <span aria-hidden>{bookmarked ? "🔖" : "🏷️"}</span>
        </button>
      </div>

      <h3 className="text-2xl font-extrabold break-words">{word.word}</h3>

      <p className="font-bangla text-xs font-bold tracking-widest text-muted uppercase">
        অর্থ / উচ্চারণ
      </p>

      <p className="font-bangla flex-1 text-xl font-semibold break-words">
        {word.meaning ?? "—"}
        {word.pronunciation ? (
          <span className="block text-base font-normal text-muted">
            /{word.pronunciation}/
          </span>
        ) : null}
      </p>

      <div className="mt-1 flex items-center justify-between gap-2">
        <button
          onClick={() => onOpen(word)}
          className="brut-sm brut-press tint-sky flex-1 py-2 text-sm font-bold"
          aria-label={`${word.word} শব্দের বিস্তারিত`}
        >
          ℹ️ বিস্তারিত
        </button>
        <button
          onClick={() => onSpeak(word)}
          className={cn(
            "brut-sm brut-press flex-1 py-2 text-sm font-bold",
            "tint-amber",
            speaking && "animate-pulse",
          )}
          aria-label={`${word.word} উচ্চারণ শুনুন`}
        >
          🔊 শুনুন
        </button>
      </div>
    </article>
  );
}
