"use client";

import { useEffect, useState } from "react";
import { InkGrainOverlay } from "./InkGrainOverlay";
import { ScreenVignette } from "./ScreenVignette";
import { ToriiPillarBorders } from "./ToriiPillarBorders";
import { ZenCanvas } from "./ZenCanvas";

export function AtmosphereProvider() {
  const [isLite, setIsLite] = useState(false);

  useEffect(() => {
    const updatePerf = () => {
      const perf = document.documentElement.getAttribute("data-perf");
      setIsLite(perf === "lite");
    };

    updatePerf();

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "data-perf") {
          updatePerf();
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <InkGrainOverlay />
      <ScreenVignette />
      <ToriiPillarBorders />
      <ZenCanvas isLite={isLite} />
    </>
  );
}
