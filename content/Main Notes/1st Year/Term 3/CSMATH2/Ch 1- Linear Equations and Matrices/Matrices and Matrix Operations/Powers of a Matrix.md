---
id: Powers-of-a-Matrix
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Powers of a Matrix

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Definition: If A is a square matrix, non-negative integer powers of A are defined as:

## Key Concepts
 Definition Laws of Exponents Caution

## Details / Theory
 **Definition:** If A is a square matrix, non-negative integer powers of A are defined as:
A0=In​ (Identity matrix of the same order as A)
A1=A  

Ak=A⋅A⋅…⋅A (k times), for k≥1.
    (Handout 2, Page 8) **Laws of Exponents:** If A is a square matrix and r,s are non-negative integers:
ArAs=Ar+s  

(Ar)s=Ars
    (Handout 2, Page 8) **Caution:** In general, (AB)k=AkBk unless A and B commute (i.e., AB=BA).

## Common Pitfalls
 Only square matrices can be raised to powers ($A^k = \underbrace{A \cdot A \cdots A}_{k}$). $A^0 = I$ by convention (the identity matrix, not the number 1). $(AB)^k \neq A^k B^k$ unless $A$ and $B$ commute.

## Summary

> TL;DR — $A^k$ means multiplying $A$ by itself $k$ times. Only for square matrices. $A^0 = I$. Powers of diagonal matrices are computed entry-wise.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. By convention in linear algebra, what does $A^0$ equal for a square matrix $A$?
- **A)** The scalar 1
- **B)** The zero matrix $O$
- **C)** The identity matrix $I_n$
- **D)** The original matrix $A$

2. What strict rule applies when trying to raise a matrix to a power $k$ (e.g., $A^k$)?
- **A)** The matrix must be an identity matrix.
- **B)** The matrix must be a square matrix.
- **C)** The matrix must have non-zero entries.
- **D)** The power $k$ must be a negative integer.

3. Under what condition is the exponent rule $(AB)^k = A^k B^k$ valid for matrices?
- **A)** Always, this is a standard law of exponents.
- **B)** Only when both $A$ and $B$ are identity matrices.
- **C)** Only when matrices $A$ and $B$ commute, so $AB = BA$.
- **D)** Never, it is mathematically impossible.

### Answer Key & Explanations
1. **C)** The definition states that $A^0 = I_n$ (the identity matrix), similar to how $x^0 = 1$ for scalars, but represented as a matrix.
2. **B)** A matrix can only be multiplied by itself if its inner dimensions match. Thus, $A^k$ is only defined for square matrices.
3. **C)** The notes explicitly caution that $(AB)^k \neq A^k B^k$ in general unless the matrices commute ($AB = BA$).

## References & Navigation

- **Previous Topic:** [[Polynomial in a Matrix]]
- **Next Topic:** [[Properties of Matrix Operations]]
- **Related Notes:** [[Transpose of a Matrix]], [[Trace of a Matrix]], [[Matrices Detailed]]
