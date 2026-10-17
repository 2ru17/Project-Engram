---
id: 60_data_representation__characters_and_boolean
type: note
course: CCICOMP
topic: "6.0 Data Representation - Characters and Boolean"
status: completed
---

# 6.0 Data Representation - Characters and Boolean

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CCICOMP]] #[[Problem Solving]] #[[M2]]

---

## Overview

> Since computers process only bits, character and boolean data cannot be represented directly. Characters are represented indirectly by mapping them to numeric values via standard coding tables, balancing compactness with representational range. Standard methods include ASCII and Unicode. Boolean data, consisting solely of true or false values, conceptually requires only a single bit, but CPU designers often use integer formats where $0$ corresponds to false and any non-zero value corresponds to true. Operations on booleans rely on logic gates, extending naturally to bitwise operations that manipulate entire bit strings simultaneously.

## Key Definitions

### Character Encodings **ASCII (American Standard Code for Information Interchange):** A standard $7$-bit (or $8$-bit) encoding format supporting at least $128$ characters, commonly used in early and modern systems for English and basic symbols. **Unicode:** A newer $16$-bit or $32$-bit encoding standard designed to support a vast array of international characters. ASCII is a subset of Unicode. **Strings:** Complex data types composed of sequential series of character codes. **Device Control Codes:** Non-printable characters (e.g., Carriage Return `CR`, Line Feed `LF`) used for formatting text when communicating with output devices.

### Boolean Operations & Logic Gates **NOT (Inverter):** $Y = A'$. Negates the input. Output is $1$ if input is $0$, and vice-versa. **AND:** $Y = AB$. Outputs true ($1$) only if **all** inputs are true. **OR:** $Y = A + B$. Outputs true ($1$) if **at least one** input is true. **XOR (Exclusive-OR):** $Y = A \oplus B$ or $Y = A'B + AB'$. Outputs true ($1$) if the inputs differ (an odd number of $1$s).

## Worked Examples

### 1. ASCII String Interpretation
Given the hexadecimal value $434349434\text{F}4\text{D}50$, what is the ASCII interpretation?
By parsing every two hex digits: $43\text{h} \to \text{'C'}$ $43\text{h} \to \text{'C'}$ $49\text{h} \to \text{'I'}$ $43\text{h} \to \text{'C'}$ $4\text{F}\text{h} \to \text{'O'}$ $4\text{D}\text{h} \to \text{'M'}$ $50\text{h} \to \text{'P'}$
Result: `"CCICOMP"`

### 2. Bitwise Logic Operations **Bitwise NOT:** $\text{NOT } \text{F}3\text{h} \implies \text{NOT } 11110011_2 = 00001100_2 = 0\text{C}\text{h}$ **Bitwise AND:** $23\text{h} \text{ AND } 01\text{h}$ (Masking to check if a number is odd)
$23\text{h} = 00100011_2$
$01\text{h} = 00000001_2$
Result: $00000001_2 \implies$ Odd (true) **Bitwise OR:** $11110011_2 \text{ OR } 10000101_2 = 11110111_2$ **Bitwise XOR:** $11110011_2 \text{ XOR } 10000101_2 = 01110110_2$

### 3. Boolean Functions
A single-bit adder can be described by boolean functions: **Sum:** $Y = A'B + AB'$ ($A \text{ XOR } B$) **Carry:** $C = AB$ ($A \text{ AND } B$)

## Multiple Choice Questions

1. Because computers process only bits, how are character data types represented internally?
- **A)** They are stored directly as pixel matrices.
- **B)** They are mapped to numeric values using standard coding tables.
- **C)** They are converted into floating-point integers.
- **D)** They are compressed into single-bit Boolean flags.

2. Which standard is a 7-bit or 8-bit encoding format commonly used in early systems for English and basic symbols?
- **A)** Unicode
- **B)** BCD (Binary-Coded Decimal)
- **C)** ASCII
- **D)** EBCDIC

3. What is the primary advantage of the Unicode standard over ASCII?
- **A)** It uses less memory space (only 4 bits per character).
- **B)** It is exclusively designed for device control codes.
- **C)** It supports a vast array of international characters using 16-bit or 32-bit formatting.
- **D)** It inherently performs bitwise logic operations faster.

4. In CPU logic design, how are Boolean true and false values typically represented when conceptualized as integer formats?
- **A)** 1 corresponds to false, and 0 corresponds to true.
- **B)** 0 corresponds to false, and any non-zero value corresponds to true.
- **C)** Negative numbers correspond to false, positive numbers to true.
- **D)** 0 corresponds to false, and exactly 255 corresponds to true.

5. Which logic gate outputs true (1) only if ALL of its inputs are true?
- **A)** NOT
- **B)** OR
- **C)** XOR
- **D)** AND

6. What is the function of an XOR (Exclusive-OR) logic gate?
- **A)** It outputs true if at least one input is true.
- **B)** It negates the given input.
- **C)** It outputs true if the inputs differ (an odd number of 1s).
- **D)** It outputs true only if all inputs are false.

7. Non-printable characters like Carriage Return and Line Feed are examples of:
- **A)** Bitwise masks
- **B)** Device Control Codes
- **C)** Boolean operators
- **D)** Floating-point extensions

8. What is the result of performing a Bitwise NOT on the binary value 11110011?
- **A)** 11111111
- **B)** 00000000
- **C)** 00001100
- **D)** 10000101

9. Which logic gate operation is equivalent to the Boolean sum function Y = A'B + AB' in a single-bit adder?
- **A)** AND
- **B)** OR
- **C)** NOT
- **D)** XOR

10. When parsing the hexadecimal string 434349434F4D50, what type of data structure is being interpreted?
- **A)** A Boolean array
- **B)** A character string
- **C)** A 64-bit integer
- **D)** A single Unicode symbol

### Answer Key & Explanations
1. **B)** The note specifies that characters are represented indirectly by mapping them to numeric values via standard coding tables.
2. **C)** ASCII is defined as a standard 7-bit (or 8-bit) encoding format supporting at least 128 characters, common for English.
3. **C)** Unicode is described as a newer 16-bit or 32-bit standard designed to support a vast array of international characters.
4. **B)** CPU designers often use integer formats where 0 corresponds to false and any non-zero value corresponds to true.
5. **D)** The AND gate outputs true (1) only if all inputs are true.
6. **C)** The XOR gate outputs true (1) if the inputs differ (meaning there is an odd number of 1s).
7. **B)** Device Control Codes are defined as non-printable characters used for formatting text when communicating with output devices.
8. **C)** A Bitwise NOT inverts all bits, transforming 11110011 into 00001100.
9. **D)** The Sum function in a single-bit adder corresponds explicitly to the XOR operation.
10. **B)** The worked example demonstrates interpreting this exact hexadecimal string as the ASCII character string CCICOMP.

## References & Navigation

- **Previous Topic:** [[Data Representation - Real Numbers]]
- **Next Topic:** [[Arithmetic Operations in Binary]]
- **Related Notes:** [[Data Representation - Integers]], [[Boolean Algebra]]
