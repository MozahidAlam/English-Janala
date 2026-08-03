"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/content/nav";
import { useProgress } from "@/lib/hooks/useProgress";
import { liveStreak } from "@/lib/storage/progress";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn, toBn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { state, hydrated } = useProgress();
  const streak = hydrated ? liveStreak(state) : 0;

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-line surface/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1.5 text-lg font-extrabold"
        >
          <span className="font-display">English</span>
          <Image
            src="/assets/logo.png"
            alt=""
            width={26}
            height={26}
            className="h-6 w-auto"
            priority
          />
          <span className="font-bangla">জানালা</span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="প্রধান মেনু">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-xl border-2 px-3 py-1.5 text-sm font-bold transition-all",
                isActive(item.href)
                  ? "border-line bg-violet text-white shadow-(--shadow-hard-sm)"
                  : "border-transparent hover:border-line hover:surface-alt",
              )}
            >
              <span aria-hidden className="mr-1">
                {item.emoji}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-2">
          {hydrated && state.xp > 0 ? (
            <div className="brut-sm hidden items-center gap-2.5 px-3 py-1.5 text-sm font-extrabold sm:flex">
              <span title="মোট XP">⚡ {toBn(state.xp)}</span>
              <span className="h-4 w-0.5 bg-line-soft" aria-hidden />
              <span title="স্ট্রিক" className={streak > 0 ? "" : "opacity-40"}>
                <span className={cn("inline-block", streak > 0 && "anim-flame")} aria-hidden>
                  🔥
                </span>{" "}
                {toBn(streak)}
              </span>
            </div>
          ) : null}

          <ThemeToggle compact />

          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="মেনু"
            className="brut-sm brut-press flex h-10 w-10 items-center justify-center lg:hidden"
          >
            <span aria-hidden>{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="মোবাইল মেনু"
          className="anim-pop border-t-2 border-line surface px-4 pb-4 lg:hidden"
        >
          <ul className="grid gap-2 pt-3 sm:grid-cols-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "brut-sm brut-press flex items-center gap-3 p-3",
                    isActive(item.href) && "bg-violet text-white",
                  )}
                >
                  <span className="text-2xl" aria-hidden>
                    {item.emoji}
                  </span>
                  <span>
                    <span className="block font-bold">{item.label}</span>
                    <span className="font-bangla block text-xs opacity-70">
                      {item.desc}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
