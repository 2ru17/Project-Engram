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

**🏷️ Tags:** #[[CSNETWK]] #[[Computer Science]] #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]

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

## Review Questions

_To be added._

## Links
 **Related:** - [[Pasted image 20251121093359.png]] **Source / Reference:**

## Multiple Choice Questions

1. Which word completes the following sentence from the text: "If node $A$ is $B$’s predecessor, then _____ \to B) = D(B) - D(A)$."?
- **A)** Router
- **B)** Network
- **C)** textcostA
- **D)** Protocol

2. Which word completes the following sentence from the text: "**Conclusion:** The table shows that the shortest path to W is direct _____ X) and the shortest path to Y is direct (via X)."?
- **A)** Protocol
- **B)** Network
- **C)** Router
- **D)** via

3. Which word completes the following sentence from the text: "Since the actual cost to _____ is 3, this is impossible."?
- **A)** W
- **B)** Protocol
- **C)** Router
- **D)** Network

4. Which word completes the following sentence from the text: "**Analyze the Table (Row Z):** **Destination:** Z _____ Distance:** 9 **Previous Node:** Y  3."?
- **A)** Shortest
- **B)** Protocol
- **C)** Router
- **D)** Network

5. Which word completes the following sentence from the text: "**Correct Answer:** **2**  ## Summary of Logic (Cheat Sheet)  Reverse Engineering Formula:  $$\text{Cost}(\text{Link } A \rightarrow _____ = D(B) - D(A)$$  (This only applies if A is the "Previous Node" for B)."?
- **A)** B
- **B)** Router
- **C)** Protocol
- **D)** Network

6. Which word completes the following sentence from the text: "--- id: Dijkstra's-Algorithm-(Advanced) type: note course: CSNETWK topic: status: completed ---  # Dijkstra's Algorithm (Advanced)  > [!info] Document Metadata > - **Course:** `=this.course` > - **Topic:** `=this.topic` > - **Status:** `=this.status`  **🏷️ Tags:** #[[CSNETWK]] #[[Computer _____ #[[Computer Networks]] #[[Networking Protocols]] #[[Graph Theory Basics]]  ---  ## Overview  > In advanced problems, you may be given the result (the forwarding table) and asked to deduce the missing properties of the network (link costs)."?
- **A)** Router
- **B)** Network
- **C)** Protocol
- **D)** Science

7. Which word completes the following sentence from the text: "If we went X $\rightarrow$ W $\rightarrow$ _____ cost would be $3 + \text{cost}(x)$."?
- **A)** Router
- **B)** Protocol
- **C)** Y
- **D)** Network

8. Which word completes the following sentence from the text: "Links unused in any shortest _____ may have unknown exact costs."?
- **A)** Router
- **B)** path
- **C)** Network
- **D)** Protocol

9. Which word completes the following sentence from the text: "Mathematically: $D(Z) = D(Y) + c(Y,Z)$  Substitute values from table: $9 = _____ + c(Y,Z)$  Solve for $c(Y,Z)$: $9 - 7 = 2$  4."?
- **A)** 7
- **B)** Network
- **C)** Protocol
- **D)** Router

10. Which word completes the following sentence from the text: "If we went X $\rightarrow$ Y $\rightarrow$ _____ cost would be $7 + \text{cost}(x)$."?
- **A)** Router
- **B)** Protocol
- **C)** Network
- **D)** W


### Answer Key & Explanations
1. **C)** textcostA completes the sentence: If node $A$ is $B$’s predecessor, then $\text{cost...
2. **D)** via completes the sentence: **Conclusion:** The table shows that the shortest ...
3. **A)** W completes the sentence: Since the actual cost to W is 3, this is impossibl...
4. **A)** Shortest completes the sentence: **Analyze the Table (Row Z):** **Destination:** Z ...
5. **A)** B completes the sentence: **Correct Answer:** **2**  ## Summary of Logic (Ch...
6. **D)** Science completes the sentence: --- id: Dijkstra's-Algorithm-(Advanced) type: note...
7. **C)** Y completes the sentence: If we went X $\rightarrow$ W $\rightarrow$ Y, cost...
8. **B)** path completes the sentence: Links unused in any shortest path may have unknown...
9. **A)** 7 completes the sentence: Mathematically: $D(Z) = D(Y) + c(Y,Z)$  Substitute...
10. **D)** W completes the sentence: If we went X $\rightarrow$ Y $\rightarrow$ W, cost...

## References & Navigation

- **Previous Topic:** [[Dijkstra's Link State Algorithm]]
- **Next Topic:** [[Bellman Ford Distance Vector Algorithm]]
- **Related Notes:** [[Distance-Vector Routing and RIP]], [[Link-State Routing and OSPF]]
