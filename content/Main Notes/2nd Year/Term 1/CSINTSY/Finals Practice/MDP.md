---
id: 09_MDP
type: note
course: CSINTSY
topic: Computational Thinking
status: completed
---

# 09_MDP

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSINTSY]] #[[Computational Thinking]] #[[Computer Science]] #[[Artificial Intelligence]] #[[Machine Learning]] #[[Intelligent Systems]] #[[Probability]] #[[Data Analysis]]

---

## Overview

> A Markov Decision Process (MDP) is a mathematical framework for modeling decision-making in situations where outcomes are partly random and partly ...

## Details / Theory

# 9. Markov Decision Processes (MDP) Reviewer

## Overview

A **Markov Decision Process (MDP)** is a mathematical framework for modeling decision-making in situations where outcomes are partly random and partly under the control of a decision maker. It is the formal basis for Reinforcement Learning.

## Markov Property

"The future is independent of the past given the present."
 The next state depends **only** on the current state and the action taken, not on the sequence of events that preceded it.

## Components of an MDP

An MDP is defined by the tuple $(S, A, T, R, \gamma)$:

1.  **States ($S$)**: The set of all possible situations or configurations of the environment.
2.  **Actions ($A$)**: The set of all possible moves the agent can take.
3.  **Transition Function ($T$)** (or Model):
$T(s, a, s') = P(s' | s, a)$
The probability of reaching state $s'$ if we take action $a$ in state $s$.
This models the uncertainty/randomness of the environment.
4.  **Reward Function ($R$)**:
$R(s, a, s')$
The immediate reward received after transitioning from $s$ to $s'$ via action $a$.
5.  **Discount Factor ($\gamma$)**:
A number between 0 and 1 ($0 \le \gamma \le 1$).
Determines the importance of future rewards.
$\gamma \approx 0$: Agent is myopic (cares only about immediate reward).
$\gamma \approx 1$: Agent is farsighted (cares about long-term cumulative reward).

## Key Concepts

### Policy ($\pi$)
 A strategy or rule that tells the agent what action to take in each state. $\pi(s) \to a$ **Optimal Policy ($\pi^*$)**: The policy that yields the highest expected cumulative reward over time.

### Value Function ($V(s)$)
 The expected cumulative reward the agent will receive starting from state $s$ and following a specific policy thereafter. It tells us "how good" it is to be in a specific state.

### Bellman Equation

A recursive equation that decomposes the value of a state into the immediate reward plus the discounted value of the next state.
// ...existing code...
$$ V(s) = \max*a \sum*{s'} T(s, a, s') [R(s, a, s') + \gamma V(s')] $$
 This equation is used to solve for the optimal values and policy. This equation is used to solve for the optimal values and policy.

## Solved Example: Bellman Update

**Scenario**:
 **State A**: You are here. **Actions**: "Go Left" or "Go Right". **Discount Factor ($\gamma$)**: 0.9.

**Transitions & Rewards**:

1.  **Action "Go Left"**:
50% chance to reach State B (Value $V(B) = 10$). Reward = 0.
50% chance to reach State C (Value $V(C) = 2$). Reward = 0.
2.  **Action "Go Right"**:
100% chance to reach State D (Value $V(D) = 5$). Reward = 2.

**Calculate Value of Actions**:
 **Value of "Go Left"**:
  $$ 0.5 \times [0 + 0.9(10)] + 0.5 \times [0 + 0.9(2)] $$
    $$ 0.5 \times [9] + 0.5 \times [1.8] $$
    $$ 4.5 + 0.9 = 5.4 $$
 **Value of "Go Right"**:
  $$ 1.0 \times [2 + 0.9(5)] $$
    $$ 1.0 \times [2 + 4.5] $$
    $$ 6.5 $$

**Update Value of State A**:
$$ V(A) = \max(5.4, 6.5) = 6.5 $$
**Optimal Policy**: Go Right.

---

## Common Pitfalls
 Forgetting the **discount factor** $\gamma$ — it controls how much future rewards are worth vs. immediate ones. Confusing the **transition function** $T(s,a,s')$ (probability of reaching $s'$) with the **reward** $R(s,a,s')$. Not iterating the Bellman equation until convergence — one pass is generally insufficient for correct value estimates.

## Summary

> TL;DR — An MDP is defined by states, actions, transition probabilities, rewards, and discount factor $\gamma$. The Bellman equation $V(s) = \max_a \sum_{s'} T(s,a,s')[R(s,a,s') + \gamma V(s')]$ gives the optimal value function; the optimal policy picks the action maximizing this.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

---
**_Made by 2ru17_**

_Please contact me through discord or my the university email for any problems regarding the reviewer. Thanks!_

## Multiple Choice Questions

1. What is the fundamental assumption of the Markov Property?
- **A)** Future states depend heavily on the entire history of past actions.
- **B)** The future is independent of the past given the present state and action.
- **C)** All actions yield deterministic outcomes.
- **D)** The discount factor determines the randomness of the environment.

2. Which component of an MDP models the probability of reaching a new state after taking a specific action?
- **A)** The Reward Function
- **B)** The Discount Factor
- **C)** The Policy
- **D)** The Transition Function

3. What does a Discount Factor ($\gamma$) close to 0 imply about an agent's behavior?
- **A)** The agent is farsighted and values long-term rewards.
- **B)** The agent values all future rewards equally without discounting.
- **C)** The agent is myopic and cares primarily about immediate rewards.
- **D)** The agent completely stops exploring the environment.

4. In the context of an MDP, what is a Policy ($\pi$)?
- **A)** A history of all states previously visited by the agent.
- **B)** A rule that maps each state to an action the agent should take.
- **C)** The cumulative reward received over an episode.
- **D)** The mathematical probability of winning a game.

5. What does the Value Function $V(s)$ represent?
- **A)** The maximum immediate reward obtainable in state $s$.
- **B)** The expected cumulative reward starting from state $s$ and following a specific policy.
- **C)** The transition probability of returning to state $s$.
- **D)** The highest possible discount factor for the MDP.

6. What is the primary purpose of the Bellman Equation in MDPs?
- **A)** To calculate the precise computational complexity of an action.
- **B)** To decompose the value of a state into immediate reward plus the discounted value of the next state.
- **C)** To eliminate the need for a transition function.
- **D)** To strictly define which states are terminal.

7. How does the Bellman equation handle uncertainty in the environment?
- **A)** By ignoring states with probabilistic outcomes.
- **B)** By calculating the sum of values multiplied by their transition probabilities over all possible next states.
- **C)** By setting the discount factor to zero whenever randomness occurs.
- **D)** By assuming the highest reward is always achieved.

8. When updating the value of a state using the Bellman Equation, how is the optimal action chosen?
- **A)** By picking the action that results in the state with the lowest value.
- **B)** By averaging the expected values of all available actions.
- **C)** By picking the action that maximizes the sum of expected immediate and future rewards.
- **D)** By selecting an action randomly to encourage exploration.

9. What is a common pitfall regarding the transition function and reward function in MDPs?
- **A)** Believing the transition function is deterministic.
- **B)** Confusing the probability of reaching a state with the reward received for reaching it.
- **C)** Assuming the transition function always depends on the discount factor.
- **D)** Defining the reward function recursively.

10. Why is one pass of the Bellman equation update generally insufficient to find the true value estimates?
- **A)** Because the transition probabilities continuously change.
- **B)** Because the discount factor shrinks after every pass.
- **C)** Because the values rely recursively on neighboring state values, requiring iteration to converge.
- **D)** Because the rewards are only generated randomly during the first pass.

### Answer Key & Explanations
1. **B)** The Markov Property states that the next state depends only on the current state and action, independent of the sequence of events that preceded it.
2. **D)** The Transition Function $T(s, a, s')$ or $P(s' | s, a)$ models the probability of reaching state $s'$ given state $s$ and action $a$.
3. **C)** A discount factor near 0 means the agent heavily discounts future rewards, making it myopic and focused on immediate rewards.
4. **B)** A policy is a strategy or rule that dictates what action to take in each state ($\pi(s) \to a$).
5. **B)** The value function tells us the expected cumulative reward starting from state $s$ under a given policy.
6. **B)** The Bellman equation recursively decomposes a state's value into the immediate reward plus the discounted value of reaching the next state.
7. **B)** The equation multiplies the transition probability $T(s, a, s')$ by the sum of the reward and discounted next state value, effectively taking an expected value over all possible outcomes.
8. **C)** The Bellman equation uses a $\max_a$ operator to choose the action that yields the highest expected cumulative return.
9. **B)** A common pitfall is confusing $T(s,a,s')$ (probability) with $R(s,a,s')$ (immediate reward).
10. **C)** Value estimates rely on the values of subsequent states, so the values must be iteratively updated until they converge.

## References & Navigation

- **Previous Topic:** [[K Means Clustering]]
- **Next Topic:** [[Q Learning]]
- **Related Notes:** [[Markov Decision Processes]]
