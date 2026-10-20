"use client";

import { useTheme } from "@/components/ThemeProvider";
import { InkGrainOverlay } from "./InkGrainOverlay";
import { ScreenVignette } from "./ScreenVignette";
import { ToriiPillarBorders } from "./ToriiPillarBorders";
import { ZenCanvas } from "./ZenCanvas";
import { WarpJumpOverlay } from "@/components/WarpJumpOverlay";

export function AtmosphereProvider() {
  const { isLite, universe } = useTheme();

  return (
    <>
      <WarpJumpOverlay />
      <InkGrainOverlay />
      {universe === "cyber-zen" && (
        <>
          <ScreenVignette />
          <ToriiPillarBorders />
          <ZenCanvas isLite={isLite} />
        </>
      )}
      {universe === "broken-grid" && (
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-35"
          aria-hidden="true"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent calc(25% - 1px), rgba(17, 17, 17, 0.12) calc(25% - 1px), rgba(17, 17, 17, 0.12) 25%)",
          }}
        />
      )}
      {universe === "parallax" && !isLite && (
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-25"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 0%, rgba(229, 169, 60, 0.16) 0%, transparent 55%), repeating-radial-gradient(circle at 50% 110%, transparent 0, transparent 48px, rgba(229, 169, 60, 0.05) 49px, transparent 50px)",
          }}
        />
      )}
      {universe === "neo-brutalism" && (
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-30"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(rgba(10, 10, 10, 0.18) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      )}
    </>
  );
}
