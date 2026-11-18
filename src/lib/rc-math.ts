// Pure math for the RC Timing Workbench (NSETRON Module 04, Lab 3 and Lab 4 Part 2). No React.
//   charge:    v_C = Vs (1 - e^(-t / RC))
//   discharge: v_C = V0 e^(-t / RC)
//   tau = R C, 63.2% at 1 tau, above 99% at 5 tau

export const RC_SAMPLES = 480;
export const ONE_TAU_FRACTION = 1 - Math.exp(-1);

export function tau(r: number, c: number): number {
  return r * c;
}

export function chargeVoltage(vs: number, t: number, tauS: number, v0 = 0): number {
  return vs + (v0 - vs) * Math.exp(-t / tauS);
}

export function dischargeVoltage(v0: number, t: number, tauS: number): number {
  return v0 * Math.exp(-t / tauS);
}

export interface RcScenario {
  vs: number;
  rChg: number;
  rDis: number;
  c: number;
  /** When false the capacitor starts fully charged (loose-wire storage) and only discharges. */
  charges: boolean;
}

export interface RcTrace {
  t: Float32Array;
  v: Float32Array;
  tauChg: number;
  tauDis: number;
  /** Duration of the charge phase (5 tau), 0 when the scenario starts charged. */
  tCharge: number;
  tTotal: number;
}

export function rcTrace(s: RcScenario, samples = RC_SAMPLES): RcTrace {
  const tauChg = tau(s.rChg, s.c);
  const tauDis = tau(s.rDis, s.c);
  const tCharge = s.charges ? 5 * tauChg : 0;
  const tTotal = tCharge + 5 * tauDis;
  const vEnd = s.charges ? chargeVoltage(s.vs, tCharge, tauChg) : s.vs;
  const t = new Float32Array(samples);
  const v = new Float32Array(samples);
  for (let i = 0; i < samples; i++) {
    const ti = (i / (samples - 1)) * tTotal;
    t[i] = ti;
    v[i] = ti <= tCharge ? chargeVoltage(s.vs, ti, tauChg) : dischargeVoltage(vEnd, ti - tCharge, tauDis);
  }
  return { t, v, tauChg, tauDis, tCharge, tTotal };
}
