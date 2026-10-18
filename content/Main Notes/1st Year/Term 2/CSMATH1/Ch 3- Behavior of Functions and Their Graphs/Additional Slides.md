---
id: additional_slides
type: note
course: CSMATH1
topic: Additional Slides
status: completed
---

# Additional Slides

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Conceptual]]

---

## Overview

This note contains a summary of additional slide topics covered during the lectures. It primarily acts as a review of earlier concepts regarding function behaviors, optimization, and rates of change.

## Key Definitions

**Extrema (Maximum and Minimum Function Values):** Refer to the highest and lowest points on a function's graph. Finding them involves locating critical points where the first derivative is zero or undefined.
**Derivative as a Rate of Change:** The derivative $\frac{dy}{dx}$ provides the instantaneous rate of change. This is frequently used in related rates problems and physical applications (e.g., velocity and acceleration).
**Curve Sketching:** Involves using both the first and second derivatives to determine intervals of increase/decrease, relative extrema, concavity, and points of inflection to accurately draw the function's graph.

## Theoretical Framework

These topics form the core applications of differential calculus:
1. **Optimization:** Utilizing extrema to solve applied maxima and minima problems.
2. **Related Rates:** Using implicit differentiation with respect to time to analyze related dynamic quantities.
3. **Graphing:** Systematically analyzing the mathematical properties of a function to visualize its behavior.

## Multiple Choice Questions

1. According to Rolle's Theorem, if $f$ is continuous on $[a, b]$, differentiable on $(a, b)$, and $f(a) = f(b)$, then there exists at least one $c \in (a, b)$ such that:
    - **A)** $f(c) = 0$
    - **B)** $f'(c) = 0$
    - **C)** $f''(c) = 0$
    - **D)** $f'(c) = f(b) - f(a)$

2. What equation does the Mean Value Theorem (MVT) guarantee for at least one $c \in (a, b)$ when $f$ is continuous on $[a, b]$ and differentiable on $(a, b)$?
    - **A)** $f'(c) = \frac{f(b) - f(a)}{b - a}$
    - **B)** $f'(c) = \frac{f(a) + f(b)}{2}$
    - **C)** $f(c) = \frac{f(b) - f(a)}{b - a}$
    - **D)** $f''(c) = 0$

3. Find the value $c \in (0, 2)$ that satisfies the Mean Value Theorem for $f(x) = x^2 + 2x$ on $[0, 2]$.
    - **A)** $c = \frac{1}{2}$
    - **B)** $c = \sqrt{2}$
    - **C)** $c = 1$
    - **D)** $c = \frac{3}{2}$

4. When is L'Hopital's Rule $\lim_{x \to c} \frac{f(x)}{g(x)} = \lim_{x \to c} \frac{f'(x)}{g'(x)}$ directly applicable?
    - **A)** To any quotient of two differentiable functions
    - **B)** By applying the Quotient Rule to $\frac{f(x)}{g(x)}$
    - **C)** Whenever the denominator approaches $0$ and the numerator approaches $5$
    - **D)** Only when the quotient produces an indeterminate form $\frac{0}{0}$ or $\frac{\pm\infty}{\pm\infty}$

5. In an optimization problem to maximize the area $A = xy$ of a rectangular pen using $100\text{ m}$ of fencing along 4 sides ($2x + 2y = 100$), what are the dimensions that yield the maximum area?
    - **A)** $x = 10\text{ m}, y = 40\text{ m}$
    - **B)** $x = 25\text{ m}, y = 25\text{ m}$ (a square)
    - **C)** $x = 20\text{ m}, y = 30\text{ m}$
    - **D)** $x = 50\text{ m}, y = 0\text{ m}$

### Answer Key & Explanations

1. **B**. Rolle's Theorem states that if a smooth curve starts and ends at the same height ($f(a) = f(b)$), it must have a horizontal tangent ($f'(c) = 0$) somewhere strictly between $a$ and $b$.
2. **A**. Geometrically, the Mean Value Theorem guarantees at least one point $c \in (a, b)$ where the instantaneous tangent slope $f'(c)$ equals the secant slope $\frac{f(b) - f(a)}{b - a}$ across the interval.
3. **C**. Here $\frac{f(2) - f(0)}{2 - 0} = \frac{(4 + 4) - 0}{2} = 4$. Setting $f'(c) = 2c + 2 = 4$ gives $2c = 2 \implies c = 1 \in (0, 2)$.
4. **D**. L'Hopital's Rule only applies to the indeterminate forms $0/0$ or $\pm\infty/\pm\infty$, and differentiates the numerator and denominator separately ($f'(x)/g'(x)$), not via the Quotient Rule.
5. **B**. From $2x + 2y = 100$, $y = 50 - x$, so $A(x) = x(50 - x) = 50x - x^2$. Setting $A'(x) = 50 - 2x = 0$ gives $x = 25\text{ m}$ and $y = 25\text{ m}$, which is a square by the Second Derivative Test ($A''(x) = -2 < 0$).

## References & Navigation

- **Previous Topic:** [[Curve Sketching Examples]]
- **Related Notes:** [[Curve Sketching Examples]], [[Functions and Their Graphs]]
