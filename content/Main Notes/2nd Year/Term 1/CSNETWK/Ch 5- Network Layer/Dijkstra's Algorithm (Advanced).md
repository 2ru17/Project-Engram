---
id: Dijkstra's-Algorithm-(Advanced)
type: note
course: CSNETWK
topic:
status: completed
---

# Dijkstra's Algorithm (Advanced)

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]

---

## Overview

> In advanced problems, you may be given the result (the forwarding table) and asked to deduce the missing properties of the network (link costs).

## Key Concepts
 Shortest Distance Previous Node (Predecessor) Source Provided Table Unknowns

## Details / Theory

## 1. Concept Overview: The Forwarding Table

Definition

In advanced problems, you may be given the result (the forwarding table) and asked to deduce the missing properties of the network (link costs).

**Reading the Table**
 **Shortest Distance:** The total cost from Source to Destination. **Previous Node (Predecessor):** The last hop taken to get to the destination. This reveals the structure of the path.

## 2. The Network Topology

**Scenario Data**
![[Pasted image 20251121093359.png]]
 **Provided Table:**
X (0, n/a)
W (3, X)
V (4, X)
U (6, V)
Y (7, X)
Z (9, Y) **Unknowns:**
Link cost `x` (between Y and W)
Link cost `y` (between Y and Z)

## 3. Problem Analysis

### Question 1

**For link X, what is the cost associated with this link?**

**Analytical Breakdown:**

1. **Analyze the Graph:** Link `x` connects Y and W.
2. **Analyze the Table:**
Path to Y: Direct from X (Cost 7).
Path to W: Direct from X (Cost 3).

3. **Check Usage:** Does any shortest path use the link Y-W?
If we went X $\rightarrow$ W $\rightarrow$ Y, cost would be $3 + \text{cost}(x)$. Since the actual cost to Y is 7 (direct), this path implies $3 + x \ge 7$.
If we went X $\rightarrow$ Y $\rightarrow$ W, cost would be $7 + \text{cost}(x)$. Since the actual cost to W is 3, this is impossible.

4. **Conclusion:** The table shows that the shortest path to W is direct (via X) and the shortest path to Y is direct (via X). The link connecting Y and W is **never used** in any shortest path from X. Therefore, its weight cannot be calculated precisely from this table alone.

**Correct Answer:** **n/a**

### Question 2

**For link Y, what is the cost associated with this link?**

**Analytical Breakdown:**

1. **Analyze the Graph:** Link `y` connects Y and Z.
2. **Analyze the Table (Row Z):**
**Destination:** Z
**Shortest Distance:** 9
**Previous Node:** Y

3. **Logical Deduction:**
The path to Z goes through Y.
Mathematically: $D(Z) = D(Y) + c(Y,Z)$

Substitute values from table: $9 = 7 + c(Y,Z)$

Solve for $c(Y,Z)$: $9 - 7 = 2$

4. **Conclusion:** The cost of the link `y` must be 2.

**Correct Answer:** **2**

## Summary of Logic (Cheat Sheet)

Reverse Engineering Formula:

$$\text{Cost}(\text{Link } A \rightarrow B) = D(B) - D(A)$$

(This only applies if A is the "Previous Node" for B).
 **Step 1:** Find the destination in the table (e.g., Z). **Step 2:** Check its "Previous Node" (e.g., Y). **Step 3:** Subtract Distance(Previous) from Distance(Destination).

## Common Pitfalls
 Using $D(B) - D(A)$ when $A$ is **not** $B$’s predecessor — the formula only works along the shortest-path tree. Assuming every link cost can be deduced — links not on any shortest path may have **indeterminate** costs (only a lower bound). Confusing the forwarding table’s "previous node" with the original source.

## Summary

> TL;DR — Advanced Dijkstra problems reverse-engineer link costs from completed forwarding tables. If node $A$ is $B$’s predecessor, then $\text{cost}(A \to B) = D(B) - D(A)$. Links unused in any shortest path may have unknown exact costs.

## Links
 **Related:** - [[Pasted image 20251121093359.png]] **Source / Reference:**

## Multiple Choice Questions

1. In a trace of Dijkstra's Link-State algorithm starting from source node $u$, if two paths to node $v$ have the exact same minimum cumulative cost $D(v)$, what is the effect of the tie-breaking rule?
    - **A)** Dijkstra's algorithm enters an infinite loop and fails to terminate.
    - **B)** Either path yields the exact same optimal shortest-path distance $D(v)$, forming valid equal-cost multipath (ECMP) forwarding trees depending on which node is added to $N'$ first.
    - **C)** Both paths are deleted and $D(v)$ is reset to $\infty$.
    - **D)** The algorithm automatically switches to Bellman-Ford.

2. During each step of Dijkstra's algorithm, after adding node $w$ (the node not yet in $N'$ with the smallest $D(w)$) to the visited set $N'$, which nodes $v$ have their distance estimates $D(v)$ relaxed?
    - **A)** Only nodes $v \notin N'$ that are **direct neighbors adjacent to $w$**, via the relaxation update $D(v) = \min\big(D(v),\; D(w) + c(w, v)\big)$.
    - **B)** Every node in the entire graph, including nodes already in $N'$.
    - **C)** Only the source node $u$.
    - **D)** Only nodes that have no edges connected to $w$.

3. Why does Dijkstra's greedy selection—permanently locking in $D(w)$ as final as soon as $w$ is added to $N'$—require all link costs $c(x, y)$ to be **non-negative** ($c(x, y) \ge 0$)?
    - **A)** Because negative numbers cannot be stored in router memory.
    - **B)** Because Dijkstra's algorithm divides by $c(x, y)$.
    - **C)** Because if all edge weights are non-negative, any alternative path from $u$ to $w$ that exits $N'$ through another unvisited node $z \notin N'$ already has cost $D(z) \ge D(w)$ and cannot become cheaper by adding further non-negative edges; a negative edge could later reduce a path cost below $D(w)$.
    - **D)** Because negative link costs make the graph disconnected.

4. Once Dijkstra's algorithm terminates at source router $u$, how does router $u$ construct its **forwarding table** entry `(Destination, Outgoing Next-Hop Interface)` for a distant node $z$?
    - **A)** It puts $z$ itself as the outgoing next-hop interface.
    - **B)** It picks the neighbor with the highest IP address.
    - **C)** It broadcasts every packet out all interfaces.
    - **D)** It traces predecessor pointers $p(z) \to p(p(z)) \to \cdots$ backward along the shortest-path tree from $z$ to $u$ to find the **first hop (direct neighbor of $u$)** on the shortest path toward $z$.

5. What is **route oscillation** in Link-State routing when link costs are set equal to the real-time traffic load carried on each link?
    - **A)** Routers lose power periodically.
    - **B)** When all routers simultaneously recompute Dijkstra's shortest paths, they all shift traffic onto the currently lightly loaded path, making that path heavily congested on the next LS broadcast so all routers swing back in lockstep on the following cycle.
    - **C)** Packets travel backward from destination to source.
    - **D)** OSPF areas merge into Area 0.

### Answer Key & Explanations

1. **B**. Ties in $D(v)$ represent distinct shortest paths of identical minimum total cost; OSPF can even exploit equal-cost paths for Equal-Cost Multi-Path (ECMP) load balancing.
2. **A**. Only unvisited neighbors $v \notin N'$ adjacent to the newly settled node $w$ can potentially gain a shorter path through $w$, so only those edges $(w, v)$ are relaxed.
3. **C**. Non-negativity guarantees monotonicity of path costs along any path extension: since $D(z) \ge D(w)$ for all $z \notin N'$, adding non-negative edges after $z$ can never beat $D(w)$.
4. **D**. While the shortest-path tree records the immediate predecessor $p(z)$ of each node $z$, router $u$'s forwarding table needs the **outgoing link from $u$** (the first hop after $u$ along the path $u \to \cdots \to z$).
5. **B**. Load-dependent link metrics cause synchronized route flapping (oscillation) unless link-state advertisements are randomized asynchronously or metrics avoid strict traffic-volume dependence.

## References & Navigation

- **Previous Topic:** [[Dijkstra's Link State Algorithm]]
- **Next Topic:** [[Bellman Ford Distance Vector Algorithm]]
- **Related Notes:** [[Distance-Vector Routing and RIP]], [[Link-State Routing and OSPF]]
