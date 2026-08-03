/** Shared domain types for English Janala. */

/* ---------------------------------- Vocabulary ---------------------------------- */

export interface Lesson {
  readonly id: number;
  readonly levelNo: number;
  readonly lessonName: string;
}

/** A vocabulary word as shown in list/card views. */
export interface Word {
  readonly id: number;
  readonly level: number;
  readonly word: string;
  readonly meaning: string | null;
  readonly pronunciation: string | null;
}

/** A word with the extra fields the detail endpoint returns. */
export interface WordDetail extends Word {
  readonly sentence: string | null;
  readonly points: number | null;
  readonly partsOfSpeech: string | null;
  readonly synonyms: readonly string[];
}

/** Extra context pulled from the free dictionary + Datamuse APIs. */
export interface WordEnrichment {
  readonly phonetic: string | null;
  readonly audioUrl: string | null;
  readonly definitions: readonly EnrichedDefinition[];
  readonly synonyms: readonly string[];
  readonly antonyms: readonly string[];
  readonly collocations: readonly string[];
}

export interface EnrichedDefinition {
  readonly partOfSpeech: string;
  readonly definition: string;
  readonly example: string | null;
}

/* ---------------------------------- Grammar ---------------------------------- */

export type GrammarCategoryId =
  | "foundation"
  | "tense"
  | "verbs"
  | "sentence"
  | "connectors"
  | "advanced"
  | "polish"
  | "mistakes";

export interface GrammarCategory {
  readonly id: GrammarCategoryId;
  readonly title: string;
  readonly titleBn: string;
  readonly blurb: string;
  readonly emoji: string;
  /** Tailwind-ish accent token name used for theming the category. */
  readonly accent: AccentName;
}

export type AccentName =
  | "sky"
  | "amber"
  | "coral"
  | "mint"
  | "violet"
  | "grape";

/** A right-vs-wrong comparison card. */
export interface WrongRight {
  readonly wrong: string;
  readonly right: string;
  readonly why: string;
}

/** A structure/formula row, e.g. Subject + have/has + V3. */
export interface FormulaRow {
  readonly label: string;
  readonly formula: string;
  readonly example: string;
}

export interface GrammarQuestion {
  readonly q: string;
  readonly options: readonly string[];
  /** Index into `options`. */
  readonly answer: number;
  readonly explain: string;
}

export interface GrammarLesson {
  readonly slug: string;
  readonly category: GrammarCategoryId;
  readonly title: string;
  readonly titleBn: string;
  /** One-line funny hook that opens the lesson. */
  readonly hook: string;
  /** The core rule, written in Bangla. */
  readonly rule: string;
  /** Bullet points expanding the rule. */
  readonly points: readonly string[];
  readonly formulas?: readonly FormulaRow[];
  readonly examples: readonly string[];
  readonly wrongRight: readonly WrongRight[];
  /** Memory trick / mnemonic in Bangla. */
  readonly trick?: string;
  readonly quiz: readonly GrammarQuestion[];
  readonly minutes: number;
}

/* ---------------------------------- Progress ---------------------------------- */

export type SrsBox = 1 | 2 | 3 | 4 | 5;

export interface SrsCard {
  /** Word id from the vocabulary API. */
  readonly id: number;
  readonly box: SrsBox;
  /** ISO date (yyyy-mm-dd) when this card is next due. */
  readonly due: string;
  readonly seen: number;
  readonly correct: number;
  readonly lapses: number;
}

export interface DayActivity {
  readonly xp: number;
  readonly words: number;
  readonly lessons: number;
  readonly quizzes: number;
}

export interface ProgressState {
  readonly version: number;
  readonly xp: number;
  readonly streak: number;
  readonly bestStreak: number;
  /** ISO date of the last day with any activity. */
  readonly lastActive: string | null;
  readonly dailyGoal: number;
  /** yyyy-mm-dd -> activity totals. */
  readonly activity: Readonly<Record<string, DayActivity>>;
  readonly srs: Readonly<Record<string, SrsCard>>;
  readonly bookmarks: readonly number[];
  /** Grammar lesson slugs that have been read. */
  readonly readLessons: readonly string[];
  /** Grammar lesson slug -> best quiz score percentage. */
  readonly lessonScores: Readonly<Record<string, number>>;
  /** Game slug -> best score. */
  readonly gameScores: Readonly<Record<string, number>>;
  readonly badges: readonly string[];
  readonly createdAt: string;
}

export interface Badge {
  readonly id: string;
  readonly title: string;
  readonly desc: string;
  readonly emoji: string;
  readonly test: (p: ProgressState) => boolean;
}

/* ---------------------------------- Grammar Guru ---------------------------------- */

export interface GuruMatch {
  readonly message: string;
  readonly shortMessage: string;
  readonly offset: number;
  readonly length: number;
  readonly replacements: readonly string[];
  readonly ruleId: string;
  readonly issueType: string;
  readonly categoryName: string;
}
