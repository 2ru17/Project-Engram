"use client";

import { motion, useScroll } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 right-0 z-[100] h-[2px] origin-left bg-[var(--zen-cyan)]"
      style={{
        scaleX: scrollYProgress,
        boxShadow: "var(--universe-progress-glow, none)",
      }}
      aria-hidden="true"
    />
  );
}
