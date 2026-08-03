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

/**
 * Readable foreground for a solid accent fill. Uses relative luminance rather
 * than a hand-kept list so any new accent stays legible automatically.
 */
export function readableOn(hex: string): "#16151d" | "#ffffff" {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const toLinear = (channel: number) => {
    const s = channel / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const r = toLinear(parseInt(full.slice(0, 2), 16));
  const g = toLinear(parseInt(full.slice(2, 4), 16));
  const b = toLinear(parseInt(full.slice(4, 6), 16));
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  // Contrast against black vs white; pick whichever is higher.
  return (luminance + 0.05) / 0.05 >= 1.05 / (luminance + 0.05) ? "#16151d" : "#ffffff";
}
