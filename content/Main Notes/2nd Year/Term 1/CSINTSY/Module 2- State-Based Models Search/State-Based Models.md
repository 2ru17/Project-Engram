---
id: state-based_models
type: note
course: CSINTSY
topic: State-Based Models
status: completed
---

# State-Based Models

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSINTSY]] #[[Search Algorithms]] #[[Problem Solving]] #[[M2]]

---

## Overview

This document explores State-Based Models in Artificial Intelligence, focusing on how to formulate and solve complex problems by modeling them as a set of states connected by actions. It details the process of search problem formulation (defining states, actions, and costs) and evaluates various Tree Search Algorithms—such as Backtracking, Depth-First Search (DFS), Breadth-First Search (BFS), and Depth-First Search with Iterative Deepening (DFS-ID)—based on their completeness, optimality, and time/space complexity.

## Important Formulas & Key Definitions

### Mathematical/Programming Formulation
A search problem can be formally defined by the following five components: **$s_{start}$**: The initial or start state. **$Actions(s)$**: The set of valid actions that can be executed from state $s$. **$Cost(s, a)$**: The penalty or cost associated with performing action $a$ from state $s$. **$Succ(s, a)$**: The resulting next state after performing action $a$ from state $s$. **$IsEnd(s)$**: A boolean function returning true if $s$ is a goal state, and false otherwise.

### Evaluation Metrics for Search Algorithms **Completeness:** Does the algorithm always find a solution if one exists? **Optimality:** Does it always return the solution with the least total cost? **Time Complexity:** The maximum number of states explored before returning a solution (worst-case). **Space Complexity:** The maximum number of states stored in memory at any given time (worst-case).

## Theoretical Framework: Tree Search Algorithms

The table below summarizes the theoretical characteristics of various tree search algorithms, where $b$ is the branching factor, $D$ is the maximum depth of the state space, and $d$ is the depth of the optimal solution.

| Algorithm | Optimal when action costs are... | Time Complexity | Space Complexity | Completeness |
| :--- | :--- | :--- | :--- | :--- |
| **Backtracking Search** | Any | $O(b^D)$ | $O(D)$ | Yes (if finite) |
| **Depth-First Search (DFS)** | All $0$ (irrelevant) | $O(b^D)$ | $O(D)$ | Yes (if finite) |
| **Breadth-First Search (BFS)**| Constant $\ge 0$ | $O(b^d)$ | $O(b^d)$ | Yes (even if infinite) |
| **DFS-Iterative Deepening (DFS-ID)**| Constant $\ge 0$ | $O(b^d)$ | $O(d)$ | Yes (even if infinite) |

## Worked Examples: Search Problem Formulation

### 1. Water Pouring Puzzle
*Scenario:* You have 3 glasses: A (8 ml, filled), B (5 ml, empty), C (3 ml, empty). Goal: Two glasses with exactly 4 ml. **State:** The amount of liquid in Glass A, Glass B, and Glass C. **Actions:** Pour one glass into another (valid if source is not empty and target is not full). **Cost:** All 0 (the objective is just to find a valid sequence of steps, not necessarily the cheapest).

### 2. Wolf, Goat, and Cabbage Puzzle
*Scenario:* A farmer needs to transport a wolf, goat, and cabbage across a river. Conditions: Raft holds farmer + 1 item. Wolf eats goat if left alone; goat eats cabbage if left alone. **State:** The current position (left or right bank) of the farmer, wolf, goat, and cabbage. **Actions:** Farmer crosses the river alone, OR farmer crosses taking exactly one item with him. **Cost:** All 0.

### 3. Transport Puzzle
*Scenario:* Travel from street 1 to street $n$. Walking from $s$ to $s+1$ takes 1 minute. A magic tram goes from $s$ to $2s$ in 2 minutes. Goal: minimize travel time. **State:** The current street number you are in (integer from 1 to $n$). **Actions:** Walk OR take the tram. **Cost:** $1$ for walking, $2$ for taking the tram.

## Multiple Choice Questions

1. Which of the following correctly defines the `IsEnd(s)` function in search problem formulation?
    - **A)** It returns the penalty or cost of performing an action from state $s$.
    - **B)** It returns true if the current state $s$ is a goal state, and false otherwise.
    - **C)** It generates all valid actions that can be executed from the start state.
    - **D)** It calculates the space complexity of the algorithm.

2. In the context of evaluating search algorithms, what does "Completeness" refer to?
    - **A)** The algorithm evaluates every possible path in the search space regardless of the goal.
    - **B)** The algorithm always finds a solution if one exists.
    - **C)** The algorithm requires a finite state space to even begin execution.
    - **D)** The algorithm operates without using any memory overhead.

3. Under what condition is Depth-First Search (DFS) considered optimal according to the theoretical framework?
    - **A)** When the branching factor is infinite.
    - **B)** When the action costs are constant and greater than zero.
    - **C)** When all action costs are 0, making the cost irrelevant.
    - **D)** When it uses iterative deepening.

4. Which algorithm combines the completeness of Breadth-First Search (BFS) with the space efficiency of Depth-First Search (DFS)?
    - **A)** A* Search
    - **B)** Uniform Cost Search
    - **C)** Backtracking Search
    - **D)** DFS-Iterative Deepening (DFS-ID)

5. In the "Wolf, Goat, and Cabbage" puzzle formulation, what represents a "State"?
    - **A)** The number of times the raft has crossed the river.
    - **B)** The total cost required to move all items across the river safely.
    - **C)** The current position (left or right bank) of the farmer, wolf, goat, and cabbage.
    - **D)** The action of the farmer eating the cabbage.

### Answer Key & Explanations

1. **B**. `IsEnd(s)` is defined as a boolean function that returns true when $s$ is a goal state.
2. **B**. Completeness is a metric that guarantees an algorithm will find a solution if a solution actually exists within the problem space.
3. **C**. Standard DFS does not account for cost, so it is only considered "optimal" if all action costs are 0 (i.e., any path to the goal is equally valid).
4. **D**. DFS-ID runs DFS to increasing depth limits, maintaining linear space complexity $O(d)$ while guaranteeing it will find the shallowest goal like BFS.
5. **C**. The state of this puzzle is the configuration of the entities; specifically, which bank the farmer, wolf, goat, and cabbage are currently on.

## References & Navigation

- **Previous Topic:** [[Artificial Intelligence Overview]]
- **Next Topic:** [[Uniform Cost Search]]
- **Related Notes:** [[Uninformed Search]], [[State Based Model]]
