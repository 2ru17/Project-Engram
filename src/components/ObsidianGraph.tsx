"use client";

import { useEffect, useState, useRef, useCallback, useMemo, useId } from "react";
import ForceGraph2D, {
  type ForceGraphMethods,
  type NodeObject,
  type LinkObject,
} from "react-force-graph-2d";
import * as d3 from "d3-force";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { useStudyPlan } from "@/components/StudyPlanProvider";
import { motion, AnimatePresence } from "motion/react";
import { STAR_DOMAINS, type StarDomainId } from "@/lib/course-registry";
import { getSimulatorsForCourse } from "@/lib/simulator-registry";
import { motionTokens } from "@/lib/motion-tokens";

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
  year?: number;
  yearLabel?: string;
  term?: string;
  isUtility?: boolean;
  isReviewer?: boolean;
  tags?: string[];
  prevTopic?: string;
  nextTopic?: string;
  wikilinks?: string[];
  degree?: number;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number;
  fy?: number;
}

interface GraphLink {
  source: string | NodeObject<GraphNode>;
  target: string | NodeObject<GraphNode>;
  kind?: "solar" | "constellation" | "orbital" | "wikilink";
}

type GraphNodeObj = NodeObject<GraphNode>;
type GraphLinkObj = LinkObject<GraphNode, GraphLink>;

type YearFilter = "all" | "1" | "2" | "3" | "4";
type NodeTypeFilter = "all" | "monographs" | "courses" | "reviewers";

const DOMAIN_ANGLES: Record<StarDomainId, [number, number]> = {
  systems: [-Math.PI * 0.45, Math.PI * 0.05],
  theory: [Math.PI * 0.05, Math.PI * 0.55],
  security: [Math.PI * 0.55, Math.PI * 1.05],
  software: [Math.PI * 1.05, Math.PI * 1.55],
};

function hexToRgb(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16) || 0;
  const g = parseInt(clean.slice(2, 4), 16) || 229;
  const b = parseInt(clean.slice(4, 6), 16) || 255;
  return `${r}, ${g}, ${b}`;
}

function getEndpointId(endpoint: string | number | GraphNodeObj | undefined): string {
  if (typeof endpoint === "object" && endpoint !== null) {
    return String(endpoint.id ?? "");
  }
  return String(endpoint ?? "");
}

function createRadialGlowSprite(innerRgba: string, midRgba: string, outerRgba: string, size = 192): HTMLCanvasElement | null {
  if (typeof document === "undefined") return null;
  const offscreen = document.createElement("canvas");
  offscreen.width = size;
  offscreen.height = size;
  const octx = offscreen.getContext("2d");
  if (!octx) return null;
  const half = size / 2;
  const grad = octx.createRadialGradient(half, half, half * 0.08, half, half, half);
  grad.addColorStop(0, innerRgba);
  grad.addColorStop(0.45, midRgba);
  grad.addColorStop(1, outerRgba);
  octx.fillStyle = grad;
  octx.fillRect(0, 0, size, size);
  return offscreen;
}

export default function ObsidianGraph() {
  const graphSearchInputId = useId();
  const yearFilterSelectId = useId();
  const nodeTypeSelectId = useId();

  const { theme, universe, isLite } = useTheme();
  const { isNoteCompleted, toggleNoteCompleted } = useStudyPlan();
  const isLightSurface =
    (universe === "cyber-zen" && theme === "light") ||
    universe === "neo-brutalism" ||
    universe === "minimalism" ||
    universe === "broken-grid";

  const [rawData, setRawData] = useState<{ nodes: GraphNodeObj[]; links: GraphLinkObj[] }>({
    nodes: [],
    links: [],
  });
  const [activeDomain, setActiveDomain] = useState<StarDomainId | "all">("all");
  const [activeYear, setActiveYear] = useState<YearFilter>("all");
  const [nodeTypeFilter, setNodeTypeFilter] = useState<NodeTypeFilter>("all");
  const [hudSearch, setHudSearch] = useState<string>("");
  const [hudExpanded, setHudExpanded] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoverNode, setHoverNode] = useState<GraphNodeObj | null>(null);
  const hoverNodeRef = useRef<GraphNodeObj | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNodeObj | null>(null);
  const selectedNodeRef = useRef<GraphNodeObj | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<ForceGraphMethods<GraphNodeObj, GraphLinkObj> | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/graph")
      .then((res) => res.json())
      .then((fetchedData: { nodes: GraphNodeObj[]; links: GraphLinkObj[] }) => {
        const degreeMap = new Map<string, number>();
        fetchedData.links.forEach((link) => {
          const src = getEndpointId(link.source);
          const tgt = getEndpointId(link.target);
          degreeMap.set(src, (degreeMap.get(src) || 0) + 1);
          degreeMap.set(tgt, (degreeMap.get(tgt) || 0) + 1);
        });

        // Position Course Stars in radial sectors around the Central Singularity (0,0)
        const starPositions = new Map<string, { x: number; y: number; angle: number }>();
        const domainBuckets: Record<StarDomainId, GraphNodeObj[]> = {
          systems: [],
          theory: [],
          security: [],
          software: [],
        };

        fetchedData.nodes.forEach((node) => {
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

        // Deterministic initial placement for orbiting satellites around their Course Star
        fetchedData.nodes.forEach((node, idx) => {
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
              const angle = ((idx * 137.5) % 360) * (Math.PI / 180);
              const dist = 380 + (idx % 7) * 14;
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

  // Filter nodes & links by Domain, Academic Year, and Node Type
  const graphData = useMemo(() => {
    const targetYear = activeYear === "all" ? null : parseInt(activeYear, 10);

    const allowedNodes = rawData.nodes.filter((n) => {
      if (n.tier === "sun") return true;
      if (activeDomain !== "all" && n.domain !== activeDomain) return false;
      if (targetYear !== null && n.year !== undefined && n.year !== targetYear) return false;

      if (nodeTypeFilter === "courses" && n.tier === "satellite") return false;
      if (nodeTypeFilter === "monographs" && n.tier === "satellite" && (n.isUtility || n.isReviewer)) {
        return false;
      }
      if (nodeTypeFilter === "reviewers" && n.tier === "satellite" && !n.isReviewer && !n.isUtility) {
        return false;
      }
      return true;
    });

    const allowedIds = new Set(allowedNodes.map((n) => n.id));

    const allowedLinks = rawData.links
      .filter((l) => {
        const src = getEndpointId(l.source);
        const tgt = getEndpointId(l.target);
        return allowedIds.has(src) && allowedIds.has(tgt);
      })
      .map((l) => ({
        ...l,
        source: getEndpointId(l.source),
        target: getEndpointId(l.target),
      }));

    return {
      nodes: allowedNodes,
      links: allowedLinks,
    };
  }, [rawData, activeDomain, activeYear, nodeTypeFilter]);

  // Precompute 1-hop constellation adjacency map & node lookup map
  const { neighborMap, nodeById } = useMemo(() => {
    const nMap = new Map<string, Set<string>>();
    const byId = new Map<string, GraphNodeObj>();
    for (const node of graphData.nodes) {
      byId.set(node.id, node);
    }
    for (const link of graphData.links) {
      const s = getEndpointId(link.source);
      const t = getEndpointId(link.target);
      if (!nMap.has(s)) nMap.set(s, new Set());
      if (!nMap.has(t)) nMap.set(t, new Set());
      nMap.get(s)!.add(t);
      nMap.get(t)!.add(s);
    }
    return { neighborMap: nMap, nodeById: byId };
  }, [graphData]);

  // Configure Gravitational Orbital Forces around the Singularity
  useEffect(() => {
    if (fgRef.current && graphData.nodes.length > 0) {
      fgRef.current.d3Force("charge")?.strength((node: GraphNodeObj) => {
        if (node.tier === "sun") return -600;
        if (node.tier === "star") return -280;
        return -45;
      });

      const linkForce = fgRef.current.d3Force("link") as
        | {
            distance?: (fn: (link: GraphLinkObj) => number) => {
              strength?: (fn: (link: GraphLinkObj) => number) => void;
            };
          }
        | undefined;

      linkForce
        ?.distance?.((link: GraphLinkObj) => {
          if (link.kind === "solar") return 230;
          if (link.kind === "constellation") return 135;
          if (link.kind === "orbital") return 55;
          return 95;
        })
        ?.strength?.((link: GraphLinkObj) => {
          if (link.kind === "solar") return 0.35;
          if (link.kind === "constellation") return 0.16;
          if (link.kind === "orbital") return 0.68;
          return 0.08;
        });

      fgRef.current.d3Force(
        "radialOrbit",
        d3
          .forceRadial<GraphNodeObj>(
            (node) => {
              if (node.tier === "sun") return 0;
              if (node.tier === "star") return 230;
              return 410;
            },
            0,
            0
          )
          .strength((node) => {
            if (node.tier === "sun") return 1;
            if (node.tier === "star") return 0.42;
            return 0.12;
          })
      );

      fgRef.current.d3ReheatSimulation();
    }
  }, [graphData]);

  const handleNodeHover = useCallback((node: GraphNodeObj | null) => {
    setHoverNode(node || null);
    hoverNodeRef.current = node || null;
  }, []);

  const flyToAndSelectNode = useCallback((node: GraphNodeObj | null) => {
    setSelectedNode(node);
    selectedNodeRef.current = node;
    if (node && fgRef.current && typeof node.x === "number" && typeof node.y === "number") {
      fgRef.current.centerAt(node.x, node.y, 480);
      if (node.tier !== "sun") {
        const currentZoom = fgRef.current.zoom();
        if (typeof currentZoom === "number" && currentZoom < 1.55) {
          fgRef.current.zoom(1.6, 480);
        }
      }
    }
  }, []);

  const handleNodeClick = useCallback(
    (node: GraphNodeObj) => {
      flyToAndSelectNode(node);
    },
    [flyToAndSelectNode]
  );

  const handleBackgroundClick = useCallback(() => {
    setSelectedNode(null);
    selectedNodeRef.current = null;
  }, []);

  // Quick-Search matches for Portfolio HUD warp
  const searchMatches = useMemo(() => {
    const q = hudSearch.trim().toLowerCase();
    if (!q) return [];
    return graphData.nodes
      .filter(
        (n) =>
          n.name.toLowerCase().includes(q) ||
          (n.courseCode && n.courseCode.toLowerCase().includes(q)) ||
          (n.subtitle && n.subtitle.toLowerCase().includes(q))
      )
      .slice(0, 5);
  }, [hudSearch, graphData.nodes]);

  const handleHudSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchMatches.length > 0) {
        flyToAndSelectNode(searchMatches[0]);
      }
    },
    [searchMatches, flyToAndSelectNode]
  );

  const getNodeColor = useCallback(
    (node: GraphNodeObj) => {
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
    (link: GraphLinkObj) => {
      const srcId = getEndpointId(link.source);
      const tgtId = getEndpointId(link.target);
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
        return isLightSurface ? "rgba(75, 94, 120, 0.24)" : "rgba(148, 163, 184, 0.22)";
      }
      return isLightSurface ? "rgba(100, 116, 139, 0.20)" : "rgba(75, 94, 120, 0.22)";
    },
    [hoverNode, selectedNode, isLightSurface, universe]
  );

  const getLinkWidth = useCallback(
    (link: GraphLinkObj) => {
      const srcId = getEndpointId(link.source);
      const tgtId = getEndpointId(link.target);
      const isConnected =
        (hoverNode && (hoverNode.id === srcId || hoverNode.id === tgtId)) ||
        (selectedNode && (selectedNode.id === srcId || selectedNode.id === tgtId));

      if (isConnected) return 2.1;
      if (link.kind === "solar") return 1.3;
      if (link.kind === "constellation") return 1.1;
      if (link.kind === "orbital") return 0.65;
      return 0.5;
    },
    [hoverNode, selectedNode]
  );

  // Offscreen <canvas> sprite caches keyed on theme/universe for 60 FPS rendering
  const { singularityAuraCanvas, parallaxSunCanvas, starGlowSprites } = useMemo(() => {
    const sAura = isLightSurface
      ? createRadialGlowSprite("rgba(2, 132, 199, 0.35)", "rgba(220, 38, 38, 0.14)", "rgba(2, 132, 199, 0)", 256)
      : createRadialGlowSprite("rgba(0, 229, 255, 0.48)", "rgba(230, 57, 70, 0.22)", "rgba(0, 0, 0, 0)", 256);

    const pSun = createRadialGlowSprite(
      "rgba(250, 245, 255, 0.95)",
      "rgba(139, 92, 246, 0.65)",
      "rgba(76, 29, 149, 0)",
      128
    );

    const domainGlows: Record<StarDomainId, HTMLCanvasElement | null> = {
      systems: createRadialGlowSprite(
        `rgba(${hexToRgb(isLightSurface ? STAR_DOMAINS.systems.lightColor : STAR_DOMAINS.systems.color)}, 0.42)`,
        `rgba(${hexToRgb(isLightSurface ? STAR_DOMAINS.systems.lightColor : STAR_DOMAINS.systems.color)}, 0.14)`,
        "rgba(0,0,0,0)",
        96
      ),
      theory: createRadialGlowSprite(
        `rgba(${hexToRgb(isLightSurface ? STAR_DOMAINS.theory.lightColor : STAR_DOMAINS.theory.color)}, 0.42)`,
        `rgba(${hexToRgb(isLightSurface ? STAR_DOMAINS.theory.lightColor : STAR_DOMAINS.theory.color)}, 0.14)`,
        "rgba(0,0,0,0)",
        96
      ),
      security: createRadialGlowSprite(
        `rgba(${hexToRgb(isLightSurface ? STAR_DOMAINS.security.lightColor : STAR_DOMAINS.security.color)}, 0.42)`,
        `rgba(${hexToRgb(isLightSurface ? STAR_DOMAINS.security.lightColor : STAR_DOMAINS.security.color)}, 0.14)`,
        "rgba(0,0,0,0)",
        96
      ),
      software: createRadialGlowSprite(
        `rgba(${hexToRgb(isLightSurface ? STAR_DOMAINS.software.lightColor : STAR_DOMAINS.software.color)}, 0.42)`,
        `rgba(${hexToRgb(isLightSurface ? STAR_DOMAINS.software.lightColor : STAR_DOMAINS.software.color)}, 0.14)`,
        "rgba(0,0,0,0)",
        96
      ),
    };

    return {
      singularityAuraCanvas: sAura,
      parallaxSunCanvas: pSun,
      starGlowSprites: domainGlows,
    };
  }, [isLightSurface]);

  const handleNodeLabel = useCallback(() => "", []);

  const getLinkDirectionalParticles = useCallback(
    (link: GraphLinkObj) => {
      if (isLite) return 0;
      if (link.kind === "solar") return 2;
      const focusNode = hoverNodeRef.current || selectedNodeRef.current;
      if (focusNode) {
        const src = getEndpointId(link.source);
        const tgt = getEndpointId(link.target);
        if (src === focusNode.id || tgt === focusNode.id) return 3;
      }
      return 0;
    },
    [isLite]
  );

  const getLinkDirectionalParticleColor = useCallback(
    () =>
      universe === "neo-brutalism"
        ? "#C5221F"
        : universe === "broken-grid"
        ? "#0D5C3A"
        : universe === "parallax"
        ? "#8B5CF6"
        : isLightSurface
        ? "#0284C7"
        : "#00E5FF",
    [universe, isLightSurface]
  );

  const renderNode = useCallback(
    (node: GraphNodeObj, ctx: CanvasRenderingContext2D, globalScale: number) => {
      if (typeof node.x !== "number" || typeof node.y !== "number") return;

      const isHovered = Boolean(hoverNode && hoverNode.id === node.id);
      const isSelected = Boolean(selectedNode && selectedNode.id === node.id);
      const focusId = hoverNode?.id || selectedNode?.id || null;
      const isInConstellation =
        !focusId ||
        node.id === focusId ||
        Boolean(neighborMap.get(focusId)?.has(node.id));

      const baseColor = getNodeColor(node);
      const rgb = hexToRgb(baseColor);

      ctx.save();
      if (!isInConstellation && node.tier !== "sun") {
        ctx.globalAlpha = 0.25;
      }

      // ─── 1. CENTRAL SINGULARITY ("COMPUTER SCIENCE // SINGULARITY") ──────
      if (node.tier === "sun") {
        // Universal orbital & telemetry guide rings centered on (0, 0)
        ctx.save();
        ctx.strokeStyle = isLightSurface
          ? "rgba(15, 23, 42, 0.16)"
          : "rgba(0, 229, 255, 0.14)";
        ctx.lineWidth = Math.max(0.5, 1 / globalScale);
        ctx.setLineDash([6 / globalScale, 6 / globalScale]);
        [230, 410, 560].forEach((orbitR) => {
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

        ctx.save();
        ctx.translate(node.x, node.y);

        // ── EMBLEM A: CYBER-ZEN (Event Horizon Black Hole Singularity & Accretion Disk) ──
        if (universe === "cyber-zen") {
          const coreR = isHovered || isSelected ? 24 : 20;
          const auraRadius = coreR * 3.4;

          if (singularityAuraCanvas) {
            ctx.drawImage(
              singularityAuraCanvas,
              -auraRadius,
              -auraRadius,
              auraRadius * 2,
              auraRadius * 2
            );
          }

          // Tilted Relativistic Accretion Disk (back arc + forward ring)
          ctx.save();
          ctx.rotate(-Math.PI / 11);
          ctx.beginPath();
          ctx.ellipse(0, 0, coreR * 2.65, coreR * 0.72, 0, 0, Math.PI * 2);
          ctx.strokeStyle = isLightSurface
            ? "rgba(2, 132, 199, 0.78)"
            : "rgba(0, 229, 255, 0.85)";
          ctx.lineWidth = Math.max(1.4, 2.2 / globalScale);
          ctx.stroke();

          ctx.beginPath();
          ctx.ellipse(0, 0, coreR * 2.15, coreR * 0.56, 0, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(230, 57, 70, 0.72)";
          ctx.lineWidth = Math.max(1.0, 1.4 / globalScale);
          ctx.stroke();
          ctx.restore();

          // Outer Calibrated Astrolabe Ring + 12 Graduation Ticks
          ctx.beginPath();
          ctx.arc(0, 0, coreR * 2.25, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(0, 229, 255, 0.45)";
          ctx.lineWidth = Math.max(0.8, 1.1 / globalScale);
          ctx.stroke();

          for (let i = 0; i < 12; i++) {
            const angle = (i * Math.PI) / 6;
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * coreR * 1.98, Math.sin(angle) * coreR * 1.98);
            ctx.lineTo(Math.cos(angle) * coreR * 2.25, Math.sin(angle) * coreR * 2.25);
            ctx.strokeStyle = i % 3 === 0 ? "#00E5FF" : "rgba(0, 229, 255, 0.45)";
            ctx.lineWidth = Math.max(0.7, 1.2 / globalScale);
            ctx.stroke();
          }

          // Deep Event Horizon Shadow Core + Photon Sphere Rim
          ctx.beginPath();
          ctx.arc(0, 0, coreR * 0.9, 0, Math.PI * 2);
          ctx.fillStyle = isLightSurface ? "#090D16" : "#000000";
          ctx.fill();
          ctx.strokeStyle = "#00E5FF";
          ctx.lineWidth = Math.max(1.4, 2.0 / globalScale);
          ctx.stroke();

          // Inner Singularity Photon Pinpoint
          ctx.beginPath();
          ctx.arc(0, 0, Math.max(2.0, 2.8 / globalScale), 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
        }

        // ── EMBLEM B: NEO-BRUTALISM (Isometric 3D Cube & Industrial Target Reticles) ──
        else if (universe === "neo-brutalism") {
          const size = isHovered || isSelected ? 22 : 18;
          const ext = size * 2.5;
          ctx.strokeStyle = "#0A0A0A";
          ctx.lineWidth = Math.max(1.5, 2.2 / globalScale);
          ctx.beginPath();
          ctx.moveTo(-ext, 0);
          ctx.lineTo(ext, 0);
          ctx.moveTo(0, -ext);
          ctx.lineTo(0, ext);
          ctx.stroke();

          [-size * 1.8, -size * 1.2, size * 1.2, size * 1.8].forEach((pos) => {
            ctx.beginPath();
            ctx.moveTo(pos, -4);
            ctx.lineTo(pos, 4);
            ctx.moveTo(-4, pos);
            ctx.lineTo(4, pos);
            ctx.stroke();
          });

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

          ctx.beginPath();
          ctx.moveTo(-size, -size / 2);
          ctx.lineTo(0, 0);
          ctx.lineTo(0, size);
          ctx.lineTo(-size, size / 2);
          ctx.closePath();
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
          ctx.stroke();

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
          ctx.beginPath();
          ctx.arc(0, 0, r * 2.1, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(24, 24, 27, 0.25)";
          ctx.lineWidth = Math.max(0.6, 0.9 / globalScale);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, 0, r * 1.5, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(24, 24, 27, 0.15)";
          ctx.stroke();

          for (let i = 0; i < 8; i++) {
            const a = (i * Math.PI) / 4;
            ctx.beginPath();
            ctx.arc(Math.cos(a) * r * 2.1, Math.sin(a) * r * 2.1, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = "#18181B";
            ctx.fill();
          }

          const needleLen = r * 2.6;
          ctx.strokeStyle = "#18181B";
          ctx.lineWidth = Math.max(0.8, 1.1 / globalScale);
          ctx.beginPath();
          ctx.moveTo(-needleLen, 0);
          ctx.lineTo(needleLen, 0);
          ctx.moveTo(0, -needleLen);
          ctx.lineTo(0, needleLen);
          ctx.stroke();

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

        // ── EMBLEM D: PARALLAX (Topographic Heliocentric Sun) ──
        else if (universe === "parallax") {
          const r = isHovered || isSelected ? 22 : 18;
          [r * 2.6, r * 1.9, r * 1.3].forEach((radius, idx) => {
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.strokeStyle = idx === 0 ? "rgba(196, 181, 253, 0.35)" : "rgba(139, 92, 246, 0.45)";
            ctx.lineWidth = Math.max(0.8, 1.2 / globalScale);
            ctx.stroke();
          });

          for (let i = 0; i < 8; i++) {
            const a = (i * Math.PI) / 4;
            ctx.beginPath();
            ctx.moveTo(Math.cos(a) * r * 1.3, Math.sin(a) * r * 1.3);
            ctx.lineTo(Math.cos(a) * r * 2.6, Math.sin(a) * r * 2.6);
            ctx.strokeStyle = i % 2 === 0 ? "#C4B5FD" : "#8B5CF6";
            ctx.lineWidth = Math.max(0.7, 1.1 / globalScale);
            ctx.stroke();
          }

          if (parallaxSunCanvas) {
            ctx.drawImage(parallaxSunCanvas, -r * 1.3, -r * 1.3, r * 2.6, r * 2.6);
          }
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.strokeStyle = "#FAF5FF";
          ctx.lineWidth = Math.max(1.2, 1.8 / globalScale);
          ctx.stroke();
        }

        // ── EMBLEM E: BROKEN-GRID (Architectural Blueprint Datum Grid) ──
        else {
          const s = isHovered || isSelected ? 22 : 18;
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

          const fontSz = Math.max(6, 8.5 / globalScale);
          ctx.font = `600 ${fontSz}px monospace`;
          ctx.fillStyle = "#0D5C3A";
          ctx.fillText("[00//00]", s * 1.3, -s * 1.1);

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
        const fontSize = Math.max(8.5, 11.5 / globalScale);
        ctx.font = `700 ${fontSize}px monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const label = "COMPUTER SCIENCE // SINGULARITY";
        const textWidth = ctx.measureText(label).width;
        const padX = fontSize * 0.65;
        const padY = fontSize * 0.4;
        const boxW = textWidth + padX * 2;
        const boxH = fontSize + padY * 2;
        const yOff = 36 + boxH / 2;

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
        ctx.restore();
        return;
      }

      // ─── 2. COURSE STARS ───────────────────────────────────────────────────
      if (node.tier === "star") {
        const noteCount = node.noteCount || 10;
        const starRadius = Math.min(13, Math.max(8, 6.5 + Math.log(noteCount + 1) * 1.6));

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
        } else if (universe === "broken-grid") {
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
          ctx.restore();
        } else if (universe === "minimalism") {
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
        } else {
          // Offscreen cached Star Glow Flare
          const domKey: StarDomainId = node.domain || "systems";
          const sprite = starGlowSprites[domKey];
          const haloR = starRadius * (isHovered || isSelected ? 2.8 : 2.1);
          if (sprite) {
            ctx.drawImage(sprite, node.x - haloR, node.y - haloR, haloR * 2, haloR * 2);
          }

          ctx.beginPath();
          ctx.arc(node.x, node.y, starRadius * 1.45, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${rgb}, ${isHovered || isSelected ? 0.85 : 0.45})`;
          ctx.lineWidth = Math.max(0.7, 1.1 / globalScale);
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(node.x, node.y, starRadius, 0, Math.PI * 2);
          ctx.fillStyle =
            isHovered || isSelected ? (isLightSurface ? "#0F172A" : "#FFFFFF") : baseColor;
          ctx.fill();
        }

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
        ctx.restore();
        return;
      }

      // ─── 3. TOPIC / NOTE SATELLITES (Logarithmic Degree Scaling + Utility Geometry) ───
      const isDone = node.path ? isNoteCompleted(node.path) : false;
      const degreeScale = Math.log2(1 + (node.degree || 1)) * 0.65;
      const satRadius = (isHovered || isSelected ? 4.8 : isDone ? 3.8 : 2.8) + degreeScale;

      if (node.isReviewer || node.isUtility) {
        // Geometric diamond satellite marker for Reviewers & Labs
        ctx.save();
        ctx.translate(node.x, node.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = isHovered || isSelected ? "#FFFFFF" : baseColor;
        ctx.fillRect(-satRadius, -satRadius, satRadius * 2, satRadius * 2);
        ctx.strokeStyle = node.isReviewer ? "#F59E0B" : isLightSurface ? "#0F172A" : "#FFFFFF";
        ctx.lineWidth = Math.max(0.8, 1.1 / globalScale);
        ctx.strokeRect(-satRadius, -satRadius, satRadius * 2, satRadius * 2);
        ctx.restore();
      } else if (universe === "neo-brutalism" || universe === "broken-grid") {
        ctx.fillStyle = isHovered || isSelected ? "#C5221F" : isDone ? "#0D5C3A" : baseColor;
        ctx.fillRect(node.x - satRadius, node.y - satRadius, satRadius * 2, satRadius * 2);
        ctx.strokeStyle = universe === "neo-brutalism" ? "#0A0A0A" : "rgba(17, 40, 31, 0.6)";
        ctx.lineWidth = Math.max(0.9, 1.2 / globalScale);
        ctx.strokeRect(node.x - satRadius, node.y - satRadius, satRadius * 2, satRadius * 2);
      } else {
        if (isHovered || isSelected || isDone) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, satRadius * 1.9, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb}, ${isHovered || isSelected ? 0.35 : 0.22})`;
          ctx.fill();
        }

        if (isDone) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, satRadius * 1.45, 0, Math.PI * 2);
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

      const showSatLabel = isHovered || isSelected || globalScale >= 2.0;
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

      ctx.restore();
    },
    [
      hoverNode,
      selectedNode,
      neighborMap,
      isLightSurface,
      universe,
      getNodeColor,
      isNoteCompleted,
      singularityAuraCanvas,
      parallaxSunCanvas,
      starGlowSprites,
    ]
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

  const selectedCourseSimulators = useMemo(() => {
    if (!selectedNode?.courseCode) return [];
    return getSimulatorsForCourse(selectedNode.courseCode);
  }, [selectedNode]);

  const selectedNeighbors = useMemo(() => {
    if (!selectedNode) return [];
    const ids = Array.from(neighborMap.get(selectedNode.id) || []);
    return ids
      .map((id) => nodeById.get(id))
      .filter((n): n is GraphNodeObj => Boolean(n && n.tier !== "sun"))
      .slice(0, 6);
  }, [selectedNode, neighborMap, nodeById]);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden bg-transparent">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: motionTokens.easing.engram }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[var(--zen-void)] pointer-events-none"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-t-2 border-[var(--zen-cyan)] rounded-full animate-spin" />
              <p className="font-mono text-xs tracking-[0.3em] text-[var(--zen-cyan)]/80 uppercase">
                INITIALIZING SINGULARITY KNOWLEDGE GRAPH...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top-Left Portfolio Graph HUD Controls */}
      <div className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-3xl z-20 p-2.5 rounded-xl backdrop-blur-xl bg-[var(--zen-card)]/90 border border-[var(--zen-border)] shadow-xl universe-card space-y-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "all" as const, label: "ALL DOMAINS", color: "#00E5FF" },
            { id: "systems" as const, label: "SYSTEMS", color: STAR_DOMAINS.systems.color },
            { id: "theory" as const, label: "THEORY & MATH", color: STAR_DOMAINS.theory.color },
            { id: "security" as const, label: "NET & SECURITY", color: STAR_DOMAINS.security.color },
            { id: "software" as const, label: "SOFTWARE & AI", color: STAR_DOMAINS.software.color },
          ].map((chip) => {
            const isActive = activeDomain === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setActiveDomain(chip.id)}
                className={`px-2 py-1 rounded text-[10px] font-mono tracking-wider transition-all flex items-center gap-1.5 border ${
                  isActive
                    ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-snow)] font-semibold"
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

          <button
            type="button"
            onClick={() => setHudExpanded((e) => !e)}
            aria-label="Toggle graph filters panel"
            className="ml-auto px-2 py-1 rounded text-[10px] font-mono border border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)]"
          >
            {hudExpanded ? "[- FILTERS]" : "[+ FILTERS]"}
          </button>
        </div>

        {hudExpanded && (
          <div className="flex flex-wrap items-center gap-2 pt-1.5 border-t border-[var(--zen-border)]/60">
            {/* Academic Year Filter */}
            <div>
              <label htmlFor={yearFilterSelectId} className="sr-only">
                Filter by Academic Year
              </label>
              <select
                id={yearFilterSelectId}
                aria-label="Filter graph by academic year"
                value={activeYear}
                onChange={(e) => setActiveYear(e.target.value as YearFilter)}
                className="bg-[var(--zen-void)] border border-[var(--zen-border)] rounded px-2 py-1 font-mono text-[10px] text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
              >
                <option value="all">ALL YEARS</option>
                <option value="1">1ST YEAR</option>
                <option value="2">2ND YEAR</option>
                <option value="3">3RD YEAR</option>
                <option value="4">4TH YEAR</option>
              </select>
            </div>

            {/* Node Type Filter */}
            <div>
              <label htmlFor={nodeTypeSelectId} className="sr-only">
                Filter by Node Type
              </label>
              <select
                id={nodeTypeSelectId}
                aria-label="Filter graph by node type"
                value={nodeTypeFilter}
                onChange={(e) => setNodeTypeFilter(e.target.value as NodeTypeFilter)}
                className="bg-[var(--zen-void)] border border-[var(--zen-border)] rounded px-2 py-1 font-mono text-[10px] text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
              >
                <option value="all">COURSES + NOTES</option>
                <option value="monographs">COURSES + MONOGRAPHS</option>
                <option value="courses">COURSE STARS ONLY</option>
                <option value="reviewers">REVIEWERS & LABS</option>
              </select>
            </div>

            {/* Quick-Search Command Warp */}
            <form onSubmit={handleHudSearchSubmit} className="flex items-center gap-1 flex-1 min-w-[180px]">
              <label htmlFor={graphSearchInputId} className="sr-only">
                Quick-search graph node to warp camera
              </label>
              <input
                id={graphSearchInputId}
                type="text"
                value={hudSearch}
                onChange={(e) => setHudSearch(e.target.value)}
                placeholder="Warp to course or monograph..."
                className="flex-1 bg-[var(--zen-void)] border border-[var(--zen-border)] rounded px-2.5 py-1 font-mono text-[10px] text-[var(--zen-snow)] placeholder:text-[var(--zen-ink-muted)] focus:outline-none focus:border-[var(--zen-cyan)]"
              />
              {searchMatches.length > 0 && (
                <button
                  type="submit"
                  className="px-2 py-1 rounded border border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 font-mono text-[10px] text-[var(--zen-cyan)] font-bold shrink-0"
                >
                  WARP ({searchMatches.length})
                </button>
              )}
            </form>
          </div>
        )}

        {/* Live Search Quick-Jump Suggestions */}
        {hudSearch.trim().length > 0 && searchMatches.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {searchMatches.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => flyToAndSelectNode(m)}
                className="px-2 py-0.5 rounded border border-[var(--zen-border)] bg-[var(--zen-void)]/80 hover:border-[var(--zen-cyan)] text-[10px] font-mono text-[var(--zen-frost)] truncate max-w-[200px]"
              >
                {m.courseCode ? `${m.courseCode}: ` : ""}
                {m.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom-Right Spatial HUD Overlay */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-wrap items-center gap-3 backdrop-blur-xl rounded-lg px-4 py-2 shadow-2xl bg-[var(--zen-card)] border border-[var(--zen-border)] universe-card">
        <div className="flex gap-3 text-[10px] font-mono text-[var(--zen-frost)]">
          <span>
            <strong className="text-[var(--zen-cyan)]">1</strong> SINGULARITY
          </span>
          <span>
            <strong className="text-[var(--zen-cyan)]">{starCount}</strong> COURSES
          </span>
          {nodeTypeFilter !== "courses" && (
            <span>
              <strong className="text-[var(--zen-cyan)]">{satelliteCount}</strong> NODES
            </span>
          )}
        </div>
        <div className="w-px h-4 bg-[var(--zen-border)] hidden sm:block" />
        <button
          type="button"
          onClick={() => {
            setSelectedNode(null);
            selectedNodeRef.current = null;
            fgRef.current?.centerAt(0, 0, 500);
            fgRef.current?.zoom(0.85, 500);
          }}
          className="text-[10px] font-mono tracking-wider text-[var(--zen-cyan)] hover:text-[var(--zen-snow)] transition-colors uppercase"
        >
          [ RESET SINGULARITY ]
        </button>
        <button
          type="button"
          onClick={() => fgRef.current?.zoomToFit(450, 45)}
          className="text-[10px] font-mono tracking-wider text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] transition-colors uppercase"
        >
          [ FIT GRAPH ]
        </button>
      </div>

      {/* Monograph & Simulator Telemetry Drawer */}
      <AnimatePresence>
        {selectedNode && (
          <motion.aside
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: motionTokens.easing.engram }}
            aria-label="Monograph and Simulator Telemetry Drawer"
            className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-auto sm:w-[26rem] bg-[var(--zen-card)] backdrop-blur-2xl border border-[var(--zen-border)] p-5 rounded-xl shadow-2xl z-50 flex flex-col pointer-events-auto universe-card space-y-3"
          >
            <div className="flex justify-between items-start border-b border-[var(--zen-border)] pb-3">
              <div className="min-w-0 pr-2 space-y-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest uppercase rounded border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/10 text-[var(--zen-cyan)] font-semibold">
                    {selectedNode.tier === "sun"
                      ? "SINGULARITY CORE"
                      : selectedNode.tier === "star"
                      ? `COURSE · ${selectedNode.track || "CORE CS"}`
                      : selectedNode.isReviewer
                      ? `REVIEWER · ${selectedNode.courseCode || "CS"}`
                      : `MONOGRAPH · ${selectedNode.courseCode || "CS"}`}
                  </span>
                  {(selectedNode.yearLabel || selectedNode.term) && (
                    <span className="text-[9px] font-mono text-[var(--zen-ink-muted)]">
                      {[selectedNode.yearLabel, selectedNode.term].filter(Boolean).join(" // ")}
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
                  <p className="text-[11px] font-mono text-[var(--zen-cyan)]/90 truncate">
                    {selectedNode.subtitle}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedNode(null);
                  selectedNodeRef.current = null;
                }}
                className="text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] transition-colors p-1 text-xs font-mono shrink-0"
                aria-label="Close telemetry drawer"
              >
                [x]
              </button>
            </div>

            <p className="text-[var(--zen-frost)] text-xs leading-relaxed line-clamp-3">
              {selectedNode.excerpt ||
                "Academic monograph indexed in the Project Engram Knowledge Graph."}
            </p>

            {/* Tags Chips */}
            {selectedNode.tags && selectedNode.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedNode.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 rounded bg-[var(--zen-void)] border border-[var(--zen-border)] font-mono text-[9px] text-[var(--zen-ink-muted)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* 1-Hop Constellation Links */}
            {selectedNeighbors.length > 0 && (
              <div className="space-y-1">
                <div className="text-[9px] font-mono uppercase tracking-wider text-[var(--zen-ink-muted)]">
                  CONSTELLATION CONNECTIONS ({selectedNeighbors.length} HOPS)
                </div>
                <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                  {selectedNeighbors.map((neighbor) => (
                    <button
                      key={neighbor.id}
                      type="button"
                      onClick={() => flyToAndSelectNode(neighbor)}
                      className="px-2 py-0.5 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)]/70 hover:border-[var(--zen-cyan)] text-[10px] font-mono text-[var(--zen-frost)] hover:text-[var(--zen-cyan)] transition-colors truncate max-w-[175px]"
                    >
                      -&gt; {neighbor.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Read Monograph CTA & Done Toggle */}
            {selectedNode.path && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => router.push(selectedNode.path)}
                    className="flex-1 py-2 bg-[var(--zen-cyan)]/10 hover:bg-[var(--zen-cyan)]/20 border border-[var(--zen-cyan)]/40 hover:border-[var(--zen-cyan)] text-[var(--zen-cyan)] hover:text-[var(--zen-snow)] font-mono text-xs tracking-[0.15em] uppercase transition-all rounded flex items-center justify-center gap-2"
                  >
                    <span>
                      {selectedNode.tier === "sun"
                        ? "OPEN DIRECTORY"
                        : selectedNode.tier === "star"
                        ? `EXPLORE ${selectedNode.name}`
                        : "READ MONOGRAPH"}
                    </span>
                    <span>-&gt;</span>
                  </button>
                  {selectedNode.tier === "satellite" && (
                    <button
                      type="button"
                      onClick={() =>
                        toggleNoteCompleted(selectedNode.path, selectedNode.name)
                      }
                      className={`px-3 py-2 rounded border font-mono text-[10px] tracking-wider uppercase transition-all shrink-0 ${
                        selectedIsCompleted
                          ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)] text-[var(--zen-void)] font-bold"
                          : "border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)]"
                      }`}
                    >
                      {selectedIsCompleted ? "DONE" : "MARK"}
                    </button>
                  )}
                </div>

                {/* Secondary Launch Course Simulator Shortcut */}
                {selectedCourseSimulators.length > 0 && (
                  <Link
                    href={`/simulators?id=${selectedCourseSimulators[0].id}`}
                    className="w-full py-2 px-3 rounded border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 hover:text-emerald-100 font-mono text-[10px] tracking-wider uppercase transition-all flex items-center justify-between gap-2"
                  >
                    <span className="truncate">
                      SIMULATOR: {selectedCourseSimulators[0].title}
                    </span>
                    <span className="shrink-0 font-bold">LAUNCH -&gt;</span>
                  </Link>
                )}
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>

      <ForceGraph2D<GraphNodeObj, GraphLinkObj>
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        backgroundColor="rgba(0,0,0,0)"
        nodeLabel={handleNodeLabel}
        nodeColor={getNodeColor}
        linkColor={getLinkColor}
        nodeRelSize={5}
        linkWidth={getLinkWidth}
        linkDirectionalParticles={getLinkDirectionalParticles}
        linkDirectionalParticleWidth={2.2}
        linkDirectionalParticleSpeed={0.012}
        linkDirectionalParticleColor={getLinkDirectionalParticleColor}
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
