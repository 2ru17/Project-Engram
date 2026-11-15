---
id: csmath2_vectors_in_the_plane
type: note
course: CSMATH2
topic: Vectors in the Plane
status: completed
---
# Vectors in the Plane

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Problem Solving]] #[[CSMATH2]] #[[Linear Algebra]] #[[Mathematics]]

---

## Overview

The two-dimensional Euclidean space $\mathbb{R}^2$ forms the foundational geometric model for linear algebra. Elements of $\mathbb{R}^2$ simultaneously represent points in the Cartesian plane, directed geometric displacements carrying both magnitude and direction, and two-component algebraic arrays equipped with vector addition, scalar multiplication, and the Euclidean dot product.

---

## Key Definitions

- **Algebraic Vector in $\mathbb{R}^2$:** An ordered pair of real numbers written either as a row $(v_1, v_2)$ or column vector $\mathbf{v} = \begin{bmatrix} v_1 \\ v_2 \end{bmatrix}$, where $v_1, v_2 \in \mathbb{R}$ are its components.
- **Geometric (Free) vs. Position Vector:** Geometrically, a vector is a directed line segment from an initial point $P(x_1, y_1)$ to a terminal point $Q(x_2, y_2)$, represented algebraically by subtracting coordinates:

$$\overrightarrow{PQ} = \begin{bmatrix} x_2 - x_1 \\ y_2 - y_1 \end{bmatrix}$$

Two directed segments are **equivalent** if they share the same length and direction; translating any vector so its tail sits at the origin $(0,0)$ yields its unique **standard position** representation.
- **Zero Vector ($\mathbf{0}$):** The additive identity $(0, 0)$ with magnitude $0$ and undefined direction.
- **Standard Basis Vectors:** The perpendicular unit vectors along the coordinate axes:

$$\mathbf{i} = \mathbf{e}_1 = \begin{bmatrix} 1 \\ 0 \end{bmatrix}, \quad \mathbf{j} = \mathbf{e}_2 = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$$

Every vector decomposes uniquely as $\mathbf{v} = v_1\mathbf{i} + v_2\mathbf{j}$.

---

## Theoretical Framework

### 1. Vector Addition, Scalar Multiplication, and Vector Space Structure

For $\mathbf{u} = (u_1, u_2)$, $\mathbf{v} = (v_1, v_2)$, and scalar $c \in \mathbb{R}$:

| Operation | Algebraic Definition | Geometric Interpretation |
| :--- | :--- | :--- |
| **Vector Addition** | $\mathbf{u} + \mathbf{v} = (u_1 + v_1,\; u_2 + v_2)$ | **Tip-to-tail (Triangle Rule)** or diagonal of the **Parallelogram Law** |
| **Vector Subtraction** | $\mathbf{u} - \mathbf{v} = (u_1 - v_1,\; u_2 - v_2)$ | Directed segment from the tip of $\mathbf{v}$ to the tip of $\mathbf{u}$ |
| **Scalar Multiplication** | $c\mathbf{v} = (c v_1,\; c v_2)$ | Scales length by $\lvert c \rvert$; preserves direction if $c > 0$, reverses if $c < 0$ |

Under these operations, $\mathbb{R}^2$ satisfies all eight vector space axioms (closure, commutativity and associativity of addition, additive identity $\mathbf{0}$, additive inverse $-\mathbf{v}$, and scalar distributivity/associativity). Two nonzero vectors $\mathbf{u}, \mathbf{v}$ are **parallel (collinear)** if and only if $\mathbf{u} = c\mathbf{v}$ for some nonzero scalar $c \in \mathbb{R}$.

### 2. Euclidean Norm, Distance, and Unit Vectors

By the Pythagorean theorem, the **Euclidean norm (magnitude)** of $\mathbf{v} = (v_1, v_2)$ is:

$$\lVert \mathbf{v} \rVert = \sqrt{v_1^2 + v_2^2}$$

The **Euclidean distance** between two points or vectors $\mathbf{u}$ and $\mathbf{v}$ is $d(\mathbf{u}, \mathbf{v}) = \lVert \mathbf{u} - \mathbf{v} \rVert = \sqrt{(u_1 - v_1)^2 + (u_2 - v_2)^2}$. Key norm properties include:
1. **Non-negativity:** $\lVert \mathbf{v} \rVert \ge 0$, with $\lVert \mathbf{v} \rVert = 0 \iff \mathbf{v} = \mathbf{0}$.
2. **Absolute Homogeneity:** $\lVert c\mathbf{v} \rVert = \lvert c \rvert \lVert \mathbf{v} \rVert$ for all $c \in \mathbb{R}$.
3. **Triangle Inequality:** $\lVert \mathbf{u} + \mathbf{v} \rVert \le \lVert \mathbf{u} \rVert + \lVert \mathbf{v} \rVert$, with equality when $\mathbf{u}$ and $\mathbf{v}$ point in the same direction (or one is $\mathbf{0}$).

A **unit vector** has norm $1$. Given any nonzero vector $\mathbf{v}$, **normalization** produces the unique unit vector pointing in the exact same direction:

$$\hat{\mathbf{u}} = \frac{\mathbf{v}}{\lVert \mathbf{v} \rVert}$$

In polar coordinates, a nonzero vector making counterclockwise angle $\theta$ with the positive $x$-axis takes the form $\mathbf{v} = \lVert \mathbf{v} \rVert (\cos\theta, \sin\theta)$.

### 3. Dot Product, Angle, and Orthogonality

The **dot product (Euclidean inner product)** of $\mathbf{u} = (u_1, u_2)$ and $\mathbf{v} = (v_1, v_2)$ is the scalar:

$$\mathbf{u} \cdot \mathbf{v} = \mathbf{u}^T \mathbf{v} = u_1 v_1 + u_2 v_2$$

**Algebraic Properties:**
- Symmetry: $\mathbf{u} \cdot \mathbf{v} = \mathbf{v} \cdot \mathbf{u}$
- Bilinearity: $(c\mathbf{u} + \mathbf{w}) \cdot \mathbf{v} = c(\mathbf{u} \cdot \mathbf{v}) + (\mathbf{w} \cdot \mathbf{v})$
- Positivity & Norm Link: $\mathbf{v} \cdot \mathbf{v} = \lVert \mathbf{v} \rVert^2$

Applying the Law of Cosines to the triangle formed by $\mathbf{u}$, $\mathbf{v}$, and $\mathbf{u} - \mathbf{v}$ establishes the geometric identity for the angle $\theta \in [0, \pi]$ between two nonzero vectors:

$$\mathbf{u} \cdot \mathbf{v} = \lVert \mathbf{u} \rVert \lVert \mathbf{v} \rVert \cos\theta \implies \cos\theta = \frac{\mathbf{u} \cdot \mathbf{v}}{\lVert \mathbf{u} \rVert \lVert \mathbf{v} \rVert}$$

This yields the **Cauchy-Schwarz Inequality**: $\lvert \mathbf{u} \cdot \mathbf{v} \rvert \le \lVert \mathbf{u} \rVert \lVert \mathbf{v} \rVert$, and classifies angles solely by sign:
- $\mathbf{u} \cdot \mathbf{v} > 0$: $\theta \in [0, \pi/2)$ (**acute** angle)
- $\mathbf{u} \cdot \mathbf{v} < 0$: $\theta \in (\pi/2, \pi]$ (**obtuse** angle)
- $\mathbf{u} \cdot \mathbf{v} = 0$: $\theta = \pi/2$ (**orthogonal / perpendicular**, written $\mathbf{u} \perp \mathbf{v}$; by convention $\mathbf{0}$ is orthogonal to every vector).

### 4. Orthogonal Projection in $\mathbb{R}^2$

Given $\mathbf{u} \in \mathbb{R}^2$ and a nonzero direction vector $\mathbf{v} \in \mathbb{R}^2$, we frequently decompose $\mathbf{u}$ into a component parallel to $\mathbf{v}$ and a component orthogonal to $\mathbf{v}$:

$$\mathbf{u} = \operatorname{proj}_{\mathbf{v}}(\mathbf{u}) + \mathbf{u}_{\perp}$$

where the **orthogonal projection** of $\mathbf{u}$ onto $\mathbf{v}$ is:

$$\operatorname{proj}_{\mathbf{v}}(\mathbf{u}) = \left(\frac{\mathbf{u} \cdot \mathbf{v}}{\mathbf{v} \cdot \mathbf{v}}\right)\mathbf{v} = \left(\frac{\mathbf{u} \cdot \mathbf{v}}{\lVert \mathbf{v} \rVert^2}\right)\mathbf{v}$$

The signed **scalar component** of $\mathbf{u}$ along $\mathbf{v}$ is $\operatorname{comp}_{\mathbf{v}}(\mathbf{u}) = \frac{\mathbf{u} \cdot \mathbf{v}}{\lVert \mathbf{v} \rVert} = \lVert \mathbf{u} \rVert \cos\theta$, while the residual vector $\mathbf{u}_{\perp} = \mathbf{u} - \operatorname{proj}_{\mathbf{v}}(\mathbf{u})$ satisfies $\mathbf{u}_{\perp} \cdot \mathbf{v} = 0$ and minimizes the distance from $\mathbf{u}$ to the line spanned by $\mathbf{v}$.

---

## Worked Examples

### Example 1: Displacement, Linear Combinations, Norm, and Unit Vector

Let points $P(2, -1)$ and $Q(5, 3)$ lie in $\mathbb{R}^2$, and let $\mathbf{v} = (-1, 2)$.
1. Find the displacement vector $\mathbf{u} = \overrightarrow{PQ}$, its magnitude $\lVert \mathbf{u} \rVert$, and its unit vector $\hat{\mathbf{u}}$.
2. Compute $2\mathbf{u} - 3\mathbf{v}$ and the distance $d(\mathbf{u}, \mathbf{v})$.

**Solution:**
1. Subtract initial coordinates from terminal coordinates:

$$\mathbf{u} = \overrightarrow{PQ} = (5 - 2,\; 3 - (-1)) = (3, 4)$$

$$\lVert \mathbf{u} \rVert = \sqrt{3^2 + 4^2} = \sqrt{25} = 5, \quad \hat{\mathbf{u}} = \frac{1}{5}(3, 4) = \left(\frac{3}{5}, \frac{4}{5}\right)$$

2. Compute component-wise:

$$2\mathbf{u} - 3\mathbf{v} = 2(3, 4) - 3(-1, 2) = (6, 8) - (-3, 6) = (9, 2)$$

$$d(\mathbf{u}, \mathbf{v}) = \lVert \mathbf{u} - \mathbf{v} \rVert = \lVert (3 - (-1),\; 4 - 2) \rVert = \lVert (4, 2) \rVert = \sqrt{16 + 4} = 2\sqrt{5}$$

### Example 2: Angle Between Vectors and Orthogonality Parameter

1. Find the angle $\theta$ between $\mathbf{a} = (1, \sqrt{3})$ and $\mathbf{b} = (2, 0)$.
2. Determine the scalar $k$ so that $\mathbf{p} = (3, -4)$ and $\mathbf{q} = (k, 6)$ are orthogonal.

**Solution:**
1. Compute the dot product and norms:

$$\mathbf{a} \cdot \mathbf{b} = (1)(2) + (\sqrt{3})(0) = 2, \quad \lVert \mathbf{a} \rVert = \sqrt{1 + 3} = 2, \quad \lVert \mathbf{b} \rVert = 2$$

$$\cos\theta = \frac{2}{2 \cdot 2} = \frac{1}{2} \implies \theta = \frac{\pi}{3} \text{ radians } (60^\circ)$$

2. Set the dot product equal to zero:

$$\mathbf{p} \cdot \mathbf{q} = 3k + (-4)(6) = 3k - 24 = 0 \implies k = 8$$

### Example 3: Orthogonal Projection and Decomposition in $\mathbb{R}^2$

Decompose $\mathbf{u} = (5, 5)$ into $\mathbf{w}_1 + \mathbf{w}_2$, where $\mathbf{w}_1$ is parallel to $\mathbf{v} = (3, 1)$ and $\mathbf{w}_2$ is orthogonal to $\mathbf{v}$.

**Solution:**
Compute the projection $\mathbf{w}_1 = \operatorname{proj}_{\mathbf{v}}(\mathbf{u})$:

$$\mathbf{u} \cdot \mathbf{v} = (5)(3) + (5)(1) = 20, \quad \lVert \mathbf{v} \rVert^2 = 3^2 + 1^2 = 10$$

$$\mathbf{w}_1 = \frac{20}{10}(3, 1) = 2(3, 1) = (6, 2)$$

Then the orthogonal component is:

$$\mathbf{w}_2 = \mathbf{u} - \mathbf{w}_1 = (5, 5) - (6, 2) = (-1, 3)$$

Verification: $\mathbf{w}_1 \cdot \mathbf{w}_2 = (6)(-1) + (2)(3) = -6 + 6 = 0$, confirming $\mathbf{w}_1 \perp \mathbf{w}_2$, and $\mathbf{w}_1 + \mathbf{w}_2 = (5, 5) = \mathbf{u}$.

---

## Common Pitfalls

- **Reversing $\overrightarrow{PQ}$ Subtraction:** Always compute **Terminal minus Initial** ($Q - P$), never $P - Q$, which points in the opposite direction.
- **Confusing Projection Scalar vs. Vector:** $\operatorname{comp}_{\mathbf{v}}(\mathbf{u}) = \frac{\mathbf{u} \cdot \mathbf{v}}{\lVert \mathbf{v} \rVert}$ is a scalar, whereas $\operatorname{proj}_{\mathbf{v}}(\mathbf{u}) = \frac{\mathbf{u} \cdot \mathbf{v}}{\lVert \mathbf{v} \rVert^2}\mathbf{v}$ is a vector; forgetting the squared norm $\lVert \mathbf{v} \rVert^2$ in the vector formula yields the wrong length unless $\mathbf{v}$ is already a unit vector.
- **Mixing $\operatorname{proj}_{\mathbf{v}}(\mathbf{u})$ with $\operatorname{proj}_{\mathbf{u}}(\mathbf{v})$:** Projection is not symmetric; $\operatorname{proj}_{\mathbf{v}}(\mathbf{u})$ always lies along the subscript vector $\mathbf{v}$.
- **Omitting Absolute Value in Homogeneity:** For $c < 0$, $\lVert c\mathbf{v} \rVert = \lvert c \rvert \lVert \mathbf{v} \rVert$, never $c \lVert \mathbf{v} \rVert$ (norms cannot be negative).

---

## Summary

Vectors in $\mathbb{R}^2$ unify Cartesian geometry and two-dimensional linear algebra. Vector addition and scalar multiplication equip $\mathbb{R}^2$ with linear combination structure, the Euclidean norm measures lengths and distances, and the dot product determines angles, tests orthogonality ($\mathbf{u} \cdot \mathbf{v} = 0$), and enables orthogonal projection onto arbitrary lines through the origin.

## Multiple Choice Questions

1. Let $P(-3, 4)$ and $Q(3, -4)$ be points in $\mathbb{R}^2$. What is the Euclidean norm of the directed vector $\overrightarrow{PQ}$?
    - **A)** 5
    - **B)** 7
    - **C)** 14
    - **D)** 10

2. Which of the following is the unit vector pointing in the exact opposite direction of $\mathbf{v} = (-5, 12)$?
    - **A)** (5/13, -12/13)
    - **B)** (-5/13, 12/13)
    - **C)** (5/17, -12/17)
    - **D)** (-5/169, 12/169)

3. Given $\mathbf{u} = (4, -3)$ and $\mathbf{v} = (2, 5)$, what is the dot product $(2\mathbf{u}) \cdot (\mathbf{u} - \mathbf{v})$?
    - **A)** -7
    - **B)** 14
    - **C)** 64
    - **D)** 7

4. For what value of $k$ are the vectors $\mathbf{u} = (k, k - 3)$ and $\mathbf{v} = (2, 4)$ orthogonal in $\mathbb{R}^2$?
    - **A)** k = -2
    - **B)** k = 2
    - **C)** k = 3
    - **D)** k = 6

5. If $\lVert \mathbf{u} \rVert = 6$, $\lVert \mathbf{v} \rVert = 4$, and the angle between $\mathbf{u}$ and $\mathbf{v}$ is $\theta = \frac{2\pi}{3}$ ($120^\circ$), what is $\mathbf{u} \cdot \mathbf{v}$?
    - **A)** 12
    - **B)** 12 * sqrt(3)
    - **C)** -12 * sqrt(3)
    - **D)** -12

6. What is the orthogonal projection $\operatorname{proj}_{\mathbf{v}}(\mathbf{u})$ of $\mathbf{u} = (7, 1)$ onto $\mathbf{v} = (2, 1)$?
    - **A)** (6, 3)
    - **B)** (3, 3/2)
    - **C)** (14/5, 7/5)
    - **D)** (21/5, 7/5)

7. If $\mathbf{u}$ and $\mathbf{v}$ are orthogonal vectors in $\mathbb{R}^2$ with $\lVert \mathbf{u} \rVert = 3$ and $\lVert \mathbf{v} \rVert = 4$, what is $\lVert \mathbf{u} + \mathbf{v} \rVert$?
    - **A)** 7
    - **B)** 12
    - **C)** 5
    - **D)** 25

8. When decomposing $\mathbf{u}$ as $\mathbf{u} = \operatorname{proj}_{\mathbf{v}}(\mathbf{u}) + \mathbf{u}_{\perp}$ for $\mathbf{v} \neq \mathbf{0}$, which geometric property always holds for $\mathbf{u}_{\perp}$?
    - **A)** u_perp has unit length
    - **B)** u_perp is orthogonal to v
    - **C)** u_perp is parallel to v
    - **D)** u_perp equals u - v

9. Which inequality guarantees that for all $\mathbf{u}, \mathbf{v} \in \mathbb{R}^2$, the ratio $\frac{\mathbf{u} \cdot \mathbf{v}}{\lVert \mathbf{u} \rVert \lVert \mathbf{v} \rVert}$ (for nonzero vectors) always lies in $[-1, 1]$?
    - **A)** Triangle Inequality
    - **B)** Rank-Nullity Theorem
    - **C)** Parallelogram Identity
    - **D)** Cauchy-Schwarz Inequality

10. If $\mathbf{u}$ and $\mathbf{v}$ are nonzero vectors in $\mathbb{R}^2$ such that $\mathbf{u} \cdot \mathbf{v} < 0$, what can be concluded about the angle $\theta$ between them?
    - **A)** theta is strictly acute (0 <= theta < pi/2)
    - **B)** theta equals pi/2
    - **C)** theta is strictly obtuse (pi/2 < theta <= pi)
    - **D)** u and v must be orthogonal

### Answer Key & Explanations

1. **D)** $\overrightarrow{PQ} = (3 - (-3),\; -4 - 4) = (6, -8)$, so $\lVert \overrightarrow{PQ} \rVert = \sqrt{6^2 + (-8)^2} = \sqrt{36 + 64} = 10$.
2. **A)** First, $\lVert \mathbf{v} \rVert = \sqrt{(-5)^2 + 12^2} = \sqrt{25 + 144} = 13$. The unit vector in the opposite direction is $-\frac{\mathbf{v}}{\lVert \mathbf{v} \rVert} = -\frac{1}{13}(-5, 12) = (\frac{5}{13}, -\frac{12}{13})$.
3. **C)** Here $2\mathbf{u} = (8, -6)$ and $\mathbf{u} - \mathbf{v} = (2, -8)$. Their dot product is $(8)(2) + (-6)(-8) = 16 + 48 = 64$ (equivalently $2(\lVert \mathbf{u} \rVert^2 - \mathbf{u}\cdot\mathbf{v}) = 2(25 - (-7)) = 64$).
4. **B)** Orthogonality requires $\mathbf{u} \cdot \mathbf{v} = 2k + 4(k - 3) = 6k - 12 = 0$, giving $k = 2$.
5. **D)** Using $\mathbf{u} \cdot \mathbf{v} = \lVert \mathbf{u} \rVert \lVert \mathbf{v} \rVert \cos\theta$, we get $6 \cdot 4 \cdot \cos(2\pi/3) = 24 \cdot (-1/2) = -12$.
6. **A)** Compute $\mathbf{u} \cdot \mathbf{v} = (7)(2) + (1)(1) = 15$ and $\lVert \mathbf{v} \rVert^2 = 2^2 + 1^2 = 5$. Thus $\operatorname{proj}_{\mathbf{v}}(\mathbf{u}) = \frac{15}{5}(2, 1) = 3(2, 1) = (6, 3)$.
7. **C)** By the Pythagorean identity for orthogonal vectors ($\mathbf{u} \cdot \mathbf{v} = 0$), $\lVert \mathbf{u} + \mathbf{v} \rVert^2 = \lVert \mathbf{u} \rVert^2 + 2(\mathbf{u}\cdot\mathbf{v}) + \lVert \mathbf{v} \rVert^2 = 3^2 + 4^2 = 25$, so $\lVert \mathbf{u} + \mathbf{v} \rVert = 5$.
8. **B)** By construction, $\mathbf{u}_{\perp} = \mathbf{u} - \operatorname{proj}_{\mathbf{v}}(\mathbf{u})$ satisfies $\mathbf{u}_{\perp} \cdot \mathbf{v} = \mathbf{u} \cdot \mathbf{v} - \frac{\mathbf{u}\cdot\mathbf{v}}{\lVert \mathbf{v} \rVert^2}(\mathbf{v}\cdot\mathbf{v}) = 0$, so $\mathbf{u}_{\perp}$ is orthogonal to $\mathbf{v}$.
9. **D)** The Cauchy-Schwarz Inequality states $\lvert \mathbf{u} \cdot \mathbf{v} \rvert \le \lVert \mathbf{u} \rVert \lVert \mathbf{v} \rVert$, which guarantees $-1 \le \frac{\mathbf{u} \cdot \mathbf{v}}{\lVert \mathbf{u} \rVert \lVert \mathbf{v} \rVert} \le 1$ so $\theta = \arccos(\dots)$ is always well-defined.
10. **C)** Since $\lVert \mathbf{u} \rVert > 0$ and $\lVert \mathbf{v} \rVert > 0$, $\mathbf{u} \cdot \mathbf{v} < 0 \iff \cos\theta < 0$, which corresponds to an obtuse angle $\theta \in (\pi/2, \pi]$.

## References & Navigation

- **Previous Topic:** [[Determinants]]
- **Next Topic:** [[Vectors in R3]]
- **Related Notes:** [[Matrix Multiplication]], [[Linear Transformations]]
