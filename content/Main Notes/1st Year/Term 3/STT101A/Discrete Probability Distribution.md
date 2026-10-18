---
id: Discrete-Probability-Distribution
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Discrete Probability Distribution]]

---

## Overview

A **Discrete Probability Distribution** specifies all possible values in the countable support $R_X = \{x_1, x_2, \dots\}$ of a discrete random variable $X$ together with their probabilities $p(x_i) = P(X = x_i)$. Common parametric families include the **Bernoulli**, **Binomial**, **Geometric**, **Hypergeometric**, and **Poisson** distributions.

## Key Definitions

- **Validity Conditions:** (1) $p(x_i) \ge 0$ for all $x_i \in R_X$, and (2) $\sum_{x_i \in R_X} p(x_i) = 1$.
- **Cumulative Distribution Function (CDF):** $F(x) = P(X \le x) = \sum_{t \le x} p(t)$, a right-continuous step function with jumps of height $p(x_i)$ at each support point $x_i$.
- **Expected Value (Mean) & Variance:**
  $$\mu = E[X] = \sum_{x} x \, p(x), \qquad \sigma^2 = \text{Var}(X) = \sum_{x} (x - \mu)^2 p(x) = E[X^2] - (E[X])^2$$

## Worked Example

**Problem:** Let $X$ have distribution $P(X = 0) = 0.2$, $P(X = 1) = 0.5$, and $P(X = 2) = 0.3$. Compute $E[X]$ and $\text{Var}(X)$.

**Solution:**
- $E[X] = 0(0.2) + 1(0.5) + 2(0.3) = 0 + 0.5 + 0.6 = 1.1$.
- $E[X^2] = 0^2(0.2) + 1^2(0.5) + 2^2(0.3) = 0 + 0.5 + 1.2 = 1.7$.
- $\text{Var}(X) = E[X^2] - (E[X])^2 = 1.7 - (1.1)^2 = 1.7 - 1.21 = 0.49$.

## Multiple Choice Questions

1. Suppose a discrete random variable $X$ takes values $x \in \{1, 2, 3\}$ with $P(X = x) = c \cdot x$. What value of the constant $c$ makes this a valid discrete probability distribution?
    - **A)** $c = \frac{1}{3}$
    - **B)** $c = \frac{1}{6}$
    - **C)** $c = 1$
    - **D)** $c = \frac{1}{9}$

2. Using the worked example ($P(X=0)=0.2, P(X=1)=0.5, P(X=2)=0.3$), what is the value of the Cumulative Distribution Function $F(1.5) = P(X \le 1.5)$?
    - **A)** $0.7$
    - **B)** $0.5$
    - **C)** $0.75$
    - **D)** $1.0$

3. For a Binomial random variable $X \sim \text{Binomial}(n, p)$ counting successes in $n$ independent Bernoulli trials, what are $E[X]$ and $\text{Var}(X)$?
    - **A)** $E[X] = p$ and $\text{Var}(X) = p(1-p)$
    - **B)** $E[X] = np$ and $\text{Var}(X) = n^2 p^2$
    - **C)** $E[X] = np$ and $\text{Var}(X) = np(1-p)$
    - **D)** $E[X] = \frac{1}{p}$ and $\text{Var}(X) = \frac{1-p}{p^2}$

4. Which computational shortcut identity is equivalent to $\text{Var}(X) = E[(X - \mu)^2]$?
    - **A)** $\text{Var}(X) = (E[X])^2 - E[X^2]$
    - **B)** $\text{Var}(X) = \sqrt{E[X^2]}$
    - **C)** $\text{Var}(X) = E[X^2] + (E[X])^2$
    - **D)** $\text{Var}(X) = E[X^2] - (E[X])^2$

5. If $X$ is an integer-valued discrete random variable with CDF $F(x) = P(X \le x)$, how is $P(a \le X \le b)$ expressed in terms of $F$ for integers $a \le b$?
    - **A)** $F(b) - F(a)$
    - **B)** $F(b) - F(a - 1)$
    - **C)** $F(b + 1) - F(a)$
    - **D)** $F(b) + F(a)$

### Answer Key & Explanations

1. **B**. Normalization requires $\sum_{x=1}^3 cx = c(1 + 2 + 3) = 6c = 1 \implies c = \frac{1}{6}$, and each $P(X=x) > 0$.
2. **A**. $F(1.5) = P(X \le 1.5) = P(X = 0) + P(X = 1) = 0.2 + 0.5 = 0.7$.
3. **C**. A $\text{Binomial}(n, p)$ random variable is the sum of $n$ independent $\text{Bernoulli}(p)$ variables, yielding $E[X] = np$ and $\text{Var}(X) = np(1-p)$.
4. **D**. Expanding $E[(X - \mu)^2] = E[X^2 - 2\mu X + \mu^2] = E[X^2] - 2\mu E[X] + \mu^2 = E[X^2] - \mu^2 = E[X^2] - (E[X])^2$.
5. **B**. Because $P(X = a)$ must be included in $P(a \le X \le b)$, subtracting $F(a)$ would mistakenly remove $P(X = a)$. Subtracting $F(a - 1) = P(X \le a - 1)$ retains $X = a$.

## References & Navigation

- **Previous Topic:** [[Random Variables]]
- **Next Topic:** [[Probability Mass Function]]
- **Related Notes:** [[Random Variable]], [[Hyper-geometric Distribution]]
