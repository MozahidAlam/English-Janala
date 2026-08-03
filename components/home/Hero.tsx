"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { toBn } from "@/lib/utils";
import { AUTHOR } from "@/lib/content/author";

const ROTATING = [
  "Tense-এর ভয় কাটুক",
  "Vocabulary বাড়ুক",
  "Grammar মজার হোক",
  "Confidence ফিরুক",
];

export function Hero({ lessons, words }: { lessons: number; words: number }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROTATING.length), 2600);
    return () => clearInterval(t);
  }, []);

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
          <span className="font-bangla brut-sm mb-5 inline-flex -rotate-1 items-center gap-2 px-3 py-1 text-xs font-extrabold tracking-wider">
            ✨ ১০০% ফ্রি · বাংলায় সহজ ব্যাখ্যা · আজই শুরু করুন
          </span>

          <h1 className="text-hero leading-[0.95]">
            English
            <br />
            <span className="font-bangla marker">জানালা</span>
          </h1>

          <p className="font-bangla mt-5 max-w-xl text-lg text-muted sm:text-xl">
            গ্রামার মুখস্থ নয় —{" "}
            <span
              key={idx}
              className="anim-pop inline-block font-bold text-(--fg)"
            >
              {ROTATING[idx]}
            </span>
            <br />
            মজার উদাহরণ, ভুল-ঠিক কার্ড আর গেম দিয়ে শিখুন — কোনো অ্যাকাউন্ট
            লাগবে না, কোনো ফি নেই।
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
          <div className="brut-lg overflow-hidden p-0">
            <div className="tint-sky relative flex items-end justify-center px-6 pt-6">
              <Image
                src="/assets/hero-student.png"
                alt="বই হাতে একজন শিক্ষার্থী"
                width={520}
                height={520}
                priority
                className="h-auto w-full max-w-sm object-contain"
              />
            </div>
          </div>

          {/* Author credit — sits under the visual in both hero variants. */}
          <div className="brut-sm mt-4 flex items-center gap-3 p-4">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 border-line text-xl"
              style={{ backgroundColor: "#ffb020", color: "#16151d" }}
              aria-hidden
            >
              ✍️
            </span>
            <div className="min-w-0">
              <p className="font-bangla text-[11px] font-bold tracking-widest text-muted uppercase">
                তৈরি করেছেন
              </p>
              <p className="truncate font-extrabold">{AUTHOR.name}</p>
              <p className="truncate text-sm text-muted">{AUTHOR.affiliation}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
