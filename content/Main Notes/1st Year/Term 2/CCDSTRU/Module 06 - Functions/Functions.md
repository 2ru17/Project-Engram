---
id: functions_06
type: note
course: CCDSTRU
topic: Functions
status: completed
---
# Functions

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**Tags:** #[[Problem Solving]] #[[Functions]] #[[Discrete Math]] #[[CCDSTRU]] #[[M6]]

---

## Important Formulas & Concepts
 **Function ($f: A \rightarrow B$):** A mapping from set $A$ to set $B$ where exactly *one* element of $B$ is assigned to *each* element of $A$.  **Domain:** The set $A$. **Codomain:** The set $B$. **Image:** If $f(a) = b$, then $b$ is the image of $a$. **Preimage:** If $f(a) = b$, then $a$ is the preimage of $b$. **Range (Image of $f$):** The set of all actual images of $f$ (subset of the codomain).

### Operations on Functions
Let $f_1$ and $f_2$ be functions from $A$ to $\mathbb{R}$: **Addition:** $(f_1 + f_2)(x) = f_1(x) + f_2(x)$ **Multiplication:** $(f_1 f_2)(x) = f_1(x) f_2(x)$

### Function Properties

#### One-to-One (Injection)
A function is **injective** (one-to-one) if and only if $f(a) = f(b)$ implies $a = b$ for all $a, b$ in the domain. *How to prove not one-to-one:* Find an instance where $f(x) = f(y)$ but $x \neq y$.

#### Onto (Surjection)
A function is **surjective** (onto) if and only if for every element $b \in B$ (codomain), there is an element $a \in A$ (domain) such that $f(a) = b$. *How to prove not onto:* Find an element $y \in B$ such that no $x$ exists where $f(x) = y$.

#### One-to-One Correspondence (Bijection)
A function is **bijective** if it is both *injective* (one-to-one) and *surjective* (onto).

## Worked Examples

**Example 1: Function vs Not a Function**
Let $f: \{a, b, c\} \rightarrow \mathbb{Z}$ $f(a) = 1, f(b) = 2, f(c) = 3$ is a **function** because each element in the domain maps to exactly one element in the codomain. $f(a) = 1, f(b) = 2, f(a) = 3$ is **not a function** because $a$ maps to both 1 and 3.

**Example 2: Injective / Surjective Analysis**
Let $f: \mathbb{Z} \rightarrow \mathbb{Z}$ where $f(x) = x^2$ **Is it injective?** No. $f(1) = 1$ and $f(-1) = 1$, but $1 \neq -1$. **Is it surjective?** No. There is no integer $x$ such that $f(x) = -1$ (the image is always non-negative).

Let $f: \mathbb{Z} \rightarrow \mathbb{Z}$ where $f(x) = x + 1$ **Is it injective?** Yes. $x+1 = y+1 \implies x = y$. **Is it surjective?** Yes. For any $y \in \mathbb{Z}$, let $x = y - 1$. Then $f(x) = y - 1 + 1 = y$. **Is it bijective?** Yes, because it is both injective and surjective.

## Multiple Choice Questions

1. Which requirement defines a valid function $f: A \rightarrow B$?
    - **A)** Every element of B has at least one preimage in A
    - **B)** Each element of A is assigned to exactly one element of B
    - **C)** Distinct elements of A cannot share an image in B
    - **D)** The range of f equals the entire codomain B

2. If a function $f: A \rightarrow B$ satisfies $f(a) = b$, which statement correctly identifies its components?
    - **A)** b is the preimage of a, and the range is always larger than B
    - **B)** a is the image of b, and B is the domain
    - **C)** b is the image of a, a is the preimage of b, and the range is the subset of B containing all actual images
    - **D)** a is the image of b, b is the preimage of a, and the range always equals B

3. Why does the mapping $f(a) = 1$, $f(b) = 2$, $f(a) = 3$ fail to be a function from $\{a, b, c\}$ to $\mathbb{Z}$?
    - **A)** Input a maps to both 1 and 3, and c has no assigned output
    - **B)** The codomain ℤ is infinite while the domain is finite
    - **C)** Two different domain elements share the same image
    - **D)** The images 1, 2, and 3 are all positive integers

4. Which condition defines an **injective** (one-to-one) function $f: A \rightarrow B$?
    - **A)** For every b ∈ B, there exists a ∈ A such that f(a) = b
    - **B)** There exist distinct x ≠ y in A such that f(x) = f(y)
    - **C)** The range of f equals the entire codomain B
    - **D)** For all a, b ∈ A, f(a) = f(b) implies a = b

5. How do you prove that a function $f: A \rightarrow B$ is **not onto** (not surjective)?
    - **A)** Find two distinct inputs x ≠ y in A such that f(x) = f(y)
    - **B)** Find an element y ∈ B such that no x ∈ A exists where f(x) = y
    - **C)** Show that some element x ∈ A maps to two different outputs in B
    - **D)** Show that the domain A contains negative numbers

6. Why is $f: \mathbb{Z} \rightarrow \mathbb{Z}$ defined by $f(x) = x^2$ neither injective nor surjective?
    - **A)** f(1) = f(-1) = 1 disproves injectivity, and no integer x satisfies f(x) = -1, disproving surjectivity
    - **B)** f(0) = 0 disproves injectivity, and f(2) = 4 disproves surjectivity
    - **C)** It is injective on positive integers, and surjective because 1 is in the range
    - **D)** Every integer has an integer square root, but f(1) = f(-1) breaks surjectivity

7. Consider $f: \mathbb{Z} \rightarrow \mathbb{Z}$ given by $f(x) = x + 1$. How is $f$ classified, and why is it surjective?
    - **A)** Injective only, because negative codomain values lack preimages
    - **B)** Surjective only, because x + 1 = y + 1 can hold when x ≠ y
    - **C)** Bijective, because x + 1 = y + 1 implies x = y and every y ∈ ℤ has preimage x = y - 1
    - **D)** Neither injective nor surjective, because the domain and codomain are identical

8. Let $f_1, f_2: A \rightarrow \mathbb{R}$. How are the sum $(f_1 + f_2)(x)$ and product $(f_1 f_2)(x)$ defined?
    - **A)** (f₁ + f₂)(x) = f₁(f₂(x)) and (f₁f₂)(x) = f₁(x) + f₂(x)
    - **B)** (f₁ + f₂)(x) = f₁(x + f₂(x)) and (f₁f₂)(x) = f₁(x)f₂(x)
    - **C)** (f₁ + f₂)(x) = f₁(x) + f₂(x) and (f₁f₂)(x) = f₁(f₂(x))
    - **D)** (f₁ + f₂)(x) = f₁(x) + f₂(x) and (f₁f₂)(x) = f₁(x)f₂(x)

9. Suppose the codomain of $g(x) = x^2$ is restricted to non-negative integers, giving $g: \mathbb{Z} \rightarrow \mathbb{N}$ where $\mathbb{N} = \{0, 1, 2, \dots\}$. Which statement about $g$ is true?
    - **A)** g is injective because all outputs are non-negative
    - **B)** g remains neither injective (g(1) = g(-1)) nor surjective (no x ∈ ℤ gives g(x) = 2)
    - **C)** g becomes bijective once negative outputs are removed from the codomain
    - **D)** g becomes surjective because every non-negative integer is a square of an integer

10. What properties must a function satisfy to be a **one-to-one correspondence** (bijection)?
    - **A)** It must map every element in the domain to a single constant value
    - **B)** It must be injective, even if elements in the codomain have no preimage
    - **C)** It must be both injective (one-to-one) and surjective (onto)
    - **D)** It must be surjective, even if distinct domain elements share an image

### Answer Key & Explanations

1. **B)** By definition, a function $f: A \rightarrow B$ assigns *exactly one* element of codomain $B$ to *each* element of domain $A$.
2. **C)** When $f(a) = b$, $b$ is the image of $a$, $a$ is the preimage of $b$, and the range (image of $f$) is the subset of codomain $B$ formed by all actual outputs of $f$.
3. **A)** In Worked Example 1, this assignment is not a function because $a$ maps to both $1$ and $3$ (violating uniqueness of output), and $c$ is left unassigned.
4. **D)** A function is injective (one-to-one) if and only if $f(a) = f(b)$ implies $a = b$ for all $a, b$ in the domain.
5. **B)** To prove $f: A \rightarrow B$ is not surjective (not onto), exhibit an element $y \in B$ for which no $x \in A$ satisfies $f(x) = y$.
6. **A)** In Worked Example 2, $f(1) = 1 = f(-1)$ with $1 \neq -1$ disproves injectivity, and because $x^2 \ge 0$ for all $x \in \mathbb{Z}$, $-1$ has no preimage in $\mathbb{Z}$, disproving surjectivity.
7. **C)** For $f(x) = x + 1$ on $\mathbb{Z} \rightarrow \mathbb{Z}$, $x + 1 = y + 1 \implies x = y$ establishes injectivity, and choosing $x = y - 1 \in \mathbb{Z}$ gives $f(x) = y$ for every $y \in \mathbb{Z}$, establishing surjectivity and therefore bijectivity.
8. **D)** Operations on real-valued functions $f_1, f_2: A \rightarrow \mathbb{R}$ are defined pointwise as $(f_1 + f_2)(x) = f_1(x) + f_2(x)$ and $(f_1 f_2)(x) = f_1(x) f_2(x)$.
9. **B)** Restricting the codomain to $\mathbb{N}$ does not change the domain mapping, so $g(1) = g(-1) = 1$ still fails injectivity, and elements like $2 \in \mathbb{N}$ still have no integer square root, so $g$ is still not surjective.
10. **C)** A one-to-one correspondence (bijection) is defined as a function that is both injective (one-to-one) and surjective (onto).

## References & Navigation

- **Previous Topic:** [[Sets]]
- **Next Topic:** [[Relations]]
- **Related Notes:** [[Sets]], [[Relations]]
