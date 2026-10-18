---
id: Fundamental-Principle-of-Counting
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Fundamental Principle of Counting]]

---

## Overview

The **Fundamental Principle of Counting** (Basic Multiplication Principle / Rule of Product) states that if a sequential process consists of $k$ stages where Stage 1 has $n_1$ possible outcomes, and for each outcome of the preceding stages Stage $i$ has $n_i$ possible outcomes, then the total number of distinct composite outcomes is the product:
$$N = n_1 \times n_2 \times \cdots \times n_k$$

## Key Definitions

- **Two-Stage Rule of Product:** If task $A$ can be performed in $m$ ways and for each of those ways task $B$ can be performed in $n$ ways, the sequence $(A, B)$ can be performed in $m \times n$ ways.
- **Cartesian Product Interpretation:** For finite sets $A_1, A_2, \dots, A_k$, $|A_1 \times A_2 \times \cdots \times A_k| = |A_1| \cdot |A_2| \cdots |A_k|$.
- **Tree Diagram Uniformity:** Every node at depth $i-1$ must have the same branching factor $n_i$ (even if the *specific set* of options changes, as in sampling without replacement where $n_1 = n, n_2 = n-1, \dots$).

## Worked Example

**Problem:** Philippine license plates in a certain format consist of $3$ uppercase English letters ($26$ possibilities each) followed by $4$ digits ($0$–$9$, $10$ possibilities each).
1. If repetition of letters and digits is allowed: $26^3 \times 10^4 = 17,576 \times 10,000 = 175,760,000$.
2. If no letter or digit may be repeated: $(26 \times 25 \times 24) \times (10 \times 9 \times 8 \times 7) = 15,600 \times 5,040 = 78,624,000$.

## Multiple Choice Questions

1. A cloud deployment configuration requires choosing $1$ of $4$ regions, $1$ of $3$ instance sizes, and $1$ of $5$ operating system images. How many distinct deployment configurations exist?
    - **A)** $4 + 3 + 5 = 12$
    - **B)** $4 \times 3 \times 5 = 60$
    - **C)** $4! \times 3! \times 5!$
    - **D)** $5^4 \times 3$

2. For the Fundamental Principle of Counting ($n_1 \times n_2$) to apply directly without splitting into cases, what must be true about $n_2$?
    - **A)** The *number* of available options $n_2$ at Stage 2 must be the same for every choice made at Stage 1 (even if the specific items available at Stage 2 depend on Stage 1).
    - **B)** The *set* of available options at Stage 2 must be identical regardless of the Stage 1 choice.
    - **C)** $n_2$ must equal $n_1$.
    - **D)** Stage 1 and Stage 2 must be mutually exclusive.

3. A multiple-choice quiz has $10$ questions, each with $4$ options ($A, B, C, D$). In how many ways can a student answer all $10$ questions?
    - **A)** $10^4 = 10,000$
    - **B)** $4 \times 10 = 40$
    - **C)** $4^{10} = 1,048,576$
    - **D)** $P(10, 4) = 5,040$

4. How many positive divisors does the integer $360 = 2^3 \times 3^2 \times 5^1$ have, using the Fundamental Principle of Counting on the prime exponents?
    - **A)** $3 \times 2 \times 1 = 6$
    - **B)** $2^3 + 3^2 + 5^1 = 22$
    - **C)** $3 + 2 + 1 = 6$
    - **D)** $(3 + 1)(2 + 1)(1 + 1) = 4 \times 3 \times 2 = 24$

5. Why does the number of subsets of an $n$-element set equal $2^n$ by the Fundamental Principle of Counting?
    - **A)** Because we only choose subsets of size $2$.
    - **B)** Because constructing a subset is an $n$-stage decision process where each of the $n$ elements independently has $2$ choices (either include it or exclude it): $2 \times 2 \times \cdots \times 2 = 2^n$.
    - **C)** Because $n + n = 2^n$.
    - **D)** Because order matters in a subset.

### Answer Key & Explanations

1. **B**. By the Fundamental Principle of Counting, a 3-stage choice with $4$, $3$, and $5$ options per stage yields $4 \times 3 \times 5 = 60$ composite configurations.
2. **A**. The Multiplication Principle requires a uniform branching factor $n_2$ across all branches of Stage 1. For example, when drawing 2 cards without replacement, the *specific* 51 remaining cards depend on the first card drawn, but the *count* $n_2 = 51$ is constant ($52 \times 51$).
3. **C**. There are $10$ stages (questions), each with $4$ choices, giving $4 \times 4 \times \cdots \times 4 = 4^{10} = 1,048,576$ answer sheets.
4. **D**. Any divisor of $2^3 \cdot 3^2 \cdot 5^1$ has the form $2^a 3^b 5^c$ where $a \in \{0,1,2,3\}$ ($4$ choices), $b \in \{0,1,2\}$ ($3$ choices), and $c \in \{0,1\}$ ($2$ choices), giving $4 \times 3 \times 2 = 24$ divisors.
5. **B**. Each of the $n$ elements has $2$ binary states (in the subset vs. not in the subset); multiplying $2$ across $n$ stages yields $2^n$ subsets.

## References & Navigation

- **Previous Topic:** [[Counting Techniques]]
- **Next Topic:** [[Counting by Cases]]
- **Related Notes:** [[Mutually Exclusive Events]], [[Permutations]]
