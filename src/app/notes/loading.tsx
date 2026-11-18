import {
  DirectorySidebarSkeleton,
  NoteCardSkeleton,
  Skeleton,
} from "@/components/ui/Skeleton";

export default function NotesLoading() {
  return (
    <div
      role="status"
      aria-label="Loading Archive and Knowledge Graph"
      className="min-h-screen bg-[var(--zen-void)] text-[var(--zen-frost)] flex flex-col"
    >
      <div className="w-full px-4 sm:px-8 py-3 border-b border-[var(--zen-border)] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8" />
          <div className="space-y-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-44" />
          </div>
        </div>
        <Skeleton className="h-9 w-48" />
      </div>

      <div className="max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <DirectorySidebarSkeleton />
        </div>
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <NoteCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
