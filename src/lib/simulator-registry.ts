export interface SimulatorMeta {
  id: string;
  title: string;
  domain: "systems" | "security" | "theory" | "software";
  domainLabel: string;
  category: string;
  courses: string[];
  description: string;
  keyConcepts: string[];
}

export const SIMULATOR_REGISTRY: Record<string, SimulatorMeta> = {
  "digital-logic": {
    id: "digital-logic",
    title: "Logic Gate & Boolean Minimizer",
    domain: "systems",
    domainLabel: "Systems & Architecture",
    category: "Hardware Logic & Circuits",
    courses: ["CCICOMP", "CCDSTRU", "CSARCH1", "LBYARCH", "NSETRON"],
    description:
      "Interactive 2-to-4 input digital logic gate workbench, truth table generator, Karnaugh map minimizer, and Boolean algebraic expression evaluator.",
    keyConcepts: [
      "AND, OR, NOT, NAND, NOR, XOR, XNOR",
      "Truth Table Synthesis",
      "K-Map Adjacency Groups",
      "Sum of Products (SOP) Minimization",
    ],
  },
  "pipeline-cache": {
    id: "pipeline-cache",
    title: "CPU 5-Stage Pipeline & Cache Studio",
    domain: "systems",
    domainLabel: "Systems & Architecture",
    category: "Computer Organization & Microarchitecture",
    courses: ["CSARCH1", "CSARCH2", "LBYARCH"],
    description:
      "Simulate classical 5-stage RISC instruction pipelines (IF, ID, EX, MEM, WB). Detect RAW/WAR/WAW data hazards, control hazards, branch stalls, and observe Direct-Mapped vs 2-Way Set-Associative cache line hit/miss rates.",
    keyConcepts: [
      "5-Stage RISC Pipeline (IF, ID, EX, MEM, WB)",
      "Data Hazards & Forwarding Paths",
      "Branch Prediction & Pipeline Bubbles",
      "L1 Cache Hits, Misses & Eviction Sets",
    ],
  },
  "cpu-scheduler": {
    id: "cpu-scheduler",
    title: "OS Process Scheduler & Deadlock Banker",
    domain: "systems",
    domainLabel: "Systems & Architecture",
    category: "Operating Systems & Concurrency",
    courses: ["CSOPESY", "NSDSYST"],
    description:
      "Simulate CPU scheduling algorithms (FCFS, SJF Preemptive/Non-preemptive, Round Robin with configurable quantum, Priority). Visual Gantt charts, turnaround time, waiting time analysis, and Dijkstra's Banker's Algorithm safety state verification.",
    keyConcepts: [
      "FCFS, SJF, SRTF, Round Robin, Priority",
      "Gantt Chart Execution Timeline",
      "Turnaround & Normalized Waiting Times",
      "Banker's Algorithm Safety Vector Check",
    ],
  },
  "page-replacement": {
    id: "page-replacement",
    title: "Virtual Memory & Page Replacement Studio",
    domain: "systems",
    domainLabel: "Systems & Architecture",
    category: "Virtual Memory Management",
    courses: ["CSOPESY", "CSARCH2"],
    description:
      "Inspect virtual address translation, TLB hits/misses, and step through FIFO, LRU (Least Recently Used), and Bélády's Optimal page replacement algorithms with live frame allocation grids.",
    keyConcepts: [
      "Virtual to Physical Page Mapping",
      "FIFO, LRU, and Optimal Replacement",
      "Bélády's Anomaly Detection",
      "Page Fault Frequency Analysis",
    ],
  },
  "ieee754-float": {
    id: "ieee754-float",
    title: "IEEE 754 Floating-Point & Precision Studio",
    domain: "systems",
    domainLabel: "Systems & Architecture",
    category: "Computer Arithmetic & Number Systems",
    courses: ["CSARCH1", "CSARCH2", "CCICOMP", "LBYARCH"],
    description:
      "Interactive IEEE 754-2008 single and double precision floating-point converter. Inspect Sign bit, Biased Exponent (bias 127/1023), implicit leading 1 significand, subnormal numbers, NaN, and click any bit to toggle binary state in real time.",
    keyConcepts: [
      "Single Precision 32-bit & Double Precision 64-bit",
      "Biased Exponent & Unbiased e Calculation",
      "Normalized vs Subnormal / Denormalized Values",
      "Machine Epsilon & Rounding Error Analysis",
    ],
  },
  "embedded-gpio": {
    id: "embedded-gpio",
    title: "Microcontroller GPIO, PWM & ADC Studio",
    domain: "systems",
    domainLabel: "Systems & Architecture",
    category: "Embedded Systems & Hardware Interfacing",
    courses: ["NSEMBED", "NSETRON", "CSARCH2"],
    description:
      "Interactive Microcontroller Hardware Studio. Configure 8-pin GPIO register modes (Input/Output/Pull-up/Pull-down), oscilloscope PWM timer frequency and duty cycles, and calculate 10-bit and 12-bit SAR ADC quantization steps.",
    keyConcepts: [
      "GPIO MODER, ODR, and IDR Registers",
      "PWM Timer Prescaler (PSC) & Auto-Reload (ARR)",
      "Duty Cycle & Effective Output Voltage",
      "10-Bit & 12-Bit SAR ADC Quantization",
    ],
  },
  "distributed-consensus": {
    id: "distributed-consensus",
    title: "Raft Consensus & Vector Clock Causality Studio",
    domain: "systems",
    domainLabel: "Systems & Architecture",
    category: "Distributed Systems & Fault Tolerance",
    courses: ["NSDSYST", "CSSWENG", "CSOPESY"],
    description:
      "Simulate distributed consensus across a 5-node cluster with Raft leader election, heartbeats, and network partition crashes. Inspect Lamport Timers and Vector Clocks causality relations (happens-before vs concurrent).",
    keyConcepts: [
      "Raft Leader Election & Quorum Majorities",
      "AppendEntries Heartbeats & Term Numbers",
      "Vector Clock Causality Vectors",
      "Happens-Before vs Concurrent Event Relations",
    ],
  },
  "network-lab": {
    id: "network-lab",
    title: "Subnet Calculator & Packet Routing Trace",
    domain: "security",
    domainLabel: "Networks & Cybersecurity",
    category: "Networking & Internet Protocols",
    courses: ["CSNETWK", "NSCOM01", "NSCOM02", "NSCOM03"],
    description:
      "Compute IPv4 CIDR blocks, subnet masks, wildcard masks, usable host ranges, broadcast addresses, and trace hop-by-hop packet routing decisions through longest-prefix match routing tables.",
    keyConcepts: [
      "IPv4 CIDR Prefix Notation (/24 to /30)",
      "VLSM Subnet Partitioning",
      "Network & Broadcast Address Calculation",
      "Longest Prefix Match Routing Table Lookup",
    ],
  },
  "tcp-flow": {
    id: "tcp-flow",
    title: "TCP 3-Way Handshake & Sliding Window Studio",
    domain: "security",
    domainLabel: "Networks & Cybersecurity",
    category: "Transport Layer & Flow Control",
    courses: ["CSNETWK", "NSCOM01", "NSCOM02", "NSCOM03"],
    description:
      "Interactive TCP protocol simulation: 3-Way Handshake (SYN, SYN-ACK, ACK), 4-Way Teardown (FIN, ACK, FIN, ACK), Sequence & Ack number tracking, Sliding Window buffer management, and AIMD congestion control packet loss recovery.",
    keyConcepts: [
      "TCP 3-Way Handshake & 4-Way Teardown",
      "Sequence (SEQ) & Acknowledgment (ACK) Arithmetic",
      "Advertised Window (rwnd) Flow Control",
      "AIMD Congestion Avoidance & Fast Retransmit",
    ],
  },
  "security-lab": {
    id: "security-lab",
    title: "Cryptographic Cipher & Packet Inspector",
    domain: "security",
    domainLabel: "Networks & Cybersecurity",
    category: "Applied Cryptography & Defensive Security",
    courses: ["NSSECU1", "NSSECU2", "NSSECU3", "CSSECDV"],
    description:
      "Interactive cryptographic laboratory covering classical ciphers (Caesar, Vigenère), modern AES block cipher transformations (SubBytes, ShiftRows, MixColumns), and RSA asymmetric key mathematics with modular exponentiation.",
    keyConcepts: [
      "Caesar & Polyalphabetic Vigenère Ciphers",
      "Frequency Analysis Cryptanalysis",
      "AES Round State Matrix Transformations",
      "RSA Key Generation & Euler Totient Function",
    ],
  },
  "appsec-sanitizer": {
    id: "appsec-sanitizer",
    title: "OWASP Exploit Sanitizer & Defense Studio",
    domain: "security",
    domainLabel: "Networks & Cybersecurity",
    category: "Application Security & Exploit Defense",
    courses: ["CSSECDV", "NSSECU1", "NSSECU2", "NSSECU3", "CCAPDEV"],
    description:
      "Interactive Web Application Security Laboratory. Test OWASP Top 10 injection vectors (Reflected/Stored XSS, SQL Injection auth bypass, Command Injection, Path Traversal) against vulnerable vs hardened defensive pipelines with parameterized queries and contextual HTML escaping.",
    keyConcepts: [
      "SQL Injection & Parameterized Query Defense",
      "Cross-Site Scripting (XSS) Contextual Encoding",
      "OS Command Injection Child Process Isolation",
      "Path Traversal Canonicalization Verification",
    ],
  },
  "algo-visualizer": {
    id: "algo-visualizer",
    title: "Graph Traversal & Shortest Path Studio",
    domain: "theory",
    domainLabel: "Theory & Math",
    category: "Data Structures & Graph Algorithms",
    courses: ["CCDSALG", "CSALGCM", "CSMATH1", "CSMATH2", "CSINTSY"],
    description:
      "Step through graph traversal and search algorithms (BFS, DFS, Dijkstra, A* heuristic pathfinding). Visual step-by-step frontier expansion, priority queue inspection, and edge relaxation traces.",
    keyConcepts: [
      "Breadth-First Search (BFS) & Depth-First Search (DFS)",
      "Dijkstra's Shortest Path Algorithm",
      "A* Search with Manhattan/Euclidean Heuristics",
      "Priority Queue State & Edge Relaxation",
    ],
  },
  "sorting-bench": {
    id: "sorting-bench",
    title: "Sorting Algorithms & Complexity Comparator",
    domain: "theory",
    domainLabel: "Theory & Math",
    category: "Algorithmic Efficiency & Sorting",
    courses: ["CCDSALG", "CSALGCM", "CSMATH1"],
    description:
      "Step-by-step sorting algorithm laboratory and complexity comparator. Step through QuickSort (Lomuto partition), MergeSort (divide and conquer), HeapSort (binary max-heapify), InsertionSort, and BubbleSort with animated array bars and Big-O efficiency analysis.",
    keyConcepts: [
      "QuickSort Lomuto Partitioning & Pivot Selection",
      "MergeSort Divide and Conquer Recursion",
      "HeapSort Binary Heap Construction & Extraction",
      "Big-O Best, Average, and Worst Case Complexity",
    ],
  },
  "stats-modeling": {
    id: "stats-modeling",
    title: "Probability Distributions & CLT Studio",
    domain: "theory",
    domainLabel: "Theory & Math",
    category: "Probability, Statistics & Stochastic Modeling",
    courses: ["STT101A", "CSMODEL"],
    description:
      "Interactive probability distribution laboratory (Binomial, Poisson, Normal, Uniform). Monte Carlo simulation showing the Central Limit Theorem (CLT) convergence as sample sizes increase.",
    keyConcepts: [
      "Binomial & Poisson Discrete PMFs",
      "Continuous Gaussian Normal Distribution PDF",
      "Central Limit Theorem (CLT) Convergence",
      "Monte Carlo Random Variable Sampling",
    ],
  },
  "db-web-lab": {
    id: "db-web-lab",
    title: "Relational Algebra & SQL Query Optimizer",
    domain: "software",
    domainLabel: "Software & AI",
    category: "Database Systems & Storage Engines",
    courses: ["CCINFOM", "CCAPDEV", "NSAPDEV"],
    description:
      "Translate SQL queries into relational algebra operator trees (Selection σ, Projection π, Natural Join ⋈). Compare estimated execution costs of Sequential Table Scans vs B-Tree Index Scans.",
    keyConcepts: [
      "Relational Algebra Operator Trees",
      "Predicate Pushdown & Projection Pruning",
      "Sequential Scan vs B+ Tree Index Lookups",
      "Join Selectivity & Execution Cost Estimation",
    ],
  },
  "relational-normalization": {
    id: "relational-normalization",
    title: "Relational Normalization & FD Closure Studio",
    domain: "software",
    domainLabel: "Software & AI",
    category: "Database Theory & Normalization",
    courses: ["CCINFOM", "NSAPDEV"],
    description:
      "Interactive relational normalization laboratory. Compute functional dependency attribute closures (X+), derive candidate keys, and validate schemas for 1NF, 2NF, 3NF, and Boyce-Codd (BCNF) compliance with lossless decomposition steps.",
    keyConcepts: [
      "Functional Dependency (FD) Attribute Closure (X+)",
      "Armstrong's Axioms (Reflexivity, Augmentation, Transitivity)",
      "Minimal Candidate Key Discovery",
      "2NF, 3NF, and BCNF Decomposition Rules",
    ],
  },
  "memory-model": {
    id: "memory-model",
    title: "AST Parser & Pointer Memory Workbench",
    domain: "software",
    domainLabel: "Software & AI",
    category: "Compilers, Memory & Programming Paradigms",
    courses: ["CCPROG1", "CCPROG2", "CCPROG3", "CSADPRG", "CSSWENG"],
    description:
      "Interactive arithmetic and expression tokenizer, recursive descent Abstract Syntax Tree (AST) tree generator, and C pointer stack/heap memory frame visualization with dereference traces.",
    keyConcepts: [
      "Lexical Token Stream Generation",
      "Recursive Descent AST Parsing",
      "Stack Frame Activation Records",
      "Pointer Dereferencing & Heap Allocation",
    ],
  },
  "neural-perceptron": {
    id: "neural-perceptron",
    title: "Perceptron Decision Boundary & Neural Studio",
    domain: "software",
    domainLabel: "Software & AI",
    category: "Artificial Intelligence & Machine Learning",
    courses: ["CSINTSY", "CSMODEL"],
    description:
      "Interactive Perceptron & Decision Boundary visualizer. Train single-layer neural models on 2D datasets (separable clusters, AND, OR, XOR), adjust weights, bias, learning rate, and inspect confusion matrix accuracy metrics in real time.",
    keyConcepts: [
      "Rosenblatt Perceptron Learning Rule",
      "Linear Decision Boundaries (w1*x1 + w2*x2 + b = 0)",
      "Activation Functions (Step, Sigmoid, ReLU, Tanh)",
      "Confusion Matrix, Precision, and Recall Metrics",
    ],
  },
};

export const SIMULATOR_LIST: SimulatorMeta[] = Object.values(SIMULATOR_REGISTRY);

export const SIMULATOR_ALIASES: Record<string, string> = {
  "digital-logic": "digital-logic",
  "logic-builder": "digital-logic",
  "discrete-logic": "digital-logic",
  "logic-gate": "digital-logic",
  "logic-gates": "digital-logic",

  "pipeline-cache": "pipeline-cache",
  "cpu-pipeline": "pipeline-cache",
  "risc-pipeline": "pipeline-cache",

  "cpu-scheduler": "cpu-scheduler",
  "process-scheduler": "cpu-scheduler",
  "os-scheduler": "cpu-scheduler",

  "page-replacement": "page-replacement",
  "virtual-memory": "page-replacement",
  "paging-studio": "page-replacement",

  "ieee754-float": "ieee754-float",
  "float-converter": "ieee754-float",
  "ieee754": "ieee754-float",
  "floating-point": "ieee754-float",

  "embedded-gpio": "embedded-gpio",
  "microcontroller-lab": "embedded-gpio",
  "gpio": "embedded-gpio",
  "embedded-systems": "embedded-gpio",

  "distributed-consensus": "distributed-consensus",
  "raft-lamport": "distributed-consensus",
  "raft": "distributed-consensus",
  "vector-clocks": "distributed-consensus",

  "network-lab": "network-lab",
  "subnet-router": "network-lab",
  "subnet-calc": "network-lab",

  "tcp-flow": "tcp-flow",
  "tcp-handshake": "tcp-flow",
  "tcp": "tcp-flow",
  "sliding-window": "tcp-flow",

  "security-lab": "security-lab",
  "crypto-lab": "security-lab",
  "crypto-cipher": "security-lab",

  "appsec-sanitizer": "appsec-sanitizer",
  "web-security": "appsec-sanitizer",
  "appsec": "appsec-sanitizer",
  "owasp-lab": "appsec-sanitizer",

  "db-web-lab": "db-web-lab",
  "sql-optimizer": "db-web-lab",
  "relational-algebra": "db-web-lab",

  "relational-normalization": "relational-normalization",
  "database-normalizer": "relational-normalization",
  "normalization": "relational-normalization",

  "memory-model": "memory-model",
  "ast-parser": "memory-model",
  "ast-memory": "memory-model",

  "algo-visualizer": "algo-visualizer",
  "graph-pathfinder": "algo-visualizer",
  "math-visualizer": "algo-visualizer",
  "dijkstra-studio": "algo-visualizer",

  "sorting-bench": "sorting-bench",
  "sorting-visualizer": "sorting-bench",
  "sorting": "sorting-bench",

  "stats-modeling": "stats-modeling",
  "prob-stats": "stats-modeling",
  "probability-studio": "stats-modeling",

  "neural-perceptron": "neural-perceptron",
  "ai-classifier": "neural-perceptron",
  "perceptron": "neural-perceptron",
};

export function resolveSimulator(idOrAlias: string | null | undefined): SimulatorMeta {
  if (!idOrAlias) return SIMULATOR_LIST[0];
  const canonicalId = SIMULATOR_ALIASES[idOrAlias.toLowerCase().trim()] || idOrAlias;
  return SIMULATOR_REGISTRY[canonicalId] || SIMULATOR_LIST.find((s) => s.id === canonicalId) || SIMULATOR_LIST[0];
}

export function getAllSimulators(): SimulatorMeta[] {
  return SIMULATOR_LIST;
}

export function getSimulatorById(id: string): SimulatorMeta | null {
  return SIMULATOR_REGISTRY[id] || null;
}

export function getSimulatorsForCourse(courseCode: string): SimulatorMeta[] {
  const upper = courseCode.toUpperCase().trim();
  return SIMULATOR_LIST.filter((sim) => sim.courses.includes(upper));
}
