---
id: csarch2_module_10_single_bus_datapath
type: note
course: CSARCH2
topic: "Processing Unit Organization & Single-Bus Datapath"
status: completed
---

# Module 10: Processing Unit Organization & Single-Bus Datapath

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Hardware Modeling]] #[[Processing Unit Organization & Single-Bus Datapath]]

---

## Overview

> The Central Processing Unit (CPU) is physically partitioned into the **Datapath** (the computational registers, multiplexers, and ALU networks) and the **Control Unit** (the finite state sequencer that emits timing control pulses). In a classic **Single-Bus CPU Organization**, all internal architectural registers, temporary registers, and functional units are interconnected via a single shared internal parallel bus. This module analyzes the structural topology of the single-bus datapath, formalizes tri-state gating invariants, defines the roles of specialized registers (PC, IR, MAR, MDR, Y, Z), and derives the universal 3-step Instruction Fetch sequence and execution phases.

## Key Definitions

- **Datapath:** The physical hardware network within the CPU responsible for storing, routing, and manipulating data operands (registers, ALU, internal buses, multiplexers).
- **Internal CPU Bus:** A shared parallel set of electrical wires inside the processor die that transfers data words between registers and the ALU.
- **Memory Address Register (MAR):** A specialized register connected directly to the external address bus, holding the memory address of the word being read or written.
- **Memory Data Register (MDR):** A dual-ported bidirectional buffer register that interfaces between the internal CPU bus and the external system memory data bus.
- **Temporary Register $Y$:** A dedicated register used to hold one of the ALU operands prior to execution, preventing bus contention during two-operand operations.
- **Temporary Register $Z$:** A dedicated output register that latches the combinational output of the ALU, preventing feedback loops into the internal bus before the clock cycle completes.
- **Tri-State Buffer:** A digital logic gate capable of three output states: Logic 0, Logic 1, and High-Impedance ($\text{High-}Z$ / Disconnected), allowing multiple register outputs to share a single physical bus wire safely.
- **WMFC (Wait for Memory Function Complete):** A control signal that pauses processor clock progression until the asynchronous memory subsystem asserts that read data is valid in the MDR or write data has been latched.

## Theoretical Framework / Core Concepts

### 1. Single-Bus Datapath Architectural Blueprint

In a single-bus processor architecture, all registers share a single internal parallel data bus:

```mermaid
flowchart TD
    subgraph CommonBus["Internal Processor Common Data Bus"]
        direction LR
        BusLine["Shared Parallel Internal CPU Bus"]
    end

    subgraph SystemRegs["Specialized Bus Registers"]
        PC["Program Counter (PC)"]
        IR["Instruction Register (IR)"]
        MAR["Memory Address Register (MAR)"]
        MDR["Memory Data Register (MDR)"]
    end

    subgraph DataRegs["Working Registers"]
        GPR["General Registers (R0 - Rn)"]
        RegY["Temporary Register Y"]
        RegZ["Temporary Register Z"]
    end

    subgraph ALUCore["ALU Core & Operands"]
        Mux["ALU Input Multiplexer"]
        ALU["Arithmetic Logic Unit (ALU)"]
    end

    subgraph ExtMemory["External Memory Bus"]
        AddrBus["External Address Bus"]
        DataBus["External Data Bus (Bidirectional)"]
    end

    PC <-->|"PC_out / PC_in"| BusLine
    IR <-->|"IR_out / IR_in"| BusLine
    MAR <--|"MAR_in"| BusLine
    MAR --> AddrBus
    MDR <-->|"MDR_out / MDR_in"| BusLine
    MDR <--> DataBus
    GPR <-->|"Rn_out / Rn_in"| BusLine
    RegY <--|"Y_in"| BusLine
    RegY -->|"Input A"| Mux
    Mux -->|"Operand A"| ALU
    BusLine -->|"Operand B (Direct from Bus)"| ALU
    ALU -->|"Latch Output"| RegZ
    RegZ -->|"Z_out"| BusLine
```

### 2. Tri-State Gating Invariants and Control Signals

Every register connected to the internal CPU bus is guarded by two control signals:
- **$R_{\text{in}}$ (Input Enable):** When asserted ($1$), the register latches the data currently present on the internal bus at the next active clock edge.
- **$R_{\text{out}}$ (Output Enable / Gate):** When asserted ($1$), the register's tri-state output buffer is enabled, placing its stored word onto the internal bus.

#### The Fundamental Bus Gating Invariant:
$$\sum \text{All Active } R_{\text{out}} \le 1 \quad \text{per clock cycle}$$

- **Rule 1:** At most **one** register or unit may assert $R_{\text{out}}$ onto the shared internal bus in any given clock cycle. If two registers assert $R_{\text{out}} = 1$ simultaneously, an electrical short-circuit (**bus contention**) occurs.
- **Rule 2:** **Multiple** registers may assert $R_{\text{in}} = 1$ in the exact same clock cycle, safely broadcasting a single data word from the bus into multiple destination registers simultaneously (e.g., $Z_{\text{out}}, PC_{\text{in}}, MAR_{\text{in}}$).

### 3. Purpose of Temporary Registers $Y$ and $Z$

In a single-bus datapath, performing an addition $R_1 + R_2 \to R_3$ requires two input operands to reach the ALU simultaneously:
1. Since there is only one internal bus, $R_1$ and $R_2$ cannot both be placed on the bus at the same time.
2. Therefore, $R_1$ is gated onto the bus and latched into **Temporary Register $Y$** in Cycle 1 ($R1_{\text{out}}, Y_{\text{in}}$).
3. In Cycle 2, $R_2$ is placed on the bus ($R2_{\text{out}}$), feeding ALU Input B directly, while Register $Y$ feeds ALU Input A via the MUX ($\text{SelectY}$).
4. The ALU computes $Y + R_2$, and the result is latched into **Temporary Register $Z$** ($Z_{\text{in}}$) to prevent output race conditions before the clock edge.
5. In Cycle 3, $Z$ is gated onto the bus and latched into destination register $R_3$ ($Z_{\text{out}}, R3_{\text{in}}$).

### 4. The Universal 3-Step Instruction Fetch Phase

Every instruction, regardless of opcode or addressing mode, begins with the identical 3-cycle fetch phase:

```text
Clock Cycle 1:  PC_out, MAR_in, Read, Select4, ADD, Z_in
Clock Cycle 2:  Z_out, PC_in, WMFC
Clock Cycle 3:  MDR_out, IR_in
```

#### Detailed Cycle Mechanics:
- **Cycle 1:**
  - $PC_{\text{out}}, MAR_{\text{in}}$: Places current Program Counter address onto the bus and loads it into the Memory Address Register.
  - $\text{Read}$: Asserts the memory read command on the control bus.
  - $\text{Select4}, \text{ADD}, Z_{\text{in}}$: Selects constant $+4$ on ALU MUX input A, adds it to the $PC$ value on the internal bus (Input B), and stores $PC + 4$ in Register $Z$.
- **Cycle 2:**
  - $Z_{\text{out}}, PC_{\text{in}}$: Gates the incremented address $PC + 4$ from $Z$ onto the bus and updates the Program Counter.
  - $\text{WMFC}$: Stalls CPU micro-sequencer until the memory system returns the data.
- **Cycle 3:**
  - $MDR_{\text{out}}, IR_{\text{in}}$: Gates the fetched 32-bit machine instruction word from the Memory Data Register into the Instruction Register ($IR$) for decoding.

### 5. Multi-Bus CPU Organizations (2-Bus and 3-Bus Datapaths)

To overcome the latency bottlenecks of the single-bus architecture:
- **Two-Bus Architecture:** Separates an Input Bus (feeding ALU inputs) from an Output Bus (receiving ALU results), allowing data routing and ALU latching in fewer cycles.
- **Three-Bus Architecture:** Employs two Source Buses (Bus A and Bus B) feeding ALU inputs simultaneously, and one Destination Bus (Bus C) receiving ALU output. A complete two-operand register addition ($R_3 \leftarrow R_1 + R_2$) completes in a **single clock cycle** ($R1_{\text{outA}}, R2_{\text{outB}}, \text{ADD}, R3_{\text{inC}}$).

## Worked Examples / Calculations / Hardware Traces

### Example 1: Micro-Operation Trace for Immediate Addition (`ADD EAX, 0x50`)

**Problem:** Trace the cycle-by-cycle datapath micro-operations for executing `ADD EAX, 0x50` on a single-bus CPU. Assume the immediate value `0x50` is stored in the Instruction Register's Data Field ($IRDF$).

**Solution:**

```text
Cycle 1: PC_out, MAR_in, Read, Select4, ADD, Z_in  ; Universal Fetch Step 1
Cycle 2: Z_out, PC_in, WMFC                        ; Universal Fetch Step 2
Cycle 3: MDR_out, IR_in                            ; Universal Fetch Step 3
-------------------------------------------------------------------------
Cycle 4: EAX_out, Y_in                             ; Execution Step 1: Load EAX into Y
Cycle 5: IRDF_out, SelectY, ADD, Z_in              ; Execution Step 2: Add Y + Immediate
Cycle 6: Z_out, EAX_in, END                        ; Execution Step 3: Write back to EAX
```

### Example 2: Memory-to-Register Load (`MOV EAX, [EBX]`)

**Problem:** Trace the micro-operation sequence for executing a register-indirect load instruction `MOV EAX, [EBX]`.

**Solution:**

```text
Cycle 1: PC_out, MAR_in, Read, Select4, ADD, Z_in  ; Fetch 1
Cycle 2: Z_out, PC_in, WMFC                        ; Fetch 2
Cycle 3: MDR_out, IR_in                            ; Fetch 3 (Instruction Decoded)
-------------------------------------------------------------------------
Cycle 4: EBX_out, MAR_in, Read                     ; Send address in EBX to MAR; trigger Read
Cycle 5: WMFC                                      ; Wait for Memory Function Complete
Cycle 6: MDR_out, EAX_in, END                      ; Gate memory data into EAX; finish
```

*Total Clock Cycles:* 6 cycles (3 fetch + 3 execute).

## Complexity Analysis / Common Pitfalls

- **Bus Contention Violations:** Asserting two output signals simultaneously (e.g., $EAX_{\text{out}}$ and $EBX_{\text{out}}$) in the same clock cycle destroys data integrity and creates physical transistor burn-in hazards due to opposing drive voltages on the shared bus line.
- **Forgetting WMFC on Memory References:** Issuing a `Read` command in Cycle 4 and attempting to read `MDR_out` in Cycle 5 without `WMFC` causes the processor to read stale, uninitialized data if memory latency exceeds 1 CPU clock cycle.
- **ALU Direct Latch Hazard:** Omitting the $Z$ register and attempting to route ALU output directly back into the internal bus while the ALU's input is being driven by that same bus creates an unstable analog feedback race condition.

## Multiple Choice Questions

1. In a single-bus CPU datapath, what is the maximum number of registers that may assert their output gating signal ($R_{\text{out}}$) onto the internal bus simultaneously during a single clock cycle?
- **A)** Exactly zero
- **B)** Exactly one
- **C)** Exactly two
- **D)** Any number of registers

2. Why is Temporary Register $Y$ necessary in a single-bus CPU datapath?
- **A)** To store the Program Counter during interrupt handling
- **B)** To hold one ALU input operand because the single shared bus cannot supply two operands simultaneously
- **C)** To buffer data coming from the external hard disk
- **D)** To translate virtual addresses into physical addresses

3. What micro-operations occur during Cycle 1 of the universal instruction fetch phase?
- **A)** $MDR_{\text{out}}, IR_{\text{in}}$
- **B)** $Z_{\text{out}}, PC_{\text{in}}, \text{WMFC}$
- **C)** $PC_{\text{out}}, MAR_{\text{in}}, \text{Read}, \text{Select4}, \text{ADD}, Z_{\text{in}}$
- **D)** $IR_{\text{out}}, MAR_{\text{in}}$

4. What is the role of the `WMFC` control signal?
- **A)** Write Memory Frequency Control
- **B)** Wait for Memory Function Complete, pausing the sequencer until memory asserts that data is ready
- **C)** Wide-Memory Fast Cache enable
- **D)** Word-Mask Functional Clear

5. How many clock cycles does a two-operand register addition ($R_3 \leftarrow R_1 + R_2$) require in a Three-Bus CPU datapath compared to a Single-Bus datapath (execution phase only)?
- **A)** Three-bus: 1 cycle; Single-bus: 3 cycles
- **B)** Three-bus: 3 cycles; Single-bus: 1 cycle
- **C)** Three-bus: 2 cycles; Single-bus: 4 cycles
- **D)** Three-bus: 4 cycles; Single-bus: 2 cycles

### Answer Key & Explanations

1. **B**. The single-bus architecture has exactly one shared data path. At most one register may drive the bus ($R_{\text{out}} = 1$) to prevent electrical contention, although multiple registers may read from it ($R_{\text{in}} = 1$).
2. **B**. Because both operands for an ALU operation cannot reside on the single internal bus simultaneously, one operand must be pre-loaded into Temporary Register $Y$ in a preceding cycle.
3. **C**. Cycle 1 places the current $PC$ onto the bus to load $MAR$, issues the memory `Read`, and simultaneously computes $PC + 4$ in the ALU, storing the updated address in $Z$.
4. **B**. `WMFC` synchronizes the high-speed CPU with slower asynchronous main memory subsystems, preventing the CPU from executing subsequent steps until the memory controller signals that the transaction has finished.
5. **A**. In a three-bus datapath, Bus A and Bus B feed both ALU inputs simultaneously and Bus C drives the destination register, completing execution in 1 cycle ($R1_{\text{outA}}, R2_{\text{outB}}, \text{ADD}, R3_{\text{inC}}$). A single-bus datapath requires 3 cycles ($R1_{\text{out}}, Y_{\text{in}}$; $R2_{\text{out}}, \text{ADD}, Z_{\text{in}}$; $Z_{\text{out}}, R3_{\text{in}}$).

## References & Navigation

- **Previous Topic:** [[Instruction Set Architecture (ISA) Principles & Addressing Modes]]
- **Next Topic:** [[Control Unit Design & Microprogramming]]
- **Related Notes:** [[Functional Units & Performance Fundamentals]], [[Binary Addition, Subtraction & Carry Lookahead Adders]]
