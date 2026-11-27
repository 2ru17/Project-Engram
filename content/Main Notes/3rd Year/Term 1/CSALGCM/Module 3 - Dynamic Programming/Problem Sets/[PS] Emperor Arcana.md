---
id: ps_emperor_arcana
type: problem_set
course: CSALGCM
topic: "Emperor Arcana"
status: completed
---

# Emperor Arcana

> [!info] Document Metadata
> **Course:** `=this.course` | **Topic:** `=this.topic` | **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Problem Sets]] #[[Dynamic Programming]]
---

The Emperor Arcana problem set introduces core **Dynamic Programming (DP)** paradigms centered on optimal substructure, overlapping subproblems, and space-efficient bottom-up tabulation. Across six HackerRank challenges, the set progresses from combinatorial counting via 0/1 and unbounded knapsack transitions to Pascal's identity, non-adjacent linear optimization, Catalan convolution recurrences, and multi-line state-space scheduling.

## Problem List

| # | Problem | Core Technique | Difficulty | Status |
| :--- | :--- | :--- | :--- | :--- |
| 01 | [[01 - Basic Knapsack\|Basic Knapsack]] | 1D 0/1 Knapsack Counting DP | Easy | Solved |
| 02 | [[02 - Coin Change (Counting Version)\|Coin Change (Counting Version)]] | Precomputed Unbounded Knapsack DP | Medium | Solved |
| 03 | [[03 - How Many Ways (Easy Version)\|How Many Ways? (Easy Version)]] | Combinatorial DP (Pascal's Triangle) | Easy | Solved |
| 04 | [[04 - The Wet Bandits\|The Wet Bandits]] | Linear DP with Cooldown Constraint | Medium | Solved |
| 05 | [[05 - What Sequence Is This\|What Sequence Is This?]] | Catalan Sequence Tabulation | Medium | Solved |
| 06 | [[06 - Which Line Is It Anyway (Easy Version)\|Which Line Is It Anyway? (Easy Version)]] | Two-State Assembly Line DP | Easy | Solved |

## Patterns Covered

- **0/1 and Unbounded Knapsack Counting** (01, 02): Iterating capacity backwards enforces at-most-once item selection (0/1 subset counting), whereas iterating capacity forwards over an outer denomination loop counts order-independent combinations with unlimited coin reuse.
- **Offline Table Precomputation for Multi-Query Workloads** (02, 03): Computing a single DP table up to the maximum constraint bound turns hundreds of thousands of online queries into $O(1)$ lookups.
- **Linear Decision DP with Exclusion Windows** (04): Maintaining prefix optima reduces exponential include-or-skip branching under distance-$K$ cooldown constraints to a single $O(N)$ pass.
- **Quadratic Convolution & Recurrence Recognition** (05): Tabulating Catalan splits $F_n = \sum_{i=0}^{n-1} F_i F_{n-1-i}$ eliminates exponential recomputation while preserving modular arithmetic invariants.
- **Rolling Multi-Track State Compression** (06): Tracking only the minimum completion times at the two assembly lines collapses $O(N)$ level transitions to $O(1)$ auxiliary DP state space.

## References & Navigation

- **Previous Problem Set:** [[[PS] Empress Arcana]]
- **Next Problem Set:** [[[PS] Hierophant Arcana]]
- **Related Notes:** [[Dynamic Programming Introduction]]
