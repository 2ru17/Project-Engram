---
id: Scalar-Multiplication
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Scalar Multiplication

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> In matrix contexts, real numbers are often referred to as scalars. (Handout 1, Page 9)

## Details / Theory
 In matrix contexts, real numbers are often referred to as **scalars**. (Handout 1, Page 9) Definition: If $A=[a_{ij}]$ is an $m \times n$ matrix and $c$ is a scalar, the scalar multiple $cA$ is the $m \times n$ matrix obtained by multiplying each entry of $A$ by $c$:
  $$cA=[c \cdot a_{ij}]$$
  (Handout 1, Page 9) Example:
  $$
  3\begin{bmatrix}
  1 & 2 & 3 \\
  4 & -1 & 2 \\
  0 & 3 & -4
  \end{bmatrix}=\begin{bmatrix}
  3(1) & 3(2) & 3(3) \\
  3(4) & 3(-1) & 3(2) \\
  3(0) & 3(3) & 3(-4)
  \end{bmatrix}=\begin{bmatrix}
  3 & 6 & 9 \\
  12 & -3 & 6 \\
  0 & 9 & -12
  \end{bmatrix}
  $$
  (Handout 1, Page 9)
_**PN:**_ _Scalar multiplication scales the entire matrix. Every element gets multiplied by the scalar._

## Common Pitfalls
 Scalar multiplication multiplies every entry: $(kA)_{ij} = k \cdot a_{ij}$. Don’t confuse with matrix multiplication — scalar multiplication always commutes: $kA = Ak$.

## Summary

> TL;DR — $kA$ multiplies every entry of $A$ by scalar $k$. Distributes over addition and is associative: $k(lA) = (kl)A$.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. In the context of matrix operations, what does the term "scalar" formally refer to?
- **A)** A matrix with one row and one column.
- **B)** A real number.
- **C)** The determinant of a matrix.
- **D)** The trace of a matrix.

2. How is the operation of scalar multiplication $cA$ performed on a matrix $A$?
- **A)** By adding the scalar $c$ to every entry of $A$.
- **B)** By multiplying only the diagonal entries of $A$ by $c$.
- **C)** By multiplying every single entry of $A$ by the scalar $c$.
- **D)** By raising every entry of $A$ to the power of $c$.

3. Which of the following properties applies to scalar multiplication with a matrix?
- **A)** It changes the dimensions of the matrix.
- **B)** It only works if the matrix is square.
- **C)** It always yields an invertible matrix.
- **D)** It always commutes, meaning $kA = Ak$.

### Answer Key & Explanations
1. **B)** As noted in the overview, real numbers used in matrix contexts are referred to as scalars.
2. **C)** The definition states that the scalar multiple $cA$ is obtained by multiplying every single entry $a_{ij}$ by the scalar $c$.
3. **D)** A common pitfall warning clarifies that unlike matrix multiplication, scalar multiplication always commutes: $kA$ is the same as $Ak$.

## References & Navigation

- **Previous Topic:** [[Scalar Matrix]]
- **Next Topic:** [[Size & Dimension of a Matrix]]
- **Related Notes:** [[Symmetric Matrix]], [[Upper Triangular Matrix]]
