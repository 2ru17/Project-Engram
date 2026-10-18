---
id: functions_and_their_graphs
type: note
course: CSMATH1
topic: Functions and Their Graphs
status: completed
---

# Functions and Their Graphs

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Conceptual]]

---

## Overview

Functions are fundamental mathematical objects that map an input to exactly one output. A function $f$ from a set $A$ to a set $B$ assigns to each element $x$ in $A$ exactly one element $y$ in $B$, denoted as $f(x) = y$.

The graph of a function $f$ is the set of all ordered pairs $(x, f(x))$ in the coordinate plane. It provides a visual representation of the function's behavior, showing how the output varies with the input.

Key concepts in studying functions include: **Domain**: The set of all possible input values (x-values) for which the function is defined. **Range**: The set of all possible output values (y-values) that the function produces. **Intercepts**: Points where the graph crosses the x-axis ($y=0$) and y-axis ($x=0$). **Symmetry**: Identifying if a function is even ($f(-x) = f(x)$), odd ($f(-x) = -f(x)$), or neither. **Asymptotes**: Lines that the graph approaches as $x$ or $y$ tends to infinity.

Understanding these properties is crucial for accurately sketching and analyzing the graphs of various types of functions (polynomial, rational, exponential, logarithmic, trigonometric, etc.).

## Important Formulas
 **Function Notation**: $y = f(x)$ **Vertical Line Test**: A curve in the Cartesian plane is the graph of a function if and only if no vertical line intersects the curve more than once. **Even Function**: $f(-x) = f(x)$ for all $x$ in the domain (symmetric about the y-axis). **Odd Function**: $f(-x) = -f(x)$ for all $x$ in the domain (symmetric about the origin).

## Worked Examples

**Example 1: Evaluating a Function**
Given $f(x) = 2x^2 - 3x + 1$, evaluate $f(2)$.
*Solution:*
Substitute $x = 2$ into the function:
$$f(2) = 2(2)^2 - 3(2) + 1$$
$$f(2) = 2(4) - 6 + 1$$
$$f(2) = 8 - 6 + 1$$
$$f(2) = 3$$

**Example 2: Finding the Domain**
Find the domain of $g(x) = \frac{1}{x - 3}$.
*Solution:*
The function is undefined when the denominator is zero.
$$x - 3 = 0 \implies x = 3$$
Therefore, the domain is all real numbers except $x = 3$. In interval notation: $(-\infty, 3) \cup (3, \infty)$.

## Multiple Choice Questions

1. What is the fundamental definition of a function $f$ from a set $A$ to a set $B$?
    - **A)** It maps each element in $A$ to multiple elements in $B$
    - **B)** It maps each element in the domain $A$ to exactly one element in the codomain $B$
    - **C)** It maps each element in $B$ to at least two elements in $A$
    - **D)** It requires the domain $A$ and range $B$ to contain the exact same numbers

2. What is the natural domain of the real-valued function $f(x) = \frac{\sqrt{x - 1}}{x - 4}$?
    - **A)** $(-\infty, 4) \cup (4, \infty)$
    - **B)** $[1, \infty)$
    - **C)** $[1, 4) \cup (4, \infty)$
    - **D)** $(1, 4)$

3. Which algebraic condition must hold for a function $f(x)$ to be classified as an **odd function**, and what symmetry does its graph exhibit?
    - **A)** $f(-x) = f(x)$; symmetric about the $y$-axis
    - **B)** $f(-x) = -f(x)$; symmetric about the origin
    - **C)** $f(x + c) = f(x)$; symmetric about the $x$-axis
    - **D)** $f^{-1}(x) = f(x)$; symmetric about the line $y = x$

4. According to the Vertical Line Test, a curve in the $xy$-plane is the graph of a function $y = f(x)$ if and only if:
    - **A)** Every vertical line intersects the curve at least once
    - **B)** No horizontal line intersects the curve more than once
    - **C)** No vertical line intersects the curve more than once
    - **D)** The curve passes through the origin $(0, 0)$

5. Given $f(x) = x^2 + 1$ and $g(x) = 3x - 2$, what is the composite function $(f \circ g)(2) = f(g(2))$?
    - **A)** $13$
    - **B)** $17$
    - **C)** $10$
    - **D)** $20$

### Answer Key & Explanations

1. **B**. A function must assign a unique output $f(x) \in B$ to every input $x \in A$. Two different inputs may share the same output, but a single input can never produce two different outputs.
2. **C**. The square root $\sqrt{x - 1}$ requires $x - 1 \ge 0 \implies x \ge 1$, while the denominator $x - 4$ cannot be zero ($x \ne 4$). Combining both constraints gives $[1, 4) \cup (4, \infty)$.
3. **B**. An odd function satisfies $f(-x) = -f(x)$ for all $x$ in its domain, meaning rotating its graph $180^\circ$ about the origin leaves it unchanged. Option A describes an even function.
4. **C**. If a vertical line $x = a$ intersected a curve at two distinct points $(a, y_1)$ and $(a, y_2)$, the single input $a$ would map to two outputs, violating the definition of a function.
5. **B**. First evaluate the inner function: $g(2) = 3(2) - 2 = 4$. Then substitute that result into the outer function: $f(4) = 4^2 + 1 = 16 + 1 = 17$.

## References & Navigation

- **Next Topic:** [[Introduction to Limits]]
- **Related Notes:** [[Curve Sketching Examples]], [[Behavior of Functions and Their Graphs]]
