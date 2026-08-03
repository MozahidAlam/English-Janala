import type { GrammarCategory, GrammarCategoryId, GrammarLesson } from "@/lib/types";
import { CATEGORIES } from "./categories";
import { FOUNDATION_LESSONS } from "./foundation";
import { TENSE_LESSONS } from "./tense";
import { VERB_LESSONS } from "./verbs";
import { SENTENCE_LESSONS } from "./sentence";
import { CONNECTOR_LESSONS } from "./connectors";
import { ADVANCED_LESSONS } from "./advanced";
import { POLISH_LESSONS } from "./polish";
import { MISTAKE_LESSONS } from "./mistakes";

export { CATEGORIES };

/** Every grammar lesson, ordered by category then by authoring order. */
export const GRAMMAR_LESSONS: readonly GrammarLesson[] = [
  ...FOUNDATION_LESSONS,
  ...TENSE_LESSONS,
  ...VERB_LESSONS,
  ...SENTENCE_LESSONS,
  ...CONNECTOR_LESSONS,
  ...ADVANCED_LESSONS,
  ...POLISH_LESSONS,
  ...MISTAKE_LESSONS,
];

const BY_SLUG = new Map(GRAMMAR_LESSONS.map((l) => [l.slug, l]));

export function lessonBySlug(slug: string): GrammarLesson | undefined {
  return BY_SLUG.get(slug);
}

export function lessonsInCategory(id: GrammarCategoryId): readonly GrammarLesson[] {
  return GRAMMAR_LESSONS.filter((l) => l.category === id);
}

export function categoryById(id: GrammarCategoryId): GrammarCategory | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

/** Previous / next lesson in the global reading order. */
export function lessonNeighbours(slug: string): {
  prev: GrammarLesson | null;
  next: GrammarLesson | null;
} {
  const i = GRAMMAR_LESSONS.findIndex((l) => l.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: GRAMMAR_LESSONS[i - 1] ?? null,
    next: GRAMMAR_LESSONS[i + 1] ?? null,
  };
}

/** Every wrong/right pair across all lessons — used by the Spot-the-Error game. */
export function allWrongRight() {
  return GRAMMAR_LESSONS.flatMap((lesson) =>
    lesson.wrongRight.map((wr) => ({ ...wr, lessonSlug: lesson.slug, lessonTitle: lesson.title })),
  );
}

/** Every quiz question across all lessons — used by the Boss Battle. */
export function allQuestions() {
  return GRAMMAR_LESSONS.flatMap((lesson) =>
    lesson.quiz.map((q) => ({ ...q, lessonSlug: lesson.slug, lessonTitle: lesson.title })),
  );
}

export const TOTAL_LESSONS = GRAMMAR_LESSONS.length;
export const TOTAL_MINUTES = GRAMMAR_LESSONS.reduce((s, l) => s + l.minutes, 0);
