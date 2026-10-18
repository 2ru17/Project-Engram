---
id: ps_lovers_arcana
type: problem_set
course: CSALGCM
topic: "Lovers Arcana"
status: completed
---

# Lovers Arcana: Edit Distance & Subset Sum

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSALGCM]] #[[Problem Sets]] #[[HackerRank]] #[[Algorithms]] #[[Dynamic Programming]]

---

## Overview

The Lovers Arcana covers structural alignment and combinatorial decision problems: **Edit Distance (Levenshtein Distance)** and the **Subset Sum / Partition Problem**.

---

## Problem 1: Edit Distance (Levenshtein Distance)

### Problem Description
Given two strings $A$ of length $m$ and $B$ of length $n$, determine the minimum number of single-character edit operations required to convert string $A$ into string $B$. The allowed operations are:
1. **Insert** a character.
2. **Delete** a character.
3. **Replace** a character.

**Constraints:**
- $0 \le m, n \le 1000$
- Strings consist of lowercase English letters.

### Approach & Intuition
Let $E[i][j]$ denote the minimum edit distance between prefixes $A[1 \dots i]$ and $B[1 \dots j]$.
- **Base cases:**
  - $E[i][0] = i$: Converting $A[1 \dots i]$ to empty string requires $i$ deletions.
  - $E[0][j] = j$: Converting empty string to $B[1 \dots j]$ requires $j$ insertions.
- **Inductive Step:**
  - If $A[i] = B[j]$: No new operation needed; $E[i][j] = E[i-1][j-1]$.
  - If $A[i] \ne B[j]$: Choose the minimum among:
    - **Delete** $A[i]$: $E[i-1][j] + 1$
    - **Insert** $B[j]$: $E[i][j-1] + 1$
    - **Replace** $A[i]$ with $B[j]$: $E[i-1][j-1] + 1$

#### Mathematical Recurrence
$$
E[i][j] = \begin{cases}
j & \text{if } i = 0 \\
i & \text{if } j = 0 \\
E[i-1][j-1] & \text{if } A[i] = B[j] \\
1 + \min(E[i-1][j], E[i][j-1], E[i-1][j-1]) & \text{if } A[i] \ne B[j]
\end{cases}
$$

### Stepped Calculation Trace
Let $A = \text{"horse"}$ ($m=5$) and $B = \text{"ros"}$ ($n=3$):

#### Tabulation Matrix: $E[i][j]$

| $A \backslash B$ | $\emptyset$ | r | o | s |
| :---: | :---: | :---: | :---: | :---: |
| $\emptyset$ | 0 | 1 | 2 | 3 |
| **h** | 1 | 1 | 2 | 3 |
| **o** | 2 | 2 | 1 | 2 |
| **r** | 3 | 2 | 2 | 2 |
| **s** | 4 | 3 | 3 | 2 |
| **e** | 5 | 4 | 4 | **3** |

**Optimal Operation Traceback:**
- $(5, 3)$ ['e' $\ne$ 's']: Minimum neighbor is $(4, 3) = 2 \implies$ **Delete 'e'** (Cost +1).
- $(4, 3)$ ['s' = 's']: Diagonal $(3, 2) = 2 \implies$ Match! (Cost +0).
- $(3, 2)$ ['r' $\ne$ 'o']: Minimum neighbor is $(2, 2) = 1 \implies$ **Delete 'r'** (Cost +1).
- $(2, 2)$ ['o' = 'o']: Diagonal $(1, 1) = 1 \implies$ Match! (Cost +0).
- $(1, 1)$ ['h' $\ne$ 'r']: Diagonal $(0, 0) = 0 \implies$ **Replace 'h' with 'r'** (Cost +1).
- Total Operations: **3** (Replace 'h' $\to$ 'r', Delete 'r', Delete 'e').

---

## Problem 2: The Subset Sum Problem

### Problem Description
Given a multiset of non-negative integers $S = \{s_1, s_2, \dots, s_n\}$ and a target integer sum $T$. Determine whether there exists a non-empty subset of $S$ whose elements sum up to exactly $T$.

**Constraints:**
- $1 \le n \le 100$
- $1 \le s_i \le 1000$
- $1 \le T \le 10^4$

### Approach & Intuition: Boolean State Space
Let $DP[i][t]$ be a boolean flag indicating whether a sum of $t$ can be formed using a subset of the first $i$ elements.
For element $s_i$:
$$
DP[i][t] = DP[i-1][t] \lor (t \ge s_i \land DP[i-1][t - s_i])
$$
Base case: $DP[i][0] = \text{true}$ (the empty subset achieves sum 0). All other $DP[0][t] = \text{false}$.

### Stepped Calculation Trace
Let $S = [3, 4, 5, 2]$ and $T = 7$:
- Init: $DP = [T, F, F, F, F, F, F, F]$
- Include $s_1 = 3$: Sums formed: $\{0, 3\}$
- Include $s_2 = 4$: Sums formed: $\{0, 3, 4, 7\}$ $\implies DP[7] = \text{true}$ immediately!
- The subset is $\{3, 4\}$, yielding $3 + 4 = 7$.

---

## Complete C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

// Problem 1: Edit Distance
int minEditDistance(const string& A, const string& B) {
    int m = A.size();
    int n = B.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (A[i - 1] == B[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + min({dp[i - 1][j],     // Deletion
                                    dp[i][j - 1],     // Insertion
                                    dp[i - 1][j - 1]  // Substitution
                                   });
            }
        }
    }
    return dp[m][n];
}

// Problem 2: 1D Space-Optimized Subset Sum
bool canPartitionSubsetSum(const vector<int>& S, int target) {
    vector<bool> dp(target + 1, false);
    dp[0] = true; // Base case: Sum 0 is always achievable

    for (int num : S) {
        // Traverse backwards to use each number at most once
        for (int t = target; t >= num; t--) {
            if (dp[t - num]) {
                dp[t] = true;
            }
        }
    }
    return dp[target];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Test Edit Distance
    string word1 = "horse";
    string word2 = "ros";
    cout << "Min Edit Distance ('horse' -> 'ros'): " 
         << minEditDistance(word1, word2) << "\n"; // Output: 3

    // Test Subset Sum
    vector<int> nums = {3, 34, 4, 12, 5, 2};
    int target = 9;
    cout << "Subset sum for target 9 exists: " 
         << (canPartitionSubsetSum(nums, target) ? "Yes" : "No") << "\n"; // Output: Yes (4 + 5)

    return 0;
}
```


## References & Navigation

- **Previous Topic:** [[[PS] Hierophant Arcana]]
- **Next Topic:** [[[PS] Chariot Arcana]]
- **Related Notes:** [[Dynamic Programming Introduction]]
