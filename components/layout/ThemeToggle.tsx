"use client";

import { useEffect, useState } from "react";

const KEY = "ej.theme";

/**
 * Theme is applied by an inline script in <head> before paint (see layout.tsx);
 * this component only reflects and flips it.
 */
export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setReady(true);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(KEY, next ? "dark" : "light");
    } catch {
      /* storage disabled — theme still applies for this session */
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "লাইট মোডে যান" : "ডার্ক মোডে যান"}
      title={dark ? "Light mode" : "Dark mode"}
      className="brut-sm brut-press flex h-10 w-10 items-center justify-center text-lg"
    >
      <span aria-hidden style={{ opacity: ready ? 1 : 0 }}>
        {dark ? "🌙" : "☀️"}
      </span>
      {compact ? null : <span className="sr-only">থিম পরিবর্তন</span>}
    </button>
  );
}
