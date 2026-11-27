import type { Metadata } from "next";
import Link from "next/link";
import { TOTAL_COURSE_COUNT, TOTAL_MONOGRAPH_COUNT } from "@/lib/course-registry";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service, MIT open-source license terms, educational use disclaimer, and laboratory simulator integrity rules for Project Engram.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--zen-void)] text-[var(--zen-frost)] py-14 px-4 sm:px-8 transition-colors duration-500">
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="border-b border-[var(--zen-border)] pb-6 space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--zen-cyan)] font-semibold">
            <span>GOVERNANCE // LEGAL RECORD 01</span>
            <span>·</span>
            <span>EFFECTIVE 2026</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl font-semibold tracking-wider uppercase text-[var(--zen-snow)]"
            style={{ fontFamily: "var(--font-zen-display, serif)" }}
          >
            Terms of Service
          </h1>
          <p className="text-sm text-[var(--zen-ink-muted)] leading-[1.65]">
            Conditions governing access to the Project Engram Computer Science academic archive, relational concept graph, and interactive simulation workbenches.
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
            <span>1. Educational &amp; Pedagogical Use Disclaimer</span>
          </h2>
          <p className="text-sm sm:text-base leading-[1.65] text-[var(--zen-frost)]">
            Project Engram provides curated Computer Science lecture monographs, mathematical derivations, assessments, and engineering simulators solely for educational, academic reference, and personal study purposes. While every effort is made to maintain technical accuracy across all {TOTAL_COURSE_COUNT} courses and {TOTAL_MONOGRAPH_COUNT} monographs, the archive does not replace official institutional syllabi, formal verification standards, or professional engineering review.
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
            <span>2. Open-Source MIT License &amp; Intellectual Property</span>
          </h2>
          <p className="text-sm sm:text-base leading-[1.65] text-[var(--zen-frost)]">
            The Project Engram platform source code and original interactive simulators are released under the{" "}
            <a
              href="https://github.com/2ru17/Project-Engram/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--zen-cyan)] hover:text-[var(--zen-snow)] underline underline-offset-4"
            >
              MIT License
            </a>
            . You are permitted to inspect, fork, study, and build upon the application code provided that copyright and permission notices are preserved in substantial copies. Third-party open-source packages (such as Next.js, React, KaTeX, Mermaid, and DOMPurify) remain subject to their respective upstream licenses.
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
            <span>3. Acceptable Use &amp; Laboratory Simulator Integrity</span>
          </h2>
          <div className="p-5 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] space-y-3 text-sm leading-[1.65]">
            <p className="text-[var(--zen-frost)]">
              Interactive security, networking, and cryptography workbenches (including the OWASP Exploit Sanitizer, Cryptographic Cipher Inspector, and Avalanche &amp; Diffie-Hellman Lab) operate strictly client-side in sandboxed educational simulations.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[var(--zen-ink-muted)]">
              <li>
                Security concepts, injection payloads, and cipher breakdowns are presented strictly for defensive engineering and authorized coursework understanding.
              </li>
              <li>
                You agree not to deploy techniques studied here against systems without explicit written authorization, and not to attempt automated scraping, denial-of-service, or tampering against hosted Project Engram deployments.
              </li>
              <li>
                Classical ciphers and reduced-bit-width cryptographic demonstrations in the simulators are pedagogical models and must never be used to protect real production secrets.
              </li>
            </ul>
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
            <span>4. Limitation of Liability &amp; Warranty</span>
          </h2>
          <p className="text-sm sm:text-base leading-[1.65] text-[var(--zen-frost)]">
            Project Engram is provided &ldquo;as is&rdquo;, without warranty of any kind, express or implied, including merchantability, fitness for a particular purpose, or non-infringement. In no event shall the authors or contributors be liable for any direct, indirect, incidental, or consequential damages arising from the use of study materials, simulator outputs, or exported documents.
          </p>
        </section>

        <footer className="pt-8 border-t border-[var(--zen-border)] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/privacy"
              className="text-[var(--zen-cyan)] hover:text-[var(--zen-snow)] underline underline-offset-4"
            >
              PRIVACY POLICY
            </Link>
            <Link
              href="/cookies"
              className="text-[var(--zen-cyan)] hover:text-[var(--zen-snow)] underline underline-offset-4"
            >
              COOKIE POLICY
            </Link>
            <a
              href="https://github.com/2ru17/Project-Engram"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--zen-ink-muted)] hover:text-[var(--zen-cyan)]"
            >
              GITHUB REPOSITORY ↗
            </a>
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
