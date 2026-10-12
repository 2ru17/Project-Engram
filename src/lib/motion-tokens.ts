// src/lib/motion-tokens.ts
export const motionTokens = {
  duration: {
    instant: 0.08,
    fast: 0.18,
    normal: 0.35,
    slow: 0.6,
    crawl: 1.0,
  },
  easing: {
    // Project Engram tech-noir curve (GEMINI.md invariant)
    engram: [0.16, 1, 0.3, 1] as [number, number, number, number],
    // Softer variant for micro-interactions
    smooth: [0.22, 1, 0.36, 1] as [number, number, number, number],
    sharp: [0.4, 0, 0.2, 1] as [number, number, number, number],
  },
  distance: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 48,
  },
  scale: {
    subtle: 0.98,
    press: 0.95,
    pop: 1.04,
  },
  stagger: 0.05, // GEMINI.md: staggerChildren: 0.05
}

export const springs = {
  snappy: { type: "spring" as const, stiffness: 300, damping: 30 },
  gentle: { type: "spring" as const, stiffness: 120, damping: 14 },
  bouncy: { type: "spring" as const, stiffness: 400, damping: 10 },
}
