---
id: differentiability_and_continuity
type: note
course: CSMATH1
topic: Differentiability and Continuity
status: completed
---

# Differentiability and Continuity

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Problem Solving]]

---

## Overview

### Differentiability
A function $f(x)$ is **differentiable** at a point $x=c$ if its derivative $f'(c)$ exists. This means the limit:
$$\lim_{h \to 0} \frac{f(c+h) - f(c)}{h}$$
must exist. Graphically, this means the function has a well-defined, non-vertical tangent line at the point. A function is differentiable on an interval if it is differentiable at every point in that interval.

### Differentiability Implies Continuity
One of the most important theorems in calculus states that **if a function is differentiable at a point, then it must be continuous at that point**. The existence of a derivative requires the function to be continuous. 
However, the converse is **not** true: **Continuity does not imply differentiability.** A function can be continuous at a point but fail to be differentiable there.

### When does a function fail to be differentiable?
A function $f(x)$ is not differentiable at a point if its graph has any of the following features:
1. **A Discontinuity**: Jump, removable, or infinite discontinuity. If it's not continuous, it cannot be differentiable.
2. **A Sharp Corner or Cusp**: The slope of the curve approaches different values from the left and the right (e.g., the absolute value function $f(x) = |x|$ at $x=0$).
3. **A Vertical Tangent**: The curve goes straight up or down, making the slope undefined (approaching infinity).

## Important Formulas

**Differentiability Condition**: $f'(c)$ exists if and only if $\lim_{h \to 0} \frac{f(c+h) - f(c)}{h} = L$ for some real number $L$.

## Worked Examples

**Example 1: Continuous but not Differentiable**
Consider the absolute value function $f(x) = |x|$. 
*Continuity*: The function is continuous everywhere because its graph can be drawn without lifting the pencil.
*Differentiability*: At $x = 0$, the function comes to a sharp corner.
The left-hand derivative (slope for $x < 0$) is $-1$.
The right-hand derivative (slope for $x > 0$) is $1$.
Because the limits from the left and right are different, the derivative at $x = 0$ does not exist. Thus, $f(x) = |x|$ is continuous but not differentiable at $x=0$.

## Multiple Choice Questions

1. Which of the following statements correctly describes the relationship between differentiability and continuity at $x = c$?
    - **A)** Continuity at $x = c$ guarantees differentiability at $x = c$
    - **B)** Differentiability at $x = c$ guarantees continuity at $x = c$, but continuity does NOT guarantee differentiability
    - **C)** Differentiability and continuity are completely independent properties
    - **D)** A function can be differentiable at a jump discontinuity

2. Why does $f(x) = |x|$ fail to be differentiable at $x = 0$, even though it is continuous there?
    - **A)** Because the left-hand derivative is $-1$ and the right-hand derivative is $+1$, creating a sharp corner at $x = 0$
    - **B)** Because $f(0)$ is undefined
    - **C)** Because the tangent line at $x = 0$ is vertical
    - **D)** Because $|x|$ oscillates infinitely near $0$

3. Why is $f(x) = x^{1/3}$ not differentiable at $x = 0$?
    - **A)** It has a jump discontinuity at $x = 0$
    - **B)** The left-hand limit and right-hand limit of $f(x)$ disagree at $x = 0$
    - **C)** Its derivative $f'(x) = \frac{1}{3x^{2/3}} \to +\infty$ as $x \to 0$, meaning the graph has a vertical tangent line at $x = 0$
    - **D)** Cube roots are not defined for negative numbers

4. Which of the following is the contrapositive of the theorem "If $f$ is differentiable at $c$, then $f$ is continuous at $c$"?
    - **A)** If $f$ is continuous at $c$, then $f$ is differentiable at $c$
    - **B)** If $f$ is NOT differentiable at $c$, then $f$ is NOT continuous at $c$
    - **C)** Every continuous function has a derivative everywhere
    - **D)** If $f$ is NOT continuous at $c$, then $f$ is NOT differentiable at $c$

5. For the function $f(x) = x^{2/3}$, what geometric feature causes non-differentiability at $x = 0$?
    - **A)** A horizontal asymptote
    - **B)** A cusp, where the secant slope approaches $-\infty$ from the left and $+\infty$ from the right
    - **C)** A removable hole at the origin
    - **D)** A jump of size $2$

### Answer Key & Explanations

1. **B**. Every differentiable function at $c$ must be continuous at $c$ ($\lim_{x \to c} [f(x) - f(c)] = \lim_{x \to c} \frac{f(x)-f(c)}{x-c}(x-c) = f'(c)\cdot 0 = 0$). However, functions with sharp corners (like $|x|$) are continuous without being differentiable.
2. **A**. For $x < 0$, $\frac{|x| - 0}{x - 0} = \frac{-x}{x} = -1$; for $x > 0$, $\frac{|x|}{x} = +1$. Since the one-sided derivatives disagree ($-1 \ne +1$), $f'(0)$ does not exist.
3. **C**. The function $f(x) = x^{1/3}$ is continuous at $0$, but $\lim_{h \to 0} \frac{h^{1/3}}{h} = \lim_{h \to 0} \frac{1}{h^{2/3}} = +\infty$. A vertical tangent line has undefined (infinite) slope, so $f$ is not differentiable at $0$.
4. **D**. The logical contrapositive of $P \implies Q$ is $\neg Q \implies \neg P$: if $f$ fails to be continuous at $c$, it automatically fails to be differentiable at $c$.
5. **B**. Since $f'(x) = \frac{2}{3x^{1/3}}$, as $x \to 0^-$ the slope goes to $-\infty$ and as $x \to 0^+$ the slope goes to $+\infty$, forming a sharp cusp at $(0, 0)$.

## References & Navigation

- **Previous Topic:** [[The Tangent Line and the Derivative]]
- **Next Topic:** [[Differentiation Rules]]
- **Related Notes:** [[Continuity]], [[The Tangent Line and the Derivative]]
