---
id: 3_names_variables_binding_scope
type: note
course: CSADPRG
topic: "3 - Names, Variables, Binding, Scope"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSADPRG]] #[[Conceptual]] #[[Names, Variables, Binding, Scope]]

## Overview
This document discusses the fundamental concepts of names, variables, binding, and scoping in programming languages. It explains the distinction between names, reserved words, and keywords, explores the attributes of variables (such as name, address, type, value, lifetime, and scope), and distinguishes between static and dynamic bindings as well as static and dynamic scoping mechanisms.

## Key Definitions
- **Name (Identifier)**: A string of characters that identifies an entity (e.g., variables, functions, parameters, expressions).
- **Keyword**: A special word that has special meaning in a certain context (e.g., `goto` in Java).
- **Reserved Word**: A special word that cannot be redefined or used as an identifier by the programmer.
- **Variable**: An abstraction of a computer memory cell or a collection of cells. It has attributes such as Name, Address, Type, Value, Lifetime, and Scope.
- **Address (L-value)**: The physical machine memory location associated with a variable. Multiple variables sharing the same address create an effect known as aliasing.
- **Type**: Determines the range of values a variable can store and the set of operations that can be performed on it.
- **Value (R-value)**: The actual contents of the memory cell.
- **Binding**: An association between an attribute and an entity (e.g., between a variable and its type, or an operation and its symbol).
- **Scope**: The spatial range of statements wherein a variable is visible and can be referenced.
- **Lifetime**: The temporal duration during which a variable is bound to a specific memory location.
- **Referencing Environment**: The collection of all variables that are visible within a specific statement.

## Theoretical Framework / Concepts

### Binding Times
Binding occurs at different stages depending on the language design and implementation:
- **Language Design Time**: Examples include binding operator symbols to operations (`*` for multiplication) or defining reserved words.
- **Language Implementation Time**: Example includes the range of values for a primitive type being defined by the specific compiler implementation.
- **Compile Time**: Types of variables and their names are typically bound during compilation for statically typed languages.
- **Link Time**: Resolving external functions across different compilation units or libraries (e.g., `printf` in C).
- **Load Time**: Binding static variables to absolute memory cells via the OS loader.
- **Run Time**: Binding of non-static variables to memory cells, or binding data types to variables in dynamically typed languages.

### Variable Type Bindings
- **Static Type Binding**: Occurs before runtime and remains unchanged during execution. Types can be specified through explicit declarations (e.g., `int x = 1;`) or implicit declarations via naming conventions or context-based type inference (e.g., `var num = 1;`).
- **Dynamic Type Binding**: The type is not specified by a declaration but bound during assignment at runtime. It provides flexibility for generic programming but can lead to less reliable code (loss of compiler error detection) and comes with a runtime cost for type checking and dynamic storage allocation.

### Storage Bindings and Lifetime
- **Static Variables**: Bound to memory cells before execution and remain bound until the end of execution. They are highly efficient but lack flexibility (cannot support recursion) and do not share storage spaces.
- **Stack-dynamic Variables**: Bound to memory from the run-time stack when execution reaches their declaration (elaboration). They support recursion and conserve storage by sharing memory space across subprograms, but incur runtime overhead for allocation/deallocation.
- **Explicit Heap-dynamic Variables**: Nameless variables allocated and deallocated explicitly by the programmer during runtime (e.g., via `malloc` or `new`). They are useful for complex data structures like linked lists but are difficult to manage properly.
- **Implicit Heap-dynamic Variables**: Bound to heap storage automatically only when assigned values. They offer the highest degree of flexibility but have significant runtime overhead and loss of compile-time error detection.

### Organization of Run-time Memory
- **Code & Global/Static Data**: Reside in fixed memory addresses.
- **Stack**: Highly organized memory closely managed by the CPU used for temporary variables and function calls.
- **Heap**: Disorganized, dynamically allocated memory that is not tightly managed by the CPU directly.

### Scoping
- **Static Scoping (Lexical Scoping)**: A variable's scope can be determined prior to execution just by examining the source code structure. It resolves variables to their nearest enclosing lexical scope. Variable hiding occurs when a local variable shares the same name as a variable in an outer scope. 
- **Dynamic Scoping**: Scope is determined at runtime based on the dynamic calling sequence of subprograms. It allows subprograms to easily access their caller's local variables without passing parameters but significantly harms readability, prevents static type checking for non-local variables, and degrades performance.

### Named Constants
A variable that is bound to a value exactly once. They improve readability, aid maintenance (serving as a single source of truth), and help parameterize programs by replacing "magic numbers" with descriptive names.

## Examples

### Edge Cases in Identifiers
- **Fortran Special Words**: Fortran has no reserved words, meaning statements like `IF (IF.EQ.THEN) IF=IF*THEN` are technically valid.

### Dynamic Type Binding in Python
```python
list = [1, 2.71, 3.14]
list = "characters" # Type dynamically changes at runtime based on the r-value
```

### Static vs Dynamic Scoping Walkthrough
```javascript
function big() {
    function sub1() {
        var x = 7;
        sub2();
    }
    
    function sub2() {
        console.log(x);
    }
    
    var x = 3;
    sub1();
}
```
- In a **statically scoped** language, the call to `sub2()` resolves `x` to `3` (searching from `sub2` outwards to `big`).
- In a **dynamically scoped** language, the call to `sub2()` resolves `x` to `7` (searching the call stack: `sub2`'s caller is `sub1`, which has `x=7`).

### Variable Hiding and Scope Resolution in C++
```cpp
#include <iostream>
using namespace std;

int x = 2; // Global x

int main() {
    int x = 3; // Local x hides global x
    
    cout << x;   // Output: 3
    cout << ::x; // Output: 2 (Using scope resolution operator to explicitly reference global x)
    
    return 0;
}
```

## Multiple Choice Questions

**1. What is a "Keyword" in the context of programming languages?**
- **A)** A string of characters that identifies an entity.
- **B)** A special word that cannot be redefined or used as an identifier by the programmer.
- **C)** A special word that has special meaning in a certain context.
- **D)** An abstraction of a computer memory cell.

**2. Which variable attribute represents the physical machine memory location?**
- **A)** Type
- **B)** L-value
- **C)** R-value
- **D)** Lifetime

**3. When does binding occur for the range of values for a primitive type in many compiled languages?**
- **A)** Language Design Time
- **B)** Language Implementation Time
- **C)** Compile Time
- **D)** Run Time

**4. What is a primary disadvantage of dynamic type binding?**
- **A)** It lacks flexibility for generic programming.
- **B)** It requires the use of explicit declarations for types.
- **C)** It incurs a runtime cost for type checking and dynamic storage allocation.
- **D)** It prevents the use of recursive functions.

**5. Which category of variables is bound to memory from the run-time stack when execution reaches their declaration?**
- **A)** Static Variables
- **B)** Stack-dynamic Variables
- **C)** Explicit Heap-dynamic Variables
- **D)** Implicit Heap-dynamic Variables

**6. What does the "Scope" of a variable refer to?**
- **A)** The temporal duration during which it is bound to a memory location.
- **B)** The actual contents of its memory cell.
- **C)** The set of operations that can be performed on it.
- **D)** The spatial range of statements wherein it is visible and can be referenced.

**7. In static (lexical) scoping, how is a variable's scope determined?**
- **A)** Based on the dynamic calling sequence of subprograms at runtime.
- **B)** By examining the source code structure prior to execution.
- **C)** By the OS loader assigning absolute memory cells.
- **D)** Through the explicit use of pointers and reference types.

**8. Which memory area is described as disorganized and dynamically allocated, not tightly managed directly by the CPU?**
- **A)** Code Data
- **B)** Global/Static Data
- **C)** Stack
- **D)** Heap

**9. What happens when two variables share the same memory address?**
- **A)** Scope resolution
- **B)** Variable hiding
- **C)** Aliasing
- **D)** Stack-dynamic allocation

**10. Based on the provided example, what is a feature of Fortran regarding identifiers?**
- **A)** It strictly enforces variable hiding.
- **B)** It has no reserved words.
- **C)** It uses implicit heap-dynamic variables.
- **D)** It prevents variables from dynamically changing type.

### Answer Key & Explanations

1. **C** - A keyword is defined as a special word that has special meaning in a certain context, differentiating it from reserved words which cannot be redefined.
2. **B** - The Address is referred to as the L-value, indicating the physical machine memory location associated with a variable.
3. **B** - The specific compiler implementation defines the range of values for primitive types at Language Implementation Time.
4. **C** - Dynamic type binding requires runtime type checking and dynamic storage allocation, which introduces overhead and potential loss of compile-time error detection.
5. **B** - Stack-dynamic variables are allocated on the run-time stack upon their declaration, supporting features like recursion.
6. **D** - Scope is defined as the spatial range of statements within the source code where a given variable is visible and can be referenced.
7. **B** - Static scoping (or lexical scoping) allows a variable's scope to be determined strictly by examining the source code structure prior to execution.
8. **D** - The Heap consists of disorganized, dynamically allocated memory that is not tightly managed directly by the CPU, unlike the Stack.
9. **C** - When multiple variables share the exact same physical memory location (Address/L-value), it creates a phenomenon known as aliasing.
10. **B** - As shown in the edge cases, Fortran has no reserved words, allowing keywords like IF or THEN to be used as variable identifiers.

## References & Navigation

- **Previous Topic:** [[Evolution of Programming Languages]]
- **Next Topic:** [[Data Types]]
- **Related Notes:** [[Data Types]], [[Memory Management]]
