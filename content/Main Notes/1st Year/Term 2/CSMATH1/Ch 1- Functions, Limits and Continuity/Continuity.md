---
id: continuity
type: note
course: CSMATH1
topic: "Continuity"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Conceptual]] #[[Continuity]]

---

## Overview
Continuity is a foundational concept in calculus that mathematically formalizes the idea of an unbroken, continuous curve. In the context of computer science, continuous functions are essential when modeling physical systems, processing signals, and evaluating algorithms that operate over continuous domains (like machine learning loss functions). A function is considered continuous if there are no abrupt jumps, gaps, or undefined points in its trajectory. When analyzing continuous functions, we look at the behavior of limits as values approach a specific point, ensuring the path smoothly connects from one side to the other.

## Key Definitions
- **Continuity at a point:** A function is unbroken at a specific input value.
- **Removable Discontinuity:** A "hole" in the function where the limit exists, but the function value is either undefined or defined differently.
- **Essential Discontinuity:** A point where the limit does not exist, often due to a vertical asymptote (infinite discontinuity) or a sudden jump (jump discontinuity).
- **Left-Hand/Right-Hand Continuity:** Continuity achieved when approaching a point strictly from values less than or greater than the point, respectively.

## Theoretical Framework / Core Concepts
A function $f(x)$ is continuous at a number $c$ if it seamlessly connects at that point. Mathematically, this requires three strict conditions to be met simultaneously:
1. The function must be defined at $c$, meaning $c$ is within the domain of $f$ ($f(c)$ exists).
2. The limit of the function as $x$ approaches $c$ must exist ($\lim_{x \to c} f(x)$ exists).
3. The limit as $x$ approaches $c$ must exactly equal the function's actual value at $c$ ($\lim_{x \to c} f(x) = f(c)$).

Failure to meet any of these conditions results in a discontinuity. We categorize these discontinuities to better understand the function's behavior. A removable discontinuity allows us to "patch" the hole by redefining the function at that single point. An essential discontinuity, however, represents a fundamental break in the function's path, such as an infinite vertical drop or a sudden shift in y-values.

When dealing with more complex systems, we often combine functions. The Composite Function Theorem provides a powerful tool: if a function $g$ is continuous at a point $c$, and another function $f$ is continuous at the output $g(c)$, then their composition $(f \circ g)(x) = f(g(x))$ is also continuous at $c$. This theorem guarantees that smooth functions nested within smooth functions produce a smooth result. 

Furthermore, we evaluate continuity over intervals. A function is continuous on an open interval $(a, b)$ if it is continuous at every point within. For a closed interval $[a, b]$, we additionally require right-hand continuity at the starting point $a$ and left-hand continuity at the endpoint $b$.

## Worked Examples / Protocol Walkthroughs / Calculations

**Example 1: Identifying and Removing a Discontinuity**
Consider the function $f(x) = \frac{x^2 - 4}{x - 2}$.
*Step 1:* Observe that at $x = 2$, the denominator becomes zero. Thus, $f(2)$ is undefined, and the function is discontinuous at $x = 2$.
*Step 2:* Evaluate the limit as $x \to 2$ to determine the type of discontinuity. 
$$\lim_{x \to 2} \frac{x^2 - 4}{x - 2} = \lim_{x \to 2} \frac{(x - 2)(x + 2)}{x - 2} = \lim_{x \to 2} (x + 2) = 4$$
*Step 3:* Since the limit exists (it equals 4) but the function is undefined at that point, this is a **removable discontinuity**. We could redefine $f(2) = 4$ to make the function continuous.

**Example 2: Applying the Composite Function Theorem**
Let's evaluate the limit of a nested trigonometric function: $\lim_{x \to \frac{\pi}{2}} \cos\left(x - \frac{\pi}{2}\right)$.
*Step 1:* Identify the inner function $g(x) = x - \frac{\pi}{2}$ and the outer function $f(x) = \cos(x)$.
*Step 2:* Evaluate the limit of the inner function: $\lim_{x \to \frac{\pi}{2}} \left(x - \frac{\pi}{2}\right) = 0$.
*Step 3:* Because the outer function $\cos(x)$ is continuous at the resulting limit value (0), we can directly substitute:
$$\cos(0) = 1$$
The limit evaluates to 1, demonstrating continuous behavior at this composite junction.

## Summary & Key Takeaways
- Continuity guarantees that a function's graph has no breaks or holes at a given point or interval.
- Three conditions must be met for continuity at a point: the function is defined, the limit exists, and they are equal.
- Discontinuities are classified as removable (can be patched) or essential (cannot be patched, like jumps or asymptotes).
- The Composite Function Theorem states that the composition of continuous functions yields a continuous function.

## Multiple Choice Questions

1. Which three conditions must ALL hold for a function $f(x)$ to be continuous at $x = c$?
    - **A)** $f(c) > 0$, $\lim_{x \to c} f(x) > 0$, and $f'(c)$ exists
    - **B)** $f(c)$ is defined, $\lim_{x \to c} f(x)$ exists, and $\lim_{x \to c} f(x) = f(c)$
    - **C)** $f(x)$ is defined for all real numbers, is monotonic, and has no roots
    - **D)** $\lim_{x \to c^-} f(x) = 0$ and $\lim_{x \to c^+} f(x) = 0$

2. For $f(x) = \frac{x^2 - 4}{x - 2}$ when $x \ne 2$, what value must be assigned to $f(2)$ to remove the discontinuity at $x = 2$?
    - **A)** $4$
    - **B)** $2$
    - **C)** $0$
    - **D)** The discontinuity is essential and cannot be removed

3. What type of discontinuity occurs at $x = c$ when $\lim_{x \to c^-} f(x) = 2$ and $\lim_{x \to c^+} f(x) = 7$?
    - **A)** Removable discontinuity
    - **B)** Infinite discontinuity
    - **C)** Jump (essential) discontinuity
    - **D)** Oscillating discontinuity

4. According to the Intermediate Value Theorem (IVT), if $f$ is continuous on the closed interval $[a, b]$ and $N$ is any number strictly between $f(a)$ and $f(b)$, then:
    - **A)** $f(x)$ must be differentiable on $(a, b)$
    - **B)** $N$ must be the average value $\frac{f(a) + f(b)}{2}$
    - **C)** $f(x)$ is strictly increasing on $[a, b]$
    - **D)** There exists at least one number $c \in (a, b)$ such that $f(c) = N$

5. Which value of the constant $k$ makes the piecewise function $f(x) = \begin{cases} kx^2, & x \le 2 \\ 2x + k, & x > 2 \end{cases}$ continuous at $x = 2$?
    - **A)** $k = 1$
    - **B)** $k = \frac{4}{3}$
    - **C)** $k = 2$
    - **D)** $k = 4$

### Answer Key & Explanations

1. **B**. Continuity at $x = c$ requires that there is no hole or jump: the point $f(c)$ exists, the two-sided limit $\lim_{x \to c} f(x)$ exists, and the limit equals the function value.
2. **A**. Since $\lim_{x \to 2} \frac{(x-2)(x+2)}{x-2} = \lim_{x \to 2} (x + 2) = 4$, defining $f(2) = 4$ makes $\lim_{x \to 2} f(x) = f(2)$, patching the removable hole.
3. **C**. When both one-sided limits exist and are finite but unequal ($\lim_{x \to c^-} f(x) \ne \lim_{x \to c^+} f(x)$), the graph jumps vertically at $x = c$, which is a non-removable jump discontinuity.
4. **D**. Because a continuous curve on $[a, b]$ has no breaks, it cannot pass from height $f(a)$ to height $f(b)$ without crossing every intermediate horizontal line $y = N$ at some $c \in (a, b)$.
5. **B**. For continuity at $x = 2$, set the left-hand limit equal to the right-hand limit: $\lim_{x \to 2^-} kx^2 = 4k$ and $\lim_{x \to 2^+} (2x + k) = 4 + k$. Solving $4k = 4 + k$ gives $3k = 4 \implies k = \frac{4}{3}$.

## References & Navigation

- **Previous Topic:** [[Limit at Infinity]]
- **Next Topic:** [[The Tangent Line and the Derivative]]
- **Related Notes:** [[Differentiability and Continuity]], [[Definition of the Limit and Limit Theorems]]
