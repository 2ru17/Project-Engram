---
id: Elementary-Matrices
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Elementary Matrices

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Definition: An n×n matrix is called an elementary matrix if it can be obtained from the identity matrix In​ by performing a single Elementary Row O...

## Key Concepts
 Definition Invertibility Theorem Theorem (Equivalent Statements)

## Details / Theory
 **Definition:** An n×n matrix is called an **elementary matrix** if it can be obtained from the identity matrix In​ by performing a single [[Elementary Row Operation]]. (Handout 2, Page 16)

sw operation is performed on an m×n matrix A, the resulting matrix can be obtained by premultiplying A by the corresponding m×m elementary matrix. (Handout 2, Page 17)

EA = result of applying the same row operation (that formed E from I) to A.

 **Invertibility:** Elementary matrices are always nonsingular (invertible), and their inverses are also elementary matrices. (Handout 2, Page 18)
Inverse of Ri​↔Rj​ is Ri​↔Rj​.
Inverse of kRi​→Ri​ is k1​Ri​→Ri​.
Inverse of Ri​+kRj​→Ri​ is Ri​−kRj​→Ri​. **Theorem:** A square matrix A is nonsingular if and only if it can be expressed as a product of elementary matrices. (Handout 2, Page 18) **Theorem (Equivalent Statements):** For an n×n matrix A, the following are equivalent: (Handout 2, Page 19)
  1. A is nonsingular (invertible).
  2. The homogeneous system Ax=0 has only the trivial solution (x=0).
  3. A is row equivalent to In​. (i.e., A can be reduced to In​ by elementary row operations).
  4. A can be written as a product of elementary matrices.
  5. The system Ax=b has a unique solution for every n×1 matrix b.
  6. The determinant of A is non-zero (det(A)=0). (This is a key result, though determinants might be covered later).

## Common Pitfalls
 Each elementary matrix corresponds to exactly one ERO — don’t combine multiple operations into one matrix. Elementary matrices are always square and always invertible.

## Summary

> TL;DR — An elementary matrix is obtained by performing one ERO on the identity. Left-multiplying by $E$ applies that same ERO. Elementary matrices are always invertible.

## Links
 **Related:** - [[Elementary Row Operation]] **Source / Reference:**

## Multiple Choice Questions

1. How is an elementary matrix constructed?
    - **A)** By taking the determinant of a square matrix.
    - **B)** By performing multiple elementary row operations simultaneously.
    - **C)** By performing a single elementary row operation on the identity matrix.
    - **D)** By transforming any matrix into its reduced row echelon form.

2. Which of the following statements about the inverse of an elementary matrix is true?
    - **A)** Elementary matrices are not invertible.
    - **B)** An elementary matrix is always invertible, and its inverse is another elementary matrix.
    - **C)** The inverse of an elementary matrix is the identity matrix.
    - **D)** An elementary matrix is invertible only if its determinant is exactly 1.

3. According to the equivalent statements for an $n \times n$ matrix $A$, if $A$ is nonsingular, which of the following must also be true?
    - **A)** $A$ can be written as a product of elementary matrices.
    - **B)** $A$ is equivalent to a zero matrix.
    - **C)** The system $A\mathbf{x} = 0$ has infinitely many solutions.
    - **D)** $A$ has a determinant equal to zero.

### Answer Key & Explanations

1. **C**. An $n \times n$ matrix is an elementary matrix if it is obtained from the identity matrix $I_n$ by performing a single elementary row operation.
2. **B**. The note states that elementary matrices are always nonsingular (invertible) and their inverses are also elementary matrices.
3. **A**. One of the equivalent statements for a nonsingular square matrix is that it can be expressed as a product of elementary matrices.

## References & Navigation

- **Previous Topic:** [[Diagonal Matrix]]
- **Next Topic:** [[Elementary Row Operation]]
- **Related Notes:** [[Zero Matrix]], [[Matrix Addition]], [[Matrices Detailed]]
