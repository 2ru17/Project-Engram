export function ScreenVignette() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 transition-shadow duration-700"
      style={{
        boxShadow: "inset 0 0 180px 70px var(--zen-vignette, rgba(0, 0, 0, 0.95))",
      }}
      aria-hidden="true"
    />
  );
}
