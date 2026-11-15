"use client";

import { useState, useEffect, useMemo, useId } from "react";
import {
  SimulatorWorkbenchShell,
  type SimulatorPresetOption,
  type SimulatorTelemetryMetric,
  type SimulatorMathematicalInvariant,
} from "./shared/SimulatorWorkbenchShell";

type CryptoMode = "avalanche" | "dh";

interface CryptoPreset extends SimulatorPresetOption {
  mode: CryptoMode;
  flippedBit: number;
  weakMode: boolean;
  primeP?: number;
  genG?: number;
  aliceA?: number;
  bobB?: number;
}

const PRESETS: CryptoPreset[] = [
  {
    id: "lsb-flip",
    label: "Single LSB Flip (Bit 0)",
    description: "Flipping the single least-significant bit rapidly cascades across all 64 bits through SPN rounds.",
    mode: "avalanche",
    flippedBit: 63,
    weakMode: false,
  },
  {
    id: "msb-flip",
    label: "MSB Flip (Bit 63)",
    description: "Observe strict avalanche convergence (>45% bit difference by Round 4) from an MSB perturbation.",
    mode: "avalanche",
    flippedBit: 0,
    weakMode: false,
  },
  {
    id: "weak-no-mix",
    label: "Weak Cipher (No MixColumns Diffusion)",
    description: "Disabling inter-column diffusion traps the bit change inside a single 8-bit lane—critically breaking Shannon diffusion.",
    mode: "avalanche",
    flippedBit: 10,
    weakMode: true,
  },
  {
    id: "dh-exchange",
    label: "Diffie-Hellman Prime Field Exchange",
    description: "Interactive Z_p* discrete exponentiation deriving identical shared secrets across an insecure channel.",
    mode: "dh",
    flippedBit: 63,
    weakMode: false,
    primeP: 23,
    genG: 5,
    aliceA: 6,
    bobB: 15,
  },
];

// Deterministic 4-bit S-box + byte permutation for fast 64-bit SPN avalanche simulation
const SBOX = [0xe, 0x4, 0xd, 0x1, 0x2, 0xf, 0xb, 0x8, 0x3, 0xa, 0x6, 0xc, 0x5, 0x9, 0x0, 0x7];

function applyRoundSpn(bytes: number[], keyByte: number, round: number, weakNoMix: boolean): number[] {
  // 1. AddRoundKey + SubBytes
  const subbed = bytes.map((b, i) => {
    const x = (b ^ ((keyByte + round * 17 + i * 31) & 0xff)) & 0xff;
    return (SBOX[(x >> 4) & 0xf] << 4) | SBOX[x & 0xf];
  });

  if (weakNoMix) {
    // Weak cipher keeps bytes isolated without cross-byte mixing
    return subbed;
  }

  // 2. Cyclic bit-level Mix + Byte Shift Diffusion
  const next = Array(8).fill(0);
  for (let i = 0; i < 8; i++) {
    const b0 = subbed[i];
    const b1 = subbed[(i + 1) % 8];
    const b2 = subbed[(i + 3) % 8];
    const rot = ((b0 << 3) | (b0 >>> 5)) & 0xff;
    next[i] = (rot ^ b1 ^ ((b2 << 1) | (b2 >>> 7))) & 0xff;
  }
  return next;
}

function bytesToBits64(bytes: number[]): number[] {
  const bits: number[] = [];
  for (let i = 0; i < 8; i++) {
    for (let b = 7; b >= 0; b--) {
      bits.push((bytes[i] >> b) & 1);
    }
  }
  return bits;
}

function modPow(base: number, exp: number, mod: number): number {
  if (!Number.isFinite(mod) || mod <= 1) return 0;
  const zero = BigInt(0);
  const one = BigInt(1);
  const two = BigInt(2);
  const m = BigInt(Math.floor(mod));
  let result = one;
  let b = BigInt(Math.floor(base)) % m;
  if (b < zero) b += m;
  let e = BigInt(Math.max(0, Math.floor(exp)));
  while (e > zero) {
    if (e % two === one) result = (result * b) % m;
    b = (b * b) % m;
    e = e / two;
  }
  return Number(result);
}

export function AvalancheCryptoWorkbench() {
  const plaintextId = useId();
  const dhPId = useId();
  const dhGId = useId();
  const aliceAId = useId();
  const bobBId = useId();

  const [presetId, setPresetId] = useState<string>("lsb-flip");
  const [mode, setMode] = useState<CryptoMode>("avalanche");
  const [plaintext, setPlaintext] = useState<string>("ENGRAM64");
  const [flippedBit, setFlippedBit] = useState<number>(63);
  const [weakMode, setWeakMode] = useState<boolean>(false);
  const [roundIdx, setRoundIdx] = useState<number>(4);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);

  // Diffie-Hellman State
  const [primeP, setPrimeP] = useState<number>(23);
  const [genG, setGenG] = useState<number>(5);
  const [aliceA, setAliceA] = useState<number>(6);
  const [bobB, setBobB] = useState<number>(15);

  const avalancheRounds = useMemo(() => {
    const padded = (plaintext + "        ").slice(0, 8);
    const baseBytes = Array.from(padded).map((ch) => ch.charCodeAt(0) & 0xff);
    const modBytes = [...baseBytes];
    const targetByte = Math.floor(flippedBit / 8);
    const bitInByte = 7 - (flippedBit % 8);
    modBytes[targetByte] ^= 1 << bitInByte;

    const history: { round: number; aBits: number[]; bBits: number[]; hamming: number }[] = [];
    let curA = [...baseBytes];
    let curB = [...modBytes];

    for (let r = 0; r <= 10; r++) {
      const aBits = bytesToBits64(curA);
      const bBits = bytesToBits64(curB);
      let hamming = 0;
      for (let k = 0; k < 64; k++) {
        if (aBits[k] !== bBits[k]) hamming++;
      }
      history.push({ round: r, aBits, bBits, hamming });
      curA = applyRoundSpn(curA, 0x5a, r + 1, weakMode);
      curB = applyRoundSpn(curB, 0x5a, r + 1, weakMode);
    }
    return history;
  }, [plaintext, flippedBit, weakMode]);

  useEffect(() => {
    if (!isPlaying || mode !== "avalanche") return;
    const timer = setInterval(() => {
      setRoundIdx((prev) => {
        if (prev >= 10) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, Math.round(750 / speed));
    return () => clearInterval(timer);
  }, [isPlaying, speed, mode]);

  const currentRound = avalancheRounds[Math.min(roundIdx, 10)] || avalancheRounds[0];
  const avalanchePct = ((currentRound.hamming / 64) * 100).toFixed(1);

  // Diffie-Hellman derived keys
  const pubAlice = modPow(genG, aliceA, primeP);
  const pubBob = modPow(genG, bobB, primeP);
  const sharedAlice = modPow(pubBob, aliceA, primeP);
  const sharedBob = modPow(pubAlice, bobB, primeP);

  const handleSelectPreset = (nextId: string) => {
    const p = PRESETS.find((pr) => pr.id === nextId) || PRESETS[0];
    setPresetId(p.id);
    setMode(p.mode);
    setFlippedBit(p.flippedBit);
    setWeakMode(p.weakMode);
    if (p.primeP) setPrimeP(p.primeP);
    if (p.genG) setGenG(p.genG);
    if (p.aliceA) setAliceA(p.aliceA);
    if (p.bobB) setBobB(p.bobB);
    setRoundIdx(p.mode === "avalanche" ? 4 : 0);
    setIsPlaying(false);
  };

  const metrics: SimulatorTelemetryMetric[] =
    mode === "avalanche"
      ? [
          { label: "Active SPN Round", value: `Round ${currentRound.round} / 10`, accent: true },
          { label: "Hamming Distance", value: `${currentRound.hamming} / 64 bits` },
          { label: "Avalanche Diffusion", value: `${avalanchePct}%`, hint: "Target Strict Criterion ~50%" },
          { label: "Flipped Input Bit", value: `Bit ${63 - flippedBit}`, hint: weakMode ? "Diffusion Disabled" : "Full SPN Mixing" },
        ]
      : [
          { label: "Alice Public A", value: pubAlice, accent: true, hint: `${genG}^${aliceA} mod ${primeP}` },
          { label: "Bob Public B", value: pubBob, accent: true, hint: `${genG}^${bobB} mod ${primeP}` },
          { label: "Shared Secret S", value: sharedAlice, hint: sharedAlice === sharedBob ? "Verified Match" : "Mismatch" },
          { label: "Group Order", value: `Z*_${primeP}`, hint: `${primeP - 1} Elements` },
        ];

  const invariants: SimulatorMathematicalInvariant[] = [
    {
      label: "Strict Avalanche Criterion (SAC)",
      latex: "P(\\Delta y_i = 1 \\mid \\Delta x_j = 1) \\approx 0.50 \\quad \\forall i, j",
      note: "Flipping 1 input bit must flip ~50% of all output bits unpredictably.",
    },
    {
      label: "Diffie-Hellman Commutativity",
      latex: "(g^a \\bmod p)^b \\bmod p \\equiv g^{ab} \\bmod p \\equiv (g^b \\bmod p)^a \\bmod p",
      note: "Eavesdropper sees (p, g, g^a, g^b) but faces the Discrete Logarithm Problem.",
    },
  ];

  const stateInspector = (
    <div className="space-y-3 font-mono text-xs">
      <div className="text-[10px] text-[var(--zen-ink-muted)] uppercase">
        ROUND-BY-ROUND HAMMING CURVE
      </div>
      <div className="space-y-1">
        {avalancheRounds.map((item) => {
          const pct = Math.round((item.hamming / 64) * 100);
          return (
            <button
              key={item.round}
              type="button"
              onClick={() => {
                setMode("avalanche");
                setRoundIdx(item.round);
              }}
              className={`w-full flex items-center gap-2 px-2 py-1 rounded text-[10px] border transition-colors ${
                item.round === roundIdx && mode === "avalanche"
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/10 text-[var(--zen-snow)] font-bold"
                  : "border-transparent hover:border-[var(--zen-border)] text-[var(--zen-ink-muted)]"
              }`}
            >
              <span className="w-8 text-left">R{item.round}</span>
              <div className="flex-1 h-2 bg-[var(--zen-midnight)] rounded overflow-hidden">
                <div
                  className="h-full bg-[var(--zen-cyan)] transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-12 text-right">{item.hamming}b ({pct}%)</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <SimulatorWorkbenchShell
      title="Cryptographic Avalanche & Key Exchange Workbench"
      subtitle="Flip single plaintext bits to observe round-by-round SPN confusion/diffusion convergence, or verify ephemeral Diffie-Hellman modular key exchange."
      domain="security"
      courses={["NSSECU1", "NSSECU2", "NSSECU3"]}
      presets={PRESETS}
      activePresetId={presetId}
      onSelectPreset={handleSelectPreset}
      headerActions={
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMode("avalanche")}
            className={`px-2.5 py-1 font-mono text-xs rounded border ${
              mode === "avalanche"
                ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold"
                : "border-[var(--zen-border)] text-[var(--zen-ink-muted)]"
            }`}
          >
            AVALANCHE 64-BIT
          </button>
          <button
            type="button"
            onClick={() => setMode("dh")}
            className={`px-2.5 py-1 font-mono text-xs rounded border ${
              mode === "dh"
                ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold"
                : "border-[var(--zen-border)] text-[var(--zen-ink-muted)]"
            }`}
          >
            DIFFIE-HELLMAN
          </button>
        </div>
      }
      stepping={
        mode === "avalanche"
          ? {
              isPlaying,
              onTogglePlay: () => setIsPlaying((p) => !p),
              onStepBack: () => {
                setIsPlaying(false);
                setRoundIdx((r) => Math.max(0, r - 1));
              },
              onStepForward: () => {
                setIsPlaying(false);
                setRoundIdx((r) => Math.min(10, r + 1));
              },
              onReset: () => {
                setIsPlaying(false);
                setRoundIdx(0);
              },
              speed,
              onChangeSpeed: setSpeed,
              stepIndex: currentRound.round,
              totalSteps: 10,
              stepLabel: "RND",
              canStepBack: roundIdx > 0,
              canStepForward: roundIdx < 10,
            }
          : undefined
      }
      telemetryMetrics={metrics}
      invariants={invariants}
      stateInspector={stateInspector}
    >
      {mode === "avalanche" ? (
        <div className="space-y-4">
          {/* Plaintext Input + Diffusion Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60">
            <div className="flex items-center gap-2 flex-1 min-w-[200px]">
              <label htmlFor={plaintextId} className="font-mono text-xs text-[var(--zen-ink-muted)] uppercase shrink-0">
                8-Byte Block:
              </label>
              <input
                id={plaintextId}
                aria-label="8-character plaintext block"
                type="text"
                maxLength={8}
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                className="flex-1 px-2.5 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)] font-mono text-xs text-[var(--zen-snow)]"
              />
            </div>
            <button
              type="button"
              onClick={() => setWeakMode((w) => !w)}
              className={`px-3 py-1 rounded border font-mono text-xs transition-all ${
                weakMode
                  ? "border-rose-400 bg-rose-500/20 text-rose-200 font-bold"
                  : "border-emerald-400/50 bg-emerald-500/15 text-emerald-200"
              }`}
            >
              {weakMode ? "MixColumns: DISABLED (WEAK)" : "MixColumns: ENABLED"}
            </button>
          </div>

          {/* 8x8 Bit-Diff Matrix (Click any bit to toggle flip target) */}
          <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/75 space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-[var(--zen-ink-muted)]">
              <span>8x8 STATE DIFF HEATMAP (CLICK ANY BIT CELL TO MOVE 1-BIT INPUT PERTURBATION)</span>
              <span className="text-[var(--zen-cyan)]">{avalanchePct}% FLIPPED</span>
            </div>
            <div className="grid grid-cols-8 gap-1.5">
              {currentRound.aBits.map((bitA, idx) => {
                const bitB = currentRound.bBits[idx];
                const isFlippedOut = bitA !== bitB;
                const isInputPerturbation = idx === flippedBit;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFlippedBit(idx)}
                    aria-label={`Bit ${63 - idx}, click to inject perturbation`}
                    className={`p-1.5 rounded border font-mono text-xs flex flex-col items-center justify-center transition-all ${
                      isInputPerturbation
                        ? "ring-2 ring-[var(--zen-amber)] border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/25 text-[var(--zen-snow)] font-bold"
                        : isFlippedOut
                        ? "border-rose-400/70 bg-rose-500/20 text-rose-200 font-bold"
                        : "border-[var(--zen-border)] bg-[var(--zen-midnight)]/60 text-[var(--zen-ink-muted)]"
                    }`}
                  >
                    <span>{bitA}^{bitB}</span>
                    <span className="text-[8px] opacity-70">b{63 - idx}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/75 space-y-4 font-mono text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label htmlFor={dhPId} className="block text-[10px] text-[var(--zen-ink-muted)] mb-1">
                Prime p
              </label>
              <select
                id={dhPId}
                aria-label="Diffie-Hellman prime modulus p"
                value={primeP}
                onChange={(e) => setPrimeP(parseInt(e.target.value, 10))}
                className="w-full px-2 py-1.5 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)] text-[var(--zen-snow)]"
              >
                {[11, 23, 47, 79, 101].map((pr) => (
                  <option key={pr} value={pr}>
                    p = {pr}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={dhGId} className="block text-[10px] text-[var(--zen-ink-muted)] mb-1">
                Generator g
              </label>
              <input
                id={dhGId}
                aria-label="Diffie-Hellman generator g"
                type="number"
                min={2}
                max={primeP - 2}
                value={genG}
                onChange={(e) => setGenG(Math.max(2, parseInt(e.target.value, 10) || 2))}
                className="w-full px-2 py-1.5 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)] text-[var(--zen-snow)]"
              />
            </div>
            <div>
              <label htmlFor={aliceAId} className="block text-[10px] text-[var(--zen-ink-muted)] mb-1">
                Alice Secret a
              </label>
              <input
                id={aliceAId}
                aria-label="Alice private exponent a"
                type="number"
                min={2}
                max={primeP - 2}
                value={aliceA}
                onChange={(e) => setAliceA(Math.max(2, parseInt(e.target.value, 10) || 2))}
                className="w-full px-2 py-1.5 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)] text-[var(--zen-cyan)] font-bold"
              />
            </div>
            <div>
              <label htmlFor={bobBId} className="block text-[10px] text-[var(--zen-ink-muted)] mb-1">
                Bob Secret b
              </label>
              <input
                id={bobBId}
                aria-label="Bob private exponent b"
                type="number"
                min={2}
                max={primeP - 2}
                value={bobB}
                onChange={(e) => setBobB(Math.max(2, parseInt(e.target.value, 10) || 2))}
                className="w-full px-2 py-1.5 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)] text-emerald-300 font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 rounded border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/10 space-y-1">
              <div className="text-[10px] text-[var(--zen-cyan)] font-bold">ALICE TERMINAL</div>
              <div>Secret a = {aliceA}</div>
              <div>Public A = {genG}^{aliceA} mod {primeP} = <strong>{pubAlice}</strong></div>
              <div className="text-emerald-300 font-bold">S = {pubBob}^{aliceA} mod {primeP} = {sharedAlice}</div>
            </div>
            <div className="p-3 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)]/80 space-y-1 text-center flex flex-col justify-center">
              <div className="text-[10px] text-amber-300 font-bold">INSECURE PUBLIC CHANNEL</div>
              <div>Observed: p={primeP}, g={genG}</div>
              <div>Wire -&gt; A = {pubAlice}, B = {pubBob}</div>
            </div>
            <div className="p-3 rounded border border-emerald-500/40 bg-emerald-500/10 space-y-1">
              <div className="text-[10px] text-emerald-300 font-bold">BOB TERMINAL</div>
              <div>Secret b = {bobB}</div>
              <div>Public B = {genG}^{bobB} mod {primeP} = <strong>{pubBob}</strong></div>
              <div className="text-emerald-300 font-bold">S = {pubAlice}^{bobB} mod {primeP} = {sharedBob}</div>
            </div>
          </div>
        </div>
      )}
    </SimulatorWorkbenchShell>
  );
}
