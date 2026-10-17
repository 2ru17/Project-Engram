---
id: Little-omega-Notation
type: note
course: CCDSALG
topic: Algorithms
status: completed
---

# Little-omega Notation

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> f(n) = ω(g(n)) means f(n) grows strictly faster than g(n).

## Details / Theory

## Strict Lower Bound.
 `f(n) = ω(g(n))` means `f(n)` grows _strictly faster than_ `g(n)`. `lim (n→∞) f(n)/g(n) = ∞`.
Example: `n³ = ω(n²)`. `n²` is _not_ `ω(n²)`.

## Code Example

_To be added._

## Complexity

| Operation | Time | Space |
| --------- | ---- | ----- |
|           |      |       |

## Common Pitfalls
 Confusing little-omega with Big-Omega — little-omega is _strictly_ greater, while Big-Omega allows equality. Mixing up the limit definition: $f(n)/g(n) \to \infty$, not $0$.

## Summary

> TL;DR — Little-omega ($\omega$) gives a strict lower bound: $f(n) = \omega(g(n))$ means $f$ grows strictly faster than $g$. It is the transpose of little-o.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. What does $f(n) = \omega(g(n))$ mathematically signify?
- **A)** $f(n)$ grows strictly slower than $g(n)$
- **B)** $f(n)$ grows strictly faster than $g(n)$
- **C)** $f(n)$ grows at the same rate as $g(n)$
- **D)** $f(n)$ grows no slower than $g(n)$, allowing equality

2. What is the limit definition for little-omega notation?
- **A)** limit as $n \to \infty$ of $f(n)/g(n) = 0$
- **B)** limit as $n \to \infty$ of $f(n)/g(n) = 1$
- **C)** limit as $n \to \infty$ of $f(n)/g(n) = \infty$
- **D)** limit as $n \to 0$ of $f(n)/g(n) = 0$

3. Is the statement $n^2 = \omega(n^2)$ correct?
- **A)** Yes, because they are equal.
- **B)** Yes, because it satisfies Big-Omega.
- **C)** No, because little-omega requires $f(n)$ to grow strictly faster, excluding equality.
- **D)** No, because little-omega is only used for sub-linear functions.

4. How does little-omega relate to little-o?
- **A)** It is the exact same notation.
- **B)** It is the transpose; if $f(n) = \omega(g(n))$, then $g(n) = o(f(n))$.
- **C)** They both represent tight bounds.
- **D)** Little-omega handles space complexity while little-o handles time complexity.

5. Which of the following is a common pitfall regarding little-omega notation?
- **A)** Using the limit $f(n)/g(n) \to 0$ instead of $\infty$
- **B)** Confusing it with Big-O notation
- **C)** Using it to describe exact equality
- **D)** Applying it to constants

### Answer Key & Explanations
1. **B)** Little-omega ($\omega$) represents a strict lower bound, meaning $f(n)$ must grow strictly faster than $g(n)$.
2. **C)** The limit of $f(n)/g(n)$ as $n$ goes to infinity must diverge to $\infty$ for $f(n)$ to be $\omega(g(n))$.
3. **C)** The functions grow at the exact same rate, which violates the strict inequality required by little-omega.
4. **B)** They are transposes of each other; if $f$ grows strictly faster than $g$ ($\omega$), then $g$ grows strictly slower than $f$ ($o$).
5. **A)** A common pitfall is mixing up the limits of little-o ($\to 0$) and little-omega ($\to \infty$).

## References & Navigation

- **Previous Topic:** [[Little-o Notation]]
- **Next Topic:** [[Loops]]
- **Related Notes:** [[Asymptotic Notation]], [[Big-O Notation]]
