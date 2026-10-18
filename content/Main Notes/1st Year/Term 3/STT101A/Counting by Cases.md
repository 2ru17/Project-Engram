---
id: Counting-by-Cases
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Counting by Cases]]

---

## Overview

**Counting by Cases ( the Addition Principle / Rule of Sum)** decomposes a complex event $E$ into $k$ **mutually exclusive and collectively exhaustive** subcases $E_1, E_2, \dots, E_k$. Within each case, the Multiplication Rule counts the configurations; across disjoint cases, the counts are **summed**:
$$|E| = |E_1| + |E_2| + \cdots + |E_k|$$

## Key Definitions

- **Addition Principle (Rule of Sum):** If $E_1, E_2, \dots, E_k$ are pairwise disjoint ($E_i \cap E_j = \emptyset$ for $i \ne j$), then $\left|\bigcup_{i=1}^k E_i\right| = \sum_{i=1}^k |E_i|$.
- **Case-Splitting Strategy:** Used whenever constraints change depending on an earlier choice (e.g., *"at least $k$"*, *"at most $k$"*, or digit restrictions where $0$ cannot be a leading digit but can be the last digit of an even number).

## Worked Example

**Problem:** From $6$ men and $5$ women, a $4$-person committee must have **at least $3$ women**. How many such committees can be formed?

**Solution:**
Split into two mutually exclusive cases based on the exact number of women:
- **Case 1 (Exactly 3 women and 1 man):** $\binom{5}{3} \times \binom{6}{1} = 10 \times 6 = 60$.
- **Case 2 (Exactly 4 women and 0 men):** $\binom{5}{4} \times \binom{6}{0} = 5 \times 1 = 5$.
- **Total:** $60 + 5 = 65$.

## Multiple Choice Questions

1. What condition MUST be satisfied by the cases $E_1, E_2, \dots, E_k$ when applying Counting by Cases ($|E| = \sum |E_i|$)?
    - **A)** The cases must be statistically independent.
    - **B)** The cases must be pairwise disjoint (mutually exclusive) and their union must equal $E$.
    - **C)** Each case must have the exact same number of outcomes.
    - **D)** There can be at most two cases.

2. Why is the following attempt to count 4-person committees with *at least 1 woman* from $5$ women and $6$ men INCORRECT: $\binom{5}{1} \times \binom{10}{3} = 5 \times 120 = 600$?
    - **A)** Because committees with $2, 3,$ or $4$ women are counted multiple times (the cases overlap depending on which woman is chosen first).
    - **B)** Because $\binom{5}{1}$ should be $5!$.
    - **C)** Because men and women cannot be on the same committee.
    - **D)** Because $\binom{10}{3} = 720$.

3. Using valid Counting by Cases (or the complement), how many $4$-person committees from $5$ women and $6$ men have **at least $1$ woman**?
    - **A)** $600$
    - **B)** $315$
    - **C)** $330$
    - **D)** $15$

4. How many $3$-digit **even** integers with **distinct digits** can be formed from $\{0, 1, 2, 3, 4, 5\}$ (where the hundreds digit cannot be $0$)?
    - **A)** $60$
    - **B)** $52$
    - **C)** $48$
    - **D)** $36$

5. Why must the problem in Question 4 be split into Case 1 (units digit is $0$) and Case 2 (units digit is $2$ or $4$)?
    - **A)** Because if the units digit is $0$, all $5$ remaining digits are valid for the hundreds place; whereas if the units digit is $2$ or $4$, $0$ is still unused and cannot occupy the hundreds place (leaving only $4$ choices).
    - **B)** Because $0$ is an odd number.
    - **C)** Because $2$ and $4$ can be repeated.
    - **D)** Because multiplication is not associative.

### Answer Key & Explanations

1. **B**. The Rule of Sum holds without inclusion-exclusion adjustments if and only if no outcome belongs to two different cases ($E_i \cap E_j = \emptyset$) and every valid outcome in $E$ falls into one of the cases.
2. **A**. Selecting 1 woman first ($\binom{5}{1}$) and then 3 people from the remaining 10 ($\binom{10}{3}$) counts a committee with $k$ women $k$ times—once for each woman who could be designated as the "first" woman.
3. **B**. Total committees $= \binom{11}{4} = 330$; committees with $0$ women $= \binom{6}{4} = 15$; thus $330 - 15 = 315$ (or by cases: $\binom{5}{1}\binom{6}{3} + \binom{5}{2}\binom{6}{2} + \binom{5}{3}\binom{6}{1} + \binom{5}{4}\binom{6}{0} = 100 + 150 + 60 + 5 = 315$).
4. **B**. Case 1 (units digit $= 0$): $1 \text{ choice for units} \times 5 \text{ for hundreds} \times 4 \text{ for tens} = 20$. Case 2 (units digit $\in \{2,4\}$): $2 \text{ choices for units} \times 4 \text{ for hundreds (not } 0 \text{ or units)} \times 4 \text{ for tens} = 32$. Total $= 20 + 32 = 52$.
5. **A**. The number of available choices for the hundreds digit depends on whether $0$ was already used in the units place ($5$ choices if $0$ was used; $4$ choices if $2$ or $4$ was used), requiring two disjoint cases.

## References & Navigation

- **Previous Topic:** [[Fundamental Principle of Counting]]
- **Next Topic:** [[Permutations]]
- **Related Notes:** [[Counting Techniques]], [[Combinations]]
