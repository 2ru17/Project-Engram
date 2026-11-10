"use client";

import { useState } from "react";

interface QueryPlan {
  name: string;
  sql: string;
  relAlgebra: string;
  scanType: "Seq Scan" | "Index Scan (B+ Tree)";
  estCost: number;
  estRows: number;
  optimization: string;
}

const PRESET_PLANS: QueryPlan[] = [
  {
    name: "Unindexed Filter (Full Table Scan)",
    sql: "SELECT name, email FROM students WHERE gpa > 3.8",
    relAlgebra: "π[name, email](σ[gpa > 3.8](students))",
    scanType: "Seq Scan",
    estCost: 480.5,
    estRows: 120,
    optimization: "Requires scanning all 10,000 blocks sequentially. Add index on `gpa`.",
  },
  {
    name: "Indexed Lookup (B+ Tree Scan)",
    sql: "SELECT * FROM students WHERE student_id = 11942001",
    relAlgebra: "σ[student_id = 11942001](students)",
    scanType: "Index Scan (B+ Tree)",
    estCost: 4.2,
    estRows: 1,
    optimization: "Direct root-to-leaf traversal (O(log N)). Minimal I/O operations.",
  },
  {
    name: "Natural Join with Predicate Pushdown",
    sql: "SELECT s.name, e.course_code FROM students s JOIN enrollments e ON s.id = e.student_id WHERE s.year = 3",
    relAlgebra: "π[name, course_code]((σ[year = 3](students)) ⋈ enrollments)",
    scanType: "Index Scan (B+ Tree)",
    estCost: 65.8,
    estRows: 340,
    optimization: "Predicate pushed down before the hash join to reduce intermediate cardinality by 75%.",
  },
  {
    name: "Range Scan on Indexed Date",
    sql: "SELECT order_id, total FROM orders WHERE order_date >= '2026-01-01'",
    relAlgebra: "π[order_id, total](σ[order_date >= '2026-01-01'](orders))",
    scanType: "Index Scan (B+ Tree)",
    estCost: 18.4,
    estRows: 85,
    optimization: "B+ Tree index range scan retrieves matching leaves with sequential disk block read.",
  },
];

export function SqlOptimizerWorkbench() {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [customSql, setCustomSql] = useState<string>(PRESET_PLANS[0].sql);

  const handlePresetSelect = (idx: number) => {
    setSelectedIdx(idx);
    setCustomSql(PRESET_PLANS[idx].sql);
  };

  // Dynamically derive relational algebra and optimizer plan from user SQL
  const parseSqlToPlan = (sql: string): QueryPlan => {
    const trimmed = sql.trim();
    // Check if matches a preset exactly
    const matchedPreset = PRESET_PLANS.find(
      (p) => p.sql.toLowerCase() === trimmed.toLowerCase()
    );
    if (matchedPreset) return matchedPreset;

    // Parse custom SQL
    const selectMatch = trimmed.match(/SELECT\s+(.*?)\s+FROM/i);
    const fromMatch = trimmed.match(/FROM\s+(.*?)(?:\s+WHERE|\s+JOIN|\s+GROUP|\s+ORDER|$)/i);
    const whereMatch = trimmed.match(/WHERE\s+(.*?)(?:\s+GROUP|\s+ORDER|$)/i);
    const hasJoin = /JOIN/i.test(trimmed);

    const projCols = selectMatch ? selectMatch[1].trim() : "*";
    const tables = fromMatch ? fromMatch[1].trim() : "table";
    const condition = whereMatch ? whereMatch[1].trim() : null;

    let algebra = tables;
    if (hasJoin) {
      algebra = `(${tables.replace(/\s+JOIN\s+/gi, " ⋈ ")})`;
    }
    if (condition) {
      algebra = `σ[${condition}](${algebra})`;
    }
    if (projCols && projCols !== "*") {
      algebra = `π[${projCols}](${algebra})`;
    }

    const isIndexed = /_?id\b|key\b/i.test(condition || "");
    const scanType = isIndexed ? "Index Scan (B+ Tree)" : "Seq Scan";
    const estCost = isIndexed ? 6.5 : 320.0;
    const estRows = isIndexed ? 2 : 250;
    const optimization = isIndexed
      ? "Indexed column access path avoids sequential table scan."
      : "Full table scan required; consider creating a secondary index on filtered attributes.";

    return {
      name: "Custom Query Analysis",
      sql: trimmed,
      relAlgebra: algebra,
      scanType,
      estCost,
      estRows,
      optimization,
    };
  };

  const plan = parseSqlToPlan(customSql);

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card text-[var(--zen-frost)]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[var(--zen-border)] pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
            DATABASE SYSTEMS // CCINFOM & CCAPDEV
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[var(--zen-snow)] tracking-wider uppercase">
            Relational Algebra & SQL Query Optimizer
          </h4>
        </div>
        <div className="text-xs font-mono text-[var(--zen-cyan)] bg-[var(--zen-cyan)]/10 px-2.5 py-1 rounded border border-[var(--zen-cyan)]/30 font-semibold">
          Optimizer Mode: Cost-Based Relational Engine
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-[10px] font-mono uppercase text-[var(--zen-ink-muted)] self-center mr-1">
          Presets:
        </span>
        {PRESET_PLANS.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handlePresetSelect(idx)}
            className={`px-3 py-1.5 text-xs font-mono rounded border transition-all ${
              selectedIdx === idx && customSql === p.sql
                ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:bg-[var(--zen-card-hover)]"
            }`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Editable SQL Query Input */}
      <div className="p-3.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)] font-mono text-xs mb-5">
        <label className="text-[10px] text-[var(--zen-ink-muted)] uppercase block mb-1">
          SQL Query (Type custom SQL query or choose a preset)
        </label>
        <textarea
          rows={2}
          value={customSql}
          onChange={(e) => setCustomSql(e.target.value)}
          placeholder="e.g. SELECT name, age FROM users WHERE user_id = 42"
          className="w-full px-3 py-2 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)] text-[var(--zen-snow)] font-mono text-xs focus:outline-none focus:border-[var(--zen-cyan)] leading-relaxed resize-none"
        />
      </div>

      {/* Relational Algebra Operator Tree */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-[var(--zen-snow)] uppercase block mb-3">
              Relational Algebra Operator Representation
            </span>
            <div className="p-3 rounded bg-[var(--zen-midnight)] border border-[var(--zen-border)] font-mono text-sm text-amber-700 dark:text-amber-300 font-semibold mb-3 break-all">
              {plan.relAlgebra}
            </div>
          </div>
          <div className="text-[11px] font-mono text-[var(--zen-ink-muted)] space-y-1 pt-3 border-t border-[var(--zen-border)]/40">
            <div>σ (Sigma) = Selection / WHERE Predicate filter</div>
            <div>π (Pi) = Projection / SELECT Attribute set</div>
            <div>⋈ (Bowtie) = Natural Join / Equi-Join Operator</div>
          </div>
        </div>

        {/* Query Cost Metrics */}
        <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-[var(--zen-snow)] uppercase block mb-3">
              Optimizer Plan Telemetry
            </span>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="p-2.5 rounded bg-[var(--zen-midnight)] border border-[var(--zen-border)]">
                <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] block">
                  Access Path
                </span>
                <span className="text-xs font-mono font-bold text-[var(--zen-snow)]">
                  {plan.scanType}
                </span>
              </div>
              <div className="p-2.5 rounded bg-[var(--zen-midnight)] border border-[var(--zen-border)]">
                <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] block">
                  Est. Disk Cost
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  {plan.estCost} I/O
                </span>
              </div>
            </div>
          </div>
          <div className="p-2.5 rounded bg-[var(--zen-midnight)] border border-[var(--zen-border)] text-[11px] font-mono text-[var(--zen-cyan)]">
            <strong>Heuristic:</strong> {plan.optimization}
          </div>
        </div>
      </div>
    </div>
  );
}