---
id: Bayes's-Rules
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Bayes's Rules]]

---

## Overview

**Bayes' Rule (Bayes' Theorem)** inverts conditional probabilities, allowing us to compute the **posterior probability** $P(B_k \mid A)$ of an unobservable cause or hypothesis $B_k$ given observed evidence $A$, using the **prior probabilities** $P(B_i)$ and **likelihoods** $P(A \mid B_i)$ across a partition of the sample space.

## Key Definitions

- **Two-Hypothesis Form:** $P(B \mid A) = \frac{P(A \mid B)P(B)}{P(A \mid B)P(B) + P(A \mid B^c)P(B^c)}$.
- **General Partition Form:** For a partition $\{B_1, B_2, \dots, B_n\}$ of $S$:
  $$P(B_k \mid A) = \frac{P(A \mid B_k)P(B_k)}{\sum_{i=1}^n P(A \mid B_i)P(B_i)}$$
- **Posterior Odds Form:** $\frac{P(B \mid A)}{P(B^c \mid A)} = \frac{P(A \mid B)}{P(A \mid B^c)} \cdot \frac{P(B)}{P(B^c)} = \text{Likelihood Ratio} \times \text{Prior Odds}$.

## Worked Example

**Problem:** Factory machines $M_1$ and $M_2$ produce $60\%$ and $40\%$ of chips, respectively. Defective rates are $P(D \mid M_1) = 0.02$ and $P(D \mid M_2) = 0.05$. If a randomly selected chip is defective ($D$), what is the probability it came from $M_2$?

**Solution:**
$$P(M_2 \mid D) = \frac{P(D \mid M_2)P(M_2)}{P(D \mid M_1)P(M_1) + P(D \mid M_2)P(M_2)} = \frac{(0.05)(0.40)}{(0.02)(0.60) + (0.05)(0.40)} = \frac{0.020}{0.012 + 0.020} = \frac{0.020}{0.032} = 0.625$$

## Multiple Choice Questions

1. Which identity directly relates $P(B \mid A)$ and $P(A \mid B)$ when $P(A) > 0$ and $P(B) > 0$?
    - **A)** $P(B \mid A) = P(A \mid B)$
    - **B)** $P(B \mid A) = \frac{P(A \mid B)P(B)}{P(A)}$
    - **C)** $P(B \mid A) = 1 - P(A \mid B)$
    - **D)** $P(B \mid A) = \frac{P(A \mid B)P(A)}{P(B)}$

2. Using the worked example ($P(M_1)=0.60, P(M_2)=0.40, P(D\mid M_1)=0.02, P(D\mid M_2)=0.05$), what is the posterior probability $P(M_1 \mid D)$ that a defective chip came from Machine 1?
    - **A)** $0.375$
    - **B)** $0.600$
    - **C)** $0.012$
    - **D)** $0.500$

3. Why must the sum of posterior probabilities $\sum_{i=1}^n P(B_i \mid A)$ over a partition $\{B_1, \dots, B_n\}$ always equal $1$?
    - **A)** Because $A$ is mutually exclusive with every $B_i$.
    - **B)** Because the prior probabilities are all equal to $1/n$.
    - **C)** Because each numerator $P(A \mid B_i)P(B_i)$ is divided by the exact sum of all numerators $P(A) = \sum_{j=1}^n P(A \mid B_j)P(B_j)$.
    - **D)** Because $P(A) = 1$.

4. Suppose a diagnostic test has sensitivity $P(+ \mid D) = 0.90$ and false-positive rate $P(+ \mid D^c) = 0.10$. If disease prevalence is $P(D) = 0.01$, what is the posterior odds $\frac{P(D \mid +)}{P(D^c \mid +)}$?
    - **A)** $9 : 1$
    - **B)** $90 : 1$
    - **C)** $1 : 99$
    - **D)** $9 : 99$ (i.e., $1 : 11$)

5. Which common error confuses $P(A \mid B)$ with $P(B \mid A)$ in legal and statistical reasoning?
    - **A)** Gambler's Fallacy
    - **B)** Prosecutor's Fallacy (Confusion of the Inverse)
    - **C)** Simpson's Paradox
    - **D)** Berkson's Paradox

### Answer Key & Explanations

1. **B**. Since $P(A \cap B) = P(B \mid A)P(A) = P(A \mid B)P(B)$, dividing by $P(A)$ gives Bayes' Rule: $P(B \mid A) = \frac{P(A \mid B)P(B)}{P(A)}$.
2. **A**. $P(M_1 \mid D) = \frac{0.012}{0.032} = 0.375$ (which also equals $1 - P(M_2 \mid D) = 1 - 0.625 = 0.375$).
3. **C**. Conditioning on event $A$ defines a valid probability measure on the partition $\{B_i\}$; algebraically, $\sum_{i=1}^n \frac{P(A \mid B_i)P(B_i)}{P(A)} = \frac{P(A)}{P(A)} = 1$.
4. **D**. Posterior odds equal Likelihood Ratio $\times$ Prior Odds $= \frac{0.90}{0.10} \times \frac{0.01}{0.99} = 9 \times \frac{1}{99} = \frac{9}{99} = \frac{1}{11}$.
5. **B**. The Prosecutor's Fallacy (confusion of the inverse) mistakenly equates the probability of observing evidence given innocence $P(E \mid I)$ with the probability of innocence given the evidence $P(I \mid E)$.

## References & Navigation

- **Previous Topic:** [[Total Probability Rule]]
- **Next Topic:** [[Bayes's Formula]]
- **Related Notes:** [[Random Variable]], [[Partition of  Sample Space]]
