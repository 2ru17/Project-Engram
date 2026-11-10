"use client";

import { useState, useMemo } from "react";

interface FunctionalDependency {
  lhs: string[];
  rhs: string[];
}

interface RelationSchema {
  name: string;
  attributes: string[];
  fds: FunctionalDependency[];
}

const SCHEMAS: RelationSchema[] = [
  {
    name: "Student Enrollment System",
    attributes: ["StudentID", "CourseID", "StudentName", "CourseName", "Instructor", "Grade"],
    fds: [
      { lhs: ["StudentID", "CourseID"], rhs: ["Grade"] },
      { lhs: ["StudentID"], rhs: ["StudentName"] },
      { lhs: ["CourseID"], rhs: ["CourseName", "Instructor"] },
    ],
  },
  {
    name: "Order Fulfillment System",
    attributes: ["OrderID", "ItemID", "OrderDate", "CustomerCity", "ZipCode", "Quantity"],
    fds: [
      { lhs: ["OrderID", "ItemID"], rhs: ["Quantity"] },
      { lhs: ["OrderID"], rhs: ["OrderDate", "ZipCode"] },
      { lhs: ["ZipCode"], rhs: ["CustomerCity"] },
    ],
  },
  {
    name: "Supplier Parts Catalog",
    attributes: ["SupplierID", "PartID", "City", "Status", "Quantity"],
    fds: [
      { lhs: ["SupplierID", "PartID"], rhs: ["Quantity"] },
      { lhs: ["SupplierID"], rhs: ["City"] },
      { lhs: ["City"], rhs: ["Status"] },
    ],
  },
];

export function RelationalNormalizationWorkbench() {
  const [selectedSchemaIdx, setSelectedSchemaIdx] = useState<number>(0);
  const [customFds, setCustomFds] = useState<FunctionalDependency[]>(SCHEMAS[0].fds);
  const [selectedAttrs, setSelectedAttrs] = useState<string[]>([]);
  const [computedClosure, setComputedClosure] = useState<string[] | null>(null);

  // New FD builder inputs
  const [newLhs, setNewLhs] = useState<string[]>([]);
  const [newRhs, setNewRhs] = useState<string[]>([]);

  const schema = SCHEMAS[selectedSchemaIdx];

  const handleSchemaChange = (idx: number) => {
    setSelectedSchemaIdx(idx);
    setCustomFds(SCHEMAS[idx].fds);
    setSelectedAttrs([]);
    setComputedClosure(null);
    setNewLhs([]);
    setNewRhs([]);
  };

  const toggleAttrSelection = (attr: string) => {
    setSelectedAttrs((prev) =>
      prev.includes(attr) ? prev.filter((a) => a !== attr) : [...prev, attr]
    );
    setComputedClosure(null);
  };

  const toggleLhsAttr = (attr: string) => {
    setNewLhs((prev) =>
      prev.includes(attr) ? prev.filter((a) => a !== attr) : [...prev, attr]
    );
  };

  const toggleRhsAttr = (attr: string) => {
    setNewRhs((prev) =>
      prev.includes(attr) ? prev.filter((a) => a !== attr) : [...prev, attr]
    );
  };

  const handleAddFd = () => {
    if (newLhs.length === 0 || newRhs.length === 0) return;
    setCustomFds((prev) => [...prev, { lhs: [...newLhs], rhs: [...newRhs] }]);
    setNewLhs([]);
    setNewRhs([]);
    setComputedClosure(null);
  };

  const handleDeleteFd = (idx: number) => {
    setCustomFds((prev) => prev.filter((_, i) => i !== idx));
    setComputedClosure(null);
  };

  const handleResetFds = () => {
    setCustomFds(schema.fds);
    setComputedClosure(null);
  };

  // Helper: compute attribute closure for a given set of attributes under currentFds
  const getClosureOf = (attrSet: Set<string>, fds: FunctionalDependency[]): Set<string> => {
    const closure = new Set<string>(attrSet);
    let changed = true;
    while (changed) {
      changed = false;
      for (const fd of fds) {
        if (fd.lhs.every((a) => closure.has(a))) {
          for (const r of fd.rhs) {
            if (!closure.has(r)) {
              closure.add(r);
              changed = true;
            }
          }
        }
      }
    }
    return closure;
  };

  // Dynamic candidate keys computation
  const candidateKeys = useMemo(() => {
    const attrs = schema.attributes;
    const n = attrs.length;
    const keys: string[][] = [];

    const subsets: string[][] = [];
    for (let i = 1; i < (1 << n); i++) {
      const subset: string[] = [];
      for (let j = 0; j < n; j++) {
        if ((i & (1 << j)) !== 0) subset.push(attrs[j]);
      }
      subsets.push(subset);
    }
    subsets.sort((a, b) => a.length - b.length);

    for (const sub of subsets) {
      const isSuper = keys.some((ck) => ck.every((attr) => sub.includes(attr)));
      if (isSuper) continue;
      const closure = getClosureOf(new Set(sub), customFds);
      if (closure.size === n) {
        keys.push(sub);
      }
    }

    return keys.length > 0 ? keys : [attrs];
  }, [schema.attributes, customFds]);

  // Dynamic normal forms evaluation
  const { violates2NF, violates3NF, violatesBCNF } = useMemo(() => {
    const primeAttrs = new Set<string>(candidateKeys.flat());
    const v2: string[] = [];
    const v3: string[] = [];
    const vBCNF: string[] = [];

    for (const fd of customFds) {
      const nonTrivialRhs = fd.rhs.filter((r) => !fd.lhs.includes(r));
      if (nonTrivialRhs.length === 0) continue;

      const lhsClosure = getClosureOf(new Set(fd.lhs), customFds);
      const isSuperkey = lhsClosure.size === schema.attributes.length;

      // 2NF Check: No non-prime attribute depends on a proper subset of any candidate key
      const nonPrimeRhs = nonTrivialRhs.filter((r) => !primeAttrs.has(r));
      if (nonPrimeRhs.length > 0) {
        for (const ck of candidateKeys) {
          const isProperSubset =
            fd.lhs.length < ck.length && fd.lhs.every((a) => ck.includes(a));
          if (isProperSubset) {
            v2.push(
              `{${fd.lhs.join(", ")}} -> {${nonPrimeRhs.join(", ")}} (Partial dependency on key {${ck.join(", ")}})`
            );
            break;
          }
        }
      }

      // BCNF Check: Determinant must be a superkey
      if (!isSuperkey) {
        vBCNF.push(
          `{${fd.lhs.join(", ")}} -> {${nonTrivialRhs.join(", ")}} (Determinant is not a superkey)`
        );
      }

      // 3NF Check: Either LHS is superkey OR every RHS attribute is prime
      if (!isSuperkey) {
        const nonPrimeInRhs = nonTrivialRhs.filter((r) => !primeAttrs.has(r));
        if (nonPrimeInRhs.length > 0) {
          v3.push(
            `{${fd.lhs.join(", ")}} -> {${nonPrimeInRhs.join(", ")}} (Transitive dependency: non-prime attributes)`
          );
        }
      }
    }

    return { violates2NF: v2, violates3NF: v3, violatesBCNF: vBCNF };
  }, [schema.attributes, customFds, candidateKeys]);

  // Interactive compute closure for selected attributes
  const handleComputeClosure = () => {
    const res = getClosureOf(new Set(selectedAttrs), customFds);
    setComputedClosure(Array.from(res));
  };

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card text-[var(--zen-frost)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[var(--zen-border)] pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
            DATABASE THEORY WORKBENCH // RELATIONAL ALGEBRA & NORMALIZATION
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[var(--zen-snow)] tracking-wider uppercase">
            Relational Normalization & FD Closure Studio
          </h4>
        </div>
        <div className="flex flex-wrap gap-1">
          {SCHEMAS.map((s, idx) => (
            <button
              key={s.name}
              onClick={() => handleSchemaChange(idx)}
              className={`px-2.5 py-1 text-xs font-mono rounded border transition-all ${
                selectedSchemaIdx === idx
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold shadow-[0_0_10px_rgba(0,229,255,0.25)]"
                  : "border-transparent text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:bg-[var(--zen-card-hover)]"
              }`}
            >
              SCHEMA {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Schema Attributes and FDs Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs space-y-3">
          <span className="text-[10px] uppercase text-[var(--zen-cyan)] block font-semibold">
            RELATION SCHEMA: {schema.name}
          </span>
          <div className="p-2.5 rounded bg-[var(--zen-card)] border border-[var(--zen-border)] text-[var(--zen-snow)]">
            R(<strong>{schema.attributes.join(", ")}</strong>)
          </div>
          <div>
            <span className="text-[10px] text-[var(--zen-ink-muted)] uppercase block mb-1">
              MINIMAL CANDIDATE KEYS (Dynamically Derived)
            </span>
            <div className="flex flex-wrap gap-2">
              {candidateKeys.map((ck, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-[var(--zen-cyan)]/15 border border-[var(--zen-cyan)] text-[var(--zen-cyan)] font-bold"
                >
                  &#123;{ck.join(", ")}&#125;
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase text-[var(--zen-cyan)] font-semibold">
              FUNCTIONAL DEPENDENCIES (F) ({customFds.length})
            </span>
            <button
              onClick={handleResetFds}
              className="text-[10px] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] transition-colors"
            >
              Reset FDs
            </button>
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {customFds.map((fd, i) => (
              <div
                key={i}
                className="p-2 rounded bg-[var(--zen-card)] border border-[var(--zen-border)] text-[var(--zen-snow)] flex items-center justify-between"
              >
                <span>
                  &#123;{fd.lhs.join(", ")}&#125; &rarr; &#123;{fd.rhs.join(", ")}&#125;
                </span>
                <button
                  onClick={() => handleDeleteFd(i)}
                  className="text-[var(--zen-ink-muted)] hover:text-red-400 text-xs px-1"
                  title="Delete FD"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Custom Functional Dependency Form */}
      <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/50 font-mono text-xs mb-6 space-y-3">
        <span className="text-[10px] text-[var(--zen-cyan)] uppercase font-semibold block">
          Add Custom Functional Dependency (Put your own values and add more FDs)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <span className="text-[10px] text-[var(--zen-ink-muted)] uppercase block mb-1">
              Select Left-Hand Side (Determinant):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {schema.attributes.map((attr) => {
                const active = newLhs.includes(attr);
                return (
                  <button
                    key={`lhs-${attr}`}
                    onClick={() => toggleLhsAttr(attr)}
                    className={`px-2 py-0.5 rounded text-[11px] border transition-colors ${
                      active
                        ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/25 text-[var(--zen-snow)] font-bold"
                        : "border-[var(--zen-border)] bg-[var(--zen-card)] text-[var(--zen-ink-muted)]"
                    }`}
                  >
                    {attr}
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <span className="text-[10px] text-[var(--zen-ink-muted)] uppercase block mb-1">
              Select Right-Hand Side (Dependent):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {schema.attributes.map((attr) => {
                const active = newRhs.includes(attr);
                return (
                  <button
                    key={`rhs-${attr}`}
                    onClick={() => toggleRhsAttr(attr)}
                    className={`px-2 py-0.5 rounded text-[11px] border transition-colors ${
                      active
                        ? "border-emerald-500 bg-emerald-500/25 text-[var(--zen-snow)] font-bold"
                        : "border-[var(--zen-border)] bg-[var(--zen-card)] text-[var(--zen-ink-muted)]"
                    }`}
                  >
                    {attr}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-[var(--zen-border)]">
          <span className="text-[11px] text-[var(--zen-ink-muted)]">
            New FD Preview: &#123;{newLhs.join(", ") || "?"}&#125; &rarr; &#123;{newRhs.join(", ") || "?"}&#125;
          </span>
          <button
            onClick={handleAddFd}
            disabled={newLhs.length === 0 || newRhs.length === 0}
            className="px-3 py-1 rounded bg-[var(--zen-cyan)]/20 border border-[var(--zen-cyan)] text-[var(--zen-snow)] font-semibold text-xs hover:bg-[var(--zen-cyan)]/30 disabled:opacity-40 transition-colors"
          >
            + Add Dependency
          </button>
        </div>
      </div>

      {/* Interactive Attribute Closure Calculator */}
      <div className="p-4 sm:p-5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)] mb-6 font-mono text-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-[10px] text-[var(--zen-cyan)] uppercase font-semibold">
            INTERACTIVE ATTRIBUTE CLOSURE CALCULATOR (X+)
          </span>
          <button
            disabled={selectedAttrs.length === 0}
            onClick={handleComputeClosure}
            className="px-3 py-1 rounded text-xs font-mono font-bold uppercase bg-[var(--zen-cyan)]/20 border border-[var(--zen-cyan)] text-[var(--zen-cyan)] hover:bg-[var(--zen-cyan)]/30 transition-all disabled:opacity-30"
          >
            COMPUTE CLOSURE
          </button>
        </div>

        <div>
          <span className="text-[10px] text-[var(--zen-ink-muted)] uppercase block mb-2">
            SELECT ATTRIBUTES TO COMPUTE CLOSURE:
          </span>
          <div className="flex flex-wrap gap-2">
            {schema.attributes.map((attr) => {
              const isSelected = selectedAttrs.includes(attr);
              return (
                <button
                  key={attr}
                  onClick={() => toggleAttrSelection(attr)}
                  className={`px-3 py-1 rounded border text-xs font-mono font-bold transition-all ${
                    isSelected
                      ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] shadow-[0_0_8px_rgba(0,229,255,0.2)]"
                      : "border-[var(--zen-border)] bg-[var(--zen-card)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
                  }`}
                >
                  {attr}
                </button>
              );
            })}
          </div>
        </div>

        {computedClosure && (
          <div className="p-3 rounded bg-[var(--zen-card)] border border-[var(--zen-cyan)]/50 space-y-1">
            <span className="text-[10px] text-[var(--zen-cyan)] uppercase block font-semibold">
              DERIVED CLOSURE: (&#123;{selectedAttrs.join(", ")}&#125;)+
            </span>
            <div className="text-sm font-bold text-[var(--zen-snow)]">
              (&#123;{selectedAttrs.join(", ")}&#125;)+ = &#123;{computedClosure.join(", ")}&#125;
            </div>
            <div className="text-[10px] text-[var(--zen-ink-muted)] mt-1">
              {computedClosure.length === schema.attributes.length
                ? "This attribute set determines ALL attributes in R, therefore it is a SUPERKEY."
                : `Determines ${computedClosure.length} of ${schema.attributes.length} attributes. Not a superkey.`}
            </div>
          </div>
        )}
      </div>

      {/* Normal Form Evaluation Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
        <div className="p-3.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/40 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--zen-snow)] uppercase">2ND NORMAL FORM (2NF)</span>
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                violates2NF.length === 0
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400"
                  : "bg-rose-500/20 text-rose-300 border border-rose-400"
              }`}
            >
              {violates2NF.length === 0 ? "SATISFIED" : "VIOLATED"}
            </span>
          </div>
          <p className="text-[11px] text-[var(--zen-ink-muted)] leading-relaxed">
            Rule: No non-prime attribute may depend on a proper subset of any candidate key.
          </p>
          {violates2NF.length > 0 && (
            <div className="pt-1 text-[10px] text-rose-300">
              {violates2NF.map((v, i) => (
                <div key={i}>&bull; {v}</div>
              ))}
            </div>
          )}
        </div>

        <div className="p-3.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/40 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--zen-snow)] uppercase">3RD NORMAL FORM (3NF)</span>
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                violates3NF.length === 0
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400"
                  : "bg-rose-500/20 text-rose-300 border border-rose-400"
              }`}
            >
              {violates3NF.length === 0 ? "SATISFIED" : "VIOLATED"}
            </span>
          </div>
          <p className="text-[11px] text-[var(--zen-ink-muted)] leading-relaxed">
            Rule: For every non-trivial X &rarr; A, either X is a superkey or A is a prime attribute.
          </p>
          {violates3NF.length > 0 && (
            <div className="pt-1 text-[10px] text-rose-300">
              {violates3NF.map((v, i) => (
                <div key={i}>&bull; {v}</div>
              ))}
            </div>
          )}
        </div>

        <div className="p-3.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/40 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[var(--zen-snow)] uppercase">BOYCE-CODD (BCNF)</span>
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                violatesBCNF.length === 0
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400"
                  : "bg-rose-500/20 text-rose-300 border border-rose-400"
              }`}
            >
              {violatesBCNF.length === 0 ? "SATISFIED" : "VIOLATED"}
            </span>
          </div>
          <p className="text-[11px] text-[var(--zen-ink-muted)] leading-relaxed">
            Rule: For every non-trivial X &rarr; A, determinant X must strictly be a superkey.
          </p>
          {violatesBCNF.length > 0 && (
            <div className="pt-1 text-[10px] text-rose-300">
              {violatesBCNF.map((v, i) => (
                <div key={i}>&bull; {v}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
