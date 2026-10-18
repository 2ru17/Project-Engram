---
id: 04_Adversarial_Games
type: note
course: CSINTSY
topic: Computational Thinking
status: completed
---

# 04_Adversarial_Games

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSINTSY]] #[[Computational Thinking]] #[[Computer Science]] #[[Artificial Intelligence]] #[[Machine Learning]] #[[Intelligent Systems]] #[[Probability]] #[[Data Analysis]]

---

## Overview

> Adversarial Games involve environments with multiple agents where the agents have conflicting goals. These are typically modeled as Zero-Sum Games.

## Details / Theory

# 4. Adversarial Games Reviewer

## Overview

**Adversarial Games** involve environments with multiple agents where the agents have conflicting goals. These are typically modeled as **Zero-Sum Games**.

## Key Concepts

### Zero-Sum Game
 **Definition**: A game where one player's gain is exactly equal to the other player's loss. The total utility sum is constant (usually 0). **Example**: Chess, Tic-Tac-Toe. If Player A wins (+1), Player B loses (-1). Sum = 0.

### Players
 **MAX**: The agent we control. Tries to **maximize** the utility value. **MIN**: The opponent. Tries to **minimize** the utility value (which is bad for MAX).

### Game Tree
 A tree where nodes are game states and edges are moves. Layers alternate between MAX and MIN turns. **Terminal State**: A state where the game ends (win, lose, draw). **Utility Function**: Assigns a numeric value to terminal states (e.g., +1 for Win, -1 for Loss, 0 for Draw).

## Algorithms

### 1. Minimax Algorithm
 **Strategy**: A recursive algorithm to determine the optimal move for MAX, assuming MIN also plays optimally. **Process**:
  1.  Generate the game tree down to terminal states (or a depth limit).
  2.  Calculate utility values for terminal states.
  3.  **Backpropagate** values up the tree:
At a **MAX** node: Choose the child with the **maximum** value.
At a **MIN** node: Choose the child with the **minimum** value.
  4.  The value at the root is the Minimax value of the game. **Complexity**:
Time: $O(b^m)$ (Exponential) - where $b$ is branching factor, $m$ is max depth.
Space: $O(bm)$ (Linear) - Depth-first exploration.

### 2. Alpha-Beta Pruning
 **Goal**: Optimize Minimax by cutting off (pruning) branches that do not need to be explored because they cannot influence the final decision. **Parameters**:
**$\alpha$ (Alpha)**: The best (highest) value found so far for MAX along the path. Initialized to $-\infty$.
**$\beta$ (Beta)**: The best (lowest) value found so far for MIN along the path. Initialized to $+\infty$. **Pruning Rule**:
If **$\alpha \ge \beta$**, prune the remaining children of the current node.
**Reason**: The current node (say, MIN) has found a move that is worse for MAX than a move MAX has already found elsewhere ($\alpha$). So MAX will never choose the path to this node. **Updates**:
**MAX Node**: Updates $\alpha = \max(\alpha, \text{value})$.
**MIN Node**: Updates $\beta = \min(\beta, \text{value})$.

### Example of Pruning

Consider a MAX node with current $\alpha=3$. It has a child MIN node.
The MIN node explores its first child and gets a value of 2.
Now, the MIN node's value will be $\le 2$.
Since $\alpha=3$ (MAX already has a move worth 3 elsewhere) and the current branch is worth at most 2, MAX will never choose this branch.
So, we stop exploring the other children of this MIN node. **Pruned!**

## Solved Example: Minimax with Alpha-Beta Pruning

**Tree Structure**:
 **Root (MAX)** has children **B (MIN)** and **C (MIN)**. **B (MIN)** has children **D (3)** and **E (5)**. **C (MIN)** has children **F (2)** and **G (9)**.

**Goal**: Find the value of Root and show pruning.

**Step-by-Step Execution**:

1.  **Initialize**: Root has $\alpha = -\infty, \beta = +\infty$.
2.  **Visit B (MIN)**: Pass $\alpha = -\infty, \beta = +\infty$.
**Visit D**: Value is **3**.
**Update B**: B is MIN, so it wants minimum. Current best for B is 3.
**Update Beta at B**: $\beta = \min(+\infty, 3) = 3$.
**Check Pruning**: Is $\alpha \ge \beta$? ($-\infty \ge 3$?) No. Continue.
**Visit E**: Value is **5**.
**Update B**: $\min(3, 5) = 3$.
**Return 3** to Root.
3.  **Back at Root (MAX)**:
Root gets 3 from B.
**Update Root**: MAX wants maximum. Current best is 3.
**Update Alpha at Root**: $\alpha = \max(-\infty, 3) = 3$.
4.  **Visit C (MIN)**: Pass $\alpha = 3, \beta = +\infty$.
**Visit F**: Value is **2**.
**Update C**: C is MIN. Current best for C is 2.
**Update Beta at C**: $\beta = \min(+\infty, 2) = 2$.
**Check Pruning**: Is $\alpha \ge \beta$? ($3 \ge 2$?) **YES!**
**PRUNE**: We do not visit G.
**Reason**: C is guaranteed to be $\le 2$. Root (MAX) already has a move (to B) worth 3. MAX will never choose C (value $\le 2$) over B (value 3). So we stop looking at C's other children.
**Return 2** (or $\le 2$) to Root.
5.  **Back at Root (MAX)**:
Root compares current best (3) with C's value (2). $\max(3, 2) = 3$.
**Final Value**: 3.
**Optimal Move**: Go to B.

---

---

## Common Pitfalls
 Confusing MAX (maximizing) and MIN (minimizing) levels in the game tree. Pruning incorrectly — $\alpha$ is the best already explored for MAX, $\beta$ for MIN; prune when $\alpha \ge \beta$. Forgetting that Alpha-Beta pruning gives the **same result** as Minimax — it only saves computation, not changes the answer.

## Summary

> TL;DR — Minimax evaluates game trees by alternating MAX/MIN layers. Alpha-Beta pruning eliminates branches that cannot affect the final decision ($\alpha \ge \beta$ cutoff), reducing computation while preserving the optimal Minimax value.

## Links
 **Related:** **Source / Reference:**

---
**_Made by 2ru17_**

_Please contact me through discord or my the university email for any problems regarding the reviewer. Thanks!_

## Multiple Choice Questions

1. What defines a Zero-Sum Game in the context of adversarial games?
    - **A)** The game ends in a draw for all players.
    - **B)** One player's gain is exactly equal to the other player's loss.
    - **C)** Neither player can maximize their utility.
    - **D)** Both players receive zero utility at the terminal state.

2. In a game tree, what does a terminal state represent?
    - **A)** The initial state before any moves are made.
    - **B)** A node where the Minimax algorithm prunes a branch.
    - **C)** A state where the game ends, such as a win, loss, or draw.
    - **D)** The state with the maximum branching factor.

3. What is the primary goal of the MAX player in a game tree?
    - **A)** To minimize the utility value for the opponent.
    - **B)** To minimize the time complexity of the algorithm.
    - **C)** To maximize the utility value at the terminal state.
    - **D)** To maximize the number of terminal states generated.

4. How does the Minimax algorithm determine the value of a non-terminal MAX node?
    - **A)** By choosing the minimum value among its children.
    - **B)** By calculating the average value of all its children.
    - **C)** By choosing the maximum value among its children.
    - **D)** By summing the utility values of all terminal states below it.

5. What is the time complexity of the standard Minimax algorithm where $b$ is the branching factor and $m$ is the maximum depth?
    - **A)** $O(bm)$
    - **B)** $O(b^m)$
    - **C)** $O(b/m)$
    - **D)** $O(m^b)$

6. What is the main purpose of Alpha-Beta pruning in the Minimax algorithm?
    - **A)** To change the final optimal decision to a better outcome.
    - **B)** To explore every possible branch more efficiently.
    - **C)** To eliminate branches that cannot affect the final decision.
    - **D)** To increase the overall time complexity of the search.

7. In Alpha-Beta pruning, what does the $\alpha$ (Alpha) parameter represent?
    - **A)** The best (lowest) value found so far for MIN along the path.
    - **B)** The best (highest) value found so far for MAX along the path.
    - **C)** The total number of pruned branches.
    - **D)** The depth limit of the search tree.

8. When does Alpha-Beta pruning dictate that a node's remaining children should be pruned?
    - **A)** When $\alpha \le \beta$
    - **B)** When $\beta > \alpha$
    - **C)** When $\alpha \ge \beta$
    - **D)** When $\alpha$ and $\beta$ are equal to zero

9. If a MIN node updates its value during Alpha-Beta pruning, which parameter is modified?
    - **A)** $\alpha$ (Alpha)
    - **B)** The branching factor $b$
    - **C)** $\beta$ (Beta)
    - **D)** The depth limit $m$

10. Which of the following is a common pitfall when thinking about Minimax with Alpha-Beta pruning?
    - **A)** Assuming that Alpha-Beta pruning changes the final result compared to standard Minimax.
    - **B)** Initializing $\alpha$ to $-\infty$ and $\beta$ to $+\infty$.
    - **C)** Remembering that MAX and MIN layers alternate.
    - **D)** Using a utility function for terminal states.

### Answer Key & Explanations

1. **B**. A zero-sum game is defined as one where the total utility sum is constant, meaning one player's gain is another's loss.
2. **C**. Terminal states represent the end of the game where outcomes like win, lose, or draw are decided.
3. **C**. The MAX agent's objective is to maximize the utility value, while MIN tries to minimize it.
4. **C**. At a MAX node, the algorithm backpropagates values by choosing the child with the maximum utility value.
5. **B**. The time complexity is $O(b^m)$ because it explores an exponential number of nodes based on branching factor $b$ and depth $m$.
6. **C**. Alpha-Beta pruning optimizes Minimax by cutting off branches that are guaranteed not to influence the final optimal choice.
7. **B**. The parameter $\alpha$ specifically tracks the best (highest) value found so far for the MAX player.
8. **C**. Pruning occurs when $\alpha \ge \beta$ because MAX already has a guaranteed path that is at least as good as the current worst-case for MIN.
9. **C**. A MIN node updates $\beta$, which tracks the lowest value found so far for MIN.
10. **A**. Alpha-Beta pruning only saves computation and yields the exact same optimal move as unpruned Minimax.

## References & Navigation

- **Previous Topic:** [[Informed Search]]
- **Next Topic:** [[Machine Learning]]
- **Related Notes:** [[Adversarial Games]]
