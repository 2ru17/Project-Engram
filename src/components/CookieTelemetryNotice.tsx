"use client";

import { useState, useEffect } from "react";

export function CookieTelemetryNotice() {
  const [hasAcknowledged, setHasAcknowledged] = useState<boolean>(true); // default true to avoid hydration flicker
  const [showDetails, setShowDetails] = useState<boolean>(false);

  useEffect(() => {
    try {
      // Ensure performance cache cookie is active
      if (typeof document !== "undefined" && !document.cookie.includes("engram-perf-cache=")) {
        document.cookie = "engram-perf-cache=enabled; path=/; max-age=31536000; SameSite=Lax";
      }

      const storedLocal = localStorage.getItem("engram-telemetry-ack");
      const cookieAck = typeof document !== "undefined" && document.cookie.split("; ").some((row) => row.startsWith("engram-telemetry-ack="));

      if (!storedLocal && !cookieAck) {
        setHasAcknowledged(false);
      }
    } catch {
      // Ignore security or storage exceptions
    }
  }, []);

  const handleAcknowledge = () => {
    try {
      localStorage.setItem("engram-telemetry-ack", "true");
      if (typeof document !== "undefined") {
        document.cookie = "engram-telemetry-ack=true; path=/; max-age=31536000; SameSite=Lax";
        document.cookie = "engram-perf-cache=enabled; path=/; max-age=31536000; SameSite=Lax";
      }
    } catch {
      // Ignore
    }
    setHasAcknowledged(true);
  };

  if (hasAcknowledged) return null;

  return (
    <aside
      aria-label="Performance cache and telemetry notice"
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-md z-50 p-4 sm:p-5 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)]/95 backdrop-blur-md universe-card shadow-[0_10px_30px_rgba(0,0,0,0.6)] text-[var(--zen-frost)] transition-all animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-[var(--zen-border)]/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--zen-cyan)] animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
            SYSTEM NOTICE // PERFORMANCE CACHE & TELEMETRY
          </span>
        </div>
        <button
          onClick={handleAcknowledge}
          className="text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] text-xs font-mono"
          title="Dismiss notice"
        >
          [x]
        </button>
      </div>

      <p className="text-xs text-[var(--zen-frost)]/90 leading-relaxed font-sans mb-3">
        Project Engram utilizes client-side cookies and local storage for performance caching, saving local application states (reading progress, study plans, EG2 sync codes), and Vercel Analytics for monitoring runtime errors and Core Web Vitals. Zero third-party advertising or commercial tracking cookies are utilized.
      </p>

      {showDetails && (
        <div className="mb-3 p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/80 space-y-2 font-mono text-[11px]">
          <div>
            <span className="text-[10px] text-[var(--zen-cyan)] uppercase font-semibold block">
              1. PERFORMANCE ASSET & STATE COOKIES
            </span>
            <span className="text-[var(--zen-ink-muted)] block mt-0.5">
              Sets engram-perf-cache and engram-telemetry-ack cookies alongside local storage to cache pre-rendered monograph tokens, KaTeX mathematical fonts, and SVG assets across browser sessions.
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[var(--zen-cyan)] uppercase font-semibold block">
              2. LOCAL STATE PERSISTENCE (STUDY PLANS & EG2)
            </span>
            <span className="text-[var(--zen-ink-muted)] block mt-0.5">
              Preserves completed monograph checkpoints, study codes, and Cyber-Zen aesthetic theme selections directly on your device.
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[var(--zen-cyan)] uppercase font-semibold block">
              3. VERCEL RUNTIME ERROR TELEMETRY
            </span>
            <span className="text-[var(--zen-ink-muted)] block mt-0.5">
              Captures anonymous runtime errors, unhandled promise rejections, and static generation health to diagnose issues without harvesting personal data.
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 pt-1">
        <button
          onClick={() => setShowDetails((p) => !p)}
          className="text-[10px] font-mono uppercase text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)] transition-colors underline underline-offset-4 decoration-[var(--zen-border)]"
        >
          {showDetails ? "[ HIDE DETAILS ]" : "[ CACHE & COOKIE DETAILS ]"}
        </button>
        <button
          onClick={handleAcknowledge}
          className="px-3 py-1.5 rounded text-xs font-mono font-bold uppercase border border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 hover:bg-[var(--zen-cyan)]/30 text-[var(--zen-snow)] transition-all shadow-[0_0_12px_rgba(0,229,255,0.2)]"
        >
          ACKNOWLEDGE
        </button>
      </div>
    </aside>
  );
}

