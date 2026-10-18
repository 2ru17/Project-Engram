---
id: Mutually-Exclusive-Events
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Mutually Exclusive Events]]

---

## Overview

Two events $A$ and $B$ are **Mutually Exclusive** (or **Disjoint**) if they share no common outcomes in the sample space: $A \cap B = \emptyset$. Consequently, they **cannot occur simultaneously** on a single trial of an experiment, so $P(A \cap B) = 0$.

## Key Definitions

- **Disjoint Set Condition:** $A \cap B = \emptyset \implies P(A \cap B) = 0$.
- **Special Additive Rule:** For mutually exclusive events $A$ and $B$, $P(A \cup B) = P(A) + P(B)$.
- **Pairwise Mutually Exclusive Collection:** Events $E_1, E_2, \dots, E_k$ are mutually exclusive if $E_i \cap E_j = \emptyset$ for all $i \ne j$, giving $P\left(\bigcup_{i=1}^k E_i\right) = \sum_{i=1}^k P(E_i)$.
- **Mutually Exclusive vs. Independent:** Mutually exclusive is a **set-theoretic** property ($A \cap B = \emptyset$); independence is a **probabilistic** property ($P(A \cap B) = P(A)P(B)$). For $P(A), P(B) > 0$, they are opposites!

## Worked Example

**Problem:** A single card is drawn from a standard $52$-card deck. Let $A$ be drawing a **King** ($4$ cards), $B$ be drawing a **Queen** ($4$ cards), and $C$ be drawing a **Heart** ($13$ cards).
- $A$ and $B$ are **mutually exclusive** ($A \cap B = \emptyset$), so $P(A \cup B) = \frac{4}{52} + \frac{4}{52} = \frac{8}{52} = \frac{2}{13}$.
- $A$ and $C$ are **not** mutually exclusive because $A \cap C = \{\text{King of Hearts}\} \ne \emptyset$.

## Multiple Choice Questions

1. What does it mean geometrically in a Venn diagram for two events $A$ and $B$ to be **mutually exclusive**?
    - **A)** Circle $A$ is completely inside Circle $B$.
    - **B)** Circle $A$ and Circle $B$ do not overlap at all ($A \cap B = \emptyset$).
    - **C)** Circle $A$ and Circle $B$ cover the entire rectangle $S$.
    - **D)** Circle $A$ and Circle $B$ have equal areas.

2. If $A$ and $B$ are mutually exclusive events with $P(A) = 0.35$ and $P(B) = 0.45$, what are $P(A \cap B)$ and $P(A \cup B)$?
    - **A)** $P(A \cap B) = 0$ and $P(A \cup B) = 0.80$
    - **B)** $P(A \cap B) = 0.1575$ and $P(A \cup B) = 0.6425$
    - **C)** $P(A \cap B) = 0.80$ and $P(A \cup B) = 0$
    - **D)** $P(A \cap B) = 0.10$ and $P(A \cup B) = 0.70$

3. If $A$ and $B$ are mutually exclusive with $P(A) = 0.35$ and $P(B) = 0.45$, what is the conditional probability $P(A \mid B)$?
    - **A)** $0.35$
    - **B)** $\frac{0.35}{0.45} = \frac{7}{9}$
    - **C)** $0$
    - **D)** $0.80$

4. Why is it impossible for two mutually exclusive events $A$ and $B$ to have $P(A) = 0.65$ and $P(B) = 0.55$?
    - **A)** It is possible if they are dependent.
    - **B)** Because $0.65$ and $0.55$ are not equal.
    - **C)** Because $P(A) \cdot P(B)$ is less than $0.5$.
    - **D)** Because for mutually exclusive events, $P(A \cup B) = P(A) + P(B) = 1.20$, which violates the consequence of Kolmogorov's axioms that no event probability can exceed $1$.

5. On a single roll of a fair six-sided die, which pair of events is **mutually exclusive**?
    - **A)** Rolling an even number ($\{2,4,6\}$) and rolling a prime number ($\{2,3,5\}$)
    - **B)** Rolling a number less than $3$ ($\{1,2\}$) and rolling a number greater than $4$ ($\{5,6\}$)
    - **C)** Rolling an odd number ($\{1,3,5\}$) and rolling a multiple of $3$ ($\{3,6\}$)
    - **D)** Rolling a factor of $6$ ($\{1,2,3,6\}$) and rolling an even number ($\{2,4,6\}$)

### Answer Key & Explanations

1. **B**. Disjoint sets share no elements ($A \cap B = \emptyset$), represented in a Venn diagram by non-overlapping regions.
2. **A**. By mutual exclusivity, $P(A \cap B) = 0$ and $P(A \cup B) = P(A) + P(B) = 0.35 + 0.45 = 0.80$.
3. **C**. $P(A \mid B) = \frac{P(A \cap B)}{P(B)} = \frac{0}{0.45} = 0$: if $B$ occurred, $A$ cannot have occurred.
4. **D**. Since $A \cup B \subseteq S$, $P(A \cup B) \le P(S) = 1$. For disjoint events this forces $P(A) + P(B) \le 1$.
5. **B**. $\{1, 2\} \cap \{5, 6\} = \emptyset$, whereas all other pairs share at least one outcome ($2$, $3$, or $2$ and $6$).

## References & Navigation

- **Previous Topic:** [[Complement]]
- **Next Topic:** [[Counting Techniques]]
- **Related Notes:** [[intersection]], [[Fundamental Principle of Counting]]
