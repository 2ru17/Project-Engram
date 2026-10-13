---
id: Handout_08_-_Stacks
type: note
course: CCDSALG
topic: Stacks
status: completed
---

# Stacks

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCDSALG]] #[[Stacks]] #[[Conceptual]] #[[M3]]

---

## Overview

A **stack** is a dynamic, ordered list that implements a **Last-In, First-Out (LIFO)** policy. This means that the last element added to the stack will be the first one to be removed. In a stack, insertion and deletion of elements only occur at one end, which is referred to as the **top** of the stack.

## Key Definitions

* **top**: The index of the most recently inserted element in the stack. When the stack is empty (assuming a 1-based index `S[1..n]`), `top` is `0`.
* **size**: The maximum capacity of the stack.
* **underflow**: An error that occurs when there is an attempt to pop an element from an empty stack.
* **overflow**: An error that occurs when there is an attempt to push an element onto a stack where `top` already exceeds or equals `size`.

## Theoretical Framework

The behavior of a stack is governed by the following standard operations:

* **Create(S)**: Creates a new, empty stack `S`.
* **Push(S, x)**: Inserts the element `x` into the stack at the `top` position. This operation may trigger an overflow error if the stack is already full.
* **Pop(S)**: Deletes the topmost element from the stack and returns that element. This operation may trigger an underflow error if the stack is empty.
* **Top(S)**: Returns the value of the top element of the stack without removing it (does not take an element argument).
* **StackEmpty(S)**: Returns `true` when the stack is empty (`top == 0`), and `false` otherwise.
* **StackFull(S)**: Returns `true` when the stack has reached its maximum capacity (`size`), and `false` otherwise.

```mermaid
graph TD
    subgraph StackLayout["Stack Array Memory Model (LIFO Discipline)"]
        direction TB
        TopNode["S[4]: Element D <-- Top Pointer = 4 (Push / Pop Boundary)"]
        Node3["S[3]: Element C"]
        Node2["S[2]: Element B"]
        Node1["S[1]: Element A (Stack Base)"]
        EmptySlot["S[5..n]: Available Capacity (Unallocated)"]
        EmptySlot -.- TopNode
        TopNode --- Node3 --- Node2 --- Node1
    end
```

### Push & Pop Lifecycle Dynamics

```mermaid
sequenceDiagram
    autonumber
    actor Caller
    participant S as Stack S[1..n]
    Caller->>S: Push(Element E)
    Note over S: Verify top < size (No Overflow)<br/>top = top + 1<br/>S[top] = E
    S-->>Caller: Push completed (New Top = 5)
    Caller->>S: Pop()
    Note over S: Verify top > 0 (No Underflow)<br/>retVal = S[top]<br/>top = top - 1
    S-->>Caller: Return Element E (New Top = 4)
```


## References & Navigation

- **Related Notes:** [[Stacks]]
