---
id: ps_justice_arcana
type: problem_set
course: CSALGCM
topic: "Justice Arcana"
status: completed
---

# Justice Arcana: Minimum Spanning Trees & Circular Routing

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSALGCM]] #[[Problem Sets]] #[[HackerRank]] #[[Algorithms]] #[[Greedy Algorithms]]

---

## Overview

The Justice Arcana embodies balance and cycle-free connectivity: **Minimum Spanning Trees (Kruskal's Algorithm with Disjoint Set Union)** and **Circular Greedy Tour Routing (The Gas Station Problem)**.

---

## Problem 1: Minimum Spanning Tree (Kruskal's Algorithm)

### Problem Description
Given a connected, undirected graph $G = (V, E)$ with edge weight function $w: E \to \mathbb{R}$. A spanning tree is an acyclic subgraph $T \subseteq E$ connecting all vertices $|V|$. Find a spanning tree that minimizes the total weight:
$$
w(T) = \sum_{e \in T} w(e)
$$

**Constraints:**
- $1 \le |V| \le 10^5$
- $1 \le |E| \le 2 \times 10^5$
- Edge weights $w(e)$ can be positive or negative.

### Cut Property & Greedy Choice Proof
**Cut Property:** Let $(S, V \setminus S)$ be any partition (cut) of vertices $V$. If edge $e = (u, v)$ is a light edge (strictly minimum weight) crossing the cut (where $u \in S, v \in V \setminus S$), then $e$ belongs to some Minimum Spanning Tree of $G$.

**Kruskal's Strategy:**
1. Sort all edges $E$ in non-decreasing order of weight: $w(e_1) \le w(e_2) \le \dots \le w(e_m)$.
2. Iterate through sorted edges. For each edge $(u, v)$:
   - Check if $u$ and $v$ belong to different connected components using **Disjoint Set Union (DSU)**.
   - If in different components, add $(u, v)$ to the spanning forest and unify their components.
   - If in the same component, reject $(u, v)$ to prevent forming a cycle.
3. Terminate when $|V| - 1$ edges have been accepted.

### Stepped Trace
Consider graph with $V = \{0, 1, 2, 3, 4\}$ and edges:
$E = \{(0,1, 1), (1,2, 2), (0,2, 3), (1,3, 3), (3,4, 4), (2,4, 5), (2,3, 6)\}$.

| Edge $(u, v)$ | Weight | Component $u$ | Component $v$ | Action | Spanning Tree Edge Count |
| :---: | :---: | :---: | :---: | :---: | :---: |
| $(0, 1)$ | 1 | $\{0\}$ | $\{1\}$ | **Accept** (Union $\{0, 1\}$) | 1 |
| $(1, 2)$ | 2 | $\{0, 1\}$ | $\{2\}$ | **Accept** (Union $\{0, 1, 2\}$) | 2 |
| $(0, 2)$ | 3 | $\{0, 1, 2\}$ | $\{0, 1, 2\}$ | Reject (Forms Cycle $0-1-2-0$) | 2 |
| $(1, 3)$ | 3 | $\{0, 1, 2\}$ | $\{3\}$ | **Accept** (Union $\{0, 1, 2, 3\}$) | 3 |
| $(3, 4)$ | 4 | $\{0, 1, 2, 3\}$ | $\{4\}$ | **Accept** (Union $\{0, 1, 2, 3, 4\}$) | **4** ($|V|-1$) |

Algorithm terminates. Total MST Weight: $1 + 2 + 3 + 4 = \mathbf{10}$.

---

## Problem 2: Circular Routing (The Gas Station Problem)

### Problem Description
There are $n$ gas stations arranged in a clockwise circular route. Station $i$ offers `gas[i]` fuel, and the cost to travel from station $i$ to station $(i+1) \pmod n$ is `cost[i]`. Starting with an empty tank, find the unique starting station index from which a car can complete one full circular tour. If no such start exists, return $-1$.

**Constraints:**
- $1 \le n \le 10^5$
- $0 \le \text{gas}[i], \text{cost}[i] \le 10^4$

### Greedy Reset Paradigm
1. **Global Feasibility:** If $\sum \text{gas}[i] < \sum \text{cost}[i]$, total energy is strictly insufficient; return $-1$.
2. **Greedy Start Selection:**
   - Maintain `tank = 0` and candidate `start = 0`.
   - Iterate $i$ from $0$ to $n-1$, accumulating net fuel: $\Delta_i = \text{gas}[i] - \text{cost}[i]$.
   - If `tank + \Delta_i < 0`, a car starting at any station $k \in [\text{start}, i]$ would run out of fuel before or at station $i$.
   - Therefore, greedily reset `start = i + 1` and `tank = 0`.

### Stepped Calculation Trace
Let `gas = [1, 2, 3, 4, 5]` and `cost = [3, 4, 5, 1, 2]`.
- Total gas = $15$, Total cost = $15 \implies \text{Total} \ge 0$ (Feasible!).
- $i=0$: $\Delta_0 = 1 - 3 = -2$. `tank` = $-2 < 0 \implies$ Reset: `start` = 1, `tank` = 0.
- $i=1$: $\Delta_1 = 2 - 4 = -2$. `tank` = $-2 < 0 \implies$ Reset: `start` = 2, `tank` = 0.
- $i=2$: $\Delta_2 = 3 - 5 = -2$. `tank` = $-2 < 0 \implies$ Reset: `start` = 3, `tank` = 0.
- $i=3$: $\Delta_3 = 4 - 1 = +3$. `tank` = $3 \ge 0$.
- $i=4$: $\Delta_4 = 5 - 2 = +3$. `tank` = $3 + 3 = 6 \ge 0$.

Unique Valid Starting Station: **Index 3** (0-indexed).

---

## Complete C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <numeric>
#include <algorithm>

using namespace std;

// --- Problem 1: Kruskal's MST with Disjoint Set Union (DSU) ---
struct Edge {
    int u, v, weight;
};

struct DSU {
    vector<int> parent;
    vector<int> rank;

    DSU(int n) {
        parent.resize(n);
        iota(parent.begin(), parent.end(), 0);
        rank.assign(n, 0);
    }

    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); // Path compression
    }

    bool unite(int i, int j) {
        int root_i = find(i);
        int root_j = find(j);
        if (root_i == root_j) return false;

        // Union by rank
        if (rank[root_i] < rank[root_j]) {
            parent[root_i] = root_j;
        } else if (rank[root_i] > rank[root_j]) {
            parent[root_j] = root_i;
        } else {
            parent[root_j] = root_i;
            rank[root_i]++;
        }
        return true;
    }
};

int kruskalMST(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) {
        return a.weight < b.weight;
    });

    DSU dsu(n);
    int mstWeight = 0;
    int edgesAdded = 0;

    for (const auto& edge : edges) {
        if (dsu.unite(edge.u, edge.v)) {
            mstWeight += edge.weight;
            edgesAdded++;
            if (edgesAdded == n - 1) break;
        }
    }
    return (edgesAdded == n - 1) ? mstWeight : -1; // -1 if disconnected
}

// --- Problem 2: Gas Station Circuit ---
int canCompleteCircuit(const vector<int>& gas, const vector<int>& cost) {
    int total_gas = 0, total_cost = 0;
    int tank = 0, start = 0;

    for (size_t i = 0; i < gas.size(); i++) {
        total_gas += gas[i];
        total_cost += cost[i];
        tank += gas[i] - cost[i];

        if (tank < 0) {
            start = i + 1;
            tank = 0; // Reset
        }
    }

    return (total_gas < total_cost) ? -1 : start;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Test Kruskal MST
    int n = 5;
    vector<Edge> edges = {
        {0, 1, 1}, {1, 2, 2}, {0, 2, 3}, {1, 3, 3},
        {3, 4, 4}, {2, 4, 5}, {2, 3, 6}
    };
    cout << "Kruskal MST Total Weight: " << kruskalMST(n, edges) << "\n"; // Output: 10

    // Test Gas Station
    vector<int> gas = {1, 2, 3, 4, 5};
    vector<int> cost = {3, 4, 5, 1, 2};
    cout << "Optimal Gas Station Start Index: " << canCompleteCircuit(gas, cost) << "\n"; // Output: 3

    return 0;
}
```


## References & Navigation

- **Previous Topic:** [[[PS] Hermit Arcana]]
- **Related Notes:** [[Greedy Algorithms Introduction]], [[Minimum Spanning Tree]]
