---
id: Mock-Midterm-Exam-02
type: note
course: CCDSALG
topic: Mock-Midterm-Exam-02
status: completed
---

# Mock-Midterm-Exam-02

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCDSALG]] #[[Mock-Midterm-Exam-02]] #[[Conceptual]]

---

## Overview

This second mock midterm exam targets advanced problem-solving in CCDSALG. It tests distinction between asymptotic notations ($O, \Omega, \Theta$) using limit tests, non-trivial loop frequency counting, recurrence relations, linked list pointer mutations, stack and queue invariants, expression parsing across infix, prefix, and postfix notations, and sorting algorithm mechanics and stability.

---

## Multiple Choice Practice Questions

1. Which asymptotic notation denotes both an asymptotic upper bound AND an asymptotic lower bound, providing an asymptotically tight bound on an algorithm's growth rate?
    - **A)** Big-Oh ($O$)
    - **B)** Big-Omega ($\Omega$)
    - **C)** Big-Theta ($\Theta$)
    - **D)** Little-oh ($o$)

2. Evaluate the limit ratio $L = \lim_{n \to \infty} \frac{n^2 + 5n \log_2 n}{2n^2 - 7}$. What does the resulting limit establish regarding the relationship between $f(n) = n^2 + 5n \log_2 n$ and $g(n) = 2n^2 - 7$?
    - **A)** $L = 0$, implying $f(n) \in o(g(n))$
    - **B)** $L = \frac{1}{2}$, implying $f(n) \in \Theta(g(n))$
    - **C)** $L = \infty$, implying $f(n) \in \omega(g(n))$
    - **D)** $L = 1$, implying $f(n) = g(n)$

3. Consider the following code fragment:
   ```c
   int k = 0;
   for (int i = n; i > 0; i /= 2) {
       for (int j = 0; j < i; j++) {
           k++;
       }
   }
   ```
   What is the tight asymptotic bound $\Theta(f(n))$ of the total iterations executed?
    - **A)** $\Theta(n^2)$
    - **B)** $\Theta(n \log_2 n)$
    - **C)** $\Theta(n)$
    - **D)** $\Theta(\log_2 n)$

4. Solve the recurrence relation $T(n) = 2T(n/2) + 5$ with base case $T(1) = 3$. What is the exact closed-form solution for $n = 2^k$?
    - **A)** $T(n) = 8n - 5$
    - **B)** $T(n) = 3n + 5$
    - **C)** $T(n) = 5n - 2$
    - **D)** $T(n) = 3n \log_2 n$

5. What is the solution to the recurrence relation $T(n) = T(n/2) + 1$ with $T(1) = 1$, which characterizes standard Binary Search?
    - **A)** $\Theta(n)$
    - **B)** $\Theta(\log_2 n)$
    - **C)** $\Theta(n \log_2 n)$
    - **D)** $\Theta(1)$

6. In a singly linked list containing $n$ elements with a `head` pointer but NO `tail` pointer, what are the time complexities for inserting a new node at the beginning (head) and at the end (tail), respectively?
    - **A)** Insert at head: $O(1)$; Insert at tail: $O(n)$
    - **B)** Insert at head: $O(n)$; Insert at tail: $O(1)$
    - **C)** Insert at head: $O(1)$; Insert at tail: $O(1)$
    - **D)** Insert at head: $O(n)$; Insert at tail: $O(n)$

7. In a doubly linked list, which sequence of pointer assignments correctly deletes an interior node pointed to by `curr` without memory leaks?
    - **A)** `curr->prev->next = curr->next;` followed by `curr->next->prev = curr->prev;`
    - **B)** `curr->next = curr->prev;` followed by `curr->prev = curr->next;`
    - **C)** `curr->next->prev = curr;` followed by `curr->prev->next = curr;`
    - **D)** `curr->prev = NULL;` followed by `curr->next = NULL;`

8. During the execution of Dijkstra's Shunting-Yard algorithm converting infix expression $A + B \times (C - D) / E$ to postfix, what is the state of the operator stack immediately after scanning the closing parenthesis `)`?
    - **A)** `[+, *]`
    - **B)** `[+, *, -]`
    - **C)** `[+, *, (]`
    - **D)** `[+]`

9. Convert the infix expression with parentheses $(A + B) \times (C - D) / (E + F)$ into postfix notation:
    - **A)** $A B + C D - \times E F + /$
    - **B)** $A B + C D \times - E F / +$
    - **C)** $+ A B \times - C D / + E F$
    - **D)** $A B C D + - \times E F + /$

10. What is the value of the prefix expression $- \quad + \quad 7 \quad \times \quad 3 \quad 2 \quad 5$? (Evaluate from right to left using an operand stack).
    - **A)** 8
    - **B)** 15
    - **C)** 10
    - **D)** 6

11. An array of size $N = 5$ implements a circular queue using index pointers `front = 2` and `rear = 1`. If the queue is defined to be full when $(\text{rear} + 1) \pmod N == \text{front}$, how many elements are currently stored in this queue?
    - **A)** 0 elements (empty)
    - **B)** 4 elements (full)
    - **C)** 3 elements
    - **D)** 5 elements

12. A double-ended queue (Deque) supports push and pop at both ends: `insertFront`, `deleteFront`, `insertRear`, and `deleteRear`. If an algorithm uses only `insertRear` and `deleteFront`, what classical ADT behavior is reproduced?
    - **A)** LIFO Stack
    - **B)** FIFO Queue
    - **C)** Priority Queue
    - **D)** Binary Search Tree

13. Given the array $A = [5, 1, 4, 2, 8]$, what is the state of the array after the first complete outer pass of standard Bubble Sort (ascending order)?
    - **A)** $[1, 4, 2, 5, 8]$
    - **B)** $[1, 5, 2, 4, 8]$
    - **C)** $[1, 2, 4, 5, 8]$
    - **D)** $[5, 1, 2, 4, 8]$

14. Suppose a programmer modifies the standard Selection Sort algorithm by changing the inner comparison condition from `if (A[j] < A[min_idx])` to `if (A[j] > A[min_idx])`. What is the result of running this modified algorithm on an arbitrary array?
    - **A)** The array will be sorted in descending order.
    - **B)** The algorithm will enter an infinite loop.
    - **C)** The array remains completely unchanged.
    - **D)** The algorithm crashes due to index out of bounds.

15. If Insertion Sort is executed on an input array of size $n$ that is initially sorted in strictly reverse (descending) order, what is the exact number of element shifts required to sort it into ascending order?
    - **A)** $n - 1$
    - **B)** $\frac{n(n - 1)}{2}$
    - **C)** $n \log_2 n$
    - **D)** $2n$

16. In the recursion tree for Merge Sort on an array of size $n$, what is the total number of tree levels (height) and the total computational work performed at each level?
    - **A)** Height: $\log_2 n + 1$; Work per level: $O(n)$
    - **B)** Height: $n$; Work per level: $O(1)$
    - **C)** Height: $\log_2 n$; Work per level: $O(\log n)$
    - **D)** Height: $n^2$; Work per level: $O(n)$

17. Why is standard in-place Selection Sort classified as an unstable sorting algorithm?
    - **A)** It performs comparisons between non-adjacent elements that can jump an equal key past another equal key.
    - **B)** Its running time varies wildly between best and worst cases.
    - **C)** It requires recursive function calls that can overflow the runtime stack.
    - **D)** It cannot sort floating-point numbers accurately.

18. What is the total auxiliary (extra) memory required by the standard top-down Merge Sort algorithm on an array of $n$ elements?
    - **A)** $O(1)$
    - **B)** $O(\log n)$ for recursive stack frames plus $O(n)$ for the auxiliary merge buffer, totaling $O(n)$
    - **C)** $O(n^2)$
    - **D)** $O(n \log n)$

19. In a successful Binary Search on a sorted array of $n$ elements, what is the maximum number of comparisons performed in the worst case?
    - **A)** $\lfloor \log_2 n \rfloor + 1$
    - **B)** $n / 2$
    - **C)** $n$
    - **D)** $\log_{10} n$

20. What is the worst-case space complexity of recursive Depth-First Traversal on a degenerate (skewed) binary tree of $n$ nodes?
    - **A)** $O(1)$
    - **B)** $O(\log n)$
    - **C)** $O(n)$ due to call stack frames
    - **D)** $O(n^2)$

---

### Answer Key & Explanations

1. **C**. Big-Theta ($\Theta$) bounds a function within constant factors both above and below: $c_1 g(n) \le f(n) \le c_2 g(n)$ for all $n \ge n_0$.
2. **B**. Dividing leading coefficients:
   $$\lim_{n \to \infty} \frac{n^2 + 5n \log_2 n}{2n^2 - 7} = \lim_{n \to \infty} \frac{1 + \frac{5 \log_2 n}{n}}{2 - \frac{7}{n^2}} = \frac{1 + 0}{2 - 0} = \frac{1}{2}$$
   Because the limit is a positive finite constant ($0 < L < \infty$), both functions share the same growth rate: $f(n) \in \Theta(g(n))$.
3. **C**. The outer loop variable takes values $n, n/2, n/4, \dots, 1$. The inner loop runs $i$ times for each outer value. Total work is the geometric series:
   $$\sum_{k=0}^{\lfloor \log_2 n \rfloor} \frac{n}{2^k} = n \left(1 + \frac{1}{2} + \frac{1}{4} + \dots \right) < 2n = \Theta(n)$$
4. **A**. Unfolding the recurrence:
   $$T(n) = 2T(n/2) + 5$$
   $$T(n) = 2(2T(n/4) + 5) + 5 = 4T(n/4) + 2(5) + 5$$
   $$T(n) = 2^k T(n/2^k) + 5 \sum_{j=0}^{k-1} 2^j = n T(1) + 5(2^k - 1) = 3n + 5(n - 1) = 8n - 5$$
5. **B**. Binary search cuts the problem size in half each step with $O(1)$ comparison work. By Master Theorem ($a = 1, b = 2, f(n) = 1$), $n^{\log_2 1} = n^0 = 1$. Since $f(n) = \Theta(n^0)$, Case 2 applies: $T(n) = \Theta(\log_2 n)$.
6. **A**. Inserting at head requires allocating the node, setting `node->next = head`, and updating `head = node`, which runs in $O(1)$. Without a tail pointer, inserting at the tail requires traversing all $n$ nodes to reach the last node before appending, requiring $O(n)$ time.
7. **A**. To unlink `curr`, the predecessor's `next` pointer must bypass `curr` to point to `curr->next`, and the successor's `prev` pointer must bypass `curr` to point to `curr->prev`:
   `curr->prev->next = curr->next;`
   `curr->next->prev = curr->prev;`
8. **A**. When scanning $A + B \times (C - D) / E$:
   - `+` pushed to stack: `[+]`
   - `*` pushed to stack: `[+, *]`
   - `(` pushed to stack: `[+, *, (]`
   - `-` pushed to stack: `[+, *, (, -]`
   - Upon encountering `)`, operators inside parentheses are popped until `(` is discarded. The `-` is popped. The remaining stack is `[+, *]`.
9. **A**. 
   - $(A + B) \to A B +$
   - $(C - D) \to C D -$
   - Multiplied together: $A B + C D - \times$
   - $(E + F) \to E F +$
   - Divided: $A B + C D - \times E F + /$
10. **A**. Evaluating prefix expression $- \quad + \quad 7 \quad \times \quad 3 \quad 2 \quad 5$ from right to left:
   - Read 5, 2, 3 $\to$ Stack: $[5, 2, 3]$
   - Operator `*`: Pop 3 and 2, compute $3 \times 2 = 6$, push 6 $\to$ Stack: $[5, 6]$
   - Read 7 $\to$ Stack: $[5, 6, 7]$
   - Operator `+`: Pop 7 and 6, compute $7 + 6 = 13$, push 13 $\to$ Stack: $[5, 13]$
   - Operator `-`: Pop 13 and 5, compute $13 - 5 = 8$, push 8 $\to$ Stack: $[8]$
   Result is 8.
11. **B**. In this circular queue design, one slot is kept unoccupied to differentiate between full and empty states. With array size $N = 5$, a full queue holds $N - 1 = 4$ elements. With `front = 2` and `rear = 1`, $(\text{rear} + 1) \pmod 5 = (1 + 1) \pmod 5 = 2 == \text{front}$, confirming the queue is completely full with 4 elements.
12. **B**. Enqueuing at the rear (`insertRear`) and dequeuing from the front (`deleteFront`) maintains First-In, First-Out (FIFO) ordering, exactly implementing a standard Queue.
13. **A**. Trace of Pass 1 on $[5, 1, 4, 2, 8]$:
   - Compare 5 and 1: $5 > 1$, swap $\to [1, 5, 4, 2, 8]$
   - Compare 5 and 4: $5 > 4$, swap $\to [1, 4, 5, 2, 8]$
   - Compare 5 and 2: $5 > 2$, swap $\to [1, 4, 2, 5, 8]$
   - Compare 5 and 8: $5 \le 8$, no swap $\to [1, 4, 2, 5, 8]$
   After pass 1, the largest element (8) has bubbled to the end, leaving $[1, 4, 2, 5, 8]$.
14. **A**. Changing the comparison to search for the maximum element instead of the minimum causes each pass to select the largest remaining element and swap it into the current prefix position, sorting the array into descending order.
15. **B**. For a reverse sorted array, element at index $i$ must shift past all $i$ previous elements to reach the front. Total shifts = $\sum_{i=1}^{n-1} i = \frac{n(n - 1)}{2}$.
16. **A**. The recursion divides array size by 2 at each step, yielding a tree of depth $\log_2 n + 1$ levels. At each level, the total merging across all subproblems processes $n$ elements, requiring $O(n)$ work per level, producing $O(n \log n)$ total time.
17. **A**. Consider sorting $[2_a, 2_b, 1]$. In the first pass, 1 is the minimum and swaps with $2_a$, yielding $[1, 2_b, 2_a]$. The relative order of $2_a$ and $2_b$ is inverted, proving instability.
18. **B**. Merge Sort allocates a temporary array of size $n$ to hold merged results, and requires $\log_2 n$ stack frames for recursive calls, yielding total auxiliary space $O(n)$.
19. **A**. At each comparison, the search interval is halved. The maximum number of iterations until an interval of size 1 is evaluated is $\lfloor \log_2 n \rfloor + 1$.
20. **C**. On a degenerate (skewed) binary tree, each node has only one child, resembling a linked list. The recursion reaches depth $n$, allocating $n$ stack frames, requiring $O(n)$ auxiliary space.

---

## References & Navigation

- **Previous Topic:** [[Mock-Midterm-Exam-01]]
- **Related Notes:** [[Mock-Midterm-Exam-01]]
