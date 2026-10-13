---
id: Row-Matrix
type: note
course: CSMATH2
topic: Linear Algebra
status: draft
---

# Row Matrix

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Vectors]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> A row matrix (row vector) is a matrix with exactly one row and $n$ columns, i.e., a $1 \times n$ matrix.

## Key Concepts
 Dimensions: $1 \times n$ Represents a vector in $\mathbb{R}^n$ written horizontally Transpose of a row matrix is a [[Column Matrix]] Used in dot product computations

## Details / Theory

### Definition

A row matrix has the form:

$$\mathbf{v}^T = \begin{bmatrix} v_1 & v_2 & \cdots & v_n \end{bmatrix}$$

where $v_j \in \mathbb{R}$ for $j = 1, 2, \ldots, n$.

### Example

$$\mathbf{r} = \begin{bmatrix} 2 & -5 & 0 & 4 \end{bmatrix}$$

This is a $1 \times 4$ row matrix.

### Dot Product as Row × Column

The dot product of two vectors can be expressed as a row matrix times a column matrix:

$$\mathbf{u} \cdot \mathbf{v} = \mathbf{u}^T \mathbf{v} = \begin{bmatrix} u_1 & u_2 & u_3 \end{bmatrix} \begin{bmatrix} v_1 \\ v_2 \\ v_3 \end{bmatrix} = u_1 v_1 + u_2 v_2 + u_3 v_3$$

### Relationship to Column Matrix

$\mathbf{r}^T$ converts a row matrix to a [[Column Matrix]] and vice versa.

## Common Pitfalls
 Confusing $1 \times n$ (row) with $n \times 1$ (column) — order matters. Attempting to add a row matrix and column matrix of the same number of entries — dimensions don't match.

## Summary

> TL;DR — A row matrix is a $1 \times n$ matrix (one row, $n$ columns). Its transpose is a column matrix. Row-times-column multiplication yields the dot product.

## Review Questions

_To be added._

## Links
 **Related:** [[Column Matrix]] — [[Definition of a Matrix]] — [[Size & Dimension of a Matrix]] — [[Transpose of a Matrix]] — [[Types of Matrices]] **Source / Reference:**

## Multiple Choice Questions

1. What are the formal dimensions of a row matrix?
    - **A)** $n \times 1$
    - **B)** $n \times n$
    - **C)** $1 \times n$
    - **D)** $1 \times 1$

2. What is the result of taking the transpose of a row matrix?
    - **A)** An identity matrix.
    - **B)** A scalar value.
    - **C)** A column matrix.
    - **D)** Another row matrix.

3. In matrix multiplication, what does a $1 \times n$ row matrix multiplied by an $n \times 1$ column matrix yield?
    - **A)** A scalar, representing the dot product of the two vectors.
    - **B)** An $n \times n$ square matrix.
    - **C)** A zero matrix.
    - **D)** A new row matrix.

### Answer Key & Explanations
1. **C)** A row matrix (or row vector) is defined as a matrix with exactly one row and $n$ columns, making it a $1 \times n$ matrix.
2. **C)** The relationship section specifies that taking the transpose $\mathbf{r}^T$ converts a row matrix into a column matrix.
3. **A)** Multiplying a row matrix by a column matrix (where the inner dimensions $n$ match) yields a $1 \times 1$ matrix, which is effectively a scalar representing the dot product.

## References & Navigation

- **Previous Topic:** [[Properties of Matrix Operations]]
- **Next Topic:** [[Scalar Matrix]]
- **Related Notes:** [[Important Remarks]], [[Scalar Multiplication]], [[Matrices Detailed]]
