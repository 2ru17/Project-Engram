---
id: Generalized-Multiplication
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Generalized Multiplication]]

---

## Overview

The **Generalized Multiplication Rule** (both in combinatorics and in probability) extends two-stage product rules to an arbitrary finite sequence of $k$ stages or $k$ events:
- **Combinatorial Form:** $N = \prod_{i=1}^k n_i = n_1 \cdot n_2 \cdots n_k$.
- **Probabilistic Chain Rule:** For events $A_1, A_2, \dots, A_k$ with $P(A_1 \cap \cdots \cap A_{k-1}) > 0$:
  $$P\left(\bigcap_{i=1}^k A_i\right) = P(A_1) \cdot P(A_2 \mid A_1) \cdot P(A_3 \mid A_1 \cap A_2) \cdots P\left(A_k \;\middle|\; \bigcap_{j=1}^{k-1} A_j\right)$$

## Key Definitions

- **Sequential Conditioning (Chain Rule):** At step $i$, the probability of $A_i$ is conditioned on the joint occurrence of **all** preceding events $A_1 \cap A_2 \cap \cdots \cap A_{i-1}$.
- **Mutual Independence Simplification:** If $A_1, \dots, A_k$ are mutually independent, every conditional probability $P(A_i \mid A_1 \cap \cdots \cap A_{i-1})$ simplifies to $P(A_i)$, yielding $P(\bigcap_{i=1}^k A_i) = \prod_{i=1}^k P(A_i)$.

## Worked Example

**Problem:** A batch of $12$ hard drives contains $9$ healthy drives and $3$ failing drives. Three drives are selected sequentially **without replacement**. What is the probability that all $3$ selected drives are healthy?

**Solution:**
Let $H_1, H_2, H_3$ be the events that the 1st, 2nd, and 3rd drives are healthy:
$$P(H_1 \cap H_2 \cap H_3) = P(H_1) \cdot P(H_2 \mid H_1) \cdot P(H_3 \mid H_1 \cap H_2) = \frac{9}{12} \times \frac{8}{11} \times \frac{7}{10} = \frac{504}{1320} = \frac{21}{55} \approx 0.3818$$

## Multiple Choice Questions

1. According to the probabilistic Generalized Multiplication (Chain) Rule for three events $A, B, C$, which expression equals $P(A \cap B \cap C)$?
    - **A)** $P(A) \cdot P(B \mid A) \cdot P(C \mid B)$
    - **B)** $P(A) \cdot P(B \mid A) \cdot P(C \mid A \cap B)$
    - **C)** $P(A) + P(B \mid A) + P(C \mid A \cap B)$
    - **D)** $P(A \mid B) \cdot P(B \mid C) \cdot P(C \mid A)$

2. Under what special assumption does $P(A \cap B \cap C) = P(A) \cdot P(B \mid A) \cdot P(C \mid B)$ (where $C$ depends only on $B$ and not on $A$ given $B$) hold?
    - **A)** When the sequence forms a first-order Markov chain (conditional independence of $C$ and $A$ given $B$, so $P(C \mid A \cap B) = P(C \mid B)$).
    - **B)** Always, for any three events.
    - **C)** When $A, B, C$ are mutually exclusive.
    - **D)** Never.

3. From a standard $52$-card deck, $3$ cards are dealt without replacement. Using the Generalized Multiplication Rule, what is the probability that all $3$ cards are Aces?
    - **A)** $\left(\frac{4}{52}\right)^3 = \frac{1}{2197}$
    - **B)** $\frac{4}{52} + \frac{3}{51} + \frac{2}{50}$
    - **C)** $\frac{4}{52} \times \frac{3}{51} \times \frac{2}{50} = \frac{24}{132,600} = \frac{1}{5525}$
    - **D)** $\frac{3}{52}$

4. How many ways can $10$ distinct runners be awarded Gold, Silver, Bronze, and 4th-place ribbons?
    - **A)** $10^4 = 10,000$
    - **B)** $4! = 24$
    - **C)** $\binom{10}{4} = 210$
    - **D)** $10 \times 9 \times 8 \times 7 = 5,040$

5. Why does the combinatorial ratio $\frac{\binom{9}{3}}{\binom{12}{3}}$ produce the exact same numerical answer ($\frac{21}{55}$) as the sequential chain rule $\frac{9}{12} \times \frac{8}{11} \times \frac{7}{10}$ in the worked example?
    - **A)** Because sampling is done with replacement.
    - **B)** Because $\frac{\binom{9}{3}}{\binom{12}{3}} = \frac{9!/(3!6!)}{12!/(3!9!)} = \frac{9 \times 8 \times 7}{12 \times 11 \times 10}$; the $3!$ factors cancel in the numerator and denominator whether order is tracked or ignored.
    - **C)** Because $9/12$ is a prime fraction.
    - **D)** It is a coincidence that only works for $k = 3$.

### Answer Key & Explanations

1. **B**. By induction on the two-event Multiplicative Rule, $P((A \cap B) \cap C) = P(A \cap B)P(C \mid A \cap B) = P(A)P(B \mid A)P(C \mid A \cap B)$.
2. **A**. In general, the third factor is $P(C \mid A \cap B)$. It reduces to $P(C \mid B)$ only under the Markov property (conditional independence of $C$ from $A$ given $B$).
3. **C**. Let $A_1, A_2, A_3$ be Aces on cards 1, 2, 3. Then $P(A_1 \cap A_2 \cap A_3) = \frac{4}{52} \times \frac{3}{51} \times \frac{2}{50} = \frac{1}{5525}$.
4. **D**. By the 4-stage Generalized Multiplication Principle without replacement, $10 \times 9 \times 8 \times 7 = P(10, 4) = 5,040$.
5. **B**. Tracking ordered 3-tuples multiplies both numerator and denominator of the unordered combination ratio by $3!$, which cancels identically.

## References & Navigation

- **Previous Topic:** [[Multiplication Rule]]
- **Next Topic:** [[Independent Events]]
- **Related Notes:** [[Multiplicative Rule]], [[Contingency Table]]
