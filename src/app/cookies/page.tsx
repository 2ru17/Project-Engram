import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie & Local Storage Policy",
  description:
    "Detailed breakdown of essential localStorage keys, performance caching cookies, onboarding states, and consent preferences in Project Engram.",
  alternates: {
    canonical: "/cookies",
  },
};

const STORAGE_KEYS = [
  {
    key: "engram-universe",
    type: "localStorage",
    classification: "Essential UI State",
    purpose:
      "Stores your active Design Universe (cyber-zen, neo-brutalism, minimalism, parallax, or broken-grid).",
    persistence: "Persistent until cleared",
  },
  {
    key: "engram-theme",
    type: "localStorage",
    classification: "Essential UI State",
    purpose:
      "Stores Dark or Light polarity when using the Cyber-Zen default universe.",
    persistence: "Persistent until cleared",
  },
  {
    key: "engram-perf",
    type: "localStorage",
    classification: "Essential UI State",
    purpose:
      "Stores FULL vs LITE visual performance mode for hardware-constrained sessions.",
    persistence: "Persistent until cleared",
  },
  {
    key: "engram-study-plan-v2",
    type: "localStorage",
    classification: "Essential Study State",
    purpose:
      "Persists completed monograph slugs, selected study plan tier, pinned focus course, and last visited note.",
    persistence: "Persistent until reset",
  },
  {
    key: "engram-cookie-consent",
    type: "localStorage",
    classification: "Consent Preference",
    purpose:
      "Records your banner selection ('accepted' or 'essential') so the consent bar does not re-appear.",
    persistence: "Persistent until cleared",
  },
  {
    key: "engram-seen-changelog",
    type: "localStorage",
    classification: "UI Notification State",
    purpose:
      "Tracks the latest changelog version reviewed in the Update Log modal to clear the unread dot.",
    persistence: "Persistent until updated",
  },
  {
    key: "engram-perf-cache",
    type: "First-party Cookie",
    classification: "Performance Cache",
    purpose:
      "Marks performance asset caching enabled across sessions with SameSite=Lax.",
    persistence: "Up to 365 days",
  },
  {
    key: "engram-telemetry-ack",
    type: "Cookie & localStorage",
    classification: "Consent Preference",
    purpose:
      "Maintains acknowledgment state ('true' or 'essential') for runtime diagnostics and caching.",
    persistence: "Up to 365 days",
  },
];

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-[var(--zen-void)] text-[var(--zen-frost)] py-14 px-4 sm:px-8 transition-colors duration-500">
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="border-b border-[var(--zen-border)] pb-6 space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--zen-cyan)] font-semibold">
            <span>GOVERNANCE // LEGAL RECORD 03</span>
            <span>·</span>
            <span>LOCAL STORAGE &amp; COOKIES</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl font-semibold tracking-wider uppercase text-[var(--zen-snow)]"
            style={{ fontFamily: "var(--font-zen-display, serif)" }}
          >
            Cookie &amp; Storage Policy
          </h1>
          <p className="text-sm text-[var(--zen-ink-muted)] leading-[1.65]">
            Project Engram uses zero advertising, cross-site retargeting, or third-party behavioral cookies. All client storage is limited to essential UI preferences, study state persistence, and optional performance caching.
          </p>
        </header>

        <section className="space-y-4">
          <h2
            className="text-lg sm:text-xl font-semibold uppercase tracking-wider text-[var(--zen-snow)] flex items-center gap-2"
            style={{ fontFamily: "var(--font-zen-display, serif)" }}
          >
            <span className="text-[var(--zen-cyan)] text-sm" aria-hidden="true">
              ◇
            </span>
            <span>Inventory of Storage Keys &amp; Cookies</span>
          </h2>
          <div className="overflow-x-auto rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] shadow-lg">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead className="border-b border-[var(--zen-border)] bg-[var(--zen-void)]/80 font-mono text-[11px] uppercase tracking-wider text-[var(--zen-cyan)]">
                <tr>
                  <th className="px-4 py-3">Key / Name</th>
                  <th className="px-4 py-3">Mechanism</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--zen-border)]/50">
                {STORAGE_KEYS.map((item) => (
                  <tr
                    key={item.key}
                    className="hover:bg-[var(--zen-cyan)]/[0.04] transition-colors"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-[var(--zen-cyan)] whitespace-nowrap">
                      {item.key}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--zen-snow)] whitespace-nowrap">
                      {item.type}
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--zen-ink-muted)] whitespace-nowrap">
                      {item.classification}
                    </td>
                    <td className="px-4 py-3 text-xs leading-relaxed text-[var(--zen-frost)]">
                      {item.purpose}{" "}
                      <span className="block text-[10px] font-mono text-[var(--zen-ink-muted)] mt-1">
                        Retention: {item.persistence}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h2
            className="text-lg sm:text-xl font-semibold uppercase tracking-wider text-[var(--zen-snow)] flex items-center gap-2"
            style={{ fontFamily: "var(--font-zen-display, serif)" }}
          >
            <span className="text-[var(--zen-cyan)] text-sm" aria-hidden="true">
              ◇
            </span>
            <span>Managing or Clearing Storage</span>
          </h2>
          <p className="text-sm sm:text-base leading-[1.65] text-[var(--zen-frost)]">
            When the bottom-right consent banner appears, choosing{" "}
            <strong className="text-[var(--zen-snow)]">Essential Only</strong> disables optional performance cache cookies while preserving your local theme, simulator controls, and study plan progress. You may clear all keys at any time via your browser developer tools or site settings.
          </p>
        </section>

        <footer className="pt-8 border-t border-[var(--zen-border)] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/terms"
              className="text-[var(--zen-cyan)] hover:text-[var(--zen-snow)] underline underline-offset-4"
            >
              TERMS OF SERVICE
            </Link>
            <Link
              href="/privacy"
              className="text-[var(--zen-cyan)] hover:text-[var(--zen-snow)] underline underline-offset-4"
            >
              PRIVACY POLICY
            </Link>
          </div>
          <Link
            href="/"
            className="px-4 py-2 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] bg-[var(--zen-card)] text-[var(--zen-snow)] hover:text-[var(--zen-cyan)] transition-colors"
          >
            ← RETURN HOME
          </Link>
        </footer>
      </div>
    </main>
  );
}
