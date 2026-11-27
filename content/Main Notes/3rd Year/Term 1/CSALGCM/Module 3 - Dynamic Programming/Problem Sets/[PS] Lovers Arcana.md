---
id: ps_lovers_arcana
type: problem_set
course: CSALGCM
topic: "Lovers Arcana (Hands-On 1)"
status: completed
---

# Lovers Arcana (Hands-On 1)

> [!info] Document Metadata
> **Course:** `=this.course` | **Topic:** `=this.topic` | **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Problem Sets]] #[[Dynamic Programming]]
---

The **Lovers Arcana (Hands-On 1)** problem set bridges divide-and-conquer search techniques with foundational dynamic programming patterns. Across six HackerRank challenges, it covers one-time sorting with binary search range queries, iterative recurrence simulation, finite-difference precomputation, rolling-array Damerau-Levenshtein edit distance, monotonic binary search on the answer with overflow clamping, and subset bitmask dynamic programming with capped costs.

## Problem List

| # | Problem | Core Technique | Difficulty | Status |
| :--- | :--- | :--- | :--- | :--- |
| 01 | [[01 - Quantum Leap\|Quantum Leap]] | Sorting + Binary Search (`bisect`) | Easy | Solved |
| 02 | [[02 - Weird Recurrence\|Weird Recurrence]] | Iterative Recurrence Simulation | Easy | Solved |
| 03 | [[03 - Sequence Distillation\|Sequence Distillation]] | Difference Precomputation + Binary Search | Medium | Solved |
| 04 | [[04 - These Vowels Feel Special\|These Vowels Feel Special]] | 3-Row Rolling Damerau-Levenshtein DP | Medium | Solved |
| 05 | [[05 - In My Restless Dreams, I See That Place\|In My Restless Dreams, I See That Place]] | Binary Search on Answer + Value Clamping | Hard | Solved |
| 06 | [[06 - Rollercoaster Sequences\|Rollercoaster Sequences]] | Bitmask Subset + Capped Cost DP | Hard | Solved |

## Patterns Covered

- **Pre-Sorting & Binary Search Range Counting** (01, 03): Sorting static datasets once upfront so each threshold or interval query runs in $O(\log N)$ time via `bisect_left` and `bisect_right`.
- **Iterative State Simulation** (02): Converting tail/linear recurrences into an $O(1)$-space loop to avoid Python recursion depth limits (`RecursionError`).
- **3-Row Rolling String Edit DP** (04): Extending 2D Levenshtein edit distance with adjacent transposition (`Swap`) and vowel-restricted substitution (`Vowelize`) while retaining only rows $i$, $i - 1$, and $i - 2$.
- **Monotonic Binary Search on the Answer** (05): Exploiting non-decreasing parameter monotonicity over a large search space $[0, 10^8]$, combined with order-statistic threshold precomputation and arithmetic clamping to prevent big-integer blowup.
- **Bitmask Subset & Capped Cost DP** (06): Encoding visited element subsets as $N$-bit masks and clamping accumulated transition scores at the target threshold $K$ to bound state dimensionality.

## References & Navigation

- **Previous Problem Set:** [[[PS] Hierophant Arcana]]
- **Next Problem Set:** [[[PS] Justice Arcana]]
- **Related Notes:** [[Dynamic Programming Introduction]], [[Divide and Conquer Introduction]]
