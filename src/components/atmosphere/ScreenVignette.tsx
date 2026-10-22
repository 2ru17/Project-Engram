export function ScreenVignette() {
  return (
    <div
      className="screen-vignette pointer-events-none fixed inset-0 z-40 transition-shadow duration-700 print:hidden"
      aria-hidden="true"
    />
  );
}
