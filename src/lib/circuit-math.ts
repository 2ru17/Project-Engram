// Pure helpers for the NSETRON circuit scenes. No React.
// Every helper is a formula stated in the Key Formulas or Laboratory Recap of the notes.

/** R_T = R1 + R2 + ... (series). */
export function seriesResistance(...r: number[]): number {
  return r.reduce((a, b) => a + b, 0);
}

/** 1/R_T = 1/R1 + 1/R2 + ... (parallel). A zero branch short-circuits the node. */
export function parallelResistance(...r: number[]): number {
  if (r.some((x) => x === 0)) return 0;
  return 1 / r.reduce((a, b) => a + 1 / b, 0);
}

/** Series capacitors combine reciprocally. */
export function seriesCapacitance(...c: number[]): number {
  return 1 / c.reduce((a, b) => a + 1 / b, 0);
}

/** Parallel capacitors add directly. */
export function parallelCapacitance(...c: number[]): number {
  return c.reduce((a, b) => a + b, 0);
}

/** I = V / R (the note's convention in Labs 1 and 2: the LED drop is neglected). */
export function currentThrough(v: number, r: number): number {
  return r === 0 ? Infinity : v / r;
}

/** I = (Vs - Vf) / R for a series LED or diode with a known barrier voltage. */
export function ledCurrent(vs: number, vForward: number, r: number): number {
  return Math.max(0, (vs - vForward) / r);
}

/** V_out = V_S R_bottom / (R_top + R_bottom). */
export function dividerOutput(vs: number, rTop: number, rBottom: number): number {
  return (vs * rBottom) / (rTop + rBottom);
}

/** tau = R C. */
export function timeConstant(r: number, c: number): number {
  return r * c;
}

/** Comparator rule: HIGH when V+ > V-, LOW otherwise. */
export function comparatorOutput(vPlus: number, vMinus: number): boolean {
  return vPlus > vMinus;
}

/** R_bottom at which V_out equals vTarget: R_bottom = R_top vTarget / (V_S - vTarget). */
export function dividerBottomForTarget(vs: number, rTop: number, vTarget: number): number {
  return (rTop * vTarget) / (vs - vTarget);
}

/**
 * Display brightness in 0..1 from a current relative to a reference current.
 * Logarithmic over three decades, matching the qualitative "dim to bright" sweeps in the lab notes.
 */
export function relativeBrightness(i: number, iRef: number): number {
  if (i <= 0 || iRef <= 0) return 0;
  return Math.max(0.05, Math.min(1, 1 + Math.log10(i / iRef) / 3));
}

export function formatOhms(r: number): string {
  if (r >= 1e6) return `${trim(r / 1e6)} M\u03A9`;
  if (r >= 1e3) return `${trim(r / 1e3)} k\u03A9`;
  return `${trim(r)} \u03A9`;
}

export function formatAmps(i: number): string {
  if (!Number.isFinite(i)) return "unbounded";
  const a = Math.abs(i);
  if (a >= 1) return `${trim(i)} A`;
  if (a >= 1e-3) return `${trim(i * 1e3)} mA`;
  return `${trim(i * 1e6)} \u00B5A`;
}

export function formatFarads(c: number): string {
  if (c >= 1) return `${trim(c)} F`;
  return `${trim(c * 1e6)} \u00B5F`;
}

export function formatSeconds(s: number): string {
  return s >= 1 ? `${trim(s)} s` : `${trim(s * 1e3)} ms`;
}

function trim(v: number): string {
  return String(Number(v.toPrecision(3)));
}
