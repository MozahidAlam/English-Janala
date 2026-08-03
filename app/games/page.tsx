import type { Metadata } from "next";
import Link from "next/link";
import { GAMES } from "@/lib/content/games";
import { SectionHeading, Card } from "@/components/ui/Card";
import { GameScoreBadge } from "@/components/games/GameScoreBadge";

export const metadata: Metadata = {
  title: "Games — খেলতে খেলতে English শিখুন",
  description:
    "Spot the Error, Sentence Builder, Word Match, Hangman আর Boss Battle — ৫টি ফ্রি মিনি-গেম দিয়ে ইংরেজি গ্রামার ও ভোকাবুলারি চর্চা করুন।",
  alternates: { canonical: "/games" },
};

export default function GamesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <SectionHeading
        eyebrow="মিনি-গেম"
        accent="#e94ea8"
        title={
          <>
            পড়া নয়, <span className="marker">খেলা</span>
          </>
        }
        subtitle="মজা করে শিখলে মনে থাকে বেশি। প্রতিটি গেমে আপনার সেরা স্কোর সেভ থাকবে।"
        align="center"
      />

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {GAMES.map((game) => (
          <Link key={game.slug} href={`/games/${game.slug}`}>
            <Card interactive className="flex h-full flex-col p-6">
              <div className="mb-4 flex items-start justify-between">
                <span
                  className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-line text-4xl"
                  style={{ backgroundColor: game.color }}
                  aria-hidden
                >
                  {game.emoji}
                </span>
                <GameScoreBadge slug={game.slug} />
              </div>
              <h2 className="font-bangla text-xl">{game.titleBn}</h2>
              <p className="text-xs font-bold tracking-wide text-muted uppercase">
                {game.title}
              </p>
              <p className="font-bangla mt-2 flex-1 text-sm text-muted">{game.desc}</p>
              <p className="mt-4 text-xs font-extrabold text-muted">
                🎓 চর্চা হয়: {game.skill}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
