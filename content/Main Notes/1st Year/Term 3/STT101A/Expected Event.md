---
id: Expected-Event
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Expected Event]]

---

## Overview

**Mathematical Expectation (Expected Value)**, denoted $E[X]$ or $\mu$, is the probability-weighted average of all possible values of a random variable $X$. Rather than representing the single "most likely" outcome on one trial, $E[X]$ represents the **long-run average** value across infinitely many independent repetitions (by the Law of Large Numbers) or the center of mass of the probability distribution.

## Key Definitions

- **Discrete Expected Value:** $E[X] = \sum_{x \in R_X} x \, P(X = x)$.
- **Expected Value of a Function (LOTUS):** $E[g(X)] = \sum_{x \in R_X} g(x) \, P(X = x)$.
- **Indicator Random Variable ($I_A$):** For an event $A$, let $I_A = 1$ if $A$ occurs and $0$ otherwise. Then $E[I_A] = 1 \cdot P(A) + 0 \cdot P(A^c) = P(A)$.
- **Linearity of Expectation:** $E[aX + bY + c] = aE[X] + bE[Y] + c$ **for any random variables $X, Y$ (even if dependent!)**.

## Worked Example

**Problem:** A cybersecurity bug bounty program pays $\$500$ if a critical vulnerability is found (probability $0.05$), $\$100$ for a minor bug (probability $0.20$), and $\$0$ otherwise (probability $0.75$). If auditing takes $\$15$ in cloud compute costs per run, what is the expected net profit per audit run?

**Solution:**
$$E[\text{Payout}] = 500(0.05) + 100(0.20) + 0(0.75) = 25 + 20 + 0 = \$45$$
$$E[\text{Net Profit}] = E[\text{Payout} - 15] = 45 - 15 = \$30$$

## Multiple Choice Questions

1. Does the expected value $E[X]$ of a discrete random variable $X$ have to be one of the possible outcomes in the support $R_X$?
    - **A)** Yes, $E[X]$ is always the mode (most frequent outcome) in $R_X$.
    - **B)** No; $E[X]$ is a weighted average (center of mass) and need not belong to $R_X$ (for example, a fair six-sided die has $E[X] = 3.5 \notin \{1,2,3,4,5,6\}$).
    - **C)** Yes, $E[X]$ must always be an integer.
    - **D)** No, because $E[X]$ is always between $0$ and $1$.

2. For an indicator random variable $I_A$ (which equals $1$ if event $A$ occurs and $0$ if $A^c$ occurs), what is $E[I_A]$?
    - **A)** $P(A)$
    - **B)** $0.5$
    - **C)** $1 - P(A)$
    - **D)** $P(A)P(A^c)$

3. Under what condition does **Linearity of Expectation** $E[X + Y] = E[X] + E[Y]$ hold?
    - **A)** Only when $X$ and $Y$ are statistically independent.
    - **B)** Only when $X$ and $Y$ are mutually exclusive.
    - **C)** Always, for any random variables $X$ and $Y$ with finite expectations, regardless of whether they are independent or dependent.
    - **D)** Only when $X$ and $Y$ are normally distributed.

4. If $E[X] = 4$, what is $E[3X - 5]$?
    - **A)** $12$
    - **B)** $4$
    - **C)** $17$
    - **D)** $7$

5. A game is called **mathematically fair** if the expected net gain of the player is:
    - **A)** $E[\text{Gain}] = 1$
    - **B)** $E[\text{Gain}] = 0$
    - **C)** $E[\text{Gain}] = 0.5$
    - **D)** $E[\text{Gain}] > 0$

### Answer Key & Explanations

1. **B**. $E[X]$ is the center of mass of the probability distribution, not necessarily an achievable single-trial value (e.g., $E[X] = 3.5$ for a fair die).
2. **A**. By definition of expectation, $E[I_A] = 1 \cdot P(I_A = 1) + 0 \cdot P(I_A = 0) = P(A)$. This bridges event probabilities and expectations.
3. **C**. Linearity of expectation ($E[X + Y] = E[X] + E[Y]$) follows from the linearity of summation/integration over the joint distribution and requires **no** independence assumption.
4. **D**. By linearity of expectation, $E[3X - 5] = 3E[X] - 5 = 3(4) - 5 = 12 - 5 = 7$.
5. **B**. A game is fair when neither player has a long-run expected advantage, meaning the expected net gain is $E[\text{Gain}] = 0$.

## References & Navigation

- **Previous Topic:** [[Basic Formula of Probability]]
- **Next Topic:** [[Relative Frequency Form]]
- **Related Notes:** [[Priori Probability]], [[Combinations]]
