---
id: Linear_Algebra_Handout_6_Vectors_in_the_plane
type: note
course: CSMATH2
topic: Linear Algebra_Handout 6 (Vectors in the plane)
status: completed
---

# Linear Algebra_Handout 6 (Vectors in the plane)

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Problem Solving]] #[[CSMATH2]] #[[Linear Algebra]] #[[Mathematics]]

---

## Overview

> This document covers Linear Algebra_Handout 6 (Vectors in the plane), providing mathematical concepts, definitions, and applications relevant to CSMATH2.

## Key Definitions

**Matrix / Vector Operations**: Essential building blocks for linear algebra operations.
**Determinants and Systems**: Core methods to analyze the solutions of linear equations.

## Theoretical Framework

The framework for Linear Algebra_Handout 6 (Vectors in the plane) relies heavily on understanding vector spaces, matrices, and their transformations. Linear equations can be represented as $ Ax = b $, and finding the determinant or employing Gaussian elimination allows us to understand the properties of these structures.

## Important Formulas

Matrix Multiplication: $ C_{ij} = \sum_{k=1}^n A_{ik} B_{kj} $
Determinant of a 2x2 matrix: $ \det(A) = ad - bc $
Inverse of a 2x2 matrix: $ A^{-1} = \frac{1}{\det(A)} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix} $

## Worked Examples

**Example 1: Computing a Determinant**
Find the determinant of:
$$ A = \begin{pmatrix} 2 & 1 \\ 3 & 4 \end{pmatrix} $$
Solution:
$ \det(A) = (2)(4) - (1)(3) = 8 - 3 = 5 $

**Example 2: Matrix Addition**
Let $ A = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix} $ and $ B = \begin{pmatrix} 5 & 6 \\ 7 & 8 \end{pmatrix} $.
Solution:
$ A + B = \begin{pmatrix} 6 & 8 \\ 10 & 12 \end{pmatrix} $

## Multiple Choice Questions

1. What formula is provided in the document for computing the inverse of a $2 \times 2$ matrix $A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}$?
    - **A)** $A^{-1} = \frac{1}{\det(A)} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$
    - **B)** $A^{-1} = \det(A) \begin{pmatrix} d & b \\ c & a \end{pmatrix}$
    - **C)** $A^{-1} = \begin{pmatrix} a & c \\ b & d \end{pmatrix}$
    - **D)** $A^{-1} = \frac{1}{ad+bc} \begin{pmatrix} a & -b \\ -c & d \end{pmatrix}$

2. Based on the worked Example 1, what is the computed determinant of the matrix $A = \begin{pmatrix} 2 & 1 \\ 3 & 4 \end{pmatrix}$?
    - **A)** $11$
    - **B)** $-5$
    - **C)** $5$
    - **D)** $8$

3. According to the provided theoretical framework, analyzing linear equations and their solutions relies heavily on understanding which core concepts?
    - **A)** Probability and statistical variances.
    - **B)** Vector spaces, matrices, and their transformations.
    - **C)** Complex numbers and imaginary roots.
    - **D)** Differential equations and integrals.

### Answer Key & Explanations

1. **A**. The document explicitly lists the inverse formula for a $2 \times 2$ matrix as $A^{-1} = \frac{1}{\det(A)} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}$.
2. **C**. The worked example shows the step-by-step calculation: $\det(A) = (2)(4) - (1)(3) = 8 - 3 = 5$.
3. **B**. The theoretical framework states it relies heavily on understanding vector spaces, matrices, and their transformations to solve equations like $Ax = b$.

## References & Navigation

- **Previous Topic:** [[Vectors in R3]]
- **Related Notes:** [[Vectors in R3]]
