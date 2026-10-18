---
id: number_system_base_conversion
type: note
course: CSARCH1
topic: Number System Base Conversion
status: completed
---

# Number System Base Conversion

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSARCH1]] #[[Problem Solving]] #[[M2]]

---

## Overview

## Important Formulas & Algorithms

### 1. Decimal to Target Base
To convert a decimal number to any target base (e.g., Binary, Octal, Hexadecimal):
- **Integer Part (Whole Number):** 
  Perform successive ("reverse") division by the target base. Write down the remainders at each step. The final result is read from the last quotient/remainder **bottom-up**.
- **Fractional Part:** 
  Perform successive multiplication of the fraction by the target base. Extract the integer part generated at each step. Continue until the fractional part becomes zero (or until 4 decimal places for non-terminating fractions). The result is read **top-down**.

**Example: $6.625_{10}$ to Binary**
- *Integer (6):* 
  - $6 \div 2 = 3$ remainder **0**
  - $3 \div 2 = 1$ remainder **1**
  - $1 \div 2 = 0$ remainder **1**
  - Read bottom-up: `110`
- *Fraction (0.625):*
  - $0.625 \times 2 = \mathbf{1}.250$ (Extract 1, keep 0.250)
  - $0.250 \times 2 = \mathbf{0}.500$ (Extract 0, keep 0.500)
  - $0.500 \times 2 = \mathbf{1}.000$ (Extract 1, fraction is now 0)
  - Read top-down: `.101`
- **Result:** $110.101_2$

---

## Power-of-Two Conversions (Binary, Octal, Hex)

Because $8 = 2^3$ and $16 = 2^4$, conversions between these bases and binary can be done directly through grouping, without routing through decimal.

### Binary $\leftrightarrow$ Octal (Base 8)
- **Rule:** 1 Octal digit = 3 Binary bits.
- **Binary to Octal:** Starting from the radix point (decimal point), group the binary bits into clusters of 3. Pad with leading/trailing zeros if necessary. Convert each 3-bit cluster into its octal equivalent.
  - *Example:* $011\ 101\ 001.111_2 \rightarrow 351.7_8$
- **Octal to Binary:** Convert each octal digit directly into a 3-bit binary sequence.
  - *Example:* $726.5_8 \rightarrow 111\ 010\ 110.101_2$

### Binary $\leftrightarrow$ Hexadecimal (Base 16)
- **Rule:** 1 Hexadecimal digit = 4 Binary bits (a nibble).
- **Binary to Hex:** Starting from the radix point, group bits into clusters of 4. Convert each nibble to its hex equivalent (0-9, A-F).
  - *Example:* $0111\ 0101\ 1001.1011_2 \rightarrow 759.B_{16}$
- **Hex to Binary:** Convert each hex digit directly into a 4-bit binary sequence.
  - *Example:* $829.A_{16} \rightarrow 1000\ 0010\ 1001.1010_2$

### Hexadecimal $\leftrightarrow$ Octal
You cannot convert directly between Hex and Octal. You must use **Binary as an intermediate bridge**.
- **Hex to Octal:** Hex $\rightarrow$ Expand to 4-bit Binary $\rightarrow$ Regroup into 3-bit Octal.
  - *Example ($829.A_{16}$):* 
    1. Hex to Bin: $1000\ 0010\ 1001.1010_2$
    2. Regroup to 3s: $100\ 000\ 101\ 001.101\ 000_2$ (added trailing zero)
    3. Bin to Oct: $4051.50_8$
- **Octal to Hex:** Octal $\rightarrow$ Expand to 3-bit Binary $\rightarrow$ Regroup into 4-bit Hex.

---

## General Base Conversion ($Base\ X \leftrightarrow Base\ Y$)
To convert between two non-power-of-two bases (e.g., Base-7 to Base-5), you must use **Decimal (Base 10) as the intermediate bridge**.

1. **Step 1 ($Base\ X \rightarrow Decimal$):** Use positional expansion (summing digits multiplied by their positional weight $X^i$).
2. **Step 2 ($Decimal \rightarrow Base\ Y$):** Use the successive division/multiplication algorithm on the resulting decimal number to reach Base Y.

## Multiple Choice Questions

1. When converting a decimal fraction to another base, which arithmetic operation is successively used?
    - **A)** Division by the target base
    - **B)** Subtraction of the target base
    - **C)** Multiplication by the target base
    - **D)** Addition of the target base

2. What is the binary equivalent of the decimal number 6?
    - **A)** 101
    - **B)** 110
    - **C)** 111
    - **D)** 100

3. What is the hexadecimal equivalent of the decimal number 314?
    - **A)** 13A
    - **B)** 19A
    - **C)** 314
    - **D)** 1A3

4. How many binary digits are required to represent a single octal digit?
    - **A)** 2
    - **B)** 3
    - **C)** 4
    - **D)** 8

5. What is the octal equivalent of the binary number 011 101 001?
    - **A)** 351
    - **B)** 153
    - **C)** 721
    - **D)** 341

6. How many binary digits are required to represent a single hexadecimal digit?
    - **A)** 2
    - **B)** 3
    - **C)** 4
    - **D)** 16

7. What is the hexadecimal equivalent of the binary number 0111 0101 1001.1011?
    - **A)** 759.B
    - **B)** 759.A
    - **C)** 859.C
    - **D)** 649.B

8. What is the octal equivalent of the hexadecimal number 829.A?
    - **A)** 4051.50
    - **B)** 2051.25
    - **C)** 1024.50
    - **D)** 829.10

9. When converting from decimal to another base, how do you read the integer result after successive division?
    - **A)** From top to bottom
    - **B)** From left to right
    - **C)** From bottom going up
    - **D)** Only the last quotient is used

10. What is the decimal fraction 0.625 represented in hexadecimal?
    - **A)** 0.5
    - **B)** 0.A
    - **C)** 0.B
    - **D)** 0.C

### Answer Key & Explanations

1. **C**. The fractional portion requires repeatedly multiplying by the target base and observing the integer overflow.
2. **B**. 6 divided by 2 gives 3 rem 0; 3 div 2 gives 1 rem 1; 1 div 2 gives 0 rem 1. Reading upwards: 110.
3. **A**. 314 / 16 = 19 (rem 10 -> A); 19 / 16 = 1 (rem 3); 1 / 16 = 0 (rem 1). Result: 13A.
4. **B**. An octal digit maxes out at 7, which corresponds to 111 in binary, demanding 3 bits.
5. **A**. Directly grouping the bits into 3s: 011=3, 101=5, 001=1 gives 351 in octal.
6. **C**. Hexadecimal goes up to 15 (F), which spans precisely 4 binary bits (1111).
7. **A**. Breaking down 4-bit groups: 0111=7, 0101=5, 1001=9, 1011=B.
8. **A**. Hex -> Binary -> Octal. 829.A16 is 1000 0010 1001.1010 in binary, regrouping to 3s yields 4051.50 in octal.
9. **C**. Successive division remainders construct the final number when read from the final division up to the first.
10. **B**. 0.625 * 16 = 10.000. In hexadecimal, 10 maps to the letter A.

## References & Navigation

- **Previous Topic:** [[Positional Number System]]
- **Next Topic:** [[Binary Data Organization]]
- **Related Notes:** [[Introduction to Number Systems]]
