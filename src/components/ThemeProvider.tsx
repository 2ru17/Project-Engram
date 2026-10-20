"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

export type Theme = "dark" | "light";
export type PerfMode = "full" | "lite";
export type UniverseId =
  | "cyber-zen"
  | "neo-brutalism"
  | "minimalism"
  | "parallax"
  | "broken-grid";

export interface UniverseMeta {
  id: UniverseId;
  label: string;
  code: string;
  desc: string;
  supportsColorMode: boolean;
  nativePolarity: Theme;
  accentHex: string;
}

export const UNIVERSE_REGISTRY: Record<UniverseId, UniverseMeta> = {
  "cyber-zen": {
    id: "cyber-zen",
    label: "CYBER-ZEN",
    code: "U-01",
    desc: "Obsidian Washi & Cyan Telemetry",
    supportsColorMode: true,
    nativePolarity: "dark",
    accentHex: "#00E5FF",
  },
  "neo-brutalism": {
    id: "neo-brutalism",
    label: "NEO-BRUTALISM",
    code: "U-02",
    desc: "Swiss Print & Hard Offset Shadows",
    supportsColorMode: false,
    nativePolarity: "light",
    accentHex: "#FF2A2A",
  },
  minimalism: {
    id: "minimalism",
    label: "MINIMALISM",
    code: "U-03",
    desc: "Warm Monochrome & Editorial Calm",
    supportsColorMode: false,
    nativePolarity: "light",
    accentHex: "#1F6C9F",
  },
  parallax: {
    id: "parallax",
    label: "PARALLAX",
    code: "U-04",
    desc: "Deep Horizon Z-Axis Expedition",
    supportsColorMode: false,
    nativePolarity: "dark",
    accentHex: "#E5A93C",
  },
  "broken-grid": {
    id: "broken-grid",
    label: "BROKEN GRID",
    code: "U-05",
    desc: "Asymmetric Blueprint & Exposed Grid",
    supportsColorMode: false,
    nativePolarity: "light",
    accentHex: "#D9381E",
  },
};

export const UNIVERSE_LIST: UniverseMeta[] = Object.values(UNIVERSE_REGISTRY);

const COOLDOWN_DURATION_MS = 2000;
const WARP_SWAP_MS = 480;
const WARP_TOTAL_MS = 1150;

interface ThemeContextType {
  theme: Theme;
  universe: UniverseId;
  targetUniverse: UniverseId | null;
  isLite: boolean;
  isTransitioning: boolean;
  cooldownMs: number;
  cooldownProgress: number; // 0..1
  supportsColorMode: boolean;
  setUniverse: (next: UniverseId) => void;
  toggleTheme: () => void;
  togglePerfMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function applyDomAttributes(universe: UniverseId, cyberZenTheme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  const meta = UNIVERSE_REGISTRY[universe] || UNIVERSE_REGISTRY["cyber-zen"];
  const effectiveTheme = meta.supportsColorMode
    ? cyberZenTheme
    : meta.nativePolarity;
  root.setAttribute("data-universe", universe);
  root.setAttribute("data-theme", effectiveTheme);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [cyberZenTheme, setCyberZenTheme] = useState<Theme>("dark");
  const [universe, setUniverseState] = useState<UniverseId>("cyber-zen");
  const [targetUniverse, setTargetUniverse] = useState<UniverseId | null>(null);
  const [perf, setPerf] = useState<PerfMode>("full");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cooldownMs, setCooldownMs] = useState(0);

  const cooldownUntilRef = useRef<number>(0);
  const swapTimerRef = useRef<NodeJS.Timeout | null>(null);
  const endTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const savedTheme =
      (localStorage.getItem("engram-theme") as Theme) ||
      (root.getAttribute("data-theme") as Theme) ||
      "dark";
    const savedUniverse =
      (localStorage.getItem("engram-universe") as UniverseId) ||
      (root.getAttribute("data-universe") as UniverseId) ||
      "cyber-zen";
    const savedPerf =
      (localStorage.getItem("engram-perf") as PerfMode) ||
      (root.getAttribute("data-perf") as PerfMode) ||
      "full";

    const validUniverse: UniverseId =
      savedUniverse in UNIVERSE_REGISTRY ? savedUniverse : "cyber-zen";
    const validTheme: Theme = savedTheme === "light" ? "light" : "dark";
    const validPerf: PerfMode = savedPerf === "lite" ? "lite" : "full";

    setCyberZenTheme(validTheme);
    setUniverseState(validUniverse);
    setPerf(validPerf);
    applyDomAttributes(validUniverse, validTheme);
    root.setAttribute("data-perf", validPerf);
  }, []);

  // Cooldown ticker
  useEffect(() => {
    if (cooldownMs <= 0) return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, cooldownUntilRef.current - Date.now());
      setCooldownMs(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [cooldownMs > 0]);

  useEffect(() => {
    return () => {
      if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
      if (endTimerRef.current) clearTimeout(endTimerRef.current);
    };
  }, []);

  const setUniverse = useCallback(
    (next: UniverseId) => {
      if (
        next === universe ||
        isTransitioning ||
        Date.now() < cooldownUntilRef.current
      ) {
        return;
      }

      cooldownUntilRef.current = Date.now() + COOLDOWN_DURATION_MS;
      setCooldownMs(COOLDOWN_DURATION_MS);
      localStorage.setItem("engram-universe", next);

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

      if (perf === "lite" || prefersReduced) {
        // Fast 200ms crossfade in Lite mode
        setTargetUniverse(next);
        setIsTransitioning(true);
        setUniverseState(next);
        applyDomAttributes(next, cyberZenTheme);
        endTimerRef.current = setTimeout(() => {
          setIsTransitioning(false);
          setTargetUniverse(null);
        }, 200);
        return;
      }

      // Full 1.15s Black Hole Singularity Warp Jump
      setTargetUniverse(next);
      setIsTransitioning(true);

      swapTimerRef.current = setTimeout(() => {
        setUniverseState(next);
        applyDomAttributes(next, cyberZenTheme);
      }, WARP_SWAP_MS);

      endTimerRef.current = setTimeout(() => {
        setIsTransitioning(false);
        setTargetUniverse(null);
      }, WARP_TOTAL_MS);
    },
    [universe, isTransitioning, perf, cyberZenTheme]
  );

  const toggleTheme = useCallback(() => {
    // Only Cyber-Zen has a Dark/Light toggle
    if (!UNIVERSE_REGISTRY[universe].supportsColorMode) return;
    setCyberZenTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("engram-theme", next);
      applyDomAttributes(universe, next);
      return next;
    });
  }, [universe]);

  const togglePerfMode = useCallback(() => {
    setPerf((prev) => {
      const next = prev === "full" ? "lite" : "full";
      localStorage.setItem("engram-perf", next);
      document.documentElement.setAttribute("data-perf", next);
      return next;
    });
  }, []);

  const meta = UNIVERSE_REGISTRY[universe] || UNIVERSE_REGISTRY["cyber-zen"];
  const effectiveTheme: Theme = meta.supportsColorMode
    ? cyberZenTheme
    : meta.nativePolarity;
  const cooldownProgress = Math.min(
    1,
    Math.max(0, cooldownMs / COOLDOWN_DURATION_MS)
  );

  return (
    <ThemeContext.Provider
      value={{
        theme: effectiveTheme,
        universe,
        targetUniverse,
        isLite: perf === "lite",
        isTransitioning,
        cooldownMs,
        cooldownProgress,
        supportsColorMode: meta.supportsColorMode,
        setUniverse,
        toggleTheme,
        togglePerfMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
