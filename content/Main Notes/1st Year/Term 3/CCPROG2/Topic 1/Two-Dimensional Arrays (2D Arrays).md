---
id: Two-Dimensional-Arrays-(2D-Arrays)
type: note
course: CCPROG2
topic: C Programming
status: completed
---

# Two-Dimensional Arrays (2D Arrays)

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCPROG2]] #[[C Programming]] #[[Programming]] #[[Computer Science]] #[[Data Structures]] #[[Data Types]] #[[Structured Programming]] #[[Memory Management]]

---

## Overview

> A 2D array is a table (matrix) consisting of rows and columns.

## Details / Theory

### Definition

A 2D array is a table (matrix) consisting of rows and columns.

### Declaration

**Syntax**:

```c
dataType arrayName[rows][columns];
```

**Examples**:

```c
int matrix[3][4];
char ticTacToe[3][3];
```

### Initialization

**Syntax**:

```c
int table[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};
```

Partial initialization:

```c
int data[3][2] = {
    {10, 20},
    {30}
};
```

Without inner braces:

```c
int values[2][2] = {11, 22, 33, 44};
```

### Accessing Elements

**Syntax**:

```c
arrayName[row][column]
```

**Example**:

```c
int val = mat[1][2]; // Accesses value 6
```

### Memory Layout (Row-Major Order)

In C, 2D arrays are stored row by row.

**Personal Note**: Row-major order affects performance and interoperability.

### Traversing 2D Arrays

**Example**:

```c
#define ROWS 2
#define COLS 3

int myMatrix[ROWS][COLS] = {{1,2,3}, {7,8,9}};

for (int r = 0; r < ROWS; r++) {
    for (int c = 0; c < COLS; c++) {
        printf("myMatrix[%d][%d] = %d\n", r, c, myMatrix[r][c]);
    }
}
```

## Common Pitfalls
 Confusing **row-major** order — in C, `arr[i][j]` stores row `i` contiguously, so `arr[0][0], arr[0][1], ..., arr[0][COLS-1], arr[1][0], ...` Forgetting **inner braces** during initialization — `int arr[2][3] = {{1,2,3},{4,5,6}}` is clearer and less error-prone than a flat list Swapping **row and column** indices — `arr[row][col]`, not `arr[col][row]` Using a single loop to traverse a 2D array — always use **nested loops** (outer for rows, inner for columns) Passing to functions without specifying the **column dimension** — `void f(int arr[][COLS], int rows)` is required

## Summary

> TL;DR — **2D arrays** are declared as `type name[ROWS][COLS]`, stored in **row-major** order. Initialize with nested braces. Access via `arr[row][col]`. Traverse with nested loops. When passing to functions, always specify the column dimension.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions
1. How is a two-dimensional array typically conceptualized?
- **A)** As a line of points
- **B)** As a 3D cube
- **C)** As a table with rows and columns
- **D)** As a linked list
2. In the declaration `int matrix[4][5];`, how many total elements can the array hold?
- **A)** 9
- **B)** 20
- **C)** 4
- **D)** 5
3. What is the correct way to initialize a 2D array?
- **A)** `int arr[2][2] = {1, 2, 3, 4};`
- **B)** `int arr[2][2] = {{1, 2}, {3, 4}};`
- **C)** Both A and B are valid
- **D)** `int arr[2][2] = (1, 2) (3, 4);`

### Answer Key & Explanations
1. **C)** The dual indices naturally map to horizontal rows and vertical columns creating a grid.
2. **B)** Multiplying the row count (4) by the column count (5) gives the total capacity (20).
3. **C)** C accepts both flattened sequential lists and nested bracket groupings for matrix initialization.

## References & Navigation

- **Previous Topic:** [[One-Dimensional Arrays (1D Arrays)]]
- **Next Topic:** [[Multidimensional Arrays (3D+)]]
- **Related Notes:** [[Dimensions of Arrays]], [[Multidimensional Arrays (3D+)]]
