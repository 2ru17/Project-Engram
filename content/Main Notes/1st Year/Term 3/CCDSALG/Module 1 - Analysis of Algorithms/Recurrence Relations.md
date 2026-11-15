---
id: ccdsalg_recurrence_relations
type: note
course: CCDSALG
topic: Recurrence Relations
status: completed
---
# Recurrence Relations

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCDSALG]] #[[Recurrences]] #[[Problem Solving]] #[[M1]]

---

## Overview

A **recurrence** is an equality or inequality that describes a function over integers or reals using the function itself. It is primarily used to describe the running time of recursive algorithms. A typical recurrence contains more than one case depending on the argument:
* **Base case**: The terminating condition of the recursion.
* **Recursive case**: The part of the function that calls itself with smaller arguments.

By convention, if a recurrence is stated without an explicit base case, it is assumed to be **algorithmic**. This means that for every sufficiently large threshold constant $n_0 > 0$:
1. For all $n < n_0$, $T(n) = \Theta(1)$.
2. For all $n \ge n_0$, every path of recursion terminates in a defined base case within a finite number of recursive invocations.

## Important Formulas

### Solving Recurrences: Iteration Method
The iteration method involves expanding the recurrence repeatedly to identify a pattern. By expressing $T(n)$ as a summation of terms, we can simplify it into a closed form or explicit formula and determine its Big-Oh complexity.

### Useful Summation Formulas
* Constant: $\sum_{j=a}^{b} 1 = b - a + 1$
* Arithmetic Series: $\sum_{j=0}^{n} j = \frac{n(n + 1)}{2}$
* Sum of Squares: $\sum_{j=0}^{n} j^2 = \frac{n(n + 1)(2n + 1)}{6}$
* Sum of Cubes: $\sum_{j=0}^{n} j^3 = \frac{n^2(n + 1)^2}{4}$
* Geometric Series: $\sum_{j=0}^{n} x^j = \frac{x^{n+1} - 1}{x - 1}$

### Useful Logarithm Formulas
For all real $a > 0, b > 0, c > 0, n$ and logarithm bases $\neq 1$:
* $a = b^{\log_b a}$
* $\log_b(a^n) = n \log_b a$
* Change of base: $\log_b a = \frac{\log_c a}{\log_c b}$
* Logarithmic identity: $a^{\log_b c} = c^{\log_b a}$
* Product rule: $\log_c(ab) = \log_c a + \log_c b$
* Reciprocal rule: $\log_b(1/a) = -\log_b a$
* Base flip: $\log_b a = \frac{1}{\log_a b}$

## Worked Examples

**Example 1: Formulating a Recurrence for Factorial**
```c
int factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}
```
The recurrence relation $T(n)$ for this algorithm is:
$$T(n) = \begin{cases} a & \text{if } n = 0 \\ T(n - 1) + b & \text{if } n > 0 \end{cases}$$
where $a$ is the constant time taken for the base case, and $b$ is the constant time taken for the multiplication and function overhead in the recursive step.

**Example 2: Iteration Method**
Determine the explicit formula and Big-Oh notation for:
$$T(n) = \begin{cases} 2 & \text{if } n = 1 \\ T(n - 1) + 3 & \text{if } n > 1 \end{cases}$$
We expand $T(n)$:
1. $T(n) = T(n-1) + 3$
2. $T(n) = (T(n-2) + 3) + 3 = T(n-2) + 2(3)$
3. $T(n) = (T(n-3) + 3) + 2(3) = T(n-3) + 3(3)$

Generalizing to $k$ iterations:
$T(n) = T(n - k) + k(3)$

To reach the base case where $n - k = 1$, we set $k = n - 1$. Substituting this back:
$$T(n) = T(1) + 3(n - 1)$$
$$T(n) = 2 + 3n - 3$$
$$T(n) = 3n - 1$$

Therefore, the closed form is $T(n) = 3n - 1$, which is **$O(n)$**.


## Multiple Choice Questions

1. When a recurrence relation is written without an explicit base case, what does the algorithmic recurrence convention assume for a sufficiently large threshold $n_0 > 0$?
    - **A)** T(n) = O(n) for all n < n0, and recursion may continue indefinitely
    - **B)** T(n) = Theta(1) for all n < n0, and every recursion path for n >= n0 terminates in a base case in finitely many calls
    - **C)** T(n) = 0 for all n < n0, and T(n) is undefined for n >= n0
    - **D)** Every recursive call must divide n by 2 until n = 1

2. How does the iteration method solve a recurrence relation?
    - **A)** By expanding the recurrence repeatedly to find a pattern, expressing T(n) as a summation, and simplifying to a closed form
    - **B)** By plotting runtime empirically on a physical machine and fitting a curve
    - **C)** By discarding the base case and keeping only the largest recursive constant
    - **D)** By converting the recursive C function into a circular queue

3. In the factorial recurrence $T(n) = a$ (for $n = 0$) and $T(n - 1) + b$ (for $n > 0$), what do the constants $a$ and $b$ represent?
    - **A)** a is the returned value 1, and b is the input parameter n
    - **B)** a is the number of recursive calls, and b is the stack memory size
    - **C)** a is the constant time for the base case, and b is the constant time for multiplication and call overhead in each recursive step
    - **D)** a is the asymptotic upper bound, and b is the lower bound

4. When solving $T(n) = T(n - 1) + 3$ with $T(1) = 2$ via the generalized expansion $T(n) = T(n - k) + 3k$, what substitution reaches the base case and what closed form results?
    - **A)** k = n, yielding T(n) = 3n + 2, which is O(n)
    - **B)** k = n + 1, yielding T(n) = 3n + 5, which is O(n)
    - **C)** k = n / 2, yielding T(n) = 1.5n + 2, which is O(log₂ n)
    - **D)** k = n - 1, yielding T(n) = 3n - 1, which is O(n)

5. Applying the iteration method and summation formulas to $T(0) = 1$ and $T(n) = T(n - 1) + n$ for $n > 0$, what is the closed form of $T(n)$?
    - **A)** n(n + 1) / 2
    - **B)** 1 + n(n + 1) / 2
    - **C)** 1 + n(n - 1) / 2
    - **D)** n^2 + 1

6. Using the constant summation formula $\sum_{j=a}^{b} 1 = b - a + 1$, what is the value of $\sum_{j=4}^{12} 1$?
    - **A)** 9
    - **B)** 8
    - **C)** 10
    - **D)** 16

7. According to the summation formulas in the note, what is the closed form of the geometric series $\sum_{j=0}^{n} x^j$ ($x \neq 1$)?
    - **A)** (x^n - 1) / (x - 1)
    - **B)** x^(n + 1) / (x - 1)
    - **C)** (x^(n + 1) - 1) / (x - 1)
    - **D)** n × x^n / (x - 1)

8. For positive real numbers $a, b, c$ with $b \neq 1$, which expression is guaranteed to equal $a^{\log_b c}$?
    - **A)** b^(log_a c)
    - **B)** a^(log_c b)
    - **C)** (a × c)^b
    - **D)** c^(log_b a)

9. Using the logarithm formulas in the note, which identity correctly expresses the base flip rule for $\log_b a$ ($a, b > 0$ and $a, b \neq 1$)?
    - **A)** 1 / log_a(b)
    - **B)** -log_a(b)
    - **C)** log_a(1 / b)
    - **D)** b^(log_a 1)

10. Which formula from the note gives the exact sum of cubes $\sum_{j=0}^{n} j^3$?
    - **A)** n(n + 1)(2n + 1) / 6
    - **B)** n^2 (n + 1)^2 / 4
    - **C)** n(n + 1) / 2
    - **D)** n^3 (n + 1) / 4

### Answer Key & Explanations

1. **B)** By convention, an algorithmic recurrence assumes $T(n) = \Theta(1)$ for $n < n_0$ and guarantees finite termination in a base case for every $n \ge n_0$.
2. **A)** The iteration method expands $T(n)$ step-by-step to expose a summation pattern, simplifies that summation to an explicit formula, and yields its Big-Oh bound.
3. **C)** In the factorial recurrence, $a$ represents the constant time of the base case (`if (n == 0) return 1;`), while $b$ represents the constant time of multiplication and function-call overhead per recursive step.
4. **D)** Setting $n - k = 1$ gives $k = n - 1$; substituting into $T(n - k) + 3k$ yields $T(1) + 3(n - 1) = 2 + 3n - 3 = 3n - 1$, which is $O(n)$.
5. **B)** Expanding $T(n) = T(n-1) + n$ down to $T(0)$ produces $T(0) + \sum_{j=1}^{n} j = 1 + \frac{n(n + 1)}{2}$.
6. **A)** Applying $\sum_{j=a}^{b} 1 = b - a + 1$ with $a = 4$ and $b = 12$ yields $12 - 4 + 1 = 9$.
7. **C)** The geometric series formula in the note states $\sum_{j=0}^{n} x^j = \frac{x^{n+1} - 1}{x - 1}$.
8. **D)** By the logarithmic identity listed in the note, $a^{\log_b c} = c^{\log_b a}$.
9. **A)** The base flip formula states $\log_b a = \frac{1}{\log_a b}$.
10. **B)** The sum of cubes formula is $\sum_{j=0}^{n} j^3 = \frac{n^2(n + 1)^2}{4}$ (whereas $\frac{n(n+1)(2n+1)}{6}$ is the sum of squares).

## References & Navigation

- **Previous Topic:** [[Asymptotic Bounds]]
- **Next Topic:** [[Algorithms - Search]]
- **Related Notes:** [[Recurrences]], [[Master Theorem]]
