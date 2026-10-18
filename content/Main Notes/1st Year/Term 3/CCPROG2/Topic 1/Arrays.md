---
id: Arrays
type: note
course: CCPROG2
topic: C Programming
status: completed
---

# Arrays

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CCPROG2]] #[[C Programming]] #[[Programming]] #[[Computer Science]] #[[Data Structures]] #[[Data Types]] #[[Structured Programming]] #[[Memory Management]]

---

## Overview

>

## Details / Theory

## [[Arrays and Pointers]]

## [[Arrays and Functions]]

## [[Common Array Operations & Considerations]]

## Common Pitfalls

Confusing the **hub note** topics — "Arrays and Pointers" covers memory/decay behavior, "Arrays and Functions" covers parameter passing, and "Common Operations" covers practical usage patterns
Studying arrays without understanding how they relate to **pointers** — pointer-array duality is fundamental to C programming
Skipping **Common Array Operations** — operations like searching, sorting, and element-wise copying are the most exam-tested topics

## Summary

> TL;DR — The **Arrays** topic branches into three sub-areas: **Arrays and Pointers** (decay and pointer arithmetic), **Arrays and Functions** (passing arrays to functions), and **Common Array Operations & Considerations** (searching, sorting, copying, `sizeof` usage).

## Links

**Related:** - [[Arrays and Pointers]] - [[Arrays and Functions]] - [[Common Array Operations & Considerations]]
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

1. **C**. Arrays aggregate multiple identical types sequentially in adjacent memory blocks.
2. **B**. C uses square brackets following the identifier to specify array size.
3. **B**. Once declared, the memory block size for standard arrays cannot dynamically change.

## References & Navigation

- **Previous Topic:** [[What is an Array]]
- **Next Topic:** [[Arrays (1)]]
- **Related Notes:** [[Introduction to Arrays]], [[Arrays (1)]]
