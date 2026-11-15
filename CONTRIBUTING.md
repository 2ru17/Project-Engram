# Contributing to Project Engram

Thank you for contributing to **Project Engram**. This document details the architectural invariants, 5-Universe design system rules, direct in-repo content authoring workflow, Interactive Assessment contracts, and automated CI/CD checks required to maintain our academic Computer Science knowledge repository.

For deep architectural context, cross-reference:
* **[docs/DESIGN.md](./docs/DESIGN.md)** — Clean architectural principles, 5-Universe design system tokens, data flow, and scalability strategies.
* **[docs/Structure.md](./docs/Structure.md)** — Repository layout, vault directory conventions, and module boundaries.
* **[docs/Implementation-guide.md](./docs/Implementation-guide.md)** — Feature implementation workflow, parser contracts, and PR checklists.

---

## 1. Core Principles & Architectural Invariants

All contributions must strictly respect the core invariants of **Project Engram**:

1. **Locked 5-Universe Design System & Choreography**:
   * **Brand Identity**: The project name is strictly **"Project Engram"**. Zero emojis are permitted in the UI, Markdown notes, or Knowledge Graph. All UI copy and telemetry labels must maintain an authoritative systems-engineering tone.
   * **Default Universe (`cyber-zen`)**: Deep Obsidian `#0d1017` (Dark) / `#f8fafc` (Light) background, Cyan `#00E5FF` / `#0284c7` primary active accent, Slate Blue-Grey `#4b5e78` muted borders/edges (opacity $\ge 0.20$), and `Cinzel` (`font-weight: 600`) headings. `cyber-zen` is the **only** universe with a Dark/Light toggle.
   * **Single-Mode Universes**: `neo-brutalism`, `minimalism`, `parallax`, and `broken-grid` operate as locked single-mode universes switched via the **Singularity Warp Jump** with a mandatory $2.0\text{ s}$ anti-spam cooldown.
   * **Framer Motion Easing**: All transitions must use the hardware-accelerated tech-noir curve `ease: [0.16, 1, 0.3, 1]`. Never use spring physics. Lists must stagger sequentially with `staggerChildren: 0.05`.
   * **Reading Container**: Long-form rendered markdown must be wrapped in a `max-w-3xl` container using clean sans-serif body typography (`line-height: 1.65`).

2. **Direct In-Repo Content Architecture (`./content/Main Notes/`)**:
   * **Single Source of Truth**: All academic monographs live directly in `./content/Main Notes/` inside this repository. Contributors edit `.md` files in place using any IDE or by opening `./content/Main Notes/` directly as an Obsidian vault (local `.obsidian/`, `.trash/`, and `*.excalidraw.bak` files are excluded via `.gitignore`).
   * **Runtime Immutability**: The Next.js application treats `./content/Main Notes/` as a static read-only data store during build and server rendering.

3. **Asynchronous I/O, Caching & Security**:
   * **No Sync FS**: Never use `fs.readFileSync`, `fs.readdirSync`, or `fs.statSync` in API routes, Server Components, or build scripts. Always use `fs.promises`.
   * **XSS Sanitization**: Never use `dangerouslySetInnerHTML` without sanitizing HTML output through `sanitizeHtml` (`@/lib/sanitize`, backed by browser `dompurify` with a pure-JS SSR fallback).
   * **60FPS Graph Rendering**: In canvas/WebGL components (`react-force-graph` rendering the `COMPUTER SCIENCE // SINGULARITY` black hole at $(0, 0)$, 25 Course Stars, and 539+ orbiting monographs), all event handlers and canvas painter callbacks must be wrapped in `useCallback` with stable dependency arrays.

4. **Cookie & Telemetry Ethics**:
   * State persistence and performance caching rely strictly on local storage and first-party keys (`engram-perf-cache`, `engram-telemetry-ack`). Telemetry is restricted to runtime error diagnostics with zero advertising cookies or PII collection.

---

## 2. Development Setup

### Prerequisites
* **Node.js**: $\ge 22.0.0$
* **Package Manager**: `npm`
* **Git**: Configured with directory-scoped identity

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
Access the local development server at `http://localhost:3000`.

### Content Authoring Workflow (Direct In-Repo Editing)
1. Edit or create `.md` monographs directly inside `./content/Main Notes/<Year>/<Term>/<COURSE_CODE>/Module XX - <Topic>/` (using any IDE or by opening `./content/Main Notes/` directly as an Obsidian vault).
2. Run `npm run validate:notes` to verify YAML frontmatter, callout metadata, and interactive assessment syntax (`A)-D)`, `[MSQ]`, `[INPUT]`, `[BLANK]`).
3. Run `npm run build` to verify static route generation before committing.

### Pre-Push Verification Suite
Always run the validation and build pipeline locally before opening a Pull Request:
```bash
npm run validate:notes
npm run typecheck
npm run lint
npm run build
```

---

## 3. Authoring New Simulators

Simulators provide interactive pedagogical workbenches for Computer Science courses. When contributing a new simulator:

1. **Create the Workbench Component**:
   * **Path**: `src/components/simulators/[FeatureName]Workbench.tsx`
   * Mark the component with `"use client";`.
   * Wrap the workbench in `SimulatorWorkbenchShell` (`src/components/simulators/shared/SimulatorWorkbenchShell.tsx`) to provide unified transport controls (`Play/Pause`, `Step`, `Reset`), preset scenario selectors, and live telemetry logs.
   * Bind styling to active theme tokens (`var(--zen-border)`, `var(--zen-card)`, `var(--zen-void)`, `var(--zen-cyan)`, `var(--zen-snow)`, `var(--zen-frost)`).
   * Ensure all interactive inputs, sliders, and stepping buttons have explicit `<label>` or `aria-label` attributes and keyboard focus support (`tabIndex={0}`).

2. **Register in Simulator Registry**:
   * Add the metadata entry to `SIMULATOR_REGISTRY` in `src/lib/simulator-registry.ts`.
   * Assign the appropriate `domain` (`systems`, `security`, `theory`, or `software`).
   * Map official course codes (e.g., `CSARCH1`, `CCDSALG`, `CSOPESY`, `CSNETWK`).
   * Add canonical alias mappings in `SIMULATOR_ALIASES`.

3. **Register in Renderer**:
   * Add the corresponding branch in `src/components/simulators/SimulatorRenderer.tsx`.

4. **Embed in Monographs & Course Docks**:
   * Mapped courses automatically display the simulator in `CourseSimulatorDock`.
   * You may also embed inline workbench launchers inside Markdown monographs:
     ```markdown
     > [!simulator] Interactive Workbench
     > Summary description of the laboratory:
     > [Launch Workbench Name](/simulators?id=your-simulator-id)
     ```

---

## 4. Contributing Academic Monographs & Interactive MCQs

### 4.1 Naming & Folder Hygiene Rules
* **Module Folder Naming**: Format module directories with clean spaces around the hyphen: `Module 01 - Logic`, `Module 03 - Propositional Functions` (never `Module 03- Propositional Functions`).
* **Standard Notes**: Use **Option 3 (Stripped Clean Title)** placed directly at the Module folder root. Strip numbering and week prefixes (`1.0`, `Week 08 -`, `Ch 3 -`). Name files purely by their core concept (e.g., `Propositional Functions.md`).
* **No Hollow Modules (Trapped `[HO]` Notes)**: Never place a module's sole core lecture note inside `Resources/[HO] <Topic>.md` while leaving the module root with $0$ standard notes. Primary module lecture notes must sit at the module root as Standard Notes so they receive Interactive MCQs and link into the course navigation chain.
* **Utility & Special Files**: Place supplemental files inside direct module subfolders (`Exercises/`, `Resources/`, `Assessments/`) and prefix with standard brackets:
  * `[EX]` — Practical Exercises & Activities
  * `[PS]` — Problem Sets
  * `[HO]` — Supplemental Handouts & Reference Sheets (only when a root Standard Note already exists)
  * `[REV]` — Reviewers & Study Guides
  * `[QZ]` — Quizzes
  * `[ANS]` — Answer Keys
* **No Redundant Nesting, Empty Subfolders, or Dumps**: Never create nested folders like `Assessments/Assessments/` or `Topic/Topic/`. Remove empty `Resources/` folders and never commit raw text dumps $> 100\text{ KB}$.

### 4.2 Required Metadata & Graph Linkage Layout
Every note must include:
1. **Unique YAML Frontmatter `id` & Dataview Callout**:
   ```markdown
   ---
   id: csopesy_01_process_scheduling
   type: note
   course: CSOPESY
   topic: Process Scheduling
   status: completed
   ---
   > [!info] Document Metadata
   > **Course:** `=this.course` | **Topic:** `=this.topic` | **Status:** `=this.status`
   ```
2. **Tags Block (Zero Emojis)** (directly below the Document Metadata callout):
   ```markdown
   **Tags:** #[[Computer Science]] #[[CSOPESY]] #[[Process Scheduling]]
   ```
3. **Body Structure**:
   * Overview & Formal Definitions
   * Theoretical Framework & Derivations (strictly using LaTeX syntax `$inline$` and `$$display$$`)
   * Architecture / State Diagrams (using Mermaid v12-compliant ````mermaid```` blocks with double-quoted labels for special characters)
   * Worked Examples & Annotated Implementations
4. **References & Navigation Footer** (placed at the **very bottom** of the file, *after* the MCQ Answer Key):
   * **Standard Notes**: Link `- **Previous Topic:** [[...]]`, `- **Next Topic:** [[...]]`, and `- **Related Notes:** [[...]]`.
   * **Utility Files**: Include `- **Related Notes:** [[Parent Topic]]`.

### 4.3 Interactive MCQ Standards & Parser Contract
All **Standard Notes** must include a `## Multiple Choice Questions` section that mounts cleanly into the **Interactive Assessment Component** (`MCQSection.tsx`) (Utility files must have $0$ required assessments). The parser (`src/lib/mcq-parser.ts`) supports four deterministic, auto-graded formats:
* **Standard Single-Choice (`A)-D)`)**: Default 4-option format (`    - **A)**` through `**D)**` with `1. **A)** ...` in the answer key).
* **Multiple Select (`[MSQ]`)**: Prefix stem with `[MSQ]` and provide comma-separated answer keys (e.g., `2. **B, C)** ...`).
* **Exact Text / Numeric Solving (`[INPUT]`)**: Prefix stem with `[INPUT]` (no option bullets) and specify semicolon-delimited accepted answers in brackets (e.g., `3. **[5.67; 17/3; 5.67 ms]** ...`).
* **Table / Inline Fill-in-the-Blanks (`[BLANK]`)**: Prefix stem with `[BLANK]`, place `{{1}}`, `{{2}}` tokens in prose or GFM tables, and map blank IDs in brackets (e.g., `4. **[1: 0/false; 2: 1/true]** ...`).

* **Required Question Counts**:
  * Full notes ($> 2000$ chars body): **10 MCQs**
  * Medium notes ($800\text{–}2000$ chars body): **5 MCQs**
  * Micro-notes ($< 800$ chars body): **3 MCQs**
* **Canonical Markdown Syntax**:
  ```markdown
  ## Multiple Choice Questions

  1. Question stem testing a specific concept or derivation from this note?
      - **A)** First plausible option
      - **B)** Second plausible option
      - **C)** Third plausible option
      - **D)** Fourth plausible option

  ### Answer Key & Explanations
  1. **A)** Detailed explanation referencing the exact principle from the note body and explaining why the distractors are incorrect.

  ## References & Navigation
  - **Previous Topic:** [[Previous Note Title]]
  - **Next Topic:** [[Next Note Title]]
  - **Related Notes:** [[Related Concept]]
  ```
* **Strict Quality Gate**:
  * Never use regex or template scripts to generate placeholder MCQs. Every question must test a specific domain concept with four distinct options and a complete rationale.
  * Ensure `## References & Navigation` sits below `### Answer Key & Explanations` so the Interactive MCQ parser slices the question block cleanly without bleeding navigation links into the last answer explanation.

---

## 5. Accessibility, SEO & Performance Checklist

Before submitting any UI or content PR, verify:
* [ ] **Fitts's Law Cards**: Clickable project/feature cards wrap the entire card in an `<a>` tag with a descriptive `aria-label`, and wrap inner text in `<div aria-hidden="true">`.
* [ ] **Input Labels**: Every `<input>` or search bar has an associated `<label>` (`sr-only` or `aria-label`).
* [ ] **Structured Data**: `layout.tsx` preserves the `Person` JSON-LD schema and dynamic note routes (`notes/[...slug]`) preserve the `BreadcrumbList` schema with `Primary Topic | PROJECT ENGRAM` titles.
* [ ] **Interactive MCQ Mounting**: All modified notes mount properly in the Interactive MCQ UI component with zero `[MCQ_PARSE_FAILURE]` build warnings.

---

## 6. Branching & Pull Request Workflow

1. Branch from `v2` (or the active default branch). Never push directly to `main` or `v2`.
2. Use descriptive branch prefixes:
   * `feature/simulator-[name]`
   * `fix/mcq-parser-[description]`
   * `content/[course-code]-[topic]`
   * `docs/[update-topic]`
3. Run `npm run validate:notes && npm run build` locally.
4. Open a Pull Request detailing:
   * Summary of architectural, UI, or monograph changes
   * Impacted courses, simulators, or Universe themes
   * Confirmation that automated CI checks (`engram-governance.yml`) pass.