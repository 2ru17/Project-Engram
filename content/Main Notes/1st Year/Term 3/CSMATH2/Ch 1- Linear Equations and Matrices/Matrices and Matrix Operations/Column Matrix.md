---
id: Column-Matrix
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Column Matrix

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Vectors]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> A column matrix (column vector) is a matrix with exactly one column and $m$ rows, i.e., an $m \times 1$ matrix.

## Key Concepts
 Dimensions: $m \times 1$ Represents a vector in $\mathbb{R}^m$ Used in matrix-vector multiplication $A\mathbf{x} = \mathbf{b}$ Transpose of a column matrix is a [[Row Matrix]]

## Details / Theory

### Definition

A column matrix has the form:

$$\mathbf{v} = \begin{bmatrix} v_1 \\ v_2 \\ \vdots \\ v_m \end{bmatrix}$$

where $v_i \in \mathbb{R}$ for $i = 1, 2, \ldots, m$.

### Notation
 Often denoted with bold lowercase: $\mathbf{v}$, $\mathbf{x}$, $\mathbf{b}$ In systems of equations, the solution vector and constant vector are column matrices

### Example

$$\mathbf{x} = \begin{bmatrix} 3 \\ -1 \\ 7 \end{bmatrix}$$

This is a $3 \times 1$ column matrix (a vector in $\mathbb{R}^3$).

### Relationship to Row Matrix

If $\mathbf{v}$ is a column matrix, then $\mathbf{v}^T$ is a [[Row Matrix]]:

$$\begin{bmatrix} 3 \\ -1 \\ 7 \end{bmatrix}^T = \begin{bmatrix} 3 & -1 & 7 \end{bmatrix}$$

## Common Pitfalls
 Confusing $m \times 1$ (column) with $1 \times n$ (row) — dimensions are rows × columns. Forgetting that a column vector and row vector with the same entries are NOT equal as matrices.

## Summary

> TL;DR — A column matrix is an $m \times 1$ matrix representing a vector. Its transpose is a row matrix. Column vectors are fundamental in linear systems $A\mathbf{x} = \mathbf{b}$.

## Links
 **Related:** [[Row Matrix]] — [[Definition of a Matrix]] — [[Size & Dimension of a Matrix]] — [[Transpose of a Matrix]] — [[Types of Matrices]] **Source / Reference:**

## Multiple Choice Questions

1. What are the dimensions of a column matrix with $m$ rows?
    - **A)** $m \times m$
    - **B)** $1 \times m$
    - **C)** $m \times 1$
    - **D)** $1 \times 1$

2. What is the result of taking the transpose of a column matrix?
    - **A)** A scalar
    - **B)** A square matrix
    - **C)** A row matrix
    - **D)** An identity matrix

3. Which of the following statements about a column matrix and a row matrix with identical entries is true?
    - **A)** They are equal as matrices.
    - **B)** They represent the exact same vector in all mathematical contexts.
    - **C)** They are not equal as matrices due to different dimensions.
    - **D)** They can be added together without any transformations.

### Answer Key & Explanations

1. **C**. A column matrix (column vector) is defined as a matrix with exactly one column and $m$ rows, denoted as an $m \times 1$ matrix.
2. **C**. The relationship between column and row matrices states that if $\mathbf{v}$ is a column matrix, then its transpose $\mathbf{v}^T$ is a row matrix.
3. **C**. A common pitfall is forgetting that a column vector and row vector with the same entries are NOT equal as matrices because they have different dimensions (rows × columns).

## References & Navigation

- **Next Topic:** [[Definition of a Matrix]]
- **Related Notes:** [[Properties of Matrix Operations]], [[Trace of a Matrix]], [[Matrices Detailed]]
