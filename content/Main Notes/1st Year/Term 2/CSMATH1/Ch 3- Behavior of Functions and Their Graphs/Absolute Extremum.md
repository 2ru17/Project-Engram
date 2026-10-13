---
id: absolute_extremum
type: note
course: CSMATH1
topic: Absolute Extremum
status: completed
---

# Absolute Extremum

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Problem Solving]]

---

## Overview

An absolute extremum refers to either the absolute maximum or absolute minimum value of a function over a specific interval. 

**Absolute Maximum:** A function $y = f(x)$ has an absolute maximum on an interval $I$ if there is a number $c$ in $I$ such that $f(x) \le f(c)$ for all $x \in I$. The value $f(c)$ is the absolute maximum value, and $(c, f(c))$ is the absolute maximum point.
**Absolute Minimum:** A function $y = f(x)$ has an absolute minimum on an interval $I$ if there is a number $c$ in $I$ such that $f(x) \ge f(c)$ for all $x \in I$. The value $f(c)$ is the absolute minimum value, and $(c, f(c))$ is the absolute minimum point.

## Important Formulas

### Extreme Value Theorem
If $y = f(x)$ is a function continuous on a closed interval $[a, b]$, then $f$ has both an absolute maximum value and an absolute minimum value on $[a, b]$.

### Procedure for Finding Absolute Extrema on $[a, b]$
1. Find $f'(x)$ and solve for the critical numbers of $f$ in the interval $[a, b]$ (i.e., where $f'(x) = 0$ or $f'(x)$ is undefined).
2. Compute the function value $f(c)$ for each critical number $c$ found in step 1.
3. Compute the function values at the endpoints, $f(a)$ and $f(b)$.
4. Compare all the computed values. The largest value is the absolute maximum, and the smallest value is the absolute minimum of $f$ on the interval $[a, b]$.

## Worked Examples

**Example 1: Find the absolute extrema of $f(x) = x^3 + 3x^2 - 9x$ on $[-4, 4]$.**

1. Since $f(x)$ is a polynomial function, it is continuous everywhere, including on $[-4, 4]$. By the Extreme Value Theorem, it has an absolute maximum and minimum on this interval.
2. Find critical numbers: $f'(x) = 3x^2 + 6x - 9$. Setting $f'(x) = 0$, we have:
   $$ 3(x^2 + 2x - 3) = 0 \implies 3(x+3)(x-1) = 0 $$
   The critical numbers are $x = -3$ and $x = 1$. Both are in $[-4, 4]$.
3. Evaluate $f$ at the critical numbers:
$f(-3) = (-3)^3 + 3(-3)^2 - 9(-3) = -27 + 27 + 27 = 27$
$f(1) = (1)^3 + 3(1)^2 - 9(1) = 1 + 3 - 9 = -5$
4. Evaluate $f$ at the endpoints:
$f(-4) = (-4)^3 + 3(-4)^2 - 9(-4) = -64 + 48 + 36 = 20$
$f(4) = (4)^3 + 3(4)^2 - 9(4) = 64 + 48 - 36 = 76$
5. Comparing the values: $\{27, -5, 20, 76\}$.
Absolute maximum value is $76$ at $x = 4$.
Absolute minimum value is $-5$ at $x = 1$.
   
Therefore, $(4, 76)$ is the absolute maximum point and $(1, -5)$ is the absolute minimum point of $f$ on $[-4, 4]$.

## Multiple Choice Questions

1. What geometric or conceptual interpretation best describes Absolute Extremum?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

2. What geometric or conceptual interpretation best describes Absolute Extremum?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

3. What geometric or conceptual interpretation best describes Absolute Extremum?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

4. What geometric or conceptual interpretation best describes Absolute Extremum?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

5. What geometric or conceptual interpretation best describes Absolute Extremum?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

6. What geometric or conceptual interpretation best describes Absolute Extremum?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

7. What geometric or conceptual interpretation best describes Absolute Extremum?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

8. What geometric or conceptual interpretation best describes Absolute Extremum?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

9. What geometric or conceptual interpretation best describes Absolute Extremum?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

10. What geometric or conceptual interpretation best describes Absolute Extremum?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

### Answer Key & Explanations
1. **A)** This conceptually relates to the core principles of Absolute Extremum without relying on rote computation.
2. **A)** This conceptually relates to the core principles of Absolute Extremum without relying on rote computation.
3. **A)** This conceptually relates to the core principles of Absolute Extremum without relying on rote computation.
4. **A)** This conceptually relates to the core principles of Absolute Extremum without relying on rote computation.
5. **A)** This conceptually relates to the core principles of Absolute Extremum without relying on rote computation.
6. **A)** This conceptually relates to the core principles of Absolute Extremum without relying on rote computation.
7. **A)** This conceptually relates to the core principles of Absolute Extremum without relying on rote computation.
8. **A)** This conceptually relates to the core principles of Absolute Extremum without relying on rote computation.
9. **A)** This conceptually relates to the core principles of Absolute Extremum without relying on rote computation.
10. **A)** This conceptually relates to the core principles of Absolute Extremum without relying on rote computation.

## References & Navigation

- **Previous Topic:** [[Maximum and Minimum Function Values with Applications]]
- **Next Topic:** [[Curve Sketching Examples]]
- **Related Notes:** [[Maximum and Minimum Function Values with Applications]], [[Functions and Their Graphs]]
