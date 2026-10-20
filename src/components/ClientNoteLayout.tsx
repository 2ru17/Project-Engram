"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouter, usePathname } from "next/navigation";
import DirectoryView from "./DirectoryView";
import { useStudyPlan } from "./StudyPlanProvider";
import { useTheme } from "./ThemeProvider";

interface TocItem {
  text: string;
  depth: number;
  slug: string;
}

interface ClientNoteLayoutProps {
  children: React.ReactNode;
  title: string;
  parentUrl: string;
  toc?: TocItem[];
  lastUpdated?: string | null;
  isMonograph?: boolean;
  courseCode?: string;
}

export default function ClientNoteLayout({
  children,
  title,
  parentUrl,
  toc = [],
  lastUpdated,
  isMonograph = false,
  courseCode,
}: ClientNoteLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTocSlug, setActiveTocSlug] = useState<string>("");
  const {
    isNoteCompleted,
    toggleNoteCompleted,
    markNoteVisited,
    setSyncModalOpen,
  } = useStudyPlan();
  const { universe } = useTheme();

  const decodedPath = decodeURIComponent(pathname || "");
  const completed = isMonograph && decodedPath ? isNoteCompleted(decodedPath) : false;

  // Record last visited monograph for stateless EG2 code and Study Plan resume
  useEffect(() => {
    if (isMonograph && decodedPath && title) {
      markNoteVisited(decodedPath, title, courseCode);
    }
  }, [isMonograph, decodedPath, title, courseCode, markNoteVisited]);

  // Default to closed on mobile/tablets so drawer does not block initial reading
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1536) {
      setIsSidebarOpen(false);
    }
  }, []);

  // Track active heading for TOC scroll-spy
  useEffect(() => {
    if (toc.length === 0) return;

    const handleScroll = () => {
      const headingElements = toc
        .map((item) => document.getElementById(item.slug))
        .filter(Boolean) as HTMLElement[];

      const scrollPosition = window.scrollY + 140;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el.offsetTop <= scrollPosition) {
          setActiveTocSlug(el.id);
          return;
        }
      }
      if (headingElements.length > 0) {
        setActiveTocSlug(headingElements[0].id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  return (
    <div className="min-h-screen bg-[var(--zen-void)] text-[var(--zen-frost)] relative selection:bg-[var(--zen-cyan)]/20 selection:text-[var(--zen-cyan)] transition-colors duration-500">
      {/* Background Subtle Radial Vignette (Cyber-Zen & Parallax only) */}
      {(universe === "cyber-zen" || universe === "parallax") && (
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[radial-gradient(circle_at_50%_15%,var(--zen-cyan)_0%,transparent_60%)]"
          aria-hidden="true"
        />
      )}

      {/* Sub-Header Ribbon: Note Studio Command Strip (Docks right below TopNav at sticky top-[53px]) */}
      <div className="sticky top-[53px] left-0 w-full z-30 px-4 sm:px-8 py-2.5 bg-[var(--zen-void)]/90 backdrop-blur-xl border-b border-[var(--zen-border)] transition-colors duration-500">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          {/* Left: Return & Module Trigger */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => router.push("/notes?view=directory")}
              className="group shrink-0 flex items-center gap-2 px-3 py-1.5 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] bg-[var(--zen-card)] hover:bg-[var(--zen-card-hover)] transition-all text-xs font-mono text-[var(--zen-frost)]"
              title="Return to Archival Catalog"
            >
              <svg
                className="w-3.5 h-3.5 text-[var(--zen-ink-muted)] group-hover:text-[var(--zen-cyan)] transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline tracking-wider">ARCHIVE</span>
            </button>

            {/* Collapsible Explorer Toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded border text-xs font-mono tracking-wider transition-all ${
                isSidebarOpen
                  ? "border-[var(--zen-cyan)] text-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 font-semibold"
                  : "border-[var(--zen-border)] text-[var(--zen-frost)] hover:border-[var(--zen-cyan)] hover:text-[var(--zen-cyan)] bg-[var(--zen-card)]"
              }`}
              title={isSidebarOpen ? "Collapse Explorer (Hide Sidebar)" : "Expand Explorer (Show Sidebar)"}
              aria-label="Toggle explorer sidebar"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="9" y1="3" x2="9" y2="21" />
              </svg>
              <span>{isSidebarOpen ? "HIDE EXPLORER" : "EXPLORER"}</span>
              {universe === "cyber-zen" && (
                <span className="text-[10px] text-[var(--zen-ink-muted)] font-serif">目録</span>
              )}
            </button>

            {/* Note Title & Badge */}
            <div className="flex items-center gap-3 pl-3 border-l border-[var(--zen-border)] min-w-0 truncate">
              <span className="hidden md:inline px-1.5 py-0.5 text-[9px] font-mono tracking-widest text-[var(--zen-cyan)] border border-[var(--zen-cyan)]/30 bg-[var(--zen-cyan)]/5 uppercase shrink-0 font-semibold">
                MONOGRAPH
              </span>
              <h1
                className="text-xs sm:text-sm font-semibold tracking-wider text-[var(--zen-snow)] truncate"
                style={{ fontFamily: "var(--font-zen-display, var(--font-wuxia-primary, serif))" }}
              >
                {title.toUpperCase()}
              </h1>
            </div>
          </div>

          {/* Right: Completion Toggle, Sync Trigger & Date */}
          <div className="flex items-center gap-2.5 shrink-0">
            {isMonograph && decodedPath && (
              <button
                onClick={() => toggleNoteCompleted(decodedPath, title)}
                className={`px-2.5 py-1 rounded border text-[10px] font-mono tracking-wider uppercase transition-all ${
                  completed
                    ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)] text-[var(--zen-void)] font-bold"
                    : "border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-frost)] hover:text-[var(--zen-cyan)] bg-[var(--zen-card)]"
                }`}
                title="Toggle completion status in your Study Plan"
              >
                {completed ? "[x] COMPLETED" : "[ ] MARK COMPLETE"}
              </button>
            )}

            <button
              onClick={() => setSyncModalOpen(true)}
              className="hidden md:inline-flex px-2.5 py-1 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] bg-[var(--zen-card)] text-[10px] font-mono tracking-wider text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] transition-colors uppercase"
              title="Open Study Plan and EG2 Sync Code"
            >
              STUDY PLAN
            </button>

            {lastUpdated && (
              <div className="hidden lg:flex items-center gap-2 text-[10px] font-mono text-[var(--zen-ink-muted)] pl-2 border-l border-[var(--zen-border)]">
                <span>COMPILED:</span>
                <span className="text-[var(--zen-frost)] font-semibold">
                  {lastUpdated}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Slide-out Mobile & Tablet Drawer (Only active below 2xl) */}
      <AnimatePresence>
        {isSidebarOpen && (
          <div className="2xl:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 w-full sm:w-96 h-full bg-[var(--zen-void)] border-r border-[var(--zen-border)] shadow-2xl z-50 pt-20 px-4 pb-6 flex flex-col"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--zen-border)] shrink-0">
                <div className="flex items-center gap-2.5">
                  <span className="text-[var(--zen-cyan)] text-sm">◇</span>
                  <div>
                    <h2
                      className="text-sm font-semibold tracking-widest text-[var(--zen-snow)] uppercase"
                      style={{ fontFamily: "var(--font-zen-display, serif)" }}
                    >
                      VAULT EXPLORER
                    </h2>
                    <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] tracking-wider">
                      {universe === "cyber-zen" ? "CURRICULAR DIRECTORY // 目録" : "CURRICULAR DIRECTORY"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-7 h-7 rounded flex items-center justify-center border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] transition-colors text-xs font-mono"
                  aria-label="Close Explorer"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <DirectoryView />
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main Reading Studio Layout: 3-Column Architecture */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 py-8 lg:py-12 relative z-10 flex gap-8 justify-center">
        {/* Left Rail: Desktop Docked Explorer (Fully collapsible on 2xl+ screens) */}
        <AnimatePresence initial={false}>
          {isSidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "18rem", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="hidden 2xl:flex w-72 shrink-0 self-start sticky top-[110px] h-[calc(100vh-140px)] p-4 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] backdrop-blur-xl shadow-xl flex-col overflow-hidden"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[var(--zen-border)] shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-[var(--zen-cyan)] text-xs shrink-0">◇</span>
                  <span
                    className="text-xs font-semibold tracking-wider text-[var(--zen-snow)] uppercase truncate"
                    style={{ fontFamily: "var(--font-zen-display, serif)" }}
                  >
                    VAULT EXPLORER
                  </span>
                  {universe === "cyber-zen" && (
                    <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase shrink-0">目録</span>
                  )}
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-6 h-6 rounded flex items-center justify-center border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] transition-colors text-xs font-mono shrink-0 ml-2"
                  title="Collapse Explorer"
                  aria-label="Collapse explorer sidebar"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <DirectoryView />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Center Column: Reading Canvas */}
        <main className="w-full max-w-3xl min-w-0 transition-all duration-300">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {children}

            {isMonograph && decodedPath && (
              <div className="mt-12 pt-6 border-t border-[var(--zen-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-ink-muted)] block">
                    STUDY PROGRESS TRACKER
                  </span>
                  <p className="text-xs text-[var(--zen-frost)] mt-0.5">
                    {completed
                      ? "This monograph is recorded as completed in your local profile and EG2 sync code."
                      : "Finished reviewing this monograph? Mark it complete to update your study plan progress."}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleNoteCompleted(decodedPath, title)}
                    className={`px-4 py-2 rounded border text-xs font-mono tracking-wider uppercase transition-all ${
                      completed
                        ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)] text-[var(--zen-void)] font-bold"
                        : "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/10 hover:bg-[var(--zen-cyan)]/20 text-[var(--zen-cyan)] font-semibold"
                    }`}
                  >
                    {completed ? "[x] COMPLETED" : "MARK AS COMPLETED"}
                  </button>
                  <button
                    onClick={() => setSyncModalOpen(true)}
                    className="px-3 py-2 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] bg-[var(--zen-card)] text-xs font-mono tracking-wider text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] transition-colors"
                  >
                    EG2 CODE
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </main>

        {/* Right Rail: Table of Contents & Navigation */}
        {toc.length > 0 && (
          <aside className="hidden xl:block w-64 shrink-0 pl-4 self-start sticky top-[110px] max-h-[calc(100vh-140px)] overflow-y-auto custom-scrollbar">
            <div className="border-l border-[var(--zen-border)] pl-4 py-1">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-[var(--zen-border)]/50">
                <span
                  className="text-xs font-semibold tracking-[0.2em] text-[var(--zen-cyan)] uppercase"
                  style={{ fontFamily: "var(--font-zen-display, serif)" }}
                >
                  OUTLINE
                </span>
                <span className="text-[10px] font-mono text-[var(--zen-ink-muted)]">
                  {universe === "cyber-zen" ? `目次 · ${toc.length} SECTIONS` : `${toc.length} SECTIONS`}
                </span>
              </div>
              <nav className="space-y-2.5" aria-label="Table of contents">
                {toc.map((heading, i) => {
                  const isActive = activeTocSlug === heading.slug;
                  return (
                    <div
                      key={i}
                      className="truncate"
                      style={{ paddingLeft: `${(heading.depth - 1) * 0.6}rem` }}
                    >
                      <a
                        href={`#${heading.slug}`}
                        className={`text-xs block truncate transition-colors duration-200 ${
                          isActive
                            ? "text-[var(--zen-cyan)] font-semibold"
                            : "text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
                        }`}
                        title={heading.text}
                      >
                        {heading.text}
                      </a>
                    </div>
                  );
                })}
              </nav>

              {/* Jump to top helper */}
              <div className="mt-8 pt-4 border-t border-[var(--zen-border)]">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] transition-colors"
                >
                  <span>↑</span>
                  <span>RETURN TO TOP</span>
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
