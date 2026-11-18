"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const CONSENT_STORAGE_KEY = "engram-cookie-consent";
const LEGACY_ACK_KEY = "engram-telemetry-ack";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    let timerId: number | undefined;
    try {
      const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
      const legacyAck = localStorage.getItem(LEGACY_ACK_KEY);
      const hasCookie =
        typeof document !== "undefined" &&
        document.cookie
          .split("; ")
          .some((row) => row.startsWith("engram-telemetry-ack="));

      if (!consent && !legacyAck && !hasCookie) {
        timerId = window.setTimeout(() => setVisible(true), 0);
      }
    } catch {
      // Ignore restricted storage environments
    }
    return () => {
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, []);

  const persistChoice = useCallback((mode: "accepted" | "essential") => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, mode);
      localStorage.setItem(
        LEGACY_ACK_KEY,
        mode === "accepted" ? "true" : "essential"
      );

      if (typeof document !== "undefined") {
        const secureAttr =
          window.location.protocol === "https:" ? "; Secure" : "";
        document.cookie = `engram-telemetry-ack=${
          mode === "accepted" ? "true" : "essential"
        }; path=/; max-age=31536000; SameSite=Lax${secureAttr}`;

        if (mode === "accepted") {
          document.cookie = `engram-perf-cache=enabled; path=/; max-age=31536000; SameSite=Lax${secureAttr}`;
        } else {
          document.cookie = `engram-perf-cache=; path=/; max-age=0; SameSite=Lax${secureAttr}`;
        }
      }
    } catch {
      // Ignore storage write errors
    }
    setVisible(false);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        persistChoice("essential");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visible, persistChoice]);

  if (!visible) return null;

  return (
    <aside
      aria-label="Cookie and local storage consent notice"
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-50 p-4 sm:p-5 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)]/95 backdrop-blur-md universe-card shadow-[0_10px_30px_rgba(0,0,0,0.6)] text-[var(--zen-frost)] print:hidden"
    >
      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[var(--zen-border)]/60">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full bg-[var(--zen-cyan)] animate-pulse"
            aria-hidden="true"
          />
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
            STORAGE &amp; TELEMETRY NOTICE
          </span>
        </div>
        <button
          type="button"
          onClick={() => persistChoice("essential")}
          aria-label="Dismiss with essential storage only"
          className="text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] text-xs font-mono px-1.5 py-0.5 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
          title="Close (Essential Only)"
        >
          [x]
        </button>
      </div>

      <p className="text-xs text-[var(--zen-frost)]/90 leading-relaxed font-sans mb-3">
        Project Engram uses essential <code className="font-mono text-[11px] text-[var(--zen-cyan)]">localStorage</code> for your theme universe, study progress, and simulator state, plus optional performance cache cookies and anonymous Vercel Web Vitals. Zero advertising or tracking cookies are used.
      </p>

      {showDetails && (
        <div className="mb-3 p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/80 space-y-2 font-mono text-[11px]">
          <div>
            <span className="text-[10px] text-[var(--zen-cyan)] uppercase font-semibold block">
              1. ESSENTIAL LOCAL STORAGE
            </span>
            <span className="text-[var(--zen-ink-muted)] block mt-0.5">
              Preserves Design Universe polarity, completed monographs, and stateless EG2 sync codes directly on your device.
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[var(--zen-cyan)] uppercase font-semibold block">
              2. PERFORMANCE CACHE &amp; WEB VITALS
            </span>
            <span className="text-[var(--zen-ink-muted)] block mt-0.5">
              Optional engram-perf-cache cookie and anonymous runtime error diagnostics.
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowDetails((p) => !p)}
            className="text-[10px] font-mono uppercase text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] transition-colors underline underline-offset-4 decoration-[var(--zen-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)] rounded"
          >
            {showDetails ? "HIDE DETAILS" : "DETAILS"}
          </button>
          <Link
            href="/cookies"
            className="text-[10px] font-mono uppercase text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] transition-colors underline underline-offset-4 decoration-[var(--zen-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)] rounded"
          >
            COOKIE POLICY
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => persistChoice("essential")}
            className="px-2.5 py-1.5 rounded text-[11px] font-mono uppercase border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] bg-[var(--zen-void)] text-[var(--zen-frost)] hover:text-[var(--zen-cyan)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
          >
            ESSENTIAL ONLY
          </button>
          <button
            type="button"
            onClick={() => persistChoice("accepted")}
            className="px-3 py-1.5 rounded text-[11px] font-mono font-bold uppercase border border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 hover:bg-[var(--zen-cyan)]/30 text-[var(--zen-snow)] transition-all shadow-[0_0_12px_rgba(0,229,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
          >
            ACCEPT
          </button>
        </div>
      </div>
    </aside>
  );
}
