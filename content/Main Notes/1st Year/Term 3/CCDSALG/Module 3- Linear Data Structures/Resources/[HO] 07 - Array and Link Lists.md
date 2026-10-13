---
id: Handout_07_-_Array_and_Link_Lists
type: note
course: CCDSALG
topic: Array and Link Lists
status: completed
---

# Array and Link Lists

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CCDSALG]] #[[Array and Link Lists]] #[[Code Snippets]] #[[M3]]

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


## References & Navigation

- **Related Notes:** [[Arrays and Linked Lists]]
