---
id: ps_justice_arcana
type: problem_set
course: CSALGCM
topic: "Justice Arcana"
status: completed
---

# Justice Arcana

> [!info] Document Metadata
> **Course:** `=this.course` | **Topic:** `=this.topic` | **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Problem Sets]] #[[Greedy Algorithms]]
---

The **Justice Arcana** problem set explores foundational **greedy algorithm** paradigms across six HackerRank challenges. The set emphasizes greedy selection by sorting on a single key or composite priority tuple, sign-based subset maximization with non-empty constraints, order-statistic margin minimization, and pigeonhole-style sequence partitioning justified via formal exchange and upper-bound arguments.

## Problem List

| # | Problem | Core Technique | Difficulty | Status |
| :--- | :--- | :--- | :--- | :--- |
| 01 | [[01 - The Tragedy of Salems Lot\|The Tragedy of 'Salem's Lot]] | Ascending Sort & Minimum-$K$ Prefix Sum | Easy | Solved |
| 02 | [[02 - Its The End Of The World As We Know It\|It's The End Of The World As We Know It (And I Feel Fine)]] | Sign Partitioning & Non-Empty Fallback | Easy | Solved |
| 03 | [[03 - Logic The Unsundering\|Logic: The Unsundering]] | Lexicographic Composite Key Sorting | Easy | Solved |
| 04 | [[04 - A Chain of Memories in Castle Oblivion\|A Chain of Memories in Castle Oblivion]] | Wild-Card Segment Partitioning & Frequency Capping | Medium | Solved |
| 05 | [[05 - Problematizing the Problems 1\|Problematizing the Problems 1]] | Shortest Processing Time First Scheduling | Easy | Solved |
| 06 | [[06 - Friendly Rhythm Game\|Friendly Rhythm Game]] | Order-Statistic Selection on Timing Errors | Medium | Solved |

## Patterns Covered

- **Minimum-Cost / Shortest-Job Greedy Selection** (01, 05): Sorting feasible candidates in ascending order of resource consumption ($E_i$ or $t_i$) to satisfy a fixed quota or maximize task count within a strict budget ($F$ or $T$).
- **Sign-Based Subset Maximization** (02): Including every strictly positive contributor ($S_i > 0$) to maximize an unconstrained sum while falling back to $\max(S_i)$ when a non-empty subset is mandated.
- **Composite Priority Sorting** (03): Ordering items lexicographically by primary categorical precedence (`color == "red"`) followed by secondary numerical weight ($P_i$) to optimize two-tier objective functions.
- **Wild-Card Reset Partitioning** (04): Bounding the maximum achievable chain length by observing that $C_0$ wild-card resets yield at most $C_0 + 1$ strictly increasing segments over $\{1, \dots, 9\}$.
- **Percentile Threshold Order Statistics** (06): Converting a percentage accuracy requirement $R\%$ into an integer count $k = \lceil NR / 100 \rceil$ and selecting the $k$-th smallest absolute deviation $\vert t_i - p_i \vert$.

## References & Navigation

- **Previous Problem Set:** [[[PS] Lovers Arcana]]
- **Next Problem Set:** [[[PS] Chariot Arcana]]
- **Related Notes:** [[Greedy Algorithms Introduction]]
