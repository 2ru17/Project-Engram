---
id: 30_introduction_to_number_systems
type: note
course: CCICOMP
topic: "3.0 Introduction to Number Systems"
status: completed
---

# 3.0 Introduction to Number Systems

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCICOMP]] #[[Problem Solving]] #[[M2]]

---

## Overview

> A number system is a method of representing numerical values. The base (or radix) determines the number of symbols used to represent digits, and each digit is weighted based on its position relative to the radix point. While computers natively operate exclusively on binary (base 2) numbers, humans often use decimal (base 10), octal (base 8), and hexadecimal (base 16) to conveniently represent and manipulate computer data. 

## Important Formulas

### Common Number Systems **Binary (Base 2):** Symbols $0, 1$. Denoted as $1011_2$ or $1011\text{B}$. **Octal (Base 8):** Symbols $0, 1, 2, 3, 4, 5, 6, 7$. Denoted as $327_8$ or $327\text{o}$. **Decimal (Base 10):** Symbols $0-9$. Denoted as $25_{10}$ or $25\text{d}$. **Hexadecimal (Base 16):** Symbols $0-9$, $\text{A (10)}, \text{B (11)}, \text{C (12)}, \text{D (13)}, \text{E (14)}, \text{F (15)}$. Denoted as $5\text{C}8_{16}$ or $5\text{C}8\text{h}$.

### Base Conversion Rules **Any Base to Decimal:** Multiply each digit by the base raised to the power of its positional index (starting at $0$ for the rightmost digit before the radix point) and sum them up. **Decimal to Any Base:** Use continuous division by the target base (e.g., $2$, $8$, or $16$) for the integer part. The remainders, read from the bottom up (last remainder to first), form the new digits. **Binary to Octal/Hexadecimal:** Group the binary digits starting from the rightmost (least significant) bit. Use groups of $3$ for Octal and groups of $4$ for Hexadecimal. Pad with $0$s on the left if necessary. Convert each group to its corresponding octal/hex digit. **Octal/Hexadecimal to Binary:** Convert each octal digit into its corresponding $3$-bit binary equivalent, or each hexadecimal digit into its corresponding $4$-bit binary equivalent.

## Worked Examples

### 1. Binary to Decimal Conversion
Convert $101010_2$ to Decimal.
$$101010_2 = (1 \times 2^5) + (0 \times 2^4) + (1 \times 2^3) + (0 \times 2^2) + (1 \times 2^1) + (0 \times 2^0)$$
$$= 32 + 0 + 8 + 0 + 2 + 0 = 42_{10}$$

### 2. Decimal to Binary Conversion
Convert $23_{10}$ to Binary. $23 \div 2 = 11$ R $1$ $11 \div 2 = 5$ R $1$ $5 \div 2 = 2$ R $1$ $2 \div 2 = 1$ R $0$ $1 \div 2 = 0$ R $1$
Reading remainders from bottom to top: $10111_2$.

### 3. Binary to Octal Conversion
Convert $1101010_2$ to Octal. Group by 3 from the right: $001 \mid 101 \mid 010$ (padding the leftmost group with two $0$s). Convert groups: $001_2 = 1_8$, $101_2 = 5_8$, $010_2 = 2_8$. Result: $152_8$.

### 4. Decimal to Hexadecimal Conversion
Convert $351_{10}$ to Hexadecimal. $351 \div 16 = 21$ R $15 (\text{F})$ $21 \div 16 = 1$ R $5$ $1 \div 16 = 0$ R $1$
Reading from bottom to top: $15\text{F}_{16}$.

## Multiple Choice Questions

1. What does the base (or radix) of a number system determine?
    - **A)** The physical size of the memory block needed to store it.
    - **B)** The speed at which a processor can evaluate the number.
    - **C)** The number of symbols used to represent digits.
    - **D)** Whether the number system can support fractional values.

2. Which number system does a computer natively operate on exclusively?
    - **A)** Decimal (Base 10)
    - **B)** Hexadecimal (Base 16)
    - **C)** Binary (Base 2)
    - **D)** Octal (Base 8)

3. How many unique symbols are used in the Hexadecimal (Base 16) number system?
    - **A)** 10
    - **B)** 12
    - **C)** 16
    - **D)** 20

4. What is the general rule for converting a number from any base to decimal?
    - **A)** Divide the number continuously by 10 and record the remainders.
    - **B)** Multiply each digit by the base raised to the power of its positional index and sum them up.
    - **C)** Group the digits into sets of 4 and translate via ASCII.
    - **D)** Invert the digits and add 1.

5. When converting a decimal number to binary using continuous division, how are the new digits determined?
    - **A)** By reading the whole number quotients from top to bottom.
    - **B)** By reading the remainders from bottom to top (last remainder to first).
    - **C)** By summing all the remainders together.
    - **D)** By translating each decimal digit directly into a 4-bit binary group.

6. How do you convert a binary number to octal?
    - **A)** Group the binary digits into sets of 3 starting from the right and convert each group.
    - **B)** Multiply the binary string by 8 continuously.
    - **C)** Group the binary digits into sets of 4 starting from the left.
    - **D)** Convert the binary string to decimal, then subtract 8 iteratively.

7. What is the decimal value of the hexadecimal symbol 'C'?
    - **A)** 10
    - **B)** 11
    - **C)** 12
    - **D)** 14

8. To convert a binary number to hexadecimal, how many bits should be grouped together?
    - **A)** 2
    - **B)** 3
    - **C)** 4
    - **D)** 8

9. Why do humans often use octal and hexadecimal systems when working with computers?
    - **A)** Because modern CPUs process hexadecimal faster than binary.
    - **B)** To more conveniently represent and manipulate binary computer data.
    - **C)** Because they are the only formats compatible with floating-point math.
    - **D)** Because network protocols strictly require Base 8 formats.

10. When grouping binary digits for conversion and the leftmost group is incomplete, what is the proper procedure?
    - **A)** Discard the incomplete group entirely.
    - **B)** Pad the leftmost group with 1s.
    - **C)** Pad the leftmost group with 0s.
    - **D)** Shift the entire binary string to the right until it aligns.

### Answer Key & Explanations

1. **C**. The base or radix determines the number of symbols used to represent digits.
2. **C**. Computers natively operate exclusively on binary (base 2) numbers.
3. **C**. Hexadecimal uses 16 symbols (0-9 and A-F).
4. **B**. To convert to decimal, multiply each digit by the base raised to the power of its positional index and sum them up.
5. **B**. Using continuous division, remainders are read from bottom to top to form the new digits.
6. **A**. Binary to octal conversion involves grouping binary digits into sets of 3 starting from the rightmost bit.
7. **C**. The hexadecimal symbol C corresponds to the decimal value 12.
8. **C**. Binary to hexadecimal conversion uses groups of 4 bits.
9. **B**. Humans use decimal, octal, and hexadecimal to conveniently represent and manipulate binary computer data.
10. **C**. The rule explicitly states to pad with 0s on the left if necessary when grouping digits.

## References & Navigation

- **Previous Topic:** [[Computers, Data, and Information]]
- **Next Topic:** [[Data Representation - Integers]]
- **Related Notes:** [[Positional Number System]], [[Number System Base Conversion]]
