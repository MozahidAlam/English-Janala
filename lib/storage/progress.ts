/**
 * Progress persistence. Everything lives in localStorage — no account,
 * no database, no network. The whole state is a single JSON blob so it can be
 * exported to a file and imported on another device.
 */
import type { DayActivity, ProgressState, SrsCard } from "@/lib/types";
import { addDays, clamp, dateKey, daysBetween } from "@/lib/utils";

export const STORAGE_KEY = "ej.progress.v1";
export const SCHEMA_VERSION = 1;

export const EMPTY_DAY: DayActivity = { xp: 0, words: 0, lessons: 0, quizzes: 0 };

export function initialState(): ProgressState {
  return {
    version: SCHEMA_VERSION,
    xp: 0,
    streak: 0,
    bestStreak: 0,
    lastActive: null,
    dailyGoal: 50,
    activity: {},
    srs: {},
    bookmarks: [],
    readLessons: [],
    lessonScores: {},
    gameScores: {},
    badges: [],
    createdAt: dateKey(),
  };
}

/* ------------------------------ validation ------------------------------ */

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function num(v: unknown, fallback = 0): number {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}

function strArray(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
}

function numArray(v: unknown): number[] {
  return Array.isArray(v) ? v.filter((x): x is number => typeof x === "number") : [];
}

function numRecord(v: unknown): Record<string, number> {
  if (!isRecord(v)) return {};
  const out: Record<string, number> = {};
  for (const [k, val] of Object.entries(v)) if (typeof val === "number") out[k] = val;
  return out;
}

function parseActivity(v: unknown): Record<string, DayActivity> {
  if (!isRecord(v)) return {};
  const out: Record<string, DayActivity> = {};
  for (const [day, raw] of Object.entries(v)) {
    if (!isRecord(raw)) continue;
    out[day] = {
      xp: num(raw.xp),
      words: num(raw.words),
      lessons: num(raw.lessons),
      quizzes: num(raw.quizzes),
    };
  }
  return out;
}

function parseSrs(v: unknown): Record<string, SrsCard> {
  if (!isRecord(v)) return {};
  const out: Record<string, SrsCard> = {};
  for (const [id, raw] of Object.entries(v)) {
    if (!isRecord(raw)) continue;
    const box = clamp(num(raw.box, 1), 1, 5) as SrsCard["box"];
    out[id] = {
      id: num(raw.id, Number(id)),
      box,
      due: typeof raw.due === "string" ? raw.due : dateKey(),
      seen: num(raw.seen),
      correct: num(raw.correct),
      lapses: num(raw.lapses),
    };
  }
  return out;
}

/** Parse untrusted JSON (localStorage or an imported file) into valid state. */
export function parseState(raw: unknown): ProgressState {
  if (!isRecord(raw)) return initialState();
  const base = initialState();
  return {
    version: SCHEMA_VERSION,
    xp: Math.max(0, num(raw.xp)),
    streak: Math.max(0, num(raw.streak)),
    bestStreak: Math.max(0, num(raw.bestStreak)),
    lastActive: typeof raw.lastActive === "string" ? raw.lastActive : null,
    dailyGoal: clamp(num(raw.dailyGoal, 50), 10, 500),
    activity: parseActivity(raw.activity),
    srs: parseSrs(raw.srs),
    bookmarks: numArray(raw.bookmarks),
    readLessons: strArray(raw.readLessons),
    lessonScores: numRecord(raw.lessonScores),
    gameScores: numRecord(raw.gameScores),
    badges: strArray(raw.badges),
    createdAt:
      typeof raw.createdAt === "string" ? raw.createdAt : base.createdAt,
  };
}

/* ------------------------------ persistence ------------------------------ */

export function loadState(): ProgressState {
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

export function saveState(state: ProgressState): boolean {
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

export interface ActivityDelta {
  readonly xp?: number;
  readonly words?: number;
  readonly lessons?: number;
  readonly quizzes?: number;
}

/**
 * Record activity for today: adds XP, updates the streak, and appends to the
 * activity heatmap. Pure — returns a new state.
 */
export function recordActivity(
  state: ProgressState,
  delta: ActivityDelta,
  today = dateKey(),
): ProgressState {
  const gained = Math.max(0, delta.xp ?? 0);
  const prev = state.activity[today] ?? EMPTY_DAY;
  const day: DayActivity = {
    xp: prev.xp + gained,
    words: prev.words + (delta.words ?? 0),
    lessons: prev.lessons + (delta.lessons ?? 0),
    quizzes: prev.quizzes + (delta.quizzes ?? 0),
  };

  const { streak, bestStreak } = nextStreak(state, today);

  return {
    ...state,
    xp: state.xp + gained,
    streak,
    bestStreak,
    lastActive: today,
    activity: { ...state.activity, [today]: day },
  };
}

function nextStreak(
  state: ProgressState,
  today: string,
): { streak: number; bestStreak: number } {
  if (state.lastActive === today) {
    return { streak: state.streak, bestStreak: state.bestStreak };
  }
  const gap = state.lastActive ? daysBetween(state.lastActive, today) : Infinity;
  // Same day handled above; 1 day gap continues the streak, anything else resets.
  const streak = gap === 1 ? state.streak + 1 : 1;
  return { streak, bestStreak: Math.max(state.bestStreak, streak) };
}

/**
 * Streak shown in the UI. The stored value can be stale if the user has been
 * away, so recompute against today before displaying it.
 */
export function liveStreak(state: ProgressState, today = dateKey()): number {
  if (!state.lastActive) return 0;
  const gap = daysBetween(state.lastActive, today);
  return gap <= 1 ? state.streak : 0;
}

export function toggleBookmark(state: ProgressState, wordId: number): ProgressState {
  const has = state.bookmarks.includes(wordId);
  return {
    ...state,
    bookmarks: has
      ? state.bookmarks.filter((id) => id !== wordId)
      : [...state.bookmarks, wordId],
  };
}

export function markLessonRead(state: ProgressState, slug: string): ProgressState {
  if (state.readLessons.includes(slug)) return state;
  return { ...state, readLessons: [...state.readLessons, slug] };
}

export function recordLessonScore(
  state: ProgressState,
  slug: string,
  percent: number,
): ProgressState {
  const best = Math.max(state.lessonScores[slug] ?? 0, clamp(percent, 0, 100));
  return { ...state, lessonScores: { ...state.lessonScores, [slug]: best } };
}

export function recordGameScore(
  state: ProgressState,
  slug: string,
  score: number,
): ProgressState {
  const best = Math.max(state.gameScores[slug] ?? 0, score);
  return { ...state, gameScores: { ...state.gameScores, [slug]: best } };
}

export function setDailyGoal(state: ProgressState, goal: number): ProgressState {
  return { ...state, dailyGoal: clamp(goal, 10, 500) };
}

/* ------------------------------ derived stats ------------------------------ */

export function todayXp(state: ProgressState, today = dateKey()): number {
  return state.activity[today]?.xp ?? 0;
}

export function totalWordsStudied(state: ProgressState): number {
  return Object.keys(state.srs).length;
}

export function masteredWords(state: ProgressState): number {
  return Object.values(state.srs).filter((c) => c.box >= 5).length;
}

export function activeDays(state: ProgressState): number {
  return Object.values(state.activity).filter((d) => d.xp > 0).length;
}

export function totalQuizzes(state: ProgressState): number {
  return Object.values(state.activity).reduce((sum, d) => sum + d.quizzes, 0);
}

/** Last `days` calendar days, oldest first — powers the heatmap. */
export function heatmapDays(
  state: ProgressState,
  days = 91,
  today = dateKey(),
): Array<{ date: string; xp: number }> {
  const out: Array<{ date: string; xp: number }> = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = addDays(today, -i);
    out.push({ date, xp: state.activity[date]?.xp ?? 0 });
  }
  return out;
}

/* ------------------------------ import / export ------------------------------ */

export function exportState(state: ProgressState): string {
  return JSON.stringify({ app: "english-janala", ...state }, null, 2);
}

export function importState(json: string): ProgressState {
  const parsed: unknown = JSON.parse(json);
  return parseState(parsed);
}
