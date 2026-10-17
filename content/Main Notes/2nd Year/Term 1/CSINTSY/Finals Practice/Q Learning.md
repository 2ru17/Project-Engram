---
id: 10_Q_Learning
type: note
course: CSINTSY
topic: Computational Thinking
status: completed
---

# 10_Q_Learning

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSINTSY]] #[[Computational Thinking]] #[[Computer Science]] #[[Artificial Intelligence]] #[[Machine Learning]] #[[Intelligent Systems]] #[[Probability]] #[[Data Analysis]]

---

## Overview

> Q-Learning is a model-free reinforcement learning algorithm.

## Details / Theory

# 10. Q-Learning Reviewer

## Overview

**Q-Learning** is a **model-free** reinforcement learning algorithm.
 **Model-Free**: It does not need to know the Transition Probability ($T$) or Reward Function ($R$) of the environment beforehand. It learns by trial and error. **Goal**: To learn the **Q-Function** (Quality Function), which estimates the value of taking a specific action in a specific state.

## The Q-Function: $Q(s, a)$
 Represents the **expected cumulative future reward** of taking action $a$ in state $s$, and then acting optimally afterwards. Once we know $Q(s, a)$ for all states and actions, the optimal policy is simply to pick the action with the highest Q-value in each state:
  $$ \pi^\*(s) = \text{argmax}\_a Q(s, a) $$

## The Q-Table
 A table (matrix) where rows are States and columns are Actions. Each cell contains the value $Q(s, a)$. Initialized to 0 (or random values). Updated iteratively as the agent interacts with the environment.

## Q-Learning Update Rule (Bellman Update)

When the agent is in state $s$, takes action $a$, receives reward $R$, and lands in new state $s'$, we update the Q-value:

$$ Q(s, a) \leftarrow Q(s, a) + \alpha [ \underbrace{R + \gamma \max_{a'} Q(s', a')}_{\text{Target}} - \underbrace{Q(s, a)}_{\text{Current}} ] $$

### Components:

1.  **$Q(s, a)$**: The current estimated value (Old Value).
2.  **$\alpha$ (Alpha)**: **Learning Rate** ($0 < \alpha \le 1$).
Determines how much new information overrides old information.
High $\alpha$: Learn fast, but volatile.
Low $\alpha$: Learn slow, but stable.
3.  **$R$**: Immediate reward received.
4.  **$\gamma$ (Gamma)**: **Discount Factor** ($0 \le \gamma \le 1$). Importance of future rewards.
5.  **$\max_{a'} Q(s', a')$**: The estimate of optimal future value from the next state $s'$. We assume we will take the best action from there.
6.  **Temporal Difference (TD) Error**: The term in the brackets $[Target - Current]$. It represents the difference between what we expected and what actually happened.

## Exploration vs. Exploitation

How does the agent choose actions while learning?
 **Exploration**: Trying new or random actions to discover their rewards. Necessary to find better paths. **Exploitation**: Choosing the action currently known to be the best (highest Q-value) to maximize reward.

### Epsilon-Greedy Strategy ($\epsilon$-greedy)

A common method to balance exploration and exploitation.
 With probability **$\epsilon$ (epsilon)**: **Explore** (choose a random action). With probability **$1 - \epsilon$**: **Exploit** (choose the best action from Q-table). Usually, $\epsilon$ starts high (explore a lot) and decays over time (exploit more as we learn).

## Solved Example: Q-Value Update

**Scenario**:
 **Current State ($s$)**: Room A. **Action ($a$)**: Move to Room B. **Reward ($R$)**: +10 (Found a coin). **Next State ($s'$)**: Room B. **Current Q-Value $Q(A, \text{Move B})$**: 5. **Best Q-Value in Next State $\max Q(B, a')$**: 20 (Maybe Room B is close to exit). **Learning Rate ($\alpha$)**: 0.1. **Discount Factor ($\gamma$)**: 0.9.

**Calculation**:

1.  **Target Value**:
    $$ R + \gamma \max Q(s', a') $$
    $$ 10 + 0.9(20) = 10 + 18 = 28 $$

2.  **Difference (TD Error)**:
    $$ \text{Target} - \text{Current} $$
    $$ 28 - 5 = 23 $$

3.  **New Q-Value**:
    $$ Q(s, a) + \alpha [\text{Difference}] $$
    $$ 5 + 0.1 [23] $$
    $$ 5 + 2.3 = 7.3 $$

**Result**: The Q-value for moving from A to B increased from 5 to 7.3 because the outcome was better than expected.

---

## Common Pitfalls
 Confusing the **learning rate** $\alpha$ (how much to update) with the **discount factor** $\gamma$ (how much to value future rewards). Forgetting that Q-Learning is **model-free** — it does not need transition probabilities; it learns from experience. Using pure exploitation ($\epsilon = 0$) too early — sufficient exploration is needed for the Q-table to converge.

## Summary

> TL;DR — Q-Learning updates Q-values via $Q(s,a) \leftarrow Q(s,a) + \alpha[r + \gamma \max_{a'} Q(s',a') - Q(s,a)]$. It’s model-free, uses $\epsilon$-greedy for exploration/exploitation balance, and converges to optimal Q-values with sufficient exploration.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

---
**_Made by 2ru17_**

_Please contact me through discord or my the university email for any problems regarding the reviewer. Thanks!_

## Multiple Choice Questions

1. What does it mean for Q-Learning to be a "model-free" algorithm?
- **A)** It explicitly builds a graph of all state transitions before learning.
- **B)** It does not need prior knowledge of the environment's Transition Probability or Reward Function.
- **C)** It relies entirely on supervised labeled datasets rather than interaction.
- **D)** It operates without using any variables or states.

2. In Q-Learning, what does the Q-Function $Q(s, a)$ represent?
- **A)** The immediate reward of taking action $a$ in state $s$.
- **B)** The exact number of steps required to reach the goal from state $s$.
- **C)** The expected cumulative future reward of taking action $a$ in state $s$ and acting optimally thereafter.
- **D)** The probability that taking action $a$ in state $s$ will lead to a specific new state.

3. How are the values in a Q-Table typically initialized before the agent starts learning?
- **A)** They are pre-calculated using the Bellman Equation.
- **B)** They are initialized to the maximum possible reward in the environment.
- **C)** They are initialized to 0 or random values.
- **D)** They are copied from a previously trained Deep Neural Network.

4. What is the role of the Learning Rate ($\alpha$) in the Q-Learning update rule?
- **A)** It determines how much new information overrides old information.
- **B)** It balances the trade-off between current and future rewards.
- **C)** It sets the probability of exploring versus exploiting.
- **D)** It guarantees that the Q-table will converge immediately.

5. In the Q-Learning update rule, what does the term $\max_{a'} Q(s', a')$ represent?
- **A)** The highest immediate reward possible from the starting state.
- **B)** The maximum penalty the agent can receive in the current episode.
- **C)** The estimate of optimal future value from the next state $s'$.
- **D)** The probability of transitioning to state $s'$.

6. What does the Temporal Difference (TD) Error represent?
- **A)** The absolute time it takes for the algorithm to run.
- **B)** The difference between the actual reward and the discount factor.
- **C)** The difference between the target value (what actually happened plus expected future) and the current estimated value.
- **D)** The mathematical error caused by choosing exploitation over exploration.

7. In the context of reinforcement learning, what is "Exploration"?
- **A)** Choosing the action currently known to yield the highest Q-value.
- **B)** Trying new or random actions to discover their rewards.
- **C)** Updating the Q-table with the Bellman equation.
- **D)** Decreasing the learning rate over time.

8. What is the purpose of the Epsilon-Greedy ($\epsilon$-greedy) strategy?
- **A)** To force the agent to only take actions that maximize immediate reward.
- **B)** To balance the trade-off between exploring new actions and exploiting known good actions.
- **C)** To gradually increase the discount factor $\gamma$ as learning progresses.
- **D)** To ensure the agent never visits the same state twice.

9. How does the parameter $\epsilon$ (epsilon) typically change over time in a Q-Learning implementation?
- **A)** It remains constant at 0.5 throughout the process.
- **B)** It starts low to exploit, and increases to explore more later.
- **C)** It starts high to encourage exploration, and decays to encourage exploitation as learning progresses.
- **D)** It oscillates randomly between 0 and 1 every episode.

10. What happens if an agent uses pure exploitation ($\epsilon = 0$) too early in the learning process?
- **A)** The agent will immediately find the global optimal path.
- **B)** The agent may get stuck in a suboptimal policy because it fails to discover better paths.
- **C)** The Q-Table will fill up with negative values.
- **D)** The environment's reward function will reset.

### Answer Key & Explanations
1. **B)** Model-free means the agent does not require knowledge of the environment's internal mechanics (Transition Probabilities $T$ or Reward Function $R$) to learn.
2. **C)** The Q-Function estimates the value of a state-action pair based on the expected cumulative reward moving forward optimally.
3. **C)** Q-Tables are simply matrices starting with all 0s or random values, which are refined iteratively through interaction.
4. **A)** The Learning Rate $\alpha$ controls how heavily the new update (TD Target) weighs against the existing Q-value.
5. **C)** $\max_{a'} Q(s', a')$ assumes the agent will act optimally from the resulting state $s'$, looking up the highest Q-value available there.
6. **C)** TD Error is the bracketed term in the update equation $[Target - Current]$, representing the surprise or correction needed.
7. **B)** Exploration means taking random or untested actions to map out the environment and find potentially higher rewards.
8. **B)** The $\epsilon$-greedy strategy gives a probability $\epsilon$ to explore and $1-\epsilon$ to exploit, striking a balance between the two.
9. **C)** $\epsilon$ usually starts high to map the environment and decays over time as the agent becomes confident in its Q-Table.
10. **B)** Without sufficient exploration, the agent might find a "good enough" path and exploit it endlessly, missing out on the true optimal solution.

## References & Navigation

- **Previous Topic:** [[MDP]]
- **Related Notes:** [[Q-Learning]]
