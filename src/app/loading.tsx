import { NoteCardSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function RootLoading() {
  return (
    <div
      role="status"
      aria-label="Loading Project Engram"
      className="min-h-screen bg-[var(--zen-void)] text-[var(--zen-frost)] px-6 py-16 max-w-7xl mx-auto space-y-12"
    >
      <div className="max-w-3xl mx-auto text-center space-y-4 pt-8">
        <Skeleton className="h-4 w-48 mx-auto" />
        <Skeleton className="h-14 w-96 max-w-full mx-auto" />
        <Skeleton className="h-4 w-80 max-w-full mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <NoteCardSkeleton />
        <NoteCardSkeleton />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, idx) => (
          <NoteCardSkeleton key={idx} />
        ))}
      </div>
    </div>
  );
}
