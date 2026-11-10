# Contributing to Project Engram

Thank you for your interest in contributing to Project Engram. This document details the engineering guidelines, living documentation governance, and contribution workflow required to maintain our academic knowledge repository.

---

## 1. Core Principles & Invariants

All contributions must strictly respect the architectural rules of Project Engram:

1. **Locked Cyber-Zen Tech-Noir Aesthetic**: The Cyber-Zen theme design tokens, font hierarchy, and color palettes are locked. Do not modify global color definitions or replace established design variables without explicit coordinator consensus.
2. **Decoupled Architecture**: Code resides in `Project-Engram/` while academic content is mounted under `content/`. Extraneous files, build dumps, or test logs must remain outside the repository directory.
3. **Cookie & Telemetry Ethics**: Performance caching and state persistence rely strictly on local storage and first-party cookies (`engram-perf-cache`, `engram-telemetry-ack`). Vercel Analytics is restricted to runtime error diagnosis without advertising cookies or PII collection.
4. **No Direct Master/Main Pushes**: All work must be conducted on feature branches and submitted via structured pull requests with clean builds.

---

## 2. Development Setup

### Prerequisites
- Node.js 20 or higher
- npm (default package manager across this project)
- Git configured with appropriate directory-scoped identities

### Clone and Install
```bash
git clone https://github.com/2ru17/Project-Engram.git
cd Project-Engram
npm install
```

### Running Locally
```bash
npm run dev
```
Access the application at `http://localhost:3000`.

### Verifying Build and Types
Always ensure that the project compiles with zero errors before submitting any patch:
```bash
npm run build
```

---

## 3. Authoring New Simulators

Simulators provide interactive pedagogical laboratories for students. When contributing a new simulator workbench:

1. **Create the Component**:
   - Location: `src/components/simulators/[FeatureName]Workbench.tsx`
   - Mark the file with `"use client";`.
   - Adhere to Cyber-Zen theme tokens (`var(--zen-border)`, `var(--zen-card)`, `var(--zen-void)`, `var(--zen-cyan)`, `var(--zen-snow)`, `var(--zen-frost)`).
   - Ensure interactive controls (sliders, toggles, stepping engines) are fully typed and accessible.

2. **Register in Simulator Registry**:
   - Add entry to `SIMULATOR_REGISTRY` in `src/lib/simulator-registry.ts`.
   - Assign appropriate `domain` (`systems`, `security`, `theory`, or `software`).
   - Map official course codes (e.g. `CSARCH1`, `CCDSALG`, `CSOPESY`).
   - Add canonical alias mappings in `SIMULATOR_ALIASES`.

3. **Register in Renderer**:
   - Add case branches in `src/components/simulators/SimulatorRenderer.tsx` linking to your component.

4. **Link in Notes & Course Docks**:
   - The simulator will automatically surface in `CourseSimulatorDock` on note pages matching its mapped courses.
   - You can also add in-line launcher links in Markdown monographs using:
     ```markdown
     > [!simulator] Interactive Workbench
     > Summary description of the laboratory:
     > [Launch Workbench Name](/simulators?id=your-simulator-id)
     ```

---

## 4. Contributing Academic Monographs

Monographs synthesize undergraduate and graduate Computer Science curricula:

- **Frontmatter**: Each note must include YAML frontmatter specifying `id`, `type`, `course`, `topic`, and `status`.
- **Structure**:
  1. Overview and Key Definitions
  2. Theoretical Framework and Mathematical Derivations (using LaTeX math syntax `$math$`)
  3. Flowcharts and State Diagrams (using Mermaid.js code blocks ````mermaid ... ````)
  4. Worked Examples and Annotated Algorithms
  5. Multiple Choice Self-Assessment (`[MCQ]` format)
- **Citations**: Academic references must follow standard citation guidelines.

---

## 5. Branching and Pull Request Workflow

1. Fork or branch from `v2` (or the active primary branch).
2. Name feature branches descriptively:
   - `feature/simulator-[name]`
   - `fix/[issue-description]`
   - `docs/[update-topic]`
3. Verify that `npm run build` succeeds locally.
4. Open a Pull Request detailing:
   - Summary of changes
   - Impacted courses or modules
   - Verification steps performed
5. Maintain a clean Git history without extraneous merge commits or uncommitted temporary files.
