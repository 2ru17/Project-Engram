---
id: Big-Theta-Notation
type: note
course: CCDSALG
topic: Algorithms
status: completed
---

# Big-Theta Notation

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> f(n) = Θ(g(n)) means f(n) grows at the same rate as g(n).

## Details / Theory

### Asymptotic _Tight_ Bound
 `f(n) = Θ(g(n))` means `f(n)` grows _at the same rate as_ `g(n)`. This represents the **Average-case running time** of an algorithm. Requires `f(n) = O(g(n))` AND `f(n) = Ω(g(n))`.
Means that we need to get Big-Oh$(O)$ and Big-Omega $(\Omega)$ Formal Definition: $Θ(g(n)) = { f(n) | ∃ c₁, c₂ > 0, n₀ > 0\text{ such that}\ 0 ≤ c₁⋅g(n) ≤ f(n) ≤ c₂⋅g(n)\ \text{for all}\ n ≥ n₀ }$ (Handout 03, Page 5)
Example: $6n³ + 2n² + 3n + 8$ is $Θ(n³)$.
_Since it is also both $\Omega(n^3)$ and $O(n^3)$, it is also $\Theta(n^3)$_

## Code Example

_To be added._

## Complexity

| Operation | Time | Space |
| --------- | ---- | ----- |
|           |      |       |

## Common Pitfalls
 Forgetting that $\Theta$ requires BOTH $O$ and $\Omega$ to hold — it’s a tight bound. Using $\Theta$ when only an upper bound is known — use $O$ instead if $\Omega$ hasn’t been established.

## Summary

> TL;DR — Big-Theta ($\Theta$) gives an asymptotic tight bound: $f(n) = \Theta(g(n))$ means $f(n)$ grows at the same rate as $g(n)$. Requires both $O(g(n))$ and $\Omega(g(n))$.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. What does $f(n) = \Theta(g(n))$ signify?
- **A)** $f(n)$ grows no faster than $g(n)$.
- **B)** $f(n)$ grows strictly slower than $g(n)$.
- **C)** $f(n)$ grows at the same rate as $g(n)$.
- **D)** $f(n)$ grows at least as fast as $g(n)$.

2. What is required for $f(n) = \Theta(g(n))$ to be true?
- **A)** Only $f(n) = O(g(n))$ must hold.
- **B)** Only $f(n) = \Omega(g(n))$ must hold.
- **C)** Both $f(n) = O(g(n))$ and $f(n) = \Omega(g(n))$ must hold.
- **D)** Neither $O(g(n))$ nor $\Omega(g(n))$ are required.

3. What type of bound does Big-Theta ($\Theta$) provide?
- **A)** Asymptotic upper bound
- **B)** Asymptotic lower bound
- **C)** Asymptotic tight bound
- **D)** Asymptotic probabilistic bound

### Answer Key & Explanations
1. **C)** Big-Theta signifies that a function grows at the exact same rate asymptotically as another function.
2. **C)** Big-Theta requires the function to be bounded both above (Big-O) and below (Big-Omega) by the same rate.
3. **C)** It provides an asymptotic tight bound, heavily used when worst-case and best-case match.

## References & Navigation

- **Previous Topic:** [[Big-Omega Notation]]
- **Next Topic:** [[Conditionals]]
- **Related Notes:** [[Big-O Notation]], [[Big-Omega Notation]]
