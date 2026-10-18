---
id: uniform_cost_search
type: note
course: CSINTSY
topic: Uniform Cost Search
status: completed
---

# Uniform Cost Search

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSINTSY]] #[[Uniform Cost Search]] #[[Problem Solving]] #[[M2]]

---

## Overview

Uniform Cost Search (UCS) is an uninformed search algorithm designed to find the optimal path in a state space with varying step costs. It addresses the issue of backtracking, where the same states might be explored multiple times leading to inefficiencies. By applying Dynamic Programming, solutions to subproblems can be cached, effectively reducing the number of states that must be explored. UCS maintains a frontier list and consistently explores the state with the lowest cumulative cost from the start state, ensuring that the first time a goal is reached, the path is optimal. 

**Characteristics of Uniform Cost Search:**
Cannot handle negative edge costs.
Complete if the state space is finite.
Optimal for finding the shortest path (in terms of cost).
Time and Space Complexity: $O(n \log n)$, where $n$ is the number of states that are closer to the start state than the goal state.

## Important Formulas

**Dynamic Programming Minimum Cost Function**
$$
\text{MinCost}(s) = \begin{cases} 
0 & \text{if IsEnd}(s) \\ 
\min_{a \in \text{Actions}(s)} \left( \text{Cost}(s, a) + \text{MinCost}(\text{Succ}(s, a)) \right) & \text{otherwise} 
\end{cases}
$$

## Worked Examples

**Algorithm Walkthrough**
1. Add $s_{start}$ to FRONTIER with priority $0$.
2. While FRONTIER is not empty:
Remove state $s$ with the lowest priority $p$ from FRONTIER.
If $\text{IsEnd}(s)$, then return the solution.
Add $s$ to EXPLORED.
For each action $a \in \text{Actions}(s)$:
Get successor $s' = \text{Succ}(s, a)$
If $s'$ is not yet in EXPLORED:
Update $s'$ in FRONTIER with priority $p + \text{Cost}(s, a)$.

**Routing Problem Context**
When finding a route from QC to Taguig where edge weights represent traffic, UCS explores paths by incrementally extending the frontier towards nodes with the lowest total traffic cost from QC.

## Multiple Choice Questions

1. Which issue found in basic search algorithms does Uniform Cost Search (UCS) address by applying Dynamic Programming?
    - **A)** The inability to handle negative edge costs.
    - **B)** The generation of finite state spaces.
    - **C)** Inefficiencies caused by exploring the same states multiple times (backtracking overlap).
    - **D)** The calculation of heuristic estimates.

2. What is a key limitation of Uniform Cost Search (UCS)?
    - **A)** It cannot handle negative edge costs.
    - **B)** It is incomplete even if the state space is finite.
    - **C)** It relies purely on the depth of the search tree.
    - **D)** It does not guarantee an optimal path.

3. In the Dynamic Programming Minimum Cost formula for UCS, what is the value of $\text{MinCost}(s)$ if $s$ is a goal state ($\text{IsEnd}(s)$ is true)?
    - **A)** Infinity
    - **B)** $1$
    - **C)** $0$
    - **D)** The sum of all previous action costs

4. How does UCS determine which state to explore next from the FRONTIER?
    - **A)** It selects the state that was added most recently.
    - **B)** It selects the state with the lowest cumulative cost (priority $p$).
    - **C)** It randomly selects a state to ensure uniform exploration.
    - **D)** It selects the state with the most available actions.

5. When a new successor $s'$ is generated and is not yet in the EXPLORED set, how is its priority calculated before being added to the FRONTIER?
    - **A)** Priority is set to $0$.
    - **B)** Priority is simply $\text{Cost}(s, a)$.
    - **C)** Priority is calculated as $p + \text{Cost}(s, a)$, where $p$ is the current state's priority.
    - **D)** Priority is derived from a heuristic function predicting the distance to the goal.

### Answer Key & Explanations

1. **C**. UCS uses elements of dynamic programming (caching explored states) to avoid exploring the same states multiple times.
2. **A**. A core limitation of UCS (similar to Dijkstra's algorithm) is that it cannot correctly handle graphs with negative edge costs.
3. **C**. The base case of the recursive MinCost formulation is that the cost from a goal state to a goal state is $0$.
4. **B**. UCS maintains a priority queue (the frontier) and consistently pops the state with the lowest cumulative cost from the start state.
5. **C**. The new cumulative priority is the cost to reach the parent state ($p$) plus the step cost of the action taken to reach the successor ($\text{Cost}(s, a)$).

## References & Navigation

- **Previous Topic:** [[State-Based Models]]
- **Next Topic:** [[Heuristics and A-Star Search]]
- **Related Notes:** [[Dijkstra's Algorithm (Advanced)]], [[Uninformed Search]]
