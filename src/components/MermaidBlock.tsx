"use client";

import { useEffect, useRef, useState, useId, useCallback } from "react";
import mermaid from "mermaid";
import { useTheme } from "@/components/ThemeProvider";

interface MermaidBlockProps {
  chart: string;
}

export default function MermaidBlock({ chart }: MermaidBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [zoom, setZoom] = useState(1);
  const uniqueId = useId().replace(/:/g, "_");
  const { theme } = useTheme();
  const isLight = theme === "light";

  const renderChart = useCallback(async () => {
    if (!containerRef.current) return;

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
              mainBkg: "#FFFDF7",
              nodeBorder: "#0284C7",
              textColor: "#09090B",
              nodeTextColor: "#09090B",
              lineColor: "#0284C7",
              edgeLabelBackground: "#F8F5EC",
              clusterBkg: "#F0ECE1",
              clusterBorder: "#C0B5A3",
              primaryColor: "#FFFDF7",
              primaryTextColor: "#09090B",
              primaryBorderColor: "#0284C7",
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
              nodeBorder: "#00E5FF",
              textColor: "#f8fafc",
              nodeTextColor: "#f8fafc",
              lineColor: "#00E5FF",
              edgeLabelBackground: "#05080f",
              clusterBkg: "#05080f",
              clusterBorder: "#1e304d",
              primaryColor: "#080d17",
              primaryTextColor: "#f8fafc",
              primaryBorderColor: "#00E5FF",
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
            stroke: ${isLight ? "#0284C7" : "#00E5FF"} !important;
            stroke-width: 1.5px !important;
          }
          .marker {
            fill: ${isLight ? "#0284C7" : "#00E5FF"} !important;
            stroke: ${isLight ? "#0284C7" : "#00E5FF"} !important;
          }
        `,
      });

      // Ensure web fonts are loaded before Dagre measures node labels
      if (typeof document !== "undefined" && document.fonts?.ready) {
        await document.fonts.ready;
      }

      const renderId = `mermaid_${uniqueId}_${Date.now()}`;
      const { svg } = await mermaid.render(renderId, chart);

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

        // Clean root svg dimensions safely
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
      setError(null);
    } catch (e: unknown) {
      if (!containerRef.current) return;
      setError(e instanceof Error ? e.message : "Mermaid render error");
    }
  }, [chart, isLight, uniqueId]);

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
    <div className="relative my-8 border border-[var(--zen-border)] bg-[var(--zen-card)] group shadow-xl overflow-hidden transition-colors duration-300">
      {/* Corner Brackets */}
      <span className="pointer-events-none absolute -top-2 -left-1 font-mono text-xs text-[var(--zen-cyan)] select-none z-10">
        『
      </span>
      <span className="pointer-events-none absolute -bottom-2 -right-1 font-mono text-xs text-[var(--zen-cyan)] select-none z-10">
        』
      </span>

      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--zen-border)] bg-[var(--zen-void)]/70 text-xs font-mono select-none">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-[10px] tracking-widest text-[var(--zen-cyan)] border border-[var(--zen-cyan)]/30 bg-[var(--zen-cyan)]/5 font-semibold">
            TOPOLOGY
          </span>
          <span className="text-[10px] tracking-wider text-[var(--zen-ink-muted)] hidden sm:inline">
            // 構造図
          </span>
        </div>

        <div className="flex items-center gap-3">
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
