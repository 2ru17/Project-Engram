---
id: Definition-of-a-Matrix
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Definition of a Matrix

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> A matrix A is a rectangular array of real numbers, formally written as:

## Details / Theory
 A matrix A is a rectangular array of real numbers, formally written as:
  $$
  A=\begin{bmatrix}
  a_{11} & a_{12} & \cdots & a_{1n} \\
  a_{21} & a_{22} & \cdots & a_{2n} \\
  \vdots & \vdots & \ddots & \vdots \\
  a_{m1} & a_{m2} & \cdots & a_{mn}
  \end{bmatrix}=[a_{ij}]
  $$
  (Handout 1, Page 3) The numbers $a_{ij}$ are called **entries** or **elements** of A. $a_{ij}$ refers to the **(i, j) entry**, located at the i-th row and j-th column. (Handout 1, Page 3)
_**PN:**_ _Remember the convention: row index first ($i$), column index second ($j$). This is crucial for indexing and operations._

## Common Pitfalls
 Confusing row index and column index — always row first ($i$), column second ($j$). Referring to $a_{ij}$ as "column $i$, row $j$" — it's the opposite.

## Summary

> TL;DR — A matrix is a rectangular array of real numbers. Entry $a_{ij}$ is at row $i$, column $j$. Convention: row index always comes first.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. In matrix notation, what does the entry $a_{ij}$ represent?
- **A)** The entry located at the $j$-th row and $i$-th column.
- **B)** The entry located at the $i$-th row and $j$-th column.
- **C)** The product of the $i$-th row and the $j$-th column.
- **D)** A matrix with $i$ rows and $j$ columns.

2. What is the fundamental definition of a matrix $A$?
- **A)** A scalar value representing the area of a rectangle.
- **B)** A single row of variables in a linear equation.
- **C)** A square array containing only binary numbers.
- **D)** A rectangular array of real numbers.

3. Which of the following is a common pitfall when interpreting matrix index notation?
- **A)** Always assuming the row index comes first.
- **B)** Using the letter $i$ for columns and $j$ for rows.
- **C)** Referring to $a_{ij}$ as "column $i$, row $j$".
- **D)** Using bold letters to denote the matrix entries.

### Answer Key & Explanations
1. **B)** The notation $a_{ij}$ refers to the $(i, j)$ entry, which is located at the $i$-th row and $j$-th column.
2. **D)** A matrix $A$ is formally defined as a rectangular array of real numbers.
3. **C)** A common pitfall is confusing the index order, specifically referring to $a_{ij}$ as "column $i$, row $j$" instead of the correct row-first convention.

## References & Navigation

- **Previous Topic:** [[Column Matrix]]
- **Next Topic:** [[Diagonal Matrix]]
- **Related Notes:** [[Elementary Matrices]], [[Properties of Matrix Operations]], [[Matrices Detailed]]
