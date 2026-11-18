import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Zero-account privacy architecture, local storage state keys, stateless EG2 profile sync codes, and anonymous Web Vitals telemetry on Project Engram.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--zen-void)] text-[var(--zen-frost)] py-14 px-4 sm:px-8 transition-colors duration-500">
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="border-b border-[var(--zen-border)] pb-6 space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--zen-cyan)] font-semibold">
            <span>GOVERNANCE // LEGAL RECORD 02</span>
            <span>·</span>
            <span>ZERO-ACCOUNT ARCHITECTURE</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl font-semibold tracking-wider uppercase text-[var(--zen-snow)]"
            style={{ fontFamily: "var(--font-zen-display, serif)" }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--zen-ink-muted)] leading-[1.65]">
            Project Engram is engineered around a stateless, zero-account architecture. We do not collect user accounts, passwords, email addresses, or personal behavioral profiles.
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
            <span>1. Client-Side Local Storage &amp; Stateless Sync</span>
          </h2>
          <p className="text-sm sm:text-base leading-[1.65] text-[var(--zen-frost)]">
            Your reading progress, selected Design Universe, dark/light color preference, performance mode, and study plan tier remain strictly on your device inside browser <code className="px-1.5 py-0.5 rounded bg-[var(--zen-card)] border border-[var(--zen-border)] font-mono text-xs text-[var(--zen-cyan)]">localStorage</code>. When you export an <code className="px-1.5 py-0.5 rounded bg-[var(--zen-card)] border border-[var(--zen-border)] font-mono text-xs text-[var(--zen-cyan)]">EG2-...</code> progress code, that snapshot is encoded locally in your browser with a CRC16 integrity checksum and is never transmitted to or stored on a Project Engram database.
          </p>
        </section>

        <section className="space-y-4">
          <h2
            className="text-lg sm:text-xl font-semibold uppercase tracking-wider text-[var(--zen-snow)] flex items-center gap-2"
            style={{ fontFamily: "var(--font-zen-display, serif)" }}
          >
            <span className="text-[var(--zen-cyan)] text-sm" aria-hidden="true">
              ◇
            </span>
            <span>2. Anonymous Analytics &amp; Performance Telemetry</span>
          </h2>
          <div className="p-5 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-3 text-sm leading-[1.65]">
            <p className="text-[var(--zen-frost)]">
              Hosted deployments utilize Vercel Analytics strictly to measure aggregated Core Web Vitals (page load latency, CLS, LCP) and runtime health without cross-site tracking cookies, fingerprinting, or third-party advertising networks.
            </p>
            <p className="text-[var(--zen-ink-muted)]">
              You can inspect every client-side storage key and consent option on the{" "}
              <Link
                href="/cookies"
                className="text-[var(--zen-cyan)] hover:text-[var(--zen-snow)] underline underline-offset-4"
              >
                Cookie &amp; Local Storage Policy
              </Link>{" "}
              page.
            </p>
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
            <span>3. Third-Party Links &amp; Font Delivery</span>
          </h2>
          <p className="text-sm sm:text-base leading-[1.65] text-[var(--zen-frost)]">
            External links (such as GitHub repository pages, GitHub Discussions, and Issue trackers) open in a new tab with <code className="px-1.5 py-0.5 rounded bg-[var(--zen-card)] border border-[var(--zen-border)] font-mono text-xs text-[var(--zen-cyan)]">rel=&quot;noopener noreferrer&quot;</code> and are governed by the respective third-party privacy policies once navigated. Typography stylesheets are fetched over HTTPS from Google Fonts and KaTeX styling assets with standard browser transport headers.
          </p>
        </section>

        <section className="space-y-4">
          <h2
            className="text-lg sm:text-xl font-semibold uppercase tracking-wider text-[var(--zen-snow)] flex items-center gap-2"
            style={{ fontFamily: "var(--font-zen-display, serif)" }}
          >
            <span className="text-[var(--zen-cyan)] text-sm" aria-hidden="true">
              ◇
            </span>
            <span>4. Your Data Control &amp; Erasure Rights</span>
          </h2>
          <p className="text-sm sm:text-base leading-[1.65] text-[var(--zen-frost)]">
            Because all personal study state is stored client-side, you hold complete ownership and instant erasure control: you can reset your progress anytime inside the <strong className="text-[var(--zen-snow)]">Study Plan &amp; EG2 Sync</strong> modal or clear site storage in your browser settings.
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
              href="/cookies"
              className="text-[var(--zen-cyan)] hover:text-[var(--zen-snow)] underline underline-offset-4"
            >
              COOKIE POLICY
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
