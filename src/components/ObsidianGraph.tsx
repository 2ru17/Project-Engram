"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { useStudyPlan } from "@/components/StudyPlanProvider";
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
  const { theme, universe, isLite } = useTheme();
  const { isNoteCompleted, toggleNoteCompleted } = useStudyPlan();
  const isLightSurface =
    (universe === "cyber-zen" && theme === "light") ||
    universe === "neo-brutalism" ||
    universe === "minimalism" ||
    universe === "broken-grid";

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

        // Position Course Stars in radial sectors around the Central Singularity (0,0)
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

  // Configure Gravitational Orbital Forces around the Singularity
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
        if (universe === "neo-brutalism") return "#C5221F";
        if (universe === "broken-grid") return "#0D5C3A";
        if (universe === "parallax") return "#8B5CF6";
        if (universe === "minimalism") return "#111111";
        return isLightSurface ? "#0284C7" : "#00E5FF";
      }
      const dom: StarDomainId = node.domain || "systems";
      const domainMeta = STAR_DOMAINS[dom] || STAR_DOMAINS.systems;
      return isLightSurface ? domainMeta.lightColor : domainMeta.color;
    },
    [isLightSurface, universe]
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
        if (universe === "neo-brutalism") return "rgba(197, 34, 31, 0.92)";
        if (universe === "broken-grid") return "rgba(13, 92, 58, 0.92)";
        if (universe === "parallax") return "rgba(139, 92, 246, 0.92)";
        return isLightSurface ? "rgba(2, 132, 199, 0.85)" : "rgba(0, 229, 255, 0.88)";
      }

      if (link.kind === "solar") {
        return isLightSurface ? "rgba(15, 23, 42, 0.24)" : "rgba(56, 189, 248, 0.28)";
      }
      if (link.kind === "constellation") {
        return isLightSurface ? "rgba(75, 94, 120, 0.34)" : "rgba(0, 229, 255, 0.25)";
      }
      if (link.kind === "orbital") {
        return isLightSurface ? "rgba(75, 94, 120, 0.24)" : "rgba(148, 163, 184, 0.20)";
      }
      return isLightSurface ? "rgba(100, 116, 139, 0.20)" : "rgba(75, 94, 120, 0.20)";
    },
    [hoverNode, selectedNode, isLightSurface, universe]
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

      // ─── 1. CENTRAL SIGNATURE DISCIPLINE EMBLEM ("COMPUTER SCIENCE") ──────
      if (node.tier === "sun") {
        // Universal orbital guide rings centered on (0,0)
        ctx.save();
        ctx.strokeStyle = isLightSurface
          ? "rgba(15, 23, 42, 0.16)"
          : (universe as string) === "broken-grid"
          ? "rgba(0, 220, 255, 0.18)"
          : "rgba(0, 229, 255, 0.14)";
        ctx.lineWidth = Math.max(0.5, 1 / globalScale);
        ctx.setLineDash([6 / globalScale, 6 / globalScale]);
        [230, 410].forEach((orbitR) => {
          ctx.beginPath();
          ctx.arc(0, 0, orbitR, 0, Math.PI * 2);
          ctx.stroke();
        });
        ctx.restore();

        const primaryRingHex =
          universe === "neo-brutalism"
            ? "#C5221F"
            : universe === "broken-grid"
            ? "#0D5C3A"
            : universe === "parallax"
            ? "#8B5CF6"
            : universe === "minimalism"
            ? "#18181B"
            : "#00E5FF";
        const secondaryRingHex =
          universe === "parallax"
            ? "#C4B5FD"
            : universe === "minimalism"
            ? "#475569"
            : universe === "broken-grid"
            ? "#11281F"
            : "#0A0A0A";
        const primaryRgb = hexToRgb(primaryRingHex);
        const secondaryRgb = hexToRgb(secondaryRingHex);

        ctx.save();
        ctx.translate(node.x, node.y);

        // ── EMBLEM A: CYBER-ZEN (Celestial Astrolabe & Hanko Seal) ──
        if (universe === "cyber-zen") {
          const coreR = isHovered || isSelected ? 24 : 20;

          // Celestial Glow
          const auraGrad = ctx.createRadialGradient(0, 0, coreR * 0.5, 0, 0, coreR * 3.2);
          auraGrad.addColorStop(0, "rgba(0, 229, 255, 0.45)");
          auraGrad.addColorStop(0.5, "rgba(230, 57, 70, 0.20)");
          auraGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
          ctx.beginPath();
          ctx.arc(0, 0, coreR * 3.2, 0, Math.PI * 2);
          ctx.fillStyle = auraGrad;
          ctx.fill();

          // Outer Calibrated Astrolabe Ring
          ctx.beginPath();
          ctx.arc(0, 0, coreR * 2.2, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(0, 229, 255, 0.65)";
          ctx.lineWidth = Math.max(1, 1.4 / globalScale);
          ctx.stroke();

          // Astrolabe 12 Degree Graduation Ticks
          for (let i = 0; i < 12; i++) {
            const angle = (i * Math.PI) / 6;
            const innerR = coreR * 1.95;
            const outerR = coreR * 2.2;
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * innerR, Math.sin(angle) * innerR);
            ctx.lineTo(Math.cos(angle) * outerR, Math.sin(angle) * outerR);
            ctx.strokeStyle = i % 3 === 0 ? "#00E5FF" : "rgba(0, 229, 255, 0.45)";
            ctx.lineWidth = Math.max(0.7, 1.2 / globalScale);
            ctx.stroke();
          }

          // 4 Cardinal Axes with Diamond Tips
          const axisLen = coreR * 2.8;
          ctx.strokeStyle = "rgba(0, 229, 255, 0.75)";
          ctx.lineWidth = Math.max(0.8, 1.2 / globalScale);
          ctx.beginPath();
          ctx.moveTo(-axisLen, 0);
          ctx.lineTo(axisLen, 0);
          ctx.moveTo(0, -axisLen);
          ctx.lineTo(0, axisLen);
          ctx.stroke();

          // Inner Hanko Crimson Diamond Seal
          const sealSize = coreR * 0.95;
          ctx.save();
          ctx.rotate(Math.PI / 4);
          ctx.fillStyle = "#E63946";
          ctx.fillRect(-sealSize / 2, -sealSize / 2, sealSize, sealSize);
          ctx.strokeStyle = "#FFFFFF";
          ctx.lineWidth = Math.max(0.8, 1.2 / globalScale);
          ctx.strokeRect(-sealSize / 2, -sealSize / 2, sealSize, sealSize);
          ctx.restore();

          // Radiant Core Dot
          ctx.beginPath();
          ctx.arc(0, 0, Math.max(2.5, 3.5 / globalScale), 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
        }

        // ── EMBLEM B: NEO-BRUTALISM (Isometric 3D Cube & Industrial Crosshairs) ──
        else if (universe === "neo-brutalism") {
          const size = isHovered || isSelected ? 22 : 18;

          // Industrial Coordinate Crosshairs
          const ext = size * 2.5;
          ctx.strokeStyle = "#0A0A0A";
          ctx.lineWidth = Math.max(1.5, 2.2 / globalScale);
          ctx.beginPath();
          ctx.moveTo(-ext, 0);
          ctx.lineTo(ext, 0);
          ctx.moveTo(0, -ext);
          ctx.lineTo(0, ext);
          ctx.stroke();

          // Millimeter graduation ticks along axes
          [-size * 1.8, -size * 1.2, size * 1.2, size * 1.8].forEach((pos) => {
            ctx.beginPath();
            ctx.moveTo(pos, -4);
            ctx.lineTo(pos, 4);
            ctx.moveTo(-4, pos);
            ctx.lineTo(4, pos);
            ctx.stroke();
          });

          // Hard Offset Drop Shadow for Cube
          const h = size * 0.866;
          ctx.save();
          ctx.translate(5, 5);
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(size, -size / 2);
          ctx.lineTo(size, size / 2);
          ctx.lineTo(0, size);
          ctx.lineTo(-size, size / 2);
          ctx.lineTo(-size, -size / 2);
          ctx.closePath();
          ctx.fillStyle = "#0A0A0A";
          ctx.fill();
          ctx.restore();

          // 3D Isometric Cube Faces
          // Top Face: Warm Putty Kraft Paper
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(size, -size / 2);
          ctx.lineTo(0, 0);
          ctx.lineTo(-size, -size / 2);
          ctx.closePath();
          ctx.fillStyle = "#E5E0D5";
          ctx.fill();
          ctx.strokeStyle = "#0A0A0A";
          ctx.lineWidth = Math.max(1.8, 2.6 / globalScale);
          ctx.stroke();

          // Left Face: Pitch White
          ctx.beginPath();
          ctx.moveTo(-size, -size / 2);
          ctx.lineTo(0, 0);
          ctx.lineTo(0, size);
          ctx.lineTo(-size, size / 2);
          ctx.closePath();
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
          ctx.stroke();

          // Right Face: Bauhaus Crimson
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(size, -size / 2);
          ctx.lineTo(size, size / 2);
          ctx.lineTo(0, size);
          ctx.closePath();
          ctx.fillStyle = "#C5221F";
          ctx.fill();
          ctx.stroke();
        }

        // ── EMBLEM C: MINIMALISM (Swiss Precision Compass Rose & Datum Core) ──
        else if (universe === "minimalism") {
          const r = isHovered || isSelected ? 22 : 18;

          // Outer Swiss Hairline Calibrations
          ctx.beginPath();
          ctx.arc(0, 0, r * 2.1, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(24, 24, 27, 0.25)";
          ctx.lineWidth = Math.max(0.6, 0.9 / globalScale);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, 0, r * 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(24, 24, 27, 0.15)";
          ctx.stroke();

          // 8 Micro Datum Dots
          for (let i = 0; i < 8; i++) {
            const a = (i * Math.PI) / 4;
            ctx.beginPath();
            ctx.arc(Math.cos(a) * r * 2.1, Math.sin(a) * r * 2.1, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = "#18181B";
            ctx.fill();
          }

          // 4 Razor Needle Hairlines
          const needleLen = r * 2.6;
          ctx.strokeStyle = "#18181B";
          ctx.lineWidth = Math.max(0.8, 1.1 / globalScale);
          ctx.beginPath();
          ctx.moveTo(-needleLen, 0);
          ctx.lineTo(needleLen, 0);
          ctx.moveTo(0, -needleLen);
          ctx.lineTo(0, needleLen);
          ctx.stroke();

          // Center Solid Alabaster Core Disk
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.75, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
          ctx.strokeStyle = "#18181B";
          ctx.lineWidth = Math.max(1.2, 1.6 / globalScale);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, 0, r * 0.25, 0, Math.PI * 2);
          ctx.fillStyle = "#18181B";
          ctx.fill();
        }

        // ── EMBLEM D: PARALLAX (Topographic Heliocentric Sun & Altitude Rays) ──
        else if (universe === "parallax") {
          const r = isHovered || isSelected ? 22 : 18;

          // 3 Nested Topographic Elevation Contours
          [r * 2.6, r * 1.9, r * 1.3].forEach((radius, idx) => {
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.strokeStyle = idx === 0 ? "rgba(196, 181, 253, 0.35)" : "rgba(139, 92, 246, 0.45)";
            ctx.lineWidth = Math.max(0.8, 1.2 / globalScale);
            ctx.stroke();
          });

          // 8 Radial Expedition Rays
          for (let i = 0; i < 8; i++) {
            const a = (i * Math.PI) / 4;
            const r1 = r * 1.3;
            const r2 = r * 2.6;
            ctx.beginPath();
            ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
            ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
            ctx.strokeStyle = i % 2 === 0 ? "#C4B5FD" : "#8B5CF6";
            ctx.lineWidth = Math.max(0.7, 1.1 / globalScale);
            ctx.stroke();
          }

          // Luminous Cosmic Nebula Sun Core
          const sunGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
          sunGrad.addColorStop(0, "#FAF5FF");
          sunGrad.addColorStop(0.4, "#8B5CF6");
          sunGrad.addColorStop(1, "#4C1D95");
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.fillStyle = sunGrad;
          ctx.fill();
          ctx.strokeStyle = "#FAF5FF";
          ctx.lineWidth = Math.max(1.2, 1.8 / globalScale);
          ctx.stroke();
        }

        // ── EMBLEM E: BROKEN-GRID (Architectural Blueprint Datum Grid & Registration Origin) ──
        else {
          const s = isHovered || isSelected ? 22 : 18;

          // Broken Drafting Axes with Extension Marks
          const ext = s * 2.8;
          ctx.strokeStyle = "rgba(17, 40, 31, 0.45)";
          ctx.lineWidth = Math.max(0.9, 1.3 / globalScale);
          ctx.setLineDash([8 / globalScale, 4 / globalScale]);
          ctx.beginPath();
          ctx.moveTo(-ext, 0);
          ctx.lineTo(ext, 0);
          ctx.moveTo(0, -ext);
          ctx.lineTo(0, ext);
          ctx.stroke();
          ctx.setLineDash([]);

          // Blueprint Coordinate Callout
          const fontSz = Math.max(6, 8.5 / globalScale);
          ctx.font = `600 ${fontSz}px monospace`;
          ctx.fillStyle = "#0D5C3A";
          ctx.fillText("[00//00]", s * 1.3, -s * 1.1);

          // Octagonal Drafting Origin Box
          ctx.beginPath();
          const d = s * 0.9;
          const c = d * 0.35;
          ctx.moveTo(-d + c, -d);
          ctx.lineTo(d - c, -d);
          ctx.lineTo(d, -d + c);
          ctx.lineTo(d, d - c);
          ctx.lineTo(d - c, d);
          ctx.lineTo(-d + c, d);
          ctx.lineTo(-d, d - c);
          ctx.lineTo(-d, -d + c);
          ctx.closePath();
          ctx.fillStyle = "#ECE8E1";
          ctx.fill();
          ctx.strokeStyle = "#11281F";
          ctx.lineWidth = Math.max(1.4, 2.0 / globalScale);
          ctx.stroke();

          // Technical Forest Registration Cross
          ctx.strokeStyle = "#0D5C3A";
          ctx.lineWidth = Math.max(1.2, 1.8 / globalScale);
          ctx.beginPath();
          ctx.moveTo(-d * 0.65, 0);
          ctx.lineTo(d * 0.65, 0);
          ctx.moveTo(0, -d * 0.65);
          ctx.lineTo(0, d * 0.65);
          ctx.stroke();
        }

        ctx.restore();

        // ── CORE LABEL PILL ──
        const fontSize = Math.max(8.5, 12 / globalScale);
        ctx.font = `700 ${fontSize}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const label = "COMPUTER SCIENCE";
        const textWidth = ctx.measureText(label).width;
        const padX = fontSize * 0.65;
        const padY = fontSize * 0.4;
        const boxW = textWidth + padX * 2;
        const boxH = fontSize + padY * 2;
        const yOff = 34 + boxH / 2;

        ctx.fillStyle = isLightSurface
          ? "rgba(255, 255, 255, 0.96)"
          : "rgba(9, 12, 18, 0.94)";
        ctx.beginPath();
        ctx.roundRect(
          node.x - boxW / 2,
          node.y + yOff - boxH / 2,
          boxW,
          boxH,
          universe === "neo-brutalism" || universe === "broken-grid" ? 0 : 4
        );
        ctx.fill();
        ctx.strokeStyle = primaryRingHex;
        ctx.lineWidth = universe === "neo-brutalism" ? 2.5 / globalScale : 1.2 / globalScale;
        ctx.stroke();

        ctx.fillStyle =
          universe === "neo-brutalism"
            ? "#0A0A0A"
            : isLightSurface
            ? "#0F172A"
            : "#F8FAFC";
        ctx.fillText(label, node.x, node.y + yOff);
        return;
      }

      // ─── 2. COURSE STARS ("star:csopesy", etc.) ──────────────────────────────
      if (node.tier === "star") {
        const noteCount = node.noteCount || 10;
        const starRadius = Math.min(13, Math.max(8, 6.5 + Math.log(noteCount + 1) * 1.6));

        // ── NEO-BRUTALISM: Rotated Square with Hard Black Shadow ──
        if (universe === "neo-brutalism") {
          const s = starRadius * 1.1;
          ctx.save();
          ctx.translate(node.x, node.y);
          ctx.fillStyle = "#0A0A0A";
          ctx.fillRect(-s + 3, -s + 3, s * 2, s * 2);
          ctx.fillStyle = isHovered || isSelected ? "#C5221F" : baseColor;
          ctx.fillRect(-s, -s, s * 2, s * 2);
          ctx.strokeStyle = "#0A0A0A";
          ctx.lineWidth = Math.max(1.8, 2.5 / globalScale);
          ctx.strokeRect(-s, -s, s * 2, s * 2);
          ctx.restore();
        }
        // ── BROKEN-GRID: Octagonal Drafting Box with Architectural Brackets ──
        else if (universe === "broken-grid") {
          const s = starRadius * 1.05;
          ctx.save();
          ctx.translate(node.x, node.y);
          const c = s * 0.35;
          ctx.beginPath();
          ctx.moveTo(-s + c, -s);
          ctx.lineTo(s - c, -s);
          ctx.lineTo(s, -s + c);
          ctx.lineTo(s, s - c);
          ctx.lineTo(s - c, s);
          ctx.lineTo(-s + c, s);
          ctx.lineTo(-s, s - c);
          ctx.lineTo(-s, -s + c);
          ctx.closePath();
          ctx.fillStyle = isHovered || isSelected ? "#0D5C3A" : baseColor;
          ctx.fill();
          ctx.strokeStyle = isHovered || isSelected ? "#0D5C3A" : "rgba(17, 40, 31, 0.75)";
          ctx.lineWidth = Math.max(1.2, 1.8 / globalScale);
          ctx.stroke();
          const b = s * 1.4;
          ctx.strokeStyle = "rgba(17, 40, 31, 0.45)";
          ctx.lineWidth = Math.max(0.6, 1 / globalScale);
          ctx.beginPath();
          ctx.moveTo(-b, -b + 4);
          ctx.lineTo(-b, -b);
          ctx.lineTo(-b + 4, -b);
          ctx.moveTo(b, -b + 4);
          ctx.lineTo(b, -b);
          ctx.lineTo(b - 4, -b);
          ctx.moveTo(-b, b - 4);
          ctx.lineTo(-b, b);
          ctx.lineTo(-b + 4, b);
          ctx.moveTo(b, b - 4);
          ctx.lineTo(b, b);
          ctx.lineTo(b - 4, b);
          ctx.stroke();
          ctx.restore();
        }
        // ── MINIMALISM: Swiss Precision Disc with Clean Hairline Ring ──
        else if (universe === "minimalism") {
          ctx.beginPath();
          ctx.arc(node.x, node.y, starRadius * 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(24, 24, 27, 0.25)";
          ctx.lineWidth = Math.max(0.6, 0.9 / globalScale);
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(node.x, node.y, starRadius, 0, Math.PI * 2);
          ctx.fillStyle = isHovered || isSelected ? "#18181B" : baseColor;
          ctx.fill();
          ctx.strokeStyle = "#18181B";
          ctx.lineWidth = Math.max(1, 1.4 / globalScale);
          ctx.stroke();
        }
        // ── PARALLAX & CYBER-ZEN: Celestial Flare & Luminous Halo ──
        else {
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
          ctx.strokeStyle = isHovered || isSelected ? baseColor : `rgba(${rgb}, 0.75)`;
          ctx.lineWidth = Math.max(0.8, 1.2 / globalScale);
          ctx.beginPath();
          ctx.moveTo(node.x - flare, node.y);
          ctx.lineTo(node.x + flare, node.y);
          ctx.moveTo(node.x, node.y - flare);
          ctx.lineTo(node.x + flare, node.y);
          ctx.stroke();

          // Star Core
          ctx.beginPath();
          ctx.arc(node.x, node.y, starRadius, 0, Math.PI * 2);
          ctx.fillStyle = isHovered || isSelected ? (isLightSurface ? "#0F172A" : "#FFFFFF") : baseColor;
          ctx.fill();
        }

        // Course Star Label (Always visible when globalScale >= 0.42)
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

          ctx.fillStyle = isLightSurface
            ? "rgba(255, 255, 255, 0.94)"
            : "rgba(13, 16, 23, 0.90)";
          ctx.beginPath();
          ctx.roundRect(
            node.x - bW / 2,
            node.y + yOffset - bH / 2,
            bW,
            bH,
            universe === "neo-brutalism" || universe === "broken-grid" ? 0 : 3
          );
          ctx.fill();

          ctx.strokeStyle =
            isHovered || isSelected ? baseColor : `rgba(${rgb}, 0.55)`;
          ctx.lineWidth = Math.max(0.6, 1 / globalScale);
          ctx.stroke();

          ctx.fillStyle =
            isHovered || isSelected
              ? isLightSurface
                ? "#0F172A"
                : "#FFFFFF"
              : baseColor;
          ctx.fillText(label, node.x, node.y + yOffset);
        }
        return;
      }

      // ─── 3. TOPIC / NOTE SATELLITES ──────────────────────────────────────────
      const isDone = node.path ? isNoteCompleted(node.path) : false;
      const satRadius = isHovered || isSelected ? 4.8 : isDone ? 3.8 : 3.0;
      // Neo-Brutalism Satellites: Sharp Square Dots
      if (universe === "neo-brutalism") {
        ctx.fillStyle = isHovered || isSelected ? "#C5221F" : isDone ? "#0D5C3A" : baseColor;
        ctx.fillRect(node.x - satRadius, node.y - satRadius, satRadius * 2, satRadius * 2);
        ctx.strokeStyle = "#0A0A0A";
        ctx.lineWidth = Math.max(1, 1.4 / globalScale);
        ctx.strokeRect(node.x - satRadius, node.y - satRadius, satRadius * 2, satRadius * 2);
      }
      // Broken-Grid Satellites: Technical Micro-Squares
      else if (universe === "broken-grid") {
        ctx.fillStyle = isHovered || isSelected ? "#0D5C3A" : isDone ? "#166534" : baseColor;
        ctx.fillRect(node.x - satRadius, node.y - satRadius, satRadius * 2, satRadius * 2);
        ctx.strokeStyle = "rgba(17, 40, 31, 0.6)";
        ctx.lineWidth = Math.max(0.8, 1.1 / globalScale);
        ctx.strokeRect(node.x - satRadius, node.y - satRadius, satRadius * 2, satRadius * 2);
      }
      // Standard Circular Satellites (Cyber-Zen, Minimalism, Parallax)
      else {
        if (isHovered || isSelected || isDone) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, satRadius * 2.1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb}, ${isHovered || isSelected ? 0.35 : 0.22})`;
          ctx.fill();
        }

        if (isDone) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, satRadius * 1.55, 0, Math.PI * 2);
          ctx.strokeStyle = baseColor;
          ctx.lineWidth = Math.max(0.7, 1.1 / globalScale);
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, satRadius, 0, Math.PI * 2);
        ctx.fillStyle =
          isHovered || isSelected
            ? isLightSurface
              ? "#0F172A"
              : "#FFFFFF"
            : `rgba(${rgb}, 0.85)`;
        ctx.fill();
      }

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

        ctx.fillStyle = isLightSurface
          ? "rgba(255, 255, 255, 0.94)"
          : "rgba(13, 16, 23, 0.88)";
        ctx.beginPath();
        ctx.roundRect(
          node.x - bW / 2,
          node.y + yOffset - bH / 2,
          bW,
          bH,
          universe === "neo-brutalism" || universe === "broken-grid" ? 0 : 3
        );
        ctx.fill();

        ctx.strokeStyle =
          isHovered || isSelected ? baseColor : `rgba(${rgb}, 0.4)`;
        ctx.lineWidth = Math.max(0.5, 0.8 / globalScale);
        ctx.stroke();

        ctx.fillStyle = isLightSurface ? "#0F172A" : "#E2E8F0";
        ctx.fillText(label, node.x, node.y + yOffset);
      }
    },
    [hoverNode, selectedNode, isLightSurface, universe, getNodeColor, isNoteCompleted]
  );

  const starCount = useMemo(
    () => graphData.nodes.filter((n) => n.tier === "star").length,
    [graphData.nodes]
  );
  const satelliteCount = useMemo(
    () => graphData.nodes.filter((n) => n.tier === "satellite").length,
    [graphData.nodes]
  );

  const selectedIsCompleted =
    selectedNode?.tier === "satellite" && selectedNode.path
      ? isNoteCompleted(selectedNode.path)
      : false;

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
                INITIALIZING KNOWLEDGE GRAPH...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top-Left Domain Filter & Graph Controls */}
      <div className="absolute top-4 left-4 right-4 sm:right-auto z-20 flex flex-wrap items-center gap-1.5 p-2 rounded-xl backdrop-blur-xl bg-[var(--zen-card)]/90 border border-[var(--zen-border)] shadow-xl universe-card">
        {[
          { id: "all", label: "ALL DOMAINS", color: "#00E5FF" },
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
              ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-cyan)] font-semibold"
              : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)]"
          }`}
          title="Toggle between Macro Course View and Full Monograph View"
        >
          {starsOnly ? "[ COURSES ONLY ]" : "[ COURSES + NOTES ]"}
        </button>
      </div>

      {/* Bottom-Right Spatial HUD Overlay */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-4 backdrop-blur-xl rounded-lg px-4 py-2 shadow-2xl bg-[var(--zen-card)] border border-[var(--zen-border)] universe-card">
        <div className="flex gap-3 text-[10px] font-mono text-[var(--zen-frost)]">
          <span>
            <strong className="text-[var(--zen-cyan)]">1</strong> CORE
          </span>
          <span>
            <strong className="text-[var(--zen-cyan)]">{starCount}</strong> COURSES
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
          className="text-[10px] font-mono tracking-wider text-[var(--zen-cyan)] hover:text-[var(--zen-snow)] transition-colors uppercase"
        >
          [ CENTER ]
        </button>
        <button
          onClick={() => fgRef.current?.zoomToFit(450, 45)}
          className="text-[10px] font-mono tracking-wider text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] transition-colors uppercase"
        >
          [ FIT GRAPH ]
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
            className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-auto sm:w-96 bg-[var(--zen-card)] backdrop-blur-2xl border border-[var(--zen-border)] p-5 rounded-xl shadow-2xl z-50 flex flex-col pointer-events-auto universe-card"
          >
            <div className="flex justify-between items-start mb-3 border-b border-[var(--zen-border)] pb-3">
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase rounded border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/10 text-[var(--zen-cyan)] font-semibold">
                    {selectedNode.tier === "sun"
                      ? "CORE DISCIPLINE"
                      : selectedNode.tier === "star"
                      ? `COURSE · ${selectedNode.track || "CORE CS"}`
                      : `MONOGRAPH · ${selectedNode.courseCode || "CS"}`}
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
                [x]
              </button>
            </div>

            <p className="text-[var(--zen-frost)] text-xs leading-relaxed mb-4 line-clamp-4 min-h-[2.5rem]">
              {selectedNode.excerpt ||
                "Academic monograph indexed in the Project Engram Knowledge Graph."}
            </p>

            <div className="flex items-center justify-between mb-4 px-3 py-1.5 bg-[var(--zen-cyan)]/5 rounded border border-[var(--zen-cyan)]/20 text-[10px] font-mono">
              <span className="text-[var(--zen-ink-muted)] uppercase">
                {selectedNode.tier === "star" ? "INDEXED MONOGRAPHS" : "RELATIONAL LINKS"}
              </span>
              <span className="font-bold text-[var(--zen-cyan)]">
                {selectedNode.tier === "star"
                  ? `${selectedNode.noteCount || 0} NOTES · ${selectedNode.degree || 1} EDGES`
                  : `${selectedNode.degree || 1} CONNECTIONS`}
              </span>
            </div>

            {selectedNode.path && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push(selectedNode.path)}
                  className="flex-1 py-2.5 bg-[var(--zen-cyan)]/10 hover:bg-[var(--zen-cyan)]/20 border border-[var(--zen-cyan)]/40 hover:border-[var(--zen-cyan)] text-[var(--zen-cyan)] hover:text-[var(--zen-snow)] font-mono text-xs tracking-[0.2em] uppercase transition-all rounded shadow-[0_0_15px_rgba(0,229,255,0.15)] flex items-center justify-center gap-2"
                >
                  <span>
                    {selectedNode.tier === "sun"
                      ? "OPEN DIRECTORY"
                      : selectedNode.tier === "star"
                      ? `OPEN ${selectedNode.name}`
                      : "OPEN MONOGRAPH"}
                  </span>
                  <span>→</span>
                </button>
                {selectedNode.tier === "satellite" && (
                  <button
                    onClick={() =>
                      toggleNoteCompleted(selectedNode.path, selectedNode.name)
                    }
                    className={`px-3 py-2.5 rounded border font-mono text-[10px] tracking-wider uppercase transition-all shrink-0 ${
                      selectedIsCompleted
                        ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)] text-[var(--zen-void)] font-bold"
                        : "border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)]"
                    }`}
                  >
                    {selectedIsCompleted ? "DONE" : "MARK"}
                  </button>
                )}
              </div>
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
        linkDirectionalParticleColor={() =>
          universe === "neo-brutalism"
            ? "#C5221F"
            : universe === "broken-grid"
            ? "#0D5C3A"
            : universe === "parallax"
            ? "#8B5CF6"
            : isLightSurface
            ? "#0284C7"
            : "#00E5FF"
        }
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
