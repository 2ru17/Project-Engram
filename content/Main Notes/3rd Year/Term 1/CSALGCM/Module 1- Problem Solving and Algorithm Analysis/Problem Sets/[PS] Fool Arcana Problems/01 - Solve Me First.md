---
id: csalgcm_ps_fool_01_solve_me_first
type: problem_set
course: CSALGCM
topic: "Solve Me First"
status: solved
difficulty: Easy
hackerrank_domain: Warmup
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`
> - **Difficulty:** `=this.difficulty`

**🏷️ Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Fool Arcana]] #[[Warmup]]

---

# Solve Me First

> [!tip] Purpose
> This is a warmup problem designed to confirm that your development environment is configured correctly and that you can read input, call a function, and produce output on HackerRank.

## Problem Description

Complete the `solveMeFirst` function so that it computes the sum of two integers.

**Input Format:**
- First line: integer `a`
- Second line: integer `b`

**Output Format:**
- Print the integer sum `a + b`

**Constraints:** $1 \leq a, b \leq 1000$

**Sample:**
| Input | Output |
|-------|--------|
| `2`<br>`3` | `5` |

---

## Approach & Intuition

This problem is entirely trivial by design — it's a "Hello World" for HackerRank. The stub already provides the `main()` function that reads the two integers and calls `solveMeFirst()`. You only need to fill in the body.

The key insight is to get comfortable with:
1. How HackerRank templates work (the boilerplate `main` does all the I/O for you)
2. How to return a value from a function

**Strategy:** Return `a + b`. That's it.

---

## Complexity Analysis

| | Complexity |
|--|--|
| **Time** | $O(1)$ — two reads, one addition, one write. No loops. |
| **Space** | $O(1)$ — only two integer variables stored. |

---

## Original Stub (HackerRank Template)

```cpp
#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

int solveMeFirst(int a, int b) {
 // Hint: Type return a+b; below:
  
}

int main() {
  int num1, num2;
  int sum;
  cin>>num1>>num2;
  sum = solveMeFirst(num1,num2);
  cout<<sum;
  return 0;
}
```

## Full Solution

```cpp
#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

int solveMeFirst(int a, int b) {
  // Hint: Type return a+b; below:
  return a + b;
}

int main() {
  int num1, num2;
  int sum;
  cin>>num1>>num2;
  sum = solveMeFirst(num1,num2);
  cout<<sum;
  return 0;
}
```


## References & Navigation

- **Related Notes:** [[Problems, Problem Types, and Algorithms]], [[Computational Thinking in Problem Solving]]
- **Next Problem:** [[02 - Simple Array Sum]]
- **Parent Set:** [[[PS] Fool Arcana|Fool Arcana Index]]
