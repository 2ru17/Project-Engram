---
id: introduction_to_hardware_description_language
type: note
course: CSARCH1
topic: Introduction to Hardware Description Language
status: completed
---

# Introduction to Hardware Description Language

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSARCH1]] #[[Code Snippets]] #[[M3]]

---

## Overview
This sub-module discusses how to use Verilog Hardware Description Language (HDL).
The objectives are:
- Write Verilog HDL gate-level model and testbench for simple logic circuits.
- Write Verilog HDL user-defined model and testbench for simple logic circuits.
- Write Verilog HDL dataflow model and testbench for simple logic circuits.
- Write Verilog HDL behavioral model and testbench for simple logic circuits.
- Simulate and verify digital systems through timing diagrams using a waveform viewer.

## Hardware Description Language (HDL)
- Computer-based language that describes hardware of digital systems in textual form.
- Describes hardware structures and behavior of logic circuits.
- Can represent logic diagrams, truth tables, Boolean expressions, and complex abstractions of a digital system's behavior.
- Acts as a documentation language.
- HDL circuit models are simulated using a testbench to verify functionality before fabrication.
- Two standard HDLs (IEEE): Verilog (C-like syntax) and VHDL (Strongly-typed, non-C like, verbose).
- Popular Simulators: Icarus Verilog (iverilog, open-source), GTKWave (waveform viewer), Vitis/Vivado by Xilinx, Quartus II by Altera.

## Verilog Notations and Syntax
- **Case sensitive**, based on C.
- **Comments:** `//` for single-line, `/* */` for multi-line.
- **Separators:** `,` for list elements, `;` for statement terminators.
- **Values:** `0`, `1`, `x/X` (Unknown), `z/Z` (High impedance state).
- **Constants format:** `n'b[integer]` (e.g., `8'b00000001`), `n'h[integer]` (e.g., `8'hA9`).
- **Identifiers:** Scalars (`A`, `C`, `RUN`), Vectors (`sel[0:2]`, `SUM[15:0]`). Must start with an alphabet character or underscore.
- **Keywords:** lowercase (e.g., `module`, `endmodule`).
  - `module module_name (module_port, ...);` constructs design hierarchy. Cannot be nested.
- **Declarations:**
  - `input [range] identifiers;` (e.g., `input I0, I1;`, `input [7:0] A;`)
  - `output [range] identifiers;` (e.g., `output C4;`, `output [7:0] REG_in;`)

## iVerilog Command Line
- Compilation: `iverilog -o simple_circuit.vvp simple_circuit.v simple_circuit_tb.v`
- Execution: `vvp simple_circuit.vvp`
- Waveform Viewing: `gtkwave simple_circuit.vcd`

## Four Methods of Modeling

### 1. Gate-level Modeling
Describes a circuit by specifying its logic gates and interconnections (predefined primitives: `and`, `nand`, `or`, `nor`, `xor`, `not`, `buf`, tri-state logic: `bufif1`, etc.).
```verilog
`timescale 1ns / 1ps
module simple_circuit(D, E, A, B, C);
    input A, B, C;
    output D, E;
    wire w1;
    
    and G1(w1, A, B);
    not G2(E, C);
    or G3(D, w1, E);
endmodule
```

### 2. User-Defined Primitives (UDP)
Describes primitives at the truth table level. Defined outside the main module using `primitive ... endprimitive` and `table ... endtable`.
```verilog
primitive UDP_02467(D, A, B, C);
    output D;
    input A, B, C;
    table
    // A B C : D
       0 0 0 : 1;
       0 0 1 : 0;
       // ... other rows
    endtable
endprimitive
```

### 3. Dataflow Modeling
Describes circuits by their function rather than gate structure, using `assign` statements and operators (bitwise, logical, conditional).
```verilog
module simple_circuit_dataflow(D, E, A, B, C);
    input A, B, C;
    output D, E;
    
    assign D = (A & B) | ~C;
    assign E = ~C;
endmodule
```
- **Conditional operator:** `condition ? true-expression : false-expression;`

### 4. Behavioral Modeling
Describes circuits at an algorithmic and functional level using `always` blocks and procedural assignment statements. Output variables must be of `reg` data type. Statements execute when variables in the sensitivity list (`@`) change.
```verilog
module simple_circuit_behavior(D, E, A, B, C);
    input A, B, C;
    output reg D, E;
    
    always @(A, B, C) // or always @*
    begin
        D = (A & B) | ~C;
        E = ~C;
    end
endmodule
```

## Testbench Basics
A testbench generates stimulus to simulate logic values of inputs.
Template:
```verilog
module test_module_name;
    // Declare reg (inputs) and wire (outputs)
    // Instantiate module under test (dut)
    // Generate stimulus using initial or always
    // Use $display, $monitor to check outputs
    // Generate vcd file with $dumpfile and $dumpvars
endmodule
```

## Multiple Choice Questions

1. Which organization approved Verilog and VHDL as standard HDLs?
    - **A)** ANSI
    - **B)** ISO
    - **C)** IEEE
    - **D)** W3C

2. What serves as the fundamental building block for Verilog models?
    - **A)** function
    - **B)** module
    - **C)** primitive
    - **D)** architecture

3. In Verilog, what does the state 'Z' represent?
    - **A)** Zero
    - **B)** Unknown
    - **C)** High impedance state (open circuit)
    - **D)** Undefined variable

4. Which modeling method describes a circuit by specifying its gates and how they are connected?
    - **A)** Gate-level modeling
    - **B)** Dataflow modeling
    - **C)** Behavioral modeling
    - **D)** Switch-level modeling

5. What is the purpose of the 'wire' data type in Verilog gate-level modeling?
    - **A)** To define an input port
    - **B)** To hold a state value in sequential logic
    - **C)** To define the output of one gate that serves as input to another
    - **D)** To terminate the module

6. In a Verilog testbench, what data type is typically used for signals applied as inputs to the design module?
    - **A)** wire
    - **B)** reg
    - **C)** output
    - **D)** integer

7. How do you create User-Defined Primitives (UDPs) in Verilog?
    - **A)** By describing them using algorithmic always blocks
    - **B)** By defining them in tabular form (truth table) using primitive/endprimitive keywords
    - **C)** By grouping multiple pre-defined gates into a module
    - **D)** By importing a C library

8. Which keyword is primarily used in Dataflow modeling to assign values?
    - **A)** always
    - **B)** initial
    - **C)** assign
    - **D)** module

9. In Verilog, what is the result of the bitwise OR operation (1010) | (0000)?
    - **A)** 0000
    - **B)** 1010
    - **C)** 1
    - **D)** 0

10. Which statement block is used in Behavioral modeling to execute procedural assignments when variables change?
    - **A)** initial
    - **B)** assign
    - **C)** always
    - **D)** wire

### Answer Key & Explanations

1. **C**. The IEEE (Institute of Electronics and Electrical Engineers) approved both Verilog and VHDL as standards.
2. **B**. The 'module' is the fundamental unit used to construct design hierarchy in Verilog.
3. **C**. The 'z' or 'Z' state explicitly models a high impedance state, acting like an open circuit.
4. **A**. Gate-level modeling describes the explicit gates and their interconnections.
5. **C**. The 'wire' data type is used to connect outputs of components to inputs of others.
6. **B**. Inputs in a testbench must be manipulated within procedural blocks, requiring the 'reg' type.
7. **B**. UDPs are constructed using a truth table layout enclosed by the primitive and endprimitive keywords.
8. **C**. The 'assign' statement is central to dataflow modeling for continuous assignment.
9. **B**. A bitwise OR compares each bit directly, so 1010 | 0000 yields 1010.
10. **C**. The 'always' block triggers continuously based on its sensitivity list (the variables after the @ symbol).

## References & Navigation

- **Previous Topic:** [[Karnaugh Map]]
- **Next Topic:** [[Summary of Verilog Syntax]]
- **Related Notes:** [[Summary of Verilog Syntax]], [[Verilog HDL and Digital Circuit Simulation]]