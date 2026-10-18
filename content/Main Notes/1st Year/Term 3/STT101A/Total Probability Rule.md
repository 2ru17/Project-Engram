---
id: Total-Probability-Rule
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Total Probability Rule]]

---

## Overview

The **Total Probability Rule (Law of Total Probability)** computes the unconditional (marginal) probability $P(A)$ of a target event $A$ by conditioning on a collection of mutually exclusive and collectively exhaustive scenarios $\{B_1, B_2, \dots, B_k\}$ that form a **partition** of the sample space $S$.

## Key Definitions

- **General Formula (for Partition $\{B_1, \dots, B_k\}$):**
  $$P(A) = \sum_{i=1}^k P(A \cap B_i) = \sum_{i=1}^k P(A \mid B_i) P(B_i)$$
- **Binary Partition Form ($\{B, B^c\}$):**
  $$P(A) = P(A \mid B)P(B) + P(A \mid B^c)P(B^c)$$
- **Role in Bayes' Theorem:** The Law of Total Probability provides the normalizing denominator $P(A)$ in Bayes' Rule: $P(B_j \mid A) = \frac{P(A \mid B_j)P(B_j)}{\sum_{i=1}^k P(A \mid B_i)P(B_i)}$.

## Worked Example

**Problem:** An e-commerce cluster routes $50\%$ of requests to Server $B_1$, $30\%$ to Server $B_2$, and $20\%$ to Server $B_3$. Timeout rates on the three servers are $P(T \mid B_1) = 0.01$, $P(T \mid B_2) = 0.02$, and $P(T \mid B_3) = 0.05$. What is the overall probability $P(T)$ that a randomly arriving request times out?

**Solution:**
$$P(T) = P(T \mid B_1)P(B_1) + P(T \mid B_2)P(B_2) + P(T \mid B_3)P(B_3)$$
$$P(T) = (0.01)(0.50) + (0.02)(0.30) + (0.05)(0.20) = 0.005 + 0.006 + 0.010 = 0.021 \quad (2.1\%)$$

## Multiple Choice Questions

1. What condition MUST the events $B_1, B_2, \dots, B_k$ satisfy for the Law of Total Probability $P(A) = \sum_{i=1}^k P(A \mid B_i)P(B_i)$ to hold?
    - **A)** They must be statistically independent of $A$.
    - **B)** They must form a **partition** of the sample space $S$ (pairwise mutually exclusive and collectively exhaustive, with $P(B_i) > 0$).
    - **C)** They must all have equal probability $P(B_i) = 1/k$.
    - **D)** Their conditional probabilities $P(A \mid B_i)$ must sum to $1$.

2. Suppose $70\%$ of emails arriving at a gateway are legitimate ($L$) and $30\%$ are spam ($S$). A keyword filter flags $80\%$ of spam emails ($P(F \mid S) = 0.80$) and falsely flags $5\%$ of legitimate emails ($P(F \mid L) = 0.05$). What is the total probability $P(F)$ that an incoming email is flagged?
    - **A)** $0.850$
    - **B)** $0.275$
    - **C)** $0.240$
    - **D)** $0.425$

3. In a probability tree diagram where the first stage branches into $B_1, \dots, B_k$ and the second stage branches into $A$ and $A^c$, how does the Law of Total Probability compute $P(A)$?
    - **A)** Multiply along each branch leading to $A$ to get $P(B_i)P(A \mid B_i)$, and then **sum** those products across all $k$ disjoint paths ending at $A$.
    - **B)** Add along each branch and then multiply across the paths.
    - **C)** Take only the largest branch product.
    - **D)** Average the conditional probabilities $P(A \mid B_i)$ without weighting by $P(B_i)$.

4. Why is $P(A)$ in the Law of Total Probability interpretable as a **weighted average** of the conditional probabilities $P(A \mid B_i)$?
    - **A)** Because the weights $w_i = P(B_i)$ are non-negative and sum to $1$ ($\sum_{i=1}^k P(B_i) = 1$), so $P(A) = \sum_{i=1}^k w_i P(A \mid B_i)$ always lies between $\min_i P(A \mid B_i)$ and $\max_i P(A \mid B_i)$.
    - **B)** Because $P(A \mid B_i)$ always equals $0.5$.
    - **C)** Because $P(A)$ is always the arithmetic mean $\frac{1}{k}\sum P(A \mid B_i)$.
    - **D)** Because $P(B_i) = P(A \mid B_i)$.

5. Box 1 has $3$ red and $1$ blue ball; Box 2 has $1$ red and $3$ blue balls. A fair coin is tossed to pick a box ($P(B_1) = P(B_2) = 0.5$), and one ball is drawn. What is the total probability of drawing a red ball?
    - **A)** $0.75$
    - **B)** $0.50$
    - **C)** $0.25$
    - **D)** $0.375$

### Answer Key & Explanations

1. **B**. The Law of Total Probability decomposes $A$ into disjoint slices $A \cap B_i$ across a partition $\{B_1, \dots, B_k\}$ of $S$, and then rewrites each $P(A \cap B_i) = P(A \mid B_i)P(B_i)$.
2. **B**. $P(F) = P(F \mid S)P(S) + P(F \mid L)P(L) = (0.80)(0.30) + (0.05)(0.70) = 0.240 + 0.035 = 0.275$.
3. **A**. Along a single tree path, the Multiplicative Rule multiplies $P(B_i)P(A \mid B_i) = P(A \cap B_i)$; across different disjoint paths ending in $A$, the Additive Rule sums them.
4. **A**. Since $P(B_i) \ge 0$ and $\sum P(B_i) = 1$, $\sum P(B_i) P(A \mid B_i)$ is a convex combination (weighted average) of the conditional probabilities.
5. **B**. $P(R) = P(R \mid B_1)P(B_1) + P(R \mid B_2)P(B_2) = (0.75)(0.50) + (0.25)(0.50) = 0.375 + 0.125 = 0.50$.

## References & Navigation

- **Previous Topic:** [[Partition of  Sample Space]]
- **Next Topic:** [[Bayes's Rules]]
- **Related Notes:** [[Bayes's Formula]], [[Contingency Table]]
