---
id: karnaugh_map
type: note
course: CSARCH1
topic: Karnaugh Map
status: completed
---

# Karnaugh Map

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[CSARCH1]] #[[Problem Solving]] #[[M3]]

---

## Overview
This sub-module discusses how to minimize Boolean functions using the Karnaugh Map.
The objectives are:
- Learn how to minimize Boolean functions using Karnaugh Map.
- Learn how to minimize Boolean functions with don’t care conditions using Karnaugh Map.

## Karnaugh Map
A Karnaugh Map (K-map) is represented by $2^m$ squares where $m$ is the number of variables, and each of these squares represents a corresponding minterm or maxterm. It is a modified truth table intended to allow minimal SOP (Sum of Products) and POS (Product of Sums) expressions to be obtained by visual inspection.

### Rules for Implementing K-Map
1. Groupings should be a factor of $2^n$ (1, 2, 4, 8, 16, etc.), where $n = 0, 1, \dots, m$.
2. Groupings should either be horizontal or vertical only. No diagonal groupings.
3. For each group, cover as many 1’s (for SOP) or 0’s (for POS) as possible since it will minimize the number of literals.
4. For each group, there should be at least one exclusive minterm or maxterm (a cell not covered by any other group).
5. You are allowed to use a minterm or a maxterm more than once if it would make a group bigger.
6. Each group corresponds to one product or sum term.
7. Remove redundant groups (a group is redundant when all its entries are already covered by other essential groups).

### Number of Variables
- **2-Variable K-Map:** 4 squares. Columns/Rows typically A, B.
- **3-Variable K-Map:** 8 squares. Example headers using gray code (00, 01, 11, 10) to ensure adjacent columns differ by only one bit.
- **4-Variable K-Map:** 16 squares. 
- **5-Variable K-Map:** 32 squares. Often split into two 16-square 4-variable K-maps representing A=0 and A=1.
- **6-Variable K-Map:** 64 squares. Grouped as four 4-variable maps representing AB=00, AB=01, AB=10, AB=11.

### Don't Care Conditions
- Don’t care conditions (represented by X or d) can be treated as either 0 or 1.
- They can be included in groups to make K-map groups bigger and further simplify the expression.
- Do not use them (i.e., just treat them as 0s) if they do not help in forming larger groups.

## Worked Examples
- $F(A,B) = \Sigma m(0,2)$ simplifies to $B'$
- $F(A,B,C) = \Sigma m(0,1,2,5,6,7)$ simplifies to $A'B' + AC + BC'$
- $F(A,B,C,D) = \Sigma m(0,2,3,7,8,10,11,13)$ simplifies to $B'C + B'D' + A'CD + ABC'D$
- With Don't Care: $F(A,B,C,D) = \Sigma m(1,3,7,11,15)$ with $d(A,B,C,D) = \Sigma m(0,2,5)$ simplifies to $A'D + CD$

## Multiple Choice Questions

1. In a Karnaugh Map, the number of squares is given by 2^m. What does 'm' represent?
    - **A)** The number of minterms
    - **B)** The number of maxterms
    - **C)** The number of variables
    - **D)** The number of rows in the table

2. When grouping cells in a K-map, the number of cells in a group must be a factor of:
    - **A)** 2^n
    - **B)** n^2
    - **C)** 2n
    - **D)** n!

3. What is the shape or direction of valid groupings in a K-map?
    - **A)** Diagonal only
    - **B)** Horizontal or vertical only
    - **C)** Any connected adjacent squares including diagonals
    - **D)** Only square blocks, no straight lines

4. Why is it beneficial to cover as many 1s (or 0s) as possible in a single K-map group?
    - **A)** It increases the number of variables in the term
    - **B)** It minimizes the number of literals in the final expression
    - **C)** It prevents overlapping groups
    - **D)** It eliminates the need for maxterms

5. When is a group in a K-map considered "redundant"?
    - **A)** When it contains an odd number of 1s
    - **B)** When all its entries are already covered by other groups
    - **C)** When it uses don't-care conditions
    - **D)** When it wraps around the edges of the map

6. Can a single minterm or maxterm be used more than once in K-map groupings?
    - **A)** Yes, if it helps make a group bigger
    - **B)** Yes, but only in 5-variable maps
    - **C)** No, each must belong to exactly one group
    - **D)** No, reusing terms invalidates the Boolean expression

7. For a 3-variable K-map representing F(x,y,z), what are the column headers typically labeled as if using gray code?
    - **A)** 00, 01, 10, 11
    - **B)** 00, 01, 11, 10
    - **C)** 0, 1, 2, 3
    - **D)** 11, 10, 01, 00

8. What is the primary purpose of a "don't care" condition in a K-map?
    - **A)** To act as a mandatory 0
    - **B)** To act as a mandatory 1
    - **C)** To be included in groups only if it helps make the group bigger and further simplifies the expression
    - **D)** To indicate an error in the circuit logic

9. In a 4-variable K-map, how many cells does the map contain?
    - **A)** 8
    - **B)** 16
    - **C)** 32
    - **D)** 64

10. Which of the following is NOT a valid grouping size in a K-map?
    - **A)** 2
    - **B)** 4
    - **C)** 6
    - **D)** 8

### Answer Key & Explanations

1. **C**. The term 'm' specifies the number of Boolean variables involved in the function.
2. **A**. Groups must adhere to powers of two (1, 2, 4, 8, etc.) to successfully eliminate variables.
3. **B**. Groupings can only span horizontally or vertically; diagonal groups do not simplify variables.
4. **B**. A larger group eliminates more variables, yielding a simpler Boolean expression with fewer literals.
5. **B**. If every cell in a group is part of another essential group, that group is redundant and should be removed.
6. **A**. Overlapping groups are fully permitted and encouraged if they result in larger groupings.
7. **B**. K-maps utilize gray code ordering (00, 01, 11, 10) so that adjacent columns differ by only one bit.
8. **C**. Don't cares are flexible; they can be treated as 1s or 0s to maximize group size, but shouldn't be grouped unnecessarily.
9. **B**. According to the formula 2^m, a 4-variable map has 2^4 = 16 cells.
10. **C**. 6 is not a power of 2 (2^n). Valid sizes are 1, 2, 4, 8, 16, etc.

## References & Navigation

- **Previous Topic:** [[Logic Gates]]
- **Next Topic:** [[Introduction to Hardware Description Language]]
- **Related Notes:** [[Boolean Algebra]], [[Combinational Circuit - Design]]