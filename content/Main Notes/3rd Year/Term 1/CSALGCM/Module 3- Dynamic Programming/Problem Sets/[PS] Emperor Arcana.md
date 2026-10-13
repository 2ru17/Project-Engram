---
id: ps_emperor_arcana
type: problem_set
course: CSALGCM
topic: "Emperor Arcana"
status: completed
---

# Emperor Arcana: 0/1 Knapsack & Coin Change

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSALGCM]] #[[Problem Sets]] #[[HackerRank]] #[[Algorithms]] #[[Dynamic Programming]]

---

## Overview

The Emperor Arcana represents dynamic programming foundations built on optimal substructure, state memoization, and space-optimized tabulation. This problem set explores two cornerstone problems: **The 0/1 Knapsack Problem** and **The Fewest Coins Change Problem**.

---

## Problem 1: The Emperor's Vault (0/1 Knapsack)

### Problem Description
Given $N$ imperial relics, each with an integer weight $w_i > 0$ and integer value $v_i > 0$, and a royal vault cart with maximum carrying capacity $W$. Determine the maximum total value of relics that can be transported. Each relic can be taken at most once ($0$ or $1$).

**Constraints:**
- $1 \le N \le 1000$
- $1 \le W \le 10^4$
- $1 \le w_i \le W$
- $1 \le v_i \le 10^5$

### Approach & Intuition: Optimal Substructure
Let $DP[i][w]$ be the maximum value achievable considering a subset of the first $i$ relics with maximum capacity limit $w$.
For the $i$-th relic with weight $w_i$ and value $v_i$:
1. **Exclude relic $i$:** The capacity remains $w$, giving value $DP[i-1][w]$.
2. **Include relic $i$ (if $w \ge w_i$):** Take relic $i$, gaining value $v_i$, while remaining capacity becomes $w - w_i$, giving value $DP[i-1][w - w_i] + v_i$.

#### Recurrence Relation
$$
DP[i][w] = \begin{cases} 
0 & \text{if } i = 0 \text{ or } w = 0 \\
DP[i-1][w] & \text{if } w < w_i \\
\max(DP[i-1][w], DP[i-1][w - w_i] + v_i) & \text{if } w \ge w_i 
\end{cases}
$$

### Stepped Calculation Trace
Consider $N = 4, W = 7$:
- Relic 1: $w_1 = 1, v_1 = 1$
- Relic 2: $w_2 = 3, v_2 = 4$
- Relic 3: $w_3 = 4, v_3 = 5$
- Relic 4: $w_4 = 5, v_4 = 7$

#### Tabulation Matrix: $DP[i][w]$

| Relic $i$ ($w_i, v_i$) | $w=0$ | $w=1$ | $w=2$ | $w=3$ | $w=4$ | $w=5$ | $w=6$ | $w=7$ |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **0 (Base)** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1 (1, 1)** | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| **2 (3, 4)** | 0 | 1 | 1 | 4 | 5 | 5 | 5 | 5 |
| **3 (4, 5)** | 0 | 1 | 1 | 4 | 5 | 6 | 6 | 9 |
| **4 (5, 7)** | 0 | 1 | 1 | 4 | 5 | 7 | 8 | **9** |

**Optimal Selection Traceback:**
- At $DP[4][7] = 9 == DP[3][7]$: Relic 4 not taken. Move to $(3, 7)$.
- At $DP[3][7] = 9 \ne DP[2][7] = 5$: Relic 3 is **taken** ($v_3 = 5$). Remaining capacity $7 - 4 = 3$. Move to $(2, 3)$.
- At $DP[2][3] = 4 \ne DP[1][3] = 1$: Relic 2 is **taken** ($v_2 = 4$). Remaining capacity $3 - 3 = 0$. Move to $(1, 0)$.
- Selected Relics: Relic 3 and Relic 2. Total Value: $5 + 4 = 9$, Total Weight: $4 + 3 = 7 \le 7$.

### Complexity Analysis
- **Time Complexity:** $O(N \cdot W)$ because each state in the $N \times W$ grid is computed in $O(1)$ time.
- **Space Complexity:** 
  - Standard 2D DP: $O(N \cdot W)$.
  - Optimized 1D DP: $O(W)$ by traversing capacity backwards ($w = W \dots w_i$), ensuring each item is considered at most once.

---

## Problem 2: Imperial Coin Exchange (Coin Change Problem)

### Problem Description
Given an array of coin denominations $C = [c_1, c_2, \dots, c_k]$ and a target amount $A$. Find the **minimum number of coins** needed to make up that amount. If the amount cannot be formed, return $-1$. Each coin denomination has infinite supply (Unbounded).

**Constraints:**
- $1 \le k \le 12$
- $1 \le c_i \le 10^4$
- $0 \le A \le 10^4$

### Approach & Intuition
Let $DP[a]$ be the minimum number of coins to make amount $a$.
For any target amount $a > 0$:
$$
DP[a] = 1 + \min_{c_i \le a} DP[a - c_i]
$$
Base case: $DP[0] = 0$. Initialize all $DP[a] = \infty$ for $a > 0$.

### Stepped Calculation Trace
Let $C = [1, 2, 5]$ and $A = 11$:
- $DP[0] = 0$
- $DP[1] = 1 + DP[0] = 1$
- $DP[2] = 1 + \min(DP[1], DP[0]) = 1 + 0 = 1$ (using coin 2)
- $DP[3] = 1 + \min(DP[2], DP[1]) = 1 + 1 = 2$
- $DP[4] = 1 + \min(DP[3], DP[2]) = 1 + 1 = 2$
- $DP[5] = 1 + \min(DP[4], DP[3], DP[0]) = 1 + 0 = 1$ (using coin 5)
- $DP[11] = 1 + \min(DP[10], DP[9], DP[6]) = 1 + DP[10] = 1 + 2 = 3$ (coins: $5 + 5 + 1$).

---

## Complete C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Problem 1: 0/1 Knapsack with 1D Space Optimization
int solveKnapsack01(int W, const vector<int>& weights, const vector<int>& values) {
    int n = weights.size();
    vector<int> dp(W + 1, 0);

    for (int i = 0; i < n; i++) {
        // Traverse backwards to prevent using the same item multiple times
        for (int w = W; w >= weights[i]; w--) {
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    return dp[W];
}

// Problem 2: Fewest Coins Change
int solveCoinChange(const vector<int>& coins, int amount) {
    const int INF = 1e9;
    vector<int> dp(amount + 1, INF);
    dp[0] = 0;

    for (int a = 1; a <= amount; a++) {
        for (int coin : coins) {
            if (a >= coin && dp[a - coin] != INF) {
                dp[a] = min(dp[a], dp[a - coin] + 1);
            }
        }
    }
    return (dp[amount] >= INF) ? -1 : dp[amount];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Test 0/1 Knapsack
    int W = 7;
    vector<int> weights = {1, 3, 4, 5};
    vector<int> values = {1, 4, 5, 7};
    cout << "Max Knapsack Value: " << solveKnapsack01(W, weights, values) << "\n"; // Output: 9

    // Test Coin Change
    vector<int> coins = {1, 2, 5};
    int amount = 11;
    cout << "Min Coins Needed: " << solveCoinChange(coins, amount) << "\n"; // Output: 3

    return 0;
}
```

---

## References & Navigation

- **Previous Topic:** [[Dynamic Programming Introduction]]
- **Next Topic:** [[[PS] Hierophant Arcana]]
- **Related Notes:** [[Towers Problem Set]], [[Divide and Conquer Introduction]]
