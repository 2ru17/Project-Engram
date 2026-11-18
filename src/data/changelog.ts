export type ChangelogCategory = "System" | "Simulators" | "Notes";

export interface ChangelogEntry {
  version: string;
  date: string;
  category: ChangelogCategory;
  commit?: string;
  pr?: string;
  title: string;
  summary: string;
  items: string[];
}

export const LATEST_CHANGELOG_VERSION = "2.3.0";

export const CHANGELOG_ENTRIES: ChangelogEntry[] = [
  {
    version: "2.3.0",
    date: "2026-11-18",
    category: "Simulators",
    commit: "ea161d6",
    pr: "PR #5",
    title:
      "4-Phase Platform Overhaul: Metadata, Utility Modals, Dynamic Code Splitting & Security Hardening",
    summary:
      "Lazy-loaded all 29 simulator workbenches via next/dynamic, shipped interactive navbar utility hubs, expanded SEO/OpenGraph/sitemap coverage, and hardened CSP, CI, and EG2 progress decoding.",
    items: [
      "Dynamically code-split all 29 simulator workbenches in SimulatorRenderer.tsx with SimulatorWorkbenchSkeleton fallbacks and React.memo.",
      "Added Feature Guide, Notes & Platform Update Log, GitHub Contribute/Issues/License Hub modals, and Buy Me a Coffee support trigger in TopNav.tsx.",
      "Added dedicated /terms, /privacy, and /cookies compliance pages paired with a keyboard-dismissible CookieConsentBanner.",
      "Expanded sitemap.ts across all 26 courses, 29 simulators, legal routes, and 559 monographs alongside /twitter-image and custom 404 jump search.",
      "Hardened Content-Security-Policy, least-privilege CI token permissions, EG2 relative path validation, and non-breaking npm dependencies.",
      "Added automated course monograph count synchronization (npm run sync:counts), Gate 6 COURSE_REGISTRY parity enforcement in validate-notes.mjs, and single-source-of-truth count constants (TOTAL_COURSE_COUNT, TOTAL_MONOGRAPH_COUNT, TOTAL_DOMAIN_COUNT, TOTAL_SIMULATOR_COUNT) (e3c8d4c).",
    ],
  },
  {
    version: "2.2.1",
    date: "2026-11-18",
    category: "Notes",
    commit: "370ac3f",
    title:
      "NSETRON Course Monographs, Written Exam Reviewer & Corpus Expansion (26 Courses / 559 Monographs)",
    summary:
      "Added Electronic Communications & Circuits (NSETRON) lecture notes and written exam reviewer, enabled Mermaid foreignObject KaTeX labels, and updated corpus metrics.",
    items: [
      "Added NSETRON lecture notes and comprehensive Written Exam reviewer (ca65b67).",
      "Enabled foreignObject HTML/KaTeX label rendering inside Mermaid diagrams and cleaned NSETRON note syntax (029521e).",
      "Updated registry and documentation counts to 26 active courses and 559 monographs (370ac3f).",
    ],
  },
  {
    version: "2.2.0",
    date: "2026-11-18",
    category: "Simulators",
    commit: "b6634eb",
    title: "Interactive NSETRON Circuit Scenes & Electronic Signal Workbenches",
    summary:
      "Launched four synchronized electronics and communications workbenches plus reusable SVG breadboard and circuit schematic diagrams.",
    items: [
      "Added AnalogModulationWorkbench (AM/FM time-domain envelope and sideband spectrum analyzer).",
      "Added RcTimingWorkbench (charge/discharge 1 tau and 5 tau transient curves with LED threshold marker).",
      "Added ScopeQuantizerWorkbench (8x10 oscilloscope graticule measurement and uniform n-bit quantization).",
      "Added RectifierSupplyWorkbench (220 V AC transformer, full-wave bridge, capacitive filter, 7805 regulator) and registered NSETRON in course-registry (be6bc36).",
    ],
  },
  {
    version: "2.1.1",
    date: "2026-11-15",
    category: "Notes",
    commit: "0b80faa",
    title:
      "Vault Module Hierarchy Normalization, Frontmatter Schema & Assessment Blocks",
    summary:
      "Standardized module folder naming, YAML metadata frontmatter, and interactive assessment delimiters across the main Computer Science vault.",
    items: [
      "Normalized module folders, frontmatter metadata, and interactive MCQ blocks across the course repository (0b80faa).",
      "Established direct in-repo content editing and automated sync conventions in CONTRIBUTING.md (1fe7131).",
    ],
  },
  {
    version: "2.1.0",
    date: "2026-11-15",
    category: "Simulators",
    commit: "c27a3d9",
    pr: "PR #4",
    title:
      "7 Advanced Engineering Workbenches, Canvas-Style Assessment Engine & Singularity Overhaul",
    summary:
      "Introduced seven unified-shell simulators, multi-format [MSQ]/[INPUT]/[BLANK] assessment parsing, async file-system loading, and automated CI validation gates.",
    items: [
      "Added 7 unified-shell workbenches: PipelineHazard, VirtualMemoryPage, TcpCongestion, AvalancheCrypto, GraphAlgorithmArena, AutomataTape, and BPlusTreeTransaction (3b218e7).",
      "Upgraded mcq-parser and MCQSection to support [MSQ], [INPUT], and [BLANK] table fill-in-the-blanks with async fs.promises content loading (7479ad1).",
      "Added automated validate:notes CI governance gate (7bc8164), jsdom-free SSR sanitizer (b3e29e9), and Turbopack CSS font token bindings (a01920f).",
    ],
  },
  {
    version: "2.0.1",
    date: "2026-11-10",
    category: "Notes",
    commit: "debe491",
    title: "Course Archive Formatting & Errata Pass (Fix-notes-v7)",
    summary:
      "Cleaned markdown formatting, LaTeX delimiters, and cross-note wikilinks across v2 course modules.",
    items: [
      "Resolved formatting edge cases, math delimiters, and internal wikilink targets across course monographs (debe491).",
    ],
  },
  {
    version: "2.0.0",
    date: "2026-11-10",
    category: "System",
    commit: "d115729",
    pr: "PR #1",
    title:
      "Project Engram v2 Major Release: Course-First Graph, 5-Universe Engine & Stateless Sync",
    summary:
      "Major architectural upgrade introducing the Computer Science Singularity graph, 5 switchable design universes, stateless EG2 progress sync, Dual PDF export, and 18 core simulators.",
    items: [
      "Launched heliocentric/singularity knowledge graph and year-agnostic /notes/[...slug] canonical routing (016b572).",
      "Introduced the 5-Universe design engine (Cyber-Zen, Neo-Brutalism, Minimalism, Parallax, Broken-Grid) with 2.0s Singularity Warp Jump (e8df031, 230643c).",
      "Built stateless CRC16-verified EG2 progress codes and 3-tier Study Plans (332651c).",
      "Added Dual Export Engine for Dark Cyber-Zen and Ink-Saver Academic Paper PDF layouts (fc19114).",
      "Shipped the foundational 18 interactive engineering simulators suite and Mermaid LaTeX rendering (9472ec7).",
    ],
  },
  {
    version: "1.2.0",
    date: "2026-10-19",
    category: "Simulators",
    commit: "4b44a01",
    title: "Rich Markdown/KaTeX MCQ Renderer & Cyber-Zen Gantt Timeline",
    summary:
      "Enhanced interactive quiz and code-block rendering with inline KaTeX/GFM tables and automatic CPU scheduling Gantt timelines.",
    items: [
      "Rendered GFM tables and KaTeX equations inside MCQ questions and explanations (4b44a01).",
      "Added automatic 2-line CPU scheduling Gantt timeline diagrams inside code blocks (4b44a01).",
      "Eliminated inline pill styling inside fenced code blocks and improved timeline badges (6461d33).",
    ],
  },
  {
    version: "1.1.0",
    date: "2026-10-16",
    category: "Simulators",
    commit: "7689c4a",
    title:
      "Cyber-Zen Vector Icons, OpenGraph Card, Sitemap/Robots & CSP Hardening",
    summary:
      "Added Cyber-Zen SVG brand icons, initial dynamic OpenGraph image, crawler routes, and security path-traversal/CSP protections.",
    items: [
      "Added Cyber-Zen vector icon.svg / apple-icon.svg, dynamic OpenGraph banner, sitemap.ts, and robots.ts (7689c4a).",
      "Added Next.js CSP headers and vault path-traversal guards (45afae8).",
    ],
  },
  {
    version: "1.0.1",
    date: "2026-10-16",
    category: "Notes",
    commit: "59c6884",
    title: "CSOPESY Practice Quizzes, Midterm Mock Exam & Table Typography",
    summary:
      "Expanded Operating Systems study assessments and hardened Markdown list/table rendering.",
    items: [
      "Added CSOPESY practice quizzes and midterm mock exam notes (59c6884).",
      "Normalized indented quiz list items to prevent accidental code blocks (1e25acd) and enhanced table borders (b8c484c).",
    ],
  },
  {
    version: "1.0.0",
    date: "2026-10-13",
    category: "System",
    commit: "ab40cf0",
    title: "Project Engram v1.0 Initial Archive & Platform Launch",
    summary:
      "Established the Next.js App Router knowledge vault application and committed the initial Computer Science course notes corpus.",
    items: [
      "Bootstrapped Project Engram web application and Markdown rendering pipeline (f3a4815).",
      "Committed initial structured Computer Science academic notes vault into the repository (ab40cf0).",
    ],
  },
];
