---
id: ccprog1_testing_debugging
type: note
course: CCPROG1
topic: Testing and Debugging
status: completed
---

# Testing and Debugging

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Conceptual]] #[[CCPROG1]] #[[Debugging]] #[[Software Quality]] #[[M7]]

---

## Overview

> Testing is the process of evaluating a program to verify that it functions exactly as intended, while debugging is the process of finding and fixing the defects (bugs) discovered during testing or execution.

## Key Definitions
 **Bug:** An error, flaw, or fault in a computer program that produces an incorrect or unexpected result. **Syntax Error:** Mistakes in the source code grammar that prevent the code from compiling. **Logic Error:** The program runs but produces incorrect outputs because the underlying algorithm is flawed. **Runtime Error:** Errors that occur during the execution of a program (e.g., dividing by zero). **Test Cases:** Specific sets of inputs and expected outputs used to test a program.

## Theoretical Framework

### The Debugging Process
1. **Identify the Error:** Notice that the program is not behaving as expected.
3. **Analyze the Cause:** Understand *why* the error is occurring.
4. **Fix the Bug:** Modify the code to resolve the issue.
5. **Re-test:** Verify that the fix worked and did not introduce new bugs.

### Testing Strategies **Black-box Testing:** Testing functionality without looking at the internal code structure. Focuses purely on inputs and expected outputs. **White-box Testing:** Testing internal structures, logic paths, and edge cases by reading the source code. **Boundary/Edge Cases:** Testing values at the extremes of allowed inputs (e.g., an empty string, `0`, negative numbers).

> [!tip] Best Practice
> When debugging in C, a simple but effective technique is adding `printf()` statements at key points to track variable values and control flow. For complex issues, use a debugger like `gdb` to step through the code line by line.

## Common Pitfalls
 Changing code randomly in hopes of fixing a bug ("shotgun debugging") instead of tracing the logic. Testing only the "happy path" (normal inputs) and ignoring edge cases. Failing to properly read compiler error messages, which often point directly to the source of syntax errors.

## Multiple Choice Questions

1. Which type of error occurs when a C program compiles without warnings or errors, runs to completion, but produces an incorrect calculation result (such as using `+` instead of `*`)?
    - **A)** Syntax error
    - **B)** Linker error
    - **C)** Logic error (semantic bug)
    - **D)** Preprocessor error

2. When designing test cases for a function that accepts a student score in the valid range `[0, 100]`, which set of inputs best represents Boundary Value Analysis?
    - **A)** `50, 60, 70`
    - **B)** `-1, 0, 1, 99, 100, 101`
    - **C)** `25, 50, 75`
    - **D)** `1000, -1000, 0`

3. What is the difference between Black-Box Testing and White-Box Testing?
    - **A)** Black-Box Testing examines internal code paths and branches, while White-Box Testing only checks inputs and outputs
    - **B)** Black-Box Testing validates functionality against specifications without looking at internal source code, while White-Box Testing designs test cases using knowledge of internal code structure and branches
    - **C)** Black-Box Testing is done by compilers, while White-Box Testing is done by users
    - **D)** White-Box Testing does not require running the program

4. Which of the following causes a Linker Error rather than a Compile-Time Syntax Error in C?
    - **A)** Missing a semicolon at the end of a `printf` statement
    - **B)** Misspelling the keyword `while` as `whlie`
    - **C)** Declaring a function prototype and calling it, or misspelling `main`, without providing the function's actual definition
    - **D)** Dividing an integer by zero at runtime

5. What is a "driver" in the context of unit testing modular C programs?
    - **A)** A hardware kernel module that controls external I/O devices
    - **B)** A dummy placeholder function called by the module under test
    - **C)** A test harness (such as a temporary `main()` function) written to invoke the function under test with specific inputs and verify its return value
    - **D)** An automated code formatter that enforces indentation rules

### Answer Key & Explanations

1. **C**. A logic error means the code is syntactically valid C, so the compiler and linker succeed, but the algorithm implemented by the programmer does not match the intended specification.
2. **B**. Off-by-one bugs (`<` vs `<=`) almost always occur at the exact boundaries of valid input ranges. Boundary Value Analysis tests the minimum and maximum edges (`0` and `100`) as well as the values immediately adjacent to them (`-1, 1, 99, 101`).
3. **B**. Black-Box Testing treats the program as an opaque box and tests input-to-output behavior against requirements. White-Box (glass-box) Testing inspects the control flow graph, `if/else` branches, and loop conditions to ensure full path coverage.
4. **C**. Syntax errors (A, B) are caught by the compiler during translation. A missing function definition after a valid prototype passes compilation, but fails when the linker tries to resolve symbol references into a final executable.
5. **C**. In bottom-up testing, a test driver is a caller module that feeds test inputs into a lower-level function and checks its output. By contrast, a "stub" (B) is a dummy callee function used in top-down testing.

## References & Navigation

- **Previous Topic:** [[Iterative Statements in C]]
- **Next Topic:** [[Coding Standards]]
- **Related Notes:** [[Debugging and Test Tools]], [[Exception Handling]]
