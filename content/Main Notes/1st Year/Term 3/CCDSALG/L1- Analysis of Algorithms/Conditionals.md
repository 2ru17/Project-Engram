---
id: Conditionals
type: note
course: CCDSALG
topic: Algorithms
status: completed
---

# Conditionals

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> Frequency counting for conditional statements (like if-else structures) involves considering the condition itself and the statements within the bra...

## Details / Theory

Frequency counting for conditional statements (like `if-else` structures) involves considering the condition itself and the statements within the branches.

## Counting Rule for `if-else`

The general formula for an `if-else` statement is:

**Total Count = Count(condition) + max(Count(if-block), Count(else-block))**
 **Count(condition):** The evaluation of the condition in the `if` statement is counted as 1. **Count(if-block):** This is the sum of the frequency counts of all statements inside the `if` block. **Count(else-block):** This is the sum of the frequency counts of all statements inside the `else` block. If there is no `else` block, its count is 0.

We take the _maximum_ of the counts of the `if-block` and `else-block` because, in any single execution, only one of these blocks (or neither, if the condition is false and there's no `else`) will be executed.

## Example 1: `if-else`

[1] if choice == "S" // Condition

[2] read(side)

[3] area = side \* side

[4] else

[5] read(base)

[6] read(height)

[7] area = (base \* height) / 2.0
 **Line [1] (condition `choice == "S"`):** Count = 1
 **If-block (lines [2, 3]):**
`read(side)`: Count = 1
`area = side * side`: Count = 1
**Total for if-block:** 1 + 1 = 2
 **Else-block (lines [5, 6, 7]):**
`read(base)`: Count = 1
`read(height)`: Count = 1
`area = (base * height) / 2.0`: Count = 1
**Total for else-block:** 1 + 1 + 1 = 3
 **Total Frequency Count:**
Count(condition) + max(Count(if-block), Count(else-block))
1 + max(2, 3)
1 + 3 = **4**

## Example 2: `if` without `else`

[1] if (a % 10 != 5) // Condition

[2] b = a + 5 - a % 10

```

* **Line [1] (condition `a % 10 != 5`):** Count = 1

* **If-block (line [2]):**
    * `b = a + 5 - a % 10`: Count = 1
    * **Total for if-block:** 1

* **Else-block:** Not present, so Count(else-block) = 0

* **Total Frequency Count:**
    * Count(condition) + max(Count(if-block), Count(else-block))
    * 1 + max(1, 0)
    * 1 + 1 = **2**

For `else if` structures, they can be thought of as nested `if-else` statements.
```

[1] if x < 1

[2] y = 10

[3] else if x < 2

[4] y = 20

[5] z = 30

[6] else

[7] for i = 1 to x

[8] print(i)

```
This is equivalent to:
```

[1] if x < 1 // Count = 1

[2] y = 10 // Count = 1 (if-block1)

[3] else // This 'else' contains another if-else

[3a] if x < 2 // Count = 1 (condition2)

[4] y = 20 // Count = 1

[5] z = 30 // Count = 1 (if-block2, total 2)

[6] else // Else for the inner if

[7] for i = 1 to x // Count = x + 1 (see [[Loops]])

[8] print(i) // Count = x (see [[Loops]])

// (else-block2, total (x+1)+x = 2x+1)
 **Count for outer `if` (line 1):** 1 **Count for `y=10` (line 2):** 1 **Count for inner `if` (line 3a):** 1 **Count for `y=20` and `z=30` (lines 4, 5):** 1 + 1 = 2 **Count for the loop (lines 7, 8):** $(x+1) + x = 2x+1$ **Total for the `else if` part (lines 3-8):** $1 + \text{max}(2, 2x+1)$ **Overall Total:** $1 + \text{max}(1, 1 + \text{max}(2, 2x+1))$

Assuming $$x \ge 2$$ for the `else` branch of the `else if` to be dominant:
Total = $$1 + (1 + (2x+1)) = 1 + 1 + 2x + 1 = 2x + 3$$.
_This matches the example from "02.2 - Frequency Count Part 2.pdf" page 2._
_The count for the `else` on line [6] itself is not explicitly 1; rather, the structure dictates which path's statements are counted. The conditions themselves (line [1] and line [3]) are each 1._

## Complexity

| Operation | Time | Space |
| --------- | ---- | ----- |
|           |      |       |

## Common Pitfalls
 Forgetting to count the **condition check itself** as 1 operation before counting the branch body Adding if-block and else-block counts instead of taking the **maximum** — worst-case analysis uses `max(if-block, else-block)` Miscounting **else-if chains** — each condition check adds 1, and you still take the max across all branches Overlooking **nested conditionals inside loops** — the conditional's max count gets multiplied by the loop's iteration count Incorrectly assuming both branches execute — only one branch runs per invocation; frequency count reflects the costliest path

## Summary

> TL;DR — For **if-else** frequency counting: count the condition as 1 operation, then take the **maximum** of the if-block and else-block counts. For **else-if** chains, count each condition check and take the max across all branches. Nested conditionals inside loops multiply accordingly.

## Review Questions

_To be added._

## Links
 **Related:** - [[Loops]] **Source / Reference:**

## Multiple Choice Questions

1. What is the general formula for frequency counting an `if-else` statement?
    - **A)** Count(condition) + Count(if-block) + Count(else-block)
    - **B)** Count(condition) + min(Count(if-block), Count(else-block))
    - **C)** Count(condition) * max(Count(if-block), Count(else-block))
    - **D)** Count(condition) + max(Count(if-block), Count(else-block))

2. How much is the evaluation of the condition in an `if` statement counted?
    - **A)** 0
    - **B)** 1
    - **C)** 2
    - **D)** It depends on the size of the variables

3. Why is the maximum of the `if-block` and `else-block` counts taken?
    - **A)** Because both blocks are always executed
    - **B)** To find the best-case execution path
    - **C)** Because in any single execution, only one of the blocks (or neither) will be executed, giving the worst-case
    - **D)** Because the RAM model requires maximum values

4. If there is no `else` block, what is its frequency count considered to be?
    - **A)** -1
    - **B)** 0
    - **C)** 1
    - **D)** Infinity

5. In frequency counting, how should an `else if` structure be treated?
    - **A)** As a single block with a count of 1
    - **B)** As nested `if-else` statements
    - **C)** It is ignored since it is a secondary condition
    - **D)** By adding the counts of all branches together

6. In Example 1, the condition `choice == "S"` has a count of 1, the if-block has a count of 2, and the else-block has a count of 3. What is the total frequency count?
    - **A)** 6
    - **B)** 5
    - **C)** 4
    - **D)** 3

7. What is a common pitfall when counting frequency for conditional statements?
    - **A)** Adding if-block and else-block counts instead of taking the maximum
    - **B)** Taking the maximum instead of adding all counts
    - **C)** Assuming the condition check takes 2 operations
    - **D)** Counting the else-block when an else-if is present

8. How does an `else if` chain affect the total frequency count?
    - **A)** Each condition check adds 1 to the count, and you take the max across all branches.
    - **B)** Only the first condition check is counted.
    - **C)** The counts of all conditions are multiplied together.
    - **D)** The conditions are ignored; only the branches are counted.

9. What happens when a conditional statement is nested inside a loop?
    - **A)** The conditional's maximum count gets multiplied by the loop's iteration count.
    - **B)** The conditional statement is only counted once, regardless of the loop.
    - **C)** The loop count is added to the conditional's max count.
    - **D)** The conditional count is divided by the loop's iteration count.

10. Which block is used when determining the `max` count in worst-case analysis?
    - **A)** The block that executes the fastest
    - **B)** The block with the most variables
    - **C)** The costliest path (highest count)
    - **D)** Always the `if-block`

### Answer Key & Explanations
1. **D)** The formula is Count(condition) + max(Count(if-block), Count(else-block)).
2. **B)** Evaluating the condition in the `if` statement counts as exactly 1 operation.
3. **C)** During execution, only one branch is taken; worst-case analysis demands evaluating the path that takes the maximum number of operations.
4. **B)** If there is no else-block, its count is essentially 0.
5. **B)** `Else if` statements are logically evaluated as nested `if-else` structures.
6. **C)** The total count is 1 + max(2, 3) = 1 + 3 = 4.
7. **A)** A common mistake is adding the branches together, instead of correctly recognizing that only one executes, hence taking the maximum.
8. **A)** Each individual condition must be evaluated (costing 1 each time it's reached), and the maximum across the entire chain determines the worst-case.
9. **A)** The worst-case cost of the conditional gets multiplied by how many times the loop iterates.
10. **C)** You select the block with the highest operation count because it represents the worst-case performance scenario.

## References & Navigation

- **Previous Topic:** [[Big-Theta Notation]]
- **Next Topic:** [[Context & Relationships]]
- **Related Notes:** [[Loops]], [[Declarations]]
