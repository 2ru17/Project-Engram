---
id: ps_chariot_arcana
type: problem_set
course: CSALGCM
topic: "Chariot Arcana"
status: completed
---

# Chariot Arcana: Activity Selection & Fractional Knapsack

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSALGCM]] #[[Problem Sets]] #[[HackerRank]] #[[Algorithms]] #[[Greedy Algorithms]]

---

## Overview

The Chariot Arcana emphasizes optimal forward progress without backtracking: **The Greedy Paradigm**. Solutions make the locally optimal choice at each step to arrive at a globally optimal solution. This problem set explores **Activity Selection (Interval Scheduling)** and the **Fractional Knapsack Problem**.

---

## Problem 1: Activity Selection (Interval Scheduling)

### Problem Description
Given a set of $n$ activities $S = \{a_1, a_2, \dots, a_n\}$, where each activity $a_i$ has a start time $s_i$ and a finish time $f_i$ ($s_i < f_i$). Two activities $a_i$ and $a_j$ are compatible if their time intervals do not overlap ($s_i \ge f_j$ or $s_j \ge f_i$). Find a maximum-cardinality subset of mutually compatible activities.

**Constraints:**
- $1 \le n \le 10^5$
- $0 \le s_i < f_i \le 10^9$

### Greedy Choice Property: The Exchange Argument Proof
**Greedy Strategy:** Sort all activities in non-decreasing order of their finish times: $f_1 \le f_2 \le \dots \le f_n$. Always pick the activity with the earliest finish time that is compatible with previously selected activities.

**Stepped Proof by Exchange Argument:**
1. Let $A_k$ be the activity with the earliest finish time in the current remaining candidate set.
2. Suppose an optimal solution $OPT$ does not contain $A_k$. Let the first activity in $OPT$ ordered by finish time be $A_j$ ($j \ne k$).
3. Since $A_k$ has the minimal finish time, $f_k \le f_j$.
4. Replacing $A_j$ with $A_k$ in $OPT$ creates a new subset $OPT' = (OPT \setminus \{A_j\}) \cup \{A_k\}$.
5. Because $f_k \le f_j$, $A_k$ finishes before or at the same time $A_j$ did; hence, $A_k$ cannot conflict with any subsequent activities in $OPT$.
6. Therefore, $OPT'$ is also a valid compatible subset with $|OPT'| = |OPT|$, proving that the greedy choice $A_k$ belongs to at least one optimal solution.

### Stepped Trace
Consider $n = 6$ activities sorted by finish time $f_i$:

| Activity $i$ | Start $s_i$ | Finish $f_i$ | Action | Reason |
| :---: | :---: | :---: | :---: | :--- |
| $a_1$ | 1 | 2 | **Select** | First activity with earliest finish ($last\_end = 2$) |
| $a_2$ | 3 | 4 | **Select** | $s_2 = 3 \ge last\_end = 2$ ($last\_end \leftarrow 4$) |
| $a_3$ | 0 | 6 | Reject | $s_3 = 0 < last\_end = 4$ (Overlaps) |
| $a_4$ | 5 | 7 | **Select** | $s_4 = 5 \ge last\_end = 4$ ($last\_end \leftarrow 7$) |
| $a_5$ | 8 | 9 | **Select** | $s_5 = 8 \ge last\_end = 7$ ($last\_end \leftarrow 9$) |
| $a_6$ | 5 | 9 | Reject | $s_6 = 5 < last\_end = 9$ (Overlaps) |

Maximum compatible activities selected: **4** ($\{a_1, a_2, a_4, a_5\}$).

---

## Problem 2: Fractional Knapsack Problem

### Problem Description
Given a knapsack with maximum weight capacity $W$, and $n$ items where each item $i$ has weight $w_i > 0$ and value $v_i > 0$. Unlike the 0/1 knapsack, fractions of items may be taken (e.g., $x_i \in [0, 1]$ of item $i$, contributing $x_i \cdot w_i$ weight and $x_i \cdot v_i$ value). Maximize total value.

**Constraints:**
- $1 \le n \le 10^5$
- $1 \le W \le 10^9$
- $1 \le w_i, v_i \le 10^5$

### Approach & Intuition
Compute the **value density** (value per unit weight) for each item:
$$
\rho_i = \frac{v_i}{w_i}
$$
Sort items in descending order of density: $\rho_1 \ge \rho_2 \ge \dots \ge \rho_n$.
Greedily consume items in this order: take the full item if remaining capacity permits; otherwise, take whatever fraction fills the remaining capacity and terminate.

### Stepped Calculation Trace
Let $W = 50$, with 3 items:
- Item 1: $v_1 = 60, w_1 = 10 \implies \rho_1 = 6.0$
- Item 2: $v_2 = 100, w_2 = 20 \implies \rho_2 = 5.0$
- Item 3: $v_3 = 120, w_3 = 30 \implies \rho_3 = 4.0$

1. **Item 1:** $w_1 = 10 \le 50$. Take 100%: $x_1 = 1.0$. Added value = 60. Remaining $W = 40$.
2. **Item 2:** $w_2 = 20 \le 40$. Take 100%: $x_2 = 1.0$. Added value = 100. Remaining $W = 20$.
3. **Item 3:** $w_3 = 30 > 20$. Take fraction $x_3 = 20 / 30 = \frac{2}{3}$. Added value = $\frac{2}{3} \times 120 = 80$. Remaining $W = 0$.
4. **Total Maximum Value:** $60 + 100 + 80 = \mathbf{240.0}$.

---

## Complete C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <iomanip>

using namespace std;

struct Activity {
    int start;
    int finish;
};

struct Item {
    double value;
    double weight;
};

// Problem 1: Activity Selection
int maxActivities(vector<Activity>& acts) {
    // Sort strictly by finish time
    sort(acts.begin(), acts.end(), [](const Activity& a, const Activity& b) {
        return a.finish < b.finish;
    });

    int count = 0;
    int lastFinish = -1;

    for (const auto& act : acts) {
        if (act.start >= lastFinish) {
            count++;
            lastFinish = act.finish;
        }
    }
    return count;
}

// Problem 2: Fractional Knapsack
double fractionalKnapsack(double W, vector<Item>& items) {
    // Sort descending by value-to-weight ratio
    sort(items.begin(), items.end(), [](const Item& a, const Item& b) {
        return (a.value / a.weight) > (b.value / b.weight);
    });

    double totalValue = 0.0;
    double currentWeight = 0.0;

    for (const auto& item : items) {
        if (currentWeight + item.weight <= W) {
            currentWeight += item.weight;
            totalValue += item.value;
        } else {
            double remain = W - currentWeight;
            totalValue += item.value * (remain / item.weight);
            break; // Knapsack is full
        }
    }
    return totalValue;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Test Activity Selection
    vector<Activity> activities = {{1, 2}, {3, 4}, {0, 6}, {5, 7}, {8, 9}, {5, 9}};
    cout << "Max Compatible Activities: " << maxActivities(activities) << "\n"; // Output: 4

    // Test Fractional Knapsack
    vector<Item> items = {{60, 10}, {100, 20}, {120, 30}};
    double W = 50;
    cout << fixed << setprecision(2);
    cout << "Max Knapsack Value: " << fractionalKnapsack(W, items) << "\n"; // Output: 240.00

    return 0;
}
```

---

## References & Navigation

- **Previous Topic:** [[[PS] Lovers Arcana]]
- **Next Topic:** [[[PS] Hermit Arcana]]
- **Related Notes:** [[Greedy Algorithms Introduction]]
