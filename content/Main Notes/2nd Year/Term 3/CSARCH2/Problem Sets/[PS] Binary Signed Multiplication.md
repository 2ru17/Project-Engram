---
id: problem_set_binary_signed_multiplication
type: problem_set
course: CSARCH2
topic: "Binary Signed Multiplication"
status: completed
---

# Problem Set - Binary Signed Multiplication

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Binary Arithmetic]] #[[Multiplication]] #[[Booth's Algorithm]] #[[Sequential Circuits]] #[[ALU]]

---

## Overview

Binary integer multiplication in modern [[Computer Architecture]] is a fundamental arithmetic operation executed by the Arithmetic Logic Unit ([[ALU]]). While unsigned multiplication is conceptually identical to standard elementary base-2 multiplication, signed integers represented in **2's complement** require specialized hardware algorithms to correctly maintain sign bits and manage partial product accumulations without full sign-extension overhead.

```text
                  ┌──────────────────────────────────────────────────────────┐
                  │              Signed Binary Multiplication                │
                  └────────────────────────────┬─────────────────────────────┘
                                               │
                ┌──────────────────────────────┴──────────────────────────────┐
                ▼                                                             ▼
   ┌─────────────────────────┐                                   ┌─────────────────────────┐
   │    Software / Manual    │                                   │   Hardware Sequential   │
   │      Pencil & Paper     │                                   │       Multipliers       │
   └────────────┬────────────┘                                   └────────────┬────────────┘
                │                                                             │
   ┌────────────┴────────────┐                                   ┌────────────┴────────────┐
   ▼                         ▼                                   ▼                         ▼
┌─────────────────────┐   ┌─────────────────────┐             ┌─────────────────────┐   ┌─────────────────────┐
│ Radix-2 Booth Recode│   │ Radix-4 Bit-Pair    │             │ Hardware Radix-2    │   │ Array / Tree        │
│ (Strings of 1s)     │   │ (Extended Booth)    │             │ Booth Multiplier    │   │ Multipliers         │
│ Summands: n         │   │ Summands: ⌈n/2⌉     │             │ (A, Q, Q_-1, M)     │   │ (Wallace/Dadda)     │
└─────────────────────┘   └─────────────────────┘             └─────────────────────┘   └─────────────────────┘
```

This problem set explores four distinct techniques for evaluating signed binary multiplication:
1. **Pencil-and-Paper Method (Signed 2's Complement)**: Manual calculation using signed extension and correction subtraction for negative multipliers.
2. **Booth's Algorithm (Radix-2 Recoding)**: Recoding the multiplier into digits $\{-1, 0, +1\}$ by exploiting runs of consecutive binary $1$s.
3. **Extended Booth's Algorithm (Radix-4 Bit-Pair Recoding)**: Grouping multiplier bits into overlapping 3-bit windows to halve the number of summands.
4. **Sequential Circuit Binary Multiplier (Hardware Multiplier)**: The cycle-by-cycle register-transfer level (RTL) implementation utilizing registers $A$, $Q$, flip-flop $Q_{-1}$, and multiplicand register $M$.

---

## Theoretical Principles & Algorithm Mechanics

### 1. Determining Operand Bit-Widths in 2's Complement

To represent any signed decimal integer $X$ in 2's complement with the **fewest number of bits** ($k$ bits):
- The dynamic range for a $k$-bit 2's complement integer is:
  $$\text{Range}_k = [-2^{k-1}, \, +2^{k-1} - 1]$$
- For a **positive integer** ($X > 0$), the Most Significant Bit (MSB, sign bit) must be `0`. Thus, $k$ must satisfy:
  $$2^{k-1} - 1 \ge X \implies 2^{k-1} > X$$
- For a **negative integer** ($X < 0$), the sign bit must be `1`. Thus, $k$ must satisfy:
  $$-2^{k-1} \le X$$

#### Operand Bit Determination for $27 \times 7$:
- **Multiplicand ($M = +27_{10}$):**
  - In unsigned binary: $27 = 16 + 8 + 2 + 1 = 11011_2$ (5 bits).
  - In 5-bit 2's complement, `11011` represents $-16 + 8 + 2 + 1 = -5$.
  - Therefore, an additional sign bit `0` is required:
    $$M = +27_{10} = \mathbf{011011_2} \quad (k = 6 \text{ bits})$$
- **Multiplier ($Q = +7_{10}$):**
  - In unsigned binary: $7 = 4 + 2 + 1 = 111_2$ (3 bits).
  - In 3-bit 2's complement, `111` represents $-1$.
  - With a leading sign bit `0`, the fewest bits for $+7$ is $k = 4$ bits ($0111_2$).
  - In synchronous hardware datapath designs where registers $A$, $Q$, and $M$ share uniform word widths ($n = 6$), $Q$ is sign-extended to 6 bits:
    $$Q = +7_{10} = \mathbf{000111_2} \quad (k = 6 \text{ bits})$$

---

### 2. Method 1: Pencil-and-Paper Method

The pencil-and-paper algorithm for signed 2's complement multiplication proceeds as follows:
1. Represent the multiplicand ($M$, $m$ bits) and multiplier ($Q$, $n$ bits) in 2's complement format.
2. The final product has a length of $m + n$ bits. The first intermediate product is sign-extended to $m + n$ bits.
3. Succeeding intermediate products are generated for each multiplier bit $Q_i$, shifted left by $i$ positions (or aligned successively to the right), and sign-extended to match the product width.
4. **Correction Step for Negative Multiplier:** If the multiplier is negative ($Q_{n-1} = 1$), the final partial product corresponding to the sign bit represents $-Q_{n-1} 2^{n-1}$. Hence, subtract the multiplicand (i.e., add the 2's complement of $M$, $-M$), sign-extended and shifted to the sign-bit position. If the multiplier is positive ($Q_{n-1} = 0$), this correction step is omitted.

---

### 3. Method 2: Booth's Algorithm (Radix-2 Recoding)

Booth's multiplication algorithm treats positive and negative multipliers uniformly. Instead of performing an addition for every $1$ bit, it replaces a cluster of consecutive $1$s with a single subtraction at the start of the cluster and a single addition after the end of the cluster:
$$2^i + 2^{i-1} + \dots + 2^j = 2^{i+1} - 2^j$$

#### Recoding Rules:
1. Append an implicit bit $Q_{-1} = 0$ to the right of the Least Significant Bit ($Q_0$).
2. For each bit position $i \in [0, n-1]$, examine the pair $(Q_i, \, Q_{i-1})$:
   - $00 \implies \mathbf{0}$ (No operation)
   - $01 \implies \mathbf{+1}$ (End of a string of 1s: Add $M$)
   - $10 \implies \mathbf{-1}$ (Beginning of a string of 1s: Subtract $M$, i.e., Add $-M$)
   - $11 \implies \mathbf{0}$ (Continuation of a string of 1s: No operation)
3. The recoded multiplier digits $B_i \in \{-1, 0, +1\}$ satisfy:
   $$Q = \sum_{i=0}^{n-1} B_i 2^i = \sum_{i=0}^{n-1} (Q_{i-1} - Q_i) 2^i$$
4. Perform manual multiplication using $B_i \times M$, shifting each partial product by $i$ bit positions, and accumulating the results.

---

### 4. Method 3: Extended Booth's Algorithm (Radix-4 Bit-Pair Recoding)

Extended Booth's algorithm (also called **Bit-Pair Recoding** or **Radix-4 Booth Multiplier**) inspects **triplets** of overlapping bits $(Q_{2i+1}, Q_{2i}, Q_{2i-1})$ with $Q_{-1} = 0$. This reduces the total number of partial products from $n$ to $\lceil n/2 \rceil$, doubling hardware multiplication speed.

```text
Bit Triplets:      (Q_5  Q_4  Q_3)   (Q_3  Q_2  Q_1)   (Q_1  Q_0  Q_-1)
                     └─────┬─────┘     └─────┬─────┘     └─────┬─────┘
Radix-4 Digit:          Digit 2           Digit 1           Digit 0
Shift Weight:             4^2               4^1               4^0
```

#### Bit-Pair Recoding Table:

| $Q_{2i+1}$ (MSB) | $Q_{2i}$ | $Q_{2i-1}$ (LSB) | Recoded Value ($D_i$) | Operation on Multiplicand $M$ |
| :---: | :---: | :---: | :---: | :--- |
| `0` | `0` | `0` | $\mathbf{0}$ | $0 \times M = 0$ |
| `0` | `0` | `1` | $\mathbf{+1}$ | $+1 \times M = +M$ |
| `0` | `1` | `0` | $\mathbf{+1}$ | $+1 \times M = +M$ |
| `0` | `1` | `1` | $\mathbf{+2}$ | $+2 \times M = M \ll 1$ (Shift $M$ left 1 bit) |
| `1` | `0` | `0` | $\mathbf{-2}$ | $-2 \times M = (-M) \ll 1$ (Shift $-M$ left 1 bit) |
| `1` | `0` | `1` | $\mathbf{-1}$ | $-1 \times M = -M$ (2's complement of $M$) |
| `1` | `1` | `0` | $\mathbf{-1}$ | $-1 \times M = -M$ (2's complement of $M$) |
| `1` | `1` | `1` | $\mathbf{0}$ | $0 \times M = 0$ |

#### Algebraic Derivation:
$$D_i = -2 Q_{2i+1} + Q_{2i} + Q_{2i-1}$$
Each partial product $D_i \times M$ is shifted left by $2i$ bit positions (multiplied by $4^i$).

---

### 5. Method 4: Sequential Circuit Binary Multiplier (Hardware Architecture)

The hardware sequential multiplier executes radix-2 Booth's algorithm through discrete synchronous clock cycles (passes).

```text
                            ┌────────────────────────┐
                            │ Multiplicand Reg (M)   │
                            └───────────┬────────────┘
                                        │
                                        ▼
    ┌───────────────────────────┬───────────────────────────┐
    │     Accumulator (A)       │      Multiplier (Q)       │ ──► [ Q_-1 ]
    │        (n bits)           │         (n bits)          │     (1 bit)
    └───────────────────────────┴───────────────────────────┘
                  │                           │
                  └─────────────┬─────────────┘
                                │
                                ▼
                   [ Control Logic & Shifter ]
                   (Inspects Q_0 and Q_-1,
                    Controls Adder/Subtractor,
                    Performs Arithmetic Shift Right)
```

#### Datapath Registers:
- **$M$ (Multiplicand Register):** Holds the $n$-bit 2's complement multiplicand.
- **$-M$:** Computed as the 2's complement of $M$ ($\sim M + 1$).
- **$A$ (Accumulator):** Initialized to all zeros ($00\dots0_2$, $n$ bits).
- **$Q$ (Multiplier Register):** Initialized to the $n$-bit multiplier.
- **$Q_{-1}$ (Flip-Flop):** Initialized to `0`.
- **Pass Counter:** Initialized to $n$ (decremented on each cycle).

#### Operational Loop per Clock Cycle (Pass):
1. **Condition Inspection:** Examine $(Q_0, \, Q_{-1})$:
   - If $Q_0 Q_{-1} = 01 \implies A \leftarrow A + M$
   - If $Q_0 Q_{-1} = 10 \implies A \leftarrow A - M \quad (A \leftarrow A + (-M))$
   - If $Q_0 Q_{-1} \in \{00, 11\} \implies$ No arithmetic operation ($A$ unchanged).
2. **Arithmetic Shift Right (ASR):** Simultaneously shift the combined register $[A, \, Q, \, Q_{-1}]$ to the right by 1 bit:
   - The sign bit of $A$ ($A_{n-1}$) is replicated (arithmetic shift).
   - $A_0$ shifts into $Q_{n-1}$.
   - $Q_0$ shifts into $Q_{-1}$.
   - The previous $Q_{-1}$ is discarded.
3. Repeat for $n$ passes. The final $2n$-bit product resides in the concatenated register pair $[A, \, Q]$.

---

## Detailed Problem Solutions: $27 \times 7$

### Problem Setup & Operand Encodings

We evaluate the product of $27_{10}$ and $7_{10}$:
$$\text{Product} = 27 \times 7 = 189_{10}$$

| Operand | Decimal | Fewest Bits (Signed 2's Complement) | 6-bit Hardware Register Format |
| :--- | :---: | :--- | :--- |
| **Multiplicand ($M$)** | $+27$ | `011011` (6 bits) | $M = 011011_2$ |
| **Multiplier ($Q$)** | $+7$ | `0111` (4 bits) | $Q = 000111_2$ |

- **Two's Complement of Multiplicand ($-M$):**
  $$M = 011011_2 \implies \sim M = 100100_2 \implies -M = 100100 + 1 = \mathbf{100101_2} \quad (-27_{10})$$
- **Expected Product in Binary:**
  $$+189_{10} = 128 + 32 + 16 + 8 + 4 + 1 = \mathbf{0000 1011 1101_2} \quad (12 \text{ bits})$$

---

### Try #1: $27 \times 7$ using Pencil-and-Paper Method

#### Operand Setup:
- Multiplicand $M = 011011_2$ ($m = 6$ bits)
- Multiplier $Q = 000111_2$ ($n = 6$ bits)
- Product bit-length: $m + n = 12$ bits.

#### Step-by-Step Multiplication Layout:

```text
            0 1 1 0 1 1      (Multiplicand M = +27)
     x      0 0 0 1 1 1      (Multiplier Q = +7)
     ------------------
     000000011011            (Bit 0 = 1: 1 * M, sign-extended to 12 bits)
     00000011011             (Bit 1 = 1: 1 * M, shifted left 1)
     0000011011              (Bit 2 = 1: 1 * M, shifted left 2)
     000000000               (Bit 3 = 0: 0 * M, shifted left 3)
     00000000                (Bit 4 = 0: 0 * M, shifted left 4)
     0000000                 (Bit 5 = 0: 0 * M, shifted left 5)
     ------------------
     000010111101            (Sum of partial products = +189_10)
```

#### Step-by-Step Accumulation:
1. **Partial Product 0 ($Q_0 = 1$):** `0000 0001 1011` ($+27$)
2. **Partial Product 1 ($Q_1 = 1$):** `0000 0011 0110` ($+54$)
   $$\text{Sum}_{0+1} = 000000011011 + 000000110110 = 000001010001_2 \quad (+81_{10})$$
3. **Partial Product 2 ($Q_2 = 1$):** `0000 0110 1100` ($+108$)
   $$\text{Sum}_{\text{Total}} = 000001010001 + 000001101100 = \mathbf{0000 1011 1101_2} \quad (+189_{10})$$
4. **Correction Step (Step 4):** Since $Q_5 = 0$ (positive multiplier), no subtraction is required.

---

### Try #2: $27 \times 7$ using Booth's Algorithm

#### Step 1: Multiplier Recoding
Multiplier $Q = 000111_2$. Append $Q_{-1} = 0$:
$$\text{Extended Multiplier Bit-String: } \underbrace{0}_{Q_5} \; \underbrace{0}_{Q_4} \; \underbrace{0}_{Q_3} \; \underbrace{1}_{Q_2} \; \underbrace{1}_{Q_1} \; \underbrace{1}_{Q_0} \; \underbrace{0}_{Q_{-1}}$$

Pair adjacent bits from LSB to MSB:
- **$i = 0$:** $Q_0 Q_{-1} = 10_2 \implies \mathbf{-1}$
- **$i = 1$:** $Q_1 Q_0 = 11_2 \implies \mathbf{0}$
- **$i = 2$:** $Q_2 Q_1 = 11_2 \implies \mathbf{0}$
- **$i = 3$:** $Q_3 Q_2 = 01_2 \implies \mathbf{+1}$
- **$i = 4$:** $Q_4 Q_3 = 00_2 \implies \mathbf{0}$
- **$i = 5$:** $Q_5 Q_4 = 00_2 \implies \mathbf{0}$

$$\text{Booth's Equivalent of Multiplier } (Q) = \mathbf{0 \quad 0 \quad +1 \quad 0 \quad 0 \quad -1}$$

**Value Verification:**
$$0\cdot 2^5 + 0\cdot 2^4 + (+1)\cdot 2^3 + 0\cdot 2^2 + 0\cdot 2^1 + (-1)\cdot 2^0 = 8 - 1 = 7_{10} \quad \checkmark$$

#### Step 2: Multiplication using Booth's Equivalent

- Multiplicand $M = 011011_2$ ($+27$)
- Negated Multiplicand $-M = 100101_2$ ($-27$)

```text
            0 1 1 0 1 1          (Multiplicand M = +27)
     x    0 0 +1 0 0 -1          (Booth's Recoded Multiplier)
     ------------------
     111111100101                (Digit 0 = -1: -M, sign-extended to 12 bits)
     00000000000                 (Digit 1 =  0:  0)
     0000000000                  (Digit 2 =  0:  0)
     000011011000                (Digit 3 = +1: +M, shifted left by 3 bits)
     000000000                   (Digit 4 =  0:  0)
     00000000                    (Digit 5 =  0:  0)
     ------------------
     000010111101                (Sum = +189_10)
```

#### Step-by-Step Addition:
$$\begin{aligned}
  \text{Term } 0 \; (i=0): & \quad 1111\,1110\,0101_2 \quad (-27_{10}) \\
+ \text{Term } 3 \; (i=3): & \quad 0000\,1101\,1000_2 \quad (+216_{10}) \\
\hline
  \text{Sum}: & \quad \mathbf{0000\,1011\,1101_2} \quad (+189_{10})
\end{aligned}$$
*(Discarding the 13th carry-out bit $1$, standard in 2's complement modular addition).*

---

### Try #3: $27 \times 7$ using Extended Booth's Algorithm (Bit-Pair Recoding)

#### Step 1: Triplet Grouping & Bit-Pair Recoding
Multiplier $Q = 000111_2$ ($n = 6$ bits, even length). Append $Q_{-1} = 0$:
$$\text{Bit-String: } (Q_5 Q_4 Q_3) \; (Q_3 Q_2 Q_1) \; (Q_1 Q_0 Q_{-1}) \implies (\mathbf{000}) \; (\mathbf{011}) \; (\mathbf{110})$$

Recode each triplet using $D_i = -2 Q_{2i+1} + Q_{2i} + Q_{2i-1}$:
- **Triplet 0 ($i = 0$):** $(Q_1, Q_0, Q_{-1}) = (1, 1, 0) \implies -2(1) + 1 + 0 = \mathbf{-1}$
- **Triplet 1 ($i = 1$):** $(Q_3, Q_2, Q_1) = (0, 1, 1) \implies -2(0) + 1 + 1 = \mathbf{+2}$
- **Triplet 2 ($i = 2$):** $(Q_5, Q_4, Q_3) = (0, 0, 0) \implies -2(0) + 0 + 0 = \mathbf{0}$

$$\text{Extended Booth's Equivalent of Multiplier } (Q) = \mathbf{0 \quad +2 \quad -1}$$

**Value Verification:**
$$0 \cdot 4^2 + (+2) \cdot 4^1 + (-1) \cdot 4^0 = 0 + 8 - 1 = 7_{10} \quad \checkmark$$

#### Step 2: Partial Product Multiples
- $-1 \times M = -M = 100101_2$ ($-27$)
- $+2 \times M = M \ll 1 = 0110110_2$ ($+54$)
- $0 \times M = 0000000_2$ ($0$)

#### Step 3: Multiplication Layout (Radix-4 Shifts by 2 Bits)

```text
            0 1 1 0 1 1          (Multiplicand M = +27)
     x         0 +2  -1          (Extended Booth Recoded Multiplier)
     ------------------
     111111100101                (Pair 0 = -1: -M, sign-extended to 12 bits)
     000011011000                (Pair 1 = +2: +2M, shifted left by 2 bits)
     000000000000                (Pair 2 =  0:  0, shifted left by 4 bits)
     ------------------
     000010111101                (Sum = +189_10)
```

$$\begin{aligned}
  1111\,1110\,0101_2 & \quad (-27) \\
+ 0000\,1101\,1000_2 & \quad (+216) \\
\hline
  \mathbf{0000\,1011\,1101_2} & \quad (+\mathbf{189_{10}})
\end{aligned}$$

---

### Try #4: $27 \times 7$ using Sequential Circuit Binary Multiplier

#### Register Initialization:
- Multiplicand Register: $M = 011011_2$
- 2's Complement Multiplicand: $-M = 100101_2$
- Accumulator: $A = 000000_2$
- Multiplier Register: $Q = 000111_2$
- LSB History Flip-Flop: $Q_{-1} = 0$
- Total Passes: $n = 6$

---

#### Comprehensive Cycle-by-Cycle Execution Trace:

```text
========================================================================================
INITIAL STATE:
  M = 011011    -M = 100101
  A = 000000     Q = 000111     Q_-1 = 0
========================================================================================

PASS 1:
  Inspect: Q_0 Q_-1 = '10'  -->  Operation: A <-- A - M  (A <-- A + (-M))
    A:       000000
  + (-M):    100101
  -----------------
    A:       100101
  Arithmetic Shift Right (ASR) on [A, Q, Q_-1]:
    A: 100101  -->  ASR  -->  110010  (sign bit '1' preserved, LSB '1' -> Q_5)
    Q: 000111  -->  ASR  -->  100011  (receives '1', LSB '1' -> Q_-1)
    Q_-1: receives old Q_0 = 1
  >>> End of 1st Pass: A = 110010, Q = 100011, Q_-1 = 1

PASS 2:
  Inspect: Q_0 Q_-1 = '11'  -->  Operation: No arithmetic operation (A unchanged)
    A:       110010
  Arithmetic Shift Right (ASR) on [A, Q, Q_-1]:
    A: 110010  -->  ASR  -->  111001  (sign bit '1' preserved, LSB '0' -> Q_5)
    Q: 100011  -->  ASR  -->  010001  (receives '0', LSB '1' -> Q_-1)
    Q_-1: receives old Q_0 = 1
  >>> End of 2nd Pass: A = 111001, Q = 010001, Q_-1 = 1

PASS 3:
  Inspect: Q_0 Q_-1 = '11'  -->  Operation: No arithmetic operation (A unchanged)
    A:       111001
  Arithmetic Shift Right (ASR) on [A, Q, Q_-1]:
    A: 111001  -->  ASR  -->  111100  (sign bit '1' preserved, LSB '1' -> Q_5)
    Q: 010001  -->  ASR  -->  101000  (receives '1', LSB '1' -> Q_-1)
    Q_-1: receives old Q_0 = 1
  >>> End of 3rd Pass: A = 111100, Q = 101000, Q_-1 = 1

PASS 4:
  Inspect: Q_0 Q_-1 = '01'  -->  Operation: A <-- A + M
    A:       111100   (-4 in decimal)
  + M:       011011   (+27 in decimal)
  -----------------
    A:      1010111   --> 6-bit truncated A = 010111 (+23 in decimal)
  Arithmetic Shift Right (ASR) on [A, Q, Q_-1]:
    A: 010111  -->  ASR  -->  001011  (sign bit '0' preserved, LSB '1' -> Q_5)
    Q: 101000  -->  ASR  -->  110100  (receives '1', LSB '0' -> Q_-1)
    Q_-1: receives old Q_0 = 0
  >>> End of 4th Pass: A = 001011, Q = 110100, Q_-1 = 0

PASS 5:
  Inspect: Q_0 Q_-1 = '00'  -->  Operation: No arithmetic operation (A unchanged)
    A:       001011
  Arithmetic Shift Right (ASR) on [A, Q, Q_-1]:
    A: 001011  -->  ASR  -->  000101  (sign bit '0' preserved, LSB '1' -> Q_5)
    Q: 110100  -->  ASR  -->  111010  (receives '1', LSB '0' -> Q_-1)
    Q_-1: receives old Q_0 = 0
  >>> End of 5th Pass: A = 000101, Q = 111010, Q_-1 = 0

PASS 6:
  Inspect: Q_0 Q_-1 = '00'  -->  Operation: No arithmetic operation (A unchanged)
    A:       000101
  Arithmetic Shift Right (ASR) on [A, Q, Q_-1]:
    A: 000101  -->  ASR  -->  000010  (sign bit '0' preserved, LSB '1' -> Q_5)
    Q: 111010  -->  ASR  -->  111101  (receives '1', LSB '0' -> Q_-1)
    Q_-1: receives old Q_0 = 0
  >>> End of 6th Pass: A = 000010, Q = 111101, Q_-1 = 0
========================================================================================
```

---

#### Official Summary Solution Table (Try #4)

| After this pass | Register A | Register Q | Bit $Q_{-1}$ | Description / ALU Action |
| :---: | :---: | :---: | :---: | :--- |
| **Initial** | `000000` | `000111` | `0` | Initialize registers |
| **$1^{\text{st}}$** | `110010` | `100011` | `1` | $Q_0 Q_{-1} = 10 \implies A \leftarrow A - M$; ASR |
| **$2^{\text{nd}}$** | `111001` | `010001` | `1` | $Q_0 Q_{-1} = 11 \implies$ No op; ASR |
| **$3^{\text{rd}}$** | `111100` | `101000` | `1` | $Q_0 Q_{-1} = 11 \implies$ No op; ASR |
| **$4^{\text{th}}$** | `001011` | `110100` | `0` | $Q_0 Q_{-1} = 01 \implies A \leftarrow A + M$; ASR |
| **$5^{\text{th}}$** | `000101` | `111010` | `0` | $Q_0 Q_{-1} = 00 \implies$ No op; ASR |
| **$6^{\text{th}}$** | `000010` | `111101` | `0` | $Q_0 Q_{-1} = 00 \implies$ No op; ASR |

#### Final Product Reconstruction:
$$\text{Product} = [A \,\|\, Q] = \mathbf{000010 \quad 111101_2}$$
$$\text{Decimal Value} = 2^7 + 2^5 + 2^4 + 2^3 + 2^2 + 2^0 = 128 + 32 + 16 + 8 + 4 + 1 = \mathbf{+189_{10}} \quad \checkmark$$

---

## Comparison Matrix of Multiplication Techniques

| Metric / Feature | Pencil-and-Paper | Radix-2 Booth's Algorithm | Radix-4 Extended Booth | Hardware Sequential Multiplier |
| :--- | :--- | :--- | :--- | :--- |
| **Operand Handling** | Requires sign-bit correction step if $Q < 0$ | Uniform for signed/unsigned operands | Uniform for signed/unsigned operands | Uniform via $Q_0 Q_{-1}$ control |
| **Summands Count** | $n$ partial products | At most $n$ partial products | $\lceil n/2 \rceil$ partial products | $n$ clock passes |
| **Best Case Speed** | $Q = 0$ (all zero rows) | Isolated strings of 1s (e.g. `011110` $\to 2$ ops) | Uniform halving of passes | Skips adder if $Q_0 = Q_{-1}$ |
| **Worst Case** | $Q = 11\dots11_2$ ($n$ adds) | Alternating bits `010101` ($n$ adds/subs) | Non-zero digits across all pairs | Alternating bits `010101` |
| **Hardware Complexity** | High software overhead | Low (Standard ALU adder/subtractor) | Moderate (Multiplexer for $\pm 1M, \pm 2M$) | Minimal datapath footprint |

---

## Key Takeaways

1. **2's Complement Sign Preservation:** When converting positive numbers to signed 2's complement, always append a leading `0` sign bit to prevent misinterpretation as a negative value (e.g., $27_{10} = 011011_2$, not $11011_2$).
2. **Booth's Optimization Principle:** Booth's algorithm converts consecutive strings of $1$s into a single subtraction at the LSB boundary and a single addition at the MSB boundary, drastically minimizing ALU addition cycles in clustered binary numbers.
3. **Radix-4 Multipliers in High-Performance CPUs:** By processing 2 bits per cycle through bit-pair recoding, Extended Booth reduces partial product generation time by $50\%$, forming the core building block of modern hardware multipliers.
4. **Shift Invariant:** The hardware sequential multiplier utilizes an **Arithmetic Shift Right (ASR)** to preserve the sign of negative intermediate sums in accumulator $A$ while routing vacated bits seamlessly into multiplier register $Q$.


## References & Navigation

- **Related Notes:** [[Signed Multiplication (Booth's & Extended Booth's Algorithm)]]
