---
id: csarch2_module_02_integer_repr
type: note
course: CSARCH2
topic: "Integer Representation & Fixed-Point Arithmetic"
status: completed
---

# Module 02: Integer Representation & Fixed-Point Arithmetic

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Hardware Modeling]] #[[Integer Representation & Fixed-Point Arithmetic]]

---

## Overview

> Digital computers represent all data—integers, memory addresses, text characters, and machine instructions—as discrete binary bit patterns. This module establishes the mathematical foundations of positional number systems, arbitrary radix base conversions, and binary data organization from individual bits to quad-words. We examine byte-ordering memory mechanics (Little Endian vs. Big Endian), metric prefix standards ($2^x$ binary IEC vs. $10^y$ decimal SI), and compare signed integer encoding schemes: Sign & Magnitude, 1's Complement, 2's Complement, and Excess-$K$ biased notations. Character encodings (ASCII, Unicode UTF-8/UTF-16/UTF-32) and decimal representations (Packed BCD and Densely Packed BCD) are also formalized.

## Key Definitions

- **Radix (Base $r$):** The total number of unique digit symbols available in a positional numeral system (e.g., $r=2$ for Binary, $r=8$ for Octal, $r=10$ for Decimal, $r=16$ for Hexadecimal).
- **Positional Weight:** The numerical value assigned to a digit position, given by $r^i$, where $i$ represents the integer distance relative to the radix point.
- **Crumb / Nibble / Byte:** Fundamental binary groupings of 2 bits (crumb), 4 bits (nibble, representing 1 hexadecimal digit), and 8 bits (byte, the standard smallest addressable unit).
- **Little Endian:** A byte-ordering convention where the Least Significant Byte (LSB) of a multi-byte word is stored at the lowest numerical memory address.
- **Big Endian:** A byte-ordering convention where the Most Significant Byte (MSB) of a multi-byte word is stored at the lowest numerical memory address.
- **2's Complement:** The primary hardware representation for signed integers where a negative number $-N$ is represented as $2^n - N$, providing a unique representation for zero and straightforward arithmetic hardware.
- **Sign Extension:** The operation of replicating the Most Significant Bit (MSb / sign bit) across higher-order bit positions when promoting an $n$-bit signed integer to a wider word width (e.g., 8-bit to 16-bit).
- **Zero Extension:** The operation of appending leading zeros to the MSb positions when promoting an unsigned integer to a wider word width.
- **Densely Packed BCD (DPD):** An efficient compression scheme that encodes 3 Binary-Coded Decimal digits (12 bits) into exactly 10 bits using boolean selection maps.

## Theoretical Framework / Core Concepts

### 1. Positional Number Systems and Radix Formulation

In any base-$r$ positional numeral system, a number string $N = (d_{n-1} d_{n-2} \dots d_1 d_0 . d_{-1} d_{-2} \dots d_{-m})_r$ evaluates to:

$$\text{Value}(N) = \sum_{i=-m}^{n-1} d_i \cdot r^i = d_{n-1} r^{n-1} + \dots + d_0 r^0 + d_{-1} r^{-1} + \dots + d_{-m} r^{-m}$$

where each digit $d_i \in \{0, 1, 2, \dots, r-1\}$.

```text
Positional Weight Array:
Position (i):   ...   3      2      1      0    .   -1     -2     -3   ...
Weight (r^i):   ...  r^3    r^2    r^1    r^0   .  r^-1   r^-2   r^-3  ...
Base 10:        ...  1000   100    10      1    .  0.1    0.01  0.001  ...
Base 2:         ...   8      4      2      1    .  0.5    0.25  0.125  ...
```

#### Base Conversion Algorithms:
1. **Integer Part ($Decimal \to Base\ r$):** Successive division by radix $r$. The remainders produced at each step correspond to digits $d_0, d_1, \dots, d_{n-1}$ read from bottom to top (Least Significant to Most Significant).
2. **Fractional Part ($Decimal \to Base\ r$):** Successive multiplication by radix $r$. The integer part peeled off at each step corresponds to fractional digits $d_{-1}, d_{-2}, \dots, d_{-m}$ read from top to bottom.
3. **Power-of-2 Grouping:** Direct translation between bases where $r_2 = r_1^k$:
   - Binary to Octal ($r=8=2^3$): Group binary bits into sets of 3 from the radix point outward.
   - Binary to Hexadecimal ($r=16=2^4$): Group binary bits into sets of 4 from the radix point outward.
4. **General Base-$x$ to Base-$y$:** Convert Base-$x \to \text{Decimal}_{10} \to \text{Base-}y$.

### 2. Binary Data Organization & Endianness

Modern computer architectures define hierarchical data units:

```text
+---------------------------------------------------------------+
| Quad-word (128 bits / 16 bytes)                               |
+-------------------------------+-------------------------------+
| Double-word (64 bits / 8 bytes)| Double-word                   |
+---------------+---------------+---------------+---------------+
| Word (32 bits)| Word          | Word          | Word          |
+-------+-------+-------+-------+-------+-------+-------+-------+
| H-Word| H-Word| H-Word| H-Word| H-Word| H-Word| H-Word| H-Word|
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| B | B | B | B | B | B | B | B | B | B | B | B | B | B | B | B | (Bytes)
+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+---+
| Nibble (4b)   | Nibble        | Nibble        | Nibble        |
+---------------+---------------+---------------+---------------+
| Crumb (2b)    | Crumb         | Crumb         | Crumb         |
+---------------+---------------+---------------+---------------+
| Bit (1b)      | Bit           | Bit           | Bit           |
+---------------+---------------+---------------+---------------+
```

#### Byte Ordering (Endianness):
Consider the 32-bit hexadecimal value `0x1A2B3C4D` stored at base memory address `0x1000`:
- **Byte breakdown:** `MSB = 0x1A`, `Byte 1 = 0x2B`, `Byte 2 = 0x3C`, `LSB = 0x4D`.

```text
Memory Address | Little Endian (x86 / ARM) | Big Endian (Network / SPARC)
---------------+---------------------------+-----------------------------
    0x1000     |           0x4D (LSB)      |           0x1A (MSB)
    0x1001     |           0x3C            |           0x2B
    0x1002     |           0x2B            |           0x3C
    0x1003     |           0x1A (MSB)      |           0x4D (LSB)
```

### 3. Metric Prefix Standards ($2^x$ vs. $10^y$)

Architectural specifications must distinguish between decimal storage units (SI) and binary memory units (IEC):

| Metric Prefix (SI, $10^y$) | Exact Decimal Value | Binary Prefix (IEC, $2^x$) | Exact Binary Value | Discrepancy ($\%$) |
| :--- | :--- | :--- | :--- | :--- |
| **Kilobyte (KB)** | $10^3 = 1,000$ | **Kibibyte (KiB)** | $2^{10} = 1,024$ | $+2.4\%$ |
| **Megabyte (MB)** | $10^6 = 1,000,000$ | **Mebibyte (MiB)** | $2^{20} = 1,048,576$ | $+4.86\%$ |
| **Gigabyte (GB)** | $10^9 = 1,000,000,000$ | **Gibibyte (GiB)** | $2^{30} = 1,073,741,824$ | $+7.37\%$ |
| **Terabyte (TB)** | $10^{12} = 10^{12}$ | **Tebibyte (TiB)** | $2^{40} = 1,099,511,627,776$ | $+9.95\%$ |

*Rule of Thumb:* Primary memory (RAM, CPU Caches) uses binary IEC units ($2^x$). Storage media (HDDs, SSDs, Flash) and network transmission bandwidths use decimal SI units ($10^y$).

### 4. Comparison of Signed Integer Representations

For an $n$-bit binary word:

| System | MSB Meaning | Representation of $-N$ | Valid Number Range | Zero Representation |
| :--- | :--- | :--- | :--- | :--- |
| **Unsigned** | Value $2^{n-1}$ | N/A | $[0, 2^n - 1]$ | Unique (`00...0`) |
| **Sign & Magnitude** | Sign ($0=+, 1=-$) | Invert MSB only | $[-(2^{n-1}-1), +(2^{n-1}-1)]$ | Dual ($+0, -0$) |
| **1's Complement** | Negative weight | Invert all bits ($\overline{B}$) | $[-(2^{n-1}-1), +(2^{n-1}-1)]$ | Dual ($+0, -0$) |
| **2's Complement** | $-2^{n-1}$ weight | Invert all bits $+ 1$ | $[-2^{n-1}, +2^{n-1}-1]$ | Unique (`00...0`) |
| **Excess-$K$ (Biased)** | Offset encoding | $\text{Value} + K$ | $[-K, 2^n - 1 - K]$ | Unique ($K$) |

#### Why 2's Complement is Universally Adopted:
1. **Unique Zero:** Eliminates dual-zero hardware comparison ambiguity.
2. **Simplified Adder/Subtractor:** Subtraction $A - B$ is performed as $A + (-B) = A + \overline{B} + 1$, reusing identical adder circuitry.
3. **Asymmetric Range:** Exactly one extra negative value ($-2^{n-1}$), eliminating wasted bit patterns.

### 5. Character & Decimal Encodings

- **ASCII:** 7-bit standard (128 characters), partitioned into Control (`0x00..0x1F`), Digits/Punctuation (`0x20..0x3F`), Uppercase (`0x40..0x5F`), Lowercase (`0x60..0x7F`).
- **Unicode Architecture:** 17 planes of $2^{16} = 65,536$ code points ($U+000000$ to $U+10FFFF$):
  - **Plane 0 (BMP - Basic Multilingual Plane):** $U+0000..U+FFFF$.
  - **UTF-8:** Variable length (1 to 4 bytes) prefix code. ASCII backwards-compatible.
  - **UTF-16:** Encodes BMP directly as 16-bit words. Encodes Supplementary Planes ($U+010000..U+10FFFF$) using **Surrogate Pairs**:
    $$\text{Offset} = U - \text{0x10000} \quad (\text{20-bit number: } W_1 \in [0, 2^{10}-1], W_2 \in [0, 2^{10}-1])$$
    $$\text{High Surrogate} = \text{0xD800} + W_1 \quad (\text{Range: 0xD800--0xDBFF})$$
    $$\text{Low Surrogate} = \text{0xDC00} + W_2 \quad (\text{Range: 0xDC00--0xDFFF})$$
- **Binary-Coded Decimal (BCD):**
  - *Packed BCD:* Two 4-bit digits per byte. Sign nibbles: `0xC` ($1100_2$) for positive/credit, `0xD` ($1101_2$) for negative/debit.
  - *Densely Packed BCD (DPD):* Encodes 3 decimal digits ($3 \times 4 = 12\text{ bits}$) into 10 bits ($d_0..d_9$) using boolean declet maps.

## Worked Examples / Calculations / Hardware Traces

### Example 1: Arbitrary Radix Base Conversion with Fractions

**Problem:** Convert $(247.375)_{10}$ to:
1. Binary (Base 2)
2. Octal (Base 8)
3. Hexadecimal (Base 16)

**Solution:**
- **Step 1: Integer Part $(247)_{10}$ via successive division:**
  - $247 / 2 = 123 \text{ rem } 1$
  - $123 / 2 = 61 \text{ rem } 1$
  - $61 / 2 = 30 \text{ rem } 1$
  - $30 / 2 = 15 \text{ rem } 0$
  - $15 / 2 = 7 \text{ rem } 1$
  - $7 / 2 = 3 \text{ rem } 1$
  - $3 / 2 = 1 \text{ rem } 1$
  - $1 / 2 = 0 \text{ rem } 1$
  Read upward: $(247)_{10} = (11110111)_2$.

- **Step 2: Fractional Part $(0.375)_{10}$ via successive multiplication:**
  - $0.375 \times 2 = 0.75 \implies \text{peel } 0$
  - $0.75 \times 2 = 1.50 \implies \text{peel } 1$
  - $0.50 \times 2 = 1.00 \implies \text{peel } 1 \text{ (exact termination)}$
  Read downward: $(0.375)_{10} = (0.011)_2$.

- **Combined Binary:** $(247.375)_{10} = (11110111.011)_2$.

- **Octal Conversion (Group 3 bits):**
  - Integer: $\underbrace{011}_{3}\ \underbrace{110}_{6}\ \underbrace{111}_{7} \implies 367_8$
  - Fraction: $.011_2 \implies .3_8$
  - Result: $(367.3)_8$.

- **Hexadecimal Conversion (Group 4 bits):**
  - Integer: $\underbrace{1111}_{F}\ \underbrace{0111}_{7} \implies F7_{16}$
  - Fraction: $.0110_2 \implies .6_{16}$
  - Result: $(F7.6)_{16}$.

### Example 2: Little Endian vs. Big Endian Multi-Byte Tracing

**Problem:** A program writes the 64-bit unsigned integer `0x0123456789ABCDEF` to memory starting at address `0x2000`. Show the byte-by-byte memory layout in hexadecimal for both Little Endian and Big Endian systems.

**Solution:**

```text
Address  | Little Endian (LSB First) | Big Endian (MSB First)
---------+---------------------------+-----------------------
 0x2000  |           0xEF            |         0x01
 0x2001  |           0xCD            |         0x23
 0x2002  |           0xAB            |         0x45
 0x2003  |           0x89            |         0x67
 0x2004  |           0x67            |         0x89
 0x2005  |           0x45            |         0xAB
 0x2006  |           0x23            |         0xCD
 0x2007  |           0x01            |         0xEF
```

### Example 3: UTF-16 Surrogate Pair Encoding

**Problem:** Calculate the UTF-16 surrogate pair encoding for the musical symbol character at Unicode code point $U+1D11E$ (G-clef).

**Solution:**
1. **Subtract $0x10000$ base offset:**
   $$U' = \text{0x1D11E} - \text{0x10000} = \text{0x0D11E}$$
2. **Convert offset to 20-bit binary:**
   $$\text{0x0D11E} = 0000\ 1101\ 0001\ 0001\ 1110_2$$
3. **Split into two 10-bit chunks ($W_1$ and $W_2$):**
   - High 10 bits ($W_1$): $0000110100_2 = \text{0x034}$
   - Low 10 bits ($W_2$): $0100011110_2 = \text{0x11E}$
4. **Compute High Surrogate ($0xD800 + W_1$):**
   $$\text{High} = \text{0xD800} + \text{0x034} = \text{0xD834}$$
5. **Compute Low Surrogate ($0xDC00 + W_2$):**
   $$\text{Low} = \text{0xDC00} + \text{0x11E} = \text{0xDD1E}$$

*Final UTF-16 Encoding:* `0xD834 0xDD1E`.

## Complexity Analysis / Common Pitfalls

- **Confusing SI ($10^y$) and IEC ($2^x$) Storage Capacity:** When a customer purchases a "1 TB" SSD ($10^{12}\text{ bytes}$), the operating system (which measures in binary $\text{GiB}/\text{TiB}$) reports $\frac{10^{12}}{2^{40}} \approx 909.49\text{ GiB}$, leading to perceived capacity loss.
- **Sign-Extension vs. Zero-Extension Mistakes:** Zero-extending a negative 2's complement number corrupts its value. For example, promoting 8-bit `-5` (`0xFB`) to 16-bit unsigned yields `0x00FB` ($+251$), whereas proper sign-extension yields `0xFFFB` ($-5$).
- **Surrogate Code Point Collisions:** The Unicode Consortium permanently reserved the range $U+D800..U+DFFF$ exclusively for UTF-16 surrogate pairs; no valid standalone character may ever be assigned to this range in Plane 0.

## Multiple Choice Questions

1. In an 8-bit system, what is the 2's complement representation of decimal integer $-43$?
    - **A)** `11010101`
    - **B)** `11010100`
    - **C)** `10101011`
    - **D)** `11010111`

2. A 32-bit integer stored at memory address `0x0040` contains the bytes `0x78`, `0x56`, `0x34`, `0x12` at addresses `0x0040`, `0x0041`, `0x0042`, and `0x0043` respectively. What is the hexadecimal integer value if the architecture is Little Endian?
    - **A)** `0x78563412`
    - **B)** `0x12345678`
    - **C)** `0x34127856`
    - **D)** `0x21436587`

3. What is the valid representation range for an 8-bit signed integer in 1's complement versus 2's complement?
    - **A)** 1's comp: $[-128, +127]$; 2's comp: $[-127, +127]$
    - **B)** 1's comp: $[-127, +127]$; 2's comp: $[-128, +127]$
    - **C)** 1's comp: $[-127, +128]$; 2's comp: $[-128, +127]$
    - **D)** 1's comp: $[-255, +255]$; 2's comp: $[-256, +255]$

4. How many decimal digits can be compressed into 10 bits using Densely Packed BCD (DPD)?
    - **A)** 2 decimal digits
    - **B)** 3 decimal digits
    - **C)** 4 decimal digits
    - **D)** 5 decimal digits

5. Which Unicode transformation format is always backward-compatible with 7-bit ASCII without modifying byte values?
    - **A)** UTF-32
    - **B)** UTF-16 Big Endian
    - **C)** UTF-8
    - **D)** UTF-16 Little Endian

### Answer Key & Explanations

1. **A**. Decimal $+43$ in 8-bit binary is `00101011`. To find 2's complement: invert all bits (`11010100`) and add 1 $\implies$ `11010101`. Alternatively, scan from right: copy bits up to first 1 (`1`), then invert remaining bits (`1101010`) $\implies$ `11010101`.
2. **B**. In Little Endian, the byte at the lowest address (`0x0040` $\to$ `0x78`) is the Least Significant Byte (LSB), and the byte at the highest address (`0x0043` $\to$ `0x12`) is the Most Significant Byte (MSB). Assembling from MSB to LSB gives `0x12345678`.
3. **B**. 1's complement has dual zeros ($+0$ and $-0$), giving a symmetric range of $[-(2^7-1), +(2^7-1)] = [-127, +127]$. 2's complement has a single zero, giving an asymmetric range of $[-2^7, +2^7-1] = [-128, +127]$.
4. **B**. Densely Packed BCD (DPD) compresses 3 decimal digits ($3 \times 4 = 12\text{ bits}$) into 10 bits ($2^{10} = 1024$ code points, comfortably encoding $10^3 = 1000$ decimal combinations).
5. **C**. UTF-8 encodes characters in the range $U+0000..U+007F$ using a single byte identical to standard 7-bit ASCII with the MSB set to `0`.

## References & Navigation

- **Previous Topic:** [[Functional Units & Performance Fundamentals]]
- **Next Topic:** [[Binary Addition, Subtraction & Carry Lookahead Adders]]
- **Related Notes:** [[Signed Multiplication (Booth's & Extended Booth's Algorithm)]], [[IEEE 754 Floating-Point Representation (Single & Double Precision)]]
