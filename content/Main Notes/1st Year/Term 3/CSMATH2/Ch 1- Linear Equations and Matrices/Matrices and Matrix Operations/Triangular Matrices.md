---
id: Triangular-Matrices
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Triangular Matrices

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Upper Triangular Matrix: A square matrix A=[aij​] is called upper triangular if all entries _below_ the main diagonal are zero, i.e., aij​=0 for i>...

## Key Concepts
 [[Upper Triangular Matrix]] Example [[Lower Triangular Matrix]] Example

## Details / Theory
 **[[Upper Triangular Matrix]]**: A square matrix A=[aij​] is called **upper triangular** if all entries _below_ the main diagonal are zero, i.e., aij​=0 for i>j. (Handout 2, Page 6)
**Example:** U=[4​0​3 0​5​6 0​0​−1​] (Handout 2, Page 6) **[[Lower Triangular Matrix]]**: A square matrix A=[aij​] is called **lower triangular** if all entries _above_ the main diagonal are zero, i.e., aij​=0 for i<j. (Handout 2, Page 6)
**Example:** L=[1​0​0 2​5​0 3​−1​2​] (Handout 2, Page 6) _**Personal Note:**_
_A diagonal matrix is both upper and lower triangular._
_The transpose of an upper triangular matrix is a lower triangular matrix, and vice-versa._
_The product of two upper (lower) triangular matrices is an upper (lower) triangular matrix._
_The determinant of a triangular matrix is the product of its diagonal entries._

## Common Pitfalls
 A matrix that is both upper and lower triangular is a diagonal matrix. Triangular matrices are only defined for square matrices.

## Summary

> TL;DR — Triangular matrices have zeros on one side of the diagonal. Determinant = product of diagonal entries. Transpose of upper triangular is lower triangular and vice versa.

## Links
 **Related:** - [[Upper Triangular Matrix]] - [[Lower Triangular Matrix]] **Source / Reference:**

## Multiple Choice Questions

1. What strictly defines an upper triangular matrix?
    - **A)** All entries above the main diagonal are zero.
    - **B)** All entries exactly on the main diagonal are zero.
    - **C)** All entries strictly below the main diagonal are zero.
    - **D)** The matrix is shaped like a triangle.

2. What strictly defines a lower triangular matrix?
    - **A)** All entries strictly above the main diagonal are zero.
    - **B)** All entries strictly below the main diagonal are zero.
    - **C)** All non-zero entries are negative.
    - **D)** The determinant is zero.

3. If a square matrix is simultaneously both an upper triangular matrix and a lower triangular matrix, what is it officially called?
    - **A)** An Identity Matrix
    - **B)** A Diagonal Matrix
    - **C)** A Zero Matrix
    - **D)** A Symmetric Matrix

### Answer Key & Explanations

1. **C**. An upper triangular matrix has non-zero entries on and above the main diagonal, meaning all entries below it must be zero.
2. **A**. A lower triangular matrix has non-zero entries on and below the main diagonal, meaning all entries above it must be zero.
3. **B**. A common pitfall states that a matrix with zeros both above and below the main diagonal is a diagonal matrix.

## References & Navigation

- **Previous Topic:** [[Transpose of a Matrix]]
- **Next Topic:** [[Types of Matrices]]
- **Related Notes:** [[Size & Dimension of a Matrix]], [[Elementary Row Operation]], [[Matrices Detailed]]
