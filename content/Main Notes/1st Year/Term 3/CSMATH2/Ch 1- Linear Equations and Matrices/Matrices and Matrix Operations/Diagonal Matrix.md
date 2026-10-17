---
id: Diagonal-Matrix
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Diagonal Matrix

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Definition: An n×n matrix A=[aij​] is called a diagonal matrix if all its non-diagonal entries are zero, i.e., aij​=0 for i=j. (Handout 2, Page 4)

## Key Concepts
 Definition

## Details / Theory
 **Definition:** An n×n matrix A=[aij​] is called a **diagonal matrix** if all its non-diagonal entries are zero, i.e., aij​=0 for i=j. (Handout 2, Page 4) Example:
  D=[1​0​0 0​−5​0 0​0​3​]
  (Handout 2, Page 4, modified example)
_**Personal Note:**_ _Only the main diagonal entries can be non-zero, but they can also be zero._

## Common Pitfalls
 A diagonal matrix can have zeros on the diagonal — "diagonal" means off-diagonal entries are zero, not that diagonal entries are nonzero. Diagonal matrices are a special case of both upper and lower triangular.

## Summary

> TL;DR — A diagonal matrix is a square matrix where $a_{ij} = 0$ for $i \neq j$. Only the main diagonal can have nonzero entries. Diagonal matrices commute and are easy to compute with.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. What defines an $n \times n$ matrix $A = [a_{ij}]$ as a diagonal matrix?
- **A)** All its entries are zero.
- **B)** All its non-diagonal entries are zero, meaning $a_{ij} = 0$ for $i \neq j$.
- **C)** All its main diagonal entries are non-zero, meaning $a_{ij} \neq 0$ for $i = j$.
- **D)** All entries above the main diagonal are zero.

2. Is it possible for a diagonal matrix to have zero entries on its main diagonal?
- **A)** No, the main diagonal must consist entirely of non-zero numbers.
- **B)** Yes, the definition only requires that non-diagonal entries are zero.
- **C)** No, if there is a zero on the main diagonal, it becomes a zero matrix.
- **D)** Yes, but only if all off-diagonal entries are non-zero.

3. How does a diagonal matrix relate to triangular matrices?
- **A)** A diagonal matrix is neither upper nor lower triangular.
- **B)** A diagonal matrix is a special case of an upper triangular matrix only.
- **C)** A diagonal matrix is a special case of a lower triangular matrix only.
- **D)** A diagonal matrix is a special case of both upper and lower triangular matrices.

### Answer Key & Explanations
1. **B)** By definition, a matrix is a diagonal matrix if all its non-diagonal entries are zero ($a_{ij} = 0$ for $i \neq j$).
2. **B)** A common pitfall is thinking diagonal entries must be non-zero. A diagonal matrix can indeed have zeros on the diagonal; only the off-diagonal entries must strictly be zero.
3. **D)** Because all off-diagonal entries are zero, a diagonal matrix satisfies the conditions for both upper and lower triangular matrices.

## References & Navigation

- **Previous Topic:** [[Definition of a Matrix]]
- **Next Topic:** [[Elementary Matrices]]
- **Related Notes:** [[Triangular Matrices]], [[Lower Triangular Matrix]], [[Matrices Detailed]]
