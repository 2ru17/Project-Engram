---
id: Name
type: note
course: CCPROG2
topic: C Programming
status: completed
---

# Name

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CCPROG2]] #[[C Programming]] #[[Programming]] #[[Computer Science]] #[[Data Structures]] #[[Data Types]] #[[Structured Programming]] #[[Memory Management]]

---

## Overview

> The array name is an identifier that refers to the entire array and acts as a pointer to the first element.

## Key Concepts
 Follows C identifier naming rules Array name decays to a pointer to the first element in most contexts Cannot be reassigned (it’s not a modifiable lvalue) Used to pass arrays to functions

## Details / Theory

### Naming Rules

Array names follow standard C identifier rules:
 Can contain letters, digits, and underscores Must start with a letter or underscore Case-sensitive (`arr` ≠ `Arr`) Cannot be a C keyword

```c
int studentScores[50];   // Descriptive name
float x[10];             // Short name (acceptable for temp use)
```

### Array Name as Pointer

In most expressions, the array name **decays** to a pointer to its first element:

```c
int arr[5] = {10, 20, 30, 40, 50};
int *p = arr;       // arr decays to &arr[0]
printf("%d", *p);   // Output: 10
```

### Exceptions (No Decay)

The array name does NOT decay in these contexts:

1. `sizeof(arr)` — returns total array size, not pointer size
2. `&arr` — gives address of the whole array (type `int (*)[5]`)

### Cannot Reassign

```c
int arr[5], other[5];
arr = other;  // ERROR: array name is not assignable
```

## Common Pitfalls
 Thinking the array name IS a pointer variable — it’s a fixed address, not a modifiable pointer. Confusing `sizeof(arr)` (total size) with `sizeof(ptr)` (pointer size, typically 8 bytes).

## Summary

> TL;DR — The array name is an identifier that decays to a pointer to the first element in most contexts. It cannot be reassigned and follows standard C naming rules.

## Links
 **Related:** [[Declaration]] — [[Arrays and Pointers]] — [[Accessing Elements]] — [[Arrays and Functions]] **Source / Reference:**

## Multiple Choice Questions

1. What does the array name represent when passed to a function?
    - **A)** A full copy of all its elements
    - **B)** The address of its first element
    - **C)** The size of the array
    - **D)** The data type of the array
2. Which of the following is an invalid array name in C?
    - **A)** `my_array`
    - **B)** `_data`
    - **C)** `1stArray`
    - **D)** `array1`
3. Why can't you assign a new array directly to an array name using the `=` operator (e.g., `arr = newArr;`)?
    - **A)** Because the array name evaluates to a constant pointer to its base address
    - **B)** Because C does not support assignments
    - **C)** Because arrays are invisible
    - **D)** Because you must use `==` instead

### Answer Key & Explanations

1. **B**. The identifier acts as a reference pointing to the memory base, preventing deep copies.
2. **C**. Standard C identifier rules prohibit variables from starting with a numeric digit.
3. **A**. The name is tied statically to its original memory block and cannot be repointed.

## References & Navigation

- **Previous Topic:** [[Characteristics & Attributes]]
- **Next Topic:** [[Element Type]]
- **Related Notes:** [[Characteristics & Attributes]], [[Names, Variables, Binding, Scope]]
