"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { TOTAL_COURSE_COUNT, TOTAL_MONOGRAPH_COUNT } from "@/lib/course-registry";
import { TOTAL_SIMULATOR_COUNT } from "@/lib/simulator-registry";

interface ContributeHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type HelpTab = "overview" | "contribute" | "issues" | "license";

const REPO_URL = "https://github.com/2ru17/Project-Engram";

export default function ContributeHelpModal({
  isOpen,
  onClose,
}: ContributeHelpModalProps) {
  const [activeTab, setActiveTab] = useState<HelpTab>("overview");

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
            aria-labelledby="contribute-hub-title"
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
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold block">
                    OPEN-SOURCE COMMUNITY &amp; GOVERNANCE HUB
                  </span>
                  <h2
                    id="contribute-hub-title"
                    className="text-base sm:text-lg font-semibold tracking-[0.14em] text-[var(--zen-snow)] uppercase truncate"
                    style={{ fontFamily: "var(--font-zen-display, serif)" }}
                  >
                    GITHUB, CONTRIBUTION &amp; LICENSE
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="min-h-[36px] px-3 py-1 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-xs font-mono text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
                aria-label="Close Community and Help Hub"
              >
                ESC // [x]
              </button>
            </div>

            <div className="px-6 py-3 border-b border-[var(--zen-border)] bg-[var(--zen-void)] flex flex-wrap items-center gap-2 shrink-0">
              {(
                [
                  { id: "overview", label: "REPOSITORY & DISCUSSIONS" },
                  { id: "contribute", label: "HOW TO CONTRIBUTE" },
                  { id: "issues", label: "REPORT BUG / ERRATA" },
                  { id: "license", label: "MIT LICENSE & LEGAL" },
                ] as { id: HelpTab; label: string }[]
              ).map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`min-h-[34px] px-3 py-1 text-xs font-mono tracking-wider rounded border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)] ${
                      isActive
                        ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-cyan)] font-semibold"
                        : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] bg-[var(--zen-card)]"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5 custom-scrollbar">
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <div className="p-5 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--zen-cyan)] font-semibold block">
                          UPSTREAM SOURCE REPOSITORY
                        </span>
                        <h3 className="text-base font-semibold text-[var(--zen-snow)] mt-0.5">
                          2ru17 / Project-Engram
                        </h3>
                      </div>
                      <a
                        href={REPO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 hover:bg-[var(--zen-cyan)] text-[var(--zen-cyan)] hover:text-[var(--zen-void)] font-mono text-xs font-semibold tracking-wider transition-all"
                      >
                        <span>VIEW ON GITHUB</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--zen-ink-muted)] leading-relaxed">
                      Built with Next.js 16 App Router, React 19, Tailwind CSS, Unified/Remark/KaTeX, and Mermaid. Contains {TOTAL_COURSE_COUNT} Computer Science courses, {TOTAL_MONOGRAPH_COUNT} structured monographs, a force-directed Obsidian-style knowledge graph, and {TOTAL_SIMULATOR_COUNT} interactive simulators.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--zen-cyan)] font-semibold block">
                        GITHUB DISCUSSIONS
                      </span>
                      <h4 className="text-sm font-semibold text-[var(--zen-snow)]">
                        Course Q&amp;A, Topic Requests &amp; Study Resources
                      </h4>
                      <p className="text-xs text-[var(--zen-ink-muted)] leading-relaxed">
                        Ask questions about derivations, request coverage for new Computer Science subjects, or share study strategies with peers.
                      </p>
                    </div>
                    <a
                      href={`${REPO_URL}/discussions`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] bg-[var(--zen-void)] text-[var(--zen-snow)] hover:text-[var(--zen-cyan)] font-mono text-xs font-semibold tracking-wider transition-colors"
                    >
                      OPEN DISCUSSIONS ↗
                    </a>
                  </div>
                </div>
              )}

              {activeTab === "contribute" && (
                <div className="space-y-4">
                  <div className="p-5 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--zen-cyan)] font-semibold block">
                        CONTRIBUTION WORKFLOW
                      </span>
                      <h3 className="text-sm font-semibold text-[var(--zen-snow)] mt-0.5">
                        Fix Note Errata, Add Simulator Presets, or Improve UI Components
                      </h3>
                    </div>

                    <ol className="space-y-3 text-xs text-[var(--zen-frost)]">
                      {[
                        {
                          step: "01 // FORK & CLONE",
                          detail:
                            "Fork 2ru17/Project-Engram on GitHub and clone your fork locally, then install dependencies with npm ci.",
                        },
                        {
                          step: "02 // BRANCH",
                          detail:
                            "Create a descriptive branch from main (e.g., fix/csarch2-errata or feat/pipeline-preset).",
                        },
                        {
                          step: "03 // VALIDATE LOCALLY",
                          detail:
                            "Run npm run validate:notes, npm run typecheck, npm run lint, and npm run build before pushing.",
                        },
                        {
                          step: "04 // PULL REQUEST",
                          detail:
                            "Push your branch and open a Pull Request summarizing affected courses, simulators, or components.",
                        },
                      ].map((item) => (
                        <li
                          key={item.step}
                          className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/70"
                        >
                          <span className="font-mono text-[10px] text-[var(--zen-cyan)] font-bold block mb-1">
                            {item.step}
                          </span>
                          <span className="leading-relaxed">{item.detail}</span>
                        </li>
                      ))}
                    </ol>

                    <a
                      href={`${REPO_URL}/blob/main/CONTRIBUTING.md`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--zen-cyan)]/50 hover:border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/10 text-[var(--zen-cyan)] font-mono text-xs font-semibold transition-all"
                    >
                      READ FULL CONTRIBUTING.MD ↗
                    </a>
                  </div>
                </div>
              )}

              {activeTab === "issues" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <a
                    href={`${REPO_URL}/issues/new?labels=bug&template=bug_report.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl border border-[var(--zen-border)] hover:border-rose-400 bg-[var(--zen-card)] flex flex-col justify-between gap-4 transition-colors group"
                  >
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-semibold block">
                        BUG REPORT
                      </span>
                      <h3 className="text-sm font-semibold text-[var(--zen-snow)] group-hover:text-rose-300">
                        UI or Simulator Defect
                      </h3>
                      <p className="text-xs text-[var(--zen-ink-muted)] leading-relaxed">
                        Report broken KaTeX equations, rendering glitches, or incorrect simulator state calculations.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-rose-400">
                      OPEN BUG ISSUE ↗
                    </span>
                  </a>

                  <a
                    href={`${REPO_URL}/issues/new?labels=errata,documentation&template=note_errata.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl border border-[var(--zen-border)] hover:border-amber-400 bg-[var(--zen-card)] flex flex-col justify-between gap-4 transition-colors group"
                  >
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold block">
                        NOTE ERRATA
                      </span>
                      <h3 className="text-sm font-semibold text-[var(--zen-snow)] group-hover:text-amber-300">
                        Typo or Formula Correction
                      </h3>
                      <p className="text-xs text-[var(--zen-ink-muted)] leading-relaxed">
                        Flag a mathematical sign error, outdated protocol reference, or typo in a course monograph.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-amber-400">
                      SUBMIT ERRATA ↗
                    </span>
                  </a>

                  <a
                    href={`${REPO_URL}/issues/new?labels=enhancement&template=feature_request.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] bg-[var(--zen-card)] flex flex-col justify-between gap-4 transition-colors group"
                  >
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--zen-cyan)] font-semibold block">
                        FEATURE REQUEST
                      </span>
                      <h3 className="text-sm font-semibold text-[var(--zen-snow)] group-hover:text-[var(--zen-cyan)]">
                        New Workbench or Tool
                      </h3>
                      <p className="text-xs text-[var(--zen-ink-muted)] leading-relaxed">
                        Propose a new interactive simulator preset, accessibility upgrade, or export capability.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-[var(--zen-cyan)]">
                      PROPOSE FEATURE ↗
                    </span>
                  </a>
                </div>
              )}

              {activeTab === "license" && (
                <div className="space-y-4">
                  <div className="p-5 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--zen-cyan)] font-semibold block">
                      MIT OPEN-SOURCE LICENSE
                    </span>
                    <h3 className="text-sm font-semibold text-[var(--zen-snow)]">
                      Permissive Educational &amp; Engineering Use
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--zen-ink-muted)] leading-relaxed">
                      Project Engram is licensed under the MIT License. You may freely use, copy, modify, merge, publish, and distribute the codebase provided the original copyright and permission notice appear in all copies. Please attribute Project Engram (github.com/2ru17/Project-Engram) when referencing original simulator modules or architectural documentation.
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <a
                        href={`${REPO_URL}/blob/main/LICENSE`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded border border-[var(--zen-cyan)]/50 bg-[var(--zen-cyan)]/10 text-[var(--zen-cyan)] font-mono text-xs font-semibold hover:bg-[var(--zen-cyan)] hover:text-[var(--zen-void)] transition-all"
                      >
                        VIEW LICENSE FILE ↗
                      </a>
                      <Link
                        href="/terms"
                        onClick={onClose}
                        className="px-3.5 py-1.5 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-frost)] font-mono text-xs"
                      >
                        TERMS OF SERVICE
                      </Link>
                      <Link
                        href="/privacy"
                        onClick={onClose}
                        className="px-3.5 py-1.5 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-frost)] font-mono text-xs"
                      >
                        PRIVACY POLICY
                      </Link>
                      <Link
                        href="/cookies"
                        onClick={onClose}
                        className="px-3.5 py-1.5 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-frost)] font-mono text-xs"
                      >
                        COOKIE POLICY
                      </Link>
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
