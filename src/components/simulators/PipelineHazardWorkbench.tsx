"use client";

import { useState, useEffect, useMemo, useId } from "react";
import {
  SimulatorWorkbenchShell,
  type SimulatorPresetOption,
  type SimulatorTelemetryMetric,
  type SimulatorMathematicalInvariant,
} from "./shared/SimulatorWorkbenchShell";

interface PipelineInst {
  id: string;
  asm: string;
  op: "ADD" | "SUB" | "AND" | "OR" | "XOR" | "LW" | "SW" | "BEQ";
  dest: string | null;
  src1: string | null;
  src2: string | null;
  imm?: number;
}

interface PipelinePreset extends SimulatorPresetOption {
  forwardingDefault: boolean;
  instructions: PipelineInst[];
  note: string;
}

const PRESETS: PipelinePreset[] = [
  {
    id: "raw-alu",
    label: "ALU-to-ALU RAW Forwarding",
    description: "I2 & I3 read x1 immediately after ADD writes x1; EX/MEM and MEM/WB bypass paths eliminate stalls.",
    forwardingDefault: true,
    note: "Without forwarding, dependent ALU instructions stall 2 cycles waiting for WB.",
    instructions: [
      { id: "I1", asm: "ADD x1, x2, x3", op: "ADD", dest: "x1", src1: "x2", src2: "x3" },
      { id: "I2", asm: "SUB x4, x1, x5", op: "SUB", dest: "x4", src1: "x1", src2: "x5" },
      { id: "I3", asm: "AND x6, x1, x7", op: "AND", dest: "x6", src1: "x1", src2: "x7" },
      { id: "I4", asm: "OR  x8, x4, x6", op: "OR", dest: "x8", src1: "x4", src2: "x6" },
    ],
  },
  {
    id: "load-use",
    label: "Load-Use Hazard (Bubble)",
    description: "LW reads memory in MEM; ADD needs x1 in EX. Even full hardware forwarding requires 1 stall bubble.",
    forwardingDefault: true,
    note: "Memory data is only valid after MEM stage; MEM/WB -> EX forwarding still costs 1 bubble.",
    instructions: [
      { id: "I1", asm: "LW  x1, 0(x2)", op: "LW", dest: "x1", src1: "x2", src2: null, imm: 40 },
      { id: "I2", asm: "ADD x3, x1, x4", op: "ADD", dest: "x3", src1: "x1", src2: "x4" },
      { id: "I3", asm: "SUB x5, x3, x6", op: "SUB", dest: "x5", src1: "x3", src2: "x6" },
      { id: "I4", asm: "SW  x5, 4(x2)", op: "SW", dest: null, src1: "x5", src2: "x2" },
    ],
  },
  {
    id: "branch-flush",
    label: "Branch Control Hazard Flush",
    description: "Taken BEQ in EX flushes 2 speculatively fetched instructions and redirects PC.",
    forwardingDefault: true,
    note: "Static predict-not-taken pays a 2-cycle flush penalty when branch resolves taken in EX.",
    instructions: [
      { id: "I1", asm: "ADD x1, x2, x3", op: "ADD", dest: "x1", src1: "x2", src2: "x3" },
      { id: "I2", asm: "BEQ x1, x4, TARGET", op: "BEQ", dest: null, src1: "x1", src2: "x4" },
      { id: "I3", asm: "SUB x9, x2, x3 (Spec)", op: "SUB", dest: "x9", src1: "x2", src2: "x3" },
      { id: "I4", asm: "TARGET: XOR x5, x1, x6", op: "XOR", dest: "x5", src1: "x1", src2: "x6" },
    ],
  },
  {
    id: "ilp-clean",
    label: "Hazard-Free ILP Stream",
    description: "Four independent instructions with disjoint register operands achieving ideal CPI = 1.0 + flush.",
    forwardingDefault: true,
    note: "Ideal steady-state throughput reaches 1 instruction retired per clock cycle.",
    instructions: [
      { id: "I1", asm: "ADD x1, x2, x3", op: "ADD", dest: "x1", src1: "x2", src2: "x3" },
      { id: "I2", asm: "SUB x4, x5, x6", op: "SUB", dest: "x4", src1: "x5", src2: "x6" },
      { id: "I3", asm: "AND x7, x8, x9", op: "AND", dest: "x7", src1: "x8", src2: "x9" },
      { id: "I4", asm: "XOR x10, x11, x12", op: "XOR", dest: "x10", src1: "x11", src2: "x12" },
    ],
  },
];

const STAGES = ["IF", "ID", "EX", "MEM", "WB"] as const;

const INITIAL_REGS: Record<string, number> = {
  x0: 0,
  x1: 5,
  x2: 12,
  x3: 8,
  x4: 20,
  x5: 3,
  x6: 15,
  x7: 7,
  x8: 4,
  x9: 9,
  x10: 1,
  x11: 14,
  x12: 6,
};

interface HazardDetection {
  type: "RAW" | "LOAD-USE" | "CONTROL";
  fromId: string;
  toId: string;
  reg: string;
  stalls: number;
  forwardingPath?: string;
}

interface SimulatedTimeline {
  grid: Record<string, string[]>; // instId -> stage at cycle cIdx (1-indexed -> cIdx-1)
  totalCycles: number;
  stallCount: number;
  hazards: HazardDetection[];
  regSnapshots: Record<string, number>[];
}

function simulatePipeline(instructions: PipelineInst[], forwarding: boolean): SimulatedTimeline {
  const maxCycles = 14;
  const stageTimes: { ifC: number; idC: number; exC: number; memC: number; wbC: number; flushedAt?: number }[] = [];
  const hazards: HazardDetection[] = [];

  for (let i = 0; i < instructions.length; i++) {
    const inst = instructions[i];
    let ifCycle = i === 0 ? 1 : stageTimes[i - 1].ifC + 1;

    // Control flush check if prior instruction was taken BEQ
    if (i > 0 && instructions[i - 1].op === "BEQ") {
      // Speculative instruction starts IF immediately, gets flushed when BEQ resolves in EX (prev.exC)
      const beqEx = stageTimes[i - 1].exC;
      stageTimes.push({
        ifC: ifCycle,
        idC: ifCycle + 1,
        exC: 99,
        memC: 99,
        wbC: 99,
        flushedAt: beqEx + 1,
      });
      hazards.push({
        type: "CONTROL",
        fromId: instructions[i - 1].id,
        toId: inst.id,
        reg: "PC",
        stalls: 2,
        forwardingPath: "Branch Target Flush (EX)",
      });
      continue;
    }

    if (i > 1 && instructions[i - 2].op === "BEQ") {
      // Branch target enters IF after BEQ finishes EX
      ifCycle = stageTimes[i - 2].exC + 1;
    }

    let idCycle = ifCycle + 1;

    // Check RAW hazards against previous non-flushed producers i-1 and i-2
    for (const prevIdx of [i - 1, i - 2]) {
      if (prevIdx < 0) continue;
      const prod = instructions[prevIdx];
      const prodT = stageTimes[prevIdx];
      if (!prod.dest || prodT.flushedAt) continue;

      const usesDest = inst.src1 === prod.dest || inst.src2 === prod.dest;
      if (!usesDest) continue;

      if (prod.op === "LW") {
        // Load value ready after MEM stage
        const readyAfter = forwarding ? prodT.memC : prodT.wbC;
        const neededEx = forwarding ? idCycle + 1 : idCycle;
        if (neededEx <= readyAfter) {
          const delta = forwarding ? readyAfter - (idCycle + 1) + 1 : readyAfter - idCycle + 1;
          if (delta > 0) {
            idCycle += delta;
            hazards.push({
              type: "LOAD-USE",
              fromId: prod.id,
              toId: inst.id,
              reg: prod.dest,
              stalls: delta,
              forwardingPath: forwarding ? "MEM/WB -> EX (+1 Bubble)" : "Stall until WB",
            });
          }
        } else if (forwarding) {
          hazards.push({
            type: "RAW",
            fromId: prod.id,
            toId: inst.id,
            reg: prod.dest,
            stalls: 0,
            forwardingPath: "MEM/WB -> EX (Zero-Stall)",
          });
        }
      } else {
        // ALU producer: value ready after EX with forwarding, else after WB
        if (forwarding) {
          const path = prevIdx === i - 1 ? "EX/MEM -> EX Bypass" : "MEM/WB -> EX Bypass";
          hazards.push({
            type: "RAW",
            fromId: prod.id,
            toId: inst.id,
            reg: prod.dest,
            stalls: 0,
            forwardingPath: path,
          });
        } else {
          // Without forwarding, ID cannot pass until producer finishes WB
          const neededId = prodT.wbC + 1;
          if (idCycle < neededId) {
            const delta = neededId - idCycle;
            idCycle = neededId;
            hazards.push({
              type: "RAW",
              fromId: prod.id,
              toId: inst.id,
              reg: prod.dest,
              stalls: delta,
              forwardingPath: "No Bypass (Stall Until WB)",
            });
          }
        }
      }
    }

    const exCycle = idCycle + 1;
    const memCycle = exCycle + 1;
    const wbCycle = memCycle + 1;
    stageTimes.push({ ifC: ifCycle, idC: idCycle, exC: exCycle, memC: memCycle, wbC: wbCycle });
  }

  const grid: Record<string, string[]> = {};
  let stallCount = 0;
  let totalCycles = 1;

  for (let i = 0; i < instructions.length; i++) {
    const inst = instructions[i];
    const t = stageTimes[i];
    const row: string[] = [];

    for (let c = 1; c <= maxCycles; c++) {
      if (t.flushedAt && c >= t.ifC && c <= t.flushedAt) {
        if (c === t.flushedAt) {
          row.push("FLUSH");
          stallCount++;
          totalCycles = Math.max(totalCycles, c);
        } else if (c === t.ifC) {
          row.push("IF");
        } else {
          row.push("ID");
        }
      } else if (t.flushedAt && c > t.flushedAt) {
        row.push("VOID");
      } else if (c === t.ifC) {
        row.push("IF");
      } else if (c > t.ifC && c < t.idC) {
        row.push("STALL");
        stallCount++;
      } else if (c === t.idC) {
        row.push("ID");
      } else if (c === t.exC) {
        row.push("EX");
      } else if (c === t.memC) {
        row.push("MEM");
      } else if (c === t.wbC) {
        row.push("WB");
        totalCycles = Math.max(totalCycles, c);
      } else if (c > t.wbC && !t.flushedAt) {
        row.push("DONE");
      } else {
        row.push("-");
      }
    }
    grid[inst.id] = row;
  }

  // Compute architectural register snapshots at every cycle 0..totalCycles
  const regSnapshots: Record<string, number>[] = [];
  for (let c = 0; c <= maxCycles; c++) {
    const regs = { ...INITIAL_REGS };
    for (let i = 0; i < instructions.length; i++) {
      const inst = instructions[i];
      const t = stageTimes[i];
      if (!inst.dest || t.flushedAt || c < t.wbC) continue;
      const v1 = inst.src1 ? (regs[inst.src1] ?? 0) : 0;
      const v2 = inst.src2 ? (regs[inst.src2] ?? 0) : 0;
      if (inst.op === "ADD") regs[inst.dest] = v1 + v2;
      else if (inst.op === "SUB") regs[inst.dest] = v1 - v2;
      else if (inst.op === "AND") regs[inst.dest] = v1 & v2;
      else if (inst.op === "OR") regs[inst.dest] = v1 | v2;
      else if (inst.op === "XOR") regs[inst.dest] = v1 ^ v2;
      else if (inst.op === "LW") regs[inst.dest] = inst.imm ?? 40;
    }
    regSnapshots.push(regs);
  }

  return { grid, totalCycles, stallCount, hazards, regSnapshots };
}

export function PipelineHazardWorkbench() {
  const forwardingToggleId = useId();
  const [presetId, setPresetId] = useState<string>("raw-alu");
  const [forwarding, setForwarding] = useState<boolean>(true);
  const [cycle, setCycle] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);

  const preset = PRESETS.find((p) => p.id === presetId) || PRESETS[0];

  const sim = useMemo(
    () => simulatePipeline(preset.instructions, forwarding),
    [preset.instructions, forwarding]
  );

  useEffect(() => {
    if (!isPlaying) return;
    const ms = Math.round(900 / speed);
    const id = setInterval(() => {
      setCycle((prev) => {
        if (prev >= sim.totalCycles) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, ms);
    return () => clearInterval(id);
  }, [isPlaying, speed, sim.totalCycles]);

  const activeRegs = sim.regSnapshots[Math.min(cycle, sim.regSnapshots.length - 1)] || INITIAL_REGS;
  const retiredCount = preset.instructions.filter((inst) => {
    const row = sim.grid[inst.id] || [];
    const cur = row[cycle - 1];
    return cur === "WB" || cur === "DONE";
  }).length;

  const actualCpi = (sim.totalCycles / Math.max(1, preset.instructions.length)).toFixed(2);
  const idealCycles = preset.instructions.length + 4;
  const speedup = (
    ((forwarding ? simulatePipeline(preset.instructions, false).totalCycles : sim.totalCycles) /
      Math.max(1, sim.totalCycles))
  ).toFixed(2);

  // Active stage latches at current cycle
  const stageOccupants = STAGES.map((stageName) => {
    const holder = preset.instructions.find((inst) => sim.grid[inst.id]?.[cycle - 1] === stageName);
    return { stageName, holder };
  });

  const metrics: SimulatorTelemetryMetric[] = [
    { label: "Active Clock Cycle", value: `CC ${cycle} / ${sim.totalCycles}`, accent: true },
    { label: "Stall / Flush Cycles", value: sim.stallCount, hint: forwarding ? "Bypass Active" : "No Bypass" },
    { label: "Effective CPI", value: actualCpi, hint: `Ideal Cycles = ${idealCycles}` },
    { label: "Forwarding Speedup", value: `${speedup}x`, hint: `Retired = ${retiredCount}` },
  ];

  const invariants: SimulatorMathematicalInvariant[] = [
    {
      label: "Pipeline Execution CPI",
      latex: "\\text{CPI} = 1 + \\frac{\\text{Stall Cycles} + \\text{Branch Flushes}}{N_{\\text{inst}}}",
      note: "Each unmitigated RAW stall or branch mispredict increases cycles per instruction above 1.0.",
    },
    {
      label: "Pipeline Speedup Law",
      latex: "S = \\frac{k \\cdot N}{k + (N - 1) + \\text{Stalls}}",
      note: `For k = 5 stages and N = ${preset.instructions.length} instructions, asymptotic speedup approaches 5x.`,
    },
  ];

  const handleSelectPreset = (nextId: string) => {
    const nextPreset = PRESETS.find((p) => p.id === nextId) || PRESETS[0];
    setPresetId(nextPreset.id);
    setForwarding(nextPreset.forwardingDefault);
    setCycle(1);
    setIsPlaying(false);
  };

  const stateInspector = (
    <div className="space-y-3 font-mono text-xs">
      {/* Stage Latches */}
      <div>
        <div className="text-[10px] text-[var(--zen-ink-muted)] uppercase mb-1.5">
          STAGE LATCH OCCUPANCY @ CC {cycle}
        </div>
        <div className="grid grid-cols-5 gap-1">
          {stageOccupants.map(({ stageName, holder }) => (
            <div
              key={stageName}
              className={`p-1.5 rounded border text-center ${
                holder
                  ? "border-[var(--zen-cyan)]/50 bg-[var(--zen-cyan)]/10 text-[var(--zen-snow)]"
                  : "border-[var(--zen-border)] bg-[var(--zen-midnight)]/40 text-[var(--zen-ink-dim)]"
              }`}
            >
              <div className="text-[9px] text-[var(--zen-cyan)] font-bold">{stageName}</div>
              <div className="text-[10px] truncate">{holder ? holder.id : "NOP"}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Register File x0..x11 */}
      <div>
        <div className="text-[10px] text-[var(--zen-ink-muted)] uppercase mb-1.5">
          ARCHITECTURAL REGISTER FILE (LIVE WB)
        </div>
        <div className="grid grid-cols-3 gap-1">
          {["x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9"].map((reg) => (
            <div
              key={reg}
              className="px-2 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)]/60 flex justify-between text-[10px]"
            >
              <span className="text-[var(--zen-ink-muted)]">{reg}</span>
              <span className="text-[var(--zen-cyan)] font-bold">{activeRegs[reg]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Detected Hazards */}
      <div>
        <div className="text-[10px] text-[var(--zen-ink-muted)] uppercase mb-1.5">
          HAZARD & BYPASS ANALYSIS
        </div>
        {sim.hazards.length === 0 ? (
          <div className="p-2 rounded border border-emerald-500/30 bg-emerald-500/10 text-[10px] text-emerald-300">
            Zero data/control dependencies detected. Full ILP throughput.
          </div>
        ) : (
          <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
            {sim.hazards.map((h, idx) => (
              <div
                key={`${h.fromId}-${h.toId}-${idx}`}
                className="p-1.5 rounded border border-[var(--zen-border)] bg-[var(--zen-card)] text-[10px] space-y-0.5"
              >
                <div className="flex justify-between font-bold">
                  <span className="text-amber-300">
                    {h.type}: {h.fromId} -&gt; {h.toId} ({h.reg})
                  </span>
                  <span className={h.stalls > 0 ? "text-rose-400" : "text-emerald-400"}>
                    {h.stalls > 0 ? `+${h.stalls} Stall` : "0 Stall"}
                  </span>
                </div>
                {h.forwardingPath && (
                  <div className="text-[9px] text-[var(--zen-ink-muted)]">{h.forwardingPath}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <SimulatorWorkbenchShell
      title="5-Stage RISC-V Pipeline & Hazard Analyzer"
      subtitle="Trace instruction fetch through writeback, inspect RAW/Load-Use/Control hazards, toggle EX/MEM and MEM/WB hardware bypass forwarding, and monitor architectural registers."
      domain="systems"
      courses={["CSARCH1", "CSARCH2", "LBYARCH"]}
      presets={PRESETS}
      activePresetId={presetId}
      onSelectPreset={handleSelectPreset}
      headerActions={
        <div className="flex items-center gap-2">
          <input
            id={forwardingToggleId}
            type="checkbox"
            checked={forwarding}
            onChange={(e) => {
              setForwarding(e.target.checked);
              setCycle(1);
            }}
            className="accent-[var(--zen-cyan)] w-4 h-4"
          />
          <label
            htmlFor={forwardingToggleId}
            className="font-mono text-xs text-[var(--zen-snow)] cursor-pointer select-none"
          >
            Forwarding Bypass ({forwarding ? "ON" : "OFF"})
          </label>
        </div>
      }
      stepping={{
        isPlaying,
        onTogglePlay: () => setIsPlaying((p) => !p),
        onStepBack: () => {
          setIsPlaying(false);
          setCycle((c) => Math.max(1, c - 1));
        },
        onStepForward: () => {
          setIsPlaying(false);
          setCycle((c) => Math.min(sim.totalCycles, c + 1));
        },
        onReset: () => {
          setIsPlaying(false);
          setCycle(1);
        },
        speed,
        onChangeSpeed: setSpeed,
        stepIndex: cycle,
        totalSteps: sim.totalCycles,
        stepLabel: "CC",
        canStepBack: cycle > 1,
        canStepForward: cycle < sim.totalCycles,
      }}
      telemetryMetrics={metrics}
      invariants={invariants}
      stateInspector={stateInspector}
    >
      {/* Cycle-by-Cycle Execution Matrix */}
      <div className="overflow-x-auto rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/75">
        <table className="w-full text-center font-mono text-xs">
          <thead className="bg-[var(--zen-midnight)] text-[var(--zen-ink-muted)] border-b border-[var(--zen-border)]">
            <tr>
              <th className="p-2.5 text-left pl-3">Instruction</th>
              {Array.from({ length: sim.totalCycles }).map((_, idx) => {
                const cc = idx + 1;
                return (
                  <th
                    key={cc}
                    onClick={() => {
                      setIsPlaying(false);
                      setCycle(cc);
                    }}
                    className={`p-2 min-w-[44px] cursor-pointer transition-colors ${
                      cc === cycle
                        ? "text-[var(--zen-cyan)] font-bold bg-[var(--zen-cyan)]/15"
                        : "hover:text-[var(--zen-snow)]"
                    }`}
                  >
                    C{cc}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {preset.instructions.map((inst) => (
              <tr key={inst.id} className="border-b border-[var(--zen-border)]/50">
                <td className="p-2.5 text-left pl-3 font-bold text-[var(--zen-snow)] whitespace-nowrap bg-[var(--zen-midnight)]/40">
                  <span className="text-[var(--zen-cyan)] mr-1.5">{inst.id}</span>
                  {inst.asm}
                </td>
                {Array.from({ length: sim.totalCycles }).map((_, idx) => {
                  const cc = idx + 1;
                  const stage = sim.grid[inst.id]?.[idx] || "-";
                  const isCurrent = cc === cycle;
                  return (
                    <td
                      key={cc}
                      className={`p-1.5 transition-colors ${
                        isCurrent ? "bg-[var(--zen-cyan)]/10" : ""
                      }`}
                    >
                      {stage === "STALL" ? (
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                          BUB
                        </span>
                      ) : stage === "FLUSH" ? (
                        <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-600/25 text-red-300 border border-red-500/50">
                          FLS
                        </span>
                      ) : stage === "DONE" || stage === "VOID" ? (
                        <span className="text-[10px] text-[var(--zen-ink-dim)]">
                          {stage === "VOID" ? "x" : "OK"}
                        </span>
                      ) : stage !== "-" ? (
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                            stage === "IF"
                              ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
                              : stage === "ID"
                              ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                              : stage === "EX"
                              ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                              : stage === "MEM"
                              ? "bg-pink-500/20 text-pink-300 border-pink-500/40"
                              : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                          }`}
                        >
                          {stage}
                        </span>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stage Legend & Hardware Bypass Explanation */}
      <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/50 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[var(--zen-ink-muted)]">
        <div className="flex flex-wrap gap-3">
          <span>[IF] Fetch</span>
          <span>[ID] Decode/RegRead</span>
          <span>[EX] ALU</span>
          <span>[MEM] D-Cache</span>
          <span>[WB] Writeback</span>
          <span className="text-rose-300">[BUB] Stall Bubble</span>
        </div>
        <span className="text-[var(--zen-cyan)]">{preset.note}</span>
      </div>
    </SimulatorWorkbenchShell>
  );
}
