---
id: csarch2_finals_comprehensive_reviewer
type: reviewer
course: CSARCH2
topic: "CSARCH2 Comprehensive Reviewer and Practice Exam"
status: completed
---

# CSARCH2 Comprehensive Reviewer and Practice Exam

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Hardware Modeling]] #[[[REV] CSARCH2 Comprehensive Reviewer and Practice Exam]]

---

## Overview

> This comprehensive examination reviewer consolidates the complete theoretical, mathematical, and microarchitectural curriculum of Computer Systems Architecture 2 (CSARCH2). It covers all 17 course modules, spanning positional base conversions, 2's complement arithmetic and overflow detection, Carry Lookahead Adders, sequential and array multipliers, Booth's and Extended Booth's signed multiplication, restoring and non-restoring binary division, IEEE 754 binary and decimal floating-point representations, Unicode UTF encoding, single-bus CPU datapath organization, microprogramming control sequences, cache mapping architectures, cache replacement policies, virtual memory paging/TLB translation, and instruction pipelining hazards.

## Key Definitions

- **Arithmetic Logic Unit (ALU):** The core digital combinational and sequential execution engine that performs arithmetic operations and bitwise boolean evaluations.
- **Carry Lookahead Adder (CLA):** An optimized adder computing carries in parallel via Generate ($G_i = A_i B_i$) and Propagate ($P_i = A_i \oplus B_i$) functions with logarithmic delay $O(\log n)$.
- **Booth's Algorithm (Radix-2):** A signed multiplication algorithm that inspects adjacent bit pairs $(Q_0, Q_{-1})$ to replace contiguous strings of 1s with single add/subtract operations.
- **Extended Booth's Algorithm (Radix-4):** A bit-pair recoding technique evaluating 3-bit overlapping windows $(Q_{2i+1}, Q_{2i}, Q_{2i-1})$ to halve the number of multiplication cycles to $n/2$.
- **Non-Restoring Division:** A binary division algorithm that eliminates intermediate restoring additions by deferring corrections to subsequent cycles ($A \leftarrow 2A \pm M$).
- **IEEE 754 Binary Floating-Point:** A standardized binary real number format consisting of a Sign bit, a Biased Exponent ($E'$), and a Fraction ($f$), incorporating Denormals for gradual underflow.
- **Control Store:** An internal high-speed on-chip ROM/SRAM containing the microinstructions that generate control signals for instruction execution.
- **$k$-Way Set-Associative Cache:** A cache mapping scheme dividing storage into sets of $k$ lines, balancing the hardware simplicity of direct mapping with the conflict resilience of associativity.
- **Average Memory Access Time (AMAT):** $AMAT = t_{\text{hit}} + \text{Miss Rate} \times \text{Miss Penalty}$.
- **Translation Lookaside Buffer (TLB):** An on-chip associative cache inside the MMU holding recently translated Page Table Entries to accelerate virtual memory address resolution.
- **Pipeline Hazard:** A condition (Structural, Data, or Control) that prevents the next instruction in the instruction stream from executing in its designated clock cycle.

## Theoretical Framework / Core Concepts

### 1. Curriculum Architectural Map & Formula Matrix

```text
+-------------------------------------------------------------------------------+
|                      CSARCH2 COMPLETE FORMULA MATRIX                          |
|                                                                               |
| 1. CPU Execution Time:                                                        |
|    CPU Time = (Instruction Count * CPI) / Clock Frequency                     |
|                                                                               |
| 2. Amdahl's Law Speedup:                                                      |
|    S_overall = 1 / ((1 - F) + (F / k))                                        |
|                                                                               |
| 3. Signed 2's Complement Overflow:                                            |
|    V = C_n ^ C_{n-1}  (Overflow if carry into MSB != carry out of MSB)        |
|                                                                               |
| 4. Carry Lookahead Recurrences:                                               |
|    G_i = A_i * B_i,   P_i = A_i ^ B_i,   C_{i+1} = G_i + P_i * C_i            |
|                                                                               |
| 5. Radix-4 Booth's Multiplier Factor:                                         |
|    X_i = -2 * Q_{2i+1} + Q_{2i} + Q_{2i-1}                                    |
|                                                                               |
| 6. IEEE 754 Normalized Real Value:                                            |
|    Value = (-1)^S * (1.f)_2 * 2^(E' - Bias)                                   |
|    Single Prec: Bias = 127; Double Prec: Bias = 1023                          |
|    Denormalized: Value = (-1)^S * (0.f)_2 * 2^(1 - Bias)                      |
|                                                                               |
| 7. Cache Address Field Bit Splitting:                                         |
|    Offset bits: w = log2(Bytes per block)                                     |
|    Direct Map: Line bits k = log2(Lines), Tag bits t = n - k - w              |
|    k-Way Set:  Set bits s = log2(Sets = Lines/k), Tag bits t = n - s - w      |
|                                                                               |
| 8. Multi-Level AMAT:                                                          |
|    AMAT = t_h1 + m1 * (t_h2 + m2 * (t_h3 + m3 * t_DRAM))                      |
|                                                                               |
| 9. Ideal Pipeline Speedup:                                                    |
|    S_k = (n * k) / (k + n - 1) ---> k  (as n -> infinity)                     |
+-------------------------------------------------------------------------------+
```

## Worked Examples / Calculations / Hardware Traces

### Problem 1: Mixed-Base Number Conversion with Fractions
**Question:** Convert $(345.625)_{10}$ to Binary, Octal, and Hexadecimal.
**Solution:**
1. Integer part $(345)_{10}$ via successive division:
   - $345 / 2 = 172 \text{ rem } 1$
   - $172 / 2 = 86 \text{ rem } 0$
   - $86 / 2 = 43 \text{ rem } 0$
   - $43 / 2 = 21 \text{ rem } 1$
   - $21 / 2 = 10 \text{ rem } 1$
   - $10 / 2 = 5 \text{ rem } 0$
   - $5 / 2 = 2 \text{ rem } 1$
   - $2 / 2 = 1 \text{ rem } 0$
   - $1 / 2 = 0 \text{ rem } 1$
   Read upward: $(345)_{10} = (101011001)_2$.
2. Fractional part $(0.625)_{10}$ via successive multiplication:
   - $0.625 \times 2 = 1.25 \implies \text{peel } 1$
   - $0.25 \times 2 = 0.50 \implies \text{peel } 0$
   - $0.50 \times 2 = 1.00 \implies \text{peel } 1$
   Read downward: $(0.625)_{10} = (0.101)_2$.
3. **Binary:** $(101011001.101)_2$.
4. **Octal (Group 3 bits):** $\underbrace{101}_{5}\ \underbrace{011}_{3}\ \underbrace{001}_{1}\ .\ \underbrace{101}_{5} \implies (531.5)_8$.
5. **Hexadecimal (Group 4 bits):** $\underbrace{0001}_{1}\ \underbrace{0101}_{5}\ \underbrace{1001}_{9}\ .\ \underbrace{1010}_{A} \implies (159.A)_{16}$.

---

### Problem 2: 2's Complement Signed Addition and Overflow Trace
**Question:** Perform 5-bit signed addition: $A = 10110_2\ (-10_{10})$ and $B = 10101_2\ (-11_{10})$. Determine sum, carries $C_5, C_4$, unsigned overflow, and signed overflow ($V$).
**Solution:**
```text
  Carry:  1 0 1 0 0 0  (C5 = 1, C4 = 0)
      A:    1 0 1 1 0  (-10)
      B:    1 0 1 0 1  (-11)
  -------------------
    Sum:    0 1 0 1 1  (+11 in 5-bit 2's comp!)
```
- $C_5 = 1$, $C_4 = 0$.
- Unsigned Overflow $= C_5 = 1$.
- Signed Overflow $V = C_5 \oplus C_4 = 1 \oplus 0 = 1$.
- **Conclusion:** Signed overflow occurred because adding two negative numbers produced a positive result ($+11$ instead of true sum $-21$, which is outside 5-bit range $[-16, +15]$).

---

### Problem 3: Radix-2 Booth's Multiplication Trace ($(-5) \times (-4)$)
**Question:** Multiply 4-bit signed numbers $M = 1011_2\ (-5_{10})$ and $Q = 1100_2\ (-4_{10})$ using Booth's algorithm. Expected: $+20_{10} = 00010100_2$.
**Setup:**
- $M = 1011_2$, $-M = 0101_2$.
- Initial state: $A = 0000_2, Q = 1100_2, Q_{-1} = 0, \text{Count} = 4$.

| Cycle | $Q_0 Q_{-1}$ | Operation | $A$ | $Q$ | $Q_{-1}$ | Count |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **0** | — | **Init** | `0000` | `1100` | `0` | `4` |
| **1** | `00` | **ASR** | `0000` | `0110` | `0` | `3` |
| **2** | `00` | **ASR** | `0000` | `0011` | `0` | `2` |
| **3** | `10` | $A \leftarrow A - M$ (`0000 + 0101 = 0101`) | `0101` | `0011` | `0` | `2` |
| | | **ASR** | `0010` | `1001` | `1` | `1` |
| **4** | `11` | **ASR** | `0001` | `0100` | `1` | `0` |

- **Result:** $[A, Q] = 00010100_2 = 16 + 4 = +20_{10} \quad \checkmark$

---

### Problem 4: Non-Restoring Division Trace ($14 / 4$)
**Question:** Divide $D = 14_{10} = 1110_2$ ($n=4$) by $M = 4_{10} = 00100_2$ (5-bit) using Non-Restoring Division. Expected: $\text{Quotient} = 3\ (0011_2)$, $\text{Remainder} = 2\ (00010_2)$.

| Cycle | Prev $A$ Sign | Operation | $A$ | $Q$ | Count |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **0** | — | **Init** | `00000` | `1110` | `4` |
| **1** | $A \ge 0 \implies \text{SHL, SUB } M$ | $\text{SHL } [A, Q]$ | `00001` | `110_` | `4` |
| | | $A \leftarrow A - M\ (00001 - 00100 = 11101)$ | `11101` | `1100` | `3` ($A < 0 \implies Q_0 = 0$) |
| **2** | $A < 0 \implies \text{SHL, ADD } M$ | $\text{SHL } [A, Q]$ | `11011` | `100_` | `3` |
| | | $A \leftarrow A + M\ (11011 + 00100 = 11111)$ | `11111` | `1000` | `2` ($A < 0 \implies Q_0 = 0$) |
| **3** | $A < 0 \implies \text{SHL, ADD } M$ | $\text{SHL } [A, Q]$ | `11111` | `000_` | `2` |
| | | $A \leftarrow A + M\ (11111 + 00100 = 00011)$ | `00011` | `0001` | `1` ($A \ge 0 \implies Q_0 = 1$) |
| **4** | $A \ge 0 \implies \text{SHL, SUB } M$ | $\text{SHL } [A, Q]$ | `00110` | `001_` | `1` |
| | | $A \leftarrow A - M\ (00110 - 00100 = 00010)$ | `00010` | `0011` | `0` ($A \ge 0 \implies Q_0 = 1$) |

- **Result:** $\text{Quotient} = 0011_2 = 3_{10}$, $\text{Remainder} = 00010_2 = 2_{10} \quad \checkmark$

---

### Problem 5: Single-Bus CPU Microprogram for `MOV [EDI + EDX*4 + 0x30], EAX`
**Question:** Write the microinstruction control sequence for storing register `EAX` into memory with Scaled Index Base Displacement addressing.
**Solution:**
```text
1. PC_out, MAR_in, Read, Select4, ADD, Z_in  ; Universal Fetch 1
2. Z_out, PC_in, WMFC                        ; Universal Fetch 2
3. MDR_out, IR_in                            ; Universal Fetch 3 (Decode)
-------------------------------------------------------------------------
4. EDX_out, Select4, MUL, Z_in               ; Z = EDX * 4
5. Z_out, Y_in                               ; Y = EDX * 4
6. EDI_out, SelectY, ADD, Z_in               ; Z = EDI + (EDX * 4)
7. Z_out, Y_in                               ; Y = EDI + (EDX * 4)
8. IRAF_out, SelectY, ADD, Z_in              ; Z = 0x30 + EDI + (EDX * 4) [EA]
9. Z_out, MAR_in                             ; MAR = EA
10. EAX_out, MDR_in, Write                   ; Load EAX into MDR; issue Write
11. WMFC, END                                ; Wait for Write Complete
```

---

### Problem 6: 4-Way Set-Associative Cache Sizing & AMAT
**Question:** A 32-bit byte-addressable system has a $128\text{ KiB}$ 4-way set-associative cache with 64-byte blocks. L1 Hit Time $= 1.5\text{ ns}$, L1 Miss Rate $= 3\%$, Main DRAM Penalty $= 70\text{ ns}$.
1. Find address bits for TAG, SET, WORD.
2. Find total hardware bits required (including Tag, Valid, Dirty bits).
3. Compute Average Memory Access Time (AMAT).

**Solution:**
1. **Address Fields:**
   - Offset: $w = \log_2(64) = 6\text{ bits}$.
   - Total lines: $N = \frac{128 \times 1024}{64} = 2048\text{ lines}$.
   - Sets: $S = \frac{2048}{4} = 512\text{ sets} \implies s = \log_2(512) = 9\text{ bits}$.
   - Tag: $t = 32 - 9 - 6 = 17\text{ bits}$.
   - Format: $[\text{TAG: 17b} \mid \text{SET: 9b} \mid \text{OFFSET: 6b}]$.
2. **Total Hardware Bits:**
   $$\text{Bits per line} = (64 \times 8) + 17_{\text{tag}} + 1_{\text{valid}} + 1_{\text{dirty}} = 512 + 19 = 531\text{ bits}$$
   $$\text{Total Bits} = 2048 \times 531 = 1,087,488\text{ bits} = 135,936\text{ bytes} \approx 132.75\text{ KiB}$$
3. **AMAT:**
   $$AMAT = t_h + m \cdot t_p = 1.5\text{ ns} + (0.03 \times 70\text{ ns}) = 1.5 + 2.1 = 3.60\text{ ns}$$

## Complexity Analysis / Common Pitfalls

- **Confusing Radix-2 vs. Radix-4 Booth's Multipliers:** In Radix-2, we inspect pairs $(Q_0, Q_{-1})$ and shift by 1 bit ($ASR$). In Radix-4, we inspect triplets $(Q_{2i+1}, Q_{2i}, Q_{2i-1})$ and shift by 2 bits.
- **Forgetting the Biased Exponent Offset in Float Multiplication:** When multiplying floats, adding two biased exponents yields $E_x' + E_y' = E_x + E_y + 2 \cdot \text{Bias}$. Hardware must subtract one $\text{Bias}$ to restore the proper encoding.
- **Single-Bus Multiple Output Bus Contention:** In microprogramming questions, never assert two `_out` signals on the same step (e.g., `PC_out` and `EBX_out` simultaneously).


## References & Navigation

- **Related Notes:** [[Computer Architecture 2]]
