---
id: Handout_15_-_Heaps
type: note
course: CCDSALG
topic: Heaps
status: completed
---

# Heaps

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCDSALG]] #[[Heaps]] #[[Conceptual]] #[[M5]]

---

## Overview

A binary heap is an array that can be viewed as a nearly complete binary tree. The document details the structure of a max-heap where the parent's key is always greater than or equal to its children's keys. It introduces heap terminology, array indexing methods for traversing the tree, and the `heap-size` attribute.

## Important Formulas

**1-Based Array Indexing (Classical CLRS):**
- $\text{Parent}(i) = \lfloor i / 2 \rfloor$
- $\text{Left}(i) = 2i$
- $\text{Right}(i) = 2i + 1$

**0-Based Array Indexing (Standard Modern C/C++/Java):**
- $\text{Parent}(i) = \lfloor (i - 1) / 2 \rfloor$
- $\text{Left}(i) = 2i + 1$
- $\text{Right}(i) = 2i + 2$

**Heap Invariant:**
- **Max-Heap:** $\forall i > 1, \quad A[\text{Parent}(i)] \ge A[i]$
- **Min-Heap:** $\forall i > 1, \quad A[\text{Parent}(i)] \le A[i]$

**Time & Space Complexities:**
- Height of heap with $n$ elements: $h = \lfloor \log_2 n \rfloor$
- `Max-Heapify` / `Sift-Down`: $O(\log n)$
- `Build-Max-Heap`: $O(n)$ (asymptotically tighter than $O(n \log n)$ via summation of heights)
- `Insert` / `Sift-Up`: $O(\log n)$
- `Extract-Max`: $O(\log n)$
- `Heap-Sort`: $O(n \log n)$ in-place ($O(1)$ auxiliary space)

## Theoretical Framework: Array & Tree Duality

```mermaid
graph TD
    subgraph TreeLayout["Complete Binary Tree Representation"]
        N1["Index 1: 100"] --> N2["Index 2: 19"]
        N1 --> N3["Index 3: 36"]
        N2 --> N4["Index 4: 17"]
        N2 --> N5["Index 5: 3"]
        N3 --> N6["Index 6: 25"]
        N3 --> N7["Index 7: 1"]
        N4 --> N8["Index 8: 2"]
        N4 --> N9["Index 9: 7"]
    end
```

### Operation Lifecycles: Sift-Up vs. Sift-Down

```mermaid
flowchart TD
    subgraph SiftUp["Insertion / Sift-Up Protocol"]
        Insert["1. Append key to index A[heap_size + 1]"] --> IncSize["2. Increment heap_size"]
        IncSize --> CompParent{"Is key > A[Parent]?"}
        CompParent -- "Yes (Violation)" --> SwapP["Swap key with Parent"]
        SwapP --> CheckRoot{"Is key at root (index 1)?"}
        CheckRoot -- "No" --> CompParent
        CheckRoot -- "Yes" --> DoneUp["Heap Invariant Satisfied"]
        CompParent -- "No" --> DoneUp
    end
```

```mermaid
flowchart TD
    subgraph SiftDown["Extract-Max / Sift-Down (Max-Heapify) Protocol"]
        Extract["1. Save root max = A[1]"] --> PromoteLast["2. Move A[heap_size] to A[1], decrement heap_size"]
        PromoteLast --> Heapify["3. Initialize curr = 1"]
        Heapify --> FindLargest{"Compare curr, Left(curr), Right(curr):<br/>Is curr the largest?"}
        FindLargest -- "Yes" --> DoneDown["Heap Invariant Restored"]
        FindLargest -- "No" --> SwapChild["Swap curr with largest child (idx = maxChild)"]
        SwapChild --> MoveCurr["curr = maxChild"]
        MoveCurr --> FindLargest
    end
```

## Worked Examples

1. **Array to Tree Mapping:** An array `[100, 19, 36, 17, 3, 25, 1, 2, 7]` is 1-indexed. The parent of node at index 4 (`17`) is index $\lfloor 4/2 \rfloor = 2$ (`19`). The left child of index 2 is index 4 (`17`), and right child is index 5 (`3`).
2. **Extract-Max Step:** Root `100` is removed. Last leaf `7` (index 9) replaces `100` at index 1. `Max-Heapify` compares `7` with children `19` and `36`. Largest is `36` (index 3). `7` swaps with `36`. Then `7` compares with children `25` and `1`. Largest is `25` (index 6). `7` swaps with `25`. Tree is restored.


## References & Navigation

- **Related Notes:** [[Heaps]]
