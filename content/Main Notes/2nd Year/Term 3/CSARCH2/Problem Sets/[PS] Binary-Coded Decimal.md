---
id: problem_set_binary_coded_decimal
type: note
course: CSARCH2
topic: "Problem Set - Binary-Coded Decimal"
status: completed
---

# Problem Set - Binary-Coded Decimal

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Data Representation]] #[[Binary-Coded Decimal]] #[[Decimal Arithmetic]]

---

## Overview

> **Binary-Coded Decimal (BCD)** is a class of digital encodings where each decimal digit ($0$ through $9$) is represented by a dedicated sequence of binary bits. Unlike pure positional binary notation, BCD eliminates fractional precision loss during base-10 financial and commercial arithmetic, providing exact decimal representation for banking, tax accounting, and human-facing embedded displays. This problem set investigates the architectural formats of BCD—including **Unpacked BCD**, **Packed BCD**, and **Densely Packed BCD (DPD)** (as standardized in IEEE 754-2008 decimal floating-point)—alongside weighted codes ($8421$, $2421$), self-complementing codes (**Excess-3**), and the arithmetic correction mechanics of BCD addition.

---

## Key Definitions

- **Binary-Coded Decimal (BCD):** An encoding format in which each decimal digit of a number is individually converted into a fixed-width binary pattern.
- **Natural BCD (8421 Code):** The most common weighted BCD format, where the 4 bits of each nibble represent weights $2^3 = 8$, $2^2 = 4$, $2^1 = 2$, and $2^0 = 1$. The 10 valid codes are $0000_2$ ($0$) through $1001_2$ ($9$). Bit patterns $1010_2 \dots 1111_2$ ($10 \dots 15$) are invalid (pseudo-tetrades).
- **Unpacked BCD:** A representation where each decimal digit is stored in an entire 8-bit byte ($1$ octet). The upper 4 bits are conventionally padded with zeros ($0000_2$) or ASCII zone bits ($0011_2$), while the lower 4 bits hold the BCD digit.
- **Packed BCD:** A more compact representation where two decimal digits are packed into a single 8-bit byte (4 bits per digit). For $n$ decimal digits, it requires $\lceil n / 2 \rceil$ bytes.
- **Signed Packed BCD:** Packed BCD representation appending a sign nibble at the least significant position. By convention (derived from accounting terminology for Credit and Debit):
  - Positive sign ($+$ / Credit): $1100_2$ ($0\text{xC}$)
  - Negative sign ($-$ / Debit): $1101_2$ ($0\text{xD}$)
- **Densely Packed BCD (DPD):** A highly efficient compression algorithm that encodes $3$ decimal digits ($12$ BCD bits) into exactly $10$ binary bits (**Declet**), achieving a storage efficiency of $99.67\%$ (compared to pure binary's theoretical limit of $\log_2(1000) \approx 9.966$ bits). Developed by Mike Cowlishaw based on Chen-Ho encoding.
- **Excess-3 Code (Stibitz Code):** An unweighted, self-complementing decimal code formed by adding $3$ ($0011_2$) to each 8421 BCD digit. The 9's complement of an Excess-3 number is obtained directly by bitwise inverting (1's complement) its bits.
- **2421 Code (Aiken Code):** A weighted, self-complementing code with bit weights $2, 4, 2, 1$.
- **BCD Addition Correction ($+6$ Rule):** When adding two BCD digits in binary, if the intermediate sum produces a value greater than $9$ ($1001_2$) or generates a binary carry-out ($K=1$), adding $+6$ ($0110_2$) skips the $6$ invalid states ($1010_2 \dots 1111_2$) and produces the correct BCD digit and decimal carry.

---

## Theoretical Framework & Encoding Tables

### 1. Comparison of Decimal Encodings

| Decimal Digit | 8421 BCD (Natural) | Excess-3 ($\text{BCD} + 0011_2$) | 2421 (Aiken Code) | Unpacked BCD (Byte) |
| :---: | :---: | :---: | :---: | :---: |
| **0** | `0000` | `0011` | `0000` | `0000 0000` |
| **1** | `0001` | `0100` | `0001` | `0000 0001` |
| **2** | `0010` | `0101` | `0010` | `0000 0010` |
| **3** | `0011` | `0110` | `0011` | `0000 0011` |
| **4** | `0100` | `0111` | `0100` | `0000 0100` |
| **5** | `0101` | `1000` | `1011` | `0000 0101` |
| **6** | `0110` | `1001` | `1100` | `0000 0110` |
| **7** | `0111` | `1010` | `1101` | `0000 0111` |
| **8** | `1000` | `1011` | `1110` | `0000 1000` |
| **9** | `1001` | `1100` | `1111` | `0000 1001` |

---

### 2. Densely Packed BCD (DPD) Forward Encoding Table

Let three decimal digits $d_1, d_2, d_3$ be represented in 8421 BCD as 12 bits:
$$\text{Digit 1: } (a\ b\ c\ d) \quad \text{Digit 2: } (e\ f\ g\ h) \quad \text{Digit 3: } (i\ j\ k\ m)$$
where $a, e, i$ are the Most Significant Bits (MSBs) indicating whether each digit is $\ge 8$ ($a,e,i = 1$) or $< 8$ ($a,e,i = 0$).

DPD maps these 12 bits into a 10-bit declet: $(p\ q\ r\ s\ t\ u\ v\ w\ x\ y)$ using the control bits $a, e, i$:

| $a$ | $e$ | $i$ | $p$ | $q$ | $r$ | $s$ | $t$ | $u$ | $v$ | $w$ | $x$ | $y$ | Description / Active Range |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| `0` | `0` | `0` | $b$ | $c$ | $d$ | $f$ | $g$ | $h$ | **`0`** | $j$ | $k$ | $m$ | All 3 digits $< 8$ (Small-Small-Small) |
| `0` | `0` | `1` | $b$ | $c$ | $d$ | $f$ | $g$ | $h$ | **`1`** | **`0`** | **`0`** | $m$ | Digit 3 is $\ge 8$ (Small-Small-Large) |
| `0` | `1` | `0` | $b$ | $c$ | $d$ | $j$ | $k$ | $h$ | **`1`** | **`0`** | **`1`** | $m$ | Digit 2 is $\ge 8$ (Small-Large-Small) |
| `0` | `1` | `1` | $b$ | $c$ | $d$ | **`1`** | **`0`** | $h$ | **`1`** | **`1`** | **`1`** | $m$ | Digits 2 & 3 are $\ge 8$ (Small-Large-Large) |
| `1` | `0` | `0` | $j$ | $k$ | $d$ | $f$ | $g$ | $h$ | **`1`** | **`1`** | **`0`** | $m$ | Digit 1 is $\ge 8$ (Large-Small-Small) |
| `1` | `0` | `1` | $f$ | $g$ | $d$ | **`0`** | **`1`** | $h$ | **`1`** | **`1`** | **`1`** | $m$ | Digits 1 & 3 are $\ge 8$ (Large-Small-Large) |
| `1` | `1` | `0` | $j$ | $k$ | $d$ | **`0`** | **`0`** | $h$ | **`1`** | **`1`** | **`1`** | $m$ | Digits 1 & 2 are $\ge 8$ (Large-Large-Small) |
| `1` | `1` | `1` | **`0`** | **`0`** | $d$ | **`1`** | **`1`** | $h$ | **`1`** | **`1`** | **`1`** | $m$ | All 3 digits $\ge 8$ (Large-Large-Large) |

---

### 3. Densely Packed BCD (DPD) Reverse Decoding Table

To reconstruct the original 12 BCD bits $(a\ b\ c\ d)\ (e\ f\ g\ h)\ (i\ j\ k\ m)$ from the 10-bit declet $(p\ q\ r\ s\ t\ u\ v\ w\ x\ y)$, we inspect the control bits $v, w, x$ (and $s, t$ when $vwx = 111_2$):

| Control Bits $v\ w\ x\ s\ t$ | Digit 1 ($a\ b\ c\ d$) | Digit 2 ($e\ f\ g\ h$) | Digit 3 ($i\ j\ k\ m$) | Decoded Condition |
| :---: | :---: | :---: | :---: | :--- |
| `0 . . . .` | `0` $p\ q\ r$ | `0` $s\ t\ u$ | `0` $w\ x\ y$ | $v = 0$: all three digits $< 8$ |
| `1 0 0 . .` | `0` $p\ q\ r$ | `0` $s\ t\ u$ | `1 0 0` $y$ | $d_3 \ge 8$ |
| `1 0 1 . .` | `0` $p\ q\ r$ | `1 0 0` $u$ | `0` $s\ t\ y$ | $d_2 \ge 8$ |
| `1 1 0 . .` | `1 0 0` $r$ | `0` $s\ t\ u$ | `0` $p\ q\ y$ | $d_1 \ge 8$ |
| `1 1 1 0 0` | `1 0 0` $r$ | `1 0 0` $u$ | `0` $p\ q\ y$ | $d_1, d_2 \ge 8$ |
| `1 1 1 0 1` | `1 0 0` $r$ | `0` $p\ q\ u$ | `1 0 0` $y$ | $d_1, d_3 \ge 8$ |
| `1 1 1 1 0` | `0` $p\ q\ r$ | `1 0 0` $u$ | `1 0 0` $y$ | $d_2, d_3 \ge 8$ |
| `1 1 1 1 1` | `1 0 0` $r$ | `1 0 0` $u$ | `1 0 0` $y$ | $d_1, d_2, d_3 \ge 8$ |

---

### 4. BCD Addition & Correction Mechanics

In 8421 BCD arithmetic, adding two 4-bit digits using a standard binary adder yields an intermediate 4-bit sum $S$ and binary carry $K$:
$$A_i + B_i + C_{\text{in}} = (K, S_3 S_2 S_1 S_0)_2$$

#### The Correction Condition:
A correction is required if and only if:
1. The intermediate binary sum exceeds $9$ ($1001_2$), meaning $S \in [1010_2, 1111_2]$, OR
2. A binary carry-out is generated ($K = 1$).

Boolean correction detection function:
$$C_{\text{out}} = K + S_3 S_2 + S_3 S_1$$

When $C_{\text{out}} = 1$:
- Add **$+6$ ($0110_2$)** to the intermediate 4-bit sum.
- Propagate a decimal carry $C_{\text{out}} = 1$ to the next higher decimal digit position.

**Why $+6$?** A 4-bit register has $2^4 = 16$ states, but decimal only uses $10$ states ($0 \dots 9$). Adding $+6$ skips the $6$ invalid states, aligning the arithmetic modulo-16 accumulator with base-10 modulo arithmetic ($16 - 10 = 6$).

---

## Worked Examples and Step-by-Step Problem Solutions

### Section 1: Forward Decimal to BCD Conversions

#### Problem 1: Encoding Decimal $989$

> **Problem Statement:**
> Convert the 3-digit decimal number $989$ into:
> 1. Packed BCD
> 2. Unpacked BCD
> 3. Densely Packed BCD (DPD)
>
> *Show bit-level derivations and total bit counts.*

##### Derivation:
- Decimal digits: $d_1 = 9, d_2 = 8, d_3 = 9$.
- 4-bit 8421 BCD for each digit:
  - $d_1 = 9 \to 1001_2 \implies a=1, b=0, c=0, d=1$
  - $d_2 = 8 \to 1000_2 \implies e=1, f=0, g=0, h=0$
  - $d_3 = 9 \to 1001_2 \implies i=1, j=0, k=0, m=1$

1. **Packed BCD:**
   - Concatenate 4-bit nibbles:
     $$\text{Packed BCD} = 1001\ 1000\ 1001_2$$
   - **Total Bit Count:** $3 \times 4 = 12$ bits ($1.5$ bytes).

2. **Unpacked BCD:**
   - Pad each 4-bit nibble to 8 bits with leading zeros:
     $$\text{Unpacked BCD} = 00001001\ 00001000\ 00001001_2$$
   - **Total Bit Count:** $3 \times 8 = 24$ bits ($3$ bytes).

3. **Densely Packed BCD (DPD):**
   - Check the MSBs: $a=1, e=1, i=1 \implies a\ e\ i = 1\ 1\ 1$ (All 3 digits $\ge 8$).
   - Lookup rule for $1\ 1\ 1$:
     $$p\ q\ r\ s\ t\ u\ v\ w\ x\ y = \mathbf{0\ 0}\ d\ \mathbf{1\ 1}\ h\ \mathbf{1\ 1\ 1}\ m$$
   - Substitute variable LSBs ($d=1, h=0, m=1$):
     - $p = 0$
     - $q = 0$
     - $r = d = 1$
     - $s = 1$
     - $t = 1$
     - $u = h = 0$
     - $v = 1$
     - $w = 1$
     - $x = 1$
     - $y = m = 1$
   - Form 10-bit declet:
     $$\text{DPD} = 0011101111_2 \quad (\text{Grouped: } 001\ 110\ 1\ 111_2)$$
   - **Total Bit Count:** $10$ bits.

---

#### Problem 2: Encoding Decimal $8808$

> **Problem Statement:**
> Convert the 4-digit decimal number $8808$ into:
> 1. Packed BCD
> 2. Unpacked BCD
> 3. Densely Packed BCD (DPD)
>
> *Show bit-level derivations and total bit counts.*

##### Derivation:
- Decimal digits: $d_1 = 8, d_2 = 8, d_3 = 0, d_4 = 8$.
- 4-bit 8421 BCD for each digit:
  - Digit $8 \to 1000_2$
  - Digit $8 \to 1000_2$
  - Digit $0 \to 0000_2$
  - Digit $8 \to 1000_2$

1. **Packed BCD:**
   - Concatenate 4-bit nibbles:
     $$\text{Packed BCD} = 1000\ 1000\ 0000\ 1000_2$$
   - **Total Bit Count:** $4 \times 4 = 16$ bits ($2$ bytes).

2. **Unpacked BCD:**
   - Pad each 4-bit nibble to 8 bits:
     $$\text{Unpacked BCD} = 00001000\ 00001000\ 00000000\ 00001000_2$$
   - **Total Bit Count:** $4 \times 8 = 32$ bits ($4$ bytes).

3. **Densely Packed BCD (DPD):**
   - DPD operates on 3-digit declet groups. A 4-digit number can be structured in two standard architectural conventions:
   
   - **Convention A (Standard 2 Declets with 6-digit Zero Padding):**
     Pad $8808$ to $6$ digits: $008\ 808$ ($2$ full declets).
     - **Declet 1 ($008$):** $d_1=0\,(0000_2), d_2=0\,(0000_2), d_3=8\,(1000_2)$
       - $a=0, e=0, i=1 \implies a\ e\ i = 0\ 0\ 1$
       - Rule: $b\ c\ d\ f\ g\ h\ \mathbf{1\ 0\ 0}\ m = 0\ 0\ 0\ 0\ 0\ 0\ 1\ 0\ 0\ 0_2 = 0000001000_2$
     - **Declet 2 ($808$):** $d_1=8\,(1000_2), d_2=0\,(0000_2), d_3=8\,(1000_2)$
       - $a=1, e=0, i=1 \implies a\ e\ i = 1\ 0\ 1$
       - Rule: $f\ g\ d\ \mathbf{0\ 1}\ h\ \mathbf{1\ 1\ 1}\ m = 0\ 0\ 0\ 0\ 1\ 0\ 1\ 1\ 1\ 0_2 = 0000101110_2$
     - Combined 2-declet DPD ($20$ bits):
       $$\text{DPD}_{20} = 0000001000\ 0000101110_2$$

   - **Convention B (1 Leading BCD Digit + 1 Declet for Lowest 3 Digits):**
     - Leading digit $8 \to 1000_2$ ($4$ bits)
     - Lowest 3 digits $808 \to 0000101110_2$ ($10$ bits)
     - Combined DPD ($14$ bits):
       $$\text{DPD}_{14} = 1000\ 0000101110_2$$

---

### Section 2: Reverse Densely Packed BCD (DPD) Decoding

#### Problem 3: Decoding DPD Declet `1001101011`

> **Problem Statement:**
> Given the 10-bit Densely Packed BCD string `1001101011`, reconstruct the original 3-digit decimal number using the DPD analysis method.

##### Step 1: Map 10 Bits to Declet Variables
$$\begin{array}{|c|c|c|c|c|c|c|c|c|c|}
\hline
p & q & r & s & t & u & v & w & x & y \\
\hline
1 & 0 & 0 & 1 & 1 & 0 & 1 & 0 & 1 & 1 \\
\hline
\end{array}$$

##### Step 2: Analyze Control Bits ($v, w, x$)
- Control bits: $v = 1, w = 0, x = 1 \implies vwx = 101_2$.

##### Step 3: Lookup Expansion Pattern
From the DPD decoding table, pattern $vwx = 101_2$ corresponds to:
- **Digit 1 ($a\ b\ c\ d$):** $0\ p\ q\ r$
- **Digit 2 ($e\ f\ g\ h$):** $1\ 0\ 0\ u$
- **Digit 3 ($i\ j\ k\ m$):** $0\ s\ t\ y$

##### Step 4: Substitute Bit Values
1. **Digit 1 ($a\ b\ c\ d$):**
   $$a=0, \quad b=p=1, \quad c=q=0, \quad d=r=0 \implies 0100_2 = \mathbf{4}$$
2. **Digit 2 ($e\ f\ g\ h$):**
   $$e=1, \quad f=0, \quad g=0, \quad h=u=0 \implies 1000_2 = \mathbf{8}$$
3. **Digit 3 ($i\ j\ k\ m$):**
   $$i=0, \quad j=s=1, \quad k=t=1, \quad m=y=1 \implies 0111_2 = \mathbf{7}$$

##### Step 5: Verification
- Re-encode decimal $\mathbf{487}$:
  - $4 = 0100_2 \implies a=0, b=1, c=0, d=0$
  - $8 = 1000_2 \implies e=1, f=0, g=0, h=0$
  - $7 = 0111_2 \implies i=0, j=1, k=1, m=1$
  - $a\ e\ i = 0\ 1\ 0 \implies b\ c\ d\ j\ k\ h\ 1\ 0\ 1\ m = 1\ 0\ 0\ 1\ 1\ 0\ 1\ 0\ 1\ 1_2 = 1001101011_2$ (Matches).

- **Final Decoded Decimal:** $\mathbf{487}$

---

#### Problem 4: Decoding DPD Declet `0100101111`

> **Problem Statement:**
> Given the 10-bit Densely Packed BCD string `0100101111`, reconstruct the original 3-digit decimal number using the DPD analysis method.

##### Step 1: Map 10 Bits to Declet Variables
$$\begin{array}{|c|c|c|c|c|c|c|c|c|c|}
\hline
p & q & r & s & t & u & v & w & x & y \\
\hline
0 & 1 & 0 & 0 & 1 & 0 & 1 & 1 & 1 & 1 \\
\hline
\end{array}$$

##### Step 2: Analyze Control Bits ($v, w, x, s, t$)
- Primary control bits: $v = 1, w = 1, x = 1 \implies vwx = 111_2$.
- Secondary control bits: $s = 0, t = 1 \implies st = 01_2$.
- Combined control code: $vwxst = 11101_2$.

##### Step 3: Lookup Expansion Pattern
From the DPD decoding table, pattern $vwxst = 11101_2$ corresponds to:
- **Digit 1 ($a\ b\ c\ d$):** $1\ 0\ 0\ r$
- **Digit 2 ($e\ f\ g\ h$):** $0\ p\ q\ u$
- **Digit 3 ($i\ j\ k\ m$):** $1\ 0\ 0\ y$

##### Step 4: Substitute Bit Values
1. **Digit 1 ($a\ b\ c\ d$):**
   $$a=1, \quad b=0, \quad c=0, \quad d=r=0 \implies 1000_2 = \mathbf{8}$$
2. **Digit 2 ($e\ f\ g\ h$):**
   $$e=0, \quad f=p=0, \quad g=q=1, \quad h=u=0 \implies 0010_2 = \mathbf{2}$$
3. **Digit 3 ($i\ j\ k\ m$):**
   $$i=1, \quad j=0, \quad k=0, \quad m=y=1 \implies 1001_2 = \mathbf{9}$$

##### Step 5: Verification
- Re-encode decimal $\mathbf{829}$:
  - $8 = 1000_2 \implies a=1, b=0, c=0, d=0$
  - $2 = 0010_2 \implies e=0, f=0, g=1, h=0$
  - $9 = 1001_2 \implies i=1, j=0, k=0, m=1$
  - $a\ e\ i = 1\ 0\ 1 \implies f\ g\ d\ 0\ 1\ h\ 1\ 1\ 1\ m = 0\ 1\ 0\ 0\ 1\ 0\ 1\ 1\ 1\ 1_2 = 0100101111_2$ (Matches).

- **Final Decoded Decimal:** $\mathbf{829}$

---

### Section 3: BCD Arithmetic & Multi-Format Storage Comparison

#### Problem 5: Step-by-Step BCD Addition ($67_{10} + 58_{10}$)

> **Problem Statement:**
> Perform the addition of decimal numbers $67$ and $58$ using 8421 BCD arithmetic. Show binary addition, $+6$ correction steps, and carry generation.

##### Step-by-Step Execution:
1. **Represent in 8421 BCD:**
   $$67_{10} = 0110\ 0111_{\text{BCD}}$$
   $$58_{10} = 0101\ 1000_{\text{BCD}}$$

2. **Add Least Significant Digits (Units Position: $7 + 8$):**
   ```text
     0111 (7)
   + 1000 (8)
   ------
     1111 (Raw binary sum = 15)
   ```
   - **Check condition:** Raw sum $1111_2 = 15 > 9$.
   - **Correction:** Add $+6$ ($0110_2$):
   ```text
     1111 (15)
   + 0110 (6)
   ------
    10101 -> Carry out = 1, Corrected sum nibble = 0101 (5)
   ```

3. **Add Most Significant Digits (Tens Position: $6 + 5 + \text{Carry } 1$):**
   ```text
     0110 (6)
   + 0101 (5)
   + 0001 (Carry in = 1)
   ------
     1100 (Raw binary sum = 12)
   ```
   - **Check condition:** Raw sum $1100_2 = 12 > 9$.
   - **Correction:** Add $+6$ ($0110_2$):
   ```text
     1100 (12)
   + 0110 (6)
   ------
    10010 -> Carry out = 1, Corrected sum nibble = 0010 (2)
   ```

4. **Assemble Final Result:**
   - Hundreds digit: $0001_2$ ($1$)
   - Tens digit: $0010_2$ ($2$)
   - Units digit: $0101_2$ ($5$)
   $$\text{Final BCD Sum} = 0001\ 0010\ 0101_{\text{BCD}} = \mathbf{125_{10}}$$

---

#### Comprehensive Multi-Format Storage Comparison Table

| Decimal Value | Unsigned Binary (Min Bits) | Packed BCD (8421) | Unpacked BCD | Densely Packed BCD (DPD) |
| :---: | :---: | :---: | :---: | :---: |
| **$7$** | `111` ($3$ bits) | `0111` ($4$ bits) | `0000 0111` ($8$ bits) | `000 000 0 111` ($10$ bits) |
| **$52$** | `110100` ($6$ bits) | `0101 0010` ($8$ bits) | `00000101 00000010` ($16$ bits) | `000 101 0 010` ($10$ bits) |
| **$183$** | `10110111` ($8$ bits) | `0001 1000 0011` ($12$ bits) | `00000001 00001000 00000011` ($24$ bits) | `001 010 1 011` ($10$ bits) |
| **$256$** | `100000000` ($9$ bits) | `0010 0101 0110` ($12$ bits) | `00000010 00000101 00000110` ($24$ bits) | `010 101 0 110` ($10$ bits) |
| **$489$** | `111101001` ($9$ bits) | `0100 1000 1001` ($12$ bits) | `00000100 00001000 00001001` ($24$ bits) | `100 100 1 111` ($10$ bits) |
| **$989$** | `1111011101` ($10$ bits) | `1001 1000 1001` ($12$ bits) | `00001001 00001000 00001001` ($24$ bits) | `001 110 1 111` ($10$ bits) |
| **$999$** | `1111100111` ($10$ bits) | `1001 1001 1001` ($12$ bits) | `00001001 00001001 00001001` ($24$ bits) | `001 111 1 111` ($10$ bits) |
| **$2401$** | `100101100001` ($12$ bits) | `0010 0100 0000 0001` ($16$ bits) | `4 \text{ bytes}` ($32$ bits) | `0000000010 1000000001` ($20$ bits) |

---

## Common Pitfalls & Edge Cases

> [!warning] Key BCD Implementation Pitfalls
> 1. **Omission of the $+6$ Correction on Binary Carry:** When a 4-bit addition generates a binary carry ($K=1$), even if the raw sum nibble appears $\le 9$ (e.g., $8 + 9 = 17 = 1\ 0001_2$, where lower nibble is $1$), adding $+6$ is **mandatory** to produce the correct digit ($0001_2 + 0110_2 = 0111_2 = 7$).
> 2. **Illegal States in 8421 BCD:** Nibbles in the range $1010_2 \dots 1111_2$ ($10 \dots 15$) are undefined in standard BCD. Decoders should treat these as invalid data exceptions unless assigned as sign codes ($0\text{xC}, 0\text{xD}$).
> 3. **DPD Bit Grouping Ordering:** DPD places the primary selector bit $v$ at position index $6$ (bit $7$ from the left). Misaligning $v, w, x$ with payload variables $p, q, r, s, t, u, y$ will corrupt the entire decoded decimal triplet.
> 4. **Self-Complementing Codes:** Excess-3 is self-complementing, meaning bitwise inversion directly yields the 9's complement. Natural 8421 BCD is **not** self-complementing, requiring explicit subtraction logic ($9 - D$).

---


## References & Navigation

- **Related Notes:** [[Integer Representation & Fixed-Point Arithmetic]]
