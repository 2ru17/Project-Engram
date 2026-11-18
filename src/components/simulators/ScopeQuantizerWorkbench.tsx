"use client";

import { memo, useCallback, useId, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import {
  SimulatorWorkbenchShell,
  type SimulatorPresetOption,
  type SimulatorTelemetryMetric,
  type SimulatorMathematicalInvariant,
} from "./shared/SimulatorWorkbenchShell";
import {
  SCREEN_H_DIV,
  SCREEN_V_DIV,
  nyquistMinimumRate,
  quantizationLevels,
  quantizerCurves,
  scopeReading,
  scopeTrace,
  type ScopeSignal,
} from "@/lib/scope-math";
import { formatSeconds } from "@/lib/circuit-math";

interface ScopePreset extends SimulatorPresetOption {
  signal: ScopeSignal;
  voltsPerDiv: number;
  timePerDiv: number;
}

/** Settings and readings from Laboratory Activity #06 and the Worked Numerical Examples. */
const PRESETS: ScopePreset[] = [
  {
    id: "lab6-sine",
    label: "Lab 6 sine: 4.02 V peak",
    description: "1.00 V/div and 1.00 ms/div: T = 4.02 div x 1.00 ms = 4.02 ms, f = 249 Hz.",
    signal: { shape: "sine", vp: 4.02, f: 1 / 4.02e-3 },
    voltsPerDiv: 1.0,
    timePerDiv: 1e-3,
  },
  {
    id: "lab6-square",
    label: "Lab 6 square: 30 kHz",
    description: "10.0 us/div and 500 mV/div: T = 33.30 us (3.33 div), Vpp = 2.52 V (5.04 div).",
    signal: { shape: "square", vp: 1.26, f: 1 / 33.3e-6 },
    voltsPerDiv: 0.5,
    timePerDiv: 10e-6,
  },
  {
    id: "compress-100",
    label: "Time base 2 ms/div: 100 Hz",
    description: "A 20 ms window shows 2 cycles at 100 Hz.",
    signal: { shape: "sine", vp: 4.02, f: 100 },
    voltsPerDiv: 1.0,
    timePerDiv: 2e-3,
  },
  {
    id: "compress-250",
    label: "Time base 2 ms/div: 250 Hz",
    description: "The same 20 ms window shows 5 cycles at 250 Hz (horizontal compression).",
    signal: { shape: "sine", vp: 4.02, f: 250 },
    voltsPerDiv: 1.0,
    timePerDiv: 2e-3,
  },
];

const V_DIV_OPTIONS = [0.5, 1.0];
const T_DIV_OPTIONS = [10e-6, 1e-3, 2e-3];

const VIEW_W = 640;
const GRID_H = 240;
const PAD = 20;

function fmtVolts(v: number): string {
  return v >= 1 ? `${v.toFixed(2)} V` : `${(v * 1000).toFixed(0)} mV`;
}

interface DivSelectProps {
  label: string;
  value: number;
  options: number[];
  format: (v: number) => string;
  onValue: (v: number) => void;
}

const DivSelect = memo(function DivSelect({ label, value, options, format, onValue }: DivSelectProps) {
  const id = useId();
  const handle = useCallback((e: ChangeEvent<HTMLSelectElement>) => onValue(Number(e.target.value)), [onValue]);
  return (
    <div className="flex flex-col gap-1 p-2.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs">
      <label htmlFor={id} className="uppercase text-[var(--zen-ink-muted)]">{label}</label>
      <select
        id={id}
        value={value}
        onChange={handle}
        className="bg-[var(--zen-void)] border border-[var(--zen-border)] rounded px-2 py-1 text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
      >
        {options.map((o) => (
          <option key={o} value={o}>{format(o)}</option>
        ))}
      </select>
    </div>
  );
});

export function ScopeQuantizerWorkbench() {
  const uid = useId();
  const bitsId = useId();
  const [presetId, setPresetId] = useState(PRESETS[0].id);
  const [signal, setSignal] = useState<ScopeSignal>(PRESETS[0].signal);
  const [vDiv, setVDiv] = useState(PRESETS[0].voltsPerDiv);
  const [tDiv, setTDiv] = useState(PRESETS[0].timePerDiv);
  const [reveal, setReveal] = useState(false);
  const [bits, setBits] = useState(4);

  const handleSelectPreset = useCallback((id: string) => {
    const p = PRESETS.find((x) => x.id === id) ?? PRESETS[0];
    setPresetId(p.id);
    setSignal(p.signal);
    setVDiv(p.voltsPerDiv);
    setTDiv(p.timePerDiv);
    setReveal(false);
  }, []);
  const toggleReveal = useCallback(() => setReveal((r) => !r), []);
  const handleBits = useCallback((e: ChangeEvent<HTMLInputElement>) => setBits(Number(e.target.value)), []);

  const trace = useMemo(() => scopeTrace(signal, vDiv, tDiv), [signal, vDiv, tDiv]);
  const reading = useMemo(() => scopeReading(signal, vDiv, tDiv), [signal, vDiv, tDiv]);
  const quant = useMemo(() => quantizerCurves(signal.vp, bits), [signal.vp, bits]);

  const gw = VIEW_W - 2 * PAD;
  const cell = gw / SCREEN_H_DIV;
  const gh = cell * SCREEN_V_DIV;
  const toX = useCallback((d: number) => PAD + d * cell, [cell]);
  const toY = useCallback((d: number) => PAD + gh / 2 - Math.max(-SCREEN_V_DIV / 2, Math.min(SCREEN_V_DIV / 2, d)) * cell, [cell, gh]);

  const scopePts = useMemo(() => {
    let out = "";
    for (let i = 0; i < trace.x.length; i++) out += `${toX(trace.x[i]).toFixed(1)},${toY(trace.y[i]).toFixed(1)} `;
    return out;
  }, [trace, toX, toY]);

  const qW = VIEW_W - 2 * PAD;
  const qH = 150;
  const qPts = useMemo(() => {
    const sx = (t: number) => PAD + (t / 2) * qW;
    const sy = (v: number) => qH / 2 - (v / signal.vp) * (qH / 2 - 10);
    let a = "";
    let q = "";
    for (let i = 0; i < quant.t.length; i++) {
      a += `${sx(quant.t[i]).toFixed(1)},${sy(quant.analog[i]).toFixed(1)} `;
      q += `${sx(quant.t[i]).toFixed(1)},${sy(quant.quant[i]).toFixed(1)} `;
    }
    return { a, q };
  }, [quant, signal.vp, qW]);

  const metrics: SimulatorTelemetryMetric[] = [
    { label: "Time/div", value: formatSeconds(tDiv) },
    { label: "Volts/div", value: fmtVolts(vDiv) },
    { label: "Cycles on screen", value: reading.cyclesVisible.toFixed(2) },
    { label: "Quantizer levels L", value: quantizationLevels(bits), hint: `2^${bits}`, accent: true },
    { label: "Nyquist f_s,min", value: `${nyquistMinimumRate(signal.f).toFixed(0)} Hz`, hint: "2 f_max" },
  ];
  if (reveal) {
    metrics.unshift(
      { label: "Period T", value: `${reading.periodDiv.toFixed(2)} div = ${formatSeconds(reading.period)}`, accent: true },
      { label: "Frequency f", value: `${reading.frequency.toFixed(0)} Hz`, hint: "1 / T" },
      { label: "Vpp", value: `${reading.vppDiv.toFixed(2)} div = ${fmtVolts(reading.vpp)}` }
    );
    if (signal.shape === "sine") {
      metrics.push({ label: "Vp / Vrms", value: `${reading.vp.toFixed(2)} V / ${reading.vrms.toFixed(2)} V` });
    }
  }

  const invariants: SimulatorMathematicalInvariant[] = [
    { label: "Reading the Graticule", latex: "T = N_{horiz} \\times (\\text{Time/div}),\\quad f = \\frac{1}{T},\\quad V_{pp} = N_{vert} \\times (\\text{Volts/div})" },
    { label: "Quantizer and Sampling", latex: "L = 2^n,\\quad f_{s,\\min} = 2 f_{\\max}", note: "4-bit: 16 levels. 1-bit: 2 levels." },
  ];

  return (
    <SimulatorWorkbenchShell
      title="Oscilloscope and Quantizer Studio"
      subtitle="Read a signal from the 8 x 10 graticule, then see how bit depth turns a continuous sine into a discrete staircase."
      domain="systems"
      courses={["NSETRON"]}
      presets={PRESETS}
      activePresetId={presetId}
      onSelectPreset={handleSelectPreset}
      telemetryMetrics={metrics}
      invariants={invariants}
    >
      <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/80">
        <div className="overflow-x-auto">
          <svg viewBox={`0 0 ${VIEW_W} ${gh + 2 * PAD}`} role="img" aria-labelledby={`${uid}-t ${uid}-d`} className="min-w-[520px] w-full font-mono">
            <title id={`${uid}-t`}>Oscilloscope graticule</title>
            <desc id={`${uid}-d`}>
              {`${signal.shape === "sine" ? "Sine" : "Square"} wave at ${fmtVolts(vDiv)} per division and ${formatSeconds(tDiv)} per division, showing ${reading.cyclesVisible.toFixed(2)} cycles.`}
            </desc>
            <rect x={PAD} y={PAD} width={gw} height={gh} fill="var(--zen-void)" stroke="var(--zen-border)" />
            {Array.from({ length: SCREEN_H_DIV + 1 }, (_, i) => (
              <line key={`v${i}`} x1={toX(i)} y1={PAD} x2={toX(i)} y2={PAD + gh} stroke="var(--zen-border)" strokeWidth={i === SCREEN_H_DIV / 2 ? 1.4 : 0.6} />
            ))}
            {Array.from({ length: SCREEN_V_DIV + 1 }, (_, i) => (
              <line key={`h${i}`} x1={PAD} y1={PAD + i * cell} x2={PAD + gw} y2={PAD + i * cell} stroke="var(--zen-border)" strokeWidth={i === SCREEN_V_DIV / 2 ? 1.4 : 0.6} />
            ))}
            <polyline fill="none" stroke="var(--zen-cyan)" strokeWidth={2} points={scopePts} />
          </svg>
        </div>
        <p className="mt-2 text-[10px] font-mono text-[var(--zen-ink-muted)]">
          {reading.clipped ? "The trace exceeds the 8-division screen at this V/div and is clipped." : "Count divisions, then reveal the reading to check."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <DivSelect label="Volts per division" value={vDiv} options={V_DIV_OPTIONS} format={fmtVolts} onValue={setVDiv} />
        <DivSelect label="Time per division" value={tDiv} options={T_DIV_OPTIONS} format={formatSeconds} onValue={setTDiv} />
        <div className="flex flex-col gap-1 p-2.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs">
          <span className="uppercase text-[var(--zen-ink-muted)]">Measurement</span>
          <button
            type="button"
            aria-pressed={reveal}
            onClick={toggleReveal}
            className={`px-2.5 py-1 rounded border font-bold ${reveal ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-snow)]" : "border-[var(--zen-border)] text-[var(--zen-ink-muted)]"}`}
          >
            {reveal ? "Reading revealed" : "Reveal reading"}
          </button>
        </div>
      </div>

      <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/80 space-y-2">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <label htmlFor={bitsId} className="uppercase text-[var(--zen-ink-muted)]">
            Quantizer bit depth: <strong className="text-[var(--zen-cyan)]">{bits} bit ({quantizationLevels(bits)} levels)</strong>
          </label>
          <input id={bitsId} type="range" min={1} max={4} step={1} value={bits} onChange={handleBits} className="w-48 accent-[var(--zen-cyan)]" />
        </div>
        <div className="overflow-x-auto">
          <svg viewBox={`0 0 ${VIEW_W} ${qH}`} role="img" aria-labelledby={`${uid}-qt ${uid}-qd`} className="min-w-[520px] w-full font-mono">
            <title id={`${uid}-qt`}>Uniform quantizer staircase</title>
            <desc id={`${uid}-qd`}>{`A continuous sine and its ${bits}-bit quantized staircase with ${quantizationLevels(bits)} levels.`}</desc>
            <line x1={PAD} y1={qH / 2} x2={PAD + qW} y2={qH / 2} stroke="var(--zen-border)" />
            <polyline fill="none" stroke="var(--zen-ink-muted)" strokeWidth={1.4} points={qPts.a} />
            <polyline fill="none" stroke="var(--zen-amber)" strokeWidth={2} points={qPts.q} />
          </svg>
        </div>
        <div className="flex gap-4 text-[10px] font-mono text-[var(--zen-ink-muted)]">
          <span>Analog sine</span>
          <span className="text-[var(--zen-amber)]">Quantized staircase</span>
        </div>
      </div>
    </SimulatorWorkbenchShell>
  );
}
