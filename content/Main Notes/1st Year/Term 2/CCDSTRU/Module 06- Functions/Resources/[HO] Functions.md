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

**🏷️ Tags:** #[[Problem Solving]] #[[Functions]] #[[Discrete Math]] #[[CCDSTRU]] #[[M6]]

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


## References & Navigation

- **Related Notes:** [[Functions]]
