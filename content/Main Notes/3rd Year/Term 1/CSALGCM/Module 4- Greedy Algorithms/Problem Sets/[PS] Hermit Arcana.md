---
id: ps_hermit_arcana
type: problem_set
course: CSALGCM
topic: "Hermit Arcana"
status: completed
---

# Hermit Arcana: Huffman Coding & Job Sequencing

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSALGCM]] #[[Problem Sets]] #[[HackerRank]] #[[Algorithms]] #[[Greedy Algorithms]]

---

## Overview

The Hermit Arcana focuses on tree optimization and scheduling with deadlines: **Huffman Coding** (optimal prefix codes via min-heaps) and **Job Sequencing with Deadlines** (slot scheduling via greedy profit ordering).

---

## Problem 1: Optimal Prefix Codes (Huffman Coding)

### Problem Description
Given an alphabet of $n$ unique characters $C = \{c_1, c_2, \dots, c_n\}$ with corresponding frequencies $F = \{f(c_1), f(c_2), \dots, f(c_n)\}$, construct a binary prefix code tree that minimizes the expected weighted codeword length:
$$
B(T) = \sum_{c \in C} f(c) \cdot d_T(c)
$$
where $d_T(c)$ is the depth (codeword length) of character $c$ in the tree. In a prefix code, no codeword is a prefix of any other codeword, allowing unambiguous stream decoding without delimiters.

**Constraints:**
- $2 \le n \le 10^5$
- $1 \le f(c_i) \le 10^9$

### Greedy Strategy & Proof Heuristic
1. Maintain a min-priority queue (min-heap) of tree nodes keyed by total frequency.
2. At each step, extract the two nodes $x$ and $y$ with the lowest frequencies.
3. Allocate a new parent node $z$ with frequency $f(z) = f(x) + f(y)$, making $x$ its left child (bit 0) and $y$ its right child (bit 1).
4. Re-insert $z$ into the min-heap. Repeat $n-1$ times until a single root node remains.
*Optimality:* Merging the two lowest-frequency symbols first places them at maximum tree depth, minimizing their contribution to the total bit count.

### Stepped Trace
Consider character frequencies:
`a: 45, b: 13, c: 12, d: 16, e: 9, f: 5` (Total characters = 100).

1. Initial Min-Heap: `[f:5, e:9, c:12, b:13, d:16, a:45]`
2. Merge `f:5` and `e:9` $\implies$ Node `z1:14`. Heap: `[c:12, b:13, z1:14, d:16, a:45]`
3. Merge `c:12` and `b:13` $\implies$ Node `z2:25`. Heap: `[z1:14, d:16, z2:25, a:45]`
4. Merge `z1:14` and `d:16` $\implies$ Node `z3:30`. Heap: `[z2:25, z3:30, a:45]`
5. Merge `z2:25` and `z3:30` $\implies$ Node `z4:55`. Heap: `[a:45, z4:55]`
6. Merge `a:45` and `z4:55` $\implies$ Root `z5:100`.

#### Resulting Codewords & Bits

| Char | Frequency | Codeword | Bit Length | Total Bits ($f \times \text{len}$) |
| :---: | :---: | :---: | :---: | :---: |
| **a** | 45 | `0` | 1 | 45 |
| **c** | 12 | `100` | 3 | 36 |
| **b** | 13 | `101` | 3 | 39 |
| **f** | 5 | `1100` | 4 | 20 |
| **e** | 9 | `1101` | 4 | 36 |
| **d** | 16 | `111` | 3 | 48 |

Total Encoded Bits: **224 bits** (compared to $100 \times 3 = 300\text{ bits}$ for fixed 3-bit encoding, saving **25.3%**).

---

## Problem 2: Job Sequencing with Deadlines

### Problem Description
Given $n$ jobs, where each job $i$ has an integer deadline $d_i \ge 1$ and a profit $p_i > 0$. Each job requires exactly 1 unit of time to execute on a single processor, and a job earns its profit only if it completes on or before its deadline ($t \le d_i$). Find the schedule that maximizes total profit.

**Constraints:**
- $1 \le n \le 10^5$
- $1 \le d_i \le n$
- $1 \le p_i \le 10^5$

### Approach & Intuition
1. Sort all jobs in descending order of profit: $p_1 \ge p_2 \ge \dots \ge p_n$.
2. For each job $i$, greedily assign it to the **latest possible vacant time slot** $t \in [1, d_i]$.
3. Delaying the execution of high-profit jobs as close to their deadlines as possible preserves earlier time slots for jobs with tighter deadlines.

### Stepped Calculation Trace
Consider 5 jobs:
- $J_1: (d=2, p=100)$
- $J_2: (d=1, p=19)$
- $J_3: (d=2, p=27)$
- $J_4: (d=1, p=25)$
- $J_5: (d=3, p=15)$

Max deadline = 3. Available time slots: `[Slot 1, Slot 2, Slot 3]`.
1. **$J_1$ ($p=100, d=2$):** Slot 2 is vacant. Place $J_1$ at **Slot 2**. Timeline: `[_, J1, _]`.
2. **$J_3$ ($p=27, d=2$):** Slot 2 is occupied; check slot 1. Slot 1 is vacant. Place $J_3$ at **Slot 1**. Timeline: `[J3, J1, _]`.
3. **$J_4$ ($p=25, d=1$):** Slot 1 is occupied; cannot schedule. Reject.
4. **$J_2$ ($p=19, d=1$):** Slot 1 is occupied; cannot schedule. Reject.
5. **$J_5$ ($p=15, d=3$):** Slot 3 is vacant. Place $J_5$ at **Slot 3**. Timeline: `[J3, J1, J5]`.

Total Profit: $27 + 100 + 15 = \mathbf{142}$.

---

## Complete C++ Implementation

```cpp
#include <iostream>
#include <vector>
#include <queue>
#include <string>
#include <algorithm>

using namespace std;

// --- Problem 1: Huffman Coding ---
struct HuffmanNode {
    char ch;
    int freq;
    HuffmanNode *left, *right;
    HuffmanNode(char c, int f) : ch(c), freq(f), left(nullptr), right(nullptr) {}
};

struct CompareNode {
    bool operator()(HuffmanNode* a, HuffmanNode* b) {
        return a->freq > b->freq;
    }
};

void buildHuffmanCodes(HuffmanNode* root, string code, vector<pair<char, string>>& codes) {
    if (!root) return;
    if (!root->left && !root->right) {
        codes.push_back({root->ch, code});
        return;
    }
    buildHuffmanCodes(root->left, code + "0", codes);
    buildHuffmanCodes(root->right, code + "1", codes);
}

vector<pair<char, string>> getHuffmanTree(const vector<pair<char, int>>& freqs) {
    priority_queue<HuffmanNode*, vector<HuffmanNode*>, CompareNode> minHeap;
    for (auto p : freqs) {
        minHeap.push(new HuffmanNode(p.first, p.second));
    }

    while (minHeap.size() > 1) {
        HuffmanNode* left = minHeap.top(); minHeap.pop();
        HuffmanNode* right = minHeap.top(); minHeap.pop();

        HuffmanNode* parent = new HuffmanNode('$', left->freq + right->freq);
        parent->left = left;
        parent->right = right;
        minHeap.push(parent);
    }

    vector<pair<char, string>> codes;
    buildHuffmanCodes(minHeap.top(), "", codes);
    return codes;
}

// --- Problem 2: Job Sequencing with Deadlines ---
struct Job {
    int id;
    int deadline;
    int profit;
};

pair<int, int> solveJobSequencing(vector<Job>& jobs) {
    // Sort descending by profit
    sort(jobs.begin(), jobs.end(), [](const Job& a, const Job& b) {
        return a.profit > b.profit;
    });

    int maxDeadline = 0;
    for (const auto& j : jobs) maxDeadline = max(maxDeadline, j.deadline);

    vector<int> slot(maxDeadline + 1, -1);
    int totalProfit = 0, countJobs = 0;

    for (const auto& job : jobs) {
        // Search backwards from job's deadline
        for (int t = job.deadline; t >= 1; t--) {
            if (slot[t] == -1) {
                slot[t] = job.id;
                totalProfit += job.profit;
                countJobs++;
                break;
            }
        }
    }
    return {countJobs, totalProfit};
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    // Test Huffman Coding
    vector<pair<char, int>> freqs = {{'a', 45}, {'b', 13}, {'c', 12}, {'d', 16}, {'e', 9}, {'f', 5}};
    auto codes = getHuffmanTree(freqs);
    cout << "=== Huffman Generated Codewords ===\n";
    for (auto c : codes) {
        cout << c.first << ": " << c.second << "\n";
    }

    // Test Job Sequencing
    vector<Job> jobs = {{1, 2, 100}, {2, 1, 19}, {3, 2, 27}, {4, 1, 25}, {5, 3, 15}};
    auto [scheduled, profit] = solveJobSequencing(jobs);
    cout << "\nJobs Scheduled: " << scheduled << ", Total Profit: " << profit << "\n"; // Output: 3, 142

    return 0;
}
```

---

## References & Navigation

- **Previous Topic:** [[[PS] Chariot Arcana]]
- **Next Topic:** [[[PS] Justice Arcana]]
- **Related Notes:** [[Greedy Algorithms Introduction]]
