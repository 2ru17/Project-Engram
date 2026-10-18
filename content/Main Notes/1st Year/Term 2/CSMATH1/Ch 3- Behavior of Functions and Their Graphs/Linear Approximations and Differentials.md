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

**Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Problem Solving]]

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

1. What is the formula for the linearization (linear approximation) $L(x)$ of a differentiable function $f(x)$ at $x = a$?
    - **A)** $L(x) = f(a) + f'(x)(x - a)$
    - **B)** $L(x) = f(a) + f'(a)(x - a)$
    - **C)** $L(x) = f'(a) + f(a)(x - a)$
    - **D)** $L(x) = \frac{f(x) - f(a)}{x - a}$

2. Find the linear approximation $L(x)$ of $f(x) = \sqrt{x}$ at $a = 9$, and use it to approximate $\sqrt{9.06}$.
    - **A)** $3.01$
    - **B)** $3.02$
    - **C)** $3.06$
    - **D)** $3.005$

3. If $y = f(x)$, how does the **differential** $dy = f'(x)\,dx$ differ conceptually from the actual increment $\Delta y = f(x + \Delta x) - f(x)$?
    - **A)** $dy$ is the exact change along the curve, whereas $\Delta y$ is the change along the tangent line
    - **B)** $dy$ and $\Delta y$ are always strictly equal for every nonlinear function
    - **C)** $dy$ is the rise along the tangent line for a run $dx = \Delta x$, whereas $\Delta y$ is the exact vertical change of the curve itself
    - **D)** $dy$ is only defined when $\Delta x = 0$

4. The side of a cube is measured to be $s = 10\text{ cm}$ with a maximum possible error of $ds = \pm 0.05\text{ cm}$. Using differentials, what is the approximated maximum error $dV$ in the computed volume $V = s^3$?
    - **A)** $\pm 1.5\text{ cm}^3$
    - **B)** $\pm 30\text{ cm}^3$
    - **C)** $\pm 0.5\text{ cm}^3$
    - **D)** $\pm 15\text{ cm}^3$

5. For a function whose graph is concave upward ($f''(x) > 0$) near $x = a$, how does the linear approximation $L(x)$ compare to the true value $f(x)$?
    - **A)** $L(x)$ is an overestimate ($L(x) > f(x)$) because the tangent line lies above the curve
    - **B)** $L(x)$ is an underestimate ($L(x) \le f(x)$) because the tangent line lies below a concave-up curve
    - **C)** $L(x)$ alternates between overestimating and underestimating
    - **D)** Concavity has no relation to the error of linear approximation

### Answer Key & Explanations

1. **B**. The linearization $L(x) = f(a) + f'(a)(x - a)$ is simply the equation of the tangent line to $y = f(x)$ at the anchor point $(a, f(a))$.
2. **A**. For $f(x) = \sqrt{x}$, $f(9) = 3$ and $f'(x) = \frac{1}{2\sqrt{x}} \implies f'(9) = \frac{1}{6}$. Thus $L(x) = 3 + \frac{1}{6}(x - 9)$, so $L(9.06) = 3 + \frac{0.06}{6} = 3 + 0.01 = 3.01$.
3. **C**. The differential $dy = f'(x)\,dx$ measures how much the tangent line rises or falls over $\Delta x$, providing a fast linear estimate of the true function change $\Delta y$.
4. **D**. Since $V = s^3$, the differential is $dV = 3s^2\,ds$. Substituting $s = 10$ and $ds = \pm 0.05$ gives $dV = 3(10^2)(\pm 0.05) = 300(\pm 0.05) = \pm 15\text{ cm}^3$.
5. **B**. When $f''(x) > 0$, the graph bends upward away from its tangent line, so the tangent line $y = L(x)$ sits underneath the graph of $f(x)$, producing an underestimate.

## References & Navigation

- **Previous Topic:** [[Derivative as Rate of Change and Related Rates Part 1]]
- **Next Topic:** [[Maximum and Minimum Function Values with Applications]]
- **Related Notes:** [[The Tangent Line and the Derivative]], [[Derivative as Rate of Change and Related Rates Part 1]]
