---
id: higher_order_derivatives_and_derivative_of_trigonometric_functions
type: note
course: CSMATH1
topic: Higher Order Derivatives and Derivative of Trigonometric Functions
status: completed
---

# Higher Order Derivatives and Derivative of Trigonometric Functions

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Conceptual]]

---

## Overview

Higher order derivatives refer to the process of taking the derivative of a function multiple times. The derivative of a derivative is called the second derivative, and this pattern continues for higher orders. This section also covers the differentiation of trigonometric functions, which follow specific rules and are essential for solving problems involving periodic functions.

## Key Definitions
 **First Derivative ($f'(x)$ or $\frac{dy}{dx}$):** Represents the instantaneous rate of change of a function. **Second Derivative ($f''(x)$ or $\frac{d^2y}{dx^2}$):** Represents the rate of change of the first derivative. **Higher Order Derivatives:** Derivatives beyond the first, denoted as $f^{(n)}(x)$ for the $n$-th derivative.

## Theoretical Framework

### Derivatives of Trigonometric Functions
The fundamental derivatives of trigonometric functions are: $\frac{d}{dx} (\sin x) = \cos x$ $\frac{d}{dx} (\cos x) = -\sin x$ $\frac{d}{dx} (\tan x) = \sec^2 x$ $\frac{d}{dx} (\cot x) = -\csc^2 x$ $\frac{d}{dx} (\sec x) = \sec x \tan x$ $\frac{d}{dx} (\csc x) = -\csc x \cot x$

### Notation for Higher Order Derivatives **1st Derivative:** $y'$, $f'(x)$, $\frac{dy}{dx}$ **2nd Derivative:** $y''$, $f''(x)$, $\frac{d^2y}{dx^2}$ **3rd Derivative:** $y'''$, $f'''(x)$, $\frac{d^3y}{dx^3}$ **$n$-th Derivative:** $y^{(n)}$, $f^{(n)}(x)$, $\frac{d^ny}{dx^n}$

## Multiple Choice Questions

1. What is the derivative $\frac{d}{dx}[\sec(x)]$?
    - **A)** $-\csc(x)\cot(x)$
    - **B)** $\sec^2(x)$
    - **C)** $\sec(x)\tan(x)$
    - **D)** $-\sin(x)$

2. If $f(x) = \sin(x)$, what is the 4th derivative $f^{(4)}(x)$?
    - **A)** $\cos(x)$
    - **B)** $-\sin(x)$
    - **C)** $-\cos(x)$
    - **D)** $\sin(x)$

3. Evaluate the fundamental trigonometric limit $\lim_{x \to 0} \frac{\sin(5x)}{2x}$.
    - **A)** $1$
    - **B)** $0$
    - **C)** $\frac{5}{2}$
    - **D)** $\frac{2}{5}$

4. If the position of an object at time $t$ is $s(t) = t^3 - 6t^2 + 9t$, at what time $t$ is its **acceleration** $a(t) = s''(t)$ equal to zero?
    - **A)** $t = 1$
    - **B)** $t = 2$
    - **C)** $t = 3$
    - **D)** $t = 0$

5. Using the Chain Rule, find $\frac{d}{dx}[\cos(x^3)]$.
    - **A)** $-\sin(3x^2)$
    - **B)** $3x^2 \sin(x^3)$
    - **C)** $-3x^2 \sin(x^3)$
    - **D)** $-\sin(x^3)$

### Answer Key & Explanations

1. **C**. Writing $\sec(x) = (\cos x)^{-1}$ and applying the Chain Rule gives $-(\cos x)^{-2}(-\sin x) = \frac{1}{\cos x}\cdot\frac{\sin x}{\cos x} = \sec(x)\tan(x)$.
2. **D**. Differentiating $\sin(x)$ cycling four times gives: $f'(x) = \cos(x)$, $f''(x) = -\sin(x)$, $f'''(x) = -\cos(x)$, and $f^{(4)}(x) = \sin(x)$. The derivatives of $\sin(x)$ and $\cos(x)$ repeat every 4 orders.
3. **C**. Rewrite as $\frac{5}{2} \lim_{x \to 0} \frac{\sin(5x)}{5x}$. Since $\lim_{u \to 0} \frac{\sin u}{u} = 1$ with $u = 5x$, the limit evaluates to $\frac{5}{2}(1) = \frac{5}{2}$.
4. **B**. Velocity is $v(t) = s'(t) = 3t^2 - 12t + 9$, and acceleration is $a(t) = s''(t) = 6t - 12$. Setting $6t - 12 = 0$ gives $t = 2$.
5. **C**. The derivative of the outer function $\cos(u)$ is $-\sin(u)$, multiplied by the derivative of the inner function $u = x^3$ ($u' = 3x^2$), yielding $-3x^2 \sin(x^3)$.

## References & Navigation

- **Previous Topic:** [[Differentiation Rules]]
- **Next Topic:** [[Implicit Differentiation]]
- **Related Notes:** [[Differentiation Rules]], [[The Tangent Line and the Derivative]]
