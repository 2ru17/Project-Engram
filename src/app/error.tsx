"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { motionTokens } from "@/lib/motion-tokens";

const STARS = [
  { x: "15%", y: "20%", size: 2 },
  { x: "72%", y: "8%", size: 3 },
  { x: "88%", y: "45%", size: 2 },
  { x: "30%", y: "70%", size: 4 },
  { x: "55%", y: "85%", size: 2 },
  { x: "10%", y: "55%", size: 3 },
  { x: "92%", y: "72%", size: 2 },
  { x: "45%", y: "12%", size: 3 },
  { x: "68%", y: "60%", size: 2 },
  { x: "20%", y: "38%", size: 4 },
  { x: "80%", y: "25%", size: 2 },
  { x: "38%", y: "90%", size: 3 },
];

export default function GlobalRouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const digest = error.digest ?? "UNINDEXED_DIGEST";

  return (
    <main className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center bg-[var(--zen-void)] text-[var(--zen-snow)] px-4 py-16 selection:bg-[var(--zen-cyan)] selection:text-[var(--zen-void)]">
      {STARS.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[var(--zen-cyan)]"
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            opacity: 0.25 + (i % 3) * 0.2,
          }}
          aria-hidden="true"
        />
      ))}

      <div
        className={`pointer-events-none absolute w-[480px] h-[480px] opacity-15 ${
          shouldReduceMotion ? "" : "animate-spin"
        }`}
        style={shouldReduceMotion ? undefined : { animationDuration: "120s" }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
          <circle
            cx="200"
            cy="200"
            r="190"
            stroke="var(--zen-slate-edge)"
            strokeWidth="1"
            strokeDasharray="8 6"
          />
          <circle
            cx="200"
            cy="200"
            r="140"
            stroke="var(--zen-steel)"
            strokeWidth="0.75"
          />
          <polygon
            points="200,10 390,200 200,390 10,200"
            stroke="var(--zen-cyan)"
            strokeWidth="0.8"
            opacity="0.6"
          />
          <polygon
            points="65,65 335,65 335,335 65,335"
            stroke="var(--zen-slate-deep)"
            strokeWidth="1"
          />
        </svg>
      </div>

      <span
        className="pointer-events-none absolute text-9xl sm:text-[14rem] text-[var(--zen-snow)] opacity-[0.03] select-none leading-none z-0"
        style={{ fontFamily: "var(--font-zen-brush, serif)" }}
        aria-hidden="true"
      >
        断
      </span>

      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0, y: motionTokens.distance.md }
        }
        animate={{ opacity: 1, y: 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: motionTokens.duration.slow,
                ease: motionTokens.easing.engram,
              }
        }
        className="relative z-10 w-full max-w-2xl rounded-2xl border border-[var(--zen-border)] bg-[var(--zen-card)]/90 backdrop-blur-xl p-6 sm:p-10 shadow-2xl universe-card text-center flex flex-col items-center"
      >
        <div
          className="w-12 h-12 rounded-full border border-[var(--zen-hanko)]/40 bg-[var(--zen-hanko)]/10 flex items-center justify-center mb-5"
          aria-hidden="true"
        >
          <span className="text-[var(--zen-hanko)] text-xl font-mono">!</span>
        </div>

        <h1
          className="text-3xl sm:text-5xl font-semibold tracking-[0.22em] text-[var(--zen-cyan)] uppercase mb-3"
          style={{ fontFamily: "var(--font-zen-display, serif)" }}
        >
          {"500 // RUNTIME FAULT"}
        </h1>

        <div
          className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--zen-cyan)]/50 to-transparent my-3"
          aria-hidden="true"
        />

        <div
          role="alert"
          aria-live="assertive"
          className="w-full rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/85 px-4 py-3 text-left font-mono text-xs mb-6 space-y-1"
        >
          <div className="flex items-center justify-between text-[10px] text-[var(--zen-ink-muted)] uppercase tracking-wider">
            <span>{"WORKBENCH DIAGNOSTIC // BOUNDARY_EXCEPTION"}</span>
            <span className="text-[var(--zen-hanko)] font-semibold">
              FAULT ISOLATED
            </span>
          </div>
          <div className="text-[var(--zen-frost)] break-all">
            <span className="text-[var(--zen-cyan)]" aria-hidden="true">
              $
            </span>{" "}
            <span className="text-[var(--zen-ink-muted)]">
              {"FAULT_DIGEST // TELEMETRY_ID:"}
            </span>{" "}
            <code className="text-[var(--zen-snow)] font-semibold">
              {digest}
            </code>
          </div>
        </div>

        <p className="text-[var(--zen-ink-muted)] text-xs sm:text-sm leading-relaxed mb-7 max-w-lg">
          An unexpected rendering or boundary exception interrupted this route. Retry the segment below to remount the view, or return to the root archive.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 w-full">
          <button
            type="button"
            onClick={() => reset()}
            className="min-h-[40px] inline-flex items-center justify-center px-5 py-2.5 border border-[var(--zen-cyan)]/60 bg-[var(--zen-cyan)]/10 hover:bg-[var(--zen-cyan)] hover:text-[var(--zen-void)] text-xs font-mono tracking-widest text-[var(--zen-cyan)] rounded-lg transition-all font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
          >
            RETRY SEGMENT
          </button>

          <Link
            href="/"
            className="min-h-[40px] inline-flex items-center justify-center px-5 py-2.5 border border-[var(--zen-border)] bg-[var(--zen-void)] hover:border-[var(--zen-cyan)] text-xs font-mono tracking-widest text-[var(--zen-snow)] hover:text-[var(--zen-cyan)] rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
          >
            RETURN HOME
          </Link>

          <Link
            href="/notes?view=directory"
            className="min-h-[40px] inline-flex items-center justify-center px-5 py-2.5 border border-[var(--zen-border)] bg-[var(--zen-void)] hover:border-[var(--zen-cyan)] text-xs font-mono tracking-widest text-[var(--zen-snow)] hover:text-[var(--zen-cyan)] rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
          >
            BROWSE NOTES
          </Link>

          <Link
            href="/simulators"
            className="min-h-[40px] inline-flex items-center justify-center px-5 py-2.5 border border-[var(--zen-border)] bg-[var(--zen-void)] hover:border-[var(--zen-cyan)] text-xs font-mono tracking-widest text-[var(--zen-snow)] hover:text-[var(--zen-cyan)] rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
          >
            LAUNCH SIMULATORS
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
