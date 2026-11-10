"use client";

import { useState } from "react";

type PageAlgo = "FIFO" | "LRU" | "OPTIMAL";

const DEFAULT_REFERENCE_STRING = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2];

export function VirtualMemoryWorkbench() {
  const [algo, setAlgo] = useState<PageAlgo>("FIFO");
  const [frameCount, setFrameCount] = useState(3);
  const [rawRefInput, setRawRefInput] = useState<string>("7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2");

  const parsed = rawRefInput
    .split(/[,\s]+/)
    .map((s) => parseInt(s.trim(), 10))
    .filter((n) => !isNaN(n) && n >= 0 && n <= 99);
  const refString = parsed.length > 0 ? parsed : DEFAULT_REFERENCE_STRING;

  // Compute Page Replacement matrix
  const computePaging = () => {
    const frames: (number | null)[] = Array(frameCount).fill(null);
    const steps: {
      page: number;
      frames: (number | null)[];
      isFault: boolean;
      evicted: number | null;
    }[] = [];

    const history: number[] = []; // for LRU
    let fifoPointer = 0; // for FIFO cyclic pointer
    let faults = 0;

    refString.forEach((page, currentIdx) => {
      const hit = frames.includes(page);
      let evicted: number | null = null;

      if (hit) {
        // Hit: update history for LRU
        if (algo === "LRU") {
          const hIdx = history.indexOf(page);
          if (hIdx !== -1) history.splice(hIdx, 1);
          history.push(page);
        }
        steps.push({
          page,
          frames: [...frames],
          isFault: false,
          evicted: null,
        });
      } else {
        // Fault!
        faults++;
        const emptyIdx = frames.indexOf(null);

        if (emptyIdx !== -1) {
          frames[emptyIdx] = page;
          if (algo === "LRU") history.push(page);
        } else {
          // Frame replacement needed
          if (algo === "FIFO") {
            evicted = frames[fifoPointer];
            frames[fifoPointer] = page;
            fifoPointer = (fifoPointer + 1) % frameCount;
          } else if (algo === "LRU") {
            // Find frame with earliest last access
            const lruPage = history[0];
            const replaceIdx = frames.indexOf(lruPage);
            evicted = lruPage;
            frames[replaceIdx] = page;
            history.shift();
            history.push(page);
          } else {
            // Optimal: replace page that won't be used for the longest time
            let farthest = -1;
            let replaceIdx = 0;

            frames.forEach((f, idx) => {
              if (f === null) return;
              const nextUse = refString.slice(currentIdx + 1).indexOf(f);
              if (nextUse === -1) {
                replaceIdx = idx;
                farthest = Infinity;
              } else if (nextUse > farthest && farthest !== Infinity) {
                farthest = nextUse;
                replaceIdx = idx;
              }
            });

            evicted = frames[replaceIdx];
            frames[replaceIdx] = page;
          }
        }

        steps.push({
          page,
          frames: [...frames],
          isFault: true,
          evicted,
        });
      }
    });

    const faultRate = ((faults / refString.length) * 100).toFixed(1);
    const hitRate = (100 - parseFloat(faultRate)).toFixed(1);

    return { steps, faults, faultRate, hitRate };
  };

  const { steps, faults, faultRate, hitRate } = computePaging();

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card text-[var(--zen-frost)]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[var(--zen-border)] pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
            VIRTUAL MEMORY // CSOPESY
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[var(--zen-snow)] tracking-wider uppercase">
            Page Replacement Algorithm Studio
          </h4>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(["FIFO", "LRU", "OPTIMAL"] as PageAlgo[]).map((a) => (
            <button
              key={a}
              onClick={() => setAlgo(a)}
              className={`px-3 py-1 font-mono text-xs rounded border transition-all ${
                algo === a
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold shadow-[0_0_10px_rgba(0,229,255,0.25)]"
                  : "border-transparent text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:bg-[var(--zen-card-hover)]"
              }`}
            >
              {a === "OPTIMAL" ? "Optimal (Bélády)" : a}
            </button>
          ))}
          <div className="flex items-center gap-1.5 ml-2">
            <span className="text-xs font-mono text-[var(--zen-ink-muted)]">Frames:</span>
            <select
              value={frameCount}
              onChange={(e) => setFrameCount(parseInt(e.target.value))}
              className="px-2 py-0.5 rounded border border-[var(--zen-border)] bg-[var(--zen-void)] text-xs font-mono text-[var(--zen-snow)]"
            >
              <option value="2">2 Frames</option>
              <option value="3">3 Frames</option>
              <option value="4">4 Frames</option>
              <option value="5">5 Frames</option>
              <option value="6">6 Frames</option>
            </select>
          </div>
        </div>
      </div>

      {/* Custom Reference Input Bar */}
      <div className="mb-5 p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <label className="text-[10px] font-mono tracking-wider text-[var(--zen-ink-muted)] uppercase">
            Custom Page Reference String:
          </label>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-[10px] text-[var(--zen-ink-muted)]">Presets:</span>
            <button
              type="button"
              onClick={() => setRawRefInput("7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2")}
              className="px-2 py-0.5 rounded border border-[var(--zen-border)] text-[10px] hover:border-[var(--zen-cyan)] hover:text-[var(--zen-snow)] transition-colors"
            >
              Standard
            </button>
            <button
              type="button"
              onClick={() => setRawRefInput("1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5")}
              className="px-2 py-0.5 rounded border border-[var(--zen-border)] text-[10px] hover:border-[var(--zen-cyan)] hover:text-[var(--zen-snow)] transition-colors"
            >
              Belady Anomaly
            </button>
            <button
              type="button"
              onClick={() => setRawRefInput("1, 2, 1, 2, 3, 1, 2, 1, 2, 4, 1, 2")}
              className="px-2 py-0.5 rounded border border-[var(--zen-border)] text-[10px] hover:border-[var(--zen-cyan)] hover:text-[var(--zen-snow)] transition-colors"
            >
              Locality
            </button>
          </div>
        </div>
        <input
          type="text"
          value={rawRefInput}
          onChange={(e) => setRawRefInput(e.target.value)}
          placeholder="Enter comma-separated page numbers (e.g. 7, 0, 1, 2, 0, 3)"
          className="w-full px-3 py-1.5 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)] text-xs font-mono text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)] transition-colors"
        />
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 text-center">
          <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase block">
            Total References
          </span>
          <span className="text-lg font-mono font-bold text-[var(--zen-snow)]">
            {refString.length} Pages
          </span>
        </div>
        <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 text-center">
          <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase block">
            Page Faults (Misses)
          </span>
          <span className="text-lg font-mono font-bold text-red-700 dark:text-red-400">
            {faults} Faults
          </span>
        </div>
        <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 text-center">
          <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase block">
            Fault Rate
          </span>
          <span className="text-lg font-mono font-bold text-[var(--zen-cyan)]">
            {faultRate}%
          </span>
        </div>
        <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 text-center">
          <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase block">
            Hit Rate
          </span>
          <span className="text-lg font-mono font-bold text-emerald-700 dark:text-emerald-400">
            {hitRate}%
          </span>
        </div>
      </div>

      {/* Step by Step Frame Grid */}
      <div className="overflow-x-auto rounded-lg border border-[var(--zen-border)] mb-4">
        <table className="w-full text-center font-mono text-xs">
          <thead className="bg-[var(--zen-midnight)] text-[var(--zen-ink-muted)] border-b border-[var(--zen-border)]">
            <tr>
              <th className="p-2.5 text-left pl-3">Step</th>
              {steps.map((st, i) => (
                <th key={i} className="p-2.5 min-w-[36px] font-bold text-[var(--zen-snow)]">
                  {st.page}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: frameCount }).map((_, fIdx) => (
              <tr key={fIdx} className="border-b border-[var(--zen-border)]/40">
                <td className="p-2 text-left pl-3 text-[10px] text-[var(--zen-ink-muted)] bg-[var(--zen-void)]/30">
                  Frame {fIdx}
                </td>
                {steps.map((st, sIdx) => {
                  const val = st.frames[fIdx];
                  const isNewArrival = val === st.page && st.isFault;
                  return (
                    <td
                      key={sIdx}
                      className={`p-2 transition-colors ${
                        isNewArrival ? "bg-[var(--zen-cyan)]/15 font-bold text-[var(--zen-cyan)]" : ""
                      }`}
                    >
                      {val !== null && val !== undefined ? val : "-"}
                    </td>
                  );
                })}
              </tr>
            ))}
            {/* Status Row (Fault or Hit) */}
            <tr className="bg-[var(--zen-void)]/60 font-bold text-[10px]">
              <td className="p-2 text-left pl-3 text-[var(--zen-ink-muted)]">Result</td>
              {steps.map((st, sIdx) => (
                <td key={sIdx} className="p-2">
                  {st.isFault ? (
                    <span className="text-red-700 dark:text-red-400 px-1 py-0.5 rounded bg-red-500/15 border border-red-500/30">
                      M
                    </span>
                  ) : (
                    <span className="text-emerald-700 dark:text-emerald-400 px-1 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30">
                      H
                    </span>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-[var(--zen-ink-muted)]">
        <div>M = Page Fault (Miss) · H = Page Hit (Found in Physical Frame)</div>
        <div className="text-[var(--zen-cyan)] font-semibold">
          Current Algorithm: {algo}
        </div>
      </div>
    </div>
  );
}
