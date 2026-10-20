"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useStudyPlan } from "./StudyPlanProvider";
import { useTheme, UNIVERSE_REGISTRY } from "./ThemeProvider";
import {
  STUDY_PLAN_TIER_LIST,
  STUDY_PLAN_TIERS,
  computeCourseRoadmap,
} from "@/lib/study-plans";
import { decodeProgressCode } from "@/lib/progress-code";
import { STAR_DOMAINS, type StarDomainId } from "@/lib/course-registry";

export default function ProgressCodeModal() {
  const router = useRouter();
  const { universe, theme, isLite } = useTheme();
  const {
    tier,
    focusCourse,
    completedNotes,
    completedCount,
    lastVisited,
    isSyncModalOpen,
    setSyncModalOpen,
    setTier,
    setFocusCourse,
    exportProgressCode,
    importProgressCode,
    resetProgress,
  } = useStudyPlan();

  const [activeTab, setActiveTab] = useState<"plan" | "sync">("plan");
  const [domainFilter, setDomainFilter] = useState<StarDomainId | "all">("all");
  const [copied, setCopied] = useState(false);
  const [importInput, setImportInput] = useState("");
  const [statusBanner, setStatusBanner] = useState<{
    ok: boolean;
    text: string;
  } | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const liveCode = useMemo(() => {
    if (!isSyncModalOpen) return "";
    return exportProgressCode();
  }, [
    isSyncModalOpen,
    exportProgressCode,
    universe,
    theme,
    isLite,
    tier,
    focusCourse,
    completedNotes,
    lastVisited,
  ]);

  const decodedPreview = useMemo(() => {
    if (!importInput.trim()) return null;
    return decodeProgressCode(importInput);
  }, [importInput]);

  const courseRoadmap = useMemo(
    () => computeCourseRoadmap(completedNotes, tier, domainFilter),
    [completedNotes, tier, domainFilter]
  );

  const totalTargetNotes = useMemo(
    () =>
      computeCourseRoadmap(completedNotes, tier, "all").reduce(
        (acc, c) => acc + c.targetNotesForTier,
        0
      ),
    [completedNotes, tier]
  );

  const overallPercent = useMemo(() => {
    if (totalTargetNotes <= 0) return 0;
    return Math.min(100, Math.round((completedCount / totalTargetNotes) * 100));
  }, [completedCount, totalTargetNotes]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(liveCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API fails
    }
  };

  const handleImport = (mode: "merge" | "overwrite") => {
    const res = importProgressCode(importInput, mode);
    setStatusBanner({ ok: res.ok, text: res.message });
    if (res.ok) {
      setImportInput("");
    }
  };

  const handleJumpToUrl = (url: string) => {
    setSyncModalOpen(false);
    router.push(url);
  };

  const currentUniverseMeta =
    UNIVERSE_REGISTRY[universe] || UNIVERSE_REGISTRY["cyber-zen"];

  return (
    <AnimatePresence>
      {isSyncModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setSyncModalOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Study Plan and Profile Sync"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-4xl max-h-[88vh] flex flex-col bg-[var(--zen-void)] border border-[var(--zen-border)] rounded-xl shadow-2xl overflow-hidden text-[var(--zen-frost)] universe-card"
          >
            {/* Header Bar */}
            <div className="px-6 py-4 border-b border-[var(--zen-border)] bg-[var(--zen-card)] flex items-center justify-between gap-4 shrink-0">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/10 text-[var(--zen-cyan)] font-semibold">
                    STATELESS PROFILE // EG2
                  </span>
                  <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase">
                    ZERO-ACCOUNT PROGRESS ENGINE
                  </span>
                </div>
                <h2
                  className="text-base sm:text-lg font-semibold tracking-[0.18em] text-[var(--zen-snow)] uppercase mt-1"
                  style={{ fontFamily: "var(--font-zen-display, serif)" }}
                >
                  STUDY PLAN &amp; DEVICE SYNC
                </h2>
              </div>

              <button
                onClick={() => setSyncModalOpen(false)}
                className="px-2.5 py-1 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-xs font-mono text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] transition-colors"
                aria-label="Close Study Plan modal"
              >
                ESC // ✕
              </button>
            </div>

            {/* Mode Switcher Tabs + Global Progress Bar */}
            <div className="px-6 py-3 border-b border-[var(--zen-border)] bg-[var(--zen-void)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab("plan")}
                  className={`px-3.5 py-1.5 text-xs font-mono tracking-wider rounded border transition-all ${
                    activeTab === "plan"
                      ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-cyan)] font-semibold"
                      : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] bg-[var(--zen-card)]"
                  }`}
                >
                  STUDY PLANS &amp; CURRICULUM
                </button>
                <button
                  onClick={() => setActiveTab("sync")}
                  className={`px-3.5 py-1.5 text-xs font-mono tracking-wider rounded border transition-all ${
                    activeTab === "sync"
                      ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-cyan)] font-semibold"
                      : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] bg-[var(--zen-card)]"
                  }`}
                >
                  PROFILE CODE (EG2-...)
                </button>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-[var(--zen-ink-muted)]">
                  COMPLETED:{" "}
                  <strong className="text-[var(--zen-snow)]">
                    {completedCount}
                  </strong>{" "}
                  / {totalTargetNotes} ({overallPercent}%)
                </span>
                <div className="w-24 h-2 bg-[var(--zen-card)] border border-[var(--zen-border)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--zen-cyan)] transition-all duration-300"
                    style={{ width: `${overallPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {activeTab === "plan" ? (
                <>
                  {/* Resume Last Visited Monograph Banner */}
                  {lastVisited && (
                    <div className="p-4 rounded-lg border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="min-w-0">
                        <span className="text-[10px] font-mono tracking-widest text-[var(--zen-cyan)] uppercase font-semibold block">
                          LAST VISITED MONOGRAPH{" "}
                          {lastVisited.courseCode
                            ? `// ${lastVisited.courseCode}`
                            : ""}
                        </span>
                        <p className="text-sm font-medium text-[var(--zen-snow)] truncate mt-0.5">
                          {lastVisited.title}
                        </p>
                      </div>
                      <button
                        onClick={() => handleJumpToUrl(lastVisited.url)}
                        className="shrink-0 px-4 py-2 rounded border border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 hover:bg-[var(--zen-cyan)] text-[var(--zen-cyan)] hover:text-[var(--zen-void)] text-xs font-mono tracking-wider font-semibold transition-all"
                      >
                        RESUME READING →
                      </button>
                    </div>
                  )}

                  {/* 3-Tier Study Plan Selector */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-mono tracking-widest uppercase text-[var(--zen-ink-muted)]">
                        1. SELECT STUDY PLAN TIER
                      </h3>
                      <span className="text-[10px] font-mono text-[var(--zen-cyan)]">
                        ACTIVE: {STUDY_PLAN_TIERS[tier].shortLabel}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {STUDY_PLAN_TIER_LIST.map((plan) => {
                        const isSelected = plan.id === tier;
                        return (
                          <button
                            key={plan.id}
                            onClick={() => setTier(plan.id)}
                            className={`text-left p-4 rounded-lg border transition-all flex flex-col justify-between ${
                              isSelected
                                ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/10 shadow-[0_0_15px_rgba(0,229,255,0.15)]"
                                : "border-[var(--zen-border)] bg-[var(--zen-card)] hover:border-[var(--zen-cyan)]/40"
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1.5">
                                <span className="text-[10px] font-mono tracking-wider text-[var(--zen-cyan)] font-semibold">
                                  {plan.badge}
                                </span>
                                {isSelected && (
                                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[var(--zen-cyan)] text-[var(--zen-void)] font-bold">
                                    ACTIVE
                                  </span>
                                )}
                              </div>
                              <h4 className="text-sm font-semibold text-[var(--zen-snow)] mb-1.5">
                                {plan.label}
                              </h4>
                              <p className="text-xs text-[var(--zen-ink-muted)] leading-relaxed">
                                {plan.description}
                              </p>
                            </div>
                            <p className="mt-3 pt-2.5 border-t border-[var(--zen-border)]/50 text-[10px] font-mono text-[var(--zen-frost)]">
                              {plan.filterSummary}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Course Progress & Curriculum Roadmap */}
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <h3 className="text-xs font-mono tracking-widest uppercase text-[var(--zen-ink-muted)]">
                        2. COURSE CURRICULUM PROGRESS ({courseRoadmap.length}{" "}
                        COURSES)
                      </h3>

                      <div className="flex flex-wrap items-center gap-1">
                        {[
                          { id: "all", label: "ALL DOMAINS" },
                          { id: "systems", label: "SYSTEMS" },
                          { id: "theory", label: "THEORY & MATH" },
                          { id: "security", label: "NET & SECURITY" },
                          { id: "software", label: "SOFTWARE & AI" },
                        ].map((d) => (
                          <button
                            key={d.id}
                            onClick={() => setDomainFilter(d.id as any)}
                            className={`px-2 py-0.5 text-[10px] font-mono rounded border transition-all ${
                              domainFilter === d.id
                                ? "border-[var(--zen-cyan)] text-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 font-semibold"
                                : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] bg-[var(--zen-card)]"
                            }`}
                          >
                            {d.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {courseRoadmap.map((c) => {
                        const isFocused = focusCourse === c.code;
                        const domColor =
                          STAR_DOMAINS[c.domain]?.color || "#00E5FF";
                        return (
                          <div
                            key={c.code}
                            className={`p-3.5 rounded-lg border transition-all flex flex-col justify-between ${
                              isFocused
                                ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/10"
                                : "border-[var(--zen-border)] bg-[var(--zen-card)]"
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: domColor }}
                                  />
                                  <span className="text-xs font-mono font-bold text-[var(--zen-snow)]">
                                    {c.code}
                                  </span>
                                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded border border-[var(--zen-border)] text-[var(--zen-ink-muted)]">
                                    {c.track}
                                  </span>
                                </div>
                                <button
                                  onClick={() =>
                                    setFocusCourse(
                                      isFocused ? "ALL" : c.code
                                    )
                                  }
                                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded border transition-colors ${
                                    isFocused
                                      ? "border-[var(--zen-cyan)] text-[var(--zen-cyan)] font-semibold"
                                      : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
                                  }`}
                                >
                                  {isFocused ? "PINNED" : "PIN"}
                                </button>
                              </div>

                              <p className="text-xs text-[var(--zen-frost)] truncate mb-2">
                                {c.name}
                              </p>
                            </div>

                            <div>
                              <div className="flex items-center justify-between text-[10px] font-mono text-[var(--zen-ink-muted)] mb-1">
                                <span>
                                  {c.completedInCourse} / {c.targetNotesForTier}{" "}
                                  NOTES
                                </span>
                                <span className="text-[var(--zen-cyan)] font-semibold">
                                  {c.percent}%
                                </span>
                              </div>
                              <div className="w-full h-1.5 bg-[var(--zen-void)] rounded-full overflow-hidden mb-2.5">
                                <div
                                  className="h-full bg-[var(--zen-cyan)] transition-all duration-300"
                                  style={{ width: `${c.percent}%` }}
                                />
                              </div>

                              <button
                                onClick={() => handleJumpToUrl(c.href)}
                                className="w-full py-1 text-[10px] font-mono tracking-wider uppercase rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-snow)] hover:text-[var(--zen-cyan)] bg-[var(--zen-void)] transition-colors"
                              >
                                OPEN {c.code} →
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Stateless Profile Code Export Section */}
                  <div className="p-5 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono tracking-widest text-[var(--zen-cyan)] uppercase font-semibold">
                          EXPORT PROFILE CODE // VALORANT CROSSHAIR STYLE
                        </span>
                        <h3 className="text-sm font-semibold text-[var(--zen-snow)] mt-0.5">
                          Copy this code to transfer your exact study state to another device
                        </h3>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-mono rounded border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/10 text-[var(--zen-cyan)] shrink-0">
                        CRC16 VERIFIED
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={liveCode}
                        aria-label="Generated EG2 progress code"
                        onClick={(e) => (e.target as HTMLInputElement).select()}
                        className="flex-1 px-3.5 py-2.5 bg-[var(--zen-void)] border border-[var(--zen-border)] rounded font-mono text-xs text-[var(--zen-cyan)] select-all focus:outline-none focus:border-[var(--zen-cyan)]"
                      />
                      <button
                        onClick={handleCopyCode}
                        className="px-5 py-2.5 rounded border border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 hover:bg-[var(--zen-cyan)] text-[var(--zen-cyan)] hover:text-[var(--zen-void)] font-mono text-xs tracking-wider font-semibold transition-all shrink-0"
                      >
                        {copied ? "COPIED TO CLIPBOARD" : "COPY CODE"}
                      </button>
                    </div>

                    {/* Snapshot Summary Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                      <div className="p-2.5 rounded border border-[var(--zen-border)] bg-[var(--zen-void)]">
                        <span className="text-[9px] font-mono text-[var(--zen-ink-muted)] block uppercase">
                          UNIVERSE
                        </span>
                        <span className="text-xs font-mono font-bold text-[var(--zen-snow)]">
                          {currentUniverseMeta.label}
                        </span>
                      </div>
                      <div className="p-2.5 rounded border border-[var(--zen-border)] bg-[var(--zen-void)]">
                        <span className="text-[9px] font-mono text-[var(--zen-ink-muted)] block uppercase">
                          STUDY PLAN TIER
                        </span>
                        <span className="text-xs font-mono font-bold text-[var(--zen-cyan)]">
                          {STUDY_PLAN_TIERS[tier].shortLabel}
                        </span>
                      </div>
                      <div className="p-2.5 rounded border border-[var(--zen-border)] bg-[var(--zen-void)]">
                        <span className="text-[9px] font-mono text-[var(--zen-ink-muted)] block uppercase">
                          COMPLETED NOTES
                        </span>
                        <span className="text-xs font-mono font-bold text-[var(--zen-snow)]">
                          {completedCount} MONOGRAPHS
                        </span>
                      </div>
                      <div className="p-2.5 rounded border border-[var(--zen-border)] bg-[var(--zen-void)]">
                        <span className="text-[9px] font-mono text-[var(--zen-ink-muted)] block uppercase">
                          PINNED COURSE
                        </span>
                        <span className="text-xs font-mono font-bold text-[var(--zen-snow)]">
                          {focusCourse}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Import Code Section */}
                  <div className="p-5 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-4">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[var(--zen-cyan)] uppercase font-semibold">
                        IMPORT PROFILE CODE
                      </span>
                      <h3 className="text-sm font-semibold text-[var(--zen-snow)] mt-0.5">
                        Paste an EG2-... code from another browser or device
                      </h3>
                    </div>

                    <input
                      type="text"
                      value={importInput}
                      onChange={(e) => {
                        setImportInput(e.target.value);
                        setStatusBanner(null);
                      }}
                      placeholder="Paste EG2-CZD0-CORE-ALL-... code here"
                      aria-label="Paste EG2 progress code to import"
                      className="w-full px-3.5 py-2.5 bg-[var(--zen-void)] border border-[var(--zen-border)] rounded font-mono text-xs text-[var(--zen-snow)] placeholder-[var(--zen-ink-muted)] focus:outline-none focus:border-[var(--zen-cyan)]"
                    />

                    {/* Live Decoded Preview */}
                    {decodedPreview && (
                      <div
                        className={`p-3.5 rounded border text-xs font-mono ${
                          decodedPreview.ok
                            ? "border-[var(--zen-cyan)]/50 bg-[var(--zen-cyan)]/10 text-[var(--zen-frost)]"
                            : "border-red-500/50 bg-red-500/10 text-red-300"
                        }`}
                      >
                        {decodedPreview.ok && decodedPreview.snapshot ? (
                          <div className="space-y-1">
                            <div className="font-bold text-[var(--zen-cyan)]">
                              VALID EG2 CODE DETECTED:
                            </div>
                            <div>
                              Universe:{" "}
                              <strong>
                                {decodedPreview.snapshot.universe.toUpperCase()}
                              </strong>{" "}
                              | Tier:{" "}
                              <strong>
                                {decodedPreview.snapshot.tier.toUpperCase()}
                              </strong>{" "}
                              | Completed:{" "}
                              <strong>
                                {decodedPreview.snapshot.completedNotes.length}{" "}
                                notes
                              </strong>
                            </div>
                            {decodedPreview.snapshot.lastVisited && (
                              <div className="truncate">
                                Last Visited:{" "}
                                {decodedPreview.snapshot.lastVisited.title}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>{decodedPreview.error}</div>
                        )}
                      </div>
                    )}

                    {statusBanner && (
                      <div
                        className={`p-3 rounded border text-xs font-mono ${
                          statusBanner.ok
                            ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300"
                            : "border-red-500/50 bg-red-500/10 text-red-300"
                        }`}
                      >
                        {statusBanner.text}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => handleImport("merge")}
                          disabled={!decodedPreview?.ok}
                          className={`px-4 py-2 rounded border font-mono text-xs tracking-wider transition-all ${
                            decodedPreview?.ok
                              ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 hover:bg-[var(--zen-cyan)] text-[var(--zen-cyan)] hover:text-[var(--zen-void)] font-semibold"
                              : "border-[var(--zen-border)]/40 text-[var(--zen-ink-muted)]/40 cursor-not-allowed"
                          }`}
                        >
                          MERGE WITH DEVICE
                        </button>
                        <button
                          onClick={() => handleImport("overwrite")}
                          disabled={!decodedPreview?.ok}
                          className={`px-4 py-2 rounded border font-mono text-xs tracking-wider transition-all ${
                            decodedPreview?.ok
                              ? "border-[var(--zen-border)] hover:border-[var(--zen-cyan)] bg-[var(--zen-void)] text-[var(--zen-snow)] hover:text-[var(--zen-cyan)]"
                              : "border-[var(--zen-border)]/40 text-[var(--zen-ink-muted)]/40 cursor-not-allowed"
                          }`}
                        >
                          OVERWRITE DEVICE &amp; THEME
                        </button>
                      </div>

                      {!confirmReset ? (
                        <button
                          onClick={() => setConfirmReset(true)}
                          className="px-3 py-1.5 rounded border border-red-500/30 hover:border-red-500 text-[10px] font-mono text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          RESET LOCAL PROGRESS
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              resetProgress();
                              setConfirmReset(false);
                              setStatusBanner({
                                ok: true,
                                text: "Local progress has been reset.",
                              });
                            }}
                            className="px-3 py-1.5 rounded border border-red-500 bg-red-500/20 text-[10px] font-mono text-red-300 font-bold"
                          >
                            CONFIRM RESET
                          </button>
                          <button
                            onClick={() => setConfirmReset(false)}
                            className="px-2.5 py-1.5 rounded border border-[var(--zen-border)] text-[10px] font-mono text-[var(--zen-ink-muted)]"
                          >
                            CANCEL
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
