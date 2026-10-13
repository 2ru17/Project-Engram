---
id: Declaration
type: note
course: CCPROG2
topic: C Programming
status: draft
---

# Declaration

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCPROG2]] #[[C Programming]] #[[Programming]] #[[Computer Science]] #[[Data Structures]] #[[Data Types]] #[[Structured Programming]] #[[Memory Management]]

---

## Overview

> Array declaration in C specifies the data type, name, and size of the array, allocating a contiguous block of memory.

## Key Concepts
 Syntax: `dataType arrayName[arraySize];` Size must be a compile-time constant (in standard C89) or variable-length (C99+) Memory is allocated contiguously Elements are uninitialized by default (contain garbage values)

## Details / Theory

### Syntax

```c
dataType arrayName[arraySize];
```
 `dataType` — the type of each element (`int`, `float`, `char`, etc.) `arrayName` — identifier for the array (follows C naming rules) `arraySize` — positive integer specifying number of elements

### Examples

```c
int numbers[10];     // Array of 10 integers
float prices[5];     // Array of 5 floats
char name[30];       // Array of 30 characters (for strings)
```

### Memory Allocation

Declaration allocates `arraySize × sizeof(dataType)` bytes contiguously:

```c
int arr[10];  // Allocates 10 × 4 = 40 bytes (assuming 4-byte int)
```

### Variable-Length Arrays (VLA) — C99+

```c
int n;
scanf("%d", &n);
int arr[n];  // Size determined at runtime (C99 feature)
```

> [!tip] Key Insight
> VLAs are allocated on the stack and cannot be initialized at declaration.

### Multi-Dimensional Declaration

```c
int matrix[3][4];    // 2D array: 3 rows, 4 columns
int cube[2][3][4];   // 3D array
```

## Common Pitfalls
 Using a variable as array size in C89 (only allowed in C99+). Forgetting that uninitialized arrays contain garbage values, not zeros. Declaring arrays with size 0 — this is not valid in standard C.

## Summary

> TL;DR — Array declaration in C uses `dataType name[size];` to allocate contiguous memory. Size must be a positive constant (C89) or variable (C99+). Uninitialized elements contain garbage values.

## Review Questions

_To be added._

## Links
 **Related:** [[Initialization]] — [[Size]] — [[Element Type]] — [[Memory Allocation]] — [[One-Dimensional Arrays (1D Arrays)]] **Source / Reference:**

## Multiple Choice Questions
1. Which of the following is required when declaring a fixed-size array?
    - **A)** Only the array name
    - **B)** The data type, array name, and size
    - **C)** The data type and initial values
    - **D)** Only the size in square brackets
2. What happens if you declare an array without initializing it (e.g., `int arr[5];`) inside a function?
    - **A)** It is automatically filled with zeros
    - **B)** It throws a compilation error
    - **C)** It contains unpredictable garbage values
    - **D)** It defaults to containing null pointers
3. Which declaration is syntactically invalid in standard C89?
    - **A)** `int n = 5; int arr[n];`
    - **B)** `#define N 5` followed by `int arr[N];`
    - **C)** `int arr[10];`
    - **D)** `char arr[5];`

### Answer Key & Explanations
1. **B)** Full declaration mandates specifying the unified type, identifier, and total size bounds.
2. **C)** Local arrays inherit whatever leftover binary data exists in their allocated stack space.
3. **A)** Variable length arrays using variables for sizing weren't officially introduced until C99.

## References & Navigation

- **Previous Topic:** [[Size]]
- **Next Topic:** [[Memory Allocation]]
- **Related Notes:** [[Initialization]], [[Memory Allocation]]
