"use client";

import React, { useMemo, useState } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeReact from "rehype-react";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import * as prod from "react/jsx-runtime";
import Link from "next/link";
import dynamic from "next/dynamic";
import { MCQSection, type MCQItem } from "@/components/MCQSection";

const MermaidBlock = dynamic(() => import("@/components/MermaidBlock"), { ssr: false });

// Custom plugin to parse Obsidian wikilinks [[Target|Alias]]
function remarkWikilink() {
  return (tree: any) => {
    const visit = (node: any, index: number | null, parent: any) => {
      if (node.type === "text") {
        const regex = /\[\[(.*?)\]\]/g;
        let match;
        let lastIndex = 0;
        const newChildren = [];

        while ((match = regex.exec(node.value)) !== null) {
          if (match.index > lastIndex) {
            newChildren.push({ type: "text", value: node.value.slice(lastIndex, match.index) });
          }

          const inner = match[1];
          const parts = inner.split("|");
          const target = parts[0];
          const alias = parts.length > 1 ? parts[1] : target;

          newChildren.push({
            type: "link",
            url: target,
            data: { hProperties: { className: "ww-wikilink" } },
            children: [{ type: "text", value: alias }],
          });

          lastIndex = regex.lastIndex;
        }

        if (lastIndex < node.value.length) {
          newChildren.push({ type: "text", value: node.value.slice(lastIndex) });
        }

        if (newChildren.length > 0 && parent && index !== null) {
          parent.children.splice(index, 1, ...newChildren);
        }
      } else if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
          visit(node.children[i], i, node);
        }
      }
    };
    visit(tree, 0, null);
  };
}

// Code Block with Corner Brackets and Copy Button
function CodeBlockPre({ children, ...props }: any) {
  const [copied, setCopied] = useState(false);

  const child = Array.isArray(children) ? children[0] : children;
  const isMermaid =
    child?.props?.className === "language-mermaid" ||
    child?.props?.className?.includes("language-mermaid");

  if (isMermaid) {
    const extractText = (node: any): string => {
      if (typeof node === "string") return node;
      if (Array.isArray(node)) return node.map(extractText).join("");
      if (node?.props?.children) return extractText(node.props.children);
      return "";
    };
    const chart = extractText(child.props.children).trim();
    return <MermaidBlock chart={chart} />;
  }

  const rawCode = (() => {
    const extract = (node: any): string => {
      if (typeof node === "string") return node;
      if (Array.isArray(node)) return node.map(extract).join("");
      if (node?.props?.children) return extract(node.props.children);
      return "";
    };
    return extract(child?.props?.children || "");
  })();

  const langMatch = child?.props?.className?.match(/language-(\w+)/);
  let lang = langMatch ? langMatch[1].toUpperCase() : "";

  if (!lang) {
    if (rawCode.includes("|") && /\d+[\s\d]+/.test(rawCode)) {
      lang = "TIMELINE";
    } else {
      lang = "TEXT";
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-8 border border-[var(--zen-border)] bg-[var(--zen-card)] group shadow-xl">
      {/* Corner Brackets */}
      <span className="pointer-events-none absolute -top-2 -left-1 font-mono text-xs text-[var(--zen-cyan)] select-none">
        『
      </span>
      <span className="pointer-events-none absolute -bottom-2 -right-1 font-mono text-xs text-[var(--zen-cyan)] select-none">
        』
      </span>

      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--zen-border)] bg-[var(--zen-void)]/60 text-xs font-mono">
        <span className="px-2 py-0.5 text-[10px] tracking-widest text-[var(--zen-cyan)] border border-[var(--zen-cyan)]/30 bg-[var(--zen-cyan)]/5 font-semibold">
          {lang}
        </span>
        <button
          onClick={handleCopy}
          className="text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] transition-colors tracking-wider"
        >
          {copied ? "COPIED" : "COPY"}
        </button>
      </div>

      <pre className="p-5 font-mono text-xs sm:text-sm overflow-x-auto text-[var(--zen-frost)] leading-relaxed bg-[var(--zen-void)]/80 whitespace-pre" {...props}>
        <code className="block w-full bg-transparent border-0 p-0 text-inherit font-mono leading-relaxed whitespace-pre">
          {rawCode}
        </code>
      </pre>
    </div>
  );
}

const components = {
  a: ({ href, className, children, ...props }: any) => {
    if (className === "ww-wikilink" || className?.includes("internal")) {
      const linkTarget = href ? `/notes/${href.replace(/^\//, "").toLowerCase()}` : "#";
      return (
        <Link
          href={linkTarget}
          className="inline-flex items-center gap-1 px-2 py-0.5 my-0.5 rounded bg-[var(--zen-cyan)]/10 hover:bg-[var(--zen-cyan)]/20 text-[var(--zen-cyan)] font-mono text-xs border border-[var(--zen-cyan)]/30 hover:border-[var(--zen-cyan)] transition-all font-medium"
        >
          <span className="text-[10px]">◇</span>
          <span>{children}</span>
        </Link>
      );
    }
    return (
      <a
        className="text-[var(--zen-cyan)] hover:text-[var(--zen-snow)] transition-colors underline decoration-[var(--zen-cyan)]/40 underline-offset-4"
        href={href}
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: (props: any) => <ul className="space-y-2 list-none pl-2 my-5" {...props} />,
  ol: (props: any) => <ol className="space-y-2 list-decimal pl-6 my-5 text-[var(--zen-frost)]" {...props} />,
  li: ({ children, ...props }: any) => (
    <li className="flex gap-3 items-start group" {...props}>
      <span className="mt-2 w-1.5 h-1.5 rotate-45 bg-[var(--zen-cyan)] shadow-[0_0_8px_rgba(0,229,255,0.4)] shrink-0" />
      <span className="text-[var(--zen-frost)] leading-relaxed text-[0.98em]">{children}</span>
    </li>
  ),
  blockquote: (props: any) => {
    let rawText = "";
    const extract = (node: any) => {
      if (typeof node === "string") rawText += node;
      else if (node?.props?.children) React.Children.forEach(node.props.children, extract);
    };
    extract(props.children);

    if (rawText.trim().startsWith("[!")) {
      const match = rawText.trim().match(/\[!(.*?)\](.*)/);
      const type = match ? match[1].toLowerCase() : "info";

      // Mature Japanese Scholarly Archival Callouts
      let title = "FOUNDATIONAL PRINCIPLE // 原理";
      let seal = "原";
      let borderColor = "border-[var(--zen-cyan)]";
      let textColor = "text-[var(--zen-cyan)]";
      let bgColor = "bg-[var(--zen-cyan)]/5";

      if (type === "tip" || type === "summary" || type === "success") {
        title = "ENGINEERING INSIGHT // 知見";
        seal = "知";
        borderColor = "border-[#10B981]";
        textColor = "text-[#10B981]";
        bgColor = "bg-[#10B981]/5";
      } else if (type === "warning" || type === "caution") {
        title = "SYSTEM INVARIANT // 規矩";
        seal = "規";
        borderColor = "border-[#F59E0B]";
        textColor = "text-[#F59E0B]";
        bgColor = "bg-[#F59E0B]/5";
      } else if (type === "danger" || type === "error") {
        title = "CRITICAL ANTI-PATTERN // 禁忌";
        seal = "禁";
        borderColor = "border-[#E63946]";
        textColor = "text-[#E63946]";
        bgColor = "bg-[#E63946]/5";
      } else if (type === "example") {
        title = "IMPLEMENTATION REFERENCE // 実例";
        seal = "例";
        borderColor = "border-[var(--zen-steel)]";
        textColor = "text-[var(--zen-steel)]";
        bgColor = "bg-[var(--zen-steel)]/5";
      }

      return (
        <div className={`my-8 border-l-2 ${borderColor} ${bgColor} p-5 bg-[var(--zen-card)] border border-[var(--zen-border)] rounded-sm shadow-md`}>
          <div className="flex items-center gap-3 mb-3 border-b border-[var(--zen-border)] pb-2.5">
            <div
              className={`w-6 h-6 border ${borderColor} ${textColor} text-xs font-semibold grid place-items-center bg-[var(--zen-void)] font-serif`}
            >
              {seal}
            </div>
            <span className={`text-xs font-mono font-semibold tracking-widest uppercase ${textColor}`}>
              {title}
            </span>
          </div>
          <div className="text-[var(--zen-snow)] text-sm leading-relaxed">{props.children}</div>
        </div>
      );
    }

    return (
      <blockquote className="border-l-2 border-[var(--zen-cyan)]/60 pl-5 my-6 italic text-[var(--zen-frost)] text-sm bg-[var(--zen-card)] py-2.5">
        {props.children}
      </blockquote>
    );
  },
  pre: CodeBlockPre,
  code: ({ className, children, ...props }: any) => {
    if (className?.includes("language-") || className?.includes("block")) {
      return (
        <code className={`block w-full bg-transparent border-0 p-0 text-inherit font-mono leading-relaxed whitespace-pre ${className || ""}`} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className={`px-1.5 py-0.5 rounded font-mono text-[var(--zen-cyan)] bg-[var(--zen-card)] border border-[var(--zen-border)] text-[0.88em] font-medium inline-block my-0.5 ${className || ""}`}
        {...props}
      >
        {children}
      </code>
    );
  },
  h1: (props: any) => (
    <h1
      className="mt-12 mb-6 text-2xl sm:text-3xl font-semibold text-[var(--zen-snow)] tracking-wider uppercase border-b border-[var(--zen-border)] pb-3"
      style={{ fontFamily: "var(--font-zen-display, serif)" }}
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="mt-10 mb-5 text-xl sm:text-2xl font-semibold text-[var(--zen-snow)] tracking-wider uppercase flex items-center gap-2.5"
      style={{ fontFamily: "var(--font-zen-display, serif)" }}
      {...props}
    >
      <span className="text-[var(--zen-cyan)] text-sm">◇</span>
      <span>{props.children}</span>
    </h2>
  ),
  h3: (props: any) => (
    <h3
      className="mt-8 mb-4 text-lg font-semibold text-[var(--zen-snow)] tracking-wide flex items-center gap-2"
      style={{ fontFamily: "var(--font-zen-display, serif)" }}
      {...props}
    >
      <span className="w-1.5 h-1.5 bg-[var(--zen-cyan)] rotate-45 shrink-0" />
      <span>{props.children}</span>
    </h3>
  ),
  p: (props: any) => <p className="mb-5 text-[var(--zen-frost)] leading-[1.75] text-sm sm:text-base" {...props} />,
  h4: (props: any) => (
    <h4
      className="mt-6 mb-3 text-base font-semibold text-[var(--zen-snow)] tracking-wide uppercase flex items-center gap-2"
      style={{ fontFamily: "var(--font-zen-display, serif)" }}
      {...props}
    />
  ),
  hr: (props: any) => (
    <hr className="my-8 border-none h-px bg-gradient-to-r from-transparent via-[var(--zen-border)] to-transparent opacity-60" {...props} />
  ),
  table: ({ children, className, ...props }: any) => (
    <div className="my-8 w-full overflow-x-auto rounded-sm border border-[var(--zen-border)] bg-[var(--zen-card)] shadow-lg">
      <table className={`w-full border-collapse text-left text-sm ${className || ""}`} {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, className, ...props }: any) => (
    <thead className={`border-b border-[var(--zen-border)] bg-[var(--zen-void)]/90 text-xs font-mono uppercase tracking-wider text-[var(--zen-cyan)] ${className || ""}`} {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, className, ...props }: any) => (
    <tbody className={`divide-y divide-[var(--zen-border)]/40 ${className || ""}`} {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, className, ...props }: any) => (
    <tr className={`transition-colors duration-150 hover:bg-[var(--zen-cyan)]/[0.04] even:bg-[var(--zen-void)]/30 ${className || ""}`} {...props}>
      {children}
    </tr>
  ),
  th: ({ children, className, style, align, ...props }: any) => {
    const alignClass = align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";
    return (
      <th
        className={`px-4 py-3 font-semibold text-[var(--zen-cyan)] border-r border-[var(--zen-border)]/40 last:border-r-0 whitespace-nowrap text-xs font-mono uppercase tracking-wider ${alignClass} ${className || ""}`}
        style={style}
        align={align}
        {...props}
      >
        {children}
      </th>
    );
  },
  td: ({ children, className, style, align, ...props }: any) => {
    const alignClass = align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";
    return (
      <td
        className={`px-4 py-3 text-xs sm:text-sm text-[var(--zen-frost)] border-r border-[var(--zen-border)]/20 last:border-r-0 leading-relaxed ${alignClass} ${className || ""}`}
        style={style}
        align={align}
        {...props}
      >
        {children}
      </td>
    );
  },
};

// Parser to extract Multiple Choice Questions into structured items
function parseMCQSection(content: string): { articleContent: string; mcqItems: MCQItem[] } {
  const mcqHeaderMatch = content.match(/\n## Multiple Choice Questions\s*\n([\s\S]*?)(?=\n## References & Navigation|\n## [^\n]+|$)/i);

  if (!mcqHeaderMatch) {
    return { articleContent: content, mcqItems: [] };
  }

  const fullMCQBlock = mcqHeaderMatch[1];
  const articleContent = content.replace(mcqHeaderMatch[0], "");

  const parts = fullMCQBlock.split(/### Answer Key & Explanations/i);
  const questionsRaw = parts[0] || "";
  const answersRaw = parts[1] || "";

  // Parse answer explanations
  const answersMap: Record<number, { key: string; explanation: string }> = {};
  const answerRegex = /(\d+)\.\s*\*\*([A-D])\*\*\.?\s*([\s\S]*?)(?=(?:\n\d+\.\s*\*\*)|$)/g;
  let ansMatch;
  while ((ansMatch = answerRegex.exec(answersRaw)) !== null) {
    const qNum = parseInt(ansMatch[1], 10);
    const key = ansMatch[2].toUpperCase();
    const explanation = ansMatch[3].trim().replace(/\n+/g, " ");
    answersMap[qNum] = { key, explanation };
  }

  // Parse questions and options
  const mcqItems: MCQItem[] = [];
  const questionBlocks = questionsRaw.split(/\n(?=\d+\.\s+)/);

  for (const block of questionBlocks) {
    const qMatch = block.match(/^(\d+)\.\s+([\s\S]*?)(?=\n\s*-\s*\*\*A\))/);
    if (!qMatch) continue;

    const id = parseInt(qMatch[1], 10);
    const question = qMatch[2].trim().replace(/\n+/g, " ");

    const options: { key: string; text: string }[] = [];
    const optRegex = /-\s*\*\*([A-D])\)\*\*\s*([^\n]+)/g;
    let optMatch;
    while ((optMatch = optRegex.exec(block)) !== null) {
      options.push({
        key: optMatch[1].toUpperCase(),
        text: optMatch[2].trim(),
      });
    }

    if (options.length > 0) {
      const answerInfo = answersMap[id] || { key: "A", explanation: "No explicit explanation recorded." };
      mcqItems.push({
        id,
        question,
        options,
        answerKey: answerInfo.key,
        explanation: answerInfo.explanation,
      });
    }
  }

  return { articleContent, mcqItems };
}

// Helper to normalize indented list items outside fenced code blocks so CommonMark doesn't turn them into code blocks
function normalizeIndentedLists(text: string): string {
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts
    .map((part, index) => {
      // Even indices are outside fenced code blocks
      if (index % 2 === 0) {
        return part.replace(/^([ \t]{4,}|\t+)([-*+]|\d+\.) /gm, '$2 ');
      }
      return part;
    })
    .join('');
}

export default function MarkdownRender({ content }: { content: string }) {
  const { cleanContent, mcqItems } = useMemo(() => {
    // Strip Document Metadata block
    let cleaned = content.replace(/> \[!info\] Document Metadata[\s\S]*?(?=\n\n[^>]|$)/i, "");
    // Strip YAML frontmatter
    cleaned = cleaned.replace(/^---\n[\s\S]*?\n---\n/, "");

    // Normalize indented lists outside code blocks
    cleaned = normalizeIndentedLists(cleaned);

    const { articleContent, mcqItems } = parseMCQSection(cleaned);
    return { cleanContent: articleContent, mcqItems };
  }, [content]);

  const file = useMemo(() => {
    const processor = unified()
      .use(remarkParse)
      .use(remarkWikilink)
      .use(remarkGfm)
      .use(remarkBreaks)
      .use(remarkMath)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeSlug)
      .use(rehypeKatex)
      .use(rehypeReact, {
        Fragment: React.Fragment,
        jsx: prod.jsx,
        jsxs: prod.jsxs,
        components,
      } as any);

    return processor.processSync(cleanContent);
  }, [cleanContent]);

  return (
    <article className="max-w-3xl mx-auto w-full">
      <div className="markdown-body leading-relaxed">{file.result}</div>
      {mcqItems.length > 0 && <MCQSection items={mcqItems} />}
    </article>
  );
}
