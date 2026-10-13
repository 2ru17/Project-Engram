---
id: Handout_02_-_Frequency_Counting
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

**🏷️ Tags:** #[[Computer Science]] #[[CCDSALG]] #[[Frequency Counting]] #[[Code Snippets]] #[[M1]]

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


## References & Navigation

- **Related Notes:** [[Frequency Counting]]
