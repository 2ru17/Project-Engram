---
id: Combinations
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Combinations]]

---

## Overview

A **Combination** is a selection of $r$ objects from a set of $n$ distinct objects **without regard to order** (and without replacement). While permutations treat $(A, B)$ and $(B, A)$ as distinct arrangements, combinations treat $\{A, B\}$ as a single subset.

## Key Definitions

- **Binomial Coefficient ($\binom{n}{r}$ or $_nC_r$):** The number of $r$-element subsets chosen from $n$ distinct elements:
  $$\binom{n}{r} = \frac{P(n, r)}{r!} = \frac{n!}{r!(n - r)!}, \quad 0 \le r \le n$$
- **Symmetry Identity:** $\binom{n}{r} = \binom{n}{n - r}$ (choosing $r$ items to include is equivalent to choosing $n - r$ items to leave behind).
- **Pascal's Identity:** $\binom{n}{r} = \binom{n-1}{r-1} + \binom{n-1}{r}$.
- **Total Subsets Identity:** $\sum_{r=0}^n \binom{n}{r} = 2^n$.

## Worked Example

**Problem:** From a pool of $8$ cybersecurity engineers and $6$ network administrators, how many ways can a $5$-person incident response committee be formed if it must contain **exactly $3$** cybersecurity engineers and **$2$** network administrators?

**Solution:**
$$\binom{8}{3} \times \binom{6}{2} = \frac{8 \times 7 \times 6}{3 \times 2 \times 1} \times \frac{6 \times 5}{2 \times 1} = 56 \times 15 = 840$$

## Multiple Choice Questions

1. Why do we divide the permutation count $P(n, r) = \frac{n!}{(n-r)!}$ by $r!$ to obtain the combination formula $\binom{n}{r}$?
    - **A)** Because $r!$ objects are removed from the pool.
    - **B)** Because every unordered subset of size $r$ can be ordered internally in $r!$ distinct ways that are all equivalent when order does not matter.
    - **C)** Because sampling is done with replacement.
    - **D)** Because $n!$ is always divisible by $r$.

2. What is the value of $\binom{10}{3}$?
    - **A)** $720$
    - **B)** $120$
    - **C)** $30$
    - **D)** $240$

3. Which combinatorics identity explains why $\binom{100}{98} = \binom{100}{2} = 4950$?
    - **A)** Vandermonde's Identity
    - **B)** Symmetry Identity: $\binom{n}{r} = \binom{n}{n-r}$
    - **C)** Stirling's Approximation
    - **D)** De Morgan's Law

4. A standard deck has $52$ cards ($4$ suits of $13$ ranks each). How many distinct $5$-card poker hands contain **all $4$ Aces**?
    - **A)** $48$
    - **B)** $52$
    - **C)** $\binom{52}{4}$
    - **D)** $4! \times 48$

5. What does the sum $\sum_{k=0}^{n} \binom{n}{k}$ equal for any non-negative integer $n$?
    - **A)** $n!$
    - **B)** $n^2$
    - **C)** $2^n$
    - **D)** $2^{n-1}$

### Answer Key & Explanations

1. **B**. In ordered permutations $P(n, r)$, each $r$-element subset appears $r!$ times (once for each internal permutation of its $r$ elements). Dividing by $r!$ collapses those $r!$ orderings into a single unordered combination.
2. **B**. $\binom{10}{3} = \frac{10 \times 9 \times 8}{3 \times 2 \times 1} = \frac{720}{6} = 120$.
3. **B**. By symmetry, selecting $r = 98$ items to keep is in one-to-one correspondence with selecting $n - r = 2$ items to omit: $\binom{100}{98} = \binom{100}{2} = \frac{100 \times 99}{2} = 4950$.
4. **A**. Choosing all $4$ Aces can be done in $\binom{4}{4} = 1$ way, and the remaining $1$ card in the $5$-card hand can be chosen from the other $48$ non-Ace cards in $\binom{48}{1} = 48$ ways ($1 \times 48 = 48$).
5. **C**. By the Binomial Theorem with $x=1, y=1$, $(1+1)^n = \sum_{k=0}^n \binom{n}{k} = 2^n$, which counts all possible subsets of an $n$-element set.

## References & Navigation

- **Previous Topic:** [[Permutations]]
- **Next Topic:** [[Basic Formula of Probability]]
- **Related Notes:** [[Counting by Cases]], [[Expected Event]]
