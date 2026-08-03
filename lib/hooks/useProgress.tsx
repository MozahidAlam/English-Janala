"use client";

/**
 * Single source of truth for learner progress.
 *
 * Mounts with the empty state so server and client markup match, then hydrates
 * from localStorage in an effect. `hydrated` lets consumers avoid flashing
 * zeroes before real data lands.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Badge, ProgressState } from "@/lib/types";
import {
  type ActivityDelta,
  initialState,
  loadState,
  markLessonRead,
  recordActivity,
  recordGameScore,
  recordLessonScore,
  saveState,
  setDailyGoal as setGoal,
  toggleBookmark as toggleBm,
  STORAGE_KEY,
} from "@/lib/storage/progress";
import { applyReview } from "@/lib/storage/srs";
import { badgeById, newlyEarned } from "@/lib/storage/badges";

interface ProgressContextValue {
  readonly state: ProgressState;
  readonly hydrated: boolean;
  /** True when localStorage rejected a write (private mode / quota). */
  readonly storageBlocked: boolean;
  readonly earnedToast: Badge | null;
  dismissToast: () => void;
  addXp: (delta: ActivityDelta) => void;
  reviewWord: (wordId: number, wasCorrect: boolean, xp?: number) => void;
  toggleBookmark: (wordId: number) => void;
  finishLesson: (slug: string) => void;
  saveLessonScore: (slug: string, percent: number) => void;
  saveGameScore: (slug: string, score: number) => void;
  setDailyGoal: (goal: number) => void;
  replaceState: (next: ProgressState) => void;
  resetAll: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(initialState);
  const [hydrated, setHydrated] = useState(false);
  const [storageBlocked, setStorageBlocked] = useState(false);
  const [earnedToast, setEarnedToast] = useState<Badge | null>(null);
  const toastQueue = useRef<string[]>([]);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  // Keep tabs in sync — progress edited in one tab shows up in the others.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setState(loadState());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /**
   * Apply a pure transition, award any newly-unlocked badges, and persist.
   * All mutations funnel through here so badge checks can never be skipped.
   */
  const commit = useCallback(
    (transform: (prev: ProgressState) => ProgressState) => {
      setState((prev) => {
        const updated = transform(prev);
        const earned = newlyEarned(updated);
        const next =
          earned.length > 0
            ? { ...updated, badges: [...updated.badges, ...earned] }
            : updated;

        if (earned.length > 0) toastQueue.current.push(...earned);
        if (!saveState(next)) setStorageBlocked(true);
        return next;
      });
    },
    [],
  );

  // Drain the badge queue one toast at a time.
  useEffect(() => {
    if (earnedToast || toastQueue.current.length === 0) return;
    const id = toastQueue.current.shift();
    const badge = id ? badgeById(id) : undefined;
    if (badge) setEarnedToast(badge);
  }, [earnedToast, state]);

  const dismissToast = useCallback(() => setEarnedToast(null), []);

  const addXp = useCallback(
    (delta: ActivityDelta) => commit((p) => recordActivity(p, delta)),
    [commit],
  );

  const reviewWord = useCallback(
    (wordId: number, wasCorrect: boolean, xp = wasCorrect ? 10 : 2) =>
      commit((p) =>
        recordActivity(applyReview(p, wordId, wasCorrect), { xp, words: 1 }),
      ),
    [commit],
  );

  const toggleBookmark = useCallback(
    (wordId: number) => commit((p) => toggleBm(p, wordId)),
    [commit],
  );

  const finishLesson = useCallback(
    (slug: string) =>
      commit((p) =>
        p.readLessons.includes(slug)
          ? p
          : recordActivity(markLessonRead(p, slug), { xp: 20, lessons: 1 }),
      ),
    [commit],
  );

  const saveLessonScore = useCallback(
    (slug: string, percent: number) =>
      commit((p) =>
        recordActivity(recordLessonScore(p, slug, percent), {
          xp: Math.round(percent / 4),
          quizzes: 1,
        }),
      ),
    [commit],
  );

  const saveGameScore = useCallback(
    (slug: string, score: number) =>
      commit((p) =>
        recordActivity(recordGameScore(p, slug, score), {
          xp: Math.min(60, Math.round(score / 2)),
          quizzes: 1,
        }),
      ),
    [commit],
  );

  const setDailyGoal = useCallback(
    (goal: number) => commit((p) => setGoal(p, goal)),
    [commit],
  );

  const replaceState = useCallback(
    (next: ProgressState) => commit(() => next),
    [commit],
  );

  const resetAll = useCallback(() => {
    setState(initialState());
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      setStorageBlocked(true);
    }
  }, []);

  const value = useMemo<ProgressContextValue>(
    () => ({
      state,
      hydrated,
      storageBlocked,
      earnedToast,
      dismissToast,
      addXp,
      reviewWord,
      toggleBookmark,
      finishLesson,
      saveLessonScore,
      saveGameScore,
      setDailyGoal,
      replaceState,
      resetAll,
    }),
    [
      state,
      hydrated,
      storageBlocked,
      earnedToast,
      dismissToast,
      addXp,
      reviewWord,
      toggleBookmark,
      finishLesson,
      saveLessonScore,
      saveGameScore,
      setDailyGoal,
      replaceState,
      resetAll,
    ],
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used inside <ProgressProvider>");
  }
  return ctx;
}
