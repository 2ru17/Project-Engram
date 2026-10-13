---
id: Algorithm
type: note
course: CCDSALG
topic: Algorithms
status: completed
---

# Algorithm

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> Understanding what constitutes an algorithm.

## Key Concepts
 Definition Characteristics Input Output Definiteness

## Details / Theory

Understanding what constitutes an algorithm.
 **Definition**: Any well-defined computational procedure that takes value(s) as input and produces value(s) as output in a finite amount of time. (Handout 01, Page 2) **Characteristics**:
**Input**: Zero or more quantities are externally supplied.
**Output**: At least one quantity is produced.
**Definiteness**: Each instruction is clear and unambiguous.
**Finiteness**: Algorithm terminates after a finite number of steps for all legitimate inputs.
**Effectiveness**: Every instruction must be basic enough to be carried out, in principle, by a person using only pencil and paper.
\*These are the 5 characteristics that are needed to be remembered to define an "Algorithm"
 **Design Issues**:
[[Correctness]]: Does it produce the correct output for all valid inputs? (Proving correctness often involves loop in variants, induction).
[[Efficiency]]: How well does it use resources (time, space)? (Handout 01, Page 2)
**Simplicity/Readability**: Is the algorithm easy to understand, implement, and maintain?
**Optimal**: Is this the best possible algorithm for the problem (often discussed in terms of lower bounds)?
 **Performance Metrics**:
[[Time Complexity]]: How long does the algorithm take to run?
[[Space Complexity]]: How much memory does the algorithm require? (Handout 01, Page 2)

## Code Example

_To be added._

## Complexity

| Operation | Time | Space |
| --------- | ---- | ----- |
|           |      |       |

## Common Pitfalls
 Confusing an **algorithm** with a **program** — an algorithm is a finite, abstract procedure; a program is its concrete implementation Ignoring the **finiteness** property — a procedure that may loop forever is not an algorithm Conflating **correctness** (produces the right output) with **efficiency** (does so quickly) — both are separate design concerns Assuming **time complexity** alone is sufficient — **space complexity** also matters, especially on memory-constrained systems Forgetting that **input size** definition varies by problem (e.g., number of elements vs. number of bits)

## Summary

> TL;DR — An **algorithm** is a finite, well-defined computational procedure with five properties: input, output, definiteness, finiteness, and effectiveness. Analyzing algorithms involves measuring **correctness**, **time complexity**, and **space complexity** relative to input size.

## Review Questions

_To be added._

## Links
 **Related:** - [[Correctness]] - [[Time Complexity]] - [[Space Complexity]] **Source / Reference:**

## Multiple Choice Questions

1. Which of the following is a characteristic of an algorithm?
    - **A)** Infinite execution time
    - **B)** Ambiguous instructions
    - **C)** Produces at least one quantity as output
    - **D)** Requires exactly one input

2. What does the "Definiteness" characteristic of an algorithm mean?
    - **A)** The algorithm terminates after a finite number of steps.
    - **B)** Each instruction is clear and unambiguous.
    - **C)** Every instruction must be basic enough to be carried out manually.
    - **D)** It produces the correct output for all valid inputs.

3. Which property ensures that a procedure does not loop forever?
    - **A)** Effectiveness
    - **B)** Definiteness
    - **C)** Finiteness
    - **D)** Efficiency

4. What is the difference between an algorithm and a program?
    - **A)** An algorithm is a concrete implementation; a program is an abstract procedure.
    - **B)** An algorithm is finite and abstract; a program is its concrete implementation.
    - **C)** A program must be written in pseudocode, while an algorithm is written in a programming language.
    - **D)** There is no difference; the terms are synonymous.

5. What does "Correctness" in algorithm design refer to?
    - **A)** How well it uses time and memory resources
    - **B)** Whether it produces the right output for all valid inputs
    - **C)** If the algorithm is easy to read and maintain
    - **D)** Whether it is the best possible algorithm for the problem

6. Which characteristic requires that an instruction be basic enough to be executed by a person with pencil and paper?
    - **A)** Definiteness
    - **B)** Effectiveness
    - **C)** Finiteness
    - **D)** Simplicity

7. What does Time Complexity measure?
    - **A)** How long the algorithm takes to run
    - **B)** How much memory the algorithm requires
    - **C)** The physical space on the hard drive used by the program
    - **D)** The number of lines of code in the implementation

8. Why is space complexity important, despite modern hardware advancements?
    - **A)** It is the only metric that matters for correctness.
    - **B)** It helps avoid infinite loops.
    - **C)** It is crucial, especially on memory-constrained systems.
    - **D)** It defines the theoretical lower bound of a problem.

9. What is a common mistake when designing algorithms?
    - **A)** Ensuring that the procedure is finite
    - **B)** Conflating correctness with efficiency
    - **C)** Considering both time and space complexity
    - **D)** Providing zero or more external inputs

10. Which of the following metrics determines if the algorithm is easy to understand, implement, and maintain?
    - **A)** Correctness
    - **B)** Efficiency
    - **C)** Simplicity/Readability
    - **D)** Optimality

### Answer Key & Explanations
1. **C)** An algorithm must produce at least one quantity as an output. It can take zero or more inputs.
2. **B)** Definiteness means that each instruction is clear and unambiguous.
3. **C)** Finiteness guarantees that the algorithm will terminate after a finite number of steps for all legitimate inputs.
4. **B)** An algorithm is a finite, abstract procedure, whereas a program is its concrete implementation in a specific language.
5. **B)** Correctness ensures that the algorithm produces the right output for all valid inputs.
6. **B)** Effectiveness dictates that every instruction must be basic enough to be carried out manually.
7. **A)** Time complexity measures how long the algorithm takes to run based on the input size.
8. **C)** Space complexity tracks memory usage and remains important for memory-constrained environments or massive data processing.
9. **B)** Correctness (producing the right output) is a separate concern from efficiency (doing it quickly).
10. **C)** Simplicity and readability determine how easily an algorithm can be understood and maintained.

## References & Navigation

- **Previous Topic:** [[Algorithm Analysis]]
- **Next Topic:** [[Amortized Analysis]]
- **Related Notes:** [[Algorithm Analysis]], [[Core Concepts]]
