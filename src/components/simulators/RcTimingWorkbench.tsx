"use client";

import { memo, useCallback, useEffect, useId, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import {
  SimulatorWorkbenchShell,
  type SimulatorPresetOption,
  type SimulatorTelemetryMetric,
  type SimulatorMathematicalInvariant,
} from "./shared/SimulatorWorkbenchShell";
import { rcTrace, ONE_TAU_FRACTION, RC_SAMPLES, type RcScenario, type RcTrace } from "@/lib/rc-math";
import { formatFarads, formatOhms, formatSeconds } from "@/lib/circuit-math";

/** Supply from the lab notes; LED turn-on threshold is the GaAs value from the Lab 4 recap. */
const VS = 9;
const LED_THRESHOLD = 1.5;

interface RcPreset extends SimulatorPresetOption {
  scenario: RcScenario;
}

const PRESETS: RcPreset[] = [
  {
    id: "lab3-p1-3k3",
    label: "Lab 3 Part 1: 100 uF, 3.3 k charge",
    description: "Charge through 3.3 k (tau = 0.33 s), discharge through 10 k and LED (tau = 1.00 s).",
    scenario: { vs: VS, rChg: 3300, rDis: 10000, c: 100e-6, charges: true },
  },
  {
    id: "lab3-p1-1k",
    label: "Lab 3 Part 1: 100 uF, 1 k charge",
    description: "Swapping 3.3 k for 1 k speeds charging (tau = 0.10 s) and leaves discharge unchanged.",
    scenario: { vs: VS, rChg: 1000, rDis: 10000, c: 100e-6, charges: true },
  },
  {
    id: "lab3-p1-10uf",
    label: "Lab 3 Part 1: 10 uF, 3.3 k charge",
    description: "Swapping 100 uF for 10 uF speeds both charging and discharging.",
    scenario: { vs: VS, rChg: 3300, rDis: 10000, c: 10e-6, charges: true },
  },
  {
    id: "lab3-p4",
    label: "Lab 3 Part 4: loose-wire storage",
    description: "The 100 uF capacitor starts charged and discharges through 3.3 k and the LED.",
    scenario: { vs: VS, rChg: 3300, rDis: 3300, c: 100e-6, charges: false },
  },
  {
    id: "lab4-p2",
    label: "Lab 4 Part 2: charge then discharge",
    description: "100 uF through 3.3 k in both directions: the LEFT LED lights while charging, the RIGHT LED while discharging.",
    scenario: { vs: VS, rChg: 3300, rDis: 3300, c: 100e-6, charges: true },
  },
];

const R_OPTIONS = [1000, 3300, 10000];
const C_OPTIONS = [10e-6, 100e-6];

const VIEW_W = 640;
const VIEW_H = 240;
const PAD_L = 44;
const PAD_R = 14;
const PAD_T = 14;
const PAD_B = 34;

interface SelectFieldProps {
  label: string;
  value: number;
  options: number[];
  format: (v: number) => string;
  onValue: (v: number) => void;
}

const SelectField = memo(function SelectField({ label, value, options, format, onValue }: SelectFieldProps) {
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

interface CurvePlotProps {
  trace: RcTrace;
  cursor: number;
  desc: string;
}

const CurvePlot = memo(function CurvePlot({ trace, cursor, desc }: CurvePlotProps) {
  const uid = useId();
  const plotW = VIEW_W - PAD_L - PAD_R;
  const plotH = VIEW_H - PAD_T - PAD_B;
  const xOf = useCallback((t: number) => PAD_L + (t / trace.tTotal) * plotW, [trace.tTotal, plotW]);
  const yOf = useCallback((v: number) => PAD_T + plotH - (v / VS) * plotH, [plotH]);

  const points = useMemo(() => {
    let out = "";
    for (let i = 0; i < trace.t.length; i++) out += `${xOf(trace.t[i]).toFixed(1)},${yOf(trace.v[i]).toFixed(1)} `;
    return out;
  }, [trace, xOf, yOf]);

  const markers = useMemo(() => {
    const m: { t: number; label: string }[] = [];
    if (trace.tCharge > 0) {
      m.push({ t: trace.tauChg, label: "1 tau" }, { t: trace.tCharge, label: "5 tau" });
    }
    m.push(
      { t: trace.tCharge + trace.tauDis, label: "1 tau" },
      { t: trace.tCharge + 5 * trace.tauDis, label: "5 tau" }
    );
    return m;
  }, [trace]);

  const ci = Math.min(trace.t.length - 1, Math.max(0, cursor));
  return (
    <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/80">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-labelledby={`${uid}-t ${uid}-d`} className="min-w-[520px] w-full h-60 font-mono">
          <title id={`${uid}-t`}>Capacitor voltage versus time</title>
          <desc id={`${uid}-d`}>{desc}</desc>
          <line x1={PAD_L} y1={yOf(0)} x2={VIEW_W - PAD_R} y2={yOf(0)} stroke="var(--zen-border)" />
          <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={yOf(0)} stroke="var(--zen-border)" />
          <text x={4} y={yOf(VS) + 3} fontSize="9" fill="var(--zen-ink-muted)">9 V</text>
          <text x={4} y={yOf(0) + 3} fontSize="9" fill="var(--zen-ink-muted)">0 V</text>
          <line x1={PAD_L} y1={yOf(LED_THRESHOLD)} x2={VIEW_W - PAD_R} y2={yOf(LED_THRESHOLD)} stroke="var(--zen-amber)" strokeDasharray="4 4" />
          <text x={VIEW_W - PAD_R} y={yOf(LED_THRESHOLD) - 4} textAnchor="end" fontSize="9" fill="var(--zen-amber)">
            LED threshold 1.5 V
          </text>
          {markers.map((m) => (
            <g key={`${m.label}-${m.t}`}>
              <line x1={xOf(m.t)} y1={PAD_T} x2={xOf(m.t)} y2={yOf(0)} stroke="var(--zen-ink-muted)" strokeDasharray="2 4" />
              <text x={xOf(m.t)} y={VIEW_H - 18} textAnchor="middle" fontSize="9" fill="var(--zen-ink-muted)">
                {m.label}
              </text>
              <text x={xOf(m.t)} y={VIEW_H - 6} textAnchor="middle" fontSize="9" fill="var(--zen-ink-muted)">
                {formatSeconds(m.t)}
              </text>
            </g>
          ))}
          <polyline fill="none" stroke="var(--zen-border)" strokeWidth={1.4} points={points} />
          <polyline
            fill="none"
            stroke="var(--zen-cyan)"
            strokeWidth={2.4}
            points={points.split(" ").slice(0, ci + 1).join(" ")}
          />
          <circle cx={xOf(trace.t[ci])} cy={yOf(trace.v[ci])} r={5} fill="var(--zen-snow)" stroke="var(--zen-void)" />
        </svg>
      </div>
      <div className="flex flex-wrap gap-4 text-[10px] font-mono text-[var(--zen-ink-muted)] mt-2">
        <span className="text-[var(--zen-cyan)]">v_C(t)</span>
        <span>Dotted: 1 tau (63.2%) and 5 tau (above 99%)</span>
        <span className="text-[var(--zen-amber)]">Dashed: LED threshold</span>
      </div>
    </div>
  );
});

export function RcTimingWorkbench() {
  const [presetId, setPresetId] = useState(PRESETS[0].id);
  const [scenario, setScenario] = useState<RcScenario>(PRESETS[0].scenario);
  const [cursor, setCursor] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const trace = useMemo(() => rcTrace(scenario), [scenario]);
  const last = RC_SAMPLES - 1;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCursor((c) => {
        if (c >= last) {
          setIsPlaying(false);
          return c;
        }
        return Math.min(last, c + Math.max(1, Math.round(4 * speed)));
      });
    }, 40);
    return () => clearInterval(timer);
  }, [isPlaying, speed, last]);

  const handleSelectPreset = useCallback((id: string) => {
    const p = PRESETS.find((x) => x.id === id) ?? PRESETS[0];
    setPresetId(p.id);
    setScenario(p.scenario);
    setCursor(0);
    setIsPlaying(false);
  }, []);
  const setRChg = useCallback((v: number) => { setScenario((s) => ({ ...s, rChg: v })); setCursor(0); }, []);
  const setRDis = useCallback((v: number) => { setScenario((s) => ({ ...s, rDis: v })); setCursor(0); }, []);
  const setC = useCallback((v: number) => { setScenario((s) => ({ ...s, c: v })); setCursor(0); }, []);

  const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);
  const stepBack = useCallback(() => { setIsPlaying(false); setCursor((c) => Math.max(0, c - 8)); }, []);
  const stepForward = useCallback(() => { setIsPlaying(false); setCursor((c) => Math.min(last, c + 8)); }, [last]);
  const reset = useCallback(() => { setIsPlaying(false); setCursor(0); }, []);

  const ci = Math.min(last, cursor);
  const tNow = trace.t[ci];
  const vNow = trace.v[ci];
  const charging = tNow <= trace.tCharge && trace.tCharge > 0;
  const lit = vNow > LED_THRESHOLD;

  const metrics: SimulatorTelemetryMetric[] = [
    { label: "Time t", value: formatSeconds(tNow), accent: true },
    { label: "v_C(t)", value: `${vNow.toFixed(2)} V`, hint: charging ? "Charging" : "Discharging" },
    { label: "tau charge", value: scenario.charges ? formatSeconds(trace.tauChg) : "n/a", hint: scenario.charges ? "R_chg C" : "starts charged" },
    { label: "tau discharge", value: formatSeconds(trace.tauDis), hint: "R_dis C" },
    { label: "1 tau level", value: `${(ONE_TAU_FRACTION * 100).toFixed(1)}%` },
    { label: "LED", value: lit ? "Above threshold" : "Below threshold" },
  ];

  const invariants: SimulatorMathematicalInvariant[] = [
    { label: "RC Charge", latex: "v_C = V_s\\left(1 - e^{-t/RC}\\right)", note: "63.2% at 1 tau, above 99% at 5 tau." },
    { label: "RC Discharge", latex: "v_C = V_0\\, e^{-t/RC},\\quad \\tau = R C", note: "1 k x 1 uF = 1 ms; full transient is about 5 tau." },
  ];

  return (
    <SimulatorWorkbenchShell
      title="RC Timing Workbench"
      subtitle="Capacitor charge and discharge curves for Lab 3 and Lab 4 Part 2 with time-constant markers and the LED threshold."
      domain="systems"
      courses={["NSETRON"]}
      presets={PRESETS}
      activePresetId={presetId}
      onSelectPreset={handleSelectPreset}
      stepping={{
        isPlaying,
        onTogglePlay: togglePlay,
        onStepBack: stepBack,
        onStepForward: stepForward,
        onReset: reset,
        speed,
        onChangeSpeed: setSpeed,
        stepIndex: ci,
        totalSteps: last,
        stepLabel: "STEP",
        canStepBack: ci > 0,
        canStepForward: ci < last,
      }}
      telemetryMetrics={metrics}
      invariants={invariants}
    >
      <CurvePlot
        trace={trace}
        cursor={ci}
        desc={`Capacitor voltage with charge time constant ${formatSeconds(trace.tauChg)} and discharge time constant ${formatSeconds(trace.tauDis)}. Current value ${vNow.toFixed(2)} volts.`}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <SelectField label="Charging resistor" value={scenario.rChg} options={R_OPTIONS} format={formatOhms} onValue={setRChg} />
        <SelectField label="Discharge resistor" value={scenario.rDis} options={R_OPTIONS} format={formatOhms} onValue={setRDis} />
        <SelectField label="Capacitor" value={scenario.c} options={C_OPTIONS} format={formatFarads} onValue={setC} />
      </div>
    </SimulatorWorkbenchShell>
  );
}
