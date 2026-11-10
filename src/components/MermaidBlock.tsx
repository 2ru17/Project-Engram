"use client";

import { useEffect, useRef, useState, useId, useCallback } from "react";
import mermaid from "mermaid";
import katex from "katex";
import { useTheme } from "@/components/ThemeProvider";

interface MermaidBlockProps {
  chart: string;
}

// Pre-process Mermaid chart syntax to ensure unquoted labels containing LaTeX or parentheses do not crash the parser
function preprocessMermaidChart(rawChart: string): string {
  const chart = rawChart.replace(/^```mermaid\s*/i, "").replace(/```$/i, "").trim();
  const lines = chart.split("\n");

  const processed = lines.map((line) => {
    if (/^\s*%%/.test(line) || !line.trim()) return line;
    let out = "";
    let i = 0;

    while (i < line.length) {
      // If we encounter a double-quoted string, preserve it and advance past closing quote
      if (line[i] === '"') {
        let j = i + 1;
        while (j < line.length && line[j] !== '"') {
          if (line[j] === "\\") j++;
          j++;
        }
        out += line.slice(i, Math.min(j + 1, line.length));
        i = j + 1;
        continue;
      }

      // Check for edge label: | ... | that contains $ but is not quoted
      const isConnector = /(?:-->|---|-.->|-.-|==>|===|<-->|<---|~~~|--)\s*$/.test(out);
      if (line[i] === "|" && isConnector) {
        const endIdx = line.indexOf("|", i + 1);
        if (endIdx !== -1) {
          const content = line.slice(i + 1, endIdx);
          const trimmed = content.trim();
          if (trimmed.includes("$") && !trimmed.startsWith('"')) {
            out += `|"${trimmed.replace(/"/g, "&quot;")}"|`;
            i = endIdx + 1;
            continue;
          }
        }
      }

      // Check for node label opening: [, (, {, ([ , [( , [[ , (( , {{, [/, [\
      const idMatch = out.match(/([a-zA-Z0-9_.-]+)\s*$/);
      if (idMatch) {
        const twoChar = line.slice(i, i + 2);
        const pairs = [
          { open: "([", close: "])" },
          { open: "[(", close: ")]" },
          { open: "[[", close: "]]" },
          { open: "((", close: "))" },
          { open: "{{", close: "}}" },
          { open: "[/", close: "/]" },
          { open: "[\\", close: "\\]" },
        ];
        const foundPair = pairs.find((p) => p.open === twoChar);
        let openDelim = foundPair ? foundPair.open : null;
        let closeDelim = foundPair ? foundPair.close : null;

        if (!foundPair) {
          if (line[i] === "[") {
            openDelim = "[";
            closeDelim = "]";
          } else if (line[i] === "{") {
            openDelim = "{";
            closeDelim = "}";
          } else if (line[i] === "(") {
            openDelim = "(";
            closeDelim = ")";
          }
        }

        if (openDelim && closeDelim) {
          const startContent = i + openDelim.length;
          let closeIdx = -1;

          if (openDelim === "(" && closeDelim === ")") {
            let depth = 1;
            for (let j = startContent; j < line.length; j++) {
              if (line[j] === "(") depth++;
              else if (line[j] === ")") {
                depth--;
                if (depth === 0) {
                  closeIdx = j;
                  break;
                }
              }
            }
          } else if (openDelim === "[" && closeDelim === "]") {
            let depth = 1;
            for (let j = startContent; j < line.length; j++) {
              if (line[j] === "[") depth++;
              else if (line[j] === "]") {
                depth--;
                if (depth === 0) {
                  closeIdx = j;
                  break;
                }
              }
            }
          } else if (openDelim === "{" && closeDelim === "}") {
            let depth = 1;
            for (let j = startContent; j < line.length; j++) {
              if (line[j] === "{") depth++;
              else if (line[j] === "}") {
                depth--;
                if (depth === 0) {
                  closeIdx = j;
                  break;
                }
              }
            }
          } else {
            closeIdx = line.indexOf(closeDelim, startContent);
          }

          if (closeIdx !== -1) {
            const inner = line.slice(startContent, closeIdx);
            const trimmedInner = inner.trim();
            if (trimmedInner.includes("$") && !trimmedInner.startsWith('"')) {
              const safeInner = trimmedInner.replace(/"/g, "&quot;");
              out += `${openDelim}"${safeInner}"${closeDelim}`;
              i = closeIdx + closeDelim.length;
              continue;
            }
          }
        }
      }

      out += line[i];
      i++;
    }
    return out;
  });

  return processed.join("\n");
}

// Post-process rendered Mermaid DOM/SVG to typeset inline $...$ and block $$...$$ formulas via KaTeX
function renderKatexInContainer(container: HTMLElement) {
  const k = (katex as any)?.default?.renderToString ? (katex as any).default : katex;

  // 1. Convert SVG text elements containing $ to foreignObject so KaTeX HTML renders properly
  const textElements = Array.from(container.querySelectorAll("text"));
  for (const textEl of textElements) {
    if (textEl.closest("style") || textEl.closest("script") || textEl.querySelector(".katex")) {
      continue;
    }
    const raw = textEl.textContent || "";
    if (/\$(?:\\\$|[^\$\n])+\$/.test(raw)) {
      const rawX = parseFloat(textEl.getAttribute("x") || "0");
      const rawY = parseFloat(textEl.getAttribute("y") || "0");
      const textAnchor = textEl.getAttribute("text-anchor") || "start";
      const dominantBaseline = textEl.getAttribute("dominant-baseline") || "";
      const fontSize = window.getComputedStyle(textEl).fontSize || "13px";
      const fontSizeNum = parseFloat(fontSize) || 13;

      const foWidth = 320;
      const foHeight = 60;

      let foX = rawX;
      let textAlign: "left" | "center" | "right" = "left";
      if (textAnchor === "middle") {
        foX = rawX - foWidth / 2;
        textAlign = "center";
      } else if (textAnchor === "end") {
        foX = rawX - foWidth;
        textAlign = "right";
      }

      let foY = rawY;
      if (dominantBaseline === "middle" || dominantBaseline === "central") {
        foY = rawY - foHeight / 2;
      } else {
        foY = rawY - fontSizeNum * 1.1;
      }

      const fo = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
      fo.setAttribute("x", String(foX));
      fo.setAttribute("y", String(foY));
      fo.setAttribute("width", String(foWidth));
      fo.setAttribute("height", String(foHeight));
      fo.setAttribute("overflow", "visible");

      const div = document.createElement("div");
      div.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
      div.style.display = "block";
      div.style.textAlign = textAlign;
      div.style.fontFamily = "ui-sans-serif, system-ui, sans-serif";
      div.style.fontSize = fontSize;
      div.style.color = "inherit";

      const parts = raw.split(/(\$\$[\s\S]+?\$\$|\$(?:\\\$|[^\$\n])+?\$)/g);
      for (const part of parts) {
        if (part.startsWith("$") && part.endsWith("$")) {
          const isBlock = part.startsWith("$$");
          const math = part.replace(/^\$+|\$+$/g, "").trim();
          try {
            const span = document.createElement("span");
            span.className = isBlock ? "mermaid-katex-block" : "mermaid-katex-inline";
            span.innerHTML = k.renderToString(math, {
              displayMode: isBlock,
              throwOnError: false,
            });
            div.appendChild(span);
          } catch {
            div.appendChild(document.createTextNode(part));
          }
        } else if (part) {
          div.appendChild(document.createTextNode(part));
        }
      }
      fo.appendChild(div);
      textEl.parentNode?.replaceChild(fo, textEl);
    }
  }

  // 2. Render math inside HTML elements within foreignObject
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
  const textNodes: Text[] = [];
  let cur: Node | null;
  while ((cur = walker.nextNode())) {
    const parentEl = cur.parentElement;
    if (
      parentEl &&
      (parentEl.closest(".katex") ||
        parentEl.closest(".mermaid-katex-inline") ||
        parentEl.closest("style") ||
        parentEl.closest("script"))
    ) {
      continue;
    }
    if (cur.nodeValue && /\$(?:\\\$|[^\$\n])+\$/.test(cur.nodeValue)) {
      textNodes.push(cur as Text);
    }
  }

  for (const node of textNodes) {
    const parent = node.parentNode;
    if (!parent) continue;
    const parts = (node.nodeValue || "").split(/(\$\$[\s\S]+?\$\$|\$(?:\\\$|[^\$\n])+?\$)/g);
    if (parts.length <= 1) continue;

    const frag = document.createDocumentFragment();
    for (const part of parts) {
      if (part.startsWith("$") && part.endsWith("$")) {
        const isBlock = part.startsWith("$$");
        const math = part.replace(/^\$+|\$+$/g, "").trim();
        try {
          const span = document.createElement("span");
          span.className = isBlock ? "mermaid-katex-block" : "mermaid-katex-inline";
          span.innerHTML = k.renderToString(math, {
            displayMode: isBlock,
            throwOnError: false,
          });
          frag.appendChild(span);
        } catch {
          frag.appendChild(document.createTextNode(part));
        }
      } else if (part) {
        frag.appendChild(document.createTextNode(part));
      }
    }
    parent.replaceChild(frag, node);
  }
}

export default function MermaidBlock({ chart }: MermaidBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [zoom, setZoom] = useState(1);
  const uniqueId = useId().replace(/:/g, "_");
  const { theme, universe } = useTheme();
  const isLight =
    universe === "neo-brutalism" ||
    universe === "minimalism" ||
    universe === "broken-grid" ||
    (universe === "cyber-zen" && theme === "light");
  const accentColor =
    universe === "neo-brutalism"
      ? "#C5221F"
      : universe === "minimalism"
      ? "#111111"
      : universe === "parallax"
      ? "#8B5CF6"
      : universe === "broken-grid"
      ? "#0D5C3A"
      : isLight
      ? "#0284C7"
      : "#00E5FF";

  const renderChart = useCallback(async () => {
    if (!containerRef.current) return;
    let renderId = "";

    try {
      // Configure Mermaid for current theme
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: "base",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        flowchart: {
          htmlLabels: true,
          curve: "basis",
          useMaxWidth: false,
          padding: 16,
        },
        themeVariables: isLight
          ? {
              darkMode: false,
              background: "transparent",
              mainBkg: universe === "neo-brutalism" ? "#FFFFFF" : "#FFFDF7",
              nodeBorder: universe === "neo-brutalism" ? "#0A0A0A" : accentColor,
              textColor: "#09090B",
              nodeTextColor: "#09090B",
              lineColor: universe === "neo-brutalism" ? "#0A0A0A" : accentColor,
              edgeLabelBackground: "#F8F5EC",
              clusterBkg: "#F0ECE1",
              clusterBorder: "#C0B5A3",
              primaryColor: "#FFFDF7",
              primaryTextColor: "#09090B",
              primaryBorderColor: universe === "neo-brutalism" ? "#0A0A0A" : accentColor,
              secondaryColor: "#F8F5EC",
              secondaryTextColor: "#09090B",
              secondaryBorderColor: "#C0B5A3",
              tertiaryColor: "#EAE4D5",
              tertiaryTextColor: "#09090B",
              tertiaryBorderColor: "#C0B5A3",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              fontSize: "13px",
              actorBkg: "#FFFDF7",
              actorBorder: "#0284C7",
              actorTextColor: "#09090B",
              actorLineColor: "#0284C7",
              signalColor: "#0284C7",
              signalTextColor: "#09090B",
              labelBoxBkgColor: "#F8F5EC",
              labelBoxBorderColor: "#C0B5A3",
              labelTextColor: "#09090B",
              loopTextColor: "#09090B",
              activationBorderColor: "#0284C7",
              activationBkgColor: "rgba(2, 132, 199, 0.12)",
              sequenceNumberColor: "#FFFFFF",
            }
          : {
              darkMode: true,
              background: "transparent",
              mainBkg: "#080d17",
              nodeBorder: accentColor,
              textColor: "#f8fafc",
              nodeTextColor: "#f8fafc",
              lineColor: accentColor,
              edgeLabelBackground: "#05080f",
              clusterBkg: "#05080f",
              clusterBorder: "#1e304d",
              primaryColor: "#080d17",
              primaryTextColor: "#f8fafc",
              primaryBorderColor: accentColor,
              secondaryColor: "#0c1422",
              secondaryTextColor: "#f8fafc",
              secondaryBorderColor: "#1e304d",
              tertiaryColor: "#121e33",
              tertiaryTextColor: "#f8fafc",
              tertiaryBorderColor: "#1e304d",
              fontFamily: "ui-sans-serif, system-ui, sans-serif",
              fontSize: "13px",
              actorBkg: "#080d17",
              actorBorder: "#00E5FF",
              actorTextColor: "#f8fafc",
              actorLineColor: "#00E5FF",
              signalColor: "#00E5FF",
              signalTextColor: "#f8fafc",
              labelBoxBkgColor: "#05080f",
              labelBoxBorderColor: "#1e304d",
              labelTextColor: "#f8fafc",
              loopTextColor: "#f8fafc",
              activationBorderColor: "#00E5FF",
              activationBkgColor: "rgba(0, 229, 255, 0.15)",
              sequenceNumberColor: "#000000",
            },
        themeCSS: `
          .node rect, .node circle, .node polygon, .node path {
            stroke-width: 1.5px !important;
            rx: 6px !important;
            ry: 6px !important;
          }
          .node .label, .node span, .node p, .node div, text.actor, .messageText, .labelText, text.nodeLabel {
            font-family: ui-sans-serif, system-ui, sans-serif !important;
            color: ${isLight ? "#09090B" : "#f8fafc"} !important;
            fill: ${isLight ? "#09090B" : "#f8fafc"} !important;
            font-size: 13px !important;
            line-height: 1.45 !important;
          }
          .edgeLabel, .edgeLabel span {
            color: ${isLight ? "#57534E" : "#94a3b8"} !important;
            fill: ${isLight ? "#57534E" : "#94a3b8"} !important;
            font-size: 11px !important;
            background-color: ${isLight ? "#F8F5EC" : "#05080f"} !important;
            padding: 2px 4px !important;
            border-radius: 4px !important;
          }
          .flowchart-link {
            stroke: ${universe === "neo-brutalism" ? "#0A0A0A" : accentColor} !important;
            stroke-width: 1.5px !important;
          }
          .marker {
            fill: ${universe === "neo-brutalism" ? "#0A0A0A" : accentColor} !important;
            stroke: ${universe === "neo-brutalism" ? "#0A0A0A" : accentColor} !important;
          }
          .node .katex, .edgeLabel .katex, .mermaid-katex-inline .katex {
            color: inherit !important;
            font-size: 1.02em !important;
          }
          .mermaid-katex-inline {
            display: inline-block;
            vertical-align: baseline;
            margin: 0 1px;
          }
          .mermaid-katex-block {
            display: block;
            margin: 4px 0;
            text-align: center;
          }
        `,
      });

      if (typeof window !== "undefined") {
        (window as any).katex = katex;
      }

      // Ensure web fonts are loaded before Dagre measures node labels
      if (typeof document !== "undefined" && document.fonts?.ready) {
        await document.fonts.ready;
      }

      renderId = `mermaid_${uniqueId}_${Date.now()}`;
      const safeChart = preprocessMermaidChart(chart);
      let svg = "";
      try {
        const res = await mermaid.render(renderId, safeChart);
        svg = res.svg;
      } catch (err: unknown) {
        try {
          const res = await mermaid.render(renderId + "_raw", chart);
          svg = res.svg;
        } catch {
          throw err;
        }
      }

      if (!containerRef.current) return;

      // Safely modify ONLY the root <svg> element via DOMParser without corrupting child elements
      const parser = new DOMParser();
      const doc = parser.parseFromString(svg, "image/svg+xml");
      const svgEl = doc.querySelector("svg");

      if (svgEl) {
        const viewBox = svgEl.getAttribute("viewBox");
        let intrinsicWidth = 650;
        if (viewBox) {
          const parts = viewBox.trim().split(/[\s,]+/);
          if (parts.length === 4) {
            const parsed = parseFloat(parts[2]);
            if (!isNaN(parsed) && parsed > 50) {
              intrinsicWidth = parsed;
            }
          }
        }

        svgEl.removeAttribute("height");
        svgEl.removeAttribute("width");
        svgEl.style.maxWidth = `min(100%, ${Math.ceil(intrinsicWidth)}px)`;
        svgEl.style.width = "100%";
        svgEl.style.height = "auto";
        svgEl.style.display = "block";
        svgEl.style.margin = "0 auto";

        containerRef.current.innerHTML = svgEl.outerHTML;
      } else {
        containerRef.current.innerHTML = svg;
      }

      // Post-process to render KaTeX math in node labels, edge labels and foreignObjects
      renderKatexInContainer(containerRef.current);
      setError(null);
    } catch (e: unknown) {
      if (typeof document !== "undefined" && renderId) {
        document.getElementById(renderId)?.remove();
        document.getElementById("d" + renderId)?.remove();
      }
      if (!containerRef.current) return;
      setError(e instanceof Error ? e.message : "Mermaid render error");
    }
  }, [chart, isLight, universe, accentColor, uniqueId]);

  useEffect(() => {
    let isMounted = true;
    renderChart();
    return () => {
      isMounted = false;
    };
  }, [renderChart]);

  const handleCopy = () => {
    navigator.clipboard.writeText(chart);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.15, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.15, 0.6));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="universe-card relative my-8 border border-[var(--zen-border)] bg-[var(--zen-card)] group shadow-xl overflow-hidden transition-colors duration-300 break-inside-avoid">
      {/* Corner Brackets (Cyber-Zen only) */}
      {universe === "cyber-zen" && (
        <>
          <span className="pointer-events-none absolute -top-2 -left-1 font-mono text-xs text-[var(--zen-cyan)] select-none z-10">
            『
          </span>
          <span className="pointer-events-none absolute -bottom-2 -right-1 font-mono text-xs text-[var(--zen-cyan)] select-none z-10">
            』
          </span>
        </>
      )}

      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--zen-border)] bg-[var(--zen-void)]/70 text-xs font-mono select-none">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-[10px] tracking-widest text-[var(--zen-cyan)] border border-[var(--zen-cyan)]/30 bg-[var(--zen-cyan)]/5 font-semibold">
            TOPOLOGY
          </span>
          <span className="text-[10px] tracking-wider text-[var(--zen-ink-muted)] hidden sm:inline">
            {universe === "cyber-zen" ? "// 構造図" : "// ARCHITECTURAL DIAGRAM"}
          </span>
        </div>

        <div className="flex items-center gap-3 print:hidden">
          {/* Zoom Controls */}
          <div className="flex items-center gap-1 border border-[var(--zen-border)] rounded px-1.5 py-0.5 bg-[var(--zen-card)]">
            <button
              onClick={handleZoomOut}
              className="text-[11px] text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] transition-colors px-1 font-mono"
              title="Zoom Out"
              aria-label="Zoom out diagram"
            >
              −
            </button>
            <button
              onClick={handleResetZoom}
              className="text-[10px] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] transition-colors px-1 font-mono tracking-tighter"
              title="Reset Zoom"
              aria-label="Reset zoom level"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              onClick={handleZoomIn}
              className="text-[11px] text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] transition-colors px-1 font-mono"
              title="Zoom In"
              aria-label="Zoom in diagram"
            >
              +
            </button>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] transition-colors tracking-wider uppercase text-[11px]"
          >
            {copied ? "COPIED" : "COPY"}
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 border-b border-red-500/30 bg-red-500/5 font-mono text-xs text-red-400 overflow-x-auto w-full">
          <span className="opacity-60">mermaid error: </span>
          {error}
        </div>
      )}

      {/* Diagram Viewport */}
      <div className="p-6 overflow-x-auto overflow-y-hidden custom-scrollbar bg-[var(--zen-void)]/40 flex justify-center items-center min-h-[160px]">
        <div
          ref={containerRef}
          style={{ transform: `scale(${zoom})`, transformOrigin: "top center", transition: "transform 0.15s ease-out" }}
          className={`mermaid-svg-container w-full max-w-full flex justify-center items-center ${error ? "hidden" : ""}`}
        />
      </div>
    </div>
  );
}
