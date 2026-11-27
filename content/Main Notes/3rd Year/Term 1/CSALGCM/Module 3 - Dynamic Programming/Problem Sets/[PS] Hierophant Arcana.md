---
id: ps_hierophant_arcana
type: problem_set
course: CSALGCM
topic: "Hierophant Arcana"
status: completed
---

# Hierophant Arcana

> [!info] Document Metadata
> **Course:** `=this.course` | **Topic:** `=this.topic` | **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Problem Sets]] #[[Dynamic Programming]]
---

The **Hierophant Arcana** problem set covers linear, multi-dimensional, resource-constrained, and bitmask dynamic programming formulations. Across eight HackerRank challenges, the set progresses from 1D path optimization and constrained combinatorics to multi-state resource tracking (energy, durability, and crafting points) and exact subset optimization over bitmasks.

## Problem List

| # | Problem | Core Technique | Difficulty | Status |
| :--- | :--- | :--- | :--- | :--- |
| 01 | [[01 - Dodging Spikes (Easy)\|Dodging Spikes (Easy)]] | 1D Min-Cost Linear DP | Easy | Solved |
| 02 | [[02 - Dodging Spikes (Medium)\|Dodging Spikes (Medium)]] | 1D Path-Counting DP | Medium | Solved |
| 03 | [[03 - Dodging Spikes (Hard)\|Dodging Spikes (Hard)]] | Dual-Objective Variable-Jump DP | Hard | Solved |
| 04 | [[04 - Just A Few More Steps\|Just A Few More Steps]] | Bounded Random Walk / Dyck Path DP | Medium | Solved |
| 05 | [[05 - Which Line Is It Anyway (Medium Version)\|Which Line Is It Anyway? (Medium Version)]] | Multi-Lane Grid / Assembly Line DP | Medium | Solved |
| 06 | [[06 - Blasting Through With Sonic Speed\|Blasting Through With Sonic Speed]] | 2D State DP with Energy Resource | Medium | Solved |
| 07 | [[07 - Tataru Taru, Disciple of the Hand\|Tataru Taru, Disciple of the Hand]] | Action-Bounded Unbounded Knapsack DP | Hard | Solved |
| 08 | [[08 - Gigaman Z\|Gigaman Z]] | Bitmask Subset DP | Hard | Solved |

## Patterns Covered

- **1D Linear Path Optimization & Counting** (01, 02, 03): Defining states over linear indices with forbidden cells (`'1'`) to minimize step counts, count paths modulo $10^9 + 7$, or generalize transitions over a variable jump set.
- **2D Step-Position Counting** (04): Tracking `(step, position)` states on a non-negative ray to count valid return walks (Catalan / Dyck paths) with $O(N)$ rolling-array space.
- **Multi-Lane / Grid Transition DP** (05): Minimizing cumulative assembly cost across $N$ levels and $M$ parallel lines with an adjacent-line transfer penalty $K$.
- **Resource-Augmented State DP** (06, 07): Expanding the DP state with accumulated energy (06) or remaining action count and crafting points (07) while recognizing dominated or unreachable states.
- **Bitmask Subset DP** (08): Representing defeated boss subsets as $N$-bit integers in $[0, 2^N)$ to optimize sequential acquisition order in $O(2^N \cdot N^2)$ time.

## References & Navigation

- **Previous Problem Set:** [[[PS] Emperor Arcana]]
- **Next Problem Set:** [[[PS] Lovers Arcana]]
- **Related Notes:** [[Dynamic Programming Introduction]]
