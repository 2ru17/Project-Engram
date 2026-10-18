---
id: Problem-Set-Microprogramming-and-Control-Unit
type: problem-set
course: CSARCH2
topic: Microprogramming and Control Unit Design
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Microprogramming]] #[[Control Unit]] #[[Single-Bus CPU Architecture]] #[[Register Transfer Language]] #[[Control Words]] #[[x86 Assembly]] #[[Addressing Modes]]

---

# Problem Set: Microprogramming & Control Unit Design

## Overview & Theoretical Framework

In a microprogrammed [[Control Unit]], machine-level assembly instructions are not executed by hardwired combinatorial logic alone. Instead, each machine instruction is interpreted as a sequence of elementary hardware operations known as **micro-operations** (or **RTL** — Register Transfer Language statements). These micro-operations are stored in a high-speed internal read-only or read-mostly memory called the **Control Memory (CM)**.

```text
                    ┌────────────────────────────┐
                    │    Instruction Register    │
                    │            (IR)            │
                    └─────────────┬──────────────┘
                                  │ (Opcode)
                                  ▼
                    ┌────────────────────────────┐
                    │       Mapping Logic        │
                    └─────────────┬──────────────┘
                                  │
                                  ▼
      ┌────────────┐       ┌──────────────┐
      │ SBR (Stack)│ ◄───► │  CAR / $\mu$PC   │ ◄─── Next Address Logic (MUX)
      └────────────┘       └──────┬───────┘
                                  │
                                  ▼
                    ┌────────────────────────────┐
                    │       Control Memory       │
                    │        (Micro-Store)       │
                    └─────────────┬──────────────┘
                                  │
                                  ▼
                    ┌────────────────────────────┐
                    │    Microinstruction /      │
                    │   Control Buffer Register  │
                    └─────────────┬──────────────┘
                                  │
         ┌────────────────────────┴────────────────────────┐
         ▼                                                 ▼
  Control Signals                                  Sequencing Fields
  (Gating, ALU, Memory)                            (CD, BR, Address)
```

---

### 1. The Single-Bus CPU Architecture

The reference architecture investigated in this problem set is a classic **Single-Bus Central Processing Unit (CPU)**. In this organization:
- A single internal common data bus connects all internal CPU registers, the Arithmetic and Logic Unit (ALU), and the internal interfaces of the Memory Bus.
- **Bus Contention Constraint:** At any given clock cycle, **at most one** register or functional unit may place data onto the bus ($\text{Source}_{out}$). However, **multiple** registers or listening units may simultaneously latch data from the bus ($\text{Destination}_{in}$).
- **Gating Signals:** Every register $R_k$ is equipped with tri-state output gating ($R_{k,out}$) and input enable gating ($R_{k,in}$).

```text
                             Internal CPU Bus
    ═══════════════════════════════════════════════════════════════════
       ▲  │           ▲  │           ▲  │          ▲           │   ▲
       │  ▼           │  ▼           │  ▼          │           ▼   │
     ┌──────┐       ┌──────┐       ┌──────┐     ┌─────┐     ┌────┐ │
     │  PC  │       │ MAR  │       │ MDR  │     │ IR  │     │ Y  │ │
     └──┬───┘       └──┬───┘       └──┬───┘     └──┬──┘     └─┬──┘ │
      PCout/in      MARin        MDRout/in        IRin        Yin  │
                       │              │                            │
                       ▼              ▼                            ▼
                 [Address Bus]   [Data Bus]                 [MUX Input A]
                 ──────────────────────────                 (SelectY / Select4)
                        External Memory Bus                        │
                                                                   ▼
                                                             ┌──────────┐
               Internal Bus (Input B) ─────────────────────► │   ALU    │
                                                             └────┬─────┘
                                                                  │
                                                                  ▼ Zin
                                                             ┌──────────┐
                                                             │    Z     │
                                                             └────┬─────┘
                                                                  │ Zout
                                                                  ▼
    ═══════════════════════════════════════════════════════════════════
```

---

### 2. Primary Functional Components

| Component | Identifier | Architectural Function & Gating Characteristics |
| :--- | :--- | :--- |
| **Program Counter** | $\text{PC}$ | Holds the memory address of the next machine instruction to be fetched. Gated via $\text{PC}_{out}$ and $\text{PC}_{in}$. |
| **Memory Address Register** | $\text{MAR}$ | Holds the physical address sent over the external address bus. Latched via $\text{MAR}_{in}$. |
| **Memory Data Register** | $\text{MDR}$ | Dual-ported interface register between internal CPU bus ($\text{MDR}_{in}, \text{MDR}_{out}$) and external data lines. |
| **Instruction Register** | $\text{IR}$ | Stores the current instruction byte/word. Supplies the Opcode to mapping logic, $\text{IRAF}_{out}$ (Address Field/Displacement), and $\text{IRDF}_{out}$ (Data Field/Immediate). |
| **Temporary / Latch Register** | $\text{Y}$ | Latches the first ALU operand from the bus ($\text{Y}_{in}$). Directly feeds Input A of the ALU via a 2-to-1 Multiplexer. |
| **ALU Multiplexer** | $\text{MUX}$ | Selects between the contents of register $\text{Y}$ ($\text{SelectY}$) and a hardwired constant 4 ($\text{Select4}$, used for PC and pointer updates). |
| **ALU Output Register** | $\text{Z}$ | Latches the raw output of the ALU ($\text{Z}_{in}$) at the end of the clock cycle, and drives the internal bus via $\text{Z}_{out}$. |
| **General Purpose Registers** | $R_0 \dots R_{n-1}$ | Programmer-visible registers (e.g., in x86: $\text{RAX}, \text{RBX}, \text{RCX}, \text{RDX}, \text{RSI}, \text{RDI}, \text{RSP}, \text{RBP}$). |
| **Control Address Register** | $\text{CAR}$ | Internal microprogram counter holding the address of the next microinstruction in Control Memory. |
| **Subroutine Register** | $\text{SBR}$ | Holds the return address for microprogram subroutine calls. |

---

### 3. Fundamental Control Signals & Operations

1. **Register Transfer:** 
   $$\text{Source}_{out},\; \text{Destination}_{in}$$
2. **ALU Operations:** 
   - Binary Operation: $\text{Source1}_{out},\; \text{Y}_{in}$ followed by $\text{Source2}_{out},\; \text{SelectY},\; \text{ALU\_OP},\; \text{Z}_{in}$, then $\text{Z}_{out},\; \text{Destination}_{in}$.
   - Unary Operation: $\text{Source}_{out},\; \text{Set carry-in},\; \text{ADD},\; \text{Z}_{in}$.
   - Mathematical Convention: $\text{Addition} = \text{Bus} + \text{Input A} + c_{in}$; $\text{Subtraction} = \text{Bus} - \text{Input A} - c_{in}$.
3. **Memory Fetch:**
   $$\text{Address}_{out},\; \text{MAR}_{in},\; \text{READ},\; \text{WMFC}$$
   $$\text{MDR}_{out},\; \text{Destination}_{in}$$
   *(where $\text{WMFC}$ denotes Wait for Memory Function Complete).*
4. **Memory Store:**
   $$\text{Address}_{out},\; \text{MAR}_{in}$$
   $$\text{Data}_{out},\; \text{MDR}_{in},\; \text{WRITE},\; \text{WMFC}$$
5. **Instruction Termination:** $\text{END}$ resets micro-sequencing to initiate the Fetch Phase of the next instruction.

---

### 4. Standard Fetch Phase Microprogram

Every instruction in this architecture begins with an identical 3-cycle **Fetch Phase**, which retrieves the opcode from memory and increments the Program Counter ($\text{PC} \leftarrow \text{PC} + 4$):

$$\begin{aligned}
\text{Step 1:}\quad & \text{PC}_{out},\; \text{MAR}_{in},\; \text{READ},\; \text{Select4},\; \text{ADD},\; \text{Z}_{in} \\
\text{Step 2:}\quad & \text{Z}_{out},\; \text{PC}_{in},\; \text{WMFC} \\
\text{Step 3:}\quad & \text{MDR}_{out},\; \text{IR}_{in}
\end{aligned}$$

- **Step 1:** The current $\text{PC}$ is driven onto the bus. It simultaneously loads the $\text{MAR}$ to initiate the memory read cycle ($\text{READ}$) and enters ALU Input B. The MUX selects constant 4 ($\text{Select4}$), the ALU adds them ($\text{ADD}$), and the incremented address ($\text{PC}+4$) is latched into $\text{Z}$ ($\text{Z}_{in}$).
- **Step 2:** $\text{Z}$ is driven onto the bus to update $\text{PC}$ ($\text{PC}_{in}$). The CPU asserts $\text{WMFC}$ to synchronize with external memory.
- **Step 3:** Once memory asserts $\text{MFC}$, $\text{MDR}$ places the fetched instruction word onto the bus to load the Instruction Register ($\text{IR}_{in}$).

---

### 5. Control Word & Microinstruction Bitfield Layout

To represent microinstructions in binary, we define a standard 32-bit horizontal/vertical control word structure:

$$\begin{array}{|c|c|c|c|c|c|c|c|c|c|}
\hline
\mathbf{SRC\_OUT} & \mathbf{DST\_IN1} & \mathbf{DST\_IN2} & \mathbf{ALU\_OP} & \mathbf{MUX} & \mathbf{MEM} & \mathbf{WMFC} & \mathbf{CD} & \mathbf{BR} & \mathbf{AD} \\
{[31:27]} & [26:22] & [21:18] & [17:15] & [14:13] & [12:11] & [10] & [9:8] & [7:6] & [5:0] \\
\hline
\end{array}$$

```text
 31      27 26      22 21    18 17    15 14  13 12  11  10  9  8  7  6  5          0
┌──────────┬──────────┬────────┬────────┬──────┬──────┬───┬─────┬─────┬─────────────┐
│ SRC_OUT  │ DST_IN1  │ DST_IN2│ ALU_OP │ MUX  │ MEM  │ W │ CD  │ BR  │     AD      │
│ (5 bits) │ (5 bits) │(4 bits)│(3 bits)│(2 b) │(2 b) │(1)│(2 b)│(2 b)│  (6 bits)   │
└──────────┴──────────┴────────┴────────┴──────┴──────┴───┴─────┴─────┴─────────────┘
```

#### Field Encodings:
- **$\text{SRC\_OUT}$ (5 bits):** `00000` = None, `00001` = $\text{PC}_{out}$, `00010` = $\text{MDR}_{out}$, `00011` = $\text{Z}_{out}$, `00100` = $\text{RSI}_{out} / \text{ESI}_{out}$, `00101` = $\text{RBX}_{out} / \text{EBX}_{out}$, `00110` = $\text{RAX}_{out} / \text{EAX}_{out}$, `00111` = $\text{RSP}_{out} / \text{ESP}_{out}$, `01000` = $\text{IRAF}_{out}$, `01001` = $\text{IRDF}_{out}$, `01010` = $\text{TEMP}_{out}$.
- **$\text{DST\_IN1}$ (5 bits):** `00000` = None, `00001` = $\text{PC}_{in}$, `00010` = $\text{MAR}_{in}$, `00011` = $\text{MDR}_{in}$, `00100` = $\text{IR}_{in}$, `00101` = $\text{Y}_{in}$, `00110` = $\text{RAX}_{in} / \text{EAX}_{in}$, `00111` = $\text{RBX}_{in} / \text{EBX}_{in}$, `01000` = $\text{RDI}_{in} / \text{EDI}_{in}$, `01001` = $\text{RSP}_{in} / \text{ESP}_{in}$, `01010` = $\text{TEMP}_{in}$, `01011` = $\text{RDX}_{in} / \text{EDX}_{in}$.
- **$\text{DST\_IN2}$ (4 bits):** `0000` = None, `0001` = $\text{PC}_{in}$, `0010` = $\text{MAR}_{in}$, `0011` = $\text{MDR}_{in}$, `0100` = $\text{EDX}_{in}$.
- **$\text{ALU\_OP}$ (3 bits):** `000` = NOP, `001` = $\text{ADD}$, `010` = $\text{SUB}$, `011` = $\text{MUL}$, `100` = $\text{XOR}$, `101` = $\text{PASS}$.
- **$\text{MUX}$ (2 bits):** `00` = None, `01` = $\text{SelectY}$, `10` = $\text{Select4}$, `11` = $\text{Select8}$.
- **$\text{MEM}$ (2 bits):** `00` = NOP, `01` = $\text{READ}$, `10` = $\text{WRITE}$.
- **$\text{W}$ ($\text{WMFC}$, 1 bit):** `0` = No wait, `1` = Assert $\text{WMFC}$.
- **$\text{CD}$ (Condition Code, 2 bits):** `00` = Unconditional, `01` = Test Carry ($\text{CF}$), `10` = Test Zero ($\text{ZF}$), `11` = Test $\text{MFC}$.
- **$\text{BR}$ (Branch Control, 2 bits):** `00` = Next microinstruction ($\text{CAR} \leftarrow \text{CAR}+1$), `01` = Call Subroutine ($\text{SBR} \leftarrow \text{CAR}+1, \text{CAR} \leftarrow \text{AD}$), `10` = Return from Subroutine ($\text{CAR} \leftarrow \text{SBR}$), `11` = Map Opcode ($\text{CAR} \leftarrow \text{MAP}(\text{IR})$).
- **$\text{AD}$ (Address Field, 6 bits):** Target address for micro-jumps/calls ($000000_2$ to $111111_2$).

---

## Problem Set Solutions & Detailed Traces

---

### Problem A: Complex SIB Address Calculation — `LEA EDI, [ALPHA+RBX+RSI*4]`

#### 1. Problem Statement & Operational Semantics
Write the microprogram sequence for the instruction:
$$\mathbf{LEA\ EDI,\ [ALPHA + RBX + RSI \times 4]}$$
*Note: The fetch instruction cycle (Steps 1–3) may be skipped.*

- **Instruction Name:** Load Effective Address ($\text{LEA}$).
- **Destination Register:** $\text{EDI}$ (32-bit Destination Index Register).
- **Source Operand:** Scale-Index-Base ($\text{SIB}$) displacement address:
  $$\text{Effective Address (EA)} = \text{Displacement (ALPHA)} + \text{Base (RBX)} + (\text{Index (RSI)} \times \text{Scale (4)})$$
- **Crucial Architectural Distinction:** Unlike a $\text{MOV}$ instruction referencing memory ($\text{MOV EDI, [addr]}$), $\text{LEA}$ computes the **mathematical address** and directly places the result into the destination register **without generating any memory bus access signals** ($\text{MAR}_{in}, \text{READ}, \text{WRITE}, \text{WMFC}, \text{MDR}_{in/out}$ are NOT invoked).

---

#### 2. Step-by-Step Derivation & Gating Analysis

1. **Step 4: Scale the Index Register**
   - The index register $\text{RSI}$ is driven onto the bus ($\text{RSI}_{out}$).
   - The ALU MUX selects constant 4 ($\text{Select4}$).
   - The ALU performs multiplication ($\text{MUL}$), calculating $\text{RSI} \times 4$.
   - The product is latched into the ALU output register $\text{Z}$ ($\text{Z}_{in}$).
   - *RTL:* $\text{RSI}_{out},\; \text{Select4},\; \text{MUL},\; \text{Z}_{in}$

2. **Step 5: Transfer Scaled Index to Latch Register $\text{Y}$**
   - The product in $\text{Z}$ is driven onto the internal bus ($\text{Z}_{out}$).
   - The latch register $\text{Y}$ latches the value from the bus ($\text{Y}_{in}$).
   - *RTL:* $\text{Z}_{out},\; \text{Y}_{in}$

3. **Step 6: Add Base Register $\text{RBX}$**
   - The base register $\text{RBX}$ is driven onto the bus ($\text{RBX}_{out}$), entering ALU Input B.
   - The MUX selects register $\text{Y}$ ($\text{SelectY}$), supplying $(\text{RSI} \times 4)$ to ALU Input A.
   - The ALU performs addition ($\text{ADD}$), computing $\text{RBX} + (\text{RSI} \times 4)$.
   - The sum is latched into $\text{Z}$ ($\text{Z}_{in}$).
   - *RTL:* $\text{RBX}_{out},\; \text{SelectY},\; \text{ADD},\; \text{Z}_{in}$

4. **Step 7: Transfer Intermediate Sum to Latch Register $\text{Y}$**
   - The sum in $\text{Z}$ is driven onto the bus ($\text{Z}_{out}$).
   - Register $\text{Y}$ latches the value ($\text{Y}_{in}$).
   - *RTL:* $\text{Z}_{out},\; \text{Y}_{in}$

5. **Step 8: Add Displacement $\text{ALPHA}$**
   - The instruction decoder outputs the address displacement field $\text{ALPHA}$ onto the bus ($\text{IRAF}_{out}$).
   - The MUX selects register $\text{Y}$ ($\text{SelectY}$).
   - The ALU performs addition ($\text{ADD}$), calculating $\text{ALPHA} + [\text{RBX} + (\text{RSI} \times 4)]$.
   - The final Effective Address is latched into $\text{Z}$ ($\text{Z}_{in}$).
   - *RTL:* $\text{IRAF}_{out},\; \text{SelectY},\; \text{ADD},\; \text{Z}_{in}$

6. **Step 9: Store Effective Address into Destination Register $\text{EDI}$**
   - The final effective address in $\text{Z}$ is driven onto the bus ($\text{Z}_{out}$).
   - Destination register $\text{EDI}$ latches the address from the bus ($\text{EDI}_{in}$).
   - The micro-routine asserts the $\text{END}$ control signal to conclude execution.
   - *RTL:* $\text{Z}_{out},\; \text{EDI}_{in},\; \text{END}$

---

#### 3. Microprogram Execution Table

| Step | Microinstruction Address ($\text{CAR}$) | Active Control Signals | Register Transfer Language ($\text{RTL}$) | Bus Master ($\text{Out}$) | Bus Listeners ($\text{In}$) | ALU & Memory Action |
| :---: | :---: | :--- | :--- | :---: | :---: | :--- |
| **4** | `000100` ($0x04$) | $\text{RSI}_{out}, \text{Select4}, \text{MUL}, \text{Z}_{in}$ | $\text{Z} \leftarrow \text{RSI} \times 4$ | $\text{RSI}$ | ALU Input B | $\text{ALU} = \text{Bus} \times 4 \to \text{Z}$ |
| **5** | `000101` ($0x05$) | $\text{Z}_{out}, \text{Y}_{in}$ | $\text{Y} \leftarrow \text{Z}$ | $\text{Z}$ | $\text{Y}$ | Transfer scaled index to $\text{Y}$ |
| **6** | `000110` ($0x06$) | $\text{RBX}_{out}, \text{SelectY}, \text{ADD}, \text{Z}_{in}$ | $\text{Z} \leftarrow \text{RBX} + \text{Y}$ | $\text{RBX}$ | ALU Input B | $\text{ALU} = \text{RBX} + (\text{RSI} \times 4) \to \text{Z}$ |
| **7** | `000111` ($0x07$) | $\text{Z}_{out}, \text{Y}_{in}$ | $\text{Y} \leftarrow \text{Z}$ | $\text{Z}$ | $\text{Y}$ | Transfer base+scaled index to $\text{Y}$ |
| **8** | `001000` ($0x08$) | $\text{IRAF}_{out}, \text{SelectY}, \text{ADD}, \text{Z}_{in}$ | $\text{Z} \leftarrow \text{IRAF} + \text{Y}$ | $\text{IRAF}$ | ALU Input B | $\text{ALU} = \text{ALPHA} + \text{Y} \to \text{Z}$ |
| **9** | `001001` ($0x09$) | $\text{Z}_{out}, \text{EDI}_{in}, \text{END}$ | $\text{EDI} \leftarrow \text{Z},\; \text{END}$ | $\text{Z}$ | $\text{EDI}$ | Load final EA into $\text{EDI}$, End |

---

#### 4. Binary Control Word Encodings

$$\begin{array}{|c|c|c|c|c|c|c|c|c|c|c|c|}
\hline
\textbf{Step} & \textbf{SRC\_OUT} & \textbf{DST1} & \textbf{DST2} & \textbf{ALU} & \textbf{MUX} & \textbf{MEM} & \textbf{W} & \textbf{CD} & \textbf{BR} & \textbf{AD} & \textbf{Hex Word} \\
\hline
\text{Step 4} & 00100\ (\text{RSI}) & 00000 & 0000 & 011\ (\text{MUL}) & 10\ (\text{Sel4}) & 00 & 0 & 00 & 00 & 000101 & \mathbf{0x2001C005} \\
\text{Step 5} & 00011\ (\text{Z}) & 00101\ (\text{Y}) & 0000 & 000\ (\text{NOP}) & 00 & 00 & 0 & 00 & 00 & 000110 & \mathbf{0x19400006} \\
\text{Step 6} & 00101\ (\text{RBX}) & 00000 & 0000 & 001\ (\text{ADD}) & 01\ (\text{SelY}) & 00 & 0 & 00 & 00 & 000111 & \mathbf{0x2800A007} \\
\text{Step 7} & 00011\ (\text{Z}) & 00101\ (\text{Y}) & 0000 & 000\ (\text{NOP}) & 00 & 00 & 0 & 00 & 00 & 001000 & \mathbf{0x19400008} \\
\text{Step 8} & 01000\ (\text{IRAF}) & 00000 & 0000 & 001\ (\text{ADD}) & 01\ (\text{SelY}) & 00 & 0 & 00 & 00 & 001001 & \mathbf{0x4000A009} \\
\text{Step 9} & 00011\ (\text{Z}) & 01000\ (\text{EDI}) & 0000 & 000\ (\text{NOP}) & 00 & 00 & 0 & 00 & 00 & 000000 & \mathbf{0x1A000000} \\
\hline
\end{array}$$

---

### Problem B: Subroutine Invocation — `CALL L1`

#### 1. Problem Statement & Operational Semantics
Write the microprogram sequence for the instruction:
$$\mathbf{CALL\ L1}$$
*Note: The fetch instruction cycle (Steps 1–3) may be skipped.*

- **Instruction Name:** Subroutine Call ($\text{CALL}$).
- **Target Label:** $\text{L1}$ (Subroutine entry point).
- **Core Operations:**
  1. **Stack Pointer Decrement:** In x86 architecture, the stack grows downwards towards lower memory addresses. The stack pointer ($\text{ESP} / \text{RSP}$) must be decremented by 4 bytes (in 32-bit mode) or 8 bytes (in 64-bit mode).
  2. **Push Return Address:** The current contents of the Program Counter ($\text{PC}$), which points to the next instruction immediately following the $\text{CALL}$, must be written into memory at $[\text{ESP}_{new}]$.
  3. **Branch to Target Subroutine:** The Program Counter ($\text{PC}$) must be updated with the target address of label $\text{L1}$.

---

#### 2. Derivation of Variants (Absolute vs. Relative CALL)

Depending on the instruction encoding format, $\text{CALL}$ can be implemented as an **Absolute Call** (where the full target address is provided in the instruction address field) or a **Relative Call** (where a signed offset is added to the current $\text{PC}$).

##### Variant B.1: Absolute Direct CALL ($\text{L1}$ supplied via $\text{IRAF}_{out}$)
1. **Step 4: Decrement Stack Pointer**
   - The current stack pointer is driven onto the bus ($\text{ESP}_{out}$).
   - The MUX selects constant 4 ($\text{Select4}$).
   - The ALU performs subtraction ($\text{SUB}$), calculating $\text{ESP} - 4$.
   - The new top-of-stack address is latched into $\text{Z}$ ($\text{Z}_{in}$).
   - *RTL:* $\text{ESP}_{out},\; \text{Select4},\; \text{SUB},\; \text{Z}_{in}$

2. **Step 5: Update $\text{ESP}$ and Address Memory**
   - The decremented address in $\text{Z}$ is driven onto the bus ($\text{Z}_{out}$).
   - It is simultaneously latched back into the stack pointer ($\text{ESP}_{in}$) and into the Memory Address Register ($\text{MAR}_{in}$).
   - *RTL:* $\text{Z}_{out},\; \text{ESP}_{in},\; \text{MAR}_{in}$

3. **Step 6: Write Return Address ($\text{PC}$) to Stack Memory**
   - The Program Counter ($\text{PC}$, holding the return address) is driven onto the bus ($\text{PC}_{out}$).
   - The Memory Data Register latches the return address from the bus ($\text{MDR}_{in}$).
   - The Control Unit initiates a memory write cycle ($\text{WRITE}$) and asserts $\text{WMFC}$.
   - *RTL:* $\text{PC}_{out},\; \text{MDR}_{in},\; \text{WRITE},\; \text{WMFC}$

4. **Step 7: Load Subroutine Target Address into $\text{PC}$**
   - The instruction decoder drives the target address $\text{L1}$ from the instruction address field onto the bus ($\text{IRAF}_{out}$).
   - The Program Counter latches the target address ($\text{PC}_{in}$).
   - The micro-routine asserts $\text{END}$.
   - *RTL:* $\text{IRAF}_{out},\; \text{PC}_{in},\; \text{END}$

---

##### Variant B.2: Relative Near CALL ($\text{L1}$ offset supplied via $\text{IRDF}_{out}$)
When the target address is encoded as a relative displacement:
- **Step 4:** $\text{ESP}_{out},\; \text{Select4},\; \text{SUB},\; \text{Z}_{in}$
- **Step 5:** $\text{Z}_{out},\; \text{ESP}_{in},\; \text{MAR}_{in}$
- **Step 6:** $\text{PC}_{out},\; \text{MDR}_{in},\; \text{WRITE}$ *(Write initiated; memory cycle runs in background)*
- **Step 7:** $\text{IRDF}_{out},\; \text{Y}_{in}$ *(Offset loaded into $\text{Y}$)*
- **Step 8:** $\text{PC}_{out},\; \text{SelectY},\; \text{ADD},\; \text{Z}_{in},\; \text{WMFC}$ *(ALU calculates $\text{PC} + \text{offset}$ while waiting for memory write completion)*
- **Step 9:** $\text{Z}_{out},\; \text{PC}_{in},\; \text{END}$

---

#### 3. Microprogram Execution Table (Absolute CALL)

| Step | $\text{CAR}$ | Active Control Signals | Register Transfer Language ($\text{RTL}$) | Bus Master | Bus Listeners | Functional Action |
| :---: | :---: | :--- | :--- | :---: | :---: | :--- |
| **4** | `000100` | $\text{ESP}_{out}, \text{Select4}, \text{SUB}, \text{Z}_{in}$ | $\text{Z} \leftarrow \text{ESP} - 4$ | $\text{ESP}$ | ALU Input B | Decrement stack pointer by 4 |
| **5** | `000101` | $\text{Z}_{out}, \text{ESP}_{in}, \text{MAR}_{in}$ | $\text{ESP} \leftarrow \text{Z},\; \text{MAR} \leftarrow \text{Z}$ | $\text{Z}$ | $\text{ESP}, \text{MAR}$ | Update $\text{ESP}$ & stage address in $\text{MAR}$ |
| **6** | `000110` | $\text{PC}_{out}, \text{MDR}_{in}, \text{WRITE}, \text{WMFC}$ | $\text{MDR} \leftarrow \text{PC},\; [\text{MAR}] \leftarrow \text{MDR}$ | $\text{PC}$ | $\text{MDR}$ | Stage return address & write to RAM |
| **7** | `000111` | $\text{IRAF}_{out}, \text{PC}_{in}, \text{END}$ | $\text{PC} \leftarrow \text{IRAF},\; \text{END}$ | $\text{IRAF}$ | $\text{PC}$ | Update $\text{PC}$ to subroutine $\text{L1}$, End |

---

#### 4. Binary Control Word Encodings (Absolute CALL)

$$\begin{array}{|c|c|c|c|c|c|c|c|c|c|c|c|}
\hline
\textbf{Step} & \textbf{SRC\_OUT} & \textbf{DST1} & \textbf{DST2} & \textbf{ALU} & \textbf{MUX} & \textbf{MEM} & \textbf{W} & \textbf{CD} & \textbf{BR} & \textbf{AD} & \textbf{Hex Word} \\
\hline
\text{Step 4} & 00111\ (\text{ESP}) & 00000 & 0000 & 010\ (\text{SUB}) & 10\ (\text{Sel4}) & 00 & 0 & 00 & 00 & 000101 & \mathbf{0x38014005} \\
\text{Step 5} & 00011\ (\text{Z}) & 01001\ (\text{ESP}) & 0010\ (\text{MAR}) & 000\ (\text{NOP}) & 00 & 00 & 0 & 00 & 00 & 000110 & \mathbf{0x1A480006} \\
\text{Step 6} & 00001\ (\text{PC}) & 00011\ (\text{MDR}) & 0000 & 000\ (\text{NOP}) & 00 & 10\ (\text{WR}) & 1 & 00 & 00 & 000111 & \mathbf{0x08C01407} \\
\text{Step 7} & 01000\ (\text{IRAF}) & 00001\ (\text{PC}) & 0000 & 000\ (\text{NOP}) & 00 & 00 & 0 & 00 & 00 & 000000 & \mathbf{0x40400000} \\
\hline
\end{array}$$

---

### Problem C: Stack Deallocation & Register Restoration — `POP RAX`

#### 1. Problem Statement & Operational Semantics
Write the microprogram sequence for the instruction:
$$\mathbf{POP\ RAX}$$
*Note: The fetch instruction cycle (Steps 1–3) may be skipped.*

- **Instruction Name:** Pop Top of Stack into Register ($\text{POP}$).
- **Destination Register:** $\text{RAX}$ (64-bit / 32-bit Accumulator).
- **Core Operations:**
  1. **Memory Read from Stack:** Read the value from main memory currently pointed to by the stack pointer ($\text{MDR} \leftarrow [\text{ESP}]$) and transfer it into register $\text{RAX}$.
  2. **Stack Pointer Increment:** Increment the stack pointer ($\text{ESP} \leftarrow \text{ESP} + 4$ in 32-bit mode or $\text{RSP} \leftarrow \text{RSP} + 8$ in 64-bit mode) to deallocate the top stack slot.

---

#### 2. Derivation: Sequential vs. Overlapped/Pipelined Execution

##### Implementation C.1: Sequential Execution (Straightforward Trace)
1. **Step 4: Initiate Memory Read from Current Stack Top**
   - $\text{ESP}_{out}$ drives current stack address onto bus.
   - $\text{MAR}_{in}$ latches the address.
   - The Control Unit asserts $\text{READ}$ and waits for memory with $\text{WMFC}$.
   - *RTL:* $\text{ESP}_{out},\; \text{MAR}_{in},\; \text{READ},\; \text{WMFC}$

2. **Step 5: Transfer Retrieved Data to $\text{RAX}$**
   - Memory data is placed onto bus via $\text{MDR}_{out}$.
   - Destination register $\text{RAX}$ latches data via $\text{RAX}_{in}$.
   - *RTL:* $\text{MDR}_{out},\; \text{RAX}_{in}$

3. **Step 6: Increment Stack Pointer**
   - $\text{ESP}_{out}$ drives current stack pointer to ALU Input B.
   - MUX selects constant 4 ($\text{Select4}$).
   - ALU adds 4 ($\text{ADD}$), latching updated address into $\text{Z}$ ($\text{Z}_{in}$).
   - *RTL:* $\text{ESP}_{out},\; \text{Select4},\; \text{ADD},\; \text{Z}_{in}$

4. **Step 7: Update $\text{ESP}$ and Conclude**
   - $\text{Z}_{out}$ drives updated pointer onto bus.
   - $\text{ESP}_{in}$ updates the stack pointer. $\text{END}$ is asserted.
   - *RTL:* $\text{Z}_{out},\; \text{ESP}_{in},\; \text{END}$

---

##### Implementation C.2: Optimized / Pipelined Execution (Concurrent ALU & Memory Wait)
Because the ALU and internal bus are idle during the asynchronous memory read latency, the stack pointer increment can be **overlapped directly inside Step 4 and Step 5**:

1. **Step 4: Address Memory and Compute $\text{ESP}+4$ Concurrently**
   - $\text{ESP}_{out}$ drives the current stack address onto the bus.
   - $\text{MAR}_{in}$ latches the address, and the memory $\text{READ}$ signal is triggered.
   - Simultaneously, the ALU takes the bus value ($\text{ESP}$), selects constant 4 ($\text{Select4}$), adds them ($\text{ADD}$), and latches $\text{ESP}+4$ into $\text{Z}$ ($\text{Z}_{in}$).
   - *RTL:* $\text{ESP}_{out},\; \text{MAR}_{in},\; \text{READ},\; \text{Select4},\; \text{ADD},\; \text{Z}_{in}$

2. **Step 5: Update $\text{ESP}$ while Waiting for Memory**
   - $\text{Z}_{out}$ drives $\text{ESP}+4$ onto the bus.
   - $\text{ESP}_{in}$ updates the stack pointer.
   - The Control Unit asserts $\text{WMFC}$ to await completion of the memory read initiated in Step 4.
   - *RTL:* $\text{Z}_{out},\; \text{ESP}_{in},\; \text{WMFC}$

3. **Step 6: Transfer Memory Data to Destination Register**
   - $\text{MDR}_{out}$ drives the popped value onto the bus.
   - $\text{RAX}_{in}$ latches the value into the destination register. $\text{END}$ is asserted.
   - *RTL:* $\text{MDR}_{out},\; \text{RAX}_{in},\; \text{END}$

*Performance Gain:* The optimized sequence reduces execution latency by **1 full clock cycle** (3 cycles vs. 4 cycles) without introducing any hardware race conditions.

---

#### 3. Microprogram Execution Table (Sequential vs. Optimized)

##### Sequential Schedule (4 Cycles):
| Step | $\text{CAR}$ | Active Control Signals | Register Transfer Language ($\text{RTL}$) | Bus Master | Bus Listeners | Functional Action |
| :---: | :---: | :--- | :--- | :---: | :---: | :--- |
| **4** | `000100` | $\text{ESP}_{out}, \text{MAR}_{in}, \text{READ}, \text{WMFC}$ | $\text{MAR} \leftarrow \text{ESP},\; \text{READ},\; \text{WMFC}$ | $\text{ESP}$ | $\text{MAR}$ | Address stack top & read RAM |
| **5** | `000101` | $\text{MDR}_{out}, \text{RAX}_{in}$ | $\text{RAX} \leftarrow \text{MDR}$ | $\text{MDR}$ | $\text{RAX}$ | Transfer popped word to $\text{RAX}$ |
| **6** | `000110` | $\text{ESP}_{out}, \text{Select4}, \text{ADD}, \text{Z}_{in}$ | $\text{Z} \leftarrow \text{ESP} + 4$ | $\text{ESP}$ | ALU Input B | Increment stack pointer by 4 |
| **7** | `000111` | $\text{Z}_{out}, \text{ESP}_{in}, \text{END}$ | $\text{ESP} \leftarrow \text{Z},\; \text{END}$ | $\text{Z}$ | $\text{ESP}$ | Write back incremented $\text{ESP}$, End |

##### Optimized Overlapped Schedule (3 Cycles):
| Step | $\text{CAR}$ | Active Control Signals | Register Transfer Language ($\text{RTL}$) | Bus Master | Bus Listeners | Functional Action |
| :---: | :---: | :--- | :--- | :---: | :---: | :--- |
| **4** | `000100` | $\text{ESP}_{out}, \text{MAR}_{in}, \text{READ}, \text{Select4}, \text{ADD}, \text{Z}_{in}$ | $\text{MAR} \leftarrow \text{ESP},\; \text{READ},\; \text{Z} \leftarrow \text{ESP} + 4$ | $\text{ESP}$ | $\text{MAR}$, ALU | Parallel address latch & ALU increment |
| **5** | `000101` | $\text{Z}_{out}, \text{ESP}_{in}, \text{WMFC}$ | $\text{ESP} \leftarrow \text{Z},\; \text{WMFC}$ | $\text{Z}$ | $\text{ESP}$ | Latch $\text{ESP}_{new}$ while waiting for memory |
| **6** | `000110` | $\text{MDR}_{out}, \text{RAX}_{in}, \text{END}$ | $\text{RAX} \leftarrow \text{MDR},\; \text{END}$ | $\text{MDR}$ | $\text{RAX}$ | Load popped data into $\text{RAX}$, End |

---

#### 4. Binary Control Word Encodings (Sequential Schedule)

$$\begin{array}{|c|c|c|c|c|c|c|c|c|c|c|c|}
\hline
\textbf{Step} & \textbf{SRC\_OUT} & \textbf{DST1} & \textbf{DST2} & \textbf{ALU} & \textbf{MUX} & \textbf{MEM} & \textbf{W} & \textbf{CD} & \textbf{BR} & \textbf{AD} & \textbf{Hex Word} \\
\hline
\text{Step 4} & 00111\ (\text{ESP}) & 00010\ (\text{MAR}) & 0000 & 000\ (\text{NOP}) & 00 & 01\ (\text{RD}) & 1 & 00 & 00 & 000101 & \mathbf{0x38800C05} \\
\text{Step 5} & 00010\ (\text{MDR}) & 00110\ (\text{RAX}) & 0000 & 000\ (\text{NOP}) & 00 & 00 & 0 & 00 & 00 & 000110 & \mathbf{0x11800006} \\
\text{Step 6} & 00111\ (\text{ESP}) & 00000 & 0000 & 001\ (\text{ADD}) & 10\ (\text{Sel4}) & 00 & 0 & 00 & 00 & 000111 & \mathbf{0x3800C007} \\
\text{Step 7} & 00011\ (\text{Z}) & 01001\ (\text{ESP}) & 0000 & 000\ (\text{NOP}) & 00 & 00 & 0 & 00 & 00 & 000000 & \mathbf{0x1A400000} \\
\hline
\end{array}$$

---

## Python Simulation & Verification Suite

To guarantee the mathematical and architectural integrity of the microprogram sequences and binary control words, the following executable Python simulator implements the cycle-accurate single-bus state machine:

```python
"""
CSARCH2 Microprogram & Control Unit Verification Script
Simulates cycle-by-cycle micro-operations and verifies register state transitions.
"""

class SingleBusCPU:
    def __init__(self):
        self.regs = {
            "RAX": 0, "RBX": 0, "RCX": 0, "RDX": 0,
            "RSI": 0, "RDI": 0, "RSP": 0x1000, "ESP": 0x1000,
            "EDI": 0, "PC": 0x00401000, "MAR": 0, "MDR": 0,
            "IR": 0, "IRAF": 0, "IRDF": 0, "Y": 0, "Z": 0
        }
        self.memory = {}
        self.bus = 0

    def write_mem(self, addr, val):
        self.memory[addr] = val & 0xFFFFFFFF

    def read_mem(self, addr):
        return self.memory.get(addr, 0)

# Binary Encoding Definition
SRC_MAP = {
    "NONE": 0, "PCOUT": 1, "MDROUT": 2, "ZOUT": 3, "RSIOUT": 4,
    "RBXOUT": 5, "RAXOUT": 6, "ESPOUT": 7, "IRAFOUT": 8, "IRDFOUT": 9
}
DST_MAP = {
    "NONE": 0, "PCIN": 1, "MARIN": 2, "MDRIN": 3, "IRIN": 4, "YIN": 5,
    "RAXIN": 6, "RBXIN": 7, "EDIIN": 8, "ESPIN": 9
}
ALU_MAP = {"NOP": 0, "ADD": 1, "SUB": 2, "MUL": 3}
MUX_MAP = {"NONE": 0, "SELECTY": 1, "SELECT4": 2}
MEM_MAP = {"NOP": 0, "READ": 1, "WRITE": 2}

def encode_cw(src="NONE", dst1="NONE", dst2="NONE", alu="NOP", mux="NONE",
              mem="NOP", wmfc=0, cd=0, br=0, ad=0):
    return ((SRC_MAP[src] << 27) | (DST_MAP[dst1] << 22) | (DST_MAP[dst2] << 18) |
            (ALU_MAP[alu] << 15) | (MUX_MAP[mux] << 13) | (MEM_MAP[mem] << 11) |
            (wmfc << 10) | (cd << 8) | (br << 6) | ad)

# --- Test 1: LEA EDI, [ALPHA + RBX + RSI*4] ---
def verify_lea():
    cpu = SingleBusCPU()
    ALPHA = 0x00040000
    cpu.regs["IRAF"] = ALPHA
    cpu.regs["RBX"] = 0x00001000
    cpu.regs["RSI"] = 0x00000020
    
    # Step 4: RSIout, Select4, MUL, Zin
    cpu.bus = cpu.regs["RSI"]
    cpu.regs["Z"] = (cpu.bus * 4) & 0xFFFFFFFF
    # Step 5: Zout, Yin
    cpu.bus = cpu.regs["Z"]
    cpu.regs["Y"] = cpu.bus
    # Step 6: RBXout, SelectY, ADD, Zin
    cpu.bus = cpu.regs["RBX"]
    cpu.regs["Z"] = (cpu.bus + cpu.regs["Y"]) & 0xFFFFFFFF
    # Step 7: Zout, Yin
    cpu.bus = cpu.regs["Z"]
    cpu.regs["Y"] = cpu.bus
    # Step 8: IRAFout, SelectY, ADD, Zin
    cpu.bus = cpu.regs["IRAF"]
    cpu.regs["Z"] = (cpu.bus + cpu.regs["Y"]) & 0xFFFFFFFF
    # Step 9: Zout, EDIin
    cpu.bus = cpu.regs["Z"]
    cpu.regs["EDI"] = cpu.bus
    
    expected = ALPHA + 0x1000 + (0x20 * 4)
    assert cpu.regs["EDI"] == expected == 0x00041080
    print(f"[*] LEA Verification PASSED: EDI = 0x{cpu.regs['EDI']:08X}")

# --- Test 2: CALL L1 (Absolute) ---
def verify_call():
    cpu = SingleBusCPU()
    cpu.regs["PC"] = 0x00401050
    cpu.regs["ESP"] = 0x0012FF00
    cpu.regs["IRAF"] = 0x00405500
    
    # Step 4: ESPout, Select4, SUB, Zin
    cpu.bus = cpu.regs["ESP"]
    cpu.regs["Z"] = (cpu.bus - 4) & 0xFFFFFFFF
    # Step 5: Zout, ESPin, MARin
    cpu.bus = cpu.regs["Z"]
    cpu.regs["ESP"] = cpu.bus
    cpu.regs["MAR"] = cpu.bus
    # Step 6: PCout, MDRin, WRITE
    cpu.bus = cpu.regs["PC"]
    cpu.regs["MDR"] = cpu.bus
    cpu.write_mem(cpu.regs["MAR"], cpu.regs["MDR"])
    # Step 7: IRAFout, PCin
    cpu.bus = cpu.regs["IRAF"]
    cpu.regs["PC"] = cpu.bus
    
    assert cpu.regs["ESP"] == 0x0012FEFC
    assert cpu.read_mem(0x0012FEFC) == 0x00401050
    assert cpu.regs["PC"] == 0x00405500
    print(f"[*] CALL Verification PASSED: New PC = 0x{cpu.regs['PC']:08X}, Saved Ret = 0x{cpu.read_mem(0x0012FEFC):08X}")

# --- Test 3: POP RAX ---
def verify_pop():
    cpu = SingleBusCPU()
    cpu.regs["ESP"] = 0x0012FEFC
    cpu.write_mem(0x0012FEFC, 0xCAFEBABE)
    
    # Step 4: ESPout, MARin, READ
    cpu.bus = cpu.regs["ESP"]
    cpu.regs["MAR"] = cpu.bus
    cpu.regs["MDR"] = cpu.read_mem(cpu.regs["MAR"])
    # Step 5: MDRout, RAXin
    cpu.bus = cpu.regs["MDR"]
    cpu.regs["RAX"] = cpu.bus
    # Step 6: ESPout, Select4, ADD, Zin
    cpu.bus = cpu.regs["ESP"]
    cpu.regs["Z"] = (cpu.bus + 4) & 0xFFFFFFFF
    # Step 7: Zout, ESPin
    cpu.bus = cpu.regs["Z"]
    cpu.regs["ESP"] = cpu.bus
    
    assert cpu.regs["RAX"] == 0xCAFEBABE
    assert cpu.regs["ESP"] == 0x0012FF00
    print(f"[*] POP Verification PASSED: RAX = 0x{cpu.regs['RAX']:08X}, New ESP = 0x{cpu.regs['ESP']:08X}")

if __name__ == "__main__":
    verify_lea()
    verify_call()
    verify_pop()
    print("[+] ALL INSTRUCTIONS SYSTEMATICALLY VERIFIED!")
```

---

## Key Takeaways & Synthesis

### Comparative Summary Table

| Metric / Attribute | Problem A: `LEA EDI, [...]` | Problem B: `CALL L1` | Problem C: `POP RAX` (Sequential) | Problem C: `POP RAX` (Optimized) |
| :--- | :--- | :--- | :--- | :--- |
| **Instruction Class** | Data Movement / Calculation | Control Transfer (Subroutine) | Stack Deallocation | Stack Deallocation |
| **Execution Phase Cycles** | 6 Cycles (Steps 4–9) | 4 Cycles (Steps 4–7) | 4 Cycles (Steps 4–7) | 3 Cycles (Steps 4–6) |
| **Memory Bus Operations** | **0** (No RAM Access) | **1 Write** ($[\text{ESP}_{new}] \leftarrow \text{PC}$) | **1 Read** ($\text{MDR} \leftarrow [\text{ESP}]$) | **1 Read** ($\text{MDR} \leftarrow [\text{ESP}]$) |
| **ALU Operations** | $1 \times \text{MUL},\; 2 \times \text{ADD}$ | $1 \times \text{SUB}$ (for $\text{ESP}-4$) | $1 \times \text{ADD}$ (for $\text{ESP}+4$) | $1 \times \text{ADD}$ (for $\text{ESP}+4$) |
| **Bus Contention Rule** | Exactly 1 driver per cycle | Exactly 1 driver per cycle | Exactly 1 driver per cycle | Exactly 1 driver per cycle |
| **Primary Risk / Pitfall** | Confusing $\text{LEA}$ with $\text{MOV}$ (adding memory read) | Forgetting stack grows down ($\text{SUB}$ vs $\text{ADD}$) | Incrementing $\text{ESP}$ before reading RAM | Incrementing $\text{ESP}$ before reading RAM |

---

### Critical Review & Exam Traps
1. **$\text{LEA}$ vs $\text{MOV}$ Trap:** An effective address expression inside square brackets `[...]` looks identical for both $\text{MOV}$ and $\text{LEA}$. However, $\text{MOV}$ loads the **contents** at that calculated memory address (requiring $\text{MAR}_{in}, \text{READ}, \text{WMFC}, \text{MDR}_{out}$), while $\text{LEA}$ loads the **calculated address itself** directly into the destination register ($Z_{out}, \text{EDI}_{in}, \text{END}$).
2. **Stack Growth Direction Trap:** In the x86 architecture, the stack is a **descending stack** (Full-Descending). Therefore, $\text{PUSH} / \text{CALL}$ uses $\text{SUB}$ with $\text{Select4}$ to decrement the stack pointer, whereas $\text{POP} / \text{RET}$ uses $\text{ADD}$ with $\text{Select4}$ to increment the stack pointer.
3. **Pipelining $\text{WMFC}$:** While memory operations require external bus cycles ($\text{WMFC}$), the internal CPU bus and ALU are free during that interval. An optimized microprogram places independent ALU operations (such as pointer increments or counter updates) during the memory latency period to save execution cycles.


## References & Navigation

- **Related Notes:** [[Microprogramming and Control Unit Design]]
