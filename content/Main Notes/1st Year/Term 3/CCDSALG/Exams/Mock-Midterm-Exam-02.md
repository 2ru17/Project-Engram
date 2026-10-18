---
id: Mock-Midterm-Exam-02
type: note
course: CCDSALG
topic: Mock-Midterm-Exam-02
status: completed
---

# Mock-Midterm-Exam-02

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCDSALG]] #[[Mock-Midterm-Exam-02]] #[[Conceptual]]

---

## Overview

The second mock exam focuses heavily on algorithm analysis (frequency counting, explicit functions, and recurrence relations), determining the appropriate asymptotic notations (Big Oh, Omega, Theta), evaluating sorting algorithms (Bubble Sort, Selection Sort, Insertion Sort, Merge Sort), and converting expressions among infix, postfix, and prefix notations.

## Important Formulas

**Recurrences:** Examples include $T(n) = T(n-1) + 3$ and $T(n) = 2T(n/2) + 5$.
**Logarithmic Time:** Merge sort combines two sorted arrays in $O(n)$ time, yielding an overall time complexity of $O(n \log_2 n)$.

## Worked Examples

1. **Expression Conversion:** Converting $9 - 2 * (5 - 4) / (-7 * (3 - 10)) + 8$ to postfix and prefix.
2. **Queue and Stack Methods:** Writing a function to copy a queue to a stack while retaining the queue's original contents.
3. **Code Behavior:** Analyzing the effect of changing the condition from `>` to `<` in a Selection Sort implementation.

## Multiple Choice Questions

1. What is a key focus of Mock Midterm Exam 02 that differentiates it slightly from the first exam?
    - **A)** Determining appropriate asymptotic notations (Big Oh, Omega, Theta) and expression conversions.
    - **B)** Implementing graph theory.
    - **C)** Memory allocation in C.
    - **D)** Database normalization.

2. Which algorithmic notation is used to describe a tight bound on running time?
    - **A)** Big Oh
    - **B)** Big Omega
    - **C)** Big Theta
    - **D)** Little Oh

3. What time complexity does Merge Sort achieve by combining two sorted arrays in $O(n)$ time?
    - **A)** $O(n)$
    - **B)** $O(n^2)$
    - **C)** $O(n \log_2 n)$
    - **D)** $O(\log n)$

4. What worked example is mentioned regarding expression conversion?
    - **A)** Converting a binary tree to a linked list.
    - **B)** Converting a complex arithmetic expression to postfix and prefix notations.
    - **C)** Converting JSON to XML.
    - **D)** Converting a string to an integer.

### Answer Key & Explanations

1. **A**. Exam 02 heavily emphasizes distinguishing between Big Oh, Omega, and Theta, as well as converting between infix, prefix, and postfix expressions.
2. **C**. Big Theta ($\Theta$) indicates that an algorithm is bounded both above and below by the same function, meaning it's a tight bound.
3. **C**. The recursive splitting gives $\log_2 n$ depth, and merging takes $O(n)$ time per level, culminating in $O(n \log_2 n)$.
4. **B**. The document highlights converting a long, parenthesis-heavy infix mathematical expression into postfix and prefix formats.

## References & Navigation

- **Previous Topic:** [[Mock-Midterm-Exam-01]]
- **Related Notes:** [[Mock-Midterm-Exam-01]]
