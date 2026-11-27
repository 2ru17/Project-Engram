---
id: ps_chariot_arcana
type: problem_set
course: CSALGCM
topic: "Chariot Arcana"
status: completed
---

# Chariot Arcana

> [!info] Document Metadata
> **Course:** `=this.course` | **Topic:** `=this.topic` | **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Problem Sets]] #[[Greedy Algorithms]]
---

The **Chariot Arcana** problem set examines core **greedy optimization** and **monotonic search** techniques across seven HackerRank challenges. The collection spans shortest-job scheduling, descending batch partitioning, discrete interval covering and activity selection, min-heap $K$-ary prefix coding, three-dimensional greedy cut ordering, and binary search over a monotonic feasibility predicate.

## Problem List

| # | Problem | Core Technique | Difficulty | Status |
| :--- | :--- | :--- | :--- | :--- |
| 01 | [[01 - Adventurer In Need (Tank Needed)\|Adventurer In Need (Tank Needed)]] | Shortest Processing Time First & Greedy Prefix | Easy | Solved |
| 02 | [[02 - The Easiest College Degree of All Time\|The Easiest College Degree of All Time]] | Descending Sort & Strided $K$-Batch Maxima | Easy | Solved |
| 03 | [[03 - The Retribution of Salems Lot\|The Retribution of 'Salem's Lot]] | Greedy Interval Covering (Maximum Right-Reach) | Medium | Solved |
| 04 | [[04 - The Fair Maiden Fangirls of Waterdeep\|The Fair Maiden Fangirls of Waterdeep]] | Activity Selection (Earliest Finish Time) | Easy | Solved |
| 05 | [[05 - Hiding In The Tranquiline Halls of Valhalla\|Hiding In The Tranquiline Halls of Valhalla]] | Binary Search on Answer & Feasibility Counting | Medium | Solved |
| 06 | [[06 - Optimizing Chicken Jay\|Optimizing Chicken Jay]] | Min-Heap $K$-ary Huffman Prefix Coding | Medium | Solved |
| 07 | [[07 - Algo-Man and the Class of 25 Quatromania\|Algo-Man and the Class of '25: Quatromania]] | Descending Cost Ordering & 3D Cross-Section Counting | Hard | Solved |

## Patterns Covered

- **Shortest-Job & Batch-Absorption Sorting** (01, 02): Sorting candidates by total resource cost ($W_i + C_i$) or descending difficulty ($D_i$) so the largest element in every group of size $K$ absorbs the cost of up to $K - 1$ smaller elements.
- **Interval Covering & Interval Scheduling** (03, 04): Scanning sorted intervals to either greedily maximize right endpoint reach over a discrete segment $[1, L]$ or select the maximum number of non-overlapping intervals by earliest finish time $E_i$.
- **Binary Search on Monotonic Predicates** (05): Transforming a minimax capacity objective into a $O(M)$ feasibility test $\sum_{i=1}^M \lceil P_i / X \rceil \le N$ over candidate cap $X$.
- **Min-Heap $K$-ary Tree Merging** (06): Repeatedly extracting up to $K$ minimum-frequency nodes from a priority queue to construct an optimal prefix-free encoding that minimizes weighted codeword length.
- **Multi-Axis Greedy Cost Multiplication** (07): Ordering orthogonal cuts in strictly non-increasing order of base instability factor so high-cost cuts traverse the fewest existing prism cross-sections.

## References & Navigation

- **Previous Problem Set:** [[[PS] Justice Arcana]]
- **Next Problem Set:** [[[PS] Hermit Arcana]]
- **Related Notes:** [[Greedy Algorithms Introduction]]
