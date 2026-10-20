"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { animate } from "animejs";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BorderBeam } from "@/components/ui/border-beam";
import { useTheme } from "@/components/ThemeProvider";
import { useStudyPlan } from "@/components/StudyPlanProvider";
import { STUDY_PLAN_TIER_LIST, STUDY_PLAN_TIERS } from "@/lib/study-plans";
import {
  COURSE_REGISTRY,
  STAR_DOMAINS,
  type StarDomainId,
  type CourseTrack,
} from "@/lib/course-registry";

interface BentoLayoutConfig {
  spanClass: string;
  isWide: boolean;
}

function getBentoLayout(index: number, total: number): BentoLayoutConfig {
  if (total === 7) {
    if (index === 5) {
      return {
        spanClass: "col-span-1 sm:col-span-1 lg:col-span-2",
        isWide: true,
      };
    }
    if (index === 6) {
      return {
        spanClass: "col-span-1 sm:col-span-2 lg:col-span-1",
        isWide: false,
      };
    }
    return {
      spanClass: "col-span-1",
      isWide: false,
    };
  }

  if (total === 6) {
    if (index === 0 || index === 5) {
      return {
        spanClass: "col-span-1 sm:col-span-2 lg:col-span-2",
        isWide: true,
      };
    }
    return {
      spanClass: "col-span-1",
      isWide: false,
    };
  }

  if (total === 5) {
    if (index === 0 || index === 3 || index === 4) {
      return {
        spanClass: "col-span-1 sm:col-span-2 lg:col-span-2",
        isWide: true,
      };
    }
    return {
      spanClass: "col-span-1",
      isWide: false,
    };
  }

  if (total === 4) {
    return {
      spanClass: "col-span-1 sm:col-span-1 lg:col-span-2",
      isWide: true,
    };
  }

  if (total === 3) {
    if (index === 0) {
      return {
        spanClass: "col-span-1 sm:col-span-2 lg:col-span-2",
        isWide: true,
      };
    }
    return {
      spanClass: "col-span-1",
      isWide: false,
    };
  }

  if (total === 2) {
    return {
      spanClass: "col-span-1 sm:col-span-1 lg:col-span-2",
      isWide: true,
    };
  }

  if (total === 1) {
    return {
      spanClass: "col-span-1 sm:col-span-2 lg:col-span-4",
      isWide: true,
    };
  }

  return {
    spanClass: "col-span-1",
    isWide: false,
  };
}

export default function HomePage() {
  const { universe } = useTheme();
  const { tier, setTier, completedCount, setSyncModalOpen } = useStudyPlan();

  const heroRef = useRef<HTMLDivElement | null>(null);
  const katanaDividerRef = useRef<SVGSVGElement | null>(null);
  const { scrollY, scrollYProgress } = useScroll();

  // Multi-layer parallax scroll choreography
  const astrolabeRotation = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const astrolabeY = useTransform(scrollY, [0, 1000], [0, 180]);
  const mountainY = useTransform(scrollY, [0, 1000], [0, 220]);
  const calligraphyY = useTransform(scrollY, [0, 800], [0, -110]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.22], [1, 0.94]);

  const [activeDomain, setActiveDomain] = useState<StarDomainId | "all">("all");
  const [activeTrack, setActiveTrack] = useState<CourseTrack | "all">("all");
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 7;

  useEffect(() => {
    setCurrentPage(0);
  }, [activeDomain, activeTrack]);

  useEffect(() => {
    if (katanaDividerRef.current && universe === "cyber-zen") {
      animate(katanaDividerRef.current.querySelectorAll("line, polygon"), {
        opacity: [0, 1],
        duration: 1200,
        easing: "cubicBezier(0.16, 1, 0.3, 1)",
      });
    }
  }, [universe]);

  const filteredCourses = COURSE_REGISTRY.filter((c) => {
    const matchesDomain = activeDomain === "all" || c.category === activeDomain;
    const matchesTrack = activeTrack === "all" || c.track === activeTrack;
    return matchesDomain && matchesTrack;
  });

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE) || 1;
  const currentCourses = filteredCourses.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  // Only apply 3D tilt in cyber-zen or parallax
  const enable3DTilt = universe === "cyber-zen" || universe === "parallax";

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enable3DTilt) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotY = (x / rect.width - 0.5) * 8;
    const rotX = (y / rect.height - 0.5) * -8;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--my", `${(y / rect.height) * 100}%`);
  };

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enable3DTilt) return;
    const card = e.currentTarget;
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <div className="relative min-h-screen w-full bg-[var(--zen-void)] text-[var(--zen-frost)] selection:bg-[var(--zen-cyan)] selection:text-[var(--zen-void)] transition-colors duration-500">
      {/* ======================================================================
          UNIVERSE-ADAPTIVE HERO STAGE
          Each of the 5 universes renders its own distinct architectural hero.
          ====================================================================== */}

      {universe === "neo-brutalism" && (
        <section className="relative pt-10 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
          {/* Brutalist Ticker Banner */}
          <div className="w-full border-[3px] border-[#0A0A0A] bg-[#FFDE59] text-[#0A0A0A] px-4 py-2 mb-8 shadow-[5px_5px_0px_#0A0A0A] flex flex-wrap items-center justify-between gap-2 font-mono text-xs font-bold uppercase tracking-wider">
            <span>SYS.ENGRAM // V2.0 BRUTALIST EDITION</span>
            <span>25 COURSES // 539 MONOGRAPHS // ZERO ACCOUNTS</span>
            <span>OPEN SOURCE MIT</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Brutalist Headline Block */}
            <div className="lg:col-span-8 border-[3px] border-[#0A0A0A] bg-[#FFFFFF] p-8 sm:p-12 shadow-[8px_8px_0px_#0A0A0A] flex flex-col justify-between">
              <div>
                <div className="inline-block bg-[#FF4D00] text-[#FFFFFF] border-[2px] border-[#0A0A0A] px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest mb-6 shadow-[3px_3px_0px_#0A0A0A]">
                  COMPUTER SCIENCE ARCHIVE &amp; TOPOLOGY
                </div>
                <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tight text-[#0A0A0A] leading-[0.95] mb-6">
                  PROJECT
                  <br />
                  ENGRAM.
                </h1>
                <p className="font-mono text-sm sm:text-base text-[#111111] max-w-2xl leading-relaxed border-l-[4px] border-[#FF4D00] pl-4">
                  Unabridged Computer Science monographs, relational knowledge graph, and interactive simulators across Systems, Theory, Security, and Software Engineering.
                </p>
              </div>

              <div className="mt-10 pt-6 border-t-[3px] border-[#0A0A0A] flex flex-wrap items-center gap-4">
                <Link
                  href="/notes?view=graph"
                  className="px-6 py-3.5 bg-[#FF4D00] hover:bg-[#FFDE59] text-[#FFFFFF] hover:text-[#0A0A0A] border-[3px] border-[#0A0A0A] font-mono text-xs font-bold uppercase tracking-widest shadow-[4px_4px_0px_#0A0A0A] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#0A0A0A] transition-all"
                >
                  LAUNCH KNOWLEDGE GRAPH →
                </Link>
                <Link
                  href="/notes?view=directory"
                  className="px-6 py-3.5 bg-[#FFFFFF] hover:bg-[#FFDE59] text-[#0A0A0A] border-[3px] border-[#0A0A0A] font-mono text-xs font-bold uppercase tracking-widest shadow-[4px_4px_0px_#0A0A0A] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#0A0A0A] transition-all"
                >
                  BROWSE COURSE ARCHIVE →
                </Link>
              </div>
            </div>

            {/* Right Brutalist Telemetry Stack */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="flex-1 border-[3px] border-[#0A0A0A] bg-[#FFDE59] p-6 shadow-[8px_8px_0px_#0A0A0A] flex flex-col justify-between text-[#0A0A0A]">
                <span className="font-mono text-xs font-bold uppercase tracking-widest border-b-[2px] border-[#0A0A0A] pb-2">
                  INDEX METRICS // LIVE
                </span>
                <div className="my-4">
                  <div className="text-5xl font-black font-mono leading-none">
                    539
                  </div>
                  <div className="font-mono text-xs font-bold uppercase mt-1">
                    ACADEMIC MONOGRAPHS
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-3 border-t-[2px] border-[#0A0A0A] font-mono text-xs font-bold">
                  <div>25 COURSES</div>
                  <div>4 DOMAINS</div>
                </div>
              </div>

              <div className="border-[3px] border-[#0A0A0A] bg-[#0A0A0A] text-[#F4F3EE] p-6 shadow-[8px_8px_0px_#FF4D00]">
                <span className="font-mono text-[11px] text-[#FFDE59] uppercase tracking-widest block mb-2">
                  MANIFESTO // DIRECTIVE
                </span>
                <p className="font-mono text-sm font-bold leading-snug">
                  &ldquo;Procrastination is heaven&apos;s retribution for potential.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {universe === "minimalism" && (
        <section className="relative pt-16 pb-20 px-6 sm:px-12 max-w-7xl mx-auto border-b border-[var(--zen-border)]">
          {/* Top Swiss Editorial Metadata Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-8 mb-14 border-b border-[var(--zen-border)] text-[11px] font-mono uppercase tracking-wider text-[var(--zen-ink-muted)]">
            <div>INDEX // 01-25</div>
            <div>DISCIPLINE // COMPUTER SCIENCE</div>
            <div>CORPUS // 539 MONOGRAPHS</div>
            <div className="sm:text-right">EDITION // V2.0</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-medium tracking-[-0.035em] text-[var(--zen-snow)] leading-[1.04]">
                Project Engram is an open academic archive and relational concept graph for Computer Science.
              </h1>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-between gap-6 border-l border-[var(--zen-border)] pl-6">
              <p className="text-sm text-[var(--zen-ink-muted)] leading-relaxed">
                Structured lecture monographs, formal derivations, and interactive simulations organized across Systems, Theory, Security, and Software Engineering.
              </p>
              <div className="flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-[var(--zen-snow)]">
                <Link
                  href="/notes?view=graph"
                  className="pb-1 border-b border-[var(--zen-snow)] hover:opacity-60 transition-opacity"
                >
                  Knowledge Graph ↗
                </Link>
                <Link
                  href="/notes?view=directory"
                  className="pb-1 border-b border-[var(--zen-snow)] hover:opacity-60 transition-opacity"
                >
                  Course Archive ↗
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {universe === "broken-grid" && (
        <section className="relative pt-14 pb-20 px-6 sm:px-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
            {/* Asymmetric Left Blueprint Frame */}
            <div className="lg:col-span-8 border border-[#141413]/40 bg-[#F4F1EA] p-8 sm:p-14 relative z-10 shadow-[6px_6px_0px_rgba(20,20,19,0.12)]">
              <div className="absolute -top-3 left-6 bg-[#D9381E] text-[#FFFFFF] px-2.5 py-0.5 font-mono text-[10px] tracking-widest uppercase font-bold">
                FIG. 00 // ARCHITECTURAL BLUEPRINT
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#545049] mb-8 pb-3 border-b border-[#141413]/20">
                <span>COORD: X-00.0 // Y-14.2</span>
                <span>SCALE: 1:1 // 25 COURSES</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-[-0.03em] text-[#0A0A09] leading-[0.96] mb-6">
                PROJECT
                <br />
                <span className="text-[#D9381E]">ENGRAM</span> // ARCHIVE
              </h1>

              <p className="text-sm sm:text-base text-[#1A1917] max-w-xl leading-relaxed font-mono">
                Deconstructed academic repository mapping 539 Computer Science monographs across four structural domains without rigid year-level constraints.
              </p>
            </div>

            {/* Asymmetric Overlapping Right Specification Block */}
            <div className="lg:col-span-5 lg:-ml-12 lg:mt-16 border border-[#141413] bg-[#EAE6DF] p-7 sm:p-9 relative z-20 shadow-[8px_8px_0px_#D9381E] flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#D9381E] font-bold uppercase tracking-widest mb-4">
                <span>SPECIFICATION // V2</span>
                <span>[ DAU-GRID ]</span>
              </div>

              <div className="space-y-3 font-mono text-xs text-[#1A1917] my-4">
                <div className="flex justify-between py-1.5 border-b border-[#141413]/20">
                  <span className="text-[#545049]">TOTAL COURSES</span>
                  <span className="font-bold">25 MODULES</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#141413]/20">
                  <span className="text-[#545049]">MONOGRAPH CORPUS</span>
                  <span className="font-bold">539 DOCUMENTS</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#141413]/20">
                  <span className="text-[#545049]">DOMAINS</span>
                  <span className="font-bold">SYS / THY / SEC / SWE</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  href="/notes?view=graph"
                  className="px-4 py-2.5 bg-[#D9381E] text-[#FFFFFF] font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#141413] transition-colors"
                >
                  [ 01. TOPOLOGY ]
                </Link>
                <Link
                  href="/notes?view=directory"
                  className="px-4 py-2.5 border border-[#141413] bg-[#F4F1EA] text-[#141413] font-mono text-xs uppercase tracking-widest font-bold hover:border-[#D9381E] hover:text-[#D9381E] transition-colors"
                >
                  [ 02. DIRECTORY ]
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {(universe === "cyber-zen" || universe === "parallax") && (
        <section
          ref={heroRef}
          className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 pt-20 pb-16 text-center overflow-hidden"
        >
          {/* Topographic / Astrolabe Ring Background */}
          <motion.div
            style={{ rotate: astrolabeRotation, y: astrolabeY }}
            className="pointer-events-none absolute top-12 right-12 w-96 h-96 opacity-20 hidden md:block"
            aria-hidden="true"
          >
            <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
              <circle
                cx="200"
                cy="200"
                r="190"
                stroke="var(--zen-slate-edge)"
                strokeWidth="1"
                strokeDasharray="8 6"
              />
              <circle
                cx="200"
                cy="200"
                r="140"
                stroke="var(--zen-steel)"
                strokeWidth="0.75"
              />
              <polygon
                points="200,10 390,200 200,390 10,200"
                stroke="var(--zen-cyan)"
                strokeWidth="0.8"
                opacity="0.6"
              />
              <polygon
                points="65,65 335,65 335,335 65,335"
                stroke="var(--zen-slate-deep)"
                strokeWidth="1"
              />
            </svg>
          </motion.div>

          {/* Left Flank: Cyber-Zen shows Japanese Calligraphy; Parallax shows Expedition Telemetry */}
          {universe === "cyber-zen" ? (
            <motion.div
              style={{ y: calligraphyY }}
              className="pointer-events-none absolute left-8 lg:left-12 top-24 z-10 hidden xl:flex gap-6"
              aria-hidden="true"
            >
              <div
                className="border-l border-[var(--zen-border)] pl-3 text-[var(--zen-moon-silver)] text-sm tracking-[0.55em] font-normal"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "upright",
                  fontFamily: "var(--font-zen-serif, serif)",
                }}
              >
                先延ばしは成功の天罰。
                <div
                  className="mt-4 w-6 h-6 border border-[var(--zen-hanko)] bg-[var(--zen-hanko)]/10 text-[var(--zen-hanko)] text-xs grid place-items-center tracking-normal font-normal"
                  style={{ fontFamily: "var(--font-zen-brush, serif)" }}
                >
                  戒
                </div>
              </div>
              <div
                className="border-l border-[var(--zen-border)] pl-3 text-[var(--zen-moon-silver)] text-sm tracking-[0.55em] font-normal mt-16"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "upright",
                  fontFamily: "var(--font-zen-serif, serif)",
                }}
              >
                知の刻印・理の記録
                <div
                  className="mt-4 w-6 h-6 border border-[var(--zen-hanko)] bg-[var(--zen-hanko)]/10 text-[var(--zen-hanko)] text-xs grid place-items-center tracking-normal font-normal"
                  style={{ fontFamily: "var(--font-zen-brush, serif)" }}
                >
                  銘
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              style={{ y: calligraphyY }}
              className="pointer-events-none absolute left-8 lg:left-12 top-28 z-10 hidden xl:flex flex-col gap-3 text-left font-mono text-[10px] tracking-[0.25em] text-[var(--zen-cyan)]/80 border-l-2 border-[var(--zen-cyan)]/50 pl-4"
              aria-hidden="true"
            >
              <span>HORIZON RECON // V2.0</span>
              <span className="text-[var(--zen-ink-muted)]">
                LAT 14.5647 N // LON 120.9932 E
              </span>
              <span className="text-[var(--zen-hanko)]">
                ELEVATION // 4,200M
              </span>
            </motion.div>
          )}

          {/* Hero Central Content */}
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
          >
            {universe === "parallax" && (
              <div className="mb-4 px-3.5 py-1 rounded-full border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/10 font-mono text-[10px] tracking-[0.3em] text-[var(--zen-cyan)] uppercase">
                DEEP HORIZON EXPEDITION ARCHIVE // 25 SECTORS
              </div>
            )}

            <div className="relative inline-block mb-2">
              {universe === "cyber-zen" && (
                <span
                  className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] text-[clamp(6.5rem,15vw,12.5rem)] text-[var(--zen-slate-edge)] opacity-25 select-none whitespace-nowrap leading-none"
                  style={{ fontFamily: "var(--font-zen-brush, serif)" }}
                  aria-hidden="true"
                >
                  銘印
                </span>
              )}
              <h1
                className="text-[clamp(2.6rem,6.8vw,5.6rem)] font-semibold tracking-[0.26em] pl-[0.26em] leading-[1.05] uppercase text-[var(--zen-snow)]"
                style={{ fontFamily: "var(--font-zen-display, serif)" }}
              >
                PROJECT ENGRAM
              </h1>
            </div>

            <p className="font-mono text-xs sm:text-sm tracking-[0.22em] text-[var(--zen-cyan)] uppercase mt-1 font-semibold">
              Computer Science Academic Archive &amp; Knowledge Graph
            </p>

            {/* Divider */}
            <svg
              ref={katanaDividerRef}
              className="w-[min(540px,85vw)] h-5 my-4"
              viewBox="0 0 540 20"
              fill="none"
              aria-hidden="true"
            >
              <line
                x1="0"
                y1="10"
                x2="220"
                y2="10"
                stroke="var(--zen-steel)"
                strokeWidth="1"
              />
              <polygon
                points="230,10 270,3 310,10 270,17"
                fill="var(--zen-void)"
                stroke="var(--zen-cyan)"
                strokeWidth="1.2"
              />
              <circle cx="270" cy="10" r="3" fill="var(--zen-cyan)" />
              <line
                x1="320"
                y1="10"
                x2="540"
                y2="10"
                stroke="var(--zen-steel)"
                strokeWidth="1"
              />
            </svg>

            {/* Telemetry Ribbon */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-xs tracking-[0.16em] uppercase text-[var(--zen-ink-muted)] mt-2 mb-8">
              <span className="flex items-center gap-1.5">
                [ <span className="text-[var(--zen-cyan)] font-semibold">COMPUTER SCIENCE</span> ]
              </span>
              <span className="text-[var(--zen-cyan)]">·</span>
              <span className="flex items-center gap-1.5">
                [ <NumberTicker value={25} className="text-[var(--zen-snow)] font-semibold" /> COURSES ]
              </span>
              <span className="text-[var(--zen-cyan)]">·</span>
              <span className="flex items-center gap-1.5">
                [ <NumberTicker value={539} className="text-[var(--zen-snow)] font-semibold" /> MONOGRAPHS ]
              </span>
              <span className="text-[var(--zen-cyan)]">·</span>
              <span className="flex items-center gap-1.5">
                [ <NumberTicker value={4} className="text-[var(--zen-snow)] font-semibold" /> DOMAINS ]
              </span>
            </div>
          </motion.div>

          {/* Mountain Silhouette Base (Parallax Layer) */}
          <motion.div
            style={{ y: mountainY }}
            className="pointer-events-none absolute bottom-0 left-0 w-full h-56 z-[2] opacity-80"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 1440 260"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                d="M0,260 L0,150 Q160,80 320,130 T680,60 T1040,110 T1440,80 L1440,260 Z"
                fill="var(--zen-slate-deep)"
                opacity="0.45"
              />
              <path
                d="M0,260 L0,180 Q220,110 440,160 T860,90 T1220,150 T1440,130 L1440,260 Z"
                fill="var(--zen-void)"
                opacity="0.96"
              />
            </svg>
          </motion.div>
        </section>
      )}

      {/* ======================================================================
          MANIFESTO QUOTE BLOCK (Shown in Cyber-Zen & Parallax)
          ====================================================================== */}
      {(universe === "cyber-zen" || universe === "parallax") && (
        <section className="relative z-20 max-w-4xl mx-auto px-6 py-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="border-y border-[var(--zen-border)] py-10 px-6 sm:px-12 text-center"
          >
            {universe === "cyber-zen" && (
              <p
                className="text-2xl sm:text-3xl md:text-4xl leading-relaxed text-[var(--zen-snow)] tracking-[0.18em] font-medium mb-3"
                style={{ fontFamily: "var(--font-zen-serif, serif)" }}
              >
                「先延ばしは成功の天罰。」
              </p>
            )}
            <p className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-[var(--zen-ink-muted)]">
              // Procrastination is heaven&apos;s retribution for potential.
            </p>
          </motion.div>
        </section>
      )}

      {/* ======================================================================
          DUAL GATEWAY CARDS (UNIVERSE-ADAPTIVE ARCHITECTURE)
          ====================================================================== */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 py-16" id="gateways">
        <div
          className={`mb-12 ${
            universe === "minimalism" ||
            universe === "neo-brutalism" ||
            universe === "broken-grid"
              ? "text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--zen-border)] pb-4"
              : "text-center"
          }`}
        >
          <div>
            <span className="text-xs font-mono tracking-[0.3em] text-[var(--zen-ink-muted)] uppercase block mb-1.5">
              {universe === "cyber-zen"
                ? "双翼 // COMPLEMENTARY PERSPECTIVES"
                : universe === "neo-brutalism"
                ? "SYS.MODULES // PRIMARY INTERFACES"
                : universe === "minimalism"
                ? "01 // NAVIGATION MODES"
                : universe === "parallax"
                ? "RECONNAISSANCE // DUAL SECTORS"
                : "SECT. 01 // PRIMARY ACCESS VECTORS"}
            </span>
            <h2
              className="text-2xl sm:text-4xl tracking-[0.12em] font-bold text-[var(--zen-snow)] uppercase"
              style={{ fontFamily: "var(--font-zen-display, serif)" }}
            >
              THE DUAL GATEWAYS
            </h2>
          </div>
          {(universe === "minimalism" ||
            universe === "neo-brutalism" ||
            universe === "broken-grid") && (
            <span className="text-xs font-mono text-[var(--zen-ink-muted)] uppercase">
              SELECT INTERFACE MODE [01 / 02]
            </span>
          )}
        </div>

        <div
          className={
            universe === "minimalism"
              ? "grid grid-cols-1 md:grid-cols-2 border border-[var(--zen-border)] divide-y md:divide-y-0 md:divide-x divide-[var(--zen-border)]"
              : "grid grid-cols-1 md:grid-cols-2 gap-8"
          }
        >
          {/* Gateway 1: Knowledge Graph */}
          <div
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            className={`relative group flex flex-col justify-between bg-[var(--zen-card)] transition-all duration-300 ${
              universe === "minimalism"
                ? "p-8 sm:p-12 min-h-[360px] hover:bg-[var(--zen-card-hover)]"
                : universe === "neo-brutalism"
                ? "universe-card min-h-[400px] p-0 overflow-hidden"
                : universe === "broken-grid"
                ? "universe-card p-8 sm:p-10 min-h-[400px]"
                : "universe-card p-8 sm:p-10 min-h-[420px] border border-[var(--zen-border)] overflow-hidden shadow-2xl"
            }`}
          >
            {/* Neo-Brutalist Window Header Bar */}
            {universe === "neo-brutalism" && (
              <div className="w-full px-5 py-2.5 bg-[#FFDE59] border-b-[3px] border-[#0A0A0A] flex items-center justify-between font-mono text-xs font-bold text-[#0A0A0A]">
                <span>[ SYS.01 // TOPOLOGY.EXE ]</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 border-[2px] border-[#0A0A0A] bg-[#FFFFFF]" />
                  <span className="w-2.5 h-2.5 border-[2px] border-[#0A0A0A] bg-[#FF4D00]" />
                </div>
              </div>
            )}

            {/* Broken-Grid Protruding Figure Label */}
            {universe === "broken-grid" && (
              <div className="absolute -top-3 left-6 bg-[#D9381E] text-[#FFFFFF] px-2.5 py-0.5 font-mono text-[10px] tracking-widest uppercase font-bold z-30">
                FIG. 01 // FORCE-DIRECTED TOPOLOGY
              </div>
            )}

            {/* Spotlight Hover (ONLY in Cyber-Zen & Parallax, uses --universe-spotlight) */}
            {(universe === "cyber-zen" || universe === "parallax") && (
              <div
                className="pointer-events-none absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                style={{
                  background:
                    "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), var(--universe-spotlight) 0%, transparent 50%)",
                }}
                aria-hidden="true"
              />
            )}

            {/* Viewfinder Brackets & BorderBeam (ONLY in Cyber-Zen & Parallax) */}
            {(universe === "cyber-zen" || universe === "parallax") && (
              <>
                <svg
                  className="pointer-events-none absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] z-10"
                  viewBox="0 0 300 400"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1,24 L1,1 L24,1 M276,1 L299,1 L299,24 M299,376 L299,399 L276,399 M24,399 L1,399 L1,376"
                    stroke="var(--zen-moon-silver)"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                </svg>
                <BorderBeam
                  size={120}
                  duration={8}
                  colorFrom={universe === "parallax" ? "#E5A93C" : "#00E5FF"}
                  colorTo="var(--zen-slate-edge)"
                />
              </>
            )}

            {/* Kanji Watermark (ONLY in Cyber-Zen) */}
            {universe === "cyber-zen" && (
              <span
                className="pointer-events-none absolute top-8 right-8 text-6xl text-[var(--zen-snow)] opacity-5 group-hover:opacity-10 transition-opacity z-0"
                style={{
                  writingMode: "vertical-rl",
                  fontFamily: "var(--font-zen-brush, serif)",
                }}
                aria-hidden="true"
              >
                星図
              </span>
            )}

            <div
              className={`relative z-20 ${
                universe === "neo-brutalism" ? "p-8 flex-1 flex flex-col justify-between" : "flex-1 flex flex-col justify-between"
              }`}
            >
              <div>
                {universe === "minimalism" ? (
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--zen-ink-muted)] mb-8">
                    <span>01</span>
                    <span>INTERACTIVE TOPOLOGY</span>
                  </div>
                ) : (
                  <span
                    className={`inline-block px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase mb-4 font-semibold ${
                      universe === "neo-brutalism"
                        ? "bg-[#0A0A0A] text-[#FFDE59] border-2 border-[#0A0A0A]"
                        : "text-[var(--zen-cyan)] border border-[var(--zen-cyan)]/40"
                    }`}
                  >
                    INTERACTIVE TOPOLOGY
                  </span>
                )}

                <h3
                  className="text-2xl sm:text-3xl tracking-[0.08em] font-semibold text-[var(--zen-snow)] uppercase mb-3"
                  style={{ fontFamily: "var(--font-zen-display, serif)" }}
                >
                  THE KNOWLEDGE GRAPH
                </h3>
                <p className="text-sm sm:text-base text-[var(--zen-frost)] opacity-85 leading-relaxed max-w-md">
                  Explore an interactive force-directed graph where Computer Science anchors the core, linking 25 courses and 539 academic monographs across domains.
                </p>
              </div>

              <div className="pt-8">
                <Link
                  href="/notes?view=graph"
                  className={
                    universe === "neo-brutalism"
                      ? "inline-flex items-center gap-3 px-6 py-3 bg-[#FF4D00] hover:bg-[#0A0A0A] text-[#FFFFFF] border-[3px] border-[#0A0A0A] text-xs font-mono font-bold tracking-widest uppercase shadow-[4px_4px_0px_#0A0A0A] transition-all"
                      : universe === "minimalism"
                      ? "inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--zen-snow)] pb-1 border-b border-[var(--zen-snow)] hover:opacity-60 transition-opacity"
                      : "inline-flex items-center gap-3 px-6 py-3 border border-[var(--zen-border)] bg-[var(--zen-void)] hover:border-[var(--zen-cyan)] text-xs font-mono tracking-widest text-[var(--zen-snow)] hover:text-[var(--zen-cyan)] transition-all"
                  }
                >
                  <span>OPEN KNOWLEDGE GRAPH</span>
                  <span>{universe === "minimalism" ? "↗" : "→"}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Gateway 2: Academic Archive */}
          <div
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            className={`relative group flex flex-col justify-between bg-[var(--zen-card)] transition-all duration-300 ${
              universe === "minimalism"
                ? "p-8 sm:p-12 min-h-[360px] hover:bg-[var(--zen-card-hover)]"
                : universe === "neo-brutalism"
                ? "universe-card min-h-[400px] p-0 overflow-hidden"
                : universe === "broken-grid"
                ? "universe-card p-8 sm:p-10 min-h-[400px] md:mt-12"
                : "universe-card p-8 sm:p-10 min-h-[420px] border border-[var(--zen-border)] overflow-hidden shadow-2xl"
            }`}
          >
            {/* Neo-Brutalist Window Header Bar */}
            {universe === "neo-brutalism" && (
              <div className="w-full px-5 py-2.5 bg-[#FF4D00] border-b-[3px] border-[#0A0A0A] flex items-center justify-between font-mono text-xs font-bold text-[#FFFFFF]">
                <span>[ SYS.02 // ARCHIVE.DB ]</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 border-[2px] border-[#0A0A0A] bg-[#FFFFFF]" />
                  <span className="w-2.5 h-2.5 border-[2px] border-[#0A0A0A] bg-[#FFDE59]" />
                </div>
              </div>
            )}

            {/* Broken-Grid Protruding Figure Label */}
            {universe === "broken-grid" && (
              <div className="absolute -top-3 left-6 bg-[#141413] text-[#FFFFFF] px-2.5 py-0.5 font-mono text-[10px] tracking-widest uppercase font-bold z-30">
                FIG. 02 // STRUCTURED COURSE INDEX
              </div>
            )}

            {/* Spotlight Hover (ONLY in Cyber-Zen & Parallax) */}
            {(universe === "cyber-zen" || universe === "parallax") && (
              <div
                className="pointer-events-none absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
                style={{
                  background:
                    "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), var(--universe-spotlight) 0%, transparent 50%)",
                }}
                aria-hidden="true"
              />
            )}

            {(universe === "cyber-zen" || universe === "parallax") && (
              <>
                <svg
                  className="pointer-events-none absolute inset-3 w-[calc(100%-24px)] h-[calc(100%-24px)] z-10"
                  viewBox="0 0 300 400"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M1,24 L1,1 L24,1 M276,1 L299,1 L299,24 M299,376 L299,399 L276,399 M24,399 L1,399 L1,376"
                    stroke="var(--zen-moon-silver)"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                </svg>
                <BorderBeam
                  size={120}
                  duration={8}
                  colorFrom={universe === "parallax" ? "#E5A93C" : "#00E5FF"}
                  colorTo="var(--zen-slate-edge)"
                  delay={4}
                />
              </>
            )}

            {universe === "cyber-zen" && (
              <span
                className="pointer-events-none absolute top-8 right-8 text-6xl text-[var(--zen-snow)] opacity-5 group-hover:opacity-10 transition-opacity z-0"
                style={{
                  writingMode: "vertical-rl",
                  fontFamily: "var(--font-zen-brush, serif)",
                }}
                aria-hidden="true"
              >
                目録
              </span>
            )}

            <div
              className={`relative z-20 ${
                universe === "neo-brutalism" ? "p-8 flex-1 flex flex-col justify-between" : "flex-1 flex flex-col justify-between"
              }`}
            >
              <div>
                {universe === "minimalism" ? (
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--zen-ink-muted)] mb-8">
                    <span>02</span>
                    <span>STRUCTURED INDEX</span>
                  </div>
                ) : (
                  <span
                    className={`inline-block px-2.5 py-1 text-[10px] font-mono tracking-widest uppercase mb-4 font-semibold ${
                      universe === "neo-brutalism"
                        ? "bg-[#0A0A0A] text-[#FFFFFF] border-2 border-[#0A0A0A]"
                        : "text-[var(--zen-cyan)] border border-[var(--zen-cyan)]/40"
                    }`}
                  >
                    STRUCTURED INDEX
                  </span>
                )}

                <h3
                  className="text-2xl sm:text-3xl tracking-[0.08em] font-semibold text-[var(--zen-snow)] uppercase mb-3"
                  style={{ fontFamily: "var(--font-zen-display, serif)" }}
                >
                  THE ACADEMIC ARCHIVE
                </h3>
                <p className="text-sm sm:text-base text-[var(--zen-frost)] opacity-85 leading-relaxed max-w-md">
                  Browse courses across Systems, Theory &amp; Math, Networks &amp; Security, and Software Engineering, organized by domain across Core CS, NIS, and ST coursework.
                </p>
              </div>

              <div className="pt-8">
                <Link
                  href="/notes?view=directory"
                  className={
                    universe === "neo-brutalism"
                      ? "inline-flex items-center gap-3 px-6 py-3 bg-[#FFDE59] hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-[#FFFFFF] border-[3px] border-[#0A0A0A] text-xs font-mono font-bold tracking-widest uppercase shadow-[4px_4px_0px_#0A0A0A] transition-all"
                      : universe === "minimalism"
                      ? "inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--zen-snow)] pb-1 border-b border-[var(--zen-snow)] hover:opacity-60 transition-opacity"
                      : "inline-flex items-center gap-3 px-6 py-3 border border-[var(--zen-border)] bg-[var(--zen-void)] hover:border-[var(--zen-cyan)] text-xs font-mono tracking-widest text-[var(--zen-snow)] hover:text-[var(--zen-cyan)] transition-all"
                  }
                >
                  <span>OPEN DIRECTORY</span>
                  <span>{universe === "minimalism" ? "↗" : "→"}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          COURSE CURRICULUM MATRIX (#curriculum)
          ====================================================================== */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 py-20" id="curriculum">
        <div
          className={`mb-10 ${
            universe === "minimalism" ||
            universe === "neo-brutalism" ||
            universe === "broken-grid"
              ? "text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--zen-border)] pb-4"
              : "text-center"
          }`}
        >
          <div>
            <span className="text-xs font-mono tracking-[0.3em] text-[var(--zen-ink-muted)] uppercase block mb-1.5">
              {universe === "cyber-zen"
                ? "体系的課程 // SUBJECT CURRICULUM"
                : universe === "neo-brutalism"
                ? "DATABASE // 25 COURSE MODULES"
                : universe === "minimalism"
                ? "02 // CURRICULUM INDEX"
                : universe === "parallax"
                ? "SECTOR MATRIX // 25 COURSES"
                : "SECT. 02 // CURRICULAR MATRIX"}
            </span>
            <h2
              className="text-2xl sm:text-4xl tracking-[0.12em] font-bold text-[var(--zen-snow)] uppercase"
              style={{ fontFamily: "var(--font-zen-display, serif)" }}
            >
              COURSE CURRICULUM
            </h2>
          </div>
          <p className="text-xs font-mono tracking-wider text-[var(--zen-ink-muted)]">
            PAGE {currentPage + 1} OF {totalPages} · {filteredCourses.length} COURSES · 539 MONOGRAPHS
          </p>
        </div>

        {/* Study Plan Tier & Stateless EG2 Sync Bar */}
        <div className="max-w-4xl mx-auto mb-8 p-3.5 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] flex flex-col sm:flex-row items-center justify-between gap-3 universe-card">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-ink-muted)] mr-1">
              STUDY PLAN:
            </span>
            {STUDY_PLAN_TIER_LIST.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setTier(plan.id)}
                className={`px-2.5 py-1 text-[10px] font-mono tracking-wider rounded border transition-all ${
                  tier === plan.id
                    ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 text-[var(--zen-cyan)] font-semibold"
                    : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] bg-[var(--zen-void)]/50"
                }`}
              >
                {plan.shortLabel}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSyncModalOpen(true)}
            className="px-3.5 py-1.5 rounded border border-[var(--zen-cyan)]/50 hover:border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/10 text-[var(--zen-cyan)] hover:text-[var(--zen-snow)] text-[10px] font-mono tracking-wider uppercase transition-all shrink-0"
          >
            {STUDY_PLAN_TIERS[tier].shortLabel} · {completedCount} DONE // SYNC CODE
          </button>
        </div>

        {/* Primary Domain Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
          {[
            { id: "all", label: universe === "cyber-zen" ? "ALL DOMAINS // 全領域" : "ALL DOMAINS", color: "var(--zen-cyan)" },
            { id: "systems", label: universe === "cyber-zen" ? "SYSTEMS & ARCH // 統" : "SYSTEMS & ARCH", color: STAR_DOMAINS.systems.color },
            { id: "theory", label: universe === "cyber-zen" ? "THEORY & MATH // 論" : "THEORY & MATH", color: STAR_DOMAINS.theory.color },
            { id: "security", label: universe === "cyber-zen" ? "NET & SECURITY // 防" : "NET & SECURITY", color: STAR_DOMAINS.security.color },
            { id: "software", label: universe === "cyber-zen" ? "SOFTWARE & AI // 創" : "SOFTWARE & AI", color: STAR_DOMAINS.software.color },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveDomain(tab.id as any)}
              className={`px-4 py-2 text-xs font-mono tracking-wider transition-all rounded-md border flex items-center gap-2 ${
                activeDomain === tab.id
                  ? universe === "neo-brutalism"
                    ? "border-[2px] border-[#0A0A0A] bg-[#FFDE59] text-[#0A0A0A] font-bold shadow-[3px_3px_0px_#0A0A0A]"
                    : "border-[var(--zen-cyan)] text-[var(--zen-cyan)] bg-[var(--zen-cyan)]/10 font-semibold"
                  : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] bg-[var(--zen-card)]"
              }`}
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: tab.color }}
              />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Secondary Track Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: "all", label: "ALL TRACKS" },
            { id: "Core CS", label: "CORE COMPUTER SCIENCE" },
            { id: "NIS", label: "NIS · NETWORK & INFORMATION SECURITY" },
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => setActiveTrack(chip.id as any)}
              className={`px-3 py-1.5 text-[11px] font-mono tracking-wider transition-all rounded-full border ${
                activeTrack === chip.id
                  ? "border-[var(--zen-cyan)] text-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 font-semibold"
                  : "border-[var(--zen-border)]/60 text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] bg-[var(--zen-card)]/50"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Paginated Bento Grid */}
        <div className="relative min-h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeDomain}-${activeTrack}-${currentPage}-${universe}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={
                universe === "minimalism"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[var(--zen-border)]"
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 universe-bento-grid"
              }
            >
              {currentCourses.map((course, index) => {
                const bento = getBentoLayout(index, currentCourses.length);
                const domainMeta =
                  STAR_DOMAINS[course.category] || STAR_DOMAINS.systems;
                const globalIndex = currentPage * ITEMS_PER_PAGE + index + 1;
                const formattedIdx = String(globalIndex).padStart(2, "0");

                if (bento.isWide) {
                  return (
                    <motion.div
                      key={course.code}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.03,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`h-full ${bento.spanClass}`}
                    >
                      <div
                        className={
                          universe === "minimalism"
                            ? "h-full border-r border-b border-[var(--zen-border)] bg-[var(--zen-card)] hover:bg-[var(--zen-card-hover)] transition-colors flex flex-col"
                            : "universe-card h-full rounded-2xl border border-[var(--zen-border)] bg-[var(--zen-card)] hover:border-[var(--zen-cyan)] transition-all duration-300 group flex flex-col overflow-hidden"
                        }
                      >
                        {universe === "neo-brutalism" && (
                          <div className="px-5 py-1.5 bg-[#FFDE59] border-b-[2px] border-[#0A0A0A] flex items-center justify-between font-mono text-[10px] font-bold text-[#0A0A0A]">
                            <span>MODULE // {formattedIdx}</span>
                            <span>{course.categoryLabel.toUpperCase()}</span>
                          </div>
                        )}

                        <Link
                          href={course.href}
                          className="h-full p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden transition-colors duration-200"
                          aria-label={`${course.code}: ${course.name} - ${course.categoryLabel} (${course.track}), ${course.count} monographs`}
                        >
                          {universe === "cyber-zen" && (
                            <span
                              className="pointer-events-none absolute -right-2 -bottom-4 text-8xl font-serif text-[var(--zen-snow)] opacity-[0.035] group-hover:opacity-[0.08] transition-opacity select-none"
                              style={{ fontFamily: "var(--font-zen-brush, serif)" }}
                              aria-hidden="true"
                            >
                              {domainMeta.kanji}
                            </span>
                          )}

                          {/* Left Content Column */}
                          <div
                            className="flex-1 min-w-0 pr-0 lg:pr-4 relative z-10"
                            aria-hidden="true"
                          >
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              {universe === "minimalism" ||
                              universe === "broken-grid" ? (
                                <span className="text-[11px] font-mono text-[var(--zen-ink-muted)] mr-1">
                                  {formattedIdx} /
                                </span>
                              ) : null}
                              <span
                                className={`px-2.5 py-0.5 text-[11px] font-mono tracking-widest font-bold uppercase ${
                                  universe === "neo-brutalism"
                                    ? "bg-[#0A0A0A] text-[#FFFFFF]"
                                    : "text-[var(--zen-cyan)] border border-[var(--zen-cyan)]/50 bg-[var(--zen-cyan)]/10"
                                }`}
                              >
                                {course.code}
                              </span>
                              <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider text-[var(--zen-ink-muted)] border border-[var(--zen-border)] uppercase">
                                {course.categoryLabel}
                              </span>
                              <span className="px-2 py-0.5 text-[10px] font-mono text-[var(--zen-frost)] border border-[var(--zen-border)]/60 uppercase tracking-wider">
                                {course.track}
                              </span>
                            </div>

                            <h4
                              className="text-base sm:text-xl font-semibold tracking-wide text-[var(--zen-snow)] group-hover:text-[var(--zen-cyan)] transition-colors mb-2 leading-snug"
                              style={{ fontFamily: "var(--font-zen-display, serif)" }}
                            >
                              {course.name}
                            </h4>

                            <p className="text-xs sm:text-sm text-[var(--zen-ink-muted)] leading-relaxed line-clamp-2 max-w-xl mb-3">
                              {course.desc}
                            </p>

                            {course.relatedCourses.length > 0 && (
                              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-[var(--zen-ink-muted)]">
                                <span className="text-[var(--zen-cyan)] uppercase">
                                  RELATED:
                                </span>
                                {course.relatedCourses.slice(0, 4).map((rel) => (
                                  <span
                                    key={rel}
                                    className="px-1.5 py-0.5 rounded border border-[var(--zen-border)] text-[var(--zen-frost)]"
                                  >
                                    {rel}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Right Telemetry Column & Action */}
                          <div
                            className="flex sm:flex-row lg:flex-col items-center sm:justify-between lg:justify-center gap-4 lg:gap-3 shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 lg:border-l border-[var(--zen-border)]/50 lg:pl-6 relative z-10"
                            aria-hidden="true"
                          >
                            <div className="text-left sm:text-center lg:text-center">
                              <div className="flex items-baseline gap-1.5 sm:justify-center">
                                <span className="text-2xl sm:text-3xl font-mono font-bold text-[var(--zen-snow)] group-hover:text-[var(--zen-cyan)] transition-colors">
                                  {course.count}
                                </span>
                                <span className="text-[9px] font-mono tracking-widest text-[var(--zen-ink-muted)] uppercase">
                                  MONOGRAPHS
                                </span>
                              </div>
                              <span className="text-[9px] font-mono tracking-wider text-[var(--zen-cyan)]/80 uppercase block mt-0.5">
                                {universe === "cyber-zen"
                                  ? "COURSE // 科目"
                                  : `REF // ${formattedIdx}`}
                              </span>
                            </div>

                            <div
                              className={
                                universe === "neo-brutalism"
                                  ? "inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FF4D00] text-[#FFFFFF] border-[2px] border-[#0A0A0A] text-xs font-mono font-bold tracking-wider"
                                  : "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--zen-border)] bg-[var(--zen-void)] group-hover:border-[var(--zen-cyan)] group-hover:bg-[var(--zen-cyan)] group-hover:text-[var(--zen-void)] text-xs font-mono tracking-wider text-[var(--zen-snow)] transition-all duration-200"
                              }
                            >
                              <span>OPEN</span>
                              <span>{universe === "minimalism" ? "↗" : "→"}</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={course.code}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.03,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`h-full ${bento.spanClass}`}
                  >
                    <div
                      className={
                        universe === "minimalism"
                          ? "h-full border-r border-b border-[var(--zen-border)] bg-[var(--zen-card)] hover:bg-[var(--zen-card-hover)] transition-colors flex flex-col justify-between"
                          : "universe-card h-full rounded-2xl border border-[var(--zen-border)] bg-[var(--zen-card)] hover:border-[var(--zen-cyan)] transition-all duration-300 group flex flex-col justify-between overflow-hidden"
                      }
                    >
                      {universe === "neo-brutalism" && (
                        <div className="px-4 py-1 bg-[#F4F3EE] border-b-[2px] border-[#0A0A0A] flex items-center justify-between font-mono text-[10px] font-bold text-[#0A0A0A]">
                          <span>MOD // {formattedIdx}</span>
                          <span>{domainMeta.shortLabel}</span>
                        </div>
                      )}

                      <Link
                        href={course.href}
                        className="h-full p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden transition-colors duration-200"
                        aria-label={`${course.code}: ${course.name} - ${course.categoryLabel} (${course.track}), ${course.count} monographs`}
                      >
                        {universe === "cyber-zen" && (
                          <span
                            className="pointer-events-none absolute -right-1 -bottom-3 text-7xl font-serif text-[var(--zen-snow)] opacity-[0.025] group-hover:opacity-[0.06] transition-opacity select-none"
                            style={{ fontFamily: "var(--font-zen-brush, serif)" }}
                            aria-hidden="true"
                          >
                            {domainMeta.kanji}
                          </span>
                        )}

                        <div aria-hidden="true">
                          <div className="flex items-center justify-between mb-3">
                            <span
                              className={`px-2 py-0.5 text-[10px] font-mono tracking-widest font-semibold ${
                                universe === "neo-brutalism"
                                  ? "bg-[#0A0A0A] text-[#FFDE59]"
                                  : "text-[var(--zen-cyan)] border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/5"
                              }`}
                            >
                              {course.code}
                            </span>
                            <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase">
                              {course.track} · {domainMeta.shortLabel}
                            </span>
                          </div>

                          <h4
                            className="text-sm sm:text-base font-semibold tracking-wide text-[var(--zen-snow)] group-hover:text-[var(--zen-cyan)] transition-colors mb-2 line-clamp-2 leading-snug"
                            style={{ fontFamily: "var(--font-zen-display, serif)" }}
                          >
                            {course.name}
                          </h4>

                          <p className="text-xs text-[var(--zen-ink-muted)] leading-relaxed line-clamp-3">
                            {course.desc}
                          </p>
                        </div>

                        <div
                          className="mt-5 pt-3.5 border-t border-[var(--zen-border)]/40 flex items-center justify-between relative z-10"
                          aria-hidden="true"
                        >
                          <span className="font-mono text-[10px] text-[var(--zen-ink-muted)] font-medium tracking-wider">
                            {course.count} MONOGRAPHS · {course.relatedCourses.length} LINKS
                          </span>

                          <div className="w-6 h-6 rounded-full border border-[var(--zen-border)] flex items-center justify-center text-[var(--zen-ink-muted)] group-hover:border-[var(--zen-cyan)] group-hover:text-[var(--zen-cyan)] group-hover:translate-x-0.5 transition-all">
                            <span className="text-[10px] leading-none">
                              {universe === "minimalism" ? "↗" : "→"}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Pagination Controller Deck */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[var(--zen-border)]/60 pt-6 px-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--zen-ink-muted)]">
              <span className="w-1.5 h-1.5 rotate-45 bg-[var(--zen-cyan)]" />
              <span>
                DISPLAYING {currentPage * ITEMS_PER_PAGE + 1}-
                {Math.min(
                  (currentPage + 1) * ITEMS_PER_PAGE,
                  filteredCourses.length
                )}{" "}
                OF {filteredCourses.length} COURSES
              </span>
              <span className="text-[var(--zen-slate-edge)] hidden md:inline">
                |
              </span>
              <span className="text-[10px] tracking-wider uppercase text-[var(--zen-cyan)] hidden md:inline">
                PAGE {currentPage + 1} OF {totalPages}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`min-w-8 h-8 px-2.5 text-xs font-mono tracking-wider transition-all rounded border flex items-center justify-center ${
                    currentPage === i
                      ? "border-[var(--zen-cyan)] text-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 font-semibold"
                      : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] bg-[var(--zen-card)]"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded border text-xs font-mono tracking-wider transition-all ${
                  currentPage === 0
                    ? "border-[var(--zen-border)]/30 text-[var(--zen-ink-muted)]/30 cursor-not-allowed bg-transparent"
                    : "border-[var(--zen-border)] text-[var(--zen-snow)] hover:border-[var(--zen-cyan)] hover:text-[var(--zen-cyan)] bg-[var(--zen-card)] active:scale-95"
                }`}
                aria-label="Previous page"
              >
                <span>←</span>
                <span>PREV</span>
              </button>

              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1}
                className={`flex items-center gap-2 px-4 py-2 rounded border text-xs font-mono tracking-wider transition-all ${
                  currentPage >= totalPages - 1
                    ? "border-[var(--zen-border)]/30 text-[var(--zen-ink-muted)]/30 cursor-not-allowed bg-transparent"
                    : "border-[var(--zen-cyan)] text-[var(--zen-cyan)] hover:bg-[var(--zen-cyan)]/10 bg-[var(--zen-card)] font-semibold active:scale-95"
                }`}
                aria-label="Next page"
              >
                <span>NEXT</span>
                <span>→</span>
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ======================================================================
          COLOPHON FOOTER
          ====================================================================== */}
      <footer className="relative z-20 border-t border-[var(--zen-border)] py-16 px-6 text-center bg-[var(--zen-void)]/95">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <svg
            className="w-12 h-12 mb-4"
            viewBox="0 0 48 48"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="var(--zen-steel)"
              strokeWidth="1.2"
              strokeDasharray="6 3"
            />
            <polygon
              points="24,6 38,24 24,42 10,24"
              fill="var(--zen-card)"
              stroke="var(--zen-cyan)"
              strokeWidth="1.5"
            />
            <circle cx="24" cy="24" r="4" fill="var(--zen-snow)" />
          </svg>

          <span
            className="text-sm tracking-[0.4em] font-semibold text-[var(--zen-snow)] uppercase mb-1"
            style={{ fontFamily: "var(--font-zen-decor, serif)" }}
          >
            PROJECT ENGRAM
          </span>
          <p className="text-xs italic text-[var(--zen-ink-muted)] tracking-wider mb-6">
            {universe === "cyber-zen"
              ? "先延ばしは成功の天罰。 // Knowledge forged in code, preserved in ink."
              : "Procrastination is heaven's retribution for potential."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 font-mono text-[10px] tracking-widest text-[var(--zen-ink-muted)]">
            <Link
              href="/notes?view=graph"
              className="hover:text-[var(--zen-cyan)] transition-colors"
            >
              KNOWLEDGE GRAPH
            </Link>
            <span>·</span>
            <Link
              href="/notes?view=directory"
              className="hover:text-[var(--zen-cyan)] transition-colors"
            >
              COURSE DIRECTORY
            </Link>
            <span>·</span>
            <a
              href="https://github.com/2ru17/Project-Engram"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--zen-cyan)] transition-colors"
            >
              REPOSITORY
            </a>
            <span>·</span>
            <a
              href="https://github.com/2ru17/Project-Engram/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--zen-cyan)] transition-colors"
            >
              MIT LICENSE
            </a>
          </div>

          <p className="text-[11px] text-[var(--zen-ink-muted)]/70 max-w-lg mt-6 leading-relaxed font-mono">
            Open-source under MIT License. Curated academic monographs for pedagogical and research reference. Zero tracking cookies, zero telemetry.
          </p>
        </div>
      </footer>
    </div>
  );
}
