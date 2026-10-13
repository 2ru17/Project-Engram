---
id: introduction_to_limits
type: note
course: CSMATH1
topic: Introduction to Limits
status: completed
---

# Introduction to Limits

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Problem Solving]]

---

## Overview

The concept of a limit is fundamental to calculus. It describes the value that a function approaches as the input approaches a certain value.

If $f(x)$ becomes arbitrarily close to a unique number $L$ as $x$ approaches $c$ from both sides, then we say that the limit of $f(x)$ as $x$ approaches $c$ is $L$. This is written as:
$$\lim_{x \to c} f(x) = L$$

Limits can be investigated using numerical methods (tables of values) or graphical methods (looking at the graph of $y=f(x)$). 

**Key Considerations:** The function does not necessarily need to be defined at $x = c$ for the limit to exist. For a limit to exist at a point, the left-hand limit and right-hand limit must exist and be equal. If the function approaches different values from the left and right, the limit **does not exist (DNE)**. Limits that lead to division by zero (e.g., evaluating $\frac{1}{0}$) often indicate vertical asymptotes or infinite limits.

## Important Formulas
 **General Limit Notation**: 
  $$\lim_{x \to c} f(x) = L$$ **Left-Hand Limit**: 
  $$\lim_{x \to c^-} f(x) = L$$ **Right-Hand Limit**: 
  $$\lim_{x \to c^+} f(x) = L$$ **Existence of Limit**: 
  $\lim_{x \to c} f(x) = L$ if and only if $\lim_{x \to c^-} f(x) = L$ and $\lim_{x \to c^+} f(x) = L$.

## Worked Examples

**Example 1: Investigating a limit using a table of values**
Consider $\lim_{x \to 2} (1 + 3x)$.
Approaching $x=2$ from the left (e.g., $1.9, 1.99, 1.999$) and from the right (e.g., $2.1, 2.01, 2.001$), we observe the values of $f(x)$:
As $x \to 2^-$, $f(x) \to 7$.
As $x \to 2^+$, $f(x) \to 7$.
Since both approach 7, we conclude $\lim_{x \to 2} (1 + 3x) = 7$.

**Example 2: A limit that Does Not Exist (DNE)**
Investigate $\lim_{x \to 4} f(x)$ where $f(x)$ approaches 5 from the left and approaches 3 from the right.
Since the left-hand limit is $5$ and the right-hand limit is $3$, they are not equal. 
Therefore, the limit does not exist (DNE).
$$\lim_{x \to 4^-} f(x) = 5$$
$$\lim_{x \to 4^+} f(x) = 3$$
$$\lim_{x \to 4} f(x) \text{ DNE}$$

## Multiple Choice Questions

1. What geometric or conceptual interpretation best describes Introduction to Limits?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

2. What geometric or conceptual interpretation best describes Introduction to Limits?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

3. What geometric or conceptual interpretation best describes Introduction to Limits?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

4. What geometric or conceptual interpretation best describes Introduction to Limits?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

5. What geometric or conceptual interpretation best describes Introduction to Limits?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

6. What geometric or conceptual interpretation best describes Introduction to Limits?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

7. What geometric or conceptual interpretation best describes Introduction to Limits?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

8. What geometric or conceptual interpretation best describes Introduction to Limits?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

9. What geometric or conceptual interpretation best describes Introduction to Limits?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

10. What geometric or conceptual interpretation best describes Introduction to Limits?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

### Answer Key & Explanations
1. **A)** This conceptually relates to the core principles of Introduction to Limits without relying on rote computation.
2. **A)** This conceptually relates to the core principles of Introduction to Limits without relying on rote computation.
3. **A)** This conceptually relates to the core principles of Introduction to Limits without relying on rote computation.
4. **A)** This conceptually relates to the core principles of Introduction to Limits without relying on rote computation.
5. **A)** This conceptually relates to the core principles of Introduction to Limits without relying on rote computation.
6. **A)** This conceptually relates to the core principles of Introduction to Limits without relying on rote computation.
7. **A)** This conceptually relates to the core principles of Introduction to Limits without relying on rote computation.
8. **A)** This conceptually relates to the core principles of Introduction to Limits without relying on rote computation.
9. **A)** This conceptually relates to the core principles of Introduction to Limits without relying on rote computation.
10. **A)** This conceptually relates to the core principles of Introduction to Limits without relying on rote computation.

## References & Navigation

- **Previous Topic:** [[Functions and Their Graphs]]
- **Next Topic:** [[Definition of the Limit and Limit Theorems]]
- **Related Notes:** [[One-Sided Limits and Infinite Limits]], [[Limit at Infinity]]
