import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  parseMCQSection,
  gradeMSQSelection,
  gradeInputAnswer,
  gradeBlankAnswer,
} from "../mcq-parser";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_ROOT = path.resolve(__dirname, "../../../content/Main Notes");

describe("parseMCQSection - Standard & Canvas-Style Question Types", () => {
  it("parses standard MCQs with CRLF endings, 2/4-space indents, code, and KaTeX", () => {
    const md = [
      "# Lecture Notes",
      "",
      "Body paragraph with $O(n \\log n)$.",
      "",
      "## Multiple Choice Questions",
      "",
      "1. What is the worst-case time complexity of Merge Sort?",
      "    - **A)** $O(n)$",
      "    - **B)** $O(n \\log n)$",
      "    - **C)** $O(n^2)$",
      "    - **D)** $O(1)$",
      "",
      "2. Which syscall spawns a new process in POSIX?",
      "  - **A.** `fork()`",
      "  - **B.** `execve()` only",
      "  - **C.** `malloc()`",
      "  - **D.** `waitpid()`",
      "",
      "### Answer Key & Explanations",
      "",
      "1. **B)** Merge sort divides recursively and merges linearly in $O(n \\log n)$.",
      "2. **A.** `fork()` clones the calling process in POSIX systems.",
      "",
      "## References & Navigation",
      "",
      "- **Previous Topic:** [[Sorting Basics]]",
    ].join("\r\n");

    const res = parseMCQSection(md, "CCDSALG/Merge Sort");
    assert.equal(res.hadAssessmentHeader, true);
    assert.equal(res.mcqItems.length, 2);

    assert.equal(res.mcqItems[0].type, "mcq");
    assert.equal(res.mcqItems[0].options.length, 4);
    assert.equal(res.mcqItems[0].answerKey, "B");
    assert.match(res.mcqItems[0].explanation, /\$O\(n \\log n\)\$/);

    assert.equal(res.mcqItems[1].type, "mcq");
    assert.equal(res.mcqItems[1].answerKey, "A");
    assert.doesNotMatch(res.mcqItems[1].explanation, /References & Navigation/);
    assert.match(res.articleContent, /## References & Navigation/);
    assert.doesNotMatch(res.articleContent, /## Multiple Choice Questions/);
  });

  it("parses [MSQ] multiple-select questions and grades unordered checkbox sets", () => {
    const md = `# Test
## 5. Comprehensive Practice Exam

1. [MSQ] Which of the following scheduling algorithms can cause starvation? (Select all that apply)
    - **A)** Round Robin
    - **B)** Shortest Job First (SJF)
    - **C)** Priority Scheduling without aging
    - **D)** First-Come, First-Served (FCFS)

---

### Answer Key

1. **B, C)** SJF and strict priority scheduling can indefinitely postpone long or low-priority processes without aging.

---

## References & Navigation
- **Related Notes:** [[CPU Scheduling]]
`;

    const res = parseMCQSection(md, "CSOPESY/[REV] Midterm Reviewer");
    assert.equal(res.mcqItems.length, 1);
    const q = res.mcqItems[0];
    assert.equal(q.type, "msq");
    assert.deepEqual(q.expectedKeys, ["B", "C"]);
    assert.equal(q.answerKey, "B, C");
    assert.equal(gradeMSQSelection(["C", "B"], q.expectedKeys!), true);
    assert.equal(gradeMSQSelection(["B"], q.expectedKeys!), false);
    assert.equal(gradeMSQSelection(["A", "B", "C"], q.expectedKeys!), false);
    assert.match(res.articleContent, /## References & Navigation/);
  });

  it("parses [INPUT] exact numeric/text solving with ±0.01 tolerance", () => {
    const md = `# Timing Analysis
## Multiple Choice Questions

1. [INPUT] Compute the average waiting time (in ms) for processes $P_1=6, P_2=8, P_3=7$ under SJF?

### Answer Key & Explanations

1. **[5.67; 17/3; 5.67 ms]** Total waiting time is $(0 + 6 + 11) = 17$, divided by $3$ equals $5.67\\text{ ms}$.

## References & Navigation
- **Next Topic:** [[Round Robin]]
`;

    const res = parseMCQSection(md, "CSOPESY/SJF");
    assert.equal(res.mcqItems.length, 1);
    const q = res.mcqItems[0];
    assert.equal(q.type, "input");
    assert.deepEqual(q.acceptedAnswers, ["5.67", "17/3", "5.67 ms"]);
    assert.equal(gradeInputAnswer("5.67", q.acceptedAnswers!), true);
    assert.equal(gradeInputAnswer("5.66", q.acceptedAnswers!), true);
    assert.equal(gradeInputAnswer("5.68", q.acceptedAnswers!), true);
    assert.equal(gradeInputAnswer("17/3", q.acceptedAnswers!), true);
    assert.equal(gradeInputAnswer("5.67 MS", q.acceptedAnswers!), true);
    assert.equal(gradeInputAnswer("5.70", q.acceptedAnswers!), false);
  });

  it("parses [BLANK] fill-in-the-blanks with multi-line GFM tables intact", () => {
    const md = `# Boolean Logic
## Multiple Choice Questions

1. [BLANK] Complete the truth table for NAND gate $(A \\cdot B)'$:

| $A$ | $B$ | $(A \\cdot B)'$ | $A + B$ |
| :--- | :--- | :--- | :--- |
| 0 | 0 | {{1}} | 0 |
| 1 | 1 | {{2}} | 1 |

### Answer Key & Explanations

1. **[1: 1/true; 2: 0/false]** NAND returns $1$ when inputs are $0,0$ and $0$ only when all inputs are $1$.

## References & Navigation
- **Previous Topic:** [[Logic Gates]]
`;

    const res = parseMCQSection(md, "CSARCH1/Gates");
    assert.equal(res.mcqItems.length, 1);
    const q = res.mcqItems[0];
    assert.equal(q.type, "blank");
    assert.equal(q.options.length, 0);
    assert.match(q.question, /\| \$A\$ \| \$B\$ \|/);
    assert.match(q.question, /\| 0 \| 0 \| \{\{1\}\} \| 0 \|/);
    assert.deepEqual(q.blanksMap, { "1": ["1", "true"], "2": ["0", "false"] });

    const pass = gradeBlankAnswer({ "1": "TRUE", "2": "0" }, q.blanksMap!);
    assert.equal(pass.allCorrect, true);
    assert.deepEqual(pass.perBlank, { "1": true, "2": true });

    const partial = gradeBlankAnswer({ "1": "1", "2": "1" }, q.blanksMap!);
    assert.equal(partial.allCorrect, false);
    assert.deepEqual(partial.perBlank, { "1": true, "2": false });
  });

  it("emits [MCQ_PARSE_FAILURE] warning when header exists but 0 valid items parse", () => {
    const warnings: string[] = [];
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warnings.push(args.map(String).join(" "));
    };

    try {
      const md = `# Empty Quiz\n## Multiple Choice Questions\n\nNo formatted questions here.\n`;
      const res = parseMCQSection(md, "TEST/Malformed");
      assert.equal(res.hadAssessmentHeader, true);
      assert.equal(res.mcqItems.length, 0);
      assert.equal(warnings.length, 1);
      assert.match(warnings[0], /\[MCQ_PARSE_FAILURE\]: TEST\/Malformed/);
    } finally {
      console.warn = origWarn;
    }
  });
});

describe("Real Vault Smoke Test", () => {
  it("parses every assessment section across all vault markdown files with 0 [MCQ_PARSE_FAILURE] warnings", async () => {
    const mdFiles: string[] = [];

    async function collect(dir: string) {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.name.startsWith(".")) continue;
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          await collect(full);
        } else if (entry.isFile() && entry.name.toLowerCase().endsWith(".md")) {
          mdFiles.push(full);
        }
      }
    }

    await collect(CONTENT_ROOT);
    assert.ok(mdFiles.length > 500, `Expected >500 markdown files, found ${mdFiles.length}`);

    const failures: string[] = [];
    let notesWithAssessments = 0;
    let totalItems = 0;

    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      const msg = args.map(String).join(" ");
      if (msg.includes("[MCQ_PARSE_FAILURE]")) {
        failures.push(msg);
      }
    };

    try {
      for (const filePath of mdFiles) {
        const raw = await fs.readFile(filePath, "utf-8");
        const rel = path.relative(CONTENT_ROOT, filePath);
        const res = parseMCQSection(raw, rel);
        if (res.hadAssessmentHeader) {
          notesWithAssessments++;
          totalItems += res.mcqItems.length;
        }
      }
    } finally {
      console.warn = origWarn;
    }

    assert.deepEqual(failures, [], `Found MCQ parse failures: ${failures.join("; ")}`);
    assert.ok(notesWithAssessments > 400, `Expected >400 notes with assessments, got ${notesWithAssessments}`);
    assert.ok(totalItems > 3000, `Expected >3000 parsed assessment items, got ${totalItems}`);
  });
});
