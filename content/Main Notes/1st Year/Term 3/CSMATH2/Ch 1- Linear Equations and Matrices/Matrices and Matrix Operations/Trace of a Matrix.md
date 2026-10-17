---
id: Trace-of-a-Matrix
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Trace of a Matrix

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Definition: The trace of a square matrix A, denoted by tr(A), is the sum of its main diagonal entries. (Handout 2, Page 3)

## Key Concepts
 Example Properties of the Trace

## Details / Theory
 Definition: The trace of a square matrix A, denoted by tr(A), is the sum of its main diagonal entries. (Handout 2, Page 3)
  tr(A)=i=1∑n​aii​=a11​+a22​+⋯+ann​ **Example:** For A=[2​1​0 −1​4​2 10​5​3​], tr(A)=2+4+3=9. **Properties of the Trace:** If A and B are n×n matrices and c is a scalar: (Handout 2, Page 3 for first two; others are common properties)
  1. tr(A+B)=tr(A)+tr(B)
  2. tr(AB)=tr(BA)
_**Personal Note:**_ _This is a very useful property, especially since_ AB=BA _in general._

  3. tr(cA)=c⋅tr(A)
  4. tr(A⊤)=tr(A)

## Common Pitfalls
 Trace is only defined for square matrices. $\text{tr}(AB) = \text{tr}(BA)$ but $\text{tr}(AB) \neq \text{tr}(A) \cdot \text{tr}(B)$ in general.

## Summary

> TL;DR — $\text{tr}(A) = \sum a_{ii}$ (sum of diagonal entries). Linear, cyclic ($\text{tr}(AB) = \text{tr}(BA)$), and equals the sum of eigenvalues.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. How is the trace of a square matrix $A$, denoted $\text{tr}(A)$, mathematically calculated?
- **A)** By taking the product of its main diagonal entries.
- **B)** By taking the sum of its main diagonal entries.
- **C)** By calculating its determinant.
- **D)** By summing all the entries in the matrix.

2. Which of the following is a true property regarding the trace operation?
- **A)** $\text{tr}(A + B) = \text{tr}(A) \cdot \text{tr}(B)$
- **B)** $\text{tr}(A^T) = -\text{tr}(A)$
- **C)** $\text{tr}(AB) = \text{tr}(BA)$
- **D)** $\text{tr}(cA) = c + \text{tr}(A)$

3. Does the trace operation distribute over matrix multiplication, meaning does $\text{tr}(AB) = \text{tr}(A) \cdot \text{tr}(B)$?
- **A)** Yes, this is a fundamental property of the trace.
- **B)** Yes, but only for diagonal matrices.
- **C)** No, this is a common pitfall and is generally false.
- **D)** No, because the trace is only defined for non-square matrices.

### Answer Key & Explanations
1. **B)** The trace of a square matrix $A$ is defined as the sum of its main diagonal entries ($\sum a_{ii}$).
2. **C)** The trace is cyclic, meaning the trace of a product is invariant under cyclic permutations, so $\text{tr}(AB) = \text{tr}(BA)$.
3. **C)** A common pitfall is incorrectly assuming that the trace distributes over multiplication. $\text{tr}(AB) \neq \text{tr}(A) \cdot \text{tr}(B)$ in general.

## References & Navigation

- **Previous Topic:** [[Symmetric Matrix]]
- **Next Topic:** [[Transpose of a Matrix]]
- **Related Notes:** [[Skew-Symmetric Matrix]], [[Upper Triangular Matrix]], [[Matrices Detailed]]
