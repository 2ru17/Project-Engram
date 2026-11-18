"use client";

import { memo, useCallback, useId, useMemo, useState } from "react";
import {
  SimulatorWorkbenchShell,
  type SimulatorTelemetryMetric,
  type SimulatorMathematicalInvariant,
} from "./shared/SimulatorWorkbenchShell";
import { STAGES, rippleFrequency, stagePeak, stageWaveform, type StageId } from "@/lib/supply-math";

const VIEW_W = 640;
const VIEW_H = 220;
const PAD_L = 46;
const PAD_R = 14;
const PAD_T = 14;
const PAD_B = 28;

interface StageButtonProps {
  id: StageId;
  label: string;
  caption: string;
  active: boolean;
  onSelect: (id: StageId) => void;
}

const StageButton = memo(function StageButton({ id, label, caption, active, onSelect }: StageButtonProps) {
  const handle = useCallback(() => onSelect(id), [onSelect, id]);
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={handle}
      className={`flex-1 min-w-[110px] px-2 py-2 rounded border font-mono text-xs text-left transition-all ${
        active
          ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-snow)]"
          : "border-[var(--zen-border)] bg-[var(--zen-void)]/60 text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:border-[var(--zen-cyan)]"
      }`}
    >
      <div className="font-bold">{label}</div>
      <div className="text-[10px] opacity-80">{caption}</div>
    </button>
  );
});

export function RectifierSupplyWorkbench() {
  const uid = useId();
  const [stage, setStage] = useState<StageId>("mains");
  const info = STAGES.find((s) => s.id === stage) ?? STAGES[0];
  const stageIdx = STAGES.findIndex((s) => s.id === stage);

  const handleSelect = useCallback((id: StageId) => setStage(id), []);
  const wave = useMemo(() => stageWaveform(stage), [stage]);

  const plotW = VIEW_W - PAD_L - PAD_R;
  const plotH = VIEW_H - PAD_T - PAD_B;
  const signed = stage === "mains" || stage === "transformer";
  const yOf = useCallback(
    (v: number) => (signed ? PAD_T + plotH / 2 - (v / info.yMax) * (plotH / 2) : PAD_T + plotH - (v / info.yMax) * plotH),
    [signed, plotH, info.yMax]
  );
  const points = useMemo(() => {
    const last = wave.t[wave.t.length - 1];
    let out = "";
    for (let i = 0; i < wave.t.length; i++) out += `${(PAD_L + (wave.t[i] / last) * plotW).toFixed(1)},${yOf(wave.v[i]).toFixed(1)} `;
    return out;
  }, [wave, plotW, yOf]);

  const peak = stagePeak(stage);
  const metrics: SimulatorTelemetryMetric[] = [
    { label: "Stage", value: info.label, accent: true },
    { label: "Waveform", value: info.caption },
    { label: stage === "regulator" ? "Output" : "Peak", value: `${peak.toFixed(1)} V` },
    { label: stage === "bridge" || stage === "filter" ? "Ripple frequency" : "Frequency", value: stage === "regulator" ? "DC" : `${rippleFrequency(stage)} Hz` },
  ];
  const invariants: SimulatorMathematicalInvariant[] = [
    { label: "Peak from RMS", latex: "V_{peak} = 1.414\\, V_{rms}", note: "Bridge output peak is about 1.414 x 12 V - 1.4 V." },
    { label: "Ideal Transformer", latex: "\\frac{V_p}{V_s} = \\frac{N_p}{N_s}" },
  ];

  return (
    <SimulatorWorkbenchShell
      title="Rectifier Power Supply Studio"
      subtitle="220 V AC to regulated +5 V DC: select a stage to see its waveform."
      domain="systems"
      courses={["NSETRON"]}
      telemetryMetrics={metrics}
      invariants={invariants}
    >
      <div role="group" aria-label="Power supply stages" className="flex flex-wrap gap-1.5">
        {STAGES.map((s) => (
          <StageButton key={s.id} id={s.id} label={s.label} caption={s.caption} active={s.id === stage} onSelect={handleSelect} />
        ))}
      </div>

      <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/80">
        <div className="overflow-x-auto">
          <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} role="img" aria-labelledby={`${uid}-t ${uid}-d`} className="min-w-[520px] w-full h-56 font-mono">
            <title id={`${uid}-t`}>{`Waveform after stage ${stageIdx + 1}: ${info.label}`}</title>
            <desc id={`${uid}-d`}>{`${info.caption}. ${info.note}`}</desc>
            <line x1={PAD_L} y1={yOf(0)} x2={VIEW_W - PAD_R} y2={yOf(0)} stroke="var(--zen-border)" />
            <line x1={PAD_L} y1={PAD_T} x2={PAD_L} y2={PAD_T + plotH} stroke="var(--zen-border)" />
            <text x={4} y={yOf(info.yMax) + 10} fontSize="9" fill="var(--zen-ink-muted)">{`${info.yMax} V`}</text>
            <text x={4} y={yOf(0) + 3} fontSize="9" fill="var(--zen-ink-muted)">0 V</text>
            <line x1={PAD_L} y1={yOf(peak)} x2={VIEW_W - PAD_R} y2={yOf(peak)} stroke="var(--zen-amber)" strokeDasharray="4 4" />
            <text x={VIEW_W - PAD_R} y={yOf(peak) - 4} textAnchor="end" fontSize="9" fill="var(--zen-amber)">{`${peak.toFixed(1)} V`}</text>
            <polyline fill="none" stroke="var(--zen-cyan)" strokeWidth={2.2} points={points} />
            <text x={VIEW_W - PAD_R} y={VIEW_H - 8} textAnchor="end" fontSize="9" fill="var(--zen-ink-muted)">3 mains cycles (50 ms)</text>
          </svg>
        </div>
        <p className="mt-2 text-xs font-mono text-[var(--zen-ink-muted)]" aria-live="polite">
          {info.note}
          {stage === "filter" ? " Ripple depth is drawn for illustration; the note gives no ripple formula." : ""}
        </p>
      </div>
    </SimulatorWorkbenchShell>
  );
}
