export interface NavItem {
  readonly href: string;
  readonly label: string;
  readonly emoji: string;
  readonly desc: string;
}

export const NAV: readonly NavItem[] = [
  {
    href: "/vocabulary",
    label: "Vocabulary",
    emoji: "📚",
    desc: "লেসন ধরে ধরে শব্দ শেখা",
  },
  {
    href: "/flashcards",
    label: "Flashcards",
    emoji: "🧠",
    desc: "Spaced repetition দিয়ে মুখস্থ",
  },
  {
    href: "/grammar",
    label: "Grammar",
    emoji: "📖",
    desc: "সব গ্রামার নিয়ম, মজা করে",
  },
  {
    href: "/guru",
    label: "Grammar Guru",
    emoji: "🔎",
    desc: "নিজের লেখা চেক করান",
  },
  {
    href: "/games",
    label: "Games",
    emoji: "🎮",
    desc: "খেলতে খেলতে শেখা",
  },
  {
    href: "/dashboard",
    label: "Progress",
    emoji: "📊",
    desc: "আপনার অগ্রগতি",
  },
];
