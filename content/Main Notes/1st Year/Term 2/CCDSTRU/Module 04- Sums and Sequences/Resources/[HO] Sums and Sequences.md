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


## References & Navigation

- **Related Notes:** [[Sums and Sequences]]
