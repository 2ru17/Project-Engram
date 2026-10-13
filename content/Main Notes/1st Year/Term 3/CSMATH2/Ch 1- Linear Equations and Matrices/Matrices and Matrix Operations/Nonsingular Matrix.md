---
id: Nonsingular-Matrix
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Nonsingular Matrix

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Definition: An n×n square matrix A is called nonsingular or invertible if there exists an n×n matrix B such that:

## Key Concepts
 Singular Matrix Uniqueness

## Details / Theory
 Definition: An n×n square matrix A is called nonsingular or invertible if there exists an n×n matrix B such that:
  AB=BA=In​
  The matrix B is called the inverse of A and is denoted by A−1. (Handout 2, Page 12) **Singular Matrix:** If such a matrix B does not exist, A is called **singular** or **noninvertible**. **Uniqueness:** If a matrix has an inverse, its inverse is unique. (Handout 2, Page 13)

### Properties of Inverses

If A and B are nonsingular n×n matrices and k is a non-zero scalar: (Handout 2, Page 14)

1. **Inverse of Inverse:** (A−1)−1=A
2. **Inverse of a Product:** (AB)−1=B−1A−1 (Note the reversal of order)
_**Personal Note:**_ _This is similar to the transpose of a product:_ (AB)⊤=B⊤A⊤*.*

3. **Inverse of a Scalar Multiple:** (kA)−1=k1​A−1
4. **Inverse of a Power:** (Am)−1=(A−1)m, often written as A−m, for non-negative integer m.
5. **Inverse of Transpose:** (A⊤)−1=(A−1)⊤ (Handout 2, Page 15)

### Finding the Inverse (Brief Mention - methods are more complex)
 For a 2×2 matrix A=[a​b c​d​]:
  If ad−bc=0 (this is the [[Determinant of a Matrix|determinant]]), then A is invertible and:
  A−1=ad−bc1​[d​−b −c​a​]
  (Handout 2, Page 12, Example 10 shows this) For larger matrices, methods like [[Gauss-Jordan Elimination]] (using [[Elementary Row Operations]] on an augmented matrix [A∣I] to get [I∣A−1]) are used.

## Common Pitfalls
 "Nonsingular" = "invertible" — they are the same thing. A matrix with a row/column of zeros is always singular ($\det = 0$).

## Summary

> TL;DR — A nonsingular (invertible) matrix has $\det(A) \neq 0$, is row-equivalent to $I$, and gives a unique solution to $A\mathbf{x} = \mathbf{b}$ for every $\mathbf{b}$.

## Review Questions

_To be added._

## Links
 **Related:** - [[Determinant of a Matrix]] - [[Gauss-Jordan Elimination]] - [[Elementary Row Operations]] **Source / Reference:**

## Multiple Choice Questions

1. What defines an $n \times n$ square matrix $A$ as nonsingular or invertible?
    - **A)** Its determinant is exactly zero.
    - **B)** The existence of an $n \times n$ matrix $B$ such that $AB = BA = I_n$.
    - **C)** It contains at least one row entirely of zeros.
    - **D)** It can be factored into two singular matrices.

2. If a matrix does not have an inverse, what is the appropriate mathematical term for it?
    - **A)** Nonsingular
    - **B)** Identity matrix
    - **C)** Singular or noninvertible matrix
    - **D)** Transposed matrix

3. Which of the following statements about the uniqueness of a matrix inverse is true?
    - **A)** A matrix can have infinitely many inverses.
    - **B)** A matrix typically has two inverses, a left and a right inverse.
    - **C)** If a matrix has an inverse, its inverse is unique.
    - **D)** The inverse of a matrix depends on the method used to find it.

4. According to the properties of inverses, what is the inverse of the matrix product $(AB)^{-1}$?
    - **A)** $A^{-1}B^{-1}$
    - **B)** $B^{-1}A^{-1}$
    - **C)** $(BA)^{-1}$
    - **D)** $AB$

5. For an invertible matrix $A$ and a non-zero scalar $k$, what is the expression for the inverse $(kA)^{-1}$?
    - **A)** $k A^{-1}$
    - **B)** $-k A^{-1}$
    - **C)** $\frac{1}{k} A^{-1}$
    - **D)** $A^{-1} / k^2$

6. How does the matrix inverse interact with the transpose operation?
    - **A)** $(A^T)^{-1} = (A^{-1})^T$
    - **B)** $(A^T)^{-1} = A^{-1}$
    - **C)** $(A^T)^{-1} = -A^T$
    - **D)** Transposing a matrix makes it singular.

7. For a $2 \times 2$ matrix $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$, under what condition does the inverse exist?
    - **A)** The determinant $ad - bc$ is equal to zero.
    - **B)** The trace $a + d$ is not equal to zero.
    - **C)** The determinant $ad - bc$ is not equal to zero.
    - **D)** All entries $a, b, c, d$ are non-zero.

8. What is the value of the determinant for a square matrix that contains a row or column entirely of zeros?
    - **A)** 1
    - **B)** 0, meaning the matrix is singular.
    - **C)** It depends on the size of the matrix.
    - **D)** -1

9. In a linear system represented by the equation $A\mathbf{x} = \mathbf{b}$, what does having a nonsingular matrix $A$ guarantee?
    - **A)** A unique solution for $\mathbf{x}$ for every possible vector $\mathbf{b}$.
    - **B)** Infinitely many solutions for $\mathbf{x}$.
    - **C)** No solutions for $\mathbf{x}$.
    - **D)** That $\mathbf{b}$ must be the zero vector.

10. What is a common synonymous term used interchangeably with "nonsingular" in linear algebra?
    - **A)** Symmetric
    - **B)** Singular
    - **C)** Invertible
    - **D)** Orthogonal

### Answer Key & Explanations
1. **B)** A matrix is nonsingular (invertible) if there exists a matrix $B$ such that multiplying them in either order yields the identity matrix $I_n$.
2. **C)** Matrices without an inverse are termed singular or noninvertible.
3. **C)** The theory section explicitly states that if a matrix has an inverse, its inverse is unique.
4. **B)** The inverse of a product reverses the order of the matrices: $(AB)^{-1} = B^{-1}A^{-1}$.
5. **C)** The inverse of a scalar multiple is the reciprocal of the scalar multiplied by the inverse matrix: $(kA)^{-1} = \frac{1}{k}A^{-1}$.
6. **A)** The property states that the inverse of a transpose is equal to the transpose of the inverse: $(A^T)^{-1} = (A^{-1})^T$.
7. **C)** A $2 \times 2$ matrix is invertible if and only if its determinant ($ad - bc$) is not equal to zero.
8. **B)** A matrix with a row or column of zeros always has a determinant of 0, making it singular.
9. **A)** A nonsingular matrix gives a unique solution to the equation $A\mathbf{x} = \mathbf{b}$ for every $\mathbf{b}$.
10. **C)** A common pitfall is not realizing that "nonsingular" and "invertible" mean the exact same thing.

## References & Navigation

- **Previous Topic:** [[Matrix Subtraction (Difference)]]
- **Next Topic:** [[Operations on Matrices]]
- **Related Notes:** [[Lower Triangular Matrix]], [[Identity Matrix]], [[Matrices Detailed]]
