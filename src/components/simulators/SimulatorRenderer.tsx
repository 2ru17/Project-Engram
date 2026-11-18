"use client";

import Link from "next/link";
import { LogicGateWorkbench } from "./LogicGateWorkbench";
import { CpuPipelineWorkbench } from "./CpuPipelineWorkbench";
import { ProcessSchedulerWorkbench } from "./ProcessSchedulerWorkbench";
import { VirtualMemoryWorkbench } from "./VirtualMemoryWorkbench";
import { SubnetRouterWorkbench } from "./SubnetRouterWorkbench";
import { CryptoCipherWorkbench } from "./CryptoCipherWorkbench";
import { SqlOptimizerWorkbench } from "./SqlOptimizerWorkbench";
import { AstParserWorkbench } from "./AstParserWorkbench";
import { GraphPathfinderWorkbench } from "./GraphPathfinderWorkbench";
import { ProbabilityStudioWorkbench } from "./ProbabilityStudioWorkbench";
import { FloatingPointWorkbench } from "./FloatingPointWorkbench";
import { SortingVisualizerWorkbench } from "./SortingVisualizerWorkbench";
import { TcpFlowWorkbench } from "./TcpFlowWorkbench";
import { DistributedConsensusWorkbench } from "./DistributedConsensusWorkbench";
import { AppSecSanitizerWorkbench } from "./AppSecSanitizerWorkbench";
import { PerceptronWorkbench } from "./PerceptronWorkbench";
import { EmbeddedGpioWorkbench } from "./EmbeddedGpioWorkbench";
import { RelationalNormalizationWorkbench } from "./RelationalNormalizationWorkbench";
import { PipelineHazardWorkbench } from "./PipelineHazardWorkbench";
import { VirtualMemoryPageWorkbench } from "./VirtualMemoryPageWorkbench";
import { TcpCongestionWorkbench } from "./TcpCongestionWorkbench";
import { AvalancheCryptoWorkbench } from "./AvalancheCryptoWorkbench";
import { GraphAlgorithmArenaWorkbench } from "./GraphAlgorithmArenaWorkbench";
import { AutomataTapeWorkbench } from "./AutomataTapeWorkbench";
import { BPlusTreeTransactionWorkbench } from "./BPlusTreeTransactionWorkbench";
import { AnalogModulationWorkbench } from "./AnalogModulationWorkbench";
import { RcTimingWorkbench } from "./RcTimingWorkbench";
import { ScopeQuantizerWorkbench } from "./ScopeQuantizerWorkbench";
import { RectifierSupplyWorkbench } from "./RectifierSupplyWorkbench";
import { KatexFormula } from "./shared/SimulatorWorkbenchShell";
import { resolveSimulator } from "@/lib/simulator-registry";
import { getCourseInfo } from "@/lib/course-registry";

const NATIVE_SHELL_IDS = new Set([
  "pipeline-hazard",
  "virtual-memory-page",
  "tcp-congestion",
  "avalanche-crypto",
  "graph-algorithm-arena",
  "automata-tape",
  "bplustree-transaction",
  "analog-modulation",
  "rc-timing",
  "scope-quantizer",
  "rectifier-supply",
]);

const LEGACY_INVARIANTS: Record<string, { label: string; latex: string }> = {
  "digital-logic": {
    label: "De Morgan's Duality Law",
    latex: "\\overline{A \\cdot B} \\equiv \\overline{A} + \\overline{B},\\quad \\overline{A + B} \\equiv \\overline{A} \\cdot \\overline{B}",
  },
  "pipeline-cache": {
    label: "Average Memory Access Time (AMAT)",
    latex: "\\text{AMAT} = \\text{Hit Time}_{L1} + \\text{Miss Rate}_{L1} \\times \\text{Miss Penalty}_{L1}",
  },
  "cpu-scheduler": {
    label: "Turnaround & Wait Relation",
    latex: "\\text{TAT}_i = C_i - AT_i,\\quad WT_i = \\text{TAT}_i - BT_i",
  },
  "page-replacement": {
    label: "Belady Optimal Bound",
    latex: "\\text{Faults}_{\\text{OPT}} \\le \\text{Faults}_{\\text{LRU}},\\; \\text{Faults}_{\\text{FIFO}}",
  },
  "ieee754-float": {
    label: "IEEE-754 Single Precision Value",
    latex: "v = (-1)^s \\times (1 + f) \\times 2^{E - 127}",
  },
  "embedded-gpio": {
    label: "PWM Timer Carrier Frequency",
    latex: "f_{\\text{PWM}} = \\frac{f_{\\text{CLK}}}{(\\text{PSC} + 1)(\\text{ARR} + 1)}",
  },
  "distributed-consensus": {
    label: "Raft Quorum Intersection",
    latex: "|Q_1| + |Q_2| > N \\implies Q_1 \\cap Q_2 \\neq \\emptyset",
  },
  "network-lab": {
    label: "IPv4 Usable Subnet Capacity",
    latex: "H_{\\text{usable}} = 2^{32 - p} - 2 \\quad (p \\le 30)",
  },
  "tcp-flow": {
    label: "Bandwidth-Delay Product (BDP)",
    latex: "\\text{BDP} = B_{\\text{link}} \\times \\text{RTT} \\le W_{\\text{max}}",
  },
  "security-lab": {
    label: "Euler Totient & RSA Key Pair",
    latex: "e \\cdot d \\equiv 1 \\pmod{(p-1)(q-1)},\\quad M^{ed} \\equiv M \\pmod n",
  },
  "appsec-sanitizer": {
    label: "Context-Aware Output Encoding",
    latex: "\\text{Safe}(u) = \\text{Escape}_{\\text{ctx}}(\\text{Canonicalize}(u))",
  },
  "db-web-lab": {
    label: "Relational Join Cardinality Upper Bound",
    latex: "|R \\bowtie S| \\le |R| \\times |S|",
  },
  "relational-normalization": {
    label: "BCNF Decomposition Condition",
    latex: "\\forall (X \\to Y) \\in F^+ : (Y \\subseteq X) \\lor (X \\text{ is Superkey})",
  },
  "memory-model": {
    label: "Recursive Descent Evaluation",
    latex: "\\text{Eval}(\\text{BinOp}(op, L, R)) = op(\\text{Eval}(L),\\; \\text{Eval}(R))",
  },
  "algo-visualizer": {
    label: "Dijkstra Non-Negative Invariant",
    latex: "u \\in S \\implies d[u] = \\delta(s, u)",
  },
  "sorting-bench": {
    label: "Comparison Lower Bound",
    latex: "\\lceil \\log_2(n!) \\rceil = \\Omega(n \\log n)",
  },
  "stats-modeling": {
    label: "Gaussian Density Function",
    latex: "f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} \\exp\\!\\left(-\\frac{(x - \\mu)^2}{2\\sigma^2}\\right)",
  },
  "neural-perceptron": {
    label: "Perceptron Decision Hyperplane",
    latex: "\\hat{y} = \\sigma(\\mathbf{w}^\\top \\mathbf{x} + b),\\quad \\Delta \\mathbf{w} = \\eta (y - \\hat{y}) \\mathbf{x}",
  },
};

export function SimulatorRenderer({ simulatorId }: { simulatorId: string }) {
  const meta = resolveSimulator(simulatorId);
  const canonicalId = meta.id;

  const renderInner = () => {
    switch (canonicalId) {
      case "digital-logic":
        return <LogicGateWorkbench />;
      case "pipeline-cache":
        return <CpuPipelineWorkbench />;
      case "cpu-scheduler":
        return <ProcessSchedulerWorkbench />;
      case "page-replacement":
        return <VirtualMemoryWorkbench />;
      case "network-lab":
        return <SubnetRouterWorkbench />;
      case "security-lab":
        return <CryptoCipherWorkbench />;
      case "db-web-lab":
        return <SqlOptimizerWorkbench />;
      case "memory-model":
        return <AstParserWorkbench />;
      case "algo-visualizer":
        return <GraphPathfinderWorkbench />;
      case "stats-modeling":
        return <ProbabilityStudioWorkbench />;
      case "ieee754-float":
        return <FloatingPointWorkbench />;
      case "sorting-bench":
        return <SortingVisualizerWorkbench />;
      case "tcp-flow":
        return <TcpFlowWorkbench />;
      case "distributed-consensus":
        return <DistributedConsensusWorkbench />;
      case "appsec-sanitizer":
        return <AppSecSanitizerWorkbench />;
      case "neural-perceptron":
        return <PerceptronWorkbench />;
      case "embedded-gpio":
        return <EmbeddedGpioWorkbench />;
      case "relational-normalization":
        return <RelationalNormalizationWorkbench />;
      case "pipeline-hazard":
        return <PipelineHazardWorkbench />;
      case "virtual-memory-page":
        return <VirtualMemoryPageWorkbench />;
      case "tcp-congestion":
        return <TcpCongestionWorkbench />;
      case "avalanche-crypto":
        return <AvalancheCryptoWorkbench />;
      case "graph-algorithm-arena":
        return <GraphAlgorithmArenaWorkbench />;
      case "automata-tape":
        return <AutomataTapeWorkbench />;
      case "bplustree-transaction":
        return <BPlusTreeTransactionWorkbench />;
      case "analog-modulation":
        return <AnalogModulationWorkbench />;
      case "rc-timing":
        return <RcTimingWorkbench />;
      case "scope-quantizer":
        return <ScopeQuantizerWorkbench />;
      case "rectifier-supply":
        return <RectifierSupplyWorkbench />;
      default:
        return (
          <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-card)] text-xs font-mono text-[var(--zen-ink-muted)]">
            Interactive simulator workbench [{simulatorId}] not found in registry.
          </div>
        );
    }
  };

  if (NATIVE_SHELL_IDS.has(canonicalId)) {
    return renderInner();
  }

  const inv = LEGACY_INVARIANTS[canonicalId];

  return (
    <div className="space-y-3">
      {renderInner()}
      <div className="p-3.5 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--zen-ink-muted)] mr-1">
            MAPPED COURSES:
          </span>
          {meta.courses.map((courseCode) => {
            const info = getCourseInfo(courseCode);
            const href = info?.href || `/notes?view=directory&q=${encodeURIComponent(courseCode)}`;
            return (
              <Link
                key={courseCode}
                href={href}
                className="px-2 py-0.5 rounded border border-[var(--zen-border)] bg-[var(--zen-void)] hover:border-[var(--zen-cyan)] hover:text-[var(--zen-cyan)] font-mono text-[10px] text-[var(--zen-frost)] transition-colors"
              >
                {courseCode}
              </Link>
            );
          })}
        </div>

        {inv && (
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--zen-snow)] bg-[var(--zen-void)]/75 px-3 py-1.5 rounded-lg border border-[var(--zen-border)]">
            <span className="text-[10px] uppercase text-[var(--zen-cyan)] font-semibold">
              {inv.label}:
            </span>
            <KatexFormula latex={inv.latex} />
          </div>
        )}
      </div>
    </div>
  );
}
