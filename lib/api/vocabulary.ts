/**
 * Vocabulary data access.
 *
 * Live source: Programming Hero open API (no key, CORS-enabled).
 * Fallback:    bundled snapshot in lib/data/vocabulary.json.
 *
 * Every call degrades to the snapshot instead of throwing, so a third-party
 * outage never blanks the UI.
 */
import snapshot from "@/lib/data/vocabulary.json";
import type { Lesson, Word, WordDetail } from "@/lib/types";

const BASE = "https://openapi.programming-hero.com/api";
const TIMEOUT_MS = 12_000;

interface SnapshotWord {
  id: number;
  level: number;
  word: string;
  meaning: string | null;
  pronunciation: string | null;
  sentence: string | null;
  points: number | null;
  partsOfSpeech: string | null;
  synonyms: string[];
}

const SNAP = snapshot as {
  levels: Lesson[];
  words: SnapshotWord[];
  snapshotAt: string;
};

/** In-memory memo so repeated navigations don't refetch. */
const memo = new Map<string, unknown>();

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Vocabulary API ${res.status}`);
  const json = (await res.json()) as { status?: boolean; data?: T };
  if (json.data === undefined || json.data === null) {
    throw new Error("Vocabulary API returned no data");
  }
  return json.data;
}

async function cached<T>(key: string, load: () => Promise<T>, fallback: T): Promise<T> {
  const hit = memo.get(key);
  if (hit !== undefined) return hit as T;
  try {
    const value = await load();
    memo.set(key, value);
    return value;
  } catch {
    // Upstream unavailable — serve the bundled snapshot rather than failing.
    memo.set(key, fallback);
    return fallback;
  }
}

function toWord(raw: SnapshotWord | Record<string, unknown>): Word {
  const r = raw as Record<string, unknown>;
  return {
    id: Number(r.id),
    level: Number(r.level),
    word: String(r.word ?? ""),
    meaning: (r.meaning as string | null) ?? null,
    pronunciation: (r.pronunciation as string | null) ?? null,
  };
}

function toDetail(raw: Record<string, unknown>, id: number): WordDetail {
  return {
    ...toWord({ ...raw, id }),
    sentence: (raw.sentence as string | null) ?? null,
    points: (raw.points as number | null) ?? null,
    partsOfSpeech: (raw.partsOfSpeech as string | null) ?? null,
    synonyms: Array.isArray(raw.synonyms) ? (raw.synonyms as string[]) : [],
  };
}

/* ------------------------------------------------------------------------- */

export function snapshotWords(): readonly Word[] {
  return SNAP.words.map(toWord);
}

export function snapshotDetail(id: number): WordDetail | null {
  const w = SNAP.words.find((x) => x.id === id);
  return w ? toDetail(w as unknown as Record<string, unknown>, id) : null;
}

/** All lessons/levels, ordered. */
export async function getLessons(): Promise<readonly Lesson[]> {
  return cached(
    "lessons",
    async () => {
      const data = await getJson<Array<Record<string, unknown>>>("/levels/all");
      return data
        .map((l) => ({
          id: Number(l.id),
          levelNo: Number(l.level_no),
          lessonName: String(l.lessonName ?? `Lesson ${l.level_no}`),
        }))
        .sort((a, b) => a.levelNo - b.levelNo);
    },
    SNAP.levels,
  );
}

/** Words belonging to one level. */
export async function getWordsByLevel(levelNo: number): Promise<readonly Word[]> {
  const fallback = SNAP.words.filter((w) => w.level === levelNo).map(toWord);
  return cached(
    `level:${levelNo}`,
    async () => {
      const data = await getJson<Array<Record<string, unknown>>>(`/level/${levelNo}`);
      return data.map(toWord);
    },
    fallback,
  );
}

/** Every word across every level. */
export async function getAllWords(): Promise<readonly Word[]> {
  return cached(
    "all",
    async () => {
      const data = await getJson<Array<Record<string, unknown>>>("/words/all");
      const live = data.map(toWord);
      // /words/all omits some Bangla meanings — patch them from the snapshot.
      return live.map((w) => {
        if (w.meaning) return w;
        const snap = SNAP.words.find((s) => s.id === w.id);
        return snap ? { ...w, meaning: snap.meaning, pronunciation: w.pronunciation ?? snap.pronunciation } : w;
      });
    },
    snapshotWords(),
  );
}

/** Full detail for a single word. */
export async function getWordDetail(id: number): Promise<WordDetail | null> {
  const fallback = snapshotDetail(id);
  return cached(
    `word:${id}`,
    async () => {
      const data = await getJson<Record<string, unknown>>(`/word/${id}`);
      const detail = toDetail(data, id);
      // Detail endpoint can return a word without its Bangla meaning.
      if (detail.meaning) return detail;
      return fallback ? { ...detail, meaning: fallback.meaning } : detail;
    },
    fallback,
  );
}

/** Words that actually have content, useful for quizzes and games. */
export function playableWords(): readonly WordDetail[] {
  return SNAP.words
    .filter((w) => w.word && w.meaning)
    .map((w) => toDetail(w as unknown as Record<string, unknown>, w.id));
}
