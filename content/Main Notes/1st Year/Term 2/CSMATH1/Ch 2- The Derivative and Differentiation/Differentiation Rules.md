---
id: differentiation_rules
type: note
course: CSMATH1
topic: Differentiation Rules
status: completed
---

# Differentiation Rules

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Problem Solving]]

---

## Overview

Calculating derivatives using the limit definition can be tedious. Instead, we use established **differentiation rules** to compute derivatives more efficiently.

1. **Constant Rule**: The derivative of a constant function is zero.
2. **Power Rule**: To differentiate $x^n$, bring down the exponent and subtract one from the power.
3. **Constant Multiple Rule**: A constant can be factored out of the derivative.
4. **Sum and Difference Rule**: The derivative of a sum or difference is the sum or difference of the derivatives.
5. **Product Rule**: To differentiate the product of two functions $u$ and $v$, use "the first times the derivative of the second, plus the second times the derivative of the first". 
6. **Quotient Rule**: To differentiate the quotient $\frac{u}{v}$, use "low d-high minus high d-low, all over low squared".
7. **Chain Rule**: Used for differentiating composite functions. Multiply the derivative of the outer function (evaluated at the inner function) by the derivative of the inner function.

## Important Formulas

Let $u$ and $v$ be differentiable functions of $x$, and $c$ and $n$ be real numbers. **Constant Rule**: $\frac{d}{dx} [c] = 0$ **Power Rule**: $\frac{d}{dx} [x^n] = n x^{n-1}$ **Constant Multiple Rule**: $\frac{d}{dx} [c \cdot u] = c \cdot u'$ **Sum Rule**: $\frac{d}{dx} [u + v] = u' + v'$ **Product Rule**: $\frac{d}{dx} [u \cdot v] = u \cdot v' + v \cdot u'$ **Quotient Rule**: $\frac{d}{dx} \left[ \frac{u}{v} \right] = \frac{v \cdot u' - u \cdot v'}{v^2}$ **Chain Rule**: $\frac{d}{dx} [f(g(x))] = f'(g(x)) \cdot g'(x)$ or $\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$ **General Power Rule** (Chain Rule specific to powers): $\frac{d}{dx} [u^n] = n u^{n-1} \cdot u'$

## Worked Examples

**Example 1: Basic Power and Sum Rules**
Find the derivative of $f(x) = 2 + 5x - 8x^3$.
*Solution:*
$f'(x) = \frac{d}{dx}[2] + \frac{d}{dx}[5x] - \frac{d}{dx}[8x^3]$
$f'(x) = 0 + 5 - 8(3x^2) = 5 - 24x^2$

**Example 2: Fractional Exponents**
Find the derivative of $f(x) = x^2 - 3x - 4\sqrt{x}$.
*Solution:*
Rewrite with rational exponents: $f(x) = x^2 - 3x - 4x^{1/2}$
$f'(x) = 2x - 3 - 4\left(\frac{1}{2}\right)x^{-1/2} = 2x - 3 - \frac{2}{\sqrt{x}}$

**Example 3: Product Rule**
Find the derivative of $f(x) = (x^3 - 4x)(2x^2 + 1)$.
*Solution:*
Let $u = x^3 - 4x$ and $v = 2x^2 + 1$. Then $u' = 3x^2 - 4$ and $v' = 4x$.
$f'(x) = u \cdot v' + v \cdot u' = (x^3 - 4x)(4x) + (2x^2 + 1)(3x^2 - 4)$
$f'(x) = 4x^4 - 16x^2 + 6x^4 - 8x^2 + 3x^2 - 4 = 10x^4 - 21x^2 - 4$

**Example 4: Quotient Rule**
Find the derivative of $y = \frac{3x - 2}{4 - x}$.
*Solution:*
Let $u = 3x - 2$ ($u' = 3$) and $v = 4 - x$ ($v' = -1$).
$y' = \frac{v \cdot u' - u \cdot v'}{v^2} = \frac{(4 - x)(3) - (3x - 2)(-1)}{(4 - x)^2}$
$y' = \frac{12 - 3x + 3x - 2}{(4 - x)^2} = \frac{10}{(4 - x)^2}$

**Example 5: Chain Rule**
Find the derivative of $f(x) = (x^2 + 2x)^4$.
*Solution:*
Using the general power rule: let $u = x^2 + 2x$, so $u' = 2x + 2$.
$f'(x) = 4(x^2 + 2x)^3 \cdot (2x + 2)$
$f'(x) = 8(x + 1)(x^2 + 2x)^3$
Factoring $x$ from the inner term: $f'(x) = 8(x+1)(x(x+2))^3 = 8x^3(x+1)(x+2)^3$

## Multiple Choice Questions

1. What geometric or conceptual interpretation best describes Differentiation Rules?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

2. What geometric or conceptual interpretation best describes Differentiation Rules?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

3. What geometric or conceptual interpretation best describes Differentiation Rules?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

4. What geometric or conceptual interpretation best describes Differentiation Rules?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

5. What geometric or conceptual interpretation best describes Differentiation Rules?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

6. What geometric or conceptual interpretation best describes Differentiation Rules?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

7. What geometric or conceptual interpretation best describes Differentiation Rules?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

8. What geometric or conceptual interpretation best describes Differentiation Rules?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

9. What geometric or conceptual interpretation best describes Differentiation Rules?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

10. What geometric or conceptual interpretation best describes Differentiation Rules?
- **A)** It illustrates the fundamental behavior described in the theorem.
- **B)** It only applies to discrete points on a graph.
- **C)** It is a static property without rate of change.
- **D)** It invalidates the continuity of the function.

### Answer Key & Explanations
1. **A)** This conceptually relates to the core principles of Differentiation Rules without relying on rote computation.
2. **A)** This conceptually relates to the core principles of Differentiation Rules without relying on rote computation.
3. **A)** This conceptually relates to the core principles of Differentiation Rules without relying on rote computation.
4. **A)** This conceptually relates to the core principles of Differentiation Rules without relying on rote computation.
5. **A)** This conceptually relates to the core principles of Differentiation Rules without relying on rote computation.
6. **A)** This conceptually relates to the core principles of Differentiation Rules without relying on rote computation.
7. **A)** This conceptually relates to the core principles of Differentiation Rules without relying on rote computation.
8. **A)** This conceptually relates to the core principles of Differentiation Rules without relying on rote computation.
9. **A)** This conceptually relates to the core principles of Differentiation Rules without relying on rote computation.
10. **A)** This conceptually relates to the core principles of Differentiation Rules without relying on rote computation.

## References & Navigation

- **Previous Topic:** [[Differentiability and Continuity]]
- **Next Topic:** [[Higher Order Derivatives and Derivative of Trigonometric Functions]]
- **Related Notes:** [[The Tangent Line and the Derivative]], [[Implicit Differentiation]]
