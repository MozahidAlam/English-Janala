/**
 * Spaced repetition — Leitner box system.
 *
 * A correct answer promotes the card to the next box and pushes its next review
 * further out; a wrong answer drops it back to box 1 so it returns tomorrow.
 * Simple, transparent, and good enough to beat plain re-reading by a wide margin.
 */
import type { LearnerState, SrsCard, SrsBox } from "@/lib/types";
import { addDays, dateKey } from "@/lib/utils";

/** Days until the next review, indexed by box. */
export const BOX_INTERVAL: Record<SrsBox, number> = {
  1: 1,
  2: 2,
  3: 4,
  4: 8,
  5: 16,
};

export const BOX_LABEL: Record<SrsBox, string> = {
  1: "নতুন",
  2: "শিখছি",
  3: "চেনা",
  4: "ভালো",
  5: "মুখস্থ",
};

export function newCard(id: number, today = dateKey()): SrsCard {
  return { id, box: 1, due: today, seen: 0, correct: 0, lapses: 0 };
}

export function getCard(
  state: LearnerState,
  id: number,
  today = dateKey(),
): SrsCard {
  return state.srs[String(id)] ?? newCard(id, today);
}

/** Apply a review result to a single card. Pure. */
export function reviewCard(
  card: SrsCard,
  wasCorrect: boolean,
  today = dateKey(),
): SrsCard {
  if (wasCorrect) {
    const box = Math.min(5, card.box + 1) as SrsBox;
    return {
      ...card,
      box,
      due: addDays(today, BOX_INTERVAL[box]),
      seen: card.seen + 1,
      correct: card.correct + 1,
    };
  }
  return {
    ...card,
    box: 1,
    due: addDays(today, BOX_INTERVAL[1]),
    seen: card.seen + 1,
    lapses: card.lapses + 1,
  };
}

/** Record a review inside the full progress state. */
export function applyReview(
  state: LearnerState,
  id: number,
  wasCorrect: boolean,
  today = dateKey(),
): LearnerState {
  const card = reviewCard(getCard(state, id, today), wasCorrect, today);
  return { ...state, srs: { ...state.srs, [String(id)]: card } };
}

/** Cards that are due today or overdue, hardest first. */
export function dueCards(state: LearnerState, today = dateKey()): SrsCard[] {
  return Object.values(state.srs)
    .filter((c) => c.due <= today)
    .sort((a, b) => a.box - b.box || a.due.localeCompare(b.due));
}

/**
 * Build a study queue: everything due, topped up with unseen words so the
 * session always has something to do.
 */
export function buildQueue(
  state: LearnerState,
  pool: readonly number[],
  size = 20,
  today = dateKey(),
): number[] {
  const due = dueCards(state, today).map((c) => c.id);
  const dueInPool = due.filter((id) => pool.includes(id));
  if (dueInPool.length >= size) return dueInPool.slice(0, size);

  const seen = new Set(Object.keys(state.srs).map(Number));
  const fresh = pool.filter((id) => !seen.has(id));
  return [...dueInPool, ...fresh.slice(0, size - dueInPool.length)];
}

/** Words the learner keeps getting wrong — the "weak words" list. */
export function weakCards(state: LearnerState, limit = 20): SrsCard[] {
  return Object.values(state.srs)
    .filter((c) => c.lapses > 0)
    .sort((a, b) => {
      const aRate = a.seen ? a.correct / a.seen : 1;
      const bRate = b.seen ? b.correct / b.seen : 1;
      return aRate - bRate || b.lapses - a.lapses;
    })
    .slice(0, limit);
}

export function boxCounts(state: LearnerState): Record<SrsBox, number> {
  const counts: Record<SrsBox, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const card of Object.values(state.srs)) counts[card.box] += 1;
  return counts;
}
