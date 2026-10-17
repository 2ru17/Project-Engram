---
id: csarch2_module_03_add_sub_cla
type: note
course: CSARCH2
topic: "Binary Addition, Subtraction & Carry Lookahead Adders"
status: completed
---

# Module 03: Binary Addition, Subtraction & Carry Lookahead Adders

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Hardware Modeling]] #[[Binary Addition, Subtraction & Carry Lookahead Adders]]

---

## Overview

> Arithmetic addition is the fundamental operational primitive in digital processors; subtraction, multiplication, division, and memory address calculations all resolve to iterative addition steps within the datapath. This module analyzes the gate-level design of Half Adders and Full Adders, the propagation delay bottlenecks of $n$-bit Ripple Carry Adders (RCA), and the design of unified 2's complement Adder/Subtractor circuits. We formalize rigorous overflow detection conditions for both signed and unsigned arithmetic and derive the Carry Lookahead Adder (CLA) equations that break serial carry chains to achieve $O(\log n)$ addition latency.

## Key Definitions

- **Half Adder (HA):** A combinational logic circuit that adds two single-bit inputs ($A, B$) producing a Sum ($S = A \oplus B$) and a Carry ($C = A \cdot B$), without accommodating an incoming carry bit.
- **Full Adder (FA):** A combinational logic circuit that computes the sum of three input bits ($A_i, B_i, C_i$), generating a sum bit $S_i$ and an outgoing carry bit $C_{i+1}$.
- **Ripple Carry Adder (RCA):** An $n$-bit parallel adder constructed by cascading $n$ Full Adders in series, where each stage's carry-out serves as the next stage's carry-in.
- **Carry Propagation Delay:** The worst-case latency required for a carry signal generated at the least significant bit (LSb) to ripple across all intermediate adder stages to the most significant bit (MSb).
- **Carry Generate ($G_i$):** A boolean condition ($G_i = A_i \cdot B_i$) indicating that bit stage $i$ will produce an outgoing carry regardless of the incoming carry $C_i$.
- **Carry Propagate ($P_i$):** A boolean condition ($P_i = A_i \oplus B_i$ or $A_i + B_i$) indicating that bit stage $i$ will pass an incoming carry $C_i$ directly to the outgoing carry $C_{i+1}$.
- **Carry Lookahead Adder (CLA):** An optimized high-speed parallel adder that computes all carry bits simultaneously using two-level logic expressions derived from generate and propagate functions.
- **Signed Arithmetic Overflow ($V$):** A condition occurring when the result of an arithmetic operation exceeds the representable range $[-2^{n-1}, +2^{n-1}-1]$ of the $n$-bit 2's complement format, formally detected by $V = C_n \oplus C_{n-1}$.

## Theoretical Framework / Core Concepts

### 1. Gate-Level Primitives: Half Adder and Full Adder

```text
Half Adder:                              Full Adder:
   A ---+-------+                           A ---+-------+
        |  XOR  |---> S                          |  XOR  |---+
   B ---+-------+                           B ---+-------+   |   XOR  |---> S
        |                                        |           +--------+
        +-------+                           Cin -+-----------+
        |  AND  |---> C                          |
        +-------+                                +-------+
                                                 |  AND  |---+
                                            A ---+-------+   |
                                                 |           |   OR   |---> Cout
                                            B ---+-------+   +--------+
                                                 |  AND  |---+
                                            Cin -+-------+
```

#### Boolean Formulations:
- **Half Adder:**
  $$S = A \oplus B = A\overline{B} + \overline{A}B$$
  $$C = A \cdot B$$

- **Full Adder:**
  $$S_i = A_i \oplus B_i \oplus C_i$$
  $$C_{i+1} = A_i B_i + C_i (A_i \oplus B_i) = A_i B_i + B_i C_i + A_i C_i$$

### 2. Ripple Carry Adder (RCA) and Propagation Delay Bottleneck

In an $n$-bit Ripple Carry Adder, each bit stage $i$ cannot finalize its sum $S_i$ or carry $C_{i+1}$ until stage $i-1$ has computed and stabilized $C_i$.

```text
       C4         C3         C2         C1         C0 (Cin)
   <--------+ <--------+ <--------+ <--------+ <---------
            |          |          |          |
         +------+   +------+   +------+   +------+
A3, B3 ->| FA 3 |->| FA 2 |->| FA 1 |->| FA 0 |<- A0, B0
         +------+   +------+   +------+   +------+
            |          |          |          |
            v          v          v          v
            S3         S2         S1         S0
```

#### Delay Analysis:
Let $t_{\text{gate}}$ be the uniform propagation delay through a single standard 2-input NAND/NOR gate:
- Full Adder Sum delay: $t_{\text{sum}} = 2 \cdot t_{\text{XOR}} \approx 4 \cdot t_{\text{gate}}$
- Full Adder Carry delay: $t_{\text{carry}} = t_{\text{AND}} + t_{\text{OR}} \approx 2 \cdot t_{\text{gate}}$

For an $n$-bit Ripple Carry Adder, the worst-case critical path delay is linear ($O(n)$):
$$t_{\text{RCA}} = t_{\text{setup}} + (n - 1) \cdot t_{\text{carry}} + t_{\text{sum}} \approx 2 \cdot t_{\text{gate}} + 2(n - 1) \cdot t_{\text{gate}} + 2 \cdot t_{\text{gate}} = 2n \cdot t_{\text{gate}}$$

For a 64-bit adder, $t_{\text{RCA}} \approx 128 \cdot t_{\text{gate}}$, which severely limits the processor's maximum clock frequency.

### 3. Unified Adder / Subtractor Datapath

Subtraction of 2's complement integers is converted to addition:
$$A - B = A + (-B) = A + \overline{B} + 1$$

This is implemented efficiently in hardware using XOR gates as programmable inverters controlled by a single signal $\text{Sub}$:

```text
         Sub (0 for ADD, 1 for SUB)
          |
          +-----------------------------+-----------+-------- (Cin = Sub)
          |                             |           |
          v                             v           v
       +-----+                       +-----+     +-----+
 B3 -->| XOR |                 B1 -->| XOR | B0->| XOR |
       +-----+                       +-----+     +-----+
          | B3'                         | B1'       | B0'
          v                             v           v
       +------+      C2              +------+ C1 +------+
 A3 -->| FA 3 | <------------------- | FA 1 |<---| FA 0 | <-- A0
       +------+                      +------+    +------+
          |                             |           |
          v                             v           v
          S3                            S1          S0
```

- When $\text{Sub} = 0$: $B_i \oplus 0 = B_i$ and $C_0 = 0$, performing standard addition $A + B + 0$.
- When $\text{Sub} = 1$: $B_i \oplus 1 = \overline{B_i}$ and $C_0 = 1$, performing subtraction $A + \overline{B} + 1$.

### 4. Overflow Detection Mechanics

Hardware must evaluate arithmetic overflow differently depending on data typing:

```text
Unsigned Overflow:                   Signed 2's Complement Overflow:
Carry-Out from MSB (C_out)           Sign Discordance / Carry XOR:
+-------------+                      +-----------------------------------+
| Cout == 1   |                      | V = C_n ^ C_{n-1}                 |
| => OVERFLOW |                      | (If Cout into MSB != Cout of MSB) |
+-------------+                      +-----------------------------------+
```

1. **Unsigned Arithmetic Overflow:**
   $$\text{Overflow}_{\text{unsigned}} = C_{\text{out}} \quad (\text{Carry bit } C_n = 1)$$
2. **Signed 2's Complement Overflow:**
   Signed overflow occurs when the addition of two operands with identical signs produces a result of the opposite sign:
   - $(+) + (+) = (-)$
   - $(-) + (-) = (+)$
   - $(+) + (-)$ can **never** overflow.

Mathematically, signed overflow is detected by comparing the carry entering the sign bit ($C_{n-1}$) with the carry leaving the sign bit ($C_n$):
$$V = C_n \oplus C_{n-1}$$

### 5. Carry Lookahead Adder (CLA) Theory & Derivation

To eliminate the $O(n)$ ripple delay, the CLA computes all intermediate carries directly from inputs $A$ and $B$:

$$\text{Generate: } G_i = A_i \cdot B_i$$
$$\text{Propagate: } P_i = A_i \oplus B_i \quad (\text{or } A_i + B_i)$$

The general carry recurrence is:
$$C_{i+1} = G_i + P_i C_i$$

#### Unfolding the Recurrence for a 4-Bit Block:
$$C_1 = G_0 + P_0 C_0$$
$$C_2 = G_1 + P_1 C_1 = G_1 + P_1 G_0 + P_1 P_0 C_0$$
$$C_3 = G_2 + P_2 C_2 = G_2 + P_2 G_1 + P_2 P_1 G_0 + P_2 P_1 P_0 C_0$$
$$C_4 = G_3 + P_3 C_3 = G_3 + P_3 G_2 + P_3 P_2 G_1 + P_3 P_2 P_1 G_0 + P_3 P_2 P_1 P_0 C_0$$

#### Sum Generation:
$$S_i = P_i \oplus C_i$$

```text
CLA Timing Path (Constant 4-Gate Delay for 4-bit block):
Inputs A, B ---> [1. Compute Gi, Pi] (1 gate delay)
                    |
                    v
                 [2. Compute Carries C1..C4 via 2-level AND-OR] (2 gate delays)
                    |
                    v
                 [3. Compute Sums Si = Pi ^ Ci] (1 gate delay)
                 Total Delay = 4 * t_gate (Independent of word size!)
```

#### Hierarchical CLA (16-bit to 64-bit):
Direct CLA scaling is limited by logic gate **fan-in constraints** (the number of inputs per physical transistor gate is typically limited to 4 or 5). To scale to 16, 32, and 64 bits, 4-bit CLA blocks are combined using **Block Generate ($G_B$)** and **Block Propagate ($P_B$)** signals:
$$P_B = P_3 \cdot P_2 \cdot P_1 \cdot P_0$$
$$G_B = G_3 + P_3 G_2 + P_3 P_2 G_1 + P_3 P_2 P_1 G_0$$

Hierarchical CLA achieves an overall delay of $O(\log n)$.

## Worked Examples / Calculations / Hardware Traces

### Example 1: 4-Bit Signed and Unsigned Addition with Overflow Analysis

**Problem:** Perform the following 4-bit binary additions using 2's complement. For each case, compute the Sum, the carry-out $C_4$, the carry into the sign bit $C_3$, evaluate unsigned overflow, evaluate signed overflow ($V$), and verify using decimal equivalents.

1. $A = 0101_2\ (+5)$, $B = 0011_2\ (+3)$
2. $A = 0110_2\ (+6)$, $B = 0101_2\ (+5)$
3. $A = 1010_2\ (-6)$, $B = 1011_2\ (-5)$

**Solution:**

#### Case 1: $(+5) + (+3)$
```text
   Carry:  0 0 0 0 0  (C4 = 0, C3 = 0)
       A:    0 1 0 1  (+5)
       B:    0 0 1 1  (+3)
  -------------------
     Sum:    1 0 0 0  (+8 in unsigned, -8 in signed 4-bit!)
```
- $C_4 = 0$, $C_3 = 1$
- Unsigned Overflow $= C_4 = 0$ (No unsigned overflow; $5 + 3 = 8 \le 15$).
- Signed Overflow $V = C_4 \oplus C_3 = 0 \oplus 1 = 1$ (**Signed Overflow Occurred!** Max positive 4-bit signed value is $+7$).

#### Case 2: $(+6) + (+5)$
```text
   Carry:  0 1 0 0 0  (C4 = 0, C3 = 1)
       A:    0 1 1 0  (+6)
       B:    0 1 0 1  (+5)
  -------------------
     Sum:    1 0 1 1  (Decimal -5 in 2's comp)
```
- $C_4 = 0$, $C_3 = 1$
- Unsigned Overflow $= C_4 = 0$ (No unsigned overflow).
- Signed Overflow $V = 0 \oplus 1 = 1$ (**Signed Overflow!** Two positive inputs yielded negative output).

#### Case 3: $(-6) + (-5)$
```text
   Carry:  1 0 1 0 0  (C4 = 1, C3 = 0)
       A:    1 0 1 0  (-6)
       B:    1 0 1 1  (-5)
  -------------------
     Sum:    0 1 0 1  (+5 in 2's comp)
```
- $C_4 = 1$, $C_3 = 0$
- Unsigned Overflow $= C_4 = 1$ (Unsigned carry generated).
- Signed Overflow $V = 1 \oplus 0 = 1$ (**Signed Overflow!** Two negative inputs yielded positive output; true sum $-11 < -8$).

### Example 2: CLA Carry Equations Computation Trace

**Problem:** Given 4-bit inputs $A = 1100_2$ ($A_3 A_2 A_1 A_0$) and $B = 1010_2$ ($B_3 B_2 B_1 B_0$) with $C_0 = 1$, compute all $G_i$, $P_i$, and intermediate carries $C_1, C_2, C_3, C_4$.

**Solution:**
1. **Bitwise Generate ($G_i = A_i \cdot B_i$):**
   - $G_0 = A_0 \cdot B_0 = 0 \cdot 0 = 0$
   - $G_1 = A_1 \cdot B_1 = 0 \cdot 1 = 0$
   - $G_2 = A_2 \cdot B_2 = 1 \cdot 0 = 0$
   - $G_3 = A_3 \cdot B_3 = 1 \cdot 1 = 1$

2. **Bitwise Propagate ($P_i = A_i \oplus B_i$):**
   - $P_0 = A_0 \oplus B_0 = 0 \oplus 0 = 0$
   - $P_1 = A_1 \oplus B_1 = 0 \oplus 1 = 1$
   - $P_2 = A_2 \oplus B_2 = 1 \oplus 0 = 1$
   - $P_3 = A_3 \oplus B_3 = 1 \oplus 1 = 0$

3. **Compute Carries via CLA Expansion:**
   - $C_1 = G_0 + P_0 C_0 = 0 + (0 \cdot 1) = 0$
   - $C_2 = G_1 + P_1 C_1 = 0 + (1 \cdot 0) = 0$
   - $C_3 = G_2 + P_2 C_2 = 0 + (1 \cdot 0) = 0$
   - $C_4 = G_3 + P_3 C_3 = 1 + (0 \cdot 0) = 1$

4. **Compute Sums ($S_i = P_i \oplus C_i$):**
   - $S_0 = P_0 \oplus C_0 = 0 \oplus 1 = 1$
   - $S_1 = P_1 \oplus C_1 = 1 \oplus 0 = 1$
   - $S_2 = P_2 \oplus C_2 = 1 \oplus 0 = 1$
   - $S_3 = P_3 \oplus C_3 = 0 \oplus 0 = 0$

*Result:* $\text{Sum} = 0111_2$, with final carry $C_4 = 1$. Verification: $1100_2\ (12) + 1010_2\ (10) + 1 = 23 = 10111_2$ ($C_4 = 1, \text{Sum} = 7$). Correct.

## Complexity Analysis / Common Pitfalls

- **RCA vs. CLA Latency Asymptotics:** A common trap is assuming CLA hardware has zero delay. While a 4-bit CLA evaluates carries in 4 gate delays, building a 64-bit single-level CLA is physically impossible due to fan-in limits (would require 65-input AND/OR gates). Hierarchical CLAs introduce logarithmic delay ($O(\log n)$), which is vastly superior to RCA's $O(n)$ but not instantaneous.
- **Signed vs. Unsigned Overflow Confusion:** High-level programmers often confuse the carry flag (`CF`) and overflow flag (`OF` / $V$). `CF` indicates that an unsigned result exceeded $2^n - 1$, whereas `OF` indicates that a signed 2's complement calculation exceeded $[-2^{n-1}, +2^{n-1}-1]$. Both flags are updated simultaneously on every addition, but the programmer/compiler chooses which to branch on based on variable typing.

## Multiple Choice Questions

1. In an $n$-bit 2's complement adder, what boolean expression detects signed arithmetic overflow?
- **A)** $V = C_n \cdot C_{n-1}$
- **B)** $V = C_n \oplus C_{n-1}$
- **C)** $V = C_n + C_0$
- **D)** $V = \overline{C_n} \cdot C_{n-1}$

2. What is the fundamental asymptotic time complexity of an $n$-bit Ripple Carry Adder compared to an $n$-bit Hierarchical Carry Lookahead Adder?
- **A)** RCA: $O(1)$; CLA: $O(n)$
- **B)** RCA: $O(\log n)$; CLA: $O(n)$
- **C)** RCA: $O(n)$; CLA: $O(\log n)$
- **D)** RCA: $O(n^2)$; CLA: $O(n)$

3. For a 1-bit Full Adder stage, what is the boolean expression for the Carry Propagate ($P_i$) term?
- **A)** $P_i = A_i \cdot B_i$
- **B)** $P_i = A_i \oplus B_i$
- **C)** $P_i = A_i + C_i$
- **D)** $P_i = \overline{A_i \cdot B_i}$

4. What is the primary physical constraint that prevents microprocessors from implementing single-level 64-bit Carry Lookahead Adders?
- **A)** Excessive clock cycle skew in synchronous flip-flops
- **B)** High gate fan-in and fan-out constraints in silicon lithography
- **C)** Inability to perform boolean OR operations on more than 2 variables
- **D)** Sub-threshold leakage current in 2's complement registers

5. In a unified 4-bit Adder/Subtractor circuit, if the subtraction control line $\text{Sub} = 1$, what are the inputs applied to the first Full Adder stage (FA 0)?
- **A)** $A_0$, $B_0$, $C_0 = 0$
- **B)** $A_0$, $\overline{B_0}$, $C_0 = 0$
- **C)** $A_0$, $\overline{B_0}$, $C_0 = 1$
- **D)** $\overline{A_0}$, $B_0$, $C_0 = 1$

### Answer Key & Explanations

1. **B**. Signed overflow occurs if the carry entering the sign position ($C_{n-1}$) differs from the carry leaving the sign position ($C_n$). This condition is evaluated by the XOR gate $V = C_n \oplus C_{n-1}$.
2. **C**. Ripple Carry Adders cascade carry signals linearly through $n$ stages ($O(n)$), while Hierarchical Carry Lookahead Adders group carries tree-wise, achieving logarithmic delay ($O(\log n)$).
3. **B**. The carry propagate term is $P_i = A_i \oplus B_i$ (or $A_i + B_i$), indicating that if either input bit is `1`, an incoming carry will be propagated to the next stage.
4. **B**. Expanding carry formulas directly to 64 bits creates boolean terms requiring gates with up to 65 inputs. Real silicon transistors suffer severe RC propagation slowdown and signal degradation at high fan-in.
5. **C**. When $\text{Sub} = 1$, the input XOR gate inverts $B_0$ to $\overline{B_0}$ and sets the initial carry-in $C_0 = 1$, effectively completing the 2's complement negation $A + \overline{B} + 1$.

## References & Navigation

- **Previous Topic:** [[Integer Representation & Fixed-Point Arithmetic]]
- **Next Topic:** [[Unsigned Multiplication (Array & Sequential Multipliers)]]
- **Related Notes:** [[Signed Multiplication (Booth's & Extended Booth's Algorithm)]], [[Binary Division (Restoring & Non-Restoring Division Algorithms)]]
