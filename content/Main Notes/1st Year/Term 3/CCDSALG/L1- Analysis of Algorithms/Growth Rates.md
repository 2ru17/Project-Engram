---
id: Growth-Rates
type: note
course: CCDSALG
topic: Algorithms
status: completed
---

# Growth Rates

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Analysis of Algorithms]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> Growth rates describe how an algorithm’s resource usage (time or space) increases as the input size $n$ grows.

## Key Concepts
 Growth rate hierarchy from constant to factorial Asymptotic dominance between functions Why lower growth rates are preferred for scalability Connection to [[Asymptotic Notation]] and [[Order of Growth]]

## Details / Theory

### Definition

The **growth rate** of a function $f(n)$ describes how quickly $f(n)$ increases as $n \to \infty$. In algorithm analysis, we care about the growth rate of the [[Running Time]] function $T(n)$ because it determines how the algorithm scales.

### Hierarchy of Common Growth Rates

From **slowest** (best) to **fastest** (worst) growth:

| Growth Rate        | Name         | Example Algorithm                |
| ------------------ | ------------ | -------------------------------- |
| $\Theta(1)$        | Constant     | Accessing array element by index |
| $\Theta(\log n)$   | Logarithmic  | Binary Search                    |
| $\Theta(\sqrt{n})$ | Square Root  | Trial division primality test    |
| $\Theta(n)$        | Linear       | Linear Search, finding max       |
| $\Theta(n \log n)$ | Linearithmic | Merge Sort, Heap Sort            |
| $\Theta(n^2)$      | Quadratic    | Bubble Sort, checking all pairs  |
| $\Theta(n^3)$      | Cubic        | Naive matrix multiplication      |
| $\Theta(2^n)$      | Exponential  | Finding all subsets              |
| $\Theta(n!)$       | Factorial    | Generating all permutations      |

### Practical Impact

For $n = 1{,}000{,}000$ inputs:

| Growth Rate   | Approximate Operations         |
| ------------- | ------------------------------ |
| $O(\log n)$   | ~20                            |
| $O(n)$        | 1,000,000                      |
| $O(n \log n)$ | ~20,000,000                    |
| $O(n^2)$      | 1,000,000,000,000 (infeasible) |

### Asymptotic Dominance

A function $f(n)$ **dominates** $g(n)$ if $\lim_{n \to \infty} \frac{g(n)}{f(n)} = 0$.

The dominance ordering is:
$$1 \prec \log n \prec \sqrt{n} \prec n \prec n\log n \prec n^2 \prec n^3 \prec 2^n \prec n!$$

### Why Growth Rates Matter
 An $O(n \log n)$ algorithm will always eventually beat an $O(n^2)$ algorithm for sufficiently large $n$, regardless of constant factors. Growth rates are what [[Asymptotic Notation]] captures by ignoring constants and lower-order terms.

## Common Pitfalls
 Assuming a "faster" growth rate algorithm is always faster — for small $n$, constants matter. Confusing $O(n \log n)$ with $O(n)$ — the $\log n$ factor makes a real difference for large inputs. Forgetting that exponential and factorial growth rates are generally computationally infeasible.

## Summary

> TL;DR — Growth rates rank how fast an algorithm’s time/space grows with input size. The hierarchy from best to worst is: $O(1) < O(\log n) < O(n) < O(n \log n) < O(n^2) < O(2^n) < O(n!)$.

## Links
 **Related:** [[Order of Growth]] — [[Asymptotic Notation]] — [[Big-O Notation]] — [[Time Complexity]] — [[Running Time]] **Source / Reference:** Handout 03, Page 17

## Multiple Choice Questions

1. What do growth rates describe in algorithm analysis?
    - **A)** The absolute time in seconds an algorithm takes to run
    - **B)** How an algorithm's resource usage increases as the input size $n$ grows
    - **C)** The amount of physical disk space a program requires
    - **D)** The number of variables declared in the code

2. Which of the following growth rates is the slowest (best)?
    - **A)** $\Theta(n)$
    - **B)** $\Theta(\log n)$
    - **C)** $\Theta(1)$
    - **D)** $\Theta(n \log n)$

3. Which of the following growth rates is the fastest (worst)?
    - **A)** $\Theta(n^2)$
    - **B)** $\Theta(2^n)$
    - **C)** $\Theta(n!)$
    - **D)** $\Theta(n^3)$

4. What is a classic example of an algorithm with a logarithmic ($\Theta(\log n)$) growth rate?
    - **A)** Linear Search
    - **B)** Binary Search
    - **C)** Bubble Sort
    - **D)** Merge Sort

5. Merge Sort and Heap Sort are examples of algorithms with which growth rate?
    - **A)** Linear
    - **B)** Quadratic
    - **C)** Linearithmic ($\Theta(n \log n)$)
    - **D)** Exponential

6. In terms of practical impact for $n = 1,000,000$, roughly how many operations does an $O(n^2)$ algorithm perform?
    - **A)** 1,000,000
    - **B)** 20,000,000
    - **C)** 1,000,000,000,000 (infeasible)
    - **D)** ~20

7. What does asymptotic dominance ($f(n)$ dominates $g(n)$) mean mathematically?
    - **A)** The limit of $g(n)/f(n)$ as $n \to \infty$ is $0$.
    - **B)** $f(n)$ and $g(n)$ grow at the same rate.
    - **C)** $f(n)$ is always smaller than $g(n)$ for all $n$.
    - **D)** The limit of $f(n)/g(n)$ as $n \to \infty$ is $0$.

8. Why does an $O(n \log n)$ algorithm eventually beat an $O(n^2)$ algorithm?
    - **A)** Because logarithmic functions have smaller constant factors.
    - **B)** Because $n \log n$ dominates $n^2$ as $n$ approaches infinity, regardless of constant factors.
    - **C)** Because $O(n^2)$ algorithms cannot run on modern hardware.
    - **D)** Because $O(n \log n)$ is a tighter bound.

9. What is a common pitfall when comparing algorithm growth rates?
    - **A)** Assuming exponential growth is infeasible
    - **B)** Assuming a "faster" growth rate algorithm is always faster for small $n$, ignoring constant factors
    - **C)** Using asymptotic notation to compare them
    - **D)** Understanding that $O(n \log n)$ is worse than $O(n)$

10. Which of the following correctly orders growth rates from slowest to fastest?
    - **A)** $1 \prec n \prec \log n \prec n^2$
    - **B)** $1 \prec \log n \prec n \prec n \log n \prec n^2$
    - **C)** $n \prec n \log n \prec n^2 \prec \log n$
    - **D)** $\log n \prec 1 \prec n \prec n^2 \prec 2^n$

### Answer Key & Explanations

1. **B**. Growth rates measure the scalability of an algorithm by observing how rapidly time or space requirements increase relative to the input size $n$.
2. **C**. Constant time $\Theta(1)$ is the best possible growth rate because execution time doesn't increase at all as the input grows.
3. **C**. Factorial time $\Theta(n!)$ grows faster than exponential or polynomial functions, making it the most inefficient.
4. **B**. Binary Search halves the search space each step, naturally leading to a logarithmic $\Theta(\log n)$ growth rate.
5. **C**. Merge Sort and Heap Sort efficiently sort elements in linearithmic time, $\Theta(n \log n)$.
6. **C**. $(1,000,000)^2 = 1,000,000,000,000$, which is generally infeasible to compute quickly on standard hardware.
7. **A**. $f(n)$ dominates $g(n)$ if $g(n)$ becomes insignificantly small compared to $f(n)$ as $n$ approaches infinity (limit goes to 0).
8. **B**. As $n$ grows, the mathematical dominance of $n \log n$ over $n^2$ ensures it will eventually be faster, no matter how large the constant factors of the $O(n \log n)$ algorithm are.
9. **B**. For very small inputs, an $O(n^2)$ algorithm with tiny constant factors might actually outpace an $O(n \log n)$ algorithm with huge constant factors.
10. **B**. The correct mathematical dominance hierarchy is Constant $\prec$ Logarithmic $\prec$ Linear $\prec$ Linearithmic $\prec$ Quadratic.

## References & Navigation

- **Previous Topic:** [[Function Calls]]
- **Next Topic:** [[Input Size]]
- **Related Notes:** [[Algorithm Analysis]], [[Core Concepts]]
