---
id: LQ3-Mock
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# LQ3 Mock

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Instructions: Please write down your answers and solve the problems on paper. e

## Details / Theory

**Instructions:** Please write down your answers and solve the problems on paper. e

---

### **Part I: Multiple Choice (20 Items)**

_Select the best answer for each question._

1. Let $B_1$ and $B_2$ denote two bases of an $n$-dimensional space $V$. Which of the following statements is always true?
**A)** There is no common vector in $B_1$ and $B_2$.
**B)** If there exists a common vector of $B_1$ and $B_2$, then $B_1 = B_2$.
**C)** $B_1$ and $B_2$ contain the same number of vectors.
**D)** Some vectors in $B_1$ are also in $B_2$.

2. If $B = \{u_1, u_2, ..., u_n\}$ is a basis for a vector space $V$, then every vector in $V$ can be written uniquely as a linear combination of the vectors in $B$.
**A)** TRUE
**B)** FALSE

3. Let $S = \{u_1, u_2, ..., u_n\}$ be a linearly independent set in an $n$-dimensional vector space $V$. Which of the following is always true?
**A)** There exists a spanning set $S'$ such that $S' \subset S$.
**B)** $S$ can be extended to a larger linearly independent set.
**C)** $S$ is a basis for $V$.
**D)** $S$ does not span $V$.

4. If the set $S$ is a linearly dependent subset of a vector space $V$, which of the following is always true?
**A)** One of the vectors in $S$ can be expressed as a linear combination of the other vectors in $S$.
**B)** $S$ contains a basis for $V$.
**C)** One of the vectors in $S$ is the zero vector.
**D)** $S$ spans $V$.

5. Let $V$ be a vector space of dimension $n$, and let $S \subset V$ be a set of $m$ vectors with $m < n$. What can we conclude?
**A)** $S$ is a basis for $V$.
**B)** $S$ must be linearly dependent.
**C)** $S$ cannot span $V$.
**D)** $S$ may or may not span $V$.

6. Which of the following is a linearly independent subset of $\mathbb{R}^2$?
**A)** $\{(1,1), (2,2)\}$
**B)** $\{(1,1)\}$
**C)** $\{(0,0)\}$
**D)** $\{(1,2), (0,0)\}$

7. Consider the range of a linear transformation given by Range $L = \{ \begin{bmatrix} a \\ a-b \\ b \end{bmatrix} \mid a, b \in \mathbb{R} \}$. Which of the following spans Range $L$?
**A)** $\{ \begin{bmatrix} a \\ a-b \\ b \end{bmatrix} \}$
**B)** $S = \{ \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix} \}$
**C)** $S = \{ \begin{bmatrix} 1 \\ 1 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ -1 \\ 1 \end{bmatrix} \}$
**D)** $S = \{ \begin{bmatrix} 1 \\ 1 \\ 1 \end{bmatrix}, \begin{bmatrix} 0 \\ -1 \\ 0 \end{bmatrix} \}$

8. Using the transformation in Question #7, which of the following is true?
**A)** $L$ is onto (assuming codomain $\mathbb{R}^3$).
**B)** $dim(\text{Range } L) = 2$.
**C)** $L$ is one-to-one (assuming domain $\mathbb{R}^3$).
**D)** Both B and C.

9. Consider $L: \mathbb{R}^2 \to \mathbb{R}^3$ defined by $L(x,y) = (x+y, x-y, 0)$. Which of the following is the Range of $L$?
**A)** $\{(0,0,0)\}$
**B)** Span${(1,1,0)}$
**C)** Span${(1,1,0), (1,-1,1)}$
**D)** Span${(1,1,0), (1,-1,0)}$

10. Using the transformation in Question #9, which of the following is the Kernel of $L$?
**A)** $\{(0,0)\}$
**B)** $\{(1,1), (1,-1)\}$
**C)** $\{(2x, 0) \mid x \in \mathbb{R}\}$
**D)** $\{(1,0), (0,1)\}$

11. Which of the following is true about a linear transformation $L: V \to W$?
**A)** The range of $L$ contains $W$.
**B)** If Ker $L = \{0_V\}$, then $L$ is one-to-one.
**C)** When $L$ is one-to-one then it is onto.
**D)** Both A and B.

12. Which of the following is a linear transformation that is both one-to-one and onto?
**A)** $L: \mathbb{R}^2 \to \mathbb{R}^2$ defined by $L(x,y) = (0,0)$
**B)** $L: \mathbb{R}^2 \to \mathbb{R}^2$ defined by $L(x,y) = (0,y)$
**C)** $L: \mathbb{R}^2 \to \mathbb{R}^2$ defined by $L(x,y) = (-x, -y)$
**D)** $L: \mathbb{R}^2 \to \mathbb{R}^2$ defined by $L(x,y) = (x, 2x)$

13. A function $L: V \to W$ is a linear transformation if and only if:
**A)** $L(ru + sv) = rL(u) + sL(v)$ for all $u, v \in V$ and scalars $r, s$.
**B)** $L$ is one-to-one and onto.
**C)** The image of $L$ is a line.
**D)** $L(0_V) \neq 0_W$.

14. Let $L: \mathbb{R}^2 \to \mathbb{R}^2$ be a linear transformation where $L([1, 0]^T) = [2, 1]^T$ and $L([0, 1]^T) = [0, -1]^T$. What is $L([3, 2]^T)$?
**A)** $[6, 1]^T$
**B)** $[2, 0]^T$
**C)** $[6, 2]^T$
**D)** $[0, 0]^T$

15. Which of the following is not a linear transformation from $\mathbb{R}^3$ to $\mathbb{R}^2$?
**A)** $L(a,b,c) = (2a, c-b)$
**B)** $T(a,b,c) = (a+b, a-c)$
**C)** $T(a,b,c) = (a, b)$
**D)** $L(a,b,c) = (a^2, 0)$

16. What is the dimension of the vector space $\mathbb{R}^4$?
**A)** 2
**B)** 3
**C)** 4
**D)** Infinite

17. The set of vectors $\{(1,0,0), (0,1,0), (0,0,1), (1,1,1)\}$ in $\mathbb{R}^3$ is:
**A)** Linearly Independent
**B)** A Basis for $\mathbb{R}^3$
**C)** Linearly Dependent
**D)** None of the above

18. If $L: V \to W$ is a linear transformation and $dim(V) = 5$ and $dim(\text{Range } L) = 3$, what is $dim(\text{Ker } L)$?
**A)** 2
**B)** 3
**C)** 5
**D)** 8

19. Which of the following sets spans $\mathbb{R}^2$?
**A)** $\{(1,0)\}$
**B)** $\{(1,1), (2,2)\}$
**C)** $\{(1,0), (0,1), (2,3)\}$
**D)** $\{(0,0), (1,1)\}$

20. Let $L(x) = Mx$ where $M$ is a $3 \times 2$ matrix. The domain of $L$ is:
**A)** $\mathbb{R}^2$
**B)** $\mathbb{R}^3$
**C)** A matrix space
**D)** The empty set

---

### **Part II: Problem Solving (5 Items)**

_Show your complete solution for each item._

21. Linear Independence & Basis

Determine if the set $S = \left\{ (1, 2), (3, 4) \right\}$ is a basis for $\mathbb{R}^2$.

(Hint: You must check two conditions: Linear Independence and Spanning).

22. Extending a Basis

Given the set $A = \{ (1, 1, 0), (1, 0, 1) \}$ in $\mathbb{R}^3$.

Find a third vector $v_3$ such that $\{ (1, 1, 0), (1, 0, 1), v_3 \}$ forms a basis for $\mathbb{R}^3$. Show that your chosen vector makes the set linearly independent.

23. Linearity Test

Let $L: \mathbb{R}^2 \to \mathbb{R}$ be defined by $L(x, y) = 3x + y + 1$.

Is $L$ a linear transformation? Prove your answer using the definition of a linear transformation or a property of the zero vector.

24. Kernel and Range

Let $L: \mathbb{R}^3 \to \mathbb{R}^2$ be defined by:

$$L\left(\begin{bmatrix} x \\ y \\ z \end{bmatrix}\right) = \begin{bmatrix} x + y \\ z \end{bmatrix}$$
**a)** Find the Kernel of $L$ (describe the set of vectors).
**b)** Find the dimension of the Range of $L$.

25. Transformation of a Vector

Let $L: \mathbb{R}^2 \to \mathbb{R}^2$ be a linear transformation such that:

$$L(1, 0) = (2, 3)$$

$$L(0, 1) = (-1, 4)$$

Find $L(5, -2)$.

## Common Pitfalls
 Confusing **linear independence** with spanning — a set can span a space without being linearly independent (redundant vectors) Forgetting to **row-reduce** before determining basis, dimension, kernel, or range — always reduce to RREF first Misapplying the **rank-nullity theorem** — $\text{rank}(T) + \text{nullity}(T) = \dim(\text{domain})$, not $\dim(\text{codomain})$ Confusing **kernel** (maps to zero) with **range** (all possible outputs) — kernel tests one-to-one, range tests onto Arithmetic errors in **linear transformation** problems — always verify by substituting back into the original transformation

## Summary

> TL;DR — This mock exam covers **linear independence**, **basis and dimension**, **linear transformations**, **kernel and range**, and the **rank-nullity theorem**. 20 multiple-choice + 5 problem-solving items. Key strategy: row-reduce first, then read off pivot/free columns.

## Review Questions

_To be added._

## Links
 **Related:** **Source / Reference:**


## References & Navigation

- **Related Notes:** [[Linear Equations and Matrices]]
