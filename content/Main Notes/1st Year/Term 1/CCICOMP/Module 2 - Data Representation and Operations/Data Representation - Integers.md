---
id: 40_data_representation__integers
type: note
course: CCICOMP
topic: "4.0 Data Representation - Integers"
status: completed
---

# 4.0 Data Representation - Integers

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCICOMP]] #[[Problem Solving]] #[[M2]]

---

## Overview

> Data representation involves encoding information into binary form so it can be reliably transported and processed by computer circuitry. Any numeric representation format balances size, range, accuracy, ease of manipulation, and standardization. Integers can be represented as unsigned (only non-negative values) or signed (capable of representing both positive and negative values). While various encoding schemes exist for signed integers, modern CPUs almost universally use the 2's complement scheme. Since data types use fixed-width bit strings, calculations that exceed the format's capacity result in overflow, producing mathematically illogical values.

## Important Formulas

### Unsigned Integers **Value Evaluation:** An $n$-bit unsigned integer $b_{n-1}\dots b_1b_0$ has the decimal value: 
  $$\text{Value} = \sum_{i=0}^{n-1} b_i 2^i$$ **Range:** $0$ to $2^n - 1$. For example, an $8$-bit unsigned integer ranges from $0$ to $255$. **Zero Extension:** To expand the width of an unsigned integer, simply pad the left side (most significant bits) with $0$s.

### Signed Integers
Signed integers allocate the Most Significant Bit (MSB) as the sign bit: $0$ for positive, $1$ for negative. **Sign-and-Magnitude:** The MSB is the sign, and the remaining bits represent the absolute magnitude of the number in standard binary. **1's Complement:** To represent a negative number, start with the positive unsigned binary value and invert every bit ($0 \to 1$, $1 \to 0$). **2's Complement:** To represent a negative number, invert every bit of the positive unsigned binary value and add $1$.
**Range:** $-(2^{n-1})$ to $2^{n-1} - 1$. E.g., for $8$-bit: $-128$ to $127$.
Only uses one representation of $0$ (unlike 1's complement and sign-and-magnitude). **Sign Extension:** To expand the width of a signed integer, replicate the sign bit to the left (e.g., $1011 \to 11111011$ for negatives, $0101 \to 00000101$ for positives).

## Worked Examples

### 1. Converting to 2's Complement
Represent $-25_{10}$ as an $8$-bit signed integer in 2's complement.
1. Determine absolute value in binary: $25_{10} = 00011001_2$ (with leading zeros to make $8$ bits).
2. Invert bits (1's complement): $11100110_2$.
3. Add $1$: $11100110_2 + 1 = 11100111_2$.
Result: $11100111_2$.

### 2. Converting from 2's Complement
Find the decimal equivalent of the $8$-bit 2's complement number $11100111_2$.
1. Check MSB: $1$ means negative.
2. Invert bits: $00011000_2$.
3. Add $1$: $00011000_2 + 1 = 00011001_2$.
4. Convert to decimal: $00011001_2 = 25_{10}$.
5. Apply sign: $-25_{10}$.

### 3. Overflow Condition
Add the $8$-bit signed values $90_{10}$ and $40_{10}$. $90_{10} = 01011010_2$ $40_{10} = 00101000_2$ Addition: $01011010_2 + 00101000_2 = 10000010_2$
Notice the MSB is now $1$. In an $8$-bit signed 2's complement system, $10000010_2$ is interpreted as $-126_{10}$. Because $90 + 40 = 130$, which exceeds the maximum $8$-bit positive range of $127$, the magnitude overflowed into the sign bit, causing an illogical negative result.

## Multiple Choice Questions

1. Which of the following best describes data representation in the context of computer circuitry?
    - **A)** Creating graphical user interfaces for numerical applications.
    - **B)** Encoding information into binary form so it can be reliably transported and processed.
    - **C)** Utilizing hexadecimal codes specifically for network security.
    - **D)** Translating high-level programming languages into spoken languages.

2. What distinguishes unsigned integers from signed integers?
    - **A)** Unsigned integers use 2's complement, while signed integers use ASCII.
    - **B)** Unsigned integers represent only non-negative values, while signed integers can represent both positive and negative values.
    - **C)** Unsigned integers are used for floating-point calculations, while signed integers are used for memory addresses.
    - **D)** Unsigned integers require double the memory footprint of signed integers.

3. Which encoding scheme is almost universally used by modern CPUs for signed integers?
    - **A)** Sign-and-Magnitude
    - **B)** Floating-Point notation
    - **C)** 1's complement
    - **D)** 2's complement

4. What happens when a calculation exceeds the fixed-width capacity of an integer format?
    - **A)** The CPU automatically upgrades the hardware structure.
    - **B)** The program pauses and awaits user input.
    - **C)** An overflow occurs, producing mathematically illogical values.
    - **D)** The system converts the data into a real number format.

5. How is zero extension performed on an unsigned integer?
    - **A)** By converting it to 1's complement first.
    - **B)** By padding the left side (most significant bits) with 0s.
    - **C)** By multiplying the integer by 2 repeatedly.
    - **D)** By replicating the least significant bit across all new spaces.

6. In a signed integer representation, what does a Most Significant Bit (MSB) of 1 indicate?
    - **A)** The number is extremely large.
    - **B)** The number is positive.
    - **C)** The number is negative.
    - **D)** The number has experienced an overflow error.

7. How do you convert a positive binary number to its 1's complement negative equivalent?
    - **A)** By keeping the bits identical and only changing the sign bit.
    - **B)** By inverting every bit, changing 0s to 1s and 1s to 0s.
    - **C)** By inverting every bit and adding 1.
    - **D)** By shifting all bits one position to the left.

8. What is the formula for the maximum range of an n-bit unsigned integer?
    - **A)** 0 to 2^n - 1
    - **B)** -(2^n) to 2^n
    - **C)** 0 to 10^n
    - **D)** 2^(n-1) to 2^(n+1)

9. What is a key advantage of 2's complement over sign-and-magnitude representation?
    - **A)** It represents negative numbers using fewer bits.
    - **B)** It only uses one representation of zero.
    - **C)** It naturally supports decimal floating points.
    - **D)** It eliminates the possibility of integer overflow.

10. How is sign extension performed on a negative 2's complement signed integer?
    - **A)** By padding the left side exclusively with 0s.
    - **B)** By inverting the entire bit string.
    - **C)** By replicating the sign bit (1) to the left to expand its width.
    - **D)** By adding a parity bit at the end of the string.

### Answer Key & Explanations

1. **B**. Data representation involves encoding information into binary form for reliable transport and processing.
2. **B**. Unsigned integers represent only non-negative values, while signed integers can represent both positive and negative values.
3. **D**. Modern CPUs almost universally use the 2's complement scheme for signed integers.
4. **C**. Calculations exceeding fixed-width capacity result in overflow, causing illogical values.
5. **B**. Zero extension expands an unsigned integer by padding the left side with 0s.
6. **C**. Signed integers allocate the MSB as the sign bit: 0 for positive, 1 for negative.
7. **B**. 1's complement involves starting with the positive unsigned binary value and inverting every bit.
8. **A**. The range of an unsigned integer is 0 to 2^n - 1.
9. **B**. A noted advantage is that 2's complement uses only one representation of 0, unlike sign-and-magnitude.
10. **C**. Sign extension for negative signed integers replicates the sign bit (1) to the left.

## References & Navigation

- **Previous Topic:** [[Introduction to Number Systems]]
- **Next Topic:** [[Data Representation - Real Numbers]]
- **Related Notes:** [[Integer Representation & Fixed-Point Arithmetic]], [[Data Representation - Characters and Boolean]]
