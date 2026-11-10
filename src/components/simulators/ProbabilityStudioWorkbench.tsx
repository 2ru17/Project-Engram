"use client";

import { useState } from "react";

type DistType = "normal" | "binomial" | "poisson";

export function ProbabilityStudioWorkbench() {
  const [distType, setDistType] = useState<DistType>("normal");

  // Normal distribution parameters
  const [mean, setMean] = useState(0);
  const [stdDev, setStdDev] = useState(1);
  const [customX, setCustomX] = useState<number>(1);

  // Binomial distribution parameters
  const [binomN, setBinomN] = useState<number>(20);
  const [binomP, setBinomP] = useState<number>(0.5);
  const [binomK, setBinomK] = useState<number>(10);

  // Poisson distribution parameters
  const [poissonLambda, setPoissonLambda] = useState<number>(4);
  const [poissonK, setPoissonK] = useState<number>(4);

  // Normal distribution computation
  const generateNormalPoints = () => {
    const points: { x: number; y: number }[] = [];
    const minX = -4;
    const maxX = 4;
    const step = 0.2;

    for (let x = minX; x <= maxX; x += step) {
      const exponent = -0.5 * Math.pow((x - mean) / stdDev, 2);
      const y = (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
      points.push({ x, y });
    }
    return points;
  };

  // Math factorial helper
  const factorial = (num: number): number => {
    if (num <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= num; i++) res *= i;
    return res;
  };

  // Combinations nCr
  const nCr = (n: number, r: number): number => {
    if (r < 0 || r > n) return 0;
    if (r === 0 || r === n) return 1;
    let num = 1;
    let den = 1;
    for (let i = 1; i <= r; i++) {
      num *= n - i + 1;
      den *= i;
    }
    return num / den;
  };

  // Binomial PMF: P(X = k) = nCr(n, k) * p^k * (1-p)^(n-k)
  const binomialPmf = (n: number, p: number, k: number): number => {
    if (k < 0 || k > n) return 0;
    return nCr(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
  };

  // Poisson PMF: P(X = k) = (lambda^k * e^(-lambda)) / k!
  const poissonPmf = (lambda: number, k: number): number => {
    if (k < 0) return 0;
    return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
  };

  // Error function approximation for cumulative normal distribution
  const erf = (x: number): number => {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const sign = x < 0 ? -1 : 1;
    const absX = Math.abs(x);
    const t = 1.0 / (1.0 + p * absX);
    const y = 1.0 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX));
    return sign * y;
  };

  const normalCdf = (val: number, mu: number, sigma: number): number => {
    return 0.5 * (1 + erf((val - mu) / (sigma * Math.sqrt(2))));
  };

  const normalPoints = generateNormalPoints();
  const maxNormalY = Math.max(...normalPoints.map((p) => p.y), 0.5);

  // Compute query stats for active distribution
  let queryTitle = "";
  let queryResult = "";
  let cumulativeResult = "";

  if (distType === "normal") {
    const zScore = ((customX - mean) / stdDev).toFixed(3);
    const probLess = (normalCdf(customX, mean, stdDev) * 100).toFixed(2);
    queryTitle = `Z-Score for X = ${customX}`;
    queryResult = `Z = (${customX} - ${mean}) / ${stdDev} = ${zScore}`;
    cumulativeResult = `P(X <= ${customX}) = ${probLess}%`;
  } else if (distType === "binomial") {
    const exactProb = (binomialPmf(binomN, binomP, binomK) * 100).toFixed(3);
    let cumProb = 0;
    for (let i = 0; i <= binomK; i++) {
      cumProb += binomialPmf(binomN, binomP, i);
    }
    queryTitle = `Binomial PMF for k = ${binomK}`;
    queryResult = `P(X = ${binomK}) = ${exactProb}%`;
    cumulativeResult = `P(X <= ${binomK}) = ${(cumProb * 100).toFixed(2)}% (Cumulative)`;
  } else if (distType === "poisson") {
    const exactProb = (poissonPmf(poissonLambda, poissonK) * 100).toFixed(3);
    let cumProb = 0;
    for (let i = 0; i <= poissonK; i++) {
      cumProb += poissonPmf(poissonLambda, i);
    }
    queryTitle = `Poisson PMF for k = ${poissonK}`;
    queryResult = `P(X = ${poissonK}) = ${exactProb}%`;
    cumulativeResult = `P(X <= ${poissonK}) = ${(cumProb * 100).toFixed(2)}% (Cumulative)`;
  }

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card text-[var(--zen-frost)]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[var(--zen-border)] pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
            PROBABILITY & STATISTICS // STT101A & CSMODEL
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[var(--zen-snow)] tracking-wider uppercase">
            Distribution Density & Probability Studio
          </h4>
        </div>
        <div className="flex gap-1.5">
          {(["normal", "binomial", "poisson"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setDistType(t)}
              className={`px-3 py-1 font-mono text-xs rounded border transition-all uppercase ${
                distType === t
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold shadow-[0_0_10px_rgba(0,229,255,0.25)]"
                  : "border-transparent text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:bg-[var(--zen-card-hover)]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Parameter Controls for Active Distribution */}
      {distType === "normal" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[var(--zen-ink-muted)] uppercase">
                Mean (mu): {mean}
              </span>
            </div>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.5"
              value={mean}
              onChange={(e) => setMean(parseFloat(e.target.value))}
              className="w-full accent-[var(--zen-cyan)]"
            />
          </div>
          <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[var(--zen-ink-muted)] uppercase">
                Std Dev (sigma): {stdDev}
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={stdDev}
              onChange={(e) => setStdDev(parseFloat(e.target.value))}
              className="w-full accent-[var(--zen-cyan)]"
            />
          </div>
          <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[var(--zen-ink-muted)] uppercase">
                Custom Query X:
              </span>
            </div>
            <input
              type="number"
              step="0.1"
              value={customX}
              onChange={(e) => setCustomX(parseFloat(e.target.value) || 0)}
              className="w-full px-2 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-card)] text-[var(--zen-snow)] text-xs text-center"
            />
          </div>
        </div>
      )}

      {distType === "binomial" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[var(--zen-ink-muted)] uppercase">
                Trials (n): {binomN}
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              step="1"
              value={binomN}
              onChange={(e) => {
                const n = parseInt(e.target.value, 10);
                setBinomN(n);
                if (binomK > n) setBinomK(n);
              }}
              className="w-full accent-[var(--zen-cyan)]"
            />
          </div>
          <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[var(--zen-ink-muted)] uppercase">
                Success Prob (p): {binomP.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.95"
              step="0.05"
              value={binomP}
              onChange={(e) => setBinomP(parseFloat(e.target.value))}
              className="w-full accent-[var(--zen-cyan)]"
            />
          </div>
          <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[var(--zen-ink-muted)] uppercase">
                Target Successes (k):
              </span>
            </div>
            <input
              type="number"
              min="0"
              max={binomN}
              value={binomK}
              onChange={(e) => setBinomK(Math.max(0, Math.min(binomN, parseInt(e.target.value, 10) || 0)))}
              className="w-full px-2 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-card)] text-[var(--zen-snow)] text-xs text-center"
            />
          </div>
        </div>
      )}

      {distType === "poisson" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[var(--zen-ink-muted)] uppercase">
                Rate Parameter (lambda): {poissonLambda}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.5"
              value={poissonLambda}
              onChange={(e) => setPoissonLambda(parseFloat(e.target.value))}
              className="w-full accent-[var(--zen-cyan)]"
            />
          </div>
          <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-[var(--zen-ink-muted)] uppercase">
                Target Events (k):
              </span>
            </div>
            <input
              type="number"
              min="0"
              max="30"
              value={poissonK}
              onChange={(e) => setPoissonK(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-full px-2 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-card)] text-[var(--zen-snow)] text-xs text-center"
            />
          </div>
        </div>
      )}

      {/* SVG Visualization Canvas */}
      <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 mb-5">
        {distType === "normal" ? (
          <svg viewBox="0 0 400 120" className="w-full h-36 overflow-visible">
            <line x1="20" y1="100" x2="380" y2="100" stroke="var(--zen-border)" strokeWidth="1" />
            <line x1="200" y1="10" x2="200" y2="105" stroke="var(--zen-border)" strokeDasharray="3,3" />

            {/* Custom X Indicator */}
            {(() => {
              const svgCustomX = 200 + customX * 40;
              return (
                <line
                  x1={svgCustomX}
                  y1="10"
                  x2={svgCustomX}
                  y2="100"
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeDasharray="2,2"
                />
              );
            })()}

            {/* Polyline Curve */}
            <path
              d={
                "M " +
                normalPoints
                  .map((p) => {
                    const svgX = 200 + p.x * 40;
                    const svgY = 100 - (p.y / maxNormalY) * 85;
                    return `${svgX},${svgY}`;
                  })
                  .join(" L ")
              }
              fill="none"
              stroke="var(--zen-cyan)"
              strokeWidth="2.5"
            />
            {/* Area under curve fill */}
            <path
              d={
                "M " +
                normalPoints
                  .map((p) => `${200 + p.x * 40},${100 - (p.y / maxNormalY) * 85}`)
                  .join(" L ") +
                " L 360,100 L 40,100 Z"
              }
              fill="var(--zen-cyan)"
              fillOpacity="0.12"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 400 120" className="w-full h-36 overflow-visible">
            <line x1="20" y1="100" x2="380" y2="100" stroke="var(--zen-border)" strokeWidth="1" />
            {(() => {
              const totalBars = distType === "binomial" ? Math.min(binomN + 1, 25) : 18;
              const barWidth = Math.max(4, Math.floor(340 / totalBars) - 2);
              const maxP = distType === "binomial"
                ? Math.max(...Array.from({ length: totalBars }, (_, k) => binomialPmf(binomN, binomP, k)), 0.1)
                : Math.max(...Array.from({ length: totalBars }, (_, k) => poissonPmf(poissonLambda, k)), 0.1);

              return Array.from({ length: totalBars }, (_, k) => {
                const prob = distType === "binomial"
                  ? binomialPmf(binomN, binomP, k)
                  : poissonPmf(poissonLambda, k);
                const barHeight = (prob / maxP) * 80;
                const barX = 25 + k * (barWidth + 2);
                const isSelected = distType === "binomial" ? k === binomK : k === poissonK;

                return (
                  <g key={k}>
                    <rect
                      x={barX}
                      y={100 - barHeight}
                      width={barWidth}
                      height={Math.max(2, barHeight)}
                      fill={isSelected ? "#10b981" : "var(--zen-cyan)"}
                      fillOpacity={isSelected ? 0.9 : 0.6}
                      rx="1"
                    />
                    {k % 2 === 0 && (
                      <text
                        x={barX + barWidth / 2}
                        y="112"
                        textAnchor="middle"
                        fill="var(--zen-ink-muted)"
                        fontSize="8"
                        fontFamily="monospace"
                      >
                        {k}
                      </text>
                    )}
                  </g>
                );
              });
            })()}
          </svg>
        )}

        <div className="flex justify-between font-mono text-[10px] text-[var(--zen-ink-muted)] px-4 mt-1">
          {distType === "normal" ? (
            <>
              <span>-3 sigma</span>
              <span>-2 sigma</span>
              <span>-1 sigma</span>
              <span className="text-[var(--zen-cyan)] font-bold">mu (Mean)</span>
              <span>+1 sigma</span>
              <span>+2 sigma</span>
              <span>+3 sigma</span>
            </>
          ) : (
            <>
              <span>k = 0</span>
              <span className="text-emerald-400 font-bold">Green bar = Selected Target k</span>
              <span>Higher k values</span>
            </>
          )}
        </div>
      </div>

      {/* Query Computation Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 font-mono text-xs">
        <div className="p-3.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60">
          <span className="text-[10px] text-[var(--zen-ink-muted)] uppercase block mb-1">
            {queryTitle}
          </span>
          <span className="text-sm font-bold text-[var(--zen-cyan)]">{queryResult}</span>
        </div>
        <div className="p-3.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60">
          <span className="text-[10px] text-[var(--zen-ink-muted)] uppercase block mb-1">
            Cumulative Probability Interval
          </span>
          <span className="text-sm font-bold text-emerald-400">{cumulativeResult}</span>
        </div>
      </div>

      <div className="text-[11px] font-mono text-[var(--zen-ink-muted)] flex flex-wrap justify-between gap-2">
        <div>
          {distType === "normal"
            ? "Empirical 68-95-99.7 Rule: 68.27% of data lies within 1 standard deviation (mu +- sigma)."
            : distType === "binomial"
            ? `Binomial Distribution with n = ${binomN} trials and success rate p = ${binomP.toFixed(2)}.`
            : `Poisson Distribution with mean event arrival rate lambda = ${poissonLambda}.`}
        </div>
        <div className="text-[var(--zen-cyan)] font-semibold">
          Convergence Rate: O(1 / sqrt(N))
        </div>
      </div>
    </div>
  );
}
