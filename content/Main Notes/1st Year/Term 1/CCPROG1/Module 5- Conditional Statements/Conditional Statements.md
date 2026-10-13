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

**🏷️ Tags:** #[[Code Snippets]] #[[CCPROG1]] #[[Control Flow]] #[[C]] #[[M5]]

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

1. What best describes the role of **🏷️ Tags**?
    - **A)** #[[Code Snippets]] #[[CCPROG1]] #[[Control Flow]] #[[C]] #[[M5]]
    - **B)** A deprecated standard that has been replaced in modern implementations
    - **C)** Allows a variable to be tested for equality against a list of values
    - **D)** A theoretical concept with no practical hardware implementation

2. What best describes the role of **`switch` Statement**?
    - **A)** A measurement unit used exclusively in network performance benchmarking
    - **B)** Allows a variable to be tested for equality against a list of values
    - **C)** A theoretical concept with no practical hardware implementation
    - **D)** #[[Code Snippets]] #[[CCPROG1]] #[[Control Flow]] #[[C]] #[[M5]]

3. According to the material on **Conditional Statements**, which statement is correct?
    - **A)** The described behavior is considered deprecated in modern implementations
    - **B)** Condition: A logical expression that evaluates to true (non-zero) or false (zero). if Statement: ...
    - **C)** The opposite of the stated principle applies
    - **D)** This principle only applies in theoretical models, not practical systems

4. According to the material on **Conditional Statements**, which statement is correct?
    - **A)** This principle only applies in theoretical models, not practical systems
    - **B)** if (condition): The code block inside {} runs if condition is not true. else if (condition): Checked ...
    - **C)** The described behavior is considered deprecated in modern implementations
    - **D)** if (condition): The code block inside {} runs if condition is true. else if (condition): Checked ...

5. According to the material on **Conditional Statements**, which statement is correct?
    - **A)** The described behavior is considered deprecated in modern implementations
    - **B)** Conditional statements, or selection structures, allow a program to make decisions and execute di...
    - **C)** This principle only applies in theoretical models, not practical systems
    - **D)** The opposite of the stated principle applies

6. According to the material on **Conditional Statements**, which statement is correct?
    - **A)** This principle only applies in theoretical models, not practical systems
    - **B)** id: ccprog1_conditional_statements
    - **C)** The described behavior is considered deprecated in modern implementations
    - **D)** The opposite of the stated principle applies

7. Which of the following is identified as a common pitfall when studying **Conditional Statements**?
    - **A)** Forgetting the `break;` statement in a `switch`, which causes "fall-through" execution. Using `=`...
    - **B)** Over-relying on memorization instead of understanding the underlying theory
    - **C)** Spending too much time on implementation before understanding the concept
    - **D)** Confusing this topic with an unrelated area of study

### Answer Key & Explanations
1. **A)** **🏷️ Tags** is defined in the note as: #[[Code Snippets]] #[[CCPROG1]] #[[Control Flow]] #[[C]] #[[M5]].

2. **B)** **`switch` Statement** is defined in the note as: Allows a variable to be tested for equality against a list of values.

3. **B)** The note explicitly states: "Condition: A logical expression that evaluates to true (non-zero) or false (zero). if Statement: ..."

4. **D)** The note explicitly states: "if (condition): The code block inside {} runs if condition is true. else if (condition): Checked ..."

5. **B)** The note explicitly states: "Conditional statements, or selection structures, allow a program to make decisions and execute di..."

6. **B)** The note explicitly states: "id: ccprog1_conditional_statements"

7. **A)** The note specifically warns: "Forgetting the `break;` statement in a `switch`, which causes "fall-through" execution. Using `=`..."

## References & Navigation

- **Previous Topic:** [[User-defined Functions]]
- **Next Topic:** [[Iterative Statements in C]]
- **Related Notes:** [[Statement Level Control Structures]], [[Conditionals]]
