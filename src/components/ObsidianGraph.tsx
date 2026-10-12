"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "motion/react";

export default function ObsidianGraph() {
  const { theme, isLite } = useTheme();
  const isLight = theme === "light";
  const [data, setData] = useState({ nodes: [], links: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoverNode, setHoverNode] = useState<any>(null);
  const hoverNodeRef = useRef<any>(null);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/graph")
      .then((res) => res.json())
      .then((fetchedData) => {
        const degreeMap = new Map();
        fetchedData.links.forEach((link: any) => {
          const src = typeof link.source === "object" ? link.source.id : link.source;
          const tgt = typeof link.target === "object" ? link.target.id : link.target;
          degreeMap.set(src, (degreeMap.get(src) || 0) + 1);
          degreeMap.set(tgt, (degreeMap.get(tgt) || 0) + 1);
        });

        fetchedData.nodes.forEach((node: any) => {
          node.degree = degreeMap.get(node.id) || 1;
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.random() * 20;
          node.x = Math.cos(angle) * dist;
          node.y = Math.sin(angle) * dist;
          node.vx = (Math.random() - 0.5) * 30;
          node.vy = (Math.random() - 0.5) * 30;
        });

        setData(fetchedData);
        setIsLoading(false);
      });

    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }

    let timeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (containerRef.current) {
          setDimensions({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
          });
        }
      }, 150);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [isLight]);

  // Forces setup
  useEffect(() => {
    if (fgRef.current && data.nodes.length > 0) {
      fgRef.current.d3Force("charge")?.strength(-120);
      fgRef.current.d3Force("link")?.distance(() => 40);

      if (!fgRef.current.d3Force("centerGravity")) {
        const d3 = require("d3-force");
        fgRef.current.d3Force("centerGravity", d3.forceRadial(0, 0, 0).strength(0.05));
      }

      if (!isLite && !fgRef.current.d3Force("magnetic")) {
        fgRef.current.d3Force("magnetic", (alpha: number) => {
          const hn = hoverNodeRef.current;
          if (hn) {
            data.nodes.forEach((n: any) => {
              if (n !== hn) {
                const dx = hn.x - (n.x || 0);
                const dy = hn.y - (n.y || 0);
                const distSq = dx * dx + dy * dy;
                if (distSq < 22500) {
                  const dist = Math.sqrt(distSq);
                  n.vx = (n.vx || 0) + (dx / dist) * 0.15 * alpha;
                  n.vy = (n.vy || 0) + (dy / dist) * 0.15 * alpha;
                }
              }
            });
          }
        });
      }

      if (!isLite && !fgRef.current.d3Force("spin")) {
        let ticks = 0;
        fgRef.current.d3Force("spin", () => {
          ticks++;
          const spinDecay = Math.max(0, 1 - ticks / 6000);
          const spinStrength = 0.0005 * spinDecay;
          if (spinStrength > 0) {
            data.nodes.forEach((node: any) => {
              const dist = Math.sqrt((node.x || 0) ** 2 + (node.y || 0) ** 2);
              if (dist > 0) {
                const dx = -(node.y || 0) / dist;
                const dy = (node.x || 0) / dist;
                node.vx = (node.vx || 0) + dx * spinStrength;
                node.vy = (node.vy || 0) + dy * spinStrength;
              }
            });
          }
        });
      }

      fgRef.current.d3ReheatSimulation();
    }
  }, [data]);

  const handleNodeHover = useCallback((node: any) => {
    setHoverNode(node || null);
    hoverNodeRef.current = node || null;
  }, []);

  const handleNodeClick = useCallback((node: any) => {
    setSelectedNode(node);
  }, []);

  const handleBackgroundClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const DARK_PALETTE = [
    "#00E5FF", "#4A90E2", "#7B61FF", "#00BFA5", "#64B5F6", "#8C9EFF",
    "#29B6F6", "#1DE9B6", "#5C6BC0", "#80D8FF", "#A7FFEB", "#B388FF",
  ];
  const LIGHT_PALETTE = [
    "#008394", "#1E5CA0", "#5B43D6", "#008C78", "#1976D2", "#536DFE",
    "#0288D1", "#009688", "#3949AB", "#00B0FF", "#1DE9B6", "#7C4DFF",
  ];
  const PALETTE = isLight ? LIGHT_PALETTE : DARK_PALETTE;

  const getCourseFromId = (id: string) => {
    if (!id) return "";
    const parts = id.split("/");
    if (parts.length >= 3) return parts[2];
    return id;
  };

  const getHash = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
    return Math.abs(hash);
  };

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  };

  const getNodeColor = useCallback(
    (node: any) => {
      if (node.isVirtual) return isLight ? "rgba(100, 116, 139, 0.4)" : "rgba(247, 247, 245, 0.4)";
      const course = getCourseFromId(node.id);
      const colorIndex = getHash(course) % PALETTE.length;
      return PALETTE[colorIndex];
    },
    [isLight]
  );

  const getLinkColor = useCallback(
    (link: any) => {
      const srcId = typeof link.source === "object" ? link.source.id : link.source;
      const tgtId = typeof link.target === "object" ? link.target.id : link.target;
      const isConnectedToHover = hoverNode && (hoverNode.id === srcId || hoverNode.id === tgtId);
      const isConnectedToSelect = selectedNode && (selectedNode.id === srcId || selectedNode.id === tgtId);
      if (isConnectedToSelect || isConnectedToHover) return "rgba(0, 229, 255, 0.8)";
      const course = getCourseFromId(srcId);
      const colorIndex = getHash(course) % PALETTE.length;
      return `rgba(${hexToRgb(PALETTE[colorIndex])}, 0.14)`;
    },
    [hoverNode, selectedNode, isLight]
  );

  const getLinkWidth = useCallback(
    (link: any) => {
      const srcId = typeof link.source === "object" ? link.source.id : link.source;
      const tgtId = typeof link.target === "object" ? link.target.id : link.target;
      const isConnected =
        (hoverNode && (hoverNode.id === srcId || hoverNode.id === tgtId)) ||
        (selectedNode && (selectedNode.id === srcId || selectedNode.id === tgtId));
      return isConnected ? 1.5 : 0.5;
    },
    [hoverNode, selectedNode]
  );

  const renderNode = useCallback(
    (node: any, ctx: any, globalScale: number) => {
      const isHovered = hoverNode && hoverNode.id === node.id;
      const isSelected = selectedNode && selectedNode.id === node.id;
      const label = node.name;

      const baseRadius = node.isVirtual ? 2 : 2.5;
      const degree = Math.max(1, node.degree || 1);
      const sizeMultiplier = 1 + Math.log(degree) * 0.8;
      const rawRadius = baseRadius * sizeMultiplier;
      const maxRadius = node.isVirtual ? 10 : 12;
      let radius = Math.min(rawRadius, maxRadius);

      const baseColor = node.isVirtual
        ? isLight
          ? "rgba(100, 116, 139, 1)"
          : "rgba(247, 247, 245, 1)"
        : getNodeColor(node);
      const shadowColor = node.isVirtual
        ? isLight
          ? "rgba(100, 116, 139, 0.2)"
          : "rgba(247, 247, 245, 0.3)"
        : `rgba(${hexToRgb(baseColor)}, 0.7)`;
      let renderOpacity = 1;

      const isZoomedOut = globalScale < 1.0;
      const doShimmer = isZoomedOut && !isLite && !node.isVirtual && !isHovered && !isSelected;
      if (doShimmer) {
        const time = Date.now();
        const offset = getHash(node.id) % 1000;
        const shimmer = Math.sin((time + offset) / 300) * 0.5 + 0.5;
        renderOpacity = 0.3 + 0.7 * shimmer;
        radius = radius * (0.8 + 0.4 * shimmer);
        ctx.fillStyle = `rgba(${hexToRgb(baseColor)}, ${renderOpacity})`;
      } else {
        ctx.fillStyle = isHovered || isSelected ? "#ffffff" : baseColor;
      }

      const t = Date.now() / 1000;
      const twinkle = isLite
        ? 1
        : Math.sin(t * 3 + (node.id?.charCodeAt ? node.id.charCodeAt(0) : 0)) * 0.3 + 0.7;

      // Glow halo
      const blurRadius =
        isHovered || isSelected ? 16 : (isZoomedOut ? 8 * renderOpacity : 4) * twinkle;
      if (blurRadius > 0) {
        ctx.beginPath();
        ctx.arc(
          node.x,
          node.y,
          radius * (isHovered || isSelected ? 1.2 : twinkle) + blurRadius / 2,
          0,
          2 * Math.PI,
          false
        );
        ctx.fillStyle =
          isHovered || isSelected
            ? shadowColor
            : `rgba(${hexToRgb(baseColor)}, ${0.15 * twinkle})`;
        ctx.fill();
      }

      const isHub = node.degree >= 8;
      const isMidHub = node.degree >= 3;

      // Astronomical Four-Point Star Flares for hubs or selected nodes
      if (isHub || isHovered || isSelected) {
        const flareLen = radius * (isHovered || isSelected ? 2.5 : 1.8);
        ctx.strokeStyle =
          isHovered || isSelected
            ? "rgba(0, 229, 255, 0.9)"
            : `rgba(${hexToRgb(baseColor)}, 0.6)`;
        ctx.lineWidth = Math.max(0.6, 1.2 / globalScale);
        ctx.beginPath();
        ctx.moveTo(node.x - flareLen, node.y);
        ctx.lineTo(node.x + flareLen, node.y);
        ctx.moveTo(node.x, node.y - flareLen);
        ctx.lineTo(node.x, node.y + flareLen);
        ctx.stroke();
      }

      // Draw Node Core
      ctx.beginPath();
      ctx.arc(
        node.x,
        node.y,
        radius * (isHovered || isSelected ? 1.2 : twinkle),
        0,
        2 * Math.PI,
        false
      );
      ctx.fillStyle =
        isHovered || isSelected ? "#ffffff" : `rgba(${hexToRgb(baseColor)}, ${renderOpacity})`;
      ctx.fill();

      // LOD Text Visibility
      const showText =
        isHovered ||
        isSelected ||
        globalScale >= 2.5 ||
        (isHub && globalScale >= 1.5) ||
        (isMidHub && globalScale >= 2.0);

      if (showText) {
        const fontSize =
          isHovered || isSelected
            ? Math.max(8, 14 / globalScale)
            : isHub
            ? Math.max(5.5, 9 / globalScale)
            : Math.max(4.5, 7.5 / globalScale);
        ctx.font = `${isHovered || isSelected ? "600" : "400"} ${fontSize}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const textWidth = ctx.measureText(label).width;
        const padX = fontSize * 0.5;
        const padY = fontSize * 0.35;
        const bckgW = textWidth + padX * 2;
        const bckgH = fontSize + padY * 2;
        const yOffset = radius + bckgH / 2 + 3;

        ctx.fillStyle =
          isHovered || isSelected
            ? isLight
              ? "rgba(255, 255, 255, 0.95)"
              : "rgba(10, 12, 16, 0.95)"
            : isLight
            ? "rgba(245, 240, 232, 0.93)"
            : "rgba(14, 16, 20, 0.8)";
        ctx.beginPath();
        ctx.roundRect(node.x - bckgW / 2, node.y + yOffset - bckgH / 2, bckgW, bckgH, 3);
        ctx.fill();

        ctx.strokeStyle =
          isHovered || isSelected
            ? isLight
              ? "rgba(0, 163, 196, 0.8)"
              : "rgba(0, 229, 255, 0.8)"
            : isLight
            ? "rgba(0, 163, 196, 0.4)"
            : `rgba(${hexToRgb(baseColor)}, 0.4)`;
        ctx.lineWidth = isHovered || isSelected ? 1 : 0.5;
        ctx.stroke();

        ctx.fillStyle =
          isHovered || isSelected
            ? isLight
              ? "#1a0f00"
              : "#ffffff"
            : node.isVirtual
            ? isLight
              ? "rgba(71, 85, 105, 0.9)"
              : "rgba(247, 247, 245, 0.85)"
            : baseColor;
        ctx.fillText(label, node.x, node.y + yOffset);
      }
    },
    [hoverNode, selectedNode, isLight, isLite, getNodeColor]
  );

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-transparent">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black pointer-events-none"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-t-2 border-[#00E5FF] rounded-full animate-spin" />
              <p className="font-mono text-xs tracking-[0.3em] text-[#00E5FF]/80 uppercase">
                CALIBRATING ASTROLABE...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spatial HUD Overlay */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-4 backdrop-blur-xl rounded-lg px-4 py-2 shadow-2xl bg-[var(--zen-card)] border border-[var(--zen-border)]">
        <div className="flex gap-4 text-[10px] font-mono text-[var(--zen-frost)]">
          <span>
            <strong className="text-[var(--zen-cyan)]">{data.nodes.length}</strong> NODES
          </span>
          <span>
            <strong className="text-[var(--zen-cyan)]">{data.links.length}</strong> EDGES
          </span>
        </div>
        <div className="w-px h-4 bg-[var(--zen-border)]" />
        <button
          onClick={() => fgRef.current?.zoomToFit(400, 50)}
          className="text-[10px] font-mono tracking-wider text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] transition-colors uppercase"
        >
          [ RECENTER ]
        </button>
        <button
          onClick={() => fgRef.current?.d3ReheatSimulation()}
          className="text-[10px] font-mono tracking-wider text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] transition-colors uppercase"
        >
          [ SIMULATE ]
        </button>
      </div>

      {/* Selected Node Inspection Card */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-auto sm:w-88 bg-[var(--zen-card)] backdrop-blur-2xl border border-[var(--zen-border)] p-5 rounded-xl shadow-2xl z-50 flex flex-col pointer-events-auto"
          >
            <div className="flex justify-between items-start mb-3 border-b border-[var(--zen-border)] pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-[var(--zen-cyan)] text-sm">◇</span>
                <h3
                  className="text-[var(--zen-snow)] font-semibold text-sm tracking-wider leading-snug uppercase"
                  style={{ fontFamily: "var(--font-zen-display, serif)" }}
                >
                  {selectedNode.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] transition-colors p-1 text-xs font-mono"
                aria-label="Close card"
              >
                ✕
              </button>
            </div>

            <p className="text-[var(--zen-frost)] text-xs leading-relaxed mb-4 line-clamp-4 min-h-[2.5rem]">
              {selectedNode.excerpt || "Technical monograph indexed in Project Engram archive."}
            </p>

            <div className="flex items-center justify-between mb-5 px-3 py-1.5 bg-[var(--zen-cyan)]/5 rounded border border-[var(--zen-cyan)]/20 text-[10px] font-mono">
              <span className="text-[var(--zen-ink-muted)] uppercase">DEGREE // 結合度</span>
              <span className="font-bold text-[var(--zen-cyan)]">{selectedNode.degree} CONNECTIONS</span>
            </div>

            {!selectedNode.isVirtual && selectedNode.path ? (
              <button
                onClick={() => router.push(selectedNode.path)}
                className="w-full py-2.5 bg-[var(--zen-cyan)]/10 hover:bg-[var(--zen-cyan)]/20 border border-[var(--zen-cyan)]/40 hover:border-[var(--zen-cyan)] text-[var(--zen-cyan)] hover:text-[var(--zen-snow)] font-mono text-xs tracking-[0.2em] uppercase transition-all rounded shadow-[0_0_15px_rgba(0,229,255,0.15)] flex items-center justify-center gap-2"
              >
                <span>OPEN MONOGRAPH</span>
                <span>→</span>
              </button>
            ) : (
              <div className="w-full py-2 border border-[var(--zen-border)] text-[var(--zen-ink-muted)] text-center font-mono text-xs tracking-wider uppercase">
                VIRTUAL CONCEPT HUB
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={data}
        backgroundColor="rgba(0,0,0,0)"
        nodeLabel={() => ""}
        nodeColor={getNodeColor}
        linkColor={getLinkColor}
        nodeRelSize={4}
        linkWidth={getLinkWidth}
        linkDirectionalParticles={(link: any) => {
          if (isLite) return 0;
          const hn = hoverNodeRef.current;
          if (hn) {
            const src = typeof link.source === "object" ? link.source.id : link.source;
            const tgt = typeof link.target === "object" ? link.target.id : link.target;
            if (src === hn.id || tgt === hn.id) return 3;
          }
          return 0;
        }}
        linkDirectionalParticleWidth={2.5}
        linkDirectionalParticleSpeed={0.015}
        linkDirectionalParticleColor={() => (isLight ? "#00E5FF" : "#ffffff")}
        d3AlphaDecay={isLite ? 0.03 : 0.008}
        d3VelocityDecay={0.25}
        warmupTicks={120}
        cooldownTicks={isLite ? 200 : 600}
        onNodeHover={handleNodeHover}
        onNodeClick={handleNodeClick}
        onBackgroundClick={handleBackgroundClick}
        nodeCanvasObject={renderNode}
      />
    </div>
  );
}
