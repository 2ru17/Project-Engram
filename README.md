# Project Engram

> **Interactive Computer Science Monograph Archive, Pedagogical Simulator Suite, & Relativistic Knowledge Graph**

## 1. Overview
**Project Engram** is a full-stack academic knowledge platform and engineering portfolio that synthesizes an undergraduate and graduate Computer Science curriculum into an interconnected digital archive. It combines rigorous technical monographs, cycle-accurate interactive systems simulators, automated self-assessment engines, and a $60\text{ fps}$ force-directed knowledge graph centered on the **Computer Science Black Hole Singularity** (`COMPUTER SCIENCE // SINGULARITY`).

---

## 2. Documentation Index
Architectural standards, structural boundaries, and implementation workflows are maintained in the repository documentation suite:

* **[README.md](./README.md)** — Project overview, technology stack, quick-start setup, and script reference.
* **[CONTRIBUTING.md](./CONTRIBUTING.md)** — Contribution guidelines, simulator registration workflow, monograph formatting rules, and pull request standards.
* **[docs/DESIGN.md](./docs/DESIGN.md)** — System architecture, 5-Universe Design System tokens, Singularity Graph rendering engine, and performance/security invariants.
* **[docs/Structure.md](./docs/Structure.md)** — Repository directory topology, academic vault organization (`1st Year`–`4th Year`), module naming rules, and dependency boundaries.
* **[docs/Implementation-guide.md](./docs/Implementation-guide.md)** — Step-by-step developer guide for building simulator workbenches, extending the Markdown/MCQ parser pipeline, and running verification checks.

---

## 3. Core Capabilities

* **559+ Academic Monographs across 26+ CS Courses**: Deep-dive technical notes featuring formal mathematical derivations (KaTeX), client-side architecture and state diagrams (Mermaid v12), annotated code implementations, and bidirectional `[[WikiLink]]` navigation meshes.
* **Interactive Self-Assessment Engine (`MCQSection.tsx`)**: Parses structured Markdown assessment blocks into interactive multiple-choice quizzes with instant distractor rationales and keyboard accessibility.
* **Pedagogical Engineering Simulators**: Interactive laboratory workbenches spanning **Systems** (CPU pipelining, virtual memory paging), **Security & Networking** (TCP congestion control, cryptographic avalanche diffusion), **Theory** (graph pathfinding, automata tape machines), and **Software/Databases** ($\text{B}^+$ tree indexing and MVCC transactions).
* **Singularity Knowledge Graph**: A custom HTML5 Canvas force-directed graph rendering the central `COMPUTER SCIENCE // SINGULARITY` at $(0, 0)$, 26 Course Stars, and 559 orbiting monographs with 1-hop constellation isolation.
* **5-Universe Design System**: Supports the default **Cyber-Zen** tech-noir aesthetic (Dark/Light modes) alongside four locked single-mode universes (**Neo-Brutalism**, **Minimalism**, **Parallax**, and **Broken-Grid**) switched via the **Singularity Warp Jump**.

---

## 4. Technology Stack

* **Framework & Runtime**: Next.js (App Router), React, TypeScript, Node.js ($\ge 22.0.0$)
* **Styling & Motion**: Tailwind CSS, CSS Custom Properties (`data-universe`), Framer Motion (`ease: [0.16, 1, 0.3, 1]`)
* **Visualization & Diagrams**: `react-force-graph` (2D Canvas), Mermaid.js v12, KaTeX
* **Content & Security Pipeline**: Asynchronous Node.js `fs.promises`, Gray-Matter (YAML frontmatter), Unified / Remark / Rehype, `dompurify` (`@/lib/sanitize`)

---

## 5. Quick Start

### Prerequisites
* **Node.js** $\ge 22.0.0$
* **npm** (standard package manager for this repository)

### Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/2ru17/Project-Engram.git
   cd Project-Engram
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Author & validate academic monographs (Direct In-Repo Editing):**
   1. Edit or create `.md` monographs directly inside `./content/Main Notes/<Year>/<Term>/<COURSE_CODE>/Module XX - <Topic>/` (using any IDE or by opening `./content/Main Notes/` directly as an Obsidian vault — `.obsidian/`, `.trash/`, and `*.excalidraw.bak` are git-ignored).
   2. Run `npm run validate:notes` to verify YAML frontmatter, callout metadata, and interactive assessment syntax (`A)-D)`, `[MSQ]`, `[INPUT]`, `[BLANK]`).
   3. Run `npm run build` to verify static route generation before committing.

---

## 6. Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with hot-reload. |
| `npm run build` | Compiles and bundles the application for production deployment. |
| `npm run start` | Runs the compiled production server locally. |
| `npm run lint` | Executes static code analysis and linting checks. |
| `npm run typecheck` | Runs the TypeScript compiler (`tsc --noEmit`) for static type verification without emitting build files. |
| `npm run validate:notes` | Validates monograph frontmatter, folder hygiene, MCQ parser compatibility, graph links, and Gate 6 `COURSE_REGISTRY` parity (`node scripts/validate-notes.mjs`). |
| `npm run sync:counts` | Automatically synchronizes per-course monograph counts in `src/lib/course-registry.ts` against the vault (`node scripts/validate-notes.mjs --sync`). |