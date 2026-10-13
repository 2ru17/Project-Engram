---
id: Zero-Matrix
type: note
course: CSMATH2
topic: Linear Algebra
status: draft
---

# Zero Matrix

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> A zero matrix (null matrix) is a matrix in which every entry is $0$. Denoted $O$ or $\mathbf{0}$.

## Key Concepts
 All entries $a_{ij} = 0$ Can be any size: $m \times n$ Acts as the **additive identity**: $A + O = A$ $A \cdot O = O$ and $O \cdot A = O$ (when dimensions are compatible)

## Details / Theory

### Definition

The $m \times n$ zero matrix is:

$$O_{m \times n} = \begin{bmatrix} 0 & 0 & \cdots & 0 \\ 0 & 0 & \cdots & 0 \\ \vdots & \vdots & \ddots & \vdots \\ 0 & 0 & \cdots & 0 \end{bmatrix}$$

### Properties

For matrices $A$ of appropriate dimensions:

| Property               | Expression                       |
| ---------------------- | -------------------------------- |
| Additive identity      | $A + O = O + A = A$              |
| Multiplication by zero | $A \cdot O = O$, $O \cdot A = O$ |
| Scalar multiple        | $0 \cdot A = O$                  |
| Additive inverse       | $A + (-A) = O$                   |

### Important Note

$AB = O$ does **not** imply $A = O$ or $B = O$. Matrix multiplication can produce a zero matrix from two nonzero matrices:

$$\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix} \begin{bmatrix} 0 & 0 \\ 1 & 0 \end{bmatrix} = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$$

## Common Pitfalls
 Assuming $AB = O$ means $A = O$ or $B = O$ — this is false for matrices. Confusing the zero matrix with the zero scalar — the zero matrix has dimensions.

## Summary

> TL;DR — The zero matrix has all entries equal to $0$. It is the additive identity for matrix addition. Unlike real numbers, $AB = O$ does not imply $A$ or $B$ is zero.

## Review Questions

_To be added._

## Links
 **Related:** [[Definition of a Matrix]] — [[Matrix Addition]] — [[Matrix Multiplication]] — [[Types of Matrices]] — [[Special Types of Square Matrices]] **Source / Reference:**

## Multiple Choice Questions

1. What strictly defines a zero matrix (or null matrix)?
    - **A)** A matrix where the determinant is zero.
    - **B)** A matrix in which every single entry is strictly $0$.
    - **C)** A matrix with an equal number of rows and columns.
    - **D)** A matrix with zeros only on the main diagonal.

2. What role does the zero matrix $O$ logically play in matrix addition?
    - **A)** It is the multiplicative inverse.
    - **B)** It makes any matrix it is added to singular.
    - **C)** It acts as the additive identity, meaning $A + O = A$.
    - **D)** It is the additive inverse, meaning $A + O = -A$.

3. If $A$ is a matrix of appropriate dimensions, what is the result of the scalar multiplication $0 \cdot A$?
    - **A)** The identity matrix $I$
    - **B)** The matrix $A$ itself
    - **C)** The scalar number $0$
    - **D)** The zero matrix $O$

4. Is it possible for a zero matrix to have rectangular dimensions (e.g., $m \times n$ where $m \neq n$)?
    - **A)** Yes, a zero matrix can be of any size $m \times n$.
    - **B)** No, a zero matrix must always be a square matrix.
    - **C)** No, it must always be a column vector.
    - **D)** Yes, but only if $m > n$.

5. If the matrix product $AB$ equals the zero matrix $O$, what can be confidently concluded about $A$ and $B$?
    - **A)** Both $A$ and $B$ must be the zero matrix.
    - **B)** At least one of the matrices, $A$ or $B$, must be the zero matrix.
    - **C)** It does not necessarily imply that either $A = O$ or $B = O$.
    - **D)** Matrix $A$ is the inverse of matrix $B$.

6. How is the additive inverse of a matrix $A$ related to the zero matrix?
    - **A)** $A + A^T = O$
    - **B)** $A + A^{-1} = O$
    - **C)** $A - I = O$
    - **D)** $A + (-A) = O$

7. What is considered a common pitfall involving the zero matrix and matrix multiplication?
    - **A)** Assuming $AB = O$ implies $A = O$ or $B = O$, similar to real number arithmetic.
    - **B)** Believing the zero matrix cannot be added to a negative matrix.
    - **C)** Thinking that $O^T$ does not equal $O$.
    - **D)** Multiplying a zero matrix by a scalar.

8. Which of the following operations involving a zero matrix is true, assuming compatible dimensions?
    - **A)** $A \cdot O = A$
    - **B)** $A \cdot O = O$
    - **C)** $A + O = O$
    - **D)** $O \cdot A = A$

9. What specifically differentiates the zero matrix $O$ from the scalar number zero?
    - **A)** The scalar zero has dimensions, while the zero matrix does not.
    - **B)** The zero matrix has specific dimensions (size), while the scalar zero does not.
    - **C)** The scalar zero can only be added to identity matrices.
    - **D)** There is no mathematical difference between them.

10. If $A$ is a non-zero $2 \times 2$ matrix, what is the result of the product $O_{2 \times 2} \cdot A$?
    - **A)** The matrix $A$
    - **B)** The identity matrix $I_{2 \times 2}$
    - **C)** The scalar $0$
    - **D)** The $2 \times 2$ zero matrix $O$

### Answer Key & Explanations
1. **B)** A zero matrix (or null matrix) is strictly defined as a matrix in which every entry is $0$.
2. **C)** The zero matrix acts as the additive identity, which means adding it to any matrix leaves that matrix unchanged ($A + O = A$).
3. **D)** Multiplying any matrix by the scalar $0$ results in the zero matrix, not the scalar number zero.
4. **A)** The zero matrix can be of any size $m \times n$, it does not need to be square.
5. **C)** Unlike real numbers, the zero product property does not hold. $AB = O$ can happen even when both $A$ and $B$ are non-zero matrices.
6. **D)** The additive inverse of a matrix $A$ is $-A$, which when added to $A$ results in the zero matrix ($A + (-A) = O$).
7. **A)** A major pitfall is treating matrices like real numbers and falsely concluding that $AB = O$ means one of the matrices must be zero.
8. **B)** Any matrix multiplied by the zero matrix (with compatible dimensions) results in the zero matrix ($A \cdot O = O$).
9. **B)** A common pitfall is confusing the two; the zero matrix $O$ has a specific shape/dimension ($m \times n$), while the scalar $0$ is just a number.
10. **D)** Multiplying the zero matrix by any compatible matrix results in a zero matrix of the resulting dimensions, in this case, $O_{2 \times 2}$.

## References & Navigation

- **Previous Topic:** [[Upper Triangular Matrix]]
- **Next Topic:** [[The Inverse of a Matrix]]
- **Related Notes:** [[Properties of Matrix Operations]], [[Size & Dimension of a Matrix]], [[Matrices Detailed]]
