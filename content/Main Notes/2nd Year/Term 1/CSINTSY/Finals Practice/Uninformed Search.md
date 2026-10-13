---
id: 02_Uninformed_Search
type: note
course: CSINTSY
topic: Computational Thinking
status: completed
---

# 02_Uninformed_Search

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSINTSY]] #[[Computational Thinking]] #[[Computer Science]] #[[Artificial Intelligence]] #[[Machine Learning]] #[[Intelligent Systems]] #[[Probability]] #[[Data Analysis]]

---

## Overview

> Uninformed Search (also called Blind Search) algorithms have no additional information about states beyond the problem definition. They can only di...

## Details / Theory

# 2. Uninformed Search Reviewer

## Overview

**Uninformed Search** (also called Blind Search) algorithms have no additional information about states beyond the problem definition. They can only distinguish a goal state from a non-goal state. They do not know if a non-goal state is "better" or "closer" to the goal than another.

## Algorithms

### 1. Breadth-First Search (BFS)
 **Strategy**: Explores the shallowest nodes first. It visits all neighbors of a node before moving to the next depth level. **Data Structure**: **Queue** (FIFO - First In, First Out). **Order**: Level by level ($L_0 \to L_1 \to L_2 \dots$). **Properties**:
**Complete**: Yes (if the branching factor is finite). It will find a solution if one exists.
**Optimal**: Yes, _only if_ all step costs are equal (e.g., all edges have cost 1). It finds the path with the fewest edges.
**Memory**: High (Exponential). It needs to store all nodes at the current level to generate the next level.

### 2. Depth-First Search (DFS)
 **Strategy**: Explores as far as possible along each branch before backtracking. It dives deep into the graph. **Data Structure**: **Stack** (LIFO - Last In, First Out). **Order**: Deepest unexpanded node first. **Properties**:
**Complete**: No. It can get stuck in infinite loops or infinite paths.
**Optimal**: No. It might find a long path to the goal before finding a shorter one.
**Memory**: Low (Linear). It only needs to store the current path and unexpanded siblings.

### 3. Iterative Deepening DFS (ID-DFS)
 **Strategy**: Combines the benefits of BFS (completeness) and DFS (memory efficiency). It runs DFS with a depth limit ($L$), increasing the limit iteratively ($L=0, L=1, L=2, \dots$) until the goal is found. **Sequence**:
Run DFS with limit 0.
Run DFS with limit 1.
Run DFS with limit 2.
... **Properties**:
**Complete**: Yes.
**Optimal**: Yes (if step costs are equal).
**Memory**: Low (Linear), like DFS.

### 4. Uniform Cost Search (UCS)
 **Strategy**: Expands the node with the **lowest cumulative path cost** $g(n)$ from the start node. **Data Structure**: **Priority Queue** (ordered by $g(n)$ ascending). **Evaluation Function**: $f(n) = g(n)$, where $g(n)$ is the cost from start to node $n$. **Process**:
  1.  Insert Start Node into Priority Queue with cost 0.
  2.  While queue is not empty:
Pop node with lowest cost.
**Goal Test**: Check if it is the goal. If yes, return solution.
Expand node (generate children).
Calculate cost for children: $g(child) = g(parent) + cost(parent, child)$.
Insert children into Priority Queue. **Properties**:
**Complete**: Yes (if step costs are positive).
**Optimal**: Yes. It is guaranteed to find the cheapest path.
**Memory**: High (Exponential).

### 5. Backtracking Search
 **Usage**: Often used in Constraint Satisfaction Problems (CSPs) like N-Queens or Sudoku. **Strategy**: A variation of DFS. It builds a solution incrementally. **Mechanism**:
Choose a variable.
Assign a value.
Check constraints.
If constraints are violated, **backtrack** (undo assignment) and try a different value.
If all variables are assigned validly, return solution.

## Comparison Table

| Algorithm  | Strategy                  | Data Structure | Complete? | Optimal?             | Memory |
| :--------- | :------------------------ | :------------- | :-------- | :------------------- | :----- |
| **BFS**    | Shallowest first          | Queue (FIFO)   | Yes       | Yes (if equal costs) | High   |
| **DFS**    | Deepest first             | Stack (LIFO)   | No        | No                   | Low    |
| **ID-DFS** | DFS with increasing limit | Stack (LIFO)   | Yes       | Yes (if equal costs) | Low    |
| **UCS**    | Cheapest path first       | Priority Queue | Yes       | Yes                  | High   |

## Solved Example: BFS vs. DFS vs. UCS

**Graph**:
 S -> A (Cost 1), S -> B (Cost 5) A -> C (Cost 2), A -> D (Cost 4) B -> G (Cost 5) C -> G (Cost 10) D -> G (Cost 2)

**Goal**: Reach G from S.

### 1. Breadth-First Search (BFS)

_Queue (FIFO)_. Tie-breaking: Alphabetical.

1.  **Start**: Queue = [S].
2.  Pop **S**. Neighbors: A, B. Queue = [A, B].
3.  Pop **A**. Neighbors: C, D. Queue = [B, C, D]. (A's children go to back)
4.  Pop **B**. Neighbors: G. Queue = [C, D, G].
5.  Pop **C**. Neighbors: G. Queue = [D, G, G].
6.  Pop **D**. Neighbors: G. Queue = [G, G, G].
7.  Pop **G**. **Goal Found!**
 **Path**: $S 	o B 	o G$ (found via B first in some implementations) or $S 	o A 	o \dots$ depending on when goal test is applied. _Note_: Standard BFS checks goal on generation.
Expand S -> Generate A, B.
Expand A -> Generate C, D.
Expand B -> Generate **G**. Stop.
**Path**: $S 	o B 	o G$. Cost: $5+5=10$. (Not optimal cost, but fewest steps: 2).

### 2. Depth-First Search (DFS)

_Stack (LIFO)_. Tie-breaking: Alphabetical (push Z then A, so A pops first).

1.  **Start**: Stack = [S].
2.  Pop **S**. Push B, A. Stack = [B, A].
3.  Pop **A**. Push D, C. Stack = [B, D, C].
4.  Pop **C**. Push G. Stack = [B, D, G].
5.  Pop **G**. **Goal Found!**
 **Path**: $S 	o A 	o C 	o G$. Cost: $1+2+10 = 13$.

### 3. Uniform Cost Search (UCS)

_Priority Queue (Cost)_.

1.  **Start**: PQ = [(S, 0)].
2.  Pop **(S, 0)**.
Add A (Cost 1). PQ = [(A, 1)].
Add B (Cost 5). PQ = [(A, 1), (B, 5)].
3.  Pop **(A, 1)**.
Add C (Cost 1+2=3). PQ = [(C, 3), (B, 5)].
Add D (Cost 1+4=5). PQ = [(C, 3), (B, 5), (D, 5)].
4.  Pop **(C, 3)**.
Add G (Cost 3+10=13). PQ = [(B, 5), (D, 5), (G, 13)].
5.  Pop **(B, 5)**.
Add G (Cost 5+5=10). PQ = [(D, 5), (G, 10), (G, 13)].
6.  Pop **(D, 5)**.
Add G (Cost 5+2=7). PQ = [(G, 7), (G, 10), (G, 13)].
7.  Pop **(G, 7)**. **Goal Found!**
 **Path**: $S 	o A 	o D 	o G$. **Cost**: 7. (Optimal).

---

## Common Pitfalls
 Confusing **completeness** (will it find a solution?) with **optimality** (will it find the best one?). Using DFS when optimality is required — DFS is **not** optimal and may get stuck in infinite branches. Forgetting that UCS expands by lowest $g(n)$, not by depth — it’s optimal for non-negative costs. Not recognizing that Iterative Deepening combines BFS’s completeness with DFS’s memory efficiency.

## Summary

> TL;DR — Uninformed searches (BFS, DFS, IDDFS, UCS) explore without heuristics. BFS and UCS are complete and optimal (UCS for weighted graphs). DFS is memory-efficient but not optimal. IDDFS gets the best of both.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

---
**_Made by 2ru17_**

_Please contact me through discord or my the university email for any problems regarding the reviewer. Thanks!_

## Multiple Choice Questions

1. What is the defining characteristic of Uninformed Search algorithms?
    - **A)** They use domain-specific heuristic functions.
    - **B)** They only evaluate the estimated distance to the goal.
    - **C)** They possess no additional information about states beyond the problem definition.
    - **D)** They always find the solution in linear time.

2. Which data structure is used by Breadth-First Search (BFS) to manage its frontier?
    - **A)** Stack (LIFO)
    - **B)** Priority Queue (Ordered by cost)
    - **C)** Queue (FIFO)
    - **D)** Hash Table

3. Under what condition is Breadth-First Search (BFS) considered optimal?
    - **A)** When the graph has infinite depth.
    - **B)** Only if all step costs are equal (e.g., all edges have a cost of 1).
    - **C)** When it uses a heuristic function.
    - **D)** BFS is never optimal under any circumstances.

4. Why is Depth-First Search (DFS) NOT considered complete?
    - **A)** Because it requires too much memory to run.
    - **B)** Because it evaluates the highest cost nodes first.
    - **C)** Because it can get stuck in infinite loops or infinite paths and never find the goal.
    - **D)** Because it uses a Queue instead of a Stack.

5. What is the main advantage of Depth-First Search (DFS) over Breadth-First Search (BFS)?
    - **A)** DFS is guaranteed to find the shortest path.
    - **B)** DFS requires significantly less memory (Linear memory space).
    - **C)** DFS always expands nodes level by level.
    - **D)** DFS can use heuristic functions to speed up search.

6. How does Iterative Deepening DFS (ID-DFS) combine the benefits of BFS and DFS?
    - **A)** It uses a Priority Queue but limits the path cost.
    - **B)** It calculates a heuristic at each depth limit.
    - **C)** It runs DFS with progressively increasing depth limits, gaining BFS's completeness while keeping DFS's memory efficiency.
    - **D)** It alternates between running one step of BFS and one step of DFS.

7. Which Uninformed Search algorithm expands the node with the lowest cumulative path cost $g(n)$?
    - **A)** Depth-First Search (DFS)
    - **B)** Iterative Deepening DFS (ID-DFS)
    - **C)** Uniform Cost Search (UCS)
    - **D)** Breadth-First Search (BFS)

8. What data structure is essential for implementing Uniform Cost Search (UCS)?
    - **A)** Priority Queue (ordered by ascending $g(n)$)
    - **B)** Standard Queue (FIFO)
    - **C)** Stack (LIFO)
    - **D)** Linked List

9. In which type of problem is Backtracking Search most commonly used?
    - **A)** Pathfinding on maps
    - **B)** Constraint Satisfaction Problems (CSPs) like Sudoku
    - **C)** Image recognition
    - **D)** Reinforcement learning environments

10. Which is a common pitfall when choosing a search algorithm?
    - **A)** Thinking ID-DFS uses exponential memory.
    - **B)** Assuming Uniform Cost Search expands nodes based on depth.
    - **C)** Using DFS when an optimal (shortest/cheapest) path is strictly required.
    - **D)** Assuming BFS is complete on infinite graphs with finite branching.

### Answer Key & Explanations
1. **C)** Uninformed search (blind search) algorithms can only distinguish a goal state from a non-goal state based on the problem definition, lacking heuristics.
2. **C)** BFS uses a standard First In, First Out (FIFO) Queue to expand nodes level by level.
3. **B)** BFS finds the path with the fewest edges, which is only optimal if all edges (steps) have the exact same cost.
4. **C)** DFS can endlessly explore a path of infinite depth, entirely missing the goal located on a different branch.
5. **B)** DFS only stores the current path and unexpanded siblings, resulting in linear memory usage compared to BFS's exponential memory.
6. **C)** ID-DFS systematically increases the depth limit of DFS, ensuring it eventually finds the goal (like BFS) without storing entire levels in memory (like DFS).
7. **C)** UCS specifically tracks the accumulated path cost $g(n)$ and always expands the cheapest path available.
8. **A)** UCS uses a Priority Queue to keep the frontier sorted so the node with the lowest $g(n)$ is popped first.
9. **B)** Backtracking incrementally builds solutions and undoes assignments when constraints are violated, making it ideal for CSPs.
10. **C)** DFS is neither optimal nor guaranteed to find the shortest path, so using it when optimality is required is a major error.

## References & Navigation

- **Previous Topic:** [[State Based Model]]
- **Next Topic:** [[Informed Search]]
- **Related Notes:** [[Uniform Cost Search]]
