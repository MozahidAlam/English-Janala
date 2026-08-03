"use client";

import { useEffect } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaced in the Vercel function/browser logs for debugging.
    console.error("Unhandled app error:", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60dvh] w-full max-w-xl flex-col items-center justify-center gap-5 px-4 py-16 text-center">
      <span className="text-7xl" aria-hidden>
        😵‍💫
      </span>
      <h1 className="font-bangla text-[length:var(--text-display)]">কিছু একটা ভুল হয়েছে</h1>
      <p className="font-bangla text-muted">
        চিন্তা নেই, আপনার প্রোগ্রেস নিরাপদ আছে। আবার চেষ্টা করে দেখুন।
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={reset} tone="ink">
          🔄 আবার চেষ্টা করুন
        </Button>
        <ButtonLink href="/" variant="outline">
          🏠 হোমে ফিরুন
        </ButtonLink>
      </div>
      {error.digest ? (
        <p className="font-mono text-xs text-muted">ref: {error.digest}</p>
      ) : null}
    </div>
  );
}
