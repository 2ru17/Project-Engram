---
id: Matrix-Subtraction-(Difference)
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Matrix Subtraction (Difference)

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Definition: If $A=[a_{ij}]$ and $B=[b_{ij}]$ are matrices of the same size ($m \times n$), their difference $A-B$ is defined as $A+(-1)B$. This res...

## Key Concepts
 Non-Commutativity

## Details / Theory
 Definition: If $A=[a_{ij}]$ and $B=[b_{ij}]$ are matrices of the same size ($m \times n$), their difference $A-B$ is defined as $A+(-1)B$. This results in subtracting corresponding entries:
  $$A-B=A+(-1)B=[a_{ij}]+[-b_{ij}]=[a_{ij}-b_{ij}]$$
  (Handout 1, Pages 10) Example: Let $A=\begin{bmatrix}
    2 & 3 & 4 \\
    0 & 1 & -1 \\
    2 & 0 & 1
    \end{bmatrix}$ and $B=\begin{bmatrix}
    0 & 6 & 2 \\
    4 & 1 & 0 \\
    -1 & 2 & 4
    \end{bmatrix}$.
  $$
  A-B=\begin{bmatrix}
  2-0 & 3-6 & 4-2 \\
  0-4 & 1-1 & -1-0 \\
  2-(-1) & 0-2 & 1-4
  \end{bmatrix}=\begin{bmatrix}
  2 & -3 & 2 \\
  -4 & 0 & -1 \\
  3 & -2 & -3
  \end{bmatrix}
  $$
  (Handout 1, Page 11) **Non-Commutativity:** In general, $A-B \neq B-A$. (Handout 1, Page 13)

## Common Pitfalls
 Same size requirement as addition: $A - B$ only defined when $A$ and $B$ are the same $m \times n$. $A - B \neq B - A$ in general (subtraction is not commutative).

## Summary

> TL;DR — Matrix subtraction: $(A - B)_{ij} = a_{ij} - b_{ij}$. Requires same dimensions. Not commutative.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. How is the matrix difference $A - B$ formally defined using addition and scalar multiplication?
    - **A)** $A + B^{-1}$
    - **B)** $A + (1/B)$
    - **C)** $A + (-1)B$
    - **D)** $(-1)A + B$

2. What strict size requirement must be met to subtract matrix $B$ from matrix $A$?
    - **A)** Matrices $A$ and $B$ must have the exact same dimensions ($m \times n$).
    - **B)** Matrix $B$ must have fewer rows than matrix $A$.
    - **C)** Both matrices must be square matrices.
    - **D)** The number of columns in $A$ must match the number of rows in $B$.

3. Is the operation of matrix subtraction commutative?
    - **A)** Yes, $A - B$ always equals $B - A$.
    - **B)** Yes, but only for square matrices.
    - **C)** No, in general $A - B \neq B - A$.
    - **D)** No, but it is associative.

### Answer Key & Explanations
1. **C)** The difference $A - B$ is formally defined by adding $A$ to the scalar multiple of $-1$ times $B$, i.e., $A + (-1)B$.
2. **A)** Like addition, matrix subtraction requires both matrices to be of the exact same size; otherwise, the operation is undefined.
3. **C)** Subtraction is not commutative. A common pitfall is assuming $A - B$ yields the same result as $B - A$.

## References & Navigation

- **Previous Topic:** [[Matrix Multiplication]]
- **Next Topic:** [[Nonsingular Matrix]]
- **Related Notes:** [[Scalar Multiplication]], [[Identity Matrix]], [[Matrices Detailed]]
