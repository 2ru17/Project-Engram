---
id: Priori-Probability
type: note
course: STT101A
topic: "Statistics"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[STT101A]] #[[Conceptual]] #[[Priori Probability]]

---

## Overview

**A Priori (Classical) Probability** assigns probabilities **before** any empirical trials are performed, by deductive reasoning from the physical or mathematical symmetry of the experiment (such as fair coins, balanced dice, well-shuffled decks, or cryptographic uniform random number generators).

## Key Definitions

- **A Priori Probability Formula:** When symmetry guarantees that all $N = |S|$ elementary outcomes in sample space $S$ are equally likely, the a priori probability of event $E \subseteq S$ is:
  $$P(E) = \frac{\text{Number of outcomes favorable to } E}{\text{Total number of equiprobable outcomes in } S} = \frac{n(E)}{n(S)}$$
- **Contrast with A Posteriori (Empirical / Relative Frequency) Probability:** A priori probability is deduced *prior to experience* from structural symmetry, whereas empirical probability $\hat{P}(E) = \frac{f}{n}$ is estimated *after observing* $n$ repeated trials.
- **Contrast with Bayesian Prior / Posterior:** In Bayesian inference, the *prior* $P(H)$ is the initial probability before new data $D$, updated via Bayes' Rule to the *posterior* $P(H \mid D)$.

## Worked Example

**Problem:** Before drawing any card from a well-shuffled $52$-card deck, determine the a priori probability of drawing a **Face Card** (Jack, Queen, or King).

**Solution:**
- Each of the $4$ suits has $3$ face cards, giving $n(E) = 4 \times 3 = 12$ favorable cards out of $n(S) = 52$ equally likely cards.
- $P(\text{Face Card}) = \frac{12}{52} = \frac{3}{13} \approx 0.2308$.

## Multiple Choice Questions

1. On what basis does **a priori (classical) probability** determine the probability of an event?
    - **A)** By running $10,000$ physical experiments and counting frequencies.
    - **B)** Deductively, prior to conducting trials, based on the symmetry and equiprobability of the elementary outcomes in the sample space.
    - **C)** Based purely on personal intuition or gut feeling.
    - **D)** By always setting every event's probability to $0.5$.

2. Why can we NOT use a priori symmetry alone to determine the probability that a thumbtack tossed on a table lands point-up vs. point-down?
    - **A)** Because the physical geometry of a thumbtack is asymmetric, so the two outcomes (point-up and point-down) are NOT equally likely; empirical (relative frequency) trials are required instead.
    - **B)** Because a thumbtack has more than two outcomes.
    - **C)** Because $P(S) \ne 1$ for physical objects.
    - **D)** Because thumbtacks are continuous random variables.

3. What is the a priori probability of drawing a **Heart or an Ace** on a single draw from a well-shuffled $52$-card deck?
    - **A)** $\frac{17}{52}$
    - **B)** $\frac{13}{52} \times \frac{4}{52}$
    - **C)** $\frac{16}{52} = \frac{4}{13}$
    - **D)** $\frac{1}{4}$

4. How does the **Principle of Indifference** (Principle of Insufficient Reason) relate to a priori probability?
    - **A)** It requires $N$ to be infinite.
    - **B)** It states that all compound events have equal probability.
    - **C)** It states that probabilities do not matter in statistics.
    - **D)** It states that if there are $N$ mutually exclusive and exhaustive elementary possibilities that are indistinguishable except for their names (symmetric), each should be assigned probability $\frac{1}{N}$.

5. As the number of real-world trials $n \to \infty$ on a physically fair die, how does the empirical relative frequency $\frac{f_n(E)}{n}$ relate to the theoretical a priori probability $P(E)$?
    - **A)** They diverge to infinity.
    - **B)** By Bernoulli's Law of Large Numbers, the empirical relative frequency converges in probability to the theoretical a priori probability $P(E)$.
    - **C)** The empirical frequency is always exactly equal to $P(E)$ for every small $n$.
    - **D)** The a priori probability changes after each roll.

### Answer Key & Explanations

1. **B**. A priori probability relies on structural symmetry of the sample space to deduce $P(E) = |E|/|S|$ before any experimental data are collected.
2. **A**. Unlike a symmetric coin or cube, a thumbtack's center of mass and shape make its two landing states physically unequal in likelihood, invalidating the equiprobable assumption.
3. **C**. There are $13$ Hearts and $4$ Aces, with $1$ overlap (the Ace of Hearts). Thus $n(H \cup A) = 13 + 4 - 1 = 16$, giving $P(H \cup A) = \frac{16}{52} = \frac{4}{13}$.
4. **D**. Formulated by Jakob Bernoulli and Pierre-Simon Laplace, the Principle of Indifference assigns uniform probability $1/N$ to symmetric elementary outcomes.
5. **B**. The Law of Large Numbers bridges classical (a priori) and frequentist (empirical) probability: as $n \to \infty$, $\hat{P}_n(E) = f_n(E)/n \to P(E)$.

## References & Navigation

- **Previous Topic:** [[Relative Frequency Form]]
- **Next Topic:** [[Additive and Complementary Rules]]
- **Related Notes:** [[Additive Rule]], [[Expected Event]]
