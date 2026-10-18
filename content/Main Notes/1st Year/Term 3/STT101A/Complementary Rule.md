---
id: Complementary-Rule
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Complementary Rule]]

---

## Overview

The **Complementary Rule** states that the sum of the probabilities of an event $A$ and its complement $A^c$ is always $1$: $P(A) + P(A^c) = 1$, or equivalently $P(A) = 1 - P(A^c)$. It is derived directly from Kolmogorov's normalization and additivity axioms.

## Key Definitions

- **Complementary Probability Formula:** $P(A^c) = 1 - P(A)$ and $P(A) = 1 - P(A^c)$.
- **Axiomatic Proof:** Since $S = A \cup A^c$ and $A \cap A^c = \emptyset$, Axiom 2 and Axiom 3 give $1 = P(S) = P(A \cup A^c) = P(A) + P(A^c)$.
- **"At Least One" Shortcut:** For $n$ independent trials with failure probability $q = 1 - p$, $P(\text{at least one success}) = 1 - q^n$.

## Worked Example

**Problem:** A packet transmission across a noisy wireless link fails independently with probability $0.10$. If $4$ packets are transmitted, what is the probability that **at least one** packet fails?

**Solution:**
- Let $A$ be the event "at least one packet fails." Then $A^c$ is "no packets fail (all 4 succeed)."
- $P(A^c) = (1 - 0.10)^4 = (0.90)^4 = 0.6561$.
- By the Complementary Rule: $P(A) = 1 - P(A^c) = 1 - 0.6561 = 0.3439$.

## Multiple Choice Questions

1. Which pair of Kolmogorov's axioms is directly used to prove that $P(A^c) = 1 - P(A)$?
    - **A)** Axiom 1 (Non-negativity) only
    - **B)** Axiom 2 ($P(S) = 1$) and Axiom 3 (Additivity for disjoint sets $A$ and $A^c$)
    - **C)** Bayes' Theorem and independence
    - **D)** The Central Limit Theorem

2. A security system has $3$ independent firewall layers, each blocking an intrusion attempt with probability $0.80$ (and failing to block with probability $0.20$). What is the probability that an intrusion is blocked by **at least one** layer?
    - **A)** $0.992$
    - **B)** $0.512$
    - **C)** $0.008$
    - **D)** $0.800$

3. Using the Complementary Rule, how can one prove that $P(A) \le 1$ for every event $A \subseteq S$?
    - **A)** Since $P(A) = 1 - P(A^c)$ and Axiom 1 guarantees $P(A^c) \ge 0$, subtracting a non-negative number from $1$ yields $P(A) \le 1$.
    - **B)** Because $P(A)$ is always equal to $0.5$.
    - **C)** Because $A$ and $A^c$ are independent.
    - **D)** Because $P(\emptyset) = 1$.

4. In the Birthday Problem with $n = 23$ people (assuming $365$ equally likely birthdays), why is the Complementary Rule used to find $P(\text{at least two share a birthday})$?
    - **A)** Because computing $1 - P(\text{all 23 birthdays are distinct}) = 1 - \frac{P(365, 23)}{365^{23}} \approx 0.5073$ avoids counting all combinations of pairs, triples, and higher collisions.
    - **B)** Because $23 / 365 = 0.5073$.
    - **C)** Because birthdays are mutually exclusive.
    - **D)** Because only 2 people can share a birthday.

5. If the odds in favor of event $A$ are $3 : 5$, what is $P(A^c)$?
    - **A)** $\frac{3}{8}$
    - **B)** $\frac{5}{8}$
    - **C)** $\frac{3}{5}$
    - **D)** $\frac{2}{5}$

### Answer Key & Explanations

1. **B**. Since $A \cup A^c = S$ and $A \cap A^c = \emptyset$, Axiom 3 gives $P(A \cup A^c) = P(A) + P(A^c)$ and Axiom 2 gives $P(S) = 1$, so $P(A) + P(A^c) = 1$.
2. **A**. The complement is that all 3 layers fail to block the intrusion: $P(\text{none block}) = (0.20)^3 = 0.008$. Thus $P(\text{at least one blocks}) = 1 - 0.008 = 0.992$.
3. **A**. From $P(A) + P(A^c) = 1$ and $P(A^c) \ge 0$ (Axiom 1), it immediately follows that $P(A) = 1 - P(A^c) \le 1$.
4. **A**. The complement of "at least one shared birthday" is "all $23$ birthdays are distinct," whose probability is a single product $\frac{365 \times 364 \times \cdots \times 343}{365^{23}} \approx 0.4927$, giving $1 - 0.4927 = 0.5073$.
5. **B**. Odds in favor of $A$ being $3:5$ means $P(A) = \frac{3}{3+5} = \frac{3}{8}$. By the Complementary Rule, $P(A^c) = 1 - \frac{3}{8} = \frac{5}{8}$.

## References & Navigation

- **Previous Topic:** [[Additive Rule]]
- **Next Topic:** [[Conditional Probability and Multiplicative Rules]]
- **Related Notes:** [[Conditional Probability]], [[Additive and Complementary Rules]]
