---
id: Recurrences
type: note
course: CCDSALG
topic: Algorithms
status: completed
---

# Recurrences

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Recursion]] #[[Recursion and Iteration]] #[[Analysis of Algorithms]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> Analyzing recursive algorithms.

## Key Concepts
 Definition Structure Base Case(s) Recursive Case(s) Examples

## Details / Theory

Analyzing recursive algorithms. - **Definition**: An equation or inequality describing a function (like running time `T(n)`) in terms of its value on smaller inputs. (Handout 04, Page 2) - **Structure**: (Handout 04, Page 2, slides 7 & 8) - **Base Case(s)**: Defines `T(n)` for small `n` (e.g., `T(1) = c`). - **Recursive Case(s)**: Defines `T(n)` for larger `n` based on `T` of smaller values (e.g., `T(n) = 2T(n/2) + n`). Represents the cost of dividing the problem, solving sub-problems, and combining results. - **Examples**: - **Factorial**: `T(n) = T(n-1) + Θ(1)`, `T(0) = Θ(1)` -> Solves to `T(n) = Θ(n)`. (Handout 04, Page 3) - **Binary Search**: `T(n) = T(n/2) + Θ(1)` -> Solves to `T(n) = Θ(log n)`. - **Merge Sort**: `T(n) = 2T(n/2) + Θ(n)` -> Solves to `T(n) = Θ(n log n)`. - **Methods for Solving Recurrences**: - **[[Substitution Method]]**: Guess the form of the solution and use mathematical induction to prove it. - **[[Recursion Tree Method]]**: Visualize the recursion as a tree, sum costs at each level, and sum across levels. Good for generating guesses for the substitution method. - **[[Master Theorem]]**: Provides a cookbook solution for recurrences of the form `T(n) = aT(n/b) + f(n)` under specific conditions relating `a`, `b`, and `f(n)`.

## Code Example

_To be added._

## Complexity

| Operation | Time | Space |
| --------- | ---- | ----- |
|           |      |       |

## Common Pitfalls
 Forgetting the base case when setting up a recurrence. Applying the [[Master Theorem]] to non-standard recurrence forms (e.g., $T(n) = T(n-1) + n$). Confusing the recurrence (equation) with its solution (closed form).

## Summary

> TL;DR — Recurrences describe a function in terms of its value on smaller inputs. They arise from recursive algorithms and are solved via Substitution, Recursion Trees, or the Master Theorem.

## Review Questions

_To be added._

## Links
 **Related:** - [[Substitution Method]] - [[Recursion Tree Method]] - [[Master Theorem]] **Source / Reference:**

## Multiple Choice Questions

1. What is a recurrence in the context of algorithm analysis?
- **A)** An iterative loop that repeats infinitely.
- **B)** An equation describing a function in terms of its value on smaller inputs.
- **C)** A bug that causes an algorithm to crash repeatedly.
- **D)** A memory leak in a recursive function.

2. What two primary components define the structure of a recurrence?
- **A)** The inner loop and outer loop.
- **B)** The base case(s) and recursive case(s).
- **C)** The initialization and the update check.
- **D)** The Master Theorem and the Substitution Method.

3. In the recurrence $T(n) = 2T(n/2) + \Theta(n)$, what does the $\Theta(n)$ represent?
- **A)** The cost of the base case.
- **B)** The number of recursive calls.
- **C)** The cost of dividing the problem and combining the results.
- **D)** The input size.

4. Which algorithm generates the recurrence $T(n) = T(n/2) + \Theta(1)$?
- **A)** Merge Sort
- **B)** Binary Search
- **C)** Factorial
- **D)** Linear Search

5. What is the closed-form solution to the Merge Sort recurrence $T(n) = 2T(n/2) + \Theta(n)$?
- **A)** $\Theta(n)$
- **B)** $\Theta(\log n)$
- **C)** $\Theta(n \log n)$
- **D)** $\Theta(n^2)$

6. Which method for solving recurrences involves guessing the form of the solution and using mathematical induction to prove it?
- **A)** The Master Theorem
- **B)** The Recursion Tree Method
- **C)** The Substitution Method
- **D)** The Iteration Method

7. What is the Recursion Tree Method primarily useful for?
- **A)** Writing the algorithm's code automatically.
- **B)** Visualizing the recursion to sum costs at each level, often generating a guess for the substitution method.
- **C)** Solving non-recursive loops.
- **D)** Proving algorithms correct.

8. What does the Master Theorem provide?
- **A)** A step-by-step induction proof for every recurrence.
- **B)** A cookbook solution for recurrences of the specific form $T(n) = aT(n/b) + f(n)$.
- **C)** A way to transform recursive functions into `while` loops.
- **D)** An exact millisecond running time.

9. What is a common pitfall when setting up a recurrence?
- **A)** Forgetting to define the base case.
- **B)** Using $n/2$ instead of $n-1$.
- **C)** Applying the Master Theorem to the form $T(n) = 2T(n/2) + n$.
- **D)** Using asymptotic notation in the recursive case.

10. Can the Master Theorem be applied to the recurrence $T(n) = T(n-1) + n$?
- **A)** Yes, it is Case 1.
- **B)** Yes, it is Case 2.
- **C)** Yes, it is Case 3.
- **D)** No, it is a non-standard form (subtractive, not divide).

### Answer Key & Explanations
1. **B)** Recurrences (or recurrence relations) express the total running time $T(n)$ by calling $T$ again on a fraction or subtraction of $n$.
2. **B)** A recurrence must have a base case to define behavior when the input is trivially small, and a recursive case to define how the problem breaks down.
3. **C)** The trailing function (like $\Theta(n)$) always represents the non-recursive overhead—the work required to split the data and merge the answers back together.
4. **B)** Binary search splits the array in half once ($T(n/2)$) and does a single constant-time comparison ($\Theta(1)$) to determine which half to check next.
5. **C)** Both via the Recursion Tree Method and the Master Theorem (Case 2), this standard divide and conquer recurrence solves tightly to $\Theta(n \log n)$.
6. **C)** The Substitution Method relies heavily on human intuition to make a guess, which is then rigorously proven correct via mathematical induction.
7. **B)** Drawing the recursion tree helps visualize the work done at each level, making it easier to sum the series and formulate an accurate guess.
8. **B)** It is essentially a formulaic "cookbook" that allows you to instantly solve recurrences that perfectly match its template without manual math.
9. **A)** Without a base case, the mathematical function evaluates infinitely, which invalidates the recurrence.
10. **D)** The Master Theorem only applies when $n$ is divided by a factor $b$. Recurrences that subtract from $n$ require different methods.

## References & Navigation

- **Previous Topic:** [[RAM Model]]
- **Next Topic:** [[Recursion Tree Method]]
- **Related Notes:** [[Recursion Tree Method]], [[Substitution Method]]
