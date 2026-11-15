/**
 * Deterministic Canvas-Style Assessment Parser & Grader for Project Engram.
 *
 * Supports:
 * - Standard single-choice MCQs (`1. Stem` + `A)`..`D)`)
 * - Multiple-Select checkboxes (`[MSQ]` with `B, C` answer keys)
 * - Exact text / numeric solving (`[INPUT]` with `;`-delimited keys & ±0.01 tolerance)
 * - Table / inline fill-in-the-blanks (`[BLANK]` with `{{1}}`, `{{2}}` & `1: a/b; 2: c`)
 *
 * Preserves multi-line GFM tables, code fences, and KaTeX blocks verbatim and slices
 * cleanly before `## References & Navigation`.
 */

export type QuestionType = "mcq" | "msq" | "input" | "blank";

export interface MCQOption {
  key: string;
  text: string;
}

export interface MCQItem {
  id: number;
  type?: QuestionType;
  question: string;
  options: MCQOption[];
  answerKey: string;
  expectedKeys?: string[];
  acceptedAnswers?: string[];
  blanksMap?: Record<string, string[]>;
  explanation: string;
}

export interface ParsedMCQSectionResult {
  articleContent: string;
  mcqItems: MCQItem[];
  hadAssessmentHeader: boolean;
}

interface ParsedAnswerEntry {
  kind: "letters" | "bracket";
  letters: string[];
  bracketInner: string;
  explanation: string;
}

const ASSESSMENT_START_REGEX =
  /^##+\s*(?:Multiple Choice Questions|5\.\s*Comprehensive Practice Exam)\b[^\n]*$/i;
const REFERENCES_HEADER_REGEX = /^##+\s*References\s*&\s*Navigation\b/i;
const H2_HEADER_REGEX = /^##\s+(?!#)/;
const ANSWER_KEY_HEADER_REGEX =
  /^###+\s*(?:\*\*)?(?:Detailed\s+)?Answer Key(?:\s*(?:&|and)\s*Explanations)?(?:\*\*)?[:\s]*$/i;
const FENCE_REGEX = /^\s*(`{3,}|~{3,})/;

function updateFenceState(
  line: string,
  activeFence: string | null
): { nextFence: string | null; isFenceToggle: boolean } {
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

function findAssessmentRange(lines: string[]): {
  startLine: number;
  endLine: number;
  headerLine: string;
  sectionLines: string[];
} | null {
  let activeFence: string | null = null;
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
      // Stop on horizontal rule after Answer Key only if no more numbered keys follow
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

function splitQuestionsAndAnswers(sectionLines: string[]): {
  questionLines: string[];
  answerLines: string[];
} {
  let activeFence: string | null = null;
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
    return { questionLines: sectionLines, answerLines: [] };
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
  };
}

function parseAnswerEntryBody(body: string): ParsedAnswerEntry | null {
  const trimmed = body.trim();
  if (!trimmed) return null;

  // Format: **[5.67; 17/3; 5.67 ms]** Explanation... OR **[1: 0/false; 2: 1/true]** Explanation...
  const bracketMatch = trimmed.match(/^\*\*\[([^\]]+)\][).]*\*\*[.:)]*\s*([\s\S]*)$/);
  if (bracketMatch) {
    return {
      kind: "bracket",
      letters: [],
      bracketInner: bracketMatch[1].trim(),
      explanation: (bracketMatch[2] || "").trim(),
    };
  }

  // Format: **A)** Explanation... | **A.** Explanation... | **B, C)** Explanation...
  const lettersMatch = trimmed.match(
    /^\*\*([A-D](?:\s*,\s*[A-D])*)[).]*\*\*[.:)]*\s*([\s\S]*)$/,
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

  // Legacy fallback: **A. Label Text** Explanation...
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

function parseAnswerKeyLines(answerLines: string[]): Map<number, ParsedAnswerEntry> {
  const answersMap = new Map<number, ParsedAnswerEntry>();
  const rawEntries: { id: number; lines: string[] }[] = [];
  let current: { id: number; lines: string[] } | null = null;
  let activeFence: string | null = null;

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

function sliceQuestionBlocks(questionLines: string[]): {
  id: number;
  explicitTag?: QuestionType;
  bodyLines: string[];
}[] {
  const blocks: { id: number; explicitTag?: QuestionType; bodyLines: string[] }[] = [];
  let current: { id: number; explicitTag?: QuestionType; bodyLines: string[] } | null = null;
  let activeFence: string | null = null;

  for (const line of questionLines) {
    const { nextFence, isFenceToggle } = updateFenceState(line, activeFence);
    activeFence = nextFence;

    if (!activeFence && !isFenceToggle) {
      const qStart = line.match(/^(\d+)\.\s+(?:\[(MCQ|MSQ|INPUT|BLANK)\]\s*)?(.*)$/i);
      if (qStart) {
        if (current) blocks.push(current);
        const tagRaw = qStart[2]?.toLowerCase() as QuestionType | undefined;
        current = {
          id: parseInt(qStart[1], 10),
          explicitTag: tagRaw,
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

function extractOptionsFromBlock(bodyLines: string[]): {
  stem: string;
  options: MCQOption[];
} {
  const optStartRegex = /^[ \t]{0,6}[-*]\s+\*\*([A-D])[).]*\*\*\s*(.*)$/;
  let activeFence: string | null = null;
  let firstOptionIdx = -1;
  const optionEntries: { key: string; lines: string[] }[] = [];
  let currentOpt: { key: string; lines: string[] } | null = null;

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
      // Strip option continuation indent (up to 8 spaces) without harming fenced code
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

function parseBlanksMap(bracketInner: string): Record<string, string[]> {
  const map: Record<string, string[]> = {};
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

/**
 * Extracts interactive assessments from note Markdown while returning clean articleContent.
 * Emits `[MCQ_PARSE_FAILURE]` if an assessment section heading exists yet yields 0 items.
 */
export function parseMCQSection(
  rawContent: string,
  filePath?: string
): ParsedMCQSectionResult {
  const normalized = rawContent.replace(/\r\n?/g, "\n").replace(/\0/g, "");
  const lines = normalized.split("\n");
  const range = findAssessmentRange(lines);

  if (!range) {
    return {
      articleContent: normalized,
      mcqItems: [],
      hadAssessmentHeader: false,
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

  const { questionLines, answerLines } = splitQuestionsAndAnswers(range.sectionLines);
  const answersMap = parseAnswerKeyLines(answerLines);
  const questionBlocks = sliceQuestionBlocks(questionLines);
  const mcqItems: MCQItem[] = [];

  for (const qBlock of questionBlocks) {
    const rawBody = qBlock.bodyLines.join("\n").trim();
    if (!rawBody) continue;

    const { stem, options } = extractOptionsFromBlock(qBlock.bodyLines);
    const answerEntry = answersMap.get(qBlock.id);

    let resolvedType: QuestionType;
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

    // MCQ or MSQ
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

  if (mcqItems.length === 0) {
    console.warn(`[MCQ_PARSE_FAILURE]: ${filePath || "unknown"}`);
  }

  return {
    articleContent,
    mcqItems,
    hadAssessmentHeader: true,
  };
}

/** Parses simple finite scalars or integer/decimal fractions (e.g. `17/3`, `-0.25`). */
export function parseNumericScalar(raw: string): number | null {
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

function splitNumberAndUnit(raw: string): { num: number; unit: string } | null {
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

/** Checks if a user's `[INPUT]` or single-blank answer matches any accepted value (exact or ±0.01 numeric tolerance). */
export function gradeInputAnswer(
  userInput: string,
  acceptedAnswers: string[]
): boolean {
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

/** Grades `[MSQ]` multi-select checkbox selections regardless of order. */
export function gradeMSQSelection(
  selectedKeys: string[],
  expectedKeys: string[]
): boolean {
  const normSel = Array.from(new Set(selectedKeys.map((k) => k.trim().toUpperCase()))).sort();
  const normExp = Array.from(new Set(expectedKeys.map((k) => k.trim().toUpperCase()))).sort();
  if (normExp.length === 0 || normSel.length !== normExp.length) return false;
  return normSel.every((k, idx) => k === normExp[idx]);
}

/** Grades `[BLANK]` inputs per blank ID and returns overall pass/fail. */
export function gradeBlankAnswer(
  userBlanks: Record<string, string>,
  blanksMap: Record<string, string[]>
): { allCorrect: boolean; perBlank: Record<string, boolean> } {
  const ids = Object.keys(blanksMap);
  const perBlank: Record<string, boolean> = {};
  if (ids.length === 0) return { allCorrect: false, perBlank };

  let allCorrect = true;
  for (const id of ids) {
    const ok = gradeInputAnswer(userBlanks[id] || "", blanksMap[id] || []);
    perBlank[id] = ok;
    if (!ok) allCorrect = false;
  }
  return { allCorrect, perBlank };
}
