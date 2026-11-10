"use client";

import { useState, useId } from "react";

type HardwareSubsystem = "gpio" | "pwm" | "adc";

interface GpioPin {
  id: number;
  mode: "output" | "input";
  pupd: "floating" | "pullup" | "pulldown";
  state: number; // 0 or 1
}

export function EmbeddedGpioWorkbench() {
  const dutySliderId = useId();
  const arrSliderId = useId();
  const pscSliderId = useId();
  const analogVoltageSliderId = useId();
  const [subsystem, setSubsystem] = useState<HardwareSubsystem>("gpio");

  // GPIO Port A (8 Pins)
  const [pins, setPins] = useState<GpioPin[]>([
    { id: 0, mode: "output", pupd: "floating", state: 1 },
    { id: 1, mode: "output", pupd: "floating", state: 0 },
    { id: 2, mode: "output", pupd: "floating", state: 1 },
    { id: 3, mode: "output", pupd: "floating", state: 0 },
    { id: 4, mode: "input", pupd: "pullup", state: 1 },
    { id: 5, mode: "input", pupd: "pulldown", state: 0 },
    { id: 6, mode: "input", pupd: "floating", state: 0 },
    { id: 7, mode: "input", pupd: "floating", state: 1 },
  ]);

  // PWM Timer Parameters (based on 16 MHz ARM Cortex-M timer clock)
  const [psc, setPsc] = useState<number>(15); // Prescaler = 15 => Timer clock = 1 MHz
  const [arr, setArr] = useState<number>(999); // ARR = 999 => Period = 1000 ticks (1 kHz PWM)
  const [ccr, setCcr] = useState<number>(350); // CCR = 350 => 35% duty cycle

  // ADC Parameters
  const [adcBits, setAdcBits] = useState<10 | 12>(12);
  const [analogVolts, setAnalogVolts] = useState<number>(2.15); // 0.0V to 3.3V

  // GPIO Actions
  const togglePinState = (idx: number) => {
    setPins((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, state: p.state === 1 ? 0 : 1 } : p))
    );
  };

  const togglePinMode = (idx: number) => {
    setPins((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, mode: p.mode === "output" ? "input" : "output" } : p))
    );
  };

  // PWM Calculations
  const timerClockHz = 16000000 / (psc + 1);
  const pwmFrequencyHz = timerClockHz / (arr + 1);
  const dutyPercentage = Math.min(100, Math.max(0, (ccr / (arr || 1)) * 100));
  const effectiveVoltage = (3.3 * (dutyPercentage / 100)).toFixed(2);

  // ADC Calculations
  const maxAdcVal = Math.pow(2, adcBits) - 1;
  const rawAdcVal = Math.round((analogVolts / 3.3) * maxAdcVal);
  const adcBinary = rawAdcVal.toString(2).padStart(adcBits, "0");
  const stepResolutionMv = ((3.3 / maxAdcVal) * 1000).toFixed(2);

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card text-[var(--zen-frost)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[var(--zen-border)] pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
            EMBEDDED SYSTEMS WORKBENCH // MICROCONTROLLER ARCHITECTURE
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[var(--zen-snow)] tracking-wider uppercase">
            Microcontroller GPIO, PWM & ADC Studio
          </h4>
        </div>
        <div className="flex flex-wrap gap-1">
          {[
            { id: "gpio", label: "GPIO PORT A" },
            { id: "pwm", label: "TIMER PWM OSCILLOSCOPE" },
            { id: "adc", label: "ADC 12-BIT QUANTIZER" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubsystem(tab.id as HardwareSubsystem)}
              className={`px-2.5 py-1 text-xs font-mono rounded border transition-all ${
                subsystem === tab.id
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold shadow-[0_0_10px_rgba(0,229,255,0.25)]"
                  : "border-transparent text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:bg-[var(--zen-card-hover)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {subsystem === "gpio" && (
        /* GPIO Port A Visualizer */
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[var(--zen-void)]/60 p-3 rounded-lg border border-[var(--zen-border)] font-mono text-xs">
            <span className="text-[10px] text-[var(--zen-cyan)] uppercase font-semibold">
              PORT A REGISTER CONFIGURATION // 8 GENERAL PURPOSE PINS
            </span>
            <div className="flex gap-2">
              <span className="text-[var(--zen-ink-muted)]">Logic High: 3.3V</span>
              <span className="text-[var(--zen-ink-muted)]">|</span>
              <span className="text-[var(--zen-ink-muted)]">Logic Low: 0.0V</span>
            </div>
          </div>

          {/* 8-Pin Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {pins.map((pin) => {
              const isHigh = pin.state === 1;
              const isOut = pin.mode === "output";

              return (
                <div
                  key={pin.id}
                  className={`p-3 rounded-xl border flex flex-col justify-between min-h-[140px] font-mono transition-all universe-card ${
                    isHigh
                      ? "border-[var(--zen-cyan)] bg-[var(--zen-midnight)] shadow-[0_0_15px_rgba(0,229,255,0.15)]"
                      : "border-[var(--zen-border)] bg-[var(--zen-void)]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-[var(--zen-ink-muted)]">PA{pin.id}</span>
                      <button
                        onClick={() => togglePinMode(pin.id)}
                        className={`text-[8px] px-1.5 py-0.5 rounded border uppercase font-bold ${
                          isOut
                            ? "border-emerald-400 text-emerald-300 bg-emerald-500/10"
                            : "border-cyan-400 text-cyan-300 bg-cyan-500/10"
                        }`}
                      >
                        {pin.mode}
                      </button>
                    </div>

                    {/* LED Indicator */}
                    <div className="flex flex-col items-center my-2">
                      <div
                        className={`w-5 h-5 rounded-full border transition-all ${
                          isHigh
                            ? "bg-[var(--zen-cyan)] border-[var(--zen-snow)] shadow-[0_0_12px_rgba(0,229,255,0.8)]"
                            : "bg-[var(--zen-card)] border-[var(--zen-border)]"
                        }`}
                      />
                      <span className="text-[9px] text-[var(--zen-ink-muted)] mt-1">
                        {isHigh ? "3.3V HIGH" : "0.0V LOW"}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => togglePinState(pin.id)}
                    className="w-full py-1 text-[10px] rounded border border-[var(--zen-border)] bg-[var(--zen-card)] hover:border-[var(--zen-cyan)] text-[var(--zen-snow)] font-bold transition-all"
                  >
                    Toggle {isHigh ? "LOW" : "HIGH"}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/40 font-mono text-xs space-y-1">
            <span className="text-[10px] text-[var(--zen-cyan)] uppercase font-semibold block">
              HARDWARE MEMORY-MAPPED REGISTERS
            </span>
            <div className="text-[11px] text-[var(--zen-frost)]/80">
              MODER: 0x{pins.map((p) => (p.mode === "output" ? "01" : "00")).join("")} | ODR: 0x
              {pins.map((p) => p.state).join("")}
            </div>
          </div>
        </div>
      )}

      {subsystem === "pwm" && (
        /* PWM Oscilloscope */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs">
              <div className="flex justify-between mb-1">
                <label htmlFor={dutySliderId} className="text-[10px] text-[var(--zen-ink-muted)] uppercase">DUTY CYCLE (CCR = {ccr})</label>
                <span className="text-[var(--zen-cyan)] font-bold">{dutyPercentage.toFixed(1)}%</span>
              </div>
              <input
                id={dutySliderId}
                type="range"
                min="0"
                max={arr}
                step="10"
                value={ccr}
                onChange={(e) => setCcr(Number(e.target.value))}
                className="w-full accent-[var(--zen-cyan)]"
              />
            </div>

            <div className="p-3.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs">
              <div className="flex justify-between mb-1">
                <label htmlFor={arrSliderId} className="text-[10px] text-[var(--zen-ink-muted)] uppercase">AUTO-RELOAD (ARR)</label>
                <span className="text-[var(--zen-snow)] font-bold">{arr}</span>
              </div>
              <input
                id={arrSliderId}
                type="range"
                min="100"
                max="2000"
                step="50"
                value={arr}
                onChange={(e) => setArr(Number(e.target.value))}
                className="w-full accent-[var(--zen-cyan)]"
              />
            </div>

            <div className="p-3.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs">
              <div className="flex justify-between mb-1">
                <label htmlFor={pscSliderId} className="text-[10px] text-[var(--zen-ink-muted)] uppercase">PRESCALER (PSC)</label>
                <span className="text-[var(--zen-snow)] font-bold">{psc}</span>
              </div>
              <input
                id={pscSliderId}
                type="range"
                min="0"
                max="100"
                step="1"
                value={psc}
                onChange={(e) => setPsc(Number(e.target.value))}
                className="w-full accent-[var(--zen-cyan)]"
              />
            </div>
          </div>

          {/* Oscilloscope SVG Waveform */}
          <div className="p-4 sm:p-6 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)] flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3 font-mono text-xs">
              <span className="text-[10px] text-[var(--zen-cyan)] uppercase font-semibold">
                PWM WAVEFORM TRACE (3 PERIODS)
              </span>
              <span className="text-[var(--zen-snow)] font-bold">
                f_PWM = {(pwmFrequencyHz / 1000).toFixed(2)} kHz | V_eff = {effectiveVoltage} V
              </span>
            </div>

            <svg width="100%" height="120" viewBox="0 0 600 120" className="bg-[var(--zen-card)] border border-[var(--zen-border)] rounded-lg">
              {/* Grid lines */}
              <line x1="0" y1="30" x2="600" y2="30" stroke="var(--zen-border)" strokeWidth="0.8" strokeDasharray="3,3" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="var(--zen-border)" strokeWidth="0.8" strokeDasharray="3,3" />

              {/* 3 cycles of PWM */}
              {(() => {
                const cycleW = 200;
                const highW = (dutyPercentage / 100) * cycleW;
                const pathParts: string[] = [];
                for (let c = 0; c < 3; c++) {
                  const startX = c * cycleW;
                  pathParts.push(`M ${startX} 90`);
                  pathParts.push(`L ${startX} 30`);
                  pathParts.push(`L ${startX + highW} 30`);
                  pathParts.push(`L ${startX + highW} 90`);
                  pathParts.push(`L ${startX + cycleW} 90`);
                }
                return (
                  <path
                    d={pathParts.join(" ")}
                    fill="none"
                    stroke="var(--zen-cyan)"
                    strokeWidth="2.5"
                  />
                );
              })()}
            </svg>
          </div>
        </div>
      )}

      {subsystem === "adc" && (
        /* ADC Quantizer */
        <div className="space-y-6">
          <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[10px] text-[var(--zen-cyan)] uppercase font-semibold">
                ANALOG-TO-DIGITAL CONVERTER (SAR ARCHITECTURE)
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setAdcBits(10)}
                  className={`px-2.5 py-0.5 rounded border text-[11px] font-bold ${
                    adcBits === 10
                      ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)]"
                      : "border-[var(--zen-border)] text-[var(--zen-ink-muted)]"
                  }`}
                >
                  10-BIT (1024 STEPS)
                </button>
                <button
                  onClick={() => setAdcBits(12)}
                  className={`px-2.5 py-0.5 rounded border text-[11px] font-bold ${
                    adcBits === 12
                      ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)]"
                      : "border-[var(--zen-border)] text-[var(--zen-ink-muted)]"
                  }`}
                >
                  12-BIT (4096 STEPS)
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label htmlFor={analogVoltageSliderId} className="text-[10px] text-[var(--zen-ink-muted)] uppercase">INPUT ANALOG VOLTAGE (V_IN)</label>
                <span className="font-bold text-[var(--zen-snow)]">{analogVolts.toFixed(3)} V</span>
              </div>
              <input
                id={analogVoltageSliderId}
                type="range"
                min="0.0"
                max="3.3"
                step="0.01"
                value={analogVolts}
                onChange={(e) => setAnalogVolts(Number(e.target.value))}
                className="w-full accent-[var(--zen-cyan)]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[var(--zen-border)]">
              <div className="p-3 rounded bg-[var(--zen-card)] border border-[var(--zen-border)]">
                <span className="text-[10px] text-[var(--zen-ink-muted)] block uppercase">RAW DIGITAL CODE</span>
                <span className="text-base font-bold text-[var(--zen-cyan)]">{rawAdcVal} / {maxAdcVal}</span>
              </div>
              <div className="p-3 rounded bg-[var(--zen-card)] border border-[var(--zen-border)]">
                <span className="text-[10px] text-[var(--zen-ink-muted)] block uppercase">STEP RESOLUTION</span>
                <span className="text-base font-bold text-[var(--zen-snow)]">{stepResolutionMv} mV / step</span>
              </div>
              <div className="p-3 rounded bg-[var(--zen-card)] border border-[var(--zen-border)]">
                <span className="text-[10px] text-[var(--zen-ink-muted)] block uppercase">BINARY WORD</span>
                <span className="text-sm font-bold text-emerald-300">{adcBinary}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
