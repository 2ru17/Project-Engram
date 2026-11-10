---
id: Mock-Midterm-Exam-01
type: note
course: CCDSALG
topic: Mock-Midterm-Exam-01
status: completed
---

# Mock-Midterm-Exam-01

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCDSALG]] #[[Mock-Midterm-Exam-01]] #[[Conceptual]]

---

## Overview

This mock midterm exam provides a rigorous, comprehensive assessment of foundational data structures and algorithm analysis topics in CCDSALG. Topics evaluated include formal asymptotic complexity analysis ($O, \Omega, \Theta$), nested loop frequency counting, recurrence relation solving via iterative substitution and the Master Theorem, stack and queue abstract data types, infix-to-postfix expression conversion and evaluation, and elementary sorting algorithms (Selection Sort, Insertion Sort, Bubble Sort, Merge Sort).

---

## Multiple Choice Practice Questions

1. By the formal mathematical definition of Big-Oh, $f(n) \in O(g(n))$ if and only if there exist positive constants $c > 0$ and $n_0 \ge 1$ such that:
    - **A)** $f(n) \ge c \cdot g(n)$ for all $n \ge n_0$
    - **B)** $0 \le f(n) \le c \cdot g(n)$ for all $n \ge n_0$
    - **C)** $f(n) \le g(n) / c$ for all $n \le n_0$
    - **D)** $|f(n) - g(n)| < c$ for all $n \ge n_0$

2. Consider the following nested loop code fragment:
   ```c
   int count = 0;
   for (int i = 1; i <= n; i++) {
       for (int j = 1; j <= i; j++) {
           count++;
       }
   }
   ```
   What is the exact execution frequency of the statement `count++`?
    - **A)** $n^2$
    - **B)** $\frac{n(n - 1)}{2}$
    - **C)** $\frac{n(n + 1)}{2}$
    - **D)** $n \log_2 n$

3. Determine the tight asymptotic bound $\Theta(f(n))$ of the following code fragment:
   ```c
   int sum = 0;
   for (int i = 1; i < n; i *= 2) {
       for (int j = 0; j < n; j++) {
           sum += (i + j);
       }
   }
   ```
    - **A)** $\Theta(n)$
    - **B)** $\Theta(n \log_2 n)$
    - **C)** $\Theta(n^2)$
    - **D)** $\Theta(\log_2 n)$

4. Using the iterative substitution method, solve the recurrence relation $T(n) = T(n - 1) + 3$ for $n > 1$ with base case $T(1) = 2$. What is the closed-form solution?
    - **A)** $T(n) = 3n - 1$
    - **B)** $T(n) = 3n + 2$
    - **C)** $T(n) = 3^n - 1$
    - **D)** $T(n) = 2n + 3$

5. Apply the Master Theorem to solve the divide-and-conquer recurrence $T(n) = 4T(n/2) + \Theta(n)$. What is the tight asymptotic bound?
    - **A)** $\Theta(n)$
    - **B)** $\Theta(n \log_2 n)$
    - **C)** $\Theta(n^2)$
    - **D)** $\Theta(n^{\log_2 3})$

6. Solve the recurrence relation $T(n) = 2T(n/2) + \Theta(n)$ with $T(1) = \Theta(1)$, which models the running time of Merge Sort. What is the tight bound?
    - **A)** $\Theta(n)$
    - **B)** $\Theta(n \log_2 n)$
    - **C)** $\Theta(n^2)$
    - **D)** $\Theta(2^n)$

7. A sequence of operations pushes elements $10, 20, 30$ onto an initially empty stack $S$. Then $S.\text{pop}()$ is executed once, element $40$ is pushed, and all remaining elements are popped until $S$ is empty. What is the sequence of popped values in order of output?
    - **A)** $30, 40, 20, 10$
    - **B)** $30, 20, 40, 10$
    - **C)** $10, 20, 30, 40$
    - **D)** $40, 30, 20, 10$

8. Which data structure is the optimal choice for validating whether an expression has properly nested and balanced delimiters (e.g. `{[()()]}`)?
    - **A)** FIFO Queue
    - **B)** LIFO Stack
    - **C)** Min-Heap
    - **D)** Circular Doubly Linked List

9. To reverse the contents of a queue $Q$ containing elements $[A, B, C, D]$ (where $A$ is the front), what algorithmic approach using an auxiliary stack $S$ is correct?
    - **A)** Dequeue each element from $Q$ and push onto $S$ until $Q$ is empty; then pop each element from $S$ and enqueue back into $Q$.
    - **B)** Enqueue each element from $S$ into $Q$; then pop from $S$.
    - **C)** Peek at $Q$ elements and insert them directly at the head of $S$.
    - **D)** Alternately dequeue from $Q$ and push to $S$ without emptying $Q$.

10. In a fixed-size circular array implementation of a queue with capacity $N$, where `front` points to the index of the first element and `rear` points to the index of the last element, what formula computes the new `rear` index upon enqueuing an item?
    - **A)** $\text{rear} = (\text{rear} + 1)$
    - **B)** $\text{rear} = (\text{rear} + 1) \pmod N$
    - **C)** $\text{rear} = (\text{rear} + N) \pmod{(N - 1)}$
    - **D)** $\text{rear} = (\text{front} + \text{rear}) \pmod N$

11. If a queue is implemented using two stacks $S_1$ (inbox) and $S_2$ (outbox), where enqueues always push to $S_1$ and dequeues pop from $S_2$ (transferring all elements from $S_1$ to $S_2$ only when $S_2$ is empty), what is the amortized time complexity per dequeue operation over $n$ total operations?
    - **A)** $O(n^2)$
    - **B)** $O(n)$
    - **C)** $O(1)$
    - **D)** $O(\log n)$

12. Convert the standard infix arithmetic expression $A + B \times C - D / E$ into postfix (Reverse Polish Notation) using standard operator precedence ($*, / > +, -$ and left-associativity):
    - **A)** $A B C \times + D E / -$
    - **B)** $A B + C \times D E / -$
    - **C)** $+ A \times B C - / D E$
    - **D)** $A B C + \times D - E /$

13. Evaluate the following postfix expression using an operand stack: $6 \quad 2 \quad 3 \quad + \quad \times \quad 10 \quad -$. What is the final computed numerical result?
    - **A)** 20
    - **B)** 30
    - **C)** 24
    - **D)** 14

14. Given the initial integer array $A = [29, 10, 14, 37, 13]$, what is the state of the array after the first two complete outer-loop passes of Selection Sort (sorting in ascending order by finding minimums)?
    - **A)** $[10, 13, 14, 37, 29]$
    - **B)** $[10, 14, 29, 37, 13]$
    - **C)** $[10, 13, 29, 37, 14]$
    - **D)** $[10, 14, 13, 29, 37]$

15. What is the total number of element comparisons performed by Selection Sort on an array of $n$ elements in the worst, average, and best cases?
    - **A)** Best: $O(n)$, Worst: $O(n^2)$
    - **B)** Always $\frac{n(n - 1)}{2} = \Theta(n^2)$ in all cases
    - **C)** Best: $O(n \log n)$, Worst: $O(n^2)$
    - **D)** Always $n$ comparisons

16. Given the array $A = [8, 3, 5, 1, 9]$, what is the exact configuration of elements after the second pass of Insertion Sort (inserting $A[2] = 5$ into the sorted prefix)?
    - **A)** $[3, 8, 5, 1, 9]$
    - **B)** $[3, 5, 8, 1, 9]$
    - **C)** $[1, 3, 5, 8, 9]$
    - **D)** $[5, 3, 8, 1, 9]$

17. Which elementary sorting algorithm exhibits an adaptive best-case time complexity of $\Theta(n)$ when the input array is already completely sorted?
    - **A)** Standard Selection Sort
    - **B)** Insertion Sort
    - **C)** Naive Unflagged Bubble Sort
    - **D)** Naive Quicksort with first-element pivot

18. An optimized Bubble Sort includes a boolean flag `swapped` that halts execution if an entire pass completes without a single swap. What is the best-case time complexity of this optimized implementation on an already sorted list of $n$ elements?
    - **A)** $\Theta(n^2)$
    - **B)** $\Theta(n \log n)$
    - **C)** $\Theta(n)$
    - **D)** $\Theta(1)$

19. In Merge Sort, two sorted subarrays of sizes $p$ and $q$ are merged into a combined sorted array. What is the maximum number of key comparisons required by the merge subroutine?
    - **A)** $p \times q$
    - **B)** $p + q - 1$
    - **C)** $\max(p, q)$
    - **D)** $\log_2(p + q)$

20. Which of the following statements correctly distinguishes Merge Sort from standard in-place Selection Sort?
    - **A)** Merge Sort requires $O(n)$ auxiliary memory and is stable, whereas in-place Selection Sort requires $O(1)$ auxiliary memory and is unstable.
    - **B)** Selection Sort is $O(n \log n)$ while Merge Sort is $O(n^2)$.
    - **C)** Merge Sort cannot be implemented recursively.
    - **D)** In-place Selection Sort is stable for all inputs.

---

### Answer Key & Explanations

1. **B**. The formal definition of Big-Oh requires bounding $f(n)$ from above by a constant multiple $c$ of $g(n)$ for all $n \ge n_0$, with $f(n)$ non-negative ($0 \le f(n) \le c \cdot g(n)$).
2. **C**. The outer loop runs for $i = 1, 2, \dots, n$. For each $i$, the inner loop executes $i$ times. The total execution count is $\sum_{i=1}^n i = \frac{n(n + 1)}{2}$.
3. **B**. The outer loop index starts at $i = 1$ and doubles each step until reaching $n$, executing $\lfloor \log_2 n \rfloor$ iterations. The inner loop executes exactly $n$ times for each outer iteration. Total running time is $\Theta(n \log_2 n)$.
4. **A**. Unfolding the recurrence:
   $$T(n) = T(n - 1) + 3$$
   $$T(n) = (T(n - 2) + 3) + 3 = T(n - 2) + 2(3)$$
   $$T(n) = T(n - k) + 3k$$
   Setting $n - k = 1 \implies k = n - 1$:
   $$T(n) = T(1) + 3(n - 1) = 2 + 3n - 3 = 3n - 1$$
5. **C**. By the Master Theorem $T(n) = aT(n/b) + f(n)$: here $a = 4, b = 2, f(n) = \Theta(n)$. We calculate $n^{\log_b a} = n^{\log_2 4} = n^2$. Since $f(n) = O(n^{2 - \epsilon})$ for $\epsilon = 1$, Case 1 applies, yielding $T(n) = \Theta(n^2)$.
6. **B**. For $T(n) = 2T(n/2) + \Theta(n)$, $a = 2, b = 2$, so $n^{\log_2 2} = n^1$. Since $f(n) = \Theta(n^1)$, Case 2 of the Master Theorem applies with $k = 0$, giving $T(n) = \Theta(n \log_2 n)$.
7. **A**. 
   - Push $10 \to S = [10]$
   - Push $20 \to S = [10, 20]$
   - Push $30 \to S = [10, 20, 30]$
   - Pop $\to$ outputs **30**, leaving $S = [10, 20]$
   - Push $40 \to S = [10, 20, 40]$
   - Pop all $\to$ outputs **40**, then **20**, then **10**.
   Total order: $30, 40, 20, 10$.
8. **B**. A LIFO stack pushes opening delimiters onto the stack and verifies that each closing delimiter matches and pops the corresponding most recently seen opening delimiter.
9. **A**. Dequeueing all elements of $Q$ into a stack reverses their order due to the stack's LIFO property. Popping from $S$ and enqueuing back into $Q$ places the reversed sequence back into the queue.
10. **B**. Circular arrays use modulo arithmetic on index incrementation to wrap around to index 0 when the boundary of the allocated buffer is reached: $\text{rear} = (\text{rear} + 1) \pmod N$.
11. **C**. Each element is pushed onto $S_1$ once, popped from $S_1$ once, pushed onto $S_2$ once, and popped from $S_2$ once. Thus, each element experiences exactly 4 stack operations over its entire lifetime in the queue, yielding an amortized complexity of $\frac{4n}{n} = O(1)$ per operation.
12. **A**. In infix $A + B \times C - D / E$:
   - Multiplication $B \times C \to B C \times$ has higher precedence than addition.
   - Left-associative addition evaluates $(A + (B \times C)) \to A B C \times +$.
   - Division $D / E \to D E /$ evaluates next.
   - Subtraction combines both parts: $A B C \times + D E / -$.
13. **A**. Step-by-step operand stack evaluation:
   - Push 6, push 2, push 3 $\to$ Stack: $[6, 2, 3]$
   - Operator `+`: Pop 3 and 2, compute $2 + 3 = 5$, push 5 $\to$ Stack: $[6, 5]$
   - Operator `*`: Pop 5 and 6, compute $6 \times 5 = 30$, push 30 $\to$ Stack: $[30]$
   - Push 10 $\to$ Stack: $[30, 10]$
   - Operator `-`: Pop 10 and 30, compute $30 - 10 = 20$, push 20 $\to$ Stack: $[20]$
   Result is 20.
14. **A**. 
   - Pass 1 ($i = 0$): Scan $[29, 10, 14, 37, 13]$. Minimum is $10$ at index 1. Swap $A[0]$ and $A[1] \to [10, 29, 14, 37, 13]$.
   - Pass 2 ($i = 1$): Scan suffix $[29, 14, 37, 13]$. Minimum is $13$ at index 4. Swap $A[1]$ and $A[4] \to [10, 13, 14, 37, 29]$.
15. **B**. In Selection Sort, the inner loop always compares every element in the remaining unsorted suffix regardless of initial ordering: $\sum_{i=0}^{n-2} (n - 1 - i) = \frac{n(n - 1)}{2}$ comparisons in all cases.
16. **B**. 
   - Initial array: $[8, 3, 5, 1, 9]$
   - Pass 1 (insert 3): $[3, 8, 5, 1, 9]$
   - Pass 2 (insert 5 into sorted prefix $[3, 8]$): 5 is compared with 8, 8 shifts right, 5 is inserted before 8 $\to [3, 5, 8, 1, 9]$.
17. **B**. When an array is already sorted, Insertion Sort compares each element $A[i]$ once with $A[i-1]$, finds it is already in position, and performs zero shifts, terminating that pass in $O(1)$ and achieving $\Theta(n)$ overall.
18. **C**. On an already sorted list, the first pass of Bubble Sort performs $n - 1$ comparisons, makes zero swaps, checks the `swapped` flag, and halts immediately, running in $\Theta(n)$ time.
19. **B**. At each step of the merge algorithm, one comparison determines the smaller element, which is placed into the auxiliary array. In the worst case (elements strictly alternate), the final element remaining does not require a comparison, requiring at most $p + q - 1$ comparisons.
20. **A**. Merge Sort requires an auxiliary array of size $n$ to merge sorted halves and maintains relative order of equal keys (stable). Standard in-place Selection Sort requires $O(1)$ extra space but long-distance swaps can move equal keys past each other, making it unstable.

---

## References & Navigation

- **Previous Topic:** [[Supplement-Infix-to-Postfix]]
- **Next Topic:** [[Mock-Midterm-Exam-02]]
- **Related Notes:** [[Mock-Midterm-Exam-02]]
