"use client";

import { useState, useEffect, useMemo, useId } from "react";
import {
  SimulatorWorkbenchShell,
  type SimulatorPresetOption,
  type SimulatorTelemetryMetric,
  type SimulatorMathematicalInvariant,
} from "./shared/SimulatorWorkbenchShell";

type MachineKind = "DFA" | "TM";

interface TransitionRule {
  from: string;
  read: string;
  to: string;
  write?: string;
  move?: "L" | "R" | "S";
}

interface StateNodeLayout {
  id: string;
  label: string;
  x: number;
  y: number;
  accepting?: boolean;
  rejecting?: boolean;
}

interface AutomataPreset extends SimulatorPresetOption {
  kind: MachineKind;
  defaultTape: string;
  states: StateNodeLayout[];
  acceptStates: string[];
  transitions: TransitionRule[];
  formalTuple: string;
}

const PRESETS: AutomataPreset[] = [
  {
    id: "dfa-even",
    label: "DFA: Even Number of 1s & 0s",
    description: "4-state product automaton tracking parity of both 0s and 1s over Sigma={0, 1}.",
    kind: "DFA",
    defaultTape: "10100110",
    acceptStates: ["q00"],
    formalTuple: "Q={q_{00}, q_{01}, q_{10}, q_{11}},\\; \\Sigma=\\{0,1\\},\\; F=\\{q_{00}\\}",
    states: [
      { id: "q00", label: "q00", x: 110, y: 50, accepting: true },
      { id: "q01", label: "q01", x: 310, y: 50 },
      { id: "q10", label: "q10", x: 110, y: 145 },
      { id: "q11", label: "q11", x: 310, y: 145 },
    ],
    transitions: [
      { from: "q00", read: "1", to: "q01" },
      { from: "q01", read: "1", to: "q00" },
      { from: "q00", read: "0", to: "q10" },
      { from: "q10", read: "0", to: "q00" },
      { from: "q01", read: "0", to: "q11" },
      { from: "q11", read: "0", to: "q01" },
      { from: "q10", read: "1", to: "q11" },
      { from: "q11", read: "1", to: "q10" },
    ],
  },
  {
    id: "dfa-div3",
    label: "DFA: Binary Divisible by 3",
    description: "Remainder-modulo-3 finite transducer reading MSB-first binary strings.",
    kind: "DFA",
    defaultTape: "11011",
    acceptStates: ["q0"],
    formalTuple: "Q=\\{q_0, q_1, q_2\\},\\; \\delta(q_r, b) = q_{(2r + b) \\bmod 3},\\; F=\\{q_0\\}",
    states: [
      { id: "q0", label: "r=0", x: 90, y: 95, accepting: true },
      { id: "q1", label: "r=1", x: 230, y: 50 },
      { id: "q2", label: "r=2", x: 230, y: 145 },
    ],
    transitions: [
      { from: "q0", read: "0", to: "q0" },
      { from: "q0", read: "1", to: "q1" },
      { from: "q1", read: "0", to: "q2" },
      { from: "q1", read: "1", to: "q0" },
      { from: "q2", read: "0", to: "q1" },
      { from: "q2", read: "1", to: "q2" },
    ],
  },
  {
    id: "tm-palindrome",
    label: "Turing Machine: Palindrome Checker",
    description: "Crosses off matching outermost symbols (0/1 -> X) using bidirectional tape head sweeps.",
    kind: "TM",
    defaultTape: "0110",
    acceptStates: ["q_acc"],
    formalTuple: "M=(Q,\\{0,1\\},\\{0,1,X,\\sqcup\\},\\delta,q_0,q_{\\text{acc}},q_{\\text{rej}})",
    states: [
      { id: "q0", label: "q0", x: 65, y: 95 },
      { id: "q1", label: "q1(0)", x: 170, y: 45 },
      { id: "q2", label: "q2(1)", x: 170, y: 145 },
      { id: "q3", label: "q3(L)", x: 280, y: 95 },
      { id: "q_acc", label: "ACC", x: 385, y: 55, accepting: true },
      { id: "q_rej", label: "REJ", x: 385, y: 140, rejecting: true },
    ],
    transitions: [
      { from: "q0", read: "0", write: "X", move: "R", to: "q1" },
      { from: "q0", read: "1", write: "X", move: "R", to: "q2" },
      { from: "q0", read: "X", write: "X", move: "R", to: "q0" },
      { from: "q0", read: "_", write: "_", move: "S", to: "q_acc" },
      { from: "q1", read: "0", write: "0", move: "R", to: "q1" },
      { from: "q1", read: "1", write: "1", move: "R", to: "q1" },
      { from: "q1", read: "X", write: "X", move: "L", to: "q1b" },
      { from: "q1", read: "_", write: "_", move: "L", to: "q1b" },
      { from: "q1b", read: "0", write: "X", move: "L", to: "q3" },
      { from: "q1b", read: "X", write: "X", move: "S", to: "q_acc" },
      { from: "q1b", read: "1", write: "1", move: "S", to: "q_rej" },
      { from: "q2", read: "0", write: "0", move: "R", to: "q2" },
      { from: "q2", read: "1", write: "1", move: "R", to: "q2" },
      { from: "q2", read: "X", write: "X", move: "L", to: "q2b" },
      { from: "q2", read: "_", write: "_", move: "L", to: "q2b" },
      { from: "q2b", read: "1", write: "X", move: "L", to: "q3" },
      { from: "q2b", read: "X", write: "X", move: "S", to: "q_acc" },
      { from: "q2b", read: "0", write: "0", move: "S", to: "q_rej" },
      { from: "q3", read: "0", write: "0", move: "L", to: "q3" },
      { from: "q3", read: "1", write: "1", move: "L", to: "q3" },
      { from: "q3", read: "X", write: "X", move: "R", to: "q0" },
    ],
  },
  {
    id: "tm-inc",
    label: "Turing Machine: Binary Incrementer (+1)",
    description: "Scans to LSB right boundary, propagates carry left converting trailing 1s to 0s, halts in q_acc.",
    kind: "TM",
    defaultTape: "1011",
    acceptStates: ["q_acc"],
    formalTuple: "x \\mapsto x + 1 \\pmod{2^{n+1}},\\; \\Gamma=\\{0,1,\\sqcup\\}",
    states: [
      { id: "q0", label: "ScanR", x: 90, y: 95 },
      { id: "q_carry", label: "Carry", x: 230, y: 95 },
      { id: "q_acc", label: "HALT", x: 370, y: 95, accepting: true },
    ],
    transitions: [
      { from: "q0", read: "0", write: "0", move: "R", to: "q0" },
      { from: "q0", read: "1", write: "1", move: "R", to: "q0" },
      { from: "q0", read: "_", write: "_", move: "L", to: "q_carry" },
      { from: "q_carry", read: "1", write: "0", move: "L", to: "q_carry" },
      { from: "q_carry", read: "0", write: "1", move: "S", to: "q_acc" },
      { from: "q_carry", read: "_", write: "1", move: "S", to: "q_acc" },
    ],
  },
];

interface TapeSnapshot {
  step: number;
  state: string;
  tape: string[];
  head: number;
  ruleApplied: string;
  status: "RUNNING" | "ACCEPTED" | "REJECTED";
}

function simulateAutomaton(preset: AutomataPreset, rawInput: string): TapeSnapshot[] {
  const clean = rawInput.replace(/[^01]/g, "");
  const initialChars = clean.length > 0 ? clean.split("") : ["0"];
  const tape = ["_", ...initialChars, "_", "_"];
  let head = 1;
  let state = preset.states[0].id;
  const snapshots: TapeSnapshot[] = [
    {
      step: 0,
      state,
      tape: [...tape],
      head,
      ruleApplied: "Initial configuration at start state q0",
      status: "RUNNING",
    },
  ];

  for (let iter = 1; iter <= 90; iter++) {
    if (preset.kind === "DFA") {
      if (head > initialChars.length) {
        const accepted = preset.acceptStates.includes(state);
        snapshots[snapshots.length - 1].status = accepted ? "ACCEPTED" : "REJECTED";
        break;
      }
      const sym = tape[head];
      const rule = preset.transitions.find((t) => t.from === state && t.read === sym);
      if (!rule) {
        snapshots.push({
          step: iter,
          state: "q_rej",
          tape: [...tape],
          head,
          ruleApplied: `No transition from ${state} on '${sym}' -> REJECT`,
          status: "REJECTED",
        });
        break;
      }
      state = rule.to;
      head += 1;
      const done = head > initialChars.length;
      const accepted = done && preset.acceptStates.includes(state);
      snapshots.push({
        step: iter,
        state,
        tape: [...tape],
        head,
        ruleApplied: `d(${rule.from}, '${sym}') -> ${rule.to}`,
        status: done ? (accepted ? "ACCEPTED" : "REJECTED") : "RUNNING",
      });
      if (done) break;
    } else {
      if (state === "q_acc" || state === "q_rej") break;
      const sym = tape[head] || "_";
      const rule = preset.transitions.find((t) => t.from === state && t.read === sym);
      if (!rule) {
        snapshots.push({
          step: iter,
          state: "q_rej",
          tape: [...tape],
          head,
          ruleApplied: `Halt: missing rule (${state}, '${sym}')`,
          status: "REJECTED",
        });
        break;
      }
      tape[head] = rule.write ?? sym;
      if (rule.move === "R") head += 1;
      else if (rule.move === "L") head = Math.max(0, head - 1);
      if (head >= tape.length) tape.push("_");
      state = rule.to;
      const status: TapeSnapshot["status"] =
        state === "q_acc" ? "ACCEPTED" : state === "q_rej" ? "REJECTED" : "RUNNING";
      snapshots.push({
        step: iter,
        state,
        tape: [...tape],
        head,
        ruleApplied: `d(${rule.from}, ${sym}) -> (${rule.to}, ${rule.write}, ${rule.move})`,
        status,
      });
      if (status !== "RUNNING") break;
    }
  }

  return snapshots;
}

export function AutomataTapeWorkbench() {
  const tapeInputId = useId();
  const [presetId, setPresetId] = useState<string>("dfa-even");
  const [tapeInput, setTapeInput] = useState<string>(PRESETS[0].defaultTape);
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);

  const preset = PRESETS.find((p) => p.id === presetId) || PRESETS[0];

  const trace = useMemo(() => simulateAutomaton(preset, tapeInput), [preset, tapeInput]);
  const clampedStep = Math.min(stepIdx, trace.length - 1);
  const current = trace[clampedStep] || trace[0];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStepIdx((prev) => {
        if (prev >= trace.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, Math.round(700 / speed));
    return () => clearInterval(timer);
  }, [isPlaying, speed, trace.length]);

  const handleSelectPreset = (nextId: string) => {
    const p = PRESETS.find((pr) => pr.id === nextId) || PRESETS[0];
    setPresetId(p.id);
    setTapeInput(p.defaultTape);
    setStepIdx(0);
    setIsPlaying(false);
  };

  const finalStatus = trace[trace.length - 1]?.status || "RUNNING";

  const metrics: SimulatorTelemetryMetric[] = [
    { label: "Automaton Model", value: preset.kind === "DFA" ? "Deterministic FA" : "Single-Tape TM", accent: true },
    { label: "Current State", value: current.state },
    { label: "Head Index", value: current.head, hint: `Symbol='${current.tape[current.head] || "_"}'` },
    { label: "Final Verdict", value: finalStatus, hint: `${trace.length - 1} Total Steps` },
  ];

  const invariants: SimulatorMathematicalInvariant[] = [
    {
      label: "Formal Automaton Tuple",
      latex: preset.formalTuple,
      note: "Transition determinism requires unique outgoing rule for each (state, symbol) pair.",
    },
    {
      label: "Turing Configuration",
      latex: "C_i = (q_i,\\; u\\cdot \\underline{a}\\cdot v) \\vdash C_{i+1}",
      note: "Each transition updates control state, rewrites tape cell under head, and shifts head.",
    },
  ];

  const stateInspector = (
    <div className="space-y-3 font-mono text-xs">
      <div className="p-2.5 rounded border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/10 text-[11px] text-[var(--zen-snow)]">
        {current.ruleApplied}
      </div>

      <div>
        <div className="text-[10px] text-[var(--zen-ink-muted)] uppercase mb-1">
          TRANSITION TABLE DELTA
        </div>
        <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
          {preset.transitions.slice(0, 12).map((tr, idx) => (
            <div
              key={`${tr.from}-${tr.read}-${idx}`}
              className="px-2 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)]/60 flex justify-between text-[10px]"
            >
              <span>
                ({tr.from}, &apos;{tr.read}&apos;)
              </span>
              <span className="text-[var(--zen-cyan)] font-bold">
                -&gt; {tr.to}
                {preset.kind === "TM" ? ` [${tr.write},${tr.move}]` : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <SimulatorWorkbenchShell
      title="Finite Automata & Turing Tape Machine Lab"
      subtitle="Test binary strings on Deterministic Finite Automata and writable Single-Tape Turing Machines with live head stepping and state graph tracing."
      domain="theory"
      courses={["CSALGCM", "CCICOMP", "CSMODEL"]}
      presets={PRESETS}
      activePresetId={presetId}
      onSelectPreset={handleSelectPreset}
      stepping={{
        isPlaying,
        onTogglePlay: () => setIsPlaying((p) => !p),
        onStepBack: () => {
          setIsPlaying(false);
          setStepIdx((s) => Math.max(0, s - 1));
        },
        onStepForward: () => {
          setIsPlaying(false);
          setStepIdx((s) => Math.min(trace.length - 1, s + 1));
        },
        onReset: () => {
          setIsPlaying(false);
          setStepIdx(0);
        },
        speed,
        onChangeSpeed: setSpeed,
        stepIndex: clampedStep,
        totalSteps: trace.length - 1,
        stepLabel: "STEP",
        canStepBack: clampedStep > 0,
        canStepForward: clampedStep < trace.length - 1,
      }}
      telemetryMetrics={metrics}
      invariants={invariants}
      stateInspector={stateInspector}
    >
      {/* Input String Control */}
      <div className="flex flex-wrap items-center gap-3 p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs">
        <label htmlFor={tapeInputId} className="text-[var(--zen-ink-muted)] uppercase shrink-0">
          INPUT TAPE (0/1):
        </label>
        <input
          id={tapeInputId}
          aria-label="Binary tape input string"
          type="text"
          maxLength={16}
          value={tapeInput}
          onChange={(e) => {
            setTapeInput(e.target.value.replace(/[^01]/g, ""));
            setStepIdx(0);
          }}
          className="flex-1 min-w-[160px] px-3 py-1.5 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)] text-[var(--zen-snow)] tracking-widest"
          placeholder="e.g. 10110"
        />
      </div>

      {/* Interactive Tape Head Cells */}
      <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/75 space-y-2">
        <div className="flex justify-between text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase">
          <span>INFINITE READ/WRITE TAPE (UNDERSCORE = BLANK)</span>
          <span
            className={
              current.status === "ACCEPTED"
                ? "text-emerald-400 font-bold"
                : current.status === "REJECTED"
                ? "text-rose-400 font-bold"
                : "text-[var(--zen-cyan)]"
            }
          >
            {current.status}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-2">
          {current.tape.map((cell, idx) => {
            const isHead = idx === current.head;
            return (
              <div
                key={idx}
                className={`w-10 h-12 shrink-0 rounded-lg border flex flex-col items-center justify-center font-mono transition-all ${
                  isHead
                    ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold ring-2 ring-[var(--zen-cyan)]/40"
                    : "border-[var(--zen-border)] bg-[var(--zen-midnight)]/60 text-[var(--zen-ink-muted)]"
                }`}
              >
                <span className="text-sm">{cell}</span>
                <span className="text-[8px] opacity-70">{isHead ? "^HD" : idx}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* SVG State Transition Diagram */}
      <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/80">
        <svg viewBox="0 0 460 190" className="w-full h-48 overflow-visible font-mono">
          {preset.transitions.map((tr, idx) => {
            const s1 = preset.states.find((s) => s.id === tr.from);
            const s2 = preset.states.find((s) => s.id === tr.to);
            if (!s1 || !s2) return null;
            if (s1.id === s2.id) {
              return (
                <circle
                  key={`self-${idx}`}
                  cx={s1.x}
                  cy={s1.y - 24}
                  r="11"
                  fill="none"
                  stroke="var(--zen-border)"
                  strokeWidth="1.2"
                />
              );
            }
            return (
              <line
                key={`edge-${idx}`}
                x1={s1.x}
                y1={s1.y}
                x2={s2.x}
                y2={s2.y}
                stroke={current.state === tr.to ? "var(--zen-cyan)" : "var(--zen-border)"}
                strokeWidth="1.4"
              />
            );
          })}

          {preset.states.map((st) => {
            const isActive =
              current.state === st.id ||
              (st.id === "q1" && current.state === "q1b") ||
              (st.id === "q2" && current.state === "q2b");
            return (
              <g key={st.id}>
                {st.accepting && (
                  <circle
                    cx={st.x}
                    cy={st.y}
                    r="23"
                    fill="none"
                    stroke={isActive ? "var(--zen-cyan)" : "#10B981"}
                    strokeWidth="1.3"
                  />
                )}
                <circle
                  cx={st.x}
                  cy={st.y}
                  r="19"
                  fill={
                    isActive
                      ? "var(--zen-cyan)"
                      : st.rejecting
                      ? "rgba(239,68,68,0.18)"
                      : "var(--zen-midnight)"
                  }
                  stroke={isActive ? "#FFFFFF" : st.accepting ? "#10B981" : "var(--zen-border)"}
                  strokeWidth="2"
                />
                <text
                  x={st.x}
                  y={st.y + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="bold"
                  fill={isActive ? "#05080F" : "var(--zen-snow)"}
                >
                  {st.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </SimulatorWorkbenchShell>
  );
}
