---
id: problem_set_integer_representation
type: problem_set
course: CSARCH2
topic: "Integer Representation"
status: completed
---

# Problem Set - Integer Representation

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Binary Arithmetic]] #[[Data Representation]] #[[Two's Complement]]

---

## Overview

In digital computer systems and [[Computer Architecture]], fixed-width binary words encode numerical values using distinct conventions. Selecting an encoding scheme impacts the hardware complexity of arithmetic units (such as the [[ALU]]), the numerical dynamic range, and the representation of negative values.

```text
                  ┌──────────────────────────────────────────────────────────┐
                  │                 Integer Representation                   │
                  └────────────────────────────┬─────────────────────────────┘
                                               │
               ┌───────────────────────────────┴───────────────────────────────┐
               ▼                                                               ▼
  ┌─────────────────────────┐                                     ┌─────────────────────────┐
  │   Unsigned Integers     │                                     │     Signed Integers     │
  │   [0, 2^n - 1]          │                                     │  (Multiple Conventions) │
  └─────────────────────────┘                                     └────────────┬────────────┘
                                                                               │
                 ┌───────────────────────────┬─────────────────────────────────┴────────────────────────────┐
                 ▼                           ▼                                 ▼                            ▼
    ┌─────────────────────────┐ ┌─────────────────────────┐       ┌─────────────────────────┐  ┌─────────────────────────┐
    │   Sign-and-Magnitude    │ │     1's Complement      │       │     2's Complement      │  │    Biased / Excess-K    │
    │   [-(2^(n-1)-1),        │ │  [-(2^(n-1)-1),         │       │    [-2^(n-1),           │  │   [0 - K, 2^n - 1 - K]  │
    │     2^(n-1)-1]          │ │    2^(n-1)-1]           │       │      2^(n-1) - 1]       │  │ (Used in IEEE 754 exp)│
    │   Dual Zeros (+0, -0)   │ │   Dual Zeros (+0, -0)   │       │   Unique Zero (00...0)  │  └─────────────────────────┘
    └─────────────────────────┘ └─────────────────────────┘       └─────────────────────────┘
```

### Representation Schemes Comparison ($n$-bit word)

1. **Unsigned Binary Representation:**
   - Evaluated as standard base-2 positional notation:
     $$\text{Value} = \sum_{i=0}^{n-1} b_i 2^i$$
   - **Dynamic Range:** $[0, 2^n - 1]$. For a 16-bit word ($n=16$), the range is $[0, 65535]$.

2. **Sign-and-Magnitude (SM):**
   - The Most Significant Bit (MSB, $b_{n-1}$) serves as the sign flag ($0 = \text{positive } (+), 1 = \text{negative } (-)$), while the remaining $n-1$ bits encode the absolute magnitude.
     $$\text{Value} = (-1)^{b_{n-1}} \sum_{i=0}^{n-2} b_i 2^i$$
   - **Dynamic Range:** $[-(2^{n-1} - 1), +(2^{n-1} - 1)]$. For $n=16$: $[-32767, +32767]$.
   - **Drawback:** Dual representations for zero ($+0 = 0000\dots0000_2$ and $-0 = 1000\dots0000_2$), requiring extra hardware comparison logic.

3. **1's Complement (Diminished Radix Complement):**
   - Positive values follow standard binary. Negative values are formed by inverting every bit (logical NOT operation):
     $$\text{Value} = -b_{n-1}(2^{n-1} - 1) + \sum_{i=0}^{n-2} b_i 2^i$$
   - **Dynamic Range:** $[-(2^{n-1} - 1), +(2^{n-1} - 1)]$. For $n=16$: $[-32767, +32767]$.
   - **Drawback:** Contains dual zeros ($+0 = 0000\dots0000_2$ and $-0 = 1111\dots1111_2$) and requires **end-around carry** addition logic.

4. **2's Complement (Radix Complement):**
   - Universal standard in modern microprocessors. Negation of $X$ is formed by inverting all bits and adding $1$ ($\text{neg}(X) = \sim X + 1$).
     $$\text{Value} = -b_{n-1} 2^{n-1} + \sum_{i=0}^{n-2} b_i 2^i$$
   - **Dynamic Range:** $[-2^{n-1}, +(2^{n-1} - 1)]$. For $n=16$: $[-32768, +32767]$.
   - **Advantage:** Exactly one representation for zero ($0000\dots0000_2$), and identical adder circuitry executes both addition and subtraction without sign pre-checks. The asymmetric extra negative value ($-2^{n-1}$, represented as $1000\dots0000_2$) is often referred to as the *weird number* or *most negative number*.

5. **Sign Extension vs. Zero Extension:**
   - **Sign Extension (Signed Values):** Replicates the MSB across higher-order bit positions when widening an $n$-bit integer to an $m$-bit integer ($m > n$).
     $$X_{m\text{-bit}} = \underbrace{b_{n-1} b_{n-1} \dots b_{n-1}}_{m-n \text{ bits}} \,\|\, b_{n-1} b_{n-2} \dots b_0$$
   - **Zero Extension (Unsigned Values):** Appends leading zeros to preserve unsigned magnitude:
     $$X_{m\text{-bit}} = \underbrace{0 0 \dots 0}_{m-n \text{ bits}} \,\|\, b_{n-1} b_{n-2} \dots b_0$$

---

## Problem Set 1: Decimal to 16-Bit Binary Representation

> **Instructions:** Represent the following decimal integers in the specified 16-bit binary representation. If the number cannot be represented within the format's dynamic range, designate as **N/A**.

### Summary Solution Table

| Decimal Value | 16-bit 2's Complement | 16-bit 1's Complement | 16-bit Sign and Magnitude | 16-bit Unsigned Representation |
| :--- | :--- | :--- | :--- | :--- |
| **0.) Range** | $[-32768, +32767]$ | $[-32767, +32767]$ | $[-32767, +32767]$ | $[0, 65535]$ |
| **1.) $+125$** | `0000 0000 0111 1101` | `0000 0000 0111 1101` | `0000 0000 0111 1101` | `0000 0000 0111 1101` |
| **2.) $-254$** | `1111 1111 0000 0010` | `1111 1111 0000 0001` | `1000 0000 1111 1110` | `N/A` |
| **3.) $+65534$** | `N/A` | `N/A` | `N/A` | `1111 1111 1111 1110` |
| **4.) $-32768$** | `1000 0000 0000 0000` | `N/A` | `N/A` | `N/A` |

---

### Step-by-Step Derivations

#### Problem 0: Theoretical Dynamic Ranges ($n = 16$)

1. **16-bit 2's Complement:**
   - Minimum: $-2^{16-1} = -2^{15} = -32768$ (Binary: `1000 0000 0000 0000`)
   - Maximum: $+2^{16-1} - 1 = +2^{15} - 1 = +32767$ (Binary: `0111 1111 1111 1111`)
   - **Range:** $[-32768, +32767]$

2. **16-bit 1's Complement:**
   - Minimum: $-(2^{16-1} - 1) = -(2^{15} - 1) = -32767$ (Binary: `1000 0000 0000 0000`)
   - Maximum: $+(2^{16-1} - 1) = +32767$ (Binary: `0111 1111 1111 1111`)
   - **Range:** $[-32767, +32767]$

3. **16-bit Sign and Magnitude:**
   - Minimum: $-(2^{16-1} - 1) = -32767$ (Binary: `1111 1111 1111 1111`)
   - Maximum: $+(2^{16-1} - 1) = +32767$ (Binary: `0111 1111 1111 1111`)
   - **Range:** $[-32767, +32767]$

4. **16-bit Unsigned:**
   - Minimum: $0$ (Binary: `0000 0000 0000 0000`)
   - Maximum: $2^{16} - 1 = 65535$ (Binary: `1111 1111 1111 1111`)
   - **Range:** $[0, 65535]$

---

#### Problem 1: Value $= +125_{10}$

- **Binary Conversion of Magnitude:**
  $$125_{10} = 64 + 32 + 16 + 8 + 4 + 1 = 2^6 + 2^5 + 2^4 + 2^3 + 2^2 + 2^0 = 01111101_2$$
- Zero-extended to 16 bits:
  $$+125_{10} = 0000\ 0000\ 0111\ 1101_2$$

- **Format Encoding:**
  - **16-bit 2's complement:** Positive number, sign bit $0 \implies$ `0000 0000 0111 1101`
  - **16-bit 1's complement:** Positive number, identical to true binary $\implies$ `0000 0000 0111 1101`
  - **16-bit Sign and Magnitude:** MSB is $0$ (positive), 15 magnitude bits $\implies$ `0000 0000 0111 1101`
  - **16-bit Unsigned:** $125 \in [0, 65535] \implies$ `0000 0000 0111 1101`

---

#### Problem 2: Value $= -254_{10}$

- **Binary Conversion of Magnitude ($|-254| = 254_{10}$):**
  $$254_{10} = 128 + 64 + 32 + 16 + 8 + 4 + 2 = 1111\ 1110_2$$
  16-bit positive pattern:
  $$+254_{10} = 0000\ 0000\ 1111\ 1110_2$$

- **Format Encoding:**
  1. **16-bit Unsigned:**
     - $-254 < 0$, strictly outside $[0, 65535] \implies$ **N/A**
  2. **16-bit Sign and Magnitude:**
     - Set MSB ($b_{15}$) to $1$ (negative sign indicator).
     - Remaining 15 bits represent magnitude $254_{10} = 000\ 0000\ 1111\ 1110_2$.
     - Bit string: `1000 0000 1111 1110`
  3. **16-bit 1's Complement:**
     - Invert all 16 bits of $+254_{10}$:
       $$\sim(0000\ 0000\ 1111\ 1110_2) = 1111\ 1111\ 0000\ 0001_2$$
     - Bit string: `1111 1111 0000 0001`
  4. **16-bit 2's Complement:**
     - Add $1$ to the 1's complement representation:
       $$1111\ 1111\ 0000\ 0001_2 + 1 = 1111\ 1111\ 0000\ 0010_2$$
     - Bit string: `1111 1111 0000 0010`

---

#### Problem 3: Value $= +65534_{10}$

- **Range Verification:**
  - 16-bit signed maximum is $+32767$.
  - Because $+65534 > +32767$, this value causes signed representation overflow.
  - **16-bit 2's complement:** **N/A**
  - **16-bit 1's complement:** **N/A**
  - **16-bit Sign and Magnitude:** **N/A**

- **16-bit Unsigned Representation:**
  - Dynamic range: $[0, 65535]$. Since $65534 \le 65535$, it is fully representable.
  - Calculation:
    $$65534_{10} = 65535_{10} - 1 = \text{0xFFFF}_{16} - 1 = \text{0xFFFE}_{16}$$
    $$\text{0xFFFE}_{16} = 1111\ 1111\ 1111\ 1110_2$$
  - Bit string: `1111 1111 1111 1110`

---

#### Problem 4: Value $= -32768_{10}$

- **Range Verification:**
  - Signed symmetric range (1's complement and Sign-Magnitude): $[-32767, +32767]$.
    - $-32768 < -32767 \implies$ **N/A** for 1's complement and Sign-and-Magnitude.
  - Unsigned range: $[0, 65535]$.
    - $-32768 < 0 \implies$ **N/A** for unsigned representation.

- **16-bit 2's Complement Representation:**
  - 2's complement range is $[-32768, +32767]$. $-32768 = -2^{15}$ is representable as the unique asymmetric minimum.
  - Derivation:
    $$-32768 = -1 \cdot 2^{15} + \sum_{i=0}^{14} 0 \cdot 2^i = 1000\ 0000\ 0000\ 0000_2 \quad (\text{0x8000}_{16})$$
  - Bit string: `1000 0000 0000 0000`

---

## Problem Set 2: 16-Bit Binary to Decimal Decoding

> **Instructions:** Given the 16-bit binary pattern, calculate the decimal equivalent value under each specified integer representation scheme.

### Summary Solution Table

| Binary Bit Pattern | 16-bit 2's Complement | 16-bit 1's Complement | 16-bit Sign and Magnitude | 16-bit Unsigned Representation |
| :--- | :--- | :--- | :--- | :--- |
| **5.) `0000 1111 0000 1000`** | `+3848` | `+3848` | `+3848` | `3848` |
| **6.) `1111 0000 1111 0001`** | `-3855` | `-3854` | `-28913` | `61681` |

---

### Step-by-Step Derivations

#### Problem 5: Binary String $= \text{0000 1111 0000 1000}_2$ ($\text{0x0F08}_{16}$)

- **MSB Inspection:**
  $$b_{15} = 0 \implies \text{Non-negative (positive) value across all signed systems.}$$
  When $b_{15} = 0$, all signed formats share identical numeric interpretation with unsigned binary.

- **Positional Expansion:**
  $$\text{Value} = 2^{11} + 2^{10} + 2^9 + 2^8 + 2^3 = 2048 + 1024 + 512 + 256 + 8 = 3848_{10}$$
  Hexadecimal verification:
  $$\text{0x0F08} = 15 \times 16^2 + 8 \times 16^0 = 15 \times 256 + 8 = 3840 + 8 = 3848_{10}$$

- **Results:**
  - **16-bit 2's complement:** `+3848`
  - **16-bit 1's complement:** `+3848`
  - **16-bit Sign and Magnitude:** `+3848`
  - **16-bit Unsigned:** `3848`

---

#### Problem 6: Binary String $= \text{1111 0000 1111 0001}_2$ ($\text{0xF0F1}_{16}$)

- **MSB Inspection:**
  $$b_{15} = 1 \implies \text{Negative value in signed representations, large value in unsigned.}$$

1. **16-bit Unsigned Interpretation:**
   $$\text{Value} = 15 \times 16^3 + 0 \times 16^2 + 15 \times 16^1 + 1 \times 16^0$$
   $$\text{Value} = 15 \times 4096 + 0 + 15 \times 16 + 1 = 61440 + 240 + 1 = 61681_{10}$$

2. **16-bit Sign and Magnitude Interpretation:**
   - Sign bit $b_{15} = 1 \implies \text{Negative } (-)$.
   - Lower 15 bits ($b_{14..0}$): `111 0000 1111 0001` ($\text{0x70F1}_{16}$).
   - Absolute magnitude:
     $$\text{Magnitude} = 7 \times 4096 + 0 \times 256 + 15 \times 16 + 1 = 28672 + 240 + 1 = 28913_{10}$$
   - **Decimal Value:** $-28913_{10}$

3. **16-bit 1's Complement Interpretation:**
   - Sign bit $b_{15} = 1 \implies \text{Negative } (-)$.
   - Bitwise inversion to recover magnitude:
     $$\sim(1111\ 0000\ 1111\ 0001_2) = 0000\ 1111\ 0000\ 1110_2 = \text{0x0F0E}_{16}$$
   - Absolute magnitude:
     $$\text{Magnitude} = 15 \times 256 + 14 = 3840 + 14 = 3854_{10}$$
   - **Decimal Value:** $-3854_{10}$

4. **16-bit 2's Complement Interpretation:**
   - **Method A (Negation Rule):**
     $$\sim(1111\ 0000\ 1111\ 0001_2) + 1 = 0000\ 1111\ 0000\ 1110_2 + 1 = 0000\ 1111\ 0000\ 1111_2 = \text{0x0F0F}_{16}$$
     $$\text{Magnitude} = 15 \times 256 + 15 = 3840 + 15 = 3855_{10}$$
     $$\text{Value} = -3855_{10}$$
   - **Method B (Direct Weighted Positional Sum):**
     $$\text{Value} = -b_{15} 2^{15} + \sum_{i=0}^{14} b_i 2^i = -32768 + 28913 = -3855_{10}$$
   - **Method C (Unsigned Modulo Shift):**
     $$\text{Value} = \text{Unsigned} - 2^{16} = 61681 - 65536 = -3855_{10}$$
   - **Decimal Value:** $-3855_{10}$

---

## Key Takeaways & Reference Matrix

### Encoding Schemes at a Glance ($n$ bits)

| Scheme | Representation of Positives | Representation of Negatives | Zero Representation | Range ($n=16$) |
| :--- | :--- | :--- | :--- | :--- |
| **Unsigned** | Natural binary | N/A | Single: `0000...0000` | $[0, 65535]$ |
| **Sign-Magnitude** | MSB = `0`, lower bits = magnitude | MSB = `1`, lower bits = magnitude | Dual: `+0` (`00..00`), `-0` (`10..00`) | $[-32767, +32767]$ |
| **1's Complement** | Natural binary | Bitwise NOT ($\sim X$) | Dual: `+0` (`00..00`), `-0` (`11..11`) | $[-32767, +32767]$ |
| **2's Complement** | Natural binary | Bitwise NOT $+ 1$ ($\sim X + 1$) | Single: `0000...0000` | $[-32768, +32767]$ |
| **Biased ($K=2^{n-1}$)** | Value $+ K$ in binary | Value $+ K$ in binary | Single: `1000...0000` | $[-32768, +32767]$ |

### Hardware Implications
- **Why 2's Complement Dominates:**
  1. A single representation for zero eliminates special-case testing logic in conditional branch instructions (`BEQ`, `BNE`).
  2. Standard binary adder hardware computes both addition and subtraction ($A - B = A + \sim B + 1$) without needing separate subtractor circuits.
  3. Continuous modular mapping ($\mathbb{Z} / 2^n \mathbb{Z}$) allows natural wrap-around arithmetic.


## References & Navigation

- **Related Notes:** [[Integer Representation & Fixed-Point Arithmetic]]
