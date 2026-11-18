// Pure math for the Rectifier Supply workbench (NSETRON Module 06, power supply application). No React.
// Values come from the note: 220 V AC (60 Hz) -> 12 V AC RMS transformer -> 4-diode bridge (120 Hz) ->
// 2 x 470 uF in parallel (940 uF) -> 7805 -> +5 V. Peak = 1.414 x V_rms; bridge output peak is
// about 1.414 x 12 V - 1.4 V. The note gives no ripple formula, so filter ripple depth is illustrative.

export const SUPPLY_SAMPLES = 480;
export const MAINS_HZ = 60;
export const MAINS_RMS = 220;
export const SECONDARY_RMS = 12;
export const BRIDGE_DROP = 1.4;
export const REGULATED_V = 5;
export const PEAK_FACTOR = 1.414;

export type StageId = "mains" | "transformer" | "bridge" | "filter" | "regulator";

export interface StageInfo {
  id: StageId;
  label: string;
  caption: string;
  /** Vertical scale (V) for the plot. */
  yMax: number;
  note: string;
}

export const STAGES: StageInfo[] = [
  { id: "mains", label: "220 V AC", caption: "Mains, 60 Hz", yMax: 340, note: "Sine at 60 Hz; peak = 1.414 x 220 V." },
  { id: "transformer", label: "Step-Down Tx", caption: "12 V AC RMS", yMax: 20, note: "The transformer steps 220 V down to 12 V AC RMS." },
  { id: "bridge", label: "4-Diode Bridge", caption: "120 Hz pulsating DC", yMax: 20, note: "Full-wave rectification doubles the ripple frequency to 120 Hz." },
  { id: "filter", label: "2 x 470 uF (940 uF)", caption: "Smoothed DC with ripple", yMax: 20, note: "Parallel capacitors hold the voltage near peak and shrink ripple." },
  { id: "regulator", label: "7805", caption: "Steady +5 V", yMax: 8, note: "The 7805 clamps the output to a flat 5 V DC; 1 k and LED indicate power." },
];

export function peakOf(rms: number): number {
  return PEAK_FACTOR * rms;
}

export function stagePeak(id: StageId): number {
  switch (id) {
    case "mains":
      return peakOf(MAINS_RMS);
    case "transformer":
      return peakOf(SECONDARY_RMS);
    case "bridge":
    case "filter":
      return peakOf(SECONDARY_RMS) - BRIDGE_DROP;
    case "regulator":
      return REGULATED_V;
  }
}

/** Waveform for one stage over three mains cycles. Returns time (s) and volts. */
export function stageWaveform(id: StageId, samples = SUPPLY_SAMPLES) {
  const cycles = 3;
  const t = new Float32Array(samples);
  const v = new Float32Array(samples);
  const peak = stagePeak(id);
  let held = 0;
  for (let i = 0; i < samples; i++) {
    const ti = (i / (samples - 1)) * (cycles / MAINS_HZ);
    t[i] = ti;
    const s = Math.sin(2 * Math.PI * MAINS_HZ * ti);
    switch (id) {
      case "mains":
      case "transformer":
        v[i] = peak * s;
        break;
      case "bridge":
        v[i] = peak * Math.abs(s);
        break;
      case "filter": {
        const rect = peak * Math.abs(s);
        held = Math.max(rect, held * 0.997);
        v[i] = held;
        break;
      }
      case "regulator":
        v[i] = REGULATED_V;
        break;
    }
  }
  return { t, v };
}

export function rippleFrequency(id: StageId): number {
  return id === "bridge" || id === "filter" ? 2 * MAINS_HZ : MAINS_HZ;
}
