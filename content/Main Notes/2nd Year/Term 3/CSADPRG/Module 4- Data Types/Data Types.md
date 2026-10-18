---
id: 4_data_types
type: note
course: CSADPRG
topic: "4 - Data Types"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSADPRG]] #[[Conceptual]] #[[Data Types]]

## Overview
This document provides a comprehensive overview of data types in programming languages, detailing how types determine the range of values and allowable operations. It covers primitive data types, string types, enumerations, structured data types (arrays, lists, records, tuples, unions), and pointer/reference types. Additionally, it discusses type systems, type checking, descriptors, and type equivalence.

## Key Definitions
- **Type**: Determines the range of values that can be stored and the set of operations for those values. Data types serve as abstractions of real-world objects.
- **Identifier vs Variable**: Identifiers are merely the names of variables, whereas variables are the entities that actually have types.
- **Abstract Data Types (ADT)**: Hides the inner design of how a type works from the user. Users only need to know the characteristics and behavior at the concept level, not the underlying mechanism.
- **Type System**: A set of rules in a programming language that associates properties to types. It is useful for error detection (type checking), modularization, and documentation.
- **Descriptor**: A collection of the attributes of a variable. In implementation, it is an area in memory that stores these attributes (static attributes during compilation, dynamic attributes during runtime).
- **Type Error**: The application of an operator to an operand of an inappropriate type.
- **Strongly Typed Language**: A language where type errors are always detected, requiring all types of entities to be determined at compile or run time.
- **Type Equivalence**: Determines if two variables are of the same type.
    - *Name Equivalence*: Variables have the same declaration or use the same type name.
    - *Structure Type Equivalence*: Variables have identical structures (more flexible but harder to implement).
- **Coercion**: The implicit conversion of a type by compiler-generated code to a legal type.

## Theoretical Framework / Concepts

### Primitive Data Types
Primitive types are not defined in terms of other data types and map closely to hardware.
- **Integers**: Represented as a string of bits, can be signed or unsigned (usually using two's complement for negatives).
- **Floating Point**: Models real numbers as approximations (e.g., $e$ or $\pi$ cannot be precisely represented). Most utilize the IEEE Floating-Point Standard 754.
- **Decimals**: Stores a fixed number of decimal digits using Binary Coded Decimals (BCD). Excellent for accuracy in business/money applications but wastes memory and has a limited range.
- **Boolean**: Simplest type representing switches or flags (true or false).
- **Character**: Stored as numeric codings, traditionally ASCII (8-bit) and modernly Unicode (UCS-2, UTF-32).

### Character String Types
Strings consist of a sequence of characters. Design considerations involve whether they are primitive types or character arrays, and whether their length is static, limited dynamic, or dynamic.
- **Lengths**:
    - *Static*: Length is constant (e.g., Python, Java).
    - *Limited Dynamic*: Varies up to a defined limit (e.g., C/C++).
    - *Dynamic*: Varies with no maximum value, providing maximum flexibility at the cost of overhead (e.g., JavaScript).

### Enumeration Types
Provides a way of defining and grouping all possible values in a collection as named constants. They aid in readability and, in some languages, reliability by restricting arithmetic operations and out-of-bounds assignments.

### Structured Data Types
Collections of data items grouped under a single identifier.
- **Arrays**: Aggregate of homogeneous data elements identified by position (index). Subscripts map to elements. They can be implemented with various storage allocations (Static, Fixed Stack-Dynamic, Fixed Heap-Dynamic, Heap-Dynamic). Arrays are stored in memory using descriptors and accessed via row-major or column-major order.
- **Records**: Possibly heterogeneous aggregate of data elements identified by names (fields), designed to model collections of varying types/sizes. Fields are stored in adjacent memory.
- **Tuples**: Similar to a record, but elements are unnamed and accessed by index.
- **Lists**: Heavily used in functional programming and script languages. Python uses lists as the standard implementation of arrays, supporting operations like list comprehensions.
- **Union Types**: A variable allowed to store different type values at different times in the same memory space. Can be *Discriminated* (type checked) or *Free* (no type checking, generally unsafe).

### Pointer and Reference Types
Pointers range over memory addresses and a special `nil` value, providing the power of indirect addressing and dynamic memory management in the heap.
- **Pointer Problems**:
    - *Dangling Pointers*: Pointing to a heap-dynamic variable that has been deallocated.
    - *Memory Leakage*: Losing all pointers to a heap-dynamic variable (creating garbage).
- **Pointer Implementation (Heap Management)**:
    - *Tombstones*: Extra cells pointing to the variable; set to nil upon deallocation to prevent dangling pointers.
    - *Locks-and-keys*: Pointers represented as (key, address) pairs to ensure safe dereferencing.
    - *Garbage Collection*: Complex run-time processes like Reference Counters (eager) or Mark-Sweep (lazy) to reclaim inaccessible heap memory.

## Examples

### Struct vs Union
```c
// Struct: fields are separate, taking up distinct memory space
struct struct_example {
    int integer;
    float decimal;
    char name[20];
};

// Union: fields share the same memory space
union union_example {
    int integer;
    float decimal;
    char name[20];
};
```
*Note*: Modifying one field in a union will overwrite the data of other fields.

### Array Slicing
Python allows substructures of an array to be referenced via slices:
```python
Vector = [2, 4, 6, 8, 10, 12, 14, 16]
Sample = Vector[3:6]
# Sample is [8, 10, 12]
```

### List Comprehensions
Applying functions/filters directly to lists in Python:
```python
[x * x for x in range(10) if x % 3 == 0]
# Outputs: [0, 9, 36, 81]
```

### Pointers
C++ explicit dereferencing:
```cpp
j = *ptr; // Sets j to the value located at the address ptr
```

## Multiple Choice Questions

1. What is the main purpose of an Abstract Data Type (ADT)?
    - **A)** To map primitive data types directly to hardware
    - **B)** To define properties of type systems
    - **C)** To hide the inner design of how a type works from the user
    - **D)** To track dynamic attributes during runtime

2. Which type of equivalence determines if two variables are of the same type by checking if they have identical structures?
    - **A)** Name Equivalence
    - **B)** Structure Type Equivalence
    - **C)** Coercion Equivalence
    - **D)** Abstract Equivalence

3. What does a Descriptor do?
    - **A)** Converts a type implicitly by compiler-generated code
    - **B)** Models real numbers as approximations
    - **C)** Provides maximum flexibility at the cost of overhead
    - **D)** Stores a collection of the attributes of a variable in memory

4. Which of the following is true about floating-point data types?
    - **A)** They model real numbers as approximations and most utilize the IEEE 754 Standard.
    - **B)** They store a fixed number of decimal digits using Binary Coded Decimals (BCD).
    - **C)** They are the simplest type representing switches or flags.
    - **D)** They are heavily used in functional programming and script languages.

5. What is Coercion in programming languages?
    - **A)** The explicit casting of pointers
    - **B)** The application of an operator to an operand of an inappropriate type
    - **C)** The implicit conversion of a type by compiler-generated code to a legal type
    - **D)** A set of rules that associates properties to types

6. In the context of structured data types, what is the primary difference between a struct and a union in C?
    - **A)** Struct fields share the same memory space, while union fields do not.
    - **B)** Union fields share the same memory space, while struct fields take up distinct memory space.
    - **C)** Structs can only hold primitive types, while unions can hold objects.
    - **D)** Unions require garbage collection, while structs do not.

7. What is a Dangling Pointer?
    - **A)** A pointer that has been successfully deallocated.
    - **B)** A pointer that points to a heap-dynamic variable that has been deallocated.
    - **C)** A pointer that has lost all references, creating garbage.
    - **D)** A pointer that points to a specific memory cell called a tombstone.

8. Which string length design varies with no maximum value, providing maximum flexibility at the cost of overhead?
    - **A)** Static
    - **B)** Limited Dynamic
    - **C)** Discriminated Dynamic
    - **D)** Dynamic

9. What is the purpose of Tombstones in pointer implementation?
    - **A)** To eagerly reclaim inaccessible heap memory using reference counters.
    - **B)** To prevent dangling pointers by setting extra cells pointing to the variable to nil upon deallocation.
    - **C)** To store fields in adjacent memory for heterogeneous aggregates.
    - **D)** To ensure safe dereferencing using (key, address) pairs.

10. Which data structure is described as a possibly heterogeneous aggregate of data elements identified by names (fields)?
    - **A)** Array
    - **B)** Tuple
    - **C)** Record
    - **D)** List

### Answer Key & Explanations

1. **C**. ADTs hide the inner workings of how a type works from the user, allowing users to only interact with the characteristics and behavior at the concept level.
2. **B**. Structure Type Equivalence determines if two variables are of the same type by checking if they have identical structures, which is more flexible but harder to implement.
3. **D**. A Descriptor is an area in memory that stores a collection of the attributes of a variable (such as static attributes during compilation or dynamic attributes during runtime).
4. **A**. Floating-point types model real numbers as approximations, and most use the IEEE Floating-Point Standard 754.
5. **C**. Coercion is the implicit conversion of a type by compiler-generated code to a legal type.
6. **B**. In a union, all fields share the same memory space (modifying one overwrites others), whereas a struct allocates distinct memory space for each field.
7. **B**. A dangling pointer occurs when a pointer points to a heap-dynamic variable that has already been deallocated.
8. **D**. Dynamic string lengths vary with no maximum value, offering maximum flexibility at the cost of overhead.
9. **B**. Tombstones are extra cells that point to the variable and are set to nil upon deallocation to prevent dangling pointers.
10. **C**. A record is a possibly heterogeneous aggregate of data elements identified by names (fields) designed to model collections of varying types and sizes.

## References & Navigation

- **Previous Topic:** [[Names, Variables, Binding, Scope]]
- **Next Topic:** [[Expressions and Assignment Statements]]
- **Related Notes:** [[Names, Variables, Binding, Scope]], [[Data Structures]]
