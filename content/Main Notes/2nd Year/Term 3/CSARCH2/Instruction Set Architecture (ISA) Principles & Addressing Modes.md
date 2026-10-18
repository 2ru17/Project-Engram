---
id: csarch2_module_09_isa_addressing
type: note
course: CSARCH2
topic: "Instruction Set Architecture (ISA) Principles & Addressing Modes"
status: completed
---

# Module 09: Instruction Set Architecture (ISA) Principles & Addressing Modes

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Hardware Modeling]] #[[Instruction Set Architecture (ISA) Principles & Addressing Modes]]

---

## Overview

> The Instruction Set Architecture (ISA) constitutes the fundamental contract between software compilers and the underlying physical hardware. It defines the machine language programmer's model: supported data types, architectural register files, memory addressing mechanisms, and instruction formats. This module analyzes the structural composition of machine instructions across 0-address (stack), 1-address (accumulator), 2-address, and 3-address architectures, contrasts the architectural design philosophies of **CISC vs. RISC**, and provides an exhaustive mathematical breakdown of ten major **Addressing Modes** and their Effective Address ($EA$) derivations.

## Key Definitions

- **Instruction Set Architecture (ISA):** The abstract programmer-visible specification of a computer system, defining opcodes, data types, register sets, addressing modes, and exception handling protocols.
- **Operation Code (Opcode):** The specific bit pattern within an instruction word that directs the CPU's control unit to execute a designated primitive micro-operation (e.g., `ADD`, `SUB`, `MOV`, `JMP`).
- **Effective Address ($EA$):** The physical or virtual memory address calculated during the instruction execution phase from which a data operand is fetched or into which a result is stored.
- **CISC (Complex Instruction Set Computer):** An architectural philosophy characterized by variable-length instructions, memory-to-memory arithmetic, complex addressing modes, and microcoded execution (e.g., x86).
- **RISC (Reduced Instruction Set Computer):** An architectural philosophy characterized by fixed-length instructions, a strict Load/Store paradigm (arithmetic only between registers), hardwired control, and large register files (e.g., RISC-V, ARM, MIPS).
- **Scale-Index-Base (SIB) Addressing:** An advanced x86 addressing mode where the effective address is computed via $EA = [\text{Base}] + [\text{Index}] \times \text{Scale} + \text{Displacement}$.

## Theoretical Framework / Core Concepts

### 1. Anatomy and Formats of Machine Instructions

A machine instruction consists of functional bit fields:

```text
General Machine Instruction Format:
+---------------+-------------------+---------------------+--------------------+
|  Opcode Field | Mode / Type Spec  | Source Operand(s)   | Destination / Disp |
+---------------+-------------------+---------------------+--------------------+
```

#### Instruction Architecture Classifications (By Address Count):
To evaluate the expression $X = (A + B) \times (C - D)$:

```text
1. Stack Architecture (0-Address):
   PUSH A
   PUSH B
   ADD           ; Pops B, A; pushes (A+B)
   PUSH C
   PUSH D
   SUB           ; Pops D, C; pushes (C-D)
   MUL           ; Pops (C-D), (A+B); pushes product
   POP  X        ; Stores into X

2. Accumulator Architecture (1-Address):
   LOAD  A       ; AC = A
   ADD   B       ; AC = AC + B
   STORE T       ; T = AC (Temp)
   LOAD  C       ; AC = C
   SUB   D       ; AC = AC - D
   MUL   T       ; AC = AC * T
   STORE X       ; X = AC

3. 2-Address Architecture (CISC / x86 Style: Dest = Dest op Src):
   MOV EAX, A    ; EAX = A
   ADD EAX, B    ; EAX = EAX + B
   MOV EBX, C    ; EBX = C
   SUB EBX, D    ; EBX = EBX - D
   IMUL EAX, EBX ; EAX = EAX * EBX
   MOV X, EAX    ; X = EAX

4. 3-Address Architecture (RISC / MIPS / ARM Style: Dest = Src1 op Src2):
   ADD R1, A, B  ; R1 = A + B
   SUB R2, C, D  ; R2 = C - D
   MUL X, R1, R2 ; X = R1 * R2
```

### 2. CISC vs. RISC Design Paradigms

```text
+--------------------------------------------------------------------------+
|                       CISC vs. RISC COMPARISON                           |
|                                                                          |
| Feature                | CISC (e.g. x86)        | RISC (e.g. RISC-V/ARM) |
|------------------------+------------------------+------------------------|
| Instruction Length     | Variable (1 to 15 B)   | Fixed (strictly 32-bit)|
| Arithmetic Operands    | Register & Memory      | Registers Only         |
| Memory Access Paradigm | Direct memory ops      | Strict Load/Store Only |
| Addressing Modes       | Rich & Complex (10+)   | Minimal (2 to 4)       |
| Control Unit Design    | Microprogrammed ROM    | Hardwired Fast Logic   |
| Register Count         | Few (8 to 16 GPRs)     | Many (32 to 128 GPRs)  |
| Pipeline Efficiency    | Complex variable CPI   | Single-cycle goal CPI~1|
+--------------------------------------------------------------------------+
```

### 3. Comprehensive Addressing Modes Catalog

The addressing mode specifies how hardware translates instruction address fields into the runtime **Effective Address ($EA$)**:

```text
+---------------------------------------------------------------------------------------+
| Mode Name              | Syntax / Notation     | Effective Address (EA) Formula       |
|------------------------+-----------------------+--------------------------------------|
| 1. Immediate           | #Value / $100         | Operand = Value (No memory fetch)    |
| 2. Direct / Absolute   | [0x4000] / ALPHA      | EA = Address Field (A)               |
| 3. Register            | R1 / EAX              | EA = Register R (In CPU register)    |
| 4. Register Indirect   | [R1] / (R1)           | EA = [R1] (Contents of register R1)  |
| 5. Displacement / Base | [RBX + 16]            | EA = [RBX] + Displacement            |
| 6. Indexed             | [ALPHA + ESI]         | EA = ALPHA + [ESI]                   |
| 7. Scaled Index (SIB)  | [EBX + ESI*4 + ALPHA] | EA = [EBX] + [ESI] * Scale + ALPHA   |
| 8. PC-Relative         | [PC + Offset] / JMP L | EA = [PC] + Offset                   |
| 9. Autoincrement       | [R1]+                 | EA = [R1], then R1 = R1 + Size       |
| 10. Autodecrement      | -[R1]                 | R1 = R1 - Size, then EA = [R1]       |
+---------------------------------------------------------------------------------------+
```

#### Detailed Examination of Complex Modes:

1. **Immediate Addressing (`MOV EAX, 42`):**
   - Operand is encoded directly within the instruction stream.
   - Extremely fast (0 additional memory bus cycles after instruction fetch).
   - Constrained by the bit width of the instruction's immediate field.

2. **Register Indirect Addressing (`MOV EAX, [EBX]`):**
   - Register `EBX` holds a 32-bit/64-bit pointer.
   - Enables dynamic pointer arithmetic, linked list traversals, and object reference dereferencing.

3. **Scaled Index Base Displacement (`MOV EAX, [EBX + ESI*4 + 0x20]`):**
   - $\text{Scale} \in \{1, 2, 4, 8\}$ directly corresponds to primitive data sizes (Byte, Half-Word, Word, Double-Word).
   - Allows single-instruction array element indexing: $\text{Array}[i]$ where `EBX` is array base address, `ESI` is index variable $i$, `Scale=4` is integer size, and `0x20` is struct member offset.

4. **PC-Relative Addressing (`BNE loop_start`):**
   - The offset is added to the current Program Counter: $EA = [PC] + \text{Offset}$.
   - Guarantees **Position-Independent Code (PIC)**: the compiled binary can be relocated to any base address in memory without recalculating branch targets.

## Worked Examples / Calculations / Hardware Traces

### Example 1: Multi-Mode Effective Address Trace

**Problem:** Given the following register and memory state in a 32-bit processor:
- Registers: `EBX = 0x00002000`, `ESI = 0x00000004`, `PC = 0x00001000`
- Memory Address `0x00002000` contains `0x00005000`
- Memory Address `0x00002010` contains `0x00009999`
- Memory Address `0x00002014` contains `0x00007777`
- Constant symbol `ALPHA = 0x00000010`

Calculate the Effective Address ($EA$) and the final fetched operand for each instruction:
1. `MOV EAX, [EBX]` (Register Indirect)
2. `MOV EAX, [EBX + ALPHA]` (Displacement)
3. `MOV EAX, [EBX + ESI*4 + 0x04]` (Scaled Index Base Displacement)
4. `JMP [PC + 0x80]` (PC-Relative)

**Solution:**
1. **Register Indirect (`[EBX]`):**
   - $EA = [EBX] = \text{0x00002000}$
   - Fetched Operand $= \text{Memory}[0x00002000] = \text{0x00005000}$.

2. **Displacement (`[EBX + ALPHA]`):**
   - $EA = [EBX] + ALPHA = \text{0x00002000} + \text{0x00000010} = \text{0x00002010}$
   - Fetched Operand $= \text{Memory}[0x00002010] = \text{0x00009999}$.

3. **Scaled Index Base Displacement (`[EBX + ESI*4 + 0x04]`):**
   - $EA = [EBX] + ([ESI] \times 4) + \text{0x04} = \text{0x00002000} + (4 \times 4) + 4 = \text{0x00002000} + 16 + 4 = \text{0x00002014}$
   - Fetched Operand $= \text{Memory}[0x00002014] = \text{0x00007777}$.

4. **PC-Relative (`[PC + 0x80]`):**
   - $EA = [PC] + \text{0x80} = \text{0x00001000} + \text{0x00000080} = \text{0x00001080}$.

### Example 2: Instruction Count and Memory Traffic (CISC vs RISC)

**Problem:** To execute the high-level language assignment `A[i] = A[i] + B`:
- **CISC processor:** Executes a single instruction `ADD [EBX + ESI*4], EDX`.
  - Instruction size: 4 bytes.
  - Memory references: 1 instruction fetch (4 bytes), 1 operand read (4 bytes), 1 operand write (4 bytes).
- **RISC processor:** Executes 4 instructions:
  - `SLL R1, R_i, 2` (Shift index by 2)
  - `ADD R2, R_base, R1` (Compute address)
  - `LW  R3, 0(R2)` (Load data)
  - `ADD R3, R3, R_B` (Add data)
  - `SW  R3, 0(R2)` (Store data)
  - Each instruction is 4 bytes.

Calculate total memory traffic (in bytes transferred across the system bus) for both implementations.

**Solution:**
- **CISC Memory Traffic:**
  $$\text{Traffic}_{\text{CISC}} = \text{Fetch } (4\text{ B}) + \text{Read } (4\text{ B}) + \text{Write } (4\text{ B}) = 12\text{ bytes}$$

- **RISC Memory Traffic:**
  - 5 instructions fetched $= 5 \times 4\text{ B} = 20\text{ bytes}$.
  - 1 Load read $= 4\text{ bytes}$.
  - 1 Store write $= 4\text{ bytes}$.
  $$\text{Traffic}_{\text{RISC}} = 20 + 4 + 4 = 28\text{ bytes}$$

*Insight:* While CISC reduces instruction fetch memory traffic, RISC instructions are simpler to pipeline and decode in hardware, achieving higher clock frequencies.

## Complexity Analysis / Common Pitfalls

- **Confusing Pointer Contents with Immediate Values:** Students frequently confuse `MOV EAX, 0x2000` (Immediate: loads the numeric value `0x2000` into `EAX`) with `MOV EAX, [0x2000]` (Direct: loads the 32-bit data stored *at memory address* `0x2000` into `EAX`).
- **PC-Relative Pre-Increment Offset Trap:** In most architectures (e.g., x86, ARM), the Program Counter (`PC`) has already been incremented to point to the *next* instruction when the branch offset is evaluated. Calculating branch offsets relative to the *current* instruction's starting address results in off-by-4 or off-by-instruction-length branching bugs.
- **Autoincrement Step Sizing:** When applying autoincrement addressing (`[R1]+`), the register must increment by the byte width of the target data type (e.g., $+1$ for bytes, $+2$ for 16-bit words, $+4$ for 32-bit integers, $+8$ for 64-bit floats), rather than a fixed $+1$.

## Multiple Choice Questions

1. Which addressing mode computes the effective address as $EA = [\text{Base Register}] + [\text{Index Register}] \times \text{Scale} + \text{Displacement}$?
    - **A)** Register Indirect Addressing
    - **B)** Scaled Index Base Displacement Addressing
    - **C)** PC-Relative Addressing
    - **D)** Autodecrement Addressing

2. What is the fundamental characteristic of a pure RISC (Reduced Instruction Set Computer) architecture?
    - **A)** Variable-length instructions ranging from 1 to 15 bytes
    - **B)** Arithmetic operations can directly read from and write to arbitrary memory locations
    - **C)** Strict Load/Store architecture where ALU operations operate exclusively on registers
    - **D)** Microcoded control store execution for complex multi-cycle instructions

3. In a 0-Address Stack architecture, how is the operation $X = A + B$ executed?
    - **A)** `ADD X, A, B`
    - **B)** `LOAD A; ADD B; STORE X`
    - **C)** `PUSH A; PUSH B; ADD; POP X`
    - **D)** `MOV EAX, A; ADD EAX, B; MOV X, EAX`

4. Why is PC-Relative addressing essential for compiling shared dynamic libraries (.so / .dll)?
    - **A)** It eliminates the need for branch prediction hardware
    - **B)** It enables Position-Independent Code (PIC) so code can execute at any memory location without relocation patching
    - **C)** It allows the ALU to bypass the register file during multiplication
    - **D)** It halves the size of the instruction opcode field

5. If register `R1 = 0x3000` and the system uses 32-bit words (4 bytes), what is the effective address and the updated value of `R1` after executing an Autoincrement load instruction `LOAD R2, [R1]+`?
    - **A)** $EA = \text{0x3000}$; updated $R1 = \text{0x3001}$
    - **B)** $EA = \text{0x3004}$; updated $R1 = \text{0x3004}$
    - **C)** $EA = \text{0x3000}$; updated $R1 = \text{0x3004}$
    - **D)** $EA = \text{0x3004}$; updated $R1 = \text{0x3000}$

### Answer Key & Explanations

1. **B**. Scaled Index Base Displacement is the canonical x86 SIB addressing mode designed for accessing elements in arrays of structured data types.
2. **C**. Pure RISC architectures enforce a strict Load/Store policy: memory is accessed solely through explicit `LOAD` and `STORE` instructions; all ALU arithmetic and logic operations must take their inputs from and write results to the register file.
3. **C**. In a stack-based machine, operands are pushed onto the evaluation stack (`PUSH A`, `PUSH B`), the `ADD` opcode pops the top two values and pushes their sum, and `POP X` writes the top of stack into variable $X$.
4. **B**. PC-relative addressing references branch targets as relative distance offsets from the current Program Counter, ensuring that code functions correctly regardless of where the operating system loads the library in virtual memory.
5. **C**. In post-autoincrement, the operand is fetched using the initial address in the register ($EA = [R1] = \text{0x3000}$), after which $R1$ is incremented by the data size (4 bytes for 32-bit words), resulting in $R1 = \text{0x3004}$.

## References & Navigation

- **Previous Topic:** [[Floating-Point Arithmetic Operations]]
- **Next Topic:** [[Processing Unit Organization & Single-Bus Datapath]]
- **Related Notes:** [[Course Overview & Architecture Foundations]], [[Control Unit Design & Microprogramming]]
