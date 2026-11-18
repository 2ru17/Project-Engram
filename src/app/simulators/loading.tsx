import {
  SimulatorWorkbenchSkeleton,
  Skeleton,
} from "@/components/ui/Skeleton";

export default function SimulatorsLoading() {
  return (
    <div
      role="status"
      aria-label="Loading Interactive Simulators Studio"
      className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8"
    >
      <div className="border-b border-[var(--zen-border)] pb-6 space-y-4">
        <Skeleton className="h-3.5 w-52" />
        <Skeleton className="h-9 w-96 max-w-full" />
        <Skeleton className="h-4 w-full max-w-2xl" />
        <div className="flex flex-wrap gap-2 pt-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton key={idx} className="h-8 w-36" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-2.5">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-2"
            >
              <div className="flex justify-between">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
            </div>
          ))}
        </div>

        <div className="lg:col-span-8">
          <SimulatorWorkbenchSkeleton />
        </div>
      </div>
    </div>
  );
}
