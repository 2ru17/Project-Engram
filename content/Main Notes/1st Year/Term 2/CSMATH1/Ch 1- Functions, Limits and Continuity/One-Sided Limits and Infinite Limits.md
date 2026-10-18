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

**Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Problem Solving]]

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

1. Evaluate the left-hand limit $\lim_{x \to 3^-} \frac{|x - 3|}{x - 3}$.
    - **A)** $1$
    - **B)** $-1$
    - **C)** $0$
    - **D)** $-\infty$

2. What is the behavior of $\lim_{x \to 2^+} \frac{5}{x - 2}$, and what geometric feature does the graph of $f(x) = \frac{5}{x - 2}$ have at $x = 2$?
    - **A)** Equals $+\infty$; a vertical asymptote at $x = 2$
    - **B)** Equals $0$; a horizontal asymptote at $y = 2$
    - **C)** Equals $-\infty$; a removable hole at $x = 2$
    - **D)** Equals $\frac{5}{2}$; a continuous point at $x = 2$

3. Evaluate $\lim_{x \to 1} \frac{1}{(x - 1)^2}$.
    - **A)** $0$
    - **B)** $-\infty$
    - **C)** $+\infty$
    - **D)** $1$

4. For a rational function $f(x) = \frac{x - 2}{x^2 - 4}$, why does $x = 2$ NOT produce a vertical asymptote, whereas $x = -2$ DOES?
    - **A)** Because vertical asymptotes only occur at negative $x$-values
    - **B)** Because $x^2 - 4$ is only zero at $x = -2$
    - **C)** Because $f(2)$ is defined and equals $0$
    - **D)** Because the factor $(x - 2)$ cancels with the numerator, leaving a finite limit $\lim_{x \to 2} \frac{1}{x+2} = \frac{1}{4}$ (a removable hole), while as $x \to -2$ the denominator approaches $0$ with a non-zero numerator

5. If $\lim_{x \to 4^-} f(x) = -\infty$ and $\lim_{x \to 4^+} f(x) = +\infty$, which statement is true?
    - **A)** The line $y = 4$ is a horizontal asymptote
    - **B)** The line $x = 4$ is a vertical asymptote, and the two-sided limit $\lim_{x \to 4} f(x)$ does not exist
    - **C)** $\lim_{x \to 4} f(x) = 0$ because $-\infty$ and $+\infty$ cancel out
    - **D)** $f(x)$ has a removable discontinuity at $x = 4$

### Answer Key & Explanations

1. **B**. For $x < 3$ (approaching $3$ from the left), $x - 3 < 0$, so $|x - 3| = -(x - 3)$. Thus $\frac{-(x - 3)}{x - 3} = -1$ for all $x < 3$.
2. **A**. As $x \to 2^+$, $x - 2$ is a tiny positive number ($0^+$), so $\frac{5}{0^+} = +\infty$. Whenever a one-sided limit at $x = c$ is $\pm\infty$, the line $x = c$ is a vertical asymptote.
3. **C**. Whether $x$ approaches $1$ from the left or the right, $(x - 1)^2$ is strictly positive and approaches $0^+$, so $\frac{1}{(x-1)^2} \to +\infty$ from both sides.
4. **D**. Factoring the denominator gives $\frac{x - 2}{(x - 2)(x + 2)} = \frac{1}{x + 2}$ for $x \ne 2$. At $x = 2$ the limit is finite ($1/4$, removable hole), whereas at $x = -2$ we get $\frac{1}{0}$, yielding an infinite limit and a vertical asymptote.
5. **B**. A vertical asymptote at $x = c$ exists if at least one of the one-sided limits $\lim_{x \to c^\pm} f(x)$ is $+\infty$ or $-\infty$. Since the two sides diverge in opposite directions, the two-sided limit does not exist.

## References & Navigation

- **Previous Topic:** [[Definition of the Limit and Limit Theorems]]
- **Next Topic:** [[Limit at Infinity]]
- **Related Notes:** [[Introduction to Limits]], [[Limit at Infinity]]
