import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GAMES, gameBySlug } from "@/lib/content/games";
import { playableWords } from "@/lib/api/vocabulary";
import { SpotTheError } from "@/components/games/SpotTheError";
import { SentenceBuilder } from "@/components/games/SentenceBuilder";
import { WordMatch } from "@/components/games/WordMatch";
import { Hangman } from "@/components/games/Hangman";
import { BossBattle } from "@/components/games/BossBattle";

export function generateStaticParams() {
  return GAMES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = gameBySlug(slug);
  if (!game) return { title: "গেম পাওয়া যায়নি" };
  return {
    title: `${game.title} — ${game.titleBn}`,
    description: game.desc,
    alternates: { canonical: `/games/${game.slug}` },
  };
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = gameBySlug(slug);
  if (!game) notFound();

  const pool = playableWords();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm" aria-label="ব্রেডক্রাম্ব">
        <Link href="/games" className="font-bold hover:underline">
          ← সব গেম
        </Link>
      </nav>

      {slug === "spot-the-error" ? <SpotTheError /> : null}
      {slug === "sentence-builder" ? <SentenceBuilder /> : null}
      {slug === "word-match" ? <WordMatch pool={pool} /> : null}
      {slug === "hangman" ? <Hangman pool={pool} /> : null}
      {slug === "boss-battle" ? <BossBattle /> : null}
    </div>
  );
}
