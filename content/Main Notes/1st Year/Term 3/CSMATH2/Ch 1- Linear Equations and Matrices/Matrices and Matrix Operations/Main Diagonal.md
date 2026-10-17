---
id: Main-Diagonal
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Main Diagonal

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Definition: If A=[aij​] is a Square Matrix of order n, the entries aij​ where i=j are called the main diagonal entries of the matrix. These are a11...

## Key Concepts
 Definition Example

## Details / Theory
 **Definition:** If A=[aij​] is a [[Square Matrix]] of order n, the entries aij​ where i=j are called the **main diagonal entries** of the matrix. These are a11​,a22​,…,ann​. (Handout 2, Page 2) **Example:** For A=[2​1​0​3 −1​4​2​−2 10​5​3​0 0​1​7​1​], the main diagonal entries are 2, 4, 3, and 1. (Handout 2, Page 2, modified example value)
_**Personal Note:**_ _The main diagonal runs from the top-left corner to the bottom-right corner._

## Common Pitfalls
 The main diagonal only exists meaningfully in square matrices for some operations (trace, determinant), but any matrix has entries $a_{ii}$. Diagonal entries are $a_{11}, a_{22}, \ldots, a_{kk}$ where $k = \min(m, n)$.

## Summary

> TL;DR — The main diagonal consists of entries $a_{ii}$. It determines the trace, and is central to diagonal, triangular, and identity matrices.

## Review Questions

_To be added._

## Links
 **Related:** - [[Square Matrix]] **Source / Reference:**

## Multiple Choice Questions

1. In a square matrix $A = [a_{ij}]$ of order $n$, how are the main diagonal entries defined?
- **A)** The entries where $i > j$.
- **B)** The entries where $i < j$.
- **C)** The entries where $i = j$.
- **D)** The entries in the first row and first column only.

2. In a standard visual representation of a matrix, which direction does the main diagonal run?
- **A)** From the top-right corner to the bottom-left corner.
- **B)** From the top-left corner to the bottom-right corner.
- **C)** Horizontally across the middle row.
- **D)** Vertically down the middle column.

3. Which of the following describes a common pitfall related to the main diagonal?
- **A)** Attempting to find main diagonal entries in matrices that are not square.
- **B)** Believing the main diagonal exists meaningfully for determinant operations in non-square matrices.
- **C)** Assuming the main diagonal entries must all be equal to 1.
- **D)** Thinking the main diagonal only applies to identity matrices.

### Answer Key & Explanations
1. **C)** By definition, the main diagonal entries of a square matrix are those where the row index equals the column index ($i = j$).
2. **B)** As noted, the main diagonal runs from the top-left corner ($a_{11}$) to the bottom-right corner ($a_{nn}$).
3. **B)** A common pitfall is that the main diagonal only exists meaningfully in square matrices for operations like the trace or determinant, even though any matrix technically has $a_{ii}$ entries.

## References & Navigation

- **Previous Topic:** [[Lower Triangular Matrix]]
- **Next Topic:** [[Matrices and Matrix Operations]]
- **Related Notes:** [[Matrix Multiplication]], [[Definition of a Matrix]]
