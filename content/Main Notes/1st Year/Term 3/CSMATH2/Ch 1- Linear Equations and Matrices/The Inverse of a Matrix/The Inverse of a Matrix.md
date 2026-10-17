---
id: The-Inverse-of-a-Matrix
type: note
course: CSMATH2
topic: Linear Algebra
status: draft
---

# The Inverse of a Matrix

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Inverse Matrix]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> The inverse of a square matrix $A$ is the matrix $A^{-1}$ such that:

## Key Concepts
 Existence and Uniqueness Properties of Matrix Inverses Example Methods for Computing the Inverse Example

## Details / Theory
 The **inverse** of a square matrix $A$ is the matrix $A^{-1}$ such that:
  $$A \cdot A^{-1} = A^{-1} \cdot A = I$$
  where $I$ is the identity matrix of the same size as $A$.
  (Handout 3, Pages 8-10) **Existence and Uniqueness**:
A matrix is **invertible** (or **nonsingular**) if and only if any of the following equivalent conditions hold:
    1. $\det(A) \neq 0$
    2. $\text{rank}(A) = n$ (where $A$ is an $n \times n$ matrix)
    3. The rows of $A$ form a linearly independent set
    4. The columns of $A$ form a linearly independent set
    5. The homogeneous system $AX = 0$ has only the trivial solution
    6. The linear transformation $T(X) = AX$ is one-to-one (injective) and onto (surjective)
    7. $A$ is row equivalent to the identity matrix $I$
    8. $A$ can be expressed as a product of elementary matrices
If the inverse exists, it is unique.
_**PN:**_ _This collection of equivalent conditions is often called the "Invertible Matrix Theorem" and is one of the most important results in linear algebra._ **Properties of Matrix Inverses**:
  1. $(A^{-1})^{-1} = A$
  2. $(cA)^{-1} = \frac{1}{c}A^{-1}$ for any nonzero scalar $c$
  3. $(AB)^{-1} = B^{-1}A^{-1}$ (Note the order reversal)
  4. $(A^T)^{-1} = (A^{-1})^T$
  5. $\det(A^{-1}) = \frac{1}{\det(A)}$
  6. If $A$ is invertible, then $A^k$ is invertible for any integer $k$, and $(A^k)^{-1} = (A^{-1})^k$
  7. If $A$ is invertible and $A$ is similar to $B$ (i.e., $B = P^{-1}AP$ for some invertible $P$), then $B$ is also invertible
**Example**:
If $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$, then $A^{-1} = \begin{bmatrix} -2 & 1 \\ 1.5 & -0.5 \end{bmatrix}$
Verification: $A \cdot A^{-1} = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} \begin{bmatrix} -2 & 1 \\ 1.5 & -0.5 \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$ **Methods for Computing the Inverse**:
  1. **Gauss-Jordan Elimination Method**:
Form the augmented matrix $[A|I]$
Apply row operations to transform it to $[I|B]$
The matrix $B$ is the inverse of $A$
**Example**:
Start with $\begin{bmatrix} 1 & 2 & | & 1 & 0 \\ 3 & 4 & | & 0 & 1 \end{bmatrix}$
After row operations: $\begin{bmatrix} 1 & 0 & | & -2 & 1 \\ 0 & 1 & | & 1.5 & -0.5 \end{bmatrix}$
Therefore, $A^{-1} = \begin{bmatrix} -2 & 1 \\ 1.5 & -0.5 \end{bmatrix}$

  2. **Adjoint Method**:
Calculate the determinant: $\det(A)$
Find the cofactor matrix $C = [C_{ij}]$ where $C_{ij} = (-1)^{i+j} \times \det(M_{ij})$
       and $M_{ij}$ is the minor obtained by deleting the $i$-th row and $j$-th column of $A$
Compute the adjoint: $\text{adj}(A) = C^T$
The inverse is given by: $A^{-1} = \frac{1}{\det(A)} \cdot \text{adj}(A)$
**Example** for a $2 \times 2$ matrix:
If $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$, then $A^{-1} = \frac{1}{ad-bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$

  3. **Blockwise Inversion** (for partitioned matrices):
If $A = \begin{bmatrix} P & Q \\ R & S \end{bmatrix}$ where $P$ and the Schur complement $S - RP^{-1}Q$ are invertible, then:

     $$A^{-1} = \begin{bmatrix} P^{-1} + P^{-1}Q(S-RP^{-1}Q)^{-1}RP^{-1} & -P^{-1}Q(S-RP^{-1}Q)^{-1} \\ -(S-RP^{-1}Q)^{-1}RP^{-1} & (S-RP^{-1}Q)^{-1} \end{bmatrix}$$
  (Handout 4, Pages 12-15) **Special Cases**:
  1. **Diagonal Matrix**: If $D = \text{diag}(d_1, d_2, \ldots, d_n)$ with all $d_i \neq 0$, then $D^{-1} = \text{diag}(1/d_1, 1/d_2, \ldots, 1/d_n)$
  2. **Triangular Matrix**: If $T$ is an invertible triangular matrix, its inverse is also triangular of the same type
  3. **Orthogonal Matrix**: If $Q$ is orthogonal (i.e., $Q^TQ = I$), then $Q^{-1} = Q^T$
  4. **Idempotent Matrix**: If $A^2 = A \neq 0$, then $A$ is not invertible
  5. **Nilpotent Matrix**: If $A^k = 0$ for some positive integer $k$, then $A$ is not invertible
_**PN:**_ _While direct computation of the inverse is theoretically important, in practice, for solving linear systems, decomposition methods like LU or QR are often more efficient and numerically stable than explicitly computing $A^{-1}$._

## Common Pitfalls
 Not checking if the matrix is invertible before attempting to find the inverse ($\det(A) \neq 0$). Forgetting that $(AB)^{-1} = B^{-1}A^{-1}$ — the order reverses. Non-square matrices do not have a two-sided inverse.

## Summary

> TL;DR — A square matrix $A$ is invertible iff $\det(A) \neq 0$. Compute via Gauss-Jordan ($[A|I] \to [I|A^{-1}]$) or, for $2 \times 2$, the adjugate formula. Product inverses reverse order.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. Which of the following mathematical conditions is equivalent to a square matrix $A$ being invertible (nonsingular)?
- **A)** Its determinant is zero ($\det(A) = 0$).
- **B)** Its determinant is non-zero ($\det(A) \neq 0$).
- **C)** It is a zero matrix.
- **D)** It is not row equivalent to the identity matrix.

2. What is the correct formula for the inverse of a scalar multiple of a matrix, $(cA)^{-1}$, assuming $c \neq 0$?
- **A)** $c A^{-1}$
- **B)** $-c A^{-1}$
- **C)** $\frac{1}{c} A^{-1}$
- **D)** $A^{-1} + c$

3. According to the properties of matrix inverses, what is the inverse of the matrix transpose, $(A^T)^{-1}$?
- **A)** $(A^{-1})^T$
- **B)** $A^T$
- **C)** $I_n$
- **D)** $A^{-1}$

4. If $A$ is an invertible matrix, what is the determinant of its inverse, $\det(A^{-1})$?
- **A)** $-\det(A)$
- **B)** $\det(A)$
- **C)** $1 / \det(A)$
- **D)** $0$

5. In the Gauss-Jordan elimination method for finding the inverse of matrix $A$, what augmented matrix is initially formed before applying row operations?
- **A)** $[A | O]$
- **B)** $[A^T | I]$
- **C)** $[I | A]$
- **D)** $[A | I]$

6. How is the inverse of a $2 \times 2$ matrix $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$ calculated using the Adjoint method?
- **A)** $\frac{1}{ad-bc} \begin{bmatrix} d & c \\ b & a \end{bmatrix}$
- **B)** $\frac{1}{ad-bc} \begin{bmatrix} a & -b \\ -c & d \end{bmatrix}$
- **C)** $\frac{1}{ad-bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$
- **D)** $\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$

7. If $D$ is an invertible diagonal matrix defined as $\text{diag}(d_1, d_2, \ldots, d_n)$, what is its inverse $D^{-1}$?
- **A)** $\text{diag}(-d_1, -d_2, \ldots, -d_n)$
- **B)** $\text{diag}(1/d_1, 1/d_2, \ldots, 1/d_n)$
- **C)** The identity matrix $I_n$
- **D)** It is not invertible.

8. What is the simple formula for the inverse of an orthogonal matrix $Q$, which inherently satisfies $Q^TQ = I$?
- **A)** $Q^{-1} = Q^T$
- **B)** $Q^{-1} = I$
- **C)** $Q^{-1} = -Q$
- **D)** $Q^{-1} = Q^2$

9. According to the "Invertible Matrix Theorem", which of the following guarantees that an $n \times n$ matrix $A$ is invertible?
- **A)** The columns of $A$ form a linearly dependent set.
- **B)** The homogeneous system $AX = 0$ has infinitely many solutions.
- **C)** The homogeneous system $AX = 0$ has only the trivial solution.
- **D)** The matrix has a rank less than $n$.

10. What is a key property regarding the computation of the inverse of a matrix product, $(AB)^{-1}$?
- **A)** The order remains the same: $A^{-1} B^{-1}$
- **B)** The order is reversed: $B^{-1} A^{-1}$
- **C)** It equals the transpose $(AB)^T$
- **D)** It distributes as $A^{-1} + B^{-1}$

### Answer Key & Explanations
1. **B)** The Invertible Matrix Theorem states a matrix is invertible if and only if $\det(A) \neq 0$.
2. **C)** The inverse of a scalar multiple of a matrix is the reciprocal of the scalar times the inverse matrix: $(cA)^{-1} = \frac{1}{c}A^{-1}$.
3. **A)** One of the core properties of inverses is that $(A^T)^{-1} = (A^{-1})^T$.
4. **C)** The determinant of an inverse matrix is exactly the reciprocal of the original matrix's determinant: $\det(A^{-1}) = \frac{1}{\det(A)}$.
5. **D)** Gauss-Jordan elimination begins by augmenting the original matrix $A$ with the identity matrix $I$, forming $[A | I]$.
6. **C)** The $2 \times 2$ adjoint formula swaps the main diagonal, negates the off-diagonal, and divides by the determinant: $\frac{1}{ad-bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$.
7. **B)** The inverse of a diagonal matrix is simply a diagonal matrix where each diagonal entry is the reciprocal of the original.
8. **A)** For an orthogonal matrix where $Q^TQ = I$, the definition of the inverse directly shows that $Q^{-1} = Q^T$.
9. **C)** The Invertible Matrix Theorem lists that $A$ is invertible if the homogeneous system $AX = 0$ has only the trivial solution.
10. **B)** A common pitfall is forgetting that the inverse of a product reverses the order of the matrices: $(AB)^{-1} = B^{-1}A^{-1}$.

## References & Navigation

- **Previous Topic:** [[Zero Matrix]]
- **Next Topic:** [[Determinants]]
- **Related Notes:** [[Matrices Detailed]]
