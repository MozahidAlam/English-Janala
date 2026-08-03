import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categoryById,
  GRAMMAR_LESSONS,
  lessonBySlug,
  lessonNeighbours,
} from "@/lib/content/grammar";
import { LessonQuiz } from "@/components/grammar/LessonQuiz";
import { LessonReader } from "@/components/grammar/LessonReader";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { accentColor, toBn } from "@/lib/utils";

export function generateStaticParams() {
  return GRAMMAR_LESSONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lesson = lessonBySlug(slug);
  if (!lesson) return { title: "লেসন পাওয়া যায়নি" };

  return {
    title: `${lesson.title} (${lesson.titleBn}) — বাংলায় ব্যাখ্যা`,
    description: lesson.rule.slice(0, 155),
    alternates: { canonical: `/grammar/${lesson.slug}` },
    openGraph: {
      title: `${lesson.title} — ${lesson.titleBn}`,
      description: lesson.hook,
      type: "article",
    },
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = lessonBySlug(slug);
  if (!lesson) notFound();

  const category = categoryById(lesson.category);
  const { prev, next } = lessonNeighbours(lesson.slug);
  const accent = accentColor(category?.accent ?? "sky");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: `${lesson.title} — ${lesson.titleBn}`,
    description: lesson.rule,
    inLanguage: "bn",
    educationalLevel: "beginner",
    learningResourceType: "lesson",
    timeRequired: `PT${lesson.minutes}M`,
    teaches: lesson.title,
  };

  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---------------------------------------------------------- header */}
      <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm" aria-label="ব্রেডক্রাম্ব">
        <Link href="/grammar" className="font-bold hover:underline">
          গ্রামার
        </Link>
        <span aria-hidden className="text-muted">
          /
        </span>
        <Link
          href={`/grammar#${lesson.category}`}
          className="font-bangla font-bold hover:underline"
        >
          {category?.titleBn}
        </Link>
      </nav>

      <header className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-extrabold">
          <span
            className="rounded-full border-2 border-line px-3 py-1 text-ink"
            style={{ backgroundColor: accent }}
          >
            {category?.emoji} {category?.title}
          </span>
          <span className="surface-alt rounded-full border-2 border-line-soft px-3 py-1 text-muted">
            ⏱ {toBn(lesson.minutes)} মিনিট
          </span>
          <span className="surface-alt rounded-full border-2 border-line-soft px-3 py-1 text-muted">
            ❓ {toBn(lesson.quiz.length)} প্রশ্ন
          </span>
        </div>

        <h1 className="text-[length:var(--text-display)]">{lesson.title}</h1>
        <p className="font-bangla mt-1 text-2xl font-bold text-muted">{lesson.titleBn}</p>
      </header>

      {/* ------------------------------------------------------------ hook */}
      <div
        className="brut-lg mb-8 flex gap-4 p-6"
        style={{ backgroundColor: `${accent}22` }}
      >
        <span className="text-4xl" aria-hidden>
          💡
        </span>
        <p className="font-bangla text-lg leading-relaxed font-semibold">{lesson.hook}</p>
      </div>

      <div className="space-y-8">
        {/* ----------------------------------------------------------- rule */}
        <Section title="নিয়মটা কী?" emoji="📌">
          <p className="font-bangla text-lg leading-relaxed">{lesson.rule}</p>
        </Section>

        {/* --------------------------------------------------------- points */}
        <Section title="মূল পয়েন্টগুলো" emoji="🔑">
          <ul className="space-y-2.5">
            {lesson.points.map((p, i) => (
              <li key={i} className="font-bangla flex gap-3 leading-relaxed">
                <span
                  className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-line"
                  style={{ backgroundColor: accent }}
                  aria-hidden
                />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ------------------------------------------------------- formulas */}
        {lesson.formulas?.length ? (
          <Section title="গঠন / সূত্র" emoji="🧮">
            <div className="space-y-3">
              {lesson.formulas.map((f, i) => (
                <div key={i} className="surface-alt rounded-2xl border-2 border-line-soft p-4">
                  <p className="font-bangla text-xs font-extrabold tracking-widest text-muted uppercase">
                    {f.label}
                  </p>
                  <p className="mt-1.5 font-mono text-base font-bold break-words">
                    {f.formula}
                  </p>
                  <p className="mt-1 text-sm text-muted italic">{f.example}</p>
                </div>
              ))}
            </div>
          </Section>
        ) : null}

        {/* ------------------------------------------------------- examples */}
        <Section title="উদাহরণ" emoji="📝">
          <ul className="space-y-2">
            {lesson.examples.map((e, i) => (
              <li
                key={i}
                className="surface-alt rounded-xl border-2 border-line-soft px-4 py-2.5 text-[15px] break-words"
              >
                {e}
              </li>
            ))}
          </ul>
        </Section>

        {/* ---------------------------------------------------- wrong/right */}
        <Section title="ভুল বনাম ঠিক" emoji="⚔️">
          <div className="space-y-4">
            {lesson.wrongRight.map((wr, i) => (
              <div key={i} className="brut overflow-hidden p-0">
                <div className="grid sm:grid-cols-2">
                  <div
                    className="border-b-2 border-line p-4 sm:border-r-2 sm:border-b-0"
                    style={{ backgroundColor: "#ffe0e0" }}
                  >
                    <p className="mb-1 text-xs font-extrabold text-ink/60">❌ ভুল</p>
                    <p className="font-semibold text-ink line-through decoration-2">
                      {wr.wrong}
                    </p>
                  </div>
                  <div className="p-4" style={{ backgroundColor: "#d7f7ec" }}>
                    <p className="mb-1 text-xs font-extrabold text-ink/60">✅ ঠিক</p>
                    <p className="font-semibold text-ink">{wr.right}</p>
                  </div>
                </div>
                <p className="font-bangla border-t-2 border-line px-4 py-3 text-sm text-muted">
                  <strong className="text-[color:var(--fg)]">কেন:</strong> {wr.why}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------------------------------------------------------- trick */}
        {lesson.trick ? (
          <div
            className="brut-lg flex gap-4 p-6"
            style={{ backgroundColor: "#fff0c2" }}
          >
            <span className="text-4xl" aria-hidden>
              🧠
            </span>
            <div>
              <p className="mb-1 text-xs font-extrabold tracking-widest text-ink/60 uppercase">
                মনে রাখার কৌশল
              </p>
              <p className="font-bangla text-lg leading-relaxed font-semibold text-ink">
                {lesson.trick}
              </p>
            </div>
          </div>
        ) : null}

        <LessonReader lesson={lesson} />
        <LessonQuiz slug={lesson.slug} questions={lesson.quiz} />
      </div>

      {/* ------------------------------------------------------------- nav */}
      <nav
        className="mt-12 grid gap-3 sm:grid-cols-2"
        aria-label="লেসন নেভিগেশন"
      >
        {prev ? (
          <Link href={`/grammar/${prev.slug}`}>
            <Card interactive className="h-full p-4">
              <p className="text-xs font-bold text-muted">← আগের লেসন</p>
              <p className="font-bangla mt-1 font-bold">{prev.titleBn}</p>
            </Card>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/grammar/${next.slug}`}>
            <Card interactive className="h-full p-4 text-right">
              <p className="text-xs font-bold text-muted">পরের লেসন →</p>
              <p className="font-bangla mt-1 font-bold">{next.titleBn}</p>
            </Card>
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/grammar" variant="outline">
          📚 সব লেসন
        </ButtonLink>
        <ButtonLink href="/guru" variant="outline">
          🔎 নিজের লেখা চেক করুন
        </ButtonLink>
      </div>
    </article>
  );
}

function Section({
  title,
  emoji,
  children,
}: {
  title: string;
  emoji: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-bangla mb-3 flex items-center gap-2 text-xl">
        <span aria-hidden>{emoji}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}
