---
id: ps_hierophant_arcana
type: problem_set
course: CSALGCM
topic: "Hierophant Arcana"
status: completed
---

# Hierophant Arcana: Longest Common Subsequence & Matrix Chain Multiplication

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSALGCM]] #[[Problem Sets]] #[[HackerRank]] #[[Algorithms]] #[[Dynamic Programming]]

---

## Overview

The Hierophant Arcana focuses on 2D table dynamic programming and interval dynamic programming. This set covers **Longest Common Subsequence (LCS)** (prefix-based string DP) and **Matrix Chain Multiplication (MCM)** (interval/subchain DP).

---

## Problem 1: Longest Common Subsequence (LCS)

### Problem Description
Given two sequences $X = \langle x_1, x_2, \dots, x_m \rangle$ and $Y = \langle y_1, y_2, \dots, y_n \rangle$, determine the length of their longest common subsequence (LCS) and reconstruct one such optimal sequence. A subsequence is derived by deleting zero or more elements without changing the order of remaining elements.

**Constraints:**
- $1 \le m, n \le 1000$
- Characters are alphanumeric.

### Approach & Intuition
Let $L[i][j]$ denote the length of the LCS of prefixes $X[1 \dots i]$ and $Y[1 \dots j]$.
1. If $x_i = y_j$: The character must be part of an optimal extension: $L[i][j] = L[i-1][j-1] + 1$.
2. If $x_i \ne y_j$: The optimal subsequence cannot match both concurrently; it inherits the maximum from dropping either $x_i$ or $y_j$: $L[i][j] = \max(L[i-1][j], L[i][j-1])$.

#### Mathematical Recurrence
$$
L[i][j] = \begin{cases} 
0 & \text{if } i = 0 \text{ or } j = 0 \\
L[i-1][j-1] + 1 & \text{if } x_i = y_j \\
\max(L[i-1][j], L[i][j-1]) & \text{if } x_i \ne y_j
\end{cases}
$$

### Stepped Calculation Trace
Let $X = \text{"ABCBDAB"}$ ($m=7$) and $Y = \text{"BDCABA"}$ ($n=6$):

#### Tabulation Matrix: $L[i][j]$

| $X \backslash Y$ | $\emptyset$ | B | D | C | A | B | A |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| $\emptyset$ | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **A** | 0 | 0 | 0 | 0 | 1 | 1 | 1 |
| **B** | 0 | 1 | 1 | 1 | 1 | 2 | 2 |
| **C** | 0 | 1 | 1 | 2 | 2 | 2 | 2 |
| **B** | 0 | 1 | 1 | 2 | 2 | 3 | 3 |
| **D** | 0 | 1 | 2 | 2 | 2 | 3 | 3 |
| **A** | 0 | 1 | 2 | 2 | 3 | 3 | 4 |
| **B** | 0 | 1 | 2 | 2 | 3 | 4 | **4** |

**Backtracking Traceback for Sequence Reconstruction:**
- From $(7, 6)$ with $X[7]='B', Y[6]='A'$: $L[7][6]=4 == L[7][5]=4$. Move left to $(7, 5)$.
- At $(7, 5)$ with $X[7]='B', Y[5]='B'$: Characters match! Select **'B'**. Move diagonally to $(6, 4)$.
- At $(6, 4)$ with $X[6]='A', Y[4]='A'$: Characters match! Select **'A'**. Move diagonally to $(5, 3)$.
- At $(5, 3)$ with $X[5]='D', Y[3]='C'$: $L[5][3]=2 == L[4][3]=2$. Move up to $(4, 3)$.
- At $(4, 3)$ with $X[4]='B', Y[3]='C'$: Move up to $(3, 3)$.
- At $(3, 3)$ with $X[3]='C', Y[3]='C'$: Characters match! Select **'C'**. Move diagonally to $(2, 2)$.
- At $(2, 2)$ with $X[2]='B', Y[2]='D'$: Move left to $(2, 1)$.
- At $(2, 1)$ with $X[2]='B', Y[1]='B'$: Characters match! Select **'B'**. Move diagonally to $(1, 0)$.
- Reconstructed LCS (reversed): **"BCAB"** (or **"BDAB"**), length = **4**.

### Complexity Analysis
- **Time Complexity:** $O(m \cdot n)$ to fill table, $O(m + n)$ for reconstruction traceback.
- **Space Complexity:** $O(m \cdot n)$ for full table (can be reduced to $O(\min(m, n))$ if only LCS length is required).

---

## Problem 2: Matrix Chain Multiplication (MCM)

### Problem Description
Given a sequence of $n$ matrices $\langle A_1, A_2, \dots, A_n \rangle$, where matrix $A_i$ has dimension $p_{i-1} \times p_i$. Find the optimal parenthesization that minimizes the total number of scalar multiplications needed to compute the product $A_1 A_2 \dots A_n$.

**Constraints:**
- $2 \le n \le 100$
- $1 \le p_i \le 500$

### Approach & Intuition: Interval DP
Multiplying two matrices of size $p \times q$ and $q \times r$ takes $p \cdot q \cdot r$ scalar multiplications.
Let $m[i][j]$ be the minimum scalar multiplications needed to compute $A_i \dots A_j$ ($1 \le i \le j \le n$).
For $i = j$: $m[i][i] = 0$ (single matrix requires 0 multiplications).
For $i < j$: We split the product into two subchains $(A_i \dots A_k)(A_{k+1} \dots A_j)$ at some index $k$ ($i \le k < j$):
$$
m[i][j] = \min_{i \le k < j} \left( m[i][k] + m[k+1][j] + p_{i-1} p_k p_j \right)
$$

### Stepped Calculation Trace
Let $p = [10, 30, 5, 60]$, corresponding to 3 matrices:
- $A_1: 10 \times 30$
- $A_2: 30 \times 5$
- $A_3: 5 \times 60$

1. **Chain length $L = 1$:**
   - $m[1][1] = 0, \quad m[2][2] = 0, \quad m[3][3] = 0$
2. **Chain length $L = 2$:**
   - $m[1][2] = m[1][1] + m[2][2] + p_0 p_1 p_2 = 0 + 0 + (10 \times 30 \times 5) = 1500$, split $s[1][2] = 1$.
   - $m[2][3] = m[2][2] + m[3][3] + p_1 p_2 p_3 = 0 + 0 + (30 \times 5 \times 60) = 9000$, split $s[2][3] = 2$.
3. **Chain length $L = 3$ ($m[1][3]$):**
   - Split $k = 1$: $(A_1)(A_2 A_3) \implies m[1][1] + m[2][3] + p_0 p_1 p_3 = 0 + 9000 + (10 \times 30 \times 60) = 9000 + 18000 = 27000$.
   - Split $k = 2$: $(A_1 A_2)(A_3) \implies m[1][2] + m[3][3] + p_0 p_2 p_3 = 1500 + 0 + (10 \times 5 \times 60) = 1500 + 3000 = \mathbf{4500}$.
   - Optimal: $m[1][3] = \mathbf{4500}$ with optimal split $s[1][3] = 2$, yielding $((A_1 A_2) A_3)$.

---

## Complete C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

// Problem 1: Longest Common Subsequence with Full Backtracking
pair<int, string> solveLCS(const string& X, const string& Y) {
    int m = X.length();
    int n = Y.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (X[i - 1] == Y[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Reconstruction
    string lcs = "";
    int i = m, j = n;
    while (i > 0 && j > 0) {
        if (X[i - 1] == Y[j - 1]) {
            lcs += X[i - 1];
            i--; j--;
        } else if (dp[i - 1][j] >= dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    reverse(lcs.begin(), lcs.end());
    return {dp[m][n], lcs};
}

// Problem 2: Matrix Chain Multiplication
void printParenthesis(int i, int j, const vector<vector<int>>& s) {
    if (i == j) {
        cout << "A" << i;
        return;
    }
    cout << "(";
    printParenthesis(i, s[i][j], s);
    printParenthesis(s[i][j] + 1, j, s);
    cout << ")";
}

int solveMCM(const vector<int>& p) {
    int n = p.size() - 1; // Number of matrices
    vector<vector<int>> m(n + 1, vector<int>(n + 1, 0));
    vector<vector<int>> s(n + 1, vector<int>(n + 1, 0));

    // L is chain length
    for (int L = 2; L <= n; L++) {
        for (int i = 1; i <= n - L + 1; i++) {
            int j = i + L - 1;
            m[i][j] = 1e9;
            for (int k = i; k < j; k++) {
                int cost = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];
                if (cost < m[i][j]) {
                    m[i][j] = cost;
                    s[i][j] = k;
                }
            }
        }
    }

    cout << "Optimal Parenthesization: ";
    printParenthesis(1, n, s);
    cout << "\n";

    return m[1][n];
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Test LCS
    string s1 = "ABCBDAB";
    string s2 = "BDCABA";
    auto [len, lcsStr] = solveLCS(s1, s2);
    cout << "LCS Length: " << len << ", String: " << lcsStr << "\n";

    // Test MCM
    vector<int> p = {10, 30, 5, 60};
    int minMults = solveMCM(p);
    cout << "Min Scalar Multiplications: " << minMults << "\n"; // Output: 4500

    return 0;
}
```

---

## References & Navigation

- **Previous Topic:** [[[PS] Emperor Arcana]]
- **Next Topic:** [[[PS] Lovers Arcana]]
- **Related Notes:** [[Dynamic Programming Introduction]]
