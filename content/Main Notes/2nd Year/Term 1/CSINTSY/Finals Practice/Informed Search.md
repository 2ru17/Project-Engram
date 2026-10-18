---
id: 03_Informed_Search
type: note
course: CSINTSY
topic: Computational Thinking
status: completed
---

# 03_Informed_Search

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSINTSY]] #[[Computational Thinking]] #[[Computer Science]] #[[Artificial Intelligence]] #[[Machine Learning]] #[[Intelligent Systems]] #[[Probability]] #[[Data Analysis]]

---

## Overview

> Informed Search (Heuristic Search) algorithms use problem-specific knowledge to find solutions more efficiently than uninformed search. They use a ...

## Details / Theory

# 3. Informed Search Reviewer

## Overview

**Informed Search** (Heuristic Search) algorithms use problem-specific knowledge to find solutions more efficiently than uninformed search. They use a **heuristic function** to estimate how close a state is to the goal.

## Key Concepts

### Heuristic Function ($h(n)$)
 **Definition**: A function that estimates the cost of the cheapest path from node $n$ to a goal node. **Property**: $h(Goal) = 0$. **Example**: In route finding, the straight-line distance (Euclidean distance) to the destination is a common heuristic.

### Admissibility
 **Definition**: A heuristic is **admissible** if it **never overestimates** the true cost to reach the goal. **Formula**: $h(n) \le h^*(n)$, where $h^*(n)$ is the true cost from $n$ to the goal. **Importance**: Required for A\* Search to be optimal (find the shortest path). **Example**: Straight-line distance is admissible because the straight line is the shortest possible path; any road path will be equal to or longer than the straight line.

### Consistency (Monotonicity)
 **Definition**: The estimated cost to reach the goal from $n$ is no greater than the step cost to get to a successor $n'$ plus the estimated cost from $n'$ to the goal. **Formula**: $h(n) \le c(n, a, n') + h(n')$ **Importance**: Ensures that the total estimated cost $f(n)$ increases (or stays the same) as we go deeper. Required for graph search optimality.

## Algorithms

### 1. Greedy Best-First Search (GBFS)
 **Strategy**: Expands the node that appears to be closest to the goal. It tries to get to the goal as quickly as possible. **Evaluation Function**: $f(n) = h(n)$
It only considers the estimated cost to the goal, ignoring the cost already traveled ($g(n)$). **Pros**: Can be very fast and efficient in many cases. **Cons**:
**Not Optimal**: It might take a path that looks short initially but is actually longer overall.
**Not Complete**: It can get stuck in loops (like DFS).

### 2. A\* Search (A-Star)
 **Strategy**: Minimizes the total estimated cost of the solution. It balances the cost already paid ($g$) and the estimated cost to go ($h$). **Evaluation Function**: $f(n) = g(n) + h(n)$
$g(n)$: The actual cost from the start node to node $n$.
$h(n)$: The estimated cost from node $n$ to the goal.
$f(n)$: The estimated total cost of the path through $n$ to the goal. **Process**:
  1.  Insert Start Node into Priority Queue with $f(Start) = h(Start)$ (since $g(Start)=0$).
  2.  While queue is not empty:
Pop node with the **lowest $f(n)$**.
**Goal Test**: If goal, return solution.
Expand node.
For each child:
Calculate $g(child) = g(parent) + cost(parent, child)$.
Calculate $h(child)$.
Calculate $f(child) = g(child) + h(child)$.
Add to queue. **Optimality**: A\* is **optimal** if $h(n)$ is **admissible**. It is guaranteed to find the lowest cost path. **Completeness**: Yes (if there is a solution).

## Comparison

| Algorithm             | Evaluation Function  | Strategy                    | Optimal?            | Complete? |
| :-------------------- | :------------------- | :-------------------------- | :------------------ | :-------- |
| **Greedy Best-First** | $f(n) = h(n)$        | Closest to goal             | No                  | No        |
| **A\* Search**        | $f(n) = g(n) + h(n)$ | Lowest total estimated cost | Yes (if admissible) | Yes       |

## Solved Example: A\* Search

**Graph**:
 S -> A (Cost 1), S -> B (Cost 4) A -> B (Cost 2), A -> C (Cost 5), A -> G (Cost 12) B -> C (Cost 2) C -> G (Cost 3)

**Heuristics ($h(n)$)**:
 h(S) = 7 h(A) = 6 h(B) = 2 h(C) = 1 h(G) = 0

**Step-by-Step Execution**:

1.  **Initialization**:
PQ = [ (S, f=7) ] ($g=0, h=7$)

2.  **Iteration 1**:
Pop **S** (f=7).
Expand S:
**Child A**: $g(A) = 0+1=1$. $h(A)=6$. $f(A) = 1+6=7$.
**Child B**: $g(B) = 0+4=4$. $h(B)=2$. $f(B) = 4+2=6$.
PQ = [ (B, 6), (A, 7) ] (Ordered by f)

3.  **Iteration 2**:
Pop **B** (f=6).
Expand B:
**Child C**: $g(C) = g(B)+2 = 4+2=6$. $h(C)=1$. $f(C) = 6+1=7$.
PQ = [ (A, 7), (C, 7) ] (Tie-break: usually alphabetical or FIFO)

4.  **Iteration 3**:
Pop **A** (f=7).
Expand A:
**Child B**: $g=1+2=3$. $h=2$. $f=5$. (New path to B is cheaper! Update B).
**Child C**: $g=1+5=6$. $h=1$. $f=7$. (Worse than existing C? No, existing C has g=6. Same cost).
**Child G**: $g=1+12=13$. $h=0$. $f=13$.
PQ = [ (B, 5), (C, 7), (G, 13) ] (Re-inserted B with lower cost)

5.  **Iteration 4**:
Pop **B** (f=5) (The new version from A).
Expand B:
**Child C**: $g=3+2=5$. $h=1$. $f=6$. (New path to C is cheaper! Update C).
PQ = [ (C, 6), (C, 7), (G, 13) ]

6.  **Iteration 5**:
Pop **C** (f=6).
Expand C:
**Child G**: $g=5+3=8$. $h=0$. $f=8$.
PQ = [ (C, 7), (G, 8), (G, 13) ]

7.  **Iteration 6**:
Pop **C** (f=7) (Old version).
Already visited with lower cost? Skip or re-expand (depends on implementation). Let's skip.
PQ = [ (G, 8), (G, 13) ]

8.  **Iteration 7**:
Pop **G** (f=8).
**Goal Found!**
**Path**: $S 	o A 	o B 	o C 	o G$.
**Total Cost**: 8.

---

## Common Pitfalls
 Confusing **admissible** ($h(n) \le h^*(n)$, never overestimates) with **consistent** ($h(n) \le c(n,a,n') + h(n')$). Using Greedy Best-First Search and expecting optimal results — it only uses $h(n)$ and can be misled. Forgetting that A\* uses $f(n) = g(n) + h(n)$ and is optimal only with an admissible heuristic.

## Summary

> TL;DR — Informed search uses heuristics to guide exploration. Greedy Best-First expands by $h(n)$ alone (fast but not optimal). A\* expands by $f(n) = g(n) + h(n)$ and is optimal with an admissible heuristic.

## Links
 **Related:** **Source / Reference:**

---
**_Made by 2ru17_**

_Please contact me through discord or my the university email for any problems regarding the reviewer. Thanks!_

## Multiple Choice Questions

1. What primary characteristic distinguishes informed search algorithms from uninformed search algorithms?
    - **A)** They explore every possible node in the state space.
    - **B)** They use problem-specific knowledge to estimate the distance to the goal.
    - **C)** They always guarantee finding the optimal path regardless of the heuristic.
    - **D)** They evaluate nodes based purely on the cost of the path taken so far.

2. In the context of heuristic search, what does the function $h(n)$ represent?
    - **A)** The actual cost to reach node $n$ from the start node.
    - **B)** The total estimated cost of the path through node $n$ to the goal.
    - **C)** The estimated cost of the cheapest path from node $n$ to a goal node.
    - **D)** The exact shortest path distance from the start node to the goal.

3. For a heuristic to be considered admissible, what condition must it satisfy?
    - **A)** It must always overestimate the true cost to reach the goal.
    - **B)** It must never overestimate the true cost to reach the goal.
    - **C)** It must be exactly equal to the true cost to reach the goal.
    - **D)** It must increase monotonically as the search goes deeper.

4. Why is admissibility an important property for a heuristic in A* search?
    - **A)** It ensures that the algorithm runs in constant time.
    - **B)** It guarantees that A* search will find the optimal (lowest cost) path.
    - **C)** It prevents the algorithm from keeping track of the visited nodes.
    - **D)** It makes the total estimated cost decrease monotonically.

5. What does it mean for a heuristic to be consistent (monotonic)?
    - **A)** The estimated cost to the goal never changes.
    - **B)** The heuristic value of any node is less than its children's heuristic values.
    - **C)** The estimated cost from $n$ to the goal is no greater than the step cost to a successor plus the estimated cost from the successor to the goal.
    - **D)** The heuristic perfectly matches the actual cost for all nodes in the state space.

6. Which function does Greedy Best-First Search (GBFS) use to evaluate which node to expand next?
    - **A)** $f(n) = g(n) + h(n)$
    - **B)** $f(n) = g(n)$
    - **C)** $f(n) = h(n)$
    - **D)** $f(n) = c(n, a, n')$

7. Which of the following is a major drawback of Greedy Best-First Search?
    - **A)** It relies too heavily on the path cost $g(n)$.
    - **B)** It calculates $f(n)$ much slower than A* search.
    - **C)** It is neither complete nor optimal.
    - **D)** It expands nodes uniformly in all directions.

8. How does A* search evaluate the cost of a node?
    - **A)** It uses only the heuristic cost $h(n)$.
    - **B)** It balances the actual path cost from the start $g(n)$ and the estimated cost to the goal $h(n)$.
    - **C)** It ignores both $g(n)$ and $h(n)$ and chooses randomly.
    - **D)** It uses the average of the step costs between nodes.

9. In A* search, what happens if a node is generated that is already in the priority queue, but with a lower total cost?
    - **A)** The new node is ignored.
    - **B)** The priority queue is emptied and search restarts.
    - **C)** The algorithm immediately terminates and returns the path.
    - **D)** The node in the priority queue is updated with the new, lower cost.

10. If an A* search uses an inadmissible heuristic, what is the most likely consequence?
    - **A)** It will never find the goal state.
    - **B)** It may return a path that is not the optimal (lowest cost) path.
    - **C)** It turns into a Depth-First Search.
    - **D)** It will crash due to infinite looping.

### Answer Key & Explanations

1. **B**. Informed search uses a heuristic function, which incorporates problem-specific knowledge to estimate how close a state is to the goal.
2. **C**. The function $h(n)$ estimates the cost from node $n$ to the goal.
3. **B**. An admissible heuristic is one that never overestimates the true cost to reach the goal ($h(n) \le h^*(n)$).
4. **B**. Admissibility is a strict requirement for A* to be optimal and guarantee finding the lowest cost path.
5. **C**. Consistency requires that $h(n) \le c(n, a, n') + h(n')$, meaning the total estimated cost does not decrease along a path.
6. **C**. GBFS evaluates nodes based purely on $f(n) = h(n)$, expanding the node that appears closest to the goal.
7. **C**. GBFS is not optimal because it can take a path that looks short initially but is longer overall, and it is not complete because it can get stuck in loops.
8. **B**. A* evaluates nodes using $f(n) = g(n) + h(n)$, combining the cost already paid and the estimated cost to go.
9. **D**. If a cheaper path to a previously reached node is found, A* updates that node in the priority queue with the new lower cost.
10. **B**. If the heuristic overestimates the cost (inadmissible), A* loses its guarantee of optimality and might settle for a suboptimal path.

## References & Navigation

- **Previous Topic:** [[Uninformed Search]]
- **Next Topic:** [[Adversarial Games]]
- **Related Notes:** [[Heuristics and A-Star Search]]
