---
id: Additive-and-Complementary-Rules
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Additive and Complementary Rules]]

---

## Overview

Combining the **Additive Rule** and the **Complementary Rule** allows efficient computation of complex event probabilities—especially statements involving *"at least one"*, *"neither"*, or *"at most one"*—often bypassing tedious case-by-case enumeration.

## Key Definitions

- **Complementary Rule:** For any event $E$, $P(E^c) = 1 - P(E)$, since $E \cup E^c = S$ and $E \cap E^c = \emptyset$.
- **De Morgan's First Law (Neither $A$ nor $B$):** $(A \cup B)^c = A^c \cap B^c$, so $P(A^c \cap B^c) = 1 - P(A \cup B)$.
- **De Morgan's Second Law (Not both $A$ and $B$):** $(A \cap B)^c = A^c \cup B^c$, so $P(A^c \cup B^c) = 1 - P(A \cap B)$.

## Worked Example

**Problem:** Suppose $P(A) = 0.50$, $P(B) = 0.40$, and $P(A \cap B) = 0.20$. Find the probability that **neither** $A$ **nor** $B$ occurs, $P(A^c \cap B^c)$.

**Solution:**
1. First apply the Additive Rule: $P(A \cup B) = 0.50 + 0.40 - 0.20 = 0.70$.
2. By De Morgan's Law and the Complementary Rule: $P(A^c \cap B^c) = P((A \cup B)^c) = 1 - P(A \cup B) = 1 - 0.70 = 0.30$.

## Multiple Choice Questions

1. By De Morgan's Laws and the Complementary Rule, which expression is equivalent to $P(A^c \cap B^c)$?
    - **A)** $1 - P(A \cap B)$
    - **B)** $1 - P(A) - P(B)$
    - **C)** $1 - P(A \cup B)$
    - **D)** $P(A^c) + P(B^c)$

2. If $P(A) = 0.60$, $P(B) = 0.50$, and $P(A \cap B) = 0.30$, what is the probability that **neither** $A$ nor $B$ occurs?
    - **A)** $0.20$
    - **B)** $0.80$
    - **C)** $0.70$
    - **D)** $0.10$

3. What does the event $A^c \cup B^c$ represent in words, and how is its probability computed from $P(A \cap B)$?
    - **A)** Both $A$ and $B$ occur; $P(A \cap B)$
    - **B)** At least one of $A$ or $B$ does NOT occur (not both occur); $1 - P(A \cap B)$
    - **C)** Neither $A$ nor $B$ occurs; $1 - P(A \cup B)$
    - **D)** Exactly one of $A$ or $B$ occurs; $P(A) + P(B) - 2P(A \cap B)$

4. If $P(A) = 0.35$ and $P(B^c) = 0.60$, and $A$ and $B$ are mutually exclusive, what is $P(A \cup B)$?
    - **A)** $0.95$
    - **B)** $0.75$
    - **C)** $0.25$
    - **D)** $0.65$

5. Why is $P(\text{at least one success in } n \text{ trials})$ almost always computed as $1 - P(\text{zero successes})$?
    - **A)** Because the Additive Rule is invalid for more than 2 trials.
    - **B)** Because the complement of "at least one" ($\ge 1$) is the single outcome "none" ($0$), avoiding the inclusion-exclusion sum over $2^n - 1$ overlapping cases.
    - **C)** Because $P(\text{zero successes})$ is always $0$.
    - **D)** Because complements change dependent events into mutually exclusive events.

### Answer Key & Explanations

1. **C**. By De Morgan's Law, $A^c \cap B^c = (A \cup B)^c$. Applying the Complementary Rule yields $P((A \cup B)^c) = 1 - P(A \cup B)$.
2. **A**. First, $P(A \cup B) = 0.60 + 0.50 - 0.30 = 0.80$. Then $P(A^c \cap B^c) = 1 - P(A \cup B) = 1 - 0.80 = 0.20$.
3. **B**. By De Morgan's second law, $A^c \cup B^c = (A \cap B)^c$, which is the complement of both occurring simultaneously, so $P(A^c \cup B^c) = 1 - P(A \cap B)$.
4. **B**. Since $P(B^c) = 0.60$, the Complementary Rule gives $P(B) = 1 - 0.60 = 0.40$. Since $A$ and $B$ are mutually exclusive, $P(A \cup B) = P(A) + P(B) = 0.35 + 0.40 = 0.75$.
5. **B**. The event $X \ge 1$ is the complement of $X = 0$ in discrete counts. Computing $1 - P(X = 0)$ requires evaluating only one configuration instead of expanding inclusion-exclusion across $n$ events.

## References & Navigation

- **Previous Topic:** [[Priori Probability]]
- **Next Topic:** [[Additive Rule]]
- **Related Notes:** [[Relative Frequency Form]], [[Complementary Rule]]
