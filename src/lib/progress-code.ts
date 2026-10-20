import type { UniverseId } from "@/components/ThemeProvider";

export type StudyPlanTier = "full" | "core" | "cram";

export interface ProgressSnapshot {
  version: 2;
  universe: UniverseId;
  theme: "dark" | "light";
  isLite: boolean;
  tier: StudyPlanTier;
  focusCourse: string;
  completedNotes: string[];
  lastVisited: {
    url: string;
    title: string;
    courseCode?: string;
  } | null;
}

const UNIVERSE_TO_CODE: Record<UniverseId, string> = {
  "cyber-zen": "CZ",
  "neo-brutalism": "NB",
  minimalism: "MN",
  parallax: "PX",
  "broken-grid": "BG",
};

const CODE_TO_UNIVERSE: Record<string, UniverseId> = {
  CZ: "cyber-zen",
  NB: "neo-brutalism",
  MN: "minimalism",
  PX: "parallax",
  BG: "broken-grid",
};

const TIER_TO_CODE: Record<StudyPlanTier, string> = {
  full: "FULL",
  core: "CORE",
  cram: "CRAM",
};

const CODE_TO_TIER: Record<string, StudyPlanTier> = {
  FULL: "full",
  CORE: "core",
  CRAM: "cram",
};

/**
 * Compute CRC16-CCITT (0x1021) as a 4-character uppercase hex string.
 */
export function computeCrc16Hex(input: string): string {
  let crc = 0xffff;
  for (let i = 0; i < input.length; i++) {
    crc ^= input.charCodeAt(i) << 8;
    for (let bit = 0; bit < 8; bit++) {
      if ((crc & 0x8000) !== 0) {
        crc = ((crc << 1) ^ 0x1021) & 0xffff;
      } else {
        crc = (crc << 1) & 0xffff;
      }
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function toBase64Url(str: string): string {
  if (typeof window !== "undefined" && typeof window.btoa === "function") {
    const bytes = new TextEncoder().encode(str);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window
      .btoa(binary)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
  return Buffer.from(str, "utf-8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(b64url: string): string {
  const padded = b64url.replace(/-/g, "+").replace(/_/g, "/");
  const padLen = (4 - (padded.length % 4)) % 4;
  const full = padded + "=".repeat(padLen);

  if (typeof window !== "undefined" && typeof window.atob === "function") {
    const binary = window.atob(full);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  }
  return Buffer.from(full, "base64").toString("utf-8");
}

/**
 * Compresses canonical note URLs by grouping them by course prefix
 * so the resulting Valorant-style code stays compact.
 */
function packCompletedNotes(urls: string[]): Record<string, string[]> {
  const grouped: Record<string, string[]> = {};
  const unique = Array.from(new Set(urls)).sort();

  for (const rawUrl of unique) {
    const clean = rawUrl.replace(/^\/notes\//, "").trim();
    if (!clean) continue;
    const slashIdx = clean.indexOf("/");
    if (slashIdx === -1) {
      grouped["@"] = grouped["@"] || [];
      grouped["@"].push(clean);
    } else {
      const course = clean.slice(0, slashIdx).toUpperCase();
      const rest = clean.slice(slashIdx + 1);
      grouped[course] = grouped[course] || [];
      grouped[course].push(rest);
    }
  }
  return grouped;
}

function unpackCompletedNotes(grouped: Record<string, string[]> | undefined): string[] {
  if (!grouped || typeof grouped !== "object") return [];
  const result: string[] = [];
  for (const [course, items] of Object.entries(grouped)) {
    if (!Array.isArray(items)) continue;
    for (const item of items) {
      if (typeof item !== "string" || !item) continue;
      if (course === "@") {
        result.push(`/notes/${item}`);
      } else {
        result.push(`/notes/${course}/${item}`);
      }
    }
  }
  return Array.from(new Set(result));
}

/**
 * Encodes a ProgressSnapshot into a Valorant crosshair-style stateless string:
 * Format: EG2-<UNIVERSE><MODE>-<TIER>-<FOCUS>-<PAYLOAD_B64URL>-<CRC16>
 * Example: EG2-CZD0-CORE-ALL-eyJ... -4F9A
 */
export function encodeProgressCode(snapshot: ProgressSnapshot): string {
  const uCode = UNIVERSE_TO_CODE[snapshot.universe] || "CZ";
  const themeChar = snapshot.theme === "light" ? "L" : "D";
  const liteChar = snapshot.isLite ? "1" : "0";
  const headerFlags = `${uCode}${themeChar}${liteChar}`;
  const tierCode = TIER_TO_CODE[snapshot.tier] || "FULL";
  const focus = (snapshot.focusCourse || "ALL")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 10) || "ALL";

  const compactPayload = {
    n: packCompletedNotes(snapshot.completedNotes),
    l: snapshot.lastVisited
      ? [
          snapshot.lastVisited.url.replace(/^\/notes\//, ""),
          snapshot.lastVisited.title.slice(0, 80),
          snapshot.lastVisited.courseCode || "",
        ]
      : null,
  };

  const payloadB64 = toBase64Url(JSON.stringify(compactPayload));
  const bodyWithoutCrc = `EG2-${headerFlags}-${tierCode}-${focus}-${payloadB64}`;
  const crc = computeCrc16Hex(bodyWithoutCrc);
  return `${bodyWithoutCrc}-${crc}`;
}

export interface DecodedProgressResult {
  ok: boolean;
  error?: string;
  snapshot?: ProgressSnapshot;
}

/**
 * Decodes and validates an EG2-... progress code string.
 */
export function decodeProgressCode(rawCode: string): DecodedProgressResult {
  const trimmed = rawCode.trim();
  if (!trimmed) {
    return { ok: false, error: "Progress code is empty." };
  }

  const parts = trimmed.split("-");
  if (parts.length !== 6 || parts[0] !== "EG2") {
    return {
      ok: false,
      error: "Invalid format. Expected EG2-<UNIVERSE>-<TIER>-<COURSE>-<DATA>-<CRC>.",
    };
  }

  const [, headerFlags, tierCode, focusRaw, payloadB64, providedCrc] = parts;
  const bodyWithoutCrc = `EG2-${headerFlags}-${tierCode}-${focusRaw}-${payloadB64}`;
  const expectedCrc = computeCrc16Hex(bodyWithoutCrc);

  if (providedCrc.toUpperCase() !== expectedCrc) {
    return {
      ok: false,
      error: `Checksum mismatch (expected ${expectedCrc}, got ${providedCrc.toUpperCase()}). Code may be truncated.`,
    };
  }

  if (headerFlags.length < 4) {
    return { ok: false, error: "Corrupted universe header flags." };
  }

  const uShort = headerFlags.slice(0, 2).toUpperCase();
  const themeChar = headerFlags[2]?.toUpperCase();
  const liteChar = headerFlags[3];

  const universe = CODE_TO_UNIVERSE[uShort];
  if (!universe) {
    return { ok: false, error: `Unknown universe code: ${uShort}` };
  }

  const tier = CODE_TO_TIER[tierCode.toUpperCase()];
  if (!tier) {
    return { ok: false, error: `Unknown study plan tier: ${tierCode}` };
  }

  try {
    const jsonStr = fromBase64Url(payloadB64);
    const parsed = JSON.parse(jsonStr);
    const completedNotes = unpackCompletedNotes(parsed?.n);

    let lastVisited: ProgressSnapshot["lastVisited"] = null;
    if (Array.isArray(parsed?.l) && typeof parsed.l[0] === "string" && parsed.l[0]) {
      const cleanRel = parsed.l[0].replace(/^\/notes\//, "");
      lastVisited = {
        url: `/notes/${cleanRel}`,
        title: typeof parsed.l[1] === "string" ? parsed.l[1] : cleanRel,
        courseCode: typeof parsed.l[2] === "string" && parsed.l[2] ? parsed.l[2] : undefined,
      };
    }

    return {
      ok: true,
      snapshot: {
        version: 2,
        universe,
        theme: themeChar === "L" ? "light" : "dark",
        isLite: liteChar === "1",
        tier,
        focusCourse: focusRaw.toUpperCase() || "ALL",
        completedNotes,
        lastVisited,
      },
    };
  } catch {
    return {
      ok: false,
      error: "Failed to decode progress payload.",
    };
  }
}
