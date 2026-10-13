---
id: Matrix-Multiplication
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Matrix Multiplication

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Definition: If $A=[a_{ij}]$ is an $m \times n$ matrix and $B=[b_{ij}]$ is an $n \times p$ matrix, their product $AB$ is an $m \times p$ matrix $C=[...

## Key Concepts
 Size Compatibility Condition Non-Commutativity

## Details / Theory
 Definition: If $A=[a_{ij}]$ is an $m \times n$ matrix and $B=[b_{ij}]$ is an $n \times p$ matrix, their product $AB$ is an $m \times p$ matrix $C=[c_{ij}]$, where the entry $c_{ij}$ (in the i-th row, j-th column of $C$) is calculated by taking the dot product of the i-th row of $A$ with the j-th column of $B$:
  $$c_{ij}=(\text{i-th row of } A) \cdot (\text{j-th column of } B)=\sum_{k=1}^{n}a_{ik}b_{kj}$$
  $$c_{ij}=a_{i1}b_{1j}+a_{i2}b_{2j}+\cdots+a_{in}b_{nj}$$
  (Handout 1, Page 21) **Size Compatibility Condition:** The number of columns of $A$ (n) **must equal** the number of rows of $B$ (n). If $A$ is $m \times n$ and $B$ is $n \times p$, then $AB$ is defined and has size $m \times p$. (Handout 1, Page 21)
_**PN:**_ _This is the most complex standard operation. It's NOT element-wise multiplication! Always check dimensions first:_ $(m \times n) \times (n \times p) \rightarrow (m \times p)$. _The inner dimensions_ $n$ _must match._ **Non-Commutativity:** Matrix multiplication is generally **NOT commutative**, meaning $AB \neq BA$ even if both products are defined (which requires $A$ and $B$ to be square matrices of the same size). (Handout 1, Page 25)
Example: Let $A=\begin{bmatrix}
    3 & -2 \\
    2 & 5
    \end{bmatrix}$ and $B=\begin{bmatrix}
    0 & 1 \\
    3 & 4
    \end{bmatrix}$.
        $$AB=\begin{bmatrix}
        3(0)+(-2)(3) & 3(1)+(-2)(4) \\
        2(0)+5(3) & 2(1)+5(4)
        \end{bmatrix}=\begin{bmatrix}
        -6 & -5 \\
        15 & 22
        \end{bmatrix}$$

        $$BA=\begin{bmatrix}
        0(3)+1(2) & 0(-2)+1(5) \\
        3(3)+4(2) & 3(-2)+4(5)
        \end{bmatrix}=\begin{bmatrix}
        2 & 5 \\
        17 & 14
        \end{bmatrix}$$

        Clearly, $AB \neq BA$. (Handout 1, Page 25)
_**PN:**_ _This is a critical difference from scalar arithmetic. The order of multiplication matters significantly._

## Common Pitfalls
 Multiplication is NOT commutative: $AB \neq BA$ in general. Inner dimensions must match: $A_{m \times n} \cdot B_{n \times p}$ — if cols of $A \neq$ rows of $B$, undefined. $AB = O$ does not mean $A = O$ or $B = O$.

## Summary

> TL;DR — $(AB)_{ij} = \sum_k a_{ik} b_{kj}$. Requires inner dimensions to match. Not commutative. Associative and distributive over addition.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. To multiply matrix $A$ of size $m \times n$ by matrix $B$ of size $p \times q$, what dimensional condition must be met?
    - **A)** $m$ must equal $p$
    - **B)** $n$ must equal $p$
    - **C)** $n$ must equal $q$
    - **D)** $m$ must equal $q$

2. If $A$ is an $m \times n$ matrix and $B$ is an $n \times p$ matrix, what is the size of the resulting product matrix $AB$?
    - **A)** $n \times n$
    - **B)** $p \times m$
    - **C)** $m \times p$
    - **D)** $m \times n$

3. How is the specific entry $c_{ij}$ computed in the product matrix $C = AB$?
    - **A)** By multiplying $a_{ij}$ and $b_{ij}$ directly.
    - **B)** By adding the elements of the $i$-th row of $A$ to the $j$-th column of $B$.
    - **C)** By taking the dot product of the $i$-th row of $A$ and the $j$-th column of $B$.
    - **D)** By taking the dot product of the $i$-th column of $A$ and the $j$-th row of $B$.

4. Which of the following is a true statement regarding the commutativity of standard matrix multiplication?
    - **A)** Matrix multiplication is always commutative ($AB = BA$).
    - **B)** Matrix multiplication is generally not commutative ($AB \neq BA$).
    - **C)** Matrix multiplication is only commutative for singular matrices.
    - **D)** Commutativity holds only if the matrices have different sizes.

5. What is the fundamental difference between matrix multiplication and element-wise scalar multiplication?
    - **A)** Matrix multiplication can only be done with square matrices.
    - **B)** Matrix multiplication involves a sum of products of rows and columns, rather than just multiplying corresponding entries.
    - **C)** Element-wise multiplication requires matching inner dimensions, while matrix multiplication requires identical dimensions.
    - **D)** There is no fundamental difference; they yield the same result.

6. If the matrix product $AB$ equals the zero matrix $O$, what can be definitively concluded about matrices $A$ and $B$?
    - **A)** Both $A$ and $B$ must be the zero matrix.
    - **B)** Either $A = O$ or $B = O$.
    - **C)** It does not necessarily mean that $A = O$ or $B = O$.
    - **D)** Both matrices must be non-invertible identity matrices.

7. What formal summation formula represents the calculation for entry $c_{ij}$ in the matrix product $C = AB$?
    - **A)** $c_{ij} = \sum_{k=1}^{n} (a_{ik} + b_{kj})$
    - **B)** $c_{ij} = \sum_{k=1}^{n} a_{ik} b_{kj}$
    - **C)** $c_{ij} = \prod_{k=1}^{n} a_{ik} b_{kj}$
    - **D)** $c_{ij} = \sum_{k=1}^{n} a_{ki} b_{jk}$

8. For two square matrices $A$ and $B$ of the exact same size, is the product $AB$ always equal to $BA$?
    - **A)** Yes, square matrices always commute.
    - **B)** Yes, if their determinants are equal.
    - **C)** No, even for square matrices, $AB$ and $BA$ are usually not equal.
    - **D)** No, they only commute if they are both zero matrices.

9. According to the properties of operations, matrix multiplication is distributive over which other matrix operation?
    - **A)** Matrix Transposition
    - **B)** Matrix Inversion
    - **C)** Matrix Addition
    - **D)** Scalar Subtraction

10. Which of the following best describes the "inner dimensions" that must match in matrix multiplication $A \cdot B$?
    - **A)** The number of rows in $A$ and the number of columns in $B$.
    - **B)** The total number of elements in both matrices.
    - **C)** The number of columns in $A$ and the number of rows in $B$.
    - **D)** The diagonal length of both matrices.

### Answer Key & Explanations
1. **B)** The size compatibility condition states the number of columns of $A$ ($n$) must exactly equal the number of rows of $B$ ($p$).
2. **C)** The outer dimensions dictate the size of the product matrix; an $m \times n$ and an $n \times p$ matrix yield an $m \times p$ product.
3. **C)** Entry $c_{ij}$ is found by calculating the dot product of the $i$-th row of the first matrix and the $j$-th column of the second matrix.
4. **B)** A critical rule in linear algebra is that matrix multiplication is generally NOT commutative; the order of multiplication matters.
5. **B)** Matrix multiplication is a complex operation taking row-column dot products, which is completely different from simply multiplying corresponding elements.
6. **C)** The zero product property does not hold for matrices; $AB=O$ can happen even if neither $A$ nor $B$ is the zero matrix.
7. **B)** The mathematical definition uses the sum of the products of the corresponding entries from the row of $A$ and column of $B$: $\sum_{k=1}^{n} a_{ik}b_{kj}$.
8. **C)** Even if both matrices are square and the products $AB$ and $BA$ are both defined, they are typically not equal.
9. **C)** The summary notes that matrix multiplication is associative and distributive over matrix addition.
10. **C)** The "inner dimensions" refer to $n$ in the expression $(m \times n) \times (n \times p)$, which are the columns of the left matrix and the rows of the right matrix.

## References & Navigation

- **Previous Topic:** [[Matrix Equality]]
- **Next Topic:** [[Matrix Subtraction (Difference)]]
- **Related Notes:** [[Upper Triangular Matrix]], [[Types of Matrices]], [[Matrices Detailed]]
