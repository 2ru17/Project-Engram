"use client";

import { motion, AnimatePresence } from "motion/react";
import { useTheme, UNIVERSE_REGISTRY } from "@/components/ThemeProvider";

export function WarpJumpOverlay() {
  const { isTransitioning, targetUniverse, universe, isLite } = useTheme();
  const activeTarget = targetUniverse || universe;
  const meta = UNIVERSE_REGISTRY[activeTarget] || UNIVERSE_REGISTRY["cyber-zen"];

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key={`warp-${activeTarget}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isLite ? 0.12 : 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          {isLite ? (
            /* Lite Mode: Instant 200ms Crossfade */
            <div
              className="absolute inset-0"
              style={{
                backgroundColor:
                  meta.nativePolarity === "light" ? "#F4F3EE" : "#05070B",
              }}
            />
          ) : (
            <>
              {/* Deep Relativistic Event Horizon Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.96, 0.96, 0] }}
                transition={{
                  duration: 1.12,
                  times: [0, 0.36, 0.65, 1],
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0 bg-[#030508]"
              />

              {/* Gravitational Lensing & Accretion Collapse Rings */}
              <motion.div
                initial={{ scale: 2.6, rotate: 0, opacity: 0 }}
                animate={{
                  scale: [2.6, 0.18, 0.18, 3.2],
                  rotate: [0, 95, 140, 220],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.12,
                  times: [0, 0.42, 0.58, 1],
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative w-[520px] h-[520px] flex items-center justify-center"
              >
                {/* Outer Accretion Disk */}
                <div
                  className="absolute inset-0 rounded-full border-2"
                  style={{
                    borderColor: meta.accentHex,
                    boxShadow: `0 0 80px ${meta.accentHex}, inset 0 0 60px ${meta.accentHex}`,
                  }}
                />
                {/* Elliptical Relativistic Ring */}
                <div
                  className="absolute w-[420px] h-[160px] rounded-full border rotate-12"
                  style={{
                    borderColor: meta.accentHex,
                    opacity: 0.75,
                  }}
                />
                <div
                  className="absolute w-[160px] h-[420px] rounded-full border -rotate-12"
                  style={{
                    borderColor: "#FFFFFF",
                    opacity: 0.35,
                  }}
                />
                {/* Event Horizon Shadow Core */}
                <div className="w-28 h-28 rounded-full bg-black border border-white/60 shadow-[0_0_40px_rgba(255,255,255,0.5)]" />
              </motion.div>

              {/* Per-Universe Arrival Geometry & Telemetry Stamp */}
              <motion.div
                initial={{ opacity: 0, scale: 0.86, y: 8 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.86, 1, 1.03, 1.08],
                  y: [8, 0, 0, -6],
                }}
                transition={{
                  duration: 1.05,
                  times: [0, 0.32, 0.72, 1],
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative z-10 px-8 py-5 border bg-[#060911]/95 text-center"
                style={{
                  borderColor: meta.accentHex,
                  borderWidth: activeTarget === "neo-brutalism" ? "3px" : "1px",
                  boxShadow:
                    activeTarget === "neo-brutalism"
                      ? `6px 6px 0px ${meta.accentHex}`
                      : `0 0 35px ${meta.accentHex}44`,
                }}
              >
                <div
                  className="text-[10px] font-mono tracking-[0.35em] uppercase mb-1.5"
                  style={{ color: meta.accentHex }}
                >
                  [ EVENT HORIZON TRANSIT // {meta.code} ]
                </div>
                <div className="text-xl sm:text-2xl font-mono font-bold tracking-[0.24em] text-white uppercase">
                  {meta.label}
                </div>
                <div className="text-[11px] font-mono tracking-[0.18em] text-slate-400 uppercase mt-1">
                  {meta.desc}
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
