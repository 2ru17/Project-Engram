---
id: combinational_circuit___nand_nor
type: note
course: CSARCH1
topic: Combinational Circuit - NAND_NOR
status: completed
---


**Tags:** #[[Computer Science]] #[[CSARCH1]] #[[Computer Architecture]] #[[Combinational Circuits]] #[[Combinational Circuit - NAND NOR]]

---

# Combinational Circuit - NAND/NOR

## Overview
This sub-module discusses how to implement combinational circuits using NAND/NOR gates.
**Objective:** Learn how to implement combinational circuits using NAND/NOR gates.

## Universal Gates
NAND and NOR gates are easier to fabricate with electronic components and are the basic gates used in all IC digital logic families.
- NAND and NOR gates are known as **universal gates** because they can be used to implement any Boolean function.

## Logic Gate Conversions
- **NAND gate representation of AND gate:** Add an inverter to the output line.
- **NAND gate representation of OR gate:** Add inverters to all input lines.
- **NAND gate representation of NOT gate:** Tie both inputs of a NAND gate together.
- **NOR gate representation of OR gate:** Add an inverter to the output line.
- **NOR gate representation of AND gate:** Add inverters to all input lines.
- **NOR gate representation of NOT gate:** Tie both inputs of a NOR gate together.

## NAND Implementation
The implementation of Boolean functions with NAND gates requires that the functions be in **Sum-of-Products (SOP)** form.

### Two-level Implementation
Example: $F = AB + CD$

### Multi-level Implementation
Procedure for converting a multilevel AND-OR circuit into an all-NAND gate circuit:
1. Convert all AND gates to NAND gates with AND-invert graphic symbols.
2. Convert all OR gates to NAND gates with invert-OR graphic symbols.
3. Check all the bubbles in the diagram. For each bubble that is not compensated by another small circle along the same line, insert an inverter (a one-input NAND gate) or complement the input literal.

## NOR Implementation
The implementation of Boolean functions with NOR gates requires that the functions be in **Product-of-Sums (POS)** form.

### Two-level Implementation
Example: $F = (A+B)(C+D)E$

### Multi-level Implementation
Procedure for converting a multilevel OR-AND circuit into an all-NOR gate circuit:
1. Convert all OR gates to NOR gates with OR-invert graphic symbols.
2. Convert all AND gates to NOR gates with invert-AND graphic symbols.
3. Check all the bubbles in the diagram. For each bubble that is not compensated by another small circle along the same line, insert an inverter (a one-input NOR gate) or complement the input literal.

## Multiple Choice Questions

1. Why are NAND and NOR gates known as universal gates?
    - **A)** They can be used to implement any Boolean function.
    - **B)** They are the only gates available in IC packages.
    - **C)** They take universally accepted voltage levels.
    - **D)** They have universal delay characteristics.

2. The implementation of Boolean functions with NAND gates requires the function to be in what form?
    - **A)** Product-of-Sum
    - **B)** Sum-of-Product
    - **C)** Canonical Product
    - **D)** Minimized XOR form

3. The implementation of Boolean functions with NOR gates requires the function to be in what form?
    - **A)** Sum-of-Product
    - **B)** Product-of-Sum
    - **C)** Factored form
    - **D)** Complemented form

4. What is the first step in converting a multilevel AND-OR circuit into an all NAND gate circuit?
    - **A)** Convert all AND gates to NAND gates with AND-invert graphic symbols
    - **B)** Convert all OR gates to NAND gates with invert-OR graphic symbols
    - **C)** Add inverters to all inputs
    - **D)** Complement the output

5. In converting a multilevel OR-AND to an all NOR circuit, what must be done to unmatched bubbles?
    - **A)** Insert an inverter (a one-input NOR gate) or complement the input literal
    - **B)** Replace the bubble with an AND gate
    - **C)** Simply ignore the bubble as it cancels out
    - **D)** Change the overall function to Sum-of-Products

### Answer Key & Explanations

1. **A**. NAND and NOR gates are known as universal gates because any Boolean function can be implemented using only them.
2. **B**. The notes explicitly state that implementation with NAND gates requires the function to be in sum-of-product form.
3. **B**. The implementation with NOR gates requires the function to be in product-of-sum form.
4. **A**. The procedure specifies converting all AND gates to NAND gates using AND-invert graphic symbols as the first step.
5. **A**. Unmatched bubbles must be compensated by inserting an inverter or complementing the input literal.

## References & Navigation

- **Previous Topic:** [[Combinational Circuit - Multiplexer]]
- **Next Topic:** [[Combinational Circuit - Tri state gates]]
