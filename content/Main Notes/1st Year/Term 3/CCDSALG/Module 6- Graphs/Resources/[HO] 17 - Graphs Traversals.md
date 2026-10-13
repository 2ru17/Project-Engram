---
id: Handout_17_-_Graphs_Traversals
type: note
course: CCDSALG
topic: Graphs Traversals
status: completed
---

# Graphs Traversals

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCDSALG]] #[[Graphs Traversals]] #[[Conceptual]] #[[M6]]

---

## Overview

This document covers basic algorithms for searching a graph: Breadth-First Search (BFS) and Depth-First Search (DFS). BFS explores edges out of a vertex systemically layer by layer and produces a breadth-first tree. DFS explores as deeply as possible along each branch before backtracking.

## Important Formulas

**Algorithmic Properties & Complexities:**
- **Adjacency List Representation:** Time complexity is $\Theta(V + E)$, Auxiliary space is $O(V)$ for visited tracking and frontier queue/recursion stack.
- **Adjacency Matrix Representation:** Time complexity is $\Theta(V^2)$.
- **BFS Shortest Path Property:** For unweighted graphs, the breadth-first tree guarantees that for every vertex $v$, the tree path from source $s$ to $v$ corresponds to a shortest path (minimum number of edges).
- **DFS Parenthesis Theorem:** For any two vertices $u$ and $v$, the intervals $[d[u], f[u]]$ and $[d[v], f[v]]$ are either completely disjoint or one is strictly contained within the other.

## Theoretical Framework: BFS vs. DFS Exploration Models

```mermaid
graph TD
    subgraph BFSLayers["Breadth-First Search (Queue-Driven Concentric Frontiers)"]
        direction TB
        L0["Layer 0 (Source s) [d = 0]"] --> L1_A["Layer 1: Vertex A [d = 1]"]
        L0 --> L1_B["Layer 1: Vertex B [d = 1]"]
        L1_A --> L2_C["Layer 2: Vertex C [d = 2]"]
        L1_A --> L2_D["Layer 2: Vertex D [d = 2]"]
        L1_B --> L2_E["Layer 2: Vertex E [d = 2]"]
    end
```

### DFS Spanning Forest & Edge Taxonomy

```mermaid
graph TD
    subgraph DFSTree["DFS Tree & Edge Classification"]
        U["Vertex U (d: 1, f: 8)"] -->|"Tree Edge"| V["Vertex V (d: 2, f: 7)"]
        V -->|"Tree Edge"| W["Vertex W (d: 3, f: 4)"]
        V -->|"Tree Edge"| X["Vertex X (d: 5, f: 6)"]
        X -.-|"Back Edge (Ancestor / Cycle Detection)"| U
        U -.-|"Forward Edge (Descendant)"| X
    end
```

### Traversal Execution Pipelines

```mermaid
flowchart TD
    subgraph BFSQueue["BFS Execution Loop"]
        Q_Init["Enqueue source s into Queue Q<br/>visited[s] = true, dist[s] = 0"] --> Q_Empty{"Is Q empty?"}
        Q_Empty -- "No" --> Q_Deq["u = Dequeue(Q)"]
        Q_Deq --> Q_Loop["For each neighbor v in Adj[u]"]
        Q_Loop --> Q_Check{"visited[v] == false?"}
        Q_Check -- "Yes" --> Q_Mark["visited[v] = true<br/>dist[v] = dist[u] + 1<br/>Enqueue(Q, v)"]
        Q_Mark --> Q_Loop
        Q_Check -- "No" --> Q_Loop
        Q_Loop -- "Neighbors Exhausted" --> Q_Empty
        Q_Empty -- "Yes" --> Q_Done["BFS Complete"]
    end
```

## Worked Examples

1. **BFS Traversal Trace:** Starting at vertex $A$ in graph with edges $(A, B), (A, C), (B, D), (C, E)$.
   - Init: $Q = [A]$, visited = $\{A\}$, distances: $d[A]=0$.
   - Dequeue $A$: Enqueue unvisited neighbors $B, C$. $Q = [B, C]$, $d[B]=1, d[C]=1$.
   - Dequeue $B$: Enqueue unvisited neighbor $D$. $Q = [C, D]$, $d[D]=2$.
   - Dequeue $C$: Enqueue unvisited neighbor $E$. $Q = [D, E]$, $d[E]=2$.
   - Dequeue $D, E$: No unvisited neighbors. $Q = []$. Done.
2. **DFS Cycle Detection:** A back edge encountered during DFS on a directed graph indicates a cycle. If neighbor $v$ is already marked `visited` and is currently on the recursion call stack (gray state in 3-color model), a directed cycle is confirmed.


## References & Navigation

- **Related Notes:** [[Graph Traversals]]
