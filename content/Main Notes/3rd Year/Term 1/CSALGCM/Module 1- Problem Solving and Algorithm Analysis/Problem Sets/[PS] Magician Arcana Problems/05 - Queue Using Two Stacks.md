---
id: csalgcm_ps_magician_05_queue_two_stacks
type: problem_set
course: CSALGCM
topic: "Queue Using Two Stacks"
status: solved
difficulty: Medium
hackerrank_domain: Queues
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`
> - **Difficulty:** `=this.difficulty`

**Tags:** #[[Computer Science]] #[[CSALGCM]] #[[Algorithms and Complexity]] #[[HackerRank]] #[[Magician Arcana]] #[[Queues]] #[[Stacks]]

---

---

# Queue Using Two Stacks

## Problem Description
Implement a standard Queue (First-In-First-Out) data structure using only two Stacks (Last-In-First-Out). You must support three operations across $Q$ queries:
1. Enqueue element `x` to the end of the queue.
2. Dequeue the element at the front of the queue.
3. Print the element at the front of the queue.

**Input Format:**
 Download problem statement
The first line contains a single integer, , denoting the number of queries.                                          Download all test cases
Each line of the       subsequent lines contains a single query in the form described in the problem                 Suggest Edits
statement above. All three queries start with an integer denoting the query                 , but only query   is
followed by an additional space-separated value, , denoting the value to be enqueued.

**Output Format:**
For each query of type , print the value of the element at the front of the queue on a new line.

**Constraints:**
• $• $• $• $It is guaranteed that a valid answer always exists for each query of type .$

**Sample:**
| Input | Output |
|-------|--------|
| `STDIN         Function<br>     -----         --------<br>     10            q = 10 (number of queries)<br>     1 42          1st query, enqueue 42<br>     2             dequeue front element<br>     1 14          enqueue 42<br>     3             print the front element<br>     1 28          enqueue 28<br>     3             print the front element<br>     1 60          enqueue 60<br>     1 78          enqueue 78<br>     2             dequeue front element<br>     2             dequeue front element` | `14<br>     14` |

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

---

## Complexity Analysis
| | Complexity |
|--|--|
| **Time** | **Enqueue:** $O(1)$. **Dequeue/Print:** Amortized $O(1)$. While transferring elements from `inbox` to `outbox` takes $O(N)$ time when the `outbox` is empty, each element is pushed to `inbox` once, popped from `inbox` once, pushed to `outbox` once, and popped from `outbox` once. Over a sequence of operations, the average cost per element is constant. |
| **Space** | **$O(N)$** — In the worst-case scenario where we enqueue $N$ elements without dequeuing any, we must store all $N$ elements across the two stacks. |

---

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
