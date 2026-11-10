"use client";

import { useState } from "react";

type GateType = "AND" | "OR" | "NOT" | "NAND" | "NOR" | "XOR" | "XNOR";

export function LogicGateWorkbench() {
  const [gate, setGate] = useState<GateType>("AND");
  const [inputA, setInputA] = useState<number>(1);
  const [inputB, setInputB] = useState<number>(0);

  const evalGate = (g: GateType, a: number, b: number): number => {
    switch (g) {
      case "AND":
        return a & b;
      case "OR":
        return a | b;
      case "NOT":
        return a === 1 ? 0 : 1;
      case "NAND":
        return (a & b) === 1 ? 0 : 1;
      case "NOR":
        return (a | b) === 1 ? 0 : 1;
      case "XOR":
        return a ^ b;
      case "XNOR":
        return (a ^ b) === 1 ? 0 : 1;
    }
  };

  const output = evalGate(gate, inputA, inputB);

  // Truth table generator
  const truthRows =
    gate === "NOT"
      ? [
          { a: 0, b: "-", out: evalGate("NOT", 0, 0) },
          { a: 1, b: "-", out: evalGate("NOT", 1, 0) },
        ]
      : [
          { a: 0, b: 0, out: evalGate(gate, 0, 0) },
          { a: 0, b: 1, out: evalGate(gate, 0, 1) },
          { a: 1, b: 0, out: evalGate(gate, 1, 0) },
          { a: 1, b: 1, out: evalGate(gate, 1, 1) },
        ];

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card text-[var(--zen-frost)]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[var(--zen-border)] pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
            CIRCUIT WORKBENCH // SYSTEMS & LOGIC
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[var(--zen-snow)] tracking-wider uppercase">
            Logic Gate & Truth Table Synthesizer
          </h4>
        </div>
        <div className="flex flex-wrap gap-1">
          {(["AND", "OR", "NOT", "NAND", "NOR", "XOR", "XNOR"] as GateType[]).map((g) => (
            <button
              key={g}
              onClick={() => setGate(g)}
              className={`px-2.5 py-1 text-xs font-mono rounded border transition-all ${
                gate === g
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold shadow-[0_0_10px_rgba(0,229,255,0.25)]"
                  : "border-transparent text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:bg-[var(--zen-card-hover)]"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Interactive Schematic Diagram */}
        <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 flex flex-col items-center justify-center min-h-[200px]">
          <div className="flex items-center gap-6 mb-6">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setInputA((v) => (v === 1 ? 0 : 1))}
                className={`w-14 py-2 font-mono text-xs font-bold rounded border transition-all text-center ${
                  inputA === 1
                    ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/25 text-[var(--zen-cyan)] shadow-[0_0_12px_rgba(0,229,255,0.3)]"
                    : "border-[var(--zen-slate-edge)] bg-[var(--zen-card)] text-[var(--zen-ink-muted)]"
                }`}
              >
                A = {inputA}
              </button>
              {gate !== "NOT" && (
                <button
                  onClick={() => setInputB((v) => (v === 1 ? 0 : 1))}
                  className={`w-14 py-2 font-mono text-xs font-bold rounded border transition-all text-center ${
                    inputB === 1
                      ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/25 text-[var(--zen-cyan)] shadow-[0_0_12px_rgba(0,229,255,0.3)]"
                      : "border-[var(--zen-slate-edge)] bg-[var(--zen-card)] text-[var(--zen-ink-muted)]"
                  }`}
                >
                  B = {inputB}
                </button>
              )}
            </div>

            {/* Gate Symbol Box */}
            <div className="w-28 h-20 rounded-lg border-2 border-[var(--zen-cyan)] bg-[var(--zen-card)] flex flex-col items-center justify-center shadow-lg relative">
              <span className="font-mono text-xs font-bold tracking-widest text-[var(--zen-snow)]">
                [ {gate} ]
              </span>
              <span className="text-[9px] font-mono text-[var(--zen-ink-muted)] mt-1">
                GATE LOGIC
              </span>
            </div>

            {/* Output Wire */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-0.5 bg-[var(--zen-cyan)]" />
              <div
                className={`w-14 py-3 font-mono text-sm font-bold rounded-lg border text-center transition-all ${
                  output === 1
                    ? "border-emerald-500 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                    : "border-red-500/50 bg-red-500/15 text-red-700 dark:text-red-400"
                }`}
              >
                Q = {output}
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[var(--zen-ink-muted)] text-center">
            Click inputs A / B to toggle between High (1) and Low (0) state.
          </div>
        </div>

        {/* Truth Table */}
        <div className="rounded-lg border border-[var(--zen-border)] overflow-hidden">
          <div className="px-4 py-2 bg-[var(--zen-midnight)] border-b border-[var(--zen-border)] font-mono text-xs font-bold uppercase tracking-wider text-[var(--zen-snow)]">
            Synthesized Truth Table ({gate})
          </div>
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[var(--zen-void)] text-[var(--zen-ink-muted)] border-b border-[var(--zen-border)]">
              <tr>
                <th className="p-2.5">Input A</th>
                {gate !== "NOT" && <th className="p-2.5">Input B</th>}
                <th className="p-2.5 text-[var(--zen-cyan)]">Output Q</th>
                <th className="p-2.5">State</th>
              </tr>
            </thead>
            <tbody>
              {truthRows.map((row, idx) => {
                const isCurrent =
                  row.a === inputA && (gate === "NOT" || row.b === inputB);
                return (
                  <tr
                    key={idx}
                    className={`border-b border-[var(--zen-border)]/50 transition-colors ${
                      isCurrent
                        ? "bg-[var(--zen-cyan)]/15 font-bold text-[var(--zen-snow)]"
                        : "hover:bg-[var(--zen-card-hover)]"
                    }`}
                  >
                    <td className="p-2.5">{row.a}</td>
                    {gate !== "NOT" && <td className="p-2.5">{row.b}</td>}
                    <td className="p-2.5 font-bold">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.out === 1
                            ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40"
                            : "bg-red-500/20 text-red-700 dark:text-red-400 border border-red-500/40"
                        }`}
                      >
                        {row.out}
                      </span>
                    </td>
                    <td className="p-2.5 text-[10px] text-[var(--zen-ink-muted)]">
                      {isCurrent ? "ACTIVE INPUT" : "IDLE"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
