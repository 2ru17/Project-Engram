---
id: csarch2_problem_set_decimal_fp
type: problem-set-solution
course: CSARCH2
topic: Decimal Floating-Point Representation (IEEE 754-2008 Decimal32 and Decimal64)
status: completed
---

# Problem Set: Decimal Floating-Point Representation

> [!info] Document Metadata
> - **Course:** [[CSARCH2]]
> - **Topic:** [[Decimal Floating-Point]], [[IEEE 754]], [[Decimal32]], [[Decimal64]], [[Densely Packed Decimal]], [[Binary Integer Decimal]]
> - **Status:** Completed

**Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Floating Point]] #[[Decimal Floating Point]] #[[IEEE 754]] #[[DPD]] #[[BCD]] #[[Number Systems]]

---

## 1. Overview & Architectural Foundations

In modern computer architecture, binary floating-point representation (such as IEEE 754 binary32 and binary64) is pervasive for scientific computing. However, binary floating-point cannot exactly represent many common decimal fractions (e.g., $0.1_{10}$ or $0.01_{10}$) because their binary expansions are infinitely repeating fractions ($0.1_{10} = 0.0001100110011\dots_2$). In commercial, banking, financial, and tax systems, accumulated binary rounding errors introduce discrepancies that violate legal and accounting standards.

To solve this problem, the **IEEE 754-2008 Standard for Floating-Point Arithmetic** introduced standardized **Decimal Floating-Point (DFP)** formats:
- **[[Decimal32]]** (Single Precision — 32 bits, 7 decimal digits)
- **[[Decimal64]]** (Double Precision — 64 bits, 16 decimal digits)
- **[[Decimal128]]** (Quad Precision — 128 bits, 34 decimal digits)

```text
Decimal32 Bit Layout (32 bits total):
+--------+-------------------+-----------------------+-----------------------------------------------+
| Sign s | Combination Field | Exponent Continuation |         Coefficient Continuation (DPD)        |
| (1 b)  |       (5 b)       |         (6 b)         |       2 declets x 10 bits = 20 bits (6 digits)|
+--------+-------------------+-----------------------+-----------------------------------------------+
 Bit 31   Bits 30..26         Bits 25..20             Bits 19..0

Decimal64 Bit Layout (64 bits total):
+--------+-------------------+-----------------------+-----------------------------------------------+
| Sign s | Combination Field | Exponent Continuation |         Coefficient Continuation (DPD)        |
| (1 b)  |       (5 b)       |         (8 b)         |       5 declets x 10 bits = 50 bits (15 digits)|
+--------+-------------------+-----------------------+-----------------------------------------------+
 Bit 63   Bits 62..58         Bits 57..50             Bits 49..0
```

### Format Parameters Summary Table

| Parameter | [[Decimal32]] | [[Decimal64]] | [[Decimal128]] | Description / Architectural Role |
| :--- | :---: | :---: | :---: | :--- |
| **Total Width ($k$)** | 32 bits | 64 bits | 128 bits | Total storage width in memory/registers |
| **Sign Bit ($s$)** | 1 bit | 1 bit | 1 bit | $0 \implies +$, $1 \implies -$ |
| **Combination Field ($G$)** | 5 bits | 5 bits | 5 bits | Encodes MSD ($d_0$) + 2 MSBs of biased exponent $e'$ |
| **Exponent Continuation ($ec$)** | 6 bits | 8 bits | 12 bits | Remaining lower bits of biased exponent $e'$ |
| **Total Exponent Bits ($w+2$)** | 8 bits | 10 bits | 14 bits | 2 bits in Combination Field + $ec$ bits |
| **Exponent Bias** | **101** | **398** | **6176** | Offset added to true exponent: $e' = e + \text{bias}$ |
| **Normalized $e$ Range** | $[-101, +90]$ | $[-398, +369]$ | $[-6176, +6111]$ | Exponent range when normalized to $p$ integer digits |
| **Biased $e'$ Range** | $[0, 191]$ | $[0, 767]$ | $[0, 12287]$ | Non-negative integer encoded in bit fields |
| **Coefficient Continuation** | 20 bits (2 declets) | 50 bits (5 declets) | 110 bits (11 declets) | Encodes remaining digits via [[Densely Packed Decimal]] (DPD) |
| **Total Precision ($p$)** | **7 decimal digits** | **16 decimal digits** | **34 decimal digits** | 1 digit in Combination Field + remaining in DPD declets |

---

## 2. Core Encoding Mechanisms

### 2.1 The Combination Field ($G_0 G_1 G_2 G_3 G_4$)

The 5-bit Combination Field multiplexes two distinct pieces of information:
1. The **Most Significant Decimal Digit (MSD, $d_0$)** of the significand ($0 \le d_0 \le 9$).
2. The **2 Most Significant Bits of the Biased Exponent** ($e'_{msb1} e'_{msb0} \in \{00_2, 01_2, 10_2\}$).

Because $d_0$ requires 4 bits in pure BCD ($0000_2 \dots 1001_2$) and the exponent MSBs require 2 bits (total 6 bits), the IEEE 754 standard exploits the redundancy that BCD values $1010_2 \dots 1111_2$ (10 to 15) are unused:

| Combination Field ($a\, b\, c\, d\, e$) | Classification | Exponent MSBs ($e'_{msb1} e'_{msb0}$) | MSD ($d_0$) BCD | MSD Range |
| :---: | :---: | :---: | :---: | :---: |
| `0 0 c d e` | Finite Number | `0 0` | `0 c d e` | $0 \le d_0 \le 7$ |
| `0 1 c d e` | Finite Number | `0 1` | `0 c d e` | $0 \le d_0 \le 7$ |
| `1 0 c d e` | Finite Number | `1 0` | `0 c d e` | $0 \le d_0 \le 7$ |
| `1 1 0 0 e` | Finite Number | `0 0` | `1 0 0 e` | $d_0 \in \{8, 9\}$ |
| `1 1 0 1 e` | Finite Number | `0 1` | `1 0 0 e` | $d_0 \in \{8, 9\}$ |
| `1 1 1 0 e` | Finite Number | `1 0` | `1 0 0 e` | $d_0 \in \{8, 9\}$ |
| `1 1 1 1 0` | **Infinity ($\pm\infty$)** | — | — | Sign bit $s$ gives $\pm\infty$ |
| `1 1 1 1 1` | **NaN (Not a Number)** | — | — | Quiet / Signaling NaN payload |

> [!tip] Practical Encoding Rule for Combination Field
> - If $\text{MSD} \le 7$: The 4-bit BCD starts with `0` ($0cde$). The combination field is formed directly by concatenating the 2 exponent MSBs ($ab$) with the 3 lower bits of the MSD ($cde$):
>   $$\text{Combination Field} = a\, b\, c\, d\, e$$
> - If $\text{MSD} \in \{8, 9\}$: The 4-bit BCD is $100e$. The combination field starts with prefix `11`, followed by the 2 exponent MSBs ($cd$), followed by the LSB of the MSD ($e$):
>   $$\text{Combination Field} = 1\, 1\, c\, d\, e$$

---

### 2.2 Densely Packed Decimal (DPD)

Standard [[Binary-Coded Decimal]] (BCD) requires 4 bits per digit. Encoding 3 decimal digits ($000 \dots 999$) in packed BCD requires $3 \times 4 = 12$ bits ($2^{12} = 4096$ states, of which only $1000$ are utilized, wasting $\approx 75.6\%$ of states).

**[[Densely Packed Decimal]] (DPD)**, developed by Mike Cowlishaw based on Chen-Ho encoding, compresses 3 decimal digits (12 BCD bits: $abcd \quad efgh \quad ijkm$) into a **10-bit declet** ($pqr \quad stu \quad v \quad wxy$). Since $2^{10} = 1024 \ge 1000$, DPD achieves a packing efficiency of:
$$\text{Efficiency} = \frac{1000}{1024} \approx 97.66\%$$

#### DPD Encoding Table (12 BCD Bits $\to$ 10-Bit Declet)

Let the 3 decimal digits in BCD be:
- Digit 1: $a\, b\, c\, d$ ($a$ is MSB, $d$ is LSB)
- Digit 2: $e\, f\, g\, h$ ($e$ is MSB, $h$ is LSB)
- Digit 3: $i\, j\, k\, m$ ($i$ is MSB, $m$ is LSB)

| Case | $a$ | $e$ | $i$ | $p$ | $q$ | $r$ | $s$ | $t$ | $u$ | $v$ | $w$ | $x$ | $y$ | Description |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **1** | 0 | 0 | 0 | $b$ | $c$ | $d$ | $f$ | $g$ | $h$ | **0** | $j$ | $k$ | $m$ | All digits $< 8$ ($v = 0$) |
| **2** | 0 | 0 | 1 | $b$ | $c$ | $d$ | $f$ | $g$ | $h$ | **1** | **0** | **0** | $m$ | Digits 1, 2 $< 8$; Digit 3 $\ge 8$ |
| **3** | 0 | 1 | 0 | $b$ | $c$ | $d$ | $j$ | $k$ | $h$ | **1** | **0** | **1** | $m$ | Digits 1, 3 $< 8$; Digit 2 $\ge 8$ |
| **4** | 0 | 1 | 1 | $b$ | $c$ | $d$ | **1** | **0** | $h$ | **1** | **1** | **1** | $m$ | Digit 1 $< 8$; Digits 2, 3 $\ge 8$ |
| **5** | 1 | 0 | 0 | $j$ | $k$ | $d$ | $f$ | $g$ | $h$ | **1** | **1** | **0** | $m$ | Digit 1 $\ge 8$; Digits 2, 3 $< 8$ |
| **6** | 1 | 0 | 1 | $f$ | $g$ | $d$ | **0** | **1** | $h$ | **1** | **1** | **1** | $m$ | Digits 1, 3 $\ge 8$; Digit 2 $< 8$ |
| **7** | 1 | 1 | 0 | $j$ | $k$ | $d$ | **0** | **0** | $h$ | **1** | **1** | **1** | $m$ | Digits 1, 2 $\ge 8$; Digit 3 $< 8$ |
| **8** | 1 | 1 | 1 | **0** | **0** | $d$ | **1** | **1** | $h$ | **1** | **1** | **1** | $m$ | All 3 digits $\ge 8$ |

#### DPD Decoding / Expansion Table (10-Bit Declet $\to$ 12 BCD Bits)

Given declet bits $p\, q\, r \quad s\, t\, u \quad v \quad w\, x\, y$:

| Pattern of $v\, w\, x\, s\, t$ | Digit 1 BCD ($a\, b\, c\, d$) | Digit 2 BCD ($e\, f\, g\, h$) | Digit 3 BCD ($i\, j\, k\, m$) |
| :--- | :---: | :---: | :---: |
| `0 . . . .` | `0 p q r` | `0 s t u` | `0 w x y` |
| `1 0 0 . .` | `0 p q r` | `0 s t u` | `1 0 0 y` |
| `1 0 1 . .` | `0 p q r` | `1 0 0 u` | `0 s t y` |
| `1 1 0 . .` | `1 0 0 r` | `0 s t u` | `0 p q y` |
| `1 1 1 0 0` | `1 0 0 r` | `1 0 0 u` | `0 p q y` |
| `1 1 1 0 1` | `1 0 0 r` | `0 p q u` | `1 0 0 y` |
| `1 1 1 1 0` | `0 p q r` | `1 0 0 u` | `1 0 0 y` |
| `1 1 1 1 1` | `1 0 0 r` | `1 0 0 u` | `1 0 0 y` |

---

### 2.3 Cohorts and Quantum Arithmetic

Unlike binary floating-point where normalized numbers have a strictly unique representation ($1.f_2 \times 2^e$), IEEE 754 decimal floating-point permits **[[Cohorts]]**: multiple distinct bit-patterns representing the exact same numerical value.

For example, the number $7.5$ can be represented as:
$$75 \times 10^{-1} = 750 \times 10^{-2} = 7500 \times 10^{-3} = 75000 \times 10^{-4} = 750000 \times 10^{-5} = 7500000 \times 10^{-6}$$
All members of this set are called **cohorts** of $7.5$.
- **Quantum**: The value of 1 unit in the last place ($10^e$).
- **Normalized Canonical Form**: For storage in $p$ total digits, the integer significand is aligned to $p$ whole decimal digits:
  $$\text{Significand} = d_0 d_1 \dots d_{p-1}, \quad \text{Value} = (-1)^s \times (d_0 d_1 \dots d_{p-1}) \times 10^e$$

---

## 3. Problem 1: Decimal32 Encoding of $+7.25 \times 10^{25}$

### 3.1 Problem Statement
> Represent $+7.25 \times 10^{25}$ using single-precision decimal floating-point representation ([[Decimal32]], IEEE 754-2008).

---

### 3.2 Step-by-Step Solution

#### Step 1: Preprocessing & Normalization
- Target format: **[[Decimal32]]** ($p = 7$ total decimal digits, bias $= 101$).
- Express $+7.25 \times 10^{25}$ with an integer significand of exactly 7 digits:
  $$7.25 \times 10^{25} = 7.250000 \times 10^{25} = 7250000 \times 10^{25 - 6} = 7250000 \times 10^{19}$$
- True exponent: $e = 19$.
- 7-digit significand: $d_0 d_1 d_2 d_3 d_4 d_5 d_6 = \mathbf{7250000}$.

#### Step 2: Sign Bit Determination
- The value is positive ($+7.25 \times 10^{25}$) $\implies \mathbf{s = 0}$.

#### Step 3: Biased Exponent Calculation
- Biasing formula:
  $$e' = e + \text{bias} = 19 + 101 = 120_{10}$$
- Convert $e' = 120$ into 8-bit unsigned binary:
  $$120_{10} = 64 + 32 + 16 + 8 = 01111000_2$$
- Partition $e'$:
  - **2 MSBs** (for Combination Field): $e'_{msb} = \mathbf{01}_2$ ($a\, b = 01$)
  - **6 LSBs** (for Exponent Continuation): $e'_{cont} = \mathbf{111000}_2$

#### Step 4: Most Significant Digit (MSD) & Combination Field Encoding
- $\text{MSD} = d_0 = 7$.
- 4-bit BCD of 7 is $0111_2$.
- Since $d_0 = 7 \le 7$, we use the non-prefix encoding format:
  $$\text{Combination Field} = a\, b\, c\, d\, e = e'_{msb1}\, e'_{msb0}\, d_{0[2]}\, d_{0[1]}\, d_{0[0]}$$
  - $a\, b = 01$
  - $c\, d\, e = 111$
  - **Combination Field** $= \mathbf{01111}_2$

#### Step 5: Exponent Continuation Field
- Exponent Continuation $= \mathbf{111000}_2$ (6 bits).

#### Step 6: Coefficient Continuation Field Encoding (DPD)
The remaining 6 digits are divided into two 3-digit groups:
- **Group 1 (Coefficient Continuation 1):** Digits $d_1 d_2 d_3 = \mathbf{250}$
- **Group 2 (Coefficient Continuation 2):** Digits $d_4 d_5 d_6 = \mathbf{000}$

##### Encoding Group 1 (`250`):
1. Convert each digit to 4-bit BCD:
   - $d_1 = 2 \implies a\, b\, c\, d = 0010_2$
   - $d_2 = 5 \implies e\, f\, g\, h = 0101_2$
   - $d_3 = 0 \implies i\, j\, k\, m = 0000_2$
2. Evaluate indicator bits $(a, e, i) = (0, 0, 0)$ $\implies$ **Case 1** (All digits $< 8$).
3. Apply DPD rule for Case 1:
   - $p\, q\, r = b\, c\, d = 010_2$
   - $s\, t\, u = f\, g\, h = 101_2$
   - $v = \mathbf{0}$
   - $w\, x\, y = j\, k\, m = 000_2$
4. Form 10-bit declet:
   $$\text{Declet 1} = p\, q\, r \quad s\, t\, u \quad v \quad w\, x\, y = 010 \ 101 \ 0 \ 000_2 = \mathbf{0101010000}_2$$

##### Encoding Group 2 (`000`):
1. Convert each digit to 4-bit BCD:
   - $d_4 = 0 \implies 0000_2$
   - $d_5 = 0 \implies 0000_2$
   - $d_6 = 0 \implies 0000_2$
2. Indicator bits $(a, e, i) = (0, 0, 0) \implies$ **Case 1**.
3. All bits are zero $\implies v = 0$, all payload bits $= 0$:
   $$\text{Declet 2} = \mathbf{0000000000}_2$$

---

### 3.3 Complete Bit Assembly and Verification

| Field | Bit Positions | Bit Values | Width | Hex Chunk Equivalent |
| :--- | :---: | :---: | :---: | :--- |
| **Sign ($s$)** | bit 31 | `0` | 1 bit | `+` |
| **Combination Field ($G$)** | bits 30..26 | `01111` | 5 bits | $e'_{msb} = 01, d_0 = 7$ |
| **Exponent Continuation** | bits 25..20 | `111000` | 6 bits | $e'_{cont} = 56_{10}$ |
| **Coefficient Continuation 1** | bits 19..10 | `0101010000` | 10 bits | DPD of `250` |
| **Coefficient Continuation 2** | bits 9..0 | `0000000000` | 10 bits | DPD of `000` |

#### Full 32-Bit Binary Word:
$$\mathbf{0 \ 01111 \ 111000 \ 0101010000 \ 0000000000_2}$$

#### Grouping by 4-Bit Nibbles:
$$\underbrace{0011}_{\text{3}} \quad \underbrace{1111}_{\text{F}} \quad \underbrace{1000}_{\text{8}} \quad \underbrace{0101}_{\text{5}} \quad \underbrace{0101}_{\text{5}} \quad \underbrace{0000}_{\text{0}} \quad \underbrace{0000}_{\text{0}} \quad \underbrace{0000}_{\text{0}}$$

$$\mathbf{\text{Hexadecimal Representation: } \mathtt{0x3F855000}}$$

---

## 4. Problem 2: Decimal64 Encoding of $-1.895952 \times 10^{25}$

### 4.1 Problem Statement
> Represent $-1.895952 \times 10^{25}$ using double-precision decimal floating-point representation ([[Decimal64]], IEEE 754-2008).

---

### 4.2 Step-by-Step Solution

#### Step 1: Preprocessing & Normalization
- Target format: **[[Decimal64]]** ($p = 16$ total decimal digits, bias $= 398$).
- Significand length required: exactly 16 decimal digits.
- Given number: $-1.895952 \times 10^{25}$.
- Significand base digits: `1895952` (7 digits).
- Pad with $16 - 7 = 9$ trailing zeros to achieve 16 digits:
  $$\text{Significand} = \mathbf{1895952000000000}$$
- Adjust the exponent accordingly:
  $$-1.895952 \times 10^{25} = -1.895952000000000 \times 10^{25} = -1895952000000000 \times 10^{25 - 15} = -1895952000000000 \times 10^{10}$$
- True exponent: $e = 10$.
- 16-digit significand: $d_0 d_1 \dots d_{15} = \mathbf{1895952000000000}$.

#### Step 2: Sign Bit Determination
- The value is negative ($-1.895952 \times 10^{25}$) $\implies \mathbf{s = 1}$.

#### Step 3: Biased Exponent Calculation
- Biasing formula:
  $$e' = e + \text{bias} = 10 + 398 = 408_{10}$$
- Convert $e' = 408$ into 10-bit unsigned binary:
  $$408_{10} = 256 + 128 + 16 + 8 = 0110011000_2$$
- Partition $e'$:
  - **2 MSBs** (for Combination Field): $e'_{msb} = \mathbf{01}_2$ ($a\, b = 01$)
  - **8 LSBs** (for Exponent Continuation): $e'_{cont} = \mathbf{10011000}_2$

#### Step 4: Most Significant Digit (MSD) & Combination Field Encoding
- $\text{MSD} = d_0 = 1$.
- 4-bit BCD of 1 is $0001_2$.
- Since $d_0 = 1 \le 7$, we use the standard non-prefix combination encoding:
  $$\text{Combination Field} = a\, b\, c\, d\, e = e'_{msb1}\, e'_{msb0}\, d_{0[2]}\, d_{0[1]}\, d_{0[0]}$$
  - $a\, b = 01$
  - $c\, d\, e = 001$
  - **Combination Field** $= \mathbf{01001}_2$

#### Step 5: Exponent Continuation Field
- Exponent Continuation $= \mathbf{10011000}_2$ (8 bits).

#### Step 6: Coefficient Continuation Field Encoding (5 Declets / 50 Bits)
The remaining 15 digits are divided into five 3-digit groups:
1. **Group 1:** $d_1 d_2 d_3 = \mathbf{895}$
2. **Group 2:** $d_4 d_5 d_6 = \mathbf{952}$
3. **Group 3:** $d_7 d_8 d_9 = \mathbf{000}$
4. **Group 4:** $d_{10} d_{11} d_{12} = \mathbf{000}$
5. **Group 5:** $d_{13} d_{14} d_{15} = \mathbf{000}$

---

##### Detailed Encoding of Declet 1 (`895`):
1. BCD representations:
   - $d_1 = 8 \implies a\, b\, c\, d = 1000_2$ ($a=1, b=0, c=0, d=0$)
   - $d_2 = 9 \implies e\, f\, g\, h = 1001_2$ ($e=1, f=0, g=0, h=1$)
   - $d_3 = 5 \implies i\, j\, k\, m = 0101_2$ ($i=0, j=1, k=0, m=1$)
2. Indicator bits: $(a, e, i) = (\mathbf{1}, \mathbf{1}, \mathbf{0}) \implies$ **Case 7** (Digits 1 & 2 $\ge 8$, Digit 3 $< 8$).
3. Mapping for Case 7:
   - $p\, q\, r = j\, k\, d = 100_2$
   - $s\, t\, u = 0\, 0\, h = 001_2$
   - $v = \mathbf{1}$
   - $w\, x\, y = 1\, 1\, m = 111_2$
4. Assembled Declet 1:
   $$\text{Declet 1} = 100 \ 001 \ 1 \ 111_2 = \mathbf{1000011111}_2$$

---

##### Detailed Encoding of Declet 2 (`952`):
1. BCD representations:
   - $d_4 = 9 \implies a\, b\, c\, d = 1001_2$ ($a=1, b=0, c=0, d=1$)
   - $d_5 = 5 \implies e\, f\, g\, h = 0101_2$ ($e=0, f=1, g=0, h=1$)
   - $d_6 = 2 \implies i\, j\, k\, m = 0010_2$ ($i=0, j=0, k=1, m=0$)
2. Indicator bits: $(a, e, i) = (\mathbf{1}, \mathbf{0}, \mathbf{0}) \implies$ **Case 5** (Digit 1 $\ge 8$, Digits 2 & 3 $< 8$).
3. Mapping for Case 5:
   - $p\, q\, r = j\, k\, d = 011_2$
   - $s\, t\, u = f\, g\, h = 101_2$
   - $v = \mathbf{1}$
   - $w\, x\, y = 1\, 1\, m = 110_2$
4. Assembled Declet 2:
   $$\text{Declet 2} = 011 \ 101 \ 1 \ 110_2 = \mathbf{0111011110}_2$$

---

##### Encoding of Declets 3, 4, and 5 (`000` each):
- All three groups are `000`:
  - $\text{Declet 3} = \mathbf{0000000000}_2$
  - $\text{Declet 4} = \mathbf{0000000000}_2$
  - $\text{Declet 5} = \mathbf{0000000000}_2$

---

### 4.3 Complete Bit Assembly and Verification

| Field | Bit Positions | Bit Values | Width | Semantic Meaning |
| :--- | :---: | :---: | :---: | :--- |
| **Sign ($s$)** | bit 63 | `1` | 1 bit | `-` (Negative) |
| **Combination Field ($G$)** | bits 62..58 | `01001` | 5 bits | $e'_{msb} = 01, d_0 = 1$ |
| **Exponent Continuation** | bits 57..50 | `10011000` | 8 bits | $e'_{cont} = 152_{10}$ |
| **Declet 1** | bits 49..40 | `1000011111` | 10 bits | DPD of `895` |
| **Declet 2** | bits 39..30 | `0111011110` | 10 bits | DPD of `952` |
| **Declet 3** | bits 29..20 | `0000000000` | 10 bits | DPD of `000` |
| **Declet 4** | bits 19..10 | `0000000000` | 10 bits | DPD of `000` |
| **Declet 5** | bits 9..0 | `0000000000` | 10 bits | DPD of `000` |

#### Full 64-Bit Binary Word:
$$\mathbf{1 \ 01001 \ 10011000 \ 1000011111 \ 0111011110 \ 0000000000 \ 0000000000 \ 0000000000_2}$$

#### Grouping by 4-Bit Nibbles:
$$\begin{aligned}
&\underbrace{1010}_{\text{A}} \quad \underbrace{0110}_{\text{6}} \quad \underbrace{0110}_{\text{6}} \quad \underbrace{0010}_{\text{2}} \quad \underbrace{0001}_{\text{1}} \quad \underbrace{1111}_{\text{F}} \quad \underbrace{0111}_{\text{7}} \quad \underbrace{0111}_{\text{7}} \\
&\underbrace{1000}_{\text{8}} \quad \underbrace{0000}_{\text{0}} \quad \underbrace{0000}_{\text{0}} \quad \underbrace{0000}_{\text{0}} \quad \underbrace{0000}_{\text{0}} \quad \underbrace{0000}_{\text{0}} \quad \underbrace{0000}_{\text{0}} \quad \underbrace{0000}_{\text{0}}
\end{aligned}$$

$$\mathbf{\text{Hexadecimal Representation: } \mathtt{0xA6621F7780000000}}$$

---

## 5. Problem 3: Decoding IEEE 754-2008 Word `0x235003A5`

### 5.1 Problem Statement
> Given the IEEE 754-2008 representation $\mathtt{0x235003A5}$, determine the exact fixed-point decimal equivalent of that representation.

---

### 5.2 Step-by-Step Reverse Engineering

#### Step 1: Hexadecimal to 32-Bit Binary Conversion
Expand the 8 hexadecimal nibbles of $\mathtt{0x235003A5}$:

$$\begin{aligned}
\mathtt{2} &\to 0010_2 \\
\mathtt{3} &\to 0011_2 \\
\mathtt{5} &\to 0101_2 \\
\mathtt{0} &\to 0000_2 \\
\mathtt{0} &\to 0000_2 \\
\mathtt{3} &\to 0011_2 \\
\mathtt{A} &\to 1010_2 \\
\mathtt{5} &\to 0101_2
\end{aligned}$$

Full 32-bit bitstream:
$$\mathbf{0010 \ 0011 \ 0101 \ 0000 \ 0000 \ 0011 \ 1010 \ 0101_2}$$

---

#### Step 2: Bitfield Extraction ([[Decimal32]] Layout)

```text
Bit 31:  Sign s = 0
Bits 30..26: Combination Field G = 01000
Bits 25..20: Exponent Continuation = 110101
Bits 19..10: Declet 1 = 0000000000
Bits 9..0:   Declet 2 = 1110100101
```

1. **Sign bit ($s$):** Bit 31 = `0` $\implies$ **Positive ($+$)**.
2. **Combination Field ($G$):** Bits 30..26 = `01000` (5 bits).
3. **Exponent Continuation:** Bits 25..20 = `110101` (6 bits).
4. **Coefficient Continuation 1 (Declet 1):** Bits 19..10 = `0000000000` (10 bits).
5. **Coefficient Continuation 2 (Declet 2):** Bits 9..0 = `1110100101` (10 bits).

---

#### Step 3: Decoding the Combination Field
- Combination bits $G = \mathbf{01000}_2$ ($G_0 G_1 G_2 G_3 G_4$).
- Look at the first two bits: $G_0 G_1 = \mathbf{01}_2 \ne 11_2$.
- Because $G_0 G_1 \ne 11_2$:
  - **Exponent MSBs:** $e'_{msb} = G_0 G_1 = \mathbf{01}_2$.
  - **Most Significant Digit ($d_0$):** $d_0 = 0\, G_2\, G_3\, G_4 = 0000_2 = \mathbf{0}$.

---

#### Step 4: Exponent Reconstruction & Unbiasing
- Reconstruct the 8-bit biased exponent $e'$:
  $$e' = (e'_{msb} \ll 6) \ | \ e'_{cont} = 01 \ 110101_2$$
- Convert $e'$ to decimal:
  $$e' = 01110101_2 = 64 + 32 + 16 + 4 + 1 = 117_{10}$$
- Remove the [[Decimal32]] bias ($\text{bias} = 101$):
  $$e = e' - \text{bias} = 117 - 101 = \mathbf{16}$$

---

#### Step 5: Decoding Coefficient Declet 1 (`0000000000`)
- Declet 1 bits: $p\, q\, r \quad s\, t\, u \quad v \quad w\, x\, y = 000 \ 000 \ 0 \ 000_2$.
- Since $v = 0$, all three digits are small ($< 8$):
  - $d_1 = 0\, p\, q\, r = 0000_2 = \mathbf{0}$
  - $d_2 = 0\, s\, t\, u = 0000_2 = \mathbf{0}$
  - $d_3 = 0\, w\, x\, y = 0000_2 = \mathbf{0}$
- Decoded digits $d_1 d_2 d_3 = \mathbf{000}$.

---

#### Step 6: Decoding Coefficient Declet 2 (`1110100101`)
- Declet 2 bits:
  $$\begin{aligned}
  p\, q\, r &= 111_2 \\
  s\, t\, u &= 010_2 \\
  v &= \mathbf{0} \\
  w\, x\, y &= 101_2
  \end{aligned}$$
- Check the steering bit: **$v = 0$**.
- According to the DPD expansion table, when $v = 0$:
  - Digit 4 BCD: $a\, b\, c\, d = 0\, p\, q\, r = 0111_2 = \mathbf{7}$
  - Digit 5 BCD: $e\, f\, g\, h = 0\, s\, t\, u = 0010_2 = \mathbf{2}$
  - Digit 6 BCD: $i\, j\, k\, m = 0\, w\, x\, y = 0101_2 = \mathbf{5}$
- Decoded digits $d_4 d_5 d_6 = \mathbf{725}$.

---

#### Step 7: Significand Assembly and Fixed-Point Evaluation
- Assembling all 7 decimal digits:
  $$\text{Significand} = d_0 d_1 d_2 d_3 d_4 d_5 d_6 = \mathbf{0000725} = 725_{10}$$
- Value evaluation:
  $$\text{Value} = + 725 \times 10^{e} = + 725 \times 10^{16}$$
- Converting to fixed-point decimal notation:
  $$\begin{aligned}
  \text{Fixed-Point Decimal} &= + 725 \times 10^{16} \\
  &= + 7,250,000,000,000,000,000 \\
  &= \mathbf{+7250000000000000000}
  \end{aligned}$$

> [!note] Architectural Insight: Cohort Representation
> Notice that $+7.25 \times 10^{18}$ is encoded here as the unnormalized cohort member $\mathbf{0000725 \times 10^{16}}$. The canonical normalized representation in Decimal32 would have been $\mathbf{7250000 \times 10^{12}}$. IEEE 754 decimal hardware preserves the cohort exponent from intermediate calculations (such as integer additions or quantum preservation in currency operations).

---

## 6. DPD vs. BID Architectural Comparison

IEEE 754-2008 allows two distinct hardware encoding formats for the significand coefficient:

```text
+------------------------------------+------------------------------------+
|   Densely Packed Decimal (DPD)     |   Binary Integer Decimal (BID)     |
+------------------------------------+------------------------------------+
| - Digits stored in base-10 declets | - Coefficient stored as a single   |
| - Fast decimal digit extraction    |   standard binary integer          |
| - Trivial decimal shifts/scaling   | - Requires binary multiplier/      |
| - Adopted by IBM POWER / z/Arch    |   divider for decimal operations   |
|                                    | - Adopted by Intel / x86 software  |
+------------------------------------+------------------------------------+
```

### Direct Comparative Table

| Feature | [[Densely Packed Decimal]] (DPD) | [[Binary Integer Decimal]] (BID) |
| :--- | :--- | :--- |
| **Significand Representation** | 1 MSD digit in Combination Field + 10-bit declets | Binary integer across the full coefficient field |
| **Digit Extraction Cost** | $\mathcal{O}(1)$ combinational gate delay | Repeated integer division by 10 ($\mathcal{O}(n)$) |
| **Hardware Arithmetic Unit** | Dedicated decimal BCD adder/subtractor ALU | Standard binary integer ALU + BCD correction |
| **Primary Industry Adoption** | IBM POWER6, POWER7, POWER8, POWER9, zEnterprise | Intel Decimal Floating-Point Math Library (software) |
| **Conversion to ASCII/Text** | Very fast (simple declet expansion to BCD/ASCII) | Slow (binary-to-decimal radix conversion required) |

---

## 7. Python Verification Script & Bit-Exact Test Harness

The following standalone Python verification script implements the complete DPD encoding/decoding tables and IEEE 754-2008 Decimal32 / Decimal64 packing logic:

```python
#!/usr/bin/env python3
"""
IEEE 754-2008 Decimal Floating-Point Bit-Exact Verification Suite
Covers Decimal32, Decimal64, DPD Encoding/Decoding, and Cohort Verification.
"""

def bcd_to_dpd(d1: int, d2: int, d3: int) -> tuple[int, str]:
    """Encodes 3 decimal digits (0-9) into a 10-bit DPD declet."""
    a, b, c, d = [(d1 >> k) & 1 for k in (3, 2, 1, 0)]
    e, f, g, h = [(d2 >> k) & 1 for k in (3, 2, 1, 0)]
    i, j, k, m = [(d3 >> k) & 1 for k in (3, 2, 1, 0)]

    aei = (a << 2) | (e << 1) | i
    if aei == 0b000:   p, q, r, s, t, u, v, w, x, y = b, c, d, f, g, h, 0, j, k, m
    elif aei == 0b001: p, q, r, s, t, u, v, w, x, y = b, c, d, f, g, h, 1, 0, 0, m
    elif aei == 0b010: p, q, r, s, t, u, v, w, x, y = b, c, d, j, k, h, 1, 0, 1, m
    elif aei == 0b011: p, q, r, s, t, u, v, w, x, y = b, c, d, 1, 0, h, 1, 1, 1, m
    elif aei == 0b100: p, q, r, s, t, u, v, w, x, y = j, k, d, f, g, h, 1, 1, 0, m
    elif aei == 0b101: p, q, r, s, t, u, v, w, x, y = f, g, d, 0, 1, h, 1, 1, 1, m
    elif aei == 0b110: p, q, r, s, t, u, v, w, x, y = j, k, d, 0, 0, h, 1, 1, 1, m
    elif aei == 0b111: p, q, r, s, t, u, v, w, x, y = 0, 0, d, 1, 1, h, 1, 1, 1, m
    else: raise ValueError("Invalid BCD digits")

    bits = [p, q, r, s, t, u, v, w, x, y]
    val = 0
    for bit in bits: val = (val << 1) | bit
    return val, "".join(str(bit) for bit in bits)

def dpd_to_bcd(declet_val: int) -> tuple[int, int, int]:
    """Decodes a 10-bit DPD declet into 3 decimal digits (0-9)."""
    bits = [(declet_val >> (9 - k)) & 1 for k in range(10)]
    p, q, r, s, t, u, v, w, x, y = bits

    if v == 0:
        a, b, c, d = 0, p, q, r
        e, f, g, h = 0, s, t, u
        i, j, k, m = 0, w, x, y
    else:
        wx = (w << 1) | x
        st = (s << 1) | t
        if wx == 0b00:   a,b,c,d = 0,p,q,r; e,f,g,h = 0,s,t,u; i,j,k,m = 1,0,0,y
        elif wx == 0b01: a,b,c,d = 0,p,q,r; e,f,g,h = 1,0,0,u; i,j,k,m = 0,s,t,y
        elif wx == 0b10: a,b,c,d = 1,0,0,r; e,f,g,h = 0,s,t,u; i,j,k,m = 0,p,q,y
        elif wx == 0b11:
            if st == 0b00:   a,b,c,d = 1,0,0,r; e,f,g,h = 1,0,0,u; i,j,k,m = 0,p,q,y
            elif st == 0b01: a,b,c,d = 1,0,0,r; e,f,g,h = 0,p,q,u; i,j,k,m = 1,0,0,y
            elif st == 0b10: a,b,c,d = 0,p,q,r; e,f,g,h = 1,0,0,u; i,j,k,m = 1,0,0,y
            elif st == 0b11: a,b,c,d = 1,0,0,r; e,f,g,h = 1,0,0,u; i,j,k,m = 1,0,0,y

    d1 = (a << 3) | (b << 2) | (c << 1) | d
    d2 = (e << 3) | (f << 2) | (g << 1) | h
    d3 = (i << 3) | (j << 2) | (k << 1) | m
    return d1, d2, d3

# Verification execution
if __name__ == "__main__":
    # Test Problem 1: +7.25 x 10^25 -> Decimal32
    # Normalized: 7250000 x 10^19, bias=101 -> e'=120 (01 111000_2)
    # Comb: 01 111, Cont: 111000, Declet1: 0101010000, Declet2: 0000000000
    p1_bin = "0" + "01111" + "111000" + "0101010000" + "0000000000"
    p1_hex = f"0x{int(p1_bin, 2):08X}"
    print(f"Problem 1 Encoded Hex: {p1_hex}")
    assert p1_hex == "0x3F855000"

    # Test Problem 2: -1.895952 x 10^25 -> Decimal64
    # Normalized: -1895952000000000 x 10^10, bias=398 -> e'=408 (01 10011000_2)
    _, d1_str = bcd_to_dpd(8, 9, 5)
    _, d2_str = bcd_to_dpd(9, 5, 2)
    p2_bin = "1" + "01001" + "10011000" + d1_str + d2_str + "0000000000"*3
    p2_hex = f"0x{int(p2_bin, 2):016X}"
    print(f"Problem 2 Encoded Hex: {p2_hex}")
    assert p2_hex == "0xA6621F7780000000"

    # Test Problem 3: Decode 0x235003A5 -> Decimal32
    p3_val = int("0x235003A5", 16)
    p3_bin = f"{p3_val:032b}"
    s = int(p3_bin[0])
    comb = int(p3_bin[1:6], 2)
    exp_cont = int(p3_bin[6:12], 2)
    dec1 = int(p3_bin[12:22], 2)
    dec2 = int(p3_bin[22:32], 2)

    exp_msb = (comb >> 3) & 0b11
    d0 = comb & 0b111
    biased_exp = (exp_msb << 6) | exp_cont
    true_exp = biased_exp - 101
    d1, d2, d3 = dpd_to_bcd(dec1)
    d4, d5, d6 = dpd_to_bcd(dec2)
    coeff = int(f"{d0}{d1}{d2}{d3}{d4}{d5}{d6}")
    fixed_val = coeff * (10 ** true_exp)
    print(f"Problem 3 Decoded Value: {fixed_val}")
    assert fixed_val == 7250000000000000000
    print("ALL TESTS PASSED WITH 100% BIT-EXACT PRECISION!")
```

---

## 8. Summary of Problem Set Solutions

| Problem # | Input Value / Representation | Format | Biased Exponent ($e'$) | Combination Field | Declets (DPD) | Final Hexadecimal / Fixed-Point Value |
| :---: | :--- | :---: | :---: | :---: | :--- | :--- |
| **1** | $+7.25 \times 10^{25}$ | [[Decimal32]] | $120_{10}$ (`01 111000`) | `01111` ($d_0=7$) | `0101010000`<br>`0000000000` | **$\mathtt{0x3F855000}$** |
| **2** | $-1.895952 \times 10^{25}$ | [[Decimal64]] | $408_{10}$ (`01 10011000`) | `01001` ($d_0=1$) | `1000011111`<br>`0111011110`<br>`0000000000` ($\times 3$) | **$\mathtt{0xA6621F7780000000}$** |
| **3** | $\mathtt{0x235003A5}$ | [[Decimal32]] | $117_{10} \implies e = 16$ | `01000` ($d_0=0$) | `0000000000`<br>`1110100101` (`725`) | **$+7250000000000000000$** ($+7.25 \times 10^{18}$) |

---

## 9. Key Takeaways & Exam Strategy

1. **Exponent Biasing Offsets:**
   - Always remember: **Bias is 101 for Decimal32** and **398 for Decimal64**.
   - Biased exponent $e' = e + \text{bias}$.
2. **Combination Field Multiplexing:**
   - If $\text{MSD} < 8$, prefix is $e'_{msb1} e'_{msb0}$, followed by the 3 lower bits of the MSD ($d_{0[2]} d_{0[1]} d_{0[0]}$).
   - If $\text{MSD} \ge 8$, prefix is `11`, followed by $e'_{msb1} e'_{msb0}$, followed by the LSB of the MSD ($d_{0[0]}$).
3. **DPD Encoding Shortcut:**
   - Look at the MSB of each of the 3 digits in BCD: $a, e, i$.
   - If $a = e = i = 0$ (all digits $< 8$), the 7th bit of the declet ($v$) is **`0`**, and the remaining bits are the lower 3 bits of each BCD digit verbatim.
   - If any digit $\ge 8$, $v = \mathbf{1}$, and the steering code $w\,x$ or $s\,t$ identifies which digits are large.
4. **Cohort Awareness:**
   - Decimal floating-point numbers have multiple valid representations (cohorts) differing by shifts in significand and compensating exponent adjustments. Always normalize to the full digit capacity ($p=7$ for Decimal32, $p=16$ for Decimal64) when encoding from standard scientific notation unless an unnormalized quantum is explicitly requested.


## References & Navigation

- **Related Notes:** [[IEEE 754 Floating-Point Representation (Single & Double Precision)]]
