---
id: problem_set_unicode_and_character_representation
type: note
course: CSARCH2
topic: "Problem Set - Unicode and Character Representation"
status: completed
---

# Problem Set - Unicode and Character Representation

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Data Representation]] #[[Unicode]] #[[Character Encoding]]

---

## Overview

> Character data representation is a foundational pillar of computer systems, bridging human-readable textual symbols with low-level binary architectures. While standard $7$-bit ASCII historically sufficed for basic English alphanumeric characters, global computing necessitated the **Unicode Worldwide Character Standard**, defining over $1.1$ million code points ($\text{U+000000}$ through $\text{U+10FFFF}$) partitioned across $17$ discrete planes. This problem set investigates the mathematical mechanics and bit-level transformations required to encode Unicode code points into variable-length **UTF-8** (1 to 4 octets), variable-length **UTF-16** (using single 16-bit wydes or surrogate pairs with high and low surrogate offsets), and fixed-width **UTF-32**, alongside memory endianness considerations and byte order marks (BOM).

---

## Key Definitions

- **Character Repertoire:** A collection of distinct abstract symbols and typographic glyphs (e.g., Latin letters, Greek alphabets, CJK ideographs, mathematical symbols, and emoji).
- **Code Point:** An integer value assigned to a specific abstract character within the Unicode codespace, conventionally denoted in hexadecimal as $\text{U+XXXX}$ or $\text{U+XXXXXX}$.
- **Unicode Plane:** A contiguous block of $65{,}536$ ($2^{16}$) code points. Unicode encompasses $17$ planes (Plane $0$ to Plane $16$), spanning $\text{U+0000}$ to $\text{U+10FFFF}$ for a total capacity of $17 \times 65{,}536 = 1{,}114{,}112$ code points.
  - **Plane 0 (BMP - Basic Multilingual Plane):** $\text{U+0000}$ to $\text{U+FFFF}$. Contains characters for virtually all modern written scripts and standard symbols.
  - **Plane 1 (SMP - Supplementary Multilingual Plane):** $\text{U+010000}$ to $\text{U+01FFFF}$. Historic scripts, musical notation, and emoji.
  - **Plane 2 (SIP - Supplementary Ideographic Plane):** $\text{U+020000}$ to $\text{U+02FFFF}$. Rare and historic CJK unified ideographs.
  - **Plane 14 (SSP - Supplementary Special-purpose Plane):** $\text{U+0E0000}$ to $\text{U+0EFFFF}$. Tag characters and variation selectors.
  - **Planes 15 & 16 (SPUA-A & SPUA-B - Supplementary Private Use Areas):** $\text{U+0F0000}$ to $\text{U+10FFFF}$. User/vendor-defined private characters.
- **Code Unit:** The fundamental minimal bit combination used by a specific encoding scheme to represent encoded text (e.g., 8-bit octet for UTF-8, 16-bit wyde for UTF-16, 32-bit dword for UTF-32).
- **UTF-8 (Unicode Transformation Format - 8-bit):** A variable-width encoding format mapping code points to $1$, $2$, $3$, or $4$ bytes. It is backward-compatible with 7-bit ASCII and self-synchronizing.
- **UTF-16 (Unicode Transformation Format - 16-bit):** A variable-width encoding format mapping code points to either one 16-bit unit (for BMP characters $\le \text{U+FFFF}$) or two 16-bit units (**Surrogate Pairs**) for supplementary planes ($\text{U+10000}$ to $\text{U+10FFFF}$).
- **UTF-32 (Unicode Transformation Format - 32-bit):** A fixed-width 32-bit encoding where every code point is directly zero-extended to an unsigned 32-bit integer.
- **Surrogate Pair:** A pair of 16-bit code units (High Surrogate in $[0\text{xD800}, 0\text{xDBFF}]$ and Low Surrogate in $[0\text{xDC00}, 0\text{xDFFF}]$) used exclusively in UTF-16 to encode characters in supplementary planes.
- **Byte Order Mark (BOM):** The Unicode character $\text{U+FEFF}$ placed at the beginning of a data stream to signal endianness (Big-Endian vs Little-Endian).

---

## Theoretical Framework & Encoding Mechanics

### 1. UTF-8 Encoding Scheme

UTF-8 partitions the code space into four distinct bit-length ranges. Prefix bits in the first octet indicate the total byte length, while continuation octets strictly start with prefix bits `10`:

| Code Point Range (Hex) | Character Range | Code Point Bits ($N$) | Byte Count | Byte 1 (Prefix + Payload) | Byte 2 | Byte 3 | Byte 4 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| $\text{U+0000} \dots \text{U+007F}$ | ASCII subset | $7$ bits | $1$ | `0xxxxxxx` | — | — | — |
| $\text{U+0080} \dots \text{U+07FF}$ | Latin-1, Greek, Arabic | $11$ bits | $2$ | `110xxxxx` | `10xxxxxx` | — | — |
| $\text{U+0800} \dots \text{U+FFFF}$ | Rest of BMP (CJK, symbols) | $16$ bits | $3$ | `1110xxxx` | `10xxxxxx` | `10xxxxxx` | — |
| $\text{U+10000} \dots \text{U+10FFFF}$ | Supplementary Planes | $21$ bits | $4$ | `11110xxx` | `10xxxxxx` | `10xxxxxx` | `10xxxxxx` |

#### UTF-8 Properties:
1. **ASCII Backward Compatibility:** Standard ASCII values ($0\text{x00} \dots 0\text{x7F}$) encode to identical single bytes ($00000000_2 \dots 01111111_2$).
2. **Self-Synchronization & Error Resilience:** If bytes are corrupted or lost during transmission, a decoder can immediately locate the start of the next character by searching for an octet not starting with `10xxxxxx`.
3. **No Endianness Ambiguity:** Because the code unit is an 8-bit octet, UTF-8 is byte-order agnostic and does not require endian serialization flags.

---

### 2. UTF-16 Encoding Scheme & Surrogate Calculations

UTF-16 processes code points according to their plane:

1. **Basic Multilingual Plane ($\text{U+0000} \le U \le \text{U+FFFF}$):**
   - Encoded directly as a single 16-bit word:
     $$\text{UTF-16}(U) = U$$
   - The code point sub-range $\text{U+D800} \dots \text{U+DFFF}$ is permanently reserved for surrogates and contains no assigned characters.

2. **Supplementary Planes ($\text{U+010000} \le U \le \text{U+10FFFF}$):**
   - A code point in this range requires $20$ bits of information.
   - **Step 1: Shift / Offset Calculation:**
     $$W = U - 0\text{x10000} \quad (0 \le W \le 0\text{xFFFFF})$$
     Here $W$ is a 20-bit binary integer: $W = w_{19} w_{18} \dots w_1 w_0$.
   - **Step 2: Partition into 10-bit Halves:**
     - High 10 bits ($W_{\text{upper}}$):
       $$W_{\text{upper}} = \lfloor W / 2^{10} \rfloor = W \gg 10 = w_{19..10} \quad (0 \le W_{\text{upper}} \le 0\text{x3FF})$$
     - Low 10 bits ($W_{\text{lower}}$):
       $$W_{\text{lower}} = W \pmod{2^{10}} = W \ \& \ 0\text{x3FF} = w_{9..0} \quad (0 \le W_{\text{lower}} \le 0\text{x3FF})$$
   - **Step 3: Add Surrogate Base Offsets:**
     - **High Surrogate ($S_{\text{high}}$):**
       $$S_{\text{high}} = 0\text{xD800} + W_{\text{upper}} \quad (\text{Range: } 0\text{xD800} \dots 0\text{xDBFF})$$
     - **Low Surrogate ($S_{\text{low}}$):**
       $$S_{\text{low}} = 0\text{xDC00} + W_{\text{lower}} \quad (\text{Range: } 0\text{xDC00} \dots 0\text{xDFFF})$$
   - The final encoded sequence is the pair of 16-bit words: $[S_{\text{high}}, S_{\text{low}}]$.

---

### 3. UTF-32 Encoding Scheme

UTF-32 represents every Unicode code point $U$ directly as a 32-bit unsigned integer (4 bytes):
$$\text{UTF-32}(U) = 0\text{x00} \,\|\, U_{23..16} \,\|\, U_{15..8} \,\|\, U_{7..0} = 0\text{x00000000} \dots 0\text{x0010FFFF}$$

While UTF-32 offers $O(1)$ random indexing for characters, it incurs significant memory overhead (up to 4× memory waste for ASCII-heavy text).

---

### 4. Endianness and Byte Order Mark (BOM)

Because 16-bit and 32-bit code units span multiple bytes in physical memory, byte serialization depends on hardware architecture:

| Encoding Format | BOM Character ($\text{U+FEFF}$) Byte Sequence | Byte Order Interpretation |
| :--- | :--- | :--- |
| **UTF-8** | `EF BB BF` | Optional marker (signals UTF-8 encoding; no endianness). |
| **UTF-16BE** | `FE FF` | Most Significant Byte (MSB) stored first. |
| **UTF-16LE** | `FF FE` | Least Significant Byte (LSB) stored first. |
| **UTF-32BE** | `00 00 FE FF` | MSB stored at lowest address. |
| **UTF-32LE** | `FF FE 00 00` | LSB stored at lowest address. |

---

## Worked Examples and Step-by-Step Problem Solutions

### Problem 1: Encoding Code Point $\text{U+10CAFE}$

> **Problem Statement:**
> Given the Unicode code point $\text{U+10CAFE}$, determine its binary and hexadecimal representations in:
> 1. UTF-8
> 2. UTF-16
> 3. UTF-32
>
> *Show all intermediate steps, bit allocation templates, and final hex values.*

#### Step 1: Analyze Code Point and Select Templates
- Hexadecimal code point: $U = 0\text{x10CAFE}$
- Decimal value: $1{,}100{,}542$
- Range check: $\text{U+10000} \le U \le \text{U+10FFFF}$ (Plane 16 - Supplementary Private Use Area-B).
- Binary expansion of $0\text{x10CAFE}$ ($21$ bits):
  $$0\text{x10CAFE} = 0001\ 0000\ 1100\ 1010\ 1111\ 1110_2 \implies 1\ 0000\ 1100\ 1010\ 1111\ 1110_2$$

---

#### Step 2: Derive UTF-8 Representation
For $U \in [\text{U+10000}, \text{U+10FFFF}]$, UTF-8 uses a $4$-byte template:
$$\text{Template: } \mathbf{11110}xxx \quad \mathbf{10}xxxxxx \quad \mathbf{10}xxxxxx \quad \mathbf{10}xxxxxx$$

Partition the 21 payload bits from right to left:
- **Payload bits:** `1 0000 1100 1010 1111 1110`
- Group 4 (LSB 6 bits): `111110` $\to$ Byte 4: `10` + `111110` $= 10111110_2 = 0\text{xBE}$
- Group 3 (Next 6 bits): `101011` $\to$ Byte 3: `10` + `101011` $= 10101011_2 = 0\text{xAB}$
- Group 2 (Next 6 bits): `001100` $\to$ Byte 2: `10` + `001100` $= 10001100_2 = 0\text{x8C}$
- Group 1 (MSB 3 bits): `100` $\to$ Byte 1: `11110` + `100` $= 11110100_2 = 0\text{xF4}$

```text
Byte 1: [11110 100] = 11110100_2 = 0xF4
Byte 2: [10 001100] = 10001100_2 = 0x8C
Byte 3: [10 101011] = 10101011_2 = 0xAB
Byte 4: [10 111110] = 10111110_2 = 0xBE
```

- **UTF-8 Binary:** `11110100 10001100 10101011 10111110`
- **UTF-8 Hex:** `F4 8C AB BE` (or `0xF48CABBE`)

---

#### Step 3: Derive UTF-16 Representation (Surrogate Pair Calculation)
Since $U \ge \text{U+10000}$, UTF-16 requires a surrogate pair $[S_{\text{high}}, S_{\text{low}}]$:

1. **Subtract base offset $0\text{x10000}$:**
   $$W = 0\text{x10CAFE} - 0\text{x10000} = 0\text{x0FCAFE}$$
   In binary (20 bits):
   $$W = 0000\ 1111\ 1100\ 1010\ 1111\ 1110_2 = 1111\ 1100\ 1010\ 1111\ 1110_2$$

2. **Split $W$ into upper and lower 10-bit words:**
   - Upper 10 bits ($W_{19..10}$):
     $$W_{19..10} = W \gg 10 = \lfloor 1034982 / 1024 \rfloor = 1010 = 0\text{x03F2} = 1111110010_2$$
   - Lower 10 bits ($W_{9..0}$):
     $$W_{9..0} = W \ \& \ 0\text{x3FF} = 1034982 \pmod{1024} = 766 = 0\text{x02FE} = 1011111110_2$$

3. **Compute Surrogates:**
   - **High Surrogate ($S_{\text{high}}$):**
     $$S_{\text{high}} = 0\text{xD800} + W_{19..10} = 0\text{xD800} + 0\text{x03F2} = 0\text{xDBF2}$$
     $$\text{Binary: } 1101\ 1011\ 1111\ 0010_2$$
   - **Low Surrogate ($S_{\text{low}}$):**
     $$S_{\text{low}} = 0\text{xDC00} + W_{9..0} = 0\text{xDC00} + 0\text{x02FE} = 0\text{xDEFE}$$
     $$\text{Binary: } 1101\ 1110\ 1111\ 1110_2$$

- **UTF-16 Code Units:** `0xDBF2 0xDEFE`
- **UTF-16 Hex (Big-Endian):** `DB F2 DE FE`
- **UTF-16 Hex (Little-Endian):** `F2 DB FE DE`

---

#### Step 4: Derive UTF-32 Representation
Directly zero-extend the 21-bit code point to 32 bits:
$$\text{UTF-32} = 0\text{x0010CAFE}$$

- **UTF-32 Binary:** `00000000 00010000 11001010 11111110`
- **UTF-32 Hex (Big-Endian):** `00 10 CA FE`
- **UTF-32 Hex (Little-Endian):** `FE CA 10 00`

---

### Problem 2: Encoding Code Point $\text{U+FCAFE}$

> **Problem Statement:**
> Given the Unicode code point $\text{U+FCAFE}$, determine its binary and hexadecimal representations in:
> 1. UTF-8
> 2. UTF-16
> 3. UTF-32
>
> *Show all intermediate steps, bit allocation templates, and final hex values.*

#### Step 1: Analyze Code Point and Select Templates
- Hexadecimal code point: $U = 0\text{xFCAFE}$
- Decimal value: $1{,}035{,}006$
- Range check: $\text{U+10000} \le U \le \text{U+10FFFF}$ (Plane 15 - Supplementary Private Use Area-A).
- Binary expansion of $0\text{xFCAFE}$ ($20$ bits, padded to $21$ bits):
  $$0\text{xFCAFE} = 0000\ 1111\ 1100\ 1010\ 1111\ 1110_2 \implies 0\ 1111\ 1100\ 1010\ 1111\ 1110_2$$

---

#### Step 2: Derive UTF-8 Representation
4-byte UTF-8 template:
$$\text{Template: } \mathbf{11110}xxx \quad \mathbf{10}xxxxxx \quad \mathbf{10}xxxxxx \quad \mathbf{10}xxxxxx$$

Partition the 21 payload bits (`0 1111 1100 1010 1111 1110`):
- Group 4 (LSB 6 bits): `111110` $\to$ Byte 4: `10` + `111110` $= 10111110_2 = 0\text{xBE}$
- Group 3 (Next 6 bits): `101011` $\to$ Byte 3: `10` + `101011` $= 10101011_2 = 0\text{xAB}$
- Group 2 (Next 6 bits): `111100` $\to$ Byte 2: `10` + `111100` $= 10111100_2 = 0\text{xBC}$
- Group 1 (MSB 3 bits): `011` $\to$ Byte 1: `11110` + `011` $= 11110011_2 = 0\text{xF3}$

```text
Byte 1: [11110 011] = 11110011_2 = 0xF3
Byte 2: [10 111100] = 10111100_2 = 0xBC
Byte 3: [10 101011] = 10101011_2 = 0xAB
Byte 4: [10 111110] = 10111110_2 = 0xBE
```

- **UTF-8 Binary:** `11110011 10111100 10101011 10111110`
- **UTF-8 Hex:** `F3 BC AB BE` (or `0xF3BCABBE`)

---

#### Step 3: Derive UTF-16 Representation (Surrogate Pair Calculation)
Since $U \ge \text{U+10000}$, compute the surrogate pair:

1. **Subtract base offset $0\text{x10000}$:**
   $$W = 0\text{xFCAFE} - 0\text{x10000} = 0\text{xECAFE}$$
   In binary (20 bits):
   $$W = 1110\ 1100\ 1010\ 1111\ 1110_2$$

2. **Split $W$ into upper and lower 10-bit words:**
   - Upper 10 bits ($W_{19..10}$):
     $$W_{19..10} = W \gg 10 = \lfloor 969470 / 1024 \rfloor = 946 = 0\text{x03B2} = 1110110010_2$$
   - Lower 10 bits ($W_{9..0}$):
     $$W_{9..0} = W \ \& \ 0\text{x3FF} = 969470 \pmod{1024} = 766 = 0\text{x02FE} = 1011111110_2$$

3. **Compute Surrogates:**
   - **High Surrogate ($S_{\text{high}}$):**
     $$S_{\text{high}} = 0\text{xD800} + W_{19..10} = 0\text{xD800} + 0\text{x03B2} = 0\text{xDBB2}$$
     $$\text{Binary: } 1101\ 1011\ 1011\ 0010_2$$
   - **Low Surrogate ($S_{\text{low}}$):**
     $$S_{\text{low}} = 0\text{xDC00} + W_{9..0} = 0\text{xDC00} + 0\text{x02FE} = 0\text{xDEFE}$$
     $$\text{Binary: } 1101\ 1110\ 1111\ 1110_2$$

- **UTF-16 Code Units:** `0xDBB2 0xDEFE`
- **UTF-16 Hex (Big-Endian):** `DB B2 DE FE`
- **UTF-16 Hex (Little-Endian):** `B2 DB FE DE`

---

#### Step 4: Derive UTF-32 Representation
Directly zero-extend to 32 bits:
$$\text{UTF-32} = 0\text{x000FCAFE}$$

- **UTF-32 Binary:** `00000000 00001111 11001010 11111110`
- **UTF-32 Hex (Big-Endian):** `00 0F CA FE`
- **UTF-32 Hex (Little-Endian):** `FE CA 0F 00`

---

### Comparative Summary Table

| Character Code Point | Unicode Name / Category | UTF-8 (Hex) | UTF-16BE (Hex) | UTF-32BE (Hex) | Total Storage (Bytes) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`U+0041`** | Basic Latin 'A' | `41` | `00 41` | `00 00 00 41` | UTF-8: 1B, UTF-16: 2B, UTF-32: 4B |
| **`U+03A3`** | Greek Capital Sigma '$\Sigma$' | `CE A3` | `03 A3` | `00 00 03 A3` | UTF-8: 2B, UTF-16: 2B, UTF-32: 4B |
| **`U+20AC`** | Currency Euro '€' | `E2 82 AC` | `20 AC` | `00 00 20 AC` | UTF-8: 3B, UTF-16: 2B, UTF-32: 4B |
| **`U+245D6`** | CJK Extension B Ideograph | `F0 A4 97 96` | `D8 51 DD D6` | `00 02 45 D6` | UTF-8: 4B, UTF-16: 4B, UTF-32: 4B |
| **`U+FCAFE`** | Supplementary Private Use Area-A | `F3 BC AB BE` | `DB B2 DE FE` | `00 0F CA FE` | UTF-8: 4B, UTF-16: 4B, UTF-32: 4B |
| **`U+10CAFE`** | Supplementary Private Use Area-B | `F4 8C AB BE` | `DB F2 DE FE` | `00 10 CA FE` | UTF-8: 4B, UTF-16: 4B, UTF-32: 4B |

---

## Common Pitfalls & Edge Cases

> [!warning] Critical Encoding Traps
> 1. **Overlong Encodings in UTF-8:** A security vulnerability where a character is encoded using more bytes than necessary (e.g., encoding ASCII `'A'` ($0\text{x41}$) as `11000001 10000001_2` ($0\text{xC1} \, 0\text{x81}$) instead of `01000001_2` ($0\text{x41}$)). Decoders **must reject** overlong sequences to prevent path traversal or filtering bypass attacks.
> 2. **Illegal Surrogate Code Points in UTF-8/UTF-32:** The surrogate range $\text{U+D800} \dots \text{U+DFFF}$ is designated strictly for UTF-16 surrogate pairs. Direct encoding of individual surrogate halves into UTF-8 or UTF-32 is strictly prohibited by RFC 3629 / Unicode Standard.
> 3. **Endianness Confusion in UTF-16:** UTF-16 code units require endianness specification when transmitted over byte streams. `0xDBF2 0xDEFE` in UTF-16BE becomes `F2 DB FE DE` in UTF-16LE. Missing BOM markers can lead to inverted character interpretation.
> 4. **Surrogate Math Off-by-One:** Forgetting to subtract $0\text{x10000}$ before splitting into 10-bit chunks yields an invalid surrogate range exceeding $0\text{xDBFF}$.

---


## References & Navigation

- **Related Notes:** [[Integer Representation & Fixed-Point Arithmetic]]
