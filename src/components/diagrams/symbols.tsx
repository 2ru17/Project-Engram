"use client";

import type { ElementType, LedColor } from "@/lib/diagram-registry";

export interface SymbolProps {
  type: ElementType;
  /** Behavior state token: closed, open, reversed, forward, reverse, high, low, ... */
  state?: string;
  /** LED brightness in 0..1. */
  brightness?: number;
  color?: LedColor;
  variable?: boolean;
  text?: string;
  w?: number;
  h?: number;
  selected?: boolean;
}

const LED_FILL: Record<LedColor, string> = {
  red: "#ef4444",
  green: "#22c55e",
  orange: "#f97316",
  amber: "#f59e0b",
};

const BODY = "var(--zen-frost)";

/** Draws one schematic symbol in local coordinates (origin at the element center, unrotated). */
export function Symbol({ type, state, brightness = 0, color = "red", variable, text, w = 100, h = 60, selected }: SymbolProps) {
  const stroke = selected ? "var(--zen-cyan)" : BODY;
  const common = { fill: "none", stroke, strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

  switch (type) {
    case "resistor":
      return (
        <g {...common}>
          <path d="M-30,0 L-18,0 L-14,-7 L-7,7 L0,-7 L7,7 L14,-7 L18,0 L30,0" />
          {variable && <path d="M-16,12 L16,-12 M16,-12 L8,-11 M16,-12 L13,-4" />}
        </g>
      );
    case "pot":
      return (
        <g {...common}>
          <path d="M-30,0 L-18,0 L-14,-7 L-7,7 L0,-7 L7,7 L14,-7 L18,0 L30,0" />
          <path d="M0,-26 L0,-9 M0,-9 L-4,-15 M0,-9 L4,-15" />
        </g>
      );
    case "capacitor":
      return (
        <g {...common}>
          <path d="M-30,0 L-4,0 M4,0 L30,0" />
          <path d="M-4,-13 L-4,13" />
          <path d="M8,-13 Q3,0 8,13" />
          <path d="M-14,-12 L-8,-12 M-11,-15 L-11,-9" strokeWidth={1.2} />
        </g>
      );
    case "led":
    case "diode": {
      const flip = state === "reversed";
      const lit = type === "led" && brightness > 0;
      const fill = LED_FILL[color];
      return (
        <g transform={flip ? "scale(-1,1)" : undefined}>
          {lit && <circle cx={0} cy={0} r={24} fill={fill} opacity={0.12 + 0.5 * brightness} />}
          <g {...common}>
            <path d="M-30,0 L-10,0 M10,0 L30,0" />
            <path
              d="M-10,-11 L10,0 L-10,11 Z"
              fill={lit ? fill : "none"}
              fillOpacity={lit ? 0.3 + 0.7 * brightness : 0}
            />
            <path d="M10,-11 L10,11" />
            {type === "led" && <path d="M0,-14 L8,-22 M5,-22 L8,-22 L8,-19 M7,-10 L15,-18 M12,-18 L15,-18 L15,-15" strokeWidth={1.2} />}
          </g>
        </g>
      );
    }
    case "switch": {
      const closed = state === "closed";
      return (
        <g {...common}>
          <path d="M-30,0 L-10,0 M10,0 L30,0" />
          <path d={closed ? "M-10,0 L10,0" : "M-10,0 L8,-13"} />
          <circle cx={-10} cy={0} r={2.2} fill={stroke} />
          <circle cx={10} cy={0} r={2.2} fill={stroke} />
        </g>
      );
    }
    case "fuse":
      return (
        <g {...common}>
          <path d="M-30,0 L-16,0 M16,0 L30,0" />
          <rect x={-16} y={-7} width={32} height={14} />
          <path d="M-16,0 L16,0" />
        </g>
      );
    case "meter":
      return (
        <g {...common}>
          <path d="M-30,0 L-18,0 M18,0 L30,0" />
          <circle cx={0} cy={0} r={18} fill="var(--zen-void)" />
          <text x={0} y={5} textAnchor="middle" fontSize="15" fontWeight="bold" fill={stroke} stroke="none" fontFamily="var(--font-mono-code, monospace)">
            {text}
          </text>
        </g>
      );
    case "battery":
      return (
        <g {...common}>
          <path d="M0,-30 L0,-6 M0,2 L0,30" />
          <path d="M-13,-6 L13,-6" strokeWidth={2.6} />
          <path d="M-7,2 L7,2" />
          <path d="M-22,-12 L-16,-12 M-19,-15 L-19,-9" strokeWidth={1.2} />
        </g>
      );
    case "supply":
      return <circle cx={0} cy={0} r={3.5} fill="var(--zen-void)" stroke={stroke} strokeWidth={1.8} />;
    case "ground":
      return <path d="M0,0 V8 M-12,8 H12 M-8,13 H8 M-4,18 H4" {...common} />;
    case "npn":
      return (
        <g {...common}>
          <circle cx={4} cy={0} r={24} strokeWidth={1.2} opacity={0.5} />
          <path d="M-30,0 L-6,0 M-6,-14 L-6,14" />
          <path d="M-6,-6 L18,-30" />
          <path d="M-6,6 L18,30" />
          <path d="M12,24 L18,30 L9,29" fill={stroke} />
        </g>
      );
    case "comparator": {
      const hi = state === "high";
      return (
        <g {...common}>
          <path d="M-34,-14 L-26,-14 M-34,14 L-26,14 M30,0 L34,0" />
          <path d="M-26,-28 L30,0 L-26,28 Z" fill={hi ? "var(--zen-cyan)" : "none"} fillOpacity={hi ? 0.18 : 0} />
          <text x={-22} y={-10} fontSize="11" fill={stroke} stroke="none" fontFamily="monospace">+</text>
          <text x={-22} y={18} fontSize="11" fill={stroke} stroke="none" fontFamily="monospace">-</text>
        </g>
      );
    }
    case "transformer":
      return (
        <g {...common}>
          <path d="M-30,-20 H-14 A5,5 0 0 1 -14,-10 A5,5 0 0 1 -14,0 A5,5 0 0 1 -14,10 A5,5 0 0 1 -14,20 H-30" />
          <path d="M30,-20 H14 A5,5 0 0 0 14,-10 A5,5 0 0 0 14,0 A5,5 0 0 0 14,10 A5,5 0 0 0 14,20 H30" />
          <path d="M-3,-22 V22 M3,-22 V22" />
        </g>
      );
    case "bridge":
      return (
        <g {...common}>
          <path d="M-30,0 L-26,0 M26,0 L30,0 M0,-26 L0,-30 M0,26 L0,30" />
          <path d="M0,-26 L26,0 L0,26 L-26,0 Z" />
        </g>
      );
    case "box":
      return (
        <g {...common}>
          <rect x={-w / 2} y={-h / 2} width={w} height={h} fill="var(--zen-void)" />
          <text x={0} y={4} textAnchor="middle" fontSize="11" fill={stroke} stroke="none" fontFamily="var(--font-mono-code, monospace)">
            {text}
          </text>
        </g>
      );
    case "header": {
      const labels = ["GPIO1", "GPIO2", "GPIO3", "GND"];
      return (
        <g {...common}>
          <rect x={-w / 2} y={-h / 2} width={w} height={h} fill="var(--zen-void)" />
          {labels.map((l, i) => (
            <g key={l}>
              <circle cx={26} cy={-60 + i * 40} r={3.5} fill={stroke} />
              <text x={18} y={-56 + i * 40} textAnchor="end" fontSize="9" fill={stroke} stroke="none" fontFamily="monospace">
                {l}
              </text>
            </g>
          ))}
        </g>
      );
    }
    case "pn": {
      const half = state === "reverse" ? 22 : 6;
      return (
        <g {...common}>
          <path d="M-70,0 L-50,0 M50,0 L70,0" />
          <rect x={-50} y={-22} width={50 - half} height={44} fill="var(--zen-void)" />
          <rect x={half} y={-22} width={50 - half} height={44} fill="var(--zen-void)" />
          <rect x={-half} y={-22} width={2 * half} height={44} fill="var(--zen-amber)" fillOpacity={0.25} strokeDasharray="3 3" />
          <text x={-50 + (50 - half) / 2} y={5} textAnchor="middle" fontSize="13" fill={stroke} stroke="none" fontFamily="monospace">p</text>
          <text x={half + (50 - half) / 2} y={5} textAnchor="middle" fontSize="13" fill={stroke} stroke="none" fontFamily="monospace">n</text>
        </g>
      );
    }
    case "junction":
      return <circle cx={0} cy={0} r={3.2} fill={stroke} />;
  }
}
