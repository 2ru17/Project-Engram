// Data-driven circuit scenes for the NSETRON notes. Pure data and pure behavior, no React.
// Every value shown on screen comes from the Key Formulas, Worked Examples or Laboratory Recap
// of the corresponding note. Brightness values are display-only and are derived, not invented.

import {
  comparatorOutput,
  currentThrough,
  dividerBottomForTarget,
  dividerOutput,
  formatAmps,
  formatFarads,
  formatOhms,
  formatSeconds,
  ledCurrent,
  parallelCapacitance,
  parallelResistance,
  relativeBrightness,
  seriesCapacitance,
  seriesResistance,
  timeConstant,
} from "./circuit-math";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export type ParamValue = number | string | boolean;
export type ParamValues = Record<string, ParamValue>;

export type ElementType =
  | "resistor"
  | "pot"
  | "capacitor"
  | "led"
  | "diode"
  | "switch"
  | "fuse"
  | "meter"
  | "battery"
  | "supply"
  | "ground"
  | "npn"
  | "comparator"
  | "transformer"
  | "bridge"
  | "box"
  | "header"
  | "pn"
  | "junction";

export type LedColor = "red" | "green" | "orange" | "amber";
export type Rotation = 0 | 90 | 180 | 270;

export interface DiagramElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  rot?: Rotation;
  label?: string;
  sub?: string;
  /** Label offset override [dx, dy]. */
  lbl?: [number, number];
  color?: LedColor;
  /** Resistor drawn with a diagonal arrow (variable resistance). */
  variable?: boolean;
  /** Box / meter text. */
  text?: string;
  w?: number;
  h?: number;
  /** Info card content. */
  role: string;
  value?: string;
  formula?: string;
  /** Visible only when the named parameter equals the given value. */
  when?: { param: string; eq: ParamValue };
}

export type WirePoint = [number, number] | string;

export interface DiagramWire {
  id: string;
  points: WirePoint[];
  /** Flow group(s); the wire carries animated current when any group is on. */
  on?: string | string[];
  dashed?: boolean;
  when?: { param: string; eq: ParamValue };
}

export interface ChoiceParam {
  kind: "choice";
  id: string;
  label: string;
  options: { value: ParamValue; label: string }[];
  default: ParamValue;
}
export interface ToggleParam {
  kind: "toggle";
  id: string;
  label: string;
  labelOn: string;
  labelOff: string;
  default: boolean;
}
export interface RangeParam {
  kind: "range";
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  default: number;
}
export type PartParam = ChoiceParam | ToggleParam | RangeParam;

export interface ReadoutSpec {
  id: string;
  label: string;
}

export interface BehaviorResult {
  flow: Record<string, boolean>;
  leds: Record<string, number>;
  /** Element state tokens such as "closed", "open", "reversed", "forward", "reverse". */
  states: Record<string, string>;
  labels: Record<string, string>;
  values: Record<string, string>;
  status: string;
}

export type Behavior = (v: ParamValues, c: Record<string, number>) => BehaviorResult;

export interface PartSpec {
  id: string;
  label: string;
  viewBox: [number, number];
  elements: DiagramElement[];
  wires: DiagramWire[];
  params: PartParam[];
  readouts: ReadoutSpec[];
  notes: string[];
  behavior: string;
  consts: Record<string, number>;
  /** Optional workbench that explores this part over time. */
  workbench?: { id: string; label: string };
}

export interface DiagramSpec {
  id: string;
  title: string;
  description: string;
  kind: "schematic" | "breadboard";
  parts: PartSpec[];
}

/* ------------------------------------------------------------------ */
/* Pin geometry                                                        */
/* ------------------------------------------------------------------ */

const PINS: Record<ElementType, Record<string, [number, number]>> = {
  resistor: { a: [-30, 0], b: [30, 0] },
  pot: { a: [-30, 0], b: [30, 0], w: [0, -26] },
  capacitor: { a: [-30, 0], b: [30, 0] },
  led: { a: [-30, 0], b: [30, 0] },
  diode: { a: [-30, 0], b: [30, 0] },
  switch: { a: [-30, 0], b: [30, 0] },
  fuse: { a: [-30, 0], b: [30, 0] },
  meter: { a: [-30, 0], b: [30, 0] },
  battery: { p: [0, -30], n: [0, 30] },
  supply: { p: [0, 0] },
  ground: { p: [0, 0] },
  npn: { b: [-30, 0], c: [18, -30], e: [18, 30] },
  comparator: { p: [-34, -14], n: [-34, 14], o: [34, 0] },
  transformer: { pa: [-30, -20], pb: [-30, 20], sa: [30, -20], sb: [30, 20] },
  bridge: { l: [-30, 0], r: [30, 0], t: [0, -30], bt: [0, 30] },
  box: { p: [0, 0] },
  header: { g1: [26, -60], g2: [26, -20], g3: [26, 20], gnd: [26, 60] },
  pn: { a: [-70, 0], b: [70, 0] },
  junction: { p: [0, 0] },
};

export function pinPosition(el: DiagramElement, pin: string): [number, number] {
  const local = PINS[el.type][pin];
  if (!local) return [el.x, el.y];
  const [lx, ly] = local;
  switch (el.rot ?? 0) {
    case 90:
      return [el.x - ly, el.y + lx];
    case 180:
      return [el.x - lx, el.y - ly];
    case 270:
      return [el.x + ly, el.y - lx];
    default:
      return [el.x + lx, el.y + ly];
  }
}

/** Resolve "elementId.pin" references into absolute coordinates. */
export function resolveWire(part: PartSpec, wire: DiagramWire): [number, number][] {
  const byId = new Map(part.elements.map((e) => [e.id, e]));
  const out: [number, number][] = [];
  for (const p of wire.points) {
    if (typeof p !== "string") {
      out.push(p);
      continue;
    }
    const [id, pin] = p.split(".");
    const el = byId.get(id);
    if (el) out.push(pinPosition(el, pin ?? "p"));
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Spec-building helpers                                               */
/* ------------------------------------------------------------------ */

type ChainItem = Omit<DiagramElement, "x" | "y">;

/** Lay out a horizontal series chain (supply ... ground) and wire consecutive items. */
function chain(
  y: number,
  items: ChainItem[],
  opts: { x0?: number; pitch?: number; group?: string } = {}
): { elements: DiagramElement[]; wires: DiagramWire[] } {
  const x0 = opts.x0 ?? 40;
  const pitch = opts.pitch ?? 100;
  const group = opts.group ?? "main";
  const elements: DiagramElement[] = [];
  const wires: DiagramWire[] = [];
  items.forEach((item, k) => {
    let x: number;
    if (k === 0) x = x0;
    else if (item.type === "ground") x = elements[k - 1].x + 60;
    else x = x0 + 60 + (k - 1) * pitch;
    elements.push({ ...item, x, y });
    if (k > 0) {
      const prev = elements[k - 1];
      const outPin = prev.type === "supply" ? "p" : "b";
      const inPin = item.type === "ground" ? "p" : "a";
      wires.push({
        id: `w-${prev.id}-${item.id}`,
        points: [`${prev.id}.${outPin}`, `${item.id}.${inPin}`],
        on: group,
      });
    }
  });
  return { elements, wires };
}

const SUPPLY9: ChainItem = {
  id: "vs",
  type: "supply",
  label: "+9V",
  role: "9 V DC supply used throughout the laboratory activities.",
  value: "9 V",
};
const GND: ChainItem = { id: "gnd", type: "ground", role: "Ground reference (0 V)." };
const SWITCH: ChainItem = {
  id: "sw",
  type: "switch",
  label: "SW",
  role: "Pushbutton switch that completes the loop when pressed.",
  formula: "I = \\frac{V}{R_T}",
};
const swParam: ToggleParam = {
  kind: "toggle",
  id: "sw",
  label: "Pushbutton switch",
  labelOn: "Pressed (closed)",
  labelOff: "Released (open)",
  default: true,
};

function choiceOhms(id: string, label: string, values: number[], def: number): ChoiceParam {
  return {
    kind: "choice",
    id,
    label,
    options: values.map((v) => ({ value: v, label: formatOhms(v) })),
    default: def,
  };
}

function blank(): BehaviorResult {
  return { flow: {}, leds: {}, states: {}, labels: {}, values: {}, status: "" };
}

const ledItem = (id = "led", label = "LED", color: LedColor = "red"): ChainItem => ({
  id,
  type: "led",
  label,
  color,
  role: "Light-emitting diode: conducts only when forward biased; flat side is the cathode.",
  formula: "I = \\frac{V_S - V_F}{R}",
});

const resItem = (id: string, label: string, formula = "V = I R"): ChainItem => ({
  id,
  type: "resistor",
  label,
  role: "Resistor limiting the current in its branch.",
  value: label,
  formula,
});

/* ------------------------------------------------------------------ */
/* Behaviors                                                           */
/* ------------------------------------------------------------------ */

const BEHAVIORS: Record<string, Behavior> = {
  /* Lab 1 and Lab 2 Part 1: series resistance, LED current I = V / R_T. */
  "series-led": (v, c) => {
    const r = blank();
    const closed = v.sw !== false;
    const rVar = typeof v.R === "number" ? v.R : 0;
    const rPot = typeof v.pot === "number" ? (v.pot / 100) * c.potMax : 0;
    const rt = seriesResistance(c.rFixed ?? 0, rVar, rPot);
    const i = currentThrough(c.vs, rt);
    const iRef = currentThrough(c.vs, c.rRef);
    r.flow.main = closed;
    r.states.sw = closed ? "closed" : "open";
    r.leds.led = closed ? relativeBrightness(i, iRef) : 0;
    r.labels.pot = `${formatOhms(rPot)}`;
    r.values.rt = formatOhms(rt);
    r.values.i = closed ? formatAmps(i) : "0 A";
    r.status = closed
      ? "Switch pressed: current follows I = V / R_T. Brightness is the qualitative current indicator."
      : "Switch released: the loop is open and no current flows.";
    return r;
  },

  /* Lab 2 Part 2: two resistors in parallel feeding one LED. */
  "parallel-led": (v, c) => {
    const r = blank();
    const closed = v.sw !== false;
    const rb = typeof v.R === "number" ? v.R : 1;
    const req = parallelResistance(c.rFixed, rb);
    const i = currentThrough(c.vs, req);
    const iRef = currentThrough(c.vs, parallelResistance(c.rFixed, c.rRef));
    r.flow.main = closed;
    r.states.sw = closed ? "closed" : "open";
    r.leds.led = closed ? relativeBrightness(i, iRef) : 0;
    r.labels.rvar = formatOhms(rb);
    r.values.req = formatOhms(req);
    r.values.i = closed ? formatAmps(i) : "0 A";
    r.status = "Parallel branches share the same two nodes, so the equivalent resistance falls below the smaller branch.";
    return r;
  },

  /* Lab 2 Part 3A: independent parallel LED branches. */
  "branches-led": (v, c) => {
    const r = blank();
    const closed = v.sw !== false;
    const rl = typeof v.R === "number" ? v.R : c.rRef;
    const il = currentThrough(c.vs, rl);
    const ir = currentThrough(c.vs, c.rFixed);
    const iRef = currentThrough(c.vs, c.rRef);
    r.flow.main = closed;
    r.states.sw = closed ? "closed" : "open";
    r.leds["led-l"] = closed ? relativeBrightness(il, iRef) : 0;
    r.leds["led-r"] = closed ? relativeBrightness(ir, iRef) : 0;
    r.labels.rl = formatOhms(rl);
    r.values.il = closed ? formatAmps(il) : "0 A";
    r.values.ir = closed ? formatAmps(ir) : "0 A";
    r.status = "Changing the left resistor changes only the left LED; the right branch keeps constant brightness.";
    return r;
  },

  /* Lab 2 Part 3B: series resistor feeding a variable-resistor / fixed-resistor split. */
  "split-led": (v, c) => {
    const r = blank();
    const closed = v.sw !== false;
    const vr = ((typeof v.pot === "number" ? v.pot : 20) / 100) * c.potMax;
    const rPar = parallelResistance(vr, c.rRight);
    const node = (c.vs * rPar) / (c.rFixed + rPar);
    const il = vr === 0 ? currentThrough(c.vs, c.rFixed) : node / vr;
    const ir = node / c.rRight;
    const iRef = currentThrough(c.vs, c.rFixed);
    r.flow.main = closed;
    r.states.sw = closed ? "closed" : "open";
    r.leds["led-l"] = closed ? relativeBrightness(il, iRef) : 0;
    r.leds["led-r"] = closed ? relativeBrightness(ir, iRef) : 0;
    r.labels.vr = formatOhms(vr);
    r.values.vr = formatOhms(vr);
    r.values.il = closed ? formatAmps(il) : "0 A";
    r.values.ir = closed ? formatAmps(ir) : "0 A";
    r.status =
      vr === 0
        ? "VR = 0: almost all current from the 3.3 k resistor flows through the left LED."
        : Math.abs(vr - c.rRight) < 1
          ? "VR = 10 k: both branches match and glow equally."
          : vr > c.rRight
            ? "Higher VR: the left LED dims and the right LED brightens."
            : "Lower VR: the left LED brightens and the right LED dims.";
    return r;
  },

  /* Lab 3 Part 1: RC timing node. */
  "rc-node": (v, c) => {
    const r = blank();
    const closed = v.sw !== false;
    const rc = typeof v.R === "number" ? v.R : c.rChgDefault;
    const cap = typeof v.C === "number" ? v.C : c.cDefault;
    const tauChg = timeConstant(rc, cap);
    const tauDis = timeConstant(c.rDis, cap);
    r.flow.charge = closed;
    r.flow.discharge = !closed;
    r.states.sw = closed ? "closed" : "open";
    r.leds.led = closed ? 1 : 0.35;
    r.labels.rchg = formatOhms(rc);
    r.labels.cap = formatFarads(cap);
    r.values.tauChg = formatSeconds(tauChg);
    r.values.tauChg5 = formatSeconds(5 * tauChg);
    r.values.tauDis = formatSeconds(tauDis);
    r.values.tauDis5 = formatSeconds(5 * tauDis);
    r.status = closed
      ? "Switch closed: the capacitor charges through the charging resistor toward 9 V."
      : "Switch open: the capacitor discharges through the 10 k resistor and LED, so the LED fades.";
    return r;
  },

  /* Lab 3 Parts 2 and 3: capacitor combinations. */
  "cap-combo": (_v, c) => {
    const r = blank();
    const series = c.mode === 0;
    const ceq = series ? seriesCapacitance(c.c1, c.c2) : parallelCapacitance(c.c1, c.c2);
    r.values.ceq = formatFarads(ceq);
    r.status = series
      ? "Series capacitors combine reciprocally; the smaller capacitor dominates (note rounds to 9.1 uF)."
      : "Parallel capacitors add directly, giving the longest hold and fade time.";
    return r;
  },

  /* Lab 3 Part 4: loose-wire energy storage. */
  "loose-wire": (v, c) => {
    const r = blank();
    const pos = typeof v.wire === "string" ? v.wire : "float";
    r.flow.charge = pos === "charge";
    r.flow.discharge = pos === "discharge";
    r.states.cap = pos === "charge" ? "charging" : pos === "discharge" ? "discharging" : "holding";
    r.leds.led = pos === "discharge" ? 1 : 0;
    r.values.c = formatFarads(c.c);
    r.values.state =
      pos === "charge"
        ? "Charging toward 9 V"
        : pos === "discharge"
          ? "Discharging through 3.3 k and LED"
          : "Holding stored charge";
    r.status =
      pos === "charge"
        ? "Touched to +9 V: the 100 uF capacitor charges nearly instantly (no series resistor)."
        : pos === "discharge"
          ? "Touched to the 3.3 k lead: stored energy lights the LED briefly."
          : "Wire floating in air: the capacitor holds its charge.";
    return r;
  },

  /* Lab 4 Part 1: Si diode in series with an LED. */
  "diode-led": (v, c) => {
    const r = blank();
    const closed = v.sw !== false;
    const dFwd = v.diode !== false;
    const lFwd = v.ledDir !== false;
    const conducts = closed && dFwd && lFwd;
    const i = ledCurrent(c.vs, c.vSi + c.vLed, c.r);
    r.flow.main = conducts;
    r.states.sw = closed ? "closed" : "open";
    r.states.d = dFwd ? "forward" : "reversed";
    r.states.led = lFwd ? "forward" : "reversed";
    r.leds.led = conducts ? 1 : 0;
    r.values.state = conducts ? "Forward biased: conducting" : "Reverse biased: blocking";
    r.values.i = conducts ? formatAmps(i) : "0 A";
    r.status = conducts
      ? "Both devices are forward biased, so the 0.7 V diode drop and the LED threshold are overcome and the LED lights."
      : "A reversed diode or LED is reverse biased and blocks current completely; the LED stays dark.";
    return r;
  },

  /* Lab 4 Part 2: anti-parallel LED pair driven by capacitor charge and discharge. */
  "antiparallel-led": (v) => {
    const r = blank();
    const pos = typeof v.wire === "string" ? v.wire : "float";
    r.flow.charge = pos === "charge";
    r.flow.discharge = pos === "discharge";
    r.states.cap = pos === "charge" ? "charging" : pos === "discharge" ? "discharging" : "holding";
    r.leds["led-l"] = pos === "charge" ? 1 : 0;
    r.leds["led-r"] = pos === "discharge" ? 1 : 0;
    r.values.left = pos === "charge" ? "Lit: forward biased" : "Dark: reverse biased or no current";
    r.values.right = pos === "discharge" ? "Lit: forward biased" : "Dark: reverse biased or no current";
    r.status =
      pos === "charge"
        ? "Touched to +9 V: charging current forward biases the LEFT LED, which lights then dims as V_C approaches 9 V."
        : pos === "discharge"
          ? "Touched to GND: discharge current reverses and forward biases the RIGHT LED, which lights then dims as V_C approaches 0 V."
          : "Loose wire floating: neither LED conducts.";
    return r;
  },

  /* P-N junction biasing. */
  "pn-bias": (v) => {
    const r = blank();
    const fwd = v.bias !== false;
    r.states.pn = fwd ? "forward" : "reverse";
    r.labels["t-left"] = fwd ? "(+)" : "(-)";
    r.labels["t-right"] = fwd ? "(-)" : "(+)";
    r.flow.main = fwd;
    r.values.depletion = fwd ? "NARROW" : "WIDE";
    r.values.state = fwd ? "Conducts above 0.7 V (Si)" : "Blocks current (open switch)";
    r.status = fwd
      ? "Forward bias narrows the depletion region; conduction begins above the 0.7 V Si barrier."
      : "Reverse bias widens the depletion region; the junction blocks current like an open switch.";
    return r;
  },

  /* Lab 5 Part 1: BJT electronic switch. */
  "bjt-switch": (v) => {
    const r = blank();
    const on = v.sw === true;
    r.flow.base = on;
    r.flow.collector = on;
    r.states.sw = on ? "closed" : "open";
    r.states.q = on ? "saturation" : "cutoff";
    r.leds.led = on ? 1 : 0;
    r.values.region = on ? "Saturation (switch ON)" : "Cutoff (switch OFF)";
    r.values.ib = on ? "I_B flows" : "I_B = 0";
    r.status = on
      ? "Switch closed: base current flows and turns on a large collector current, so the LED lights."
      : "Switch open: I_B = 0, so the LED stays dark even though the collector loop is wired to 9 V.";
    return r;
  },

  /* Lab 5 Part 2: current gain and external-resistance saturation. */
  "bjt-gain": (v) => {
    const r = blank();
    const on = v.sw === true;
    const rc = typeof v.rc === "number" ? v.rc : 1000;
    const limited = rc >= 33000;
    r.flow.base = on;
    r.flow.collector = on;
    r.states.sw = on ? "closed" : "open";
    r.leds["led-l"] = on ? 0.25 : 0;
    r.leds["led-r"] = on ? (limited ? 0.75 : 1) : 0;
    r.labels.rc = formatOhms(rc);
    r.values.relation = !on ? "I_B = 0, I_C = 0" : limited ? "I_C is about 3 x I_B" : "I_C >> I_B";
    r.values.region = !on ? "Cutoff" : limited ? "Saturation (external R limits I_C)" : "Active: I_C = beta I_B";
    r.status = !on
      ? "Switch open: neither LED conducts."
      : limited
        ? "33 k in the collector branch caps I_C near 3 x I_B (saturation)."
        : "The collector LED glows far brighter than the base LED because a small I_B is amplified into a large I_C. Brightness is qualitative.";
    return r;
  },

  /* Lab 5 Part 3: base and collector tied together. */
  "bjt-diode": (v) => {
    const r = blank();
    const on = v.sw === true;
    r.flow.main = on;
    r.states.sw = on ? "closed" : "open";
    r.leds.led = on ? 1 : 0;
    r.values.mode = "Diode mode, 0.7 V threshold";
    r.status = "Shorting B to C removes current amplification: the transistor acts as a single silicon diode with a 0.7 V threshold.";
    return r;
  },

  /* Instrument connections. */
  "meter-voltmeter": () => {
    const r = blank();
    r.flow.main = true;
    r.values.reading = "V across R_load";
    r.values.draw = "Negligible meter current";
    r.status = "A voltmeter connects in parallel across the component; its very high internal resistance draws negligible current.";
    return r;
  },
  "meter-ammeter": (v) => {
    const r = blank();
    const series = v.placement !== "parallel";
    r.flow.main = series;
    r.flow.fault = !series;
    r.states.fault = series ? "ok" : "short";
    r.values.reading = series ? "I through R_load" : "Near-short circuit";
    r.values.result = series ? "Correct" : "Blows the meter internal fuse";
    r.status = series
      ? "An ammeter goes in series: break the loop and insert the meter; its very low internal resistance leaves the current unchanged."
      : "An ammeter in parallel across a voltage source creates a near-short circuit that blows the meter's internal fuse.";
    return r;
  },
  "meter-ohmmeter": (v) => {
    const r = blank();
    const powered = v.power === true;
    r.flow.main = false;
    r.flow.fault = powered;
    r.states.source = powered ? "connected" : "disconnected";
    r.values.reading = powered ? "Skewed" : "R_test";
    r.values.result = powered ? "Reading corrupted, meter at risk" : "Correct";
    r.status = powered
      ? "Measuring resistance with power applied skews the reading and can damage the meter."
      : "Power off and the component isolated: the ohmmeter connects across R_test and reads its resistance.";
    return r;
  },

  /* Machine Project 2 LED board. */
  "gpio-leds": (v, c) => {
    const r = blank();
    const rr = typeof v.R === "number" ? v.R : 1000;
    const i = ledCurrent(c.vGpio, c.vLed, rr);
    ["1", "2", "3"].forEach((n) => {
      const on = v[`gpio${n}`] === true;
      r.flow[`g${n}`] = on;
      r.leds[`led${n}`] = on ? 1 : 0;
      r.values[`i${n}`] = on ? formatAmps(i) : "0 A";
    });
    r.labels.r1 = formatOhms(rr);
    r.labels.r2 = formatOhms(rr);
    r.labels.r3 = formatOhms(rr);
    r.values.vr = `${(c.vGpio - c.vLed).toFixed(1)} V`;
    r.status = "Each GPIO drives one independent branch: GPIO -> R -> LED -> GND. Current uses V_GPIO = 3.3 V and V_LED = 2.0 V.";
    return r;
  },

  /* Sensor divider and comparator. */
  "sensor-compare": (v, c) => {
    const r = blank();
    const rs = typeof v.rs === "number" ? v.rs : 10000;
    const vSense = dividerOutput(c.vs, c.rTop, rs);
    const high = comparatorOutput(c.vRef, vSense);
    const rSwitch = dividerBottomForTarget(c.vs, c.rTop, c.vRef);
    r.flow.main = true;
    r.leds.led = high ? 1 : 0;
    r.states.cmp = high ? "high" : "low";
    r.labels.rs = formatOhms(rs);
    r.labels.vsense = `V_sense = ${vSense.toFixed(2)} V`;
    r.labels.vref = `V_ref = ${c.vRef.toFixed(1)} V`;
    r.values.vsense = `${vSense.toFixed(2)} V`;
    r.values.vref = `${c.vRef.toFixed(1)} V`;
    r.values.vout = high ? "HIGH (1)" : "LOW (0)";
    r.values.threshold = formatOhms(rSwitch);
    r.status = high
      ? "V+ (V_ref) exceeds V- (V_sense): the comparator output switches HIGH and drives the indicator."
      : "V+ (V_ref) is below V- (V_sense): the comparator output is LOW.";
    return r;
  },

  /* Three-wire grounded AC system. */
  "ac-wiring": (v) => {
    const r = blank();
    const closed = v.sw !== false;
    r.flow.main = closed;
    r.states.sw = closed ? "closed" : "open";
    r.values.path = closed ? "Hot to load to neutral" : "Open at the power switch";
    r.values.ground = "Bonded to exposed metal chassis";
    r.status = closed
      ? "Hot passes through the series fuse and power switch to the load and returns on the neutral. The D-shaped third pin bonds the chassis to earth."
      : "Power switch open: the series path to the load is broken.";
    return r;
  },
};

export function getBehavior(key: string): Behavior {
  return BEHAVIORS[key] ?? (() => blank());
}

export function defaultParamValues(part: PartSpec): ParamValues {
  const out: ParamValues = {};
  for (const p of part.params) out[p.id] = p.default;
  return out;
}

/* ------------------------------------------------------------------ */
/* Scene specs                                                         */
/* ------------------------------------------------------------------ */

const ohmReadouts = (...pairs: [string, string][]): ReadoutSpec[] =>
  pairs.map(([id, label]) => ({ id, label }));

/* --- Instrument connections ---------------------------------------- */

const batterySrc = (x: number, y: number): DiagramElement => ({
  id: "src",
  type: "battery",
  x,
  y,
  label: "V_src",
  lbl: [-26, 4],
  role: "DC voltage source that drives the circuit.",
  formula: "V = I R",
});

const loadVertical = (x: number, y: number): DiagramElement => ({
  id: "load",
  type: "resistor",
  x,
  y,
  rot: 90,
  label: "R_load",
  role: "Load resistance whose voltage or current is measured.",
  formula: "V = I R",
});

const instrumentConnections: DiagramSpec = {
  id: "instrument-connections",
  title: "Instrument Connection Rules",
  description: "Voltmeter in parallel, ammeter in series, ohmmeter across an isolated component with power off.",
  kind: "schematic",
  parts: [
    {
      id: "voltmeter",
      label: "Voltmeter (parallel)",
      viewBox: [520, 200],
      elements: [
        batterySrc(80, 110),
        loadVertical(260, 110),
        {
          id: "meter",
          type: "meter",
          x: 400,
          y: 110,
          rot: 90,
          text: "V",
          label: "Voltmeter",
          role: "Voltmeter connected in parallel across the component; very high internal resistance draws negligible current.",
          formula: "V = I R",
        },
      ],
      wires: [
        { id: "top-1", points: ["src.p", [80, 50], [260, 50], "load.a"], on: "main" },
        { id: "top-2", points: [[260, 50], [400, 50], "meter.a"], on: "main" },
        { id: "bot-1", points: ["src.n", [80, 170], [260, 170], "load.b"], on: "main" },
        { id: "bot-2", points: [[260, 170], [400, 170], "meter.b"], on: "main" },
      ],
      params: [],
      readouts: ohmReadouts(["reading", "Measures"], ["draw", "Meter loading"]),
      notes: ["Always verify supply voltage with a voltmeter in parallel before connecting LEDs or polarized components."],
      behavior: "meter-voltmeter",
      consts: {},
    },
    {
      id: "ammeter",
      label: "Ammeter (series)",
      viewBox: [520, 200],
      elements: [
        batterySrc(80, 110),
        loadVertical(400, 110),
        {
          id: "meter",
          type: "meter",
          x: 230,
          y: 50,
          text: "A",
          label: "Ammeter",
          lbl: [0, -26],
          role: "Ammeter inserted in series in the current path; very low internal resistance.",
          formula: "I = \\frac{V}{R}",
          when: { param: "placement", eq: "series" },
        },
        {
          id: "meter-p",
          type: "meter",
          x: 200,
          y: 110,
          rot: 90,
          text: "A",
          label: "Ammeter",
          lbl: [24, 4],
          role: "Ammeter wrongly placed across the source: a near-short circuit that blows the meter fuse.",
          formula: "I = \\frac{V}{R} \\to \\infty",
          when: { param: "placement", eq: "parallel" },
        },
      ],
      wires: [
        { id: "s-top-1", points: ["src.p", [80, 50], "meter.a"], on: "main", when: { param: "placement", eq: "series" } },
        { id: "s-top-2", points: ["meter.b", [400, 50], "load.a"], on: "main", when: { param: "placement", eq: "series" } },
        { id: "s-bot", points: ["src.n", [80, 170], [400, 170], "load.b"], on: "main", when: { param: "placement", eq: "series" } },
        { id: "p-top", points: ["src.p", [80, 50], [400, 50], "load.a"], on: "main", when: { param: "placement", eq: "parallel" } },
        { id: "p-bot", points: ["src.n", [80, 170], [400, 170], "load.b"], on: "main", when: { param: "placement", eq: "parallel" } },
        { id: "p-meter-top", points: [[200, 50], "meter-p.a"], on: "fault", when: { param: "placement", eq: "parallel" } },
        { id: "p-meter-bot", points: ["meter-p.b", [200, 170]], on: "fault", when: { param: "placement", eq: "parallel" } },
      ],
      params: [
        {
          kind: "choice",
          id: "placement",
          label: "Meter placement",
          options: [
            { value: "series", label: "Series (in the current path)" },
            { value: "parallel", label: "Parallel across the source" },
          ],
          default: "series",
        },
      ],
      readouts: ohmReadouts(["reading", "Measures"], ["result", "Outcome"]),
      notes: ["Break the circuit path to place an ammeter in series."],
      behavior: "meter-ammeter",
      consts: {},
    },
    {
      id: "ohmmeter",
      label: "Ohmmeter (power off)",
      viewBox: [520, 220],
      elements: [
        {
          id: "src",
          type: "battery",
          x: 90,
          y: 100,
          label: "V_src",
          lbl: [-26, 4],
          role: "Source that must be disconnected before measuring resistance.",
          formula: "V = I R",
        },
        {
          id: "rtest",
          type: "resistor",
          x: 260,
          y: 100,
          label: "R_test",
          role: "Component under test with at least one leg isolated.",
          formula: "R = \\frac{V}{I}",
        },
        {
          id: "meter",
          type: "meter",
          x: 260,
          y: 160,
          text: "\u03A9",
          label: "Ohmmeter",
          lbl: [0, 30],
          role: "Ohmmeter connected in parallel across the component, only after power is disconnected.",
          formula: "R = \\frac{V}{I}",
        },
      ],
      wires: [
        { id: "leg-a", points: [[230, 100], [230, 160]], on: "none" },
        { id: "leg-b", points: [[290, 100], [290, 160]], on: "none" },
        { id: "pw-top", points: ["src.p", [90, 40], [230, 40], [230, 100]], on: "fault", when: { param: "power", eq: true } },
        { id: "pw-bot", points: ["src.n", [90, 190], [340, 190], [340, 100], [290, 100]], on: "fault", when: { param: "power", eq: true } },
      ],
      params: [
        { kind: "toggle", id: "power", label: "Source power", labelOn: "Power ON (incorrect)", labelOff: "Power OFF, isolated (correct)", default: false },
      ],
      readouts: ohmReadouts(["reading", "Reading"], ["result", "Outcome"]),
      notes: ["Disconnect power before measuring resistance with an ohmmeter in parallel."],
      behavior: "meter-ohmmeter",
      consts: {},
    },
  ],
};

/* --- Lab 1 ---------------------------------------------------------- */

const lab1: DiagramSpec = (() => {
  const p1c = chain(70, [
    SUPPLY9,
    SWITCH,
    { ...resItem("r", "R"), value: undefined },
    ledItem(),
    GND,
  ]);
  const p2base = chain(100, [
    SUPPLY9,
    SWITCH,
    resItem("rs", "1 k\u03A9 safety"),
    {
      id: "pot",
      type: "pot",
      label: "50 k\u03A9 pot",
      role: "Potentiometer wired from pin 14 to the wiper (pin 15); pin 16 is unconnected.",
      sub: "pin 16 open",
      formula: "R_{pot} = k R_{max}",
    },
  ]);
  return {
    id: "lab1-led-series",
    title: "Lab 1: The Light Bulb",
    description: "A fixed resistor or potentiometer sets the LED current, shown as brightness.",
    kind: "schematic",
    parts: [
      {
        id: "p1",
        label: "Part 1: fixed resistor",
        viewBox: [440, 130],
        elements: p1c.elements,
        wires: p1c.wires,
        params: [swParam, choiceOhms("R", "Series resistor", [1000, 10000, 100000], 10000)],
        readouts: ohmReadouts(["rt", "R_T"], ["i", "Current I = V / R_T"]),
        notes: ["1 k brightest, 10 k medium, 100 k very dim."],
        behavior: "series-led",
        consts: { vs: 9, rFixed: 0, rRef: 1000, potMax: 0 },
      },
      {
        id: "p2",
        label: "Part 2: potentiometer",
        viewBox: [520, 160],
        elements: [
          ...p2base.elements,
          { ...ledItem(), x: 420, y: 100 },
          { ...GND, x: 480, y: 100 },
        ],
        wires: [
          ...p2base.wires,
          { id: "w-pot-led", points: ["pot.w", [300, 60], [360, 60], [360, 100], "led.a"], on: "main" },
          { id: "w-led-gnd", points: ["led.b", "gnd.p"], on: "main" },
        ],
        params: [
          swParam,
          { kind: "range", id: "pot", label: "Potentiometer dial", min: 0, max: 100, step: 1, unit: "%", default: 50 },
        ],
        readouts: ohmReadouts(["rt", "R_T = 1 k + R_pot"], ["i", "Current I = V / R_T"]),
        notes: ["Moving the jumper from pin 14 to pin 16 reverses the dial direction."],
        behavior: "series-led",
        consts: { vs: 9, rFixed: 1000, rRef: 1000, potMax: 50000 },
      },
    ],
  };
})();

/* --- Lab 2 ---------------------------------------------------------- */

const lab2: DiagramSpec = (() => {
  const s = chain(70, [SUPPLY9, SWITCH, resItem("r3", "3.3 k\u03A9"), { ...resItem("rvar", "R"), value: undefined }, ledItem(), GND]);
  const par: PartSpec = {
    id: "par",
    label: "Part 2: parallel",
    viewBox: [520, 150],
    elements: [
      { ...SUPPLY9, x: 40, y: 80 },
      { ...SWITCH, x: 110, y: 80 },
      { id: "n1", type: "junction", x: 170, y: 80, role: "Node shared by both parallel branches." },
      { ...resItem("r3", "3.3 k\u03A9"), x: 250, y: 50 },
      { ...resItem("rvar", "R"), value: undefined, x: 250, y: 110 },
      { id: "n2", type: "junction", x: 330, y: 80, role: "Node shared by both parallel branches." },
      { ...ledItem(), x: 400, y: 80 },
      { ...GND, x: 470, y: 80 },
    ],
    wires: [
      { id: "w1", points: ["vs.p", "sw.a"], on: "main" },
      { id: "w2", points: ["sw.b", "n1.p", [170, 50], "r3.a"], on: "main" },
      { id: "w3", points: ["n1.p", [170, 110], "rvar.a"], on: "main" },
      { id: "w4", points: ["r3.b", [330, 50], "n2.p"], on: "main" },
      { id: "w5", points: ["rvar.b", [330, 110], "n2.p"], on: "main" },
      { id: "w6", points: ["n2.p", "led.a"], on: "main" },
      { id: "w7", points: ["led.b", "gnd.p"], on: "main" },
    ],
    params: [swParam, choiceOhms("R", "Second resistor", [100000, 10000, 1000], 100000)],
    readouts: ohmReadouts(["req", "Equivalent R"], ["i", "Current I = V / R_eq"]),
    notes: ["Equivalent resistance: 3.2 k (100 k), 2.5 k (10 k), 770 \u03A9 (1 k)."],
    behavior: "parallel-led",
    consts: { vs: 9, rFixed: 3300, rRef: 1000 },
  };
  const a3: PartSpec = {
    id: "p3a",
    label: "Part 3A: parallel LED branches",
    viewBox: [520, 170],
    elements: [
      { ...SUPPLY9, x: 40, y: 90 },
      { ...SWITCH, x: 110, y: 90 },
      { id: "n1", type: "junction", x: 170, y: 90, role: "Node feeding both LED branches." },
      { ...resItem("rl", "R"), value: undefined, x: 240, y: 50 },
      { ...ledItem("led-l", "LED_L"), x: 350, y: 50 },
      { ...resItem("rr", "3.3 k\u03A9"), x: 240, y: 130 },
      { ...ledItem("led-r", "LED_R", "green"), x: 350, y: 130 },
      { ...GND, x: 430, y: 90 },
    ],
    wires: [
      { id: "w1", points: ["vs.p", "sw.a"], on: "main" },
      { id: "w2", points: ["sw.b", "n1.p", [170, 50], "rl.a"], on: "main" },
      { id: "w3", points: ["n1.p", [170, 130], "rr.a"], on: "main" },
      { id: "w4", points: ["rl.b", "led-l.a"], on: "main" },
      { id: "w5", points: ["rr.b", "led-r.a"], on: "main" },
      { id: "w6", points: ["led-l.b", [430, 50], [430, 130], "led-r.b"], on: "main" },
    ],
    params: [swParam, choiceOhms("R", "Left branch resistor", [100000, 10000, 1000], 100000)],
    readouts: ohmReadouts(["il", "Left branch current"], ["ir", "Right branch current"]),
    notes: ["The right 3.3 k branch keeps constant brightness while the left resistor changes."],
    behavior: "branches-led",
    consts: { vs: 9, rFixed: 3300, rRef: 1000 },
  };
  const b3: PartSpec = {
    id: "p3b",
    label: "Part 3B: series-parallel",
    viewBox: [560, 190],
    elements: [
      { ...SUPPLY9, x: 40, y: 90 },
      { ...SWITCH, x: 100, y: 90 },
      { ...resItem("r3", "3.3 k\u03A9"), x: 190, y: 90 },
      { id: "n1", type: "junction", x: 250, y: 90, role: "Split node after the series 3.3 k resistor." },
      { id: "vr", type: "resistor", variable: true, x: 330, y: 50, label: "VR", role: "50 k variable resistor steering current between the branches.", formula: "V_{node} = V_S \\frac{R_{par}}{R_T + R_{par}}" },
      { ...ledItem("led-l", "LED_L"), x: 440, y: 50 },
      { ...resItem("r10", "10 k\u03A9"), x: 330, y: 130 },
      { ...ledItem("led-r", "LED_R", "green"), x: 440, y: 130 },
      { ...GND, x: 500, y: 90 },
    ],
    wires: [
      { id: "w1", points: ["vs.p", "sw.a"], on: "main" },
      { id: "w2", points: ["sw.b", "r3.a"], on: "main" },
      { id: "w3", points: ["r3.b", "n1.p"], on: "main" },
      { id: "w4", points: ["n1.p", [250, 50], "vr.a"], on: "main" },
      { id: "w5", points: ["n1.p", [250, 130], "r10.a"], on: "main" },
      { id: "w6", points: ["vr.b", "led-l.a"], on: "main" },
      { id: "w7", points: ["r10.b", "led-r.a"], on: "main" },
      { id: "w8", points: ["led-l.b", [500, 50], [500, 130], "led-r.b"], on: "main" },
    ],
    params: [
      swParam,
      { kind: "range", id: "pot", label: "VR dial (0 to 50 k\u03A9)", min: 0, max: 100, step: 1, unit: "%", default: 20 },
    ],
    readouts: ohmReadouts(["vr", "VR"], ["il", "Left LED current"], ["ir", "Right LED current"]),
    notes: ["At VR = 10 k both branches match and glow equally."],
    behavior: "split-led",
    consts: { vs: 9, rFixed: 3300, rRight: 10000, potMax: 50000 },
  };
  return {
    id: "lab2-resistor-networks",
    title: "Lab 2: Resistor Networks",
    description: "Series, parallel and combined resistor networks driving LEDs.",
    kind: "schematic",
    parts: [
      {
        id: "ser",
        label: "Part 1: series",
        viewBox: [560, 130],
        elements: s.elements,
        wires: s.wires,
        params: [swParam, choiceOhms("R", "Second resistor", [100000, 10000, 1000], 100000)],
        readouts: ohmReadouts(["rt", "R_T = 3.3 k + R"], ["i", "Current I = V / R_T"]),
        notes: ["R_T = 103.3 k, 13.3 k and 4.3 k for 100 k, 10 k and 1 k."],
        behavior: "series-led",
        consts: { vs: 9, rFixed: 3300, rRef: 4300, potMax: 0 },
      },
      par,
      a3,
      b3,
    ],
  };
})();

/* --- Lab 3 ---------------------------------------------------------- */

const lab3: DiagramSpec = (() => {
  const rc: PartSpec = {
    id: "p1",
    label: "Part 1: RC timing",
    viewBox: [560, 200],
    elements: [
      { ...SUPPLY9, x: 40, y: 60 },
      { ...SWITCH, x: 110, y: 60 },
      { ...resItem("rchg", "R", "\\tau = R C"), value: undefined, x: 200, y: 60 },
      { id: "n", type: "junction", x: 260, y: 60, role: "RC node shared by the capacitor and the LED branch." },
      { id: "cap", type: "capacitor", rot: 90, x: 260, y: 125, label: "C", lbl: [24, 4], role: "Electrolytic capacitor; observe the + and - polarity.", formula: "\\tau = R C" },
      { id: "gnd-c", type: "ground", x: 260, y: 155, role: "Ground reference (0 V)." },
      { ...resItem("rdis", "10 k\u03A9", "\\tau_{dis} = R_{dis} C"), x: 350, y: 60 },
      { ...ledItem(), x: 450, y: 60 },
      { ...GND, x: 510, y: 60 },
    ],
    wires: [
      { id: "w1", points: ["vs.p", "sw.a"], on: "charge" },
      { id: "w2", points: ["sw.b", "rchg.a"], on: "charge" },
      { id: "w3", points: ["rchg.b", "n.p"], on: "charge" },
      { id: "w4", points: ["n.p", "cap.a"], on: ["charge", "discharge"] },
      { id: "w5", points: ["n.p", "rdis.a"], on: ["charge", "discharge"] },
      { id: "w6", points: ["rdis.b", "led.a"], on: ["charge", "discharge"] },
      { id: "w7", points: ["led.b", "gnd.p"], on: ["charge", "discharge"] },
    ],
    params: [
      swParam,
      choiceOhms("R", "Charging resistor", [3300, 1000], 3300),
      {
        kind: "choice",
        id: "C",
        label: "Capacitor",
        options: [
          { value: 100e-6, label: "100 \u00B5F" },
          { value: 10e-6, label: "10 \u00B5F" },
        ],
        default: 100e-6,
      },
    ],
    readouts: ohmReadouts(["tauChg", "\u03C4 charge"], ["tauChg5", "5\u03C4 charge"], ["tauDis", "\u03C4 discharge"], ["tauDis5", "5\u03C4 discharge"]),
    notes: ["1 k speeds charging only; 10 \u00B5F speeds both charge and discharge."],
    behavior: "rc-node",
    consts: { rDis: 10000, rChgDefault: 3300, cDefault: 100e-6 },
    workbench: { id: "rc-timing", label: "Open the RC Timing Workbench" },
  };
  const capBranch = (id: string, label: string, mode: number): PartSpec => ({
    id,
    label,
    viewBox: [420, 220],
    elements:
      mode === 0
        ? [
            { id: "n", type: "junction", x: 140, y: 40, label: "RC node", lbl: [0, -12], role: "Connection to the RC node." },
            { id: "c1", type: "capacitor", rot: 90, x: 140, y: 80, label: "100 \u00B5F", lbl: [24, 4], role: "First series capacitor; observe + and - polarity.", formula: "\\frac{1}{C_{eq}} = \\frac{1}{C_1} + \\frac{1}{C_2}" },
            { id: "c2", type: "capacitor", rot: 90, x: 140, y: 140, label: "10 \u00B5F", lbl: [24, 4], role: "Second series capacitor; the smaller value dominates.", formula: "\\frac{1}{C_{eq}} = \\frac{1}{C_1} + \\frac{1}{C_2}" },
            { id: "gnd", type: "ground", x: 140, y: 170, role: "Ground reference (0 V)." },
          ]
        : [
            { id: "n", type: "junction", x: 100, y: 60, label: "RC node", lbl: [0, -12], role: "Connection to the RC node." },
            { id: "c1", type: "capacitor", rot: 90, x: 100, y: 100, label: "10 \u00B5F", lbl: [24, 4], role: "First parallel capacitor.", formula: "C_{eq} = C_1 + C_2" },
            { id: "c2", type: "capacitor", rot: 90, x: 220, y: 100, label: "100 \u00B5F", lbl: [24, 4], role: "Second parallel capacitor.", formula: "C_{eq} = C_1 + C_2" },
            { id: "gnd", type: "ground", x: 160, y: 130, role: "Ground reference (0 V)." },
          ],
    wires:
      mode === 0
        ? [{ id: "stub", points: ["n.p", "c1.a"] }]
        : [
            { id: "stub", points: ["n.p", [100, 70]] },
            { id: "top", points: [[100, 70], [220, 70]] },
            { id: "bot", points: [[100, 130], [220, 130]] },
          ],
    params: [],
    readouts: ohmReadouts(["ceq", "Equivalent capacitance"]),
    notes: [mode === 0 ? "100 \u00B5F in series with 10 \u00B5F behaves like 9.1 \u00B5F." : "10 \u00B5F plus 100 \u00B5F behaves like 110 \u00B5F."],
    behavior: "cap-combo",
    consts: { c1: 100e-6, c2: 10e-6, mode },
  });
  const loose: PartSpec = {
    id: "p4",
    label: "Part 4: loose-wire storage",
    viewBox: [560, 180],
    elements: [
      { ...SUPPLY9, x: 110, y: 40 },
      { id: "touch", type: "junction", x: 290, y: 40, label: "touch to discharge", lbl: [0, -12], role: "Resistor lead touched by the loose wire to discharge the capacitor." },
      { id: "cap", type: "capacitor", rot: 90, x: 200, y: 105, label: "100 \u00B5F", lbl: [24, 4], role: "Storage capacitor; + side on the loose wire.", formula: "\\tau = R C" },
      { id: "gnd-c", type: "ground", x: 200, y: 135, role: "Ground reference (0 V)." },
      { ...resItem("r", "3.3 k\u03A9"), x: 360, y: 40 },
      { ...ledItem(), x: 460, y: 40 },
      { ...GND, x: 520, y: 40 },
    ],
    wires: [
      { id: "lw-charge", points: ["cap.a", [200, 40], "vs.p"], on: "charge", when: { param: "wire", eq: "charge" } },
      { id: "lw-float", points: ["cap.a", [200, 54]], when: { param: "wire", eq: "float" } },
      { id: "lw-discharge", points: ["cap.a", [200, 40], "touch.p"], on: "discharge", when: { param: "wire", eq: "discharge" } },
      { id: "w1", points: ["touch.p", "r.a"], on: "discharge" },
      { id: "w2", points: ["r.b", "led.a"], on: "discharge" },
      { id: "w3", points: ["led.b", "gnd.p"], on: "discharge" },
    ],
    params: [
      {
        kind: "choice",
        id: "wire",
        label: "Loose wire position",
        options: [
          { value: "charge", label: "Touch +9 V (charge)" },
          { value: "float", label: "Float in air (hold)" },
          { value: "discharge", label: "Touch 3.3 k lead (discharge)" },
        ],
        default: "float",
      },
    ],
    readouts: ohmReadouts(["state", "Capacitor state"], ["c", "Capacitance"]),
    notes: ["Lower discharge R gives a brighter, shorter flash; higher R gives a dimmer, longer glow."],
    behavior: "loose-wire",
    consts: { c: 100e-6 },
    workbench: { id: "rc-timing", label: "Open the RC Timing Workbench" },
  };
  return {
    id: "lab3-capacitor-circuits",
    title: "Lab 3: Capacitors",
    description: "RC timing, series and parallel capacitors, and loose-wire energy storage.",
    kind: "schematic",
    parts: [rc, capBranch("p2", "Part 2: series", 0), capBranch("p3", "Part 3: parallel", 1), loose],
  };
})();

/* --- Lab 4 ---------------------------------------------------------- */

const lab4: DiagramSpec = (() => {
  const bias: PartSpec = {
    id: "bias",
    label: "P-N biasing",
    viewBox: [520, 150],
    elements: [
      { id: "t-left", type: "junction", x: 60, y: 70, label: "(+)", lbl: [0, -12], role: "Left terminal of the junction.", },
      { id: "pn", type: "pn", x: 260, y: 70, label: "P-N junction", lbl: [0, -42], role: "P-N junction: the depletion region narrows under forward bias and widens under reverse bias.", formula: "V_{barrier} = 0.7\\text{ V (Si)}" },
      { id: "t-right", type: "junction", x: 460, y: 70, label: "(-)", lbl: [0, -12], role: "Right terminal of the junction." },
    ],
    wires: [
      { id: "w1", points: ["t-left.p", "pn.a"], on: "main" },
      { id: "w2", points: ["pn.b", "t-right.p"], on: "main" },
    ],
    params: [{ kind: "toggle", id: "bias", label: "Bias", labelOn: "Forward", labelOff: "Reverse", default: true }],
    readouts: ohmReadouts(["depletion", "Depletion region"], ["state", "Behavior"]),
    notes: ["Forward: depletion narrow, conducts above 0.7 V (Si). Reverse: depletion wide, blocks current."],
    behavior: "pn-bias",
    consts: {},
  };
  const p1c = chain(70, [
    SUPPLY9,
    SWITCH,
    resItem("r", "3.3 k\u03A9"),
    { id: "d", type: "diode", label: "Si diode", sub: "stripe right", role: "Silicon rectifier diode; the stripe marks the cathode.", formula: "V_{barrier} = 0.7\\text{ V}" },
    ledItem(),
    GND,
  ]);
  const p1: PartSpec = {
    id: "p1",
    label: "Part 1: diode + LED",
    viewBox: [560, 130],
    elements: p1c.elements,
    wires: p1c.wires,
    params: [
      swParam,
      { kind: "toggle", id: "diode", label: "Silicon diode", labelOn: "Forward (stripe toward LED)", labelOff: "Reversed", default: true },
      { kind: "toggle", id: "ledDir", label: "LED", labelOn: "Forward (flat side to GND)", labelOff: "Reversed", default: true },
    ],
    readouts: ohmReadouts(["state", "Bias state"], ["i", "I = (V_S - 0.7 - 1.5) / R"]),
    notes: ["Lab 4 recap thresholds: 0.7 V for Si, about 1.5 V for GaAs LEDs."],
    behavior: "diode-led",
    consts: { vs: 9, vSi: 0.7, vLed: 1.5, r: 3300 },
  };
  const p2: PartSpec = {
    id: "p2",
    label: "Part 2: anti-parallel LEDs",
    viewBox: [560, 200],
    elements: [
      { ...SUPPLY9, x: 70, y: 40 },
      { id: "cap", type: "capacitor", x: 150, y: 100, label: "100 \u00B5F", sub: "+ left", role: "Storage capacitor; + lead on the loose wire.", formula: "\\tau = R C" },
      { id: "gnd-l", type: "ground", x: 70, y: 160, label: "GND", lbl: [0, 34], role: "Ground reference (0 V)." },
      { ...resItem("r", "3.3 k\u03A9"), x: 250, y: 100 },
      { id: "n", type: "junction", x: 300, y: 100, role: "Node feeding both anti-parallel LEDs." },
      { ...ledItem("led-l", "LED LEFT"), x: 400, y: 60 },
      { ...ledItem("led-r", "LED RIGHT", "green"), x: 400, y: 140, rot: 180 },
      { ...GND, x: 470, y: 100 },
    ],
    wires: [
      { id: "lw-charge", points: ["cap.a", [90, 100], [90, 40], "vs.p"], on: "charge", when: { param: "wire", eq: "charge" } },
      { id: "lw-float", points: ["cap.a", [90, 100], [90, 84]], when: { param: "wire", eq: "float" } },
      { id: "lw-discharge", points: ["cap.a", [90, 100], [90, 160], "gnd-l.p"], on: "discharge", when: { param: "wire", eq: "discharge" } },
      { id: "w1", points: ["cap.b", "r.a"], on: ["charge", "discharge"] },
      { id: "w2", points: ["r.b", "n.p"], on: ["charge", "discharge"] },
      { id: "w3", points: ["n.p", [300, 60], "led-l.a"], on: "charge" },
      { id: "w4", points: ["n.p", [300, 140], "led-r.b"], on: "discharge" },
      { id: "w5", points: ["led-l.b", [470, 60], "gnd.p"], on: "charge" },
      { id: "w6", points: ["led-r.a", [470, 140], "gnd.p"], on: "discharge" },
    ],
    params: [
      {
        kind: "choice",
        id: "wire",
        label: "Loose wire position",
        options: [
          { value: "charge", label: "Touch +9 V (charge)" },
          { value: "float", label: "Float in air" },
          { value: "discharge", label: "Touch GND (discharge)" },
        ],
        default: "charge",
      },
    ],
    readouts: ohmReadouts(["left", "LED LEFT"], ["right", "LED RIGHT"]),
    notes: ["Charging lights LEFT; discharging lights RIGHT."],
    behavior: "antiparallel-led",
    consts: {},
    workbench: { id: "rc-timing", label: "Open the RC Timing Workbench" },
  };
  return {
    id: "lab4-diode-circuits",
    title: "Lab 4: Diodes",
    description: "P-N biasing, a silicon diode in series with an LED, and an anti-parallel LED charge indicator.",
    kind: "schematic",
    parts: [bias, p1, p2],
  };
})();

/* --- Lab 5 ---------------------------------------------------------- */

const npnEl = (x: number, y: number, label = "NPN"): DiagramElement => ({
  id: "q",
  type: "npn",
  x,
  y,
  label,
  lbl: [-14, -38],
  role: "NPN BJT: a small base current controls a larger collector current.",
  formula: "I_C = \\beta I_B",
});
const vRes = (id: string, x: number, y: number, label: string): DiagramElement => ({
  ...resItem(id, label),
  x,
  y,
  rot: 90,
});
const vLed = (id: string, x: number, y: number, label: string, color: LedColor = "red"): DiagramElement => ({
  ...ledItem(id, label, color),
  x,
  y,
  rot: 90,
});

const lab5: DiagramSpec = {
  id: "lab5-transistor-circuits",
  title: "Lab 5: Transistors",
  description: "BJT as an electronic switch, a current amplifier, and a diode-connected transistor.",
  kind: "schematic",
  parts: [
    {
      id: "p1",
      label: "Part 1: electronic switch",
      viewBox: [440, 270],
      elements: [
        { ...SUPPLY9, x: 60, y: 30 },
        { ...SWITCH, id: "sw", x: 140, y: 65, rot: 90, lbl: [24, 4] },
        vRes("rb", 140, 125, "10 k\u03A9"),
        vRes("rc", 318, 80, "1 k\u03A9"),
        vLed("led", 318, 140, "LED"),
        npnEl(300, 200),
        { id: "gnd", type: "ground", x: 318, y: 230, role: "Ground reference (0 V)." },
      ],
      wires: [
        { id: "rail", points: ["vs.p", [318, 30], "rc.a"], on: "collector" },
        { id: "tap", points: [[140, 30], "sw.a"], on: "base" },
        { id: "base", points: ["rb.b", [140, 200], "q.b"], on: "base" },
        { id: "rc-led", points: ["rc.b", "led.a"], on: "collector" },
        { id: "led-c", points: ["led.b", "q.c"], on: "collector" },
        { id: "emit", points: ["q.e", "gnd.p"], on: "collector" },
      ],
      params: [{ kind: "toggle", id: "sw", label: "Base switch", labelOn: "Pressed (closed)", labelOff: "Open", default: false }],
      readouts: ohmReadouts(["region", "Operating region"], ["ib", "Base current"]),
      notes: ["Open switch: I_B = 0 and the LED stays dark although the collector loop is wired to 9 V."],
      behavior: "bjt-switch",
      consts: {},
    },
    {
      id: "p2",
      label: "Part 2: gain and saturation",
      viewBox: [440, 270],
      elements: [
        { ...SUPPLY9, x: 40, y: 40 },
        { ...SWITCH, x: 110, y: 40 },
        vRes("rb", 180, 80, "100 k\u03A9"),
        vLed("led-l", 180, 140, "LED_L"),
        { ...vRes("rcol", 300, 80, "R"), value: undefined },
        vLed("led-r", 300, 140, "LED_R", "green"),
        npnEl(282, 200),
        { id: "gnd", type: "ground", x: 300, y: 230, role: "Ground reference (0 V)." },
      ],
      wires: [
        { id: "w0", points: ["vs.p", "sw.a"], on: "base" },
        { id: "rail", points: ["sw.b", [300, 40], "rcol.a"], on: ["base", "collector"] },
        { id: "tap", points: [[180, 40], "rb.a"], on: "base" },
        { id: "base", points: ["led-l.b", [180, 200], "q.b"], on: "base" },
        { id: "rl", points: ["rcol.b", "led-r.a"], on: "collector" },
        { id: "lc", points: ["led-r.b", "q.c"], on: "collector" },
        { id: "emit", points: ["q.e", "gnd.p"], on: "collector" },
      ],
      params: [
        { kind: "toggle", id: "sw", label: "Switch", labelOn: "Pressed (closed)", labelOff: "Open", default: true },
        choiceOhms("rc", "Collector resistor", [1000, 33000], 1000),
      ],
      readouts: ohmReadouts(["relation", "Current relation"], ["region", "Operating region"]),
      notes: ["Brightness here is qualitative: the note gives no LED currents, only I_C >> I_B and I_C about 3 I_B with 33 k."],
      behavior: "bjt-gain",
      consts: {},
    },
    {
      id: "p3",
      label: "Part 3: diode mode",
      viewBox: [400, 300],
      elements: [
        { ...SUPPLY9, x: 50, y: 100 },
        { ...SWITCH, x: 120, y: 100 },
        npnEl(230, 100),
        vRes("r", 248, 160, "3.3 k\u03A9"),
        vLed("led", 248, 220, "LED"),
        { id: "gnd", type: "ground", x: 248, y: 250, role: "Ground reference (0 V)." },
      ],
      wires: [
        { id: "w0", points: ["vs.p", "sw.a"], on: "main" },
        { id: "w1", points: ["sw.b", "q.b"], on: "main" },
        { id: "jumper", points: ["q.b", [200, 60], [248, 60], "q.c"], on: "main" },
        { id: "w2", points: ["q.e", "r.a"], on: "main" },
        { id: "w3", points: ["r.b", "led.a"], on: "main" },
        { id: "w4", points: ["led.b", "gnd.p"], on: "main" },
      ],
      params: [{ kind: "toggle", id: "sw", label: "Switch", labelOn: "Pressed (closed)", labelOff: "Open", default: false }],
      readouts: ohmReadouts(["mode", "Behavior"]),
      notes: ["Base and collector are tied together with a jumper."],
      behavior: "bjt-diode",
      consts: {},
    },
  ],
};

/* --- Machine Project 2 ---------------------------------------------- */

const mp2: DiagramSpec = (() => {
  const branch = (n: number, y: number, color: LedColor, name: string): { els: DiagramElement[]; wires: DiagramWire[] } => ({
    els: [
      { ...resItem(`r${n}`, "R"), value: undefined, x: 210, y, formula: "I = \\frac{V_{GPIO} - V_{LED}}{R}" },
      { ...ledItem(`led${n}`, `LED${n} ${name}`, color), x: 330, y },
    ],
    wires: [
      { id: `wa${n}`, points: [`hdr.g${n}`, `r${n}.a`], on: `g${n}` },
      { id: `wb${n}`, points: [`r${n}.b`, `led${n}.a`], on: `g${n}` },
      { id: `wc${n}`, points: [`led${n}.b`, [400, y], [400, 170]], on: `g${n}` },
    ],
  });
  const b1 = branch(1, 50, "red", "Red");
  const b2 = branch(2, 90, "green", "Green");
  const b3 = branch(3, 130, "orange", "Orange");
  return {
    id: "mp2-led-board",
    title: "Machine Project 2: 3-LED Interface Board",
    description: "Three independent GPIO branches, each GPIO to resistor to LED to GND.",
    kind: "schematic",
    parts: [
      {
        id: "board",
        label: "LED board schematic",
        viewBox: [480, 200],
        elements: [
          { id: "hdr", type: "header", x: 80, y: 110, label: "4-Pin Header", lbl: [0, -92], role: "4-pin header connecting GPIO1 to GPIO3 and GND to the ESP32.", w: 52, h: 160 },
          ...b1.els,
          ...b2.els,
          ...b3.els,
        ],
        wires: [
          ...b1.wires,
          ...b2.wires,
          ...b3.wires,
          { id: "gnd-wire", points: ["hdr.gnd", [400, 170]], on: ["g1", "g2", "g3"] },
        ],
        params: [
          { kind: "toggle", id: "gpio1", label: "GPIO1", labelOn: "HIGH", labelOff: "LOW", default: true },
          { kind: "toggle", id: "gpio2", label: "GPIO2", labelOn: "HIGH", labelOff: "LOW", default: false },
          { kind: "toggle", id: "gpio3", label: "GPIO3", labelOn: "HIGH", labelOff: "LOW", default: false },
          choiceOhms("R", "Resistor R (500 \u03A9 to 5 k\u03A9)", [500, 1000, 5000], 1000),
        ],
        readouts: ohmReadouts(["vr", "Voltage across R"], ["i1", "LED1 current"], ["i2", "LED2 current"], ["i3", "LED3 current"]),
        notes: ["Project 2 specifies R in the range 500 \u03A9 to 5 k\u03A9."],
        behavior: "gpio-leds",
        consts: { vGpio: 3.3, vLed: 2.0 },
      },
    ],
  };
})();

/* --- Sensor divider and comparator ---------------------------------- */

const sensorComparator: DiagramSpec = {
  id: "sensor-comparator",
  title: "Sensor Divider and Comparator",
  description: "A resistive sensor divider and a reference divider feed an open-loop comparator.",
  kind: "schematic",
  parts: [
    {
      id: "main",
      label: "Divider and comparator",
      viewBox: [580, 260],
      elements: [
        { id: "vs-ref", type: "supply", x: 80, y: 50, label: "+V_S", role: "Supply for the reference divider." },
        { id: "rrt", type: "resistor", rot: 90, x: 80, y: 86, label: "R_ref_top", lbl: [24, 4], role: "Top resistor of the reference divider.", formula: "V_{ref} = V_S \\frac{R_{bottom}}{R_{top} + R_{bottom}}" },
        { id: "nref", type: "junction", x: 80, y: 116, role: "Reference tap V_ref." },
        { id: "rrb", type: "resistor", rot: 90, x: 80, y: 146, label: "R_ref_bot", lbl: [24, 4], role: "Bottom resistor of the reference divider.", formula: "V_{ref} = V_S \\frac{R_{bottom}}{R_{top} + R_{bottom}}" },
        { id: "gnd-ref", type: "ground", x: 80, y: 176, role: "Ground reference (0 V)." },
        { id: "vs-s", type: "supply", x: 200, y: 50, label: "+V_S", role: "Supply for the sensor divider." },
        { id: "rt", type: "resistor", rot: 90, x: 200, y: 114, label: "R_top", lbl: [24, 4], value: "6 k\u03A9", role: "Fixed top resistor of the sensor divider.", formula: "V_{sense} = V_S \\frac{R_{sensor}}{R_{top} + R_{sensor}}" },
        { id: "nsense", type: "junction", x: 200, y: 144, role: "Sensor tap V_sense." },
        { id: "rs", type: "resistor", variable: true, rot: 90, x: 200, y: 174, label: "R_sensor", lbl: [24, 4], role: "Resistive pressure sensor: 10 k uncompressed, 2 k pressed hard.", formula: "V_{sense} = V_S \\frac{R_{sensor}}{R_{top} + R_{sensor}}" },
        { id: "gnd-s", type: "ground", x: 200, y: 204, role: "Ground reference (0 V)." },
        { id: "cmp", type: "comparator", x: 330, y: 130, label: "Comparator", lbl: [0, -34], role: "Open-loop comparator: output HIGH when V+ exceeds V-.", formula: "V_{out} = \\begin{cases} \\text{HIGH}, & V_+ > V_- \\\\ \\text{LOW}, & V_+ < V_- \\end{cases}" },
        { ...ledItem("led", "Indicator"), x: 470, y: 130 },
        { id: "gnd-o", type: "ground", x: 530, y: 130, role: "Ground reference (0 V)." },
      ],
      wires: [
        { id: "ref-s", points: ["vs-ref.p", "rrt.a"], on: "main" },
        { id: "ref-n", points: ["rrt.b", "rrb.a"], on: "main" },
        { id: "sen-s", points: ["vs-s.p", "rt.a"], on: "main" },
        { id: "sen-n", points: ["rt.b", "rs.a"], on: "main" },
        { id: "vref", points: ["nref.p", [110, 116], [110, 14], [262, 14], [262, 116], "cmp.p"] },
        { id: "vsense", points: ["nsense.p", [296, 144]] },
        { id: "out", points: ["cmp.o", "led.a"] },
        { id: "led-g", points: ["led.b", "gnd-o.p"] },
      ],
      params: [
        { kind: "range", id: "rs", label: "Sensor resistance", min: 2000, max: 10000, step: 100, unit: "\u03A9", default: 10000 },
      ],
      readouts: ohmReadouts(["vsense", "V_sense (V-)"], ["vref", "V_ref (V+)"], ["vout", "Comparator output"], ["threshold", "Switches at R_sensor"]),
      notes: ["Worked Example 2: V_S = 12 V, R_top = 6 k, V_ref = 5.0 V; V_sense feeds the inverting input."],
      behavior: "sensor-compare",
      consts: { vs: 12, rTop: 6000, vRef: 5.0 },
    },
  ],
};

/* --- Three-wire grounded AC system ---------------------------------- */

const groundedAc: DiagramSpec = {
  id: "grounded-ac-wiring",
  title: "Three-Wire Grounded AC System",
  description: "Hot through a series fuse and switch to the load, neutral return, and a bonded earth ground to the chassis.",
  kind: "schematic",
  parts: [
    {
      id: "main",
      label: "Three-wire system",
      viewBox: [560, 240],
      elements: [
        { id: "hot", type: "junction", x: 50, y: 50, label: "Utility Hot", lbl: [0, -12], role: "Hot conductor from the utility; carries the live voltage." },
        { id: "fuse", type: "fuse", x: 170, y: 50, label: "Fuse / Breaker", role: "Series overcurrent protection that opens when current exceeds its rating.", formula: "I_{fuse} > I_{rating} \\Rightarrow \\text{open}" },
        { id: "sw", type: "switch", x: 290, y: 50, label: "Power Switch", role: "Power switch in series with the hot conductor.", formula: "I = \\frac{V}{R_{load}}" },
        { id: "load", type: "box", x: 440, y: 95, w: 110, h: 70, text: "Load / Tx Primary", role: "Equipment load or transformer primary connected between hot and neutral." },
        { id: "neutral", type: "junction", x: 50, y: 130, label: "Utility Neutral (Polarized Wide Slot)", lbl: [60, -12], role: "Grounded neutral conductor on the wide slot of a polarized outlet." },
        { id: "gnd", type: "junction", x: 50, y: 200, label: "Earth Ground (3rd D-Pin)", lbl: [54, -12], role: "Independent D-shaped earth ground wired to exposed metal enclosures. Never defeat the third prong." },
        { id: "chassis", type: "box", x: 470, y: 200, w: 150, h: 40, text: "Exposed Metal Chassis", role: "Exposed metal equipment enclosure bonded to earth ground." },
      ],
      wires: [
        { id: "hot-1", points: ["hot.p", "fuse.a"], on: "main" },
        { id: "hot-2", points: ["fuse.b", "sw.a"], on: "main" },
        { id: "hot-3", points: ["sw.b", [440, 50], [440, 60]], on: "main" },
        { id: "neu", points: ["neutral.p", [440, 130]], on: "main" },
        { id: "gnd-w", points: ["gnd.p", [395, 200]], dashed: true },
      ],
      params: [{ kind: "toggle", id: "sw", label: "Power switch", labelOn: "Closed", labelOff: "Open", default: true }],
      readouts: ohmReadouts(["path", "Series path"], ["ground", "Third-wire ground"]),
      notes: ["The note states no fault outcome for the ground path, so no fault toggle is offered."],
      behavior: "ac-wiring",
      consts: {},
    },
  ],
};

/* --- Breadboard ----------------------------------------------------- */

const breadboardMap: DiagramSpec = {
  id: "breadboard-map",
  title: "Breadboard Internal Bus Map (830-Hole, \"W\" Split)",
  description: "Hover or select a hole to see which holes are electrically connected.",
  kind: "breadboard",
  parts: [
    {
      id: "map",
      label: "Bus map",
      viewBox: [640, 250],
      elements: [],
      wires: [],
      params: [],
      readouts: [],
      notes: [
        "Each vertical 5-hole column is connected (a to e, f to j).",
        "The center IC trench has no vertical connection across it.",
        "The power rails are split at the W; bridge the split with a jumper.",
      ],
      behavior: "none",
      consts: {},
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Registry                                                            */
/* ------------------------------------------------------------------ */

export const DIAGRAM_REGISTRY: Record<string, DiagramSpec> = Object.fromEntries(
  [instrumentConnections, lab1, lab2, lab3, lab4, lab5, mp2, sensorComparator, groundedAc, breadboardMap].map((d) => [d.id, d])
);

export function getDiagram(id: string): DiagramSpec | null {
  return DIAGRAM_REGISTRY[id] ?? null;
}
