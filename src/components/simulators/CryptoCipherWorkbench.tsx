"use client";

import { useState } from "react";

export function CryptoCipherWorkbench() {
  const [plaintext, setPlaintext] = useState("PROJECT ENGRAM 2026");
  const [shift, setShift] = useState(3);
  const [vigenereKey, setVigenereKey] = useState("CIPHER");
  const [cipherType, setCipherType] = useState<"caesar" | "vigenere" | "rsa">("caesar");

  // RSA custom inputs
  const [primeP, setPrimeP] = useState<number>(61);
  const [primeQ, setPrimeQ] = useState<number>(53);
  const [rsaMessage, setRsaMessage] = useState<number>(42);
  const [isCustomPrimes, setIsCustomPrimes] = useState<boolean>(false);

  // Primality test helper
  const checkPrime = (num: number): boolean => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  };

  const isPPrime = checkPrime(primeP);
  const isQPrime = checkPrime(primeQ);
  const arePrimesValid = isPPrime && isQPrime && primeP !== primeQ;

  // Caesar encryption
  const encryptCaesar = (str: string, s: number) => {
    return str
      .toUpperCase()
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + s) % 26) + 65);
        }
        return char;
      })
      .join("");
  };

  // Vigenere encryption
  const encryptVigenere = (str: string, key: string) => {
    const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, "") || "A";
    let keyIdx = 0;

    return str
      .toUpperCase()
      .split("")
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          const kShift = cleanKey.charCodeAt(keyIdx % cleanKey.length) - 65;
          keyIdx++;
          return String.fromCharCode(((code - 65 + kShift) % 26) + 65);
        }
        return char;
      })
      .join("");
  };

  // Modular arithmetic helpers for RSA
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

  const modInverse = (e: number, m: number): number => {
    let [m0, x0, x1] = [m, 0, 1];
    if (m === 1) return 0;
    while (e > 1 && m > 0) {
      const q = Math.floor(e / m);
      [e, m] = [m, e % m];
      [x0, x1] = [x1 - q * x0, x0];
    }
    return x1 < 0 ? x1 + m0 : x1;
  };

  const modPow = (base: number, exp: number, mod: number): number => {
    if (mod <= 1) return 0;
    let res = 1;
    base = base % mod;
    while (exp > 0) {
      if (exp % 2 === 1) res = (res * base) % mod;
      base = (base * base) % mod;
      exp = Math.floor(exp / 2);
    }
    return res;
  };

  // Compute RSA parameters
  const n = arePrimesValid ? primeP * primeQ : 61 * 53;
  const phi = arePrimesValid ? (primeP - 1) * (primeQ - 1) : (61 - 1) * (53 - 1);
  const candidatesE = [17, 3, 5, 7, 11, 13, 19, 23, 65537];
  const eVal = candidatesE.find((cand) => cand < phi && gcd(cand, phi) === 1) || 17;
  const dVal = phi > 1 ? modInverse(eVal, phi) : 1;

  const validMsg = Math.min(Math.max(1, rsaMessage), Math.max(2, n - 1));
  const ciphertextRSA = modPow(validMsg, eVal, n);
  const decryptedRSA = modPow(ciphertextRSA, dVal, n);

  const caesarCiphertext = encryptCaesar(plaintext, shift);
  const vigenereCiphertext = encryptVigenere(plaintext, vigenereKey);

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card text-[var(--zen-frost)]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[var(--zen-border)] pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
            CYBERSECURITY & CRYPTOGRAPHY // NSSECU1
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[var(--zen-snow)] tracking-wider uppercase">
            Cryptographic Cipher & Key Transform Inspector
          </h4>
        </div>
        <div className="flex gap-1.5">
          {(["caesar", "vigenere", "rsa"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setCipherType(t)}
              className={`px-3 py-1 font-mono text-xs rounded border transition-all uppercase ${
                cipherType === t
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold shadow-[0_0_10px_rgba(0,229,255,0.25)]"
                  : "border-transparent text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:bg-[var(--zen-card-hover)]"
              }`}
            >
              {t === "rsa" ? "RSA Math" : t}
            </button>
          ))}
        </div>
      </div>

      {cipherType !== "rsa" && (
        <div className="mb-5">
          <label className="block text-xs font-mono text-[var(--zen-ink-muted)] uppercase mb-1">
            Plaintext String
          </label>
          <input
            type="text"
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)] font-mono text-sm text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
          />
        </div>
      )}

      {cipherType === "caesar" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-mono text-[var(--zen-ink-muted)] uppercase">
                Caesar Shift Offset: K = {shift}
              </span>
              <input
                type="range"
                min="1"
                max="25"
                value={shift}
                onChange={(e) => setShift(parseInt(e.target.value, 10))}
                className="w-32 accent-[var(--zen-cyan)]"
              />
            </div>
            <div className="p-3 rounded bg-[var(--zen-midnight)] border border-[var(--zen-border)] font-mono text-sm font-bold text-[var(--zen-cyan)] break-all">
              {caesarCiphertext}
            </div>
          </div>
          <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/40 flex flex-col justify-center text-xs font-mono text-[var(--zen-ink-muted)]">
            <span className="text-[var(--zen-snow)] font-bold mb-1">
              Monoalphabetic Shift Formula:
            </span>
            <span>C = (P + K) mod 26</span>
            <span className="mt-2 text-[10px]">
              Vulnerable to frequency analysis: the most frequent ciphertext letter correlates to English 'E'.
            </span>
          </div>
        </div>
      )}

      {cipherType === "vigenere" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60">
            <label className="block text-xs font-mono text-[var(--zen-ink-muted)] uppercase mb-1">
              Cipher Keyword:
            </label>
            <input
              type="text"
              value={vigenereKey}
              onChange={(e) => setVigenereKey(e.target.value)}
              className="w-full px-3 py-1.5 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)] font-mono text-xs text-[var(--zen-snow)] mb-3"
            />
            <div className="p-3 rounded bg-[var(--zen-midnight)] border border-[var(--zen-border)] font-mono text-sm font-bold text-amber-700 dark:text-amber-400 break-all">
              {vigenereCiphertext}
            </div>
          </div>
          <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/40 flex flex-col justify-center text-xs font-mono text-[var(--zen-ink-muted)]">
            <span className="text-[var(--zen-snow)] font-bold mb-1">
              Polyalphabetic Vigenere Principle:
            </span>
            <span>C[i] = (P[i] + K[i mod L]) mod 26</span>
            <span className="mt-2 text-[10px]">
              Defeats simple single-letter frequency analysis. Historically cracked using Kasiski examination and Friedman test.
            </span>
          </div>
        </div>
      )}

      {cipherType === "rsa" && (
        <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 space-y-4">
          {/* Prime Mode Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--zen-border)] pb-2 font-mono text-xs">
            <span className="text-[10px] text-[var(--zen-ink-muted)] uppercase font-semibold">
              RSA Prime Configuration (Custom Primes Allowed)
            </span>
            <button
              onClick={() => setIsCustomPrimes((prev) => !prev)}
              className="px-2.5 py-0.5 rounded border border-[var(--zen-cyan)]/40 bg-[var(--zen-cyan)]/10 text-[var(--zen-cyan)] text-[11px] hover:bg-[var(--zen-cyan)]/20 transition-colors"
            >
              Mode: {isCustomPrimes ? "Direct Custom Input" : "Preset Selector"}
            </button>
          </div>

          {/* Prime Pair Custom Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-mono uppercase text-[var(--zen-ink-muted)]">
                  Prime p:
                </label>
                <span
                  className={`text-[9px] font-mono px-1 rounded ${
                    isPPrime ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"
                  }`}
                >
                  {isPPrime ? "Prime" : "Not Prime"}
                </span>
              </div>
              {isCustomPrimes ? (
                <input
                  type="number"
                  min="3"
                  max="499"
                  value={primeP}
                  onChange={(e) => setPrimeP(parseInt(e.target.value, 10) || 3)}
                  className="w-full px-2.5 py-1.5 rounded border border-[var(--zen-border)] bg-[var(--zen-void)] text-xs font-mono text-[var(--zen-snow)]"
                />
              ) : (
                <select
                  value={primeP}
                  onChange={(e) => setPrimeP(parseInt(e.target.value, 10))}
                  className="w-full px-2.5 py-1.5 rounded border border-[var(--zen-border)] bg-[var(--zen-void)] text-xs font-mono text-[var(--zen-snow)]"
                >
                  {[11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 79, 83].map(
                    (p) => (
                      <option key={p} value={p}>
                        p = {p}
                      </option>
                    )
                  )}
                </select>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-mono uppercase text-[var(--zen-ink-muted)]">
                  Prime q:
                </label>
                <span
                  className={`text-[9px] font-mono px-1 rounded ${
                    isQPrime ? "text-emerald-400 bg-emerald-500/10" : "text-red-400 bg-red-500/10"
                  }`}
                >
                  {isQPrime ? "Prime" : "Not Prime"}
                </span>
              </div>
              {isCustomPrimes ? (
                <input
                  type="number"
                  min="3"
                  max="499"
                  value={primeQ}
                  onChange={(e) => setPrimeQ(parseInt(e.target.value, 10) || 3)}
                  className="w-full px-2.5 py-1.5 rounded border border-[var(--zen-border)] bg-[var(--zen-void)] text-xs font-mono text-[var(--zen-snow)]"
                />
              ) : (
                <select
                  value={primeQ}
                  onChange={(e) => setPrimeQ(parseInt(e.target.value, 10))}
                  className="w-full px-2.5 py-1.5 rounded border border-[var(--zen-border)] bg-[var(--zen-void)] text-xs font-mono text-[var(--zen-snow)]"
                >
                  {[13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 83, 89].map(
                    (q) => (
                      <option key={q} value={q}>
                        q = {q}
                      </option>
                    )
                  )}
                </select>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-mono uppercase text-[var(--zen-ink-muted)] mb-1">
                Message M (integer &lt; n):
              </label>
              <input
                type="number"
                min="1"
                max={Math.max(2, n - 1)}
                value={validMsg}
                onChange={(e) => setRsaMessage(parseInt(e.target.value, 10) || 1)}
                className="w-full px-2.5 py-1.5 rounded border border-[var(--zen-border)] bg-[var(--zen-void)] text-xs font-mono text-[var(--zen-cyan)] font-bold"
              />
            </div>
          </div>

          {!arePrimesValid && (
            <div className="p-2.5 rounded bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs">
              Warning: Both p and q must be distinct prime integers for valid RSA key derivation.
            </div>
          )}

          {/* Computed Keys Telemetry */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div className="p-2.5 rounded bg-[var(--zen-midnight)] border border-[var(--zen-border)]">
              <span className="text-[10px] text-[var(--zen-ink-muted)] block">Modulus n = p*q</span>
              <span className="text-sm font-bold text-amber-700 dark:text-amber-400">{n}</span>
            </div>
            <div className="p-2.5 rounded bg-[var(--zen-midnight)] border border-[var(--zen-border)]">
              <span className="text-[10px] text-[var(--zen-ink-muted)] block">Totient phi(n)</span>
              <span className="text-sm font-bold text-[var(--zen-snow)]">{phi}</span>
            </div>
            <div className="p-2.5 rounded bg-[var(--zen-midnight)] border border-[var(--zen-border)]">
              <span className="text-[10px] text-[var(--zen-ink-muted)] block">Public Key (e, n)</span>
              <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                ({eVal}, {n})
              </span>
            </div>
            <div className="p-2.5 rounded bg-[var(--zen-midnight)] border border-[var(--zen-border)]">
              <span className="text-[10px] text-[var(--zen-ink-muted)] block">Private Key (d, n)</span>
              <span className="text-sm font-bold text-[var(--zen-cyan)]">
                ({dVal}, {n})
              </span>
            </div>
          </div>

          {/* Encryption / Decryption Verification */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3 rounded bg-[var(--zen-midnight)] border border-[var(--zen-border)]">
              <span className="text-[10px] text-[var(--zen-ink-muted)] uppercase block mb-1">
                Encryption: C = M^e mod n
              </span>
              <div className="text-sm font-bold text-amber-700 dark:text-amber-400">
                C = {validMsg}^{eVal} mod {n} = {ciphertextRSA}
              </div>
            </div>
            <div className="p-3 rounded bg-[var(--zen-midnight)] border border-[var(--zen-border)]">
              <span className="text-[10px] text-[var(--zen-ink-muted)] uppercase block mb-1">
                Decryption Verification: M = C^d mod n
              </span>
              <div className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                M = {ciphertextRSA}^{dVal} mod {n} = {decryptedRSA}{" "}
                {decryptedRSA === validMsg ? "(Verified)" : "(Mismatch)"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
