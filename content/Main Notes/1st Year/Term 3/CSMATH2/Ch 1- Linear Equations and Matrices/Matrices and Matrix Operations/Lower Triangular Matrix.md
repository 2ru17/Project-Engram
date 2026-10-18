---
id: Lower-Triangular-Matrix
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Lower Triangular Matrix

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Square Matrix]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> A lower triangular matrix is a square matrix where all entries **above** the main diagonal are zero.

## Key Concepts
 $a_{ij} = 0$ for all $i < j$ The main diagonal and entries below it can be nonzero Product of lower triangular matrices is lower triangular Determinant = product of diagonal entries

## Details / Theory

### Definition

A square matrix $A = [a_{ij}]$ of size $n \times n$ is lower triangular if:

$$a_{ij} = 0 \quad \text{for all } i < j$$

### Example

$$L = \begin{bmatrix} 4 & 0 & 0 \\ 2 & -3 & 0 \\ 1 & 5 & 6 \end{bmatrix}$$

All entries above the main diagonal are zero.

### Properties

| Property                    | Result                                        |
| --------------------------- | --------------------------------------------- |
| Product of lower triangular | Lower triangular                              |
| Sum of lower triangular     | Lower triangular                              |
| Inverse (if exists)         | Lower triangular                              |
| Determinant                 | $\det(L) = l_{11} \cdot l_{22} \cdots l_{nn}$ |
| Transpose                   | [[Upper Triangular Matrix]]                   |

### LU Decomposition

Many numerical methods decompose $A = LU$ where $L$ is lower triangular and $U$ is upper triangular. This enables efficient solving of $A\mathbf{x} = \mathbf{b}$ via forward and back substitution.

## Common Pitfalls
 Confusing lower and upper triangular — lower has zeros **above** the diagonal. A matrix that is both upper and lower triangular is a [[Diagonal Matrix]].

## Summary

> TL;DR — Lower triangular matrix: all entries above the main diagonal are zero. Determinant = product of diagonal entries. Transpose of lower triangular is upper triangular.

## Links
 **Related:** [[Upper Triangular Matrix]] — [[Triangular Matrices]] — [[Square Matrix]] — [[Main Diagonal]] — [[Special Types of Square Matrices]] — [[Diagonal Matrix]] **Source / Reference:**

## Multiple Choice Questions

1. What defines a lower triangular matrix?
    - **A)** All entries below the main diagonal are zero.
    - **B)** All entries on the main diagonal are zero.
    - **C)** All entries above the main diagonal are zero.
    - **D)** The matrix is entirely composed of zeros.

2. Using index notation $a_{ij}$, how is a lower triangular matrix formally described?
    - **A)** $a_{ij} = 0$ for all $i > j$
    - **B)** $a_{ij} = 0$ for all $i < j$
    - **C)** $a_{ij} = 0$ for all $i = j$
    - **D)** $a_{ij} \neq 0$ for all $i < j$

3. How is the determinant of a lower triangular matrix $L$ calculated?
    - **A)** By taking the sum of the main diagonal entries.
    - **B)** By calculating the product of the non-zero off-diagonal entries.
    - **C)** By multiplying its main diagonal entries ($l_{11} \cdot l_{22} \cdots l_{nn}$).
    - **D)** The determinant is always zero.

4. What is the result of multiplying two lower triangular matrices?
    - **A)** An upper triangular matrix.
    - **B)** A diagonal matrix.
    - **C)** An identity matrix.
    - **D)** A lower triangular matrix.

5. Taking the transpose of a lower triangular matrix yields which type of matrix?
    - **A)** A lower triangular matrix.
    - **B)** A diagonal matrix.
    - **C)** An upper triangular matrix.
    - **D)** A symmetric matrix.

6. In the context of LU decomposition, what does the matrix $L$ represent?
    - **A)** A Linear combination matrix
    - **B)** A Lower triangular matrix
    - **C)** A Lateral augmented matrix
    - **D)** A Length-normalized matrix

7. What type of matrix is both lower triangular and upper triangular?
    - **A)** A scalar matrix only.
    - **B)** An identity matrix only.
    - **C)** A diagonal matrix.
    - **D)** A symmetric matrix.

8. Which entries of a lower triangular matrix are permitted to be non-zero?
    - **A)** Only the entries strictly below the main diagonal.
    - **B)** The entries on and below the main diagonal.
    - **C)** Only the main diagonal entries.
    - **D)** The entries on and above the main diagonal.

9. What is mentioned as a common pitfall when identifying triangular matrices?
    - **A)** Assuming triangular matrices must be invertible.
    - **B)** Confusing lower and upper triangular by thinking lower has zeros below the diagonal.
    - **C)** Forgetting that the diagonal must contain only ones.
    - **D)** Believing non-square matrices can be lower triangular.

10. If a lower triangular matrix is invertible, what form does its inverse take?
    - **A)** It is an upper triangular matrix.
    - **B)** It is a diagonal matrix.
    - **C)** It is also a lower triangular matrix.
    - **D)** It is a symmetric matrix.

### Answer Key & Explanations

1. **C**. A lower triangular matrix is defined as a square matrix where all entries above the main diagonal are zero.
2. **B**. In formal notation, a matrix is lower triangular if $a_{ij} = 0$ for all $i < j$ (where the row index is strictly less than the column index).
3. **C**. The determinant of a lower triangular matrix is simply the product of its diagonal entries.
4. **D**. A key property is that the product of lower triangular matrices remains a lower triangular matrix.
5. **C**. The transpose of a lower triangular matrix flips the non-zero entries across the diagonal, resulting in an upper triangular matrix.
6. **B**. In LU decomposition ($A = LU$), the $L$ stands for a lower triangular matrix.
7. **C**. If a matrix has zeros both above and below the main diagonal, it is a diagonal matrix.
8. **B**. The main diagonal and entries below it can be nonzero, while entries above must be zero.
9. **B**. A common pitfall is confusing the terminology and incorrectly thinking a lower triangular matrix means zeros are in the lower portion (below the diagonal).
10. **C**. An important property is that the inverse of a lower triangular matrix (if it exists) is also lower triangular.

## References & Navigation

- **Previous Topic:** [[Inverse of a Matrix]]
- **Next Topic:** [[Main Diagonal]]
- **Related Notes:** [[Trace of a Matrix]], [[Symmetric Matrix]], [[Matrices Detailed]]
