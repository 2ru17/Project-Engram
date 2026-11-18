"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  useTheme,
  UNIVERSE_LIST,
  UNIVERSE_REGISTRY,
  type UniverseId,
} from "@/components/ThemeProvider";
import { useStudyPlan } from "@/components/StudyPlanProvider";
import { STUDY_PLAN_TIERS } from "@/lib/study-plans";
import { LATEST_CHANGELOG_VERSION } from "@/data/changelog";

const FeatureGuideModal = dynamic(
  () => import("@/components/modals/FeatureGuideModal"),
  { ssr: false }
);
const UpdateLogModal = dynamic(
  () => import("@/components/modals/UpdateLogModal"),
  { ssr: false }
);
const ContributeHelpModal = dynamic(
  () => import("@/components/modals/ContributeHelpModal"),
  { ssr: false }
);

const REPO_URL = "https://github.com/2ru17/Project-Engram";
const BMC_URL = "https://buymeacoffee.com/2ru17";

export default function TopNav() {
  const pathname = usePathname() || "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [universeMenuOpen, setUniverseMenuOpen] = useState(false);

  const [guideOpen, setGuideOpen] = useState(false);
  const [guideMounted, setGuideMounted] = useState(false);
  const [updatesOpen, setUpdatesOpen] = useState(false);
  const [updatesMounted, setUpdatesMounted] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpMounted, setHelpMounted] = useState(false);
  const [hasUnreadUpdates, setHasUnreadUpdates] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    theme,
    universe,
    isLite,
    cooldownMs,
    cooldownProgress,
    supportsColorMode,
    setUniverse,
    toggleTheme,
    togglePerfMode,
  } = useTheme();

  const { tier, completedCount, setSyncModalOpen } = useStudyPlan();

  const currentUniverseMeta =
    UNIVERSE_REGISTRY[universe] || UNIVERSE_REGISTRY["cyber-zen"];
  const isCoolingDown = cooldownMs > 0;

  useEffect(() => {
    let timerId: number | undefined;
    try {
      const seenVersion = localStorage.getItem("engram-seen-changelog");
      if (seenVersion !== LATEST_CHANGELOG_VERSION) {
        timerId = window.setTimeout(() => setHasUnreadUpdates(true), 0);
      }
    } catch {
      // Ignore storage access errors
    }
    return () => {
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setUniverseMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setUniverseMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const openGuideModal = useCallback(() => {
    setGuideMounted(true);
    setGuideOpen(true);
    setMobileMenuOpen(false);
  }, []);

  const openUpdatesModal = useCallback(() => {
    setUpdatesMounted(true);
    setUpdatesOpen(true);
    setMobileMenuOpen(false);
  }, []);

  const openHelpModal = useCallback(() => {
    setHelpMounted(true);
    setHelpOpen(true);
    setMobileMenuOpen(false);
  }, []);

  const handleMarkUpdatesSeen = useCallback(() => {
    setHasUnreadUpdates(false);
  }, []);

  const leftLinks = [
    {
      label: "HOME",
      sub:
        universe === "cyber-zen"
          ? "首頁"
          : universe === "broken-grid"
          ? "01"
          : universe === "parallax"
          ? "SEC.01"
          : "",
      href: "/",
    },
    {
      label: "CURRICULUM",
      sub:
        universe === "cyber-zen"
          ? "課程"
          : universe === "broken-grid"
          ? "02"
          : universe === "parallax"
          ? "SEC.02"
          : "",
      href: "/#curriculum",
    },
  ];

  const rightLinks = [
    {
      label: "GRAPH",
      sub:
        universe === "cyber-zen"
          ? "星図"
          : universe === "broken-grid"
          ? "03"
          : universe === "parallax"
          ? "SEC.03"
          : "",
      href: "/notes?view=graph",
    },
    {
      label: "SIMULATORS",
      sub:
        universe === "cyber-zen"
          ? "演習"
          : universe === "broken-grid"
          ? "04"
          : universe === "parallax"
          ? "SEC.04"
          : "",
      href: "/simulators",
    },
    {
      label: "ARCHIVE",
      sub:
        universe === "cyber-zen"
          ? "目録"
          : universe === "broken-grid"
          ? "05"
          : universe === "parallax"
          ? "SEC.05"
          : "",
      href: "/notes?view=directory",
    },
  ];

  const handleSelectUniverse = (id: UniverseId) => {
    if (isCoolingDown) return;
    setUniverse(id);
    setUniverseMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 left-0 w-full z-40 px-4 sm:px-6 lg:px-8 py-3 bg-[var(--zen-void)]/90 backdrop-blur-2xl border-b border-[var(--zen-border)] transition-colors duration-500 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left Nav Links */}
          <nav
            className="hidden lg:flex items-center gap-5 xl:gap-8"
            aria-label="Primary navigation left"
          >
            {leftLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`group flex flex-col items-center text-xs tracking-[0.24em] font-semibold transition-colors duration-300 rounded px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)] ${
                    isActive
                      ? "text-[var(--zen-cyan)]"
                      : "text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
                  }`}
                  style={{
                    fontFamily:
                      "var(--font-zen-display, var(--font-wuxia-primary, serif))",
                  }}
                >
                  <span>{link.label}</span>
                  {link.sub && (
                    <span
                      className="text-[10px] tracking-[0.35em] text-[var(--zen-ink-muted)] opacity-70 group-hover:text-[var(--zen-cyan)] transition-colors mt-0.5"
                      style={{ fontFamily: "var(--font-zen-serif, serif)" }}
                    >
                      {link.sub}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Center Brand Crest */}
          <Link
            href="/"
            className="group flex flex-col items-center justify-center text-center px-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
            aria-label="Project Engram Home"
          >
            <span
              className="text-xs tracking-[0.32em] font-medium text-[var(--zen-moon-silver)] group-hover:text-[var(--zen-cyan)] transition-colors"
              style={{
                fontFamily:
                  "var(--font-zen-display, var(--font-wuxia-primary, serif))",
              }}
            >
              PROJECT
            </span>
            <span
              className="text-sm tracking-[0.42em] font-bold text-[var(--zen-snow)] group-hover:text-[var(--zen-cyan)] transition-colors -mt-0.5"
              style={{
                fontFamily:
                  "var(--font-zen-decor, var(--font-wuxia-primary, serif))",
              }}
            >
              ENGRAM
            </span>
            {universe === "cyber-zen" && (
              <svg
                className="w-28 h-2 mt-0.5"
                viewBox="0 0 140 8"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0,4 L55,4 L70,1 L85,4 L140,4 L85,4 L70,7 L55,4 Z"
                  fill="currentColor"
                  className="text-[var(--zen-steel)] group-hover:text-[var(--zen-cyan)] transition-colors"
                />
              </svg>
            )}
          </Link>

          {/* Right Nav Links & Controls */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5">
            <nav
              className="flex items-center gap-5 xl:gap-7"
              aria-label="Primary navigation right"
            >
              {rightLinks.map((link) => {
                const isActive =
                  link.href === "/simulators"
                    ? pathname.startsWith("/simulators")
                    : pathname === link.href ||
                      (link.href.startsWith("/notes") &&
                        pathname.startsWith("/notes"));
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`group flex flex-col items-center text-xs tracking-[0.24em] font-semibold transition-colors duration-300 rounded px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)] ${
                      isActive
                        ? "text-[var(--zen-cyan)]"
                        : "text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
                    }`}
                    style={{
                      fontFamily:
                        "var(--font-zen-display, var(--font-wuxia-primary, serif))",
                    }}
                  >
                    <span>{link.label}</span>
                    {link.sub && (
                      <span
                        className="text-[10px] tracking-[0.35em] text-[var(--zen-ink-muted)] opacity-70 group-hover:text-[var(--zen-cyan)] transition-colors mt-0.5"
                        style={{ fontFamily: "var(--font-zen-serif, serif)" }}
                      >
                        {link.sub}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Integrated Controls */}
            <div className="flex items-center gap-1.5 pl-3 border-l border-[var(--zen-border)]">
              {/* Study Plan & Stateless EG2 Sync Trigger */}
              <button
                type="button"
                onClick={() => setSyncModalOpen(true)}
                aria-label="Open Study Plan and Profile Code Sync"
                className="px-2 py-1 text-[10px] font-mono tracking-wider rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-snow)] hover:text-[var(--zen-cyan)] bg-[var(--zen-card)] transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
                title="Study Plan & Stateless Profile Code Sync (EG2-...)"
              >
                <span className="text-[var(--zen-cyan)] font-bold">
                  {STUDY_PLAN_TIERS[tier].id.toUpperCase()}
                </span>
                <span className="text-[var(--zen-ink-muted)]">{"//"}</span>
                <span>SYNC</span>
                {completedCount > 0 && (
                  <span className="px-1 py-0.2 text-[9px] rounded bg-[var(--zen-cyan)]/20 text-[var(--zen-cyan)] font-bold">
                    {completedCount}
                  </span>
                )}
              </button>

              {/* 5-Universe Switcher Dropdown with 2s Cooldown Ring */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUniverseMenuOpen((prev) => !prev)}
                  disabled={isCoolingDown}
                  aria-label="Select Theme Universe"
                  aria-expanded={universeMenuOpen}
                  className={`relative px-2 py-1 text-[10px] font-mono tracking-wider rounded border transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)] ${
                    isCoolingDown
                      ? "border-[var(--zen-border)] text-[var(--zen-ink-muted)] opacity-60 cursor-not-allowed bg-[var(--zen-card)]"
                      : "border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-snow)] hover:text-[var(--zen-cyan)] bg-[var(--zen-card)]"
                  }`}
                >
                  <span className="relative w-3 h-3 flex items-center justify-center">
                    {isCoolingDown ? (
                      <svg
                        className="w-3 h-3 -rotate-90"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          cx="8"
                          cy="8"
                          r="6"
                          stroke="currentColor"
                          strokeOpacity="0.25"
                          strokeWidth="2"
                        />
                        <circle
                          cx="8"
                          cy="8"
                          r="6"
                          stroke="var(--zen-cyan)"
                          strokeWidth="2"
                          strokeDasharray={37.7}
                          strokeDashoffset={37.7 * (1 - cooldownProgress)}
                        />
                      </svg>
                    ) : (
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: currentUniverseMeta.accentHex }}
                      />
                    )}
                  </span>
                  <span className="hidden xl:inline">{currentUniverseMeta.label}</span>
                  <span className="text-[9px] text-[var(--zen-ink-muted)]">
                    {isCoolingDown
                      ? `${(cooldownMs / 1000).toFixed(1)}S`
                      : currentUniverseMeta.code}
                  </span>
                </button>

                <AnimatePresence>
                  {universeMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 mt-2 w-64 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/98 backdrop-blur-2xl p-2 shadow-2xl z-50"
                    >
                      <div className="px-2.5 py-1.5 border-b border-[var(--zen-border)]/60 mb-1 flex items-center justify-between">
                        <span className="text-[9px] font-mono tracking-widest text-[var(--zen-ink-muted)] uppercase">
                          UNIVERSE ENGINE // 5 MODES
                        </span>
                        <span className="text-[9px] font-mono text-[var(--zen-cyan)]">
                          2.0S LOCK
                        </span>
                      </div>
                      <div className="space-y-1">
                        {UNIVERSE_LIST.map((u) => {
                          const isSelected = u.id === universe;
                          return (
                            <button
                              key={u.id}
                              type="button"
                              onClick={() => handleSelectUniverse(u.id)}
                              disabled={isCoolingDown}
                              className={`w-full text-left px-2.5 py-2 rounded border transition-all flex items-start justify-between gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)] ${
                                isSelected
                                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/10 text-[var(--zen-snow)]"
                                  : "border-transparent hover:border-[var(--zen-border)] hover:bg-[var(--zen-card)] text-[var(--zen-frost)]"
                              }`}
                            >
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span
                                    className="w-2 h-2 rounded-full shrink-0"
                                    style={{ backgroundColor: u.accentHex }}
                                  />
                                  <span className="text-[11px] font-mono font-bold tracking-wider uppercase">
                                    {u.label}
                                  </span>
                                </div>
                                <p className="text-[10px] font-mono text-[var(--zen-ink-muted)] truncate mt-0.5 pl-4">
                                  {u.desc}
                                </p>
                              </div>
                              <span className="text-[9px] font-mono text-[var(--zen-ink-muted)] shrink-0">
                                {u.supportsColorMode ? "D/L" : u.code}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Dark/Light Toggle Button (Only active in Cyber-Zen default universe) */}
              {supportsColorMode && (
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                  className="p-1.5 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-frost)] hover:text-[var(--zen-cyan)] transition-all bg-[var(--zen-card)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
                  title="Toggle Cyber-Zen Dark / Light Mode"
                >
                  {theme === "dark" ? (
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                  ) : (
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  )}
                </button>
              )}

              {/* Performance Toggle Button */}
              <button
                type="button"
                onClick={togglePerfMode}
                aria-label={`Toggle performance mode, currently ${
                  isLite ? "lite" : "full"
                }`}
                className={`px-2 py-1 text-[10px] font-mono tracking-wider rounded border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)] ${
                  isLite
                    ? "border-amber-500/50 text-amber-500 bg-amber-500/10"
                    : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] hover:border-[var(--zen-cyan)]/60 bg-[var(--zen-card)]"
                }`}
                title="Toggle Full vs Lite Visual Effects"
              >
                {isLite ? "LITE" : "FULL"}
              </button>

              {/* Utility Action Hub: Feature Guide, Update Log, Contribute & Help, GitHub */}
              <div
                className="flex items-center gap-1 pl-1.5 ml-0.5 border-l border-[var(--zen-border)]"
                role="group"
                aria-label="Platform utility guides and repository links"
              >
                <button
                  type="button"
                  onClick={openGuideModal}
                  aria-label="Open Feature Guide"
                  title="Feature Guide & Platform Walkthrough"
                  className="p-1.5 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-frost)] hover:text-[var(--zen-cyan)] bg-[var(--zen-card)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={openUpdatesModal}
                  aria-label="Open Notes and Platform Update Log"
                  title="Notes & Platform Update Log"
                  className="relative p-1.5 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-frost)] hover:text-[var(--zen-cyan)] bg-[var(--zen-card)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                  </svg>
                  {hasUnreadUpdates && (
                    <span
                      className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--zen-cyan)] ring-2 ring-[var(--zen-void)]"
                      aria-hidden="true"
                    />
                  )}
                </button>

                <button
                  type="button"
                  onClick={openHelpModal}
                  aria-label="Open Contribute, Discussions, Issues and License Hub"
                  title="Contribute, Discussions, Issues & License Hub"
                  className="p-1.5 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-frost)] hover:text-[var(--zen-cyan)] bg-[var(--zen-card)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                  </svg>
                </button>

                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Project Engram GitHub Repository"
                  title="Project Engram on GitHub"
                  className="p-1.5 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-frost)] hover:text-[var(--zen-cyan)] bg-[var(--zen-card)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </a>

                <a
                  href={BMC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Support Project Engram on Buy Me a Coffee"
                  title="Support on Buy Me a Coffee"
                  className="p-1.5 rounded border border-[var(--zen-border)] hover:border-amber-400 text-[var(--zen-frost)] hover:text-amber-300 bg-[var(--zen-card)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M10 2v2" />
                    <path d="M14 2v2" />
                    <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
                    <path d="M6 2v2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile & Tablet Action Bar */}
          <div className="lg:hidden flex items-center gap-1.5">
            <button
              type="button"
              onClick={openGuideModal}
              aria-label="Open Feature Guide"
              className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded border border-[var(--zen-border)] text-[var(--zen-frost)] bg-[var(--zen-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 18h6" />
                <path d="M10 22h4" />
                <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
              </svg>
            </button>

            <button
              type="button"
              onClick={openUpdatesModal}
              aria-label="Open Notes and Platform Update Log"
              className="relative min-h-[40px] min-w-[40px] flex items-center justify-center rounded border border-[var(--zen-border)] text-[var(--zen-frost)] bg-[var(--zen-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              {hasUnreadUpdates && (
                <span
                  className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--zen-cyan)]"
                  aria-hidden="true"
                />
              )}
            </button>

            {supportsColorMode && (
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded border border-[var(--zen-border)] text-[var(--zen-frost)] bg-[var(--zen-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
              >
                {theme === "dark" ? (
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              className="min-h-[40px] min-w-[40px] flex items-center justify-center p-2 rounded border border-[var(--zen-border)] text-[var(--zen-snow)] bg-[var(--zen-card)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
            >
              <div className="w-4 h-3.5 flex flex-col justify-between">
                <span
                  className={`h-0.5 w-full bg-[var(--zen-cyan)] transition-transform duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-[var(--zen-cyan)] transition-opacity duration-300 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-[var(--zen-cyan)] transition-transform duration-300 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Center Hairline Underline Accent (Cyber-Zen & Parallax only) */}
        {(universe === "cyber-zen" || universe === "parallax") && (
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-[1px] bg-gradient-to-r from-transparent via-[var(--zen-cyan)]/60 to-transparent pointer-events-none"
            aria-hidden="true"
          />
        )}
      </header>

      {/* Mobile & Tablet Drawer Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[61px] bottom-0 overflow-y-auto z-30 p-6 bg-[var(--zen-void)]/98 backdrop-blur-2xl border-b border-[var(--zen-border)] flex flex-col gap-4 lg:hidden shadow-2xl"
          >
            {[...leftLinks, ...rightLinks].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="min-h-[42px] flex items-center justify-between py-2 text-sm tracking-[0.2em] text-[var(--zen-frost)] hover:text-[var(--zen-cyan)] border-b border-[var(--zen-border)]/50"
                style={{
                  fontFamily:
                    "var(--font-zen-display, var(--font-wuxia-primary, serif))",
                }}
              >
                <span>{link.label}</span>
                <span className="text-xs text-[var(--zen-ink-muted)]">
                  {link.sub}
                </span>
              </Link>
            ))}

            {/* Mobile Utility Hub Links */}
            <div className="pt-2 border-b border-[var(--zen-border)]/50 pb-3 space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-[var(--zen-ink-muted)] uppercase block">
                GUIDES, CHANGELOG &amp; GITHUB
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={openGuideModal}
                  className="min-h-[40px] px-3 py-2 text-[11px] font-mono rounded border border-[var(--zen-border)] text-[var(--zen-frost)] hover:border-[var(--zen-cyan)] text-left"
                >
                  FEATURE GUIDE
                </button>
                <button
                  type="button"
                  onClick={openUpdatesModal}
                  className="min-h-[40px] px-3 py-2 text-[11px] font-mono rounded border border-[var(--zen-border)] text-[var(--zen-frost)] hover:border-[var(--zen-cyan)] text-left flex items-center justify-between"
                >
                  <span>UPDATE LOG</span>
                  {hasUnreadUpdates && (
                    <span className="w-2 h-2 rounded-full bg-[var(--zen-cyan)]" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={openHelpModal}
                  className="min-h-[40px] px-3 py-2 text-[11px] font-mono rounded border border-[var(--zen-border)] text-[var(--zen-frost)] hover:border-[var(--zen-cyan)] text-left"
                >
                  CONTRIBUTE &amp; HELP
                </button>
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[40px] px-3 py-2 text-[11px] font-mono rounded border border-[var(--zen-border)] text-[var(--zen-cyan)] hover:border-[var(--zen-cyan)] text-left flex items-center justify-between"
                >
                  <span>GITHUB</span>
                  <span aria-hidden="true">↗</span>
                </a>
                <a
                  href={BMC_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-2 min-h-[40px] px-3 py-2 text-[11px] font-mono rounded border border-amber-500/40 bg-amber-500/10 text-amber-300 hover:border-amber-400 text-left flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M10 2v2" />
                      <path d="M14 2v2" />
                      <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
                      <path d="M6 2v2" />
                    </svg>
                    <span>BUY ME A COFFEE</span>
                  </span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>

            {/* Mobile Universe Selector */}
            <div className="pt-2 border-b border-[var(--zen-border)]/50 pb-3">
              <span className="text-[10px] font-mono tracking-widest text-[var(--zen-ink-muted)] uppercase block mb-2">
                SELECT UNIVERSE
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {UNIVERSE_LIST.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => {
                      handleSelectUniverse(u.id);
                      setMobileMenuOpen(false);
                    }}
                    disabled={isCoolingDown}
                    className={`min-h-[40px] px-2.5 py-1.5 text-[10px] font-mono rounded border text-left truncate ${
                      universe === u.id
                        ? "border-[var(--zen-cyan)] text-[var(--zen-cyan)] bg-[var(--zen-cyan)]/10 font-bold"
                        : "border-[var(--zen-border)] text-[var(--zen-frost)]"
                    }`}
                  >
                    {u.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-[var(--zen-ink-muted)] font-mono">
                STUDY PLAN &amp; SYNC:
              </span>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSyncModalOpen(true);
                }}
                className="min-h-[40px] px-3 py-1 text-xs font-mono rounded border border-[var(--zen-cyan)] text-[var(--zen-cyan)] bg-[var(--zen-cyan)]/10"
              >
                {STUDY_PLAN_TIERS[tier].shortLabel} ({completedCount})
              </button>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs text-[var(--zen-ink-muted)] font-mono">
                PERFORMANCE:
              </span>
              <button
                type="button"
                onClick={togglePerfMode}
                className="min-h-[40px] px-3 py-1 text-xs font-mono rounded border border-[var(--zen-border)] text-[var(--zen-cyan)]"
              >
                {isLite ? "LITE" : "FULL"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lazy-Loaded Utility Modals */}
      {guideMounted && (
        <FeatureGuideModal
          isOpen={guideOpen}
          onClose={() => setGuideOpen(false)}
          onOpenSyncModal={() => setSyncModalOpen(true)}
        />
      )}
      {updatesMounted && (
        <UpdateLogModal
          isOpen={updatesOpen}
          onClose={() => setUpdatesOpen(false)}
          onMarkSeen={handleMarkUpdatesSeen}
        />
      )}
      {helpMounted && (
        <ContributeHelpModal
          isOpen={helpOpen}
          onClose={() => setHelpOpen(false)}
        />
      )}
    </>
  );
}
