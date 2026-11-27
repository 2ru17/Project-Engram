---
id: ps_hermit_arcana
type: problem_set
course: CSALGCM
topic: "Hermit Arcana (Hands-On 2)"
status: completed
---

# Hermit Arcana (Hands-On 2)

> [!info] Document Metadata
> **Course:** `=this.course` | **Topic:** `=this.topic` | **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Problem Sets]] #[[Greedy Algorithms]] #[[Dynamic Programming]]
---

The **Hermit Arcana (Hands-On 2)** problem set synthesizes **Greedy Algorithms** and **Dynamic Programming** across six HackerRank challenges for `CSALGCM`. On the greedy side, the set covers budget-constrained Manhattan distance selection, continuous interval covering without gaps, and exact fractional $K$-ary Huffman coding in $O(N \log N)$ time. On the dynamic programming side, it progresses from shifted third-order rolling recurrences to resource-coupled state transitions and space-compressed multidimensional knapsack counting.

## Problem List

| # | Problem | Core Technique | Difficulty | Status |
| :--- | :--- | :--- | :--- | :--- |
| 01 | [[01 - Youre Like an Electron - Youre So Negative\|You're Like an Electron - You're So Negative]] | Shifted Index Rolling Recurrence ($O(1)$ Space) | Easy | Solved |
| 02 | [[02 - Welcome to Algo Burger\|Welcome to Algo Burger, Home of the Algo Burger, May I Take Your Order?]] | Ascending Manhattan Cost Greedy Selection | Easy | Solved |
| 03 | [[03 - Its a Matter of Fusion\|It's a Matter of Fusion]] | Charge-Indexed Rolling Dynamic Programming | Medium | Solved |
| 04 | [[04 - These Ghosts Are So Annoying\|These Ghosts Are So Annoying]] | Greedy Continuous Interval Covering | Medium | Solved |
| 05 | [[05 - We Got a 4-D Dynamic Programming Problem in CSALGCM Before GTA VII\|We Got a 4-D Dynamic Programming Problem in CSALGCM Before GTA VII]] | 3D Rolling Multidimensional Counting DP | Medium | Solved |
| 06 | [[06 - Great Expectations\|Great Expectations!]] | $K$-ary Huffman Coding with LCM Scaling & Two-Queue Merge | Hard | Solved |

## Patterns Covered

- **Shifted Rolling Recurrence** (01): Re-indexing negative base cases $F(-n_0), F(-n_0+1), F(-n_0+2)$ by $+n_0$ so a constant-memory three-variable sliding window computes $F(n)$ in $2n - 2$ modular steps.
- **Equal-Reward Minimum-Cost Greedy Selection** (02): Sorting uniform-reward items by Manhattan distance $d_i$ and taking the longest affordable prefix within the integer distance cap $\lfloor B / K \rfloor$.
- **Resource-Bounded Rolling State DP** (03): Tracking maximum accumulated reaction energy keyed by current capped charge count $ch \in [0, X]$ across sequential material transformations.
- **Greedy Furthest-Reach Interval Covering** (04): Sorting intervals by left endpoint $L_i$ and repeatedly selecting the interval with $L_i \le \text{covered}$ that maximizes the right endpoint $H_i$ to cover $[1, F]$ without gaps.
- **Space-Compressed Multi-Constraint Counting DP** (05): Compressing a 4D DP over $(i, dv, dt, dm)$ into a rolling 3D table over spent resources while enforcing strict vitality survival ($dv \le V - 1$) and conditional multiplier branching.
- **Exact Fractional $K$-ary Huffman Coding** (06): Scaling rational probabilities by their denominator LCM to integer weights, padding the initial merge to size $((N - 1) \bmod (K - 1)) + 1$, and executing two-queue $K$-way merges for exact prefix-free optimality.

## References & Navigation

- **Previous Problem Set:** [[[PS] Chariot Arcana]]
- **Related Notes:** [[Greedy Algorithms Introduction]], [[Dynamic Programming Introduction]]
