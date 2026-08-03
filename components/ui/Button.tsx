import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "outline" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";
type Tone = "sky" | "amber" | "coral" | "mint" | "violet" | "grape" | "ink";

const TONE_BG: Record<Tone, string> = {
  sky: "bg-sky text-white",
  amber: "bg-amber text-ink",
  coral: "bg-coral text-white",
  mint: "bg-mint text-ink",
  violet: "bg-violet text-white",
  grape: "bg-grape text-white",
  ink: "bg-ink text-paper",
};

const SIZE: Record<Size, string> = {
  sm: "px-3.5 py-1.5 text-sm gap-1.5",
  md: "px-5 py-2.5 text-base gap-2",
  lg: "px-7 py-3.5 text-lg gap-2.5",
};

function classes(variant: Variant, size: Size, tone: Tone, extra?: string) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-xl border-2 border-line brut-press select-none";
  const look =
    variant === "solid"
      ? TONE_BG[tone]
      : variant === "accent"
        ? cn(TONE_BG[tone], "shadow-(--shadow-hard-lg)")
        : variant === "outline"
          ? "surface text-(--fg)"
          : "border-transparent shadow-none text-(--fg) hover:surface-alt";
  const shadow = variant === "ghost" ? "" : "shadow-(--shadow-hard)";
  return cn(base, SIZE[size], look, shadow, extra);
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = "solid",
  size = "md",
  tone = "sky",
  className,
  children,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button className={classes(variant, size, tone, className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "solid",
  size = "md",
  tone = "sky",
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<typeof Link>,
    "href" | "className" | "children"
  >) {
  return (
    <Link href={href} className={classes(variant, size, tone, className)} {...rest}>
      {children}
    </Link>
  );
}
