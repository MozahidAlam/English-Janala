import type { MetadataRoute } from "next";
import { GRAMMAR_LESSONS } from "@/lib/content/grammar";
import { GAMES } from "@/lib/content/games";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://english-janala.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: BASE, changeFrequency: "weekly", priority: 1 },
      { url: `${BASE}/grammar`, changeFrequency: "weekly", priority: 0.9 },
      { url: `${BASE}/vocabulary`, changeFrequency: "weekly", priority: 0.8 },
      { url: `${BASE}/flashcards`, changeFrequency: "monthly", priority: 0.7 },
      { url: `${BASE}/guru`, changeFrequency: "monthly", priority: 0.8 },
      { url: `${BASE}/games`, changeFrequency: "monthly", priority: 0.7 },
    ] satisfies MetadataRoute.Sitemap
  ).map((r) => ({ ...r, lastModified: now }));

  const lessons: MetadataRoute.Sitemap = GRAMMAR_LESSONS.map((l) => ({
    url: `${BASE}/grammar/${l.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const games: MetadataRoute.Sitemap = GAMES.map((g) => ({
    url: `${BASE}/games/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...lessons, ...games];
}
