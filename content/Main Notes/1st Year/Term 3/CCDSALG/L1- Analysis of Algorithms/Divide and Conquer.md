---
id: Divide-and-Conquer
type: note
course: CCDSALG
topic: Algorithms
status: draft
---

# Divide and Conquer

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Recursion]] #[[Recursion and Iteration]] #[[Analysis of Algorithms]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> Divide and Conquer is an algorithm design paradigm that breaks a problem into smaller subproblems, solves them recursively, and combines the results.

## Key Concepts
 Three steps: Divide, Conquer, Combine Produces recurrence relations Classic examples: Merge Sort, Quick Sort, Binary Search Analyzed using [[Master Theorem]], [[Recursion Tree Method]], or [[Substitution Method]]

## Details / Theory

### The Three Steps

1. **Divide** — Break the problem into smaller subproblems of the same type.
2. **Conquer** — Solve each subproblem recursively. If the subproblem size is small enough, solve it directly (base case).
3. **Combine** — Merge the subproblem solutions to form the solution to the original problem.

### General Recurrence Form

A divide-and-conquer algorithm that divides the problem into $a$ subproblems, each of size $n/b$, with $f(n)$ work to divide and combine, gives:
$$T(n) = aT\left(\frac{n}{b}\right) + f(n)$$

This is exactly the form handled by the [[Master Theorem]].

### Classic Examples

| Algorithm                   | Divide                  | Conquer                     | Combine              | Recurrence                | Result             |
| --------------------------- | ----------------------- | --------------------------- | -------------------- | ------------------------- | ------------------ |
| **Merge Sort**              | Split array in half     | Sort each half              | Merge sorted halves  | $T(n) = 2T(n/2) + n$      | $O(n \log n)$      |
| **Binary Search**           | Pick middle element     | Search one half             | None                 | $T(n) = T(n/2) + 1$       | $O(\log n)$        |
| **Quick Sort**              | Partition around pivot  | Sort each partition         | None                 | Avg: $T(n) = 2T(n/2) + n$ | Avg: $O(n \log n)$ |
| **Strassen’s Matrix Mult.** | Divide into submatrices | 7 recursive multiplications | Add/subtract results | $T(n) = 7T(n/2) + n^2$    | $O(n^{2.81})$      |

### When to Use Divide and Conquer
 The problem can be naturally broken into **independent** subproblems of the same type. The subproblems are at most a **constant fraction** of the original size. The combine step is efficient (often $O(n)$ or $O(1)$).

### Advantages
 Often achieves optimal or near-optimal time complexity. Naturally suited for parallel execution (subproblems are independent). Leads to elegant, modular code.

### Disadvantages
 Recursive overhead (function call stack). Some problems have overlapping subproblems — for those, **Dynamic Programming** is more appropriate.

## Common Pitfalls
 Forgetting the base case, leading to infinite recursion. Using divide and conquer when subproblems overlap (use DP instead). Not accounting for the combine step’s cost in the recurrence.

## Summary

> TL;DR — Divide and Conquer splits a problem into smaller subproblems, solves them recursively, and combines results. It produces recurrences solvable by the Master Theorem and powers algorithms like Merge Sort and Binary Search.

## Review Questions

_To be added._

## Links
 **Related:** [[Master Theorem]] — [[Recursion Tree Method]] — [[Substitution Method]] — [[Algorithm]] — [[Recursion]] **Source / Reference:** Handout 01

## Multiple Choice Questions

1. What are the three standard steps in the Divide and Conquer paradigm?
    - **A)** Iterate, Recurse, Return
    - **B)** Divide, Conquer, Combine
    - **C)** Initialize, Maintain, Terminate
    - **D)** Split, Sort, Search

2. In the "Conquer" step, how are subproblems solved?
    - **A)** Iteratively using loops
    - **B)** Using dynamic programming
    - **C)** Recursively, or directly if they are small enough (base case)
    - **D)** By combining their solutions

3. Which recurrence relation represents the Merge Sort algorithm?
    - **A)** $T(n) = T(n/2) + 1$
    - **B)** $T(n) = 2T(n/2) + n$
    - **C)** $T(n) = 7T(n/2) + n^2$
    - **D)** $T(n) = T(n-1) + n$

4. What is the recurrence relation for Binary Search?
    - **A)** $T(n) = 2T(n/2) + n$
    - **B)** $T(n) = T(n/2) + 1$
    - **C)** $T(n) = 2T(n/2) + 1$
    - **D)** $T(n) = T(n-1) + 1$

5. Which of the following is NOT a classic Divide and Conquer algorithm mentioned in the notes?
    - **A)** Merge Sort
    - **B)** Binary Search
    - **C)** Strassen’s Matrix Multiplication
    - **D)** Bubble Sort

6. When is Divide and Conquer most appropriate?
    - **A)** When subproblems heavily overlap
    - **B)** When the problem cannot be broken down
    - **C)** When the problem can be naturally broken into independent subproblems
    - **D)** When the combine step takes exponential time

7. What is a known disadvantage of Divide and Conquer algorithms?
    - **A)** They can never be run in parallel.
    - **B)** They always have a time complexity of $O(n^2)$.
    - **C)** The recursive overhead due to the function call stack.
    - **D)** They do not use recurrences.

8. If subproblems overlap significantly, which paradigm is more appropriate than Divide and Conquer?
    - **A)** Greedy Algorithms
    - **B)** Brute Force
    - **C)** Dynamic Programming
    - **D)** Amortized Analysis

9. What is a common pitfall when implementing a divide and conquer algorithm?
    - **A)** Using the Master Theorem for analysis
    - **B)** Forgetting the base case, leading to infinite recursion
    - **C)** Dividing the problem into constant fractions
    - **D)** Making the subproblems independent

10. Which mathematical tool is commonly used to analyze the running time of Divide and Conquer algorithms?
    - **A)** The Master Theorem
    - **B)** The Accounting Method
    - **C)** Loop Invariants
    - **D)** Probability Distributions

### Answer Key & Explanations
1. **B)** The paradigm formally consists of Dividing the problem, Conquering the subproblems, and Combining the results.
2. **C)** The conquer step solves the independent subproblems recursively, resolving them directly only when they reach the base case size.
3. **B)** Merge sort divides the array in half twice ($2T(n/2)$) and takes $O(n)$ time to combine the halves ($+n$).
4. **B)** Binary search checks one half ($T(n/2)$) and performs constant work ($+1$) to determine which half to check.
5. **D)** Bubble sort is a simple iterative sorting algorithm, not a divide and conquer algorithm.
6. **C)** Divide and conquer thrives when the problem can be split into distinct, non-overlapping (independent) subproblems.
7. **C)** A primary drawback is the overhead created by many recursive function calls placed on the system's call stack.
8. **C)** Dynamic Programming is explicitly designed to handle overlapping subproblems by caching their results.
9. **B)** Missing a base case causes the recursion to continuously split the problem without ever stopping, crashing the program.
10. **A)** The Master Theorem provides a direct method for solving recurrences of the form $T(n) = aT(n/b) + f(n)$, which define divide and conquer algorithms.

## References & Navigation

- **Previous Topic:** [[Declarations]]
- **Next Topic:** [[Efficiency]]
- **Related Notes:** [[Master Theorem]], [[Recurrences]]
