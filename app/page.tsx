import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { SectionHeading, Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { CATEGORIES, GRAMMAR_LESSONS, lessonsInCategory, TOTAL_LESSONS } from "@/lib/content/grammar";
import { snapshotWords } from "@/lib/api/vocabulary";
import { accentColor, toBn } from "@/lib/utils";

const FEATURES = [
  {
    href: "/grammar",
    emoji: "📖",
    title: "সম্পূর্ণ গ্রামার",
    body: "Parts of Speech থেকে Narration — ৪৩টি লেসন, বাংলায় ব্যাখ্যা, প্রতিটিতে মজার উদাহরণ ও কুইজ।",
    color: "#1a91ff",
    span: "sm:col-span-2",
  },
  {
    href: "/flashcards",
    emoji: "🧠",
    title: "Spaced Repetition",
    body: "যে শব্দ ভুলে যান, সেটা বারবার ফিরে আসে। বৈজ্ঞানিকভাবে প্রমাণিত পদ্ধতি।",
    color: "#7c5cff",
    span: "",
  },
  {
    href: "/guru",
    emoji: "🔎",
    title: "Grammar Guru",
    body: "নিজের ইংরেজি লিখুন — ভুল ধরিয়ে দেবে, ঠিক করে দেবে, বাংলায় বুঝিয়ে দেবে।",
    color: "#14c39a",
    span: "",
  },
  {
    href: "/games",
    emoji: "🎮",
    title: "৫টি মিনি-গেম",
    body: "Sentence Builder, Spot the Error, Word Match, Hangman আর Boss Battle।",
    color: "#e94ea8",
    span: "sm:col-span-2",
  },
];

const HOW = [
  { n: "১", t: "বেছে নিন", d: "গ্রামার লেসন, ভোকাবুলারি বা গেম — যেটা ভালো লাগে।" },
  { n: "২", t: "চর্চা করুন", d: "প্রতিটি লেসনের শেষে কুইজ, প্রতিটি শব্দে ফ্ল্যাশকার্ড।" },
  { n: "৩", t: "স্ট্রিক বানান", d: "প্রতিদিন একটু — XP জমান, ব্যাজ জিতুন, অভ্যাস গড়ুন।" },
];

export default function HomePage() {
  const words = snapshotWords();
  const featured = GRAMMAR_LESSONS.filter((l) =>
    ["present-perfect", "articles", "voice", "bangladeshi-common-mistakes"].includes(l.slug),
  );

  return (
    <>
      <Hero lessons={TOTAL_LESSONS} words={words.length} />

      {/* ---------------------------------------------- Features (bento) */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="কী কী আছে"
          title={
            <>
              একটা সাইটে <span className="marker">পুরো ইংরেজি</span>
            </>
          }
          subtitle="পড়া, চর্চা, খেলা আর নিজেকে যাচাই — চারটাই এক জায়গায়।"
        />

        <div className="grid gap-5 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <Link key={f.href} href={f.href} className={f.span}>
              <Card interactive className="h-full p-6">
                <span
                  className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-line text-3xl"
                  style={{ backgroundColor: f.color }}
                  aria-hidden
                >
                  {f.emoji}
                </span>
                <h3 className="font-bangla text-xl">{f.title}</h3>
                <p className="font-bangla mt-2 text-sm text-muted">{f.body}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------- Grammar categories */}
      <section className="border-y-2 border-line surface-alt">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="গ্রামার সিলেবাস"
            accent="#7c5cff"
            title={<>৮টি ভাগে সাজানো {toBn(TOTAL_LESSONS)}টি লেসন</>}
            subtitle="ভিত্তি থেকে শুরু করে Narration পর্যন্ত — ধাপে ধাপে, কোনো তাড়াহুড়ো নেই।"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat) => {
              const count = lessonsInCategory(cat.id).length;
              return (
                <Link key={cat.id} href={`/grammar#${cat.id}`}>
                  <Card interactive className="h-full p-5">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-3xl" aria-hidden>
                        {cat.emoji}
                      </span>
                      <span
                        className="rounded-full border-2 border-line px-2.5 py-0.5 text-xs font-extrabold"
                        style={{ backgroundColor: accentColor(cat.accent), color: "#16151d" }}
                      >
                        {toBn(count)}টি
                      </span>
                    </div>
                    <h3 className="font-bangla text-lg">{cat.titleBn}</h3>
                    <p className="text-xs font-bold tracking-wide text-muted uppercase">
                      {cat.title}
                    </p>
                    <p className="font-bangla mt-2 text-sm text-muted">{cat.blurb}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------- Popular lessons */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
        <SectionHeading
          eyebrow="জনপ্রিয়"
          accent="#ff5d5d"
          title="যেগুলো সবচেয়ে বেশি ভুল হয়"
          subtitle="এই চারটা ঠিক করে ফেললেই আপনার ইংরেজি অনেক ভালো শোনাবে।"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((l) => (
            <Link key={l.slug} href={`/grammar/${l.slug}`}>
              <Card interactive className="h-full p-6">
                <div className="mb-2 flex items-center gap-2 text-xs font-bold text-muted uppercase">
                  <span>{l.title}</span>
                  <span aria-hidden>·</span>
                  <span>{toBn(l.minutes)} মিনিট</span>
                </div>
                <h3 className="font-bangla text-2xl">{l.titleBn}</h3>
                <p className="font-bangla mt-2 text-sm text-muted">{l.hook}</p>
                <p className="mt-4 text-sm font-extrabold text-[color:var(--color-sky)]">
                  পড়া শুরু করুন →
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------- How it works */}
      <section className="border-t-2 border-line surface-alt">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6">
          <SectionHeading
            eyebrow="কীভাবে চলে"
            accent="#14c39a"
            title="তিন ধাপে অভ্যাস"
            align="center"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {HOW.map((s, i) => (
              <Card key={s.n} className="relative p-6 pt-10">
                <span
                  className="font-bangla absolute -top-5 left-5 flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-line text-2xl font-extrabold shadow-(--shadow-hard-sm)"
                  style={{ backgroundColor: ["#ffb020", "#1a91ff", "#e94ea8"][i] }}
                >
                  {s.n}
                </span>
                <h3 className="font-bangla text-xl">{s.t}</h3>
                <p className="font-bangla mt-2 text-sm text-muted">{s.d}</p>
              </Card>
            ))}
          </div>

          <div className="brut-lg mt-12 flex flex-col items-center gap-5 p-8 text-center sm:p-12">
            <h2 className="text-[length:var(--text-display)]">
              আজই <span className="marker">প্রথম লেসন</span> শেষ করুন
            </h2>
            <p className="font-bangla max-w-xl text-muted">
              ৬ মিনিটে একটা লেসন। কোনো সাইন-আপ নেই, কোনো পেমেন্ট নেই। শুধু আপনি আর
              ইংরেজি।
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <ButtonLink href="/grammar/parts-of-speech" size="lg" tone="ink">
                🚀 শুরু করুন
              </ButtonLink>
              <ButtonLink href="/games" size="lg" variant="outline">
                🎮 আগে একটু খেলি
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
