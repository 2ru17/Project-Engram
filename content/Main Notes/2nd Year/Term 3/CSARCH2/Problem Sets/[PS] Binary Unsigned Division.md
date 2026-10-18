---
id: problem_set_binary_unsigned_division
type: problem_set
course: CSARCH2
topic: "Binary Unsigned Division"
status: completed
---

# Problem Set - Binary Unsigned Division

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Binary Arithmetic]] #[[Division]] #[[Restoring Division]] #[[Non-Restoring Division]] #[[ALU]]

---

## Overview

Binary integer division is the most computationally demanding basic arithmetic operation executed by the Arithmetic Logic Unit ([[ALU]]). Unlike multiplication—which can be implemented as parallel summations or bit-pair recoding—division cannot easily compute reciprocals in fixed-point integer hardware. Consequently, hardware integer division is fundamentally performed via **sequential digit-recurrence algorithms** based on shift-and-subtract operations.

```text
                  ┌──────────────────────────────────────────────────────────┐
                  │                Binary Integer Division                   │
                  └────────────────────────────┬─────────────────────────────┘
                                               │
                ┌──────────────────────────────┴──────────────────────────────┐
                ▼                                                             ▼
   ┌─────────────────────────┐                                   ┌─────────────────────────┐
   │    Restoring Division   │                                   │  Non-Restoring Division │
   │ (Trial Subtraction with │                                   │ (Deferred Correction to │
   │   Immediate Restore)    │                                   │      Next Cycle)        │
   └────────────┬────────────┘                                   └────────────┬────────────┘
                │                                                             │
   ┌────────────┴────────────┐                                   ┌────────────┴────────────┐
   ▼                         ▼                                   ▼                         ▼
┌─────────────────────┐   ┌─────────────────────┐             ┌─────────────────────┐   ┌─────────────────────┐
│ If A < 0:           │   │ If A >= 0:          │             │ If Prev A < 0:      │   │ If Prev A >= 0:     │
│ - Restore: A <- A+M │   │ - Keep A            │             │ - Shift Left AQ     │   │ - Shift Left AQ     │
│ - Set Q_0 <- 0      │   │ - Set Q_0 <- 1      │             │ - Add M: A <- A+M   │   │ - Sub M: A <- A-M   │
└─────────────────────┘   └─────────────────────┘             │ - Set Q_0 <- ~A_MSB │   │ - Set Q_0 <- ~A_MSB │
                                                              └─────────────────────┘   └─────────────────────┘
```

Every integer division operation satisfies the fundamental **Division Invariant**:
$$\mathbf{D = Q \times M + R} \quad \text{subject to } 0 \le R < M$$
where:
- $D$ is the **Dividend** (stored initially in Register $Q$)
- $M$ is the **Divisor** (stored in Register $M$)
- $Q$ is the generated **Quotient** (accumulated in Register $Q$)
- $R$ is the final **Remainder** (accumulated in Register $A$)

This problem set examines two foundational hardware division algorithms:
1. **Restoring Division**: Performs a trial subtraction; if the partial remainder becomes negative, it immediately restores the previous value by adding the divisor back.
2. **Non-Restoring Division**: Eliminates the intermediate restoring addition by deferring compensation to the next cycle (adding rather than subtracting), significantly optimizing hardware execution time.

---

## Theoretical Principles & Hardware Datapath

### 1. Register Architecture & Sizing Conventions

For an unsigned dividend of $k$ bits and a divisor of $k$ bits:
- **Quotient/Dividend Register ($Q$):** Holds the $k$-bit dividend initially. As bits shift left during each pass, newly determined quotient bits ($Q_0$) are inserted at the LSB. Length = $k$ bits.
- **Divisor Register ($M$):** Holds the divisor with **1 extra bit** appended at the MSB to function as a sign bit. Length = $k + 1$ bits.
- **Two's Complement Divisor ($-M$):** Computed as $\sim M + 1$ using $k + 1$ bits.
- **Accumulator Register ($A$):** Holds partial remainders. Initialized to all zeros ($00\dots0_2$). Length = $k + 1$ bits (where $A_k$ is the sign bit).
- **Pass Counter:** Initialized to $k$ (the number of bits in dividend $Q$).

```text
        ┌───────────────────────────────────┐
        │       Divisor Register (M)        │ (k+1 bits)
        └─────────────────┬─────────────────┘
                          │
                          ▼
    ┌─────────────────────────────┬─────────────────────────────┐
    │       Accumulator (A)       │    Dividend / Quotient (Q)  │
    │         (k+1 bits)          │           (k bits)          │
    └─────────────────────────────┴─────────────────────────────┘
                  ▲                               ▲
                  │                               │
                  └─── [ Left Shift Registers ] ──┘
                             (AQ << 1)
```

---

### 2. Restoring Division Algorithm

In restoring division, the quotient bit is determined by trial subtraction. If the subtraction produces a negative remainder ($A_{k} = 1$), the trial subtraction is declared invalid, the accumulator is restored by adding $M$ back, and $Q_0$ is set to $0$.

#### Algorithmic Execution Steps:
1. **Initialization:**
   - $A \leftarrow 0$ ($k+1$ bits)
   - $Q \leftarrow \text{Dividend}$ ($k$ bits)
   - $M \leftarrow \text{Divisor}$ ($k+1$ bits)
   - $-M \leftarrow \text{2's complement of } M$ ($k+1$ bits)
2. **Loop for $k$ Passes (one pass per bit of dividend $Q$):**
   - **Step 1 (Shift Left):** Shift the combined register $[A, \, Q]$ left by 1 bit:
     $$[A, \, Q] \leftarrow [A, \, Q] \ll 1$$
     *(The MSB of $Q$ shifts into the LSB of $A$, and the LSB of $Q$ becomes vacant).*
   - **Step 2 (Trial Subtraction):** Subtract the divisor:
     $$A \leftarrow A - M \quad (A \leftarrow A + (-M))$$
   - **Step 3 (Sign Evaluation & Restoration):**
     - If $A$ is **negative** ($A_k = 1$):
       - **Restore:** $A \leftarrow A + M$
       - **Set Quotient Bit:** $Q_0 \leftarrow 0$
     - If $A$ is **non-negative** ($A_k = 0$):
       - **Keep Subtracted Value** (No restoration)
       - **Set Quotient Bit:** $Q_0 \leftarrow 1$
3. **Termination:** After $k$ passes:
   - The quotient resides in **$Q$**.
   - The remainder resides in **$A$**.

---

### 3. Non-Restoring Division Algorithm

Non-Restoring Division eliminates the conditional restoring addition within the loop by exploiting the following algebraic identity:
$$\text{If } A < 0, \quad 2(A + M) - M = \mathbf{2A + M}$$
Instead of restoring $A$ by $+M$ and then shifting and subtracting ($2(A+M) - M$), the hardware simply shifts the un-restored negative value ($2A$) and **adds $M$** in the subsequent cycle.

#### Algorithmic Execution Steps:
1. **Initialization:**
   - $A \leftarrow 0$ ($k+1$ bits)
   - $Q \leftarrow \text{Dividend}$ ($k$ bits)
   - $M \leftarrow \text{Divisor}$ ($k+1$ bits)
   - $-M \leftarrow \text{2's complement of } M$ ($k+1$ bits)
2. **Loop for $k$ Passes:**
   - Check the sign bit ($A_k$) of the **previous** accumulator value:
     - **Case A: Previous $A$ is Negative ($A_k = 1$):**
       1. Shift $[A, \, Q]$ left by 1 bit: $[A, \, Q] \leftarrow [A, \, Q] \ll 1$
       2. **Add Divisor:** $A \leftarrow A + M$
     - **Case B: Previous $A$ is Non-Negative ($A_k = 0$):**
       1. Shift $[A, \, Q]$ left by 1 bit: $[A, \, Q] \leftarrow [A, \, Q] \ll 1$
       2. **Subtract Divisor:** $A \leftarrow A - M \quad (A \leftarrow A + (-M))$
   - **Quotient Bit Assignment:**
     - Set $Q_0$ to the **logical complement** of the new sign bit of $A$:
       $$Q_0 \leftarrow \overline{A_k} = \begin{cases} 1 & \text{if } A_k = 0 \; (A \ge 0) \\ 0 & \text{if } A_k = 1 \; (A < 0) \end{cases}$$
3. **Final Correction (Post-Loop Restoration):**
   - After completing all $k$ passes, check the final sign bit of $A$:
     - If $A_k = 1$ (negative remainder), perform a final restoration:
       $$A \leftarrow A + M$$
     - If $A_k = 0$ (non-negative remainder), **no restoration** is required.
4. **Result:** Quotient in **$Q$**, Remainder in **$A$**.

---

## Step-by-Step Problem Solutions: $27 / 7$

### Problem Setup & Register Bit Sizing

We evaluate the division of $27_{10}$ by $7_{10}$:
$$\text{Division: } 27 / 7 \implies \text{Quotient } Q = 3_{10} \; (00011_2), \quad \text{Remainder } A = 6_{10} \; (000110_2)$$

#### Register Bit Widths:
- **Dividend ($D = 27_{10}$):** Fewest unsigned bits $= 11011_2$ ($k = 5$ bits).
- **Divisor ($M = 7_{10}$):** Represented using $k + 1 = 6$ bits (5 magnitude bits + 1 sign bit):
  $$M = 7_{10} = \mathbf{000111_2} \quad (6 \text{ bits})$$
- **Two's Complement of Divisor ($-M$):**
  $$-M = \sim(000111) + 1 = 111000 + 1 = \mathbf{111001_2} \quad (6 \text{ bits})$$
- **Accumulator ($A$):** Initialized to $k+1 = 6$ bits of zeros:
  $$A = \mathbf{000000_2}$$
- **Dividend / Quotient Register ($Q$):** Initialized to $k = 5$ bits:
  $$Q = \mathbf{11011_2}$$
- **Total Passes:** $k = 5$ passes.

---

### Try #1: $27 / 7$ using Restoring Division

#### Comprehensive Cycle-by-Cycle Execution Trace:

```text
========================================================================================
INITIAL STATE:
  M  = 000111    -M = 111001
  A  = 000000     Q = 11011
========================================================================================

PASS 1:
  1. Shift Left AQ:
     A = 000001    Q = 1011_  (MSB of Q shifted into A)
  2. Subtract M (A <-- A + (-M)):
       A:    000001
     + (-M): 111001
     --------------
       A:    111010
  3. Sign Check: A_5 = 1 (Negative)
     --> Restore A (A <-- A + M):
         A:   111010
       + M:   000111
       -------------
         A:   000001
     --> Set Q_0 <-- 0: Q becomes 10110
  >>> End of 1st Pass: A = 000001, Q = 10110

PASS 2:
  1. Shift Left AQ:
     A = 000011    Q = 0110_  (MSB of Q shifted into A)
  2. Subtract M (A <-- A + (-M)):
       A:    000011
     + (-M): 111001
     --------------
       A:    111100
  3. Sign Check: A_5 = 1 (Negative)
     --> Restore A (A <-- A + M):
         A:   111100
       + M:   000111
       -------------
         A:   000011
     --> Set Q_0 <-- 0: Q becomes 01100
  >>> End of 2nd Pass: A = 000011, Q = 01100

PASS 3:
  1. Shift Left AQ:
     A = 000110    Q = 1100_  (MSB of Q shifted into A)
  2. Subtract M (A <-- A + (-M)):
       A:    000110
     + (-M): 111001
     --------------
       A:    111111
  3. Sign Check: A_5 = 1 (Negative)
     --> Restore A (A <-- A + M):
         A:   111111
       + M:   000111
       -------------
         A:   000110
     --> Set Q_0 <-- 0: Q becomes 11000
  >>> End of 3rd Pass: A = 000110, Q = 11000

PASS 4:
  1. Shift Left AQ:
     A = 001101    Q = 1000_  (MSB of Q shifted into A; A = 13 in decimal)
  2. Subtract M (A <-- A + (-M)):
       A:    001101
     + (-M): 111001
     --------------
       A:   1000110  --> Truncated 6-bit A = 000110 (+6 in decimal)
  3. Sign Check: A_5 = 0 (Non-negative)
     --> No Restoration Needed (Keep A = 000110)
     --> Set Q_0 <-- 1: Q becomes 10001
  >>> End of 4th Pass: A = 000110, Q = 10001

PASS 5:
  1. Shift Left AQ:
     A = 001101    Q = 0001_  (MSB of Q shifted into A; A = 13 in decimal)
  2. Subtract M (A <-- A + (-M)):
       A:    001101
     + (-M): 111001
     --------------
       A:   1000110  --> Truncated 6-bit A = 000110 (+6 in decimal)
  3. Sign Check: A_5 = 0 (Non-negative)
     --> No Restoration Needed (Keep A = 000110)
     --> Set Q_0 <-- 1: Q becomes 00011
  >>> End of 5th Pass: A = 000110, Q = 00011
========================================================================================
```

---

#### Official Solution Table (Try #1 - Restoring Division)

| After this pass | Register A | Register Q | Detailed Operation & Restoration Status |
| :---: | :---: | :---: | :--- |
| **Initial** | `000000` | `11011` | Initialize $A \leftarrow 0$, $Q \leftarrow 27$, $M \leftarrow 7$ |
| **$1^{\text{st}}$** | `000001` | `10110` | Shift left $AQ$; $A-M = 111010$ (neg) $\implies$ Restore $A \leftarrow A+M$; $Q_0 \leftarrow 0$ |
| **$2^{\text{nd}}$** | `000011` | `01100` | Shift left $AQ$; $A-M = 111100$ (neg) $\implies$ Restore $A \leftarrow A+M$; $Q_0 \leftarrow 0$ |
| **$3^{\text{rd}}$** | `000110` | `11000` | Shift left $AQ$; $A-M = 111111$ (neg) $\implies$ Restore $A \leftarrow A+M$; $Q_0 \leftarrow 0$ |
| **$4^{\text{th}}$** | `000110` | `10001` | Shift left $AQ$; $A-M = 000110$ (pos) $\implies$ No restore; $Q_0 \leftarrow 1$ |
| **$5^{\text{th}}$** | `000110` | `00011` | Shift left $AQ$; $A-M = 000110$ (pos) $\implies$ No restore; $Q_0 \leftarrow 1$ |

#### Result Verification:
- **Quotient ($Q$):** $00011_2 = \mathbf{3_{10}}$
- **Remainder ($A$):** $000110_2 = \mathbf{6_{10}}$
- **Mathematical Check:** $27 = (7 \times 3) + 6 = 21 + 6 = 27 \quad \checkmark$

---

### Try #2: $27 / 7$ using Non-Restoring Division

#### Comprehensive Cycle-by-Cycle Execution Trace:

```text
========================================================================================
INITIAL STATE:
  M  = 000111    -M = 111001
  A  = 000000     Q = 11011
========================================================================================

PASS 1:
  Previous A = 000000 (A_5 = 0, Non-negative)
  1. Shift Left AQ:
     A = 000001    Q = 1011_
  2. Subtract M (A <-- A + (-M)):
       A:    000001
     + (-M): 111001
     --------------
       A:    111010
  3. Sign Check & Quotient Bit:
     New A_5 = 1 (Negative) --> Set Q_0 <-- NOT(1) = 0: Q becomes 10110
  >>> End of 1st Pass: A = 111010, Q = 10110

PASS 2:
  Previous A = 111010 (A_5 = 1, Negative)
  1. Shift Left AQ:
     A was 111010 --> Shift left with MSB of Q (1) --> A = 110101
     Q = 0110_
  2. Add M (A <-- A + M):
       A:    110101   (-11 in decimal)
     + M:    000111   (+7 in decimal)
     --------------
       A:    111100   (-4 in decimal)
  3. Sign Check & Quotient Bit:
     New A_5 = 1 (Negative) --> Set Q_0 <-- NOT(1) = 0: Q becomes 01100
  >>> End of 2nd Pass: A = 111100, Q = 01100

PASS 3:
  Previous A = 111100 (A_5 = 1, Negative)
  1. Shift Left AQ:
     A was 111100 --> Shift left with MSB of Q (0) --> A = 111000
     Q = 1100_
  2. Add M (A <-- A + M):
       A:    111000   (-8 in decimal)
     + M:    000111   (+7 in decimal)
     --------------
       A:    111111   (-1 in decimal)
  3. Sign Check & Quotient Bit:
     New A_5 = 1 (Negative) --> Set Q_0 <-- NOT(1) = 0: Q becomes 11000
  >>> End of 3rd Pass: A = 111111, Q = 11000

PASS 4:
  Previous A = 111111 (A_5 = 1, Negative)
  1. Shift Left AQ:
     A was 111111 --> Shift left with MSB of Q (1) --> A = 111111
     Q = 1000_
  2. Add M (A <-- A + M):
       A:    111111   (-1 in decimal)
     + M:    000111   (+7 in decimal)
     --------------
       A:   1000110   --> Truncated 6-bit A = 000110 (+6 in decimal)
  3. Sign Check & Quotient Bit:
     New A_5 = 0 (Non-negative) --> Set Q_0 <-- NOT(0) = 1: Q becomes 10001
  >>> End of 4th Pass: A = 000110, Q = 10001

PASS 5:
  Previous A = 000110 (A_5 = 0, Non-negative)
  1. Shift Left AQ:
     A was 000110 --> Shift left with MSB of Q (1) --> A = 001101  (+13 in decimal)
     Q = 0001_
  2. Subtract M (A <-- A + (-M)):
       A:    001101   (+13 in decimal)
     + (-M): 111001   (-7 in decimal)
     --------------
       A:   1000110   --> Truncated 6-bit A = 000110 (+6 in decimal)
  3. Sign Check & Quotient Bit:
     New A_5 = 0 (Non-negative) --> Set Q_0 <-- NOT(0) = 1: Q becomes 00011
  >>> End of 5th Pass: A = 000110, Q = 00011

FINAL CORRECTION STEP:
  Check sign of final A: A_5 = 0 (Non-negative).
  --> No post-loop restoration required! (A remains 000110)
========================================================================================
```

---

#### Official Solution Table (Try #2 - Non-Restoring Division)

| After this pass | Register A | Register Q | Detailed ALU Operation & Direction |
| :---: | :---: | :---: | :--- |
| **Initial** | `000000` | `11011` | Initialize $A \leftarrow 0$, $Q \leftarrow 27$, $M \leftarrow 7$ |
| **$1^{\text{st}}$** | `111010` | `10110` | Prev $A \ge 0 \implies$ Shift left $AQ$; $A \leftarrow A - M$; $A < 0 \implies Q_0 \leftarrow 0$ |
| **$2^{\text{nd}}$** | `111100` | `01100` | Prev $A < 0 \implies$ Shift left $AQ$; $A \leftarrow A + M$; $A < 0 \implies Q_0 \leftarrow 0$ |
| **$3^{\text{rd}}$** | `111111` | `11000` | Prev $A < 0 \implies$ Shift left $AQ$; $A \leftarrow A + M$; $A < 0 \implies Q_0 \leftarrow 0$ |
| **$4^{\text{th}}$** | `000110` | `10001` | Prev $A < 0 \implies$ Shift left $AQ$; $A \leftarrow A + M$; $A \ge 0 \implies Q_0 \leftarrow 1$ |
| **$5^{\text{th}}$** | `000110` | `00011` | Prev $A \ge 0 \implies$ Shift left $AQ$; $A \leftarrow A - M$; $A \ge 0 \implies Q_0 \leftarrow 1$ |
| **Final Check** | `000110` | `00011` | $A_5 = 0 \implies$ No final restoration needed |

#### Result Verification:
- **Quotient ($Q$):** $00011_2 = \mathbf{3_{10}}$
- **Remainder ($A$):** $000110_2 = \mathbf{6_{10}}$
- **Mathematical Invariant Check:**
  $$D = Q \times M + R \implies 27 = 3 \times 7 + 6 = 21 + 6 = 27 \quad \checkmark$$

---

## Comparison of Restoring vs. Non-Restoring Division

| Metric / Feature | Restoring Division | Non-Restoring Division |
| :--- | :--- | :--- |
| **ALU Operations per Cycle** | 1 subtraction + 1 conditional addition (restore) | Exactly 1 addition OR 1 subtraction |
| **Maximum Operations** | Up to $2k$ arithmetic additions/subtractions | At most $k + 1$ operations (including final restore) |
| **Execution Delay** | Variable and slower (due to conditional restoring step) | Uniform, constant, and significantly faster |
| **Intermediate Accumulator Value** | Always represents the true, non-negative remainder | Represents an un-restored signed shifted residue |
| **Quotient Bit Assignment** | $Q_0 = 1$ if $A \ge 0$, $Q_0 = 0$ if restored | $Q_0 = \overline{A_{\text{MSB}}}$ |
| **Hardware Control Complexity** | Requires multiplexer / register rollback logic | Requires simple 1-bit state memory of previous sign |
| **Final Correction Requirement** | Never needed (restored immediately in each pass) | Required if and only if final $A < 0$ ($A \leftarrow A + M$) |

---

## Key Takeaways

1. **Sign Bit Allocation:** Accumulator register $A$ and divisor register $M$ must always be allocated with **1 extra bit** beyond the dividend width to function as an explicit sign bit ($A_{\text{MSB}}$) during intermediate subtractions.
2. **Restoration Elimination:** Non-restoring division completely avoids intermediate restoration clock penalties by utilizing the property $2(A + M) - M = 2A + M$.
3. **Quotient Bit Derivation:** In non-restoring division, the quotient bit $Q_0$ is directly obtained by inverting the resulting sign bit ($\overline{A_{\text{MSB}}}$).
4. **Final Remainder Correctness:** If the non-restoring division terminates with a negative remainder ($A_{\text{MSB}} = 1$), a single corrective addition ($A \leftarrow A + M$) restores the true positive remainder without modifying the quotient register $Q$.


## References & Navigation

- **Related Notes:** [[Binary Division (Restoring & Non-Restoring)]]
