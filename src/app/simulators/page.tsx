"use client";

import { useState, useMemo, useCallback, useEffect, useRef, Suspense, useId } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  SIMULATOR_LIST,
  SimulatorMeta,
  resolveSimulator,
} from "@/lib/simulator-registry";
import { SimulatorRenderer } from "@/components/simulators/SimulatorRenderer";
import { SimulatorWorkbenchSkeleton } from "@/components/ui/Skeleton";

const DOMAIN_TABS = [
  { id: "all", label: `ALL LABS (${SIMULATOR_LIST.length})` },
  { id: "systems", label: "SYSTEMS & ARCHITECTURE" },
  { id: "security", label: "NETWORKS & SECURITY" },
  { id: "theory", label: "THEORY & ALGORITHMS" },
  { id: "software", label: "SOFTWARE & DATABASES" },
];

function SimulatorStudioContent() {
  const searchInputId = useId();
  const courseFilterId = useId();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlParamId = searchParams.get("id") || searchParams.get("sim");
  const selectedSim = useMemo(() => resolveSimulator(urlParamId), [urlParamId]);
  const [activeDomain, setActiveDomain] = useState<string>("all");
  const [activeCourse, setActiveCourse] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const allCourseCodes = useMemo(
    () => Array.from(new Set(SIMULATOR_LIST.flatMap((s) => s.courses))).sort(),
    []
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "/") return;
      const target = e.target as HTMLElement | null;
      const tagName = target?.tagName?.toLowerCase();
      if (
        tagName === "input" ||
        tagName === "textarea" ||
        tagName === "select" ||
        target?.isContentEditable
      ) {
        return;
      }
      e.preventDefault();
      searchInputRef.current?.focus();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelectSim = useCallback(
    (sim: SimulatorMeta) => {
      router.replace(`/simulators?id=${sim.id}`, { scroll: false });
    },
    [router]
  );

  const filteredSims = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return SIMULATOR_LIST.filter((sim) => {
      const matchesDomain =
        activeDomain === "all" || sim.domain === activeDomain;
      if (!matchesDomain) return false;
      const matchesCourse =
        activeCourse === "ALL" || sim.courses.includes(activeCourse);
      if (!matchesCourse) return false;
      if (!q) return true;
      return (
        sim.title.toLowerCase().includes(q) ||
        sim.description.toLowerCase().includes(q) ||
        sim.category.toLowerCase().includes(q) ||
        sim.courses.some((c) => c.toLowerCase().includes(q)) ||
        sim.keyConcepts.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [activeDomain, activeCourse, searchQuery]);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8 border-b border-[var(--zen-border)] pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="w-2.5 h-2.5 rounded-full bg-[var(--zen-cyan)] animate-pulse"
            aria-hidden="true"
          />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[var(--zen-cyan)] font-semibold">
            PROJECT ENGRAM // V2 INTERACTIVE STUDIO
          </span>
        </div>
        <h1
          className="text-2xl sm:text-4xl font-bold uppercase tracking-wider text-[var(--zen-snow)] mb-3"
          style={{ fontFamily: "var(--font-zen-display, serif)" }}
        >
          Computer Science Workbenches &amp; Simulators
        </h1>
        <p className="text-sm text-[var(--zen-frost)]/80 max-w-3xl leading-relaxed">
          Curriculum-mapped interactive engineering simulations across Computer Science, Systems, Networking, Cybersecurity, and Software Engineering.
          Experiment directly with instruction pipelines, memory paging, IEEE 754 precision, network subnetting, TCP sliding windows, Raft consensus, and OWASP exploit sanitization.
        </p>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mt-6">
          <div className="flex flex-wrap gap-2">
            {DOMAIN_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveDomain(tab.id)}
                className={`min-h-[38px] px-3 py-1.5 font-mono text-xs rounded border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)] ${
                  activeDomain === tab.id
                    ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold shadow-[0_0_12px_rgba(0,229,255,0.2)]"
                    : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:bg-[var(--zen-card-hover)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div>
              <label htmlFor={courseFilterId} className="sr-only">
                Filter by Course Code
              </label>
              <select
                id={courseFilterId}
                aria-label="Filter simulators by course code"
                value={activeCourse}
                onChange={(e) => setActiveCourse(e.target.value)}
                className="min-h-[40px] w-full sm:w-44 bg-[var(--zen-card)] border border-[var(--zen-border)] rounded-lg px-2.5 py-1.5 font-mono text-xs text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)] focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
              >
                <option value="ALL">ALL COURSES ({allCourseCodes.length})</option>
                {allCourseCodes.map((code) => (
                  <option key={code} value={code}>
                    COURSE: {code}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full sm:w-64 relative">
              <label htmlFor={searchInputId} className="sr-only">
                Search Simulators
              </label>
              <input
                ref={searchInputRef}
                id={searchInputId}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by course or topic (/)..."
                className="min-h-[40px] w-full bg-[var(--zen-card)] border border-[var(--zen-border)] rounded-lg px-3 py-1.5 font-mono text-xs text-[var(--zen-snow)] placeholder:text-[var(--zen-ink-muted)] focus:outline-none focus:border-[var(--zen-cyan)] focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-2.5 max-h-[85vh] overflow-y-auto pr-1">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-ink-muted)] block mb-2 px-1">
            SELECT WORKBENCH ({filteredSims.length})
          </span>
          {filteredSims.length === 0 ? (
            <div className="p-4 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] text-xs font-mono text-[var(--zen-ink-muted)]">
              No simulators matching filter [{searchQuery}].
            </div>
          ) : (
            filteredSims.map((sim) => {
              const isSelected = selectedSim.id === sim.id;
              return (
                <button
                  key={sim.id}
                  type="button"
                  onClick={() => handleSelectSim(sim)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all universe-card flex flex-col gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--zen-cyan)] ${
                    isSelected
                      ? "border-[var(--zen-cyan)] border-l-4 border-l-[var(--zen-cyan)] bg-[var(--zen-midnight)] shadow-[0_0_15px_rgba(0,71,255,0.15)]"
                      : "border-[var(--zen-border)] bg-[var(--zen-card)] hover:border-[var(--zen-slate-edge)] hover:bg-[var(--zen-card-hover)]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono tracking-wider text-[var(--zen-cyan)] uppercase font-semibold">
                      {sim.domainLabel}
                    </span>
                    <div className="flex gap-1">
                      {sim.courses.slice(0, 3).map((c) => (
                        <span
                          key={c}
                          className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-[var(--zen-void)] border border-[var(--zen-border)] text-[var(--zen-ink-muted)]"
                        >
                          {c}
                        </span>
                      ))}
                      {sim.courses.length > 3 && (
                        <span className="text-[8px] font-mono px-1 text-[var(--zen-ink-muted)]">
                          +{sim.courses.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="font-bold text-sm text-[var(--zen-snow)] tracking-wide">
                    {sim.title}
                  </div>
                  <div className="text-[11px] text-[var(--zen-ink-muted)] line-clamp-2">
                    {sim.description}
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="lg:col-span-8 space-y-6">
          <SimulatorRenderer simulatorId={selectedSim.id} />

          <div className="p-4 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card">
            <span className="text-[10px] font-mono text-[var(--zen-cyan)] tracking-widest uppercase font-semibold block mb-2">
              CURRICULUM SPECIFICATION &amp; CONCEPTS
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedSim.keyConcepts.map((kc, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded bg-[var(--zen-void)] border border-[var(--zen-border)] font-mono text-xs text-[var(--zen-frost)]"
                >
                  {kc}
                </span>
              ))}
            </div>
            <div className="mt-3 text-xs font-mono text-[var(--zen-ink-muted)]">
              Mapped Courses: {selectedSim.courses.join(", ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SimulatorStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <SimulatorWorkbenchSkeleton />
        </div>
      }
    >
      <SimulatorStudioContent />
    </Suspense>
  );
}
