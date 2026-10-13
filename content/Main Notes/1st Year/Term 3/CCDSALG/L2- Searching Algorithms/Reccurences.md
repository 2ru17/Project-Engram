---
id: Reccurences
type: note
course: CCDSALG
topic: Algorithms
status: draft
---

# Reccurences

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Searching]] #[[Data Structures]] #[[Search Efficiency]] #[[Analysis of Algorithms]] #[[Recursion]] #[[Sorting]] #[[Recursion and Iteration]] #[[Computational Complexity]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> A recurrence relation defines a sequence of values recursively: the value at a certain index is based on previous values in the sequence. These are...

## Key Concepts
 Base case Recursive case

## Details / Theory

## What are Recurrence Relations?

A **recurrence relation** defines a sequence of values recursively: the value at a certain index is based on previous values in the sequence. These are often used to express the running time of recursive algorithms.

## What is Recursion?

**Recursion** is a programming technique where a function calls itself to solve smaller instances of the same problem until a base condition is met.

### Key Concepts:
 **Base case**: the condition under which recursion ends. **Recursive case**: the part of the function where the recursion happens.

## Examples of Recursive Algorithms

### 1. Factorial

**Mathematical Definition**:

$$
n! =
\begin{cases}
1, & \text{if } n = 1 \\
n \cdot (n - 1)!, & \text{if } n > 1
\end{cases}
$$

**Recursive Function (C Code)**:

```c
int factorial(int n) {
    if (n == 1)
        return 1;
    else
        return n * factorial(n - 1);
}
```

**Time Complexity Recurrence**:

$$
T(n) = T(n - 1) + b, \quad T(1) = a
$$

By expanding:

$$
\begin{aligned}
T(n) &= T(n - 1) + b \\
&= T(n - 2) + 2b \\
&= \ldots \\
&= T(1) + (n - 1)b = a + (n - 1)b
\end{aligned}
$$

**Final Time Complexity**: $O(n)$

### 2. Power Function

**Mathematical Definition**:

$$
k^n =
\begin{cases}
1, & \text{if } n = 0 \\
k \cdot k^{n-1}, & \text{if } n > 0
\end{cases}
$$

**Recursive Function (C Code)**:

```c
long power(long x, long n) {
    if (n == 0)
        return 1;
    else
        return x * power(x, n - 1);
}
```

**Time Complexity**: $O(n)$

### 3. Fibonacci Numbers

**Mathematical Definition**:

$$
F(n) =
\begin{cases}
0, & \text{if } n = 0 \\
1, & \text{if } n = 1 \\
F(n-1) + F(n-2), & \text{if } n > 1
\end{cases}
$$

**Recursive Function**:

```c
int fib(int n) {
    if (n <= 1)
        return n;
    else
        return fib(n - 1) + fib(n - 2);
}
```

**Time Complexity**: $O(2^n)$ due to overlapping subproblems.

**Optimized (Dynamic Programming)**: $O(n)$

## Solving Recurrence Relations

### Three Primary Methods:

1. **Iteration Method** (Expand and derive pattern)
2. **Substitution Method** (Guess and prove by induction)
3. **Master's Theorem** (Used for divide-and-conquer)

### Iteration Method Example

Given:

$$
T(n) = T(n - 1) + 3, \quad T(1) = 2
$$

Expanding:

$$
\begin{aligned}
T(n) &= T(n - 1) + 3 \\
&= T(n - 2) + 6 \\
&= \ldots \\
&= T(1) + 3(n - 1) = 2 + 3(n - 1) = 3n - 1
\end{aligned}
$$

**Time Complexity**: $O(n)$

### Master's Theorem (For Divide and Conquer)

For recurrences of the form:

$$
T(n) = aT(n/b) + f(n)
$$

where $a \geq 1$, $b > 1$, and $f(n)$ is asymptotically positive:

1. If $f(n) = O(n^{\log_b a - \epsilon})$ for some $\epsilon > 0$, then $T(n) = \Theta(n^{\log_b a})$
2. If $f(n) = \Theta(n^{\log_b a})$, then $T(n) = \Theta(n^{\log_b a} \log n)$
3. If $f(n) = \Omega(n^{\log_b a + \epsilon})$ for some $\epsilon > 0$, and if $af(n/b) \leq cf(n)$ for some $c < 1$ and large enough $n$, then $T(n) = \Theta(f(n))$

### Examples of Divide and Conquer Recurrences

#### Binary Search

$$
T(n) = T(n/2) + c
$$

Using Master's Theorem:
 $a = 1$, $b = 2$, $f(n) = c$ $n^{\log_b a} = n^{\log_2 1} = n^0 = 1$ Since $f(n) = c = \Theta(1) = \Theta(n^{\log_b a})$, case 2 applies Thus, $T(n) = \Theta(\log n)$

#### Merge Sort

$$
T(n) = 2T(n/2) + cn
$$

Using Master's Theorem:
 $a = 2$, $b = 2$, $f(n) = cn$ $n^{\log_b a} = n^{\log_2 2} = n^1 = n$ Since $f(n) = cn = \Theta(n) = \Theta(n^{\log_b a})$, case 2 applies Thus, $T(n) = \Theta(n \log n)$

## Common Recurrence Relations and Their Solutions

| Recurrence Relation      | Algorithm Example                | Solution             |
| ------------------------ | -------------------------------- | -------------------- |
| $T(n) = T(n-1) + c$      | Factorial                        | $T(n) = O(n)$        |
| $T(n) = T(n/2) + c$      | Binary Search                    | $T(n) = O(\log n)$   |
| $T(n) = 2T(n/2) + cn$    | Merge Sort                       | $T(n) = O(n \log n)$ |
| $T(n) = 2T(n/2) + c$     | Tree Traversal                   | $T(n) = O(n)$        |
| $T(n) = T(n-1) + T(n-2)$ | Recursive Fibonacci              | $T(n) = O(2^n)$      |
| $T(n) = 2T(n-1)$         | Recursive Function               | $T(n) = O(2^n)$      |
| $T(n) = 4T(n/2) + cn$    | Fast Multiplication              | $T(n) = O(n^2)$      |
| $T(n) = 8T(n/2) + cn^2$  | Strassen's Matrix Multiplication | $T(n) = O(n^3)$      |

## Common Pitfalls
 Forgetting the **base case** when writing a recurrence — without it, the recurrence has no termination and cannot be solved Misidentifying **$a$, $b$, and $f(n)$** when applying the Master Theorem — $a$ is the number of subproblems, $b$ is the factor by which the input shrinks, and $f(n)$ is the non-recursive work Applying the **Master Theorem** to recurrences where it doesn't apply (e.g., $T(n) = 2T(n-1)$ is not in the form $T(n) = aT(n/b) + f(n)$) Incorrect **substitution** in the iteration method — always expand at least 3 levels and verify the pattern before generalizing Confusing **$T(n) = 2T(n/2) + n$** ($O(n \log n)$, merge sort) with **$T(n) = 2T(n/2) + 1$** ($O(n)$, binary tree traversal)

## Summary

> TL;DR — **Recurrences** model the running time of recursive algorithms. Solve them via **iteration** (expand and find a pattern), **substitution** (guess and verify), or the **Master Theorem** ($T(n) = aT(n/b) + f(n)$ with three cases). Key examples: binary search $O(\log n)$, merge sort $O(n \log n)$, Fibonacci $O(2^n)$.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. What is a recurrence relation?
    - **A)** An iterative loop that counts backwards.
    - **B)** A sequence of values where the value at a certain index is based on previous values in the sequence.
    - **C)** A function that cannot be analyzed.
    - **D)** A matrix used for graph traversals.

2. In a recursive algorithm, what is the "base case"?
    - **A)** The case where the array is sorted.
    - **B)** The condition under which recursion ends.
    - **C)** The part of the function where recursion happens.
    - **D)** The worst-case running time.

3. For the factorial function $T(n) = T(n - 1) + b$, what is the final time complexity?
    - **A)** $O(1)$
    - **B)** $O(\log n)$
    - **C)** $O(n)$
    - **D)** $O(n^2)$

4. What is the time complexity of the naive recursive Fibonacci function $T(n) = T(n-1) + T(n-2)$?
    - **A)** $O(n)$
    - **B)** $O(n \log n)$
    - **C)** $O(2^n)$
    - **D)** $O(n^2)$

5. Which method for solving recurrences expands the equation step-by-step to derive a pattern?
    - **A)** Master's Theorem
    - **B)** Iteration Method
    - **C)** Substitution Method
    - **D)** Amortized Analysis

6. Using the Master's Theorem on Binary Search $T(n) = T(n/2) + c$, what is the final time complexity?
    - **A)** $O(n)$
    - **B)** $O(n \log n)$
    - **C)** $O(\log n)$
    - **D)** $O(1)$

7. What is a common pitfall when solving recurrences?
    - **A)** Forgetting to define the base case, meaning the recurrence has no termination.
    - **B)** Multiplying $n$ by itself.
    - **C)** Using iterative loops inside the recurrence.
    - **D)** Assuming the Master's Theorem handles every recurrence.

8. In the Master Theorem formula $T(n) = aT(n/b) + f(n)$, what does $b$ represent?
    - **A)** The number of subproblems.
    - **B)** The factor by which the input shrinks.
    - **C)** The non-recursive work.
    - **D)** The base case constant.

9. Can the Master Theorem be applied to the recurrence $T(n) = 2T(n-1)$?
    - **A)** Yes, yielding $O(2^n)$.
    - **B)** Yes, yielding $O(n)$.
    - **C)** No, because it is not in the form $T(n) = aT(n/b) + f(n)$.
    - **D)** No, because $a > 1$.

10. What is the time complexity of the recurrence $T(n) = 2T(n/2) + 1$, representing a simple binary tree traversal?
    - **A)** $O(n \log n)$
    - **B)** $O(\log n)$
    - **C)** $O(n)$
    - **D)** $O(n^2)$

### Answer Key & Explanations
1. **B)** A recurrence describes a function dynamically by referring back to itself on progressively smaller inputs.
2. **B)** Without a base case, recursion would theoretically continue infinitely until the system runs out of memory (stack overflow).
3. **C)** The factorial algorithm decrements $n$ by 1 at each step, performing exactly $n$ constant-time operations, resulting in $O(n)$ complexity.
4. **C)** Because the naive recursive Fibonacci calls itself twice at every level, creating massive redundant calculations (overlapping subproblems), its complexity explodes to $O(2^n)$.
5. **B)** The Iteration Method physically unrolls the recursive equation out several levels until a generalized mathematical series becomes apparent.
6. **C)** Because $n^{\log_2 1} = n^0 = 1$, which matches the constant work $c$ outside the recursion, Case 2 applies and yields $O(\log n)$.
7. **A)** An equation like $T(n) = T(n-1)$ is mathematically unsolvable without a base value (like $T(1)=1$) to anchor it.
8. **B)** $b$ represents the division factor. If $b=2$, the data size halves with every recursive call.
9. **C)** The Master Theorem only works when the input size is strictly divided by a constant $b > 1$. It fails entirely on subtractive algorithms.
10. **C)** According to the Master Theorem, $a=2, b=2$, so $n^{\log_2 2} = n^1 = n$. Since $n$ is larger than the constant $f(n)=1$, Case 1 applies, yielding $O(n)$.

## References & Navigation

- **Previous Topic:** [[Worst-case running time]]
- **Next Topic:** [[Searching Algorithms]]
- **Related Notes:** [[Recursion Tree Method]], [[Substitution Method]]
