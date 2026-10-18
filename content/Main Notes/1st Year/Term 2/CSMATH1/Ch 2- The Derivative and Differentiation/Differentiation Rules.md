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

**Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Problem Solving]]

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

1. According to the Product Rule, what is the derivative $\frac{d}{dx}[f(x)g(x)]$?
    - **A)** $f'(x)g'(x)$
    - **B)** $f'(x)g(x) + f(x)g'(x)$
    - **C)** $f'(x)g(x) - f(x)g'(x)$
    - **D)** $\frac{f'(x)}{g'(x)}$

2. Using the Quotient Rule, find $f'(x)$ for $f(x) = \frac{2x + 1}{x - 3}$.
    - **A)** $2$
    - **B)** $\frac{4x - 5}{(x - 3)^2}$
    - **C)** $\frac{-7}{(x - 3)^2}$
    - **D)** $\frac{5}{(x - 3)^2}$

3. Using the Chain Rule, what is the derivative of $y = (3x^2 - 5)^4$?
    - **A)** $4(3x^2 - 5)^3$
    - **B)** $4(6x)^3$
    - **C)** $24x(3x^2 - 5)^3$
    - **D)** $12x(3x^2 - 5)^4$

4. Given $f(1) = 3$, $f'(1) = -2$, $g(1) = 4$, and $g'(1) = 5$, what is $(f \cdot g)'(1)$?
    - **A)** $-10$
    - **B)** $7$
    - **C)** $23$
    - **D)** $-7$

5. What is the derivative of $h(x) = 4x^5 - \frac{3}{x^2} + 7\sqrt{x} - \pi^2$?
    - **A)** $20x^4 + \frac{6}{x^3} + \frac{7}{2\sqrt{x}}$
    - **B)** $20x^4 - \frac{6}{x^3} + \frac{7}{2\sqrt{x}} - 2\pi$
    - **C)** $20x^4 + \frac{3}{2x} + 7x^{-1/2}$
    - **D)** $4x^4 + \frac{6}{x^3} - 2\pi$

### Answer Key & Explanations

1. **B**. The derivative of a product is the derivative of the first times the second plus the first times the derivative of the second: $(fg)' = f'g + fg'$. It is NOT the product of the derivatives (A).
2. **C**. By the Quotient Rule $\frac{u'v - uv'}{v^2}$: $f'(x) = \frac{2(x - 3) - (2x + 1)(1)}{(x - 3)^2} = \frac{2x - 6 - 2x - 1}{(x - 3)^2} = \frac{-7}{(x - 3)^2}$.
3. **C**. Differentiate the outer power $u^4 \to 4u^3$ and multiply by the derivative of the inner function $u = 3x^2 - 5 \to u' = 6x$: $4(3x^2 - 5)^3 \cdot (6x) = 24x(3x^2 - 5)^3$.
4. **B**. By the Product Rule at $x = 1$: $f'(1)g(1) + f(1)g'(1) = (-2)(4) + (3)(5) = -8 + 15 = 7$.
5. **A**. Rewrite as $4x^5 - 3x^{-2} + 7x^{1/2} - \pi^2$. Applying the Power Rule term-by-term gives $20x^4 + 6x^{-3} + \frac{7}{2}x^{-1/2} - 0$ (since $\pi^2$ is a constant, its derivative is $0$, not $2\pi$).

## References & Navigation

- **Previous Topic:** [[Differentiability and Continuity]]
- **Next Topic:** [[Higher Order Derivatives and Derivative of Trigonometric Functions]]
- **Related Notes:** [[The Tangent Line and the Derivative]], [[Implicit Differentiation]]
