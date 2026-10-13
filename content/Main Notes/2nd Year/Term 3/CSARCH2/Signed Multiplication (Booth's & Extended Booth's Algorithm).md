---
id: csarch2_module_05_signed_mul
type: note
course: CSARCH2
topic: "Signed Multiplication (Booth's & Extended Booth's Algorithm)"
status: completed
---

# Module 05: Signed Multiplication (Booth's & Extended Booth's Algorithm)

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Hardware Modeling]] #[[Signed Multiplication (Booth's & Extended Booth's Algorithm)]]

---

## Overview

> Multiplying signed integers in 2's complement representation poses distinct architectural challenges because the Most Significant Bit (MSB) carries a negative positional weight ($-2^{n-1}$). Simple shift-and-add algorithms fail for negative operands without cumbersome sign-extension corrections. This module analyzes the mathematical foundations of signed multiplication, beginning with paper-and-pencil 2's complement multiplication. We then formalize **Booth's Algorithm (Radix-2)**, which treats contiguous blocks of `1`s as single algebraic operations, and **Extended Booth's Algorithm (Radix-4 Bit-Pair Recoding)**, which halves the required adder cycles and partial products by inspecting three multiplier bits simultaneously.

## Key Definitions

- **Radix-2 Booth's Recoding:** A technique that encodes an $n$-bit multiplier into signed digits $\{-1, 0, +1\}$ by inspecting adjacent bit pairs $(Q_i, Q_{i-1})$, transforming consecutive sequences of additions into a single addition and a single subtraction.
- **Extended Booth's Algorithm (Radix-4 Bit-Pair Recoding):** An optimized multiplication algorithm that evaluates triplets of overlapping multiplier bits $(Q_{2i+1}, Q_{2i}, Q_{2i-1})$ to generate multiplier factors in the set $\{-2, -1, 0, +1, +2\}$, reducing total partial products to $\lceil n/2 \rceil$.
- **$Q_{-1}$ Flip-Flop:** An implicit 1-bit register appended to the right of the multiplier register $Q$, initialized to `0`, used to store the bit shifted out of the multiplier during Arithmetic Shift Right.
- **Arithmetic Shift Right ($ASR$):** A shift operation that moves all bits of the composite register $[A, Q, Q_{-1}]$ one position to the right while **replicating the sign bit** ($A_{n-1}$) in $A_{n-1}$, preserving the mathematical sign of negative 2's complement numbers.
- **String Property of 1s:** The mathematical identity showing that a contiguous run of `1`s from position $m$ to $k$ ($k > m$) can be evaluated as:
  $$2^k + 2^{k-1} + \dots + 2^m = 2^{k+1} - 2^m$$

## Theoretical Framework / Core Concepts

### 1. The Challenge of Signed 2's Complement Multiplication

Let $M$ and $Q$ be $n$-bit 2's complement numbers. The multiplier $Q$ is formally expressed as:
$$Q = -Q_{n-1} 2^{n-1} + \sum_{i=0}^{n-2} Q_i 2^i$$

If $Q$ is negative ($Q_{n-1} = 1$), its MSB must be subtracted rather than added:
$$P = M \times Q = M \times \left( -Q_{n-1} 2^{n-1} + \sum_{i=0}^{n-2} Q_i 2^i \right) = -M \cdot Q_{n-1} 2^{n-1} + \sum_{i=0}^{n-2} M \cdot Q_i 2^i$$

#### Paper-and-Pencil Rules for Signed Multiplication:
1. Every intermediate partial product must be **sign-extended** to the full $2n$-bit result width.
2. If the multiplier is negative, the final partial product corresponding to the MSB ($Q_{n-1}$) must be **subtracted** (by adding the 2's complement of $M$, $-M$).

```text
Paper-and-Pencil Example: (-5) x (+3) in 4-bit (Product = -15, 8-bit):
   M = 1011 (-5)
   Q = 0011 (+3)
   -------------------------------------------------
   1 1 1 1 1 0 1 1   (Partial Product 0: M * 1, sign extended to 8 bits)
   1 1 1 1 0 1 1 0   (Partial Product 1: M * 1 << 1, sign extended)
   0 0 0 0 0 0 0 0   (Partial Product 2: M * 0 << 2)
   0 0 0 0 0 0 0 0   (Partial Product 3: M * 0 << 3)
   -------------------------------------------------
   1 1 1 1 0 0 0 1   (8-bit 2's complement = -15 in decimal)  (Correct!)
```

### 2. Booth's Algorithm (Radix-2)

Booth's algorithm takes advantage of the fact that a sequence of ones:
$$\underbrace{011110_2}_{\text{decimal } 30} = 2^4 + 2^3 + 2^2 + 2^1 = 16 + 8 + 4 + 2 = 30$$
can be replaced by two operations:
$$2^5 - 2^1 = 32 - 2 = 30$$

#### Hardware Datapath Setup:
- **Accumulator ($A$):** $n$ bits, initialized to `00...0`.
- **Multiplier ($Q$):** $n$ bits, holds $Q$.
- **Implicit Bit ($Q_{-1}$):** 1 bit, initialized to `0`.
- **Multiplicand ($M$):** $n$ bits, holds $M$.
- **ALU:** Capable of $A + M$ and $A - M$ ($A + \overline{M} + 1$).
- **Counter:** Initialized to $n$.

```text
+-------------------------------------------------------------------------+
|                        BOOTH'S MULTIPLIER DATAPATH                      |
|                                                                         |
|      +-----------------------------------+                              |
|      |    Multiplicand Register (M)      |                              |
|      +-----------------------------------+                              |
|                         |                                               |
|                         v                                               |
|             +-----------------------+                                   |
|             |  ALU Adder/Subtractor |                                   |
|             +-----------------------+                                   |
|                         ^                                               |
|                         |                                               |
|                         v                                               |
|      +-----------------------+      +-----------------------+      +--+ |
|      |Accumulator Register(A)| ---> |Multiplier Register(Q) | ---> |Q | |
|      | (n bits, init 0)      |      | (n bits, holds Q)     |      |-1| |
|      +-----------------------+      +-----------------------+      +--+ |
|          |       |                             |       |            |   |
|          +-------+--- Arithmetic Shift Right --+-------+------------+   |
|               (ASR: sign bit A_{n-1} replicated)       |            |   |
|                                                        v            v   |
|      Control Logic <------------------------------ [  Q0   ,   Q-1  ]   |
+-------------------------------------------------------------------------+
```

#### Radix-2 Decision Table:

| $Q_0$ | $Q_{-1}$ | Algebraic Interpretation | Datapath Action |
| :--- | :--- | :--- | :--- |
| `0` | `0` | String of zeros / no transition | Do nothing; **ASR** $[A, Q, Q_{-1}]$ |
| `0` | `1` | End of a run of ones ($\dots 01\dots$) | **$A \leftarrow A + M$**; then **ASR** $[A, Q, Q_{-1}]$ |
| `1` | `0` | Beginning of a run of ones ($\dots 10\dots$) | **$A \leftarrow A - M$**; then **ASR** $[A, Q, Q_{-1}]$ |
| `1` | `1` | Middle of a run of ones | Do nothing; **ASR** $[A, Q, Q_{-1}]$ |

### 3. Extended Booth's Algorithm (Radix-4 Bit-Pair Recoding)

Standard Booth's algorithm requires $n$ clock cycles for an $n$-bit operand. **Extended Booth's Algorithm** groups multiplier bits in sets of three overlapping bits: $(Q_{2i+1}, Q_{2i}, Q_{2i-1})$ for $i = 0, 1, \dots, \frac{n}{2}-1$.

```text
Radix-4 Bit Grouping (8-bit Multiplier Example):
  Q7   Q6   Q5   Q4   Q3   Q2   Q1   Q0  | Q_{-1}
 [   Triplet 3   ]                     |
      [   Triplet 2   ]                |
           [   Triplet 1   ]           |
                [   Triplet 0   ]      | (init Q_{-1}=0)
```

#### Bit-Pair Recoding Formulation:
$$\text{Multiplier Recoded Value } X_i = -2 \cdot Q_{2i+1} + Q_{2i} + Q_{2i-1}$$

#### Radix-4 Recoding Table:

| $Q_{2i+1}$ | $Q_{2i}$ | $Q_{2i-1}$ | Recoded Multiplier Factor | Hardware Operation |
| :--- | :--- | :--- | :--- | :--- |
| `0` | `0` | `0` | $0$ | Add $0$ |
| `0` | `0` | `1` | $+1$ | Add $1 \times M$ |
| `0` | `1` | `0` | $+1$ | Add $1 \times M$ |
| `0` | `1` | `1` | $+2$ | Add $2 \times M$ (Shift $M$ left 1 bit) |
| `1` | `0` | `0` | $-2$ | Subtract $2 \times M$ (Add 2's complement of $2M$) |
| `1` | `0` | `1` | $-1$ | Subtract $1 \times M$ (Add 2's complement of $M$) |
| `1` | `1` | `0` | $-1$ | Subtract $1 \times M$ (Add 2's complement of $M$) |
| `1` | `1` | `1` | $0$ | Add $0$ |

#### Advantages of Radix-4:
- Halves the number of adder iterations to $n/2$.
- $+2M$ and $-2M$ are generated by a simple 1-bit hardwired left shift of $M$ or $-M$, requiring no complex multiplication hardware.

## Worked Examples / Calculations / Hardware Traces

### Example 1: Booth's Algorithm (Radix-2) Execution Trace ($(-6) \times (+3)$)

**Problem:** Multiply signed 4-bit numbers $M = 1010_2\ (-6_{10})$ and $Q = 0011_2\ (+3_{10})$ using Radix-2 Booth's algorithm. Show the complete step-by-step register trace. Expected product: $-18_{10} = 11101110_2$ (8-bit 2's complement).

**Setup:**
- Multiplicand $M = 1010_2\ (-6)$
- Two's complement of $M$: $-M = 0110_2\ (+6)$
- Initial state: $A = 0000_2$, $Q = 0011_2$, $Q_{-1} = 0$, $\text{Count} = 4$.

#### Execution Trace Table:

| Step | Condition ($Q_0, Q_{-1}$) | Operation | $A$ | $Q$ | $Q_{-1}$ | Count |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Init** | — | Clear $A, Q_{-1}$; Load $M, Q$ | `0000` | `0011` | `0` | `4` |
| **1** | $Q_0 Q_{-1} = 10$ | $A \leftarrow A - M\ (A + (-M))$ | `0110` | `0011` | `0` | `4` |
| | | **ASR** $[A, Q, Q_{-1}]$ | `0011` | `0001` | `1` | `3` |
| **2** | $Q_0 Q_{-1} = 11$ | No arithmetic operation | `0011` | `0001` | `1` | `3` |
| | | **ASR** $[A, Q, Q_{-1}]$ | `0001` | `1000` | `1` | `2` |
| **3** | $Q_0 Q_{-1} = 01$ | $A \leftarrow A + M$ ($0001 + 1010 = 1011$) | `1011` | `1000` | `1` | `2` |
| | | **ASR** $[A, Q, Q_{-1}]$ | `1101` | `1100` | `0` | `1` |
| **4** | $Q_0 Q_{-1} = 00$ | No arithmetic operation | `1101` | `1100` | `0` | `1` |
| | | **ASR** $[A, Q, Q_{-1}]$ | `1110` | `1110` | `0` | `0` |

- **Final 8-bit Result:** $[A, Q] = 11101110_2$.
- **Decimal Verification:**
  $11101110_2 = -128 + 64 + 32 + 8 + 4 + 2 = -18_{10} \quad \checkmark$

### Example 2: Extended Booth's (Radix-4) Bit-Pair Recoding Calculation

**Problem:** Multiply 6-bit signed integers $M = 010101_2\ (+21_{10})$ and $Q = 110110_2\ (-10_{10})$ using Radix-4 Bit-Pair Recoding. Expected product: $-210_{10}$.

**Solution:**
1. **Recode Multiplier $Q = 110110_2$ with appended $Q_{-1} = 0$:**
   $$\text{Bits: } \underbrace{Q_5 Q_4 Q_3}_{\text{Triplet 2}}\ \underbrace{Q_3 Q_2 Q_1}_{\text{Triplet 1}}\ \underbrace{Q_1 Q_0 Q_{-1}}_{\text{Triplet 0}} \implies \text{Overlapping pairs: } (Q_1 Q_0 Q_{-1}), (Q_3 Q_2 Q_1), (Q_5 Q_4 Q_3)$$

   - **Triplet 0 ($Q_1 Q_0 Q_{-1}$):** Bits $1, 0, 0 \implies \text{Recoded Factor} = -2$
   - **Triplet 1 ($Q_3 Q_2 Q_1$):** Bits $0, 1, 1 \implies \text{Recoded Factor} = +2$
   - **Triplet 2 ($Q_5 Q_4 Q_3$):** Bits $1, 1, 0 \implies \text{Recoded Factor} = -1$

2. **Compute Multiples of $M = 010101_2\ (+21)$:**
   - $+1M = 000000\ 010101_2\ (+21)$
   - $+2M = 000000\ 101010_2\ (+42)$
   - $-1M = 111111\ 101011_2\ (-21)$
   - $-2M = 111111\ 010110_2\ (-42)$

3. **Sum Partial Products (Shifted by 2 bits per stage):**
   ```text
   Stage 0 (-2M * 4^0):   1 1 1 1 1 1 0 1 0 1 1 0
   Stage 1 (+2M * 4^1):   1 1 1 0 1 0 1 0 - - - -  (000000101010 << 2)
   Stage 2 (-1M * 4^2):   1 0 1 0 1 1 - - - - - -  (111111101011 << 4)
   --------------------------------------------------------------------
   Sum (12-bit Result):   1 1 1 1 0 0 1 0 1 1 1 0_2
   ```

4. **Verify Decimal Value of $111100101110_2$:**
   - Invert: $000011010001_2$
   - Add 1: $000011010010_2 = 128 + 64 + 16 + 2 = 210_{10}$
   - Value: $-210_{10} \quad \checkmark$

## Complexity Analysis / Common Pitfalls

- **Logical Shift Right vs. Arithmetic Shift Right:** The single most common failure in implementing Booth's algorithm is performing a **Logical Shift Right** ($LSR$) instead of an **Arithmetic Shift Right** ($ASR$). In $ASR$, bit $A_{n-1}$ must be copied to itself so that negative numbers retain their leading ones.
- **Off-by-One Bit Triplet Grouping in Radix-4:** In Extended Booth's recoding, students often create non-overlapping triplets $(Q_2 Q_1 Q_0)$ instead of overlapping triplets $(Q_{2i+1}, Q_{2i}, Q_{2i-1})$. Triplet 0 must always include $Q_{-1} = 0$ as its rightmost bit.
- **Sign Extension of Multiplicand in ALU:** During $A \leftarrow A - M$ or $A \leftarrow A + M$, arithmetic must be carried out across the full $n$-bit register width without dropping the MSB carry/overflow until $ASR$ occurs.

## Multiple Choice Questions

1. In Radix-2 Booth's algorithm, what hardware action is taken when the bit pair $Q_0 Q_{-1} = 10$?
    - **A)** Add the multiplicand $M$ to $A$, then perform logical shift right
    - **B)** Subtract the multiplicand $M$ from $A$, then perform arithmetic shift right
    - **C)** Shift register $Q$ left by 2 bits
    - **D)** Invert all bits in register $Q$

2. What is the primary performance advantage of Extended Booth's (Radix-4) multiplication over standard Booth's (Radix-2) multiplication?
    - **A)** It eliminates the need for an adder circuit completely
    - **B)** It reduces the required number of addition/subtraction cycles from $n$ to $n/2$
    - **C)** It allows division and multiplication to share the exact same microcode
    - **D)** It converts all negative operands to positive numbers before calculation

3. In Radix-4 Extended Booth's recoding, what operation corresponds to the multiplier bit triplet `011`?
    - **A)** Add $0$
    - **B)** Add $+1 \times M$
    - **C)** Add $+2 \times M$
    - **D)** Subtract $-2 \times M$

4. What is the initial value of the $Q_{-1}$ flip-flop at the start of Booth's algorithm?
    - **A)** `0`
    - **B)** `1`
    - **C)** The MSB of the multiplicand
    - **D)** The sign bit of the multiplier

5. Why does Booth's algorithm perform Arithmetic Shift Right ($ASR$) rather than Logical Shift Right ($LSR$)?
    - **A)** To clear the accumulator register after each cycle
    - **B)** To preserve the sign of negative 2's complement intermediate values by sign-extending the MSB
    - **C)** To double the clock frequency of the sequential state machine
    - **D)** To prevent the $Q_{-1}$ flip-flop from overflowing

### Answer Key & Explanations

1. **B**. The pattern $Q_0 Q_{-1} = 10$ represents the beginning of a contiguous run of `1`s (from right to left), requiring the subtraction of the multiplicand ($A \leftarrow A - M$) followed by an Arithmetic Shift Right ($ASR$).
2. **B**. Extended Booth's algorithm inspects two bits of multiplier precision per cycle (using 3-bit sliding windows), halving the number of partial product reduction cycles from $n$ to $n/2$.
3. **C**. Evaluating $-2 Q_{2i+1} + Q_{2i} + Q_{2i-1}$ for bits `011` yields $-2(0) + 1 + 1 = +2$, which corresponds to adding $+2 \times M$ (implemented via a 1-bit left shift of $M$).
4. **A**. The implicit bit $Q_{-1}$ is always initialized to `0` prior to the first multiplication cycle.
5. **B**. Arithmetic Shift Right ($ASR$) replicates the sign bit $A_{n-1}$ into $A_{n-1}$ on each shift, ensuring that negative partial products retain their correct 2's complement sign throughout execution.

## References & Navigation

- **Previous Topic:** [[Unsigned Multiplication (Array & Sequential Multipliers)]]
- **Next Topic:** [[Binary Division (Restoring & Non-Restoring Division Algorithms)]]
- **Related Notes:** [[Integer Representation & Fixed-Point Arithmetic]], [[Binary Addition, Subtraction & Carry Lookahead Adders]]
