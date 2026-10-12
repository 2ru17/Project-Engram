"use client";

import { motion, useScroll } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 right-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-transparent via-[#00E5FF] to-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.9),0_0_4px_#ffffff]"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}
