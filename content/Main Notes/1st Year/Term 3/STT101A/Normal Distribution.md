---
id: Normal-Distribution
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Normal Distribution]]

---

## Overview

The **Normal (Gaussian) Distribution**, denoted $X \sim \mathcal{N}(\mu, \sigma^2)$, is the most important continuous probability distribution in statistics. Its bell-shaped probability density function is symmetric around the mean $\mu$, and by the **Central Limit Theorem (CLT)**, the sum or sample mean of many independent random variables converges toward a Normal distribution.

## Key Definitions

- **Probability Density Function (PDF):**
  $$f(x) = \frac{1}{\sigma\sqrt{2\pi}} \exp\left(-\frac{(x - \mu)^2}{2\sigma^2}\right), \quad -\infty < x < \infty$$
- **Standard Normal Distribution ($Z \sim \mathcal{N}(0, 1)$):** Standardized via the **Z-score** transformation $Z = \frac{X - \mu}{\sigma}$, with CDF $\Phi(z) = P(Z \le z)$ satisfying symmetry $\Phi(-z) = 1 - \Phi(z)$.
- **Empirical ($68\text{--}95\text{--}99.7$) Rule:**
  - $P(\mu - 1\sigma \le X \le \mu + 1\sigma) \approx 0.6827$
  - $P(\mu - 2\sigma \le X \le \mu + 2\sigma) \approx 0.9545$
  - $P(\mu - 3\sigma \le X \le \mu + 3\sigma) \approx 0.9973$

## Worked Example

**Problem:** Network round-trip latency follows $X \sim \mathcal{N}(\mu = 50\text{ ms}, \sigma^2 = 100\text{ ms}^2)$, so $\sigma = 10\text{ ms}$. Find $P(30 \le X \le 60)$ given $\Phi(1.0) = 0.8413$ and $\Phi(2.0) = 0.9772$.

**Solution:**
1. Convert bounds to $Z$-scores: $z_1 = \frac{30 - 50}{10} = -2.0$ and $z_2 = \frac{60 - 50}{10} = +1.0$.
2. $P(-2.0 \le Z \le 1.0) = \Phi(1.0) - \Phi(-2.0) = \Phi(1.0) - (1 - \Phi(2.0)) = 0.8413 - (1 - 0.9772) = 0.8413 - 0.0228 = 0.8185$.

## Multiple Choice Questions

1. For any normal distribution $X \sim \mathcal{N}(\mu, \sigma^2)$, how are the **mean**, **median**, and **mode** related?
    - **A)** Mean $>$ Median $>$ Mode
    - **B)** Mean $=$ Median $=$ Mode $= \mu$ (due to unimodality and exact symmetry around $x = \mu$)
    - **C)** Mean $= \mu$, Median $= 0$, Mode $= \sigma$
    - **D)** Mean $<$ Median $<$ Mode

2. If $X \sim \mathcal{N}(\mu = 100, \sigma^2 = 225)$ (so $\sigma = 15$), what is the standardized $Z$-score for an observation $x = 130$?
    - **A)** $Z = +2.0$
    - **B)** $Z = +0.133$
    - **C)** $Z = -2.0$
    - **D)** $Z = +30.0$

3. For any continuous random variable (including $X \sim \mathcal{N}(\mu, \sigma^2)$), what is the probability that $X$ equals an exact single real number $c$, i.e., $P(X = c)$?
    - **A)** $f(c)$
    - **B)** $0.5$
    - **C)** $0$, because $\int_c^c f(x)\,dx = 0$ (Consequently, $P(X < c) = P(X \le c)$)
    - **D)** $\Phi(c)$

4. Using the symmetry of the Standard Normal CDF $\Phi(z) = P(Z \le z)$, if $\Phi(1.96) = 0.975$, what is $P(-1.96 \le Z \le 1.96)$?
    - **A)** $0.975$
    - **B)** $0.990$
    - **C)** $0.025$
    - **D)** $0.950$

5. Where do the **points of inflection** (where the curve changes from concave down to concave up) occur on the Normal PDF $f(x)$?
    - **A)** At $x = \mu$ only
    - **B)** At $x = \mu - \sigma$ and $x = \mu + \sigma$ (one standard deviation on either side of the mean)
    - **C)** At $x = \mu \pm 2\sigma$
    - **D)** At $x = 0$ and $x = 1$

### Answer Key & Explanations

1. **B**. Because the Gaussian density is unimodal and symmetric about $x = \mu$, its center of mass (mean), $50$th percentile (median), and peak density (mode) all coincide at $\mu$.
2. **A**. $Z = \frac{X - \mu}{\sigma} = \frac{130 - 100}{\sqrt{225}} = \frac{30}{15} = +2.0$.
3. **C**. Probability for a continuous random variable is the area under the density curve $f(x)$; a single point $[c, c]$ has width zero, so $P(X = c) = \int_c^c f(x)\,dx = 0$.
4. **D**. By symmetry, $\Phi(-1.96) = 1 - \Phi(1.96) = 1 - 0.975 = 0.025$. Thus $P(-1.96 \le Z \le 1.96) = \Phi(1.96) - \Phi(-1.96) = 0.975 - 0.025 = 0.950$.
5. **B**. Setting the second derivative $f''(x) = 0$ yields $(x - \mu)^2 - \sigma^2 = 0 \implies x = \mu \pm \sigma$.

## References & Navigation

- **Previous Topic:** [[Hyper-geometric Distribution]]
- **Next Topic:** [[Hypothesis Testing]]
- **Related Notes:** [[Probability Mass Function]]
