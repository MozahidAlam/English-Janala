/** Small shared helpers. Keep pure and dependency-free. */

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Local-timezone ISO date key (yyyy-mm-dd). Never use toISOString — it shifts to UTC. */
export function dateKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDays(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, (m ?? 1) - 1, d ?? 1);
  dt.setDate(dt.getDate() + days);
  return dateKey(dt);
}

export function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  const da = new Date(ay, (am ?? 1) - 1, ad ?? 1).getTime();
  const db = new Date(by, (bm ?? 1) - 1, bd ?? 1).getTime();
  return Math.round((db - da) / 86_400_000);
}

/** Deterministic-free shuffle (Fisher–Yates). Returns a new array. */
export function shuffle<T>(input: readonly T[]): T[] {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

export function sample<T>(input: readonly T[], n: number): T[] {
  return shuffle(input).slice(0, n);
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/** Convert a western-digit string/number to Bangla digits. */
const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"] as const;
export function toBn(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]!);
}

export function titleCase(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

/** XP -> rank ladder. */
export interface Rank {
  readonly name: string;
  readonly emoji: string;
  readonly min: number;
}

export const RANKS: readonly Rank[] = [
  { name: "নবীন", emoji: "🌱", min: 0 },
  { name: "শিক্ষানবিশ", emoji: "📗", min: 150 },
  { name: "চর্চাকারী", emoji: "✏️", min: 400 },
  { name: "দক্ষ", emoji: "🎯", min: 900 },
  { name: "পণ্ডিত", emoji: "🦉", min: 1800 },
  { name: "ওস্তাদ", emoji: "🏅", min: 3200 },
  { name: "গুরু", emoji: "👑", min: 5500 },
];

export function rankFor(xp: number): {
  current: Rank;
  next: Rank | null;
  progress: number;
} {
  let idx = 0;
  for (let i = 0; i < RANKS.length; i++) {
    if (xp >= RANKS[i]!.min) idx = i;
  }
  const current = RANKS[idx]!;
  const next = RANKS[idx + 1] ?? null;
  const progress = next
    ? clamp((xp - current.min) / (next.min - current.min), 0, 1)
    : 1;
  return { current, next, progress };
}

/** Accent token -> concrete CSS colour, so components can theme by name. */
export const ACCENT_HEX: Record<string, string> = {
  sky: "#1a91ff",
  amber: "#ffb020",
  coral: "#ff5d5d",
  mint: "#14c39a",
  violet: "#7c5cff",
  grape: "#e94ea8",
};

export function accentColor(name: string): string {
  return ACCENT_HEX[name] ?? ACCENT_HEX.sky!;
}
