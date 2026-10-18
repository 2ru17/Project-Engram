---
id: problem_set_integer_operations_and_overflow
type: problem_set
course: CSARCH2
topic: "Integer Operations and Overflow"
status: completed
---

# Problem Set - Integer Operations and Overflow

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Binary Arithmetic]] #[[Overflow Flag]] #[[Carry Flag]] #[[ALU]] #[[Two's Complement]]

---

## Overview

In digital arithmetic and processor microarchitecture ([[ALU]]), integer addition and subtraction are executed on fixed-width binary words (typically $8$, $16$, $32$, or $64$ bits). Because physical hardware registers possess a finite bit width $n$, arithmetic operations can produce results that exceed the storage capacity of the destination register.

Microprocessors track boundary conditions by asserting specific **condition status flags** in the Program Status Word / Flags register:
- **Carry Flag ($C$ / `CF`):** Indicates carry-out or borrow during **unsigned** integer arithmetic.
- **Overflow Flag ($V$ / `OF`):** Indicates mathematical magnitude overflow during **signed 2's complement** arithmetic.
- **Sign Flag ($N$ / $S$ / `SF`):** Mirrors the Most Significant Bit (MSB) of the result ($1 = \text{negative}, 0 = \text{non-negative}$).
- **Zero Flag ($Z$ / `ZF`):** Asserted ($1$) when all bits of the result equal $0$.

```text
                            ┌─────────────────────────────────────────┐
                            │      8-bit ALU Arithmetic Result        │
                            └────────────────────┬────────────────────┘
                                                 │
                   ┌─────────────────────────────┴─────────────────────────────┐
                   ▼                                                           ▼
      ┌─────────────────────────┐                                 ┌─────────────────────────┐
      │   Unsigned Evaluation   │                                 │    Signed Evaluation    │
      │   Range: [0, 255]       │                                 │    Range: [-128, +127]  │
      └────────────┬────────────┘                                 └────────────┬────────────┘
                   │                                                           │
        ┌──────────┴──────────┐                                     ┌──────────┴──────────┐
        ▼                     ▼                                     ▼                     ▼
 ┌─────────────┐       ┌─────────────┐                       ┌─────────────┐       ┌─────────────┐
 │ C_out == 0  │       │ C_out == 1  │                       │ C_in ==     │       │ C_in !=     │
 │ (Addition)  │       │ (Addition)  │                       │ C_out       │       │ C_out       │
 │   NO OVF    │       │  OVERFLOW   │                       │   NO OVF    │       │  OVERFLOW   │
 └─────────────┘       └─────────────┘                       └─────────────┘       └─────────────┘
```

---

## Theoretical Foundations

### 1. Hardware Subtraction via 2's Complement Addition
Digital subtractors avoid dedicated subtraction logic by transforming subtraction into addition using radix complement properties:
$$A - B = A + (-B) = A + (\sim B + 1)$$
where $\sim B$ represents the bitwise inversion (1's complement) of $B$, and $+ 1$ is injected via the initial carry-in ($C_0 = 1$) of the full-adder chain.

### 2. Unsigned Carry vs. Signed Overflow Rules

| Feature | Unsigned Integer Arithmetic | Signed (2's Complement) Arithmetic |
| :--- | :--- | :--- |
| **Valid Range ($n=8$)** | $[0, 2^8 - 1] = [0, 255]$ | $[-2^7, 2^7 - 1] = [-128, +127]$ |
| **Addition Overflow** | Occurs when true sum $\ge 2^n$ ($C_n = 1$) | Occurs when true sum $\notin [-2^{n-1}, 2^{n-1}-1]$ |
| **Subtraction Overflow** | Occurs when $A < B$ (requires a borrow: $\overline{C_n} = 1$) | Occurs when $A - B \notin [-2^{n-1}, 2^{n-1}-1]$ |
| **Hardware Detection** | **Carry Flag (`CF`):** $C = C_n$ (for addition) | **Overflow Flag (`OF`):** $V = C_{n-1} \oplus C_n$ |
| **Sign-Logic Formula** | N/A (operands are strictly non-negative) | $V = (A_{n-1} \land B_{n-1} \land \overline{S_{n-1}}) \lor (\overline{A_{n-1}} \land \overline{B_{n-1}} \land S_{n-1})$ |

> [!important] The $C_{in} \oplus C_{out}$ MSB Rule
> In any $n$-bit 2's complement adder, signed overflow occurs **if and only if** the carry-in into the most significant bit ($C_{n-1}$) differs from the carry-out from the most significant bit ($C_n$):
> $$V = C_{n-1} \oplus C_n$$

---

## Problem 1: 8-Bit Binary Addition

### Problem Statement
Given two 8-bit integers, perform the binary addition. The result must be represented as an 8-bit binary value. Determine whether an overflow occurs when the result is interpreted as an unsigned integer versus a signed integer.

$$01111111_2 + 01111111_2 = \underline{\hspace{4cm}}_2$$

---

### Step-by-Step Solution

#### 1. Binary Column Addition & Bitwise Carry Propagation
We set up the 8-bit full-adder chain from bit $0$ (LSB) to bit $7$ (MSB):

$$\begin{array}{rcccccccccl}
\text{Carry-in } (C_i): & 0 & 1 & 1 & 1 & 1 & 1 & 1 & 0 & \leftarrow & \text{Carries } (C_8 \dots C_0) \\
\text{Operand } A: & & 0 & 1 & 1 & 1 & 1 & 1 & 1 & 1 & (127_{10} = \text{0x7F}) \\
\text{Operand } B: & + & 0 & 1 & 1 & 1 & 1 & 1 & 1 & 1 & (127_{10} = \text{0x7F}) \\
\hline
\text{Sum } S: & & \mathbf{1} & \mathbf{1} & \mathbf{1} & \mathbf{1} & \mathbf{1} & \mathbf{1} & \mathbf{1} & \mathbf{0} & (\text{0xFE}_{16})
\end{array}$$

- **Bit-by-Bit Evaluation:**
  - Bit 0: $1 + 1 + C_0(0) = 2 \implies \text{Sum}_0 = 0, C_1 = 1$
  - Bit 1: $1 + 1 + C_1(1) = 3 \implies \text{Sum}_1 = 1, C_2 = 1$
  - Bit 2: $1 + 1 + C_2(1) = 3 \implies \text{Sum}_2 = 1, C_3 = 1$
  - Bit 3: $1 + 1 + C_3(1) = 3 \implies \text{Sum}_3 = 1, C_4 = 1$
  - Bit 4: $1 + 1 + C_4(1) = 3 \implies \text{Sum}_4 = 1, C_5 = 1$
  - Bit 5: $1 + 1 + C_5(1) = 3 \implies \text{Sum}_5 = 1, C_6 = 1$
  - Bit 6: $1 + 1 + C_6(1) = 3 \implies \text{Sum}_6 = 1, C_7 = 1$
  - Bit 7 (MSB): $0 + 0 + C_7(1) = 1 \implies \text{Sum}_7 = 1, C_8 = 0$

- **Critical Boundary Carries:**
  - Carry-in into MSB ($C_7$): **$1$**
  - Carry-out from MSB ($C_8$): **$0$**
  - Result: **$11111110_2$** ($\text{FE}_{16}$)

---

#### 2. Overflow Analysis

##### Perspective A: Unsigned Integer Interpretation
- **Operand Values:** $A = 127_{10}$, $B = 127_{10}$
- **True Mathematical Sum:** $127 + 127 = 254_{10}$
- **8-Bit Unsigned Dynamic Range:** $[0, 255]$
- **Verification:** Since $254 \le 255$, the mathematical sum fits entirely inside the 8-bit unsigned register.
- **Hardware Flag:** Carry-out $C_8 = 0 \implies \text{Carry Flag } C = 0$.
- **Conclusion:** **No Overflow**

##### Perspective B: Signed (2's Complement) Integer Interpretation
- **Operand Values:** $A = +127_{10}$ (MSB $=0$), $B = +127_{10}$ (MSB $=0$)
- **True Mathematical Sum:** $(+127) + (+127) = +254_{10}$
- **8-Bit Signed Dynamic Range:** $[-128, +127]$
- **Verification:** $+254 > +127$, which exceeds the maximum positive limit of an 8-bit signed integer. The resulting bit pattern $11111110_2$ has MSB $= 1$, which decodes to:
  $$\text{Value} = -2^7 + \sum_{i=1}^6 2^i = -128 + 126 = -2_{10}$$
  Adding two positive integers produced an illogical negative result.
- **Hardware Flag Verification:**
  $$V = C_7 \oplus C_8 = 1 \oplus 0 = 1 \implies \text{Overflow Flag } V = 1$$
- **Conclusion:** **Yes (Overflow Occurred)**

---

### Solution Summary Table (Problem 1)

| Field | Value |
| :--- | :--- |
| **Operation** | $01111111_2 + 01111111_2$ |
| **8-Bit Result** | **$11111110_2$** |
| **If viewed as unsigned integer** | **No** (Sum $= 254 \in [0, 255]$, $C_{out} = 0$) |
| **If viewed as signed integer** | **Yes** (Sum $= +254 \notin [-128, +127]$, $V = 1$) |

---

## Problem 2: 8-Bit Binary Subtraction

### Problem Statement
Given two 8-bit integers, perform the binary subtraction. The result must be represented as an 8-bit binary value. Determine whether an overflow occurs when the result is interpreted as an unsigned integer versus a signed integer.

$$01111110_2 - 10000011_2 = \underline{\hspace{4cm}}_2$$

---

### Step-by-Step Solution

#### 1. Transformation to 2's Complement Addition
Let:
- Minuend $A = 01111110_2 = 126_{10}$
- Subtrahend $B = 10000011_2 = 131_{10}$ (unsigned) or $-125_{10}$ (signed 2's complement)

To execute $A - B$, the ALU negates $B$ into its 2's complement representation ($-B$) and performs addition:
1. Bitwise Inversion (1's complement):
   $$\sim B = \sim(10000011_2) = 01111100_2$$
2. Add $1$ (2's complement):
   $$-B = \sim B + 1 = 01111100_2 + 1 = 01111101_2 \quad (+125_{10})$$

---

#### 2. Binary Column Addition of $A + (-B)$

$$\begin{array}{rcccccccccl}
\text{Carry-in } (C_i): & 0 & 1 & 1 & 1 & 1 & 1 & 0 & 0 & \leftarrow & \text{Carries } (C_8 \dots C_0) \\
\text{Operand } A: & & 0 & 1 & 1 & 1 & 1 & 1 & 1 & 0 & (126_{10} = \text{0x7E}) \\
\text{Operand } (-B): & + & 0 & 1 & 1 & 1 & 1 & 1 & 0 & 1 & (125_{10} = \text{0x7D}) \\
\hline
\text{Sum } S: & & \mathbf{1} & \mathbf{1} & \mathbf{1} & \mathbf{1} & \mathbf{1} & \mathbf{0} & \mathbf{1} & \mathbf{1} & (\text{0xFB}_{16})
\end{array}$$

- **Bit-by-Bit Evaluation:**
  - Bit 0: $0 + 1 + C_0(0) = 1 \implies \text{Sum}_0 = 1, C_1 = 0$
  - Bit 1: $1 + 0 + C_1(0) = 1 \implies \text{Sum}_1 = 1, C_2 = 0$
  - Bit 2: $1 + 1 + C_2(0) = 2 \implies \text{Sum}_2 = 0, C_3 = 1$
  - Bit 3: $1 + 1 + C_3(1) = 3 \implies \text{Sum}_3 = 1, C_4 = 1$
  - Bit 4: $1 + 1 + C_4(1) = 3 \implies \text{Sum}_4 = 1, C_5 = 1$
  - Bit 5: $1 + 1 + C_5(1) = 3 \implies \text{Sum}_5 = 1, C_6 = 1$
  - Bit 6: $1 + 1 + C_6(1) = 3 \implies \text{Sum}_6 = 1, C_7 = 1$
  - Bit 7 (MSB): $0 + 0 + C_7(1) = 1 \implies \text{Sum}_7 = 1, C_8 = 0$

- **Critical Boundary Carries:**
  - Carry-in into MSB ($C_7$): **$1$**
  - Carry-out from MSB ($C_8$): **$0$**
  - Result: **$11111011_2$** ($\text{FB}_{16}$)

---

#### 3. Overflow Analysis

##### Perspective A: Unsigned Integer Interpretation
- **Operand Values:** $A = 126_{10}$, $B = 131_{10}$
- **True Mathematical Difference:** $126 - 131 = -5_{10}$
- **8-Bit Unsigned Dynamic Range:** $[0, 255]$
- **Underflow / Borrow Detection:**
  - Because $-5 < 0$, a negative value cannot be represented as an unsigned integer.
  - In unsigned subtraction $A - B$, an underflow (borrow) occurs whenever $A < B$.
  - Hardware mapping: $\text{Borrow} = \overline{C_8} = 1 - C_8$.
  - Since $C_8 = 0$, $\text{Borrow} = 1$, indicating an unsigned overflow/underflow condition. The resulting bit pattern $11111011_2$ evaluates to $251_{10}$ ($256 - 5$).
- **Conclusion:** **Yes (Overflow / Borrow Occurred)**

##### Perspective B: Signed (2's Complement) Integer Interpretation
- **Operand Values:**
  - $A = 01111110_2 = +126_{10}$ (positive)
  - $B = 10000011_2 = -125_{10}$ (negative, because $\sim(10000011) + 1 = 01111101_2 = 125$)
- **True Mathematical Difference:**
  $$A - B = (+126) - (-125) = +126 + 125 = +251_{10}$$
- **8-Bit Signed Dynamic Range:** $[-128, +127]$
- **Verification:**
  - $+251 > +127$, which exceeds the maximum positive 8-bit limit.
  - Subtracting a negative integer from a positive integer $(\text{Positive} - \text{Negative})$ mathematically must yield a positive integer.
  - The resulting 8-bit pattern $11111011_2$ has MSB $= 1$, yielding $-5_{10}$ in 2's complement.
- **Hardware Flag Verification:**
  $$V = C_7 \oplus C_8 = 1 \oplus 0 = 1 \implies \text{Overflow Flag } V = 1$$
- **Conclusion:** **Yes (Overflow Occurred)**

---

### Solution Summary Table (Problem 2)

| Field | Value |
| :--- | :--- |
| **Operation** | $01111110_2 - 10000011_2$ |
| **8-Bit Result** | **$11111011_2$** |
| **If viewed as unsigned integer** | **Yes** (Difference $= -5 \notin [0, 255]$, $\text{Borrow} = \overline{C_{out}} = 1$) |
| **If viewed as signed integer** | **Yes** (Difference $= +251 \notin [-128, +127]$, $V = 1$) |

---

## Key Takeaways & Master Reference Guide

### Flag Computation Matrix ($n$-bit Arithmetic)

```text
                            ┌──────────────────────────────────────────────┐
                            │           ALU Status Flag Formulas           │
                            ├──────────────────────────────────────────────┤
                            │ Zero Flag:      Z = ~(S_0 | S_1 | ... | S_7) │
                            │ Sign Flag:      S = S_7                      │
                            │ Carry Flag:     C = C_8 (Add) or ~C_8 (Sub)  │
                            │ Overflow Flag:  V = C_7 ^ C_8                │
                            └──────────────────────────────────────────────┘
```

### Unsigned vs. Signed Overflow Quick-Check Rules

1. **Unsigned Arithmetic:**
   - **Addition ($A + B$):** Overflow occurs $\iff C_{out} = 1$ ($\text{True Sum} \ge 2^n$).
   - **Subtraction ($A - B$):** Overflow (Borrow) occurs $\iff C_{out} = 0$ ($A < B$, resulting in negative difference).

2. **Signed 2's Complement Arithmetic:**
   - **Addition ($A + B$):**
     - $(\text{Positive} + \text{Positive} = \text{Negative}) \implies \text{Overflow } (V=1)$
     - $(\text{Negative} + \text{Negative} = \text{Positive}) \implies \text{Overflow } (V=1)$
     - $(\text{Positive} + \text{Negative}) \implies \text{Overflow Impossible } (V=0)$
   - **Subtraction ($A - B$):**
     - $(\text{Positive} - \text{Negative} = \text{Negative}) \implies \text{Overflow } (V=1)$
     - $(\text{Negative} - \text{Positive} = \text{Positive}) \implies \text{Overflow } (V=1)$
     - $(\text{Same Sign} - \text{Same Sign}) \implies \text{Overflow Impossible } (V=0)$
   - **Universal Hardware Check:**
     $$V = C_{in\text{ (MSB)}} \oplus C_{out\text{ (MSB)}}$$


## References & Navigation

- **Related Notes:** [[Binary Addition, Subtraction & Carry Lookahead Adders]]
