"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import rawGeneratedChangelog from "@/data/changelog.generated.json";
import {
  LATEST_CHANGELOG_VERSION,
  type ChangelogCategory,
  type ChangelogEntry,
} from "@/data/changelog";

interface UpdateLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMarkSeen?: () => void;
}

type FilterKey = "all" | ChangelogCategory;

interface DisplayNoteRow {
  key: string;
  kind: "added" | "updated" | "removed";
  title: string;
  course: string;
  href?: string;
}

const MAX_INITIAL_NOTES = 8;
const MAX_INLINE_COURSES = 6;
const REPO_COMMITS_URL = "https://github.com/2ru17/Project-Engram/commits";

const CHANGELOG_ENTRIES =
  rawGeneratedChangelog as unknown as ChangelogEntry[];

const FILTER_TABS: { id: FilterKey; label: string }[] = [
  { id: "all", label: "All" },
  { id: "notes", label: "Notes" },
  { id: "simulators", label: "Simulators" },
  { id: "platform", label: "Platform" },
];

const CATEGORY_META: Record<
  ChangelogCategory,
  { label: string; badgeClass: string }
> = {
  notes: {
    label: "Notes",
    badgeClass:
      "border-[var(--zen-emerald)]/45 bg-[var(--zen-emerald)]/12 text-[var(--zen-emerald)]",
  },
  simulators: {
    label: "Simulators",
    badgeClass:
      "border-[var(--zen-cyan)]/45 bg-[var(--zen-cyan)]/12 text-[var(--zen-cyan)]",
  },
  platform: {
    label: "Platform",
    badgeClass:
      "border-[var(--zen-amber)]/45 bg-[var(--zen-amber)]/12 text-[var(--zen-amber)]",
  },
};

function formatCommitDate(isoDate: string): string {
  if (!isoDate) return "Unknown date";
  return isoDate.slice(0, 10);
}

function buildNoteRows(entry: ChangelogEntry): DisplayNoteRow[] {
  const rows: DisplayNoteRow[] = [];

  for (let i = 0; i < (entry.notes?.added?.length ?? 0); i++) {
    const item = entry.notes.added[i];
    rows.push({
      key: `added-${i}-${item.course}-${item.title}`,
      kind: "added",
      title: item.title,
      course: item.course,
      href: item.href,
    });
  }

  for (let i = 0; i < (entry.notes?.updated?.length ?? 0); i++) {
    const item = entry.notes.updated[i];
    rows.push({
      key: `updated-${i}-${item.course}-${item.title}`,
      kind: "updated",
      title: item.title,
      course: item.course,
      href: item.href,
    });
  }

  for (let i = 0; i < (entry.notes?.removed?.length ?? 0); i++) {
    const item = entry.notes.removed[i];
    rows.push({
      key: `removed-${i}-${item.course}-${item.title}`,
      kind: "removed",
      title: item.title,
      course: item.course,
    });
  }

  return rows;
}

export default function UpdateLogModal({
  isOpen,
  onClose,
  onMarkSeen,
}: UpdateLogModalProps) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [expandedCommits, setExpandedCommits] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    if (!isOpen) return;
    try {
      localStorage.setItem("engram-seen-changelog", LATEST_CHANGELOG_VERSION);
      onMarkSeen?.();
    } catch {
      // Ignore storage access failures
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onMarkSeen]);

  const categoryCounts = useMemo(() => {
    const counts: Record<FilterKey, number> = {
      all: CHANGELOG_ENTRIES.length,
      notes: 0,
      simulators: 0,
      platform: 0,
    };
    for (const entry of CHANGELOG_ENTRIES) {
      if (entry.category in counts) {
        counts[entry.category]++;
      }
    }
    return counts;
  }, []);

  const filteredEntries = useMemo(() => {
    if (filter === "all") return CHANGELOG_ENTRIES;
    return CHANGELOG_ENTRIES.filter((entry) => entry.category === filter);
  }, [filter]);

  const toggleExpandedCommit = useCallback((sha: string) => {
    setExpandedCommits((prev) => ({
      ...prev,
      [sha]: !prev[sha],
    }));
  }, []);

  const latestEntry = CHANGELOG_ENTRIES[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="update-log-title"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-3xl max-h-[88vh] flex flex-col bg-[var(--zen-void)] border border-[var(--zen-border)] rounded-xl shadow-2xl overflow-hidden text-[var(--zen-frost)] universe-card"
          >
            {/* Header */}
            <div className="px-5 sm:px-6 py-4 border-b border-[var(--zen-border)] bg-[var(--zen-card)] flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/10 flex items-center justify-center text-[var(--zen-cyan)] shrink-0">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
                      AUTOMATED COMMIT STREAM
                    </span>
                    {latestEntry && (
                      <span className="px-1.5 py-0.5 text-[9px] font-mono rounded border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/10 text-[var(--zen-cyan)] font-bold">
                        @{latestEntry.shortSha}
                      </span>
                    )}
                  </div>
                  <h2
                    id="update-log-title"
                    className="text-base sm:text-lg font-semibold tracking-[0.14em] text-[var(--zen-snow)] uppercase truncate"
                    style={{ fontFamily: "var(--font-zen-display, serif)" }}
                  >
                    NOTES &amp; PLATFORM UPDATE LOG
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="min-h-[36px] px-3 py-1 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-xs font-mono text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
                aria-label="Close Update Log"
              >
                ESC {"//"} [x]
              </button>
            </div>

            {/* Category Filter Bar */}
            <div className="px-5 sm:px-6 py-3 border-b border-[var(--zen-border)] bg-[var(--zen-void)] flex flex-wrap items-center justify-between gap-2.5 shrink-0">
              <div
                className="flex flex-wrap items-center gap-2"
                role="tablist"
                aria-label="Filter changelog entries by category"
              >
                {FILTER_TABS.map((tab) => {
                  const isActive = filter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setFilter(tab.id)}
                      className={`min-h-[34px] px-3 py-1 text-xs font-mono tracking-wider rounded border transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)] ${
                        isActive
                          ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-cyan)] font-semibold"
                          : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:border-[var(--zen-cyan)]/50 bg-[var(--zen-card)]"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className="text-[10px] opacity-75">
                        ({categoryCounts[tab.id]})
                      </span>
                    </button>
                  );
                })}
              </div>

              <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase">
                {filteredEntries.length} RECORD
                {filteredEntries.length === 1 ? "" : "S"}
              </span>
            </div>

            {/* Commit Timeline List */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3.5 custom-scrollbar">
              {filteredEntries.length === 0 ? (
                <div className="p-8 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] text-center space-y-3">
                  <p className="text-sm font-semibold text-[var(--zen-snow)]">
                    No changelog records available for this filter.
                  </p>
                  <p className="text-xs text-[var(--zen-ink-muted)] max-w-md mx-auto leading-relaxed">
                    {CHANGELOG_ENTRIES.length === 0
                      ? "Commit history was unavailable during the last offline build. Inspect recent repository commits directly on GitHub."
                      : "Switch back to All to inspect recent notes, simulator workbenches, and platform changes."}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    {filter !== "all" && (
                      <button
                        type="button"
                        onClick={() => setFilter("all")}
                        className="px-3 py-1.5 rounded border border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-cyan)] text-xs font-mono font-semibold"
                      >
                        Show All ({CHANGELOG_ENTRIES.length})
                      </button>
                    )}
                    <a
                      href={REPO_COMMITS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-frost)] text-xs font-mono"
                    >
                      View Commits on GitHub ↗
                    </a>
                  </div>
                </div>
              ) : (
                filteredEntries.map((entry) => {
                  const categoryMeta =
                    CATEGORY_META[entry.category] ?? CATEGORY_META.platform;
                  const rows = buildNoteRows(entry);
                  const addedCount =
                    entry.noteCounts?.added ?? entry.notes?.added?.length ?? 0;
                  const updatedCount =
                    entry.noteCounts?.updated ??
                    entry.notes?.updated?.length ??
                    0;
                  const removedCount =
                    entry.noteCounts?.removed ??
                    entry.notes?.removed?.length ??
                    0;
                  const totalNotes = addedCount + updatedCount + removedCount;
                  const isExpanded = Boolean(expandedCommits[entry.sha]);
                  const visibleRows = isExpanded
                    ? rows
                    : rows.slice(0, MAX_INITIAL_NOTES);
                  const hiddenCount = Math.max(
                    0,
                    totalNotes - visibleRows.length
                  );
                  const hasMoreStored = rows.length > MAX_INITIAL_NOTES;
                  const hasUnstoredDiff = totalNotes > rows.length;
                  const visibleCourses = entry.courses.slice(
                    0,
                    MAX_INLINE_COURSES
                  );
                  const extraCoursesCount = Math.max(
                    0,
                    entry.courses.length - visibleCourses.length
                  );

                  return (
                    <article
                      key={entry.sha}
                      className="p-4 sm:p-5 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-3"
                    >
                      {/* Entry Meta Row */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                          <span
                            className={`px-2 py-0.5 rounded border font-mono text-[10px] uppercase tracking-wider font-semibold ${categoryMeta.badgeClass}`}
                          >
                            {categoryMeta.label}
                          </span>

                          <time
                            dateTime={entry.date}
                            className="px-2 py-0.5 rounded border border-[var(--zen-border)] bg-[var(--zen-void)]/70 text-[10px] font-mono text-[var(--zen-ink-muted)] tabular-nums"
                          >
                            {formatCommitDate(entry.date)}
                          </time>

                          {visibleCourses.map((course) => (
                            <Link
                              key={course}
                              href={`/notes/${encodeURIComponent(course)}`}
                              onClick={onClose}
                              className="px-2 py-0.5 rounded border border-[var(--zen-cyan)]/35 bg-[var(--zen-cyan)]/8 hover:border-[var(--zen-cyan)] hover:bg-[var(--zen-cyan)]/18 font-mono text-[10px] font-semibold text-[var(--zen-cyan)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
                              title={`Open ${course} course directory`}
                            >
                              {course}
                            </Link>
                          ))}

                          {extraCoursesCount > 0 && (
                            <span className="px-2 py-0.5 rounded border border-[var(--zen-border)] bg-[var(--zen-void)]/70 font-mono text-[10px] text-[var(--zen-ink-muted)]">
                              +{extraCoursesCount} courses
                            </span>
                          )}
                        </div>

                        <a
                          href={entry.commitUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-0.5 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] bg-[var(--zen-void)] font-mono text-[10px] text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
                          aria-label={`Inspect commit ${entry.shortSha} on GitHub`}
                          title={`Inspect commit ${entry.shortSha} on GitHub`}
                        >
                          @{entry.shortSha} ↗
                        </a>
                      </div>

                      {/* Commit Title */}
                      <h3 className="text-sm sm:text-[15px] font-semibold text-[var(--zen-snow)] leading-snug break-words">
                        {entry.title}
                      </h3>

                      {/* Affected Notes List */}
                      {totalNotes > 0 && (
                        <div className="pt-2.5 border-t border-[var(--zen-border)]/60 space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
                            <span className="uppercase tracking-wider text-[var(--zen-ink-muted)]">
                              Note Changes
                            </span>
                            <div className="flex flex-wrap items-center gap-2.5">
                              {addedCount > 0 && (
                                <span className="text-[var(--zen-emerald)] font-semibold">
                                  +{addedCount} added
                                </span>
                              )}
                              {updatedCount > 0 && (
                                <span className="text-[var(--zen-cyan)] font-semibold">
                                  ~{updatedCount} updated
                                </span>
                              )}
                              {removedCount > 0 && (
                                <span className="text-[var(--zen-hanko)] font-semibold">
                                  -{removedCount} removed
                                </span>
                              )}
                            </div>
                          </div>

                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {visibleRows.map((item) => {
                              const glyph =
                                item.kind === "added"
                                  ? "+"
                                  : item.kind === "updated"
                                  ? "~"
                                  : "-";
                              const glyphClass =
                                item.kind === "added"
                                  ? "text-[var(--zen-emerald)]"
                                  : item.kind === "updated"
                                  ? "text-[var(--zen-cyan)]"
                                  : "text-[var(--zen-hanko)]";

                              if (item.kind !== "removed" && item.href) {
                                return (
                                  <li key={item.key} className="min-w-0">
                                    <Link
                                      href={item.href}
                                      onClick={onClose}
                                      title={`${item.course} — ${item.title}`}
                                      className="group flex items-center justify-between gap-2 px-2.5 py-1.5 rounded border border-[var(--zen-border)]/80 hover:border-[var(--zen-cyan)] bg-[var(--zen-void)]/65 hover:bg-[var(--zen-void)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
                                    >
                                      <span className="flex items-center gap-1.5 min-w-0">
                                        <span
                                          className={`font-mono text-xs font-bold shrink-0 ${glyphClass}`}
                                          aria-hidden="true"
                                        >
                                          {glyph}
                                        </span>
                                        <span className="px-1.5 py-0.2 rounded border border-[var(--zen-border)] text-[9px] font-mono text-[var(--zen-ink-muted)] shrink-0">
                                          {item.course}
                                        </span>
                                        <span className="text-xs text-[var(--zen-frost)] group-hover:text-[var(--zen-snow)] truncate">
                                          {item.title}
                                        </span>
                                      </span>
                                      <span
                                        className="text-[11px] font-mono text-[var(--zen-ink-muted)] group-hover:text-[var(--zen-cyan)] shrink-0 transition-colors"
                                        aria-hidden="true"
                                      >
                                        →
                                      </span>
                                    </Link>
                                  </li>
                                );
                              }

                              return (
                                <li key={item.key} className="min-w-0">
                                  <div
                                    title={`${item.course} — ${item.title}`}
                                    className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded border border-[var(--zen-border)]/50 bg-[var(--zen-void)]/35 opacity-80"
                                  >
                                    <span className="flex items-center gap-1.5 min-w-0">
                                      <span
                                        className={`font-mono text-xs font-bold shrink-0 ${glyphClass}`}
                                        aria-hidden="true"
                                      >
                                        {glyph}
                                      </span>
                                      <span className="px-1.5 py-0.2 rounded border border-[var(--zen-border)] text-[9px] font-mono text-[var(--zen-ink-muted)] shrink-0">
                                        {item.course}
                                      </span>
                                      <span
                                        className={`text-xs text-[var(--zen-ink-muted)] truncate ${
                                          item.kind === "removed"
                                            ? "line-through"
                                            : ""
                                        }`}
                                      >
                                        {item.title}
                                      </span>
                                    </span>
                                    <span className="text-[9px] font-mono uppercase text-[var(--zen-ink-muted)] shrink-0">
                                      {item.kind === "removed"
                                        ? "DEL"
                                        : "MOVED"}
                                    </span>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>

                          {(hiddenCount > 0 || isExpanded) && (
                            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                              {hasMoreStored ? (
                                <button
                                  type="button"
                                  onClick={() =>
                                    toggleExpandedCommit(entry.sha)
                                  }
                                  className="px-2.5 py-1 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] bg-[var(--zen-void)]/70 text-[11px] font-mono text-[var(--zen-cyan)] hover:text-[var(--zen-snow)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
                                >
                                  {isExpanded
                                    ? "Show fewer notes"
                                    : `+${hiddenCount} more note${
                                        hiddenCount === 1 ? "" : "s"
                                      }`}
                                </button>
                              ) : (
                                <span className="text-[11px] font-mono text-[var(--zen-ink-muted)]">
                                  +{hiddenCount} more note
                                  {hiddenCount === 1 ? "" : "s"}
                                </span>
                              )}

                              {(isExpanded && hasUnstoredDiff) ||
                              (!hasMoreStored && hiddenCount > 0) ? (
                                <a
                                  href={entry.commitUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[11px] font-mono text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] underline underline-offset-4 transition-colors"
                                >
                                  View full diff ({totalNotes} notes) on GitHub ↗
                                </a>
                              ) : null}
                            </div>
                          )}
                        </div>
                      )}
                    </article>
                  );
                })
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
