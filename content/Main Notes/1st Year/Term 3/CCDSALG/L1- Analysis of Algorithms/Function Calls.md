---
id: Function-Calls
type: note
course: CCDSALG
topic: Algorithms
status: completed
---

# Function Calls

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> Function calls require counting both the call itself and the operations inside the function.

## Details / Theory

Function calls require counting both the call itself and the operations inside the function.

### Rules:
 Count 1 for the function call operation Count all operations within the function Add any parameter evaluation counts

### Example:

```
sum = add(a, b)     // Count: 1 (for call) + operations inside add()
```

## Special Cases and Advanced Counting

### Summation for Variable Bounds

When a loop's bounds depend on another variable (like in nested loops with variable inner bounds), use summation notation:

For a loop like:

```
for i = 1 to n
    for j = 1 to i
        print(i,j)
```

The inner loop count needs summation:
 Loop header: Σ(i+1) from i=1 to n Loop body: Σi from i=1 to n

Use summation formulas:
 Σ(1) from i=1 to n = n Σ(i) from i=1 to n = n(n+1)/2 Σ(i²) from i=1 to n = n(n+1)(2n+1)/6

### Analyzing Complex Nested Loops

For the example:

```
for i = 2 to n+1            // Count: n+1
    for j = 3 to n-3        // Count: (n-4)(n)
        for k = 4 to n-4    // Count: (n-6)(n-5)(n)
            x = x + 1       // Count: (n-7)(n-5)(n)
```

Total: n+1 + (n-4)(n) + (n-6)(n-5)(n) + (n-7)(n-5)(n) = n+1 + n²-4n + n³-11n²+30n + n³-12n²+35n = 2n³-22n²+62n+1

## Key Formulas Reference

### Simple Summations
 Σ(1) from k=1 to n = n Σ(c) from k=1 to n = cn Σ(k) from k=1 to n = n(n+1)/2 Σ(k²) from k=1 to n = n(n+1)(2n+1)/6

### Loops
 For loops: header = ub-lb+2, body = ub-lb+1 per statement While (x ≤ ub): header = ub-lb+2, body = ub-lb+1 per statement While (x < ub): header = ub-lb+1, body = ub-lb per statement Do-while (x ≤ ub): condition = ub-lb+1, body = ub-lb+1 per statement Do-while (x < ub): condition = ub-lb, body = ub-lb per statement

## Complexity

| Operation | Time | Space |
| --------- | ---- | ----- |
|           |      |       |

## Common Pitfalls
 Forgetting to count operations _inside_ the called function. Miscounting nested loop bounds that depend on outer loop variables — use summation formulas. Mixing up loop header vs loop body counts for different loop types (for, while, do-while).

## Summary

> TL;DR — Function call frequency counting = 1 for the call itself + all operations inside the function. For nested loops with variable bounds, use summation formulas ($\sum i$, $\sum i^2$, etc.).

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. When counting function calls in frequency analysis, which of the following must be included?
- **A)** Only the call operation itself
- **B)** Only the operations within the function
- **C)** The call operation, the operations inside the function, and any parameter evaluation
- **D)** Only the return statement

2. For the statement `sum = add(a, b)`, what does the total count consist of?
- **A)** 1 for the call, plus the operations inside `add()`
- **B)** 2 for the parameters, plus 1 for the assignment
- **C)** The exact number of variables inside `add()`
- **D)** 0, because it is an external function

3. When a nested loop's inner bound depends on the outer loop's variable, what mathematical tool should be used?
- **A)** Asymptotic notation
- **B)** Summation notation
- **C)** Recurrence relations
- **D)** Matrix multiplication

4. What is the formula for the summation $\Sigma(1)$ from $i=1$ to $n$?
- **A)** $n^2$
- **B)** $n(n+1)/2$
- **C)** $n$
- **D)** $1$

5. What is the standard formula for the summation of $i$ ($\Sigma(i)$) from $i=1$ to $n$?
- **A)** $n^2 / 2$
- **B)** $n(n+1)/2$
- **C)** $n(n+1)(2n+1)/6$
- **D)** $n$

6. What is the standard formula for the summation of squares ($\Sigma(i^2)$) from $i=1$ to $n$?
- **A)** $n^2$
- **B)** $n(n+1)/2$
- **C)** $n(n+1)(2n+1)/6$
- **D)** $n^3 / 3$

7. For a standard `for` loop, what is the frequency count for the loop header assuming bounds `lb` to `ub`?
- **A)** ub - lb
- **B)** ub - lb + 1
- **C)** ub - lb + 2
- **D)** (ub - lb) / 2

8. For a standard `for` loop body, how many times does it execute given bounds `lb` to `ub`?
- **A)** ub - lb
- **B)** ub - lb + 1
- **C)** ub - lb + 2
- **D)** 1

9. What is a common pitfall when counting function calls?
- **A)** Counting the function call as 1 operation
- **B)** Forgetting to count operations inside the called function
- **C)** Using summation formulas for independent nested loops
- **D)** Counting the loop header twice

10. How does a `while (x < ub)` loop header differ from a `while (x <= ub)` loop header in frequency count?
- **A)** It executes one more time.
- **B)** It executes exactly the same number of times.
- **C)** It executes one fewer time (`ub - lb + 1` vs `ub - lb + 2`).
- **D)** It relies on summation formulas.

### Answer Key & Explanations
1. **C)** A complete frequency count must account for the call overhead, parameter evaluation, and the internal operations of the function.
2. **A)** The line counts as 1 for the function call itself plus whatever operations occur inside `add()`.
3. **B)** Summation formulas are necessary when the number of inner loop iterations changes every time the outer loop runs.
4. **C)** Summing 1 exactly $n$ times results in $n$.
5. **B)** The sum of the first $n$ natural numbers follows the formula $n(n+1)/2$.
6. **C)** The sum of squares follows the formula $n(n+1)(2n+1)/6$.
7. **C)** The header executes `ub - lb + 1` times for the valid iterations, plus 1 final time when the condition fails, totaling `ub - lb + 2`.
8. **B)** The body executes only when the condition is true, which is `ub - lb + 1` times.
9. **B)** A common mistake is assigning a cost of 1 to a function call but completely ignoring the operations that execute inside the function.
10. **C)** Because of the strict inequality `<`, the loop runs one fewer time, reducing the header count from `ub - lb + 2` to `ub - lb + 1`.

## References & Navigation

- **Previous Topic:** [[Frequency Count]]
- **Next Topic:** [[Growth Rates]]
- **Related Notes:** [[Recursion Tree Method]], [[Stacks]]
