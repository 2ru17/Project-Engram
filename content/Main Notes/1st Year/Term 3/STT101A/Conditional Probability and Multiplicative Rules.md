---
id: Conditional-Probability-and-Multiplicative-Rules
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Conditional Probability and Multiplicative Rules]]

---

## Overview

**Conditional Probability** and the **Multiplicative Rule** link the probability of joint intersections $P(A \cap B)$ with sequential conditioning $P(A)P(B \mid A)$. Together, they enable multi-stage probability tree analysis, sampling without replacement, and Bayesian inference.

## Key Definitions

- **Conditional Probability:** $P(B \mid A) = \frac{P(A \cap B)}{P(A)}$ for $P(A) > 0$.
- **General Multiplicative Rule:** $P(A \cap B) = P(A)P(B \mid A) = P(B)P(A \mid B)$.
- **Chain Rule for $n$ Events:** $P(A_1 \cap A_2 \cap \cdots \cap A_n) = P(A_1) P(A_2 \mid A_1) P(A_3 \mid A_1 \cap A_2) \cdots P(A_n \mid A_1 \cap \cdots \cap A_{n-1})$.
- **Law of Total Probability (2 Branches):** $P(B) = P(A)P(B \mid A) + P(A^c)P(B \mid A^c)$.

## Worked Example

**Problem:** A box of $20$ microprocessors contains $4$ defective units. Two processors are selected at random **without replacement**. Find (a) the probability that both are defective, and (b) the probability that the second is defective given the first was non-defective.

**Solution:**
- Let $D_1, D_2$ be the events that the 1st and 2nd processors are defective.
- (a) By the Multiplicative Rule: $P(D_1 \cap D_2) = P(D_1) P(D_2 \mid D_1) = \frac{4}{20} \times \frac{3}{19} = \frac{12}{380} = \frac{3}{95} \approx 0.0316$.
- (b) Given $D_1^c$ occurred ($1$ good unit removed), $4$ defective units remain among $19$ total units: $P(D_2 \mid D_1^c) = \frac{4}{19} \approx 0.2105$.

## Multiple Choice Questions

1. Which equation correctly states the general Multiplicative Rule for any two events $A$ and $B$ with $P(A) > 0$?
    - **A)** $P(A \cap B) = P(A) + P(B \mid A)$
    - **B)** $P(A \cap B) = P(A) \cdot P(B \mid A)$
    - **C)** $P(A \cap B) = \frac{P(B \mid A)}{P(A)}$
    - **D)** $P(A \cap B) = P(A \mid B) \cdot P(B \mid A)$

2. An urn contains $5$ red balls and $3$ blue balls. Two balls are drawn sequentially **without replacement**. What is the probability that the first ball is red and the second ball is blue, $P(R_1 \cap B_2)$?
    - **A)** $\frac{15}{56}$
    - **B)** $\frac{15}{64}$
    - **C)** $\frac{5}{14}$
    - **D)** $\frac{3}{8}$

3. For a fixed conditioning event $A$ with $P(A) > 0$, what does $P(B \mid A) + P(B^c \mid A)$ equal?
    - **A)** $P(A)$
    - **B)** $P(B) + P(B^c) - P(A)$
    - **C)** $1$
    - **D)** $0$

4. Why is $P(B \mid A) + P(B \mid A^c)$ generally NOT equal to $1$?
    - **A)** Because $P(B)$ is always $0$.
    - **B)** Because $A$ and $A^c$ overlap.
    - **C)** Because conditional probabilities can exceed $1$.
    - **D)** Because $P(B \mid A)$ and $P(B \mid A^c)$ are probabilities evaluated on two different conditioning sample spaces ($A$ vs. $A^c$), not complementary events within the same conditioning space.

5. Given $P(A) = 0.40$, $P(B \mid A) = 0.50$, and $P(B \mid A^c) = 0.20$, what is the unconditional probability $P(B)$?
    - **A)** $0.70$
    - **B)** $0.32$
    - **C)** $0.20$
    - **D)** $0.12$

### Answer Key & Explanations

1. **B**. Cross-multiplying the definition $P(B \mid A) = \frac{P(A \cap B)}{P(A)}$ yields the general Multiplicative Rule $P(A \cap B) = P(A) \cdot P(B \mid A)$.
2. **A**. $P(R_1) = \frac{5}{8}$. Given a red ball was removed first, $3$ blue balls remain out of $7$ total balls, so $P(B_2 \mid R_1) = \frac{3}{7}$. Multiplying gives $\frac{5}{8} \times \frac{3}{7} = \frac{15}{56}$.
3. **C**. $P(\cdot \mid A)$ is a valid probability measure on the reduced sample space $A$. Since $B$ and $B^c$ partition $A$ into $(A \cap B)$ and $(A \cap B^c)$, $P(B \mid A) + P(B^c \mid A) = \frac{P(A \cap B) + P(A \cap B^c)}{P(A)} = \frac{P(A)}{P(A)} = 1$.
4. **D**. Complements must share the *same* conditioning event: $P(B \mid A) + P(B^c \mid A) = 1$, whereas $P(B \mid A)$ and $P(B \mid A^c)$ condition on different sets $A$ and $A^c$.
5. **B**. By the Law of Total Probability and the Multiplicative Rule, $P(B) = P(A)P(B \mid A) + P(A^c)P(B \mid A^c) = (0.40)(0.50) + (0.60)(0.20) = 0.20 + 0.12 = 0.32$.

## References & Navigation

- **Previous Topic:** [[Complementary Rule]]
- **Next Topic:** [[Conditional Probability]]
- **Related Notes:** [[Multiplicative Rule]], [[Additive Rule]]
