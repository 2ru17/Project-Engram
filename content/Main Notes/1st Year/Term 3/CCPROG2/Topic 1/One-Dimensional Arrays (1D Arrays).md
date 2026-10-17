---
id: One-Dimensional-Arrays-(1D-Arrays)
type: note
course: CCPROG2
topic: C Programming
status: completed
---

# One-Dimensional Arrays (1D Arrays)

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCPROG2]] #[[C Programming]] #[[Programming]] #[[Computer Science]] #[[Data Structures]] #[[Data Types]] #[[Structured Programming]] #[[Memory Management]]

---

## Overview

> dataType arrayName[arraySize];

## Details / Theory

### Declaration

**Syntax**:

````c
dataType arrayName[arraySize];

 `dataType`: Type of elements (e.g., `int`, `float`, `char`)
 `arrayName`: Name of the array
 `arraySize`: Positive integer constant

**Examples**:

```c
int numbers[10];
float prices[5];
char name[30];
````

**Memory Allocation**:  
If `int` takes 4 bytes, then:

```c
int numbers[10]; // allocates 10 × 4 = 40 bytes
```

---

### Initialization

**Syntax**:

```c
dataType arrayName[arraySize] = {value1, value2, ..., valueN};
```

**Examples**:

```c
int marks[5] = {10, 15, 12, 18, 17};
float temps[] = {23.5f, 24.0f, 22.8f};
char greeting[6] = {'H', 'e', 'l', 'l', 'o', '\0'};
char message[] = "Hello";
```

Uninitialized elements:

```c
int data[5] = {1, 2}; // remaining values depend on storage type
```

**Personal Note**: Always initialize arrays to avoid garbage values.

---

### Accessing Elements

Arrays are zero-indexed.

**Syntax**:

```c
arrayName[index]
```

**Examples**:

```c
int scores[3];
scores[0] = 90;
scores[1] = 85;
scores[2] = 92;
```

**Out-of-Bounds Access**:  
Accessing indices outside `0` to `arraySize - 1` results in undefined behavior.

**Personal Note**: This is a common security risk. Be cautious with loop limits.

---

### Traversing Arrays

**Forward Traversal**:

```c
for (int i = 0; i < 5; i++) {
    printf("%d\n", values[i]);
}
```

**Backward Traversal**:

```c
for (int i = 4; i >= 0; i--) {
    printf("%d\n", values[i]);
}
```

## Common Pitfalls
 **Off-by-one errors** — valid indices for `arr[n]` are `0` to `n-1`; accessing `arr[n]` is out of bounds Forgetting to **initialize** all elements — uninitialized local arrays contain garbage values in C Using `<=` instead of `<` in traversal loops — `for (i = 0; i <= n; i++)` accesses one element past the array Reversing traversal direction without adjusting bounds — backward traversal starts at `n-1` and ends at `0` (inclusive)

## Summary

> TL;DR — **1D arrays** are declared as `type name[size]`, zero-indexed (`0` to `size-1`). Initialize with `{}` or a loop. Traverse forward (`i = 0` to `n-1`) or backward (`i = n-1` to `0`). Always guard against out-of-bounds access.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions
1. Which best describes a 1D array?
- **A)** A grid of rows and columns
- **B)** A linear sequence of elements accessed by a single index
- **C)** A structure containing disparate data types
- **D)** A tree-based data structure
2. How do you access the very first element of a 1D array named `list`?
- **A)** `list[1]`
- **B)** `list[first]`
- **C)** `list[0]`
- **D)** `list[-1]`
3. In a 1D array of size N, what is the index of the last element?
- **A)** N
- **B)** N + 1
- **C)** N - 1
- **D)** 0

### Answer Key & Explanations
1. **B)** 1D arrays are the simplest array form, resembling a straight list of variables.
2. **C)** Zero-based indexing means the offset for the very first item is zero.
3. **C)** Since indexing starts at 0, the final slot is one less than the total allocated capacity.

## References & Navigation

- **Previous Topic:** [[Dimensions of Arrays]]
- **Next Topic:** [[Two-Dimensional Arrays (2D Arrays)]]
- **Related Notes:** [[Dimensions of Arrays]], [[Two-Dimensional Arrays (2D Arrays)]]
