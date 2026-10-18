---
id: Union
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Union]]

---

## Overview

The **Union** of two events $A$ and $B$, denoted $A \cup B$, is the event consisting of all outcomes $\omega \in S$ that belong to $A$, or to $B$, or to **both** $A$ and $B$ (inclusive `OR`). In words, $A \cup B$ occurs if and only if **at least one** of the events $A$ or $B$ occurs.

## Key Definitions

- **Set Definition:** $A \cup B = \{\omega \in S : \omega \in A \text{ or } \omega \in B\}$.
- **Countable Union ($\bigcup_{i=1}^n A_i$):** Occurs if and only if $\omega \in A_i$ for **at least one** index $i \in \{1, \dots, n\}$.
- **Monotonicity Property:** $A \subseteq A \cup B$ and $B \subseteq A \cup B$, so $\max(P(A), P(B)) \le P(A \cup B) \le \min(1, P(A) + P(B))$.
- **Boole's Inequality (Union Bound):** For any finite or countable sequence of events $A_1, A_2, \dots, A_n$:
  $$P\left(\bigcup_{i=1}^n A_i\right) \le \sum_{i=1}^n P(A_i)$$

## Worked Example

**Problem:** On a single roll of a fair six-sided die ($S = \{1, 2, 3, 4, 5, 6\}$), let $A = \{1, 2, 3\}$ and $B = \{2, 4, 6\}$. Find $A \cup B$ and $P(A \cup B)$.

**Solution:**
- Combining unique elements from both sets gives $A \cup B = \{1, 2, 3, 4, 6\}$.
- $P(A \cup B) = \frac{|A \cup B|}{|S|} = \frac{5}{6}$ (which matches $P(A) + P(B) - P(A \cap B) = \frac{3}{6} + \frac{3}{6} - \frac{1}{6} = \frac{5}{6}$ since $A \cap B = \{2\}$).

## Multiple Choice Questions

1. In probability and logic, does the union $A \cup B$ represent an **inclusive OR** or an **exclusive OR (XOR)**?
    - **A)** Exclusive OR (outcomes in $A \cap B$ are excluded).
    - **B)** **Inclusive OR**: an outcome $\omega$ is in $A \cup B$ if $\omega \in A$ only, $\omega \in B$ only, OR $\omega \in A \cap B$ (both).
    - **C)** Logical AND (only outcomes in both $A$ and $B$).
    - **D)** Logical NOT.

2. If $P(A) = 0.60$ and $P(B) = 0.50$, what are the **minimum possible** and **maximum possible** values of $P(A \cup B)$?
    - **A)** Minimum $= 0.60$ (when $B \subseteq A$), Maximum $= 1.00$ (when $A \cup B = S$)
    - **B)** Minimum $= 0.50$, Maximum $= 1.10$
    - **C)** Minimum $= 0.10$, Maximum $= 0.60$
    - **D)** Minimum $= 0.30$, Maximum $= 0.80$

3. What does **Boole's Inequality (the Union Bound)** state for any events $A_1, A_2, \dots, A_n$?
    - **A)** $P\left(\bigcup_{i=1}^n A_i\right) \ge \sum_{i=1}^n P(A_i)$
    - **B)** $P\left(\bigcup_{i=1}^n A_i\right) = \prod_{i=1}^n P(A_i)$
    - **C)** $P\left(\bigcup_{i=1}^n A_i\right) \le \sum_{i=1}^n P(A_i)$, with equality when the events are pairwise disjoint.
    - **D)** $P\left(\bigcup_{i=1}^n A_i\right) = 1$

4. If $A \subseteq B$ ($A$ is a subset of $B$), what do $A \cup B$ and $P(A \cup B)$ simplify to?
    - **A)** $A$ and $P(A)$
    - **B)** $S$ and $1$
    - **C)** $\emptyset$ and $0$
    - **D)** $B$ and $P(B)$

5. A system has $4$ subsystems whose individual failure probabilities are $0.01, 0.02, 0.01,$ and $0.03$ (with unknown dependencies between them). By the Union Bound, the probability that **at least one** subsystem fails is at most:
    - **A)** $0.01 \times 0.02 \times 0.01 \times 0.03$
    - **B)** $0.01 + 0.02 + 0.01 + 0.03 = 0.07$
    - **C)** $0.03$
    - **D)** $1.00$

### Answer Key & Explanations

1. **B**. Set union $A \cup B$ corresponds to inclusive disjunction (`OR`): it includes $(A \cap B^c)$, $(A^c \cap B)$, and $(A \cap B)$.
2. **A**. Because $A \subseteq A \cup B$, $P(A \cup B) \ge \max(P(A), P(B)) = 0.60$ (achieved when $B \subseteq A$). And since $A \cup B \subseteq S$, $P(A \cup B) \le \min(1, P(A)+P(B)) = \min(1, 1.10) = 1.00$.
3. **C**. Subtracting non-negative overlaps can only reduce or keep equal the sum of individual probabilities, so $P(\bigcup A_i) \le \sum P(A_i)$ always holds.
4. **D**. Every element of $A$ is already in $B$, so taking the union adds no new elements: $A \cup B = B$ and $P(A \cup B) = P(B)$.
5. **B**. By Boole's Inequality, $P(F_1 \cup F_2 \cup F_3 \cup F_4) \le P(F_1) + P(F_2) + P(F_3) + P(F_4) = 0.01 + 0.02 + 0.01 + 0.03 = 0.07$ regardless of how the failures are correlated.

## References & Navigation

- **Previous Topic:** [[Types of Event Operations]]
- **Next Topic:** [[intersection]]
- **Related Notes:** [[Complement]], [[Event]]
