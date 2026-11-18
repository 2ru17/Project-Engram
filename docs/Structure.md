# Project Engram: Repository & Vault Structure

> **Location:** `docs/Structure.md` | **Pattern:** Feature-Sliced Application + Hierarchical Academic Vault

## 1. Structural Philosophy
**Project Engram** follows **Screaming Architecture**: the repository root cleanly separates application source code (`src/`), living architectural documentation (`docs/`), automated validation scripts (`scripts/`), and the in-repo academic monograph vault (`content/Main Notes/`).

---

## 2. Repository Directory Tree

```text
Project-Engram/
├── .github/
│   └── workflows/
│       └── engram-governance.yml      # Automated CI gate (Notes validation, Typecheck, Lint, Build)
├── content/
│   └── Main Notes/                    # In-repo academic monograph vault (source of truth; read-only at runtime)
│       ├── 1st Year/                  # Term 1 (CCICOMP, CCPROG1), Term 2 (CCDSTRU, CSMATH1), Term 3 (CCDSALG, CCPROG2, CSMATH2, STT101A)
│       ├── 2nd Year/                  # Term 1 (CCINFOM, CCPROG3, CSINTSY, CSNETWK), Term 2 (CCAPDEV, CSARCH1, NSCOM01, NSSECU1), Term 3 (...)
│       ├── 3rd Year/                  # Term 1 (CSOPESY, CSSWENG, NSCOM03, NSETRON), Term 2 (NSAPDEV, NSEMBED, NSRESME, NSSECU3), Term 3 (...)
│       └── 4th Year/                  # Intentional curriculum placeholder directories
├── docs/
│   ├── DESIGN.md                      # System design, 5-Universe tokens, & scalability principles
│   ├── Structure.md                   # This document (Repository & Vault topology)
│   └── Implementation-guide.md        # Developer workflows, simulator guide, & parser contracts
├── public/                            # Static assets, compressed WebP/WebM media, & fonts
├── scripts/
│   └── validate-notes.mjs             # Fast async CLI gatekeeper for vault & MCQ standards
├── src/
│   ├── app/                           # Next.js App Router entrypoints & layouts
│   │   ├── layout.tsx                 # Root layout, 5-Universe provider, & Person JSON-LD schema
│   │   ├── page.tsx                   # Landing page & Singularity Knowledge Graph showcase
│   │   ├── notes/
│   │   │   └── [...slug]/
│   │   │       └── page.tsx           # Dynamic monograph reader, BreadcrumbList JSON-LD, & Simulator Dock
│   │   └── simulators/
│   │       └── page.tsx               # Interactive Simulator Suite hub & workbench launcher
│   ├── components/
│   │   ├── graph/                     # Singularity Knowledge Graph canvas, offscreen sprites, & HUD drawer
│   │   ├── notes/                     # Monograph rendering components
│   │   │   ├── MCQSection.tsx         # Interactive Multiple Choice Question component & parser
│   │   │   ├── MermaidBlock.tsx       # Client-side Mermaid v12 diagram renderer
│   │   │   └── CourseSimulatorDock.tsx# Contextual simulator launcher docked on course notes
│   │   ├── diagrams/                  # Data-driven circuit scenes (`circuit:` fence)
│   │   │   ├── CircuitDiagram.tsx     # Part tabs, value pickers, current flow, info cards
│   │   │   ├── BreadboardDiagram.tsx  # 830-hole connectivity map
│   │   │   └── symbols.tsx            # Schematic symbol set
│   │   ├── simulators/                # Interactive Pedagogical Workbenches
│   │   │   │                          # incl. AnalogModulation, RcTiming, ScopeQuantizer, RectifierSupply
│   │   │   ├── shared/
│   │   │   │   └── SimulatorWorkbenchShell.tsx # Unified transport controls, presets, & telemetry shell
│   │   │   ├── SimulatorRenderer.tsx  # Dynamic switch dispatcher for registered simulators
│   │   │   └── *Workbench.tsx         # Domain-specific interactive simulator implementations
│   │   └── ui/                        # 5-Universe theme switcher (Singularity Warp Jump), nav, & cards
│   └── lib/                           # Domain & Content Parsing Layer (Zero React dependencies)
│       ├── content-loader.ts          # Async fs.promises reader + content-hash cache
│       ├── mcq-parser.ts              # Deterministic MCQ block slicer & AST normalizer
│       ├── graph-builder.ts           # Singularity node/edge generator & WikiLink resolver
│       └── simulator-registry.ts      # Canonical SIMULATOR_REGISTRY & SIMULATOR_ALIASES
├── CONTRIBUTING.md                    # Contributor guidelines & pre-PR checklist
├── README.md                          # Project entrypoint & quick start
├── next.config.ts                     # Next.js configuration
├── package.json                       # Dependencies & npm scripts
└── tsconfig.json                      # Strict TypeScript configuration
```

---

## 3. Academic Vault Topology (`content/Main Notes/`)

Every course inside `content/Main Notes/<Year>/<Term>/<COURSE_CODE>/` adheres to a strict module hierarchy to ensure clean Next.js URL slugs and accurate Knowledge Graph edges:

```text
<COURSE_CODE>/ (e.g., CCDSTRU, CSOPESY, CSARCH2)
├── Module 01 - Logic/                 # Clean space-hyphen-space module naming
│   ├── Propositional Logic.md         # Standard Note (Option 3 Stripped Clean Title at module root)
│   ├── Logical Equivalences.md        # Standard Note (Contains Interactive MCQs & Prev/Next links)
│   ├── Exercises/                     # Direct utility subfolder (No nested Exercises/Exercises/)
│   │   └── [EX] Truth Tables.md       # Bracket-prefixed Practical Exercise (0 MCQs)
│   ├── Resources/                     # Direct utility subfolder for supplemental references
│   │   └── [HO] Laws of Logic Cheat Sheet.md
│   └── Assessments/                   # Direct utility subfolder for problem sets & quizzes
│       ├── [PS] Logic Problem Set.md
│       └── [ANS] Logic Problem Set Answers.md
└── Reviewers/
    └── [REV] Comprehensive Course Reviewer.md
```

### 3.1 Structural Invariants for `content/Main Notes/`
1. **Clean Module Hyphenation**: Module and Chapter folders must always use `Module XX - Topic Name` (with spaces on both sides of the hyphen). Malformed names like `Module 03- Propositional Functions` are rejected by `npm run validate:notes`.
2. **No "Hollow Modules" (Trapped `[HO]` Core Notes)**: Every populated Module folder must contain at least one **Standard Note** at its root. Placing a module's sole core lecture note inside `Resources/[HO] <Topic>.md` while leaving the module root empty is strictly prohibited.
3. **No Redundant Subfolder Nesting or Empty Wrappers**: Utility subfolders (`Exercises/`, `Resources/`, `Assessments/`) sit directly inside the module folder. Never create `Resources/Resources/` or leave empty utility folders.
4. **Intentional Exceptions**:
   * Empty `3rd Year/` and `4th Year/` course folders are preserved as curriculum placeholders.
   * `CCDSTRU Module 02` is intentionally absent (lab-only module).

### 3.2 Standard In-Repo Authoring Workflow
1. Edit or create `.md` monographs directly inside `./content/Main Notes/<Year>/<Term>/<COURSE_CODE>/Module XX - <Topic>/` (using any IDE or by opening `./content/Main Notes/` directly as an Obsidian vault — `.obsidian/`, `.trash/`, and `*.excalidraw.bak` are ignored in `.gitignore`).
2. Run `npm run validate:notes` to verify YAML frontmatter, callout metadata, and interactive assessment syntax (`A)-D)`, `[MSQ]`, `[INPUT]`, `[BLANK]`).
3. Run `npm run build` to verify static route generation before committing.

---

## 4. Layer Dependency & Import Matrix

To prevent circular dependencies and keep server bundles lightweight, imports must obey the following matrix:

| Source Directory $\downarrow$ \ Target $\rightarrow$ | `src/lib/` | `src/components/ui/` | `src/components/notes/` | `src/components/simulators/` | `src/components/graph/` | `src/app/` |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **`src/lib/` (Domain/Parsers)** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **`src/components/ui/`** | ✅ (Types/Utils) | ✅ | ❌ | ❌ | ❌ | ❌ |
| **`src/components/notes/`** | ✅ | ✅ | ✅ | ✅ (`CourseSimulatorDock`) | ❌ | ❌ |
| **`src/components/simulators/`** | ✅ (`simulator-registry`) | ✅ | ❌ | ✅ | ❌ | ❌ |
| **`src/components/graph/`** | ✅ (`graph-builder`, `simulator-registry`) | ✅ | ❌ | ❌ | ✅ | ❌ |
| **`src/app/` (Routes/Pages)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## 5. File & Component Naming Conventions

| Artifact Type | Naming Pattern | Example |
| :--- | :--- | :--- |
| **Simulator Workbenches** | `PascalCaseWorkbench.tsx` | `PipelineHazardWorkbench.tsx` |
| **UI & Graph Components** | `PascalCase.tsx` | `SingularityGraphCanvas.tsx` |
| **Domain / Parser Modules** | `kebab-case.ts` | `simulator-registry.ts`, `mcq-parser.ts` |
| **Module Directories (Vault)** | `Module XX - Title` | `Module 04 - Sums and Sequences` |
| **Standard Monographs** | `Title Case Clean Topic.md` | `Propositional Functions.md` |
| **Utility Files** | `[ACRONYM] Title.md` | `[PS] Asymptotic Complexity.md` |
| **Unit / Parser Tests** | `<module>.spec.ts` | `mcq-parser.spec.ts` |