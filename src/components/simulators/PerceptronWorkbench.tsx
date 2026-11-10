"use client";

import { useState, useId } from "react";

type DatasetType = "separable" | "and" | "or" | "xor";
type ActivationFn = "step" | "sigmoid" | "relu" | "tanh";

interface DataPoint {
  x1: number;
  x2: number;
  label: number; // 1 or 0
}

const DATASETS: Record<DatasetType, DataPoint[]> = {
  separable: [
    { x1: -1.2, x2: -0.8, label: 0 },
    { x1: -0.8, x2: -1.4, label: 0 },
    { x1: -1.5, x2: -0.2, label: 0 },
    { x1: -0.5, x2: -0.6, label: 0 },
    { x1: 0.8, x2: 1.1, label: 1 },
    { x1: 1.2, x2: 0.7, label: 1 },
    { x1: 0.5, x2: 1.4, label: 1 },
    { x1: 1.4, x2: 1.2, label: 1 },
  ],
  and: [
    { x1: -1.0, x2: -1.0, label: 0 },
    { x1: -1.0, x2: 1.0, label: 0 },
    { x1: 1.0, x2: -1.0, label: 0 },
    { x1: 1.0, x2: 1.0, label: 1 },
  ],
  or: [
    { x1: -1.0, x2: -1.0, label: 0 },
    { x1: -1.0, x2: 1.0, label: 1 },
    { x1: 1.0, x2: -1.0, label: 1 },
    { x1: 1.0, x2: 1.0, label: 1 },
  ],
  xor: [
    { x1: -1.0, x2: -1.0, label: 0 },
    { x1: 1.0, x2: 1.0, label: 0 },
    { x1: -1.0, x2: 1.0, label: 1 },
    { x1: 1.0, x2: -1.0, label: 1 },
  ],
};

export function PerceptronWorkbench() {
  const w1SliderId = useId();
  const w2SliderId = useId();
  const biasSliderId = useId();
  const lrSliderId = useId();
  const [datasetKey, setDatasetKey] = useState<DatasetType>("separable");
  const [w1, setW1] = useState<number>(0.8);
  const [w2, setW2] = useState<number>(0.9);
  const [bias, setBias] = useState<number>(-0.1);
  const [lr, setLr] = useState<number>(0.1);
  const [activation, setActivation] = useState<ActivationFn>("step");
  const [epochsTrained, setEpochsTrained] = useState<number>(0);

  const dataset = DATASETS[datasetKey];

  // Forward pass
  const predict = (x1: number, x2: number): { raw: number; binary: number } => {
    const z = w1 * x1 + w2 * x2 + bias;
    let actVal = z;
    if (activation === "step") {
      actVal = z >= 0 ? 1 : 0;
    } else if (activation === "sigmoid") {
      actVal = 1 / (1 + Math.exp(-z));
    } else if (activation === "relu") {
      actVal = Math.max(0, z);
    } else if (activation === "tanh") {
      actVal = Math.tanh(z);
    }
    const binary = actVal >= 0.5 ? 1 : 0;
    return { raw: actVal, binary };
  };

  // Run 1 training epoch (Rosenblatt perceptron learning rule)
  const trainOneEpoch = () => {
    let newW1 = w1;
    let newW2 = w2;
    let newB = bias;

    for (const pt of dataset) {
      const z = newW1 * pt.x1 + newW2 * pt.x2 + newB;
      const yPred = z >= 0 ? 1 : 0;
      const error = pt.label - yPred;
      newW1 += lr * error * pt.x1;
      newW2 += lr * error * pt.x2;
      newB += lr * error;
    }

    setW1(Number(newW1.toFixed(3)));
    setW2(Number(newW2.toFixed(3)));
    setBias(Number(newB.toFixed(3)));
    setEpochsTrained((e) => e + 1);
  };

  const trainMultiEpochs = (count: number) => {
    let newW1 = w1;
    let newW2 = w2;
    let newB = bias;

    for (let c = 0; c < count; c++) {
      for (const pt of dataset) {
        const z = newW1 * pt.x1 + newW2 * pt.x2 + newB;
        const yPred = z >= 0 ? 1 : 0;
        const error = pt.label - yPred;
        newW1 += lr * error * pt.x1;
        newW2 += lr * error * pt.x2;
        newB += lr * error;
      }
    }

    setW1(Number(newW1.toFixed(3)));
    setW2(Number(newW2.toFixed(3)));
    setBias(Number(newB.toFixed(3)));
    setEpochsTrained((e) => e + count);
  };

  const resetWeights = () => {
    setW1(0.8);
    setW2(0.9);
    setBias(-0.1);
    setEpochsTrained(0);
  };

  // Metrics
  let correctCount = 0;
  let tp = 0, fp = 0, tn = 0, fn = 0;
  for (const pt of dataset) {
    const { binary } = predict(pt.x1, pt.x2);
    if (binary === pt.label) correctCount++;
    if (binary === 1 && pt.label === 1) tp++;
    if (binary === 1 && pt.label === 0) fp++;
    if (binary === 0 && pt.label === 0) tn++;
    if (binary === 0 && pt.label === 1) fn++;
  }
  const accuracy = ((correctCount / dataset.length) * 100).toFixed(1);

  // SVG coordinate transformation: [-2, 2] -> [20, 280]
  const toSvgX = (x: number) => ((x + 2) / 4) * 260 + 20;
  const toSvgY = (y: number) => 300 - (((y + 2) / 4) * 260 + 20);

  // Decision boundary line coordinates: w1*x1 + w2*x2 + b = 0 => x2 = (-w1*x1 - b) / w2
  const xLeft = -2;
  const yLeft = Math.abs(w2) > 0.001 ? (-w1 * xLeft - bias) / w2 : 0;
  const xRight = 2;
  const yRight = Math.abs(w2) > 0.001 ? (-w1 * xRight - bias) / w2 : 0;

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card text-[var(--zen-frost)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[var(--zen-border)] pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
            MACHINE LEARNING WORKBENCH // NEURAL ARCHITECTURE
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[var(--zen-snow)] tracking-wider uppercase">
            Perceptron Decision Boundary & Neural Studio
          </h4>
        </div>
        <div className="flex flex-wrap gap-1">
          {[
            { id: "separable", label: "SEPARABLE CLUSTERS" },
            { id: "and", label: "LOGICAL AND" },
            { id: "or", label: "LOGICAL OR" },
            { id: "xor", label: "NON-LINEAR XOR" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setDatasetKey(tab.id as DatasetType);
                setEpochsTrained(0);
              }}
              className={`px-2.5 py-1 text-xs font-mono rounded border transition-all ${
                datasetKey === tab.id
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold shadow-[0_0_10px_rgba(0,229,255,0.25)]"
                  : "border-transparent text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:bg-[var(--zen-card-hover)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 2D Plane Visualizer */}
        <div className="lg:col-span-7 p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)] flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-2 font-mono text-[10px] text-[var(--zen-ink-muted)]">
            <span>2D FEATURE SPACE [X1, X2]</span>
            <span className="text-[var(--zen-cyan)]">Boundary: {w1}*x1 + {w2}*x2 + {bias} = 0</span>
          </div>

          <svg width="300" height="300" viewBox="0 0 300 300" className="bg-[var(--zen-card)] border border-[var(--zen-border)] rounded-lg">
            {/* Grid Axes */}
            <line x1="20" y1="150" x2="280" y2="150" stroke="var(--zen-border)" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="150" y1="20" x2="150" y2="280" stroke="var(--zen-border)" strokeWidth="1" strokeDasharray="2,2" />

            {/* Decision Boundary Line */}
            {Math.abs(w2) > 0.001 ? (
              <line
                x1={toSvgX(xLeft)}
                y1={toSvgY(yLeft)}
                x2={toSvgX(xRight)}
                y2={toSvgY(yRight)}
                stroke="var(--zen-cyan)"
                strokeWidth="2.5"
              />
            ) : Math.abs(w1) > 0.001 ? (
              <line
                x1={toSvgX(-bias / w1)}
                y1={toSvgY(-2)}
                x2={toSvgX(-bias / w1)}
                y2={toSvgY(2)}
                stroke="var(--zen-cyan)"
                strokeWidth="2.5"
              />
            ) : null}

            {/* Data Points */}
            {dataset.map((pt, idx) => {
              const svgX = toSvgX(pt.x1);
              const svgY = toSvgY(pt.x2);
              const { binary } = predict(pt.x1, pt.x2);
              const isCorrect = binary === pt.label;

              return (
                <g key={idx}>
                  <circle
                    cx={svgX}
                    cy={svgY}
                    r="8"
                    fill={pt.label === 1 ? "rgba(0, 229, 255, 0.3)" : "rgba(244, 63, 94, 0.3)"}
                    stroke={pt.label === 1 ? "#00e5ff" : "#f43f5e"}
                    strokeWidth="2"
                  />
                  {!isCorrect && (
                    <circle cx={svgX} cy={svgY} r="12" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2,2" />
                  )}
                  <text
                    x={svgX}
                    y={svgY + 3}
                    textAnchor="middle"
                    fontSize="9"
                    fill="#ffffff"
                    fontFamily="monospace"
                  >
                    {pt.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-between w-full pt-3 mt-2 border-t border-[var(--zen-border)] font-mono text-[11px]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--zen-cyan)]/40 border border-[var(--zen-cyan)]" />
                <span className="text-[var(--zen-snow)]">Class 1</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/40 border border-rose-400" />
                <span className="text-[var(--zen-snow)]">Class 0</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full border border-amber-400 border-dashed" />
                <span className="text-amber-300">Misclassified</span>
              </span>
            </div>
            <div className="text-[var(--zen-cyan)] font-bold">Accuracy: {accuracy}%</div>
          </div>
        </div>

        {/* Interactive Parameter Controls & Training */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 space-y-3 font-mono text-xs">
            <span className="text-[10px] uppercase text-[var(--zen-cyan)] block font-semibold">
              HYPERPARAMETERS & WEIGHT SLIDERS
            </span>

            <div>
              <div className="flex justify-between mb-1">
                <label htmlFor={w1SliderId} className="text-[10px] text-[var(--zen-ink-muted)]">WEIGHT W1</label>
                <span className="font-bold text-[var(--zen-snow)]">{w1}</span>
              </div>
              <input
                id={w1SliderId}
                type="range"
                min="-3"
                max="3"
                step="0.05"
                value={w1}
                onChange={(e) => setW1(Number(e.target.value))}
                className="w-full accent-[var(--zen-cyan)]"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label htmlFor={w2SliderId} className="text-[10px] text-[var(--zen-ink-muted)]">WEIGHT W2</label>
                <span className="font-bold text-[var(--zen-snow)]">{w2}</span>
              </div>
              <input
                id={w2SliderId}
                type="range"
                min="-3"
                max="3"
                step="0.05"
                value={w2}
                onChange={(e) => setW2(Number(e.target.value))}
                className="w-full accent-[var(--zen-cyan)]"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label htmlFor={biasSliderId} className="text-[10px] text-[var(--zen-ink-muted)]">BIAS B</label>
                <span className="font-bold text-[var(--zen-snow)]">{bias}</span>
              </div>
              <input
                id={biasSliderId}
                type="range"
                min="-3"
                max="3"
                step="0.05"
                value={bias}
                onChange={(e) => setBias(Number(e.target.value))}
                className="w-full accent-[var(--zen-cyan)]"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label htmlFor={lrSliderId} className="text-[10px] text-[var(--zen-ink-muted)]">LEARNING RATE ALPHA</label>
                <span className="font-bold text-[var(--zen-snow)]">{lr}</span>
              </div>
              <input
                id={lrSliderId}
                type="range"
                min="0.01"
                max="0.5"
                step="0.01"
                value={lr}
                onChange={(e) => setLr(Number(e.target.value))}
                className="w-full accent-[var(--zen-cyan)]"
              />
            </div>

            {/* Training Action Buttons */}
            <div className="pt-2 border-t border-[var(--zen-border)] flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={trainOneEpoch}
                  className="py-1.5 rounded border border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 hover:bg-[var(--zen-cyan)]/30 text-[var(--zen-snow)] font-bold text-xs transition-all"
                >
                  TRAIN 1 EPOCH
                </button>
                <button
                  onClick={() => trainMultiEpochs(25)}
                  className="py-1.5 rounded border border-[var(--zen-cyan)]/50 bg-[var(--zen-card)] hover:bg-[var(--zen-cyan)]/15 text-[var(--zen-cyan)] font-bold text-xs transition-all"
                >
                  TRAIN 25 EPOCHS
                </button>
              </div>
              <button
                onClick={resetWeights}
                className="py-1 rounded border border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] text-[10px]"
              >
                Reset Weights (Epochs: {epochsTrained})
              </button>
            </div>
          </div>

          {/* Confusion Matrix Mini Card */}
          <div className="p-3.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/40 font-mono text-xs">
            <span className="text-[10px] text-[var(--zen-cyan)] uppercase block mb-2 font-semibold">
              CONFUSION MATRIX
            </span>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 rounded bg-[var(--zen-card)] border border-[var(--zen-border)]">
                <span className="text-[9px] text-[var(--zen-ink-muted)] block">TRUE POSITIVE (TP)</span>
                <span className="text-sm font-bold text-emerald-300">{tp}</span>
              </div>
              <div className="p-2 rounded bg-[var(--zen-card)] border border-[var(--zen-border)]">
                <span className="text-[9px] text-[var(--zen-ink-muted)] block">FALSE POSITIVE (FP)</span>
                <span className="text-sm font-bold text-rose-300">{fp}</span>
              </div>
              <div className="p-2 rounded bg-[var(--zen-card)] border border-[var(--zen-border)]">
                <span className="text-[9px] text-[var(--zen-ink-muted)] block">FALSE NEGATIVE (FN)</span>
                <span className="text-sm font-bold text-rose-300">{fn}</span>
              </div>
              <div className="p-2 rounded bg-[var(--zen-card)] border border-[var(--zen-border)]">
                <span className="text-[9px] text-[var(--zen-ink-muted)] block">TRUE NEGATIVE (TN)</span>
                <span className="text-sm font-bold text-emerald-300">{tn}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
