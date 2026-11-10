"use client";

export function MinimalismAtmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Swiss Hairline Edge Margins */}
      <div className="absolute top-0 bottom-0 left-6 w-px bg-[#18181B]/8 hidden sm:block" />
      <div className="absolute top-0 bottom-0 right-6 w-px bg-[#18181B]/8 hidden sm:block" />

      {/* Subtle Millimeter Calibrations along Left Margin */}
      <div className="absolute top-1/4 left-6 flex flex-col gap-8 opacity-30 hidden sm:flex">
        {[0, 1, 2, 3, 4].map((tick) => (
          <div key={tick} className="flex items-center gap-1.5 -ml-1">
            <div className="w-2 h-px bg-[#18181B]" />
            <span className="font-mono text-[7px] text-[#18181B] tracking-tighter">
              {tick * 25}
            </span>
          </div>
        ))}
      </div>

      {/* Subtle Editorial Top Right Origin Stamp */}
      <div className="absolute top-5 right-8 font-mono text-[8px] text-[#18181B]/40 tracking-[0.25em] uppercase hidden md:block">
        EDITORIAL GRID // CALM MONOCHROME
      </div>
    </div>
  );
}
