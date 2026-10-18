---
id: ccprog1_conditional_statements
type: note
course: CCPROG1
topic: Conditional Statements
status: completed
---

# Conditional Statements

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Code Snippets]] #[[CCPROG1]] #[[Control Flow]] #[[C]] #[[M5]]

---

## Overview

> Conditional statements, or selection structures, allow a program to make decisions and execute different blocks of code based on whether a specified condition evaluates to true or false.

## Key Definitions
 **Condition:** A logical expression that evaluates to true (non-zero) or false (zero). **`if` Statement:** Executes a block of code if its condition is true. **`else` Statement:** Executes a block of code if the preceding `if` condition is false. **`switch` Statement:** Allows a variable to be tested for equality against a list of values.

## Code Implementation

```c
#include <stdio.h>

int main() {
    int grade = 85;
    
    // if-else if-else structure
    if (grade >= 90) {
        printf("A\n");
    } else if (grade >= 80) {
        printf("B\n");
    } else if (grade >= 70) {
        printf("C\n");
    } else {
        printf("F\n");
    }
    
    // switch statement
    char letter = 'B';
    switch (letter) {
        case 'A':
            printf("Excellent\n");
            break;
        case 'B':
            printf("Good\n");
            break;
        default:
            printf("Needs Improvement\n");
    }
    
    return 0;
}
```

## Syntax Breakdown
 `if (condition)`: The code block inside `{}` runs if `condition` is true. `else if (condition)`: Checked only if the previous `if` was false. `switch(variable)`: Evaluates `variable`. `case 'X':`: If `variable` equals `'X'`, execute following code. `break;`: Exits the switch block, preventing fall-through to the next case.

## Common Pitfalls
 Forgetting the `break;` statement in a `switch`, which causes "fall-through" execution. Using `=` (assignment) instead of `==` (equality check) inside an `if` condition. E.g., `if (x = 5)` evaluates to true because 5 is non-zero, and it changes `x` to 5.

## Multiple Choice Questions

1. What is the output of the following C code snippet if `int x = 0;`?
   `if (x = 5) printf("True"); else printf("False");`
    - **A)** False, because `x` was initialized to 0
    - **B)** True, because `x = 5` assigns 5 to `x` and evaluates to non-zero (true)
    - **C)** A compilation error due to assignment inside an `if` condition
    - **D)** Undefined behavior at runtime

2. In a C `switch` statement, what happens when a matching `case` block omits the `break;` statement?
    - **A)** The compiler automatically inserts a `break;` at the end of the `case`
    - **B)** A runtime exception terminates the `switch` block immediately
    - **C)** Execution falls through and continues running the statements of subsequent cases until a `break;` or the end of the `switch` block is reached
    - **D)** Only the `default` block is executed next, skipping intermediate cases

3. Which of the following data types CANNOT be used as the controlling expression of a `switch` statement in standard C?
    - **A)** `int`
    - **B)** `char`
    - **C)** `float`
    - **D)** `long`

4. In an `if - else if - else` ladder, when is the final `else` block executed?
    - **A)** Always, as a cleanup step after any matching `if` branch finishes
    - **B)** Only when the very first `if` condition evaluates to false
    - **C)** Only when every preceding `if` and `else if` condition in the chain evaluates to false (zero)
    - **D)** Whenever at least one `else if` condition evaluates to true

5. With which `if` does the `else` pair in the nested statement `if (a > 0) if (b > 0) printf("1"); else printf("2");`?
    - **A)** The outer `if (a > 0)` because of indentation rules in C
    - **B)** The nearest preceding unmatched `if`, which is `if (b > 0)` (the dangling-else rule)
    - **C)** Both `if` statements simultaneously
    - **D)** Neither; C requires curly braces `{}` for all nested `if-else` statements

### Answer Key & Explanations

1. **B**. In C, `=` is the assignment operator, not the equality operator (`==`). The expression `x = 5` assigns 5 to `x` and evaluates to `5`, which is non-zero and therefore treated as true by the `if` statement.
2. **C**. Omitting `break;` causes "fall-through" execution, where the program continues executing statements in all following `case` labels regardless of whether their constant values match, until a `break;` or closing brace is encountered.
3. **C**. A `switch` controlling expression in C must evaluate to an integer type (`int`, `char`, `short`, `long`, or `enum`). Floating-point types (`float`, `double`) and strings cannot be used because exact equality comparisons on floats are imprecise.
4. **C**. Conditions in an `if - else if - else` ladder are evaluated top-to-bottom. Once a true condition is found, its block executes and the rest of the ladder is skipped; the trailing `else` only runs if all prior conditions were false.
5. **B**. C is a free-form language that ignores indentation. By the dangling-else rule, an `else` clause always pairs with the closest preceding unmatched `if` in the same block unless curly braces `{}` explicitly group it with the outer `if`.

## References & Navigation

- **Previous Topic:** [[User-defined Functions]]
- **Next Topic:** [[Iterative Statements in C]]
- **Related Notes:** [[Statement Level Control Structures]], [[Conditionals]]
