"use client";

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

export function SimulatorRenderer({ simulatorId }: { simulatorId: string }) {
  switch (simulatorId) {
    case "digital-logic":
    case "logic-builder":
    case "discrete-logic":
      return <LogicGateWorkbench />;

    case "pipeline-cache":
    case "cpu-pipeline":
      return <CpuPipelineWorkbench />;

    case "cpu-scheduler":
    case "process-scheduler":
      return <ProcessSchedulerWorkbench />;

    case "page-replacement":
    case "virtual-memory":
      return <VirtualMemoryWorkbench />;

    case "network-lab":
    case "subnet-router":
      return <SubnetRouterWorkbench />;

    case "security-lab":
    case "crypto-lab":
      return <CryptoCipherWorkbench />;

    case "db-web-lab":
    case "sql-optimizer":
      return <SqlOptimizerWorkbench />;

    case "memory-model":
    case "ast-parser":
      return <AstParserWorkbench />;

    case "algo-visualizer":
    case "graph-pathfinder":
    case "math-visualizer":
      return <GraphPathfinderWorkbench />;

    case "stats-modeling":
    case "prob-stats":
      return <ProbabilityStudioWorkbench />;

    case "ieee754-float":
    case "float-converter":
    case "ieee754":
      return <FloatingPointWorkbench />;

    case "sorting-bench":
    case "sorting-visualizer":
    case "sorting":
      return <SortingVisualizerWorkbench />;

    case "tcp-flow":
    case "tcp-handshake":
    case "tcp":
      return <TcpFlowWorkbench />;

    case "distributed-consensus":
    case "raft-lamport":
    case "raft":
      return <DistributedConsensusWorkbench />;

    case "appsec-sanitizer":
    case "web-security":
    case "appsec":
      return <AppSecSanitizerWorkbench />;

    case "neural-perceptron":
    case "ai-classifier":
    case "perceptron":
      return <PerceptronWorkbench />;

    case "embedded-gpio":
    case "microcontroller-lab":
    case "gpio":
      return <EmbeddedGpioWorkbench />;

    case "relational-normalization":
    case "database-normalizer":
    case "normalization":
      return <RelationalNormalizationWorkbench />;

    default:
      return (
        <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-card)] text-xs font-mono text-[var(--zen-ink-muted)]">
          Interactive simulator workbench [{simulatorId}] not found in registry.
        </div>
      );
  }
}
