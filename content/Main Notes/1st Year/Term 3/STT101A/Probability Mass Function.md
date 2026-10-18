---
id: Probability-Mass-Function
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Probability Mass Function]]

---

## Overview

The **Probability Mass Function (PMF)** of a discrete random variable $X$, denoted $p_X(x)$ or $f(x) = P(X = x)$, assigns a probability mass to each possible discrete value $x$ in the support $R_X$.

## Key Definitions

- **PMF Definition:** $p_X(x) = P(X = x) = P(\{\omega \in S : X(\omega) = x\})$ for $x \in \mathbb{R}$.
- **Support ($R_X$):** The countable set of values with strictly positive probability: $R_X = \{x \in \mathbb{R} : p_X(x) > 0\}$.
- **Two Defining Axioms of a Valid PMF:**
  1. **Non-negativity:** $p_X(x) \ge 0$ for all $x \in \mathbb{R}$.
  2. **Normalization (Sums to 1):** $\sum_{x \in R_X} p_X(x) = 1$.
- **Relation to CDF $F_X(x)$:** $F_X(x) = \sum_{t \le x} p_X(t)$, and for ordered support $x_1 < x_2 < \cdots$, $p_X(x_i) = F_X(x_i) - F_X(x_{i-1})$.

## Worked Example

**Problem:** Verify that $p(x) = \frac{x^2}{30}$ for $x \in \{1, 2, 3, 4\}$ is a valid PMF, and compute $P(X \ge 3)$.

**Solution:**
1. Non-negative: $p(x) > 0$ for each $x \in \{1, 2, 3, 4\}$.
2. Sum: $\sum_{x=1}^4 \frac{x^2}{30} = \frac{1 + 4 + 9 + 16}{30} = \frac{30}{30} = 1$. (Valid PMF!)
3. $P(X \ge 3) = p(3) + p(4) = \frac{9}{30} + \frac{16}{30} = \frac{25}{30} = \frac{5}{6}$.

## Multiple Choice Questions

1. Which two conditions are both necessary and sufficient for a function $p(x)$ on a countable set $R_X$ to be a valid **Probability Mass Function (PMF)**?
    - **A)** $p(x) \ge 0$ for all $x \in R_X$ and $\sum_{x \in R_X} p(x) = 1$
    - **B)** $-1 \le p(x) \le 1$ and $\sum_{x \in R_X} p(x) = 0$
    - **C)** $p(x)$ is monotonically increasing and $\lim_{x \to \infty} p(x) = 1$
    - **D)** $\int_{-\infty}^{\infty} p(x)\,dx = 1$ and $p(x)$ can exceed $1$

2. Let $X$ have PMF $p(x) = k(2x + 1)$ for $x \in \{0, 1, 2\}$. What must the constant $k$ equal?
    - **A)** $\frac{1}{6}$
    - **B)** $\frac{1}{9}$
    - **C)** $\frac{1}{3}$
    - **D)** $\frac{1}{5}$

3. How can you recover the PMF value $p_X(x_i) = P(X = x_i)$ at a jump point $x_i$ from the Cumulative Distribution Function $F_X(x)$?
    - **A)** By taking the derivative $F'_X(x_i)$
    - **B)** By computing the jump height $F_X(x_i) - \lim_{t \to x_i^-} F_X(t)$ (or $F_X(x_i) - F_X(x_{i-1})$ for ordered discrete support)
    - **C)** By squaring $F_X(x_i)$
    - **D)** $p_X(x_i)$ always equals $F_X(x_i)$

4. What is the PMF of a **Poisson** random variable $X \sim \text{Poisson}(\lambda)$ for $x \in \{0, 1, 2, \dots\}$?
    - **A)** $p(x) = \binom{n}{x} p^x (1-p)^{n-x}$
    - **B)** $p(x) = \frac{e^{-\lambda} \lambda^x}{x!}$
    - **C)** $p(x) = (1-p)^{x-1} p$
    - **D)** $p(x) = \lambda e^{-\lambda x}$

5. Why do we use a **Probability Mass Function (PMF)** for discrete random variables, whereas continuous random variables require a **Probability Density Function (PDF)**?
    - **A)** Because discrete random variables concentrate non-zero probability $P(X = x) > 0$ at isolated countable points (point masses), whereas continuous variables have $P(X = x) = 0$ at every single point and distribute probability over intervals via integration $\int_a^b f(x)\,dx$.
    - **B)** Because continuous random variables only take integer values.
    - **C)** Because a PMF can take values greater than $1$, while a PDF cannot.
    - **D)** There is no difference between a PMF and a PDF.

### Answer Key & Explanations

1. **A**. Every discrete probability mass must be non-negative ($p(x) \ge 0$) and the total probability across the entire support must sum to $1$ ($\sum p(x) = 1$).
2. **B**. Evaluating at $x = 0, 1, 2$ gives $k(1) + k(3) + k(5) = 9k = 1 \implies k = \frac{1}{9}$.
3. **B**. The CDF $F_X(x) = P(X \le x)$ accumulates all probability masses up to $x$. Subtracting the cumulative probability strictly below $x_i$ isolates the exact point mass $P(X = x_i)$.
4. **B**. The Poisson PMF is $p(x) = \frac{e^{-\lambda}\lambda^x}{x!}$ for $x = 0, 1, 2, \dots$, which sums to $e^{-\lambda} \sum_{x=0}^\infty \frac{\lambda^x}{x!} = e^{-\lambda}e^\lambda = 1$.
5. **A**. Discrete variables have point masses $p(x) = P(X=x) \in [0, 1]$, whereas continuous densities $f(x)$ represent probability *per unit length* (which can exceed $1$) and yield probabilities only when integrated over an interval.

## References & Navigation

- **Previous Topic:** [[Discrete Probability Distribution]]
- **Next Topic:** [[Hyper-geometric Distribution]]
- **Related Notes:** [[Normal Distribution]], [[Random Variables]]
