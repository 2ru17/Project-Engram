---
id: Substitution-Method
type: note
course: CCDSALG
topic: Algorithms
status: draft
---

# Substitution Method

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Recursion]] #[[Recursion and Iteration]] #[[Analysis of Algorithms]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> The Substitution Method solves recurrences by guessing the form of the solution and then proving it correct using mathematical induction.

## Key Concepts
 Two-step process: guess then prove Requires mathematical induction The guess can come from the [[Recursion Tree Method]] or intuition Must find appropriate constants $c$ and $n_0$

## Details / Theory

### Steps

1. **Guess** the form of the solution (e.g., $T(n) = O(n \log n)$).
2. **Prove** the guess is correct using **mathematical induction**:
**Base case:** Verify $T(n_0) \leq c \cdot g(n_0)$ for some small $n_0$.
**Inductive step:** Assume $T(k) \leq c \cdot g(k)$ for all $k < n$, then show $T(n) \leq c \cdot g(n)$.

### Worked Example: $T(n) = 2T(n/2) + n$

**Guess:** $T(n) = O(n \log n)$, i.e., $T(n) \leq cn \log n$ for some $c > 0$.

**Inductive Hypothesis:** Assume $T(k) \leq ck \log k$ for all $k < n$.

**Inductive Step:**
$$T(n) = 2T(n/2) + n$$
$$\leq 2 \cdot c(n/2)\log(n/2) + n$$
$$= cn(\log n - \log 2) + n$$
$$= cn \log n - cn + n$$
$$\leq cn \log n \quad \text{(when } c \geq 1\text{)}$$

Thus $T(n) = O(n \log n)$. $\square$

### Worked Example: $T(n) = T(n/2) + 1$

**Guess:** $T(n) = O(\log n)$, i.e., $T(n) \leq c \log n$.

**Inductive Step:**
$$T(n) = T(n/2) + 1 \leq c \log(n/2) + 1 = c\log n - c + 1 \leq c\log n \quad \text{(when } c \geq 1\text{)}$$

### Tips for Guessing
 Use the [[Recursion Tree Method]] to get intuition for the bound. Try common forms: $O(n)$, $O(n \log n)$, $O(n^2)$, $O(\log n)$. If the proof fails, try a tighter or looser bound. Sometimes subtracting a lower-order term in the hypothesis helps (e.g., $T(n) \leq cn \log n - dn$).

## Common Pitfalls
 Making the inductive hypothesis too weak or too strong. Forgetting to verify the base case. Using $O$-notation in the inductive proof instead of concrete constants (must use actual $c$).

## Summary

> TL;DR — The Substitution Method guesses a closed-form solution to a recurrence and proves it via mathematical induction. The guess can come from intuition or the Recursion Tree Method.

## Review Questions

_To be added._

## Links
 **Related:** [[Master Theorem]] — [[Recursion Tree Method]] — [[Divide and Conquer]] — [[Asymptotic Notation]] — [[Correctness]] **Source / Reference:** Handout 03

## Multiple Choice Questions

1. What are the two main steps of the Substitution Method?
- **A)** Guess the form of the solution, then prove it correct using mathematical induction.
- **B)** Draw a tree, then sum the levels.
- **C)** Apply a formula, then simplify the polynomial.
- **D)** Write the code, then benchmark it.

2. What mathematical technique is fundamental to proving the guess in the Substitution Method?
- **A)** Calculus
- **B)** Mathematical induction
- **C)** Matrix algebra
- **D)** Trigonometry

3. In the Substitution Method, where can the initial "guess" come from?
- **A)** It must be provided by the compiler.
- **B)** Intuition or the Recursion Tree Method.
- **C)** It is always $O(n^2)$.
- **D)** It is randomly selected.

4. What is verified in the "Base case" of the inductive proof?
- **A)** $T(n) \leq c \cdot g(n)$ for all $n$.
- **B)** $T(n_0) \leq c \cdot g(n_0)$ for some small $n_0$.
- **C)** $T(k) \leq c \cdot g(k)$ for $k < n$.
- **D)** The algorithm terminates.

5. In the Inductive step, what do you assume to be true?
- **A)** $T(n) = O(1)$
- **B)** $T(k) \leq c \cdot g(k)$ for all $k < n$
- **C)** $c = 0$
- **D)** The algorithm is recursive.

6. In the worked example $T(n) = 2T(n/2) + n$, what is the guessed bound?
- **A)** $O(n)$
- **B)** $O(n^2)$
- **C)** $O(n \log n)$
- **D)** $O(1)$

7. What is a common tip if your initial guess in the substitution method fails to prove?
- **A)** Abandon the method entirely.
- **B)** Try a tighter or looser bound, or subtract a lower-order term in the hypothesis.
- **C)** Switch to the Master Theorem regardless of the recurrence format.
- **D)** Use Big-Omega instead of Big-O.

8. What is a common pitfall when executing the inductive proof?
- **A)** Verifying the base case.
- **B)** Using $O$-notation directly in the algebraic proof instead of concrete constants (like $c$).
- **C)** Assuming the tree is bottom-heavy.
- **D)** Expanding the recurrence correctly.

9. If $T(n) = T(n/2) + 1$, what is the mathematically proven upper bound using substitution?
- **A)** $O(n)$
- **B)** $O(n \log n)$
- **C)** $O(\log n)$
- **D)** $O(1)$

10. Why must you find an appropriate constant $c$ during the proof?
- **A)** Because asymptotic notation relies on the existence of such constants to bound the function.
- **B)** To determine the exact millisecond execution time.
- **C)** To satisfy the compiler.
- **D)** Because $c$ represents the input size $n$.

### Answer Key & Explanations
1. **A)** The method is entirely based on formulating a hypothesis (guess) and systematically proving it true across all values via induction.
2. **B)** Mathematical induction provides the logical framework to prove that if the guess holds for smaller subproblems, it must also hold for the main problem.
3. **B)** The guess isn't magically given to you; you often have to sketch out a recursion tree or rely on experience with similar algorithms to formulate a viable hypothesis.
4. **B)** Induction requires proving that the hypothesis works for the simplest, smallest initial input ($n_0$) to establish a foundation for the rest of the proof.
5. **B)** The Inductive Hypothesis requires you to assume the statement is true for all smaller inputs $k$, which you then use to mathematically substitute into the equation for $n$.
6. **C)** Based on knowledge of Merge Sort or a recursion tree, the logical guess to substitute is $O(n \log n)$.
7. **B)** Sometimes the math gets stuck on a lingering lower-order term. Adjusting the guess by subtracting a term (e.g., $cn \log n - dn$) can clean up the algebra and make the proof work.
8. **B)** $O$-notation is a concept, not a strict mathematical value. You cannot do algebra with $O(n)$; you must substitute it with a concrete $c \cdot n$ to legitimately prove the inequality.
9. **C)** Substituting $c \log n$ into $T(n/2) + 1$ resolves perfectly, proving that the recurrence (which represents Binary Search) is bound by $O(\log n)$.
10. **A)** The formal mathematical definition of Big-O states that $f(n) \leq c \cdot g(n)$. Therefore, the induction proof is only valid if you can identify a real $c$ that makes the inequality true.

## References & Navigation

- **Previous Topic:** [[Space Complexity]]
- **Next Topic:** [[Time Complexity]]
- **Related Notes:** [[Algorithm Analysis]], [[Core Concepts]]
