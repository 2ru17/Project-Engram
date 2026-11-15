---
id: ccdsalg_infix_postfix_and_prefix_expressions
type: note
course: CCDSALG
topic: Infix, Postfix, and Prefix Expressions
status: completed
---
# Infix, Postfix, and Prefix Expressions

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCDSALG]] #[[Infix, Postfix, Prefix]] #[[Conceptual]] #[[M3]]

---

## Overview

Arithmetic expressions are composed of tokens, which include **operands**, **operators**, and **grouping symbols**. Depending on where the operator is placed relative to the operands, expressions can be written in three distinct notations: Infix, Postfix, and Prefix.

## Key Definitions

* **Infix notation**: The operator is placed in between its operands (e.g., `operand1 operator operand2` $\rightarrow$ `8 + 2`).
* **Postfix notation**: The operator is placed after its operands (e.g., `operand1 operand2 operator` $\rightarrow$ `8 2 +`).
* **Prefix notation**: The operator is placed before its operands (e.g., `operator operand1 operand2` $\rightarrow$ `+ 8 2`).

## Theoretical Framework

When evaluating or converting expressions between these notations, note the following important rules:
1. The **order of the operands** remains the exact same in all three notations.
2. **Grouping symbols** (like parentheses) are necessary in infix notation to override default precedence, but they **do not appear** in postfix and prefix notations.
3. Operator precedence and associativity (left-to-right or right-to-left) dictate how expressions are evaluated and thus affect the resulting notation.

### Converting Infix to Postfix using a Stack
A stack can be used to convert an infix expression to postfix. Operators are pushed onto the stack and popped to the output string based on their precedence.

**Example trace for `1 + 2 * 3 / 4 - 5`**:
1. `1`: Add to postfix. (Postfix: `1`)
2. `+`: Push to stack. (Stack: `+`)
3. `2`: Add to postfix. (Postfix: `1 2`)
4. `*`: Push to stack (higher precedence than `+`). (Stack: `+ *`)
5. `3`: Add to postfix. (Postfix: `1 2 3`)
6. `/`: Same precedence as `*`. Pop `*` to postfix, push `/`. (Stack: `+ /`, Postfix: `1 2 3 *`)
7. `4`: Add to postfix. (Postfix: `1 2 3 * 4`)
8. `-`: Lower precedence than `/` and same as `+`. Pop `/` and `+`, then push `-`. (Stack: `-`, Postfix: `1 2 3 * 4 / +`)
9. `5`: Add to postfix. (Postfix: `1 2 3 * 4 / + 5`)
10. End of string: Pop remaining stack. (Postfix: `1 2 3 * 4 / + 5 -`)


## Multiple Choice Questions

1. What are the three categories of tokens that make up arithmetic expressions?
    - **A)** Variables, constants, and semicolons
    - **B)** Stacks, queues, and pointers
    - **C)** Precedence rules, exponents, and associativity
    - **D)** Operands, operators, and grouping symbols

2. When converting an arithmetic expression across Infix, Postfix, and Prefix notations, which property remains completely unchanged?
    - **A)** The relative order of the operands
    - **B)** The exact positions of all operators
    - **C)** The presence of parentheses around subexpressions
    - **D)** The placement of the lowest-precedence operator in the middle

3. Why are grouping symbols such as parentheses absent from Postfix and Prefix notations?
    - **A)** Because Postfix and Prefix forbid mixing addition with multiplication
    - **B)** Because operands automatically swap places whenever precedence changes
    - **C)** Because operator placement relative to operands encodes the evaluation order unambiguously without parentheses
    - **D)** Because Postfix and Prefix always evaluate strictly left-to-right regardless of operator

4. In the worked stack trace for converting `1 + 2 * 3 / 4 - 5` to Postfix, when `/` is scanned while the stack holds `+ *` (from bottom to top), why is `*` popped before `/` is pushed?
    - **A)** Because / has higher precedence than *
    - **B)** Because multiplication (*) and division (/) share the same precedence with left-to-right associativity, so multiplication is popped to the output first
    - **C)** Because the stack has reached a maximum capacity of 2
    - **D)** Because + forces all multiplication operators off the stack immediately

5. Continuing the worked conversion trace of `1 + 2 * 3 / 4 - 5`, what are the Postfix string and the Stack contents immediately after processing `-` (before scanning `5`)?
    - **A)** Postfix: 1 2 3 * 4 / and Stack: + -
    - **B)** Postfix: 1 2 3 * 4 + / and Stack: -
    - **C)** Postfix: 1 2 3 * 4 / + - and Stack: empty
    - **D)** Postfix: 1 2 3 * 4 / + and Stack: -

6. Which Postfix expression corresponds to the Infix expression `(A + B) * C - D`?
    - **A)** A B + C * D -
    - **B)** A B C * + D -
    - **C)** A B + C D - *
    - **D)** + A B * C - D

7. Which Prefix expression corresponds to the Infix expression `a + b * c`?
    - **A)** a b c * +
    - **B)** * + a b c
    - **C)** + a * b c
    - **D)** + * a b c

8. What is the Postfix form of the Infix expression `A * (B + C / D)`?
    - **A)** A B + C D / *
    - **B)** A B C D / + *
    - **C)** A B C / + D *
    - **D)** A B C D + / *

9. Which Infix expression (without redundant outer parentheses) corresponds to the Postfix expression `8 2 3 * + 4 -`?
    - **A)** (8 + 2) * 3 - 4
    - **B)** 8 + 2 * (3 - 4)
    - **C)** 8 * 2 + 3 - 4
    - **D)** 8 + 2 * 3 - 4

10. Which statement about arithmetic expression notations is FALSE?
    - **A)** Infix places each operator between its operands and may require parentheses to override default precedence
    - **B)** Postfix places each operator after its operands
    - **C)** Prefix and Postfix notations require parentheses whenever multiplication follows addition
    - **D)** Operator precedence and associativity affect how an infix expression converts into prefix or postfix

### Answer Key & Explanations

1. **D)** As stated in the Overview, arithmetic expression tokens consist of operands, operators, and grouping symbols.
2. **A)** Rule 1 of the Theoretical Framework notes that the order of the operands remains identical across Infix, Postfix, and Prefix notations.
3. **C)** Grouping symbols are needed in Infix to override default precedence, whereas Postfix and Prefix never include parentheses because operator position uniquely determines evaluation order.
4. **B)** In step 6 of the trace, `/` has the same precedence as `*` (and evaluates left-to-right), so `*` is popped to the Postfix output before `/` is pushed onto the stack.
5. **D)** In step 8, `-` has lower precedence than `/` and equal precedence to `+`, so both `/` and `+` are popped to Postfix (`1 2 3 * 4 / +`) and `-` becomes the sole item on the stack.
6. **A)** `(A + B)` converts to `A B +`; multiplying by `C` yields `A B + C *`; subtracting `D` yields `A B + C * D -` (preserving operand order `A, B, C, D`).
7. **C)** Multiplication binds tighter than addition (`b * c` becomes `* b c`), and adding `a` on the left places `+` before `a` and `* b c`, giving `+ a * b c`.
8. **B)** Inside the parentheses, `C / D` (`C D /`) takes precedence over `B + ...` (`B C D / +`), and multiplying by `A` appends `*` at the end: `A B C D / + *`.
9. **D)** Evaluating `8 2 3 * + 4 -` multiplies `2 * 3` first, adds `8` (`8 + 2 * 3`), and then subtracts `4`, yielding `8 + 2 * 3 - 4`.
10. **C)** Grouping symbols (parentheses) never appear in Prefix or Postfix notations; precedence is captured solely by operator ordering.

## References & Navigation

- **Previous Topic:** [[Stack Operations and Applications]]
- **Next Topic:** [[Queues]]
- **Related Notes:** [[Supplement-Infix-to-Postfix]], [[Stack Operations and Applications]]
