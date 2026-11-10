# Project Engram // 銘印

> **Computer Science & Systems Architecture Knowledge Archive**  
> *知の刻印・理の記録*

Project Engram is a high-performance, design-forward academic web archive engineered with Next.js 16, React 19, Motion, and Tailwind CSS v4. It synthesizes over 500 classified monographs, problem sets, and mathematical treatises across 4 years and 38 curricular modules into a unified, interactive topological knowledge system.

---

## Key Architectural Systems

### 1. Interactive CS Simulators & Engineering Workbenches
Project Engram embeds 18 interactive engineering workbenches directly into course monographs across four curricular domains:
- **Systems & Architecture**: CPU pipelining, L1 cache hit/miss rates, virtual memory paging, process scheduling, IEEE 754 floating-point bit manipulation, microcontroller GPIO/PWM, and Raft consensus.
- **Networks & Security**: IPv4 subnetting and CIDR routing, TCP sliding window flow control, cryptographic ciphers (Caesar, Vigenere, AES, RSA), and OWASP exploit defense sanitization.
- **Theory & Algorithms**: Graph search heuristics (Dijkstra, A*), animated sorting algorithm benchmarks, and probability distributions with CLT Monte Carlo simulation.
- **Software & Artificial Intelligence**: Relational algebra query optimization, database normalization (1NF to BCNF closure), AST lexical syntax parsing, and Perceptron linear classification boundaries.

All simulators feature real-time parameter adjustments and can be launched directly from matching note callouts or through `/simulators`. For full registry metadata, see [CONTRIBUTING.md](./CONTRIBUTING.md) and [`simulator-registry.ts`](./src/lib/simulator-registry.ts).

### 2. Curricular Bento Grid Hierarchy
- **Adaptive Asymmetric Layout**: Dynamic 4-column Japanese Bento Grid architecture featuring prioritized double-bezel cards, thematic category seals (`統` Systems, `防` Security, `論` Theory, `創` Software), and real-time monograph counters.
- **Micro-Telemetry Pagination**: Paginated carousel view that smoothly transitions across academic terms and domains without content shifting or empty grid gaps.

### 3. Topological Knowledge Graph
- **Interactive Force Simulation**: Real-time 2D network visualization powered by `force-graph` and D3, mapping curricular connections, cross-module dependencies, and concept relationships.
- **Dual Gateway Navigation**: Seamless switching between structural directory tree views and relational graph exploration.

### 4. Theme-Aware Academic Typography & Diagrams
- **Cyber-Zen Tech-Noir Aesthetics**: OLED deep obsidian palette (`#0b0f17`), luminous cyan accents (`#00e5ff`), and Echizen washi parchment mode for bright ambient lighting.
- **Dynamic Mermaid Flowcharts & State Machines**: Native client-side Mermaid rendering with responsive `viewBox` geometry that matches the active theme.
- **LaTeX Mathematical Notation**: High-precision mathematical and algorithmic notation via KaTeX, Remark-Math, and Rehype.

### 5. Performance Caching & Telemetry Architecture
- **Performance Cookies & Local Storage**: Client-side cookies (`engram-perf-cache`, `engram-telemetry-ack`) and local storage cache pre-rendered monograph AST tokens, KaTeX mathematical fonts, and SVG assets across sessions to accelerate page transitions.
- **Stateless EG2 Sync & Local State Persistence**: Reading progress checkpoints, study plan completion flags, and Cyber-Zen aesthetic preferences are preserved without requiring account logins.
- **Vercel Runtime Analytics**: Low-overhead telemetry integration via `@vercel/analytics` specifically dedicated to monitoring runtime exceptions, unhandled promise rejections, and Core Web Vitals without collecting personal data or advertising cookies.
- **Discreet Telemetry & Cookie Notice**: Minimalist, Cyber-Zen styled banner explaining that cookies and local storage are utilized for performance acceleration, state persistence, and automated error diagnostics.

---

## Technical Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16.3 (Turbopack, App Router, React Server Components) |
| **Runtime & UI** | React 19, Lucide React, Shadcn/UI |
| **Styling** | Tailwind CSS v4, Custom CSS Design Variables |
| **Motion & Animation** | Motion (Framer Motion 14), Anime.js v4 |
| **Data Visualization** | Force-Graph, React-Force-Graph-2D, D3-Force |
| **Content Pipeline** | Unified / Remark / Rehype (GFM, KaTeX, Raw HTML, Slugs) |
| **Diagrams** | Mermaid.js 12 (Dynamic Theme-Engine) |
| **Telemetry & Health** | @vercel/analytics (Anonymous Performance & Error Monitoring) |

---

## Decoupled Architecture

Project Engram utilizes a decoupled **Content Pipeline Architecture**:

```text
+-------------------------------------------------------+
|            Markdown Knowledge Vault                   |
|  - Raw Markdown monographs & problem sets             |
|  - Authored locally via Obsidian                      |
+---------------------------+---------------------------+
                            |
           [CI/CD Build Pipeline or local synchronization]
                            |
                            v
+-------------------------------------------------------+
|  Web Application (Project-Engram)                     |
|  - Next.js 16 UI, Bento Grid, Graph, Design System    |
|  - 18 Interactive Engineering Simulators              |
|  - Parses /content/ mount point at build & run time   |
+-------------------------------------------------------+
```

1. **Application Repository (`Project-Engram`)**: Contains the frontend application code, UI components, interactive workbenches, design tokens, and visualization pipeline.
2. **Content Source (Obsidian Vault)**: Houses raw academic notes, monographs, and problem sets authored in Obsidian.
3. **Build Pipeline**: During deployment, the build pipeline mounts or synchronizes the markdown vault into `content/` before compiling the static site.

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm (default package manager)

### Installation
```bash
git clone https://github.com/2ru17/Project-Engram.git
cd Project-Engram
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## Design System & Easing Guidelines

All kinetic choreography conforms to the **Cyber-Zen Tech-Noir** specifications:
- **Primary Curve**: `cubicBezier(0.16, 1, 0.3, 1)` (snappy entry, elongated cinematic deceleration).
- **Theme Tokens**: Managed via standard CSS custom properties in `globals.css` with zero hardcoded visual artifacts.
- **Global Invariants**: Zero emojis and zero em-dashes across all code, markup, documentation, and user interfaces.
