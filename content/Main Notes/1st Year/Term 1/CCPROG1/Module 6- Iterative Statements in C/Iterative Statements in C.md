---
id: ccprog1_iterative_statements
type: note
course: CCPROG1
topic: Iterative Statements in C
status: completed
---

# Iterative Statements in C

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Code Snippets]] #[[CCPROG1]] #[[Loops]] #[[C]] #[[M6]]

---

## Overview

> Iterative statements, commonly known as loops, allow a specific block of code to be executed repeatedly as long as a certain condition remains true. They are essential for tasks involving repetition without writing redundant code.

## Key Definitions
 **Loop:** A programming construct that repeats a block of code. **`while` Loop:** Repeats while a condition is true, checks condition *before* execution. **`do-while` Loop:** Executes the block at least once, checks condition *after* execution. **`for` Loop:** A compact loop structure combining initialization, condition check, and update. **Infinite Loop:** A loop whose condition never becomes false.

## Code Implementation

```c
#include <stdio.h>

int main() {
    // 1. while loop
    int i = 0;
    while (i < 3) {
        printf("While loop count: %d\n", i);
        i++;
    }
    
    // 2. do-while loop
    int j = 0;
    do {
        printf("Do-while count: %d\n", j);
        j++;
    } while (j < 3);
    
    // 3. for loop
    for (int k = 0; k < 3; k++) {
        printf("For loop count: %d\n", k);
    }
    
    return 0;
}
```

## Syntax Breakdown
 `while(condition)`: The condition is tested at the start. If false initially, the loop body never runs. `do { ... } while(condition);`: The body runs, then condition is checked. Notice the required semicolon `;` at the end. `for(initialization; condition; update)`: Best used when the number of iterations is known beforehand.

## Common Pitfalls
 **Off-by-One Error:** Iterating one time too many or one time too few (e.g., using `<=` instead of `<`). **Infinite Loops:** Forgetting to update the loop control variable (e.g., forgetting `i++`). **Semicolon After For/While:** `for(int i=0; i<10; i++); { ... }` The semicolon terminates the loop immediately, making the following block run only once, separated from the loop.

## Multiple Choice Questions

1. How many times will the body of the loop `for (int i = 0; i < 5; i++)` execute?
    - **A)** 4 times
    - **B)** 5 times
    - **C)** 6 times
    - **D)** Infinite times

2. What is the fundamental difference between a `while` loop and a `do-while` loop in C?
    - **A)** A `while` loop is faster because it does not check a condition on the first iteration
    - **B)** A `do-while` loop evaluates its condition at the bottom of the loop, guaranteeing that the body executes at least once
    - **C)** A `do-while` loop cannot contain `break` or `continue` statements
    - **D)** A `while` loop can only use integer counter variables

3. Inside a `for` loop (`for (init; cond; update)`), what happens immediately after a `continue;` statement is executed inside the loop body?
    - **A)** The loop terminates completely and execution jumps to the statement after the loop
    - **B)** The `init` expression is re-evaluated from the beginning
    - **C)** The remaining statements in the current iteration are skipped and control jumps directly to the `update` expression
    - **D)** The current iteration restarts from the first line of the loop body without updating the counter

4. What is the effect of placing a stray semicolon immediately after a `while` condition, such as `int i = 0; while (i < 10); { i++; }`?
    - **A)** A compilation syntax error
    - **B)** The loop runs 10 times as normal
    - **C)** The semicolon acts as an empty loop body, causing an infinite loop because `i` is never incremented inside the `while`
    - **D)** The loop is skipped entirely

5. Which loop construct is most idiomatic when the exact number of iterations is known before entering the loop?
    - **A)** `do-while` loop
    - **B)** `for` loop
    - **C)** `switch` loop
    - **D)** `goto` label loop

### Answer Key & Explanations

1. **B**. The loop variable `i` takes the values `0, 1, 2, 3, 4` (5 distinct values). When `i` becomes `5`, the condition `i < 5` evaluates to false and the loop terminates.
2. **B**. A `while` loop is an entry-controlled loop (checks the condition before executing the body, so it may run 0 times), whereas a `do-while` loop is an exit-controlled loop (executes the body first, then checks the condition).
3. **C**. In a `for` loop, `continue;` skips the rest of the loop body for the current pass and transfers control to the `update` step (`i++`), followed by the condition check. By contrast, `break;` exits the loop entirely.
4. **C**. A semicolon by itself is a valid null statement in C. Writing `while (i < 10);` means the loop body is that empty statement; since `i` remains `0` forever, `i < 10` is always true and the program hangs in an infinite loop.
5. **B**. The `for` loop places initialization, termination condition, and step update together in a single header line, making count-controlled iteration clear and less prone to forgotten counter updates.

## References & Navigation

- **Previous Topic:** [[Conditional Statements]]
- **Next Topic:** [[Testing and Debugging]]
- **Related Notes:** [[Statement Level Control Structures]], [[Loops]]
