/** Study-session helpers shared by every practice mode. */
import type { ProgressState, WordDetail } from "@/lib/types";
import { buildQueue, weakCards } from "@/lib/storage/srs";
import { sample, shuffle } from "@/lib/utils";

export type StudyMode = "flip" | "meaning" | "reverse" | "listening" | "spelling";

export interface ModeInfo {
  readonly id: StudyMode;
  readonly title: string;
  readonly desc: string;
  readonly emoji: string;
  readonly color: string;
}

export const MODES: readonly ModeInfo[] = [
  {
    id: "flip",
    title: "ফ্ল্যাশকার্ড",
    desc: "কার্ড উল্টে অর্থ দেখুন, নিজেই যাচাই করুন",
    emoji: "🃏",
    color: "#7c5cff",
  },
  {
    id: "meaning",
    title: "অর্থ বাছাই",
    desc: "English শব্দ দেখে সঠিক বাংলা অর্থ বাছুন",
    emoji: "🎯",
    color: "#1a91ff",
  },
  {
    id: "reverse",
    title: "উল্টো খেলা",
    desc: "বাংলা অর্থ দেখে English শব্দ বাছুন",
    emoji: "🔁",
    color: "#14c39a",
  },
  {
    id: "listening",
    title: "শুনে বলুন",
    desc: "উচ্চারণ শুনে সঠিক শব্দ বাছুন",
    emoji: "🎧",
    color: "#e94ea8",
  },
  {
    id: "spelling",
    title: "বানান লিখুন",
    desc: "বাংলা অর্থ দেখে ইংরেজি বানান টাইপ করুন",
    emoji: "⌨️",
    color: "#ffb020",
  },
];

export const SESSION_SIZE = 12;

/** Words for a session: SRS-due first, topped up with unseen ones. */
export function pickSessionWords(
  pool: readonly WordDetail[],
  state: ProgressState,
  size = SESSION_SIZE,
): WordDetail[] {
  const byId = new Map(pool.map((w) => [w.id, w]));
  const queue = buildQueue(
    state,
    pool.map((w) => w.id),
    size,
  );
  const picked = queue.map((id) => byId.get(id)).filter((w): w is WordDetail => Boolean(w));
  if (picked.length >= size) return picked;

  // Not enough due/unseen cards — fill the rest at random so a session is never short.
  const used = new Set(picked.map((w) => w.id));
  const extra = sample(
    pool.filter((w) => !used.has(w.id)),
    size - picked.length,
  );
  return [...picked, ...extra];
}

/** Only the words the learner keeps getting wrong. */
export function pickWeakWords(
  pool: readonly WordDetail[],
  state: ProgressState,
  size = SESSION_SIZE,
): WordDetail[] {
  const byId = new Map(pool.map((w) => [w.id, w]));
  return weakCards(state, size)
    .map((c) => byId.get(c.id))
    .filter((w): w is WordDetail => Boolean(w));
}

export interface Choice {
  readonly text: string;
  readonly correct: boolean;
}

/** Four options: the answer plus three distractors from the same pool. */
export function buildChoices(
  answer: WordDetail,
  pool: readonly WordDetail[],
  field: "word" | "meaning",
): Choice[] {
  const correctText = (field === "word" ? answer.word : answer.meaning) ?? "";
  const distractors = sample(
    pool.filter((w) => {
      const text = (field === "word" ? w.word : w.meaning) ?? "";
      return w.id !== answer.id && text && text !== correctText;
    }),
    3,
  ).map((w) => ({ text: (field === "word" ? w.word : w.meaning)!, correct: false }));

  return shuffle([{ text: correctText, correct: true }, ...distractors]);
}

/** Forgiving spelling comparison — case and surrounding space are ignored. */
export function isSpellingCorrect(input: string, answer: string): boolean {
  return input.trim().toLowerCase() === answer.trim().toLowerCase();
}

const PRAISE = [
  "দুর্দান্ত! 🎉",
  "একদম ঠিক! ✨",
  "চালিয়ে যান! 🚀",
  "বাহ, পাক্কা! 👏",
  "Grammar মামা খুশি! 😎",
];

const NUDGE = [
  "ইশ, একটুর জন্য! 😅",
  "চিন্তা নেই, আবার আসবে। 💪",
  "এটা মনে রাখুন — পরে আবার জিজ্ঞেস করব! 🧠",
  "ভুল থেকেই শেখা। 🌱",
];

export function feedbackLine(correct: boolean, seed: number): string {
  const list = correct ? PRAISE : NUDGE;
  return list[seed % list.length]!;
}

export function scoreVerdict(percent: number): {
  emoji: string;
  title: string;
  line: string;
} {
  if (percent === 100)
    return { emoji: "🏆", title: "নিখুঁত!", line: "একটাও ভুল নেই। আপনি তৈরি!" };
  if (percent >= 80)
    return { emoji: "🎉", title: "চমৎকার!", line: "প্রায় সবই পেরেছেন। আর একটু চর্চা।" };
  if (percent >= 60)
    return { emoji: "🙂", title: "ভালো হচ্ছে", line: "অর্ধেকের বেশি ঠিক। আবার চেষ্টা করুন।" };
  if (percent >= 40)
    return { emoji: "🧐", title: "আরেকটু চাই", line: "যেগুলো ভুল হয়েছে সেগুলো আবার দেখুন।" };
  return { emoji: "😅", title: "শুরুটা কঠিন", line: "চিন্তা নেই — ফ্ল্যাশকার্ড মোডে একটু ঘুরে আসুন।" };
}
