---
id: Operations-on-Matrices
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Operations on Matrices

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Matrix operations define how matrices can be combined or transformed. The fundamental operations are addition, subtraction, scalar multiplication, matrix multiplication, and transposition.

## Key Concepts
 **Addition/Subtraction:** Requires matrices of the same size **Scalar multiplication:** Multiply every entry by a constant **Matrix multiplication:** $A_{m \times n} \cdot B_{n \times p} = C_{m \times p}$ (inner dimensions must match) **Transpose:** Swap rows and columns

## Details / Theory

### Summary of Operations

| Operation                                                       | Requirement               | Result Size  |
| --------------------------------------------------------------- | ------------------------- | ------------ |
| [[Matrix Addition]] $A + B$                                     | Same size $m \times n$    | $m \times n$ |
| [[Matrix Subtraction (Difference)\|Matrix Subtraction]] $A - B$ | Same size $m \times n$    | $m \times n$ |
| [[Scalar Multiplication]] $kA$                                  | Any matrix                | Same as $A$  |
| [[Matrix Multiplication]] $AB$                                  | Cols of $A$ = Rows of $B$ | $m \times p$ |
| [[Transpose of a Matrix\|Transpose]] $A^T$                      | Any matrix                | $n \times m$ |

### Key Properties
 Addition is **commutative**: $A + B = B + A$ Multiplication is **not commutative**: $AB \neq BA$ in general Multiplication is **associative**: $(AB)C = A(BC)$ **Distributive**: $A(B + C) = AB + AC$ $(AB)^T = B^T A^T$ (reverse order!)

### Important Warnings

1. $AB = AC$ does **not** imply $B = C$ (no cancellation law in general)
2. $AB = O$ does **not** imply $A = O$ or $B = O$
3. $(A + B)^2 \neq A^2 + 2AB + B^2$ unless $AB = BA$

## Common Pitfalls
 Attempting to add matrices of different sizes. Assuming matrix multiplication is commutative. Forgetting the transpose reverses order of products: $(AB)^T = B^T A^T$.

## Summary

> TL;DR — The five core matrix operations are addition, subtraction, scalar multiplication, matrix multiplication, and transpose. Addition is commutative; multiplication is not. Watch dimension requirements.

## Links
 **Related:** [[Matrix Addition]] — [[Matrix Subtraction (Difference)]] — [[Scalar Multiplication]] — [[Matrix Multiplication]] — [[Transpose of a Matrix]] — [[Properties of Matrix Operations]] — [[Matrices and Matrix Operations]] **Source / Reference:**

## Multiple Choice Questions

1. Which of the following operations strictly requires the involved matrices to have the exact same dimensions?
    - **A)** Matrix Multiplication and Transpose
    - **B)** Matrix Addition and Subtraction
    - **C)** Scalar Multiplication and Matrix Addition
    - **D)** Matrix Subtraction and Multiplication

2. What is the primary dimensional requirement for standard matrix multiplication $A \cdot B$?
    - **A)** The number of rows in $A$ must equal the number of columns in $B$.
    - **B)** The number of columns in $A$ must equal the number of rows in $B$.
    - **C)** Both $A$ and $B$ must be square matrices of the exact same size.
    - **D)** The number of rows in $A$ must equal the number of rows in $B$.

3. If $A$ is an $m \times n$ matrix, what will be the dimensions of its transpose $A^T$?
    - **A)** $m \times m$
    - **B)** $n \times n$
    - **C)** $m \times n$
    - **D)** $n \times m$

4. Which of the following fundamental matrix operations is generally commutative?
    - **A)** Matrix Multiplication
    - **B)** Matrix Division
    - **C)** Matrix Addition
    - **D)** Matrix Transposition

5. According to the distributive property for matrices, what does $A(B + C)$ equal?
    - **A)** $AB + C$
    - **B)** $A + BC$
    - **C)** $AB + AC$
    - **D)** $BA + CA$

6. What is the correct property for expanding the transpose of a matrix product, $(AB)^T$?
    - **A)** $A^T B^T$
    - **B)** $B^T A^T$
    - **C)** $A B^T$
    - **D)** $(BA)^T$

7. Under what specific condition does the binomial expansion $(A+B)^2 = A^2 + 2AB + B^2$ hold true for matrices?
    - **A)** Only if both $A$ and $B$ are identity matrices.
    - **B)** It holds true for all square matrices.
    - **C)** Only if $A$ and $B$ commute, meaning $AB = BA$.
    - **D)** Only if $A$ and $B$ are the exact same matrix.

8. Which operation involves multiplying every single entry of a matrix by the same constant value?
    - **A)** Matrix Multiplication
    - **B)** Scalar Multiplication
    - **C)** Matrix Trace
    - **D)** Cross Product

9. If $AB = AC$, what does this imply in general matrix algebra?
    - **A)** $B = C$ definitively.
    - **B)** Matrix $A$ is the identity matrix.
    - **C)** It does not necessarily imply anything about the equality of $B$ and $C$ because there is no cancellation law.
    - **D)** Both $B$ and $C$ must be the zero matrix.

10. What does the matrix equation $AB = O$ (the zero matrix) mean in linear algebra?
    - **A)** Either matrix $A$ or matrix $B$ must be the zero matrix.
    - **B)** The product is the zero matrix, but neither $A$ nor $B$ must necessarily be the zero matrix.
    - **C)** Both $A$ and $B$ must be the zero matrix.
    - **D)** Matrix $A$ is the inverse of matrix $B$.

### Answer Key & Explanations

1. **B**. Matrix addition and subtraction can only be performed on matrices of identical size.
2. **B**. The inner dimensions must match: an $m \times n$ matrix multiplied by an $n \times p$ matrix is valid because the columns of $A$ equal the rows of $B$.
3. **D**. Transposing a matrix swaps its rows and columns, turning an $m \times n$ matrix into an $n \times m$ matrix.
4. **C**. While matrix multiplication is not commutative ($AB \neq BA$), matrix addition is commutative ($A + B = B + A$).
5. **C**. Matrix multiplication distributes over addition: $A(B + C) = AB + AC$.
6. **B**. A very common pitfall to avoid is forgetting that the transpose of a product reverses the order: $(AB)^T = B^T A^T$.
7. **C**. Because matrix multiplication is not commutative, $(A+B)^2 = (A+B)(A+B) = A^2 + AB + BA + B^2$. It only simplifies to $A^2 + 2AB + B^2$ if $AB = BA$.
8. **B**. Scalar multiplication is defined as multiplying every individual entry in the matrix by a scalar constant.
9. **C**. A key warning in the notes is that the cancellation law does not hold for matrices. $AB = AC$ does not imply $B = C$.
10. **B**. Unlike real numbers, the zero product property does not hold. $AB = O$ can occur even if $A \neq O$ and $B \neq O$.

## References & Navigation

- **Previous Topic:** [[Nonsingular Matrix]]
- **Next Topic:** [[Polynomial in a Matrix]]
- **Related Notes:** [[Polynomial in a Matrix]], [[Elementary Row Operation]], [[Matrices Detailed]]
