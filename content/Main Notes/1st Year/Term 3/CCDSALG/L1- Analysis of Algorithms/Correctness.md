---
id: Correctness
type: note
course: CCDSALG
topic: Algorithms
status: draft
---

# Correctness

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Analysis of Algorithms]] #[[Mathematical Foundations of Computing]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> Correctness is the property that an algorithm produces the correct output for every valid input and terminates in finite time.

## Key Concepts
 Partial correctness vs. total correctness Loop invariants for proving correctness Mathematical induction as a proof tool Correctness is one of the key [[Algorithm]] design issues

## Details / Theory

### Definition

An algorithm is **correct** if, for every valid input, it:

1. **Terminates** (halts in finite time), and
2. **Produces the correct output** as specified.

### Partial vs. Total Correctness
 **Partial correctness**: _If_ the algorithm terminates, the output is correct. **Total correctness**: The algorithm **always** terminates **and** the output is correct.

Total correctness = Partial correctness + Termination.

### Loop Invariants

A **loop invariant** is a property that holds true before and after each iteration of a loop. It is used to prove correctness of iterative algorithms.

**Three steps of a loop invariant proof:**

1. **Initialization**: The invariant is true before the first iteration.
2. **Maintenance**: If the invariant is true before an iteration, it remains true after the iteration.
3. **Termination**: When the loop terminates, the invariant (combined with the exit condition) gives us the desired result.

### Example: Correctness of Linear Search

**Loop invariant:** At the start of iteration $i$, the target is not in `arr[0..i-1]`.
 **Initialization:** Before $i = 0$, no elements have been checked — trivially true. **Maintenance:** If `arr[i] != target`, then target is not in `arr[0..i]`. **Termination:** Either `arr[i] == target` (found) or $i = n$ (not in array).

### Proving Correctness of Recursive Algorithms

For recursive algorithms, correctness is often proved using **mathematical induction**:
 **Base case:** Show the algorithm is correct for the smallest input. **Inductive step:** Assume correctness for inputs smaller than $n$, prove for input $n$.

## Common Pitfalls
 Confusing partial and total correctness — an algorithm can be partially correct but never terminate. Choosing a loop invariant that is too weak to prove the desired result. Forgetting the termination argument in a total correctness proof.

## Summary

> TL;DR — Correctness means an algorithm terminates and produces the right output for all valid inputs. It is proved using loop invariants (iterative) or mathematical induction (recursive).

## Review Questions

_To be added._

## Links
 **Related:** [[Algorithm]] — [[Efficiency]] — [[Algorithm Analysis]] — [[Loops]] — [[Recursion]] **Source / Reference:** Handout 01, Page 2

## Multiple Choice Questions

1. What are the two requirements for an algorithm to be considered "correct"?
    - **A)** It uses minimal memory and terminates.
    - **B)** It terminates in finite time and produces the correct output for every valid input.
    - **C)** It has a tight Big-O bound and runs on any hardware.
    - **D)** It compiles without errors and uses a loop invariant.

2. What distinguishes total correctness from partial correctness?
    - **A)** Total correctness only applies to recursive algorithms.
    - **B)** Partial correctness requires the algorithm to terminate, while total correctness does not.
    - **C)** Total correctness guarantees the algorithm always terminates and output is correct.
    - **D)** Partial correctness ignores space complexity.

3. What does the "Initialization" step of a loop invariant proof verify?
    - **A)** The invariant is true before the first iteration of the loop.
    - **B)** The invariant remains true after the iteration.
    - **C)** The loop terminates properly.
    - **D)** The input size is greater than zero.

4. Which of the following describes the "Maintenance" step in proving correctness using loop invariants?
    - **A)** Ensuring the algorithm halts.
    - **B)** Verifying the base case for recursion.
    - **C)** If the invariant is true before an iteration, it remains true after the iteration.
    - **D)** Clearing memory after the loop finishes.

5. What is the final step in a loop invariant proof that gives the desired result?
    - **A)** Induction
    - **B)** Maintenance
    - **C)** Initialization
    - **D)** Termination

6. In the linear search example, what is the loop invariant at the start of iteration $i$?
    - **A)** The target is always located at `arr[i]`.
    - **B)** The target is not in `arr[0..i-1]`.
    - **C)** The array is sorted.
    - **D)** The loop will terminate in $O(1)$ time.

7. What is the standard mathematical tool used to prove the correctness of recursive algorithms?
    - **A)** Mathematical induction
    - **B)** Amortized analysis
    - **C)** Asymptotic notation
    - **D)** Frequency counting

8. What is a common pitfall when proving correctness?
    - **A)** Choosing a loop invariant that is too strong.
    - **B)** Confusing partial and total correctness by forgetting to prove termination.
    - **C)** Using mathematical induction for iterative loops.
    - **D)** Proving the base case before the inductive step.

9. What does the inductive step in a mathematical induction proof typically involve?
    - **A)** Showing the algorithm is correct for the smallest input.
    - **B)** Assuming correctness for inputs smaller than $n$, and proving it for input $n$.
    - **C)** Establishing a loop invariant before the first recursive call.
    - **D)** Calculating the asymptotic lower bound.

10. Which of the following is true about partial correctness?
    - **A)** It guarantees the algorithm will eventually stop.
    - **B)** An algorithm can be partially correct but never terminate.
    - **C)** It is equivalent to total correctness.
    - **D)** It only applies to algorithms with $O(1)$ space complexity.

### Answer Key & Explanations
1. **B)** Correctness demands that for all valid inputs, the algorithm halts (finiteness) and produces the mathematically correct result.
2. **C)** Total correctness proves that termination occurs AND the output is correct. Partial correctness only says IF it terminates, the answer will be correct.
3. **A)** Initialization proves that the invariant property is valid right before the loop evaluates for the very first time.
4. **C)** Maintenance ensures that the operations inside the loop preserve the invariant property for the next iteration.
5. **D)** Termination combines the loop's exit condition with the invariant to formally prove the final state is correct.
6. **B)** At the start of step $i$, linear search has already checked the preceding elements without finding the target, so it is not in `arr[0..i-1]`.
7. **A)** Mathematical induction (proving a base case, then assuming for smaller inputs to prove larger ones) natively matches the structure of recursive algorithms.
8. **B)** It is common to prove that a loop produces the right answer (partial correctness) but completely forget to guarantee that the loop doesn't run infinitely.
9. **B)** The inductive step relies on the inductive hypothesis—assuming the algorithm works for smaller instances to build a proof for size $n$.
10. **B)** Partial correctness only guarantees that the output will be correct *provided* that the algorithm terminates, making infinite loops technically partially correct.

## References & Navigation

- **Previous Topic:** [[Core Concepts]]
- **Next Topic:** [[Declarations]]
- **Related Notes:** [[Algorithm Analysis]], [[Core Concepts]]
