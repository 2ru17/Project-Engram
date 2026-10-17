---
id: combinational_circuit___design
type: note
course: CSARCH1
topic: Combinational Circuit - Design
status: completed
---


**🏷️ Tags:** #[[Computer Science]] #[[CSARCH1]] #[[Computer Architecture]] #[[Combinational Circuits]] #[[Combinational Circuit - Design]]

---

# Combinational Circuit - Design

## Overview
This sub-module discusses the design procedure for combinational circuits.
**Objective:** Learn how to design a combinational circuit.

## Design Procedure
1. From circuit specifications, determine the required number of inputs and outputs and assign a symbol to each.
2. Derive the truth table that defines the relationship between inputs and outputs.
3. Obtain simplified Boolean functions for each output as a function of input variables (using tools like Karnaugh Maps).
4. Draw the logic diagram and verify the correctness of the design (manually or by simulation).

## Real World Examples

### Code Converter: BCD to Excess-3 code
A code converter is a circuit that makes two systems compatible even though each uses a different binary code.
- **Inputs:** $A, B, C, D$ with $A$ as MSB.
- **Outputs:** $w, x, y, z$ with $w$ as MSB.
*Excess-3 code is derived by adding 3 (0011 in binary) to the BCD code.*

### Majority Voting System
Classes will be suspended based on the vote of the Dean (D), Chairperson (C), Teacher (T), and Student (S).
- Dean's vote = 4 points
- Chairperson's vote = 3 points
- Teacher's vote = 2 points
- Student's vote = 1 point
Classes will be suspended ($F=1$) if there is a majority vote (sum of points $> 5$).

**Truth Table Highlights:**
- $F = \sum m(7, 10, 11, 12, 13, 14, 15)$
- **Simplified Boolean Equation:** $F = DC + DT + CTS$

## Multiple Choice Questions

1. What is the first step in the design procedure for a combinational circuit?
- **A)** Draw the logic diagram immediately
- **B)** From circuit specifications, determine the required number of inputs and outputs
- **C)** Derive the truth table
- **D)** Simplify the Boolean functions

2. After identifying inputs and outputs, what is the next step in combinational design?
- **A)** Simulate the circuit
- **B)** Write the HDL code
- **C)** Derive the truth table defining the relationship between inputs and outputs
- **D)** Wire up the breadboard

3. What is the purpose of deriving simplified Boolean functions in the design process?
- **A)** To make the truth table larger
- **B)** To reduce the number of logic gates needed, saving cost and space
- **C)** To increase the power consumption of the circuit
- **D)** To convert the circuit to sequential logic

4. What tool is commonly used to obtain the simplified Boolean functions from the truth table?
- **A)** Multiplexer
- **B)** Karnaugh Map (K-map)
- **C)** Decoder
- **D)** Flip-flop

5. What does a "Code Converter" combinational circuit do?
- **A)** It amplifies analog signals
- **B)** It converts the voltage level of the circuit
- **C)** It makes two systems compatible by translating one binary code into another
- **D)** It converts combinational circuits to sequential circuits

6. In a BCD to Excess-3 code converter, what happens to the binary input value?
- **A)** It is multiplied by 3
- **B)** 3 is added to the BCD value
- **C)** It is XORed with 3
- **D)** It is inverted

7. How many valid input combinations does a standard BCD (Binary Coded Decimal) input have?
- **A)** 8
- **B)** 10
- **C)** 12
- **D)** 16

8. In the vote example given (Dean=4, Chair=3, Teacher=2, Student=1), what condition causes classes to be suspended?
- **A)** Only if the Dean votes yes
- **B)** Only if everyone votes yes
- **C)** If the total sum of points from "yes" votes constitutes a majority (F=1)
- **D)** If the student votes no

9. In a truth table for a 4-input design problem, how many rows are required?
- **A)** 4
- **B)** 8
- **C)** 16
- **D)** 32

10. What is the final step in the formal combinational circuit design procedure?
- **A)** Memorize the Boolean function
- **B)** Draw the logic diagram and verify the correctness of the design
- **C)** Sell the circuit design
- **D)** Build a sequential state machine

### Answer Key & Explanations
1. **B)** Design begins conceptually by determining how many inputs are needed and what outputs must be generated.
2. **C)** The logical relationships are mapped out explicitly in a truth table.
3. **B)** Simplification leads directly to fewer logic gates, lowering complexity, size, and cost.
4. **B)** Karnaugh Maps are standard graphical tools for minimizing truth table logic into simplified SOP/POS forms.
5. **C)** Code converters act as translators between systems utilizing different binary representations (e.g., BCD to Excess-3).
6. **B)** Excess-3 literally adds binary 3 (0011) to the incoming binary value.
7. **B)** BCD only represents decimal digits 0-9, thus only 10 combinations are considered valid (the rest are don't-cares).
8. **C)** The problem specifies that a majority vote determines the F=1 outcome.
9. **C)** For n=4 inputs, there are 2^4 = 16 discrete row combinations.
10. **B)** Drawing the logic diagram provides the actual hardware schematic, which is then verified via trace or simulation.

## References & Navigation

- **Previous Topic:** [[Combinational Circuit - Analysis]]
- **Next Topic:** [[Combinational Circuit - Decoder]]
