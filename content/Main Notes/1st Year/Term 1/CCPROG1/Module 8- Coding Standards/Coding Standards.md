---
id: ccprog1_coding_standards
type: note
course: CCPROG1
topic: Coding Standards
status: completed
---

# Coding Standards

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Conceptual]] #[[CCPROG1]] #[[Best Practices]] #[[M8]]

---

## Overview

> Coding standards are a set of rules, guidelines, and best practices that developers follow when writing code. Consistently applying these standards makes code more readable, maintainable, and understandable, both for the original author and for others.

## Key Definitions
 **Naming Conventions:** Rules for naming variables, functions, and files (e.g., camelCase, snake_case). **Indentation:** Spaces or tabs used to format code structure visually. **Documentation/Comments:** Written explanations in the code to clarify logic (`//` or `/* */`).

## Theoretical Framework

### Importance of Coding Standards
1. **Readability:** Clean, well-formatted code is easier to read.
2. **Maintainability:** Standardized code is easier to update and debug later.
3. **Collaboration:** When multiple programmers work on the same project, a shared standard ensures the codebase looks cohesive.

### Common Guidelines in C **Meaningful Names:** Use descriptive names (`total_sales` instead of `ts`). **Consistent Bracing:** Choose a bracing style (e.g., K&R or Allman) and stick to it.
  ```c
  // K&R Style
  if (condition) {
      // code
  }
  ``` **Proper Indentation:** Use 4 spaces (or 1 tab) for each level of block nesting. **Comments:** Comment on *why* something is being done rather than *what* is being done, unless the what is highly complex. **Avoid Magic Numbers:** Use `#define` or `const` for raw numbers to give them context (e.g., `#define MAX_STUDENTS 50`).

## Common Pitfalls
 Writing excessively clever or compact code that becomes impossible for others to read. Using inconsistent naming conventions (mixing `CamelCase`, `snake_case`, and `lowercase`). Over-commenting obvious code (e.g., `i++; // increments i by 1`).

## Multiple Choice Questions

1. Why do C coding standards strongly discourage the use of "magic numbers" (unnamed literal constants like `if (status == 42)`) in source code?
    - **A)** Magic numbers cause the C compiler to generate slower machine code
    - **B)** Standard C does not allow integer literals inside conditional expressions
    - **C)** They obscure the semantic meaning of the value and make maintenance error-prone if the constant must be updated in multiple places
    - **D)** They consume extra stack memory at runtime compared to variables

2. Which of the following identifier pairs follows standard C naming conventions for distinguishing a symbolic constant/macro from a local variable?
    - **A)** `max_buffer_size` for a constant and `MAX_BUFFER_SIZE` for a local variable
    - **B)** `MAX_BUFFER_SIZE` for a `#define` constant and `max_buffer_size` (or `maxBufferSize`) for a local variable
    - **C)** `_MaxBufferSize` for both constants and local variables
    - **D)** Single-letter names like `m` and `b` for all global and local identifiers

3. What is the primary purpose of writing function header comments (docstrings) in a C program?
    - **A)** To instruct the compiler on how to optimize the function's assembly output
    - **B)** To document the function's purpose, parameters, preconditions, and return value so callers can use and maintain it without reading every line of its implementation
    - **C)** To restate every line of C syntax in plain English (e.g., `x = x + 1; // add 1 to x`)
    - **D)** To prevent syntax errors during preprocessing

4. How does the C compiler treat indentation and whitespace outside of string literals and preprocessor directives?
    - **A)** Indentation defines block scope, just like in Python
    - **B)** Incorrect indentation causes a compile-time warning or error by default
    - **C)** The compiler ignores indentation for block structure (which is determined by `{}` braces); consistent indentation is strictly for human readability and maintainability
    - **D)** Tabs and spaces alter the execution speed of loops

5. Which practice best adheres to modular coding standards when writing functions in C?
    - **A)** Writing the entire program inside `main()` to avoid function call overhead
    - **B)** Using global variables to pass data between all functions instead of parameter lists
    - **C)** Designing each function to perform a single, well-defined task (Single Responsibility) with explicit parameters and return values
    - **D)** Nesting `if-else` statements 8 levels deep inside a 500-line function

### Answer Key & Explanations

1. **C**. Replacing a magic number like `0.12` with `#define VAT_RATE 0.12` or `const double VAT_RATE = 0.12;` makes the code self-documenting and ensures that any future rate change only requires editing a single definition.
2. **B**. By universal C convention, preprocessor macros and symbolic constants use `UPPER_SNAKE_CASE` (`MAX_BUFFER_SIZE`), while variables and functions use `lower_snake_case` or `camelCase`. Identifiers starting with an underscore followed by an uppercase letter (C) are reserved by the C standard.
3. **B**. Good comments explain the "why" and the interface contract (inputs, outputs, side effects, assumptions), whereas trivial comments that merely repeat obvious syntax (C) add visual noise.
4. **C**. Unlike Python, C uses curly braces `{}` to define compound statements. Misleading indentation (such as indenting two lines under an `if` without braces) is a notorious source of bugs because humans read the indentation while the compiler reads only the braces.
5. **C**. Functions with a single, cohesive responsibility and explicit inputs/outputs are easy to read, unit-test, debug, and reuse. Relying on global state (B) creates hidden coupling and side effects across the program.

## References & Navigation

- **Previous Topic:** [[Testing and Debugging]]
- **Related Notes:** [[Testing and Debugging]], [[Design Principles]]
