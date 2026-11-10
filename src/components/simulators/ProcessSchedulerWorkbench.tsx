"use client";

import { useState } from "react";

export interface Process {
  id: string;
  name: string;
  arrival: number;
  burst: number;
  priority: number;
  color: string;
}

const PALETTE = [
  "#0284C7",
  "#DC2626",
  "#059669",
  "#D97706",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#F97316",
];

const DEFAULT_PROCESSES: Process[] = [
  { id: "P1", name: "P1", arrival: 0, burst: 6, priority: 2, color: "#0284C7" },
  { id: "P2", name: "P2", arrival: 2, burst: 4, priority: 1, color: "#DC2626" },
  { id: "P3", name: "P3", arrival: 4, burst: 8, priority: 4, color: "#059669" },
  { id: "P4", name: "P4", arrival: 5, burst: 3, priority: 3, color: "#D97706" },
];

const PRESETS: { name: string; processes: Process[] }[] = [
  {
    name: "Standard Set",
    processes: [
      { id: "P1", name: "P1", arrival: 0, burst: 6, priority: 2, color: "#0284C7" },
      { id: "P2", name: "P2", arrival: 2, burst: 4, priority: 1, color: "#DC2626" },
      { id: "P3", name: "P3", arrival: 4, burst: 8, priority: 4, color: "#059669" },
      { id: "P4", name: "P4", arrival: 5, burst: 3, priority: 3, color: "#D97706" },
    ],
  },
  {
    name: "Convoy Effect",
    processes: [
      { id: "P1", name: "P1", arrival: 0, burst: 24, priority: 1, color: "#0284C7" },
      { id: "P2", name: "P2", arrival: 1, burst: 3, priority: 2, color: "#DC2626" },
      { id: "P3", name: "P3", arrival: 2, burst: 3, priority: 3, color: "#059669" },
    ],
  },
  {
    name: "Simultaneous",
    processes: [
      { id: "P1", name: "P1", arrival: 0, burst: 5, priority: 3, color: "#0284C7" },
      { id: "P2", name: "P2", arrival: 0, burst: 3, priority: 1, color: "#DC2626" },
      { id: "P3", name: "P3", arrival: 0, burst: 8, priority: 4, color: "#059669" },
      { id: "P4", name: "P4", arrival: 0, burst: 6, priority: 2, color: "#D97706" },
    ],
  },
  {
    name: "Priority Contrast",
    processes: [
      { id: "P1", name: "P1", arrival: 0, burst: 8, priority: 3, color: "#0284C7" },
      { id: "P2", name: "P2", arrival: 1, burst: 4, priority: 1, color: "#DC2626" },
      { id: "P3", name: "P3", arrival: 2, burst: 9, priority: 4, color: "#059669" },
      { id: "P4", name: "P4", arrival: 3, burst: 5, priority: 2, color: "#D97706" },
    ],
  },
];

type Algorithm = "FCFS" | "SJF" | "RR" | "Priority";

export function ProcessSchedulerWorkbench() {
  const [algo, setAlgo] = useState<Algorithm>("FCFS");
  const [quantum, setQuantum] = useState(2);
  const [processes, setProcesses] = useState<Process[]>(DEFAULT_PROCESSES);

  const updateProcess = (id: string, field: "arrival" | "burst" | "priority", val: number) => {
    setProcesses((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const clean = Math.max(0, isNaN(val) ? 0 : val);
        if (field === "burst") {
          return { ...p, burst: Math.max(1, clean) };
        }
        return { ...p, [field]: clean };
      })
    );
  };

  const addProcess = () => {
    if (processes.length >= 8) return;
    const nextIdx = processes.length + 1;
    const color = PALETTE[(nextIdx - 1) % PALETTE.length];
    const newP: Process = {
      id: `P${nextIdx}`,
      name: `P${nextIdx}`,
      arrival: 0,
      burst: 4,
      priority: Math.min(nextIdx, 5),
      color,
    };
    setProcesses((prev) => [...prev, newP]);
  };

  const removeProcess = (id: string) => {
    if (processes.length <= 2) return;
    setProcesses((prev) => prev.filter((p) => p.id !== id));
  };

  const resetDefaults = () => {
    setProcesses(DEFAULT_PROCESSES);
    setAlgo("FCFS");
    setQuantum(2);
  };

  const loadPreset = (preset: { name: string; processes: Process[] }) => {
    setProcesses(preset.processes.map((p) => ({ ...p })));
  };

  // Compute Gantt Chart & metrics
  const computeSchedule = () => {
    const gantt: { pid: string; start: number; end: number; color: string }[] = [];
    const n = processes.length;
    if (n === 0) {
      return { gantt: [], stats: [], avgTurnaround: "0.00", avgWaiting: "0.00", totalTime: 0 };
    }

    const remaining = processes.map((p) => ({ ...p, rem: p.burst }));
    const completion: Record<string, number> = {};
    let time = 0;

    if (algo === "FCFS") {
      const sorted = [...processes].sort((a, b) => a.arrival - b.arrival || a.id.localeCompare(b.id));
      sorted.forEach((p) => {
        if (time < p.arrival) time = p.arrival;
        const start = time;
        time += p.burst;
        gantt.push({ pid: p.id, start, end: time, color: p.color });
        completion[p.id] = time;
      });
    } else if (algo === "SJF") {
      let completed = 0;
      while (completed < n && time < 1000) {
        const available = remaining.filter((p) => p.arrival <= time && p.rem > 0);
        if (available.length === 0) {
          const unstarted = remaining.filter((p) => p.rem > 0);
          if (unstarted.length > 0) {
            time = Math.min(...unstarted.map((p) => p.arrival));
          } else {
            break;
          }
          continue;
        }
        available.sort((a, b) => a.rem - b.rem || a.arrival - b.arrival);
        const p = available[0];
        const start = time;
        time += p.rem;
        p.rem = 0;
        gantt.push({ pid: p.id, start, end: time, color: p.color });
        completion[p.id] = time;
        completed++;
      }
    } else if (algo === "Priority") {
      let completed = 0;
      while (completed < n && time < 1000) {
        const available = remaining.filter((p) => p.arrival <= time && p.rem > 0);
        if (available.length === 0) {
          const unstarted = remaining.filter((p) => p.rem > 0);
          if (unstarted.length > 0) {
            time = Math.min(...unstarted.map((p) => p.arrival));
          } else {
            break;
          }
          continue;
        }
        // Lower priority number represents higher scheduling priority
        available.sort((a, b) => a.priority - b.priority || a.arrival - b.arrival);
        const p = available[0];
        const start = time;
        time += p.rem;
        p.rem = 0;
        gantt.push({ pid: p.id, start, end: time, color: p.color });
        completion[p.id] = time;
        completed++;
      }
    } else {
      // Round Robin
      let completed = 0;
      const queue: typeof remaining = [];
      const visited = new Set<string>();

      const checkNewArrivals = (t: number) => {
        remaining.forEach((p) => {
          if (p.arrival <= t && p.rem > 0 && !visited.has(p.id) && !queue.some((q) => q.id === p.id)) {
            queue.push(p);
            visited.add(p.id);
          }
        });
      };

      checkNewArrivals(time);

      while (completed < n && time < 1000) {
        if (queue.length === 0) {
          const unstarted = remaining.filter((p) => p.rem > 0);
          if (unstarted.length > 0) {
            const minArr = Math.min(...unstarted.map((p) => p.arrival));
            time = Math.max(time + 1, minArr);
            checkNewArrivals(time);
          } else {
            break;
          }
          continue;
        }

        const current = queue.shift()!;
        const execTime = Math.min(quantum, current.rem);
        const start = time;
        time += execTime;
        current.rem -= execTime;

        gantt.push({ pid: current.id, start, end: time, color: current.color });

        checkNewArrivals(time);

        if (current.rem > 0) {
          queue.push(current);
        } else {
          completion[current.id] = time;
          completed++;
        }
      }
    }

    // Calculate metrics
    const stats = processes.map((p) => {
      const finish = completion[p.id] || 0;
      const turnaround = Math.max(0, finish - p.arrival);
      const waiting = Math.max(0, turnaround - p.burst);
      return { id: p.id, finish, turnaround, waiting };
    });

    const avgTurnaround = (stats.reduce((acc, s) => acc + s.turnaround, 0) / n).toFixed(2);
    const avgWaiting = (stats.reduce((acc, s) => acc + s.waiting, 0) / n).toFixed(2);

    return { gantt, stats, avgTurnaround, avgWaiting, totalTime: time };
  };

  const { gantt, stats, avgTurnaround, avgWaiting, totalTime } = computeSchedule();

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card text-[var(--zen-frost)]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[var(--zen-border)] pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
            OPERATING SYSTEMS // CSOPESY
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[var(--zen-snow)] tracking-wider uppercase">
            CPU Process Scheduling Studio
          </h4>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(["FCFS", "SJF", "RR", "Priority"] as Algorithm[]).map((a) => (
            <button
              key={a}
              onClick={() => setAlgo(a)}
              className={`px-3 py-1 font-mono text-xs rounded border transition-all ${
                algo === a
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold shadow-[0_0_10px_rgba(0,229,255,0.25)]"
                  : "border-transparent text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:bg-[var(--zen-card-hover)]"
              }`}
            >
              {a === "RR" ? "Round Robin" : a}
            </button>
          ))}
          {algo === "RR" && (
            <div className="flex items-center gap-1.5 ml-2">
              <span className="text-xs font-mono text-[var(--zen-ink-muted)]">Q:</span>
              <input
                type="number"
                min="1"
                max="20"
                value={quantum}
                onChange={(e) => setQuantum(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-14 px-2 py-0.5 rounded border border-[var(--zen-border)] bg-[var(--zen-void)] text-xs font-mono text-center text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
                title="Time Quantum"
              />
            </div>
          )}
        </div>
      </div>

      {/* Presets and Management Controls */}
      <div className="mb-5 p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono uppercase text-[var(--zen-ink-muted)]">Presets:</span>
          {PRESETS.map((pr) => (
            <button
              key={pr.name}
              onClick={() => loadPreset(pr)}
              className="px-2.5 py-1 text-xs font-mono rounded border border-[var(--zen-border)] bg-[var(--zen-card)] hover:border-[var(--zen-cyan)] hover:text-[var(--zen-snow)] transition-colors"
            >
              {pr.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={addProcess}
            disabled={processes.length >= 8}
            className="px-3 py-1 text-xs font-mono rounded border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold"
          >
            + Add Process
          </button>
          <button
            onClick={resetDefaults}
            className="px-3 py-1 text-xs font-mono rounded border border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:border-[var(--zen-cyan)] transition-colors"
          >
            Reset Defaults
          </button>
        </div>
      </div>

      {/* Visual Gantt Chart */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-xs font-mono font-bold text-[var(--zen-snow)] uppercase mb-2">
          <span>Execution Gantt Timeline ({algo}{algo === "RR" ? ` Q=${quantum}` : ""})</span>
          <span className="text-[10px] text-[var(--zen-ink-muted)] font-normal">
            Total Span: {totalTime}ms
          </span>
        </div>
        <div className="h-12 w-full rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)] flex overflow-hidden">
          {gantt.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center font-mono text-xs text-[var(--zen-ink-muted)]">
              No processes scheduled.
            </div>
          ) : (
            gantt.map((block, idx) => {
              const widthPct = Math.max(1, ((block.end - block.start) / Math.max(totalTime, 1)) * 100);
              return (
                <div
                  key={idx}
                  className="h-full border-r border-[var(--zen-border)]/50 flex flex-col items-center justify-center relative transition-all group"
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: `${block.color}22`,
                  }}
                  title={`${block.pid}: ${block.start}ms to ${block.end}ms`}
                >
                  <span className="font-mono text-xs font-bold" style={{ color: block.color }}>
                    {block.pid}
                  </span>
                  <span className="text-[9px] font-mono text-[var(--zen-ink-muted)] leading-tight">
                    {block.end - block.start}ms
                  </span>
                </div>
              );
            })
          )}
        </div>
        {/* Timeline Ticks */}
        <div className="flex justify-between font-mono text-[10px] text-[var(--zen-ink-muted)] mt-1 px-1">
          <span>0ms</span>
          <span>{Math.round(totalTime / 2)}ms</span>
          <span>{totalTime}ms</span>
        </div>
      </div>

      {/* Performance Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 text-center">
          <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase block">
            Avg Turnaround Time
          </span>
          <span className="text-lg font-mono font-bold text-[var(--zen-cyan)]">
            {avgTurnaround}ms
          </span>
        </div>
        <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 text-center">
          <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase block">
            Avg Waiting Time
          </span>
          <span className="text-lg font-mono font-bold text-emerald-700 dark:text-emerald-400">
            {avgWaiting}ms
          </span>
        </div>
        <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 text-center">
          <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase block">
            Active Mode
          </span>
          <span className="text-sm font-mono font-bold text-[var(--zen-snow)]">
            {algo} {algo === "RR" ? `(Q=${quantum})` : ""}
          </span>
        </div>
        <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 text-center">
          <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase block">
            Total Elapsed
          </span>
          <span className="text-lg font-mono font-bold text-amber-700 dark:text-amber-400">
            {totalTime}ms
          </span>
        </div>
      </div>

      {/* Process Custom Inputs Table */}
      <div className="overflow-x-auto rounded-lg border border-[var(--zen-border)]">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-[var(--zen-midnight)] text-[var(--zen-ink-muted)] border-b border-[var(--zen-border)]">
            <tr>
              <th className="p-2.5">Process</th>
              <th className="p-2.5">Arrival (AT)</th>
              <th className="p-2.5">Burst (BT)</th>
              <th className="p-2.5">Priority</th>
              <th className="p-2.5">Completion (CT)</th>
              <th className="p-2.5 text-[var(--zen-cyan)]">Turnaround (TAT)</th>
              <th className="p-2.5 text-emerald-700 dark:text-emerald-400">Waiting (WT)</th>
              <th className="p-2.5 text-right pr-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((p) => {
              const s = stats.find((item) => item.id === p.id) || {
                finish: 0,
                turnaround: 0,
                waiting: 0,
              };
              return (
                <tr key={p.id} className="border-b border-[var(--zen-border)]/50 hover:bg-[var(--zen-void)]/30">
                  <td className="p-2.5 font-bold" style={{ color: p.color }}>
                    {p.name}
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={p.arrival}
                      onChange={(e) => updateProcess(p.id, "arrival", parseInt(e.target.value, 10))}
                      className="w-16 px-2 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-void)] text-xs font-mono text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={p.burst}
                      onChange={(e) => updateProcess(p.id, "burst", parseInt(e.target.value, 10))}
                      className="w-16 px-2 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-void)] text-xs font-mono text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      min="1"
                      max="9"
                      value={p.priority}
                      onChange={(e) => updateProcess(p.id, "priority", parseInt(e.target.value, 10))}
                      className="w-14 px-2 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-void)] text-xs font-mono text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
                      title="Lower value indicates higher priority"
                    />
                  </td>
                  <td className="p-2.5">{s.finish}ms</td>
                  <td className="p-2.5 font-bold text-[var(--zen-cyan)]">{s.turnaround}ms</td>
                  <td className="p-2.5 font-bold text-emerald-700 dark:text-emerald-400">{s.waiting}ms</td>
                  <td className="p-2 text-right pr-3">
                    <button
                      onClick={() => removeProcess(p.id)}
                      disabled={processes.length <= 2}
                      className="px-2 py-0.5 rounded text-[10px] border border-red-500/30 text-red-400 hover:bg-red-500/10 disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                      title="Remove process"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between text-[11px] font-mono text-[var(--zen-ink-muted)]">
        <div>Editable inputs: customize Arrival Time, Burst Time, and Priority per process row.</div>
        <div className="text-[var(--zen-cyan)]">TAT = CT - AT · WT = TAT - BT</div>
      </div>
    </div>
  );
}