---
id: Counting-Techniques
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Counting Techniques]]

---

## Overview

**Combinatorial Counting Techniques** systematically determine the cardinality $|S|$ and $|E|$ of finite sample spaces without listing every outcome individually. Choosing the right formula depends on two classification questions: **(1) Does order matter?** and **(2) Is sampling done with or without replacement?**

## Key Definitions

| Order Matters? | With Replacement | Without Replacement |
| :--- | :---: | :---: |
| **Yes (Ordered Tuple / Permutation)** | $n^r$ | $P(n, r) = \frac{n!}{(n-r)!}$ |
| **No (Unordered Subset / Combination)** | $\binom{n + r - 1}{r}$ | $\binom{n}{r} = \frac{n!}{r!(n-r)!}$ |

- **Multinomial Coefficient (Permutations with Identical Items):** The number of distinct arrangements of $n$ items consisting of $n_1$ identical of type 1, ..., $n_k$ identical of type $k$ is $\frac{n!}{n_1! n_2! \cdots n_k!}$.

## Worked Example

**Problem:** How many distinct strings can be formed by rearranging all the letters of the word `MISSISSIPPI`?

**Solution:**
- Total letters $n = 11$: $1\text{ M}$, $4\text{ I}$'s, $4\text{ S}$'s, $2\text{ P}$'s.
- Distinct arrangements $= \frac{11!}{1! \, 4! \, 4! \, 2!} = \frac{39,916,800}{1 \times 24 \times 24 \times 2} = \frac{39,916,800}{1152} = 34,650$.

## Multiple Choice Questions

1. How many distinct $4$-digit PIN codes can be formed using digits $0$–$9$ if digits **may be repeated** (order matters, with replacement)?
    - **A)** $P(10, 4) = 5040$
    - **B)** $10^4 = 10,000$
    - **C)** $\binom{10}{4} = 210$
    - **D)** $4^{10} = 1,048,576$

2. Which formula counts the number of ways to arrange $n$ items in a circle (circular permutations, where rotations are considered identical)?
    - **A)** $n!$
    - **B)** $(n - 1)!$
    - **C)** $\frac{n!}{2}$
    - **D)** $n^2$

3. How many distinct permutations can be formed using all $6$ letters of the word `BANANA`?
    - **A)** $720$
    - **B)** $120$
    - **C)** $60$
    - **D)** $36$

4. When selecting $r$ items from $n$ distinct items **without replacement**, how are $P(n, r)$ and $\binom{n}{r}$ related?
    - **A)** $P(n, r) = r! \cdot \binom{n}{r}$
    - **B)** $\binom{n}{r} = r! \cdot P(n, r)$
    - **C)** $P(n, r) = \binom{n}{r} + r!$
    - **D)** They are always equal.

5. A lottery draws $6$ numbers from $1$ to $45$ **without replacement**, and the order in which the balls are drawn does NOT matter. How many distinct lottery combinations exist?
    - **A)** $45^6$
    - **B)** $P(45, 6)$
    - **C)** $\binom{45}{6} = 8,145,060$
    - **D)** $6! \times 45$

### Answer Key & Explanations

1. **B**. Each of the $4$ positions independently has $10$ choices ($0$–$9$), yielding $10 \times 10 \times 10 \times 10 = 10^4 = 10,000$.
2. **B**. Fixing one element's position breaks rotational symmetry ($n$ equivalent rotations per linear arrangement), leaving $(n - 1)!$ distinct circular arrangements.
3. **C**. `BANANA` has $n = 6$ letters with $3$ `A`s, $2$ `N`s, and $1$ `B`. The multinomial formula gives $\frac{6!}{3! \, 2! \, 1!} = \frac{720}{6 \times 2 \times 1} = 60$.
4. **A**. Every unordered $r$-combination can be ordered in $r!$ ways to form an ordered $r$-permutation, so $P(n, r) = r! \binom{n}{r}$.
5. **C**. Since selection is without replacement and order does not matter, the number of outcomes is $\binom{45}{6} = 8,145,060$.

## References & Navigation

- **Previous Topic:** [[Mutually Exclusive Events]]
- **Next Topic:** [[Fundamental Principle of Counting]]
- **Related Notes:** [[Complement]], [[Counting by Cases]]
