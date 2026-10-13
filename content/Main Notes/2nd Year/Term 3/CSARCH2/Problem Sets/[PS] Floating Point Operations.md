---
id: Problem-Set-Floating-Point-Operations
type: problem-set
course: CSARCH2
topic: Floating-Point Arithmetic Operations and Hardware Alignment
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Floating-Point Arithmetic]] #[[Exponent Alignment]] #[[Guard Round Sticky]] #[[Normalization]] #[[IEEE-754]]

---

# Problem Set: Floating-Point Operations & Hardware Alignment

## 📖 Overview & Theoretical Foundations

Floating-point addition and subtraction are significantly more complex than integer arithmetic because operands generally possess different exponents. Before significands can be added or subtracted, they must be shifted so that both numbers share a common exponent.

```text
                        Floating-Point Addition/Subtraction Pipeline
                        
┌───────────────────────┐     ┌───────────────────────┐
│  Operand 1 (s1,e1,m1) │     │  Operand 2 (s2,e2,m2) │
└──────────┬────────────┘     └──────────┬────────────┘
           │                             │
           └──────────────┬──────────────┘
                          ▼
            ┌───────────────────────────┐
            │ 1. Compare Exponents      │  Δe = |e1 - e2|
            └─────────────┬─────────────┘
                          ▼
            ┌───────────────────────────┐
            │ 2. Align Significands     │  Right-shift smaller significand by Δe;
            │    (Extract G, R, S bits) │  Capture Guard, Round, Sticky bits
            └─────────────┬─────────────┘
                          ▼
            ┌───────────────────────────┐
            │ 3. Add / Sub Significands │  Perform addition/subtraction on extended
            │    (with G, R, S)         │  significand + G, R, S registers
            └─────────────┬─────────────┘
                          ▼
            ┌───────────────────────────┐
            │ 4. Normalize Result       │  Shift left (cancellation) or right (carry)
            │    (Adjust Exponent)      │  Update exponent accordingly
            └─────────────┬─────────────┘
                          ▼
            ┌───────────────────────────┐
            │ 5. Round (IEEE-754)       │  Apply Round-to-Nearest-Even using G, R, S
            │    (Check Overflow/Under) │  Re-normalize if rounding causes carry
            └─────────────┬─────────────┘
                          ▼
            ┌───────────────────────────┐
            │ Final Repacked FP Result  │
            └───────────────────────────┘
```

---

### 1. Hardware Definition of Guard ($G$), Round ($R$), and Sticky ($S$) Bits

When right-shifting a significand by $\Delta e$ positions to align exponents:
- **Guard Bit ($G$):** The first bit shifted out past the register's least significant bit (position $2^{-(p)}$).
- **Round Bit ($R$):** The second bit shifted out past the register (position $2^{-(p+1)}$).
- **Sticky Bit ($S$):** The logical **OR** of all subsequent bits shifted out past the Round bit (positions $2^{-(p+2)}$ down to $2^{-\infty}$). Once $S$ becomes $1$, it remains $1$ under any further right shifts.

$$S_{\text{new}} = S_{\text{old}} \lor b_{\text{shifted\_past\_R}}$$

---

### 2. Comparison: Operations With vs. Without $G, R, S$

| Feature | With Guard, Round, Sticky Bits | Without Guard, Round, Sticky Bits (Truncation) |
| :--- | :--- | :--- |
| **Shift Handling** | Bits shifted out are preserved in $G, R, S$ registers | Bits shifted out are immediately discarded (zeroed) |
| **Rounding Accuracy** | Enables exact IEEE-754 Round to Nearest Even | Inherently performs pure truncation (Round toward 0) |
| **Error Bound** | Maximum error $\le \frac{1}{2}\text{ LSB}$ (ULP) | Maximum error $< 1\text{ LSB}$ (accumulates systematically) |
| **Cancellation Protection** | Preserves precision during catastrophic cancellation | Severe precision loss during close subtractions |

---

## ✍️ Problem Solutions

### Problem 1: Binary FP Addition WITH Guard, Round, and Sticky Bits (9-Bit System)

#### 📋 Problem Statement
Perform floating-point addition on the two binary operands in a system supporting a **9-bit significand** (1 integer bit + 8 fraction bits) using **Guard ($G$), Round ($R$), and Sticky ($S$) bits**:
$$\mathbf{A} = 1.0111110010011_2 \times 2^5$$
$$\mathbf{B} = 1.00111111100011_2 \times 2^3$$

---

#### 🔍 Step-by-Step Derivation

1. **Load Operands into 9-bit Registers:**
   - System register format: $1\text{ integer bit} + 8\text{ fraction bits} = 9\text{ bits total}$.
   - **Operand 1 ($A$):**
     - Significand: `1.01111100` (9 bits)
     - Auxiliary bits: $G = 0, R = 0, S = 0$
     - Exponent: $2^5$
   - **Operand 2 ($B$):**
     - Original source: `1.00111111 100011` $\times 2^3$
     - Exponent: $2^3$

2. **Exponent Alignment (Shift Smaller Operand $B$):**
   - Exponent difference:
     $$\Delta e = 5 - 3 = 2$$
   - Shift the significand of $B$ right by $2$ bit positions:
     - Original 9-bit register: `1.00111111`
     - **Shift 1:** `0.10011111` (bit `1` moves to $G$)
     - **Shift 2:** `0.01001111` (bit `1` moves from $G$ to $R$; bit `1` moves into $G$)
     - Tracking remaining source bits ($100011_2$):
       $$S = 1 \lor 0 \lor 0 \lor 0 \lor 1 \lor 1 = \mathbf{1}$$
   - **Aligned Operand 2:**
     - Significand (9 bits): `0.01001111`
     - $G = 1, R = 1, S = 1$
     - Exponent: $2^5$

3. **Significand Addition:**
   $$\begin{array}{r@{\quad}l@{\quad}c@{\,}c@{\,}c@{\quad}l}
     & \mathbf{1.01111100} & 0 & 0 & 0 & \times 2^5 \\
   + & \mathbf{0.01001111} & 1 & 1 & 1 & \times 2^5 \\
   \hline
     & \mathbf{1.11001011} & 1 & 1 & 1 & \times 2^5
   \end{array}$$

   *Bit-by-Bit Addition Detail:*
   $$\begin{aligned}
   \text{Bit 8 (LSB):} &\quad 0 + 1 = 1 \\
   \text{Bit 7:} &\quad 0 + 1 = 1 \\
   \text{Bit 6:} &\quad 1 + 1 = 0 \text{ (carry 1)} \\
   \text{Bit 5:} &\quad 1 + 1 + 1 = 1 \text{ (carry 1)} \\
   \text{Bit 4:} &\quad 1 + 0 + 1 = 0 \text{ (carry 1)} \\
   \text{Bit 3:} &\quad 1 + 0 + 1 = 0 \text{ (carry 1)} \\
   \text{Bit 2:} &\quad 0 + 1 + 1 = 0 \text{ (carry 1)} \\
   \text{Bit 1:} &\quad 0 + 0 + 1 = 1 \\
   \text{Bit 0 (Int):} &\quad 1 + 0 = 1 \\
   \implies &\quad \mathbf{1.11001011_2}
   \end{aligned}$$

4. **Normalization Check:**
   - Result significand is `1.11001011_2`.
   - The integer bit is already $1$. No shift is needed; the exponent remains $2^5$.

5. **Rounding (IEEE-754 Round to Nearest Even):**
   - Auxiliary bits: $G = 1, R = 1, S = 1$.
   - Since $G = 1$ and $(R = 1 \lor S = 1)$, the discarded part is strictly $> 0.5$ of the LSB unit.
   - **Action:** Round UP (add $1$ to LSB of the 9-bit significand):
     $$\begin{array}{r@{\quad}l}
       & 1.11001011 \\
     + & 0.00000001 \\
     \hline
       & \mathbf{1.11001100}
     \end{array}$$
   - Final Rounded Significand: `1.11001100` $\times 2^5$.

---

#### 📊 Result Summary Table (Problem 1)

| Row | Significand (9 bits) | G | R | S | $\text{Base}^{\text{Exp}}$ | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Operand 1** | `1.01111100` | 0 | 0 | 0 | $2^5$ | Unshifted primary operand |
| **Operand 2** | `0.01001111` | 1 | 1 | 1 | $2^5$ | Right-shifted by 2 positions |
| **Sum** | `1.11001011` | 1 | 1 | 1 | $2^5$ | Raw intermediate sum |
| **Sum (normalize & round)** | **`1.11001100`** | — | — | — | **$2^5$** | Rounded up ($G=1, R=1, S=1$) |

---

### Problem 2: Binary FP Addition WITHOUT Guard, Round, and Sticky Bits (9-Bit System)

#### 📋 Problem Statement
Perform floating-point addition on the same binary operands in a 9-bit system **WITHOUT Guard ($G$), Round ($R$), and Sticky ($S$) bits** (pure truncation):
$$\mathbf{A} = 1.0111110010011_2 \times 2^5$$
$$\mathbf{B} = 1.00111111100011_2 \times 2^3$$

---

#### 🔍 Step-by-Step Derivation

1. **Load Operands into 9-bit Registers (Truncated):**
   - **Operand 1 ($A$):** `1.01111100` $\times 2^5$
   - **Operand 2 ($B$):** `1.00111111` $\times 2^3$

2. **Exponent Alignment (Shift Right by 2 without GRS):**
   - Exponent difference $\Delta e = 5 - 3 = 2$.
   - Right-shifting `1.00111111` by $2$ bit positions:
     - The two least significant bits (`11`) shift past the register boundary and are **permanently lost (truncated)**.
     - **Aligned Operand 2:** `0.01001111` $\times 2^5$.

3. **Significand Addition:**
   $$\begin{array}{r@{\quad}l@{\quad}l}
     & \mathbf{1.01111100} & \times 2^5 \\
   + & \mathbf{0.01001111} & \times 2^5 \\
   \hline
     & \mathbf{1.11001011} & \times 2^5
   \end{array}$$

4. **Normalization & Final Value:**
   - Significand is `1.11001011_2` (already normalized).
   - Because no $G, R, S$ bits exist, no rounding can be performed.
   - Final Result: `1.11001011` $\times 2^5$.

---

#### 📊 Result Summary Table (Problem 2)

| Row | Significand (9 bits) | $\text{Base}^{\text{Exp}}$ | Notes |
| :--- | :---: | :---: | :--- |
| **Operand 1** | `1.01111100` | $2^5$ | Unshifted primary operand |
| **Operand 2** | `0.01001111` | $2^5$ | Shifted right 2; trailing bits lost |
| **Sum** | `1.11001011` | $2^5$ | Unrounded sum |
| **Sum (normalize)** | **`1.11001011`** | **$2^5$** | Pure truncated result |

---

#### 🔬 Error Analysis: Problem 1 vs. Problem 2
- **Result with G, R, S (Prob 1):** `1.11001100` $\times 2^5 = 60.0_{10}$
- **Result without G, R, S (Prob 2):** `1.11001011` $\times 2^5 = 59.875_{10}$
- **Discrepancy:**
  $$\Delta = (1.11001100_2 - 1.11001011_2) \times 2^5 = 0.00000001_2 \times 2^5 = 2^{-8} \times 2^5 = 2^{-3} = \mathbf{0.125_{10}} \text{ (1 LSB)}$$
- **Conclusion:** Omitting the Guard, Round, and Sticky bits causes a permanent loss of $1\text{ LSB}$ of precision due to premature truncation.

---

### Problem 3: Decimal FP Addition WITH Guard, Round, and Sticky Digits (7-Digit System)

#### 📋 Problem Statement
Perform floating-point addition in a system supporting **7 decimal digits** (1 integer digit + 6 fractional digits) using **Guard ($G$), Round ($R$), and Sticky ($S$) digits**:
$$\mathbf{A} = 9.726542319 \times 10^{15}$$
$$\mathbf{B} = 8.8736373412 \times 10^{13}$$

---

#### 🔍 Step-by-Step Derivation

1. **Load Operands into 7-digit Registers:**
   - Format: $1\text{ integer digit} + 6\text{ fractional digits} = 7\text{ digits total}$.
   - **Operand 1 ($A$):**
     - Significand: `9.726542` (7 digits)
     - Auxiliary digits: $G = 0, R = 0, S = 0$
     - Exponent: $10^{15}$
   - **Operand 2 ($B$):**
     - Source: `8.873637 3412` $\times 10^{13}$
     - Exponent: $10^{13}$

2. **Exponent Alignment (Shift Smaller Operand $B$):**
   - Exponent difference:
     $$\Delta e = 15 - 13 = 2$$
   - Shift significand of $B$ right by $2$ decimal places:
     - Original 7-digit register: `8.873637`
     - **Shift 1:** `0.887363` (digit `7` moves to $G$)
     - **Shift 2:** `0.088736` (digit `7` moves to $R$; digit `3` moves to $G$)
     - Sticky digit ($S$): Check remaining discarded source digits ($3, 4, 1, 2$):
       $$\text{Any non-zero digit exists} \implies S = \mathbf{1}$$
   - **Aligned Operand 2:**
     - Significand (7 digits): `0.088736`
     - $G = 3, R = 7, S = 1$
     - Exponent: $10^{15}$

3. **Significand Addition:**
   $$\begin{array}{r@{\quad}l@{\quad}c@{\,}c@{\,}c@{\quad}l}
     & \mathbf{9.726542} & 0 & 0 & 0 & \times 10^{15} \\
   + & \mathbf{0.088736} & 3 & 7 & 1 & \times 10^{15} \\
   \hline
     & \mathbf{9.815278} & 3 & 7 & 1 & \times 10^{15}
   \end{array}$$

   *Digit-by-Digit Addition Trace:*
   $$\begin{aligned}
   \text{Digit 6 (LSB):} &\quad 2 + 6 = 8 \\
   \text{Digit 5:} &\quad 4 + 3 = 7 \\
   \text{Digit 4:} &\quad 5 + 7 = 12 \text{ (write 2, carry 1)} \\
   \text{Digit 3:} &\quad 6 + 8 + 1 = 15 \text{ (write 5, carry 1)} \\
   \text{Digit 2:} &\quad 2 + 8 + 1 = 11 \text{ (write 1, carry 1)} \\
   \text{Digit 1:} &\quad 7 + 0 + 1 = 8 \\
   \text{Digit 0 (Int):} &\quad 9 + 0 = 9 \\
   \implies &\quad \mathbf{9.815278}
   \end{aligned}$$

4. **Normalization Check:**
   - Result significand is `9.815278` ($1 \le 9.815278 < 10$).
   - Already normalized; exponent remains $10^{15}$.

5. **Rounding:**
   - Guard digit: $G = 3$.
   - Since $G = 3 < 5$, the discarded part ($0.371\dots$) is strictly $< 0.5$ of the LSB unit.
   - **Action:** Round DOWN (Truncate $G, R, S$ digits).
   - Final Rounded Result: `9.815278` $\times 10^{15}$.

---

#### 📊 Result Summary Table (Problem 3)

| Row | Significand (7 digits) | G | R | S | $\text{Base}^{\text{Exp}}$ | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Operand 1** | `9.726542` | 0 | 0 | 0 | $10^{15}$ | Unshifted operand |
| **Operand 2** | `0.088736` | 3 | 7 | 1 | $10^{15}$ | Right-shifted by 2 places |
| **Sum** | `9.815278` | 3 | 7 | 1 | $10^{15}$ | Raw intermediate sum |
| **Sum (normalize & round)** | **`9.815278`** | — | — | — | **$10^{15}$** | Rounded down ($G=3 < 5$) |

---

### Problem 4: Decimal FP Addition WITHOUT Guard, Round, and Sticky Digits (7-Digit System)

#### 📋 Problem Statement
Perform floating-point addition on the same decimal operands in a 7-digit system **WITHOUT Guard ($G$), Round ($R$), and Sticky ($S$) digits** (pure truncation):
$$\mathbf{A} = 9.726542319 \times 10^{15}$$
$$\mathbf{B} = 8.8736373412 \times 10^{13}$$

---

#### 🔍 Step-by-Step Derivation

1. **Load Operands into 7-digit Registers (Truncated):**
   - **Operand 1 ($A$):** `9.726542` $\times 10^{15}$
   - **Operand 2 ($B$):** `8.873637` $\times 10^{13}$

2. **Exponent Alignment (Shift Right by 2 without GRS):**
   - $\Delta e = 15 - 13 = 2$.
   - Shift `8.873637` right by $2$ digits:
     - Digits `37` shift beyond the 7-digit register and are **immediately lost (truncated)**.
     - **Aligned Operand 2:** `0.088736` $\times 10^{15}$.

3. **Significand Addition:**
   $$\begin{array}{r@{\quad}l@{\quad}l}
     & \mathbf{9.726542} & \times 10^{15} \\
   + & \mathbf{0.088736} & \times 10^{15} \\
   \hline
     & \mathbf{9.815278} & \times 10^{15}
   \end{array}$$

4. **Normalization & Final Value:**
   - Significand is `9.815278` (already normalized).
   - Without $G, R, S$, no further rounding adjustments occur.
   - Final Result: `9.815278` $\times 10^{15}$.

---

#### 📊 Result Summary Table (Problem 4)

| Row | Significand (7 digits) | $\text{Base}^{\text{Exp}}$ | Notes |
| :--- | :---: | :---: | :--- |
| **Operand 1** | `9.726542` | $10^{15}$ | Unshifted operand |
| **Operand 2** | `0.088736` | $10^{15}$ | Shifted right 2; trailing digits truncated |
| **Sum** | `9.815278` | $10^{15}$ | Raw sum |
| **Sum (normalize)** | **`9.815278`** | **$10^{15}$** | Pure truncated result |

---

#### 💡 Comparative Insight: Why Problems 3 and 4 Produce the Same Result
- In Problem 3, the Guard digit was $G = 3$.
- Under IEEE-754 / standard rounding, any discarded fraction with $G < 5$ rounds **down** (which is identical to truncation).
- Therefore, both methods converged to `9.815278` $\times 10^{15}$.
- In contrast, in Problem 1, $G = 1$ with $R = 1$ in binary ($> 0.5$) forced a round **up**, causing the GRS result to differ from the non-GRS truncated result of Problem 2 by $1\text{ LSB}$.

---

## 💻 Python Verification Script

```python
def verify_operations():
    # Problem 1 & 2: Binary Addition
    op1_bin = 0b101111100  # 9 bits = 1.01111100
    op2_bin_orig = 0b10011111  # 8 frac bits = 1.00111111
    # Shift right by 2
    op2_bin_aligned = op2_bin_orig >> 2  # 0.01001111
    raw_sum_bin = op1_bin + op2_bin_aligned
    print(f"Prob 1/2 Raw Sum Binary: {bin(raw_sum_bin)} (Expected: 0b111001011 -> 1.11001011)")

    # Rounding Prob 1: G=1, R=1, S=1 -> Round UP (+1 LSB)
    rounded_sum_bin = raw_sum_bin + 1
    print(f"Prob 1 Rounded Sum Binary: {bin(rounded_sum_bin)} (Expected: 0b111001100 -> 1.11001100)")

    # Problem 3 & 4: Decimal Addition
    op1_dec = 9.726542
    op2_dec_aligned = 0.088736
    sum_dec = round(op1_dec + op2_dec_aligned, 6)
    print(f"Prob 3/4 Decimal Sum: {sum_dec:.6f} (Expected: 9.815278)")

verify_operations()
```

---

## 🔑 Key Takeaways & Exam Summary

1. **Alignment Shift Direction:**
   - Always shift the operand with the **smaller exponent to the right** ($\Delta e = e_1 - e_2$).
   - Never shift the larger exponent left, as this would cause integer overflow out of the significand register.
2. **Auxiliary Bit Functionality:**
   - $G$ and $R$ capture the first two bits shifted out during alignment.
   - $S$ acts as a cumulative OR reduction: $S \leftarrow S \lor b$.
3. **Rounding Penalty without GRS:**
   - Omitting $G, R, S$ bits introduces systematic truncation bias and leads to $1\text{ ULP}$ error whenever discarded bits exceed $\frac{1}{2}\text{ LSB}$.
4. **Normalization after Addition:**
   - If an addition generates a carry out of the MSB ($1x.xxxx$), right-shift the significand by $1$ and increment the exponent by $+1$.
   - If subtraction cancels leading bits ($0.001xx$), left-shift until the MSB is $1$ and decrement the exponent accordingly.


## References & Navigation

- **Related Notes:** [[Floating-Point Operations & Errors]]
