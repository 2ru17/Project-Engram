---
id: Hyper-geometric-Distribution
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Hyper-geometric Distribution]]

---

## Overview

The **Hypergeometric Distribution** models the number of successes $X$ in a sample of size $n$ drawn **without replacement** from a finite population of size $N$ that contains exactly $K$ successes (and $N - K$ failures). Unlike the Binomial distribution, trials are **dependent** because each draw alters the composition of the remaining population.

## Key Definitions

- **Probability Mass Function (PMF):**
  $$P(X = x) = \frac{\binom{K}{x} \binom{N - K}{n - x}}{\binom{N}{n}}, \quad \max(0, n - (N - K)) \le x \le \min(n, K)$$
- **Mean:** $E[X] = n \cdot \frac{K}{N} = np$ (where $p = \frac{K}{N}$).
- **Variance:** $\text{Var}(X) = n \cdot \frac{K}{N} \left(1 - \frac{K}{N}\right) \left(\frac{N - n}{N - 1}\right)$, where $\frac{N - n}{N - 1}$ is the **Finite Population Correction (FPC)** factor.

## Worked Example

**Problem:** A shipment of $N = 10$ routers contains $K = 3$ defective units and $7$ working units. If an inspector tests a random sample of $n = 4$ routers **without replacement**, what is the probability that **exactly $x = 2$** tested routers are defective?

**Solution:**
$$P(X = 2) = \frac{\binom{3}{2} \binom{7}{2}}{\binom{10}{4}} = \frac{3 \times 21}{210} = \frac{63}{210} = 0.30$$

## Multiple Choice Questions

1. What is the key structural difference between a **Hypergeometric** experiment and a **Binomial** experiment?
    - **A)** Hypergeometric sampling is performed **without replacement** from a finite population (making draws dependent), whereas Binomial trials are independent (or sampled **with replacement**).
    - **B)** Hypergeometric random variables are continuous, whereas Binomial random variables are discrete.
    - **C)** Hypergeometric experiments have three outcomes per draw instead of two.
    - **D)** Hypergeometric distributions have no defined mean.

2. In the Hypergeometric PMF $P(X = x) = \frac{\binom{K}{x}\binom{N-K}{n-x}}{\binom{N}{n}}$, what does the numerator $\binom{K}{x}\binom{N-K}{n-x}$ count?
    - **A)** The total number of ordered sequences of length $n$.
    - **B)** By the Multiplication Principle, the number of ways to choose $x$ successes from the $K$ available successes AND $n - x$ failures from the $N - K$ available failures.
    - **C)** The sum of all subsets of $N$.
    - **D)** The probability of drawing with replacement.

3. Using the worked example ($N = 10$ routers, $K = 3$ defective, sample size $n = 4$), what is the probability $P(X = 0)$ that **none** of the $4$ inspected routers is defective?
    - **A)** $\frac{\binom{3}{0}\binom{7}{4}}{\binom{10}{4}} = \frac{1 \times 35}{210} = \frac{1}{6} \approx 0.1667$
    - **B)** $(0.7)^4 = 0.2401$
    - **C)** $\frac{3}{10} = 0.30$
    - **D)** $\frac{7}{10} = 0.70$

4. What happens to the Finite Population Correction factor $\frac{N - n}{N - 1}$ in the Hypergeometric variance as the population size $N \to \infty$ (with $\frac{K}{N} = p$ and sample size $n$ held fixed)?
    - **A)** It approaches $0$.
    - **B)** It approaches $1$, and the Hypergeometric distribution converges to the $\text{Binomial}(n, p)$ distribution.
    - **C)** It approaches $\infty$.
    - **D)** It approaches $n$.

5. For $N = 10, K = 3, n = 4$, what is the expected number of defective routers $E[X]$ in the sample?
    - **A)** $3.0$
    - **B)** $n \cdot \frac{K}{N} = 4 \times \frac{3}{10} = 1.2$
    - **C)** $0.3$
    - **D)** $2.0$

### Answer Key & Explanations

1. **A**. Sampling without replacement from a finite population changes the success probability on each draw (dependent trials $\implies$ Hypergeometric), whereas constant $p$ with independent trials (or with replacement) yields the Binomial distribution.
2. **B**. Stage 1 selects $x$ successes out of $K$ in $\binom{K}{x}$ ways; Stage 2 selects the remaining $n - x$ sample items from the $N - K$ failures in $\binom{N-K}{n-x}$ ways.
3. **A**. $P(X = 0) = \frac{\binom{3}{0}\binom{7}{4}}{\binom{10}{4}} = \frac{1 \times 35}{210} = \frac{1}{6}$.
4. **B**. When $N \gg n$, removing $n$ items barely changes the composition of the population, so $\frac{N - n}{N - 1} \to 1$ and $\text{Hypergeometric}(N, K, n) \to \text{Binomial}(n, p)$.
5. **B**. By linearity of expectation over $n$ indicator variables (each with marginal probability $K/N$), $E[X] = n \frac{K}{N} = 4 \times 0.3 = 1.2$.

## References & Navigation

- **Previous Topic:** [[Probability Mass Function]]
- **Next Topic:** [[Normal Distribution]]
- **Related Notes:** [[Discrete Probability Distribution]], [[Hypothesis Testing]]
