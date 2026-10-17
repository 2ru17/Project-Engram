---
id: q-learning
type: note
course: CSINTSY
topic: Q-Learning
status: completed
---

# Q-Learning

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSINTSY]] #[[Q-Learning]] #[[Problem Solving]] #[[M6]]

---

## Overview

Q-Learning is a **Reinforcement Learning** algorithm used when the agent does not know the transition probabilities or the reward distribution of an environment beforehand. Because the agent lacks a model of the world (unlike in MDPs), it must learn the optimal policy by exploring the environment and experiencing the rewards and transitions firsthand.

**Q-Table:**
The algorithm uses a lookup table (Q-table) to store the estimated Q-values for every state-action pair. The Q-value represents the expected total cumulative reward of taking a specific action from a specific state and acting optimally thereafter.

**Exploration vs. Exploitation:**
During training, the agent faces a trade-off: *Exploration:* Taking random actions to discover new states and potentially higher rewards. *Exploitation:* Choosing the best-known action based on current Q-values to maximize reward.
Typically, agents start with high exploration and gradually shift to exploitation as they learn the environment.

**Deep Q-Learning:**
For environments with vast or continuous state spaces, maintaining a Q-table becomes impossible. Deep Q-Learning replaces the Q-table with a deep neural network that approximates the Q-value for any given state-action pair.

## Important Formulas

**Q-Learning Update Rule:**
When an agent takes action $a$ in state $s$, transitions to state $s'$, and receives reward $R$, the Q-value is updated:
$$ Q(s, a) \leftarrow (1 - \alpha) Q(s, a) + \alpha \left( R + \gamma \max_{a'} Q(s', a') \right) $$
Where: $\alpha$ is the learning rate. $\gamma$ is the discount factor. $\max_{a'} Q(s', a')$ is the highest expected reward from the next state $s'$.

## Worked Examples

**Frozen Lake Problem:**
An agent must navigate a slippery grid from start to goal without falling into holes. The agent intends to move 'Up', but there is a chance it slips 'Left' or 'Right'. **Training:** 
  1. Initialize Q-table to 0.
  2. The agent picks an action (randomly or optimally).
  3. The agent observes the outcome state and reward.
  4. The Q-table is updated using the outcome.
  5. Repeat until the end of the episode. Over hundreds of episodes, the agent's Q-table converges, and the optimal policy naturally avoids holes and slippery edges leading to danger.

## Multiple Choice Questions

1. Why is Q-Learning used instead of standard Markov Decision Processes (MDPs) in certain environments?
- **A)** Because the agent does not know the transition probabilities or reward distribution beforehand.
- **B)** Because Q-Learning completely ignores expected future rewards.
- **C)** Because Q-Learning relies on supervised labeled data.
- **D)** Because Q-Learning models the environment deterministically.

2. In Q-Learning, what does a Q-value stored in the lookup table (Q-table) represent?
- **A)** The exact number of steps required to reach the goal from the current state.
- **B)** The expected total cumulative reward of taking a specific action from a specific state and acting optimally thereafter.
- **C)** The probability of an action successfully transitioning to the desired state.
- **D)** The mathematical variance of the rewards in the current state.

3. What does "Exploitation" refer to during the training of a Q-Learning agent?
- **A)** Taking random actions to map out unknown areas of the environment.
- **B)** Choosing the best-known action based on current Q-values to maximize reward.
- **C)** Resetting the Q-table to zeros to prevent overfitting.
- **D)** Increasing the learning rate to process data faster.

4. When is Deep Q-Learning typically implemented?
- **A)** When the environment is entirely deterministic.
- **B)** When the agent possesses perfect knowledge of the transition distribution.
- **C)** When the environment has a vast or continuous state space, making a standard Q-table impossible to maintain.
- **D)** When the discount factor $\gamma$ is set to exactly 1.0.

5. In the Q-Learning Update Rule, what is the role of the parameter $\alpha$?
- **A)** It represents the discount factor weighting future rewards.
- **B)** It represents the maximum expected reward from the next state.
- **C)** It is the immediate reward received from the environment.
- **D)** It is the learning rate, determining how much the newly acquired information overrides the old Q-value.

### Answer Key & Explanations
1. **A)** Q-Learning is a model-free algorithm, meaning the agent has to interact with the environment to learn about it, whereas MDPs assume the agent is provided with the transition model and rewards.
2. **B)** A Q-value captures the quality of a specific action taken in a specific state, projecting the expected cumulative future reward assuming optimal play afterward.
3. **B)** Exploitation is the act of using the agent's current knowledge (highest Q-values) to secure the best rewards, as opposed to exploration (trying new things).
4. **C)** Standard Q-Learning struggles with massive state spaces because the Q-table grows too large. Deep Q-Learning replaces the table with a neural network to approximate values.
5. **D)** The learning rate $\alpha$ dictates the balance between keeping the old estimated Q-value $(1-\alpha)$ and integrating the new target observation.

## References & Navigation

- **Previous Topic:** [[Markov Decision Processes]]
- **Next Topic:** [[State Based Model]]
- **Related Notes:** [[Q Learning]]
