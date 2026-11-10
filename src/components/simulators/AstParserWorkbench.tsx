"use client";

import { useState } from "react";

interface ASTNode {
  type: string;
  value: string;
  left?: ASTNode;
  right?: ASTNode;
}

const PRESET_EXPRESSIONS = [
  { label: "Basic Precedence", expr: "3 + 4 * 2" },
  { label: "Parentheses Override", expr: "(12 - 4) * (2 + 3)" },
  { label: "Nested Arithmetic", expr: "100 / (5 + 5) * 4" },
  { label: "Variables", expr: "x * 4 + y" },
];

export function AstParserWorkbench() {
  const [expr, setExpr] = useState("3 + 4 * 2");
  const [varX, setVarX] = useState<number>(5);
  const [varY, setVarY] = useState<number>(10);

  // Dynamic recursive-descent arithmetic parser with precedence (*, / over +, -)
  const buildAST = (s: string): { ast: ASTNode; tokens: string[] } => {
    const tokens = s.match(/\d+|[a-zA-Z_]\w*|[+\-*/()]/g) || [];
    let pos = 0;

    const peek = () => (pos < tokens.length ? tokens[pos] : null);
    const consume = () => tokens[pos++];

    const parsePrimary = (): ASTNode => {
      const t = peek();
      if (!t) return { type: "Literal", value: "0" };
      if (t === "(") {
        consume();
        const sub = parseAddSub();
        if (peek() === ")") consume();
        return sub;
      }
      consume();
      return { type: /^\d+$/.test(t) ? "Literal" : "Identifier", value: t };
    };

    const parseMulDiv = (): ASTNode => {
      let node = parsePrimary();
      while (peek() === "*" || peek() === "/") {
        const op = consume();
        const right = parsePrimary();
        node = { type: "BinaryOp", value: op, left: node, right };
      }
      return node;
    };

    const parseAddSub = (): ASTNode => {
      let node = parseMulDiv();
      while (peek() === "+" || peek() === "-") {
        const op = consume();
        const right = parseMulDiv();
        node = { type: "BinaryOp", value: op, left: node, right };
      }
      return node;
    };

    try {
      if (tokens.length === 0) return { ast: { type: "Empty", value: "0" }, tokens };
      return { ast: parseAddSub(), tokens };
    } catch {
      return { ast: { type: "Error", value: "Invalid Syntax" }, tokens };
    }
  };

  const { ast, tokens } = buildAST(expr);

  // Evaluate arithmetic AST dynamically
  const evaluateAST = (node: ASTNode | null | undefined): number | null => {
    if (!node) return null;
    if (node.type === "Literal") {
      const val = parseFloat(node.value);
      return isNaN(val) ? null : val;
    }
    if (node.type === "Identifier") {
      if (node.value.toLowerCase() === "x") return varX;
      if (node.value.toLowerCase() === "y") return varY;
      return 1;
    }
    if (node.type === "BinaryOp") {
      const l = evaluateAST(node.left);
      const r = evaluateAST(node.right);
      if (l === null || r === null) return null;
      switch (node.value) {
        case "+":
          return l + r;
        case "-":
          return l - r;
        case "*":
          return l * r;
        case "/":
          return r === 0 ? null : Math.floor(l / r);
        default:
          return null;
      }
    }
    return null;
  };

  const evaluatedValue = evaluateAST(ast);
  const hasVariables = /[a-zA-Z]/.test(expr);

  // Render tree recursively
  const renderASTNode = (node: ASTNode, depth = 0): React.ReactNode => {
    const isOp = node.type === "BinaryOp";
    const isLit = node.type === "Literal";
    return (
      <div key={node.value + depth} className="flex flex-col items-center">
        <div
          className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold shadow-md transition-all ${
            isOp
              ? "border-amber-500/50 bg-amber-500/10 text-amber-300"
              : isLit
              ? "border-[var(--zen-cyan)] bg-[var(--zen-card)] text-[var(--zen-cyan)]"
              : "border-purple-500/50 bg-purple-500/10 text-purple-300"
          }`}
        >
          {node.type}: <span className="text-[var(--zen-snow)]">{node.value}</span>
        </div>
        {(node.left || node.right) && (
          <div className="flex gap-6 mt-4 relative pt-2 border-t border-[var(--zen-border)]">
            {node.left && renderASTNode(node.left, depth + 1)}
            {node.right && renderASTNode(node.right, depth + 1)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card text-[var(--zen-frost)]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[var(--zen-border)] pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
            COMPILERS & MEMORY // CCPROG1, CCPROG2, CSADPRG
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[var(--zen-snow)] tracking-wider uppercase">
            AST Syntax Tree & Pointer Memory Workbench
          </h4>
        </div>
        <div className="text-xs font-mono text-[var(--zen-cyan)] bg-[var(--zen-cyan)]/10 px-2.5 py-1 rounded border border-[var(--zen-cyan)]/30 font-semibold">
          Evaluated Result: {evaluatedValue !== null ? evaluatedValue : "Undefined"}
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-[10px] font-mono uppercase text-[var(--zen-ink-muted)]">Presets:</span>
        {PRESET_EXPRESSIONS.map((pr) => (
          <button
            key={pr.label}
            onClick={() => setExpr(pr.expr)}
            className="px-2.5 py-1 text-xs font-mono rounded border border-[var(--zen-border)] bg-[var(--zen-void)]/60 hover:border-[var(--zen-cyan)] hover:text-[var(--zen-snow)] transition-colors"
          >
            {pr.label}
          </button>
        ))}
      </div>

      {/* Expression Input Form */}
      <div className="mb-5">
        <label className="block text-xs font-mono text-[var(--zen-ink-muted)] uppercase mb-1">
          Source Arithmetic Expression (Enter your own formula)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            placeholder="e.g. (10 + 5) * 2 - 4 / 2"
            className="flex-1 px-3 py-2 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)] font-mono text-sm text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
          />
          <button
            onClick={() => setExpr("3 + 4 * 2")}
            className="px-3 py-2 rounded-lg border border-[var(--zen-border)] font-mono text-xs text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:border-[var(--zen-cyan)] transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Variable Sliders (if variables present) */}
      {hasVariables && (
        <div className="mb-5 p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/40 flex flex-wrap gap-4 items-center font-mono text-xs">
          <span className="text-[10px] text-[var(--zen-ink-muted)] uppercase">Variable Bindings:</span>
          <div className="flex items-center gap-2">
            <span className="text-[var(--zen-cyan)] font-bold">x:</span>
            <input
              type="number"
              value={varX}
              onChange={(e) => setVarX(parseInt(e.target.value, 10) || 0)}
              className="w-16 px-2 py-0.5 rounded border border-[var(--zen-border)] bg-[var(--zen-void)] text-center text-xs"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[var(--zen-cyan)] font-bold">y:</span>
            <input
              type="number"
              value={varY}
              onChange={(e) => setVarY(parseInt(e.target.value, 10) || 0)}
              className="w-16 px-2 py-0.5 rounded border border-[var(--zen-border)] bg-[var(--zen-void)] text-center text-xs"
            />
          </div>
        </div>
      )}

      {/* Lexer Token Stream */}
      <div className="mb-5 p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/30 font-mono text-xs flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] uppercase text-[var(--zen-ink-muted)] mr-2">Lexical Tokens:</span>
        {tokens.map((tok, idx) => (
          <span
            key={idx}
            className="px-2 py-0.5 rounded bg-[var(--zen-midnight)] border border-[var(--zen-border)] text-[var(--zen-snow)]"
          >
            {tok}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visual AST Hierarchy */}
        <div className="p-6 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 flex flex-col items-center justify-center min-h-[220px] overflow-x-auto">
          <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase block mb-4">
            Parsed Abstract Syntax Tree
          </span>
          {renderASTNode(ast)}
        </div>

        {/* Stack & Heap Frame Memory Model */}
        <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-[var(--zen-snow)] uppercase block mb-3">
              C Execution Stack & Heap Frame
            </span>
            <div className="space-y-2 font-mono text-xs">
              <div className="p-2.5 rounded bg-[var(--zen-midnight)] border border-emerald-500/30 flex justify-between">
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">0x7ffd9a44 [Stack Frame]</span>
                <span className="text-[var(--zen-snow)]">main() activation record</span>
              </div>
              <div className="p-2.5 rounded bg-[var(--zen-midnight)] border border-[var(--zen-border)] flex justify-between text-[11px]">
                <span className="text-[var(--zen-cyan)]">&res = 0x7ffd9a3c</span>
                <span className="font-semibold text-[var(--zen-snow)]">
                  int res = {evaluatedValue !== null ? evaluatedValue : "eval_error"}
                </span>
              </div>
              <div className="p-2.5 rounded bg-[var(--zen-midnight)] border border-[var(--zen-border)] flex justify-between text-[11px]">
                <span className="text-[var(--zen-cyan)]">&ptr = 0x7ffd9a34</span>
                <span>int* ptr -&gt; 0x55f89100 [Heap]</span>
              </div>
              <div className="p-2.5 rounded bg-[var(--zen-midnight)] border border-amber-500/30 flex justify-between text-[11px]">
                <span className="text-amber-700 dark:text-amber-400 font-bold">0x55f89100 [Heap Block]</span>
                <span className="font-semibold text-amber-300">
                  malloc(sizeof(int)) = {evaluatedValue !== null ? evaluatedValue : "eval_error"}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--zen-border)] text-[10px] font-mono text-[var(--zen-ink-muted)]">
            Expression evaluation directly synchronizes stack variable binding and heap dynamic allocation.
          </div>
        </div>
      </div>
    </div>
  );
}