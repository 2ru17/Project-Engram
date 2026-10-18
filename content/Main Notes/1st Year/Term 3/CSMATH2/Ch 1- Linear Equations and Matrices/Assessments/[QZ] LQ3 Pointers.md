---
id: LQ3-Pointers
type: note
course: CSMATH2
topic: Linear Algebra
status: completed
---

# LQ3 Pointers

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[CSMATH2]] #[[Linear Algebra]] #[[Computational Mathematics]] #[[Matrices]] #[[Matrix Operations]] #[[Computer Science]] #[[Vector Spaces]] #[[Linear Transformations]]

---

## Overview

> Linear Combination: A mix of vectors using scaling and addition.

## Key Concepts
 Linear Combination Span Definition Visual Check Basis

## Details / Theory

## **Part 1: Vector Space Concepts (The Building Blocks)**

### **1. Linear Combination & Span**
 **Linear Combination:** A mix of vectors using scaling and addition.
_Formula:_ $v = c_1v_1 + c_2v_2 + \dots + c_nv_n$ **Span:** The collection of **ALL** possible vectors you can create from a given set.
_Concept:_ Think of the span as the "territory" covered by the vectors.
_Rule:_ If you have fewer vectors than the dimension of the space (e.g., 2 vectors in $\mathbb{R}^3$), you **cannot** span the whole space.

### **2. Linear Independence**
 **Definition:** A set of vectors is independent if no vector is "redundant." You cannot build one vector using the others. The Zero Test: To check independence, set a combination to zero:
  $$c_1v_1 + c_2v_2 + \dots = 0$$
If the **only** solution is that all scalars are zero ($c=0$), they are **Linearly Independent**.
If you find any non-zero scalars, they are **Linearly Dependent**. **Visual Check:** Two vectors are dependent if they are on the same line (one is a multiple of the other).

### **3. Basis & Dimension**
 **Basis:** A "perfect" set of vectors that is efficient (independent) and complete (spans the space).
To be a basis, a set must be: **(1) Linearly Independent** AND **(2) A Spanning Set**. **Dimension:** The number of vectors in a basis.
**Rule:** Every basis for the same vector space has the exact same number of vectors.
_Examples:_ $\mathbb{R}^2$ has dimension 2; $\mathbb{R}^3$ has dimension 3.

---

## **Part 2: Linear Transformations (The Action)**

### **1. What is a Linear Transformation?**

A function $L$ that keeps the grid structure intact. It must follow the "Superposition Principle":

$$L(ru + sv) = rL(u) + sL(v)$$
 **Checklist for Linearity:**
  1. **Zero maps to Zero:** $L(0)$ must equal 0.
  2. **No Powers:** No $x^2, x^3$, etc.
  3. **No Constants:** No $+5$ or $-1$ added at the end.

### **2. Kernel (The "Null Space")**
 **Definition:** The set of all inputs that get sent to the **Zero Vector**. **How to find it:** Set the transformation equation equal to 0 and solve for the variables.
$L(x) = 0$ **Significance:** The Kernel tells you about uniqueness.

### **3. Range (The "Image")**
 **Definition:** The set of all possible outputs. **How to find it:** It is the **Span** of the transformed basis vectors.
_Tip:_ If $L(x,y) = (x+y, x-y, 0)$, separate the variables to find the vectors: $x(1,1,0) + y(1,-1,0)$. The range is the span of those two column vectors.

### **4. One-to-One vs. Onto**
 **One-to-One (Injective):** Every output has a unique input.
**The Test:** A map is One-to-One **if and only if** the Kernel contains ONLY the zero vector ($\{0\}$). **Onto (Surjective):** The map covers the entire target space.
**The Test:** The dimension of the Range must equal the dimension of the target space.

### **5. Rank-Nullity Theorem**

A fundamental rule connecting the dimensions:

$$\text{Dim(Kernel)} + \text{Dim(Range)} = \text{Dim(Domain)}$$
 _Translation:_ (Dimensions lost) + (Dimensions kept) = (Total dimensions started with). hi, hang in there bro :>

---

## **Part 3: Problem Solving Strategies ("The Algorithms")**

### **A. How to Check for Linear Independence / Find a Basis**

1. **Matrix Setup:** Put your vectors as the **columns** of a matrix.
2. **Row Reduce:** Perform Gaussian Elimination to get to Row Echelon Form (REF).
3. **Find Pivots:** Look for the leading non-zero numbers (usually 1s) in the rows.
4. **Conclusion:**
The **columns with pivots** correspond to the **Independent Vectors** (your Basis).
The **columns without pivots** (free variables) correspond to **Dependent Vectors**.

### **B. How to Extend a Set to a Basis**

1. Start with your given independent vectors.
2. Add a "Standard Basis" vector (like $(1,0,0)$ or $(0,1,0)$) that is **not** a linear combination of your current set.
3. **Verify:** Put them in a matrix and check if the determinant is non-zero, or if you have a full set of pivots.

### **C. How to Compute Transformations of New Vectors**
 **Problem:** Given $L(1,0) = u$ and $L(0,1) = v$, find $L(3, 5)$. **Solution:**
  1. Write the target vector as a combination: $(3, 5) = 3(1,0) + 5(0,1)$.
  2. Apply linearity: $L(3, 5) = 3L(1,0) + 5L(0,1)$.
  3. Substitute and calculate: $3u + 5v$.

---

## **Part 4: Quick Tips & Common Pitfalls**
 **The "Goldilocks" Rule:**
Too few vectors? Can't span.
Too many vectors? Must be dependent.
Just right ($n$ vectors in dimension $n$)? If they are independent, they are automatically a basis. **Zero Vector Trap:** Any set containing the Zero Vector is automatically **Dependent**. **Rank vs. Basis:**
**Rank** is a _number_ (how many pivots).
**Basis** is a _set of vectors_ (the columns with pivots). **Kernel Dimensions:** The Kernel lives in the **Domain** (input space). The Range lives in the **Codomain** (output space). Don't mix them up!

---

## **Part 5: "How To" Step-by-Step Guides**

### **1. How to show a vector $u$ is a Linear Combination of set $S$**

_Scenario:_ You are given a vector $u$ and a set of vectors $S = \{v_1, v_2\}$. The question asks: "Is $u$ a linear combination of $S$?" or "Express $u$ as a linear combination of $S$."
 Step 1: Write the Equation
  Set up the equation $c_1v_1 + c_2v_2 + \dots = u$.
_Example:_ $c_1 \begin{bmatrix}1\\2\end{bmatrix} + c_2 \begin{bmatrix}3\\4\end{bmatrix} = \begin{bmatrix}11\\16\end{bmatrix}$. Step 2: Create the Augmented Matrix
  Turn the vectors into columns of a matrix, with the target vector $u$ as the final column on the right side.
  $$\begin{bmatrix} 1 & 3 & | & 11 \\ 2 & 4 & | & 16 \end{bmatrix}$$ Step 3: Row Reduce (REF)
  Use Gaussian Elimination to get zeros in the bottom-left corner. **Step 4: Check Consistency**
**Consistent:** If you get a valid answer (e.g., $c_2 = 2, c_1 = 5$), then **YES**, it is a linear combination.
**Inconsistent:** If you get a row like $\begin{bmatrix} 0 & 0 & | & 5 \end{bmatrix}$ (which means $0 = 5$), then **NO**, it is impossible.

---

### **2. How to determine if a Set is Linearly Independent**

_Scenario:_ You are given a set of vectors $S = \{v_1, v_2, v_3\}$. Is it linearly independent?
 Step 1: Form the Homogeneous Equation
  Set the linear combination equal to the zero vector: $c_1v_1 + c_2v_2 + c_3v_3 = 0$. Step 2: Create the Augmented Matrix
  Put vectors as columns. The augmented side is all zeros. Step 3: Row Reduce (REF)
  Solve the matrix. **Step 4: Analyze the Solution**
**Independent:** If the _only_ solution is $c_1=0, c_2=0, c_3=0$ (the trivial solution), then the set is Independent.
**Dependent:** If there are free variables (non-trivial solutions), the set is Dependent.

---

### **3. How to find a Basis from a Spanning Set**

_Scenario:_ "Find a basis for the subspace spanned by $S = \{v_1, v_2, v_3, v_4\}$."
 Step 1: Put Vectors in a Matrix
  List the vectors as the columns of a matrix. Step 2: Row Reduce to REF
  Reduce until you see the "steps" or pivots. Step 3: Identify Pivot Columns
  Locate the columns that have the leading non-zero numbers (pivots). Step 4: Select Original Vectors
  The basis consists of the vectors from the original set that correspond to the pivot columns. (Do not use the columns from the reduced matrix itself).

---

### **4. How to prove $L$ is a Linear Transformation**

_Scenario:_ "Let $L(x) = \dots$. Determine if $L$ is a linear transformation."
 Step 1: Check the Combined Property
  You must prove that $L(ru + sv) = rL(u) + sL(v)$ is true for all vectors $u, v$ and scalars $r, s$. **Step 2: Substitute and Expand**
Calculate the left side: Plug $(ru + sv)$ into the function.
Calculate the right side: Multiply $r$ by the function $L(u)$ and add $s$ times the function $L(v)$. **Step 3: Compare**
If Left Side = Right Side, it is a Linear Transformation.
_Shortcut:_ If you see terms like $x^2$, $|x|$, $sin(x)$, or constants ($+1$), it is **NOT** linear.

---

### **5. How to find the Kernel of a Linear Transformation**

_Scenario:_ "Find the Kernel of $L(x, y) = (x+y, x-2y)$."
 Step 1: Set Output to Zero
  Write the equation $L(u) = 0_W$ (the zero vector of the target space).
  $$\begin{bmatrix} x+y \\ x-2y \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$$ Step 2: Solve the System
  Set up the equations:
  1. $x + y = 0$
  2. $x - 2y = 0$ **Step 3: State the Kernel**
If the only answer is $x=0, y=0$, the Kernel is $\{0\}$ (and $L$ is one-to-one).
If you get a free variable (like $x = -z$), describe the set of vectors (e.g., $span\{(1, 0, -1)\}$).

---

### **6. How to find the Range of a Linear Transformation**

_Scenario:_ "Find the Range of $L(x, y) = (x+y, x-y, 0)$."
 Step 1: Separate the Variables
  Take the output formula and pull apart the variables into distinct vectors.
  $$(x, x, 0) + (y, -y, 0)$$
  $$x(1, 1, 0) + y(1, -1, 0)$$ Step 2: Identify the Spanning Vectors
  The vectors you factored out are the generators of the range.
  $$\text{Range } L = \text{Span} \{(1, 1, 0), (1, -1, 0)\}$$ Step 3: Check Dimension (Optional)
  Count the linearly independent vectors in that span. This is the dimension of the Range (Rank).

## Common Pitfalls
 Checking **linear independence** by inspection instead of row-reducing — always set up the matrix and reduce to RREF Confusing **span** (set of all linear combinations) with **basis** (minimal spanning set that is also linearly independent) Forgetting that **dimension** = number of vectors in any basis, not the number of vectors given Not setting up the equation $T(\mathbf{x}) = \mathbf{0}$ properly when finding the **kernel** — write the transformation as a matrix equation first Miscounting **rank** (pivot columns) vs. **nullity** (free columns) after row reduction

## Summary

> TL;DR — Key pointers: **Span** = all linear combinations; **linear independence** = check via RREF (no free variables); **basis** = linearly independent spanning set; **dimension** = basis size. For transformations: **kernel** = $T(\mathbf{x}) = \mathbf{0}$ (nullity), **range** = column space of the matrix (rank). Always verify with **rank-nullity**: $\text{rank} + \text{nullity} = n$.

## Links
 **Related:** **Source / Reference:**


## References & Navigation

- **Related Notes:** [[Linear Equations and Matrices]]
