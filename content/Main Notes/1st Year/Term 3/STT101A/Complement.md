---
id: Complement
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Complement]]

---

## Overview

In set-theoretic probability, the **Complement** of an event $A$ (denoted $A^c$, $A'$, or $\overline{A}$) is the set of all outcomes in the sample space $S$ that are **not** in $A$. Every outcome in $S$ belongs to either $A$ or $A^c$, never both.

## Key Definitions

- **Set Definition:** $A^c = \{\omega \in S : \omega \notin A\} = S \setminus A$.
- **Partition Property:** $A \cup A^c = S$ (collectively exhaustive) and $A \cap A^c = \emptyset$ (mutually exclusive).
- **Involution Law:** $(A^c)^c = A$.
- **Boundary Complements:** $S^c = \emptyset$ and $\emptyset^c = S$.

## Worked Example

**Problem:** Let the sample space of rolling a fair die be $S = \{1, 2, 3, 4, 5, 6\}$, and let $A = \{2, 3, 5\}$ be the event of rolling a prime number. Find $A^c$ and $P(A^c)$.

**Solution:**
- $A^c = S \setminus A = \{1, 4, 6\}$ (note that $1$ is not prime).
- $P(A^c) = \frac{|A^c|}{|S|} = \frac{3}{6} = 0.50$.

## Multiple Choice Questions

1. For any event $A$ in sample space $S$, what are $A \cup A^c$ and $A \cap A^c$, respectively?
    - **A)** $\emptyset$ and $S$
    - **B)** $S$ and $\emptyset$
    - **C)** $A$ and $A^c$
    - **D)** $S$ and $S$

2. If $X$ is a discrete random variable counting the number of defective items in a batch of $10$, what is the complement of the event $A = \{X \ge 2\}$?
    - **A)** $\{X < 2\} = \{X = 0 \text{ or } X = 1\}$
    - **B)** $\{X \le 2\}$
    - **C)** $\{X = 0\}$
    - **D)** $\{X > 2\}$

3. Which statement is ALWAYS true about an event $A$ and its complement $A^c$?
    - **A)** $A$ and $A^c$ are always statistically independent when $0 < P(A) < 1$.
    - **B)** $P(A) = P(A^c) = 0.5$.
    - **C)** $A$ and $A^c$ are always mutually exclusive.
    - **D)** $A \subseteq A^c$.

4. What is the complement of $(A \cap B^c)$ according to De Morgan's Laws and double negation?
    - **A)** $A^c \cap B$
    - **B)** $A^c \cup B^c$
    - **C)** $A \cup B^c$
    - **D)** $A^c \cup B$

5. Why are two mutually exclusive events $A$ and $B$ NOT necessarily complements of each other?
    - **A)** Because complements must overlap.
    - **B)** Because mutually exclusive events satisfy $A \cap B = \emptyset$, whereas complements must ALSO be collectively exhaustive ($A \cup B = S$).
    - **C)** Because $P(A) + P(B)$ is always greater than $1$ for mutually exclusive events.
    - **D)** Because only three or more events can be complements.

### Answer Key & Explanations

1. **B**. An event and its complement partition the sample space: their union covers all of $S$ ($A \cup A^c = S$) and their intersection is empty ($A \cap A^c = \emptyset$).
2. **A**. The logical negation of $X \ge 2$ on non-negative integers is $X < 2$, which consists of the outcomes $X = 0$ and $X = 1$.
3. **C**. By definition, $A \cap A^c = \emptyset$, so $A$ and $A^c$ can never occur on the same trial and are always mutually exclusive.
4. **D**. Applying De Morgan's Law and involution: $(A \cap B^c)^c = A^c \cup (B^c)^c = A^c \cup B$.
5. **B**. All complementary pairs are mutually exclusive, but not all mutually exclusive pairs are complements: for example, rolling a $1$ and rolling a $2$ on a six-sided die are disjoint ($\{1\} \cap \{2\} = \emptyset$), but their union $\{1, 2\} \ne S$.

## References & Navigation

- **Previous Topic:** [[intersection]]
- **Next Topic:** [[Mutually Exclusive Events]]
- **Related Notes:** [[Union]], [[Counting Techniques]]
