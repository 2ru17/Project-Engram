---
id: Dimensions-of-Arrays
type: note
course: CCPROG2
topic: C Programming
status: completed
---

# Dimensions of Arrays

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCPROG2]] #[[C Programming]] #[[Programming]] #[[Computer Science]] #[[Data Structures]] #[[Data Types]] #[[Structured Programming]] #[[Memory Management]]

---

## Overview

>

## Details / Theory

### [[One-Dimensional Arrays (1D Arrays)]]

### [[Two-Dimensional Arrays (2D Arrays)]]

### [[Multidimensional Arrays (3D+)]]

## Code Example

_To be added._

## Common Pitfalls

Confusing **dimension** with **size** — dimension is the number of indices needed (1D, 2D, 3D), size is the total number of elements
Assuming all dimensions have the same number of elements — a 2D array can be `int arr[3][5]` (3 rows, 5 columns)
Using multidimensional arrays when a 1D array with index math would suffice — higher dimensions increase complexity and memory overhead

## Summary

> TL;DR — Arrays can be **1D** (single index), **2D** (row × column, stored in row-major order), or **multidimensional (3D+)**. Dimension = number of indices required to access an element. Choose the smallest dimension that models your data naturally.

## Review Questions

_To be added._

## Links

**Related:** - [[One-Dimensional Arrays (1D Arrays)]] - [[Two-Dimensional Arrays (2D Arrays)]] - [[Multidimensional Arrays (3D+)]]
**Source / Reference:**

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
1. **C)** Arrays aggregate multiple identical types sequentially in adjacent memory blocks.
2. **B)** C uses square brackets following the identifier to specify array size.
3. **B)** Once declared, the memory block size for standard arrays cannot dynamically change.

## References & Navigation

- **Previous Topic:** [[Common Array Operations & Considerations]]
- **Next Topic:** [[One-Dimensional Arrays (1D Arrays)]]
- **Related Notes:** [[One-Dimensional Arrays (1D Arrays)]], [[Two-Dimensional Arrays (2D Arrays)]]
