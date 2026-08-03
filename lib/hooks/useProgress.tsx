"use client";

/**
 * Single source of truth for learner data (spaced-repetition schedule, saved
 * words, lessons read).
 *
 * Mounts with the empty state so server and client markup match, then hydrates
 * from localStorage in an effect. `hydrated` lets consumers avoid flashing
 * empty values before real data lands.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { LearnerState } from "@/lib/types";
import {
  initialState,
  loadState,
  markLessonRead,
  saveState,
  STORAGE_KEY,
  toggleBookmark as toggleBm,
} from "@/lib/storage/progress";
import { applyReview } from "@/lib/storage/srs";

interface ProgressContextValue {
  readonly state: LearnerState;
  readonly hydrated: boolean;
  /** True when localStorage rejected a write (private mode / quota). */
  readonly storageBlocked: boolean;
  reviewWord: (wordId: number, wasCorrect: boolean) => void;
  toggleBookmark: (wordId: number) => void;
  finishLesson: (slug: string) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LearnerState>(initialState);
  const [hydrated, setHydrated] = useState(false);
  const [storageBlocked, setStorageBlocked] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  // Keep tabs in sync — data edited in one tab shows up in the others.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setState(loadState());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /** Apply a pure transition and persist. All mutations funnel through here. */
  const commit = useCallback((transform: (prev: LearnerState) => LearnerState) => {
    setState((prev) => {
      const next = transform(prev);
      if (next === prev) return prev;
      if (!saveState(next)) setStorageBlocked(true);
      return next;
    });
  }, []);

  const reviewWord = useCallback(
    (wordId: number, wasCorrect: boolean) =>
      commit((p) => applyReview(p, wordId, wasCorrect)),
    [commit],
  );

  const toggleBookmark = useCallback(
    (wordId: number) => commit((p) => toggleBm(p, wordId)),
    [commit],
  );

  const finishLesson = useCallback(
    (slug: string) => commit((p) => markLessonRead(p, slug)),
    [commit],
  );

  const value = useMemo<ProgressContextValue>(
    () => ({
      state,
      hydrated,
      storageBlocked,
      reviewWord,
      toggleBookmark,
      finishLesson,
    }),
    [state, hydrated, storageBlocked, reviewWord, toggleBookmark, finishLesson],
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
