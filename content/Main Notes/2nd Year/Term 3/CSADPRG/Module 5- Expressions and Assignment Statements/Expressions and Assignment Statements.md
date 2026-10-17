---
id: 5_expressions_and_assignment_statements
type: note
course: CSADPRG
topic: "5 - Expressions and Assignment Statements"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSADPRG]] #[[Conceptual]] #[[Expressions and Assignment Statements]]

## Overview
This module explores the fundamental concepts of expressions and assignment statements in programming languages. It details the mechanisms governing operand evaluation, including operator precedence, associativity, and the implications of function side effects. Furthermore, the module discusses type conversions (coercion), short-circuit evaluation, relational and Boolean expressions, and the varied implementations of assignment statements across different programming paradigms.

## Key Definitions
- **Expression**: A foundational construct in programming used to specify computations, typically consisting of operators, operands, parentheses, and function calls.
- **Operator Precedence**: The rules that define the order in which adjacent operators of different precedence levels are evaluated (e.g., multiplication before addition).
- **Operator Associativity**: The rules that define the order in which adjacent operators of the same precedence level are evaluated (typically left-to-right, with exceptions like right-to-left for exponentiation).
- **Function Side Effect**: Occurs when a function modifies one of its parameters or a global variable, potentially altering the outcome of an expression depending on evaluation order.
- **Overloading**: Using a single operator symbol for multiple purposes (e.g., `+` for arithmetic addition and string concatenation).
- **Coercion**: Implicit type conversion initiated by the compiler or runtime system. 
  - *Narrowing conversion* is generally unsafe (e.g., `double` to `float`).
  - *Widening conversion* is generally safe (e.g., `int` to `float`).
- **Short-circuit Evaluation**: A strategy where the result of an expression is determined without evaluating all operands or operators, improving efficiency and preventing certain runtime errors.
- **Compound Assignment Operator**: A shorthand notation that modifies a variable's value and assigns the result back to that same variable.

## Theoretical Framework / Concepts

### Arithmetic Expressions
Inheriting heavily from mathematical conventions, the primary goal of arithmetic expressions in high-level languages is automatic evaluation. Operators can be unary (one operand), binary (two operands), or ternary (three operands). While most imperative languages use infix notation (operators between operands), some languages like LISP utilize prefix notation.

### Design Issues
When designing a language's expression evaluation, several issues must be addressed:
- Precedence and associativity rules.
- The specific order of operand evaluation.
- Restrictions on side effects during evaluation.
- Whether user-defined operator overloading is permitted.
- Rules regarding type mixing (mixed-mode expressions).

### Operand Evaluation Order and Side Effects
In an expression, variables and constants are fetched from memory. Parenthesized expressions are evaluated first. A significant issue arises with **function side effects**. If an operand is fetched before a function call that modifies it, the result will differ from if it were fetched after.
- **Solutions**: Functional programming eliminates this by lacking mutable variables. Imperative languages can enforce strict evaluation orders (which harms optimization) or disallow certain side effects (which harms writability).

### Relational and Boolean Expressions
Relational expressions compare operands and evaluate to a Boolean value; they generally possess lower precedence than arithmetic operators. Boolean expressions utilize operators like AND, OR, and NOT. Historically, languages like C (prior to C99) lacked a dedicated Boolean type, using `0` for false and non-zero values for true.

### Errors in Expressions
- **Type Errors**: Prevented by strict type checking, but coercion can sometimes mask them.
- **Arithmetic Limitations**: Issues like integer overflow or underflow occur due to hardware limits.
- **Exceptions**: Run-time errors (like division by zero) that can be caught and recovered from, distinguishing them from fatal critical errors.

### Assignment Statements
Assignments dynamically change the binding of values to variables. 
- **Forms**: Can take the form of compound assignments (`+=`), unary assignments (`++`, `--`), or even multiple-target assignments (`($a, $b) = (1, 2)`).
- **As Expressions**: Treating assignments as expressions allows flexibility (e.g., `while ((ch = getchar()) != EOF)`) but can lead to side effects or reduced error detection (confusing `=` with `==`).
- **Functional Languages**: In pure functional languages, assignments do not mutate state; they merely bind names to values.

## Examples

**Prefix vs. Infix Notation**
- C (Infix): `1 + 2 * 3 - 4`
- LISP (Prefix): `(- (+ 1 (* 2 3)) 4)`

**Precedence and Associativity**
- Precedence: `a + b * c` evaluates multiplication first. `(a + b) * c` forces addition first.
- Associativity: `a - b - c` evaluates `a - b` first in Java/C (left-associative). In Python, `A ** B ** C` evaluates `B ** C` first (right-associative).

**Conditional Expressions (Ternary Operator)**
```c
// Using a conditional expression instead of an if-else block
average = (count == 0) ? 0 : sum / count;
```

**Function Side Effects**
```c
int a = 5;
int fun1() {
    a = 17;
    return 3;
}
void main() {
    // If 'a' is fetched before 'fun1' runs, result is 5 + 3 = 8
    // If 'a' is fetched after 'fun1' runs, result is 17 + 3 = 20
    a = a + fun1(); 
}
```

**Short Circuit Evaluation**
```java
index = 0;
// If short-circuiting is supported, index < listlen prevents an out-of-bounds error
// on list[index] when index reaches listlen.
while ((index < listlen) && (list[index] != key)) {
    index = index + 1;
}
```

**Assignment as an Expression**
```c
// The assignment ch = getchar() yields the character read, 
// which is then compared to EOF.
while ((ch = getchar()) != EOF) {
    // ...
}
```

## Multiple Choice Questions

1. Which of the following is defined as a foundational construct in programming used to specify computations, typically consisting of operators, operands, parentheses, and function calls?
- **A)** Statement
- **B)** Keyword
- **C)** Expression
- **D)** Variable

2. What determines the order in which adjacent operators of different precedence levels are evaluated?
- **A)** Operator associativity
- **B)** Operator precedence
- **C)** Coercion
- **D)** Short-circuit evaluation

3. Which of the following describes a function side effect?
- **A)** A function returning multiple values
- **B)** A function executing without evaluating all operands
- **C)** A function modifying one of its parameters or a global variable
- **D)** A function automatically converting variable types

4. What is the term for using a single operator symbol for multiple purposes, such as using `+` for both arithmetic addition and string concatenation?
- **A)** Overloading
- **B)** Coercion
- **C)** Associativity
- **D)** Narrowing

5. Which type of implicit type conversion is generally considered safe?
- **A)** Narrowing conversion
- **B)** Widening conversion
- **C)** Mixed-mode conversion
- **D)** Overloaded conversion

6. Which evaluation strategy improves efficiency by determining the result of an expression without evaluating all operands or operators?
- **A)** Compound evaluation
- **B)** Associative evaluation
- **C)** Coercive evaluation
- **D)** Short-circuit evaluation

7. In imperative languages, what issue arises when an operand is fetched before a function call that modifies it?
- **A)** Integer overflow
- **B)** Narrowing conversion
- **C)** Unpredictable outcome due to function side effects
- **D)** Fatal critical error

8. Which operator type is used when an expression evaluates to a Boolean value and generally possesses lower precedence than arithmetic operators?
- **A)** Compound assignment operators
- **B)** Ternary operators
- **C)** Relational operators
- **D)** Unary operators

9. What is a potential drawback of treating assignments as expressions?
- **A)** It prevents dynamic binding.
- **B)** It can lead to side effects or reduced error detection.
- **C)** It strictly enforces evaluation orders.
- **D)** It eliminates mutable variables.

10. In pure functional languages, what role do assignment statements play?
- **A)** They dynamically change the binding of values to variables and mutate state.
- **B)** They are used primarily for shorthand notation.
- **C)** They do not mutate state; they merely bind names to values.
- **D)** They are evaluated using short-circuit evaluation.

### Answer Key & Explanations

1. **C** - The document defines an expression as a foundational construct used to specify computations, consisting of operators, operands, etc.
2. **B** - Operator precedence defines the rules that dictate the order in which adjacent operators of different precedence levels are evaluated.
3. **C** - A function side effect occurs when a function modifies one of its parameters or a global variable, potentially altering expression outcomes.
4. **A** - Overloading refers to using a single operator symbol for multiple purposes, such as using `+` for addition and string concatenation.
5. **B** - The text states that a widening conversion (e.g., `int` to `float`) is generally safe, unlike a narrowing conversion which is unsafe.
6. **D** - Short-circuit evaluation determines the result without evaluating all operands, improving efficiency and preventing certain runtime errors.
7. **C** - Fetching an operand before a modifying function call causes side effects, where the result differs depending on the evaluation order.
8. **C** - Relational expressions compare operands to evaluate to a Boolean value and generally possess lower precedence than arithmetic operators.
9. **B** - Treating assignments as expressions allows flexibility but can lead to side effects or confusion (e.g., confusing `=` with `==`), reducing error detection.
10. **C** - In pure functional languages, assignments do not mutate state but merely bind names to values.

## References & Navigation

- **Previous Topic:** [[Data Types]]
- **Next Topic:** [[Statement Level Control Structures]]
- **Related Notes:** [[Statement Level Control Structures]]
