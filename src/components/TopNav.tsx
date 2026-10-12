"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "@/components/ThemeProvider";

export default function TopNav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, isLite, toggleTheme, togglePerfMode } = useTheme();

  const leftLinks = [
    { label: "HOME", sub: "首頁", href: "/" },
    { label: "CURRICULUM", sub: "体系", href: "/#curriculum" },
  ];

  const rightLinks = [
    { label: "GRAPH", sub: "星図", href: "/notes?view=graph" },
    { label: "ARCHIVE", sub: "目録", href: "/notes?view=directory" },
  ];

  return (
    <>
      <header className="sticky top-0 left-0 w-full z-40 px-4 sm:px-8 lg:px-12 py-3 bg-[var(--zen-void)]/90 backdrop-blur-2xl border-b border-[var(--zen-border)] transition-colors duration-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left Nav Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation left">
            {leftLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`group flex flex-col items-center text-xs tracking-[0.28em] font-semibold transition-colors duration-300 ${
                    isActive
                      ? "text-[var(--zen-cyan)]"
                      : "text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
                  }`}
                  style={{ fontFamily: "var(--font-zen-display, var(--font-wuxia-primary, serif))" }}
                >
                  <span>{link.label}</span>
                  <span
                    className="text-[10px] tracking-[0.4em] text-[var(--zen-ink-muted)] opacity-70 group-hover:text-[var(--zen-cyan)] transition-colors mt-0.5"
                    style={{ fontFamily: "var(--font-zen-serif, serif)" }}
                  >
                    {link.sub}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Center Brand Crest */}
          <Link
            href="/"
            className="group flex flex-col items-center justify-center text-center px-4"
            aria-label="Project Engram Home"
          >
            <span
              className="text-xs tracking-[0.32em] font-medium text-[var(--zen-moon-silver)] group-hover:text-[var(--zen-cyan)] transition-colors"
              style={{ fontFamily: "var(--font-zen-display, var(--font-wuxia-primary, serif))" }}
            >
              PROJECT
            </span>
            <span
              className="text-sm tracking-[0.42em] font-bold text-[var(--zen-snow)] group-hover:text-[var(--zen-cyan)] transition-colors -mt-0.5"
              style={{ fontFamily: "var(--font-zen-decor, var(--font-wuxia-primary, serif))" }}
            >
              ENGRAM
            </span>
            <svg className="w-28 h-2 mt-0.5" viewBox="0 0 140 8" fill="none" aria-hidden="true">
              <path
                d="M0,4 L55,4 L70,1 L85,4 L140,4 L85,4 L70,7 L55,4 Z"
                fill="currentColor"
                className="text-[var(--zen-steel)] group-hover:text-[var(--zen-cyan)] transition-colors"
              />
            </svg>
          </Link>

          {/* Right Nav Links & Controls */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-8" aria-label="Primary navigation right">
              {rightLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href.startsWith("/notes") && pathname.startsWith("/notes"));
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`group flex flex-col items-center text-xs tracking-[0.28em] font-semibold transition-colors duration-300 ${
                      isActive
                        ? "text-[var(--zen-cyan)]"
                        : "text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
                    }`}
                    style={{ fontFamily: "var(--font-zen-display, var(--font-wuxia-primary, serif))" }}
                  >
                    <span>{link.label}</span>
                    <span
                      className="text-[10px] tracking-[0.4em] text-[var(--zen-ink-muted)] opacity-70 group-hover:text-[var(--zen-cyan)] transition-colors mt-0.5"
                      style={{ fontFamily: "var(--font-zen-serif, serif)" }}
                    >
                      {link.sub}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Integrated Controls (Zero emojis) */}
            <div className="flex items-center gap-2 pl-4 border-l border-[var(--zen-border)]">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                className="p-1.5 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-frost)] hover:text-[var(--zen-cyan)] transition-all bg-[var(--zen-card)] shadow-sm"
              >
                {theme === "dark" ? (
                  /* Sun SVG */
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                  /* Moon SVG */
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>

              {/* Performance Toggle Button */}
              <button
                onClick={togglePerfMode}
                aria-label={`Toggle performance mode, currently ${isLite ? "lite" : "full"}`}
                className={`px-2 py-1 text-[10px] font-mono tracking-wider rounded border transition-all ${
                  isLite
                    ? "border-amber-500/50 text-amber-500 bg-amber-500/10"
                    : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] hover:border-[var(--zen-cyan)]/60 bg-[var(--zen-card)]"
                }`}
              >
                {isLite ? "LITE" : "FULL"}
              </button>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-1.5 rounded border border-[var(--zen-border)] text-[var(--zen-frost)] bg-[var(--zen-card)]"
            >
              {theme === "dark" ? (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded border border-[var(--zen-border)] text-[var(--zen-snow)] bg-[var(--zen-card)]"
            >
              <div className="w-4 h-3.5 flex flex-col justify-between">
                <span className={`h-0.5 w-full bg-[var(--zen-cyan)] transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                <span className={`h-0.5 w-full bg-[var(--zen-cyan)] transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`h-0.5 w-full bg-[var(--zen-cyan)] transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Center Hairline Underline Accent */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-[1px] bg-gradient-to-r from-transparent via-[var(--zen-cyan)]/60 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </header>

      {/* Mobile Drawer Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[57px] z-30 p-6 bg-[var(--zen-void)]/98 backdrop-blur-2xl border-b border-[var(--zen-border)] flex flex-col gap-4 md:hidden shadow-2xl"
          >
            {[...leftLinks, ...rightLinks].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-sm tracking-[0.2em] text-[var(--zen-frost)] hover:text-[var(--zen-cyan)] border-b border-[var(--zen-border)]/50"
                style={{ fontFamily: "var(--font-zen-display, var(--font-wuxia-primary, serif))" }}
              >
                <span>{link.label}</span>
                <span className="text-xs text-[var(--zen-ink-muted)]">{link.sub}</span>
              </Link>
            ))}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[var(--zen-ink-muted)] font-mono">PERFORMANCE:</span>
              <button
                onClick={togglePerfMode}
                className="px-3 py-1 text-xs font-mono rounded border border-[var(--zen-border)] text-[var(--zen-cyan)]"
              >
                {isLite ? "LITE" : "FULL"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
