---
id: Symmetric-Matrix
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Symmetric Matrix

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Definition: A square matrix A is called symmetric if A⊤=A. (Handout 2, Page 7)

## Key Concepts
 Definition Remarks

## Details / Theory
 **Definition:** A square matrix A is called **symmetric** if A⊤=A. (Handout 2, Page 7)
This means aij​=aji​ for all i,j. Example:
  A=[1​2​3 2​4​5 3​5​6​]
  (Handout 2, Page 7) **Remarks:** (Handout 2, Page 7)
If A is symmetric, it must be a square matrix (since A and A⊤ must have the same dimensions for equality).

## Common Pitfalls
 A symmetric matrix must be square ($A^T$ and $A$ must have the same dimensions). $A^T A$ and $AA^T$ are always symmetric for any matrix $A$.

## Summary

> TL;DR — Symmetric: $A^T = A$, meaning $a_{ij} = a_{ji}$. Must be square. Common in applications (covariance matrices, distance matrices). Eigenvalues are always real.

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. What is the formal definition of a symmetric matrix $A$?
    - **A)** $A^T = -A$
    - **B)** $A^T = A$
    - **C)** $A = A^{-1}$
    - **D)** $A = I_n$

2. In terms of matrix entries, what must hold strictly true for a symmetric matrix?
    - **A)** $a_{ij} = -a_{ji}$ for all indices $i, j$
    - **B)** $a_{ij} = 0$ for all $i \neq j$
    - **C)** $a_{ij} = a_{ji}$ for all indices $i, j$
    - **D)** $a_{ii} = 1$ for all indices $i$

3. According to the notes, which of the following matrix expressions always results in a symmetric matrix, regardless of the original dimensions of matrix $A$?
    - **A)** $A - A^T$
    - **B)** $A^T A$ and $A A^T$
    - **C)** $A^2$
    - **D)** $A + A^{-1}$

### Answer Key & Explanations

1. **B**. By definition, a square matrix is called symmetric if it is equal to its own transpose, meaning $A^T = A$.
2. **C**. The structural consequence of $A^T = A$ is that every entry $a_{ij}$ must equal its corresponding reflected entry $a_{ji}$.
3. **B**. A common property highlighted in the pitfalls is that the products $A^T A$ and $A A^T$ always yield a symmetric matrix for any matrix $A$.

## References & Navigation

- **Previous Topic:** [[Square Matrix]]
- **Next Topic:** [[Trace of a Matrix]]
- **Related Notes:** [[Special Types of Square Matrices]], [[Nonsingular Matrix]], [[Matrices Detailed]]
