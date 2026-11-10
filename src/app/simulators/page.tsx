"use client";

import { useState, useEffect, Suspense, useId } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { SIMULATOR_LIST, SimulatorMeta, resolveSimulator } from "@/lib/simulator-registry";
import { SimulatorRenderer } from "@/components/simulators/SimulatorRenderer";

function SimulatorStudioContent() {
  const searchInputId = useId();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedSim, setSelectedSim] = useState<SimulatorMeta>(() =>
    resolveSimulator(searchParams.get("id"))
  );
  const [activeDomain, setActiveDomain] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const idFromUrl = searchParams.get("id");
    if (idFromUrl) {
      const match = resolveSimulator(idFromUrl);
      if (match) setSelectedSim(match);
    }
  }, [searchParams]);

  const handleSelectSim = (sim: SimulatorMeta) => {
    setSelectedSim(sim);
    router.replace(`/simulators?id=${sim.id}`, { scroll: false });
  };

  const q = searchQuery.toLowerCase().trim();
  const filteredSims = SIMULATOR_LIST.filter((sim) => {
    const matchesDomain = activeDomain === "all" || sim.domain === activeDomain;
    if (!matchesDomain) return false;
    if (!q) return true;
    return (
      sim.title.toLowerCase().includes(q) ||
      sim.description.toLowerCase().includes(q) ||
      sim.category.toLowerCase().includes(q) ||
      sim.courses.some((c) => c.toLowerCase().includes(q)) ||
      sim.keyConcepts.some((k) => k.toLowerCase().includes(q))
    );
  });

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Studio Header */}
      <div className="mb-8 border-b border-[var(--zen-border)] pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--zen-cyan)] animate-pulse" />
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[var(--zen-cyan)] font-semibold">
            PROJECT ENGRAM // V2 INTERACTIVE STUDIO
          </span>
        </div>
        <h1
          className="text-2xl sm:text-4xl font-bold uppercase tracking-wider text-[var(--zen-snow)] mb-3"
          style={{ fontFamily: "var(--font-zen-display, serif)" }}
        >
          Computer Science Workbenches & Simulators
        </h1>
        <p className="text-sm text-[var(--zen-frost)]/80 max-w-3xl leading-relaxed">
          Curriculum-mapped interactive engineering simulations across Computer Science, Systems, Networking, Cybersecurity, and Software Engineering.
          Experiment directly with instruction pipelines, memory paging, IEEE 754 precision, network subnetting, TCP sliding windows, Raft consensus, and OWASP exploit sanitization.
        </p>

        {/* Search and Domain Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
          {/* Domain Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "ALL LABS (18)" },
              { id: "systems", label: "SYSTEMS & ARCHITECTURE" },
              { id: "security", label: "NETWORKS & SECURITY" },
              { id: "theory", label: "THEORY & ALGORITHMS" },
              { id: "software", label: "SOFTWARE & DATABASES" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveDomain(tab.id)}
                className={`px-3 py-1.5 font-mono text-xs rounded border transition-all ${
                  activeDomain === tab.id
                    ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold shadow-[0_0_12px_rgba(0,229,255,0.2)]"
                    : "border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:bg-[var(--zen-card-hover)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Filter Input */}
          <div className="w-full md:w-64">
            <label htmlFor={searchInputId} className="sr-only">Search Simulators</label>
            <input
              id={searchInputId}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by course or topic..."
              className="w-full bg-[var(--zen-card)] border border-[var(--zen-border)] rounded-lg px-3 py-1.5 font-mono text-xs text-[var(--zen-snow)] placeholder:text-[var(--zen-ink-muted)] focus:outline-none focus:border-[var(--zen-cyan)]"
            />
          </div>
        </div>
      </div>

      {/* Studio Stage Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Lab Navigation */}
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
                  onClick={() => handleSelectSim(sim)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all universe-card flex flex-col gap-1.5 ${
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

        {/* Active Simulator Stage */}
        <div className="lg:col-span-8 space-y-6">
          <SimulatorRenderer simulatorId={selectedSim.id} />

          {/* Key Concepts Reference Footer */}
          <div className="p-4 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card">
            <span className="text-[10px] font-mono text-[var(--zen-cyan)] tracking-widest uppercase font-semibold block mb-2">
              CURRICULUM SPECIFICATION & CONCEPTS
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
        <div className="min-h-screen pt-32 text-center font-mono text-xs text-[var(--zen-ink-muted)]">
          INITIALIZING INTERACTIVE CS STUDIO...
        </div>
      }
    >
      <SimulatorStudioContent />
    </Suspense>
  );
}
