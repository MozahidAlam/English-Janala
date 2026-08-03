/** Achievement definitions. Each badge is a pure predicate over progress state. */
import type { Badge, ProgressState } from "@/lib/types";
import { GRAMMAR_LESSONS } from "@/lib/content/grammar";
import { activeDays, masteredWords, totalQuizzes } from "@/lib/storage/progress";

export const BADGES: readonly Badge[] = [
  {
    id: "first-step",
    title: "প্রথম পদক্ষেপ",
    desc: "প্রথমবার XP অর্জন",
    emoji: "🌱",
    test: (p) => p.xp > 0,
  },
  {
    id: "streak-3",
    title: "তিন দিনের জেদ",
    desc: "টানা ৩ দিন পড়াশোনা",
    emoji: "🔥",
    test: (p) => p.bestStreak >= 3,
  },
  {
    id: "streak-7",
    title: "সপ্তাহ বীর",
    desc: "টানা ৭ দিন পড়াশোনা",
    emoji: "🗓️",
    test: (p) => p.bestStreak >= 7,
  },
  {
    id: "streak-30",
    title: "মাসের রাজা",
    desc: "টানা ৩০ দিন পড়াশোনা",
    emoji: "👑",
    test: (p) => p.bestStreak >= 30,
  },
  {
    id: "words-25",
    title: "শব্দ সংগ্রাহক",
    desc: "২৫টি শব্দ চর্চা করা",
    emoji: "📚",
    test: (p) => Object.keys(p.srs).length >= 25,
  },
  {
    id: "words-100",
    title: "শতক!",
    desc: "১০০টি শব্দ চর্চা করা",
    emoji: "💯",
    test: (p) => Object.keys(p.srs).length >= 100,
  },
  {
    id: "mastered-20",
    title: "মুখস্থ মাস্টার",
    desc: "২০টি শব্দ পুরোপুরি মুখস্থ",
    emoji: "🧠",
    test: (p) => masteredWords(p) >= 20,
  },
  {
    id: "grammar-first",
    title: "গ্রামারে হাতেখড়ি",
    desc: "প্রথম গ্রামার লেসন শেষ",
    emoji: "📖",
    test: (p) => p.readLessons.length >= 1,
  },
  {
    id: "grammar-10",
    title: "গ্রামার পাঠক",
    desc: "১০টি গ্রামার লেসন শেষ",
    emoji: "🎓",
    test: (p) => p.readLessons.length >= 10,
  },
  {
    id: "grammar-all",
    title: "গ্রামার সম্রাট",
    desc: "সব গ্রামার লেসন শেষ",
    emoji: "🏛️",
    test: (p) => p.readLessons.length >= GRAMMAR_LESSONS.length,
  },
  {
    id: "perfect-quiz",
    title: "নিখুঁত!",
    desc: "কোনো কুইজে ১০০% স্কোর",
    emoji: "🎯",
    test: (p) => Object.values(p.lessonScores).some((s) => s >= 100),
  },
  {
    id: "perfect-5",
    title: "পাঁচে পাঁচ",
    desc: "৫টি কুইজে ১০০% স্কোর",
    emoji: "⭐",
    test: (p) => Object.values(p.lessonScores).filter((s) => s >= 100).length >= 5,
  },
  {
    id: "quiz-20",
    title: "কুইজ পাগলা",
    desc: "২০টি কুইজ শেষ করা",
    emoji: "❓",
    test: (p) => totalQuizzes(p) >= 20,
  },
  {
    id: "gamer",
    title: "খেলোয়াড়",
    desc: "৩টি ভিন্ন গেম খেলা",
    emoji: "🎮",
    test: (p) => Object.keys(p.gameScores).length >= 3,
  },
  {
    id: "xp-500",
    title: "৫০০ XP",
    desc: "মোট ৫০০ XP অর্জন",
    emoji: "⚡",
    test: (p) => p.xp >= 500,
  },
  {
    id: "xp-2000",
    title: "২০০০ XP",
    desc: "মোট ২০০০ XP অর্জন",
    emoji: "🚀",
    test: (p) => p.xp >= 2000,
  },
  {
    id: "collector",
    title: "সংগ্রাহক",
    desc: "১০টি শব্দ বুকমার্ক করা",
    emoji: "🔖",
    test: (p) => p.bookmarks.length >= 10,
  },
  {
    id: "dedicated",
    title: "নিয়মিত",
    desc: "মোট ২০ দিন পড়াশোনা",
    emoji: "📅",
    test: (p) => activeDays(p) >= 20,
  },
];

/** Badge ids the state qualifies for but hasn't been awarded yet. */
export function newlyEarned(state: ProgressState): readonly string[] {
  return BADGES.filter((b) => !state.badges.includes(b.id) && b.test(state)).map(
    (b) => b.id,
  );
}

export function badgeById(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id);
}
