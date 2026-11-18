// Pure math for the Scope and Quantizer workbench (NSETRON Module 08, Lab 6). No React.
//   T = N_horiz x (time/div), f = 1 / T, V_pp = N_vert x (volts/div)
//   V_p = V_pp / 2, V_rms = 0.707 V_p, L = 2^n, f_s,min = 2 f_max

export const SCREEN_H_DIV = 10;
export const SCREEN_V_DIV = 8;
export const SCOPE_SAMPLES = 500;

export type ScopeShape = "sine" | "square";

export interface ScopeSignal {
  shape: ScopeShape;
  /** Peak amplitude (V). */
  vp: number;
  /** Frequency (Hz). */
  f: number;
}

export function waveAt(signal: ScopeSignal, t: number): number {
  const phase = t * signal.f;
  const frac = phase - Math.floor(phase);
  return signal.shape === "sine" ? signal.vp * Math.sin(2 * Math.PI * phase) : frac < 0.5 ? signal.vp : -signal.vp;
}

export interface ScopeTrace {
  /** Screen x in divisions (0..10). */
  x: Float32Array;
  /** Screen y in divisions, unclipped. */
  y: Float32Array;
}

export function scopeTrace(signal: ScopeSignal, voltsPerDiv: number, timePerDiv: number, samples = SCOPE_SAMPLES): ScopeTrace {
  const x = new Float32Array(samples);
  const y = new Float32Array(samples);
  const span = SCREEN_H_DIV * timePerDiv;
  for (let i = 0; i < samples; i++) {
    const t = (i / (samples - 1)) * span;
    x[i] = (i / (samples - 1)) * SCREEN_H_DIV;
    y[i] = waveAt(signal, t) / voltsPerDiv;
  }
  return { x, y };
}

export interface ScopeReading {
  periodDiv: number;
  period: number;
  frequency: number;
  vppDiv: number;
  vpp: number;
  vp: number;
  vrms: number;
  cyclesVisible: number;
  clipped: boolean;
}

export function scopeReading(signal: ScopeSignal, voltsPerDiv: number, timePerDiv: number): ScopeReading {
  const period = 1 / signal.f;
  const vpp = 2 * signal.vp;
  return {
    periodDiv: period / timePerDiv,
    period,
    frequency: signal.f,
    vppDiv: vpp / voltsPerDiv,
    vpp,
    vp: vpp / 2,
    vrms: 0.707 * (vpp / 2),
    cyclesVisible: (SCREEN_H_DIV * timePerDiv) / period,
    clipped: vpp / voltsPerDiv > SCREEN_V_DIV,
  };
}

export function quantizationLevels(bits: number): number {
  return 2 ** bits;
}

/** Mid-rise uniform quantizer over [-vp, +vp]. */
export function quantize(v: number, vp: number, bits: number): number {
  const levels = quantizationLevels(bits);
  const step = (2 * vp) / levels;
  const idx = Math.min(levels - 1, Math.max(0, Math.floor((v + vp) / step)));
  return -vp + (idx + 0.5) * step;
}

export function quantizerCurves(vp: number, bits: number, samples = SCOPE_SAMPLES) {
  const t = new Float32Array(samples);
  const analog = new Float32Array(samples);
  const quant = new Float32Array(samples);
  for (let i = 0; i < samples; i++) {
    const ph = (i / (samples - 1)) * 2;
    t[i] = ph;
    analog[i] = vp * Math.sin(2 * Math.PI * ph);
    quant[i] = quantize(analog[i], vp, bits);
  }
  return { t, analog, quant };
}

export function nyquistMinimumRate(fMax: number): number {
  return 2 * fMax;
}
