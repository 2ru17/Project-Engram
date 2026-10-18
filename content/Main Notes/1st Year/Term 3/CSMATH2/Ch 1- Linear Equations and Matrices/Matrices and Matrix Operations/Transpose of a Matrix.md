---
id: Transpose-of-a-Matrix
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Transpose of a Matrix

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Definition: The transpose of an $m \times n$ matrix $A=[a_{ij}]$, denoted $A^T$, is the $n \times m$ matrix obtained by interchanging the rows and ...

## Key Concepts
 Definition Example

## Details / Theory
 **Definition:** The transpose of an $m \times n$ matrix $A=[a_{ij}]$, denoted $A^T$, is the $n \times m$ matrix obtained by interchanging the rows and columns of $A$. If $A^T=[a'_{ij}]$, then $a'_{ij}=a_{ji}$. (Handout 1, Page 27)
_**PN:**_ _Think of it as "flipping" the matrix across its main diagonal (from top-left to bottom-right). The first row becomes the first column, the second row becomes the second column, and so on._ **Example:** If $$A=\begin{bmatrix}
    1 & 2 & 3 \\
    0 & -1 & 4
    \end{bmatrix} (size 2 \times 3), then A^T=\begin{bmatrix}
    1 & 0 \\
    2 & -1 \\
    3 & 4
    \end{bmatrix}$$ (size $3 \times 2$). (Handout 1, Page 27)

## Common Pitfalls
 $(AB)^T = B^T A^T$ — the order reverses! $(A^T)^T = A$ — double transpose returns the original. The transpose of an $m \times n$ matrix is $n \times m$.

## Summary

> TL;DR — $A^T$ swaps rows and columns: $(A^T)_{ij} = a_{ji}$. Key property: $(AB)^T = B^T A^T$. A matrix equals its transpose iff it is symmetric.

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. How is the transpose of an $m \times n$ matrix $A$, denoted $A^T$, obtained?
    - **A)** By negating all the entries of $A$.
    - **B)** By interchanging the rows and columns to form an $n \times m$ matrix.
    - **C)** By calculating the inverse of $A$.
    - **D)** By shifting all rows down by one position.

2. If matrix $A$ has an entry $a_{ij}$, where will that exact numerical entry be located in the transposed matrix $A^T$?
    - **A)** At the position $a'_{ij}$
    - **B)** At the position $a'_{ji}$
    - **C)** At the position $a'_{i+1, j+1}$
    - **D)** It is removed from the matrix.

3. What is the correct property for computing the transpose of a matrix product, $(AB)^T$?
    - **A)** $A^T B^T$
    - **B)** $(BA)^T$
    - **C)** $B^T A^T$
    - **D)** $A B^T$

### Answer Key & Explanations

1. **B**. The transpose is obtained by interchanging the rows and columns, turning an $m \times n$ matrix into an $n \times m$ matrix.
2. **B**. By swapping the rows and columns, the element at row $i$ and column $j$ in $A$ moves to row $j$ and column $i$ in $A^T$.
3. **C**. A common pitfall is forgetting that taking the transpose of a product reverses the order of the matrices: $(AB)^T = B^T A^T$.

## References & Navigation

- **Previous Topic:** [[Trace of a Matrix]]
- **Next Topic:** [[Triangular Matrices]]
- **Related Notes:** [[Important Remarks]], [[Powers of a Matrix]], [[Matrices Detailed]]
