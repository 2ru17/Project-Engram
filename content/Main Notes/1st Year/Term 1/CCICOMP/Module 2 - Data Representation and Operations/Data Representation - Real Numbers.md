---
id: 50_data_representation__real_numbers
type: note
course: CCICOMP
topic: "5.0 Data Representation - Real Numbers"
status: completed
---

# 5.0 Data Representation - Real Numbers

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CCICOMP]] #[[Problem Solving]] #[[M2]]

---

## Overview

> Real numbers contain both whole and fractional components. A fixed-point binary representation is generally impractical as it lacks the necessary range to represent very large numbers and the precision to represent very small numbers. Thus, computer systems utilize floating-point notation, based on binary scientific notation, to dynamically balance range and precision. Defined heavily by the IEEE 754 standard, floating-point representations often trade accuracy for range; truncation of exact mantissa bits results in stored values being close approximations rather than perfectly exact numbers. 

## Important Formulas

### Fractional Binary Evaluation
The positional weight of bits to the right of the radix point uses negative powers of $2$.
$$\dots + b_{-1}2^{-1} + b_{-2}2^{-2} + b_{-3}2^{-3} + \dots$$
Where $2^{-1} = 0.5$, $2^{-2} = 0.25$, $2^{-3} = 0.125$, etc.

### IEEE 754 Floating-Point Formats
Floating point numbers are encoded into three parts: a Sign bit ($S$), an Exponent ($E'$), and a Mantissa ($M$).
The value evaluated is given by:
$$\text{Value} = (-1)^S \times 1.M \times 2^{E' - \text{bias}}$$ **Single Precision (binary32):** $32$ bits total. $1$ sign bit, $8$ exponent bits (bias $127$), and $23$ mantissa bits. **Double Precision (binary64):** $64$ bits total. $1$ sign bit, $11$ exponent bits (bias $1023$), and $52$ mantissa bits.

### Range Limitations **Overflow:** Occurs when a value is too large and its normalized exponent exceeds the maximum possible bits (e.g., an exponent $> 127$ for single precision). **Underflow:** Occurs when a very small value normalizes to an exponent smaller than the minimum possible bound (e.g., $< -126$ for single precision). **Truncation:** When a value has more significant digits than the mantissa capacity, the remaining least-significant bits are simply discarded, causing precision loss (e.g., $1/3 = 0.3333333\dots$).

## Worked Examples

### 1. Binary to Decimal (Fractional)
Convert $101.101_2$ to decimal. Whole part: $101_2 = 1(2^2) + 0(2^1) + 1(2^0) = 4 + 0 + 1 = 5$ Fractional part: $.101_2 = 1(2^{-1}) + 0(2^{-2}) + 1(2^{-3}) = 0.5 + 0 + 0.125 = 0.625$
Result: $5.625_{10}$.

### 2. Decimal to Binary Float Conversion (IEEE Single Precision)
Convert $-12.125_{10}$ to IEEE Single Precision floating point format.
1. **Determine Sign:** Negative, so $S = 1$.
2. **Convert to Binary:**
Whole: $12_{10} = 1100_2$
Fractional: $0.125_{10} = 0.001_2$
Combined: $1100.001_2$
3. **Normalize (Scientific Notation):**
Shift the radix point left by $3$ to get $1.100001_2 \times 2^3$.
The implicit leading $1$ is dropped. The mantissa $M = 10000100000000000000000_2$ (padded with zeros to $23$ bits).
4. **Determine Exponent:**
Base exponent is $3$.
Add bias ($127$): $3 + 127 = 130$.
Convert $130$ to $8$-bit binary: $10000010_2$.
5. **Final 32-bit String:**
   `1 10000010 10000100000000000000000`
   In hexadecimal, this is $\text{C}1420000\text{h}$.

### 3. Binary Float to Decimal
Evaluate the IEEE single precision string `0 01111101 11010000000000000000000` to decimal.
1. **Sign:** $0 \implies$ Positive.
2. **Exponent:** $01111101_2 = 125_{10}$.
Unbias: $125 - 127 = -2$.
3. **Mantissa:** $M = 1101000\dots$
Add implicit $1$: $1.1101_2$.
4. **Evaluate Value:**
$1.1101_2 \times 2^{-2} = 0.011101_2$
Convert to decimal: $0(2^{-1}) + 1(2^{-2}) + 1(2^{-3}) + 1(2^{-4}) + 0(2^{-5}) + 1(2^{-6})$
$= 0.25 + 0.125 + 0.0625 + 0.015625 = 0.453125_{10}$.

## Multiple Choice Questions

1. Why is a fixed-point binary representation generally impractical for real numbers?
- **A)** It cannot be processed by modern CPUs.
- **B)** It lacks the necessary range for very large numbers and precision for very small numbers.
- **C)** It requires double the memory of floating-point formats.
- **D)** It inherently prevents negative number representation.

2. Which standard heavily defines the floating-point representations used in modern computer systems?
- **A)** ISO 9001
- **B)** IEEE 802.11
- **C)** ASCII 128
- **D)** IEEE 754

3. In floating-point notation, what does a truncation operation result in?
- **A)** An overflow error that crashes the system.
- **B)** A perfect representation of infinite repeating decimals.
- **C)** Precision loss, leading to close approximations rather than exact numbers.
- **D)** The conversion of the value to an unsigned integer.

4. What is the positional weight of the first bit to the right of the radix point in a fractional binary number?
- **A)** 2^1 or 2
- **B)** 2^-1 or 0.5
- **C)** 2^-2 or 0.25
- **D)** 2^0 or 1

5. How many total bits does an IEEE 754 Single Precision (binary32) format utilize?
- **A)** 16 bits
- **B)** 32 bits
- **C)** 64 bits
- **D)** 128 bits

6. What are the three parts into which a floating-point number is encoded?
- **A)** Byte, Nibble, and Bit
- **B)** Mantissa, Register, and Index
- **C)** Sign bit, Exponent, and Mantissa
- **D)** Radix, Floating Point, and Denominator

7. Under what condition does floating-point overflow occur?
- **A)** When the mantissa has fewer significant digits than required.
- **B)** When a value is too large and its normalized exponent exceeds the maximum possible bits.
- **C)** When a very small value normalizes to a negative exponent.
- **D)** When attempting to divide a floating-point number by zero.

8. What is the bias value used for the exponent in IEEE 754 Single Precision?
- **A)** 1023
- **B)** 127
- **C)** 255
- **D)** 0

9. How is the mantissa (M) typically adjusted when normalizing a binary number into scientific notation?
- **A)** It is converted entirely to 1s.
- **B)** The implicit leading 1 is dropped and the rest is padded with zeros.
- **C)** It is multiplied by the bias value.
- **D)** The decimal radix is shifted to the far right.

10. What defines floating-point underflow?
- **A)** When a very small value normalizes to an exponent smaller than the minimum possible bound.
- **B)** When the system clock speed drops below operational thresholds.
- **C)** When memory capacity is insufficient to store a double precision number.
- **D)** When the truncation process discards the sign bit entirely.

### Answer Key & Explanations
1. **B)** Fixed-point binary lacks the range to represent very large numbers and precision for very small numbers.
2. **D)** The IEEE 754 standard heavily defines floating-point representations.
3. **C)** Truncation discards least-significant bits, causing precision loss and resulting in close approximations rather than perfectly exact numbers.
4. **B)** Positional weights to the right of the radix point use negative powers of 2, starting with 2^-1 = 0.5.
5. **B)** Single Precision (binary32) utilizes 32 bits total.
6. **C)** Floating point numbers are encoded into a Sign bit, an Exponent, and a Mantissa.
7. **B)** Overflow occurs when a value is too large and its normalized exponent exceeds maximum possible bits.
8. **B)** The bias for single precision exponent is explicitly stated as 127.
9. **B)** During normalization, the implicit leading 1 is dropped and the mantissa is padded with zeros.
10. **A)** Underflow occurs when a very small value normalizes to an exponent smaller than the minimum possible bound.

## References & Navigation

- **Previous Topic:** [[Data Representation - Integers]]
- **Next Topic:** [[Data Representation - Characters and Boolean]]
- **Related Notes:** [[Floating-Point Arithmetic Operations]], [[IEEE 754 Floating-Point Representation (Single & Double Precision)]]
