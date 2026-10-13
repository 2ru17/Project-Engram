---
id: Size
type: note
course: CCPROG2
topic: C Programming
status: draft
---

# Size

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCPROG2]] #[[C Programming]] #[[Programming]] #[[Computer Science]] #[[Data Structures]] #[[Data Types]] #[[Structured Programming]] #[[Memory Management]]

---

## Overview

> The size of an array is the number of elements it can hold, determined at declaration and fixed for the array’s lifetime.

## Key Concepts
 Array size must be a positive integer constant (before C99) C99+ allows Variable-Length Arrays (VLAs) with runtime size `sizeof(arr) / sizeof(arr[0])` gives the element count There is no built-in bounds checking

## Details / Theory

### Compile-Time Size

```c
#define N 100
int arr[N];       // Size = 100 (constant expression)
int arr2[5];      // Size = 5 (literal)
```

### Computing Size at Runtime

```c
int arr[10];
int count = sizeof(arr) / sizeof(arr[0]);  // count = 10
```

> This only works when `arr` is a true array, not a pointer.

### Variable-Length Arrays (VLAs — C99)

```c
int n;
scanf("%d", &n);
int arr[n];  // Size determined at runtime
```

VLAs are allocated on the stack and cannot be initialized with `{...}`.

### Size and Memory

Total memory = `size × sizeof(element_type)`:

| Declaration      | Elements | Total Bytes (typical) |
| ---------------- | -------- | --------------------- |
| `int arr[10]`    | 10       | 40                    |
| `char str[20]`   | 20       | 20                    |
| `double vals[5]` | 5        | 40                    |

### Size in Functions

When an array is passed to a function, it **decays to a pointer**, so `sizeof` no longer works. Always pass the size as a separate parameter:

```c
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++)
        printf("%d ", arr[i]);
}
```

## Common Pitfalls
 Using `sizeof(arr)` on a function parameter — gives pointer size, not array size. Off-by-one: accessing `arr[size]` when valid indices are `0` to `size - 1`. Forgetting that VLAs cannot be initialized with `{...}`.

## Summary

> TL;DR — Array size is the number of elements, fixed at declaration. Use `sizeof(arr)/sizeof(arr[0])` for element count. Always pass size separately to functions since arrays decay to pointers.

## Review Questions

_To be added._

## Links
 **Related:** [[Declaration]] — [[Element Type]] — [[Accessing Elements]] — [[Name]] — [[Arrays and Functions]] **Source / Reference:**

## Multiple Choice Questions
1. Which operator can be used to determine the total memory size in bytes occupied by an array?
    - **A)** `lengthof`
    - **B)** `sizeof`
    - **C)** `count`
    - **D)** `size`
2. How can you calculate the number of elements in a locally declared array `arr`?
    - **A)** `sizeof(arr) * sizeof(arr[0])`
    - **B)** `sizeof(arr) / sizeof(arr[0])`
    - **C)** `arr.length`
    - **D)** `count(arr)`
3. What is a strict requirement regarding the size of a standard array during its declaration in C89?
    - **A)** It must be a floating-point number
    - **B)** It must be evaluated dynamically at runtime
    - **C)** It must be a positive integer constant expression
    - **D)** It must be a negative number

### Answer Key & Explanations
1. **B)** The `sizeof` operator natively evaluates the memory footprint of objects during compilation.
2. **B)** Dividing the entire array's byte size by the byte size of a single element yields the item count.
3. **C)** Older C standards mandate sizes be known strictly at compile-time via constants.

## References & Navigation

- **Previous Topic:** [[Dimension]]
- **Next Topic:** [[Declaration]]
- **Related Notes:** [[Characteristics & Attributes]], [[Memory Allocation]]
