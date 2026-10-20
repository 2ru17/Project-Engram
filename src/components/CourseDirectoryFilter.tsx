"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useStudyPlan } from "./StudyPlanProvider";
import {
  STUDY_PLAN_TIER_LIST,
  STUDY_PLAN_TIERS,
  matchesStudyPlanTier,
} from "@/lib/study-plans";

export interface DirectoryItemEntry {
  name: string;
  isDir: boolean;
  path: string;
}

interface CourseDirectoryFilterProps {
  courseCode: string;
  items: DirectoryItemEntry[];
}

export default function CourseDirectoryFilter({
  courseCode,
  items,
}: CourseDirectoryFilterProps) {
  const {
    tier,
    setTier,
    completedNotes,
    isNoteCompleted,
    toggleNoteCompleted,
    setSyncModalOpen,
  } = useStudyPlan();

  const filteredItems = useMemo(() => {
    return items.filter((item, idx) => {
      if (item.isDir) return true;
      return matchesStudyPlanTier(item.name, item.path, tier, idx);
    });
  }, [items, tier]);

  const completedInCourseCount = useMemo(() => {
    const prefix = `/notes/${courseCode.toUpperCase()}/`;
    return completedNotes.filter((u) =>
      u.toUpperCase().startsWith(prefix)
    ).length;
  }, [completedNotes, courseCode]);

  return (
    <div className="space-y-5">
      {/* Study Plan Tier Filter Bar + Course Completion Telemetry */}
      <div className="p-4 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] flex flex-col lg:flex-row lg:items-center justify-between gap-4 universe-card">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-ink-muted)] mr-1">
            STUDY PLAN:
          </span>
          {STUDY_PLAN_TIER_LIST.map((plan) => {
            const isActive = plan.id === tier;
            return (
              <button
                key={plan.id}
                onClick={() => setTier(plan.id)}
                className={`px-3 py-1 text-[10px] font-mono tracking-wider rounded border transition-all ${
                  isActive
                    ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-cyan)] font-semibold"
                    : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] bg-[var(--zen-void)]/60"
                }`}
              >
                {plan.shortLabel}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3 text-[11px] font-mono">
          <span className="text-[var(--zen-ink-muted)]">
            {courseCode.toUpperCase()} COMPLETED:{" "}
            <strong className="text-[var(--zen-cyan)]">
              {completedInCourseCount}
            </strong>{" "}
            NOTES
          </span>
          <button
            onClick={() => setSyncModalOpen(true)}
            className="px-3 py-1 rounded border border-[var(--zen-cyan)]/50 hover:border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/10 text-[var(--zen-cyan)] hover:text-[var(--zen-snow)] text-[10px] font-mono tracking-wider uppercase transition-all"
          >
            SYNC CODE // EG2
          </button>
        </div>
      </div>

      {tier !== "full" && (
        <p className="text-[11px] font-mono text-[var(--zen-ink-muted)] px-1">
          Active Filter ({STUDY_PLAN_TIERS[tier].shortLabel}):{" "}
          {STUDY_PLAN_TIERS[tier].filterSummary} Showing {filteredItems.length}{" "}
          of {items.length} entries.
        </p>
      )}

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 universe-bento-grid">
        {filteredItems.map((item) => {
          const done = !item.isDir && isNoteCompleted(item.path);
          return (
            <div
              key={item.path}
              className={`universe-card p-4 rounded-lg border transition-all duration-300 group flex items-center justify-between shadow-lg hover:-translate-y-0.5 ${
                done
                  ? "border-[var(--zen-cyan)]/60 bg-[var(--zen-cyan)]/5"
                  : "border-[var(--zen-border)] hover:border-[var(--zen-cyan)]/60 bg-[var(--zen-card)] hover:bg-[var(--zen-card-hover)]"
              }`}
            >
              <Link
                href={item.path}
                className="flex-1 flex items-center gap-2.5 min-w-0 pr-3"
              >
                <span className="text-[var(--zen-cyan)] text-xs shrink-0 font-mono">
                  {item.isDir ? "▸" : done ? "[x]" : "◇"}
                </span>
                <span
                  className={`text-sm font-medium transition-colors truncate ${
                    done
                      ? "text-[var(--zen-cyan)]"
                      : "text-[var(--zen-snow)] group-hover:text-[var(--zen-cyan)]"
                  }`}
                >
                  {item.name}
                </span>
              </Link>

              <div className="flex items-center gap-2 shrink-0">
                {!item.isDir && (
                  <button
                    onClick={() => toggleNoteCompleted(item.path, item.name)}
                    title={
                      done ? "Mark monograph incomplete" : "Mark monograph completed"
                    }
                    className={`px-2 py-0.5 text-[9px] font-mono tracking-wider rounded border transition-all ${
                      done
                        ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)] text-[var(--zen-void)] font-bold"
                        : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:border-[var(--zen-cyan)] hover:text-[var(--zen-cyan)]"
                    }`}
                  >
                    {done ? "DONE" : "MARK"}
                  </button>
                )}
                <Link
                  href={item.path}
                  className="text-[var(--zen-cyan)] text-xs opacity-60 group-hover:opacity-100 transition-opacity pl-1"
                  aria-label={`Open ${item.name}`}
                >
                  →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
