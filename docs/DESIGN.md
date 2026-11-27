# Project Engram: System Design & Architectural Principles

> **Location:** `docs/DESIGN.md` | **Architecture:** Modular Clean Content & Simulation Engine

## 1. Executive Summary
**Project Engram** is architected as a high-performance, file-backed academic knowledge platform, interactive systems simulation suite, and force-directed graph visualization engine. This document defines the core design principles, layer boundaries, 5-Universe visual tokens, and scalability invariants governing the codebase.

---

## 2. Core Architectural Principles

### 2.1 Strict Separation of Concerns (The Dependency Rule)
The codebase is partitioned into decoupled layers where dependencies point strictly **inward**:
* **Domain & Content Parsing Layer (`src/lib/`)**: Pure TypeScript modules responsible for reading Markdown monographs, validating YAML frontmatter, extracting Interactive MCQ ASTs, resolving `[[WikiLinks]]`, and computing graph topology. Zero React or DOM dependencies.
* **Application & Registry Layer**: Coordinates course indexing, search indexing, and simulator workbench registration (`SIMULATOR_REGISTRY`).
* **Presentation & Delivery Layer (`src/components/`, `src/app/`)**: Next.js Server and Client Components responsible for rendering the 5-Universe UI, interactive simulators, KaTeX/Mermaid blocks, and the HTML5 Canvas Singularity Graph.

### 2.2 Direct In-Repo Content Pipeline
* **In-Repo Source of Truth**: Academic monographs are authored directly inside `./content/Main Notes/` (using any IDE or by opening `./content/Main Notes/` directly as an Obsidian vault; local `.obsidian/`, `.trash/`, and `*.excalidraw.bak` files are excluded via `.gitignore`).
* **Immutability at Runtime**: The Next.js application treats `content/Main Notes/` as a read-only data store.

### 2.3 Asynchronous I/O & Content-Hash Caching
* **Zero Synchronous Filesystem Calls**: Synchronous Node.js APIs (`fs.readFileSync`, `fs.readdirSync`, `fs.statSync`) are strictly prohibited across API routes, Server Components, and build scripts to prevent event-loop blocking and Next.js serverless bundle bloat. All file operations use `fs.promises` with bounded concurrency.
* **Content-Hash Memoization**: Parsed Markdown ASTs, extracted MCQ payloads, and computed graph topologies are cached in-memory keyed by file path and modification timestamp (`mtimeMs` / SHA-256 digest) so unchanged monographs are never re-parsed redundantly.

### 2.4 Security & Boundary Sanitization
* **HTML Sanitization**: Any raw HTML output produced during Markdown or formula rendering must be sanitized through `@/lib/sanitize` (browser `dompurify` + pure-JS SSR fallback, with zero `jsdom` dependency) before passing to `dangerouslySetInnerHTML` to prevent Cross-Site Scripting (XSS).
* **Schema Enforcement**: Frontmatter metadata (`id`, `type`, `course`, `topic`, `status`) and simulator query parameters are validated at the boundary before entering rendering pipelines.

---

## 3. System Topology & Data Flow

```text
+-------------------------------------------------------------------------+
|   In-Repo Academic Vault (content/Main Notes/**/*.md — IDE / Obsidian)  |
+------------------------------------+------------------------------------+
                                     | Async fs.promises + Content-Hash Cache
                                     v
+-------------------------------------------------------------------------+
|                     Domain & Content Parsing Engine                     |
|   +--------------------+  +--------------------+  +-----------------+   |
|   | Frontmatter & Tags |  |  Interactive MCQ   |  |  Graph Topology |   |
|   |   Validator/Parser |  | Extractor/Slicer   |  | & WikiLink Mesh |   |
|   +--------------------+  +--------------------+  +-----------------+   |
+-----------------+------------------+------------------+-----------------+
                  |                  |                  |
                  v                  v                  v
+-------------------------------------------------------------------------+
|                   Next.js Presentation & Delivery Layer                 |
|   +--------------------+  +--------------------+  +-----------------+   |
|   | Monograph Reader & |  |   Pedagogical      |  |   Singularity   |   |
|   |   MCQSection.tsx   |  | Simulator Suite    |  | Knowledge Graph |   |
|   +--------------------+  +--------------------+  +-----------------+   |
+-------------------------------------------------------------------------+
```

---

## 4. The 5-Universe Design System & Motion Choreography

Project Engram implements a deterministic 5-Universe theming architecture controlled via the root `data-universe` attribute.

### 4.1 Universe Token Matrix

| Universe ID | Mode Support | Base Surface | Primary Accent | Border / Structural Treatment | Typography Hierarchy |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`cyber-zen`** *(Default)* | Dark & Light Toggle | `#0d1017` (Dark) / `#f8fafc` (Light) | Cyan `#00E5FF` (Dark) / `#0284c7` (Light) | Slate Blue-Grey `#4b5e78` (opacity $\ge 0.20$) | `Cinzel` (`600`) headings + clean system sans-serif body |
| **`neo-brutalism`** | Single-Mode | Raw Putty `#F4F3EE` | Safety Orange `#FF4D00` | `2px solid #0A0A0A`, `5px 5px 0px #0A0A0A` hard shadow, `0px` radius | `Space Grotesk` + `JetBrains Mono` |
| **`minimalism`** | Single-Mode | Warm Bone `#F7F6F3` | Obsidian `#111111` | `1px solid #E5E4DF` Swiss hairlines, zero drop shadows | `Plus Jakarta Sans` |
| **`parallax`** | Single-Mode | Deep Horizon `#070B12` | Expedition Gold `#E5A93C` + Glacial Cyan `#38BDF8` | Multi-depth atmospheric contour borders | `Cinzel` + `Shippori Mincho` + `Plus Jakarta Sans` |
| **`broken-grid`** | Single-Mode | Blueprint Stone `#ECE9E2` | Klein Vermilion `#D9381E` | Exposed structural grid lines & asymmetric desktop offsets | `Space Grotesk` + `Shippori Mincho` + `JetBrains Mono` |

### 4.2 Motion & Layout Invariants
* **Hardware-Accelerated Easing**: All Framer Motion transitions use the tech-noir cubic-bezier curve `ease: [0.16, 1, 0.3, 1]`. Spring physics are prohibited.
* **Sequential Staggering**: Lists and card grids animate sequentially using `staggerChildren: 0.05`.
* **Singularity Warp Jump Cooldown**: Switching universes triggers a warp transition with a mandatory $2.0\text{ s}$ anti-spam cooldown and disables the Dark/Light toggle when a single-mode universe is active.
* **Reading Measure**: All rendered article and monograph bodies are constrained to `max-w-3xl` with `line-height: 1.65`.
* **Zero-Emoji & Authoritative Copy**: Zero emojis are permitted across the UI, graph, or notes. All HUD labels and tooltips use authentic systems-engineering terminology.

---

## 5. Core Subsystem Designs

### 5.1 Singularity Knowledge Graph (`src/components/graph/`)
* **Astrophysical Coordinate System**: The central node at $(0, 0)$ is fixed as `COMPUTER SCIENCE // SINGULARITY` (rendered with an event horizon shadow core, photon sphere rim, and tilted relativistic accretion disk), surrounded by 26 Course Stars and 606+ orbiting monographs.
* **$60\text{ FPS}$ Canvas Optimization**:
  * Radial gradients and stellar glow sprites are pre-rendered once per theme onto offscreen `<canvas>` buffers rather than calling `ctx.createRadialGradient` per node on every frame.
  * Every callback passed to `ForceGraph2D` (`nodeCanvasObject`, `linkCanvasObject`, `onNodeHover`, `onNodeClick`) is wrapped in `useCallback` with stable dependency arrays to eliminate React re-render frame drops.
  * Inactive graph edges never drop below `0.20` opacity; hovering a node isolates its 1-hop constellation and illuminates directional link particles.

### 5.2 Interactive MCQ Parser & Assessment Engine (`MCQSection.tsx`)
* **Boundary Slicing Contract**: The parser extracts content starting at `^##+\s*Multiple Choice Questions.*$` and terminates strictly before `^##+\s*References\s*&\s*Navigation` (or the next H2 heading / `---` rule) so navigation footers never bleed into answer explanations.
* **Format Normalization**: Normalizes `\r\n` to `\n`, parses 4-space indented options (`    - **A)** ` through `**D)**`), pairs stems with `### Answer Key & Explanations`, and emits a build-time diagnostic (`[MCQ_PARSE_FAILURE]`) if a standard note yields $0$ parsed questions.

### 5.3 Pedagogical Simulator Suite (`src/components/simulators/`)
* **Unified Workbench Shell**: All simulators wrap their interactive canvas inside `SimulatorWorkbenchShell`, providing standardized transport stepping (`Play/Pause`, `Step Forward/Back`, `Reset`, playback speed), curated preset scenarios, KaTeX invariant logs, and live state inspection.
* **Registry & Course Dock**: Simulators are registered in `src/lib/simulator-registry.ts` under four domains (`systems`, `security`, `theory`, `software`) and automatically surface on corresponding course pages via `CourseSimulatorDock`.
* **Circuit Scenes (`circuit:` fence)**: Static schematics are authored as data in `src/lib/diagram-registry.ts` and embedded in notes with a ```` ```circuit:<id> ```` fence that mirrors the `simulator:<id>` fence. `MarkdownRender.tsx` mounts `CircuitDiagram` (`src/components/diagrams/`) on screen and prints the fence body (the ASCII fallback, at most 78 columns) in print and Obsidian.

---

## 6. Accessibility, SEO & Telemetry Architecture
* **Fitts's Law Interactive Cards**: Clickable cards wrap the entire surface in a semantic `<a>` tag with an explicit `aria-label`, while inner visual text is wrapped in `<div aria-hidden="true">` to prevent redundant screen-reader announcements.
* **Form & Control Labeling**: Every search input, slider, and simulator control is bound to an explicit `<label>` (`sr-only` or `aria-label`).
* **Structured Data (JSON-LD)**: `layout.tsx` injects the `Person` schema, and dynamic monograph pages (`notes/[...slug]`) inject `BreadcrumbList` schemas with titles formatted as `Primary Topic | PROJECT ENGRAM`.

---

## 7. Architecture Decision Records (ADR)

| ADR # | Decision | Status | Architectural Consequence |
| :--- | :--- | :--- | :--- |
| **001** | File-Backed In-Repo Markdown (`content/Main Notes/`) Pipeline | Accepted | Eliminates database latency and external sync steps for static monographs; requires strict build-time validation (`validate:notes`). |
| **002** | Asynchronous `fs.promises` + Content-Hash Caching | Accepted | Prevents Next.js serverless bundle bloat and speeds up static/dynamic route generation across 606+ notes. |
| **003** | Offscreen Sprite Caching & `useCallback` Lock on ForceGraph | Accepted | Sustains locked $60\text{ fps}$ rendering for the Singularity Knowledge Graph even on integrated GPUs. |
| **004** | Unified `SimulatorWorkbenchShell` & Domain Registry | Accepted | Guarantees consistent UX, keyboard accessibility, and automatic course-page docking across all simulators. |
| **005** | Data-driven `circuit:` fence with ASCII fallback body | Accepted | Circuits are pure data plus pure behavior functions rendered by one SVG component; notes stay readable in Obsidian and print, and new scenes need no new React code. |