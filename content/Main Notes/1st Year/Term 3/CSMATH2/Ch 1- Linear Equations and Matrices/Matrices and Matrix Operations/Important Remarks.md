---
id: Important-Remarks
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Important Remarks

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Zero Product: AB=O (the zero matrix) does not necessarily imply that A=O or B=O. (Handout 2, Page 10)

## Key Concepts
 Zero Product Cancellation Law

## Details / Theory
 **Zero Product:** AB=O (the zero matrix) does **not** necessarily imply that A=O or B=O. (Handout 2, Page 10)
Example: A=[1​1 2​2​], B=[1​−1 −1​1​].
    Then AB=[1(1)+1(−1)​1(−1)+1(1) 2(1)+2(−1)​2(−1)+2(1)​]=[0​0 0​0​]=O, but A=O and B=O.
    (Example based on Handout 2, Page 10, values adjusted for clarity) **Cancellation Law:** The cancellation law does **not** generally hold for matrix multiplication. That is, AB=AC does **not** always imply B=C, even if A=O. (Handout 2, Page 11)
Example: Let A=[1​2 2​4​], B=[2​1 3​2​], C=[−2​7 5​−1​].
    AB=[1​2 2​4​][2​1 3​2​]=[8​5 16​10​]
    AC=[1​2 2​4​][−2​7 5​−1​]=[8​5 16​10​]
    So AB=AC, but B=C. (Handout 2, Page 11)

## Common Pitfalls
 Applying real-number algebra rules (like cancellation) to matrices without verifying they hold. Forgetting that matrix multiplication order matters.

## Summary

> TL;DR — Matrix algebra differs from real-number algebra: no cancellation law, no zero-product property, and multiplication is not commutative.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**

## Multiple Choice Questions

1. In matrix algebra, if the product of two matrices $AB = O$ (where $O$ is the zero matrix), what can logically be concluded?
    - **A)** Either $A = O$ or $B = O$.
    - **B)** Both $A$ and $B$ must be zero matrices.
    - **C)** Neither $A$ nor $B$ necessarily has to be the zero matrix.
    - **D)** At least one of the matrices must be an identity matrix.

2. How does the cancellation law behave in standard matrix multiplication?
    - **A)** It always holds; if $AB = AC$, then $B = C$.
    - **B)** It only holds when both $B$ and $C$ are zero matrices.
    - **C)** It holds as long as matrix $A$ is not the zero matrix.
    - **D)** It generally does not hold; $AB = AC$ does not guarantee that $B = C$.

3. Which of the following describes a common pitfall when first learning matrix algebra?
    - **A)** Applying real-number algebra rules like cancellation without verifying they hold for matrices.
    - **B)** Assuming that all zero matrices have the same dimensions.
    - **C)** Overcomplicating matrix addition by checking dimensions.
    - **D)** Using the identity matrix to test for associativity.

### Answer Key & Explanations
1. **C)** The zero product property from real numbers does not apply. $AB = O$ does not necessarily imply that $A = O$ or $B = O$.
2. **D)** The cancellation law does not generally hold for matrix multiplication, meaning $AB = AC$ does not always imply $B = C$, even if $A$ is not the zero matrix.
3. **A)** A common pitfall is treating matrices like real numbers and falsely assuming that properties like commutativity and the cancellation law apply.

## References & Navigation

- **Previous Topic:** [[Identity Matrix]]
- **Next Topic:** [[Inverse of a Matrix]]
- **Related Notes:** [[Diagonal Matrix]], [[Inverse of a Matrix]]
