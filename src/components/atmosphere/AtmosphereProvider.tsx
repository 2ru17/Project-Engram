"use client";

import { useTheme } from "@/components/ThemeProvider";
import { InkGrainOverlay } from "./InkGrainOverlay";
import { ScreenVignette } from "./ScreenVignette";
import { ToriiPillarBorders } from "./ToriiPillarBorders";
import { ZenCanvas } from "./ZenCanvas";
import { NeoBrutalismAtmosphere } from "./NeoBrutalismAtmosphere";
import { MinimalismAtmosphere } from "./MinimalismAtmosphere";
import { ParallaxAtmosphere } from "./ParallaxAtmosphere";
import { BrokenGridAtmosphere } from "./BrokenGridAtmosphere";
import { WarpJumpOverlay } from "@/components/WarpJumpOverlay";

export function AtmosphereProvider() {
  const { isLite, universe } = useTheme();

  return (
    <>
      <WarpJumpOverlay />
      <InkGrainOverlay />

      {/* U-01 CYBER-ZEN */}
      {universe === "cyber-zen" && (
        <>
          <ScreenVignette />
          <ToriiPillarBorders />
          <ZenCanvas isLite={isLite} />
        </>
      )}

      {/* U-02 NEO-BRUTALISM */}
      {universe === "neo-brutalism" && <NeoBrutalismAtmosphere />}

      {/* U-03 MINIMALISM */}
      {universe === "minimalism" && <MinimalismAtmosphere />}

      {/* U-04 PARALLAX */}
      {universe === "parallax" && <ParallaxAtmosphere isLite={isLite} />}

      {/* U-05 BROKEN-GRID */}
      {universe === "broken-grid" && <BrokenGridAtmosphere />}
    </>
  );
}
