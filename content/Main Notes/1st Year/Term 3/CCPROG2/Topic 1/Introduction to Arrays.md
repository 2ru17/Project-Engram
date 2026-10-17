---
id: Introduction-to-Arrays
type: note
course: CCPROG2
topic: C Programming
status: completed
---

# Introduction to Arrays

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCPROG2]] #[[C Programming]] #[[Programming]] #[[Computer Science]] #[[Data Structures]] #[[Data Types]] #[[Structured Programming]] #[[Memory Management]]

---

## Overview

>

## Details / Theory

### [[What is an Array]]

### [[Characteristics & Attributes]]

### [[Memory Allocation]]

## Code Example

_To be added._

## Common Pitfalls

Skipping the fundamentals — understanding **what an array is**, its **characteristics**, and **memory layout** is essential before tackling operations or pointer relationships
Confusing static allocation with dynamic allocation — `int arr[5]` is stack-allocated (fixed size), while `malloc(5 * sizeof(int))` is heap-allocated (resizable with `realloc`)
Overlooking that arrays are **zero-indexed** in C — valid indices for `arr[n]` are `0` to `n-1`

## Summary

> TL;DR — This introduction covers the three foundational sub-topics: **What is an Array** (definition and purpose), **Characteristics & Attributes** (name, element type, size, dimension), and **Memory Allocation** (contiguous, static vs. dynamic).

## Review Questions

_To be added._

## Links

**Related:** - [[What is an Array]] - [[Characteristics & Attributes]] - [[Memory Allocation]]
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

- **Next Topic:** [[What is an Array]]
- **Related Notes:** [[What is an Array]], [[Arrays]]
