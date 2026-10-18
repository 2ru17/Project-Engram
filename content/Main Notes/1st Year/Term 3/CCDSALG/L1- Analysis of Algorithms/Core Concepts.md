---
id: Core-Concepts
type: note
course: CCDSALG
topic: Algorithms
status: completed
---

# Core Concepts

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> Algorithm Analysis

## Key Concepts
 [[Algorithm]] [[Algorithm Analysis]] [[Input Size]] [[Running Time]] [[Frequency Count]]

## Details / Theory
 **[[Algorithm]]** **[[Algorithm Analysis]]** **[[Input Size]]** **[[Running Time]]** **[[Frequency Count]]** **[[Asymptotic Notation]]** **[[Recurrences]]**

## Complexity

| Operation | Time | Space |
| --------- | ---- | ----- |
|           |      |       |

## Common Pitfalls
 Confusing **input size** with input value — input size is the number of data items (or bits), not their magnitude Mixing up **running time** (function of input size) with **wall-clock time** (hardware-dependent) Performing **frequency count** but forgetting to simplify using asymptotic notation — raw counts are less meaningful without Big-O classification Misapplying **asymptotic notation** — e.g., $O(n^2)$ is an upper bound, not a tight bound (use $\Theta$ for tight bounds)

## Summary

> TL;DR — Core concepts of algorithm analysis: **algorithm** (finite procedure), **algorithm analysis** (measuring efficiency), **input size** (problem scale), **running time** (operations as a function of input size), **frequency count** (operation tallying), **asymptotic notation** ($O$/$\Omega$/$\Theta$), and **recurrences** (for recursive algorithms).

## Links
 **Related:** - [[Algorithm]] - [[Algorithm Analysis]] - [[Input Size]] - [[Running Time]] - [[Frequency Count]] - [[Asymptotic Notation]] - [[Recurrences]] **Source / Reference:**

## Multiple Choice Questions

1. In algorithm analysis, what does "input size" refer to?
    - **A)** The magnitude or numerical value of the input
    - **B)** The number of data items or bits representing the problem scale
    - **C)** The exact number of variables declared in the code
    - **D)** The physical size of the data on the hard drive

2. What is the difference between running time and wall-clock time?
    - **A)** Running time is hardware-dependent, wall-clock time is a function of input size.
    - **B)** They are identical concepts.
    - **C)** Running time is a function of input size, while wall-clock time is hardware-dependent.
    - **D)** Wall-clock time measures space complexity instead of time.

3. Why is performing a raw frequency count often less meaningful on its own?
    - **A)** Because frequency counts cannot be calculated for loops.
    - **B)** Because it forgets to tally memory operations.
    - **C)** Because it must be simplified using asymptotic notation to classify the growth rate.
    - **D)** Because it only applies to recursive algorithms.

4. What is a common pitfall when applying asymptotic notation like $O(n^2)$?
    - **A)** Using it as a tight bound when it only represents an upper bound
    - **B)** Applying it to space complexity
    - **C)** Ignoring the input size entirely
    - **D)** Assuming it provides a lower bound

5. What are recurrences primarily used for in algorithm analysis?
    - **A)** Iterative loops
    - **B)** Variable declarations
    - **C)** Recursive algorithms
    - **D)** Defining input sizes

### Answer Key & Explanations

1. **B**. Input size refers to the scale of the problem, such as the number of elements in an array or bits in an integer, not their numerical magnitude.
2. **C**. Running time mathematically expresses the number of operations as a function of input size, whereas wall-clock time fluctuates based on the specific hardware executing it.
3. **C**. Raw counts include constants and lower-order terms that obscure the true growth rate, which is why asymptotic notation is needed.
4. **A**. A common mistake is using Big-O as a tight bound (which should be Big-Theta) rather than recognizing it just defines the upper limit.
5. **C**. Recurrences (or recurrence relations) are mathematical tools specifically used to model and analyze the running time of recursive algorithms.

## References & Navigation

- **Previous Topic:** [[Context & Relationships]]
- **Next Topic:** [[Correctness]]
- **Related Notes:** [[Algorithm Analysis]], [[Core Concepts]]
