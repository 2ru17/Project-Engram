---
id: Big-O-Notation
type: note
course: CCDSALG
topic: Algorithms
status: completed
---

# Big-O Notation

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> f(n) = O(g(n)) means f(n) grows no faster than g(n).

## Details / Theory

### Asymptotic _Upper_ Bound.
 `f(n) = O(g(n))` means `f(n)` grows _no faster than_ `g(n)`. It represents the **Worst-case running time** of the algorithm. Formal Definition: `O(g(n)) = { f(n) | ∃ c > 0, n₀ > 0 such that 0 ≤ f(n) ≤ c⋅g(n) for all n ≥ n₀ }` (Handout 03, Page 3)
Example: `6n³ + 2n² + 3n + 8` is `O(n³)`. Also `O(n⁴)`, `O(2ⁿ)`, etc. We usually seek the _tightest_ un-nested loops are a fundamental control structure where one loop is contained within another. They are particularly important in frequency counting because they often represent the most computationally expensive parts of algorithms.
Is the function also $O(n^4)$? How about $O(n^6)$?
Yes, since the function grows no faster than $n^4$ and $n^6$
The function is $O(n^c),c≥3$

## Code Example

_To be added._

## Complexity

| Operation | Time | Space |
| --------- | ---- | ----- |
|           |      |       |

## Common Pitfalls
 Thinking $O(n)$ always means exactly $n$ operations — it means at most proportional to $n$. Forgetting that Big-O gives an upper bound, not a tight bound — $O(n^4)$ is technically correct for a $\Theta(n)$ algorithm.

## Summary

> TL;DR — Big-O ($O$) gives an asymptotic upper bound: $f(n) = O(g(n))$ means $f(n)$ grows no faster than $g(n)$. It represents the worst-case growth rate.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. What does the notation $f(n) = O(g(n))$ mean?
    - **A)** $f(n)$ grows exactly at the same rate as $g(n)$
    - **B)** $f(n)$ grows no faster than $g(n)$
    - **C)** $f(n)$ grows at least as fast as $g(n)$
    - **D)** $f(n)$ is independent of $g(n)$

2. Which of the following correctly describes Big-O notation?
    - **A)** It represents the best-case lower bound of an algorithm.
    - **B)** It gives an asymptotic tight bound.
    - **C)** It represents an asymptotic upper bound.
    - **D)** It measures the space complexity only.

3. Is the function $6n^3 + 2n^2 + 3n + 8$ considered $O(n^4)$?
    - **A)** Yes, because it grows no faster than $n^4$.
    - **B)** No, because $O(n^3)$ is the only valid Big-O notation for it.
    - **C)** Yes, but only for $n < 0$.
    - **D)** No, because it grows faster than $n^4$.

### Answer Key & Explanations
1. **B)** Big-O notation means $f(n)$ grows no faster than $g(n)$, acting as an asymptotic upper bound.
2. **C)** Big-O provides an asymptotic upper bound, representing the worst-case growth rate of a function.
3. **A)** Since the function grows no faster than $n^4$, it is technically $O(n^4)$, although $O(n^3)$ is the tightest bound.

## References & Navigation

- **Previous Topic:** [[Best-Case Analysis]]
- **Next Topic:** [[Big-Omega Notation]]
- **Related Notes:** [[Big-Omega Notation]], [[Big-Theta Notation]]
