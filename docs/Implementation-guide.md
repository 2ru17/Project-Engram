# Project Engram: Implementation & Developer Guide

> **Location:** `docs/Implementation-guide.md` | **Focus:** Workflows, Code Patterns, & Verification

## 1. Purpose
While **[DESIGN.md](./DESIGN.md)** explains *why* **Project Engram** is architected the way it is and **[Structure.md](./Structure.md)** shows *where* files live, this guide provides the concrete **step-by-step engineering workflows** for building interactive simulators, extending the content/MCQ pipeline, optimizing canvas performance, and shipping clean pull requests.

---

## 2. Workflow A: Building & Registering a New Simulator Workbench

All pedagogical simulators follow a 3-step registration contract so they automatically appear on the `/simulators` hub, inside the Singularity Graph telemetry drawer, and in `CourseSimulatorDock` on matching course notes.

### Step 1: Create the Workbench Component (`src/components/simulators/[FeatureName]Workbench.tsx`)
Wrap your interactive visualization inside `SimulatorWorkbenchShell` to inherit standardized transport controls (`Play/Pause`, `Step`, `Reset`), preset selectors, and theme tokens:

```tsx
"use client";

import React, { useState, useCallback } from "react";
import { SimulatorWorkbenchShell } from "./shared/SimulatorWorkbenchShell";

export interface PipelineStepState {
  cycle: number;
  stages: { IF: string; ID: string; EX: string; MEM: string; WB: string };
  hazardDetected: string | null;
}

const PRESETS = [
  { id: "raw-forwarding", label: "RAW Data Hazard (ALU-to-ALU Forwarding)" },
  { id: "load-use-stall", label: "Load-Use Hazard (1-Cycle Bubble Stall)" },
  { id: "branch-flush", label: "Control Hazard (Branch Flush)" },
];

export function PipelineHazardWorkbench() {
  const [cycle, setCycle] = useState<number>(0);
  const [activePreset, setActivePreset] = useState<string>(PRESETS[0].id);

  const handleStepForward = useCallback(() => {
    setCycle((prev) => prev + 1);
  }, []);

  const handleReset = useCallback(() => {
    setCycle(0);
  }, []);

  return (
    <SimulatorWorkbenchShell
      title="RISC-V 5-Stage Pipeline & Hazard Forwarding Unit"
      domain="systems"
      courses={["CSARCH1", "CSARCH2", "LBYARCH"]}
      presets={PRESETS}
      activePresetId={activePreset}
      onSelectPreset={setActivePreset}
      cycle={cycle}
      onStepForward={handleStepForward}
      onReset={handleReset}
    >
      {/* Interactive Visual Canvas & Register Telemetry Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Pipeline Stage Matrix */}
      </div>
    </SimulatorWorkbenchShell>
  );
}
```

### Step 2: Register Metadata in `src/lib/simulator-registry.ts`
Add your simulator to `SIMULATOR_REGISTRY` and map any shorthand slugs in `SIMULATOR_ALIASES`:

```typescript
// src/lib/simulator-registry.ts
export const SIMULATOR_REGISTRY: SimulatorMeta[] = [
  // ...existing simulators
  {
    id: "pipeline-hazard-workbench",
    title: "5-Stage Pipeline & Hazard Forwarding Unit",
    summary: "Cycle-accurate RISC-V instruction pipeline visualizing RAW/load-use hazards, forwarding paths, and stall bubbles.",
    domain: "systems",
    courses: ["CSARCH1", "CSARCH2", "LBYARCH"],
  },
];
```

### Step 3: Wire the Component in `src/components/simulators/SimulatorRenderer.tsx`
Add the `case` branch matching your registry `id` so dynamic routes and docks can mount it. Native-shell workbenches must also be added to `NATIVE_SHELL_IDS`. The shell prop is `activePresetId` (not `activePreset`).

### Embedding diagrams in notes
- Workbench: a ```` ```simulator:<id> ```` fence; the body holds an ASCII fallback of at most 78 columns.
- Circuit scene: a ```` ```circuit:<id> ```` fence, with `<id>` defined in `src/lib/diagram-registry.ts` (parts, elements, wires, params, readouts, and a behavior key). Keep the ASCII version in the fence body; it is shown in Obsidian, in print, and in the collapsed "Text version" panel.
- Every number on screen must come from the note's Key Formulas, Worked Examples, or Laboratory Recap.

---

## 3. Workflow B: Asynchronous Content Loading & Content-Hash Caching

Never use synchronous `fs` methods (`fs.readFileSync`, `fs.readdirSync`). Always use `fs.promises` paired with an in-memory content-hash / `mtimeMs` cache so repeated route visits or graph builds execute in $< 5\text{ ms}$.

```typescript
// src/lib/content-loader.ts
import fs from "fs/promises";
import { sanitizeHtml } from "@/lib/sanitize";

interface CachedNoteEntry {
  mtimeMs: number;
  parsed: ParsedMonograph;
}

const monographCache = new Map<string, CachedNoteEntry>();

export async function loadMonographByPath(filePath: string): Promise<ParsedMonograph> {
  const stat = await fs.stat(filePath);
  const cached = monographCache.get(filePath);

  if (cached && cached.mtimeMs === stat.mtimeMs) {
    return cached.parsed;
  }

  const rawContent = await fs.readFile(filePath, "utf-8");
  const normalized = rawContent.replace(/\r\n/g, "\n");

  // 1. Parse YAML frontmatter, slice Interactive MCQ block, & render sanitized HTML
  const parsed = await parseMonographMarkdown(normalized);
  parsed.sanitizedHtml = sanitizeHtml(parsed.rawHtml);

  monographCache.set(filePath, { mtimeMs: stat.mtimeMs, parsed });
  return parsed;
}
```

---

## 4. Workflow C: Interactive MCQ Parser Contract (`mcq-parser.ts` & `MCQSection.tsx`)

To guarantee $100\%$ mount reliability for `MCQSection.tsx` across all 606+ monographs:

1. **Clean Section Boundary Slicing**:
   Always slice the MCQ section starting at `^##+\s*Multiple Choice Questions.*$` and stop strictly before `^##+\s*References\s*&\s*Navigation` (or any subsequent `^##\s+` H2 heading or `^---\s*$` divider):
   ```typescript
   const mcqSectionRegex =
     /^##+\s*Multiple Choice Questions[^\n]*\n([\s\S]*?)(?=^##+\s*References\s*&\s*Navigation|^##\s+(?!#)|^---\s*$|\Z)/m;
   ```
2. **Option, Question-Type & Answer Key Tolerance**:
   * Supports four deterministic question types: standard single-choice (`A)-D)`), multiple-select (`[MSQ]`), exact text/numeric solving (`[INPUT]`), and inline/table fill-in-the-blanks (`[BLANK]`).
   * While vault files are standardized to 4-space indented options (`    - **A)** `), the parser regex must tolerate $2\text{–}4$ spaces or a tab (`^[ \t]{2,4}[-*]\s+\*\*([A-D])[).]\*\*\s+(.+)$`).
   * Match each question index $i \in \{1, \dots, N\}$ with its corresponding explanation in `### Answer Key & Explanations` (`^(\d+)\.\s+\*\*([A-D](?:\s*,\s*[A-D])*|\[[^\]]+\])[).]*\*\*`).
3. **Diagnostic Warning on Parse Failure**:
   If a standard note contains the string `"Multiple Choice Questions"` but yields `questions.length === 0`, emit `console.warn("[MCQ_PARSE_FAILURE]:", filePath)` so `npm run validate:notes` flags it immediately.

---

## 5. Workflow D: Singularity Graph $60\text{ FPS}$ Canvas Engineering

When modifying the Knowledge Graph (`src/components/graph/`):
1. **Offscreen Sprite Pre-Rendering**: Never invoke `ctx.createRadialGradient(...)` inside the per-frame `nodeCanvasObject` loop for 560+ nodes. Pre-render the Black Hole Singularity accretion disk and Course Star glow sprites onto offscreen `<canvas>` elements inside a `useMemo` keyed only by the active `universe` and theme mode.
2. **Strict `useCallback` Wrapping**: Wrap `nodeCanvasObject`, `linkCanvasObject`, `onNodeHover`, and `onNodeClick` in `useCallback` so `ForceGraph2D` never restarts its D3 force simulation unnecessarily.
3. **Framer Motion Easing**: All HUD drawers and universe transitions must use `ease: [0.16, 1, 0.3, 1]` and list staggers of `staggerChildren: 0.05`.

---

## 6. Workflow E: Direct In-Repo Content Authoring

Monographs live directly inside `./content/Main Notes/` and require no external vault sync step:

1. Edit or create `.md` monographs directly inside `./content/Main Notes/<Year>/<Term>/<COURSE_CODE>/Module XX - <Topic>/` (using any IDE or by opening `./content/Main Notes/` directly as an Obsidian vault — `.obsidian/`, `.trash/`, and `*.excalidraw.bak` are ignored via `.gitignore`).
2. Run `npm run validate:notes` to verify YAML frontmatter, callout metadata, and interactive assessment syntax (`A)-D)`, `[MSQ]`, `[INPUT]`, `[BLANK]`).
3. Run `npm run build` to verify static route generation before committing.

---

## 7. Testing & Verification Strategy

1. **Automated Vault & Assessment Gate (`npm run validate:notes`)**:
   * Scans `content/Main Notes/` in under $3\text{ s}$ using `fs.promises`.
   * Verifies `Module XX - Topic` directory naming, zero Hollow Modules, unique YAML `id` fields, `> [!info] Document Metadata` callouts, zero emojis (`**Tags:**`), $100\%$ `MCQSection.tsx` parse success across `A)-D)`, `[MSQ]`, `[INPUT]`, and `[BLANK]` questions, zero dummy MCQ regex matches, and valid Mermaid v12 syntax.
2. **Unit Tests (`*.spec.ts`)**:
   * Test `mcq-parser.ts` against canonical blocks, `[MSQ]`/`[INPUT]`/`[BLANK]` variants, CRLF line endings, inline LaTeX/code options, and trailing `## References & Navigation` sections (target $< 10\text{ ms}$ per test).
3. **Production Build Gate (`npm run build`)**:
   * Confirms all static and dynamic routes (`notes/[...slug]`, `/simulators`), TypeScript types, and JSON-LD structured data compile with zero errors.

---

## 8. Pull Request Verification Checklist

* [ ] **Async I/O**: Zero `fs.readFileSync`, `fs.readdirSync`, or `fs.statSync` calls in `src/` or `scripts/`.
* [ ] **XSS Protection**: All rendered HTML is sanitized via `@/lib/sanitize` (`dompurify` client + pure-JS SSR fallback).
* [ ] **5-Universe & A11y Compliance**: Tested across `cyber-zen`, `neo-brutalism`, `minimalism`, `parallax`, and `broken-grid`; cards follow Fitts's Law (`<a>` wrapper with `aria-label` + inner `<div aria-hidden="true">`); all inputs have `<label>` associations.
* [ ] **Vault & MCQ Integrity**: `npm run validate:notes` passes with $0$ errors and $100\%$ Interactive MCQ parse rate.
* [ ] **Clean Repository Tree**: Zero AI-agent config files, scratch dumps, or temporary logs staged in Git.