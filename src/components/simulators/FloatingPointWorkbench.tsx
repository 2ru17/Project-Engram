"use client";

import { useState, useId } from "react";

type PrecisionMode = "single" | "double";

export function FloatingPointWorkbench() {
  const numberInputId = useId();
  const [precision, setPrecision] = useState<PrecisionMode>("single");
  const [inputValue, setInputValue] = useState<string>("3.1415927");
  const [bits32, setBits32] = useState<number[]>(() => {
    const buf = new ArrayBuffer(4);
    const view = new DataView(buf);
    view.setFloat32(0, 3.1415927);
    const uint = view.getUint32(0);
    const bits: number[] = [];
    for (let i = 31; i >= 0; i--) {
      bits.push((uint >>> i) & 1);
    }
    return bits;
  });

  const parseToBits = (valStr: string) => {
    const num = Number(valStr);
    const buf = new ArrayBuffer(4);
    const view = new DataView(buf);
    view.setFloat32(0, num);
    const uint = view.getUint32(0);
    const newBits: number[] = [];
    for (let i = 31; i >= 0; i--) {
      newBits.push((uint >>> i) & 1);
    }
    setBits32(newBits);
  };

  const handleInputChange = (val: string) => {
    setInputValue(val);
    parseToBits(val);
  };

  const toggleBit = (idx: number) => {
    const updated = [...bits32];
    updated[idx] = updated[idx] === 1 ? 0 : 1;
    setBits32(updated);

    // Reconstruct decimal string
    let uint = 0;
    for (let i = 0; i < 32; i++) {
      if (updated[i] === 1) {
        uint |= 1 << (31 - i);
      }
    }
    const buf = new ArrayBuffer(4);
    const view = new DataView(buf);
    view.setUint32(0, uint);
    const fVal = view.getFloat32(0);
    setInputValue(String(fVal));
  };

  const setPreset = (name: string, val: number) => {
    setInputValue(String(val));
    parseToBits(String(val));
  };

  // Decompose single precision bits
  const signBit = bits32[0];
  const exponentBits = bits32.slice(1, 9);
  const mantissaBits = bits32.slice(9, 32);

  const rawExponent = exponentBits.reduce((acc, bit, idx) => acc + bit * Math.pow(2, 7 - idx), 0);
  const bias = 127;
  const isZeroExponent = rawExponent === 0;
  const isMaxExponent = rawExponent === 255;
  const isMantissaZero = mantissaBits.every((b) => b === 0);

  let classification = "Normalized";
  let effectiveExponent = rawExponent - bias;
  let fractionValue = 0;
  mantissaBits.forEach((b, idx) => {
    if (b === 1) fractionValue += Math.pow(2, -(idx + 1));
  });

  if (isMaxExponent) {
    if (isMantissaZero) {
      classification = signBit === 1 ? "Negative Infinity (-Inf)" : "Positive Infinity (+Inf)";
    } else {
      classification = mantissaBits[0] === 1 ? "Quiet NaN (qNaN)" : "Signaling NaN (sNaN)";
    }
  } else if (isZeroExponent) {
    if (isMantissaZero) {
      classification = signBit === 1 ? "Negative Zero (-0.0)" : "Positive Zero (+0.0)";
    } else {
      classification = "Subnormal (Denormalized)";
      effectiveExponent = 1 - bias; // -126 for single precision
    }
  }

  // Hexadecimal conversion
  let uint32Val = 0;
  for (let i = 0; i < 32; i++) {
    if (bits32[i] === 1) {
      uint32Val |= 1 << (31 - i);
    }
  }
  const hexStr = "0x" + (uint32Val >>> 0).toString(16).toUpperCase().padStart(8, "0");

  const reconstructedNum = (() => {
    const buf = new ArrayBuffer(4);
    const view = new DataView(buf);
    view.setUint32(0, uint32Val);
    return view.getFloat32(0);
  })();

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card text-[var(--zen-frost)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[var(--zen-border)] pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
            ARITHMETIC WORKBENCH // SYSTEMS & HARDWARE
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[var(--zen-snow)] tracking-wider uppercase">
            IEEE 754 Floating-Point & Precision Studio
          </h4>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <span className="text-[var(--zen-ink-muted)]">STANDARD:</span>
          <span className="px-2 py-0.5 rounded border border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold">
            IEEE 754-2008 (32-bit Single)
          </span>
        </div>
      </div>

      {/* Preset Quick Actions */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-mono uppercase text-[var(--zen-ink-muted)] tracking-wider mr-1">
          PRESETS:
        </span>
        {[
          { label: "1.0", val: 1.0 },
          { label: "Pi (3.14159)", val: 3.1415927 },
          { label: "-0.15625", val: -0.15625 },
          { label: "Epsilon (1.19e-7)", val: 1.1920929e-7 },
          { label: "Subnormal Min", val: 1.401298e-45 },
          { label: "+Inf", val: Infinity },
          { label: "NaN", val: NaN },
        ].map((p) => (
          <button
            key={p.label}
            onClick={() => setPreset(p.label, p.val)}
            className="px-2.5 py-1 text-xs font-mono rounded border border-[var(--zen-border)] bg-[var(--zen-void)]/80 text-[var(--zen-frost)] hover:border-[var(--zen-cyan)] hover:text-[var(--zen-snow)] transition-all"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Input Field and Decimal Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-3.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60">
          <label htmlFor={numberInputId} className="block text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase mb-1">
            DECIMAL VALUE INPUT
          </label>
          <input
            id={numberInputId}
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full bg-[var(--zen-card)] border border-[var(--zen-border)] rounded px-3 py-1.5 font-mono text-sm text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
            placeholder="e.g. 3.14159 or -42.5"
          />
        </div>

        <div className="p-3.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60">
          <span className="block text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase mb-1">
            HEXADECIMAL ENCODING
          </span>
          <div className="font-mono text-base font-bold text-[var(--zen-cyan)] py-1">
            {hexStr}
          </div>
        </div>

        <div className="p-3.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60">
          <span className="block text-[10px] font-mono text-[var(--zen-ink-muted)] uppercase mb-1">
            IEEE 754 CLASSIFICATION
          </span>
          <div className="font-mono text-xs font-bold text-[var(--zen-snow)] py-1">
            <span className="px-2 py-0.5 rounded bg-[var(--zen-cyan)]/15 border border-[var(--zen-cyan)]/40 text-[var(--zen-cyan)]">
              {classification}
            </span>
          </div>
        </div>
      </div>

      {/* Bit Layout Interactive Grid */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase text-[var(--zen-ink-muted)] tracking-wider">
            32-BIT BINARY WORD // CLICK ANY BIT TO TOGGLE STATE
          </span>
          <span className="text-[10px] font-mono text-[var(--zen-cyan)]">
            MSB (Bit 31) to LSB (Bit 0)
          </span>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs font-mono mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-purple-500/30 border border-purple-400" />
            <span className="text-purple-300">Sign [31] (1 bit)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-cyan-500/30 border border-cyan-400" />
            <span className="text-cyan-300">Biased Exponent [30:23] (8 bits)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-400" />
            <span className="text-emerald-300">Fraction / Mantissa [22:0] (23 bits)</span>
          </div>
        </div>

        {/* Bit Cells */}
        <div className="overflow-x-auto p-1 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]">
          <div
            className="grid gap-1 p-2 min-w-[640px]"
            style={{ gridTemplateColumns: "repeat(32, minmax(18px, 1fr))" }}
          >
            {bits32.map((bit, idx) => {
            const bitPos = 31 - idx;
            const isSign = idx === 0;
            const isExp = idx >= 1 && idx <= 8;
            const isMant = idx >= 9;

            let colorClasses = "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30";
            if (isSign) {
              colorClasses = "bg-purple-500/15 border-purple-400 text-purple-300 hover:bg-purple-500/35";
            } else if (isExp) {
              colorClasses = "bg-cyan-500/15 border-cyan-400 text-cyan-300 hover:bg-cyan-500/35";
            }

            return (
              <button
                key={idx}
                onClick={() => toggleBit(idx)}
                title={`Bit ${bitPos} (${isSign ? "Sign" : isExp ? "Exponent" : "Mantissa"})`}
                className={`flex flex-col items-center justify-center p-1 rounded border text-xs font-mono font-bold transition-all ${colorClasses}`}
              >
                <span>{bit}</span>
                <span className="text-[8px] text-[var(--zen-ink-muted)] font-normal">{bitPos}</span>
              </button>
            );
          })}
          </div>
        </div>
      </div>

      {/* Mathematical Breakdown Analysis */}
      <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/40 space-y-3 font-mono text-xs">
        <span className="text-[10px] uppercase text-[var(--zen-cyan)] tracking-widest font-semibold block">
          MATHEMATICAL VALUE DECONSTRUCTION
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 rounded border border-[var(--zen-border)] bg-[var(--zen-card)]">
            <span className="text-[10px] text-purple-300 block uppercase">1. SIGN COMPONENT (S)</span>
            <div className="text-sm font-bold text-[var(--zen-snow)] mt-1">
              S = {signBit} ({signBit === 1 ? "-1 negative" : "+1 positive"})
            </div>
            <div className="text-[11px] text-[var(--zen-ink-muted)] mt-0.5">
              Factor: (-1)^{signBit} = {signBit === 1 ? -1 : 1}
            </div>
          </div>

          <div className="p-3 rounded border border-[var(--zen-border)] bg-[var(--zen-card)]">
            <span className="text-[10px] text-cyan-300 block uppercase">2. BIASED EXPONENT (E)</span>
            <div className="text-sm font-bold text-[var(--zen-snow)] mt-1">
              E = {rawExponent} (Bias = 127)
            </div>
            <div className="text-[11px] text-[var(--zen-ink-muted)] mt-0.5">
              Unbiased e = {rawExponent} - 127 = {effectiveExponent}
            </div>
            <div className="text-[11px] text-[var(--zen-ink-muted)]">
              Factor: 2^({effectiveExponent}) = {Math.pow(2, effectiveExponent).toExponential(4)}
            </div>
          </div>

          <div className="p-3 rounded border border-[var(--zen-border)] bg-[var(--zen-card)]">
            <span className="text-[10px] text-emerald-300 block uppercase">3. SIGNIFICAND (1.M or 0.M)</span>
            <div className="text-sm font-bold text-[var(--zen-snow)] mt-1">
              {isZeroExponent ? "0 (Subnormal)" : "1 (Implicit leading 1)"} + {fractionValue.toFixed(6)}
            </div>
            <div className="text-[11px] text-[var(--zen-ink-muted)] mt-0.5">
              Significand = {(isZeroExponent ? fractionValue : 1 + fractionValue).toFixed(7)}
            </div>
          </div>
        </div>

        {/* Synthesis Formula */}
        <div className="p-3 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-[var(--zen-ink-muted)] uppercase block">
              EVALUATED NUMERICAL EQUIVALENT
            </span>
            <span className="text-base font-bold text-[var(--zen-snow)]">
              Value = {String(reconstructedNum)}
            </span>
          </div>
          <div className="text-[11px] text-[var(--zen-frost)]/80">
            Formula: (-1)^S * 2^(E - 127) * (1 + Fraction)
          </div>
        </div>
      </div>
    </div>
  );
}
