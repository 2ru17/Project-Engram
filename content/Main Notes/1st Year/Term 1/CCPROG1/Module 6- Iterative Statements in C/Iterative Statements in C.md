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

**🏷️ Tags:** #[[Code Snippets]] #[[CCPROG1]] #[[Loops]] #[[C]] #[[M6]]

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

1. What best describes the role of **`for` Loop**?
    - **A)** A compact loop structure combining initialization, condition check, and update
    - **B)** A deprecated standard that has been replaced in modern implementations
    - **C)** Iterating one time too many or one time too few (e.g., using `<=` instead of ...
    - **D)** `for(int i=0; i<10; i++); { ... }` The semicolon terminates the loop immediat...

2. What best describes the role of **🏷️ Tags**?
    - **A)** #[[Code Snippets]] #[[CCPROG1]] #[[Loops]] #[[C]] #[[M6]]
    - **B)** `for(int i=0; i<10; i++); { ... }` The semicolon terminates the loop immediat...
    - **C)** A software-only abstraction that does not correspond to physical hardware
    - **D)** Iterating one time too many or one time too few (e.g., using `<=` instead of ...

3. What best describes the role of **Off-by-One Error**?
    - **A)** A deprecated standard that has been replaced in modern implementations
    - **B)** A compact loop structure combining initialization, condition check, and update
    - **C)** #[[Code Snippets]] #[[CCPROG1]] #[[Loops]] #[[C]] #[[M6]]
    - **D)** Iterating one time too many or one time too few (e.g., using `<=` instead of ...

4. What best describes the role of **Infinite Loop**?
    - **A)** Forgetting to update the loop control variable (e.g., forgetting `i++`)
    - **B)** A loop whose condition never becomes false
    - **C)** A measurement unit used exclusively in network performance benchmarking
    - **D)** `for(int i=0; i<10; i++); { ... }` The semicolon terminates the loop immediat...

5. According to the material on **Iterative Statements in C**, which statement is correct?
    - **A)** while(condition): The condition is tested at the start. If false initially, the loop body never r...
    - **B)** while(condition): The condition is not tested at the start. If false initially, the loop body never r...
    - **C)** The described behavior is considered deprecated in modern implementations
    - **D)** This principle only applies in theoretical models, not practical systems

6. According to the material on **Iterative Statements in C**, which statement is correct?
    - **A)** id: ccprog1_iterative_statements
    - **B)** The opposite of the stated principle applies
    - **C)** The described behavior is considered deprecated in modern implementations
    - **D)** This principle only applies in theoretical models, not practical systems

7. According to the material on **Iterative Statements in C**, which statement is correct?
    - **A)** The described behavior is considered deprecated in modern implementations
    - **B)** This principle only applies in theoretical models, not practical systems
    - **C)** The opposite of the stated principle applies
    - **D)** topic: Iterative Statements in C

8. According to the material on **Iterative Statements in C**, which statement is correct?
    - **A)** printf("For loop count: %d\n", k);
    - **B)** This principle only applies in theoretical models, not practical systems
    - **C)** The described behavior is considered deprecated in modern implementations
    - **D)** The opposite of the stated principle applies

9. Which of the following is identified as a common pitfall when studying **Iterative Statements in C**?
    - **A)** Off-by-One Error: Iterating one time too many or one time too few (e.g., using `<=` instead of `<...
    - **B)** Over-relying on memorization instead of understanding the underlying theory
    - **C)** Spending too much time on implementation before understanding the concept
    - **D)** Confusing this topic with an unrelated area of study

### Answer Key & Explanations
1. **A)** **`for` Loop** is defined in the note as: A compact loop structure combining initialization, condition check, and update.

2. **A)** **🏷️ Tags** is defined in the note as: #[[Code Snippets]] #[[CCPROG1]] #[[Loops]] #[[C]] #[[M6]].

3. **D)** **Off-by-One Error** is defined in the note as: Iterating one time too many or one time too few (e.g., using `<=` instead of `<`).

4. **B)** **Infinite Loop** is defined in the note as: A loop whose condition never becomes false.

5. **A)** The note explicitly states: "while(condition): The condition is tested at the start. If false initially, the loop body never r..."

6. **A)** The note explicitly states: "id: ccprog1_iterative_statements"

7. **D)** The note explicitly states: "topic: Iterative Statements in C"

8. **A)** The note explicitly states: "printf("For loop count: %d\n", k);"

9. **A)** The note specifically warns: "Off-by-One Error: Iterating one time too many or one time too few (e.g., using `<=` instead of `<..."

## References & Navigation

- **Previous Topic:** [[Conditional Statements]]
- **Next Topic:** [[Testing and Debugging]]
- **Related Notes:** [[Statement Level Control Structures]], [[Loops]]
