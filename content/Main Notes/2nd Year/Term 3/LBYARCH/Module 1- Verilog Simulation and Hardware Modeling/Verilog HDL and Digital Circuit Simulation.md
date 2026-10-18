---
id: verilog_hdl_and_digital_circuit_simulation
type: note
course: LBYARCH
topic: "Verilog HDL and Digital Circuit Simulation"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[LBYARCH]] #[[Conceptual]] #[[Verilog]] #[[Simulation]] #[[Code Snippets]]

---

## Overview
This note covers Verilog Hardware Description Language (HDL) and its application in digital circuit simulation. It introduces the fundamental concepts of hardware modeling, including behavioral and structural modeling, and explains how to create testbenches for simulating and verifying digital designs.

## Key Definitions
- **Verilog HDL:** A hardware description language used to model electronic systems.
- **Module:** The fundamental building block in Verilog, representing a logical unit of a design.
- **Testbench:** A Verilog module that instantiates the design under test (DUT) and applies stimuli to verify its functionality.
- **Behavioral Modeling:** Describes the system by its behavior or algorithm, often using `always` blocks.
- **Structural Modeling:** Describes the system by interconnecting primitive gates or other modules.
- **Continuous Assignment:** Used for modeling combinational logic, represented by the `assign` keyword.

## Theoretical Framework / Core Concepts

### Verilog Module Structure
A Verilog module defines the interface and internal logic of a hardware component.
```verilog
module <module_name> (
    input wire <input_ports>,
    output wire <output_ports>
);
    // Internal logic and structural instantiations
endmodule
```

### Modeling Styles
1. **Dataflow Modeling:** Uses continuous assignments to express boolean logic.
2. **Behavioral Modeling:** Employs procedural blocks (`initial`, `always`) to describe sequential and combinational logic functionally.
3. **Structural Modeling:** Instantiates lower-level modules and connects them using wires.

### Testbenches
A testbench is crucial for simulation. It does not have inputs or outputs but generates signals to drive the DUT.
- **Stimulus Generation:** Using `initial` blocks to apply sequences of inputs.
- **Monitoring:** Using `$monitor` or `$display` to observe changes in signals.

## Worked Examples / Protocol Walkthroughs / Calculations

### Example 1: 2-to-1 Multiplexer (Dataflow)
```verilog
module mux2to1 (
    input wire a,
    input wire b,
    input wire sel,
    output wire y
);
    assign y = sel ? b : a;
endmodule
```

### Example 2: D Flip-Flop (Behavioral)
```verilog
module d_ff (
    input wire clk,
    input wire rst,
    input wire d,
    output reg q
);
    always @(posedge clk or posedge rst) begin
        if (rst)
            q <= 1'b0;
        else
            q <= d;
    end
endmodule
```

### Example 3: Testbench for 2-to-1 Multiplexer
```verilog
`timescale 1ns / 1ps

module tb_mux2to1;
    reg a;
    reg b;
    reg sel;
    wire y;

    // Instantiate the DUT
    mux2to1 uut (
        .a(a),
        .b(b),
        .sel(sel),
        .y(y)
    );

    initial begin
        // Monitor signals
        $monitor("Time=%0t | sel=%b, a=%b, b=%b -> y=%b", $time, sel, a, b, y);
        
        // Stimulus
        a = 0; b = 0; sel = 0; #10;
        a = 1; b = 0; sel = 0; #10;
        a = 0; b = 1; sel = 1; #10;
        a = 1; b = 1; sel = 1; #10;
        
        $finish;
    end
endmodule
```

## Summary & Key Takeaways
- Verilog is a versatile HDL used for modeling and simulating digital circuits.
- Designs are constructed using modules, which can be modeled using dataflow, behavioral, or structural styles.
- Testbenches are essential for verifying the functionality of Verilog models through simulation.
- Proper use of blocking (`=`) and non-blocking (`<=`) assignments is critical in behavioral modeling.

## Multiple Choice Questions

1. What is the fundamental building block of a Verilog design?
    - **A)** Function
    - **B)** Task
    - **C)** Module
    - **D)** Block

2. Which keyword is used for continuous assignment in Verilog?
    - **A)** assign
    - **B)** always
    - **C)** initial
    - **D)** wire

3. In an `always` block modeling sequential logic, which assignment operator should be used?
    - **A)** `=`
    - **B)** `<=`
    - **C)** `==`
    - **D)** `:=`

4. What is the purpose of a testbench in Verilog?
    - **A)** To synthesize the design into hardware
    - **B)** To generate stimuli and verify the functionality of a module
    - **C)** To define the power requirements of a circuit
    - **D)** To optimize the logic gates in the design

5. Which modeling style uses instances of logic gates and modules?
    - **A)** Behavioral
    - **B)** Dataflow
    - **C)** Structural
    - **D)** Algorithmic

6. What does the `$monitor` system task do?
    - **A)** Stops the simulation
    - **B)** Displays text once when executed
    - **C)** Continuously tracks and prints specified variables when they change
    - **D)** Writes variables to a file

7. In a module declaration, which type is typically used for input ports?
    - **A)** reg
    - **B)** wire
    - **C)** logic
    - **D)** integer

8. What indicates a positive edge of a clock signal in a sensitivity list?
    - **A)** edge clk
    - **B)** posedge clk
    - **C)** negedge clk
    - **D)** rising clk

9. Which timescale directive means a time unit of 1 nanosecond and precision of 1 picosecond?
    - **A)** \`timescale 1ns / 1ps
    - **B)** \`timescale 1ps / 1ns
    - **C)** \`timescale 1ns - 1ps
    - **D)** \`timescale 1ns : 1ps

10. What is a key difference between `initial` and `always` blocks?
    - **A)** `initial` blocks run continuously, `always` blocks run once.
    - **B)** `initial` blocks are only used in testbenches, `always` blocks only in synthesis.
    - **C)** `initial` blocks execute once at time zero, `always` blocks execute continuously in a loop.
    - **D)** There is no difference; they are interchangeable.

### Answer Key & Explanations

1. **C**. A module is the principal design entity in Verilog, encapsulating structural and functional details.
2. **A**. The `assign` keyword specifies a continuous assignment, driving a value onto a wire.
3. **B**. Non-blocking assignments (`<=`) allow concurrent updates necessary for accurately modeling sequential logic like flip-flops.
4. **B**. Testbenches simulate the environment, providing inputs to the Design Under Test (DUT) to check its behavior.
5. **C**. Structural modeling builds a system by instantiating and connecting basic gates or other modules.
6. **C**. `$monitor` tracks variables in its argument list and prints their values whenever any of them changes.
7. **B**. Input ports are continuously driven from the outside, so they are typically declared as `wire`.
8. **B**. `posedge clk` specifies that the block should trigger on the rising edge of the clock signal.
9. **A**. `\`timescale 1ns / 1ps` sets the reference time unit to 1ns and the precision to 1ps.
10. **C**. An `initial` block starts at time 0 and runs exactly once, whereas an `always` block repeatedly executes throughout the simulation.

## References & Navigation

- **Next Topic:** [[Assembly Language and CPU Architecture Lab]]
- **Related Notes:** [[Introduction to Hardware Description Language]], [[Logic Gates]]
