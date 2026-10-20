"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { animate } from "animejs";
import { NumberTicker } from "@/components/ui/number-ticker";
import { BorderBeam } from "@/components/ui/border-beam";
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
  const { tier, setTier, completedCount, setSyncModalOpen } = useStudyPlan();

  // Reset page when switching constellation domain or track filters
  useEffect(() => {
    setCurrentPage(0);
  }, [activeDomain, activeTrack]);

  // Anime.js path stroke animation on mount
  useEffect(() => {
    if (katanaDividerRef.current) {
      animate(katanaDividerRef.current.querySelectorAll("line, polygon"), {
        opacity: [0, 1],
        duration: 1200,
        easing: "cubicBezier(0.16, 1, 0.3, 1)",
      });
    }
  }, []);

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

  // Drip-Card 3D Tilt handlers
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotY = (x / rect.width - 0.5) * 10;
    const rotX = (y / rect.height - 0.5) * -10;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--my", `${(y / rect.height) * 100}%`);
  };

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <div className="relative min-h-screen w-full bg-[var(--zen-void)] text-[var(--zen-frost)] selection:bg-[var(--zen-cyan)] selection:text-[var(--zen-void)] transition-colors duration-500">
      {/* ======================================================================
          HERO STAGE WITH MULTI-LAYER PARALLAX
          ====================================================================== */}
      <section
        ref={heroRef}
        className="relative min-h-[92vh] flex flex-col justify-center items-center px-6 pt-20 pb-16 text-center overflow-hidden"
      >
        {/* Parallax Astrolabe Ring Background */}
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
            <circle cx="200" cy="200" r="140" stroke="var(--zen-steel)" strokeWidth="0.75" />
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

        {/* Parallax Vertical Japanese Lore Columns (Left Flank) */}
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
              className="mt-4 w-6 h-6 border border-[var(--zen-hanko)] bg-[var(--zen-hanko)]/10 text-[var(--zen-hanko)] text-xs grid place-items-center tracking-normal font-normal shadow-[0_0_8px_rgba(230,57,70,0.3)]"
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
              className="mt-4 w-6 h-6 border border-[var(--zen-hanko)] bg-[var(--zen-hanko)]/10 text-[var(--zen-hanko)] text-xs grid place-items-center tracking-normal font-normal shadow-[0_0_8px_rgba(230,57,70,0.3)]"
              style={{ fontFamily: "var(--font-zen-brush, serif)" }}
            >
              銘
            </div>
          </div>
        </motion.div>

        {/* Hero Central Content */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Kanji Watermark Stage */}
          <div className="relative inline-block mb-2">
            <span
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] text-[clamp(6.5rem,15vw,12.5rem)] text-[var(--zen-slate-edge)] opacity-25 select-none whitespace-nowrap leading-none"
              style={{ fontFamily: "var(--font-zen-brush, serif)" }}
              aria-hidden="true"
            >
              銘印
            </span>
            <h1
              className="text-[clamp(2.6rem,6.8vw,5.6rem)] font-semibold tracking-[0.26em] pl-[0.26em] leading-[1.05] uppercase text-[var(--zen-snow)]"
              style={{ fontFamily: "var(--font-zen-display, serif)" }}
            >
              PROJECT ENGRAM
            </h1>
          </div>

          {/* Sub-tagline */}
          <p className="font-mono text-xs sm:text-sm tracking-[0.22em] text-[var(--zen-cyan)] uppercase mt-1 font-semibold">
            Computer Science Academic Archive &amp; Knowledge Graph
          </p>

          {/* Katana Blade Divider SVG with Anime.js hook */}
          <svg
            ref={katanaDividerRef}
            className="w-[min(540px,85vw)] h-5 my-4"
            viewBox="0 0 540 20"
            fill="none"
            aria-hidden="true"
          >
            <line x1="0" y1="10" x2="220" y2="10" stroke="var(--zen-steel)" strokeWidth="1" />
            <polygon
              points="230,10 270,3 310,10 270,17"
              fill="var(--zen-void)"
              stroke="var(--zen-cyan)"
              strokeWidth="1.2"
            />
            <circle cx="270" cy="10" r="3" fill="var(--zen-cyan)" />
            <line x1="320" y1="10" x2="540" y2="10" stroke="var(--zen-steel)" strokeWidth="1" />
          </svg>

          {/* 5 Four-Point Resonance Stars */}
          <div className="flex items-center justify-center gap-3 mb-4" aria-hidden="true">
            {[0, 0.4, 0.8, 0.4, 0].map((delay, i) => (
              <svg
                key={i}
                viewBox="0 0 24 24"
                className={`fill-[var(--zen-cyan)] animate-pulse ${
                  i === 2 ? "w-5 h-5 opacity-100" : "w-4 h-4 opacity-75"
                }`}
                style={{ animationDuration: "3s", animationDelay: `${delay}s` }}
              >
                <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2Z" />
              </svg>
            ))}
          </div>

          {/* Telemetry Ribbon with NumberTicker */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-xs tracking-[0.16em] uppercase text-[var(--zen-ink-muted)] mb-8">
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
          className="pointer-events-none absolute bottom-0 left-0 w-full h-56 z-[2] opacity-75"
          aria-hidden="true"
        >
          <svg viewBox="0 0 1440 260" preserveAspectRatio="none" className="w-full h-full">
            <path
              d="M0,260 L0,150 Q160,80 320,130 T680,60 T1040,110 T1440,80 L1440,260 Z"
              fill="var(--zen-slate-deep)"
              opacity="0.4"
            />
            <path
              d="M0,260 L0,180 Q220,110 440,160 T860,90 T1220,150 T1440,130 L1440,260 Z"
              fill="var(--zen-void)"
              opacity="0.95"
            />
          </svg>
        </motion.div>
      </section>

      {/* ======================================================================
          SCROLLYTELLING ZEN MANIFESTO BLOCK: USER'S MONUMENTAL QUOTE
          ====================================================================== */}
      <section className="relative z-20 max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="border-y border-[var(--zen-border)] py-12 px-6 sm:px-12 text-center"
        >
          <p
            className="text-2xl sm:text-3xl md:text-4xl leading-relaxed text-[var(--zen-snow)] tracking-[0.18em] font-medium"
            style={{ fontFamily: "var(--font-zen-serif, serif)" }}
          >
            「先延ばしは成功の天罰。」
          </p>
          <p className="mt-3 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-[var(--zen-ink-muted)]">
            // Procrastination is heaven&apos;s retribution for potential.
          </p>
        </motion.div>
      </section>

      {/* ======================================================================
          DUAL GATEWAY CARDS: HELIOCENTRIC STAR GRAPH VS. STAR ARCHIVE
          ====================================================================== */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 py-16" id="gateways">
        <div className="text-center mb-12">
          <span
            className="text-xs tracking-[0.4em] text-[var(--zen-ink-muted)] uppercase block mb-2"
            style={{ fontFamily: "var(--font-zen-serif, serif)" }}
          >
            双翼 // COMPLEMENTARY PERSPECTIVES
          </span>
          <h2
            className="text-2xl sm:text-4xl tracking-[0.2em] font-bold text-[var(--zen-snow)] uppercase"
            style={{ fontFamily: "var(--font-zen-display, serif)" }}
          >
            THE DUAL GATEWAYS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 universe-bento-grid">
          {/* Gateway 1: The Singularity Star Graph */}
          <div
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            className="universe-card relative group p-8 sm:p-10 min-h-[420px] flex flex-col justify-between bg-[var(--zen-card)] border border-[var(--zen-border)] rounded-none overflow-hidden transition-all duration-300 shadow-2xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="pointer-events-none absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
              style={{
                background:
                  "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(0,229,255,0.18) 0%, transparent 50%)",
              }}
              aria-hidden="true"
            />

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

            <BorderBeam size={120} duration={8} colorFrom="#00E5FF" colorTo="var(--zen-slate-edge)" />

            <div className="relative z-20">
              <span className="inline-block px-2.5 py-1 text-[10px] font-mono tracking-widest text-[var(--zen-cyan)] border border-[var(--zen-cyan)]/30 uppercase mb-4 font-semibold">
                INTERACTIVE TOPOLOGY
              </span>
              <h3
                className="text-2xl sm:text-3xl tracking-[0.16em] font-semibold text-[var(--zen-snow)] uppercase mb-3"
                style={{ fontFamily: "var(--font-zen-display, serif)" }}
              >
                THE KNOWLEDGE GRAPH
              </h3>
              <p className="text-sm sm:text-base text-[var(--zen-frost)] opacity-80 leading-relaxed max-w-md">
                Explore an interactive force-directed graph where Computer Science anchors the core, linking 25 courses and 539 academic monographs across domains.
              </p>
            </div>

            <div className="relative z-20 pt-6">
              <Link
                href="/notes?view=graph"
                className="inline-flex items-center gap-3 px-6 py-3 border border-[var(--zen-border)] bg-[var(--zen-void)] hover:border-[var(--zen-cyan)] text-xs font-mono tracking-widest text-[var(--zen-snow)] hover:text-[var(--zen-cyan)] transition-all shadow-md"
              >
                <span>OPEN KNOWLEDGE GRAPH</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Gateway 2: The Academic Archive */}
          <div
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
            className="universe-card relative group p-8 sm:p-10 min-h-[420px] flex flex-col justify-between bg-[var(--zen-card)] border border-[var(--zen-border)] rounded-none overflow-hidden transition-all duration-300 shadow-2xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="pointer-events-none absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
              style={{
                background:
                  "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(0,229,255,0.18) 0%, transparent 50%)",
              }}
              aria-hidden="true"
            />

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

            <BorderBeam size={120} duration={8} colorFrom="#00E5FF" colorTo="var(--zen-slate-edge)" delay={4} />

            <div className="relative z-20">
              <span className="inline-block px-2.5 py-1 text-[10px] font-mono tracking-widest text-[var(--zen-cyan)] border border-[var(--zen-cyan)]/30 uppercase mb-4 font-semibold">
                STRUCTURED INDEX
              </span>
              <h3
                className="text-2xl sm:text-3xl tracking-[0.16em] font-semibold text-[var(--zen-snow)] uppercase mb-3"
                style={{ fontFamily: "var(--font-zen-display, serif)" }}
              >
                THE ACADEMIC ARCHIVE
              </h3>
              <p className="text-sm sm:text-base text-[var(--zen-frost)] opacity-80 leading-relaxed max-w-md">
                Browse courses across Systems, Theory &amp; Math, Networks &amp; Security, and Software Engineering, organized by domain across Core CS, NIS, and ST coursework.
              </p>
            </div>

            <div className="relative z-20 pt-6">
              <Link
                href="/notes?view=directory"
                className="inline-flex items-center gap-3 px-6 py-3 border border-[var(--zen-border)] bg-[var(--zen-void)] hover:border-[var(--zen-cyan)] text-xs font-mono tracking-widest text-[var(--zen-snow)] hover:text-[var(--zen-cyan)] transition-all shadow-md"
              >
                <span>OPEN DIRECTORY</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================================
          COURSE CURRICULUM MATRIX (#curriculum)
          ====================================================================== */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 py-20" id="curriculum">
        <div className="text-center mb-10">
          <span
            className="text-xs tracking-[0.4em] text-[var(--zen-ink-muted)] uppercase block mb-2"
            style={{ fontFamily: "var(--font-zen-serif, serif)" }}
          >
            体系的課程 // SUBJECT CURRICULUM
          </span>
          <h2
            className="text-2xl sm:text-4xl tracking-[0.2em] font-bold text-[var(--zen-snow)] uppercase"
            style={{ fontFamily: "var(--font-zen-display, serif)" }}
          >
            COURSE CURRICULUM
          </h2>
          <p className="mt-2 text-xs font-mono tracking-wider text-[var(--zen-ink-muted)]">
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
            { id: "all", label: "ALL DOMAINS // 全領域", color: "#00E5FF" },
            { id: "systems", label: "SYSTEMS & ARCH // 統", color: STAR_DOMAINS.systems.color },
            { id: "theory", label: "THEORY & MATH // 論", color: STAR_DOMAINS.theory.color },
            { id: "security", label: "NET & SECURITY // 防", color: STAR_DOMAINS.security.color },
            { id: "software", label: "SOFTWARE & AI // 創", color: STAR_DOMAINS.software.color },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveDomain(tab.id as any)}
              className={`px-4 py-2 text-xs font-mono tracking-wider transition-all rounded-md border flex items-center gap-2 ${
                activeDomain === tab.id
                  ? "border-[var(--zen-cyan)] text-[var(--zen-cyan)] bg-[var(--zen-cyan)]/10 shadow-[0_0_15px_rgba(0,229,255,0.2)] font-semibold"
                  : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] bg-[var(--zen-card)] hover:border-[var(--zen-border)]"
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

        {/* Secondary Track Filter Chips (Core CS / NIS / ST-ready) */}
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
                  ? "border-[var(--zen-cyan)]/80 text-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 font-medium"
                  : "border-[var(--zen-border)]/60 text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] bg-[var(--zen-card)]/50"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Carousel / Paginated Bento Grid (Max 7 Subject Stars per page) */}
        <div className="relative min-h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeDomain}-${activeTrack}-${currentPage}`}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 universe-bento-grid"
            >
              {currentCourses.map((course, index) => {
                const bento = getBentoLayout(index, currentCourses.length);
                const domainMeta = STAR_DOMAINS[course.category] || STAR_DOMAINS.systems;

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
                      {/* Double-Bezel Architecture: Featured Wide Bento Shell */}
                      <div className="universe-card h-full p-[1px] rounded-2xl bg-gradient-to-br from-[var(--zen-border)] via-[var(--zen-border)]/60 to-[var(--zen-cyan)]/25 hover:from-[var(--zen-cyan)]/50 hover:to-[var(--zen-cyan)]/80 transition-all duration-300 shadow-xl group flex flex-col">
                        <Link
                          href={course.href}
                          className="h-full rounded-[15px] bg-[var(--zen-midnight)]/90 hover:bg-[var(--zen-card-hover)] p-6 sm:p-7 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden transition-colors duration-200"
                          aria-label={`${course.code}: ${course.name} - ${course.categoryLabel} (${course.track}), ${course.count} monographs`}
                        >
                          {/* Background Category Kanji Seal Watermark */}
                          <span
                            className="pointer-events-none absolute -right-2 -bottom-4 text-8xl font-serif text-[var(--zen-snow)] opacity-[0.035] group-hover:opacity-[0.08] transition-opacity select-none"
                            style={{ fontFamily: "var(--font-zen-brush, serif)" }}
                            aria-hidden="true"
                          >
                            {domainMeta.kanji}
                          </span>

                          {/* Ambient Corner Cyan Sheen */}
                          <div
                            className="pointer-events-none absolute -top-12 -left-12 w-36 h-36 bg-[var(--zen-cyan)]/10 rounded-full blur-2xl group-hover:bg-[var(--zen-cyan)]/20 transition-colors duration-500"
                            aria-hidden="true"
                          />

                          {/* Left Content Column */}
                          <div
                            className="flex-1 min-w-0 pr-0 lg:pr-4 relative z-10"
                            aria-hidden="true"
                          >
                            {/* Badges / Header Strip */}
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className="px-2.5 py-0.5 text-[11px] font-mono tracking-widest text-[var(--zen-cyan)] border border-[var(--zen-cyan)]/50 bg-[var(--zen-cyan)]/10 font-bold uppercase shadow-[0_0_10px_rgba(0,229,255,0.15)]">
                                {course.code}
                              </span>
                              <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider text-[var(--zen-ink-muted)] border border-[var(--zen-border)] bg-[var(--zen-card)]/60 uppercase">
                                {course.categoryLabel}
                              </span>
                              <span className="px-2 py-0.5 text-[10px] font-mono text-[var(--zen-frost)] border border-[var(--zen-border)]/60 uppercase tracking-wider">
                                {course.track}
                              </span>
                            </div>

                            {/* Title */}
                            <h4
                              className="text-base sm:text-xl font-semibold tracking-wide text-[var(--zen-snow)] group-hover:text-[var(--zen-cyan)] transition-colors mb-2 leading-snug"
                              style={{ fontFamily: "var(--font-zen-display, serif)" }}
                            >
                              {course.name}
                            </h4>

                            {/* Description */}
                            <p className="text-xs sm:text-sm text-[var(--zen-ink-muted)] leading-relaxed line-clamp-2 max-w-xl mb-3">
                              {course.desc}
                            </p>

                            {/* Related Courses */}
                            {course.relatedCourses.length > 0 && (
                              <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-[var(--zen-ink-muted)]">
                                <span className="text-[var(--zen-cyan)]/80 uppercase">
                                  RELATED:
                                </span>
                                {course.relatedCourses.slice(0, 4).map((rel) => (
                                  <span
                                    key={rel}
                                    className="px-1.5 py-0.5 rounded border border-[var(--zen-border)] bg-[var(--zen-card)]/60 text-[var(--zen-frost)]"
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
                                COURSE // 科目
                              </span>
                            </div>

                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--zen-border)] bg-[var(--zen-card)] group-hover:border-[var(--zen-cyan)] group-hover:bg-[var(--zen-cyan)] group-hover:text-[var(--zen-void)] text-xs font-mono tracking-wider text-[var(--zen-snow)] transition-all duration-200">
                              <span>EXPLORE</span>
                              <span className="text-[11px] group-hover:translate-x-0.5 transition-transform">
                                →
                              </span>
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
                    {/* Double-Bezel Architecture: Standard Bento Shell */}
                    <div className="universe-card h-full p-[1px] rounded-2xl bg-gradient-to-b from-[var(--zen-border)] to-[var(--zen-border)]/40 hover:from-[var(--zen-cyan)]/40 hover:to-[var(--zen-cyan)]/20 transition-all duration-300 shadow-md group flex flex-col justify-between">
                      <Link
                        href={course.href}
                        className="h-full rounded-[15px] bg-[var(--zen-midnight)]/80 hover:bg-[var(--zen-card-hover)] p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden transition-colors duration-200"
                        aria-label={`${course.code}: ${course.name} - ${course.categoryLabel} (${course.track}), ${course.count} monographs`}
                      >
                        {/* Background Category Kanji Seal Watermark */}
                        <span
                          className="pointer-events-none absolute -right-1 -bottom-3 text-7xl font-serif text-[var(--zen-snow)] opacity-[0.025] group-hover:opacity-[0.06] transition-opacity select-none"
                          style={{ fontFamily: "var(--font-zen-brush, serif)" }}
                          aria-hidden="true"
                        >
                          {domainMeta.kanji}
                        </span>

                        <div aria-hidden="true">
                          {/* Top Code & Track Ribbon */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="px-2 py-0.5 text-[10px] font-mono tracking-widest text-[var(--zen-cyan)] border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/5 font-semibold">
                              {course.code}
                            </span>
                            <span className="text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase">
                              {course.track} · {domainMeta.shortLabel}
                            </span>
                          </div>

                          {/* Course Title */}
                          <h4
                            className="text-sm sm:text-base font-semibold tracking-wide text-[var(--zen-snow)] group-hover:text-[var(--zen-cyan)] transition-colors mb-2 line-clamp-2 leading-snug"
                            style={{ fontFamily: "var(--font-zen-display, serif)" }}
                          >
                            {course.name}
                          </h4>

                          {/* Description */}
                          <p className="text-xs text-[var(--zen-ink-muted)] leading-relaxed line-clamp-3">
                            {course.desc}
                          </p>
                        </div>

                        {/* Bottom Telemetry & Trailing Arrow Button-in-Button */}
                        <div
                          className="mt-5 pt-3.5 border-t border-[var(--zen-border)]/40 flex items-center justify-between relative z-10"
                          aria-hidden="true"
                        >
                          <span className="font-mono text-[10px] text-[var(--zen-ink-muted)] font-medium tracking-wider">
                            {course.count} MONOGRAPHS · {course.relatedCourses.length} LINKS
                          </span>

                          {/* Button-in-Button Trailing Icon */}
                          <div className="w-6 h-6 rounded-full border border-[var(--zen-border)] flex items-center justify-center text-[var(--zen-ink-muted)] group-hover:border-[var(--zen-cyan)] group-hover:text-[var(--zen-cyan)] group-hover:translate-x-0.5 transition-all">
                            <span className="text-[10px] leading-none">→</span>
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
            {/* Left: Telemetry Counter */}
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--zen-ink-muted)]">
              <span className="w-1.5 h-1.5 rotate-45 bg-[var(--zen-cyan)] shadow-[0_0_8px_rgba(0,229,255,0.4)]" />
              <span>
                DISPLAYING {currentPage * ITEMS_PER_PAGE + 1}-
                {Math.min((currentPage + 1) * ITEMS_PER_PAGE, filteredCourses.length)} OF{" "}
                {filteredCourses.length} COURSES
              </span>
              <span className="text-[var(--zen-slate-edge)] hidden md:inline">|</span>
              <span className="text-[10px] tracking-wider uppercase text-[var(--zen-cyan)] hidden md:inline">
                PAGE {currentPage + 1} // 全{totalPages}頁
              </span>
            </div>

            {/* Center: Numeric Page Pills */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`min-w-8 h-8 px-2.5 text-xs font-mono tracking-wider transition-all rounded border flex items-center justify-center ${
                    currentPage === i
                      ? "border-[var(--zen-cyan)] text-[var(--zen-cyan)] bg-[var(--zen-cyan)]/15 shadow-[0_0_12px_rgba(0,229,255,0.25)] font-semibold"
                      : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:border-[var(--zen-border)] bg-[var(--zen-card)]"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              ))}
            </div>

            {/* Right: Prev & Next Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded border text-xs font-mono tracking-wider transition-all ${
                  currentPage === 0
                    ? "border-[var(--zen-border)]/30 text-[var(--zen-ink-muted)]/30 cursor-not-allowed bg-transparent"
                    : "border-[var(--zen-border)] text-[var(--zen-snow)] hover:border-[var(--zen-cyan)] hover:text-[var(--zen-cyan)] bg-[var(--zen-card)] shadow-sm active:scale-95"
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
                    : "border-[var(--zen-cyan)] text-[var(--zen-cyan)] hover:bg-[var(--zen-cyan)]/10 bg-[var(--zen-card)] shadow-[0_0_12px_rgba(0,229,255,0.15)] font-semibold active:scale-95"
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
          MINIMALIST COLOPHON FOOTER
          ====================================================================== */}
      <footer className="relative z-20 border-t border-[var(--zen-border)] py-16 px-6 text-center bg-[var(--zen-void)]/95">
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          {/* Hanko Seal SVG */}
          <svg className="w-12 h-12 mb-4" viewBox="0 0 48 48" fill="none" aria-hidden="true">
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
          <p
            className="text-xs italic text-[var(--zen-ink-muted)] tracking-wider mb-6"
            style={{ fontFamily: "var(--font-zen-serif, serif)" }}
          >
            先延ばしは成功の天罰。 // Knowledge forged in code, preserved in ink.
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
