---
id: logic_gates
type: note
course: CSARCH1
topic: Logic Gates
status: completed
---

# Logic Gates

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSARCH1]] #[[Conceptual]] #[[M3]]

---

## Overview
This sub-module discusses the logic gates used in digital systems.
Objective: Learn the different logic gates used in digital logic systems.

## Key Definitions

### Logic Gates & Boolean Expressions
- **Logic gates** are tools for expressing a given Boolean expression in a symbolic format.
- A **Boolean expression** is an equation in which the result will either be a 0 or 1.
- A **Boolean function** (logic function) is an expression formed with binary variables, binary or unary operators, parentheses, and an equal sign. Example: $F= \bar{X}\bar{Y}Z + X\bar{Y}\bar{Z}$.
- **1 value** means "True", "Correct", High, 5-volts.
- **0 value** means "False", "Incorrect", Low, 0-volt.

## Theoretical Framework: Gate Types

### AND Gate
- **Function:** "All or nothing" gate; outputs true only if ALL inputs are true. (Switches in series)
- **Expression:** $Y = A \cdot B$

### OR Gate
- **Function:** "Any or all" gate; outputs true if at least one input is true. (Switches in parallel)
- **Expression:** $Y = A + B$

### NOT Gate (Inverter)
- **Function:** Negates the input expression. Can only have one input at a time.
- **Expression:** $Y = A'$

### Buffer Gate
- **Function:** Transfer gate used to delay the output. Does not negate. Can only have one input.
- **Expression:** $Y = A$

### NAND Gate
- **Function:** Complement of the AND gate. Outputs false only if all inputs are true.
- **Expression:** $Y = (A \cdot B)'$

### NOR Gate
- **Function:** Complement of the OR gate. Outputs true only if all inputs are false.
- **Expression:** $Y = (A + B)'$

### XOR (Exclusive-OR) Gate
- **Function:** Odd function; outputs true if the input variables have an odd number of binary 1's.
- **Expression:** $Y = A \oplus B = A'B + AB'$

### XNOR (Equivalence) Gate
- **Function:** Even function; outputs true if the input variables have an even number of binary 0's (or identical inputs for 2 variables).
- **Expression:** $Y = (A \oplus B)' = AB + A'B'$

### Truth Table
- Represents a Boolean function showing the output for all possible input combinations.
- The number of rows is $2^n$ where $n$ is the number of variables.

## Multiple Choice Questions

1. What does a 1 value typically represent in a digital logic system?
    - **A)** "False"
    - **B)** "True"
    - **C)** 0-volt
    - **D)** Open switch

2. Which gate is known as the "all or nothing" gate because it only outputs true if ALL inputs are true?
    - **A)** OR gate
    - **B)** AND gate
    - **C)** XOR gate
    - **D)** NOR gate

3. How is the OR gate often referred to?
    - **A)** The "any or all" gate
    - **B)** The "all or nothing" gate
    - **C)** The "inverter" gate
    - **D)** The "equivalence" gate

4. What is the primary function of a NOT gate?
    - **A)** To multiply the input
    - **B)** To delay the output
    - **C)** To negate or invert the input expression
    - **D)** To add two inputs together

5. A Buffer gate is primarily used for what purpose?
    - **A)** To invert the signal
    - **B)** To delay an output of a given expression
    - **C)** To perform a logical AND
    - **D)** To check for odd parity

6. Which gate is the exact complement of the AND gate?
    - **A)** NOR
    - **B)** XOR
    - **C)** XNOR
    - **D)** NAND

7. The NOR gate outputs a true condition ONLY under what circumstance?
    - **A)** If all of its inputs are true
    - **B)** If all of its inputs are false
    - **C)** If at least one input is true
    - **D)** If it receives an odd number of 1s

8. Which gate outputs a true condition if the input variables have an odd number of binary 1s?
    - **A)** AND gate
    - **B)** OR gate
    - **C)** XOR gate
    - **D)** XNOR gate

9. The XNOR gate is also known by what other name?
    - **A)** Equivalence gate
    - **B)** Inverter
    - **C)** Transfer gate
    - **D)** Any-or-all gate

10. How many rows are required in a truth table for a logic circuit with 'n' input variables?
    - **A)** 2 * n
    - **B)** n^2
    - **C)** 2^n
    - **D)** 10^n

### Answer Key & Explanations

1. **B**. A binary 1 generally corresponds to "True", "Correct", High, or 5-volts.
2. **B**. The AND gate requires every single input condition to be true to output true.
3. **A**. The OR gate acts as an "any or all" gate because a single true input forces the output to be true.
4. **C**. The NOT gate, or inverter, flips a 1 to a 0 and a 0 to a 1.
5. **B**. A buffer (or transfer) gate does not change the logic state but acts to delay the signal.
6. **D**. The NAND gate produces the exact opposite truth table outputs of the AND gate.
7. **B**. The NOR gate is the inverse of the OR gate, outputting true only when there are no true inputs.
8. **C**. The Exclusive-OR (XOR) gate serves as an odd function, outputting true when an odd number of inputs are true.
9. **A**. XNOR outputs true for an even number of 0s (often identical inputs), giving it the name equivalence gate.
10. **C**. The size of a truth table grows exponentially, defined by 2^n.

## References & Navigation

- **Previous Topic:** [[Boolean Algebra]]
- **Next Topic:** [[Karnaugh Map]]
- **Related Notes:** [[Boolean Algebra]], [[Combinational Circuit - Design]]