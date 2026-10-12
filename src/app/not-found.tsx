"use client";

import Link from "next/link";
import { motion } from "motion/react";

const STARS = [
  { x: "15%", y: "20%", size: 2 }, { x: "72%", y: "8%", size: 3 },
  { x: "88%", y: "45%", size: 2 }, { x: "30%", y: "70%", size: 4 },
  { x: "55%", y: "85%", size: 2 }, { x: "10%", y: "55%", size: 3 },
  { x: "92%", y: "72%", size: 2 }, { x: "45%", y: "12%", size: 3 },
  { x: "68%", y: "60%", size: 2 }, { x: "20%", y: "38%", size: 4 },
  { x: "80%", y: "25%", size: 2 }, { x: "38%", y: "90%", size: 3 },
];

export default function NotFound() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center bg-[var(--zen-void)] text-[var(--zen-snow)] selection:bg-[var(--zen-cyan)] selection:text-[var(--zen-void)]">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes glitch {
          0%, 95%, 100% { text-shadow: 0 0 0 transparent; clip-path: none; }
          96% { text-shadow: 3px 0 #00E5FF, -3px 0 #E63946; clip-path: inset(10% 0 80% 0); }
          97% { text-shadow: -3px 0 #00E5FF, 3px 0 #E63946; clip-path: inset(60% 0 20% 0); }
          98% { text-shadow: 1px 0 #00E5FF; clip-path: none; }
        }
        .glitch-404 { animation: glitch 4s steps(1) infinite; }
      `}} />

      {/* Static Star Field */}
      {STARS.map((star, i) => (
        <div 
          key={i} 
          className="absolute rounded-full bg-[var(--zen-cyan)] shadow-[0_0_8px_rgba(0,229,255,0.7)]"
          style={{ 
            left: star.x, 
            top: star.y, 
            width: star.size, 
            height: star.size,
            opacity: 0.25 + (i % 3) * 0.2
          }}
          aria-hidden="true"
        />
      ))}

      {/* Rotating Vector Astrolabe Background */}
      <div 
        className="pointer-events-none absolute w-[480px] h-[480px] opacity-15 animate-spin"
        style={{ animationDuration: "120s" }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
          <circle cx="200" cy="200" r="190" stroke="var(--zen-slate-edge)" strokeWidth="1" strokeDasharray="8 6" />
          <circle cx="200" cy="200" r="140" stroke="var(--zen-steel)" strokeWidth="0.75" />
          <polygon points="200,10 390,200 200,390 10,200" stroke="var(--zen-cyan)" strokeWidth="0.8" opacity="0.6" />
          <polygon points="65,65 335,65 335,335 65,335" stroke="var(--zen-slate-deep)" strokeWidth="1" />
        </svg>
      </div>

      {/* Background Japanese Watermark */}
      <span
        className="pointer-events-none absolute text-9xl sm:text-[14rem] text-[var(--zen-snow)] opacity-[0.03] select-none leading-none z-0"
        style={{ fontFamily: "var(--font-zen-brush, serif)" }}
        aria-hidden="true"
      >
        迷
      </span>
      
      <motion.div 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 text-center flex flex-col items-center px-6"
      >
        <div className="w-12 h-12 rounded-full border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/10 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,229,255,0.25)]">
          <span className="text-[var(--zen-cyan)] text-xl">◇</span>
        </div>

        <h1 
          className="text-4xl sm:text-6xl font-semibold tracking-[0.25em] text-[var(--zen-cyan)] uppercase mb-3 drop-shadow-[0_0_15px_rgba(0,229,255,0.3)] glitch-404"
          style={{ fontFamily: "var(--font-zen-display, serif)" }}
        >
          404 // NOT FOUND
        </h1>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[var(--zen-cyan)]/40 to-transparent my-4" />

        <p className="text-[var(--zen-ink-muted)] font-mono tracking-widest text-xs sm:text-sm uppercase mb-10 max-w-md">
          The requested record is unindexed or has dissolved into the archival void.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link 
            href="/notes" 
            className="px-6 py-3 border border-[var(--zen-cyan)]/60 bg-[var(--zen-cyan)]/10 hover:bg-[var(--zen-cyan)] hover:text-[var(--zen-void)] text-xs font-mono tracking-widest text-[var(--zen-cyan)] rounded transition-all shadow-[0_0_15px_rgba(0,229,255,0.15)] font-semibold"
          >
            OPEN ARCHIVE INDEX →
          </Link>

          <Link 
            href="/" 
            className="px-6 py-3 border border-[var(--zen-border)] bg-[var(--zen-card)] hover:border-[var(--zen-cyan)] text-xs font-mono tracking-widest text-[var(--zen-snow)] hover:text-[var(--zen-cyan)] rounded transition-all shadow-md"
          >
            ← RETURN TO HOME
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
