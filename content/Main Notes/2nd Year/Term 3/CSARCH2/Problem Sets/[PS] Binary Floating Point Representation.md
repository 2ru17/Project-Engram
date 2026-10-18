---
id: problem_set_binary_floating_point_representation
type: problem_set
course: CSARCH2
topic: "Binary Floating-Point Representation"
status: completed
---

# Problem Set: Binary Floating-Point Representation

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Problem Sets]] #[[IEEE-754]] #[[Floating-Point Representation]] #[[Single Precision]] #[[Double Precision]] #[[Subnormal Numbers]] #[[Binary Conversion]]

---

## Overview & Theoretical Foundations

In digital computing, fixed-point representations suffer from a severe dynamic range limitation: allocating a fixed number of integer and fractional bits restricts the range of numbers that can be represented. The **IEEE-754 Standard for Floating-Point Arithmetic** resolves this by representing real numbers in scientific notation:

$$\text{Value} = (-1)^{\text{Sign}} \times \text{Significand} \times 2^{\text{Exponent}}$$

```text
IEEE-754 Single Precision (32-bit):
 1 bit       8 bits                  23 bits
┌──────┬──────────────────┬───────────────────────────────────────┐
│ Sign │  Biased Exponent │         Fraction (Mantissa)           │
│ (S)  │       (E)        │                 (F)                   │
└──────┴──────────────────┴───────────────────────────────────────┘
 31     30              23 22                                    0

IEEE-754 Double Precision (64-bit):
 1 bit       11 bits                 52 bits
┌──────┬──────────────────┬───────────────────────────────────────┐
│ Sign │  Biased Exponent │         Fraction (Mantissa)           │
│ (S)  │       (E)        │                 (F)                   │
└──────┴──────────────────┴───────────────────────────────────────┘
 63     62              52 51                                    0
```

### 1. Structural Parameters of IEEE-754 Formats

| Format | Total Bits ($N$) | Sign Bits ($S$) | Exponent Bits ($k$) | Exponent Bias | Actual Exponent Range ($e$) | Biased Exponent Range ($E$) | Fraction Bits ($p$) | Effective Precision ($p+1$) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Single Precision** | 32 | 1 | 8 | $+127$ ($2^7-1$) | $[-126, +127]$ | $[1, 254]$ | 23 | 24 bits ($\approx 7.2$ dec) |
| **Double Precision** | 64 | 1 | 11 | $+1023$ ($2^{10}-1$) | $[-1022, +1023]$ | $[1, 2046]$ | 52 | 53 bits ($\approx 15.9$ dec) |

### 2. Classification of Representable Numbers

IEEE-754 partitions the exponent field $E$ into special regimes:

```text
                  ┌─────────────────┬──────────────────┐
                  │      E = 0      │   1 <= E <= Emax │
                  ├────────┬────────┼──────────────────┤
                  │ F = 0  │ F != 0 │                  │
                  ├────────┼────────┼──────────────────┤
                  │ Zero   │Subnorm │ Normalized Number│
                  │ (+/-0) │(Denorm)│                  │
                  └────────┴────────┴──────────────────┘
                                    ┌──────────────────┐
                                    │     E = Emax     │
                                    ├────────┬─────────┤
                                    │ F = 0  │  F != 0 │
                                    ├────────┼─────────┤
                                    │Infinity│   NaN   │
                                    │ (+/-oo)│(Quiet/  │
                                    │        │Signal)  │
                                    └────────┴─────────┘
```

1. **Normalized Numbers ($1 \le E \le 2^k - 2$):**
   - Significand has an **implicit leading bit** of $1$: $M = 1.F = 1 + \sum_{i=1}^p f_i 2^{-i}$.
   - Unbiased exponent: $e = E - \text{Bias}$.
   - $\text{Value} = (-1)^S \times (1.F)_2 \times 2^{E - \text{Bias}}$.
2. **Subnormal / Denormalized Numbers ($E = 0, F \neq 0$):**
   - Used for **gradual underflow** to fill the gap between $0$ and the smallest normalized number.
   - **No implicit leading 1** (leading bit is $0$): $M = 0.F$.
   - The unbiased exponent is fixed at: $e = 1 - \text{Bias}$ (i.e., $-126$ for single, $-1022$ for double).
   - $\text{Value} = (-1)^S \times (0.F)_2 \times 2^{1 - \text{Bias}}$.
3. **Signed Zero ($E = 0, F = 0$):**
   - Represents $+0$ ($S=0$) or $-0$ ($S=1$).
4. **Infinity ($E = 2^k - 1, F = 0$):**
   - Represents $+\infty$ ($S=0$) or $-\infty$ ($S=1$), produced by overflow or division by zero.
5. **Not a Number / NaN ($E = 2^k - 1, F \neq 0$):**
   - Represents invalid operations (e.g., $0/0$, $\sqrt{-1}$).
   - **Quiet NaN (QNaN)**: MSB of fraction is $1$ ($f_1 = 1$).
   - **Signaling NaN (SNaN)**: MSB of fraction is $0$ ($f_1 = 0, F \neq 0$).

---

## Problem Solutions

### Problem 1: Convert $1.1101_2 \times 2^{135}$ to IEEE-754 Single Precision

#### Problem Statement
Represent the floating-point value $+1.1101_2 \times 2^{135}$ using 32-bit single-precision binary format. Specify the sign bit, 8-bit exponent representation, 23-bit fraction, and hexadecimal representation.

---

#### Step-by-Step Derivation

1. **Sign Bit ($S$):**
   - The value is positive $\implies S = \mathbf{0}$.

2. **Exponent Analysis & Calculation:**
   - Unbiased exponent: $e = 135$.
   - Single-precision bias: $\text{Bias} = 127$.
   - Biased exponent:
     $$E = e + \text{Bias} = 135 + 127 = 262$$
   - In single precision, the 8-bit exponent field $E$ can only represent integers from $0$ to $255$ ($2^8-1$).
   - Maximum finite normalized exponent is $E_{\max} = 254$ (which corresponds to $e_{\max} = 254 - 127 = +127$).
   - Since $e = 135 > 127$ (and $E = 262 > 255$), this value exceeds the maximum representable finite number in IEEE-754 single precision.

3. **IEEE-754 Standard Overflow Handling:**
   - Because of **Exponent Overflow**, the IEEE-754 standard maps this value to **Positive Infinity ($+\infty$)**:
     - $\text{Sign } S = 0$
     - $\text{Exponent } E = 255 = 11111111_2$
     - $\text{Fraction } F = 00000000000000000000000_2$ (23 zeros)
     - 32-bit pattern: `0 11111111 00000000000000000000000`
     - Hexadecimal: `0x7F800000`

4. **Theoretical / Unbounded 9-Bit Exponent Derivation (Academic Context):**
   - If evaluated without clamping to standard single-precision overflow saturation:
     - $262_{10} = 256 + 6 = 100000110_2$ (9 bits).
     - Truncated to 8 bits modulo 256: $262 \pmod{256} = 6 = 00000110_2$.
     - Fraction (23 bits): $F = 1101\,0000\,0000\,0000\,0000\,000_2$.

---

#### Result Summary Table

| Field | IEEE-754 Standard (+$\infty$ on Overflow) | Theoretical Exact (9-bit Exp Overflow) |
| :--- | :--- | :--- |
| **Sign ($S$)** | `0` | `0` |
| **Exponent ($E$)** | `11111111` ($255$) | `100000110` ($262$, 9-bit) / `00000110` (8-bit trunc) |
| **Fraction ($F$)** | `00000000000000000000000` | `11010000000000000000000` |
| **Hexadecimal** | `0x7F800000` | **OVERFLOW** (or `0x03680000` modular) |

> [!warning] Architecture Note
> The maximum representable finite float in 32-bit single precision is $(2 - 2^{-23}) \times 2^{127} \approx 3.4028235 \times 10^{38}$. Since $1.1101_2 \times 2^{135} \approx 7.89 \times 10^{40}$, it strictly overflows single precision.

---

### Problem 2: Convert $1.1101_2 \times 2^{135}$ to IEEE-754 Double Precision

#### Problem Statement
Represent $+1.1101_2 \times 2^{135}$ using 64-bit double-precision binary format.

---

#### Step-by-Step Derivation

1. **Sign Bit ($S$):**
   - Positive number $\implies S = \mathbf{0}$.

2. **Exponent Calculation:**
   - Unbiased exponent: $e = 135$.
   - Double-precision bias: $\text{Bias} = 1023$.
   - Biased exponent:
     $$E = e + 1023 = 135 + 1023 = 1158$$
   - Convert $1158_{10}$ to 11-bit binary:
     $$1158 = 1024 + 128 + 4 + 2 = 2^{10} + 2^7 + 2^2 + 2^1$$
     $$E = \mathbf{10000000000}_2 + \mathbf{00010000000}_2 + \mathbf{00000000110}_2 = \mathbf{100\,1000\,0110}_2$$
   - Check range: $1 \le 1158 \le 2046 \implies$ Valid normalized exponent.

3. **Fraction Part ($F$):**
   - Significand: $M = 1.1101_2$.
   - Implicit leading 1 is dropped, leaving fraction bits: $1101_2$.
   - Pad with zeros to 52 bits:
     $$F = \mathbf{1101}\underbrace{000000000000000000000000000000000000000000000000}_{48\text{ zeros}}$$

4. **Assemble 64-bit Binary Representation:**
   $$\underbrace{0}_{S\text{ (1)}} \quad \underbrace{100\,1000\,0110}_{E\text{ (11)}} \quad \underbrace{1101\,0000\,0000\,\dots\,0000}_{F\text{ (52)}}$$

5. **Convert to Hexadecimal (4-bit nibbles):**
   - `0100` $\to$ `4`
   - `1000` $\to$ `8`
   - `0110` $\to$ `6`
   - `1101` $\to$ `D`
   - `0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000` $\to$ `000000000000`
   - **Hexadecimal:** `0x486D000000000000`

---

#### Result Summary Table

| Field | Binary Value | Description |
| :--- | :--- | :--- |
| **Sign ($S$)** | `0` | Positive ($1$ bit) |
| **Exponent ($E$)** | `10010000110` | $1158_{10} = 135 + 1023$ ($11$ bits) |
| **Fraction ($F$)** | `1101000000000000000000000000000000000000000000000000` | $52$ bits |
| **Hexadecimal** | **`0x486D000000000000`** | Complete 64-bit word |

---

### Problem 3: Convert $1.1101_2 \times 2^{-135}$ to IEEE-754 Single Precision

#### Problem Statement
Represent $+1.1101_2 \times 2^{-135}$ using 32-bit single-precision format.

---

#### Step-by-Step Derivation

1. **Sign Bit ($S$):**
   - Positive number $\implies S = \mathbf{0}$.

2. **Exponent Analysis & Subnormal Detection:**
   - Unbiased exponent: $e = -135$.
   - Single-precision bias: $\text{Bias} = 127$.
   - Naive biased exponent:
     $$E = -135 + 127 = -8$$
   - Because $E \le 0$, this number cannot be represented as a normalized single-precision float (minimum normal exponent is $e_{\min} = -126$ with $E = 1$).
   - This value falls into the **Subnormal (Denormalized)** range!

3. **Subnormal Representation Mechanism:**
   - In IEEE-754 subnormals:
     - The exponent field is set to **$E = 00000000_2$ ($0$)**.
     - The implicit leading bit is **$0$** rather than $1$.
     - The actual exponent is fixed to:
       $$e_{\text{subnormal}} = 1 - \text{Bias} = 1 - 127 = -126$$
   - We must equate:
     $$(-1)^0 \times (0.F)_2 \times 2^{-126} = 1.1101_2 \times 2^{-135}$$
   - Solve for $(0.F)_2$:
     $$(0.F)_2 = 1.1101_2 \times 2^{-135 - (-126)} = 1.1101_2 \times 2^{-9}$$
   - Shifting $1.1101_2$ right by $9$ positions:
     $$(0.F)_2 = 0.\underbrace{00000000}_{8\text{ zeros}}11101_2$$
   - The 23-bit fraction field $F$ is:
     $$F = \underbrace{00000000}_{8\text{ zeros}}11101\underbrace{0000000000}_{10\text{ zeros}} = \mathbf{0000\,0000\,1110\,1000\,0000\,000}_2$$

4. **Assemble 32-bit Binary Layout:**
   - Bit 31 ($S$): `0`
   - Bits 30–23 ($E$): `00000000`
   - Bits 22–0 ($F$): `00000000111010000000000`

5. **Convert to Hexadecimal:**
   $$\begin{aligned}
   \text{Bits 31–28:} &\quad 0000 \to \mathbf{0} \\
   \text{Bits 27–24:} &\quad 0000 \to \mathbf{0} \\
   \text{Bits 23–20:} &\quad 0000 \to \mathbf{0} \\
   \text{Bits 19–16:} &\quad 0000 \to \mathbf{0} \\
   \text{Bits 15–12:} &\quad 0111 \to \mathbf{7} \\
   \text{Bits 11–8:}  &\quad 0100 \to \mathbf{4} \\
   \text{Bits 7–4:}   &\quad 0000 \to \mathbf{0} \\
   \text{Bits 3–0:}   &\quad 0000 \to \mathbf{0}
   \end{aligned}$$
   - **Hexadecimal:** `0x00007400`

---

#### Result Summary Table

| Field | Value | Notes |
| :--- | :--- | :--- |
| **Sign ($S$)** | `0` | Positive |
| **Exponent ($E$)** | `00000000` | $E=0$ indicates Subnormal / Denormalized |
| **Fraction ($F$)** | `00000000111010000000000` | $23$ bits ($0.0000000011101_2$) |
| **Hexadecimal** | **`0x00007400`** | IEEE-754 Subnormal Single Precision |

---

### Problem 4: Convert $1.1101_2 \times 2^{-135}$ to IEEE-754 Double Precision

#### Problem Statement
Represent $+1.1101_2 \times 2^{-135}$ using 64-bit double-precision format.

---

#### Step-by-Step Derivation

1. **Sign Bit ($S$):**
   - Positive number $\implies S = \mathbf{0}$.

2. **Exponent Calculation:**
   - Unbiased exponent: $e = -135$.
   - Double-precision bias: $\text{Bias} = 1023$.
   - Biased exponent:
     $$E = e + 1023 = -135 + 1023 = 888$$
   - Convert $888_{10}$ to 11-bit binary:
     $$888 = 512 + 256 + 64 + 32 + 16 + 8 = 2^9 + 2^8 + 2^6 + 2^5 + 2^4 + 2^3$$
     $$E = \mathbf{011\,0111\,1000}_2$$
   - Check range: $1 \le 888 \le 2046 \implies$ Valid normalized double-precision number!

3. **Fraction Part ($F$):**
   - Significand: $M = 1.1101_2$.
   - Drop implicit leading 1: $1101_2$.
   - Pad to 52 bits:
     $$F = \mathbf{1101}\underbrace{000000000000000000000000000000000000000000000000}_{48\text{ zeros}}$$

4. **Assemble 64-bit Binary Representation:**
   $$\underbrace{0}_{S\text{ (1)}} \quad \underbrace{011\,0111\,1000}_{E\text{ (11)}} \quad \underbrace{1101\,0000\,\dots\,0000}_{F\text{ (52)}}$$

5. **Convert to Hexadecimal:**
   - `0011` $\to$ `3`
   - `0111` $\to$ `7`
   - `1000` $\to$ `8`
   - `1101` $\to$ `D`
   - Trailing 48 zero bits $\to$ `000000000000`
   - **Hexadecimal:** `0x378D000000000000`

---

#### Result Summary Table

| Field | Binary Value | Description |
| :--- | :--- | :--- |
| **Sign ($S$)** | `0` | Positive |
| **Exponent ($E$)** | `01101111000` | $888_{10} = -135 + 1023$ |
| **Fraction ($F$)** | `1101000000000000000000000000000000000000000000000000` | $52$ bits |
| **Hexadecimal** | **`0x378D000000000000`** | Normalized 64-bit Double Precision |

---

### Problem 5: Decode Single-Precision `0xC1C20000` to Decimal

#### Problem Statement
Determine the equivalent fixed-point decimal value of the IEEE-754 single-precision floating-point bit pattern `0xC1C20000`.

---

#### Step-by-Step Derivation

1. **Convert Hexadecimal to 32-bit Binary:**
   $$\begin{aligned}
   \text{Hex: } &\quad \mathtt{C} & \mathtt{1} & \mathtt{C} & \mathtt{2} & \mathtt{0} & \mathtt{0} & \mathtt{0} & \mathtt{0} \\
   \text{Binary: } &\quad 1100 & 0001 & 1100 & 0010 & 0000 & 0000 & 0000 & 0000
   \end{aligned}$$

2. **Deconstruct IEEE-754 Single-Precision Fields:**
   - **Sign Bit ($S$, bit 31):**
     $$S = 1 \implies \text{Negative number } (-1)^1 = -1$$
   - **Biased Exponent ($E$, bits 30–23):**
     $$\text{Bits: } 10000011_2 = 128 + 2 + 1 = 131_{10}$$
     Unbiased exponent $e$:
     $$e = E - \text{Bias} = 131 - 127 = \mathbf{+4}$$
   - **Fraction Field ($F$, bits 22–0):**
     $$\text{Bits: } 100\,0010\,0000\,0000\,0000\,0000_2$$
     Significand (with implicit leading 1):
     $$M = 1.F = 1.100001_2$$

3. **Compute Value in Binary Scientific Notation:**
   $$\text{Value} = -1 \times 1.100001_2 \times 2^4$$

4. **Shift Radix Point by Exponent ($e = +4$):**
   $$1.100001_2 \times 2^4 = 11000.01_2$$

5. **Convert Fixed-Point Binary to Decimal:**
   - **Integer Part ($11000_2$):**
     $$1 \cdot 2^4 + 1 \cdot 2^3 + 0 \cdot 2^2 + 0 \cdot 2^1 + 0 \cdot 2^0 = 16 + 8 = \mathbf{24}$$
   - **Fractional Part ($0.01_2$):**
     $$0 \cdot 2^{-1} + 1 \cdot 2^{-2} = 0 + \frac{1}{4} = \mathbf{0.25}$$
   - Combining with sign:
     $$\text{Value} = \mathbf{-24.25}$$

---

#### Result Summary Table

| Field | Extraction | Value |
| :--- | :--- | :--- |
| **Sign ($S$)** | `1` | Negative ($-$) |
| **Exponent ($E$)** | `10000011` ($131_{10}$) | $e = 131 - 127 = 4$ |
| **Fraction ($F$)** | `10000100000000000000000` | $M = 1.100001_2$ |
| **Binary Fixed-Point** | $-11000.01_2$ | $-(16 + 8 + 0.25)$ |
| **Decimal Equivalent** | **`-24.25`** | Exact decimal |

---

### Problem 6: Decode Double-Precision `0x4027800000000000` to Decimal

#### Problem Statement
Determine the equivalent fixed-point decimal value of the IEEE-754 double-precision bit pattern `0x4027800000000000`.

---

#### Step-by-Step Derivation

1. **Convert Hexadecimal to 64-bit Binary:**
   $$\begin{aligned}
   \text{Hex: } &\quad \mathtt{4} & \mathtt{0} & \mathtt{2} & \mathtt{7} & \mathtt{8} & \mathtt{0\dots0} \\
   \text{Binary: } &\quad 0100 & 0000 & 0010 & 0111 & 1000 & 0000\dots0000
   \end{aligned}$$

2. **Deconstruct IEEE-754 Double-Precision Fields:**
   - **Sign Bit ($S$, bit 63):**
     $$S = 0 \implies \text{Positive number } (+)$$
   - **Biased Exponent ($E$, bits 62–52):**
     $$\text{Bits: } 0100\,0000\,0010_2 = 1024 + 2 = 1026_{10}$$
     Unbiased exponent $e$:
     $$e = E - \text{Bias} = 1026 - 1023 = \mathbf{+3}$$
   - **Fraction Field ($F$, bits 51–0):**
     $$\text{Bits: } 0111\,1000\,0000\,\dots\,0000_2$$
     Significand (with implicit leading 1):
     $$M = 1.F = 1.01111_2$$

3. **Compute Value in Binary Scientific Notation:**
   $$\text{Value} = + 1.01111_2 \times 2^3$$

4. **Shift Radix Point by Exponent ($e = +3$):**
   $$1.01111_2 \times 2^3 = 1011.11_2$$

5. **Convert Fixed-Point Binary to Decimal:**
   - **Integer Part ($1011_2$):**
     $$1 \cdot 2^3 + 0 \cdot 2^2 + 1 \cdot 2^1 + 1 \cdot 2^0 = 8 + 0 + 2 + 1 = \mathbf{11}$$
   - **Fractional Part ($0.11_2$):**
     $$1 \cdot 2^{-1} + 1 \cdot 2^{-2} = \frac{1}{2} + \frac{1}{4} = 0.5 + 0.25 = \mathbf{0.75}$$
   - Combining:
     $$\text{Value} = \mathbf{+11.75}$$

---

#### Result Summary Table

| Field | Extraction | Value |
| :--- | :--- | :--- |
| **Sign ($S$)** | `0` | Positive ($+$) |
| **Exponent ($E$)** | `010000000010` ($1026_{10}$) | $e = 1026 - 1023 = 3$ |
| **Fraction ($F$)** | `011110000000...` | $M = 1.01111_2$ |
| **Binary Fixed-Point** | $+1011.11_2$ | $+(8 + 2 + 1 + 0.75)$ |
| **Decimal Equivalent** | **`+11.75`** | Exact decimal |

---

## Python Verification Script

```python
import struct

def verify_all():
    # Problem 2
    val2 = 1.8125 * (2.0 ** 135)
    hex64_2 = f"0x{struct.unpack('>Q', struct.pack('>d', val2))[0]:016X}"
    print(f"Prob 2: Expected 0x486D000000000000 -> Got {hex64_2} (Match: {hex64_2 == '0x486D000000000000'})")

    # Problem 4
    val4 = 1.8125 * (2.0 ** -135)
    hex64_4 = f"0x{struct.unpack('>Q', struct.pack('>d', val4))[0]:016X}"
    print(f"Prob 4: Expected 0x378D000000000000 -> Got {hex64_4} (Match: {hex64_4 == '0x378D000000000000'})")

    # Problem 5
    f5 = struct.unpack('>f', struct.pack('>I', 0xC1C20000))[0]
    print(f"Prob 5: Expected -24.25 -> Got {f5} (Match: {f5 == -24.25})")

    # Problem 6
    f6 = struct.unpack('>d', struct.pack('>Q', 0x4027800000000000))[0]
    print(f"Prob 6: Expected 11.75 -> Got {f6} (Match: {f6 == 11.75})")

verify_all()
```

---

## Key Takeaways & Exam Summary

1. **Biased Exponent Formula:** $E = e + \text{Bias}$ where $\text{Bias} = 2^{k-1} - 1$.
   - Single precision ($k=8$): $\text{Bias} = 127$.
   - Double precision ($k=11$): $\text{Bias} = 1023$.
2. **Special Exponent Codes:**
   - $E = 0, F = 0 \implies \pm 0$.
   - $E = 0, F \neq 0 \implies \text{Subnormal (Gradual Underflow, } e = 1 - \text{Bias}, M = 0.F\text{)}$.
   - $1 \le E \le 2^k - 2 \implies \text{Normalized (Implicit leading 1, } e = E - \text{Bias}, M = 1.F\text{)}$.
   - $E = 2^k - 1, F = 0 \implies \pm\infty \text{ (Overflow)}$.
   - $E = 2^k - 1, F \neq 0 \implies \text{NaN}$.
3. **Double Precision Cushion:** Values that overflow or underflow single precision (e.g., $e = \pm 135$) easily fit within double precision normalized range ($e \in [-1022, +1023]$).


## References & Navigation

- **Related Notes:** [[IEEE 754 Floating-Point Representation (Single & Double Precision)]]
