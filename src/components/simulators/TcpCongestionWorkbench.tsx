"use client";

import { useState, useEffect, useMemo, useId } from "react";
import {
  SimulatorWorkbenchShell,
  type SimulatorPresetOption,
  type SimulatorTelemetryMetric,
  type SimulatorMathematicalInvariant,
} from "./shared/SimulatorWorkbenchShell";

type TcpVariant = "RENO" | "TAHOE" | "CUBIC";
type LossKind = "DUPACK3" | "TIMEOUT";

interface LossEvent {
  rtt: number;
  kind: LossKind;
}

interface TcpPreset extends SimulatorPresetOption {
  variant: TcpVariant;
  initSsthresh: number;
  losses: LossEvent[];
}

const PRESETS: TcpPreset[] = [
  {
    id: "reno-sawtooth",
    label: "Classic Reno Sawtooth (3x DupACK)",
    description: "Slow Start exponentially reaches ssthresh=16, enters AIMD, then cuts cwnd in half via Fast Recovery.",
    variant: "RENO",
    initSsthresh: 16,
    losses: [
      { rtt: 11, kind: "DUPACK3" },
      { rtt: 19, kind: "DUPACK3" },
    ],
  },
  {
    id: "rto-timeout",
    label: "RTO Timeout Collapse & Slow Start",
    description: "Severe timeout resets cwnd to 1 MSS and ssthresh to cwnd/2, forcing exponential re-warmup.",
    variant: "TAHOE",
    initSsthresh: 16,
    losses: [{ rtt: 10, kind: "TIMEOUT" }],
  },
  {
    id: "cubic-bdp",
    label: "High-BDP CUBIC Growth",
    description: "Concave-convex cubic window growth rapidly saturates long-fat-network bandwidth before plateau.",
    variant: "CUBIC",
    initSsthresh: 12,
    losses: [{ rtt: 12, kind: "DUPACK3" }],
  },
  {
    id: "multi-loss",
    label: "Multiple Loss Recovery",
    description: "Interleaved Fast Retransmit and RTO timeout illustrating multiplicative decrease penalties.",
    variant: "RENO",
    initSsthresh: 14,
    losses: [
      { rtt: 8, kind: "DUPACK3" },
      { rtt: 15, kind: "TIMEOUT" },
    ],
  },
];

interface RttSample {
  rtt: number;
  cwnd: number;
  ssthresh: number;
  phase: "SLOW_START" | "CONGESTION_AVOIDANCE" | "FAST_RECOVERY" | "TIMEOUT_RESET";
  eventNote: string;
}

function simulateTcp(
  variant: TcpVariant,
  initSsthresh: number,
  losses: LossEvent[],
  totalRtts = 22
): RttSample[] {
  const samples: RttSample[] = [];
  let cwnd = 1;
  let ssthresh = initSsthresh;
  let wMax = initSsthresh * 1.4;
  let tSinceLoss = 0;

  for (let rtt = 1; rtt <= totalRtts; rtt++) {
    const loss = losses.find((l) => l.rtt === rtt);
    let phase: RttSample["phase"] = cwnd < ssthresh ? "SLOW_START" : "CONGESTION_AVOIDANCE";
    let eventNote = cwnd < ssthresh ? "cwnd doubles (Exponential Slow Start)" : "cwnd += 1 MSS (AIMD Linear Growth)";

    if (loss) {
      if (loss.kind === "TIMEOUT") {
        ssthresh = Math.max(2, Math.floor(cwnd / 2));
        wMax = cwnd;
        cwnd = 1;
        tSinceLoss = 0;
        phase = "TIMEOUT_RESET";
        eventNote = `RTO TIMEOUT -> ssthresh=${ssthresh}, cwnd=1 MSS`;
      } else {
        ssthresh = Math.max(2, Math.floor(cwnd / 2));
        wMax = cwnd;
        tSinceLoss = 0;
        if (variant === "TAHOE") {
          cwnd = 1;
          phase = "SLOW_START";
          eventNote = `3x DupACK (Tahoe) -> ssthresh=${ssthresh}, cwnd=1 MSS`;
        } else if (variant === "RENO") {
          cwnd = ssthresh + 3;
          phase = "FAST_RECOVERY";
          eventNote = `3x DupACK Fast Recovery -> ssthresh=${ssthresh}, cwnd=${cwnd} MSS`;
        } else {
          cwnd = Math.max(2, Math.round(cwnd * 0.7));
          phase = "FAST_RECOVERY";
          eventNote = `CUBIC Beta Cut (0.7) -> cwnd=${cwnd} MSS`;
        }
      }
      samples.push({ rtt, cwnd, ssthresh, phase, eventNote });
      continue;
    }

    samples.push({ rtt, cwnd: Number(cwnd.toFixed(1)), ssthresh, phase, eventNote });

    // Advance cwnd for next RTT
    if (variant === "CUBIC" && cwnd >= ssthresh) {
      tSinceLoss += 1;
      const K = Math.cbrt((wMax * 0.3) / 0.4);
      const cubicTarget = 0.4 * Math.pow(tSinceLoss - K, 3) + wMax;
      cwnd = Math.min(48, Math.max(cwnd + 1, Math.round(cubicTarget * 10) / 10));
    } else if (cwnd < ssthresh) {
      cwnd = Math.min(48, cwnd * 2);
    } else {
      cwnd = Math.min(48, cwnd + 1);
    }
  }

  return samples;
}

export function TcpCongestionWorkbench() {
  const ssthreshSliderId = useId();
  const [presetId, setPresetId] = useState<string>("reno-sawtooth");
  const [variant, setVariant] = useState<TcpVariant>("RENO");
  const [initSsthresh, setInitSsthresh] = useState<number>(16);
  const [losses, setLosses] = useState<LossEvent[]>(PRESETS[0].losses);
  const [rttIdx, setRttIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);

  const trace = useMemo(
    () => simulateTcp(variant, initSsthresh, losses, 22),
    [variant, initSsthresh, losses]
  );

  const clampedRtt = Math.min(rttIdx, trace.length - 1);
  const current = trace[clampedRtt] || trace[0];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setRttIdx((prev) => {
        if (prev >= trace.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, Math.round(700 / speed));
    return () => clearInterval(timer);
  }, [isPlaying, speed, trace.length]);

  const injectLossAtCurrent = (kind: LossKind) => {
    const targetRtt = Math.min(trace.length, Math.max(2, current.rtt + 1));
    setLosses((prev) => {
      const filtered = prev.filter((l) => l.rtt !== targetRtt);
      return [...filtered, { rtt: targetRtt, kind }].sort((a, b) => a.rtt - b.rtt);
    });
  };

  const handleSelectPreset = (nextId: string) => {
    const p = PRESETS.find((pr) => pr.id === nextId) || PRESETS[0];
    setPresetId(p.id);
    setVariant(p.variant);
    setInitSsthresh(p.initSsthresh);
    setLosses(p.losses);
    setRttIdx(0);
    setIsPlaying(false);
  };

  const maxCwndPlot = Math.max(36, ...trace.map((s) => Math.max(s.cwnd, s.ssthresh)));
  const svgWidth = 560;
  const svgHeight = 200;
  const padL = 36;
  const padR = 16;
  const padT = 16;
  const padB = 26;
  const plotW = svgWidth - padL - padR;
  const plotH = svgHeight - padT - padB;

  const toX = (idx: number) => padL + (idx / Math.max(1, trace.length - 1)) * plotW;
  const toY = (val: number) => padT + plotH - (val / maxCwndPlot) * plotH;

  const cwndPoints = trace
    .slice(0, clampedRtt + 1)
    .map((s, idx) => `${toX(idx)},${toY(s.cwnd)}`)
    .join(" ");
  const ssthreshPoints = trace
    .slice(0, clampedRtt + 1)
    .map((s, idx) => `${toX(idx)},${toY(s.ssthresh)}`)
    .join(" ");

  const metrics: SimulatorTelemetryMetric[] = [
    { label: "Active Window (cwnd)", value: `${current.cwnd} MSS`, accent: true },
    { label: "Threshold (ssthresh)", value: `${current.ssthresh} MSS`, hint: `Variant: ${variant}` },
    { label: "FSM Phase", value: current.phase.replace("_", " ") },
    { label: "Injected Losses", value: losses.length, hint: "Click buttons to inject" },
  ];

  const invariants: SimulatorMathematicalInvariant[] = [
    {
      label: "AIMD Congestion Control",
      latex: "w_{t+1} = \\begin{cases} w_t + \\frac{1}{w_t} & \\text{ACK} \\\\ \\frac{1}{2}w_t & \\text{3x DupACK} \\end{cases}",
      note: "Additive Increase / Multiplicative Decrease guarantees fairness and stability.",
    },
    {
      label: "Mathis TCP Throughput Bound",
      latex: "\\text{BW} \\le \\frac{\\text{MSS}}{\\text{RTT}} \\cdot \\frac{C}{\\sqrt{p}}",
      note: "Bandwidth scales inversely with RTT and square root of packet loss rate p.",
    },
  ];

  const stateInspector = (
    <div className="space-y-3 font-mono text-xs">
      {/* Loss Injection Controls */}
      <div className="space-y-1.5">
        <div className="text-[10px] text-[var(--zen-ink-muted)] uppercase">
          INTERACTIVE LOSS INJECTION (AT RTT {Math.min(trace.length, current.rtt + 1)})
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => injectLossAtCurrent("DUPACK3")}
            className="px-2 py-1 rounded border border-amber-400/50 bg-amber-500/15 text-amber-200 text-[10px] font-bold hover:bg-amber-500/25"
          >
            + 3x DupACK
          </button>
          <button
            type="button"
            onClick={() => injectLossAtCurrent("TIMEOUT")}
            className="px-2 py-1 rounded border border-rose-400/50 bg-rose-500/15 text-rose-200 text-[10px] font-bold hover:bg-rose-500/25"
          >
            + RTO Timeout
          </button>
          <button
            type="button"
            onClick={() => setLosses([])}
            className="px-2 py-1 rounded border border-[var(--zen-border)] text-[10px] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
          >
            Clear
          </button>
        </div>
      </div>

      {/* 3-Way Handshake & Sliding Window Summary */}
      <div className="p-2.5 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)]/60 space-y-1">
        <div className="text-[10px] text-[var(--zen-cyan)] uppercase font-bold">
          HANDSHAKE & SLIDING WINDOW
        </div>
        <div className="text-[10px] text-[var(--zen-frost)]">
          SYN(seq=100) -&gt; SYN-ACK(ack=101) -&gt; ACK
        </div>
        <div className="text-[10px] text-[var(--zen-ink-muted)]">
          Usable Window: {Math.round(current.cwnd * 1460).toLocaleString()} bytes ({current.cwnd} MSS)
        </div>
        <div className="text-[10px] text-amber-300 pt-1">{current.eventNote}</div>
      </div>
    </div>
  );

  return (
    <SimulatorWorkbenchShell
      title="TCP Congestion Control & Window Dynamics Studio"
      subtitle="Compare Slow Start, AIMD Congestion Avoidance, Fast Recovery (Reno), Tahoe collapse, and High-BDP CUBIC under interactive 3x DupACK and Timeout loss injection."
      domain="security"
      courses={["NSCOM01", "NSCOM02", "NSCOM03", "CSNETWK"]}
      presets={PRESETS}
      activePresetId={presetId}
      onSelectPreset={handleSelectPreset}
      headerActions={
        <div className="flex items-center gap-1.5">
          {(["RENO", "TAHOE", "CUBIC"] as TcpVariant[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => {
                setVariant(v);
                setRttIdx(0);
              }}
              className={`px-2.5 py-1 font-mono text-xs rounded border transition-all ${
                variant === v
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold"
                  : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      }
      stepping={{
        isPlaying,
        onTogglePlay: () => setIsPlaying((p) => !p),
        onStepBack: () => {
          setIsPlaying(false);
          setRttIdx((r) => Math.max(0, r - 1));
        },
        onStepForward: () => {
          setIsPlaying(false);
          setRttIdx((r) => Math.min(trace.length - 1, r + 1));
        },
        onReset: () => {
          setIsPlaying(false);
          setRttIdx(0);
        },
        speed,
        onChangeSpeed: setSpeed,
        stepIndex: current.rtt,
        totalSteps: trace.length,
        stepLabel: "RTT",
        canStepBack: clampedRtt > 0,
        canStepForward: clampedRtt < trace.length - 1,
      }}
      telemetryMetrics={metrics}
      invariants={invariants}
      stateInspector={stateInspector}
    >
      {/* Initial ssthresh slider */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs">
        <label htmlFor={ssthreshSliderId} className="text-[var(--zen-ink-muted)] uppercase">
          Initial ssthresh: <strong className="text-[var(--zen-cyan)]">{initSsthresh} MSS</strong>
        </label>
        <input
          id={ssthreshSliderId}
          aria-label="Initial slow start threshold ssthresh"
          type="range"
          min={6}
          max={28}
          value={initSsthresh}
          onChange={(e) => {
            setInitSsthresh(parseInt(e.target.value, 10));
            setRttIdx(0);
          }}
          className="w-48 accent-[var(--zen-cyan)]"
        />
      </div>

      {/* SVG CWND / SSTHRESH Trajectory Plotter */}
      <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/80">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-56 overflow-visible font-mono">
          {/* Horizontal gridlines */}
          {[8, 16, 24, 32].map((gridVal) => (
            <g key={gridVal}>
              <line
                x1={padL}
                y1={toY(gridVal)}
                x2={svgWidth - padR}
                y2={toY(gridVal)}
                stroke="var(--zen-border)"
                strokeDasharray="3 3"
              />
              <text x={4} y={toY(gridVal) + 3} fontSize="9" fill="var(--zen-ink-muted)">
                {gridVal}
              </text>
            </g>
          ))}

          {/* Full faint preview curve */}
          <polyline
            fill="none"
            stroke="var(--zen-border)"
            strokeWidth="1.5"
            points={trace.map((s, idx) => `${toX(idx)},${toY(s.cwnd)}`).join(" ")}
          />

          {/* Active ssthresh dashed trajectory */}
          {clampedRtt > 0 && (
            <polyline
              fill="none"
              stroke="var(--zen-amber)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              points={ssthreshPoints}
            />
          )}

          {/* Active cwnd curve */}
          {clampedRtt > 0 && (
            <polyline
              fill="none"
              stroke="var(--zen-cyan)"
              strokeWidth="2.5"
              points={cwndPoints}
            />
          )}

          {/* Sample Dots & Loss Markers */}
          {trace.slice(0, clampedRtt + 1).map((s, idx) => {
            const lossHere = losses.find((l) => l.rtt === s.rtt);
            return (
              <g key={s.rtt} className="cursor-pointer" onClick={() => setRttIdx(idx)}>
                <circle
                  cx={toX(idx)}
                  cy={toY(s.cwnd)}
                  r={idx === clampedRtt ? 5 : lossHere ? 4 : 2.5}
                  fill={lossHere ? "#EF4444" : idx === clampedRtt ? "#FFFFFF" : "var(--zen-cyan)"}
                  stroke="var(--zen-void)"
                  strokeWidth="1"
                />
                {lossHere && (
                  <text
                    x={toX(idx)}
                    y={toY(s.cwnd) - 8}
                    textAnchor="middle"
                    fontSize="8"
                    fill="#F87171"
                    fontWeight="bold"
                  >
                    {lossHere.kind === "TIMEOUT" ? "RTO" : "3ACK"}
                  </text>
                )}
              </g>
            );
          })}

          {/* X-axis RTT ticks */}
          {[1, 5, 10, 15, 20].map((tick) => (
            <text
              key={tick}
              x={toX(tick - 1)}
              y={svgHeight - 6}
              textAnchor="middle"
              fontSize="9"
              fill="var(--zen-ink-muted)"
            >
              RTT {tick}
            </text>
          ))}
        </svg>
        <div className="flex flex-wrap gap-4 text-[10px] font-mono text-[var(--zen-ink-muted)] mt-2">
          <span className="text-[var(--zen-cyan)]">-- Solid: Congestion Window (cwnd MSS)</span>
          <span className="text-[var(--zen-amber)]">.. Dashed: Slow-Start Threshold (ssthresh)</span>
          <span className="text-rose-400">o Red Marker: Injected Loss Event</span>
        </div>
      </div>
    </SimulatorWorkbenchShell>
  );
}
