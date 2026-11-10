"use client";

import { useState } from "react";
import Link from "next/link";
import { getSimulatorsForCourse } from "@/lib/simulator-registry";
import { SimulatorRenderer } from "./SimulatorRenderer";

interface CourseSimulatorDockProps {
  courseCode: string;
}

export function CourseSimulatorDock({ courseCode }: CourseSimulatorDockProps) {
  const [isOpen, setIsOpen] = useState(false);
  const simulators = getSimulatorsForCourse(courseCode);
  const [activeSimIdx, setActiveSimIdx] = useState(0);

  if (!simulators || simulators.length === 0) return null;

  const currentSim = simulators[activeSimIdx] || simulators[0];

  return (
    <div className="my-6 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] overflow-hidden universe-card shadow-lg">
      {/* Header Banner */}
      <div className="p-3.5 sm:p-4 bg-[var(--zen-midnight)]/80 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--zen-border)]">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[var(--zen-cyan)] animate-pulse shrink-0" />
          <div className="min-w-0">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold block truncate">
              INTERACTIVE COURSE LABS // {courseCode} ({simulators.length} AVAILABLE)
            </span>
            <span className="text-xs sm:text-sm font-bold text-[var(--zen-snow)] tracking-wider uppercase block truncate">
              {currentSim.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {simulators.length > 1 && (
            <div className="flex gap-1 mr-2">
              {simulators.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSimIdx(idx)}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded border transition-all ${
                    activeSimIdx === idx
                      ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold shadow-[0_0_8px_rgba(0,229,255,0.2)]"
                      : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
                  }`}
                  title={s.title}
                >
                  Lab {idx + 1}
                </button>
              ))}
            </div>
          )}

          <Link
            href={`/simulators?id=${currentSim.id}`}
            className="px-2.5 py-1 rounded border border-[var(--zen-border)] font-mono text-[10px] uppercase text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:border-[var(--zen-cyan)] transition-colors flex items-center gap-1"
            title="Open in dedicated Fullscreen Studio"
          >
            <span>Studio</span>
            <span className="text-[11px]">↗</span>
          </Link>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={`px-3 py-1 rounded font-mono text-[10px] uppercase tracking-wider font-bold transition-all border ${
              isOpen
                ? "border-[var(--zen-border)] bg-[var(--zen-void)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
                : "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-cyan)] hover:bg-[var(--zen-cyan)]/25 shadow-[0_0_12px_rgba(0,229,255,0.2)]"
            }`}
          >
            {isOpen ? "[ HIDE LAB ]" : "[ OPEN INTERACTIVE LAB ]"}
          </button>
        </div>
      </div>

      {/* Key Concepts Preview */}
      <div className="px-3.5 sm:px-4 py-2 bg-[var(--zen-void)]/40 flex flex-wrap items-center gap-1.5 border-b border-[var(--zen-border)]/50 text-[10px] font-mono text-[var(--zen-ink-muted)]">
        <span className="text-[var(--zen-cyan)] uppercase mr-1">Concepts:</span>
        {currentSim.keyConcepts.map((c, i) => (
          <span
            key={i}
            className="px-1.5 py-0.2 rounded bg-[var(--zen-card)] border border-[var(--zen-border)] text-[var(--zen-frost)]"
          >
            {c}
          </span>
        ))}
      </div>

      {/* Collapsible Workbench Body */}
      {isOpen && (
        <div className="p-3 sm:p-5 bg-[var(--zen-void)]/40 border-t border-[var(--zen-border)]/50">
          <SimulatorRenderer simulatorId={currentSim.id} />
        </div>
      )}
    </div>
  );
}
