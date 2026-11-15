"use client";

import { useState, useEffect, useMemo, useId } from "react";
import {
  SimulatorWorkbenchShell,
  type SimulatorPresetOption,
  type SimulatorTelemetryMetric,
  type SimulatorMathematicalInvariant,
} from "./shared/SimulatorWorkbenchShell";

type ReplacementPolicy = "FIFO" | "LRU" | "OPT" | "CLOCK";

interface MemoryPreset extends SimulatorPresetOption {
  referenceString: string;
  defaultFrames: number;
}

const PRESETS: MemoryPreset[] = [
  {
    id: "locality",
    label: "Locality Working Set",
    description: "Strong temporal locality inside a 3-page working set with occasional cold misses.",
    referenceString: "7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0",
    defaultFrames: 3,
  },
  {
    id: "belady",
    label: "Belady's Anomaly (FIFO 3 vs 4)",
    description: "Famous sequence (1,2,3,4,1,2,5,1,2,3,4,5) where FIFO faults MORE with 4 frames than 3!",
    referenceString: "1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5",
    defaultFrames: 3,
  },
  {
    id: "thrashing",
    label: "Cyclic Thrashing Loop",
    description: "Sequential 5-page ring exceeding 3 physical frames causes continuous capacity misses under LRU/FIFO.",
    referenceString: "1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5",
    defaultFrames: 3,
  },
  {
    id: "db-scan",
    label: "Database Sequential Scan",
    description: "Hot index pages (1, 2) interleaved with sequential table pages (8, 9, 10, 11).",
    referenceString: "1, 2, 8, 1, 2, 9, 1, 2, 10, 1, 2, 11, 1, 2",
    defaultFrames: 3,
  },
];

interface PagingStep {
  step: number;
  page: number;
  frames: (number | null)[];
  clockBits: boolean[];
  clockHand: number;
  tlbEntries: { page: number; frame: number }[];
  tlbHit: boolean;
  pageFault: boolean;
  evicted: number | null;
  mappedFrame: number;
}

function simulatePaging(
  pages: number[],
  frameCount: number,
  policy: ReplacementPolicy,
  tlbSize = 2
): { steps: PagingStep[]; faultCount: number; tlbHits: number } {
  const frames: (number | null)[] = Array(frameCount).fill(null);
  const clockBits: boolean[] = Array(frameCount).fill(false);
  const fifoQueue: number[] = [];
  const lastUsed = new Map<number, number>();
  let clockHand = 0;

  // Fully associative LRU TLB
  let tlb: { page: number; frame: number; lastStep: number }[] = [];

  const steps: PagingStep[] = [];
  let faultCount = 0;
  let tlbHits = 0;

  pages.forEach((page, idx) => {
    let tlbHit = false;
    let pageFault = false;
    let evicted: number | null = null;
    let mappedFrame = frames.indexOf(page);

    const existingTlb = tlb.find((entry) => entry.page === page);
    if (existingTlb && mappedFrame !== -1) {
      tlbHit = true;
      tlbHits++;
      existingTlb.lastStep = idx;
    }

    if (mappedFrame !== -1) {
      // Page Hit
      clockBits[mappedFrame] = true;
      lastUsed.set(page, idx);
      if (!tlbHit) {
        if (tlb.length >= tlbSize) {
          tlb.sort((a, b) => a.lastStep - b.lastStep);
          tlb.shift();
        }
        tlb.push({ page, frame: mappedFrame, lastStep: idx });
      }
    } else {
      // Page Fault
      pageFault = true;
      faultCount++;

      const emptySlot = frames.indexOf(null);
      if (emptySlot !== -1) {
        mappedFrame = emptySlot;
      } else if (policy === "FIFO") {
        const victimPage = fifoQueue.shift()!;
        mappedFrame = frames.indexOf(victimPage);
        evicted = victimPage;
      } else if (policy === "LRU") {
        let lruFrame = 0;
        let oldestStep = Infinity;
        for (let f = 0; f < frameCount; f++) {
          const pInFrame = frames[f]!;
          const usedAt = lastUsed.get(pInFrame) ?? -1;
          if (usedAt < oldestStep) {
            oldestStep = usedAt;
            lruFrame = f;
          }
        }
        evicted = frames[lruFrame];
        mappedFrame = lruFrame;
      } else if (policy === "OPT") {
        let optFrame = 0;
        let farthestNext = -1;
        for (let f = 0; f < frameCount; f++) {
          const pInFrame = frames[f]!;
          const nextIdx = pages.indexOf(pInFrame, idx + 1);
          if (nextIdx === -1) {
            optFrame = f;
            break;
          }
          if (nextIdx > farthestNext) {
            farthestNext = nextIdx;
            optFrame = f;
          }
        }
        evicted = frames[optFrame];
        mappedFrame = optFrame;
      } else {
        // CLOCK (Second-Chance)
        while (clockBits[clockHand]) {
          clockBits[clockHand] = false;
          clockHand = (clockHand + 1) % frameCount;
        }
        evicted = frames[clockHand];
        mappedFrame = clockHand;
        clockHand = (clockHand + 1) % frameCount;
      }

      frames[mappedFrame] = page;
      clockBits[mappedFrame] = true;
      if (policy === "FIFO" || !fifoQueue.includes(page)) {
        fifoQueue.push(page);
      }
      lastUsed.set(page, idx);

      if (evicted !== null) {
        tlb = tlb.filter((entry) => entry.page !== evicted);
      }
      if (tlb.length >= tlbSize) {
        tlb.sort((a, b) => a.lastStep - b.lastStep);
        tlb.shift();
      }
      tlb.push({ page, frame: mappedFrame, lastStep: idx });
    }

    steps.push({
      step: idx + 1,
      page,
      frames: [...frames],
      clockBits: [...clockBits],
      clockHand,
      tlbEntries: tlb.map((e) => ({ page: e.page, frame: e.frame })),
      tlbHit,
      pageFault,
      evicted,
      mappedFrame,
    });
  });

  return { steps, faultCount, tlbHits };
}

export function VirtualMemoryPageWorkbench() {
  const refInputId = useId();
  const frameSelectId = useId();
  const [presetId, setPresetId] = useState<string>("locality");
  const [policy, setPolicy] = useState<ReplacementPolicy>("LRU");
  const [frameCount, setFrameCount] = useState<number>(3);
  const [refInput, setRefInput] = useState<string>(PRESETS[0].referenceString);
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);

  const pages = useMemo(() => {
    const parsed = refInput
      .split(/[,\s]+/)
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !Number.isNaN(n) && n >= 0 && n <= 99);
    return parsed.length > 0 ? parsed : [7, 0, 1, 2, 0, 3, 0, 4];
  }, [refInput]);

  const activeSim = useMemo(
    () => simulatePaging(pages, frameCount, policy, 2),
    [pages, frameCount, policy]
  );

  // Side-by-side policy comparison on active reference string
  const policyComparison = useMemo(() => {
    return (["FIFO", "LRU", "CLOCK", "OPT"] as ReplacementPolicy[]).map((p) => {
      const res = simulatePaging(pages, frameCount, p, 2);
      return { policy: p, faults: res.faultCount };
    });
  }, [pages, frameCount]);

  const clampedStep = Math.min(stepIdx, Math.max(0, activeSim.steps.length - 1));
  const current = activeSim.steps[clampedStep];

  useEffect(() => {
    if (!isPlaying) return;
    const ms = Math.round(900 / speed);
    const timer = setInterval(() => {
      setStepIdx((prev) => {
        if (prev >= activeSim.steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, ms);
    return () => clearInterval(timer);
  }, [isPlaying, speed, activeSim.steps.length]);

  const faultsUpToStep = activeSim.steps
    .slice(0, clampedStep + 1)
    .filter((s) => s.pageFault).length;
  const tlbHitsUpToStep = activeSim.steps
    .slice(0, clampedStep + 1)
    .filter((s) => s.tlbHit).length;

  const pFault = activeSim.faultCount / pages.length;
  const eatUs = ((1 - pFault) * 0.1 + pFault * 8000).toFixed(1);

  const metrics: SimulatorTelemetryMetric[] = [
    { label: "Total Page Faults", value: `${activeSim.faultCount} / ${pages.length}`, accent: true },
    { label: "Faults So Far", value: faultsUpToStep, hint: `Step ${clampedStep + 1}` },
    { label: "TLB Hits", value: `${tlbHitsUpToStep} (${activeSim.tlbHits} total)`, hint: "2-Entry LRU TLB" },
    { label: "EAT (Est.)", value: `${eatUs} us`, hint: "t_mem=100ns, t_fault=8ms" },
  ];

  const invariants: SimulatorMathematicalInvariant[] = [
    {
      label: "Effective Access Time (Page Fault Rate p)",
      latex: "\\text{EAT} = (1 - p)\\cdot t_{\\text{mem}} + p \\cdot t_{\\text{fault}}",
      note: `Current p = ${(pFault * 100).toFixed(1)}%. Minimize p via working-set locality.`,
    },
    {
      label: "TLB Effective Memory Latency (alpha)",
      latex: "t_{\\text{mem,eff}} = \\alpha (t_{\\text{TLB}} + t_{\\text{RAM}}) + (1 - \\alpha)(t_{\\text{TLB}} + 2 t_{\\text{RAM}})",
      note: "A TLB miss requires an extra page-table walk read in RAM.",
    },
  ];

  const handleSelectPreset = (nextId: string) => {
    const p = PRESETS.find((pr) => pr.id === nextId) || PRESETS[0];
    setPresetId(p.id);
    setRefInput(p.referenceString);
    setFrameCount(p.defaultFrames);
    setStepIdx(0);
    setIsPlaying(false);
  };

  const stateInspector = (
    <div className="space-y-3 font-mono text-xs">
      {/* TLB Cache State */}
      <div>
        <div className="text-[10px] text-[var(--zen-ink-muted)] uppercase mb-1.5">
          TRANSLATION LOOKASIDE BUFFER (TLB)
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {[0, 1].map((slot) => {
            const entry = current?.tlbEntries[slot];
            return (
              <div
                key={slot}
                className={`p-2 rounded border ${
                  entry && current?.tlbHit && entry.page === current.page
                    ? "border-emerald-400 bg-emerald-500/15 text-emerald-300"
                    : "border-[var(--zen-border)] bg-[var(--zen-midnight)]/60 text-[var(--zen-snow)]"
                }`}
              >
                <div className="text-[9px] text-[var(--zen-ink-muted)]">TLB[{slot}]</div>
                <div className="text-[11px] font-bold">
                  {entry ? `VPN ${entry.page} -> PF ${entry.frame}` : "EMPTY"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Physical Frames + Clock Hand */}
      <div>
        <div className="text-[10px] text-[var(--zen-ink-muted)] uppercase mb-1.5">
          PHYSICAL PAGE FRAMES (STEP {clampedStep + 1})
        </div>
        <div className="space-y-1">
          {Array.from({ length: frameCount }).map((_, fIdx) => {
            const val = current?.frames[fIdx] ?? null;
            const refBit = current?.clockBits[fIdx] ?? false;
            const isPointer = policy === "CLOCK" && current?.clockHand === fIdx;
            const isActiveTarget = current?.mappedFrame === fIdx;
            return (
              <div
                key={fIdx}
                className={`px-2.5 py-1.5 rounded border flex items-center justify-between text-[11px] ${
                  isActiveTarget
                    ? current?.pageFault
                      ? "border-rose-400 bg-rose-500/15 text-rose-200 font-bold"
                      : "border-emerald-400 bg-emerald-500/15 text-emerald-200 font-bold"
                    : "border-[var(--zen-border)] bg-[var(--zen-card)] text-[var(--zen-snow)]"
                }`}
              >
                <span>
                  {isPointer ? "> " : ""}Frame {fIdx}
                </span>
                <div className="flex items-center gap-2">
                  <span>{val === null ? "-" : `Page ${val}`}</span>
                  {policy === "CLOCK" && (
                    <span className="text-[9px] px-1 rounded bg-[var(--zen-void)] border border-[var(--zen-border)]">
                      R={refBit ? "1" : "0"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Policy Benchmark Comparison */}
      <div>
        <div className="text-[10px] text-[var(--zen-ink-muted)] uppercase mb-1.5">
          4-ALGORITHM BENCHMARK ({frameCount} FRAMES)
        </div>
        <div className="grid grid-cols-4 gap-1">
          {policyComparison.map((item) => (
            <button
              key={item.policy}
              type="button"
              onClick={() => setPolicy(item.policy)}
              className={`p-1.5 rounded border text-center transition-colors ${
                item.policy === policy
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-snow)] font-bold"
                  : "border-[var(--zen-border)] bg-[var(--zen-midnight)]/40 text-[var(--zen-ink-muted)]"
              }`}
            >
              <div className="text-[9px]">{item.policy}</div>
              <div className="text-xs text-[var(--zen-cyan)]">{item.faults}F</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <SimulatorWorkbenchShell
      title="Virtual Memory TLB & Page Replacement Lab"
      subtitle="Step through TLB lookups, Page Table translation, and physical frame evictions across FIFO, LRU, Second-Chance Clock, and Belady Optimal (OPT) algorithms."
      domain="systems"
      courses={["CSOPESY", "NSDSYST"]}
      presets={PRESETS}
      activePresetId={presetId}
      onSelectPreset={handleSelectPreset}
      headerActions={
        <div className="flex items-center gap-2">
          <label htmlFor={frameSelectId} className="sr-only">
            Physical Frame Count
          </label>
          <select
            id={frameSelectId}
            aria-label="Physical Frame Count"
            value={frameCount}
            onChange={(e) => {
              setFrameCount(parseInt(e.target.value, 10));
              setStepIdx(0);
            }}
            className="bg-[var(--zen-void)] border border-[var(--zen-border)] rounded-lg px-2.5 py-1.5 font-mono text-xs text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
          >
            {[3, 4, 5, 6].map((cnt) => (
              <option key={cnt} value={cnt}>
                {cnt} Frames
              </option>
            ))}
          </select>
        </div>
      }
      stepping={{
        isPlaying,
        onTogglePlay: () => setIsPlaying((p) => !p),
        onStepBack: () => {
          setIsPlaying(false);
          setStepIdx((s) => Math.max(0, s - 1));
        },
        onStepForward: () => {
          setIsPlaying(false);
          setStepIdx((s) => Math.min(activeSim.steps.length - 1, s + 1));
        },
        onReset: () => {
          setIsPlaying(false);
          setStepIdx(0);
        },
        speed,
        onChangeSpeed: setSpeed,
        stepIndex: clampedStep + 1,
        totalSteps: activeSim.steps.length,
        stepLabel: "REF",
        canStepBack: clampedStep > 0,
        canStepForward: clampedStep < activeSim.steps.length - 1,
      }}
      telemetryMetrics={metrics}
      invariants={invariants}
      stateInspector={stateInspector}
    >
      {/* Policy Selector & Custom Reference Input */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60">
        <div className="md:col-span-5 flex flex-wrap gap-1.5 items-center">
          {(["FIFO", "LRU", "CLOCK", "OPT"] as ReplacementPolicy[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPolicy(p)}
              className={`px-2.5 py-1 text-xs font-mono rounded border transition-all ${
                policy === p
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold"
                  : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="md:col-span-7 flex items-center gap-2">
          <label htmlFor={refInputId} className="sr-only">
            Virtual Page Reference String
          </label>
          <input
            id={refInputId}
            aria-label="Virtual Page Reference String"
            type="text"
            value={refInput}
            onChange={(e) => {
              setRefInput(e.target.value);
              setStepIdx(0);
            }}
            className="w-full px-3 py-1.5 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)] font-mono text-xs text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
            placeholder="e.g. 7, 0, 1, 2, 0, 3, 0, 4"
          />
        </div>
      </div>

      {/* Step-by-Step Frame Allocation Trace Table */}
      <div className="overflow-x-auto rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/75">
        <table className="w-full text-center font-mono text-xs">
          <thead className="bg-[var(--zen-midnight)] text-[var(--zen-ink-muted)] border-b border-[var(--zen-border)]">
            <tr>
              <th className="p-2 text-left pl-3">Ref</th>
              {activeSim.steps.map((s, idx) => (
                <th
                  key={s.step}
                  onClick={() => {
                    setIsPlaying(false);
                    setStepIdx(idx);
                  }}
                  className={`p-2 min-w-[38px] cursor-pointer ${
                    idx === clampedStep
                      ? "bg-[var(--zen-cyan)]/20 text-[var(--zen-cyan)] font-bold"
                      : ""
                  }`}
                >
                  P{s.page}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: frameCount }).map((_, fIdx) => (
              <tr key={fIdx} className="border-b border-[var(--zen-border)]/40">
                <td className="p-2 text-left pl-3 text-[var(--zen-ink-muted)] bg-[var(--zen-midnight)]/30">
                  PF {fIdx}
                </td>
                {activeSim.steps.map((s, idx) => {
                  const val = s.frames[fIdx];
                  const isCurrent = idx === clampedStep;
                  const touchedHere = s.mappedFrame === fIdx;
                  return (
                    <td
                      key={s.step}
                      className={`p-2 ${isCurrent ? "bg-[var(--zen-cyan)]/10 font-bold" : ""} ${
                        touchedHere && idx <= clampedStep
                          ? s.pageFault
                            ? "text-rose-300"
                            : "text-emerald-300"
                          : "text-[var(--zen-frost)]"
                      }`}
                    >
                      {idx <= clampedStep ? (val === null ? "-" : val) : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr className="bg-[var(--zen-midnight)]/40">
              <td className="p-2 text-left pl-3 text-[10px] text-[var(--zen-ink-muted)]">Status</td>
              {activeSim.steps.map((s, idx) => (
                <td key={s.step} className="p-1.5 text-[9px] font-bold">
                  {idx <= clampedStep ? (
                    <span
                      className={
                        s.pageFault
                          ? "text-rose-400"
                          : s.tlbHit
                          ? "text-[var(--zen-cyan)]"
                          : "text-emerald-400"
                      }
                    >
                      {s.pageFault ? "FAULT" : s.tlbHit ? "TLB" : "HIT"}
                    </span>
                  ) : (
                    ""
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </SimulatorWorkbenchShell>
  );
}
