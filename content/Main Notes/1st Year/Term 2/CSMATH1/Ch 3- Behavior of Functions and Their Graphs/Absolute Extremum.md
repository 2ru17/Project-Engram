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

**Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Problem Solving]]

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

1. What are the hypotheses required by the **Extreme Value Theorem (EVT)** to guarantee that $f(x)$ attains both an absolute maximum and an absolute minimum on $[a, b]$?
    - **A)** $f$ must be differentiable on the open interval $(a, b)$
    - **B)** $f$ must be continuous on the closed, bounded interval $[a, b]$
    - **C)** $f$ must be strictly monotonic on $[a, b]$
    - **D)** $f'(x) \ne 0$ everywhere on $[a, b]$

2. How is a **critical number** $c$ of a function $f$ defined?
    - **A)** Any number $c$ where $f(c) = 0$
    - **B)** A number $c$ in the domain of $f$ such that either $f'(c) = 0$ or $f'(c)$ does not exist
    - **C)** Any number $c$ where $f''(c) = 0$
    - **D)** Any vertical asymptote where $f(c)$ is undefined

3. According to the Closed Interval Method, to find the absolute maximum and minimum of a continuous function $f$ on $[a, b]$, where must you evaluate $f(x)$?
    - **A)** Only at points where $f'(x) = 0$
    - **B)** Only at the endpoints $x = a$ and $x = b$
    - **C)** At all critical numbers of $f$ in $(a, b)$ AND at the endpoints $a$ and $b$
    - **D)** At all inflection points where $f''(x) = 0$

4. Find the absolute maximum value of $f(x) = x^3 - 3x + 1$ on the closed interval $[0, 2]$.
    - **A)** $-1$
    - **B)** $1$
    - **C)** $3$
    - **D)** $2$

5. Does Fermat's Theorem ("if $f$ has a local extremum at $c$ and $f'(c)$ exists, then $f'(c) = 0$") imply that every point with $f'(c) = 0$ is a local extremum?
    - **A)** Yes, $f'(c) = 0$ always guarantees a local maximum or minimum
    - **B)** No; for example, $f(x) = x^3$ has $f'(0) = 0$ at $x = 0$, which is a horizontal inflection point rather than a local extremum
    - **C)** Yes, provided $f(x)$ is a polynomial
    - **D)** No, because $f'(c) = 0$ only occurs at endpoints

### Answer Key & Explanations

1. **B**. Both continuity and a closed, bounded interval $[a, b]$ are essential. If the interval is open (like $(0, 1)$) or $f$ has a discontinuity, absolute extrema may fail to exist.
2. **B**. A critical number must first belong to the domain of $f$, and at that point the derivative must either vanish ($f'(c) = 0$) or fail to exist (such as a corner or cusp).
3. **C**. Absolute extrema on $[a, b]$ can occur either in the interior (which by Fermat's Theorem must be at a critical number) or at the boundary endpoints $x = a$ and $x = b$.
4. **C**. Here $f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1) = 0 \implies x = 1$ is the only critical number in $(0, 2)$. Comparing values: $f(0) = 1$, $f(1) = -1$ (abs min), and $f(2) = 8 - 6 + 1 = 3$ (abs max).
5. **B**. The converse of Fermat's Theorem is false: $f'(c) = 0$ is a necessary condition for a differentiable interior extremum, not a sufficient one. For $f(x) = x^3$, $f'(x) = 3x^2 \ge 0$ does not change sign at $x = 0$.

## References & Navigation

- **Previous Topic:** [[Maximum and Minimum Function Values with Applications]]
- **Next Topic:** [[Curve Sketching Examples]]
- **Related Notes:** [[Maximum and Minimum Function Values with Applications]], [[Functions and Their Graphs]]
