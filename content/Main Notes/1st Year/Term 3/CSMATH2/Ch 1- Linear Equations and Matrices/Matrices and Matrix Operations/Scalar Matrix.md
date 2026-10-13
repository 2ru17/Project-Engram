---
id: Scalar-Matrix
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Scalar Matrix

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Definition: A Diagonal Matrix whose main diagonal entries are all equal is called a scalar matrix. (Handout 2, Page 4)

## Key Concepts
 Definition

## Details / Theory
 **Definition:** A [[Diagonal Matrix]] whose main diagonal entries are all equal is called a **scalar matrix**. (Handout 2, Page 4)
So, aij​=0 for i=j, and aii​=k for some constant k. Example:
  S=[−2​0​0 0​−2​0 0​0​−2​]
  (Handout 2, Page 4, modified example)
A scalar matrix can be written as kIn​, where In​ is the identity matrix.

## Common Pitfalls
 A scalar matrix $kI$ commutes with every matrix of the same size: $kI \cdot A = A \cdot kI = kA$. Don’t confuse scalar multiplication ($kA$) with the scalar matrix ($kI$) — they are related but different concepts.

## Summary

> TL;DR — A scalar matrix is $kI$ — a diagonal matrix with identical diagonal entries. It acts like scalar multiplication when multiplied with any matrix: $kI \cdot A = kA$.

## Review Questions

_To be added._

## Links
 **Related:** - [[Diagonal Matrix]] **Source / Reference:**

## Multiple Choice Questions

1. What defines a scalar matrix?
    - **A)** A diagonal matrix whose main diagonal entries are all equal.
    - **B)** Any square matrix with at least one zero.
    - **C)** An identity matrix multiplied by a negative number.
    - **D)** A matrix composed entirely of ones.

2. How can a scalar matrix with diagonal entries $k$ be written using the identity matrix $I_n$?
    - **A)** $I_n + k$
    - **B)** $k I_n$
    - **C)** $I_n / k$
    - **D)** $I_n - k$

3. What is a key property of a scalar matrix $kI$ when multiplied by any matrix $A$ of the same size?
    - **A)** It always yields the zero matrix $O$.
    - **B)** It always yields the identity matrix $I$.
    - **C)** It commutes with $A$, meaning $kI \cdot A = A \cdot kI = kA$.
    - **D)** It only commutes if $A$ is also a scalar matrix.

### Answer Key & Explanations
1. **A)** The definition states that a scalar matrix is a diagonal matrix where all main diagonal entries are equal to a constant $k$.
2. **B)** A scalar matrix is algebraically represented as the scalar $k$ multiplied by the identity matrix $I_n$, written as $kI_n$.
3. **C)** The summary notes that a scalar matrix commutes with every matrix of the same size, essentially performing scalar multiplication on the entire matrix $A$.

## References & Navigation

- **Previous Topic:** [[Row Matrix]]
- **Next Topic:** [[Scalar Multiplication]]
- **Related Notes:** [[Types of Matrices]], [[Powers of a Matrix]], [[Matrices Detailed]]
