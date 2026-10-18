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

**Tags:** #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]

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

## Links
 **Related:** - [[Pasted image 20251121093513.png]] **Source / Reference:**

## Multiple Choice Questions

1. Which equation states the **Bellman-Ford equation** used by Distance-Vector (DV) routing protocols to compute the least-cost path $D_x(y)$ from router $x$ to destination $y$?
    - **A)** $D_x(y) = \max_{v \in N(x)} \{ c(x, v) \cdot D_v(y) \}$
    - **B)** $D_x(y) = \min_{v \in N(x)} \{ c(x, v) + D_v(y) \}$, where $N(x)$ is the set of direct neighbors of $x$ and $c(x, v)$ is the direct link cost to neighbor $v$.
    - **C)** $D_x(y) = \sum_{v \in N(x)} c(x, v)$
    - **D)** $D_x(y) = c(x, y) - \min_{v} D_v(y)$

2. How does the information known by each router in a **Distance-Vector** protocol (like RIP) differ from that in a **Link-State** protocol (like OSPF)?
    - **A)** In Distance-Vector, a router knows only the link costs to its **direct physical neighbors** and the distance vectors received from those neighbors (iterative, asynchronous, distributed computation); in Link-State, every router floods link-state advertisements so all routers know the complete global topology.
    - **B)** In Distance-Vector, each router knows the complete global graph topology of the entire autonomous system.
    - **C)** Distance-Vector routers never exchange messages with neighbors.
    - **D)** Link-State routers only communicate with a single central SDN controller.

3. What triggers a router $x$ in the Distance-Vector algorithm to send an updated distance vector $\mathbf{D}_x$ to its direct neighbors?
    - **A)** Every time a data packet is forwarded.
    - **B)** Only when the network administrator reboots the router.
    - **C)** Only when router $x$ experiences a change in a local link cost OR receives a distance vector from a neighbor that causes **its own least-cost estimate $D_x(y)$ to change** for at least one destination $y$ (plus periodic keep-alive intervals).
    - **D)** Whenever a host sends an ARP request.

4. Why does the **Count-to-Infinity ("Bad News Travels Slowly")** problem occur in basic Distance-Vector routing when a link cost increases drastically or a link fails?
    - **A)** Because routers immediately set all distances to $0$.
    - **B)** Because link costs are negative.
    - **C)** Because Bellman-Ford cannot handle graphs with more than $3$ nodes.
    - **D)** Because when $x$'s direct link to $y$ fails, neighbor $z$ may still advertise its old cost $D_z(y)$ that was actually routed *through $x$*; $x$ mistakenly believes $z$ has an alternate path to $y$ and updates $D_x(y) = c(x, z) + D_z(y)$, causing $x$ and $z$ to increment their costs back and forth until reaching $\infty$.

5. How does **Poisoned Reverse** (combined with Split Horizon) mitigate routing loops between two adjacent routers $x$ and $z$?
    - **A)** It floods the entire network topology to all routers every millisecond.
    - **B)** If router $z$ routes through neighbor $x$ to reach destination $y$, $z$ advertises $D_z(y) = \infty$ back to $x$ so $x$ will never attempt to route to $y$ via $z$.
    - **C)** It disables all backup links in the network using Spanning Tree Protocol.
    - **D)** It encrypts the routing table using TLS.

### Answer Key & Explanations

1. **B**. By dynamic programming (the Bellman-Ford equation), the minimum cost from $x$ to $y$ is the minimum over all direct neighbors $v \in N(x)$ of the step cost $c(x, v)$ plus $v$'s shortest path cost $D_v(y)$.
2. **A**. DV routing is decentralized ("routing by rumor"): routers exchange only cumulative cost vectors with immediate neighbors without ever building a complete map of the network graph.
3. **C**. If a neighbor's update does not change any entry in $x$'s minimum-cost vector $\mathbf{D}_x$, $x$ sends no update, allowing the algorithm to quiesce once converged.
4. **D**. Because distance vectors hide the full path (only reporting total distance), $x$ cannot tell that $z$'s path to $y$ passes through $x$ itself, creating a mutual routing loop whose cost ticks upward slowly.
5. **B**. Poisoned Reverse prevents 2-node routing loops by advertising an infinite distance ($D_z(y) = \infty$, e.g., $16$ in RIP) for destination $y$ back to the next-hop neighbor $x$ used to reach $y$.

## References & Navigation

- **Previous Topic:** [[Dijkstra's Algorithm (Advanced)]]
- **Next Topic:** [[Link Layer]]
- **Related Notes:** [[Internetworking]]
