---
id: Relative-Frequency-Form
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Relative Frequency Form]]

---

## Overview

The **Relative Frequency (Empirical / Frequentist) Form of Probability** estimates the probability of an event $E$ by conducting $n$ independent, identical trials of a statistical experiment and computing the proportion of trials in which $E$ occurs. Under **Bernoulli's Law of Large Numbers**, this empirical ratio converges to the true probability $P(E)$ as $n \to \infty$.

## Key Definitions

- **Empirical Relative Frequency:** If event $E$ occurs $f_n(E)$ times in $n$ trials, its relative frequency is:
  $$\hat{P}_n(E) = \frac{f_n(E)}{n}$$
- **Frequentist Limit Definition:** $P(E) = \lim_{n \to \infty} \frac{f_n(E)}{n}$.
- **Consistency with Axioms:** Relative frequencies automatically satisfy all three Kolmogorov axioms for any finite $n$:
  1. $0 \le f_n(E) \le n \implies 0 \le \hat{P}_n(E) \le 1$.
  2. $f_n(S) = n \implies \hat{P}_n(S) = \frac{n}{n} = 1$.
  3. If $A \cap B = \emptyset$, then $f_n(A \cup B) = f_n(A) + f_n(B) \implies \hat{P}_n(A \cup B) = \hat{P}_n(A) + \hat{P}_n(B)$.

## Worked Example

**Problem:** A network engineer transmits $n = 2,500$ test packets across a transatlantic link and observes that $35$ packets are dropped ($f_n(D) = 35$). Estimate the packet drop probability $\hat{P}(D)$ and successful delivery probability $\hat{P}(D^c)$.

**Solution:**
$$\hat{P}(D) = \frac{35}{2500} = 0.014 \quad (1.4\%), \qquad \hat{P}(D^c) = 1 - 0.014 = 0.986 \quad (98.6\%)$$

## Multiple Choice Questions

1. How is the **relative frequency** $\hat{P}_n(E)$ of an event $E$ computed after $n$ experimental trials?
    - **A)** Divide the number of trials $n$ by the frequency $f_n(E)$.
    - **B)** Divide the observed frequency $f_n(E)$ (number of times $E$ occurred) by the total number of trials $n$: $\hat{P}_n(E) = \frac{f_n(E)}{n}$.
    - **C)** Multiply $f_n(E)$ by $n$.
    - **D)** Subtract $f_n(E)$ from $1$.

2. What fundamental theorem guarantees that as the number of independent trials $n \to \infty$, the empirical relative frequency $\frac{f_n(E)}{n}$ converges to the true theoretical probability $P(E)$?
    - **A)** Bayes' Theorem
    - **B)** The Law of Large Numbers (LLN)
    - **C)** De Morgan's Law
    - **D)** Pascal's Identity

3. Why is the **Gambler's Fallacy** (believing that after $5$ heads in a row on a fair coin, a tail is "due" on the $6$th toss) a misunderstanding of the Law of Large Numbers?
    - **A)** Because the Law of Large Numbers works by **diluting** early finite streaks as $n \to \infty$ (since $\frac{5 + f_{n-5}}{n} \to 0.5$), NOT by forcing future independent trials to compensate for past outcomes.
    - **B)** Because a fair coin actually becomes biased toward heads after $5$ heads.
    - **C)** Because the Law of Large Numbers applies only to $n \le 10$ trials.
    - **D)** Because coin tosses are mutually exclusive across different trials.

4. In a Monte Carlo simulation of $n = 10,000$ random points in a unit square, $7,854$ points fall inside a quarter-circle. What is the relative frequency estimate of the probability of landing inside the quarter-circle?
    - **A)** $0.7854$
    - **B)** $0.2146$
    - **C)** $78.54$
    - **D)** $1.2732$

5. For any finite number of trials $n \ge 1$, if events $A$ and $B$ are mutually exclusive ($A \cap B = \emptyset$), why does $\hat{P}_n(A \cup B) = \hat{P}_n(A) + \hat{P}_n(B)$ hold exactly?
    - **A)** Because $A$ and $B$ can never occur on the same trial, so the count of trials where $A \cup B$ occurs is the exact sum $f_n(A) + f_n(B)$, and dividing by $n$ gives $\frac{f_n(A)}{n} + \frac{f_n(B)}{n}$.
    - **B)** Because $f_n(A)$ always equals $f_n(B)$.
    - **C)** Only when $n \to \infty$.
    - **D)** Because $A$ and $B$ are independent.

### Answer Key & Explanations

1. **B**. Relative frequency is the empirical proportion of trials in which $E$ occurred: $\hat{P}_n(E) = f_n(E) / n$.
2. **B**. Bernoulli's Weak (and Borel's Strong) Law of Large Numbers proves that the sample proportion $\hat{P}_n(E) = \frac{1}{n}\sum_{i=1}^n I_i(E)$ converges to $P(E)$ as $n \to \infty$.
3. **A**. Independent trials have no memory ($P(T_6 \mid H_1 H_2 H_3 H_4 H_5) = 0.5$). Convergence of the ratio $f_n/n \to 0.5$ occurs because a fixed initial surplus of $5$ heads divided by $n$ vanishes ($5/n \to 0$) as $n \to \infty$.
4. **A**. $\hat{P}_n(E) = \frac{7854}{10000} = 0.7854$ (which approximates $\pi/4 \approx 0.785398$).
5. **A**. Since no single trial can belong to both $A$ and $B$, the empirical counts add without overlap: $f_n(A \cup B) = f_n(A) + f_n(B)$.

## References & Navigation

- **Previous Topic:** [[Expected Event]]
- **Next Topic:** [[Priori Probability]]
- **Related Notes:** [[Basic Formula of Probability]], [[Additive and Complementary Rules]]
