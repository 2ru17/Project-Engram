"use client";

export function ParallaxAtmosphere({ isLite }: { isLite: boolean }) {
  if (isLite) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Deep Nebula Horizon Glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.22) 0%, transparent 60%), radial-gradient(circle at 50% 100%, rgba(167, 139, 250, 0.15) 0%, transparent 50%)",
        }}
      />
      {/* Topographic Altitude Contour Wave Lines */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-radial-gradient(circle at 50% 120%, transparent 0, transparent 48px, rgba(139, 92, 246, 0.12) 49px, transparent 50px)",
        }}
      />
      {/* Horizon Elevation Telemetry */}
      <div className="absolute top-5 right-8 font-mono text-[9px] text-[#A78BFA]/80 tracking-[0.25em] uppercase hidden md:block">
        ELEVATION CONTOUR: 4,810M // HORIZON Z-AXIS
      </div>
    </div>
  );
}
