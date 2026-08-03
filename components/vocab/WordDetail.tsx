"use client";

import { useEffect, useState } from "react";
import type { Word, WordDetail as Detail, WordEnrichment } from "@/lib/types";
import { getWordDetail, snapshotDetail } from "@/lib/api/vocabulary";
import { cachedEnrichment, enrichWord } from "@/lib/api/dictionary";
import { useSpeech } from "@/lib/hooks/useSpeech";
import { useProgress } from "@/lib/hooks/useProgress";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Card";

/**
 * Word detail panel. Loads the vocabulary detail and the dictionary/Datamuse
 * enrichment in parallel and renders whichever arrives — a failed enrichment
 * simply hides its section rather than blocking the panel.
 */
export function WordDetail({ word }: { word: Word }) {
  // Seed from the bundled snapshot and any cached enrichment so the panel has
  // real content on the very first frame; the network only ever upgrades it.
  const [detail, setDetail] = useState<Detail | null>(() => snapshotDetail(word.id));
  const [rich, setRich] = useState<WordEnrichment | null>(() =>
    cachedEnrichment(word.word),
  );
  const [loading, setLoading] = useState(() => cachedEnrichment(word.word) === null);
  const { speak, speaking } = useSpeech();
  const { state, toggleBookmark } = useProgress();
  const bookmarked = state.bookmarks.includes(word.id);

  useEffect(() => {
    let alive = true;
    const seededRich = cachedEnrichment(word.word);
    setDetail(snapshotDetail(word.id));
    setRich(seededRich);
    setLoading(seededRich === null);

    void getWordDetail(word.id).then((d) => {
      if (alive && d) setDetail(d);
    });
    void enrichWord(word.word).then((r) => {
      if (!alive) return;
      setRich(r);
      setLoading(false);
    });

    return () => {
      alive = false;
    };
  }, [word.id, word.word]);

  const synonyms = [
    ...new Set([...(detail?.synonyms ?? []), ...(rich?.synonyms ?? [])]),
  ].slice(0, 8);

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-3xl break-words">{word.word}</h2>
          <p className="mt-1 text-sm text-muted">
            {rich?.phonetic ? <span className="font-mono">{rich.phonetic}</span> : null}
            {word.pronunciation ? (
              <span className="font-bangla"> · {word.pronunciation}</span>
            ) : null}
            {detail?.partsOfSpeech ? (
              <span className="ml-2 italic">({detail.partsOfSpeech})</span>
            ) : null}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              speak(word.word, rich?.audioUrl, {
                getAudioUrl: () => enrichWord(word.word).then((r) => r.audioUrl),
              })
            }
            aria-label="উচ্চারণ শুনুন"
          >
            {speaking ? "🔊…" : "🔊 শুনুন"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => toggleBookmark(word.id)}
            aria-pressed={bookmarked}
          >
            {bookmarked ? "🔖 সেভড" : "🏷️ সেভ"}
          </Button>
        </div>
      </header>

      <Field label="বাংলা অর্থ">
        <p className="font-bangla text-xl font-semibold">
          {detail?.meaning ?? word.meaning ?? "পাওয়া যায়নি"}
        </p>
      </Field>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : null}

      {detail?.sentence ? (
        <Field label="উদাহরণ বাক্য">
          <p className="italic">“{detail.sentence}”</p>
          <button
            onClick={() => speak(detail.sentence!)}
            className="mt-2 text-xs font-bold text-sky hover:underline"
          >
            🔊 বাক্যটি শুনুন
          </button>
        </Field>
      ) : null}

      {rich?.definitions.length ? (
        <Field label="English Definition">
          <ul className="space-y-2.5">
            {rich.definitions.map((d, i) => (
              <li key={i}>
                <span className="text-xs font-bold text-muted italic">
                  {d.partOfSpeech}
                </span>
                <p className="text-sm">{d.definition}</p>
                {d.example ? (
                  <p className="mt-0.5 text-xs text-muted italic">e.g. {d.example}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </Field>
      ) : null}

      {synonyms.length ? (
        <Field label="Synonyms">
          <div className="flex flex-wrap gap-2">
            {synonyms.map((s) => (
              <Chip key={s} className="surface-alt">
                {s}
              </Chip>
            ))}
          </div>
        </Field>
      ) : null}

      {rich?.antonyms.length ? (
        <Field label="Antonyms">
          <div className="flex flex-wrap gap-2">
            {rich.antonyms.map((s) => (
              <Chip key={s} tint="rose">
                {s}
              </Chip>
            ))}
          </div>
        </Field>
      ) : null}

      {rich?.collocations.length ? (
        <Field label="সাধারণত যেসব শব্দের সাথে বসে">
          <div className="flex flex-wrap gap-2">
            {rich.collocations.map((s) => (
              <Chip key={s} tint="mint">
                {word.word.toLowerCase()} {s}
              </Chip>
            ))}
          </div>
        </Field>
      ) : null}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="surface-alt rounded-2xl border-2 border-line-soft p-4">
      <h3 className="font-bangla mb-1.5 text-xs font-extrabold tracking-widest text-muted uppercase">
        {label}
      </h3>
      {children}
    </section>
  );
}
