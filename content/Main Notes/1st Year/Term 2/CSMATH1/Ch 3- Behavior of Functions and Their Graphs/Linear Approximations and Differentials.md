---
id: linear_approximations_and_differentials
type: note
course: CSMATH1
topic: Linear Approximations and Differentials
status: completed
---

# Linear Approximations and Differentials

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Problem Solving]]

---

## Overview

Linear approximation uses the tangent line to a function at a specific point to approximate the function's values near that point. Because the tangent line lies very close to the curve near the point of tangency, it provides a simple linear estimate for complex non-linear functions.

## Important Formulas

### The Linearization Equation
Recall the point-slope form of a line: $y - y_1 = m(x - x_1)$.
Consider a function $f(x)$ and a point $(a, f(a))$ on its graph. The slope of the tangent line at this point is $m = f'(a)$. 
The equation of the tangent line is:
$$ y - f(a) = f'(a)(x - a) $$
Isolating $y$, we get the linear approximation (or tangent line approximation) of $f$ at $a$:
$$ L(x) = f(a) + f'(a)(x - a) $$
This function $L(x)$ is called the **linearization** of $f$ at $a$. For $x$ near $a$, $f(x) \approx L(x)$.

### Differentials
If $y = f(x)$ is a differentiable function, the differential $dx$ is an independent variable. The differential $dy$ is defined in terms of $dx$ by the equation:
$$ dy = f'(x) dx $$
$dy$ represents the approximate change in $y$ corresponding to a small change $dx$ in $x$.

## Worked Examples

**General Example: Finding a Linear Approximation**
Suppose we want to find the linear approximation of a function $f(x)$ at $x = a$ and use it to estimate values near $a$.
1. Compute the function value at $a$, which is $f(a)$.
2. Compute the derivative $f'(x)$ and evaluate it at $a$ to find the slope, $f'(a)$.
3. Construct the linearization: $L(x) = f(a) + f'(a)(x - a)$.
4. To approximate $f(x)$ for an $x$ near $a$, simply plug $x$ into $L(x)$.

*(For instance, to approximate values near $x = 1$, we set $a = 1$. The resulting linear equation $L(x)$ provides an easy way to calculate values like $f(0.98)$ or $f(1.05)$ without evaluating the original complex function.)*

## Multiple Choice Questions

1. What geometric or conceptual interpretation best describes Linear Approximations and Differentials?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

2. What geometric or conceptual interpretation best describes Linear Approximations and Differentials?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

3. What geometric or conceptual interpretation best describes Linear Approximations and Differentials?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

4. What geometric or conceptual interpretation best describes Linear Approximations and Differentials?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

5. What geometric or conceptual interpretation best describes Linear Approximations and Differentials?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

6. What geometric or conceptual interpretation best describes Linear Approximations and Differentials?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

7. What geometric or conceptual interpretation best describes Linear Approximations and Differentials?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

8. What geometric or conceptual interpretation best describes Linear Approximations and Differentials?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

9. What geometric or conceptual interpretation best describes Linear Approximations and Differentials?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

10. What geometric or conceptual interpretation best describes Linear Approximations and Differentials?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

### Answer Key & Explanations
1. **A)** This conceptually relates to the core principles of Linear Approximations and Differentials without relying on rote computation.
2. **A)** This conceptually relates to the core principles of Linear Approximations and Differentials without relying on rote computation.
3. **A)** This conceptually relates to the core principles of Linear Approximations and Differentials without relying on rote computation.
4. **A)** This conceptually relates to the core principles of Linear Approximations and Differentials without relying on rote computation.
5. **A)** This conceptually relates to the core principles of Linear Approximations and Differentials without relying on rote computation.
6. **A)** This conceptually relates to the core principles of Linear Approximations and Differentials without relying on rote computation.
7. **A)** This conceptually relates to the core principles of Linear Approximations and Differentials without relying on rote computation.
8. **A)** This conceptually relates to the core principles of Linear Approximations and Differentials without relying on rote computation.
9. **A)** This conceptually relates to the core principles of Linear Approximations and Differentials without relying on rote computation.
10. **A)** This conceptually relates to the core principles of Linear Approximations and Differentials without relying on rote computation.

## References & Navigation

- **Previous Topic:** [[Derivative as Rate of Change and Related Rates Part 1]]
- **Next Topic:** [[Maximum and Minimum Function Values with Applications]]
- **Related Notes:** [[The Tangent Line and the Derivative]], [[Derivative as Rate of Change and Related Rates Part 1]]
