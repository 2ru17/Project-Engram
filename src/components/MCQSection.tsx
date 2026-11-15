"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "@/components/ThemeProvider";
import {
  type MCQItem,
  type MCQOption,
  type QuestionType,
  gradeBlankAnswer,
  gradeInputAnswer,
  gradeMSQSelection,
} from "@/lib/mcq-parser";

export type { MCQItem, MCQOption, QuestionType };

interface MCQSectionProps {
  items: MCQItem[];
  renderMarkdown?: (markdown: string, inline?: boolean) => React.ReactNode;
}

const EASE_ENGRAM = [0.16, 1, 0.3, 1] as const;

export function MCQSection({ items, renderMarkdown }: MCQSectionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [msqSelections, setMsqSelections] = useState<Record<number, string[]>>({});
  const [msqSubmitted, setMsqSubmitted] = useState<Record<number, boolean>>({});
  const [inputValues, setInputValues] = useState<Record<number, string>>({});
  const [inputSubmitted, setInputSubmitted] = useState<Record<number, boolean>>({});
  const [blankValues, setBlankValues] = useState<Record<number, Record<string, string>>>({});
  const [blankSubmitted, setBlankSubmitted] = useState<Record<number, boolean>>({});
  const { universe } = useTheme();

  if (!items || items.length === 0) return null;

  const handleSelectMCQ = (questionId: number, optionKey: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
  };

  const handleToggleMSQ = (questionId: number, optionKey: string) => {
    setMsqSubmitted((prev) => ({ ...prev, [questionId]: false }));
    setMsqSelections((prev) => {
      const current = prev[questionId] || [];
      const exists = current.includes(optionKey);
      const next = exists
        ? current.filter((k) => k !== optionKey)
        : [...current, optionKey];
      return { ...prev, [questionId]: next };
    });
  };

  const handleSubmitMSQ = (questionId: number) => {
    setMsqSubmitted((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleInputChange = (questionId: number, value: string) => {
    setInputSubmitted((prev) => ({ ...prev, [questionId]: false }));
    setInputValues((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitInput = (questionId: number) => {
    setInputSubmitted((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleBlankChange = (questionId: number, blankId: string, value: string) => {
    setBlankSubmitted((prev) => ({ ...prev, [questionId]: false }));
    setBlankValues((prev) => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        [blankId]: value,
      },
    }));
  };

  const handleSubmitBlank = (questionId: number) => {
    setBlankSubmitted((prev) => ({ ...prev, [questionId]: true }));
  };

  const evaluateItemState = (item: MCQItem): { hasAnswered: boolean; isCorrect: boolean } => {
    const qType: QuestionType = item.type || "mcq";
    if (qType === "msq") {
      const hasAnswered = !!msqSubmitted[item.id];
      const expected = item.expectedKeys || [];
      const selected = msqSelections[item.id] || [];
      return {
        hasAnswered,
        isCorrect: hasAnswered ? gradeMSQSelection(selected, expected) : false,
      };
    }
    if (qType === "input") {
      const hasAnswered = !!inputSubmitted[item.id];
      const accepted = item.acceptedAnswers || [];
      const val = inputValues[item.id] || "";
      return {
        hasAnswered,
        isCorrect: hasAnswered ? gradeInputAnswer(val, accepted) : false,
      };
    }
    if (qType === "blank") {
      const hasAnswered = !!blankSubmitted[item.id];
      const blanksMap = item.blanksMap || {};
      const userBlanks = blankValues[item.id] || {};
      return {
        hasAnswered,
        isCorrect: hasAnswered ? gradeBlankAnswer(userBlanks, blanksMap).allCorrect : false,
      };
    }
    const selected = selectedAnswers[item.id];
    const hasAnswered = !!selected;
    return {
      hasAnswered,
      isCorrect: hasAnswered && selected === item.answerKey,
    };
  };

  const injectBlankInputs = (
    node: React.ReactNode,
    questionId: number,
    isSubmitted: boolean,
    perBlankResult: Record<string, boolean>,
    keyPrefix = "root"
  ): React.ReactNode => {
    if (typeof node === "string") {
      if (!/\{\{\d+\}\}/.test(node)) return node;
      const parts = node.split(/(\{\{\d+\}\})/g);
      return parts.map((part, idx) => {
        const tokenMatch = part.match(/^\{\{(\d+)\}\}$/);
        if (!tokenMatch) return part;

        const blankId = tokenMatch[1];
        const inputId = `mcq-${questionId}-blank-${blankId}`;
        const val = (blankValues[questionId] || {})[blankId] || "";
        const isBlankOk = perBlankResult[blankId];

        const statusClasses = isSubmitted
          ? isBlankOk
            ? "border-[#10B981] bg-[#10B981]/10 text-[var(--zen-snow)]"
            : "border-[#E63946] bg-[#E63946]/10 text-[var(--zen-snow)]"
          : "border-[var(--zen-border)] focus:border-[var(--zen-cyan)] bg-[var(--zen-void)]/80 text-[var(--zen-snow)]";

        return (
          <span
            key={`${keyPrefix}-b-${idx}-${blankId}`}
            className="inline-flex items-center align-middle mx-1 my-0.5"
          >
            <label htmlFor={inputId} className="sr-only">
              {`Question ${questionId} Blank ${blankId}`}
            </label>
            <input
              id={inputId}
              type="text"
              aria-label={`Question ${questionId} Blank ${blankId}`}
              value={val}
              onChange={(e) => handleBlankChange(questionId, blankId, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmitBlank(questionId);
                }
              }}
              placeholder={`[${blankId}]`}
              className={`w-24 sm:w-28 px-2 py-1 text-xs font-mono border rounded-sm outline-none transition-colors duration-200 ${statusClasses}`}
            />
          </span>
        );
      });
    }

    if (Array.isArray(node)) {
      return node.map((child, idx) =>
        injectBlankInputs(child, questionId, isSubmitted, perBlankResult, `${keyPrefix}-${idx}`)
      );
    }

    if (React.isValidElement<{ children?: React.ReactNode; className?: string }>(node)) {
      // Skip KaTeX formula subtrees and fenced code blocks to avoid mutating rendered DOM
      const cls = typeof node.props?.className === "string" ? node.props.className : "";
      const fnType = typeof node.type === "function" ? (node.type as { name?: string; displayName?: string }) : null;
      const typeName = fnType?.displayName || fnType?.name || "";
      if (
        cls.includes("katex") ||
        cls.includes("language-") ||
        node.type === "pre" ||
        typeName === "CodeBlockPre"
      ) {
        return node;
      }
      if (node.props?.children === undefined) {
        return node;
      }
      const nextChildren = React.Children.map(node.props.children, (child, idx) =>
        injectBlankInputs(child, questionId, isSubmitted, perBlankResult, `${keyPrefix}-${idx}`)
      );
      return React.cloneElement(node, undefined, nextChildren);
    }

    return node;
  };

  const states = items.map(evaluateItemState);
  const answeredCount = states.filter((s) => s.hasAnswered).length;
  const correctCount = states.filter((s) => s.isCorrect).length;

  return (
    <section
      className="my-14 border-t border-[var(--zen-border)] pt-10"
      aria-label="Active Recall Self-Verification"
    >
      {/* Section Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span
            className="text-xs font-mono tracking-[0.3em] text-[var(--zen-cyan)] uppercase block mb-1 font-semibold"
            style={{ fontFamily: "var(--font-zen-display, serif)" }}
          >
            {universe === "cyber-zen" ? "CONFIRMATION // 理解度の確認" : "CONFIRMATION // SELF-ASSESSMENT"}
          </span>
          <h3
            className="text-xl sm:text-2xl font-semibold tracking-wider text-[var(--zen-snow)] uppercase"
            style={{ fontFamily: "var(--font-zen-display, serif)" }}
          >
            ACTIVE RECALL VERIFICATION
          </h3>
          <p className="text-xs text-[var(--zen-ink-muted)] mt-1">
            Complete the active-recall items below to verify conceptual mastery and reveal technical rationales.
          </p>
        </div>

        {answeredCount > 0 && (
          <div className="shrink-0 px-3 py-1.5 border border-[var(--zen-border)] bg-[var(--zen-card)] font-mono text-xs tracking-wider text-[var(--zen-snow)] rounded-sm">
            SCORE:{" "}
            <span className="text-[var(--zen-cyan)] font-bold">
              {correctCount}/{items.length}
            </span>
          </div>
        )}
      </div>

      {/* Questions Stack */}
      <div className="space-y-8">
        {items.map((item, index) => {
          const qType: QuestionType = item.type || "mcq";
          const { hasAnswered, isCorrect } = states[index];
          const blankGrade =
            qType === "blank"
              ? gradeBlankAnswer(blankValues[item.id] || {}, item.blanksMap || {})
              : { allCorrect: false, perBlank: {} };

          return (
            <div
              key={item.id}
              className="universe-card mcq-card p-6 sm:p-7 bg-[var(--zen-card)] border border-[var(--zen-border)] shadow-xl relative rounded-sm break-inside-avoid"
            >
              {/* Question Type Badge & Number & Stem */}
              <div className="mb-5">
                {qType !== "mcq" && (
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/10 text-[var(--zen-cyan)] font-semibold rounded-sm">
                      {qType === "msq"
                        ? "MULTIPLE SELECT // SELECT ALL THAT APPLY"
                        : qType === "input"
                        ? "EXACT INPUT // ±0.01 NUMERIC TOLERANCE"
                        : "FILL IN THE BLANKS // INLINE & TABLE"}
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 text-xs font-mono font-semibold text-[var(--zen-cyan)] border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/5 shrink-0 mt-0.5">
                    Q{item.id}
                  </span>
                  <div className="text-sm sm:text-base font-medium text-[var(--zen-snow)] leading-relaxed flex-1 min-w-0 overflow-x-auto">
                    {qType === "blank"
                      ? injectBlankInputs(
                          renderMarkdown ? renderMarkdown(item.question, false) : item.question,
                          item.id,
                          hasAnswered,
                          blankGrade.perBlank
                        )
                      : renderMarkdown
                      ? renderMarkdown(item.question, false)
                      : item.question}
                  </div>
                </div>
              </div>

              {/* Type 1: Standard Single-Choice MCQ */}
              {qType === "mcq" && (
                <div className="space-y-2.5">
                  {item.options.map((opt) => {
                    const selected = selectedAnswers[item.id];
                    const isSelected = selected === opt.key;
                    const isThisCorrect = opt.key === item.answerKey;

                    let btnStyle =
                      "bg-[var(--zen-midnight)]/30 border-[var(--zen-border)] text-[var(--zen-frost)] hover:border-[var(--zen-cyan)]/50 hover:bg-[var(--zen-card-hover)]";

                    if (hasAnswered) {
                      if (isThisCorrect) {
                        btnStyle =
                          "bg-[#10B981]/15 border-[#10B981] text-[var(--zen-snow)] shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                      } else if (isSelected && !isCorrect) {
                        btnStyle =
                          "bg-[#E63946]/15 border-[#E63946] text-[var(--zen-snow)] shadow-[0_0_15px_rgba(230,57,70,0.2)]";
                      } else {
                        btnStyle =
                          "bg-[var(--zen-card)]/40 border-[var(--zen-border)]/40 text-[var(--zen-ink-muted)] opacity-60";
                      }
                    }

                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => handleSelectMCQ(item.id, opt.key)}
                        disabled={hasAnswered}
                        className={`w-full text-left p-3.5 sm:p-4 border transition-all duration-300 flex items-start gap-3 text-xs sm:text-sm leading-relaxed rounded-sm ${btnStyle}`}
                      >
                        <span
                          className={`font-mono font-semibold text-xs px-1.5 py-0.5 shrink-0 rounded ${
                            hasAnswered && isThisCorrect
                              ? "bg-[#10B981] text-white"
                              : hasAnswered && isSelected && !isCorrect
                              ? "bg-[#E63946] text-white"
                              : "bg-[var(--zen-cyan)]/10 text-[var(--zen-cyan)] border border-[var(--zen-cyan)]/30"
                          }`}
                        >
                          {opt.key}
                        </span>
                        <span className="flex-1 font-normal text-[var(--zen-snow)] min-w-0">
                          {renderMarkdown ? renderMarkdown(opt.text, true) : opt.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Type 2: [MSQ] Multiple-Select Checkboxes */}
              {qType === "msq" && (
                <div className="space-y-3">
                  <div className="space-y-2.5" role="group" aria-label={`Question ${item.id} choices`}>
                    {item.options.map((opt) => {
                      const currentSel = msqSelections[item.id] || [];
                      const isChecked = currentSel.includes(opt.key);
                      const expectedSet = item.expectedKeys || [];
                      const isExpected = expectedSet.includes(opt.key);

                      let btnStyle = isChecked
                        ? "bg-[var(--zen-cyan)]/10 border-[var(--zen-cyan)] text-[var(--zen-snow)]"
                        : "bg-[var(--zen-midnight)]/30 border-[var(--zen-border)] text-[var(--zen-frost)] hover:border-[var(--zen-cyan)]/50 hover:bg-[var(--zen-card-hover)]";

                      if (hasAnswered) {
                        if (isExpected && isChecked) {
                          btnStyle =
                            "bg-[#10B981]/15 border-[#10B981] text-[var(--zen-snow)]";
                        } else if (isExpected && !isChecked) {
                          btnStyle =
                            "bg-[#F59E0B]/15 border-[#F59E0B] text-[var(--zen-snow)]";
                        } else if (!isExpected && isChecked) {
                          btnStyle =
                            "bg-[#E63946]/15 border-[#E63946] text-[var(--zen-snow)]";
                        } else {
                          btnStyle =
                            "bg-[var(--zen-card)]/40 border-[var(--zen-border)]/40 text-[var(--zen-ink-muted)] opacity-60";
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          type="button"
                          role="checkbox"
                          aria-checked={isChecked}
                          onClick={() => handleToggleMSQ(item.id, opt.key)}
                          className={`w-full text-left p-3.5 sm:p-4 border transition-all duration-200 flex items-start gap-3 text-xs sm:text-sm leading-relaxed rounded-sm ${btnStyle}`}
                        >
                          <span
                            className={`w-4 h-4 mt-0.5 shrink-0 border flex items-center justify-center font-mono text-[10px] font-bold rounded-xs ${
                              isChecked
                                ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)] text-[var(--zen-void)]"
                                : "border-[var(--zen-border)] bg-[var(--zen-void)]/50 text-transparent"
                            }`}
                            aria-hidden="true"
                          >
                            {isChecked ? "X" : ""}
                          </span>
                          <span className="font-mono font-semibold text-xs px-1.5 py-0.5 shrink-0 rounded bg-[var(--zen-cyan)]/10 text-[var(--zen-cyan)] border border-[var(--zen-cyan)]/30">
                            {opt.key}
                          </span>
                          <span className="flex-1 font-normal text-[var(--zen-snow)] min-w-0">
                            {renderMarkdown ? renderMarkdown(opt.text, true) : opt.text}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-1 flex items-center justify-end gap-3 print:hidden">
                    <button
                      type="button"
                      onClick={() => handleSubmitMSQ(item.id)}
                      disabled={(msqSelections[item.id] || []).length === 0}
                      className="px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider border border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/10 hover:bg-[var(--zen-cyan)] text-[var(--zen-cyan)] hover:text-[var(--zen-void)] disabled:opacity-40 disabled:pointer-events-none transition-colors rounded-sm"
                    >
                      Check Selection
                    </button>
                  </div>
                </div>
              )}

              {/* Type 3: [INPUT] Exact Numeric / Text Solving */}
              {qType === "input" && (
                <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 print:hidden">
                  <div className="flex-1">
                    <label htmlFor={`mcq-input-${item.id}`} className="sr-only">
                      {`Answer for question ${item.id}`}
                    </label>
                    <input
                      id={`mcq-input-${item.id}`}
                      type="text"
                      aria-label={`Answer for question ${item.id}`}
                      value={inputValues[item.id] || ""}
                      onChange={(e) => handleInputChange(item.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleSubmitInput(item.id);
                        }
                      }}
                      placeholder="Enter exact numeric value, fraction, or complexity..."
                      className={`w-full px-3.5 py-2.5 text-sm font-mono border rounded-sm outline-none transition-colors ${
                        hasAnswered
                          ? isCorrect
                            ? "border-[#10B981] bg-[#10B981]/10 text-[var(--zen-snow)]"
                            : "border-[#E63946] bg-[#E63946]/10 text-[var(--zen-snow)]"
                          : "border-[var(--zen-border)] focus:border-[var(--zen-cyan)] bg-[var(--zen-void)]/70 text-[var(--zen-snow)]"
                      }`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleSubmitInput(item.id)}
                    disabled={!(inputValues[item.id] || "").trim()}
                    className="px-4 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider border border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/10 hover:bg-[var(--zen-cyan)] text-[var(--zen-cyan)] hover:text-[var(--zen-void)] disabled:opacity-40 disabled:pointer-events-none transition-colors rounded-sm shrink-0"
                  >
                    Verify Answer
                  </button>
                </div>
              )}

              {/* Type 4: [BLANK] Verification Trigger */}
              {qType === "blank" && (
                <div className="pt-3 flex items-center justify-end gap-3 print:hidden">
                  <button
                    type="button"
                    onClick={() => handleSubmitBlank(item.id)}
                    className="px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider border border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/10 hover:bg-[var(--zen-cyan)] text-[var(--zen-cyan)] hover:text-[var(--zen-void)] transition-colors rounded-sm"
                  >
                    Verify Blanks
                  </button>
                </div>
              )}

              {/* High Contrast Explanation Accordion */}
              <AnimatePresence>
                {hasAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: EASE_ENGRAM }}
                    className="overflow-hidden mt-6 print:hidden"
                  >
                    <div
                      className={`p-5 rounded border ${
                        isCorrect
                          ? "bg-[#10B981]/10 border-[#10B981]/40"
                          : "bg-[#E63946]/10 border-[#E63946]/40"
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs font-semibold tracking-wider uppercase">
                        <span className={isCorrect ? "text-[#10B981]" : "text-[#E63946]"}>
                          {isCorrect ? "CORRECT" : "INCORRECT"}
                        </span>
                        <span className="text-[var(--zen-ink-muted)]">·</span>
                        <span className="text-[var(--zen-snow)]">KEY: {item.answerKey}</span>
                      </div>
                      <div className="text-xs sm:text-sm leading-relaxed text-[var(--zen-snow)] font-normal">
                        {renderMarkdown ? renderMarkdown(item.explanation, false) : item.explanation}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Print-Only Answer Key Block */}
              <div className="hidden print:block mcq-print-explanation mt-4 pt-3 border-t border-[var(--zen-border)] text-xs">
                <div className="font-mono font-bold text-[var(--zen-cyan)] uppercase mb-1">
                  ANSWER KEY: {item.answerKey}
                </div>
                <div className="text-[var(--zen-snow)] leading-relaxed">
                  {renderMarkdown ? renderMarkdown(item.explanation, false) : item.explanation}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
