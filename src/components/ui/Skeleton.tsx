import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-md bg-[var(--zen-card-hover)]/80 border border-[var(--zen-border)]/40",
        className
      )}
    />
  );
}

export function NoteCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="p-5 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-3"
    >
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-5 w-3/4" />
      <div className="space-y-2 pt-1">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-5/6" />
      </div>
      <div className="pt-3 border-t border-[var(--zen-border)]/40 flex items-center justify-between">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
    </div>
  );
}

export function DirectorySidebarSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="space-y-3 p-3 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)]"
    >
      <Skeleton className="h-8 w-full" />
      <div className="flex gap-1.5">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-14" />
      </div>
      <div className="space-y-2 pt-2">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <Skeleton className="h-3.5 w-3.5 shrink-0" />
            <Skeleton
              className={cn(
                "h-4",
                idx % 3 === 0 ? "w-3/4" : idx % 2 === 0 ? "w-2/3" : "w-5/6"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SimulatorWorkbenchSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading interactive simulator workbench"
      className="p-4 sm:p-6 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-5"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--zen-border)]">
        <div className="space-y-2 flex-1 min-w-[220px]">
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-6 w-72 max-w-full" />
          <Skeleton className="h-3.5 w-96 max-w-full" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 space-y-2"
          >
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </div>

      <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 space-y-3">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-56 w-full" />
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[var(--zen-border)]">
        <Skeleton className="h-4 w-44" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
}
