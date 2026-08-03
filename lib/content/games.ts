export interface GameInfo {
  readonly slug: string;
  readonly title: string;
  readonly titleBn: string;
  readonly desc: string;
  readonly emoji: string;
  readonly color: string;
  readonly skill: string;
}

export const GAMES: readonly GameInfo[] = [
  {
    slug: "spot-the-error",
    title: "Spot the Error",
    titleBn: "ভুল ধরুন",
    desc: "দুটি বাক্যের মধ্যে কোনটি ঠিক? ৬০ সেকেন্ডে যত পারেন ধরুন।",
    emoji: "🔍",
    color: "#ff5d5d",
    skill: "Common mistakes",
  },
  {
    slug: "sentence-builder",
    title: "Sentence Builder",
    titleBn: "বাক্য সাজান",
    desc: "এলোমেলো শব্দ সাজিয়ে সঠিক ইংরেজি বাক্য বানান।",
    emoji: "🧩",
    color: "#1a91ff",
    skill: "Word order",
  },
  {
    slug: "word-match",
    title: "Word Match",
    titleBn: "শব্দ মেলান",
    desc: "ইংরেজি শব্দের সাথে বাংলা অর্থ মিলিয়ে জোড়া বানান।",
    emoji: "🃏",
    color: "#14c39a",
    skill: "Vocabulary",
  },
  {
    slug: "hangman",
    title: "Hangman",
    titleBn: "অক্ষর খেলা",
    desc: "বাংলা অর্থ দেখে ইংরেজি শব্দের অক্ষর অনুমান করুন।",
    emoji: "🎪",
    color: "#ffb020",
    skill: "Spelling",
  },
  {
    slug: "boss-battle",
    title: "Boss Battle",
    titleBn: "বস ব্যাটল",
    desc: "সব গ্রামার টপিক থেকে র‍্যান্ডম প্রশ্ন। ৩টি লাইফ, কত দূর যেতে পারেন?",
    emoji: "👹",
    color: "#7c5cff",
    skill: "Full grammar",
  },
];

export function gameBySlug(slug: string): GameInfo | undefined {
  return GAMES.find((g) => g.slug === slug);
}

/** Scrambleable sentences for the Sentence Builder game, easy → hard. */
export interface BuilderSentence {
  readonly sentence: string;
  readonly hint: string;
}

export const BUILDER_SENTENCES: readonly BuilderSentence[] = [
  { sentence: "I go to school every day", hint: "Present Simple — অভ্যাসগত কাজ" },
  { sentence: "She is reading a book now", hint: "Present Continuous" },
  { sentence: "He has finished his homework", hint: "Present Perfect" },
  { sentence: "They played football yesterday", hint: "Past Simple" },
  { sentence: "We will visit Cox's Bazar next month", hint: "Future Simple" },
  { sentence: "The teacher was explaining the lesson", hint: "Past Continuous" },
  { sentence: "My father works in a bank", hint: "Present Simple — third person" },
  { sentence: "Do you like Bengali food", hint: "প্রশ্নবাচক বাক্য" },
  { sentence: "The letter was written by him", hint: "Passive Voice" },
  { sentence: "If it rains we will stay home", hint: "Conditional Type 1" },
  { sentence: "He is taller than his brother", hint: "Comparative degree" },
  { sentence: "She said that she was busy", hint: "Indirect Speech" },
  { sentence: "I have been waiting for two hours", hint: "Present Perfect Continuous" },
  { sentence: "The book on the table is mine", hint: "Preposition phrase" },
  { sentence: "Although he is poor he is honest", hint: "Complex sentence" },
  { sentence: "Neither Rahim nor Karim was present", hint: "Correlative conjunction" },
  { sentence: "The sun rises in the east", hint: "চিরন্তন সত্য" },
  { sentence: "Please close the door quietly", hint: "Imperative sentence" },
  { sentence: "I had finished the work before he came", hint: "Past Perfect" },
  { sentence: "What a beautiful morning it is", hint: "Exclamatory sentence" },
];
