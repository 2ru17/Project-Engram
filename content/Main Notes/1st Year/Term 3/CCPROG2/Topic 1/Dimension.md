---
id: Dimension
type: note
course: CCPROG2
topic: C Programming
status: completed
---

# Dimension

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CCPROG2]] #[[C Programming]] #[[Programming]] #[[Computer Science]] #[[Data Structures]] #[[Data Types]] #[[Structured Programming]] #[[Memory Management]]

---

## Overview

> The dimension of an array refers to the number of indices needed to access an element.

## Key Concepts
 1D arrays: single index — `arr[i]` 2D arrays: two indices — `arr[i][j]` 3D+ arrays: three or more indices Higher dimensions map to contiguous memory in row-major order

## Details / Theory

### One-Dimensional (1D)

A simple list of elements. Access: `arr[i]`.

```c
int arr[5] = {10, 20, 30, 40, 50};
```

### Two-Dimensional (2D)

Think of it as a table (rows × columns). Access: `arr[row][col]`.

```c
int matrix[3][4];  // 3 rows, 4 columns
matrix[0][0] = 1;  // First element
matrix[2][3] = 12; // Last element
```

### Three-Dimensional and Beyond

Used for more complex data (e.g., 3D grids, RGB images).

```c
int cube[2][3][4];  // 2 layers, 3 rows, 4 columns per layer
```

### Memory Layout

All multi-dimensional arrays are stored as contiguous 1D blocks in **row-major order** in C:
 `arr[0][0], arr[0][1], ..., arr[0][n-1], arr[1][0], ...`

## Common Pitfalls
 Confusing row and column order in 2D arrays. Excessive dimensions make code hard to read — rarely need more than 3D.

## Summary

> TL;DR — Array dimension = number of indices needed to access an element. C supports 1D, 2D, 3D, and higher-dimensional arrays, all stored contiguously in row-major order.

## Links
 **Related:** [[One-Dimensional Arrays (1D Arrays)]] — [[Two-Dimensional Arrays (2D Arrays)]] — [[Multidimensional Arrays (3D+)]] — [[Memory Allocation]] **Source / Reference:**

## Multiple Choice Questions

1. What does the term 'dimension' refer to in the context of C arrays?
    - **A)** The physical byte size of the elements
    - **B)** The number of indices required to access a single element
    - **C)** The variable type used for storage
    - **D)** The maximum allowed value for an integer
2. How many dimensions does the array `int grid[10][10];` have?
    - **A)** 1
    - **B)** 2
    - **C)** 10
    - **D)** 100
3. Which of the following best represents a one-dimensional array conceptually?
    - **A)** A grid
    - **B)** A line or list of items
    - **C)** A cube
    - **D)** A single variable

### Answer Key & Explanations

1. **B**. Dimensionality represents the structural depth, matching the count of bracket pairs.
2. **B**. The two sets of brackets specify rows and columns, making it two-dimensional.
3. **B**. A 1D array sequences elements linearly like a simple straight list.

## References & Navigation

- **Previous Topic:** [[Element Type]]
- **Next Topic:** [[Size]]
- **Related Notes:** [[Characteristics & Attributes]], [[Dimensions of Arrays]]
