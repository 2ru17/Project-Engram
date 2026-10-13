---
id: Handout_10_-_Infix,_Postfix,_Prefix
type: note
course: CCDSALG
topic: Infix, Postfix, Prefix
status: completed
---

# Infix, Postfix, Prefix

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CCDSALG]] #[[Infix, Postfix, Prefix]] #[[Conceptual]] #[[M3]]

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


## References & Navigation

- **Related Notes:** [[Infix, Postfix, and Prefix Expressions]]
