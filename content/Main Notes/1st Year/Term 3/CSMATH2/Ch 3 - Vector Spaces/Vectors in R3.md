---
id: csmath2_vectors_in_r3
type: note
course: CSMATH2
topic: Vectors in R3
status: completed
---
# Vectors in R3

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Problem Solving]] #[[CSMATH2]] #[[Linear Algebra]] #[[Mathematics]]

---

## Overview

Three-dimensional Euclidean space $\mathbb{R}^3$ extends planar vector algebra into spatial geometry, supporting 3D computer graphics, physics, and multivariable calculus. While vector addition, scalar multiplication, Euclidean norms, and the dot product generalize directly by adding a third coordinate, $\mathbb{R}^3$ uniquely admits the **cross product** (vector product) and **scalar triple product**, linking vector algebra to $3 \times 3$ determinants, surface normals, areas, and volumes.

---

## Key Definitions

- **3D Cartesian Coordinate System:** A right-handed system of three mutually perpendicular axes ($x, y, z$) intersecting at the origin $(0,0,0)$. Following the **right-hand rule**, curling the fingers of the right hand from the positive $x$-axis toward the positive $y$-axis causes the thumb to point along the positive $z$-axis.
- **Standard Basis Vectors ($\mathbf{i}, \mathbf{j}, \mathbf{k}$):**

$$\mathbf{i} = (1, 0, 0), \quad \mathbf{j} = (0, 1, 0), \quad \mathbf{k} = (0, 0, 1)$$

Any vector $\mathbf{v} = (v_1, v_2, v_3) \in \mathbb{R}^3$ expands uniquely as $\mathbf{v} = v_1\mathbf{i} + v_2\mathbf{j} + v_3\mathbf{k}$.
- **Direction Cosines:** For a nonzero vector $\mathbf{v} = (v_1, v_2, v_3)$ making angles $\alpha, \beta, \gamma$ with the positive $x, y, z$ axes respectively, the unit vector $\hat{\mathbf{v}} = \frac{\mathbf{v}}{\lVert \mathbf{v} \rVert} = (\cos\alpha, \cos\beta, \cos\gamma)$ satisfies:

$$\cos^2\alpha + \cos^2\beta + \cos^2\gamma = 1$$

---

## Theoretical Framework

### 1. Norm, Dot Product, and Projections in $\mathbb{R}^3$

Given $\mathbf{u} = (u_1, u_2, u_3)$ and $\mathbf{v} = (v_1, v_2, v_3)$ in $\mathbb{R}^3$:
- **Displacement Vector:** From $P(x_1, y_1, z_1)$ to $Q(x_2, y_2, z_2)$, $\overrightarrow{PQ} = (x_2 - x_1,\; y_2 - y_1,\; z_2 - z_1)$.
- **Euclidean Norm:** $\lVert \mathbf{v} \rVert = \sqrt{v_1^2 + v_2^2 + v_3^2}$.
- **Dot Product & Angle:**

$$\mathbf{u} \cdot \mathbf{v} = u_1 v_1 + u_2 v_2 + u_3 v_3 = \lVert \mathbf{u} \rVert \lVert \mathbf{v} \rVert \cos\theta, \quad \theta \in [0, \pi]$$

Two vectors are **orthogonal** ($\mathbf{u} \perp \mathbf{v}$) if and only if $\mathbf{u} \cdot \mathbf{v} = 0$.
- **Orthogonal Projection:** For $\mathbf{v} \neq \mathbf{0}$:

$$\operatorname{proj}_{\mathbf{v}}(\mathbf{u}) = \left(\frac{\mathbf{u} \cdot \mathbf{v}}{\lVert \mathbf{v} \rVert^2}\right)\mathbf{v}, \quad \mathbf{u}_{\perp} = \mathbf{u} - \operatorname{proj}_{\mathbf{v}}(\mathbf{u})$$

- **Point-Normal Equation of a Plane:** A plane passing through $P_0(x_0, y_0, z_0)$ with nonzero normal vector $\mathbf{n} = (a, b, c)$ consists of all points $P(x, y, z)$ satisfying $\mathbf{n} \cdot \overrightarrow{P_0 P} = 0$, or:

$$a(x - x_0) + b(y - y_0) + c(z - z_0) = 0$$

### 2. The Cross Product ($\mathbf{u} \times \mathbf{v}$)

Unlike the dot product (which returns a scalar in any $\mathbb{R}^n$), the **cross product** is defined strictly in $\mathbb{R}^3$ and returns a **vector** perpendicular to both operands.

**Algebraic & Determinant Definition:** For $\mathbf{u} = (u_1, u_2, u_3)$ and $\mathbf{v} = (v_1, v_2, v_3)$:

$$\mathbf{u} \times \mathbf{v} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \end{vmatrix} = (u_2 v_3 - u_3 v_2)\mathbf{i} - (u_1 v_3 - u_3 v_1)\mathbf{j} + (u_1 v_2 - u_2 v_1)\mathbf{k}$$

Notice the negative sign on the $\mathbf{j}$-cofactor, which simplifies to $(u_2 v_3 - u_3 v_2,\; u_3 v_1 - u_1 v_3,\; u_1 v_2 - u_2 v_1)$.

**Standard Basis Cyclic Products:**
- $\mathbf{i} \times \mathbf{j} = \mathbf{k}$, $\mathbf{j} \times \mathbf{k} = \mathbf{i}$, $\mathbf{k} \times \mathbf{i} = \mathbf{j}$ (cyclic order is positive)
- $\mathbf{j} \times \mathbf{i} = -\mathbf{k}$, $\mathbf{k} \times \mathbf{j} = -\mathbf{i}$, $\mathbf{i} \times \mathbf{k} = -\mathbf{j}$ (reversed order is negative)
- $\mathbf{i} \times \mathbf{i} = \mathbf{j} \times \mathbf{j} = \mathbf{k} \times \mathbf{k} = \mathbf{0}$

**Geometric Properties & Area:**
1. **Orthogonality:** $\mathbf{u} \cdot (\mathbf{u} \times \mathbf{v}) = 0$ and $\mathbf{v} \cdot (\mathbf{u} \times \mathbf{v}) = 0$. The orientation follows the **right-hand rule** from $\mathbf{u}$ to $\mathbf{v}$.
2. **Magnitude & Parallelogram Area:** Letting $\theta \in [0, \pi]$ be the angle between $\mathbf{u}$ and $\mathbf{v}$:

$$\lVert \mathbf{u} \times \mathbf{v} \rVert = \lVert \mathbf{u} \rVert \lVert \mathbf{v} \rVert \sin\theta$$

Geometrically, $\lVert \mathbf{u} \times \mathbf{v} \rVert$ equals the **area of the parallelogram** having $\mathbf{u}$ and $\mathbf{v}$ as adjacent sides, while $\frac{1}{2}\lVert \mathbf{u} \times \mathbf{v} \rVert$ equals the **area of the triangle** spanned by $\mathbf{u}$ and $\mathbf{v}$.
3. **Parallelism Criterion:** Nonzero $\mathbf{u}, \mathbf{v}$ are parallel (collinear) if and only if $\mathbf{u} \times \mathbf{v} = \mathbf{0}$.
4. **Lagrange's Identity:** $\lVert \mathbf{u} \times \mathbf{v} \rVert^2 = \lVert \mathbf{u} \rVert^2 \lVert \mathbf{v} \rVert^2 - (\mathbf{u} \cdot \mathbf{v})^2$.
5. **Algebraic Caveats:** The cross product is **anti-commutative** ($\mathbf{u} \times \mathbf{v} = -(\mathbf{v} \times \mathbf{u})$) and **non-associative** (in general $(\mathbf{u} \times \mathbf{v}) \times \mathbf{w} \neq \mathbf{u} \times (\mathbf{v} \times \mathbf{w})$).

### 3. The Scalar Triple Product

Combining the dot and cross products of three vectors $\mathbf{u}, \mathbf{v}, \mathbf{w} \in \mathbb{R}^3$ produces the **scalar triple product**, computed directly as a $3 \times 3$ determinant:

$$\mathbf{u} \cdot (\mathbf{v} \times \mathbf{w}) = \det\begin{bmatrix} u_1 & u_2 & u_3 \\ v_1 & v_2 & v_3 \\ w_1 & w_2 & w_3 \end{bmatrix}$$

Because swapping two rows negates a determinant, cyclic permutations leave the scalar triple product invariant:

$$\mathbf{u} \cdot (\mathbf{v} \times \mathbf{w}) = \mathbf{v} \cdot (\mathbf{w} \times \mathbf{u}) = \mathbf{w} \cdot (\mathbf{u} \times \mathbf{v})$$

**Volume & Coplanarity:**
- **Parallelepiped Volume:** $V = \lvert \mathbf{u} \cdot (\mathbf{v} \times \mathbf{w}) \rvert$ (the product of base area $\lVert \mathbf{v} \times \mathbf{w} \rVert$ and altitude $\lVert \mathbf{u} \rVert \lvert \cos\phi \rvert$). The tetrahedron spanned by the same three edge vectors has volume $\frac{1}{6} V$.
- **Coplanarity Criterion:** $\mathbf{u}, \mathbf{v}, \mathbf{w}$ lie in a common plane (and are linearly dependent) if and only if $\mathbf{u} \cdot (\mathbf{v} \times \mathbf{w}) = 0$.

---

## Worked Examples

### Example 1: Cross Product, Orthogonality, and Triangle Area

Find the area of the triangle with vertices $P(1, 0, 2)$, $Q(2, 3, 1)$, and $R(0, 2, 4)$, and verify that the normal vector is orthogonal to both edge vectors.

**Solution:**
Construct two edge vectors anchored at $P$:

$$\mathbf{u} = \overrightarrow{PQ} = (1, 3, -1), \quad \mathbf{v} = \overrightarrow{PR} = (-1, 2, 2)$$

Compute the cross product via the $3 \times 3$ determinant:

$$\mathbf{u} \times \mathbf{v} = \begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 1 & 3 & -1 \\ -1 & 2 & 2 \end{vmatrix} = (6 - (-2))\mathbf{i} - (2 - 1)\mathbf{j} + (2 - (-3))\mathbf{k} = (8, -1, 5)$$

Orthogonality verification: $\mathbf{u} \cdot (8, -1, 5) = 8 - 3 - 5 = 0$ and $\mathbf{v} \cdot (8, -1, 5) = -8 - 2 + 10 = 0$.
The parallelogram area is $\lVert \mathbf{u} \times \mathbf{v} \rVert = \sqrt{8^2 + (-1)^2 + 5^2} = \sqrt{90} = 3\sqrt{10}$, so:

$$\text{Area}(\triangle PQR) = \frac{1}{2}\lVert \mathbf{u} \times \mathbf{v} \rVert = \frac{3\sqrt{10}}{2}$$

### Example 2: Orthogonal Projection and Plane Equation in $\mathbb{R}^3$

1. Decompose $\mathbf{a} = (4, 5, -2)$ into components parallel and orthogonal to $\mathbf{b} = (1, 2, -2)$.
2. Find the equation of the plane through $P_0(1, -2, 3)$ with normal $\mathbf{n} = (2, -1, 4)$.

**Solution:**
1. Compute $\mathbf{a} \cdot \mathbf{b} = 4(1) + 5(2) + (-2)(-2) = 18$ and $\lVert \mathbf{b} \rVert^2 = 1 + 4 + 4 = 9$:

$$\operatorname{proj}_{\mathbf{b}}(\mathbf{a}) = \frac{18}{9}(1, 2, -2) = (2, 4, -4), \quad \mathbf{a}_{\perp} = (4, 5, -2) - (2, 4, -4) = (2, 1, 2)$$

Check: $(2, 4, -4) \cdot (2, 1, 2) = 4 + 4 - 8 = 0$.
2. Substitute into the point-normal equation:

$$2(x - 1) - 1(y + 2) + 4(z - 3) = 0 \implies 2x - y + 4z = 16$$

### Example 3: Scalar Triple Product, Volume, and Coplanarity

1. Find the volume of the parallelepiped spanned by $\mathbf{u} = (2, 1, 0)$, $\mathbf{v} = (1, -1, 3)$, and $\mathbf{w} = (0, 2, 5)$.
2. Determine $k$ so that $\mathbf{p} = (1, 2, 1)$, $\mathbf{q} = (2, 1, -1)$, and $\mathbf{r} = (3, k, 0)$ are coplanar.

**Solution:**
1. Evaluate the determinant:

$$\mathbf{u} \cdot (\mathbf{v} \times \mathbf{w}) = \det\begin{bmatrix} 2 & 1 & 0 \\ 1 & -1 & 3 \\ 0 & 2 & 5 \end{bmatrix} = 2(-5 - 6) - 1(5 - 0) + 0 = -22 - 5 = -27$$

Taking absolute value yields $V = \lvert -27 \rvert = 27$ cubic units.
2. Coplanarity requires the scalar triple product to vanish:

$$\det\begin{bmatrix} 1 & 2 & 1 \\ 2 & 1 & -1 \\ 3 & k & 0 \end{bmatrix} = 1(0 + k) - 2(0 + 3) + 1(2k - 3) = 3k - 9 = 0 \implies k = 3$$

Indeed, when $k = 3$, $\mathbf{r} = (3, 3, 0) = \mathbf{p} + \mathbf{q}$, confirming coplanarity.

---

## Common Pitfalls

- **Sign Error on the $\mathbf{j}$-Component:** When expanding the $3 \times 3$ cross product determinant, the middle cofactor carries a minus sign: $-(u_1 v_3 - u_3 v_1)\mathbf{j} = (u_3 v_1 - u_1 v_3)\mathbf{j}$.
- **Assuming Cross Product Commutativity or Associativity:** Swapping operands negates the cross product ($\mathbf{v} \times \mathbf{u} = -(\mathbf{u} \times \mathbf{v})$), and $(\mathbf{i} \times \mathbf{i}) \times \mathbf{j} = \mathbf{0}$ while $\mathbf{i} \times (\mathbf{i} \times \mathbf{j}) = \mathbf{i} \times \mathbf{k} = -\mathbf{j}$.
- **Omitting the $1/2$ for Triangle Area or Absolute Value for Volume:** $\lVert \mathbf{u} \times \mathbf{v} \rVert$ gives the parallelogram area (twice the triangle area), and $\mathbf{u} \cdot (\mathbf{v} \times \mathbf{w})$ can be negative, so always take its absolute value for volume.

---

## Summary

$\mathbb{R}^3$ generalizes planar norms, dot products, and projections while introducing the cross product $\mathbf{u} \times \mathbf{v}$ (producing a vector orthogonal to both inputs with magnitude equal to parallelogram area) and the scalar triple product $\mathbf{u} \cdot (\mathbf{v} \times \mathbf{w})$ (computing signed parallelepiped volume and testing coplanarity via a $3 \times 3$ determinant).

## Multiple Choice Questions

1. Let $\mathbf{u} = (2, -1, 3)$ and $\mathbf{v} = (1, 4, -2)$ in $\mathbb{R}^3$. What is $\mathbf{u} \times \mathbf{v}$?
    - **A)** (-10, -7, 9)
    - **B)** (-10, 7, 9)
    - **C)** (10, -7, -9)
    - **D)** (-14, 7, 9)

2. Using the right-hand rule for the standard basis $\{\mathbf{i}, \mathbf{j}, \mathbf{k}\}$ of $\mathbb{R}^3$, what is $(\mathbf{j} \times \mathbf{i}) \times \mathbf{k}$?
    - **A)** i
    - **B)** -i
    - **C)** j
    - **D)** 0

3. Which of the following is the unit vector in the same direction as $\mathbf{v} = (2, -6, 3)$?
    - **A)** (2/7, -6/7, 3/7)
    - **B)** (2/11, -6/11, 3/11)
    - **C)** (2/49, -6/49, 3/49)
    - **D)** (-2/7, 6/7, -3/7)

4. If a nonzero vector $\mathbf{v} \in \mathbb{R}^3$ has direction angles $\alpha = 60^\circ$ and $\beta = 45^\circ$ with the positive $x$- and $y$-axes, what is $\cos^2\gamma$ for its third direction angle $\gamma$?
    - **A)** 1/2
    - **B)** 3/4
    - **C)** 1/4
    - **D)** 1/8

5. What is the area of the triangle with vertices $A(0, 0, 0)$, $B(2, 1, 2)$, and $C(1, 2, -1)$?
    - **A)** 5 * sqrt(2)
    - **B)** sqrt(26) / 2
    - **C)** 3 * sqrt(6) / 2
    - **D)** 5 * sqrt(2) / 2

6. For nonzero vectors $\mathbf{u}, \mathbf{v} \in \mathbb{R}^3$, if $\lVert \mathbf{u} \times \mathbf{v} \rVert = \mathbf{u} \cdot \mathbf{v} > 0$, what is the angle $\theta$ between $\mathbf{u}$ and $\mathbf{v}$?
    - **A)** pi/6
    - **B)** pi/4
    - **C)** pi/3
    - **D)** pi/2

7. Find the volume of the parallelepiped determined by $\mathbf{u} = (1, 0, 2)$, $\mathbf{v} = (0, 3, 1)$, and $\mathbf{w} = (2, -1, 1)$.
    - **A)** 8
    - **B)** 6
    - **C)** 10
    - **D)** 14

8. For what value of $c$ are the vectors $\mathbf{u} = (1, 1, 2)$, $\mathbf{v} = (2, 0, 1)$, and $\mathbf{w} = (0, 2, c)$ coplanar in $\mathbb{R}^3$?
    - **A)** c = 1
    - **B)** c = 2
    - **C)** c = 3
    - **D)** c = -3

9. What is the orthogonal projection of $\mathbf{u} = (3, -1, 4)$ onto $\mathbf{v} = (1, 1, 0)$ in $\mathbb{R}^3$?
    - **A)** (2, 2, 0)
    - **B)** (1/2, 1/2, 0)
    - **C)** (3, -1, 0)
    - **D)** (1, 1, 0)

10. Which property holds for ALL vectors $\mathbf{u}, \mathbf{v}, \mathbf{w} \in \mathbb{R}^3$?
    - **A)** u x v = v x u
    - **B)** u · (v x w) = w · (u x v)
    - **C)** (u x v) x w = u x (v x w)
    - **D)** ||u x v||^2 = ||u||^2 ||v||^2 + (u · v)^2

### Answer Key & Explanations

1. **B)** Expanding $\begin{vmatrix} \mathbf{i} & \mathbf{j} & \mathbf{k} \\ 2 & -1 & 3 \\ 1 & 4 & -2 \end{vmatrix}$ gives $\big((-1)(-2) - (3)(4)\big)\mathbf{i} - \big((2)(-2) - (3)(1)\big)\mathbf{j} + \big((2)(4) - (-1)(1)\big)\mathbf{k} = (2 - 12)\mathbf{i} - (-4 - 3)\mathbf{j} + (8 + 1)\mathbf{k} = (-10, 7, 9)$.
2. **D)** First, $\mathbf{j} \times \mathbf{i} = -\mathbf{k}$. Then $(-\mathbf{k}) \times \mathbf{k} = \mathbf{0}$ because any vector crossed with a parallel vector yields the zero vector.
3. **A)** The norm is $\lVert \mathbf{v} \rVert = \sqrt{2^2 + (-6)^2 + 3^2} = \sqrt{4 + 36 + 9} = 7$, so the unit vector is $\frac{1}{7}(2, -6, 3) = (\frac{2}{7}, -\frac{6}{7}, \frac{3}{7})$.
4. **C)** Direction cosines satisfy $\cos^2\alpha + \cos^2\beta + \cos^2\gamma = 1$. Since $\cos 60^\circ = 1/2$ and $\cos 45^\circ = \sqrt{2}/2$, we have $(1/4) + (1/2) + \cos^2\gamma = 1 \implies \cos^2\gamma = 1/4$.
5. **D)** Compute $\overrightarrow{AB} \times \overrightarrow{AC} = (2, 1, 2) \times (1, 2, -1) = (-1 - 4,\; -(-2 - 2),\; 4 - 1) = (-5, 4, 3)$. Its norm is $\sqrt{(-5)^2 + 4^2 + 3^2} = \sqrt{50} = 5\sqrt{2}$, so the triangle area is $\frac{1}{2}\lVert \overrightarrow{AB} \times \overrightarrow{AC} \rVert = \frac{5\sqrt{2}}{2}$.
6. **B)** Since $\lVert \mathbf{u} \times \mathbf{v} \rVert = \lVert \mathbf{u} \rVert \lVert \mathbf{v} \rVert \sin\theta$ and $\mathbf{u} \cdot \mathbf{v} = \lVert \mathbf{u} \rVert \lVert \mathbf{v} \rVert \cos\theta$, equality with positive dot product gives $\sin\theta = \cos\theta > 0$, hence $\tan\theta = 1 \implies \theta = \pi/4$.
7. **A)** Evaluate $\det\begin{bmatrix} 1 & 0 & 2 \\ 0 & 3 & 1 \\ 2 & -1 & 1 \end{bmatrix} = 1(3 - (-1)) + 2(0 - 6) = 4 - 12 = -8$, so the volume is $\lvert -8 \rvert = 8$.
8. **C)** Coplanarity requires $\det\begin{bmatrix} 1 & 1 & 2 \\ 2 & 0 & 1 \\ 0 & 2 & c \end{bmatrix} = 1(0 - 2) - 1(2c - 0) + 2(4 - 0) = 6 - 2c = 0 \implies c = 3$ (notice $2\mathbf{u} - \mathbf{v} = (0, 2, 3)$).
9. **D)** Compute $\mathbf{u} \cdot \mathbf{v} = 3(1) + (-1)(1) + 4(0) = 2$ and $\lVert \mathbf{v} \rVert^2 = 1^2 + 1^2 + 0^2 = 2$, so $\operatorname{proj}_{\mathbf{v}}(\mathbf{u}) = \frac{2}{2}(1, 1, 0) = (1, 1, 0)$.
10. **B)** The scalar triple product is invariant under cyclic permutations of its three vectors: $\mathbf{u} \cdot (\mathbf{v} \times \mathbf{w}) = \mathbf{w} \cdot (\mathbf{u} \times \mathbf{v})$. Cross products are anti-commutative and non-associative, and Lagrange's identity carries a minus sign.

## References & Navigation

- **Previous Topic:** [[Vectors in the Plane]]
- **Next Topic:** [[Linear Transformations]]
- **Related Notes:** [[Determinants]], [[Matrix Multiplication]]
