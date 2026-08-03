import { clamp } from "@/lib/utils";

export function ProgressBar({
  value,
  max = 100,
  color = "#14c39a",
  height = 14,
  label,
}: {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  label?: string;
}) {
  const pct = max > 0 ? clamp((value / max) * 100, 0, 100) : 0;
  return (
    <div
      className="surface-alt w-full overflow-hidden rounded-full border-2 border-line"
      style={{ height }}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
    >
      <div
        className="h-full rounded-full transition-[width] duration-700 ease-out"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}
