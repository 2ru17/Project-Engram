---
id: Common-Array-Operations-&-Considerations
type: note
course: CCPROG2
topic: C Programming
status: completed
---

# Common Array Operations & Considerations

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCPROG2]] #[[C Programming]] #[[Programming]] #[[Computer Science]] #[[Data Structures]] #[[Data Types]] #[[Structured Programming]] #[[Memory Management]]

---

## Overview

> Searching: Linear Search, Binary Search (if sorted)

## Key Concepts
 Searching Sorting Insertion/Deletion Size Calculation Assignment

## Details / Theory
 **Searching**: Linear Search, Binary Search (if sorted) **Sorting**: Bubble Sort, Selection Sort, Merge Sort, Quick Sort **Insertion/Deletion**: In static arrays, this requires shifting elements **Size Calculation**:

```c
int size = sizeof(array) / sizeof(array[0]);
```

> Only valid in the scope where the array is defined
 **Assignment**:

```c
int a[3] = {1,2,3};
int b[3];
for (int i = 0; i < 3; i++) b[i] = a[i];
```

## Common Pitfalls
 Using `sizeof(arr)` inside a function to calculate array size — it returns the pointer size instead; pass the size as a separate parameter Assigning arrays directly (`b = a`) — C does not support array assignment; use a loop or `memcpy()` to copy elements Inserting/deleting in the middle without shifting — you must manually shift subsequent elements, which is $O(n)$ Forgetting to check **bounds** before accessing or modifying elements — out-of-bounds access is undefined behavior

## Summary

> TL;DR — Common array operations: **searching** (linear/binary), **sorting** (bubble/selection/insertion), **insertion/deletion** (requires shifting, $O(n)$), **size calculation** (`sizeof(arr)/sizeof(arr[0])` in declaring scope only), and **element-wise copying** (loop or `memcpy`, not direct assignment).

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions
1. Which operation generally requires an $O(n)$ time complexity in an array?
- **A)** Accessing the last element
- **B)** Inserting an element at the beginning
- **C)** Overwriting the first element
- **D)** Finding the memory address of the first element
2. Why is deleting an element from the middle of an array inefficient?
- **A)** Because memory must be completely reallocated
- **B)** Because all subsequent elements must be shifted to fill the gap
- **C)** Because pointers need to be freed manually
- **D)** Because arrays cannot be modified after compilation
3. What consideration must programmers manually manage when inserting elements into an array?
- **A)** Making sure the array capacity is not exceeded (Bounds Checking)
- **B)** Ensuring the compiler has auto-resized the array
- **C)** Writing garbage collection routines
- **D)** Casting all values to void pointers

### Answer Key & Explanations
1. **B)** Insertion at the start forces all existing elements to shift rightward.
2. **B)** Deletion creates empty space that adjacent values must slide over to conceal.
3. **A)** Since C lacks automatic bounds verification, inserting past capacity causes overflows.

## References & Navigation

- **Previous Topic:** [[Traversing Arrays]]
- **Next Topic:** [[Dimensions of Arrays]]
- **Related Notes:** [[Traversing Arrays]], [[Arrays and Functions]]
