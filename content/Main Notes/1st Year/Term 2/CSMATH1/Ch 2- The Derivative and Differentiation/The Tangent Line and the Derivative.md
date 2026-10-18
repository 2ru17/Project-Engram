---
id: the_tangent_line_and_the_derivative
type: note
course: CSMATH1
topic: The Tangent Line and the Derivative
status: completed
---

# The Tangent Line and the Derivative

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Problem Solving]]

---

## Overview

### The Tangent Line
A **tangent line** is a straight line that "touches" a given curve at a specific point (the point of tangency). The slope of the tangent line matches the slope of the curve at that exact point. To find the slope of the tangent line, we consider a **secant line** passing through two points on the curve: $(x, f(x))$ and $(x+h, f(x+h))$. 
The slope of this secant line is given by the difference quotient:
$$\frac{\Delta y}{\Delta x} = \frac{f(x+h) - f(x)}{h}$$
As the distance $h$ between the points approaches 0, the secant line approaches the tangent line. 

### The Derivative
The **derivative** of a function $f$ with respect to $x$ provides the slope of the tangent line to the curve at any point $(x, f(x))$. It is also interpreted as the **instantaneous rate of change** of the function.
The derivative is denoted by $f'(x)$, $\frac{dy}{dx}$, $\frac{d}{dx}f(x)$, or $D_x y$, and is defined by the limit:
$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

### Curves without Tangent Lines
The tangent line to a graph at a point may not exist. This occurs in two main scenarios:
1. **Discontinuity**: The function is not continuous at the point.
2. **Sharp Corners or Cusps**: The function's graph has a sharp turn, meaning the limit from the left and the limit from the right yield different slopes.
*(Note: A vertical tangent line is allowed in the definition; it occurs when the slope approaches $\pm \infty$.)*

## Important Formulas

**Difference Quotient (Secant Slope)**: 
  $$m_{\text{sec}} = \frac{f(x+h) - f(x)}{h}$$
**Limit Definition of the Derivative**: 
  $$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

## Worked Examples

**Example 1: Finding the derivative using the limit definition**
Find $f'(x)$ for $f(x) = -x^2$.
*Solution:*
$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$
$$f'(x) = \lim_{h \to 0} \frac{-(x+h)^2 - (-x^2)}{h}$$
$$f'(x) = \lim_{h \to 0} \frac{-(x^2 + 2xh + h^2) + x^2}{h}$$
$$f'(x) = \lim_{h \to 0} \frac{-2xh - h^2}{h}$$
$$f'(x) = \lim_{h \to 0} \frac{-h(2x + h)}{h} = \lim_{h \to 0} -(2x + h) = -2x$$

**Example 2: Finding the slope of a perpendicular line**
Find the slope of the line perpendicular to the tangent of the graph of $f(x) = -x^2$ at $x = 2$.
*Solution:*
From Example 1, $f'(x) = -2x$.
The slope of the tangent line at $x=2$ is $m_{\text{tan}} = f'(2) = -2(2) = -4$.
The perpendicular (or normal) line has a slope that is the negative reciprocal of the tangent's slope.
$$m_{\text{perp}} = -\frac{1}{m_{\text{tan}}} = -\frac{1}{-4} = \frac{1}{4}$$

## Multiple Choice Questions

1. Which limit expression defines the derivative $f'(x)$ of a function $f$ at $x$?
    - **A)** $\lim_{h \to \infty} \frac{f(x + h) - f(x)}{h}$
    - **B)** $\lim_{h \to 0} \frac{f(x + h) - f(x)}{h}$
    - **C)** $\lim_{h \to 0} \frac{f(x + h) + f(x)}{h}$
    - **D)** $\lim_{x \to 0} \frac{f(x) - f(0)}{x}$

2. Geometrically, what does the difference quotient $\frac{f(a + h) - f(a)}{h}$ represent before taking the limit as $h \to 0$?
    - **A)** The slope of the secant line passing through $(a, f(a))$ and $(a + h, f(a + h))$
    - **B)** The slope of the tangent line at $x = a$
    - **C)** The area under the curve from $a$ to $a + h$
    - **D)** The $y$-intercept of the curve

3. Find the equation of the tangent line to the parabola $f(x) = x^2 + 1$ at the point $(2, 5)$.
    - **A)** $y = 2x + 1$
    - **B)** $y = 4x + 5$
    - **C)** $y = 4x - 3$
    - **D)** $y = -\frac{1}{4}x + \frac{11}{2}$

4. If $s(t)$ gives the position of a particle along a coordinate line at time $t$, what is the physical interpretation of the derivative $s'(t)$?
    - **A)** The average velocity over $[0, t]$
    - **B)** The instantaneous acceleration of the particle
    - **C)** The total distance traveled by the particle
    - **D)** The instantaneous velocity of the particle at time $t$

5. What is the relationship between the slope of the tangent line $m_T = f'(a)$ (assuming $f'(a) \ne 0$) and the slope of the **normal line** $m_N$ at the same point?
    - **A)** $m_N = m_T$
    - **B)** $m_N = -\frac{1}{m_T}$
    - **C)** $m_N = -m_T$
    - **D)** $m_N = \frac{1}{m_T}$

### Answer Key & Explanations

1. **B**. The derivative $f'(x)$ is the limit of the difference quotient $\frac{f(x+h) - f(x)}{h}$ as the step size $h$ approaches $0$.
2. **A**. For a nonzero increment $h$, the two points $(a, f(a))$ and $(a+h, f(a+h))$ are distinct on the curve, and the ratio $\frac{\Delta y}{\Delta x}$ is the slope of the secant line connecting them.
3. **C**. Here $f'(x) = 2x$, so at $x = 2$ the tangent slope is $m = f'(2) = 4$. Using point-slope form at $(2, 5)$: $y - 5 = 4(x - 2) \implies y = 4x - 3$.
4. **D**. Average velocity is $\frac{\Delta s}{\Delta t}$ over a finite interval; taking the limit as $\Delta t \to 0$ gives the derivative $s'(t)$, which is the instantaneous velocity at time $t$.
5. **B**. The normal line is perpendicular to the tangent line at the point of tangency, so its slope is the negative reciprocal of the tangent slope: $m_N = -1 / f'(a)$.

## References & Navigation

- **Previous Topic:** [[Continuity]]
- **Next Topic:** [[Differentiability and Continuity]]
- **Related Notes:** [[Derivative as Rate of Change and Related Rates Part 1]], [[Differentiation Rules]]
