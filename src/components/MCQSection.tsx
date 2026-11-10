"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "@/components/ThemeProvider";

export interface MCQItem {
  id: number;
  question: string;
  options: { key: string; text: string }[];
  answerKey: string;
  explanation: string;
}

interface MCQSectionProps {
  items: MCQItem[];
  renderMarkdown?: (markdown: string, inline?: boolean) => React.ReactNode;
}

export function MCQSection({ items, renderMarkdown }: MCQSectionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showExplanations, setShowExplanations] = useState<Record<number, boolean>>({});
  const { universe } = useTheme();

  const handleSelect = (questionId: number, optionKey: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
    setShowExplanations((prev) => ({ ...prev, [questionId]: true }));
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="my-14 border-t border-[var(--zen-border)] pt-10" aria-label="Active Recall Self-Verification">
      {/* Section Header */}
      <div className="mb-8">
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
          Select an answer to verify conceptual comprehension and reveal the technical rationale.
        </p>
      </div>

      {/* Questions Stack */}
      <div className="space-y-8">
        {items.map((item) => {
          const selected = selectedAnswers[item.id];
          const hasAnswered = !!selected;
          const isCorrect = selected === item.answerKey;

          return (
            <div
              key={item.id}
              className="universe-card mcq-card p-6 sm:p-7 bg-[var(--zen-card)] border border-[var(--zen-border)] shadow-xl relative rounded-sm break-inside-avoid"
            >
              {/* Question Number & Text with high contrast */}
              <div className="mb-5 flex items-start gap-3">
                <span className="px-2 py-0.5 text-xs font-mono font-semibold text-[var(--zen-cyan)] border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/5 shrink-0 mt-0.5">
                  Q{item.id}
                </span>
                <div className="text-sm sm:text-base font-medium text-[var(--zen-snow)] leading-relaxed flex-1 min-w-0 overflow-x-auto">
                  {renderMarkdown ? renderMarkdown(item.question, false) : item.question}
                </div>
              </div>

              {/* Options Grid */}
              <div className="space-y-2.5">
                {item.options.map((opt) => {
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
                      btnStyle = "bg-[var(--zen-card)]/40 border-[var(--zen-border)]/40 text-[var(--zen-ink-muted)] opacity-60";
                    }
                  }

                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleSelect(item.id, opt.key)}
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

              {/* High Contrast Explication Accordion */}
              <AnimatePresence>
                {hasAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden mt-6 print:hidden"
                  >
                    <div
                      className={`p-5 rounded border ${
                        isCorrect
                          ? "bg-[#10B981]/10 border-[#10B981]/40"
                          : "bg-[#E63946]/10 border-[#E63946]/40"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2 font-mono text-xs font-semibold tracking-wider uppercase">
                        <span className={isCorrect ? "text-[#10B981]" : "text-[#E63946]"}>
                          {isCorrect ? "CORRECT" : "INCORRECT"}
                        </span>
                        <span className="text-[var(--zen-ink-muted)]">·</span>
                        <span className="text-[var(--zen-snow)]">
                          KEY: {item.answerKey}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm leading-relaxed text-[var(--zen-snow)] font-normal">
                        {renderMarkdown ? renderMarkdown(item.explanation, false) : item.explanation}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Print-Only Answer Key Block (Hidden when data-print-hide-answers="true") */}
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
