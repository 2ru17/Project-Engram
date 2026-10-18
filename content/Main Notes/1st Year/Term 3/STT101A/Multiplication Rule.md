---
id: Multiplication-Rule
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Multiplication Rule]]

---

## Overview

In combinatorics, the **Multiplication Rule** (Rule of Product) states that if an operation can be broken into a sequence of $k$ ordered steps where Step $1$ has $n_1$ choices, Step $2$ has $n_2$ choices, ..., and Step $k$ has $n_k$ choices, the total number of ways to perform the entire operation is $n_1 \times n_2 \times \cdots \times n_k$.

## Key Definitions

- **Rule of Product:** $|A_1 \times A_2 \times \cdots \times A_k| = n_1 \cdot n_2 \cdots n_k$.
- **Sampling With Replacement:** Each of the $r$ steps has $n$ choices, giving $n \times n \times \cdots \times n = n^r$ ordered tuples.
- **Sampling Without Replacement:** Step 1 has $n$ choices, Step 2 has $n-1$ choices, ..., Step $r$ has $n - r + 1$ choices, giving $P(n, r) = n(n-1)\cdots(n-r+1)$.

## Worked Example

**Problem:** An IPv4 subnet host identifier has $8$ bits, each of which can be `0` or `1`. How many total $8$-bit strings exist, and how many usable host addresses remain after excluding the network address (all `0`s) and broadcast address (all `1`s)?

**Solution:**
- By the Multiplication Rule across $8$ bit positions: $2^8 = 256$ total addresses.
- Subtracting the $2$ reserved addresses leaves $2^8 - 2 = 254$ usable host addresses.

## Multiple Choice Questions

1. A restaurant menu offers $4$ appetizers, $6$ main courses, and $3$ desserts. If a meal consists of one item from each category, how many distinct meals can be ordered?
    - **A)** $13$
    - **B)** $72$
    - **C)** $27$
    - **D)** $144$

2. How many $5$-letter strings (words) can be formed from the $26$-letter English alphabet if **no letter may be repeated**?
    - **A)** $26^5$
    - **B)** $26 \times 25 \times 24 \times 23 \times 22 = 7,893,600$
    - **C)** $\binom{26}{5} = 65,780$
    - **D)** $5! = 120$

3. How many $4$-digit integers (from $1000$ to $9999$) consist entirely of **odd digits** ($\{1, 3, 5, 7, 9\}$) if repetition of digits is allowed?
    - **A)** $5^4 = 625$
    - **B)** $5 \times 4 \times 3 \times 2 = 120$
    - **C)** $4^5 = 1024$
    - **D)** $9 \times 10^3 = 9000$

4. When do we **multiply** counts (Rule of Product) versus **add** counts (Rule of Sum)?
    - **A)** We multiply for sequential stages joined by **AND** (where each stage must be completed in succession) and add for mutually exclusive alternatives joined by **OR**.
    - **B)** We multiply for disjoint cases and add for sequential stages.
    - **C)** We always multiply when numbers are small.
    - **D)** Multiplication and addition always give the same count.

5. A byte consists of $8$ bits. How many bytes begin with `10` and end with `01`?
    - **A)** $2^8 = 256$
    - **B)** $2^4 = 16$
    - **C)** $4^2 = 16$
    - **D)** $2^6 = 64$

### Answer Key & Explanations

1. **B**. By the Multiplication Rule across 3 stages: $4 \times 6 \times 3 = 72$.
2. **B**. Without replacement across 5 positions, the choices are $26, 25, 24, 23, 22$, whose product is $7,893,600$.
3. **A**. There are $5$ odd digits ($1,3,5,7,9$) and none is $0$, so each of the $4$ digit places independently has $5$ choices: $5^4 = 625$.
4. **A**. Sequential multi-step construction ("do Stage 1 AND Stage 2") multiplies branching counts, whereas choosing between disjoint cases ("Case 1 OR Case 2") sums their counts.
5. **B**. Four bit positions are fixed ($1$ choice each), and the middle $4$ bits each have $2$ choices (`0` or `1`), yielding $1 \times 1 \times 2^4 \times 1 \times 1 = 16$.

## References & Navigation

- **Previous Topic:** [[Multiplicative Rule]]
- **Next Topic:** [[Generalized Multiplication]]
- **Related Notes:** [[Conditional Probability]], [[Independent Events]]
