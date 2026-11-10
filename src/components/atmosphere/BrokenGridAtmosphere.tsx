"use client";

export function BrokenGridAtmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Architectural Drafting Minor & Major Grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(14, 30, 56, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(14, 30, 56, 0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(14, 30, 56, 0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(14, 30, 56, 0.16) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />

      {/* Top Margin Architectural Dimension Calibration */}
      <div className="absolute top-0 left-0 right-0 h-4 border-b border-[#0E1E38]/20 flex items-center justify-between px-6 font-mono text-[8px] text-[#0E1E38]/40 tracking-wider">
        <span>|--- 000 ---|</span>
        <span className="hidden md:inline">|--- 240 ---|</span>
        <span className="hidden lg:inline">|--- 480 ---|</span>
        <span className="hidden md:inline">|--- 720 ---|</span>
        <span>|--- 960 ---|</span>
      </div>

      {/* CAD Registration Crosshairs at Corners */}
      <div className="absolute top-6 left-6 font-mono text-xs text-[#0D5C3A] font-bold">+</div>
      <div className="absolute top-6 right-6 font-mono text-xs text-[#0D5C3A] font-bold">+</div>
      <div className="absolute bottom-6 left-6 font-mono text-xs text-[#0D5C3A] font-bold">+</div>
      <div className="absolute bottom-6 right-6 font-mono text-xs text-[#0D5C3A] font-bold">+</div>

      {/* Architectural Drafting Title Block */}
      <div className="absolute top-7 left-10 font-mono text-[9px] text-[#0D5C3A] tracking-widest uppercase font-semibold hidden sm:block">
        [ CAD DATUM // X: 000.00 Y: 000.00 ]
      </div>
      <div className="absolute top-7 right-10 font-mono text-[9px] text-[#0E1E38]/70 tracking-widest uppercase font-semibold hidden sm:block">
        SPEC // ISO-216 ARCH-A
      </div>

      <div className="absolute bottom-6 left-10 font-mono text-[8px] text-[#0E1E38]/60 tracking-[0.2em] uppercase">
        ARCHITECTURAL DRAFTING // PROJECT ENGRAM
      </div>
      <div className="absolute bottom-6 right-10 font-mono text-[8px] text-[#0D5C3A] tracking-[0.2em] uppercase font-bold">
        GRID STATUS // ASYMMETRIC UNBOUND
      </div>
    </div>
  );
}
