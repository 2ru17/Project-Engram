export function ToriiPillarBorders() {
  const borderSVG = (
    <svg viewBox="0 0 40 800" fill="none" className="h-full w-full">
      <line
        x1="20"
        y1="0"
        x2="20"
        y2="800"
        stroke="var(--zen-slate-edge)"
        strokeWidth="1"
        strokeDasharray="10 5"
      />
      <polygon
        points="20,80 32,92 20,104 8,92"
        fill="var(--zen-void)"
        stroke="var(--zen-steel)"
        strokeWidth="1.2"
      />
      <polygon
        points="20,400 34,414 20,428 6,414"
        fill="var(--zen-card)"
        stroke="var(--zen-cyan)"
        strokeWidth="1.4"
      />
      <polygon
        points="20,720 32,732 20,744 8,732"
        fill="var(--zen-void)"
        stroke="var(--zen-steel)"
        strokeWidth="1.2"
      />
    </svg>
  );

  return (
    <>
      <div
        className="pointer-events-none fixed bottom-0 left-[10px] top-0 z-[35] hidden w-10 flex-col items-center justify-between py-8 opacity-40 lg:flex"
        aria-hidden="true"
      >
        {borderSVG}
      </div>
      <div
        className="pointer-events-none fixed bottom-0 right-[10px] top-0 z-[35] hidden w-10 -scale-x-100 flex-col items-center justify-between py-8 opacity-40 lg:flex"
        aria-hidden="true"
      >
        {borderSVG}
      </div>
    </>
  );
}
