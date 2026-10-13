---
id: Topic-5--Recursion
type: note
course: CCPROG2
topic: C Programming
status: draft
---

# Topic 5- Recursion

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCPROG2]] #[[C Programming]] #[[Programming]] #[[Computer Science]] #[[Recursion and Iteration]] #[[Computational Thinking]] #[[Recursion]] #[[Algorithm]] #[[Structured Programming]] #[[Memory Management]]

---

## Overview

> Recursion is the process of a function calling itself to solve a problem by breaking it into smaller sub-problems. Every recursive function needs a **base case** (termination) and a **recursive case** (self-call with modified parameters).

## Key Concepts
 **Base case:** Terminates the recursion — returns a constant or performs no further calls **Recursive case:** Function calls itself with a smaller/modified problem Recursion uses the **call stack** — each call gets its own stack frame Procedural (iterative) vs. Functional (recursive) approaches Every recursion can be rewritten iteratively and vice versa

## Details / Theory

### Procedural vs. Functional Approach

#### Procedural Approach (Iterative — CCPROG1)

1. Step 1
2. Step 2
3. Step 3

#### Functional Approach (Recursive — CCPROG2)

1. Function call 1
2. Function call 2
3. Function call 3

### Factorial — Iterative vs. Recursive

**Procedural (Iterative):**

```c
int factorial(int N) {
    int prod = 1;
    while (N > 0) {
        prod *= N;
        N--;
    }
    return prod;
}
```

**Functional (Recursive):**

```c
int factorial(int N) {
    if (N == 1 || N == 0)   // Base case
        return 1;
    else
        return N * factorial(N - 1);  // Recursive case
}
```

**Trace:** `factorial(4)` → `4 * factorial(3)` → `4 * 3 * factorial(2)` → `4 * 3 * 2 * factorial(1)` → `4 * 3 * 2 * 1` = 24

### How to Design a Recursive Function

1. **Sketch** the solution with varying values of the parameter
2. **Identify patterns** or common trends → this becomes the **recursive case**
3. **Identify** where only 1 or a constant operation is performed → this becomes the **base case**

### Summation — Iterative vs. Recursive

**Iterative:**

```c
int summation(int a, int b) {
    int sum = 0;
    while (a <= b) {
        sum += a;
        a++;
    }
    return sum;
}
```

**Recursive:**

```c
int summation(int a, int b) {
    if (a > b)        // Base case
        return 0;
    return a + summation(a + 1, b);  // Recursive case
}
```

### Display in Order vs. Reverse

**Print Ascending (recurse first, then print):**

```c
void displayN(int N) {
    if (N > 0) {
        displayN(N - 1);    // Recurse FIRST
        printf("%d\n", N);  // Then print
    }
}
```

**Print Descending (print first, then recurse):**

```c
void displayNReverse(int N) {
    if (N > 0) {
        printf("%d\n", N);      // Print FIRST
        displayNReverse(N - 1); // Then recurse
    }
}
```

> The position of the recursive call relative to other statements controls the order of execution.

### Power Function

```c
int power(int base, int exp) {
    if (exp == 0)
        return 1;             // Base case: x^0 = 1
    return base * power(base, exp - 1);  // x^n = x * x^(n-1)
}
```

### Fibonacci

```c
int fibonacci(int n) {
    if (n == 0) return 0;     // Base case 1
    if (n == 1) return 1;     // Base case 2
    return fibonacci(n - 1) + fibonacci(n - 2);  // Two recursive calls
}
```

> **Warning:** Naive Fibonacci has exponential time complexity $O(2^n)$. Use iteration or memoization for efficiency.

### The Call Stack

Each recursive call creates a new **stack frame** with its own local variables. Stack frames are pushed on call and popped on return:

```
factorial(4)     ← waiting
  factorial(3)   ← waiting
    factorial(2) ← waiting
      factorial(1) → returns 1
    returns 2 * 1 = 2
  returns 3 * 2 = 6
returns 4 * 6 = 24
```

If recursion is too deep, the stack overflows (**stack overflow**).

## Common Pitfalls
 **Missing base case** — causes infinite recursion and stack overflow. **Base case never reached** — recursive call doesn't move toward the base case. **Excessive recursion** — naive recursive Fibonacci is $O(2^n)$; use iteration or memoization. **Confusing print order** — print before vs. after the recursive call gives different output order.

## Summary

> TL;DR — Recursion = function calls itself. Every recursive function needs a base case (stop) and a recursive case (smaller sub-problem). Design by tracing values, finding patterns (recursive case), and identifying the simplest case (base case). Watch for stack overflows and efficiency.

## Review Questions

_To be added._

## Links
 **Related:** [[File Handling]] — [[Strings]] — [[Structs]] — [[Recurrences]] — [[Recursion Tree Method]] — [[Divide and Conquer]] **Source / Reference:**

## Multiple Choice Questions
1. What is the definition of recursion in C programming?
    - **A)** A loop that runs infinitely
    - **B)** A function that calls itself directly or indirectly
    - **C)** A variable that points to itself
    - **D)** A method for compiling code faster
2. What is the essential component of a recursive function that prevents it from running infinitely?
    - **A)** The recursive call
    - **B)** A global variable
    - **C)** The base case
    - **D)** A pointer
3. What happens if a recursive function lacks a properly defined base case?
    - **A)** The program runs faster
    - **B)** The compiler automatically generates one
    - **C)** The program throws a Stack Overflow error due to infinite recursion
    - **D)** It defaults to a return value of 0
4. Which memory region is heavily utilized during recursive function calls?
    - **A)** The Heap
    - **B)** The Stack
    - **C)** The Data Segment
    - **D)** The BSS Segment
5. How does recursion compare to iteration in terms of memory efficiency?
    - **A)** Recursion is always more memory efficient
    - **B)** Iteration generally uses less memory because it doesn't add frames to the call stack
    - **C)** They use exactly the same amount of memory
    - **D)** Recursion uses zero memory overhead
6. What is the 'recursive step'?
    - **A)** The part of the function that returns a constant value
    - **B)** The logic that breaks the problem down and makes the self-call
    - **C)** The initial call made from the main function
    - **D)** The termination condition
7. Which of the following problems is naturally suited for a recursive solution?
    - **A)** Calculating the factorial of a number
    - **B)** Opening a file
    - **C)** Assigning a variable
    - **D)** Printing a single string
8. In the context of recursion, what is 'unwinding'?
    - **A)** The process of resolving the return values as the stack frames pop off
    - **B)** Breaking out of an infinite loop
    - **C)** Compiling the recursive code
    - **D)** Converting recursion into iteration
9. What is 'tail recursion'?
    - **A)** When the recursive call is the very first statement
    - **B)** When the recursive call is the very last operation performed in the function
    - **C)** When a function calls two different functions
    - **D)** When recursion fails
10. Why might a compiler optimize tail recursion?
    - **A)** To execute slower for debugging
    - **B)** To automatically convert it into a loop, saving stack space
    - **C)** To increase memory usage
    - **D)** To prevent variables from being updated

### Answer Key & Explanations
1. **B)** Recursion occurs when logic dictates a procedure invoke itself to solve sub-problems.
2. **C)** Base cases serve as absolute stopping conditions terminating the self-calling chain.
3. **C)** Unchecked recursion rapidly consumes stack frames until memory bounds are catastrophically breached.
4. **B)** Each invocation creates a new frame on the call stack housing local variables and addresses.
5. **B)** Loops reuse the same local memory context, avoiding the compounding frame overhead of recursion.
6. **B)** The step shrinks the problem state and cascades execution into the next function layer.
7. **A)** Mathematical sequences like factorials intrinsically mirror recursive divide-and-conquer logic models.
8. **A)** Unwinding resolves suspended operations retroactively once the base case propagates returns upwards.
9. **B)** Tail calls finish completely upon returning, requiring no pending post-recursive mathematical operations.
10. **B)** Optimizers can recycle the current stack frame, eliminating overflow risks for deep recursive chains.

## References & Navigation

- **Previous Topic:** [[File Handling]]
- **Related Notes:** [[Functions and Programs]], [[Recursion Tree Method]]
