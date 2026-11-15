---
id: sums_and_sequences_04
type: note
course: CCDSTRU
topic: Sums and Sequences
status: completed
---
# Sums and Sequences

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Problem Solving]] #[[Sequences]] #[[Summations]] #[[CCDSTRU]] #[[M4]]

---

## Important Formulas & Concepts

### Sequences
A sequence $\{a_n\}$ is an ordered list (a function from a subset of integers). **Geometric Progression:** Sequence of the form $a, ar, ar^2, \dots, ar^n, \dots$
Initial term $a$, common ratio $r$. **Arithmetic Progression:** Sequence of the form $a, a+d, a+2d, \dots, a+nd, \dots$
Initial term $a$, common difference $d$. **Recurrence Relation:** An equation that expresses $a_n$ in terms of one or more of the previous terms (e.g., $a_n = 3a_{n-1} + 2$).

### Summations
The sum of terms $a_m, a_{m+1}, \dots, a_n$ is denoted by $\sum_{j=m}^n a_j$.

**Common Closed Form Summations:** $\sum_{j=m}^n 1 = n - m + 1$ $\sum_{j=0}^n r^j = \frac{r^{n+1} - 1}{r - 1} \quad (\text{where } r \neq 1)$ $\sum_{j=0}^n j = \frac{n(n + 1)}{2}$ $\sum_{j=0}^n j^2 = \frac{n(n + 1)(2n + 1)}{6}$ $\sum_{j=0}^n j^3 = \frac{n^2(n + 1)^2}{4}$

## Worked Examples

**Example 1: Expanding Sums**
$\sum_{j=1}^{50} (2j) = 2 + 4 + 6 + \dots + 100$

**Example 2: Splitting Summations**
$\sum_{j=0}^{n} (j^2 + 3j) = \sum_{j=0}^{n} j^2 + \sum_{j=0}^{n} 3j$

**Example 3: Double Summation Evaluation**
Evaluate $\sum_{j=1}^n \sum_{k=1}^n jk$ Inner sum: $\sum_{k=1}^n jk = j \sum_{k=1}^n k = j \left( \frac{n(n+1)}{2} \right)$ Outer sum: $\sum_{j=1}^n \left( j \frac{n(n+1)}{2} \right) = \frac{n(n+1)}{2} \sum_{j=1}^n j = \frac{n(n+1)}{2} \cdot \frac{n(n+1)}{2}$ Final result: $\frac{n^2(n+1)^2}{4}$

## Multiple Choice Questions

1. Which sequence form defines an **arithmetic progression** with initial term $a$ and common difference $d$?
    - **A)** a, ar, ar², ..., arⁿ
    - **B)** a, a + d, a + 2d, ..., a + nd
    - **C)** a(n) = 3a(n - 1) + 2
    - **D)** a, a/d, a/(2d), ..., a/(nd)

2. Using the closed-form summation $\sum_{j=m}^n 1 = n - m + 1$, what is the value of $\sum_{j=5}^{20} 1$?
    - **A)** 15
    - **B)** 20
    - **C)** 16
    - **D)** 26

3. What is the closed-form expression for the geometric summation $\sum_{j=0}^n r^j$ when $r \neq 1$?
    - **A)** n(n + 1) / 2
    - **B)** (r^n - 1) / (r - 1)
    - **C)** (r^(n+1) - r) / (r - 1)
    - **D)** (r^(n+1) - 1) / (r - 1)

4. Applying the double summation formula $\sum_{j=1}^n \sum_{k=1}^n jk = \frac{n^2(n+1)^2}{4}$ from Worked Example 3, what is the value of $\sum_{j=1}^4 \sum_{k=1}^4 jk$?
    - **A)** 100
    - **B)** 30
    - **C)** 400
    - **D)** 64

5. Given the recurrence relation $a_n = 3a_{n-1} + 2$ with initial term $a_0 = 1$, what is the value of $a_2$?
    - **A)** 5
    - **B)** 11
    - **C)** 17
    - **D)** 15

### Answer Key & Explanations

1. **B)** An arithmetic progression has initial term $a$ and adds a constant common difference $d$ at each step, yielding $a, a + d, a + 2d, \dots, a + nd, \dots$.
2. **C)** Substituting $m = 5$ and $n = 20$ into $\sum_{j=m}^n 1 = n - m + 1$ counts every index from $5$ through $20$ inclusive: $20 - 5 + 1 = 16$.
3. **D)** From the Common Closed Form Summations list, the geometric series starting at $j = 0$ with $r \neq 1$ evaluates to $\frac{r^{n+1} - 1}{r - 1}$.
4. **A)** Substituting $n = 4$ into $\frac{n^2(n+1)^2}{4}$ gives $\frac{4^2 \cdot 5^2}{4} = \frac{16 \cdot 25}{4} = 100$.
5. **C)** Applying $a_n = 3a_{n-1} + 2$ step by step from $a_0 = 1$ gives $a_1 = 3(1) + 2 = 5$, and then $a_2 = 3(5) + 2 = 17$.

## References & Navigation

- **Previous Topic:** [[Propositional Functions]]
- **Next Topic:** [[Sets]]
- **Related Notes:** [[Mathematical Induction]], [[Propositional Functions]]
