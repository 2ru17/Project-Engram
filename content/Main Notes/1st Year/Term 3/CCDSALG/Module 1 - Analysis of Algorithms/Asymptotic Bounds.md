---
id: ccdsalg_asymptotic_bounds
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


## Multiple Choice Questions

1. Which ordering lists the common growth-rate classes strictly from slowest growth to fastest growth?
    - **A)** O(1), O(n), O(log₂ n), O(n log₂ n), O(n^2), O(n^3), O(2^n)
    - **B)** O(log₂ n), O(1), O(n), O(n^2), O(n log₂ n), O(n^3), O(2^n)
    - **C)** O(1), O(log₂ n), O(n), O(n log₂ n), O(n^2), O(n^3), O(2^n)
    - **D)** O(1), O(log₂ n), O(n log₂ n), O(n), O(n^2), O(2^n), O(n^3)

2. What is the key difference between the formal definitions of Big-Oh $O(g(n))$ and small-o $o(g(n))$?
    - **A)** Big-Oh requires the bound to hold for at least one constant c > 0, whereas small-o requires it to hold for every constant c > 0
    - **B)** Big-Oh is a lower bound, whereas small-o is an upper bound
    - **C)** Big-Oh forbids negative constants in f(n), whereas small-o allows n0 = 0
    - **D)** Big-Oh represents an asymptotically tight bound, whereas small-o represents an average-case bound

3. Under what exact condition does $f(n) = \Theta(g(n))$ hold?
    - **A)** f(n) = o(g(n)) and f(n) = omega(g(n))
    - **B)** f(n) = O(g(n)) and f(n) != Omega(g(n))
    - **C)** f(n) <= g(n) for every positive integer n >= 1
    - **D)** f(n) = O(g(n)) and f(n) = Omega(g(n))

4. When proving $5n^2 + 150n + 750 = O(n^2)$ by dividing by $n^2$ to get $5 + \frac{150}{n} + \frac{750}{n^2} \le c$, what minimum constant $c$ satisfies the inequality when $n_0 = 5$?
    - **A)** c = 5
    - **B)** c = 65
    - **C)** c = 155
    - **D)** c = 905

5. Why does the proof for $n^3 - 250n^2 = O(n^2)$ fail?
    - **A)** Because 250n^2 has a negative sign, making f(n) negative for all n
    - **B)** Because no threshold n0 > 0 exists where n^3 exceeds 250n^2
    - **C)** Because dividing by n^2 yields n - 250 <= c, and n - 250 grows without bound as n approaches infinity
    - **D)** Because n^3 - 250n^2 is in o(n^2), which contradicts Big-Oh

6. In the worked proof showing $n^3 - 250n^2 = \Omega(n^2)$ with $c = 1$, why is $n_0 = 251$ a valid starting threshold?
    - **A)** Because 251 - 250 = 1 >= c, and n - 250 remains >= 1 for all n >= 251
    - **B)** Because at n = 250, n^3 - 250n^2 becomes negative, satisfying 0 <= c n^2 <= f(n)
    - **C)** Because c = 1 is the maximum value allowed in Big-Omega proofs
    - **D)** Because n0 must always be strictly greater than the leading exponent

7. Based on the definition of small-o notation ($o$-notation), which statement is true?
    - **A)** 2n^2 = o(n^2) because 2 is a positive constant
    - **B)** n^2 = o(2n) because quadratic functions bound linear ones
    - **C)** 2n != o(n^2) because both grow toward infinity
    - **D)** 2n = o(n^2), whereas 2n^2 is not in o(n^2)

8. Which equivalence directly links small-omega ($\omega$) notation and small-o ($o$) notation?
    - **A)** f(n) = omega(g(n)) if and only if f(n) = o(g(n))
    - **B)** f(n) = omega(g(n)) if and only if g(n) = o(f(n))
    - **C)** f(n) = omega(g(n)) if and only if f(n) = Theta(g(n))
    - **D)** f(n) = omega(g(n)) if and only if g(n) = O(f(n))

9. According to the note's classification, which notation defines an asymptotically tight bound and represents average-case running time?
    - **A)** Big-Oh (O-notation)
    - **B)** Big-Omega (Omega-notation)
    - **C)** Big-Theta (Theta-notation)
    - **D)** small-omega (omega-notation)

10. When combining two sequential growth-rate terms $O(f(n))$ and $O(g(n))$ and simplifying polynomial factors, which rule from the note applies?
    - **A)** O(f(n)) + O(g(n)) = O(f(n) × g(n)), and multiplicative constants cannot be dropped
    - **B)** O(5n^2) cannot equal O(n^2) because the factor 5 alters the upper bound
    - **C)** O(f(n)) + O(g(n)) = O(f(n) / g(n))
    - **D)** O(f(n)) + O(g(n)) = O(f(n) + g(n)), and the multiplicative constant of the higher-order term is ignored

### Answer Key & Explanations

1. **C)** From slowest to fastest, the hierarchy listed in the note is $O(1)$, $O(\log_2 n)$, $O(n)$, $O(n \log_2 n)$, $O(n^2)$, $O(n^3)$, and $O(2^n)$.
2. **A)** $O(g(n))$ uses an existential quantifier ($\exists c > 0$) allowing a tight bound, whereas $o(g(n))$ uses a universal quantifier ($\forall c > 0$) enforcing a strictly non-tight upper bound.
3. **D)** A function is asymptotically tightly bounded ($f(n) = \Theta(g(n))$) if and only if it is both upper-bounded ($f(n) = O(g(n))$) and lower-bounded ($f(n) = \Omega(g(n))$).
4. **B)** Substituting $n = 5$ into $5 + \frac{150}{n} + \frac{750}{n^2}$ gives $5 + \frac{150}{5} + \frac{750}{25} = 5 + 30 + 30 = 65$.
5. **C)** Simplifying $n^3 - 250n^2 \le c n^2$ gives $n - 250 \le c$; as $n \to \infty$, $n - 250$ exceeds any fixed constant $c$.
6. **A)** After dividing $n^3 - 250n^2 \ge c n^2$ by $n^2$ to get $n - 250 \ge c$, choosing $n_0 = 251$ gives $251 - 250 = 1 \ge c = 1$ (and $f(n) \ge 0$) for all $n \ge 251$.
7. **D)** As noted in the $o$-notation section, $2n = o(n^2)$ because $2n < c n^2$ eventually holds for every $c > 0$, whereas $2n^2 \neq o(n^2)$ since choosing $c \le 2$ violates $2n^2 < c n^2$.
8. **B)** By definition, $f(n) = \omega(g(n))$ if and only if $g(n) = o(f(n))$.
9. **C)** The note defines Big-Theta ($\Theta$-notation) as both an asymptotically tight bound and the notation representing average-case running time.
10. **D)** Growth rates combine additively via $O(f(n)) + O(g(n)) = O(f(n) + g(n))$, and multiplicative constants on higher-order terms are ignored (e.g., $O(5n^2) = O(n^2)$).

## References & Navigation

- **Previous Topic:** [[Frequency Counting]]
- **Next Topic:** [[Recurrence Relations]]
- **Related Notes:** [[Asymptotic Notation]], [[Big-O Notation]], [[Big-Theta Notation]]
