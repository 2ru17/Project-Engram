---
id: Conditional-Probability
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Conditional Probability]]

---

## Overview

**Conditional Probability**, denoted $P(A \mid B)$, measures the updated probability that event $A$ occurs given the partial knowledge that event $B$ has already occurred. Geometrically, conditioning on $B$ restricts the sample space from $S$ to $B$ and rescales all outcome probabilities within $B$ by $\frac{1}{P(B)}$.

## Key Definitions

- **Formal Definition:** For any two events $A$ and $B$ with $P(B) > 0$:
  $$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$$
- **Reduced Sample Space Interpretation:** When outcomes in $S$ are equally likely, $P(A \mid B) = \frac{|A \cap B|}{|B|}$.
- **Conditional Probability as a Measure:** For fixed $B$ with $P(B) > 0$, $Q(A) = P(A \mid B)$ satisfies all three Kolmogorov axioms: $P(A \mid B) \ge 0$, $P(S \mid B) = 1$, and $P(A_1 \cup A_2 \mid B) = P(A_1 \mid B) + P(A_2 \mid B)$ for disjoint $A_1, A_2$.

## Worked Example

**Problem:** A fair six-sided die is rolled. Given that the outcome is an **even** number ($B = \{2, 4, 6\}$), what is the conditional probability that the outcome is **greater than 3** ($A = \{4, 5, 6\}$)?

**Solution:**
- Intersection: $A \cap B = \{4, 6\}$, so $P(A \cap B) = \frac{2}{6}$ and $P(B) = \frac{3}{6}$.
- $P(A \mid B) = \frac{P(A \cap B)}{P(B)} = \frac{2/6}{3/6} = \frac{2}{3}$.

## Multiple Choice Questions

1. How does conditioning on event $B$ (with $P(B) > 0$) affect the sample space?
    - **A)** It expands the sample space to $S \cup B$.
    - **B)** It restricts the effective sample space to $B$ and normalizes intersection probabilities $P(A \cap B)$ by dividing by $P(B)$.
    - **C)** It sets $P(B) = 0$.
    - **D)** It makes $A$ and $B$ mutually exclusive.

2. If $P(A \cap B) = 0.18$ and $P(B) = 0.45$, what is $P(A \mid B)$?
    - **A)** $0.40$
    - **B)** $0.081$
    - **C)** $0.27$
    - **D)** $0.63$

3. Suppose event $A$ is a subset of event $B$ ($A \subseteq B$) and $P(B) > 0$. What is $P(A \mid B)$?
    - **A)** $1$
    - **B)** $0$
    - **C)** $\frac{P(A)}{P(B)}$
    - **D)** $P(A)$

4. Suppose event $B$ is a subset of event $A$ ($B \subseteq A$) and $P(B) > 0$. What is $P(A \mid B)$?
    - **A)** $\frac{P(B)}{P(A)}$
    - **B)** $P(A) - P(B)$
    - **C)** $0$
    - **D)** $1$

5. If $A$ and $B$ are mutually exclusive events with $P(B) > 0$, what is $P(A \mid B)$?
    - **A)** $P(A)$
    - **B)** $0$
    - **C)** $1 - P(B)$
    - **D)** Undefined

### Answer Key & Explanations

1. **B**. Knowing $B$ occurred eliminates all outcomes in $B^c$; only outcomes in $A \cap B$ can still yield $A$, and dividing by $P(B)$ ensures the restricted space sums to $1$ ($P(B \mid B) = 1$).
2. **A**. By definition, $P(A \mid B) = \frac{P(A \cap B)}{P(B)} = \frac{0.18}{0.45} = 0.40$.
3. **C**. When $A \subseteq B$, the intersection is $A \cap B = A$, so $P(A \mid B) = \frac{P(A \cap B)}{P(B)} = \frac{P(A)}{P(B)}$.
4. **D**. When $B \subseteq A$, every outcome in $B$ is automatically in $A$ ($A \cap B = B$). Thus $P(A \mid B) = \frac{P(B)}{P(B)} = 1$.
5. **B**. Mutually exclusive events have $A \cap B = \emptyset \implies P(A \cap B) = 0$. Since $P(B) > 0$, $P(A \mid B) = \frac{0}{P(B)} = 0$.

## References & Navigation

- **Previous Topic:** [[Conditional Probability and Multiplicative Rules]]
- **Next Topic:** [[Multiplicative Rule]]
- **Related Notes:** [[Complementary Rule]], [[Multiplication Rule]]
