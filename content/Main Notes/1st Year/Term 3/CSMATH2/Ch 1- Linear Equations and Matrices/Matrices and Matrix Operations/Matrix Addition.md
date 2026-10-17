---
id: Matrix-Addition
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Matrix Addition

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Definition: If $A=[a_{ij}]$ and $B=[b_{ij}]$ are matrices of the same size ($m \times n$), their sum $A+B$ is the $m \times n$ matrix obtained by a...

## Key Concepts
 Requirement

## Details / Theory
 Definition: If $A=[a_{ij}]$ and $B=[b_{ij}]$ are matrices of the same size ($m \times n$), their sum $A+B$ is the $m \times n$ matrix obtained by adding corresponding entries:
  $$A+B=[a_{ij}+b_{ij}]$$
  (Handout 1, Page 8) **Requirement:** Matrices **must** have the same dimensions. Addition is undefined otherwise. (Handout 1, Page 8)
_**PN:**_ _Conceptually simple: just add element-wise, like adding vectors. The size constraint is key._ Example:
  $$
  \begin{bmatrix}
  -1 & 2 \\
  0 & 1
  \end{bmatrix}+\begin{bmatrix}
  1 & 3 \\
  -1 & 2
  \end{bmatrix}=\begin{bmatrix}
  -1+1 & 2+3 \\
  0+(-1) & 1+2
  \end{bmatrix}=\begin{bmatrix}
  0 & 5 \\
  -1 & 3
  \end{bmatrix}
  $$
  (Handout 1, Page 8)

## Common Pitfalls
 Cannot add matrices of different sizes — $A + B$ requires $A$ and $B$ to be the same $m \times n$. Addition is entry-wise, not row-wise or column-wise as a whole.

## Summary

> TL;DR — Matrix addition: $(A + B)_{ij} = a_{ij} + b_{ij}$. Requires same dimensions. Commutative and associative.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. What condition is strictly required to perform matrix addition $A + B$?
- **A)** The matrices must both be square matrices.
- **B)** Both matrices must have the exact same dimensions.
- **C)** The number of columns in $A$ must equal the number of rows in $B$.
- **D)** The matrices must have non-zero determinants.

2. In matrix addition, how is the entry $(A+B)_{ij}$ computed?
- **A)** By taking the dot product of row $i$ and column $j$.
- **B)** By adding the corresponding entries $a_{ij}$ and $b_{ij}$.
- **C)** By summing all elements in both matrices.
- **D)** By multiplying the corresponding entries $a_{ij}$ and $b_{ij}$.

3. What is a common pitfall when attempting to add matrices?
- **A)** Adding matrices of different sizes, which is undefined.
- **B)** Applying commutativity to matrix addition.
- **C)** Forgetting to multiply by a scalar first.
- **D)** Adding matrices that have negative entries.

### Answer Key & Explanations
1. **B)** Matrix addition is only defined if the matrices $A$ and $B$ have the exact same size (dimensions).
2. **B)** The sum is calculated element-wise, meaning the entry in the $i$-th row and $j$-th column of the result is $a_{ij} + b_{ij}$.
3. **A)** A common pitfall is trying to add matrices of different dimensions ($m \times n$). They must be strictly the same size.

## References & Navigation

- **Previous Topic:** [[Matrices and Matrix Operations]]
- **Next Topic:** [[Matrix Equality]]
- **Related Notes:** [[Scalar Multiplication]], [[Inverse of a Matrix]], [[Matrices Detailed]]
