"use client";

import { useState } from "react";

interface Instruction {
  id: string;
  asm: string;
  dest: string | null;
  src1: string | null;
  src2: string | null;
  isBranch?: boolean;
}

const PROGRAM_PRESETS: { name: string; instructions: Instruction[] }[] = [
  {
    name: "RAW Data Hazard (No Forwarding)",
    instructions: [
      { id: "I1", asm: "ADD R1, R2, R3", dest: "R1", src1: "R2", src2: "R3" },
      { id: "I2", asm: "SUB R4, R1, R5", dest: "R4", src1: "R1", src2: "R5" },
      { id: "I3", asm: "AND R6, R1, R7", dest: "R6", src1: "R1", src2: "R7" },
      { id: "I4", asm: "OR  R8, R9, R10", dest: "R8", src1: "R9", src2: "R10" },
    ],
  },
  {
    name: "Independent Instructions (Zero Stalls)",
    instructions: [
      { id: "I1", asm: "ADD R1, R2, R3", dest: "R1", src1: "R2", src2: "R3" },
      { id: "I2", asm: "SUB R4, R5, R6", dest: "R4", src1: "R5", src2: "R6" },
      { id: "I3", asm: "AND R7, R8, R9", dest: "R7", src1: "R8", src2: "R9" },
      { id: "I4", asm: "XOR R10, R11, R12", dest: "R10", src1: "R11", src2: "R12" },
    ],
  },
  {
    name: "Load-Use Hazard (Memory Delay)",
    instructions: [
      { id: "I1", asm: "LW  R1, 0(R2)", dest: "R1", src1: "R2", src2: null },
      { id: "I2", asm: "ADD R3, R1, R4", dest: "R3", src1: "R1", src2: "R4" },
      { id: "I3", asm: "SW  R3, 4(R2)", dest: null, src1: "R3", src2: "R2" },
    ],
  },
];

const STAGES = ["IF", "ID", "EX", "MEM", "WB"] as const;

export function CpuPipelineWorkbench() {
  const [presetIdx, setPresetIdx] = useState(0);
  const [forwarding, setForwarding] = useState(true);
  const [cycle, setCycle] = useState(1);

  const program = PROGRAM_PRESETS[presetIdx].instructions;
  const maxCycles = 10;

  // Compute stage for each instruction at a given clock cycle
  const getStageAtCycle = (instIdx: number, c: number): string => {
    // If forwarding disabled and there's a RAW hazard:
    let startCycle = instIdx + 1;
    if (!forwarding && presetIdx === 0 && instIdx === 1) {
      // SUB depends on ADD (R1) - stalls 2 cycles until WB
      startCycle += 2;
    } else if (!forwarding && presetIdx === 0 && instIdx === 2) {
      startCycle += 2;
    } else if (presetIdx === 2 && instIdx === 1) {
      // Load-use stall (1 cycle even with forwarding)
      startCycle += 1;
    }

    const elapsed = c - startCycle;
    if (elapsed < 0) return "-";
    if (elapsed < STAGES.length) return STAGES[elapsed];
    return "DONE";
  };

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card text-[var(--zen-frost)]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[var(--zen-border)] pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
            CPU ARCHITECTURE // CSARCH1 & CSARCH2
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[var(--zen-snow)] tracking-wider uppercase">
            5-Stage RISC Pipeline & Hazard Studio
          </h4>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setForwarding((f) => !f)}
            className={`px-3 py-1 font-mono text-xs rounded border transition-all ${
              forwarding
                ? "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold"
                : "border-[var(--zen-slate-edge)] bg-[var(--zen-midnight)] text-[var(--zen-ink-muted)]"
            }`}
          >
            Forwarding: {forwarding ? "ENABLED" : "DISABLED"}
          </button>
        </div>
      </div>

      {/* Preset Selector */}
      <div className="flex flex-wrap gap-2 mb-5">
        {PROGRAM_PRESETS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => {
              setPresetIdx(idx);
              setCycle(1);
            }}
            className={`px-3 py-1.5 text-xs font-mono rounded border transition-all ${
              presetIdx === idx
                ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:bg-[var(--zen-card-hover)]"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Clock Cycle Stepper Controls */}
      <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/80 mb-5">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[var(--zen-ink-muted)] uppercase">
            Clock Cycle:
          </span>
          <span className="font-mono text-base font-bold text-[var(--zen-cyan)] px-2 py-0.5 rounded bg-[var(--zen-cyan)]/10 border border-[var(--zen-cyan)]/30">
            CC {cycle}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCycle((c) => Math.max(1, c - 1))}
            disabled={cycle <= 1}
            className="px-3 py-1 rounded border border-[var(--zen-border)] font-mono text-xs text-[var(--zen-frost)] disabled:opacity-30 hover:border-[var(--zen-cyan)]"
          >
            ← PREV CC
          </button>
          <button
            onClick={() => setCycle((c) => Math.min(maxCycles, c + 1))}
            disabled={cycle >= maxCycles}
            className="px-3 py-1 rounded border border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 font-mono text-xs text-[var(--zen-cyan)] font-bold disabled:opacity-30 hover:bg-[var(--zen-cyan)]/25"
          >
            NEXT CC →
          </button>
          <button
            onClick={() => setCycle(1)}
            className="px-2.5 py-1 rounded border border-[var(--zen-border)] font-mono text-xs text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] ml-2"
          >
            RESET
          </button>
        </div>
      </div>

      {/* Pipeline Grid */}
      <div className="overflow-x-auto rounded-lg border border-[var(--zen-border)] mb-5">
        <table className="w-full text-center font-mono text-xs">
          <thead className="bg-[var(--zen-midnight)] text-[var(--zen-ink-muted)] border-b border-[var(--zen-border)]">
            <tr>
              <th className="p-2.5 text-left pl-4">Instruction</th>
              {Array.from({ length: maxCycles }).map((_, i) => (
                <th
                  key={i}
                  className={`p-2.5 min-w-[48px] ${
                    i + 1 === cycle ? "text-[var(--zen-cyan)] font-bold bg-[var(--zen-cyan)]/10" : ""
                  }`}
                >
                  CC{i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {program.map((inst, iIdx) => (
              <tr key={inst.id} className="border-b border-[var(--zen-border)]/50">
                <td className="p-2.5 text-left pl-4 font-bold text-[var(--zen-snow)] bg-[var(--zen-void)]/40 whitespace-nowrap">
                  <span className="text-[var(--zen-cyan)] mr-2">{inst.id}:</span>
                  {inst.asm}
                </td>
                {Array.from({ length: maxCycles }).map((_, cIdx) => {
                  const currentCC = cIdx + 1;
                  const st = getStageAtCycle(iIdx, currentCC);
                  const isCurrentTick = currentCC === cycle;
                  const isStall = st === "-";
                  const isDone = st === "DONE";

                  return (
                    <td
                      key={cIdx}
                      className={`p-2 transition-colors ${
                        isCurrentTick ? "bg-[var(--zen-cyan)]/10 font-bold" : ""
                      }`}
                    >
                      {st !== "-" && !isDone && (
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                            st === "IF"
                              ? "bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/40"
                              : st === "ID"
                              ? "bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/40"
                              : st === "EX"
                              ? "bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/40"
                              : st === "MEM"
                              ? "bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/40"
                              : "bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border-emerald-500/40"
                          }`}
                        >
                          {st}
                        </span>
                      )}
                      {isDone && <span className="text-[10px] text-[var(--zen-ink-dim)]">[OK]</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend & Theoretical Note */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[var(--zen-ink-muted)]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-blue-500/40" /> IF (Fetch)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-purple-500/40" /> ID (Decode)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-amber-500/40" /> EX (Execute)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-rose-500/40" /> MEM (Memory)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500/40" /> WB (Writeback)
          </span>
        </div>
        <div>
          Ideal CPI = 1.0 · Actual Cycles: {program.length + 4}
        </div>
      </div>
    </div>
  );
}
