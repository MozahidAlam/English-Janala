/**
 * Free Dictionary API (dictionaryapi.dev) + Datamuse.
 * Both are keyless and send `Access-Control-Allow-Origin: *`, so they are
 * called straight from the browser — no server route, no secrets.
 */
import type { EnrichedDefinition, WordEnrichment } from "@/lib/types";

const DICT = "https://api.dictionaryapi.dev/api/v2/entries/en";
const DATAMUSE = "https://api.datamuse.com/words";
// Kept short on purpose: enrichment is optional garnish, so a slow upstream
// must never be what the learner is waiting on.
const TIMEOUT_MS = 5_000;

const EMPTY: WordEnrichment = {
  phonetic: null,
  audioUrl: null,
  definitions: [],
  synonyms: [],
  antonyms: [],
  collocations: [],
};

const cache = new Map<string, WordEnrichment>();
/** De-dupes concurrent requests for the same word (card click + speak button). */
const inFlight = new Map<string, Promise<WordEnrichment>>();

/**
 * Already-resolved enrichment, or null. Lets callers render/play instantly on a
 * cache hit instead of awaiting a promise that would resolve on the next tick.
 */
export function cachedEnrichment(word: string): WordEnrichment | null {
  return cache.get(word.toLowerCase()) ?? null;
}

interface DictPhonetic {
  text?: string;
  audio?: string;
}
interface DictDefinition {
  definition?: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
}
interface DictMeaning {
  partOfSpeech?: string;
  definitions?: DictDefinition[];
  synonyms?: string[];
  antonyms?: string[];
}
interface DictEntry {
  word?: string;
  phonetic?: string;
  phonetics?: DictPhonetic[];
  meanings?: DictMeaning[];
}

async function fetchDictionary(word: string): Promise<DictEntry[] | null> {
  try {
    const res = await fetch(`${DICT}/${encodeURIComponent(word)}`, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) return null;
    const json: unknown = await res.json();
    return Array.isArray(json) ? (json as DictEntry[]) : null;
  } catch {
    return null;
  }
}

/** Datamuse: words that commonly follow the given word (collocations). */
async function fetchCollocations(word: string): Promise<string[]> {
  try {
    const res = await fetch(
      `${DATAMUSE}?rel_bga=${encodeURIComponent(word)}&max=8`,
      { signal: AbortSignal.timeout(TIMEOUT_MS) },
    );
    if (!res.ok) return [];
    const json = (await res.json()) as Array<{ word?: string }>;
    return json.map((d) => d.word ?? "").filter(Boolean);
  } catch {
    return [];
  }
}

/** Datamuse: semantically related words. Used as a synonym fallback. */
export async function relatedWords(word: string, max = 10): Promise<string[]> {
  try {
    const res = await fetch(
      `${DATAMUSE}?ml=${encodeURIComponent(word)}&max=${max}`,
      { signal: AbortSignal.timeout(TIMEOUT_MS) },
    );
    if (!res.ok) return [];
    const json = (await res.json()) as Array<{ word?: string }>;
    return json.map((d) => d.word ?? "").filter(Boolean);
  } catch {
    return [];
  }
}

const POS_LABEL: Record<string, string> = {
  n: "noun",
  v: "verb",
  adj: "adjective",
  adv: "adverb",
  u: "",
};

/**
 * Datamuse definitions, used when dictionaryapi.dev is unavailable — it returns
 * 502s often enough that an empty panel would be a common outcome otherwise.
 * Rows look like "adj\tDesirous; keen to do something."
 */
async function fetchDatamuseEntry(
  word: string,
): Promise<{ definitions: EnrichedDefinition[]; phonetic: string | null }> {
  try {
    const res = await fetch(
      `${DATAMUSE}?sp=${encodeURIComponent(word)}&md=dp&max=1`,
      { signal: AbortSignal.timeout(TIMEOUT_MS) },
    );
    if (!res.ok) return { definitions: [], phonetic: null };
    const json = (await res.json()) as Array<{
      defs?: string[];
      tags?: string[];
    }>;
    const entry = json[0];
    if (!entry) return { definitions: [], phonetic: null };

    const definitions = (entry.defs ?? []).slice(0, 4).map<EnrichedDefinition>((row) => {
      const [pos, ...rest] = row.split("\t");
      return {
        partOfSpeech: POS_LABEL[pos ?? ""] ?? pos ?? "",
        definition: rest.join("\t").trim(),
        example: null,
      };
    });

    const pronTag = (entry.tags ?? []).find((t) => t.startsWith("pron:"));
    return {
      definitions: definitions.filter((d) => d.definition),
      phonetic: pronTag ? `/${pronTag.slice(5).trim().toLowerCase()}/` : null,
    };
  } catch {
    return { definitions: [], phonetic: null };
  }
}

/** Datamuse: words that rhyme — powers the rhyme game. */
export async function rhymesWith(word: string, max = 12): Promise<string[]> {
  try {
    const res = await fetch(
      `${DATAMUSE}?rel_rhy=${encodeURIComponent(word)}&max=${max}`,
      { signal: AbortSignal.timeout(TIMEOUT_MS) },
    );
    if (!res.ok) return [];
    const json = (await res.json()) as Array<{ word?: string }>;
    return json.map((d) => d.word ?? "").filter(Boolean);
  } catch {
    return [];
  }
}

function pickAudio(phonetics: DictPhonetic[] | undefined): string | null {
  if (!phonetics?.length) return null;
  const withAudio = phonetics.filter((p) => p.audio && p.audio.length > 0);
  if (!withAudio.length) return null;
  // Prefer US, then UK, then whatever exists.
  const us = withAudio.find((p) => p.audio?.includes("-us."));
  const uk = withAudio.find((p) => p.audio?.includes("-uk."));
  return (us ?? uk ?? withAudio[0])!.audio ?? null;
}

function pickPhonetic(entry: DictEntry): string | null {
  if (entry.phonetic) return entry.phonetic;
  const withText = entry.phonetics?.find((p) => p.text);
  return withText?.text ?? null;
}

function uniq(list: readonly string[], limit: number): string[] {
  return [...new Set(list.map((s) => s.toLowerCase().trim()).filter(Boolean))].slice(
    0,
    limit,
  );
}

/**
 * Everything the word-detail view needs beyond the vocabulary API.
 * Always resolves — an unreachable API yields empty fields, never an error.
 */
export async function enrichWord(word: string): Promise<WordEnrichment> {
  const key = word.toLowerCase();
  const hit = cache.get(key);
  if (hit) return hit;

  const pending = inFlight.get(key);
  if (pending) return pending;

  const task = loadEnrichment(word, key).finally(() => inFlight.delete(key));
  inFlight.set(key, task);
  return task;
}

async function loadEnrichment(word: string, key: string): Promise<WordEnrichment> {
  const [entries, collocations] = await Promise.all([
    fetchDictionary(word),
    fetchCollocations(word),
  ]);

  if (!entries?.length) {
    // dictionaryapi.dev is down or does not know the word — rebuild what we can
    // from Datamuse so the panel still has definitions and synonyms.
    const [fallbackSyn, datamuse] = await Promise.all([
      relatedWords(word, 8),
      fetchDatamuseEntry(word),
    ]);
    const result: WordEnrichment = {
      ...EMPTY,
      phonetic: datamuse.phonetic,
      definitions: datamuse.definitions,
      synonyms: uniq(fallbackSyn, 8),
      collocations: uniq(collocations, 6),
    };
    cache.set(key, result);
    return result;
  }

  const entry = entries[0]!;
  const definitions: EnrichedDefinition[] = [];
  const synonyms: string[] = [];
  const antonyms: string[] = [];

  for (const meaning of entry.meanings ?? []) {
    const pos = meaning.partOfSpeech ?? "";
    synonyms.push(...(meaning.synonyms ?? []));
    antonyms.push(...(meaning.antonyms ?? []));
    for (const def of meaning.definitions ?? []) {
      if (!def.definition) continue;
      synonyms.push(...(def.synonyms ?? []));
      antonyms.push(...(def.antonyms ?? []));
      if (definitions.length < 4) {
        definitions.push({
          partOfSpeech: pos,
          definition: def.definition,
          example: def.example ?? null,
        });
      }
    }
  }

  // Audio can live on a later entry than the first.
  const audioUrl =
    pickAudio(entry.phonetics) ??
    entries.map((e) => pickAudio(e.phonetics)).find(Boolean) ??
    null;

  const result: WordEnrichment = {
    phonetic: pickPhonetic(entry) ?? entries.map(pickPhonetic).find(Boolean) ?? null,
    audioUrl,
    definitions,
    synonyms: uniq(synonyms, 8),
    antonyms: uniq(antonyms, 6),
    collocations: uniq(collocations, 6),
  };
  cache.set(key, result);
  return result;
}
