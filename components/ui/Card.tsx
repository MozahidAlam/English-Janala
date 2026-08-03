import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  interactive = false,
  size = "md",
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const shell = size === "lg" ? "brut-lg" : size === "sm" ? "brut-sm" : "brut";
  return (
    <div className={cn(shell, interactive && "brut-press", className)}>
      {children}
    </div>
  );
}

/** Small pill label. */
export function Chip({
  children,
  className,
  tone,
}: {
  children: ReactNode;
  className?: string;
  tone?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border-2 border-line px-2.5 py-0.5 text-xs font-bold",
        className,
      )}
      style={tone ? { backgroundColor: tone } : undefined}
    >
      {children}
    </span>
  );
}

/** Section heading with an offset accent slab behind the eyebrow. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  accent = "#ffb020",
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  accent?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("mb-8", align === "center" && "text-center")}>
      {eyebrow ? (
        <span
          className="mb-3 inline-block -rotate-1 rounded-lg border-2 border-line px-3 py-1 text-xs font-extrabold tracking-widest uppercase shadow-(--shadow-hard-sm)"
          style={{ backgroundColor: accent, color: "#16151d" }}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-[length:var(--text-section)]">{title}</h2>
      {subtitle ? (
        <p
          className={cn(
            "font-bangla mt-3 max-w-2xl text-base text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
