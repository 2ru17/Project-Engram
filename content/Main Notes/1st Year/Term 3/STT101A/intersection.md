---
id: intersection
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[intersection]]

---

## Overview

The **Intersection** of two events $A$ and $B$, denoted $A \cap B$ (or $AB$), is the event consisting of all outcomes $\omega \in S$ that belong to **both** $A$ and $B$ simultaneously (logical `AND`). In words, $A \cap B$ occurs on a trial if and only if both $A$ and $B$ occur on that trial.

## Key Definitions

- **Set Definition:** $A \cap B = \{\omega \in S : \omega \in A \text{ and } \omega \in B\}$.
- **Probability Bounds (Fréchet Bounds):** Since $A \cap B \subseteq A$ and $A \cap B \subseteq B$:
  $$\max(0, P(A) + P(B) - 1) \le P(A \cap B) \le \min(P(A), P(B))$$
- **Three Ways to Compute $P(A \cap B)$:**
  1. **From Union (Additive Rule Rearranged):** $P(A \cap B) = P(A) + P(B) - P(A \cup B)$.
  2. **From Conditional Probability (General Multiplicative Rule):** $P(A \cap B) = P(A)P(B \mid A) = P(B)P(A \mid B)$.
  3. **Under Independence:** $P(A \cap B) = P(A)P(B)$.

## Worked Example

**Problem:** Suppose $P(A) = 0.70$ and $P(B) = 0.60$. Find the tightest possible lower and upper bounds (Fréchet bounds) on $P(A \cap B)$ without knowing how $A$ and $B$ are related.

**Solution:**
- **Upper Bound:** Since $A \cap B \subseteq B$, $P(A \cap B) \le \min(0.70, 0.60) = 0.60$ (achieved when $B \subseteq A$).
- **Lower Bound (Bonferroni Inequality):** Since $P(A \cup B) \le 1$, $P(A \cap B) = P(A) + P(B) - P(A \cup B) \ge 0.70 + 0.60 - 1.00 = 0.30$.
- Thus $0.30 \le P(A \cap B) \le 0.60$.

## Multiple Choice Questions

1. What must occur on a single experimental trial for the intersection event $A \cap B$ to occur?
    - **A)** Either $A$ occurs or $B$ occurs, but not both.
    - **B)** **Both** event $A$ and event $B$ must occur simultaneously on that trial (the observed outcome $\omega$ satisfies $\omega \in A$ and $\omega \in B$).
    - **C)** Neither $A$ nor $B$ occurs.
    - **D)** Event $A$ occurs on Trial 1 and Event $B$ occurs on Trial 2.

2. Why must $P(A \cap B) \le \min(P(A), P(B))$ hold for **any** two events $A$ and $B$?
    - **A)** Because $A \cap B$ is a subset of $A$ ($A \cap B \subseteq A$) and also a subset of $B$ ($A \cap B \subseteq B$), and by monotonicity of probability, a subset cannot have a larger probability than its superset.
    - **B)** Because $P(A \cap B) = P(A)P(B)$ is always true.
    - **C)** Because $P(A) + P(B) \le 1$.
    - **D)** Because intersections are always empty.

3. A student calculates $P(A) = 0.40$, $P(B) = 0.55$, and $P(A \cap B) = 0.45$. How can you immediately tell that this calculation contains an error?
    - **A)** Because $P(A \cap B) = 0.45$ exceeds $P(A) = 0.40$, violating $P(A \cap B) \le \min(P(A), P(B))$.
    - **B)** Because $0.40 + 0.55 < 1$.
    - **C)** Because $0.45$ is an odd decimal.
    - **D)** The calculation is actually valid.

4. By **Bonferroni's Inequality**, if $P(A) = 0.80$ and $P(B) = 0.75$, what is the **minimum possible** value of $P(A \cap B)$?
    - **A)** $0.00$
    - **B)** $0.55$
    - **C)** $0.60$
    - **D)** $0.75$

5. If $A \subseteq B$, what do $A \cap B$ and $P(A \cap B)$ simplify to?
    - **A)** $B$ and $P(B)$
    - **B)** $A$ and $P(A)$
    - **C)** $\emptyset$ and $0$
    - **D)** $A^c$ and $1 - P(A)$

### Answer Key & Explanations

1. **B**. By set definition, $\omega \in A \cap B \iff (\omega \in A) \land (\omega \in B)$, meaning both events occur together on the trial.
2. **A**. Since $A = (A \cap B) \cup (A \cap B^c)$ is a disjoint union, $P(A) = P(A \cap B) + P(A \cap B^c) \ge P(A \cap B)$, and similarly $P(B) \ge P(A \cap B)$.
3. **A**. An intersection $A \cap B$ is contained inside $A$, so its probability can never exceed $P(A) = 0.40$ (it would imply $P(A \cap B^c) = 0.40 - 0.45 = -0.05 < 0$, violating Axiom 1).
4. **B**. Since $P(A \cup B) \le 1$, $P(A \cap B) = P(A) + P(B) - P(A \cup B) \ge 0.80 + 0.75 - 1.00 = 0.55$.
5. **B**. When every element of $A$ is already inside $B$, their common overlap is all of $A$: $A \cap B = A$ and $P(A \cap B) = P(A)$.

## References & Navigation

- **Previous Topic:** [[Union]]
- **Next Topic:** [[Complement]]
- **Related Notes:** [[Mutually Exclusive Events]], [[Types of Event Operations]]
