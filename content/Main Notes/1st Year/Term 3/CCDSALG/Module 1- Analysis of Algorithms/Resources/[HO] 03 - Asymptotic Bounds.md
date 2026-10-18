---
id: Handout_03_-_Asymptotic_Bounds
type: note
course: CCDSALG
topic: Asymptotic Bounds
status: completed
---

# Asymptotic Bounds

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCDSALG]] #[[Asymptotic Bounds]] #[[Problem Solving]] #[[M1]]

---

## Overview

The **order of growth** characterizes the efficiency of an algorithm, allowing for comparisons with alternative ones. It describes how the running time of an algorithm increases as the size of the input approaches infinity. 

When evaluating growth rate functions, the multiplicative constant of the higher-order term is ignored (e.g., $O(5n^2) = O(n^2)$), and growth rate functions can be combined using addition ($O(f(n)) + O(g(n)) = O(f(n) + g(n))$).

Common types of functions (from slowest to fastest growth):
* **Constant $O(1)$**: Time is independent of input size.
* **Logarithmic $O(\log_2 n)$**: Time increases slowly as input size increases.
* **Linear $O(n)$**: Time increases directly proportionally to input size.
* **Linear-logarithmic $O(n \log_2 n)$**: Time increases more rapidly than linear.
* **Quadratic $O(n^2)$**: Time increases rapidly with input size.
* **Cubic $O(n^3)$**: Time increases more rapidly than quadratic.
* **Exponential $O(2^n)$**: Time increases too rapidly to be practical for large inputs.

## Important Formulas

### 1. Big-Oh ($O$-notation)
Represents the **worst-case** running time. It defines an asymptotically loose **upper bound**.
$$O(g(n)) = \{ f(n) \mid \exists c > 0, n_0 > 0 \text{ such that } 0 \le f(n) \le c g(n), \forall n \ge n_0 \}$$

### 2. Big-Omega ($\Omega$-notation)
Represents the **best-case** running time. It defines an asymptotically loose **lower bound**.
$$\Omega(g(n)) = \{ f(n) \mid \exists c > 0, n_0 > 0 \text{ such that } 0 \le c g(n) \le f(n), \forall n \ge n_0 \}$$

### 3. Big-Theta ($\Theta$-notation)
Represents the **average-case** running time. It defines an asymptotically **tight bound** (both upper and lower bound).
$$\Theta(g(n)) = \{ f(n) \mid \exists c_1, c_2 > 0 \text{ and } n_0 > 0 \text{ such that } 0 \le c_1 g(n) \le f(n) \le c_2 g(n), \forall n \ge n_0 \}$$
Note: $f(n) = \Theta(g(n))$ if and only if $f(n) = O(g(n))$ and $f(n) = \Omega(g(n))$.

### 4. small-o ($o$-notation)
Denotes an upper bound that is **not asymptotically tight**. (e.g., $2n = o(n^2)$, but $2n^2 \neq o(n^2)$).
$$o(g(n)) = \{ f(n) \mid \forall c > 0, \exists n_0 > 0 \text{ such that } 0 \le f(n) < c g(n), \forall n \ge n_0 \}$$

### 5. small-omega ($\omega$-notation)
Denotes a lower bound that is **not asymptotically tight**.
$$\omega(g(n)) = \{ f(n) \mid \forall c > 0, \exists n_0 > 0 \text{ such that } 0 \le c g(n) < f(n), \forall n \ge n_0 \}$$
Note: $f(n) = \omega(g(n))$ if and only if $g(n) = o(f(n))$.

## Worked Examples

**Example 1: Big-Oh Proof**
Is $5n^2 + 150n + 750 = O(n^2)$?
**Yes.** We must find constants $c$ and $n_0$ such that $5n^2 + 150n + 750 \le c n^2$.
Dividing both sides by $n^2$: $5 + \frac{150}{n} + \frac{750}{n^2} \le c$.
If we pick $n_0 = 1$, then $5 + 150 + 750 = 905 \le c$. We can choose $c = 905$. (Another valid pair: $n_0 = 5, c = 65$).

**Example 2: Negative Big-Oh Proof**
Is $n^3 - 250n^2 = O(n^2)$?
**No.** We would need to find $c$ such that $n^3 - 250n^2 \le c n^2$.
Dividing by $n^2$: $n - 250 \le c$.
Since $n$ approaches infinity, the left side grows infinitely, so no positive constant $c$ will satisfy the condition for all $n \ge n_0$.

**Example 3: Big-Omega Proof**
Is $5n^2 + 150n + 750 = \Omega(n^2)$?
**Yes.** Find positive constants $c$ and $n_0$ such that $5n^2 + 150n + 750 \ge c n^2$.
Dividing by $n^2$: $5 + \frac{150}{n} + \frac{750}{n^2} \ge c$.
If we pick $n_0 = 1$, the left side is $905$. It remains greater than or equal to $5$ as $n \to \infty$. So we can let $c = 5$ with $n_0 = 1$.

**Example 4: Another Big-Omega Proof**
Is $n^3 - 250n^2 = \Omega(n^2)$?
**Yes.** Find positive constants $c$ and $n_0$ such that $n^3 - 250n^2 \ge c n^2$.
Dividing by $n^2$: $n - 250 \ge c$.
If we choose $n_0 = 251$, then $251 - 250 = 1 \ge c$. We can set $c = 1$.


## References & Navigation

- **Related Notes:** [[Asymptotic Bounds]]
