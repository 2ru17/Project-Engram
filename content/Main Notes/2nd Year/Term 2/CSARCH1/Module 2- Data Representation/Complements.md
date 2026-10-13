---
id: complements
type: note
course: CSARCH1
topic: Complements
status: completed
---


**🏷️ Tags:** #[[Computer Science]] #[[CSARCH1]] #[[Computer Architecture]] #[[Data Representation]] #[[Complements]]

---

# Complements

## Overview
This module discusses how to represent different types of complements for any number system and how to perform subtraction using addition and complements. Complements are used in digital computers for logic manipulation and to simplify subtraction operations.

## Types of Complements
For each base-$r$ system, there are two types of complements:
1. **Diminished Radix Complement**: $(r-1)$'s complement.
   - Binary ($r=2$): 1's complement.
   - Decimal ($r=10$): 9's complement.
2. **Radix Complement**: $r$'s complement.
   - Binary ($r=2$): 2's complement.
   - Decimal ($r=10$): 10's complement.

## Important Formulas

### Diminished Radix Complement ($(r-1)$'s complement)
Given a number $N$ in base $r$ having $n$ digits:
$$(r^n - 1) - N$$
- **Example**: 9's complement of $1230_{10}$ ($r=10, n=4$):
  - $(10^4 - 1) - 1230 = 9999 - 1230 = 8769_{10}$
- **Example**: 1's complement of $0110_2$ ($r=2, n=4$):
  - $(2^4 - 1) - 0110 = 1111 - 0110 = 1001_2$

### Radix Complement ($r$'s complement)
Given a number $N$ in base $r$ having $n$ digits:
$$r^n - N \quad \text{for } N \neq 0, \text{ and } 0 \text{ for } N = 0$$
- Practically, this is equivalent to: **$(r-1)$'s complement + 1**.
- **Example**: 10's complement of $1230_{10}$:
  - 9's complement is 8769, plus 1 = $8770_{10}$.
- **Example**: 2's complement of $0110_2$:
  - 1's complement is 1001, plus 1 = $1010_2$.

## Subtraction with Complements
Subtraction of two $n$-digit unsigned numbers ($M - N$) in base $r$:
1. Add the minuend $M$ to the $r$'s complement of the subtrahend $N$.
2. **If $M \geq N$**: The sum will produce an end carry. Discard the carry. The remaining result is $M - N$.
3. **If $M < N$**: The sum produces no end carry. The result is the $r$'s complement of $(M - N)$. To view the answer in a familiar format, take the $r$'s complement of the sum and place a negative sign in front (though negative numbers technically don't exist for strictly unsigned formats).

### Worked Examples
**Example 1: Using 10's complement, perform $72532 - 3250$**
- Pad $N$ to match the number of digits in $M$: $N = 03250$.
- $M = 72532$
- 10's complement of $N = 96750$
- $M + N' = 72532 + 96750 = 169282$
- Discard end carry -> **$69282$**

**Example 2: Using 10's complement, perform $3250 - 72532$**
- $M = 03250$
- 10's complement of $N = 27468$
- $M + N' = 03250 + 27468 = 30718$
- No carry -> Take 10's complement of $30718$ and add negative sign: **$-69282$**

**Example 3: Using 2's complement, perform $1010100_2 - 1000011_2$**
- $M = 1010100$
- 2's complement of $N = 0111101$
- $M + N' = 1010100 + 0111101 = 10010001$
- Discard end carry -> **$0010001_2$**

## Multiple Choice Questions

1. What is the 9's complement of the decimal number 1230?
    - **A)** 8770
    - **B)** 8769
    - **C)** 9999
    - **D)** 1000

2. The radix complement of a number in base r is equivalent to:
    - **A)** (r-1)'s complement
    - **B)** (r-1)'s complement + 1
    - **C)** (r-1)'s complement - 1
    - **D)** The number itself inverted

3. What is the 1's complement of the binary number 0110?
    - **A)** 1010
    - **B)** 1001
    - **C)** 1000
    - **D)** 1111

4. What is the 2's complement of the binary number 1111?
    - **A)** 0000
    - **B)** 0001
    - **C)** 1110
    - **D)** 1000

5. What is the 10's complement of the decimal number 725?
    - **A)** 274
    - **B)** 275
    - **C)** 999
    - **D)** 300

6. When performing subtraction M - N using r's complement, what indicates that M is less than N?
    - **A)** An end carry is produced
    - **B)** The sum produces no end carry
    - **C)** The result is perfectly zero
    - **D)** The most significant bit becomes 1 immediately

7. What is the 2's complement of the binary number 0110?
    - **A)** 1001
    - **B)** 1010
    - **C)** 1011
    - **D)** 0101

8. What is the primary purpose of using complements in digital computers?
    - **A)** To multiply floating-point numbers faster
    - **B)** To increase memory storage capacity
    - **C)** To simplify the subtraction operation using logic manipulation
    - **D)** To compress binary data streams

9. What is the (r-1)'s complement of 1100 in base 8 (octal)?
    - **A)** 6677
    - **B)** 6700
    - **C)** 7777
    - **D)** 0011

10. If M = 15 and N = 14, what is the result of adding M to the 10's complement of N (using 2 digits)?
    - **A)** 101 (with carry discarded, leaving 01)
    - **B)** 99 (no carry)
    - **C)** 15 (with carry)
    - **D)** 100 (no carry)

### Answer Key & Explanations
1. **B)** The 9's complement is derived by subtracting each digit from 9: (9999 - 1230 = 8769).
2. **B)** Radix complement is mathematically defined as (r-1)'s complement + 1.
3. **B)** The 1's complement involves flipping each bit, turning 0110 into 1001.
4. **B)** The 1's complement of 1111 is 0000. Adding 1 gives 0001.
5. **B)** The 10's complement is 999 - 725 = 274, plus 1 equals 275.
6. **B)** A lack of an end carry signifies that the minuend was smaller than the subtrahend.
7. **B)** Flipping 0110 yields 1001; adding 1 yields 1010.
8. **C)** Complements enable hardware to perform subtraction directly using addition logic.
9. **A)** In base 8, the (r-1)'s complement subtracts each digit from 7: (7777 - 1100 = 6677).
10. **A)** The 10's complement of 14 is 86. 15 + 86 = 101, dropping the carry gives 01.

## References & Navigation

- **Previous Topic:** [[Binary Codes for Decimal Digits]]
- **Next Topic:** [[Number System Base Conversion]]
