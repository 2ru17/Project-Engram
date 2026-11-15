---
id: csmath2_linear_transformations
type: note
course: CSMATH2
topic: Linear Transformations
status: completed
---
# Linear Transformations

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Problem Solving]] #[[CSMATH2]] #[[Linear Algebra]] #[[Mathematics]]

---

## Overview

A **linear transformation** (or linear map) is a structure-preserving function $T: V \to W$ between two vector spaces that commutes with vector addition and scalar multiplication. In finite-dimensional Euclidean spaces $\mathbb{R}^n \to \mathbb{R}^m$, every linear transformation corresponds uniquely to matrix-vector multiplication $T(\mathbf{x}) = A\mathbf{x}$, unifying algebraic systems, subspace dimensions, and 2D/3D geometric operations such as rotations, reflections, projections, and shears.

---

## Key Definitions

- **Linear Transformation ($T: V \to W$):** A mapping from a vector space $V$ (domain) to a vector space $W$ (codomain) that satisfies two axioms for all $\mathbf{u}, \mathbf{v} \in V$ and all scalars $c \in \mathbb{R}$:
  1. **Additivity:** $T(\mathbf{u} + \mathbf{v}) = T(\mathbf{u}) + T(\mathbf{v})$
  2. **Homogeneity:** $T(c\mathbf{u}) = c T(\mathbf{u})$
  Equivalently, $T$ preserves arbitrary linear combinations: $T(c_1\mathbf{u} + c_2\mathbf{v}) = c_1 T(\mathbf{u}) + c_2 T(\mathbf{v})$. Taking $c = 0$ shows every linear map sends the zero vector to the zero vector: $T(\mathbf{0}_V) = \mathbf{0}_W$.
- **Kernel / Null Space ($\ker(T)$):** The set of all domain vectors mapped to the zero vector in $W$:

$$\ker(T) = \{ \mathbf{v} \in V : T(\mathbf{v}) = \mathbf{0}_W \}$$

Its dimension is the **nullity**: $\operatorname{nullity}(T) = \dim(\ker(T))$.
- **Range / Image ($\operatorname{R}(T)$ or $\operatorname{Im}(T)$):** The set of all achievable output vectors in $W$:

$$\operatorname{R}(T) = \{ T(\mathbf{v}) : \mathbf{v} \in V \}$$

Its dimension is the **rank**: $\operatorname{rank}(T) = \dim(\operatorname{R}(T))$.

---

## Theoretical Framework

### 1. The Standard Matrix Representation

If $T: \mathbb{R}^n \to \mathbb{R}^m$ is linear, its action on any vector $\mathbf{x} = x_1\mathbf{e}_1 + \dots + x_n\mathbf{e}_n$ is completely determined by the images of the standard basis vectors $\{\mathbf{e}_1, \dots, \mathbf{e}_n\}$:

$$T(\mathbf{x}) = x_1 T(\mathbf{e}_1) + x_2 T(\mathbf{e}_2) + \dots + x_n T(\mathbf{e}_n) = A\mathbf{x}$$

where the **standard matrix** $A \in \mathbb{R}^{m \times n}$ has $T(\mathbf{e}_j)$ as its $j$-th column:

$$A = [T] = \begin{bmatrix} T(\mathbf{e}_1) & T(\mathbf{e}_2) & \cdots & T(\mathbf{e}_n) \end{bmatrix}$$

Moreover, composition of linear maps $S \circ T$ ($S: \mathbb{R}^m \to \mathbb{R}^p$, $T: \mathbb{R}^n \to \mathbb{R}^m$) corresponds directly to matrix multiplication: $[S \circ T] = [S][T]$. For $T(\mathbf{x}) = A\mathbf{x}$, $\ker(T) = \operatorname{Null}(A)$ (the solution set of $A\mathbf{x} = \mathbf{0}$) and $\operatorname{R}(T) = \operatorname{Col}(A)$ (the column space of $A$).

### 2. Rank-Nullity Theorem and Mapping Properties

Because $\ker(T)$ is a subspace of $V$ and $\operatorname{R}(T)$ is a subspace of $W$, their dimensions obey the **Rank-Nullity Theorem** (Dimension Theorem) whenever $\dim(V)$ is finite:

$$\operatorname{rank}(T) + \operatorname{nullity}(T) = \dim(V)$$

For a matrix transformation $T(\mathbf{x}) = A\mathbf{x}$ with $A \in \mathbb{R}^{m \times n}$, this reads $\operatorname{rank}(A) + \operatorname{nullity}(A) = n$ (number of pivot columns plus number of free columns equals total columns).

| Mapping Property | Definition | Equivalent Criteria for $T: \mathbb{R}^n \to \mathbb{R}^m$ ($A = [T]$) | Dimension Constraint |
| :--- | :--- | :--- | :--- |
| **Injective (One-to-One)** | $T(\mathbf{u}) = T(\mathbf{v}) \implies \mathbf{u} = \mathbf{v}$ | $\ker(T) = \{\mathbf{0}\}$; $\operatorname{nullity}(T) = 0$; columns of $A$ are linearly independent; pivot in every column | Requires $n \le m$ |
| **Surjective (Onto)** | $\operatorname{R}(T) = \mathbb{R}^m$ | $\operatorname{rank}(T) = m$; columns of $A$ span $\mathbb{R}^m$; pivot in every row of $A$ | Requires $n \ge m$ |
| **Isomorphism (Bijective)** | Both injective and surjective | $m = n$, $A$ is square and invertible ($\det(A) \neq 0$), and $[T^{-1}] = A^{-1}$ | Requires $n = m$ |

### 3. Canonical Geometric Transformations in $\mathbb{R}^2$

Every linear geometric operator $T: \mathbb{R}^2 \to \mathbb{R}^2$ is obtained by tracking where $\mathbf{e}_1 = (1, 0)^T$ and $\mathbf{e}_2 = (0, 1)^T$ land:

| Geometric Transformation | Action on $\mathbf{e}_1$ and $\mathbf{e}_2$ | Standard Matrix $A = [T(\mathbf{e}_1)\; T(\mathbf{e}_2)]$ |
| :--- | :--- | :--- |
| **CCW Rotation by $\theta$** | $(\cos\theta, \sin\theta)^T,\; (-\sin\theta, \cos\theta)^T$ | $\begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$ |
| **Reflection across $x$-axis** | $(1, 0)^T,\; (0, -1)^T$ | $\begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}$ |
| **Reflection across $y$-axis** | $(-1, 0)^T,\; (0, 1)^T$ | $\begin{bmatrix} -1 & 0 \\ 0 & 1 \end{bmatrix}$ |
| **Reflection across $y = x$** | $(0, 1)^T,\; (1, 0)^T$ | $\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$ |
| **Orthogonal Projection onto $x$-axis** | $(1, 0)^T,\; (0, 0)^T$ | $\begin{bmatrix} 1 & 0 \\ 0 & 0 \end{bmatrix}$ |
| **Projection onto unit vector $\mathbf{u} = (u_1, u_2)^T$** | $u_1\mathbf{u},\; u_2\mathbf{u}$ | $\mathbf{u}\mathbf{u}^T = \begin{bmatrix} u_1^2 & u_1 u_2 \\ u_1 u_2 & u_2^2 \end{bmatrix}$ |
| **Anisotropic Scaling by $(s_x, s_y)$** | $(s_x, 0)^T,\; (0, s_y)^T$ | $\begin{bmatrix} s_x & 0 \\ 0 & s_y \end{bmatrix}$ |
| **Horizontal Shear by $k$** | $(1, 0)^T,\; (k, 1)^T$ | $\begin{bmatrix} 1 & k \\ 0 & 1 \end{bmatrix}$ |

Note that **translation** $F(\mathbf{x}) = \mathbf{x} + \mathbf{b}$ ($\mathbf{b} \neq \mathbf{0}$) is an *affine* map, not linear, because $F(\mathbf{0}) = \mathbf{b} \neq \mathbf{0}$.

---

## Worked Examples

### Example 1: Verifying Linearity vs. Identifying Non-Linear Maps

Determine whether each mapping is linear:
1. $T: \mathbb{R}^2 \to \mathbb{R}^3$ defined by $T(x, y) = (x + 2y,\; 3x - y,\; 4y)$.
2. $S: \mathbb{R}^2 \to \mathbb{R}^2$ defined by $S(x, y) = (x + 1,\; 2y)$.

**Solution:**
1. Let $\mathbf{u} = (x_1, y_1)$, $\mathbf{v} = (x_2, y_2)$, and $c \in \mathbb{R}$:

$$T(\mathbf{u} + \mathbf{v}) = \big((x_1+x_2) + 2(y_1+y_2),\; 3(x_1+x_2) - (y_1+y_2),\; 4(y_1+y_2)\big) = T(\mathbf{u}) + T(\mathbf{v})$$

$$T(c\mathbf{u}) = (cx_1 + 2cy_1,\; 3cx_1 - cy_1,\; 4cy_1) = c T(\mathbf{u})$$

Both axioms hold, so $T$ is linear with standard matrix $A = \begin{bmatrix} 1 & 2 \\ 3 & -1 \\ 0 & 4 \end{bmatrix}$.
2. Testing the zero vector gives $S(0, 0) = (1, 0) \neq (0, 0)$. Because every linear transformation must map $\mathbf{0}$ to $\mathbf{0}$, $S$ is **not linear**.

### Example 2: Standard Matrix, Kernel, Range, and Rank-Nullity

Let $T: \mathbb{R}^3 \to \mathbb{R}^3$ be defined by:

$$T(x_1, x_2, x_3) = (x_1 + 2x_2 - x_3,\; 2x_1 + 4x_2 - 2x_3,\; x_1 + x_2 + x_3)$$

Find the standard matrix $A$, bases for $\ker(T)$ and $\operatorname{R}(T)$, verify the Rank-Nullity Theorem, and classify injectivity/surjectivity.

**Solution:**
Evaluate $T$ on $\mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3$ to form the columns of $A$:

$$A = \begin{bmatrix} 1 & 2 & -1 \\ 2 & 4 & -2 \\ 1 & 1 & 1 \end{bmatrix}$$

Reduce $A$ to RREF via row operations ($R_2 \leftarrow R_2 - 2R_1$, $R_3 \leftarrow R_3 - R_1$, swap $R_2 \leftrightarrow R_3$, scale $R_2$ by $-1$, then $R_1 \leftarrow R_1 - 2R_2$):

$$A \longrightarrow \begin{bmatrix} 1 & 2 & -1 \\ 0 & 0 & 0 \\ 0 & -1 & 2 \end{bmatrix} \longrightarrow \begin{bmatrix} 1 & 0 & 3 \\ 0 & 1 & -2 \\ 0 & 0 & 0 \end{bmatrix}$$

- **Range & Rank:** Pivots lie in columns 1 and 2, so the first two columns of the original matrix $A$ form a basis for $\operatorname{R}(T)$:

$$\operatorname{R}(T) = \operatorname{span}\left\{\begin{bmatrix} 1 \\ 2 \\ 1 \end{bmatrix}, \begin{bmatrix} 2 \\ 4 \\ 1 \end{bmatrix}\right\}, \quad \operatorname{rank}(T) = 2$$

- **Kernel & Nullity:** Solving $A\mathbf{x} = \mathbf{0}$ from RREF with free variable $x_3 = t$ gives $x_1 = -3t$, $x_2 = 2t$:

$$\ker(T) = \operatorname{span}\left\{\begin{bmatrix} -3 \\ 2 \\ 1 \end{bmatrix}\right\}, \quad \operatorname{nullity}(T) = 1$$

- **Rank-Nullity Check:** $\operatorname{rank}(T) + \operatorname{nullity}(T) = 2 + 1 = 3 = \dim(\mathbb{R}^3)$.
- **Classification:** Since $\operatorname{nullity}(T) = 1 \neq 0$, $T$ is **not injective**; since $\operatorname{rank}(T) = 2 < 3$, $T$ is **not surjective** (and hence not an isomorphism).

### Example 3: Composite 2D Geometric Transformation

Find the single standard matrix $M$ that first reflects vectors in $\mathbb{R}^2$ across the line $y = x$, and then rotates them counterclockwise by $\theta = \pi/2$ ($90^\circ$). Apply $M$ to $\mathbf{v} = (3, 1)^T$.

**Solution:**
Here $F = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$ and $R_{\pi/2} = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$. Since the reflection acts first on $\mathbf{x}$, matrix composition places $R_{\pi/2}$ on the left:

$$M = R_{\pi/2} F = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix} = \begin{bmatrix} -1 & 0 \\ 0 & 1 \end{bmatrix}$$

This composition equals reflection across the $y$-axis. Applying $M$ to $\mathbf{v} = (3, 1)^T$ gives $M\mathbf{v} = (-3, 1)^T$, matching $R_{\pi/2}(F(3, 1)^T) = R_{\pi/2}(1, 3)^T = (-3, 1)^T$.

---

## Common Pitfalls

- **Reversing Composition Order:** If $T_1$ is applied first and $T_2$ second, the composite matrix is $[T_2][T_1]$, not $[T_1][T_2]$, because $(T_2 \circ T_1)(\mathbf{x}) = T_2(T_1(\mathbf{x})) = [T_2]([T_1]\mathbf{x})$.
- **Taking Range Basis from the RREF Matrix:** Pivot columns of the RREF matrix identify *which* columns of the **original** matrix $A$ form a basis for $\operatorname{R}(T)$; row operations change column space, so never use the RREF columns themselves as the range basis.
- **Confusing Domain and Codomain Dimensions in Rank-Nullity:** In $\operatorname{rank}(T) + \operatorname{nullity}(T) = \dim(V)$, the sum always equals the dimension of the **domain** $V$ (number of columns of $A$), never the codomain $W$.
- **Assuming $T(\mathbf{0}) = \mathbf{0}$ Guarantees Linearity:** Passing through the origin is necessary for linearity, not sufficient; for example, $f(x) = x^2$ satisfies $f(0) = 0$ but fails additivity and homogeneity.

---

## Summary

A linear transformation $T: V \to W$ preserves vector addition and scalar multiplication and is uniquely encoded on $\mathbb{R}^n \to \mathbb{R}^m$ by its standard matrix $A = [T(\mathbf{e}_1)\;\cdots\;T(\mathbf{e}_n)]$. The kernel measures failure of injectivity, the range measures coverage of the codomain, and their dimensions obey $\operatorname{rank}(T) + \operatorname{nullity}(T) = \dim(V)$.

## Multiple Choice Questions

1. Which of the following mappings $T: \mathbb{R}^2 \to \mathbb{R}^2$ is a valid linear transformation?
    - **A)** T(x, y) = (x + 2, 3y)
    - **B)** T(x, y) = (x^2, x + y)
    - **C)** T(x, y) = (3x - y, 2y)
    - **D)** T(x, y) = (xy, x - y)

2. A linear transformation $T: \mathbb{R}^2 \to \mathbb{R}^3$ satisfies $T(1, 0) = (2, -1, 4)$ and $T(0, 1) = (-3, 5, 0)$. What is $T(3, -2)$?
    - **A)** (12, -13, 12)
    - **B)** (0, 7, 12)
    - **C)** (12, 7, 12)
    - **D)** (-12, 13, 12)

3. Let $T: \mathbb{R}^5 \to \mathbb{R}^3$ be a linear transformation. If $\operatorname{nullity}(T) = 2$, what is $\operatorname{rank}(T)$, and is $T$ surjective (onto)?
    - **A)** rank(T) = 1; no, T is not surjective
    - **B)** rank(T) = 3; no, T is not surjective
    - **C)** rank(T) = 2; no, T is not surjective
    - **D)** rank(T) = 3; yes, T is surjective

4. What is the kernel $\ker(T)$ of the linear transformation $T(x_1, x_2, x_3) = (x_1 - 2x_2 + x_3,\; 2x_1 - 4x_2 + 2x_3)$?
    - **A)** The trivial subspace {(0, 0, 0)}
    - **B)** span{(2, 1, 0), (-1, 0, 1)}
    - **C)** span{(1, -2, 1)}
    - **D)** span{(2, 1, 0)}

5. Why can a linear transformation $T: \mathbb{R}^4 \to \mathbb{R}^3$ NEVER be injective (one-to-one)?
    - **A)** Because its range must equal R^4
    - **B)** Because standard matrices with more columns than rows have negative determinants
    - **C)** Because every map from R^4 to R^3 sends a nonzero basis vector to itself
    - **D)** Because Rank-Nullity forces nullity(T) >= 4 - 3 = 1, so ker(T) cannot be trivial

6. What is the standard matrix of a counterclockwise rotation in $\mathbb{R}^2$ by $\theta = \frac{\pi}{6}$ ($30^\circ$)?
    - **A)** [sqrt(3)/2, -1/2; 1/2, sqrt(3)/2]
    - **B)** [1/2, -sqrt(3)/2; sqrt(3)/2, 1/2]
    - **C)** [sqrt(3)/2, 1/2; -1/2, sqrt(3)/2]
    - **D)** [-sqrt(3)/2, -1/2; 1/2, -sqrt(3)/2]

7. What is the standard matrix of the orthogonal projection $P: \mathbb{R}^2 \to \mathbb{R}^2$ onto the line spanned by the unit vector $\mathbf{u} = (\frac{3}{5}, \frac{4}{5})^T$?
    - **A)** [3/5, 4/5; 4/5, 3/5]
    - **B)** [16/25, -12/25; -12/25, 9/25]
    - **C)** [9/25, 12/25; 12/25, 16/25]
    - **D)** [9/25, -12/25; 12/25, 16/25]

8. Suppose $T_1: \mathbb{R}^2 \to \mathbb{R}^2$ is reflection across the $x$-axis and $T_2: \mathbb{R}^2 \to \mathbb{R}^2$ is horizontal shear $(x, y) \mapsto (x + 2y, y)$. What is the standard matrix of the composite map $T_2 \circ T_1$ (applying $T_1$ first, then $T_2$)?
    - **A)** [1, 2; 0, -1]
    - **B)** [1, -2; 0, -1]
    - **C)** [1, 2; 0, 1]
    - **D)** [-1, 2; 0, 1]

9. Let $T: \mathbb{R}^n \to \mathbb{R}^n$ be a linear operator with standard matrix $A$. Under which condition is $T$ an isomorphism?
    - **A)** rank(T) = n
    - **B)** det(A) = 0
    - **C)** nullity(T) = 1
    - **D)** T(e_1) = 0

10. Which condition guarantees that a linear transformation $T: V \to W$ is injective (one-to-one)?
    - **A)** dim(V) > dim(W)
    - **B)** T(0_V) = 0_W
    - **C)** ker(T) = {0_V}
    - **D)** R(T) = W

### Answer Key & Explanations

1. **C)** $T(x, y) = (3x - y, 2y) = \begin{bmatrix} 3 & -1 \\ 0 & 2 \end{bmatrix}\begin{bmatrix} x \\ y \end{bmatrix}$ satisfies both additivity and homogeneity. Options A, B, and D fail $T(\mathbf{0}) = \mathbf{0}$ or contain nonlinear $x^2$ or $xy$ terms.
2. **A)** By linearity, $T(3, -2) = 3 T(1, 0) - 2 T(0, 1) = 3(2, -1, 4) - 2(-3, 5, 0) = (6 + 6,\; -3 - 10,\; 12 - 0) = (12, -13, 12)$.
3. **D)** By the Rank-Nullity Theorem, $\operatorname{rank}(T) = \dim(\mathbb{R}^5) - \operatorname{nullity}(T) = 5 - 2 = 3$. Since $\operatorname{rank}(T) = 3 = \dim(\mathbb{R}^3)$, the range fills the entire codomain $\mathbb{R}^3$, so $T$ is surjective.
4. **B)** Notice the second component is $2$ times the first, so $\ker(T)$ is the solution set of $x_1 - 2x_2 + x_3 = 0$, or $x_1 = 2x_2 - x_3$. Setting $(x_2, x_3) = (1, 0)$ and $(0, 1)$ gives basis vectors $(2, 1, 0)$ and $(-1, 0, 1)$, matching $\operatorname{nullity}(T) = 3 - 1 = 2$.
5. **D)** By the Rank-Nullity Theorem, $\operatorname{rank}(T) \le \dim(\mathbb{R}^3) = 3$, which forces $\operatorname{nullity}(T) = 4 - \operatorname{rank}(T) \ge 1$. Because $\ker(T)$ has dimension at least $1$, $T$ maps nonzero vectors to $\mathbf{0}$ and cannot be one-to-one.
6. **A)** Substituting $\cos(\pi/6) = \frac{\sqrt{3}}{2}$ and $\sin(\pi/6) = \frac{1}{2}$ into $R_\theta = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$ yields $\begin{bmatrix} \sqrt{3}/2 & -1/2 \\ 1/2 & \sqrt{3}/2 \end{bmatrix}$.
7. **C)** The projection matrix onto a unit vector $\mathbf{u}$ is $\mathbf{u}\mathbf{u}^T = \begin{bmatrix} 3/5 \\ 4/5 \end{bmatrix} \begin{bmatrix} 3/5 & 4/5 \end{bmatrix} = \begin{bmatrix} 9/25 & 12/25 \\ 12/25 & 16/25 \end{bmatrix}$.
8. **B)** With $T_1 = \begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}$ and $T_2 = \begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix}$, the composite matrix is $[T_2][T_1] = \begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix}\begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix} = \begin{bmatrix} 1 & -2 \\ 0 & -1 \end{bmatrix}$.
9. **A)** For a square operator $T: \mathbb{R}^n \to \mathbb{R}^n$, $\operatorname{rank}(T) = n$ implies $\operatorname{nullity}(T) = 0$ (injective) and $\operatorname{R}(T) = \mathbb{R}^n$ (surjective), making $T$ an isomorphism ($\det(A) \neq 0$).
10. **C)** A linear transformation $T$ is injective if and only if $\ker(T) = \{\mathbf{0}_V\}$, because $T(\mathbf{u}) = T(\mathbf{v}) \iff T(\mathbf{u} - \mathbf{v}) = \mathbf{0}_W \iff \mathbf{u} - \mathbf{v} \in \ker(T)$.

## References & Navigation

- **Previous Topic:** [[Vectors in R3]]
- **Next Topic:** [[Eigenvalues, Eigenvectors, and Diagonalization]]
- **Related Notes:** [[Matrix Multiplication]], [[Vectors in the Plane]], [[Inverse of a Matrix]], [[Nonsingular Matrix]]
