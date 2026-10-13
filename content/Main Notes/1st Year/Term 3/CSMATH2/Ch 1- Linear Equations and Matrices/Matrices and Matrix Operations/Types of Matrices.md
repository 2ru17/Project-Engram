---
id: Types-of-Matrices
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Types of Matrices

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Square Matrix: If $m=n$ (number of rows equals number of columns). It's called a square matrix of order n. (Handout 1, Page 5)

## Key Concepts
 [[Square Matrix]] [[Row Matrix]] [[Column Matrix]] [[Zero Matrix]] ($\mathbf{O}$)

## Details / Theory
 **[[Square Matrix]]**: If $m=n$ (number of rows equals number of columns). It's called a square matrix of **order** n. (Handout 1, Page 5)
Example: $$\begin{bmatrix}
    2 & 1 & 0 \\
    -1 & 4 & 2 \\
    10 & 5 & 3
    \end{bmatrix}$$ is a square matrix of order 3. (Handout 1, Page 5) **[[Row Matrix]]**: If $m=1$ (only one row). Size is $1 \times n$. (Handout 1, Page 5)
Example: $$\begin{bmatrix}
    1 & 2 & -1 & 4
    \end{bmatrix}$$ is a $1 \times 4$ row matrix. (Handout 1, Page 5) **[[Column Matrix]]**: If $n=1$ (only one column). Size is $m \times 1$. (Handout 1, Page 5)
Example: $$\begin{bmatrix}
    1/2 \\
    3 \\
    -2/3
    \end{bmatrix}$$ is a $3 \times 1$ column matrix. (Handout 1, Page 5) **[[Zero Matrix]] ($\mathbf{O}$)**: A matrix where all entries are zero ($a_{ij}=0$ for all $i,j$). Often denoted by $O_{m \times n}$ to specify size. (Handout 1, Page 16)
Example: If $$A=\begin{bmatrix}
    1 & 2 & 3 \\
    4 & 5 & 6
    \end{bmatrix}$$
    the corresponding zero matrix is
  $$
  O=\begin{bmatrix}
  0 & 0 & 0 \\
  0 & 0 & 0
  	    \end{bmatrix}$$ (Handout 1, Page 16)

  $$ _**PN:**_ _The zero matrix acts like the number zero in matrix addition:_ $A+O=A$.

## Common Pitfalls
 Don't confuse matrix type names — row vs. column, upper vs. lower triangular. The type hierarchy matters: identity ⊂ scalar ⊂ diagonal ⊂ triangular.

## Summary

> TL;DR — Matrices are classified by shape (row, column, square) and structure (diagonal, triangular, symmetric, etc.). Knowing the type enables computation shortcuts and determines available operations.

## Review Questions

_To be added._

## Links
 **Related:** - [[Square Matrix]] - [[Row Matrix]] - [[Column Matrix]] - [[Zero Matrix]] **Source / Reference:**

## Multiple Choice Questions

1. If a matrix has an equal number of rows and columns ($m = n$), what is it formally called?
    - **A)** A scalar matrix
    - **B)** A zero matrix
    - **C)** A square matrix
    - **D)** A symmetric matrix

2. In the notation for a zero matrix $O_{m \times n}$, what do the variables $m$ and $n$ explicitly specify?
    - **A)** The determinant of the matrix.
    - **B)** The size (rows and columns) of the matrix.
    - **C)** The coordinates of the non-zero entries.
    - **D)** The rank of the matrix.

3. Which of the following definitions best describes a column matrix?
    - **A)** A matrix with exactly one column and $m$ rows, size $m \times 1$.
    - **B)** A matrix with exactly one row and $n$ columns, size $1 \times n$.
    - **C)** A square matrix where all columns are identical.
    - **D)** A matrix composed only of ones.

4. A matrix of size $1 \times n$ (having only one row) is specifically referred to as what?
    - **A)** A diagonal matrix
    - **B)** A scalar matrix
    - **C)** A row matrix
    - **D)** A singular matrix

5. According to the note, what specific role does the zero matrix $O$ play in matrix addition?
    - **A)** It acts as the multiplicative identity.
    - **B)** It acts as the additive identity, where $A + O = A$.
    - **C)** It inverses the matrix it is added to.
    - **D)** It makes the resulting matrix singular.

6. Which sequence correctly represents the matrix structural hierarchy from most specific to least specific?
    - **A)** Diagonal $\subset$ Identity $\subset$ Triangular $\subset$ Scalar
    - **B)** Scalar $\subset$ Triangular $\subset$ Identity $\subset$ Diagonal
    - **C)** Identity $\subset$ Scalar $\subset$ Diagonal $\subset$ Triangular
    - **D)** Triangular $\subset$ Diagonal $\subset$ Scalar $\subset$ Identity

7. What is highlighted as a common pitfall when classifying types of matrices?
    - **A)** Confusing matrix types, such as upper versus lower triangular matrices.
    - **B)** Believing that zero matrices must be square.
    - **C)** Forgetting that a row matrix is the same as a column matrix.
    - **D)** Attempting to invert a non-square identity matrix.

8. In a square matrix of order $n$, what must structurally be true about its dimensions?
    - **A)** The number of rows $m$ and columns $n$ are exactly equal to each other.
    - **B)** The number of rows must be greater than the columns.
    - **C)** The dimension must be exactly $3 \times 3$.
    - **D)** The number of columns must be one.

9. What strict condition must a matrix meet to be considered a Zero Matrix $\mathbf{O}$?
    - **A)** Its trace must be zero.
    - **B)** Its determinant must be zero.
    - **C)** Every single entry $a_{ij}$ must be exactly zero.
    - **D)** At least one full row must be zero.

10. Which of the following vectors is a clear example of a row matrix?
    - **A)** $\begin{bmatrix} 1 \\ 2 \\ -1 \end{bmatrix}$
    - **B)** $[1, 2, -1, 4]$
    - **C)** $\begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$
    - **D)** An identity matrix of size 3.

### Answer Key & Explanations
1. **C)** A matrix where the number of rows equals the number of columns ($m = n$) is called a square matrix.
2. **B)** The subscript $m \times n$ specifies the size of the zero matrix so its dimensions are clear for operations.
3. **A)** A column matrix has exactly one column, meaning its dimensions are $m \times 1$.
4. **C)** A matrix with exactly one row ($m = 1$) is referred to as a row matrix.
5. **B)** The zero matrix acts like the number zero in matrix addition, serving as the additive identity ($A + O = A$).
6. **C)** The correct hierarchy of types is Identity $\subset$ Scalar $\subset$ Diagonal $\subset$ Triangular matrices.
7. **A)** A common pitfall listed is confusing matrix type names, such as mixing up row and column, or upper and lower triangular matrices.
8. **A)** A square matrix of order $n$ means that both the row count $m$ and column count $n$ are equal to $n$.
9. **C)** A zero matrix is strictly defined as a matrix where all individual entries $a_{ij}$ are exactly zero.
10. **B)** $[1, 2, -1, 4]$ is a $1 \times 4$ matrix, which has exactly one row, defining it as a row matrix.

## References & Navigation

- **Previous Topic:** [[Triangular Matrices]]
- **Next Topic:** [[Upper Triangular Matrix]]
- **Related Notes:** [[Main Diagonal]], [[Triangular Matrices]], [[Matrices Detailed]]
