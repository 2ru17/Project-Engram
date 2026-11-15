"use client";

import { useState, useEffect, useMemo, useId } from "react";
import {
  SimulatorWorkbenchShell,
  type SimulatorPresetOption,
  type SimulatorTelemetryMetric,
  type SimulatorMathematicalInvariant,
} from "./shared/SimulatorWorkbenchShell";

type GraphAlgo = "DIJKSTRA" | "ASTAR" | "BELLMAN_FORD" | "BFS" | "DFS";

interface ArenaNode {
  id: string;
  x: number;
  y: number;
}

interface ArenaEdge {
  from: string;
  to: string;
  weight: number;
}

interface GraphPreset extends SimulatorPresetOption {
  algo: GraphAlgo;
  edges: ArenaEdge[];
  source: string;
  target: string;
}

const ARENA_NODES: ArenaNode[] = [
  { id: "A", x: 60, y: 95 },
  { id: "B", x: 175, y: 40 },
  { id: "C", x: 175, y: 150 },
  { id: "D", x: 300, y: 40 },
  { id: "E", x: 300, y: 150 },
  { id: "F", x: 420, y: 95 },
];

const PRESETS: GraphPreset[] = [
  {
    id: "backbone",
    label: "Weighted Network Backbone",
    description: "Compare Dijkstra uniform expansion against A* Euclidean heuristic toward target F.",
    algo: "ASTAR",
    source: "A",
    target: "F",
    edges: [
      { from: "A", to: "B", weight: 4 },
      { from: "A", to: "C", weight: 2 },
      { from: "B", to: "D", weight: 5 },
      { from: "C", to: "B", weight: 1 },
      { from: "C", to: "E", weight: 8 },
      { from: "B", to: "E", weight: 4 },
      { from: "D", to: "F", weight: 6 },
      { from: "E", to: "D", weight: 2 },
      { from: "E", to: "F", weight: 3 },
    ],
  },
  {
    id: "negative-trap",
    label: "Negative Edge Weight Trap",
    description: "Greedy Dijkstra locks onto a suboptimal path when C->B carries negative weight (-5); Bellman-Ford discovers the true minimum.",
    algo: "BELLMAN_FORD",
    source: "A",
    target: "F",
    edges: [
      { from: "A", to: "B", weight: 3 },
      { from: "A", to: "C", weight: 6 },
      { from: "C", to: "B", weight: -5 },
      { from: "B", to: "D", weight: 4 },
      { from: "D", to: "F", weight: 2 },
      { from: "C", to: "E", weight: 4 },
      { from: "E", to: "F", weight: 5 },
    ],
  },
  {
    id: "diamond-dense",
    label: "Dense Diamond Bottleneck",
    description: "Multiple symmetric cross-edges demonstrating Priority Queue decrease-key relaxations.",
    algo: "DIJKSTRA",
    source: "A",
    target: "F",
    edges: [
      { from: "A", to: "B", weight: 7 },
      { from: "A", to: "C", weight: 2 },
      { from: "C", to: "B", weight: 2 },
      { from: "B", to: "D", weight: 3 },
      { from: "B", to: "E", weight: 6 },
      { from: "C", to: "E", weight: 5 },
      { from: "D", to: "F", weight: 4 },
      { from: "E", to: "F", weight: 1 },
    ],
  },
  {
    id: "hop-unweighted",
    label: "Unweighted Hop Topology (BFS/DFS)",
    description: "Explore level-order Breadth-First shortest hop count vs Depth-First traversal.",
    algo: "BFS",
    source: "A",
    target: "F",
    edges: [
      { from: "A", to: "B", weight: 1 },
      { from: "A", to: "C", weight: 1 },
      { from: "B", to: "D", weight: 1 },
      { from: "C", to: "E", weight: 1 },
      { from: "D", to: "E", weight: 1 },
      { from: "D", to: "F", weight: 1 },
      { from: "E", to: "F", weight: 1 },
    ],
  },
];

interface GraphStepSnapshot {
  step: number;
  activeNode: string | null;
  relaxedEdge: string | null;
  distances: Record<string, number>;
  parents: Record<string, string | null>;
  visited: string[];
  frontier: { id: string; score: number }[];
  relaxations: number;
  note: string;
}

function heuristicCost(a: string, b: string): number {
  const n1 = ARENA_NODES.find((n) => n.id === a);
  const n2 = ARENA_NODES.find((n) => n.id === b);
  if (!n1 || !n2) return 0;
  return Math.round(Math.hypot(n1.x - n2.x, n1.y - n2.y) / 60);
}

function buildGraphTrace(
  edges: ArenaEdge[],
  algo: GraphAlgo,
  source: string,
  target: string
): GraphStepSnapshot[] {
  const dist: Record<string, number> = {};
  const parent: Record<string, string | null> = {};
  ARENA_NODES.forEach((n) => {
    dist[n.id] = n.id === source ? 0 : Infinity;
    parent[n.id] = null;
  });

  const steps: GraphStepSnapshot[] = [];
  let relaxations = 0;

  steps.push({
    step: 0,
    activeNode: source,
    relaxedEdge: null,
    distances: { ...dist },
    parents: { ...parent },
    visited: [],
    frontier: [{ id: source, score: 0 }],
    relaxations: 0,
    note: `Initialized source ${source} with distance 0.`,
  });

  if (algo === "BELLMAN_FORD") {
    const V = ARENA_NODES.length;
    for (let pass = 1; pass < V; pass++) {
      let changed = false;
      for (const e of edges) {
        if (dist[e.from] !== Infinity && dist[e.from] + e.weight < dist[e.to]) {
          dist[e.to] = dist[e.from] + e.weight;
          parent[e.to] = e.from;
          relaxations++;
          changed = true;
          steps.push({
            step: steps.length,
            activeNode: e.to,
            relaxedEdge: `${e.from}->${e.to}`,
            distances: { ...dist },
            parents: { ...parent },
            visited: Object.keys(dist).filter((k) => dist[k] < Infinity),
            frontier: edges.slice(0, 4).map((ed) => ({ id: `${ed.from}->${ed.to}`, score: ed.weight })),
            relaxations,
            note: `Pass ${pass}: Relaxed ${e.from}->${e.to} (d[${e.to}] = ${dist[e.to]})`,
          });
        }
      }
      if (!changed) break;
    }
    return steps;
  }

  if (algo === "BFS" || algo === "DFS") {
    const frontier: string[] = [source];
    const visited = new Set<string>();
    while (frontier.length > 0 && steps.length < 40) {
      const u = algo === "BFS" ? frontier.shift()! : frontier.pop()!;
      if (visited.has(u)) continue;
      visited.add(u);

      const neighbors = edges.filter((e) => e.from === u);
      for (const e of neighbors) {
        if (!visited.has(e.to) && dist[e.to] === Infinity) {
          dist[e.to] = dist[u] + 1;
          parent[e.to] = u;
          relaxations++;
          frontier.push(e.to);
        }
      }

      steps.push({
        step: steps.length,
        activeNode: u,
        relaxedEdge: null,
        distances: { ...dist },
        parents: { ...parent },
        visited: Array.from(visited),
        frontier: frontier.map((id) => ({ id, score: dist[id] })),
        relaxations,
        note: `${algo} expanded node ${u}${u === target ? " (Reached Target)" : ""}`,
      });
      if (u === target) break;
    }
    return steps;
  }

  // Dijkstra or A*
  const pq: { id: string; score: number }[] = [
    { id: source, score: algo === "ASTAR" ? heuristicCost(source, target) : 0 },
  ];
  const visited = new Set<string>();

  while (pq.length > 0 && steps.length < 40) {
    pq.sort((a, b) => a.score - b.score);
    const current = pq.shift()!;
    const u = current.id;
    if (visited.has(u)) continue;
    visited.add(u);

    steps.push({
      step: steps.length,
      activeNode: u,
      relaxedEdge: null,
      distances: { ...dist },
      parents: { ...parent },
      visited: Array.from(visited),
      frontier: [...pq],
      relaxations,
      note: `Popped ${u} from PQ (g=${dist[u]}${algo === "ASTAR" ? `, f=${current.score}` : ""}).`,
    });

    if (u === target) break;

    const outgoing = edges.filter((e) => e.from === u);
    for (const e of outgoing) {
      if (dist[u] + e.weight < dist[e.to]) {
        dist[e.to] = dist[u] + e.weight;
        parent[e.to] = u;
        relaxations++;
        const fScore = dist[e.to] + (algo === "ASTAR" ? heuristicCost(e.to, target) : 0);
        pq.push({ id: e.to, score: fScore });
        steps.push({
          step: steps.length,
          activeNode: u,
          relaxedEdge: `${e.from}->${e.to}`,
          distances: { ...dist },
          parents: { ...parent },
          visited: Array.from(visited),
          frontier: [...pq].sort((a, b) => a.score - b.score),
          relaxations,
          note: `Relaxed ${e.from}->${e.to}: updated d[${e.to}] = ${dist[e.to]} (prio=${fScore}).`,
        });
      }
    }
  }

  return steps;
}

export function GraphAlgorithmArenaWorkbench() {
  const sourceId = useId();
  const targetId = useId();
  const [presetId, setPresetId] = useState<string>("backbone");
  const [algo, setAlgo] = useState<GraphAlgo>("ASTAR");
  const [edges, setEdges] = useState<ArenaEdge[]>(PRESETS[0].edges);
  const [source, setSource] = useState<string>("A");
  const [target, setTarget] = useState<string>("F");
  const [stepIdx, setStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);

  const trace = useMemo(
    () => buildGraphTrace(edges, algo, source, target),
    [edges, algo, source, target]
  );

  const clampedStep = Math.min(stepIdx, trace.length - 1);
  const current = trace[clampedStep] || trace[0];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStepIdx((prev) => {
        if (prev >= trace.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, Math.round(750 / speed));
    return () => clearInterval(timer);
  }, [isPlaying, speed, trace.length]);

  const reconstructPath = useMemo(() => {
    const path: string[] = [];
    if (!current || current.distances[target] === Infinity) return path;
    let cur: string | null = target;
    const guard = new Set<string>();
    while (cur && !guard.has(cur)) {
      guard.add(cur);
      path.unshift(cur);
      cur = current.parents[cur] ?? null;
    }
    return path[0] === source ? path : [];
  }, [current, source, target]);

  const handleSelectPreset = (nextId: string) => {
    const p = PRESETS.find((pr) => pr.id === nextId) || PRESETS[0];
    setPresetId(p.id);
    setAlgo(p.algo);
    setEdges(p.edges);
    setSource(p.source);
    setTarget(p.target);
    setStepIdx(0);
    setIsPlaying(false);
  };

  const metrics: SimulatorTelemetryMetric[] = [
    { label: "Active Algorithm", value: algo.replace("_", "-"), accent: true },
    {
      label: `Dist (${source} -> ${target})`,
      value: current.distances[target] === Infinity ? "INF" : current.distances[target],
      hint: reconstructPath.length > 0 ? reconstructPath.join("->") : "Exploring",
    },
    { label: "Visited Nodes", value: `${current.visited.length} / ${ARENA_NODES.length}` },
    { label: "Edge Relaxations", value: current.relaxations },
  ];

  const invariants: SimulatorMathematicalInvariant[] = [
    {
      label: "Edge Relaxation Invariant",
      latex: "d[v] \\leftarrow \\min\\bigl(d[v],\\; d[u] + w(u, v)\\bigr)",
      note: "Preserves upper-bound triangle inequality until convergence to shortest path.",
    },
    {
      label: "A* Admissible Priority",
      latex: "f(n) = g(n) + h(n), \\quad h(n) \\le h^*(n)",
      note: "Admissible Euclidean lower bound guarantees optimality while pruning search frontier.",
    },
  ];

  const stateInspector = (
    <div className="space-y-3 font-mono text-xs">
      <div className="p-2 rounded border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/10 text-[11px] text-[var(--zen-snow)]">
        {current.note}
      </div>

      {/* Priority Queue / Frontier */}
      <div>
        <div className="text-[10px] text-[var(--zen-ink-muted)] uppercase mb-1">
          FRONTIER / PRIORITY QUEUE ({current.frontier.length})
        </div>
        <div className="flex flex-wrap gap-1.5">
          {current.frontier.length === 0 ? (
            <span className="text-[10px] text-[var(--zen-ink-dim)]">Empty</span>
          ) : (
            current.frontier.slice(0, 6).map((item, idx) => (
              <span
                key={`${item.id}-${idx}`}
                className="px-2 py-0.5 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)] text-[10px] text-[var(--zen-cyan)]"
              >
                {item.id}:{item.score === Infinity ? "INF" : item.score}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Distance Table */}
      <div>
        <div className="text-[10px] text-[var(--zen-ink-muted)] uppercase mb-1">
          DISTANCE VECTOR d[v] & PREDECESSOR
        </div>
        <div className="grid grid-cols-3 gap-1">
          {ARENA_NODES.map((n) => (
            <div
              key={n.id}
              className="px-2 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-card)] flex justify-between text-[10px]"
            >
              <span className="text-[var(--zen-snow)] font-bold">{n.id}</span>
              <span className="text-[var(--zen-cyan)]">
                {current.distances[n.id] === Infinity ? "INF" : current.distances[n.id]}
              </span>
              <span className="text-[var(--zen-ink-muted)]">{current.parents[n.id] || "-"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <SimulatorWorkbenchShell
      title="Weighted Graph & Pathfinding Algorithm Arena"
      subtitle="Step through Dijkstra, A* Search, Bellman-Ford negative-weight relaxation, BFS, and DFS with live priority queue inspection and relaxation telemetry."
      domain="theory"
      courses={["CCDSALG", "CCDSTRU", "CSALGCM", "CSINTSY"]}
      presets={PRESETS}
      activePresetId={presetId}
      onSelectPreset={handleSelectPreset}
      headerActions={
        <div className="flex flex-wrap gap-1">
          {(["DIJKSTRA", "ASTAR", "BELLMAN_FORD", "BFS", "DFS"] as GraphAlgo[]).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => {
                setAlgo(a);
                setStepIdx(0);
                setIsPlaying(false);
              }}
              className={`px-2 py-1 font-mono text-[11px] rounded border ${
                algo === a
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold"
                  : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
              }`}
            >
              {a === "BELLMAN_FORD" ? "Bellman-Ford" : a === "ASTAR" ? "A*" : a}
            </button>
          ))}
        </div>
      }
      stepping={{
        isPlaying,
        onTogglePlay: () => setIsPlaying((p) => !p),
        onStepBack: () => {
          setIsPlaying(false);
          setStepIdx((s) => Math.max(0, s - 1));
        },
        onStepForward: () => {
          setIsPlaying(false);
          setStepIdx((s) => Math.min(trace.length - 1, s + 1));
        },
        onReset: () => {
          setIsPlaying(false);
          setStepIdx(0);
        },
        speed,
        onChangeSpeed: setSpeed,
        stepIndex: clampedStep,
        totalSteps: trace.length - 1,
        stepLabel: "STEP",
        canStepBack: clampedStep > 0,
        canStepForward: clampedStep < trace.length - 1,
      }}
      telemetryMetrics={metrics}
      invariants={invariants}
      stateInspector={stateInspector}
    >
      {/* Source & Target Selectors */}
      <div className="flex flex-wrap items-center gap-4 p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs">
        <div className="flex items-center gap-2">
          <label htmlFor={sourceId} className="text-[var(--zen-ink-muted)]">
            SOURCE:
          </label>
          <select
            id={sourceId}
            aria-label="Graph start node"
            value={source}
            onChange={(e) => {
              setSource(e.target.value);
              setStepIdx(0);
            }}
            className="px-2 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)] text-[var(--zen-cyan)] font-bold"
          >
            {ARENA_NODES.map((n) => (
              <option key={n.id} value={n.id}>
                Node {n.id}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor={targetId} className="text-[var(--zen-ink-muted)]">
            TARGET:
          </label>
          <select
            id={targetId}
            aria-label="Graph target node"
            value={target}
            onChange={(e) => {
              setTarget(e.target.value);
              setStepIdx(0);
            }}
            className="px-2 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)] text-emerald-300 font-bold"
          >
            {ARENA_NODES.map((n) => (
              <option key={n.id} value={n.id}>
                Node {n.id}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Interactive Directed Weighted Graph SVG */}
      <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/80">
        <svg viewBox="0 0 480 190" className="w-full h-56 overflow-visible font-mono">
          <defs>
            <marker
              id="arena-arrow"
              markerWidth="6"
              markerHeight="6"
              refX="14"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--zen-ink-muted)" />
            </marker>
            <marker
              id="arena-arrow-active"
              markerWidth="6"
              markerHeight="6"
              refX="14"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--zen-cyan)" />
            </marker>
          </defs>

          {edges.map((e, idx) => {
            const n1 = ARENA_NODES.find((n) => n.id === e.from);
            const n2 = ARENA_NODES.find((n) => n.id === e.to);
            if (!n1 || !n2) return null;
            const key = `${e.from}->${e.to}`;
            const isRelaxedNow = current.relaxedEdge === key;
            const isOnPath =
              reconstructPath.includes(e.from) &&
              reconstructPath.indexOf(e.to) === reconstructPath.indexOf(e.from) + 1;
            const mx = (n1.x + n2.x) / 2;
            const my = (n1.y + n2.y) / 2;

            return (
              <g key={`${key}-${idx}`}>
                <line
                  x1={n1.x}
                  y1={n1.y}
                  x2={n2.x}
                  y2={n2.y}
                  stroke={
                    isRelaxedNow
                      ? "#F59E0B"
                      : isOnPath
                      ? "var(--zen-cyan)"
                      : "var(--zen-border)"
                  }
                  strokeWidth={isRelaxedNow || isOnPath ? 2.6 : 1.3}
                  markerEnd={
                    isOnPath || isRelaxedNow ? "url(#arena-arrow-active)" : "url(#arena-arrow)"
                  }
                />
                <rect x={mx - 9} y={my - 9} width="18" height="14" rx="3" fill="var(--zen-void)" />
                <text
                  x={mx}
                  y={my + 1}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="bold"
                  fill={e.weight < 0 ? "#F87171" : isOnPath ? "var(--zen-cyan)" : "var(--zen-frost)"}
                >
                  {e.weight}
                </text>
              </g>
            );
          })}

          {ARENA_NODES.map((n) => {
            const isActive = current.activeNode === n.id;
            const isVisited = current.visited.includes(n.id);
            const isPath = reconstructPath.includes(n.id);
            return (
              <g key={n.id}>
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="16"
                  fill={
                    isActive
                      ? "var(--zen-cyan)"
                      : isPath
                      ? "rgba(0, 229, 255, 0.2)"
                      : isVisited
                      ? "var(--zen-midnight)"
                      : "var(--zen-void)"
                  }
                  stroke={
                    n.id === target
                      ? "#10B981"
                      : isActive || isPath
                      ? "var(--zen-cyan)"
                      : "var(--zen-border)"
                  }
                  strokeWidth={isActive || n.id === source || n.id === target ? 2.5 : 1.5}
                />
                <text
                  x={n.x}
                  y={n.y + 4}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="bold"
                  fill={isActive ? "#05080F" : "var(--zen-snow)"}
                >
                  {n.id}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </SimulatorWorkbenchShell>
  );
}
