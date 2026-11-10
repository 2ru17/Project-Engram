"use client";

import { useState, useMemo } from "react";

interface NodeItem {
  id: string;
  x: number;
  y: number;
}

interface EdgeItem {
  from: string;
  to: string;
  weight: number;
}

const NODES: NodeItem[] = [
  { id: "A", x: 40, y: 70 },
  { id: "B", x: 130, y: 30 },
  { id: "C", x: 130, y: 110 },
  { id: "D", x: 230, y: 30 },
  { id: "E", x: 230, y: 110 },
  { id: "F", x: 310, y: 70 },
];

const DEFAULT_EDGES: EdgeItem[] = [
  { from: "A", to: "B", weight: 4 },
  { from: "A", to: "C", weight: 2 },
  { from: "B", to: "C", weight: 1 },
  { from: "B", to: "D", weight: 5 },
  { from: "C", to: "E", weight: 8 },
  { from: "C", to: "D", weight: 10 },
  { from: "D", to: "E", weight: 2 },
  { from: "D", to: "F", weight: 6 },
  { from: "E", to: "F", weight: 3 },
];

const PRESETS: { name: string; edges: EdgeItem[] }[] = [
  {
    name: "Default 6-Node",
    edges: DEFAULT_EDGES,
  },
  {
    name: "Dense Mesh",
    edges: [
      { from: "A", to: "B", weight: 3 },
      { from: "A", to: "C", weight: 2 },
      { from: "B", to: "C", weight: 2 },
      { from: "B", to: "D", weight: 4 },
      { from: "B", to: "E", weight: 7 },
      { from: "C", to: "D", weight: 6 },
      { from: "C", to: "E", weight: 3 },
      { from: "D", to: "E", weight: 1 },
      { from: "D", to: "F", weight: 4 },
      { from: "E", to: "F", weight: 2 },
      { from: "A", to: "E", weight: 9 },
    ],
  },
  {
    name: "Bridge Bottleneck",
    edges: [
      { from: "A", to: "B", weight: 2 },
      { from: "A", to: "C", weight: 3 },
      { from: "B", to: "D", weight: 9 },
      { from: "C", to: "D", weight: 8 },
      { from: "D", to: "E", weight: 1 },
      { from: "E", to: "F", weight: 2 },
    ],
  },
  {
    name: "Linear Chain",
    edges: [
      { from: "A", to: "B", weight: 2 },
      { from: "B", to: "C", weight: 3 },
      { from: "C", to: "D", weight: 4 },
      { from: "D", to: "E", weight: 2 },
      { from: "E", to: "F", weight: 5 },
    ],
  },
];

export function GraphPathfinderWorkbench() {
  const [startNode, setStartNode] = useState<string>("A");
  const [targetNode, setTargetNode] = useState<string>("F");
  const [edges, setEdges] = useState<EdgeItem[]>(DEFAULT_EDGES);

  // Custom edge input states
  const [newFrom, setNewFrom] = useState<string>("A");
  const [newTo, setNewTo] = useState<string>("D");
  const [newWeight, setNewWeight] = useState<number>(3);

  const handleAddOrUpdateEdge = () => {
    if (newFrom === newTo) return;
    const w = Math.max(1, Math.min(99, newWeight || 1));
    setEdges((prev) => {
      const existingIdx = prev.findIndex(
        (e) => (e.from === newFrom && e.to === newTo) || (e.from === newTo && e.to === newFrom)
      );
      if (existingIdx !== -1) {
        const next = [...prev];
        next[existingIdx] = { from: newFrom, to: newTo, weight: w };
        return next;
      }
      return [...prev, { from: newFrom, to: newTo, weight: w }];
    });
  };

  const handleDeleteEdge = (from: string, to: string) => {
    setEdges((prev) =>
      prev.filter((e) => !(e.from === from && e.to === to) && !(e.from === to && e.to === from))
    );
  };

  const handleWeightChange = (from: string, to: string, w: number) => {
    const validW = Math.max(1, Math.min(99, w || 1));
    setEdges((prev) =>
      prev.map((e) =>
        (e.from === from && e.to === to) || (e.from === to && e.to === from)
          ? { ...e, weight: validW }
          : e
      )
    );
  };

  // Dijkstra Shortest Path Calculation
  const { shortestPath, totalCost, visitedOrder, pathEdges } = useMemo(() => {
    if (startNode === targetNode) {
      return {
        shortestPath: [startNode],
        totalCost: 0,
        visitedOrder: [startNode],
        pathEdges: new Set<string>(),
      };
    }

    const dist: Record<string, number> = {};
    const prev: Record<string, string | null> = {};
    const unvisited = new Set<string>(NODES.map((n) => n.id));
    const visited: string[] = [];

    NODES.forEach((n) => {
      dist[n.id] = Infinity;
      prev[n.id] = null;
    });
    dist[startNode] = 0;

    while (unvisited.size > 0) {
      let curr: string | null = null;
      let minD = Infinity;

      unvisited.forEach((nodeId) => {
        if (dist[nodeId] < minD) {
          minD = dist[nodeId];
          curr = nodeId;
        }
      });

      if (curr === null || dist[curr] === Infinity) break;
      unvisited.delete(curr);
      visited.push(curr);

      if (curr === targetNode) break;

      // Relax neighbors
      edges.forEach((e) => {
        let neighbor: string | null = null;
        if (e.from === curr) neighbor = e.to;
        else if (e.to === curr) neighbor = e.from;

        if (neighbor && unvisited.has(neighbor)) {
          const alt = dist[curr!] + e.weight;
          if (alt < dist[neighbor]) {
            dist[neighbor] = alt;
            prev[neighbor] = curr;
          }
        }
      });
    }

    // Reconstruct path
    const path: string[] = [];
    let curr: string | null = targetNode;
    while (curr !== null) {
      path.unshift(curr);
      curr = prev[curr];
    }

    const isValid = path[0] === startNode && dist[targetNode] !== Infinity;
    const finalPath = isValid ? path : [startNode];
    const cost = isValid ? dist[targetNode] : Infinity;

    const edgesSet = new Set<string>();
    if (isValid) {
      for (let i = 0; i < path.length - 1; i++) {
        const u = path[i];
        const v = path[i + 1];
        edgesSet.add(`${u}-${v}`);
        edgesSet.add(`${v}-${u}`);
      }
    }

    return {
      shortestPath: finalPath,
      totalCost: cost,
      visitedOrder: visited,
      pathEdges: edgesSet,
    };
  }, [startNode, targetNode, edges]);

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card text-[var(--zen-frost)]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[var(--zen-border)] pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
            ALGORITHMS & GRAPH THEORY // CCDSALG & CSALGCM
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[var(--zen-snow)] tracking-wider uppercase">
            Dijkstra Shortest Path & Priority Queue Studio
          </h4>
        </div>

        {/* Node Selection Dropdowns */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--zen-ink-muted)]">Source:</span>
            <select
              value={startNode}
              onChange={(e) => setStartNode(e.target.value)}
              className="px-2 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-void)] text-[var(--zen-cyan)] font-bold text-xs"
            >
              {NODES.map((n) => (
                <option key={n.id} value={n.id}>
                  Node {n.id}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[var(--zen-ink-muted)]">Target:</span>
            <select
              value={targetNode}
              onChange={(e) => setTargetNode(e.target.value)}
              className="px-2 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-void)] text-emerald-400 font-bold text-xs"
            >
              {NODES.map((n) => (
                <option key={n.id} value={n.id}>
                  Node {n.id}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2 mb-4 font-mono text-xs">
        <span className="text-[10px] text-[var(--zen-ink-muted)] uppercase">Presets:</span>
        {PRESETS.map((p) => (
          <button
            key={p.name}
            onClick={() => setEdges(p.edges)}
            className="px-2.5 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-void)]/80 hover:border-[var(--zen-cyan)] text-[var(--zen-snow)] text-[11px] transition-colors"
          >
            {p.name}
          </button>
        ))}
        <button
          onClick={() => setEdges(DEFAULT_EDGES)}
          className="px-2.5 py-1 rounded border border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] text-[11px] transition-colors ml-auto"
        >
          Reset Default Graph
        </button>
      </div>

      {/* Interactive SVG Weighted Graph */}
      <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 mb-5 flex flex-col items-center">
        <svg viewBox="0 0 360 140" className="w-full max-w-lg h-44 overflow-visible">
          {/* Edges */}
          {edges.map((e, idx) => {
            const n1 = NODES.find((n) => n.id === e.from);
            const n2 = NODES.find((n) => n.id === e.to);
            if (!n1 || !n2) return null;
            const isPathEdge = pathEdges.has(`${e.from}-${e.to}`);

            return (
              <g key={`${e.from}-${e.to}-${idx}`}>
                <line
                  x1={n1.x}
                  y1={n1.y}
                  x2={n2.x}
                  y2={n2.y}
                  stroke={isPathEdge ? "var(--zen-cyan)" : "var(--zen-border)"}
                  strokeWidth={isPathEdge ? 3 : 1.2}
                  className="transition-all duration-300"
                />
                {/* Weight Label */}
                <rect
                  x={(n1.x + n2.x) / 2 - 8}
                  y={(n1.y + n2.y) / 2 - 12}
                  width="16"
                  height="12"
                  fill="var(--zen-void)"
                  rx="2"
                />
                <text
                  x={(n1.x + n2.x) / 2}
                  y={(n1.y + n2.y) / 2 - 3}
                  fill={isPathEdge ? "var(--zen-cyan)" : "var(--zen-ink-muted)"}
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight={isPathEdge ? "bold" : "normal"}
                  textAnchor="middle"
                >
                  {e.weight}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {NODES.map((n) => {
            const isStart = n.id === startNode;
            const isEnd = n.id === targetNode;
            const isPath = shortestPath.includes(n.id);
            const isVisited = visitedOrder.includes(n.id);

            return (
              <g
                key={n.id}
                className="cursor-pointer"
                onClick={() => {
                  if (startNode !== n.id) setTargetNode(n.id);
                }}
              >
                <circle
                  cx={n.x}
                  cy={n.y}
                  r="13"
                  fill={
                    isStart
                      ? "var(--zen-cyan)"
                      : isEnd
                      ? "#059669"
                      : isPath
                      ? "rgba(0, 229, 255, 0.2)"
                      : isVisited
                      ? "var(--zen-card)"
                      : "var(--zen-void)"
                  }
                  stroke={
                    isStart || isEnd
                      ? "var(--zen-snow)"
                      : isPath
                      ? "var(--zen-cyan)"
                      : "var(--zen-border)"
                  }
                  strokeWidth={isPath || isStart || isEnd ? "2.2" : "1.2"}
                  className="transition-all duration-300"
                />
                <text
                  x={n.x}
                  y={n.y + 4}
                  textAnchor="middle"
                  fill={isStart || isEnd ? "#FFFFFF" : "var(--zen-snow)"}
                  fontSize="10"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {n.id}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-[var(--zen-ink-muted)] mt-2">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--zen-cyan)]" /> Source Node ({startNode})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400" /> Target Node ({targetNode})
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-[var(--zen-cyan)]" /> Shortest Path Edge
          </span>
        </div>
      </div>

      {/* Path Cost Telemetry */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 text-center">
          <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase block">
            Start Node
          </span>
          <span className="text-sm font-mono font-bold text-[var(--zen-cyan)]">Node {startNode}</span>
        </div>
        <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 text-center">
          <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase block">
            Target Node
          </span>
          <span className="text-sm font-mono font-bold text-emerald-700 dark:text-emerald-400">Node {targetNode}</span>
        </div>
        <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 text-center">
          <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase block">
            Optimal Cost
          </span>
          <span className="text-sm font-mono font-bold text-[var(--zen-snow)]">
            {totalCost === Infinity ? "Unreachable" : `Distance: ${totalCost}`}
          </span>
        </div>
        <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 text-center">
          <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase block">
            Path Sequence
          </span>
          <span className="text-xs font-mono font-bold text-[var(--zen-cyan)]">
            {totalCost === Infinity ? "No Route" : shortestPath.join(" -> ")}
          </span>
        </div>
      </div>

      {/* Visited Queue Order */}
      <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/30 font-mono text-xs flex flex-wrap items-center justify-between gap-2 mb-5">
        <span className="text-[10px] text-[var(--zen-ink-muted)] uppercase">
          Priority Queue Expansion Sequence:
        </span>
        <span className="text-[var(--zen-snow)]">
          {visitedOrder.join(" -> ")}
        </span>
      </div>

      {/* Custom Values: Edge Editor & Add More Edges */}
      <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/50 font-mono text-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--zen-border)] pb-2">
          <span className="text-[10px] text-[var(--zen-cyan)] uppercase font-semibold">
            Custom Values & Edge Editor (Put your own edge weights or add more edges)
          </span>
          <span className="text-[10px] text-[var(--zen-ink-muted)]">
            Total Edges: {edges.length}
          </span>
        </div>

        {/* Add / Update Edge Form */}
        <div className="flex flex-wrap items-center gap-3 bg-[var(--zen-card)] p-3 rounded-lg border border-[var(--zen-border)]">
          <span className="text-[10px] text-[var(--zen-ink-muted)] uppercase font-semibold">
            Add or Modify Edge:
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[var(--zen-ink-muted)]">From:</span>
            <select
              value={newFrom}
              onChange={(e) => setNewFrom(e.target.value)}
              className="px-2 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-void)] text-[var(--zen-snow)] text-xs"
            >
              {NODES.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.id}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[var(--zen-ink-muted)]">To:</span>
            <select
              value={newTo}
              onChange={(e) => setNewTo(e.target.value)}
              className="px-2 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-void)] text-[var(--zen-snow)] text-xs"
            >
              {NODES.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.id}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[var(--zen-ink-muted)]">Weight:</span>
            <input
              type="number"
              min="1"
              max="99"
              value={newWeight}
              onChange={(e) => setNewWeight(parseInt(e.target.value, 10) || 1)}
              className="w-16 px-2 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-void)] text-[var(--zen-snow)] text-xs text-center"
            />
          </div>
          <button
            onClick={handleAddOrUpdateEdge}
            disabled={newFrom === newTo}
            className="px-3 py-1 rounded bg-[var(--zen-cyan)]/20 border border-[var(--zen-cyan)] text-[var(--zen-snow)] text-xs font-semibold hover:bg-[var(--zen-cyan)]/30 transition-colors disabled:opacity-40"
          >
            + Add / Set Edge
          </button>
        </div>

        {/* Existing Edges Table with In-Place Weight Editing */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {edges.map((e) => (
            <div
              key={`${e.from}-${e.to}`}
              className="flex items-center justify-between p-2 rounded bg-[var(--zen-card)] border border-[var(--zen-border)]"
            >
              <span className="text-xs font-bold text-[var(--zen-snow)]">
                {e.from} - {e.to}:
              </span>
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={e.weight}
                  onChange={(ev) =>
                    handleWeightChange(e.from, e.to, parseInt(ev.target.value, 10) || 1)
                  }
                  className="w-12 px-1.5 py-0.5 rounded border border-[var(--zen-border)] bg-[var(--zen-void)] text-[var(--zen-cyan)] font-bold text-xs text-center"
                />
                <button
                  onClick={() => handleDeleteEdge(e.from, e.to)}
                  className="text-[var(--zen-ink-muted)] hover:text-red-400 text-xs px-1"
                  title="Delete edge"
                >
                  x
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
