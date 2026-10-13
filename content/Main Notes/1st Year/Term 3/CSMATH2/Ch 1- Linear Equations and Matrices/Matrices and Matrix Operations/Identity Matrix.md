---
id: Identity-Matrix
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Identity Matrix

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Definition: The n×n Scalar Matrix whose main diagonal entries are all equal to 1 is called the n×n identity matrix (or identity matrix of order n),...

## Key Concepts
 Definition

## Details / Theory
 **Definition:** The n×n [[Scalar Matrix]] whose main diagonal entries are all equal to 1 is called the n×n **identity matrix** (or identity matrix of order n), denoted by In​ or simply I. (Handout 2, Page 5)
aij​=0 for i=j, and aii​=1. Examples: (Handout 2, Page 5)
  I2​=[1​0 0​1​],I3​=[1​0​0 0​1​0 0​0​1​],I4​=[1​0​0​0 0​1​0​0 0​0​1​0 0​0​0​1​] Property (Multiplicative Identity): If A is an m×n matrix, then: (Handout 2, Page 5)
  AIn​=AandIm​A=A`
_**Personal Note:**_ _The identity matrix acts like the number '1' in scalar multiplication._

## Common Pitfalls
 The identity matrix must be square ($n \times n$) — there is no non-square identity. $AI = A$ only when $I$ has the correct size matching $A$'s column count.

## Summary

> TL;DR — The identity matrix $I_n$ is diagonal with all 1s. It is the multiplicative identity: $AI = IA = A$. It is its own inverse and transpose.

## Review Questions

_To be added._

## Links
 **Related:** - [[Scalar Matrix]] **Source / Reference:**

## Multiple Choice Questions

1. Which definition correctly describes an identity matrix?
    - **A)** A scalar matrix where all non-diagonal entries are 1.
    - **B)** A diagonal matrix where all main diagonal entries are equal to 0.
    - **C)** A scalar matrix whose main diagonal entries are all equal to 1.
    - **D)** Any square matrix that is invertible.

2. If $A$ is an $m \times n$ matrix, which of the following properties holds regarding the multiplicative identity?
    - **A)** $A I_m = A$ and $I_n A = A$
    - **B)** $A I_n = A$ and $I_m A = A$
    - **C)** $A I_n = I_m$ and $I_m A = I_n$
    - **D)** $A I_n = 1$ and $I_m A = 1$

3. Which of the following is a strict requirement for an identity matrix?
    - **A)** It must be a square matrix.
    - **B)** It can have rectangular dimensions as long as the diagonal has 1s.
    - **C)** Its columns must add up to zero.
    - **D)** It must have a determinant of zero.

### Answer Key & Explanations
1. **C)** The identity matrix is defined as an $n \times n$ scalar matrix whose main diagonal entries are all equal to 1.
2. **B)** The property of the multiplicative identity for an $m \times n$ matrix $A$ is that $A I_n = A$ and $I_m A = A$.
3. **A)** As noted in the common pitfalls, the identity matrix must be a square matrix ($n \times n$) — there is no such thing as a non-square identity matrix.

## References & Navigation

- **Previous Topic:** [[Elementary Row Operation]]
- **Next Topic:** [[Important Remarks]]
- **Related Notes:** [[Upper Triangular Matrix]], [[Lower Triangular Matrix]], [[Matrices Detailed]]
