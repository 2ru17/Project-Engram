---
id: csarch2_module_08_fp_arithmetic
type: note
course: CSARCH2
topic: "Floating-Point Arithmetic Operations"
status: completed
---

# Module 08: Floating-Point Arithmetic Operations

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Hardware Modeling]] #[[Floating-Point Arithmetic Operations]]

---

## Overview

> Floating-point arithmetic hardware is substantially more complex than fixed-point integer datapaths due to exponent alignment, variable-length normalization shifts, multi-bit rounding modes, and exception trapping. Furthermore, floating-point arithmetic is inherently non-associative and subject to catastrophic cancellation. This module details the complete algorithmic pipelines for **Floating-Point Addition, Subtraction, Multiplication, and Division**. We formalize intermediate precision retention using **Guard ($G$), Round ($R$), and Sticky ($S$) bits**, and examine the five IEEE 754 rounding standards: Truncation, Round to $+\infty$, Round to $-\infty$, Ties Away from Zero, and Banker's Rounding (Ties to Even).

## Key Definitions

- **Significand Alignment (Denormalization Shift):** The preparatory operation in floating-point addition/subtraction where the significand of the smaller operand is shifted right by $\Delta E = |E_1 - E_2|$ bits so that both operands share an identical exponent base.
- **Guard Bit ($G$):** The first extra bit appended to the right of the intermediate significand during alignment to capture shifted-out precision.
- **Round Bit ($R$):** The second extra bit appended to the right of the Guard bit to increase rounding discrimination.
- **Sticky Bit ($S$):** A single bit set to the logical OR of all subsequent bits shifted past the Round bit ($S = 1$ if any non-zero bit was discarded), ensuring exact detection of non-zero fractional tails.
- **Catastrophic Cancellation:** The severe loss of relative precision that occurs when subtracting two nearly equal floating-point numbers, causing significant leading digits to cancel out and promoting unaligned low-order noise into the most significant bits.
- **Round to Nearest, Ties to Even (Banker's Rounding):** The default IEEE 754 rounding mode that rounds an intermediate value exactly halfway between two representable numbers to whichever adjacent value has a Least Significant Bit ($\text{LSb}$) of `0`, eliminating statistical upward drift.
- **Non-Associativity of FP Arithmetic:** The mathematical reality that due to finite precision and intermediate rounding, $(A + B) + C \neq A + (B + C)$ in floating-point systems.

## Theoretical Framework / Core Concepts

### 1. The 6-Stage Floating-Point Addition/Subtraction Pipeline

Floating-point addition $Z = X \pm Y$ (where $X = (-1)^{S_x} M_x 2^{E_x}$ and $Y = (-1)^{S_y} M_y 2^{E_y}$) proceeds through six discrete hardware pipeline stages:

```text
+--------------------------------------------------------------------------+
|                 6-STAGE FLOATING-POINT ADD/SUB PIPELINE                  |
|                                                                          |
|  [Stage 1: Zero / Special Case Check]                                    |
|   - If X == 0 return Y; if Y == 0 return X; check NaN / Infinity         |
|                     |                                                    |
|                     v                                                    |
|  [Stage 2: Exponent Comparison & Significand Alignment]                  |
|   - delta_E = |Ex - Ey|                                                  |
|   - Shift significand of smaller operand RIGHT by delta_E bits           |
|   - Track Guard (G), Round (R), and Sticky (S) bits                      |
|                     |                                                    |
|                     v                                                    |
|  [Stage 3: Significand Addition / Subtraction]                           |
|   - Add or subtract aligned significands taking signs into account       |
|                     |                                                    |
|                     v                                                    |
|  [Stage 4: Result Normalization]                                         |
|   - If carry out (overflow): Shift RIGHT by 1, increment exponent        |
|   - If leading zeros (cancellation): Shift LEFT by k, decrement exponent |
|                     |                                                    |
|                     v                                                    |
|  [Stage 5: Rounding Stage (G, R, S Evaluation)]                          |
|   - Apply selected IEEE 754 rounding mode; re-normalize if round-up     |
|     causes significand overflow (e.g., 1.111... + 1 -> 10.000...)        |
|                     |                                                    |
|                     v                                                    |
|  [Stage 6: Exception Flag & Packing Stage]                               |
|   - Check for Underflow, Overflow, Inexact flags; pack into IEEE hex     |
+--------------------------------------------------------------------------+
```

### 2. Guard ($G$), Round ($R$), and Sticky ($S$) Bit Mechanics

When shifting a 24-bit significand ($1.f$) right by $k$ positions during alignment, data bits that fall off the right edge must not be discarded arbitrarily:

```text
24-bit Significand Register          Extra Precision Extension
+-----------------------------------+---+---+---+
| 1 . f22 f21 f20 ... f2 f1 f0      | G | R | S |
+-----------------------------------+---+---+---+
                                      |   |   |
  First shifted-out bit --------------+   |   |
  Second shifted-out bit -----------------+   |
  Logical OR of all subsequent bits ----------+ (S = b_3 | b_4 | ... | b_k)
```

- **Alignment Invariant:** Once the sticky bit $S$ becomes `1`, it remains `1` for all subsequent right shifts throughout the operation.

### 3. IEEE 754 Rounding Modes Formalized

Let $L$ be the Least Significant Bit ($\text{LSb}$) of the intermediate significand, followed by the extension bits $G, R, S$:

| Rounding Mode | Mathematical Rule | Action When Extension $(G, R, S) \neq 000$ |
| :--- | :--- | :--- |
| **Round Toward 0 (Truncation)** | Floor towards zero magnitude | Discard $G, R, S$; keep significand unchanged. |
| **Round Toward $+\infty$ (Ceiling)** | Shift toward positive infinity | If positive ($S=0$) and $(G \mid R \mid S) = 1$: **Add 1 to LSb ($L$)**; else discard. |
| **Round Toward $-\infty$ (Floor)** | Shift toward negative infinity | If negative ($S=1$) and $(G \mid R \mid S) = 1$: **Add 1 to LSb ($L$)**; else discard. |
| **Round to Nearest (Ties Away from 0)** | If halfway, round up magnitude | If $G = 1$: **Add 1 to $L$**; else discard. |
| **Round to Nearest (Ties to Even)** | Banker's Rounding (Default) | If $G = 1$ and $(R \mid S \mid L) = 1$: **Add 1 to $L$**; else discard. |

```text
Ties-to-Even Decision Matrix (when G=1):
- Case 1: G=1, (R | S) = 1  --> Strictly greater than half --> Round UP (Add 1 to L)
- Case 2: G=1, R=0, S=0, L=1 --> Exact half, L is ODD   --> Round UP to make L EVEN (Add 1)
- Case 3: G=1, R=0, S=0, L=0 --> Exact half, L is EVEN  --> Round DOWN (Keep L=0)
```

### 4. Floating-Point Multiplication and Division Algorithms

#### Floating-Point Multiplication ($Z = X \times Y$):
1. **Sign Calculation:** $S_z = S_x \oplus S_y$.
2. **Exponent Calculation:** $E_z' = E_x' + E_y' - \text{Bias}$.
3. **Significand Multiplication:**
   $$M_z = (1.f_x) \times (1.f_y)$$
   Since $1.0 \le M_x, M_y < 2.0$, their product satisfies $1.0 \le M_z < 4.0$.
4. **Normalization:**
   - If $M_z \ge 2.0$ ($M_z \in [2.0, 4.0)$): Shift $M_z$ right by 1 bit, increment $E_z'$ by 1.
   - If $M_z \in [1.0, 2.0)$: Exponent remains $E_z'$.
5. **Rounding & Exception Evaluation:** Round using $G, R, S$, check for exponent overflow ($E_z' \ge 255$) or underflow ($E_z' \le 0$).

#### Floating-Point Division ($Z = X / Y$):
1. **Sign Calculation:** $S_z = S_x \oplus S_y$.
2. **Exponent Calculation:** $E_z' = E_x' - E_y' + \text{Bias}$.
3. **Significand Division:**
   $$M_z = \frac{1.f_x}{1.f_y}$$
   Since $1.0 \le M_x, M_y < 2.0$, the quotient satisfies $0.5 < M_z < 2.0$.
4. **Normalization:**
   - If $M_z < 1.0$: Shift $M_z$ left by 1 bit, decrement $E_z'$ by 1.
   - If $M_z \ge 1.0$: Exponent remains $E_z'$.
5. **Rounding & Exceptions:** Round, check for division by zero ($Y=0 \implies \pm\infty$).

## Worked Examples / Calculations / Hardware Traces

### Example 1: Detailed Step-by-Step FP Addition with Guard, Round, Sticky Bits

**Problem:** Perform floating-point addition of two single-precision numbers:
$$X = 1.00000000000000000000000_2 \times 2^0 \quad (\text{Value } 1.0_{10})$$
$$Y = 1.10000000000000000000000_2 \times 2^{-4} \quad (\text{Value } 0.09375_{10})$$
using IEEE 754 Round to Nearest, Ties to Even.

**Solution:**
- **Step 1: Identify Exponents and Difference:**
  - $E_x = 0$, $E_y = -4$.
  - $\Delta E = 0 - (-4) = 4$.
- **Step 2: Align Significand of Smaller Operand ($Y$):**
  - Unshifted $M_y = 1.10000000000000000000000_2$.
  - Shift $M_y$ right by $\Delta E = 4$ positions:
    - Shift 1: `0.1100...0` ($G=0, R=0, S=0$)
    - Shift 2: `0.0110...0`
    - Shift 3: `0.0011...0`
    - Shift 4: `0.0001100...0`
    - Bits shifted into extension: $G = 1, R = 1, S = 0$.
  - Aligned $M_y = 0.00011000000000000000000_2$ with $[G=1, R=1, S=0]$.

- **Step 3: Add Significands ($M_x + M_y$):**
  ```text
    Mx:    1.00000000000000000000000 | G=0 R=0 S=0
  + My:    0.00011000000000000000000 | G=1 R=1 S=0
  ------------------------------------------------
    Sum:   1.00011000000000000000000 | G=1 R=1 S=0
  ```

- **Step 4: Normalization:**
  - The sum is already in normalized form $1.f$ ($E = 0$).

- **Step 5: Rounding (Ties to Even):**
  - $L = 0$ (LSb of significand).
  - Extension: $G=1, R=1, S=0$.
  - Since $G=1$ and $(R \mid S) = 1$, the value is strictly greater than halfway $\implies$ **Round UP (Add 1 to $L$)**:
    $$M_{\text{final}} = 1.00011000000000000000000 + 1 = 1.00011000000000000000001_2$$

- **Verification:**
  - $1.0 + 0.09375 = 1.09375_{10}$.
  - $1.00011000000000000000001_2 = 1 + 2^{-4} + 2^{-5} + 2^{-23} = 1 + 0.0625 + 0.03125 + 1.192 \times 10^{-7} \approx 1.0937501_{10} \quad \checkmark$

### Example 2: Floating-Point Multiplication Trace

**Problem:** Multiply single-precision floats $X = \text{0x40C00000}$ and $Y = \text{0xC1400000}$.

**Solution:**
1. **Unpack $X$ (`0x40C00000`):**
   - $S_x = 0$ ($+$)
   - $E_x' = 10000001_2 = 129_{10} \implies E_x = 129 - 127 = 2$
   - $f_x = 1000000..._2 \implies M_x = 1.100_2 = 1.5_{10}$
   - Value $X = +1.5 \times 2^2 = +6.0_{10}$.

2. **Unpack $Y$ (`0xC1400000`):**
   - $S_y = 1$ ($-$)
   - $E_y' = 10000010_2 = 130_{10} \implies E_y = 130 - 127 = 3$
   - $f_y = 1000000..._2 \implies M_y = 1.100_2 = 1.5_{10}$
   - Value $Y = -1.5 \times 2^3 = -12.0_{10}$.

3. **Compute Result $Z = X \times Y$:**
   - **Sign:** $S_z = S_x \oplus S_y = 0 \oplus 1 = 1$ (Negative).
   - **Exponent:** $E_z' = E_x' + E_y' - \text{Bias} = 129 + 130 - 127 = 132_{10}$.
   - **Significand Product:**
     $$M_z = M_x \times M_y = 1.100_2 \times 1.100_2 = (1.5) \times (1.5) = 2.25_{10} = (10.010)_2$$
   - **Normalize:** Since $M_z \ge 2.0$, shift right by 1 bit and increment exponent:
     $$M_z = 1.001000...0_2, \quad E_z' = 132 + 1 = 133_{10} = (10000101)_2$$
   - **Assemble Hex:**
     - $S = 1$, $E' = 10000101_2$, $f = 001000...0_2$
     - Binary: `1 10000101 00100000000000000000000`
     - Hex: `0xC2900000`.
   - **Verification:** Value $= -1.001_2 \times 2^6 = -1.125 \times 64 = -72.0_{10}$. ($+6.0 \times -12.0 = -72.0 \quad \checkmark$).

## Complexity Analysis / Common Pitfalls

- **Floating-Point Non-Associativity in Large Loops:** Adding a sequence of numbers where one value is huge ($10^8$) and a million values are tiny ($1.0$) will produce incorrect totals if added sequentially from large to small, because the tiny numbers are shifted out completely during alignment ($\Delta E > 24$) and vanish ($10^8 + 1.0 = 10^8$). Summing from smallest to largest or using **Kahan Summation** mitigates this error.
- **Sticky Bit Miscalculation:** Failing to maintain the sticky bit $S$ across multiple shift cycles causes Round-to-Nearest to mistakenly treat inexact values as exact halves, producing erroneous rounding decisions.
- **Double Rounding Errors:** Rounding an intermediate 80-bit extended float to 64-bit double precision, and then subsequently rounding that result to 32-bit single precision can produce a different final value than rounding directly from 80-bit to 32-bit.

## Multiple Choice Questions

1. During floating-point addition, what is the primary purpose of the Sticky Bit ($S$)?
    - **A)** To store the sign of the larger operand
    - **B)** To record whether any non-zero bit was shifted past the Round Bit ($R$) during significand alignment
    - **C)** To detect division by zero exceptions
    - **D)** To track exponent overflow into infinity

2. Under the IEEE 754 default rounding mode (Round to Nearest, Ties to Even), how is an intermediate significand with extension bits $G=1, R=0, S=0$ and LSb $L=1$ rounded?
    - **A)** Round down (discard $G, R, S$, leaving $L=1$)
    - **B)** Round up (add 1 to $L$, making the LSb `0`)
    - **C)** Set the significand to zero
    - **D)** Convert the number to a Quiet NaN

3. What is the cause of Catastrophic Cancellation in floating-point computation?
    - **A)** Adding two extremely large numbers of opposite signs
    - **B)** Subtracting two nearly equal numbers, which eliminates significant leading digits and elevates low-order rounding noise
    - **C)** Multiplying a normalized float by a denormalized float
    - **D)** Dividing positive infinity by negative infinity

4. If two single-precision floats have biased exponents $E_1' = 140$ and $E_2' = 135$, by how many bit positions must the smaller significand be shifted right during alignment?
    - **A)** 3 positions
    - **B)** 5 positions
    - **C)** 8 positions
    - **D)** 10 positions

5. In floating-point multiplication, why is the exponent calculation formula $E_z' = E_x' + E_y' - \text{Bias}$ rather than $E_x' + E_y'$?
    - **A)** Because adding two biased exponents includes two copies of the bias constant, requiring one bias to be subtracted to maintain the true biased representation
    - **B)** To prevent the multiplier accumulator from overflowing
    - **C)** Because the significand product is always normalized
    - **D)** To account for the sign bit XOR operation

### Answer Key & Explanations

1. **B**. The sticky bit $S$ acts as a cumulative OR reduction of all bits shifted beyond the Round bit ($R$). It guarantees that hardware knows whether any non-zero fractional data was discarded, which is necessary for exact half-way tie detection.
2. **B**. The combination $G=1, R=0, S=0$ represents an exact half-way tie. Banker's rounding breaks ties by rounding to the nearest EVEN number (LSb $= 0$). Since $L=1$ is odd, adding 1 rounds it up to make the LSb even (`0`).
3. **B**. Subtracting two close numbers (e.g., $1.0000001 - 1.0000000$) cancels out all common leading bits, leaving only the unaligned trailing bits shifted to the MSB, which magnifies roundoff noise.
4. **B**. The alignment shift distance is $\Delta E = E_1' - E_2' = 140 - 135 = 5$ bit positions.
5. **A**. Since $E_x' = E_x + \text{Bias}$ and $E_y' = E_y + \text{Bias}$, summing them gives $E_x + E_y + 2\cdot\text{Bias}$. Subtracting one $\text{Bias}$ restores the proper biased format $E_z + \text{Bias}$.

## References & Navigation

- **Previous Topic:** [[IEEE 754 Floating-Point Representation (Single & Double Precision)]]
- **Next Topic:** [[Instruction Set Architecture (ISA) Principles & Addressing Modes]]
- **Related Notes:** [[Unsigned Multiplication (Array & Sequential Multipliers)]], [[Binary Division (Restoring & Non-Restoring Division Algorithms)]]
