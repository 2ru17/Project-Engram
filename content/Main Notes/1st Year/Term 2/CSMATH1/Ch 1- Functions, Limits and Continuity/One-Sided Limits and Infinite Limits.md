---
id: one-sided_limits_and_infinite_limits
type: note
course: CSMATH1
topic: One-Sided Limits and Infinite Limits
status: completed
---

# One-Sided Limits and Infinite Limits

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Problem Solving]]

---

## Overview

### One-Sided Limits
A **one-sided limit** restricts the approach of $x$ to a specific side (either left or right) of the value $c$. **Left-hand limit**: The value $f(x)$ approaches as $x$ gets closer to $c$ from values less than $c$. Denoted as $\lim_{x \to c^-} f(x) = L$. **Right-hand limit**: The value $f(x)$ approaches as $x$ gets closer to $c$ from values greater than $c$. Denoted as $\lim_{x \to c^+} f(x) = L$.
A two-sided limit $\lim_{x \to c} f(x)$ exists if and only if both the left-hand and right-hand limits exist and are equal.

### Infinite Limits
An **infinite limit** occurs when the function values increase or decrease without bound as $x$ approaches $c$. If $f(x)$ increases without bound, we write $\lim_{x \to c} f(x) = +\infty$. If $f(x)$ decreases without bound, we write $\lim_{x \to c} f(x) = -\infty$.

Infinite limits typically indicate the presence of a **vertical asymptote** at $x=c$. If $f(x)$ is a rational function $\frac{p(x)}{q(x)}$ where $q(c)=0$ and $p(c) \neq 0$, the function will have an infinite limit at $c$.

## Important Formulas
 **Right-Hand Limit**: $\lim_{x \to c^+} f(x)$ **Left-Hand Limit**: $\lim_{x \to c^-} f(x)$ **Vertical Asymptote**: The line $x = c$ is a vertical asymptote of $f$ if at least one of the following is true:
  $$\lim_{x \to c^-} f(x) = \pm \infty$$
  $$\lim_{x \to c^+} f(x) = \pm \infty$$

## Worked Examples

**Example 1: Left and Right-Hand Limits**
Determine the one-sided limits of $f(x) = \frac{|x - 2|}{x - 2}$ as $x \to 2$.
*Solution:*
For $x > 2$, $|x - 2| = x - 2$, so $f(x) = \frac{x - 2}{x - 2} = 1$. Thus, $\lim_{x \to 2^+} f(x) = 1$.
For $x < 2$, $|x - 2| = -(x - 2)$, so $f(x) = \frac{-(x - 2)}{x - 2} = -1$. Thus, $\lim_{x \to 2^-} f(x) = -1$.

**Example 2: Infinite Limits**
Investigate the limit of $f(x) = \frac{1}{x^2}$ as $x \to 0$.
*Solution:*
As $x$ approaches $0$ from either the left or the right, $x^2$ becomes a very small positive number. 
Therefore, $\frac{1}{x^2}$ becomes an arbitrarily large positive number.
$$\lim_{x \to 0^-} \frac{1}{x^2} = +\infty$$
$$\lim_{x \to 0^+} \frac{1}{x^2} = +\infty$$
Thus, $\lim_{x \to 0} \frac{1}{x^2} = +\infty$. The line $x=0$ (the y-axis) is a vertical asymptote.

## Multiple Choice Questions

1. What geometric or conceptual interpretation best describes One-Sided Limits and Infinite Limits?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

2. What geometric or conceptual interpretation best describes One-Sided Limits and Infinite Limits?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

3. What geometric or conceptual interpretation best describes One-Sided Limits and Infinite Limits?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

4. What geometric or conceptual interpretation best describes One-Sided Limits and Infinite Limits?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

5. What geometric or conceptual interpretation best describes One-Sided Limits and Infinite Limits?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

6. What geometric or conceptual interpretation best describes One-Sided Limits and Infinite Limits?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

7. What geometric or conceptual interpretation best describes One-Sided Limits and Infinite Limits?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

8. What geometric or conceptual interpretation best describes One-Sided Limits and Infinite Limits?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

9. What geometric or conceptual interpretation best describes One-Sided Limits and Infinite Limits?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

10. What geometric or conceptual interpretation best describes One-Sided Limits and Infinite Limits?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

### Answer Key & Explanations
1. **A)** This conceptually relates to the core principles of One-Sided Limits and Infinite Limits without relying on rote computation.
2. **A)** This conceptually relates to the core principles of One-Sided Limits and Infinite Limits without relying on rote computation.
3. **A)** This conceptually relates to the core principles of One-Sided Limits and Infinite Limits without relying on rote computation.
4. **A)** This conceptually relates to the core principles of One-Sided Limits and Infinite Limits without relying on rote computation.
5. **A)** This conceptually relates to the core principles of One-Sided Limits and Infinite Limits without relying on rote computation.
6. **A)** This conceptually relates to the core principles of One-Sided Limits and Infinite Limits without relying on rote computation.
7. **A)** This conceptually relates to the core principles of One-Sided Limits and Infinite Limits without relying on rote computation.
8. **A)** This conceptually relates to the core principles of One-Sided Limits and Infinite Limits without relying on rote computation.
9. **A)** This conceptually relates to the core principles of One-Sided Limits and Infinite Limits without relying on rote computation.
10. **A)** This conceptually relates to the core principles of One-Sided Limits and Infinite Limits without relying on rote computation.

## References & Navigation

- **Previous Topic:** [[Definition of the Limit and Limit Theorems]]
- **Next Topic:** [[Limit at Infinity]]
- **Related Notes:** [[Introduction to Limits]], [[Limit at Infinity]]
