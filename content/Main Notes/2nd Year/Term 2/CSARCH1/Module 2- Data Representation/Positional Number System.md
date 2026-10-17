---
id: positional_number_system
type: note
course: CSARCH1
topic: Positional Number System
status: completed
---


**🏷️ Tags:** #[[Computer Science]] #[[CSARCH1]] #[[Computer Architecture]] #[[Data Representation]] #[[Positional Number System]]

---

# Positional Number System

## Overview
This module introduces the basic concepts of positional (or place-value) number systems and how to convert any number system to decimal.

## Key Definitions
- **Positional Number System**: A number system where the value of a symbol depends on its position within the number.
- **Radix (Base)**: The total number of unique symbols available in that system.
  - The largest-valued symbol always has a magnitude of one less than the radix.
- **Digit Value**: The digit multiplied by its place value.
- **Place Value**: The base raised to the power of its position index.
  - Position starts at `0` from the left side of the radix point and increments by 1 moving left (0, 1, 2...).
  - Position starts at `-1` from the right side of the radix point and decrements by 1 moving right (-1, -2...).

## Common Positional Number Systems
1. **Denary / Decimal (Base 10)**
   - Radix: 10
   - Symbols: `0, 1, 2, 3, 4, 5, 6, 7, 8, 9`
   - Notation: Subscript 10, prefix `0d` or suffix `d` (e.g., $124.5_{10}$).
2. **Binary (Base 2)**
   - Radix: 2
   - Symbols: `0, 1`
   - Notation: Subscript 2, prefix `0b`, suffix `b` (e.g., $0101.1_2$, `0b0101.1`). The radix point is called the binary point.
3. **Octal (Base 8)**
   - Radix: 8
   - Symbols: `0, 1, 2, 3, 4, 5, 6, 7`
   - Notation: Subscript 8, prefix `0o` or `0q` (e.g., $67.4_8$, `0q67.4`). The radix point is called the octal point.
4. **Hexadecimal (Base 16)**
   - Radix: 16
   - Symbols: `0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, F`
   - Notation: Subscript 16, prefix `0x` or `0h`, suffix `h` (e.g., $0A2.8_{16}$, `0xA2.8`). The radix point is called the hexadecimal point.

## Converting Any Base to Decimal
The decimal value is the sum of all digit values (digit $\times$ place value).

**Example: Binary to Decimal ($101.1_2$)**
- $1 \times 2^2 = 4$
- $0 \times 2^1 = 0$
- $1 \times 2^0 = 1$
- $1 \times 2^{-1} = 0.5$
- **Sum = 5.5**

**Example: Hexadecimal to Decimal ($2A7.8_{16}$)**
- $2 \times 16^2 = 512$
- $A (10) \times 16^1 = 160$
- $7 \times 16^0 = 7$
- $8 \times 16^{-1} = 0.5$
- **Sum = 679.5**

**Example: Quaternary (Base-4) to Decimal ($213.2_4$)**
- $2 \times 4^2 = 32$
- $1 \times 4^1 = 4$
- $3 \times 4^0 = 3$
- $2 \times 4^{-1} = 0.5$
- **Sum = 39.5**

## Other Number Systems
- **Base 3**: Ternary
- **Base 4**: Quaternary
- **Base 5**: Quinary
- **Base 12**: Duodecimal
- **Base 20**: Vigesimal
- **Base 60**: Sexagesimal

## Multiple Choice Questions

1. What does the "radix" of a positional number system represent?
- **A)** The position of the decimal point
- **B)** The total number of unique symbols available
- **C)** The maximum value a single digit can hold
- **D)** The number of digits in the whole number

2. What is the radix of the binary number system?
- **A)** 1
- **B)** 2
- **C)** 8
- **D)** 10

3. What is the radix of the hexadecimal number system?
- **A)** 8
- **B)** 10
- **C)** 16
- **D)** 20

4. How many unique symbols are there in a quaternary (base-4) number system?
- **A)** 2
- **B)** 4
- **C)** 8
- **D)** 10

5. Which of the following correctly denotes a hexadecimal number?
- **A)** 0O67.4
- **B)** 0x2A7.8
- **C)** 0b0101.1
- **D)** 124.5d

6. In any positional number system, what is the mathematical formula for a digit's value?
- **A)** The digit added to its place value
- **B)** The digit multiplied by its place value
- **C)** The base raised to the power of the digit
- **D)** The digit divided by the radix

7. In the octal number system, what is the place value of the first digit to the left of the octal point?
- **A)** 8^-1
- **B)** 8^0
- **C)** 8^1
- **D)** 8^2

8. What is the number system with a radix of 12 called?
- **A)** Undecimal
- **B)** Duodecimal
- **C)** Tridecimal
- **D)** Tetradecimal

9. For position indexing relative to the radix point, what position is assigned to the first digit on the right side of the radix point?
- **A)** 0
- **B)** 1
- **C)** -1
- **D)** -2

10. Which number system has a radix of 60?
- **A)** Hexatrigesimal
- **B)** Sexagesimal
- **C)** Duosexagesimal
- **D)** Tetrasexagesimal

### Answer Key & Explanations
1. **B)** The radix or base defines the total number of unique symbols used in that system.
2. **B)** Binary uses two symbols (0 and 1), hence radix 2.
3. **C)** Hexadecimal uses 16 unique symbols (0-9, A-F), hence radix 16.
4. **B)** Quaternary is base-4, which means it uses exactly 4 unique symbols (0, 1, 2, 3).
5. **B)** The prefix 0x is a standard notation for hexadecimal numbers.
6. **B)** A digit's true value in the number is the digit itself multiplied by its positional place value.
7. **B)** The first position to the left of the radix point is always index 0, so the place value is 8^0.
8. **B)** Base-12 is formally known as Duodecimal.
9. **C)** Positions to the right of the radix point start at -1 and decrement (e.g., -1, -2).
10. **B)** Sexagesimal is the formal name for the base-60 number system.

## References & Navigation

- **Previous Topic:** None
- **Next Topic:** [[2x vs 10y Ambiguity-1]]
