---
id: ccdsalg_arrays_and_linked_lists
type: note
course: CCDSALG
topic: Arrays and Linked Lists
status: completed
---
# Arrays and Linked Lists

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCDSALG]] #[[Array and Link Lists]] #[[Code Snippets]] #[[M3]]

---

## Overview

A **data structure** is a way to store and organize data to facilitate access and modifications. Using the appropriate data structure is an essential part of algorithm design, as no single data structure works well for all purposes.

### Arrays
An array is stored as a contiguous sequence of bytes in memory. 
* The index of the first element may be 0-based, 1-based, or user-defined, depending on the programming language.
* Elements are typically of the same type and size.
* Under the RAM model, a computer can access all memory locations in the same amount of time regardless of the index.

### Linked Lists
A linked list represents objects arranged in a linear order where the next object is determined by a pointer. 
* They are flexible and dynamic.
* They are not necessarily efficient in all operations compared to arrays.
* They can be singly or doubly linked.

## Important Formulas

**Array Address Calculation:**
Assuming an array starts at memory address $a$, the starting index is $s$, and each element takes $b$ bytes, the starting address $x$ of element $j$ is calculated as:
$$x = a + b(j - s + 1)$$
*(Note: Adjustments to this formula may vary based on exact language indexing rules.)*

## Code Implementation

### Singly Linked List Node Structure
```c
struct singlyNodeTag {
    int data;
    struct singlyNodeTag* pNext;
};
typedef struct singlyNodeTag singlyNodeType;
```

### Initializing and Creating a Node
```c
// Declare and initialize
singlyNodeType* pSList = NULL;

// Create a new node and assign data
singlyNodeType* pNew;
pNew = (singlyNodeType*) malloc(sizeof(singlyNodeType));
pNew->data = 10;
pNew->pNext = NULL;
```

### Inserting a Node at the Beginning
```c
// Set pNew as the first node in pSList
pNew->pNext = pSList;
pSList = pNew;
```

### Inserting a Node after a Specific Node
```c
// Assume pThis points to a node in pSList. Insert pNew after pThis:
pNew->pNext = pThis->pNext;
pThis->pNext = pNew;
```

### Removing the First Node
```c
singlyNodeType* pTemp;
pTemp = pSList;
pSList = pSList->pNext;
free(pTemp);
```

### Removing a Specific Sequence of Nodes
```c
// Assume pHere and pThere point to nodes in pSList. 
// pHere points to a node before pThere. Remove nodes after pHere up to pThere.
singlyNodeType* pRemove;
pRemove = pHere->pNext;
pHere->pNext = pThere->pNext;
// (Proceed to free pRemove if needed)
```


## Multiple Choice Questions

1. Under the RAM model, why can an array element at any valid index be accessed in the same constant amount of time?
    - **A)** Because every array automatically builds a hash table of its indices
    - **B)** Because array elements are linked sequentially by next-element pointers
    - **C)** Because arrays store elements of uniform size in a contiguous block of memory, enabling direct address computation
    - **D)** Because the RAM model caches only the first and last indices

2. Which statement accurately describes a key characteristic of linked lists compared to arrays?
    - **A)** Linked lists are flexible and dynamic through pointer chaining, though they are not necessarily efficient for all operations
    - **B)** Linked lists store nodes in strictly contiguous bytes, eliminating pointer fields
    - **C)** Linked lists always outperform arrays on random index lookups
    - **D)** Linked lists require all nodes to be allocated in a single malloc call

3. Using the array address calculation formula $x = a + b(j - s + 1)$ given in the note, if an array starts at memory address $a = 1000$, has starting index $s = 1$, and each element takes $b = 4$ bytes, what is the computed address $x$ for element $j = 5$?
    - **A)** 1016
    - **B)** 1020
    - **C)** 1024
    - **D)** 1005

4. When inserting a new node `pNew` at the beginning of `pSList`, why must `pNew->pNext = pSList;` execute BEFORE `pSList = pNew;`?
    - **A)** Because C forbids assigning NULL after updating a pointer
    - **B)** Because pNew->pNext would otherwise point to pTemp
    - **C)** Because malloc fails unless pNext is assigned first
    - **D)** Because assigning pSList = pNew first would overwrite the head pointer and lose the rest of the list

5. Which pointer assignment sequence correctly inserts `pNew` immediately after an existing node `pThis` without breaking the chain?
    - **A)** pThis->pNext = pNew; followed by pNew->pNext = pThis->pNext;
    - **B)** pThis->pNext = pNew->pNext; followed by pNew = pThis;
    - **C)** pNew->pNext = pThis->pNext; followed by pThis->pNext = pNew;
    - **D)** pNew->pNext = pThis; followed by pThis->pNext = NULL;

6. In the code for removing the first node of a singly linked list (`pTemp = pSList; pSList = pSList->pNext; free(pTemp);`), why is the temporary pointer `pTemp` required?
    - **A)** To keep a reference to the old first node so pSList can advance before freeing that node
    - **B)** Because free() only accepts local variables of type singlyNodeType
    - **C)** To prevent pSList->pNext from automatically resetting to NULL during assignment
    - **D)** To allocate a replacement node after freeing pSList

7. In `struct singlyNodeTag`, what role does the member `struct singlyNodeTag* pNext;` serve?
    - **A)** It stores the integer payload value of the subsequent node
    - **B)** It stores a pointer to the next node in the linear sequence (or NULL at the end)
    - **C)** It records the byte offset from the array base address
    - **D)** It points exclusively to the first node pSList for circular traversal

8. In the node creation snippet `pNew = (singlyNodeType*) malloc(sizeof(singlyNodeType)); pNew->data = 10; pNew->pNext = NULL;`, why is `pNew->pNext` explicitly set to `NULL`?
    - **A)** Because sizeof(singlyNodeType) excludes the pNext field
    - **B)** So that malloc can later expand the same node into a doubly linked node
    - **C)** Because NULL automatically links the node to the head of pSList
    - **D)** To initialize the pointer cleanly so the new node does not hold an uninitialized garbage address

9. In the snippet where `pHere` precedes `pThere` in `pSList`:
```c
pRemove = pHere->pNext;
pHere->pNext = pThere->pNext;
```
Which nodes are unlinked from the list?
    - **A)** The nodes starting immediately after pHere up to and including pThere
    - **B)** Only the node pHere itself
    - **C)** Only the node immediately following pThere
    - **D)** All nodes from pSList up to pHere

10. Why does the note emphasize selecting an appropriate data structure as an essential part of algorithm design?
    - **A)** Because every programming language permits only one data structure per program
    - **B)** Because no single data structure works efficiently across all access and modification operations
    - **C)** Because linked lists cannot store integer data types
    - **D)** Because arrays cannot support 0-based or 1-based indexing

### Answer Key & Explanations

1. **C)** An array occupies a contiguous region of uniform-sized bytes, so any element's memory address can be computed directly and accessed in constant time under the RAM model.
2. **A)** Linked lists connect nodes via pointers, making them flexible and dynamic, though they are not necessarily efficient in every operation (such as indexed access) compared to arrays.
3. **B)** Substituting into $x = a + b(j - s + 1)$ gives $x = 1000 + 4(5 - 1 + 1) = 1000 + 4(5) = 1020$.
4. **D)** Setting `pSList = pNew` first would erase the only pointer to the existing first node, making the rest of the list unreachable before `pNew->pNext` could link to it.
5. **C)** `pNew->pNext` must first capture `pThis->pNext` (the tail after `pThis`) before `pThis->pNext` is redirected to `pNew`.
6. **A)** Saving `pSList` in `pTemp` allows `pSList` to advance to `pSList->pNext` safely before `free(pTemp)` deallocates the removed head node.
7. **B)** A linked list determines the linear ordering of objects through pointers; `pNext` points to the next `singlyNodeTag` node in the list.
8. **D)** `malloc` allocates uninitialized heap memory for the node, so explicitly assigning `pNew->pNext = NULL` prevents a dangling or garbage pointer.
9. **A)** Redirecting `pHere->pNext` to `pThere->pNext` bypasses every node strictly after `pHere` through `pThere` inclusive, while `pRemove` retains the start of that detached chain for cleanup.
10. **B)** Different structures trade off strengths across access and modification patterns, and no single data structure excels for all purposes.

## References & Navigation

- **Previous Topic:** [[Sorting Algorithms]]
- **Next Topic:** [[Stack Operations and Applications]]
- **Related Notes:** [[Core Concepts]], [[Queues]]
