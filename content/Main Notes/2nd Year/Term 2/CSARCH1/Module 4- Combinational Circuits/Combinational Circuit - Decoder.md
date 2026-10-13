---
id: combinational_circuit___decoder
type: note
course: CSARCH1
topic: Combinational Circuit - Decoder
status: completed
---


**🏷️ Tags:** #[[Computer Science]] #[[CSARCH1]] #[[Computer Architecture]] #[[Combinational Circuits]] #[[Combinational Circuit - Decoder]]

---

# Combinational Circuit - Decoder

## Overview
This sub-module discusses how to implement combinational circuits using decoders.
**Objective:** Learn how to implement combinational circuits using decoders.

## Definitions
**Decoders:** 
- A combinational circuit that converts binary information from $n$ input lines to a maximum of $2^n$ unique output lines.
- If $n$-bit coded information has unused combinations, the decoder may have fewer than $2^n$ outputs.
- Decoders generate $2^n$ (or fewer) minterms of $n$ input variables.
- In general, decoders are called $n$-to-$m$-line decoders, where $m \le 2^n$.
- Example: A three-to-eight-line decoder decodes 3 input variables into eight output lines (each representing one of the minterms).

## Types of Decoders
### Positive Output Decoder
A circuit capable of accepting an $n$-variable input and generating the corresponding output signal in one of the $2^n$ output lines.
- For each possible input combination, there are outputs that are equal to 0 and only one that is equal to 1.

### Negative Output Decoder
A circuit capable of accepting an $n$-variable input and generating the corresponding output signal in one of the $2^n$ output lines.
- The active output is 0, while all other outputs are 1.

## Guidelines in Implementing Functions Using Decoders
- **Positive Input, Positive Output:**
  - $\sum$: use OR gate
  - $\prod$: use NOR gate
- **Positive Input, Negative Output:**
  - $\sum$: use NAND gate
  - $\prod$: use AND gate

## Combinational Logic Implementation using Decoders
A decoder provides the $2^n$ minterms of $n$ input variables. 
Example: Implementation of a full-adder with a decoder.

## Decoders with Enable Inputs
Example: Two-to-four-line decoder (constructed with NAND gates) with an enable input.
- Circuit has complemented outputs.
- Circuit is disabled when Enable (E) is equal to 1, regardless of the values of the other two inputs.

## Forming Larger Decoders
Decoders can be combined to form larger ones.
Example: 4-to-16-line decoder constructed with two 3-to-8-line decoders.
- When $w = 0$, the top decoder is enabled.
- When $w = 1$, the bottom decoder is enabled.

**Additional Note:** 
A decoder with an enable input can function as a demultiplexer (a circuit that receives information from a single line and directs it to one of $2^n$ possible output lines).
- $w$ is taken as the data input.
- $x, y,$ and $z$ are taken as the selection inputs.

## Multiple Choice Questions

1. A combinational circuit that converts binary information from n input lines to a maximum of 2^n output lines is called a:
    - **A)** Multiplexer
    - **B)** Encoder
    - **C)** Decoder
    - **D)** Flip-flop

2. How many output lines does a three-to-eight-line decoder have?
    - **A)** 3
    - **B)** 8
    - **C)** 16
    - **D)** 24

3. In a standard positive output decoder, how many outputs are active (equal to 1) for any valid input combination?
    - **A)** 0
    - **B)** 1
    - **C)** Half of them
    - **D)** All of them

4. A decoder generates what specific terms of the input variables?
    - **A)** Maxterms
    - **B)** Prime implicants
    - **C)** Minterms
    - **D)** Don't cares

5. When implementing a Boolean function with a positive input/positive output decoder, which logic gate is used to combine the minterms?
    - **A)** AND gate
    - **B)** OR gate
    - **C)** NAND gate
    - **D)** XOR gate

6. In a negative output decoder, what is the output state of the selected line?
    - **A)** 1
    - **B)** 0
    - **C)** High-Z
    - **D)** Unknown

7. When constructing a larger 4-to-16-line decoder using two 3-to-8-line decoders, how is the most significant bit (w) typically utilized?
    - **A)** It is ignored completely
    - **B)** It serves as the data input
    - **C)** It connects to the enable inputs to select between the two smaller decoders
    - **D)** It connects to all outputs

8. A decoder with an enable input can also function as a:
    - **A)** Multiplexer
    - **B)** Demultiplexer
    - **C)** Counter
    - **D)** Shift register

9. If implementing a positive input/negative output function using a sum of products (SOP), which gate should collect the decoder outputs?
    - **A)** AND
    - **B)** OR
    - **C)** NOR
    - **D)** NAND

10. For a 2x4 decoder, what is the logical expression for the output m3 if the inputs are x and y?
    - **A)** x + y
    - **B)** x'y'
    - **C)** xy
    - **D)** x XOR y

### Answer Key & Explanations
1. **C)** A decoder explicitly takes n inputs and decodes them into up to 2^n unique combinations.
2. **B)** The name implies the structure: 3 inputs decoded into 8 specific output lines.
3. **B)** Each input combination is unique, causing only one specific minterm output line to go high (1).
4. **C)** Decoders output the fundamental minterms (e.g., m0, m1) for the given input variables.
5. **B)** Since minterms are essentially product terms, summing (OR-ing) them together builds the SOP function.
6. **B)** Negative output means the active selected line gets driven low (0), while unselected lines remain high.
7. **C)** The MSB determines whether the input belongs to the upper or lower half of combinations, acting as an enable toggle.
8. **B)** By treating the enable as the data input and the normal inputs as select lines, it demultiplexes data.
9. **D)** According to the guidelines, positive input/negative output decoders implement sum functions (SOP) via a NAND gate.
10. **C)** Output m3 represents the condition where both inputs are 1, translating to x AND y (xy).

## References & Navigation

- **Previous Topic:** [[Combinational Circuit - Design]]
- **Next Topic:** [[Combinational Circuit - Multiplexer]]
