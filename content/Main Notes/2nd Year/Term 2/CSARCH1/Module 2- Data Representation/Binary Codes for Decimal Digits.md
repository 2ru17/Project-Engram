---
id: binary_codes_for_decimal_digits
type: note
course: CSARCH1
topic: Binary Codes for Decimal Digits
status: completed
---


**Tags:** #[[Computer Science]] #[[CSARCH1]] #[[Computer Architecture]] #[[Data Representation]] #[[Binary Codes for Decimal Digits]]

---

# Binary Codes for Decimal Digits

## Overview
This module covers how to represent decimal digits using different types of binary codes. Representing decimal digits in binary requires a minimum of 4 bits per digit, allowing for $2^4 = 16$ combinations. Since there are only 10 decimal digits, 6 combinations remain unused.

## Types of Binary Codes
1. **Binary Coded Decimal (BCD)**: 
   - Weighted code (8 4 2 1).
2. **2421 Code**:
   - Weighted code (2 4 2 1).
   - **Self-complementing**: The 9's complement of a decimal digit is obtained by flipping the bits of its binary code.
3. **Excess-3 Code**:
   - Derived by adding 3 (0011 in binary) to the BCD representation.
   - Self-complementing code.
4. **8, 4, -2, -1 Code**:
   - Weighted code with positive and negative weights.
   - Self-complementing code.
5. **Biquinary Code (5 0 4 3 2 1 0)**:
   - 7-bit code with error-detection properties.
   - Contains a two-bit group (5 0) and a five-bit group (4 3 2 1 0).

## Gray Code (Reflected Code)
- A non-weighted binary code where only **one bit** changes in the sequence when going from one number to the next.
- Useful in electro-mechanical applications such as rotating motors to avoid transient errors during state transitions.

### Decimal Digit Representations Table
| Decimal | BCD (8 4 2 1) | 2421 Code | Excess-3 | 8, 4, -2, -1 | Biquinary (5 0 4 3 2 1 0) | Gray Code |
|---------|---------------|-----------|----------|--------------|---------------------------|-----------|
| 0       | 0000          | 0000      | 0011     | 0000         | 01 00001                  | 0000      |
| 1       | 0001          | 0001      | 0100     | 0111         | 01 00010                  | 0001      |
| 2       | 0010          | 0010      | 0101     | 0110         | 01 00100                  | 0011      |
| 3       | 0011          | 0011      | 0110     | 0101         | 01 01000                  | 0010      |
| 4       | 0100          | 0100      | 0111     | 0100         | 01 10000                  | 0110      |
| 5       | 0101          | 1011      | 1000     | 1011         | 10 00001                  | 0111      |
| 6       | 0110          | 1100      | 1001     | 1010         | 10 00010                  | 0101      |
| 7       | 0111          | 1101      | 1010     | 1001         | 10 00100                  | 0100      |
| 8       | 1000          | 1110      | 1011     | 1000         | 10 01000                  | 1100      |
| 9       | 1001          | 1111      | 1100     | 1111         | 10 10000                  | 1101      |

## Examples
- **Representing 395**:
  - BCD: `0011 1001 0101`
  - 2421: `0011 1111 1011`
  - Excess-3: `0110 1100 1000`
  - 8, 4, -2, -1: `0101 1111 1011`

## Multiple Choice Questions

1. How many minimum bits are required to represent a single decimal digit using a binary code?
    - **A)** 2 bits
    - **B)** 3 bits
    - **C)** 4 bits
    - **D)** 8 bits

2. Which of the following binary codes is NOT considered self-complementing?
    - **A)** 2421 code
    - **B)** Excess-3 code
    - **C)** 8, 4, -2, -1 code
    - **D)** BCD (8 4 2 1) code

3. What is the Excess-3 code representation for the decimal digit 5?
    - **A)** 0101
    - **B)** 1000
    - **C)** 0111
    - **D)** 1011

4. In the Biquinary code (5 0 4 3 2 1 0), how is the decimal digit 3 represented?
    - **A)** 0 1 0 1 0 0 0
    - **B)** 0 1 0 0 0 1 0
    - **C)** 1 0 0 1 0 0 0
    - **D)** 0 0 1 1 0 0 0

5. What is a key characteristic of Grey Code (Reflected Code)?
    - **A)** It uses a parity bit for error correction
    - **B)** Only one bit changes when transitioning from one number to the next
    - **C)** It is heavily weighted based on position
    - **D)** It requires 5 bits per decimal digit

6. In the 2421 code, what is the binary sequence for the decimal digit 6?
    - **A)** 0110
    - **B)** 1100
    - **C)** 1001
    - **D)** 0101

7. Which of the following codes is known to be used in rotating motors?
    - **A)** Excess-3 Code
    - **B)** Biquinary Code
    - **C)** Grey Code
    - **D)** 2421 Code

8. What is the BCD (8 4 2 1) representation for the decimal number 395?
    - **A)** 0011 1111 1011
    - **B)** 0110 1100 1000
    - **C)** 0011 1001 0101
    - **D)** 0101 1111 1011

9. How many unused bit combinations are there when representing decimal digits with 4-bit binary codes?
    - **A)** 4
    - **B)** 6
    - **C)** 8
    - **D)** 10

10. What is the 8, 4, -2, -1 code representation for the decimal digit 9?
    - **A)** 1111
    - **B)** 1001
    - **C)** 1100
    - **D)** 1011

### Answer Key & Explanations

1. **C**. A minimum of 4 bits is required since 2^3=8 is not enough to cover the 10 decimal digits (0-9).
2. **D**. BCD is a weighted code but it is not self-complementing.
3. **B**. The decimal digit 5 plus 3 is 8, which is 1000 in binary.
4. **A**. It activates the '0' position in the (5 0) part and the '3' position in the (4 3 2 1 0) part.
5. **B**. In Grey code, consecutive numbers differ by exactly one bit.
6. **B**. In the 2421 code, 6 is represented as 1100.
7. **C**. Grey code is heavily utilized in rotating motors to avoid transient errors during state changes.
8. **C**. The digits 3, 9, 5 are individually mapped to their 4-bit BCD equivalents: 0011, 1001, 0101.
9. **B**. 4 bits provide 16 combinations, and mapping 10 decimal digits leaves 6 unused.
10. **A**. In the 8, 4, -2, -1 system, 1111 calculates to 8 + 4 - 2 - 1 = 9.

## References & Navigation

- **Previous Topic:** [[Binary Data Organization]]
- **Next Topic:** [[Number System Base Conversion]]
