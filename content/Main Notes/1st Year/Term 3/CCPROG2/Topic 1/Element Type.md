---
id: Element-Type
type: note
course: CCPROG2
topic: C Programming
status: draft
---

# Element Type

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCPROG2]] #[[C Programming]] #[[Programming]] #[[Computer Science]] #[[Data Structures]] #[[Data Types]] #[[Structured Programming]] #[[Memory Management]]

---

## Overview

> The element type (or base type) of an array determines what kind of data each element can hold.

## Key Concepts
 All elements in a C array must be the same type Element type determines memory per element (`sizeof`) Common types: `int`, `float`, `double`, `char` Can also be `struct` types or pointers

## Details / Theory

### Homogeneous Collection

C arrays are **homogeneous** — every element has the same data type. This is determined at declaration:

```c
int ages[5];       // Element type: int (4 bytes each)
float grades[10];  // Element type: float (4 bytes each)
char name[20];     // Element type: char (1 byte each)
double vals[3];    // Element type: double (8 bytes each)
```

### Effect on Memory

The element type determines the total memory allocated:
 `int arr[10]` → `10 × sizeof(int)` = typically 40 bytes `char arr[10]` → `10 × sizeof(char)` = 10 bytes `double arr[10]` → `10 × sizeof(double)` = typically 80 bytes

### Arrays of Structs

```c
typedef struct {
    char name[50];
    int age;
} Student;

Student class[30];  // Array of 30 Student structs
```

### Arrays of Pointers

```c
char *words[5];  // Array of 5 char pointers (e.g., array of strings)
```

## Common Pitfalls
 Attempting to mix types in a single array — C does not allow this. Forgetting that `sizeof(array)` returns total bytes, not element count.

## Summary

> TL;DR — Element type defines what data each array element holds. All elements must share the same type. It determines the size of each element and total memory allocation.

## Review Questions

_To be added._

## Links
 **Related:** [[Declaration]] — [[Size]] — [[Memory Allocation]] — [[What is an Array]] **Source / Reference:**

## Multiple Choice Questions
1. Why must an array specify an element type during declaration?
    - **A)** To determine how much memory each element will consume
    - **B)** To allow the array to hold different types later
    - **C)** To disable pointer arithmetic
    - **D)** To enforce dynamic typing
2. Can a standard C array hold a mix of `int` and `float` variables?
    - **A)** Yes, by declaring it as a mixed array
    - **B)** No, because C arrays are strictly homogeneous collections
    - **C)** Yes, if the array size is left empty
    - **D)** No, unless they are cast to characters
3. Which of the following determines the total memory allocated for an array?
    - **A)** The element type multiplied by the array size
    - **B)** The dimension alone
    - **C)** The compiler's default padding rule
    - **D)** The first assigned value

### Answer Key & Explanations
1. **A)** The compiler needs the type to compute pointer offsets and allocate exact block sizes.
2. **B)** Homogeneity ensures uniform offset calculations; mixing primitive types isn't allowed.
3. **A)** Memory size equals the total number of items multiplied by the byte footprint of the type.

## References & Navigation

- **Previous Topic:** [[Name]]
- **Next Topic:** [[Dimension]]
- **Related Notes:** [[Characteristics & Attributes]], [[Data Types]]
