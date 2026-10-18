---
id: Little-o-Notation
type: note
course: CCDSALG
topic: Algorithms
status: completed
---

# Little-o Notation

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> f(n) = o(g(n)) means f(n) grows strictly slower than g(n).

## Details / Theory

## Strict Upper Bound.
 `f(n) = o(g(n))` means `f(n)` grows _strictly slower than_ `g(n)`. `lim (n→∞) f(n)/g(n) = 0`.
Example: `n² = o(n³)`. `n²` is _not_ `o(n²)`.

## Complexity

| Operation | Time | Space |
| --------- | ---- | ----- |
|           |      |       |

## Common Pitfalls
 Confusing little-o with Big-O — little-o is _strictly_ less than, while Big-O allows equality. Forgetting that $f(n) = o(g(n))$ means $f(n)/g(n) \to 0$, not just $\leq$.

## Summary

> TL;DR — Little-o ($o$) gives a strict upper bound: $f(n) = o(g(n))$ means $f$ grows strictly slower than $g$. Unlike Big-O, equality of growth rates is excluded.

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. What does $f(n) = o(g(n))$ mean?
    - **A)** $f(n)$ grows strictly faster than $g(n)$
    - **B)** $f(n)$ grows strictly slower than $g(n)$
    - **C)** $f(n)$ grows at exactly the same rate as $g(n)$
    - **D)** $f(n)$ grows no faster than $g(n)$, but can equal it

2. What is the limit definition for little-o notation?
    - **A)** limit as $n \to \infty$ of $f(n)/g(n) = 1$
    - **B)** limit as $n \to \infty$ of $f(n)/g(n) = \infty$
    - **C)** limit as $n \to \infty$ of $f(n)/g(n) = 0$
    - **D)** limit as $n \to 0$ of $f(n)/g(n) = \infty$

3. Is $n^2 = o(n^2)$ a valid statement?
    - **A)** Yes, because they grow at the same rate.
    - **B)** No, because little-o implies a strict upper bound and excludes equality.
    - **C)** Yes, because $n^2$ grows slower than $n^3$.
    - **D)** No, because it requires Big-O instead.

4. What is the primary difference between Big-O and little-o?
    - **A)** Little-o provides a tight bound, Big-O does not.
    - **B)** Big-O allows for equality of growth rates, while little-o requires a strictly slower growth rate.
    - **C)** Little-o is used for space complexity only.
    - **D)** Big-O provides a lower bound, little-o provides an upper bound.

5. In the example given, which relationship is true?
    - **A)** $n^2 = o(n)$
    - **B)** $n^3 = o(n^2)$
    - **C)** $n^2 = o(n^3)$
    - **D)** $n^3 = o(n^3)$

### Answer Key & Explanations

1. **B**. Little-o notation defines a strict upper bound, signifying that a function grows strictly slower than another.
2. **C**. The mathematical definition states that the limit of $f(n)$ over $g(n)$ as $n$ approaches infinity must equal 0.
3. **B**. Since $n^2$ grows at exactly the same rate as $n^2$, it cannot be strictly less than it, making $o(n^2)$ invalid.
4. **B**. Big-O is $\leq$ (less than or equal to), whereas little-o is strictly $<$ (less than).
5. **C**. $n^2$ grows strictly slower than $n^3$, making $n^2 = o(n^3)$ correct.

## References & Navigation

- **Previous Topic:** [[Lesson 1- Analysis of Algorithms]]
- **Next Topic:** [[Little-omega Notation]]
- **Related Notes:** [[Asymptotic Notation]], [[Big-O Notation]]
