---
id: Random-Variable
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Random Variable]]

---

## Overview

A **Random Variable** $X$ is **neither random nor a variable** in the algebraic sense: formally, it is a deterministic **real-valued function** $X : S \to \mathbb{R}$ defined on a sample space $S$ that maps every elementary outcome $\omega \in S$ to a unique real number $X(\omega) \in \mathbb{R}$. Randomness enters through the underlying probability measure $P$ on $S$.

## Key Definitions

- **Function Mapping:** $X : S \to \mathbb{R}$, assigning a numerical value $X(\omega)$ to each outcome $\omega \in S$.
- **Inverse Image (Pre-image) Probability:** For any subset $B \subseteq \mathbb{R}$, the induced probability is:
  $$P(X \in B) = P(\{\omega \in S : X(\omega) \in B\}) = P(X^{-1}(B))$$
- **Notation Convention:** Uppercase letters ($X, Y, Z$) denote the random variable (the function), while lowercase letters ($x, y, z$) denote specific numerical values in its range/support.

## Worked Example

**Problem:** Flip a fair coin $3$ times, so $S = \{HHH, HHT, HTH, THH, HTT, THT, TTH, TTT\}$ ($|S| = 8$). Let $X(\omega)$ be the number of Heads in outcome $\omega$.
- $X(TTT) = 0 \implies P(X = 0) = \frac{1}{8}$
- $X(HTT) = X(THT) = X(TTH) = 1 \implies P(X = 1) = \frac{3}{8}$
- $X(HHT) = X(HTH) = X(THH) = 2 \implies P(X = 2) = \frac{3}{8}$
- $X(HHH) = 3 \implies P(X = 3) = \frac{1}{8}$

## Multiple Choice Questions

1. In mathematical probability theory, what is the formal definition of a **random variable** $X$?
    - **A)** An unknown constant between $0$ and $1$.
    - **B)** A measurable function $X : S \to \mathbb{R}$ that assigns a real number $X(\omega)$ to every elementary outcome $\omega$ in the sample space $S$.
    - **C)** A subset of the real numbers that sums to $1$.
    - **D)** Any event with probability $0.5$.

2. In the $3$-coin-toss worked example where $X(\omega)$ counts the number of Heads, what is the pre-image event $X^{-1}(\{2\}) = \{\omega \in S : X(\omega) = 2\}$?
    - **A)** $\{HHT, HTH, THH\}$
    - **B)** $\{HHH, HHT\}$
    - **C)** $\{2\}$
    - **D)** $\{HTT, THT, TTH\}$

3. Why do we follow the typographical convention of writing $P(X = x)$ with an uppercase $X$ and a lowercase $x$?
    - **A)** Uppercase $X$ is the sample space and lowercase $x$ is the probability.
    - **B)** Uppercase $X$ is continuous and lowercase $x$ is discrete.
    - **C)** Uppercase $X$ represents the random variable (the function on $S$), while lowercase $x$ represents a specific fixed real number in its support.
    - **D)** They mean the exact same thing and are interchangeable.

4. Can two different outcomes $\omega_1 \ne \omega_2$ in the sample space $S$ map to the **same** numerical value $X(\omega_1) = X(\omega_2)$?
    - **A)** No, a random variable must be a one-to-one (injective) function.
    - **B)** Only for continuous random variables.
    - **C)** Only when $P(\omega_1) = 0$.
    - **D)** Yes; a random variable is generally a many-to-one function (for example, $X(HT) = 1$ and $X(TH) = 1$), and $P(X = x)$ sums the probabilities of all outcomes $\omega \in S$ that map to $x$.

5. Can we define **more than one** random variable on the exact same sample space $S$?
    - **A)** No, each sample space allows only a single random variable.
    - **B)** Yes; for instance, when rolling two dice ($|S| = 36$), we can simultaneously define $X((d_1, d_2)) = d_1 + d_2$ (the sum) and $Y((d_1, d_2)) = |d_1 - d_2|$ (the absolute difference) on the same $S$.
    - **C)** Only if the random variables are mutually exclusive.
    - **D)** Only if $|S|$ is infinite.

### Answer Key & Explanations

1. **B**. A random variable is a real-valued function $X : S \to \mathbb{R}$ whose domain is the sample space $S$ and whose codomain is $\mathbb{R}$.
2. **A**. The outcomes in $S$ containing exactly $2$ Heads and $1$ Tail are $HHT, HTH,$ and $THH$.
3. **C**. Distinguishing the random variable $X$ (function) from its realized value $x \in \mathbb{R}$ prevents ambiguity in expressions like $F_X(x) = P(X \le x)$.
4. **D**. Because $X$ is a function, each $\omega \in S$ maps to a unique real number, but many distinct outcomes $\omega$ can share the same value $x$; the pre-image $X^{-1}(\{x\})$ collects all such outcomes.
5. **B**. Any number of real-valued functions $X, Y, Z : S \to \mathbb{R}$ can be defined on the same sample space $S$ to measure different numerical attributes of the outcome.

## References & Navigation

- **Previous Topic:** [[Bayes's Formula]]
- **Next Topic:** [[Random Variables]]
- **Related Notes:** [[Discrete Probability Distribution]], [[Bayes's Rules]]
