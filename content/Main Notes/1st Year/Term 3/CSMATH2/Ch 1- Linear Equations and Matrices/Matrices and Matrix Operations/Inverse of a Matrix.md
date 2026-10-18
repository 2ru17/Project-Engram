---
id: Inverse-of-a-Matrix
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Inverse of a Matrix

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Inverse Matrix]] #[[Square Matrix]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> The inverse of a square matrix $A$ is a matrix $A^{-1}$ such that $AA^{-1} = A^{-1}A = I$. Not all square matrices are invertible.

## Key Concepts
 Only **square** matrices can have inverses $A$ is invertible (nonsingular) iff $\det(A) \neq 0$ If $A^{-1}$ exists, it is unique Computed via Gauss-Jordan: $[A | I] \to [I | A^{-1}]$

## Details / Theory

### Definition

An $n \times n$ matrix $A$ is **invertible** (nonsingular) if there exists an $n \times n$ matrix $A^{-1}$ such that:

$$AA^{-1} = A^{-1}A = I_n$$

If no such matrix exists, $A$ is **singular** (not invertible).

### [[Nonsingular Matrix]]

A matrix is nonsingular (invertible) iff:
 $\det(A) \neq 0$ $A$ row-reduces to $I$ The system $A\mathbf{x} = \mathbf{b}$ has a unique solution for every $\mathbf{b}$

### $2 \times 2$ Formula

For $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$ with $\det(A) = ad - bc \neq 0$:

$$A^{-1} = \frac{1}{ad - bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$$

### Gauss-Jordan Method (General)

1. Form the augmented matrix $[A \mid I]$
2. Apply [[Elementary Row Operation|elementary row operations]] to reduce $A$ to $I$
3. The right side becomes $A^{-1}$: $[A \mid I] \to [I \mid A^{-1}]$

### Stepped Calculation Trace: $3 \times 3$ Gauss-Jordan Inversion

Find $A^{-1}$ for:
$$
A = \begin{bmatrix} 1 & 2 & 3 \\ 2 & 5 & 3 \\ 1 & 0 & 8 \end{bmatrix}
$$

#### Step 1: Augment $A$ with $I_3$
$$
[A \mid I] = \left[\begin{array}{ccc|ccc}
1 & 2 & 3 & 1 & 0 & 0 \\
2 & 5 & 3 & 0 & 1 & 0 \\
1 & 0 & 8 & 0 & 0 & 1
\end{array}\right]
$$

#### Step 2: Forward Elimination (Create Zeroes Below Pivot 1)
Perform $R_2 \leftarrow R_2 - 2R_1$ and $R_3 \leftarrow R_3 - R_1$:
$$
\left[\begin{array}{ccc|ccc}
1 & 2 & 3 & 1 & 0 & 0 \\
0 & 1 & -3 & -2 & 1 & 0 \\
0 & -2 & 5 & -1 & 0 & 1
\end{array}\right]
$$

#### Step 3: Eliminate Below Pivot 2
Perform $R_3 \leftarrow R_3 + 2R_2$:
$$
\left[\begin{array}{ccc|ccc}
1 & 2 & 3 & 1 & 0 & 0 \\
0 & 1 & -3 & -2 & 1 & 0 \\
0 & 0 & -1 & -5 & 2 & 1
\end{array}\right]
$$

#### Step 4: Normalize Pivot 3
Perform $R_3 \leftarrow -1 \cdot R_3$:
$$
\left[\begin{array}{ccc|ccc}
1 & 2 & 3 & 1 & 0 & 0 \\
0 & 1 & -3 & -2 & 1 & 0 \\
0 & 0 & 1 & 5 & -2 & -1
\end{array}\right]
$$

#### Step 5: Back-Substitution (Clear Column 3 Above Pivot 3)
Perform $R_2 \leftarrow R_2 + 3R_3$ and $R_1 \leftarrow R_1 - 3R_3$:
- New $R_2 = [0, 1, 0 \mid -2 + 15, 1 - 6, 0 - 3] = [0, 1, 0 \mid 13, -5, -3]$
- New $R_1 = [1, 2, 0 \mid 1 - 15, 0 + 6, 0 + 3] = [1, 2, 0 \mid -14, 6, 3]$

$$
\left[\begin{array}{ccc|ccc}
1 & 2 & 0 & -14 & 6 & 3 \\
0 & 1 & 0 & 13 & -5 & -3 \\
0 & 0 & 1 & 5 & -2 & -1
\end{array}\right]
$$

#### Step 6: Clear Column 2 Above Pivot 2
Perform $R_1 \leftarrow R_1 - 2R_2$:
- New $R_1 = [1, 0, 0 \mid -14 - 26, 6 - 2(-5), 3 - 2(-3)] = [1, 0, 0 \mid -40, 16, 9]$

$$
[I \mid A^{-1}] = \left[\begin{array}{ccc|ccc}
1 & 0 & 0 & -40 & 16 & 9 \\
0 & 1 & 0 & 13 & -5 & -3 \\
0 & 0 & 1 & 5 & -2 & -1
\end{array}\right]
$$

Thus, the inverse is:
$$
A^{-1} = \begin{bmatrix} -40 & 16 & 9 \\ 13 & -5 & -3 \\ 5 & -2 & -1 \end{bmatrix}
$$

#### Verification Check: $A \cdot A^{-1} = I_3$
$$
A A^{-1} = \begin{bmatrix} 1 & 2 & 3 \\ 2 & 5 & 3 \\ 1 & 0 & 8 \end{bmatrix} \begin{bmatrix} -40 & 16 & 9 \\ 13 & -5 & -3 \\ 5 & -2 & -1 \end{bmatrix} = \begin{bmatrix} -40 + 26 + 15 & 16 - 10 - 6 & 9 - 6 - 3 \\ -80 + 65 + 15 & 32 - 25 - 6 & 18 - 15 - 3 \\ -40 + 0 + 40 & 16 + 0 - 16 & 9 + 0 - 8 \end{bmatrix} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix} = I_3
$$

### Properties

| Property                   | Formula                                        |
| -------------------------- | ---------------------------------------------- |
| Inverse of inverse         | $(A^{-1})^{-1} = A$                            |
| Inverse of product         | $(AB)^{-1} = B^{-1}A^{-1}$                     |
| Inverse of transpose       | $(A^T)^{-1} = (A^{-1})^T$                      |
| Inverse of scalar multiple | $(kA)^{-1} = \frac{1}{k}A^{-1}$ for $k \neq 0$ |

## Common Pitfalls
 Assuming all square matrices are invertible — check $\det(A) \neq 0$. Forgetting reverse order in $(AB)^{-1} = B^{-1}A^{-1}$. Non-square matrices never have a (two-sided) inverse.

## Summary

> TL;DR — $A^{-1}$ satisfies $AA^{-1} = I$. Exists iff $\det(A) \neq 0$. For $2 \times 2$, use the formula. For larger matrices, use Gauss-Jordan ($[A|I] \to [I|A^{-1}]$). Product inverse reverses order.

## Review Questions

1. If $A$ is an invertible matrix and $AB = AC$, prove that $B = C$.
   - **Proof:** Left-multiply both sides by $A^{-1}$: $A^{-1}(AB) = A^{-1}(AC) \implies (A^{-1}A)B = (A^{-1}A)C \implies IB = IC \implies B = C$.
2. Explain why the inverse of an upper triangular matrix must also be an upper triangular matrix.
   - **Explanation:** During Gauss-Jordan elimination on $[U \mid I]$, all operations performed to reduce $U$ to $I$ involve scaling rows and clearing entries above the diagonal pivots. Applying these row additions strictly from bottom to top preserves all zeroes below the main diagonal in the right-hand identity block, yielding an upper triangular inverse.
3. Why does a matrix with a row of all zeros have no inverse?
   - **Explanation:** If matrix $A$ has a zero row, then for any matrix $B$, the product $AB$ will also have a corresponding row of all zeros. Since the identity matrix $I$ has $1$s on the diagonal and no zero rows, $AB = I$ can never be satisfied.

## Links
 **Related:** [[Nonsingular Matrix]] — [[Elementary Row Operation]] — [[Elementary Matrices]] — [[Matrix Multiplication]] — [[Identity Matrix]] — [[Special Types of Square Matrices]] **Source / Reference:**

## Multiple Choice Questions

1. What is the fundamental property of the inverse matrix $A^{-1}$ with respect to a square matrix $A$?
    - **A)** $A + A^{-1} = I$
    - **B)** $AA^{-1} = A^{-1}A = I$
    - **C)** $A - A^{-1} = O$
    - **D)** $AA^{-1} = O$

2. What condition must be met for a square matrix $A$ to be invertible (nonsingular)?
    - **A)** Its determinant must be equal to zero.
    - **B)** Its determinant must not be equal to zero ($\det(A) \neq 0$).
    - **C)** It must be equivalent to the zero matrix.
    - **D)** It must have a trace of zero.

3. For a $2 \times 2$ matrix $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$, what is the explicit formula for its inverse?
    - **A)** $\begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$
    - **B)** $\frac{1}{ad - bc} \begin{bmatrix} d & c \\ b & a \end{bmatrix}$
    - **C)** $\frac{1}{ad - bc} \begin{bmatrix} a & -b \\ -c & d \end{bmatrix}$
    - **D)** $\frac{1}{ad - bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$

4. How is the inverse of a matrix product $(AB)^{-1}$ calculated?
    - **A)** $A^{-1}B^{-1}$
    - **B)** $B^{-1}A^{-1}$
    - **C)** $A^T B^T$
    - **D)** $I - AB$

5. According to the properties of matrix inverses, what is the inverse of a scalar multiple $(kA)^{-1}$ assuming $k \neq 0$?
    - **A)** $k A^{-1}$
    - **B)** $-k A^{-1}$
    - **C)** $\frac{1}{k} A^{-1}$
    - **D)** $A^{-1} + k$

6. In the Gauss-Jordan method for finding the inverse of a matrix $A$, what is the initial setup?
    - **A)** Form the augmented matrix $[A \mid O]$
    - **B)** Form the augmented matrix $[I \mid A]$
    - **C)** Form the augmented matrix $[A \mid I]$
    - **D)** Form the augmented matrix $[A^T \mid I]$

7. What is the expected final outcome of applying row operations in the Gauss-Jordan method to find an inverse?
    - **A)** The matrix transforms into $[I \mid A^{-1}]$
    - **B)** The matrix transforms into $[A^{-1} \mid I]$
    - **C)** The matrix transforms into $[A \mid A^{-1}]$
    - **D)** The matrix transforms into $[I \mid O]$

8. Which of the following statements about non-square matrices is true?
    - **A)** They always have a unique two-sided inverse.
    - **B)** They can be inverted using the Gauss-Jordan method.
    - **C)** They never have a (two-sided) inverse.
    - **D)** Their inverse is defined by their transpose.

9. If a matrix $A$ is invertible, how many unique inverse matrices does it possess?
    - **A)** Infinitely many
    - **B)** Exactly two
    - **C)** Exactly one
    - **D)** Zero

10. What is the relationship between the transpose and the inverse of a matrix?
    - **A)** $(A^T)^{-1} = A^T$
    - **B)** $(A^T)^{-1} = (A^{-1})^T$
    - **C)** $(A^{-1})^T = I$
    - **D)** $(A^T)^{-1} = A$

### Answer Key & Explanations

1. **B**. The defining property of an inverse matrix is that multiplying it by the original matrix in either order yields the identity matrix: $AA^{-1} = A^{-1}A = I$.
2. **B**. A matrix is invertible (nonsingular) if and only if its determinant is non-zero ($\det(A) \neq 0$).
3. **D**. The correct formula scales the swapped/negated elements by the reciprocal of the determinant: $\frac{1}{ad - bc} \begin{bmatrix} d & -b \\ -c & a \end{bmatrix}$.
4. **B**. A common pitfall is forgetting the reverse order property: $(AB)^{-1} = B^{-1}A^{-1}$.
5. **C**. The inverse of a scalar multiple of a matrix $A$ requires dividing the inverse by the scalar: $(kA)^{-1} = \frac{1}{k}A^{-1}$.
6. **C**. The Gauss-Jordan method begins by augmenting the original matrix with the identity matrix of the same size: $[A \mid I]$.
7. **A**. After reducing the left side $A$ to the identity matrix $I$, the right side becomes the inverse: $[I \mid A^{-1}]$.
8. **C**. Only square matrices can be invertible; non-square matrices never have a two-sided inverse.
9. **C**. If an inverse matrix exists, it is unique.
10. **B**. A property of matrix inversion is that taking the inverse of a transpose is the same as taking the transpose of the inverse: $(A^T)^{-1} = (A^{-1})^T$.

## References & Navigation

- **Previous Topic:** [[Important Remarks]]
- **Next Topic:** [[Lower Triangular Matrix]]
- **Related Notes:** [[Scalar Matrix]], [[Matrix Addition]], [[Matrices Detailed]]
