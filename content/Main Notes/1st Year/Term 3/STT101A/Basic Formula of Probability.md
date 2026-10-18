---
id: Basic-Formula-of-Probability
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Basic Formula of Probability]]

---

## Overview

The **Classical (Laplacian) Formula of Probability** defines the probability of an event $E$ in a finite sample space $S$ of equally likely outcomes as the ratio of the number of outcomes favorable to $E$ to the total number of outcomes in $S$, grounded in **Kolmogorov's Three Axioms**.

## Key Definitions

- **Classical Probability Formula:** If a sample space $S$ consists of $N = |S|$ equally likely outcomes and event $E \subseteq S$ contains $n(E) = |E|$ outcomes, then $P(E) = \frac{n(E)}{n(S)} = \frac{|E|}{|S|}$.
- **Axiom 1 (Non-negativity):** $P(E) \ge 0$ for every event $E \subseteq S$.
- **Axiom 2 (Normalization):** $P(S) = 1$ for the entire sample space $S$.
- **Axiom 3 (Countable Additivity):** For any pairwise disjoint events $E_1, E_2, \dots$, $P\left(\bigcup_{i=1}^\infty E_i\right) = \sum_{i=1}^\infty P(E_i)$.

## Worked Example

**Problem:** Two fair six-sided dice are rolled. What is the probability that the sum of the two upward faces equals $8$?

**Solution:**
- Total equally likely ordered pairs in $S$: $n(S) = 6 \times 6 = 36$.
- Favorable outcomes summing to $8$: $E = \{(2,6), (3,5), (4,4), (5,3), (6,2)\}$, so $n(E) = 5$.
- $P(E) = \frac{5}{36} \approx 0.1389$.

## Multiple Choice Questions

1. Under what fundamental assumption is the classical formula $P(E) = \frac{|E|}{|S|}$ valid?
    - **A)** All events in the problem are independent.
    - **B)** The sample space $S$ is finite and all elementary outcomes in $S$ are equally likely (equiprobable).
    - **C)** The sample space $S$ is continuous and normally distributed.
    - **D)** The number of events equals 2.

2. Which of the following values CANNOT be a valid probability for any event $E$ under Kolmogorov's axioms?
    - **A)** $0$
    - **B)** $1$
    - **C)** $0.0001$
    - **D)** $-0.05$

3. Two fair six-sided dice are rolled. Using the classical formula, what is the probability that the sum of the dice is $7$?
    - **A)** $\frac{1}{6}$
    - **B)** $\frac{7}{36}$
    - **C)** $\frac{1}{12}$
    - **D)** $\frac{5}{36}$

4. From Kolmogorov's three axioms, why does the impossible event $\emptyset$ satisfy $P(\emptyset) = 0$?
    - **A)** Because $\emptyset$ and $S$ are disjoint with $S \cup \emptyset = S$, so $P(S) + P(\emptyset) = P(S) \implies P(\emptyset) = 0$.
    - **B)** Because $P(S) = 0$.
    - **C)** Because $\emptyset$ contains negative outcomes.
    - **D)** Because Axiom 1 states $P(E) < 0$.

5. A 4-bit binary string is generated uniformly at random. What is the probability that it contains exactly two $1$s?
    - **A)** $\frac{1}{4}$
    - **B)** $\frac{3}{8}$
    - **C)** $\frac{1}{2}$
    - **D)** $\frac{1}{16}$

### Answer Key & Explanations

1. **B**. The ratio $|E|/|S|$ assigns probability $1/|S|$ to each elementary outcome, which is valid if and only if the sample space is finite and every elementary outcome is equally likely.
2. **D**. By Axiom 1 ($P(E) \ge 0$) and the consequence $P(E) \le 1$, any valid probability must lie in the closed interval $[0, 1]$. $-0.05$ is negative and therefore impossible.
3. **A**. There are $36$ equally likely ordered pairs $(d_1, d_2)$ and $6$ pairs that sum to $7$: $\{(1,6),(2,5),(3,4),(4,3),(5,2),(6,1)\}$. Thus $P(\text{sum}=7) = 6/36 = 1/6$.
4. **A**. Since $S$ and $\emptyset$ are mutually exclusive and $S \cup \emptyset = S$, Axiom 3 gives $P(S \cup \emptyset) = P(S) + P(\emptyset) = P(S)$, which implies $P(\emptyset) = 0$.
5. **B**. There are $|S| = 2^4 = 16$ equally likely 4-bit strings and $\binom{4}{2} = 6$ strings with exactly two $1$s. Thus $P(E) = 6/16 = 3/8$.

## References & Navigation

- **Previous Topic:** [[Combinations]]
- **Next Topic:** [[Expected Event]]
- **Related Notes:** [[Relative Frequency Form]], [[Permutations]]
