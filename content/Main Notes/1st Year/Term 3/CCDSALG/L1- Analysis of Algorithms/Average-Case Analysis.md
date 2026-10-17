---
id: Average-Case-Analysis
type: note
course: CCDSALG
topic: Algorithms
status: draft
---

# Average-Case Analysis

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Analysis of Algorithms]] #[[Probability]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> Average-case analysis determines the expected running time of an algorithm over all possible inputs of size $n$, weighted by their probability.

## Key Concepts
 Requires a probability distribution over inputs Expected value of running time: $T_{\text{avg}}(n) = E[T(I)]$ Often assumes uniform distribution (all inputs equally likely) Harder to compute than [[Worst-Case Analysis]]

## Details / Theory

### Definition

The **average-case running time** is the expected number of operations over all possible inputs of size $n$:

$$T_{\text{avg}}(n) = \sum_{\text{all inputs } I \text{ of size } n} P(I) \cdot T(I)$$

where $P(I)$ is the probability of encountering input $I$.

### When Average-Case is Useful
 When you want a more **realistic** measure of performance than [[Worst-Case Analysis]]. When the worst case is rare and doesn’t reflect typical usage. **Example:** Quick Sort has $O(n^2)$ worst-case but $O(n \log n)$ average-case — in practice it’s fast.

### Example: Linear Search

Searching for a target in an unsorted array of $n$ elements (assuming target is in the array, each position equally likely):

$$T_{\text{avg}}(n) = \frac{1}{n} \sum_{i=1}^{n} i = \frac{1}{n} \cdot \frac{n(n+1)}{2} = \frac{n+1}{2} = O(n)$$

On average, we check about half the array.

### Comparison of Analysis Types

| Analysis Type           | Measures        | Input                               |
| ----------------------- | --------------- | ----------------------------------- |
| [[Best-Case Analysis]]  | Minimum $T(n)$  | Best possible input                 |
| **Average-Case**        | Expected $T(n)$ | All inputs, weighted by probability |
| [[Worst-Case Analysis]] | Maximum $T(n)$  | Worst possible input                |

## Common Pitfalls
 Assuming uniform distribution when it doesn’t hold — the analysis depends on the distribution. Confusing average-case with "typical" case — average-case is a mathematical expectation. Forgetting that average-case analysis is significantly harder than worst-case.

## Summary

> TL;DR — Average-case analysis computes the expected running time across all possible inputs weighted by probability. It gives a more realistic performance picture but requires knowledge of the input distribution.

## Review Questions

_To be added._

## Links
 **Related:** [[Worst-Case Analysis]] — [[Best-Case Analysis]] — [[Time Complexity]] — [[Running Time]] — [[Algorithm Analysis]] **Source / Reference:** Handout 01

## Multiple Choice Questions

1. What does average-case analysis determine?
- **A)** The absolute maximum time an algorithm takes
- **B)** The expected running time over all possible inputs weighted by probability
- **C)** The minimum time needed for the best possible input
- **D)** The time taken by the most typical input without probabilities

2. What is required to compute the average-case running time accurately?
- **A)** A uniform distribution for all arrays
- **B)** A probability distribution over the inputs
- **C)** A completely sorted dataset
- **D)** The exact hardware specifications

3. Why is average-case analysis considered harder to compute than worst-case analysis?
- **A)** It requires analyzing the algorithm on infinite inputs.
- **B)** It involves summations and assumes knowledge of the input probability distribution.
- **C)** It ignores constant factors entirely.
- **D)** It relies solely on empirical benchmarking.

4. What distribution is most frequently assumed in average-case analysis if no other information is given?
- **A)** Normal distribution
- **B)** Exponential distribution
- **C)** Uniform distribution
- **D)** Poisson distribution

5. In the linear search example given in the notes, what is the expected average-case running time?
- **A)** O(1)
- **B)** O(log n)
- **C)** O(n)
- **D)** O(n^2)

6. On average, how much of the array is checked during a successful linear search?
- **A)** The entire array
- **B)** About one quarter of the array
- **C)** About half of the array
- **D)** Only the first element

7. Why might Quick Sort be preferred in practice despite a worst-case of O(n^2)?
- **A)** Its average-case is O(n log n), making it fast typically.
- **B)** It has a best-case of O(1).
- **C)** It does not use any extra memory.
- **D)** Its worst-case is mathematically impossible to achieve.

8. What does Best-Case Analysis measure compared to Average-Case?
- **A)** Expected T(n) rather than Maximum T(n)
- **B)** Minimum T(n) for the best possible input
- **C)** Average T(n) for all valid inputs
- **D)** Maximum resources used by any input

9. Which of the following is a common pitfall when performing average-case analysis?
- **A)** Assuming a uniform distribution when it doesn't hold in reality
- **B)** Confusing it with Big-O notation
- **C)** Using the minimum possible resources
- **D)** Ignoring the probability of an event

10. How is the average-case mathematically defined?
- **A)** The sum of all T(I) for all inputs
- **B)** The expected value: E[T(I)] or sum of P(I) * T(I)
- **C)** The maximum of P(I) * T(I)
- **D)** The average of the best and worst cases

### Answer Key & Explanations
1. **B)** Average-case analysis determines the expected running time weighted by the probability of each input.
2. **B)** It requires a probability distribution over the inputs to compute the expected value.
3. **B)** It is harder because it mathematically requires analyzing all possible inputs with their corresponding probabilities and summing them.
4. **C)** It often assumes a uniform distribution where all inputs are equally likely.
5. **C)** Linear search checks about half the array on average, which simplifies asymptotically to O(n).
6. **C)** Assuming uniform probability for the target's location, about half the elements are checked on average.
7. **A)** Even though its worst-case is O(n^2), its average-case is O(n log n), which makes it very efficient for typical inputs.
8. **B)** Best-case measures the absolute minimum T(n), whereas average-case measures the expected T(n).
9. **A)** A common pitfall is assuming a uniform distribution without verifying if all inputs are truly equally likely in practice.
10. **B)** It is mathematically defined as the expected value, calculated by the sum of probabilities multiplied by the time for each input.

## References & Navigation

- **Previous Topic:** [[Asymptotic Notation]]
- **Next Topic:** [[Best-Case Analysis]]
- **Related Notes:** [[Best-Case Analysis]], [[Worst-Case Analysis]]
