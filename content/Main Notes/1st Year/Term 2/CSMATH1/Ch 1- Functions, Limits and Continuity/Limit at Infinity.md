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

**Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Conceptual]]

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

1. Evaluate $\lim_{x \to \infty} \frac{4x^3 - 2x + 1}{2x^3 + 5x^2 - 7}$.
    - **A)** $0$
    - **B)** $2$
    - **C)** $4$
    - **D)** $+\infty$

2. For a rational function $f(x) = \frac{P(x)}{Q(x)}$, what is $\lim_{x \to \infty} f(x)$ when the degree of the numerator $P(x)$ is strictly less than the degree of the denominator $Q(x)$?
    - **A)** $+\infty$
    - **B)** The ratio of the leading coefficients
    - **C)** $0$
    - **D)** $1$

3. Evaluate $\lim_{x \to -\infty} \frac{3x}{\sqrt{x^2 + 1}}$. (Recall that $\sqrt{x^2} = |x| = -x$ for $x < 0$.)
    - **A)** $3$
    - **B)** $-3$
    - **C)** $0$
    - **D)** $-\infty$

4. If $\lim_{x \to \infty} f(x) = -5$, what geometric feature does the graph of $y = f(x)$ possess?
    - **A)** A vertical asymptote at $x = -5$
    - **B)** A horizontal asymptote at $y = -5$
    - **C)** An $x$-intercept at $(-5, 0)$
    - **D)** A removable discontinuity at $x = -5$

5. Evaluate $\lim_{x \to \infty} \left(\sqrt{x^2 + 6x} - x\right)$.
    - **A)** $0$
    - **B)** $6$
    - **C)** $3$
    - **D)** $+\infty$

### Answer Key & Explanations

1. **B**. Divide numerator and denominator by the highest power of $x$ in the denominator ($x^3$): $\lim_{x \to \infty} \frac{4 - 2/x^2 + 1/x^3}{2 + 5/x - 7/x^3} = \frac{4}{2} = 2$.
2. **C**. When $\deg(P) < \deg(Q)$, dividing top and bottom by $x^{\deg(Q)}$ leaves only terms of the form $c/x^k$ in the numerator (which approach $0$) over a non-zero leading coefficient in the denominator, giving $0$.
3. **B**. For $x < 0$, $\sqrt{x^2 + 1} = \sqrt{x^2(1 + 1/x^2)} = |x|\sqrt{1 + 1/x^2} = -x\sqrt{1 + 1/x^2}$. Thus $\frac{3x}{-x\sqrt{1 + 1/x^2}} = \frac{-3}{\sqrt{1 + 1/x^2}} \to -3$ as $x \to -\infty$.
4. **B**. By definition, the line $y = L$ is a horizontal asymptote of $y = f(x)$ if either $\lim_{x \to \infty} f(x) = L$ or $\lim_{x \to -\infty} f(x) = L$.
5. **C**. Multiply by the conjugate $\frac{\sqrt{x^2+6x} + x}{\sqrt{x^2+6x} + x}$ to get $\frac{(x^2+6x) - x^2}{\sqrt{x^2+6x} + x} = \frac{6x}{x(\sqrt{1 + 6/x} + 1)} = \frac{6}{\sqrt{1 + 6/x} + 1} \to \frac{6}{1 + 1} = 3$.

## References & Navigation

- **Previous Topic:** [[One-Sided Limits and Infinite Limits]]
- **Next Topic:** [[Continuity]]
- **Related Notes:** [[Introduction to Limits]], [[One-Sided Limits and Infinite Limits]]
