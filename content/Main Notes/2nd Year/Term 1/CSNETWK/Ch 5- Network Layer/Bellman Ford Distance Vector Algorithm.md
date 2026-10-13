---
id: Bellman-Ford-Distance-Vector-Algorithm
type: note
course: CSNETWK
topic:
status: completed
---

# Bellman Ford Distance Vector Algorithm

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]

---

## Overview

> Distance Vector routing is decentralized. Routers do not know the full topology. They only know:

## Key Concepts
 Target Router Nodes

## Details / Theory

## 1. Concept Overview: Distance Vector (DV)

Definition

Distance Vector routing is decentralized. Routers do not know the full topology. They only know:

1. Cost to direct neighbors.
2. Distance vectors received from those neighbors.

The "Tell Your Neighbors" Rule

Each router periodically sends its own best-path estimates (vector) to its neighbors. If a neighbor finds a cheaper path using that information, it updates its own vector.

Bellman-Ford Equation:

$$D_x(y) = \min_v \{ c(x,v) + D_v(y) \}$$
 $D_x(y)$: Cost from $x$ to $y$. $c(x,v)$: Cost to neighbor $v$. $D_v(y)$: Neighbor $v$'s current known cost to $y$.

## 2. The Network Topology

**Scenario Data**
![[Pasted image 20251121093513.png]]
 **Target Router:** V (Question 1) and X (Question 2) **Nodes:** u, v, w, x, y

## 3. Problem Analysis

### Question 1

**When the algorithm converges, what are the distance vectors from router 'V' to all routers? (u,v,w,x,y)**

Analytical Breakdown:

We need to find the shortest path from V to everyone else by looking at the diagram globally (since "convergence" implies everyone knows the best paths).

1. **V to V:** 0 (Self).
2. **V to U:** Direct link is 6. No other path is faster. $\rightarrow$ **6**
3. **V to W:** Direct link is 5. Path V-X-W is $5+2=7$ (worse). $\rightarrow$ **5**
4. **V to X:** Direct link is 5. Path V-W-X is $5+2=7$ (worse). $\rightarrow$ **5**
5. **V to Y:**
Path V-X-Y: Cost is $5 (\text{to } X) + 1 (\text{X to Y}) = 6$.
Path V-W-X-Y: $5 + 2 + 1 = 8$ (worse).
Result: $\rightarrow$ **6**

**Correct Answer:** **(6, 0, 5, 5, 6)**

### Question 2

**What are the initial distance vectors for router 'X'? (u,v,w,x,y)**

Analytical Breakdown:

"Initial" means the router only knows about its direct physical neighbors. It does not yet know about nodes that are two or more hops away.

1. **X to U:** Not a neighbor. Unknown. $\rightarrow$ $\infty$ **(x)**
2. **X to V:** Direct neighbor. Cost **5**.
3. **X to W:** Direct neighbor. Cost **2**.
4. **X to X:** Self. Cost **0**.
5. **X to Y:** Direct neighbor. Cost **1**.

**Correct Answer:** **(x, 5, 2, 0, 1)**

### Question 3

**...what is the name of the problem that can occur when link costs increase?**

Analytical Breakdown:

In DV routing, "bad news travels slow."
 If a link breaks or cost increases significantly, routers may form a routing loop where they bounce traffic back and forth, incrementing their cost counter endlessly because they rely on each other's outdated information. _Example:_ A thinks best path is B; B thinks best path is A. They keep adding +1 to the cost until it hits a predefined "Infinity".

**Correct Answer:** **Count to Infinity problem**

## Summary of Logic (Cheat Sheet)

|               |                           |                              |
| ------------- | ------------------------- | ---------------------------- |
| **State**     | **Knowledge Scope**       | **Values for Non-Neighbors** |
| **Initial**   | Local (Direct Links only) | Infinity ($\infty$ or 'x')   |
| **Converged** | Global (Best Paths)       | True Shortest Distance       |

Key Phrase:

"Good news travels fast" (Cost decrease propagates quickly).

"Bad news travels slow" (Cost increase causes Count-to-Infinity).

## Common Pitfalls
 Confusing **initial** distance vectors (only direct neighbors known; rest $\infty$) with **converged** vectors (global shortest paths). Forgetting the Count-to-Infinity problem when link costs **increase** — "bad news travels slow." Applying the Bellman-Ford equation incorrectly: $D_x(y) = \min_v\{c(x,v) + D_v(y)\}$ minimizes over **neighbors** $v$, not all nodes.

## Summary

> TL;DR — Bellman-Ford is a decentralized distance-vector algorithm where each node shares its distance vector with neighbors and updates using $D_x(y) = \min_v\{c(x,v) + D_v(y)\}$. It converges to shortest paths but suffers from the Count-to-Infinity problem on cost increases.

## Review Questions

_To be added._

## Links
 **Related:** - [[Pasted image 20251121093513.png]] **Source / Reference:**

## Multiple Choice Questions

1. Which word completes the following sentence from the text: ""Bad news travels slow" _____ increase causes Count-to-Infinity)."?
    - **A)** Protocol
    - **B)** Cost
    - **C)** Network
    - **D)** Router

2. Which word completes the following sentence from the text: "Forgetting the Count-to-Infinity problem when link costs **increase** — "bad news travels slow." Applying the _____ equation incorrectly: $D_x(y) = \min_v\{c(x,v) + D_v(y)\}$ minimizes over **neighbors** $v$, not all nodes."?
    - **A)** Router
    - **B)** Network
    - **C)** Protocol
    - **D)** BellmanFord

3. Which word completes the following sentence from the text: "Concept Overview: Distance Vector (DV)  _____  Distance Vector routing is decentralized."?
    - **A)** Router
    - **B)** Protocol
    - **C)** Definition
    - **D)** Network

4. Which word completes the following sentence from the text: "**Correct Answer:** **Count to Infinity problem**  ## Summary of Logic (Cheat Sheet)  _____               |                           |                              | | ------------- | ------------------------- | ---------------------------- | | **State**     | **Knowledge Scope**       | **Values for Non-Neighbors** | | **Initial**   | Local (Direct Links only) | Infinity ($\infty$ or 'x')   | | **Converged** | Global (Best Paths)       | True Shortest Distance       |  Key Phrase:  "Good news travels fast" (Cost decrease propagates quickly)."?
    - **A)** 
    - **B)** Protocol
    - **C)** Network
    - **D)** Router

5. Which word completes the following sentence from the text: "If a neighbor finds a cheaper path _____ that information, it updates its own vector."?
    - **A)** using
    - **B)** Router
    - **C)** Network
    - **D)** Protocol

6. Which word completes the following sentence from the text: "They keep adding +1 to the _____ until it hits a predefined "Infinity"."?
    - **A)** Protocol
    - **B)** Network
    - **C)** Router
    - **D)** cost

7. Which word completes the following sentence from the text: "_Example:_ A thinks best path is _____ B thinks best path is A."?
    - **A)** Router
    - **B)** Protocol
    - **C)** Network
    - **D)** B

8. Which word completes the following sentence from the text: "--- id: Bellman-Ford-Distance-Vector-Algorithm type: note course: CSNETWK topic: status: completed ---  # Bellman Ford Distance Vector Algorithm  > [!info] Document Metadata > - **Course:** `=this.course` > - _____ `=this.topic` > - **Status:** `=this.status`  **🏷️ Tags:** #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]  ---  ## Overview  > Distance Vector routing is decentralized."?
    - **A)** Topic
    - **B)** Network
    - **C)** Router
    - **D)** Protocol

9. Which word completes the following sentence from the text: "They only know:  ## Key Concepts  Target _____ Nodes  ## Details / Theory  ## 1."?
    - **A)** Router
    - **B)** Protocol
    - **C)** Router
    - **D)** Network

10. Which word completes the following sentence from the text: "The "Tell Your Neighbors" Rule  Each router periodically _____ its own best-path estimates (vector) to its neighbors."?
    - **A)** Network
    - **B)** Router
    - **C)** sends
    - **D)** Protocol


### Answer Key & Explanations
1. **B)** Cost completes the sentence: "Bad news travels slow" (Cost increase causes Coun...
2. **D)** BellmanFord completes the sentence: Forgetting the Count-to-Infinity problem when link...
3. **C)** Definition completes the sentence: Concept Overview: Distance Vector (DV)  Definition...
4. **A)**  completes the sentence: **Correct Answer:** **Count to Infinity problem** ...
5. **A)** using completes the sentence: If a neighbor finds a cheaper path using that info...
6. **D)** cost completes the sentence: They keep adding +1 to the cost until it hits a pr...
7. **D)** B completes the sentence: _Example:_ A thinks best path is B; B thinks best ...
8. **A)** Topic completes the sentence: --- id: Bellman-Ford-Distance-Vector-Algorithm typ...
9. **A)** Router completes the sentence: They only know:  ## Key Concepts  Target Router No...
10. **C)** sends completes the sentence: The "Tell Your Neighbors" Rule  Each router period...

## References & Navigation

- **Previous Topic:** [[Dijkstra's Algorithm (Advanced)]]
- **Next Topic:** [[Link Layer]]
- **Related Notes:** [[Internetworking]]
