---
id: Problem-Set-Floating-Point-Rounding
type: problem-set
course: CSARCH2
topic: Floating-Point Rounding Modes (IEEE-754)
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSARCH2]] #[[Computer Architecture]] #[[Floating-Point Rounding]] #[[Rounding Modes]] #[[Guard Round Sticky]] #[[Truncation]] #[[IEEE-754]]

---

# Problem Set: Floating-Point Rounding

## 📖 Overview & Theoretical Foundations

During floating-point arithmetic (e.g., alignment shifts, multiplication, division), intermediate calculations frequently generate more bits or digits of precision than can fit into the destination register (e.g., 24 bits in single precision, 53 bits in double precision). **Rounding** is the process of mapping an exact infinite-precision or extended-precision real number $x$ to the nearest representable floating-point number $x'$.

```text
                 IEEE-754 Rounding Direction on the Real Number Line
                    
  <--- Round Down (-oo) ────────────────────────────────── Round Up (+oo) --->
  ───────────────────┬───────────────────────┼───────────────────────┬───────>
                  x_lower                    x                    x_upper
                     │                       │                       │
                     └─────── Truncate ──────┴─────── Truncate ──────┘
                           (if x > 0)               (if x < 0)
                                        --> 0 <--
```

### 1. The Four IEEE-754 Rounding Modes

| Rounding Mode | Symbol / Alias | Mathematical Definition for $x$ | Behavior on Negative Numbers ($x < 0$) | Behavior on Positive Numbers ($x > 0$) |
| :--- | :--- | :--- | :--- | :--- |
| **Truncate** | Round toward $0$ (Chop) | $\operatorname{sign}(x) \cdot \lfloor \|x\| \rfloor_p$ | Discards trailing digits (moves rightward toward $0$) | Discards trailing digits (moves leftward toward $0$) |
| **Round Up** | Round toward $+\infty$ (Ceiling) | $\lceil x \rceil_p$ | Discards trailing digits (less negative, moves right toward $0$) | Adds $1$ to LSB if discarded digits $>0$ (moves right away from $0$) |
| **Round Down** | Round toward $-\infty$ (Floor) | $\lfloor x \rfloor_p$ | Adds $1$ to magnitude if discarded digits $>0$ (more negative, moves left) | Discards trailing digits (moves left toward $0$) |
| **Round to Nearest (Ties to Even)** | Banker's Rounding (Default) | $\operatorname{round}_{\text{even}}(x)$ | Rounds to closest value; on exact halfway tie, chooses LSB $= 0$ (even) | Rounds to closest value; on exact halfway tie, chooses LSB $= 0$ (even) |

---

### 2. Guard ($G$), Round ($R$), and Sticky ($S$) Bits in Binary Hardware

To perform IEEE-754 compliant rounding without maintaining an infinite number of hardware flip-flops, floating-point units (FPUs) append three auxiliary bits during intermediate alignment and arithmetic:

```text
 Significand Register (p bits)          Auxiliary Bits
┌───┬───┬───┬───┬───┬───┬───┬───┐    ┌───┬───┬───┐
│b0 │b1 │b2 │...│...│...│...│bp │    │ G │ R │ S │
└───┴───┴───┴───┴───┴───┴───┴───┘    └───┴───┴───┘
                             LSB       │   │   └── Logical OR of all bits
                                       │   │       shifted beyond R (2^-(p+2)...)
                                       │   └────── Second discarded bit (2^-(p+1))
                                       └────────── First discarded bit (2^-p)
```

#### Round to Nearest (Ties to Even) Decision Rule:
- **Case 1: $G = 0$**
  - Discarded value is $< \frac{1}{2}$ of the LSB unit.
  - **Action:** Round DOWN (Truncate / Do not add to LSB).
- **Case 2: $G = 1$ and ($R = 1$ or $S = 1$)**
  - Discarded value is $> \frac{1}{2}$ of the LSB unit.
  - **Action:** Round UP (Add $1$ to LSB of significand).
- **Case 3: $G = 1$ and $R = 0$ and $S = 0$ (Exact Halfway Tie)**
  - Discarded value is exactly equal to $\frac{1}{2}$ LSB.
  - **Action (Ties to Even):**
    - If current LSB is **$0$ (Even)** $\implies$ Keep as is (Do not add $1$).
    - If current LSB is **$1$ (Odd)** $\implies$ Add $1$ to LSB to make it **Even ($0$)**.

---

## ✍️ Problem Solutions

### Problem 1: Rounding the Decimal Value $-1.86855$

#### 📋 Problem Statement
Apply all four floating-point rounding modes to the decimal number **$-1.86855$** for:
- **a.)** 4 decimal digits
- **b.)** 3 decimal digits

---

#### 🔍 Step-by-Step Derivation

#### Part (a): Rounding to 4 Decimal Digits (4 Fractional Places)
- **Input:** $x = -1.86855$
- **Target Precision:** 4 digits after the decimal point (retaining $d_1 d_2 d_3 d_4$).
- **Retained Prefix:** $-1.8685$
- **Discarded Part:** $.00005$ (the $5\text{th}$ decimal digit is $5$, with no further nonzero digits).
- **Bracketing Representable Numbers:**
  $$\text{Upper (closer to } +\infty\text{): } x_{\text{upper}} = -1.8685$$
  $$\text{Lower (closer to } -\infty\text{): } x_{\text{lower}} = -1.8686$$

1. **Truncate (Round toward $0$):**
   - Discard the trailing $5$.
   - Moving toward $0$ increases the value of a negative number:
     $$\text{Result} = \mathbf{-1.8685}$$

2. **Round Up (Round toward $+\infty$):**
   - The ceiling $\lceil -1.86855 \rceil$ at 4 decimal places is $-1.8685$ (since $-1.8685 > -1.86855$).
     $$\text{Result} = \mathbf{-1.8685}$$

3. **Round Down (Round toward $-\infty$):**
   - The floor $\lfloor -1.86855 \rfloor$ at 4 decimal places is $-1.8686$ (since $-1.8686 < -1.86855$).
     $$\text{Result} = \mathbf{-1.8686}$$

4. **Round to Nearest (Ties to Even):**
   - Distance to $-1.8685$: $|-1.86855 - (-1.8685)| = 0.00005$.
   - Distance to $-1.8686$: $|-1.86855 - (-1.8686)| = 0.00005$.
   - **Exact Halfway Tie:** Compare least significant retained digit:
     - In $-1.8685$, the last digit is **$5$ (Odd)**.
     - In $-1.8686$, the last digit is **$6$ (Even)**.
   - Tie breaks toward the even digit:
     $$\text{Result} = \mathbf{-1.8686}$$

---

#### Part (b): Rounding to 3 Decimal Digits (3 Fractional Places)
- **Input:** $x = -1.86855$
- **Target Precision:** 3 digits after the decimal point (retaining $d_1 d_2 d_3$).
- **Retained Prefix:** $-1.868$
- **Discarded Part:** $.00055$ (digits $55$).
- **Bracketing Representable Numbers:**
  $$\text{Upper: } x_{\text{upper}} = -1.868$$
  $$\text{Lower: } x_{\text{lower}} = -1.869$$

1. **Truncate (Round toward $0$):**
   - Discard the $.00055$.
     $$\text{Result} = \mathbf{-1.868}$$

2. **Round Up (Round toward $+\infty$):**
   - Moving toward $+\infty$ picks the algebraically larger number:
     $$\text{Result} = \mathbf{-1.868}$$

3. **Round Down (Round toward $-\infty$):**
   - Moving toward $-\infty$ picks the algebraically smaller number:
     $$\text{Result} = \mathbf{-1.869}$$

4. **Round to Nearest (Ties to Even):**
   - The discarded portion is $0.00055$.
   - Comparing to the half-step $0.00050$:
     $$0.00055 > 0.00050$$
   - Since the discarded value is **strictly greater than halfway**, $-1.86855$ is strictly closer to $-1.869$ (distance $0.00045$) than to $-1.868$ (distance $0.00055$).
   - No tie-breaking is invoked; standard nearest applies:
     $$\text{Result} = \mathbf{-1.869}$$

---

#### 📊 Result Summary Table (Problem 1)

| Precision Target | Truncate (toward 0) | Round Up (toward $+\infty$) | Round Down (toward $-\infty$) | Round to Nearest (Ties to Even) |
| :--- | :---: | :---: | :---: | :---: |
| **a.) 4 Decimal Digits** (places) | `-1.8685` | `-1.8685` | `-1.8686` | **`-1.8686`** (tie $\to$ even) |
| **b.) 3 Decimal Digits** (places) | `-1.868` | `-1.868` | `-1.869` | **`-1.869`** ($> 0.5 \to$ nearest) |

> [!note] Alternative Context: Total Significant Digits
> If interpreted as **total significant digits** (1 integer + $(N-1)$ fractional digits):
> - **4 Total Digits (1 int + 3 frac):** Truncate: `-1.868`, Round Up: `-1.868`, Round Down: `-1.869`, Round Nearest: `-1.869`.
> - **3 Total Digits (1 int + 2 frac):** Discarded is $.00855 > .00500 \implies$ Truncate: `-1.86`, Round Up: `-1.86`, Round Down: `-1.87`, Round Nearest: `-1.87`.

---

### Problem 2: Rounding the Binary Value $-1.011100_2$

#### 📋 Problem Statement
Apply all four floating-point rounding modes to the binary floating-point significand **$-1.011100_2$** for:
- **a.)** 4 binary digits
- **b.)** 3 binary digits

---

#### 🔍 Step-by-Step Derivation

#### Part (a): Rounding to 4 Binary Digits (4 Fractional Bits)
- **Input:** $x = -1.011100_2$
- **Target Precision:** 4 bits after the radix point (retaining $b_1 b_2 b_3 b_4 = 0111_2$).
- **Retained Prefix:** $-1.0111_2$
- **Discarded Bits:** $00_2$ ($G = 0, R = 0, S = 0$).
- **Observation:** The discarded bits are identically zero. The value is already **exact** at 4 fractional binary digits.

1. **Truncate (toward $0$):**
   $$\text{Result} = \mathbf{-1.0111_2}$$

2. **Round Up (toward $+\infty$):**
   $$\text{Result} = \mathbf{-1.0111_2}$$

3. **Round Down (toward $-\infty$):**
   $$\text{Result} = \mathbf{-1.0111_2}$$

4. **Round to Nearest (Ties to Even):**
   $$\text{Result} = \mathbf{-1.0111_2}$$

*(All 4 modes produce identical results because no truncation error exists).*

---

#### Part (b): Rounding to 3 Binary Digits (3 Fractional Bits)
- **Input:** $x = -1.011100_2$
- **Target Precision:** 3 bits after the radix point (retaining $b_1 b_2 b_3 = 011_2$).
- **Retained Prefix:** $-1.011_2$
- **Discarded Bits:** $1100_2$
  - Guard Bit ($G$, bit 4): $1$
  - Round Bit ($R$, bit 5): $1$
  - Sticky Bit ($S$, remaining): $0 \lor 0 = 0$
- **Bracketing Representable Binary Numbers:**
  $$\text{Upper (toward } +\infty\text{): } x_{\text{upper}} = -1.011_2 = -1.375_{10}$$
  $$\text{Lower (toward } -\infty\text{): } x_{\text{lower}} = -(1.011_2 + 0.001_2) = -1.100_2 = -1.500_{10}$$
- **Actual Exact Value:** $-1.011100_2 = -(1 + \frac{0}{2} + \frac{1}{4} + \frac{1}{8} + \frac{1}{16}) = -1.4375_{10}$.

1. **Truncate (Round toward $0$):**
   - Discard the bits $1100_2$ to move toward $0$:
     $$\text{Result} = \mathbf{-1.011_2}$$

2. **Round Up (Round toward $+\infty$):**
   - Moving toward $+\infty$ picks the algebraically larger number:
     $$\text{Result} = \mathbf{-1.011_2}$$

3. **Round Down (Round toward $-\infty$):**
   - Moving toward $-\infty$ subtracts $1$ LSB ($0.001_2$) to make it more negative:
     $$-(1.011_2 + 0.001_2) = \mathbf{-1.100_2}$$

4. **Round to Nearest (Ties to Even):**
   - Discarded portion is $.1100_2 = \frac{1}{2} + \frac{1}{4} = 0.75_{10}$.
   - Comparing against the halfway threshold of $0.5_{10}$ (which is $.1000_2$):
     $$\text{Discarded } (.11_2) > \text{Halfway } (.10_2) \iff G = 1 \text{ and } R = 1$$
   - Because the discarded bits exceed the halfway mark ($0.75 > 0.50$), $-1.011100_2$ is strictly closer to $-1.100_2$ (distance $0.0625$) than to $-1.011_2$ (distance $0.0625 \times 3 = 0.1875$).
   - Therefore, it rounds to the nearest value:
     $$\text{Result} = \mathbf{-1.100_2}$$

---

#### 📊 Result Summary Table (Problem 2)

| Precision Target | Truncate (toward 0) | Round Up (toward $+\infty$) | Round Down (toward $-\infty$) | Round to Nearest (Ties to Even) |
| :--- | :---: | :---: | :---: | :---: |
| **a.) 4 Binary Digits** (places) | `-1.0111` | `-1.0111` | `-1.0111` | **`-1.0111`** (Exact) |
| **b.) 3 Binary Digits** (places) | `-1.011` | `-1.011` | `-1.100` | **`-1.100`** ($G=1, R=1 > 0.5$) |

> [!note] Alternative Context: Total Significant Bits
> If interpreted as **total significant bits** (1 integer bit + $(N-1)$ fractional bits):
> - **4 Total Bits (1 int + 3 frac):** Yields identical results to row (b) above (`-1.011`, `-1.011`, `-1.100`, `-1.100`).
> - **3 Total Bits (1 int + 2 frac):** Kept: $-1.01_2$, Discarded: $11100_2 \implies G=1, R=1, S=1 > 0.5 \implies$ Truncate: `-1.01`, Round Up: `-1.01`, Round Down: `-1.10`, Round Nearest: `-1.10`.

---

## 💻 Python Verification Script

```python
from decimal import Decimal, ROUND_DOWN, ROUND_CEILING, ROUND_FLOOR, ROUND_HALF_EVEN

def verify_decimal_rounding():
    val = Decimal('-1.86855')
    
    # 4 decimal places
    q4 = Decimal('0.0001')
    t4 = val.quantize(q4, rounding=ROUND_DOWN)
    u4 = val.quantize(q4, rounding=ROUND_CEILING)
    d4 = val.quantize(q4, rounding=ROUND_FLOOR)
    n4 = val.quantize(q4, rounding=ROUND_HALF_EVEN)
    print(f"Decimal 4 places -> Trunc: {t4}, Up: {u4}, Down: {d4}, Nearest: {n4}")

    # 3 decimal places
    q3 = Decimal('0.001')
    t3 = val.quantize(q3, rounding=ROUND_DOWN)
    u3 = val.quantize(q3, rounding=ROUND_CEILING)
    d3 = val.quantize(q3, rounding=ROUND_FLOOR)
    n3 = val.quantize(q3, rounding=ROUND_HALF_EVEN)
    print(f"Decimal 3 places -> Trunc: {t3}, Up: {u3}, Down: {d3}, Nearest: {n3}")

verify_decimal_rounding()
```

---

## 🔑 Key Takeaways & Rounding Decision Table

1. **Negative Value Directions:**
   - On the negative side of the real line, moving toward **$+\infty$ (Round Up)** decreases the magnitude (less negative, identical to truncation toward zero).
   - Moving toward **$-\infty$ (Round Down)** increases the magnitude (more negative, subtracts $1$ LSB).
2. **Ties to Even (Banker's Rule):**
   - Active **only** when the discarded fraction is **exactly halfway** ($G=1, R=0, S=0$ in binary; $5$ followed by all $0$s in decimal).
   - If discarded portion $> \frac{1}{2}$, always round to the larger magnitude (UP).
   - If discarded portion $< \frac{1}{2}$, always round to the smaller magnitude (DOWN).
3. **Hardware Efficiency of Sticky Bit:**
   - A single $S$ bit replaces hundreds of comparison bits by accumulating $S \leftarrow S \lor \text{bit}$ during right-shift alignment.


## References & Navigation

- **Related Notes:** [[Floating-Point Operations & Errors]]
