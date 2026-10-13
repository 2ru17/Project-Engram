---
id: number_theory_09
type: note
course: CCDSTRU
topic: Number Theory
status: completed
---

# Number Theory (Integers and Division)

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Problem Solving]] #[[Number Theory]] #[[Discrete Math]] #[[CCDSTRU]] #[[M9]] #[[Cryptography]]

---

## Important Formulas & Core Concepts

Number theory investigates the properties of integers $\mathbb{Z}$, with fundamental applications across cryptography (RSA, Diffie-Hellman), hashing algorithms, and pseudo-random number generation.

### 1. Division & Modular Arithmetic
- **Divisibility ($a \mid b$):** For $a, b \in \mathbb{Z}$ with $a \ne 0$, $a$ divides $b$ if and only if there exists an integer $c$ such that $b = a \cdot c$.
- **The Division Algorithm:** For integer $a$ and positive integer $d$, there exist unique integers $q$ (quotient) and $r$ (remainder) such that:
  $$a = d \cdot q + r, \quad \text{where } 0 \le r < d$$
- **Modular Congruence:** Integers $a$ and $b$ are congruent modulo $m$ ($m \in \mathbb{Z}^+$), written $a \equiv b \pmod m$, if and only if $m \mid (a - b)$.
  - Equivalently: $a \bmod m = b \bmod m$, or $a = b + k \cdot m$ for some $k \in \mathbb{Z}$.

### 2. Primes, GCD, & Fundamental Theorem of Arithmetic
- **Prime Number:** An integer $p > 1$ whose only positive divisors are $1$ and $p$.
- **Fundamental Theorem of Arithmetic:** Every integer $n > 1$ can be expressed uniquely as a product of prime numbers in non-decreasing order:
  $$n = p_1^{a_1} p_2^{a_2} \dots p_k^{a_k}$$
- **Greatest Common Divisor ($\gcd(a, b)$):** The largest positive integer dividing both $a$ and $b$. If $\gcd(a, b) = 1$, $a$ and $b$ are **relatively prime (coprime)**.
- **Least Common Multiple ($\operatorname{lcm}(a, b)$):** Smallest positive integer divisible by both $a$ and $b$.
  $$\gcd(a, b) \cdot \operatorname{lcm}(a, b) = a \cdot b \quad (\text{for } a, b > 0)$$

### 3. Bézout's Identity & Modular Inverses
- **Bézout's Theorem:** For non-zero integers $a$ and $b$, there exist integers $s$ and $t$ (Bézout coefficients) such that:
  $$s \cdot a + t \cdot b = \gcd(a, b)$$
- **Modular Multiplicative Inverse:** An integer $\bar{a}$ is the modular inverse of $a$ modulo $m$ if:
  $$a \cdot \bar{a} \equiv 1 \pmod m$$
  The inverse $\bar{a} \pmod m$ exists **if and only if** $\gcd(a, m) = 1$.

---

## Stepped Algorithmic Traces & Calculations

### Calculation 1: Extended Euclidean Algorithm & Modular Inverse

**Problem:** Find $\gcd(43, 17)$ and compute the modular inverse of $17 \pmod{43}$.

#### Step 1: Forward Euclidean Division
1. $43 = 2 \cdot 17 + 9 \implies 9 = 43 - 2(17)$
2. $17 = 1 \cdot 9 + 8 \implies 8 = 17 - 1(9)$
3. $9 = 1 \cdot 8 + 1 \implies 1 = 9 - 1(8)$
4. $8 = 8 \cdot 1 + 0$ (Remainder 0; last non-zero remainder is 1)
Thus, $\gcd(43, 17) = 1$, confirming that $17$ is invertible modulo $43$.

#### Step 2: Extended Back-Substitution for Bézout Coefficients
Express the remainder $1$ in terms of $43$ and $17$:
$$
\begin{aligned}
1 &= 9 - 1(8) \\
&= 9 - 1[17 - 1(9)] = 2(9) - 1(17) \\
&= 2[43 - 2(17)] - 1(17) = 2(43) - 4(17) - 1(17) \\
1 &= 2(43) - 5(17)
\end{aligned}
$$
Hence, Bézout's Identity is:
$$
2(43) + (-5)(17) = 1
$$

#### Step 3: Extract Modular Inverse
Reducing modulo $43$:
$$
(-5) \cdot 17 \equiv 1 \pmod{43}
$$
Because the coefficient $-5$ is negative, add $43$ to find the canonical representative in $[0, 42]$:
$$
\bar{a} \equiv -5 + 43 = \mathbf{38} \pmod{43}
$$
*Verification:* $17 \times 38 = 646$. Notice $646 = 15 \times 43 + 1 \equiv 1 \pmod{43}$. Correct!

---

### Calculation 2: Solving a Linear Congruence

**Problem:** Solve the linear congruence $7x \equiv 3 \pmod{19}$.

#### Step 1: Find Inverse of 7 Modulo 19
Since $\gcd(7, 19) = 1$, an inverse exists. Use Euclidean algorithm:
- $19 = 2(7) + 5 \implies 5 = 19 - 2(7)$
- $7 = 1(5) + 2 \implies 2 = 7 - 1(5)$
- $5 = 2(2) + 1 \implies 1 = 5 - 2(2)$
Back-substitute:
$$
1 = 5 - 2[7 - 1(5)] = 3(5) - 2(7) = 3[19 - 2(7)] - 2(7) = 3(19) - 8(7)
$$
Thus, $(-8) \cdot 7 \equiv 1 \pmod{19} \implies 7^{-1} \equiv -8 + 19 = 11 \pmod{19}$.

#### Step 2: Multiply Both Sides by the Inverse
$$
x \equiv 11 \cdot 3 \pmod{19}
$$
$$
x \equiv 33 \equiv 33 - 19 = \mathbf{14} \pmod{19}
$$
*Verification:* $7(14) = 98$. And $98 = 5(19) + 3 \equiv 3 \pmod{19}$. Solution is unique modulo 19: $x \equiv 14 \pmod{19}$.

---

### Calculation 3: Chinese Remainder Theorem (CRT)

**Problem:** Find the smallest non-negative integer $x$ satisfying the system:
$$
x \equiv 2 \pmod 3, \quad x \equiv 3 \pmod 5, \quad x \equiv 2 \pmod 7
$$

#### Step 1: Verify Pairwise Coprimality
The moduli $m_1 = 3, m_2 = 5, m_3 = 7$ are pairwise coprime ($\gcd(3, 5) = \gcd(3, 7) = \gcd(5, 7) = 1$).
Compute product of moduli:
$$
M = m_1 \cdot m_2 \cdot m_3 = 3 \times 5 \times 7 = 105
$$

#### Step 2: Compute Partial Moduli & Their Inverses
1. For $m_1 = 3$:
   $$M_1 = \frac{105}{3} = 35$$
   Find $y_1$ such that $35 y_1 \equiv 1 \pmod 3 \implies 2 y_1 \equiv 1 \pmod 3 \implies y_1 = 2$.
2. For $m_2 = 5$:
   $$M_2 = \frac{105}{5} = 21$$
   Find $y_2$ such that $21 y_2 \equiv 1 \pmod 5 \implies 1 y_2 \equiv 1 \pmod 5 \implies y_2 = 1$.
3. For $m_3 = 7$:
   $$M_3 = \frac{105}{7} = 15$$
   Find $y_3$ such that $15 y_3 \equiv 1 \pmod 7 \implies 1 y_3 \equiv 1 \pmod 7 \implies y_3 = 1$.

#### Step 3: Compute Linear Combination
$$
x = \sum_{i=1}^3 a_i M_i y_i \pmod M
$$
$$
x = (2 \times 35 \times 2) + (3 \times 21 \times 1) + (2 \times 15 \times 1)
$$
$$
x = 140 + 63 + 30 = 233
$$
Reduce modulo $105$:
$$
x \equiv 233 \bmod 105 = 233 - 2(105) = 233 - 210 = \mathbf{23}
$$

#### Step 4: Verification
- $23 = 7(3) + 2 \equiv 2 \pmod 3$
- $23 = 4(5) + 3 \equiv 3 \pmod 5$
- $23 = 3(7) + 2 \equiv 2 \pmod 7$
The unique solution modulo 105 is $x = \mathbf{23}$.

---

## Multiple Choice Questions

1. Under what necessary and sufficient condition does an integer $a$ have a modular multiplicative inverse modulo $m$?
    - **A)** $a < m$
    - **B)** $\gcd(a, m) = 1$ ($a$ and $m$ are relatively prime)
    - **C)** $m$ must be an even number
    - **D)** $a$ must be prime

2. What does Bézout's Identity state for non-zero integers $a$ and $b$?
    - **A)** $a + b = \operatorname{lcm}(a, b)$
    - **B)** There exist integers $s$ and $t$ such that $sa + tb = \gcd(a, b)$
    - **C)** $a^b \equiv b^a \pmod{ab}$
    - **D)** $\gcd(a, b) = 1$ for all integers

3. In the Chinese Remainder Theorem, what condition must the set of moduli $\{m_1, m_2, \dots, m_k\}$ satisfy?
    - **A)** All moduli must be prime numbers.
    - **B)** The moduli must be pairwise relatively prime ($\gcd(m_i, m_j) = 1$ for all $i \ne j$).
    - **C)** The sum of all moduli must be odd.
    - **D)** The moduli must be in descending order.

4. If $\gcd(a, b) = 12$ and $\operatorname{lcm}(a, b) = 360$, what is the product $a \cdot b$?
    - **A)** 30
    - **B)** 372
    - **C)** 4320
    - **D)** 2160

5. What is the modular multiplicative inverse of $17$ modulo $43$?
    - **A)** 5
    - **B)** 38
    - **C)** 19
    - **D)** 26

6. If $a \equiv b \pmod m$ and $c \equiv d \pmod m$, which of the following operations is NOT universally valid?
    - **A)** $a + c \equiv b + d \pmod m$
    - **B)** $ac \equiv bd \pmod m$
    - **C)** $a^k \equiv b^k \pmod m$ for positive integer $k$
    - **D)** $a / c \equiv b / d \pmod m$

7. When testing whether $n = 101$ is prime using trial division, what is the largest prime divisor that needs to be tested?
    - **A)** 101
    - **B)** 50
    - **C)** 7 ($\lfloor\sqrt{101}\rfloor = 10$, primes are 2, 3, 5, 7)
    - **D)** 11

8. What is the solution to $7x \equiv 3 \pmod{19}$?
    - **A)** $x \equiv 14 \pmod{19}$
    - **B)** $x \equiv 5 \pmod{19}$
    - **C)** $x \equiv 2 \pmod{19}$
    - **D)** No solution exists

9. For what modulus $m$ is $12 \equiv 2 \pmod m$ valid?
    - **A)** $m = 3$ only
    - **B)** Any integer $m > 0$ that divides $12 - 2 = 10$ ($m \in \{1, 2, 5, 10\}$)
    - **C)** $m = 7$
    - **D)** $m = 12$

10. In the Chinese Remainder Theorem example, what is the unique solution modulo 105 for $x \equiv 2 \pmod 3$, $x \equiv 3 \pmod 5$, and $x \equiv 2 \pmod 7$?
    - **A)** 23
    - **B)** 45
    - **C)** 53
    - **D)** 83

---

### Answer Key & Explanations

1. **B** - By Bézout's identity, $sa + tm = 1 \iff sa \equiv 1 \pmod m$, which holds if and only if $\gcd(a, m) = 1$.
2. **B** - Bézout's theorem guarantees the greatest common divisor can always be expressed as an integer linear combination of $a$ and $b$.
3. **B** - Pairwise coprimality ensures the partial moduli inverses exist and that the solution is unique modulo $M = \prod m_i$.
4. **C** - Using $\gcd(a, b) \cdot \operatorname{lcm}(a, b) = a \cdot b$, we have $12 \times 360 = 4320$.
5. **B** - From the Extended Euclidean Algorithm, $-5(17) \equiv 1 \pmod{43} \implies -5 + 43 = 38$.
6. **D** - Modular division is only valid if the divisor is relatively prime to the modulus; simple division is generally invalid in modular arithmetic.
7. **C** - If $n$ is composite, it must have a prime factor $\le \sqrt{n} = \sqrt{101} \approx 10.049$. The primes $\le 10$ are 2, 3, 5, 7.
8. **A** - Multiplying by the inverse $7^{-1} \equiv 11 \pmod{19}$ yields $x \equiv 11 \times 3 = 33 \equiv 14 \pmod{19}$.
9. **B** - Congruence requires $m \mid (a - b)$, meaning $m \mid 10$.
10. **A** - Evaluating $x = 23$: $23 = 3(7)+2$, $23 = 5(4)+3$, $23 = 7(3)+2$.

---

## References & Navigation

- **Previous Topic:** [[Mathematical Induction]]
- **Related Notes:** [[Number Theory]], [[Equivalences]], [[Sums and Sequences]]
