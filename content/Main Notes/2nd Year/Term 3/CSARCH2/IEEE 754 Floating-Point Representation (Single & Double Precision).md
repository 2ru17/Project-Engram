---
id: csarch2_module_07_ieee754_repr
type: note
course: CSARCH2
topic: "IEEE 754 Floating-Point Representation (Single & Double Precision)"
status: completed
---

# Module 07: IEEE 754 Floating-Point Representation (Single & Double Precision)

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Hardware Modeling]] #[[IEEE 754 Floating-Point Representation (Single & Double Precision)]]

---

## Overview

> Scientific computing and physical simulations require representing numbers spanning massive dynamic ranges—from subatomic Planck constants ($\approx 10^{-34}$) to cosmological distances ($\approx 10^{26}$). Fixed-point binary notation cannot simultaneously accommodate such extremes without requiring impractically wide bit registers. The **IEEE 754 Floating-Point Standard** solves this by establishing normalized scientific notation in base 2. This module examines the architectural bit-field structures for **Single Precision (32-bit)** and **Double Precision (64-bit)** formats, formalizes biased exponent mathematics, and analyzes all IEEE 754 special cases: signed zeros, infinities, quiet/signaling NaNs, and denormalized numbers enabling gradual underflow.

## Key Definitions

- **Floating-Point Representation:** A dynamic numbering format where a real number is represented as a sign, a significand (mantissa), and an exponent scaled by a radix ($N = (-1)^S \times M \times 2^E$).
- **Biased Exponent ($E'$):** An unsigned integer representation of the true exponent $E$, calculated as $E' = E + \text{Bias}$, ensuring that all exponent values are strictly non-negative to simplify hardware magnitude comparisons.
- **Hidden / Implicit Leading Bit:** The implicit `1.` preceding the 23-bit or 52-bit fractional field $f$ in normalized floating-point numbers, granting an extra bit of precision without consuming register storage.
- **Single Precision (Binary32):** A 32-bit IEEE 754 format with a 1-bit sign, 8-bit biased exponent ($\text{Bias} = 127$), and 23-bit fraction (yielding 24 bits of significand precision, $\approx 7$ decimal digits).
- **Double Precision (Binary64):** A 64-bit IEEE 754 format with a 1-bit sign, 11-bit biased exponent ($\text{Bias} = 1023$), and 52-bit fraction (yielding 53 bits of significand precision, $\approx 16$ decimal digits).
- **Denormalized / Subnormal Number:** A non-zero floating-point number with $E' = 0$, where the implicit leading bit becomes `0.` and the exponent is pegged at $E = 1 - \text{Bias}$, enabling **gradual underflow**.
- **Quiet NaN (qNaN):** A Not-a-Number bit pattern ($E' = \text{all 1s}, f \neq 0$ with MSB of $f = 1$) that propagates through subsequent operations without raising a hardware trap.
- **Signaling NaN (sNaN):** A Not-a-Number bit pattern ($E' = \text{all 1s}, f \neq 0$ with MSB of $f = 0$) that triggers an immediate invalid operation exception when encountered.

## Theoretical Framework / Core Concepts

### 1. IEEE 754 Bit-Field Organization

Every IEEE 754 binary floating-point word is partitioned into three distinct bit fields:

```text
IEEE 754 Single Precision (32-bit / Binary32):
 31 30        23 22                                                 0
+--+------------+----------------------------------------------------+
|S |  E' (8b)   |                     f (23b)                        |
+--+------------+----------------------------------------------------+
 Sign  Biased Exp                   Fraction

IEEE 754 Double Precision (64-bit / Binary64):
 63 62              52 51                                           0
+--+------------------+----------------------------------------------+
|S |     E' (11b)     |                   f (52b)                    |
+--+------------------+----------------------------------------------+
 Sign    Biased Exp                      Fraction
```

#### Field Specifications & Mathematical Formulas:

| Parameter | Single Precision (Binary32) | Double Precision (Binary64) |
| :--- | :--- | :--- |
| **Total Word Width** | 32 bits | 64 bits |
| **Sign Bit ($S$)** | 1 bit (Bit 31) | 1 bit (Bit 63) |
| **Biased Exponent ($E'$)** | 8 bits (Bits 30–23) | 11 bits (Bits 62–52) |
| **Exponent Bias ($K$)** | $2^{8-1} - 1 = 127$ | $2^{11-1} - 1 = 1023$ |
| **Fraction ($f$)** | 23 bits (Bits 22–0) | 52 bits (Bits 51–0) |
| **Significand ($M$)** | $1.f$ (24 bits effective) | $1.f$ (53 bits effective) |
| **Normalized Exp Range ($E$)** | $[-126, +127]$ ($E' \in [1, 254]$) | $[-1022, +1023]$ ($E' \in [1, 2046]$) |
| **Decimal Precision** | $\approx \log_{10}(2^{24}) \approx 7.22$ digits | $\approx \log_{10}(2^{53}) \approx 15.95$ digits |
| **Dynamic Range** | $\approx 10^{-38} \text{ to } 10^{+38}$ | $\approx 10^{-308} \text{ to } 10^{+308}$ |

#### Normalized Value Formula:
$$\text{Value} = (-1)^S \times (1.f)_2 \times 2^{E' - \text{Bias}}$$

### 2. Comprehensive Classification of IEEE 754 Encoding Spaces

The exponent field $E'$ serves as a master mode selector partitioning the number space into normalized numbers, denormals, and special mathematical states:

```text
+--------------------------------------------------------------------------+
|                       IEEE 754 ENCODING MAP (Single Prec)                |
|                                                                          |
|  E' = 0, f = 0           -->  Signed Zero (+0.0 or -0.0)                 |
|  E' = 0, f != 0          -->  Denormalized / Subnormal ((-1)^S * 0.f * 2^-126)
|  E' in [1, 254]          -->  Normalized Numbers ((-1)^S * 1.f * 2^(E'-127))
|  E' = 255, f = 0         -->  Signed Infinity (+inf or -inf)             |
|  E' = 255, f != 0        -->  Not a Number (NaN: qNaN vs sNaN)           |
+--------------------------------------------------------------------------+
```

| State / Class | Sign ($S$) | Biased Exponent ($E'$) | Fraction ($f$) | Exact Mathematical Value |
| :--- | :--- | :--- | :--- | :--- |
| **Positive Zero** | `0` | `00000000_2` ($0$) | `000...0_2` ($0$) | $+0.0$ |
| **Negative Zero** | `1` | `00000000_2` ($0$) | `000...0_2` ($0$) | $-0.0$ |
| **Denormalized** | $0 \text{ or } 1$ | `00000000_2` ($0$) | $f \neq 0$ | $(-1)^S \times (0.f)_2 \times 2^{1-\text{Bias}}$ |
| **Normalized** | $0 \text{ or } 1$ | $1 \le E' \le 254$ | Any | $(-1)^S \times (1.f)_2 \times 2^{E'-\text{Bias}}$ |
| **Positive Infinity** | `0` | `11111111_2` ($255$) | `000...0_2` ($0$) | $+\infty$ |
| **Negative Infinity** | `1` | `11111111_2` ($255$) | `000...0_2` ($0$) | $-\infty$ |
| **Quiet NaN (qNaN)** | $0 \text{ or } 1$ | `11111111_2` ($255$) | $f = 1xx\dots x_2$ | $\text{qNaN}$ (Diagnostic / Indeterminate) |
| **Signaling NaN (sNaN)** | $0 \text{ or } 1$ | `11111111_2` ($255$) | $f = 01x\dots x_2$ | $\text{sNaN}$ (Trapping Exception) |

### 3. Denormalized Numbers & Gradual Underflow

In early floating-point systems without denormals, any computation producing a result smaller than the minimum normalized number ($N_{\min} = 1.0 \times 2^{-126} \approx 1.175 \times 10^{-38}$) was abruptly flushed to zero (**Flush-to-Zero / Sudden Underflow**). This created a dangerous "underflow gap" where $X - Y = 0$ could occur even when $X \neq Y$.

```text
Underflow Gap Comparison:
Sudden Underflow (Without Denormals):
  0 -----------------------[ Underflow Gap ]---------------------> 1.0 x 2^-126
  +----------------------------------------------------------------+
  0                                                               N_min

Gradual Underflow (With IEEE 754 Denormals):
  0 ----|-------|-------|-------|-------|-------|-----------------> 1.0 x 2^-126
  +-----+-------+-------+-------+-------+-------+------------------+
  0   2^-149  2^-148  2^-147                     ...              N_min
```

- **Denormal Exponent Invariant:** For denormals ($E' = 0$), the exponent is **not** $0 - 127 = -127$. It is fixed at $E = 1 - \text{Bias} = 1 - 127 = -126$ (single) or $-1022$ (double).
- **Smallest Non-Zero Denormal (Single Precision):**
  $$f = 000\dots001_2 = 2^{-23} \implies \text{Value} = 2^{-23} \times 2^{-126} = 2^{-149} \approx 1.401 \times 10^{-45}$$

## Worked Examples / Calculations / Hardware Traces

### Example 1: Decimal to IEEE 754 Single Precision Hex Conversion

**Problem:** Convert decimal real number $-118.625_{10}$ to IEEE 754 Single Precision hexadecimal representation.

**Solution:**
1. **Sign bit ($S$):** Number is negative $\implies S = 1$.
2. **Convert integer and fractional parts to binary:**
   - Integer part: $118_{10} = 64 + 32 + 16 + 4 + 2 = (1110110)_2$.
   - Fractional part: $0.625_{10} = 0.5 + 0.125 = (0.101)_2$.
   - Combined binary: $(1110110.101)_2$.
3. **Normalize to $1.f \times 2^E$:**
   $$1110110.101_2 = 1.110110101_2 \times 2^6$$
   - True Exponent $E = 6$.
4. **Compute Biased Exponent ($E'$):**
   $$E' = E + 127 = 6 + 127 = 133_{10} = (10000101)_2$$
5. **Form 23-bit Fraction ($f$):**
   - Significand fraction bits: `110110101` (9 bits).
   - Pad with 14 trailing zeros to fill 23 bits:
     $$f = 11011010100000000000000_2$$
6. **Assemble 32-bit Word & Pack into Hex:**
   ```text
   Sign (1b) | Biased Exponent (8b) | Fraction (23b)
       1     |     10000101         | 11011010100000000000000
   ```
   Group into nibbles (4 bits):
   $$\underbrace{1100}_{C}\ \underbrace{0010}_{2}\ \underbrace{1110}_{E}\ \underbrace{1101}_{D}\ \underbrace{0100}_{4}\ \underbrace{0000}_{0}\ \underbrace{0000}_{0}\ \underbrace{0000}_{0}$$

*Result:* `0xC2ED4000`.

### Example 2: Hex to Decimal Conversion with Single Precision

**Problem:** Decode the 32-bit hexadecimal floating-point word `0x41440000` into its decimal equivalent.

**Solution:**
1. **Expand Hex to Binary:**
   $$\text{0x41440000} = 0100\ 0001\ 0100\ 0100\ 0000\ 0000\ 0000\ 0000_2$$
2. **Partition Bit Fields:**
   - Sign ($S$): Bit 31 $= 0$ (Positive).
   - Biased Exponent ($E'$): Bits 30–23 $= 10000010_2 = 130_{10}$.
   - Fraction ($f$): Bits 22–0 $= 10001000000000000000000_2$.
3. **Compute True Exponent ($E$):**
   $$E = E' - 127 = 130 - 127 = 3$$
4. **Form Significand ($1.f$):**
   $$1.f = 1.10001_2 = 1 + 2^{-1} + 2^{-5} = 1 + 0.5 + 0.03125 = 1.53125$$
5. **Compute Decimal Value:**
   $$\text{Value} = (+1) \times 1.53125 \times 2^3 = 1.53125 \times 8 = 12.25_{10}$$

*Result:* $+12.25_{10}$.

### Example 3: Single Precision Denormalized Number Decoding

**Problem:** Decode the hexadecimal floating-point value `0x00000008` into its exact decimal value.

**Solution:**
1. **Binary Expansion:**
   $$\text{0x00000008} = 0000\ 0000\ 0000\ 0000\ 0000\ 0000\ 0000\ 1000_2$$
2. **Partition Fields:**
   - $S = 0$
   - $E' = 00000000_2 = 0 \implies \mathbf{Denormalized\ Number}$
   - $f = 00000000000000000001000_2 = 2^{-20}$ (bit 3 of fraction set)
3. **Apply Denormalized Formula:**
   - Implicit leading bit is `0.`
   - True exponent is pegged at $E = 1 - 127 = -126$.
   $$\text{Value} = (0.f)_2 \times 2^{-126} = 2^{-20} \times 2^{-126} = 2^{-146}$$
   $$2^{-146} = 2^3 \times 2^{-149} = 8 \times (1.401298 \times 10^{-45}) \approx 1.121 \times 10^{-44}$$

## Complexity Analysis / Common Pitfalls

- **Incorrect Denormal Exponent Formula:** A frequent error is calculating the true exponent of a denormal as $E' - 127 = 0 - 127 = -127$. IEEE 754 mandates that denormalized exponents are fixed at $1 - \text{Bias} = -126$. This ensures seamless mathematical continuity across the transition boundary between denormalized ($0.111\dots \times 2^{-126}$) and normalized ($1.000\dots \times 2^{-126}$) values.
- **Forgetting the Hidden Bit in Normalized Form:** When unpacking normalized floats, omitting the implicit leading `1.` reduces the magnitude by a factor of 2 or more.
- **Treating NaN as an Arithmetic Value:** Attempting to compare NaN using standard comparison operators (e.g., in C/C++: `x == x`) always evaluates to `false` when `x` is NaN.

## Multiple Choice Questions

1. In IEEE 754 Single Precision, what is the biased exponent ($E'$) and fraction ($f$) configuration for positive infinity ($+\infty$)?
    - **A)** $E' = 0$, $f = 0$, $S = 0$
    - **B)** $E' = 255$, $f = 0$, $S = 0$
    - **C)** $E' = 255$, $f \neq 0$, $S = 0$
    - **D)** $E' = 127$, $f = 0$, $S = 0$

2. What is the fundamental purpose of denormalized numbers in the IEEE 754 standard?
    - **A)** To provide gradual underflow and prevent an underflow gap near zero
    - **B)** To speed up floating-point division hardware
    - **C)** To allow 64-bit numbers to fit into 32-bit registers
    - **D)** To encode negative zero without using a sign bit

3. What is the decimal value represented by the 32-bit single precision hexadecimal word `0xBF800000`?
    - **A)** $+1.0$
    - **B)** $-0.5$
    - **C)** $-1.0$
    - **D)** $-2.0$

4. Which feature differentiates a Quiet NaN (qNaN) from a Signaling NaN (sNaN)?
    - **A)** A Quiet NaN has an exponent of 0, while a Signaling NaN has an exponent of 255
    - **B)** Quiet NaNs only exist in Double Precision formats
    - **C)** A Quiet NaN represents division by zero, while a Signaling NaN represents square root of negative numbers
    - **D)** A Quiet NaN has the MSB of the fraction set to `1` and does not raise an exception, whereas a Signaling NaN has the MSB of the fraction set to `0` and traps the CPU

5. In IEEE 754 Double Precision (Binary64), what is the exponent bias?
    - **A)** 127
    - **B)** 1023
    - **C)** 255
    - **D)** 2047

### Answer Key & Explanations

1. **B**. Infinity in single precision is encoded with the maximum biased exponent $E' = 255$ (`11111111_2`), an all-zero fraction ($f = 0$), and $S = 0$ for positive infinity.
2. **A**. Denormalized numbers implement gradual underflow, filling the numeric gap between 0 and the smallest normalized float ($2^{-126}$), ensuring that differences between close numbers never prematurely flush to zero.
3. **C**. `0xBF800000` expanded: $S = 1$ (negative), $E' = 10111111_2 = 127_{10} \implies E = 127 - 127 = 0$, $f = 0$. Value $= (-1)^1 \times 1.0 \times 2^0 = -1.0$.
4. **D**. A Quiet NaN sets the MSB of the fraction to `1`, allowing errors to propagate silently through pipelines, while a Signaling NaN sets the MSB to `0` (with non-zero lower bits), immediately raising a hardware invalid operation trap.
5. **B**. Double precision uses an 11-bit exponent field with bias $2^{11-1} - 1 = 1023$.

## References & Navigation

- **Previous Topic:** [[Binary Division (Restoring & Non-Restoring Division Algorithms)]]
- **Next Topic:** [[Floating-Point Arithmetic Operations]]
- **Related Notes:** [[Integer Representation & Fixed-Point Arithmetic]], [[Instruction Set Architecture (ISA) Principles & Addressing Modes]]
