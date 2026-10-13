---
id: Time-Complexity
type: note
course: CCDSALG
topic: Algorithms
status: draft
---

# Time Complexity

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Analysis of Algorithms]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> Time complexity measures the amount of computational time an algorithm takes as a function of the input size $n$.

## Key Concepts
 Time complexity as a function $T(n)$ Counting primitive operations via [[Frequency Count]] Asymptotic notation to classify growth rate Best-case, worst-case, and average-case time

## Details / Theory

### Definition

Time complexity is the computational complexity that describes the amount of time it takes to run an algorithm as a function of the length of the input. It is typically expressed using [[Asymptotic Notation]], most commonly [[Big-O Notation]].

### How Time Complexity is Determined

1. **Identify the input size** $n$ (e.g., array length, number of nodes).
2. **Count primitive operations** as a function of $n$ using the [[Frequency Count]] method.
3. **Express the total count** as a mathematical function $T(n)$.
4. **Simplify using asymptotic notation** — drop constants and lower-order terms.

### Common Time Complexities (Ordered by Growth)

| Complexity    | Name         | Example                     |
| ------------- | ------------ | --------------------------- |
| $O(1)$        | Constant     | Array index access          |
| $O(\log n)$   | Logarithmic  | Binary Search               |
| $O(n)$        | Linear       | Linear Search               |
| $O(n \log n)$ | Linearithmic | Merge Sort                  |
| $O(n^2)$      | Quadratic    | Bubble Sort                 |
| $O(n^3)$      | Cubic        | Naive matrix multiplication |
| $O(2^n)$      | Exponential  | Subset generation           |
| $O(n!)$       | Factorial    | Permutation generation      |

### Relationship to Analysis Types
 [[Worst-Case Analysis]]: $T(n) = $ maximum time over all inputs of size $n$ [[Average-Case Analysis]]: $T(n) = $ expected time over all inputs of size $n$ [[Best-Case Analysis]]: $T(n) = $ minimum time over all inputs of size $n$

### Measuring Time Complexity
 We do **not** measure actual wall-clock time (that depends on hardware, language, etc.). Instead, we count the number of **primitive/elementary operations** executed. This is done via [[A Priori Analysis]] using the [[RAM Model]].

## Common Pitfalls
 Confusing time complexity with actual execution time — $O(n^2)$ doesn't mean "slow," it describes the growth rate. Forgetting that Big-O drops constants: $O(2n)$ is just $O(n)$. Ignoring the difference between best, worst, and average case.

## Summary

> TL;DR — Time complexity measures how an algorithm's running time scales with input size $n$, expressed using asymptotic notation (commonly Big-O). It is determined by counting primitive operations via frequency count analysis.

## Review Questions

_To be added._

## Links
 **Related:** [[Running Time]] — [[Space Complexity]] — [[Frequency Count]] — [[Asymptotic Notation]] — [[Big-O Notation]] — [[Growth Rates]] — [[Worst-Case Analysis]] — [[Average-Case Analysis]] — [[Best-Case Analysis]] **Source / Reference:** Handout 01, Handout 02

## Multiple Choice Questions

1. What does time complexity measure?
    - **A)** The physical time in seconds it takes to compile code.
    - **B)** The amount of computational time an algorithm takes as a function of the input size $n$.
    - **C)** The exact number of variables created.
    - **D)** The complexity of the code's logic and readability.

2. How are primitive operations typically counted to determine time complexity?
    - **A)** By timing the execution with a stopwatch.
    - **B)** Using the Frequency Count method.
    - **C)** By counting the number of lines of code.
    - **D)** By guessing based on the number of loops.

3. Which notation is most commonly used to express time complexity by classifying its growth rate?
    - **A)** Little-o Notation
    - **B)** Big-O Notation
    - **C)** Little-omega Notation
    - **D)** Roman Numerals

4. What is the time complexity of a simple array index access?
    - **A)** $O(\log n)$
    - **B)** $O(1)$
    - **C)** $O(n)$
    - **D)** $O(n^2)$

5. Which of the following time complexities is considered the most efficient (slowest growing)?
    - **A)** $O(n)$
    - **B)** $O(n \log n)$
    - **C)** $O(\log n)$
    - **D)** $O(n^2)$

6. What does worst-case time complexity represent?
    - **A)** The minimum time over all inputs of size $n$.
    - **B)** The expected time over all inputs of size $n$.
    - **C)** The maximum time over all inputs of size $n$.
    - **D)** The time when the computer's memory is full.

7. What does average-case time complexity represent?
    - **A)** The time taken by the median input.
    - **B)** The expected time over all inputs of size $n$ based on a probability distribution.
    - **C)** The maximum time minus the minimum time.
    - **D)** The average of $O(1)$ and $O(n^2)$.

8. Do we measure actual wall-clock time when determining theoretical time complexity?
    - **A)** Yes, using benchmarking tools.
    - **B)** No, we count the number of primitive/elementary operations executed.
    - **C)** Yes, but only on standard reference hardware.
    - **D)** No, we measure the memory space in bytes.

9. What is a common pitfall regarding $O(n^2)$ time complexity?
    - **A)** Believing it means the algorithm executes in exactly 2 seconds.
    - **B)** Confusing it with actual execution time and assuming it means "slow" for all inputs, rather than describing the growth rate.
    - **C)** Forgetting that it stands for Space Complexity.
    - **D)** Assuming it is faster than $O(n)$.

10. Why does $O(2n)$ simplify to $O(n)$?
    - **A)** Because time complexity analysis drops constants to focus purely on the order of growth.
    - **B)** Because $2n$ is a typographical error.
    - **C)** Because we divide the function by two to get average time.
    - **D)** Because $2n$ is impossible to calculate.

### Answer Key & Explanations
1. **B)** Time complexity maps out the scaling curve of an algorithm, tracking how the required operations grow relative to larger and larger inputs.
2. **B)** The Frequency Count method systematically tallies every elementary operation in the code to build a mathematical equation representing the time.
3. **B)** Big-O notation is the industry standard for expressing the upper bound of a function's growth rate.
4. **B)** Because arrays map to direct memory addresses, accessing `arr[5]` takes exactly the same amount of time as accessing `arr[500000]`, making it constant $O(1)$ time.
5. **C)** Logarithmic time $\log n$ grows exceptionally slowly, making it highly efficient, only outpaced by constant $O(1)$ time.
6. **C)** Worst-case analysis seeks the absolute longest, most computationally expensive path an algorithm could be forced to take for an input of size $n$.
7. **B)** Average-case requires probabilistic analysis to determine what the expected run time is when the algorithm is fed a statistically "normal" distribution of inputs.
8. **B)** Wall-clock time is meaningless in theoretical analysis because it changes based on CPU speed. Counting abstract "operations" ensures the analysis is universally true.
9. **B)** An $O(n^2)$ algorithm might actually be incredibly fast for very small inputs if its constant factors are tiny. It just means the *scaling* is poor for large inputs.
10. **A)** Asymptotic notation (like Big-O) intentionally discards constant coefficients to isolate the dominant growth term.

## References & Navigation

- **Previous Topic:** [[Substitution Method]]
- **Next Topic:** [[Worst-Case Analysis]]
- **Related Notes:** [[Space Complexity]], [[Running Time]]
