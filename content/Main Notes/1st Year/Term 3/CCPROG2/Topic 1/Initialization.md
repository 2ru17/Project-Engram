---
id: Initialization
type: note
course: CCPROG2
topic: C Programming
status: draft
---

# Initialization

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCPROG2]] #[[C Programming]] #[[Programming]] #[[Computer Science]] #[[Data Structures]] #[[Data Types]] #[[Structured Programming]] #[[Memory Management]]

---

## Overview

> Array initialization assigns values to array elements at the time of declaration.

## Key Concepts
 Initializer list syntax: `{val1, val2, ...}` Partial initialization fills remaining elements with 0 Size can be omitted if initializer is provided Uninitialized local arrays contain garbage values

## Details / Theory

### Full Initialization

```c
int arr[5] = {10, 20, 30, 40, 50};  // All 5 elements set
```

### Partial Initialization

```c
int arr[5] = {1, 2};  // arr = {1, 2, 0, 0, 0}
```

Remaining elements are automatically initialized to **0** (for numeric types) or `'\0'` (for `char`).

### Size Omission

```c
int arr[] = {10, 20, 30};  // Compiler infers size = 3
char str[] = "Hello";       // Size = 6 (includes '\0')
```

### Zero Initialization

```c
int arr[100] = {0};  // All 100 elements set to 0
```

### String Initialization

```c
char greeting[6] = {'H', 'e', 'l', 'l', 'o', '\0'};
char greeting[] = "Hello";  // Equivalent, compiler adds '\0'
```

### 2D Array Initialization

```c
int matrix[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};
```

## Common Pitfalls
 Assuming uninitialized local arrays are zeroed — they contain garbage values. Forgetting the null terminator when initializing `char` arrays as strings. Providing more initializers than the array size — compilation error.

## Summary

> TL;DR — Arrays can be initialized at declaration using `{...}`. Partial initialization zeros remaining elements. Uninitialized local arrays contain garbage. String arrays need `'\0'` termination.

## Review Questions

_To be added._

## Links
 **Related:** [[Declaration]] — [[Accessing Elements]] — [[Size]] — [[Element Type]] — [[One-Dimensional Arrays (1D Arrays)]] **Source / Reference:**

## Multiple Choice Questions
1. How do you fully initialize an array at the time of declaration?
- **A)** `int arr[3] = (1, 2, 3);`
- **B)** `int arr[3] = {1, 2, 3};`
- **C)** `int arr[3] = [1, 2, 3];`
- **D)** `int arr[3]; arr = {1, 2, 3};`
2. What happens if you provide fewer initialization values than the array's size (e.g., `int arr[5] = {1, 2};`)?
- **A)** The compilation fails
- **B)** The remaining elements contain garbage values
- **C)** The remaining elements are automatically initialized to zero
- **D)** The array shrinks to size 2
3. Can you omit the size in the square brackets when initializing an array?
- **A)** No, the size is always strictly required
- **B)** Yes, the compiler will infer the size from the number of initializers
- **C)** Yes, but only for multidimensional arrays
- **D)** No, doing so defaults the size to 1

### Answer Key & Explanations
1. **B)** Curly braces enclosing comma-separated values are used for aggregate initialization.
2. **C)** Partial initialization forces the compiler to pad all unspecified trailing slots with zeros.
3. **B)** The compiler counts the provided elements in the list and sets the bounds automatically.

## References & Navigation

- **Previous Topic:** [[Memory Allocation]]
- **Next Topic:** [[Accessing Elements]]
- **Related Notes:** [[Declaration]], [[Accessing Elements]]
