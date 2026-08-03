import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("skeleton rounded-xl border-2 border-line-soft", className)}
      aria-hidden
    />
  );
}

export function WordCardSkeleton() {
  return (
    <div className="brut space-y-4 p-6">
      <Skeleton className="mx-auto h-7 w-32" />
      <Skeleton className="mx-auto h-4 w-24" />
      <Skeleton className="mx-auto h-9 w-full" />
      <div className="flex justify-between gap-2 pt-2">
        <Skeleton className="h-10 w-14" />
        <Skeleton className="h-10 w-14" />
      </div>
    </div>
  );
}

export function EmptyState({
  emoji,
  title,
  body,
  action,
}: {
  emoji: string;
  title: string;
  body?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="brut-flat col-span-full flex flex-col items-center gap-3 px-6 py-14 text-center">
      <span className="text-6xl anim-drift" aria-hidden>
        {emoji}
      </span>
      <h3 className="font-bangla text-2xl">{title}</h3>
      {body ? (
        <p className="font-bangla max-w-md text-muted">{body}</p>
      ) : null}
      {action}
    </div>
  );
}
