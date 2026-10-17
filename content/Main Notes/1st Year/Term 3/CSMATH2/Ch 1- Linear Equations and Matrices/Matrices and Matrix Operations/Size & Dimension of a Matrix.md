---
id: Size-&-Dimension-of-a-Matrix
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Size & Dimension of a Matrix

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> The size or dimension of a matrix is given by the number of rows (m) by the number of columns (n), written as $m \times n$. (Handout 1, Page 3)

## Details / Theory
 The **size** or **dimension** of a matrix is given by the number of rows (m) by the number of columns (n), written as $m \times n$. (Handout 1, Page 3) Example:
  $$
  A=\begin{bmatrix}
  2 & 1 & 0 \\
  -1 & 4 & 2 \\
  10 & 5 & 3 \\
  0 & 1 & 7
  \end{bmatrix}$$ has size $4 \times 3$. The (3,1) entry is $a_{31}=10$. (Handout 1, Page 4)

  $$B=\begin{bmatrix}
  1 & 2 \\
  3 & 4
  \end{bmatrix}$$ has size $2 \times 2$. (Handout 1, Page 4)

  $$C=\begin{bmatrix}
  1/2 & 3 & -2/3 \\
  4 & 1/3 & 5
  \end{bmatrix}$$ has size $2 \times 3$. (Handout 1, Page 4)
  $$

## Common Pitfalls
 Size is always rows × columns ($m \times n$), not columns × rows. A $3 \times 1$ matrix is NOT the same as a $1 \times 3$ matrix.

## Summary

> TL;DR — The size of a matrix is $m \times n$ (rows × columns). Two matrices are the same size only if both $m$ and $n$ match. Size determines which operations are valid.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. How is the size or dimension of a matrix correctly denoted?
- **A)** Number of columns $	imes$ Number of rows
- **B)** Number of rows $	imes$ Number of columns
- **C)** Number of rows $+$ Number of columns
- **D)** Number of columns $/$ Number of rows

2. In a matrix of size $4 	imes 3$, what does the entry $a_{31}$ represent?
- **A)** The entry in the 1st row and 3rd column.
- **B)** The entry in the 3rd row and 1st column.
- **C)** The entry in the 4th row and 3rd column.
- **D)** The entry in the 31st position of the matrix.

3. Which of the following describes a common pitfall when interpreting the size of a matrix?
- **A)** Thinking that a $3 	imes 1$ matrix is the exact same size as a $1 	imes 3$ matrix.
- **B)** Assuming size matters only for matrix addition.
- **C)** Using negative numbers to describe dimensions.
- **D)** Confusing matrix size with matrix trace.

### Answer Key & Explanations
1. **B)** The size of a matrix is always given by the number of rows ($m$) followed by the number of columns ($n$), written as $m 	imes n$.
2. **B)** Following the row-first convention ($a_{ij}$), the entry $a_{31}$ is located in the 3rd row and 1st column.
3. **A)** A common pitfall is reversing the dimensions or assuming they are commutative; a $3 	imes 1$ column matrix is entirely different from a $1 	imes 3$ row matrix.

## References & Navigation

- **Previous Topic:** [[Scalar Multiplication]]
- **Next Topic:** [[Skew-Symmetric Matrix]]
- **Related Notes:** [[Square Matrix]], [[Definition of a Matrix]], [[Matrices Detailed]]
