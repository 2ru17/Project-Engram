"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CHANGELOG_ENTRIES,
  LATEST_CHANGELOG_VERSION,
  type ChangelogCategory,
} from "@/data/changelog";

interface UpdateLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMarkSeen?: () => void;
}

const REPO_COMMIT_BASE = "https://github.com/2ru17/Project-Engram/commit";

const FILTER_TABS: { id: "All" | ChangelogCategory; label: string }[] = [
  { id: "All", label: "ALL" },
  { id: "System", label: "SYSTEM" },
  { id: "Simulators", label: "SIMULATORS" },
  { id: "Notes", label: "NOTES" },
];

function getCategoryStyle(category: ChangelogCategory): string {
  switch (category) {
    case "Notes":
      return "border-emerald-500/40 bg-emerald-500/10 text-emerald-400";
    case "Simulators":
      return "border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/10 text-[var(--zen-cyan)]";
    case "System":
      return "border-amber-500/40 bg-amber-500/10 text-amber-400";
  }
}

export default function UpdateLogModal({
  isOpen,
  onClose,
  onMarkSeen,
}: UpdateLogModalProps) {
  const [filter, setFilter] = useState<"All" | ChangelogCategory>("All");

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
    const counts: Record<"All" | ChangelogCategory, number> = {
      All: CHANGELOG_ENTRIES.length,
      System: 0,
      Simulators: 0,
      Notes: 0,
    };
    for (const entry of CHANGELOG_ENTRIES) {
      counts[entry.category]++;
    }
    return counts;
  }, []);

  const filteredEntries = useMemo(() => {
    if (filter === "All") return CHANGELOG_ENTRIES;
    return CHANGELOG_ENTRIES.filter((entry) => entry.category === filter);
  }, [filter]);

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
            <div className="px-6 py-4 border-b border-[var(--zen-border)] bg-[var(--zen-card)] flex items-center justify-between gap-4 shrink-0">
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
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
                      ARCHIVAL RELEASE STREAM
                    </span>
                    <span className="px-1.5 py-0.5 text-[9px] font-mono rounded border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/10 text-[var(--zen-cyan)] font-bold">
                      v{LATEST_CHANGELOG_VERSION}
                    </span>
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
                className="min-h-[36px] px-3 py-1 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-xs font-mono text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
                aria-label="Close Update Log"
              >
                ESC {"//"} [x]
              </button>
            </div>

            <div className="px-6 py-3 border-b border-[var(--zen-border)] bg-[var(--zen-void)] flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div
                className="flex flex-wrap items-center gap-2"
                role="tablist"
                aria-label="Filter updates by category"
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
                          : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] bg-[var(--zen-card)]"
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
                CHRONOLOGICAL ARCHIVE
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {filteredEntries.map((entry) => (
                <article
                  key={entry.version}
                  className="p-5 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[var(--zen-void)] border border-[var(--zen-border)] font-mono text-xs font-bold text-[var(--zen-snow)]">
                        v{entry.version}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded border font-mono text-[10px] uppercase tracking-wider font-semibold ${getCategoryStyle(
                          entry.category
                        )}`}
                      >
                        {entry.category}
                      </span>
                      {entry.pr && (
                        <span className="px-2 py-0.5 rounded border border-[var(--zen-border)] bg-[var(--zen-void)] font-mono text-[10px] text-[var(--zen-frost)]">
                          {entry.pr}
                        </span>
                      )}
                      {entry.commit && (
                        <a
                          href={`${REPO_COMMIT_BASE}/${entry.commit}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2 py-0.5 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] bg-[var(--zen-void)] font-mono text-[10px] text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
                          title={`Inspect commit ${entry.commit} on GitHub`}
                        >
                          @{entry.commit} ↗
                        </a>
                      )}
                    </div>
                    <time
                      dateTime={entry.date}
                      className="text-[11px] font-mono text-[var(--zen-ink-muted)]"
                    >
                      {entry.date}
                    </time>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-[var(--zen-snow)]">
                      {entry.title}
                    </h3>
                    <p className="text-xs text-[var(--zen-ink-muted)] mt-1 leading-relaxed">
                      {entry.summary}
                    </p>
                  </div>

                  <ul className="space-y-1.5 pt-2 border-t border-[var(--zen-border)]/50">
                    {entry.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs text-[var(--zen-frost)] leading-relaxed"
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rotate-45 bg-[var(--zen-cyan)] shrink-0"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
