"use client";

import { useState, useId, type FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";

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

export default function NotFound() {
  const pathname = usePathname() || "/unknown";
  const router = useRouter();
  const searchInputId = useId();
  const [query, setQuery] = useState("");
  const [targetMode, setTargetMode] = useState<"notes" | "simulators">("notes");

  const handleQuickJump = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleaned = query.trim();
    if (!cleaned) {
      router.push(
        targetMode === "simulators" ? "/simulators" : "/notes?view=directory"
      );
      return;
    }
    if (targetMode === "simulators") {
      router.push(`/simulators?id=${encodeURIComponent(cleaned)}`);
    } else {
      router.push(`/notes?view=directory&q=${encodeURIComponent(cleaned)}`);
    }
  };

  return (
    <main className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center bg-[var(--zen-void)] text-[var(--zen-snow)] px-4 py-16 selection:bg-[var(--zen-cyan)] selection:text-[var(--zen-void)]">
      {STARS.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[var(--zen-cyan)] shadow-[0_0_8px_rgba(0,229,255,0.7)]"
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
        className="pointer-events-none absolute w-[480px] h-[480px] opacity-15 animate-spin"
        style={{ animationDuration: "120s" }}
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
        迷
      </span>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl rounded-2xl border border-[var(--zen-border)] bg-[var(--zen-card)]/90 backdrop-blur-xl p-6 sm:p-10 shadow-2xl universe-card text-center flex flex-col items-center"
      >
        <div className="w-12 h-12 rounded-full border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/10 flex items-center justify-center mb-5 shadow-[0_0_20px_rgba(0,229,255,0.25)]">
          <span className="text-[var(--zen-cyan)] text-xl" aria-hidden="true">
            ◇
          </span>
        </div>

        <h1
          className="text-3xl sm:text-5xl font-semibold tracking-[0.22em] text-[var(--zen-cyan)] uppercase mb-3 drop-shadow-[0_0_15px_rgba(0,229,255,0.3)] glitch-404"
          style={{ fontFamily: "var(--font-zen-display, serif)" }}
        >
          404 // NOT FOUND
        </h1>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[var(--zen-cyan)]/50 to-transparent my-3" />

        <div className="w-full rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/85 px-4 py-3 text-left font-mono text-xs mb-6 space-y-1">
          <div className="flex items-center justify-between text-[10px] text-[var(--zen-ink-muted)] uppercase tracking-wider">
            <span>WORKBENCH DIAGNOSTIC // ROUTE_MISS</span>
            <span className="text-rose-400 font-semibold">STATUS 404</span>
          </div>
          <div className="text-[var(--zen-frost)] break-all">
            <span className="text-[var(--zen-cyan)]">$</span>{" "}
            <span className="text-[var(--zen-ink-muted)]">
              FAULT_VECTOR // UNINDEXED_PATH:
            </span>{" "}
            <code className="text-[var(--zen-snow)] font-semibold">
              {pathname}
            </code>
          </div>
        </div>

        <p className="text-[var(--zen-ink-muted)] text-xs sm:text-sm leading-relaxed mb-6 max-w-lg">
          The requested monograph, course index, or simulator path is unindexed or has moved to a canonical year-agnostic URL. Search the archive below or jump to a core workbench.
        </p>

        <form
          onSubmit={handleQuickJump}
          className="w-full mb-7 space-y-2.5"
          role="search"
          aria-label="Quick search archive or simulators"
        >
          <div className="flex items-center justify-center gap-2 text-[10px] font-mono">
            <button
              type="button"
              onClick={() => setTargetMode("notes")}
              className={`px-3 py-1 rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)] ${
                targetMode === "notes"
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-cyan)] font-semibold"
                  : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
              }`}
            >
              SEARCH COURSE NOTES
            </button>
            <button
              type="button"
              onClick={() => setTargetMode("simulators")}
              className={`px-3 py-1 rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)] ${
                targetMode === "simulators"
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-cyan)] font-semibold"
                  : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
              }`}
            >
              JUMP TO SIMULATOR
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <label htmlFor={searchInputId} className="sr-only">
              Search course code, note title, or simulator ID
            </label>
            <input
              id={searchInputId}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                targetMode === "simulators"
                  ? "Enter simulator id (e.g. pipeline-hazard, tcp-congestion)..."
                  : "Enter course code or topic (e.g. CSOPESY, Dijkstra)..."
              }
              className="flex-1 px-3.5 py-2.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)] font-mono text-xs text-[var(--zen-snow)] placeholder:text-[var(--zen-ink-muted)] focus:outline-none focus:border-[var(--zen-cyan)] focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]/40"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg border border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 hover:bg-[var(--zen-cyan)] text-[var(--zen-cyan)] hover:text-[var(--zen-void)] font-mono text-xs font-bold tracking-wider uppercase transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
            >
              EXECUTE QUERY →
            </button>
          </div>
        </form>

        <div className="flex flex-wrap items-center justify-center gap-3 w-full">
          <Link
            href="/"
            className="min-h-[40px] inline-flex items-center justify-center px-5 py-2.5 border border-[var(--zen-border)] bg-[var(--zen-void)] hover:border-[var(--zen-cyan)] text-xs font-mono tracking-widest text-[var(--zen-snow)] hover:text-[var(--zen-cyan)] rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
          >
            ← RETURN HOME
          </Link>

          <Link
            href="/notes?view=directory"
            className="min-h-[40px] inline-flex items-center justify-center px-5 py-2.5 border border-[var(--zen-cyan)]/60 bg-[var(--zen-cyan)]/10 hover:bg-[var(--zen-cyan)] hover:text-[var(--zen-void)] text-xs font-mono tracking-widest text-[var(--zen-cyan)] rounded-lg transition-all font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
          >
            BROWSE NOTES →
          </Link>

          <Link
            href="/simulators"
            className="min-h-[40px] inline-flex items-center justify-center px-5 py-2.5 border border-[var(--zen-border)] bg-[var(--zen-void)] hover:border-[var(--zen-cyan)] text-xs font-mono tracking-widest text-[var(--zen-snow)] hover:text-[var(--zen-cyan)] rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
          >
            LAUNCH SIMULATORS →
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
