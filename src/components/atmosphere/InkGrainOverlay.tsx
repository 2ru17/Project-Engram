export function InkGrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-overlay"
      style={{
        backgroundImage: `
          radial-gradient(var(--zen-steel) 0.75px, transparent 0.75px),
          radial-gradient(var(--zen-slate-edge) 0.75px, transparent 0.75px)
        `,
        backgroundSize: "24px 24px",
        backgroundPosition: "0 0, 12px 12px",
      }}
      aria-hidden="true"
    />
  );
}
