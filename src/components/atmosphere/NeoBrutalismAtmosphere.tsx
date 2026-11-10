"use client";

export function NeoBrutalismAtmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Industrial Dot Matrix */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: "radial-gradient(#0A0A0A 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Corner Registration Crosshairs */}
      <div className="absolute top-4 left-4 font-mono text-[10px] font-bold text-[#0A0A0A] tracking-wider opacity-60">
        [+ 00.00]
      </div>
      <div className="absolute top-4 right-4 font-mono text-[10px] font-bold text-[#0A0A0A] tracking-wider opacity-60">
        [+ 100.00]
      </div>
      <div className="absolute bottom-4 left-4 font-mono text-[9px] font-bold text-[#0A0A0A] tracking-widest uppercase opacity-50">
        SPEC // SWISS INDUSTRIAL PRINT
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[9px] font-bold text-[#C5221F] tracking-widest uppercase opacity-90">
        BAUHAUS_VER: 2.0
      </div>
    </div>
  );
}
