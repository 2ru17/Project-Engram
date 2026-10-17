---
id: boolean_algebra
type: note
course: CSARCH1
topic: Boolean Algebra
status: completed
---

# Boolean Algebra

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSARCH1]] #[[Problem Solving]] #[[M3]]

---

## Overview
This module discusses how to manipulate Boolean functions using Boolean algebra.
The objectives are:
- Learn how to represent Boolean functions in canonical form.
- Learn how to represent Boolean functions in standard form.
- Learn how to simplify Boolean functions using Boolean algebra.
- Learn how to obtain the complement of a Boolean function.

## Important Concepts & Definitions

### Boolean Function
A Boolean function is an expression formed with binary variables, binary or unary operators, parentheses, and an equal sign. It evaluates to either 1 or 0.
Example: $F = \bar{X}\bar{Y}Z + X\bar{Y}\bar{Z} + \bar{X}YZ + X\bar{Y}Z$

### Literal
A literal can either be a primed or unprimed variable. It is represented by each appearance of a variable or its complement in any given Boolean expression.
- Input to a gate.
- Gate = term.
Example: $F = \bar{X}\bar{Y}Z + \bar{X}YZ + X\bar{Y}\bar{Z} + X\bar{Y}Z$ has 3 variables, 12 literals, and 4 terms.

### Minterm
A minterm is a complete representation of a single Boolean expression obtained from an AND term of n variables.
- A variable with a value of binary 0 is represented by a primed or complemented variable.
- A variable with a value of 1 is represented by an unprimed variable.
- It is denoted in the form $m_j$.

### Maxterm
A maxterm is a complete representation of a single Boolean expression obtained from an OR term of n variables.
- A variable with a value of binary 0 is represented by an unprimed variable.
- A variable with a value of 1 is represented by a primed or complemented variable.
- It is denoted in the form $M_j$.

## Canonical Forms

### Canonical Sum of Minterms
Expressed in the form of a Boolean function wherein you take all the binary 1’s in a given function from the truth table and express these 1’s in the form of minterms and sum them up.
Example: 
$F = \bar{X}\bar{Y}Z + \bar{X}YZ + X\bar{Y}\bar{Z} + X\bar{Y}Z$
$F = m_1 + m_3 + m_4 + m_5 = \Sigma m(1,3,4,5)$

### Canonical Product of Maxterms
Expressed in the form of a Boolean function wherein you take all the binary 0’s in a given function from the truth table and express these 0’s in the form of maxterms and get their product.
Example: 
$F = (X + Y + Z)(X + \bar{Y} + Z)(\bar{X} + \bar{Y} + Z)(\bar{X} + \bar{Y} + \bar{Z})$
$F = M_0 \cdot M_2 \cdot M_6 \cdot M_7 = \Pi M(0,2,6,7)$

## Standard Forms

### Standard Sum of Products (SOP)
A simplified Boolean expression containing AND terms (product terms) of one or more literals. The sum denotes the OR-ing of these terms.
Example: $F = xy + xz$ or $F = x + yz$

### Standard Product of Sums (POS)
A simplified Boolean expression containing OR terms (sum terms) of one or more literals. The product denotes the AND-ing of these terms.
Example: $F = (x+y)(x+z)$ or $F = x(y+z)$

### Non-Standard Form
A Boolean expression that could not be further simplified into SOP or POS form.
Example: $F = (ab+cd)(\bar{a}\bar{b} + \bar{c}\bar{d})$

## Boolean Algebra

### Axioms
1. $0 \cdot 0 = 0$
2. $0 \cdot 1 = 0$
3. $1 \cdot 0 = 0$
4. $1 \cdot 1 = 1$
5. $0 + 0 = 0$
6. $0 + 1 = 1$
7. $1 + 0 = 1$
8. $1 + 1 = 1$
9. $\bar{0} = 1$
10. $\bar{1} = 0$

### Duality Principle
Every algebraic expression is deducible from the postulates of Boolean Algebra. It remains valid if the operators and identity of its elements are interchanged:
- $+$ becomes $\cdot$
- $\cdot$ becomes $+$
- $0$ becomes $1$
- $1$ becomes $0$

### Theorems of One Variable
1. **Operations with 0 & 1:** $X \cdot 0 = 0$; $X + 1 = 1$; $X \cdot 1 = X$; $X + 0 = X$
2. **Idempotent laws:** $X \cdot X = X$; $X + X = X$
3. **Law of complementarity:** $X \cdot \bar{X} = 0$; $X + \bar{X} = 1$
4. **Involution Law:** $\overline{\overline{X}} = X$

### Theorems of Many Variables
5. **Commutative Law:** $X \cdot Y = Y \cdot X$; $X + Y = Y + X$
6. **Distributive Law:** $X \cdot Y + X \cdot Z = X \cdot (Y+Z)$; $(X+Y)(X+Z) = X + Y \cdot Z$
7. **Associative Law:** $(X \cdot Y) \cdot Z = X \cdot (Y \cdot Z)$; $(X+Y)+Z = X+(Y+Z)$
8. **Absorption Law:** $X \cdot (X+Y) = X$; $X + X \cdot Y = X$
9. **Identity:** $X \cdot \bar{X} + Y = X \cdot Y$; $X + \bar{X}Y = X + Y$
10. **De Morgan’s Law:** $\overline{X \cdot Y} = \bar{X} + \bar{Y}$; $\overline{X + Y} = \bar{X} \cdot \bar{Y}$
11. **Consensus Theorem:** $XY + \bar{X}Z + YZ = XY + \bar{X}Z$; $(X+Y)(\bar{X}+Z)(Y+Z) = (X+Y)(\bar{X}+Z)$
12. **Simplification Theorem:** $X + XY = X$; $X(X+Y) = X$
13. **Theorem of Multiplying Out & Factoring:** $(X+Y)(\bar{X}+Z) = XZ + \bar{X}Y$; $XY + \bar{X}Z = (X+Z)(\bar{X}+Y)$

## Complement of a Function
The complement of a function $\bar{F}$ can be obtained in two ways:
1. Use De Morgan’s theorem.
2. Get the dual of the function and then complement each literal.

## Conversion of Forms
- **Sum of Minterm $\leftrightarrow$ Product of Maxterm:** Take the missing indices.
- **Sum of Minterm $\rightarrow$ Sum of Product:** Use simplification.
- **Sum of Product $\rightarrow$ Sum of Minterm:** Complete all variables using truth tables.
- **Product of Maxterm $\rightarrow$ Product of Sum:** Use simplification.
- **Product of Sum $\rightarrow$ Product of Maxterm:** Complete all variables using truth tables.
- **Sum of Product $\leftrightarrow$ Product of Sum:** Use distributive property, Theorem of Multiplying Out & Factoring.

## Multiple Choice Questions

1. What is a "literal" in the context of a Boolean expression?
- **A)** An integer value of 0 or 1
- **B)** Each appearance of a variable or its complement
- **C)** The final output of the logic gate
- **D)** A grouping of terms joined by an OR operator

2. A minterm is obtained from which type of operation on n variables?
- **A)** OR term
- **B)** AND term
- **C)** XOR term
- **D)** NOT term

3. In a maxterm, how is a variable with a value of binary 1 represented?
- **A)** As an unprimed variable
- **B)** As a primed or complemented variable
- **C)** As a 0
- **D)** As a don't-care condition

4. The canonical sum of minterms is obtained by taking which values from a truth table?
- **A)** All the binary 0s
- **B)** All the binary 1s
- **C)** Only the prime implicants
- **D)** The don't-care terms

5. What is the Standard Sum of Product (SOP)?
- **A)** A simplified Boolean expression containing OR terms, AND-ed together
- **B)** A single minterm encompassing all variables
- **C)** A simplified Boolean expression containing AND terms, OR-ed together
- **D)** An unsimplified Boolean equation with parentheses

6. According to the axioms of Boolean Algebra, what is the result of 1 + 1?
- **A)** 0
- **B)** 1
- **C)** 2
- **D)** 10

7. The duality principle states that an algebraic expression remains valid if we interchange:
- **A)** AND with OR, and 0 with 1
- **B)** NOT with AND, and 1 with 0
- **C)** Variables with their complements
- **D)** Positive logic with negative logic

8. Which theorem states that X + X•Y = X?
- **A)** Commutative Law
- **B)** Distributive Law
- **C)** Absorption Law
- **D)** De Morgan's Law

9. According to De Morgan's Law, what is the equivalent of the expression (X•Y)'?
- **A)** X' • Y'
- **B)** X + Y
- **C)** X' + Y'
- **D)** (X+Y)'

10. What is one valid method to obtain the complement of a function?
- **A)** Multiply all terms by 1
- **B)** Divide the function by 0
- **C)** Get the dual of the function and then complement each literal
- **D)** Swap all variables with their adjacent letters

### Answer Key & Explanations
1. **B)** A literal represents each individual appearance of a variable, whether it is primed or unprimed.
2. **B)** A minterm is defined as a complete representation obtained from an AND term of all n variables.
3. **B)** In maxterm representation, the rule is inverted: binary 1 is represented by a primed variable.
4. **B)** Canonical sum of minterms focuses on the combinations that produce a binary 1 in the truth table.
5. **C)** Sum of Product implies that product terms (AND terms) are summed (OR-ed) together.
6. **B)** In Boolean algebra, 1 + 1 evaluates to 1, as '+' represents the logical OR operation.
7. **A)** The duality principle involves swapping the operators (+ and •) and the identity elements (0 and 1).
8. **C)** This is the Absorption Law, which dictates that the larger term absorbs the smaller redundant one.
9. **C)** De Morgan's Law states that the complement of a product is the sum of the complements (X' + Y').
10. **C)** Complementing a function can be done either via De Morgan's theorem or by finding the dual and complementing all literals.

## References & Navigation

- **Previous Topic:** [[2x vs 10y Ambiguity-1]]
- **Next Topic:** [[Logic Gates]]
- **Related Notes:** [[Logic Gates]], [[Data Representation - Characters and Boolean]]