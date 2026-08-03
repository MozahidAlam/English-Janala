import { cn } from "@/lib/utils";

/**
 * Route-level placeholder. Rendered by each `loading.tsx` so a navigation paints
 * the page shell immediately instead of leaving the previous screen frozen.
 */
export function PageSkeleton({
  cards = 6,
  columns = "3",
  narrow = false,
}: {
  cards?: number;
  columns?: "1" | "2" | "3";
  narrow?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 py-12 sm:px-6",
        narrow ? "max-w-3xl" : "max-w-6xl",
      )}
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">লোড হচ্ছে…</span>

      <div className="mb-10 flex flex-col items-center gap-4">
        <div className="skeleton h-7 w-40 rounded-lg border-2 border-line-soft" />
        <div className="skeleton h-12 w-3/4 max-w-lg rounded-xl border-2 border-line-soft" />
        <div className="skeleton h-5 w-full max-w-2xl rounded-lg border-2 border-line-soft" />
      </div>

      <div
        className={cn(
          "grid gap-5",
          columns === "3" && "sm:grid-cols-2 lg:grid-cols-3",
          columns === "2" && "sm:grid-cols-2",
        )}
      >
        {Array.from({ length: cards }, (_, i) => (
          <div
            key={i}
            className="skeleton h-40 rounded-2xl border-2 border-line-soft"
          />
        ))}
      </div>
    </div>
  );
}
