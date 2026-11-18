// Pure math for the Analog Modulation Studio (NSETRON Module 11, Lab 8).
// No React. All formulas are those listed in the note's Key Formulas section:
//   m = (Vmax - Vmin) / (Vmax + Vmin) = Vm / Vc
//   f_USB = fc + fm, f_LSB = fc - fm, BW_AM = 2 fm
//   P_T = P_C (1 + m^2 / 2), P_USB = P_LSB = P_C m^2 / 4
//   beta = km * m_hat / fm, BW_FM = 2 fm N  (N: sideband pairs with |J_n| > 0.01)

export type MessageShape = "sine" | "square" | "triangle" | "sawtooth";

export const SAMPLE_COUNT = 600;
export const MESSAGE_CYCLES = 2;
export const SIGNIFICANT_SIDEBAND_THRESHOLD = 0.01;
export const MAX_BETA = 20;

/** Message waveform with unit peak amplitude; tau is time in message periods. */
export function shapeValue(shape: MessageShape, tau: number): number {
  const frac = tau - Math.floor(tau);
  switch (shape) {
    case "sine":
      return Math.sin(2 * Math.PI * tau);
    case "square":
      return frac < 0.5 ? 1 : -1;
    case "triangle":
      return (2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * tau));
    case "sawtooth":
      return 2 * (tau - Math.floor(tau + 0.5));
  }
}

/** Fourier amplitude (relative to unit peak) of the k-th harmonic of the message. */
export function harmonicAmplitude(shape: MessageShape, k: number): number {
  switch (shape) {
    case "sine":
      return k === 1 ? 1 : 0;
    case "square":
      return k % 2 === 1 ? 4 / (Math.PI * k) : 0;
    case "triangle":
      return k % 2 === 1 ? 8 / (Math.PI * Math.PI * k * k) : 0;
    case "sawtooth":
      return 2 / (Math.PI * k);
  }
}

/** Carrier cycles drawn per message cycle; capped so the plot stays legible. */
export function displayCarrierRatio(fc: number, fm: number, cap = 24): number {
  if (fm <= 0) return cap;
  return Math.max(2, Math.min(cap, fc / fm));
}

export interface AmParams {
  shape: MessageShape;
  /** Carrier amplitude Vc (V); equals s_hat when the offset is enabled. */
  vc: number;
  /** Message amplitude Vm (V). */
  vm: number;
  /** Carrier offset s_hat on; off yields DSB-SC. */
  sHatOn: boolean;
  fc: number;
  fm: number;
}

export interface AmMetrics {
  vmax: number;
  vmin: number;
  /** m = (Vmax - Vmin) / (Vmax + Vmin); null for DSB-SC where no carrier exists. */
  m: number | null;
  overmodulated: boolean;
  bandwidth: number;
}

export function modulationIndexFromEnvelope(vmax: number, vmin: number): number {
  const denom = vmax + vmin;
  return denom === 0 ? 0 : (vmax - vmin) / denom;
}

export function amMetrics(p: AmParams): AmMetrics {
  if (!p.sHatOn) {
    return { vmax: p.vm, vmin: -p.vm, m: null, overmodulated: false, bandwidth: 2 * p.fm };
  }
  const vmax = p.vc + p.vm;
  const vmin = p.vc - p.vm;
  const m = modulationIndexFromEnvelope(vmax, vmin);
  return { vmax, vmin, m, overmodulated: m > 1, bandwidth: 2 * p.fm };
}

/** P_T = P_C (1 + m^2 / 2). */
export function totalPower(pc: number, m: number): number {
  return pc * (1 + (m * m) / 2);
}

/** P_USB = P_LSB = P_C m^2 / 4. */
export function sidebandPower(pc: number, m: number): number {
  return (pc * m * m) / 4;
}

/** Carrier share of total power: P_C / P_T = 1 / (1 + m^2 / 2). */
export function carrierPowerShare(m: number): number {
  return 1 / (1 + (m * m) / 2);
}

export interface TimeSeries {
  t: Float32Array;
  message: Float32Array;
  carrier: Float32Array;
  signal: Float32Array;
  upper: Float32Array;
  lower: Float32Array;
}

export function amTimeSeries(p: AmParams, samples = SAMPLE_COUNT): TimeSeries {
  const n = Math.min(samples, SAMPLE_COUNT);
  const ratio = displayCarrierRatio(p.fc, p.fm);
  const t = new Float32Array(n);
  const message = new Float32Array(n);
  const carrier = new Float32Array(n);
  const signal = new Float32Array(n);
  const upper = new Float32Array(n);
  const lower = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const tau = (i / (n - 1)) * MESSAGE_CYCLES;
    const msg = p.vm * shapeValue(p.shape, tau);
    const carr = Math.cos(2 * Math.PI * ratio * tau);
    const envelope = (p.sHatOn ? p.vc : 0) + msg;
    t[i] = tau;
    message[i] = msg;
    carrier[i] = (p.sHatOn ? p.vc : 1) * carr;
    signal[i] = envelope * carr;
    upper[i] = envelope;
    lower[i] = -envelope;
  }
  return { t, message, carrier, signal, upper, lower };
}

export interface SpectrumLine {
  /** Frequency offset in the unit of fc/fm. */
  f: number;
  amp: number;
  label: string;
  kind: "carrier" | "usb" | "lsb";
}

export function amSpectrum(p: AmParams, maxHarmonic = 7): SpectrumLine[] {
  const lines: SpectrumLine[] = [];
  if (p.sHatOn) lines.push({ f: p.fc, amp: p.vc, label: "fc", kind: "carrier" });
  for (let k = 1; k <= maxHarmonic; k++) {
    const a = (p.vm * harmonicAmplitude(p.shape, k)) / 2;
    if (a <= 0) continue;
    const tag = k === 1 ? "" : String(k);
    lines.push({ f: p.fc - k * p.fm, amp: a, label: `fc-${tag}fm`, kind: "lsb" });
    lines.push({ f: p.fc + k * p.fm, amp: a, label: `fc+${tag}fm`, kind: "usb" });
  }
  return lines.sort((a, b) => a.f - b.f);
}

/** beta = km * m_hat / fm (km in kHz/V, m_hat in V, fm in kHz). */
export function fmBeta(km: number, mHat: number, fm: number): number {
  return fm === 0 ? 0 : (km * mHat) / fm;
}

/** Bessel function of the first kind J_n(x), power series (no dependency). */
export function besselJ(n: number, x: number): number {
  const half = x / 2;
  let term = 1;
  for (let i = 1; i <= n; i++) term *= half / i;
  let sum = term;
  for (let k = 1; k < 80; k++) {
    term *= -(half * half) / (k * (k + n));
    sum += term;
    if (Math.abs(term) < 1e-16 * Math.max(1, Math.abs(sum))) break;
  }
  return sum;
}

/** Number of sideband pairs N with |J_n(beta)| > threshold (note rule: > 0.01). */
export function significantSidebandPairs(
  beta: number,
  threshold = SIGNIFICANT_SIDEBAND_THRESHOLD
): number {
  const b = Math.min(Math.abs(beta), MAX_BETA);
  let n = 0;
  for (let i = 1; i < 60; i++) {
    if (Math.abs(besselJ(i, b)) > threshold) n = i;
  }
  return n;
}

/** BW_FM = 2 fm N. */
export function fmBandwidth(fm: number, pairs: number): number {
  return 2 * fm * pairs;
}

export interface FmParams {
  beta: number;
  /** Message periods carried by the plotted carrier (display ratio). */
  ratio: number;
  shape: MessageShape;
}

/** FM waveform: phase deviation is 2*pi*beta times the running integral of the unit-peak message. */
export function fmTimeSeries(p: FmParams, samples = SAMPLE_COUNT): TimeSeries {
  const n = Math.min(samples, SAMPLE_COUNT);
  const t = new Float32Array(n);
  const message = new Float32Array(n);
  const carrier = new Float32Array(n);
  const signal = new Float32Array(n);
  const upper = new Float32Array(n);
  const lower = new Float32Array(n);
  const dTau = MESSAGE_CYCLES / (n - 1);
  let integral = 0;
  let prev = shapeValue(p.shape, 0);
  for (let i = 0; i < n; i++) {
    const tau = i * dTau;
    const msg = shapeValue(p.shape, tau);
    if (i > 0) integral += 0.5 * (msg + prev) * dTau;
    prev = msg;
    t[i] = tau;
    message[i] = msg;
    carrier[i] = Math.cos(2 * Math.PI * p.ratio * tau);
    signal[i] = Math.cos(2 * Math.PI * p.ratio * tau + 2 * Math.PI * p.beta * integral);
    upper[i] = 1;
    lower[i] = -1;
  }
  return { t, message, carrier, signal, upper, lower };
}

export function fmSpectrum(beta: number, fc: number, fm: number, maxOrder = 10): SpectrumLine[] {
  const lines: SpectrumLine[] = [];
  const b = Math.min(Math.abs(beta), MAX_BETA);
  for (let n = -maxOrder; n <= maxOrder; n++) {
    const j = Math.abs(besselJ(Math.abs(n), b));
    lines.push({
      f: fc + n * fm,
      amp: j,
      label: n === 0 ? "fc" : n > 0 ? `+${n}` : `${n}`,
      kind: n === 0 ? "carrier" : n > 0 ? "usb" : "lsb",
    });
  }
  return lines;
}
