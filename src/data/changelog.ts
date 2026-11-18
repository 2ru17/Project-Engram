export type ChangelogCategory = "Notes" | "Simulators" | "System";

export interface ChangelogEntry {
  version: string;
  date: string;
  category: ChangelogCategory;
  title: string;
  summary: string;
  items: string[];
}

export const LATEST_CHANGELOG_VERSION = "2.4.0";

export const CHANGELOG_ENTRIES: ChangelogEntry[] = [
  {
    version: "2.4.0",
    date: "2026-11-18",
    category: "System",
    title: "4-Phase Platform Overhaul: Utility Hubs, Legal Suite & Dynamic Code Splitting",
    summary:
      "Introduced interactive navbar utility modals (Guide, Update Log, Community & Issues Hub), dynamic simulator chunk splitting, full SEO/OG metadata, and hardened HTTP security headers.",
    items: [
      "Added Feature Guide, Update Log, and Contribute/GitHub Hub modals accessible from the top navigation bar and mobile drawer.",
      "Dynamically code-split all 29 simulator workbenches and utility modals via next/dynamic with layout-matched skeleton loaders.",
      "Added dedicated Terms of Service (/terms), Privacy Policy (/privacy), Cookie Policy (/cookies), and non-intrusive CookieConsentBanner.",
      "Upgraded custom 404 diagnostic workbench with live broken-path readout and direct course/simulator jump search.",
      "Hardened Content-Security-Policy, Permissions-Policy, least-privilege CI permissions, and EG2 progress code sanitization.",
    ],
  },
  {
    version: "2.3.0",
    date: "2026-11-15",
    category: "Simulators",
    title: "NSETRON Course Expansion & Electronic Signal Workbenches",
    summary:
      "Added the Electronic Communications & Circuits (NSETRON) course alongside four synchronized signal/circuit simulators and interactive Mermaid foreignObject label rendering.",
    items: [
      "Launched Analog Modulation Studio (AM/FM time-domain envelope and sideband spectrum analyzer).",
      "Launched RC Timing Workbench (charge/discharge 1 tau and 5 tau curves with LED threshold markers).",
      "Launched Oscilloscope & Quantizer Studio (8x10 graticule measurement and n-bit uniform quantization).",
      "Launched Rectifier Power Supply Studio (220 V AC step-down, full-wave bridge, capacitive filter, 7805 regulator).",
      "Expanded the active monograph vault to 26 curated Computer Science courses and 559 verified monographs.",
    ],
  },
  {
    version: "2.2.0",
    date: "2026-10-28",
    category: "Notes",
    title: "Canvas-Style Multi-Format Assessments & GFM Table Parser Upgrade",
    summary:
      "Upgraded the deterministic assessment engine in MCQSection to parse multi-select, exact numeric/text solving, and inline table fill-in-the-blank drills.",
    items: [
      "Added [MSQ] multi-select checkboxes with comma-separated grading keys.",
      "Added [INPUT] exact numeric and Big-O complexity fields with +/- 0.01 decimal tolerance.",
      "Added [BLANK] inline {{n}} table cell inputs inside Markdown tables with KaTeX formula support.",
      "Enforced strict boundary slicing so References & Navigation footers render cleanly after interactive quizzes.",
    ],
  },
  {
    version: "2.1.0",
    date: "2026-10-14",
    category: "Simulators",
    title: "Advanced Systems, Networking, Theory & Storage Workbenches",
    summary:
      "Shipped seven unified-shell interactive workbenches featuring cycle-by-cycle stepping, scenario presets, live telemetry metrics, and formal KaTeX invariants.",
    items: [
      "Added 5-Stage RISC-V Pipeline & Hazard Analyzer with toggleable EX/MEM forwarding paths.",
      "Added Virtual Memory TLB & Page Replacement Lab comparing FIFO, LRU, Clock, and Belady Optimal.",
      "Added TCP Congestion Control Studio (Reno, Tahoe, CUBIC) and Cryptographic Avalanche & Diffie-Hellman Lab.",
      "Added Weighted Graph Pathfinding Arena, Finite Automata & Turing Machine Lab, and B+ Tree MVCC Isolation Lab.",
    ],
  },
  {
    version: "2.0.0",
    date: "2026-09-30",
    category: "System",
    title: "5-Universe Design Architecture & Stateless EG2 Progress Sync",
    summary:
      "Introduced the 5-Universe visual engine with a 2.0s Singularity Warp Jump and zero-account CRC16-verified EG2 progress codes.",
    items: [
      "Added Cyber-Zen (Dark/Light), Neo-Brutalism, Minimalism, Parallax, and Broken-Grid design universes.",
      "Launched stateless EG2-... progress codes for transferring completed monographs and study plans across devices without accounts.",
      "Added Dual Export Engine supporting Dark Cyber-Zen and Ink-Saver Academic Paper PDF layouts.",
    ],
  },
];
