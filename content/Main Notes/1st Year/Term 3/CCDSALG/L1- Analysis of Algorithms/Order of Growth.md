---
id: Order-of-Growth
type: note
course: CCDSALG
topic: Algorithms
status: completed
---

# Order of Growth

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Analysis of Algorithms]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> The order of growth describes the rate at which an algorithm’s running time increases with input size, ignoring constant factors and lower-order terms.

## Key Concepts
 Ignoring constants and lower-order terms Focus on dominant term as $n \to \infty$ Formalized by [[Asymptotic Notation]] Directly related to [[Growth Rates]]

## Details / Theory

### Definition

The **order of growth** of a function refers to the highest-order term that dominates the function’s behavior as $n$ becomes large. Given $T(n) = 3n^2 + 5n + 2$, the order of growth is $n^2$ because the $3n^2$ term dominates for large $n$.

### Why We Ignore Constants
 Constant factors depend on implementation details (hardware, language, compiler) — not the algorithm itself. For sufficiently large $n$, the dominant term overwhelms all others. Example: $T_1(n) = 100n$ vs $T_2(n) = 2n^2$ — despite the large constant, $T_1$ wins for $n > 50$.

### Simplification Rules

1. **Drop lower-order terms:** $3n^2 + 5n + 2 \to n^2$
2. **Drop constant coefficients:** $3n^2 \to n^2$
3. **Keep only the dominant term:** $n^3 + n^2 \log n \to n^3$

### Connection to Asymptotic Notation

The order of growth is precisely what [[Asymptotic Notation]] captures:
 $T(n) = 3n^2 + 5n + 2$ has order of growth $n^2$, written as $T(n) = \Theta(n^2)$ [[Big-O Notation]] gives an upper bound on the order of growth. [[Big-Omega Notation]] gives a lower bound. [[Big-Theta Notation]] gives a tight bound.

### Comparison Example

| Algorithm A: $T(n) = 10n$       | Algorithm B: $T(n) = n^2$           |
| ------------------------------- | ----------------------------------- |
| Order of growth: $n$            | Order of growth: $n^2$              |
| For $n = 100$: 1,000 ops        | For $n = 100$: 10,000 ops           |
| For $n = 10{,}000$: 100,000 ops | For $n = 10{,}000$: 100,000,000 ops |

Algorithm A is preferred because its order of growth is lower.

## Common Pitfalls
 Confusing "order of growth" with exact running time — order of growth is an approximation. Thinking that removing constants means they never matter — for small inputs, constants can be significant.

## Summary

> TL;DR — Order of growth captures the dominant term of $T(n)$ as $n \to \infty$, ignoring constants and lower-order terms. It’s what asymptotic notation (Big-O, Ω, Θ) formally describes.

## Links
 **Related:** [[Growth Rates]] — [[Asymptotic Notation]] — [[Big-O Notation]] — [[Big-Omega Notation]] — [[Big-Theta Notation]] — [[Running Time]] **Source / Reference:** Handout 03

## Multiple Choice Questions

1. What does the "order of growth" of an algorithm describe?
    - **A)** The exact number of milliseconds the algorithm takes to execute.
    - **B)** The rate at which the algorithm's running time increases with input size, ignoring constants and lower-order terms.
    - **C)** The amount of physical disk space used.
    - **D)** The number of variables assigned.

2. For the running time function $T(n) = 3n^2 + 5n + 2$, what is its order of growth?
    - **A)** $n^2$
    - **B)** $3n^2$
    - **C)** $5n$
    - **D)** $n$

3. Why are constant factors ignored in the order of growth analysis?
    - **A)** Because they are always zero.
    - **B)** Because constants are never used in algorithms.
    - **C)** Because they depend on implementation details (hardware, compiler) and are overwhelmed by the dominant term for large $n$.
    - **D)** Because they make the math too difficult to solve.

4. Which of the following is a simplification rule for determining order of growth?
    - **A)** Keep all terms regardless of size.
    - **B)** Multiply all constants together.
    - **C)** Drop lower-order terms.
    - **D)** Ignore the dominant term.

5. If $T_1(n) = 100n$ and $T_2(n) = 2n^2$, which function will eventually be faster (have a smaller value) for sufficiently large $n$?
    - **A)** $T_1(n)$
    - **B)** $T_2(n)$
    - **C)** They will always be identical.
    - **D)** It depends entirely on the compiler.

6. How does order of growth directly relate to asymptotic notation?
    - **A)** Order of growth is the exact opposite of asymptotic notation.
    - **B)** Order of growth is what asymptotic notation formally captures and describes.
    - **C)** Order of growth only handles best-case, while asymptotic handles worst-case.
    - **D)** Asymptotic notation keeps constant coefficients, while order of growth drops them.

7. What does Big-Theta ($\Theta$) notation describe regarding the order of growth?
    - **A)** A strict lower bound.
    - **B)** A strict upper bound.
    - **C)** A tight bound on the order of growth.
    - **D)** An exact millisecond execution time.

8. When simplifying $n^3 + n^2 \log n$, what is the result?
    - **A)** $n^2 \log n$
    - **B)** $n^3$
    - **C)** $n^3 \log n$
    - **D)** $n^5$

9. What is a common pitfall regarding the order of growth?
    - **A)** Confusing it with exact running time, failing to realize it is an approximation.
    - **B)** Remembering to drop lower-order terms.
    - **C)** Preferring lower growth rates over higher ones.
    - **D)** Using it to compare algorithms.

10. Why might an algorithm with a higher order of growth be faster for very small inputs?
    - **A)** Because higher orders of growth are always faster.
    - **B)** Because lower-order algorithms cannot process small inputs.
    - **C)** Because the ignored constant factors might be significant for small inputs.
    - **D)** Because asymptotic notation reverses for small values of $n$.

### Answer Key & Explanations

1. **B**. Order of growth strips away the noise of hardware and constants to focus purely on the dominant mathematical rate of increase as $n$ scales.
2. **A**. The dominant term is $n^2$. The constant coefficient 3 and the lower-order terms $5n$ and $2$ are dropped.
3. **C**. Constant factors represent flat overhead that varies wildly between machines and languages, and for massive inputs, this flat overhead is statistically insignificant compared to the growth term.
4. **C**. A key step is dropping all lower-order terms because they contribute a progressively smaller fraction to the total running time as $n$ approaches infinity.
5. **A**. Because $n^2$ grows fundamentally faster than $n$, there is a crossover point (at $n=50$) after which the linear function $T_1(n)$ will always yield a smaller value.
6. **B**. Asymptotic notations (like Big-O, Big-Theta) are just the mathematical language used to formally express a function's order of growth.
7. **C**. Big-Theta provides an asymptotically tight bound, indicating the function grows exactly at that specified order of growth.
8. **B**. $n^3$ mathematically dominates $n^2 \log n$ as $n$ approaches infinity, so the lesser term is dropped.
9. **A**. Order of growth is a scaling approximation; confusing it with a precise stopwatch timer is a fundamental misunderstanding of the theory.
10. **C**. For small $n$, massive constant overhead in a $O(n)$ algorithm can easily make it run slower in real time than a highly optimized $O(n^2)$ algorithm.

## References & Navigation

- **Previous Topic:** [[Nested-Loops]]
- **Next Topic:** [[Probabilistic Analysis]]
- **Related Notes:** [[Algorithm Analysis]], [[Core Concepts]]
