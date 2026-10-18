---
id: Independent-Events
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Independent Events]]

---

## Overview

Two events $A$ and $B$ are **statistically independent** if the occurrence (or non-occurrence) of one provides zero information about the probability of the other. Formally, $A$ and $B$ are independent if and only if their joint probability equals the product of their marginal probabilities:
$$P(A \cap B) = P(A) \cdot P(B)$$

## Key Definitions

- **Product Criterion for Independence:** $P(A \cap B) = P(A)P(B)$ (valid even if $P(A)=0$ or $P(B)=0$).
- **Conditional Criterion:** When $P(B) > 0$, $P(A \mid B) = P(A)$; when $P(A) > 0$, $P(B \mid A) = P(B)$.
- **Complement Preservation:** If $A$ and $B$ are independent, then $(A, B^c)$, $(A^c, B)$, and $(A^c, B^c)$ are also independent pairs.
- **Mutual Independence ($3$ Events):** $A, B, C$ are mutually independent iff all pairwise products hold **AND** $P(A \cap B \cap C) = P(A)P(B)P(C)$.

## Worked Example

**Problem:** Two independent servers $S_1$ and $S_2$ have uptime probabilities $P(S_1) = 0.90$ and $P(S_2) = 0.95$. Find (a) the probability that both are up, and (b) the probability that at least one is up.

**Solution:**
- (a) $P(S_1 \cap S_2) = P(S_1)P(S_2) = 0.90 \times 0.95 = 0.855$.
- (b) $P(S_1 \cup S_2) = 1 - P(S_1^c \cap S_2^c) = 1 - P(S_1^c)P(S_2^c) = 1 - (0.10)(0.05) = 1 - 0.005 = 0.995$.

## Multiple Choice Questions

1. Which equation is the universal definition of statistical independence for two events $A$ and $B$?
    - **A)** $P(A \cap B) = 0$
    - **B)** $P(A \cap B) = P(A) \cdot P(B)$
    - **C)** $P(A \cup B) = P(A) + P(B)$
    - **D)** $P(A \mid B) = P(B \mid A)$

2. Suppose $P(A) = 0.40$ and $P(B) = 0.50$. If $A$ and $B$ are **independent**, what is $P(A \cup B)$?
    - **A)** $0.70$
    - **B)** $0.90$
    - **C)** $0.20$
    - **D)** $0.10$

3. Can two events $A$ and $B$ with $P(A) > 0$ and $P(B) > 0$ be **both** mutually exclusive and statistically independent?
    - **A)** Yes, mutually exclusive events are always independent.
    - **B)** Yes, whenever $P(A) + P(B) = 1$.
    - **C)** No; if $A$ and $B$ are mutually exclusive, $P(A \cap B) = 0$, whereas independence requires $P(A \cap B) = P(A)P(B) > 0$, a contradiction (knowing $B$ occurred forces $P(A \mid B) = 0 \ne P(A)$).
    - **D)** Only when $P(A) = P(B) = 0.5$.

4. If $A$ and $B$ are independent events with $P(A) = 0.30$ and $P(B) = 0.60$, what is $P(A^c \cap B^c)$?
    - **A)** $0.10$
    - **B)** $0.82$
    - **C)** $0.18$
    - **D)** $0.28$

5. Does **pairwise independence** of three events $A, B, C$ automatically guarantee **mutual independence** of $A, B, C$?
    - **A)** Yes, pairwise independence always implies mutual independence.
    - **B)** No; three events can satisfy $P(A \cap B)=P(A)P(B)$, $P(A \cap C)=P(A)P(C)$, and $P(B \cap C)=P(B)P(C)$ while still failing $P(A \cap B \cap C) = P(A)P(B)P(C)$ (e.g., Bernstein's coin-toss counterexample).
    - **C)** Only when $P(A) = P(B) = P(C) = 1/3$.
    - **D)** Pairwise independence is stronger than mutual independence.

### Answer Key & Explanations

1. **B**. Two events are independent by definition if and only if $P(A \cap B) = P(A)P(B)$.
2. **A**. Since $A$ and $B$ are independent, $P(A \cap B) = (0.40)(0.50) = 0.20$. Then $P(A \cup B) = P(A) + P(B) - P(A \cap B) = 0.40 + 0.50 - 0.20 = 0.70$.
3. **C**. Disjoint events with positive probability have maximal negative dependence: if one occurs, the other is impossible ($P(A \mid B) = 0 \ne P(A)$).
4. **D**. Independence of $A$ and $B$ implies independence of $A^c$ and $B^c$, so $P(A^c \cap B^c) = P(A^c)P(B^c) = (1 - 0.30)(1 - 0.60) = (0.70)(0.40) = 0.28$.
5. **B**. Mutual independence of 3 events requires 4 equations (3 pairwise products plus the triple product $P(A \cap B \cap C) = P(A)P(B)P(C)$). Pairwise independence alone does not imply the triple product.

## References & Navigation

- **Previous Topic:** [[Generalized Multiplication]]
- **Next Topic:** [[Contingency Table]]
- **Related Notes:** [[Multiplication Rule]], [[Partition of  Sample Space]]
