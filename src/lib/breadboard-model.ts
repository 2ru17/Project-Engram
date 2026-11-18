// Pure connectivity model for the 830-hole breadboard map (NSETRON Module 02). No React.
// Facts from the note: each vertical 5-hole column is connected (j-f and e-a), the center IC trench
// has no vertical connection across it, and the power rails are split at the "W".

export const COLS = 60;
/** Rail halves are separated by the W split after this column. */
export const W_SPLIT_AFTER = 30;
export const UPPER_ROWS = ["j", "i", "h", "g", "f"] as const;
export const LOWER_ROWS = ["e", "d", "c", "b", "a"] as const;
export const RAILS = ["top-neg", "top-pos", "bot-pos", "bot-neg"] as const;

export type RailId = (typeof RAILS)[number];

export type Hole =
  | { kind: "main"; col: number; row: string }
  | { kind: "rail"; rail: RailId; col: number };

export function holeKey(h: Hole): string {
  return h.kind === "main" ? `${h.row}${h.col}` : `${h.rail}-${h.col}`;
}

export function railLabel(rail: RailId): string {
  return rail.endsWith("neg") ? "(-)" : "(+)";
}

export function holeName(h: Hole): string {
  return h.kind === "main" ? `${h.row}${h.col}` : `${railLabel(h.rail)}${h.col}`;
}

function railHalf(col: number): 0 | 1 {
  return col <= W_SPLIT_AFTER ? 0 : 1;
}

/** All holes electrically connected to `h` (including `h`). */
export function connectedHoles(h: Hole): Hole[] {
  if (h.kind === "main") {
    const rows = (UPPER_ROWS as readonly string[]).includes(h.row) ? UPPER_ROWS : LOWER_ROWS;
    return rows.map((row) => ({ kind: "main", col: h.col, row }));
  }
  const half = railHalf(h.col);
  const out: Hole[] = [];
  for (let c = 1; c <= COLS; c++) {
    if (railHalf(c) === half) out.push({ kind: "rail", rail: h.rail, col: c });
  }
  return out;
}

export function describeConnection(h: Hole): string {
  if (h.kind === "main") {
    const upper = (UPPER_ROWS as readonly string[]).includes(h.row);
    return `${holeName(h)} connects to the 5-hole column ${upper ? "j-f" : "e-a"} ${h.col}. The center IC trench blocks any connection to the opposite half.`;
  }
  const half = railHalf(h.col) === 0 ? `columns 1 to ${W_SPLIT_AFTER}` : `columns ${W_SPLIT_AFTER + 1} to ${COLS}`;
  return `${holeName(h)} connects along its rail for ${half} only. The W split isolates the other half; bridge it with a jumper.`;
}

export function parseHole(kind: "main" | "rail", col: number, rowOrRail: string): Hole | null {
  if (!Number.isInteger(col) || col < 1 || col > COLS) return null;
  if (kind === "main") {
    const all = [...UPPER_ROWS, ...LOWER_ROWS] as readonly string[];
    return all.includes(rowOrRail) ? { kind: "main", col, row: rowOrRail } : null;
  }
  return (RAILS as readonly string[]).includes(rowOrRail) ? { kind: "rail", rail: rowOrRail as RailId, col } : null;
}
