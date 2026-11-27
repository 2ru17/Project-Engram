#!/usr/bin/env node

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const CONTENT_ALLOWLIST_ROOT = path.join(PROJECT_ROOT, "content");
const CONTENT_ROOT = path.join(CONTENT_ALLOWLIST_ROOT, "Main Notes");
const SRC_ROOT = path.join(PROJECT_ROOT, "src");
const CONCURRENCY_LIMIT = 16;

const UTIL_FOLDER_NAMES = new Set([
  "Resources",
  "Exercises",
  "Assessments",
  "Problem Sets",
  "Exams",
  "Finals Review",
  "Reviewers and Exams",
]);

const VALID_TYPES = new Set([
  "note",
  "reviewer",
  "problem_set",
  "problem-set",
  "problem-set-solution",
  "exercise",
  "quiz",
  "handout",
  "answer_key",
]);

const VALID_STATUSES = new Set(["completed", "complete", "solved"]);

const DUMMY_PATTERNS = [
  /Option A is correct because/i,
  /which of the following best applies/i,
  /This has no practical application in the real world/i,
  /It is merely a theoretical abstraction/i,
  /A deeper look into .* reveals critical implementation details/i,
  /A key characteristic of .* must be considered during evaluation/i,
  /The framework is entirely experimental and unstable/i,
  /It applies exclusively to outdated architectural models/i,
  /This concept is heavily featured in the architecture of/i,
  /This statement was proven false in the 1990s/i,
  /It is not covered by the scope of this topic/i,
  /Understanding .* requires a comprehensive grasp of the material/i,
  /A critical property of .* is its application in computer science/i,
  /The main topic of this note is/i,
];

const EMOJI_REGEX = /[\u{1F300}-\u{1FAFF}\u{2B50}]/u;

// --- Deterministic Assessment Parser (mirrored from src/lib/mcq-parser.ts) ---

const ASSESSMENT_START_REGEX =
  /^##+\s*(?:Multiple Choice Questions|5\.\s*Comprehensive Practice Exam)\b[^\n]*$/i;
const REFERENCES_HEADER_REGEX = /^##+\s*References\s*&\s*Navigation\b/i;
const H2_HEADER_REGEX = /^##\s+(?!#)/;
const ANSWER_KEY_HEADER_REGEX =
  /^###+\s*(?:\*\*)?(?:Detailed\s+)?Answer Key(?:\s*(?:&|and)\s*Explanations)?(?:\*\*)?[:\s]*$/i;
const FENCE_REGEX = /^\s*(`{3,}|~{3,})/;

function updateFenceState(line, activeFence) {
  const match = line.match(FENCE_REGEX);
  if (!match) return { nextFence: activeFence, isFenceToggle: false };
  const marker = match[1];
  if (!activeFence) {
    return { nextFence: marker, isFenceToggle: true };
  }
  if (line.trim().startsWith(activeFence)) {
    return { nextFence: null, isFenceToggle: true };
  }
  return { nextFence: activeFence, isFenceToggle: false };
}

function findAssessmentRange(lines) {
  let activeFence = null;
  let startLine = -1;

  for (let i = 0; i < lines.length; i++) {
    const { nextFence, isFenceToggle } = updateFenceState(lines[i], activeFence);
    activeFence = nextFence;
    if (isFenceToggle || activeFence) continue;

    if (ASSESSMENT_START_REGEX.test(lines[i])) {
      startLine = i;
      break;
    }
  }

  if (startLine === -1) return null;

  let endLine = lines.length;
  let seenAnswerKey = false;
  activeFence = null;

  for (let i = startLine + 1; i < lines.length; i++) {
    const line = lines[i];
    const { nextFence, isFenceToggle } = updateFenceState(line, activeFence);
    activeFence = nextFence;
    if (isFenceToggle || activeFence) continue;

    if (ANSWER_KEY_HEADER_REGEX.test(line)) {
      seenAnswerKey = true;
      continue;
    }

    if (REFERENCES_HEADER_REGEX.test(line) || H2_HEADER_REGEX.test(line)) {
      endLine = i;
      break;
    }

    if (seenAnswerKey && /^---\s*$/.test(line)) {
      let hasMoreAnswerKeys = false;
      for (let j = i + 1; j < lines.length; j++) {
        if (REFERENCES_HEADER_REGEX.test(lines[j]) || H2_HEADER_REGEX.test(lines[j])) {
          break;
        }
        if (/^\d+\.\s+\*\*/.test(lines[j])) {
          hasMoreAnswerKeys = true;
          break;
        }
      }
      if (!hasMoreAnswerKeys) {
        endLine = i;
        break;
      }
    }
  }

  return {
    startLine,
    endLine,
    headerLine: lines[startLine],
    sectionLines: lines.slice(startLine + 1, endLine),
  };
}

function splitQuestionsAndAnswers(sectionLines) {
  let activeFence = null;
  let splitIdx = -1;

  for (let i = 0; i < sectionLines.length; i++) {
    const { nextFence, isFenceToggle } = updateFenceState(sectionLines[i], activeFence);
    activeFence = nextFence;
    if (isFenceToggle || activeFence) continue;

    if (ANSWER_KEY_HEADER_REGEX.test(sectionLines[i])) {
      splitIdx = i;
      break;
    }
  }

  if (splitIdx === -1) {
    return { questionLines: sectionLines, answerLines: [], hasAnswerKeyHeader: false };
  }

  const questionLines = sectionLines.slice(0, splitIdx);
  while (
    questionLines.length > 0 &&
    (/^\s*$/.test(questionLines[questionLines.length - 1]) ||
      /^---\s*$/.test(questionLines[questionLines.length - 1]))
  ) {
    questionLines.pop();
  }

  return {
    questionLines,
    answerLines: sectionLines.slice(splitIdx + 1),
    hasAnswerKeyHeader: true,
  };
}

function parseAnswerEntryBody(body) {
  const trimmed = body.trim();
  if (!trimmed) return null;

  const bracketMatch = trimmed.match(/^\*\*\[([^\]]+)\][).]*\*\*[.:)]*\s*([\s\S]*)$/);
  if (bracketMatch) {
    return {
      kind: "bracket",
      letters: [],
      bracketInner: bracketMatch[1].trim(),
      explanation: (bracketMatch[2] || "").trim(),
    };
  }

  const lettersMatch = trimmed.match(
    /^\*\*([A-D](?:\s*,\s*[A-D])*)[).]*\*\*[.:)]*\s*([\s\S]*)$/
  );
  if (lettersMatch) {
    const letters = Array.from(
      new Set(
        lettersMatch[1]
          .split(",")
          .map((s) => s.trim().toUpperCase())
          .filter(Boolean)
      )
    );
    return {
      kind: "letters",
      letters,
      bracketInner: "",
      explanation: (lettersMatch[2] || "").trim(),
    };
  }

  const legacyBoldMatch = trimmed.match(/^\*\*([A-D])\.\s+[^*]+\*\*[.:—–-]*\s*([\s\S]*)$/);
  if (legacyBoldMatch) {
    return {
      kind: "letters",
      letters: [legacyBoldMatch[1].toUpperCase()],
      bracketInner: "",
      explanation: (legacyBoldMatch[2] || "").trim(),
    };
  }

  return null;
}

function parseAnswerKeyLines(answerLines) {
  const answersMap = new Map();
  const rawEntries = [];
  let current = null;
  let activeFence = null;

  for (const line of answerLines) {
    const { nextFence, isFenceToggle } = updateFenceState(line, activeFence);
    activeFence = nextFence;

    if (!activeFence && !isFenceToggle) {
      const startMatch = line.match(/^(\d+)\.\s+(.*)$/);
      if (startMatch && startMatch[2].trim().startsWith("**")) {
        if (current) rawEntries.push(current);
        current = { id: parseInt(startMatch[1], 10), lines: [startMatch[2]] };
        continue;
      }
    }

    if (current) {
      current.lines.push(line);
    }
  }
  if (current) rawEntries.push(current);

  for (const entry of rawEntries) {
    const parsed = parseAnswerEntryBody(entry.lines.join("\n"));
    if (parsed) {
      answersMap.set(entry.id, parsed);
    }
  }

  return answersMap;
}

function sliceQuestionBlocks(questionLines) {
  const blocks = [];
  let current = null;
  let activeFence = null;

  for (const line of questionLines) {
    const { nextFence, isFenceToggle } = updateFenceState(line, activeFence);
    activeFence = nextFence;

    if (!activeFence && !isFenceToggle) {
      const qStart = line.match(/^(\d+)\.\s+(?:\[(MCQ|MSQ|INPUT|BLANK)\]\s*)?(.*)$/i);
      if (qStart) {
        if (current) blocks.push(current);
        current = {
          id: parseInt(qStart[1], 10),
          explicitTag: qStart[2]?.toLowerCase(),
          bodyLines: [qStart[3]],
        };
        continue;
      }
    }

    if (current) {
      current.bodyLines.push(line);
    }
  }

  if (current) blocks.push(current);
  return blocks;
}

function extractOptionsFromBlock(bodyLines) {
  const optStartRegex = /^[ \t]{0,6}[-*]\s+\*\*([A-D])[).]*\*\*\s*(.*)$/;
  let activeFence = null;
  let firstOptionIdx = -1;
  const optionEntries = [];
  let currentOpt = null;

  for (let i = 0; i < bodyLines.length; i++) {
    const line = bodyLines[i];
    const { nextFence, isFenceToggle } = updateFenceState(line, activeFence);
    activeFence = nextFence;

    if (!activeFence && !isFenceToggle) {
      const optMatch = line.match(optStartRegex);
      if (optMatch) {
        if (firstOptionIdx === -1) firstOptionIdx = i;
        if (currentOpt) optionEntries.push(currentOpt);
        currentOpt = {
          key: optMatch[1].toUpperCase(),
          lines: [optMatch[2]],
        };
        continue;
      }
    }

    if (currentOpt) {
      currentOpt.lines.push(activeFence ? line : line.replace(/^[ \t]{2,8}/, ""));
    }
  }

  if (currentOpt) optionEntries.push(currentOpt);

  if (firstOptionIdx === -1) {
    return {
      stem: bodyLines.join("\n").trim(),
      options: [],
    };
  }

  return {
    stem: bodyLines.slice(0, firstOptionIdx).join("\n").trim(),
    options: optionEntries.map((opt) => ({
      key: opt.key,
      text: opt.lines.join("\n").trim(),
    })),
  };
}

function parseBlanksMap(bracketInner) {
  const map = {};
  const pairs = bracketInner
    .split(/\s*[;|]\s*/)
    .map((p) => p.trim())
    .filter(Boolean);

  for (const pair of pairs) {
    const m = pair.match(/^(\d+)\s*[:=]\s*(.+)$/);
    if (!m) continue;
    const blankId = m[1].trim();
    const synonyms = m[2]
      .split("/")
      .map((s) => s.trim())
      .filter(Boolean);
    if (synonyms.length > 0) {
      map[blankId] = synonyms;
    }
  }
  return map;
}

function parseMCQSection(rawContent) {
  const normalized = rawContent.replace(/\r\n?/g, "\n").replace(/\0/g, "");
  const lines = normalized.split("\n");
  const range = findAssessmentRange(lines);

  if (!range) {
    return {
      articleContent: normalized,
      mcqItems: [],
      hadAssessmentHeader: false,
      hasAnswerKeyHeader: false,
      questionBlockCount: 0,
      answerKeyCount: 0,
    };
  }

  const beforeLines = lines.slice(0, range.startLine);
  const afterLines = lines.slice(range.endLine);

  while (beforeLines.length > 0 && /^\s*$/.test(beforeLines[beforeLines.length - 1])) {
    beforeLines.pop();
  }
  while (afterLines.length > 0 && /^\s*$/.test(afterLines[0])) {
    afterLines.shift();
  }

  const articleContent =
    afterLines.length > 0
      ? `${beforeLines.join("\n")}\n\n${afterLines.join("\n")}`
      : beforeLines.join("\n");

  const { questionLines, answerLines, hasAnswerKeyHeader } = splitQuestionsAndAnswers(
    range.sectionLines
  );
  const answersMap = parseAnswerKeyLines(answerLines);
  const questionBlocks = sliceQuestionBlocks(questionLines);
  const mcqItems = [];

  for (const qBlock of questionBlocks) {
    const rawBody = qBlock.bodyLines.join("\n").trim();
    if (!rawBody) continue;

    const { stem, options } = extractOptionsFromBlock(qBlock.bodyLines);
    const answerEntry = answersMap.get(qBlock.id);

    let resolvedType;
    if (qBlock.explicitTag) {
      resolvedType = qBlock.explicitTag;
    } else if (options.length === 0) {
      resolvedType = /\{\{\d+\}\}/.test(rawBody) ? "blank" : "input";
    } else if (answerEntry?.kind === "letters" && answerEntry.letters.length > 1) {
      resolvedType = "msq";
    } else {
      resolvedType = "mcq";
    }

    const explanation =
      answerEntry?.explanation || "No explicit explanation recorded.";

    if (resolvedType === "input") {
      const rawBracket = answerEntry?.bracketInner || "";
      const acceptedAnswers = rawBracket
        .split(/\s*[;|]\s*/)
        .map((s) => s.trim())
        .filter(Boolean);
      if (acceptedAnswers.length === 0) continue;

      mcqItems.push({
        id: qBlock.id,
        type: "input",
        question: rawBody,
        options: [],
        answerKey: `[${acceptedAnswers.join("; ")}]`,
        acceptedAnswers,
        explanation,
      });
      continue;
    }

    if (resolvedType === "blank") {
      const rawBracket = answerEntry?.bracketInner || "";
      const blanksMap = parseBlanksMap(rawBracket);
      if (Object.keys(blanksMap).length === 0) continue;

      mcqItems.push({
        id: qBlock.id,
        type: "blank",
        question: rawBody,
        options: [],
        answerKey: `[${rawBracket}]`,
        blanksMap,
        explanation,
      });
      continue;
    }

    if (options.length === 0) continue;

    if (resolvedType === "msq") {
      const expectedKeys =
        answerEntry?.kind === "letters" && answerEntry.letters.length > 0
          ? answerEntry.letters
          : ["A"];
      mcqItems.push({
        id: qBlock.id,
        type: "msq",
        question: stem,
        options,
        answerKey: expectedKeys.join(", "),
        expectedKeys,
        explanation,
      });
      continue;
    }

    const singleKey =
      answerEntry?.kind === "letters" && answerEntry.letters.length > 0
        ? answerEntry.letters[0]
        : "A";
    mcqItems.push({
      id: qBlock.id,
      type: "mcq",
      question: stem,
      options,
      answerKey: singleKey,
      explanation,
    });
  }

  return {
    articleContent,
    mcqItems,
    hadAssessmentHeader: true,
    hasAnswerKeyHeader,
    questionBlockCount: questionBlocks.length,
    answerKeyCount: answersMap.size,
  };
}

function parseNumericScalar(raw) {
  const cleaned = raw.trim().replace(/,/g, "");
  if (!cleaned) return null;

  const fractionMatch = cleaned.match(
    /^([+-]?(?:\d+\.?\d*|\.\d+))\s*\/\s*([+-]?(?:\d+\.?\d*|\.\d+))$/
  );
  if (fractionMatch) {
    const num = Number(fractionMatch[1]);
    const den = Number(fractionMatch[2]);
    if (Number.isFinite(num) && Number.isFinite(den) && Math.abs(den) > 1e-12) {
      return num / den;
    }
    return null;
  }

  if (/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(cleaned)) {
    const val = Number(cleaned);
    return Number.isFinite(val) ? val : null;
  }

  return null;
}

function splitNumberAndUnit(raw) {
  const m = raw
    .trim()
    .match(
      /^([+-]?(?:\d+(?:,\d{3})*\.?\d*|\.\d+)(?:\s*\/\s*[+-]?(?:\d+\.?\d*|\.\d+))?)\s+([a-zA-Z%/°]+.*)$/
    );
  if (!m) return null;
  const num = parseNumericScalar(m[1]);
  if (num === null) return null;
  return { num, unit: m[2].trim().replace(/\s+/g, " ").toLowerCase() };
}

function gradeInputAnswer(userInput, acceptedAnswers) {
  const normalizedUser = userInput.trim().replace(/\s+/g, " ").toLowerCase();
  if (!normalizedUser || acceptedAnswers.length === 0) return false;

  const userScalar = parseNumericScalar(normalizedUser);
  const userNumUnit = userScalar === null ? splitNumberAndUnit(normalizedUser) : null;

  for (const accepted of acceptedAnswers) {
    const normalizedAcc = accepted.trim().replace(/\s+/g, " ").toLowerCase();
    if (!normalizedAcc) continue;

    if (normalizedUser === normalizedAcc) return true;

    const accScalar = parseNumericScalar(normalizedAcc);
    if (userScalar !== null && accScalar !== null) {
      if (Math.abs(userScalar - accScalar) <= 0.01 + 1e-9) return true;
    }

    if (userNumUnit) {
      const accNumUnit = splitNumberAndUnit(normalizedAcc);
      if (
        accNumUnit &&
        userNumUnit.unit === accNumUnit.unit &&
        Math.abs(userNumUnit.num - accNumUnit.num) <= 0.01 + 1e-9
      ) {
        return true;
      }
    }
  }

  return false;
}

function gradeMSQSelection(selectedKeys, expectedKeys) {
  const normSel = Array.from(new Set(selectedKeys.map((k) => k.trim().toUpperCase()))).sort();
  const normExp = Array.from(new Set(expectedKeys.map((k) => k.trim().toUpperCase()))).sort();
  if (normExp.length === 0 || normSel.length !== normExp.length) return false;
  return normSel.every((k, idx) => k === normExp[idx]);
}

function gradeBlankAnswer(userBlanks, blanksMap) {
  const ids = Object.keys(blanksMap);
  const perBlank = {};
  if (ids.length === 0) return { allCorrect: false, perBlank };

  let allCorrect = true;
  for (const id of ids) {
    const ok = gradeInputAnswer(userBlanks[id] || "", blanksMap[id] || []);
    perBlank[id] = ok;
    if (!ok) allCorrect = false;
  }
  return { allCorrect, perBlank };
}

function runParserSelfTests() {
  // 1. Standard MCQ + CRLF + navigation preservation
  const mcqDoc = [
    "# Lecture",
    "",
    "## Multiple Choice Questions",
    "",
    "1. What is the worst-case time complexity of Merge Sort?",
    "    - **A)** $O(n)$",
    "    - **B)** $O(n \\log n)$",
    "    - **C)** $O(n^2)$",
    "    - **D)** $O(1)$",
    "",
    "### Answer Key & Explanations",
    "",
    "1. **B)** Merge sort divides recursively and merges linearly in $O(n \\log n)$.",
    "",
    "## References & Navigation",
    "",
    "- **Previous Topic:** [[Sorting Basics]]",
  ].join("\r\n");

  const mcqRes = parseMCQSection(mcqDoc);
  assert.equal(mcqRes.hadAssessmentHeader, true);
  assert.equal(mcqRes.mcqItems.length, 1);
  assert.equal(mcqRes.mcqItems[0].type, "mcq");
  assert.equal(mcqRes.mcqItems[0].options.length, 4);
  assert.equal(mcqRes.mcqItems[0].answerKey, "B");
  assert.match(mcqRes.articleContent, /## References & Navigation/);
  assert.doesNotMatch(mcqRes.articleContent, /## Multiple Choice Questions/);

  // 2. [MSQ] multi-select checkboxes
  const msqDoc = `# Test
## 5. Comprehensive Practice Exam

1. [MSQ] Which algorithms can cause starvation?
    - **A)** Round Robin
    - **B)** Shortest Job First
    - **C)** Priority Scheduling without aging
    - **D)** FCFS

### Answer Key

1. **B, C)** SJF and priority scheduling can starve low-priority tasks.

## References & Navigation
- **Related Notes:** [[CPU Scheduling]]
`;
  const msqRes = parseMCQSection(msqDoc);
  assert.equal(msqRes.mcqItems.length, 1);
  assert.equal(msqRes.mcqItems[0].type, "msq");
  assert.deepEqual(msqRes.mcqItems[0].expectedKeys, ["B", "C"]);
  assert.equal(gradeMSQSelection(["C", "B"], msqRes.mcqItems[0].expectedKeys), true);
  assert.equal(gradeMSQSelection(["B"], msqRes.mcqItems[0].expectedKeys), false);

  // 3. [INPUT] exact numeric / text solving
  const inputDoc = `# Timing
## Multiple Choice Questions

1. [INPUT] Average waiting time (ms) for $(0 + 6 + 11)/3$?

### Answer Key & Explanations

1. **[5.67; 17/3; 5.67 ms]** Total waiting time is $17$, divided by $3$ is $5.67\\text{ ms}$.
`;
  const inputRes = parseMCQSection(inputDoc);
  assert.equal(inputRes.mcqItems.length, 1);
  assert.equal(inputRes.mcqItems[0].type, "input");
  assert.equal(gradeInputAnswer("5.66", inputRes.mcqItems[0].acceptedAnswers), true);
  assert.equal(gradeInputAnswer("17/3", inputRes.mcqItems[0].acceptedAnswers), true);
  assert.equal(gradeInputAnswer("5.67 MS", inputRes.mcqItems[0].acceptedAnswers), true);
  assert.equal(gradeInputAnswer("5.70", inputRes.mcqItems[0].acceptedAnswers), false);

  // 4. [BLANK] multi-line GFM table preservation
  const blankDoc = `# Logic
## Multiple Choice Questions

1. [BLANK] Complete the truth table:

| $A$ | $B$ | $(A \\cdot B)'$ |
| :--- | :--- | :--- |
| 0 | 0 | {{1}} |
| 1 | 1 | {{2}} |

### Answer Key & Explanations

1. **[1: 1/true; 2: 0/false]** NAND outputs 0 only when all inputs are 1.
`;
  const blankRes = parseMCQSection(blankDoc);
  assert.equal(blankRes.mcqItems.length, 1);
  assert.equal(blankRes.mcqItems[0].type, "blank");
  assert.match(blankRes.mcqItems[0].question, /\| 0 \| 0 \| \{\{1\}\} \|/);
  assert.deepEqual(blankRes.mcqItems[0].blanksMap, { "1": ["1", "true"], "2": ["0", "false"] });
  assert.equal(gradeBlankAnswer({ "1": "TRUE", "2": "0" }, blankRes.mcqItems[0].blanksMap).allCorrect, true);
  assert.equal(gradeBlankAnswer({ "1": "1", "2": "1" }, blankRes.mcqItems[0].blanksMap).allCorrect, false);

  // 5. Empty assessment header detection
  const malformedRes = parseMCQSection("# Bad\n## Multiple Choice Questions\n\nEmpty.\n");
  assert.equal(malformedRes.hadAssessmentHeader, true);
  assert.equal(malformedRes.mcqItems.length, 0);
}

/**
 * Recursively finds any file or symlink inside `rootDir` that is neither `.md` nor `.gitkeep`.
 */
async function findDisallowedContentFiles(rootDir) {
  const disallowed = [];

  async function recurse(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const subDirs = [];

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        subDirs.push(fullPath);
      } else if (entry.isFile() || entry.isSymbolicLink()) {
        if (entry.name !== ".gitkeep" && !entry.name.endsWith(".md")) {
          disallowed.push(path.relative(rootDir, fullPath).split(path.sep).join("/"));
        }
      }
    }

    if (subDirs.length > 0) {
      await Promise.all(subDirs.map((sub) => recurse(sub)));
    }
  }

  await recurse(rootDir);
  return disallowed.sort();
}

/**
 * Verifies Gate 0 content allowlist detection against Markdown, .gitkeep, binary, and hidden files.
 */
async function runContentAllowlistSelfTests() {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "engram-allowlist-"));
  try {
    await fs.mkdir(path.join(tmpDir, "Main Notes", "CSALGCM", "Resources"), { recursive: true });
    await fs.writeFile(path.join(tmpDir, ".gitkeep"), "", "utf8");
    await fs.writeFile(path.join(tmpDir, "Main Notes", "CSALGCM", "Valid Note.md"), "# Ok\n", "utf8");
    await fs.writeFile(path.join(tmpDir, "Main Notes", "CSALGCM", "Resources", "Leaked.pdf"), "pdf", "utf8");
    await fs.writeFile(path.join(tmpDir, "Main Notes", "CSALGCM", "Resources", "Slide.pptx"), "pptx", "utf8");
    await fs.writeFile(path.join(tmpDir, "Main Notes", "CSALGCM", "UPPER.MD"), "# Bad ext\n", "utf8");
    await fs.writeFile(path.join(tmpDir, "Main Notes", ".DS_Store"), "junk", "utf8");

    const found = await findDisallowedContentFiles(tmpDir);
    assert.deepEqual(found, [
      "Main Notes/.DS_Store",
      "Main Notes/CSALGCM/Resources/Leaked.pdf",
      "Main Notes/CSALGCM/Resources/Slide.pptx",
      "Main Notes/CSALGCM/UPPER.MD",
    ]);
  } finally {
    await fs.rm(tmpDir, { recursive: true, force: true });
  }
}

// --- Async Directory Traversal & Bounded Concurrency ---

async function walkTree(rootDir) {
  const dirs = [];
  const files = [];

  async function recurse(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const subDirs = [];

    for (const entry of entries) {
      if (entry.name.startsWith(".")) continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        dirs.push(fullPath);
        subDirs.push(fullPath);
      } else if (entry.isFile()) {
        files.push(fullPath);
      }
    }

    if (subDirs.length > 0) {
      await Promise.all(subDirs.map((sub) => recurse(sub)));
    }
  }

  await recurse(rootDir);
  return { dirs, files };
}

async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;

  async function runNext() {
    while (cursor < items.length) {
      const idx = cursor++;
      results[idx] = await worker(items[idx], idx);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () => runNext());
  await Promise.all(workers);
  return results;
}

function classifyNote(relPath) {
  const segments = relPath.split(path.sep);
  const base = path.basename(relPath);
  const isBracketed = /^\[(EX|PS|HO|REV|QZ|ANS)\]/i.test(base);
  const isInUtilFolder = segments
    .slice(0, -1)
    .some((s) => UTIL_FOLDER_NAMES.has(s) || /^\[(EX|PS|HO|REV|QZ|ANS)\]/i.test(s));
  const isRev = /^\[REV\]/i.test(base);
  const isQzPs = /^\[(QZ|PS)\]/i.test(base);
  const isStandard = !isBracketed && !isInUtilFolder;
  return { isStandard, isRev, isQzPs };
}

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) {
      fields[kv[1].trim().toLowerCase()] = kv[2].trim().replace(/^["']|["']$/g, "");
    }
  }
  return fields;
}

function validateMermaidBlocks(content, relPath) {
  const errors = [];
  const validHeaders =
    /^(?:flowchart|graph|sequenceDiagram|stateDiagram(?:-v2)?|classDiagram|erDiagram|xychart-beta)\b/;
  const regex = /```mermaid\s*\r?\n([\s\S]*?)\r?\n```/g;
  let match;
  let blockIdx = 0;

  while ((match = regex.exec(content)) !== null) {
    blockIdx++;
    const lines = match[1]
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("%%"));

    if (lines.length === 0 || !validHeaders.test(lines[0])) {
      errors.push(
        `[Gate 5] ${relPath}: Mermaid block #${blockIdx} has unsupported or missing diagram header (${lines[0] || "empty"})`
      );
      continue;
    }

    if (/^(?:flowchart|graph)\b/.test(lines[0])) {
      for (const line of lines.slice(1)) {
        if (/^(?:subgraph|end|style|classDef|class|click|linkStyle|direction)\b/.test(line)) {
          continue;
        }
        const rectMatches = line.matchAll(/\b[A-Za-z0-9_]+\[(?![\"(\[\/\\])([^\]\n]+)\]/g);
        for (const rm of rectMatches) {
          if (/[()\[\]&:]/.test(rm[1])) {
            errors.push(
              `[Gate 5] ${relPath}: Mermaid block #${blockIdx} has unquoted special characters in node label [${rm[1]}]`
            );
          }
        }
      }
    }
  }

  return errors;
}

async function runGate1Directories(dirs, allFiles) {
  const errors = [];
  let malformedFolders = 0;
  let hollowModules = 0;

  await mapWithConcurrency(dirs, CONCURRENCY_LIMIT, async (dirPath) => {
    const rel = path.relative(CONTENT_ROOT, dirPath);
    const base = path.basename(dirPath);
    const parentBase = path.basename(path.dirname(dirPath));

    if (/^(?:Module|Ch|Chapter)\s*\d+/i.test(base) && !/^(?:Module|Ch|Chapter)\s+\d+\s+-\s+\S/i.test(base)) {
      malformedFolders++;
      errors.push(`[Gate 1] Malformed module/chapter folder hyphenation: "${rel}"`);
    }

    if (base.toLowerCase() === parentBase.toLowerCase()) {
      errors.push(`[Gate 1] Duplicate nested directory: "${rel}"`);
    }

    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    if (["Resources", "Exercises", "Assessments"].includes(base) && entries.length === 0) {
      errors.push(`[Gate 1] Empty utility subfolder: "${rel}"`);
    }

    if (/^(?:Module|Ch|Chapter)\s+\d+\s+-\s+/i.test(base)) {
      const rootStandardNotes = entries.filter(
        (e) => e.isFile() && e.name.endsWith(".md") && !e.name.startsWith("[")
      );
      if (rootStandardNotes.length === 0) {
        hollowModules++;
        errors.push(`[Gate 1] Hollow Module (0 root standard .md notes): "${rel}"`);
      }
    }
  });

  await mapWithConcurrency(allFiles, CONCURRENCY_LIMIT, async (filePath) => {
    if (!filePath.endsWith(".md") && !filePath.endsWith(".txt")) return;
    const st = await fs.stat(filePath);
    if (st.size > 102400) {
      const rel = path.relative(CONTENT_ROOT, filePath);
      errors.push(`[Gate 1] Dump file exceeds 100 KB (${st.size} bytes): "${rel}"`);
    }
  });

  return { errors, malformedFolders, hollowModules };
}

async function runGate6CodebaseInvariants() {
  const errors = [];
  const { files } = await walkTree(SRC_ROOT);
  const codeFiles = files.filter((f) => /\.(ts|tsx|js|jsx|mjs)$/.test(f));

  const domPurifyChecked = {
    "lib/sanitize.ts": false,
    "components/MarkdownRender.tsx": false,
    "components/MermaidBlock.tsx": false,
    "components/simulators/shared/SimulatorWorkbenchShell.tsx": false,
  };

  await mapWithConcurrency(codeFiles, CONCURRENCY_LIMIT, async (filePath) => {
    const rel = path.relative(SRC_ROOT, filePath).split(path.sep).join("/");
    const content = await fs.readFile(filePath, "utf8");
    const lines = content.split(/\r?\n/);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      // Ignore string-literal security demo payloads in AppSecSanitizerWorkbench.tsx
      const strippedStrings = line.replace(/(["'`])(?:\\.|(?!\1).)*\1/g, '""');
      if (/\b(?:readFileSync|readdirSync|statSync)\s*\(/.test(strippedStrings)) {
        errors.push(`[Gate 6] Synchronous fs call in src/${rel}:${i + 1}`);
      }
    }

    if (
      /(?:from|import)\s+["'](?:isomorphic-dompurify|jsdom)["']|require\s*\(\s*["'](?:isomorphic-dompurify|jsdom)["']\s*\)/.test(
        content,
      )
    ) {
      errors.push(`[Gate 6] Forbidden SSR DOM dependency (isomorphic-dompurify/jsdom) in src/${rel}`);
    }

    if (rel in domPurifyChecked) {
      domPurifyChecked[rel] =
        rel === "lib/sanitize.ts"
          ? /DOMPurify\.sanitize\s*\(/.test(content)
          : /(?:DOMPurify\.sanitize|sanitizeHtml)\s*\(/.test(content);
    }

    if (/dangerouslySetInnerHTML/.test(content)) {
      const hasDomPurify = /(?:DOMPurify\.sanitize|sanitizeHtml)\s*\(/.test(content);
      const isSafeStaticOrJsonLd =
        rel === "app/layout.tsx" ||
        rel === "app/not-found.tsx" ||
        (rel === "app/notes/[...slug]/page.tsx" && /JSON\.stringify\(jsonLd\)/.test(content));

      if (!hasDomPurify && !isSafeStaticOrJsonLd) {
        errors.push(`[Gate 6] Unsanitized dangerouslySetInnerHTML in src/${rel}`);
      }
    }
  });

  for (const [rel, ok] of Object.entries(domPurifyChecked)) {
    if (!ok) {
      errors.push(`[Gate 6] Missing sanitization guard in src/${rel}`);
    }
  }

  return errors;
}

async function syncAndVerifyCourseRegistry(courseCounts, shouldSync) {
  const errors = [];
  const registryPath = path.join(SRC_ROOT, "lib", "course-registry.ts");
  const original = await fs.readFile(registryPath, "utf8");
  const entryRegex = /(code:\s*"([^"]+)"[\s\S]*?count:\s*)(\d+)/g;
  const registryCounts = new Map();
  const syncedChanges = [];

  const updated = original.replace(entryRegex, (full, prefix, code, rawNum) => {
    const upperCode = code.toUpperCase();
    const prevCount = Number(rawNum);
    const actualCount = courseCounts.get(upperCode) || 0;

    if (shouldSync && prevCount !== actualCount) {
      syncedChanges.push(`${upperCode}: ${prevCount} -> ${actualCount}`);
      registryCounts.set(upperCode, actualCount);
      return `${prefix}${actualCount}`;
    }
    registryCounts.set(upperCode, prevCount);
    return full;
  });

  if (shouldSync && updated !== original) {
    await fs.writeFile(registryPath, updated, "utf8");
    console.log(`[sync:counts] Updated src/lib/course-registry.ts (${syncedChanges.join(", ")})`);
  } else if (shouldSync) {
    console.log("[sync:counts] src/lib/course-registry.ts already matches vault counts.");
  }

  for (const [courseCode, actualCount] of courseCounts.entries()) {
    if (!registryCounts.has(courseCode)) {
      errors.push(
        `[Gate 6] Vault course "${courseCode}" (${actualCount} notes) is missing from src/lib/course-registry.ts.`
      );
      continue;
    }
    const regCount = registryCounts.get(courseCode);
    if (regCount !== actualCount) {
      errors.push(
        `[Gate 6] Course "${courseCode}" count mismatch in src/lib/course-registry.ts (registry=${regCount}, vault=${actualCount}). Run "npm run sync:counts" to synchronize.`
      );
    }
  }

  for (const [courseCode, regCount] of registryCounts.entries()) {
    if (!courseCounts.has(courseCode) && regCount !== 0) {
      errors.push(
        `[Gate 6] Course "${courseCode}" in src/lib/course-registry.ts has count=${regCount} but 0 vault notes. Run "npm run sync:counts" to synchronize.`
      );
    }
  }

  return errors;
}

async function main() {
  const startedAt = Date.now();
  const shouldSync = process.argv.includes("--sync");
  const errors = [];

  // Gate 0 Self-Test & Content Allowlist Check (.md and .gitkeep only under content/)
  try {
    await runContentAllowlistSelfTests();
  } catch (err) {
    errors.push(`[Gate 0] Content allowlist self-test failed: ${err.message}`);
  }

  const disallowedContentFiles = await findDisallowedContentFiles(CONTENT_ALLOWLIST_ROOT);
  for (const relPath of disallowedContentFiles) {
    errors.push(`[Gate 0] Disallowed non-Markdown file in content/: "content/${relPath}"`);
  }

  // Gate 3 Self-Test (verifies MCQ, [MSQ], [INPUT], [BLANK] syntax & grading)
  try {
    runParserSelfTests();
  } catch (err) {
    errors.push(`[Gate 3] Built-in parser self-test failed: ${err.message}`);
  }

  const { dirs, files: allFiles } = await walkTree(CONTENT_ROOT);
  const mdFiles = allFiles.filter((f) => f.endsWith(".md")).sort();

  const gate1 = await runGate1Directories(dirs, allFiles);
  errors.push(...gate1.errors);

  const idRegistry = new Map();
  let standardCount = 0;
  let reviewerCount = 0;
  let utilityCount = 0;
  let dummyHits = 0;
  let missingOrDupIds = 0;
  let notesWithAssessments = 0;
  let assessmentSuccessNotes = 0;
  const questionTypeCounts = { mcq: 0, msq: 0, input: 0, blank: 0 };

  const noteResults = await mapWithConcurrency(mdFiles, CONCURRENCY_LIMIT, async (filePath) => {
    const rel = path.relative(CONTENT_ROOT, filePath);
    const content = await fs.readFile(filePath, "utf8");
    return { rel, base: path.basename(filePath), content };
  });

  for (const { rel, base, content } of noteResults) {
    const { isStandard, isRev, isQzPs } = classifyNote(rel);
    if (isStandard) standardCount++;
    else if (isRev) reviewerCount++;
    else utilityCount++;

    // Gate 1: Option 3 stripped clean title check for Standard Notes
    if (
      isStandard &&
      /^(?:\d+\.\d+\s+|Week\s+\d+\s*-\s*|Ch(?:apter)?\s+\d+\s*-\s*)/i.test(base)
    ) {
      errors.push(`[Gate 1] Standard Note retains unstripped prefix: "${rel}"`);
    }

    // Gate 2: Frontmatter, Zero-Emoji & Metadata Invariants
    const fm = parseFrontmatter(content);
    if (!fm) {
      missingOrDupIds++;
      errors.push(`[Gate 2] Missing YAML frontmatter: "${rel}"`);
    } else {
      const id = fm.id || "";
      const type = (fm.type || "").toLowerCase();
      const course = fm.course || "";
      const topic = fm.topic || "";
      const status = (fm.status || "").toLowerCase();

      if (!id || !course || !topic || !VALID_STATUSES.has(status) || !VALID_TYPES.has(type)) {
        missingOrDupIds++;
        errors.push(
          `[Gate 2] Incomplete or invalid YAML frontmatter fields (id/type/course/topic/status) in "${rel}"`
        );
      } else if (idRegistry.has(id)) {
        missingOrDupIds++;
        errors.push(`[Gate 2] Duplicate YAML id "${id}" in "${rel}" (already used in "${idRegistry.get(id)}")`);
      } else {
        idRegistry.set(id, rel);
      }
    }

    if (!content.includes("> [!info] Document Metadata")) {
      errors.push(`[Gate 2] Missing "> [!info] Document Metadata" callout in "${rel}"`);
    }
    if (!/\*\*Tags:\*\*\s*#\[\[/.test(content)) {
      errors.push(`[Gate 2] Missing "**Tags:** #[[...]]" metadata line in "${rel}"`);
    }
    if (content.includes("🏷️") || EMOJI_REGEX.test(content)) {
      errors.push(`[Gate 2] Zero-Emoji invariant violated in "${rel}"`);
    }

    // Gate 3: Multi-Type Interactive Assessment Parser Dry-Run
    const parsed = parseMCQSection(content);
    if (parsed.hadAssessmentHeader) {
      notesWithAssessments++;
    }

    if (isStandard) {
      if (!parsed.hadAssessmentHeader || !/^##+\s*Multiple Choice Questions\b/im.test(content)) {
        errors.push(`[Gate 3] Standard Note missing "## Multiple Choice Questions": "${rel}"`);
      } else if (!parsed.hasAnswerKeyHeader) {
        errors.push(`[Gate 3] Standard Note missing "### Answer Key & Explanations": "${rel}"`);
      } else if (parsed.mcqItems.length < 3) {
        errors.push(`[Gate 3] Standard Note parsed <3 questions (${parsed.mcqItems.length}): "${rel}"`);
      } else if (parsed.questionBlockCount !== parsed.answerKeyCount) {
        errors.push(
          `[Gate 3] Question/Answer count mismatch (${parsed.questionBlockCount} questions vs ${parsed.answerKeyCount} answers) in "${rel}"`
        );
      } else if (!REFERENCES_HEADER_REGEX.test(parsed.articleContent.split("\n").find((l) => REFERENCES_HEADER_REGEX.test(l)) || "")) {
        errors.push(`[Gate 3] Assessment slicer swallowed "## References & Navigation" in "${rel}"`);
      } else {
        assessmentSuccessNotes++;
      }
    } else if (isRev) {
      if (!parsed.hadAssessmentHeader) {
        errors.push(`[Gate 3] Reviewer [REV] missing practice exam / assessment section: "${rel}"`);
      } else if (!parsed.hasAnswerKeyHeader) {
        errors.push(`[Gate 3] Reviewer [REV] missing "### Answer Key": "${rel}"`);
      } else if (parsed.mcqItems.length === 0 || parsed.questionBlockCount !== parsed.answerKeyCount) {
        errors.push(
          `[Gate 3] Reviewer [REV] assessment parse mismatch (${parsed.mcqItems.length} parsed, ${parsed.questionBlockCount}Q/${parsed.answerKeyCount}A) in "${rel}"`
        );
      } else {
        assessmentSuccessNotes++;
      }
    } else if (parsed.hadAssessmentHeader) {
      if (!parsed.hasAnswerKeyHeader || parsed.mcqItems.length === 0 || parsed.questionBlockCount !== parsed.answerKeyCount) {
        errors.push(
          `[Gate 3] ${isQzPs ? "[QZ]/[PS]" : "Utility"} interactive assessment failed parsing (${parsed.mcqItems.length} parsed, ${parsed.questionBlockCount}Q/${parsed.answerKeyCount}A) in "${rel}"`
        );
      } else {
        assessmentSuccessNotes++;
      }
    }

    for (const item of parsed.mcqItems) {
      questionTypeCounts[item.type] = (questionTypeCounts[item.type] || 0) + 1;

      if (item.type === "mcq" || item.type === "msq") {
        const keys = new Set(item.options.map((o) => o.key));
        if (item.options.length !== 4 || keys.size !== 4) {
          errors.push(
            `[Gate 3] Q${item.id} (${item.type.toUpperCase()}) in "${rel}" must have 4 distinct options A-D (got ${item.options.length})`
          );
        }
        if (item.type === "msq" && (!item.expectedKeys || item.expectedKeys.length === 0)) {
          errors.push(`[Gate 3] Q${item.id} [MSQ] in "${rel}" has no expected keys`);
        }
      } else if (item.type === "input") {
        if (!item.question.trim() || !item.acceptedAnswers || item.acceptedAnswers.length === 0) {
          errors.push(`[Gate 3] Q${item.id} [INPUT] in "${rel}" missing stem or accepted answers`);
        }
      } else if (item.type === "blank") {
        const tokens = [...item.question.matchAll(/\{\{(\d+)\}\}/g)].map((m) => m[1]);
        if (tokens.length === 0) {
          errors.push(`[Gate 3] Q${item.id} [BLANK] in "${rel}" has no {{n}} blank tokens`);
        }
        for (const tokenId of tokens) {
          if (!item.blanksMap || !item.blanksMap[tokenId] || item.blanksMap[tokenId].length === 0) {
            errors.push(`[Gate 3] Q${item.id} [BLANK] in "${rel}" missing key for {{${tokenId}}}`);
          }
        }
      }
    }

    // Gate 4: 14 Dummy Pattern Contamination Audit
    for (const dp of DUMMY_PATTERNS) {
      if (dp.test(content)) {
        dummyHits++;
        errors.push(`[Gate 4] Dummy MCQ contamination pattern matched (${dp.source}) in "${rel}"`);
      }
    }

    // Gate 5: Graph Navigation & Mermaid v12 Integrity
    const navMatch = content.match(/##+\s*References\s*&\s*Navigation([\s\S]*)$/i);
    if (!navMatch) {
      errors.push(`[Gate 5] Missing "## References & Navigation" footer in "${rel}"`);
    } else {
      const navBody = navMatch[1];
      if (!/\[\[.+?\]\]/.test(navBody)) {
        errors.push(`[Gate 5] "## References & Navigation" contains no [[wikilink]] in "${rel}"`);
      }
      if (isStandard && !/\*\*(?:Related Notes|Previous Topic|Next Topic):\*\*/i.test(navBody)) {
        errors.push(
          `[Gate 5] Standard Note "## References & Navigation" missing Related/Previous/Next link labels in "${rel}"`
        );
      }
    }

    errors.push(...validateMermaidBlocks(content, rel));
  }

  // Gate 6: Codebase Invariant Check (src/) & Registry Parity
  const courseCounts = new Map();
  for (const filePath of mdFiles) {
    const rel = path.relative(CONTENT_ROOT, filePath);
    const parts = rel.split(path.sep);
    if (parts.length >= 3) {
      const courseCode = parts[2].toUpperCase();
      courseCounts.set(courseCode, (courseCounts.get(courseCode) || 0) + 1);
    }
  }

  const parityErrors = await syncAndVerifyCourseRegistry(courseCounts, shouldSync);
  const gate6Errors = [...(await runGate6CodebaseInvariants()), ...parityErrors];
  errors.push(...gate6Errors);

  const elapsedMs = Date.now() - startedAt;
  const totalQuestions =
    questionTypeCounts.mcq +
    questionTypeCounts.msq +
    questionTypeCounts.input +
    questionTypeCounts.blank;
  const parseRate =
    notesWithAssessments > 0
      ? `${((assessmentSuccessNotes / notesWithAssessments) * 100).toFixed(1)}%`
      : "100.0%";

  console.log("=== Project Engram Governance Validation ===");
  console.log(
    `Scanned ${mdFiles.length} markdown files (${standardCount} standard, ${reviewerCount} reviewers, ${utilityCount} utility) across ${dirs.length} folders in ${elapsedMs} ms.`
  );
  console.log(
    `Malformed Folders: ${gate1.malformedFolders} | Hollow Modules: ${gate1.hollowModules} | Duplicate/Missing IDs: ${missingOrDupIds} | Dummy Hits: ${dummyHits}`
  );
  console.log(
    `Assessments: ${assessmentSuccessNotes}/${notesWithAssessments} sections valid (${parseRate}) | Questions: ${totalQuestions} (MCQ: ${questionTypeCounts.mcq}, MSQ: ${questionTypeCounts.msq}, INPUT: ${questionTypeCounts.input}, BLANK: ${questionTypeCounts.blank})`
  );
  console.log(
    `Gate 0 Content Allowlist: ${disallowedContentFiles.length === 0 ? "PASS (0 non-Markdown files)" : `FAIL (${disallowedContentFiles.length} disallowed file(s))`} | Gate 6 Codebase Invariants: ${gate6Errors.length === 0 ? "PASS" : `FAIL (${gate6Errors.length})`}`
  );

  if (process.env.GITHUB_STEP_SUMMARY) {
    const summaryLines = [
      "## Project Engram Governance Report",
      "",
      "| Metric | Result |",
      "| :--- | :--- |",
      `| Content Allowlist Gate (MD / .gitkeep Only) | ${disallowedContentFiles.length === 0 ? "PASS" : `FAIL (${disallowedContentFiles.length})`} |`,
      `| Standard Notes / Reviewers / Utility Files | ${standardCount} / ${reviewerCount} / ${utilityCount} (${mdFiles.length} total) |`,
      `| Malformed Folders / Hollow Modules | ${gate1.malformedFolders} / ${gate1.hollowModules} |`,
      `| Interactive Questions Parsed | ${totalQuestions} (MCQ: ${questionTypeCounts.mcq}, MSQ: ${questionTypeCounts.msq}, INPUT: ${questionTypeCounts.input}, BLANK: ${questionTypeCounts.blank}) |`,
      `| Assessment Parse Success Rate | ${parseRate} (${assessmentSuccessNotes}/${notesWithAssessments}) |`,
      `| Dummy Pattern Detections | ${dummyHits} |`,
      `| Duplicate / Missing YAML IDs | ${missingOrDupIds} |`,
      `| Codebase Sync-FS & Sanitization Gate | ${gate6Errors.length === 0 ? "PASS" : "FAIL"} |`,
      `| Validation Status | ${errors.length === 0 ? "PASS (0 violations)" : `FAIL (${errors.length} violations)`} |`,
      "",
    ];
    await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, summaryLines.join("\n"), "utf8");
  }

  if (errors.length > 0) {
    console.error(`\nFAILED with ${errors.length} governance violation(s):`);
    for (const err of errors) {
      console.error(`  - ${err}`);
    }
    process.exit(1);
  }

  console.log("\nPASS: All governance gates (Gates 0-6) cleared with 0 violations.");
}

main().catch((err) => {
  console.error("[validate-notes] Fatal error:", err);
  process.exit(1);
});
