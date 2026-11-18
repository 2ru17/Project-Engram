"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

interface FeatureGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSyncModal?: () => void;
}

type GuideTab = "notes" | "simulators" | "shortcuts";

const GUIDE_TABS: { id: GuideTab; label: string; code: string }[] = [
  { id: "notes", label: "COURSE NOTES & READER", code: "01" },
  { id: "simulators", label: "SIMULATOR WORKBENCHES", code: "02" },
  { id: "shortcuts", label: "SHORTCUTS & UNIVERSES", code: "03" },
];

export default function FeatureGuideModal({
  isOpen,
  onClose,
  onOpenSyncModal,
}: FeatureGuideModalProps) {
  const [activeTab, setActiveTab] = useState<GuideTab>("notes");

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
            aria-labelledby="feature-guide-title"
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
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold block">
                    PLATFORM ORIENTATION // FEATURE GUIDE
                  </span>
                  <h2
                    id="feature-guide-title"
                    className="text-base sm:text-lg font-semibold tracking-[0.14em] text-[var(--zen-snow)] uppercase truncate"
                    style={{ fontFamily: "var(--font-zen-display, serif)" }}
                  >
                    PROJECT ENGRAM WORKFLOW GUIDE
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="min-h-[36px] px-3 py-1 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-xs font-mono text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
                aria-label="Close Feature Guide"
              >
                ESC // [x]
              </button>
            </div>

            <div className="px-6 py-3 border-b border-[var(--zen-border)] bg-[var(--zen-void)] flex flex-wrap items-center gap-2 shrink-0">
              {GUIDE_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`min-h-[36px] px-3.5 py-1.5 text-xs font-mono tracking-wider rounded border transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)] ${
                      isActive
                        ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-cyan)] font-semibold"
                        : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] bg-[var(--zen-card)]"
                    }`}
                  >
                    <span className="text-[10px] opacity-70">{tab.code}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
              {activeTab === "notes" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--zen-cyan)] font-semibold">
                        01 // DUAL NAVIGATION MODES
                      </span>
                      <h3 className="text-sm font-semibold text-[var(--zen-snow)]">
                        Knowledge Graph &amp; Curricular Directory
                      </h3>
                      <p className="text-xs text-[var(--zen-ink-muted)] leading-relaxed">
                        Switch seamlessly between the interactive force-directed topology (<code className="text-[var(--zen-cyan)]">/notes?view=graph</code>) and the hierarchical module directory (<code className="text-[var(--zen-cyan)]">/notes?view=directory</code>) covering 26 courses and 559 monographs.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--zen-cyan)] font-semibold">
                        02 // INTERACTIVE ASSESSMENTS
                      </span>
                      <h3 className="text-sm font-semibold text-[var(--zen-snow)]">
                        Auto-Graded Drills at Note End
                      </h3>
                      <p className="text-xs text-[var(--zen-ink-muted)] leading-relaxed">
                        Standard lecture monographs and reviewers include instant-feedback drills supporting single-choice MCQs, multi-select checkboxes (<code className="text-[var(--zen-cyan)]">[MSQ]</code>), numeric/complexity inputs (<code className="text-[var(--zen-cyan)]">[INPUT]</code>), and table fill-in-the-blanks (<code className="text-[var(--zen-cyan)]">[BLANK]</code>).
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--zen-cyan)] font-semibold">
                        03 // DUAL EXPORT &amp; CODE BLOCKS
                      </span>
                      <h3 className="text-sm font-semibold text-[var(--zen-snow)]">
                        Copyable Blocks, Gantt &amp; Ink-Saver PDF
                      </h3>
                      <p className="text-xs text-[var(--zen-ink-muted)] leading-relaxed">
                        Every code block features one-click copy and corner brackets. Use the reader toolbar&apos;s Export menu to print or save monographs as either Dark Cyber-Zen or Academic Ink-Saver paper PDFs.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--zen-cyan)] font-semibold">
                        04 // STATELESS EG2 SYNC
                      </span>
                      <h3 className="text-sm font-semibold text-[var(--zen-snow)]">
                        Zero-Account Progress Portability
                      </h3>
                      <p className="text-xs text-[var(--zen-ink-muted)] leading-relaxed">
                        Mark monographs complete as you study, choose a study tier (Full, Core, or Cram), and export a CRC16-verified <code className="text-[var(--zen-cyan)]">EG2-...</code> snapshot string to resume on any device.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link
                      href="/notes?view=graph"
                      onClick={onClose}
                      className="px-4 py-2 rounded-lg border border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 hover:bg-[var(--zen-cyan)] text-[var(--zen-cyan)] hover:text-[var(--zen-void)] font-mono text-xs font-semibold tracking-wider transition-all"
                    >
                      OPEN KNOWLEDGE GRAPH →
                    </Link>
                    <Link
                      href="/notes?view=directory"
                      onClick={onClose}
                      className="px-4 py-2 rounded-lg border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] bg-[var(--zen-card)] text-[var(--zen-snow)] hover:text-[var(--zen-cyan)] font-mono text-xs tracking-wider transition-all"
                    >
                      BROWSE DIRECTORY →
                    </Link>
                    {onOpenSyncModal && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenSyncModal();
                        }}
                        className="px-4 py-2 rounded-lg border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] bg-[var(--zen-card)] text-[var(--zen-frost)] hover:text-[var(--zen-cyan)] font-mono text-xs tracking-wider transition-all"
                      >
                        OPEN EG2 SYNC →
                      </button>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "simulators" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-[var(--zen-cyan)]/30 bg-[var(--zen-cyan)]/5 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--zen-cyan)] font-semibold">
                      29 INTERACTIVE ENGINEERING WORKBENCHES
                    </span>
                    <p className="text-xs sm:text-sm text-[var(--zen-frost)] leading-relaxed">
                      Every simulator is mapped directly to its parent courses across Systems, Architecture, Networks, Security, Algorithms, and Electronics. You can launch them from the dedicated studio (<code className="text-[var(--zen-cyan)]">/simulators</code>) or inline inside lecture notes.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-1.5">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--zen-cyan)] font-semibold">
                        1. DOMAIN &amp; COURSE FILTERING
                      </h3>
                      <p className="text-xs text-[var(--zen-ink-muted)] leading-relaxed">
                        Filter the simulator catalog by domain pill, exact course code dropdown (e.g., <code className="text-[var(--zen-snow)]">CSARCH2</code>, <code className="text-[var(--zen-snow)]">NSETRON</code>), or keyword search. Press <kbd className="px-1.5 py-0.5 rounded border border-[var(--zen-border)] bg-[var(--zen-void)] font-mono text-[10px]">/</kbd> on the simulator page to jump straight to search.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-1.5">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--zen-cyan)] font-semibold">
                        2. SCENARIO PRESETS &amp; MODES
                      </h3>
                      <p className="text-xs text-[var(--zen-ink-muted)] leading-relaxed">
                        Load curated edge-case presets (such as Load-Use Pipeline Stalls, Belady&apos;s Anomaly, TCP Reno 3x DupACK, or Weak No-Mix SPN Ciphers) or toggle custom register/parameter inputs.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-1.5">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--zen-cyan)] font-semibold">
                        3. EXECUTION STEPPING &amp; SPEED
                      </h3>
                      <p className="text-xs text-[var(--zen-ink-muted)] leading-relaxed">
                        Use Play/Pause, Step Forward, Step Back, Reset, and speed multipliers (<code className="text-[var(--zen-snow)]">0.5x</code> to <code className="text-[var(--zen-snow)]">2x</code>) to inspect individual clock cycles, packet RTTs, or algorithm iterations.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-1.5">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--zen-cyan)] font-semibold">
                        4. LIVE TELEMETRY &amp; INVARIANTS
                      </h3>
                      <p className="text-xs text-[var(--zen-ink-muted)] leading-relaxed">
                        Inspect live registers, Hamming diffusion percentages, queue states, and KaTeX mathematical invariants rendered directly beneath each workbench stage.
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/simulators"
                      onClick={onClose}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 hover:bg-[var(--zen-cyan)] text-[var(--zen-cyan)] hover:text-[var(--zen-void)] font-mono text-xs font-semibold tracking-wider transition-all"
                    >
                      LAUNCH SIMULATOR STUDIO →
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "shortcuts" && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-[var(--zen-border)] bg-[var(--zen-void)]/70 text-[10px] font-mono uppercase tracking-widest text-[var(--zen-cyan)] font-semibold">
                      KEYBOARD ERGONOMICS &amp; SHORTCUTS
                    </div>
                    <div className="divide-y divide-[var(--zen-border)]/50 text-xs font-mono">
                      {[
                        {
                          keys: "ESC",
                          action:
                            "Close active utility modals, Study Plan Sync dialog, dropdown menus, or mobile drawers.",
                        },
                        {
                          keys: "/",
                          action:
                            "Focus quick search filter inside Simulator Studio.",
                        },
                        {
                          keys: "TAB / SHIFT + TAB",
                          action:
                            "Navigate all header triggers, simulator controls, and assessment items with visible focus rings.",
                        },
                        {
                          keys: "ENTER / SPACE",
                          action:
                            "Activate buttons, switch universes, or submit quick diagnostic searches.",
                        },
                      ].map((row) => (
                        <div
                          key={row.keys}
                          className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        >
                          <kbd className="inline-block w-fit px-2 py-0.5 rounded border border-[var(--zen-cyan)]/40 bg-[var(--zen-void)] text-[var(--zen-cyan)] font-bold text-[11px]">
                            {row.keys}
                          </kbd>
                          <span className="text-[var(--zen-frost)] sm:text-right font-sans">
                            {row.action}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--zen-cyan)] font-semibold">
                        5-UNIVERSE ENGINE
                      </span>
                      <p className="text-xs text-[var(--zen-ink-muted)] leading-relaxed">
                        Use the top navbar universe selector to warp between <strong className="text-[var(--zen-snow)]">Cyber-Zen</strong> (supports Dark/Light polarity), <strong className="text-[var(--zen-snow)]">Neo-Brutalism</strong>, <strong className="text-[var(--zen-snow)]">Minimalism</strong>, <strong className="text-[var(--zen-snow)]">Parallax</strong>, and <strong className="text-[var(--zen-snow)]">Broken-Grid</strong> (with a 2.0s anti-spam cooldown).
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--zen-cyan)] font-semibold">
                        FULL VS LITE PERFORMANCE MODE
                      </span>
                      <p className="text-xs text-[var(--zen-ink-muted)] leading-relaxed">
                        Toggle <code className="text-[var(--zen-cyan)]">FULL</code> / <code className="text-amber-400">LITE</code> in the navbar to disable heavy ambient canvas particles and blur layers on battery-saving or low-memory systems.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
