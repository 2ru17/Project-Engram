---
id: Types-of-Event-Operations
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Types of Event Operations]]

---

## Overview

Because events are subsets of the sample space $S$, **Event Operations** correspond directly to set-theoretic operations—**Union** ($\cup$), **Intersection** ($\cap$), **Complement** ($^c$), **Set Difference** ($\setminus$), and **Symmetric Difference** ($\triangle$)—as well as propositional logic connectives (`OR`, `AND`, `NOT`, `XOR`).

## Key Definitions

| Verbal Event Statement | Set Operation | Probability Formula |
| :--- | :---: | :--- |
| **At least one of $A$ or $B$** | $A \cup B$ | $P(A) + P(B) - P(A \cap B)$ |
| **Both $A$ and $B$** | $A \cap B$ | $P(A)P(B \mid A)$ |
| **Not $A$** | $A^c$ | $1 - P(A)$ |
| **$A$ occurs, but NOT $B$ ($A$ only)** | $A \setminus B = A \cap B^c$ | $P(A) - P(A \cap B)$ |
| **Exactly one of $A$ or $B$** | $A \triangle B = (A \cap B^c) \cup (A^c \cap B)$ | $P(A) + P(B) - 2P(A \cap B)$ |
| **Neither $A$ nor $B$** | $(A \cup B)^c = A^c \cap B^c$ | $1 - P(A \cup B)$ |

- **Algebraic Laws:** Commutative, Associative, Distributive ($A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$), and De Morgan's Laws ($(A \cup B)^c = A^c \cap B^c$ and $(A \cap B)^c = A^c \cup B^c$).

## Worked Example

**Problem:** Given $P(A) = 0.50$, $P(B) = 0.40$, and $P(A \cap B) = 0.15$, find:
1. $P(\text{A only}) = P(A \cap B^c) = P(A) - P(A \cap B) = 0.50 - 0.15 = 0.35$.
2. $P(\text{Exactly one of A or B}) = P(A) + P(B) - 2P(A \cap B) = 0.50 + 0.40 - 2(0.15) = 0.60$.

## Multiple Choice Questions

1. Which set expression and probability formula represent the event **"Event $A$ occurs, but Event $B$ does NOT occur"** ($A$ only)?
    - **A)** $A \cup B^c$; $P(A) + P(B^c)$
    - **B)** $A \cap B^c = A \setminus B$; $P(A) - P(A \cap B)$
    - **C)** $(A \cap B)^c$; $1 - P(A \cap B)$
    - **D)** $A \cap B$; $P(A) - P(B)$

2. Why is the probability of **exactly one** of $A$ or $B$ occurring ($A \triangle B$) given by $P(A) + P(B) - 2P(A \cap B)$ instead of $P(A) + P(B) - P(A \cap B)$?
    - **A)** Because in the union $A \cup B$, we want to count the overlap $A \cap B$ once (so we subtract $P(A \cap B)$ once); whereas for *exactly one* ($A \triangle B$), outcomes in the overlap $A \cap B$ must be excluded completely (0 times), so having counted them twice in $P(A) + P(B)$, we must subtract $2P(A \cap B)$.
    - **B)** Because $P(A \cap B)$ is negative.
    - **C)** Because $A \triangle B = S$.
    - **D)** Because $2P(A \cap B)$ always equals $1$.

3. Given $P(A) = 0.60$, $P(B) = 0.35$, and $P(A \cap B) = 0.20$, what is the probability that **exactly one** of the events $A$ or $B$ occurs?
    - **A)** $0.75$
    - **B)** $0.40$
    - **C)** $0.55$
    - **D)** $0.15$

4. By the **Distributive Law** of event operations, what is $A \cap (B \cup C)$ equal to?
    - **A)** $(A \cup B) \cap (A \cup C)$
    - **B)** $A \cup B \cup C$
    - **C)** $A \cap B \cap C$
    - **D)** $(A \cap B) \cup (A \cap C)$

5. Which two disjoint events partition any event $A$ relative to another event $B$, proving the identity $P(A) = P(A \cap B) + P(A \cap B^c)$?
    - **A)** $A \cup B$ and $A \cup B^c$
    - **B)** $(A \cap B)$ and $(A \cap B^c)$
    - **C)** $A$ and $B$
    - **D)** $A^c$ and $B^c$

### Answer Key & Explanations

1. **B**. Since $A = (A \cap B) \cup (A \cap B^c)$ is a disjoint union, $P(A) = P(A \cap B) + P(A \cap B^c)$, which rearranges to $P(A \cap B^c) = P(A) - P(A \cap B)$.
2. **A**. Symmetric difference $A \triangle B = (A \cap B^c) \cup (A^c \cap B)$ is the disjoint union of "$A$ only" ($P(A) - P(A \cap B)$) and "$B$ only" ($P(B) - P(A \cap B)$), whose sum is $P(A) + P(B) - 2P(A \cap B)$.
3. **C**. $P(A \triangle B) = P(A) + P(B) - 2P(A \cap B) = 0.60 + 0.35 - 2(0.20) = 0.95 - 0.40 = 0.55$.
4. **D**. Intersection distributes over union: $A \cap (B \cup C) = (A \cap B) \cup (A \cap C)$.
5. **B**. Since $B$ and $B^c$ partition $S$, intersecting with $A$ partitions $A$ into two mutually exclusive subsets $(A \cap B)$ and $(A \cap B^c)$.

## References & Navigation

- **Previous Topic:** [[Event]]
- **Next Topic:** [[Union]]
- **Related Notes:** [[intersection]], [[Sample Space]]
