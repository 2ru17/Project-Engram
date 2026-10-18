---
id: Multiplicative-Rule
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Multiplicative Rule]]

---

## Overview

In probability theory, the **Multiplicative Rule of Probability** determines the probability of the intersection of two or more events, $P(A \cap B)$. It comes in two forms: the **General Multiplicative Rule** (for any events, using conditional probability) and the **Special Multiplicative Rule** (for independent events).

## Key Definitions

- **General Multiplicative Rule (Dependent or Independent Events):**
  $$P(A \cap B) = P(A) P(B \mid A) = P(B) P(A \mid B)$$
- **Special Multiplicative Rule (Independent Events Only):** If and only if $A$ and $B$ are independent:
  $$P(A \cap B) = P(A) P(B)$$
- **Extension to $k$ Independent Events:** If $A_1, A_2, \dots, A_k$ are mutually independent, $P(A_1 \cap A_2 \cap \cdots \cap A_k) = \prod_{i=1}^k P(A_i)$.

## Worked Example

**Problem:** Contrast drawing $2$ Aces from a $52$-card deck (a) **with replacement** vs. (b) **without replacement**.

**Solution:**
- **(a) With Replacement (Independent):** Special Multiplicative Rule applies: $P(A_1 \cap A_2) = P(A_1)P(A_2) = \frac{4}{52} \times \frac{4}{52} = \frac{1}{169} \approx 0.00592$.
- **(b) Without Replacement (Dependent):** General Multiplicative Rule applies: $P(A_1 \cap A_2) = P(A_1)P(A_2 \mid A_1) = \frac{4}{52} \times \frac{3}{51} = \frac{1}{221} \approx 0.00452$.

## Multiple Choice Questions

1. When is it valid to use the Special Multiplicative Rule $P(A \cap B) = P(A)P(B)$ instead of $P(A \cap B) = P(A)P(B \mid A)$?
    - **A)** Whenever $A$ and $B$ are mutually exclusive.
    - **B)** If and only if $A$ and $B$ are statistically independent (so $P(B \mid A) = P(B)$).
    - **C)** Whenever $P(A) + P(B) = 1$.
    - **D)** Only when sampling without replacement.

2. A box contains $6$ working cables and $4$ broken cables. Two cables are selected **without replacement**. What is the probability that both cables are broken?
    - **A)** $\frac{4}{10} \times \frac{4}{10} = \frac{4}{25} = 0.16$
    - **B)** $\frac{4}{10} \times \frac{3}{9} = \frac{12}{90} = \frac{2}{15} \approx 0.1333$
    - **C)** $\frac{4}{10} + \frac{3}{9}$
    - **D)** $\frac{6}{10} \times \frac{4}{9}$

3. Using the same box ($6$ working, $4$ broken, drawn without replacement), what is the probability that the **first is working** and the **second is broken**?
    - **A)** $\frac{6}{10} \times \frac{4}{9} = \frac{24}{90} = \frac{4}{15}$
    - **B)** $\frac{6}{10} \times \frac{4}{10} = \frac{6}{25}$
    - **C)** $\frac{6}{10} \times \frac{5}{9} = \frac{1}{3}$
    - **D)** $\frac{8}{15}$

4. Three independent components in a series system have reliability probabilities $0.90, 0.90,$ and $0.80$. Because the system functions only if **all three** components function, what is the system reliability?
    - **A)** $0.90 + 0.90 + 0.80 = 2.60$
    - **B)** $0.90 \times 0.90 \times 0.80 = 0.648$
    - **C)** $1 - (0.10)(0.10)(0.20) = 0.998$
    - **D)** $0.80$

5. Why does a parallel redundant system of those same three independent components fail only with probability $(0.10)(0.10)(0.20) = 0.002$?
    - **A)** Because a parallel system fails if and only if Component 1 fails **AND** Component 2 fails **AND** Component 3 fails, and by independence $P(F_1 \cap F_2 \cap F_3) = P(F_1)P(F_2)P(F_3)$.
    - **B)** Because parallel components are mutually exclusive.
    - **C)** Because the Additive Rule multiplies failure probabilities.
    - **D)** Because $0.90 - 0.80 = 0.10$.

### Answer Key & Explanations

1. **B**. The general rule $P(A \cap B) = P(A)P(B \mid A)$ reduces to $P(A)P(B)$ if and only if $P(B \mid A) = P(B)$, which is the definition of statistical independence.
2. **B**. By the General Multiplicative Rule without replacement: $P(B_1 \cap B_2) = P(B_1)P(B_2 \mid B_1) = \frac{4}{10} \times \frac{3}{9} = \frac{2}{15}$.
3. **A**. $P(W_1 \cap B_2) = P(W_1)P(B_2 \mid W_1) = \frac{6}{10} \times \frac{4}{9} = \frac{24}{90} = \frac{4}{15}$.
4. **B**. In a series system, all three independent components must succeed simultaneously: $P(C_1 \cap C_2 \cap C_3) = (0.90)(0.90)(0.80) = 0.648$.
5. **A**. Independence of $C_1, C_2, C_3$ implies independence of their complements $F_1, F_2, F_3$, so the joint failure probability is $(1-0.9)(1-0.9)(1-0.8) = (0.1)(0.1)(0.2) = 0.002$.

## References & Navigation

- **Previous Topic:** [[Conditional Probability]]
- **Next Topic:** [[Multiplication Rule]]
- **Related Notes:** [[Generalized Multiplication]], [[Conditional Probability and Multiplicative Rules]]
