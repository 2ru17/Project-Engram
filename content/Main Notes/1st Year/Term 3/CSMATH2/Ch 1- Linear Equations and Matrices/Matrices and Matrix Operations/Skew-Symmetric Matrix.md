---
id: Skew-Symmetric-Matrix
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Skew-Symmetric Matrix

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Definition: A square matrix A is called skew-symmetric (or antisymmetric) if A⊤=−A. (Handout 2, Page 7)

## Key Concepts
 Definition Consequence for Diagonal Entries Remarks

## Details / Theory

## Antisymmetric Matrix
 **Definition:** A square matrix A is called **skew-symmetric** (or antisymmetric) if A⊤=−A. (Handout 2, Page 7)
This means aij​=−aji​ for all i,j. **Consequence for Diagonal Entries:** If i=j, then aii​=−aii​, which implies 2aii​=0, so aii​=0. All main diagonal entries of a skew-symmetric matrix must be zero. (Handout 2, Page 7 "Remarks") Example:
  B=[0​2​3 −2​0​−4 −3​4​0​]
  (Handout 2, Page 7) **Remarks:** (Handout 2, Page 7)
If A is skew-symmetric, it must be a square matrix.

## Common Pitfalls
 All diagonal entries of a skew-symmetric matrix must be zero ($a_{ii} = -a_{ii} \Rightarrow a_{ii} = 0$). In real matrices only; complex skew-Hermitian is the generalization.

## Summary

> TL;DR — Skew-symmetric: $A^T = -A$, meaning $a_{ij} = -a_{ji}$ and diagonal entries are zero. Any square matrix can be decomposed into symmetric + skew-symmetric parts.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. What is the fundamental condition that defines a skew-symmetric (or antisymmetric) matrix $A$?
- **A)** $A^T = A$
- **B)** $A^T = -A$
- **C)** $A = -A$
- **D)** $A^T = A^{-1}$

2. In terms of individual matrix entries, what does the condition for a skew-symmetric matrix mean?
- **A)** $a_{ij} = a_{ji}$ for all $i, j$
- **B)** $a_{ij} = -a_{ji}$ for all $i, j$
- **C)** $a_{ij} = 0$ for all $i 
eq j$
- **D)** $a_{ii} = 1$ for all $i$

3. What must definitively be true about the main diagonal entries ($a_{ii}$) of a skew-symmetric matrix?
- **A)** They must all be exactly one.
- **B)** They must all be exactly zero.
- **C)** They must equal their corresponding row index.
- **D)** They can be any real number.

### Answer Key & Explanations
1. **B)** A square matrix is skew-symmetric if taking its transpose yields the negative of the original matrix, i.e., $A^T = -A$.
2. **B)** The condition $A^T = -A$ translates to the entry-wise requirement that every element $a_{ij}$ must equal the negative of its symmetric counterpart $a_{ji}$.
3. **B)** Because $a_{ii} = -a_{ii}$, it implies $2a_{ii} = 0$, which strictly means all main diagonal entries must be zero.

## References & Navigation

- **Previous Topic:** [[Size & Dimension of a Matrix]]
- **Next Topic:** [[Special Types of Square Matrices]]
- **Related Notes:** [[Matrix Multiplication]], [[Nonsingular Matrix]], [[Matrices Detailed]]
