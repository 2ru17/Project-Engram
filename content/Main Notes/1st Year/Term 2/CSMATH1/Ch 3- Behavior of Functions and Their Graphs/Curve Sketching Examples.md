---
id: curve_sketching_examples
type: note
course: CSMATH1
topic: Curve Sketching Examples
status: completed
---

# Curve Sketching Examples

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Problem Solving]]

---

## Overview

Curve sketching using derivatives allows us to determine the shape, direction, and critical features of a function's graph. By analyzing the first and second derivatives, we can find intervals of increase and decrease, relative extrema, concavity, and points of inflection.

## Important Formulas & Concepts

### Increasing and Decreasing Functions
**Increasing Function:** A function $y = f(x)$ is increasing on an interval $I$ if for any two points $x_1$ and $x_2$ in $I$, $x_1 < x_2 \implies f(x_1) \le f(x_2)$.
**Decreasing Function:** A function $y = f(x)$ is decreasing on an interval $I$ if for any two points $x_1$ and $x_2$ in $I$, $x_1 < x_2 \implies f(x_1) \ge f(x_2)$.
**Monotonic Function:** A function that is exclusively increasing or exclusively decreasing on an interval $I$.

### The First Derivative Test for Monotonicity
1. If $f'(x) > 0$ for all $x$ in an interval $I$, then $f$ is increasing on $I$.
2. If $f'(x) < 0$ for all $x$ in an interval $I$, then $f$ is decreasing on $I$.

### Critical Numbers and Points
**Critical Number:** A number $c$ in the domain of $f$ such that $f'(c) = 0$ or $f'(c)$ is undefined (d.n.e).
**Critical Point:** The point $(c, f(c))$ on the graph of $f$. At a critical point, the tangent line is either horizontal ($f'(c) = 0$) or there might be a sharp turn/cusp ($f'(c)$ is undefined).

### First Derivative Test for Relative Extrema
Let $c$ be a critical number for $f$.
1. If $f'(x) > 0$ for $x < c$ and $f'(x) < 0$ for $x > c$, then $f$ has a relative maximum at $(c, f(c))$.
2. If $f'(x) < 0$ for $x < c$ and $f'(x) > 0$ for $x > c$, then $f$ has a relative minimum at $(c, f(c))$.
3. If $f'(x)$ does not change sign at $c$, then $f$ has no relative extremum at $c$.

*(Note: A relative extremum point is necessarily a critical point, but a critical point may or may not be a relative extremum point. You must test the critical points.)*

## Worked Examples

**Example: Find critical numbers and test for relative extrema.**
Let $f(x)$ be a differentiable function.
1. Compute the first derivative $f'(x)$.
2. Set $f'(x) = 0$ and solve for $x$ to find critical numbers. Find any $x$ where $f'(x)$ is undefined.
3. Set up intervals based on the critical numbers to test the sign of $f'(x)$.
4. Apply the First Derivative Test to conclude whether each critical number corresponds to a relative maximum, relative minimum, or neither.

## Multiple Choice Questions

1. If $f'(x) > 0$ on $(-\infty, 2)$ and $f'(x) < 0$ on $(2, \infty)$ for a continuous function $f$, what does the First Derivative Test conclude at $x = 2$?
    - **A)** $f$ has a local minimum at $x = 2$
    - **B)** $f$ has a local maximum at $x = 2$
    - **C)** $f$ has a point of inflection at $x = 2$
    - **D)** $f$ has a vertical asymptote at $x = 2$

2. What does the condition $f''(x) < 0$ on an open interval $I$ tell us about the graph of $f$ on $I$?
    - **A)** The graph of $f$ is concave downward on $I$ (its tangent slopes $f'(x)$ are decreasing)
    - **B)** $f$ is strictly decreasing on $I$
    - **C)** The graph of $f$ is concave upward on $I$
    - **D)** $f(x)$ takes only negative values on $I$

3. How is a **point of inflection** defined on the graph of a continuous function $f$?
    - **A)** Any point where $f'(x) = 0$
    - **B)** Any point where $f''(x) = 0$, regardless of whether concavity changes
    - **C)** A point where the graph changes concavity (from concave upward to concave downward, or vice versa)
    - **D)** A point where the graph crosses the $x$-axis

4. Suppose $f'(c) = 0$ and $f''(c) = 6 > 0$. By the Second Derivative Test, what occurs at $x = c$?
    - **A)** A local maximum, because $f''(c) > 0$
    - **B)** A point of inflection
    - **C)** The Second Derivative Test is inconclusive
    - **D)** A local minimum, because the tangent is horizontal and the curve is concave upward

5. Find the x-coordinate of the point of inflection of $f(x) = x^3 - 6x^2 + 9x + 1$.
    - **A)** $x = 1$
    - **B)** $x = 2$
    - **C)** $x = 3$
    - **D)** $x = 0$

### Answer Key & Explanations

1. **B**. Since $f$ is increasing to the left of $2$ ($f' > 0$) and decreasing to the right of $2$ ($f' < 0$), the graph rises to a peak at $x = 2$, yielding a local maximum.
2. **A**. The second derivative $f''(x)$ is the rate of change of the slope $f'(x)$. When $f''(x) < 0$, the slopes are decreasing, meaning the curve bends downward (concave downward).
3. **C**. A point of inflection requires an actual sign change in $f''(x)$ (a change in concavity). Merely having $f''(c) = 0$ is not enough (for instance, $f(x) = x^4$ has $f''(0) = 0$ but is concave up on both sides).
4. **D**. At $x = c$, $f'(c) = 0$ gives a horizontal tangent, and $f''(c) > 0$ means the curve opens upward like a cup around $c$, so $f(c)$ is a local minimum.
5. **B**. Here $f'(x) = 3x^2 - 12x + 9$ and $f''(x) = 6x - 12 = 6(x - 2)$. Since $f''(x)$ changes sign from negative ($x < 2$) to positive ($x > 2$) at $x = 2$, the inflection point is at $x = 2$.

## References & Navigation

- **Previous Topic:** [[Absolute Extremum]]
- **Next Topic:** [[Additional Slides]]
- **Related Notes:** [[Functions and Their Graphs]], [[Absolute Extremum]]
