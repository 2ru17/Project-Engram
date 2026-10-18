---
id: problem_set_number_system_base_conversion
type: problem_set
course: CSARCH2
topic: "Number System Base Conversion"
status: completed
---

# Problem Set: Number System Base Conversion

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Problem Sets]] #[[Number Systems]] #[[Base Conversion]] #[[Data Representation]]

---

## Overview

In computer architecture, data is represented and manipulated across various **radix (base)** number systems. While digital hardware fundamentally executes operations in **Binary (Base 2)**, human engineers utilize higher-order power-of-two representations such as **Quaternary (Base 4)**, **Octal (Base 8)**, and **Hexadecimal (Base 16)** for compactness and direct bit-level mapping. Non-power-of-two systems such as **Decimal (Base 10)** and arbitrary radices like **Base-5 (Quinary)** require general positional algorithms for base conversion.

This problem set provides an exhaustive, mathematically rigorous treatment of base conversions covering integer and fractional parts, power-of-two direct grouping, polynomial expansions, repeated division/multiplication algorithms, and periodic rational representations.

---

## Theoretical Foundations & Conversion Algorithms

### 1. General Positional Number Representation
A real number $N$ represented in radix $b$ with $n$ integer digits and $m$ fractional digits has the value given by the **polynomial expansion**:

$$N_b = \sum_{i=0}^{n-1} d_i \cdot b^i + \sum_{j=1}^{m} d_{-j} \cdot b^{-j}$$

where $d_k \in \{0, 1, \dots, b-1\}$.

### 2. Base $b$ to Decimal (Base 10)
Evaluate the polynomial expansion directly using base-10 arithmetic:
$$\text{Decimal Value} = d_{n-1} b^{n-1} + \dots + d_1 b^1 + d_0 b^0 + d_{-1} b^{-1} + d_{-2} b^{-2} + \dots$$

### 3. Decimal (Base 10) to Target Base $b$
- **Integer Part ($I_{10}$):** Successive division by radix $b$. The remainders form the digits from least significant ($d_0$) to most significant ($d_{n-1}$):
  $$I_k = \lfloor I_{k-1} / b \rfloor, \quad d_k = I_{k-1} \pmod b$$
- **Fractional Part ($F_{10}$):** Successive multiplication by radix $b$. The integer parts extracted at each step form the digits from most significant fractional ($d_{-1}$) downward:
  $$d_{-j} = \lfloor F_{j-1} \cdot b \rfloor, \quad F_j = (F_{j-1} \cdot b) - d_{-j}$$

### 4. Power-of-Two Radix Grouping ($2^k \leftrightarrow 2^m$)
Because $4 = 2^2$, $8 = 2^3$, and $16 = 2^4$, conversion between binary and these bases does not require intermediate decimal arithmetic:
- **Binary $\leftrightarrow$ Quaternary (Base 4):** Group in clusters of **$2$ bits** starting from the radix point (left for integer, right for fraction, zero-padding as necessary).
- **Binary $\leftrightarrow$ Octal (Base 8):** Group in clusters of **$3$ bits** starting from the radix point.
- **Binary $\leftrightarrow$ Hexadecimal (Base 16):** Group in clusters of **$4$ bits** (nibbles) starting from the radix point.

---

## Master Base Conversion Summary Table

The table below presents the completed base conversion matrix for all problems:

| Row | Decimal ($b=10$) | Binary ($b=2$) | Quaternary ($b=4$) | Octal ($b=8$) | Hexadecimal ($b=16$) | Base-5 ($b=5$) |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **1** | $\mathbf{99.75}$ | $1100011.11_2$ | $1203.3_4$ | $143.6_8$ | $63.\text{C}_{16}$ | $344.\overline{3}_5$ |
| **2** | $53.625$ | $\mathbf{110101.101_2}$ | $311.22_4$ | $65.5_8$ | $35.\text{A}_{16}$ | $203.\overline{30}_5$ |
| **3** | $14.9375$ | $1110.1111_2$ | $\mathbf{32.33_4}$ | $16.74_8$ | $\text{E}.\text{F}_{16}$ | $24.\overline{4320}_5$ |
| **4** | $474.5625$ | $111011010.1001_2$ | $13122.21_4$ | $\mathbf{732.44_8}$ | $1\text{DA}.9_{16}$ | $3344.\overline{2401}_5$ |
| **5** | $2989.7890625$ | $101110101101.1100101_2$ | $232231.3022_4$ | $5655.624_8$ | $\mathbf{BAD.CA_{16}}$ | $43424.\overline{34330402232142411210313000442013}_5$ |
| **6** | $84.44$ | $1010100.\overline{01110000101000111101}_2$ | $1110.\overline{1300220331}_4$ | $124.\overline{34121727024365605075}_8$ | $54.\overline{70\text{A}3\text{D}}_{16}$ | $\mathbf{314.21_5}$ |

---

## Detailed Step-by-Step Problem Solutions

### Problem 1: Given Decimal $99.75_{10}$

We decompose $99.75_{10}$ into Integer Part $I = 99$ and Fractional Part $F = 0.75$.

#### 1.1 Decimal to Binary ($b=2$)
- **Integer Part ($99_{10}$):** Repeated division by $2$:
  $$\begin{aligned}
  99 \div 2 &= 49 \quad \text{R } 1 \quad (d_0) \\
  49 \div 2 &= 24 \quad \text{R } 1 \quad (d_1) \\
  24 \div 2 &= 12 \quad \text{R } 0 \quad (d_2) \\
  12 \div 2 &= 6 \quad \;\; \text{R } 0 \quad (d_3) \\
  6 \div 2 &= 3 \quad \;\; \text{R } 0 \quad (d_4) \\
  3 \div 2 &= 1 \quad \;\; \text{R } 1 \quad (d_5) \\
  1 \div 2 &= 0 \quad \;\; \text{R } 1 \quad (d_6)
  \end{aligned}$$
  Reading remainders from bottom to top: $99_{10} = 1100011_2$.

- **Fractional Part ($0.75_{10}$):** Repeated multiplication by $2$:
  $$\begin{aligned}
  0.75 \times 2 &= 1.50 \implies \text{Integer digit } 1 \quad (d_{-1}), \quad \text{Fractional remainder } 0.50 \\
  0.50 \times 2 &= 1.00 \implies \text{Integer digit } 1 \quad (d_{-2}), \quad \text{Fractional remainder } 0.00
  \end{aligned}$$
  Thus, $0.75_{10} = 0.11_2$.

- **Combined Result:**
  $$\mathbf{99.75_{10} = 1100011.11_2}$$

#### 1.2 Binary to Quaternary ($b=4$)
Group the binary digits into 2-bit blocks relative to the radix point:
$$\underbrace{01}_{1} \;\; \underbrace{10}_{2} \;\; \underbrace{00}_{0} \;\; \underbrace{11}_{3} \; . \; \underbrace{11}_{3}$$
$$\mathbf{99.75_{10} = 1203.3_4}$$
*Verification via powers of 4:*
$$1(4^3) + 2(4^2) + 0(4^1) + 3(4^0) + 3(4^{-1}) = 64 + 32 + 0 + 3 + 0.75 = 99.75_{10} \quad \checkmark$$

#### 1.3 Binary to Octal ($b=8$)
Group the binary digits into 3-bit blocks relative to the radix point (pad with leading/trailing zeros):
$$\underbrace{001}_{1} \;\; \underbrace{100}_{4} \;\; \underbrace{011}_{3} \; . \; \underbrace{110}_{6}$$
$$\mathbf{99.75_{10} = 143.6_8}$$
*Verification via powers of 8:*
$$1(8^2) + 4(8^1) + 3(8^0) + 6(8^{-1}) = 64 + 32 + 3 + 0.75 = 99.75_{10} \quad \checkmark$$

#### 1.4 Binary to Hexadecimal ($b=16$)
Group the binary digits into 4-bit nibbles relative to the radix point:
$$\underbrace{0110}_{6} \;\; \underbrace{0011}_{3} \; . \; \underbrace{1100}_{\text{C}}$$
$$\mathbf{99.75_{10} = 63.\text{C}_{16}}$$
*Verification via powers of 16:*
$$6(16^1) + 3(16^0) + 12(16^{-1}) = 96 + 3 + 0.75 = 99.75_{10} \quad \checkmark$$

#### 1.5 Decimal to Base-5 ($b=5$)
- **Integer Part ($99_{10}$):** Repeated division by $5$:
  $$\begin{aligned}
  99 \div 5 &= 19 \quad \text{R } 4 \quad (d_0) \\
  19 \div 5 &= 3 \quad \;\; \text{R } 4 \quad (d_1) \\
  3 \div 5 &= 0 \quad \;\; \text{R } 3 \quad (d_2)
  \end{aligned}$$
  Reading bottom to top: $99_{10} = 344_5$.

- **Fractional Part ($0.75_{10}$):** Repeated multiplication by $5$:
  $$\begin{aligned}
  0.75 \times 5 &= 3.75 \implies \text{digit } 3, \quad \text{fraction } 0.75 \\
  0.75 \times 5 &= 3.75 \implies \text{digit } 3, \quad \text{fraction } 0.75 \quad (\text{repeats indefinitely})
  \end{aligned}$$
  The fraction is strictly periodic: $0.75_{10} = 0.\overline{3}_5$.
  *Analytic Verification via Infinite Geometric Series:*
  $$\sum_{k=1}^{\infty} 3 \cdot 5^{-k} = 3 \cdot \frac{5^{-1}}{1 - 5^{-1}} = 3 \cdot \frac{1/5}{4/5} = \frac{3}{4} = 0.75_{10} \quad \checkmark$$

- **Combined Result:**
  $$\mathbf{99.75_{10} = 344.\overline{3}_5 \approx 344.3333_5}$$

---

### Problem 2: Given Binary $110101.101_2$

#### 2.1 Binary to Decimal ($b=10$)
Expand using positional notation:
$$\begin{aligned}
110101.101_2 &= 1(2^5) + 1(2^4) + 0(2^3) + 1(2^2) + 0(2^1) + 1(2^0) + 1(2^{-1}) + 0(2^{-2}) + 1(2^{-3}) \\
&= 32 + 16 + 0 + 4 + 0 + 1 + 0.5 + 0 + 0.125 \\
&= 53 + 0.625 = \mathbf{53.625_{10}} = 53\frac{5}{8}_{10}
\end{aligned}$$

#### 2.2 Binary to Quaternary ($b=4$)
Group in 2-bit pairs from the radix point:
$$\underbrace{11}_{3} \;\; \underbrace{01}_{1} \;\; \underbrace{01}_{1} \; . \; \underbrace{10}_{2} \;\; \underbrace{10}_{2}$$
$$\mathbf{110101.101_2 = 311.22_4}$$
*Verification:* $3(4^2) + 1(4^1) + 1(4^0) + 2(4^{-1}) + 2(4^{-2}) = 48 + 4 + 1 + 0.5 + 0.125 = 53.625_{10} \quad \checkmark$

#### 2.3 Binary to Octal ($b=8$)
Group in 3-bit triplets from the radix point:
$$\underbrace{110}_{6} \;\; \underbrace{101}_{5} \; . \; \underbrace{101}_{5}$$
$$\mathbf{110101.101_2 = 65.5_8}$$
*Verification:* $6(8^1) + 5(8^0) + 5(8^{-1}) = 48 + 5 + 0.625 = 53.625_{10} \quad \checkmark$

#### 2.4 Binary to Hexadecimal ($b=16$)
Group in 4-bit nibbles from the radix point:
$$\underbrace{0011}_{3} \;\; \underbrace{0101}_{5} \; . \; \underbrace{1010}_{\text{A}}$$
$$\mathbf{110101.101_2 = 35.\text{A}_{16}}$$
*Verification:* $3(16^1) + 5(16^0) + 10(16^{-1}) = 48 + 5 + 0.625 = 53.625_{10} \quad \checkmark$

#### 2.5 Decimal to Base-5 ($b=5$)
- **Integer Part ($53_{10}$):**
  $$\begin{aligned}
  53 \div 5 &= 10 \quad \text{R } 3 \quad (d_0) \\
  10 \div 5 &= 2 \quad \;\; \text{R } 0 \quad (d_1) \\
  2 \div 5 &= 0 \quad \;\; \text{R } 2 \quad (d_2)
  \end{aligned}$$
  Integer: $203_5$.

- **Fractional Part ($0.625_{10} = 5/8$):**
  $$\begin{aligned}
  0.625 \times 5 &= 3.125 \implies \text{digit } 3, \quad \text{fraction } 0.125 \\
  0.125 \times 5 &= 0.625 \implies \text{digit } 0, \quad \text{fraction } 0.625 \quad (\text{repeats cycle } 30)
  \end{aligned}$$
  Periodic cycle length is $2$: $0.625_{10} = 0.\overline{30}_5$.
  *Analytic Verification:*
  $$\frac{3 \cdot 5^{-1} + 0 \cdot 5^{-2}}{1 - 5^{-2}} = \frac{3/5}{24/25} = \frac{3}{5} \cdot \frac{25}{24} = \frac{75}{120} = \frac{5}{8} = 0.625_{10} \quad \checkmark$$

- **Combined Result:**
  $$\mathbf{110101.101_2 = 203.\overline{30}_5 \approx 203.3030_5}$$

---

### Problem 3: Given Quaternary $32.33_4$

#### 3.1 Quaternary to Decimal ($b=10$)
Expand using positional notation:
$$\begin{aligned}
32.33_4 &= 3(4^1) + 2(4^0) + 3(4^{-1}) + 3(4^{-2}) \\
&= 12 + 2 + \frac{3}{4} + \frac{3}{16} \\
&= 14 + 0.75 + 0.1875 = \mathbf{14.9375_{10}} = 14\frac{15}{16}_{10}
\end{aligned}$$

#### 3.2 Quaternary to Binary ($b=2$)
Directly replace each quaternary digit by its 2-bit binary equivalent:
$$3_4 = 11_2, \quad 2_4 = 10_2, \quad 3_4 = 11_2, \quad 3_4 = 11_2$$
$$\mathbf{32.33_4 = 1110.1111_2}$$

#### 3.3 Binary to Octal ($b=8$)
Regroup $1110.1111_2$ in 3-bit triplets:
$$\underbrace{001}_{1} \;\; \underbrace{110}_{6} \; . \; \underbrace{111}_{7} \;\; \underbrace{100}_{4}$$
$$\mathbf{32.33_4 = 16.74_8}$$
*Verification:* $1(8^1) + 6(8^0) + 7(8^{-1}) + 4(8^{-2}) = 8 + 6 + \frac{56+4}{64} = 14 + \frac{60}{64} = 14.9375_{10} \quad \checkmark$

#### 3.4 Binary to Hexadecimal ($b=16$)
Regroup $1110.1111_2$ in 4-bit nibbles:
$$\underbrace{1110}_{\text{E}} \; . \; \underbrace{1111}_{\text{F}}$$
$$\mathbf{32.33_4 = \text{E}.\text{F}_{16}}$$
*Verification:* $14(16^0) + 15(16^{-1}) = 14 + 0.9375 = 14.9375_{10} \quad \checkmark$

#### 3.5 Decimal to Base-5 ($b=5$)
- **Integer Part ($14_{10}$):**
  $$14 \div 5 = 2 \quad \text{R } 4, \quad 2 \div 5 = 0 \quad \text{R } 2 \implies 24_5$$

- **Fractional Part ($0.9375_{10} = 15/16$):**
  $$\begin{aligned}
  0.9375 \times 5 &= 4.6875 \implies \text{digit } 4, \quad \text{fraction } 0.6875 \\
  0.6875 \times 5 &= 3.4375 \implies \text{digit } 3, \quad \text{fraction } 0.4375 \\
  0.4375 \times 5 &= 2.1875 \implies \text{digit } 2, \quad \text{fraction } 0.1875 \\
  0.1875 \times 5 &= 0.9375 \implies \text{digit } 0, \quad \text{fraction } 0.9375 \quad (\text{repeats cycle } 4320)
  \end{aligned}$$
  Periodic cycle length is $4$: $0.9375_{10} = 0.\overline{4320}_5$.
  *Analytic Verification:*
  $$\frac{4(5^3) + 3(5^2) + 2(5^1) + 0(5^0)}{5^4 - 1} = \frac{500 + 75 + 10 + 0}{624} = \frac{585}{624} = \frac{15 \times 39}{16 \times 39} = \frac{15}{16} = 0.9375_{10} \quad \checkmark$$

- **Combined Result:**
  $$\mathbf{32.33_4 = 24.\overline{4320}_5 \approx 24.4320_5}$$

---

### Problem 4: Given Octal $732.44_8$

#### 4.1 Octal to Binary ($b=2$)
Expand each octal digit into its 3-bit binary equivalent:
$$7_8 = 111_2, \quad 3_8 = 011_2, \quad 2_8 = 010_2, \quad 4_8 = 100_2, \quad 4_8 = 100_2$$
$$\mathbf{732.44_8 = 111011010.1001_2} \quad (\text{or } 111011010.100100_2)$$

#### 4.2 Octal to Decimal ($b=10$)
Expand using positional notation:
$$\begin{aligned}
732.44_8 &= 7(8^2) + 3(8^1) + 2(8^0) + 4(8^{-1}) + 4(8^{-2}) \\
&= 7(64) + 24 + 2 + \frac{4}{8} + \frac{4}{64} \\
&= 448 + 26 + 0.5 + 0.0625 = \mathbf{474.5625_{10}} = 474\frac{9}{16}_{10}
\end{aligned}$$

#### 4.3 Binary to Quaternary ($b=4$)
Regroup binary $111011010.1001_2$ into 2-bit pairs:
$$\underbrace{01}_{1} \;\; \underbrace{11}_{3} \;\; \underbrace{01}_{1} \;\; \underbrace{10}_{2} \;\; \underbrace{10}_{2} \; . \; \underbrace{10}_{2} \;\; \underbrace{01}_{1}$$
$$\mathbf{732.44_8 = 13122.21_4}$$
*Verification:* $1(256) + 3(64) + 1(16) + 2(4) + 2(1) + 2(0.25) + 1(0.0625) = 474.5625_{10} \quad \checkmark$

#### 4.4 Binary to Hexadecimal ($b=16$)
Regroup binary $111011010.1001_2$ into 4-bit nibbles:
$$\underbrace{0001}_{1} \;\; \underbrace{1101}_{\text{D}} \;\; \underbrace{1010}_{\text{A}} \; . \; \underbrace{1001}_{9}$$
$$\mathbf{732.44_8 = 1\text{DA}.9_{16}}$$
*Verification:* $1(256) + 13(16) + 10(1) + 9(16^{-1}) = 256 + 208 + 10 + 0.5625 = 474.5625_{10} \quad \checkmark$

#### 4.5 Decimal to Base-5 ($b=5$)
- **Integer Part ($474_{10}$):**
  $$\begin{aligned}
  474 \div 5 &= 94 \quad \text{R } 4 \quad (d_0) \\
  94 \div 5 &= 18 \quad \text{R } 4 \quad (d_1) \\
  18 \div 5 &= 3 \quad \;\; \text{R } 3 \quad (d_2) \\
  3 \div 5 &= 0 \quad \;\; \text{R } 3 \quad (d_3)
  \end{aligned}$$
  Integer: $3344_5$.

- **Fractional Part ($0.5625_{10} = 9/16$):**
  $$\begin{aligned}
  0.5625 \times 5 &= 2.8125 \implies \text{digit } 2, \quad \text{fraction } 0.8125 \\
  0.8125 \times 5 &= 4.0625 \implies \text{digit } 4, \quad \text{fraction } 0.0625 \\
  0.0625 \times 5 &= 0.3125 \implies \text{digit } 0, \quad \text{fraction } 0.3125 \\
  0.3125 \times 5 &= 1.5625 \implies \text{digit } 1, \quad \text{fraction } 0.5625 \quad (\text{repeats cycle } 2401)
  \end{aligned}$$
  Periodic cycle length is $4$: $0.5625_{10} = 0.\overline{2401}_5$.
  *Analytic Verification:*
  $$\frac{2(5^3) + 4(5^2) + 0(5^1) + 1(5^0)}{5^4 - 1} = \frac{250 + 100 + 0 + 1}{624} = \frac{351}{624} = \frac{9 \times 39}{16 \times 39} = \frac{9}{16} = 0.5625_{10} \quad \checkmark$$

- **Combined Result:**
  $$\mathbf{732.44_8 = 3344.\overline{2401}_5 \approx 3344.2401_5}$$

---

### Problem 5: Given Hexadecimal $\text{BAD.CA}_{16}$

Digits: $\text{B} = 11_{10}$, $\text{A} = 10_{10}$, $\text{D} = 13_{10}$, $\text{C} = 12_{10}$, $\text{A} = 10_{10}$.

#### 5.1 Hexadecimal to Binary ($b=2$)
Expand each hex digit into a 4-bit nibble:
$$\text{B} = 1011_2, \quad \text{A} = 1010_2, \quad \text{D} = 1101_2, \quad \text{C} = 1100_2, \quad \text{A} = 1010_2$$
$$\mathbf{\text{BAD.CA}_{16} = 101110101101.1100101_2} \quad (\text{or } 101110101101.11001010_2)$$

#### 5.2 Hexadecimal to Decimal ($b=10$)
Expand using positional notation:
$$\begin{aligned}
\text{BAD.CA}_{16} &= 11(16^2) + 10(16^1) + 13(16^0) + 12(16^{-1}) + 10(16^{-2}) \\
&= 11(256) + 160 + 13 + \frac{12}{16} + \frac{10}{256} \\
&= 2816 + 173 + \frac{192 + 10}{256} = 2989 + \frac{202}{256} = 2989 + \frac{101}{128} \\
&= \mathbf{2989.7890625_{10}}
\end{aligned}$$

#### 5.3 Binary to Quaternary ($b=4$)
Regroup $101110101101.11001010_2$ into 2-bit pairs:
$$\underbrace{10}_{2} \;\; \underbrace{11}_{3} \;\; \underbrace{10}_{2} \;\; \underbrace{10}_{2} \;\; \underbrace{11}_{3} \;\; \underbrace{01}_{1} \; . \; \underbrace{11}_{3} \;\; \underbrace{00}_{0} \;\; \underbrace{10}_{2} \;\; \underbrace{10}_{2}$$
$$\mathbf{\text{BAD.CA}_{16} = 232231.3022_4}$$
*Verification:* $2(4^5) + 3(4^4) + 2(4^3) + 2(4^2) + 3(4^1) + 1(4^0) + 3(4^{-1}) + 2(4^{-3}) + 2(4^{-4}) = 2048 + 768 + 128 + 32 + 12 + 1 + 0.75 + 0.03125 + 0.0078125 = 2989.7890625_{10} \quad \checkmark$

#### 5.4 Binary to Octal ($b=8$)
Regroup $101110101101.11001010_2$ into 3-bit triplets:
$$\underbrace{101}_{5} \;\; \underbrace{110}_{6} \;\; \underbrace{101}_{5} \;\; \underbrace{101}_{5} \; . \; \underbrace{110}_{6} \;\; \underbrace{010}_{2} \;\; \underbrace{100}_{4}$$
$$\mathbf{\text{BAD.CA}_{16} = 5655.624_8}$$
*Verification:* $5(512) + 6(64) + 5(8) + 5(1) + \frac{6}{8} + \frac{2}{64} + \frac{4}{512} = 2560 + 384 + 40 + 5 + \frac{384+16+4}{512} = 2989 + \frac{404}{512} = 2989.7890625_{10} \quad \checkmark$

#### 5.5 Decimal to Base-5 ($b=5$)
- **Integer Part ($2989_{10}$):**
  $$\begin{aligned}
  2989 \div 5 &= 597 \quad \text{R } 4 \quad (d_0) \\
  597 \div 5 &= 119 \quad \text{R } 2 \quad (d_1) \\
  119 \div 5 &= 23 \quad \;\; \text{R } 4 \quad (d_2) \\
  23 \div 5 &= 4 \quad \;\;\;\; \text{R } 3 \quad (d_3) \\
  4 \div 5 &= 0 \quad \;\;\;\; \text{R } 4 \quad (d_4)
  \end{aligned}$$
  Integer: $43424_5$. ($4 \cdot 625 + 3 \cdot 125 + 4 \cdot 25 + 2 \cdot 5 + 4 = 2500 + 375 + 100 + 10 + 4 = 2989_{10}$).

- **Fractional Part ($0.7890625_{10} = 101/128$):**
  Successive multiplication by $5$ generates a repeating sequence of period length $32$ (since the multiplicative order of $5 \pmod{128}$ is $32$):
  The repeating sequence of base-5 digits is:
  $$\overline{34330402232142411210313000442013}_5$$
  *First 8 digits:* $0.34330402\dots_5$.
  *Analytic Verification:* $\sum_{k=1}^{32} d_{-k} 5^{-k} / (1 - 5^{-32}) = \frac{101}{128} = 0.7890625_{10} \quad \checkmark$

- **Combined Result:**
  $$\mathbf{\text{BAD.CA}_{16} = 43424.\overline{34330402232142411210313000442013}_5 \approx 43424.3433_5}$$

---

### Problem 6: Given Base-5 $314.21_5$

#### 6.1 Base-5 to Decimal ($b=10$)
Expand using positional notation:
$$\begin{aligned}
314.21_5 &= 3(5^2) + 1(5^1) + 4(5^0) + 2(5^{-1}) + 1(5^{-2}) \\
&= 3(25) + 5 + 4 + \frac{2}{5} + \frac{1}{25} \\
&= 75 + 9 + 0.4 + 0.04 = \mathbf{84.44_{10}} = 84\frac{11}{25}_{10}
\end{aligned}$$

#### 6.2 Decimal to Binary ($b=2$)
- **Integer Part ($84_{10}$):**
  $$84 = 64 + 16 + 4 = 2^6 + 2^4 + 2^2 \implies \mathbf{1010100_2}$$
  Verification via successive division:
  $$84/2 = 42\text{ R }0, \; 42/2 = 21\text{ R }0, \; 21/2 = 10\text{ R }1, \; 10/2 = 5\text{ R }0, \; 5/2 = 2\text{ R }1, \; 2/2 = 1\text{ R }0, \; 1/2 = 0\text{ R }1$$

- **Fractional Part ($0.44_{10} = 11/25$):**
  Successive multiplication by $2$ produces a $20$-bit repeating period (since $\text{ord}_{25}(2) = 20$):
  $$\begin{aligned}
  0.44 \times 2 &= 0.88 \to 0 & 0.88 \times 2 &= 1.76 \to 1 & 0.76 \times 2 &= 1.52 \to 1 & 0.52 \times 2 &= 1.04 \to 1 \\
  0.04 \times 2 &= 0.08 \to 0 & 0.08 \times 2 &= 0.16 \to 0 & 0.16 \times 2 &= 0.32 \to 0 & 0.32 \times 2 &= 0.64 \to 0 \\
  0.64 \times 2 &= 1.28 \to 1 & 0.28 \times 2 &= 0.56 \to 0 & 0.56 \times 2 &= 1.12 \to 1 & 0.12 \times 2 &= 0.24 \to 0 \\
  0.24 \times 2 &= 0.48 \to 0 & 0.48 \times 2 &= 0.96 \to 0 & 0.96 \times 2 &= 1.92 \to 1 & 0.92 \times 2 &= 1.84 \to 1 \\
  0.84 \times 2 &= 1.68 \to 1 & 0.68 \times 2 &= 1.36 \to 1 & 0.36 \times 2 &= 0.72 \to 0 & 0.72 \times 2 &= 1.44 \to 1
  \end{aligned}$$
  Repeating block: $0.\overline{01110000101000111101}_2$.
  *Analytic Verification:*
  $$\frac{01110000101000111101_2}{2^{20} - 1} = \frac{461373}{1048575} = \frac{461373 / 41943}{1048575 / 41943} = \frac{11}{25} = 0.44_{10} \quad \checkmark$$

- **Combined Result:**
  $$\mathbf{314.21_5 = 1010100.\overline{01110000101000111101}_2 \approx 1010100.01110000_2}$$

#### 6.3 Decimal / Binary to Quaternary ($b=4$)
- Integer part: $1010100_2 \to \underbrace{01}_{1} \underbrace{01}_{1} \underbrace{01}_{1} \underbrace{00}_{0} = 1110_4$. ($1(64) + 1(16) + 1(4) = 84$).
- Fractional part: Group the 20-bit binary cycle into 2-bit pairs:
  $$\underbrace{01}_{1} \;\; \underbrace{11}_{3} \;\; \underbrace{00}_{0} \;\; \underbrace{00}_{0} \;\; \underbrace{10}_{2} \;\; \underbrace{10}_{2} \;\; \underbrace{00}_{0} \;\; \underbrace{11}_{3} \;\; \underbrace{11}_{3} \;\; \underbrace{01}_{1} \implies \overline{1300220331}_4$$
- **Combined Result:**
  $$\mathbf{314.21_5 = 1110.\overline{1300220331}_4 \approx 1110.1300_4}$$

#### 6.4 Decimal / Binary to Octal ($b=8$)
- Integer part: $1010100_2 \to \underbrace{001}_{1} \underbrace{010}_{2} \underbrace{100}_{4} = 124_8$. ($1(64) + 2(8) + 4 = 84$).
- Fractional part ($0.44_{10}$): Multiplications by 8 yield a 20-digit cycle:
  $$0.\overline{34121727024365605075}_8$$
- **Combined Result:**
  $$\mathbf{314.21_5 = 124.\overline{34121727024365605075}_8 \approx 124.3412_8}$$

#### 6.5 Decimal / Binary to Hexadecimal ($b=16$)
- Integer part: $1010100_2 \to \underbrace{0101}_{5} \underbrace{0100}_{4} = 54_{16}$. ($5(16) + 4 = 84$).
- Fractional part: Group the 20-bit binary cycle into 4-bit nibbles:
  $$\underbrace{0111}_{7} \;\; \underbrace{0000}_{0} \;\; \underbrace{1010}_{\text{A}} \;\; \underbrace{0011}_{3} \;\; \underbrace{1101}_{\text{D}} \implies \overline{70\text{A}3\text{D}}_{16}$$
  *Analytic Verification:*
  $$\frac{7(16^4) + 0(16^3) + 10(16^2) + 3(16^1) + 13(16^0)}{16^5 - 1} = \frac{458752 + 0 + 2560 + 48 + 13}{1048575} = \frac{461373}{1048575} = \frac{11}{25} = 0.44_{10} \quad \checkmark$$
- **Combined Result:**
  $$\mathbf{314.21_5 = 54.\overline{70\text{A}3\text{D}}_{16} \approx 54.70\text{A}3\text{D}_{16}}$$

---

## Key Takeaways & Exam Strategy

1. **Power-of-Two Fast Paths:**
   - Always route through Binary when converting among Quaternary ($2^2$), Octal ($2^3$), and Hexadecimal ($2^4$). This eliminates complex polynomial arithmetic and division.
   - Always group outwards from the radix point: pad with zeros to the **left** for integer components and to the **right** for fractional components.

2. **Rational Fraction Termination vs. Periodicity:**
   - A fraction in base 10 terminates in base $b$ if and only if all prime factors of the fraction's reduced denominator divide $b$.
   - Fractions with denominator $4, 8, 16, 128$ ($2^k$) terminate in binary, quaternary, octal, and hexadecimal, but form recurring fractions in Base-5.
   - Fractions with denominator $25$ ($5^2$) terminate in Base-5, but form recurring fractions in binary, octal, and hexadecimal.

3. **Validation Checksum:**
   - Always verify the integer value via standard Horner's rule or positional expansion: $\sum d_i b^i$.


## References & Navigation

- **Related Notes:** [[Integer Representation & Fixed-Point Arithmetic]]
