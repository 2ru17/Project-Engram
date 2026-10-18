---
id: Loops
type: note
course: CCDSALG
topic: Algorithms
status: completed
---

# Loops

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> Frequency counting for iterative statements (loops) like for, while, and do-while requires careful attention to how many times the loop control con...

## Details / Theory

Frequency counting for iterative statements (loops) like `for`, `while`, and `do-while` requires careful attention to how many times the loop control condition is checked and how many times the loop body is executed.

## `for` Loop

A `for` loop typically has a structure like `for variable = lower_bound to upper_bound`.

**Formula:**
 **Loop control statement (e.g., `for j = lb to ub`):** Count = (`upper_bound` - `lower_bound` + 1) + 1 = `ub` - `lb` + 2
This accounts for one check for each iteration where the body executes, plus one final check that causes the loop to terminate. **Statements inside the loop body:** Each statement is executed (`upper_bound` - `lower_bound` + 1) times.
Count = `ub` - `lb` + 1

**Example:**
[1] for j = 1 to 4

[2] print(j)
 **Line [1] (`for j = 1 to 4`):**
`ub` = 4, `lb` = 1
Count = (4 - 1 + 2) = 5 **Line [2] (`print(j)`):**
Count = (4 - 1 + 1) = 4 **Total Count:** 5 + 4 = 9

**Example with variable upper bound `n`:**

[1] sum = 0 // Count = 1

[2] for j = 1 to n

[3] sum = sum + j

[4] print(sum) // This statement is OUTSIDE the loop in the example

// from "02 - Frequency Counting.pdf" page 51,

// but if it were inside, it would be 'n'.

// Assuming it's outside as per typical summation algorithms.
 **Line [1]:** 1 **Line [2] (`for j = 1 to n`):**
`ub` = n, `lb` = 1
Count = (n - 1 + 2) = n + 1 **Line [3] (`sum = sum + j`):**
Count = (n - 1 + 1) = n **Total Count (if `print(sum)` is outside):** $1 + (n+1) + n = 2n + 2$.
_Note:_ The PDF on page 51 shows `print(sum)` as line 4 and counts it as `n`, implying it's inside the loop. If `print(sum)` is _inside_ the loop, the total would be $1 + (n+1) + n + n = 3n+2$. The structure in the PDF is ambiguous for line 4's placement. Assuming it's inside for consistency with the PDF's calculation:
Total = $1 + (n+1) + n + n = 3n+2$.

When loops are nested, the inner loop's execution count is multiplied by the number of times the outer loop's body executes.

**Example:**

[1] for j = 1 to n

[2] for k = 1 to n

[3] print(j, k)
 **Line [1] (Outer loop `for j = 1 to n`):** Count = n + 1 **Line [2] (Inner loop `for k = 1 to n`):**
This loop statement itself executes `n` times (once for each iteration of the outer loop).
Each time it executes, its frequency count is (n - 1 + 2) = n + 1.
So, total for line [2] = n \* (n + 1) = $n^2 + n$ **Line [3] (Statement `print(j, k)`):**
This statement is inside the inner loop. The inner loop body executes `n` times. The outer loop body also executes `n` times.
So, total for line [3] = n \* n = $n^2$ **Total Count:** $(n+1) + (n^2+n) + n^2 = 2n^2 + 2n + 1$

## `while` Loop

A `while` loop continues as long as a condition is true.
`x = lb`
`while expression (e.g., x <= ub)`
`statement(s)`
`x = x + increment` (or some change to loop variable)

**Formula (for `x = x + 1` increment):**
 **Initialization (e.g., `x = lb`):** Count = 1 **`while expression` (e.g., `while x <= ub`):** Count = (`ub` - `lb` + 1) + 1 = `ub` - `lb` + 2 **`while expression` (e.g., `while x < ub`):** Count = (`ub` - `lb`) + 1 = `ub` - `lb` + 1 **Statements inside the loop body (for `x <= ub`):** Count = `ub` - `lb` + 1 **Statements inside the loop body (for `x < ub`):** Count = `ub` - `lb`

**Example (`while x <= 4`):**

[1] x = 1

[2] while x <= 4

[3] x = x + 1
 **Line [1]:** 1 **Line [2] (`while x <= 4`):** `ub`=4, `lb`=1. Count = (4 - 1 + 2) = 5 **Line [3] (`x = x + 1`):** Count = (4 - 1 + 1) = 4 **Total Count:** 1 + 5 + 4 = 10

**Example (`while x < 4`):**

[1] x = 1

[2] while x < 4

[3] x = x + 1
 **Line [1]:** 1 **Line [2] (`while x < 4`):** `ub`=4, `lb`=1. Count = (4 - 1 + 1) = 4 **Line [3] (`x = x + 1`):** Count = (4 - 1) = 3 **Total Count:** 1 + 4 + 3 = 8

## `do-while` Loop

A `do-while` loop executes the body at least once, and the condition is checked at the end.
`x = lb`
`do`
`statement(s)`
`x = x + increment`
`while expression (e.g., x <= ub)`

**Formula (for `x = x + 1` increment):**
 **Initialization (e.g., `x = lb`):** Count = 1 **`while expression` (e.g., `while x <= ub`):** Count = `ub` - `lb` + 1 **`while expression` (e.g., `while x < ub`):** Count = `ub` - `lb` **Statements inside the loop body (for `x <= ub`):** Count = `ub` - `lb` + 1 **Statements inside the loop body (for `x < ub`):** Count = `ub` - `lb`

**Example (`while x <= 4`):**

[1] x = 1

[2] do

[3] x = x + 1

[4] while x <= 4
 **Line [1]:** 1 **Line [3] (`x = x + 1`):** `ub`=4, `lb`=1. Count = (4 - 1 + 1) = 4 **Line [4] (`while x <= 4`):** Count = (4 - 1 + 1) = 4 **Total Count:** 1 + 4 + 4 = 9 (Note: The PDF on page 102 calculates this as 7 for `x=1; do x=x+1; while x<4;`. Let's re-verify the PDF's example. For `x=1; do x=x+1; while x<=4;` :
x=1 (init: 1)
x becomes 2 (body: 1)
2<=4 true (check: 1)
x becomes 3 (body: 1)
3<=4 true (check: 1)
x becomes 4 (body: 1)
4<=4 true (check: 1)
x becomes 5 (body: 1)
5<=4 false (check: 1)
Total: init(1) + body(4) + check(4) = 9.
    The PDF's example on page 102 for `while x < 4` is: init(1) + body(3) + check(3) = 7. This matches.
    My formulas:
    `x <= ub`: init(1) + body(`ub`-`lb`+1) + check(`ub`-`lb`+1)
    `x < ub`: init(1) + body(`ub`-`lb`) + check(`ub`-`lb`)

## Loops with Dependent Bounds (Summations)

When the bounds of an inner loop depend on the outer loop's variable (e.g., `for j = 1 to i`), summations are used.

**Example:**

[1] for i = 1 to n

[2] for j = 1 to i

[3] print(i, j)

1.  **Outer loop (Line [1] `for i = 1 to n`):** Count = $n + 1$
2.  **Inner loop (Line [2] `for j = 1 to i`):**
The loop control statement itself. Its bounds are $1$ to $i$. So, for a _single_ execution of this line, it's $(i - 1 + 2) = i + 1$.
Since `i` goes from $1$ to $n$, we sum this: $\sum_{i=1}^{n} (i+1)$
$\sum_{i=1}^{n} (i+1) = \sum_{i=1}^{n} i + \sum_{i=1}^{n} 1 = \frac{n(n+1)}{2} + n$
3.  **Body of inner loop (Line [3] `print(i,j)`):**
The statement inside the inner loop. It executes $(i - 1 + 1) = i$ times for each value of `i`.
Since `i` goes from $1$ to $n$, we sum this: $\sum_{i=1}^{n} i = \frac{n(n+1)}{2}$

**Total Count:**
$(n+1) + \left(\frac{n(n+1)}{2} + n\right) + \frac{n(n+1)}{2}$
$= n+1 + \frac{n^2+n}{2} + n + \frac{n^2+n}{2}$
$= n+1 + n^2+n + n$
$= n^2 + 3n + 1$

This matches the result from "02.2 - Frequency Count Part 2.pdf" page 45.

**Summation Formulas:**
 $\sum_{k=1}^{n} 1 = n$ $\sum_{k=1}^{n} c = cn$ (where c is a constant) $\sum_{k=1}^{n} k = \frac{n(n+1)}{2}$ $\sum_{k=1}^{n} k^2 = \frac{n(n+1)(2n+1)}{6}$

## Complexity

| Operation | Time | Space |
| --------- | ---- | ----- |
|           |      |       |

## Common Pitfalls
 Off-by-one in **loop control counts** — the loop condition is checked $n+1$ times (including the final false check), while the body executes $n$ times Forgetting that **`do-while`** always executes the body at least once, so its minimum body count is 1, not 0 Miscounting **variable-bound loops** — when the upper bound depends on another variable (e.g., `j < i`), you must use a summation, not a simple multiplication Ignoring the **initialization and increment** as separate operations — `i = 0` counts as 1, and `i++` counts once per iteration Confusing the frequency count of the **condition check** with the frequency count of the **loop body**

## Summary

> TL;DR — Frequency counting for loops: **`for`/`while`** condition checks = $n+1$, body executions = $n$; **`do-while`** body executes at least once. Variable-bound loops require **summation formulas**. Always count initialization, condition checks, increments, and body statements separately.

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. In a standard `for` loop `for j = lb to ub`, how many times is the loop control statement checked?
    - **A)** ub - lb
    - **B)** ub - lb + 1
    - **C)** ub - lb + 2
    - **D)** (ub - lb) / 2

2. In the loop `for j = 1 to 4`, what is the total count of the loop control statement?
    - **A)** 4
    - **B)** 5
    - **C)** 6
    - **D)** 3

3. When analyzing nested loops, how do you determine the total execution count of the inner loop body?
    - **A)** Add the counts of the outer and inner loops.
    - **B)** Multiply the number of times the outer loop body executes by the number of times the inner loop body executes.
    - **C)** Take the maximum of the outer and inner loop counts.
    - **D)** Square the inner loop count.

4. For a `while x <= ub` loop (incrementing by 1), how many times does the condition check execute?
    - **A)** ub - lb
    - **B)** ub - lb + 1
    - **C)** ub - lb + 2
    - **D)** 1

5. For a `while x < ub` loop (strict inequality), how many times does the loop body execute?
    - **A)** ub - lb
    - **B)** ub - lb + 1
    - **C)** ub - lb + 2
    - **D)** 1

6. What is a defining characteristic of a `do-while` loop in frequency counting?
    - **A)** The loop condition is checked before the body executes.
    - **B)** The condition is never checked.
    - **C)** The body executes at least once, so its minimum body count is 1.
    - **D)** The frequency count is always $O(n^2)$.

7. What mathematical tool is required when the bounds of an inner loop depend on the outer loop's variable (e.g., `for j = 1 to i`)?
    - **A)** Recurrence relations
    - **B)** Simple multiplication
    - **C)** Amortized analysis
    - **D)** Summations

8. What is a common pitfall when counting the loop control statement?
    - **A)** Forgetting to count the final condition check that fails.
    - **B)** Multiplying it by the loop body.
    - **C)** Using a summation when the bounds are constants.
    - **D)** Counting the initialization twice.

9. If `i` goes from 1 to $n$, what is the sum of `i`?
    - **A)** $n^2$
    - **B)** $n(n+1)/2$
    - **C)** $n(n+1)(2n+1)/6$
    - **D)** $n!$

10. In the nested dependent loop example where the outer loop is `i = 1 to n` and the inner loop is `j = 1 to i`, what is the frequency count of the statement `print(i, j)`?
    - **A)** $n^2$
    - **B)** $n(n+1)/2$
    - **C)** $n^2/2$
    - **D)** $n$

### Answer Key & Explanations

1. **C**. The formula is `ub - lb + 2`, which accounts for the `ub - lb + 1` successful checks plus the 1 final check that terminates the loop.
2. **B**. Applying the formula `4 - 1 + 2 = 5`. The loop condition evaluates 5 times.
3. **B**. In nested iterations, the total count of operations in the inner body is derived by multiplying the outer loop's executions by the inner loop's executions.
4. **C**. Similar to the `for` loop, the inclusive inequality `<=` causes the condition to check exactly `ub - lb + 2` times.
5. **A**. Because the inequality is strict `<` rather than inclusive `<=`, the body executes exactly `ub - lb` times.
6. **C**. Unlike `while` and `for` loops, `do-while` forces the body to run before checking the condition, guaranteeing at least 1 execution.
7. **D**. Because the inner loop changes its iteration count dynamically based on the outer loop, you must construct a summation $\sum$ instead of simple multiplication.
8. **A**. Many fail to realize that the condition loop must be evaluated one more time (resulting in false) to break the loop, undercounting by 1.
9. **B**. This is the standard arithmetic series summation formula for the first $n$ natural numbers.
10. **B**. The statement `print(i, j)` executes $i$ times per loop. Summing $i$ from 1 to $n$ yields the formula $n(n+1)/2$.

## References & Navigation

- **Previous Topic:** [[Little-omega Notation]]
- **Next Topic:** [[Lower Bounds]]
- **Related Notes:** [[Nested-Loops]], [[Conditionals]]
