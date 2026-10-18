---
id: Upper-Triangular-Matrix
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Upper Triangular Matrix

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Square Matrix]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> An upper triangular matrix is a square matrix where all entries **below** the main diagonal are zero.

## Key Concepts
 $a_{ij} = 0$ for all $i > j$ The main diagonal and entries above it can be nonzero Product of upper triangular matrices is upper triangular Determinant = product of diagonal entries

## Details / Theory

### Definition

A square matrix $A = [a_{ij}]$ of size $n \times n$ is upper triangular if:

$$a_{ij} = 0 \quad \text{for all } i > j$$

### Example

$$U = \begin{bmatrix} 2 & 3 & 1 \\ 0 & -1 & 4 \\ 0 & 0 & 5 \end{bmatrix}$$

All entries below the main diagonal are zero.

### Properties

| Property                    | Result                                        |
| --------------------------- | --------------------------------------------- |
| Product of upper triangular | Upper triangular                              |
| Sum of upper triangular     | Upper triangular                              |
| Inverse (if exists)         | Upper triangular                              |
| Determinant                 | $\det(U) = u_{11} \cdot u_{22} \cdots u_{nn}$ |
| Transpose                   | [[Lower Triangular Matrix]]                   |

### Relationship to Row Echelon Form

Gaussian elimination transforms a matrix into an upper triangular form (row echelon form), which simplifies solving $A\mathbf{x} = \mathbf{b}$ via back substitution.

## Common Pitfalls
 Confusing upper and lower triangular — upper has zeros **below** the diagonal. Diagonal entries can be zero (but then the matrix is singular).

## Summary

> TL;DR — Upper triangular matrix: all entries below the main diagonal are zero. Its determinant is the product of diagonal entries. Transpose of upper triangular is lower triangular.

## Links
 **Related:** [[Lower Triangular Matrix]] — [[Triangular Matrices]] — [[Square Matrix]] — [[Main Diagonal]] — [[Special Types of Square Matrices]] — [[Diagonal Matrix]] **Source / Reference:**

## Multiple Choice Questions

1. What strictly defines a matrix as an upper triangular matrix?
    - **A)** All entries on the main diagonal are zero.
    - **B)** All entries strictly below the main diagonal are zero.
    - **C)** All entries strictly above the main diagonal are zero.
    - **D)** All non-zero entries are positive.

2. For an upper triangular matrix $U = [a_{ij}]$, what is the formal index condition for the zero entries?
    - **A)** $a_{ij} = 0$ for all $i < j$
    - **B)** $a_{ij} = 0$ for all $i = j$
    - **C)** $a_{ij} = 0$ for all $i > j$
    - **D)** $a_{ij} \neq 0$ for all $i > j$

3. In an upper triangular matrix, what is the rule regarding the entries on or above the main diagonal?
    - **A)** They must all be exactly one.
    - **B)** They must all be strictly non-zero.
    - **C)** They can be either zero or nonzero.
    - **D)** They must be negative.

4. What is the resulting matrix type when multiplying two upper triangular matrices together?
    - **A)** A lower triangular matrix.
    - **B)** A diagonal matrix.
    - **C)** An identity matrix.
    - **D)** An upper triangular matrix.

5. How do you easily calculate the determinant of an upper triangular matrix?
    - **A)** By calculating the sum of the main diagonal entries.
    - **B)** By calculating the trace of the matrix.
    - **C)** By multiplying all the entries on its main diagonal.
    - **D)** The determinant is always zero.

6. Taking the transpose of an upper triangular matrix yields what kind of matrix?
    - **A)** A lower triangular matrix.
    - **B)** A diagonal matrix.
    - **C)** A symmetric matrix.
    - **D)** Another upper triangular matrix.

7. Gaussian elimination transforms a matrix into an upper triangular form to simplify solving equations. What is another common name for this resulting upper triangular form?
    - **A)** Reduced Column Echelon Form
    - **B)** Row Echelon Form
    - **C)** Normal Form
    - **D)** Diagonal Form

8. If an upper triangular matrix contains a zero on its main diagonal, what must be mathematically true about the matrix?
    - **A)** It is an identity matrix.
    - **B)** It is an invertible matrix.
    - **C)** It is a singular (non-invertible) matrix.
    - **D)** It is a skew-symmetric matrix.

9. Which of the following operations preserves the upper triangular property of matrices?
    - **A)** Matrix addition of two upper triangular matrices.
    - **B)** Taking the transpose of the matrix.
    - **C)** Multiplying by a lower triangular matrix.
    - **D)** Swapping the first two rows.

10. What is a common pitfall when identifying an upper triangular matrix?
    - **A)** Mistakenly thinking that "upper" means the zeros are located above the diagonal.
    - **B)** Assuming it must be a non-square matrix.
    - **C)** Thinking the determinant cannot be computed.
    - **D)** Believing all diagonal entries must be non-zero.

### Answer Key & Explanations

1. **B**. An upper triangular matrix is defined as a square matrix where all entries below the main diagonal are zero.
2. **C**. The mathematical condition is that $a_{ij} = 0$ for all indices where the row number is strictly greater than the column number ($i > j$).
3. **C**. The definition only restricts the entries below the diagonal; the entries on or above it can be zero or nonzero.
4. **D**. A key property is that the product of upper triangular matrices remains an upper triangular matrix.
5. **C**. The determinant of any triangular matrix is simply the product of its main diagonal entries ($\det(U) = u_{11} \cdot u_{22} \cdots u_{nn}$).
6. **A**. The transpose operation swaps rows and columns, moving the non-zero upper elements to the lower half, creating a lower triangular matrix.
7. **B**. Transforming a matrix into an upper triangular form is standard in Gaussian elimination to reach Row Echelon Form.
8. **C**. Because the determinant is the product of the diagonal entries, a zero on the diagonal makes the determinant zero, meaning the matrix is singular.
9. **A**. Adding two upper triangular matrices yields another upper triangular matrix.
10. **A**. A common pitfall is confusing the name; "upper" triangular means the non-zero entries are in the upper portion, so the zeros are BELOW the diagonal.

## References & Navigation

- **Previous Topic:** [[Types of Matrices]]
- **Next Topic:** [[Zero Matrix]]
- **Related Notes:** [[Main Diagonal]], [[Definition of a Matrix]], [[Matrices Detailed]]
