"use client";

import { useState, useEffect, useMemo, useId } from "react";
import {
  SimulatorWorkbenchShell,
  type SimulatorPresetOption,
  type SimulatorTelemetryMetric,
  type SimulatorMathematicalInvariant,
} from "./shared/SimulatorWorkbenchShell";

type DbWorkbenchMode = "bplustree" | "mvcc";
type IsolationLevel = "READ_UNCOMMITTED" | "READ_COMMITTED" | "MVCC_SNAPSHOT";

interface DbPreset extends SimulatorPresetOption {
  mode: DbWorkbenchMode;
  keys?: number[];
  order?: number;
  isolation?: IsolationLevel;
  scheduleId?: "dirty-read" | "lost-update";
}

const PRESETS: DbPreset[] = [
  {
    id: "btree-split-cascade",
    label: "B+ Tree Sequential Split Cascade",
    description: "Insert ascending keys (10..80) into an Order-3 B+ tree and watch leaf overflows promote separator keys upward.",
    mode: "bplustree",
    keys: [10, 20, 30, 40, 50, 60, 70, 80],
    order: 3,
  },
  {
    id: "btree-range-scan",
    label: "B+ Tree Balanced Bulk & Range Scan",
    description: "Interleaved insertions building a multi-level index whose linked leaf chain serves O(log N + K) range queries.",
    mode: "bplustree",
    keys: [25, 12, 48, 7, 31, 60, 18, 52, 41],
    order: 4,
  },
  {
    id: "mvcc-dirty-read",
    label: "Dirty Read Anomaly (Uncommitted Rollback)",
    description: "T1 updates row Balance and later rolls back; compare READ UNCOMMITTED corruption against READ COMMITTED / MVCC.",
    mode: "mvcc",
    isolation: "READ_UNCOMMITTED",
    scheduleId: "dirty-read",
  },
  {
    id: "mvcc-lost-update",
    label: "Lost Update vs MVCC Snapshot Isolation",
    description: "Concurrent T1 and T2 read Balance=100 and write delta updates; MVCC First-Committer-Wins detects write-write conflict.",
    mode: "mvcc",
    isolation: "MVCC_SNAPSHOT",
    scheduleId: "lost-update",
  },
];

// --- Minimal Self-Contained Dynamic B+ Tree Engine ---
interface BTreeNode {
  id: string;
  isLeaf: boolean;
  keys: number[];
  children?: BTreeNode[];
}

function buildBPlusTree(inserted: number[], order: number): { root: BTreeNode; height: number; splitCount: number; leafChains: number[][] } {
  const maxKeys = Math.max(2, order - 1);
  let nodeSeq = 1;
  let splitCount = 0;

  interface InsertResult {
    promotedKey?: number;
    newRight?: BTreeNode;
  }

  let root: BTreeNode = { id: `N${nodeSeq++}`, isLeaf: true, keys: [] };

  const insertRec = (node: BTreeNode, key: number): InsertResult => {
    if (node.isLeaf) {
      if (!node.keys.includes(key)) {
        node.keys.push(key);
        node.keys.sort((a, b) => a - b);
      }
      if (node.keys.length <= maxKeys) return {};
      // Split leaf
      splitCount++;
      const mid = Math.ceil(node.keys.length / 2);
      const rightKeys = node.keys.splice(mid);
      const rightNode: BTreeNode = { id: `N${nodeSeq++}`, isLeaf: true, keys: rightKeys };
      return { promotedKey: rightKeys[0], newRight: rightNode };
    }

    // Internal node: pick child
    let childIdx = 0;
    while (childIdx < node.keys.length && key >= node.keys[childIdx]) {
      childIdx++;
    }
    const res = insertRec(node.children![childIdx], key);
    if (res.promotedKey === undefined || !res.newRight) return {};

    node.keys.splice(childIdx, 0, res.promotedKey);
    node.children!.splice(childIdx + 1, 0, res.newRight);

    if (node.keys.length <= maxKeys) return {};

    // Split internal node
    splitCount++;
    const mid = Math.floor(node.keys.length / 2);
    const upKey = node.keys[mid];
    const rightKeys = node.keys.slice(mid + 1);
    const rightChildren = node.children!.slice(mid + 1);
    node.keys = node.keys.slice(0, mid);
    node.children = node.children!.slice(0, mid + 1);

    const rightInternal: BTreeNode = {
      id: `N${nodeSeq++}`,
      isLeaf: false,
      keys: rightKeys,
      children: rightChildren,
    };
    return { promotedKey: upKey, newRight: rightInternal };
  };

  for (const k of inserted) {
    const res = insertRec(root, k);
    if (res.promotedKey !== undefined && res.newRight) {
      root = {
        id: `N${nodeSeq++}`,
        isLeaf: false,
        keys: [res.promotedKey],
        children: [root, res.newRight],
      };
    }
  }

  // BFS levels & leaves
  const leafChains: number[][] = [];
  let height = 0;
  let level: BTreeNode[] = [root];
  while (level.length > 0) {
    height++;
    const nextLevel: BTreeNode[] = [];
    for (const node of level) {
      if (node.isLeaf) leafChains.push(node.keys);
      else if (node.children) nextLevel.push(...node.children);
    }
    level = nextLevel;
  }

  return { root, height, splitCount, leafChains };
}

function collectLevels(root: BTreeNode): BTreeNode[][] {
  const levels: BTreeNode[][] = [];
  let cur: BTreeNode[] = [root];
  while (cur.length > 0) {
    levels.push(cur);
    const next: BTreeNode[] = [];
    for (const n of cur) {
      if (n.children) next.push(...n.children);
    }
    cur = next;
  }
  return levels;
}

// --- Concurrent Transaction Schedule Engine ---
interface TxStepState {
  step: number;
  actor: "T1" | "T2" | "SYS";
  sql: string;
  committedBalance: number;
  uncommittedBalance: number;
  t1Observed: number | null;
  t2Observed: number | null;
  anomaly: string | null;
}

function simulateSchedule(scheduleId: "dirty-read" | "lost-update", isolation: IsolationLevel): TxStepState[] {
  if (scheduleId === "dirty-read") {
    const allowsDirty = isolation === "READ_UNCOMMITTED";
    return [
      {
        step: 0,
        actor: "SYS",
        sql: "INIT Balance = 500 (Commit Epoch v1)",
        committedBalance: 500,
        uncommittedBalance: 500,
        t1Observed: null,
        t2Observed: null,
        anomaly: null,
      },
      {
        step: 1,
        actor: "T1",
        sql: "BEGIN; UPDATE accounts SET bal = 900;",
        committedBalance: 500,
        uncommittedBalance: 900,
        t1Observed: 900,
        t2Observed: null,
        anomaly: null,
      },
      {
        step: 2,
        actor: "T2",
        sql: "BEGIN; SELECT bal FROM accounts;",
        committedBalance: 500,
        uncommittedBalance: 900,
        t1Observed: 900,
        t2Observed: allowsDirty ? 900 : 500,
        anomaly: allowsDirty ? "DIRTY READ: T2 read uncommitted 900!" : "MVCC/RC preserved v1=500",
      },
      {
        step: 3,
        actor: "T1",
        sql: "ROLLBACK; -- Abort T1",
        committedBalance: 500,
        uncommittedBalance: 500,
        t1Observed: null,
        t2Observed: allowsDirty ? 900 : 500,
        anomaly: allowsDirty ? "ANOMALY CONFIRMED: T2 acted on ghost value 900" : "Clean Isolation",
      },
    ];
  }

  // Lost Update schedule
  const blocksConflict = isolation === "MVCC_SNAPSHOT";
  return [
    {
      step: 0,
      actor: "SYS",
      sql: "INIT Balance = 100 (Snapshot v1)",
      committedBalance: 100,
      uncommittedBalance: 100,
      t1Observed: null,
      t2Observed: null,
      anomaly: null,
    },
    {
      step: 1,
      actor: "T1",
      sql: "T1 READ(bal) -> 100",
      committedBalance: 100,
      uncommittedBalance: 100,
      t1Observed: 100,
      t2Observed: null,
      anomaly: null,
    },
    {
      step: 2,
      actor: "T2",
      sql: "T2 READ(bal) -> 100",
      committedBalance: 100,
      uncommittedBalance: 100,
      t1Observed: 100,
      t2Observed: 100,
      anomaly: null,
    },
    {
      step: 3,
      actor: "T1",
      sql: "T1 WRITE(bal = 100 + 50); COMMIT;",
      committedBalance: 150,
      uncommittedBalance: 150,
      t1Observed: 150,
      t2Observed: 100,
      anomaly: null,
    },
    {
      step: 4,
      actor: "T2",
      sql: blocksConflict ? "T2 WRITE -> ABORT (40001 Serialization Failure)" : "T2 WRITE(bal = 100 + 80); COMMIT;",
      committedBalance: blocksConflict ? 150 : 180,
      uncommittedBalance: blocksConflict ? 150 : 180,
      t1Observed: 150,
      t2Observed: blocksConflict ? 100 : 180,
      anomaly: blocksConflict
        ? "PREVENTED: First-Committer-Wins aborted stale T2"
        : "LOST UPDATE: T1's +50 write silently overwritten (180 vs expected 230)",
    },
  ];
}

export function BPlusTreeTransactionWorkbench() {
  const customKeyInputId = useId();
  const orderSelectId = useId();
  const isolationSelectId = useId();

  const [presetId, setPresetId] = useState<string>("btree-split-cascade");
  const [mode, setMode] = useState<DbWorkbenchMode>("bplustree");
  const [keyStream, setKeyStream] = useState<number[]>(PRESETS[0].keys!);
  const [order, setOrder] = useState<number>(3);
  const [customKeyInput, setCustomKeyInput] = useState<string>("35");
  const [isolation, setIsolation] = useState<IsolationLevel>("READ_UNCOMMITTED");
  const [scheduleId, setScheduleId] = useState<"dirty-read" | "lost-update">("dirty-read");
  const [stepIdx, setStepIdx] = useState<number>(5);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);

  const totalSteps = mode === "bplustree" ? keyStream.length : 4;
  const clampedStep = Math.min(stepIdx, totalSteps);

  const visibleKeys = useMemo(() => keyStream.slice(0, Math.max(1, clampedStep)), [keyStream, clampedStep]);
  const btree = useMemo(() => buildBPlusTree(visibleKeys, order), [visibleKeys, order]);
  const levels = useMemo(() => collectLevels(btree.root), [btree.root]);

  const txTrace = useMemo(() => simulateSchedule(scheduleId, isolation), [scheduleId, isolation]);
  const currentTx = txTrace[Math.min(clampedStep, txTrace.length - 1)] || txTrace[0];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStepIdx((prev) => {
        if (prev >= totalSteps) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, Math.round(750 / speed));
    return () => clearInterval(timer);
  }, [isPlaying, speed, totalSteps]);

  const handleInsertCustomKey = () => {
    const num = parseInt(customKeyInput, 10);
    if (Number.isNaN(num)) return;
    setKeyStream((prev) => {
      if (prev.includes(num)) return prev;
      const next = [...prev, num];
      setStepIdx(next.length);
      return next;
    });
    setCustomKeyInput("");
  };

  const handleSelectPreset = (nextId: string) => {
    const p = PRESETS.find((pr) => pr.id === nextId) || PRESETS[0];
    setPresetId(p.id);
    setMode(p.mode);
    if (p.keys) setKeyStream(p.keys);
    if (p.order) setOrder(p.order);
    if (p.isolation) setIsolation(p.isolation);
    if (p.scheduleId) setScheduleId(p.scheduleId);
    setStepIdx(p.mode === "bplustree" ? p.keys?.length || 1 : 0);
    setIsPlaying(false);
  };

  const metrics: SimulatorTelemetryMetric[] =
    mode === "bplustree"
      ? [
          { label: "Index Height (h)", value: btree.height, accent: true },
          { label: "Node Splits", value: btree.splitCount, hint: `Order m = ${order} (max ${order - 1})` },
          { label: "Indexed Keys", value: `${visibleKeys.length} / ${keyStream.length}` },
          { label: "Leaf Buckets", value: btree.leafChains.length, hint: "Doubly-Linked Range Scan" },
        ]
      : [
          { label: "Isolation Level", value: isolation.replace("_", " "), accent: true },
          { label: "Committed Row", value: `$${currentTx.committedBalance}` },
          { label: "T2 Read View", value: currentTx.t2Observed !== null ? `$${currentTx.t2Observed}` : "-" },
          { label: "Schedule Step", value: `${currentTx.step} / ${txTrace.length - 1}` },
        ];

  const invariants: SimulatorMathematicalInvariant[] = [
    {
      label: "B+ Tree Height & Search Bound",
      latex: "h \\le \\left\\lceil \\log_{\\lceil m/2 \\rceil}\\left(\\frac{N + 1}{2}\\right) \\right\\rceil + 1",
      note: "All leaves sit at uniform depth; range queries cost O(log_m N + K) I/Os.",
    },
    {
      label: "MVCC Snapshot Visibility",
      latex: "\\text{Visible}(v, T_i) \\iff \\text{xmin}(v) < \\text{ts}(T_i) \\land \\text{Committed}(v)",
      note: "Readers never block writers and writers never block readers under MVCC snapshots.",
    },
  ];

  const stateInspector =
    mode === "bplustree" ? (
      <div className="space-y-2.5 font-mono text-xs">
        <div className="text-[10px] text-[var(--zen-ink-muted)] uppercase">
          INSERTION SEQUENCE ({visibleKeys.length})
        </div>
        <div className="flex flex-wrap gap-1">
          {keyStream.map((k, idx) => (
            <span
              key={k}
              className={`px-2 py-0.5 rounded border text-[10px] ${
                idx < clampedStep
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-snow)] font-bold"
                  : "border-[var(--zen-border)] text-[var(--zen-ink-dim)]"
              }`}
            >
              {k}
            </span>
          ))}
        </div>
        <div className="text-[10px] text-[var(--zen-ink-muted)] uppercase pt-2">
          LINKED LEAF SCAN ORDER
        </div>
        <div className="p-2 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)]/60 text-[10px] text-emerald-300">
          {btree.leafChains.map((keys) => `[${keys.join(",")}]`).join(" -> ")}
        </div>
      </div>
    ) : (
      <div className="space-y-2 font-mono text-xs">
        <div className="text-[10px] text-[var(--zen-ink-muted)] uppercase">EXECUTION TRACE</div>
        {txTrace.map((t) => (
          <div
            key={t.step}
            onClick={() => setStepIdx(t.step)}
            className={`p-2 rounded border cursor-pointer text-[10px] space-y-0.5 ${
              t.step === currentTx.step
                ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-snow)]"
                : "border-[var(--zen-border)] bg-[var(--zen-midnight)]/40 text-[var(--zen-ink-muted)]"
            }`}
          >
            <div className="font-bold">
              [{t.actor}] {t.sql}
            </div>
            {t.anomaly && <div className="text-amber-300">{t.anomaly}</div>}
          </div>
        ))}
      </div>
    );

  return (
    <SimulatorWorkbenchShell
      title="B+ Tree Indexing & MVCC Transaction Isolation Lab"
      subtitle="Insert keys to trigger balanced B+ Tree node splits & leaf-chain promotions, or step concurrent SQL schedules across Read Uncommitted, Read Committed, and MVCC Snapshot Isolation."
      domain="software"
      courses={["CCINFOM", "CCAPDEV", "NSAPDEV"]}
      presets={PRESETS}
      activePresetId={presetId}
      onSelectPreset={handleSelectPreset}
      headerActions={
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => {
              setMode("bplustree");
              setStepIdx(keyStream.length);
            }}
            className={`px-2.5 py-1 font-mono text-xs rounded border ${
              mode === "bplustree"
                ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold"
                : "border-[var(--zen-border)] text-[var(--zen-ink-muted)]"
            }`}
          >
            B+ TREE INDEX
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("mvcc");
              setStepIdx(0);
            }}
            className={`px-2.5 py-1 font-mono text-xs rounded border ${
              mode === "mvcc"
                ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold"
                : "border-[var(--zen-border)] text-[var(--zen-ink-muted)]"
            }`}
          >
            MVCC / ACID
          </button>
        </div>
      }
      stepping={{
        isPlaying,
        onTogglePlay: () => setIsPlaying((p) => !p),
        onStepBack: () => {
          setIsPlaying(false);
          setStepIdx((s) => Math.max(mode === "bplustree" ? 1 : 0, s - 1));
        },
        onStepForward: () => {
          setIsPlaying(false);
          setStepIdx((s) => Math.min(totalSteps, s + 1));
        },
        onReset: () => {
          setIsPlaying(false);
          setStepIdx(mode === "bplustree" ? 1 : 0);
        },
        speed,
        onChangeSpeed: setSpeed,
        stepIndex: clampedStep,
        totalSteps,
        stepLabel: mode === "bplustree" ? "KEY" : "TX",
        canStepBack: clampedStep > (mode === "bplustree" ? 1 : 0),
        canStepForward: clampedStep < totalSteps,
      }}
      telemetryMetrics={metrics}
      invariants={invariants}
      stateInspector={stateInspector}
    >
      {mode === "bplustree" ? (
        <div className="space-y-4">
          {/* Order & Insert Key Bar */}
          <div className="flex flex-wrap items-center gap-3 p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs">
            <div className="flex items-center gap-2">
              <label htmlFor={orderSelectId} className="text-[var(--zen-ink-muted)]">
                ORDER m:
              </label>
              <select
                id={orderSelectId}
                aria-label="B+ Tree branching order m"
                value={order}
                onChange={(e) => setOrder(parseInt(e.target.value, 10))}
                className="px-2 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)] text-[var(--zen-cyan)] font-bold"
              >
                <option value={3}>Order 3 (Max 2 keys)</option>
                <option value={4}>Order 4 (Max 3 keys)</option>
                <option value={5}>Order 5 (Max 4 keys)</option>
              </select>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <label htmlFor={customKeyInputId} className="sr-only">
                Insert integer key
              </label>
              <input
                id={customKeyInputId}
                aria-label="Insert integer key into B+ Tree"
                type="number"
                value={customKeyInput}
                onChange={(e) => setCustomKeyInput(e.target.value)}
                placeholder="Key..."
                className="w-20 px-2 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)] text-[var(--zen-snow)] text-center"
              />
              <button
                type="button"
                onClick={handleInsertCustomKey}
                className="px-3 py-1 rounded border border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold hover:bg-[var(--zen-cyan)]/30"
              >
                + Insert Key
              </button>
            </div>
          </div>

          {/* Multi-Level B+ Tree Visualizer */}
          <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/80 space-y-5 overflow-x-auto">
            {levels.map((nodesInLevel, lvlIdx) => (
              <div key={lvlIdx} className="space-y-1.5">
                <div className="text-[9px] font-mono uppercase text-[var(--zen-ink-muted)] text-center">
                  {lvlIdx === levels.length - 1
                    ? "LEAF LEVEL (SORTED DATA POINTERS)"
                    : lvlIdx === 0
                    ? "ROOT ROUTER"
                    : `INTERNAL ROUTER LEVEL ${lvlIdx}`}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {nodesInLevel.map((node) => (
                    <div
                      key={node.id}
                      className={`px-3 py-2 rounded-lg border font-mono text-xs flex items-center gap-2 ${
                        node.isLeaf
                          ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-200"
                          : "border-[var(--zen-cyan)]/60 bg-[var(--zen-cyan)]/10 text-[var(--zen-snow)] font-bold"
                      }`}
                    >
                      <span className="text-[9px] opacity-60">{node.id}:</span>
                      <div className="flex gap-1.5">
                        {node.keys.map((k) => (
                          <span
                            key={k}
                            className="px-1.5 py-0.5 rounded bg-[var(--zen-void)] border border-[var(--zen-border)]"
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs">
            <div className="flex items-center gap-2">
              <label htmlFor={isolationSelectId} className="text-[var(--zen-ink-muted)]">
                ISOLATION LEVEL:
              </label>
              <select
                id={isolationSelectId}
                aria-label="SQL Transaction Isolation Level"
                value={isolation}
                onChange={(e) => setIsolation(e.target.value as IsolationLevel)}
                className="px-2.5 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)] text-[var(--zen-cyan)] font-bold"
              >
                <option value="READ_UNCOMMITTED">READ UNCOMMITTED</option>
                <option value="READ_COMMITTED">READ COMMITTED</option>
                <option value="MVCC_SNAPSHOT">MVCC SNAPSHOT / SERIALIZABLE</option>
              </select>
            </div>
            <div className="flex gap-1.5">
              {(["dirty-read", "lost-update"] as const).map((sid) => (
                <button
                  key={sid}
                  type="button"
                  onClick={() => {
                    setScheduleId(sid);
                    setStepIdx(0);
                  }}
                  className={`px-2.5 py-1 rounded border text-[11px] ${
                    scheduleId === sid
                      ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold"
                      : "border-[var(--zen-border)] text-[var(--zen-ink-muted)]"
                  }`}
                >
                  {sid === "dirty-read" ? "Dirty Read Schedule" : "Lost Update Schedule"}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/80 space-y-3 font-mono text-xs">
            <div className="text-[var(--zen-cyan)] font-bold">
              ACTIVE OPERATION ({currentTx.actor}): {currentTx.sql}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="p-2.5 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)]">
                <div className="text-[9px] text-[var(--zen-ink-muted)]">DISK COMMITTED</div>
                <div className="text-base font-bold text-emerald-300">${currentTx.committedBalance}</div>
              </div>
              <div className="p-2.5 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)]">
                <div className="text-[9px] text-[var(--zen-ink-muted)]">DIRTY BUFFER</div>
                <div className="text-base font-bold text-amber-300">${currentTx.uncommittedBalance}</div>
              </div>
              <div className="p-2.5 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)]">
                <div className="text-[9px] text-[var(--zen-ink-muted)]">T1 VIEW</div>
                <div className="text-base font-bold text-[var(--zen-snow)]">
                  {currentTx.t1Observed !== null ? `$${currentTx.t1Observed}` : "-"}
                </div>
              </div>
              <div className="p-2.5 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)]">
                <div className="text-[9px] text-[var(--zen-ink-muted)]">T2 VIEW</div>
                <div className="text-base font-bold text-[var(--zen-cyan)]">
                  {currentTx.t2Observed !== null ? `$${currentTx.t2Observed}` : "-"}
                </div>
              </div>
            </div>
            {currentTx.anomaly && (
              <div className="p-2.5 rounded border border-amber-400/50 bg-amber-500/15 text-amber-200">
                {currentTx.anomaly}
              </div>
            )}
          </div>
        </div>
      )}
    </SimulatorWorkbenchShell>
  );
}
