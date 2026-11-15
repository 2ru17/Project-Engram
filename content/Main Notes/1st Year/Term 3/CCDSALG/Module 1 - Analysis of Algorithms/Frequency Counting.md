---
id: ccdsalg_frequency_counting
type: note
course: CCDSALG
topic: Frequency Counting
status: completed
---
# Frequency Counting

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CCDSALG]] #[[Frequency Counting]] #[[Code Snippets]] #[[M1]]

---

## Overview

Frequency counting measures the number of statements or steps an algorithm takes to complete a task. It's a method for analyzing an algorithm a priori.

### RAM Model Assumptions
This theoretical analysis relies on the Random-Access Machine (RAM) model:
* Algorithms are computer programs running on a generic, single-processor RAM model.
* Instructions execute sequentially one at a time (no concurrent operations).
* Each basic instruction or data access takes a constant amount of time.
* The RAM model contains standard instructions typical of real computers.

## Important Formulas

When determining the frequency count of an algorithm, different programming constructs are evaluated based on their basic operations:

### 1. Assignment Statements
* Count: $1$ for each statement.

### 2. Conditional Statements
* Evaluated as: $1 + \max(\text{count}(\text{if\_block}), \text{count}(\text{else\_block}))$
* The condition evaluation takes $1$ unit. Then, we assume the worst-case scenario by taking the maximum count between the `if` and `else` branches.

### 3. For Loops
For a loop like `for j = lb to ub` (where $lb$ is the lower bound and $ub$ is the upper bound):
* The loop header/condition evaluation: $ub - lb + 2$
* The statements inside the loop body: $ub - lb + 1$

### 4. While Loops
For a block like:
```text
x = lb
while x <= ub:
   ...
```
* Initialization: $1$
* The `while` condition evaluation: $ub - lb + 2$
* The statements inside the loop body: $ub - lb + 1$
*(If the condition is strictly less than `< ub`, the condition is $ub - lb + 1$ and body is $ub - lb$.)*

### 5. Do-While Loops
For a block like:
```text
x = lb
do:
   ...
while x <= ub
```
* Initialization: $1$
* The statements inside the loop body: $ub - lb + 1$
* The `while` condition evaluation: $ub - lb + 1$

## Worked Examples

**Example 1: Conditional Block**
```text
if choice == "S"                   // 1
    read(side)                     // 1
    area = side * side             // 1 (if block total = 2)
else
    read(base)                     // 1
    read(height)                   // 1
    area = (base * height) / 2.0   // 1 (else block total = 3)
```
Total = $1 + \max(2, 3) = 1 + 3 = 4$.

**Example 2: Simple For Loop**
```text
for j = 1 to 4      // (4 - 1) + 2 = 5
    print(j)        // (4 - 1) + 1 = 4
```
Total = $5 + 4 = 9$.

**Example 3: Nested For Loops**
```text
for j = 1 to n                // n + 1
    for k = 1 to n            // n * (n + 1) = n^2 + n
        print(j, k)           // n * (n) = n^2
```
For the inner loop, it runs `for k = 1 to n` which is $(n+1)$ times, but since it is inside `for j = 1 to n` which loops $n$ times, its frequency is multiplied by $n$.
Total sum = $2n^2 + 2n + 1$.


## Multiple Choice Questions

1. When computing the frequency count of an `if-else` block, why is $\max(\text{count}(\text{if\_block}), \text{count}(\text{else\_block}))$ added to $1$?
    - **A)** Both branches are always executed once per evaluation
    - **B)** Condition evaluation takes 1 unit and frequency counting assumes the worst-case branch
    - **C)** The else branch is only evaluated when the if branch throws an error
    - **D)** The max operator subtracts shared assignment statements between the two blocks

2. For an inclusive loop `for j = lb to ub` ($lb \le ub$), how does the loop header/condition count compare to the execution count of a statement inside the loop body?
    - **A)** Both the header and body execute ub - lb + 1 times
    - **B)** Both the header and body execute ub - lb + 2 times
    - **C)** The body executes ub - lb + 2 times, which is 1 more than the header
    - **D)** The header/condition evaluates ub - lb + 2 times, which is 1 more than the ub - lb + 1 body executions

3. Using the frequency counting rules from the note, what is the total frequency count of the following loop?
```text
for j = 3 to 7
    sum = sum + j
```
    - **A)** 11
    - **B)** 9
    - **C)** 10
    - **D)** 13

4. If a `while` loop starts at `x = lb` and checks the strict condition `while x < ub` (instead of `while x <= ub`, assuming $lb \le ub$), what are the frequency counts of the `while` condition and a single body statement?
    - **A)** Condition: ub - lb + 2; Body: ub - lb + 1
    - **B)** Condition: ub - lb; Body: ub - lb - 1
    - **C)** Condition: ub - lb + 1; Body: ub - lb
    - **D)** Condition: ub - lb + 1; Body: ub - lb + 1

5. For the same bounds `x = lb` to `ub` (inclusive `<= ub`, with $lb \le ub$), how does a `do-while` loop's condition evaluation count differ from a `while` loop's condition evaluation count?
    - **A)** A do-while condition evaluates ub - lb + 1 times, one fewer than a while loop's ub - lb + 2
    - **B)** A do-while condition evaluates ub - lb + 2 times, identical to a while loop
    - **C)** A do-while condition evaluates ub - lb times, two fewer than a while loop
    - **D)** A do-while condition always executes twice per iteration

6. Using the note's `do-while` frequency counting rules (where initialization and each body statement count as 1 per execution), what is the total frequency count of this block?
```text
x = 1
do:
    x = x + 1
while x <= 5
```
    - **A)** 10
    - **B)** 12
    - **C)** 11
    - **D)** 13

7. Suppose an `if-else` statement has 3 sequential assignment statements inside the `if` branch and 1 assignment statement inside the `else` branch. What is the total frequency count of this conditional block?
    - **A)** 5
    - **B)** 4
    - **C)** 3
    - **D)** 2

8. In the nested loop example (`for j = 1 to n` containing `for k = 1 to n` containing `print(j, k)`), why is the frequency count of the inner loop header `for k = 1 to n` equal to $n^2 + n$?
    - **A)** Because k increments from 0 to n^2 + n in a single pass
    - **B)** Because the outer loop header runs n^2 times and adds n
    - **C)** Because print(j, k) executes n^2 + n times inside the inner loop
    - **D)** Because the inner header evaluates (n + 1) times during each of the n iterations of the outer loop body

9. Using the note's strict `while x < ub` rules, what is the total frequency count in terms of $n$ ($n \ge 0$) for this block?
```text
x = 0
while x < n:
    x = x + 1
```
    - **A)** 2n + 1
    - **B)** 2n + 2
    - **C)** 2n + 3
    - **D)** n + 2

10. Under the RAM model assumptions used in frequency counting, why does a single assignment statement like `area = (base * height) / 2.0` receive a count of $1$?
    - **A)** Because floating-point division takes zero cycles in the RAM model
    - **B)** Because multiplication and division cancel out to one instruction
    - **C)** Because each basic statement or instruction is assumed to take a constant unit of time
    - **D)** Because it sits inside an else block whose total cost is always normalized to 1

### Answer Key & Explanations

1. **B)** Conditional statements evaluate as $1 + \max(\text{count}(\text{if\_block}), \text{count}(\text{else\_block}))$ because the condition takes $1$ unit and the analysis takes the worst-case branch.
2. **D)** For `for j = lb to ub`, the header/condition evaluates $ub - lb + 2$ times (including the final check that exits the loop), whereas the body runs $ub - lb + 1$ times.
3. **A)** The loop header evaluates $(7 - 3) + 2 = 6$ times, and the body statement `sum = sum + j` executes $(7 - 3) + 1 = 5$ times, giving $6 + 5 = 11$.
4. **C)** With a strict `< ub` bound, the loop stops one iteration earlier, so the `while` condition evaluates $ub - lb + 1$ times and the body executes $ub - lb$ times.
5. **A)** A `do-while` loop tests its condition at the end of each iteration, evaluating it $ub - lb + 1$ times instead of $ub - lb + 2$ times for a pre-tested `while` loop.
6. **C)** Initialization (`x = 1`) counts $1$, the body statement `x = x + 1` runs $5 - 1 + 1 = 5$ times, and the `while x <= 5` condition evaluates $5 - 1 + 1 = 5$ times, totaling $1 + 5 + 5 = 11$.
7. **B)** Applying $1 + \max(\text{if}, \text{else})$ gives $1 + \max(3, 1) = 1 + 3 = 4$.
8. **D)** The inner `for k = 1 to n` header runs $n + 1$ times per outer iteration, and since the outer loop body runs $n$ times, its frequency is $n(n + 1) = n^2 + n$.
9. **B)** Initialization `x = 0` is $1$, the `while x < n` condition evaluates $n - 0 + 1 = n + 1$ times, and the body `x = x + 1` executes $n - 0 = n$ times, yielding $1 + (n + 1) + n = 2n + 2$.
10. **C)** Frequency counting is an a priori RAM-model method where each basic statement/instruction executes sequentially in a constant unit of time.

## References & Navigation

- **Previous Topic:** [[Introduction to Algorithm Analysis]]
- **Next Topic:** [[Asymptotic Bounds]]
- **Related Notes:** [[Frequency Count]], [[Loops]]
