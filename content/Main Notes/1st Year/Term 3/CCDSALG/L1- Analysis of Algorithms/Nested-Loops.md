---
id: Nested-Loops
type: note
course: CCDSALG
topic: Algorithms
status: completed
---

# Nested-Loops

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CCDSALG]] #[[Algorithms]] #[[Computer Science]] #[[Computational Complexity]] #[[Efficiency]] #[[Algorithm Design Paradigms]] #[[Data Structures]] #[[Time Complexity]] #[[Space Complexity]]

---

## Overview

> Nested loops are a fundamental control structure where one loop is contained within another. They are particularly important in frequency counting ...

## Key Concepts
 Frequency Analysis Final count Time Complexity Frequency Analysis Final count

## Details / Theory

Nested loops are a fundamental control structure where one loop is contained within another. They are particularly important in frequency counting because they often represent the most computationally expensive parts of algorithms.

When counting operations in nested loops, we multiply the number of iterations of each loop.

#### Example 1: Standard Double Loop

```c
for (i = 0; i < n; i++) // Executes n times

	for (j = 0; j < m; j++) // Executes m times for each i

		x = x + 1; // One operation (assignment)
```
 **Frequency Analysis**:
Inner assignment operation: 1 operation
Inner loop initialization: 1 operation (j = 0)
Inner loop condition check: m+1 operations (j < m, checked m+1 times)
Inner loop increment: m operations (j++, performed m times)
Inner loop executes m times for each iteration of outer loop
Outer loop initialization: 1 operation (i = 0)
Outer loop condition check: n+1 operations (i < n, checked n+1 times)
Outer loop increment: n operations (i++, performed n times)
Total operations for inner loop body: m operations
Total operations for inner loop overhead: 1 + (m+1) + m = 2m + 2
Total operations for outer loop (excluding inner loop): 1 + (n+1) + n = 2n + 2
**Final count**: (2n + 2) + n × (2m + 2) + n × m × 1 = 2n + 2 + 2nm + 2n + nm = nm + 3n + 2nm + 2 = 3nm + 3n + 2
**Time Complexity**: O(nm)

#### Example 2: Double Loop with Same Bounds

```c
for (i = 0; i < n; i++)      // Executes n times
    for (j = 0; j < n; j++)  // Executes n times for each i
        arr[i][j] = 0;       // One operation (assignment)
```
 **Frequency Analysis**:
Inner assignment operation: 1 operation
Inner loop initialization: 1 operation (j = 0)
Inner loop condition check: n+1 operations (j < n, checked n+1 times)
Inner loop increment: n operations (j++, performed n times)
Inner loop executes n times for each iteration of outer loop
Outer loop initialization: 1 operation (i = 0)
Outer loop condition check: n+1 operations (i < n, checked n+1 times)
Outer loop increment: n operations (i++, performed n times)
Total operations for inner loop body: n² operations
Total operations for inner loop overhead: n × (2n + 2) = 2n² + 2n
Total operations for outer loop (excluding inner loop): 2n + 2
**Final count**: (2n + 2) + (2n² + 2n) + n² = 3n² + 4n + 2
**Time Complexity**: O(n²)

### Loops with Variable Bounds

The analysis becomes more complex when loop bounds are variable or dependent on the outer loop counter.

#### Example 3: Triangular Loop Pattern

```c
for (i = 0; i < n; i++)       // Executes n times
    for (j = 0; j <= i; j++)  // Executes (i+1) times for iteration i
        arr[i][j] = 1;        // One operation (assignment)
```
 **Frequency Analysis**:
Inner assignment operation: 1 operation
Inner loop initialization: 1 operation (j = 0)
Inner loop condition check: (i+1)+1 operations (j <= i, checked i+2 times)
Inner loop increment: i+1 operations (j++, performed i+1 times)
Inner loop executes (i+1) times for iteration i of the outer loop
Outer loop initialization: 1 operation (i = 0)
Outer loop condition check: n+1 operations (i < n, checked n+1 times)
Outer loop increment: n operations (i++, performed n times)
Total operations for inner loop body across all outer iterations:
Sum of (i+1) for i=0 to n-1 = (1 + 2 + 3 + ... + n) = n(n+1)/2
Total operations for inner loop overhead:
Initialization: n operations (once per outer loop)
Condition check: sum of (i+2) for i=0 to n-1 = n + 2n = 3n
Increment: sum of (i+1) for i=0 to n-1 = n(n+1)/2
Total inner loop overhead: n + 3n + n(n+1)/2 = 4n + n(n+1)/2
Total operations for outer loop (excluding inner loop): 1 + (n+1) + n = 2n + 2
**Final count**: (2n + 2) + (4n + n(n+1)/2) + n(n+1)/2 = 2n + 2 + 4n + n(n+1) = 2n + 2 + 4n + n² + n = n² + 7n + 2
**Time Complexity**: O(n²)

#### Example 4: Variable Upper Bound

```c
for (i = 0; i < n; i++)         // Executes n times
    for (j = i; j < n; j++)     // Executes (n-i) times for iteration i
        arr[i][j] = arr[j][i];  // Two operations (read and write)
```
 **Frequency Analysis**:
Inner statement operations: 2 operations per iteration (read and write)
Inner loop initialization: 1 operation (j = i)
Inner loop condition check: (n-i)+1 operations (j < n, checked n-i+1 times)
Inner loop increment: n-i operations (j++, performed n-i times)
Inner loop executes (n-i) times for iteration i of the outer loop
Outer loop initialization: 1 operation (i = 0)
Outer loop condition check: n+1 operations (i < n, checked n+1 times)
Outer loop increment: n operations (i++, performed n times)
Total operations for inner loop body across all outer iterations:
Sum of 2(n-i) for i=0 to n-1
= 2 × [n + (n-1) + (n-2) + ... + 1]
= 2 × n(n+1)/2
= n(n+1) operations
Total operations for inner loop overhead:
Initialization: n operations (once per outer loop)
Condition check: sum of (n-i+1) for i=0 to n-1
      = n × (n+1) - sum of i from 0 to n-1
      = n(n+1) - n(n-1)/2
      = n(n+1) - n²/2 + n/2
      = n² + n - n²/2 + n/2
      = n²/2 + 3n/2
Increment: sum of (n-i) for i=0 to n-1
      = n² - n(n-1)/2
      = n² - n²/2 + n/2
      = n²/2 + n/2
Total inner loop overhead: n + (n²/2 + 3n/2) + (n²/2 + n/2) = n² + 3n
Total operations for outer loop (excluding inner loop): 2n + 2
**Final count**: (2n + 2) + (n² + 3n) + n(n+1) = 2n + 2 + n² + 3n + n² + n = 2n² + 6n + 2
**Time Complexity**: O(n²)

### Triple Nested Loops

For triple nested loops, we multiply the iterations of all three loops.

#### Example 5: Standard Triple Loop (Cubic Complexity)

```c
for (i = 0; i < n; i++)        // Executes n times
    for (j = 0; j < n; j++)    // Executes n times for each i
        for (k = 0; k < n; k++) // Executes n times for each (i,j) pair
            sum += arr[i][j][k]; // Two operations (read and add-assign)
```
 **Frequency Analysis**:
Innermost statement: 2 operations (read and add-assign)
Innermost loop (k) operations:
Initialization: 1 operation (k = 0)
Condition check: n+1 operations (k < n, checked n+1 times)
Increment: n operations (k++, performed n times)
Body: 2n operations (2 operations × n iterations)
Total per (i,j) pair: 1 + (n+1) + n + 2n = 4n + 2
Middle loop (j) operations:
Initialization: 1 operation (j = 0)
Condition check: n+1 operations (j < n, checked n+1 times)
Increment: n operations (j++, performed n times)
Inner loop total: n × (4n + 2) = 4n² + 2n
Total per i: 1 + (n+1) + n + (4n² + 2n) = 4n² + 4n + 2
Outer loop (i) operations:
Initialization: 1 operation (i = 0)
Condition check: n+1 operations (i < n, checked n+1 times)
Increment: n operations (i++, performed n times)
Middle and inner loops: n × (4n² + 4n + 2) = 4n³ + 4n² + 2n
**Final count**: 1 + (n+1) + n + (4n³ + 4n² + 2n) = 4n³ + 4n² + 4n + 2
**Time Complexity**: O(n³)

#### Example 6: Triple Loop with Variable Bounds

```c
for (i = 0; i < n; i++)           // Executes n times
    for (j = 0; j < i; j++)       // Executes i times for iteration i
        for (k = j; k < n; k++)   // Executes (n-j) times for iteration j
            arr[i][j][k] = 0;     // One operation (assignment)
```
 **Frequency Analysis**:
Innermost statement: 1 operation (assignment)
Innermost loop (k) operations for a specific (i,j):
Initialization: 1 operation (k = j)
Condition check: (n-j)+1 operations (k < n, checked n-j+1 times)
Increment: (n-j) operations (k++, performed n-j times)
Body: (n-j) operations (1 operation × (n-j) iterations)
Total for a specific (i,j): 1 + (n-j+1) + (n-j) + (n-j) = 3(n-j) + 2
For a specific i, summing over j (from 0 to i-1):
Sum of [3(n-j) + 2] for j=0 to i-1
= 3 × sum of (n-j) + 2i
= 3 × [i×n - sum of j from 0 to i-1]
= 3 × [i×n - i(i-1)/2]
= 3in - 3i²/2 + 3i/2 + 2i
= 3in - 3i²/2 + 7i/2
Middle loop (j) overhead for a specific i:
Initialization: 1 operation (j = 0)
Condition check: i+1 operations (j < i, checked i+1 times)
Increment: i operations (j++, performed i times)
Total overhead: 1 + (i+1) + i = 2i + 2
Total operations for a specific i (middle loop + innermost loops):
(2i + 2) + (3in - 3i²/2 + 7i/2)
= 3in - 3i²/2 + 7i/2 + 2i + 2
= 3in - 3i²/2 + 11i/2 + 2
Summing over i (from 0 to n-1):
Sum of [3in - 3i²/2 + 11i/2 + 2] for i=0 to n-1
= 3 × sum of (i×n) - 3/2 × sum of i² + 11/2 × sum of i + 2n
= 3n × n(n-1)/2 - 3/2 × n(n-1)(2n-1)/6 + 11/2 × n(n-1)/2 + 2n
= 3n²(n-1)/2 - 3n(n-1)(2n-1)/12 + 11n(n-1)/4 + 2n
= 3n³/2 - 3n²/2 - n(n-1)(2n-1)/4 + 11n²/4 - 11n/4 + 2n
= 3n³/2 - 3n²/2 - (2n³-3n²+n)/4 + 11n²/4 - 11n/4 + 2n
= 3n³/2 - 3n²/2 - n³/2 + 3n²/4 - n/4 + 11n²/4 - 11n/4 + 2n
= n³ - 3n²/2 + 3n²/4 + 11n²/4 - n/4 - 11n/4 + 2n
= n³ + (3+11-6)/4 × n² + (8-1-11)/4 × n
= n³ + 2n² + n × (-1)
= n³ + 2n² - n
Outer loop (i) overhead:
Initialization: 1 operation (i = 0)
Condition check: n+1 operations (i < n, checked n+1 times)
Increment: n operations (i++, performed n times)
Total overhead: 1 + (n+1) + n = 2n + 2
**Final count**: (2n + 2) + (n³ + 2n² - n) = n³ + 2n² + n + 2
**Time Complexity**: O(n³)

### Logarithmic Loops

Loops that reduce the problem size by a factor in each iteration.

#### Example 7: Simple Logarithmic Loop

```c
for (i = 1; i < n; i *= 2)   // Executes log₂(n) times
    sum += i;                // One operation (add-assign)
```
 **Frequency Analysis**:
Let k = log₂(n), so the loop runs approximately k times
Inner statement: 1 operation (add-assign), executed k times
Loop initialization: 1 operation (i = 1)
Loop condition check: k+1 operations (i < n, checked k+1 times)
Loop update: k operations (i \*= 2, performed k times)
**Final count**: 1 + (k+1) + k + k = 3k + 2 = 3log₂(n) + 2
**Time Complexity**: O(log n)

#### Example 8: Nested Logarithmic Loop

```c
for (i = 1; i < n; i *= 2)       // Executes log₂(n) times
    for (j = 0; j < i; j++)      // Executes i times for iteration i
        arr[j] = 0;              // One operation (assignment)
```
 **Frequency Analysis**:
Let k = log₂(n), so the outer loop runs approximately k times
Values of i: 1, 2, 4, 8, ..., 2^(k-1)
Inner loop operations for a specific i:
Initialization: 1 operation (j = 0)
Condition check: i+1 operations (j < i, checked i+1 times)
Increment: i operations (j++, performed i times)
Body: i operations (1 operation × i iterations)
Total for specific i: 1 + (i+1) + i + i = 3i + 2
Summing over all values of i:
Sum of (3i + 2) for i = 1, 2, 4, 8, ..., 2^(k-1)
= 3 × sum of i + 2k
= 3 × (2^k - 1) + 2k (sum of geometric series 1 + 2 + 4 + ... + 2^(k-1) = 2^k - 1)
= 3 × 2^k - 3 + 2k
= 3 × 2^(log₂n) - 3 + 2log₂n
= 3n - 3 + 2log₂n
Outer loop overhead:
Initialization: 1 operation (i = 1)
Condition check: k+1 operations (i < n, checked k+1 times)
Update: k operations (i \*= 2, performed k times)
Total overhead: 1 + (k+1) + k = 2k + 2 = 2log₂n + 2
**Final count**: (2log₂n + 2) + (3n - 3 + 2log₂n) = 3n - 3 + 4log₂n + 2 = 3n + 4log₂n - 1
**Time Complexity**: O(n)

### Practical Tips for Analyzing Nested Loops

1. **Work from the innermost loop outward**:
Count operations in the innermost loop body
Multiply by the number of iterations of that loop
Continue outward, multiplying by each loop's iterations

2. **Handle variable bounds carefully**:
For loops where the bounds depend on outer loop variables, use summation formulas
Common summations:
Σᵏᵢ₌₁ i = k(k+1)/2
Σᵏᵢ₌₁ i² = k(k+1)(2k+1)/6
Σᵏᵢ₌₁ i³ = [k(k+1)/2]²

3. **Account for loop overhead**:
Initialization (typically 1 operation)
Condition check (iterations + 1 operations)
Update/increment (iterations operations)

4. **Simplify final expressions**:
Keep only the highest-order term for asymptotic analysis
For example, n³/6 + n²/2 + 3n simplifies to O(n³)

### Common Loop Patterns and Their Complexities

| Loop Pattern              | Example                                                                   | Final Count        | Time Complexity |
| ------------------------- | ------------------------------------------------------------------------- | ------------------ | --------------- |
| Simple loop               | `for (i = 0; i < n; i++)`                                                 | 2n + 2             | O(n)            |
| Nested loop (same bounds) | `for (i = 0; i < n; i++) for (j = 0; j < n; j++)`                         | 3n² + 4n + 2       | O(n²)           |
| Triangular loop           | `for (i = 0; i < n; i++) for (j = 0; j <= i; j++)`                        | n² + 7n + 2        | O(n²)           |
| Triple nested loop        | `for (i = 0; i < n; i++) for (j = 0; j < n; j++) for (k = 0; k < n; k++)` | 4n³ + 4n² + 4n + 2 | O(n³)           |
| Logarithmic loop          | `for (i = 1; i < n; i *= 2)`                                              | 3log₂n + 2         | O(log n)        |
| Nested logarithmic loop   | `for (i = 1; i < n; i *= 2) for (j = 0; j < i; j++)`                      | 3n + 4log₂n - 1    | O(n)            |

## Common Pitfalls
 Assuming all nested loops are $O(n^2)$ — **dependent-bound (triangular) loops** like `for (j = 0; j < i; j++)` yield $\frac{n(n-1)}{2}$, which is still $O(n^2)$ but with a different constant Multiplying iteration counts incorrectly for **variable upper-bound loops** — you must expand the summation, not just multiply $n \times n$ Forgetting to count **each loop's initialization, condition, and increment separately** — a triple nested loop has 3 sets of control operations Miscounting **logarithmic inner loops** (e.g., `i *= 2`) — the inner body count is $O(\log n)$ per outer iteration, not $O(n)$ Overlooking that a nested loop with dependent bounds can sometimes simplify to $O(n)$ (e.g., `for (j = 0; j < i; j++)` inside `for (i = 1; i < n; i *= 2)` sums to $O(n)$)

## Summary

> TL;DR — **Nested loops** require careful frequency counting: standard double loops give $O(n^2)$, triple loops give $O(n^3)$, **triangular (dependent-bound)** loops yield $\frac{n(n-1)}{2} = O(n^2)$, and **logarithmic inner loops** can reduce complexity. Always expand summations for variable-bound loops rather than guessing.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. In a standard double loop where both loops iterate $n$ times, what is the resulting time complexity?
- **A)** $O(n)$
- **B)** $O(n \log n)$
- **C)** $O(n^2)$
- **D)** $O(n^3)$

2. For a triangular loop pattern where the inner loop bounds depend on the outer loop (e.g., `j <= i`), what is the approximate number of total inner loop body executions?
- **A)** $n^2$
- **B)** $n(n+1)/2$
- **C)** $n(n-1)$
- **D)** $n$

3. Does a triangular loop pattern (like `for j = 0 to i`) have a different Big-O time complexity than a standard double loop (`for j = 0 to n`)?
- **A)** Yes, it is $O(n \log n)$.
- **B)** Yes, it is $O(n)$.
- **C)** No, both are $O(n^2)$, but the triangular loop has a smaller constant factor.
- **D)** No, they execute exactly the same number of operations.

4. What is the time complexity of a standard triple nested loop where each loop runs $n$ times?
- **A)** $O(n^2)$
- **B)** $O(n^3)$
- **C)** $O(3n)$
- **D)** $O(n^4)$

5. When working with a logarithmic loop like `for (i = 1; i < n; i *= 2)`, approximately how many times does the loop execute?
- **A)** $n$
- **B)** $n/2$
- **C)** $\log_2(n)$
- **D)** $2^n$

6. What is the time complexity of a nested logarithmic loop where the outer loop is `i *= 2` and the inner loop is `j < i`?
- **A)** $O(n)$
- **B)** $O(n \log n)$
- **C)** $O(\log n)$
- **D)** $O(n^2)$

7. What is the recommended strategy for analyzing nested loops?
- **A)** Multiply all loop bounds by $n$ immediately.
- **B)** Ignore inner loop overhead and only count the body.
- **C)** Work from the innermost loop outward, multiplying by each loop's iterations.
- **D)** Add the iterations of all loops together instead of multiplying.

8. What mathematical tool should be used to handle variable bounds in nested loops?
- **A)** Subtraction
- **B)** Matrix multiplication
- **C)** Summation formulas
- **D)** Derivatives

9. What is a common pitfall when analyzing variable upper-bound loops?
- **A)** Expanding the summation instead of multiplying $n \times n$.
- **B)** Multiplying iteration counts incorrectly (e.g., just $n \times n$) instead of expanding the summation.
- **C)** Assuming all loops run in constant time.
- **D)** Counting the initialization separately.

10. In a standard loop frequency count, what is the overhead structure typically composed of?
- **A)** Initialization (1), condition check (iterations + 1), and update/increment (iterations).
- **B)** Initialization (1), condition check (1), and update (1).
- **C)** Initialization (iterations), condition check (iterations), and update (iterations).
- **D)** Condition check only.

### Answer Key & Explanations
1. **C)** A standard double loop multiplies the iterations of the outer loop ($n$) by the inner loop ($n$), resulting in $n^2$ iterations, or $O(n^2)$ time complexity.
2. **B)** The triangular pattern requires summing the integers from 1 to $n$, which resolves to the standard arithmetic series formula $n(n+1)/2$.
3. **C)** While $n(n+1)/2$ roughly halves the total number of operations compared to $n^2$, both simplify algebraically to $O(n^2)$ because constant fractions are dropped in Big-O analysis.
4. **B)** Multiplying three nested loops running $n$ times each results in $n \times n \times n = n^3$, so the time complexity is $O(n^3)$.
5. **C)** Multiplying the loop counter by 2 at each step repeatedly halves the remaining distance to $n$, which is the mathematical definition of a base-2 logarithm.
6. **A)** While initially seemingly $O(n \log n)$, expanding the geometric series summation actually resolves the total operation count to $O(n)$.
7. **C)** Working from the innermost loop outward ensures that the overhead of inner loops is correctly multiplied by the outer loops governing them.
8. **C)** Variable bounds require calculating a mathematical series (like $\sum i$), which cannot be accurately captured by simple flat multiplication.
9. **B)** A common mistake is seeing a nested loop and blindly declaring its operations as exactly $n \times n$ without recognizing that the inner loop boundary dynamically changes.
10. **A)** Standard loop overhead requires setting up the variable once (1), checking the condition one more time than the loop runs (iterations + 1), and incrementing the variable exactly as many times as the loop runs (iterations).

## References & Navigation

- **Previous Topic:** [[Master Theorem]]
- **Next Topic:** [[Order of Growth]]
- **Related Notes:** [[Loops]], [[Time Complexity]]
