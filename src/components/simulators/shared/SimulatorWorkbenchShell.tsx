"use client";

import React, { useMemo, useId } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import katex from "katex";
import { sanitizeHtml } from "@/lib/sanitize";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Sigma,
  Activity,
  SlidersHorizontal,
} from "lucide-react";
import { motionTokens } from "@/lib/motion-tokens";
import { getCourseInfo, getDomainInfo, type StarDomainId } from "@/lib/course-registry";

export interface SimulatorPresetOption {
  id: string;
  label: string;
  description?: string;
}

export interface SimulatorSteppingControls {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onStepBack?: () => void;
  onStepForward: () => void;
  onReset: () => void;
  speed?: number;
  onChangeSpeed?: (speed: number) => void;
  stepIndex: number;
  totalSteps?: number;
  stepLabel?: string;
  canStepBack?: boolean;
  canStepForward?: boolean;
}

export interface SimulatorTelemetryMetric {
  label: string;
  value: string | number;
  accent?: boolean;
  hint?: string;
}

export interface SimulatorMathematicalInvariant {
  label: string;
  latex: string;
  note?: string;
}

export interface SimulatorWorkbenchShellProps {
  title: string;
  subtitle?: string;
  domain: StarDomainId;
  courses: string[];
  presets?: SimulatorPresetOption[];
  activePresetId?: string;
  onSelectPreset?: (presetId: string) => void;
  stepping?: SimulatorSteppingControls;
  telemetryMetrics?: SimulatorTelemetryMetric[];
  invariants?: SimulatorMathematicalInvariant[];
  stateInspector?: React.ReactNode;
  headerActions?: React.ReactNode;
  compact?: boolean;
  children: React.ReactNode;
}

const SPEED_OPTIONS = [0.5, 1, 2, 4] as const;

interface KatexModuleLike {
  default?: {
    renderToString: (tex: string, options?: { throwOnError?: boolean; displayMode?: boolean }) => string;
  };
  renderToString?: (tex: string, options?: { throwOnError?: boolean; displayMode?: boolean }) => string;
}

export function KatexFormula({ latex, displayMode = false }: { latex: string; displayMode?: boolean }) {
  const html = useMemo(() => {
    try {
      const kMod = katex as unknown as KatexModuleLike;
      const fn = kMod?.default?.renderToString || kMod?.renderToString;
      if (!fn) return "";
      const raw = fn(latex, { throwOnError: false, displayMode });
      return sanitizeHtml(raw, {
        USE_PROFILES: { html: true, mathMl: true },
      });
    } catch {
      return "";
    }
  }, [latex, displayMode]);

  if (!html) {
    return <code className="font-mono text-xs text-[var(--zen-cyan)]">{latex}</code>;
  }

  return (
    <span
      className="katex-telemetry inline-block max-w-full overflow-x-auto align-middle"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function SimulatorWorkbenchShell({
  title,
  subtitle,
  domain,
  courses,
  presets,
  activePresetId,
  onSelectPreset,
  stepping,
  telemetryMetrics,
  invariants,
  stateInspector,
  headerActions,
  compact = false,
  children,
}: SimulatorWorkbenchShellProps) {
  const speedSelectId = useId();
  const presetSelectId = useId();
  const domainInfo = getDomainInfo(domain);

  const hasSidebar = Boolean(stateInspector || (invariants && invariants.length > 0));
  const activePreset = presets?.find((p) => p.id === activePresetId);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.engram }}
      aria-label={`${title} Interactive Workbench`}
      className={`${
        compact ? "p-3 sm:p-4" : "p-4 sm:p-6"
      } rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card text-[var(--zen-frost)] space-y-4`}
    >
      {/* 1. TOP TELEMETRY HEADER */}
      <header className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-[var(--zen-border)] pb-4">
        <div className="space-y-1.5 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/10 text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
              <Activity className="w-3 h-3" aria-hidden="true" />
              {domainInfo.label}
            </span>
            {courses.map((courseCode) => {
              const info = getCourseInfo(courseCode);
              const href = info?.href || `/notes?view=directory&q=${encodeURIComponent(courseCode)}`;
              return (
                <Link
                  key={courseCode}
                  href={href}
                  aria-label={`Open course notes for ${courseCode}`}
                  className="px-2 py-0.5 rounded border border-[var(--zen-border)] bg-[var(--zen-void)]/70 hover:border-[var(--zen-cyan)] hover:text-[var(--zen-cyan)] text-[10px] font-mono tracking-wider uppercase text-[var(--zen-ink-muted)] transition-colors"
                >
                  {courseCode}
                </Link>
              );
            })}
          </div>

          <h3
            className="text-base sm:text-xl font-bold text-[var(--zen-snow)] tracking-wide uppercase"
            style={{ fontFamily: "var(--font-zen-display, serif)" }}
          >
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-[var(--zen-ink-muted)] max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 shrink-0">
          {presets && presets.length > 0 && onSelectPreset && (
            <div className="flex items-center gap-2">
              <label htmlFor={presetSelectId} className="sr-only">
                Preset Scenario
              </label>
              <SlidersHorizontal
                className="w-3.5 h-3.5 text-[var(--zen-cyan)] shrink-0"
                aria-hidden="true"
              />
              <select
                id={presetSelectId}
                aria-label="Preset Scenario"
                value={activePresetId || presets[0]?.id}
                onChange={(e) => onSelectPreset(e.target.value)}
                className="bg-[var(--zen-void)] border border-[var(--zen-border)] rounded-lg px-2.5 py-1.5 font-mono text-xs text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
              >
                {presets.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          {headerActions}
        </div>
      </header>

      {/* Preset Quick Pills & Active Description */}
      {presets && presets.length > 0 && onSelectPreset && (
        <div className="space-y-1.5">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Scenario Presets">
            {presets.map((preset) => {
              const active = preset.id === activePresetId;
              return (
                <button
                  key={preset.id}
                  type="button"
                  tabIndex={0}
                  aria-pressed={active}
                  onClick={() => onSelectPreset(preset.id)}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded border transition-all ${
                    active
                      ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-snow)] font-bold"
                      : "border-[var(--zen-border)] bg-[var(--zen-void)]/50 text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:bg-[var(--zen-card-hover)]"
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
          {activePreset?.description && (
            <p className="text-[11px] font-mono text-[var(--zen-ink-muted)] pl-0.5">
              SCENARIO // {activePreset.description}
            </p>
          )}
        </div>
      )}

      {/* 2. TRANSPORT & STEPPING CONTROLS BAR */}
      {stepping && (
        <div
          className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/80"
          role="region"
          aria-label="Simulation Transport Controls"
        >
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              tabIndex={0}
              onClick={stepping.onTogglePlay}
              aria-label={stepping.isPlaying ? "Pause simulation" : "Play simulation"}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded border font-mono text-xs font-bold transition-all ${
                stepping.isPlaying
                  ? "border-amber-500/60 bg-amber-500/15 text-amber-300"
                  : "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-cyan)] hover:bg-[var(--zen-cyan)]/25"
              }`}
            >
              {stepping.isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" aria-hidden="true" /> PAUSE
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" aria-hidden="true" /> PLAY
                </>
              )}
            </button>

            {stepping.onStepBack && (
              <button
                type="button"
                tabIndex={0}
                onClick={stepping.onStepBack}
                disabled={stepping.canStepBack === false || stepping.stepIndex <= 0}
                aria-label="Step Backward"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-[var(--zen-border)] font-mono text-xs text-[var(--zen-frost)] disabled:opacity-35 hover:border-[var(--zen-cyan)] transition-colors"
              >
                <SkipBack className="w-3.5 h-3.5" aria-hidden="true" /> BACK
              </button>
            )}

            <button
              type="button"
              tabIndex={0}
              onClick={stepping.onStepForward}
              disabled={stepping.canStepForward === false}
              aria-label="Step Forward"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-[var(--zen-border)] font-mono text-xs text-[var(--zen-frost)] disabled:opacity-35 hover:border-[var(--zen-cyan)] transition-colors"
            >
              STEP <SkipForward className="w-3.5 h-3.5" aria-hidden="true" />
            </button>

            <button
              type="button"
              tabIndex={0}
              onClick={stepping.onReset}
              aria-label="Reset Simulation"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-[var(--zen-border)] font-mono text-xs text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:border-[var(--zen-cyan)] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" /> RESET
            </button>
          </div>

          <div className="flex items-center gap-3">
            {stepping.onChangeSpeed && (
              <div className="flex items-center gap-1.5">
                <label
                  htmlFor={speedSelectId}
                  className="font-mono text-[10px] uppercase tracking-wider text-[var(--zen-ink-muted)]"
                >
                  SPEED
                </label>
                <select
                  id={speedSelectId}
                  aria-label="Simulation Playback Speed"
                  value={stepping.speed ?? 1}
                  onChange={(e) => stepping.onChangeSpeed?.(Number(e.target.value))}
                  className="bg-[var(--zen-midnight)] border border-[var(--zen-border)] rounded px-2 py-1 font-mono text-xs text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
                >
                  {SPEED_OPTIONS.map((spd) => (
                    <option key={spd} value={spd}>
                      {spd}x
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="px-2.5 py-1 rounded border border-[var(--zen-cyan)]/35 bg-[var(--zen-cyan)]/10 font-mono text-xs font-bold text-[var(--zen-cyan)]">
              {stepping.stepLabel || "T"} = {String(stepping.stepIndex).padStart(2, "0")}
              {stepping.totalSteps !== undefined
                ? ` / ${String(stepping.totalSteps).padStart(2, "0")}`
                : ""}
            </div>
          </div>
        </div>
      )}

      {/* 3. LIVE TELEMETRY METRICS STRIP */}
      {telemetryMetrics && telemetryMetrics.length > 0 && (
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-2.5"
          role="region"
          aria-label="Live Simulation Telemetry"
        >
          {telemetryMetrics.map((m) => (
            <div
              key={m.label}
              className="p-2.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/65 flex flex-col justify-between"
            >
              <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--zen-ink-muted)]">
                {m.label}
              </span>
              <span
                className={`text-sm sm:text-base font-mono font-bold mt-0.5 ${
                  m.accent ? "text-[var(--zen-cyan)]" : "text-[var(--zen-snow)]"
                }`}
              >
                {m.value}
              </span>
              {m.hint && (
                <span className="text-[9px] font-mono text-[var(--zen-ink-dim)] mt-0.5">
                  {m.hint}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 4. SPLIT-PANE CANVAS + LIVE STATE INSPECTOR / INVARIANT LOG */}
      <div className={hasSidebar ? "grid grid-cols-1 xl:grid-cols-12 gap-5 items-start" : ""}>
        <div className={hasSidebar ? "xl:col-span-8 min-w-0 space-y-4" : "min-w-0 space-y-4"}>
          {children}
        </div>

        {hasSidebar && (
          <aside
            className="xl:col-span-4 space-y-4 min-w-0"
            aria-label="State Inspector and Mathematical Invariants"
          >
            {stateInspector && (
              <div className="p-3.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/70 space-y-2.5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--zen-cyan)] font-semibold border-b border-[var(--zen-border)] pb-1.5">
                  LIVE STATE INSPECTOR
                </div>
                {stateInspector}
              </div>
            )}

            {invariants && invariants.length > 0 && (
              <div className="p-3.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-midnight)]/75 space-y-3">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[var(--zen-cyan)] font-semibold border-b border-[var(--zen-border)] pb-1.5">
                  <Sigma className="w-3.5 h-3.5" aria-hidden="true" />
                  MATHEMATICAL INVARIANT LOG
                </div>
                <div className="space-y-2.5">
                  {invariants.map((inv, idx) => (
                    <div
                      key={`${inv.label}-${idx}`}
                      className="p-2.5 rounded border border-[var(--zen-border)]/70 bg-[var(--zen-void)]/60 space-y-1"
                    >
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--zen-ink-muted)]">
                        {inv.label}
                      </div>
                      <div className="text-xs text-[var(--zen-snow)] py-0.5 overflow-x-auto">
                        <KatexFormula latex={inv.latex} />
                      </div>
                      {inv.note && (
                        <div className="text-[10px] font-mono text-[var(--zen-ink-dim)] leading-snug">
                          {inv.note}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        )}
      </div>
    </motion.section>
  );
}
