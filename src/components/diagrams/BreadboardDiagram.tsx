"use client";

import { memo, useCallback, useId, useMemo, useState } from "react";
import type { ChangeEvent, PointerEvent } from "react";
import {
  COLS,
  LOWER_ROWS,
  RAILS,
  UPPER_ROWS,
  W_SPLIT_AFTER,
  connectedHoles,
  describeConnection,
  holeKey,
  parseHole,
  railLabel,
  type Hole,
  type RailId,
} from "@/lib/breadboard-model";

const VIEW_W = 640;
const VIEW_H = 250;
const X0 = 46;
const DX = 9.5;
const RAIL_Y: Record<RailId, number> = { "top-neg": 16, "top-pos": 28, "bot-pos": 212, "bot-neg": 224 };

function colX(col: number): number {
  // The W split opens a visible gap between the two rail halves.
  return X0 + (col - 1) * DX + (col > W_SPLIT_AFTER ? 10 : 0);
}

function rowY(row: string): number {
  const upper = (UPPER_ROWS as readonly string[]).indexOf(row);
  if (upper >= 0) return 58 + upper * 10;
  return 134 + (LOWER_ROWS as readonly string[]).indexOf(row) * 10;
}

interface Dot {
  key: string;
  x: number;
  y: number;
  hole: Hole;
}

function buildDots(): Dot[] {
  const dots: Dot[] = [];
  for (let c = 1; c <= COLS; c++) {
    for (const row of [...UPPER_ROWS, ...LOWER_ROWS]) {
      const hole: Hole = { kind: "main", col: c, row };
      dots.push({ key: holeKey(hole), x: colX(c), y: rowY(row), hole });
    }
    for (const rail of RAILS) {
      const hole: Hole = { kind: "rail", rail, col: c };
      dots.push({ key: holeKey(hole), x: colX(c), y: RAIL_Y[rail], hole });
    }
  }
  return dots;
}

const DOTS = buildDots();

const BaseHoles = memo(function BaseHoles() {
  return (
    <g>
      {DOTS.map((d) => (
        <circle
          key={d.key}
          cx={d.x}
          cy={d.y}
          r={2.6}
          fill="var(--zen-void)"
          stroke="var(--zen-ink-muted)"
          strokeWidth={0.8}
          data-hole={d.key}
        />
      ))}
    </g>
  );
});

export interface BreadboardDiagramProps {
  title: string;
  description: string;
  notes: string[];
  ascii?: string;
}

export function BreadboardDiagram({ title, description, notes, ascii }: BreadboardDiagramProps) {
  const uid = useId();
  const colId = useId();
  const rowId = useId();
  const [selected, setSelected] = useState<Hole>({ kind: "main", col: 4, row: "j" });
  const [hover, setHover] = useState<Hole | null>(null);
  const active = hover ?? selected;

  const lit = useMemo(() => connectedHoles(active), [active]);
  const litKeys = useMemo(() => new Set(lit.map(holeKey)), [lit]);
  const litDots = useMemo(() => DOTS.filter((d) => litKeys.has(d.key)), [litKeys]);

  const holeFromEvent = useCallback((e: PointerEvent<SVGSVGElement>): Hole | null => {
    const key = (e.target as SVGElement).dataset?.hole;
    if (!key) return null;
    return DOTS.find((d) => d.key === key)?.hole ?? null;
  }, []);

  const handleOver = useCallback((e: PointerEvent<SVGSVGElement>) => setHover(holeFromEvent(e)), [holeFromEvent]);
  const handleLeave = useCallback(() => setHover(null), []);
  const handleClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const key = (e.target as SVGElement).dataset?.hole;
      const hole = key ? DOTS.find((d) => d.key === key)?.hole : null;
      if (hole) setSelected(hole);
    },
    []
  );

  const applyControls = useCallback(
    (col: number, rowOrRail: string) => {
      const kind = (RAILS as readonly string[]).includes(rowOrRail) ? "rail" : "main";
      const hole = parseHole(kind, col, rowOrRail);
      if (hole) setSelected(hole);
    },
    []
  );
  const selectedRow = selected.kind === "main" ? selected.row : selected.rail;
  const handleCol = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => applyControls(Number(e.target.value), selectedRow),
    [applyControls, selectedRow]
  );
  const handleRow = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => applyControls(selected.col, e.target.value),
    [applyControls, selected.col]
  );

  const gapX = colX(W_SPLIT_AFTER) + (colX(W_SPLIT_AFTER + 1) - colX(W_SPLIT_AFTER)) / 2;

  return (
    <figure className="rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card p-4 space-y-3 text-[var(--zen-frost)]">
      <figcaption className="space-y-0.5">
        <div className="text-sm font-bold tracking-wide uppercase text-[var(--zen-snow)]">{title}</div>
        <div className="text-xs text-[var(--zen-ink-muted)]">{description}</div>
      </figcaption>

      <div className="overflow-x-auto rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/70 p-2">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          role="img"
          aria-labelledby={`${uid}-t ${uid}-d`}
          className="min-w-[520px] w-full font-mono"
          onPointerOver={handleOver}
          onPointerLeave={handleLeave}
          onClick={handleClick}
        >
          <title id={`${uid}-t`}>{title}</title>
          <desc id={`${uid}-d`}>
            Breadboard with 60 columns. Each vertical 5-hole column is connected. The center trench has no connection across it. The power rails are split at the W.
          </desc>
          <BaseHoles />
          {litDots.map((d) => (
            <circle key={`lit-${d.key}`} cx={d.x} cy={d.y} r={3.6} fill="var(--zen-cyan)" stroke="var(--zen-cyan)" pointerEvents="none" />
          ))}
          <rect x={X0 - 6} y={110} width={VIEW_W - 2 * X0 + 24} height={16} fill="var(--zen-border)" opacity={0.35} pointerEvents="none" />
          <text x={VIEW_W / 2} y={122} textAnchor="middle" fontSize="9" fill="var(--zen-ink-muted)" pointerEvents="none">
            CENTER IC TRENCH: NO VERTICAL CONNECTION ACROSS
          </text>
          {[1, 10, 20, 30, 40, 50, 60].map((c) => (
            <text key={c} x={colX(c)} y={246} textAnchor="middle" fontSize="8" fill="var(--zen-ink-muted)" pointerEvents="none">
              {c}
            </text>
          ))}
          {UPPER_ROWS.map((r) => (
            <text key={r} x={X0 - 14} y={rowY(r) + 3} fontSize="8" fill="var(--zen-ink-muted)" textAnchor="middle" pointerEvents="none">{r}</text>
          ))}
          {LOWER_ROWS.map((r) => (
            <text key={r} x={X0 - 14} y={rowY(r) + 3} fontSize="8" fill="var(--zen-ink-muted)" textAnchor="middle" pointerEvents="none">{r}</text>
          ))}
          {RAILS.map((r) => (
            <text key={r} x={X0 - 14} y={RAIL_Y[r] + 3} fontSize="8" fill="var(--zen-ink-muted)" textAnchor="middle" pointerEvents="none">{railLabel(r)}</text>
          ))}
          {[RAIL_Y["top-neg"] - 8, RAIL_Y["bot-pos"] - 8].map((y) => (
            <g key={y} pointerEvents="none">
              <line x1={gapX} y1={y} x2={gapX} y2={y + (y < 100 ? 28 : 28)} stroke="var(--zen-amber)" strokeDasharray="2 2" />
            </g>
          ))}
          <text x={gapX} y={8} textAnchor="middle" fontSize="10" fill="var(--zen-amber)" fontWeight="bold" pointerEvents="none">W</text>
          <text x={gapX} y={246} textAnchor="middle" fontSize="10" fill="var(--zen-amber)" fontWeight="bold" pointerEvents="none">W</text>
        </svg>
      </div>

      <div className="flex flex-wrap items-end gap-3 font-mono text-xs">
        <div className="flex flex-col gap-1">
          <label htmlFor={colId} className="uppercase text-[var(--zen-ink-muted)]">Column (1 to 60)</label>
          <input
            id={colId}
            type="number"
            min={1}
            max={COLS}
            value={selected.col}
            onChange={handleCol}
            className="w-24 bg-[var(--zen-void)] border border-[var(--zen-border)] rounded px-2 py-1 text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor={rowId} className="uppercase text-[var(--zen-ink-muted)]">Row or rail</label>
          <select
            id={rowId}
            value={selectedRow}
            onChange={handleRow}
            className="bg-[var(--zen-void)] border border-[var(--zen-border)] rounded px-2 py-1 text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
          >
            {[...UPPER_ROWS, ...LOWER_ROWS].map((r) => (
              <option key={r} value={r}>Row {r}</option>
            ))}
            {RAILS.map((r) => (
              <option key={r} value={r}>{`Rail ${railLabel(r)} (${r.startsWith("top") ? "top" : "bottom"})`}</option>
            ))}
          </select>
        </div>
        <p className="flex-1 min-w-[220px] text-[var(--zen-ink-muted)]" aria-live="polite">{describeConnection(selected)}</p>
      </div>

      <ul className="list-disc pl-5 text-xs text-[var(--zen-ink-muted)] space-y-0.5">
        {notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>

      {ascii && (
        <details className="text-xs font-mono">
          <summary className="cursor-pointer text-[var(--zen-ink-muted)]">Text version</summary>
          <pre className="mt-2 overflow-x-auto whitespace-pre text-[var(--zen-frost)]">{ascii}</pre>
        </details>
      )}
    </figure>
  );
}
