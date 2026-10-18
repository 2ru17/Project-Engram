---
id: Random-Variables
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Random Variables]]

---

## Overview

**Random Variables** are classified into **Discrete** and **Continuous** families based on the structure of their range (support) $R_X$, and can be analyzed jointly using **bivariate/multivariate distributions**, **covariance**, and **linear combinations**.

## Key Definitions

| Feature | Discrete Random Variable | Continuous Random Variable |
| :--- | :--- | :--- |
| **Support $R_X$** | Finite or countably infinite ($\{x_1, x_2, \dots\}$) | Uncountable interval(s) of $\mathbb{R}$ (e.g., $[0, \infty)$ or $(-\infty, \infty)$) |
| **Distribution Function** | PMF $p(x) = P(X = x)$ | PDF $f(x) \ge 0$ with $P(a \le X \le b) = \int_a^b f(x)\,dx$ |
| **Point Probability $P(X = c)$** | $p(c) \ge 0$ (can be strictly positive) | Always $0$ ($\int_c^c f(x)\,dx = 0$) |
| **Expected Value $E[X]$** | $\sum_{x \in R_X} x \, p(x)$ | $\int_{-\infty}^{\infty} x \, f(x)\,dx$ |

- **Linear Scaling of Mean & Variance:** For constants $a, b \in \mathbb{R}$:
  $$E[aX + b] = aE[X] + b, \qquad \text{Var}(aX + b) = a^2 \text{Var}(X)$$
- **Variance of a Sum:** $\text{Var}(X \pm Y) = \text{Var}(X) + \text{Var}(Y) \pm 2\text{Cov}(X, Y)$. If $X$ and $Y$ are **independent**, $\text{Cov}(X, Y) = 0$, so $\text{Var}(X + Y) = \text{Var}(X) + \text{Var}(Y)$ **and** $\text{Var}(X - Y) = \text{Var}(X) + \text{Var}(Y)$.

## Worked Example

**Problem:** Let $X$ and $Y$ be independent random variables with $E[X] = 10, \text{Var}(X) = 4$ and $E[Y] = 6, \text{Var}(Y) = 9$. Find $E[2X - Y + 3]$ and $\text{Var}(2X - Y + 3)$.

**Solution:**
- $E[2X - Y + 3] = 2E[X] - E[Y] + 3 = 2(10) - 6 + 3 = 17$.
- $\text{Var}(2X - Y + 3) = 2^2 \text{Var}(X) + (-1)^2 \text{Var}(Y) + 0 = 4(4) + 1(9) = 16 + 9 = 25$.

## Multiple Choice Questions

1. Which of the following is a **continuous** random variable rather than a discrete random variable?
    - **A)** The number of HTTP requests arriving at a web server in one minute.
    - **B)** The exact CPU execution time (in milliseconds, measured on a real continuum $[0, \infty)$) required to complete a database query.
    - **C)** The number of defective RAM sticks in a box of $50$.
    - **D)** The number of heads obtained in $100$ coin flips.

2. If $\text{Var}(X) = 5$, what is $\text{Var}(3X + 10)$?
    - **A)** $15$
    - **B)** $25$
    - **C)** $45$
    - **D)** $55$

3. Suppose $X$ and $Y$ are **independent** random variables with $\text{Var}(X) = 4$ and $\text{Var}(Y) = 9$. What is $\text{Var}(X - Y)$?
    - **A)** $-5$
    - **B)** $5$
    - **C)** $13$
    - **D)** $0$

4. Why does adding a constant shift $+b$ to a random variable ($X + b$) leave its variance completely unchanged ($\text{Var}(X + b) = \text{Var}(X)$)?
    - **A)** Because shifting every value by $+b$ also shifts the mean $\mu$ by $+b$, so the deviation $(X + b) - (\mu + b) = X - \mu$ (spread around the mean) is identical.
    - **B)** Because $b$ is always equal to $0$.
    - **C)** Because variance can be negative.
    - **D)** Because $E[X + b] = E[X]$.

5. For a continuous random variable $X$ with PDF $f(x)$, which statement about $f(x)$ is TRUE?
    - **A)** $f(x)$ must always satisfy $f(x) \le 1$ because $f(x) = P(X = x)$.
    - **B)** $f(x)$ is a probability density (height of the curve), so $f(x)$ can exceed $1$ (e.g., Uniform on $[0, 0.5]$ has $f(x) = 2$), provided $f(x) \ge 0$ and the total area $\int_{-\infty}^{\infty} f(x)\,dx = 1$.
    - **C)** $f(x)$ can be negative as long as the integral is $1$.
    - **D)** $P(a \le X \le b) = f(b) - f(a)$.

### Answer Key & Explanations

1. **B**. Time measured on an uncountable real interval $[0, \infty)$ is continuous, whereas counts of requests, defects, or heads take values in countable integer sets ($\{0, 1, 2, \dots\}$) and are discrete.
2. **C**. By the variance scaling property $\text{Var}(aX + b) = a^2 \text{Var}(X)$, $\text{Var}(3X + 10) = 3^2 \times 5 = 9 \times 5 = 45$.
3. **C**. For independent variables, $\text{Var}(aX + bY) = a^2\text{Var}(X) + b^2\text{Var}(Y)$. With $a = 1, b = -1$, $\text{Var}(X - Y) = (1)^2(4) + (-1)^2(9) = 4 + 9 = 13$. Uncertainty adds even when subtracting independent noisy quantities!
4. **A**. Variance measures dispersion around the mean; translating the entire distribution rigidly along the number line by $+b$ does not change its spread.
5. **B**. Unlike a PMF, a PDF $f(x)$ is not a probability itself—only its integral $\int_a^b f(x)\,dx$ is a probability. On a narrow interval like $[0, 0.5]$, $f(x) = 2 > 1$ while $\int_0^{0.5} 2\,dx = 1$.

## References & Navigation

- **Previous Topic:** [[Random Variable]]
- **Next Topic:** [[Discrete Probability Distribution]]
- **Related Notes:** [[Bayes's Formula]], [[Probability Mass Function]]
