---
id: Properties-of-Matrix-Operations
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Properties of Matrix Operations

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Let $A,B,C$ be matrices of appropriate sizes, $O$ be the zero matrix, and $r,s$ be scalars.

## Details / Theory

Let $A,B,C$ be matrices of appropriate sizes, $O$ be the zero matrix, and $r,s$ be scalars.

**[[Matrix Addition]] Properties:**

1. **Commutative:** $A+B=B+A$ (Handout 1, Page 13)
2. **Associative:** $(A+B)+C=A+(B+C)$ (Handout 1, Page 15)
3. **Additive Identity:** $A+O=A$ (Handout 1, Page 16)
4. **Additive Inverse:** For each $A$, there exists a unique matrix $-A$ such that $A+(-A)=O$. (Handout 1, Page 17)

**[[Scalar Multiplication]] Properties:**

1. **Associative:** $(rs)A=r(sA)$ (Handout 1, Page 18)
2. **Distributive:** $r(A+B)=rA+rB$ and $(r+s)A=rA+sA$ (Handout 1, Page 19)
3. **Scalar Identity/Zero:** $1A=A$, $0A=O$, $rO=O$ (Handout 1, Page 20)

**[[Matrix Multiplication]] Properties:**

1. **Associative:** $(AB)C=A(BC)$ (Provided sizes are compatible) (Handout 1, Page 23)
_**PN:**_ _Associativity means we can group multiplications, but we cannot change the order._

2. **Distributive:** $A(B+C)=AB+AC$ (Left) and $(A+B)C=AC+BC$ (Right) (Provided sizes are compatible) (Handout 1, Page 24)
3. **Scalar Interaction:** $(rA)B=r(AB)=A(rB)$ (Handout 1, Page 26)

**[[Transpose of a Matrix]] Properties:**

1. **Transpose of Sum:** $(A+B)^T=A^T+B^T$ (Handout 1, Page 29)
2. **Transpose of Product:** $(AB)^T=B^T A^T$ (Note the reversal of order!) (Handout 1, Page 29)
_**PN:**_ _This reversal of order for the transpose of a product is extremely important and often tested._

3. **Transpose of Transpose:** $(A^T)^T=A$ (Handout 1, Page 29)
4. **Transpose of Scalar Multiple:** $(rA)^T=rA^T$ (Handout 1, Page 29)

## Common Pitfalls

Matrix multiplication is NOT commutative: $AB \neq BA$ in general.
$(A + B)^2 \neq A^2 + 2AB + B^2$ unless $AB = BA$.
$(AB)^T = B^T A^T$ — note the reversed order.

## Summary

> TL;DR — Matrix operations are associative and distributive but multiplication is not commutative. Transpose reverses product order. These properties underpin all matrix algebra proofs.

## Review Questions

_To be added._

## Links

**Related:** - [[Matrix Addition]] - [[Scalar Multiplication]] - [[Matrix Multiplication]] - [[Transpose of a Matrix]]
**Source / Reference:**

## Multiple Choice Questions

1. Which property asserts that for matrix addition, $A + B = B + A$?
    - **A)** The Associative Property
    - **B)** The Commutative Property
    - **C)** The Distributive Property
    - **D)** The Transpose Property

2. What is the additive identity matrix that satisfies $A + O = A$?
    - **A)** The Identity matrix $I$
    - **B)** The Inverse matrix $A^{-1}$
    - **C)** The Zero matrix $O$
    - **D)** The Transpose matrix $A^T$

3. What does the associative property of matrix multiplication mathematically state?
    - **A)** $A(B + C) = AB + AC$
    - **B)** $AB = BA$
    - **C)** $(AB)C = A(BC)$
    - **D)** $(A+B)+C = A+(B+C)$

4. According to the distributive properties for matrices, what is the correct right-distributive expansion of $(A+B)C$?
    - **A)** $CA + CB$
    - **B)** $AC + BC$
    - **C)** $AB + C$
    - **D)** $A + BC$

5. How does a scalar $r$ interact within matrix multiplication $(rA)B$?
    - **A)** $(rA)B = r(A+B)$
    - **B)** $(rA)B = rA + rB$
    - **C)** $(rA)B = r(AB) = A(rB)$
    - **D)** $(rA)B = AB^r$

6. What is the result of taking the transpose of a sum, $(A + B)^T$?
    - **A)** $A^T + B^T$
    - **B)** $B^T A^T$
    - **C)** $(AB)^T$
    - **D)** $A + B$

7. What is the crucial property to remember regarding the transpose of a matrix product, $(AB)^T$?
    - **A)** The order remains the same: $A^T B^T$.
    - **B)** The transpose is distributed: $A^T + B^T$.
    - **C)** The order is reversed: $B^T A^T$.
    - **D)** The product becomes symmetric.

8. What is the result of taking the transpose of a transpose, $(A^T)^T$?
    - **A)** The inverse matrix $A^{-1}$
    - **B)** The zero matrix $O$
    - **C)** The original matrix $A$
    - **D)** The identity matrix $I$

9. How is the transpose of a scalar multiple $(rA)^T$ correctly computed?
    - **A)** $r^T A^T$
    - **B)** $r A^T$
    - **C)** $\frac{1}{r} A^T$
    - **D)** $-r A^T$

10. Which statement outlines a common pitfall regarding the binomial expansion $(A+B)^2$ for matrices?
    - **A)** Assuming it cannot be computed.
    - **B)** Assuming it equals $A^2 + 2AB + B^2$ without confirming that $A$ and $B$ commute.
    - **C)** Expanding it into $A^2 + B^2$.
    - **D)** Using the distributive property to find $A^2 - B^2$.

### Answer Key & Explanations
1. **B)** The commutative property for matrix addition means that the order of the matrices being added does not affect the sum.
2. **C)** The zero matrix $O$ acts as the additive identity, much like the number 0 in standard arithmetic.
3. **C)** The associative property means you can group the multiplications differently without changing the result, provided the order is maintained.
4. **B)** Because matrix multiplication is not commutative, right-distributing $C$ means $C$ must remain on the right side of both $A$ and $B$, giving $AC + BC$.
5. **C)** The scalar interaction property shows that a scalar can be moved freely around the matrix product.
6. **A)** The transpose of a sum simply distributes over the addition without any complex changes: $A^T + B^T$.
7. **C)** A highly tested property and common pitfall is that the transpose of a product requires reversing the order of the matrices: $(AB)^T = B^T A^T$.
8. **C)** Transposing a matrix twice restores it to its original form.
9. **B)** A scalar is just a number and is not affected by the transpose operation, so $(rA)^T = rA^T$.
10. **B)** Because $AB$ is not necessarily equal to $BA$, the cross terms $AB + BA$ cannot usually be simplified to $2AB$.

## References & Navigation

- **Previous Topic:** [[Powers of a Matrix]]
- **Next Topic:** [[Row Matrix]]
- **Related Notes:** [[Upper Triangular Matrix]], [[Identity Matrix]], [[Matrices Detailed]]
