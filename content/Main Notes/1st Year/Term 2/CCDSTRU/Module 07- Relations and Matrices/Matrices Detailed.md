---
id: matrices_detailed_07
type: note
course: CCDSTRU
topic: Matrices Detailed
status: completed
---

# Matrices Detailed

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Problem Solving]] #[[Matrices]] #[[Linear Algebra]] #[[CCDSTRU]] #[[M7]]

---

## Important Formulas & Concepts
 **Matrix:** A rectangular array of numbers. A matrix with $m$ rows and $n$ columns is called an $m \times n$ matrix.
**Square Matrix:** An $n \times n$ matrix.
Notation: Boldface uppercase letters (e.g., $\mathbf{A}$) are used to represent matrices, while their elements are represented with lowercase letters (e.g., $a_{ij}$ for the element at row $i$, column $j$).

### Matrix Addition
Let $\mathbf{A}$ and $\mathbf{B}$ be $m \times n$ matrices. The sum $\mathbf{A} + \mathbf{B}$ is the $m \times n$ matrix calculated by adding corresponding elements. **Formula:** $\mathbf{A} + \mathbf{B} = [a_{ij} + b_{ij}]$

> [!warning] Shape Requirement
> Matrices must have the exact same dimensions to be added together.

### Matrix Multiplication
Let $\mathbf{A}$ be an $m \times k$ matrix and $\mathbf{B}$ be a $k \times n$ matrix. The product $\mathbf{AB}$ is an $m \times n$ matrix $\mathbf{C} = [c_{ij}]$. **Formula:** $c_{ij} = \sum_{x=1}^{k} a_{ix}b_{xj}$ In simpler terms: The element at row $i$ and column $j$ of the product is the dot product of the $i$-th row of $\mathbf{A}$ and the $j$-th column of $\mathbf{B}$.

> [!warning] Shape Requirement
> To multiply $\mathbf{A} \times \mathbf{B}$, the number of columns in $\mathbf{A}$ must equal the number of rows in $\mathbf{B}$. Furthermore, matrix multiplication is generally **not commutative** ($\mathbf{AB} \neq \mathbf{BA}$).

## Worked Examples

**Example 1: Matrix Addition**
Given:
$$
\mathbf{A} = \begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6
\end{bmatrix}, \quad
\mathbf{B} = \begin{bmatrix}
2 & 4 & 6 \\
1 & 3 & 5
\end{bmatrix}
$$

$$
\mathbf{A} + \mathbf{B} = \begin{bmatrix}
1+2 & 2+4 & 3+6 \\
4+1 & 5+3 & 6+5
\end{bmatrix} = \begin{bmatrix}
3 & 6 & 9 \\
5 & 8 & 11
\end{bmatrix}
$$

**Example 2: Matrix Multiplication**
Given a $2 \times 3$ matrix $\mathbf{A}$ and a $3 \times 2$ matrix $\mathbf{B}$:
$$
\mathbf{A} = \begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6
\end{bmatrix}, \quad
\mathbf{B} = \begin{bmatrix}
2 & 4 \\
3 & 6 \\
4 & 8
\end{bmatrix}
$$
The product $\mathbf{AB}$ will be a $2 \times 2$ matrix:
$$
\mathbf{AB} = \begin{bmatrix}
(1\times2 + 2\times3 + 3\times4) & (1\times4 + 2\times6 + 3\times8) \\
(4\times2 + 5\times3 + 6\times4) & (4\times4 + 5\times6 + 6\times8)
\end{bmatrix}
$$
$$
= \begin{bmatrix}
2+6+12 & 4+12+24 \\
8+15+24 & 16+30+48
\end{bmatrix}
= \begin{bmatrix}
20 & 40 \\
47 & 94
\end{bmatrix}
$$

## Multiple Choice Questions

1. How is a matrix with $m$ rows and $n$ columns formally described in terms of size?
    - **A)** An $n \times m$ matrix
    - **B)** An $m \times n$ matrix
    - **C)** A square matrix
    - **D)** A rectangular vector

2. What condition must be met to perform matrix addition between two matrices $\mathbf{A}$ and $\mathbf{B}$?
    - **A)** The number of columns in $\mathbf{A}$ must equal the number of rows in $\mathbf{B}$
    - **B)** Both matrices must be square matrices
    - **C)** The matrices must have the exact same dimensions
    - **D)** The matrices must have non-zero elements

3. If $\mathbf{A}$ is a $4 \times 3$ matrix and $\mathbf{B}$ is a $3 \times 2$ matrix, what will be the dimensions of the product $\mathbf{AB}$?
    - **A)** $4 \times 2$
    - **B)** $3 \times 3$
    - **C)** $4 \times 3$
    - **D)** $2 \times 4$

4. Which of the following statements about matrix multiplication is generally true?
    - **A)** It is always commutative
    - **B)** It is commutative only for square matrices
    - **C)** It is generally not commutative
    - **D)** It can only be performed if both matrices are identical

5. How is the element at row $i$ and column $j$ of a matrix product $\mathbf{AB}$ calculated?
    - **A)** By multiplying the $i$-th element of $\mathbf{A}$ and the $j$-th element of $\mathbf{B}$
    - **B)** By adding the $i$-th row of $\mathbf{A}$ to the $j$-th column of $\mathbf{B}$
    - **C)** By computing the dot product of the $i$-th column of $\mathbf{A}$ and the $j$-th row of $\mathbf{B}$
    - **D)** By computing the dot product of the $i$-th row of $\mathbf{A}$ and the $j$-th column of $\mathbf{B}$

### Answer Key & Explanations
1. **B)** A matrix with $m$ rows and $n$ columns is called an $m \times n$ matrix, noting rows first then columns.
2. **C)** The shape requirement for matrix addition states that matrices must have the exact same dimensions to be added.
3. **A)** The product of an $m \times k$ matrix and a $k \times n$ matrix results in an $m \times n$ matrix. Here, $m=4$ and $n=2$, yielding a $4 \times 2$ matrix.
4. **C)** Matrix multiplication is generally not commutative, meaning $\mathbf{AB} \neq \mathbf{BA}$.
5. **D)** The element at row $i$ and column $j$ of the product is the dot product of the $i$-th row of $\mathbf{A}$ and the $j$-th column of $\mathbf{B}$.

## References & Navigation

- **Next Topic:** [[Mathematical Induction]]
- **Related Notes:** [[Matrices and Matrix Operations]], [[Definition of a Matrix]]
