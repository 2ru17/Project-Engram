"use client";

import { motion, AnimatePresence } from "motion/react";
import { useTheme, UNIVERSE_REGISTRY } from "@/components/ThemeProvider";

export function WarpJumpOverlay() {
  const { isTransitioning, targetUniverse, universe, isLite } = useTheme();
  const activeTarget = targetUniverse || universe;
  const meta = UNIVERSE_REGISTRY[activeTarget] || UNIVERSE_REGISTRY["cyber-zen"];

  const getBackdropColor = () => {
    switch (activeTarget) {
      case "neo-brutalism":
        return "#F4F3EE";
      case "minimalism":
        return "#FAF8F5";
      case "broken-grid":
        return "#0A1628";
      case "parallax":
        return "#040810";
      default:
        return "#000000";
    }
  };

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
            /* Lite Mode: Instant Crossfade */
            <div
              className="absolute inset-0"
              style={{ backgroundColor: getBackdropColor() }}
            />
          ) : (
            <>
              {/* Universal Theme Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.98, 0.98, 0] }}
                transition={{
                  duration: 1.1,
                  times: [0, 0.28, 0.72, 1],
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0"
                style={{ backgroundColor: getBackdropColor() }}
              />

              {/* ─── U-01 CYBER-ZEN: KATANA / SHOJI PARTING SLASH ─── */}
              {activeTarget === "cyber-zen" && (
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: ["-100%", "0%", "0%", "-100%"] }}
                    transition={{
                      duration: 1.1,
                      times: [0, 0.3, 0.7, 1],
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#02050A] border-r border-[#00E5FF]/40 shadow-[0_0_50px_rgba(0,229,255,0.3)]"
                  />
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: ["100%", "0%", "0%", "100%"] }}
                    transition={{
                      duration: 1.1,
                      times: [0, 0.3, 0.7, 1],
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute top-0 bottom-0 right-0 w-1/2 bg-[#02050A] border-l border-[#00E5FF]/40 shadow-[0_0_50px_rgba(0,229,255,0.3)]"
                  />
                  {/* Cyan Katana Slash Line */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{
                      scaleX: [0, 1.4, 1.4, 0],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 1.05,
                      times: [0, 0.32, 0.68, 1],
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute h-0.5 w-full bg-[#00E5FF] shadow-[0_0_24px_#00E5FF]"
                  />
                </div>
              )}

              {/* ─── U-02 NEO-BRUTALISM: INDUSTRIAL SHUTTER & BAUHAUS STRIPES ─── */}
              {activeTarget === "neo-brutalism" && (
                <div className="absolute inset-0 flex flex-col justify-between overflow-hidden">
                  <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: ["-100%", "0%", "0%", "-100%"] }}
                    transition={{
                      duration: 1.05,
                      times: [0, 0.28, 0.72, 1],
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="h-1/2 w-full bg-[#C5221F] border-b-4 border-[#0A0A0A] flex items-center justify-center"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, #C5221F, #C5221F 20px, #0A0A0A 20px, #0A0A0A 40px)",
                    }}
                  />
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: ["100%", "0%", "0%", "100%"] }}
                    transition={{
                      duration: 1.05,
                      times: [0, 0.28, 0.72, 1],
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="h-1/2 w-full bg-[#C5221F] border-t-4 border-[#0A0A0A]"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(-45deg, #C5221F, #C5221F 20px, #0A0A0A 20px, #0A0A0A 40px)",
                    }}
                  />
                </div>
              )}

              {/* ─── U-03 MINIMALISM: SWISS EDITORIAL HAIRLINE CURTAIN ─── */}
              {activeTarget === "minimalism" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: [0, 1, 1, 0] }}
                    transition={{
                      duration: 1.08,
                      times: [0, 0.3, 0.7, 1],
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute inset-0 bg-[#FAF8F5] border-y border-[#18181B]/20"
                  />
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{
                      scale: [0.5, 1, 1, 1.2],
                      opacity: [0, 0.85, 0.85, 0],
                    }}
                    transition={{
                      duration: 1.0,
                      times: [0, 0.32, 0.68, 1],
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="w-48 h-48 rounded-full border border-[#18181B]/30 flex items-center justify-center"
                  >
                    <div className="w-24 h-24 rounded-full border border-[#18181B]/20" />
                    <div className="absolute w-56 h-px bg-[#18181B]/40" />
                    <div className="absolute h-56 w-px bg-[#18181B]/40" />
                  </motion.div>
                </div>
              )}

              {/* ─── U-04 PARALLAX: TOPOGRAPHIC ELEVATION PULSE ─── */}
              {activeTarget === "parallax" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {[280, 420, 560].map((dim, idx) => (
                    <motion.div
                      key={`contour-${dim}`}
                      initial={{ scale: 0.2, opacity: 0 }}
                      animate={{
                        scale: [0.2, 1 + idx * 0.2, 1 + idx * 0.2, 2.2],
                        opacity: [0, 0.65 - idx * 0.15, 0.65 - idx * 0.15, 0],
                      }}
                      transition={{
                        duration: 1.1,
                        times: [0, 0.35, 0.65, 1],
                        delay: idx * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="absolute rounded-full border"
                      style={{
                        width: `${dim}px`,
                        height: `${dim}px`,
                        borderColor: idx % 2 === 0 ? "#C4B5FD" : "#8B5CF6",
                        boxShadow: `0 0 30px ${idx % 2 === 0 ? "#C4B5FD33" : "#8B5CF633"}`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* ─── U-05 BROKEN-GRID: ARCHITECTURAL BLUEPRINT GRID SNAP ─── */}
              {activeTarget === "broken-grid" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Grid Crosshairs */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: [0, 1, 1, 0] }}
                    transition={{
                      duration: 1.05,
                      times: [0, 0.28, 0.72, 1],
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute w-full h-px bg-[#0D5C3A]/70 shadow-[0_0_12px_#0D5C3A]"
                  />
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: [0, 1, 1, 0] }}
                    transition={{
                      duration: 1.05,
                      times: [0, 0.28, 0.72, 1],
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="absolute h-full w-px bg-[#0D5C3A]/70 shadow-[0_0_12px_#0D5C3A]"
                  />
                  {/* Corner CAD Registration Brackets */}
                  <motion.div
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{
                      scale: [0.4, 1, 1, 1.4],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 1.05,
                      times: [0, 0.3, 0.7, 1],
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative w-80 h-80 border border-dashed border-[#0D5C3A]/50"
                  >
                    <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#0D5C3A]" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#0D5C3A]" />
                    <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#0D5C3A]" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#0D5C3A]" />
                  </motion.div>
                </div>
              )}

              {/* Central Telemetry Stamp per Universe */}
              <motion.div
                initial={{ opacity: 0, scale: 0.86, y: 8 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.86, 1, 1.02, 1.06],
                  y: [8, 0, 0, -6],
                }}
                transition={{
                  duration: 1.05,
                  times: [0, 0.32, 0.72, 1],
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative z-10 px-8 py-5 text-center ${
                  activeTarget === "neo-brutalism"
                    ? "bg-[#FFFFFF] border-4 border-[#0A0A0A] shadow-[8px_8px_0px_#0A0A0A]"
                    : activeTarget === "minimalism"
                    ? "bg-[#FFFFFF] border border-[#18181B]/30 shadow-sm"
                    : activeTarget === "broken-grid"
                    ? "bg-[#ECE8E1] border-2 border-[#11281F] shadow-[6px_6px_0px_#0D5C3A]"
                    : activeTarget === "parallax"
                    ? "bg-[#120A24] border border-[#8B5CF6]/60 shadow-[0_0_35px_rgba(139,92,246,0.25)]"
                    : "bg-[#080D17] border border-[#00E5FF]/60 shadow-[0_0_35px_rgba(0,229,255,0.25)]"
                }`}
              >
                <div
                  className="text-[10px] font-mono tracking-[0.35em] uppercase mb-1.5"
                  style={{
                    color:
                      activeTarget === "neo-brutalism"
                        ? "#0A0A0A"
                        : activeTarget === "minimalism"
                        ? "#18181B"
                        : meta.accentHex,
                  }}
                >
                  [ TRANSIT LOCK // {meta.code} ]
                </div>
                <div
                  className="text-xl sm:text-2xl font-mono font-bold tracking-[0.24em] uppercase"
                  style={{
                    color:
                      activeTarget === "neo-brutalism" || activeTarget === "minimalism"
                        ? "#0A0A0A"
                        : "#FFFFFF",
                  }}
                >
                  {meta.label}
                </div>
                <div
                  className="text-[11px] font-mono tracking-[0.18em] uppercase mt-1"
                  style={{
                    color:
                      activeTarget === "neo-brutalism" || activeTarget === "minimalism"
                        ? "#666666"
                        : "#94A3B8",
                  }}
                >
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
