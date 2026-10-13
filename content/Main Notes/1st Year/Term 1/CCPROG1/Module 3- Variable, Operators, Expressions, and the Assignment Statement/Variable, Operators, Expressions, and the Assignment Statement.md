---
id: ccprog1_variables_operators
type: note
course: CCPROG1
topic: "Variable, Operators, Expressions, and the Assignment Statement"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CCPROG1]] #[[Code Snippets]] #[[Variables]] #[[Operators]] #[[C]] #[[M3]]

---

## Overview
At the heart of imperative programming lies the ability to store, manipulate, and retrieve data. Variables serve as named memory locations for data storage, while operators are the tools used to manipulate this data. By combining variables, constants, and operators, programmers form expressions that evaluate to specific values. These computed values are then typically saved back into memory via assignment statements.

## Key Definitions
- **Variable:** A designated storage location in memory, identified by a symbolic name, that holds a value capable of changing during program execution.
- **Data Type:** A classification that specifies the size and type of values a variable can hold (e.g., `int` for integers, `float` for floating-point numbers, `char` for single characters).
- **Operator:** A special symbol that directs the compiler to perform specific mathematical, relational, or logical operations.
- **Expression:** A syntactically valid combination of operands (variables and constants) and operators that reduces to a single value.

## Theoretical Framework / Core Concepts

### Operator Precedence in C
When an expression involves multiple operators, the compiler evaluates them according to strict precedence rules, ensuring predictable outcomes.
1. **Highest Precedence:** `( )` Parentheses always override standard precedence.
2. **Multiplicative:** `*` (Multiplication), `/` (Division), `%` (Modulo) are evaluated next, from left to right.
3. **Additive:** `+` (Addition), `-` (Subtraction) are evaluated last, from left to right.

### The Modulo Operator
The `%` operator is unique; it performs division but returns only the **remainder**. It is strictly for integer operands. For example, `10 % 3` evaluates to `1`.

### Integer Division Caveat
In C, if division is performed between two integer types, the result is an integer division. The fractional part is truncated entirely. For instance, `5 / 2` results in `2`, not `2.5`.

## Worked Examples / Protocol Walkthroughs / Calculations

```c
#include <stdio.h>

int main() {
    // 1. Variable Declaration and Initialization
    int a = 15;
    int b = 4;
    
    // 2. Expressions and Assignment
    int sum = a + b;           // Evaluates to 19
    int division = a / b;      // Evaluates to 3 (Integer division truncates)
    int remainder = a % b;     // Evaluates to 3 (Since 15 = 4*3 + 3)
    
    // 3. Precedence Example
    int complex_expr = a + b * 2; // Evaluates to 15 + 8 = 23 (Multiplication first)
    
    printf("Division: %d\n", division);
    printf("Remainder: %d\n", remainder);
    
    return 0;
}
```

## Summary & Key Takeaways
- Variables require a data type that dictates what kind of information they can store.
- Expressions evaluate to a single value based on operator precedence rules.
- The assignment operator `=` evaluates the right side and stores it in the left side's variable location.
- Integer division truncates decimals, which is a common source of logic errors.

## Multiple Choice Questions

1. What is a variable in programming?
- **A)** A fixed mathematical value
- **B)** A named memory location used to store data
- **C)** A predefined function for I/O
- **D)** A type of operator

2. Which data type is used to store whole numbers in C?
- **A)** `float`
- **B)** `char`
- **C)** `int`
- **D)** `string`

3. What does the modulo operator (`%`) return?
- **A)** The quotient of division
- **B)** The product of multiplication
- **C)** The remainder of integer division
- **D)** The fractional part of a float

4. According to operator precedence in C, which of the following is evaluated first?
- **A)** Addition (`+`)
- **B)** Multiplication (`*`)
- **C)** Parentheses `()`
- **D)** Subtraction (`-`)

5. What is the result of the expression `11 / 4` in C (assuming integer operands)?
- **A)** `2.75`
- **B)** `2`
- **C)** `3`
- **D)** `0.75`

6. What will be the value of `x` after the following code executes: `int x = 5 + 3 * 2;`?
- **A)** `16`
- **B)** `11`
- **C)** `21`
- **D)** `10`

7. What is an assignment statement?
- **A)** A statement that prints a value to the screen
- **B)** A statement that compares two values
- **C)** A statement that stores an evaluated expression into a variable
- **D)** A statement that declares a new function

8. What happens if you use a variable before initializing it in C?
- **A)** It defaults to `0`
- **B)** It causes a compile-time error
- **C)** It holds a "garbage" value that was previously at that memory location
- **D)** It defaults to `null`

9. In the statement `total = a + b;`, what does the `=` symbol do?
- **A)** Checks if `total` is equal to `a + b`
- **B)** Assigns the calculated sum of `a` and `b` to the variable `total`
- **C)** Declares the variable `total`
- **D)** Adds `total` to `a` and `b`

10. Which of the following is a common pitfall regarding data types?
- **A)** Assigning an integer to an `int` variable
- **B)** Using the `%` operator with `float` types, which is illegal in C
- **C)** Performing addition before division
- **D)** Initializing a variable upon declaration

### Answer Key & Explanations
1. **B** - Variables are essentially named containers in memory.
2. **C** - The `int` keyword denotes an integer (whole number) data type.
3. **C** - Modulo divides two integers and returns whatever is left over as a remainder.
4. **C** - Parentheses always take highest precedence in expression evaluation.
5. **B** - Integer division strictly truncates the decimal portion, meaning 2.75 becomes just 2.
6. **B** - Multiplication happens first (3 * 2 = 6), then addition (5 + 6 = 11).
7. **C** - The assignment operator takes the value on the right and stores it into the designated variable on the left.
8. **C** - Uninitialized local variables in C contain whatever random bits were already residing in that memory space.
9. **B** - The single equals sign is the assignment operator; it assigns the value of the right-hand expression to the left-hand operand.
10. **B** - The modulo operator is strictly defined for integer arithmetic in C; using it on floats causes a compilation error.

## References & Navigation

- **Previous Topic:** [[Problem Analysis, Logic Formulation and Flowcharting]]
- **Next Topic:** [[Functions and Programs]]
- **Related Notes:** [[Expressions and Assignment Statements]], [[Names, Variables, Binding, Scope]]
