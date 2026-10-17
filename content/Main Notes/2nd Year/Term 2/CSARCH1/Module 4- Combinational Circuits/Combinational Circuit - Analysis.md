---
id: combinational_circuit___analysis
type: note
course: CSARCH1
topic: Combinational Circuit - Analysis
status: completed
---

# Combinational Circuit - Analysis

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSARCH1]] #[[Problem Solving]] #[[M4]]

---

## Overview
This sub-module discusses the analysis procedure for combinational circuits.
Objective: Learn how to analyze combinational circuits.

## Concepts & Definitions

### Combinational Circuits
A combinational logic circuit has:
- A set of $m$ Boolean inputs.
- A set of $n$ Boolean outputs.
- $n$ switching functions, each mapping the $2^m$ input combinations to an output such that the current output depends **only on the current input values** (no memory or feedback).

## Analysis Procedure
The objective of analysis is to obtain output Boolean functions or truth tables from logic diagrams.

### Deriving Boolean Functions
1. **Label Inputs/Outputs:** Label all gate outputs that are a function of input variables. Determine the Boolean functions for each gate output.
2. **Intermediate Labels:** Label the gates that are a function of input variables and previously labeled gates. Find the Boolean functions for these gates.
3. **Iterate:** Repeat step 2 until the outputs of the circuit are obtained.
4. **Substitution:** By repeated substitution of previously defined intermediate functions, obtain output Boolean functions in terms of input variables alone.

### Deriving the Truth Table
1. **Determine Input Combinations:** For $n$ inputs, form $2^n$ possible input combinations (i.e., binary numbers from 0 to $2^n - 1$).
2. **Label Gates:** Label the outputs of selected gates.
3. **Evaluate Simple Gates:** Obtain truth table columns for outputs of gates which are functions of the input variables only.
4. **Evaluate Downstream Gates:** Proceed to obtain truth table columns for outputs of gates which are functions of previously defined values until columns for all outputs are determined.

## Multiple Choice Questions

1. What defines a combinational logic circuit?
- **A)** The current output depends on both current and past inputs
- **B)** The current output depends only on the current input values
- **C)** It contains memory elements to store state
- **D)** It relies heavily on a clock signal to synchronize operations

2. In analyzing a combinational circuit, what is the first step according to the standard procedure?
- **A)** Derive the truth table immediately
- **B)** Simulate the circuit using Verilog
- **C)** Label all gate outputs that are a function of input variables and determine their Boolean functions
- **D)** Assign random states to test for stability

3. To obtain the output Boolean functions in terms of the input variables alone, what mathematical process is repeatedly used?
- **A)** Differentiation
- **B)** Integration
- **C)** Repeated substitution of previously defined intermediate functions
- **D)** Factoring into prime implicants

4. How many possible input combinations exist for a combinational circuit with 'n' Boolean inputs?
- **A)** 2*n
- **B)** n^2
- **C)** 2^n
- **D)** n!

5. What is the purpose of deriving a truth table during combinational circuit analysis?
- **A)** To find out the physical size of the circuit
- **B)** To define the exact relationship between all possible inputs and the corresponding outputs
- **C)** To determine the cost of the circuit implementation
- **D)** To identify the propagation delay of the gates

6. When labeling intermediate gate outputs during analysis, which gates should be evaluated next?
- **A)** Gates that function based solely on previously defined labels and input variables
- **B)** The final output gates only
- **C)** The gates with the highest propagation delay
- **D)** Only the NOT gates

7. Which of the following is NOT a characteristic of a purely combinational circuit?
- **A)** A set of m Boolean inputs
- **B)** A set of n Boolean outputs
- **C)** Internal feedback loops
- **D)** Logic gates mapping inputs to outputs

8. How are the input combinations for a truth table of n variables typically ordered?
- **A)** As binary numbers from 0 to (2^n - 1)
- **B)** From the highest binary number to 0
- **C)** Randomly, as long as all are covered
- **D)** Based on the Gray code sequence automatically

9. If an intermediate gate G1 is defined as G1 = A AND B, and output F is defined as F = G1 OR C, what is F in terms of input variables?
- **A)** F = A AND B
- **B)** F = B OR C
- **C)** F = (A AND B) OR C
- **D)** F = (A OR B) AND C

10. Why do we analyze combinational circuits?
- **A)** To determine their functionality given a schematic diagram
- **B)** To add memory elements into the design
- **C)** To convert them into sequential circuits
- **D)** To physically build the circuit

### Answer Key & Explanations
1. **B)** A combinational circuit has no memory; outputs map directly from the current input combination.
2. **C)** Standard analysis begins by labeling and defining expressions for gates tied directly to inputs.
3. **C)** Final output equations are formed by plugging earlier intermediate equations into downstream gate equations.
4. **C)** An 'n' bit binary input provides 2^n distinct combinations (from 0 to 2^n - 1).
5. **B)** The truth table fully documents the circuit's functionality by showing the output for every input combination.
6. **A)** Analysis moves sequentially from inputs to outputs, analyzing gates whose inputs are now known.
7. **C)** Purely combinational circuits do not use internal feedback loops (which are indicative of sequential memory).
8. **A)** Input combinations count up sequentially in standard binary format from 0 to max.
9. **C)** Substituting G1 directly yields F = (A AND B) OR C.
10. **A)** Analysis starts with a given diagram/circuit and aims to understand its logical operation.

## References & Navigation

- **Previous Topic:** [[Summary of Verilog Syntax]]
- **Next Topic:** [[Combinational Circuit - Design]]
- **Related Notes:** [[Combinational Circuit - Design]]