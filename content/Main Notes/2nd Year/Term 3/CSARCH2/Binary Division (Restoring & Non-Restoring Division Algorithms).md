---
id: csarch2_module_06_division
type: note
course: CSARCH2
topic: "Binary Division (Restoring & Non-Restoring Division Algorithms)"
status: completed
---

# Module 06: Binary Division (Restoring & Non-Restoring Division Algorithms)

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Hardware Modeling]] #[[Binary Division (Restoring & Non-Restoring Division Algorithms)]]

---

## Overview

> Binary division is the most computationally demanding primitive operation in fixed-point arithmetic logic units (ALUs). Unlike multiplication, which can be parallelized via combinational tree reduction networks, division is inherently sequential due to the sequential nature of quotient bit determination and remainder feedback. This module analyzes the mathematical principles and hardware realization of unsigned binary integer division. We examine the classic **Restoring Division Algorithm**, where incorrect trial subtractions are restored, and the **Non-Restoring Division Algorithm**, which eliminates restorative addition cycles by tracking sign history and deferring corrections.

## Key Definitions

- **Dividend ($Q$):** The number being divided ($n$ bits).
- **Divisor ($M$):** The number by which the dividend is divided ($n$ or $n+1$ bits).
- **Quotient ($Q$):** The integer result of the division operation ($n$ bits).
- **Remainder ($A$):** The leftover integer quantity satisfying the division invariant, residing in accumulator $A$ ($n+1$ bits).
- **Division Invariant:** The fundamental mathematical relation governing integer division:
  $$\text{Dividend } D = (\text{Quotient } Q \times \text{Divisor } M) + \text{Remainder } R \quad \text{where } 0 \le R < M$$
- **Trial Subtraction:** The exploratory subtraction of the divisor from the shifted partial remainder ($A \leftarrow A - M$) to test if the divisor fits into the current dividend prefix.
- **Restoring Division:** An algorithm where, if a trial subtraction yields a negative partial remainder ($A < 0$), the original value of $A$ is restored by adding the divisor back ($A \leftarrow A + M$), and the quotient bit $Q_0$ is set to `0`.
- **Non-Restoring Division:** An optimized algorithm that avoids intermediate restoring additions by performing $A \leftarrow A + M$ in the subsequent cycle if the current remainder is negative, requiring at most one final correction step.

## Theoretical Framework / Core Concepts

### 1. Hardware Datapath Organization for Binary Division

The division datapath employs three primary registers, an ALU capable of addition and subtraction, and a down-counter:

```text
+-------------------------------------------------------------------------+
|                        BINARY DIVISION DATAPATH                         |
|                                                                         |
|      +-----------------------------------+                              |
|      |       Divisor Register (M)        | (n+1 bits, sign-extended)    |
|      +-----------------------------------+                              |
|                         |                                               |
|                         v                                               |
|             +-----------------------+                                   |
|             |  ALU Adder/Subtractor |                                   |
|             +-----------------------+                                   |
|                         ^                                               |
|                         |                                               |
|                         v                                               |
|      +-----------------------+      +-----------------------+           |
|      |Accumulator Register(A)| <--- | Dividend Register (Q) |           |
|      | (n+1 bits, init to 0) |      | (n bits, holds D/Q)   |           |
|      +-----------------------+      +-----------------------+           |
|          |       |                             |            ^           |
|          +-------+---- Shift Left (SHL) -------+            |           |
|                                                             |           |
|      Sign Bit An ---------------------> Quotient Inverter --+           |
|                                         (Q0 = ~An)                      |
+-------------------------------------------------------------------------+
```

- **Register Widths:** If dividend $Q$ is $n$ bits, accumulator $A$ and divisor $M$ must be $n+1$ bits wide (with leading `0`s) to prevent erroneous sign overflow during trial subtractions.

### 2. Restoring Division Algorithm

In Restoring Division, each step tests whether the divisor $M$ can be subtracted from the current high-order remainder $A$:

```text
Restoring Division Cycle (Repeat n times):
1. Shift Left [A, Q] by 1 bit (Q0 becomes empty: _)
2. A = A - M
3. Test MSB of Accumulator (An):
   - If An == 1 (A < 0, subtraction failed):
       A = A + M  (Restore previous A)
       Q0 = 0
   - If An == 0 (A >= 0, subtraction succeeded):
       A remains unchanged
       Q0 = 1
```

```text
Flowchart of Restoring Division:
                +-------------------------+
                |    Shift Left [A, Q]    |
                +-------------------------+
                             |
                             v
                +-------------------------+
                |        A = A - M        |
                +-------------------------+
                             |
                             v
                        /        \
                       /   A < 0? \
                      \   (An=1)  /
                       \         /
                        +-------+
                       /         \
                 YES  /           \  NO
                     v             v
        +-------------------+  +-------------------+
        |     A = A + M     |  |      Q0 = 1       |
        |      Q0 = 0       |  +-------------------+
        +-------------------+           |
                  |                     |
                  +----------+----------+
                             |
                             v
                   Decrement Counter (n)
```

- **Worst-Case Cost:** If every trial subtraction fails, the algorithm requires $2n$ additions/subtractions.

### 3. Non-Restoring Division Algorithm

Non-Restoring Division eliminates the intermediate restoring addition. If $A$ becomes negative ($A < 0$), the true mathematical value of the restored remainder before the next shift should have been $A + M$. Shifting this restored remainder left by 1 bit produces:
$$2 \times (A + M) = 2A + 2M$$

In the next cycle, subtracting $M$ from this shifted restored value yields:
$$(2A + 2M) - M = 2A + M$$

Therefore, if the current remainder is negative, the hardware simply **shifts left and adds $M$ ($A \leftarrow 2A + M$)**, completely bypassing the need to restore $A$ in the previous step!

#### Non-Restoring Operational Rules:
1. **Cycle Step (Repeat $n$ times):**
   - If previous $A \ge 0$ ($A_n = 0$):
     - Shift Left $[A, Q]$.
     - $A \leftarrow A - M$.
   - If previous $A < 0$ ($A_n = 1$):
     - Shift Left $[A, Q]$.
     - $A \leftarrow A + M$.
   - Evaluate new sign bit $A_n$:
     - If new $A \ge 0$ ($A_n = 0$): Set $Q_0 = 1$.
     - If new $A < 0$ ($A_n = 1$): Set $Q_0 = 0$.
2. **Post-Loop Correction Step:**
   - After $n$ cycles, check the sign of the final remainder $A$:
   - If final $A < 0$ ($A_n = 1$): Perform a single final restoration $A \leftarrow A + M$.
   - If final $A \ge 0$: Remainder $A$ is correct as-is.

```text
Performance Advantage of Non-Restoring Division:
- Restoring Division:   n to 2n ALU operations (variable latency)
- Non-Restoring Division: Exactly n ALU operations + at most 1 final correction
```

## Worked Examples / Calculations / Hardware Traces

### Example 1: Restoring Division Execution Trace ($11 / 3$)

**Problem:** Divide unsigned integers: Dividend $D = 11_{10} = 1011_2$ ($n=4$ bits) by Divisor $M = 3_{10} = 0011_2$ using the Restoring Division algorithm. Show the step-by-step register trace. Expected: $\text{Quotient} = 3\ (0011_2)$, $\text{Remainder} = 2\ (0010_2)$.

**Setup:**
- $n = 4$
- $M = 00011_2$ (5 bits, padded with leading 0)
- Initial state: $A = 00000_2$ (5 bits), $Q = 1011_2$, $\text{Count} = 4$.

#### Execution Trace Table:

| Cycle | Operation | $A$ | $Q$ | Count | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **0** | **Init** | `00000` | `1011` | `4` | $A=00000, Q=1011, M=00011$ |
| **1** | **Shift Left** $[A, Q]$ | `00001` | `011_` | `4` | $A \leftarrow A \ll 1$ with $Q_3$ shifted in |
| | $A \leftarrow A - M$ | `11110` | `011_` | `4` | $00001 - 00011 = -2$ ($A_4 = 1$) |
| | Restore: $A \leftarrow A + M, Q_0 \leftarrow 0$ | `00001` | `0110` | `3` | Restored $A$; set $Q_0 = 0$ |
| **2** | **Shift Left** $[A, Q]$ | `00010` | `110_` | `3` | Shift left |
| | $A \leftarrow A - M$ | `11111` | `110_` | `3` | $00010 - 00011 = -1$ ($A_4 = 1$) |
| | Restore: $A \leftarrow A + M, Q_0 \leftarrow 0$ | `00010` | `1100` | `2` | Restored $A$; set $Q_0 = 0$ |
| **3** | **Shift Left** $[A, Q]$ | `00101` | `100_` | `2` | Shift left ($A = 5_{10}$) |
| | $A \leftarrow A - M$ | `00010` | `100_` | `2` | $00101 - 00011 = +2$ ($A_4 = 0$) |
| | No Restore: $Q_0 \leftarrow 1$ | `00010` | `1001` | `1` | Subtraction positive; set $Q_0 = 1$ |
| **4** | **Shift Left** $[A, Q]$ | `00101` | `001_` | `1` | Shift left ($A = 5_{10}$) |
| | $A \leftarrow A - M$ | `00010` | `001_` | `1` | $00101 - 00011 = +2$ ($A_4 = 0$) |
| | No Restore: $Q_0 \leftarrow 1$ | `00010` | `0011` | `0` | Subtraction positive; set $Q_0 = 1$ |

- **Final Results:**
  - $\text{Quotient in } Q = 0011_2 = 3_{10}$
  - $\text{Remainder in } A = 00010_2 = 2_{10}$
  - **Verification:** $11 = (3 \times 3) + 2 = 9 + 2 = 11 \quad \checkmark$

### Example 2: Non-Restoring Division Execution Trace ($11 / 3$)

**Problem:** Perform the exact same division ($11 / 3$) using the Non-Restoring Division algorithm.

**Setup:**
- $n = 4$
- $M = 00011_2$ (5 bits), $-M = 11101_2$
- Initial state: $A = 00000_2$, $Q = 1011_2$, $\text{Count} = 4$.

#### Execution Trace Table:

| Cycle | Previous $A$ Sign | Operation | $A$ | $Q$ | Count | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **0** | — | **Init** | `00000` | `1011` | `4` | $A \ge 0$ |
| **1** | $A \ge 0 \implies \text{SHL, SUB } M$ | **Shift Left** $[A, Q]$ | `00001` | `011_` | `4` | |
| | | $A \leftarrow A - M$ | `11110` | `0110` | `3` | $A < 0 \implies Q_0 = 0$ |
| **2** | $A < 0 \implies \text{SHL, ADD } M$ | **Shift Left** $[A, Q]$ | `11100` | `110_` | `3` | |
| | | $A \leftarrow A + M$ | `11111` | `1100` | `2` | $11100 + 00011 = 11111\ (< 0) \implies Q_0 = 0$ |
| **3** | $A < 0 \implies \text{SHL, ADD } M$ | **Shift Left** $[A, Q]$ | `11111` | `100_` | `2` | $(11111 \ll 1) + 1 = 11111$ (sign ext) |
| | | $A \leftarrow A + M$ | `00010` | `1001` | `1` | $11111 + 00011 = 00010\ (\ge 0) \implies Q_0 = 1$ |
| **4** | $A \ge 0 \implies \text{SHL, SUB } M$ | **Shift Left** $[A, Q]$ | `00101` | `001_` | `1` | |
| | | $A \leftarrow A - M$ | `00010` | `0011` | `0` | $00101 - 00011 = 00010\ (\ge 0) \implies Q_0 = 1$ |
| **Post** | Final $A \ge 0$ | **No Correction Needed** | `00010` | `0011` | `0` | Remainder is positive |

- **Final Results:**
  - $\text{Quotient in } Q = 0011_2 = 3_{10}$
  - $\text{Remainder in } A = 00010_2 = 2_{10}$
  - Both algorithms arrive at identical quotient and remainder values, but Non-Restoring completed in exactly 4 ALU cycles without any restoring rollbacks!

## Complexity Analysis / Common Pitfalls

- **Register Width Sizing for Accumulator $A$:** Setting register $A$ to only $n$ bits rather than $n+1$ bits causes catastrophic overflow errors during trial subtractions, because a negative result cannot be differentiated from unsigned high-order data.
- **Forgetting the Post-Loop Correction in Non-Restoring Division:** In Non-Restoring division, if the final subtraction in cycle $n$ results in $A < 0$, the quotient $Q$ is correct, but accumulator $A$ contains an uncorrected negative value. The final step $A \leftarrow A + M$ is mandatory to obtain the true remainder.
- **Quotient Bit Polarity Inversion:** A frequent pitfall is inverting the logic for quotient bit generation. When $A \ge 0$ ($A_n = 0$), the subtraction was valid, so $Q_0$ must be set to `1` (not `0`).

## Multiple Choice Questions

1. In the Restoring Division algorithm, what action is taken when a trial subtraction produces a negative accumulator value ($A < 0$)?
    - **A)** The quotient bit $Q_0$ is set to `1`, and $A$ is left unchanged
    - **B)** The original value of $A$ is restored via $A \leftarrow A + M$, and quotient bit $Q_0$ is set to `0`
    - **C)** The divisor register $M$ is shifted right by 1 bit
    - **D)** The division aborts immediately with a divide-by-zero trap

2. What algebraic relationship enables Non-Restoring Division to avoid restoring additions on intermediate cycles?
    - **A)** $2(A + M) - M = 2A + M$
    - **B)** $(A - M)^2 = A^2 - 2AM + M^2$
    - **C)** $A \oplus M = A \cdot \overline{M} + \overline{A} \cdot M$
    - **D)** $A - M = A + \overline{M} + 1$

3. For an $n$-bit dividend and divisor, what is the minimum required bit width of the accumulator register $A$ during hardware division?
    - **A)** $n - 1$ bits
    - **B)** $n$ bits
    - **C)** $n + 1$ bits
    - **D)** $2n$ bits

4. In Non-Restoring Division, if the final remainder in register $A$ after $n$ cycles is negative ($A_n = 1$), what correction must be performed?
    - **A)** Invert all bits of the quotient register $Q$
    - **B)** Add the divisor back to the accumulator: $A \leftarrow A + M$
    - **C)** Subtract the divisor from the accumulator: $A \leftarrow A - M$
    - **D)** Decrement the quotient register by 1: $Q \leftarrow Q - 1$

5. Why is hardware integer division generally slower than integer multiplication in modern superscalar processors?
    - **A)** Multipliers use analog voltages whereas dividers use digital logic
    - **B)** Division requires recursive remainder feedback where each quotient bit depends sequentially on the sign of the preceding operation
    - **C)** Memory buses cannot transmit dividend and divisor simultaneously
    - **D)** Carry lookahead logic cannot be used in subtraction operations

### Answer Key & Explanations

1. **B**. In Restoring Division, a negative accumulator ($A < 0$) indicates that the divisor was larger than the partial dividend. Hardware restores the previous value by adding $M$ back ($A \leftarrow A + M$) and sets the quotient bit $Q_0 = 0$.
2. **A**. Shifting the restored remainder $A+M$ left by 1 bit gives $2(A+M) = 2A+2M$. Subtracting $M$ in the next cycle yields $(2A+2M)-M = 2A+M$, proving that shifting left and adding $M$ directly produces the exact mathematical equivalent.
3. **C**. Accumulator $A$ must be $n+1$ bits wide (1 extra sign bit) to accommodate the negative results produced during trial subtractions without losing the most significant data bits.
4. **B**. If the final remainder is negative, the last trial subtraction went past 0 without a subsequent corrective cycle, requiring a single post-loop restoration $A \leftarrow A + M$ to restore the true remainder.
5. **B**. Division involves inherently serial quotient selection and remainder subtraction feedback, preventing the parallel tree reduction (e.g., Wallace trees) used in combinational multipliers.

## References & Navigation

- **Previous Topic:** [[Signed Multiplication (Booth's & Extended Booth's Algorithm)]]
- **Next Topic:** [[IEEE 754 Floating-Point Representation (Single & Double Precision)]]
- **Related Notes:** [[Unsigned Multiplication (Array & Sequential Multipliers)]], [[Processing Unit Organization & Single-Bus Datapath]]
