"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import DirectoryView from "@/components/DirectoryView";

const ObsidianGraph = dynamic(() => import("@/components/ObsidianGraph"), { ssr: false });

function NotesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryView = searchParams.get("view");

  const [viewMode, setViewMode] = useState<"graph" | "directory">(
    queryView === "directory" ? "directory" : "graph"
  );

  useEffect(() => {
    if (queryView === "directory" || queryView === "graph") {
      setViewMode(queryView);
    }
  }, [queryView]);

  const handleToggle = (mode: "graph" | "directory") => {
    setViewMode(mode);
    router.replace(`/notes?view=${mode}`, { scroll: false });
  };

  return (
    <div className="h-screen w-full relative overflow-hidden bg-[var(--zen-void)] select-none text-[var(--zen-frost)] flex flex-col transition-colors duration-500">
      {/* Dynamic Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[radial-gradient(circle_at_50%_15%,var(--zen-cyan)_0%,transparent_60%)]"
        aria-hidden="true"
      />

      {/* Sub-Header Ribbon: Upper Segmented Control Deck (Right below TopNav at sticky top-[53px]) */}
      <header className="relative z-30 w-full px-4 sm:px-8 py-3 bg-[var(--zen-void)]/90 backdrop-blur-xl border-b border-[var(--zen-border)] flex items-center justify-between gap-4 transition-colors duration-500">
        {/* Title & Telemetry */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/10 grid place-items-center text-[var(--zen-cyan)] text-sm shadow-[0_0_12px_rgba(0,229,255,0.2)]">
            ◇
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1
                className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[var(--zen-snow)]"
                style={{ fontFamily: "var(--font-zen-display, serif)" }}
              >
                THE ARCHIVE
              </h1>
              <span className="text-[10px] font-mono text-[var(--zen-cyan)] tracking-wider hidden sm:inline">
                {viewMode === "graph" ? "// 星図" : "// 目録"}
              </span>
            </div>
            <p className="text-[10px] font-mono text-[var(--zen-ink-muted)]">
              {viewMode === "graph"
                ? "TOPOLOGICAL CONCEPT NETWORK"
                : "CLASSIFIED CURRICULAR DIRECTORY"}
            </p>
          </div>
        </div>

        {/* Segmented Mode Switcher */}
        <div className="flex items-center p-1 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-card)] shadow-lg">
          <button
            onClick={() => handleToggle("graph")}
            className={`px-3 sm:px-4 py-1.5 rounded text-xs font-mono tracking-wider transition-all duration-200 flex items-center gap-2 ${
              viewMode === "graph"
                ? "bg-[var(--zen-cyan)]/15 text-[var(--zen-cyan)] border border-[var(--zen-cyan)]/50 shadow-[0_0_12px_rgba(0,229,255,0.25)] font-semibold"
                : "text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] border border-transparent"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            <span>GRAPH</span>
            <span className="text-[10px] text-[var(--zen-ink-muted)] hidden sm:inline">星図</span>
          </button>

          <button
            onClick={() => handleToggle("directory")}
            className={`px-3 sm:px-4 py-1.5 rounded text-xs font-mono tracking-wider transition-all duration-200 flex items-center gap-2 ${
              viewMode === "directory"
                ? "bg-[var(--zen-cyan)]/15 text-[var(--zen-cyan)] border border-[var(--zen-cyan)]/50 shadow-[0_0_12px_rgba(0,229,255,0.25)] font-semibold"
                : "text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] border border-transparent"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            <span>ARCHIVE</span>
            <span className="text-[10px] text-[var(--zen-ink-muted)] hidden sm:inline">目録</span>
          </button>
        </div>
      </header>

      {/* Main Viewport Content */}
      <div className="relative flex-1 w-full h-[calc(100vh-105px)] overflow-hidden">
        {/* Full-Screen Constellation Graph Canvas */}
        {viewMode === "graph" && (
          <motion.div
            key="fullscreen-graph"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full"
          >
            <ObsidianGraph />
          </motion.div>
        )}

        {/* Directory View Container */}
        <AnimatePresence>
          {viewMode === "directory" && (
            <motion.div
              key="directory-view"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex flex-col"
            >
              <div className="relative w-full h-full rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] backdrop-blur-2xl p-4 sm:p-6 shadow-2xl flex flex-col overflow-hidden">
                {/* Japanese Corner Brackets */}
                <span className="pointer-events-none absolute top-2 left-2 font-mono text-xs text-[var(--zen-cyan)] select-none">
                  『
                </span>
                <span className="pointer-events-none absolute bottom-2 right-2 font-mono text-xs text-[var(--zen-cyan)] select-none">
                  』
                </span>

                <DirectoryView />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function NotesLoading() {
  return (
    <div className="h-screen w-full bg-[var(--zen-void)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-t-2 border-[var(--zen-cyan)] rounded-full animate-spin" />
        <span className="font-mono text-xs text-[var(--zen-ink-muted)] tracking-widest uppercase">
          LOADING ARCHIVE...
        </span>
      </div>
    </div>
  );
}

export default function NotesGraphPage() {
  return (
    <Suspense fallback={<NotesLoading />}>
      <NotesContent />
    </Suspense>
  );
}
