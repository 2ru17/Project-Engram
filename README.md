# Project Engram // 銘印

> **Computer Science & Systems Architecture Knowledge Archive**  
> *知の刻印・理の記録*

Project Engram is a high-performance, design-forward academic web archive engineered with Next.js 16, React 19, Motion, and Tailwind CSS v4. It synthesizes over 500 classified monographs, problem sets, and mathematical treatises across 4 years and 38 curricular modules into a unified, interactive topological knowledge system.

---

## Key Architectural Systems

### 1. Curricular Bento Grid Hierarchy
- **Adaptive Asymmetric Layout**: Dynamic 4-column Japanese Bento Grid architecture featuring prioritized double-bezel cards, thematic category seals (`統` Systems, `防` Security, `論` Theory, `創` Software), and real-time monograph counters.
- **Micro-Telemetry Pagination**: Paginated carousel view that smoothly transitions across academic terms and domains without content shifting or empty grid gaps.

### 2. Topological Knowledge Graph
- **Interactive Force Simulation**: Real-time 2D network visualization powered by `force-graph` and D3, mapping curricular connections, cross-module dependencies, and concept relationships.
- **Dual Gateway Navigation**: Seamless switching between structural directory tree views and relational graph exploration.

### 3. Theme-Aware Academic Typography & Diagrams
- **Cyber-Zen Tech-Noir Aesthetics**: OLED deep obsidian palette (`#0b0f17`), luminous cyan accents (`#00e5ff`), and Echizen washi parchment mode for bright ambient lighting.
- **Dynamic Mermaid Flowcharts & State Machines**: Native client-side Mermaid rendering with responsive `viewBox` geometry that matches the active theme.
- **LaTeX Mathematical Notation**: High-precision mathematical and algorithmic notation via KaTeX, Remark-Math, and Rehype.

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

---

## Decoupled Architecture

Project Engram utilizes a decoupled **Content Pipeline Architecture**:

```
+-------------------------------------------------------+
|            Markdown Knowledge Vault                   |
|  - Raw Markdown monographs & problem sets             |
|  - Authored locally via Obsidian                      |
+---------------------------+---------------------------+
                            |
           [CI/CD Build Pipeline or rsync sync daemon]
                            |
                            v
+-------------------------------------------------------+
|  Web Application (Project-Engram)                     |
|  - Next.js 16 UI, Bento Grid, Graph, Design System    |
|  - Parses /content/ mount point at build & run time   |
+-------------------------------------------------------+
```

1. **Application Repository (`Project-Engram`)**: Contains the frontend application code, UI components, design tokens, and visualization pipeline. The `content/` directory is git-ignored.
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
- **Strict Guidelines**: Zero emojis anywhere in user interface or copy.

---

## License

This project is open-source under the MIT License.
