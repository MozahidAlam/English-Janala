/**
 * Learner data persistence.
 *
 * Deliberately minimal: only what makes the lessons work — the spaced-repetition
 * schedule, saved words, and which lessons have been read. No XP, no streaks,
 * no scores. Everything lives in localStorage; nothing is ever sent anywhere.
 */
import type { LearnerState, SrsCard } from "@/lib/types";
import { clamp, dateKey } from "@/lib/utils";

export const STORAGE_KEY = "ej.progress.v1";
export const SCHEMA_VERSION = 2;

export function initialState(): LearnerState {
  return {
    version: SCHEMA_VERSION,
    srs: {},
    bookmarks: [],
    readLessons: [],
  };
}

/* ------------------------------ validation ------------------------------ */

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function num(v: unknown, fallback = 0): number {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}

function parseSrs(v: unknown): Record<string, SrsCard> {
  if (!isRecord(v)) return {};
  const out: Record<string, SrsCard> = {};
  for (const [id, raw] of Object.entries(v)) {
    if (!isRecord(raw)) continue;
    out[id] = {
      id: num(raw.id, Number(id)),
      box: clamp(num(raw.box, 1), 1, 5) as SrsCard["box"],
      due: typeof raw.due === "string" ? raw.due : dateKey(),
      seen: num(raw.seen),
      correct: num(raw.correct),
      lapses: num(raw.lapses),
    };
  }
  return out;
}

/**
 * Parse untrusted JSON from localStorage into valid state. Also tolerates the
 * v1 shape, which carried extra gamification fields we simply drop.
 */
export function parseState(raw: unknown): LearnerState {
  if (!isRecord(raw)) return initialState();
  return {
    version: SCHEMA_VERSION,
    srs: parseSrs(raw.srs),
    bookmarks: Array.isArray(raw.bookmarks)
      ? raw.bookmarks.filter((x): x is number => typeof x === "number")
      : [],
    readLessons: Array.isArray(raw.readLessons)
      ? raw.readLessons.filter((x): x is string => typeof x === "string")
      : [],
  };
}

/* ------------------------------ persistence ------------------------------ */

export function loadState(): LearnerState {
  if (typeof window === "undefined") return initialState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState();
    return parseState(JSON.parse(raw));
  } catch {
    // Corrupt or unreadable storage — start clean rather than crash the app.
    return initialState();
  }
}

export function saveState(state: LearnerState): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    // Quota exceeded or storage disabled (private mode). Session still works.
    return false;
  }
}

/* ------------------------------ transitions ------------------------------ */

export function toggleBookmark(state: LearnerState, wordId: number): LearnerState {
  const has = state.bookmarks.includes(wordId);
  return {
    ...state,
    bookmarks: has
      ? state.bookmarks.filter((id) => id !== wordId)
      : [...state.bookmarks, wordId],
  };
}

export function markLessonRead(state: LearnerState, slug: string): LearnerState {
  if (state.readLessons.includes(slug)) return state;
  return { ...state, readLessons: [...state.readLessons, slug] };
}

/* ------------------------------ derived ------------------------------ */

export function totalWordsStudied(state: LearnerState): number {
  return Object.keys(state.srs).length;
}

export function masteredWords(state: LearnerState): number {
  return Object.values(state.srs).filter((c) => c.box >= 5).length;
}
