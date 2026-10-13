---
id: Worst-case-running-time
type: note
course: CCDSALG
topic: Algorithms
status: draft
---

# Worst-case running time

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Analysis of Algorithms]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> The worst-case running time $T(n)$ is the maximum time taken by an algorithm on any input of size $n$.

## Key Concepts
 Formal expression: $T(n) = \max\{T(I) : |I| = n\}$ Why it is the default performance metric Connection to [[Big-O Notation]] and [[Worst-Case Analysis]] Distinguished from average-case and best-case running time

## Details / Theory

### Definition

The **worst-case running time** is the function:
$$T(n) = \max_{\text{all inputs } I \text{ of size } n} T(I)$$

It represents the longest possible execution time for any input of a given size. This is the standard metric used in [[Algorithm Analysis]].

### Why It Is the Default Metric

1. **Guarantee**: Gives an upper bound on execution time — the algorithm will never take longer.
2. **No probability assumptions**: Unlike [[Average-Case Analysis]], no distribution over inputs is needed.
3. **Simplicity**: Typically easier to analyze than average-case.
4. **Safety**: Critical for real-time and safety-critical applications.

### Expressing Worst-Case Running Time
 Usually expressed using [[Big-O Notation]]: e.g., $T(n) = O(n^2)$. For a tight bound, [[Big-Theta Notation]] is preferred: $T(n) = \Theta(n^2)$. The actual function may be something like $T(n) = 3n^2 + 5n + 2$, but we care about the [[Order of Growth]].

### Examples

| Algorithm     | Worst-Case Running Time | Worst Input                 |
| ------------- | ----------------------- | --------------------------- |
| Linear Search | $O(n)$                  | Element not in array        |
| Binary Search | $O(\log n)$             | Element not in array        |
| Bubble Sort   | $O(n^2)$                | Reverse-sorted array        |
| Merge Sort    | $O(n \log n)$           | Any input (always same)     |
| Quick Sort    | $O(n^2)$                | Sorted array with bad pivot |

> [!tip] Key Insight
> Merge Sort has the same worst-case and best-case running time ($\Theta(n \log n)$), while Quick Sort’s worst-case ($n^2$) is much worse than its average-case ($n \log n$).

## Common Pitfalls
 Assuming all algorithms have different best/worst/average cases — some (like Merge Sort) are the same across all cases. Confusing the worst-case running time of an algorithm with the lower bound of a problem.

## Summary

> TL;DR — Worst-case running time is the maximum time an algorithm takes on any input of size $n$. It’s the default analysis metric because it provides guaranteed performance bounds.

## Review Questions

_To be added._

## Links
 **Related:** [[Worst-Case Analysis]] — [[Running Time]] — [[Time Complexity]] — [[Big-O Notation]] — [[Average-Case Analysis]] — [[Best-Case Analysis]] **Source / Reference:** Handout 01, Page 3

## Multiple Choice Questions

1. How is worst-case running time mathematically defined?
    - **A)** $T(n) = \sum_{I} T(I) / n$
    - **B)** $T(n) = \max_{|I|=n} T(I)$
    - **C)** $T(n) = \min_{|I|=n} T(I)$
    - **D)** $T(n) = O(n)$

2. Why is worst-case running time the default metric in Algorithm Analysis?
    - **A)** It relies on complex probability distributions.
    - **B)** It provides a strict upper bound, requiring no probability assumptions, and is safer for critical applications.
    - **C)** It is the only metric supported by the RAM model.
    - **D)** It guarantees that the algorithm operates in $O(1)$ space.

3. If we want a TIGHT bound on the worst-case running time, which notation is preferred?
    - **A)** Big-O ($\mathcal{O}$)
    - **B)** Big-Omega ($\Omega$)
    - **C)** Big-Theta ($\Theta$)
    - **D)** Little-o ($o$)

4. What is the worst-case running time of Binary Search?
    - **A)** $O(1)$
    - **B)** $O(n)$
    - **C)** $O(\log n)$
    - **D)** $O(n \log n)$

5. Which of the following statements about Merge Sort is true?
    - **A)** Its worst-case time is significantly worse than its best-case time.
    - **B)** Its worst-case and best-case running times are the same ($\Theta(n \log n)$).
    - **C)** It runs in $O(n)$ time when the array is already sorted.
    - **D)** Its worst-case input is a reverse-sorted array.

6. In Quick Sort, how does the worst-case running time compare to the average-case?
    - **A)** They are identical.
    - **B)** The worst-case is faster.
    - **C)** The worst-case ($O(n^2)$) is much worse than the average-case ($O(n \log n)$).
    - **D)** The worst-case is $O(n \log n)$, but average is $O(n)$.

7. What is a common pitfall regarding the best, worst, and average cases of an algorithm?
    - **A)** Assuming all algorithms have different best, worst, and average cases (e.g., Merge Sort is the same for all).
    - **B)** Assuming they are all expressed using Big-Theta.
    - **C)** Forgetting that constants are ignored.
    - **D)** Believing that they determine space complexity.

8. What is a common pitfall regarding the scope of worst-case running time?
    - **A)** Confusing the worst-case running time of a specific algorithm with the theoretical lower bound of the problem itself.
    - **B)** Assuming it only applies to recursive functions.
    - **C)** Believing it determines the memory constraints.
    - **D)** Expressing it in asymptotic notation.

9. What is the worst-case input for Linear Search?
    - **A)** The element is exactly in the middle.
    - **B)** The element is at the beginning.
    - **C)** The array is sorted.
    - **D)** The element is not in the array.

10. Why might actual running time formulas like $T(n) = 3n^2 + 5n + 2$ be abstracted into Big-O notation when discussing worst-case running time?
    - **A)** Because constants vary by hardware, so we care primarily about the Order of Growth.
    - **B)** Because polynomials are impossible to compute manually.
    - **C)** Because Big-O notation is more precise.
    - **D)** Because worst-case analysis cannot calculate constants.

### Answer Key & Explanations
1. **B)** It is strictly defined as the maximum time $T(I)$ taken across all possible inputs $I$ that share the exact same size $n$.
2. **B)** It is preferred because it acts as a guaranteed contract—the algorithm will definitively finish before this time limit, eliminating the guesswork of average-case distributions.
3. **C)** While Big-O provides a valid upper bound, Big-Theta specifies that the algorithm grows *exactly* at that rate in the worst case, providing a tighter description.
4. **C)** In the worst case (where the element is not found), Binary Search must repeatedly halve the array until 1 element remains, taking $O(\log n)$ steps.
5. **B)** Merge Sort blindly divides the array and merges it back regardless of the input data's initial arrangement, resulting in a consistent $\Theta(n \log n)$ time.
6. **C)** Quick Sort is famous for having an excellent average-case time of $O(n \log n)$, but a catastrophic worst-case time of $O(n^2)$ if pivot selection is poor.
7. **A)** It is a mistake to assume every algorithm performs wildly differently based on the input; some algorithms are completely rigid and perform identically in all cases.
8. **A)** A specific algorithm's worst-case time (e.g., $O(n^2)$ for Bubble Sort) does not dictate the theoretical lower bound of the sorting problem itself ($\Omega(n \log n)$).
9. **D)** If the element is missing, the algorithm is forced to traverse all $n$ indices, resulting in the maximum possible amount of work.
10. **A)** Hardware speeds dictate the constants ($3, 5, 2$). By stripping them away, Big-O allows us to focus purely on how the algorithm scales mathematically.

## References & Navigation

- **Previous Topic:** [[Worst-Case Analysis]]
- **Next Topic:** [[Reccurences]]
- **Related Notes:** [[Worst-Case Analysis]], [[Running Time]]
