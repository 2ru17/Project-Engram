---
id: csarch2_module_11_control_unit
type: note
course: CSARCH2
topic: "Control Unit Design & Microprogramming"
status: completed
---

# Module 11: Control Unit Design & Microprogramming

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Hardware Modeling]] #[[Control Unit Design & Microprogramming]]

---

## Overview

> The Control Unit (CU) orchestrates all instruction execution inside the microprocessor by translating binary machine instructions into synchronized sequences of electrical control signals across the datapath. This module examines the architectural dichotomy between **Hardwired Control Units** (fast, combinational gate arrays) and **Microprogrammed Control Units** (flexible, memory-driven micro-sequencers). We analyze **Horizontal vs. Vertical microinstruction formats** and construct complete, cycle-by-cycle micro-routines for instruction fetching, complex arithmetic addressing modes (`[ALPHA + EBX + ESI*4]`), conditional branching (`JC`), subroutine linkage (`CALL`), and stack manipulations (`POP`).

## Key Definitions

- **Control Signal:** A binary voltage line asserted by the control unit to enable a specific hardware action (e.g., latching a register $R_{\text{in}}$, gating a bus $R_{\text{out}}$, selecting an ALU function, triggering a memory read).
- **Hardwired Control:** A control unit implementation constructed from discrete combinational logic gates, decoders, and step-counters, maximizing execution speed at the cost of architectural immobility.
- **Microprogrammed Control:** A control unit design where control signal patterns are stored as micro-words in an internal **Control Store (ROM/SRAM)**, executed by a microprogram sequencer.
- **Microinstruction:** A single binary control word retrieved from the control store specifying the set of micro-operations to be executed during a single clock cycle.
- **Horizontal Microinstruction:** An unencoded control word format where each bit directly drives a single hardware control line, enabling maximum concurrency without decoding latency.
- **Vertical Microinstruction:** An encoded control word format where mutually exclusive control signals are grouped into small binary fields (e.g., 3 bits to select 1 of 8 ALU functions), requiring hardware decoders but drastically reducing control store size.
- **Microprogram Counter ($\mu\text{PC}$):** A dedicated register that holds the address of the next microinstruction to be fetched from the control store.

## Theoretical Framework / Core Concepts

### 1. Hardwired vs. Microprogrammed Control Units

```text
+--------------------------------------------------------------------------+
|                  HARDWIRED vs. MICROPROGRAMMED COMPARISON                |
|                                                                          |
| Feature             | Hardwired Control        | Microprogrammed Control |
|---------------------+--------------------------+-------------------------|
| Implementation      | Combinational Gate Array | Control Store ROM/RAM   |
| Execution Speed     | Extremely Fast (sub-ns)  | Slower (ROM read cycle) |
| Modification / Patch| Impossible (silicon spin)| Easy (firmware update)  |
| Instruction Set     | Simple, RISC style       | Complex, CISC style     |
| Silicon Die Area    | Grows with ISA complexity| Structured, compact     |
+--------------------------------------------------------------------------+
```

```text
Microprogrammed Control Unit Architecture:
+-------------------+      +----------------------+      +--------------------+
| Instruction Reg   | ---> | Starting Address     | ---> | Microprogram       |
| (IR Opcode Field) |      | Generator / Decoder  |      | Counter (mu-PC)    |
+-------------------+      +----------------------+      +--------------------+
                                                                    |
                                                                    v
+-----------------------------------------------------------------------------+
|                      CONTROL STORE MEMORY (ROM / SRAM)                      |
|                      (Contains all micro-routines)                          |
+-----------------------------------------------------------------------------+
                                     |
                                     v
+-----------------------------------------------------------------------------+
|                     MICROINSTRUCTION REGISTER (mu-IR)                       |
|  +------------------------------------------------+----------------------+  |
|  |             Control Signal Fields              | Next Address Field   |  |
|  +------------------------------------------------+----------------------+  |
+-----------------------------------------------------------------------------+
           |                                                   |
           v                                                   v
   [Datapath Lines: PC_out, MAR_in, ALU_Add, etc.]     [Branch Multiplexer]
```

### 2. Horizontal vs. Vertical Microprogramming

```text
Horizontal Microinstruction (Wide & Direct):
+---------+--------+--------+-------+-------+------+-----+---------+
| PC_out  | MAR_in | Read   | Y_in  | ADD   | Z_in | ... | END     | (1 bit each)
+---------+--------+--------+-------+-------+------+-----+---------+
- No decoding delay; wide control memory (e.g., 64 to 128 bits per word).

Vertical Microinstruction (Compact & Encoded):
+----------------+----------------+----------------+----------------+
| ALU Op (4b)    | Bus Source(4b) | Bus Dest(4b)   | Branch Ctr(3b) |
+----------------+----------------+----------------+----------------+
        |                |                |
        v                v                v
   [4-to-16 Dec]    [4-to-16 Dec]    [4-to-16 Dec]
        |                |                |
   (ALU Signals)    (R_out Lines)    (R_in Lines)
- Small control memory; introduces gate delay through decoders.
```

### 3. Master Microinstruction Sequences for Single-Bus CPU

#### 1. Universal Instruction Fetch Phase (Cycles 1–3):
Every instruction begins with these three invariant cycles:
```text
1. PC_out, MAR_in, Read, Select4, ADD, Z_in
2. Z_out, PC_in, WMFC
3. MDR_out, IR_in
```

#### 2. Register-to-Register Copy (`MOV EAX, EBX`):
```text
4. EBX_out, EAX_in, END
```

#### 3. Immediate Move (`MOV EAX, 0x12345678`):
```text
4. IRDF_out, EAX_in, END   ; IRDF = Instruction Register Data Field
```

#### 4. Direct Memory Load (`MOV EAX, [ALPHA]`):
```text
4. IRAF_out, MAR_in, Read  ; IRAF = Instruction Register Address Field
5. WMFC
6. MDR_out, EAX_in, END
```

#### 5. Register Indirect Load (`MOV EAX, [ESI]`):
```text
4. ESI_out, MAR_in, Read
5. WMFC
6. MDR_out, EAX_in, END
```

#### 6. Scaled Index Base Displacement (`MOV EAX, [ALPHA + EBX + ESI*4]`):
To compute $EA = ALPHA + EBX + (ESI \times 4)$:
```text
4. ESI_out, Select4, MUL, Z_in       ; Z = ESI * 4
5. Z_out, Y_in                       ; Y = ESI * 4
6. EBX_out, SelectY, ADD, Z_in       ; Z = EBX + (ESI * 4)
7. Z_out, Y_in                       ; Y = EBX + (ESI * 4)
8. IRAF_out, SelectY, ADD, Z_in      ; Z = ALPHA + EBX + (ESI * 4)
9. Z_out, MAR_in, Read               ; MAR = EA, Issue Memory Read
10. WMFC
11. MDR_out, EAX_in, END             ; EAX = Memory[EA]
```

#### 7. Memory ALU Addition (`ADD EAX, [ALPHA + ESI]`):
```text
4. ESI_out, Y_in
5. IRAF_out, SelectY, ADD, Z_in
6. Z_out, MAR_in, Read
7. WMFC
8. MDR_out, Y_in                     ; Load operand from memory into Y
9. EAX_out, SelectY, ADD, Z_in       ; Compute EAX + Memory Data
10. Z_out, EAX_in, END               ; Write sum back to EAX
```

#### 8. Relative Unconditional Branch (`JMP L1`):
Target address is $PC + \text{Offset}$:
```text
4. IRDF_out, Y_in
5. PC_out, SelectY, ADD, Z_in
6. Z_out, PC_in, END
```

#### 9. Conditional Branch on Carry (`JC L1`):
```text
4. If (CF == 0) then END
   IRDF_out, Y_in
5. PC_out, SelectY, ADD, Z_in
6. Z_out, PC_in, END
```

#### 10. Stack Pop (`POP RAX`):
Assuming 64-bit architecture where stack pointer is `RSP`:
```text
4. RSP_out, MAR_in, Read, Select8, ADD, Z_in  ; Read top of stack; compute RSP + 8
5. Z_out, RSP_in, WMFC                        ; Update RSP to point to next stack item
6. MDR_out, RAX_in, END                       ; Store popped value in RAX
```

#### 11. Subroutine Call (`CALL L1`):
Pushes current return address ($PC$) onto the stack and updates $PC$ with the subroutine target:
```text
4. RSP_out, Y_in                              ; Prepare to decrement stack pointer
5. Select8, SUB, Z_in                         ; Compute RSP - 8
6. Z_out, RSP_in, MAR_in                      ; Update RSP and set MAR to new top of stack
7. PC_out, MDR_in, Write                      ; Place return address in MDR; trigger Write
8. IRAF_out, PC_in, WMFC, END                 ; Load target address into PC; finish
```

## Worked Examples / Calculations / Hardware Traces

### Example 1: Microcode Trace for `PUSH RBX`

**Problem:** Write the complete microinstruction sequence for executing `PUSH RBX` on a 64-bit single-bus processor (assuming word size is 8 bytes).

**Solution:**
- Execution phase begins at Cycle 4 (after Universal Fetch 1–3):
```text
Cycle 1: PC_out, MAR_in, Read, Select8, ADD, Z_in  ; Fetch 1
Cycle 2: Z_out, PC_in, WMFC                        ; Fetch 2
Cycle 3: MDR_out, IR_in                            ; Fetch 3
-------------------------------------------------------------------------
Cycle 4: RSP_out, Y_in                             ; Step 1: Load RSP into Y
Cycle 5: Select8, SUB, Z_in                        ; Step 2: Compute RSP - 8
Cycle 6: Z_out, RSP_in, MAR_in                     ; Step 3: Update RSP and set MAR
Cycle 7: RBX_out, MDR_in, Write                    ; Step 4: Load RBX into MDR, issue Write
Cycle 8: WMFC, END                                 ; Step 5: Wait for write completion
```

### Example 2: Horizontal Microcode Word Sizing Calculation

**Problem:** A processor datapath has:
- 16 general-purpose registers (each requiring $R_{\text{in}}$ and $R_{\text{out}}$)
- 6 special-purpose registers (PC, IR, MAR, MDR, Y, Z with appropriate in/out lines)
- 12 ALU operational commands (ADD, SUB, AND, OR, XOR, SHL, SHR, etc.)
- 4 memory control signals (Read, Write, WMFC, Select4)
- 3 branch sequencer commands (Next, Branch, End)

Calculate:
1. The width of a purely **Horizontal** microinstruction.
2. The width of a purely **Vertical** microinstruction using optimal grouping into encoded fields.

**Solution:**
1. **Horizontal Microinstruction Width:**
   - General register gating: $16 \times 2 = 32\text{ signals}$
   - Special register gating: $PC_{\text{in}}, PC_{\text{out}}, IR_{\text{in}}, MAR_{\text{in}}, MDR_{\text{in}}, MDR_{\text{out}}, Y_{\text{in}}, Z_{\text{in}}, Z_{\text{out}} = 9\text{ signals}$
   - ALU commands: $12\text{ signals}$
   - Memory controls: $4\text{ signals}$
   - Sequencer controls: $3\text{ signals}$
   $$\text{Total Horizontal Width} = 32 + 9 + 12 + 4 + 3 = 60\text{ bits}$$

2. **Vertical Microinstruction Width:**
   - Group 1 (Bus Source / Out): $16 \text{ GPRs} + PC + MDR + Z + \text{None} = 20\text{ choices} \implies \lceil \log_2(20) \rceil = 5\text{ bits}$.
   - Group 2 (Bus Destination / In): $16 \text{ GPRs} + PC + IR + MAR + MDR + Y + \text{None} = 22\text{ choices} \implies \lceil \log_2(22) \rceil = 5\text{ bits}$.
   - Group 3 (ALU Function): 12 commands $+ \text{Pass/None} = 13\text{ choices} \implies \lceil \log_2(13) \rceil = 4\text{ bits}$.
   - Group 4 (Memory/Sequencer): $\text{Read, Write, WMFC, Select4, End, Branch} = 6\text{ signals} \implies 4\text{ bits}$.
   $$\text{Total Vertical Width} = 5 + 5 + 4 + 4 = 18\text{ bits}$$

*Comparison:* Vertical microprogramming reduces control word width from 60 bits down to 18 bits (a $70\%$ reduction in control store memory footprint).

## Complexity Analysis / Common Pitfalls

- **Microinstruction Bus Collisions:** In horizontal microcode authoring, inadvertently setting two output bits (e.g., `PC_out = 1` and `MDR_out = 1`) in the same microinstruction word results in fatal electrical bus contention.
- **Premature `END` Assertion:** Emitting the `END` control signal before memory writes or register updates complete will cause the sequencer to fetch the next instruction while the current instruction's results are still in flight.
- **Conditional Branch Logic Misordering:** In conditional branching micro-routines (`JC L1`), the condition flag must be evaluated *prior* to updating the Program Counter in step 5; otherwise, the branch will be executed unconditionally.

## Multiple Choice Questions

1. What is the fundamental difference between Horizontal and Vertical microprogramming?
    - **A)** Horizontal microinstructions are unencoded and wide, while Vertical microinstructions use encoded fields requiring decoders
    - **B)** Horizontal microcode executes only on RISC processors, while Vertical executes on CISC
    - **C)** Horizontal microinstructions can only execute additions, while Vertical executes multiplications
    - **D)** Horizontal microprogramming uses magnetic core memory, while Vertical uses SRAM

2. In the universal single-bus instruction fetch routine, what micro-operation transfers the instruction from the Memory Data Register into the Instruction Register?
    - **A)** `PC_out, MAR_in`
    - **B)** `Z_out, PC_in`
    - **C)** `MDR_out, IR_in`
    - **D)** `IRAF_out, PC_in`

3. In a microprogrammed CPU, where are the binary microinstruction control words physically stored?
    - **A)** In the Level 1 Data Cache
    - **B)** In the Control Store (ROM / SRAM)
    - **C)** In the Translation Lookaside Buffer (TLB)
    - **D)** In the General Purpose Register File

4. How many clock cycles are required to execute the instruction `MOV EAX, [ALPHA]` on a single-bus CPU (including the 3-cycle fetch phase)?
    - **A)** 4 cycles
    - **B)** 5 cycles
    - **C)** 6 cycles
    - **D)** 8 cycles

5. What micro-operation sequence correctly implements a subroutine return instruction (`RET`) in a single-bus CPU?
    - **A)** `RSP_out, MAR_in, Read; WMFC; MDR_out, PC_in, END`
    - **B)** `PC_out, RSP_in, Write; WMFC; END`
    - **C)** `IRAF_out, PC_in, END`
    - **D)** `EBX_out, EAX_in, END`

### Answer Key & Explanations

1. **A**. Horizontal microcode assigns one bit per control line for maximum speed and parallelism without decoders. Vertical microcode groups mutually exclusive signals into encoded bit fields to reduce control store ROM width.
2. **C**. Step 3 of the universal fetch phase gates the received instruction word from the Memory Data Register into the Instruction Register via `MDR_out, IR_in`.
3. **B**. Microprogrammed control units store their micro-routines in a dedicated, high-speed on-chip memory known as the Control Store.
4. **C**. The instruction requires 3 fetch cycles + 3 execution cycles: `IRAF_out, MAR_in, Read` (Cycle 4); `WMFC` (Cycle 5); `MDR_out, EAX_in, END` (Cycle 6) $\implies$ 6 total cycles.
5. **A**. `RET` pops the return address off the stack: it reads the address pointed to by `RSP`, waits for memory (`WMFC`), and loads the returned value from `MDR` directly into the Program Counter (`PC_in`), followed by `END`.

## References & Navigation

- **Previous Topic:** [[Processing Unit Organization & Single-Bus Datapath]]
- **Next Topic:** [[Memory System Organization & Hierarchy]]
- **Related Notes:** [[Instruction Set Architecture (ISA) Principles & Addressing Modes]], [[Functional Units & Performance Fundamentals]]
