"use client";

import { memo, useCallback, useId, useMemo, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  SimulatorWorkbenchShell,
  type SimulatorPresetOption,
  type SimulatorTelemetryMetric,
  type SimulatorMathematicalInvariant,
} from "./shared/SimulatorWorkbenchShell";
import { motionTokens } from "@/lib/motion-tokens";
import {
  amMetrics,
  amSpectrum,
  amTimeSeries,
  carrierPowerShare,
  displayCarrierRatio,
  fmBandwidth,
  fmBeta,
  fmSpectrum,
  fmTimeSeries,
  besselJ,
  sidebandPower,
  significantSidebandPairs,
  totalPower,
  type MessageShape,
  type SpectrumLine,
  type TimeSeries,
} from "@/lib/modulation-math";

type Mode = "AM" | "FM";
type StageId = "message" | "gain" | "sum" | "mixer" | "output" | "modulator";

interface ModulationState {
  mode: Mode;
  shape: MessageShape;
  /** Carrier amplitude, equal to s_hat when the offset is on (V). */
  vc: number;
  /** Message amplitude (V). */
  vm: number;
  sHatOn: boolean;
  /** AM carrier and message frequency (MHz). */
  fcMHz: number;
  fmMHz: number;
  /** FM parameters: km (kHz/V), message amplitude (V), message frequency (kHz). */
  km: number;
  mHat: number;
  fmKHz: number;
}

interface ModulationPreset extends SimulatorPresetOption {
  state: ModulationState;
}

const BASE_AM: ModulationState = {
  mode: "AM",
  shape: "sine",
  vc: 1.0,
  vm: 0.5,
  sHatOn: true,
  fcMHz: 20,
  fmMHz: 1,
  km: 1.0,
  mHat: 2.0,
  fmKHz: 1.0,
};

const PRESETS: ModulationPreset[] = [
  {
    id: "am-m050",
    label: "AM m = 0.5",
    description: "Lab 8 Part I: fc = 20 MHz, fm = 1 MHz, s_hat = 1.0 V. Spectrum peaks at 19, 20 and 21 MHz.",
    state: { ...BASE_AM },
  },
  {
    id: "am-m100",
    label: "AM m = 1.0",
    description: "Envelope touches zero cleanly at 100% modulation.",
    state: { ...BASE_AM, vm: 1.0 },
  },
  {
    id: "am-m150",
    label: "AM m = 1.5 (overmodulated)",
    description: "Overmodulation: envelope distortion and phase reversals defeat a simple diode envelope detector.",
    state: { ...BASE_AM, vm: 1.5 },
  },
  {
    id: "dsb-sc",
    label: "DSB-SC (s_hat off)",
    description: "Carrier offset disabled: the center carrier line vanishes from |S(f)|.",
    state: { ...BASE_AM, vm: 1.0, sHatOn: false },
  },
  {
    id: "am-sawtooth",
    label: "AM sawtooth message",
    description: "A sawtooth message produces harmonic sideband clusters on |S(f)|.",
    state: { ...BASE_AM, shape: "sawtooth" },
  },
  {
    id: "fm-beta2",
    label: "FM beta = 2.0",
    description: "Lab 8 Part III: fc = 1 MHz, km = 1 kHz/V, message 2 V at 1 kHz. Four sideband pairs at +/-1 to +/-4 kHz.",
    state: { ...BASE_AM, mode: "FM", km: 1.0, mHat: 2.0, fmKHz: 1.0 },
  },
  {
    id: "fm-null",
    label: "FM carrier null (beta = 2.405)",
    description: "km = 1.2025 kHz/V with the same message: J0(beta) = 0, so the carrier line vanishes from |S(f)|.",
    state: { ...BASE_AM, mode: "FM", km: 1.2025, mHat: 2.0, fmKHz: 1.0 },
  },
];

const SHAPES: { id: MessageShape; label: string }[] = [
  { id: "sine", label: "Sine" },
  { id: "square", label: "Square" },
  { id: "triangle", label: "Triangle" },
  { id: "sawtooth", label: "Sawtooth" },
];

const VIEW_W = 640;
const PAD_L = 44;
const PAD_R = 14;
const PLOT_W = VIEW_W - PAD_L - PAD_R;

/* ------------------------------------------------------------------ */
/* Labeled range control                                               */
/* ------------------------------------------------------------------ */

interface RangeFieldProps {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  digits?: number;
  disabled?: boolean;
  onValue: (v: number) => void;
}

const RangeField = memo(function RangeField({
  label,
  unit,
  value,
  min,
  max,
  step,
  digits = 2,
  disabled,
  onValue,
}: RangeFieldProps) {
  const id = useId();
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onValue(Number(e.target.value)),
    [onValue]
  );
  return (
    <div className="flex flex-col gap-1 p-2.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs">
      <label htmlFor={id} className="flex items-center justify-between gap-2 text-[var(--zen-ink-muted)] uppercase">
        <span>{label}</span>
        <strong className="text-[var(--zen-snow)] normal-case">
          {value.toFixed(digits)} {unit}
        </strong>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        className="w-full accent-[var(--zen-cyan)] disabled:opacity-40"
      />
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* Block-diagram strip                                                 */
/* ------------------------------------------------------------------ */

interface BlockDef {
  id: StageId;
  label: string;
  x: number;
  w: number;
  circle?: boolean;
}

const AM_BLOCKS: BlockDef[] = [
  { id: "message", label: "m(t)", x: 8, w: 62 },
  { id: "gain", label: "Gain km", x: 100, w: 92 },
  { id: "sum", label: "+", x: 232, w: 44, circle: true },
  { id: "mixer", label: "x", x: 318, w: 44, circle: true },
  { id: "output", label: "s(t)", x: 410, w: 62 },
];

const FM_BLOCKS: BlockDef[] = [
  { id: "message", label: "m(t)", x: 8, w: 62 },
  { id: "modulator", label: "FM Modulator (km, fc)", x: 110, w: 210 },
  { id: "output", label: "s(t)", x: 360, w: 62 },
];

interface BlockStripProps {
  mode: Mode;
  active: StageId;
  sHatOn: boolean;
  onSelect: (id: StageId) => void;
}

const BlockStrip = memo(function BlockStrip({ mode, active, sHatOn, onSelect }: BlockStripProps) {
  const blocks = mode === "AM" ? AM_BLOCKS : FM_BLOCKS;
  const handleKey = useCallback(
    (e: KeyboardEvent<SVGGElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(e.currentTarget.dataset.stage as StageId);
      }
    },
    [onSelect]
  );
  const handleClick = useCallback(
    (e: React.MouseEvent<SVGGElement>) => onSelect(e.currentTarget.dataset.stage as StageId),
    [onSelect]
  );
  const h = 44;
  const y = 14;
  return (
    <div className="overflow-x-auto" role="group" aria-label={`${mode} modulator block diagram. Select a block to highlight its waveform.`}>
      <svg viewBox={`0 0 ${mode === "AM" ? 500 : 440} 92`} className="min-w-[440px] w-full h-24 font-mono">
        {blocks.map((b, i) => {
          const dimmed = b.id === "sum" && !sHatOn;
          const selected = active === b.id;
          const next = blocks[i + 1];
          return (
            <g key={b.id}>
              {next && (
                <line
                  x1={b.x + b.w}
                  y1={y + h / 2}
                  x2={next.x - 4}
                  y2={y + h / 2}
                  stroke="var(--zen-ink-muted)"
                  strokeWidth="1.5"
                  markerEnd="url(#arrow-head)"
                />
              )}
              <g
                role="button"
                tabIndex={0}
                aria-pressed={selected}
                aria-label={`${b.label} block${dimmed ? " (carrier offset off, DSB-SC)" : ""}`}
                data-stage={b.id}
                onClick={handleClick}
                onKeyDown={handleKey}
                className="cursor-pointer outline-none focus-visible:[&>rect]:stroke-[var(--zen-cyan)] focus-visible:[&>ellipse]:stroke-[var(--zen-cyan)]"
                opacity={dimmed ? 0.4 : 1}
              >
                {b.circle ? (
                  <ellipse
                    cx={b.x + b.w / 2}
                    cy={y + h / 2}
                    rx={b.w / 2}
                    ry={h / 2}
                    fill="var(--zen-void)"
                    stroke={selected ? "var(--zen-cyan)" : "var(--zen-border)"}
                    strokeWidth={selected ? 2.5 : 1.5}
                  />
                ) : (
                  <rect
                    x={b.x}
                    y={y}
                    width={b.w}
                    height={h}
                    fill="var(--zen-void)"
                    stroke={selected ? "var(--zen-cyan)" : "var(--zen-border)"}
                    strokeWidth={selected ? 2.5 : 1.5}
                  />
                )}
                <text
                  x={b.x + b.w / 2}
                  y={y + h / 2 + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fill={selected ? "var(--zen-cyan)" : "var(--zen-snow)"}
                >
                  {b.label}
                </text>
              </g>
            </g>
          );
        })}
        {mode === "AM" && (
          <>
            <line x1={254} y1={76} x2={254} y2={62} stroke="var(--zen-ink-muted)" strokeWidth="1.5" markerEnd="url(#arrow-head)" />
            <text x={254} y={88} textAnchor="middle" fontSize="11" fill="var(--zen-ink-muted)">
              {sHatOn ? "s_hat" : "s_hat off (DSB-SC)"}
            </text>
            <line x1={340} y1={76} x2={340} y2={62} stroke="var(--zen-ink-muted)" strokeWidth="1.5" markerEnd="url(#arrow-head)" />
            <text x={340} y={88} textAnchor="middle" fontSize="11" fill="var(--zen-ink-muted)">
              cos(wt)
            </text>
          </>
        )}
        <defs>
          <marker id="arrow-head" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 L8 4 L0 8 z" fill="var(--zen-ink-muted)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* Time-domain plot                                                    */
/* ------------------------------------------------------------------ */

function toPoints(values: Float32Array, t: Float32Array, yOf: (v: number) => number): string {
  const last = t[t.length - 1] || 1;
  let out = "";
  for (let i = 0; i < values.length; i++) {
    const x = PAD_L + (t[i] / last) * PLOT_W;
    out += `${x.toFixed(1)},${yOf(values[i]).toFixed(1)} `;
  }
  return out;
}

interface TimePlotProps {
  series: TimeSeries;
  mode: Mode;
  active: StageId;
  vmax: number | null;
  vmin: number | null;
  yMax: number;
  desc: string;
}

const TimePlot = memo(function TimePlot({ series, mode, active, vmax, vmin, yMax, desc }: TimePlotProps) {
  const reduce = useReducedMotion();
  const uid = useId();
  const H = 220;
  const padT = 16;
  const padB = 26;
  const plotH = H - padT - padB;
  const yOf = useCallback((v: number) => padT + plotH / 2 - (v / yMax) * (plotH / 2), [plotH, yMax]);

  const messagePts = useMemo(() => toPoints(series.message, series.t, yOf), [series, yOf]);
  const carrierPts = useMemo(() => toPoints(series.carrier, series.t, yOf), [series, yOf]);
  const signalPts = useMemo(() => toPoints(series.signal, series.t, yOf), [series, yOf]);
  const upperPts = useMemo(() => toPoints(series.upper, series.t, yOf), [series, yOf]);
  const lowerPts = useMemo(() => toPoints(series.lower, series.t, yOf), [series, yOf]);

  const showMessage = active === "message" || active === "gain" || active === "modulator";
  const showEnvelope = mode === "AM" && (active === "sum" || active === "mixer" || active === "output");
  const showCarrier = active === "mixer" || active === "modulator";
  const showSignal = active === "mixer" || active === "output" || active === "modulator" || active === "sum";
  const fade = { duration: reduce ? 0 : motionTokens.duration.normal, ease: motionTokens.easing.engram };

  return (
    <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/80">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${VIEW_W} ${H}`} role="img" aria-labelledby={`${uid}-t ${uid}-d`} className="min-w-[520px] w-full h-56 font-mono">
          <title id={`${uid}-t`}>Time-domain waveforms</title>
          <desc id={`${uid}-d`}>{desc}</desc>
          <line x1={PAD_L} y1={yOf(0)} x2={VIEW_W - PAD_R} y2={yOf(0)} stroke="var(--zen-border)" />
          <line x1={PAD_L} y1={padT} x2={PAD_L} y2={H - padB} stroke="var(--zen-border)" />
          <text x={4} y={yOf(0) + 3} fontSize="9" fill="var(--zen-ink-muted)">0 V</text>
          <text x={4} y={padT + 8} fontSize="9" fill="var(--zen-ink-muted)">+{yMax.toFixed(1)}</text>
          <text x={4} y={H - padB - 2} fontSize="9" fill="var(--zen-ink-muted)">-{yMax.toFixed(1)}</text>
          <text x={VIEW_W - PAD_R} y={H - 8} textAnchor="end" fontSize="9" fill="var(--zen-ink-muted)">
            time (2 message periods, carrier cycles scaled for display)
          </text>

          {mode === "AM" && vmax !== null && vmin !== null && (
            <>
              <line x1={PAD_L} y1={yOf(vmax)} x2={VIEW_W - PAD_R} y2={yOf(vmax)} stroke="var(--zen-amber)" strokeDasharray="2 4" />
              <text x={VIEW_W - PAD_R - 2} y={yOf(vmax) - 3} textAnchor="end" fontSize="9" fill="var(--zen-amber)">
                V_max = {vmax.toFixed(2)} V
              </text>
              <line x1={PAD_L} y1={yOf(vmin)} x2={VIEW_W - PAD_R} y2={yOf(vmin)} stroke="var(--zen-amber)" strokeDasharray="2 4" />
              <text x={VIEW_W - PAD_R - 2} y={yOf(vmin) + 11} textAnchor="end" fontSize="9" fill="var(--zen-amber)">
                V_min = {vmin.toFixed(2)} V
              </text>
            </>
          )}

          <motion.polyline fill="none" stroke="var(--zen-ink-muted)" strokeWidth="1" points={carrierPts}
            animate={{ opacity: showCarrier ? 0.55 : 0.18 }} transition={fade} />
          <motion.polyline fill="none" stroke="var(--zen-cyan)" strokeWidth="1.4" points={signalPts}
            animate={{ opacity: showSignal ? 1 : 0.2 }} transition={fade} />
          {mode === "AM" && (
            <motion.g animate={{ opacity: showEnvelope ? 1 : 0.35 }} transition={fade}>
              <polyline fill="none" stroke="var(--zen-amber)" strokeWidth="1.2" strokeDasharray="5 4" points={upperPts} />
              <polyline fill="none" stroke="var(--zen-amber)" strokeWidth="1.2" strokeDasharray="5 4" points={lowerPts} />
            </motion.g>
          )}
          <motion.polyline fill="none" stroke="var(--zen-snow)" strokeWidth="2" points={messagePts}
            animate={{ opacity: showMessage ? 1 : 0.4 }} transition={fade} />
        </svg>
      </div>
      <div className="flex flex-wrap gap-4 text-[10px] font-mono text-[var(--zen-ink-muted)] mt-2">
        <span className="text-[var(--zen-snow)]">Message m(t)</span>
        <span>Carrier</span>
        <span className="text-[var(--zen-cyan)]">Modulated s(t)</span>
        {mode === "AM" && <span className="text-[var(--zen-amber)]">Dashed: envelope, V_max / V_min</span>}
      </div>
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* Frequency-domain plot                                               */
/* ------------------------------------------------------------------ */

interface SpectrumPlotProps {
  lines: SpectrumLine[];
  fMin: number;
  fMax: number;
  unit: string;
  axisLabel: string;
  formatTick: (f: number) => string;
  tickValues: number[];
  desc: string;
}

const SpectrumPlot = memo(function SpectrumPlot({
  lines,
  fMin,
  fMax,
  unit,
  axisLabel,
  formatTick,
  tickValues,
  desc,
}: SpectrumPlotProps) {
  const uid = useId();
  const H = 190;
  const padT = 18;
  const padB = 38;
  const plotH = H - padT - padB;
  const maxAmp = useMemo(() => Math.max(1e-9, ...lines.map((l) => l.amp)), [lines]);
  const xOf = useCallback((f: number) => PAD_L + ((f - fMin) / (fMax - fMin)) * PLOT_W, [fMin, fMax]);
  const colorOf = (kind: SpectrumLine["kind"]) => (kind === "carrier" ? "var(--zen-cyan)" : "var(--zen-snow)");

  return (
    <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/80">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${VIEW_W} ${H}`} role="img" aria-labelledby={`${uid}-t ${uid}-d`} className="min-w-[520px] w-full h-48 font-mono">
          <title id={`${uid}-t`}>Frequency-domain spectrum |S(f)|</title>
          <desc id={`${uid}-d`}>{desc}</desc>
          <line x1={PAD_L} y1={H - padB} x2={VIEW_W - PAD_R} y2={H - padB} stroke="var(--zen-border)" />
          {lines.map((l) => {
            const x = xOf(l.f);
            if (x < PAD_L - 1 || x > VIEW_W - PAD_R + 1 || l.amp < 1e-4) return null;
            const y = padT + plotH - (l.amp / maxAmp) * plotH;
            return (
              <g key={`${l.kind}-${l.label}-${l.f}`}>
                <line x1={x} y1={H - padB} x2={x} y2={y} stroke={colorOf(l.kind)} strokeWidth="3" />
                <text x={x} y={y - 4} textAnchor="middle" fontSize="8" fill="var(--zen-ink-muted)">
                  {l.amp.toFixed(2)}
                </text>
              </g>
            );
          })}
          {tickValues.map((f) => (
            <g key={f}>
              <line x1={xOf(f)} y1={H - padB} x2={xOf(f)} y2={H - padB + 4} stroke="var(--zen-ink-muted)" />
              <text x={xOf(f)} y={H - padB + 15} textAnchor="middle" fontSize="9" fill="var(--zen-ink-muted)">
                {formatTick(f)}
              </text>
            </g>
          ))}
          <text x={VIEW_W - PAD_R} y={H - 6} textAnchor="end" fontSize="9" fill="var(--zen-ink-muted)">
            {axisLabel} ({unit})
          </text>
          <text x={4} y={padT + 6} fontSize="9" fill="var(--zen-ink-muted)">|S(f)|</text>
        </svg>
      </div>
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* Workbench                                                           */
/* ------------------------------------------------------------------ */

const fmt = (v: number, d = 2) => v.toFixed(d);

export function AnalogModulationWorkbench() {
  const shapeId = useId();
  const pcId = useId();
  const [presetId, setPresetId] = useState<string>(PRESETS[0].id);
  const [mode, setMode] = useState<Mode>("AM");
  const [shape, setShape] = useState<MessageShape>("sine");
  const [vc, setVc] = useState(1.0);
  const [vm, setVm] = useState(0.5);
  const [sHatOn, setSHatOn] = useState(true);
  const [fcMHz, setFcMHz] = useState(20);
  const [fmMHz, setFmMHz] = useState(1);
  const [km, setKm] = useState(1.0);
  const [mHat, setMHat] = useState(2.0);
  const [fmKHz, setFmKHz] = useState(1.0);
  const [pc, setPc] = useState(100);
  const [activeStage, setActiveStage] = useState<StageId>("output");

  const applyState = useCallback((s: ModulationState) => {
    setMode(s.mode);
    setShape(s.shape);
    setVc(s.vc);
    setVm(s.vm);
    setSHatOn(s.sHatOn);
    setFcMHz(s.fcMHz);
    setFmMHz(s.fmMHz);
    setKm(s.km);
    setMHat(s.mHat);
    setFmKHz(s.fmKHz);
    setActiveStage("output");
  }, []);

  const handleSelectPreset = useCallback(
    (id: string) => {
      const p = PRESETS.find((x) => x.id === id) ?? PRESETS[0];
      setPresetId(p.id);
      applyState(p.state);
    },
    [applyState]
  );

  const handleMode = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const next = e.currentTarget.dataset.mode as Mode;
      setMode(next);
      if (next === "FM") setShape("sine");
      setActiveStage("output");
    },
    []
  );
  const handleShape = useCallback((e: ChangeEvent<HTMLSelectElement>) => setShape(e.target.value as MessageShape), []);
  const handleSHat = useCallback(() => setSHatOn((v) => !v), []);
  const handlePc = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setPc(Number.isFinite(v) && v >= 0 ? v : 0);
  }, []);
  const handleStage = useCallback((id: StageId) => setActiveStage(id), []);

  /* ---- derived quantities (memoized) ---- */
  const am = useMemo(() => ({ shape, vc, vm, sHatOn, fc: fcMHz, fm: fmMHz }), [shape, vc, vm, sHatOn, fcMHz, fmMHz]);
  const amM = useMemo(() => amMetrics(am), [am]);
  const beta = useMemo(() => fmBeta(km, mHat, fmKHz), [km, mHat, fmKHz]);
  const pairs = useMemo(() => significantSidebandPairs(beta), [beta]);

  const series = useMemo(
    () =>
      mode === "AM"
        ? amTimeSeries(am)
        : fmTimeSeries({ beta, ratio: displayCarrierRatio(1000, fmKHz, 12), shape: "sine" }),
    [mode, am, beta, fmKHz]
  );

  const lines = useMemo(
    () => (mode === "AM" ? amSpectrum(am) : fmSpectrum(beta, 0, fmKHz, 10)),
    [mode, am, beta, fmKHz]
  );

  const yMax = useMemo(() => {
    if (mode === "FM") return 1.2;
    const peak = sHatOn ? vc + vm : vm;
    return Math.max(1, peak * 1.15);
  }, [mode, sHatOn, vc, vm]);

  const spectrumAxis = useMemo(() => {
    if (mode === "FM") {
      const span = 11 * fmKHz;
      const ticks = [-8, -4, 0, 4, 8].map((n) => n * fmKHz);
      return { fMin: -span, fMax: span, unit: "kHz", axisLabel: "offset from fc", ticks };
    }
    const harmonics = shape === "sine" ? 2 : 7;
    const span = (harmonics + 1) * fmMHz;
    const ticks = shape === "sine" ? [fcMHz - fmMHz, fcMHz, fcMHz + fmMHz] : [fcMHz - 4 * fmMHz, fcMHz, fcMHz + 4 * fmMHz];
    return { fMin: fcMHz - span, fMax: fcMHz + span, unit: "MHz", axisLabel: "frequency", ticks };
  }, [mode, shape, fmKHz, fmMHz, fcMHz]);

  const formatTick = useCallback((f: number) => (Number.isInteger(f) ? String(f) : f.toFixed(1)), []);

  /* ---- telemetry ---- */
  const single = shape === "sine";
  const metrics: SimulatorTelemetryMetric[] = useMemo(() => {
    if (mode === "FM") {
      return [
        { label: "Index beta", value: fmt(beta, 3), accent: true, hint: "km x m_hat / fm" },
        { label: "Peak deviation", value: `${fmt(km * mHat)} kHz` },
        { label: "Sideband pairs N", value: pairs, hint: "|J_n(beta)| > 0.01" },
        { label: "BW (FM)", value: `${fmt(fmBandwidth(fmKHz, pairs))} kHz`, hint: "2 fm N" },
        { label: "Carrier |J0(beta)|", value: fmt(Math.abs(besselJ(0, Math.min(beta, 20))), 3) },
      ];
    }
    const m = amM.m;
    return [
      { label: "Modulation index m", value: m === null ? "n/a (DSB-SC)" : fmt(m), accent: true, hint: m === null ? "no carrier" : "(Vmax - Vmin) / (Vmax + Vmin)" },
      { label: "Bandwidth", value: `${fmt(amM.bandwidth)} MHz`, hint: single ? "2 fm" : "2 fm (fundamental)" },
      {
        label: "P_T / P_C",
        value: m === null || !single ? "n/a" : fmt(1 + (m * m) / 2, 3),
        hint: single ? "1 + m^2 / 2" : "single-tone formula",
      },
      {
        label: "Carrier power share",
        value: m === null ? "0%" : single ? `${fmt(carrierPowerShare(m) * 100, 1)}%` : "n/a",
      },
      {
        label: "P_T",
        value: m === null || !single ? "n/a" : `${fmt(totalPower(pc, m), 1)} W`,
        hint: `P_C = ${pc} W`,
      },
      {
        label: "Sideband power (each)",
        value: m === null || !single ? "n/a" : `${fmt(sidebandPower(pc, m), 2)} W`,
        hint: "P_C m^2 / 4",
      },
      {
        label: "Overmodulation",
        value: m === null ? "n/a" : amM.overmodulated ? "YES (m > 1)" : "No",
        accent: amM.overmodulated,
      },
      { label: "V_max / V_min", value: `${fmt(amM.vmax)} / ${fmt(amM.vmin)} V` },
    ];
  }, [mode, beta, km, mHat, fmKHz, pairs, amM, single, pc]);

  const invariants: SimulatorMathematicalInvariant[] = useMemo(
    () =>
      mode === "AM"
        ? [
            {
              label: "AM Modulation Index and Power",
              latex: "m = \\frac{V_{\\max} - V_{\\min}}{V_{\\max} + V_{\\min}},\\quad P_T = P_C\\left(1 + \\frac{m^2}{2}\\right)",
              note: "At m = 1, two thirds of the transmitted power remains in the carrier.",
            },
            {
              label: "Sidebands and Bandwidth",
              latex: "f_{\\text{USB}} = f_c + f_m,\\quad f_{\\text{LSB}} = f_c - f_m,\\quad \\text{BW} = 2 f_m",
            },
          ]
        : [
            {
              label: "FM Modulation Index",
              latex: "\\beta = \\frac{\\Delta f_{\\max}}{f_m} = \\frac{k_m \\hat{m}}{f_m}",
              note: "Carrier null at beta = 2.405 where J0(beta) = 0.",
            },
            {
              label: "FM Bandwidth (Bessel)",
              latex: "\\text{BW}_{\\text{FM}} = 2 f_m N,\\quad |J_n(\\beta)| > 0.01",
            },
          ],
    [mode]
  );

  const timeDesc =
    mode === "AM"
      ? `AM waveform with ${shape} message at modulation index ${amM.m === null ? "undefined (suppressed carrier)" : fmt(amM.m)}. Peak envelope ${fmt(amM.vmax)} volts, minimum envelope ${fmt(amM.vmin)} volts.`
      : `FM waveform with constant amplitude and modulation index ${fmt(beta, 2)}.`;
  const freqDesc =
    mode === "AM"
      ? `Spectrum with carrier${sHatOn ? "" : " suppressed"} and sidebands at fc minus fm and fc plus fm, bandwidth ${fmt(amM.bandwidth)} megahertz.`
      : `Bessel line spectrum with ${pairs} significant sideband pairs.`;

  return (
    <SimulatorWorkbenchShell
      title="Analog Modulation Studio"
      subtitle="AM and FM modulator chains from Lab 8: time-domain envelope and frequency-domain sidebands under live parameter changes."
      domain="systems"
      courses={["NSETRON"]}
      presets={PRESETS}
      activePresetId={presetId}
      onSelectPreset={handleSelectPreset}
      telemetryMetrics={metrics}
      invariants={invariants}
      headerActions={
        <div className="flex items-center gap-1.5" role="group" aria-label="Modulation scheme">
          {(["AM", "FM"] as Mode[]).map((v) => (
            <button
              key={v}
              type="button"
              data-mode={v}
              aria-pressed={mode === v}
              onClick={handleMode}
              className={`px-2.5 py-1 font-mono text-xs rounded border transition-all ${
                mode === v
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold"
                  : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      }
    >
      <BlockStrip mode={mode} active={activeStage} sHatOn={sHatOn} onSelect={handleStage} />

      <TimePlot
        series={series}
        mode={mode}
        active={activeStage}
        vmax={mode === "AM" && sHatOn ? amM.vmax : null}
        vmin={mode === "AM" && sHatOn ? amM.vmin : null}
        yMax={yMax}
        desc={timeDesc}
      />

      <SpectrumPlot
        lines={lines}
        fMin={spectrumAxis.fMin}
        fMax={spectrumAxis.fMax}
        unit={spectrumAxis.unit}
        axisLabel={spectrumAxis.axisLabel}
        formatTick={formatTick}
        tickValues={spectrumAxis.ticks}
        desc={freqDesc}
      />

      {/* Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {mode === "AM" ? (
          <>
            <div className="flex flex-col gap-1 p-2.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs">
              <label htmlFor={shapeId} className="text-[var(--zen-ink-muted)] uppercase">Message waveform</label>
              <select
                id={shapeId}
                value={shape}
                onChange={handleShape}
                className="bg-[var(--zen-void)] border border-[var(--zen-border)] rounded px-2 py-1 text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
              >
                {SHAPES.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1 p-2.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs">
              <span className="text-[var(--zen-ink-muted)] uppercase">Carrier offset s_hat</span>
              <button
                type="button"
                aria-pressed={sHatOn}
                onClick={handleSHat}
                className={`px-2.5 py-1 rounded border font-bold transition-all ${
                  sHatOn
                    ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-snow)]"
                    : "border-[var(--zen-border)] text-[var(--zen-ink-muted)]"
                }`}
              >
                {sHatOn ? "ON (standard AM)" : "OFF (DSB-SC)"}
              </button>
            </div>
            <RangeField label="Carrier amplitude (s_hat)" unit="V" value={vc} min={0.5} max={2} step={0.05} onValue={setVc} disabled={!sHatOn} />
            <RangeField label="Message amplitude Vm" unit="V" value={vm} min={0} max={3} step={0.05} onValue={setVm} />
            <RangeField label="Carrier frequency fc" unit="MHz" value={fcMHz} min={10} max={30} step={1} digits={0} onValue={setFcMHz} />
            <RangeField label="Message frequency fm" unit="MHz" value={fmMHz} min={0.5} max={2} step={0.5} digits={1} onValue={setFmMHz} />
            <div className="flex flex-col gap-1 p-2.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs">
              <label htmlFor={pcId} className="text-[var(--zen-ink-muted)] uppercase">Carrier power P_C (W)</label>
              <input
                id={pcId}
                type="number"
                min={0}
                step={10}
                value={pc}
                onChange={handlePc}
                className="bg-[var(--zen-void)] border border-[var(--zen-border)] rounded px-2 py-1 text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
              />
            </div>
            <div className="p-2.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs text-[var(--zen-ink-muted)] flex items-center">
              m = Vm / Vc = {sHatOn ? fmt(vm / vc) : "undefined without carrier"}
            </div>
          </>
        ) : (
          <>
            <RangeField label="Modulator constant km" unit="kHz/V" value={km} min={0.5} max={4} step={0.0025} digits={4} onValue={setKm} />
            <RangeField label="Message amplitude m_hat" unit="V" value={mHat} min={0.5} max={3} step={0.1} digits={1} onValue={setMHat} />
            <RangeField label="Message frequency fm" unit="kHz" value={fmKHz} min={1} max={3} step={0.1} digits={1} onValue={setFmKHz} />
            <div className="p-2.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs text-[var(--zen-ink-muted)] flex items-center">
              fc = 1 MHz, sine message. beta = {fmt(beta, 3)}
            </div>
          </>
        )}
      </div>
    </SimulatorWorkbenchShell>
  );
}
