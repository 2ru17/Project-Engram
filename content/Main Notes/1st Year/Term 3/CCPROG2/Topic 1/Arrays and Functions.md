---
id: Arrays-and-Functions
type: note
course: CCPROG2
topic: C Programming
status: completed
---

# Arrays and Functions

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCPROG2]] #[[C Programming]] #[[Programming]] #[[Computer Science]] #[[Data Structures]] #[[Data Types]] #[[Structured Programming]] #[[Memory Management]]

---

## Overview

> Only the pointer to the first element is passed.

## Details / Theory

### Passing 1D Arrays

Only the pointer to the first element is passed.

**Function Syntax**:

```c
void myFunction(int arr[], int size); // or int *arr
```

**Example**:

```c
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}
```

**Personal Note**: Always pass the array size to avoid memory errors.

### Passing 2D Arrays

All dimensions except the first must be specified.

**Function Syntax**:

```c
void myFunction(int arr[][COLS], int numRows);
```

**Example**:

```c
#define ROWS 2
#define COLS 3

void print2DArray(int arr[][COLS], int numRows) {
    for (int r = 0; r < numRows; r++) {
        for (int c = 0; c < COLS; c++) {
            printf("%d\t", arr[r][c]);
        }
        printf("\n");
    }
}
```

**Personal Note**: For more flexibility, use pointers or flatten the array.

## Common Pitfalls
 Forgetting that **arrays decay to pointers** when passed to functions — the function receives a pointer, not a copy, so modifications affect the original array Not passing the **size** alongside the array — inside the function, `sizeof(arr)` returns the pointer size, not the array size For 2D arrays, forgetting to specify **all dimensions except the first** in the function parameter (e.g., `void f(int arr[][COLS], int rows)`) Assuming `sizeof(arr)/sizeof(arr[0])` works inside functions — it only works in the scope where the array was declared

## Summary

> TL;DR — Pass 1D arrays as `type *arr` (or `type arr[]`) plus a `size` parameter. For 2D arrays, specify all dimensions except the first: `type arr[][COLS]`. Arrays decay to pointers, so the function modifies the original data. Always pass size explicitly.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. What is passed to a function when a 1D array is provided as an argument in C?
    - **A)** A deep copy of the array
    - **B)** A pointer to the first element
    - **C)** The exact size of the array
    - **D)** The last element of the array

2. How should you properly declare a function that takes a 1D array as a parameter?
    - **A)** `void func(int arr);`
    - **B)** `void func(int arr[], int size);`
    - **C)** `void func(int *arr[]);`
    - **D)** `void func(int arr[100]);`

3. What happens if a function modifies an array passed to it as an argument?
    - **A)** The modifications affect a local copy only
    - **B)** The compiler throws a warning
    - **C)** The original array is modified
    - **D)** The program crashes

4. When passing a 2D array to a function, which dimensions must be specified in the parameter?
    - **A)** Only the first dimension
    - **B)** All dimensions except the first
    - **C)** No dimensions need to be specified
    - **D)** All dimensions must be explicitly specified

5. Why is it necessary to pass the size of an array alongside it to a function?
    - **A)** To avoid memory errors, since arrays decay to pointers
    - **B)** Because the C standard library requires it for compilation
    - **C)** To allocate more memory inside the function
    - **D)** To enable the use of the `sizeof` operator

6. What will `sizeof(arr)` return inside a function where `arr` is passed as an array parameter?
    - **A)** The total size of the array in bytes
    - **B)** The number of elements in the array
    - **C)** The size of the pointer pointing to the array
    - **D)** Zero

7. Which of the following is a valid function parameter declaration for a 2D array?
    - **A)** `void f(int arr[][]);`
    - **B)** `void f(int arr[][COLS], int numRows);`
    - **C)** `void f(int **arr);`
    - **D)** `void f(int arr, int rows, int cols);`

8. Why does `sizeof(arr)/sizeof(arr[0])` fail to find the array length inside a function?
    - **A)** It only works in the scope where the array was originally declared
    - **B)** It causes a division by zero error
    - **C)** The array elements are nullified during the function call
    - **D)** The macro expands incorrectly

9. Which syntax allows for more flexibility when dealing with 2D arrays in functions?
    - **A)** Using pointers or flattening the array
    - **B)** Hardcoding all dimensions
    - **C)** Passing the array by value
    - **D)** Ignoring column sizes

10. What is a key reason that passing an array does not create a copy?
    - **A)** Arrays natively decay to pointers to improve efficiency and save memory
    - **B)** Compilers cannot copy contiguous memory
    - **C)** C lacks an assignment operator
    - **D)** It allows the array to be dynamically resized

### Answer Key & Explanations
1. **B)** Passing arrays simply passes a pointer rather than duplicating large data structures.
2. **B)** It is best practice to pass the pointer via `[]` alongside a distinct size parameter.
3. **C)** Because functions operate on the original memory pointer, alterations impact the original data.
4. **B)** The compiler needs later dimension sizes to properly calculate memory offset locations.
5. **A)** Functions cannot deduce bounds natively due to pointer decay, so sizes prevent dangerous memory faults.
6. **C)** Once decayed to a pointer, `sizeof` evaluates the pointer's byte footprint, not the original array's length.
7. **B)** Parameter lists mandate defining columns when dealing with bi-dimensional mappings.
8. **A)** The macro computes bounds successfully only when the original statically allocated scope applies.
9. **A)** Bypassing strict array matrix types by pointing directly simplifies operations in dynamic contexts.
10. **A)** Eliminating array copies significantly slashes memory usage and function invocation processing times.

## References & Navigation

- **Previous Topic:** [[Multidimensional Arrays (3D+)]]
- **Next Topic:** [[Arrays and Pointers]]
- **Related Notes:** [[Functions and Programs]], [[Subprograms]]
