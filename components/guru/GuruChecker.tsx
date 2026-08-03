"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { GuruMatch } from "@/lib/types";
import {
  applyAll,
  applyReplacement,
  checkText,
  GuruError,
  verdictFor,
  type GuruLanguage,
} from "@/lib/api/languagetool";
import { useProgress } from "@/lib/hooks/useProgress";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn, toBn } from "@/lib/utils";

const SAMPLES = [
  "I am agree with you but he don't understand my point.",
  "Yesterday I have gone to the market and buy some vegetables.",
  "She is more taller than me and she can to speak three language.",
  "We discussed about the matter since long time.",
];

const ISSUE_TONE: Record<string, { bg: string; label: string }> = {
  misspelling: { bg: "#ff5d5d", label: "বানান" },
  grammar: { bg: "#7c5cff", label: "গ্রামার" },
  typographical: { bg: "#ffb020", label: "যতিচিহ্ন" },
  whitespace: { bg: "#ffb020", label: "স্পেস" },
  style: { bg: "#14c39a", label: "স্টাইল" },
  register: { bg: "#14c39a", label: "স্টাইল" },
  wordiness: { bg: "#14c39a", label: "বাহুল্য" },
  redundancy: { bg: "#e94ea8", label: "অপ্রয়োজনীয়" },
  duplication: { bg: "#e94ea8", label: "পুনরাবৃত্তি" },
  uncategorized: { bg: "#1a91ff", label: "পরামর্শ" },
};

function toneFor(issueType: string) {
  return ISSUE_TONE[issueType] ?? { bg: "#1a91ff", label: "সমস্যা" };
}

export function GuruChecker() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState<GuruLanguage>("en-US");
  const [matches, setMatches] = useState<readonly GuruMatch[] | null>(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const { addXp } = useProgress();

  const wordCount = useMemo(
    () => text.trim().split(/\s+/).filter(Boolean).length,
    [text],
  );

  const run = useCallback(async () => {
    if (!text.trim() || checking) return;
    setChecking(true);
    setError(null);
    setFocused(null);
    try {
      const found = await checkText(text, language);
      setMatches(found);
      addXp({ xp: 5 });
    } catch (e) {
      setMatches(null);
      setError(
        e instanceof GuruError
          ? e.message
          : "অপ্রত্যাশিত সমস্যা হয়েছে। আবার চেষ্টা করুন।",
      );
    } finally {
      setChecking(false);
    }
  }, [text, language, checking, addXp]);

  const fix = useCallback(
    (match: GuruMatch, replacement: string) => {
      const next = applyReplacement(text, match, replacement);
      setText(next);
      // Offsets shift after an edit, so drop the stale result set.
      setMatches(null);
      setFocused(null);
      areaRef.current?.focus();
    },
    [text],
  );

  const fixAll = useCallback(() => {
    if (!matches?.length) return;
    setText(applyAll(text, matches));
    setMatches(null);
    setFocused(null);
  }, [matches, text]);

  const verdict = matches ? verdictFor(matches.length, wordCount) : null;

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------ input */}
      <Card size="lg" className="p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <label htmlFor="guru-input" className="font-bangla text-lg font-bold">
            ✍️ আপনার ইংরেজি এখানে লিখুন
          </label>
          <div className="flex items-center gap-2 text-sm">
            <label htmlFor="guru-lang" className="sr-only">
              ভাষা নির্বাচন
            </label>
            <select
              id="guru-lang"
              value={language}
              onChange={(e) => setLanguage(e.target.value as GuruLanguage)}
              className="brut-sm px-2 py-1 text-sm font-bold"
            >
              <option value="en-US">🇺🇸 American</option>
              <option value="en-GB">🇬🇧 British</option>
            </select>
          </div>
        </div>

        <textarea
          id="guru-input"
          ref={areaRef}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (matches) setMatches(null);
          }}
          rows={7}
          maxLength={4000}
          placeholder="যেমন: I am agree with you, but he don't understand."
          className="brut-sm w-full resize-y p-4 text-lg leading-relaxed outline-none"
        />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="font-bangla text-sm text-muted">
            {toBn(wordCount)} শব্দ · {toBn(text.length)}/৪০০০ অক্ষর
          </p>
          <div className="flex gap-2">
            {text ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setText("");
                  setMatches(null);
                  setError(null);
                }}
              >
                ✕ মুছুন
              </Button>
            ) : null}
            <Button onClick={() => void run()} disabled={!text.trim() || checking} tone="mint">
              {checking ? "⏳ চেক করছি…" : "🔎 চেক করুন"}
            </Button>
          </div>
        </div>

        {!text ? (
          <div className="mt-4 border-t-2 border-line-soft pt-4">
            <p className="font-bangla mb-2 text-sm font-bold text-muted">
              উদাহরণ দিয়ে চেষ্টা করুন:
            </p>
            <div className="flex flex-wrap gap-2">
              {SAMPLES.map((s) => (
                <button
                  key={s}
                  onClick={() => setText(s)}
                  className="surface-alt max-w-full truncate rounded-full border-2 border-line-soft px-3 py-1 text-left text-xs hover:border-line"
                >
                  “{s}”
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </Card>

      {/* ------------------------------------------------------ error */}
      {error ? (
        <div
          role="alert"
          className="brut font-bangla flex items-center gap-3 p-4"
          style={{ backgroundColor: "#ffe0e0" }}
        >
          <span className="text-2xl" aria-hidden>
            ⚠️
          </span>
          <p className="font-semibold text-ink">{error}</p>
        </div>
      ) : null}

      {/* ------------------------------------------------------ results */}
      {matches && verdict ? (
        <div className="space-y-4">
          <Card
            className="flex flex-wrap items-center gap-4 p-5"
            size="lg"
          >
            <span className="text-5xl" aria-hidden>
              {verdict.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="font-bangla text-2xl">{verdict.title}</h2>
              <p className="font-bangla text-muted">{verdict.line}</p>
            </div>
            {matches.some((m) => m.replacements.length > 0) ? (
              <Button onClick={fixAll} tone="violet">
                ✨ সব ঠিক করুন
              </Button>
            ) : null}
          </Card>

          {matches.length > 0 ? (
            <ul className="space-y-3">
              {matches.map((m, i) => {
                const tone = toneFor(m.issueType);
                const snippet = text.slice(m.offset, m.offset + m.length);
                return (
                  <li key={`${m.offset}-${i}`}>
                    <Card
                      className={cn(
                        "p-4 transition-shadow",
                        focused === i && "shadow-(--shadow-hard-lg)",
                      )}
                    >
                      <button
                        className="w-full text-left"
                        onClick={() => setFocused(focused === i ? null : i)}
                        aria-expanded={focused === i}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className="rounded-full border-2 border-line px-2.5 py-0.5 text-[11px] font-extrabold text-ink"
                            style={{ backgroundColor: tone.bg }}
                          >
                            {tone.label}
                          </span>
                          <code className="rounded bg-coral/20 px-2 py-0.5 font-mono text-sm font-bold">
                            {snippet || "…"}
                          </code>
                        </div>
                        <p className="mt-2 text-sm">{m.message}</p>
                      </button>

                      {m.replacements.length > 0 ? (
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          <span className="font-bangla text-xs font-bold text-muted">
                            সাজেশন:
                          </span>
                          {m.replacements.map((r) => (
                            <button
                              key={r}
                              onClick={() => fix(m, r)}
                              className="brut-sm brut-press px-3 py-1 text-sm font-bold"
                              style={{ backgroundColor: "#d7f7ec" }}
                            >
                              {r || "(মুছে ফেলুন)"}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="font-bangla mt-2 text-xs text-muted">
                          স্বয়ংক্রিয় সংশোধন নেই — নিজে ঠিক করে নিন।
                        </p>
                      )}
                    </Card>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
