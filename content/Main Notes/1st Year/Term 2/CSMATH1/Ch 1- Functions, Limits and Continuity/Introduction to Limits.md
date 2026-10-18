---
id: introduction_to_limits
type: note
course: CSMATH1
topic: Introduction to Limits
status: completed
---

# Introduction to Limits

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSMATH1]] #[[Problem Solving]]

---

## Overview

The concept of a limit is fundamental to calculus. It describes the value that a function approaches as the input approaches a certain value.

If $f(x)$ becomes arbitrarily close to a unique number $L$ as $x$ approaches $c$ from both sides, then we say that the limit of $f(x)$ as $x$ approaches $c$ is $L$. This is written as:
$$\lim_{x \to c} f(x) = L$$

Limits can be investigated using numerical methods (tables of values) or graphical methods (looking at the graph of $y=f(x)$). 

**Key Considerations:** The function does not necessarily need to be defined at $x = c$ for the limit to exist. For a limit to exist at a point, the left-hand limit and right-hand limit must exist and be equal. If the function approaches different values from the left and right, the limit **does not exist (DNE)**. Limits that lead to division by zero (e.g., evaluating $\frac{1}{0}$) often indicate vertical asymptotes or infinite limits.

## Important Formulas
 **General Limit Notation**: 
  $$\lim_{x \to c} f(x) = L$$ **Left-Hand Limit**: 
  $$\lim_{x \to c^-} f(x) = L$$ **Right-Hand Limit**: 
  $$\lim_{x \to c^+} f(x) = L$$ **Existence of Limit**: 
  $\lim_{x \to c} f(x) = L$ if and only if $\lim_{x \to c^-} f(x) = L$ and $\lim_{x \to c^+} f(x) = L$.

## Worked Examples

**Example 1: Investigating a limit using a table of values**
Consider $\lim_{x \to 2} (1 + 3x)$.
Approaching $x=2$ from the left (e.g., $1.9, 1.99, 1.999$) and from the right (e.g., $2.1, 2.01, 2.001$), we observe the values of $f(x)$:
As $x \to 2^-$, $f(x) \to 7$.
As $x \to 2^+$, $f(x) \to 7$.
Since both approach 7, we conclude $\lim_{x \to 2} (1 + 3x) = 7$.

**Example 2: A limit that Does Not Exist (DNE)**
Investigate $\lim_{x \to 4} f(x)$ where $f(x)$ approaches 5 from the left and approaches 3 from the right.
Since the left-hand limit is $5$ and the right-hand limit is $3$, they are not equal. 
Therefore, the limit does not exist (DNE).
$$\lim_{x \to 4^-} f(x) = 5$$
$$\lim_{x \to 4^+} f(x) = 3$$
$$\lim_{x \to 4} f(x) \text{ DNE}$$

## Multiple Choice Questions

1. What does the limit statement $\lim_{x \to c} f(x) = L$ mean intuitively?
    - **A)** The value of the function at $x = c$ must equal $L$, regardless of nearby points
    - **B)** As $x$ gets arbitrarily close to $c$ from both sides (with $x \ne c$), $f(x)$ gets arbitrarily close to the single real number $L$
    - **C)** The function $f(x)$ is guaranteed to be continuous everywhere on $\mathbb{R}$
    - **D)** $f(x)$ never reaches $L$ for any value of $x$

2. Under what condition does the two-sided limit $\lim_{x \to c} f(x)$ exist?
    - **A)** If and only if both the left-hand limit $\lim_{x \to c^-} f(x)$ and the right-hand limit $\lim_{x \to c^+} f(x)$ exist and are equal to the same finite number $L$
    - **B)** Whenever $f(c)$ is a defined real number
    - **C)** Whenever either the left-hand limit or the right-hand limit exists
    - **D)** Only when $f(x)$ is a polynomial function

3. Evaluate $\lim_{x \to 3} \frac{x^2 - 9}{x - 3}$.
    - **A)** $0$
    - **B)** $3$
    - **C)** $6$
    - **D)** Does not exist, because $x = 3$ makes the denominator zero

4. If $\lim_{x \to 2^-} f(x) = 5$, $\lim_{x \to 2^+} f(x) = 5$, and $f(2) = 9$, what is $\lim_{x \to 2} f(x)$?
    - **A)** $9$
    - **B)** Does not exist
    - **C)** $7$
    - **D)** $5$

5. Why does $\lim_{x \to 0} \sin\left(\frac{1}{x}\right)$ fail to exist?
    - **A)** Because $\sin(x)$ grows toward $+\infty$ as $x \to 0$
    - **B)** Because $\sin(1/x)$ oscillates infinitely often between $-1$ and $1$ in any neighborhood of $x = 0$, never settling near a single value
    - **C)** Because the left-hand limit is $-1$ and the right-hand limit is $+1$
    - **D)** Because trigonometric functions do not have limits at $0$

### Answer Key & Explanations

1. **B**. The limit depends strictly on the behavior of $f(x)$ for $x$ near $c$ ($x \ne c$). The function does not even need to be defined at $x = c$ for the limit to exist.
2. **A**. A two-sided limit exists if and only if $\lim_{x \to c^-} f(x) = \lim_{x \to c^+} f(x) = L \in \mathbb{R}$. If the one-sided limits disagree, there is a jump and the two-sided limit does not exist.
3. **C**. For $x \ne 3$, factor the numerator: $\frac{(x - 3)(x + 3)}{x - 3} = x + 3$. Taking the limit as $x \to 3$ gives $3 + 3 = 6$.
4. **D**. Because both one-sided limits as $x \to 2$ equal $5$, the two-sided limit $\lim_{x \to 2} f(x) = 5$. The isolated point value $f(2) = 9$ affects continuity, not the limit itself.
5. **B**. As $x \to 0$, $1/x \to \pm\infty$, causing $\sin(1/x)$ to cycle through $[-1, 1]$ infinitely many times arbitrarily close to $0$ (an oscillating discontinuity).

## References & Navigation

- **Previous Topic:** [[Functions and Their Graphs]]
- **Next Topic:** [[Definition of the Limit and Limit Theorems]]
- **Related Notes:** [[One-Sided Limits and Infinite Limits]], [[Limit at Infinity]]
