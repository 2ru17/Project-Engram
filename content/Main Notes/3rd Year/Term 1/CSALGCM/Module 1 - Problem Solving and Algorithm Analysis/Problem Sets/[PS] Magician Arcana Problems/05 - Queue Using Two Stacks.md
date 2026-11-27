---
id: csalgcm_ps_magician_05_queue_two_stacks
type: problem_set
course: CSALGCM
topic: "Queue Using Two Stacks"
status: solved
difficulty: Medium
hackerrank_domain: Queues
---
# Queue Using Two Stacks

> [!info] Document Metadata
> **Course:** `=this.course` | **Topic:** `=this.topic` | **Status:** `=this.status` | **Difficulty:** `=this.difficulty`

**Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Magician Arcana]] #[[Queues]] #[[Stacks]]

---

## Problem Description

Implement a standard Queue (First-In-First-Out) data structure using only two Stacks (Last-In-First-Out). Process $q$ queries, where each query is one of the following $3$ types:
1. `1 x`: Enqueue element $x$ into the end of the queue.
2. `2`: Dequeue the element at the front of the queue.
3. `3`: Print the element at the front of the queue.

**Input Format:**
- The first line contains a single integer, $q$, denoting the number of queries.
- Each line $i$ of the $q$ subsequent lines contains a single query in the form described above. All three queries start with an integer denoting the query $type$, and only query $1$ is followed by an additional space-separated value, $x$, denoting the value to be enqueued.

**Output Format:**
- For each query of type $3$, print the value of the element at the front of the queue on a new line.

**Constraints:**
- $1 \leq q \leq 10^5$
- $1 \leq type \leq 3$
- $1 \leq |x| \leq 10^9$
- It is guaranteed that a valid answer always exists for each query of type $3$.

**Sample Input 0**

```text
10
1 42
2
1 14
3
1 28
3
1 60
1 78
2
2
```

**Sample Output 0**

```text
14
14
```

*Explanation:* After enqueuing `42` and dequeuing it, `14` is enqueued and printed (`14`), then `28` is enqueued and the front is printed again (`14`).

---

## Approach & Intuition
A standard Queue operates on a **First-In-First-Out (FIFO)** principle, meaning the first element added is the first one removed. A Stack, however, operates on a **Last-In-First-Out (LIFO)** principle. The challenge is to simulate FIFO behavior using only LIFO structures.

The key intuition is that **reversing the order of elements twice restores their original order.** If we push elements into one stack and later pop them out into a second stack, the newest elements end up at the bottom of the second stack, and the oldest elements end up at the top, perfectly matching the queue's front!

Here is the exact step-by-step mechanism of the C++ solution:
1. **Stack Setup:** We initialize two stacks: an `inbox` stack (to handle all incoming elements) and an `outbox` stack (to handle all outgoing elements).
2. **Enqueue (Type 1 Query):** When a new element `x` arrives, we simply push it directly onto the `inbox` stack. This is an $O(1)$ operation.
3. **Dequeue/Print (Type 2 and 3 Queries):** To remove or view the front of the queue, we need the oldest element. 
   - We check if the `outbox` is empty. If it is, we pop *every single element* from the `inbox` and push them onto the `outbox`. This batch transfer flips their order, making the top of the `outbox` the oldest element in the queue.
   - If the `outbox` is *not* empty, we do nothing and just use the elements already there. (We must deplete the `outbox` completely before transferring more elements from the `inbox`, otherwise the relative ordering gets jumbled).
   - For a Dequeue (Type 2), we call `outbox.pop()`.
   - For a Print (Type 3), we output `outbox.top()`.

---

## Complexity Analysis
| | Complexity |
|--|--|
| **Time** | **Enqueue:** $O(1)$. **Dequeue/Print:** Amortized $O(1)$. While transferring elements from `inbox` to `outbox` takes $O(N)$ time when the `outbox` is empty, each element is pushed to `inbox` once, popped from `inbox` once, pushed to `outbox` once, and popped from `outbox` once. Over a sequence of operations, the average cost per element is constant. |
| **Space** | **$O(N)$** — In the worst-case scenario where we enqueue $N$ elements without dequeuing any, we must store all $N$ elements across the two stacks. |

---

## Original Stub (HackerRank Template)

```cpp
#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
#include <stack>
using namespace std;


int main() {
    /* Enter your code here. Read input from STDIN. Print output to STDOUT */   
    return 0;
}
```

---

## Full Solution
```cpp
#include <cmath>
#include <cstdio>
#include <vector>
#include <iostream>
#include <algorithm>
#include <stack>
using namespace std;


int main() {
    /*
     * Queue using Two Stacks
     *
     * Operations:
     *   1 x  -> enqueue x
     *   2    -> dequeue the front element
     *   3    -> print the front element without dequeuing
     *
     * Strategy: use two stacks.
     *   - inbox:  receives all new enqueues
     *   - outbox: serves peeks and pops
     * When outbox is empty and a peek/pop is needed,
     * pour everything from inbox into outbox (reverses order -> FIFO).
     */

    stack<int> inbox, outbox;

    int q;
    cin >> q;

    while (q--) {
        int op;
        cin >> op;

        if (op == 1) {
            // Enqueue
            int x;
            cin >> x;
            inbox.push(x);

        } else {
            // Ensure outbox has the front element
            if (outbox.empty()) {
                while (!inbox.empty()) {
                    outbox.push(inbox.top());
                    inbox.pop();
                }
            }

            if (op == 2) {
                // Dequeue
                outbox.pop();
            } else {
                // op == 3: Print front
                cout << outbox.top() << "\n";
            }
        }
    }

    return 0;
}
```


## References & Navigation
- **Related Notes:** [[Problems, Problem Types, and Algorithms]]
- **Previous Problem:** [[04 - Is This a Binary Search Tree]]
- **Next Problem:** [[06 - Sherlock and Array]]
- **Parent Set:** [[[PS] Magician Arcana|Magician Arcana Index]]
