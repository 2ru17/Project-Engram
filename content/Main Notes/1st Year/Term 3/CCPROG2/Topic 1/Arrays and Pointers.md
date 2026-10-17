---
id: Arrays-and-Pointers
type: note
course: CCPROG2
topic: C Programming
status: completed
---

# Arrays and Pointers

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCPROG2]] #[[C Programming]] #[[Programming]] #[[Computer Science]] #[[Data Structures]] #[[Data Types]] #[[Structured Programming]] #[[Memory Management]]

---

## Overview

> In expressions, an array name decays to a pointer to its first element.

## Key Concepts
 In expressions

## Details / Theory
 **In expressions**, an array name decays to a pointer to its first element. `arrayName` is equivalent to `&arrayName[0]`.

**Access using pointers**:

```c
int arr[3] = {10, 20, 30};
int *ptr = arr;

printf("%d\n", arr[1]);      // 20
printf("%d\n", *(arr + 1));  // 20
printf("%d\n", ptr[1]);      // 20
printf("%d\n", *(ptr + 1));  // 20
```

**Personal Note**: Understand array-pointer relationships for memory handling.

## Common Pitfalls
 Thinking an array **is** a pointer — an array name _decays_ to a pointer in expressions, but `sizeof(arr)` still returns the full array size in its declaring scope Confusing `arr[i]` with `*(arr + i)` in terms of behavior — they are equivalent, but pointer arithmetic on the wrong type (e.g., `char*` vs `int*`) causes incorrect offsets Incrementing the array name directly (`arr++`) — array names are not modifiable lvalues; only pointer variables can be incremented Forgetting that pointer arithmetic scales by `sizeof(element_type)` — `arr + 1` moves by one element, not one byte

## Summary

> TL;DR — An array name **decays** to a pointer to its first element in most expressions. `arr[i]` is equivalent to `*(arr + i)`. Key distinction: arrays have a fixed address (cannot be reassigned), while pointers are variables that can be reassigned and incremented.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions
1. In C, what does an array name naturally decay to when used in most expressions?
- **A)** A constant integer representing its size
- **B)** A pointer to its first element
- **C)** A pointer to the entire array structure
- **D)** A void pointer
2. Which expression is entirely equivalent to `arr[3]` in pointer arithmetic?
- **A)** `*(arr + 3)`
- **B)** `*arr + 3`
- **C)** `&(arr + 3)`
- **D)** `arr * 3`
3. Why is it advantageous to pass arrays as pointers to functions?
- **A)** It creates a safe duplicate of the array
- **B)** It automatically resizes the array
- **C)** It avoids the overhead of copying all array elements
- **D)** It forces the function to return a pointer

### Answer Key & Explanations
1. **B)** An array name decays to point directly to the memory address of the first item (index 0).
2. **A)** The subscript operator calculates the address `arr + 3` and then dereferences it.
3. **C)** Passing just the pointer passes the memory reference, bypassing expensive block copies.

## References & Navigation

- **Previous Topic:** [[Arrays and Functions]]
- **Next Topic:** [[Advantages and Disadvantages]]
- **Related Notes:** [[Memory Allocation]], [[Arrays]]
