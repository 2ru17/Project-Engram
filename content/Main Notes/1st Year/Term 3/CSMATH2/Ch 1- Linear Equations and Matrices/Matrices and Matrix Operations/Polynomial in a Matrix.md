---
id: Polynomial-in-a-Matrix
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Polynomial in a Matrix

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Definition: If A is an n×n square matrix and p(x) is a polynomial defined by:

## Details / Theory
 Definition: If A is an n×n square matrix and p(x) is a polynomial defined by:
  p(x)=ck​xk+ck−1​xk−1+⋯+c1​x+c0​
  where c0​,c1​,…,ck​ are scalars, then p(A) is the n×n matrix defined as:
  p(A)=ck​Ak+ck−1​Ak−1+⋯+c1​A+c0​In​
  (Handout 2, Page 9)
_**Personal Note:**_ _The constant term_ c0​ _becomes_ c0​In​ _when evaluating the polynomial for a matrix._ Example: If p(x)=2x2−3x+4 and A=[1​0 2​3​].
  Then p(A)=2A2−3A+4I2​.
  First, calculate A2:
  A2=A⋅A=[1​0 2​3​][1​0 2​3​]=[1(1)+0(2)​1(0)+0(3) 2(1)+3(2)​2(0)+3(3)​]=[1​0 8​9​]
  Then,
  p(A)=2[1​0 8​9​]−3[1​0 2​3​]+4[1​0 0​1​]p(A)=[2​0 16​18​]−[3​0 6​9​]+[4​0 0​4​]=[2−3+4​0−0+0 16−6+0​18−9+4​]=[3​0 10​13​]
  (Example based on Handout 2, Page 9)

## Common Pitfalls
 Matrix polynomials require the matrix to be square (powers only defined for square matrices). The Cayley-Hamilton theorem states $p(A) = O$ for the characteristic polynomial — don’t confuse this with $p(\lambda) = 0$.

## Summary

> TL;DR — A matrix polynomial $p(A) = c_n A^n + \cdots + c_1 A + c_0 I$ substitutes a square matrix into a polynomial. Every matrix satisfies its own characteristic polynomial (Cayley-Hamilton).

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. To properly evaluate a polynomial $p(x)$ at a given matrix $A$, what type of matrix must $A$ be?
    - **A)** A column matrix.
    - **B)** An identity matrix.
    - **C)** A square matrix.
    - **D)** A zero matrix.

2. When substituting a matrix $A$ into a polynomial $p(x)$, how is the constant term $c_0$ handled?
    - **A)** It is ignored and dropped from the equation.
    - **B)** It is multiplied by the matrix $A$.
    - **C)** It becomes $c_0 I_n$, where $I_n$ is the identity matrix.
    - **D)** It is added to every single entry of the resulting matrix.

3. What does the Cayley-Hamilton theorem formally state regarding a square matrix and its characteristic polynomial?
    - **A)** Every square matrix satisfies its own characteristic polynomial, meaning $p(A) = O$.
    - **B)** The polynomial evaluated at the matrix yields the identity matrix, $p(A) = I$.
    - **C)** No square matrix can be evaluated in a polynomial.
    - **D)** The characteristic polynomial $p(\lambda) = 0$ is equivalent to $A = O$.

### Answer Key & Explanations
1. **C)** Polynomials involve matrix powers ($A^2, A^3$, etc.), and matrix powers are only defined for square matrices.
2. **C)** A common pitfall is forgetting that a scalar cannot simply be added to a matrix. The constant term $c_0$ becomes the scalar multiple $c_0 I_n$.
3. **A)** The Cayley-Hamilton theorem states that a matrix satisfies its own characteristic polynomial, meaning evaluating the polynomial at $A$ yields the zero matrix $O$.

## References & Navigation

- **Previous Topic:** [[Operations on Matrices]]
- **Next Topic:** [[Powers of a Matrix]]
- **Related Notes:** [[Matrix Multiplication]], [[Elementary Row Operation]], [[Matrices Detailed]]
