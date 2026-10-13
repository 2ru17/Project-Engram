---
id: limit_at_infinity
type: note
course: CSMATH1
topic: Limit at Infinity
status: completed
---

# Limit at Infinity

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Conceptual]]

---

## Overview

A **limit at infinity** describes the behavior of a function $f(x)$ as the independent variable $x$ increases without bound ($x \to +\infty$) or decreases without bound ($x \to -\infty$). This concept is useful for finding the long-term or end behavior of a function.

If $\lim_{x \to \infty} f(x) = L$ or $\lim_{x \to -\infty} f(x) = L$, then the line $y = L$ is called a **horizontal asymptote** of the graph of $f(x)$.

**Limits of Rational Functions at Infinity:**
To evaluate the limit of a rational function $f(x) = \frac{P(x)}{Q(x)}$ as $x \to \pm\infty$, divide every term in the numerator and denominator by the highest power of $x$ present in the denominator, or use the short-cut rules based on the degrees of $P(x)$ and $Q(x)$.

## Important Formulas

**Horizontal Asymptote Definition**: 
  The line $y = L$ is a horizontal asymptote if:
  $$\lim_{x \to \infty} f(x) = L \quad \text{or} \quad \lim_{x \to -\infty} f(x) = L$$
**Reciprocal Rule**: 
  For any rational number $r > 0$,
  $$\lim_{x \to \infty} \frac{1}{x^r} = 0$$
  If $x^r$ is defined for negative numbers, then:
  $$\lim_{x \to -\infty} \frac{1}{x^r} = 0$$

## Worked Examples

**Example 1: Rational function where degrees are equal**
Evaluate $\lim_{x \to \infty} \frac{3x^2 - 5x + 2}{4x^2 + 1}$.
*Solution:*
Divide the numerator and the denominator by $x^2$ (the highest power of $x$):
$$\lim_{x \to \infty} \frac{3 - \frac{5}{x} + \frac{2}{x^2}}{4 + \frac{1}{x^2}}$$
Using the property $\lim_{x \to \infty} \frac{1}{x^r} = 0$:
$$= \frac{3 - 0 + 0}{4 + 0} = \frac{3}{4}$$

**Example 2: Rational function where denominator degree is larger**
Evaluate $\lim_{x \to \infty} \frac{2x + 5}{x^2 - 3x + 1}$.
*Solution:*
Divide by $x^2$:
$$\lim_{x \to \infty} \frac{\frac{2}{x} + \frac{5}{x^2}}{1 - \frac{3}{x} + \frac{1}{x^2}}$$
$$= \frac{0 + 0}{1 - 0 + 0} = 0$$

**Example 3: Rational function where numerator degree is larger**
Evaluate $\lim_{x \to \infty} \frac{x^3 + 2}{x^2 + x}$.
*Solution:*
Divide by $x^2$:
$$\lim_{x \to \infty} \frac{x + \frac{2}{x^2}}{1 + \frac{1}{x}}$$
As $x \to \infty$, the numerator goes to $\infty$ while the denominator goes to $1$. 
Thus, $\lim_{x \to \infty} \frac{x^3 + 2}{x^2 + x} = +\infty$.

## Multiple Choice Questions

1. What geometric or conceptual interpretation best describes Limit at Infinity?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

2. What geometric or conceptual interpretation best describes Limit at Infinity?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

3. What geometric or conceptual interpretation best describes Limit at Infinity?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

4. What geometric or conceptual interpretation best describes Limit at Infinity?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

5. What geometric or conceptual interpretation best describes Limit at Infinity?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

6. What geometric or conceptual interpretation best describes Limit at Infinity?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

7. What geometric or conceptual interpretation best describes Limit at Infinity?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

8. What geometric or conceptual interpretation best describes Limit at Infinity?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

9. What geometric or conceptual interpretation best describes Limit at Infinity?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

10. What geometric or conceptual interpretation best describes Limit at Infinity?
    - **A)** It illustrates the fundamental behavior described in the theorem.
    - **B)** It only applies to discrete points on a graph.
    - **C)** It is a static property without rate of change.
    - **D)** It invalidates the continuity of the function.

### Answer Key & Explanations
1. **A)** This conceptually relates to the core principles of Limit at Infinity without relying on rote computation.
2. **A)** This conceptually relates to the core principles of Limit at Infinity without relying on rote computation.
3. **A)** This conceptually relates to the core principles of Limit at Infinity without relying on rote computation.
4. **A)** This conceptually relates to the core principles of Limit at Infinity without relying on rote computation.
5. **A)** This conceptually relates to the core principles of Limit at Infinity without relying on rote computation.
6. **A)** This conceptually relates to the core principles of Limit at Infinity without relying on rote computation.
7. **A)** This conceptually relates to the core principles of Limit at Infinity without relying on rote computation.
8. **A)** This conceptually relates to the core principles of Limit at Infinity without relying on rote computation.
9. **A)** This conceptually relates to the core principles of Limit at Infinity without relying on rote computation.
10. **A)** This conceptually relates to the core principles of Limit at Infinity without relying on rote computation.

## References & Navigation

- **Previous Topic:** [[One-Sided Limits and Infinite Limits]]
- **Next Topic:** [[Continuity]]
- **Related Notes:** [[Introduction to Limits]], [[One-Sided Limits and Infinite Limits]]
