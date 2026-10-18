---
id: problem_set_binary_data_organization
type: problem_set
course: CSARCH2
topic: "Binary Data Organization"
status: completed
---

# Problem Set: Binary Data Organization

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Problem Sets]] #[[Binary Organization]] #[[Endianness]] #[[Memory Architecture]] #[[Data Units]]

---

## Overview

In modern computer systems, memory is organized as a linear array of **byte-addressable** storage cells. To manage information efficiently, processor architectures define standardized data units—ranging from individual bits to multi-byte words—and conventions for ordering these units in physical memory.

This problem set explores three core architectural topics:
1. **Byte Ordering / Endianness:** How multi-byte words are stored across sequential byte addresses in **Little-Endian** vs. **Big-Endian** architectures.
2. **Significance Hierarchies:** Identifying the **Most Significant (MS)** and **Least Significant (LS)** components across bits, nibbles, bytes, and words.
3. **Storage Prefixes ($2^x \text{ vs. } 10^y$):** Quantifying data capacity differences between decimal SI units ($\text{GB}$) and binary IEC units ($\text{GiB}$).

---

## Theoretical Foundations

### 1. Data Unit Hierarchy

| Unit | Symbol / Abbreviation | Size in Bits | Size in Bytes | Hexadecimal Representation |
| :--- | :---: | :---: | :---: | :---: |
| **Bit** | $\text{b}$ | $1\text{ bit}$ | $1/8\text{ byte}$ | Single binary digit ($0$ or $1$) |
| **Nibble** | — | $4\text{ bits}$ | $0.5\text{ byte}$ | $1\text{ hex digit}$ ($0-\text{F}$) |
| **Byte** | $\text{B}$ | $8\text{ bits}$ | $1\text{ byte}$ | $2\text{ hex digits}$ ($00-\text{FF}$) |
| **Halfword** (typical) | $\text{H}$ | $16\text{ bits}$ | $2\text{ bytes}$ | $4\text{ hex digits}$ |
| **Word** (standard 32-bit architecture) | $\text{W}$ | $32\text{ bits}$ | $4\text{ bytes}$ | $8\text{ hex digits}$ |
| **Doubleword / Quadword** | $\text{D / Q}$ | $64\text{ bits}$ | $8\text{ bytes}$ | $16\text{ hex digits}$ |

*Note on Architecture Terminology:* While x86 legacy terminology originally defined a "word" as 16 bits, modern 32-bit architectures (and the explicit assumption in this problem set) define a **word as 32 bits** (4 bytes).

---

### 2. Byte Ordering (Endianness)

When a numeric datum spanning $k$ bytes with value $V = \sum_{i=0}^{k-1} B_i \cdot 256^i$ (where $B_0$ is the Least Significant Byte and $B_{k-1}$ is the Most Significant Byte) is stored starting at base memory address $A$:

```text
Value: [ B_{k-1} (MSB) ] ... [ B_2 ] [ B_1 ] [ B_0 (LSB) ]
```

- **Little-Endian (LE):** The **Least Significant Byte (LSB)** is stored at the lowest memory address ($A$). Successive bytes of increasing significance are stored at increasing addresses:
  $$\text{Address}(A + i) = B_i \quad \text{for } i = 0, 1, \dots, k-1$$
  $$\text{Value}_{\text{LE}} = \sum_{i=0}^{k-1} \text{Memory}[A + i] \cdot 256^i$$
  *(Common in x86, x86-64, RISC-V default).*

- **Big-Endian (BE):** The **Most Significant Byte (MSB)** is stored at the lowest memory address ($A$). Successive bytes of decreasing significance are stored at increasing addresses:
  $$\text{Address}(A + i) = B_{k-1 - i} \quad \text{for } i = 0, 1, \dots, k-1$$
  $$\text{Value}_{\text{BE}} = \sum_{i=0}^{k-1} \text{Memory}[A + i] \cdot 256^{k - 1 - i}$$
  *(Common in IBM z/Architecture, network protocols / TCP/IP "network byte order", Motorola 68k).*

---

### 3. Metric (SI) vs. Binary (IEC) Prefixes

- **Decimal SI Prefixes ($10^y$):** Standardized by the International System of Units (SI).
  $$1\text{ Kilobyte (KB)} = 10^3\text{ B} = 1{,}000\text{ B}$$
  $$1\text{ Megabyte (MB)} = 10^6\text{ B} = 1{,}000{,}000\text{ B}$$
  $$1\text{ Gigabyte (GB)} = 10^9\text{ B} = 1{,}000{,}000{,}000\text{ B}$$
  $$1\text{ Terabyte (TB)} = 10^{12}\text{ B} = 1{,}000{,}000{,}000{,}000\text{ B}$$

- **Binary IEC Prefixes ($2^x$):** Standardized by the International Electrotechnical Commission (IEC 60027-2).
  $$1\text{ Kibibyte (KiB)} = 2^{10}\text{ B} = 1{,}024\text{ B}$$
  $$1\text{ Mebibyte (MiB)} = 2^{20}\text{ B} = 1{,}048{,}576\text{ B}$$
  $$1\text{ Gibibyte (GiB)} = 2^{30}\text{ B} = 1{,}073{,}741{,}824\text{ B}$$
  $$1\text{ Tebibyte (TiB)} = 2^{40}\text{ B} = 1{,}099{,}511{,}627{,}776\text{ B}$$

---

## Detailed Step-by-Step Problem Solutions

### Reference Memory Map for Problems 1 & 2

The table below describes the physical byte contents of memory from address `0x0000` to `0x000B`:

| Address (Hex) | Address (Dec) | Data Byte (Hex) | Binary Byte |
| :---: | :---: | :---: | :---: |
| `0x000B` | $11$ | `0x89` | `1000 1001` |
| `0x000A` | $10$ | `0x67` | `0110 0111` |
| `0x0009` | $9$ | `0x45` | `0100 0101` |
| `0x0008` | $8$ | `0x23` | `0010 0011` |
| `0x0007` | $7$ | `0xF1` | `1111 0001` |
| `0x0006` | $6$ | `0xDE` | `1101 1110` |
| `0x0005` | $5$ | `0xBC` | `1011 1100` |
| `0x0004` | $4$ | `0x9A` | `1001 1010` |
| `0x0003` | $3$ | `0x78` | `0111 1000` |
| `0x0002` | $2$ | `0x56` | `0101 0110` |
| `0x0001` | $1$ | `0x34` | `0011 0100` |
| `0x0000` | $0$ | `0x12` | `0001 0010` |

---

### Problem 1: Little Endian Data Reconstruction

In **Little Endian**, the byte at base address $A$ is the **Least Significant Byte (LSB)**, and subsequent addresses contain higher-significance bytes.

#### 1.a) 2-Byte (Halfword) Data at Address `0x0A`
- **Given:**
  - Base Address $A = \text{0x000A}$
  - Size $k = 2\text{ bytes}$ (spans addresses $\text{0x000A}$ and $\text{0x000B}$)
- **Address-to-Significance Mapping:**
  $$\begin{aligned}
  \text{Byte 0 (LSB, } \text{weight } 256^0\text{)} &\to \text{Memory}[\text{0x000A}] = \text{0x67} \\
  \text{Byte 1 (MSB, } \text{weight } 256^1\text{)} &\to \text{Memory}[\text{0x000B}] = \text{0x89}
  \end{aligned}$$
- **Reconstruction:**
  $$\text{Value} = (\text{Byte 1} \ll 8) + \text{Byte 0} = (\text{0x89} \times 256) + \text{0x67} = \mathbf{\text{0x8967}}$$

$$\mathbf{\text{Answer: 0x8967}}$$

---

#### 1.b) 4-Byte (Word) Data at Address `4` (`0x0004`)
- **Given:**
  - Base Address $A = \text{0x0004}$
  - Size $k = 4\text{ bytes}$ (spans addresses $\text{0x0004}, \text{0x0005}, \text{0x0006}, \text{0x0007}$)
- **Address-to-Significance Mapping:**
  $$\begin{aligned}
  \text{Byte 0 (LSB, } \text{weight } 256^0\text{)} &\to \text{Memory}[\text{0x0004}] = \text{0x9A} \\
  \text{Byte 1 (weight } 256^1\text{)} &\to \text{Memory}[\text{0x0005}] = \text{0xBC} \\
  \text{Byte 2 (weight } 256^2\text{)} &\to \text{Memory}[\text{0x0006}] = \text{0xDE} \\
  \text{Byte 3 (MSB, } \text{weight } 256^3\text{)} &\to \text{Memory}[\text{0x0007}] = \text{0xF1}
  \end{aligned}$$
- **Reconstruction:**
  $$\begin{aligned}
  \text{Value} &= (\text{Byte 3} \ll 24) + (\text{Byte 2} \ll 16) + (\text{Byte 1} \ll 8) + \text{Byte 0} \\
  &= (\text{0xF1} \times 2^{24}) + (\text{0xDE} \times 2^{16}) + (\text{0xBC} \times 2^8) + \text{0x9A} \\
  &= \mathbf{\text{0xF1DEBC9A}}
  \end{aligned}$$

$$\mathbf{\text{Answer: 0xF1DEBC9A}}$$

---

### Problem 2: Big Endian Data Reconstruction

In **Big Endian**, the byte at base address $A$ is the **Most Significant Byte (MSB)**, and bytes are read sequentially from left to right as written naturally.

#### 2.c) 4-Byte (Word) Data at Address `8` (`0x0008`)
- **Given:**
  - Base Address $A = \text{0x0008}$
  - Size $k = 4\text{ bytes}$ (spans addresses $\text{0x0008}, \text{0x0009}, \text{0x000A}, \text{0x000B}$)
- **Address-to-Significance Mapping:**
  $$\begin{aligned}
  \text{Byte 3 (MSB, } \text{weight } 256^3\text{)} &\to \text{Memory}[\text{0x0008}] = \text{0x23} \\
  \text{Byte 2 (weight } 256^2\text{)} &\to \text{Memory}[\text{0x0009}] = \text{0x45} \\
  \text{Byte 1 (weight } 256^1\text{)} &\to \text{Memory}[\text{0x000A}] = \text{0x67} \\
  \text{Byte 0 (LSB, } \text{weight } 256^0\text{)} &\to \text{Memory}[\text{0x000B}] = \text{0x89}
  \end{aligned}$$
- **Reconstruction:**
  $$\begin{aligned}
  \text{Value} &= (\text{Byte 3} \ll 24) + (\text{Byte 2} \ll 16) + (\text{Byte 1} \ll 8) + \text{Byte 0} \\
  &= \mathbf{\text{0x23456789}}
  \end{aligned}$$

$$\mathbf{\text{Answer: 0x23456789}}$$

---

#### 2.d) 8-Byte (Doubleword) Data at Address `0` (`0x0000`)
- **Given:**
  - Base Address $A = \text{0x0000}$
  - Size $k = 8\text{ bytes}$ (spans addresses $\text{0x0000}$ through $\text{0x0007}$)
- **Address-to-Significance Mapping:**
  $$\begin{aligned}
  \text{Byte 7 (MSB, } \text{weight } 256^7\text{)} &\to \text{Memory}[\text{0x0000}] = \text{0x12} \\
  \text{Byte 6 (weight } 256^6\text{)} &\to \text{Memory}[\text{0x0001}] = \text{0x34} \\
  \text{Byte 5 (weight } 256^5\text{)} &\to \text{Memory}[\text{0x0002}] = \text{0x56} \\
  \text{Byte 4 (weight } 256^4\text{)} &\to \text{Memory}[\text{0x0003}] = \text{0x78} \\
  \text{Byte 3 (weight } 256^3\text{)} &\to \text{Memory}[\text{0x0004}] = \text{0x9A} \\
  \text{Byte 2 (weight } 256^2\text{)} &\to \text{Memory}[\text{0x0005}] = \text{0xBC} \\
  \text{Byte 1 (weight } 256^1\text{)} &\to \text{Memory}[\text{0x0006}] = \text{0xDE} \\
  \text{Byte 0 (LSB, } \text{weight } 256^0\text{)} &\to \text{Memory}[\text{0x0007}] = \text{0xF1}
  \end{aligned}$$
- **Reconstruction:**
  $$\begin{aligned}
  \text{Value} &= \text{0x12} \cdot 256^7 + \text{0x34} \cdot 256^6 + \dots + \text{0xF1} \cdot 256^0 \\
  &= \mathbf{\text{0x123456789ABCDEF1}}
  \end{aligned}$$

$$\mathbf{\text{Answer: 0x123456789ABCDEF1}}$$

---

### Problem 3: Most / Least Significant Units

**Given Data:** $\text{0x58ABCDEF12345679}$
- Total size: $16\text{ hex digits} = 64\text{ bits} = 8\text{ bytes} = 2\text{ words}$ (where $1\text{ word} \equiv 32\text{ bits}$).

#### Complete Structural Breakdown of `0x58ABCDEF12345679`:

```text
Hex Digits:    5    8    A    B    C    D    E    F    1    2    3    4    5    6    7    9
Nibble Index: N15  N14  N13  N12  N11  N10  N9   N8   N7   N6   N5   N4   N3   N2   N1   N0
Byte Index:   [     Byte 7     ]  [     Byte 6     ]  [     Byte 5     ]  [     Byte 4     ]  [     Byte 3     ]  [     Byte 2     ]  [     Byte 1     ]  [     Byte 0     ]
Word Index:   [                   Word 1 (Most Significant Word)                   ]  [                   Word 0 (Least Significant Word)                  ]
```

Full binary representation:
$$\underbrace{0101}_{5} \; \underbrace{1000}_{8} \; \underbrace{1010}_{\text{A}} \; \underbrace{1011}_{\text{B}} \; \underbrace{1100}_{\text{C}} \; \underbrace{1101}_{\text{D}} \; \underbrace{1110}_{\text{E}} \; \underbrace{1111}_{\text{F}} \; \underbrace{0001}_{1} \; \underbrace{0010}_{2} \; \underbrace{0011}_{3} \; \underbrace{0100}_{4} \; \underbrace{0101}_{5} \; \underbrace{0110}_{6} \; \underbrace{0111}_{7} \; \underbrace{1001}_{9}$$

---

#### 3.a) Least Significant Bit (LSb)
- **Definition:** Bit index $b_0$ (the rightmost bit in the full binary string).
- **Calculation:** The least significant hex digit is $\text{0x9} = 1001_2$.
  The lowest bit ($b_0$) is $1$.
$$\mathbf{\text{Answer: } 1 \quad (\text{or } 1_2)}$$

#### 3.b) Most Significant Bit (MSb)
- **Definition:** Bit index $b_{63}$ (the leftmost bit in the full binary string).
- **Calculation:** The most significant hex digit is $\text{0x5} = 0101_2$.
  The highest bit ($b_{63}$) is $0$.
$$\mathbf{\text{Answer: } 0 \quad (\text{or } 0_2)}$$

#### 3.c) Least Significant Nibble (LSN)
- **Definition:** The rightmost $4\text{ bits}$ (Nibble $N_0$).
- **Calculation:** Corresponding to hex digit index $0$.
$$\mathbf{\text{Answer: 0x9} \quad (\text{or } 9_{16} = 1001_2)}$$

#### 3.d) Most Significant Nibble (MSN)
- **Definition:** The leftmost $4\text{ bits}$ (Nibble $N_{15}$).
- **Calculation:** Corresponding to hex digit index $15$.
$$\mathbf{\text{Answer: 0x5} \quad (\text{or } 5_{16} = 0101_2)}$$

#### 3.e) Least Significant Byte (LSB)
- **Definition:** The rightmost $8\text{ bits}$ / $2\text{ hex digits}$ (Byte $B_0$).
- **Calculation:** Formed by nibbles $N_1 N_0 = \text{0x79}$.
$$\mathbf{\text{Answer: 0x79} \quad (\text{or } 79_{16} = 01111001_2)}$$

#### 3.f) Most Significant Byte (MSB)
- **Definition:** The leftmost $8\text{ bits}$ / $2\text{ hex digits}$ (Byte $B_7$).
- **Calculation:** Formed by nibbles $N_{15} N_{14} = \text{0x58}$.
$$\mathbf{\text{Answer: 0x58} \quad (\text{or } 58_{16} = 01011000_2)}$$

#### 3.g) Least Significant Word (LSW)
- **Definition:** The rightmost $32\text{ bits}$ / $4\text{ bytes}$ / $8\text{ hex digits}$ (Word $W_0$).
- **Calculation:** Formed by bytes $B_3 B_2 B_1 B_0 = \text{0x12345679}$.
$$\mathbf{\text{Answer: 0x12345679}}$$

#### 3.h) Most Significant Word (MSW)
- **Definition:** The leftmost $32\text{ bits}$ / $4\text{ bytes}$ / $8\text{ hex digits}$ (Word $W_1$).
- **Calculation:** Formed by bytes $B_7 B_6 B_5 B_4 = \text{0x58ABCDEF}$.
$$\mathbf{\text{Answer: 0x58ABCDEF}}$$

---

### Problems 4 & 5: $2^x \text{ vs. } 10^y$ (Storage Prefixes)

#### Problem 4: 2 Gigabytes (GB)

- **SI Standard (Decimal Prefix $10^9$):**
  $$\begin{aligned}
  \text{Prefix Definition:} \quad 1\text{ Giga (G)} &= 10^9 = 1{,}000{,}000{,}000 \\
  \text{Total Bytes:} \quad 2\text{ GB} &= 2 \times 10^9\text{ bytes} = \mathbf{2{,}000{,}000{,}000\text{ bytes}} \\
  \text{Total Bits:} \quad 2{,}000{,}000{,}000 \times 8\text{ bits} &= 16 \times 10^9\text{ bits} = \mathbf{16{,}000{,}000{,}000\text{ bits}} \\
  &= 1.6 \times 10^{10}\text{ bits} \quad (16\text{ Gbits})
  \end{aligned}$$

- **Comparative Context (Legacy JEDEC Convention):**
  *Historically, operating systems and memory manufacturers sometimes used "GB" to mean $2^{30}\text{ bytes}$. Under JEDEC:*
  $$2\text{ GB}_{\text{JEDEC}} = 2 \times 2^{30}\text{ B} = 2{,}147{,}483{,}648\text{ bytes}, \quad 17{,}179{,}869{,}184\text{ bits}$$

---

#### Problem 5: 2 Gibibytes (GiB)

- **IEC Standard (Binary Prefix $2^{30}$):**
  $$\begin{aligned}
  \text{Prefix Definition:} \quad 1\text{ Gibi (Gi)} &= 2^{30} = 1{,}073{,}741{,}824 \\
  \text{Total Bytes:} \quad 2\text{ GiB} &= 2 \times 2^{30}\text{ bytes} = 2^{31}\text{ bytes} \\
  &= \mathbf{2{,}147{,}483{,}648\text{ bytes}} \\
  \text{Total Bits:} \quad 2^{31}\text{ bytes} \times 8\text{ bits/byte} &= 2^{31} \times 2^3\text{ bits} = 2^{34}\text{ bits} \\
  &= \mathbf{17{,}179{,}869{,}184\text{ bits}} \quad (16\text{ Gibits})
  \end{aligned}$$

---

### Prefix Comparison Summary Table

| Metric | 2 Gigabytes (GB, SI) | 2 Gibibytes (GiB, IEC) | Absolute Difference | Percentage Difference |
| :--- | :---: | :---: | :---: | :---: |
| **Base Formula (Bytes)** | $2 \times 10^9\text{ B}$ | $2 \times 2^{30}\text{ B} = 2^{31}\text{ B}$ | $2^{31} - 2\cdot 10^9$ | — |
| **Exact Bytes** | $\mathbf{2{,}000{,}000{,}000\text{ B}}$ | $\mathbf{2{,}147{,}483{,}648\text{ B}}$ | $+147{,}483{,}648\text{ B}$ | $\approx +7.374\%$ |
| **Base Formula (Bits)** | $16 \times 10^9\text{ b}$ | $2^{34}\text{ b}$ | $2^{34} - 16\cdot 10^9$ | — |
| **Exact Bits** | $\mathbf{16{,}000{,}000{,}000\text{ b}}$ | $\mathbf{17{,}179{,}869{,}184\text{ b}}$ | $+1{,}179{,}869{,}184\text{ b}$ | $\approx +7.374\%$ |

---

## Key Takeaways & Exam Summary

1. **Endianness Rapid Evaluation:**
   - In **Little Endian**, memory address $A$ holds the lowest byte ($B_0$). Read memory *backwards* (from high address down to low address) to write out the hexadecimal value in standard human notation.
   - In **Big Endian**, memory address $A$ holds the highest byte ($B_{\text{MSB}}$). Read memory *forwards* (from low address up to high address) directly as written in standard human notation.

2. **Significance Hierarchy:**
   - **Bit:** $1$ binary digit.
   - **Nibble:** $1$ hex digit ($4$ bits).
   - **Byte:** $2$ hex digits ($8$ bits).
   - **Word (32-bit):** $8$ hex digits ($4$ bytes / $32$ bits).
   - **LS** units are always on the rightmost end; **MS** units are always on the leftmost end.

3. **Storage Discrepancy:**
   - As capacity scales from kilo- to tera-, the gap between SI ($10^{3k}$) and IEC ($2^{10k}$) expands:
     - Kilo vs. Kibi: $\approx 2.4\%$ difference
     - Mega vs. Mebi: $\approx 4.86\%$ difference
     - Giga vs. Gibi: $\approx 7.37\%$ difference
     - Tera vs. Tebi: $\approx 9.95\%$ difference
   - This difference explains why a hard drive advertised as $2\text{ TB}$ ($2 \times 10^{12}\text{ B}$) appears as only $\approx 1.818\text{ TiB}$ in operating systems that measure in binary units.


## References & Navigation

- **Related Notes:** [[Integer Representation & Fixed-Point Arithmetic]]
