---
id: markov_decision_processes
type: note
course: CSINTSY
topic: Markov Decision Processes
status: completed
---

# Markov Decision Processes

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSINTSY]] #[[Markov Decision Processes]] #[[Problem Solving]] #[[M6]]

---

## Overview

A Markov Decision Process (MDP) provides a mathematical framework for modeling decision-making in environments where outcomes are uncertain. Unlike standard state-based models where actions deterministically lead to a specific state, MDPs account for the probability that an action might lead to various different states.

**Key Components of an MDP:**
**States ($S$):** The set of all possible states.
**Actions ($A$):** The set of actions available from a given state.
**Transition Distribution $T(s, a, s')$:** The probability of reaching a next state $s'$ given the current state $s$ and action $a$.
**Reward $R(s, a, s')$:** The reward received after transitioning from $s$ to $s'$ via action $a$.
**Start / End States.**

**Goal:**
The objective in an MDP is to find an **Optimal Policy ($\pi_{opt}$)**, which is a rule or strategy defining the best action to take in every state to maximize the expected cumulative reward. 

**Discount Factor ($\gamma$):**
A value between 0 and 1 that determines how much future rewards are valued compared to immediate rewards. A $\gamma$ close to 1 heavily weights long-term rewards.

## Important Formulas

**Optimal Value Function ($V_{opt}$):**
Calculates the maximum expected reward achievable from state $s$.
$$
V_{opt}(s) = \begin{cases} 
0 & \text{if IsEnd}(s) \\ 
\max_{a \in \text{Actions}(s)} \sum_{s'} T(s, a, s') \left( R(s, a, s') + \gamma V_{opt}(s') \right) & \text{otherwise}
\end{cases}
$$

**Optimal Policy ($\pi_{opt}$):**
Determines the best action to take in state $s$.
$$
\pi_{opt}(s) = \arg\max_{a \in \text{Actions}(s)} \sum_{s'} T(s, a, s') \left( R(s, a, s') + \gamma V_{opt}(s') \right)
$$

## Worked Examples

**Iterative Algorithm (Value Iteration / Bellman Equation):**
1. Initialize $V^{(0)}_{opt}(s) = 0$ for all states $s$.
2. For iteration $t = 1, 2, \dots$ until convergence:
For each state $s$:
     $$ V^{(t)}_{opt}(s) = \max_{a} \sum_{s'} T(s,a,s') \left( R(s,a,s') + \gamma V^{(t-1)}_{opt}(s') \right) $$
3. The process repeats until the change in optimal values between iterations falls below a specific threshold. The policy is then extracted using $\arg\max$.

**Transport Puzzle with Uncertainty:**
Walking takes 1 min deterministically (cost -1). Taking a tram takes 2 mins (cost -2) but has a 50% chance of failing to move the agent forward. The algorithm iteratively computes expected costs based on probabilities until the optimal path policy stabilizes.

## Multiple Choice Questions

1. How does a Markov Decision Process (MDP) differ from standard state-based models like A* search?
- **A)** MDPs rely entirely on heuristic functions to guide search.
- **B)** MDPs assume that actions deterministically lead to a single specific state.
- **C)** MDPs account for uncertainty by using probabilities that an action might lead to various different states.
- **D)** MDPs do not require an initial or start state.

2. What is the primary objective when solving a Markov Decision Process?
- **A)** Finding the single shortest path to the goal with the lowest computational time.
- **B)** Finding an Optimal Policy ($\pi_{opt}$) that dictates the best action to take in every state to maximize expected cumulative reward.
- **C)** Calculating the exact heuristic value for every state in the space.
- **D)** Eliminating all uncertainty in the transition distribution.

3. What role does the Discount Factor ($\gamma$) play in an MDP?
- **A)** It determines the probability of successfully transitioning to the next state.
- **B)** It scales the immediate reward down to ensure the algorithm terminates.
- **C)** It determines how much future rewards are valued compared to immediate rewards.
- **D)** It acts as the learning rate during the value iteration process.

4. In the formula for the Optimal Value Function ($V_{opt}$), what happens when the current state $s$ is a goal/end state?
- **A)** The value function returns an infinite penalty.
- **B)** The value function returns $0$.
- **C)** The value function defaults to the discount factor $\gamma$.
- **D)** The algorithm enters an infinite loop.

5. During Value Iteration (Bellman Equation), how does the algorithm determine when to stop iterating?
- **A)** It stops after exactly 100 iterations.
- **B)** It stops when every state has a value greater than $1$.
- **C)** It stops when the agent finally reaches the goal state.
- **D)** It stops when the change in optimal values between iterations falls below a specific threshold (convergence).

### Answer Key & Explanations
1. **C)** The core distinction of an MDP is handling stochastic (probabilistic) environments where an action (like moving forward) might result in multiple possible next states.
2. **B)** Because outcomes are uncertain, the goal isn't a fixed path, but a comprehensive policy telling the agent what to do no matter what state it ends up in.
3. **C)** The discount factor weights the importance of long-term vs short-term rewards. A value near 1 heavily weights future rewards, while near 0 prioritizes immediate gratification.
4. **B)** By definition, the expected future reward from an end state is $0$ because the process terminates.
5. **D)** Value iteration computes values iteratively and halts when they converge—meaning the values stop changing significantly from one step to the next.

## References & Navigation

- **Previous Topic:** [[Expert Systems Overview]]
- **Next Topic:** [[Q-Learning]]
- **Related Notes:** [[MDP]], [[Bayesian Inference]]
