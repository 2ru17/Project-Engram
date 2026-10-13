---
id: Elementary-Row-Operation
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# Elementary Row Operation

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Inverse Matrix]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

Elementary row operations (EROs) are the three fundamental transformations used to manipulate matrices during Gaussian elimination and Gauss-Jordan reduction. EROs preserve the solution set of linear systems while transforming matrices into Row Echelon Form (REF) and Reduced Row Echelon Form (RREF).

## Key Concepts

- **Three Types:** Row interchange, nonzero scalar multiplication, and row addition.
- **Echelon Forms:** Used systematically to reach Row Echelon Form (REF) and Reduced Row Echelon Form (RREF).
- **Reversibility:** Every ERO is invertible via an inverse ERO of the same type.
- **Algebraic Equivalence:** Each ERO corresponds strictly to left-multiplication by an [[Elementary Matrices|elementary matrix]] $E$.

## Details / Theory

### The Three Elementary Row Operations

| Type | Notation | Description | Inverse Operation |
| :--- | :--- | :--- | :--- |
| **Row Interchange** | $R_i \leftrightarrow R_j$ | Swap rows $i$ and $j$ | $R_i \leftrightarrow R_j$ |
| **Row Scaling** | $k R_i \to R_i$ ($k \ne 0$) | Multiply row $i$ by nonzero scalar $k$ | $\frac{1}{k} R_i \to R_i$ |
| **Row Addition** | $R_i + k R_j \to R_i$ | Add $k$ times row $j$ to row $i$ | $R_i - k R_j \to R_i$ |

---

### Stepped Calculation Trace: Full Reduction to REF and RREF

Consider the matrix:
$$
A = \begin{bmatrix} 1 & 2 & 3 \\ 2 & 5 & 7 \\ 3 & 5 & 8 \end{bmatrix}
$$

#### Step 1: Forward Elimination (Clear Column 1 Below Pivot 1)
Perform $R_2 \leftarrow R_2 - 2R_1$ and $R_3 \leftarrow R_3 - 3R_1$:
$$
\begin{bmatrix} 1 & 2 & 3 \\ 2 & 5 & 7 \\ 3 & 5 & 8 \end{bmatrix} \xrightarrow{R_2 - 2R_1} \begin{bmatrix} 1 & 2 & 3 \\ 0 & 1 & 1 \\ 3 & 5 & 8 \end{bmatrix} \xrightarrow{R_3 - 3R_1} \begin{bmatrix} 1 & 2 & 3 \\ 0 & 1 & 1 \\ 0 & -1 & -1 \end{bmatrix}
$$

#### Step 2: Clear Column 2 Below Pivot 2 (Row Echelon Form)
Perform $R_3 \leftarrow R_3 + R_2$:
$$
\begin{bmatrix} 1 & 2 & 3 \\ 0 & 1 & 1 \\ 0 & -1 & -1 \end{bmatrix} \xrightarrow{R_3 + R_2} \begin{bmatrix} 1 & 2 & 3 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \end{bmatrix}
$$
*Observation:* This matrix is now in **Row Echelon Form (REF)**.
- Pivot columns: Column 1 and Column 2.
- Rank: $\text{rank}(A) = 2$.
- Free variable: Column 3 ($x_3 = t$).

#### Step 3: Back-Elimination (Reduced Row Echelon Form - RREF)
Clear entry above Pivot 2 in Column 2 by performing $R_1 \leftarrow R_1 - 2R_2$:
$$
\begin{bmatrix} 1 & 2 & 3 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \end{bmatrix} \xrightarrow{R_1 - 2R_2} \begin{bmatrix} 1 & 0 & 1 \\ 0 & 1 & 1 \\ 0 & 0 & 0 \end{bmatrix}
$$
*Observation:* This is the unique **Reduced Row Echelon Form (RREF)**.
- System equations for null space $A\mathbf{x} = \mathbf{0}$:
  $$
  x_1 + x_3 = 0 \implies x_1 = -t
  $$
  $$
  x_2 + x_3 = 0 \implies x_2 = -t
  $$
  $$
  x_3 = t
  $$
- Solution vector: $\mathbf{x} = t \begin{bmatrix} -1 \\ -1 \\ 1 \end{bmatrix}$ (Nullity = $3 - 2 = 1$).

---

### Connection to Elementary Matrices

Performing an ERO on $A$ is algebraically identical to multiplying $A$ on the left by an elementary matrix $E$, where $E$ is formed by applying the identical ERO to the identity matrix $I$:
$$
\text{ERO}(A) = E \cdot A
$$
If a matrix $A$ reduces to $I$ via a sequence of EROs $E_k \dots E_2 E_1 A = I$, then:
$$
A^{-1} = E_k \dots E_2 E_1
$$

## Common Pitfalls

- **Multiplying by Zero:** Scaling a row by $0$ destroys dimensional information and is **never** a valid ERO.
- **Column Operations Confusion:** Standard Gaussian elimination uses exclusively **row** operations; mixing row and column operations alters the solution set of linear systems.
- **Directional Target Error:** In $R_i + kR_j \to R_i$, the target row being overwritten is $R_i$, never $R_j$.

## Summary

> Elementary row operations (swap, scale, and add multiple) transform matrices into REF and RREF without altering the solution spaces of corresponding linear systems. Every ERO corresponds to left-multiplication by an invertible elementary matrix.

## Review Questions

1. Why does an elementary row operation never alter the solution set of a linear system $A\mathbf{x} = \mathbf{b}$?
   - **Answer:** Because each elementary row operation corresponds to left-multiplication by an invertible elementary matrix $E$. Since $E$ is nonsingular, $A\mathbf{x} = \mathbf{b} \iff E A \mathbf{x} = E \mathbf{b}$ via reversible bi-implication.
2. What distinguishes Row Echelon Form (REF) from Reduced Row Echelon Form (RREF)?
   - **Answer:** In REF, all entries below each leading pivot are zero. In RREF, every leading pivot must be 1, and it must be the *only* non-zero entry in its entire column (all entries both above and below the pivot are zero).
3. How does row interchange affect the determinant of a square matrix?
   - **Answer:** Swapping two rows ($R_i \leftrightarrow R_j$) negates the determinant: $\det(E \cdot A) = -\det(A)$.

---

## Multiple Choice Questions

1. Which of the following is NOT a valid elementary row operation?
    - **A)** Multiplying a row by a nonzero scalar.
    - **B)** Adding a multiple of one row to another row.
    - **C)** Swapping the positions of two rows.
    - **D)** Multiplying a row by zero.

2. Performing an elementary row operation on matrix $A$ is equivalent to which algebraic operation?
    - **A)** Adding an elementary matrix to $A$.
    - **B)** Left-multiplying $A$ by the corresponding elementary matrix $E$.
    - **C)** Right-multiplying $A$ by the corresponding elementary matrix $E$.
    - **D)** Taking the transpose of $A$.

3. What is the inverse operation that reverses $R_i + kR_j \to R_i$?
    - **A)** $R_i \leftrightarrow R_j$
    - **B)** $\frac{1}{k}R_i \to R_i$
    - **C)** $R_i - kR_j \to R_i$
    - **D)** $R_j - kR_i \to R_j$

4. How does multiplying a single row by a nonzero scalar $k$ affect $\det(A)$?
    - **A)** The determinant remains unchanged.
    - **B)** The determinant becomes zero.
    - **C)** The determinant is scaled by $k$ ($\det(E A) = k \det(A)$).
    - **D)** The determinant is scaled by $1/k$.

5. What does a row of all zeros in the Row Echelon Form (REF) of an $n \times n$ matrix signify about the matrix?
    - **A)** The matrix is invertible.
    - **B)** The matrix has full rank $n$.
    - **C)** The matrix is singular ($\det(A) = 0$) and its rows are linearly dependent.
    - **D)** The system $A\mathbf{x} = \mathbf{0}$ has only the trivial solution.

---

### Answer Key & Explanations

1. **D** - Multiplying by zero destroys information irreversibly and is not permitted.
2. **B** - Row operations correspond to pre-multiplication (left-multiplication) by elementary matrices: $E A$.
3. **C** - Adding $k R_j$ is undone by subtracting $k R_j$ from row $i$.
4. **C** - Scaling a row by scalar $k$ scales the determinant by $k$.
5. **C** - A zero row indicates $\text{rank}(A) < n$, meaning the determinant is zero and the matrix is singular.

---

## References & Navigation

- **Previous Topic:** [[Elementary Matrices]]
- **Next Topic:** [[Identity Matrix]]
- **Related Notes:** [[Nonsingular Matrix]], [[Matrix Multiplication]]
