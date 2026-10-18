---
id: What-is-an-Array
type: note
course: CCPROG2
topic: C Programming
status: completed
---

# What is an Array

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CCPROG2]] #[[C Programming]] #[[Programming]] #[[Computer Science]] #[[Data Structures]] #[[Data Types]] #[[Structured Programming]] #[[Memory Management]]

---

## Overview

> An array is a collection or group of elements of the same data type. It is a homogeneous data structure.

## Details / Theory

An array is a collection or group of elements of the same data type. It is a **homogeneous data structure**.  
It stores a fixed-size sequential collection of elements of the same type.

Think of an array as a set of memory locations, each storing one item of data, all of which are of the same type and can be accessed by the same name.

Arrays are used to store multiple values in a single variable, instead of declaring separate variables for each value.

Array

## Common Pitfalls
 Thinking arrays can hold **mixed types** — arrays are homogeneous; all elements must be the same type Assuming arrays are dynamically sized by default — in C, `int arr[n]` with a variable `n` requires VLA support or `malloc()` Confusing an array with a linked list — arrays provide $O(1)$ random access but $O(n)$ insertion/deletion; linked lists are the opposite Forgetting the **contiguous memory** guarantee — this is what enables $O(1)$ indexed access via base address + offset

## Summary

> TL;DR — An **array** is a homogeneous, fixed-size, sequential collection of same-type elements stored in **contiguous memory** locations, accessed by a single name and zero-based index. It provides $O(1)$ random access but cannot change size after declaration.

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. What defines an array as a data structure in C?
    - **A)** A structure storing random types in non-sequential memory
    - **B)** A derived data type storing a fixed-size sequential collection of elements of the same type
    - **C)** A primitive type for text
    - **D)** A flexible list that resizes automatically
2. Why are arrays considered derived data types?
    - **A)** Because they are inherited from structs
    - **B)** Because they are composed of primary/primitive data types
    - **C)** Because they are imported from a library
    - **D)** Because they do not exist in the C standard
3. Which of the following is NOT an attribute of an array?
    - **A)** Contiguous memory allocation
    - **B)** Homogeneity
    - **C)** Fixed size
    - **D)** Dynamic resizing

### Answer Key & Explanations

1. **B**. The core definition emphasizes rigid size limits, unified element typing, and sequential layout.
2. **B**. They aggregate simpler fundamental forms like `int` or `char` into complex structures.
3. **D**. Standard arrays lack the ability to grow or shrink, requiring manual reallocation for changes.

## References & Navigation

- **Previous Topic:** [[Introduction to Arrays]]
- **Next Topic:** [[Arrays]]
- **Related Notes:** [[Introduction to Arrays]], [[Data Types]]
