---
id: Statistical-Experiment
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Statistical Experiment]]

---

## Overview

A **Statistical (Random) Experiment** is any well-defined process or observation whose outcome cannot be predicted with certainty before it is performed, even though the complete set of all possible outcomes (the sample space $S$) is known in advance.

## Key Definitions

- **Three Defining Characteristics of a Statistical Experiment:**
  1. **Well-Defined:** The experimental procedure and the set of all possible elementary outcomes ($S$) are completely specified before the trial.
  2. **Non-Deterministic (Uncertain Single Trial):** On any individual trial, the exact outcome $\omega \in S$ cannot be predicted with certainty.
  3. **Repeatable with Statistical Regularity:** Under identical conditions, the experiment can (at least conceptually) be repeated, and long-run relative frequencies stabilize toward fixed probabilities.
- **Deterministic vs. Statistical Experiment:** Compiling a fixed source file with a deterministic compiler always yields the exact same binary (deterministic); measuring network packet latency across the Internet yields fluctuating values on each trial (statistical).
- **Trial:** A single execution or realization of a statistical experiment, producing exactly one outcome $\omega \in S$.

## Worked Example

**Problem:** Classify each process below as a **Deterministic** or **Statistical** experiment:
1. Calculating $\sqrt{144}$ on a calculator $\to$ **Deterministic** (always $12$, no uncertainty).
2. Measuring the number of bit flips caused by cosmic rays in satellite DRAM over a 24-hour period $\to$ **Statistical** ($S = \{0, 1, 2, \dots\}$, uncertain single trial, follows a Poisson distribution).

## Multiple Choice Questions

1. What distinguishes a **statistical (random) experiment** from a **deterministic experiment**?
    - **A)** A statistical experiment has no known sample space.
    - **B)** In a deterministic experiment, identical initial conditions guarantee a unique, predictable outcome; in a statistical experiment, the set of possible outcomes $S$ is known, but which specific outcome $\omega \in S$ will occur on a single trial is uncertain.
    - **C)** A statistical experiment can only be performed once.
    - **D)** Deterministic experiments always involve coins or dice.

2. In probability terminology, what is a single performance or realization of a statistical experiment called, and how many elementary outcomes $\omega \in S$ does it produce?
    - **A)** A **trial**; it produces **exactly one** elementary outcome $\omega \in S$.
    - **B)** An event; it produces all outcomes in $S$ simultaneously.
    - **C)** A partition; it produces zero outcomes.
    - **D)** A parameter; it produces two outcomes.

3. Which of the following is a valid **statistical experiment**?
    - **A)** Evaluating $2 + 2$ in standard arithmetic.
    - **B)** Looking up the ASCII code of the character `'A'`.
    - **C)** Recording the time until failure of a newly manufactured solid-state drive under a stress test.
    - **D)** Computing the determinant of a fixed $2 \times 2$ matrix $\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}$.

4. Even though each individual trial of a statistical experiment is unpredictable, what property makes mathematical probability and statistics possible across many trials?
    - **A)** All outcomes become deterministic after 10 trials.
    - **B)** Every outcome eventually stops occurring.
    - **C)** The sample space shrinks after each trial.
    - **D)** Statistical regularity (the Law of Large Numbers): long-run relative frequencies of events stabilize around fixed theoretical probabilities as the number of trials grows.

5. What is the complete mathematical triple $(\Omega, \mathcal{F}, P)$ used to formalize any statistical experiment in modern probability (Kolmogorov's framework)?
    - **A)** Mean, Median, and Mode
    - **B)** A **Probability Space** consisting of the Sample Space $\Omega$ (or $S$), the Event Space ($\sigma$-algebra $\mathcal{F}$), and the Probability Measure $P$.
    - **C)** Permutation, Combination, and Factorial
    - **D)** Prior, Likelihood, and Posterior

### Answer Key & Explanations

1. **B**. A statistical experiment has a well-defined sample space $S$ of possible outcomes, but uncontrolled micro-variations or intrinsic randomness make the outcome of any single trial uncertain.
2. **A**. Each execution of the experiment is a **trial**, and because elementary outcomes in $S$ are mutually exclusive and exhaustive, one trial yields exactly one $\omega \in S$.
3. **C**. Component time-to-failure varies unpredictably from unit to unit over $S = [0, \infty)$, whereas the other three options are fixed mathematical constants.
4. **D**. While single trials are unpredictable, aggregate behavior over large $n$ exhibits stable, predictable probability distributions.
5. **B**. Andrey Kolmogorov formalized every statistical experiment as a probability space $(\Omega, \mathcal{F}, P)$: sample space $\Omega$, event collection $\mathcal{F} \subseteq \mathcal{P}(\Omega)$, and probability measure $P : \mathcal{F} \to [0,1]$.

## References & Navigation

- **Next Topic:** [[Sample Space]]
- **Related Notes:** [[Event]]
