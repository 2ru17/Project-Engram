---
id: Traversing-Arrays
type: note
course: CCPROG2
topic: C Programming
status: completed
---

# Traversing Arrays

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CCPROG2]] #[[C Programming]] #[[Programming]] #[[Computer Science]] #[[Data Structures]] #[[Data Types]] #[[Algorithms]] #[[Structured Programming]] #[[Memory Management]]

---

## Overview

> Traversing an array means visiting each element sequentially, typically using a loop.

## Key Concepts
 `for` loop is the most common traversal method `while` and `do-while` can also traverse arrays Pointer arithmetic provides an alternative traversal 2D arrays require nested loops

## Details / Theory

### For Loop Traversal

```c
int arr[5] = {10, 20, 30, 40, 50};
for (int i = 0; i < 5; i++) {
    printf("%d ", arr[i]);
}
// Output: 10 20 30 40 50
```

### Pointer-Based Traversal

```c
int arr[5] = {10, 20, 30, 40, 50};
int *p = arr;
for (int i = 0; i < 5; i++) {
    printf("%d ", *(p + i));
}
```

### Traversal for Aggregation

```c
int arr[5] = {10, 20, 30, 40, 50};
int sum = 0;
for (int i = 0; i < 5; i++) {
    sum += arr[i];
}
printf("Sum: %d\n", sum);  // Sum: 150
```

### 2D Array Traversal

```c
int matrix[3][4];
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 4; j++) {
        printf("%d ", matrix[i][j]);
    }
    printf("\n");
}
```

### Common Traversal Patterns

| Pattern           | Description                                |
| ----------------- | ------------------------------------------ |
| Linear scan       | Visit every element once                   |
| Reverse traversal | `for (i = n-1; i >= 0; i--)`               |
| Conditional skip  | Process only elements matching a condition |
| Search            | Stop when target found                     |

## Common Pitfalls
 Off-by-one errors: using `<=` instead of `<` in the loop condition. Forgetting to pass array size to functions — cannot compute it from a pointer. Modifying the loop variable inside the loop body.

## Summary

> TL;DR — Array traversal visits each element using loops or pointer arithmetic. `for` loops are most common. 2D arrays need nested loops. Always respect bounds to avoid undefined behavior.

## Links
 **Related:** [[Accessing Elements]] — [[Size]] — [[Arrays and Pointers]] — [[One-Dimensional Arrays (1D Arrays)]] — [[Two-Dimensional Arrays (2D Arrays)]] **Source / Reference:**

## Multiple Choice Questions

1. Which of the following best describes an array in C?
    - **A)** A dynamic structure that resizes automatically
    - **B)** A collection of variables of different types
    - **C)** A contiguous block of memory holding elements of the same type
    - **D)** A sequence of distinct nodes linked via pointers
2. Which syntax represents a valid 1D array declaration?
    - **A)** `int array(10);`
    - **B)** `int array[10];`
    - **C)** `array<int> 10;`
    - **D)** `int[10] array;`
3. What is a key limitation of arrays in standard C?
    - **A)** They cannot hold floating-point numbers
    - **B)** Their size is fixed upon declaration
    - **C)** They do not allow random access
    - **D)** They cannot be passed to functions

### Answer Key & Explanations

1. **C**. Arrays aggregate multiple identical types sequentially in adjacent memory blocks.
2. **B**. C uses square brackets following the identifier to specify array size.
3. **B**. Once declared, the memory block size for standard arrays cannot dynamically change.

## References & Navigation

- **Previous Topic:** [[Accessing Elements]]
- **Next Topic:** [[Common Array Operations & Considerations]]
- **Related Notes:** [[Accessing Elements]], [[Iterative Statements in C]]
