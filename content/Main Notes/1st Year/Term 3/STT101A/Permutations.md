---
id: Permutations
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Permutations]]

---

## Overview

A **Permutation** is an **ordered** arrangement of objects. Unlike combinations (where only membership in a subset matters), changing the sequence of selected elements in a permutation creates a distinct outcome: $(A, B, C) \ne (C, B, A)$.

## Key Definitions

- **Permutations of All $n$ Distinct Objects:** $P(n, n) = n! = n(n-1)(n-2)\cdots 2 \cdot 1$ (with $0! = 1$ by convention).
- **$r$-Permutations of $n$ Distinct Objects (Without Replacement):**
  $$P(n, r) = {}_nP_r = n(n-1)(n-2)\cdots(n-r+1) = \frac{n!}{(n - r)!}, \quad 0 \le r \le n$$
- **Permutations of $n$ Objects with Indistinguishable Duplicates:** $\frac{n!}{n_1! n_2! \cdots n_k!}$.
- **Circular Permutations of $n$ Distinct Objects:** $(n - 1)!$.

## Worked Example

**Problem:** A cybersecurity competition has $10$ finalist teams.
1. In how many ways can 1st, 2nd, and 3rd place trophies be awarded?
   $$P(10, 3) = \frac{10!}{(10-3)!} = 10 \times 9 \times 8 = 720$$
2. In how many ways can $6$ speakers be scheduled in $6$ consecutive time slots if Speaker A and Speaker B must speak **consecutively** (back-to-back)?
   - Treat $\{A, B\}$ as a single fused block, giving $5$ units to permute in $5! = 120$ ways, and multiply by $2! = 2$ internal orderings ($AB$ or $BA$): $5! \times 2! = 240$.

## Multiple Choice Questions

1. What is the value of $P(8, 3)$?
    - **A)** $56$
    - **B)** $336$
    - **C)** $512$
    - **D)** $24$

2. Why is $0!$ defined to equal $1$ in combinatorics?
    - **A)** So that formulas like $P(n, n) = \frac{n!}{(n-n)!} = \frac{n!}{0!} = n!$ and $\binom{n}{0} = \frac{n!}{0!n!} = 1$ remain algebraically consistent, and because there is exactly $1$ way to arrange zero objects (the empty tuple).
    - **B)** Because $0 \times 1 = 1$.
    - **C)** Because factorials cannot be larger than $1$.
    - **D)** It is actually equal to $0$.

3. In how many ways can $5$ distinct books be arranged on a shelf if $2$ specific books (Book X and Book Y) must **never** be placed next to each other?
    - **A)** $120$
    - **B)** $48$
    - **C)** $72$
    - **D)** $24$

4. How many ways can $6$ people be seated around a circular conference table if rotations of the same seating arrangement are considered identical?
    - **A)** $6! = 720$
    - **B)** $(6 - 1)! = 5! = 120$
    - **C)** $\frac{6!}{2} = 360$
    - **D)** $6^2 = 36$

5. Which problem requires **Permutations** ($P(n, r)$) rather than Combinations ($\binom{n}{r}$)?
    - **A)** Selecting $4$ toppings for a pizza from $12$ available toppings.
    - **B)** Choosing $3$ students from a class of $30$ to form an unranked study group.
    - **C)** Assigning a President, Vice President, and Secretary from a club of $20$ members.
    - **D)** Dealing a $5$-card hand from a $52$-card deck where card order in the hand does not matter.

### Answer Key & Explanations

1. **B**. $P(8, 3) = 8 \times 7 \times 6 = 336$.
2. **A**. There is exactly one empty permutation of $\emptyset$, and setting $0! = 1$ preserves the recurrence $n! = n \cdot (n-1)!$ at $n=1$ ($1! = 1 \cdot 0!$) as well as $\frac{n!}{(n-n)!} = n!$.
3. **C**. Total arrangements of $5$ books $= 5! = 120$. Arrangements where X and Y ARE adjacent (treating XY as one block) $= 4! \times 2! = 24 \times 2 = 48$. By the complement, $120 - 48 = 72$.
4. **B**. For circular permutations of $n = 6$ distinct objects, fixing one person's seat as the reference point leaves $(6 - 1)! = 5! = 120$ arrangements.
5. **C**. Because the three offices (President, VP, Secretary) are distinct roles, order of assignment matters, yielding $P(20, 3) = 20 \times 19 \times 18$.

## References & Navigation

- **Previous Topic:** [[Counting by Cases]]
- **Next Topic:** [[Combinations]]
- **Related Notes:** [[Fundamental Principle of Counting]], [[Basic Formula of Probability]]
