"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "motion/react";
import { STAR_DOMAINS, type StarDomainId } from "@/lib/course-registry";

interface GraphNode {
  id: string;
  name: string;
  subtitle?: string;
  tier: "sun" | "star" | "satellite" | "hub";
  courseCode?: string;
  domain?: StarDomainId;
  domainLabel?: string;
  track?: string;
  group: number;
  path: string;
  isVirtual?: boolean;
  excerpt?: string;
  noteCount?: number;
  estimatedMinutes?: number;
  degree?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number;
  fy?: number;
}

interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  kind?: "solar" | "constellation" | "orbital" | "wikilink";
}

const DOMAIN_ANGLES: Record<StarDomainId, [number, number]> = {
  systems: [-Math.PI * 0.45, Math.PI * 0.05],
  theory: [Math.PI * 0.05, Math.PI * 0.55],
  security: [Math.PI * 0.55, Math.PI * 1.05],
  software: [Math.PI * 1.05, Math.PI * 1.55],
};

export default function ObsidianGraph() {
  const { theme, isLite } = useTheme();
  const isLight = theme === "light";
  const [rawData, setRawData] = useState<{ nodes: GraphNode[]; links: GraphLink[] }>({
    nodes: [],
    links: [],
  });
  const [activeDomain, setActiveDomain] = useState<StarDomainId | "all">("all");
  const [starsOnly, setStarsOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoverNode, setHoverNode] = useState<GraphNode | null>(null);
  const hoverNodeRef = useRef<GraphNode | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/graph")
      .then((res) => res.json())
      .then((fetchedData) => {
        const degreeMap = new Map<string, number>();
        fetchedData.links.forEach((link: GraphLink) => {
          const src = typeof link.source === "object" ? link.source.id : link.source;
          const tgt = typeof link.target === "object" ? link.target.id : link.target;
          degreeMap.set(src, (degreeMap.get(src) || 0) + 1);
          degreeMap.set(tgt, (degreeMap.get(tgt) || 0) + 1);
        });

        // Position Course Stars in radial sectors around the Central CS Sun (0,0)
        const starPositions = new Map<string, { x: number; y: number; angle: number }>();
        const domainBuckets: Record<StarDomainId, GraphNode[]> = {
          systems: [],
          theory: [],
          security: [],
          software: [],
        };

        fetchedData.nodes.forEach((node: GraphNode) => {
          node.degree = degreeMap.get(node.id) || 1;
          if (node.tier === "sun") {
            node.fx = 0;
            node.fy = 0;
            node.x = 0;
            node.y = 0;
          } else if (node.tier === "star") {
            const dom: StarDomainId = node.domain || "systems";
            domainBuckets[dom].push(node);
          }
        });

        (Object.keys(domainBuckets) as StarDomainId[]).forEach((dom) => {
          const stars = domainBuckets[dom];
          const [startAngle, endAngle] = DOMAIN_ANGLES[dom];
          stars.forEach((star, idx) => {
            const t = stars.length > 1 ? (idx + 0.5) / stars.length : 0.5;
            const angle = startAngle + t * (endAngle - startAngle);
            const radius = 215 + (idx % 2) * 45;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            star.x = x;
            star.y = y;
            if (star.courseCode) {
              starPositions.set(star.courseCode.toUpperCase(), { x, y, angle });
            }
          });
        });

        // Position Note Satellites in orbit around their parent Course Star
        fetchedData.nodes.forEach((node: GraphNode, idx: number) => {
          if (node.tier === "satellite") {
            const parentPos = node.courseCode
              ? starPositions.get(node.courseCode.toUpperCase())
              : undefined;
            if (parentPos) {
              const localAngle = parentPos.angle + ((idx % 17) - 8) * 0.14;
              const localDist = 45 + (idx % 5) * 18;
              node.x = parentPos.x + Math.cos(localAngle) * localDist;
              node.y = parentPos.y + Math.sin(localAngle) * localDist;
            } else {
              const angle = Math.random() * Math.PI * 2;
              const dist = 380 + Math.random() * 80;
              node.x = Math.cos(angle) * dist;
              node.y = Math.sin(angle) * dist;
            }
          }
        });

        setRawData(fetchedData);
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
  }, []);

  // Filter nodes & links based on activeDomain and starsOnly toggle
  const graphData = useMemo(() => {
    const allowedNodes = rawData.nodes.filter((n) => {
      if (n.tier === "sun") return true;
      if (starsOnly && n.tier === "satellite") return false;
      if (activeDomain !== "all" && n.domain !== activeDomain) return false;
      return true;
    });

    const allowedIds = new Set(allowedNodes.map((n) => n.id));

    const allowedLinks = rawData.links
      .filter((l) => {
        const src = typeof l.source === "object" ? l.source.id : l.source;
        const tgt = typeof l.target === "object" ? l.target.id : l.target;
        return allowedIds.has(src) && allowedIds.has(tgt);
      })
      .map((l) => ({
        ...l,
        source: typeof l.source === "object" ? l.source.id : l.source,
        target: typeof l.target === "object" ? l.target.id : l.target,
      }));

    return {
      nodes: allowedNodes,
      links: allowedLinks,
    };
  }, [rawData, activeDomain, starsOnly]);

  // Configure Heliocentric Orbital Forces
  useEffect(() => {
    if (fgRef.current && graphData.nodes.length > 0) {
      const d3 = require("d3-force");

      fgRef.current.d3Force("charge")?.strength((node: GraphNode) => {
        if (node.tier === "sun") return -600;
        if (node.tier === "star") return -280;
        return -45;
      });

      fgRef.current
        .d3Force("link")
        ?.distance((link: GraphLink) => {
          if (link.kind === "solar") return 230;
          if (link.kind === "constellation") return 135;
          if (link.kind === "orbital") return 55;
          return 95;
        })
        .strength((link: GraphLink) => {
          if (link.kind === "solar") return 0.35;
          if (link.kind === "constellation") return 0.16;
          if (link.kind === "orbital") return 0.68;
          return 0.08;
        });

      fgRef.current.d3Force(
        "radialOrbit",
        d3
          .forceRadial(
            (node: GraphNode) => {
              if (node.tier === "sun") return 0;
              if (node.tier === "star") return 230;
              return 410;
            },
            0,
            0
          )
          .strength((node: GraphNode) => {
            if (node.tier === "sun") return 1;
            if (node.tier === "star") return 0.42;
            return 0.12;
          })
      );

      fgRef.current.d3ReheatSimulation();
    }
  }, [graphData]);

  const handleNodeHover = useCallback((node: any) => {
    setHoverNode(node || null);
    hoverNodeRef.current = node || null;
  }, []);

  const handleNodeClick = useCallback((node: any) => {
    setSelectedNode(node);
    if (node && fgRef.current && typeof node.x === "number" && typeof node.y === "number") {
      fgRef.current.centerAt(node.x, node.y, 450);
    }
  }, []);

  const handleBackgroundClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const hexToRgb = (hex: string) => {
    const clean = hex.replace("#", "");
    const r = parseInt(clean.slice(0, 2), 16) || 0;
    const g = parseInt(clean.slice(2, 4), 16) || 229;
    const b = parseInt(clean.slice(4, 6), 16) || 255;
    return `${r}, ${g}, ${b}`;
  };

  const getNodeColor = useCallback(
    (node: GraphNode) => {
      if (node.tier === "sun") {
        return isLight ? "#D97706" : "#FFB800";
      }
      const dom: StarDomainId = node.domain || "systems";
      const domainMeta = STAR_DOMAINS[dom] || STAR_DOMAINS.systems;
      return isLight ? domainMeta.lightColor : domainMeta.color;
    },
    [isLight]
  );

  const getLinkColor = useCallback(
    (link: any) => {
      const srcId = typeof link.source === "object" ? link.source.id : link.source;
      const tgtId = typeof link.target === "object" ? link.target.id : link.target;
      const isConnectedToHover =
        hoverNode && (hoverNode.id === srcId || hoverNode.id === tgtId);
      const isConnectedToSelect =
        selectedNode && (selectedNode.id === srcId || selectedNode.id === tgtId);

      if (isConnectedToSelect || isConnectedToHover) {
        return isLight ? "rgba(2, 132, 199, 0.85)" : "rgba(0, 229, 255, 0.88)";
      }

      if (link.kind === "solar") {
        return isLight ? "rgba(217, 119, 6, 0.28)" : "rgba(255, 184, 0, 0.26)";
      }
      if (link.kind === "constellation") {
        return isLight ? "rgba(75, 94, 120, 0.34)" : "rgba(0, 229, 255, 0.25)";
      }
      if (link.kind === "orbital") {
        return isLight ? "rgba(75, 94, 120, 0.22)" : "rgba(148, 163, 184, 0.20)";
      }
      return isLight ? "rgba(100, 116, 139, 0.16)" : "rgba(75, 94, 120, 0.20)";
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

      if (isConnected) return 2.0;
      if (link.kind === "solar") return 1.3;
      if (link.kind === "constellation") return 1.1;
      if (link.kind === "orbital") return 0.65;
      return 0.45;
    },
    [hoverNode, selectedNode]
  );

  const renderNode = useCallback(
    (node: any, ctx: any, globalScale: number) => {
      if (typeof node.x !== "number" || typeof node.y !== "number") return;

      const isHovered = hoverNode && hoverNode.id === node.id;
      const isSelected = selectedNode && selectedNode.id === node.id;
      const baseColor = getNodeColor(node);
      const rgb = hexToRgb(baseColor);

      // ─── 1. CENTRAL STAR / SUN ("COMPUTER SCIENCE") ──────────────────────────
      if (node.tier === "sun") {
        // Draw heliocentric orbital guide rings centered on (0,0)
        ctx.save();
        ctx.strokeStyle = isLight
          ? "rgba(75, 94, 120, 0.14)"
          : "rgba(0, 229, 255, 0.10)";
        ctx.lineWidth = Math.max(0.5, 1 / globalScale);
        ctx.setLineDash([6 / globalScale, 6 / globalScale]);
        [230, 410].forEach((orbitR) => {
          ctx.beginPath();
          ctx.arc(0, 0, orbitR, 0, Math.PI * 2);
          ctx.stroke();
        });
        ctx.restore();

        const sunRadius = isHovered || isSelected ? 22 : 19;

        // Outer solar corona glow
        const grad = ctx.createRadialGradient(
          node.x,
          node.y,
          sunRadius * 0.3,
          node.x,
          node.y,
          sunRadius * 3.2
        );
        grad.addColorStop(0, "rgba(255, 196, 46, 0.85)");
        grad.addColorStop(0.45, "rgba(0, 229, 255, 0.28)");
        grad.addColorStop(1, "rgba(0, 229, 255, 0)");
        ctx.beginPath();
        ctx.arc(node.x, node.y, sunRadius * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // 8-Point Solar Astrolabe Rays
        const rayLen = sunRadius * 2.1;
        ctx.strokeStyle = isLight
          ? "rgba(217, 119, 6, 0.75)"
          : "rgba(255, 200, 55, 0.85)";
        ctx.lineWidth = Math.max(1, 1.5 / globalScale);
        for (let i = 0; i < 4; i++) {
          const a = (i * Math.PI) / 4;
          ctx.beginPath();
          ctx.moveTo(node.x - Math.cos(a) * rayLen, node.y - Math.sin(a) * rayLen);
          ctx.lineTo(node.x + Math.cos(a) * rayLen, node.y + Math.sin(a) * rayLen);
          ctx.stroke();
        }

        // Sun Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, sunRadius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered || isSelected ? "#FFFFFF" : "#FFC72C";
        ctx.fill();
        ctx.lineWidth = 2 / globalScale;
        ctx.strokeStyle = "#00E5FF";
        ctx.stroke();

        // Sun Label Pill
        const fontSize = Math.max(9, 13 / globalScale);
        ctx.font = `700 ${fontSize}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const label = "☀ COMPUTER SCIENCE";
        const textWidth = ctx.measureText(label).width;
        const padX = fontSize * 0.65;
        const padY = fontSize * 0.4;
        const boxW = textWidth + padX * 2;
        const boxH = fontSize + padY * 2;
        const yOff = sunRadius + boxH / 2 + 6;

        ctx.fillStyle = isLight ? "rgba(255, 255, 255, 0.96)" : "rgba(13, 16, 23, 0.94)";
        ctx.beginPath();
        ctx.roundRect(node.x - boxW / 2, node.y + yOff - boxH / 2, boxW, boxH, 4);
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 199, 44, 0.85)";
        ctx.lineWidth = 1.2 / globalScale;
        ctx.stroke();

        ctx.fillStyle = isLight ? "#B45309" : "#FFD166";
        ctx.fillText(label, node.x, node.y + yOff);
        return;
      }

      // ─── 2. COURSE STARS ("star:csopesy", etc.) ──────────────────────────────
      if (node.tier === "star") {
        const noteCount = node.noteCount || 10;
        const starRadius = Math.min(13, Math.max(8, 6.5 + Math.log(noteCount + 1) * 1.6));

        // Star Halo
        ctx.beginPath();
        ctx.arc(
          node.x,
          node.y,
          starRadius * (isHovered || isSelected ? 2.4 : 1.85),
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(${rgb}, ${isHovered || isSelected ? 0.32 : 0.16})`;
        ctx.fill();

        // Orbital Ring around Course Star
        ctx.beginPath();
        ctx.arc(node.x, node.y, starRadius * 1.45, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rgb}, ${isHovered || isSelected ? 0.85 : 0.4})`;
        ctx.lineWidth = Math.max(0.7, 1.1 / globalScale);
        ctx.stroke();

        // 4-Point Star Flare
        const flare = starRadius * (isHovered || isSelected ? 2.3 : 1.75);
        ctx.strokeStyle = isHovered || isSelected ? "#00E5FF" : `rgba(${rgb}, 0.75)`;
        ctx.lineWidth = Math.max(0.8, 1.2 / globalScale);
        ctx.beginPath();
        ctx.moveTo(node.x - flare, node.y);
        ctx.lineTo(node.x + flare, node.y);
        ctx.moveTo(node.x, node.y - flare);
        ctx.lineTo(node.x, node.y + flare);
        ctx.stroke();

        // Star Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, starRadius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered || isSelected ? "#FFFFFF" : baseColor;
        ctx.fill();

        // Course Star Label (Always visible when globalScale >= 0.45)
        if (globalScale >= 0.42 || isHovered || isSelected) {
          const fontSize =
            isHovered || isSelected
              ? Math.max(8.5, 13 / globalScale)
              : Math.max(6.5, 10 / globalScale);
          ctx.font = `700 ${fontSize}px monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const label = node.name;
          const textW = ctx.measureText(label).width;
          const padX = fontSize * 0.5;
          const padY = fontSize * 0.3;
          const bW = textW + padX * 2;
          const bH = fontSize + padY * 2;
          const yOffset = starRadius + bH / 2 + 4;

          ctx.fillStyle = isLight
            ? "rgba(255, 255, 255, 0.94)"
            : "rgba(13, 16, 23, 0.90)";
          ctx.beginPath();
          ctx.roundRect(node.x - bW / 2, node.y + yOffset - bH / 2, bW, bH, 3);
          ctx.fill();

          ctx.strokeStyle =
            isHovered || isSelected ? "#00E5FF" : `rgba(${rgb}, 0.55)`;
          ctx.lineWidth = Math.max(0.6, 1 / globalScale);
          ctx.stroke();

          ctx.fillStyle =
            isHovered || isSelected
              ? isLight
                ? "#0284C7"
                : "#FFFFFF"
              : baseColor;
          ctx.fillText(label, node.x, node.y + yOffset);
        }
        return;
      }

      // ─── 3. TOPIC / NOTE SATELLITES ──────────────────────────────────────────
      const satRadius = isHovered || isSelected ? 4.8 : 3.0;
      if (isHovered || isSelected) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, satRadius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, 0.35)`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, satRadius, 0, Math.PI * 2);
      ctx.fillStyle =
        isHovered || isSelected ? "#FFFFFF" : `rgba(${rgb}, 0.85)`;
      ctx.fill();

      const showSatLabel = isHovered || isSelected || globalScale >= 2.1;
      if (showSatLabel) {
        const fontSize =
          isHovered || isSelected
            ? Math.max(7.5, 12 / globalScale)
            : Math.max(4.5, 7.5 / globalScale);
        ctx.font = `${isHovered || isSelected ? "600" : "400"} ${fontSize}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const label = node.name;
        const textW = ctx.measureText(label).width;
        const padX = fontSize * 0.45;
        const padY = fontSize * 0.3;
        const bW = textW + padX * 2;
        const bH = fontSize + padY * 2;
        const yOffset = satRadius + bH / 2 + 3;

        ctx.fillStyle = isLight
          ? "rgba(255, 255, 255, 0.94)"
          : "rgba(13, 16, 23, 0.88)";
        ctx.beginPath();
        ctx.roundRect(node.x - bW / 2, node.y + yOffset - bH / 2, bW, bH, 3);
        ctx.fill();

        ctx.strokeStyle =
          isHovered || isSelected ? "#00E5FF" : `rgba(${rgb}, 0.4)`;
        ctx.lineWidth = Math.max(0.5, 0.8 / globalScale);
        ctx.stroke();

        ctx.fillStyle = isLight ? "#0F172A" : "#E2E8F0";
        ctx.fillText(label, node.x, node.y + yOffset);
      }
    },
    [hoverNode, selectedNode, isLight, getNodeColor]
  );

  const starCount = useMemo(
    () => graphData.nodes.filter((n) => n.tier === "star").length,
    [graphData.nodes]
  );
  const satelliteCount = useMemo(
    () => graphData.nodes.filter((n) => n.tier === "satellite").length,
    [graphData.nodes]
  );

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-transparent">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[var(--zen-void)] pointer-events-none"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-t-2 border-[var(--zen-cyan)] rounded-full animate-spin" />
              <p className="font-mono text-xs tracking-[0.3em] text-[var(--zen-cyan)]/80 uppercase">
                CALIBRATING HELIOCENTRIC STAR SYSTEM...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top-Left Constellation Domain Filter & Orbit Controls */}
      <div className="absolute top-4 left-4 right-4 sm:right-auto z-20 flex flex-wrap items-center gap-1.5 p-2 rounded-xl backdrop-blur-xl bg-[var(--zen-card)]/90 border border-[var(--zen-border)] shadow-xl">
        {[
          { id: "all", label: "ALL CONSTELLATIONS", color: "#00E5FF" },
          { id: "systems", label: "SYSTEMS", color: STAR_DOMAINS.systems.color },
          { id: "theory", label: "THEORY & MATH", color: STAR_DOMAINS.theory.color },
          { id: "security", label: "NET & SECURITY", color: STAR_DOMAINS.security.color },
          { id: "software", label: "SOFTWARE & AI", color: STAR_DOMAINS.software.color },
        ].map((chip) => {
          const isActive = activeDomain === chip.id;
          return (
            <button
              key={chip.id}
              onClick={() => setActiveDomain(chip.id as any)}
              className={`px-2.5 py-1 rounded text-[10px] font-mono tracking-wider transition-all flex items-center gap-1.5 border ${
                isActive
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-snow)] font-semibold shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                  : "border-transparent text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:bg-[var(--zen-card-hover)]"
              }`}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: chip.color }}
              />
              <span>{chip.label}</span>
            </button>
          );
        })}

        <div className="w-px h-4 bg-[var(--zen-border)] mx-1 hidden sm:block" />

        <button
          onClick={() => setStarsOnly((prev) => !prev)}
          className={`px-2.5 py-1 rounded text-[10px] font-mono tracking-wider border transition-all ${
            starsOnly
              ? "border-amber-400/60 bg-amber-400/15 text-amber-300 font-semibold"
              : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)]"
          }`}
          title="Toggle between Macro Star View and Full Satellite View"
        >
          {starsOnly ? "★ STARS ONLY" : "✦ STARS + NOTES"}
        </button>
      </div>

      {/* Bottom-Right Spatial HUD Overlay */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-4 backdrop-blur-xl rounded-lg px-4 py-2 shadow-2xl bg-[var(--zen-card)] border border-[var(--zen-border)]">
        <div className="flex gap-3 text-[10px] font-mono text-[var(--zen-frost)]">
          <span>
            <strong className="text-amber-400">1</strong> SUN
          </span>
          <span>
            <strong className="text-[var(--zen-cyan)]">{starCount}</strong> STARS
          </span>
          {!starsOnly && (
            <span>
              <strong className="text-[var(--zen-cyan)]">{satelliteCount}</strong> NOTES
            </span>
          )}
        </div>
        <div className="w-px h-4 bg-[var(--zen-border)]" />
        <button
          onClick={() => {
            fgRef.current?.centerAt(0, 0, 500);
            fgRef.current?.zoom(0.85, 500);
          }}
          className="text-[10px] font-mono tracking-wider text-amber-400 hover:text-[var(--zen-cyan)] transition-colors uppercase"
        >
          [ ☀ CS SUN ]
        </button>
        <button
          onClick={() => fgRef.current?.zoomToFit(450, 45)}
          className="text-[10px] font-mono tracking-wider text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] transition-colors uppercase"
        >
          [ FIT ORBIT ]
        </button>
      </div>

      {/* Selected Node Inspection Card */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-auto sm:w-96 bg-[var(--zen-card)] backdrop-blur-2xl border border-[var(--zen-border)] p-5 rounded-xl shadow-2xl z-50 flex flex-col pointer-events-auto"
          >
            <div className="flex justify-between items-start mb-3 border-b border-[var(--zen-border)] pb-3">
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase rounded border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/10 text-[var(--zen-cyan)] font-semibold">
                    {selectedNode.tier === "sun"
                      ? "☀ CENTRAL STAR"
                      : selectedNode.tier === "star"
                      ? `★ COURSE STAR · ${selectedNode.track || "CORE CS"}`
                      : `◇ MONOGRAPH · ${selectedNode.courseCode || "CS"}`}
                  </span>
                  {selectedNode.domainLabel && (
                    <span className="text-[9px] font-mono text-[var(--zen-ink-muted)] truncate">
                      {selectedNode.domainLabel}
                    </span>
                  )}
                </div>
                <h3
                  className="text-[var(--zen-snow)] font-semibold text-sm sm:text-base tracking-wider leading-snug uppercase truncate"
                  style={{ fontFamily: "var(--font-zen-display, serif)" }}
                >
                  {selectedNode.name}
                </h3>
                {selectedNode.subtitle && (
                  <p className="text-[11px] font-mono text-[var(--zen-cyan)]/90 mt-0.5 truncate">
                    {selectedNode.subtitle}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] transition-colors p-1 text-xs font-mono shrink-0"
                aria-label="Close card"
              >
                ✕
              </button>
            </div>

            <p className="text-[var(--zen-frost)] text-xs leading-relaxed mb-4 line-clamp-4 min-h-[2.5rem]">
              {selectedNode.excerpt ||
                "Academic monograph indexed in the Project Engram Heliocentric Star System."}
            </p>

            <div className="flex items-center justify-between mb-4 px-3 py-1.5 bg-[var(--zen-cyan)]/5 rounded border border-[var(--zen-cyan)]/20 text-[10px] font-mono">
              <span className="text-[var(--zen-ink-muted)] uppercase">
                {selectedNode.tier === "star" ? "ORBITING MONOGRAPHS" : "GRAVITATIONAL LINKS"}
              </span>
              <span className="font-bold text-[var(--zen-cyan)]">
                {selectedNode.tier === "star"
                  ? `${selectedNode.noteCount || 0} NOTES · ${selectedNode.degree || 1} EDGES`
                  : `${selectedNode.degree || 1} CONNECTIONS`}
              </span>
            </div>

            {selectedNode.path && (
              <button
                onClick={() => router.push(selectedNode.path)}
                className="w-full py-2.5 bg-[var(--zen-cyan)]/10 hover:bg-[var(--zen-cyan)]/20 border border-[var(--zen-cyan)]/40 hover:border-[var(--zen-cyan)] text-[var(--zen-cyan)] hover:text-[var(--zen-snow)] font-mono text-xs tracking-[0.2em] uppercase transition-all rounded shadow-[0_0_15px_rgba(0,229,255,0.15)] flex items-center justify-center gap-2"
              >
                <span>
                  {selectedNode.tier === "sun"
                    ? "OPEN STAR DIRECTORY"
                    : selectedNode.tier === "star"
                    ? `EXPLORE ${selectedNode.name} STAR`
                    : "OPEN MONOGRAPH"}
                </span>
                <span>→</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        backgroundColor="rgba(0,0,0,0)"
        nodeLabel={() => ""}
        nodeColor={getNodeColor}
        linkColor={getLinkColor}
        nodeRelSize={5}
        linkWidth={getLinkWidth}
        linkDirectionalParticles={(link: any) => {
          if (isLite) return 0;
          if (link.kind === "solar") return 2;
          const hn = hoverNodeRef.current;
          if (hn) {
            const src = typeof link.source === "object" ? link.source.id : link.source;
            const tgt = typeof link.target === "object" ? link.target.id : link.target;
            if (src === hn.id || tgt === hn.id) return 3;
          }
          return 0;
        }}
        linkDirectionalParticleWidth={2.2}
        linkDirectionalParticleSpeed={0.012}
        linkDirectionalParticleColor={() => (isLight ? "#0284C7" : "#00E5FF")}
        d3AlphaDecay={isLite ? 0.035 : 0.012}
        d3VelocityDecay={0.28}
        warmupTicks={100}
        cooldownTicks={isLite ? 180 : 500}
        onNodeHover={handleNodeHover}
        onNodeClick={handleNodeClick}
        onBackgroundClick={handleBackgroundClick}
        nodeCanvasObject={renderNode}
      />
    </div>
  );
}
