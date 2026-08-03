/**
 * One-off content snapshot builder.
 *
 * The app fetches vocabulary live from the Programming Hero open API. That API is
 * third-party, so we also ship a snapshot that is bundled with the build and used
 * whenever the network call fails. This keeps the site fully usable offline and
 * immune to upstream downtime — without introducing a database.
 *
 * Run:  node scripts/build-fallback.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(HERE, "../lib/data/vocabulary.json");
const BASE = "https://openapi.programming-hero.com/api";

async function getJson(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(20_000) });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function main() {
  console.log("→ fetching levels…");
  const levelsRes = await getJson(`${BASE}/levels/all`);
  const levels = levelsRes.data.map((l) => ({
    id: l.id,
    levelNo: l.level_no,
    lessonName: l.lessonName,
  }));

  console.log(`→ ${levels.length} levels. fetching words per level…`);
  const byId = new Map();
  for (const lvl of levels) {
    const res = await getJson(`${BASE}/level/${lvl.levelNo}`);
    for (const w of res.data ?? []) byId.set(w.id, { ...w });
    console.log(`   level ${lvl.levelNo}: ${res.data?.length ?? 0}`);
  }

  console.log(`→ ${byId.size} unique words. fetching details…`);
  const ids = [...byId.keys()];
  const CHUNK = 12;
  for (let i = 0; i < ids.length; i += CHUNK) {
    const slice = ids.slice(i, i + CHUNK);
    await Promise.all(
      slice.map(async (id) => {
        try {
          const res = await getJson(`${BASE}/word/${id}`);
          const d = res.data;
          if (d && typeof d === "object") {
            byId.set(id, {
              ...byId.get(id),
              meaning: d.meaning ?? byId.get(id).meaning ?? null,
              pronunciation:
                d.pronunciation ?? byId.get(id).pronunciation ?? null,
              sentence: d.sentence ?? null,
              points: d.points ?? null,
              partsOfSpeech: d.partsOfSpeech ?? null,
              synonyms: Array.isArray(d.synonyms) ? d.synonyms : [],
            });
          }
        } catch {
          /* keep the list-level record; detail is optional */
        }
      }),
    );
    process.stdout.write(`   ${Math.min(i + CHUNK, ids.length)}/${ids.length}\r`);
  }

  const words = [...byId.values()]
    .map((w) => ({
      id: w.id,
      level: w.level,
      word: w.word ?? "",
      meaning: w.meaning ?? null,
      pronunciation: w.pronunciation ?? null,
      sentence: w.sentence ?? null,
      points: w.points ?? null,
      partsOfSpeech: w.partsOfSpeech ?? null,
      synonyms: w.synonyms ?? [],
    }))
    .filter((w) => w.word)
    .sort((a, b) => a.level - b.level || a.word.localeCompare(b.word));

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(
    OUT,
    JSON.stringify({ levels, words, snapshotAt: new Date().toISOString() }, null, 0),
  );

  const withMeaning = words.filter((w) => w.meaning).length;
  const withSentence = words.filter((w) => w.sentence).length;
  console.log(
    `\n✓ wrote ${OUT}\n  words=${words.length} meaning=${withMeaning} sentence=${withSentence}`,
  );
}

main().catch((err) => {
  console.error("✗ snapshot failed:", err);
  process.exit(1);
});
