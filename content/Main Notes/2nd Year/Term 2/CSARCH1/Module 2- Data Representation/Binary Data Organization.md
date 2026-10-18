---
id: binary_data_organization
type: note
course: CSARCH1
topic: Binary Data Organization
status: completed
---


**Tags:** #[[Computer Science]] #[[CSARCH1]] #[[Computer Architecture]] #[[Data Representation]] #[[Binary Data Organization]]

---

# Binary Data Organization

## Overview
This module explains the different levels of binary data organization and the difference between Little Endian and Big Endian byte ordering.

## Binary Data Units
| Organization | Number of bits | Usage / Notes |
|--------------|----------------|---------------|
| **Bit**      | 1 bit (0 or 1) | Basic unit (binary digit). Abbreviated as `b`. |
| **Crumb**    | 2 bits         | Largely defunct term, rarely used. |
| **Nibble**   | 4 bits         | Represents a Hex digit or BCD digit. |
| **Byte**     | 8 bits         | Smallest addressable data unit. Abbreviated as `B`. |
| **Half word**| 16 bits        | Definition is architecture-dependent. |
| **Word**     | 32 bits        | In 32-bit architecture, 1 word = 32 bits. |
| **Double word**| 64 bits      | |
| **Quad word**| 128 bits       | |

## Significant Bits and Bytes
- **Most Significant Bit (MSb)**: The bit with the highest positional value (e.g., bit 7 in a byte).
- **Least Significant Bit (LSb)**: The bit with the lowest positional value (e.g., bit 0 in a byte).
- *Note:* Computer architecture convention dictates that numbering starts at 0.
- Concepts of significance extend to nibbles, bytes, and words (e.g., LSB for Least Significant Byte, MSB for Most Significant Byte).
  - **Example**: In the hex number `123ACAFE16`:
    - `FE16` is the Least Significant Byte (LSB).
    - `1216` is the Most Significant Byte (MSB).

## Endianness
Endianness refers to the convention used to interpret the byte ordering of multi-byte data stored in computer memory.
- Coined by Danny Cohen, based on Jonathan Swift's "Gulliver's Travels".

### Little Endian
- Stores the least-significant byte at the lowest memory address, followed by other bytes in ascending order of significance.
- The address of the multi-byte data is the address of its least-significant byte.
- **Example**: Storing 32-bit hex data `55443322` starting at address `0000`:
  - `0000`: 22
  - `0001`: 33
  - `0002`: 44
  - `0003`: 55

### Big Endian
- Stores the most-significant byte at the lowest memory address, followed by other bytes in ascending order of significance.
- The address of the multi-byte data is the address of its most-significant byte.
- **Example**: Storing 32-bit hex data `22334455` starting at address `0000`:
  - `0000`: 22
  - `0001`: 33
  - `0002`: 44
  - `0003`: 55

## Multiple Choice Questions

1. What is the smallest addressable data unit in most computer architectures?
    - **A)** Bit
    - **B)** Nibble
    - **C)** Byte
    - **D)** Word

2. How many bits are contained in a "Nibble"?
    - **A)** 2 bits
    - **B)** 4 bits
    - **C)** 8 bits
    - **D)** 16 bits

3. In a standard byte, which bit is considered the most significant bit (MSb)?
    - **A)** Bit 0
    - **B)** Bit 1
    - **C)** Bit 7
    - **D)** Bit 8

4. What does the term "Endianness" refer to in computer architecture?
    - **A)** The physical location of the memory chip
    - **B)** The convention used to interpret the byte ordering of multi-byte data
    - **C)** The maximum size of a data word
    - **D)** The speed at which memory can be accessed

5. In a Little Endian system, where is the least-significant byte stored?
    - **A)** At the highest memory byte address
    - **B)** At the lowest memory byte address
    - **C)** In the middle of the memory block
    - **D)** In the cache exclusively

6. If the 32-bit hex data 55443322 is stored at address 0000 in a Little Endian system, what is the content of address 0001?
    - **A)** 55
    - **B)** 44
    - **C)** 33
    - **D)** 22

7. For the hexadecimal number 123ACAFE16, what is the most significant byte (MSB)?
    - **A)** FE16
    - **B)** 1216
    - **C)** 1616
    - **D)** CA16

8. Who coined the terms Big Endian and Little Endian based on a novel by Jonathan Swift?
    - **A)** Alan Turing
    - **B)** John von Neumann
    - **C)** Danny Cohen
    - **D)** Grace Hopper

9. If address 0000 contains 22, 0001 contains 33, 0002 contains 44, and 0003 contains 55, what is the 32-bit data read in a Big Endian system?
    - **A)** 55443322
    - **B)** 22334455
    - **C)** 33225544
    - **D)** 44552233

10. In computer architecture conventions, what number does bit indexing typically start at?
    - **A)** 0
    - **B)** 1
    - **C)** -1
    - **D)** 8

### Answer Key & Explanations

1. **C**. The byte (8 bits) is the smallest addressable data unit.
2. **B**. A nibble is officially defined as exactly 4 bits.
3. **C**. Assuming a 0-indexed 8-bit byte, bit 7 represents the most significant bit.
4. **B**. Endianness dictates whether multi-byte stored data puts the most or least significant byte at the lowest address.
5. **B**. Little Endian stores the least significant byte at the lowest memory address.
6. **C**. In Little Endian, 22 is at 0000, 33 is at 0001, 44 is at 0002, and 55 is at 0003.
7. **B**. In a standard representation, the leftmost byte is the most significant, which is 12.
8. **C**. Danny Cohen coined the terms based on Swift's "Gulliver's Travels".
9. **B**. Big Endian reads the lowest address as the most significant byte, resulting in 22334455.
10. **A**. Standard convention begins indexing positions at 0 rather than 1.

## References & Navigation

- **Previous Topic:** [[2x vs 10y Ambiguity-1]]
- **Next Topic:** [[Binary Codes for Decimal Digits]]
