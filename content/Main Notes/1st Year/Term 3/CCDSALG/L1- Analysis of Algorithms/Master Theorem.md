---
id: Master-Theorem
type: note
course: CCDSALG
topic: Algorithms
status: draft
---

# Master Theorem

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Recursion]] #[[Recursion and Iteration]] #[[Analysis of Algorithms]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> The Master Theorem provides a direct way to solve recurrences of the form $T(n) = aT(n/b) + f(n)$ without step-by-step expansion.

## Key Concepts
 Standard form: $T(n) = aT(n/b) + f(n)$ Three cases based on comparing $f(n)$ with $n^{\log_b a}$ Used to solve [[Divide and Conquer]] recurrences quickly Cannot handle all recurrences (non-standard forms require other methods)

## Details / Theory

### Standard Form

The Master Theorem applies to recurrences of the form:
$$T(n) = aT\left(\frac{n}{b}\right) + f(n)$$

where:
 $a \geq 1$ — number of subproblems in the recursion $b > 1$ — factor by which the input size is reduced $f(n)$ — cost of work done outside the recursive calls (divide + combine)

### Critical Value

Compute $n^{\log_b a}$ — this represents the total work done by the leaves of the recursion tree.

### The Three Cases

**Case 1:** If $f(n) = O(n^{\log_b a - \epsilon})$ for some $\epsilon > 0$
$$T(n) = \Theta(n^{\log_b a})$$
→ The leaf-level work dominates. The recursion tree is **bottom-heavy**.

**Case 2:** If $f(n) = \Theta(n^{\log_b a})$
$$T(n) = \Theta(n^{\log_b a} \log n)$$
→ Work is evenly distributed across all levels of the tree.

**Case 3:** If $f(n) = \Omega(n^{\log_b a + \epsilon})$ for some $\epsilon > 0$, **and** $af(n/b) \leq cf(n)$ for some $c < 1$
$$T(n) = \Theta(f(n))$$
→ The root-level work dominates. The recursion tree is **top-heavy**.

### Worked Examples

**Example 1: Merge Sort** — $T(n) = 2T(n/2) + n$
 $a = 2, b = 2 \Rightarrow n^{\log_2 2} = n^1 = n$ $f(n) = n = \Theta(n^{\log_b a})$ → **Case 2** $T(n) = \Theta(n \log n)$

**Example 2: Binary Search** — $T(n) = T(n/2) + 1$
 $a = 1, b = 2 \Rightarrow n^{\log_2 1} = n^0 = 1$ $f(n) = 1 = \Theta(1) = \Theta(n^0)$ → **Case 2** $T(n) = \Theta(\log n)$

**Example 3:** $T(n) = 4T(n/2) + n$
 $a = 4, b = 2 \Rightarrow n^{\log_2 4} = n^2$ $f(n) = n = O(n^{2-1})$ → **Case 1** $T(n) = \Theta(n^2)$

### Limitations

The Master Theorem does **not** apply when:
 $f(n)$ is not polynomially comparable to $n^{\log_b a}$ (e.g., $f(n) = n \log n$ in some edge cases) The recurrence is not in the standard form (e.g., $T(n) = T(n-1) + n$) In these cases, use the [[Recursion Tree Method]] or [[Substitution Method]]

## Common Pitfalls
 Applying the Master Theorem to non-standard forms like $T(n) = T(n-1) + n$ — it only works for divide-type recurrences. Forgetting the regularity condition in Case 3: $af(n/b) \leq cf(n)$. Confusing which case applies — always compute $n^{\log_b a}$ first and compare.

## Summary

> TL;DR — The Master Theorem solves recurrences $T(n) = aT(n/b) + f(n)$ by comparing $f(n)$ to $n^{\log_b a}$ across three cases: leaf-heavy, balanced, or root-heavy.

## Review Questions

_To be added._

## Links
 **Related:** [[Divide and Conquer]] — [[Recursion Tree Method]] — [[Substitution Method]] — [[Asymptotic Notation]] — [[Big-O Notation]] — [[Big-Theta Notation]] **Source / Reference:** Handout 03

## Multiple Choice Questions

1. What is the primary purpose of the Master Theorem?
- **A)** To convert iterative loops into recursive functions.
- **B)** To provide a direct way to solve recurrences of the form $T(n) = aT(n/b) + f(n)$.
- **C)** To prove the total correctness of an algorithm.
- **D)** To measure the space complexity of an array.

2. In the standard recurrence form $T(n) = aT(n/b) + f(n)$, what does $a$ represent?
- **A)** The factor by which the input size is reduced.
- **B)** The cost of work done outside the recursive calls.
- **C)** The number of subproblems in the recursion.
- **D)** The base case threshold.

3. In the standard recurrence form, what does $f(n)$ represent?
- **A)** The number of recursive calls.
- **B)** The cost of the work done to divide the problem and combine the results.
- **C)** The input size.
- **D)** The depth of the recursion tree.

4. What is the critical value computed to determine which Master Theorem case applies?
- **A)** $a/b$
- **B)** $f(n)^a$
- **C)** $n^{\log_b a}$
- **D)** $\log_a b$

5. In Case 1 of the Master Theorem, which part of the recursion tree dominates the work?
- **A)** The root-level work.
- **B)** The leaf-level work (bottom-heavy).
- **C)** The work is evenly distributed.
- **D)** None, the algorithm runs in constant time.

6. According to Case 2 of the Master Theorem, if $f(n) = \Theta(n^{\log_b a})$, what is $T(n)$?
- **A)** $\Theta(n^{\log_b a} \log n)$
- **B)** $\Theta(n^{\log_b a})$
- **C)** $\Theta(f(n))$
- **D)** $\Theta(1)$

7. What must be true for Case 3 of the Master Theorem to apply, besides $f(n)$ being larger than the critical value?
- **A)** $f(n)$ must be a constant.
- **B)** $a$ must be less than $b$.
- **C)** The regularity condition $af(n/b) \leq cf(n)$ must hold for some $c < 1$.
- **D)** The recursion tree must be bottom-heavy.

8. For Merge Sort, $T(n) = 2T(n/2) + n$. Which case of the Master Theorem applies?
- **A)** Case 1
- **B)** Case 2
- **C)** Case 3
- **D)** None of the cases apply

9. What is a key limitation of the Master Theorem?
- **A)** It cannot solve recurrences with non-standard forms like $T(n) = T(n-1) + n$.
- **B)** It only works when $a = b$.
- **C)** It can only determine best-case scenarios.
- **D)** It requires knowing the exact constant factors of $f(n)$.

10. If a recurrence does not fit the Master Theorem, which alternative method is recommended?
- **A)** Amortized analysis
- **B)** A posteriori profiling
- **C)** The Recursion Tree Method or Substitution Method
- **D)** Frequency counting

### Answer Key & Explanations
1. **B)** The Master Theorem acts as a shortcut for finding the asymptotic bound of divide and conquer recurrence relations without manually expanding them.
2. **C)** The variable $a$ defines how many smaller subproblems the current problem branches into at each level.
3. **B)** $f(n)$ encapsulates all the non-recursive overhead, strictly representing the work required to slice up the problem and stitch the sub-solutions back together.
4. **C)** The value $n^{\log_b a}$ represents the cumulative work executed at the lowest leaf nodes of the recursion tree and is compared directly against $f(n)$.
5. **B)** In Case 1, the number of leaves grows so incredibly fast that the work done at the bottom of the tree completely dwarfs the work done at the root.
6. **A)** In Case 2, because the work is perfectly balanced across all levels, you simply take the work of one level and multiply it by the height of the tree ($\log n$).
7. **C)** The regularity condition ensures that the work done in the subproblems strictly decreases as you go down the tree, meaning the root naturally does the most work.
8. **B)** Because $n^{\log_2 2} = n$, and $f(n) = n$, they are asymptotically equal, triggering Case 2.
9. **A)** The Master Theorem requires the input to be divided by a fraction ($n/b$). It completely fails on subtractive recurrences like $T(n) = T(n-1) + n$.
10. **C)** When the strict formatting rules of the Master Theorem are violated, you must fall back on manually unrolling the tree or guessing and proving via substitution.

## References & Navigation

- **Previous Topic:** [[Lower Bounds]]
- **Next Topic:** [[Nested-Loops]]
- **Related Notes:** [[Divide and Conquer]], [[Recurrences]]
