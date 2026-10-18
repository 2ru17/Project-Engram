---
id: Additive-Rule
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Additive Rule]]

---

## Overview

The **Additive Rule of Probability** (also known as the Principle of Inclusion-Exclusion for two events) calculates the probability that at least one of two events $A$ or $B$ occurs, denoted $P(A \cup B)$. Because summing $P(A)$ and $P(B)$ counts outcomes in the overlap $A \cap B$ twice, the intersection probability $P(A \cap B)$ must be subtracted once.

## Key Definitions

- **Union ($A \cup B$):** The event that $A$ occurs, $B$ occurs, or both occur simultaneously.
- **General Additive Rule:** $P(A \cup B) = P(A) + P(B) - P(A \cap B)$ for any two events $A$ and $B$.
- **Special Additive Rule (Mutually Exclusive Events):** When $A \cap B = \emptyset$, $P(A \cap B) = 0$, simplifying the rule to $P(A \cup B) = P(A) + P(B)$.
- **Three-Event Inclusion-Exclusion:** $P(A \cup B \cup C) = P(A) + P(B) + P(C) - P(A \cap B) - P(A \cap C) - P(B \cap C) + P(A \cap B \cap C)$.

## Worked Example

**Problem:** In a university server cluster, $P(\text{High CPU}) = 0.35$, $P(\text{High Memory}) = 0.25$, and the probability of both occurring simultaneously is $P(\text{High CPU} \cap \text{High Memory}) = 0.12$. What is the probability that a server experiences at least one of these resource spikes?

**Solution:**
$$P(\text{CPU} \cup \text{Mem}) = 0.35 + 0.25 - 0.12 = 0.48$$

## Multiple Choice Questions

1. For any two events $A$ and $B$ in a sample space $S$, which formula gives the general Additive Rule?
    - **A)** $P(A \cup B) = P(A) \cdot P(B)$
    - **B)** $P(A \cup B) = P(A) + P(B) - P(A \cap B)$
    - **C)** $P(A \cup B) = P(A) + P(B) + P(A \cap B)$
    - **D)** $P(A \cup B) = P(A \mid B)P(B)$

2. Why must $P(A \cap B)$ be subtracted in the general Additive Rule?
    - **A)** Because probabilities cannot exceed $0.5$.
    - **B)** Because outcomes in $A \cap B$ are included in both $P(A)$ and $P(B)$, so they are double-counted if not subtracted once.
    - **C)** Because $A$ and $B$ are always mutually exclusive.
    - **D)** Because $P(A \cap B)$ represents outcomes outside the sample space.

3. Given $P(A) = 0.45$, $P(B) = 0.30$, and $P(A \cup B) = 0.60$, what is $P(A \cap B)$?
    - **A)** $0.75$
    - **B)** $0.15$
    - **C)** $0.135$
    - **D)** $0.00$

4. Under what condition does $P(A \cup B) = P(A) + P(B)$ hold exactly?
    - **A)** When $A$ and $B$ are statistically independent with non-zero probabilities.
    - **B)** When $A$ is a subset of $B$.
    - **C)** When $A$ and $B$ are mutually exclusive (disjoint), meaning $P(A \cap B) = 0$.
    - **D)** When $A$ and $B$ are complementary events only.

5. In the three-event Additive Rule for $P(A \cup B \cup C)$, why is $+P(A \cap B \cap C)$ added back at the end?
    - **A)** Because the triple intersection is added 3 times in the single terms and subtracted 3 times in the pairwise intersection terms, leaving it net uncounted ($3 - 3 = 0$).
    - **B)** Because three events cannot overlap pairwise.
    - **C)** To ensure the result exceeds $1$.
    - **D)** Because $P(A \cap B \cap C)$ is always equal to $P(A)P(B)P(C)$.

### Answer Key & Explanations

1. **B**. The general Additive Rule computes the probability of the union of two events by summing their marginal probabilities and subtracting their intersection once: $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.
2. **B**. Every sample point in $A \cap B$ belongs to both $A$ and $B$. Adding $P(A) + P(B)$ counts those shared outcomes twice, so subtracting $P(A \cap B)$ once restores an exact single count.
3. **B**. Rearranging the Additive Rule gives $P(A \cap B) = P(A) + P(B) - P(A \cup B) = 0.45 + 0.30 - 0.60 = 0.15$.
4. **C**. The subtraction term $-P(A \cap B)$ vanishes if and only if $P(A \cap B) = 0$, which is true when $A$ and $B$ are mutually exclusive (disjoint).
5. **A**. Outcomes in $A \cap B \cap C$ are counted $+3$ times in $P(A)+P(B)+P(C)$ and $-3$ times in $-P(A \cap B)-P(A \cap C)-P(B \cap C)$, so $+P(A \cap B \cap C)$ must be added back to count that region once.

## References & Navigation

- **Previous Topic:** [[Additive and Complementary Rules]]
- **Next Topic:** [[Complementary Rule]]
- **Related Notes:** [[Priori Probability]], [[Conditional Probability and Multiplicative Rules]]
