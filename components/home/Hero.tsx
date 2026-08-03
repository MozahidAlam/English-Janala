"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { useProgress } from "@/lib/hooks/useProgress";
import { liveStreak, todayXp } from "@/lib/storage/progress";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { rankFor, toBn } from "@/lib/utils";

const ROTATING = [
  "Tense-এর ভয় কাটুক",
  "Vocabulary বাড়ুক",
  "Grammar মজার হোক",
  "Confidence ফিরুক",
];

export function Hero({ lessons, words }: { lessons: number; words: number }) {
  const [idx, setIdx] = useState(0);
  const { state, hydrated } = useProgress();

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROTATING.length), 2600);
    return () => clearInterval(t);
  }, []);

  const streak = hydrated ? liveStreak(state) : 0;
  const today = hydrated ? todayXp(state) : 0;
  const rank = rankFor(state.xp);
  const returning = hydrated && state.xp > 0;

  return (
    <section className="relative overflow-hidden border-b-2 border-line">
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div
        className="anim-drift pointer-events-none absolute -top-16 -right-20 h-72 w-72 rounded-full border-2 border-line opacity-25 dark:opacity-15"
        style={{ backgroundColor: "#ffb020", ["--r" as string]: "-8deg" }}
        aria-hidden
      />
      <div
        className="anim-drift pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rotate-12 border-2 border-line opacity-20 dark:opacity-15"
        style={{ backgroundColor: "#7c5cff", borderRadius: "2rem", animationDelay: "1.2s" }}
        aria-hidden
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[1.15fr_1fr]">
        <div className="anim-rise">
          <span className="brut-sm mb-5 inline-flex -rotate-1 items-center gap-2 px-3 py-1 text-xs font-extrabold tracking-wider uppercase">
            🇧🇩 বাংলায় ব্যাখ্যা · ১০০% ফ্রি · লগইন লাগে না
          </span>

          <h1 className="text-[length:var(--text-hero)] leading-[0.95]">
            English
            <br />
            <span className="font-bangla marker">জানালা</span>
          </h1>

          <p className="font-bangla mt-5 max-w-xl text-lg text-muted sm:text-xl">
            গ্রামার মুখস্থ নয় —{" "}
            <span
              key={idx}
              className="anim-pop inline-block font-bold text-[color:var(--fg)]"
            >
              {ROTATING[idx]}
            </span>
            <br />
            মজার উদাহরণ, ভুল-ঠিক কার্ড আর গেম দিয়ে শিখুন। আপনার সব প্রোগ্রেস
            থাকবে আপনার ব্রাউজারেই।
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/grammar" size="lg" tone="ink">
              📖 গ্রামার শুরু করুন
            </ButtonLink>
            <ButtonLink href="/vocabulary" size="lg" variant="outline">
              📚 Vocabulary দেখুন
            </ButtonLink>
          </div>

          <dl className="mt-10 flex flex-wrap gap-3">
            {[
              { k: "গ্রামার লেসন", v: toBn(lessons), c: "#1a91ff" },
              { k: "শব্দ ভান্ডার", v: `${toBn(words)}+`, c: "#14c39a" },
              { k: "মিনি-গেম", v: toBn(5), c: "#e94ea8" },
              { k: "খরচ", v: "৳০", c: "#ffb020" },
            ].map((s) => (
              <div key={s.k} className="brut-sm px-4 py-2">
                <dt className="font-bangla text-[11px] font-bold tracking-wide text-muted uppercase">
                  {s.k}
                </dt>
                <dd className="text-2xl font-extrabold" style={{ color: s.c }}>
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative anim-pop">
          {returning ? (
            <div className="brut-lg space-y-4 p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-bangla text-sm text-muted">ফিরে আসার জন্য ধন্যবাদ!</p>
                  <p className="font-bangla text-2xl font-extrabold">
                    {rank.current.emoji} {rank.current.name}
                  </p>
                </div>
                <div className="brut-sm px-3 py-2 text-center">
                  <p className="text-2xl font-extrabold">
                    <span className={streak > 0 ? "anim-flame inline-block" : ""} aria-hidden>
                      🔥
                    </span>{" "}
                    {toBn(streak)}
                  </p>
                  <p className="font-bangla text-[11px] text-muted">দিনের স্ট্রিক</p>
                </div>
              </div>

              <div>
                <div className="font-bangla mb-1.5 flex justify-between text-sm">
                  <span>আজকের লক্ষ্য</span>
                  <span className="font-bold">
                    {toBn(today)} / {toBn(state.dailyGoal)} XP
                  </span>
                </div>
                <ProgressBar
                  value={today}
                  max={state.dailyGoal}
                  color={today >= state.dailyGoal ? "#14c39a" : "#ffb020"}
                  label="আজকের লক্ষ্য"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { l: "মোট XP", v: toBn(state.xp) },
                  { l: "শব্দ", v: toBn(Object.keys(state.srs).length) },
                  { l: "লেসন", v: toBn(state.readLessons.length) },
                ].map((x) => (
                  <div key={x.l} className="surface-alt rounded-xl border-2 border-line-soft py-2">
                    <p className="text-xl font-extrabold">{x.v}</p>
                    <p className="font-bangla text-[11px] text-muted">{x.l}</p>
                  </div>
                ))}
              </div>

              <ButtonLink href="/flashcards" className="w-full" tone="violet">
                🧠 আজকের পড়া শুরু করুন
              </ButtonLink>
            </div>
          ) : (
            <div className="brut-lg overflow-hidden p-0">
              <div
                className="relative flex items-end justify-center px-6 pt-6"
                style={{ backgroundColor: "#cfe9ff" }}
              >
                <Image
                  src="/assets/hero-student.png"
                  alt="বই হাতে একজন শিক্ষার্থী"
                  width={520}
                  height={520}
                  priority
                  className="h-auto w-full max-w-sm object-contain"
                />
              </div>
              <div className="border-t-2 border-line p-5">
                <p className="font-bangla text-lg font-bold">
                  আজ থেকেই শুরু করুন 🚀
                </p>
                <p className="font-bangla mt-1 text-sm text-muted">
                  দিনে ১০ মিনিট। কোনো অ্যাকাউন্ট নেই, কোনো বিজ্ঞাপন নেই, কোনো ফি নেই।
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
