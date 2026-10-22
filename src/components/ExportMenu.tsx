"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme, UNIVERSE_REGISTRY } from "./ThemeProvider";

interface ExportMenuProps {
  title: string;
  courseCode?: string;
  rawMarkdown?: string;
  lastUpdated?: string | null;
}

function sanitizeFilename(input: string): string {
  return input
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function buildSelfTestMarkdown(raw: string, title: string, courseCode?: string): string {
  let output = raw;

  // 1. Strip YAML frontmatter at top of file
  output = output.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n*/, "");

  // 2. Strip Answer Key & Explanations block up to next H2 (e.g. ## References & Navigation) or EOF
  output = output.replace(
    /###\s+Answer Key\s*(?:&|and)?\s*Explanations[\s\S]*?(?=\r?\n##\s+|\s*$)/i,
    "### Answer Key & Explanations\n\n*Answer key omitted in Self-Test Mode.*\n"
  );

  // 3. Prepend clean header if document doesn't start with H1
  if (!output.trimStart().startsWith("# ")) {
    const prefix = courseCode ? `${courseCode}: ${title}` : title;
    output = `# ${prefix} (Self-Test Sheet)\n\n${output.trimStart()}`;
  }

  return output.trim() + "\n";
}

export default function ExportMenu({
  title,
  courseCode,
  rawMarkdown = "",
  lastUpdated,
}: ExportMenuProps) {
  const [open, setOpen] = useState(false);
  const [selfTestMd, setSelfTestMd] = useState(false);
  const [pdfStyle, setPdfStyle] = useState<"theme" | "paper">("theme");
  const [hidePdfAnswers, setHidePdfAnswers] = useState(false);
  const [exportedFeedback, setExportedFeedback] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { universe } = useTheme();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleDownloadMarkdown = useCallback(() => {
    if (!rawMarkdown) return;

    const processedContent = selfTestMd
      ? buildSelfTestMarkdown(rawMarkdown, title, courseCode)
      : rawMarkdown;

    const blob = new Blob([processedContent], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const prefix = courseCode ? `${courseCode}-` : "";
    const suffix = selfTestMd ? "-SelfTest" : "";
    const baseName = sanitizeFilename(title) || "Monograph";

    link.href = url;
    link.download = `${prefix}${baseName}${suffix}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setExportedFeedback("MD SAVED");
    setTimeout(() => setExportedFeedback(null), 2000);
    setOpen(false);
  }, [rawMarkdown, selfTestMd, title, courseCode]);

  const handleExportPdf = useCallback(() => {
    setOpen(false);

    const root = document.documentElement;
    root.setAttribute("data-print-mode", pdfStyle);
    if (hidePdfAnswers) {
      root.setAttribute("data-print-hide-answers", "true");
    } else {
      root.removeAttribute("data-print-hide-answers");
    }

    const cleanup = () => {
      root.removeAttribute("data-print-mode");
      root.removeAttribute("data-print-hide-answers");
      window.removeEventListener("afterprint", cleanup);
    };

    window.addEventListener("afterprint", cleanup);

    // Wait a frame so dropdown unmounts and print attributes apply before print dialog opens
    setTimeout(() => {
      window.print();
    }, 150);
  }, [pdfStyle, hidePdfAnswers]);

  const activeUniverseLabel = UNIVERSE_REGISTRY[universe]?.label || "Cyber-Zen";

  return (
    <div ref={menuRef} className="relative inline-block text-left print:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[10px] font-mono tracking-wider uppercase transition-all ${
          open
            ? "border-[var(--zen-cyan)] text-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 font-semibold"
            : "border-[var(--zen-border)] hover:border-[var(--zen-cyan)] bg-[var(--zen-card)] text-[var(--zen-frost)] hover:text-[var(--zen-cyan)]"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
        title="Export monograph as Markdown (.md) or Theme-Styled PDF (.pdf)"
      >
        <svg
          className="w-3 h-3 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span>{exportedFeedback || "EXPORT"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 mt-2 w-80 z-50 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/95 backdrop-blur-2xl shadow-2xl p-4 text-[var(--zen-frost)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[var(--zen-border)]">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold block">
                  DUAL EXPORT ENGINE
                </span>
                <span className="text-[11px] font-mono text-[var(--zen-ink-muted)] truncate block max-w-[210px]">
                  {courseCode ? `${courseCode} // ${title}` : title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-6 h-6 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] flex items-center justify-center text-[10px] font-mono text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)]"
                aria-label="Close export menu"
              >
                ✕
              </button>
            </div>

            {/* Option A: Markdown (.md) */}
            {rawMarkdown && (
              <div className="mb-4 pb-4 border-b border-[var(--zen-border)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-semibold text-[var(--zen-snow)] uppercase tracking-wider">
                    1. MARKDOWN SOURCE (.MD)
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-[var(--zen-border)] text-[var(--zen-ink-muted)]">
                    OBSIDIAN READY
                  </span>
                </div>

                <label className="flex items-start gap-2.5 cursor-pointer select-none my-2.5 text-xs text-[var(--zen-frost)]">
                  <input
                    type="checkbox"
                    checked={selfTestMd}
                    onChange={(e) => setSelfTestMd(e.target.checked)}
                    className="mt-0.5 accent-[var(--zen-cyan)] rounded"
                  />
                  <span className="leading-snug text-[11px] text-[var(--zen-ink-muted)]">
                    <strong className="text-[var(--zen-snow)] font-mono block">
                      SELF-TEST WORKSHEET MODE
                    </strong>
                    Strip YAML frontmatter and omit MCQ answer key for practice.
                  </span>
                </label>

                <button
                  type="button"
                  onClick={handleDownloadMarkdown}
                  className="w-full mt-1 py-2 px-3 rounded border border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/10 hover:bg-[var(--zen-cyan)] hover:text-[var(--zen-void)] text-[var(--zen-cyan)] font-mono text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-between"
                >
                  <span>
                    {selfTestMd ? "DOWNLOAD SELF-TEST (.MD)" : "DOWNLOAD RAW NOTE (.MD)"}
                  </span>
                  <span>↓</span>
                </button>
              </div>
            )}

            {/* Option B: PDF (.pdf) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-semibold text-[var(--zen-snow)] uppercase tracking-wider">
                  2. DOCUMENT PRINT (.PDF)
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-[var(--zen-cyan)]/40 text-[var(--zen-cyan)] uppercase">
                  {activeUniverseLabel}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 my-2.5">
                <button
                  type="button"
                  onClick={() => setPdfStyle("theme")}
                  className={`py-1.5 px-2 rounded border text-[10px] font-mono tracking-wider uppercase text-center transition-all ${
                    pdfStyle === "theme"
                      ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-cyan)] font-semibold"
                      : "border-[var(--zen-border)] bg-[var(--zen-card)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
                  }`}
                >
                  THEME-STYLED
                </button>
                <button
                  type="button"
                  onClick={() => setPdfStyle("paper")}
                  className={`py-1.5 px-2 rounded border text-[10px] font-mono tracking-wider uppercase text-center transition-all ${
                    pdfStyle === "paper"
                      ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-cyan)] font-semibold"
                      : "border-[var(--zen-border)] bg-[var(--zen-card)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
                  }`}
                >
                  INK-SAVER PAPER
                </button>
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer select-none my-2.5 text-xs text-[var(--zen-frost)]">
                <input
                  type="checkbox"
                  checked={hidePdfAnswers}
                  onChange={(e) => setHidePdfAnswers(e.target.checked)}
                  className="mt-0.5 accent-[var(--zen-cyan)] rounded"
                />
                <span className="leading-snug text-[11px] text-[var(--zen-ink-muted)]">
                  <strong className="text-[var(--zen-snow)] font-mono block">
                    HIDE MCQ EXPLANATIONS
                  </strong>
                  Keep multiple-choice questions visible while hiding solutions.
                </span>
              </label>

              <button
                type="button"
                onClick={handleExportPdf}
                className="w-full mt-1 py-2 px-3 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] bg-[var(--zen-card)] hover:bg-[var(--zen-cyan)] hover:text-[var(--zen-void)] text-[var(--zen-snow)] font-mono text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-between"
              >
                <span>
                  {pdfStyle === "theme"
                    ? `EXPORT ${activeUniverseLabel.toUpperCase()} PDF`
                    : "EXPORT ACADEMIC PAPER PDF"}
                </span>
                <span>→</span>
              </button>
            </div>

            {lastUpdated && (
              <div className="mt-3 pt-2 border-t border-[var(--zen-border)]/50 flex items-center justify-between text-[9px] font-mono text-[var(--zen-ink-muted)]">
                <span>REVISION DATE</span>
                <span>{lastUpdated}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
