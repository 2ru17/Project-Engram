---
id: Matrix-Equality
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Matrix Equality

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Two matrices $A=[a_{ij}]$ and $B=[b_{ij}]$ are equal ($A=B$) if and only if:

## Key Concepts
 Examples Example 1 Example 2 Example 3 Example 4

## Details / Theory
 Two matrices $A=[a_{ij}]$ and $B=[b_{ij}]$ are **equal** ($A=B$) if and only if:
  1. They have the **same size** ($m \times n$).
  2. Their **corresponding entries** are equal ($a_{ij}=b_{ij}$ for all $i=1,...,m$ and $j=1,...,n$). (Handout 1, Page 6) **Examples:** (Handout 1, Page 6)
**Example 1:** The matrices
    $$
    \begin{bmatrix}
    1 & 2 \\
    -3 & 1
    \end{bmatrix} \text{ and } \begin{bmatrix}
    1 & 2 \\
    -3 & 1
    \end{bmatrix}
    $$
    are equal.
**Example 2:** The matrices
    $$
    \begin{bmatrix}
    1 & 2 & 0 \\
    -3 & 1 & 5
    \end{bmatrix} \text{ and } \begin{bmatrix}
    1 & 2 & 0
    \end{bmatrix}
    $$
    are **NOT** equal (different sizes).
**Example 3:** The matrices
    $$
    \begin{bmatrix}
    1 & 2 \\
    -3 & 1
    \end{bmatrix} \text{ and } \begin{bmatrix}
    1 & 2 \\
    -3 & -1
    \end{bmatrix}
    $$
    are **NOT** equal (different entries at (2,2)).
**Example 4:** For the equation
    $$
    \begin{bmatrix}
    1 & 2 & 0 \\
    -3 & 1 & 5
    \end{bmatrix}=\begin{bmatrix}
    x & 2 & 0 \\
    y & 1 & z
    \end{bmatrix}
    $$
    we have equality if and only if $x=1$, $y=-3$, $z=5$. **Equation Solving Example:** If
  $$
  \begin{bmatrix}
  1 & 2x-1 \\
  -5 & 0
  \end{bmatrix}=\begin{bmatrix}
  1 & 7 \\
  y+5 & 0
  \end{bmatrix}
  $$
  find $x$ and $y$. (Handout 1, Page 7)
Equating corresponding entries: $2x-1=7 \Rightarrow 2x=8 \Rightarrow x=4$.
And $y+5=-5 \Rightarrow y=-10$.
_**PN:**_ _Matrix equality essentially gives you a system of equations, one for each entry._

## Common Pitfalls
 Matrices must be the same size AND have identical entries to be equal. Visual similarity is not enough — every single entry must match.

## Summary

> TL;DR — $A = B$ iff they have the same size and $a_{ij} = b_{ij}$ for all $i, j$. Setting matrices equal lets you solve for unknowns entry by entry.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. What are the two strict requirements for two matrices $A$ and $B$ to be considered equal?
    - **A)** They must have the same determinant and trace.
    - **B)** They must be symmetric and have the same number of rows.
    - **C)** They must have the same size and their corresponding entries must be equal.
    - **D)** They must both be square matrices with matching diagonal entries.

2. If matrix $A$ has dimensions $m \times n$ and matrix $B$ has dimensions $n \times p$, can they be equal?
    - **A)** Yes, if $m = p$.
    - **B)** Yes, if their non-zero entries are identical.
    - **C)** No, matrices of different sizes can never be equal.
    - **D)** Yes, but only if they are both zero matrices.

3. Suppose matrices $A$ and $B$ are equal. What mathematical relation exists between their entries $a_{ij}$ and $b_{ij}$?
    - **A)** $a_{ij} = -b_{ij}$
    - **B)** $a_{ij} = 1/b_{ij}$
    - **C)** $a_{ij} = b_{ij}$ for all indices $i, j$
    - **D)** $a_{ij} \neq b_{ij}$

4. Why is setting two matrices equal useful in linear algebra applications?
    - **A)** It guarantees the matrices are invertible.
    - **B)** It allows you to create a system of equations by equating corresponding entries.
    - **C)** It reduces the size of the matrix.
    - **D)** It automatically calculates the eigenvalues.

5. Which of the following best describes the common pitfall regarding matrix equality?
    - **A)** Assuming two matrices are equal just because their determinants are equal.
    - **B)** Assuming visual similarity is enough; every single entry must strictly match.
    - **C)** Thinking that equal matrices must always be diagonal.
    - **D)** Forgetting to check if the matrix is singular.

6. If $A = \begin{bmatrix} 1 & x \\ 3 & 4 \end{bmatrix}$ and $B = \begin{bmatrix} 1 & 2 \\ y & 4 \end{bmatrix}$, what are $x$ and $y$ for $A=B$?
    - **A)** $x = 1, y = 4$
    - **B)** $x = 3, y = 2$
    - **C)** $x = 2, y = 3$
    - **D)** $x = 0, y = 0$

7. True or False: Two matrices can be equal if they contain the exact same numerical entries but have different dimensions (e.g., a $1 \times 4$ row and a $4 \times 1$ column).
    - **A)** True, because the elements are identical.
    - **B)** True, because they represent the same data.
    - **C)** False, the dimensions must match exactly for equality.
    - **D)** False, row vectors cannot be compared.

8. In the context of solving equations with equal matrices, what does each pair of corresponding entries provide?
    - **A)** A distinct linear transformation.
    - **B)** A discrete scalar multiplier.
    - **C)** A distinct algebraic equation to solve.
    - **D)** The rank of the matrix.

9. Which of the following pairs of matrices are considered equal?
    - **A)** Two matrices with identical dimensions and identical corresponding entries.
    - **B)** A zero matrix and an identity matrix of the same size.
    - **C)** Two matrices with the same trace.
    - **D)** An upper triangular matrix and a lower triangular matrix with the same diagonal.

10. Is it possible for two zero matrices to be unequal?
    - **A)** No, all zero matrices are equal by definition.
    - **B)** Yes, if they have different dimensions (e.g., a $2 \times 2$ zero matrix vs a $3 \times 3$ zero matrix).
    - **C)** No, because zero equals zero.
    - **D)** Yes, if one is multiplied by a negative scalar.

### Answer Key & Explanations
1. **C)** Two matrices are equal if and only if they have the same size and all corresponding entries are equal.
2. **C)** Matrices must have the exact same dimensions to be equal; otherwise, equality is undefined.
3. **C)** For two matrices to be equal, every entry $a_{ij}$ must exactly equal its corresponding entry $b_{ij}$.
4. **B)** Setting matrices equal gives a system of equations, one for each corresponding entry, which is useful for solving for unknowns.
5. **B)** Visual similarity is not enough — the strict rule is that every single entry and dimension must exactly match.
6. **C)** Equating the corresponding entries, $x$ is in the (1,2) position of $A$ and must equal 2 in $B$. $y$ is in the (2,1) position of $B$ and must equal 3 in $A$.
7. **C)** A common pitfall is forgetting that a $1 \times 4$ matrix and a $4 \times 1$ matrix are fundamentally different sizes and thus not equal.
8. **C)** Each corresponding entry yields an algebraic equation ($a_{ij} = b_{ij}$), which can be solved simultaneously.
9. **A)** Identical dimensions and identical corresponding entries satisfy both criteria for matrix equality.
10. **B)** Zero matrices of different sizes (e.g., $O_{2 \times 2}$ and $O_{3 \times 3}$) are not equal because their dimensions differ.

## References & Navigation

- **Previous Topic:** [[Matrix Addition]]
- **Next Topic:** [[Matrix Multiplication]]
- **Related Notes:** [[Operations on Matrices]], [[Zero Matrix]], [[Matrices Detailed]]
