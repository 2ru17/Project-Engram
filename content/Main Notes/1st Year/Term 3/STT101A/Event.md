---
id: Event
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Event]]

---

## Overview

In probability theory, an **Event** is any subset $E$ of the sample space $S$ ($E \subseteq S$) to which a probability is assigned. An event **occurs** on a given trial of a statistical experiment if and only if the observed elementary outcome $\omega \in S$ belongs to $E$ ($\omega \in E$).

## Key Definitions

- **Simple (Elementary) Event:** An event containing exactly one sample point, $E = \{\omega\}$ with $|E| = 1$.
- **Compound Event:** An event containing two or more sample points ($|E| \ge 2$), expressible as the union of simple events.
- **Sure (Certain) Event ($S$):** The entire sample space $S$, which always occurs ($P(S) = 1$).
- **Impossible (Null) Event ($\emptyset$):** The empty subset $\emptyset$, which contains no outcomes and can never occur ($P(\emptyset) = 0$).
- **Event Space ($\mathcal{F}$):** The $\sigma$-algebra of subsets of $S$ (for finite $S$, the power set $\mathcal{P}(S)$ of size $2^{|S|}$).

## Worked Example

**Problem:** A coin is tossed twice, giving $S = \{HH, HT, TH, TT\}$. Classify the following events and state their cardinalities:
1. $E_1 =$ "both tosses are heads" $= \{HH\}$ ($|E_1| = 1$, **simple event**).
2. $E_2 =$ "at least one head appears" $= \{HH, HT, TH\}$ ($|E_2| = 3$, **compound event**).
3. $E_3 =$ "three heads appear in two tosses" $= \emptyset$ ($|E_3| = 0$, **impossible event**).

## Multiple Choice Questions

1. Formally, how is an **event** $E$ related to the sample space $S$ and an individual outcome $\omega$?
    - **A)** $\omega$ is a subset of $S$ ($\omega \subseteq S$), while $E$ is an element of $\omega$.
    - **B)** An outcome $\omega$ is an element of $S$ ($\omega \in S$), while an event $E$ is a subset of $S$ ($E \subseteq S$).
    - **C)** Events and sample spaces are always disjoint sets.
    - **D)** Every event must equal the entire sample space $S$.

2. What distinguishes a **simple (elementary) event** from a **compound event**?
    - **A)** A simple event is a singleton subset ($|E| = 1$) that cannot be decomposed into smaller non-empty events, whereas a compound event contains two or more outcomes ($|E| \ge 2$).
    - **B)** A simple event has probability $0.5$, whereas a compound event has probability $1$.
    - **C)** A simple event involves one coin, whereas a compound event involves dice.
    - **D)** Simple events are mutually exclusive with $S$.

3. If a finite sample space $S$ has $|S| = 6$ elementary outcomes (such as rolling one die), how many distinct events (subsets of $S$, including $\emptyset$ and $S$) exist in the power set $\mathcal{P}(S)$?
    - **A)** $6$
    - **B)** $12$
    - **C)** $64$
    - **D)** $36$

4. When rolling a single six-sided die ($S = \{1, 2, 3, 4, 5, 6\}$), let $E$ be the event of rolling an even prime number. What is $E$, and is it simple or compound?
    - **A)** $E = \{2, 4, 6\}$, compound event
    - **B)** $E = \emptyset$, impossible event
    - **C)** $E = \{2, 3, 5\}$, compound event
    - **D)** $E = \{2\}$, simple event

5. Suppose $E$ is an event in a continuous sample space $S = [0, 1]$ with $P(E) = 0$. Does $P(E) = 0$ necessarily imply $E = \emptyset$?
    - **A)** Yes, only $\emptyset$ can have probability $0$.
    - **B)** No; while $E = \emptyset \implies P(E) = 0$ always holds, in continuous sample spaces a non-empty singleton event like $E = \{0.5\}$ also has $P(E) = 0$.
    - **C)** Yes, because continuous sample spaces have finitely many outcomes.
    - **D)** No, because $P(\emptyset) = 1$ in continuous spaces.

### Answer Key & Explanations

1. **B**. Sample points (elementary outcomes) are elements $\omega \in S$, whereas events are subsets $E \subseteq S$ (collections of outcomes).
2. **A**. A simple event consists of a single sample point $\{\omega\}$ ($|E| = 1$), while a compound event contains multiple sample points ($|E| \ge 2$).
3. **C**. The power set $\mathcal{P}(S)$ of an $n$-element sample space contains $2^n$ subsets. For $n = 6$, $2^6 = 64$.
4. **D**. The only even prime number is $2$, so $E = \{2\}$. Because $|E| = 1$, $E$ is a simple (elementary) event.
5. **B**. The impossible event $\emptyset$ always has $P(\emptyset) = 0$, but the converse fails in continuous spaces where individual points have zero length/measure ($P(\{x\}) = 0$ even though $\{x\} \ne \emptyset$).

## References & Navigation

- **Previous Topic:** [[Sample Space]]
- **Next Topic:** [[Types of Event Operations]]
- **Related Notes:** [[Statistical Experiment]], [[Union]]
