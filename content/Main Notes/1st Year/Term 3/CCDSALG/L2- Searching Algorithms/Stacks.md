---
id: Stacks
type: note
course: CCDSALG
topic: Algorithms
status: completed
---

# Stacks

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Searching]] #[[Data Structures]] #[[Search Efficiency]] #[[Algorithm]] #[[Data Abstraction]] #[[Accessing Elements]] #[[Fundamental Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> A stack is an abstract data type that represents a collection of elements with two principal operations:

## Key Concepts
 PUSH POP TOP STACK_EMPTY STACK_FULL

## Details / Theory

## Overview

A **stack** is an abstract data type that represents a collection of elements with two principal operations:
 **PUSH**: Adds an element to the top of the stack. **POP**: Removes the most recently added element (the top).

Stacks follow the **Last-In, First-Out (LIFO)** principle—the last element inserted is the first one to be removed.

---

## Key Terminologies
 **TOP**: Pointer indicating the position of the most recently inserted item in the stack. **STACK_EMPTY**: Check to see if the stack contains no elements. **STACK_FULL**: Check to see if the stack has reached its maximum capacity.

---

## Stack Operations

### 1. CREATE(STACK)

Initializes an empty stack:

```c
TOP = 0;
```

### 2. STACK_EMPTY(STACK)

```c
if (TOP == 0)
    return 1; // true
else
    return 0; // false
```

### 3. STACK_FULL(STACK)

Assuming stack has capacity `n`:

```c
if (TOP == n)
    return 1; // true
else
    return 0; // false
```

### 4. PUSH(STACK, x)

Adds an element `x` to the top:

```c
if (STACK_FULL(STACK))
    printf("Overflow error!\n");
else {
    TOP = TOP + 1;
    STACK[TOP] = x;
}
```

### 5. POP(STACK)

Removes and returns the top element:

```c
if (STACK_EMPTY(STACK))
    printf("Underflow Error!\n");
else {
    x = STACK[TOP];
    TOP = TOP - 1;
    return x;
}
```

### 6. TOP(STACK)

Returns the current top element without removing it:

```c
if (STACK_EMPTY(STACK))
    printf("Stack Empty!\n");
else
    return STACK[TOP];
```

---

## Stack Simulation Walkthrough

Assume a stack `S` with capacity 9.

| Operation      | Stack Contents                      | TOP |
| -------------- | ----------------------------------- | --- |
| CREATE(S)      | `? ? ? ? ? ? ? ? ?`                 | 0   |
| PUSH(S, 8)     | `8 ? ? ? ? ? ? ? ?`                 | 1   |
| PUSH(S, 12)    | `8 12 ? ? ? ? ? ? ?`                | 2   |
| PUSH(S, -7)    | `8 12 -7 ? ? ? ? ? ?`               | 3   |
| PUSH(S, 1)     | `8 12 -7 1 ? ? ? ? ?`               | 4   |
| PUSH(S, 3)     | `8 12 -7 1 3 ? ? ? ?`               | 5   |
| PUSH(S, 17)    | `8 12 -7 1 3 17 ? ? ?`              | 6   |
| POP(S)         | returns 17 → `8 12 -7 1 3 17 ? ? ?` | 5   |
| TOP(S)         | returns 3                           | 5   |
| STACK_EMPTY(S) | returns false                       | 5   |
| PUSH(S, 20)    | `8 12 -7 1 3 20 ? ? ?`              | 6   |
| PUSH(S, 9)     | `8 12 -7 1 3 20 9 ? ?`              | 7   |
| PUSH(S, 2)     | `8 12 -7 1 3 20 9 2 ?`              | 8   |
| PUSH(S, 21)    | `8 12 -7 1 3 20 9 2 21`             | 9   |
| STACK_FULL(S)  | returns true                        | 9   |

---

## Stack Errors
 **Underflow**: Trying to pop from an empty stack. **Overflow**: Trying to push into a full stack.

---

## Real-World Analogies
 **Book pile**: Only the top book is accessible. **Plates stack**: Only the top plate can be taken or added.

---
 Function call stack Expression evaluation (e.g., infix to postfix conversion) Backtracking (e.g., mazes, recursion) Undo features in editors

---

## Time and Space Complexities

| Operation  | Time Complexity | Space Complexity |
| ---------- | --------------- | ---------------- |
| PUSH       | $O(1)$          | $O(1)$           |
| POP        | $O(1)$          | $O(1)$           |
| TOP        | $O(1)$          | $O(1)$           |
| EMPTY/FULL | $O(1)$          | $O(1)$           |

---

## Common Pitfalls
 Calling **`pop`** or **`top`** on an empty stack — causes **underflow** error; always check `empty()` first Calling **`push`** on a full (fixed-size) stack — causes **overflow** error; always check `full()` first Confusing **LIFO** (stack) with **FIFO** (queue) — stacks return the most recently added element, queues return the oldest Forgetting that **`top`** only peeks without removing, while **`pop`** removes the element — mixing these up corrupts the stack state Assuming stack operations are $O(n)$ — all core operations (`push`, `pop`, `top`, `empty`, `full`) are $O(1)$

## Summary

> TL;DR — A **stack** is a LIFO data structure with $O(1)$ `push`, `pop`, `top`, `empty`, and `full` operations. Watch for **overflow** (push on full) and **underflow** (pop/top on empty). Implemented via arrays (fixed size) or linked lists (dynamic size).

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. What principle does a stack follow?
- **A)** First-In, First-Out (FIFO)
- **B)** Last-In, First-Out (LIFO)
- **C)** Random Access
- **D)** First-In, Last-Out (FILO)

2. What does the PUSH operation do?
- **A)** Removes the most recently added element.
- **B)** Adds an element to the bottom of the stack.
- **C)** Adds an element to the top of the stack.
- **D)** Checks if the stack is full.

3. What does the POP operation do?
- **A)** Adds an element to the top.
- **B)** Removes and returns the most recently added element (the top).
- **C)** Returns the top element without removing it.
- **D)** Empties the entire stack.

4. What error occurs if you try to POP from an empty stack?
- **A)** Overflow
- **B)** Underflow
- **C)** Segmentation Fault
- **D)** Syntax Error

5. What is the time complexity of the PUSH operation?
- **A)** $O(n)$
- **B)** $O(\log n)$
- **C)** $O(1)$
- **D)** $O(n^2)$

6. Which operation returns the current top element WITHOUT removing it?
- **A)** PUSH
- **B)** POP
- **C)** TOP
- **D)** CREATE

7. In the Stack Simulation Walkthrough, after PUSHing 8, 12, -7, 1, 3, 17 and then calling POP once, what does the next TOP operation return?
- **A)** 17
- **B)** 8
- **C)** 3
- **D)** -7

8. What error occurs if you try to PUSH into a stack that has reached its maximum capacity?
- **A)** Underflow
- **B)** Overflow
- **C)** Null Pointer
- **D)** Type Mismatch

9. Which of the following is a real-world application of a stack?
- **A)** A queue at a grocery store.
- **B)** A round-robin scheduler.
- **C)** An undo feature in a text editor.
- **D)** Broadcasting a network packet.

10. What is a common pitfall when working with stacks and queues?
- **A)** Confusing LIFO (stack) with FIFO (queue).
- **B)** Assuming `push` takes $O(n)$ time.
- **C)** Thinking a stack can only hold integers.
- **D)** Using `pop` instead of `push` to add items.

### Answer Key & Explanations
1. **B)** A stack operates on a Last-In, First-Out (LIFO) model, much like adding and removing plates from a physical stack.
2. **C)** PUSH strictly inserts new data at the very TOP of the structure, advancing the top pointer.
3. **B)** POP both retrieves the value stored at the top pointer and decrements the pointer, permanently removing it from the stack.
4. **B)** Attempting to extract data that doesn't exist drops the pointer below zero, triggering an Underflow Error.
5. **C)** Because you are just writing a value to an array index and incrementing a pointer, PUSH is highly efficient and executes in constant $O(1)$ time.
6. **C)** The TOP operation (sometimes called Peek) allows you to view the data currently at the top of the stack without altering the pointer.
7. **C)** The POP operation removed the 17, making the 3 the new topmost element. Therefore, querying TOP immediately after will return 3.
8. **B)** When the underlying array is completely full, attempting to PUSH drops the pointer out of bounds, triggering an Overflow Error.
9. **C)** Text editors store your actions in a stack; when you hit "Undo", they POP the most recent action off the stack and reverse it.
10. **A)** Developers frequently mix up the data retrieval logic—stacks return the newest item (LIFO), whereas queues return the oldest item (FIFO).

## References & Navigation

- **Previous Topic:** [[Searching Algorithms]]
- **Next Topic:** [[Supplement-Infix-to-Postfix]]
- **Related Notes:** [[Function Calls]], [[Searching Algorithms]]
