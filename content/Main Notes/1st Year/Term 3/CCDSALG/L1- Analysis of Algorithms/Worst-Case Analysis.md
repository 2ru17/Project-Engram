---
id: Worst-Case-Analysis
type: note
course: CCDSALG
topic: Algorithms
status: draft
---

# Worst-Case Analysis

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Analysis of Algorithms]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> Worst-case analysis determines the maximum running time of an algorithm over all possible inputs of size $n$.

## Key Concepts
 Provides a guaranteed upper bound on running time Most commonly used analysis type in CCDSALG Expressed as $T(n) = \max\{T(I) : |I| = n\}$ Uses [[Big-O Notation]] to express the bound

## Details / Theory

### Definition

The **worst-case running time** of an algorithm is the maximum number of operations it performs over **all** possible inputs of size $n$:

$$T_{\text{worst}}(n) = \max_{\text{all inputs } I \text{ of size } n} T(I)$$

### Why Worst-Case Analysis is Standard

1. **Guaranteed upper bound** — the algorithm will never take longer than $T_{\text{worst}}(n)$.
2. **No assumptions needed** about input distribution (unlike [[Average-Case Analysis]]).
3. **Easier to compute** — just find the input that causes the most work.
4. **Safety-critical systems** require worst-case guarantees.

### Examples

| Algorithm          | Worst-Case Input                 | Worst-Case Time |
| ------------------ | -------------------------------- | --------------- |
| **Linear Search**  | Target not in array              | $O(n)$          |
| **Bubble Sort**    | Array in reverse order           | $O(n^2)$        |
| **Quick Sort**     | Already sorted array (bad pivot) | $O(n^2)$        |
| **Binary Search**  | Target not in array              | $O(\log n)$     |
| **Insertion Sort** | Array in reverse order           | $O(n^2)$        |

### Relationship to Big-O

[[Big-O Notation]] is often used to express worst-case bounds. When we say an algorithm is $O(n^2)$, we typically mean its worst-case running time is at most proportional to $n^2$.

## Common Pitfalls
 Assuming worst-case is the "typical" case — in practice, average-case behavior may be much better. Confusing worst-case with Big-O — Big-O is a mathematical notation, worst-case is an analysis type.

## Summary

> TL;DR — Worst-case analysis finds the maximum running time over all inputs of size $n$, providing a guaranteed upper bound. It is the most commonly used analysis type and typically expressed with Big-O notation.

## Review Questions

_To be added._

## Links
 **Related:** [[Average-Case Analysis]] — [[Best-Case Analysis]] — [[Big-O Notation]] — [[Time Complexity]] — [[Worst-case running time]] — [[Running Time]] **Source / Reference:** Handout 01, Page 3

## Multiple Choice Questions

1. What does worst-case analysis determine?
    - **A)** The minimum running time over all possible inputs.
    - **B)** The expected running time based on probability distributions.
    - **C)** The maximum running time of an algorithm over all possible inputs of size $n$.
    - **D)** The optimal memory allocation for an array.

2. How is worst-case analysis formally expressed?
    - **A)** $T(n) = \min\{T(I) : |I| = n\}$
    - **B)** $T(n) = \max\{T(I) : |I| = n\}$
    - **C)** $T(n) = \sum\{T(I) : |I| = n\} / n$
    - **D)** $T(n) = O(1)$

3. Why is worst-case analysis commonly used over other types?
    - **A)** It provides a guaranteed upper bound on running time, requiring no assumptions about input distribution.
    - **B)** It is the hardest to compute, providing academic rigor.
    - **C)** It relies heavily on probabilistic modeling.
    - **D)** It guarantees the fastest execution possible.

4. In worst-case analysis, what is the worst-case input for Linear Search?
    - **A)** The target is the first element in the array.
    - **B)** The target is the median element.
    - **C)** The array is already sorted.
    - **D)** The target is not in the array or is the very last element.

5. What is the worst-case time complexity of Bubble Sort?
    - **A)** $O(\log n)$
    - **B)** $O(n)$
    - **C)** $O(n \log n)$
    - **D)** $O(n^2)$

6. What is a known scenario that triggers the worst-case time for Quick Sort?
    - **A)** An already sorted array with a bad pivot.
    - **B)** A completely randomized array.
    - **C)** An array containing only negative numbers.
    - **D)** A target element missing from the array.

7. What is a common pitfall when discussing worst-case analysis?
    - **A)** Assuming it guarantees the algorithm will always finish quickly.
    - **B)** Assuming the worst-case is the "typical" or average case in practice.
    - **C)** Expressing it in Big-O notation.
    - **D)** Using it for safety-critical systems.

8. Which mathematical notation is most frequently used to express the bound found in worst-case analysis?
    - **A)** Little-o Notation
    - **B)** Big-Omega Notation
    - **C)** Big-O Notation
    - **D)** Logarithmic Notation

9. What makes worst-case analysis particularly crucial for safety-critical systems?
    - **A)** It optimizes for power consumption.
    - **B)** It provides an absolute mathematical guarantee that the algorithm will finish within a specified maximum time limit.
    - **C)** It converts recursive functions into iterative loops automatically.
    - **D)** It minimizes space complexity.

10. What is the worst-case input for Insertion Sort?
    - **A)** A perfectly shuffled array.
    - **B)** An array with all identical elements.
    - **C)** An already sorted array.
    - **D)** An array sorted in reverse order.

### Answer Key & Explanations
1. **C)** Worst-case analysis strictly seeks out the absolute maximum amount of time an algorithm could possibly take for a given input size.
2. **B)** The mathematical definition is the maximum running time $T(I)$ across all possible inputs $I$ that have size $n$.
3. **A)** Because it sets a hard ceiling on execution time without requiring any guesswork about what real-world data might look like, it is the safest and most standard analysis type.
4. **D)** If the element isn't in the array (or is at the very end), Linear Search is forced to check every single element, resulting in maximum work.
5. **D)** Bubble Sort must perform $n$ passes over $n$ elements when the array is in reverse order, leading to $O(n^2)$ complexity.
6. **A)** If Quick Sort repeatedly picks the largest or smallest element as a pivot (which happens in a sorted array with a naive pivot strategy), it degrades to $O(n^2)$.
7. **B)** The worst case is a theoretical maximum. In practice, many algorithms (like Quick Sort) rarely hit their worst case and perform much closer to their average case.
8. **C)** Big-O provides an asymptotic upper bound, perfectly complementing the goal of worst-case analysis.
9. **B)** In environments like aviation or medical devices, you must mathematically prove that an operation will never exceed a critical time limit, which worst-case analysis provides.
10. **D)** If the array is in reverse order, every single inserted element must be shifted all the way to the beginning of the array, maximizing the number of swaps.

## References & Navigation

- **Previous Topic:** [[Time Complexity]]
- **Next Topic:** [[Worst-case running time]]
- **Related Notes:** [[Average-Case Analysis]], [[Best-Case Analysis]]
