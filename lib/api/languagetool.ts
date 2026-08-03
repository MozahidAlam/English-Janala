/**
 * LanguageTool public API — a real grammar + spelling checker.
 * Keyless and CORS-enabled, so it runs entirely in the browser.
 *
 * Rate limits apply per IP (roughly 20 requests/minute, 20 KB per request),
 * which is why callers debounce and why we surface a friendly Bangla message
 * on 429 instead of a raw error.
 */
import type { GuruMatch } from "@/lib/types";

const ENDPOINT = "https://api.languagetool.org/v2/check";
const MAX_CHARS = 4000;
const TIMEOUT_MS = 20_000;

export type GuruLanguage = "en-US" | "en-GB";

export class GuruError extends Error {
  constructor(
    message: string,
    readonly kind: "rate-limit" | "too-long" | "network" | "server",
  ) {
    super(message);
    this.name = "GuruError";
  }
}

interface LtReplacement {
  value?: string;
}
interface LtRule {
  id?: string;
  issueType?: string;
  category?: { name?: string };
}
interface LtMatch {
  message?: string;
  shortMessage?: string;
  offset?: number;
  length?: number;
  replacements?: LtReplacement[];
  rule?: LtRule;
}

/** Check a piece of English text. Throws GuruError with a Bangla message. */
export async function checkText(
  text: string,
  language: GuruLanguage = "en-US",
): Promise<readonly GuruMatch[]> {
  const trimmed = text.trim();
  if (!trimmed) return [];
  if (trimmed.length > MAX_CHARS) {
    throw new GuruError(
      `লেখাটা অনেক বড় (${trimmed.length} অক্ষর)। ${MAX_CHARS} অক্ষরের মধ্যে রাখুন।`,
      "too-long",
    );
  }

  const body = new URLSearchParams({
    text: trimmed,
    language,
    enabledOnly: "false",
  });

  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    throw new GuruError(
      "সার্ভারে পৌঁছানো গেল না। ইন্টারনেট কানেকশন চেক করে আবার চেষ্টা করুন।",
      "network",
    );
  }

  if (res.status === 429) {
    throw new GuruError(
      "একটু বেশি দ্রুত চেক করছেন! ৩০ সেকেন্ড অপেক্ষা করে আবার চেষ্টা করুন। 😅",
      "rate-limit",
    );
  }
  if (!res.ok) {
    throw new GuruError(
      `চেকার সার্ভার সাড়া দিচ্ছে না (${res.status})। একটু পরে আবার চেষ্টা করুন।`,
      "server",
    );
  }

  const json = (await res.json()) as { matches?: LtMatch[] };
  return (json.matches ?? [])
    .filter((m) => typeof m.offset === "number" && typeof m.length === "number")
    .map<GuruMatch>((m) => ({
      message: m.message ?? "সমস্যা পাওয়া গেছে",
      shortMessage: m.shortMessage || m.rule?.category?.name || "Issue",
      offset: m.offset!,
      length: m.length!,
      replacements: (m.replacements ?? [])
        .map((r) => r.value ?? "")
        .filter(Boolean)
        .slice(0, 5),
      ruleId: m.rule?.id ?? "UNKNOWN",
      issueType: m.rule?.issueType ?? "misspelling",
      categoryName: m.rule?.category?.name ?? "Grammar",
    }));
}

/** Apply one suggestion to the text, returning the corrected string. */
export function applyReplacement(
  text: string,
  match: GuruMatch,
  replacement: string,
): string {
  return (
    text.slice(0, match.offset) +
    replacement +
    text.slice(match.offset + match.length)
  );
}

/** Apply every match's first suggestion, right-to-left so offsets stay valid. */
export function applyAll(text: string, matches: readonly GuruMatch[]): string {
  return [...matches]
    .filter((m) => m.replacements.length > 0)
    .sort((a, b) => b.offset - a.offset)
    .reduce((acc, m) => applyReplacement(acc, m, m.replacements[0]!), text);
}

/** Playful Bangla commentary keyed off how many issues were found. */
export function verdictFor(count: number, words: number): {
  emoji: string;
  title: string;
  line: string;
  tone: "great" | "ok" | "rough";
} {
  if (count === 0) {
    return {
      emoji: "🏆",
      title: "নিখুঁত!",
      line: "একটাও ভুল নেই। Grammar মামা আজ আপনার উপর খুশি!",
      tone: "great",
    };
  }
  const density = words > 0 ? count / words : 1;
  if (density < 0.08) {
    return {
      emoji: "😎",
      title: "প্রায় ঠিক আছে",
      line: `মাত্র ${count}টা ছোট ভুল। এটুকু ঠিক করলেই একদম পাক্কা।`,
      tone: "ok",
    };
  }
  if (density < 0.2) {
    return {
      emoji: "🧐",
      title: "আরেকটু চেষ্টা",
      line: `${count}টা জায়গায় সমস্যা। নিচের সাজেশনগুলো দেখে ঠিক করে ফেলুন।`,
      tone: "ok",
    };
  }
  return {
    emoji: "😵‍💫",
    title: "Grammar টেনশনে!",
    line: `${count}টা ভুল ধরা পড়েছে। চিন্তা নেই — একটা একটা করে ঠিক করি চলুন।`,
    tone: "rough",
  };
}
