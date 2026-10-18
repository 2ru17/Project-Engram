---
id: 70_arithmetic_operations_in_binary
type: note
course: CCICOMP
topic: "7.0 Arithmetic Operations in Binary"
status: completed
---

# 7.0 Arithmetic Operations in Binary

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCICOMP]] #[[Problem Solving]] #[[M2]]

---

## Overview

> Arithmetic operations (addition, subtraction, multiplication, and division) form the core of computer processing. In order for arithmetic operations to be performed by a computer, all operands must be converted to the same base (binary). When working with signed integer data, the arithmetic logic varies depending on the specific representation scheme used (e.g., 1's complement vs. 2's complement). Specifically, how a final carry-out bit is handled distinguishes 1's complement addition from 2's complement addition. Furthermore, subtraction is universally handled by negating the subtrahend (complementing it) and then performing addition.

## Important Formulas

### Basic Binary Arithmetic Rules **Binary Addition:**
$0 + 0 = 0$
$0 + 1 = 1$
$1 + 0 = 1$
$1 + 1 = 0 \text{ carry } 1$ **Binary Subtraction:**
$0 - 0 = 0$
$1 - 0 = 1$
$1 - 1 = 0$
$0 - 1 = 1 \text{ borrow } 1$ (equivalent to borrowing $2$ from the next higher significance column)

### Signed Integer Addition & Subtraction **1's Complement Addition:** Add the two binary strings. If there is a final carry-out bit beyond the most significant bit, add that $1$ back into the intermediate result (end-around carry). **2's Complement Addition:** Add the two binary strings. If there is a final carry-out bit, simply **discard** it. **Subtraction ($A - B$):** Negate the subtrahend ($B$) to its complement equivalent ($-B$) using the appropriate complement rules, and then perform addition: $A + (-B)$.

## Worked Examples

### 1. Basic Binary Addition & Subtraction **Addition:** $1100_2 + 1010_2$
$1100$
$+ 1010$
$= 10110_2$ (with a carry on the final bit) **Subtraction:** $1100_2 - 1010_2$
$1100$
$- 1010$
$= 0010_2$

### 2. 1's Complement Addition
Add $+6$ and $-2$ using $8$-bit 1's complement strings. $+6 = 00000110_2$ $-2 = 11111101_2$ Add them: $00000110_2 + 11111101_2 = 1 00000011_2$ (carry out is $1$) End-around carry (add $1$ to result): $00000011_2 + 1_2 = 00000100_2$ Result: $00000100_2 = +4_{10}$

### 3. 2's Complement Addition
Add $-6$ and $-2$ using $8$-bit 2's complement strings. $-6 = 11111010_2$ $-2 = 11111110_2$ Add them: $11111010_2 + 11111110_2 = 1 11111000_2$ (carry out is $1$) Discard the final carry out: $11111000_2$ Result: $11111000_2 = -8_{10}$

### 4. 2's Complement Subtraction
Perform $(+2) - (+6)$ using $8$-bit 2's complement strings. Equivalent to $(+2) + (-6)$. $+2 = 00000010_2$ $+6 = 00000110_2 \implies -6 = 11111010_2$ (Invert bits and add $1$) Add them: $00000010_2 + 11111010_2 = 11111100_2$ Result is negative. Invert and add $1$ to check value: $00000011_2 + 1 = 00000100_2 = 4$. So, $-4_{10}$.

## Multiple Choice Questions

1. In binary arithmetic, what is the result of adding 1 and 1?
    - **A)** 1 with no carry
    - **B)** 0 with a carry of 1
    - **C)** 2 with no carry
    - **D)** 1 with a carry of 1

2. How is subtraction (A - B) universally handled in binary logic?
    - **A)** By negating A and performing addition: (-A) + B
    - **B)** By performing standard decimal subtraction and converting the result.
    - **C)** By negating the subtrahend (B) and performing addition: A + (-B).
    - **D)** Subtraction is processed using specialized subtraction gates independent of addition.

3. When performing 1's complement addition, what must be done if there is a final carry-out bit beyond the most significant bit?
    - **A)** Discard it completely.
    - **B)** Add 1 back into the intermediate result (end-around carry).
    - **C)** Subtract 1 from the intermediate result.
    - **D)** The operation results in an overflow error.

4. In binary subtraction, what is the result of subtracting 1 from 0 (0 - 1)?
    - **A)** 0 with a borrow of 1
    - **B)** 1 with no borrow
    - **C)** 1 with a borrow of 1
    - **D)** 0 with no borrow

5. What is the correct protocol for a final carry-out bit in 2's complement addition?
    - **A)** Add it back into the intermediate result.
    - **B)** Store it in a secondary register for later operations.
    - **C)** Simply discard it.
    - **D)** Invert the entire resulting bit string.

6. To calculate 1's complement representation, how is a positive number converted to a negative number?
    - **A)** By inverting all the bits and adding 1.
    - **B)** By inverting all the bits (changing 0s to 1s and 1s to 0s).
    - **C)** By keeping the bits identical and only changing the sign bit.
    - **D)** By shifting all bits one position to the left.

7. What is the sum of 1100 and 1010 in basic binary addition?
    - **A)** 10101
    - **B)** 11110
    - **C)** 10110
    - **D)** 11010

8. When an arithmetic operation must be performed on signed integer data, what requirement must be met for the operands?
    - **A)** They must be converted to hexadecimal format.
    - **B)** They must be normalized into floating-point representation.
    - **C)** They must be converted to the same base (binary).
    - **D)** They must be strictly positive values.

9. In a 2's complement subtraction resulting in a negative value, how can the magnitude of the result be checked?
    - **A)** By performing an end-around carry.
    - **B)** By stripping the sign bit and treating the rest as positive.
    - **C)** By performing a logical shift right.
    - **D)** By inverting the bits and adding 1.

10. What distinguishes 1's complement arithmetic from 2's complement arithmetic during addition?
    - **A)** 1's complement requires floating-point hardware.
    - **B)** 1's complement handles the final carry-out bit via an end-around carry, while 2's complement discards it.
    - **C)** 2's complement can only process positive integers.
    - **D)** 1's complement addition does not support subtraction operations.

### Answer Key & Explanations

1. **B**. The binary addition rule states that 1 + 1 = 0 with a carry of 1.
2. **C**. The note states that subtraction is universally handled by negating the subtrahend (complementing it) and then performing addition: A + (-B).
3. **B**. In 1's complement addition, a final carry-out bit is added back into the intermediate result, known as an end-around carry.
4. **C**. The binary subtraction rule states that 0 - 1 = 1 with a borrow of 1 (equivalent to borrowing 2 from the next higher column).
5. **C**. In 2's complement addition, if there is a final carry-out bit, it is simply discarded.
6. **B**. 1's complement is formed by inverting bits.
7. **C**. As shown in the worked example: 1100 + 1010 = 10110.
8. **C**. The overview explicitly states that for arithmetic operations to be performed, all operands must be converted to the same base (binary).
9. **D**. To check the value of a negative 2's complement result, you invert the bits and add 1.
10. **B**. The core difference highlighted in the text is how the final carry-out bit is handled: end-around carry for 1's complement vs. discarding it for 2's complement.

## References & Navigation

- **Previous Topic:** [[Data Representation - Characters and Boolean]]
- **Next Topic:** [[Computer Hardware Components - CPU and Motherboard]]
- **Related Notes:** [[Binary Addition, Subtraction & Carry Lookahead Adders]], [[Complements]]
