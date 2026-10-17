---
id: Running-Time
type: note
course: CCDSALG
topic: Algorithms
status: completed
---

# Running Time

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Analysis of Algorithms]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> Quantifying execution time.

## Key Concepts
 Goal Focus Approximation Model of Computation Assumptions

## Details / Theory

Quantifying execution time. - **Goal**: To measure or predict the time an algorithm takes to execute as a function of [[Input Size]]. - **Focus**: Primarily on how running time increases with `n`. (Handout 01, Page 3) - **Approximation**: Exact behavior prediction is difficult; analysis provides an approximation or characterizes the [[Order of Growth]]. (Handout 01, Page 3) - **Model of Computation**: [[RAM Model]] - **Assumptions**: (Handout 02, Page 2) - Generic single-processor machine. - Instructions execute sequentially (no parallelism/concurrency). - Basic instructions (arithmetic, data movement, control flow, comparisons) take constant time (1 time unit). - Memory access (read/write) takes constant time. - Unlimited memory (usually assumed, though space complexity analyzes this). - **Limitations**: Doesn't account for memory hierarchy (caches, virtual memory), pipelining, multi-core processors, or complex instruction costs. Still useful for comparing algorithms at a high level.

## Code Example

_To be added._

## Complexity

| Operation | Time | Space |
| --------- | ---- | ----- |
|           |      |       |

## Common Pitfalls
 Trying to predict exact running time from analysis — analysis gives an approximation of growth. Forgetting RAM model limitations (no cache, no parallelism in the model).

## Summary

> TL;DR — Running time measures how long an algorithm takes as a function of input size $n$, analyzed under the RAM model where basic operations cost $O(1)$. Focus is on the order of growth, not exact time.

## Review Questions

_To be added._

## Links
 **Related:** - [[Input Size]] - [[Order of Growth]] - [[RAM Model]] **Source / Reference:**

## Multiple Choice Questions

1. What is the primary goal of measuring "Running Time" in theoretical algorithm analysis?
- **A)** To find out the exact number of seconds the algorithm takes to run.
- **B)** To predict the time an algorithm takes to execute as a function of input size $n$.
- **C)** To measure battery consumption.
- **D)** To count the number of variables in the code.

2. Which abstract computational model is typically assumed when quantifying running time?
- **A)** Quantum Computer Model
- **B)** Multi-Core Parallel Model
- **C)** RAM Model (Random Access Machine)
- **D)** Turing Machine

3. What is a key assumption made about instructions under the standard model of computation?
- **A)** They execute in parallel.
- **B)** Complex instructions take exponentially more time.
- **C)** Instructions execute sequentially, and basic instructions take constant time (1 time unit).
- **D)** Memory access time increases with data size.

4. What limitation does the standard analysis model have regarding modern hardware?
- **A)** It perfectly models cache behavior but ignores RAM.
- **B)** It doesn't account for memory hierarchy (caches, virtual memory), pipelining, or multi-core processors.
- **C)** It cannot analyze recursive functions.
- **D)** It only works for sorting algorithms.

5. What is a common pitfall regarding running time analysis?
- **A)** Trying to predict exact wall-clock running time from the analysis instead of an approximation of growth.
- **B)** Using Big-O notation.
- **C)** Assuming variables take up space.
- **D)** Counting the input size as $n$.

### Answer Key & Explanations
1. **B)** Running time analysis aims to map the number of computational steps required relative to the size of the input, mapping scaling behavior rather than raw speed.
2. **C)** The RAM model provides a generalized framework where algorithms can be analyzed independently of specific hardware or compilers.
3. **C)** To simplify the math, the RAM model assumes no multi-threading and assigns a flat cost of 1 to every basic arithmetic and logic operation.
4. **B)** Real hardware is incredibly complex, utilizing L1/L2 caches and predictive branching. The RAM model treats all memory accesses identically and assumes a single core.
5. **A)** Mathematical analysis yields a theoretical growth curve. Attempting to convert this curve directly into "seconds" on a real machine fails because it ignores constant factors and hardware quirks.

## References & Navigation

- **Previous Topic:** [[Recursion Tree Method]]
- **Next Topic:** [[Space Complexity]]
- **Related Notes:** [[Algorithm Analysis]], [[Core Concepts]]
