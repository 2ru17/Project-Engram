"use client";

import { memo, useCallback, useId, useMemo, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { KatexFormula } from "@/components/simulators/shared/SimulatorWorkbenchShell";
import { motionTokens } from "@/lib/motion-tokens";
import {
  defaultParamValues,
  getBehavior,
  getDiagram,
  resolveWire,
  type BehaviorResult,
  type DiagramElement,
  type DiagramWire,
  type ParamValue,
  type ParamValues,
  type PartParam,
  type PartSpec,
} from "@/lib/diagram-registry";
import { Symbol } from "./symbols";
import { BreadboardDiagram } from "./BreadboardDiagram";

export interface CircuitDiagramProps {
  diagramId: string;
  /** Plain-text fallback carried in the fence body. */
  ascii?: string;
}

function isVisible(when: { param: string; eq: ParamValue } | undefined, values: ParamValues): boolean {
  return !when || values[when.param] === when.eq;
}

function wireEnergized(wire: DiagramWire, flow: Record<string, boolean>): boolean {
  if (!wire.on) return false;
  const groups = Array.isArray(wire.on) ? wire.on : [wire.on];
  return groups.some((g) => flow[g] === true);
}

/* ------------------------------------------------------------------ */
/* Wire with animated current flow                                     */
/* ------------------------------------------------------------------ */

interface WireViewProps {
  points: [number, number][];
  energized: boolean;
  dashed?: boolean;
  fault: boolean;
  reduce: boolean;
}

const WireView = memo(function WireView({ points, energized, dashed, fault, reduce }: WireViewProps) {
  const pts = points.map((p) => p.join(",")).join(" ");
  const flowColor = fault ? "var(--zen-amber)" : "var(--zen-cyan)";
  return (
    <g>
      <polyline
        points={pts}
        fill="none"
        stroke="var(--zen-ink-muted)"
        strokeWidth={1.8}
        strokeDasharray={dashed ? "6 4" : undefined}
        strokeLinejoin="round"
      />
      {energized &&
        (reduce ? (
          <polyline
            points={pts}
            fill="none"
            stroke={flowColor}
            strokeWidth={2.4}
            strokeDasharray="10 6"
            strokeLinejoin="round"
            markerEnd="url(#flow-arrow)"
          />
        ) : (
          <motion.polyline
            points={pts}
            fill="none"
            stroke={flowColor}
            strokeWidth={2.4}
            strokeDasharray="6 8"
            strokeLinejoin="round"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -14 }}
            transition={{ duration: 1.2, ease: motionTokens.easing.engram, repeat: Infinity }}
          />
        ))}
    </g>
  );
});

/* ------------------------------------------------------------------ */
/* Schematic element (symbol + labels)                                 */
/* ------------------------------------------------------------------ */

interface ElementViewProps {
  el: DiagramElement;
  state?: string;
  brightness: number;
  label?: string;
  selected: boolean;
  hovered: boolean;
  onSelect: (id: string) => void;
}

const ElementView = memo(function ElementView({ el, state, brightness, label, selected, hovered, onSelect }: ElementViewProps) {
  const rot = el.rot ?? 0;
  const vertical = rot === 90 || rot === 270;
  const text = label ?? el.label;
  const handleClick = useCallback(() => onSelect(el.id), [onSelect, el.id]);
  const [dx, dy] = el.lbl ?? (vertical ? [24, 4] : el.type === "supply" ? [0, -12] : [0, -24]);
  const anchor = dx > 10 ? "start" : dx < -10 ? "end" : "middle";
  const active = selected || hovered;
  const hitW = el.w ?? 70;
  const hitH = el.h ?? 50;
  return (
    <g onClick={handleClick} className="cursor-pointer">
      <g transform={`translate(${el.x},${el.y}) rotate(${rot})`}>
        {el.type !== "junction" && <rect x={-hitW / 2} y={-hitH / 2} width={hitW} height={hitH} fill="transparent" />}
        <Symbol
          type={el.type}
          state={state}
          brightness={brightness}
          color={el.color}
          variable={el.variable}
          text={el.text}
          w={el.w}
          h={el.h}
          selected={active}
        />
      </g>
      {text && (
        <text
          x={el.x + dx}
          y={el.y + dy}
          textAnchor={anchor}
          fontSize="11"
          fill={active ? "var(--zen-cyan)" : "var(--zen-snow)"}
          fontFamily="var(--font-mono-code, monospace)"
        >
          {text}
        </text>
      )}
      {el.sub && (
        <text
          x={el.x + (vertical ? 24 : 0)}
          y={el.y + (vertical ? 18 : 40)}
          textAnchor={vertical ? "start" : "middle"}
          fontSize="9"
          fill="var(--zen-ink-muted)"
          fontFamily="var(--font-mono-code, monospace)"
        >
          {el.sub}
        </text>
      )}
    </g>
  );
});

/* ------------------------------------------------------------------ */
/* Controls                                                            */
/* ------------------------------------------------------------------ */

interface ParamControlProps {
  param: PartParam;
  value: ParamValue;
  onChange: (id: string, value: ParamValue) => void;
}

const ParamControl = memo(function ParamControl({ param, value, onChange }: ParamControlProps) {
  const id = useId();
  const handleSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const opt = param.kind === "choice" ? param.options.find((o) => String(o.value) === e.target.value) : undefined;
      if (opt) onChange(param.id, opt.value);
    },
    [param, onChange]
  );
  const handleRange = useCallback((e: ChangeEvent<HTMLInputElement>) => onChange(param.id, Number(e.target.value)), [param.id, onChange]);
  const handleToggle = useCallback(() => onChange(param.id, !value), [param.id, value, onChange]);

  const box = "flex flex-col gap-1 p-2.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs";
  if (param.kind === "choice") {
    return (
      <div className={box}>
        <label htmlFor={id} className="uppercase text-[var(--zen-ink-muted)]">{param.label}</label>
        <select
          id={id}
          value={String(value)}
          onChange={handleSelect}
          className="bg-[var(--zen-void)] border border-[var(--zen-border)] rounded px-2 py-1 text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
        >
          {param.options.map((o) => (
            <option key={String(o.value)} value={String(o.value)}>{o.label}</option>
          ))}
        </select>
      </div>
    );
  }
  if (param.kind === "range") {
    return (
      <div className={box}>
        <label htmlFor={id} className="flex justify-between uppercase text-[var(--zen-ink-muted)]">
          <span>{param.label}</span>
          <strong className="normal-case text-[var(--zen-snow)]">{String(value)} {param.unit}</strong>
        </label>
        <input
          id={id}
          type="range"
          min={param.min}
          max={param.max}
          step={param.step}
          value={Number(value)}
          onChange={handleRange}
          className="w-full accent-[var(--zen-cyan)]"
        />
      </div>
    );
  }
  return (
    <div className={box}>
      <span className="uppercase text-[var(--zen-ink-muted)]">{param.label}</span>
      <button
        type="button"
        aria-pressed={Boolean(value)}
        onClick={handleToggle}
        className={`px-2.5 py-1 rounded border font-bold transition-all ${
          value
            ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-snow)]"
            : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
        }`}
      >
        {value ? param.labelOn : param.labelOff}
      </button>
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* Diagram                                                             */
/* ------------------------------------------------------------------ */

export function CircuitDiagram({ diagramId, ascii }: CircuitDiagramProps) {
  const spec = getDiagram(diagramId);
  if (!spec) {
    return (
      <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-card)] text-xs font-mono text-[var(--zen-ink-muted)]">
        Circuit diagram [{diagramId}] not found.
      </div>
    );
  }
  if (spec.kind === "breadboard") {
    return <BreadboardDiagram title={spec.title} description={spec.description} notes={spec.parts[0].notes} ascii={ascii} />;
  }
  return <SchematicDiagram diagramId={diagramId} ascii={ascii} />;
}

function SchematicDiagram({ diagramId, ascii }: CircuitDiagramProps) {
  const spec = getDiagram(diagramId)!;
  const uid = useId();
  const reduce = useReducedMotion() ?? false;
  const [partIdx, setPartIdx] = useState(0);
  const [allValues, setAllValues] = useState<Record<string, ParamValues>>(() =>
    Object.fromEntries(spec.parts.map((p) => [p.id, defaultParamValues(p)]))
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const part: PartSpec = spec.parts[partIdx];
  const values = allValues[part.id];
  const result: BehaviorResult = useMemo(() => getBehavior(part.behavior)(values, part.consts), [part, values]);

  const visibleElements = useMemo(() => part.elements.filter((e) => isVisible(e.when, values)), [part, values]);
  const visibleWires = useMemo(
    () => part.wires.filter((w) => isVisible(w.when, values)).map((w) => ({ wire: w, points: resolveWire(part, w) })),
    [part, values]
  );

  const handleParam = useCallback(
    (id: string, value: ParamValue) => {
      setAllValues((prev) => ({ ...prev, [part.id]: { ...prev[part.id], [id]: value } }));
    },
    [part.id]
  );
  const handleSelect = useCallback((id: string) => setSelectedId((cur) => (cur === id ? null : id)), []);
  const handleTab = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setPartIdx(Number(e.currentTarget.dataset.idx));
    setSelectedId(null);
  }, []);
  const handleTabKey = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      const n = spec.parts.length;
      let next = partIdx;
      if (e.key === "ArrowRight") next = (partIdx + 1) % n;
      else if (e.key === "ArrowLeft") next = (partIdx - 1 + n) % n;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = n - 1;
      else return;
      e.preventDefault();
      setPartIdx(next);
      setSelectedId(null);
      tabRefs.current[next]?.focus();
    },
    [partIdx, spec.parts.length]
  );
  const handleHoverIn = useCallback(
    (e: React.MouseEvent<HTMLButtonElement> | React.FocusEvent<HTMLButtonElement>) => setHoverId(e.currentTarget.dataset.el ?? null),
    []
  );
  const handleHoverOut = useCallback(() => setHoverId(null), []);
  const handleListSelect = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => handleSelect(e.currentTarget.dataset.el ?? ""),
    [handleSelect]
  );

  const selectedEl = visibleElements.find((e) => e.id === selectedId) ?? null;
  const [vbW, vbH] = part.viewBox;
  const listable = visibleElements.filter((e) => e.type !== "junction" || e.label);
  const multi = spec.parts.length > 1;

  return (
    <figure className="rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card p-4 space-y-3 text-[var(--zen-frost)]">
      <figcaption className="space-y-0.5">
        <div className="text-sm font-bold tracking-wide uppercase text-[var(--zen-snow)]">{spec.title}</div>
        <div className="text-xs text-[var(--zen-ink-muted)]">{spec.description}</div>
      </figcaption>

      {multi && (
        <div role="tablist" aria-label={`${spec.title} parts`} className="flex flex-wrap gap-1.5">
          {spec.parts.map((p, i) => (
            <button
              key={p.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${p.id}`}
              aria-selected={i === partIdx}
              aria-controls={`${uid}-panel`}
              tabIndex={i === partIdx ? 0 : -1}
              data-idx={i}
              onClick={handleTab}
              onKeyDown={handleTabKey}
              className={`px-2.5 py-1 text-[11px] font-mono rounded border transition-all ${
                i === partIdx
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-snow)] font-bold"
                  : "border-[var(--zen-border)] bg-[var(--zen-void)]/50 text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      <div
        id={`${uid}-panel`}
        role={multi ? "tabpanel" : undefined}
        aria-labelledby={multi ? `${uid}-tab-${part.id}` : undefined}
        className="space-y-3"
      >
        <div className="overflow-x-auto rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/70 p-2">
          <svg viewBox={`0 0 ${vbW} ${vbH}`} role="img" aria-labelledby={`${uid}-t ${uid}-d`} className="min-w-[520px] w-full h-auto font-mono">
            <title id={`${uid}-t`}>{`${spec.title}: ${part.label}`}</title>
            <desc id={`${uid}-d`}>{`${spec.description} ${result.status}`}</desc>
            <defs>
              <marker id="flow-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0 0 L8 4 L0 8 z" fill="var(--zen-cyan)" />
              </marker>
            </defs>
            {visibleWires.map(({ wire, points }) => (
              <WireView
                key={wire.id}
                points={points}
                energized={wireEnergized(wire, result.flow)}
                dashed={wire.dashed}
                fault={Array.isArray(wire.on) ? wire.on.includes("fault") : wire.on === "fault"}
                reduce={reduce}
              />
            ))}
            {visibleElements.map((el) => (
              <ElementView
                key={el.id}
                el={el}
                state={result.states[el.id]}
                brightness={result.leds[el.id] ?? 0}
                label={result.labels[el.id]}
                selected={selectedId === el.id}
                hovered={hoverId === el.id}
                onSelect={handleSelect}
              />
            ))}
          </svg>
        </div>

        {part.params.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {part.params.map((p) => (
              <ParamControl key={p.id} param={p} value={values[p.id]} onChange={handleParam} />
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="region" aria-label="Circuit readouts">
          {part.readouts.map((r) => (
            <div key={r.id} className="p-2 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/65 font-mono">
              <div className="text-[10px] uppercase tracking-wider text-[var(--zen-ink-muted)]">{r.label}</div>
              <div className="text-sm font-bold text-[var(--zen-snow)]">{result.values[r.id] ?? "-"}</div>
            </div>
          ))}
        </div>

        <p className="text-xs font-mono text-[var(--zen-ink-muted)]" aria-live="polite">{result.status}</p>

        {listable.length > 0 && (
          <div role="group" aria-label="Components. Select one to see its role and governing formula." className="flex flex-wrap gap-1.5">
            {listable.map((e) => (
              <button
                key={e.id}
                type="button"
                data-el={e.id}
                aria-pressed={selectedId === e.id}
                onClick={handleListSelect}
                onMouseEnter={handleHoverIn}
                onMouseLeave={handleHoverOut}
                onFocus={handleHoverIn}
                onBlur={handleHoverOut}
                className={`px-2 py-0.5 text-[10px] font-mono rounded border transition-all ${
                  selectedId === e.id
                    ? "border-[var(--zen-cyan)] text-[var(--zen-cyan)]"
                    : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:border-[var(--zen-cyan)]"
                }`}
              >
                {result.labels[e.id] ?? e.label ?? e.id}
              </button>
            ))}
          </div>
        )}

        {selectedEl && (
          <div className="p-3 rounded-lg border border-[var(--zen-cyan)]/40 bg-[var(--zen-void)]/80 space-y-1.5 text-xs font-mono" role="status">
            <div className="font-bold text-[var(--zen-cyan)] uppercase">{result.labels[selectedEl.id] ?? selectedEl.label ?? selectedEl.id}</div>
            <div className="text-[var(--zen-frost)]">{selectedEl.role}</div>
            {selectedEl.value && <div className="text-[var(--zen-ink-muted)]">Value: {selectedEl.value}</div>}
            {selectedEl.formula && (
              <div className="text-[var(--zen-snow)]">
                <KatexFormula latex={selectedEl.formula} />
              </div>
            )}
          </div>
        )}

        {part.notes.length > 0 && (
          <ul className="list-disc pl-5 text-xs text-[var(--zen-ink-muted)] space-y-0.5">
            {part.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        )}

        {part.workbench && (
          <Link
            href={`/simulators?id=${part.workbench.id}`}
            className="inline-block text-xs font-mono px-2.5 py-1 rounded border border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] hover:border-[var(--zen-cyan)] transition-colors"
          >
            {part.workbench.label}
          </Link>
        )}
      </div>

      {ascii && (
        <details className="text-xs font-mono">
          <summary className="cursor-pointer text-[var(--zen-ink-muted)]">Text version</summary>
          <pre className="mt-2 overflow-x-auto whitespace-pre text-[var(--zen-frost)]">{ascii}</pre>
        </details>
      )}
    </figure>
  );
}
