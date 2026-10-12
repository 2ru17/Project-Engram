"use client";

import { useEffect, useRef } from "react";

interface ZenCanvasProps {
  isLite?: boolean;
}

export function ZenCanvas({ isLite = false }: ZenCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (isLite) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // 1. Rising spirit Qi motes
    const motes = Array.from({ length: 36 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.8 + Math.random() * 1.8,
      vy: -0.25 - Math.random() * 0.35,
      vx: (Math.random() - 0.5) * 0.2,
      alpha: 0.15 + Math.random() * 0.35,
    }));

    // 2. Tumbling Japanese bamboo leaves
    const leaves = Array.from({ length: 22 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      len: 16 + Math.random() * 18,
      wid: 3.2 + Math.random() * 3.2,
      vx: 0.35 + Math.random() * 0.65,
      vy: 0.45 + Math.random() * 0.8,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.018,
      flip: Math.random() * Math.PI,
      flipSpeed: 0.018 + Math.random() * 0.025,
      alpha: 0.2 + Math.random() * 0.4,
    }));

    // 3. Sumi-e ink trace cursor trail
    const inkTrail: { x: number; y: number; life: number }[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      inkTrail.push({ x: e.clientX, y: e.clientY, life: 1.0 });
      if (inkTrail.length > 22) inkTrail.shift();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      const isLight = document.documentElement.getAttribute("data-theme") === "light";

      // Render Qi motes
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        if (m.y < -10) {
          m.y = h + 10;
          m.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? `rgba(2, 132, 199, ${m.alpha * 0.4})`
          : `rgba(0, 229, 255, ${m.alpha * 0.55})`;
        ctx.fill();
      }

      // Render bamboo leaves
      for (const leaf of leaves) {
        leaf.x += leaf.vx;
        leaf.y += leaf.vy;
        leaf.angle += leaf.spin;
        leaf.flip += leaf.flipSpeed;
        if (leaf.y > h + 30) {
          leaf.y = -30;
          leaf.x = Math.random() * w;
        }
        if (leaf.x > w + 30) {
          leaf.x = -30;
        }

        const apparentWidth = Math.max(0.6, Math.abs(Math.cos(leaf.flip)) * leaf.wid);
        ctx.save();
        ctx.translate(leaf.x, leaf.y);
        ctx.rotate(leaf.angle);
        ctx.globalAlpha = leaf.alpha;
        ctx.fillStyle = isLight ? "#D5CCC0" : "#081424";
        ctx.strokeStyle = isLight ? "#A8A29E" : "#1e304d";
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(-leaf.len / 2, 0);
        ctx.quadraticCurveTo(0, -apparentWidth, leaf.len / 2, 0);
        ctx.quadraticCurveTo(0, apparentWidth, -leaf.len / 2, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Central leaf vein
        ctx.beginPath();
        ctx.moveTo(-leaf.len / 2, 0);
        ctx.lineTo(leaf.len / 2, 0);
        ctx.strokeStyle = isLight ? "rgba(2, 132, 199, 0.25)" : "rgba(0, 229, 255, 0.22)";
        ctx.lineWidth = 0.4;
        ctx.stroke();
        ctx.restore();
      }

      // Render Sumi ink trace cursor
      if (inkTrail.length > 1) {
        for (let i = 1; i < inkTrail.length; i++) {
          const p0 = inkTrail[i - 1];
          const p1 = inkTrail[i];
          p1.life -= 0.04;
          if (p1.life > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.strokeStyle = isLight
              ? `rgba(2, 132, 199, ${p1.life * 0.55})`
              : `rgba(0, 229, 255, ${p1.life * 0.65})`;
            ctx.lineWidth = p1.life * 2.8;
            ctx.lineCap = "round";
            ctx.stroke();
            ctx.restore();
          }
        }
        while (inkTrail.length && inkTrail[0].life <= 0) {
          inkTrail.shift();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [isLite]);

  if (isLite) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[25] h-full w-full"
      aria-hidden="true"
    />
  );
}
