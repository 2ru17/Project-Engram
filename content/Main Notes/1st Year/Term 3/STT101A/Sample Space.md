---
id: Sample-Space
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Sample Space]]

---

## Overview

The **Sample Space** (denoted $S$ or $\Omega$) of a statistical experiment is the set of **all possible elementary outcomes** of that experiment. Every valid sample space must be both **mutually exclusive** (no two elementary outcomes can occur simultaneously on a single trial) and **collectively exhaustive** (every possible result of the experiment is represented by an element $\omega \in S$).

## Key Definitions

- **Sample Point (Elementary Outcome $\omega$):** A single indivisible element $\omega \in S$.
- **Finite Sample Space:** Contains a finite number of outcomes $|S| = N < \infty$ (e.g., rolling two dice has $|S| = 36$).
- **Countably Infinite (Discrete) Sample Space:** Outcomes can be placed in one-to-one correspondence with $\mathbb{N} = \{1, 2, 3, \dots\}$ (e.g., tossing a coin until the first Head appears: $S = \{H, TH, TTH, TTTH, \dots\}$).
- **Uncountable (Continuous) Sample Space:** Outcomes fill a continuous interval or region of $\mathbb{R}^d$ (e.g., lifetime of a solid-state drive: $S = [0, \infty)$).

## Worked Example

**Problem:** Specify the sample space $S$ and its type for three experiments:
1. **Experiment 1:** Tossing a coin and rolling a 4-sided die:
   $$S_1 = \{(H,1), (H,2), (H,3), (H,4), (T,1), (T,2), (T,3), (T,4)\} \quad (\text{Finite discrete, } |S_1| = 8)$$
2. **Experiment 2:** Counting the number of packet retransmissions until a frame is acknowledged:
   $$S_2 = \{0, 1, 2, 3, \dots\} \quad (\text{Countably infinite discrete})$$
3. **Experiment 3:** Measuring the voltage across a resistor between $0\text{ V}$ and $5\text{ V}$:
   $$S_3 = [0, 5] = \{v \in \mathbb{R} : 0 \le v \le 5\} \quad (\text{Uncountable continuous})$$

## Multiple Choice Questions

1. What two properties must the elements of a valid **sample space** $S$ satisfy for any statistical experiment?
    - **A)** They must be statistically independent and numeric.
    - **B)** They must be mutually exclusive (only one elementary outcome occurs per trial) and collectively exhaustive (every conceivable outcome of the experiment is included in $S$).
    - **C)** There must always be a finite number of them, and all must have probability $1/|S|$.
    - **D)** They must sum to $0$.

2. If an experiment consists of tossing a fair coin repeatedly until the **first Head** appears and recording the toss number on which it occurs, what is the sample space $S$ and how is it classified?
    - **A)** $S = \{1, 2, 3, 4, \dots\} = \mathbb{Z}^+$, countably infinite discrete
    - **B)** $S = \{1, 2\}$, finite discrete
    - **C)** $S = [1, \infty)$, uncountable continuous
    - **D)** $S = \{H, T\}$, finite discrete

3. When rolling two fair six-sided dice and computing probabilities of their sum, why is it better to define the sample space as the $36$ ordered pairs $S = \{(d_1, d_2) : d_1, d_2 \in \{1,\dots,6\}\}$ rather than the $11$ possible sums $\{2, 3, \dots, 12\}$?
    - **A)** Because $\{2, 3, \dots, 12\}$ is not collectively exhaustive.
    - **B)** Because $11$ is a prime number.
    - **C)** Because the $36$ ordered pairs $(d_1, d_2)$ are **equally likely** (each has probability $1/36$), whereas the $11$ sums are NOT equally likely ($P(\text{sum}=7) = 6/36$ while $P(\text{sum}=2) = 1/36$).
    - **D)** Because sums are continuous.

4. A box contains $4$ distinct microchips labeled $A, B, C, D$. If $2$ microchips are drawn **without replacement** and **order does not matter**, what is the cardinality $|S|$ of the sample space of unordered pairs?
    - **A)** $16$
    - **B)** $12$
    - **C)** $4$
    - **D)** $\binom{4}{2} = 6$

5. Which of the following experiments has an **uncountable (continuous)** sample space?
    - **A)** Recording the number of customers entering a bank in an 8-hour day.
    - **B)** Measuring the exact waiting time $t \in [0, \infty)$ (in real seconds) until the next customer arrives.
    - **C)** Drawing 5 cards from a 52-card deck.
    - **D)** Counting the number of syntax errors in a C program.

### Answer Key & Explanations

1. **B**. By definition, a sample space $S$ lists all distinct, non-overlapping elementary outcomes (mutually exclusive) such that every trial produces exactly one element $\omega \in S$ (collectively exhaustive).
2. **A**. The first Head can occur on toss $1, 2, 3, \dots$ with no finite upper bound, forming the countably infinite discrete set $\mathbb{Z}^+$.
3. **C**. While both sets are valid sample spaces, only the $36$ ordered pairs $(d_1, d_2)$ are symmetric and equiprobable, allowing direct use of the classical formula $P(E) = |E|/36$.
4. **D**. The unordered pairs are $\{\{A,B\}, \{A,C\}, \{A,D\}, \{B,C\}, \{B,D\}, \{C,D\}\}$, which has cardinality $\binom{4}{2} = 6$.
5. **B**. Exact waiting time $t \in [0, \infty)$ varies continuously over an uncountable interval of real numbers, whereas customer counts, card hands, and syntax error counts are discrete.

## References & Navigation

- **Previous Topic:** [[Statistical Experiment]]
- **Next Topic:** [[Event]]
- **Related Notes:** [[Types of Event Operations]]
