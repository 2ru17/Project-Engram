---
id: Characteristics-&-Attributes
type: note
course: CCPROG2
topic: C Programming
status: completed
---

# Characteristics & Attributes

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCPROG2]] #[[C Programming]] #[[Programming]] #[[Computer Science]] #[[Data Structures]] #[[Data Types]] #[[Structured Programming]] #[[Memory Management]]

---

## Overview

> An array is characterized by four main attributes:

## Key Concepts
 [[Name]] [[Element Type]] [[Size]] [[Dimension]]

## Details / Theory

**An array is characterized by four main attributes:**
 **[[Name]]**: A user-defined identifier used to refer to the array. **[[Element Type]]**: The data type of the elements stored in the array (e.g., `int`, `float`, `char`, `struct`). All elements must be of the same type. **[[Size]]**: The total number of elements the array can hold (a positive integer). **[[Dimension]]**: Specifies whether the array is one-dimensional, two-dimensional, or multi-dimensional.

**Personal Note**: In C, statically allocated arrays must have a size known at compile time.

## Code Example

_To be added._

## Common Pitfalls
 Confusing **size** (number of elements) with **dimension** (1D, 2D, 3D) — a `int arr[5]` has size 5 and dimension 1 Forgetting that **element type** is fixed at declaration — you cannot store mixed types in one array Declaring an array without specifying **size** or initializer — C requires either an explicit size or an initializer list to determine element count Ignoring the **name** as the only handle to the array — losing the name (e.g., through pointer reassignment) means losing access to the data

## Summary

> TL;DR — Every array has four defining attributes: **name** (identifier), **element type** (data type of each element), **size** (number of elements), and **dimension** (1D, 2D, etc.). All four must be determined at declaration.

## Review Questions

_To be added._

## Links
 **Related:** - [[Name]] - [[Element Type]] - [[Size]] - [[Dimension]] **Source / Reference:**

## Multiple Choice Questions
1. What characteristic defines the layout of array elements in memory?
    - **A)** They are fragmented across the heap
    - **B)** They are stored contiguously sequentially
    - **C)** They are distributed in a linked sequence
    - **D)** They overlap each other to save space
2. What attribute specifies the number of items an array can hold?
    - **A)** Element Type
    - **B)** Dimension
    - **C)** Size
    - **D)** Base Address
3. Which attribute determines the kind of data every element in the array must be?
    - **A)** Element Type
    - **B)** Dimension
    - **C)** Scope
    - **D)** Memory Allocator

### Answer Key & Explanations
1. **B)** Elements occupy uninterrupted neighboring memory cells for direct addressing.
2. **C)** The size attribute dictates how many total slots the array provides.
3. **A)** Arrays strictly enforce homogeneity via their defined element type.

## References & Navigation

- **Previous Topic:** [[Arrays (1)]]
- **Next Topic:** [[Name]]
- **Related Notes:** [[Name]], [[Element Type]], [[Dimension]], [[Size]]
