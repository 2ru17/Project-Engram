---
id: Handout_04_-_Recurrences
type: note
course: CCDSALG
topic: Recurrences
status: completed
---

# Recurrences

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


## References & Navigation

- **Related Notes:** [[Recurrences]]
